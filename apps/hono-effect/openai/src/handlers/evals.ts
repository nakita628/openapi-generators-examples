import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
import { CreateEvalRequestSchema, CreateEvalRunRequestSchema, MetadataSchema } from '../components'

export const evalsHandler = new Hono()
  .get(
    '/evals',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optionalKey(Schema.String),
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
          order_by: Schema.Literals(['created_at', 'updated_at']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('created_at')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/evals', sValidator('json', Schema.toStandardSchemaV1(CreateEvalRequestSchema)), (c) => { throw new Error('Not implemented') })
  .get(
    '/evals/:eval_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.optionalKey(
            Schema.String.annotate({ description: 'Rename the evaluation.' }),
          ),
          metadata: Schema.optionalKey(MetadataSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/evals/:eval_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optionalKey(Schema.String),
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['queued', 'in_progress', 'completed', 'canceled', 'failed']),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id/runs',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(CreateEvalRunRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/evals/:eval_id/runs/:run_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id/runs/:run_id/cancel',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
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
          after: Schema.optionalKey(Schema.String),
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          status: Schema.optionalKey(Schema.Literals(['fail', 'pass'])),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
