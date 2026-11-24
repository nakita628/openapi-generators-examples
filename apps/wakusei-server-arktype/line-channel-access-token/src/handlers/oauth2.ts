import { os } from '@orpc/server'
import { type } from 'arktype'
import {
  ChannelAccessTokenKeyIdsResponseSchema,
  IssueChannelAccessTokenResponseSchema,
  IssueStatelessChannelAccessTokenResponseSchema,
  VerifyChannelAccessTokenResponseSchema,
} from '../components'

export const postOauth2V3Token = os
  .route({
    method: 'POST',
    path: '/oauth2/v3/token',
    tags: ['channel-access-token'],
    description:
      "Issues a new stateless channel access token, which doesn't have max active token limit\nunlike the other token types.\nThe newly issued token is only valid for 15 minutes but can not be revoked until it naturally expires.\n",
  })
  .output(IssueStatelessChannelAccessTokenResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOauth2V21TokensKid = os
  .route({
    method: 'GET',
    path: '/oauth2/v2.1/tokens/kid',
    tags: ['channel-access-token'],
    description: 'Gets all valid channel access token key IDs.',
  })
  .input(type({ client_assertion_type: type('string'), client_assertion: type('string') }))
  .output(ChannelAccessTokenKeyIdsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postOauth2V21Token = os
  .route({
    method: 'POST',
    path: '/oauth2/v2.1/token',
    tags: ['channel-access-token'],
    description:
      'Issues a channel access token that allows you to specify a desired expiration date. This method lets you use JWT assertion for authentication.',
  })
  .output(IssueChannelAccessTokenResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOauth2V21Verify = os
  .route({
    method: 'GET',
    path: '/oauth2/v2.1/verify',
    tags: ['channel-access-token'],
    description:
      'You can verify whether a Channel access token with a user-specified expiration (Channel Access Token v2.1) is valid.',
  })
  .input(type({ access_token: type('string') }))
  .output(VerifyChannelAccessTokenResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postOauth2V21Revoke = os
  .route({
    method: 'POST',
    path: '/oauth2/v2.1/revoke',
    tags: ['channel-access-token'],
    description: 'Revoke channel access token v2.1',
  })
  .handler(async ({ input }) => { throw new Error('Not implemented') })
