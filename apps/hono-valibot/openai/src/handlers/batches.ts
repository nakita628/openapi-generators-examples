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
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/batches', sValidator('json', CreateBatchRequestSchema), (c) => { throw new Error('Not implemented') })
  .get('/batches/:batch_id', sValidator('param', v.object({ batch_id: v.string() })), (c) => { throw new Error('Not implemented') })
  .post(
    '/batches/:batch_id/cancel',
    sValidator('param', v.object({ batch_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
