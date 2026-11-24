import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  CreateImageRequestSchema,
  EditImageBodyJsonParamSchema,
  ErrorResponseSchema,
  ImageEditStreamEventSchema,
  ImageGenStreamEventSchema,
  ImagesResponseSchema,
  SvgReasoningParamSchema,
  InputFidelitySchema,
  ComplexitySchema,
  MarkupSchema,
  ImagesApiOutputFormatSchema,
  InferenceRateLimitedResponse,
  InferenceServiceUnavailableResponse,
} from '../components'

export const imagesHandler = new Hono()
  .post(
    '/images/edits',
    describeRoute({
      operationId: 'createImageEdit',
      tags: ['Images'],
      summary: 'Create image edit',
      description:
        'Creates an edited or extended image given one or more source images and a prompt. This endpoint supports GPT Image models.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ImagesResponseSchema)),
            },
            'text/event-stream': {
              schema: resolver(Schema.toStandardSchemaV1(ImageEditStreamEventSchema)),
            },
          },
        },
        '400': {
          description: 'Invalid image request, including invalid parameters or input.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The project does not have access to the requested model.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '410': {
          description:
            'The requested DALL-E image endpoint is unavailable because it has been retired.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The image could not be generated or processed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator('json', Schema.toStandardSchemaV1(EditImageBodyJsonParamSchema)),
    validator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          frame_count: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                    .pipe(
                      Schema.decodeTo(
                        Schema.Finite,
                        SchemaTransformation.transform({
                          decode: (input) => Number(input),
                          encode: (output) => String(output),
                        }),
                      ),
                    )
                    .check(
                      Schema.isInt(),
                      Schema.isGreaterThanOrEqualTo(2),
                      Schema.isLessThanOrEqualTo(16),
                    ),
                ),
              ),
            ).annotate({
              description:
                "Number of frames for GIF output. Accepts integers from 2 through 16. Defaults to 9 when omitted. Only supported with output_format=gif. The requested size must satisfy the selected model's GIF size limits. GIF output does not support streaming, partial images, masks, or custom output compression. Requires access to the GIF preview for the selected model.",
            }),
          ),
          frame_duration_ms: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                    .pipe(
                      Schema.decodeTo(
                        Schema.Finite,
                        SchemaTransformation.transform({
                          decode: (input) => Number(input),
                          encode: (output) => String(output),
                        }),
                      ),
                    )
                    .check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(20)),
                ),
              ),
            ).annotate({
              description:
                'Requested delay per GIF frame, in milliseconds. Defaults to 200 when omitted. GIF output rounds to the nearest 10 ms and caps the encoded delay at 655,350 ms per frame. Only supported with output_format=gif.',
            }),
          ),
          complexity: Schema.optionalKey(ComplexitySchema),
          image: Schema.Union([
            Schema.instanceOf(File),
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.instanceOf(File)).check(Schema.isMaxLength(16))),
            ),
          ]).annotate({
            description:
              'The image(s) to edit. Must be a supported image file or an array of images.\n\nFor the GPT image models (`gpt-image-1-mini`, `gpt-image-1.5`,\n`gpt-image-2`, `gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`,\n`gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`, and\n`gpt-image-2.5-flare-2026-09-08`), each image should be a `png`, `webp`, or `jpg`\nfile less than 50MB. You can provide up to 16 images. `chatgpt-image-latest`\nfollows the same input constraints as GPT image models.\n',
          }),
          prompt: Schema.String.annotate({
            description:
              'A text description of the desired image(s). The maximum length is 32000 characters for the GPT image models.',
            jsonSchemaExamples: ['A cute baby sea otter wearing a beret'],
          }),
          mask: Schema.optionalKey(
            Schema.instanceOf(File).annotate({
              description:
                'An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where `image` should be edited. If there are multiple images provided, the mask will be applied on the first image. Must be a valid PNG file, less than 4MB, and have the same dimensions as `image`.',
            }),
          ),
          markup: Schema.optionalKey(
            MarkupSchema.annotate({
              description:
                "A transparent PNG overlaid on the first image to guide the edit. Must match that image's dimensions after orientation and contain transparent pixels. Supports GPT Image 2.5. Cannot be combined with mask.",
            }),
          ),
          background: Schema.Union([
            Schema.Literals(['transparent', 'opaque', 'auto']),
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Null),
            ),
          ])
            .pipe(Schema.withDecodingDefaultType(Effect.succeed('auto')))
            .annotate({
              description:
                'Set the background of the generated image(s). This parameter is only supported for\nthe GPT image models. Must be one of `transparent`, `opaque`, or `auto` (default\nvalue). When `auto` is used, the model will automatically determine the best\nbackground for the image.\n\n`gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`, including their `2026-09-08`\nsnapshots, support `opaque` and `transparent` backgrounds. Transparent backgrounds\nare available for supported GPT Image models. For `gpt-image-2` and\n`gpt-image-2-2026-04-21`, this support is in preview. When using `transparent`,\nset the output format to `png` or `webp`.\n',
              jsonSchemaExamples: ['transparent'],
            }),
          model: Schema.Union([
            Schema.String,
            Schema.Literals([
              'gpt-image-1.5',
              'gpt-image-2',
              'gpt-image-2-2026-04-21',
              'gpt-image-2.5-sunburst',
              'gpt-image-2.5-sunburst-2026-09-08',
              'gpt-image-2.5-flare',
              'gpt-image-2.5-flare-2026-09-08',
              'gpt-image-2.6-sunburst',
              'gpt-image-2.6-flare',
              'gpt-image-1',
              'gpt-image-1-mini',
              'chatgpt-image-latest',
              'dall-e-2',
            ]),
          ]).annotate({
            description:
              'The GPT image model to use for image editing\n(`gpt-image-1-mini`, `gpt-image-1.5`, `gpt-image-2`,\n`gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`,\n`gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`,\n`gpt-image-2.5-flare-2026-09-08`, `gpt-image-2.6-sunburst`, `gpt-image-2.6-flare`,\nor `chatgpt-image-latest`).\n\n`gpt-image-1` was shut down on October 23, 2026. Use\n`gpt-image-2.5-sunburst` or `gpt-image-2.5-flare` instead.\n',
            jsonSchemaExamples: ['gpt-image-2.6-flare'],
          }),
          n: Schema.Unknown.pipe(
            Schema.decodeTo(
              Schema.Unknown,
              SchemaTransformation.transform<unknown, unknown>({
                decode: (input) => (input === 'null' ? null : input),
                encode: (output) => output,
              }),
            ),
            Schema.decodeTo(
              Schema.NullOr(
                Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                  .pipe(
                    Schema.decodeTo(
                      Schema.Finite,
                      SchemaTransformation.transform({
                        decode: (input) => Number(input),
                        encode: (output) => String(output),
                      }),
                    ),
                  )
                  .check(
                    Schema.isInt(),
                    Schema.isGreaterThanOrEqualTo(1),
                    Schema.isLessThanOrEqualTo(10),
                  ),
              ),
            ),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(1)))
            .annotate({
              description: 'The number of images to generate. Must be between 1 and 10.',
              jsonSchemaExamples: [1],
            }),
          size: Schema.Union([
            Schema.String,
            Schema.Literals(['1024x1024', '1536x1024', '1024x1536', 'auto', '256x256', '512x512']),
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Null),
            ),
          ])
            .pipe(Schema.withDecodingDefaultType(Effect.succeed('auto')))
            .annotate({
              description:
                "The size of the generated images. Defaults to `auto`. For `gpt-image-2`, `gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`, `gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`, and `gpt-image-2.5-flare-2026-09-08`, arbitrary resolutions are supported as `WIDTHxHEIGHT` strings, for example `1536x864`. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above `2560x1440` are experimental, and the maximum supported resolution is `3840x2160`. The requested size must also satisfy the model's current pixel and edge limits. The standard sizes `1024x1024`, `1536x1024`, and `1024x1536` are supported by the GPT image models; `auto` is supported for models that allow automatic sizing.",
              jsonSchemaExamples: ['1024x1024'],
            }),
          response_format: Schema.optionalKey(
            Schema.NullOr(Schema.Literals(['url', 'b64_json'])).annotate({
              description:
                'Legacy response format parameter for retired image models. Unsupported for GPT image models, which always return base64-encoded images.',
              jsonSchemaDeprecated: true,
            }),
          ),
          output_format: Schema.Unknown.pipe(
            Schema.decodeTo(
              Schema.Unknown,
              SchemaTransformation.transform<unknown, unknown>({
                decode: (input) => (input === 'null' ? null : input),
                encode: (output) => output,
              }),
            ),
            Schema.decodeTo(
              Schema.NullOr(
                Schema.Union([
                  ImagesApiOutputFormatSchema,
                  Schema.Unknown.pipe(
                    Schema.decodeTo(
                      Schema.Unknown,
                      SchemaTransformation.transform<unknown, unknown>({
                        decode: (input) => (input === 'null' ? null : input),
                        encode: (output) => output,
                      }),
                    ),
                    Schema.decodeTo(Schema.Null),
                  ),
                ]),
              ),
            ),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed('png')))
            .annotate({
              description:
                'The format in which the generated images are returned. This parameter is\nonly supported for the GPT image models.\nThe default value is `png`.\nSVG output requires a supported image model and project access.\n',
              jsonSchemaExamples: ['png'],
            }),
          svg: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.Union([
                    Schema.Struct({
                      model: Schema.optionalKey(
                        Schema.String.check(
                          Schema.makeFilter((input) => [...input].length >= 1, {
                            expected: 'a string of at least 1 character',
                          }),
                        ),
                      ),
                      reasoning: Schema.optionalKey(
                        Schema.Unknown.pipe(
                          Schema.decodeTo(
                            Schema.Unknown,
                            SchemaTransformation.transform<unknown, unknown>({
                              decode: (input) => (input === 'null' ? null : input),
                              encode: (output) => output,
                            }),
                          ),
                          Schema.decodeTo(
                            Schema.NullOr(
                              Schema.Union([
                                SvgReasoningParamSchema.annotate({
                                  description:
                                    "Reasoning effort for SVG authoring. When omitted, uses the author model's default in both Images and Responses.",
                                }),
                                Schema.Unknown.pipe(
                                  Schema.decodeTo(
                                    Schema.Unknown,
                                    SchemaTransformation.transform<unknown, unknown>({
                                      decode: (input) => (input === 'null' ? null : input),
                                      encode: (output) => output,
                                    }),
                                  ),
                                  Schema.decodeTo(Schema.Null),
                                ),
                              ]),
                            ),
                          ),
                        ),
                      ),
                    }),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.Null),
                    ),
                  ]),
                ),
              ),
            ).annotate({
              description:
                'Selects the author model and reasoning effort for `output_format=svg`. Supply `svg.model` when SVG model selection is enabled. Otherwise, omit this object. SVG output requires `n=1` and cannot use streaming, partial images, or output compression. Use multipart fields such as `svg[model]`.',
            }),
          ),
          output_compression: Schema.Unknown.pipe(
            Schema.decodeTo(
              Schema.Unknown,
              SchemaTransformation.transform<unknown, unknown>({
                decode: (input) => (input === 'null' ? null : input),
                encode: (output) => output,
              }),
            ),
            Schema.decodeTo(
              Schema.NullOr(
                Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                  .pipe(
                    Schema.decodeTo(
                      Schema.Finite,
                      SchemaTransformation.transform({
                        decode: (input) => Number(input),
                        encode: (output) => String(output),
                      }),
                    ),
                  )
                  .check(Schema.isInt()),
              ),
            ),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(100)))
            .annotate({
              description:
                'The compression level (0-100%) for the generated images. This parameter\nis only supported for the GPT image models with the `webp` or `jpeg` output\nformats, and defaults to 100.\n',
              jsonSchemaExamples: [100],
            }),
          safety_identifier: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 128, {
                  expected: 'a string of at most 128 characters',
                }),
              ),
            ).annotate({
              description:
                'A stable identifier for an end user in your organization, used for safety monitoring and abuse detection. Hash a username or email address to avoid sending identifying information. A non-empty value takes precedence over the deprecated `user` parameter. If omitted, null, or empty, the API uses `user` when available. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).',
              jsonSchemaExamples: ['user-1234'],
            }),
          ),
          user: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'Deprecated: use `safety_identifier` instead. This parameter remains accepted for backward compatibility and is used when `safety_identifier` is omitted, null, or empty. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).',
              jsonSchemaExamples: ['user-1234'],
              jsonSchemaDeprecated: true,
            }),
          ),
          input_fidelity: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.Union([
                    InputFidelitySchema,
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.Null),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          stream: Schema.Unknown.pipe(
            Schema.decodeTo(
              Schema.Unknown,
              SchemaTransformation.transform<unknown, unknown>({
                decode: (input) => (input === 'null' ? null : input),
                encode: (output) => output,
              }),
            ),
            Schema.decodeTo(
              Schema.NullOr(
                Schema.String.check(
                  Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                ).pipe(
                  Schema.decodeTo(
                    Schema.Boolean,
                    SchemaTransformation.transform({
                      decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                      encode: (output) => (output ? 'true' : 'false'),
                    }),
                  ),
                ),
              ),
            ),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(false)))
            .annotate({
              description:
                'Edit the image in streaming mode. Defaults to `false`. See the\n[Image generation guide](https://developers.openai.com/api/docs/guides/image-generation) for more information.\n',
              jsonSchemaExamples: [false],
            }),
          partial_images: Schema.Unknown.pipe(
            Schema.decodeTo(
              Schema.Unknown,
              SchemaTransformation.transform<unknown, unknown>({
                decode: (input) => (input === 'null' ? null : input),
                encode: (output) => output,
              }),
            ),
            Schema.decodeTo(
              Schema.NullOr(
                Schema.Union([
                  Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                    .pipe(
                      Schema.decodeTo(
                        Schema.Finite,
                        SchemaTransformation.transform({
                          decode: (input) => Number(input),
                          encode: (output) => String(output),
                        }),
                      ),
                    )
                    .check(
                      Schema.isInt(),
                      Schema.isGreaterThanOrEqualTo(0),
                      Schema.isLessThanOrEqualTo(3),
                    )
                    .pipe(Schema.withDecodingDefaultType(Effect.succeed(0)))
                    .annotate({
                      description:
                        'The number of partial images to generate. This parameter is used for\nstreaming responses that return partial images. Value must be between 0 and 3.\nWhen set to 0, the response will be a single image sent in one streaming event.\n\nNote that the final image may be sent before the full number of partial images\nare generated if the full image is generated more quickly.\n',
                      jsonSchemaExamples: [1],
                    }),
                  Schema.Unknown.pipe(
                    Schema.decodeTo(
                      Schema.Unknown,
                      SchemaTransformation.transform<unknown, unknown>({
                        decode: (input) => (input === 'null' ? null : input),
                        encode: (output) => output,
                      }),
                    ),
                    Schema.decodeTo(Schema.Null),
                  ),
                ]),
              ),
            ),
          ),
          quality: Schema.Union([
            Schema.Literals(['low', 'medium', 'high', 'xhigh', 'max', 'auto', 'standard']),
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Null),
            ),
          ])
            .pipe(Schema.withDecodingDefaultType(Effect.succeed('auto')))
            .annotate({
              description:
                'The quality of the image that will be generated for GPT image models. The GPT image models support `low`, `medium`, and `high`. `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`, including their `2026-09-08` snapshots, also support `xhigh` and `max`. Defaults to `auto`.\n',
              jsonSchemaExamples: ['high'],
            }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/images/generations',
    describeRoute({
      operationId: 'createImage',
      tags: ['Images'],
      summary: 'Create image',
      description:
        'Creates an image given a prompt using a GPT Image model. [Learn more](https://developers.openai.com/api/docs/guides/images-vision).\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ImagesResponseSchema)),
            },
            'text/event-stream': {
              schema: resolver(Schema.toStandardSchemaV1(ImageGenStreamEventSchema)),
            },
          },
        },
        '400': {
          description: 'Invalid image request, including invalid parameters or input.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The project does not have access to the requested model.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '410': {
          description:
            'The requested DALL-E image endpoint is unavailable because it has been retired.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The image could not be generated or processed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateImageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/images/variations',
    describeRoute({
      operationId: 'createImageVariation',
      tags: ['Images'],
      summary: 'Create image variation',
      deprecated: true,
      description:
        'This endpoint is retired and no longer available. Use the image edits endpoint with a GPT Image model and a prompt to create a variation of an image. The request and response schemas below describe the legacy contract.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ImagesResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'Invalid image or request, or the request cannot be processed for this account.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The project does not have access to the requested model.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '410': {
          description: 'The image variations endpoint is no longer available.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'The image rate limit was exceeded.',
          headers: {
            'X-RateLimit-Limit-Images': {
              description: 'The image limit for the rate-limit window.',
              schema: { type: 'number' },
            },
            'X-RateLimit-Remaining-Images': {
              description: 'The number of images remaining in the rate-limit window.',
              schema: { type: 'number', minimum: 0 },
            },
            'X-RateLimit-Reset-Images': {
              description: 'The number of seconds until the rate-limit window resets.',
              schema: { type: 'integer' },
            },
          },
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '500': {
          description: 'The image variation could not be generated or processed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          image: Schema.instanceOf(File).annotate({
            description:
              'The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.',
          }),
          model: Schema.Union([
            Schema.String,
            Schema.Literal('dall-e-2'),
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Null),
            ),
          ])
            .pipe(Schema.withDecodingDefaultType(Effect.succeed('dall-e-2')))
            .annotate({
              description:
                'The legacy model used by the retired image variations endpoint. This endpoint no longer accepts requests.',
              jsonSchemaExamples: ['dall-e-2'],
            }),
          n: Schema.Unknown.pipe(
            Schema.decodeTo(
              Schema.Unknown,
              SchemaTransformation.transform<unknown, unknown>({
                decode: (input) => (input === 'null' ? null : input),
                encode: (output) => output,
              }),
            ),
            Schema.decodeTo(
              Schema.NullOr(
                Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                  .pipe(
                    Schema.decodeTo(
                      Schema.Finite,
                      SchemaTransformation.transform({
                        decode: (input) => Number(input),
                        encode: (output) => String(output),
                      }),
                    ),
                  )
                  .check(
                    Schema.isInt(),
                    Schema.isGreaterThanOrEqualTo(1),
                    Schema.isLessThanOrEqualTo(10),
                  ),
              ),
            ),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(1)))
            .annotate({
              description: 'The number of images to generate. Must be between 1 and 10.',
              jsonSchemaExamples: [1],
            }),
          response_format: Schema.NullOr(Schema.Literals(['url', 'b64_json']))
            .pipe(Schema.withDecodingDefaultType(Effect.succeed('url')))
            .annotate({
              description:
                'The format in which the generated images are returned. Must be one of `url` or `b64_json`. URLs are only valid for 60 minutes after the image has been generated.',
              jsonSchemaExamples: ['url'],
            }),
          size: Schema.NullOr(Schema.Literals(['256x256', '512x512', '1024x1024']))
            .pipe(Schema.withDecodingDefaultType(Effect.succeed('1024x1024')))
            .annotate({
              description:
                'The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`.',
              jsonSchemaExamples: ['1024x1024'],
            }),
          user: Schema.optionalKey(
            Schema.String.annotate({
              description:
                'A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).\n',
              jsonSchemaExamples: ['user-1234'],
            }),
          ),
        }).annotate({
          description: 'Legacy request for the retired image variations endpoint.',
          jsonSchemaDeprecated: true,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
