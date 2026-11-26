import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
import { DetachModuleRequestSchema, AcquireChatControlRequestSchema } from '../components'

export const v2Handler = new Hono()
  .post(
    '/v2/bot/channel/detach',
    sValidator('json', Schema.toStandardSchemaV1(DetachModuleRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/:chatId/control/acquire',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ chatId: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(AcquireChatControlRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/:chatId/control/release',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ chatId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/list',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start: Schema.optionalKey(Schema.String),
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
            .check(Schema.isInt32(), Schema.isLessThanOrEqualTo(100))
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(100))),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
