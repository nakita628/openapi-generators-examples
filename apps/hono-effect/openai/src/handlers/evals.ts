import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema } from 'effect'
import { CreateEvalRequestSchema, CreateEvalRunRequestSchema, MetadataSchema } from '../components'

export const evalsHandler = new Hono()
  .get(
    '/evals',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optional(Schema.String),
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
          order_by: Schema.Literals(['created_at', 'updated_at']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('created_at')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post('/evals', sValidator('json', Schema.toStandardSchemaV1(CreateEvalRequestSchema)), (c) => {})
  .get(
    '/evals/:eval_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/evals/:eval_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.optional(Schema.String.annotate({ description: 'Rename the evaluation.' })),
          metadata: Schema.optional(MetadataSchema),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/evals/:eval_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/evals/:eval_id/runs',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optional(Schema.String),
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
          status: Schema.optional(
            Schema.Literals(['queued', 'in_progress', 'completed', 'canceled', 'failed']),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/evals/:eval_id/runs',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(CreateEvalRunRequestSchema)),
    (c) => {},
  )
  .get(
    '/evals/:eval_id/runs/:run_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => {},
  )
  .delete(
    '/evals/:eval_id/runs/:run_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => {},
  )
  .post(
    '/evals/:eval_id/runs/:run_id/cancel',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => {},
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optional(Schema.String),
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          status: Schema.optional(Schema.Literals(['fail', 'pass'])),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items/:output_item_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          eval_id: Schema.String,
          run_id: Schema.String,
          output_item_id: Schema.String,
        }),
      ),
    ),
    (c) => {},
  )
