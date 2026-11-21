import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { ApplicationIdentityProviderAuthTypeSchema, SnowflakeTypeSchema } from '../components'

export const partnerSdkHandler = new Hono()
  .put(
    '/partner-sdk/dms/:user_id_1/:user_id_2/messages/:message_id/moderation-metadata',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_id_1: SnowflakeTypeSchema,
          user_id_2: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 2000, {
              expected: 'a string of at most 2000 characters',
            }),
          ),
        ).annotate({ description: 'The moderation metadata attached to the message' }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 2000, {
              expected: 'a string of at most 2000 characters',
            }),
          ),
        ).annotate({ description: 'The moderation metadata attached to the message' }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge',
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          client_id: SnowflakeTypeSchema,
          client_secret: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 1024, {
                  expected: 'a string of at most 1024 characters',
                }),
              ),
            ),
          ),
          external_auth_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 10240, {
              expected: 'a string of at most 10240 characters',
            }),
          ),
          external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge/bot',
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          external_user_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 1024, {
              expected: 'a string of at most 1024 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/token',
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          client_id: SnowflakeTypeSchema,
          client_secret: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 1024, {
                  expected: 'a string of at most 1024 characters',
                }),
              ),
            ),
          ),
          external_auth_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 10240, {
              expected: 'a string of at most 10240 characters',
            }),
          ),
          external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/token/bot',
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          provisional_user_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          external_user_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 1024, {
              expected: 'a string of at most 1024 characters',
            }),
          ),
          preferred_global_name: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 32, {
                  expected: 'a string of at most 32 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
