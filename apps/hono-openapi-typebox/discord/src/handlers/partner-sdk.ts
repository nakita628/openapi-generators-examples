import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  ApplicationIdentityProviderAuthTypeSchema,
  ProvisionalTokenResponseSchema,
  SnowflakeTypeSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
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

export const partnerSdkHandler = new Hono()
  .put(
    '/partner-sdk/dms/:user_id_1/:user_id_2/messages/:message_id/moderation-metadata',
    describeRoute({
      description: 'Update the external moderation metadata for a user message (DM).',
      operationId: 'update_user_message_external_moderation_metadata',
      responses: {
        '204': {
          description: '204 response for update_user_message_external_moderation_metadata',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          user_id_1: SnowflakeTypeSchema,
          user_id_2: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Record(Type.String(), Type.String({ maxLength: 2000 }), {
          maxProperties: 5,
          description: 'The moderation metadata attached to the message',
        }),
      ),
    ),
    validator(
      'form',
      toStandardSchemaV1(
        Type.Record(Type.String(), Type.String({ maxLength: 2000 }), {
          maxProperties: 5,
          description: 'The moderation metadata attached to the message',
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge',
    describeRoute({
      operationId: 'partner_sdk_unmerge_provisional_account',
      responses: {
        '204': {
          description: '204 response for partner_sdk_unmerge_provisional_account',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Object({
          client_id: SnowflakeTypeSchema,
          client_secret: Type.Optional(Type.Union([Type.String({ maxLength: 1024 }), Type.Null()])),
          external_auth_token: Type.String({ minLength: 1, maxLength: 10240 }),
          external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/provisional-accounts/unmerge/bot',
    describeRoute({
      operationId: 'bot_partner_sdk_unmerge_provisional_account',
      responses: {
        '204': {
          description: '204 response for bot_partner_sdk_unmerge_provisional_account',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Object({ external_user_id: Type.String({ minLength: 1, maxLength: 1024 }) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/token',
    describeRoute({
      operationId: 'partner_sdk_token',
      responses: {
        '200': {
          description: '200 response for partner_sdk_token',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ProvisionalTokenResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Object({
          client_id: SnowflakeTypeSchema,
          client_secret: Type.Optional(Type.Union([Type.String({ maxLength: 1024 }), Type.Null()])),
          external_auth_token: Type.String({ minLength: 1, maxLength: 10240 }),
          external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/partner-sdk/token/bot',
    describeRoute({
      operationId: 'bot_partner_sdk_token',
      responses: {
        '200': {
          description: '200 response for bot_partner_sdk_token',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ProvisionalTokenResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Object({
          provisional_user_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
          external_user_id: Type.String({ minLength: 1, maxLength: 1024 }),
          preferred_global_name: Type.Optional(
            Type.Union([Type.String({ minLength: 1, maxLength: 32 }), Type.Null()]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
