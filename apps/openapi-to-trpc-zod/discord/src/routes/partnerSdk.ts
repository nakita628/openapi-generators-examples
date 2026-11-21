import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  ApplicationIdentityProviderAuthTypeSchema,
  ProvisionalTokenResponseSchema,
  SnowflakeTypeSchema,
} from '../components'

const t = initTRPC.create()

export const partnerSdkRouter = t.router({
  putPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadata: t.procedure
    .input(
      z.object({
        user_id_1: SnowflakeTypeSchema,
        user_id_2: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        body: z
          .record(z.string(), z.string().max(2000))
          .meta({ description: 'The moderation metadata attached to the message' }),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkProvisionalAccountsUnmerge: t.procedure
    .input(
      z.object({
        client_id: SnowflakeTypeSchema,
        client_secret: z.string().max(1024).nullable().exactOptional(),
        external_auth_token: z.string().min(1).max(10240),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkProvisionalAccountsUnmergeBot: t.procedure
    .input(z.object({ external_user_id: z.string().min(1).max(1024) }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkToken: t.procedure
    .input(
      z.object({
        client_id: SnowflakeTypeSchema,
        client_secret: z.string().max(1024).nullable().exactOptional(),
        external_auth_token: z.string().min(1).max(10240),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
    )
    .output(ProvisionalTokenResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPartnerSdkTokenBot: t.procedure
    .input(
      z.object({
        provisional_user_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        external_user_id: z.string().min(1).max(1024),
        preferred_global_name: z.string().min(1).max(32).nullable().exactOptional(),
      }),
    )
    .output(ProvisionalTokenResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
