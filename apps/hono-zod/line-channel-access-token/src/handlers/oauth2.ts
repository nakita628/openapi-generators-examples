import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
  IssueStatelessChannelTokenByJWTAssertionRequestSchema,
  IssueStatelessChannelTokenByClientSecretRequestSchema,
} from '../components'

export const oauth2Handler = new Hono()
  .post(
    '/oauth2/v3/token',
    sValidator(
      'form',
      z.union([
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
      z.object({ client_assertion_type: z.string(), client_assertion: z.string() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/oauth2/v2.1/token',
    sValidator(
      'form',
      z
        .object({
          grant_type: z.string().meta({ description: 'client_credentials' }),
          client_assertion_type: z
            .string()
            .meta({ description: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer' }),
          client_assertion: z
            .string()
            .meta({
              description:
                'A JSON Web Token the client needs to create and sign with the private key of the Assertion Signing Key.',
            }),
        })
        .meta({ description: 'request of the issueChannelTokenByJWT' }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/oauth2/v2.1/verify',
    sValidator('query', z.object({ access_token: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/oauth2/v2.1/revoke',
    sValidator(
      'form',
      z
        .object({
          client_id: z.string().meta({ description: 'Channel ID' }),
          client_secret: z.string().meta({ description: 'Channel Secret' }),
          access_token: z.string().meta({ description: 'Channel access token' }),
        })
        .meta({ description: 'Request of the revokeChannelTokenByJWT' }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
