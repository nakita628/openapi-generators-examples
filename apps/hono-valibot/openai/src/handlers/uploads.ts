import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import {
  AddUploadPartRequestSchema,
  CompleteUploadRequestSchema,
  CreateUploadRequestSchema,
} from '../components'

export const uploadsHandler = new Hono()
  .post('/uploads', sValidator('json', CreateUploadRequestSchema), (c) => {})
  .post(
    '/uploads/:upload_id/cancel',
    sValidator(
      'param',
      v.object({ upload_id: v.pipe(v.string(), v.metadata({ examples: ['upload_abc123'] })) }),
    ),
    (c) => {},
  )
  .post(
    '/uploads/:upload_id/complete',
    sValidator(
      'param',
      v.object({ upload_id: v.pipe(v.string(), v.metadata({ examples: ['upload_abc123'] })) }),
    ),
    sValidator('json', CompleteUploadRequestSchema),
    (c) => {},
  )
  .post(
    '/uploads/:upload_id/parts',
    sValidator(
      'param',
      v.object({ upload_id: v.pipe(v.string(), v.metadata({ examples: ['upload_abc123'] })) }),
    ),
    sValidator('form', AddUploadPartRequestSchema),
    (c) => {},
  )
