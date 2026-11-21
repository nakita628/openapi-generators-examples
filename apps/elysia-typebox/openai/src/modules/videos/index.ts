import { Elysia } from 'elysia'
import {
  CreateVideoCharacterBodySchema,
  CreateVideoEditJsonBodySchema,
  CreateVideoExtendJsonBodySchema,
  CreateVideoJsonBodySchema,
  CreateVideoRemixBodySchema,
  DeletedVideoResourceSchema,
  ErrorSchema,
  Error2Schema,
  ErrorResponseSchema,
  ImageRefParam2Schema,
  MisalignmentErrorDetailsResourceSchema,
  OrderEnumSchema,
  VideoCharacterResourceSchema,
  VideoContentVariantSchema,
  VideoListResourceSchema,
  VideoModelSchema,
  VideoReferenceInputParamSchema,
  VideoResourceSchema,
  VideoSecondsSchema,
  VideoSizeSchema,
  VideoStatusSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { VideosModel } from './model'

export const videos = new Elysia()
  .model({
    CreateVideoCharacterBody: CreateVideoCharacterBodySchema,
    CreateVideoEditJsonBody: CreateVideoEditJsonBodySchema,
    CreateVideoExtendJsonBody: CreateVideoExtendJsonBodySchema,
    CreateVideoJsonBody: CreateVideoJsonBodySchema,
    CreateVideoRemixBody: CreateVideoRemixBodySchema,
    DeletedVideoResource: DeletedVideoResourceSchema,
    Error: ErrorSchema,
    Error2: Error2Schema,
    ErrorResponse: ErrorResponseSchema,
    ImageRefParam2: ImageRefParam2Schema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    OrderEnum: OrderEnumSchema,
    VideoCharacterResource: VideoCharacterResourceSchema,
    VideoContentVariant: VideoContentVariantSchema,
    VideoListResource: VideoListResourceSchema,
    VideoModel: VideoModelSchema,
    VideoReferenceInputParam: VideoReferenceInputParamSchema,
    VideoResource: VideoResourceSchema,
    VideoSeconds: VideoSecondsSchema,
    VideoSize: VideoSizeSchema,
    VideoStatus: VideoStatusSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .get('/videos', ({ query }) => { throw new Error('Not implemented') }, {
    query: VideosModel.ListVideosQuery,
    response: { 200: 'VideoListResource', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['Videos'],
      summary: 'List videos',
      description: 'List recently generated videos for the current project.',
      operationId: 'ListVideos',
    },
  })
  .post('/videos', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateVideoJsonBody',
    response: {
      200: 'VideoResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Videos'],
      summary: 'Create a video',
      description: 'Create a new video generation job from a prompt and optional reference assets.',
      operationId: 'createVideo',
    },
  })
  .post('/videos/characters', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateVideoCharacterBody',
    response: {
      200: 'VideoCharacterResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      500: 'ErrorResponse',
      504: 'ErrorResponse',
    },
    detail: {
      tags: ['Videos'],
      summary: 'Create a character',
      description: 'Create a character from an uploaded video.',
      operationId: 'CreateVideoCharacter',
    },
  })
  .get('/videos/characters/:character_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: VideosModel.GetVideoCharacterParams,
    response: { 200: 'VideoCharacterResource', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['Videos'],
      summary: 'Retrieve a character',
      description: 'Fetch a character.',
      operationId: 'GetVideoCharacter',
    },
  })
  .post('/videos/edits', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateVideoEditJsonBody',
    response: {
      200: 'VideoResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Videos'],
      summary: 'Create a video edit',
      description:
        'Create a new video generation job by editing a source video or existing generated video.',
      operationId: 'CreateVideoEdit',
    },
  })
  .post('/videos/extensions', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateVideoExtendJsonBody',
    response: {
      200: 'VideoResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Videos'],
      summary: 'Create a video extension',
      description: 'Create an extension of a completed video.',
      operationId: 'CreateVideoExtend',
    },
  })
  .get('/videos/:video_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: VideosModel.GetVideoParams,
    response: { 200: 'VideoResource', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: ['Videos'],
      summary: 'Retrieve a video',
      description: 'Fetch the latest metadata for a generated video.',
      operationId: 'GetVideo',
    },
  })
  .delete('/videos/:video_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: VideosModel.DeleteVideoParams,
    response: {
      200: 'DeletedVideoResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Videos'],
      summary: 'Delete a video',
      description: 'Permanently delete a completed or failed video and its stored assets.',
      operationId: 'DeleteVideo',
    },
  })
  .get('/videos/:video_id/content', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: VideosModel.RetrieveVideoContentParams,
    query: VideosModel.RetrieveVideoContentQuery,
    response: {
      200: VideosModel.RetrieveVideoContentResponse200,
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Videos'],
      summary: 'Download video content',
      description:
        'Download the generated video bytes or a derived preview asset.\n\nStreams the rendered video content for the specified video job.',
      operationId: 'RetrieveVideoContent',
    },
  })
  .post('/videos/:video_id/remix', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: VideosModel.CreateVideoRemixParams,
    body: 'CreateVideoRemixBody',
    response: {
      200: 'VideoResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: ['Videos'],
      summary: 'Create a video remix',
      description: 'Create a remix of a completed video using a refreshed prompt.',
      operationId: 'CreateVideoRemix',
    },
  })
