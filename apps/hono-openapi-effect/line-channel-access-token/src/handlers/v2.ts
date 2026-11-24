import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema } from 'effect'
import {
  IssueShortLivedChannelAccessTokenResponseSchema,
  VerifyChannelAccessTokenResponseSchema,
  ErrorResponseSchema,
} from '../components'

export const v2Handler = new Hono()
  .post(
    '/v2/oauth/accessToken',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#issue-shortlived-channel-access-token',
      },
      tags: ['channel-access-token'],
      operationId: 'issueChannelToken',
      description: 'Issue short-lived channel access token',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(IssueShortLivedChannelAccessTokenResponseSchema),
              ),
              example: {
                access_token: 'W1TeHCgfH2Liwa.....',
                expires_in: 2592000,
                token_type: 'Bearer',
              },
            },
          },
        },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
              example: {
                error: 'invalid_request',
                error_description: 'some parameters missed or invalid',
              },
            },
          },
        },
      },
    }),
    validator(
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
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#verify-channel-access-token',
      },
      tags: ['channel-access-token'],
      operationId: 'verifyChannelToken',
      description: 'Verify the validity of short-lived and long-lived channel access tokens',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(VerifyChannelAccessTokenResponseSchema)),
              example: { client_id: '1350031035', expires_in: 3138007490, scope: 'P CM' },
            },
          },
        },
      },
    }),
    validator(
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
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#revoke-longlived-or-shortlived-channel-access-token',
      },
      tags: ['channel-access-token'],
      operationId: 'revokeChannelToken',
      description: 'Revoke short-lived or long-lived channel access token',
      responses: { '200': { description: 'OK' } },
    }),
    validator(
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
