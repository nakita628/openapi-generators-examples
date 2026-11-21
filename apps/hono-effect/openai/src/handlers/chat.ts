import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
import { CreateChatCompletionRequestSchema, MetadataSchema } from '../components'

export const chatHandler = new Hono()
  .get(
    '/chat/completions',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          model: Schema.optional(Schema.String),
          metadata: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.Union([
                    Schema.Record(Schema.String, Schema.String).annotate({
                      description:
                        'Set of 16 key-value pairs that can be attached to an object. This can be\nuseful for storing additional information about the object in a structured\nformat, and querying for objects via API or the dashboard.\n\nKeys are strings with a maximum length of 64 characters. Values are strings\nwith a maximum length of 512 characters.\n',
                    }),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.NullOr(Schema.Null)),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          after: Schema.optional(Schema.String),
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/chat/completions',
    sValidator('json', Schema.toStandardSchemaV1(CreateChatCompletionRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/chat/completions/:completion_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ completion_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/chat/completions/:completion_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ completion_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(Schema.Struct({ metadata: MetadataSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/chat/completions/:completion_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ completion_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/chat/completions/:completion_id/messages',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ completion_id: Schema.String }))),
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
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
