import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { ApplicationIdentityProviderAuthTypeSchema, SnowflakeTypeSchema } from '../components'

export const partnerSdkHandler = new Hono()
  .put(
    '/partner-sdk/dms/:user_id_1/:user_id_2/messages/:message_id/moderation-metadata',
    sValidator(
      'param',
      type({
        user_id_1: SnowflakeTypeSchema,
        user_id_2: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
      }),
    ),
    sValidator(
      'json',
      type({
        '[string]': type('string').narrow(
          (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
        ),
      }).describe('The moderation metadata attached to the message'),
    ),
    sValidator(
      'form',
      type({
        '[string]': type('string').narrow(
          (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
        ),
      }).describe('The moderation metadata attached to the message'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge',
    sValidator(
      'json',
      type({
        client_id: SnowflakeTypeSchema,
        'client_secret?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
          ),
        ).or('null'),
        external_auth_token: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow(
            (data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters'),
          ),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge/bot',
    sValidator(
      'json',
      type({
        external_user_id: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters')),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/token',
    sValidator(
      'json',
      type({
        client_id: SnowflakeTypeSchema,
        'client_secret?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
          ),
        ).or('null'),
        external_auth_token: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow(
            (data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters'),
          ),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/token/bot',
    sValidator(
      'json',
      type({
        'provisional_user_id?': type('null | null').or(SnowflakeTypeSchema),
        external_user_id: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters')),
        'preferred_global_name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        ).or('null'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
