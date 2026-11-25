import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  ApplicationIdentityProviderAuthTypeSchema,
  ProvisionalTokenResponseSchema,
  SnowflakeTypeSchema,
} from '../components'

const t = initTRPC.create()

export const partnerSdkRouter = t.router({
  putPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadata: t.procedure
    .input(
      type({
        user_id_1: SnowflakeTypeSchema,
        user_id_2: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        body: type({
          '[string]': type('string').narrow(
            (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
          ),
        }).describe('The moderation metadata attached to the message'),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkProvisionalAccountsUnmerge: t.procedure
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
          .narrow(
            (data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters'),
          ),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkProvisionalAccountsUnmergeBot: t.procedure
    .input(
      type({
        external_user_id: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters')),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkToken: t.procedure
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
          .narrow(
            (data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters'),
          ),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    )
    .output(ProvisionalTokenResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkTokenBot: t.procedure
    .input(
      type({
        'provisional_user_id?': type('null').or(SnowflakeTypeSchema),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
