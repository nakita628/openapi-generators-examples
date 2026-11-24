import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import {
  IssueStatelessChannelTokenByJWTAssertionRequestSchema,
  IssueStatelessChannelTokenByClientSecretRequestSchema,
} from '../components'

export const oauth2Handler = new Hono()
  .post(
    '/oauth2/v3/token',
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Union([
          IssueStatelessChannelTokenByJWTAssertionRequestSchema,
          IssueStatelessChannelTokenByClientSecretRequestSchema,
        ]),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/oauth2/v2.1/tokens/kid',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({ client_assertion_type: Schema.String, client_assertion: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/oauth2/v2.1/token',
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          grant_type: Schema.String.annotate({ description: 'client_credentials' }),
          client_assertion_type: Schema.String.annotate({
            description: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          }),
          client_assertion: Schema.String.annotate({
            description:
              'A JSON Web Token the client needs to create and sign with the private key of the Assertion Signing Key.',
          }),
        }).annotate({ description: 'request of the issueChannelTokenByJWT' }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/oauth2/v2.1/verify',
    sValidator('query', Schema.toStandardSchemaV1(Schema.Struct({ access_token: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/oauth2/v2.1/revoke',
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          client_id: Schema.String.annotate({ description: 'Channel ID' }),
          client_secret: Schema.String.annotate({ description: 'Channel Secret' }),
          access_token: Schema.String.annotate({ description: 'Channel access token' }),
        }).annotate({ description: 'Request of the revokeChannelTokenByJWT' }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
