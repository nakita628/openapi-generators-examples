import { Elysia } from 'elysia'
import {
  AddUploadPartRequestSchema,
  CompleteUploadRequestSchema,
  CreateUploadRequestSchema,
  ErrorSchema,
  ErrorResponseSchema,
  FileExpirationAfterSchema,
  MisalignmentErrorDetailsResourceSchema,
  OpenAIFileSchema,
  UploadSchema,
  UploadPartSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { UploadsModel } from './model'

export const uploads = new Elysia()
  .model({
    AddUploadPartRequest: AddUploadPartRequestSchema,
    CompleteUploadRequest: CompleteUploadRequestSchema,
    CreateUploadRequest: CreateUploadRequestSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    FileExpirationAfter: FileExpirationAfterSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    OpenAIFile: OpenAIFileSchema,
    Upload: UploadSchema,
    UploadPart: UploadPartSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .post('/uploads', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateUploadRequest',
    response: { 200: 'Upload', 400: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Uploads'],
      summary: 'Create upload',
      description:
        'Creates an intermediate [Upload](https://developers.openai.com/api/reference/resources/uploads) object\nthat you can add [Parts](https://developers.openai.com/api/reference/resources/uploads/subresources/parts) to.\nCurrently, an Upload can accept at most 8 GB in total and expires after an\nhour after you create it.\n\nOnce you complete the Upload, we will create a\n[File](https://developers.openai.com/api/reference/resources/files) object that contains all the parts\nyou uploaded. This File is usable in the rest of our platform as a regular\nFile object.\n\nFor certain `purpose` values, the correct `mime_type` must be specified.\nPlease refer to documentation for the\n[supported MIME types for your use case](https://developers.openai.com/api/docs/guides/tools-file-search#supported-files).\n\nFor guidance on the proper filename extensions for each purpose, please\nfollow the documentation on [creating a\nFile](https://developers.openai.com/api/reference/resources/files/methods/create).\n\nReturns the Upload object with status `pending`.\n',
      operationId: 'createUpload',
    },
  })
  .post('/uploads/:upload_id/cancel', ({ params }) => { throw new Error('Not implemented') }, {
    params: UploadsModel.cancelUploadParams,
    response: {
      200: 'Upload',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      410: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Uploads'],
      summary: 'Cancel upload',
      description:
        'Cancels the Upload. No Parts may be added after an Upload is cancelled.\n\nReturns the Upload object with status `cancelled`.\n',
      operationId: 'cancelUpload',
    },
  })
  .post('/uploads/:upload_id/complete', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: UploadsModel.completeUploadParams,
    body: 'CompleteUploadRequest',
    response: {
      200: 'Upload',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      410: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Uploads'],
      summary: 'Complete upload',
      description:
        'Completes the [Upload](https://developers.openai.com/api/reference/resources/uploads).\n\nWithin the returned Upload object, there is a nested [File](https://developers.openai.com/api/reference/resources/files) object that is ready to use in the rest of the platform.\n\nYou can specify the order of the Parts by passing in an ordered list of the Part IDs.\n\nThe number of bytes uploaded upon completion must match the number of bytes initially specified when creating the Upload object. No Parts may be added after an Upload is completed.\nReturns the Upload object with status `completed`, including an additional `file` property containing the created usable File object.\n',
      operationId: 'completeUpload',
    },
  })
  .post('/uploads/:upload_id/parts', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: UploadsModel.addUploadPartParams,
    body: 'AddUploadPartRequest',
    response: {
      200: 'UploadPart',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      410: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Uploads'],
      summary: 'Add upload part',
      description:
        'Adds a [Part](https://developers.openai.com/api/reference/resources/uploads/subresources/parts) to an [Upload](https://developers.openai.com/api/reference/resources/uploads) object. A Part represents a chunk of bytes from the file you are trying to upload.\n\nEach Part can be at most 64 MB, and you can add Parts until you hit the Upload maximum of 8 GB.\n\nIt is possible to add multiple Parts in parallel. You can decide the intended order of the Parts when you [complete the Upload](https://developers.openai.com/api/reference/resources/uploads/methods/complete).\n',
      operationId: 'addUploadPart',
    },
  })
