import { t, type UnwrapSchema } from 'elysia'
import {
  ApplicationCommandPermissionSchema,
  ApplicationCommandResponseSchema,
  ApplicationCommandUpdateRequestSchema,
  ApplicationRoleConnectionsMetadataItemRequestSchema,
  ApplicationRoleConnectionsMetadataItemResponseSchema,
  CommandPermissionsResponseSchema,
  EntitlementResponseSchema,
} from '../../components/schemas'

export const ApplicationsModel = {
  get_applicationParams: t.Object({ application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  update_applicationParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  applications_get_activity_instanceParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    instance_id: t.String({ maxLength: 152133 }),
  }),
  upload_application_attachmentParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  upload_application_attachmentBody: t.Form({ file: t.String() }),
  list_application_commandsParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_application_commandsQuery: t.Object({ with_localizations: t.Optional(t.Boolean()) }),
  list_application_commandsResponse200: t.Union([
    t.Array(ApplicationCommandResponseSchema),
    t.Null(),
  ]),
  bulk_set_application_commandsParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  bulk_set_application_commandsBody: t.Union([
    t.Array(ApplicationCommandUpdateRequestSchema, { maxItems: 130 }),
    t.Null(),
  ]),
  bulk_set_application_commandsResponse200: t.Union([
    t.Array(ApplicationCommandResponseSchema),
    t.Null(),
  ]),
  create_application_commandParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_application_commandParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    command_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  delete_application_commandParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    command_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_application_commandParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    command_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_application_emojisParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  create_application_emojiParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  create_application_emojiBody: t.Object({
    name: t.String({ minLength: 2, maxLength: 32 }),
    image: t.String(),
  }),
  get_application_emojiParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    emoji_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  delete_application_emojiParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    emoji_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_application_emojiParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    emoji_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_application_emojiBody: t.Object({
    name: t.Optional(t.String({ minLength: 2, maxLength: 32 })),
  }),
  get_entitlementsParams: t.Object({ application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_entitlementsQuery: t.Object({
    user_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    sku_ids: t.Optional(
      t.Union([
        t.String(),
        t.Array(t.Union([t.Null(), t.String({ pattern: '^(0|[1-9][0-9]*)$' })]), {
          maxItems: 100,
          uniqueItems: true,
        }),
      ]),
    ),
    guild_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    before: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    after: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    exclude_ended: t.Optional(t.Boolean()),
    exclude_deleted: t.Optional(t.Boolean()),
    only_active: t.Optional(t.Boolean()),
  }),
  get_entitlementsResponse200: t.Array(EntitlementResponseSchema),
  create_entitlementParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_entitlementParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    entitlement_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  delete_entitlementParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    entitlement_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  consume_entitlementParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    entitlement_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_application_commandsParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_application_commandsQuery: t.Object({ with_localizations: t.Optional(t.Boolean()) }),
  list_guild_application_commandsResponse200: t.Union([
    t.Array(ApplicationCommandResponseSchema),
    t.Null(),
  ]),
  bulk_set_guild_application_commandsParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
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
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_application_command_permissionsParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_application_command_permissionsResponse200: t.Array(CommandPermissionsResponseSchema),
  get_guild_application_commandParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    command_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  delete_guild_application_commandParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    command_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_application_commandParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    command_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_guild_application_command_permissionsParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    command_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  set_guild_application_command_permissionsParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    command_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  set_guild_application_command_permissionsBody: t.Object({
    permissions: t.Optional(
      t.Union([t.Array(ApplicationCommandPermissionSchema, { maxItems: 100 }), t.Null()]),
    ),
  }),
  get_application_role_connections_metadataParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_application_role_connections_metadataResponse200: t.Union([
    t.Array(ApplicationRoleConnectionsMetadataItemResponseSchema),
    t.Null(),
  ]),
  update_application_role_connections_metadataParams: t.Object({
    application_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
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
