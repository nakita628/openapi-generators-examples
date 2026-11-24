import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'
import {
  IssueStatelessChannelTokenByJWTAssertionRequestSchema,
  IssueStatelessChannelTokenByClientSecretRequestSchema,
} from '../components'

export const oauth2Handler = new Hono()
  .post(
    '/oauth2/v3/token',
    tbValidator(
      'form',
      Type.Union([
        IssueStatelessChannelTokenByJWTAssertionRequestSchema,
        IssueStatelessChannelTokenByClientSecretRequestSchema,
      ]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/oauth2/v2.1/tokens/kid',
    tbValidator(
      'query',
      Type.Object({ client_assertion_type: Type.String(), client_assertion: Type.String() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/oauth2/v2.1/token',
    tbValidator(
      'form',
      Type.Object(
        {
          grant_type: Type.String({ description: 'client_credentials' }),
          client_assertion_type: Type.String({
            description: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          }),
          client_assertion: Type.String({
            description:
              'A JSON Web Token the client needs to create and sign with the private key of the Assertion Signing Key.',
          }),
        },
        { description: 'request of the issueChannelTokenByJWT' },
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/oauth2/v2.1/verify',
    tbValidator('query', Type.Object({ access_token: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/oauth2/v2.1/revoke',
    tbValidator(
      'form',
      Type.Object(
        {
          client_id: Type.String({ description: 'Channel ID' }),
          client_secret: Type.String({ description: 'Channel Secret' }),
          access_token: Type.String({ description: 'Channel access token' }),
        },
        { description: 'Request of the revokeChannelTokenByJWT' },
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
