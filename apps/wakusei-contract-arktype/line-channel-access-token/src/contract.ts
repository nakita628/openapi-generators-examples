import { oc } from '@orpc/contract'
import { type } from 'arktype'
import {
  ChannelAccessTokenKeyIdsResponseSchema,
  IssueChannelAccessTokenResponseSchema,
  IssueShortLivedChannelAccessTokenResponseSchema,
  IssueStatelessChannelAccessTokenResponseSchema,
  VerifyChannelAccessTokenResponseSchema,
} from './components'

export const contract = {
  postOauth2V3Token: oc
    .route({
      method: 'POST',
      path: '/oauth2/v3/token',
      tags: ['channel-access-token'],
      description:
        "Issues a new stateless channel access token, which doesn't have max active token limit\nunlike the other token types.\nThe newly issued token is only valid for 15 minutes but can not be revoked until it naturally expires.\n",
    })
    .output(IssueStatelessChannelAccessTokenResponseSchema),
  getOauth2V21TokensKid: oc
    .route({
      method: 'GET',
      path: '/oauth2/v2.1/tokens/kid',
      tags: ['channel-access-token'],
      description: 'Gets all valid channel access token key IDs.',
    })
    .input(type({ client_assertion_type: type('string'), client_assertion: type('string') }))
    .output(ChannelAccessTokenKeyIdsResponseSchema),
  postOauth2V21Token: oc
    .route({
      method: 'POST',
      path: '/oauth2/v2.1/token',
      tags: ['channel-access-token'],
      description:
        'Issues a channel access token that allows you to specify a desired expiration date. This method lets you use JWT assertion for authentication.',
    })
    .output(IssueChannelAccessTokenResponseSchema),
  getOauth2V21Verify: oc
    .route({
      method: 'GET',
      path: '/oauth2/v2.1/verify',
      tags: ['channel-access-token'],
      description:
        'You can verify whether a Channel access token with a user-specified expiration (Channel Access Token v2.1) is valid.',
    })
    .input(type({ access_token: type('string') }))
    .output(VerifyChannelAccessTokenResponseSchema),
  postOauth2V21Revoke: oc.route({
    method: 'POST',
    path: '/oauth2/v2.1/revoke',
    tags: ['channel-access-token'],
    description: 'Revoke channel access token v2.1',
  }),
  postV2OauthAccessToken: oc
    .route({
      method: 'POST',
      path: '/v2/oauth/accessToken',
      tags: ['channel-access-token'],
      description: 'Issue short-lived channel access token',
    })
    .output(IssueShortLivedChannelAccessTokenResponseSchema),
  postV2OauthVerify: oc
    .route({
      method: 'POST',
      path: '/v2/oauth/verify',
      tags: ['channel-access-token'],
      description: 'Verify the validity of short-lived and long-lived channel access tokens',
    })
    .output(VerifyChannelAccessTokenResponseSchema),
  postV2OauthRevoke: oc.route({
    method: 'POST',
    path: '/v2/oauth/revoke',
    tags: ['channel-access-token'],
    description: 'Revoke short-lived or long-lived channel access token',
  }),
}
