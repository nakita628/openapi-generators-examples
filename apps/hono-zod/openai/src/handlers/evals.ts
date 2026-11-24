import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { CreateEvalRequestSchema, CreateEvalRunRequestSchema, MetadataSchema } from '../components'

export const evalsHandler = new Hono()
  .get(
    '/evals',
    sValidator(
      'query',
      z.object({
        after: z.string().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(20)
          .exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        order_by: z.enum(['created_at', 'updated_at']).default('created_at').exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/evals', sValidator('json', CreateEvalRequestSchema), (c) => { throw new Error('Not implemented') })
  .get('/evals/:eval_id', sValidator('param', z.object({ eval_id: z.string() })), (c) => { throw new Error('Not implemented') })
  .post(
    '/evals/:eval_id',
    sValidator('param', z.object({ eval_id: z.string() })),
    sValidator(
      'json',
      z.object({
        name: z.string().meta({ description: 'Rename the evaluation.' }).exactOptional(),
        metadata: MetadataSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/evals/:eval_id', sValidator('param', z.object({ eval_id: z.string() })), (c) => { throw new Error('Not implemented') })
  .get(
    '/evals/:eval_id/runs',
    sValidator('param', z.object({ eval_id: z.string() })),
    sValidator(
      'query',
      z.object({
        after: z.string().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(20)
          .exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        status: z
          .enum(['queued', 'in_progress', 'completed', 'canceled', 'failed'])
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id/runs',
    sValidator('param', z.object({ eval_id: z.string() })),
    sValidator('json', CreateEvalRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id',
    sValidator('param', z.object({ eval_id: z.string(), run_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/evals/:eval_id/runs/:run_id',
    sValidator('param', z.object({ eval_id: z.string(), run_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id/runs/:run_id/cancel',
    sValidator('param', z.object({ eval_id: z.string(), run_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items',
    sValidator('param', z.object({ eval_id: z.string(), run_id: z.string() })),
    sValidator(
      'query',
      z.object({
        after: z.string().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(20)
          .exactOptional(),
        status: z.enum(['fail', 'pass']).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items/:output_item_id',
    sValidator(
      'param',
      z.object({ eval_id: z.string(), run_id: z.string(), output_item_id: z.string() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
