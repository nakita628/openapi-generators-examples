import { t, type UnwrapSchema } from 'elysia'
import {
  ApplicationCommandPermissionSchema,
  ApplicationCommandResponseSchema,
  ApplicationCommandUpdateRequestSchema,
  ApplicationRoleConnectionsMetadataItemRequestSchema,
  ApplicationRoleConnectionsMetadataItemResponseSchema,
  CommandPermissionsResponseSchema,
  EntitlementResponseSchema,
  SnowflakeTypeSchema,
} from '../../components/schemas'

export const ApplicationsModel = {
  get_applicationParams: t.Object({ application_id: SnowflakeTypeSchema }),
  update_applicationParams: t.Object({ application_id: SnowflakeTypeSchema }),
  applications_get_activity_instanceParams: t.Object({
    application_id: SnowflakeTypeSchema,
    instance_id: t.String({ maxLength: 152133 }),
  }),
  upload_application_attachmentParams: t.Object({ application_id: SnowflakeTypeSchema }),
  upload_application_attachmentBody: t.Form({ file: t.String() }),
  list_application_commandsParams: t.Object({ application_id: SnowflakeTypeSchema }),
  list_application_commandsQuery: t.Object({ with_localizations: t.Optional(t.Boolean()) }),
  list_application_commandsResponse200: t.Union([
    t.Array(ApplicationCommandResponseSchema),
    t.Null(),
  ]),
  bulk_set_application_commandsParams: t.Object({ application_id: SnowflakeTypeSchema }),
  bulk_set_application_commandsBody: t.Union([
    t.Array(ApplicationCommandUpdateRequestSchema, { maxItems: 130 }),
    t.Null(),
  ]),
  bulk_set_application_commandsResponse200: t.Union([
    t.Array(ApplicationCommandResponseSchema),
    t.Null(),
  ]),
  create_application_commandParams: t.Object({ application_id: SnowflakeTypeSchema }),
  get_application_commandParams: t.Object({
    application_id: SnowflakeTypeSchema,
    command_id: SnowflakeTypeSchema,
  }),
  delete_application_commandParams: t.Object({
    application_id: SnowflakeTypeSchema,
    command_id: SnowflakeTypeSchema,
  }),
  update_application_commandParams: t.Object({
    application_id: SnowflakeTypeSchema,
    command_id: SnowflakeTypeSchema,
  }),
  list_application_emojisParams: t.Object({ application_id: SnowflakeTypeSchema }),
  create_application_emojiParams: t.Object({ application_id: SnowflakeTypeSchema }),
  create_application_emojiBody: t.Object({
    name: t.String({ minLength: 2, maxLength: 32 }),
    image: t.String(),
  }),
  get_application_emojiParams: t.Object({
    application_id: SnowflakeTypeSchema,
    emoji_id: SnowflakeTypeSchema,
  }),
  delete_application_emojiParams: t.Object({
    application_id: SnowflakeTypeSchema,
    emoji_id: SnowflakeTypeSchema,
  }),
  update_application_emojiParams: t.Object({
    application_id: SnowflakeTypeSchema,
    emoji_id: SnowflakeTypeSchema,
  }),
  update_application_emojiBody: t.Object({
    name: t.Optional(t.String({ minLength: 2, maxLength: 32 })),
  }),
  get_entitlementsParams: t.Object({ application_id: SnowflakeTypeSchema }),
  get_entitlementsQuery: t.Object({
    user_id: t.Optional(SnowflakeTypeSchema),
    sku_ids: t.Optional(
      t.Union([
        t.String(),
        t.Array(t.Union([t.Null(), SnowflakeTypeSchema]), { maxItems: 100, uniqueItems: true }),
      ]),
    ),
    guild_id: t.Optional(SnowflakeTypeSchema),
    before: t.Optional(SnowflakeTypeSchema),
    after: t.Optional(SnowflakeTypeSchema),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    exclude_ended: t.Optional(t.Boolean()),
    exclude_deleted: t.Optional(t.Boolean()),
    only_active: t.Optional(t.Boolean()),
  }),
  get_entitlementsResponse200: t.Array(EntitlementResponseSchema),
  create_entitlementParams: t.Object({ application_id: SnowflakeTypeSchema }),
  get_entitlementParams: t.Object({
    application_id: SnowflakeTypeSchema,
    entitlement_id: SnowflakeTypeSchema,
  }),
  delete_entitlementParams: t.Object({
    application_id: SnowflakeTypeSchema,
    entitlement_id: SnowflakeTypeSchema,
  }),
  consume_entitlementParams: t.Object({
    application_id: SnowflakeTypeSchema,
    entitlement_id: SnowflakeTypeSchema,
  }),
  list_guild_application_commandsParams: t.Object({
    application_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
  }),
  list_guild_application_commandsQuery: t.Object({ with_localizations: t.Optional(t.Boolean()) }),
  list_guild_application_commandsResponse200: t.Union([
    t.Array(ApplicationCommandResponseSchema),
    t.Null(),
  ]),
  bulk_set_guild_application_commandsParams: t.Object({
    application_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
  }),
  bulk_set_guild_application_commandsBody: t.Union([
    t.Array(ApplicationCommandUpdateRequestSchema, { maxItems: 130 }),
    t.Null(),
  ]),
  bulk_set_guild_application_commandsResponse200: t.Union([
    t.Array(ApplicationCommandResponseSchema),
    t.Null(),
  ]),
  create_guild_application_commandParams: t.Object({
    application_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
  }),
  list_guild_application_command_permissionsParams: t.Object({
    application_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
  }),
  list_guild_application_command_permissionsResponse200: t.Array(CommandPermissionsResponseSchema),
  get_guild_application_commandParams: t.Object({
    application_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    command_id: SnowflakeTypeSchema,
  }),
  delete_guild_application_commandParams: t.Object({
    application_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    command_id: SnowflakeTypeSchema,
  }),
  update_guild_application_commandParams: t.Object({
    application_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    command_id: SnowflakeTypeSchema,
  }),
  get_guild_application_command_permissionsParams: t.Object({
    application_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    command_id: SnowflakeTypeSchema,
  }),
  set_guild_application_command_permissionsParams: t.Object({
    application_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    command_id: SnowflakeTypeSchema,
  }),
  set_guild_application_command_permissionsBody: t.Object({
    permissions: t.Optional(
      t.Union([t.Array(ApplicationCommandPermissionSchema, { maxItems: 100 }), t.Null()]),
    ),
  }),
  get_application_role_connections_metadataParams: t.Object({
    application_id: SnowflakeTypeSchema,
  }),
  get_application_role_connections_metadataResponse200: t.Union([
    t.Array(ApplicationRoleConnectionsMetadataItemResponseSchema),
    t.Null(),
  ]),
  update_application_role_connections_metadataParams: t.Object({
    application_id: SnowflakeTypeSchema,
  }),
  update_application_role_connections_metadataBody: t.Union([
    t.Array(ApplicationRoleConnectionsMetadataItemRequestSchema, { maxItems: 5 }),
    t.Null(),
  ]),
  update_application_role_connections_metadataResponse200: t.Union([
    t.Array(ApplicationRoleConnectionsMetadataItemResponseSchema),
    t.Null(),
  ]),
} as const

export type ApplicationsModel = {
  [k in keyof typeof ApplicationsModel]: UnwrapSchema<(typeof ApplicationsModel)[k]>
}
