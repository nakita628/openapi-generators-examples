import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'
import {
  AddUploadPartRequestSchema,
  CompleteUploadRequestSchema,
  CreateUploadRequestSchema,
} from '../components'

export const uploadsHandler = new Hono()
  .post('/uploads', tbValidator('json', CreateUploadRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/uploads/:upload_id/cancel',
    tbValidator('param', Type.Object({ upload_id: Type.String({ examples: ['upload_abc123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/uploads/:upload_id/complete',
    tbValidator('param', Type.Object({ upload_id: Type.String({ examples: ['upload_abc123'] }) })),
    tbValidator('json', CompleteUploadRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/uploads/:upload_id/parts',
    tbValidator('param', Type.Object({ upload_id: Type.String({ examples: ['upload_abc123'] }) })),
    tbValidator('form', AddUploadPartRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
