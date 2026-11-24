import { Hono } from 'hono'
import {
  postV2OauthAccessTokenHandler,
  postV2OauthVerifyHandler,
  postV2OauthRevokeHandler,
} from '../routes'

export const v2Handler = new Hono()
  .post(
    '/v2/oauth/accessToken',
    postV2OauthAccessTokenHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/oauth/verify',
    postV2OauthVerifyHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/oauth/revoke',
    postV2OauthRevokeHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
