import { t, type UnwrapSchema } from 'elysia'
import {
  FriendInviteResponseSchema,
  GroupDMInviteResponseSchema,
  GuildInviteResponseSchema,
  SnowflakeTypeSchema,
} from '../../components/schemas'

export const InvitesModel = {
  invite_resolveParams: t.Object({ code: t.String({ maxLength: 152133 }) }),
  invite_resolveQuery: t.Object({
    with_counts: t.Optional(t.Boolean()),
    guild_scheduled_event_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    target_channel_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    target_message_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  invite_resolveResponse200: t.Union([
    FriendInviteResponseSchema,
    GroupDMInviteResponseSchema,
    GuildInviteResponseSchema,
  ]),
  invite_revokeParams: t.Object({ code: t.String({ maxLength: 152133 }) }),
  invite_revokeResponse200: t.Union([
    FriendInviteResponseSchema,
    GroupDMInviteResponseSchema,
    GuildInviteResponseSchema,
  ]),
  get_invite_target_usersParams: t.Object({ code: t.String({ maxLength: 152133 }) }),
  update_invite_target_usersParams: t.Object({ code: t.String({ maxLength: 152133 }) }),
  update_invite_target_usersBody: t.Form({ target_users_file: t.String() }),
  bulk_add_invite_target_usersParams: t.Object({ code: t.String({ maxLength: 152133 }) }),
  bulk_add_invite_target_usersBody: t.Object({
    user_ids: t.Array(SnowflakeTypeSchema, {
      minItems: 1,
      maxItems: 1000,
      description: 'The IDs of the users to target.',
    }),
  }),
  bulk_remove_invite_target_usersParams: t.Object({ code: t.String({ maxLength: 152133 }) }),
  bulk_remove_invite_target_usersBody: t.Object({
    user_ids: t.Array(SnowflakeTypeSchema, {
      minItems: 1,
      maxItems: 1000,
      description: 'The IDs of the users to stop targeting.',
    }),
  }),
  get_invite_target_users_job_statusParams: t.Object({ code: t.String({ maxLength: 152133 }) }),
  add_invite_target_userParams: t.Object({
    code: t.String({ maxLength: 152133 }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  remove_invite_target_userParams: t.Object({
    code: t.String({ maxLength: 152133 }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
} as const

export type InvitesModel = {
  [k in keyof typeof InvitesModel]: UnwrapSchema<(typeof InvitesModel)[k]>
}
