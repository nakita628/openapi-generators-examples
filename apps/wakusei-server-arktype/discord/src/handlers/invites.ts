import { os } from '@orpc/server'
import { type } from 'arktype'
import {
  FriendInviteResponseSchema,
  GroupDMInviteResponseSchema,
  GuildInviteResponseSchema,
  SnowflakeTypeSchema,
  TargetUsersJobStatusResponseSchema,
} from '../components'

export const getInvitesCode = os
  .route({
    method: 'GET',
    path: '/invites/{code}',
    successDescription: '200 response for invite_resolve',
  })
  .input(
    type({
      code: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      'with_counts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'guild_scheduled_event_id?': SnowflakeTypeSchema,
      'target_channel_id?': SnowflakeTypeSchema,
      'target_message_id?': SnowflakeTypeSchema,
    }),
  )
  .output(
    type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
      GuildInviteResponseSchema,
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteInvitesCode = os
  .route({
    method: 'DELETE',
    path: '/invites/{code}',
    successDescription: '200 response for invite_revoke',
  })
  .input(
    type({
      code: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
    }),
  )
  .output(
    type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
      GuildInviteResponseSchema,
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getInvitesCodeTargetUsers = os
  .route({
    method: 'GET',
    path: '/invites/{code}/target-users',
    description: 'Get the target users for an invite.',
    successDescription: '200 response for get_invite_target_users',
  })
  .input(
    type({
      code: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putInvitesCodeTargetUsers = os
  .route({
    method: 'PUT',
    path: '/invites/{code}/target-users',
    description: 'Update the target users for an existing invite.',
    successStatus: 204,
    successDescription: '204 response for update_invite_target_users',
  })
  .input(
    type({
      code: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postInvitesCodeTargetUsersBulkAdd = os
  .route({
    method: 'POST',
    path: '/invites/{code}/target-users/bulk-add',
    description: 'Add multiple target users to an existing invite.',
    successStatus: 204,
    successDescription: '204 response for bulk_add_invite_target_users',
  })
  .input(
    type({
      code: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      user_ids: type(type(SnowflakeTypeSchema).array())
        .and(type('1 <= unknown[] <= 1000'))
        .describe('The IDs of the users to target.'),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postInvitesCodeTargetUsersBulkDelete = os
  .route({
    method: 'POST',
    path: '/invites/{code}/target-users/bulk-delete',
    description: 'Remove multiple target users from an existing invite.',
    successStatus: 204,
    successDescription: '204 response for bulk_remove_invite_target_users',
  })
  .input(
    type({
      code: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      user_ids: type(type(SnowflakeTypeSchema).array())
        .and(type('1 <= unknown[] <= 1000'))
        .describe('The IDs of the users to stop targeting.'),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getInvitesCodeTargetUsersJobStatus = os
  .route({
    method: 'GET',
    path: '/invites/{code}/target-users/job-status',
    description: 'Get the target users job status for an invite.',
    successDescription: '200 response for get_invite_target_users_job_status',
  })
  .input(
    type({
      code: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
    }),
  )
  .output(TargetUsersJobStatusResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putInvitesCodeTargetUsersUserId = os
  .route({
    method: 'PUT',
    path: '/invites/{code}/target-users/{user_id}',
    description: 'Add a target user to an existing invite.',
    successStatus: 204,
    successDescription: '204 response for add_invite_target_user',
  })
  .input(
    type({
      code: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      user_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteInvitesCodeTargetUsersUserId = os
  .route({
    method: 'DELETE',
    path: '/invites/{code}/target-users/{user_id}',
    description: 'Remove a target user from an existing invite.',
    successStatus: 204,
    successDescription: '204 response for remove_invite_target_user',
  })
  .input(
    type({
      code: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
      user_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })
