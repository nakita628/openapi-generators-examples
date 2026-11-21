import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import {
  OAuth2GetAuthorizationResponseSchema,
  OAuth2GetKeysSchema,
  OAuth2GetOpenIDConnectUserInfoResponseSchema,
  PrivateApplicationResponseSchema,
} from '../components'

const t = initTRPC.create()

export const oauth2Router = t.router({
  getOauth2Me: t.procedure
    .output(Schema.toStandardSchemaV1(OAuth2GetAuthorizationResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOauth2ApplicationsMe: t.procedure
    .output(Schema.toStandardSchemaV1(PrivateApplicationResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOauth2Keys: t.procedure.output(Schema.toStandardSchemaV1(OAuth2GetKeysSchema)).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getOauth2Userinfo: t.procedure
    .output(Schema.toStandardSchemaV1(OAuth2GetOpenIDConnectUserInfoResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
