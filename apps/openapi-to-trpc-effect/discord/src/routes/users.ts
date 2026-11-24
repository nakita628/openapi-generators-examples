import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
  getUsersMe: t.procedure.output(Schema.toStandardSchemaV1(UserPIIResponseSchema)).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  patchUsersMe: t.procedure
    .input(Schema.toStandardSchemaV1(BotAccountPatchRequestSchema))
    .output(Schema.toStandardSchemaV1(UserPIIResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeApplicationsApplicationIdEntitlements: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          sku_ids: Schema.optionalKey(
            Schema.Union([
              Schema.String,
              Schema.Array(Schema.Union([Schema.Null, SnowflakeTypeSchema])).check(
                Schema.isMaxLength(100),
                Schema.isUnique(),
              ),
            ]),
          ),
          exclude_consumed: Schema.optionalKey(Schema.Boolean),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Array(EntitlementResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeApplicationsApplicationIdRoleConnection: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(ApplicationUserRoleConnectionResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putUsersMeApplicationsApplicationIdRoleConnection: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          application_id: SnowflakeTypeSchema,
          platform_name: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 50, {
                  expected: 'a string of at most 50 characters',
                }),
              ),
            ),
          ),
          platform_username: Schema.optionalKey(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
          metadata: Schema.optionalKey(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 1, {
                    expected: 'a string of at least 1 character',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 100, {
                    expected: 'a string of at most 100 characters',
                  }),
                ),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApplicationUserRoleConnectionResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteUsersMeApplicationsApplicationIdRoleConnection: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ application_id: SnowflakeTypeSchema })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUsersMeChannels: t.procedure
    .input(Schema.toStandardSchemaV1(CreatePrivateChannelRequestSchema))
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeConnections: t.procedure
    .output(Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(ConnectedAccountResponseSchema))))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeGuilds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          before: Schema.optionalKey(SnowflakeTypeSchema),
          after: Schema.optionalKey(SnowflakeTypeSchema),
          limit: Schema.optionalKey(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(200),
            ),
          ),
          shard: Schema.optionalKey(
            Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
          ),
          with_counts: Schema.optionalKey(Schema.Boolean),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(MyGuildResponseSchema))))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteUsersMeGuildsGuildId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersMeGuildsGuildIdMember: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(PrivateGuildMemberResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getUsersUserId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ user_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(UserResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
