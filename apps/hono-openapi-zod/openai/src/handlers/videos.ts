import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  ErrorResponseSchema,
  OrderEnumSchema,
  VideoModelSchema,
  VideoSizeSchema,
  VideoResourceSchema,
  VideoListResourceSchema,
  ImageRefParam2Schema,
  VideoSecondsSchema,
  CreateVideoJsonBodySchema,
  CreateVideoCharacterBodySchema,
  VideoCharacterResourceSchema,
  VideoReferenceInputParamSchema,
  CreateVideoEditJsonBodySchema,
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
    validator(
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
    validator('param', z.object({ character_id: z.string().meta({ examples: ['char_123'] }) })),
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
    validator(
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
    validator(
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
    validator('param', z.object({ video_id: z.string().meta({ examples: ['video_123'] }) })),
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
    validator('param', z.object({ video_id: z.string().meta({ examples: ['video_123'] }) })),
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
            'video/mp4': { schema: resolver(z.file()), example: '<binary MP4 video content>' },
            'image/webp': { schema: resolver(z.file()) },
            'application/json': { schema: resolver(z.string()) },
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
    validator('param', z.object({ video_id: z.string().meta({ examples: ['video_123'] }) })),
    validator('query', z.object({ variant: VideoContentVariantSchema.exactOptional() })),
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
    validator('param', z.object({ video_id: z.string().meta({ examples: ['video_123'] }) })),
    validator('json', CreateVideoRemixBodySchema),
    validator('form', CreateVideoRemixBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
