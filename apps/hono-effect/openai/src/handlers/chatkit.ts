import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { OrderEnumSchema, CreateChatSessionBodySchema } from '../components'

export const chatkitHandler = new Hono()
  .post(
    '/chatkit/sessions/:session_id/cancel',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.annotate({ jsonSchemaExamples: ['cksess_123'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/chatkit/sessions',
    sValidator('json', Schema.toStandardSchemaV1(CreateChatSessionBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/chatkit/threads/:thread_id/items',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String.annotate({ jsonSchemaExamples: ['cthr_123'] }) }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(
            Schema.String.annotate({
              description:
                'List items created after this thread item ID. Defaults to null for the first page.',
            }),
          ),
          before: Schema.optional(
            Schema.String.annotate({
              description:
                'List items created before this thread item ID. Defaults to null for the newest results.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/chatkit/threads/:thread_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String.annotate({ jsonSchemaExamples: ['cthr_123'] }) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/chatkit/threads/:thread_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String.annotate({ jsonSchemaExamples: ['cthr_123'] }) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/chatkit/threads',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(
            Schema.String.annotate({
              description:
                'List items created after this thread item ID. Defaults to null for the first page.',
            }),
          ),
          before: Schema.optional(
            Schema.String.annotate({
              description:
                'List items created before this thread item ID. Defaults to null for the newest results.',
            }),
          ),
          user: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 512, {
                expected: 'a string of at most 512 characters',
              }),
            ).annotate({
              description:
                'Filter threads that belong to this user identifier. Defaults to null to return all users.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
