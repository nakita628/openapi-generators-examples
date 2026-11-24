import { Elysia, t } from 'elysia'
import {
  ErrorResponseSchema,
  IssueShortLivedChannelAccessTokenResponseSchema,
  VerifyChannelAccessTokenResponseSchema,
} from '../../components/schemas'
import { V2Model } from './model'

export const v2 = new Elysia()
  .model({
    ErrorResponse: ErrorResponseSchema,
    IssueShortLivedChannelAccessTokenResponse: IssueShortLivedChannelAccessTokenResponseSchema,
    VerifyChannelAccessTokenResponse: VerifyChannelAccessTokenResponseSchema,
  })
  .post('/v2/oauth/accessToken', ({ body }) => { throw new Error('Not implemented') }, {
    body: V2Model.issueChannelTokenBody,
    response: { 200: 'IssueShortLivedChannelAccessTokenResponse', 400: 'ErrorResponse' },
    detail: {
      tags: ['channel-access-token'],
      description: 'Issue short-lived channel access token',
      operationId: 'issueChannelToken',
    },
  })
  .post('/v2/oauth/verify', ({ body }) => { throw new Error('Not implemented') }, {
    body: V2Model.verifyChannelTokenBody,
    response: { 200: 'VerifyChannelAccessTokenResponse' },
    detail: {
      tags: ['channel-access-token'],
      description: 'Verify the validity of short-lived and long-lived channel access tokens',
      operationId: 'verifyChannelToken',
    },
  })
  .post('/v2/oauth/revoke', ({ body }) => { throw new Error('Not implemented') }, {
    body: V2Model.revokeChannelTokenBody,
    response: { 200: t.Void() },
    detail: {
      tags: ['channel-access-token'],
      description: 'Revoke short-lived or long-lived channel access token',
      operationId: 'revokeChannelToken',
    },
  })
