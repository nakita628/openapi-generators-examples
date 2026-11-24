import { t, type UnwrapSchema } from 'elysia'
import {
  IssueStatelessChannelTokenByClientSecretRequestSchema,
  IssueStatelessChannelTokenByJWTAssertionRequestSchema,
} from '../../components/schemas'

export const Oauth2Model = {
  issueStatelessChannelTokenBody: t.Union([
    IssueStatelessChannelTokenByJWTAssertionRequestSchema,
    IssueStatelessChannelTokenByClientSecretRequestSchema,
  ]),
  getsAllValidChannelAccessTokenKeyIdsQuery: t.Object({
    client_assertion_type: t.String(),
    client_assertion: t.String(),
  }),
  issueChannelTokenByJWTBody: t.Object(
    {
      grant_type: t.String({ description: 'client_credentials' }),
      client_assertion_type: t.String({
        description: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      }),
      client_assertion: t.String({
        description:
          'A JSON Web Token the client needs to create and sign with the private key of the Assertion Signing Key.',
      }),
    },
    { description: 'request of the issueChannelTokenByJWT' },
  ),
  verifyChannelTokenByJWTQuery: t.Object({ access_token: t.String() }),
  revokeChannelTokenByJWTBody: t.Object(
    {
      client_id: t.String({ description: 'Channel ID' }),
      client_secret: t.String({ description: 'Channel Secret' }),
      access_token: t.String({ description: 'Channel access token' }),
    },
    { description: 'Request of the revokeChannelTokenByJWT' },
  ),
} as const

export type Oauth2Model = { [k in keyof typeof Oauth2Model]: UnwrapSchema<(typeof Oauth2Model)[k]> }
