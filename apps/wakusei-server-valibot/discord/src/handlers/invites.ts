import { os } from '@orpc/server'
import * as v from 'valibot'
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
    v.object({
      code: v.pipe(v.string(), v.maxCodePoints(152133)),
      with_counts: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      guild_scheduled_event_id: v.optional(SnowflakeTypeSchema),
      target_channel_id: v.optional(SnowflakeTypeSchema),
      target_message_id: v.optional(SnowflakeTypeSchema),
    }),
  )
  .output(
    v.union([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
  )
  .handler(async ({ input }) => {})

export const deleteInvitesCode = os
  .route({
    method: 'DELETE',
    path: '/invites/{code}',
    successDescription: '200 response for invite_revoke',
  })
  .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
  .output(
    v.union([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
  )
  .handler(async ({ input }) => {})

export const getInvitesCodeTargetUsers = os
  .route({
    method: 'GET',
    path: '/invites/{code}/target-users',
    description: 'Get the target users for an invite.',
    successDescription: '200 response for get_invite_target_users',
  })
  .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
  .handler(async ({ input }) => {})

export const putInvitesCodeTargetUsers = os
  .route({
    method: 'PUT',
    path: '/invites/{code}/target-users',
    description: 'Update the target users for an existing invite.',
    successStatus: 204,
    successDescription: '204 response for update_invite_target_users',
  })
  .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
  .handler(async ({ input }) => {})

export const postInvitesCodeTargetUsersBulkAdd = os
  .route({
    method: 'POST',
    path: '/invites/{code}/target-users/bulk-add',
    description: 'Add multiple target users to an existing invite.',
    successStatus: 204,
    successDescription: '204 response for bulk_add_invite_target_users',
  })
  .input(
    v.object({
      code: v.pipe(v.string(), v.maxCodePoints(152133)),
      user_ids: v.pipe(
        v.pipe(v.array(SnowflakeTypeSchema), v.minLength(1), v.maxLength(1000)),
        v.description('The IDs of the users to target.'),
      ),
    }),
  )
  .handler(async ({ input }) => {})

export const postInvitesCodeTargetUsersBulkDelete = os
  .route({
    method: 'POST',
    path: '/invites/{code}/target-users/bulk-delete',
    description: 'Remove multiple target users from an existing invite.',
    successStatus: 204,
    successDescription: '204 response for bulk_remove_invite_target_users',
  })
  .input(
    v.object({
      code: v.pipe(v.string(), v.maxCodePoints(152133)),
      user_ids: v.pipe(
        v.pipe(v.array(SnowflakeTypeSchema), v.minLength(1), v.maxLength(1000)),
        v.description('The IDs of the users to stop targeting.'),
      ),
    }),
  )
  .handler(async ({ input }) => {})

export const getInvitesCodeTargetUsersJobStatus = os
  .route({
    method: 'GET',
    path: '/invites/{code}/target-users/job-status',
    description: 'Get the target users job status for an invite.',
    successDescription: '200 response for get_invite_target_users_job_status',
  })
  .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
  .output(TargetUsersJobStatusResponseSchema)
  .handler(async ({ input }) => {})

export const putInvitesCodeTargetUsersUserId = os
  .route({
    method: 'PUT',
    path: '/invites/{code}/target-users/{user_id}',
    description: 'Add a target user to an existing invite.',
    successStatus: 204,
    successDescription: '204 response for add_invite_target_user',
  })
  .input(
    v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)), user_id: SnowflakeTypeSchema }),
  )
  .handler(async ({ input }) => {})

export const deleteInvitesCodeTargetUsersUserId = os
  .route({
    method: 'DELETE',
    path: '/invites/{code}/target-users/{user_id}',
    description: 'Remove a target user from an existing invite.',
    successStatus: 204,
    successDescription: '204 response for remove_invite_target_user',
  })
  .input(
    v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)), user_id: SnowflakeTypeSchema }),
  )
  .handler(async ({ input }) => {})
