import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
  AddUploadPartRequestSchema,
  CompleteUploadRequestSchema,
  CreateUploadRequestSchema,
} from '../components'

export const uploadsHandler = new Hono()
  .post('/uploads', sValidator('json', CreateUploadRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/uploads/:upload_id/cancel',
    sValidator('param', z.object({ upload_id: z.string().meta({ examples: ['upload_abc123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/uploads/:upload_id/complete',
    sValidator('param', z.object({ upload_id: z.string().meta({ examples: ['upload_abc123'] }) })),
    sValidator('json', CompleteUploadRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/uploads/:upload_id/parts',
    sValidator('param', z.object({ upload_id: z.string().meta({ examples: ['upload_abc123'] }) })),
    sValidator('form', AddUploadPartRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
