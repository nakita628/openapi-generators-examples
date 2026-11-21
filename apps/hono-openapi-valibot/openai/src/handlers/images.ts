import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
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
            'application/json': { schema: resolver(ImagesResponseSchema) },
            'text/event-stream': { schema: resolver(ImageEditStreamEventSchema) },
          },
        },
        '400': {
          description: 'Invalid image request, including invalid parameters or input.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The project does not have access to the requested model.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '410': {
          description:
            'The requested DALL-E image endpoint is unavailable because it has been retired.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The image could not be generated or processed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator('json', EditImageBodyJsonParamSchema),
    validator(
      'form',
      v.object({
        frame_count: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) => (input === 'null' ? null : input)),
              v.nullable(
                v.pipe(
                  v.string(),
                  v.transform(Number),
                  v.number(),
                  v.safeInteger(),
                  v.minValue(2),
                  v.maxValue(16),
                ),
              ),
            ),
            v.description(
              "Number of frames for GIF output. Accepts integers from 2 through 16. Defaults to 9 when omitted. Only supported with output_format=gif. The requested size must satisfy the selected model's GIF size limits. GIF output does not support streaming, partial images, masks, or custom output compression. Requires access to the GIF preview for the selected model.",
            ),
          ),
        ),
        frame_duration_ms: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) => (input === 'null' ? null : input)),
              v.nullable(
                v.pipe(
                  v.string(),
                  v.transform(Number),
                  v.number(),
                  v.safeInteger(),
                  v.minValue(20),
                ),
              ),
            ),
            v.description(
              'Requested delay per GIF frame, in milliseconds. Defaults to 200 when omitted. GIF output rounds to the nearest 10 ms and caps the encoded delay at 655,350 ms per frame. Only supported with output_format=gif.',
            ),
          ),
        ),
        complexity: v.optional(ComplexitySchema),
        image: v.pipe(
          v.union([
            v.file(),
            v.pipe(
              v.unknown(),
              v.transform((input) =>
                input === undefined || Array.isArray(input) ? input : [input],
              ),
              v.array(v.file()),
              v.maxLength(16),
            ),
          ]),
          v.description(
            'The image(s) to edit. Must be a supported image file or an array of images.\n\nFor the GPT image models (`gpt-image-1-mini`, `gpt-image-1.5`,\n`gpt-image-2`, `gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`,\n`gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`, and\n`gpt-image-2.5-flare-2026-09-08`), each image should be a `png`, `webp`, or `jpg`\nfile less than 50MB. You can provide up to 16 images. `chatgpt-image-latest`\nfollows the same input constraints as GPT image models.\n',
          ),
        ),
        prompt: v.pipe(
          v.string(),
          v.description(
            'A text description of the desired image(s). The maximum length is 32000 characters for the GPT image models.',
          ),
          v.metadata({ examples: ['A cute baby sea otter wearing a beret'] }),
        ),
        mask: v.optional(
          v.pipe(
            v.file(),
            v.description(
              'An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where `image` should be edited. If there are multiple images provided, the mask will be applied on the first image. Must be a valid PNG file, less than 4MB, and have the same dimensions as `image`.',
            ),
          ),
        ),
        markup: v.optional(
          v.pipe(
            MarkupSchema,
            v.description(
              "A transparent PNG overlaid on the first image to guide the edit. Must match that image's dimensions after orientation and contain transparent pixels. Supports GPT Image 2.5. Cannot be combined with mask.",
            ),
          ),
        ),
        background: v.pipe(
          v.optional(
            v.union([
              v.picklist(['transparent', 'opaque', 'auto']),
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(v.null()),
              ),
            ]),
            'auto',
          ),
          v.description(
            'Set the background of the generated image(s). This parameter is only supported for\nthe GPT image models. Must be one of `transparent`, `opaque`, or `auto` (default\nvalue). When `auto` is used, the model will automatically determine the best\nbackground for the image.\n\n`gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`, including their `2026-09-08`\nsnapshots, support `opaque` and `transparent` backgrounds. Transparent backgrounds\nare available for supported GPT Image models. For `gpt-image-2` and\n`gpt-image-2-2026-04-21`, this support is in preview. When using `transparent`,\nset the output format to `png` or `webp`.\n',
          ),
          v.metadata({ examples: ['transparent'] }),
        ),
        model: v.pipe(
          v.union([
            v.string(),
            v.picklist([
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
          ]),
          v.description(
            'The GPT image model to use for image editing\n(`gpt-image-1-mini`, `gpt-image-1.5`, `gpt-image-2`,\n`gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`,\n`gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`,\n`gpt-image-2.5-flare-2026-09-08`, `gpt-image-2.6-sunburst`, `gpt-image-2.6-flare`,\nor `chatgpt-image-latest`).\n\n`gpt-image-1` was shut down on October 23, 2026. Use\n`gpt-image-2.5-sunburst` or `gpt-image-2.5-flare` instead.\n',
          ),
          v.metadata({ examples: ['gpt-image-2.6-flare'] }),
        ),
        n: v.pipe(
          v.optional(
            v.pipe(
              v.unknown(),
              v.transform((input) => (input === 'null' ? null : input)),
              v.nullable(
                v.pipe(
                  v.string(),
                  v.transform(Number),
                  v.number(),
                  v.safeInteger(),
                  v.minValue(1),
                  v.maxValue(10),
                ),
              ),
            ),
            '1',
          ),
          v.description('The number of images to generate. Must be between 1 and 10.'),
          v.metadata({ examples: [1] }),
        ),
        size: v.pipe(
          v.optional(
            v.union([
              v.string(),
              v.picklist(['1024x1024', '1536x1024', '1024x1536', 'auto', '256x256', '512x512']),
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(v.null()),
              ),
            ]),
            'auto',
          ),
          v.description(
            "The size of the generated images. Defaults to `auto`. For `gpt-image-2`, `gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`, `gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`, and `gpt-image-2.5-flare-2026-09-08`, arbitrary resolutions are supported as `WIDTHxHEIGHT` strings, for example `1536x864`. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above `2560x1440` are experimental, and the maximum supported resolution is `3840x2160`. The requested size must also satisfy the model's current pixel and edge limits. The standard sizes `1024x1024`, `1536x1024`, and `1024x1536` are supported by the GPT image models; `auto` is supported for models that allow automatic sizing.",
          ),
          v.metadata({ examples: ['1024x1024'] }),
        ),
        response_format: v.optional(
          v.pipe(
            v.nullable(v.union([v.literal('url'), v.literal('b64_json'), v.null()])),
            v.description(
              'Legacy response format parameter for retired image models. Unsupported for GPT image models, which always return base64-encoded images.',
            ),
            v.metadata({ deprecated: true }),
          ),
        ),
        output_format: v.pipe(
          v.optional(
            v.pipe(
              v.unknown(),
              v.transform((input) => (input === 'null' ? null : input)),
              v.nullable(
                v.union([
                  ImagesApiOutputFormatSchema,
                  v.pipe(
                    v.unknown(),
                    v.transform((input) => (input === 'null' ? null : input)),
                    v.nullable(v.null()),
                  ),
                ]),
              ),
            ),
            'png',
          ),
          v.description(
            'The format in which the generated images are returned. This parameter is\nonly supported for the GPT image models.\nThe default value is `png`.\nSVG output requires a supported image model and project access.\n',
          ),
          v.metadata({ examples: ['png'] }),
        ),
        svg: v.optional(
          v.pipe(
            v.pipe(
              v.unknown(),
              v.transform((input) => (input === 'null' ? null : input)),
              v.nullable(
                v.union([
                  v.partial(
                    v.object({
                      model: v.pipe(v.string(), v.minCodePoints(1)),
                      reasoning: v.pipe(
                        v.unknown(),
                        v.transform((input) => (input === 'null' ? null : input)),
                        v.nullable(
                          v.union([
                            v.pipe(
                              SvgReasoningParamSchema,
                              v.description(
                                "Reasoning effort for SVG authoring. When omitted, uses the author model's default in both Images and Responses.",
                              ),
                            ),
                            v.pipe(
                              v.unknown(),
                              v.transform((input) => (input === 'null' ? null : input)),
                              v.nullable(v.null()),
                            ),
                          ]),
                        ),
                      ),
                    }),
                  ),
                  v.pipe(
                    v.unknown(),
                    v.transform((input) => (input === 'null' ? null : input)),
                    v.nullable(v.null()),
                  ),
                ]),
              ),
            ),
            v.description(
              'Selects the author model and reasoning effort for `output_format=svg`. Supply `svg.model` when SVG model selection is enabled. Otherwise, omit this object. SVG output requires `n=1` and cannot use streaming, partial images, or output compression. Use multipart fields such as `svg[model]`.',
            ),
          ),
        ),
        output_compression: v.pipe(
          v.optional(
            v.pipe(
              v.unknown(),
              v.transform((input) => (input === 'null' ? null : input)),
              v.nullable(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
            ),
            '100',
          ),
          v.description(
            'The compression level (0-100%) for the generated images. This parameter\nis only supported for the GPT image models with the `webp` or `jpeg` output\nformats, and defaults to 100.\n',
          ),
          v.metadata({ examples: [100] }),
        ),
        safety_identifier: v.optional(
          v.pipe(
            v.nullable(v.pipe(v.string(), v.maxCodePoints(128))),
            v.description(
              'A stable identifier for an end user in your organization, used for safety monitoring and abuse detection. Hash a username or email address to avoid sending identifying information. A non-empty value takes precedence over the deprecated `user` parameter. If omitted, null, or empty, the API uses `user` when available. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).',
            ),
            v.metadata({ examples: ['user-1234'] }),
          ),
        ),
        user: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'Deprecated: use `safety_identifier` instead. This parameter remains accepted for backward compatibility and is used when `safety_identifier` is omitted, null, or empty. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).',
            ),
            v.metadata({ examples: ['user-1234'], deprecated: true }),
          ),
        ),
        input_fidelity: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === 'null' ? null : input)),
            v.nullable(
              v.union([
                InputFidelitySchema,
                v.pipe(
                  v.unknown(),
                  v.transform((input) => (input === 'null' ? null : input)),
                  v.nullable(v.null()),
                ),
              ]),
            ),
          ),
        ),
        stream: v.pipe(
          v.optional(
            v.pipe(
              v.unknown(),
              v.transform((input) => (input === 'null' ? null : input)),
              v.nullable(
                v.pipe(
                  v.string(),
                  v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                  v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
                ),
              ),
            ),
            'false',
          ),
          v.description(
            'Edit the image in streaming mode. Defaults to `false`. See the\n[Image generation guide](https://developers.openai.com/api/docs/guides/image-generation) for more information.\n',
          ),
          v.metadata({ examples: [false] }),
        ),
        partial_images: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === 'null' ? null : input)),
            v.nullable(
              v.union([
                v.pipe(
                  v.optional(
                    v.pipe(
                      v.string(),
                      v.transform(Number),
                      v.number(),
                      v.safeInteger(),
                      v.minValue(0),
                      v.maxValue(3),
                    ),
                    '0',
                  ),
                  v.description(
                    'The number of partial images to generate. This parameter is used for\nstreaming responses that return partial images. Value must be between 0 and 3.\nWhen set to 0, the response will be a single image sent in one streaming event.\n\nNote that the final image may be sent before the full number of partial images\nare generated if the full image is generated more quickly.\n',
                  ),
                  v.metadata({ examples: [1] }),
                ),
                v.pipe(
                  v.unknown(),
                  v.transform((input) => (input === 'null' ? null : input)),
                  v.nullable(v.null()),
                ),
              ]),
            ),
          ),
        ),
        quality: v.pipe(
          v.optional(
            v.union([
              v.picklist(['low', 'medium', 'high', 'xhigh', 'max', 'auto', 'standard']),
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(v.null()),
              ),
            ]),
            'auto',
          ),
          v.description(
            'The quality of the image that will be generated for GPT image models. The GPT image models support `low`, `medium`, and `high`. `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`, including their `2026-09-08` snapshots, also support `xhigh` and `max`. Defaults to `auto`.\n',
          ),
          v.metadata({ examples: ['high'] }),
        ),
      }),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(ImagesResponseSchema) },
            'text/event-stream': { schema: resolver(ImageGenStreamEventSchema) },
          },
        },
        '400': {
          description: 'Invalid image request, including invalid parameters or input.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The project does not have access to the requested model.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '410': {
          description:
            'The requested DALL-E image endpoint is unavailable because it has been retired.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The image could not be generated or processed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator('json', CreateImageRequestSchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(ImagesResponseSchema) } },
        },
        '400': {
          description:
            'Invalid image or request, or the request cannot be processed for this account.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The project does not have access to the requested model.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '410': {
          description: 'The image variations endpoint is no longer available.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
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
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '500': {
          description: 'The image variation could not be generated or processed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'form',
      v.pipe(
        v.object({
          image: v.pipe(
            v.file(),
            v.description(
              'The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.',
            ),
          ),
          model: v.pipe(
            v.optional(
              v.union([
                v.string(),
                v.literal('dall-e-2'),
                v.pipe(
                  v.unknown(),
                  v.transform((input) => (input === 'null' ? null : input)),
                  v.nullable(v.null()),
                ),
              ]),
              'dall-e-2',
            ),
            v.description(
              'The legacy model used by the retired image variations endpoint. This endpoint no longer accepts requests.',
            ),
            v.metadata({ examples: ['dall-e-2'] }),
          ),
          n: v.pipe(
            v.optional(
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(
                  v.pipe(
                    v.string(),
                    v.transform(Number),
                    v.number(),
                    v.safeInteger(),
                    v.minValue(1),
                    v.maxValue(10),
                  ),
                ),
              ),
              '1',
            ),
            v.description('The number of images to generate. Must be between 1 and 10.'),
            v.metadata({ examples: [1] }),
          ),
          response_format: v.pipe(
            v.optional(
              v.nullable(v.union([v.literal('url'), v.literal('b64_json'), v.null()])),
              'url',
            ),
            v.description(
              'The format in which the generated images are returned. Must be one of `url` or `b64_json`. URLs are only valid for 60 minutes after the image has been generated.',
            ),
            v.metadata({ examples: ['url'] }),
          ),
          size: v.pipe(
            v.optional(
              v.nullable(
                v.union([
                  v.literal('256x256'),
                  v.literal('512x512'),
                  v.literal('1024x1024'),
                  v.null(),
                ]),
              ),
              '1024x1024',
            ),
            v.description(
              'The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`.',
            ),
            v.metadata({ examples: ['1024x1024'] }),
          ),
          user: v.optional(
            v.pipe(
              v.string(),
              v.description(
                'A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).\n',
              ),
              v.metadata({ examples: ['user-1234'] }),
            ),
          ),
        }),
        v.description('Legacy request for the retired image variations endpoint.'),
        v.metadata({ deprecated: true }),
      ),
    ),
    (c) => {},
  )
