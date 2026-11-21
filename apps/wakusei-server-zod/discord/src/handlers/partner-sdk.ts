import { os } from '@orpc/server'
import * as z from 'zod'
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
    z.object({
      user_id_1: SnowflakeTypeSchema,
      user_id_2: SnowflakeTypeSchema,
      message_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => {})

export const postPartnerSdkProvisionalAccountsUnmerge = os
  .route({
    method: 'POST',
    path: '/partner-sdk/provisional-accounts/unmerge',
    successStatus: 204,
    successDescription: '204 response for partner_sdk_unmerge_provisional_account',
  })
  .input(
    z.object({
      client_id: SnowflakeTypeSchema,
      client_secret: z.string().max(1024).nullable().exactOptional(),
      external_auth_token: z.string().min(1).max(10240),
      external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
    }),
  )
  .handler(async ({ input }) => {})

export const postPartnerSdkProvisionalAccountsUnmergeBot = os
  .route({
    method: 'POST',
    path: '/partner-sdk/provisional-accounts/unmerge/bot',
    successStatus: 204,
    successDescription: '204 response for bot_partner_sdk_unmerge_provisional_account',
  })
  .input(z.object({ external_user_id: z.string().min(1).max(1024) }))
  .handler(async ({ input }) => {})

export const postPartnerSdkToken = os
  .route({
    method: 'POST',
    path: '/partner-sdk/token',
    successDescription: '200 response for partner_sdk_token',
  })
  .input(
    z.object({
      client_id: SnowflakeTypeSchema,
      client_secret: z.string().max(1024).nullable().exactOptional(),
      external_auth_token: z.string().min(1).max(10240),
      external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
    }),
  )
  .output(ProvisionalTokenResponseSchema)
  .handler(async ({ input }) => {})

export const postPartnerSdkTokenBot = os
  .route({
    method: 'POST',
    path: '/partner-sdk/token/bot',
    successDescription: '200 response for bot_partner_sdk_token',
  })
  .input(
    z.object({
      provisional_user_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
      external_user_id: z.string().min(1).max(1024),
      preferred_global_name: z.string().min(1).max(32).nullable().exactOptional(),
    }),
  )
  .output(ProvisionalTokenResponseSchema)
  .handler(async ({ input }) => {})
