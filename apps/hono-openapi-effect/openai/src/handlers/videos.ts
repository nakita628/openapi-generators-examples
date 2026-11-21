import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema } from 'effect'
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VideoListResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The query parameters are invalid, or the organization does not support video generation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The video specified by after was not found or is not accessible, or the Videos API is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      deprecated: true,
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(
            Schema.String.annotate({
              description: 'Identifier for the last item from the previous pagination request',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VideoResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The video request is invalid, or the organization does not support video generation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'A referenced character was not found or is not accessible, or the Videos API is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description: 'The video generation task could not be created.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '503': InferenceServiceUnavailableResponse,
      },
      deprecated: true,
    }),
    validator('json', Schema.toStandardSchemaV1(CreateVideoJsonBodySchema)),
    validator('form', Schema.toStandardSchemaV1(CreateVideoMultipartBodySchema)),
    (c) => {},
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
              schema: resolver(Schema.toStandardSchemaV1(VideoCharacterResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The character request or video upload is invalid, or the organization does not support video generation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The video character endpoint is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '500': {
          description: 'The character could not be created.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '504': {
          description: 'The character creation request timed out.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      deprecated: true,
    }),
    validator('form', Schema.toStandardSchemaV1(CreateVideoCharacterBodySchema)),
    (c) => {},
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
              schema: resolver(Schema.toStandardSchemaV1(VideoCharacterResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The character ID is invalid, or the organization does not support video generation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The character was not found or is not accessible, or the video character endpoint is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      deprecated: true,
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          character_id: Schema.String.annotate({ jsonSchemaExamples: ['char_123'] }),
        }),
      ),
    ),
    (c) => {},
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VideoResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The edit request or source video is invalid, or the organization does not support video generation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The source video or a referenced character was not found or is not accessible, the source video is not ready, or the Videos API is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description:
            'The source video media is unavailable or the edit task could not be created.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '503': InferenceServiceUnavailableResponse,
      },
      deprecated: true,
    }),
    validator('json', Schema.toStandardSchemaV1(CreateVideoEditJsonBodySchema)),
    validator('form', Schema.toStandardSchemaV1(CreateVideoEditMultipartBodySchema)),
    (c) => {},
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VideoResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The extension request or source video is invalid, or the organization does not support video generation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The source video was not found or is not accessible, the source video is not ready, or the Videos API is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description:
            'The source video media is unavailable or the extension task could not be created.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '503': InferenceServiceUnavailableResponse,
      },
      deprecated: true,
    }),
    validator('json', Schema.toStandardSchemaV1(CreateVideoExtendJsonBodySchema)),
    validator('form', Schema.toStandardSchemaV1(CreateVideoExtendMultipartBodySchema)),
    (c) => {},
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VideoResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request is invalid, or the organization does not support video generation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The video was not found or is not accessible, or the Videos API is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      deprecated: true,
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ video_id: Schema.String.annotate({ jsonSchemaExamples: ['video_123'] }) }),
      ),
    ),
    (c) => {},
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
              schema: resolver(Schema.toStandardSchemaV1(DeletedVideoResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The video is still being processed, the request is invalid, or the organization does not support video generation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The video was not found or is not accessible, or the Videos API is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '500': {
          description: 'The video or its stored media could not be deleted.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      deprecated: true,
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ video_id: Schema.String.annotate({ jsonSchemaExamples: ['video_123'] }) }),
      ),
    ),
    (c) => {},
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
              schema: resolver(Schema.toStandardSchemaV1(Schema.instanceOf(File))),
              example: '<binary MP4 video content>',
            },
            'image/webp': { schema: resolver(Schema.toStandardSchemaV1(Schema.instanceOf(File))) },
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(Schema.String)) },
          },
        },
        '400': {
          description:
            'The request or content variant is invalid, or the organization does not support video generation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The video was not found or is not ready, its download is unavailable or expired, or the Videos API is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '500': {
          description: 'The requested video media is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      deprecated: true,
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ video_id: Schema.String.annotate({ jsonSchemaExamples: ['video_123'] }) }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({ variant: Schema.optional(VideoContentVariantSchema) }),
      ),
    ),
    (c) => {},
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VideoResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request or source video is not supported for remixing, or the organization does not support video generation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The source video or a referenced character was not found or is not accessible, the source video is not ready, or the Videos API is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': InferenceRateLimitedResponse,
        '500': {
          description:
            'The source generation is unavailable or the remix task could not be created.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '503': InferenceServiceUnavailableResponse,
      },
      deprecated: true,
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ video_id: Schema.String.annotate({ jsonSchemaExamples: ['video_123'] }) }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(CreateVideoRemixBodySchema)),
    validator('form', Schema.toStandardSchemaV1(CreateVideoRemixBodySchema)),
    (c) => {},
  )
