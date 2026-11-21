import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema } from 'effect'
import {
  SnowflakeTypeSchema,
  StageInstanceResponseSchema,
  StageInstancesPrivacyLevelsSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

export const stageInstancesHandler = new Hono()
  .post(
    '/stage-instances',
    describeRoute({
      operationId: 'create_stage_instance',
      responses: {
        '200': {
          description: '200 response for create_stage_instance',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(StageInstanceResponseSchema)),
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
          topic: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 120, {
              expected: 'a string of at most 120 characters',
            }),
          ),
          channel_id: SnowflakeTypeSchema,
          privacy_level: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), StageInstancesPrivacyLevelsSchema]),
          ),
          guild_scheduled_event_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          send_start_notification: Schema.optional(Schema.NullOr(Schema.Boolean)),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/stage-instances/:channel_id',
    describeRoute({
      operationId: 'get_stage_instance',
      responses: {
        '200': {
          description: '200 response for get_stage_instance',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(StageInstanceResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .delete(
    '/stage-instances/:channel_id',
    describeRoute({
      operationId: 'delete_stage_instance',
      responses: {
        '204': {
          description: '204 response for delete_stage_instance',
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
      Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .patch(
    '/stage-instances/:channel_id',
    describeRoute({
      operationId: 'update_stage_instance',
      responses: {
        '200': {
          description: '200 response for update_stage_instance',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(StageInstanceResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })),
    ),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          topic: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 120, {
                expected: 'a string of at most 120 characters',
              }),
            ),
          ),
          privacy_level: Schema.optional(StageInstancesPrivacyLevelsSchema),
        }),
      ),
    ),
    (c) => {},
  )
