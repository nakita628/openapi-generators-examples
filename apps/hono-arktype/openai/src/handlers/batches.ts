import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { CreateBatchRequestSchema } from '../components'

export const batchesHandler = new Hono()
  .get(
    '/batches',
    sValidator(
      'query',
      type({
        'after?': 'string',
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
      }),
    ),
    (c) => {},
  )
  .post('/batches', sValidator('json', CreateBatchRequestSchema), (c) => {})
  .get('/batches/:batch_id', sValidator('param', type({ batch_id: 'string' })), (c) => {})
  .post('/batches/:batch_id/cancel', sValidator('param', type({ batch_id: 'string' })), (c) => {})
