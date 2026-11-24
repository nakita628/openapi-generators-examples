import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
import { CreateAssistantRequestSchema, ModifyAssistantRequestSchema } from '../components'

export const assistantsHandler = new Hono()
  .get(
    '/assistants',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
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
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/assistants',
    sValidator('json', Schema.toStandardSchemaV1(CreateAssistantRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/assistants/:assistant_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ assistant_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/assistants/:assistant_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ assistant_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ModifyAssistantRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/assistants/:assistant_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ assistant_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
