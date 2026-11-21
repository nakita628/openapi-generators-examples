import { t } from 'elysia'

export const AccountResponseSchema = t.Object({
  id: t.String(),
  name: t.Union([t.String(), t.Null()]),
})

export const MessageComponentTypesSchema = t.Union([
  t.Literal(1, { title: 'ACTION_ROW', description: 'Container for other components' }),
  t.Literal(2, { title: 'BUTTON', description: 'Button object' }),
  t.Literal(3, {
    title: 'STRING_SELECT',
    description: 'Select menu for picking from defined text options',
  }),
  t.Literal(4, { title: 'TEXT_INPUT', description: 'Text input object' }),
  t.Literal(5, { title: 'USER_SELECT', description: 'Select menu for users' }),
  t.Literal(6, { title: 'ROLE_SELECT', description: 'Select menu for roles' }),
  t.Literal(7, {
    title: 'MENTIONABLE_SELECT',
    description: 'Select menu for mentionables (users and roles)',
  }),
  t.Literal(8, { title: 'CHANNEL_SELECT', description: 'Select menu for channels' }),
  t.Literal(9, { title: 'SECTION', description: 'Section component' }),
  t.Literal(10, { title: 'TEXT_DISPLAY', description: 'Text component' }),
  t.Literal(11, { title: 'THUMBNAIL', description: 'Thumbnail component' }),
  t.Literal(12, { title: 'MEDIA_GALLERY', description: 'Media gallery component' }),
  t.Literal(13, { title: 'FILE', description: 'File component' }),
  t.Literal(14, { title: 'SEPARATOR', description: 'Separator component' }),
  t.Literal(17, { title: 'CONTAINER', description: 'Container component' }),
  t.Literal(18, { title: 'LABEL', description: 'Label component' }),
  t.Literal(19, { title: 'FILE_UPLOAD', description: 'File upload component' }),
  t.Literal(21, { title: 'RADIO_GROUP', description: 'Radio group component' }),
  t.Literal(22, { title: 'CHECKBOX_GROUP', description: 'Checkbox group component' }),
  t.Literal(23, { title: 'CHECKBOX', description: 'Checkbox component' }),
])

export const ButtonStyleTypesSchema = t.Union([
  t.Literal(1, { title: 'PRIMARY' }),
  t.Literal(2, { title: 'SECONDARY' }),
  t.Literal(3, { title: 'SUCCESS' }),
  t.Literal(4, { title: 'DANGER' }),
  t.Literal(5, { title: 'LINK' }),
  t.Literal(6, { title: 'PREMIUM' }),
])

export const SnowflakeTypeSchema = t.String({ pattern: '^(0|[1-9][0-9]*)$' })

export const ComponentEmojiForRequestSchema = t.Object({
  id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  name: t.String({ maxLength: 32 }),
})

export const ButtonComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 100 }), t.Null()])),
  style: ButtonStyleTypesSchema,
  label: t.Optional(t.Union([t.String({ maxLength: 80 }), t.Null()])),
  disabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 512 }), t.Null()])),
  sku_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  emoji: t.Optional(t.Union([t.Null(), ComponentEmojiForRequestSchema])),
})

export const SnowflakeSelectDefaultValueTypesSchema = t.Union([
  t.Literal('user', { title: 'USER' }),
  t.Literal('role', { title: 'ROLE' }),
  t.Literal('channel', { title: 'CHANNEL' }),
])

export const ChannelSelectDefaultValueSchema = t.Object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export const ChannelTypesSchema = t.Union([
  t.Literal(1, { title: 'DM', description: 'A direct message between users' }),
  t.Literal(3, { title: 'GROUP_DM', description: 'A direct message between multiple users' }),
  t.Literal(0, { title: 'GUILD_TEXT', description: 'A text channel within a server' }),
  t.Literal(2, { title: 'GUILD_VOICE', description: 'A voice channel within a server' }),
  t.Literal(4, {
    title: 'GUILD_CATEGORY',
    description: 'An organizational category that contains up to 50 channels',
  }),
  t.Literal(5, {
    title: 'GUILD_ANNOUNCEMENT',
    description:
      'A channel that users can follow and crosspost into their own server (formerly news channels)',
  }),
  t.Literal(10, {
    title: 'ANNOUNCEMENT_THREAD',
    description: 'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
  }),
  t.Literal(11, {
    title: 'PUBLIC_THREAD',
    description:
      'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
  }),
  t.Literal(12, {
    title: 'PRIVATE_THREAD',
    description:
      'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
  }),
  t.Literal(13, {
    title: 'GUILD_STAGE_VOICE',
    description: 'A voice channel for hosting events with an audience',
  }),
  t.Literal(14, {
    title: 'GUILD_DIRECTORY',
    description: 'The channel in a hub containing the listed servers',
  }),
  t.Literal(15, { title: 'GUILD_FORUM', description: 'Channel that can only contain threads' }),
])

export const ChannelSelectComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 150 }), t.Null()])),
  min_values: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 25 }), t.Null()])),
  max_values: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 25 }), t.Null()])),
  disabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  default_values: t.Optional(
    t.Union([t.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }), t.Null()]),
  ),
  channel_types: t.Optional(
    t.Union([t.Array(ChannelTypesSchema, { uniqueItems: true }), t.Null()]),
  ),
})

export const RoleSelectDefaultValueSchema = t.Object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export const UserSelectDefaultValueSchema = t.Object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export const MentionableSelectComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 150 }), t.Null()])),
  min_values: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 25 }), t.Null()])),
  max_values: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 25 }), t.Null()])),
  disabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  default_values: t.Optional(
    t.Union([
      t.Array(t.Union([RoleSelectDefaultValueSchema, UserSelectDefaultValueSchema]), {
        maxItems: 25,
      }),
      t.Null(),
    ]),
  ),
})

export const RoleSelectComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 150 }), t.Null()])),
  min_values: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 25 }), t.Null()])),
  max_values: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 25 }), t.Null()])),
  disabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  default_values: t.Optional(
    t.Union([t.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }), t.Null()]),
  ),
})

export const StringSelectOptionForRequestSchema = t.Object({
  label: t.String({ minLength: 1, maxLength: 100 }),
  value: t.String({ minLength: 1, maxLength: 100 }),
  description: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  default: t.Optional(t.Union([t.Boolean(), t.Null()])),
  emoji: t.Optional(t.Union([t.Null(), ComponentEmojiForRequestSchema])),
})

export const StringSelectComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 150 }), t.Null()])),
  min_values: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 25 }), t.Null()])),
  max_values: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 25 }), t.Null()])),
  disabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  options: t.Array(StringSelectOptionForRequestSchema, { minItems: 1, maxItems: 25 }),
})

export const UserSelectComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 150 }), t.Null()])),
  min_values: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 25 }), t.Null()])),
  max_values: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 25 }), t.Null()])),
  disabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  default_values: t.Optional(
    t.Union([t.Array(UserSelectDefaultValueSchema, { maxItems: 25 }), t.Null()]),
  ),
})

export const ActionRowComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  components: t.Array(
    t.Union([
      ButtonComponentForMessageRequestSchema,
      ChannelSelectComponentForMessageRequestSchema,
      MentionableSelectComponentForMessageRequestSchema,
      RoleSelectComponentForMessageRequestSchema,
      StringSelectComponentForMessageRequestSchema,
      UserSelectComponentForMessageRequestSchema,
    ]),
    { minItems: 1, maxItems: 5 },
  ),
})

export const TextInputStyleTypesSchema = t.Union([
  t.Literal(1, { title: 'SHORT', description: 'Single-line input' }),
  t.Literal(2, { title: 'PARAGRAPH', description: 'Multi-line input' }),
])

export const TextInputComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  style: TextInputStyleTypesSchema,
  label: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 45 }), t.Null()])),
  value: t.Optional(t.Union([t.String({ maxLength: 4000 }), t.Null()])),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  min_length: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 4000 }), t.Null()])),
  max_length: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 4000 }), t.Null()])),
})

export const ActionRowComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  components: t.Array(TextInputComponentForModalRequestSchema, { minItems: 1, maxItems: 5 }),
})

export const ComponentEmojiResponseSchema = t.Object({
  id: t.Optional(SnowflakeTypeSchema),
  name: t.String(),
  animated: t.Optional(t.Boolean()),
})

export const ButtonComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  custom_id: t.Optional(t.String()),
  style: ButtonStyleTypesSchema,
  label: t.Optional(t.String()),
  disabled: t.Optional(t.Boolean()),
  emoji: t.Optional(ComponentEmojiResponseSchema),
  url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  sku_id: t.Optional(SnowflakeTypeSchema),
})

export const ChannelSelectDefaultValueResponseSchema = t.Object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export const ChannelSelectComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  custom_id: t.String(),
  placeholder: t.Optional(t.String()),
  min_values: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  max_values: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  disabled: t.Optional(t.Boolean()),
  channel_types: t.Optional(t.Array(ChannelTypesSchema, { uniqueItems: true })),
  default_values: t.Optional(t.Array(ChannelSelectDefaultValueResponseSchema)),
})

export const RoleSelectDefaultValueResponseSchema = t.Object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export const UserSelectDefaultValueResponseSchema = t.Object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export const MentionableSelectComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  custom_id: t.String(),
  placeholder: t.Optional(t.String()),
  min_values: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  max_values: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  disabled: t.Optional(t.Boolean()),
  default_values: t.Optional(
    t.Array(t.Union([RoleSelectDefaultValueResponseSchema, UserSelectDefaultValueResponseSchema])),
  ),
})

export const RoleSelectComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  custom_id: t.String(),
  placeholder: t.Optional(t.String()),
  min_values: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  max_values: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  disabled: t.Optional(t.Boolean()),
  default_values: t.Optional(t.Array(RoleSelectDefaultValueResponseSchema)),
})

export const StringSelectOptionResponseSchema = t.Object({
  label: t.String(),
  value: t.String(),
  description: t.Optional(t.String()),
  emoji: t.Optional(ComponentEmojiResponseSchema),
  default: t.Optional(t.Boolean()),
})

export const StringSelectComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  custom_id: t.String(),
  placeholder: t.Optional(t.String()),
  min_values: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  max_values: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  disabled: t.Optional(t.Boolean()),
  options: t.Array(StringSelectOptionResponseSchema),
})

export const TextInputComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  custom_id: t.String(),
  style: TextInputStyleTypesSchema,
  label: t.Union([t.String(), t.Null()]),
  value: t.Optional(t.String()),
  placeholder: t.Optional(t.String()),
  required: t.Optional(t.Boolean()),
  min_length: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
  max_length: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
})

export const UserSelectComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  custom_id: t.String(),
  placeholder: t.Optional(t.String()),
  min_values: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  max_values: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  disabled: t.Optional(t.Boolean()),
  default_values: t.Optional(t.Array(UserSelectDefaultValueResponseSchema)),
})

export const ActionRowComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  components: t.Array(
    t.Union([
      ButtonComponentResponseSchema,
      ChannelSelectComponentResponseSchema,
      MentionableSelectComponentResponseSchema,
      RoleSelectComponentResponseSchema,
      StringSelectComponentResponseSchema,
      TextInputComponentResponseSchema,
      UserSelectComponentResponseSchema,
    ]),
  ),
})

export const ActionTypesSchema = t.Union([
  t.Literal('TYPING_START', {
    title: 'TYPING_START',
    description: 'User started typing in a channel',
  }),
  t.Literal('INVITE_CREATE', {
    title: 'INVITE_CREATE',
    description: 'Invite to a channel was created',
  }),
  t.Literal('INVITE_DELETE', {
    title: 'INVITE_DELETE',
    description: 'Invite to a channel was deleted',
  }),
  t.Literal('WEBHOOKS_UPDATE', {
    title: 'WEBHOOKS_UPDATE',
    description: 'Guild channel webhook was created, updated, or deleted',
  }),
  t.Literal('CHANNEL_CREATE', {
    title: 'CHANNEL_CREATE',
    description: 'New guild channel created',
  }),
  t.Literal('VOICE_CHANNEL_STATUS_UPDATE', {
    title: 'VOICE_CHANNEL_STATUS_UPDATE',
    description: 'Voice channel status was updated',
  }),
  t.Literal('CHANNEL_UPDATE', { title: 'CHANNEL_UPDATE', description: 'Channel was updated' }),
  t.Literal('CHANNEL_DELETE', { title: 'CHANNEL_DELETE', description: 'Channel was deleted' }),
  t.Literal('CHANNEL_PINS_UPDATE', {
    title: 'CHANNEL_PINS_UPDATE',
    description: 'Message was pinned or unpinned',
  }),
  t.Literal('THREAD_CREATE', {
    title: 'THREAD_CREATE',
    description: 'Thread created, also sent when being added to a private thread',
  }),
  t.Literal('THREAD_UPDATE', { title: 'THREAD_UPDATE', description: 'Thread was updated' }),
  t.Literal('THREAD_DELETE', { title: 'THREAD_DELETE', description: 'Thread was deleted' }),
  t.Literal('THREAD_LIST_SYNC', {
    title: 'THREAD_LIST_SYNC',
    description:
      'Sent when gaining access to a channel, contains all active threads in that channel',
  }),
  t.Literal('THREAD_MEMBER_UPDATE', {
    title: 'THREAD_MEMBER_UPDATE',
    description: 'Thread member for the current user was updated',
  }),
  t.Literal('THREAD_MEMBERS_UPDATE', {
    title: 'THREAD_MEMBERS_UPDATE',
    description: 'Some user(s) were added to or removed from a thread',
  }),
  t.Literal('GUILD_CREATE', {
    title: 'GUILD_CREATE',
    description:
      'Lazy-load for unavailable guild, guild became available, or user joined a new guild',
  }),
  t.Literal('GUILD_UPDATE', { title: 'GUILD_UPDATE', description: 'Guild was updated' }),
  t.Literal('GUILD_DELETE', {
    title: 'GUILD_DELETE',
    description: 'Guild became unavailable, or user left/was removed from a guild',
  }),
  t.Literal('GUILD_EMOJIS_UPDATE', {
    title: 'GUILD_EMOJIS_UPDATE',
    description: 'Guild emojis were updated',
  }),
  t.Literal('GUILD_STICKERS_UPDATE', {
    title: 'GUILD_STICKERS_UPDATE',
    description: 'Guild stickers were updated',
  }),
  t.Literal('GUILD_INTEGRATIONS_UPDATE', {
    title: 'GUILD_INTEGRATIONS_UPDATE',
    description: 'Guild integration was updated',
  }),
  t.Literal('GUILD_MEMBER_ADD', {
    title: 'GUILD_MEMBER_ADD',
    description: 'New user joined a guild',
  }),
  t.Literal('GUILD_MEMBER_UPDATE', {
    title: 'GUILD_MEMBER_UPDATE',
    description: 'Guild member was updated',
  }),
  t.Literal('GUILD_MEMBER_REMOVE', {
    title: 'GUILD_MEMBER_REMOVE',
    description: 'User was removed from a guild',
  }),
  t.Literal('GUILD_BAN_ADD', {
    title: 'GUILD_BAN_ADD',
    description: 'User was banned from a guild',
  }),
  t.Literal('GUILD_BAN_REMOVE', {
    title: 'GUILD_BAN_REMOVE',
    description: 'User was unbanned from a guild',
  }),
  t.Literal('GUILD_ROLE_CREATE', {
    title: 'GUILD_ROLE_CREATE',
    description: 'Guild role was created',
  }),
  t.Literal('GUILD_ROLE_UPDATE', {
    title: 'GUILD_ROLE_UPDATE',
    description: 'Guild role was updated',
  }),
  t.Literal('GUILD_ROLE_DELETE', {
    title: 'GUILD_ROLE_DELETE',
    description: 'Guild role was deleted',
  }),
  t.Literal('GUILD_MEMBERS_CHUNK', {
    title: 'GUILD_MEMBERS_CHUNK',
    description: 'Response to Request Guild Members',
  }),
  t.Literal('MESSAGE_CREATE', { title: 'MESSAGE_CREATE', description: 'Message was created' }),
  t.Literal('MESSAGE_UPDATE', { title: 'MESSAGE_UPDATE', description: 'Message was edited' }),
  t.Literal('MESSAGE_DELETE', { title: 'MESSAGE_DELETE', description: 'Message was deleted' }),
  t.Literal('MESSAGE_DELETE_BULK', {
    title: 'MESSAGE_DELETE_BULK',
    description: 'Multiple messages were deleted at once',
  }),
  t.Literal('MESSAGE_REACTION_ADD', {
    title: 'MESSAGE_REACTION_ADD',
    description: 'User reacted to a message',
  }),
  t.Literal('MESSAGE_REACTION_REMOVE', {
    title: 'MESSAGE_REACTION_REMOVE',
    description: 'User removed a reaction from a message',
  }),
  t.Literal('MESSAGE_REACTION_REMOVE_ALL', {
    title: 'MESSAGE_REACTION_REMOVE_ALL',
    description: 'All reactions were explicitly removed from a message',
  }),
  t.Literal('MESSAGE_REACTION_REMOVE_EMOJI', {
    title: 'MESSAGE_REACTION_REMOVE_EMOJI',
    description: 'All reactions for a given emoji were explicitly removed from a message',
  }),
  t.Literal('USER_UPDATE', {
    title: 'USER_UPDATE',
    description: 'Properties about the user changed',
  }),
  t.Literal('ENTITLEMENT_CREATE', {
    title: 'ENTITLEMENT_CREATE',
    description: 'Entitlement was created',
  }),
  t.Literal('ENTITLEMENT_UPDATE', {
    title: 'ENTITLEMENT_UPDATE',
    description: 'Entitlement was updated',
  }),
  t.Literal('ENTITLEMENT_DELETE', {
    title: 'ENTITLEMENT_DELETE',
    description: 'Entitlement was deleted',
  }),
  t.Literal('READY', { title: 'READY', description: 'Contains the initial state information' }),
  t.Literal('RESUMED', { title: 'RESUMED', description: 'Response to Resume' }),
  t.Literal('PRESENCE_UPDATE', { title: 'PRESENCE_UPDATE', description: 'User was updated' }),
  t.Literal('VOICE_STATE_UPDATE', {
    title: 'VOICE_STATE_UPDATE',
    description: 'Someone joined, left, or moved a voice channel',
  }),
  t.Literal('VOICE_SERVER_UPDATE', {
    title: 'VOICE_SERVER_UPDATE',
    description: "Guild's voice server was updated",
  }),
  t.Literal('LOBBY_MESSAGE_CREATE', {
    title: 'LOBBY_MESSAGE_CREATE',
    description: 'Sent when a message is created in a lobby',
  }),
  t.Literal('LOBBY_MESSAGE_UPDATE', {
    title: 'LOBBY_MESSAGE_UPDATE',
    description: 'Sent when a message is updated in a lobby',
  }),
  t.Literal('LOBBY_MESSAGE_DELETE', {
    title: 'LOBBY_MESSAGE_DELETE',
    description: 'Sent when a message is deleted from a lobby',
  }),
  t.Literal('GAME_DIRECT_MESSAGE_CREATE', {
    title: 'GAME_DIRECT_MESSAGE_CREATE',
    description: 'Sent when a direct message is created during an active Social SDK session',
  }),
  t.Literal('GAME_DIRECT_MESSAGE_DELETE', {
    title: 'GAME_DIRECT_MESSAGE_DELETE',
    description: 'Sent when a direct message is deleted during an active Social SDK session',
  }),
  t.Literal('GAME_DIRECT_MESSAGE_UPDATE', {
    title: 'GAME_DIRECT_MESSAGE_UPDATE',
    description: 'Sent when a direct message is updated during an active Social SDK session',
  }),
  t.Literal('INTERACTION_CREATE', {
    title: 'INTERACTION_CREATE',
    description: 'User used an interaction, such as an Application Command',
  }),
  t.Literal('INTEGRATION_CREATE', {
    title: 'INTEGRATION_CREATE',
    description: 'Guild integration was created',
  }),
  t.Literal('INTEGRATION_UPDATE', {
    title: 'INTEGRATION_UPDATE',
    description: 'Guild integration was updated',
  }),
  t.Literal('INTEGRATION_DELETE', {
    title: 'INTEGRATION_DELETE',
    description: 'Guild integration was deleted',
  }),
  t.Literal('APPLICATION_COMMAND_PERMISSIONS_UPDATE', {
    title: 'APPLICATION_COMMAND_PERMISSIONS_UPDATE',
    description: 'Application command permission was updated',
  }),
  t.Literal('APPLICATION_AUTHORIZED', {
    title: 'APPLICATION_AUTHORIZED',
    description: 'Sent when an app was authorized by a user to a server or their account',
  }),
  t.Literal('APPLICATION_DEAUTHORIZED', {
    title: 'APPLICATION_DEAUTHORIZED',
    description: 'Sent when an app was deauthorized by a user',
  }),
  t.Literal('STAGE_INSTANCE_CREATE', {
    title: 'STAGE_INSTANCE_CREATE',
    description: 'Stage instance was created',
  }),
  t.Literal('STAGE_INSTANCE_UPDATE', {
    title: 'STAGE_INSTANCE_UPDATE',
    description: 'Stage instance was updated',
  }),
  t.Literal('STAGE_INSTANCE_DELETE', {
    title: 'STAGE_INSTANCE_DELETE',
    description: 'Stage instance was deleted or closed',
  }),
  t.Literal('GUILD_AUDIT_LOG_ENTRY_CREATE', {
    title: 'GUILD_AUDIT_LOG_ENTRY_CREATE',
    description: 'A guild audit log entry was created',
  }),
  t.Literal('GUILD_SCHEDULED_EVENT_CREATE', {
    title: 'GUILD_SCHEDULED_EVENT_CREATE',
    description: 'Guild scheduled event was created',
  }),
  t.Literal('GUILD_SCHEDULED_EVENT_UPDATE', {
    title: 'GUILD_SCHEDULED_EVENT_UPDATE',
    description: 'Guild scheduled event was updated',
  }),
  t.Literal('GUILD_SCHEDULED_EVENT_DELETE', {
    title: 'GUILD_SCHEDULED_EVENT_DELETE',
    description: 'Guild scheduled event was deleted',
  }),
  t.Literal('GUILD_SCHEDULED_EVENT_USER_ADD', {
    title: 'GUILD_SCHEDULED_EVENT_USER_ADD',
    description: 'User subscribed to a guild scheduled event',
  }),
  t.Literal('GUILD_SCHEDULED_EVENT_USER_REMOVE', {
    title: 'GUILD_SCHEDULED_EVENT_USER_REMOVE',
    description: 'User unsubscribed from a guild scheduled event',
  }),
  t.Literal('AUTO_MODERATION_RULE_CREATE', {
    title: 'AUTO_MODERATION_RULE_CREATE',
    description: 'Auto Moderation rule was created',
  }),
  t.Literal('AUTO_MODERATION_RULE_UPDATE', {
    title: 'AUTO_MODERATION_RULE_UPDATE',
    description: 'Auto Moderation rule was updated',
  }),
  t.Literal('AUTO_MODERATION_RULE_DELETE', {
    title: 'AUTO_MODERATION_RULE_DELETE',
    description: 'Auto Moderation rule was deleted',
  }),
  t.Literal('AUTO_MODERATION_ACTION_EXECUTION', {
    title: 'AUTO_MODERATION_ACTION_EXECUTION',
    description:
      'Auto Moderation rule was triggered and an action was executed (.e.g. a message was blocked)',
  }),
  t.Literal('GUILD_SOUNDBOARD_SOUNDS_UPDATE', { title: 'GUILD_SOUNDBOARD_SOUNDS_UPDATE' }),
  t.Literal('GUILD_SOUNDBOARD_SOUND_CREATE', { title: 'GUILD_SOUNDBOARD_SOUND_CREATE' }),
  t.Literal('GUILD_SOUNDBOARD_SOUND_UPDATE', { title: 'GUILD_SOUNDBOARD_SOUND_UPDATE' }),
  t.Literal('GUILD_SOUNDBOARD_SOUND_DELETE', { title: 'GUILD_SOUNDBOARD_SOUND_DELETE' }),
  t.Literal('QUEST_USER_ENROLLMENT', {
    title: 'QUEST_USER_ENROLLMENT',
    description: 'User was added to a Quest (currently unavailable)',
  }),
  t.Literal('RATE_LIMITED', { title: 'RATE_LIMITED' }),
])

export const ApplicationTypesSchema = t.Literal(4, { title: 'GUILD_ROLE_SUBSCRIPTIONS' })

export const Int53TypeSchema = t.Integer({
  format: 'int64',
  minimum: -9007199254740991,
  maximum: 9007199254740991,
})

export const UserAvatarDecorationResponseSchema = t.Object({
  asset: t.String({ description: 'the avatar decoration hash' }),
  sku_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description: "id of the avatar decoration's SKU",
  }),
})

export const NameplatePaletteSchema = t.Union([
  t.Literal('crimson', { title: 'CRIMSON', description: 'Crimson color palette' }),
  t.Literal('berry', { title: 'BERRY', description: 'Berry color palette' }),
  t.Literal('sky', { title: 'SKY', description: 'Sky color palette' }),
  t.Literal('teal', { title: 'TEAL', description: 'Teal color palette' }),
  t.Literal('forest', { title: 'FOREST', description: 'Forest color palette' }),
  t.Literal('bubble_gum', { title: 'BUBBLE_GUM', description: 'Bubble gum color palette' }),
  t.Literal('violet', { title: 'VIOLET', description: 'Violet color palette' }),
  t.Literal('cobalt', { title: 'COBALT', description: 'Cobalt color palette' }),
  t.Literal('clover', { title: 'CLOVER', description: 'Clover color palette' }),
  t.Literal('lemon', { title: 'LEMON', description: 'Lemon color palette' }),
  t.Literal('white', { title: 'WHITE', description: 'White color palette' }),
  t.Literal('black', { title: 'BLACK', description: 'Black color palette' }),
])

export const UserNameplateResponseSchema = t.Object({
  sku_id: t.Union([t.Null(), SnowflakeTypeSchema], { description: 'ID of the nameplate SKU' }),
  asset: t.String({ description: 'Path to the nameplate asset' }),
  label: t.String({ description: 'The label of this nameplate. Currently unused' }),
  palette: NameplatePaletteSchema,
})

export const UserCollectiblesResponseSchema = t.Object({
  nameplate: t.Union([t.Null(), UserNameplateResponseSchema], {
    description: 'Object mapping of nameplate data',
  }),
})

export const UserPrimaryGuildResponseSchema = t.Object({
  identity_guild_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description: "the id of the user's primary guild",
  }),
  identity_enabled: t.Union([
    t.Boolean({ description: "whether the user is displaying the primary guild's server tag" }),
    t.Null(),
  ]),
  tag: t.Union([
    t.String({ description: "the text of the user's server tag, limited to 4 characters" }),
    t.Null(),
  ]),
  badge: t.Union([t.String({ description: 'the server tag badge hash' }), t.Null()]),
})

export const UserResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  username: t.String({ description: "the user's username, not unique across the platform" }),
  avatar: t.Union([t.String({ description: "the user's avatar hash" }), t.Null()]),
  discriminator: t.String({ description: "the user's Discord-tag" }),
  public_flags: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    description: "the public flags on a user's account",
  }),
  flags: Int53TypeSchema,
  bot: t.Optional(t.Boolean({ description: 'whether the user belongs to an OAuth2 application' })),
  system: t.Optional(
    t.Boolean({
      description:
        'whether the user is an Official Discord System user (part of the urgent message system)',
    }),
  ),
  banner: t.Optional(t.Union([t.String({ description: "the user's banner hash" }), t.Null()])),
  accent_color: t.Optional(
    t.Union([
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
        description:
          "the user's banner color encoded as an integer representation of hexadecimal color code",
      }),
      t.Null(),
    ]),
  ),
  global_name: t.Union([
    t.String({ description: "the user's display name, if it is set" }),
    t.Null(),
  ]),
  avatar_decoration_data: t.Optional(
    t.Union([t.Null(), UserAvatarDecorationResponseSchema], {
      description: "data for the user's avatar decoration",
    }),
  ),
  collectibles: t.Optional(
    t.Union([t.Null(), UserCollectiblesResponseSchema], {
      description: "data for the user's collectibles",
    }),
  ),
  primary_guild: t.Union([t.Null(), UserPrimaryGuildResponseSchema], {
    description: "the user's primary guild",
  }),
})

export const OAuth2ScopesSchema = t.Union([
  t.Literal('identify', { title: 'IDENTIFY', description: 'allows /users/@me without email' }),
  t.Literal('email', { title: 'EMAIL', description: 'enables /users/@me to return an email' }),
  t.Literal('connections', {
    title: 'CONNECTIONS',
    description: 'allows /users/@me/connections to return linked third-party accounts',
  }),
  t.Literal('guilds', {
    title: 'GUILDS',
    description:
      "allows /users/@me/guilds to return basic information about all of a user's guilds",
  }),
  t.Literal('guilds.join', {
    title: 'GUILDS_JOIN',
    description:
      'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
  }),
  t.Literal('guilds.members.read', {
    title: 'GUILDS_MEMBERS_READ',
    description:
      "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
  }),
  t.Literal('gdm.join', {
    title: 'GDM_JOIN',
    description: 'allows your app to join users to a group dm',
  }),
  t.Literal('bot', {
    title: 'BOT',
    description: "for oauth2 bots, this puts the bot in the user's selected guild by default",
  }),
  t.Literal('rpc', {
    title: 'RPC',
    description:
      "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
  }),
  t.Literal('rpc.notifications.read', {
    title: 'RPC_NOTIFICATIONS_READ',
    description:
      'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
  }),
  t.Literal('rpc.voice.read', {
    title: 'RPC_VOICE_READ',
    description:
      "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
  }),
  t.Literal('rpc.voice.write', {
    title: 'RPC_VOICE_WRITE',
    description:
      "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
  }),
  t.Literal('rpc.video.read', {
    title: 'RPC_VIDEO_READ',
    description:
      "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
  }),
  t.Literal('rpc.video.write', {
    title: 'RPC_VIDEO_WRITE',
    description:
      "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
  }),
  t.Literal('rpc.screenshare.read', {
    title: 'RPC_SCREENSHARE_READ',
    description:
      "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
  }),
  t.Literal('rpc.screenshare.write', {
    title: 'RPC_SCREENSHARE_WRITE',
    description:
      "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
  }),
  t.Literal('rpc.activities.write', {
    title: 'RPC_ACTIVITIES_WRITE',
    description:
      "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
  }),
  t.Literal('webhook.incoming', {
    title: 'WEBHOOK_INCOMING',
    description:
      'this generates a webhook that is returned in the oauth token response for authorization code grants',
  }),
  t.Literal('messages.read', {
    title: 'MESSAGES_READ',
    description:
      'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
  }),
  t.Literal('applications.builds.upload', {
    title: 'APPLICATIONS_BUILDS_UPLOAD',
    description:
      "allows your app to upload/update builds for a user's applications - requires Discord approval",
  }),
  t.Literal('applications.builds.read', {
    title: 'APPLICATIONS_BUILDS_READ',
    description: "allows your app to read build data for a user's applications",
  }),
  t.Literal('applications.commands', {
    title: 'APPLICATIONS_COMMANDS',
    description: 'allows your app to use commands in a guild',
  }),
  t.Literal('applications.commands.permissions.update', {
    title: 'APPLICATIONS_COMMANDS_PERMISSIONS_UPDATE',
    description:
      'allows your app to update permissions for its commands in a guild a user has permissions to',
  }),
  t.Literal('applications.commands.update', {
    title: 'APPLICATIONS_COMMANDS_UPDATE',
    description:
      'allows your app to update its commands using a Bearer token - client credentials grant only',
  }),
  t.Literal('applications.store.update', {
    title: 'APPLICATIONS_STORE_UPDATE',
    description:
      "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
  }),
  t.Literal('applications.entitlements', {
    title: 'APPLICATIONS_ENTITLEMENTS',
    description: "allows your app to read entitlements for a user's applications",
  }),
  t.Literal('activities.read', {
    title: 'ACTIVITIES_READ',
    description:
      'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
  }),
  t.Literal('activities.write', {
    title: 'ACTIVITIES_WRITE',
    description:
      "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
  }),
  t.Literal('activities.invites.write', {
    title: 'ACTIVITIES_INVITES_WRITE',
    description:
      'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
  }),
  t.Literal('relationships.read', {
    title: 'RELATIONSHIPS_READ',
    description:
      "allows your app to know a user's friends and implicit relationships - requires Discord approval",
  }),
  t.Literal('voice', {
    title: 'VOICE',
    description:
      "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
  }),
  t.Literal('dm_channels.read', {
    title: 'DM_CHANNELS_READ',
    description:
      "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
  }),
  t.Literal('role_connections.write', {
    title: 'ROLE_CONNECTIONS_WRITE',
    description: "allows your app to update a user's connection and metadata for the app",
  }),
  t.Literal('openid', {
    title: 'OPENID',
    description:
      'for OpenID Connect, this allows your app to receive user id and basic profile information',
  }),
])

export const ApplicationOAuth2InstallParamsResponseSchema = t.Object({
  scopes: t.Array(OAuth2ScopesSchema, { uniqueItems: true }),
  permissions: t.String(),
})

export const ApplicationIntegrationTypeConfigurationResponseSchema = t.Object({
  oauth2_install_params: t.Optional(ApplicationOAuth2InstallParamsResponseSchema),
})

export const ApplicationResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  icon: t.Union([t.String(), t.Null()]),
  description: t.String(),
  type: t.Union([t.Null(), ApplicationTypesSchema]),
  cover_image: t.Optional(t.String()),
  primary_sku_id: t.Optional(SnowflakeTypeSchema),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  flags_new: t.String(),
  bot: t.Optional(UserResponseSchema),
  slug: t.Optional(t.String()),
  conjure_project_id: t.Optional(SnowflakeTypeSchema),
  vibegrations_project_id: t.Optional(SnowflakeTypeSchema),
  guild_id: t.Optional(SnowflakeTypeSchema),
  rpc_origins: t.Optional(t.Array(t.String())),
  bot_public: t.Optional(t.Boolean()),
  bot_require_code_grant: t.Optional(t.Boolean()),
  terms_of_service_url: t.Optional(t.String({ format: 'uri' })),
  privacy_policy_url: t.Optional(t.String({ format: 'uri' })),
  custom_install_url: t.Optional(t.String({ format: 'uri' })),
  install_params: t.Optional(ApplicationOAuth2InstallParamsResponseSchema),
  integration_types_config: t.Optional(
    t.Record(t.String(), ApplicationIntegrationTypeConfigurationResponseSchema),
  ),
  verify_key: t.String(),
  max_participants: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
  tags: t.Optional(t.Array(t.String(), { uniqueItems: true })),
})

export const AttachmentResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  filename: t.String(),
  size: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  url: t.String({ format: 'uri' }),
  proxy_url: t.String({ format: 'uri' }),
  width: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  height: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  duration_secs: t.Optional(t.Number({ format: 'double' })),
  waveform: t.Optional(t.String()),
  description: t.Optional(t.String()),
  content_type: t.Optional(t.String()),
  ephemeral: t.Optional(t.Boolean()),
  flags: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  placeholder: t.Optional(t.String()),
  placeholder_version: t.Optional(
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  title: t.Optional(t.Union([t.String(), t.Null()])),
  application: t.Optional(ApplicationResponseSchema),
  clip_created_at: t.Optional(t.Date()),
  clip_participants: t.Optional(t.Array(UserResponseSchema)),
})

export const ActivitiesAttachmentResponseSchema = t.Object({ attachment: AttachmentResponseSchema })

export const ActivityActionTypesSchema = t.Union([
  t.Literal(1, { title: 'JOIN' }),
  t.Literal(2, { title: 'SPECTATE' }),
  t.Literal(3, { title: 'LISTEN' }),
  t.Literal(5, { title: 'JOIN_REQUEST' }),
  t.Literal(6, { title: 'STREAM_REQUEST' }),
])

export const ActivityInstanceCallbackResponseSchema = t.Object({ id: t.String() })

export const AfkTimeoutsSchema = t.Union([
  t.Literal(60, { title: 'ONE_MINUTE' }),
  t.Literal(300, { title: 'FIVE_MINUTES' }),
  t.Literal(900, { title: 'FIFTEEN_MINUTES' }),
  t.Literal(1800, { title: 'THIRTY_MINUTES' }),
  t.Literal(3600, { title: 'ONE_HOUR' }),
])

export const AllowedMentionTypesSchema = t.Union([
  t.Literal('users', { title: 'USERS', description: 'Controls role mentions' }),
  t.Literal('roles', { title: 'ROLES', description: 'Controls user mentions' }),
  t.Literal('everyone', {
    title: 'EVERYONE',
    description: 'Controls @everyone and @here mentions',
  }),
])

export const ApplicationCommandOptionTypeSchema = t.Union([
  t.Literal(1, { title: 'SUB_COMMAND', description: 'A sub-action within a command or group' }),
  t.Literal(2, { title: 'SUB_COMMAND_GROUP', description: 'A group of subcommands' }),
  t.Literal(3, { title: 'STRING', description: 'A string option' }),
  t.Literal(4, {
    title: 'INTEGER',
    description: 'An integer option. Any integer between -2^53 and 2^53 is a valid value',
  }),
  t.Literal(5, { title: 'BOOLEAN', description: 'A boolean option' }),
  t.Literal(6, { title: 'USER', description: 'A snowflake option that represents a User' }),
  t.Literal(7, {
    title: 'CHANNEL',
    description:
      'A snowflake option that represents a Channel. Includes all channel types and categories',
  }),
  t.Literal(8, { title: 'ROLE', description: 'A snowflake option that represents a Role' }),
  t.Literal(9, {
    title: 'MENTIONABLE',
    description: 'A snowflake option that represents anything you can mention',
  }),
  t.Literal(10, {
    title: 'NUMBER',
    description: 'A number option. Any double between -2^53 and 2^53 is a valid value',
  }),
  t.Literal(11, { title: 'ATTACHMENT', description: 'An attachment option' }),
])

export const ApplicationCommandAttachmentOptionSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.String({ minLength: 1, maxLength: 100 }),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  file_types: t.Optional(
    t.Union([
      t.Array(t.String({ minLength: 1, maxLength: 16 }), { maxItems: 10, uniqueItems: true }),
      t.Null(),
    ]),
  ),
})

export const ApplicationCommandAttachmentOptionResponseSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localized: t.Optional(t.String()),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  required: t.Optional(t.Boolean()),
  file_types: t.Optional(t.Array(t.String({ maxLength: 16 }), { uniqueItems: true })),
})

export const InteractionCallbackTypesSchema = t.Union([
  t.Literal(1, { title: 'PONG' }),
  t.Literal(4, { title: 'CHANNEL_MESSAGE_WITH_SOURCE' }),
  t.Literal(5, { title: 'DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE' }),
  t.Literal(6, { title: 'DEFERRED_UPDATE_MESSAGE' }),
  t.Literal(7, { title: 'UPDATE_MESSAGE' }),
  t.Literal(8, { title: 'APPLICATION_COMMAND_AUTOCOMPLETE_RESULT' }),
  t.Literal(9, { title: 'MODAL' }),
  t.Literal(12, { title: 'LAUNCH_ACTIVITY' }),
  t.Literal(13, { title: 'SOCIAL_LAYER_SKU_PURCHASE_ELIGIBILITY' }),
])

export const ApplicationCommandOptionIntegerChoiceSchema = t.Object({
  name: t.String({ minLength: 1, maxLength: 100 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  value: Int53TypeSchema,
})

export const InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema = t.Object({
  choices: t.Optional(
    t.Union([
      t.Array(t.Union([t.Null(), ApplicationCommandOptionIntegerChoiceSchema]), { maxItems: 25 }),
      t.Null(),
    ]),
  ),
})

export const ApplicationCommandOptionNumberChoiceSchema = t.Object({
  name: t.String({ minLength: 1, maxLength: 100 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  value: t.Number({ format: 'double' }),
})

export const InteractionApplicationCommandAutocompleteCallbackNumberDataSchema = t.Object({
  choices: t.Optional(
    t.Union([
      t.Array(t.Union([t.Null(), ApplicationCommandOptionNumberChoiceSchema]), { maxItems: 25 }),
      t.Null(),
    ]),
  ),
})

export const ApplicationCommandOptionStringChoiceSchema = t.Object({
  name: t.String({ minLength: 1, maxLength: 100 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  value: t.String({ maxLength: 6000 }),
})

export const InteractionApplicationCommandAutocompleteCallbackStringDataSchema = t.Object({
  choices: t.Optional(
    t.Union([
      t.Array(t.Union([t.Null(), ApplicationCommandOptionStringChoiceSchema]), { maxItems: 25 }),
      t.Null(),
    ]),
  ),
})

export const ApplicationCommandAutocompleteCallbackRequestSchema = t.Object({
  type: InteractionCallbackTypesSchema,
  data: t.Union([
    InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema,
    InteractionApplicationCommandAutocompleteCallbackNumberDataSchema,
    InteractionApplicationCommandAutocompleteCallbackStringDataSchema,
  ]),
})

export const ApplicationCommandBooleanOptionSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.String({ minLength: 1, maxLength: 100 }),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const ApplicationCommandBooleanOptionResponseSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localized: t.Optional(t.String()),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  required: t.Optional(t.Boolean()),
})

export const ApplicationCommandChannelOptionSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.String({ minLength: 1, maxLength: 100 }),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  channel_types: t.Optional(
    t.Union([t.Array(ChannelTypesSchema, { uniqueItems: true }), t.Null()]),
  ),
})

export const ApplicationCommandChannelOptionResponseSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localized: t.Optional(t.String()),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  required: t.Optional(t.Boolean()),
  channel_types: t.Optional(t.Array(ChannelTypesSchema, { uniqueItems: true })),
})

export const ApplicationCommandIntegerOptionSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.String({ minLength: 1, maxLength: 100 }),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  autocomplete: t.Optional(t.Union([t.Boolean(), t.Null()])),
  choices: t.Optional(
    t.Union([t.Array(ApplicationCommandOptionIntegerChoiceSchema, { maxItems: 25 }), t.Null()]),
  ),
  min_value: t.Optional(t.Union([t.Null(), Int53TypeSchema])),
  max_value: t.Optional(t.Union([t.Null(), Int53TypeSchema])),
})

export const ApplicationCommandMentionableOptionSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.String({ minLength: 1, maxLength: 100 }),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const ApplicationCommandNumberOptionSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.String({ minLength: 1, maxLength: 100 }),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  autocomplete: t.Optional(t.Union([t.Boolean(), t.Null()])),
  choices: t.Optional(
    t.Union([t.Array(ApplicationCommandOptionNumberChoiceSchema, { maxItems: 25 }), t.Null()]),
  ),
  min_value: t.Optional(t.Union([t.Number({ format: 'double' }), t.Null()])),
  max_value: t.Optional(t.Union([t.Number({ format: 'double' }), t.Null()])),
})

export const ApplicationCommandRoleOptionSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.String({ minLength: 1, maxLength: 100 }),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const ApplicationCommandStringOptionSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.String({ minLength: 1, maxLength: 100 }),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  autocomplete: t.Optional(t.Union([t.Boolean(), t.Null()])),
  min_length: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 6000 }), t.Null()])),
  max_length: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 6000 }), t.Null()])),
  choices: t.Optional(
    t.Union([t.Array(ApplicationCommandOptionStringChoiceSchema, { maxItems: 25 }), t.Null()]),
  ),
})

export const ApplicationCommandUserOptionSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.String({ minLength: 1, maxLength: 100 }),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const ApplicationCommandSubcommandOptionSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.String({ minLength: 1, maxLength: 100 }),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  options: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          ApplicationCommandAttachmentOptionSchema,
          ApplicationCommandBooleanOptionSchema,
          ApplicationCommandChannelOptionSchema,
          ApplicationCommandIntegerOptionSchema,
          ApplicationCommandMentionableOptionSchema,
          ApplicationCommandNumberOptionSchema,
          ApplicationCommandRoleOptionSchema,
          ApplicationCommandStringOptionSchema,
          ApplicationCommandUserOptionSchema,
        ]),
        { maxItems: 25 },
      ),
      t.Null(),
    ]),
  ),
})

export const ApplicationCommandSubcommandGroupOptionSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.String({ minLength: 1, maxLength: 100 }),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  options: t.Optional(
    t.Union([t.Array(ApplicationCommandSubcommandOptionSchema, { maxItems: 25 }), t.Null()]),
  ),
})

export const InteractionContextTypeSchema = t.Union([
  t.Literal(0, { title: 'GUILD', description: 'This command can be used within a Guild.' }),
  t.Literal(1, {
    title: 'BOT_DM',
    description: "This command can be used within a DM with this application's bot.",
  }),
  t.Literal(2, {
    title: 'PRIVATE_CHANNEL',
    description: 'This command can be used within DMs and Group DMs with users.',
  }),
])

export const ApplicationIntegrationTypeSchema = t.Union([
  t.Literal(0, { title: 'GUILD_INSTALL', description: 'For Guild install.' }),
  t.Literal(1, { title: 'USER_INSTALL', description: 'For User install.' }),
])

export const ApplicationCommandHandlerSchema = t.Union([
  t.Literal(1, {
    title: 'APP_HANDLER',
    description: 'The app handles the interaction using an interaction token',
  }),
  t.Literal(2, {
    title: 'DISCORD_LAUNCH_ACTIVITY',
    description:
      'Discord handles the interaction by launching an Activity and sending a follow-up message without coordinating with the app',
  }),
])

export const ApplicationCommandTypeSchema = t.Union([
  t.Literal(1, {
    title: 'CHAT',
    description: 'Slash commands; a text-based command that shows up when a user types /',
  }),
  t.Literal(2, {
    title: 'USER',
    description: 'A UI-based command that shows up when you right click or tap on a user',
  }),
  t.Literal(3, {
    title: 'MESSAGE',
    description: 'A UI-based command that shows up when you right click or tap on a message',
  }),
  t.Literal(4, {
    title: 'PRIMARY_ENTRY_POINT',
    description:
      'A command that represents the primary way to use an application (e.g. launching an Activity)',
  }),
])

export const ApplicationCommandCreateRequestSchema = t.Object({
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  options: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          ApplicationCommandAttachmentOptionSchema,
          ApplicationCommandBooleanOptionSchema,
          ApplicationCommandChannelOptionSchema,
          ApplicationCommandIntegerOptionSchema,
          ApplicationCommandMentionableOptionSchema,
          ApplicationCommandNumberOptionSchema,
          ApplicationCommandRoleOptionSchema,
          ApplicationCommandStringOptionSchema,
          ApplicationCommandSubcommandGroupOptionSchema,
          ApplicationCommandSubcommandOptionSchema,
          ApplicationCommandUserOptionSchema,
        ]),
        { maxItems: 25 },
      ),
      t.Null(),
    ]),
  ),
  default_member_permissions: t.Optional(
    t.Union([t.Integer({ minimum: 0, maximum: 18014398509481984 }), t.Null()]),
  ),
  dm_permission: t.Optional(t.Union([t.Boolean(), t.Null()])),
  contexts: t.Optional(
    t.Union([t.Array(InteractionContextTypeSchema, { minItems: 1, uniqueItems: true }), t.Null()]),
  ),
  integration_types: t.Optional(
    t.Union([
      t.Array(ApplicationIntegrationTypeSchema, { minItems: 1, uniqueItems: true }),
      t.Null(),
    ]),
  ),
  handler: t.Optional(
    t.Union([t.Null(), ApplicationCommandHandlerSchema], {
      description:
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    }),
  ),
  type: t.Optional(t.Union([t.Null(), ApplicationCommandTypeSchema])),
})

export const ApplicationCommandOptionIntegerChoiceResponseSchema = t.Object({
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  value: Int53TypeSchema,
})

export const ApplicationCommandIntegerOptionResponseSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localized: t.Optional(t.String()),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  required: t.Optional(t.Boolean()),
  autocomplete: t.Optional(t.Boolean()),
  choices: t.Optional(t.Array(ApplicationCommandOptionIntegerChoiceResponseSchema)),
  min_value: t.Optional(Int53TypeSchema),
  max_value: t.Optional(Int53TypeSchema),
})

export const InteractionTypesSchema = t.Union([
  t.Literal(1, {
    title: 'PING',
    description: "Sent by Discord to validate your application's interaction handler",
  }),
  t.Literal(2, {
    title: 'APPLICATION_COMMAND',
    description: 'Sent when a user uses an application command',
  }),
  t.Literal(3, {
    title: 'MESSAGE_COMPONENT',
    description:
      'Sent when a user interacts with a message component previously sent by your application',
  }),
  t.Literal(4, {
    title: 'APPLICATION_COMMAND_AUTOCOMPLETE',
    description: 'Sent when a user is filling in an autocomplete option in a chat command',
  }),
  t.Literal(5, {
    title: 'MODAL_SUBMIT',
    description: 'Sent when a user submits a modal previously sent by your application',
  }),
  t.Literal(6, {
    title: 'SOCIAL_LAYER_SKU_PURCHASE_ELIGIBILITY',
    description: 'Sent when Discord is checking if a user can purchase a Social Layer SKU',
  }),
])

export const ApplicationCommandInteractionMetadataResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  user: t.Optional(UserResponseSchema),
  authorizing_integration_owners: t.Record(t.String(), SnowflakeTypeSchema),
  original_response_message_id: t.Optional(SnowflakeTypeSchema),
  target_user: t.Optional(UserResponseSchema),
  target_message_id: t.Optional(SnowflakeTypeSchema),
})

export const ApplicationCommandMentionableOptionResponseSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localized: t.Optional(t.String()),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  required: t.Optional(t.Boolean()),
})

export const ApplicationCommandOptionNumberChoiceResponseSchema = t.Object({
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  value: t.Number({ format: 'double' }),
})

export const ApplicationCommandNumberOptionResponseSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localized: t.Optional(t.String()),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  required: t.Optional(t.Boolean()),
  autocomplete: t.Optional(t.Boolean()),
  choices: t.Optional(t.Array(ApplicationCommandOptionNumberChoiceResponseSchema)),
  min_value: t.Optional(t.Number({ format: 'double' })),
  max_value: t.Optional(t.Number({ format: 'double' })),
})

export const ApplicationCommandOptionStringChoiceResponseSchema = t.Object({
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  value: t.String(),
})

export const ApplicationCommandPatchRequestPartialSchema = t.Object({
  name: t.Optional(t.String({ minLength: 1, maxLength: 32 })),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  options: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          ApplicationCommandAttachmentOptionSchema,
          ApplicationCommandBooleanOptionSchema,
          ApplicationCommandChannelOptionSchema,
          ApplicationCommandIntegerOptionSchema,
          ApplicationCommandMentionableOptionSchema,
          ApplicationCommandNumberOptionSchema,
          ApplicationCommandRoleOptionSchema,
          ApplicationCommandStringOptionSchema,
          ApplicationCommandSubcommandGroupOptionSchema,
          ApplicationCommandSubcommandOptionSchema,
          ApplicationCommandUserOptionSchema,
        ]),
        { maxItems: 25 },
      ),
      t.Null(),
    ]),
  ),
  default_member_permissions: t.Optional(
    t.Union([t.Integer({ minimum: 0, maximum: 18014398509481984 }), t.Null()]),
  ),
  dm_permission: t.Optional(t.Union([t.Boolean(), t.Null()])),
  contexts: t.Optional(
    t.Union([t.Array(InteractionContextTypeSchema, { minItems: 1, uniqueItems: true }), t.Null()]),
  ),
  integration_types: t.Optional(
    t.Union([
      t.Array(ApplicationIntegrationTypeSchema, { minItems: 1, uniqueItems: true }),
      t.Null(),
    ]),
  ),
  handler: t.Optional(
    t.Union([t.Null(), ApplicationCommandHandlerSchema], {
      description:
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    }),
  ),
})

export const ApplicationCommandPermissionTypeSchema = t.Union([
  t.Literal(1, { title: 'ROLE', description: 'This permission is for a role.' }),
  t.Literal(2, { title: 'USER', description: 'This permission is for a user.' }),
  t.Literal(3, { title: 'CHANNEL', description: 'This permission is for a channel.' }),
])

export const ApplicationCommandPermissionSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: ApplicationCommandPermissionTypeSchema,
  permission: t.Boolean(),
})

export const ApplicationCommandRoleOptionResponseSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localized: t.Optional(t.String()),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  required: t.Optional(t.Boolean()),
})

export const ApplicationCommandStringOptionResponseSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localized: t.Optional(t.String()),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  required: t.Optional(t.Boolean()),
  autocomplete: t.Optional(t.Boolean()),
  choices: t.Optional(t.Array(ApplicationCommandOptionStringChoiceResponseSchema)),
  min_length: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  max_length: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
})

export const ApplicationCommandUserOptionResponseSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localized: t.Optional(t.String()),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  required: t.Optional(t.Boolean()),
})

export const ApplicationCommandSubcommandOptionResponseSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localized: t.Optional(t.String()),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  required: t.Optional(t.Boolean()),
  options: t.Optional(
    t.Array(
      t.Union([
        ApplicationCommandAttachmentOptionResponseSchema,
        ApplicationCommandBooleanOptionResponseSchema,
        ApplicationCommandChannelOptionResponseSchema,
        ApplicationCommandIntegerOptionResponseSchema,
        ApplicationCommandMentionableOptionResponseSchema,
        ApplicationCommandNumberOptionResponseSchema,
        ApplicationCommandRoleOptionResponseSchema,
        ApplicationCommandStringOptionResponseSchema,
        ApplicationCommandUserOptionResponseSchema,
      ]),
    ),
  ),
})

export const ApplicationCommandSubcommandGroupOptionResponseSchema = t.Object({
  type: ApplicationCommandOptionTypeSchema,
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localized: t.Optional(t.String()),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  required: t.Optional(t.Boolean()),
  options: t.Optional(t.Array(ApplicationCommandSubcommandOptionResponseSchema)),
})

export const ApplicationCommandResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  version: SnowflakeTypeSchema,
  default_member_permissions: t.Union([t.String(), t.Null()]),
  type: ApplicationCommandTypeSchema,
  name: t.String(),
  name_localized: t.Optional(t.String()),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localized: t.Optional(t.String()),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  guild_id: t.Optional(SnowflakeTypeSchema),
  dm_permission: t.Optional(t.Boolean()),
  contexts: t.Optional(
    t.Union([t.Array(InteractionContextTypeSchema, { uniqueItems: true }), t.Null()]),
  ),
  integration_types: t.Optional(t.Array(ApplicationIntegrationTypeSchema, { uniqueItems: true })),
  options: t.Optional(
    t.Array(
      t.Union([
        ApplicationCommandAttachmentOptionResponseSchema,
        ApplicationCommandBooleanOptionResponseSchema,
        ApplicationCommandChannelOptionResponseSchema,
        ApplicationCommandIntegerOptionResponseSchema,
        ApplicationCommandMentionableOptionResponseSchema,
        ApplicationCommandNumberOptionResponseSchema,
        ApplicationCommandRoleOptionResponseSchema,
        ApplicationCommandStringOptionResponseSchema,
        ApplicationCommandSubcommandGroupOptionResponseSchema,
        ApplicationCommandSubcommandOptionResponseSchema,
        ApplicationCommandUserOptionResponseSchema,
      ]),
    ),
  ),
  nsfw: t.Optional(t.Boolean()),
  handler: t.Optional(ApplicationCommandHandlerSchema),
})

export const ApplicationCommandUpdateRequestSchema = t.Object({
  name: t.String({ minLength: 1, maxLength: 32 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 32 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  description: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 34 }),
      t.Null(),
    ]),
  ),
  options: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          ApplicationCommandAttachmentOptionSchema,
          ApplicationCommandBooleanOptionSchema,
          ApplicationCommandChannelOptionSchema,
          ApplicationCommandIntegerOptionSchema,
          ApplicationCommandMentionableOptionSchema,
          ApplicationCommandNumberOptionSchema,
          ApplicationCommandRoleOptionSchema,
          ApplicationCommandStringOptionSchema,
          ApplicationCommandSubcommandGroupOptionSchema,
          ApplicationCommandSubcommandOptionSchema,
          ApplicationCommandUserOptionSchema,
        ]),
        { maxItems: 25 },
      ),
      t.Null(),
    ]),
  ),
  default_member_permissions: t.Optional(
    t.Union([t.Integer({ minimum: 0, maximum: 18014398509481984 }), t.Null()]),
  ),
  dm_permission: t.Optional(t.Union([t.Boolean(), t.Null()])),
  contexts: t.Optional(
    t.Union([t.Array(InteractionContextTypeSchema, { minItems: 1, uniqueItems: true }), t.Null()]),
  ),
  integration_types: t.Optional(
    t.Union([
      t.Array(ApplicationIntegrationTypeSchema, { minItems: 1, uniqueItems: true }),
      t.Null(),
    ]),
  ),
  handler: t.Optional(
    t.Union([t.Null(), ApplicationCommandHandlerSchema], {
      description:
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    }),
  ),
  type: t.Optional(t.Union([t.Null(), ApplicationCommandTypeSchema])),
  id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
})

export const ApplicationEventWebhooksStatusSchema = t.Union([
  t.Literal(1, { title: 'DISABLED', description: 'Webhook events are disabled by developer' }),
  t.Literal(2, { title: 'ENABLED', description: 'Webhook events are enabled by developer' }),
  t.Literal(3, {
    title: 'DISABLED_BY_DISCORD',
    description: 'Webhook events are disabled by Discord, usually due to inactivity',
  }),
])

export const ApplicationExplicitContentFilterTypesSchema = t.Union([
  t.Literal(0, { title: 'INHERIT', description: 'inherit guild content filter setting' }),
  t.Literal(1, { title: 'ALWAYS', description: 'interactions will always be scanned' }),
])

export const ApplicationOAuth2InstallParamsSchema = t.Object({
  scopes: t.Optional(
    t.Union([t.Array(OAuth2ScopesSchema, { minItems: 1, uniqueItems: true }), t.Null()]),
  ),
  permissions: t.Optional(
    t.Union([t.Integer({ minimum: 0, maximum: 18014398509481984 }), t.Null()]),
  ),
})

export const ApplicationIntegrationTypeConfigurationSchema = t.Object({
  oauth2_install_params: t.Optional(t.Union([t.Null(), ApplicationOAuth2InstallParamsSchema])),
})

export const ApplicationFormPartialSchema = t.Object({
  description: t.Optional(
    t.Union([
      t.Object({
        default: t.String({ maxLength: 400 }),
        localizations: t.Optional(
          t.Union([t.Record(t.String(), t.String({ maxLength: 400 })), t.Null()]),
        ),
      }),
      t.Null(),
    ]),
  ),
  icon: t.Optional(t.Union([t.String(), t.Null()])),
  cover_image: t.Optional(t.Union([t.String(), t.Null()])),
  team_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  interactions_endpoint_url: t.Optional(
    t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()]),
  ),
  explicit_content_filter: t.Optional(
    t.Union([t.Null(), ApplicationExplicitContentFilterTypesSchema]),
  ),
  max_participants: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -1, maximum: 2147483647 }), t.Null()]),
  ),
  type: t.Optional(t.Union([t.Null(), ApplicationTypesSchema])),
  tags: t.Optional(
    t.Union([t.Array(t.String({ maxLength: 20 }), { maxItems: 5, uniqueItems: true }), t.Null()]),
  ),
  custom_install_url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  install_params: t.Optional(t.Union([t.Null(), ApplicationOAuth2InstallParamsSchema])),
  role_connections_verification_url: t.Optional(
    t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()]),
  ),
  integration_types_config: t.Optional(
    t.Union([
      t.Record(t.String(), t.Union([t.Null(), ApplicationIntegrationTypeConfigurationSchema]), {
        minProperties: 1,
        maxProperties: 2,
      }),
      t.Null(),
    ]),
  ),
  event_webhooks_status: t.Optional(t.Union([t.Null(), ApplicationEventWebhooksStatusSchema])),
  event_webhooks_url: t.Optional(
    t.Union([
      t.String({
        format: 'uri',
        maxLength: 2048,
        description: 'Event webhooks URL for the app to receive webhook events',
      }),
      t.Null(),
    ]),
  ),
  event_webhooks_types: t.Optional(
    t.Union([t.Array(ActionTypesSchema, { uniqueItems: true }), t.Null()]),
  ),
})

export const ApplicationIdentityProviderAuthTypeSchema = t.Union([
  t.Literal('OIDC', { title: 'OIDC' }),
  t.Literal('EPIC_ONLINE_SERVICES_ACCESS_TOKEN', { title: 'EPIC_ONLINE_SERVICES_ACCESS_TOKEN' }),
  t.Literal('EPIC_ONLINE_SERVICES_ID_TOKEN', { title: 'EPIC_ONLINE_SERVICES_ID_TOKEN' }),
  t.Literal('STEAM_SESSION_TICKET', { title: 'STEAM_SESSION_TICKET' }),
  t.Literal('UNITY_SERVICES_ID_TOKEN', { title: 'UNITY_SERVICES_ID_TOKEN' }),
  t.Literal('DISCORD_BOT_ISSUED_ACCESS_TOKEN', { title: 'DISCORD_BOT_ISSUED_ACCESS_TOKEN' }),
  t.Literal('APPLE_ID_TOKEN', { title: 'APPLE_ID_TOKEN' }),
  t.Literal('PLAYSTATION_NETWORK_ID_TOKEN', { title: 'PLAYSTATION_NETWORK_ID_TOKEN' }),
])

export const WebhookTypesSchema = t.Union([
  t.Literal(1, {
    title: 'GUILD_INCOMING',
    description: 'Incoming Webhooks can post messages to channels with a generated token',
  }),
  t.Literal(2, {
    title: 'CHANNEL_FOLLOWER',
    description:
      'Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels',
  }),
  t.Literal(3, {
    title: 'APPLICATION_INCOMING',
    description: 'Application webhooks are webhooks used with Interactions',
  }),
])

export const ApplicationIncomingWebhookResponseSchema = t.Object({
  application_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  avatar: t.Union([t.String(), t.Null()]),
  channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  guild_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  id: SnowflakeTypeSchema,
  name: t.String(),
  type: WebhookTypesSchema,
  user: t.Optional(UserResponseSchema),
})

export const MetadataItemTypesSchema = t.Union([
  t.Literal(1, {
    title: 'INTEGER_LESS_THAN_EQUAL',
    description:
      "the metadata value (integer) is less than or equal to the guild's configured value (integer)",
  }),
  t.Literal(2, {
    title: 'INTEGER_GREATER_THAN_EQUAL',
    description:
      "the metadata value (integer) is greater than or equal to the guild's configured value (integer)",
  }),
  t.Literal(3, {
    title: 'INTEGER_EQUAL',
    description: "the metadata value (integer) is equal to the guild's configured value (integer)",
  }),
  t.Literal(4, {
    title: 'INTEGER_NOT_EQUAL',
    description:
      "the metadata value (integer) is not equal to the guild's configured value (integer)",
  }),
  t.Literal(5, {
    title: 'DATETIME_LESS_THAN_EQUAL',
    description:
      "the metadata value (ISO8601 string) is less than or equal to the guild's configured value (integer; days before current date)",
  }),
  t.Literal(6, {
    title: 'DATETIME_GREATER_THAN_EQUAL',
    description:
      "the metadata value (ISO8601 string) is greater than or equal to the guild's configured value (integer; days before current date)",
  }),
  t.Literal(7, {
    title: 'BOOLEAN_EQUAL',
    description:
      "the metadata value (integer) is equal to the guild's configured value (integer; 1)",
  }),
  t.Literal(8, {
    title: 'BOOLEAN_NOT_EQUAL',
    description:
      "the metadata value (integer) is not equal to the guild's configured value (integer; 1)",
  }),
])

export const ApplicationRoleConnectionsMetadataItemRequestSchema = t.Object({
  type: MetadataItemTypesSchema,
  key: t.String({ minLength: 1, maxLength: 50 }),
  name: t.String({ minLength: 1, maxLength: 100 }),
  name_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.Union([t.String({ minLength: 1, maxLength: 100 }), t.Null()]), {
        maxProperties: 1521,
      }),
      t.Null(),
    ]),
  ),
  description: t.String({ minLength: 1, maxLength: 200 }),
  description_localizations: t.Optional(
    t.Union([
      t.Record(t.String(), t.Union([t.String({ minLength: 1, maxLength: 200 }), t.Null()]), {
        maxProperties: 1521,
      }),
      t.Null(),
    ]),
  ),
})

export const ApplicationRoleConnectionsMetadataItemResponseSchema = t.Object({
  type: MetadataItemTypesSchema,
  key: t.String(),
  name: t.String(),
  name_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  description: t.String(),
  description_localizations: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
})

export const ApplicationUserRoleConnectionResponseSchema = t.Object({
  platform_name: t.Optional(t.String()),
  platform_username: t.Optional(t.Union([t.String(), t.Null()])),
  metadata: t.Optional(t.Record(t.String(), t.String())),
})

export const AuditLogActionTypesSchema = t.Union([
  t.Literal(1, { title: 'GUILD_UPDATE' }),
  t.Literal(10, { title: 'CHANNEL_CREATE' }),
  t.Literal(11, { title: 'CHANNEL_UPDATE' }),
  t.Literal(12, { title: 'CHANNEL_DELETE' }),
  t.Literal(13, { title: 'CHANNEL_OVERWRITE_CREATE' }),
  t.Literal(14, { title: 'CHANNEL_OVERWRITE_UPDATE' }),
  t.Literal(15, { title: 'CHANNEL_OVERWRITE_DELETE' }),
  t.Literal(16, { title: 'CHANNEL_POSITION_UPDATE', description: 'Channels were reordered' }),
  t.Literal(20, { title: 'MEMBER_KICK' }),
  t.Literal(21, { title: 'MEMBER_PRUNE' }),
  t.Literal(22, { title: 'MEMBER_BAN_ADD' }),
  t.Literal(23, { title: 'MEMBER_BAN_REMOVE' }),
  t.Literal(24, { title: 'MEMBER_UPDATE' }),
  t.Literal(25, { title: 'MEMBER_ROLE_UPDATE' }),
  t.Literal(26, { title: 'MEMBER_MOVE' }),
  t.Literal(27, { title: 'MEMBER_DISCONNECT' }),
  t.Literal(28, { title: 'BOT_ADD' }),
  t.Literal(30, { title: 'ROLE_CREATE' }),
  t.Literal(31, { title: 'ROLE_UPDATE' }),
  t.Literal(32, { title: 'ROLE_DELETE' }),
  t.Literal(33, { title: 'ROLE_POSITION_UPDATE', description: 'Roles were reordered' }),
  t.Literal(40, { title: 'INVITE_CREATE' }),
  t.Literal(41, { title: 'INVITE_UPDATE' }),
  t.Literal(42, { title: 'INVITE_DELETE' }),
  t.Literal(50, { title: 'WEBHOOK_CREATE' }),
  t.Literal(51, { title: 'WEBHOOK_UPDATE' }),
  t.Literal(52, { title: 'WEBHOOK_DELETE' }),
  t.Literal(60, { title: 'EMOJI_CREATE' }),
  t.Literal(61, { title: 'EMOJI_UPDATE' }),
  t.Literal(62, { title: 'EMOJI_DELETE' }),
  t.Literal(72, { title: 'MESSAGE_DELETE' }),
  t.Literal(73, { title: 'MESSAGE_BULK_DELETE' }),
  t.Literal(74, { title: 'MESSAGE_PIN' }),
  t.Literal(75, { title: 'MESSAGE_UNPIN' }),
  t.Literal(80, { title: 'INTEGRATION_CREATE' }),
  t.Literal(81, { title: 'INTEGRATION_UPDATE' }),
  t.Literal(82, { title: 'INTEGRATION_DELETE' }),
  t.Literal(83, { title: 'STAGE_INSTANCE_CREATE' }),
  t.Literal(84, { title: 'STAGE_INSTANCE_UPDATE' }),
  t.Literal(85, { title: 'STAGE_INSTANCE_DELETE' }),
  t.Literal(90, { title: 'STICKER_CREATE' }),
  t.Literal(91, { title: 'STICKER_UPDATE' }),
  t.Literal(92, { title: 'STICKER_DELETE' }),
  t.Literal(100, { title: 'GUILD_SCHEDULED_EVENT_CREATE' }),
  t.Literal(101, { title: 'GUILD_SCHEDULED_EVENT_UPDATE' }),
  t.Literal(102, { title: 'GUILD_SCHEDULED_EVENT_DELETE' }),
  t.Literal(110, { title: 'THREAD_CREATE' }),
  t.Literal(111, { title: 'THREAD_UPDATE' }),
  t.Literal(112, { title: 'THREAD_DELETE' }),
  t.Literal(121, { title: 'APPLICATION_COMMAND_PERMISSION_UPDATE' }),
  t.Literal(130, { title: 'SOUNDBOARD_SOUND_CREATE' }),
  t.Literal(131, { title: 'SOUNDBOARD_SOUND_UPDATE' }),
  t.Literal(132, { title: 'SOUNDBOARD_SOUND_DELETE' }),
  t.Literal(140, { title: 'AUTO_MODERATION_RULE_CREATE' }),
  t.Literal(141, { title: 'AUTO_MODERATION_RULE_UPDATE' }),
  t.Literal(142, { title: 'AUTO_MODERATION_RULE_DELETE' }),
  t.Literal(143, { title: 'AUTO_MODERATION_BLOCK_MESSAGE' }),
  t.Literal(144, { title: 'AUTO_MODERATION_FLAG_TO_CHANNEL' }),
  t.Literal(145, { title: 'AUTO_MODERATION_USER_COMM_DISABLED' }),
  t.Literal(146, { title: 'AUTO_MODERATION_QUARANTINE_USER' }),
  t.Literal(150, { title: 'CREATOR_MONETIZATION_REQUEST_CREATED' }),
  t.Literal(151, { title: 'CREATOR_MONETIZATION_TERMS_ACCEPTED' }),
  t.Literal(163, { title: 'ONBOARDING_PROMPT_CREATE' }),
  t.Literal(164, { title: 'ONBOARDING_PROMPT_UPDATE' }),
  t.Literal(165, { title: 'ONBOARDING_PROMPT_DELETE' }),
  t.Literal(166, { title: 'ONBOARDING_CREATE' }),
  t.Literal(167, { title: 'ONBOARDING_UPDATE' }),
  t.Literal(171, { title: 'GUILD_HOME_FEATURE_ITEM' }),
  t.Literal(172, { title: 'GUILD_HOME_REMOVE_ITEM' }),
  t.Literal(180, { title: 'HARMFUL_LINKS_BLOCKED_MESSAGE' }),
  t.Literal(190, { title: 'HOME_SETTINGS_CREATE' }),
  t.Literal(191, { title: 'HOME_SETTINGS_UPDATE' }),
  t.Literal(192, { title: 'VOICE_CHANNEL_STATUS_CREATE' }),
  t.Literal(193, { title: 'VOICE_CHANNEL_STATUS_DELETE' }),
  t.Literal(200, {
    title: 'GUILD_SCHEDULED_EVENT_EXCEPTION_CREATE',
    description: 'Scheduled event exception was created',
  }),
  t.Literal(201, {
    title: 'GUILD_SCHEDULED_EVENT_EXCEPTION_UPDATE',
    description: 'Scheduled event exception was updated',
  }),
  t.Literal(202, {
    title: 'GUILD_SCHEDULED_EVENT_EXCEPTION_DELETE',
    description: 'Scheduled event exception was deleted',
  }),
  t.Literal(211, { title: 'GUILD_PROFILE_UPDATE' }),
])

export const AuditLogObjectChangeResponseSchema = t.Object({
  key: t.Union([t.String(), t.Null()]),
  new_value: t.Optional(t.Unknown()),
  old_value: t.Optional(t.Unknown()),
})

export const AuditLogEntryResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  action_type: AuditLogActionTypesSchema,
  user_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  target_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  changes: t.Optional(t.Array(AuditLogObjectChangeResponseSchema)),
  options: t.Optional(t.Record(t.String(), t.String())),
  reason: t.Optional(t.String()),
})

export const AuthorTypeSchema = t.Union([
  t.Literal('user', { title: 'USER' }),
  t.Literal('bot', { title: 'BOT' }),
  t.Literal('webhook', { title: 'WEBHOOK' }),
  t.Literal('-user', { title: 'NO_USER' }),
  t.Literal('-bot', { title: 'NO_BOT' }),
  t.Literal('-webhook', { title: 'NO_WEBHOOK' }),
])

export const AutomodActionTypeSchema = t.Union([
  t.Literal(1, {
    title: 'BLOCK_MESSAGE',
    description:
      "Block a user's message and prevent it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked",
  }),
  t.Literal(2, {
    title: 'FLAG_TO_CHANNEL',
    description:
      'Send a system message to a channel in order to log the user message that triggered the rule',
  }),
  t.Literal(3, {
    title: 'USER_COMMUNICATION_DISABLED',
    description: "Temporarily disable a user's ability to communicate in the server (timeout)",
  }),
  t.Literal(4, {
    title: 'QUARANTINE_USER',
    description: 'Prevent a user from interacting in the server',
  }),
])

export const AutomodEventTypeSchema = t.Union([
  t.Literal(1, { title: 'MESSAGE_SEND', description: 'A user submitted a message to a channel' }),
  t.Literal(2, {
    title: 'GUILD_MEMBER_JOIN_OR_UPDATE',
    description: "A user is attempting to join the server or a member's properties were updated.",
  }),
])

export const AutomodKeywordPresetTypeSchema = t.Union([
  t.Literal(1, {
    title: 'PROFANITY',
    description: 'Words and phrases that may be considered profanity',
  }),
  t.Literal(2, {
    title: 'SEXUAL_CONTENT',
    description: 'Words and phrases that may be considered as sexual content',
  }),
  t.Literal(3, {
    title: 'SLURS',
    description: 'Words and phrases that may be considered slurs and hate speech',
  }),
])

export const AutomodTriggerTypeSchema = t.Union([
  t.Literal(1, {
    title: 'KEYWORD',
    description: 'Check if content contains words from a list of keywords or matches regex',
  }),
  t.Literal(3, { title: 'ML_SPAM', description: 'Check if content represents generic spam' }),
  t.Literal(4, {
    title: 'DEFAULT_KEYWORD_LIST',
    description: 'Check if content contains words from internal pre-defined wordsets',
  }),
  t.Literal(5, {
    title: 'MENTION_SPAM',
    description: 'Check if content contains more unique mentions than allowed',
  }),
  t.Literal(6, {
    title: 'USER_PROFILE',
    description:
      'Check if user profile fields contains words from a list of keywords or matches regex',
  }),
])

export const AvailableLocalesEnumSchema = t.Union([
  t.Literal('ar', { title: 'ar', description: 'The ar locale' }),
  t.Literal('bg', { title: 'bg', description: 'The bg locale' }),
  t.Literal('cs', { title: 'cs', description: 'The cs locale' }),
  t.Literal('da', { title: 'da', description: 'The da locale' }),
  t.Literal('de', { title: 'de', description: 'The de locale' }),
  t.Literal('el', { title: 'el', description: 'The el locale' }),
  t.Literal('en-GB', { title: 'en-GB', description: 'The en-GB locale' }),
  t.Literal('en-US', { title: 'en-US', description: 'The en-US locale' }),
  t.Literal('es-419', { title: 'es-419', description: 'The es-419 locale' }),
  t.Literal('es-ES', { title: 'es-ES', description: 'The es-ES locale' }),
  t.Literal('fi', { title: 'fi', description: 'The fi locale' }),
  t.Literal('fr', { title: 'fr', description: 'The fr locale' }),
  t.Literal('he', { title: 'he', description: 'The he locale' }),
  t.Literal('hi', { title: 'hi', description: 'The hi locale' }),
  t.Literal('hr', { title: 'hr', description: 'The hr locale' }),
  t.Literal('hu', { title: 'hu', description: 'The hu locale' }),
  t.Literal('id', { title: 'id', description: 'The id locale' }),
  t.Literal('it', { title: 'it', description: 'The it locale' }),
  t.Literal('ja', { title: 'ja', description: 'The ja locale' }),
  t.Literal('ko', { title: 'ko', description: 'The ko locale' }),
  t.Literal('lt', { title: 'lt', description: 'The lt locale' }),
  t.Literal('nl', { title: 'nl', description: 'The nl locale' }),
  t.Literal('no', { title: 'no', description: 'The no locale' }),
  t.Literal('pl', { title: 'pl', description: 'The pl locale' }),
  t.Literal('pt-BR', { title: 'pt-BR', description: 'The pt-BR locale' }),
  t.Literal('ro', { title: 'ro', description: 'The ro locale' }),
  t.Literal('ru', { title: 'ru', description: 'The ru locale' }),
  t.Literal('sv-SE', { title: 'sv-SE', description: 'The sv-SE locale' }),
  t.Literal('th', { title: 'th', description: 'The th locale' }),
  t.Literal('tr', { title: 'tr', description: 'The tr locale' }),
  t.Literal('uk', { title: 'uk', description: 'The uk locale' }),
  t.Literal('vi', { title: 'vi', description: 'The vi locale' }),
  t.Literal('zh-CN', { title: 'zh-CN', description: 'The zh-CN locale' }),
  t.Literal('zh-TW', { title: 'zh-TW', description: 'The zh-TW locale' }),
])

export const BanUserFromGuildRequestSchema = t.Object({
  delete_message_seconds: t.Optional(
    t.Union([t.Integer({ minimum: 0, maximum: 604800 }), t.Null()]),
  ),
  delete_message_days: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 7 }), t.Null()])),
})

export const RichEmbedAuthorSchema = t.Object({
  name: t.Optional(t.Union([t.String({ maxLength: 256 }), t.Null()])),
  url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  icon_url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
})

export const RichEmbedImageSchema = t.Object({
  url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  width: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  height: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 64 }), t.Null()])),
  placeholder_version: t.Optional(
    t.Union([t.Integer({ minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  is_animated: t.Optional(t.Union([t.Boolean(), t.Null()])),
  description: t.Optional(t.Union([t.String({ maxLength: 4096 }), t.Null()])),
})

export const RichEmbedThumbnailSchema = t.Object({
  url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  width: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  height: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 64 }), t.Null()])),
  placeholder_version: t.Optional(
    t.Union([t.Integer({ minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  is_animated: t.Optional(t.Union([t.Boolean(), t.Null()])),
  description: t.Optional(t.Union([t.String({ maxLength: 4096 }), t.Null()])),
})

export const RichEmbedFooterSchema = t.Object({
  text: t.Optional(t.Union([t.String({ maxLength: 2048 }), t.Null()])),
  icon_url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
})

export const RichEmbedFieldSchema = t.Object({
  name: t.String({ maxLength: 256 }),
  value: t.String({ maxLength: 1024 }),
  inline: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const RichEmbedProviderSchema = t.Object({
  name: t.Optional(t.Union([t.String({ maxLength: 256 }), t.Null()])),
  url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
})

export const RichEmbedVideoSchema = t.Object({
  url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  width: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  height: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 64 }), t.Null()])),
  placeholder_version: t.Optional(
    t.Union([t.Integer({ minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  is_animated: t.Optional(t.Union([t.Boolean(), t.Null()])),
  description: t.Optional(t.Union([t.String({ maxLength: 4096 }), t.Null()])),
})

export const RichEmbedAudioSchema = t.Object({
  url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  description: t.Optional(t.Union([t.String({ maxLength: 4096 }), t.Null()])),
})

export const RichEmbedSchema = t.Object({
  type: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  title: t.Optional(t.Union([t.String({ maxLength: 256 }), t.Null()])),
  color: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 16777215 }), t.Null()])),
  timestamp: t.Optional(t.Union([t.Date(), t.Null()])),
  description: t.Optional(t.Union([t.String({ maxLength: 4096 }), t.Null()])),
  author: t.Optional(t.Union([t.Null(), RichEmbedAuthorSchema])),
  image: t.Optional(t.Union([t.Null(), RichEmbedImageSchema])),
  thumbnail: t.Optional(t.Union([t.Null(), RichEmbedThumbnailSchema])),
  footer: t.Optional(t.Union([t.Null(), RichEmbedFooterSchema])),
  fields: t.Optional(t.Union([t.Array(RichEmbedFieldSchema, { maxItems: 25 }), t.Null()])),
  provider: t.Optional(t.Union([t.Null(), RichEmbedProviderSchema])),
  video: t.Optional(t.Union([t.Null(), RichEmbedVideoSchema])),
  audio: t.Optional(t.Union([t.Null(), RichEmbedAudioSchema])),
})

export const MessageAllowedMentionsRequestSchema = t.Object({
  parse: t.Optional(
    t.Union([
      t.Array(t.Union([t.Null(), AllowedMentionTypesSchema]), {
        maxItems: 1521,
        uniqueItems: true,
      }),
      t.Null(),
    ]),
  ),
  users: t.Optional(
    t.Union([
      t.Array(t.Union([t.Null(), SnowflakeTypeSchema]), { maxItems: 100, uniqueItems: true }),
      t.Null(),
    ]),
  ),
  roles: t.Optional(
    t.Union([
      t.Array(t.Union([t.Null(), SnowflakeTypeSchema]), { maxItems: 100, uniqueItems: true }),
      t.Null(),
    ]),
  ),
  replied_user: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const UnfurledMediaRequestWithAttachmentReferenceRequiredSchema = t.Object({
  url: t.String({ format: 'uri', maxLength: 2048 }),
})

export const FileComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  spoiler: t.Optional(t.Union([t.Boolean(), t.Null()])),
  file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
})

export const UnfurledMediaRequestSchema = t.Object({
  url: t.String({ format: 'uri', maxLength: 2048 }),
})

export const MediaGalleryItemForMessageRequestSchema = t.Object({
  description: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 1024 }), t.Null()])),
  spoiler: t.Optional(t.Union([t.Boolean(), t.Null()])),
  media: UnfurledMediaRequestSchema,
})

export const MediaGalleryComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  items: t.Array(MediaGalleryItemForMessageRequestSchema, { minItems: 1, maxItems: 10 }),
})

export const TextDisplayComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  content: t.String({ minLength: 1, maxLength: 4000 }),
})

export const ThumbnailComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  description: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 1024 }), t.Null()])),
  spoiler: t.Optional(t.Union([t.Boolean(), t.Null()])),
  media: UnfurledMediaRequestSchema,
})

export const SectionComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  components: t.Array(TextDisplayComponentForMessageRequestSchema, { minItems: 1, maxItems: 3 }),
  accessory: t.Union([
    ButtonComponentForMessageRequestSchema,
    ThumbnailComponentForMessageRequestSchema,
  ]),
})

export const MessageComponentSeparatorSpacingSizeSchema = t.Union([
  t.Literal(1, { title: 'SMALL', description: 'Small spacing' }),
  t.Literal(2, { title: 'LARGE', description: 'Large spacing' }),
])

export const SeparatorComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  spacing: t.Optional(t.Union([t.Null(), MessageComponentSeparatorSpacingSizeSchema])),
  divider: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const ContainerComponentForMessageRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  accent_color: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 16777215 }), t.Null()])),
  components: t.Array(
    t.Union([
      ActionRowComponentForMessageRequestSchema,
      FileComponentForMessageRequestSchema,
      MediaGalleryComponentForMessageRequestSchema,
      SectionComponentForMessageRequestSchema,
      SeparatorComponentForMessageRequestSchema,
      TextDisplayComponentForMessageRequestSchema,
    ]),
    { minItems: 1, maxItems: 40 },
  ),
  spoiler: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const MessageAttachmentRequestSchema = t.Object({
  id: SnowflakeTypeSchema,
  filename: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 1024 }), t.Null()])),
  description: t.Optional(t.Union([t.String({ maxLength: 1024 }), t.Null()])),
  duration_secs: t.Optional(
    t.Union([t.Number({ format: 'double', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  waveform: t.Optional(t.Union([t.String({ maxLength: 400 }), t.Null()])),
  title: t.Optional(t.Union([t.String({ maxLength: 1024 }), t.Null()])),
  is_spoiler: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const PollEmojiSchema = t.Object({
  id: t.Optional(
    t.Union([t.Null(), SnowflakeTypeSchema], { description: 'The ID of the custom emoji' }),
  ),
  name: t.Optional(
    t.Union([
      t.String({
        maxLength: 32,
        description: 'The name of the emoji, or the unicode emoji character',
      }),
      t.Null(),
    ]),
  ),
  animated: t.Optional(
    t.Union([t.Boolean({ description: 'Whether the emoji is animated' }), t.Null()]),
  ),
})

export const PollMediaSchema = t.Object({
  text: t.Optional(
    t.Union([
      t.String({ minLength: 1, maxLength: 300, description: 'The text of the field' }),
      t.Null(),
    ]),
  ),
  emoji: t.Optional(
    t.Union([t.Null(), PollEmojiSchema], { description: 'The emoji of the field' }),
  ),
})

export const PollEmojiCreateRequestSchema = t.Object({
  id: t.Optional(
    t.Union([t.Null(), SnowflakeTypeSchema], { description: 'The ID of the custom emoji' }),
  ),
  name: t.Optional(
    t.Union([
      t.String({
        maxLength: 32,
        description: 'The name of the emoji, or the unicode emoji character',
      }),
      t.Null(),
    ]),
  ),
  animated: t.Optional(
    t.Union([t.Boolean({ description: 'Whether the emoji is animated' }), t.Null()]),
  ),
})

export const PollMediaCreateRequestSchema = t.Object({
  text: t.Optional(
    t.Union([
      t.String({ minLength: 1, maxLength: 300, description: 'The text of the field' }),
      t.Null(),
    ]),
  ),
  emoji: t.Optional(
    t.Union([t.Null(), PollEmojiCreateRequestSchema], { description: 'The emoji of the field' }),
  ),
})

export const PollAnswerCreateRequestSchema = t.Object({ poll_media: PollMediaCreateRequestSchema })

export const PollLayoutTypesSchema = t.Literal(1, {
  title: 'DEFAULT',
  description: 'The, uhm, default layout type.',
})

export const PollCreateRequestSchema = t.Object({
  question: PollMediaSchema,
  answers: t.Array(PollAnswerCreateRequestSchema, {
    minItems: 1,
    maxItems: 10,
    description: 'Each of the answers available in the poll, up to 10',
  }),
  allow_multiselect: t.Optional(
    t.Union([t.Boolean({ description: 'Whether a user can select multiple answers' }), t.Null()]),
  ),
  layout_type: t.Optional(
    t.Union([t.Null(), PollLayoutTypesSchema], {
      description: 'The layout type of the poll. Defaults to... DEFAULT!',
    }),
  ),
  duration: t.Optional(
    t.Union([
      t.Integer({
        format: 'int32',
        minimum: 1,
        maximum: 768,
        description: 'Number of hours the poll should be open for, up to 32 days. Defaults to 24',
      }),
      t.Null(),
    ]),
  ),
})

export const MessageShareCustomUserThemeBaseThemeSchema = t.Union([
  t.Literal(0, { title: 'UNSET', description: 'No base theme' }),
  t.Literal(1, { title: 'DARK', description: 'Dark base theme' }),
  t.Literal(2, { title: 'LIGHT', description: 'Light base theme' }),
  t.Literal(3, { title: 'DARKER', description: 'Darker base theme' }),
  t.Literal(4, { title: 'MIDNIGHT', description: 'Midnight base theme' }),
])

export const CustomClientThemeShareRequestSchema = t.Object({
  colors: t.Array(t.String({ minLength: 6, maxLength: 6 }), { minItems: 1, maxItems: 5 }),
  gradient_angle: t.Integer({ format: 'int32', minimum: 0, maximum: 360 }),
  base_mix: t.Integer({ format: 'int32', minimum: 0, maximum: 100 }),
  base_theme: t.Optional(t.Union([t.Null(), MessageShareCustomUserThemeBaseThemeSchema])),
})

export const BaseCreateMessageCreateRequestSchema = t.Object({
  content: t.Optional(t.Union([t.String({ maxLength: 4000 }), t.Null()])),
  embeds: t.Optional(t.Union([t.Array(RichEmbedSchema, { maxItems: 10 }), t.Null()])),
  allowed_mentions: t.Optional(t.Union([t.Null(), MessageAllowedMentionsRequestSchema])),
  sticker_ids: t.Optional(t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 3 }), t.Null()])),
  components: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
        { maxItems: 40 },
      ),
      t.Null(),
    ]),
  ),
  flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  attachments: t.Optional(
    t.Union([t.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), t.Null()]),
  ),
  poll: t.Optional(t.Union([t.Null(), PollCreateRequestSchema])),
  shared_client_theme: t.Optional(t.Union([t.Null(), CustomClientThemeShareRequestSchema])),
})

export const BasicApplicationResponseWithBotSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  icon: t.Union([t.String(), t.Null()]),
  description: t.String(),
  type: t.Union([t.Null(), ApplicationTypesSchema]),
  cover_image: t.Optional(t.String()),
  primary_sku_id: t.Optional(SnowflakeTypeSchema),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  flags_new: t.String(),
  bot: t.Optional(UserResponseSchema),
})

export const BasicGuildMemberResponseSchema = t.Object({
  avatar: t.Union([t.String({ description: "the member's guild avatar hash" }), t.Null()]),
  avatar_decoration_data: t.Optional(
    t.Union([t.Null(), UserAvatarDecorationResponseSchema], {
      description: "data for the member's guild avatar decoration",
    }),
  ),
  banner: t.Union([t.String({ description: "the member's guild banner hash" }), t.Null()]),
  communication_disabled_until: t.Union([
    t.Date({
      description:
        "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
    }),
    t.Null(),
  ]),
  flags: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    description: 'guild member flags represented as a bit set, defaults to 0',
  }),
  joined_at: t.Date({ description: 'when the user joined the guild' }),
  nick: t.Union([t.String({ description: "this user's guild nickname" }), t.Null()]),
  pending: t.Boolean({
    description:
      "whether the user has not yet passed the guild's Membership Screening requirements",
  }),
  premium_since: t.Union([
    t.Date({ description: 'when the user started boosting the guild' }),
    t.Null(),
  ]),
  roles: t.Array(SnowflakeTypeSchema, {
    uniqueItems: true,
    description: 'array of role object ids',
  }),
  collectibles: t.Optional(
    t.Union([t.Null(), UserCollectiblesResponseSchema], {
      description: "data for the member's collectibles",
    }),
  ),
})

export const MessageTypeSchema = t.Union([
  t.Literal(0, { title: 'DEFAULT', description: '' }),
  t.Literal(1, { title: 'RECIPIENT_ADD', description: '' }),
  t.Literal(2, { title: 'RECIPIENT_REMOVE', description: '' }),
  t.Literal(3, { title: 'CALL', description: '' }),
  t.Literal(4, { title: 'CHANNEL_NAME_CHANGE', description: '' }),
  t.Literal(5, { title: 'CHANNEL_ICON_CHANGE', description: '' }),
  t.Literal(6, { title: 'CHANNEL_PINNED_MESSAGE', description: '' }),
  t.Literal(7, { title: 'USER_JOIN', description: '' }),
  t.Literal(8, { title: 'GUILD_BOOST', description: '' }),
  t.Literal(9, { title: 'GUILD_BOOST_TIER_1', description: '' }),
  t.Literal(10, { title: 'GUILD_BOOST_TIER_2', description: '' }),
  t.Literal(11, { title: 'GUILD_BOOST_TIER_3', description: '' }),
  t.Literal(12, { title: 'CHANNEL_FOLLOW_ADD', description: '' }),
  t.Literal(14, { title: 'GUILD_DISCOVERY_DISQUALIFIED', description: '' }),
  t.Literal(15, { title: 'GUILD_DISCOVERY_REQUALIFIED', description: '' }),
  t.Literal(16, { title: 'GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING', description: '' }),
  t.Literal(17, { title: 'GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING', description: '' }),
  t.Literal(18, { title: 'THREAD_CREATED', description: '' }),
  t.Literal(19, { title: 'REPLY', description: '' }),
  t.Literal(20, { title: 'CHAT_INPUT_COMMAND', description: '' }),
  t.Literal(21, { title: 'THREAD_STARTER_MESSAGE', description: '' }),
  t.Literal(22, { title: 'GUILD_INVITE_REMINDER', description: '' }),
  t.Literal(23, { title: 'CONTEXT_MENU_COMMAND', description: '' }),
  t.Literal(24, { title: 'AUTO_MODERATION_ACTION', description: '' }),
  t.Literal(25, { title: 'ROLE_SUBSCRIPTION_PURCHASE', description: '' }),
  t.Literal(26, { title: 'INTERACTION_PREMIUM_UPSELL', description: '' }),
  t.Literal(27, { title: 'STAGE_START', description: '' }),
  t.Literal(28, { title: 'STAGE_END', description: '' }),
  t.Literal(29, { title: 'STAGE_SPEAKER', description: '' }),
  t.Literal(31, { title: 'STAGE_TOPIC', description: '' }),
  t.Literal(32, { title: 'GUILD_APPLICATION_PREMIUM_SUBSCRIPTION', description: '' }),
  t.Literal(36, { title: 'GUILD_INCIDENT_ALERT_MODE_ENABLED', description: '' }),
  t.Literal(37, { title: 'GUILD_INCIDENT_ALERT_MODE_DISABLED', description: '' }),
  t.Literal(38, { title: 'GUILD_INCIDENT_REPORT_RAID', description: '' }),
  t.Literal(39, { title: 'GUILD_INCIDENT_REPORT_FALSE_ALARM', description: '' }),
  t.Literal(46, { title: 'POLL_RESULT', description: '' }),
  t.Literal(55, { title: 'HD_STREAMING_UPGRADED', description: '' }),
])

export const MessageAttachmentResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  filename: t.String(),
  size: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  url: t.String({ format: 'uri' }),
  proxy_url: t.String({ format: 'uri' }),
  width: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  height: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  duration_secs: t.Optional(t.Number({ format: 'double' })),
  waveform: t.Optional(t.String()),
  description: t.Optional(t.String()),
  content_type: t.Optional(t.String()),
  ephemeral: t.Optional(t.Boolean()),
  flags: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  placeholder: t.Optional(t.String()),
  placeholder_version: t.Optional(
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  title: t.Optional(t.Union([t.String(), t.Null()])),
  application: t.Optional(ApplicationResponseSchema),
  clip_created_at: t.Optional(t.Date()),
  clip_participants: t.Optional(t.Array(UserResponseSchema)),
})

export const MessageEmbedFieldResponseSchema = t.Object({
  name: t.String(),
  value: t.String(),
  inline: t.Boolean(),
})

export const MessageEmbedAuthorResponseSchema = t.Object({
  name: t.String(),
  url: t.Optional(t.String()),
  icon_url: t.Optional(t.String()),
  proxy_icon_url: t.Optional(t.String({ format: 'uri' })),
})

export const MessageEmbedProviderResponseSchema = t.Object({
  name: t.String(),
  url: t.Optional(t.String({ format: 'uri' })),
})

export const UInt32TypeSchema = t.Integer({ format: 'int64', minimum: 0, maximum: 4294967295 })

export const MessageEmbedImageResponseSchema = t.Object({
  url: t.Optional(t.String()),
  proxy_url: t.Optional(t.String({ format: 'uri' })),
  width: t.Optional(UInt32TypeSchema),
  height: t.Optional(UInt32TypeSchema),
  content_type: t.Optional(t.String()),
  placeholder: t.Optional(t.String()),
  placeholder_version: t.Optional(UInt32TypeSchema),
  description: t.Optional(t.String()),
  flags: t.Optional(UInt32TypeSchema),
})

export const MessageEmbedVideoResponseSchema = t.Object({
  url: t.Optional(t.String()),
  proxy_url: t.Optional(t.String({ format: 'uri' })),
  width: t.Optional(UInt32TypeSchema),
  height: t.Optional(UInt32TypeSchema),
  content_type: t.Optional(t.String()),
  placeholder: t.Optional(t.String()),
  placeholder_version: t.Optional(UInt32TypeSchema),
  description: t.Optional(t.String()),
  flags: t.Optional(UInt32TypeSchema),
})

export const MessageEmbedAudioResponseSchema = t.Object({
  url: t.Optional(t.String()),
  proxy_url: t.Optional(t.String({ format: 'uri' })),
  content_type: t.Optional(t.String()),
  description: t.Optional(t.String()),
})

export const MessageEmbedFooterResponseSchema = t.Object({
  text: t.String(),
  icon_url: t.Optional(t.String()),
  proxy_icon_url: t.Optional(t.String({ format: 'uri' })),
})

export const ContentScanMetadataResponseSchema = t.Object({
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const UnfurledMediaResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  url: t.String(),
  proxy_url: t.Optional(t.String()),
  width: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
  height: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
  placeholder: t.Optional(t.Union([t.String(), t.Null()])),
  placeholder_version: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
  content_scan_metadata: t.Optional(ContentScanMetadataResponseSchema),
  content_type: t.Optional(t.Union([t.String(), t.Null()])),
  flags: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  attachment_id: t.Optional(SnowflakeTypeSchema),
})

export const FileComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  file: UnfurledMediaResponseSchema,
  name: t.Union([t.String(), t.Null()]),
  size: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
  spoiler: t.Boolean(),
})

export const MediaGalleryItemResponseSchema = t.Object({
  media: UnfurledMediaResponseSchema,
  description: t.Union([t.String(), t.Null()]),
  spoiler: t.Boolean(),
})

export const MediaGalleryComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  items: t.Array(MediaGalleryItemResponseSchema),
})

export const TextDisplayComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  content: t.String(),
})

export const ThumbnailComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  media: UnfurledMediaResponseSchema,
  description: t.Union([t.String(), t.Null()]),
  spoiler: t.Boolean(),
})

export const SectionComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  components: t.Array(TextDisplayComponentResponseSchema),
  accessory: t.Union([ButtonComponentResponseSchema, ThumbnailComponentResponseSchema]),
})

export const SeparatorComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  spacing: MessageComponentSeparatorSpacingSizeSchema,
  divider: t.Boolean(),
})

export const ContainerComponentResponseSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  accent_color: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
  components: t.Array(
    t.Union([
      ActionRowComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  spoiler: t.Boolean(),
})

export const MessageEmbedResponseSchema = t.Object({
  type: t.String(),
  url: t.Optional(t.String({ format: 'uri' })),
  title: t.Optional(t.String()),
  description: t.Optional(t.String()),
  color: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  timestamp: t.Optional(t.Date()),
  fields: t.Optional(t.Array(MessageEmbedFieldResponseSchema)),
  author: t.Optional(MessageEmbedAuthorResponseSchema),
  provider: t.Optional(MessageEmbedProviderResponseSchema),
  image: t.Optional(MessageEmbedImageResponseSchema),
  thumbnail: t.Optional(MessageEmbedImageResponseSchema),
  video: t.Optional(MessageEmbedVideoResponseSchema),
  audio: t.Optional(MessageEmbedAudioResponseSchema),
  footer: t.Optional(MessageEmbedFooterResponseSchema),
  flags: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
  components: t.Optional(t.Array(ContainerComponentResponseSchema)),
})

export const StickerTypesSchema = t.Union([
  t.Literal(1, {
    title: 'STANDARD',
    description: 'an official sticker in a pack, part of Nitro or in a removed purchasable pack',
  }),
  t.Literal(2, {
    title: 'GUILD',
    description: "a sticker uploaded to a guild for the guild's members",
  }),
])

export const StickerFormatTypesSchema = t.Union([
  t.Literal(1, { title: 'PNG' }),
  t.Literal(2, { title: 'APNG' }),
  t.Literal(3, { title: 'LOTTIE' }),
  t.Literal(4, { title: 'GIF' }),
])

export const GuildStickerResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  tags: t.String(),
  type: StickerTypesSchema,
  format_type: t.Union([t.Null(), StickerFormatTypesSchema]),
  description: t.Union([t.String(), t.Null()]),
  available: t.Boolean(),
  guild_id: SnowflakeTypeSchema,
  user: t.Optional(UserResponseSchema),
})

export const StandardStickerResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  tags: t.String(),
  type: StickerTypesSchema,
  format_type: t.Union([t.Null(), StickerFormatTypesSchema]),
  description: t.Union([t.String(), t.Null()]),
  pack_id: SnowflakeTypeSchema,
  sort_value: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const MessageStickerItemResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  format_type: StickerFormatTypesSchema,
})

export const MessageCallResponseSchema = t.Object({
  ended_timestamp: t.Optional(t.Union([t.Date(), t.Null()])),
  participants: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
})

export const MessageActivityResponseSchema = t.Object({
  type: ActivityActionTypesSchema,
  party_id: t.Optional(t.String()),
})

export const MessageInteractionResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  name: t.String(),
  user: t.Optional(UserResponseSchema),
  name_localized: t.Optional(t.String()),
})

export const MessageReferenceTypeSchema = t.Literal(0, {
  title: 'DEFAULT',
  description: 'Reference to a message',
})

export const MessageReferenceResponseSchema = t.Object({
  type: MessageReferenceTypeSchema,
  channel_id: SnowflakeTypeSchema,
  message_id: t.Optional(SnowflakeTypeSchema),
  guild_id: t.Optional(SnowflakeTypeSchema),
})

export const VideoQualityModesSchema = t.Union([
  t.Literal(1, {
    title: 'AUTO',
    description: 'Discord chooses the quality for optimal performance',
  }),
  t.Literal(2, { title: 'FULL', description: '720p' }),
])

export const ThreadAutoArchiveDurationSchema = t.Union([
  t.Literal(60, { title: 'ONE_HOUR', description: 'One hour' }),
  t.Literal(1440, { title: 'ONE_DAY', description: 'One day' }),
  t.Literal(4320, { title: 'THREE_DAY', description: 'Three days' }),
  t.Literal(10080, { title: 'SEVEN_DAY', description: 'Seven days' }),
])

export const ThreadMetadataResponseSchema = t.Object({
  archived: t.Boolean(),
  archive_timestamp: t.Union([t.Date(), t.Null()]),
  auto_archive_duration: ThreadAutoArchiveDurationSchema,
  locked: t.Boolean(),
  create_timestamp: t.Optional(t.Date()),
  invitable: t.Optional(t.Boolean()),
})

export const GuildMemberResponseSchema = t.Object({
  avatar: t.Union([t.String({ description: "the member's guild avatar hash" }), t.Null()]),
  avatar_decoration_data: t.Optional(
    t.Union([t.Null(), UserAvatarDecorationResponseSchema], {
      description: "data for the member's guild avatar decoration",
    }),
  ),
  banner: t.Union([t.String({ description: "the member's guild banner hash" }), t.Null()]),
  communication_disabled_until: t.Union([
    t.Date({
      description:
        "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
    }),
    t.Null(),
  ]),
  flags: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    description: 'guild member flags represented as a bit set, defaults to 0',
  }),
  joined_at: t.Date({ description: 'when the user joined the guild' }),
  nick: t.Union([t.String({ description: "this user's guild nickname" }), t.Null()]),
  pending: t.Boolean({
    description:
      "whether the user has not yet passed the guild's Membership Screening requirements",
  }),
  premium_since: t.Union([
    t.Date({ description: 'when the user started boosting the guild' }),
    t.Null(),
  ]),
  roles: t.Array(SnowflakeTypeSchema, {
    uniqueItems: true,
    description: 'array of role object ids',
  }),
  collectibles: t.Optional(
    t.Union([t.Null(), UserCollectiblesResponseSchema], {
      description: "data for the member's collectibles",
    }),
  ),
  user: UserResponseSchema,
  mute: t.Boolean({ description: 'whether the user is muted in voice channels' }),
  deaf: t.Boolean({ description: 'whether the user is deafened in voice channels' }),
})

export const ThreadMemberResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  join_timestamp: t.Date(),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  member: t.Optional(GuildMemberResponseSchema),
})

export const ThreadResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  last_pin_timestamp: t.Optional(t.Union([t.Date(), t.Null()])),
  guild_id: SnowflakeTypeSchema,
  name: t.String(),
  parent_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  rate_limit_per_user: t.Optional(
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  bitrate: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  user_limit: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  rtc_region: t.Optional(t.Union([t.String(), t.Null()])),
  video_quality_mode: t.Optional(VideoQualityModesSchema),
  permissions: t.Optional(t.String()),
  owner_id: SnowflakeTypeSchema,
  thread_metadata: ThreadMetadataResponseSchema,
  message_count: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  member_count: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  total_message_sent: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  applied_tags: t.Optional(t.Array(SnowflakeTypeSchema)),
  member: t.Optional(ThreadMemberResponseSchema),
})

export const MessageMentionChannelResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  type: ChannelTypesSchema,
  guild_id: SnowflakeTypeSchema,
})

export const MessageRoleSubscriptionDataResponseSchema = t.Object({
  role_subscription_listing_id: SnowflakeTypeSchema,
  tier_name: t.String(),
  total_months_subscribed: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
  is_renewal: t.Boolean(),
})

export const PurchaseTypeSchema = t.Literal(0, { title: 'GUILD_PRODUCT' })

export const GuildProductPurchaseResponseSchema = t.Object({
  listing_id: SnowflakeTypeSchema,
  product_name: t.String(),
})

export const PurchaseNotificationResponseSchema = t.Object({
  type: PurchaseTypeSchema,
  guild_product_purchase: t.Optional(GuildProductPurchaseResponseSchema),
})

export const ChannelPermissionOverwritesSchema = t.Union([
  t.Literal(0, { title: 'ROLE' }),
  t.Literal(1, { title: 'MEMBER' }),
])

export const ChannelPermissionOverwriteResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: ChannelPermissionOverwritesSchema,
  allow: t.String(),
  deny: t.String(),
})

export const ForumTagResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  moderated: t.Boolean(),
  emoji_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  emoji_name: t.Union([t.String(), t.Null()]),
})

export const DefaultReactionEmojiResponseSchema = t.Object({
  emoji_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  emoji_name: t.Union([t.String(), t.Null()]),
})

export const ThreadSortOrderSchema = t.Union([
  t.Literal(0, { title: 'LATEST_ACTIVITY', description: 'Sort forum posts by activity' }),
  t.Literal(1, {
    title: 'CREATION_DATE',
    description: 'Sort forum posts by creation time (from most recent to oldest)',
  }),
])

export const ForumLayoutSchema = t.Union([
  t.Literal(0, { title: 'DEFAULT', description: 'No default has been set for forum channel' }),
  t.Literal(1, { title: 'LIST', description: 'Display posts as a list' }),
  t.Literal(2, { title: 'GRID', description: 'Display posts as a collection of tiles' }),
])

export const ThreadSearchTagSettingSchema = t.Union([
  t.Literal('match_all', {
    title: 'MATCH_ALL',
    description: 'The thread tags must contain all tags in the search query',
  }),
  t.Literal('match_some', {
    title: 'MATCH_SOME',
    description: 'The thread tags must contain at least one of tags in the search query',
  }),
])

export const GuildChannelResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  last_pin_timestamp: t.Optional(t.Union([t.Date(), t.Null()])),
  guild_id: SnowflakeTypeSchema,
  name: t.String(),
  parent_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  rate_limit_per_user: t.Optional(
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  bitrate: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  user_limit: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  rtc_region: t.Optional(t.Union([t.String(), t.Null()])),
  video_quality_mode: t.Optional(VideoQualityModesSchema),
  permissions: t.Optional(t.String()),
  topic: t.Optional(t.Union([t.String(), t.Null()])),
  default_auto_archive_duration: t.Optional(ThreadAutoArchiveDurationSchema),
  default_thread_rate_limit_per_user: t.Optional(
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  position: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  permission_overwrites: t.Optional(t.Array(ChannelPermissionOverwriteResponseSchema)),
  nsfw: t.Optional(t.Boolean()),
  available_tags: t.Optional(t.Array(ForumTagResponseSchema)),
  default_reaction_emoji: t.Optional(t.Union([t.Null(), DefaultReactionEmojiResponseSchema])),
  default_sort_order: t.Optional(t.Union([t.Null(), ThreadSortOrderSchema])),
  default_forum_layout: t.Optional(ForumLayoutSchema),
  default_tag_setting: t.Optional(t.Union([t.Null(), ThreadSearchTagSettingSchema])),
})

export const PrivateChannelResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  last_pin_timestamp: t.Optional(t.Union([t.Date(), t.Null()])),
  recipients: t.Array(UserResponseSchema),
})

export const PrivateGroupChannelResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  last_pin_timestamp: t.Optional(t.Union([t.Date(), t.Null()])),
  recipients: t.Array(UserResponseSchema),
  name: t.Union([t.String(), t.Null()]),
  icon: t.Union([t.String(), t.Null()]),
  owner_id: SnowflakeTypeSchema,
  managed: t.Optional(t.Boolean()),
  application_id: t.Optional(SnowflakeTypeSchema),
})

export const GuildRoleColorsResponseSchema = t.Object({
  primary_color: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  secondary_color: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
  tertiary_color: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
})

export const GuildRoleTagsResponseSchema = t.Object({
  premium_subscriber: t.Optional(t.Null()),
  bot_id: t.Optional(SnowflakeTypeSchema),
  integration_id: t.Optional(SnowflakeTypeSchema),
  subscription_listing_id: t.Optional(SnowflakeTypeSchema),
  available_for_purchase: t.Optional(t.Null()),
  guild_connections: t.Optional(t.Null()),
})

export const GuildRoleResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  permissions: t.String(),
  position: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  color: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  colors: GuildRoleColorsResponseSchema,
  hoist: t.Boolean(),
  managed: t.Boolean(),
  mentionable: t.Boolean(),
  icon: t.Union([t.String(), t.Null()]),
  unicode_emoji: t.Union([t.String(), t.Null()]),
  tags: t.Optional(GuildRoleTagsResponseSchema),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const ResolvedObjectsResponseSchema = t.Object({
  users: t.Optional(t.Union([t.Record(t.String(), UserResponseSchema), t.Null()])),
  members: t.Optional(t.Union([t.Record(t.String(), BasicGuildMemberResponseSchema), t.Null()])),
  channels: t.Optional(
    t.Union([
      t.Record(
        t.String(),
        t.Union([
          GuildChannelResponseSchema,
          PrivateChannelResponseSchema,
          PrivateGroupChannelResponseSchema,
          ThreadResponseSchema,
        ]),
      ),
      t.Null(),
    ]),
  ),
  roles: t.Optional(t.Union([t.Record(t.String(), GuildRoleResponseSchema), t.Null()])),
})

export const MessageReactionEmojiResponseSchema = t.Object({
  id: t.Union([t.Null(), SnowflakeTypeSchema]),
  name: t.Union([t.String(), t.Null()]),
  animated: t.Optional(t.Boolean()),
})

export const PollMediaResponseSchema = t.Object({
  text: t.Optional(t.String({ description: 'The text of the field' })),
  emoji: t.Optional(MessageReactionEmojiResponseSchema),
})

export const PollAnswerResponseSchema = t.Object({
  answer_id: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    description: 'The ID of the answer',
  }),
  poll_media: PollMediaResponseSchema,
})

export const PollResultsEntryResponseSchema = t.Object({
  id: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    description: 'The answer_id',
  }),
  count: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    description: 'The number of votes for this answer',
  }),
  me_voted: t.Boolean({ description: 'Whether the current user voted for this answer' }),
})

export const PollResultsResponseSchema = t.Object({
  answer_counts: t.Array(PollResultsEntryResponseSchema, {
    description: 'The counts for each answer',
  }),
  is_finalized: t.Boolean({ description: 'Whether the votes have been precisely counted' }),
})

export const PollResponseSchema = t.Object({
  question: PollMediaResponseSchema,
  answers: t.Array(PollAnswerResponseSchema, {
    description: 'Each of the answers available in the poll',
  }),
  expiry: t.Date({ description: 'The time when the poll ends' }),
  allow_multiselect: t.Boolean({ description: 'Whether a user can select multiple answers' }),
  layout_type: PollLayoutTypesSchema,
  results: PollResultsResponseSchema,
})

export const CustomClientThemeResponseSchema = t.Object({
  colors: t.Array(t.String()),
  gradient_angle: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  base_mix: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  base_theme: MessageShareCustomUserThemeBaseThemeSchema,
})

export const MessageComponentInteractionMetadataResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  user: t.Optional(UserResponseSchema),
  authorizing_integration_owners: t.Record(t.String(), SnowflakeTypeSchema),
  original_response_message_id: t.Optional(SnowflakeTypeSchema),
  interacted_message_id: SnowflakeTypeSchema,
})

export const ModalSubmitInteractionMetadataResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  user: t.Optional(UserResponseSchema),
  authorizing_integration_owners: t.Record(t.String(), SnowflakeTypeSchema),
  original_response_message_id: t.Optional(SnowflakeTypeSchema),
  triggering_interaction_metadata: t.Union([
    ApplicationCommandInteractionMetadataResponseSchema,
    MessageComponentInteractionMetadataResponseSchema,
  ]),
})

export const MinimalContentMessageResponseSchema = t.Object({
  type: MessageTypeSchema,
  content: t.String(),
  mentions: t.Array(UserResponseSchema),
  mention_roles: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  attachments: t.Array(MessageAttachmentResponseSchema),
  embeds: t.Array(MessageEmbedResponseSchema),
  timestamp: t.Date(),
  edited_timestamp: t.Union([t.Date(), t.Null()]),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  components: t.Array(
    t.Union([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: t.Optional(
    t.Array(t.Union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  ),
  sticker_items: t.Optional(t.Array(MessageStickerItemResponseSchema)),
})

export const MessageSnapshotResponseSchema = t.Object({
  message: MinimalContentMessageResponseSchema,
})

export const MessageLobbyMemberResponseSchema = t.Object({ additional_name: t.String() })

export const BasicMessageResponseSchema = t.Object({
  type: MessageTypeSchema,
  content: t.String(),
  mentions: t.Array(UserResponseSchema),
  mention_roles: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  attachments: t.Array(MessageAttachmentResponseSchema),
  embeds: t.Array(MessageEmbedResponseSchema),
  timestamp: t.Date(),
  edited_timestamp: t.Union([t.Date(), t.Null()]),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  components: t.Array(
    t.Union([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: t.Optional(
    t.Array(t.Union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  ),
  sticker_items: t.Optional(t.Array(MessageStickerItemResponseSchema)),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: t.Boolean(),
  mention_everyone: t.Boolean(),
  tts: t.Boolean(),
  call: t.Optional(MessageCallResponseSchema),
  activity: t.Optional(MessageActivityResponseSchema),
  application: t.Optional(BasicApplicationResponseWithBotSchema),
  application_id: t.Optional(SnowflakeTypeSchema),
  interaction: t.Optional(MessageInteractionResponseSchema),
  nonce: t.Optional(
    t.Union([
      t.Integer({ format: 'int64', minimum: -9223372036854776000, maximum: 9223372036854776000 }),
      t.String({ maxLength: 25 }),
    ]),
  ),
  webhook_id: t.Optional(SnowflakeTypeSchema),
  message_reference: t.Optional(MessageReferenceResponseSchema),
  thread: t.Optional(ThreadResponseSchema),
  mention_channels: t.Optional(t.Array(MessageMentionChannelResponseSchema)),
  role_subscription_data: t.Optional(MessageRoleSubscriptionDataResponseSchema),
  purchase_notification: t.Optional(PurchaseNotificationResponseSchema),
  position: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  resolved: t.Optional(ResolvedObjectsResponseSchema),
  poll: t.Optional(PollResponseSchema),
  shared_client_theme: t.Optional(CustomClientThemeResponseSchema),
  interaction_metadata: t.Optional(
    t.Union([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
      ModalSubmitInteractionMetadataResponseSchema,
    ]),
  ),
  message_snapshots: t.Optional(t.Array(MessageSnapshotResponseSchema)),
  lobby_member: t.Optional(MessageLobbyMemberResponseSchema),
  actor: t.Optional(UserResponseSchema),
})

export const BlockMessageActionMetadataSchema = t.Object({
  custom_message: t.Optional(t.Union([t.String({ maxLength: 300 }), t.Null()])),
})

export const BlockMessageActionSchema = t.Object({
  type: AutomodActionTypeSchema,
  metadata: t.Optional(t.Union([t.Null(), BlockMessageActionMetadataSchema])),
})

export const BlockMessageActionMetadataResponseSchema = t.Object({
  custom_message: t.Optional(t.String()),
})

export const BlockMessageActionResponseSchema = t.Object({
  type: AutomodActionTypeSchema,
  metadata: BlockMessageActionMetadataResponseSchema,
})

export const BotAccountPatchRequestSchema = t.Object({
  username: t.String({ minLength: 2, maxLength: 32 }),
  avatar: t.Optional(t.Union([t.String(), t.Null()])),
  banner: t.Optional(t.Union([t.String(), t.Null()])),
})

export const BotAddGuildMemberRequestSchema = t.Object({
  nick: t.Optional(t.Union([t.String({ maxLength: 32 }), t.Null()])),
  roles: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 250, uniqueItems: true }), t.Null()]),
  ),
  mute: t.Optional(t.Union([t.Boolean(), t.Null()])),
  deaf: t.Optional(t.Union([t.Boolean(), t.Null()])),
  access_token: t.String({ maxLength: 10240 }),
  flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
})

export const BulkBanUsersRequestSchema = t.Object({
  user_ids: t.Array(SnowflakeTypeSchema, { maxItems: 200, uniqueItems: true }),
  delete_message_seconds: t.Optional(
    t.Union([t.Integer({ minimum: 0, maximum: 604800 }), t.Null()]),
  ),
})

export const BulkBanUsersResponseSchema = t.Object({
  banned_users: t.Array(SnowflakeTypeSchema),
  failed_users: t.Array(SnowflakeTypeSchema),
})

export const BulkLobbyMemberRequestSchema = t.Object({
  id: SnowflakeTypeSchema,
  metadata: t.Optional(
    t.Union([t.Record(t.String(), t.String({ maxLength: 1024 }), { maxProperties: 25 }), t.Null()]),
  ),
  flags: t.Optional(t.Union([t.Null(), t.Literal(1)])),
  additional_name: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 80 }), t.Null()])),
  remove_member: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const RecurrenceRuleWeekdaysSchema = t.Union([
  t.Literal(0, { title: 'MONDAY' }),
  t.Literal(1, { title: 'TUESDAY' }),
  t.Literal(2, { title: 'WEDNESDAY' }),
  t.Literal(3, { title: 'THURSDAY' }),
  t.Literal(4, { title: 'FRIDAY' }),
  t.Literal(5, { title: 'SATURDAY' }),
  t.Literal(6, { title: 'SUNDAY' }),
])

export const ByNWeekdaySchema = t.Object({
  n: t.Integer({
    format: 'int32',
    minimum: 1,
    maximum: 5,
    description: 'The week to reoccur on (1-5, where 5 represents the last week)',
  }),
  day: RecurrenceRuleWeekdaysSchema,
})

export const ByNWeekdayResponseSchema = t.Object({
  n: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    description: 'The week to reoccur on (1-5, where 5 represents the last week)',
  }),
  day: RecurrenceRuleWeekdaysSchema,
})

export const ChannelFollowerResponseSchema = t.Object({
  channel_id: SnowflakeTypeSchema,
  webhook_id: SnowflakeTypeSchema,
})

export const WebhookSourceGuildResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  icon: t.Union([t.String(), t.Null()]),
  name: t.String(),
})

export const WebhookSourceChannelResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
})

export const ChannelFollowerWebhookResponseSchema = t.Object({
  application_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  avatar: t.Union([t.String(), t.Null()]),
  channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  guild_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  id: SnowflakeTypeSchema,
  name: t.String(),
  type: WebhookTypesSchema,
  user: t.Optional(UserResponseSchema),
  source_guild: t.Optional(WebhookSourceGuildResponseSchema),
  source_channel: t.Optional(WebhookSourceChannelResponseSchema),
})

export const ChannelPermissionOverwriteRequestSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: t.Optional(t.Union([t.Null(), ChannelPermissionOverwritesSchema])),
  allow: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  deny: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
})

export const ChannelSelectComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 150 }), t.Null()])),
  min_values: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 25 }), t.Null()])),
  max_values: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 25 }), t.Null()])),
  disabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  default_values: t.Optional(
    t.Union([t.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }), t.Null()]),
  ),
  channel_types: t.Optional(
    t.Union([t.Array(ChannelTypesSchema, { uniqueItems: true }), t.Null()]),
  ),
})

export const CheckboxComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  default: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const CheckboxGroupOptionForRequestSchema = t.Object({
  label: t.String({ minLength: 1, maxLength: 100 }),
  value: t.String({ minLength: 1, maxLength: 100 }),
  description: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  default: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const CheckboxGroupComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  min_values: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 10 }), t.Null()])),
  max_values: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 10 }), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  options: t.Array(CheckboxGroupOptionForRequestSchema, { minItems: 1, maxItems: 10 }),
})

export const CommandPermissionResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: ApplicationCommandPermissionTypeSchema,
  permission: t.Boolean(),
})

export const CommandPermissionsResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  permissions: t.Array(CommandPermissionResponseSchema),
})

export const ConnectedAccountGuildResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  icon: t.Union([t.String(), t.Null()]),
})

export const IntegrationTypesSchema = t.Union([
  t.Literal('discord', { title: 'DISCORD' }),
  t.Literal('twitch', { title: 'TWITCH' }),
  t.Literal('youtube', { title: 'YOUTUBE' }),
  t.Literal('guild_subscription', { title: 'GUILD_SUBSCRIPTION' }),
])

export const ConnectedAccountIntegrationResponseSchema = t.Object({
  id: t.String(),
  type: IntegrationTypesSchema,
  account: AccountResponseSchema,
  guild: ConnectedAccountGuildResponseSchema,
})

export const ConnectedAccountProvidersSchema = t.Union([
  t.Literal('battlenet', { title: 'BATTLENET' }),
  t.Literal('bluesky', { title: 'BLUESKY' }),
  t.Literal('bungie', { title: 'BUNGIE' }),
  t.Literal('ebay', { title: 'EBAY' }),
  t.Literal('epicgames', { title: 'EPIC_GAMES' }),
  t.Literal('facebook', { title: 'FACEBOOK' }),
  t.Literal('github', { title: 'GITHUB' }),
  t.Literal('instagram', { title: 'INSTAGRAM' }),
  t.Literal('letterboxd', { title: 'LETTERBOXD' }),
  t.Literal('mastodon', { title: 'MASTODON' }),
  t.Literal('leagueoflegends', { title: 'LEAGUE_OF_LEGENDS' }),
  t.Literal('paypal', { title: 'PAYPAL' }),
  t.Literal('playstation', { title: 'PLAYSTATION' }),
  t.Literal('reddit', { title: 'REDDIT' }),
  t.Literal('riotgames', { title: 'RIOT_GAMES' }),
  t.Literal('roblox', { title: 'ROBLOX' }),
  t.Literal('skype', { title: 'SKYPE' }),
  t.Literal('spotify', { title: 'SPOTIFY' }),
  t.Literal('steam', { title: 'STEAM' }),
  t.Literal('tiktok', { title: 'TIKTOK' }),
  t.Literal('twitch', { title: 'TWITCH' }),
  t.Literal('twitter', { title: 'TWITTER' }),
  t.Literal('xbox', { title: 'XBOX' }),
  t.Literal('youtube', { title: 'YOUTUBE' }),
  t.Literal('domain', { title: 'DOMAIN' }),
])

export const ConnectedAccountVisibilitySchema = t.Union([
  t.Literal(0, { title: 'NONE' }),
  t.Literal(1, { title: 'EVERYONE' }),
])

export const ConnectedAccountResponseSchema = t.Object({
  id: t.String(),
  name: t.Union([t.String(), t.Null()]),
  type: ConnectedAccountProvidersSchema,
  friend_sync: t.Boolean(),
  integrations: t.Optional(t.Array(ConnectedAccountIntegrationResponseSchema)),
  show_activity: t.Boolean(),
  two_way_link: t.Boolean(),
  verified: t.Boolean(),
  visibility: ConnectedAccountVisibilitySchema,
  revoked: t.Optional(t.Boolean()),
})

export const EntitlementOwnerTypesSchema = t.Union([
  t.Literal(1, { title: 'GUILD', description: 'A guild subscription' }),
  t.Literal(2, { title: 'USER', description: 'A user subscription' }),
])

export const CreateEntitlementRequestDataSchema = t.Object({
  sku_id: SnowflakeTypeSchema,
  owner_id: SnowflakeTypeSchema,
  owner_type: EntitlementOwnerTypesSchema,
})

export const CreateForumThreadRequestSchema = t.Object({
  name: t.String({ minLength: 1, maxLength: 100 }),
  auto_archive_duration: t.Optional(t.Union([t.Null(), ThreadAutoArchiveDurationSchema])),
  rate_limit_per_user: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 21600 }), t.Null()]),
  ),
  applied_tags: t.Optional(t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 5 }), t.Null()])),
  message: BaseCreateMessageCreateRequestSchema,
})

export const CreateGroupDMInviteRequestSchema = t.Object({
  max_age: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 2592000 }), t.Null()])),
})

export const UpdateDefaultReactionEmojiRequestSchema = t.Object({
  emoji_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  emoji_name: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
})

export const CreateOrUpdateThreadTagRequestSchema = t.Object({
  name: t.String({ minLength: 0, maxLength: 50 }),
  emoji_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  emoji_name: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  moderated: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const CreateGuildChannelRequestSchema = t.Object({
  type: t.Optional(t.Union([t.Null(), ChannelTypesSchema])),
  name: t.String({ minLength: 1, maxLength: 100 }),
  position: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  topic: t.Optional(t.Union([t.String({ minLength: 0, maxLength: 4096 }), t.Null()])),
  bitrate: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 8000, maximum: 2147483647 }), t.Null()]),
  ),
  user_limit: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  nsfw: t.Optional(t.Union([t.Boolean(), t.Null()])),
  rate_limit_per_user: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 21600 }), t.Null()])),
  parent_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  permission_overwrites: t.Optional(
    t.Union([t.Array(ChannelPermissionOverwriteRequestSchema, { maxItems: 100 }), t.Null()]),
  ),
  rtc_region: t.Optional(t.Union([t.String(), t.Null()])),
  video_quality_mode: t.Optional(t.Union([t.Null(), VideoQualityModesSchema])),
  default_auto_archive_duration: t.Optional(t.Union([t.Null(), ThreadAutoArchiveDurationSchema])),
  default_reaction_emoji: t.Optional(t.Union([t.Null(), UpdateDefaultReactionEmojiRequestSchema])),
  default_thread_rate_limit_per_user: t.Optional(
    t.Union([t.Integer({ minimum: 0, maximum: 21600 }), t.Null()]),
  ),
  default_sort_order: t.Optional(t.Union([t.Null(), ThreadSortOrderSchema])),
  default_forum_layout: t.Optional(t.Union([t.Null(), ForumLayoutSchema])),
  default_tag_setting: t.Optional(t.Union([t.Null(), ThreadSearchTagSettingSchema])),
  available_tags: t.Optional(
    t.Union([
      t.Array(t.Union([t.Null(), CreateOrUpdateThreadTagRequestSchema]), { maxItems: 20 }),
      t.Null(),
    ]),
  ),
})

export const InviteTargetTypesSchema = t.Union([
  t.Literal(1, { title: 'STREAM' }),
  t.Literal(2, { title: 'EMBEDDED_APPLICATION' }),
  t.Literal(3, { title: 'ROLE_SUBSCRIPTIONS_PURCHASE' }),
])

export const CreateGuildInviteRequestSchema = t.Object({
  max_age: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 5184000 }), t.Null()])),
  temporary: t.Optional(t.Union([t.Boolean(), t.Null()])),
  max_uses: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 100 }), t.Null()])),
  unique: t.Optional(t.Union([t.Boolean(), t.Null()])),
  target_user_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  target_application_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  target_type: t.Optional(t.Union([t.Null(), InviteTargetTypesSchema])),
  role_ids: t.Optional(
    t.Union([
      t.String(),
      t.Array(SnowflakeTypeSchema, { maxItems: 250, uniqueItems: true }),
      t.Null(),
    ]),
  ),
  target_user_ids: t.Optional(
    t.Union(
      [t.String(), t.Array(SnowflakeTypeSchema, { maxItems: 1000, uniqueItems: true }), t.Null()],
      { description: 'The IDs of the users to target with this invite.' },
    ),
  ),
})

export const IncomingWebhookInteractionRequestSchema = t.Object({
  content: t.Optional(t.Union([t.String({ maxLength: 2000 }), t.Null()])),
  embeds: t.Optional(t.Union([t.Array(RichEmbedSchema, { maxItems: 10 }), t.Null()])),
  allowed_mentions: t.Optional(t.Union([t.Null(), MessageAllowedMentionsRequestSchema])),
  components: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
        { maxItems: 40 },
      ),
      t.Null(),
    ]),
  ),
  attachments: t.Optional(
    t.Union([t.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), t.Null()]),
  ),
  poll: t.Optional(t.Union([t.Null(), PollCreateRequestSchema])),
  tts: t.Optional(t.Union([t.Boolean(), t.Null()])),
  flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
})

export const CreateMessageInteractionCallbackRequestSchema = t.Object({
  type: InteractionCallbackTypesSchema,
  data: t.Optional(t.Union([t.Null(), IncomingWebhookInteractionRequestSchema])),
})

export const MessageReactionCountDetailsResponseSchema = t.Object({
  burst: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  normal: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const MessageReactionResponseSchema = t.Object({
  emoji: MessageReactionEmojiResponseSchema,
  count: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  count_details: MessageReactionCountDetailsResponseSchema,
  burst_colors: t.Array(t.String()),
  me_burst: t.Boolean(),
  me: t.Boolean(),
})

export const MessageResponseSchema = t.Object({
  type: MessageTypeSchema,
  content: t.String(),
  mentions: t.Array(UserResponseSchema),
  mention_roles: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  attachments: t.Array(MessageAttachmentResponseSchema),
  embeds: t.Array(MessageEmbedResponseSchema),
  timestamp: t.Date(),
  edited_timestamp: t.Union([t.Date(), t.Null()]),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  components: t.Array(
    t.Union([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: t.Optional(
    t.Array(t.Union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  ),
  sticker_items: t.Optional(t.Array(MessageStickerItemResponseSchema)),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: t.Boolean(),
  mention_everyone: t.Boolean(),
  tts: t.Boolean(),
  call: t.Optional(MessageCallResponseSchema),
  activity: t.Optional(MessageActivityResponseSchema),
  application: t.Optional(BasicApplicationResponseWithBotSchema),
  application_id: t.Optional(SnowflakeTypeSchema),
  interaction: t.Optional(MessageInteractionResponseSchema),
  nonce: t.Optional(
    t.Union([
      t.Integer({ format: 'int64', minimum: -9223372036854776000, maximum: 9223372036854776000 }),
      t.String({ maxLength: 25 }),
    ]),
  ),
  webhook_id: t.Optional(SnowflakeTypeSchema),
  message_reference: t.Optional(MessageReferenceResponseSchema),
  thread: t.Optional(ThreadResponseSchema),
  mention_channels: t.Optional(t.Array(MessageMentionChannelResponseSchema)),
  role_subscription_data: t.Optional(MessageRoleSubscriptionDataResponseSchema),
  purchase_notification: t.Optional(PurchaseNotificationResponseSchema),
  position: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  resolved: t.Optional(ResolvedObjectsResponseSchema),
  poll: t.Optional(PollResponseSchema),
  shared_client_theme: t.Optional(CustomClientThemeResponseSchema),
  interaction_metadata: t.Optional(
    t.Union([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
      ModalSubmitInteractionMetadataResponseSchema,
    ]),
  ),
  message_snapshots: t.Optional(t.Array(MessageSnapshotResponseSchema)),
  lobby_member: t.Optional(MessageLobbyMemberResponseSchema),
  actor: t.Optional(UserResponseSchema),
  reactions: t.Optional(t.Array(MessageReactionResponseSchema)),
  referenced_message: t.Optional(t.Union([t.Null(), BasicMessageResponseSchema])),
})

export const CreateMessageInteractionCallbackResponseSchema = t.Object({
  type: InteractionCallbackTypesSchema,
  message: MessageResponseSchema,
})

export const CreatePrivateChannelRequestSchema = t.Object({
  recipient_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  access_tokens: t.Optional(
    t.Union([
      t.Array(t.String({ maxLength: 152133 }), { maxItems: 1521, uniqueItems: true }),
      t.Null(),
    ]),
  ),
  nicks: t.Optional(
    t.Union([
      t.Record(t.String(), t.Union([t.String({ maxLength: 152133 }), t.Null()]), {
        maxProperties: 1521,
      }),
      t.Null(),
    ]),
  ),
})

export const RoleColorsSchema = t.Object({
  primary_color: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 16777215 }), t.Null()])),
  secondary_color: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 16777215 }), t.Null()])),
  tertiary_color: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 16777215 }), t.Null()])),
})

export const CreateRoleRequestSchema = t.Object({
  name: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 100 }), t.Null()])),
  permissions: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  color: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 16777215 }), t.Null()])),
  colors: t.Optional(t.Union([t.Null(), RoleColorsSchema])),
  hoist: t.Optional(t.Union([t.Boolean(), t.Null()])),
  mentionable: t.Optional(t.Union([t.Boolean(), t.Null()])),
  icon: t.Optional(t.Union([t.String(), t.Null()])),
  unicode_emoji: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
})

export const CreateTextThreadWithMessageRequestSchema = t.Object({
  name: t.String({ minLength: 1, maxLength: 100 }),
  auto_archive_duration: t.Optional(t.Union([t.Null(), ThreadAutoArchiveDurationSchema])),
  rate_limit_per_user: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 21600 }), t.Null()]),
  ),
})

export const CreateTextThreadWithoutMessageRequestSchema = t.Object({
  name: t.String({ minLength: 1, maxLength: 100 }),
  auto_archive_duration: t.Optional(t.Union([t.Null(), ThreadAutoArchiveDurationSchema])),
  rate_limit_per_user: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 21600 }), t.Null()]),
  ),
  type: t.Optional(t.Union([t.Null(), ChannelTypesSchema])),
  invitable: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const CreatedThreadResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  last_pin_timestamp: t.Optional(t.Union([t.Date(), t.Null()])),
  guild_id: SnowflakeTypeSchema,
  name: t.String(),
  parent_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  rate_limit_per_user: t.Optional(
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  bitrate: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  user_limit: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  rtc_region: t.Optional(t.Union([t.String(), t.Null()])),
  video_quality_mode: t.Optional(VideoQualityModesSchema),
  permissions: t.Optional(t.String()),
  owner_id: SnowflakeTypeSchema,
  thread_metadata: ThreadMetadataResponseSchema,
  message_count: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  member_count: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  total_message_sent: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  applied_tags: t.Optional(t.Array(SnowflakeTypeSchema)),
  member: t.Optional(ThreadMemberResponseSchema),
})

export const DefaultKeywordListTriggerMetadataSchema = t.Object({
  allow_list: t.Optional(
    t.Union([t.Array(t.String({ minLength: 1, maxLength: 60 }), { maxItems: 1000 }), t.Null()]),
  ),
  presets: t.Optional(
    t.Union([t.Array(AutomodKeywordPresetTypeSchema, { uniqueItems: true }), t.Null()]),
  ),
})

export const DefaultKeywordListTriggerMetadataResponseSchema = t.Object({
  allow_list: t.Array(t.String()),
  presets: t.Array(AutomodKeywordPresetTypeSchema, { uniqueItems: true }),
})

export const FlagToChannelActionMetadataSchema = t.Object({ channel_id: SnowflakeTypeSchema })

export const FlagToChannelActionSchema = t.Object({
  type: AutomodActionTypeSchema,
  metadata: FlagToChannelActionMetadataSchema,
})

export const QuarantineUserActionMetadataSchema = t.Object({})

export const QuarantineUserActionSchema = t.Object({
  type: AutomodActionTypeSchema,
  metadata: t.Optional(t.Union([t.Null(), QuarantineUserActionMetadataSchema])),
})

export const UserCommunicationDisabledActionMetadataSchema = t.Object({
  duration_seconds: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 2419200 }), t.Null()])),
})

export const UserCommunicationDisabledActionSchema = t.Object({
  type: AutomodActionTypeSchema,
  metadata: UserCommunicationDisabledActionMetadataSchema,
})

export const DefaultKeywordListUpsertRequestSchema = t.Object({
  name: t.String({ maxLength: 100 }),
  event_type: AutomodEventTypeSchema,
  actions: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
        { minItems: 1, maxItems: 5 },
      ),
      t.Null(),
    ]),
  ),
  enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  exempt_roles: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }), t.Null()]),
  ),
  exempt_channels: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }), t.Null()]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: DefaultKeywordListTriggerMetadataSchema,
})

export const DefaultKeywordListUpsertRequestPartialSchema = t.Object({
  name: t.Optional(t.String({ maxLength: 100 })),
  event_type: t.Optional(AutomodEventTypeSchema),
  actions: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
        { minItems: 1, maxItems: 5 },
      ),
      t.Null(),
    ]),
  ),
  enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  exempt_roles: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }), t.Null()]),
  ),
  exempt_channels: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }), t.Null()]),
  ),
  trigger_type: t.Optional(AutomodTriggerTypeSchema),
  trigger_metadata: t.Optional(DefaultKeywordListTriggerMetadataSchema),
})

export const FlagToChannelActionMetadataResponseSchema = t.Object({
  channel_id: SnowflakeTypeSchema,
})

export const FlagToChannelActionResponseSchema = t.Object({
  type: AutomodActionTypeSchema,
  metadata: FlagToChannelActionMetadataResponseSchema,
})

export const QuarantineUserActionMetadataResponseSchema = t.Object({})

export const QuarantineUserActionResponseSchema = t.Object({
  type: AutomodActionTypeSchema,
  metadata: QuarantineUserActionMetadataResponseSchema,
})

export const UserCommunicationDisabledActionMetadataResponseSchema = t.Object({
  duration_seconds: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const UserCommunicationDisabledActionResponseSchema = t.Object({
  type: AutomodActionTypeSchema,
  metadata: UserCommunicationDisabledActionMetadataResponseSchema,
})

export const DefaultKeywordRuleResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: t.String(),
  event_type: AutomodEventTypeSchema,
  actions: t.Array(
    t.Union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: t.Boolean(),
  exempt_roles: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  exempt_channels: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  trigger_metadata: DefaultKeywordListTriggerMetadataResponseSchema,
})

export const IntegrationApplicationResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  icon: t.Union([t.String(), t.Null()]),
  description: t.String(),
  type: t.Union([t.Null(), ApplicationTypesSchema]),
  cover_image: t.Optional(t.String()),
  primary_sku_id: t.Optional(SnowflakeTypeSchema),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  flags_new: t.String(),
  bot: t.Optional(UserResponseSchema),
})

export const DiscordIntegrationResponseSchema = t.Object({
  type: IntegrationTypesSchema,
  name: t.Union([t.String(), t.Null()]),
  account: AccountResponseSchema,
  enabled: t.Boolean(),
  id: SnowflakeTypeSchema,
  application: IntegrationApplicationResponseSchema,
  scopes: t.Array(OAuth2ScopesSchema, { uniqueItems: true }),
  user: t.Optional(UserResponseSchema),
})

export const EmbeddedActivityLocationKindSchema = t.Union([
  t.Literal('gc', { title: 'GUILD_CHANNEL', description: 'guild channel' }),
  t.Literal('pc', { title: 'PRIVATE_CHANNEL', description: 'private channel' }),
  t.Literal('party', { title: 'PARTY', description: 'party' }),
])

export const GuildChannelLocationSchema = t.Object({
  id: t.String(),
  kind: EmbeddedActivityLocationKindSchema,
  channel_id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
})

export const PrivateChannelLocationSchema = t.Object({
  id: t.String(),
  kind: EmbeddedActivityLocationKindSchema,
  channel_id: SnowflakeTypeSchema,
})

export const EmbeddedActivityInstanceSchema = t.Object({
  application_id: SnowflakeTypeSchema,
  instance_id: t.String(),
  launch_id: t.String(),
  location: t.Union([GuildChannelLocationSchema, PrivateChannelLocationSchema]),
  users: t.Array(SnowflakeTypeSchema),
})

export const EmojiResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  user: t.Optional(UserResponseSchema),
  roles: t.Array(SnowflakeTypeSchema),
  require_colons: t.Boolean(),
  managed: t.Boolean(),
  animated: t.Boolean(),
  available: t.Boolean(),
})

export const EntitlementTypesSchema = t.Union([
  t.Literal(8, { title: 'APPLICATION_SUBSCRIPTION' }),
  t.Literal(10, { title: 'QUEST_REWARD' }),
])

export const EntitlementTenantFulfillmentStatusResponseSchema = t.Union([
  t.Literal(0, { title: 'UNKNOWN' }),
  t.Literal(1, { title: 'FULFILLMENT_NOT_NEEDED' }),
  t.Literal(2, { title: 'FULFILLMENT_NEEDED' }),
  t.Literal(3, { title: 'FULFILLED' }),
  t.Literal(4, { title: 'FULFILLMENT_FAILED' }),
  t.Literal(5, { title: 'UNFULFILLMENT_NEEDED' }),
  t.Literal(6, { title: 'UNFULFILLED' }),
  t.Literal(7, { title: 'UNFULFILLMENT_FAILED' }),
])

export const EntitlementResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  sku_id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  guild_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  deleted: t.Boolean(),
  starts_at: t.Union([t.Date(), t.Null()]),
  ends_at: t.Union([t.Date(), t.Null()]),
  type: EntitlementTypesSchema,
  fulfilled_at: t.Optional(t.Union([t.Date(), t.Null()])),
  fulfillment_status: t.Optional(
    t.Union([t.Null(), EntitlementTenantFulfillmentStatusResponseSchema]),
  ),
  consumed: t.Optional(t.Boolean()),
  gifter_user_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  parent_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
})

export const EntityMetadataExternalSchema = t.Object({ location: t.String({ maxLength: 100 }) })

export const EntityMetadataExternalResponseSchema = t.Object({
  location: t.String({ description: 'Location of the external event' }),
})

export const EntityMetadataStageInstanceSchema = t.Object({})

export const EntityMetadataStageInstanceResponseSchema = t.Object({})

export const EntityMetadataVoiceSchema = t.Object({})

export const EntityMetadataVoiceResponseSchema = t.Object({})

export const IntegrationExpireBehaviorTypesSchema = t.Union([
  t.Literal(0, { title: 'REMOVE_ROLE', description: 'Remove role' }),
  t.Literal(1, { title: 'KICK', description: 'Kick' }),
])

export const IntegrationExpireGracePeriodTypesSchema = t.Union([
  t.Literal(1, { title: 'ONE_DAY', description: '1 day' }),
  t.Literal(3, { title: 'THREE_DAYS', description: '3 days' }),
  t.Literal(7, { title: 'SEVEN_DAYS', description: '7 days' }),
  t.Literal(14, { title: 'FOURTEEN_DAYS', description: '14 days' }),
  t.Literal(30, { title: 'THIRTY_DAYS', description: '30 days' }),
])

export const ExternalConnectionIntegrationResponseSchema = t.Object({
  type: IntegrationTypesSchema,
  name: t.Union([t.String(), t.Null()]),
  account: AccountResponseSchema,
  enabled: t.Boolean(),
  id: t.String(),
  user: UserResponseSchema,
  revoked: t.Optional(t.Boolean()),
  expire_behavior: t.Optional(IntegrationExpireBehaviorTypesSchema),
  expire_grace_period: t.Optional(IntegrationExpireGracePeriodTypesSchema),
  subscriber_count: t.Optional(
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  synced_at: t.Optional(t.Date()),
  role_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  syncing: t.Optional(t.Boolean()),
  enable_emoticons: t.Optional(t.Boolean()),
})

export const GuildScheduledEventPrivacyLevelsSchema = t.Literal(2, {
  title: 'GUILD_ONLY',
  description: 'the scheduled event is only accessible to guild members',
})

export const GuildScheduledEventEntityTypesSchema = t.Union([
  t.Literal(0, { title: 'NONE' }),
  t.Literal(1, { title: 'STAGE_INSTANCE' }),
  t.Literal(2, { title: 'VOICE' }),
  t.Literal(3, { title: 'EXTERNAL' }),
])

export const RecurrenceRuleFrequenciesSchema = t.Union([
  t.Literal(3, { title: 'DAILY' }),
  t.Literal(2, { title: 'WEEKLY' }),
  t.Literal(1, { title: 'MONTHLY' }),
  t.Literal(0, { title: 'YEARLY' }),
])

export const RecurrenceRuleMonthsSchema = t.Union([
  t.Literal(1, { title: 'JANUARY' }),
  t.Literal(2, { title: 'FEBRUARY' }),
  t.Literal(3, { title: 'MARCH' }),
  t.Literal(4, { title: 'APRIL' }),
  t.Literal(5, { title: 'MAY' }),
  t.Literal(6, { title: 'JUNE' }),
  t.Literal(7, { title: 'JULY' }),
  t.Literal(8, { title: 'AUGUST' }),
  t.Literal(9, { title: 'SEPTEMBER' }),
  t.Literal(10, { title: 'OCTOBER' }),
  t.Literal(11, { title: 'NOVEMBER' }),
  t.Literal(12, { title: 'DECEMBER' }),
])

export const RecurrenceRuleSchema = t.Object({
  start: t.Date({ description: 'Starting time of the recurrence interval' }),
  end: t.Optional(
    t.Union([t.Date({ description: 'Ending time of the recurrence interval' }), t.Null()]),
  ),
  frequency: RecurrenceRuleFrequenciesSchema,
  interval: t.Optional(
    t.Union([
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
        description: 'The spacing between events, defined by frequency',
      }),
      t.Null(),
    ]),
  ),
  by_weekday: t.Optional(
    t.Union([
      t.Array(RecurrenceRuleWeekdaysSchema, {
        maxItems: 7,
        uniqueItems: true,
        description: 'Set of specific days within a week for the event to recur on',
      }),
      t.Null(),
    ]),
  ),
  by_n_weekday: t.Optional(
    t.Union([
      t.Array(ByNWeekdaySchema, {
        maxItems: 7,
        description: 'List of specific days within a specific week to recur on',
      }),
      t.Null(),
    ]),
  ),
  by_month: t.Optional(
    t.Union([
      t.Array(RecurrenceRuleMonthsSchema, {
        maxItems: 12,
        uniqueItems: true,
        description: 'Set of specific months to recur on',
      }),
      t.Null(),
    ]),
  ),
  by_month_day: t.Optional(
    t.Union([
      t.Array(t.Integer({ format: 'int32', minimum: -1, maximum: 31 }), {
        maxItems: 33,
        uniqueItems: true,
        description: 'Set of specific dates within a month to recur on',
      }),
      t.Null(),
    ]),
  ),
  by_year_day: t.Optional(
    t.Union([
      t.Array(t.Integer({ format: 'int32', minimum: -1, maximum: 365 }), {
        maxItems: 367,
        uniqueItems: true,
        description: 'Set of days within a year to recur on (1-364)',
      }),
      t.Null(),
    ]),
  ),
  count: t.Optional(
    t.Union([
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
        description: 'Total number of times the event is allowed to recur',
      }),
      t.Null(),
    ]),
  ),
})

export const ExternalScheduledEventCreateRequestSchema = t.Object({
  name: t.String({ maxLength: 100 }),
  description: t.Optional(t.Union([t.String({ maxLength: 1000 }), t.Null()])),
  image: t.Optional(t.Union([t.String(), t.Null()])),
  scheduled_start_time: t.Date(),
  scheduled_end_time: t.Optional(t.Union([t.Date(), t.Null()])),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  recurrence_rule: t.Optional(
    t.Union([t.Null(), RecurrenceRuleSchema], {
      description: 'Recurrence rule for the scheduled event',
    }),
  ),
  entity_metadata: EntityMetadataExternalSchema,
})

export const GuildScheduledEventStatusesSchema = t.Union([
  t.Literal(1, { title: 'SCHEDULED' }),
  t.Literal(2, { title: 'ACTIVE' }),
  t.Literal(3, { title: 'COMPLETED' }),
  t.Literal(4, { title: 'CANCELED' }),
])

export const ExternalScheduledEventPatchRequestPartialSchema = t.Object({
  status: t.Optional(t.Union([t.Null(), GuildScheduledEventStatusesSchema])),
  name: t.Optional(t.String({ maxLength: 100 })),
  description: t.Optional(t.Union([t.String({ maxLength: 1000 }), t.Null()])),
  image: t.Optional(t.Union([t.String(), t.Null()])),
  scheduled_start_time: t.Optional(t.Date()),
  scheduled_end_time: t.Optional(t.Union([t.Date(), t.Null()])),
  entity_type: t.Optional(t.Union([t.Null(), GuildScheduledEventEntityTypesSchema])),
  privacy_level: t.Optional(GuildScheduledEventPrivacyLevelsSchema),
  channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  recurrence_rule: t.Optional(
    t.Union([t.Null(), RecurrenceRuleSchema], {
      description: 'Recurrence rule for the scheduled event',
    }),
  ),
  entity_metadata: t.Optional(EntityMetadataExternalSchema),
})

export const RecurrenceRuleResponseSchema = t.Object({
  start: t.Date({ description: 'Starting time of the recurrence interval' }),
  end: t.Optional(
    t.Union([t.Date({ description: 'Ending time of the recurrence interval' }), t.Null()]),
  ),
  frequency: RecurrenceRuleFrequenciesSchema,
  interval: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    description: 'The spacing between events, defined by frequency',
  }),
  by_weekday: t.Union([
    t.Array(RecurrenceRuleWeekdaysSchema, {
      uniqueItems: true,
      description: 'Set of specific days within a week for the event to recur on',
    }),
    t.Null(),
  ]),
  by_n_weekday: t.Union([
    t.Array(ByNWeekdayResponseSchema, {
      description: 'List of specific days within a specific week to recur on',
    }),
    t.Null(),
  ]),
  by_month: t.Union([
    t.Array(RecurrenceRuleMonthsSchema, {
      uniqueItems: true,
      description: 'Set of specific months to recur on',
    }),
    t.Null(),
  ]),
  by_month_day: t.Union([
    t.Array(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), {
      uniqueItems: true,
      description: 'Set of specific dates within a month to recur on',
    }),
    t.Null(),
  ]),
  by_year_day: t.Optional(
    t.Union([
      t.Array(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), {
        uniqueItems: true,
        description: 'Set of days within a year to recur on (1-364)',
      }),
      t.Null(),
    ]),
  ),
  count: t.Optional(
    t.Union([
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
        description: 'Total number of times the event is allowed to recur',
      }),
      t.Null(),
    ]),
  ),
})

export const GuildScheduledEventUserResponsesSchema = t.Union([
  t.Literal(0, { title: 'UNINTERESTED', description: 'User is not interested in the event' }),
  t.Literal(1, { title: 'INTERESTED', description: 'User is interested in the event' }),
])

export const ScheduledEventUserResponseSchema = t.Object({
  guild_scheduled_event_id: SnowflakeTypeSchema,
  guild_scheduled_event_exception_id: t.Optional(
    t.Union([t.Null(), SnowflakeTypeSchema], {
      description: 'ID of the scheduled event exception',
    }),
  ),
  user_id: SnowflakeTypeSchema,
  user: t.Optional(UserResponseSchema),
  member: t.Optional(GuildMemberResponseSchema),
  response: GuildScheduledEventUserResponsesSchema,
})

export const GuildScheduledEventExceptionResponseSchema = t.Object({
  event_id: SnowflakeTypeSchema,
  event_exception_id: SnowflakeTypeSchema,
  scheduled_start_time: t.Union([
    t.Date({ description: 'Overridden start time of this occurrence' }),
    t.Null(),
  ]),
  scheduled_end_time: t.Union([
    t.Date({ description: 'Overridden end time of this occurrence' }),
    t.Null(),
  ]),
  is_canceled: t.Boolean({ description: 'Whether this occurrence is canceled' }),
})

export const ExternalScheduledEventResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  name: t.String({ description: 'Name of the scheduled event' }),
  description: t.Union([t.String({ description: 'Description of the scheduled event' }), t.Null()]),
  channel_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description:
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
  }),
  creator_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description: 'ID of the user that created the scheduled event',
  }),
  creator: t.Optional(UserResponseSchema),
  image: t.Union([t.String({ description: 'Cover image hash of the scheduled event' }), t.Null()]),
  scheduled_start_time: t.Date({ description: 'When the scheduled event will start' }),
  scheduled_end_time: t.Union([
    t.Date({ description: 'When the scheduled event will end, or null if no end time' }),
    t.Null(),
  ]),
  status: GuildScheduledEventStatusesSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  entity_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description: 'ID of the hosting entity associated with the scheduled event',
  }),
  recurrence_rule: t.Union([t.Null(), RecurrenceRuleResponseSchema], {
    description: 'Recurrence rule for the scheduled event, or null if not recurring',
  }),
  user_count: t.Optional(
    t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'Number of users subscribed to the scheduled event',
    }),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  user_rsvp: t.Optional(t.Union([t.Null(), ScheduledEventUserResponseSchema])),
  guild_scheduled_event_exceptions: t.Array(GuildScheduledEventExceptionResponseSchema),
  entity_metadata: EntityMetadataExternalResponseSchema,
})

export const FileUploadComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  min_values: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 10 }), t.Null()])),
  max_values: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 10 }), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  file_types: t.Optional(
    t.Union([
      t.Array(t.String({ minLength: 1, maxLength: 16 }), { maxItems: 10, uniqueItems: true }),
      t.Null(),
    ]),
  ),
})

export const InviteTypesSchema = t.Union([
  t.Literal(0, { title: 'GUILD' }),
  t.Literal(1, { title: 'GROUP_DM' }),
  t.Literal(2, { title: 'FRIEND' }),
])

export const InviteChannelRecipientResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  username: t.String(),
  avatar: t.Union([t.String(), t.Null()]),
})

export const InviteChannelResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  name: t.Union([t.String(), t.Null()]),
  icon: t.Optional(t.String()),
  nsfw: t.Optional(t.Boolean()),
  recipients: t.Optional(t.Array(InviteChannelRecipientResponseSchema)),
})

export const FriendInviteResponseSchema = t.Object({
  type: InviteTypesSchema,
  code: t.String(),
  inviter: t.Optional(UserResponseSchema),
  max_age: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  created_at: t.Optional(t.Date()),
  expires_at: t.Union([t.Date(), t.Null()]),
  friends_count: t.Optional(
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  channel: t.Union([t.Null(), InviteChannelResponseSchema]),
  is_contact: t.Optional(t.Boolean()),
  uses: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  max_uses: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  flags: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
})

export const GatewayBotSessionStartLimitResponseSchema = t.Object({
  max_concurrency: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  remaining: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  reset_after: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  total: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const GatewayBotResponseSchema = t.Object({
  url: t.String({ format: 'uri' }),
  session_start_limit: GatewayBotSessionStartLimitResponseSchema,
  shards: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const GatewayResponseSchema = t.Object({ url: t.String({ format: 'uri' }) })

export const GithubAuthorSchema = t.Object({
  username: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  name: t.String({ maxLength: 152133 }),
})

export const GithubCheckAppSchema = t.Object({ name: t.String({ maxLength: 152133 }) })

export const GithubCheckPullRequestSchema = t.Object({
  number: t.Integer({ maximum: 9007199254740991 }),
})

export const GithubCheckSuiteSchema = t.Object({
  conclusion: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  head_branch: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  head_sha: t.String({ maxLength: 152133 }),
  pull_requests: t.Optional(
    t.Union([t.Array(GithubCheckPullRequestSchema, { maxItems: 1521 }), t.Null()]),
  ),
  app: GithubCheckAppSchema,
})

export const GithubCheckRunOutputSchema = t.Object({
  title: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  summary: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
})

export const GithubCheckRunSchema = t.Object({
  conclusion: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  name: t.String({ maxLength: 152133 }),
  html_url: t.String({ format: 'uri', maxLength: 2048 }),
  check_suite: GithubCheckSuiteSchema,
  details_url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  output: t.Optional(t.Union([t.Null(), GithubCheckRunOutputSchema])),
  pull_requests: t.Optional(
    t.Union([t.Array(GithubCheckPullRequestSchema, { maxItems: 1521 }), t.Null()]),
  ),
})

export const GithubUserSchema = t.Object({
  id: t.Integer({ maximum: 9007199254740991 }),
  login: t.String({ maxLength: 152133 }),
  html_url: t.String({ format: 'uri', maxLength: 2048 }),
  avatar_url: t.String({ format: 'uri', maxLength: 2048 }),
})

export const GithubCommentSchema = t.Object({
  id: t.Integer({ maximum: 9007199254740991 }),
  html_url: t.String({ format: 'uri', maxLength: 2048 }),
  user: GithubUserSchema,
  commit_id: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  body: t.String({ maxLength: 152133 }),
})

export const GithubCommitSchema = t.Object({
  id: t.String({ maxLength: 152133 }),
  url: t.String({ format: 'uri', maxLength: 2048 }),
  message: t.String({ maxLength: 152133 }),
  author: GithubAuthorSchema,
})

export const GithubDiscussionSchema = t.Object({
  title: t.String({ maxLength: 152133 }),
  number: t.Integer({ maximum: 9007199254740991 }),
  html_url: t.String({ format: 'uri', maxLength: 2048 }),
  answer_html_url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  body: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  user: GithubUserSchema,
})

export const GithubIssueSchema = t.Object({
  id: t.Integer({ maximum: 9007199254740991 }),
  number: t.Integer({ maximum: 9007199254740991 }),
  html_url: t.String({ format: 'uri', maxLength: 2048 }),
  user: GithubUserSchema,
  title: t.String({ maxLength: 152133 }),
  body: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  pull_request: t.Optional(t.Unknown()),
})

export const GithubReleaseSchema = t.Object({
  id: t.Integer({ maximum: 9007199254740991 }),
  tag_name: t.String({ maxLength: 152133 }),
  html_url: t.String({ format: 'uri', maxLength: 2048 }),
  author: GithubUserSchema,
})

export const GithubRepositorySchema = t.Object({
  id: t.Integer({ maximum: 9007199254740991 }),
  html_url: t.String({ format: 'uri', maxLength: 2048 }),
  name: t.String({ maxLength: 152133 }),
  full_name: t.String({ maxLength: 152133 }),
})

export const GithubReviewSchema = t.Object({
  user: GithubUserSchema,
  body: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  html_url: t.String({ format: 'uri', maxLength: 2048 }),
  state: t.String({ maxLength: 152133 }),
})

export const GithubWebhookSchema = t.Object({
  action: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  ref: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  ref_type: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  comment: t.Optional(t.Union([t.Null(), GithubCommentSchema])),
  issue: t.Optional(t.Union([t.Null(), GithubIssueSchema])),
  pull_request: t.Optional(t.Union([t.Null(), GithubIssueSchema])),
  repository: t.Optional(t.Union([t.Null(), GithubRepositorySchema])),
  forkee: t.Optional(t.Union([t.Null(), GithubRepositorySchema])),
  sender: GithubUserSchema,
  member: t.Optional(t.Union([t.Null(), GithubUserSchema])),
  release: t.Optional(t.Union([t.Null(), GithubReleaseSchema])),
  head_commit: t.Optional(t.Union([t.Null(), GithubCommitSchema])),
  commits: t.Optional(t.Union([t.Array(GithubCommitSchema, { maxItems: 1521 }), t.Null()])),
  forced: t.Optional(t.Union([t.Boolean(), t.Null()])),
  compare: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  review: t.Optional(t.Union([t.Null(), GithubReviewSchema])),
  check_run: t.Optional(t.Union([t.Null(), GithubCheckRunSchema])),
  check_suite: t.Optional(t.Union([t.Null(), GithubCheckSuiteSchema])),
  discussion: t.Optional(t.Union([t.Null(), GithubDiscussionSchema])),
  answer: t.Optional(t.Union([t.Null(), GithubCommentSchema])),
})

export const GroupDMInviteResponseSchema = t.Object({
  type: InviteTypesSchema,
  code: t.String(),
  inviter: t.Optional(UserResponseSchema),
  max_age: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  created_at: t.Optional(t.Date()),
  expires_at: t.Union([t.Date(), t.Null()]),
  channel: InviteChannelResponseSchema,
  approximate_member_count: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
})

export const PartialDiscordIntegrationResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: t.Union([t.String(), t.Null()]),
  account: AccountResponseSchema,
  application_id: SnowflakeTypeSchema,
})

export const PartialExternalConnectionIntegrationResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: t.Union([t.String(), t.Null()]),
  account: AccountResponseSchema,
})

export const PartialGuildSubscriptionIntegrationResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: t.Union([t.String(), t.Null()]),
  account: AccountResponseSchema,
})

export const GuildIncomingWebhookResponseSchema = t.Object({
  application_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  avatar: t.Union([t.String(), t.Null()]),
  channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  guild_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  id: SnowflakeTypeSchema,
  name: t.String(),
  type: WebhookTypesSchema,
  user: t.Optional(UserResponseSchema),
  token: t.Optional(t.String()),
  url: t.Optional(t.String({ format: 'uri' })),
})

export const StageScheduledEventResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  name: t.String({ description: 'Name of the scheduled event' }),
  description: t.Union([t.String({ description: 'Description of the scheduled event' }), t.Null()]),
  channel_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description:
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
  }),
  creator_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description: 'ID of the user that created the scheduled event',
  }),
  creator: t.Optional(UserResponseSchema),
  image: t.Union([t.String({ description: 'Cover image hash of the scheduled event' }), t.Null()]),
  scheduled_start_time: t.Date({ description: 'When the scheduled event will start' }),
  scheduled_end_time: t.Union([
    t.Date({ description: 'When the scheduled event will end, or null if no end time' }),
    t.Null(),
  ]),
  status: GuildScheduledEventStatusesSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  entity_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description: 'ID of the hosting entity associated with the scheduled event',
  }),
  recurrence_rule: t.Union([t.Null(), RecurrenceRuleResponseSchema], {
    description: 'Recurrence rule for the scheduled event, or null if not recurring',
  }),
  user_count: t.Optional(
    t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'Number of users subscribed to the scheduled event',
    }),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  user_rsvp: t.Optional(t.Union([t.Null(), ScheduledEventUserResponseSchema])),
  guild_scheduled_event_exceptions: t.Array(GuildScheduledEventExceptionResponseSchema),
  entity_metadata: t.Union([t.Null(), EntityMetadataStageInstanceResponseSchema]),
})

export const VoiceScheduledEventResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  name: t.String({ description: 'Name of the scheduled event' }),
  description: t.Union([t.String({ description: 'Description of the scheduled event' }), t.Null()]),
  channel_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description:
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
  }),
  creator_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description: 'ID of the user that created the scheduled event',
  }),
  creator: t.Optional(UserResponseSchema),
  image: t.Union([t.String({ description: 'Cover image hash of the scheduled event' }), t.Null()]),
  scheduled_start_time: t.Date({ description: 'When the scheduled event will start' }),
  scheduled_end_time: t.Union([
    t.Date({ description: 'When the scheduled event will end, or null if no end time' }),
    t.Null(),
  ]),
  status: GuildScheduledEventStatusesSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  entity_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description: 'ID of the hosting entity associated with the scheduled event',
  }),
  recurrence_rule: t.Union([t.Null(), RecurrenceRuleResponseSchema], {
    description: 'Recurrence rule for the scheduled event, or null if not recurring',
  }),
  user_count: t.Optional(
    t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'Number of users subscribed to the scheduled event',
    }),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  user_rsvp: t.Optional(t.Union([t.Null(), ScheduledEventUserResponseSchema])),
  guild_scheduled_event_exceptions: t.Array(GuildScheduledEventExceptionResponseSchema),
  entity_metadata: t.Union([t.Null(), EntityMetadataVoiceResponseSchema]),
})

export const KeywordTriggerMetadataResponseSchema = t.Object({
  keyword_filter: t.Array(t.String()),
  regex_patterns: t.Array(t.String()),
  allow_list: t.Array(t.String()),
})

export const KeywordRuleResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: t.String(),
  event_type: AutomodEventTypeSchema,
  actions: t.Array(
    t.Union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: t.Boolean(),
  exempt_roles: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  exempt_channels: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  trigger_metadata: KeywordTriggerMetadataResponseSchema,
})

export const MLSpamTriggerMetadataResponseSchema = t.Object({})

export const MLSpamRuleResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: t.String(),
  event_type: AutomodEventTypeSchema,
  actions: t.Array(
    t.Union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: t.Boolean(),
  exempt_roles: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  exempt_channels: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  trigger_metadata: MLSpamTriggerMetadataResponseSchema,
})

export const MentionSpamTriggerMetadataResponseSchema = t.Object({
  mention_total_limit: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  mention_raid_protection_enabled: t.Boolean(),
})

export const MentionSpamRuleResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: t.String(),
  event_type: AutomodEventTypeSchema,
  actions: t.Array(
    t.Union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: t.Boolean(),
  exempt_roles: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  exempt_channels: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  trigger_metadata: MentionSpamTriggerMetadataResponseSchema,
})

export const UserProfileMetadataResponseSchema = t.Object({
  keyword_filter: t.Array(t.String()),
  regex_patterns: t.Array(t.String()),
  allow_list: t.Array(t.String()),
})

export const UserProfileRuleResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: t.String(),
  event_type: AutomodEventTypeSchema,
  actions: t.Array(
    t.Union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: t.Boolean(),
  exempt_roles: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  exempt_channels: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  trigger_metadata: UserProfileMetadataResponseSchema,
})

export const GuildAuditLogResponseSchema = t.Object({
  audit_log_entries: t.Array(AuditLogEntryResponseSchema),
  users: t.Array(UserResponseSchema),
  integrations: t.Array(
    t.Union([
      PartialDiscordIntegrationResponseSchema,
      PartialExternalConnectionIntegrationResponseSchema,
      PartialGuildSubscriptionIntegrationResponseSchema,
    ]),
  ),
  webhooks: t.Array(
    t.Union([
      ApplicationIncomingWebhookResponseSchema,
      ChannelFollowerWebhookResponseSchema,
      GuildIncomingWebhookResponseSchema,
    ]),
  ),
  guild_scheduled_events: t.Array(
    t.Union([
      ExternalScheduledEventResponseSchema,
      StageScheduledEventResponseSchema,
      VoiceScheduledEventResponseSchema,
    ]),
  ),
  threads: t.Array(ThreadResponseSchema),
  application_commands: t.Array(ApplicationCommandResponseSchema),
  auto_moderation_rules: t.Array(
    t.Union([
      DefaultKeywordRuleResponseSchema,
      KeywordRuleResponseSchema,
      MLSpamRuleResponseSchema,
      MentionSpamRuleResponseSchema,
      UserProfileRuleResponseSchema,
      t.Null(),
    ]),
  ),
})

export const GuildBanResponseSchema = t.Object({
  user: UserResponseSchema,
  reason: t.Union([t.String(), t.Null()]),
})

export const GuildExplicitContentFilterTypesSchema = t.Union([
  t.Literal(0, { title: 'DISABLED', description: 'media content will not be scanned' }),
  t.Literal(1, {
    title: 'MEMBERS_WITHOUT_ROLES',
    description: 'media content sent by members without roles will be scanned',
  }),
  t.Literal(2, {
    title: 'ALL_MEMBERS',
    description: 'media content sent by all members will be scanned',
  }),
])

export const GuildFeaturesSchema = t.Union([
  t.Literal('ANIMATED_BANNER', {
    title: 'ANIMATED_BANNER',
    description: 'guild has access to set an animated guild banner image',
  }),
  t.Literal('ANIMATED_ICON', {
    title: 'ANIMATED_ICON',
    description: 'guild has access to set an animated guild icon',
  }),
  t.Literal('APPLICATION_COMMAND_PERMISSIONS_V2', {
    title: 'APPLICATION_COMMAND_PERMISSIONS_V2',
    description: 'guild is using the old permissions configuration behavior',
  }),
  t.Literal('AUTO_MODERATION', {
    title: 'AUTO_MODERATION',
    description: 'guild has set up auto moderation rules',
  }),
  t.Literal('BANNER', {
    title: 'BANNER',
    description: 'guild has access to set a guild banner image',
  }),
  t.Literal('COMMUNITY', {
    title: 'COMMUNITY',
    description:
      'guild can enable welcome screen, Membership Screening, stage channels and discovery, and             receives community updates',
  }),
  t.Literal('CREATOR_MONETIZABLE_PROVISIONAL', {
    title: 'CREATOR_MONETIZABLE_PROVISIONAL',
    description: 'guild has enabled monetization',
  }),
  t.Literal('CREATOR_STORE_PAGE', {
    title: 'CREATOR_STORE_PAGE',
    description: 'guild has enabled the role subscription promo page',
  }),
  t.Literal('DEVELOPER_SUPPORT_SERVER', {
    title: 'DEVELOPER_SUPPORT_SERVER',
    description: 'guild has been set as a support server on the App Directory',
  }),
  t.Literal('DISCOVERABLE', {
    title: 'DISCOVERABLE',
    description: 'guild is able to be discovered in the directory',
  }),
  t.Literal('FEATURABLE', {
    title: 'FEATURABLE',
    description: 'guild is able to be featured in the directory',
  }),
  t.Literal('INVITES_DISABLED', {
    title: 'INVITES_DISABLED',
    description: 'guild has paused invites, preventing new users from joining',
  }),
  t.Literal('INVITE_SPLASH', {
    title: 'INVITE_SPLASH',
    description: 'guild has access to set an invite splash background',
  }),
  t.Literal('MEMBER_VERIFICATION_GATE_ENABLED', {
    title: 'MEMBER_VERIFICATION_GATE_ENABLED',
    description: 'guild has enabled Membership Screening',
  }),
  t.Literal('MORE_STICKERS', {
    title: 'MORE_STICKERS',
    description: 'guild has increased custom sticker slots',
  }),
  t.Literal('NEWS', {
    title: 'NEWS',
    description: 'guild has access to create announcement channels',
  }),
  t.Literal('PARTNERED', { title: 'PARTNERED', description: 'guild is partnered' }),
  t.Literal('PREVIEW_ENABLED', {
    title: 'PREVIEW_ENABLED',
    description: 'guild can be previewed before joining via Membership Screening or the directory',
  }),
  t.Literal('RAID_ALERTS_DISABLED', {
    title: 'RAID_ALERTS_DISABLED',
    description: 'guild has disabled activity alerts in the configured safety alerts channel',
  }),
  t.Literal('PRUNE_REQUIRES_ADMIN', {
    title: 'PRUNE_REQUIRES_ADMIN',
    description: 'guild has restricted member prune to administrators and the guild owner',
  }),
  t.Literal('ROLE_ICONS', { title: 'ROLE_ICONS', description: 'guild is able to set role icons' }),
  t.Literal('ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE', {
    title: 'ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE',
    description: 'guild has role subscriptions that can be purchased',
  }),
  t.Literal('ROLE_SUBSCRIPTIONS_ENABLED', {
    title: 'ROLE_SUBSCRIPTIONS_ENABLED',
    description: 'guild has enabled role subscriptions',
  }),
  t.Literal('TICKETED_EVENTS_ENABLED', {
    title: 'TICKETED_EVENTS_ENABLED',
    description: 'guild has enabled ticketed events',
  }),
  t.Literal('VANITY_URL', {
    title: 'VANITY_URL',
    description: 'guild has access to set a vanity URL',
  }),
  t.Literal('VERIFIED', { title: 'VERIFIED', description: 'guild is verified' }),
  t.Literal('VIP_REGIONS', {
    title: 'VIP_REGIONS',
    description: 'guild has access to set 384kbps bitrate in voice (previously VIP voice servers)',
  }),
  t.Literal('WELCOME_SCREEN_ENABLED', {
    title: 'WELCOME_SCREEN_ENABLED',
    description: 'guild has enabled the welcome screen',
  }),
  t.Literal('OFFICIAL_GAME_GUILD', {
    title: 'OFFICIAL_GAME_GUILD',
    description: 'guild is an official guild for one or more games',
  }),
])

export const WelcomeMessageResponseSchema = t.Object({
  author_ids: t.Array(SnowflakeTypeSchema),
  message: t.String(),
})

export const NewMemberActionTypeSchema = t.Union([
  t.Literal(0, { title: 'VIEW' }),
  t.Literal(1, { title: 'TALK' }),
])

export const SettingsEmojiResponseSchema = t.Object({
  id: t.Union([t.Null(), SnowflakeTypeSchema]),
  name: t.Union([t.String(), t.Null()]),
  animated: t.Boolean(),
})

export const NewMemberActionResponseSchema = t.Object({
  channel_id: SnowflakeTypeSchema,
  action_type: NewMemberActionTypeSchema,
  title: t.String(),
  description: t.String(),
  emoji: t.Optional(SettingsEmojiResponseSchema),
  icon: t.Optional(t.String()),
})

export const ResourceChannelResponseSchema = t.Object({
  channel_id: SnowflakeTypeSchema,
  title: t.String(),
  emoji: t.Optional(SettingsEmojiResponseSchema),
  icon: t.Optional(t.String()),
  description: t.String(),
})

export const GuildHomeSettingsResponseSchema = t.Object({
  guild_id: SnowflakeTypeSchema,
  enabled: t.Boolean(),
  welcome_message: t.Optional(WelcomeMessageResponseSchema),
  new_member_actions: t.Array(NewMemberActionResponseSchema),
  resource_channels: t.Array(ResourceChannelResponseSchema),
})

export const GuildIncidentActionsRequestSchema = t.Object({
  invites_disabled_until: t.Optional(
    t.Union([t.Date({ description: 'When invites will be enabled again' }), t.Null()]),
  ),
  dms_disabled_until: t.Optional(
    t.Union([t.Date({ description: 'When direct messages will be enabled again' }), t.Null()]),
  ),
})

export const GuildIncidentsDataResponseSchema = t.Object({
  invites_disabled_until: t.Union([
    t.Date({ description: 'When invites get enabled again' }),
    t.Null(),
  ]),
  dms_disabled_until: t.Union([
    t.Date({ description: 'When direct messages get enabled again' }),
    t.Null(),
  ]),
})

export const VerificationLevelsSchema = t.Union([
  t.Literal(0, { title: 'NONE', description: 'unrestricted' }),
  t.Literal(1, { title: 'LOW', description: 'must have verified email on account' }),
  t.Literal(2, {
    title: 'MEDIUM',
    description: 'must be registered on Discord for longer than 5 minutes',
  }),
  t.Literal(3, {
    title: 'HIGH',
    description: 'must be a member of the server for longer than 10 minutes',
  }),
  t.Literal(4, { title: 'VERY_HIGH', description: 'must have a verified phone number' }),
])

export const GuildNSFWContentLevelSchema = t.Union([
  t.Literal(0, { title: 'DEFAULT' }),
  t.Literal(1, { title: 'EXPLICIT' }),
  t.Literal(2, { title: 'SAFE' }),
  t.Literal(3, { title: 'AGE_RESTRICTED' }),
])

export const InviteGuildResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  splash: t.Union([t.String(), t.Null()]),
  banner: t.Union([t.String(), t.Null()]),
  description: t.Union([t.String(), t.Null()]),
  icon: t.Union([t.String(), t.Null()]),
  features: t.Array(GuildFeaturesSchema, { uniqueItems: true }),
  verification_level: t.Union([t.Null(), VerificationLevelsSchema]),
  vanity_url_code: t.Union([t.String(), t.Null()]),
  nsfw_level: t.Union([t.Null(), GuildNSFWContentLevelSchema]),
  nsfw: t.Union([t.Boolean(), t.Null()]),
  premium_subscription_count: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
})

export const InviteApplicationResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  icon: t.Union([t.String(), t.Null()]),
  description: t.String(),
  type: t.Union([t.Null(), ApplicationTypesSchema]),
  cover_image: t.Optional(t.String()),
  primary_sku_id: t.Optional(SnowflakeTypeSchema),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  flags_new: t.String(),
  bot: t.Optional(UserResponseSchema),
  slug: t.Optional(t.String()),
  conjure_project_id: t.Optional(SnowflakeTypeSchema),
  vibegrations_project_id: t.Optional(SnowflakeTypeSchema),
  guild_id: t.Optional(SnowflakeTypeSchema),
  rpc_origins: t.Optional(t.Array(t.String())),
  bot_public: t.Optional(t.Boolean()),
  bot_require_code_grant: t.Optional(t.Boolean()),
  terms_of_service_url: t.Optional(t.String({ format: 'uri' })),
  privacy_policy_url: t.Optional(t.String({ format: 'uri' })),
  custom_install_url: t.Optional(t.String({ format: 'uri' })),
  install_params: t.Optional(ApplicationOAuth2InstallParamsResponseSchema),
  integration_types_config: t.Optional(
    t.Record(t.String(), ApplicationIntegrationTypeConfigurationResponseSchema),
  ),
  verify_key: t.String(),
  max_participants: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
  tags: t.Optional(t.Array(t.String(), { uniqueItems: true })),
})

export const ScheduledEventResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  name: t.String({ description: 'Name of the scheduled event' }),
  description: t.Union([t.String({ description: 'Description of the scheduled event' }), t.Null()]),
  channel_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description:
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
  }),
  creator_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description: 'ID of the user that created the scheduled event',
  }),
  creator: t.Optional(UserResponseSchema),
  image: t.Union([t.String({ description: 'Cover image hash of the scheduled event' }), t.Null()]),
  scheduled_start_time: t.Date({ description: 'When the scheduled event will start' }),
  scheduled_end_time: t.Union([
    t.Date({ description: 'When the scheduled event will end, or null if no end time' }),
    t.Null(),
  ]),
  status: GuildScheduledEventStatusesSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  entity_id: t.Union([t.Null(), SnowflakeTypeSchema], {
    description: 'ID of the hosting entity associated with the scheduled event',
  }),
  recurrence_rule: t.Union([t.Null(), RecurrenceRuleResponseSchema], {
    description: 'Recurrence rule for the scheduled event, or null if not recurring',
  }),
  user_count: t.Optional(
    t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'Number of users subscribed to the scheduled event',
    }),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  user_rsvp: t.Optional(t.Union([t.Null(), ScheduledEventUserResponseSchema])),
  guild_scheduled_event_exceptions: t.Array(GuildScheduledEventExceptionResponseSchema),
})

export const InviteGuildRoleResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  position: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  color: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  colors: GuildRoleColorsResponseSchema,
  icon: t.Union([t.String(), t.Null()]),
  unicode_emoji: t.Union([t.String(), t.Null()]),
  permissions: t.Optional(t.String()),
})

export const GuildInviteResponseSchema = t.Object({
  type: InviteTypesSchema,
  code: t.String(),
  inviter: t.Optional(UserResponseSchema),
  max_age: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  created_at: t.Optional(t.Date()),
  expires_at: t.Union([t.Date(), t.Null()]),
  is_contact: t.Optional(t.Boolean()),
  flags: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  guild: InviteGuildResponseSchema,
  guild_id: SnowflakeTypeSchema,
  channel: InviteChannelResponseSchema,
  target_type: t.Optional(InviteTargetTypesSchema),
  target_user: t.Optional(UserResponseSchema),
  target_application: t.Optional(InviteApplicationResponseSchema),
  guild_scheduled_event: t.Optional(ScheduledEventResponseSchema),
  target_channel_id: t.Optional(SnowflakeTypeSchema),
  target_message_id: t.Optional(SnowflakeTypeSchema),
  uses: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  max_uses: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  temporary: t.Optional(t.Boolean()),
  approximate_member_count: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
  approximate_presence_count: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
  is_nickname_changeable: t.Optional(t.Boolean()),
  roles: t.Optional(t.Union([t.Array(InviteGuildRoleResponseSchema), t.Null()])),
})

export const GuildJoinRequestApplicationStatusSchema = t.Union([
  t.Literal('STARTED', {
    title: 'STARTED',
    description: 'Applicant started but not yet submitted join request',
  }),
  t.Literal('SUBMITTED', {
    title: 'SUBMITTED',
    description: 'Applicant submitted join request that is awaiting review',
  }),
  t.Literal('REJECTED', { title: 'REJECTED', description: 'Join request rejected' }),
  t.Literal('APPROVED', { title: 'APPROVED', description: 'Join request approved' }),
])

export const GuildMemberVerificationFormFieldTypeSchema = t.Union([
  t.Literal('TERMS', {
    title: 'TERMS',
    description: 'Field requiring applicant to acknowledge list of terms',
  }),
  t.Literal('TEXT_INPUT', { title: 'TEXT_INPUT', description: 'Short text input field' }),
  t.Literal('PARAGRAPH', { title: 'PARAGRAPH', description: 'Long-form text input field' }),
  t.Literal('MULTIPLE_CHOICE', {
    title: 'MULTIPLE_CHOICE',
    description: 'Field where applicant selects one of many options',
  }),
])

export const MultipleChoiceFormFieldResponseSchema = t.Object({
  field_type: GuildMemberVerificationFormFieldTypeSchema,
  label: t.Optional(t.String({ description: 'Label shown above field' })),
  description: t.Optional(t.String({ description: 'Optional helper text shown below label' })),
  required: t.Optional(t.Boolean({ description: 'Whether applicant must fill in field' })),
  choices: t.Array(t.String(), { description: 'Choices applicant can select from' }),
  response: t.Optional(
    t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'Index of choice selected by applicant',
    }),
  ),
})

export const ParagraphFormFieldResponseSchema = t.Object({
  field_type: GuildMemberVerificationFormFieldTypeSchema,
  label: t.Optional(t.String({ description: 'Label shown above field' })),
  description: t.Optional(t.String({ description: 'Optional helper text shown below label' })),
  required: t.Optional(t.Boolean({ description: 'Whether applicant must fill in field' })),
  placeholder: t.Optional(t.String({ description: 'Placeholder text shown in empty input' })),
  response: t.Optional(t.String({ description: "Applicant's text response" })),
})

export const TermsFormFieldResponseSchema = t.Object({
  field_type: GuildMemberVerificationFormFieldTypeSchema,
  label: t.Optional(t.String({ description: 'Label shown above field' })),
  description: t.Optional(t.String({ description: 'Optional helper text shown below label' })),
  required: t.Optional(t.Boolean({ description: 'Whether applicant must fill in field' })),
  values: t.Array(t.String(), { description: 'Terms applicant must acknowledge' }),
  response: t.Optional(t.Boolean({ description: 'Whether applicant accepted terms' })),
})

export const TextInputFormFieldResponseSchema = t.Object({
  field_type: GuildMemberVerificationFormFieldTypeSchema,
  label: t.Optional(t.String({ description: 'Label shown above field' })),
  description: t.Optional(t.String({ description: 'Optional helper text shown below label' })),
  required: t.Optional(t.Boolean({ description: 'Whether applicant must fill in field' })),
  placeholder: t.Optional(t.String({ description: 'Placeholder text shown in empty input' })),
  response: t.Optional(t.String({ description: "Applicant's text response" })),
})

export const GuildJoinRequestResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  created_at: t.Date(),
  reviewed_at: t.Union([t.Date(), t.Null()]),
  application_status: t.Union([t.Null(), GuildJoinRequestApplicationStatusSchema]),
  rejection_reason: t.Union([
    t.String({
      description: 'Reason request was rejected. Only set when application_status is REJECTED',
    }),
    t.Null(),
  ]),
  guild_id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  user: t.Optional(t.Union([t.Null(), UserResponseSchema])),
  form_responses: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          MultipleChoiceFormFieldResponseSchema,
          ParagraphFormFieldResponseSchema,
          TermsFormFieldResponseSchema,
          TextInputFormFieldResponseSchema,
        ]),
        { description: "Applicant's responses on join request form" },
      ),
      t.Null(),
    ]),
  ),
  actioned_by_user: t.Optional(t.Union([t.Null(), UserResponseSchema])),
})

export const GuildJoinRequestsListResponseSchema = t.Object({
  total: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  guild_join_requests: t.Optional(t.Array(GuildJoinRequestResponseSchema)),
})

export const GuildMFALevelSchema = t.Union([
  t.Literal(0, {
    title: 'NONE',
    description: 'Guild has no MFA/2FA requirement for moderation actions',
  }),
  t.Literal(1, {
    title: 'ELEVATED',
    description: 'Guild has a 2FA requirement for moderation actions',
  }),
])

export const GuildOnboardingModeSchema = t.Union([
  t.Literal(0, {
    title: 'ONBOARDING_DEFAULT',
    description: 'Only Default Channels considered in constraints',
  }),
  t.Literal(1, {
    title: 'ONBOARDING_ADVANCED',
    description: 'Default Channels and Onboarding Prompts considered in constraints',
  }),
])

export const OnboardingPromptOptionResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  title: t.String(),
  description: t.String(),
  emoji: SettingsEmojiResponseSchema,
  role_ids: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  channel_ids: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
})

export const OnboardingPromptTypeSchema = t.Union([
  t.Literal(0, { title: 'MULTIPLE_CHOICE', description: 'Multiple choice options' }),
  t.Literal(1, { title: 'DROPDOWN', description: 'Many options shown as a dropdown' }),
])

export const OnboardingPromptResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  title: t.String(),
  options: t.Array(OnboardingPromptOptionResponseSchema),
  single_select: t.Boolean(),
  required: t.Boolean(),
  in_onboarding: t.Boolean(),
  type: OnboardingPromptTypeSchema,
})

export const GuildOnboardingResponseSchema = t.Object({
  guild_id: SnowflakeTypeSchema,
  prompts: t.Array(OnboardingPromptResponseSchema),
  default_channel_ids: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  enabled: t.Boolean(),
  mode: GuildOnboardingModeSchema,
})

export const UserNotificationSettingsSchema = t.Union([
  t.Literal(0, {
    title: 'ALL_MESSAGES',
    description: 'members will receive notifications for all messages by default',
  }),
  t.Literal(1, {
    title: 'ONLY_MENTIONS',
    description:
      'members will receive notifications only for messages that @mention them by default',
  }),
])

export const GuildPatchRequestPartialSchema = t.Object({
  name: t.Optional(t.String({ minLength: 2, maxLength: 100 })),
  description: t.Optional(t.Union([t.String({ minLength: 0, maxLength: 300 }), t.Null()])),
  region: t.Optional(t.Union([t.String(), t.Null()])),
  icon: t.Optional(t.Union([t.String(), t.Null()])),
  verification_level: t.Optional(t.Union([t.Null(), VerificationLevelsSchema])),
  default_message_notifications: t.Optional(t.Union([t.Null(), UserNotificationSettingsSchema])),
  explicit_content_filter: t.Optional(t.Union([t.Null(), GuildExplicitContentFilterTypesSchema])),
  preferred_locale: t.Optional(t.Union([t.Null(), AvailableLocalesEnumSchema])),
  afk_timeout: t.Optional(t.Union([t.Null(), AfkTimeoutsSchema])),
  afk_channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  system_channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  splash: t.Optional(t.Union([t.String(), t.Null()])),
  banner: t.Optional(t.Union([t.String(), t.Null()])),
  system_channel_flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  features: t.Optional(
    t.Union([
      t.Array(t.Union([t.String({ maxLength: 152133 }), t.Null()]), {
        maxItems: 1521,
        uniqueItems: true,
      }),
      t.Null(),
    ]),
  ),
  discovery_splash: t.Optional(t.Union([t.String(), t.Null()])),
  home_header: t.Optional(t.Union([t.String(), t.Null()])),
  rules_channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  safety_alerts_channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  public_updates_channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  premium_progress_bar_enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const GuildPreviewResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  icon: t.Union([t.String(), t.Null()]),
  description: t.Union([t.String(), t.Null()]),
  home_header: t.Union([t.String(), t.Null()]),
  splash: t.Union([t.String(), t.Null()]),
  discovery_splash: t.Union([t.String(), t.Null()]),
  features: t.Array(GuildFeaturesSchema, { uniqueItems: true }),
  approximate_member_count: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
  approximate_presence_count: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
  emojis: t.Array(EmojiResponseSchema),
  stickers: t.Array(GuildStickerResponseSchema),
})

export const GuildPruneResponseSchema = t.Object({
  pruned: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
})

export const PremiumGuildTiersSchema = t.Union([
  t.Literal(0, { title: 'NONE', description: 'Guild has not unlocked any Server Boost perks' }),
  t.Literal(1, { title: 'TIER_1', description: 'Guild has unlocked Server Boost level 1 perks' }),
  t.Literal(2, { title: 'TIER_2', description: 'Guild has unlocked Server Boost level 2 perks' }),
  t.Literal(3, { title: 'TIER_3', description: 'Guild has unlocked Server Boost level 3 perks' }),
])

export const GuildResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  icon: t.Union([t.String(), t.Null()]),
  description: t.Union([t.String(), t.Null()]),
  home_header: t.Union([t.String(), t.Null()]),
  splash: t.Union([t.String(), t.Null()]),
  discovery_splash: t.Union([t.String(), t.Null()]),
  features: t.Array(GuildFeaturesSchema, { uniqueItems: true }),
  banner: t.Union([t.String(), t.Null()]),
  owner_id: SnowflakeTypeSchema,
  application_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  region: t.String(),
  afk_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  system_channel_flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  widget_enabled: t.Boolean(),
  widget_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  verification_level: VerificationLevelsSchema,
  roles: t.Array(GuildRoleResponseSchema),
  default_message_notifications: UserNotificationSettingsSchema,
  mfa_level: GuildMFALevelSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  max_presences: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
  max_members: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  max_stage_video_channel_users: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
  max_video_channel_users: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
  vanity_url_code: t.Union([t.String(), t.Null()]),
  premium_tier: PremiumGuildTiersSchema,
  premium_subscription_count: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
  preferred_locale: AvailableLocalesEnumSchema,
  rules_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  safety_alerts_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  public_updates_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  premium_progress_bar_enabled: t.Boolean(),
  premium_progress_bar_enabled_user_updated_at: t.Optional(t.Union([t.Date(), t.Null()])),
  nsfw: t.Boolean(),
  nsfw_level: GuildNSFWContentLevelSchema,
  emojis: t.Array(EmojiResponseSchema),
  stickers: t.Array(GuildStickerResponseSchema),
  incidents_data: t.Union([t.Null(), GuildIncidentsDataResponseSchema]),
})

export const GuildScheduledEventExceptionCreateRequestSchema = t.Object({
  scheduled_start_time: t.Optional(
    t.Union([t.Date({ description: 'Overridden start time of this occurrence' }), t.Null()]),
  ),
  scheduled_end_time: t.Optional(
    t.Union([t.Date({ description: 'Overridden end time of this occurrence' }), t.Null()]),
  ),
  original_scheduled_start_time: t.Date({
    description: 'The original start time of the occurrence to create an exception for',
  }),
  is_canceled: t.Optional(
    t.Union([t.Boolean({ description: 'Whether this occurrence is canceled' }), t.Null()]),
  ),
})

export const GuildScheduledEventExceptionPatchRequestPartialSchema = t.Object({
  scheduled_start_time: t.Optional(
    t.Union([t.Date({ description: 'Overridden start time of this occurrence' }), t.Null()]),
  ),
  scheduled_end_time: t.Optional(
    t.Union([t.Date({ description: 'Overridden end time of this occurrence' }), t.Null()]),
  ),
  is_canceled: t.Optional(
    t.Union([t.Boolean({ description: 'Whether this occurrence is canceled' }), t.Null()]),
  ),
})

export const SearchMessageResponseSchema = t.Object({
  type: MessageTypeSchema,
  content: t.String(),
  mentions: t.Array(UserResponseSchema),
  mention_roles: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  attachments: t.Array(MessageAttachmentResponseSchema),
  embeds: t.Array(MessageEmbedResponseSchema),
  timestamp: t.Date(),
  edited_timestamp: t.Union([t.Date(), t.Null()]),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  components: t.Array(
    t.Union([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: t.Optional(
    t.Array(t.Union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  ),
  sticker_items: t.Optional(t.Array(MessageStickerItemResponseSchema)),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: t.Boolean(),
  mention_everyone: t.Boolean(),
  tts: t.Boolean(),
  call: t.Optional(MessageCallResponseSchema),
  activity: t.Optional(MessageActivityResponseSchema),
  application: t.Optional(BasicApplicationResponseWithBotSchema),
  application_id: t.Optional(SnowflakeTypeSchema),
  interaction: t.Optional(MessageInteractionResponseSchema),
  nonce: t.Optional(
    t.Union([
      t.Integer({ format: 'int64', minimum: -9223372036854776000, maximum: 9223372036854776000 }),
      t.String({ maxLength: 25 }),
    ]),
  ),
  webhook_id: t.Optional(SnowflakeTypeSchema),
  message_reference: t.Optional(MessageReferenceResponseSchema),
  thread: t.Optional(ThreadResponseSchema),
  mention_channels: t.Optional(t.Array(MessageMentionChannelResponseSchema)),
  role_subscription_data: t.Optional(MessageRoleSubscriptionDataResponseSchema),
  purchase_notification: t.Optional(PurchaseNotificationResponseSchema),
  position: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  resolved: t.Optional(ResolvedObjectsResponseSchema),
  poll: t.Optional(PollResponseSchema),
  shared_client_theme: t.Optional(CustomClientThemeResponseSchema),
  interaction_metadata: t.Optional(
    t.Union([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
      ModalSubmitInteractionMetadataResponseSchema,
    ]),
  ),
  message_snapshots: t.Optional(t.Array(MessageSnapshotResponseSchema)),
  lobby_member: t.Optional(MessageLobbyMemberResponseSchema),
  actor: t.Optional(UserResponseSchema),
  reactions: t.Optional(t.Array(MessageReactionResponseSchema)),
  referenced_message: t.Optional(t.Union([t.Null(), BasicMessageResponseSchema])),
  hit: t.Boolean(),
  restriction_count: t.Optional(
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  author_restriction_count: t.Optional(
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  source_author_restriction_count: t.Optional(
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  forward_source_author_id: t.Optional(SnowflakeTypeSchema),
})

export const GuildSearchResponseSchema = t.Object({
  messages: t.Array(t.Array(SearchMessageResponseSchema)),
  doing_deep_historical_index: t.Boolean(),
  total_results: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  threads: t.Optional(t.Union([t.Array(ThreadResponseSchema), t.Null()])),
  members: t.Optional(t.Union([t.Array(ThreadMemberResponseSchema), t.Null()])),
  documents_indexed: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
})

export const GuildSubscriptionIntegrationResponseSchema = t.Object({
  type: IntegrationTypesSchema,
  name: t.Union([t.String(), t.Null()]),
  account: AccountResponseSchema,
  enabled: t.Boolean(),
  id: SnowflakeTypeSchema,
})

export const GuildTemplateChannelTagsSchema = t.Object({
  id: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
  name: t.String(),
  emoji_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  emoji_name: t.Union([t.String(), t.Null()]),
  moderated: t.Union([t.Boolean(), t.Null()]),
})

export const GuildTemplateChannelResponseSchema = t.Object({
  id: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
  type: ChannelTypesSchema,
  name: t.Union([t.String(), t.Null()]),
  position: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
  topic: t.Union([t.String(), t.Null()]),
  bitrate: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  user_limit: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  nsfw: t.Boolean(),
  rate_limit_per_user: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  parent_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  default_auto_archive_duration: t.Union([t.Null(), ThreadAutoArchiveDurationSchema]),
  permission_overwrites: t.Array(ChannelPermissionOverwriteResponseSchema),
  available_tags: t.Union([t.Array(GuildTemplateChannelTagsSchema), t.Null()]),
  template: t.String(),
  default_reaction_emoji: t.Union([t.Null(), DefaultReactionEmojiResponseSchema]),
  default_thread_rate_limit_per_user: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
  default_sort_order: t.Union([t.Null(), ThreadSortOrderSchema]),
  default_forum_layout: t.Union([t.Null(), ForumLayoutSchema]),
  default_tag_setting: t.Union([t.Null(), ThreadSearchTagSettingSchema]),
  theme_color: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
})

export const GuildTemplateRoleColorsResponseSchema = t.Object({
  primary_color: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  secondary_color: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
  tertiary_color: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
})

export const GuildTemplateRoleResponseSchema = t.Object({
  id: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  name: t.String(),
  permissions: t.String(),
  color: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  colors: t.Union([t.Null(), GuildTemplateRoleColorsResponseSchema]),
  hoist: t.Boolean(),
  mentionable: t.Boolean(),
  icon: t.Union([t.String(), t.Null()]),
  unicode_emoji: t.Union([t.String(), t.Null()]),
})

export const GuildTemplateSnapshotResponseSchema = t.Object({
  name: t.String(),
  description: t.Union([t.String(), t.Null()]),
  region: t.Union([t.String(), t.Null()]),
  verification_level: VerificationLevelsSchema,
  default_message_notifications: UserNotificationSettingsSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  preferred_locale: AvailableLocalesEnumSchema,
  afk_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  system_channel_flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  roles: t.Array(GuildTemplateRoleResponseSchema),
  channels: t.Array(GuildTemplateChannelResponseSchema),
})

export const GuildTemplateResponseSchema = t.Object({
  code: t.String(),
  name: t.String(),
  description: t.Union([t.String(), t.Null()]),
  usage_count: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  creator_id: SnowflakeTypeSchema,
  creator: t.Union([t.Null(), UserResponseSchema]),
  created_at: t.Date(),
  updated_at: t.Date(),
  source_guild_id: SnowflakeTypeSchema,
  serialized_source_guild: GuildTemplateSnapshotResponseSchema,
  is_dirty: t.Union([t.Boolean(), t.Null()]),
})

export const GuildWelcomeChannelSchema = t.Object({
  channel_id: SnowflakeTypeSchema,
  description: t.String({ minLength: 1, maxLength: 50 }),
  emoji_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  emoji_name: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
})

export const GuildWelcomeScreenChannelResponseSchema = t.Object({
  channel_id: SnowflakeTypeSchema,
  description: t.String(),
  emoji_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  emoji_name: t.Union([t.String(), t.Null()]),
})

export const GuildWelcomeScreenResponseSchema = t.Object({
  description: t.Union([t.String(), t.Null()]),
  welcome_channels: t.Array(GuildWelcomeScreenChannelResponseSchema),
})

export const GuildWithCountsResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  icon: t.Union([t.String(), t.Null()]),
  description: t.Union([t.String(), t.Null()]),
  home_header: t.Union([t.String(), t.Null()]),
  splash: t.Union([t.String(), t.Null()]),
  discovery_splash: t.Union([t.String(), t.Null()]),
  features: t.Array(GuildFeaturesSchema, { uniqueItems: true }),
  banner: t.Union([t.String(), t.Null()]),
  owner_id: SnowflakeTypeSchema,
  application_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  region: t.String(),
  afk_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  system_channel_flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  widget_enabled: t.Boolean(),
  widget_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  verification_level: VerificationLevelsSchema,
  roles: t.Array(GuildRoleResponseSchema),
  default_message_notifications: UserNotificationSettingsSchema,
  mfa_level: GuildMFALevelSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  max_presences: t.Union([
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    t.Null(),
  ]),
  max_members: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  max_stage_video_channel_users: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
  max_video_channel_users: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
  vanity_url_code: t.Union([t.String(), t.Null()]),
  premium_tier: PremiumGuildTiersSchema,
  premium_subscription_count: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
  preferred_locale: AvailableLocalesEnumSchema,
  rules_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  safety_alerts_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  public_updates_channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  premium_progress_bar_enabled: t.Boolean(),
  premium_progress_bar_enabled_user_updated_at: t.Optional(t.Union([t.Date(), t.Null()])),
  nsfw: t.Boolean(),
  nsfw_level: GuildNSFWContentLevelSchema,
  emojis: t.Array(EmojiResponseSchema),
  stickers: t.Array(GuildStickerResponseSchema),
  incidents_data: t.Union([t.Null(), GuildIncidentsDataResponseSchema]),
  approximate_member_count: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
  approximate_presence_count: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
})

export const HasOptionSchema = t.Union([
  t.Literal('link', { title: 'LINK' }),
  t.Literal('embed', { title: 'EMBED' }),
  t.Literal('file', { title: 'FILE' }),
  t.Literal('image', { title: 'IMAGE' }),
  t.Literal('video', { title: 'VIDEO' }),
  t.Literal('sound', { title: 'SOUND' }),
  t.Literal('sticker', { title: 'STICKER' }),
  t.Literal('poll', { title: 'POLL' }),
  t.Literal('snapshot', { title: 'SNAPSHOT' }),
  t.Literal('-link', { title: 'NO_LINK' }),
  t.Literal('-embed', { title: 'NO_EMBED' }),
  t.Literal('-file', { title: 'NO_FILE' }),
  t.Literal('-image', { title: 'NO_IMAGE' }),
  t.Literal('-video', { title: 'NO_VIDEO' }),
  t.Literal('-sound', { title: 'NO_SOUND' }),
  t.Literal('-sticker', { title: 'NO_STICKER' }),
  t.Literal('-poll', { title: 'NO_POLL' }),
  t.Literal('-snapshot', { title: 'NO_SNAPSHOT' }),
])

export const IncomingWebhookRequestPartialSchema = t.Object({
  content: t.Optional(t.Union([t.String({ maxLength: 2000 }), t.Null()])),
  embeds: t.Optional(t.Union([t.Array(RichEmbedSchema, { maxItems: 10 }), t.Null()])),
  allowed_mentions: t.Optional(t.Union([t.Null(), MessageAllowedMentionsRequestSchema])),
  components: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
        { maxItems: 40 },
      ),
      t.Null(),
    ]),
  ),
  attachments: t.Optional(
    t.Union([t.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), t.Null()]),
  ),
  poll: t.Optional(t.Union([t.Null(), PollCreateRequestSchema])),
  tts: t.Optional(t.Union([t.Boolean(), t.Null()])),
  flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  username: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 80 }), t.Null()])),
  avatar_url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  thread_name: t.Optional(t.Union([t.String({ minLength: 0, maxLength: 100 }), t.Null()])),
  applied_tags: t.Optional(t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 5 }), t.Null()])),
})

export const IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema = t.Object({
  content: t.Optional(t.Union([t.String({ maxLength: 2000 }), t.Null()])),
  embeds: t.Optional(t.Union([t.Array(RichEmbedSchema, { maxItems: 10 }), t.Null()])),
  allowed_mentions: t.Optional(t.Union([t.Null(), MessageAllowedMentionsRequestSchema])),
  components: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
        { maxItems: 40 },
      ),
      t.Null(),
    ]),
  ),
  attachments: t.Optional(
    t.Union([t.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), t.Null()]),
  ),
  flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
})

export const IncomingWebhookUpdateRequestPartialSchema = t.Object({
  content: t.Optional(t.Union([t.String({ maxLength: 2000 }), t.Null()])),
  embeds: t.Optional(t.Union([t.Array(RichEmbedSchema, { maxItems: 10 }), t.Null()])),
  allowed_mentions: t.Optional(t.Union([t.Null(), MessageAllowedMentionsRequestSchema])),
  components: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
        { maxItems: 40 },
      ),
      t.Null(),
    ]),
  ),
  attachments: t.Optional(
    t.Union([t.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), t.Null()]),
  ),
  poll: t.Optional(t.Union([t.Null(), PollCreateRequestSchema])),
  flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
})

export const InteractionResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  activity_instance_id: t.Optional(t.Union([t.String(), t.Null()])),
  response_message_id: t.Optional(SnowflakeTypeSchema),
  response_message_loading: t.Optional(t.Boolean()),
  response_message_ephemeral: t.Optional(t.Boolean()),
  channel_id: t.Optional(SnowflakeTypeSchema),
  guild_id: t.Optional(SnowflakeTypeSchema),
})

export const LaunchActivityInteractionCallbackResponseSchema = t.Object({
  type: InteractionCallbackTypesSchema,
  activity_instance: ActivityInstanceCallbackResponseSchema,
})

export const UpdateMessageInteractionCallbackResponseSchema = t.Object({
  type: InteractionCallbackTypesSchema,
  message: MessageResponseSchema,
})

export const InteractionCallbackResponseSchema = t.Object({
  interaction: InteractionResponseSchema,
  resource: t.Optional(
    t.Union([
      CreateMessageInteractionCallbackResponseSchema,
      LaunchActivityInteractionCallbackResponseSchema,
      UpdateMessageInteractionCallbackResponseSchema,
    ]),
  ),
})

export const KeywordTriggerMetadataSchema = t.Object({
  keyword_filter: t.Optional(
    t.Union([t.Array(t.String({ minLength: 1, maxLength: 60 }), { maxItems: 1000 }), t.Null()]),
  ),
  regex_patterns: t.Optional(
    t.Union([t.Array(t.String({ minLength: 1, maxLength: 260 }), { maxItems: 10 }), t.Null()]),
  ),
  allow_list: t.Optional(
    t.Union([t.Array(t.String({ minLength: 1, maxLength: 60 }), { maxItems: 100 }), t.Null()]),
  ),
})

export const KeywordUpsertRequestSchema = t.Object({
  name: t.String({ maxLength: 100 }),
  event_type: AutomodEventTypeSchema,
  actions: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
        { minItems: 1, maxItems: 5 },
      ),
      t.Null(),
    ]),
  ),
  enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  exempt_roles: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }), t.Null()]),
  ),
  exempt_channels: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }), t.Null()]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: t.Optional(t.Union([t.Null(), KeywordTriggerMetadataSchema])),
})

export const KeywordUpsertRequestPartialSchema = t.Object({
  name: t.Optional(t.String({ maxLength: 100 })),
  event_type: t.Optional(AutomodEventTypeSchema),
  actions: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
        { minItems: 1, maxItems: 5 },
      ),
      t.Null(),
    ]),
  ),
  enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  exempt_roles: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }), t.Null()]),
  ),
  exempt_channels: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }), t.Null()]),
  ),
  trigger_type: t.Optional(AutomodTriggerTypeSchema),
  trigger_metadata: t.Optional(t.Union([t.Null(), KeywordTriggerMetadataSchema])),
})

export const MentionableSelectComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 150 }), t.Null()])),
  min_values: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 25 }), t.Null()])),
  max_values: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 25 }), t.Null()])),
  disabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  default_values: t.Optional(
    t.Union([
      t.Array(t.Union([RoleSelectDefaultValueSchema, UserSelectDefaultValueSchema]), {
        maxItems: 25,
      }),
      t.Null(),
    ]),
  ),
})

export const RadioGroupOptionForRequestSchema = t.Object({
  label: t.String({ minLength: 1, maxLength: 100 }),
  value: t.String({ minLength: 1, maxLength: 100 }),
  description: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  default: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const RadioGroupComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  options: t.Array(RadioGroupOptionForRequestSchema, { minItems: 2, maxItems: 10 }),
})

export const RoleSelectComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 150 }), t.Null()])),
  min_values: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 25 }), t.Null()])),
  max_values: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 25 }), t.Null()])),
  disabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  default_values: t.Optional(
    t.Union([t.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }), t.Null()]),
  ),
})

export const StringSelectComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 150 }), t.Null()])),
  min_values: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 25 }), t.Null()])),
  max_values: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 25 }), t.Null()])),
  disabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  options: t.Array(StringSelectOptionForRequestSchema, { minItems: 1, maxItems: 25 }),
})

export const UserSelectComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  placeholder: t.Optional(t.Union([t.String({ maxLength: 150 }), t.Null()])),
  min_values: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 25 }), t.Null()])),
  max_values: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 25 }), t.Null()])),
  disabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  default_values: t.Optional(
    t.Union([t.Array(UserSelectDefaultValueSchema, { maxItems: 25 }), t.Null()]),
  ),
})

export const LabelComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  label: t.String({ minLength: 1, maxLength: 45 }),
  description: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 100 }), t.Null()])),
  component: t.Union([
    ChannelSelectComponentForModalRequestSchema,
    CheckboxComponentForModalRequestSchema,
    CheckboxGroupComponentForModalRequestSchema,
    FileUploadComponentForModalRequestSchema,
    MentionableSelectComponentForModalRequestSchema,
    RadioGroupComponentForModalRequestSchema,
    RoleSelectComponentForModalRequestSchema,
    StringSelectComponentForModalRequestSchema,
    TextInputComponentForModalRequestSchema,
    UserSelectComponentForModalRequestSchema,
  ]),
})

export const LaunchActivityInteractionCallbackRequestSchema = t.Object({
  type: InteractionCallbackTypesSchema,
})

export const ListApplicationEmojisResponseSchema = t.Object({ items: t.Array(EmojiResponseSchema) })

export const SoundboardSoundResponseSchema = t.Object({
  name: t.String(),
  sound_id: SnowflakeTypeSchema,
  volume: t.Number({ format: 'double' }),
  emoji_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  emoji_name: t.Union([t.String(), t.Null()]),
  guild_id: t.Optional(SnowflakeTypeSchema),
  available: t.Boolean(),
  user: t.Optional(UserResponseSchema),
})

export const ListGuildSoundboardSoundsResponseSchema = t.Object({
  items: t.Array(SoundboardSoundResponseSchema),
})

export const LobbyGuildInviteResponseSchema = t.Object({ code: t.String() })

export const LobbyMemberRequestSchema = t.Object({
  id: SnowflakeTypeSchema,
  metadata: t.Optional(
    t.Union([t.Record(t.String(), t.String({ maxLength: 1024 }), { maxProperties: 25 }), t.Null()]),
  ),
  flags: t.Optional(t.Union([t.Null(), t.Literal(1)])),
  additional_name: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 80 }), t.Null()])),
})

export const LobbyMemberResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  metadata: t.Union([t.Record(t.String(), t.String()), t.Null()]),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  additional_name: t.Optional(t.String()),
})

export const LobbyMessageResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  type: MessageTypeSchema,
  content: t.String(),
  lobby_id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  lobby_member: t.Optional(MessageLobbyMemberResponseSchema),
  metadata: t.Optional(t.Record(t.String(), t.String())),
  moderation_metadata: t.Optional(t.Record(t.String(), t.String())),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  application_id: t.Optional(SnowflakeTypeSchema),
})

export const LobbyResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  metadata: t.Union([t.Record(t.String(), t.String()), t.Null()]),
  members: t.Array(LobbyMemberResponseSchema),
  linked_channel: t.Optional(GuildChannelResponseSchema),
  flags: UInt32TypeSchema,
  override_event_webhooks_url: t.Optional(t.Union([t.String(), t.Null()])),
})

export const MLSpamTriggerMetadataSchema = t.Object({})

export const MLSpamUpsertRequestSchema = t.Object({
  name: t.String({ maxLength: 100 }),
  event_type: AutomodEventTypeSchema,
  actions: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
        { minItems: 1, maxItems: 5 },
      ),
      t.Null(),
    ]),
  ),
  enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  exempt_roles: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }), t.Null()]),
  ),
  exempt_channels: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }), t.Null()]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: t.Optional(t.Union([t.Null(), MLSpamTriggerMetadataSchema])),
})

export const MLSpamUpsertRequestPartialSchema = t.Object({
  name: t.Optional(t.String({ maxLength: 100 })),
  event_type: t.Optional(AutomodEventTypeSchema),
  actions: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
        { minItems: 1, maxItems: 5 },
      ),
      t.Null(),
    ]),
  ),
  enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  exempt_roles: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }), t.Null()]),
  ),
  exempt_channels: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }), t.Null()]),
  ),
  trigger_type: t.Optional(AutomodTriggerTypeSchema),
  trigger_metadata: t.Optional(t.Union([t.Null(), MLSpamTriggerMetadataSchema])),
})

export const MentionSpamTriggerMetadataSchema = t.Object({
  mention_total_limit: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 50 }), t.Null()])),
  mention_raid_protection_enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const MentionSpamUpsertRequestSchema = t.Object({
  name: t.String({ maxLength: 100 }),
  event_type: AutomodEventTypeSchema,
  actions: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
        { minItems: 1, maxItems: 5 },
      ),
      t.Null(),
    ]),
  ),
  enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  exempt_roles: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }), t.Null()]),
  ),
  exempt_channels: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }), t.Null()]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: t.Optional(t.Union([t.Null(), MentionSpamTriggerMetadataSchema])),
})

export const MentionSpamUpsertRequestPartialSchema = t.Object({
  name: t.Optional(t.String({ maxLength: 100 })),
  event_type: t.Optional(AutomodEventTypeSchema),
  actions: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
        { minItems: 1, maxItems: 5 },
      ),
      t.Null(),
    ]),
  ),
  enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  exempt_roles: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }), t.Null()]),
  ),
  exempt_channels: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }), t.Null()]),
  ),
  trigger_type: t.Optional(AutomodTriggerTypeSchema),
  trigger_metadata: t.Optional(t.Union([t.Null(), MentionSpamTriggerMetadataSchema])),
})

export const MessageReferenceRequestSchema = t.Object({
  guild_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  message_id: SnowflakeTypeSchema,
  fail_if_not_exists: t.Optional(t.Union([t.Boolean(), t.Null()])),
  type: t.Optional(t.Union([t.Null(), MessageReferenceTypeSchema])),
})

export const MessageCreateRequestSchema = t.Object({
  content: t.Optional(t.Union([t.String({ maxLength: 4000 }), t.Null()])),
  embeds: t.Optional(t.Union([t.Array(RichEmbedSchema, { maxItems: 10 }), t.Null()])),
  allowed_mentions: t.Optional(t.Union([t.Null(), MessageAllowedMentionsRequestSchema])),
  sticker_ids: t.Optional(t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 3 }), t.Null()])),
  components: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
        { maxItems: 40 },
      ),
      t.Null(),
    ]),
  ),
  flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  attachments: t.Optional(
    t.Union([t.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), t.Null()]),
  ),
  poll: t.Optional(t.Union([t.Null(), PollCreateRequestSchema])),
  shared_client_theme: t.Optional(t.Union([t.Null(), CustomClientThemeShareRequestSchema])),
  message_reference: t.Optional(t.Union([t.Null(), MessageReferenceRequestSchema])),
  nonce: t.Optional(
    t.Union([
      t.Integer({ format: 'int64', minimum: -9223372036854776000, maximum: 9223372036854776000 }),
      t.String({ maxLength: 25 }),
      t.Null(),
    ]),
  ),
  enforce_nonce: t.Optional(t.Union([t.Boolean(), t.Null()])),
  tts: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const MessageEditRequestPartialSchema = t.Object({
  content: t.Optional(t.Union([t.String({ maxLength: 4000 }), t.Null()])),
  embeds: t.Optional(t.Union([t.Array(RichEmbedSchema, { maxItems: 10 }), t.Null()])),
  flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  allowed_mentions: t.Optional(t.Union([t.Null(), MessageAllowedMentionsRequestSchema])),
  sticker_ids: t.Optional(t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 1521 }), t.Null()])),
  components: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
        { maxItems: 40 },
      ),
      t.Null(),
    ]),
  ),
  attachments: t.Optional(
    t.Union([t.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), t.Null()]),
  ),
})

export const TextDisplayComponentForModalRequestSchema = t.Object({
  type: MessageComponentTypesSchema,
  id: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  content: t.String({ minLength: 1, maxLength: 4000 }),
})

export const ModalInteractionCallbackRequestDataSchema = t.Object({
  custom_id: t.String({ minLength: 1, maxLength: 100 }),
  title: t.String({ minLength: 1, maxLength: 45 }),
  components: t.Array(
    t.Union([
      ActionRowComponentForModalRequestSchema,
      LabelComponentForModalRequestSchema,
      TextDisplayComponentForModalRequestSchema,
    ]),
    { minItems: 1, maxItems: 40 },
  ),
})

export const ModalInteractionCallbackRequestSchema = t.Object({
  type: InteractionCallbackTypesSchema,
  data: ModalInteractionCallbackRequestDataSchema,
})

export const MyGuildResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  icon: t.Union([t.String(), t.Null()]),
  banner: t.Union([t.String(), t.Null()]),
  owner: t.Boolean(),
  permissions: t.String(),
  features: t.Array(GuildFeaturesSchema, { uniqueItems: true }),
  approximate_member_count: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
  approximate_presence_count: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
})

export const OAuth2GetAuthorizationResponseSchema = t.Object({
  application: ApplicationResponseSchema,
  expires: t.Date(),
  scopes: t.Array(OAuth2ScopesSchema, { uniqueItems: true }),
  user: t.Optional(UserResponseSchema),
})

export const OAuth2KeySchema = t.Object({
  kty: t.String(),
  use: t.String(),
  kid: t.String(),
  n: t.String(),
  e: t.String(),
  alg: t.String(),
})

export const OAuth2GetKeysSchema = t.Object({ keys: t.Array(OAuth2KeySchema) })

export const OAuth2GetOpenIDConnectUserInfoResponseSchema = t.Object({
  sub: t.String(),
  email: t.Optional(t.Union([t.String(), t.Null()])),
  email_verified: t.Optional(t.Boolean()),
  preferred_username: t.Optional(t.String()),
  nickname: t.Optional(t.Union([t.String(), t.Null()])),
  picture: t.Optional(t.String()),
  locale: t.Optional(t.String()),
})

export const OnboardingPromptOptionRequestSchema = t.Object({
  id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  title: t.String({ minLength: 1, maxLength: 50 }),
  description: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  emoji_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  emoji_name: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  emoji_animated: t.Optional(t.Union([t.Boolean(), t.Null()])),
  role_ids: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }), t.Null()]),
  ),
  channel_ids: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }), t.Null()]),
  ),
})

export const PermissionsResponseSchema = t.Object({
  permissions: t.String({ description: 'The computed permissions, as a stringified bitfield' }),
})

export const PinnedMessageResponseSchema = t.Object({
  pinned_at: t.Date(),
  message: MessageResponseSchema,
})

export const PinnedMessagesResponseSchema = t.Object({
  items: t.Array(PinnedMessageResponseSchema),
  has_more: t.Boolean(),
})

export const PollAnswerDetailsResponseSchema = t.Object({ users: t.Array(UserResponseSchema) })

export const PongInteractionCallbackRequestSchema = t.Object({
  type: InteractionCallbackTypesSchema,
})

export const PremiumTypesSchema = t.Union([
  t.Literal(0, { title: 'NONE', description: 'None' }),
  t.Literal(1, { title: 'TIER_1', description: 'Nitro Classic' }),
  t.Literal(2, { title: 'TIER_2', description: 'Nitro Standard' }),
  t.Literal(3, { title: 'TIER_0', description: 'Nitro Basic' }),
])

export const TeamMembershipStatesSchema = t.Union([
  t.Literal(1, { title: 'INVITED', description: 'User has been invited to the team.' }),
  t.Literal(2, { title: 'ACCEPTED', description: 'User has accepted the team invitation.' }),
])

export const TeamMemberRolesSchema = t.Union([
  t.Literal('admin', {
    title: 'ADMIN',
    description:
      'Admins have similar access as owners, except they cannot take destructive actions on the team or team-owned apps.',
  }),
  t.Literal('developer', {
    title: 'DEVELOPER',
    description:
      'Developers can access information about team-owned apps, like the client secret or public key. They can also take limited actions on team-owned apps, like configuring interaction endpoints or resetting the bot token. Members with the Developer role cannot manage the team or its members, or take destructive actions on team-owned apps.',
  }),
  t.Literal('read_only', {
    title: 'READ_ONLY',
    description:
      'Read-only members can access information about a team and any team-owned apps. Some examples include getting the IDs of applications and exporting payout records. Members can also invite bots associated with team-owned apps that are marked private.',
  }),
])

export const TeamMemberResponseSchema = t.Object({
  user: UserResponseSchema,
  team_id: SnowflakeTypeSchema,
  membership_state: TeamMembershipStatesSchema,
  role: TeamMemberRolesSchema,
  permissions: t.Array(t.String()),
})

export const TeamResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  icon: t.Union([t.String(), t.Null()]),
  name: t.String(),
  owner_user_id: SnowflakeTypeSchema,
  members: t.Array(TeamMemberResponseSchema),
})

export const PrivateApplicationResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  icon: t.Union([t.String(), t.Null()]),
  description: t.String(),
  type: t.Union([t.Null(), ApplicationTypesSchema]),
  cover_image: t.Optional(t.String()),
  primary_sku_id: t.Optional(SnowflakeTypeSchema),
  flags: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  flags_new: t.String(),
  bot: t.Optional(UserResponseSchema),
  slug: t.Optional(t.String()),
  conjure_project_id: t.Optional(SnowflakeTypeSchema),
  vibegrations_project_id: t.Optional(SnowflakeTypeSchema),
  guild_id: t.Optional(SnowflakeTypeSchema),
  rpc_origins: t.Optional(t.Array(t.String())),
  bot_public: t.Optional(t.Boolean()),
  bot_require_code_grant: t.Optional(t.Boolean()),
  terms_of_service_url: t.Optional(t.String({ format: 'uri' })),
  privacy_policy_url: t.Optional(t.String({ format: 'uri' })),
  custom_install_url: t.Optional(t.String({ format: 'uri' })),
  install_params: t.Optional(ApplicationOAuth2InstallParamsResponseSchema),
  integration_types_config: t.Optional(
    t.Record(t.String(), ApplicationIntegrationTypeConfigurationResponseSchema),
  ),
  verify_key: t.String(),
  max_participants: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
  tags: t.Optional(t.Array(t.String(), { uniqueItems: true })),
  redirect_uris: t.Array(t.String({ format: 'uri' })),
  interactions_endpoint_url: t.Union([t.String({ format: 'uri' }), t.Null()]),
  role_connections_verification_url: t.Union([t.String({ format: 'uri' }), t.Null()]),
  owner: UserResponseSchema,
  approximate_guild_count: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
  approximate_user_install_count: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
  approximate_user_authorization_count: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
  }),
  event_webhooks_url: t.Optional(t.Union([t.String({ format: 'uri' }), t.Null()])),
  event_webhooks_status: t.Optional(ApplicationEventWebhooksStatusSchema),
  event_webhooks_types: t.Optional(t.Array(ActionTypesSchema, { uniqueItems: true })),
  explicit_content_filter: ApplicationExplicitContentFilterTypesSchema,
  team: t.Union([t.Null(), TeamResponseSchema]),
  eligible_oauth2_scopes: t.Array(OAuth2ScopesSchema),
})

export const PrivateGuildMemberResponseSchema = t.Object({
  avatar: t.Union([t.String({ description: "the member's guild avatar hash" }), t.Null()]),
  avatar_decoration_data: t.Optional(
    t.Union([t.Null(), UserAvatarDecorationResponseSchema], {
      description: "data for the member's guild avatar decoration",
    }),
  ),
  banner: t.Union([t.String({ description: "the member's guild banner hash" }), t.Null()]),
  communication_disabled_until: t.Union([
    t.Date({
      description:
        "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
    }),
    t.Null(),
  ]),
  flags: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    description: 'guild member flags represented as a bit set, defaults to 0',
  }),
  joined_at: t.Date({ description: 'when the user joined the guild' }),
  nick: t.Union([t.String({ description: "this user's guild nickname" }), t.Null()]),
  pending: t.Boolean({
    description:
      "whether the user has not yet passed the guild's Membership Screening requirements",
  }),
  premium_since: t.Union([
    t.Date({ description: 'when the user started boosting the guild' }),
    t.Null(),
  ]),
  roles: t.Array(SnowflakeTypeSchema, {
    uniqueItems: true,
    description: 'array of role object ids',
  }),
  collectibles: t.Optional(
    t.Union([t.Null(), UserCollectiblesResponseSchema], {
      description: "data for the member's collectibles",
    }),
  ),
  user: UserResponseSchema,
  mute: t.Boolean({ description: 'whether the user is muted in voice channels' }),
  deaf: t.Boolean({ description: 'whether the user is deafened in voice channels' }),
  permissions: t.Optional(t.String()),
})

export const ProvisionalTokenResponseSchema = t.Object({
  token_type: t.String(),
  access_token: t.String(),
  expires_in: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  scope: t.String(),
  id_token: t.String(),
  refresh_token: t.Optional(t.Union([t.String(), t.Null()])),
  scopes: t.Optional(t.Union([t.Array(t.String()), t.Null()])),
  expires_at_s: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
})

export const PruneGuildRequestSchema = t.Object({
  days: t.Optional(t.Union([t.Integer({ minimum: 1, maximum: 30 }), t.Null()])),
  compute_prune_count: t.Optional(t.Union([t.Boolean(), t.Null()])),
  include_roles: t.Optional(
    t.Union([
      t.String(),
      t.Array(SnowflakeTypeSchema, { maxItems: 100, uniqueItems: true }),
      t.Null(),
    ]),
  ),
})

export const ReactionTypesSchema = t.Union([
  t.Literal(0, { title: 'NORMAL', description: 'Normal reaction type' }),
  t.Literal(1, { title: 'BURST', description: 'Burst reaction type' }),
])

export const SDKMessageRequestSchema = t.Object({
  content: t.Optional(t.Union([t.String({ maxLength: 4000 }), t.Null()])),
  embeds: t.Optional(t.Union([t.Array(RichEmbedSchema, { maxItems: 10 }), t.Null()])),
  allowed_mentions: t.Optional(t.Union([t.Null(), MessageAllowedMentionsRequestSchema])),
  sticker_ids: t.Optional(t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 3 }), t.Null()])),
  components: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
        { maxItems: 40 },
      ),
      t.Null(),
    ]),
  ),
  flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  attachments: t.Optional(
    t.Union([t.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), t.Null()]),
  ),
  poll: t.Optional(t.Union([t.Null(), PollCreateRequestSchema])),
  shared_client_theme: t.Optional(t.Union([t.Null(), CustomClientThemeShareRequestSchema])),
  message_reference: t.Optional(t.Union([t.Null(), MessageReferenceRequestSchema])),
  nonce: t.Optional(
    t.Union([
      t.Integer({ format: 'int64', minimum: -9223372036854776000, maximum: 9223372036854776000 }),
      t.String({ maxLength: 25 }),
      t.Null(),
    ]),
  ),
  enforce_nonce: t.Optional(t.Union([t.Boolean(), t.Null()])),
  tts: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const SKUIneligibilityReasonSchema = t.Union([
  t.Literal(0, { title: 'OTHER', description: 'Other / catch-all' }),
  t.Literal(1, {
    title: 'OWNS_SKU_OR_BUNDLE_COMPONENT',
    description: 'User already owns this SKU or one of its components',
  }),
  t.Literal(2, {
    title: 'PLATFORM_RESTRICTION',
    description: 'User account is not on an eligible platform',
  }),
])

export const ScheduledEventUserCountResponseSchema = t.Object({
  guild_scheduled_event_count: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    description: 'The number of users subscribed to the scheduled event',
  }),
  guild_scheduled_event_exception_counts: t.Record(
    t.String(),
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
    { description: 'Map of exception IDs to user counts for each exception' },
  ),
})

export const SearchIndexNotReadyResponseSchema = t.Object({
  message: t.String(),
  code: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  documents_indexed: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  retry_after: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const SearchableEmbedTypeSchema = t.Union([
  t.Literal('image', { title: 'IMAGE' }),
  t.Literal('video', { title: 'VIDEO' }),
  t.Literal('gif', { title: 'GIFV' }),
  t.Literal('sound', { title: 'SOUND' }),
  t.Literal('article', { title: 'ARTICLE' }),
])

export const WebhookSlackEmbedFieldSchema = t.Object({
  name: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  value: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  inline: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const WebhookSlackEmbedSchema = t.Object({
  title: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  title_link: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  text: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  color: t.Optional(
    t.Union([
      t.String({ pattern: '^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$', maxLength: 7 }),
      t.Null(),
    ]),
  ),
  ts: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  pretext: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  footer: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  footer_icon: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  author_name: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  author_link: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  author_icon: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  image_url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  thumb_url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  fields: t.Optional(
    t.Union([t.Array(WebhookSlackEmbedFieldSchema, { maxItems: 1521 }), t.Null()]),
  ),
})

export const SlackWebhookSchema = t.Object({
  text: t.Optional(t.Union([t.String({ maxLength: 2000 }), t.Null()])),
  username: t.Optional(t.Union([t.String({ maxLength: 152133 }), t.Null()])),
  icon_url: t.Optional(t.Union([t.String({ format: 'uri', maxLength: 2048 }), t.Null()])),
  attachments: t.Optional(
    t.Union([t.Array(WebhookSlackEmbedSchema, { maxItems: 1521 }), t.Null()]),
  ),
})

export const SocialLayerSKUPurchaseEligibilityCallbackDataSchema = t.Object({
  eligible: t.Boolean(),
  ineligible_reason: t.Optional(t.Union([t.Null(), SKUIneligibilityReasonSchema])),
  ineligible_reason_description: t.Optional(t.Union([t.String({ maxLength: 255 }), t.Null()])),
})

export const SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema = t.Object({
  type: InteractionCallbackTypesSchema,
  data: SocialLayerSKUPurchaseEligibilityCallbackDataSchema,
})

export const SortingModeSchema = t.Union([
  t.Literal('relevance', { title: 'RELEVANCE' }),
  t.Literal('timestamp', { title: 'TIMESTAMP' }),
])

export const SortingOrderSchema = t.Union([
  t.Literal('asc', { title: 'ASC' }),
  t.Literal('desc', { title: 'DESC' }),
])

export const SoundboardCreateRequestSchema = t.Object({
  name: t.String({ minLength: 2, maxLength: 32 }),
  volume: t.Optional(t.Union([t.Number({ format: 'double', minimum: 0, maximum: 1 }), t.Null()])),
  emoji_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  emoji_name: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 32 }), t.Null()])),
  sound: t.String(),
})

export const SoundboardPatchRequestPartialSchema = t.Object({
  name: t.Optional(t.String({ minLength: 2, maxLength: 32 })),
  volume: t.Optional(t.Union([t.Number({ format: 'double', minimum: 0, maximum: 1 }), t.Null()])),
  emoji_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  emoji_name: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 32 }), t.Null()])),
})

export const SoundboardSoundSendRequestSchema = t.Object({
  sound_id: SnowflakeTypeSchema,
  source_guild_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
})

export const StageInstancesPrivacyLevelsSchema = t.Union([
  t.Literal(1, {
    title: 'PUBLIC',
    description: 'The Stage instance is visible publicly. (deprecated)',
  }),
  t.Literal(2, {
    title: 'GUILD_ONLY',
    description: 'The Stage instance is visible to only guild members.',
  }),
])

export const StageInstanceResponseSchema = t.Object({
  guild_id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  topic: t.String(),
  privacy_level: StageInstancesPrivacyLevelsSchema,
  id: SnowflakeTypeSchema,
  discoverable_disabled: t.Boolean(),
  guild_scheduled_event_id: t.Union([t.Null(), SnowflakeTypeSchema]),
})

export const StageScheduledEventCreateRequestSchema = t.Object({
  name: t.String({ maxLength: 100 }),
  description: t.Optional(t.Union([t.String({ maxLength: 1000 }), t.Null()])),
  image: t.Optional(t.Union([t.String(), t.Null()])),
  scheduled_start_time: t.Date(),
  scheduled_end_time: t.Optional(t.Union([t.Date(), t.Null()])),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  recurrence_rule: t.Optional(
    t.Union([t.Null(), RecurrenceRuleSchema], {
      description: 'Recurrence rule for the scheduled event',
    }),
  ),
  entity_metadata: t.Optional(t.Union([t.Null(), EntityMetadataStageInstanceSchema])),
})

export const StageScheduledEventPatchRequestPartialSchema = t.Object({
  status: t.Optional(t.Union([t.Null(), GuildScheduledEventStatusesSchema])),
  name: t.Optional(t.String({ maxLength: 100 })),
  description: t.Optional(t.Union([t.String({ maxLength: 1000 }), t.Null()])),
  image: t.Optional(t.Union([t.String(), t.Null()])),
  scheduled_start_time: t.Optional(t.Date()),
  scheduled_end_time: t.Optional(t.Union([t.Date(), t.Null()])),
  entity_type: t.Optional(t.Union([t.Null(), GuildScheduledEventEntityTypesSchema])),
  privacy_level: t.Optional(GuildScheduledEventPrivacyLevelsSchema),
  channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  recurrence_rule: t.Optional(
    t.Union([t.Null(), RecurrenceRuleSchema], {
      description: 'Recurrence rule for the scheduled event',
    }),
  ),
  entity_metadata: t.Optional(t.Union([t.Null(), EntityMetadataStageInstanceSchema])),
})

export const StickerPackResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  sku_id: SnowflakeTypeSchema,
  name: t.String(),
  description: t.Union([t.String(), t.Null()]),
  stickers: t.Array(StandardStickerResponseSchema),
  cover_sticker_id: t.Optional(SnowflakeTypeSchema),
  banner_asset_id: t.Optional(SnowflakeTypeSchema),
})

export const StickerPackCollectionResponseSchema = t.Object({
  sticker_packs: t.Array(StickerPackResponseSchema),
})

export const SubscriptionResponseStatusTypeSchema = t.Union([
  t.Literal(0, { title: 'ACTIVE', description: 'Subscription is active and scheduled to renew' }),
  t.Literal(1, {
    title: 'INACTIVE',
    description: 'Subscription is inactive and not being charged',
  }),
  t.Literal(2, { title: 'ENDING', description: 'Subscription is active but will not renew' }),
])

export const SubscriptionResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  sku_ids: t.Array(SnowflakeTypeSchema, {
    uniqueItems: true,
    description: 'List of SKUs subscribed to',
  }),
  renewal_sku_ids: t.Union([
    t.Array(SnowflakeTypeSchema, {
      uniqueItems: true,
      description: 'List of SKUs that this user will be subscribed to at renewal',
    }),
    t.Null(),
  ]),
  entitlement_ids: t.Array(SnowflakeTypeSchema, {
    uniqueItems: true,
    description: 'List of entitlements granted for this subscription',
  }),
  current_period_start: t.Date({ description: 'Start of the current subscription period' }),
  current_period_end: t.Date({ description: 'End of the current subscription period' }),
  status: SubscriptionResponseStatusTypeSchema,
  canceled_at: t.Union([t.Date({ description: 'When the subscription was canceled' }), t.Null()]),
  country: t.Optional(
    t.Union([
      t.String({
        description:
          'ISO3166-1 alpha-2 country code of the payment source used to purchase the subscription',
      }),
      t.Null(),
    ]),
  ),
})

export const TargetUsersJobStatusTypesSchema = t.Union([
  t.Literal(0, { title: 'UNSPECIFIED', description: 'The default value.' }),
  t.Literal(1, { title: 'PROCESSING', description: 'The job is still being processed.' }),
  t.Literal(2, { title: 'COMPLETED', description: 'The job has been completed successfully.' }),
  t.Literal(3, {
    title: 'FAILED',
    description: 'The job has failed, see error_message field for more details.',
  }),
])

export const TargetUsersJobStatusResponseSchema = t.Object({
  status: TargetUsersJobStatusTypesSchema,
  total_users: UInt32TypeSchema,
  processed_users: UInt32TypeSchema,
  created_at: t.Union([
    t.Date({ description: 'The timestamp when the job was created.' }),
    t.Null(),
  ]),
  completed_at: t.Union([
    t.Date({ description: 'The timestamp when the job was successfully completed.' }),
    t.Null(),
  ]),
  error_message: t.Union([
    t.String({ description: 'The error message if the job failed.' }),
    t.Null(),
  ]),
})

export const ThreadSearchResponseSchema = t.Object({
  threads: t.Array(ThreadResponseSchema),
  members: t.Array(ThreadMemberResponseSchema),
  has_more: t.Boolean(),
  first_messages: t.Optional(t.Array(MessageResponseSchema)),
  total_results: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const ThreadSortingModeSchema = t.Union([
  t.Literal('relevance', { title: 'RELEVANCE' }),
  t.Literal('creation_time', { title: 'CREATION_TIME' }),
  t.Literal('last_message_time', { title: 'LAST_MESSAGE_TIME' }),
  t.Literal('archive_time', { title: 'ARCHIVE_TIME' }),
])

export const ThreadsResponseSchema = t.Object({
  threads: t.Array(ThreadResponseSchema),
  members: t.Array(ThreadMemberResponseSchema),
  has_more: t.Boolean(),
  first_messages: t.Optional(t.Array(MessageResponseSchema)),
})

export const TypingIndicatorResponseSchema = t.Object({})

export const UnbanUserFromGuildRequestSchema = t.Object({})

export const UpdateApplicationUserRoleConnectionRequestSchema = t.Object({
  platform_name: t.Optional(t.Union([t.String({ maxLength: 50 }), t.Null()])),
  platform_username: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  metadata: t.Optional(
    t.Union([
      t.Record(t.String(), t.String({ minLength: 1, maxLength: 100 }), { maxProperties: 5 }),
      t.Null(),
    ]),
  ),
})

export const UpdateDMRequestPartialSchema = t.Object({
  name: t.Optional(t.Union([t.String({ minLength: 0, maxLength: 100 }), t.Null()])),
})

export const UpdateGroupDMRequestPartialSchema = t.Object({
  name: t.Optional(t.Union([t.String({ minLength: 0, maxLength: 100 }), t.Null()])),
  icon: t.Optional(t.Union([t.String(), t.Null()])),
})

export const UpdateThreadTagRequestSchema = t.Object({
  name: t.String({ minLength: 0, maxLength: 50 }),
  emoji_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  emoji_name: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  moderated: t.Optional(t.Union([t.Boolean(), t.Null()])),
  id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
})

export const UpdateGuildChannelRequestPartialSchema = t.Object({
  type: t.Optional(t.Union([t.Null(), ChannelTypesSchema])),
  name: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
  position: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  topic: t.Optional(t.Union([t.String({ minLength: 0, maxLength: 4096 }), t.Null()])),
  bitrate: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 8000, maximum: 2147483647 }), t.Null()]),
  ),
  user_limit: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
  ),
  nsfw: t.Optional(t.Union([t.Boolean(), t.Null()])),
  rate_limit_per_user: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 21600 }), t.Null()])),
  parent_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  permission_overwrites: t.Optional(
    t.Union([t.Array(ChannelPermissionOverwriteRequestSchema, { maxItems: 100 }), t.Null()]),
  ),
  rtc_region: t.Optional(t.Union([t.String(), t.Null()])),
  video_quality_mode: t.Optional(t.Union([t.Null(), VideoQualityModesSchema])),
  default_auto_archive_duration: t.Optional(t.Union([t.Null(), ThreadAutoArchiveDurationSchema])),
  default_reaction_emoji: t.Optional(t.Union([t.Null(), UpdateDefaultReactionEmojiRequestSchema])),
  default_thread_rate_limit_per_user: t.Optional(
    t.Union([t.Integer({ minimum: 0, maximum: 21600 }), t.Null()]),
  ),
  default_sort_order: t.Optional(t.Union([t.Null(), ThreadSortOrderSchema])),
  default_forum_layout: t.Optional(t.Union([t.Null(), ForumLayoutSchema])),
  default_tag_setting: t.Optional(t.Union([t.Null(), ThreadSearchTagSettingSchema])),
  flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  available_tags: t.Optional(
    t.Union([t.Array(UpdateThreadTagRequestSchema, { maxItems: 20 }), t.Null()]),
  ),
})

export const UpdateOnboardingPromptRequestSchema = t.Object({
  title: t.String({ minLength: 1, maxLength: 100 }),
  options: t.Array(OnboardingPromptOptionRequestSchema, { minItems: 1, maxItems: 50 }),
  single_select: t.Optional(t.Union([t.Boolean(), t.Null()])),
  required: t.Optional(t.Union([t.Boolean(), t.Null()])),
  in_onboarding: t.Optional(t.Union([t.Boolean(), t.Null()])),
  type: t.Optional(t.Union([t.Null(), OnboardingPromptTypeSchema])),
  id: SnowflakeTypeSchema,
})

export const UpdateGuildOnboardingRequestSchema = t.Object({
  prompts: t.Optional(
    t.Union([t.Array(UpdateOnboardingPromptRequestSchema, { maxItems: 15 }), t.Null()]),
  ),
  enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  default_channel_ids: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 500, uniqueItems: true }), t.Null()]),
  ),
  mode: t.Optional(t.Union([t.Null(), GuildOnboardingModeSchema])),
})

export const UpdateMessageInteractionCallbackRequestSchema = t.Object({
  type: InteractionCallbackTypesSchema,
  data: t.Optional(
    t.Union([t.Null(), IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema]),
  ),
})

export const UpdateRolePositionsRequestSchema = t.Object({
  id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  position: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }), t.Null()]),
  ),
})

export const UpdateRoleRequestPartialSchema = t.Object({
  name: t.Optional(t.Union([t.String({ minLength: 1, maxLength: 100 }), t.Null()])),
  permissions: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  color: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 16777215 }), t.Null()])),
  colors: t.Optional(t.Union([t.Null(), RoleColorsSchema])),
  hoist: t.Optional(t.Union([t.Boolean(), t.Null()])),
  mentionable: t.Optional(t.Union([t.Boolean(), t.Null()])),
  icon: t.Optional(t.Union([t.String(), t.Null()])),
  unicode_emoji: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
})

export const UpdateSelfVoiceStateRequestPartialSchema = t.Object({
  request_to_speak_timestamp: t.Optional(t.Union([t.Date(), t.Null()])),
  suppress: t.Optional(t.Union([t.Boolean(), t.Null()])),
  channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
})

export const UpdateThreadRequestPartialSchema = t.Object({
  name: t.Optional(t.Union([t.String({ minLength: 0, maxLength: 100 }), t.Null()])),
  archived: t.Optional(t.Union([t.Boolean(), t.Null()])),
  locked: t.Optional(t.Union([t.Boolean(), t.Null()])),
  invitable: t.Optional(t.Union([t.Boolean(), t.Null()])),
  auto_archive_duration: t.Optional(t.Union([t.Null(), ThreadAutoArchiveDurationSchema])),
  rate_limit_per_user: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 21600 }), t.Null()]),
  ),
  flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  applied_tags: t.Optional(t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 5 }), t.Null()])),
  bitrate: t.Optional(
    t.Union([t.Integer({ format: 'int32', minimum: 8000, maximum: 2147483647 }), t.Null()]),
  ),
  user_limit: t.Optional(t.Union([t.Integer({ minimum: 0, maximum: 99 }), t.Null()])),
  rtc_region: t.Optional(t.Union([t.String(), t.Null()])),
  video_quality_mode: t.Optional(t.Union([t.Null(), VideoQualityModesSchema])),
})

export const UpdateVoiceStateRequestPartialSchema = t.Object({
  suppress: t.Optional(t.Union([t.Boolean(), t.Null()])),
  channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
})

export const UserGuildOnboardingResponseSchema = t.Object({
  guild_id: SnowflakeTypeSchema,
  prompts: t.Array(OnboardingPromptResponseSchema),
  default_channel_ids: t.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  enabled: t.Boolean(),
  mode: GuildOnboardingModeSchema,
})

export const UserPIIResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  username: t.String({ description: "the user's username, not unique across the platform" }),
  avatar: t.Union([t.String({ description: "the user's avatar hash" }), t.Null()]),
  discriminator: t.String({ description: "the user's Discord-tag" }),
  public_flags: t.Integer({
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    description: "the public flags on a user's account",
  }),
  flags: Int53TypeSchema,
  bot: t.Optional(t.Boolean({ description: 'whether the user belongs to an OAuth2 application' })),
  system: t.Optional(
    t.Boolean({
      description:
        'whether the user is an Official Discord System user (part of the urgent message system)',
    }),
  ),
  banner: t.Optional(t.Union([t.String({ description: "the user's banner hash" }), t.Null()])),
  accent_color: t.Optional(
    t.Union([
      t.Integer({
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
        description:
          "the user's banner color encoded as an integer representation of hexadecimal color code",
      }),
      t.Null(),
    ]),
  ),
  global_name: t.Union([
    t.String({ description: "the user's display name, if it is set" }),
    t.Null(),
  ]),
  avatar_decoration_data: t.Optional(
    t.Union([t.Null(), UserAvatarDecorationResponseSchema], {
      description: "data for the user's avatar decoration",
    }),
  ),
  collectibles: t.Optional(
    t.Union([t.Null(), UserCollectiblesResponseSchema], {
      description: "data for the user's collectibles",
    }),
  ),
  primary_guild: t.Optional(t.Union([t.Null(), UserPrimaryGuildResponseSchema])),
  mfa_enabled: t.Boolean(),
  locale: AvailableLocalesEnumSchema,
  premium_type: t.Optional(PremiumTypesSchema),
  email: t.Optional(t.Union([t.String(), t.Null()])),
  verified: t.Optional(t.Boolean()),
})

export const UserProfileMetadataSchema = t.Object({
  keyword_filter: t.Optional(
    t.Union([t.Array(t.String({ minLength: 1, maxLength: 60 }), { maxItems: 1000 }), t.Null()]),
  ),
  regex_patterns: t.Optional(
    t.Union([t.Array(t.String({ minLength: 1, maxLength: 260 }), { maxItems: 10 }), t.Null()]),
  ),
  allow_list: t.Optional(
    t.Union([t.Array(t.String({ minLength: 1, maxLength: 60 }), { maxItems: 100 }), t.Null()]),
  ),
})

export const UserProfileUpsertRequestSchema = t.Object({
  name: t.String({ maxLength: 100 }),
  event_type: AutomodEventTypeSchema,
  actions: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
        { minItems: 1, maxItems: 5 },
      ),
      t.Null(),
    ]),
  ),
  enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  exempt_roles: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }), t.Null()]),
  ),
  exempt_channels: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }), t.Null()]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: UserProfileMetadataSchema,
})

export const UserProfileUpsertRequestPartialSchema = t.Object({
  name: t.Optional(t.String({ maxLength: 100 })),
  event_type: t.Optional(AutomodEventTypeSchema),
  actions: t.Optional(
    t.Union([
      t.Array(
        t.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
        { minItems: 1, maxItems: 5 },
      ),
      t.Null(),
    ]),
  ),
  enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  exempt_roles: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }), t.Null()]),
  ),
  exempt_channels: t.Optional(
    t.Union([t.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }), t.Null()]),
  ),
  trigger_type: t.Optional(AutomodTriggerTypeSchema),
  trigger_metadata: t.Optional(UserProfileMetadataSchema),
})

export const VanityURLErrorResponseSchema = t.Object({
  message: t.String(),
  code: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const VanityURLResponseSchema = t.Object({
  code: t.Union([t.String(), t.Null()]),
  uses: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  error: t.Optional(t.Union([t.Null(), VanityURLErrorResponseSchema])),
})

export const VoiceRegionResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  custom: t.Boolean(),
  deprecated: t.Boolean(),
  optimal: t.Boolean(),
})

export const VoiceScheduledEventCreateRequestSchema = t.Object({
  name: t.String({ maxLength: 100 }),
  description: t.Optional(t.Union([t.String({ maxLength: 1000 }), t.Null()])),
  image: t.Optional(t.Union([t.String(), t.Null()])),
  scheduled_start_time: t.Date(),
  scheduled_end_time: t.Optional(t.Union([t.Date(), t.Null()])),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  recurrence_rule: t.Optional(
    t.Union([t.Null(), RecurrenceRuleSchema], {
      description: 'Recurrence rule for the scheduled event',
    }),
  ),
  entity_metadata: t.Optional(t.Union([t.Null(), EntityMetadataVoiceSchema])),
})

export const VoiceScheduledEventPatchRequestPartialSchema = t.Object({
  status: t.Optional(t.Union([t.Null(), GuildScheduledEventStatusesSchema])),
  name: t.Optional(t.String({ maxLength: 100 })),
  description: t.Optional(t.Union([t.String({ maxLength: 1000 }), t.Null()])),
  image: t.Optional(t.Union([t.String(), t.Null()])),
  scheduled_start_time: t.Optional(t.Date()),
  scheduled_end_time: t.Optional(t.Union([t.Date(), t.Null()])),
  entity_type: t.Optional(t.Union([t.Null(), GuildScheduledEventEntityTypesSchema])),
  privacy_level: t.Optional(GuildScheduledEventPrivacyLevelsSchema),
  channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  recurrence_rule: t.Optional(
    t.Union([t.Null(), RecurrenceRuleSchema], {
      description: 'Recurrence rule for the scheduled event',
    }),
  ),
  entity_metadata: t.Optional(t.Union([t.Null(), EntityMetadataVoiceSchema])),
})

export const VoiceStateResponseSchema = t.Object({
  channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  deaf: t.Boolean(),
  guild_id: t.Union([t.Null(), SnowflakeTypeSchema]),
  member: t.Optional(GuildMemberResponseSchema),
  mute: t.Boolean(),
  request_to_speak_timestamp: t.Union([t.Date(), t.Null()]),
  suppress: t.Boolean(),
  self_stream: t.Union([t.Boolean(), t.Null()]),
  self_deaf: t.Boolean(),
  self_mute: t.Boolean(),
  self_video: t.Boolean(),
  session_id: t.String(),
  user_id: SnowflakeTypeSchema,
})

export const WelcomeScreenPatchRequestPartialSchema = t.Object({
  description: t.Optional(t.Union([t.String({ maxLength: 140 }), t.Null()])),
  welcome_channels: t.Optional(
    t.Union([t.Array(GuildWelcomeChannelSchema, { maxItems: 5 }), t.Null()]),
  ),
  enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
})

export const WidgetActivitySchema = t.Object({ name: t.String() })

export const WidgetChannelSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  position: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const WidgetImageStylesSchema = t.Union([
  t.Literal('shield', {
    title: 'SHIELD',
    description: 'shield style widget with Discord icon and guild members online count',
  }),
  t.Literal('banner1', {
    title: 'BANNER1',
    description:
      'large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget',
  }),
  t.Literal('banner2', {
    title: 'BANNER2',
    description:
      'smaller widget style with guild icon, name and online count. Split on the right with Discord logo',
  }),
  t.Literal('banner3', {
    title: 'BANNER3',
    description:
      'large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right',
  }),
  t.Literal('banner4', {
    title: 'BANNER4',
    description:
      'large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom',
  }),
])

export const WidgetUserDiscriminatorSchema = t.Literal('0000', { title: 'ZEROES' })

export const WidgetMemberSchema = t.Object({
  id: t.String(),
  username: t.String(),
  discriminator: WidgetUserDiscriminatorSchema,
  avatar: t.Null(),
  status: t.String(),
  avatar_url: t.String({ format: 'uri' }),
  activity: t.Optional(WidgetActivitySchema),
  deaf: t.Optional(t.Boolean()),
  mute: t.Optional(t.Boolean()),
  self_deaf: t.Optional(t.Boolean()),
  self_mute: t.Optional(t.Boolean()),
  suppress: t.Optional(t.Boolean()),
  channel_id: t.Optional(SnowflakeTypeSchema),
})

export const WidgetResponseSchema = t.Object({
  id: SnowflakeTypeSchema,
  name: t.String(),
  instant_invite: t.Union([t.String(), t.Null()]),
  channels: t.Array(WidgetChannelSchema),
  members: t.Array(WidgetMemberSchema),
  presence_count: t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
})

export const WidgetSettingsResponseSchema = t.Object({
  enabled: t.Boolean(),
  channel_id: t.Union([t.Null(), SnowflakeTypeSchema]),
})

export const ErrorSchema = t.Object(
  {
    code: t.Integer({
      maximum: 9007199254740991,
      description: 'Discord internal error code. See error code reference',
    }),
    message: t.String({ description: 'Human-readable error message' }),
  },
  { description: 'A single error, either for an API response or a specific field.' },
)

export const InnerErrorsSchema = t.Object(
  { _errors: t.Array(ErrorSchema, { description: 'The list of errors for this field' }) },
  { additionalProperties: false },
)

export const ErrorDetailsSchema = t.Recursive((Self) =>
  t.Union([t.Record(t.String(), Self), InnerErrorsSchema]),
)

export const ErrorResponseSchema = t.Intersect(
  [ErrorSchema, t.Object({ errors: t.Optional(ErrorDetailsSchema) })],
  { description: 'Errors object returned by the Discord API' },
)

export const RatelimitedResponseSchema = t.Intersect(
  [
    ErrorSchema,
    t.Object({
      retry_after: t.Number({
        description: 'The number of seconds to wait before retrying your request',
      }),
      global: t.Boolean({
        description:
          'Whether you are being ratelimited by the global ratelimit or a per-endpoint ratelimit',
      }),
    }),
  ],
  { description: 'Ratelimit error object returned by the Discord API' },
)
