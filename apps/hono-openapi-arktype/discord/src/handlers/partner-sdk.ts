import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
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
      type({
        user_id_1: SnowflakeTypeSchema,
        user_id_2: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
      }),
    ),
    validator(
      'json',
      type({
        '[string]': type('string').narrow(
          (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
        ),
      }).describe('The moderation metadata attached to the message'),
    ),
    validator(
      'form',
      type({
        '[string]': type('string').narrow(
          (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
        ),
      }).describe('The moderation metadata attached to the message'),
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
      type({
        client_id: SnowflakeTypeSchema,
        'client_secret?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
          ),
        ).or('null'),
        external_auth_token: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow(
            (data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters'),
          ),
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
    validator(
      'json',
      type({
        external_user_id: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters')),
      }),
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
          content: { 'application/json': { schema: resolver(ProvisionalTokenResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator(
      'json',
      type({
        client_id: SnowflakeTypeSchema,
        'client_secret?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
          ),
        ).or('null'),
        external_auth_token: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow(
            (data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters'),
          ),
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
      type({
        'provisional_user_id?': type('null').or(SnowflakeTypeSchema),
        external_user_id: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters')),
        'preferred_global_name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        ).or('null'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
