import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import {
  ApplicationIdentityProviderAuthTypeSchema,
  ProvisionalTokenResponseSchema,
  SnowflakeTypeSchema,
} from '../components'

const t = initTRPC.create()

export const partnerSdkRouter = t.router({
  putPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadata: t.procedure
    .input(
      v.object({
        user_id_1: SnowflakeTypeSchema,
        user_id_2: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        body: v.pipe(
          v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(2000))),
          v.description('The moderation metadata attached to the message'),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkProvisionalAccountsUnmerge: t.procedure
    .input(
      v.object({
        client_id: SnowflakeTypeSchema,
        client_secret: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1024)))),
        external_auth_token: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(10240)),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkProvisionalAccountsUnmergeBot: t.procedure
    .input(
      v.object({ external_user_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1024)) }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkToken: t.procedure
    .input(
      v.object({
        client_id: SnowflakeTypeSchema,
        client_secret: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1024)))),
        external_auth_token: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(10240)),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    )
    .output(ProvisionalTokenResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkTokenBot: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
