import { t, type UnwrapSchema } from 'elysia'
import {
  BulkLobbyMemberRequestSchema,
  LobbyMemberRequestSchema,
  LobbyMemberResponseSchema,
  LobbyMessageResponseSchema,
  SnowflakeTypeSchema,
} from '../../components/schemas'

export const LobbiesModel = {
  create_or_join_lobbyBody: t.Object({
    idle_timeout_seconds: t.Optional(
      t.Union([t.Integer({ format: 'int32', minimum: 5, maximum: 604800 }), t.Null()]),
    ),
    lobby_metadata: t.Optional(
      t.Union([
        t.Record(t.String(), t.String({ maxLength: 1024 }), { maxProperties: 25 }),
        t.Null(),
      ]),
    ),
    member_metadata: t.Optional(
      t.Union([
        t.Record(t.String(), t.String({ maxLength: 1024 }), { maxProperties: 25 }),
        t.Null(),
      ]),
    ),
    secret: t.String({ maxLength: 250 }),
    flags: t.Optional(t.Union([t.Null(), t.Literal(1)])),
    name: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 100 }), t.Null()])),
  }),
  create_lobbyBody: t.Object({
    idle_timeout_seconds: t.Optional(
      t.Union([t.Integer({ format: 'int32', minimum: 5, maximum: 604800 }), t.Null()]),
    ),
    members: t.Optional(t.Union([t.Array(LobbyMemberRequestSchema, { maxItems: 25 }), t.Null()])),
    metadata: t.Optional(
      t.Union([
        t.Record(t.String(), t.String({ maxLength: 1024 }), { maxProperties: 25 }),
        t.Null(),
      ]),
    ),
    flags: t.Optional(t.Union([t.Null(), t.Literal(1)])),
    override_event_webhooks_url: t.Optional(
      t.Union([t.String({ format: 'uri', maxLength: 512 }), t.Null()]),
    ),
    name: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 100 }), t.Null()])),
  }),
  get_lobbyParams: t.Object({ lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  delete_lobbyParams: t.Object({ lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  edit_lobbyParams: t.Object({ lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  edit_lobbyBody: t.Object({
    idle_timeout_seconds: t.Optional(
      t.Union([t.Integer({ format: 'int32', minimum: 5, maximum: 604800 }), t.Null()]),
    ),
    metadata: t.Optional(
      t.Union([
        t.Record(t.String(), t.String({ maxLength: 1024 }), { maxProperties: 25 }),
        t.Null(),
      ]),
    ),
    members: t.Optional(t.Union([t.Array(LobbyMemberRequestSchema, { maxItems: 25 }), t.Null()])),
    flags: t.Optional(t.Union([t.Null(), t.Literal(1)])),
    override_event_webhooks_url: t.Optional(
      t.Union([t.String({ format: 'uri', maxLength: 512 }), t.Null()]),
    ),
    name: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 100 }), t.Null()])),
  }),
  edit_lobby_channel_linkParams: t.Object({ lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  edit_lobby_channel_linkBody: t.Object({
    channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  }),
  leave_lobbyParams: t.Object({ lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  create_linked_lobby_guild_invite_for_selfParams: t.Object({
    lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  bulk_update_lobby_membersParams: t.Object({
    lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  bulk_update_lobby_membersBody: t.Union([
    t.Array(BulkLobbyMemberRequestSchema, { minItems: 1, maxItems: 25 }),
    t.Null(),
  ]),
  bulk_update_lobby_membersResponse200: t.Union([t.Array(LobbyMemberResponseSchema), t.Null()]),
  add_lobby_memberParams: t.Object({
    lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  add_lobby_memberBody: t.Object({
    metadata: t.Optional(
      t.Union([
        t.Record(t.String(), t.String({ maxLength: 1024 }), { maxProperties: 25 }),
        t.Null(),
      ]),
    ),
    flags: t.Optional(t.Union([t.Null(), t.Literal(1)])),
    additional_name: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 80 }), t.Null()])),
  }),
  delete_lobby_memberParams: t.Object({
    lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  create_linked_lobby_guild_invite_for_userParams: t.Object({
    lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_lobby_messagesParams: t.Object({ lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_lobby_messagesQuery: t.Object({ limit: t.Optional(t.Integer({ minimum: 1, maximum: 200 })) }),
  get_lobby_messagesResponse200: t.Union([t.Array(LobbyMessageResponseSchema), t.Null()]),
  create_lobby_messageParams: t.Object({ lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  update_lobby_message_external_moderation_metadataParams: t.Object({
    lobby_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    message_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_lobby_message_external_moderation_metadataBody: t.Record(
    t.String(),
    t.String({ maxLength: 2000 }),
    { maxProperties: 5, description: 'The moderation metadata attached to the message' },
  ),
} as const

export type LobbiesModel = {
  [k in keyof typeof LobbiesModel]: UnwrapSchema<(typeof LobbiesModel)[k]>
}
