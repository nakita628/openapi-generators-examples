import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { CreateEvalRequestSchema, CreateEvalRunRequestSchema, MetadataSchema } from '../components'

export const evalsHandler = new Hono()
  .get(
    '/evals',
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
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
        order_by: v.optional(v.picklist(['created_at', 'updated_at']), 'created_at'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/evals', sValidator('json', CreateEvalRequestSchema), (c) => { throw new Error('Not implemented') })
  .get('/evals/:eval_id', sValidator('param', v.object({ eval_id: v.string() })), (c) => { throw new Error('Not implemented') })
  .post(
    '/evals/:eval_id',
    sValidator('param', v.object({ eval_id: v.string() })),
    sValidator(
      'json',
      v.partial(
        v.object({
          name: v.pipe(v.string(), v.description('Rename the evaluation.')),
          metadata: MetadataSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/evals/:eval_id', sValidator('param', v.object({ eval_id: v.string() })), (c) => { throw new Error('Not implemented') })
  .get(
    '/evals/:eval_id/runs',
    sValidator('param', v.object({ eval_id: v.string() })),
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
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
        status: v.optional(
          v.picklist(['queued', 'in_progress', 'completed', 'canceled', 'failed']),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id/runs',
    sValidator('param', v.object({ eval_id: v.string() })),
    sValidator('json', CreateEvalRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id',
    sValidator('param', v.object({ eval_id: v.string(), run_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/evals/:eval_id/runs/:run_id',
    sValidator('param', v.object({ eval_id: v.string(), run_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id/runs/:run_id/cancel',
    sValidator('param', v.object({ eval_id: v.string(), run_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items',
    sValidator('param', v.object({ eval_id: v.string(), run_id: v.string() })),
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
        status: v.optional(v.picklist(['fail', 'pass'])),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items/:output_item_id',
    sValidator(
      'param',
      v.object({ eval_id: v.string(), run_id: v.string(), output_item_id: v.string() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
