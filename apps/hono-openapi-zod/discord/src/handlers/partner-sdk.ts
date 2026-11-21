import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
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
      z.object({
        user_id_1: SnowflakeTypeSchema,
        user_id_2: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
      }),
    ),
    validator(
      'json',
      z
        .record(z.string(), z.string().max(2000))
        .meta({ description: 'The moderation metadata attached to the message' }),
    ),
    validator(
      'form',
      z
        .record(z.string(), z.string().max(2000))
        .meta({ description: 'The moderation metadata attached to the message' }),
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
      z.object({
        client_id: SnowflakeTypeSchema,
        client_secret: z.string().max(1024).nullable().exactOptional(),
        external_auth_token: z.string().min(1).max(10240),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
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
    validator('json', z.object({ external_user_id: z.string().min(1).max(1024) })),
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
          content: { 'application/json': { schema: resolver(ProvisionalTokenResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator(
      'json',
      z.object({
        client_id: SnowflakeTypeSchema,
        client_secret: z.string().max(1024).nullable().exactOptional(),
        external_auth_token: z.string().min(1).max(10240),
        external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
      }),
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
          content: { 'application/json': { schema: resolver(ProvisionalTokenResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'json',
      z.object({
        provisional_user_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        external_user_id: z.string().min(1).max(1024),
        preferred_global_name: z.string().min(1).max(32).nullable().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
