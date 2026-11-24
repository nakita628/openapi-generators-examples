import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { ApplicationIdentityProviderAuthTypeSchema, SnowflakeTypeSchema } from '../components'

export const partnerSdkHandler = new Hono()
  .put(
    '/partner-sdk/dms/:user_id_1/:user_id_2/messages/:message_id/moderation-metadata',
    sValidator(
      'param',
      z.object({
        user_id_1: SnowflakeTypeSchema,
        user_id_2: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
      }),
    ),
    sValidator(
      'json',
      z
        .record(z.string(), z.string().max(2000))
        .meta({ description: 'The moderation metadata attached to the message' }),
    ),
    sValidator(
      'form',
      z
        .record(z.string(), z.string().max(2000))
        .meta({ description: 'The moderation metadata attached to the message' }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge',
    sValidator(
      'json',
      z.object({
        client_id: SnowflakeTypeSchema,
        client_secret: z.string().max(1024).nullable().exactOptional(),
        external_auth_token: z.string().min(1).max(10240),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge/bot',
    sValidator('json', z.object({ external_user_id: z.string().min(1).max(1024) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/token',
    sValidator(
      'json',
      z.object({
        client_id: SnowflakeTypeSchema,
        client_secret: z.string().max(1024).nullable().exactOptional(),
        external_auth_token: z.string().min(1).max(10240),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/token/bot',
    sValidator(
      'json',
      z.object({
        provisional_user_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
        external_user_id: z.string().min(1).max(1024),
        preferred_global_name: z.string().min(1).max(32).nullable().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
