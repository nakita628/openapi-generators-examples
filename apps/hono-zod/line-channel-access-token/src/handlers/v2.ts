import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const v2Handler = new Hono()
  .post(
    '/v2/oauth/accessToken',
    sValidator(
      'form',
      z
        .object({
          grant_type: z
            .string()
            .meta({ description: '`client_credentials`', examples: ['client_credentials'] }),
          client_id: z.string().meta({ description: 'Channel ID.' }),
          client_secret: z.string().meta({ description: 'Channel secret.' }),
        })
        .meta({ description: 'Request of the issueChannelToken' }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/oauth/verify',
    sValidator(
      'form',
      z
        .object({
          access_token: z
            .string()
            .meta({ description: 'A short-lived or long-lived channel access token.' }),
        })
        .meta({ description: 'request of the verifyChannelToken' }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/oauth/revoke',
    sValidator(
      'form',
      z
        .object({
          access_token: z
            .string()
            .meta({ description: 'A short-lived or long-lived channel access token.' }),
        })
        .meta({ description: 'Request of the revokeChannelToken.' }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
