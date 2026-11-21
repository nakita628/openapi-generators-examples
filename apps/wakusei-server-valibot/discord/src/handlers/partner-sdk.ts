import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  ApplicationIdentityProviderAuthTypeSchema,
  ProvisionalTokenResponseSchema,
  SnowflakeTypeSchema,
} from '../components'

export const putPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadata = os
  .route({
    method: 'PUT',
    path: '/partner-sdk/dms/{user_id_1}/{user_id_2}/messages/{message_id}/moderation-metadata',
    description: 'Update the external moderation metadata for a user message (DM).',
    successStatus: 204,
    successDescription: '204 response for update_user_message_external_moderation_metadata',
  })
  .input(
    v.object({
      user_id_1: SnowflakeTypeSchema,
      user_id_2: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postPartnerSdkProvisionalAccountsUnmerge = os
  .route({
    method: 'POST',
    path: '/partner-sdk/provisional-accounts/unmerge',
    successStatus: 204,
    successDescription: '204 response for partner_sdk_unmerge_provisional_account',
  })
  .input(
    v.object({
      client_id: SnowflakeTypeSchema,
      client_secret: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1024)))),
      external_auth_token: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(10240)),
      external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postPartnerSdkProvisionalAccountsUnmergeBot = os
  .route({
    method: 'POST',
    path: '/partner-sdk/provisional-accounts/unmerge/bot',
    successStatus: 204,
    successDescription: '204 response for bot_partner_sdk_unmerge_provisional_account',
  })
  .input(
    v.object({ external_user_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1024)) }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postPartnerSdkToken = os
  .route({
    method: 'POST',
    path: '/partner-sdk/token',
    successDescription: '200 response for partner_sdk_token',
  })
  .input(
    v.object({
      client_id: SnowflakeTypeSchema,
      client_secret: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1024)))),
      external_auth_token: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(10240)),
      external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
    }),
  )
  .output(ProvisionalTokenResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postPartnerSdkTokenBot = os
  .route({
    method: 'POST',
    path: '/partner-sdk/token/bot',
    successDescription: '200 response for bot_partner_sdk_token',
  })
  .input(
    v.object({
      provisional_user_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
      external_user_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1024)),
      preferred_global_name: v.optional(
        v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
      ),
    }),
  )
  .output(ProvisionalTokenResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
