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
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        order_by: z.enum(['created_at', 'updated_at']).default('created_at').exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post('/evals', sValidator('json', CreateEvalRequestSchema), (c) => {})
  .get('/evals/:eval_id', sValidator('param', z.object({ eval_id: z.string() })), (c) => {})
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
    (c) => {},
  )
  .delete('/evals/:eval_id', sValidator('param', z.object({ eval_id: z.string() })), (c) => {})
  .get(
    '/evals/:eval_id/runs',
    sValidator('param', z.object({ eval_id: z.string() })),
    sValidator(
      'query',
      z.object({
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        status: z
          .enum(['queued', 'in_progress', 'completed', 'canceled', 'failed'])
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/evals/:eval_id/runs',
    sValidator('param', z.object({ eval_id: z.string() })),
    sValidator('json', CreateEvalRunRequestSchema),
    (c) => {},
  )
  .get(
    '/evals/:eval_id/runs/:run_id',
    sValidator('param', z.object({ eval_id: z.string(), run_id: z.string() })),
    (c) => {},
  )
  .delete(
    '/evals/:eval_id/runs/:run_id',
    sValidator('param', z.object({ eval_id: z.string(), run_id: z.string() })),
    (c) => {},
  )
  .post(
    '/evals/:eval_id/runs/:run_id/cancel',
    sValidator('param', z.object({ eval_id: z.string(), run_id: z.string() })),
    (c) => {},
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items',
    sValidator('param', z.object({ eval_id: z.string(), run_id: z.string() })),
    sValidator(
      'query',
      z.object({
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        status: z.enum(['fail', 'pass']).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    ),
    (c) => {},
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items/:output_item_id',
    sValidator(
      'param',
      z.object({ eval_id: z.string(), run_id: z.string(), output_item_id: z.string() }),
    ),
    (c) => {},
  )
