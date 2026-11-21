import { os } from '@orpc/server'
import {
  OAuth2GetAuthorizationResponseSchema,
  OAuth2GetKeysSchema,
  OAuth2GetOpenIDConnectUserInfoResponseSchema,
  PrivateApplicationResponseSchema,
} from '../components'

export const getOauth2Me = os
  .route({
    method: 'GET',
    path: '/oauth2/@me',
    successDescription: '200 response for get_my_oauth2_authorization',
  })
  .output(OAuth2GetAuthorizationResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOauth2ApplicationsMe = os
  .route({
    method: 'GET',
    path: '/oauth2/applications/@me',
    successDescription: '200 response for get_my_oauth2_application',
  })
  .output(PrivateApplicationResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOauth2Keys = os
  .route({
    method: 'GET',
    path: '/oauth2/keys',
    successDescription: '200 response for get_public_keys',
  })
  .output(OAuth2GetKeysSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOauth2Userinfo = os
  .route({
    method: 'GET',
    path: '/oauth2/userinfo',
    successDescription: '200 response for get_openid_connect_userinfo',
  })
  .output(OAuth2GetOpenIDConnectUserInfoResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
