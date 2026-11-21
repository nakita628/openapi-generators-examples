import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  ApplicationIdentityProviderAuthTypeSchema,
  ProvisionalTokenResponseSchema,
  SnowflakeTypeSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

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
      Compile(
        Type.Object({
          user_id_1: SnowflakeTypeSchema,
          user_id_2: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'json',
      Compile(
        Type.Record(Type.String(), Type.String({ maxLength: 2000 }), {
          maxProperties: 5,
          description: 'The moderation metadata attached to the message',
        }),
      ),
    ),
    validator(
      'form',
      Compile(
        Type.Record(Type.String(), Type.String({ maxLength: 2000 }), {
          maxProperties: 5,
          description: 'The moderation metadata attached to the message',
        }),
      ),
    ),
    (c) => {},
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
      Compile(
        Type.Object({
          client_id: SnowflakeTypeSchema,
          client_secret: Type.Optional(Type.Union([Type.String({ maxLength: 1024 }), Type.Null()])),
          external_auth_token: Type.String({ minLength: 1, maxLength: 10240 }),
          external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
        }),
      ),
    ),
    (c) => {},
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
      Compile(Type.Object({ external_user_id: Type.String({ minLength: 1, maxLength: 1024 }) })),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(Compile(ProvisionalTokenResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator(
      'json',
      Compile(
        Type.Object({
          client_id: SnowflakeTypeSchema,
          client_secret: Type.Optional(Type.Union([Type.String({ maxLength: 1024 }), Type.Null()])),
          external_auth_token: Type.String({ minLength: 1, maxLength: 10240 }),
          external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
        }),
      ),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(Compile(ProvisionalTokenResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'json',
      Compile(
        Type.Object({
          provisional_user_id: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
          ),
          external_user_id: Type.String({ minLength: 1, maxLength: 1024 }),
          preferred_global_name: Type.Optional(
            Type.Union([Type.String({ minLength: 1, maxLength: 32 }), Type.Null()]),
          ),
        }),
      ),
    ),
    (c) => {},
  )
