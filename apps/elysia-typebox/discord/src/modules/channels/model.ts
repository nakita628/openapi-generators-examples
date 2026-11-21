import { t, type UnwrapSchema } from 'elysia'
import {
  ApplicationIncomingWebhookResponseSchema,
  ChannelFollowerWebhookResponseSchema,
  ChannelPermissionOverwritesSchema,
  CreateForumThreadRequestSchema,
  CreateGroupDMInviteRequestSchema,
  CreateGuildInviteRequestSchema,
  CreateTextThreadWithoutMessageRequestSchema,
  FriendInviteResponseSchema,
  GroupDMInviteResponseSchema,
  GuildChannelResponseSchema,
  GuildIncomingWebhookResponseSchema,
  GuildInviteResponseSchema,
  MessageResponseSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  ReactionTypesSchema,
  SnowflakeTypeSchema,
  SortingOrderSchema,
  ThreadMemberResponseSchema,
  ThreadResponseSchema,
  ThreadSearchTagSettingSchema,
  ThreadSortingModeSchema,
  UpdateDMRequestPartialSchema,
  UpdateGroupDMRequestPartialSchema,
  UpdateGuildChannelRequestPartialSchema,
  UpdateThreadRequestPartialSchema,
  UserResponseSchema,
} from '../../components/schemas'

export const ChannelsModel = {
  get_channelParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  get_channelResponse200: t.Union([
    GuildChannelResponseSchema,
    PrivateChannelResponseSchema,
    PrivateGroupChannelResponseSchema,
    ThreadResponseSchema,
  ]),
  delete_channelParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  delete_channelResponse200: t.Union([
    GuildChannelResponseSchema,
    PrivateChannelResponseSchema,
    PrivateGroupChannelResponseSchema,
    ThreadResponseSchema,
  ]),
  update_channelParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  update_channelBody: t.Union([
    UpdateDMRequestPartialSchema,
    UpdateGroupDMRequestPartialSchema,
    UpdateGuildChannelRequestPartialSchema,
    UpdateThreadRequestPartialSchema,
  ]),
  update_channelResponse200: t.Union([
    GuildChannelResponseSchema,
    PrivateChannelResponseSchema,
    PrivateGroupChannelResponseSchema,
    ThreadResponseSchema,
  ]),
  follow_channelParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  follow_channelBody: t.Object({ webhook_channel_id: SnowflakeTypeSchema }),
  list_channel_invitesParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  list_channel_invitesResponse200: t.Union([
    t.Array(
      t.Union([
        FriendInviteResponseSchema,
        GroupDMInviteResponseSchema,
        GuildInviteResponseSchema,
        t.Null(),
      ]),
    ),
    t.Null(),
  ]),
  create_channel_inviteParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  create_channel_inviteBody: t.Union([
    CreateGroupDMInviteRequestSchema,
    CreateGuildInviteRequestSchema,
  ]),
  create_channel_inviteResponse200: t.Union([
    FriendInviteResponseSchema,
    GroupDMInviteResponseSchema,
    GuildInviteResponseSchema,
  ]),
  list_messagesParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  list_messagesQuery: t.Object({
    around: t.Optional(SnowflakeTypeSchema),
    before: t.Optional(SnowflakeTypeSchema),
    after: t.Optional(SnowflakeTypeSchema),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
  }),
  list_messagesResponse200: t.Union([t.Array(MessageResponseSchema), t.Null()]),
  create_messageParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  bulk_delete_messagesParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  bulk_delete_messagesBody: t.Object({
    messages: t.Array(SnowflakeTypeSchema, { minItems: 2, maxItems: 100, uniqueItems: true }),
  }),
  list_pinsParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  list_pinsQuery: t.Object({
    before: t.Optional(t.Date()),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 50 })),
  }),
  create_pinParams: t.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
  delete_pinParams: t.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
  get_messageParams: t.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
  delete_messageParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
  }),
  update_messageParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
  }),
  crosspost_messageParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
  }),
  delete_all_message_reactionsParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
  }),
  list_message_reactions_by_emojiParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
    emoji_name: t.String({ maxLength: 152133 }),
  }),
  list_message_reactions_by_emojiQuery: t.Object({
    after: t.Optional(SnowflakeTypeSchema),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    type: t.Optional(ReactionTypesSchema),
  }),
  list_message_reactions_by_emojiResponse200: t.Array(UserResponseSchema),
  delete_all_message_reactions_by_emojiParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
    emoji_name: t.String({ maxLength: 152133 }),
  }),
  add_my_message_reactionParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
    emoji_name: t.String({ maxLength: 152133 }),
  }),
  delete_my_message_reactionParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
    emoji_name: t.String({ maxLength: 152133 }),
  }),
  delete_user_message_reactionParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
    emoji_name: t.String({ maxLength: 152133 }),
    user_id: SnowflakeTypeSchema,
  }),
  create_thread_from_messageParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
  }),
  get_channel_member_permissionsParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    user_id: SnowflakeTypeSchema,
  }),
  get_channel_member_permissionsQuery: t.Object({ implicit: t.Optional(t.Boolean()) }),
  get_channel_role_permissionsParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    role_id: SnowflakeTypeSchema,
  }),
  get_channel_role_permissionsQuery: t.Object({ implicit: t.Optional(t.Boolean()) }),
  set_channel_permission_overwriteParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    overwrite_id: SnowflakeTypeSchema,
  }),
  set_channel_permission_overwriteBody: t.Object({
    type: t.Optional(t.Union([t.Null(), ChannelPermissionOverwritesSchema])),
    allow: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
    deny: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  }),
  delete_channel_permission_overwriteParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    overwrite_id: SnowflakeTypeSchema,
  }),
  deprecated_list_pinsParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  deprecated_list_pinsResponse200: t.Union([t.Array(MessageResponseSchema), t.Null()]),
  deprecated_create_pinParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
  }),
  deprecated_delete_pinParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
  }),
  get_answer_votersParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    message_id: SnowflakeTypeSchema,
    answer_id: t.Integer({ format: 'int32', minimum: 1, maximum: 10 }),
  }),
  get_answer_votersQuery: t.Object({
    after: t.Optional(SnowflakeTypeSchema),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
  }),
  poll_expireParams: t.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
  add_group_dm_userParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    user_id: SnowflakeTypeSchema,
  }),
  add_group_dm_userBody: t.Object({
    access_token: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
    nick: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  }),
  add_group_dm_userResponse201: t.Union([
    PrivateChannelResponseSchema,
    PrivateGroupChannelResponseSchema,
  ]),
  delete_group_dm_userParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    user_id: SnowflakeTypeSchema,
  }),
  send_soundboard_soundParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  list_thread_membersParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  list_thread_membersQuery: t.Object({
    with_member: t.Optional(t.Boolean()),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    after: t.Optional(SnowflakeTypeSchema),
  }),
  list_thread_membersResponse200: t.Array(ThreadMemberResponseSchema),
  join_threadParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  leave_threadParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  get_thread_memberParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    user_id: SnowflakeTypeSchema,
  }),
  get_thread_memberQuery: t.Object({ with_member: t.Optional(t.Boolean()) }),
  add_thread_memberParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    user_id: SnowflakeTypeSchema,
  }),
  delete_thread_memberParams: t.Object({
    channel_id: SnowflakeTypeSchema,
    user_id: SnowflakeTypeSchema,
  }),
  create_threadParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  create_threadBody: t.Union([
    CreateForumThreadRequestSchema,
    CreateTextThreadWithoutMessageRequestSchema,
  ]),
  list_private_archived_threadsParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  list_private_archived_threadsQuery: t.Object({
    before: t.Optional(t.Date()),
    limit: t.Optional(t.Integer({ minimum: 2, maximum: 100 })),
  }),
  list_public_archived_threadsParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  list_public_archived_threadsQuery: t.Object({
    before: t.Optional(t.Date()),
    limit: t.Optional(t.Integer({ minimum: 2, maximum: 100 })),
  }),
  thread_searchParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  thread_searchQuery: t.Object({
    name: t.Optional(t.String({ maxLength: 100 })),
    slop: t.Optional(t.Integer({ minimum: 0, maximum: 100 })),
    min_id: t.Optional(SnowflakeTypeSchema),
    max_id: t.Optional(SnowflakeTypeSchema),
    tag: t.Optional(
      t.Union([t.String(), t.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true })]),
    ),
    tag_setting: t.Optional(ThreadSearchTagSettingSchema),
    archived: t.Optional(t.Boolean()),
    sort_by: t.Optional(ThreadSortingModeSchema),
    sort_order: t.Optional(SortingOrderSchema),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 25 })),
    offset: t.Optional(t.Integer({ minimum: 0, maximum: 9975 })),
  }),
  trigger_typing_indicatorParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  list_my_private_archived_threadsParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  list_my_private_archived_threadsQuery: t.Object({
    before: t.Optional(SnowflakeTypeSchema),
    limit: t.Optional(t.Integer({ minimum: 2, maximum: 100 })),
  }),
  update_voice_channel_statusParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  update_voice_channel_statusBody: t.Object({
    status: t.Optional(
      t.Union([
        t.String({ maxLength: 500, description: 'The new voice channel status' }),
        t.Null(),
      ]),
    ),
  }),
  list_channel_webhooksParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  list_channel_webhooksResponse200: t.Union([
    t.Array(
      t.Union([
        ApplicationIncomingWebhookResponseSchema,
        ChannelFollowerWebhookResponseSchema,
        GuildIncomingWebhookResponseSchema,
      ]),
    ),
    t.Null(),
  ]),
  create_webhookParams: t.Object({ channel_id: SnowflakeTypeSchema }),
  create_webhookBody: t.Object({
    name: t.String({ minLength: 1, maxLength: 80 }),
    avatar: t.Optional(t.Union([t.String(), t.Null()])),
  }),
} as const

export type ChannelsModel = {
  [k in keyof typeof ChannelsModel]: UnwrapSchema<(typeof ChannelsModel)[k]>
}
