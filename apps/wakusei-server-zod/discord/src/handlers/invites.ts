import { os } from '@orpc/server'
import * as z from 'zod'
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
    z.object({
      code: z.string().max(152133),
      with_counts: z.stringbool().exactOptional(),
      guild_scheduled_event_id: SnowflakeTypeSchema.exactOptional(),
      target_channel_id: SnowflakeTypeSchema.exactOptional(),
      target_message_id: SnowflakeTypeSchema.exactOptional(),
    }),
  )
  .output(
    z.xor([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteInvitesCode = os
  .route({
    method: 'DELETE',
    path: '/invites/{code}',
    successDescription: '200 response for invite_revoke',
  })
  .input(z.object({ code: z.string().max(152133) }))
  .output(
    z.xor([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getInvitesCodeTargetUsers = os
  .route({
    method: 'GET',
    path: '/invites/{code}/target-users',
    description: 'Get the target users for an invite.',
    successDescription: '200 response for get_invite_target_users',
  })
  .input(z.object({ code: z.string().max(152133) }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putInvitesCodeTargetUsers = os
  .route({
    method: 'PUT',
    path: '/invites/{code}/target-users',
    description: 'Update the target users for an existing invite.',
    successStatus: 204,
    successDescription: '204 response for update_invite_target_users',
  })
  .input(z.object({ code: z.string().max(152133) }))
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
    z.object({
      code: z.string().max(152133),
      user_ids: z
        .array(SnowflakeTypeSchema)
        .min(1)
        .max(1000)
        .meta({ description: 'The IDs of the users to target.' }),
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
    z.object({
      code: z.string().max(152133),
      user_ids: z
        .array(SnowflakeTypeSchema)
        .min(1)
        .max(1000)
        .meta({ description: 'The IDs of the users to stop targeting.' }),
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
  .input(z.object({ code: z.string().max(152133) }))
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
  .input(z.object({ code: z.string().max(152133), user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteInvitesCodeTargetUsersUserId = os
  .route({
    method: 'DELETE',
    path: '/invites/{code}/target-users/{user_id}',
    description: 'Remove a target user from an existing invite.',
    successStatus: 204,
    successDescription: '204 response for remove_invite_target_user',
  })
  .input(z.object({ code: z.string().max(152133), user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
