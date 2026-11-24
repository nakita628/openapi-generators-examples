import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'
import { ApplicationIdentityProviderAuthTypeSchema, SnowflakeTypeSchema } from '../components'

export const partnerSdkHandler = new Hono()
  .put(
    '/partner-sdk/dms/:user_id_1/:user_id_2/messages/:message_id/moderation-metadata',
    tbValidator(
      'param',
      Type.Object({
        user_id_1: SnowflakeTypeSchema,
        user_id_2: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
      }),
    ),
    tbValidator(
      'json',
      Type.Record(Type.String(), Type.String({ maxLength: 2000 }), {
        maxProperties: 5,
        description: 'The moderation metadata attached to the message',
      }),
    ),
    tbValidator(
      'form',
      Type.Record(Type.String(), Type.String({ maxLength: 2000 }), {
        maxProperties: 5,
        description: 'The moderation metadata attached to the message',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge',
    tbValidator(
      'json',
      Type.Object({
        client_id: SnowflakeTypeSchema,
        client_secret: Type.Optional(Type.Union([Type.String({ maxLength: 1024 }), Type.Null()])),
        external_auth_token: Type.String({ minLength: 1, maxLength: 10240 }),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge/bot',
    tbValidator(
      'json',
      Type.Object({ external_user_id: Type.String({ minLength: 1, maxLength: 1024 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/token',
    tbValidator(
      'json',
      Type.Object({
        client_id: SnowflakeTypeSchema,
        client_secret: Type.Optional(Type.Union([Type.String({ maxLength: 1024 }), Type.Null()])),
        external_auth_token: Type.String({ minLength: 1, maxLength: 10240 }),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/token/bot',
    tbValidator(
      'json',
      Type.Object({
        provisional_user_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
        external_user_id: Type.String({ minLength: 1, maxLength: 1024 }),
        preferred_global_name: Type.Optional(
          Type.Union([Type.String({ minLength: 1, maxLength: 32 }), Type.Null()]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
