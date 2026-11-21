import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  AddUploadPartRequestSchema,
  CompleteUploadRequestSchema,
  CreateUploadRequestSchema,
  ErrorResponseSchema,
  UploadSchema,
  UploadPartSchema,
} from '../components'

export const uploadsHandler = new Hono()
  .post(
    '/uploads',
    describeRoute({
      operationId: 'createUpload',
      tags: ['Uploads'],
      summary: 'Create upload',
      description:
        'Creates an intermediate [Upload](https://developers.openai.com/api/reference/resources/uploads) object\nthat you can add [Parts](https://developers.openai.com/api/reference/resources/uploads/subresources/parts) to.\nCurrently, an Upload can accept at most 8 GB in total and expires after an\nhour after you create it.\n\nOnce you complete the Upload, we will create a\n[File](https://developers.openai.com/api/reference/resources/files) object that contains all the parts\nyou uploaded. This File is usable in the rest of our platform as a regular\nFile object.\n\nFor certain `purpose` values, the correct `mime_type` must be specified.\nPlease refer to documentation for the\n[supported MIME types for your use case](https://developers.openai.com/api/docs/guides/tools-file-search#supported-files).\n\nFor guidance on the proper filename extensions for each purpose, please\nfollow the documentation on [creating a\nFile](https://developers.openai.com/api/reference/resources/files/methods/create).\n\nReturns the Upload object with status `pending`.\n',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(UploadSchema) } },
        },
        '400': {
          description:
            'The upload request is invalid or exceeds a file size or storage quota limit.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'Too many upload requests. Reduce the request rate and try again later.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('json', CreateUploadRequestSchema),
    (c) => {},
  )
  .post(
    '/uploads/:upload_id/cancel',
    describeRoute({
      operationId: 'cancelUpload',
      tags: ['Uploads'],
      summary: 'Cancel upload',
      description:
        'Cancels the Upload. No Parts may be added after an Upload is cancelled.\n\nReturns the Upload object with status `cancelled`.\n',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(UploadSchema) } },
        },
        '400': {
          description:
            'The upload is no longer pending or is already being completed and cannot be cancelled.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The upload was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '410': {
          description:
            'The upload has expired. Create a new upload before adding parts or completing it.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'Too many upload requests. Reduce the request rate and try again later.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', z.object({ upload_id: z.string().meta({ examples: ['upload_abc123'] }) })),
    (c) => {},
  )
  .post(
    '/uploads/:upload_id/complete',
    describeRoute({
      operationId: 'completeUpload',
      tags: ['Uploads'],
      summary: 'Complete upload',
      description:
        'Completes the [Upload](https://developers.openai.com/api/reference/resources/uploads).\n\nWithin the returned Upload object, there is a nested [File](https://developers.openai.com/api/reference/resources/files) object that is ready to use in the rest of the platform.\n\nYou can specify the order of the Parts by passing in an ordered list of the Part IDs.\n\nThe number of bytes uploaded upon completion must match the number of bytes initially specified when creating the Upload object. No Parts may be added after an Upload is completed.\nReturns the Upload object with status `completed`, including an additional `file` property containing the created usable File object.\n',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(UploadSchema) } },
        },
        '400': {
          description:
            'The upload cannot be completed in its current state, the parts are invalid, or the uploaded size does not match the specified size.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The upload was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '410': {
          description:
            'The upload has expired. Create a new upload before adding parts or completing it.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'Too many upload requests. Reduce the request rate and try again later.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '500': {
          description:
            'The upload could not be completed. Retry the same request, preserving the part order and MD5 value.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', z.object({ upload_id: z.string().meta({ examples: ['upload_abc123'] }) })),
    validator('json', CompleteUploadRequestSchema),
    (c) => {},
  )
  .post(
    '/uploads/:upload_id/parts',
    describeRoute({
      operationId: 'addUploadPart',
      tags: ['Uploads'],
      summary: 'Add upload part',
      description:
        'Adds a [Part](https://developers.openai.com/api/reference/resources/uploads/subresources/parts) to an [Upload](https://developers.openai.com/api/reference/resources/uploads) object. A Part represents a chunk of bytes from the file you are trying to upload.\n\nEach Part can be at most 64 MB, and you can add Parts until you hit the Upload maximum of 8 GB.\n\nIt is possible to add multiple Parts in parallel. You can decide the intended order of the Parts when you [complete the Upload](https://developers.openai.com/api/reference/resources/uploads/methods/complete).\n',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(UploadPartSchema) } },
        },
        '400': {
          description:
            'The upload cannot accept more parts, or the part exceeds an upload size limit.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The upload was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '410': {
          description:
            'The upload has expired. Create a new upload before adding parts or completing it.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'Too many upload requests. Reduce the request rate and try again later.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '500': {
          description: 'The part could not be uploaded. Try the request again.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', z.object({ upload_id: z.string().meta({ examples: ['upload_abc123'] }) })),
    validator('form', AddUploadPartRequestSchema),
    (c) => {},
  )
