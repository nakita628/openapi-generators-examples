import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'

export const v2Handler = new Hono()
  .post(
    '/v2/oauth/accessToken',
    sValidator(
      'form',
      type({
        grant_type: type('string').describe('`client_credentials`'),
        client_id: type('string').describe('Channel ID.'),
        client_secret: type('string').describe('Channel secret.'),
      }).describe('Request of the issueChannelToken'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/oauth/verify',
    sValidator(
      'form',
      type({
        access_token: type('string').describe('A short-lived or long-lived channel access token.'),
      }).describe('request of the verifyChannelToken'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/oauth/revoke',
    sValidator(
      'form',
      type({
        access_token: type('string').describe('A short-lived or long-lived channel access token.'),
      }).describe('Request of the revokeChannelToken.'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
