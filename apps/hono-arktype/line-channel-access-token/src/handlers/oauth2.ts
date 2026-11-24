import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  IssueStatelessChannelTokenByJWTAssertionRequestSchema,
  IssueStatelessChannelTokenByClientSecretRequestSchema,
} from '../components'

export const oauth2Handler = new Hono()
  .post(
    '/oauth2/v3/token',
    sValidator(
      'form',
      type(IssueStatelessChannelTokenByJWTAssertionRequestSchema).or(
        IssueStatelessChannelTokenByClientSecretRequestSchema,
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/oauth2/v2.1/tokens/kid',
    sValidator('query', type({ client_assertion_type: 'string', client_assertion: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/oauth2/v2.1/token',
    sValidator(
      'form',
      type({
        grant_type: type('string').describe('client_credentials'),
        client_assertion_type: type('string').describe(
          'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        ),
        client_assertion: type('string').describe(
          'A JSON Web Token the client needs to create and sign with the private key of the Assertion Signing Key.',
        ),
      }).describe('request of the issueChannelTokenByJWT'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/oauth2/v2.1/verify', sValidator('query', type({ access_token: 'string' })), (c) => { throw new Error('Not implemented') })
  .post(
    '/oauth2/v2.1/revoke',
    sValidator(
      'form',
      type({
        client_id: type('string').describe('Channel ID'),
        client_secret: type('string').describe('Channel Secret'),
        access_token: type('string').describe('Channel access token'),
      }).describe('Request of the revokeChannelTokenByJWT'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
