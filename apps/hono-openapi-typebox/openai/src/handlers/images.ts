import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  CreateImageRequestSchema,
  EditImageBodyJsonParamSchema,
  ErrorResponseSchema,
  ImageEditStreamEventSchema,
  ImageGenStreamEventSchema,
  ImagesResponseSchema,
  SvgParamSchema,
  InputFidelitySchema,
  ComplexitySchema,
  MarkupSchema,
  ImagesApiOutputFormatSchema,
  InferenceRateLimitedResponse,
  InferenceServiceUnavailableResponse,
} from '../components'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

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
            'application/json': { schema: resolver(toStandardSchemaV1(ImagesResponseSchema)) },
            'text/event-stream': {
              schema: resolver(toStandardSchemaV1(ImageEditStreamEventSchema)),
            },
          },
        },
        '400': {
          description: 'Invalid image request, including invalid parameters or input.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The project does not have access to the requested model.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '410': {
          description:
            'The requested DALL-E image endpoint is unavailable because it has been retired.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The image could not be generated or processed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator('json', toStandardSchemaV1(EditImageBodyJsonParamSchema)),
    validator(
      'form',
      toStandardSchemaV1(
        Type.Object({
          frame_count: Type.Optional(
            Type.Union([
              Codec(
                Type.Refine(
                  Type.Refine(
                    Type.Refine(
                      Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                      (value) => Number.isSafeInteger(Number(value)),
                      () => 'must be a safe integer',
                    ),
                    (value) => Number(value) >= 2,
                    () => 'must be >= 2',
                  ),
                  (value) => Number(value) <= 16,
                  () => 'must be <= 16',
                ),
              )
                .Decode((value) => Number(value))
                .Encode((value) => String(value)),
              Type.Null(),
            ]),
          ),
          frame_duration_ms: Type.Optional(
            Type.Union([
              Codec(
                Type.Refine(
                  Type.Refine(
                    Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                    (value) => Number.isSafeInteger(Number(value)),
                    () => 'must be a safe integer',
                  ),
                  (value) => Number(value) >= 20,
                  () => 'must be >= 20',
                ),
              )
                .Decode((value) => Number(value))
                .Encode((value) => String(value)),
              Type.Null(),
            ]),
          ),
          complexity: Type.Optional(ComplexitySchema),
          image: Type.Union([Type.String(), Type.Array(Type.String(), { maxItems: 16 })], {
            description:
              'The image(s) to edit. Must be a supported image file or an array of images.\n\nFor the GPT image models (`gpt-image-1-mini`, `gpt-image-1.5`,\n`gpt-image-2`, `gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`,\n`gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`, and\n`gpt-image-2.5-flare-2026-09-08`), each image should be a `png`, `webp`, or `jpg`\nfile less than 50MB. You can provide up to 16 images. `chatgpt-image-latest`\nfollows the same input constraints as GPT image models.\n',
          }),
          prompt: Type.String({
            description:
              'A text description of the desired image(s). The maximum length is 32000 characters for the GPT image models.',
            examples: ['A cute baby sea otter wearing a beret'],
          }),
          mask: Type.Optional(
            Type.String({
              description:
                'An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where `image` should be edited. If there are multiple images provided, the mask will be applied on the first image. Must be a valid PNG file, less than 4MB, and have the same dimensions as `image`.',
            }),
          ),
          markup: Type.Optional(MarkupSchema),
          background: Type.Optional(
            Type.Union(
              [
                Type.Union([
                  Type.Literal('transparent'),
                  Type.Literal('opaque'),
                  Type.Literal('auto'),
                ]),
                Type.Null(),
              ],
              {
                description:
                  'Set the background of the generated image(s). This parameter is only supported for\nthe GPT image models. Must be one of `transparent`, `opaque`, or `auto` (default\nvalue). When `auto` is used, the model will automatically determine the best\nbackground for the image.\n\n`gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`, including their `2026-09-08`\nsnapshots, support `opaque` and `transparent` backgrounds. Transparent backgrounds\nare available for supported GPT Image models. For `gpt-image-2` and\n`gpt-image-2-2026-04-21`, this support is in preview. When using `transparent`,\nset the output format to `png` or `webp`.\n',
                examples: ['transparent'],
                default: 'auto',
              },
            ),
          ),
          model: Type.Union(
            [
              Type.String(),
              Type.Union([
                Type.Literal('gpt-image-1.5'),
                Type.Literal('gpt-image-2'),
                Type.Literal('gpt-image-2-2026-04-21'),
                Type.Literal('gpt-image-2.5-sunburst'),
                Type.Literal('gpt-image-2.5-sunburst-2026-09-08'),
                Type.Literal('gpt-image-2.5-flare'),
                Type.Literal('gpt-image-2.5-flare-2026-09-08'),
                Type.Literal('gpt-image-2.6-sunburst'),
                Type.Literal('gpt-image-2.6-flare'),
                Type.Literal('gpt-image-1'),
                Type.Literal('gpt-image-1-mini'),
                Type.Literal('chatgpt-image-latest'),
                Type.Literal('dall-e-2'),
              ]),
            ],
            {
              description:
                'The GPT image model to use for image editing\n(`gpt-image-1-mini`, `gpt-image-1.5`, `gpt-image-2`,\n`gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`,\n`gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`,\n`gpt-image-2.5-flare-2026-09-08`, `gpt-image-2.6-sunburst`, `gpt-image-2.6-flare`,\nor `chatgpt-image-latest`).\n\n`gpt-image-1` was shut down on October 23, 2026. Use\n`gpt-image-2.5-sunburst` or `gpt-image-2.5-flare` instead.\n',
              examples: ['gpt-image-2.6-flare'],
            },
          ),
          n: Type.Optional(
            Type.Union([
              Codec(
                Type.Refine(
                  Type.Refine(
                    Type.Refine(
                      Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '1' }),
                      (value) => Number.isSafeInteger(Number(value)),
                      () => 'must be a safe integer',
                    ),
                    (value) => Number(value) >= 1,
                    () => 'must be >= 1',
                  ),
                  (value) => Number(value) <= 10,
                  () => 'must be <= 10',
                ),
              )
                .Decode((value) => Number(value))
                .Encode((value) => String(value)),
              Type.Null(),
            ]),
          ),
          size: Type.Optional(
            Type.Union(
              [
                Type.String(),
                Type.Union([
                  Type.Literal('1024x1024'),
                  Type.Literal('1536x1024'),
                  Type.Literal('1024x1536'),
                  Type.Literal('auto'),
                  Type.Literal('256x256'),
                  Type.Literal('512x512'),
                ]),
                Type.Null(),
              ],
              {
                description:
                  "The size of the generated images. Defaults to `auto`. For `gpt-image-2`, `gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`, `gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`, and `gpt-image-2.5-flare-2026-09-08`, arbitrary resolutions are supported as `WIDTHxHEIGHT` strings, for example `1536x864`. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above `2560x1440` are experimental, and the maximum supported resolution is `3840x2160`. The requested size must also satisfy the model's current pixel and edge limits. The standard sizes `1024x1024`, `1536x1024`, and `1024x1536` are supported by the GPT image models; `auto` is supported for models that allow automatic sizing.",
                examples: ['1024x1024'],
                default: 'auto',
              },
            ),
          ),
          response_format: Type.Optional(
            Type.Union([
              Type.Union([Type.Literal('url'), Type.Literal('b64_json')], {
                description:
                  'Legacy response format parameter for retired image models. Unsupported for GPT image models, which always return base64-encoded images.',
                deprecated: true,
              }),
              Type.Null(),
            ]),
          ),
          output_format: Type.Optional(
            Type.Union([ImagesApiOutputFormatSchema, Type.Null()], {
              description:
                'The format in which the generated images are returned. This parameter is\nonly supported for the GPT image models.\nThe default value is `png`.\nSVG output requires a supported image model and project access.\n',
              examples: ['png'],
              default: 'png',
            }),
          ),
          svg: Type.Optional(
            Type.Union([SvgParamSchema, Type.Null()], {
              description:
                'Selects the author model and reasoning effort for `output_format=svg`. Supply `svg.model` when SVG model selection is enabled. Otherwise, omit this object. SVG output requires `n=1` and cannot use streaming, partial images, or output compression. Use multipart fields such as `svg[model]`.',
            }),
          ),
          output_compression: Type.Optional(
            Type.Union([
              Codec(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '100' }),
                  (value) => Number.isSafeInteger(Number(value)),
                  () => 'must be a safe integer',
                ),
              )
                .Decode((value) => Number(value))
                .Encode((value) => String(value)),
              Type.Null(),
            ]),
          ),
          safety_identifier: Type.Optional(
            Type.Union([
              Type.String({
                maxLength: 128,
                description:
                  'A stable identifier for an end user in your organization, used for safety monitoring and abuse detection. Hash a username or email address to avoid sending identifying information. A non-empty value takes precedence over the deprecated `user` parameter. If omitted, null, or empty, the API uses `user` when available. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).',
                examples: ['user-1234'],
              }),
              Type.Null(),
            ]),
          ),
          user: Type.Optional(
            Type.String({
              description:
                'Deprecated: use `safety_identifier` instead. This parameter remains accepted for backward compatibility and is used when `safety_identifier` is omitted, null, or empty. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).',
              examples: ['user-1234'],
              deprecated: true,
            }),
          ),
          input_fidelity: Type.Optional(Type.Union([InputFidelitySchema, Type.Null()])),
          stream: Type.Optional(
            Type.Union([
              Codec(
                Type.String({
                  pattern:
                    '^(?:[Tt][Rr][Uu][Ee]|1|[Yy][Ee][Ss]|[Oo][Nn]|[Yy]|[Ee][Nn][Aa][Bb][Ll][Ee][Dd]|[Ff][Aa][Ll][Ss][Ee]|0|[Nn][Oo]|[Oo][Ff][Ff]|[Nn]|[Dd][Ii][Ss][Aa][Bb][Ll][Ee][Dd])$',
                  default: 'false',
                }),
              )
                .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
                .Encode((value) => (value ? 'true' : 'false')),
              Type.Null(),
            ]),
          ),
          partial_images: Type.Optional(
            Type.Union([
              Type.Optional(
                Codec(
                  Type.Refine(
                    Type.Refine(
                      Type.Refine(
                        Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '0' }),
                        (value) => Number.isSafeInteger(Number(value)),
                        () => 'must be a safe integer',
                      ),
                      (value) => Number(value) >= 0,
                      () => 'must be >= 0',
                    ),
                    (value) => Number(value) <= 3,
                    () => 'must be <= 3',
                  ),
                )
                  .Decode((value) => Number(value))
                  .Encode((value) => String(value)),
              ),
              Type.Null(),
            ]),
          ),
          quality: Type.Optional(
            Type.Union(
              [
                Type.Union([
                  Type.Literal('low'),
                  Type.Literal('medium'),
                  Type.Literal('high'),
                  Type.Literal('xhigh'),
                  Type.Literal('max'),
                  Type.Literal('auto'),
                  Type.Literal('standard'),
                ]),
                Type.Null(),
              ],
              {
                description:
                  'The quality of the image that will be generated for GPT image models. The GPT image models support `low`, `medium`, and `high`. `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`, including their `2026-09-08` snapshots, also support `xhigh` and `max`. Defaults to `auto`.\n',
                examples: ['high'],
                default: 'auto',
              },
            ),
          ),
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
            'application/json': { schema: resolver(toStandardSchemaV1(ImagesResponseSchema)) },
            'text/event-stream': {
              schema: resolver(toStandardSchemaV1(ImageGenStreamEventSchema)),
            },
          },
        },
        '400': {
          description: 'Invalid image request, including invalid parameters or input.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The project does not have access to the requested model.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '410': {
          description:
            'The requested DALL-E image endpoint is unavailable because it has been retired.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The image could not be generated or processed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '503': InferenceServiceUnavailableResponse,
      },
    }),
    validator('json', toStandardSchemaV1(CreateImageRequestSchema)),
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
            'application/json': { schema: resolver(toStandardSchemaV1(ImagesResponseSchema)) },
          },
        },
        '400': {
          description:
            'Invalid image or request, or the request cannot be processed for this account.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The project does not have access to the requested model.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '410': {
          description: 'The image variations endpoint is no longer available.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
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
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '500': {
          description: 'The image variation could not be generated or processed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'form',
      toStandardSchemaV1(
        Type.Object(
          {
            image: Type.String({
              description:
                'The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.',
            }),
            model: Type.Optional(
              Type.Union([Type.String(), Type.Literal('dall-e-2'), Type.Null()], {
                description:
                  'The legacy model used by the retired image variations endpoint. This endpoint no longer accepts requests.',
                examples: ['dall-e-2'],
                default: 'dall-e-2',
              }),
            ),
            n: Type.Optional(
              Type.Union([
                Codec(
                  Type.Refine(
                    Type.Refine(
                      Type.Refine(
                        Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '1' }),
                        (value) => Number.isSafeInteger(Number(value)),
                        () => 'must be a safe integer',
                      ),
                      (value) => Number(value) >= 1,
                      () => 'must be >= 1',
                    ),
                    (value) => Number(value) <= 10,
                    () => 'must be <= 10',
                  ),
                )
                  .Decode((value) => Number(value))
                  .Encode((value) => String(value)),
                Type.Null(),
              ]),
            ),
            response_format: Type.Optional(
              Type.Union([
                Type.Union([Type.Literal('url'), Type.Literal('b64_json')], {
                  description:
                    'The format in which the generated images are returned. Must be one of `url` or `b64_json`. URLs are only valid for 60 minutes after the image has been generated.',
                  examples: ['url'],
                  default: 'url',
                }),
                Type.Null(),
              ]),
            ),
            size: Type.Optional(
              Type.Union([
                Type.Union(
                  [Type.Literal('256x256'), Type.Literal('512x512'), Type.Literal('1024x1024')],
                  {
                    description:
                      'The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`.',
                    examples: ['1024x1024'],
                    default: '1024x1024',
                  },
                ),
                Type.Null(),
              ]),
            ),
            user: Type.Optional(
              Type.String({
                description:
                  'A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).\n',
                examples: ['user-1234'],
              }),
            ),
          },
          {
            description: 'Legacy request for the retired image variations endpoint.',
            deprecated: true,
          },
        ),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
