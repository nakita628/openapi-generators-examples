import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  CreateImageRequestSchema,
  EditImageBodyJsonParamSchema,
  ErrorResponseSchema,
  ImageEditStreamEventSchema,
  ImageGenStreamEventSchema,
  ImagesResponseSchema,
  ReasoningEffortEnumSchema,
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
      z.object({
        frame_count: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z.coerce
              .number()
              .int()
              .min(2)
              .max(16)
              .nullable()
              .meta({
                description:
                  "Number of frames for GIF output. Accepts integers from 2 through 16. Defaults to 9 when omitted. Only supported with output_format=gif. The requested size must satisfy the selected model's GIF size limits. GIF output does not support streaming, partial images, masks, or custom output compression. Requires access to the GIF preview for the selected model.",
              }),
          )
          .exactOptional(),
        frame_duration_ms: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z.coerce
              .number()
              .int()
              .min(20)
              .nullable()
              .meta({
                description:
                  'Requested delay per GIF frame, in milliseconds. Defaults to 200 when omitted. GIF output rounds to the nearest 10 ms and caps the encoded delay at 655,350 ms per frame. Only supported with output_format=gif.',
              }),
          )
          .exactOptional(),
        complexity: ComplexitySchema.exactOptional(),
        image: z
          .union([
            z.file(),
            z.preprocess(
              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
              z.array(z.file()).max(16),
            ),
          ])
          .meta({
            description:
              'The image(s) to edit. Must be a supported image file or an array of images.\n\nFor the GPT image models (`gpt-image-1-mini`, `gpt-image-1.5`,\n`gpt-image-2`, `gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`,\n`gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`, and\n`gpt-image-2.5-flare-2026-09-08`), each image should be a `png`, `webp`, or `jpg`\nfile less than 50MB. You can provide up to 16 images. `chatgpt-image-latest`\nfollows the same input constraints as GPT image models.\n',
          }),
        prompt: z
          .string()
          .meta({
            description:
              'A text description of the desired image(s). The maximum length is 32000 characters for the GPT image models.',
            examples: ['A cute baby sea otter wearing a beret'],
          }),
        mask: z
          .file()
          .meta({
            description:
              'An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where `image` should be edited. If there are multiple images provided, the mask will be applied on the first image. Must be a valid PNG file, less than 4MB, and have the same dimensions as `image`.',
          })
          .exactOptional(),
        markup: MarkupSchema.meta({
          description:
            "A transparent PNG overlaid on the first image to guide the edit. Must match that image's dimensions after orientation and contain transparent pixels. Supports GPT Image 2.5. Cannot be combined with mask.",
        }).exactOptional(),
        background: z
          .union([
            z.enum(['transparent', 'opaque', 'auto']),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .default('auto')
          .meta({
            description:
              'Set the background of the generated image(s). This parameter is only supported for\nthe GPT image models. Must be one of `transparent`, `opaque`, or `auto` (default\nvalue). When `auto` is used, the model will automatically determine the best\nbackground for the image.\n\n`gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`, including their `2026-09-08`\nsnapshots, support `opaque` and `transparent` backgrounds. Transparent backgrounds\nare available for supported GPT Image models. For `gpt-image-2` and\n`gpt-image-2-2026-04-21`, this support is in preview. When using `transparent`,\nset the output format to `png` or `webp`.\n',
            examples: ['transparent'],
          })
          .exactOptional(),
        model: z
          .union([
            z.string(),
            z.enum([
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
          ])
          .meta({
            description:
              'The GPT image model to use for image editing\n(`gpt-image-1-mini`, `gpt-image-1.5`, `gpt-image-2`,\n`gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`,\n`gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`,\n`gpt-image-2.5-flare-2026-09-08`, `gpt-image-2.6-sunburst`, `gpt-image-2.6-flare`,\nor `chatgpt-image-latest`).\n\n`gpt-image-1` was shut down on October 23, 2026. Use\n`gpt-image-2.5-sunburst` or `gpt-image-2.5-flare` instead.\n',
            examples: ['gpt-image-2.6-flare'],
          }),
        n: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z.coerce
              .number()
              .int()
              .min(1)
              .max(10)
              .nullable()
              .default(1)
              .meta({
                description: 'The number of images to generate. Must be between 1 and 10.',
                examples: [1],
              }),
          )
          .exactOptional(),
        size: z
          .union([
            z.string(),
            z.enum(['1024x1024', '1536x1024', '1024x1536', 'auto', '256x256', '512x512']),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .default('auto')
          .meta({
            description:
              "The size of the generated images. Defaults to `auto`. For `gpt-image-2`, `gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`, `gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`, and `gpt-image-2.5-flare-2026-09-08`, arbitrary resolutions are supported as `WIDTHxHEIGHT` strings, for example `1536x864`. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above `2560x1440` are experimental, and the maximum supported resolution is `3840x2160`. The requested size must also satisfy the model's current pixel and edge limits. The standard sizes `1024x1024`, `1536x1024`, and `1024x1536` are supported by the GPT image models; `auto` is supported for models that allow automatic sizing.",
            examples: ['1024x1024'],
          })
          .exactOptional(),
        response_format: z
          .union([z.literal('url'), z.literal('b64_json'), z.literal(null)])
          .nullable()
          .meta({
            description:
              'Legacy response format parameter for retired image models. Unsupported for GPT image models, which always return base64-encoded images.',
            deprecated: true,
          })
          .exactOptional(),
        output_format: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                ImagesApiOutputFormatSchema,
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .default('png')
              .meta({
                description:
                  'The format in which the generated images are returned. This parameter is\nonly supported for the GPT image models.\nThe default value is `png`.\nSVG output requires a supported image model and project access.\n',
                examples: ['png'],
              })
              .nullable(),
          )
          .exactOptional(),
        svg: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.object({
                  model: z.string().min(1).exactOptional(),
                  reasoning: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .union([
                          z
                            .object({
                              effort: z
                                .union([
                                  ReasoningEffortEnumSchema.meta({
                                    description:
                                      'Controls how much effort the model should spend on reasoning for this request.',
                                  }),
                                ])
                                .exactOptional(),
                            })
                            .meta({
                              description:
                                "Reasoning effort for SVG authoring. When omitted, uses the author model's default in both Images and Responses.",
                            }),
                          z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                        ])
                        .nullable(),
                    )
                    .exactOptional(),
                }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .meta({
                description:
                  'Selects the author model and reasoning effort for `output_format=svg`. Supply `svg.model` when SVG model selection is enabled. Otherwise, omit this object. SVG output requires `n=1` and cannot use streaming, partial images, or output compression. Use multipart fields such as `svg[model]`.',
              })
              .nullable(),
          )
          .exactOptional(),
        output_compression: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z.coerce
              .number()
              .int()
              .nullable()
              .default(100)
              .meta({
                description:
                  'The compression level (0-100%) for the generated images. This parameter\nis only supported for the GPT image models with the `webp` or `jpeg` output\nformats, and defaults to 100.\n',
                examples: [100],
              }),
          )
          .exactOptional(),
        safety_identifier: z
          .string()
          .max(128)
          .nullable()
          .meta({
            description:
              'A stable identifier for an end user in your organization, used for safety monitoring and abuse detection. Hash a username or email address to avoid sending identifying information. A non-empty value takes precedence over the deprecated `user` parameter. If omitted, null, or empty, the API uses `user` when available. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).',
            examples: ['user-1234'],
          })
          .exactOptional(),
        user: z
          .string()
          .meta({
            description:
              'Deprecated: use `safety_identifier` instead. This parameter remains accepted for backward compatibility and is used when `safety_identifier` is omitted, null, or empty. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).',
            examples: ['user-1234'],
            deprecated: true,
          })
          .exactOptional(),
        input_fidelity: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                InputFidelitySchema,
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        stream: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .stringbool()
              .nullable()
              .default(false)
              .meta({
                description:
                  'Edit the image in streaming mode. Defaults to `false`. See the\n[Image generation guide](https://developers.openai.com/api/docs/guides/image-generation) for more information.\n',
                examples: [false],
              }),
          )
          .exactOptional(),
        partial_images: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.coerce
                  .number()
                  .int()
                  .min(0)
                  .max(3)
                  .default(0)
                  .meta({
                    description:
                      'The number of partial images to generate. This parameter is used for\nstreaming responses that return partial images. Value must be between 0 and 3.\nWhen set to 0, the response will be a single image sent in one streaming event.\n\nNote that the final image may be sent before the full number of partial images\nare generated if the full image is generated more quickly.\n',
                    examples: [1],
                  }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        quality: z
          .union([
            z.enum(['low', 'medium', 'high', 'xhigh', 'max', 'auto', 'standard']),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .default('auto')
          .meta({
            description:
              'The quality of the image that will be generated for GPT image models. The GPT image models support `low`, `medium`, and `high`. `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`, including their `2026-09-08` snapshots, also support `xhigh` and `max`. Defaults to `auto`.\n',
            examples: ['high'],
          })
          .exactOptional(),
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
      z
        .object({
          image: z
            .file()
            .meta({
              description:
                'The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.',
            }),
          model: z
            .union([
              z.string(),
              z.literal('dall-e-2'),
              z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
            ])
            .default('dall-e-2')
            .meta({
              description:
                'The legacy model used by the retired image variations endpoint. This endpoint no longer accepts requests.',
              examples: ['dall-e-2'],
            })
            .exactOptional(),
          n: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z.coerce
                .number()
                .int()
                .min(1)
                .max(10)
                .nullable()
                .default(1)
                .meta({
                  description: 'The number of images to generate. Must be between 1 and 10.',
                  examples: [1],
                }),
            )
            .exactOptional(),
          response_format: z
            .union([z.literal('url'), z.literal('b64_json'), z.literal(null)])
            .nullable()
            .default('url')
            .meta({
              description:
                'The format in which the generated images are returned. Must be one of `url` or `b64_json`. URLs are only valid for 60 minutes after the image has been generated.',
              examples: ['url'],
            })
            .exactOptional(),
          size: z
            .union([
              z.literal('256x256'),
              z.literal('512x512'),
              z.literal('1024x1024'),
              z.literal(null),
            ])
            .nullable()
            .default('1024x1024')
            .meta({
              description:
                'The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`.',
              examples: ['1024x1024'],
            })
            .exactOptional(),
          user: z
            .string()
            .meta({
              description:
                'A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).\n',
              examples: ['user-1234'],
            })
            .exactOptional(),
        })
        .meta({
          description: 'Legacy request for the retired image variations endpoint.',
          deprecated: true,
        }),
    ),
    (c) => {},
  )
