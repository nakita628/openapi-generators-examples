import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  InputItemSchema,
  IncludeEnumSchema,
  CreateConversationBodySchema,
  UpdateConversationBodySchema,
} from '../components'

export const conversationsHandler = new Hono()
  .get(
    '/conversations/:conversation_id/items',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.optional(Schema.Literals(['asc', 'desc'])),
          after: Schema.optional(Schema.String),
          include: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(IncludeEnumSchema)),
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/conversations/:conversation_id/items',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          include: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(IncludeEnumSchema)),
            ),
          ),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          items: Schema.Array(InputItemSchema)
            .check(Schema.isMaxLength(20))
            .annotate({
              description:
                'The items to add to the conversation. You may add up to 20 items at a time.\n',
            }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/conversations/:conversation_id/items/:item_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
          item_id: Schema.String.annotate({ jsonSchemaExamples: ['msg_abc'] }),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          include: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(IncludeEnumSchema)),
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/conversations/:conversation_id/items/:item_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
          item_id: Schema.String.annotate({ jsonSchemaExamples: ['msg_abc'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/conversations',
    sValidator('json', Schema.toStandardSchemaV1(CreateConversationBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/conversations/:conversation_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/conversations/:conversation_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateConversationBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/conversations/:conversation_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
