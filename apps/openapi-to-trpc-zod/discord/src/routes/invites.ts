import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        code: z.string().max(152133),
        with_counts: z.boolean().exactOptional(),
        guild_scheduled_event_id: SnowflakeTypeSchema.exactOptional(),
        target_channel_id: SnowflakeTypeSchema.exactOptional(),
        target_message_id: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(
      z.xor([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteInvitesCode: t.procedure
    .input(z.object({ code: z.string().max(152133) }))
    .output(
      z.xor([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getInvitesCodeTargetUsers: t.procedure
    .input(z.object({ code: z.string().max(152133) }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putInvitesCodeTargetUsers: t.procedure
    .input(z.object({ code: z.string().max(152133) }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postInvitesCodeTargetUsersBulkAdd: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postInvitesCodeTargetUsersBulkDelete: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getInvitesCodeTargetUsersJobStatus: t.procedure
    .input(z.object({ code: z.string().max(152133) }))
    .output(TargetUsersJobStatusResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putInvitesCodeTargetUsersUserId: t.procedure
    .input(z.object({ code: z.string().max(152133), user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteInvitesCodeTargetUsersUserId: t.procedure
    .input(z.object({ code: z.string().max(152133), user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
