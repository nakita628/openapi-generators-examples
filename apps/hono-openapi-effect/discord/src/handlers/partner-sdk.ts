import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_id_1: SnowflakeTypeSchema,
          user_id_2: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 2000, {
              expected: 'a string of at most 2000 characters',
            }),
          ),
        ).annotate({ description: 'The moderation metadata attached to the message' }),
      ),
    ),
    validator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 2000, {
              expected: 'a string of at most 2000 characters',
            }),
          ),
        ).annotate({ description: 'The moderation metadata attached to the message' }),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          client_id: SnowflakeTypeSchema,
          client_secret: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 1024, {
                  expected: 'a string of at most 1024 characters',
                }),
              ),
            ),
          ),
          external_auth_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 10240, {
              expected: 'a string of at most 10240 characters',
            }),
          ),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          external_user_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 1024, {
              expected: 'a string of at most 1024 characters',
            }),
          ),
        }),
      ),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProvisionalTokenResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          client_id: SnowflakeTypeSchema,
          client_secret: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 1024, {
                  expected: 'a string of at most 1024 characters',
                }),
              ),
            ),
          ),
          external_auth_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 10240, {
              expected: 'a string of at most 10240 characters',
            }),
          ),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProvisionalTokenResponseSchema)),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          provisional_user_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          external_user_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 1024, {
              expected: 'a string of at most 1024 characters',
            }),
          ),
          preferred_global_name: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 32, {
                  expected: 'a string of at most 32 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
