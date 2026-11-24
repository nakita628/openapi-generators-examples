import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'

export const v2Handler = new Hono()
  .post(
    '/v2/oauth/accessToken',
    sValidator(
      'form',
      v.pipe(
        v.object({
          grant_type: v.pipe(
            v.string(),
            v.description('`client_credentials`'),
            v.metadata({ examples: ['client_credentials'] }),
          ),
          client_id: v.pipe(v.string(), v.description('Channel ID.')),
          client_secret: v.pipe(v.string(), v.description('Channel secret.')),
        }),
        v.description('Request of the issueChannelToken'),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/oauth/verify',
    sValidator(
      'form',
      v.pipe(
        v.object({
          access_token: v.pipe(
            v.string(),
            v.description('A short-lived or long-lived channel access token.'),
          ),
        }),
        v.description('request of the verifyChannelToken'),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/oauth/revoke',
    sValidator(
      'form',
      v.pipe(
        v.object({
          access_token: v.pipe(
            v.string(),
            v.description('A short-lived or long-lived channel access token.'),
          ),
        }),
        v.description('Request of the revokeChannelToken.'),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
