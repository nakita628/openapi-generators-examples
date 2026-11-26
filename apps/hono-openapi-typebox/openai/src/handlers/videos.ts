import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(VideoListResourceSchema)) },
          },
        },
        '400': {
          description:
            'The query parameters are invalid, or the organization does not support video generation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The video specified by after was not found or is not accessible, or the Videos API is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
      deprecated: true,
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.Refine(
                    Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                    (value) => Number.isSafeInteger(Number(value)),
                    () => 'must be a safe integer',
                  ),
                  (value) => Number(value) >= 0,
                  () => 'must be >= 0',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(OrderEnumSchema),
          after: Type.Optional(
            Type.String({
              description: 'Identifier for the last item from the previous pagination request',
            }),
          ),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(VideoResourceSchema)) },
          },
        },
        '400': {
          description:
            'The video request is invalid, or the organization does not support video generation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'A referenced character was not found or is not accessible, or the Videos API is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The video generation task could not be created.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '503': InferenceServiceUnavailableResponse,
      },
      deprecated: true,
    }),
    validator('json', toStandardSchemaV1(CreateVideoJsonBodySchema)),
    validator('form', toStandardSchemaV1(CreateVideoMultipartBodySchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(VideoCharacterResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The character request or video upload is invalid, or the organization does not support video generation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The video character endpoint is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '500': {
          description: 'The character could not be created.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '504': {
          description: 'The character creation request timed out.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
      deprecated: true,
    }),
    validator('form', toStandardSchemaV1(CreateVideoCharacterBodySchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(VideoCharacterResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The character ID is invalid, or the organization does not support video generation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The character was not found or is not accessible, or the video character endpoint is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
      deprecated: true,
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ character_id: Type.String({ examples: ['char_123'] }) })),
    ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(VideoResourceSchema)) },
          },
        },
        '400': {
          description:
            'The edit request or source video is invalid, or the organization does not support video generation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The source video or a referenced character was not found or is not accessible, the source video is not ready, or the Videos API is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description:
            'The source video media is unavailable or the edit task could not be created.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '503': InferenceServiceUnavailableResponse,
      },
      deprecated: true,
    }),
    validator('json', toStandardSchemaV1(CreateVideoEditJsonBodySchema)),
    validator('form', toStandardSchemaV1(CreateVideoEditMultipartBodySchema)),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(VideoResourceSchema)) },
          },
        },
        '400': {
          description:
            'The extension request or source video is invalid, or the organization does not support video generation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The source video was not found or is not accessible, the source video is not ready, or the Videos API is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description:
            'The source video media is unavailable or the extension task could not be created.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '503': InferenceServiceUnavailableResponse,
      },
      deprecated: true,
    }),
    validator('json', toStandardSchemaV1(CreateVideoExtendJsonBodySchema)),
    validator('form', toStandardSchemaV1(CreateVideoExtendMultipartBodySchema)),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(VideoResourceSchema)) },
          },
        },
        '400': {
          description:
            'The request is invalid, or the organization does not support video generation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The video was not found or is not accessible, or the Videos API is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
      deprecated: true,
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ video_id: Type.String({ examples: ['video_123'] }) })),
    ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedVideoResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The video is still being processed, the request is invalid, or the organization does not support video generation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The video was not found or is not accessible, or the Videos API is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '500': {
          description: 'The video or its stored media could not be deleted.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
      deprecated: true,
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ video_id: Type.String({ examples: ['video_123'] }) })),
    ),
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
            'video/mp4': {
              schema: resolver(toStandardSchemaV1(Type.String())),
              example: '<binary MP4 video content>',
            },
            'image/webp': { schema: resolver(toStandardSchemaV1(Type.String())) },
            'application/json': { schema: resolver(toStandardSchemaV1(Type.String())) },
          },
        },
        '400': {
          description:
            'The request or content variant is invalid, or the organization does not support video generation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The video was not found or is not ready, its download is unavailable or expired, or the Videos API is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '500': {
          description: 'The requested video media is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
      deprecated: true,
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ video_id: Type.String({ examples: ['video_123'] }) })),
    ),
    validator(
      'query',
      toStandardSchemaV1(Type.Object({ variant: Type.Optional(VideoContentVariantSchema) })),
    ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(VideoResourceSchema)) },
          },
        },
        '400': {
          description:
            'The request or source video is not supported for remixing, or the organization does not support video generation.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The source video or a referenced character was not found or is not accessible, the source video is not ready, or the Videos API is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description:
            'The source generation is unavailable or the remix task could not be created.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '503': InferenceServiceUnavailableResponse,
      },
      deprecated: true,
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ video_id: Type.String({ examples: ['video_123'] }) })),
    ),
    validator('json', toStandardSchemaV1(CreateVideoRemixBodySchema)),
    validator('form', toStandardSchemaV1(CreateVideoRemixBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
