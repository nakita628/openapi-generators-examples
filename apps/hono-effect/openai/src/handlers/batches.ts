import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
import { CreateBatchRequestSchema } from '../components'

export const batchesHandler = new Hono()
  .get(
    '/batches',
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
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/batches',
    sValidator('json', Schema.toStandardSchemaV1(CreateBatchRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/batches/:batch_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ batch_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/batches/:batch_id/cancel',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ batch_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
