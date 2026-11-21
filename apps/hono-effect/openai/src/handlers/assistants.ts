import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema } from 'effect'
import { CreateAssistantRequestSchema, ModifyAssistantRequestSchema } from '../components'

export const assistantsHandler = new Hono()
  .get(
    '/assistants',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/assistants',
    sValidator('json', Schema.toStandardSchemaV1(CreateAssistantRequestSchema)),
    (c) => {},
  )
  .get(
    '/assistants/:assistant_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ assistant_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/assistants/:assistant_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ assistant_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ModifyAssistantRequestSchema)),
    (c) => {},
  )
  .delete(
    '/assistants/:assistant_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ assistant_id: Schema.String }))),
    (c) => {},
  )
