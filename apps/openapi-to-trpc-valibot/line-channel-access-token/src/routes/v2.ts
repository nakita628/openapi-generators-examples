import { initTRPC, TRPCError } from '@trpc/server'
import {
  IssueShortLivedChannelAccessTokenResponseSchema,
  VerifyChannelAccessTokenResponseSchema,
} from '../components'

const t = initTRPC.create()

export const v2Router = t.router({
  postV2OauthAccessToken: t.procedure
    .output(IssueShortLivedChannelAccessTokenResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postV2OauthVerify: t.procedure.output(VerifyChannelAccessTokenResponseSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postV2OauthRevoke: t.procedure.mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
