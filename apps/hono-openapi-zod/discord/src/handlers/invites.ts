import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
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
                z.xor([
                  FriendInviteResponseSchema,
                  GroupDMInviteResponseSchema,
                  GuildInviteResponseSchema,
                ]),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{}, { BotToken: [] }],
    }),
    validator('param', z.object({ code: z.string().max(152133) })),
    validator(
      'query',
      z.object({
        with_counts: z.stringbool().exactOptional(),
        guild_scheduled_event_id: SnowflakeTypeSchema.exactOptional(),
        target_channel_id: SnowflakeTypeSchema.exactOptional(),
        target_message_id: SnowflakeTypeSchema.exactOptional(),
      }),
    ),
    (c) => {},
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
                z.xor([
                  FriendInviteResponseSchema,
                  GroupDMInviteResponseSchema,
                  GuildInviteResponseSchema,
                ]),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ code: z.string().max(152133) })),
    (c) => {},
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
                z
                  .string()
                  .meta({ description: 'CSV file containing target users for the invite.' }),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ code: z.string().max(152133) })),
    (c) => {},
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
    validator('param', z.object({ code: z.string().max(152133) })),
    validator('form', z.object({ target_users_file: z.string() })),
    (c) => {},
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
    validator('param', z.object({ code: z.string().max(152133) })),
    validator(
      'json',
      z.object({
        user_ids: z
          .array(SnowflakeTypeSchema)
          .min(1)
          .max(1000)
          .meta({ description: 'The IDs of the users to target.' }),
      }),
    ),
    (c) => {},
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
    validator('param', z.object({ code: z.string().max(152133) })),
    validator(
      'json',
      z.object({
        user_ids: z
          .array(SnowflakeTypeSchema)
          .min(1)
          .max(1000)
          .meta({ description: 'The IDs of the users to stop targeting.' }),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(TargetUsersJobStatusResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ code: z.string().max(152133) })),
    (c) => {},
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
    validator('param', z.object({ code: z.string().max(152133), user_id: SnowflakeTypeSchema })),
    (c) => {},
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
    validator('param', z.object({ code: z.string().max(152133), user_id: SnowflakeTypeSchema })),
    (c) => {},
  )
