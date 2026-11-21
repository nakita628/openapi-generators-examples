import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type({
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
    type({
      client_id: SnowflakeTypeSchema,
      'client_secret?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
        ),
      ).or('null'),
      external_auth_token: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters')),
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
  .input(
    type({
      external_user_id: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters')),
    }),
  )
  .handler(async ({ input }) => {})

export const postPartnerSdkToken = os
  .route({
    method: 'POST',
    path: '/partner-sdk/token',
    successDescription: '200 response for partner_sdk_token',
  })
  .input(
    type({
      client_id: SnowflakeTypeSchema,
      'client_secret?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
        ),
      ).or('null'),
      external_auth_token: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters')),
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
  )
  .output(ProvisionalTokenResponseSchema)
  .handler(async ({ input }) => {})
