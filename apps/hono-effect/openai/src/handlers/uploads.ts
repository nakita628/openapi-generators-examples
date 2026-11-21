import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import {
  AddUploadPartRequestSchema,
  CompleteUploadRequestSchema,
  CreateUploadRequestSchema,
} from '../components'

export const uploadsHandler = new Hono()
  .post(
    '/uploads',
    sValidator('json', Schema.toStandardSchemaV1(CreateUploadRequestSchema)),
    (c) => {},
  )
  .post(
    '/uploads/:upload_id/cancel',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          upload_id: Schema.String.annotate({ jsonSchemaExamples: ['upload_abc123'] }),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/uploads/:upload_id/complete',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          upload_id: Schema.String.annotate({ jsonSchemaExamples: ['upload_abc123'] }),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CompleteUploadRequestSchema)),
    (c) => {},
  )
  .post(
    '/uploads/:upload_id/parts',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          upload_id: Schema.String.annotate({ jsonSchemaExamples: ['upload_abc123'] }),
        }),
      ),
    ),
    sValidator('form', Schema.toStandardSchemaV1(AddUploadPartRequestSchema)),
    (c) => {},
  )
