import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
import {
  IssueStatelessChannelTokenByJWTAssertionRequestSchema,
  IssueStatelessChannelTokenByClientSecretRequestSchema,
  IssueStatelessChannelAccessTokenResponseSchema,
  ChannelAccessTokenKeyIdsResponseSchema,
  IssueChannelAccessTokenResponseSchema,
  VerifyChannelAccessTokenResponseSchema,
} from '../components'

export const oauth2Handler = new Hono()
  .post(
    '/oauth2/v3/token',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
      },
      tags: ['channel-access-token'],
      operationId: 'issueStatelessChannelToken',
      description:
        "Issues a new stateless channel access token, which doesn't have max active token limit\nunlike the other token types.\nThe newly issued token is only valid for 15 minutes but can not be revoked until it naturally expires.\n",
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(IssueStatelessChannelAccessTokenResponseSchema),
              example: {
                token_type: 'Bearer',
                access_token: 'eyJhbGciOiJIUz.....',
                expires_in: 899,
              },
            },
          },
        },
      },
    }),
    validator(
      'form',
      type(IssueStatelessChannelTokenByJWTAssertionRequestSchema).or(
        IssueStatelessChannelTokenByClientSecretRequestSchema,
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/oauth2/v2.1/tokens/kid',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-all-valid-channel-access-token-key-ids-v2-1',
      },
      tags: ['channel-access-token'],
      operationId: 'getsAllValidChannelAccessTokenKeyIds',
      description: 'Gets all valid channel access token key IDs.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(ChannelAccessTokenKeyIdsResponseSchema),
              example: {
                kids: [
                  'U_gdnFYKTWRxxxxDVZexGg',
                  'sDTOzw5wIfWxxxxzcmeQA',
                  '73hDyp3PxGfxxxxD6U5qYA',
                  'FHGanaP79smDxxxxyPrVw',
                  'CguB-0kxxxxdSM3A5Q_UtQ',
                  'G82YP96jhHwyKSxxxx7IFA',
                ],
              },
            },
          },
        },
      },
    }),
    validator('query', type({ client_assertion_type: 'string', client_assertion: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/oauth2/v2.1/token',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#issue-channel-access-token-v2-1',
      },
      tags: ['channel-access-token'],
      operationId: 'issueChannelTokenByJWT',
      description:
        'Issues a channel access token that allows you to specify a desired expiration date. This method lets you use JWT assertion for authentication.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(IssueChannelAccessTokenResponseSchema),
              example: {
                access_token: 'eyJhbGciOiJIUz.....',
                token_type: 'Bearer',
                expires_in: 2592000,
                key_id: 'sDTOzw5wIfxxxxPEzcmeQA',
              },
            },
          },
        },
      },
    }),
    validator(
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
  .get(
    '/oauth2/v2.1/verify',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#verify-channel-access-token-v2-1',
      },
      tags: ['channel-access-token'],
      operationId: 'verifyChannelTokenByJWT',
      description:
        'You can verify whether a Channel access token with a user-specified expiration (Channel Access Token v2.1) is valid.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(VerifyChannelAccessTokenResponseSchema),
              example: {
                client_id: '1573163733',
                expires_in: 2591659,
                scope: 'profile chat_message.write',
              },
            },
          },
        },
      },
    }),
    validator('query', type({ access_token: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/oauth2/v2.1/revoke',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#revoke-channel-access-token-v2-1',
      },
      tags: ['channel-access-token'],
      operationId: 'revokeChannelTokenByJWT',
      description: 'Revoke channel access token v2.1',
      responses: { '200': { description: 'OK' } },
    }),
    validator(
      'form',
      type({
        client_id: type('string').describe('Channel ID'),
        client_secret: type('string').describe('Channel Secret'),
        access_token: type('string').describe('Channel access token'),
      }).describe('Request of the revokeChannelTokenByJWT'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
