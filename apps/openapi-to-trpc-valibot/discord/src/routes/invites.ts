import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import {
  FriendInviteResponseSchema,
  GroupDMInviteResponseSchema,
  GuildInviteResponseSchema,
  SnowflakeTypeSchema,
  TargetUsersJobStatusResponseSchema,
} from '../components'

const t = initTRPC.create()

export const invitesRouter = t.router({
  getInvitesCode: t.procedure
    .input(
      v.object({
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
        with_counts: v.optional(v.boolean()),
        guild_scheduled_event_id: v.optional(SnowflakeTypeSchema),
        target_channel_id: v.optional(SnowflakeTypeSchema),
        target_message_id: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(
      v.union([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteInvitesCode: t.procedure
    .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
    .output(
      v.union([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getInvitesCodeTargetUsers: t.procedure
    .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putInvitesCodeTargetUsers: t.procedure
    .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postInvitesCodeTargetUsersBulkAdd: t.procedure
    .input(
      v.object({
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
        user_ids: v.pipe(
          v.pipe(v.array(SnowflakeTypeSchema), v.minLength(1), v.maxLength(1000)),
          v.description('The IDs of the users to target.'),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postInvitesCodeTargetUsersBulkDelete: t.procedure
    .input(
      v.object({
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
        user_ids: v.pipe(
          v.pipe(v.array(SnowflakeTypeSchema), v.minLength(1), v.maxLength(1000)),
          v.description('The IDs of the users to stop targeting.'),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getInvitesCodeTargetUsersJobStatus: t.procedure
    .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
    .output(TargetUsersJobStatusResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putInvitesCodeTargetUsersUserId: t.procedure
    .input(
      v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)), user_id: SnowflakeTypeSchema }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteInvitesCodeTargetUsersUserId: t.procedure
    .input(
      v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)), user_id: SnowflakeTypeSchema }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
