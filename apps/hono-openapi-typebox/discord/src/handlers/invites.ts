import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  FriendInviteResponseSchema,
  GroupDMInviteResponseSchema,
  GuildInviteResponseSchema,
  SnowflakeTypeSchema,
  TargetUsersJobStatusResponseSchema,
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

export const invitesHandler = new Hono()
  .get(
    '/invites/:code',
    describeRoute({
      operationId: 'invite_resolve',
      responses: {
        '200': {
          description: '200 response for invite_resolve',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                toStandardSchemaV1(
                  Type.Union([
                    FriendInviteResponseSchema,
                    GroupDMInviteResponseSchema,
                    GuildInviteResponseSchema,
                  ]),
                ),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          with_counts: Type.Optional(
            Codec(
              Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
            )
              .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
              .Encode((value) => (value ? 'true' : 'false')),
          ),
          guild_scheduled_event_id: Type.Optional(SnowflakeTypeSchema),
          target_channel_id: Type.Optional(SnowflakeTypeSchema),
          target_message_id: Type.Optional(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/invites/:code',
    describeRoute({
      operationId: 'invite_revoke',
      responses: {
        '200': {
          description: '200 response for invite_revoke',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                toStandardSchemaV1(
                  Type.Union([
                    FriendInviteResponseSchema,
                    GroupDMInviteResponseSchema,
                    GuildInviteResponseSchema,
                  ]),
                ),
              ),
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
      toStandardSchemaV1(Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/invites/:code/target-users',
    describeRoute({
      description: 'Get the target users for an invite.',
      operationId: 'get_invite_target_users',
      responses: {
        '200': {
          description: '200 response for get_invite_target_users',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'text/csv': {
              schema: resolver(
                toStandardSchemaV1(
                  Type.String({ description: 'CSV file containing target users for the invite.' }),
                ),
              ),
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
      toStandardSchemaV1(Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/invites/:code/target-users',
    describeRoute({
      description: 'Update the target users for an existing invite.',
      operationId: 'update_invite_target_users',
      responses: {
        '204': {
          description: '204 response for update_invite_target_users',
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
      toStandardSchemaV1(Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    ),
    validator('form', toStandardSchemaV1(Type.Object({ target_users_file: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/invites/:code/target-users/bulk-add',
    describeRoute({
      description: 'Add multiple target users to an existing invite.',
      operationId: 'bulk_add_invite_target_users',
      responses: {
        '204': {
          description: '204 response for bulk_add_invite_target_users',
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
      toStandardSchemaV1(Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    ),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Object({
          user_ids: Type.Array(SnowflakeTypeSchema, {
            minItems: 1,
            maxItems: 1000,
            description: 'The IDs of the users to target.',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/invites/:code/target-users/bulk-delete',
    describeRoute({
      description: 'Remove multiple target users from an existing invite.',
      operationId: 'bulk_remove_invite_target_users',
      responses: {
        '204': {
          description: '204 response for bulk_remove_invite_target_users',
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
      toStandardSchemaV1(Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    ),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Object({
          user_ids: Type.Array(SnowflakeTypeSchema, {
            minItems: 1,
            maxItems: 1000,
            description: 'The IDs of the users to stop targeting.',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/invites/:code/target-users/job-status',
    describeRoute({
      description: 'Get the target users job status for an invite.',
      operationId: 'get_invite_target_users_job_status',
      responses: {
        '200': {
          description: '200 response for get_invite_target_users_job_status',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(TargetUsersJobStatusResponseSchema)),
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
      toStandardSchemaV1(Type.Object({ code: Type.String({ maxLength: 152133 }) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/invites/:code/target-users/:user_id',
    describeRoute({
      description: 'Add a target user to an existing invite.',
      operationId: 'add_invite_target_user',
      responses: {
        '204': {
          description: '204 response for add_invite_target_user',
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
        Type.Object({ code: Type.String({ maxLength: 152133 }), user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/invites/:code/target-users/:user_id',
    describeRoute({
      description: 'Remove a target user from an existing invite.',
      operationId: 'remove_invite_target_user',
      responses: {
        '204': {
          description: '204 response for remove_invite_target_user',
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
        Type.Object({ code: Type.String({ maxLength: 152133 }), user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
