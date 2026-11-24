import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        application_id: SnowflakeTypeSchema,
        'sku_ids?': type('string').or(
          type(type(type('null').or(SnowflakeTypeSchema)).array())
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'exclude_consumed?': 'boolean',
      }),
    )
    .output(type(EntitlementResponseSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeApplicationsApplicationIdRoleConnection: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema }))
    .output(ApplicationUserRoleConnectionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putUsersMeApplicationsApplicationIdRoleConnection: t.procedure
    .input(
      type({
        application_id: SnowflakeTypeSchema,
        'platform_name?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 50 || ctx.mustBe('at most 50 characters'),
          ),
        ).or('null'),
        'platform_username?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
          ),
        ).or('null'),
        'metadata?': type(
          type({
            '[string]': type('string')
              .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
              .narrow(
                (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
              ),
          }),
        ).or('null'),
      }),
    )
    .output(ApplicationUserRoleConnectionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteUsersMeApplicationsApplicationIdRoleConnection: t.procedure
    .input(type({ application_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUsersMeChannels: t.procedure
    .input(CreatePrivateChannelRequestSchema)
    .output(type(PrivateChannelResponseSchema).or(PrivateGroupChannelResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeConnections: t.procedure
    .output(type(type(ConnectedAccountResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeGuilds: t.procedure
    .input(
      type({
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 200',
        'shard?': 'number.integer >= 0',
        'with_counts?': 'boolean',
      }),
    )
    .output(type(type(MyGuildResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteUsersMeGuildsGuildId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeGuildsGuildIdMember: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(PrivateGuildMemberResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersUserId: t.procedure
    .input(type({ user_id: SnowflakeTypeSchema }))
    .output(UserResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
