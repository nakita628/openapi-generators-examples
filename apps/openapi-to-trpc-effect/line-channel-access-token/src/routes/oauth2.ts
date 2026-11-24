import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  ChannelAccessTokenKeyIdsResponseSchema,
  IssueChannelAccessTokenResponseSchema,
  IssueStatelessChannelAccessTokenResponseSchema,
  VerifyChannelAccessTokenResponseSchema,
} from '../components'

const t = initTRPC.create()

export const oauth2Router = t.router({
  postOauth2V3Token: t.procedure
    .output(Schema.toStandardSchemaV1(IssueStatelessChannelAccessTokenResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOauth2V21TokensKid: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ client_assertion_type: Schema.String, client_assertion: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ChannelAccessTokenKeyIdsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOauth2V21Token: t.procedure
    .output(Schema.toStandardSchemaV1(IssueChannelAccessTokenResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOauth2V21Verify: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ access_token: Schema.String })))
    .output(Schema.toStandardSchemaV1(VerifyChannelAccessTokenResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOauth2V21Revoke: t.procedure.mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
