import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { CreateEvalRequestSchema, CreateEvalRunRequestSchema, MetadataSchema } from '../components'

export const evalsHandler = new Hono()
  .get(
    '/evals',
    sValidator(
      'query',
      type({
        'after?': 'string',
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'order_by?': "'created_at' | 'updated_at'",
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/evals', sValidator('json', CreateEvalRequestSchema), (c) => { throw new Error('Not implemented') })
  .get('/evals/:eval_id', sValidator('param', type({ eval_id: 'string' })), (c) => { throw new Error('Not implemented') })
  .post(
    '/evals/:eval_id',
    sValidator('param', type({ eval_id: 'string' })),
    sValidator(
      'json',
      type({
        'name?': type('string').describe('Rename the evaluation.'),
        'metadata?': MetadataSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/evals/:eval_id', sValidator('param', type({ eval_id: 'string' })), (c) => { throw new Error('Not implemented') })
  .get(
    '/evals/:eval_id/runs',
    sValidator('param', type({ eval_id: 'string' })),
    sValidator(
      'query',
      type({
        'after?': 'string',
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'status?': "'queued' | 'in_progress' | 'completed' | 'canceled' | 'failed'",
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id/runs',
    sValidator('param', type({ eval_id: 'string' })),
    sValidator('json', CreateEvalRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id',
    sValidator('param', type({ eval_id: 'string', run_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/evals/:eval_id/runs/:run_id',
    sValidator('param', type({ eval_id: 'string', run_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id/runs/:run_id/cancel',
    sValidator('param', type({ eval_id: 'string', run_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items',
    sValidator('param', type({ eval_id: 'string', run_id: 'string' })),
    sValidator(
      'query',
      type({
        'after?': 'string',
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'status?': "'fail' | 'pass'",
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items/:output_item_id',
    sValidator('param', type({ eval_id: 'string', run_id: 'string', output_item_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
