import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import { CreateEvalRequestSchema, CreateEvalRunRequestSchema, MetadataSchema } from '../components'

export const evalsHandler = new Hono()
  .get(
    '/evals',
    tbValidator(
      'query',
      Type.Object({
        after: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'asc' }),
        ),
        order_by: Type.Optional(
          Type.Union([Type.Literal('created_at'), Type.Literal('updated_at')], {
            default: 'created_at',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/evals', tbValidator('json', CreateEvalRequestSchema), (c) => { throw new Error('Not implemented') })
  .get('/evals/:eval_id', tbValidator('param', Type.Object({ eval_id: Type.String() })), (c) => { throw new Error('Not implemented') })
  .post(
    '/evals/:eval_id',
    tbValidator('param', Type.Object({ eval_id: Type.String() })),
    tbValidator(
      'json',
      Type.Object({
        name: Type.Optional(Type.String({ description: 'Rename the evaluation.' })),
        metadata: Type.Optional(MetadataSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/evals/:eval_id',
    tbValidator('param', Type.Object({ eval_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs',
    tbValidator('param', Type.Object({ eval_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        after: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'asc' }),
        ),
        status: Type.Optional(
          Type.Union([
            Type.Literal('queued'),
            Type.Literal('in_progress'),
            Type.Literal('completed'),
            Type.Literal('canceled'),
            Type.Literal('failed'),
          ]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id/runs',
    tbValidator('param', Type.Object({ eval_id: Type.String() })),
    tbValidator('json', CreateEvalRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id',
    tbValidator('param', Type.Object({ eval_id: Type.String(), run_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/evals/:eval_id/runs/:run_id',
    tbValidator('param', Type.Object({ eval_id: Type.String(), run_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id/runs/:run_id/cancel',
    tbValidator('param', Type.Object({ eval_id: Type.String(), run_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items',
    tbValidator('param', Type.Object({ eval_id: Type.String(), run_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        after: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        status: Type.Optional(Type.Union([Type.Literal('fail'), Type.Literal('pass')])),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'asc' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items/:output_item_id',
    tbValidator(
      'param',
      Type.Object({ eval_id: Type.String(), run_id: Type.String(), output_item_id: Type.String() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
