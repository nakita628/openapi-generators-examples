import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'

export const v2Handler = new Hono()
  .post(
    '/v2/oauth/accessToken',
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          grant_type: Schema.String.annotate({
            description: '`client_credentials`',
            jsonSchemaExamples: ['client_credentials'],
          }),
          client_id: Schema.String.annotate({ description: 'Channel ID.' }),
          client_secret: Schema.String.annotate({ description: 'Channel secret.' }),
        }).annotate({ description: 'Request of the issueChannelToken' }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/oauth/verify',
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          access_token: Schema.String.annotate({
            description: 'A short-lived or long-lived channel access token.',
          }),
        }).annotate({ description: 'request of the verifyChannelToken' }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/oauth/revoke',
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          access_token: Schema.String.annotate({
            description: 'A short-lived or long-lived channel access token.',
          }),
        }).annotate({ description: 'Request of the revokeChannelToken.' }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
