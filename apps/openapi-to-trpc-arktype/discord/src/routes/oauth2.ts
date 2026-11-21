import { initTRPC, TRPCError } from '@trpc/server'
import {
  OAuth2GetAuthorizationResponseSchema,
  OAuth2GetKeysSchema,
  OAuth2GetOpenIDConnectUserInfoResponseSchema,
  PrivateApplicationResponseSchema,
} from '../components'

const t = initTRPC.create()

export const oauth2Router = t.router({
  getOauth2Me: t.procedure.output(OAuth2GetAuthorizationResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getOauth2ApplicationsMe: t.procedure.output(PrivateApplicationResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getOauth2Keys: t.procedure.output(OAuth2GetKeysSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getOauth2Userinfo: t.procedure.output(OAuth2GetOpenIDConnectUserInfoResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
