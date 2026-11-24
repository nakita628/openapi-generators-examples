import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import {
  IssueStatelessChannelTokenByJWTAssertionRequestSchema,
  IssueStatelessChannelTokenByClientSecretRequestSchema,
} from '../components'

export const oauth2Handler = new Hono()
  .post(
    '/oauth2/v3/token',
    sValidator(
      'form',
      v.union([
        IssueStatelessChannelTokenByJWTAssertionRequestSchema,
        IssueStatelessChannelTokenByClientSecretRequestSchema,
      ]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/oauth2/v2.1/tokens/kid',
    sValidator(
      'query',
      v.object({ client_assertion_type: v.string(), client_assertion: v.string() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/oauth2/v2.1/token',
    sValidator(
      'form',
      v.pipe(
        v.object({
          grant_type: v.pipe(v.string(), v.description('client_credentials')),
          client_assertion_type: v.pipe(
            v.string(),
            v.description('urn:ietf:params:oauth:client-assertion-type:jwt-bearer'),
          ),
          client_assertion: v.pipe(
            v.string(),
            v.description(
              'A JSON Web Token the client needs to create and sign with the private key of the Assertion Signing Key.',
            ),
          ),
        }),
        v.description('request of the issueChannelTokenByJWT'),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/oauth2/v2.1/verify',
    sValidator('query', v.object({ access_token: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/oauth2/v2.1/revoke',
    sValidator(
      'form',
      v.pipe(
        v.object({
          client_id: v.pipe(v.string(), v.description('Channel ID')),
          client_secret: v.pipe(v.string(), v.description('Channel Secret')),
          access_token: v.pipe(v.string(), v.description('Channel access token')),
        }),
        v.description('Request of the revokeChannelTokenByJWT'),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
