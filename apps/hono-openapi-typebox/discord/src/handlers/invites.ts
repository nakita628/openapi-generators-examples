import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
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
                Compile(
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
    validator('param', Compile(Type.Object({ code: Type.String({ maxLength: 152133 }) }))),
    validator(
      'query',
      Compile(
        Type.Object({
          with_counts: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
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
                Compile(
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
    validator('param', Compile(Type.Object({ code: Type.String({ maxLength: 152133 }) }))),
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
                Compile(
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
    validator('param', Compile(Type.Object({ code: Type.String({ maxLength: 152133 }) }))),
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
    validator('param', Compile(Type.Object({ code: Type.String({ maxLength: 152133 }) }))),
    validator('form', Compile(Type.Object({ target_users_file: Type.String() }))),
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
    validator('param', Compile(Type.Object({ code: Type.String({ maxLength: 152133 }) }))),
    validator(
      'json',
      Compile(
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
    validator('param', Compile(Type.Object({ code: Type.String({ maxLength: 152133 }) }))),
    validator(
      'json',
      Compile(
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
            'application/json': { schema: resolver(Compile(TargetUsersJobStatusResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ code: Type.String({ maxLength: 152133 }) }))),
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
      Compile(
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
      Compile(
        Type.Object({ code: Type.String({ maxLength: 152133 }), user_id: SnowflakeTypeSchema }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
