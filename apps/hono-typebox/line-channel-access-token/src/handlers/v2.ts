import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'

export const v2Handler = new Hono()
  .post(
    '/v2/oauth/accessToken',
    tbValidator(
      'form',
      Type.Object(
        {
          grant_type: Type.String({
            description: '`client_credentials`',
            examples: ['client_credentials'],
          }),
          client_id: Type.String({ description: 'Channel ID.' }),
          client_secret: Type.String({ description: 'Channel secret.' }),
        },
        { description: 'Request of the issueChannelToken' },
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/oauth/verify',
    tbValidator(
      'form',
      Type.Object(
        {
          access_token: Type.String({
            description: 'A short-lived or long-lived channel access token.',
          }),
        },
        { description: 'request of the verifyChannelToken' },
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/oauth/revoke',
    tbValidator(
      'form',
      Type.Object(
        {
          access_token: Type.String({
            description: 'A short-lived or long-lived channel access token.',
          }),
        },
        { description: 'Request of the revokeChannelToken.' },
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
