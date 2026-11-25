import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        application_id: SnowflakeTypeSchema,
        sku_ids: z
          .xor([
            z.string(),
            z
              .array(z.xor([z.null(), SnowflakeTypeSchema]))
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          ])
          .exactOptional(),
        exclude_consumed: z.boolean().exactOptional(),
      }),
    )
    .output(z.array(EntitlementResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeApplicationsApplicationIdRoleConnection: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .output(ApplicationUserRoleConnectionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putUsersMeApplicationsApplicationIdRoleConnection: t.procedure
    .input(
      z.object({
        application_id: SnowflakeTypeSchema,
        platform_name: z.string().max(50).nullable().exactOptional(),
        platform_username: z.string().max(100).nullable().exactOptional(),
        metadata: z.record(z.string(), z.string().min(1).max(100)).nullable().exactOptional(),
      }),
    )
    .output(ApplicationUserRoleConnectionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteUsersMeApplicationsApplicationIdRoleConnection: t.procedure
    .input(z.object({ application_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUsersMeChannels: t.procedure
    .input(CreatePrivateChannelRequestSchema)
    .output(z.xor([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeConnections: t.procedure
    .output(z.array(ConnectedAccountResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeGuilds: t.procedure
    .input(
      z.object({
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.int().min(1).max(200).exactOptional(),
        shard: z.int().min(0).exactOptional(),
        with_counts: z.boolean().exactOptional(),
      }),
    )
    .output(z.array(MyGuildResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteUsersMeGuildsGuildId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeGuildsGuildIdMember: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(PrivateGuildMemberResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersUserId: t.procedure
    .input(z.object({ user_id: SnowflakeTypeSchema }))
    .output(UserResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
