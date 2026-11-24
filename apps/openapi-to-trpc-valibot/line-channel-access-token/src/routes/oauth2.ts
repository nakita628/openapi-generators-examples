import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import {
  ChannelAccessTokenKeyIdsResponseSchema,
  IssueChannelAccessTokenResponseSchema,
  IssueStatelessChannelAccessTokenResponseSchema,
  VerifyChannelAccessTokenResponseSchema,
} from '../components'

const t = initTRPC.create()

export const oauth2Router = t.router({
  postOauth2V3Token: t.procedure
    .output(IssueStatelessChannelAccessTokenResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOauth2V21TokensKid: t.procedure
    .input(v.object({ client_assertion_type: v.string(), client_assertion: v.string() }))
    .output(ChannelAccessTokenKeyIdsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOauth2V21Token: t.procedure.output(IssueChannelAccessTokenResponseSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getOauth2V21Verify: t.procedure
    .input(v.object({ access_token: v.string() }))
    .output(VerifyChannelAccessTokenResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOauth2V21Revoke: t.procedure.mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
