import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
  OrderEnumSchema,
  VideoModelSchema,
  VideoSizeSchema,
  ImageRefParam2Schema,
  VideoSecondsSchema,
  CreateVideoJsonBodySchema,
  CreateVideoCharacterBodySchema,
  VideoReferenceInputParamSchema,
  CreateVideoEditJsonBodySchema,
  CreateVideoExtendJsonBodySchema,
  VideoContentVariantSchema,
  CreateVideoRemixBodySchema,
} from '../components'

export const videosHandler = new Hono()
  .get(
    '/videos',
    sValidator(
      'query',
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0).max(100),
          )
          .exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description: 'Identifier for the last item from the previous pagination request',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos',
    sValidator('json', CreateVideoJsonBodySchema),
    sValidator(
      'form',
      z
        .object({
          model: VideoModelSchema.meta({
            description:
              'The video generation model to use (allowed values: sora-2, sora-2-pro). Defaults to `sora-2`.',
          }).exactOptional(),
          prompt: z
            .string()
            .min(1)
            .max(32000)
            .meta({ description: 'Text prompt that describes the video to generate.' }),
          input_reference: z
            .union([
              z
                .file()
                .meta({
                  description:
                    'Optional reference asset upload or reference object that guides generation.',
                }),
              ImageRefParam2Schema.meta({
                description:
                  'Optional reference asset upload or reference object that guides generation. Provide exactly one of `image_url` or `file_id` when using an object.',
              }),
            ])
            .exactOptional(),
          seconds: VideoSecondsSchema.meta({
            description:
              'Clip duration in seconds (allowed values: 4, 8, 12). Defaults to 4 seconds.',
          }).exactOptional(),
          size: VideoSizeSchema.meta({
            description:
              'Output resolution formatted as width x height (allowed values: 720x1280, 1280x720, 1024x1792, 1792x1024). Defaults to 720x1280.',
          }).exactOptional(),
        })
        .meta({ description: 'Multipart parameters for creating a new video generation job.' }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/videos/characters', sValidator('form', CreateVideoCharacterBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/videos/characters/:character_id',
    sValidator('param', z.object({ character_id: z.string().meta({ examples: ['char_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/edits',
    sValidator('json', CreateVideoEditJsonBodySchema),
    sValidator(
      'form',
      z
        .object({
          video: z.union([
            z.file().meta({ description: 'Reference to the completed video to edit.' }),
            VideoReferenceInputParamSchema.meta({
              description: 'Reference to the completed video to edit.',
            }),
          ]),
          prompt: z
            .string()
            .min(1)
            .max(32000)
            .meta({ description: 'Text prompt that describes how to edit the source video.' }),
        })
        .meta({ description: 'Parameters for editing an existing generated video.' }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/extensions',
    sValidator('json', CreateVideoExtendJsonBodySchema),
    sValidator(
      'form',
      z
        .object({
          video: z.union([
            VideoReferenceInputParamSchema.meta({
              description: 'Reference to the completed video to extend.',
            }),
            z.file().meta({ description: 'Reference to the completed video to extend.' }),
          ]),
          prompt: z
            .string()
            .min(1)
            .max(32000)
            .meta({ description: 'Updated text prompt that directs the extension generation.' }),
          seconds: VideoSecondsSchema.meta({
            description:
              'Length of the newly generated extension segment in seconds (allowed values: 4, 8, 12, 16, 20).',
          }),
        })
        .meta({ description: 'Multipart parameters for extending an existing generated video.' }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/videos/:video_id',
    sValidator('param', z.object({ video_id: z.string().meta({ examples: ['video_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/videos/:video_id',
    sValidator('param', z.object({ video_id: z.string().meta({ examples: ['video_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/videos/:video_id/content',
    sValidator('param', z.object({ video_id: z.string().meta({ examples: ['video_123'] }) })),
    sValidator('query', z.object({ variant: VideoContentVariantSchema.exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/:video_id/remix',
    sValidator('param', z.object({ video_id: z.string().meta({ examples: ['video_123'] }) })),
    sValidator('json', CreateVideoRemixBodySchema),
    sValidator('form', CreateVideoRemixBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
