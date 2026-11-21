import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { CreateBatchRequestSchema } from '../components'

export const batchesHandler = new Hono()
  .get(
    '/batches',
    sValidator(
      'query',
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
      }),
    ),
    (c) => {},
  )
  .post('/batches', sValidator('json', CreateBatchRequestSchema), (c) => {})
  .get('/batches/:batch_id', sValidator('param', v.object({ batch_id: v.string() })), (c) => {})
  .post(
    '/batches/:batch_id/cancel',
    sValidator('param', v.object({ batch_id: v.string() })),
    (c) => {},
  )
