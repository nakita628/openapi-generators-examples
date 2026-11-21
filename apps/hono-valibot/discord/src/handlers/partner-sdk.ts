import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { ApplicationIdentityProviderAuthTypeSchema, SnowflakeTypeSchema } from '../components'

export const partnerSdkHandler = new Hono()
  .put(
    '/partner-sdk/dms/:user_id_1/:user_id_2/messages/:message_id/moderation-metadata',
    sValidator(
      'param',
      v.object({
        user_id_1: SnowflakeTypeSchema,
        user_id_2: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
      }),
    ),
    sValidator(
      'json',
      v.pipe(
        v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(2000))),
        v.description('The moderation metadata attached to the message'),
      ),
    ),
    sValidator(
      'form',
      v.pipe(
        v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(2000))),
        v.description('The moderation metadata attached to the message'),
      ),
    ),
    (c) => {},
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge',
    sValidator(
      'json',
      v.object({
        client_id: SnowflakeTypeSchema,
        client_secret: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1024)))),
        external_auth_token: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(10240)),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    ),
    (c) => {},
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge/bot',
    sValidator(
      'json',
      v.object({ external_user_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1024)) }),
    ),
    (c) => {},
  )
  .post(
    '/partner-sdk/token',
    sValidator(
      'json',
      v.object({
        client_id: SnowflakeTypeSchema,
        client_secret: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1024)))),
        external_auth_token: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(10240)),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    ),
    (c) => {},
  )
  .post(
    '/partner-sdk/token/bot',
    sValidator(
      'json',
      v.object({
        provisional_user_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        external_user_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1024)),
        preferred_global_name: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
        ),
      }),
    ),
    (c) => {},
  )
