import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'with_counts?': 'boolean',
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteInvitesCode: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getInvitesCodeTargetUsers: t.procedure
    .input(
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putInvitesCodeTargetUsers: t.procedure
    .input(
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postInvitesCodeTargetUsersBulkAdd: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postInvitesCodeTargetUsersBulkDelete: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getInvitesCodeTargetUsersJobStatus: t.procedure
    .input(
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .output(TargetUsersJobStatusResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putInvitesCodeTargetUsersUserId: t.procedure
    .input(
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        user_id: SnowflakeTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteInvitesCodeTargetUsersUserId: t.procedure
    .input(
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        user_id: SnowflakeTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
