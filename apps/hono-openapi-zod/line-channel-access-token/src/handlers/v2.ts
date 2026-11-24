import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
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
              schema: resolver(IssueShortLivedChannelAccessTokenResponseSchema),
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
              schema: resolver(ErrorResponseSchema),
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
      z
        .object({
          grant_type: z
            .string()
            .meta({ description: '`client_credentials`', examples: ['client_credentials'] }),
          client_id: z.string().meta({ description: 'Channel ID.' }),
          client_secret: z.string().meta({ description: 'Channel secret.' }),
        })
        .meta({ description: 'Request of the issueChannelToken' }),
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
              schema: resolver(VerifyChannelAccessTokenResponseSchema),
              example: { client_id: '1350031035', expires_in: 3138007490, scope: 'P CM' },
            },
          },
        },
      },
    }),
    validator(
      'form',
      z
        .object({
          access_token: z
            .string()
            .meta({ description: 'A short-lived or long-lived channel access token.' }),
        })
        .meta({ description: 'request of the verifyChannelToken' }),
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
      z
        .object({
          access_token: z
            .string()
            .meta({ description: 'A short-lived or long-lived channel access token.' }),
        })
        .meta({ description: 'Request of the revokeChannelToken.' }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
