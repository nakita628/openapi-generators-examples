import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema } from 'effect'
import { CreateBatchRequestSchema } from '../components'

export const batchesHandler = new Hono()
  .get(
    '/batches',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optional(Schema.String),
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/batches',
    sValidator('json', Schema.toStandardSchemaV1(CreateBatchRequestSchema)),
    (c) => {},
  )
  .get(
    '/batches/:batch_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ batch_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/batches/:batch_id/cancel',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ batch_id: Schema.String }))),
    (c) => {},
  )
