import { Elysia, t } from 'elysia'
import {
  ChannelAccessTokenKeyIdsResponseSchema,
  IssueChannelAccessTokenResponseSchema,
  IssueStatelessChannelAccessTokenResponseSchema,
  IssueStatelessChannelTokenByClientSecretRequestSchema,
  IssueStatelessChannelTokenByJWTAssertionRequestSchema,
  VerifyChannelAccessTokenResponseSchema,
} from '../../components/schemas'
import { Oauth2Model } from './model'

export const oauth2 = new Elysia()
  .model({
    ChannelAccessTokenKeyIdsResponse: ChannelAccessTokenKeyIdsResponseSchema,
    IssueChannelAccessTokenResponse: IssueChannelAccessTokenResponseSchema,
    IssueStatelessChannelAccessTokenResponse: IssueStatelessChannelAccessTokenResponseSchema,
    IssueStatelessChannelTokenByClientSecretRequest:
      IssueStatelessChannelTokenByClientSecretRequestSchema,
    IssueStatelessChannelTokenByJWTAssertionRequest:
      IssueStatelessChannelTokenByJWTAssertionRequestSchema,
    VerifyChannelAccessTokenResponse: VerifyChannelAccessTokenResponseSchema,
  })
  .post('/oauth2/v3/token', ({ body }) => { throw new Error('Not implemented') }, {
    body: Oauth2Model.issueStatelessChannelTokenBody,
    response: { 200: 'IssueStatelessChannelAccessTokenResponse' },
    detail: {
      tags: ['channel-access-token'],
      description:
        "Issues a new stateless channel access token, which doesn't have max active token limit\nunlike the other token types.\nThe newly issued token is only valid for 15 minutes but can not be revoked until it naturally expires.\n",
      operationId: 'issueStatelessChannelToken',
    },
  })
  .get('/oauth2/v2.1/tokens/kid', ({ query }) => { throw new Error('Not implemented') }, {
    query: Oauth2Model.getsAllValidChannelAccessTokenKeyIdsQuery,
    response: { 200: 'ChannelAccessTokenKeyIdsResponse' },
    detail: {
      tags: ['channel-access-token'],
      description: 'Gets all valid channel access token key IDs.',
      operationId: 'getsAllValidChannelAccessTokenKeyIds',
    },
  })
  .post('/oauth2/v2.1/token', ({ body }) => { throw new Error('Not implemented') }, {
    body: Oauth2Model.issueChannelTokenByJWTBody,
    response: { 200: 'IssueChannelAccessTokenResponse' },
    detail: {
      tags: ['channel-access-token'],
      description:
        'Issues a channel access token that allows you to specify a desired expiration date. This method lets you use JWT assertion for authentication.',
      operationId: 'issueChannelTokenByJWT',
    },
  })
  .get('/oauth2/v2.1/verify', ({ query }) => { throw new Error('Not implemented') }, {
    query: Oauth2Model.verifyChannelTokenByJWTQuery,
    response: { 200: 'VerifyChannelAccessTokenResponse' },
    detail: {
      tags: ['channel-access-token'],
      description:
        'You can verify whether a Channel access token with a user-specified expiration (Channel Access Token v2.1) is valid.',
      operationId: 'verifyChannelTokenByJWT',
    },
  })
  .post('/oauth2/v2.1/revoke', ({ body }) => { throw new Error('Not implemented') }, {
    body: Oauth2Model.revokeChannelTokenByJWTBody,
    response: { 200: t.Void() },
    detail: {
      tags: ['channel-access-token'],
      description: 'Revoke channel access token v2.1',
      operationId: 'revokeChannelTokenByJWT',
    },
  })
