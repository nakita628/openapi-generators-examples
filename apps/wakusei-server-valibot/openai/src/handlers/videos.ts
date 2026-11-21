import { os } from '@orpc/server'
import * as v from 'valibot'
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
    v.object({
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(100),
        ),
      ),
      order: v.optional(OrderEnumSchema),
      after: v.optional(
        v.pipe(
          v.string(),
          v.description('Identifier for the last item from the previous pagination request'),
        ),
      ),
    }),
  )
  .output(VideoListResourceSchema)
  .handler(async ({ input }) => {})

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
  .handler(async ({ input }) => {})

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
  .handler(async ({ input }) => {})

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
  .input(v.object({ character_id: v.pipe(v.string(), v.metadata({ examples: ['char_123'] })) }))
  .output(VideoCharacterResourceSchema)
  .handler(async ({ input }) => {})

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
  .handler(async ({ input }) => {})

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
  .handler(async ({ input }) => {})

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
  .input(v.object({ video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })) }))
  .output(VideoResourceSchema)
  .handler(async ({ input }) => {})

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
  .input(v.object({ video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })) }))
  .output(DeletedVideoResourceSchema)
  .handler(async ({ input }) => {})

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
    v.object({
      video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })),
      variant: v.optional(VideoContentVariantSchema),
    }),
  )
  .output(v.string())
  .handler(async ({ input }) => {})

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
    v.object({
      video_id: v.pipe(v.string(), v.metadata({ examples: ['video_123'] })),
      prompt: v.pipe(
        v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32000)),
        v.description('Updated text prompt that directs the remix generation.'),
      ),
    }),
  )
  .output(VideoResourceSchema)
  .handler(async ({ input }) => {})
