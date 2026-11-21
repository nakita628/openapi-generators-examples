import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
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
          content: { 'application/json': { schema: resolver(StageInstanceResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'json',
      v.object({
        topic: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120)),
        channel_id: SnowflakeTypeSchema,
        privacy_level: v.optional(
          v.union([v.nullable(v.null()), StageInstancesPrivacyLevelsSchema]),
        ),
        guild_scheduled_event_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        send_start_notification: v.optional(v.nullable(v.boolean())),
      }),
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
          content: { 'application/json': { schema: resolver(StageInstanceResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ channel_id: SnowflakeTypeSchema })),
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
    validator('param', v.object({ channel_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(StageInstanceResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', v.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'json',
      v.partial(
        v.object({
          topic: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(120)),
          privacy_level: StageInstancesPrivacyLevelsSchema,
        }),
      ),
    ),
    (c) => {},
  )
