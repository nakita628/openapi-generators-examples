import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { CreateBatchRequestSchema } from '../components'

export const batchesHandler = new Hono()
  .get(
    '/batches',
    sValidator(
      'query',
      z.object({
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/batches', sValidator('json', CreateBatchRequestSchema), (c) => { throw new Error('Not implemented') })
  .get('/batches/:batch_id', sValidator('param', z.object({ batch_id: z.string() })), (c) => { throw new Error('Not implemented') })
  .post(
    '/batches/:batch_id/cancel',
    sValidator('param', z.object({ batch_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
