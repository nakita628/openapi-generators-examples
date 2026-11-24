import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema, SchemaTransformation } from 'effect'
import { UserSchema } from '../components'

export const userHandler = new Hono()
  .post(
    '/user',
    sValidator('json', Schema.toStandardSchemaV1(UserSchema)),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ jsonSchemaExamples: [10] }),
          ),
          username: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['theUser'] })),
          firstName: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['John'] })),
          lastName: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['James'] })),
          email: Schema.optionalKey(
            Schema.String.annotate({ jsonSchemaExamples: ['john@email.com'] }),
          ),
          password: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          phone: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          userStatus: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt32())
              .annotate({ description: 'User Status', jsonSchemaExamples: [1] }),
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
          username: Schema.optionalKey(Schema.String),
          password: Schema.optionalKey(Schema.String),
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
          id: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ jsonSchemaExamples: [10] }),
          ),
          username: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['theUser'] })),
          firstName: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['John'] })),
          lastName: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['James'] })),
          email: Schema.optionalKey(
            Schema.String.annotate({ jsonSchemaExamples: ['john@email.com'] }),
          ),
          password: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          phone: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
          userStatus: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt32())
              .annotate({ description: 'User Status', jsonSchemaExamples: [1] }),
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
