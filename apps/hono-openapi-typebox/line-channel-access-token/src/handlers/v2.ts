import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  IssueShortLivedChannelAccessTokenResponseSchema,
  VerifyChannelAccessTokenResponseSchema,
  ErrorResponseSchema,
} from '../components'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

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
              schema: resolver(toStandardSchemaV1(IssueShortLivedChannelAccessTokenResponseSchema)),
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
              schema: resolver(toStandardSchemaV1(ErrorResponseSchema)),
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
      toStandardSchemaV1(
        Type.Object(
          {
            grant_type: Type.String({
              description: '`client_credentials`',
              examples: ['client_credentials'],
            }),
            client_id: Type.String({ description: 'Channel ID.' }),
            client_secret: Type.String({ description: 'Channel secret.' }),
          },
          { description: 'Request of the issueChannelToken' },
        ),
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
              schema: resolver(toStandardSchemaV1(VerifyChannelAccessTokenResponseSchema)),
              example: { client_id: '1350031035', expires_in: 3138007490, scope: 'P CM' },
            },
          },
        },
      },
    }),
    validator(
      'form',
      toStandardSchemaV1(
        Type.Object(
          {
            access_token: Type.String({
              description: 'A short-lived or long-lived channel access token.',
            }),
          },
          { description: 'request of the verifyChannelToken' },
        ),
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
      toStandardSchemaV1(
        Type.Object(
          {
            access_token: Type.String({
              description: 'A short-lived or long-lived channel access token.',
            }),
          },
          { description: 'Request of the revokeChannelToken.' },
        ),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
