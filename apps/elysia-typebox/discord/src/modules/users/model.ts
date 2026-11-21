import { t, type UnwrapSchema } from 'elysia'
import {
  ConnectedAccountResponseSchema,
  EntitlementResponseSchema,
  MyGuildResponseSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  SnowflakeTypeSchema,
} from '../../components/schemas'

export const UsersModel = {
  get_current_user_application_entitlementsParams: t.Object({
    application_id: SnowflakeTypeSchema,
  }),
  get_current_user_application_entitlementsQuery: t.Object({
    sku_ids: t.Optional(
      t.Union([
        t.String(),
        t.Array(t.Union([t.Null(), SnowflakeTypeSchema]), { maxItems: 100, uniqueItems: true }),
      ]),
    ),
    exclude_consumed: t.Optional(t.Boolean()),
  }),
  get_current_user_application_entitlementsResponse200: t.Array(EntitlementResponseSchema),
  get_application_user_role_connectionParams: t.Object({ application_id: SnowflakeTypeSchema }),
  update_application_user_role_connectionParams: t.Object({ application_id: SnowflakeTypeSchema }),
  delete_application_user_role_connectionParams: t.Object({ application_id: SnowflakeTypeSchema }),
  create_dmResponse200: t.Union([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]),
  list_my_connectionsResponse200: t.Union([t.Array(ConnectedAccountResponseSchema), t.Null()]),
  list_my_guildsQuery: t.Object({
    before: t.Optional(SnowflakeTypeSchema),
    after: t.Optional(SnowflakeTypeSchema),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 200 })),
    shard: t.Optional(t.Integer({ minimum: 0, maximum: 9007199254740991 })),
    with_counts: t.Optional(t.Boolean()),
  }),
  list_my_guildsResponse200: t.Union([t.Array(MyGuildResponseSchema), t.Null()]),
  leave_guildParams: t.Object({ guild_id: SnowflakeTypeSchema }),
  get_my_guild_memberParams: t.Object({ guild_id: SnowflakeTypeSchema }),
  get_userParams: t.Object({ user_id: SnowflakeTypeSchema }),
} as const

export type UsersModel = { [k in keyof typeof UsersModel]: UnwrapSchema<(typeof UsersModel)[k]> }
