import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import {
  ApplicationUserRoleConnectionResponseSchema,
  BotAccountPatchRequestSchema,
  ConnectedAccountResponseSchema,
  CreatePrivateChannelRequestSchema,
  EntitlementResponseSchema,
  MyGuildResponseSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  PrivateGuildMemberResponseSchema,
  SnowflakeTypeSchema,
  UserPIIResponseSchema,
  UserResponseSchema,
} from '../components'

const t = initTRPC.create()

export const usersRouter = t.router({
  getUsersMe: t.procedure.output(UserPIIResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  patchUsersMe: t.procedure
    .input(BotAccountPatchRequestSchema)
    .output(UserPIIResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeApplicationsApplicationIdEntitlements: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        sku_ids: v.optional(
          v.union([
            v.string(),
            v.pipe(
              v.array(v.union([v.null(), SnowflakeTypeSchema])),
              v.maxLength(100),
              v.check((input) => new Set(input).size === input.length),
            ),
          ]),
        ),
        exclude_consumed: v.optional(v.boolean()),
      }),
    )
    .output(v.array(EntitlementResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeApplicationsApplicationIdRoleConnection: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .output(ApplicationUserRoleConnectionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putUsersMeApplicationsApplicationIdRoleConnection: t.procedure
    .input(
      v.object({
        application_id: SnowflakeTypeSchema,
        platform_name: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(50)))),
        platform_username: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
        metadata: v.optional(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
          ),
        ),
      }),
    )
    .output(ApplicationUserRoleConnectionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteUsersMeApplicationsApplicationIdRoleConnection: t.procedure
    .input(v.object({ application_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUsersMeChannels: t.procedure
    .input(CreatePrivateChannelRequestSchema)
    .output(v.union([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeConnections: t.procedure
    .output(v.nullable(v.array(ConnectedAccountResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeGuilds: t.procedure
    .input(
      v.partial(
        v.object({
          before: SnowflakeTypeSchema,
          after: SnowflakeTypeSchema,
          limit: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(200)),
          shard: v.pipe(v.number(), v.integer(), v.minValue(0)),
          with_counts: v.boolean(),
        }),
      ),
    )
    .output(v.nullable(v.array(MyGuildResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteUsersMeGuildsGuildId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeGuildsGuildIdMember: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(PrivateGuildMemberResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersUserId: t.procedure
    .input(v.object({ user_id: SnowflakeTypeSchema }))
    .output(UserResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
