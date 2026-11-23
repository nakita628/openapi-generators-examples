import { os } from '@orpc/server'
import * as z from 'zod'
import {
  CreateVideoEditJsonBodySchema,
  CreateVideoExtendJsonBodySchema,
  CreateVideoJsonBodySchema,
  DeletedVideoResourceSchema,
  OrderEnumSchema,
  VideoCharacterResourceSchema,
  VideoContentVariantSchema,
  VideoListResourceSchema,
  VideoResourceSchema,
} from '../components'

export const getVideos = os
  .route({
    method: 'GET',
    path: '/videos',
    tags: ['Videos'],
    summary: 'List videos',
    description: 'List recently generated videos for the current project.',
    deprecated: true,
    successDescription: 'Success',
  })
  .input(
    z.object({
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0).max(100),
        )
        .exactOptional(),
      order: OrderEnumSchema.exactOptional(),
      after: z
        .string()
        .meta({ description: 'Identifier for the last item from the previous pagination request' })
        .exactOptional(),
    }),
  )
  .output(VideoListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVideos = os
  .route({
    method: 'POST',
    path: '/videos',
    tags: ['Videos'],
    summary: 'Create a video',
    description: 'Create a new video generation job from a prompt and optional reference assets.',
    deprecated: true,
    successDescription: 'Success',
  })
  .input(CreateVideoJsonBodySchema)
  .output(VideoResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVideosCharacters = os
  .route({
    method: 'POST',
    path: '/videos/characters',
    tags: ['Videos'],
    summary: 'Create a character',
    description: 'Create a character from an uploaded video.',
    deprecated: true,
    successDescription: 'Success',
  })
  .output(VideoCharacterResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getVideosCharactersCharacterId = os
  .route({
    method: 'GET',
    path: '/videos/characters/{character_id}',
    tags: ['Videos'],
    summary: 'Retrieve a character',
    description: 'Fetch a character.',
    deprecated: true,
    successDescription: 'Success',
  })
  .input(z.object({ character_id: z.string().meta({ examples: ['char_123'] }) }))
  .output(VideoCharacterResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVideosEdits = os
  .route({
    method: 'POST',
    path: '/videos/edits',
    tags: ['Videos'],
    summary: 'Create a video edit',
    description:
      'Create a new video generation job by editing a source video or existing generated video.',
    deprecated: true,
    successDescription: 'Success',
  })
  .input(CreateVideoEditJsonBodySchema)
  .output(VideoResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVideosExtensions = os
  .route({
    method: 'POST',
    path: '/videos/extensions',
    tags: ['Videos'],
    summary: 'Create a video extension',
    description: 'Create an extension of a completed video.',
    deprecated: true,
    successDescription: 'Success',
  })
  .input(CreateVideoExtendJsonBodySchema)
  .output(VideoResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getVideosVideoId = os
  .route({
    method: 'GET',
    path: '/videos/{video_id}',
    tags: ['Videos'],
    summary: 'Retrieve a video',
    description: 'Fetch the latest metadata for a generated video.',
    deprecated: true,
    successDescription: 'Success',
  })
  .input(z.object({ video_id: z.string().meta({ examples: ['video_123'] }) }))
  .output(VideoResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteVideosVideoId = os
  .route({
    method: 'DELETE',
    path: '/videos/{video_id}',
    tags: ['Videos'],
    summary: 'Delete a video',
    description: 'Permanently delete a completed or failed video and its stored assets.',
    deprecated: true,
    successDescription: 'Success',
  })
  .input(z.object({ video_id: z.string().meta({ examples: ['video_123'] }) }))
  .output(DeletedVideoResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getVideosVideoIdContent = os
  .route({
    method: 'GET',
    path: '/videos/{video_id}/content',
    tags: ['Videos'],
    summary: 'Download video content',
    description:
      'Download the generated video bytes or a derived preview asset.\n\nStreams the rendered video content for the specified video job.',
    deprecated: true,
    successDescription: 'The video bytes or preview asset that matches the requested variant.',
  })
  .input(
    z.object({
      video_id: z.string().meta({ examples: ['video_123'] }),
      variant: VideoContentVariantSchema.exactOptional(),
    }),
  )
  .output(z.string())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postVideosVideoIdRemix = os
  .route({
    method: 'POST',
    path: '/videos/{video_id}/remix',
    tags: ['Videos'],
    summary: 'Create a video remix',
    description: 'Create a remix of a completed video using a refreshed prompt.',
    deprecated: true,
    successDescription: 'Success',
  })
  .input(
    z.object({
      video_id: z.string().meta({ examples: ['video_123'] }),
      prompt: z
        .string()
        .min(1)
        .max(32000)
        .meta({ description: 'Updated text prompt that directs the remix generation.' }),
    }),
  )
  .output(VideoResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
