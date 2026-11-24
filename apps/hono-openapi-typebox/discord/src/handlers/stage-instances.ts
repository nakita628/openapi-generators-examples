import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  SnowflakeTypeSchema,
  StageInstanceResponseSchema,
  StageInstancesPrivacyLevelsSchema,
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
              schema: resolver(toStandardSchemaV1(StageInstanceResponseSchema)),
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
          topic: Type.String({ minLength: 1, maxLength: 120 }),
          channel_id: SnowflakeTypeSchema,
          privacy_level: Type.Optional(
            Type.Union([Type.Null(), StageInstancesPrivacyLevelsSchema]),
          ),
          guild_scheduled_event_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
          send_start_notification: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
              schema: resolver(toStandardSchemaV1(StageInstanceResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
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
    validator('param', toStandardSchemaV1(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
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
              schema: resolver(toStandardSchemaV1(StageInstanceResponseSchema)),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', toStandardSchemaV1(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Object({
          topic: Type.Optional(Type.String({ minLength: 1, maxLength: 120 })),
          privacy_level: Type.Optional(StageInstancesPrivacyLevelsSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
