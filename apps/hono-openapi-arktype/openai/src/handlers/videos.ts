import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
import {
  ErrorResponseSchema,
  OrderEnumSchema,
  VideoResourceSchema,
  VideoListResourceSchema,
  CreateVideoMultipartBodySchema,
  CreateVideoJsonBodySchema,
  CreateVideoCharacterBodySchema,
  VideoCharacterResourceSchema,
  CreateVideoEditMultipartBodySchema,
  CreateVideoEditJsonBodySchema,
  CreateVideoExtendMultipartBodySchema,
  CreateVideoExtendJsonBodySchema,
  DeletedVideoResourceSchema,
  VideoContentVariantSchema,
  CreateVideoRemixBodySchema,
  InferenceRateLimitedResponse,
  InferenceServiceUnavailableResponse,
} from '../components'

export const videosHandler = new Hono()
  .get(
    '/videos',
    describeRoute({
      tags: ['Videos'],
      summary: 'List videos',
      description: 'List recently generated videos for the current project.',
      operationId: 'ListVideos',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(VideoListResourceSchema) } },
        },
        '400': {
          description:
            'The query parameters are invalid, or the organization does not support video generation.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The video specified by after was not found or is not accessible, or the Videos API is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
      deprecated: true,
    }),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100'),
        'order?': OrderEnumSchema,
        'after?': type('string').describe(
          'Identifier for the last item from the previous pagination request',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos',
    describeRoute({
      tags: ['Videos'],
      summary: 'Create a video',
      description: 'Create a new video generation job from a prompt and optional reference assets.',
      operationId: 'createVideo',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(VideoResourceSchema) } },
        },
        '400': {
          description:
            'The video request is invalid, or the organization does not support video generation.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'A referenced character was not found or is not accessible, or the Videos API is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The video generation task could not be created.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '503': InferenceServiceUnavailableResponse,
      },
      deprecated: true,
    }),
    validator('json', CreateVideoJsonBodySchema),
    validator('form', CreateVideoMultipartBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/characters',
    describeRoute({
      tags: ['Videos'],
      summary: 'Create a character',
      description: 'Create a character from an uploaded video.',
      operationId: 'CreateVideoCharacter',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(VideoCharacterResourceSchema) } },
        },
        '400': {
          description:
            'The character request or video upload is invalid, or the organization does not support video generation.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The video character endpoint is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '500': {
          description: 'The character could not be created.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '504': {
          description: 'The character creation request timed out.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
      deprecated: true,
    }),
    validator('form', CreateVideoCharacterBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/videos/characters/:character_id',
    describeRoute({
      tags: ['Videos'],
      summary: 'Retrieve a character',
      description: 'Fetch a character.',
      operationId: 'GetVideoCharacter',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(VideoCharacterResourceSchema) } },
        },
        '400': {
          description:
            'The character ID is invalid, or the organization does not support video generation.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The character was not found or is not accessible, or the video character endpoint is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
      deprecated: true,
    }),
    validator('param', type({ character_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/edits',
    describeRoute({
      tags: ['Videos'],
      summary: 'Create a video edit',
      description:
        'Create a new video generation job by editing a source video or existing generated video.',
      operationId: 'CreateVideoEdit',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(VideoResourceSchema) } },
        },
        '400': {
          description:
            'The edit request or source video is invalid, or the organization does not support video generation.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The source video or a referenced character was not found or is not accessible, the source video is not ready, or the Videos API is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description:
            'The source video media is unavailable or the edit task could not be created.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '503': InferenceServiceUnavailableResponse,
      },
      deprecated: true,
    }),
    validator('json', CreateVideoEditJsonBodySchema),
    validator('form', CreateVideoEditMultipartBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/extensions',
    describeRoute({
      tags: ['Videos'],
      summary: 'Create a video extension',
      description: 'Create an extension of a completed video.',
      operationId: 'CreateVideoExtend',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(VideoResourceSchema) } },
        },
        '400': {
          description:
            'The extension request or source video is invalid, or the organization does not support video generation.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The source video was not found or is not accessible, the source video is not ready, or the Videos API is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description:
            'The source video media is unavailable or the extension task could not be created.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '503': InferenceServiceUnavailableResponse,
      },
      deprecated: true,
    }),
    validator('json', CreateVideoExtendJsonBodySchema),
    validator('form', CreateVideoExtendMultipartBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/videos/:video_id',
    describeRoute({
      tags: ['Videos'],
      summary: 'Retrieve a video',
      description: 'Fetch the latest metadata for a generated video.',
      operationId: 'GetVideo',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(VideoResourceSchema) } },
        },
        '400': {
          description:
            'The request is invalid, or the organization does not support video generation.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The video was not found or is not accessible, or the Videos API is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
      deprecated: true,
    }),
    validator('param', type({ video_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/videos/:video_id',
    describeRoute({
      tags: ['Videos'],
      summary: 'Delete a video',
      description: 'Permanently delete a completed or failed video and its stored assets.',
      operationId: 'DeleteVideo',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(DeletedVideoResourceSchema) } },
        },
        '400': {
          description:
            'The video is still being processed, the request is invalid, or the organization does not support video generation.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The video was not found or is not accessible, or the Videos API is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '500': {
          description: 'The video or its stored media could not be deleted.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
      deprecated: true,
    }),
    validator('param', type({ video_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/videos/:video_id/content',
    describeRoute({
      tags: ['Videos'],
      summary: 'Download video content',
      description:
        'Download the generated video bytes or a derived preview asset.\n\nStreams the rendered video content for the specified video job.',
      operationId: 'RetrieveVideoContent',
      responses: {
        '200': {
          description: 'The video bytes or preview asset that matches the requested variant.',
          content: {
            'video/mp4': { schema: resolver(type('File')), example: '<binary MP4 video content>' },
            'image/webp': { schema: resolver(type('File')) },
            'application/json': { schema: resolver(type('string')) },
          },
        },
        '400': {
          description:
            'The request or content variant is invalid, or the organization does not support video generation.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The video was not found or is not ready, its download is unavailable or expired, or the Videos API is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '500': {
          description: 'The requested video media is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
      deprecated: true,
    }),
    validator('param', type({ video_id: 'string' })),
    validator('query', type({ 'variant?': VideoContentVariantSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/videos/:video_id/remix',
    describeRoute({
      tags: ['Videos'],
      summary: 'Create a video remix',
      description: 'Create a remix of a completed video using a refreshed prompt.',
      operationId: 'CreateVideoRemix',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(VideoResourceSchema) } },
        },
        '400': {
          description:
            'The request or source video is not supported for remixing, or the organization does not support video generation.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The source video or a referenced character was not found or is not accessible, the source video is not ready, or the Videos API is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description:
            'The source generation is unavailable or the remix task could not be created.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '503': InferenceServiceUnavailableResponse,
      },
      deprecated: true,
    }),
    validator('param', type({ video_id: 'string' })),
    validator('json', CreateVideoRemixBodySchema),
    validator('form', CreateVideoRemixBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
