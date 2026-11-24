import { os } from '@orpc/server'
import {
  IssueShortLivedChannelAccessTokenResponseSchema,
  VerifyChannelAccessTokenResponseSchema,
} from '../components'

export const postV2OauthAccessToken = os
  .route({
    method: 'POST',
    path: '/v2/oauth/accessToken',
    tags: ['channel-access-token'],
    description: 'Issue short-lived channel access token',
  })
  .output(IssueShortLivedChannelAccessTokenResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2OauthVerify = os
  .route({
    method: 'POST',
    path: '/v2/oauth/verify',
    tags: ['channel-access-token'],
    description: 'Verify the validity of short-lived and long-lived channel access tokens',
  })
  .output(VerifyChannelAccessTokenResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postV2OauthRevoke = os
  .route({
    method: 'POST',
    path: '/v2/oauth/revoke',
    tags: ['channel-access-token'],
    description: 'Revoke short-lived or long-lived channel access token',
  })
  .handler(async ({ input }) => { throw new Error('Not implemented') })
