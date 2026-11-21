import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  AddUploadPartRequestSchema,
  CompleteUploadRequestSchema,
  CreateUploadRequestSchema,
} from '../components'

export const uploadsHandler = new Hono()
  .post('/uploads', sValidator('json', CreateUploadRequestSchema), (c) => {})
  .post('/uploads/:upload_id/cancel', sValidator('param', type({ upload_id: 'string' })), (c) => {})
  .post(
    '/uploads/:upload_id/complete',
    sValidator('param', type({ upload_id: 'string' })),
    sValidator('json', CompleteUploadRequestSchema),
    (c) => {},
  )
  .post(
    '/uploads/:upload_id/parts',
    sValidator('param', type({ upload_id: 'string' })),
    sValidator('form', AddUploadPartRequestSchema),
    (c) => {},
  )
