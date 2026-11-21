import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  CreateImageRequestSchema,
  EditImageBodyJsonParamSchema,
  SvgReasoningParamSchema,
  InputFidelitySchema,
  ComplexitySchema,
  MarkupSchema,
  ImagesApiOutputFormatSchema,
} from '../components'

export const imagesHandler = new Hono()
  .post(
    '/images/edits',
    sValidator('json', EditImageBodyJsonParamSchema),
    sValidator(
      'form',
      type({
        'frame_count?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
              })
              .to('number.integer >= 2 & number.integer <= 16'),
          )
            .or('null')
            .describe(
              "Number of frames for GIF output. Accepts integers from 2 through 16. Defaults to 9 when omitted. Only supported with output_format=gif. The requested size must satisfy the selected model's GIF size limits. GIF output does not support streaming, partial images, masks, or custom output compression. Requires access to the GIF preview for the selected model.",
            ),
        ),
        'frame_duration_ms?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
              })
              .to('number.integer >= 20'),
          )
            .or('null')
            .describe(
              'Requested delay per GIF frame, in milliseconds. Defaults to 200 when omitted. GIF output rounds to the nearest 10 ms and caps the encoded delay at 655,350 ms per frame. Only supported with output_format=gif.',
            ),
        ),
        'complexity?': ComplexitySchema,
        image: type('unknown')
          .pipe((data, ctx) => {
            for (const branch of [
              type('File'),
              type('unknown').pipe(
                (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                type('File[]').and(type('unknown[] <= 16')),
              ),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          })
          .describe(
            'The image(s) to edit. Must be a supported image file or an array of images.\n\nFor the GPT image models (`gpt-image-1-mini`, `gpt-image-1.5`,\n`gpt-image-2`, `gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`,\n`gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`, and\n`gpt-image-2.5-flare-2026-09-08`), each image should be a `png`, `webp`, or `jpg`\nfile less than 50MB. You can provide up to 16 images. `chatgpt-image-latest`\nfollows the same input constraints as GPT image models.\n',
          ),
        prompt: type('string').describe(
          'A text description of the desired image(s). The maximum length is 32000 characters for the GPT image models.',
        ),
        'mask?': type('File').describe(
          'An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where `image` should be edited. If there are multiple images provided, the mask will be applied on the first image. Must be a valid PNG file, less than 4MB, and have the same dimensions as `image`.',
        ),
        'markup?': MarkupSchema.describe(
          "A transparent PNG overlaid on the first image to guide the edit. Must match that image's dimensions after orientation and contain transparent pixels. Supports GPT Image 2.5. Cannot be combined with mask.",
        ),
        'background?': type('unknown')
          .pipe((data, ctx) => {
            for (const branch of [
              type("'transparent' | 'opaque' | 'auto'"),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          })
          .describe(
            'Set the background of the generated image(s). This parameter is only supported for\nthe GPT image models. Must be one of `transparent`, `opaque`, or `auto` (default\nvalue). When `auto` is used, the model will automatically determine the best\nbackground for the image.\n\n`gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`, including their `2026-09-08`\nsnapshots, support `opaque` and `transparent` backgrounds. Transparent backgrounds\nare available for supported GPT Image models. For `gpt-image-2` and\n`gpt-image-2-2026-04-21`, this support is in preview. When using `transparent`,\nset the output format to `png` or `webp`.\n',
          ),
        model: type(
          "string | 'gpt-image-1.5' | 'gpt-image-2' | 'gpt-image-2-2026-04-21' | 'gpt-image-2.5-sunburst' | 'gpt-image-2.5-sunburst-2026-09-08' | 'gpt-image-2.5-flare' | 'gpt-image-2.5-flare-2026-09-08' | 'gpt-image-2.6-sunburst' | 'gpt-image-2.6-flare' | 'gpt-image-1' | 'gpt-image-1-mini' | 'chatgpt-image-latest' | 'dall-e-2'",
        ).describe(
          'The GPT image model to use for image editing\n(`gpt-image-1-mini`, `gpt-image-1.5`, `gpt-image-2`,\n`gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`,\n`gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`,\n`gpt-image-2.5-flare-2026-09-08`, `gpt-image-2.6-sunburst`, `gpt-image-2.6-flare`,\nor `chatgpt-image-latest`).\n\n`gpt-image-1` was shut down on October 23, 2026. Use\n`gpt-image-2.5-sunburst` or `gpt-image-2.5-flare` instead.\n',
        ),
        'n?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
              })
              .to('number.integer >= 1 & number.integer <= 10'),
          )
            .or('null')
            .describe('The number of images to generate. Must be between 1 and 10.'),
        ),
        'size?': type('unknown')
          .pipe((data, ctx) => {
            for (const branch of [
              type('string'),
              type("'1024x1024' | '1536x1024' | '1024x1536' | 'auto' | '256x256' | '512x512'"),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          })
          .describe(
            "The size of the generated images. Defaults to `auto`. For `gpt-image-2`, `gpt-image-2-2026-04-21`, `gpt-image-2.5-sunburst`, `gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`, and `gpt-image-2.5-flare-2026-09-08`, arbitrary resolutions are supported as `WIDTHxHEIGHT` strings, for example `1536x864`. Width and height must both be divisible by 16 and the requested aspect ratio must be between 1:3 and 3:1. Resolutions above `2560x1440` are experimental, and the maximum supported resolution is `3840x2160`. The requested size must also satisfy the model's current pixel and edge limits. The standard sizes `1024x1024`, `1536x1024`, and `1024x1536` are supported by the GPT image models; `auto` is supported for models that allow automatic sizing.",
          ),
        'response_format?': type("'url' | 'b64_json' | null | null").describe(
          'Legacy response format parameter for retired image models. Unsupported for GPT image models, which always return base64-encoded images.',
        ),
        'output_format?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown')
              .pipe((data, ctx) => {
                for (const branch of [
                  ImagesApiOutputFormatSchema,
                  type('unknown')
                    .pipe((data) => (data === 'null' ? null : data))
                    .to('null | null'),
                ]) {
                  const out = branch(data)
                  if (!(out instanceof type.errors)) return out
                }
                return ctx.error('one of the members')
              })
              .describe(
                'The format in which the generated images are returned. This parameter is\nonly supported for the GPT image models.\nThe default value is `png`.\nSVG output requires a supported image model and project access.\n',
              ),
          ).or('null'),
        ),
        'svg?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown')
              .pipe((data, ctx) => {
                for (const branch of [
                  type({
                    'model?': type('string').narrow(
                      (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
                    ),
                    'reasoning?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            SvgReasoningParamSchema.describe(
                              "Reasoning effort for SVG authoring. When omitted, uses the author model's default in both Images and Responses.",
                            ),
                            type('unknown')
                              .pipe((data) => (data === 'null' ? null : data))
                              .to('null | null'),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                      ).or('null'),
                    ),
                  }),
                  type('unknown')
                    .pipe((data) => (data === 'null' ? null : data))
                    .to('null | null'),
                ]) {
                  const out = branch(data)
                  if (!(out instanceof type.errors)) return out
                }
                return ctx.error('one of the members')
              })
              .describe(
                'Selects the author model and reasoning effort for `output_format=svg`. Supply `svg.model` when SVG model selection is enabled. Otherwise, omit this object. SVG output requires `n=1` and cannot use streaming, partial images, or output compression. Use multipart fields such as `svg[model]`.',
              ),
          ).or('null'),
        ),
        'output_compression?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('string').pipe((data, ctx) => {
              const value = Number(data)
              return Number.isSafeInteger(value) ? value : ctx.error('an integer')
            }),
          )
            .or('null')
            .describe(
              'The compression level (0-100%) for the generated images. This parameter\nis only supported for the GPT image models with the `webp` or `jpeg` output\nformats, and defaults to 100.\n',
            ),
        ),
        'safety_identifier?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 128 || ctx.mustBe('at most 128 characters'),
          ),
        )
          .or('null')
          .describe(
            'A stable identifier for an end user in your organization, used for safety monitoring and abuse detection. Hash a username or email address to avoid sending identifying information. A non-empty value takes precedence over the deprecated `user` parameter. If omitted, null, or empty, the API uses `user` when available. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).',
          ),
        'user?': type('string').describe(
          'Deprecated: use `safety_identifier` instead. This parameter remains accepted for backward compatibility and is used when `safety_identifier` is omitted, null, or empty. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).',
        ),
        'input_fidelity?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown').pipe((data, ctx) => {
              for (const branch of [
                InputFidelitySchema,
                type('unknown')
                  .pipe((data) => (data === 'null' ? null : data))
                  .to('null | null'),
              ]) {
                const out = branch(data)
                if (!(out instanceof type.errors)) return out
              }
              return ctx.error('one of the members')
            }),
          ).or('null'),
        ),
        'stream?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
              /^(?:true|1|yes|on|y|enabled)$/i.test(data),
            ),
          )
            .or('null')
            .describe(
              'Edit the image in streaming mode. Defaults to `false`. See the\n[Image generation guide](https://developers.openai.com/api/docs/guides/image-generation) for more information.\n',
            ),
        ),
        'partial_images?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown').pipe((data, ctx) => {
              for (const branch of [
                type('string')
                  .pipe((data, ctx) => {
                    const value = Number(data)
                    return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                  })
                  .to('number.integer >= 0 & number.integer <= 3')
                  .describe(
                    'The number of partial images to generate. This parameter is used for\nstreaming responses that return partial images. Value must be between 0 and 3.\nWhen set to 0, the response will be a single image sent in one streaming event.\n\nNote that the final image may be sent before the full number of partial images\nare generated if the full image is generated more quickly.\n',
                  ),
                type('unknown')
                  .pipe((data) => (data === 'null' ? null : data))
                  .to('null | null'),
              ]) {
                const out = branch(data)
                if (!(out instanceof type.errors)) return out
              }
              return ctx.error('one of the members')
            }),
          ).or('null'),
        ),
        'quality?': type('unknown')
          .pipe((data, ctx) => {
            for (const branch of [
              type("'low' | 'medium' | 'high' | 'xhigh' | 'max' | 'auto' | 'standard'"),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          })
          .describe(
            'The quality of the image that will be generated for GPT image models. The GPT image models support `low`, `medium`, and `high`. `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`, including their `2026-09-08` snapshots, also support `xhigh` and `max`. Defaults to `auto`.\n',
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/images/generations', sValidator('json', CreateImageRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/images/variations',
    sValidator(
      'form',
      type({
        image: type('File').describe(
          'The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.',
        ),
        'model?': type('unknown')
          .pipe((data, ctx) => {
            for (const branch of [
              type('string'),
              type("'dall-e-2'"),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          })
          .describe(
            'The legacy model used by the retired image variations endpoint. This endpoint no longer accepts requests.',
          ),
        'n?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('string')
              .pipe((data, ctx) => {
                const value = Number(data)
                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
              })
              .to('number.integer >= 1 & number.integer <= 10'),
          )
            .or('null')
            .describe('The number of images to generate. Must be between 1 and 10.'),
        ),
        'response_format?': type("'url' | 'b64_json' | null | null").describe(
          'The format in which the generated images are returned. Must be one of `url` or `b64_json`. URLs are only valid for 60 minutes after the image has been generated.',
        ),
        'size?': type("'256x256' | '512x512' | '1024x1024' | null | null").describe(
          'The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`.',
        ),
        'user?': type('string').describe(
          'A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).\n',
        ),
      }).describe('Legacy request for the retired image variations endpoint.'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
