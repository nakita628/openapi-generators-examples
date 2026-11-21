import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { UserSchema } from '../components'

export const userHandler = new Hono()
  .post(
    '/user',
    sValidator('json', Schema.toStandardSchemaV1(UserSchema)),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.optional(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ jsonSchemaExamples: [10] }),
          ),
          username: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['theUser'] })),
          firstName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['John'] })),
          lastName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['James'] })),
          email: Schema.optional(
            Schema.String.annotate({ jsonSchemaExamples: ['john@email.com'] }),
          ),
          password: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          phone: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          userStatus: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt32()).annotate({
              description: 'User Status',
              jsonSchemaExamples: [1],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/user/createWithList',
    sValidator('json', Schema.toStandardSchemaV1(Schema.Array(UserSchema))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/user/login',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          username: Schema.optional(Schema.String),
          password: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/user/logout', (c) => { throw new Error('Not implemented') })
  .get(
    '/user/:username',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ username: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/user/:username',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ username: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(UserSchema)),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.optional(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ jsonSchemaExamples: [10] }),
          ),
          username: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['theUser'] })),
          firstName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['John'] })),
          lastName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['James'] })),
          email: Schema.optional(
            Schema.String.annotate({ jsonSchemaExamples: ['john@email.com'] }),
          ),
          password: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          phone: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          userStatus: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt32()).annotate({
              description: 'User Status',
              jsonSchemaExamples: [1],
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/user/:username',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ username: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
