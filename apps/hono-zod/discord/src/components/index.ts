import * as z from 'zod'

export const AccountResponseSchema = z.object({ id: z.string(), name: z.string().nullable() })

export type AccountResponse = z.infer<typeof AccountResponseSchema>

export const MessageComponentTypesSchema = z.xor([
  z.literal(1).meta({ description: 'Container for other components' }),
  z.literal(2).meta({ description: 'Button object' }),
  z.literal(3).meta({ description: 'Select menu for picking from defined text options' }),
  z.literal(4).meta({ description: 'Text input object' }),
  z.literal(5).meta({ description: 'Select menu for users' }),
  z.literal(6).meta({ description: 'Select menu for roles' }),
  z.literal(7).meta({ description: 'Select menu for mentionables (users and roles)' }),
  z.literal(8).meta({ description: 'Select menu for channels' }),
  z.literal(9).meta({ description: 'Section component' }),
  z.literal(10).meta({ description: 'Text component' }),
  z.literal(11).meta({ description: 'Thumbnail component' }),
  z.literal(12).meta({ description: 'Media gallery component' }),
  z.literal(13).meta({ description: 'File component' }),
  z.literal(14).meta({ description: 'Separator component' }),
  z.literal(17).meta({ description: 'Container component' }),
  z.literal(18).meta({ description: 'Label component' }),
  z.literal(19).meta({ description: 'File upload component' }),
  z.literal(21).meta({ description: 'Radio group component' }),
  z.literal(22).meta({ description: 'Checkbox group component' }),
  z.literal(23).meta({ description: 'Checkbox component' }),
])

export type MessageComponentTypes = z.infer<typeof MessageComponentTypesSchema>

export const ButtonStyleTypesSchema = z.xor([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
])

export type ButtonStyleTypes = z.infer<typeof ButtonStyleTypesSchema>

export const SnowflakeTypeSchema = z.string().regex(/^(0|[1-9][0-9]*)$/)

export type SnowflakeType = z.infer<typeof SnowflakeTypeSchema>

export const ComponentEmojiForRequestSchema = z.object({
  id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  name: z.string().max(32),
})

export type ComponentEmojiForRequest = z.infer<typeof ComponentEmojiForRequestSchema>

export const ButtonComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100).nullable().exactOptional(),
  style: ButtonStyleTypesSchema,
  label: z.string().max(80).nullable().exactOptional(),
  disabled: z.boolean().nullable().exactOptional(),
  url: z.url().max(512).nullable().exactOptional(),
  sku_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  emoji: z.xor([z.null().nullable(), ComponentEmojiForRequestSchema]).exactOptional(),
})

export type ButtonComponentForMessageRequest = z.infer<
  typeof ButtonComponentForMessageRequestSchema
>

export const SnowflakeSelectDefaultValueTypesSchema = z.xor([
  z.literal('user'),
  z.literal('role'),
  z.literal('channel'),
])

export type SnowflakeSelectDefaultValueTypes = z.infer<
  typeof SnowflakeSelectDefaultValueTypesSchema
>

export const ChannelSelectDefaultValueSchema = z.object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type ChannelSelectDefaultValue = z.infer<typeof ChannelSelectDefaultValueSchema>

export const ChannelTypesSchema = z.xor([
  z.literal(1).meta({ description: 'A direct message between users' }),
  z.literal(3).meta({ description: 'A direct message between multiple users' }),
  z.literal(0).meta({ description: 'A text channel within a server' }),
  z.literal(2).meta({ description: 'A voice channel within a server' }),
  z.literal(4).meta({ description: 'An organizational category that contains up to 50 channels' }),
  z
    .literal(5)
    .meta({
      description:
        'A channel that users can follow and crosspost into their own server (formerly news channels)',
    }),
  z
    .literal(10)
    .meta({ description: 'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel' }),
  z
    .literal(11)
    .meta({
      description:
        'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
    }),
  z
    .literal(12)
    .meta({
      description:
        'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
    }),
  z.literal(13).meta({ description: 'A voice channel for hosting events with an audience' }),
  z.literal(14).meta({ description: 'The channel in a hub containing the listed servers' }),
  z.literal(15).meta({ description: 'Channel that can only contain threads' }),
])

export type ChannelTypes = z.infer<typeof ChannelTypesSchema>

export const ChannelSelectComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  placeholder: z.string().max(150).nullable().exactOptional(),
  min_values: z.int().min(0).max(25).nullable().exactOptional(),
  max_values: z.int().min(1).max(25).nullable().exactOptional(),
  disabled: z.boolean().nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  default_values: z.array(ChannelSelectDefaultValueSchema).max(25).nullable().exactOptional(),
  channel_types: z
    .array(ChannelTypesSchema)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
})

export type ChannelSelectComponentForMessageRequest = z.infer<
  typeof ChannelSelectComponentForMessageRequestSchema
>

export const RoleSelectDefaultValueSchema = z.object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type RoleSelectDefaultValue = z.infer<typeof RoleSelectDefaultValueSchema>

export const UserSelectDefaultValueSchema = z.object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type UserSelectDefaultValue = z.infer<typeof UserSelectDefaultValueSchema>

export const MentionableSelectComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  placeholder: z.string().max(150).nullable().exactOptional(),
  min_values: z.int().min(0).max(25).nullable().exactOptional(),
  max_values: z.int().min(1).max(25).nullable().exactOptional(),
  disabled: z.boolean().nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  default_values: z
    .array(z.xor([RoleSelectDefaultValueSchema, UserSelectDefaultValueSchema]))
    .max(25)
    .nullable()
    .exactOptional(),
})

export type MentionableSelectComponentForMessageRequest = z.infer<
  typeof MentionableSelectComponentForMessageRequestSchema
>

export const RoleSelectComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  placeholder: z.string().max(150).nullable().exactOptional(),
  min_values: z.int().min(0).max(25).nullable().exactOptional(),
  max_values: z.int().min(1).max(25).nullable().exactOptional(),
  disabled: z.boolean().nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  default_values: z.array(RoleSelectDefaultValueSchema).max(25).nullable().exactOptional(),
})

export type RoleSelectComponentForMessageRequest = z.infer<
  typeof RoleSelectComponentForMessageRequestSchema
>

export const StringSelectOptionForRequestSchema = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(100),
  description: z.string().max(100).nullable().exactOptional(),
  default: z.boolean().nullable().exactOptional(),
  emoji: z.xor([z.null().nullable(), ComponentEmojiForRequestSchema]).exactOptional(),
})

export type StringSelectOptionForRequest = z.infer<typeof StringSelectOptionForRequestSchema>

export const StringSelectComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  placeholder: z.string().max(150).nullable().exactOptional(),
  min_values: z.int().min(0).max(25).nullable().exactOptional(),
  max_values: z.int().min(1).max(25).nullable().exactOptional(),
  disabled: z.boolean().nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  options: z.array(StringSelectOptionForRequestSchema).min(1).max(25),
})

export type StringSelectComponentForMessageRequest = z.infer<
  typeof StringSelectComponentForMessageRequestSchema
>

export const UserSelectComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  placeholder: z.string().max(150).nullable().exactOptional(),
  min_values: z.int().min(0).max(25).nullable().exactOptional(),
  max_values: z.int().min(1).max(25).nullable().exactOptional(),
  disabled: z.boolean().nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  default_values: z.array(UserSelectDefaultValueSchema).max(25).nullable().exactOptional(),
})

export type UserSelectComponentForMessageRequest = z.infer<
  typeof UserSelectComponentForMessageRequestSchema
>

export const ActionRowComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  components: z
    .array(
      z.xor([
        ButtonComponentForMessageRequestSchema,
        ChannelSelectComponentForMessageRequestSchema,
        MentionableSelectComponentForMessageRequestSchema,
        RoleSelectComponentForMessageRequestSchema,
        StringSelectComponentForMessageRequestSchema,
        UserSelectComponentForMessageRequestSchema,
      ]),
    )
    .min(1)
    .max(5),
})

export type ActionRowComponentForMessageRequest = z.infer<
  typeof ActionRowComponentForMessageRequestSchema
>

export const TextInputStyleTypesSchema = z.xor([
  z.literal(1).meta({ description: 'Single-line input' }),
  z.literal(2).meta({ description: 'Multi-line input' }),
])

export type TextInputStyleTypes = z.infer<typeof TextInputStyleTypesSchema>

export const TextInputComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  style: TextInputStyleTypesSchema,
  label: z.string().min(1).max(45).nullable().exactOptional(),
  value: z.string().max(4000).nullable().exactOptional(),
  placeholder: z.string().max(100).nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  min_length: z.int().min(0).max(4000).nullable().exactOptional(),
  max_length: z.int().min(1).max(4000).nullable().exactOptional(),
})

export type TextInputComponentForModalRequest = z.infer<
  typeof TextInputComponentForModalRequestSchema
>

export const ActionRowComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  components: z.array(TextInputComponentForModalRequestSchema).min(1).max(5),
})

export type ActionRowComponentForModalRequest = z.infer<
  typeof ActionRowComponentForModalRequestSchema
>

export const ComponentEmojiResponseSchema = z.object({
  id: SnowflakeTypeSchema.exactOptional(),
  name: z.string(),
  animated: z.boolean().exactOptional(),
})

export type ComponentEmojiResponse = z.infer<typeof ComponentEmojiResponseSchema>

export const ButtonComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  custom_id: z.string().exactOptional(),
  style: ButtonStyleTypesSchema,
  label: z.string().exactOptional(),
  disabled: z.boolean().exactOptional(),
  emoji: ComponentEmojiResponseSchema.exactOptional(),
  url: z.url().max(2048).nullable().exactOptional(),
  sku_id: SnowflakeTypeSchema.exactOptional(),
})

export type ButtonComponentResponse = z.infer<typeof ButtonComponentResponseSchema>

export const ChannelSelectDefaultValueResponseSchema = z.object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type ChannelSelectDefaultValueResponse = z.infer<
  typeof ChannelSelectDefaultValueResponseSchema
>

export const ChannelSelectComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  custom_id: z.string(),
  placeholder: z.string().exactOptional(),
  min_values: z.int32(),
  max_values: z.int32(),
  disabled: z.boolean().exactOptional(),
  channel_types: z
    .array(ChannelTypesSchema)
    .refine((val) => new Set(val).size === val.length)
    .exactOptional(),
  default_values: z.array(ChannelSelectDefaultValueResponseSchema).exactOptional(),
})

export type ChannelSelectComponentResponse = z.infer<typeof ChannelSelectComponentResponseSchema>

export const RoleSelectDefaultValueResponseSchema = z.object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type RoleSelectDefaultValueResponse = z.infer<typeof RoleSelectDefaultValueResponseSchema>

export const UserSelectDefaultValueResponseSchema = z.object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type UserSelectDefaultValueResponse = z.infer<typeof UserSelectDefaultValueResponseSchema>

export const MentionableSelectComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  custom_id: z.string(),
  placeholder: z.string().exactOptional(),
  min_values: z.int32(),
  max_values: z.int32(),
  disabled: z.boolean().exactOptional(),
  default_values: z
    .array(z.xor([RoleSelectDefaultValueResponseSchema, UserSelectDefaultValueResponseSchema]))
    .exactOptional(),
})

export type MentionableSelectComponentResponse = z.infer<
  typeof MentionableSelectComponentResponseSchema
>

export const RoleSelectComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  custom_id: z.string(),
  placeholder: z.string().exactOptional(),
  min_values: z.int32(),
  max_values: z.int32(),
  disabled: z.boolean().exactOptional(),
  default_values: z.array(RoleSelectDefaultValueResponseSchema).exactOptional(),
})

export type RoleSelectComponentResponse = z.infer<typeof RoleSelectComponentResponseSchema>

export const StringSelectOptionResponseSchema = z.object({
  label: z.string(),
  value: z.string(),
  description: z.string().exactOptional(),
  emoji: ComponentEmojiResponseSchema.exactOptional(),
  default: z.boolean().exactOptional(),
})

export type StringSelectOptionResponse = z.infer<typeof StringSelectOptionResponseSchema>

export const StringSelectComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  custom_id: z.string(),
  placeholder: z.string().exactOptional(),
  min_values: z.int32(),
  max_values: z.int32(),
  disabled: z.boolean().exactOptional(),
  options: z.array(StringSelectOptionResponseSchema),
})

export type StringSelectComponentResponse = z.infer<typeof StringSelectComponentResponseSchema>

export const TextInputComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  custom_id: z.string(),
  style: TextInputStyleTypesSchema,
  label: z.string().nullable(),
  value: z.string().exactOptional(),
  placeholder: z.string().exactOptional(),
  required: z.boolean().exactOptional(),
  min_length: z.int32().nullable(),
  max_length: z.int32().nullable(),
})

export type TextInputComponentResponse = z.infer<typeof TextInputComponentResponseSchema>

export const UserSelectComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  custom_id: z.string(),
  placeholder: z.string().exactOptional(),
  min_values: z.int32(),
  max_values: z.int32(),
  disabled: z.boolean().exactOptional(),
  default_values: z.array(UserSelectDefaultValueResponseSchema).exactOptional(),
})

export type UserSelectComponentResponse = z.infer<typeof UserSelectComponentResponseSchema>

export const ActionRowComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  components: z.array(
    z.xor([
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

export type ActionRowComponentResponse = z.infer<typeof ActionRowComponentResponseSchema>

export const ActionTypesSchema = z.xor([
  z.literal('TYPING_START').meta({ description: 'User started typing in a channel' }),
  z.literal('INVITE_CREATE').meta({ description: 'Invite to a channel was created' }),
  z.literal('INVITE_DELETE').meta({ description: 'Invite to a channel was deleted' }),
  z
    .literal('WEBHOOKS_UPDATE')
    .meta({ description: 'Guild channel webhook was created, updated, or deleted' }),
  z.literal('CHANNEL_CREATE').meta({ description: 'New guild channel created' }),
  z
    .literal('VOICE_CHANNEL_STATUS_UPDATE')
    .meta({ description: 'Voice channel status was updated' }),
  z.literal('CHANNEL_UPDATE').meta({ description: 'Channel was updated' }),
  z.literal('CHANNEL_DELETE').meta({ description: 'Channel was deleted' }),
  z.literal('CHANNEL_PINS_UPDATE').meta({ description: 'Message was pinned or unpinned' }),
  z
    .literal('THREAD_CREATE')
    .meta({ description: 'Thread created, also sent when being added to a private thread' }),
  z.literal('THREAD_UPDATE').meta({ description: 'Thread was updated' }),
  z.literal('THREAD_DELETE').meta({ description: 'Thread was deleted' }),
  z
    .literal('THREAD_LIST_SYNC')
    .meta({
      description:
        'Sent when gaining access to a channel, contains all active threads in that channel',
    }),
  z
    .literal('THREAD_MEMBER_UPDATE')
    .meta({ description: 'Thread member for the current user was updated' }),
  z
    .literal('THREAD_MEMBERS_UPDATE')
    .meta({ description: 'Some user(s) were added to or removed from a thread' }),
  z
    .literal('GUILD_CREATE')
    .meta({
      description:
        'Lazy-load for unavailable guild, guild became available, or user joined a new guild',
    }),
  z.literal('GUILD_UPDATE').meta({ description: 'Guild was updated' }),
  z
    .literal('GUILD_DELETE')
    .meta({ description: 'Guild became unavailable, or user left/was removed from a guild' }),
  z.literal('GUILD_EMOJIS_UPDATE').meta({ description: 'Guild emojis were updated' }),
  z.literal('GUILD_STICKERS_UPDATE').meta({ description: 'Guild stickers were updated' }),
  z.literal('GUILD_INTEGRATIONS_UPDATE').meta({ description: 'Guild integration was updated' }),
  z.literal('GUILD_MEMBER_ADD').meta({ description: 'New user joined a guild' }),
  z.literal('GUILD_MEMBER_UPDATE').meta({ description: 'Guild member was updated' }),
  z.literal('GUILD_MEMBER_REMOVE').meta({ description: 'User was removed from a guild' }),
  z.literal('GUILD_BAN_ADD').meta({ description: 'User was banned from a guild' }),
  z.literal('GUILD_BAN_REMOVE').meta({ description: 'User was unbanned from a guild' }),
  z.literal('GUILD_ROLE_CREATE').meta({ description: 'Guild role was created' }),
  z.literal('GUILD_ROLE_UPDATE').meta({ description: 'Guild role was updated' }),
  z.literal('GUILD_ROLE_DELETE').meta({ description: 'Guild role was deleted' }),
  z.literal('GUILD_MEMBERS_CHUNK').meta({ description: 'Response to Request Guild Members' }),
  z.literal('MESSAGE_CREATE').meta({ description: 'Message was created' }),
  z.literal('MESSAGE_UPDATE').meta({ description: 'Message was edited' }),
  z.literal('MESSAGE_DELETE').meta({ description: 'Message was deleted' }),
  z.literal('MESSAGE_DELETE_BULK').meta({ description: 'Multiple messages were deleted at once' }),
  z.literal('MESSAGE_REACTION_ADD').meta({ description: 'User reacted to a message' }),
  z
    .literal('MESSAGE_REACTION_REMOVE')
    .meta({ description: 'User removed a reaction from a message' }),
  z
    .literal('MESSAGE_REACTION_REMOVE_ALL')
    .meta({ description: 'All reactions were explicitly removed from a message' }),
  z
    .literal('MESSAGE_REACTION_REMOVE_EMOJI')
    .meta({
      description: 'All reactions for a given emoji were explicitly removed from a message',
    }),
  z.literal('USER_UPDATE').meta({ description: 'Properties about the user changed' }),
  z.literal('ENTITLEMENT_CREATE').meta({ description: 'Entitlement was created' }),
  z.literal('ENTITLEMENT_UPDATE').meta({ description: 'Entitlement was updated' }),
  z.literal('ENTITLEMENT_DELETE').meta({ description: 'Entitlement was deleted' }),
  z.literal('READY').meta({ description: 'Contains the initial state information' }),
  z.literal('RESUMED').meta({ description: 'Response to Resume' }),
  z.literal('PRESENCE_UPDATE').meta({ description: 'User was updated' }),
  z
    .literal('VOICE_STATE_UPDATE')
    .meta({ description: 'Someone joined, left, or moved a voice channel' }),
  z.literal('VOICE_SERVER_UPDATE').meta({ description: "Guild's voice server was updated" }),
  z
    .literal('LOBBY_MESSAGE_CREATE')
    .meta({ description: 'Sent when a message is created in a lobby' }),
  z
    .literal('LOBBY_MESSAGE_UPDATE')
    .meta({ description: 'Sent when a message is updated in a lobby' }),
  z
    .literal('LOBBY_MESSAGE_DELETE')
    .meta({ description: 'Sent when a message is deleted from a lobby' }),
  z
    .literal('GAME_DIRECT_MESSAGE_CREATE')
    .meta({
      description: 'Sent when a direct message is created during an active Social SDK session',
    }),
  z
    .literal('GAME_DIRECT_MESSAGE_DELETE')
    .meta({
      description: 'Sent when a direct message is deleted during an active Social SDK session',
    }),
  z
    .literal('GAME_DIRECT_MESSAGE_UPDATE')
    .meta({
      description: 'Sent when a direct message is updated during an active Social SDK session',
    }),
  z
    .literal('INTERACTION_CREATE')
    .meta({ description: 'User used an interaction, such as an Application Command' }),
  z.literal('INTEGRATION_CREATE').meta({ description: 'Guild integration was created' }),
  z.literal('INTEGRATION_UPDATE').meta({ description: 'Guild integration was updated' }),
  z.literal('INTEGRATION_DELETE').meta({ description: 'Guild integration was deleted' }),
  z
    .literal('APPLICATION_COMMAND_PERMISSIONS_UPDATE')
    .meta({ description: 'Application command permission was updated' }),
  z
    .literal('APPLICATION_AUTHORIZED')
    .meta({
      description: 'Sent when an app was authorized by a user to a server or their account',
    }),
  z
    .literal('APPLICATION_DEAUTHORIZED')
    .meta({ description: 'Sent when an app was deauthorized by a user' }),
  z.literal('STAGE_INSTANCE_CREATE').meta({ description: 'Stage instance was created' }),
  z.literal('STAGE_INSTANCE_UPDATE').meta({ description: 'Stage instance was updated' }),
  z.literal('STAGE_INSTANCE_DELETE').meta({ description: 'Stage instance was deleted or closed' }),
  z
    .literal('GUILD_AUDIT_LOG_ENTRY_CREATE')
    .meta({ description: 'A guild audit log entry was created' }),
  z
    .literal('GUILD_SCHEDULED_EVENT_CREATE')
    .meta({ description: 'Guild scheduled event was created' }),
  z
    .literal('GUILD_SCHEDULED_EVENT_UPDATE')
    .meta({ description: 'Guild scheduled event was updated' }),
  z
    .literal('GUILD_SCHEDULED_EVENT_DELETE')
    .meta({ description: 'Guild scheduled event was deleted' }),
  z
    .literal('GUILD_SCHEDULED_EVENT_USER_ADD')
    .meta({ description: 'User subscribed to a guild scheduled event' }),
  z
    .literal('GUILD_SCHEDULED_EVENT_USER_REMOVE')
    .meta({ description: 'User unsubscribed from a guild scheduled event' }),
  z
    .literal('AUTO_MODERATION_RULE_CREATE')
    .meta({ description: 'Auto Moderation rule was created' }),
  z
    .literal('AUTO_MODERATION_RULE_UPDATE')
    .meta({ description: 'Auto Moderation rule was updated' }),
  z
    .literal('AUTO_MODERATION_RULE_DELETE')
    .meta({ description: 'Auto Moderation rule was deleted' }),
  z
    .literal('AUTO_MODERATION_ACTION_EXECUTION')
    .meta({
      description:
        'Auto Moderation rule was triggered and an action was executed (.e.g. a message was blocked)',
    }),
  z.literal('GUILD_SOUNDBOARD_SOUNDS_UPDATE'),
  z.literal('GUILD_SOUNDBOARD_SOUND_CREATE'),
  z.literal('GUILD_SOUNDBOARD_SOUND_UPDATE'),
  z.literal('GUILD_SOUNDBOARD_SOUND_DELETE'),
  z
    .literal('QUEST_USER_ENROLLMENT')
    .meta({ description: 'User was added to a Quest (currently unavailable)' }),
  z.literal('RATE_LIMITED'),
])

export type ActionTypes = z.infer<typeof ActionTypesSchema>

export const ApplicationTypesSchema = z.xor([z.literal(4)])

export type ApplicationTypes = z.infer<typeof ApplicationTypesSchema>

export const Int53TypeSchema = z
  .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
  .transform((val) => BigInt(val))
  .pipe(z.int64().min(-9007199254740991n).max(9007199254740991n))

export type Int53Type = z.infer<typeof Int53TypeSchema>

export const UserAvatarDecorationResponseSchema = z.object({
  asset: z.string().meta({ description: 'the avatar decoration hash' }),
  sku_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: "id of the avatar decoration's SKU" }),
})

export type UserAvatarDecorationResponse = z.infer<typeof UserAvatarDecorationResponseSchema>

export const NameplatePaletteSchema = z.xor([
  z.literal('crimson').meta({ description: 'Crimson color palette' }),
  z.literal('berry').meta({ description: 'Berry color palette' }),
  z.literal('sky').meta({ description: 'Sky color palette' }),
  z.literal('teal').meta({ description: 'Teal color palette' }),
  z.literal('forest').meta({ description: 'Forest color palette' }),
  z.literal('bubble_gum').meta({ description: 'Bubble gum color palette' }),
  z.literal('violet').meta({ description: 'Violet color palette' }),
  z.literal('cobalt').meta({ description: 'Cobalt color palette' }),
  z.literal('clover').meta({ description: 'Clover color palette' }),
  z.literal('lemon').meta({ description: 'Lemon color palette' }),
  z.literal('white').meta({ description: 'White color palette' }),
  z.literal('black').meta({ description: 'Black color palette' }),
])

export type NameplatePalette = z.infer<typeof NameplatePaletteSchema>

export const UserNameplateResponseSchema = z.object({
  sku_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: 'ID of the nameplate SKU' }),
  asset: z.string().meta({ description: 'Path to the nameplate asset' }),
  label: z.string().meta({ description: 'The label of this nameplate. Currently unused' }),
  palette: NameplatePaletteSchema.meta({ description: 'Background color of the nameplate' }),
})

export type UserNameplateResponse = z.infer<typeof UserNameplateResponseSchema>

export const UserCollectiblesResponseSchema = z.object({
  nameplate: z
    .xor([z.null().nullable(), UserNameplateResponseSchema])
    .meta({ description: 'Object mapping of nameplate data' }),
})

export type UserCollectiblesResponse = z.infer<typeof UserCollectiblesResponseSchema>

export const UserPrimaryGuildResponseSchema = z.object({
  identity_guild_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: "the id of the user's primary guild" }),
  identity_enabled: z
    .boolean()
    .nullable()
    .meta({ description: "whether the user is displaying the primary guild's server tag" }),
  tag: z
    .string()
    .nullable()
    .meta({ description: "the text of the user's server tag, limited to 4 characters" }),
  badge: z.string().nullable().meta({ description: 'the server tag badge hash' }),
})

export type UserPrimaryGuildResponse = z.infer<typeof UserPrimaryGuildResponseSchema>

export const UserResponseSchema = z.object({
  id: SnowflakeTypeSchema.meta({ description: "the user's id" }),
  username: z.string().meta({ description: "the user's username, not unique across the platform" }),
  avatar: z.string().nullable().meta({ description: "the user's avatar hash" }),
  discriminator: z.string().meta({ description: "the user's Discord-tag" }),
  public_flags: z.int32().meta({ description: "the public flags on a user's account" }),
  flags: Int53TypeSchema.meta({ description: "the flags on a user's account" }),
  bot: z
    .boolean()
    .meta({ description: 'whether the user belongs to an OAuth2 application' })
    .exactOptional(),
  system: z
    .boolean()
    .meta({
      description:
        'whether the user is an Official Discord System user (part of the urgent message system)',
    })
    .exactOptional(),
  banner: z.string().nullable().meta({ description: "the user's banner hash" }).exactOptional(),
  accent_color: z
    .int32()
    .nullable()
    .meta({
      description:
        "the user's banner color encoded as an integer representation of hexadecimal color code",
    })
    .exactOptional(),
  global_name: z.string().nullable().meta({ description: "the user's display name, if it is set" }),
  avatar_decoration_data: z
    .xor([z.null().nullable(), UserAvatarDecorationResponseSchema])
    .meta({ description: "data for the user's avatar decoration" })
    .exactOptional(),
  collectibles: z
    .xor([z.null().nullable(), UserCollectiblesResponseSchema])
    .meta({ description: "data for the user's collectibles" })
    .exactOptional(),
  primary_guild: z
    .xor([z.null().nullable(), UserPrimaryGuildResponseSchema])
    .meta({ description: "the user's primary guild" }),
})

export type UserResponse = z.infer<typeof UserResponseSchema>

export const OAuth2ScopesSchema = z.xor([
  z.literal('identify').meta({ description: 'allows /users/@me without email' }),
  z.literal('email').meta({ description: 'enables /users/@me to return an email' }),
  z
    .literal('connections')
    .meta({ description: 'allows /users/@me/connections to return linked third-party accounts' }),
  z
    .literal('guilds')
    .meta({
      description:
        "allows /users/@me/guilds to return basic information about all of a user's guilds",
    }),
  z
    .literal('guilds.join')
    .meta({
      description:
        'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
    }),
  z
    .literal('guilds.members.read')
    .meta({
      description:
        "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
    }),
  z.literal('gdm.join').meta({ description: 'allows your app to join users to a group dm' }),
  z
    .literal('bot')
    .meta({
      description: "for oauth2 bots, this puts the bot in the user's selected guild by default",
    }),
  z
    .literal('rpc')
    .meta({
      description:
        "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
    }),
  z
    .literal('rpc.notifications.read')
    .meta({
      description:
        'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
    }),
  z
    .literal('rpc.voice.read')
    .meta({
      description:
        "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
    }),
  z
    .literal('rpc.voice.write')
    .meta({
      description:
        "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
    }),
  z
    .literal('rpc.video.read')
    .meta({
      description:
        "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
    }),
  z
    .literal('rpc.video.write')
    .meta({
      description:
        "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
    }),
  z
    .literal('rpc.screenshare.read')
    .meta({
      description:
        "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
    }),
  z
    .literal('rpc.screenshare.write')
    .meta({
      description:
        "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
    }),
  z
    .literal('rpc.activities.write')
    .meta({
      description:
        "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
    }),
  z
    .literal('webhook.incoming')
    .meta({
      description:
        'this generates a webhook that is returned in the oauth token response for authorization code grants',
    }),
  z
    .literal('messages.read')
    .meta({
      description:
        'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
    }),
  z
    .literal('applications.builds.upload')
    .meta({
      description:
        "allows your app to upload/update builds for a user's applications - requires Discord approval",
    }),
  z
    .literal('applications.builds.read')
    .meta({ description: "allows your app to read build data for a user's applications" }),
  z
    .literal('applications.commands')
    .meta({ description: 'allows your app to use commands in a guild' }),
  z
    .literal('applications.commands.permissions.update')
    .meta({
      description:
        'allows your app to update permissions for its commands in a guild a user has permissions to',
    }),
  z
    .literal('applications.commands.update')
    .meta({
      description:
        'allows your app to update its commands using a Bearer token - client credentials grant only',
    }),
  z
    .literal('applications.store.update')
    .meta({
      description:
        "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
    }),
  z
    .literal('applications.entitlements')
    .meta({ description: "allows your app to read entitlements for a user's applications" }),
  z
    .literal('activities.read')
    .meta({
      description:
        'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
    }),
  z
    .literal('activities.write')
    .meta({
      description:
        "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
    }),
  z
    .literal('activities.invites.write')
    .meta({
      description:
        'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
    }),
  z
    .literal('relationships.read')
    .meta({
      description:
        "allows your app to know a user's friends and implicit relationships - requires Discord approval",
    }),
  z
    .literal('voice')
    .meta({
      description:
        "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
    }),
  z
    .literal('dm_channels.read')
    .meta({
      description:
        "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
    }),
  z
    .literal('role_connections.write')
    .meta({
      description: "allows your app to update a user's connection and metadata for the app",
    }),
  z
    .literal('openid')
    .meta({
      description:
        'for OpenID Connect, this allows your app to receive user id and basic profile information',
    }),
])

export type OAuth2Scopes = z.infer<typeof OAuth2ScopesSchema>

export const ApplicationOAuth2InstallParamsResponseSchema = z.object({
  scopes: z.array(OAuth2ScopesSchema).refine((val) => new Set(val).size === val.length),
  permissions: z.string(),
})

export type ApplicationOAuth2InstallParamsResponse = z.infer<
  typeof ApplicationOAuth2InstallParamsResponseSchema
>

export const ApplicationIntegrationTypeConfigurationResponseSchema = z.object({
  oauth2_install_params: ApplicationOAuth2InstallParamsResponseSchema.exactOptional(),
})

export type ApplicationIntegrationTypeConfigurationResponse = z.infer<
  typeof ApplicationIntegrationTypeConfigurationResponseSchema
>

export const ApplicationResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  icon: z.string().nullable(),
  description: z.string(),
  type: z.xor([z.null().nullable(), ApplicationTypesSchema]),
  cover_image: z.string().exactOptional(),
  primary_sku_id: SnowflakeTypeSchema.exactOptional(),
  flags: z.int32(),
  flags_new: z.string(),
  bot: UserResponseSchema.exactOptional(),
  slug: z.string().exactOptional(),
  conjure_project_id: SnowflakeTypeSchema.exactOptional(),
  vibegrations_project_id: SnowflakeTypeSchema.exactOptional(),
  guild_id: SnowflakeTypeSchema.exactOptional(),
  rpc_origins: z.array(z.string()).exactOptional(),
  bot_public: z.boolean().exactOptional(),
  bot_require_code_grant: z.boolean().exactOptional(),
  terms_of_service_url: z.url().exactOptional(),
  privacy_policy_url: z.url().exactOptional(),
  custom_install_url: z.url().exactOptional(),
  install_params: ApplicationOAuth2InstallParamsResponseSchema.exactOptional(),
  integration_types_config: z
    .record(z.string(), ApplicationIntegrationTypeConfigurationResponseSchema)
    .exactOptional(),
  verify_key: z.string(),
  max_participants: z.int32().nullable().exactOptional(),
  tags: z
    .array(z.string())
    .refine((val) => new Set(val).size === val.length)
    .exactOptional(),
})

export type ApplicationResponse = z.infer<typeof ApplicationResponseSchema>

export const AttachmentResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  filename: z.string(),
  size: z.int32(),
  url: z.url(),
  proxy_url: z.url(),
  width: z.int32().exactOptional(),
  height: z.int32().exactOptional(),
  duration_secs: z.number().exactOptional(),
  waveform: z.string().exactOptional(),
  description: z.string().exactOptional(),
  content_type: z.string().exactOptional(),
  ephemeral: z.boolean().exactOptional(),
  flags: z.int32().exactOptional(),
  placeholder: z.string().exactOptional(),
  placeholder_version: z.int32().exactOptional(),
  title: z.string().nullable().exactOptional(),
  application: ApplicationResponseSchema.exactOptional(),
  clip_created_at: z.iso.datetime({ offset: true }).exactOptional(),
  clip_participants: z.array(UserResponseSchema).exactOptional(),
})

export type AttachmentResponse = z.infer<typeof AttachmentResponseSchema>

export const ActivitiesAttachmentResponseSchema = z.object({ attachment: AttachmentResponseSchema })

export type ActivitiesAttachmentResponse = z.infer<typeof ActivitiesAttachmentResponseSchema>

export const ActivityActionTypesSchema = z.xor([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(5),
  z.literal(6),
])

export type ActivityActionTypes = z.infer<typeof ActivityActionTypesSchema>

export const ActivityInstanceCallbackResponseSchema = z.object({ id: z.string() })

export type ActivityInstanceCallbackResponse = z.infer<
  typeof ActivityInstanceCallbackResponseSchema
>

export const AfkTimeoutsSchema = z.xor([
  z.literal(60),
  z.literal(300),
  z.literal(900),
  z.literal(1800),
  z.literal(3600),
])

export type AfkTimeouts = z.infer<typeof AfkTimeoutsSchema>

export const AllowedMentionTypesSchema = z.xor([
  z.literal('users').meta({ description: 'Controls role mentions' }),
  z.literal('roles').meta({ description: 'Controls user mentions' }),
  z.literal('everyone').meta({ description: 'Controls @everyone and @here mentions' }),
])

export type AllowedMentionTypes = z.infer<typeof AllowedMentionTypesSchema>

export const ApplicationCommandOptionTypeSchema = z.xor([
  z.literal(1).meta({ description: 'A sub-action within a command or group' }),
  z.literal(2).meta({ description: 'A group of subcommands' }),
  z.literal(3).meta({ description: 'A string option' }),
  z
    .literal(4)
    .meta({
      description: 'An integer option. Any integer between -2^53 and 2^53 is a valid value',
    }),
  z.literal(5).meta({ description: 'A boolean option' }),
  z.literal(6).meta({ description: 'A snowflake option that represents a User' }),
  z
    .literal(7)
    .meta({
      description:
        'A snowflake option that represents a Channel. Includes all channel types and categories',
    }),
  z.literal(8).meta({ description: 'A snowflake option that represents a Role' }),
  z.literal(9).meta({ description: 'A snowflake option that represents anything you can mention' }),
  z
    .literal(10)
    .meta({ description: 'A number option. Any double between -2^53 and 2^53 is a valid value' }),
  z.literal(11).meta({ description: 'An attachment option' }),
])

export type ApplicationCommandOptionType = z.infer<typeof ApplicationCommandOptionTypeSchema>

export const ApplicationCommandAttachmentOptionSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().min(1).max(100),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  file_types: z
    .array(z.string().min(1).max(16))
    .max(10)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
})

export type ApplicationCommandAttachmentOption = z.infer<
  typeof ApplicationCommandAttachmentOptionSchema
>

export const ApplicationCommandAttachmentOptionResponseSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localized: z.string().exactOptional(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  required: z.boolean().exactOptional(),
  file_types: z
    .array(z.string().max(16))
    .refine((val) => new Set(val).size === val.length)
    .exactOptional(),
})

export type ApplicationCommandAttachmentOptionResponse = z.infer<
  typeof ApplicationCommandAttachmentOptionResponseSchema
>

export const InteractionCallbackTypesSchema = z.xor([
  z.literal(1),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
  z.literal(9),
  z.literal(12),
  z.literal(13),
])

export type InteractionCallbackTypes = z.infer<typeof InteractionCallbackTypesSchema>

export const ApplicationCommandOptionIntegerChoiceSchema = z.object({
  name: z.string().min(1).max(100),
  name_localizations: z.record(z.string(), z.string().min(1).max(100)).nullable().exactOptional(),
  value: Int53TypeSchema,
})

export type ApplicationCommandOptionIntegerChoice = z.infer<
  typeof ApplicationCommandOptionIntegerChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema = z.object({
  choices: z
    .array(z.xor([z.null().nullable(), ApplicationCommandOptionIntegerChoiceSchema]))
    .max(25)
    .nullable()
    .exactOptional(),
})

export type InteractionApplicationCommandAutocompleteCallbackIntegerData = z.infer<
  typeof InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema
>

export const ApplicationCommandOptionNumberChoiceSchema = z.object({
  name: z.string().min(1).max(100),
  name_localizations: z.record(z.string(), z.string().min(1).max(100)).nullable().exactOptional(),
  value: z.number(),
})

export type ApplicationCommandOptionNumberChoice = z.infer<
  typeof ApplicationCommandOptionNumberChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackNumberDataSchema = z.object({
  choices: z
    .array(z.xor([z.null().nullable(), ApplicationCommandOptionNumberChoiceSchema]))
    .max(25)
    .nullable()
    .exactOptional(),
})

export type InteractionApplicationCommandAutocompleteCallbackNumberData = z.infer<
  typeof InteractionApplicationCommandAutocompleteCallbackNumberDataSchema
>

export const ApplicationCommandOptionStringChoiceSchema = z.object({
  name: z.string().min(1).max(100),
  name_localizations: z.record(z.string(), z.string().min(1).max(100)).nullable().exactOptional(),
  value: z.string().max(6000),
})

export type ApplicationCommandOptionStringChoice = z.infer<
  typeof ApplicationCommandOptionStringChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackStringDataSchema = z.object({
  choices: z
    .array(z.xor([z.null().nullable(), ApplicationCommandOptionStringChoiceSchema]))
    .max(25)
    .nullable()
    .exactOptional(),
})

export type InteractionApplicationCommandAutocompleteCallbackStringData = z.infer<
  typeof InteractionApplicationCommandAutocompleteCallbackStringDataSchema
>

export const ApplicationCommandAutocompleteCallbackRequestSchema = z.object({
  type: InteractionCallbackTypesSchema,
  data: z.union([
    InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema,
    InteractionApplicationCommandAutocompleteCallbackNumberDataSchema,
    InteractionApplicationCommandAutocompleteCallbackStringDataSchema,
  ]),
})

export type ApplicationCommandAutocompleteCallbackRequest = z.infer<
  typeof ApplicationCommandAutocompleteCallbackRequestSchema
>

export const ApplicationCommandBooleanOptionSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().min(1).max(100),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  required: z.boolean().nullable().exactOptional(),
})

export type ApplicationCommandBooleanOption = z.infer<typeof ApplicationCommandBooleanOptionSchema>

export const ApplicationCommandBooleanOptionResponseSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localized: z.string().exactOptional(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  required: z.boolean().exactOptional(),
})

export type ApplicationCommandBooleanOptionResponse = z.infer<
  typeof ApplicationCommandBooleanOptionResponseSchema
>

export const ApplicationCommandChannelOptionSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().min(1).max(100),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  channel_types: z
    .array(ChannelTypesSchema)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
})

export type ApplicationCommandChannelOption = z.infer<typeof ApplicationCommandChannelOptionSchema>

export const ApplicationCommandChannelOptionResponseSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localized: z.string().exactOptional(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  required: z.boolean().exactOptional(),
  channel_types: z
    .array(ChannelTypesSchema)
    .refine((val) => new Set(val).size === val.length)
    .exactOptional(),
})

export type ApplicationCommandChannelOptionResponse = z.infer<
  typeof ApplicationCommandChannelOptionResponseSchema
>

export const ApplicationCommandIntegerOptionSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().min(1).max(100),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  autocomplete: z.boolean().nullable().exactOptional(),
  choices: z.array(ApplicationCommandOptionIntegerChoiceSchema).max(25).nullable().exactOptional(),
  min_value: z.xor([z.null().nullable(), Int53TypeSchema]).exactOptional(),
  max_value: z.xor([z.null().nullable(), Int53TypeSchema]).exactOptional(),
})

export type ApplicationCommandIntegerOption = z.infer<typeof ApplicationCommandIntegerOptionSchema>

export const ApplicationCommandMentionableOptionSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().min(1).max(100),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  required: z.boolean().nullable().exactOptional(),
})

export type ApplicationCommandMentionableOption = z.infer<
  typeof ApplicationCommandMentionableOptionSchema
>

export const ApplicationCommandNumberOptionSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().min(1).max(100),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  autocomplete: z.boolean().nullable().exactOptional(),
  choices: z.array(ApplicationCommandOptionNumberChoiceSchema).max(25).nullable().exactOptional(),
  min_value: z.number().nullable().exactOptional(),
  max_value: z.number().nullable().exactOptional(),
})

export type ApplicationCommandNumberOption = z.infer<typeof ApplicationCommandNumberOptionSchema>

export const ApplicationCommandRoleOptionSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().min(1).max(100),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  required: z.boolean().nullable().exactOptional(),
})

export type ApplicationCommandRoleOption = z.infer<typeof ApplicationCommandRoleOptionSchema>

export const ApplicationCommandStringOptionSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().min(1).max(100),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  autocomplete: z.boolean().nullable().exactOptional(),
  min_length: z.int().min(0).max(6000).nullable().exactOptional(),
  max_length: z.int().min(1).max(6000).nullable().exactOptional(),
  choices: z.array(ApplicationCommandOptionStringChoiceSchema).max(25).nullable().exactOptional(),
})

export type ApplicationCommandStringOption = z.infer<typeof ApplicationCommandStringOptionSchema>

export const ApplicationCommandUserOptionSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().min(1).max(100),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  required: z.boolean().nullable().exactOptional(),
})

export type ApplicationCommandUserOption = z.infer<typeof ApplicationCommandUserOptionSchema>

export const ApplicationCommandSubcommandOptionSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().min(1).max(100),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  options: z
    .array(
      z.xor([
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
    )
    .max(25)
    .nullable()
    .exactOptional(),
})

export type ApplicationCommandSubcommandOption = z.infer<
  typeof ApplicationCommandSubcommandOptionSchema
>

export const ApplicationCommandSubcommandGroupOptionSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().min(1).max(100),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  options: z.array(ApplicationCommandSubcommandOptionSchema).max(25).nullable().exactOptional(),
})

export type ApplicationCommandSubcommandGroupOption = z.infer<
  typeof ApplicationCommandSubcommandGroupOptionSchema
>

export const InteractionContextTypeSchema = z.xor([
  z.literal(0).meta({ description: 'This command can be used within a Guild.' }),
  z
    .literal(1)
    .meta({ description: "This command can be used within a DM with this application's bot." }),
  z
    .literal(2)
    .meta({ description: 'This command can be used within DMs and Group DMs with users.' }),
])

export type InteractionContextType = z.infer<typeof InteractionContextTypeSchema>

export const ApplicationIntegrationTypeSchema = z.xor([
  z.literal(0).meta({ description: 'For Guild install.' }),
  z.literal(1).meta({ description: 'For User install.' }),
])

export type ApplicationIntegrationType = z.infer<typeof ApplicationIntegrationTypeSchema>

export const ApplicationCommandHandlerSchema = z.xor([
  z.literal(1).meta({ description: 'The app handles the interaction using an interaction token' }),
  z
    .literal(2)
    .meta({
      description:
        'Discord handles the interaction by launching an Activity and sending a follow-up message without coordinating with the app',
    }),
])

export type ApplicationCommandHandler = z.infer<typeof ApplicationCommandHandlerSchema>

export const ApplicationCommandTypeSchema = z.xor([
  z
    .literal(1)
    .meta({
      description: 'Slash commands; a text-based command that shows up when a user types /',
    }),
  z
    .literal(2)
    .meta({
      description: 'A UI-based command that shows up when you right click or tap on a user',
    }),
  z
    .literal(3)
    .meta({
      description: 'A UI-based command that shows up when you right click or tap on a message',
    }),
  z
    .literal(4)
    .meta({
      description:
        'A command that represents the primary way to use an application (e.g. launching an Activity)',
    }),
])

export type ApplicationCommandType = z.infer<typeof ApplicationCommandTypeSchema>

export const ApplicationCommandCreateRequestSchema = z.object({
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().max(100).nullable().exactOptional(),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  options: z
    .array(
      z.xor([
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
    )
    .max(25)
    .nullable()
    .exactOptional(),
  default_member_permissions: z.int().min(0).max(18014398509481984).nullable().exactOptional(),
  dm_permission: z.boolean().nullable().exactOptional(),
  contexts: z
    .array(InteractionContextTypeSchema)
    .min(1)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  integration_types: z
    .array(ApplicationIntegrationTypeSchema)
    .min(1)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  handler: z
    .xor([z.null().nullable(), ApplicationCommandHandlerSchema])
    .meta({
      description:
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    })
    .exactOptional(),
  type: z.xor([z.null().nullable(), ApplicationCommandTypeSchema]).exactOptional(),
})

export type ApplicationCommandCreateRequest = z.infer<typeof ApplicationCommandCreateRequestSchema>

export const ApplicationCommandOptionIntegerChoiceResponseSchema = z.object({
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  value: Int53TypeSchema,
})

export type ApplicationCommandOptionIntegerChoiceResponse = z.infer<
  typeof ApplicationCommandOptionIntegerChoiceResponseSchema
>

export const ApplicationCommandIntegerOptionResponseSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localized: z.string().exactOptional(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  required: z.boolean().exactOptional(),
  autocomplete: z.boolean().exactOptional(),
  choices: z.array(ApplicationCommandOptionIntegerChoiceResponseSchema).exactOptional(),
  min_value: Int53TypeSchema.exactOptional(),
  max_value: Int53TypeSchema.exactOptional(),
})

export type ApplicationCommandIntegerOptionResponse = z.infer<
  typeof ApplicationCommandIntegerOptionResponseSchema
>

export const InteractionTypesSchema = z.xor([
  z
    .literal(1)
    .meta({ description: "Sent by Discord to validate your application's interaction handler" }),
  z.literal(2).meta({ description: 'Sent when a user uses an application command' }),
  z
    .literal(3)
    .meta({
      description:
        'Sent when a user interacts with a message component previously sent by your application',
    }),
  z
    .literal(4)
    .meta({
      description: 'Sent when a user is filling in an autocomplete option in a chat command',
    }),
  z
    .literal(5)
    .meta({ description: 'Sent when a user submits a modal previously sent by your application' }),
  z
    .literal(6)
    .meta({
      description: 'Sent when Discord is checking if a user can purchase a Social Layer SKU',
    }),
])

export type InteractionTypes = z.infer<typeof InteractionTypesSchema>

export const ApplicationCommandInteractionMetadataResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  user: UserResponseSchema.exactOptional(),
  authorizing_integration_owners: z.record(z.string(), SnowflakeTypeSchema),
  original_response_message_id: SnowflakeTypeSchema.exactOptional(),
  target_user: UserResponseSchema.exactOptional(),
  target_message_id: SnowflakeTypeSchema.exactOptional(),
})

export type ApplicationCommandInteractionMetadataResponse = z.infer<
  typeof ApplicationCommandInteractionMetadataResponseSchema
>

export const ApplicationCommandMentionableOptionResponseSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localized: z.string().exactOptional(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  required: z.boolean().exactOptional(),
})

export type ApplicationCommandMentionableOptionResponse = z.infer<
  typeof ApplicationCommandMentionableOptionResponseSchema
>

export const ApplicationCommandOptionNumberChoiceResponseSchema = z.object({
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  value: z.number(),
})

export type ApplicationCommandOptionNumberChoiceResponse = z.infer<
  typeof ApplicationCommandOptionNumberChoiceResponseSchema
>

export const ApplicationCommandNumberOptionResponseSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localized: z.string().exactOptional(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  required: z.boolean().exactOptional(),
  autocomplete: z.boolean().exactOptional(),
  choices: z.array(ApplicationCommandOptionNumberChoiceResponseSchema).exactOptional(),
  min_value: z.number().exactOptional(),
  max_value: z.number().exactOptional(),
})

export type ApplicationCommandNumberOptionResponse = z.infer<
  typeof ApplicationCommandNumberOptionResponseSchema
>

export const ApplicationCommandOptionStringChoiceResponseSchema = z.object({
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  value: z.string(),
})

export type ApplicationCommandOptionStringChoiceResponse = z.infer<
  typeof ApplicationCommandOptionStringChoiceResponseSchema
>

export const ApplicationCommandPatchRequestPartialSchema = z.object({
  name: z.string().min(1).max(32).exactOptional(),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().max(100).nullable().exactOptional(),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  options: z
    .array(
      z.xor([
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
    )
    .max(25)
    .nullable()
    .exactOptional(),
  default_member_permissions: z.int().min(0).max(18014398509481984).nullable().exactOptional(),
  dm_permission: z.boolean().nullable().exactOptional(),
  contexts: z
    .array(InteractionContextTypeSchema)
    .min(1)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  integration_types: z
    .array(ApplicationIntegrationTypeSchema)
    .min(1)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  handler: z
    .xor([z.null().nullable(), ApplicationCommandHandlerSchema])
    .meta({
      description:
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    })
    .exactOptional(),
})

export type ApplicationCommandPatchRequestPartial = z.infer<
  typeof ApplicationCommandPatchRequestPartialSchema
>

export const ApplicationCommandPermissionTypeSchema = z.xor([
  z.literal(1).meta({ description: 'This permission is for a role.' }),
  z.literal(2).meta({ description: 'This permission is for a user.' }),
  z.literal(3).meta({ description: 'This permission is for a channel.' }),
])

export type ApplicationCommandPermissionType = z.infer<
  typeof ApplicationCommandPermissionTypeSchema
>

export const ApplicationCommandPermissionSchema = z.object({
  id: SnowflakeTypeSchema,
  type: ApplicationCommandPermissionTypeSchema,
  permission: z.boolean(),
})

export type ApplicationCommandPermission = z.infer<typeof ApplicationCommandPermissionSchema>

export const ApplicationCommandRoleOptionResponseSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localized: z.string().exactOptional(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  required: z.boolean().exactOptional(),
})

export type ApplicationCommandRoleOptionResponse = z.infer<
  typeof ApplicationCommandRoleOptionResponseSchema
>

export const ApplicationCommandStringOptionResponseSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localized: z.string().exactOptional(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  required: z.boolean().exactOptional(),
  autocomplete: z.boolean().exactOptional(),
  choices: z.array(ApplicationCommandOptionStringChoiceResponseSchema).exactOptional(),
  min_length: z.int32().exactOptional(),
  max_length: z.int32().exactOptional(),
})

export type ApplicationCommandStringOptionResponse = z.infer<
  typeof ApplicationCommandStringOptionResponseSchema
>

export const ApplicationCommandUserOptionResponseSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localized: z.string().exactOptional(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  required: z.boolean().exactOptional(),
})

export type ApplicationCommandUserOptionResponse = z.infer<
  typeof ApplicationCommandUserOptionResponseSchema
>

export const ApplicationCommandSubcommandOptionResponseSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localized: z.string().exactOptional(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  required: z.boolean().exactOptional(),
  options: z
    .array(
      z.xor([
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
    )
    .exactOptional(),
})

export type ApplicationCommandSubcommandOptionResponse = z.infer<
  typeof ApplicationCommandSubcommandOptionResponseSchema
>

export const ApplicationCommandSubcommandGroupOptionResponseSchema = z.object({
  type: ApplicationCommandOptionTypeSchema,
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localized: z.string().exactOptional(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  required: z.boolean().exactOptional(),
  options: z.array(ApplicationCommandSubcommandOptionResponseSchema).exactOptional(),
})

export type ApplicationCommandSubcommandGroupOptionResponse = z.infer<
  typeof ApplicationCommandSubcommandGroupOptionResponseSchema
>

export const ApplicationCommandResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  version: SnowflakeTypeSchema,
  default_member_permissions: z.string().nullable(),
  type: ApplicationCommandTypeSchema,
  name: z.string(),
  name_localized: z.string().exactOptional(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localized: z.string().exactOptional(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  guild_id: SnowflakeTypeSchema.exactOptional(),
  dm_permission: z.boolean().exactOptional(),
  contexts: z
    .array(InteractionContextTypeSchema)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  integration_types: z
    .array(ApplicationIntegrationTypeSchema)
    .refine((val) => new Set(val).size === val.length)
    .exactOptional(),
  options: z
    .array(
      z.xor([
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
    )
    .exactOptional(),
  nsfw: z.boolean().exactOptional(),
  handler: ApplicationCommandHandlerSchema.meta({
    description:
      "Determines whether the interaction is handled by the app's interactions handler or by Discord",
  }).exactOptional(),
})

export type ApplicationCommandResponse = z.infer<typeof ApplicationCommandResponseSchema>

export const ApplicationCommandUpdateRequestSchema = z.object({
  name: z.string().min(1).max(32),
  name_localizations: z.record(z.string(), z.string().min(1).max(32)).nullable().exactOptional(),
  description: z.string().max(100).nullable().exactOptional(),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(100))
    .nullable()
    .exactOptional(),
  options: z
    .array(
      z.xor([
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
    )
    .max(25)
    .nullable()
    .exactOptional(),
  default_member_permissions: z.int().min(0).max(18014398509481984).nullable().exactOptional(),
  dm_permission: z.boolean().nullable().exactOptional(),
  contexts: z
    .array(InteractionContextTypeSchema)
    .min(1)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  integration_types: z
    .array(ApplicationIntegrationTypeSchema)
    .min(1)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  handler: z
    .xor([z.null().nullable(), ApplicationCommandHandlerSchema])
    .meta({
      description:
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    })
    .exactOptional(),
  type: z.xor([z.null().nullable(), ApplicationCommandTypeSchema]).exactOptional(),
  id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
})

export type ApplicationCommandUpdateRequest = z.infer<typeof ApplicationCommandUpdateRequestSchema>

export const ApplicationEventWebhooksStatusSchema = z.xor([
  z.literal(1).meta({ description: 'Webhook events are disabled by developer' }),
  z.literal(2).meta({ description: 'Webhook events are enabled by developer' }),
  z
    .literal(3)
    .meta({ description: 'Webhook events are disabled by Discord, usually due to inactivity' }),
])

export type ApplicationEventWebhooksStatus = z.infer<typeof ApplicationEventWebhooksStatusSchema>

export const ApplicationExplicitContentFilterTypesSchema = z.xor([
  z.literal(0).meta({ description: 'inherit guild content filter setting' }),
  z.literal(1).meta({ description: 'interactions will always be scanned' }),
])

export type ApplicationExplicitContentFilterTypes = z.infer<
  typeof ApplicationExplicitContentFilterTypesSchema
>

export const ApplicationOAuth2InstallParamsSchema = z.object({
  scopes: z
    .array(OAuth2ScopesSchema)
    .min(1)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  permissions: z.int().min(0).max(18014398509481984).nullable().exactOptional(),
})

export type ApplicationOAuth2InstallParams = z.infer<typeof ApplicationOAuth2InstallParamsSchema>

export const ApplicationIntegrationTypeConfigurationSchema = z.object({
  oauth2_install_params: z
    .xor([z.null().nullable(), ApplicationOAuth2InstallParamsSchema])
    .exactOptional(),
})

export type ApplicationIntegrationTypeConfiguration = z.infer<
  typeof ApplicationIntegrationTypeConfigurationSchema
>

export const ApplicationFormPartialSchema = z.object({
  description: z
    .object({
      default: z.string().max(400),
      localizations: z.record(z.string(), z.string().max(400)).nullable().exactOptional(),
    })
    .nullable()
    .exactOptional(),
  icon: z.string().nullable().exactOptional(),
  cover_image: z.string().nullable().exactOptional(),
  team_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  flags: z.int().nullable().exactOptional(),
  interactions_endpoint_url: z.url().max(2048).nullable().exactOptional(),
  explicit_content_filter: z
    .xor([z.null().nullable(), ApplicationExplicitContentFilterTypesSchema])
    .exactOptional(),
  max_participants: z.int32().min(-1).nullable().exactOptional(),
  type: z.xor([z.null().nullable(), ApplicationTypesSchema]).exactOptional(),
  tags: z
    .array(z.string().max(20))
    .max(5)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  custom_install_url: z.url().max(2048).nullable().exactOptional(),
  install_params: z
    .xor([z.null().nullable(), ApplicationOAuth2InstallParamsSchema])
    .exactOptional(),
  role_connections_verification_url: z.url().max(2048).nullable().exactOptional(),
  integration_types_config: z
    .record(z.string(), z.xor([z.null().nullable(), ApplicationIntegrationTypeConfigurationSchema]))
    .nullable()
    .exactOptional(),
  event_webhooks_status: z
    .xor([z.null().nullable(), ApplicationEventWebhooksStatusSchema])
    .exactOptional(),
  event_webhooks_url: z
    .url()
    .max(2048)
    .nullable()
    .meta({ description: 'Event webhooks URL for the app to receive webhook events' })
    .exactOptional(),
  event_webhooks_types: z
    .array(ActionTypesSchema)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
})

export type ApplicationFormPartial = z.infer<typeof ApplicationFormPartialSchema>

export const ApplicationIdentityProviderAuthTypeSchema = z.xor([
  z.literal('OIDC'),
  z.literal('EPIC_ONLINE_SERVICES_ACCESS_TOKEN'),
  z.literal('EPIC_ONLINE_SERVICES_ID_TOKEN'),
  z.literal('STEAM_SESSION_TICKET'),
  z.literal('UNITY_SERVICES_ID_TOKEN'),
  z.literal('DISCORD_BOT_ISSUED_ACCESS_TOKEN'),
  z.literal('APPLE_ID_TOKEN'),
  z.literal('PLAYSTATION_NETWORK_ID_TOKEN'),
])

export type ApplicationIdentityProviderAuthType = z.infer<
  typeof ApplicationIdentityProviderAuthTypeSchema
>

export const WebhookTypesSchema = z.xor([
  z
    .literal(1)
    .meta({
      description: 'Incoming Webhooks can post messages to channels with a generated token',
    }),
  z
    .literal(2)
    .meta({
      description:
        'Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels',
    }),
  z.literal(3).meta({ description: 'Application webhooks are webhooks used with Interactions' }),
])

export type WebhookTypes = z.infer<typeof WebhookTypesSchema>

export const ApplicationIncomingWebhookResponseSchema = z.object({
  application_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  avatar: z.string().nullable(),
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  id: SnowflakeTypeSchema,
  name: z.string(),
  type: WebhookTypesSchema,
  user: UserResponseSchema.exactOptional(),
})

export type ApplicationIncomingWebhookResponse = z.infer<
  typeof ApplicationIncomingWebhookResponseSchema
>

export const MetadataItemTypesSchema = z.xor([
  z
    .literal(1)
    .meta({
      description:
        "the metadata value (integer) is less than or equal to the guild's configured value (integer)",
    }),
  z
    .literal(2)
    .meta({
      description:
        "the metadata value (integer) is greater than or equal to the guild's configured value (integer)",
    }),
  z
    .literal(3)
    .meta({
      description:
        "the metadata value (integer) is equal to the guild's configured value (integer)",
    }),
  z
    .literal(4)
    .meta({
      description:
        "the metadata value (integer) is not equal to the guild's configured value (integer)",
    }),
  z
    .literal(5)
    .meta({
      description:
        "the metadata value (ISO8601 string) is less than or equal to the guild's configured value (integer; days before current date)",
    }),
  z
    .literal(6)
    .meta({
      description:
        "the metadata value (ISO8601 string) is greater than or equal to the guild's configured value (integer; days before current date)",
    }),
  z
    .literal(7)
    .meta({
      description:
        "the metadata value (integer) is equal to the guild's configured value (integer; 1)",
    }),
  z
    .literal(8)
    .meta({
      description:
        "the metadata value (integer) is not equal to the guild's configured value (integer; 1)",
    }),
])

export type MetadataItemTypes = z.infer<typeof MetadataItemTypesSchema>

export const ApplicationRoleConnectionsMetadataItemRequestSchema = z.object({
  type: MetadataItemTypesSchema,
  key: z.string().min(1).max(50),
  name: z.string().min(1).max(100),
  name_localizations: z
    .record(z.string(), z.string().min(1).max(100).nullable())
    .nullable()
    .exactOptional(),
  description: z.string().min(1).max(200),
  description_localizations: z
    .record(z.string(), z.string().min(1).max(200).nullable())
    .nullable()
    .exactOptional(),
})

export type ApplicationRoleConnectionsMetadataItemRequest = z.infer<
  typeof ApplicationRoleConnectionsMetadataItemRequestSchema
>

export const ApplicationRoleConnectionsMetadataItemResponseSchema = z.object({
  type: MetadataItemTypesSchema,
  key: z.string(),
  name: z.string(),
  name_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
  description: z.string(),
  description_localizations: z.record(z.string(), z.string()).nullable().exactOptional(),
})

export type ApplicationRoleConnectionsMetadataItemResponse = z.infer<
  typeof ApplicationRoleConnectionsMetadataItemResponseSchema
>

export const ApplicationUserRoleConnectionResponseSchema = z.object({
  platform_name: z.string().exactOptional(),
  platform_username: z.string().nullable().exactOptional(),
  metadata: z.record(z.string(), z.string()).exactOptional(),
})

export type ApplicationUserRoleConnectionResponse = z.infer<
  typeof ApplicationUserRoleConnectionResponseSchema
>

export const AuditLogActionTypesSchema = z.xor([
  z.literal(1),
  z.literal(10),
  z.literal(11),
  z.literal(12),
  z.literal(13),
  z.literal(14),
  z.literal(15),
  z.literal(16).meta({ description: 'Channels were reordered' }),
  z.literal(20),
  z.literal(21),
  z.literal(22),
  z.literal(23),
  z.literal(24),
  z.literal(25),
  z.literal(26),
  z.literal(27),
  z.literal(28),
  z.literal(30),
  z.literal(31),
  z.literal(32),
  z.literal(33).meta({ description: 'Roles were reordered' }),
  z.literal(40),
  z.literal(41),
  z.literal(42),
  z.literal(50),
  z.literal(51),
  z.literal(52),
  z.literal(60),
  z.literal(61),
  z.literal(62),
  z.literal(72),
  z.literal(73),
  z.literal(74),
  z.literal(75),
  z.literal(80),
  z.literal(81),
  z.literal(82),
  z.literal(83),
  z.literal(84),
  z.literal(85),
  z.literal(90),
  z.literal(91),
  z.literal(92),
  z.literal(100),
  z.literal(101),
  z.literal(102),
  z.literal(110),
  z.literal(111),
  z.literal(112),
  z.literal(121),
  z.literal(130),
  z.literal(131),
  z.literal(132),
  z.literal(140),
  z.literal(141),
  z.literal(142),
  z.literal(143),
  z.literal(144),
  z.literal(145),
  z.literal(146),
  z.literal(150),
  z.literal(151),
  z.literal(163),
  z.literal(164),
  z.literal(165),
  z.literal(166),
  z.literal(167),
  z.literal(171),
  z.literal(172),
  z.literal(180),
  z.literal(190),
  z.literal(191),
  z.literal(192),
  z.literal(193),
  z.literal(200).meta({ description: 'Scheduled event exception was created' }),
  z.literal(201).meta({ description: 'Scheduled event exception was updated' }),
  z.literal(202).meta({ description: 'Scheduled event exception was deleted' }),
  z.literal(211),
])

export type AuditLogActionTypes = z.infer<typeof AuditLogActionTypesSchema>

export const AuditLogObjectChangeResponseSchema = z.object({
  key: z.string().nullable(),
  new_value: z.any().exactOptional(),
  old_value: z.any().exactOptional(),
})

export type AuditLogObjectChangeResponse = z.infer<typeof AuditLogObjectChangeResponseSchema>

export const AuditLogEntryResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  action_type: AuditLogActionTypesSchema,
  user_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  target_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  changes: z.array(AuditLogObjectChangeResponseSchema).exactOptional(),
  options: z.record(z.string(), z.string()).exactOptional(),
  reason: z.string().exactOptional(),
})

export type AuditLogEntryResponse = z.infer<typeof AuditLogEntryResponseSchema>

export const AuthorTypeSchema = z.xor([
  z.literal('user'),
  z.literal('bot'),
  z.literal('webhook'),
  z.literal('-user'),
  z.literal('-bot'),
  z.literal('-webhook'),
])

export type AuthorType = z.infer<typeof AuthorTypeSchema>

export const AutomodActionTypeSchema = z.xor([
  z
    .literal(1)
    .meta({
      description:
        "Block a user's message and prevent it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked",
    }),
  z
    .literal(2)
    .meta({
      description:
        'Send a system message to a channel in order to log the user message that triggered the rule',
    }),
  z
    .literal(3)
    .meta({
      description: "Temporarily disable a user's ability to communicate in the server (timeout)",
    }),
  z.literal(4).meta({ description: 'Prevent a user from interacting in the server' }),
])

export type AutomodActionType = z.infer<typeof AutomodActionTypeSchema>

export const AutomodEventTypeSchema = z.xor([
  z.literal(1).meta({ description: 'A user submitted a message to a channel' }),
  z
    .literal(2)
    .meta({
      description: "A user is attempting to join the server or a member's properties were updated.",
    }),
])

export type AutomodEventType = z.infer<typeof AutomodEventTypeSchema>

export const AutomodKeywordPresetTypeSchema = z.xor([
  z.literal(1).meta({ description: 'Words and phrases that may be considered profanity' }),
  z.literal(2).meta({ description: 'Words and phrases that may be considered as sexual content' }),
  z
    .literal(3)
    .meta({ description: 'Words and phrases that may be considered slurs and hate speech' }),
])

export type AutomodKeywordPresetType = z.infer<typeof AutomodKeywordPresetTypeSchema>

export const AutomodTriggerTypeSchema = z.xor([
  z
    .literal(1)
    .meta({
      description: 'Check if content contains words from a list of keywords or matches regex',
    }),
  z.literal(3).meta({ description: 'Check if content represents generic spam' }),
  z
    .literal(4)
    .meta({ description: 'Check if content contains words from internal pre-defined wordsets' }),
  z.literal(5).meta({ description: 'Check if content contains more unique mentions than allowed' }),
  z
    .literal(6)
    .meta({
      description:
        'Check if user profile fields contains words from a list of keywords or matches regex',
    }),
])

export type AutomodTriggerType = z.infer<typeof AutomodTriggerTypeSchema>

export const AvailableLocalesEnumSchema = z.xor([
  z.literal('ar').meta({ description: 'The ar locale' }),
  z.literal('bg').meta({ description: 'The bg locale' }),
  z.literal('cs').meta({ description: 'The cs locale' }),
  z.literal('da').meta({ description: 'The da locale' }),
  z.literal('de').meta({ description: 'The de locale' }),
  z.literal('el').meta({ description: 'The el locale' }),
  z.literal('en-GB').meta({ description: 'The en-GB locale' }),
  z.literal('en-US').meta({ description: 'The en-US locale' }),
  z.literal('es-419').meta({ description: 'The es-419 locale' }),
  z.literal('es-ES').meta({ description: 'The es-ES locale' }),
  z.literal('fi').meta({ description: 'The fi locale' }),
  z.literal('fr').meta({ description: 'The fr locale' }),
  z.literal('he').meta({ description: 'The he locale' }),
  z.literal('hi').meta({ description: 'The hi locale' }),
  z.literal('hr').meta({ description: 'The hr locale' }),
  z.literal('hu').meta({ description: 'The hu locale' }),
  z.literal('id').meta({ description: 'The id locale' }),
  z.literal('it').meta({ description: 'The it locale' }),
  z.literal('ja').meta({ description: 'The ja locale' }),
  z.literal('ko').meta({ description: 'The ko locale' }),
  z.literal('lt').meta({ description: 'The lt locale' }),
  z.literal('nl').meta({ description: 'The nl locale' }),
  z.literal('no').meta({ description: 'The no locale' }),
  z.literal('pl').meta({ description: 'The pl locale' }),
  z.literal('pt-BR').meta({ description: 'The pt-BR locale' }),
  z.literal('ro').meta({ description: 'The ro locale' }),
  z.literal('ru').meta({ description: 'The ru locale' }),
  z.literal('sv-SE').meta({ description: 'The sv-SE locale' }),
  z.literal('th').meta({ description: 'The th locale' }),
  z.literal('tr').meta({ description: 'The tr locale' }),
  z.literal('uk').meta({ description: 'The uk locale' }),
  z.literal('vi').meta({ description: 'The vi locale' }),
  z.literal('zh-CN').meta({ description: 'The zh-CN locale' }),
  z.literal('zh-TW').meta({ description: 'The zh-TW locale' }),
])

export type AvailableLocalesEnum = z.infer<typeof AvailableLocalesEnumSchema>

export const BanUserFromGuildRequestSchema = z.object({
  delete_message_seconds: z.int().min(0).max(604800).nullable().exactOptional(),
  delete_message_days: z.int().min(0).max(7).nullable().exactOptional(),
})

export type BanUserFromGuildRequest = z.infer<typeof BanUserFromGuildRequestSchema>

export const RichEmbedAuthorSchema = z.object({
  name: z.string().max(256).nullable().exactOptional(),
  url: z.url().max(2048).nullable().exactOptional(),
  icon_url: z.url().max(2048).nullable().exactOptional(),
})

export type RichEmbedAuthor = z.infer<typeof RichEmbedAuthorSchema>

export const RichEmbedImageSchema = z.object({
  url: z.url().max(2048).nullable().exactOptional(),
  width: z.int().nullable().exactOptional(),
  height: z.int().nullable().exactOptional(),
  placeholder: z.string().max(64).nullable().exactOptional(),
  placeholder_version: z.int().min(0).max(2147483647).nullable().exactOptional(),
  is_animated: z.boolean().nullable().exactOptional(),
  description: z.string().max(4096).nullable().exactOptional(),
})

export type RichEmbedImage = z.infer<typeof RichEmbedImageSchema>

export const RichEmbedThumbnailSchema = z.object({
  url: z.url().max(2048).nullable().exactOptional(),
  width: z.int().nullable().exactOptional(),
  height: z.int().nullable().exactOptional(),
  placeholder: z.string().max(64).nullable().exactOptional(),
  placeholder_version: z.int().min(0).max(2147483647).nullable().exactOptional(),
  is_animated: z.boolean().nullable().exactOptional(),
  description: z.string().max(4096).nullable().exactOptional(),
})

export type RichEmbedThumbnail = z.infer<typeof RichEmbedThumbnailSchema>

export const RichEmbedFooterSchema = z.object({
  text: z.string().max(2048).nullable().exactOptional(),
  icon_url: z.url().max(2048).nullable().exactOptional(),
})

export type RichEmbedFooter = z.infer<typeof RichEmbedFooterSchema>

export const RichEmbedFieldSchema = z.object({
  name: z.string().max(256),
  value: z.string().max(1024),
  inline: z.boolean().nullable().exactOptional(),
})

export type RichEmbedField = z.infer<typeof RichEmbedFieldSchema>

export const RichEmbedProviderSchema = z.object({
  name: z.string().max(256).nullable().exactOptional(),
  url: z.url().max(2048).nullable().exactOptional(),
})

export type RichEmbedProvider = z.infer<typeof RichEmbedProviderSchema>

export const RichEmbedVideoSchema = z.object({
  url: z.url().max(2048).nullable().exactOptional(),
  width: z.int().nullable().exactOptional(),
  height: z.int().nullable().exactOptional(),
  placeholder: z.string().max(64).nullable().exactOptional(),
  placeholder_version: z.int().min(0).max(2147483647).nullable().exactOptional(),
  is_animated: z.boolean().nullable().exactOptional(),
  description: z.string().max(4096).nullable().exactOptional(),
})

export type RichEmbedVideo = z.infer<typeof RichEmbedVideoSchema>

export const RichEmbedAudioSchema = z.object({
  url: z.url().max(2048).nullable().exactOptional(),
  description: z.string().max(4096).nullable().exactOptional(),
})

export type RichEmbedAudio = z.infer<typeof RichEmbedAudioSchema>

export const RichEmbedSchema = z.object({
  type: z.string().max(152133).nullable().exactOptional(),
  url: z.url().max(2048).nullable().exactOptional(),
  title: z.string().max(256).nullable().exactOptional(),
  color: z.int().min(0).max(16777215).nullable().exactOptional(),
  timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  description: z.string().max(4096).nullable().exactOptional(),
  author: z.xor([z.null().nullable(), RichEmbedAuthorSchema]).exactOptional(),
  image: z.xor([z.null().nullable(), RichEmbedImageSchema]).exactOptional(),
  thumbnail: z.xor([z.null().nullable(), RichEmbedThumbnailSchema]).exactOptional(),
  footer: z.xor([z.null().nullable(), RichEmbedFooterSchema]).exactOptional(),
  fields: z.array(RichEmbedFieldSchema).max(25).nullable().exactOptional(),
  provider: z.xor([z.null().nullable(), RichEmbedProviderSchema]).exactOptional(),
  video: z.xor([z.null().nullable(), RichEmbedVideoSchema]).exactOptional(),
  audio: z.xor([z.null().nullable(), RichEmbedAudioSchema]).exactOptional(),
})

export type RichEmbed = z.infer<typeof RichEmbedSchema>

export const MessageAllowedMentionsRequestSchema = z.object({
  parse: z
    .array(z.xor([z.null().nullable(), AllowedMentionTypesSchema]))
    .max(1521)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  users: z
    .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
    .max(100)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  roles: z
    .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
    .max(100)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  replied_user: z.boolean().nullable().exactOptional(),
})

export type MessageAllowedMentionsRequest = z.infer<typeof MessageAllowedMentionsRequestSchema>

export const UnfurledMediaRequestWithAttachmentReferenceRequiredSchema = z.object({
  url: z.url().max(2048),
})

export type UnfurledMediaRequestWithAttachmentReferenceRequired = z.infer<
  typeof UnfurledMediaRequestWithAttachmentReferenceRequiredSchema
>

export const FileComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  spoiler: z.boolean().nullable().exactOptional(),
  file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
})

export type FileComponentForMessageRequest = z.infer<typeof FileComponentForMessageRequestSchema>

export const UnfurledMediaRequestSchema = z.object({ url: z.url().max(2048) })

export type UnfurledMediaRequest = z.infer<typeof UnfurledMediaRequestSchema>

export const MediaGalleryItemForMessageRequestSchema = z.object({
  description: z.string().min(1).max(1024).nullable().exactOptional(),
  spoiler: z.boolean().nullable().exactOptional(),
  media: UnfurledMediaRequestSchema,
})

export type MediaGalleryItemForMessageRequest = z.infer<
  typeof MediaGalleryItemForMessageRequestSchema
>

export const MediaGalleryComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  items: z.array(MediaGalleryItemForMessageRequestSchema).min(1).max(10),
})

export type MediaGalleryComponentForMessageRequest = z.infer<
  typeof MediaGalleryComponentForMessageRequestSchema
>

export const TextDisplayComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  content: z.string().min(1).max(4000),
})

export type TextDisplayComponentForMessageRequest = z.infer<
  typeof TextDisplayComponentForMessageRequestSchema
>

export const ThumbnailComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  description: z.string().min(1).max(1024).nullable().exactOptional(),
  spoiler: z.boolean().nullable().exactOptional(),
  media: UnfurledMediaRequestSchema,
})

export type ThumbnailComponentForMessageRequest = z.infer<
  typeof ThumbnailComponentForMessageRequestSchema
>

export const SectionComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  components: z.array(TextDisplayComponentForMessageRequestSchema).min(1).max(3),
  accessory: z.xor([
    ButtonComponentForMessageRequestSchema,
    ThumbnailComponentForMessageRequestSchema,
  ]),
})

export type SectionComponentForMessageRequest = z.infer<
  typeof SectionComponentForMessageRequestSchema
>

export const MessageComponentSeparatorSpacingSizeSchema = z.xor([
  z.literal(1).meta({ description: 'Small spacing' }),
  z.literal(2).meta({ description: 'Large spacing' }),
])

export type MessageComponentSeparatorSpacingSize = z.infer<
  typeof MessageComponentSeparatorSpacingSizeSchema
>

export const SeparatorComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  spacing: z.xor([z.null().nullable(), MessageComponentSeparatorSpacingSizeSchema]).exactOptional(),
  divider: z.boolean().nullable().exactOptional(),
})

export type SeparatorComponentForMessageRequest = z.infer<
  typeof SeparatorComponentForMessageRequestSchema
>

export const ContainerComponentForMessageRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  accent_color: z.int().min(0).max(16777215).nullable().exactOptional(),
  components: z
    .array(
      z.xor([
        ActionRowComponentForMessageRequestSchema,
        FileComponentForMessageRequestSchema,
        MediaGalleryComponentForMessageRequestSchema,
        SectionComponentForMessageRequestSchema,
        SeparatorComponentForMessageRequestSchema,
        TextDisplayComponentForMessageRequestSchema,
      ]),
    )
    .min(1)
    .max(40),
  spoiler: z.boolean().nullable().exactOptional(),
})

export type ContainerComponentForMessageRequest = z.infer<
  typeof ContainerComponentForMessageRequestSchema
>

export const MessageAttachmentRequestSchema = z.object({
  id: SnowflakeTypeSchema,
  filename: z.string().min(1).max(1024).nullable().exactOptional(),
  description: z.string().max(1024).nullable().exactOptional(),
  duration_secs: z.number().min(0).max(2147483647).nullable().exactOptional(),
  waveform: z.string().max(400).nullable().exactOptional(),
  title: z.string().max(1024).nullable().exactOptional(),
  is_spoiler: z.boolean().nullable().exactOptional(),
})

export type MessageAttachmentRequest = z.infer<typeof MessageAttachmentRequestSchema>

export const PollEmojiSchema = z.object({
  id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: 'The ID of the custom emoji' })
    .exactOptional(),
  name: z
    .string()
    .max(32)
    .nullable()
    .meta({ description: 'The name of the emoji, or the unicode emoji character' })
    .exactOptional(),
  animated: z
    .boolean()
    .nullable()
    .meta({ description: 'Whether the emoji is animated' })
    .exactOptional(),
})

export type PollEmoji = z.infer<typeof PollEmojiSchema>

export const PollMediaSchema = z.object({
  text: z
    .string()
    .min(1)
    .max(300)
    .nullable()
    .meta({ description: 'The text of the field' })
    .exactOptional(),
  emoji: z
    .xor([z.null().nullable(), PollEmojiSchema])
    .meta({ description: 'The emoji of the field' })
    .exactOptional(),
})

export type PollMedia = z.infer<typeof PollMediaSchema>

export const PollEmojiCreateRequestSchema = z.object({
  id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: 'The ID of the custom emoji' })
    .exactOptional(),
  name: z
    .string()
    .max(32)
    .nullable()
    .meta({ description: 'The name of the emoji, or the unicode emoji character' })
    .exactOptional(),
  animated: z
    .boolean()
    .nullable()
    .meta({ description: 'Whether the emoji is animated' })
    .exactOptional(),
})

export type PollEmojiCreateRequest = z.infer<typeof PollEmojiCreateRequestSchema>

export const PollMediaCreateRequestSchema = z.object({
  text: z
    .string()
    .min(1)
    .max(300)
    .nullable()
    .meta({ description: 'The text of the field' })
    .exactOptional(),
  emoji: z
    .xor([z.null().nullable(), PollEmojiCreateRequestSchema])
    .meta({ description: 'The emoji of the field' })
    .exactOptional(),
})

export type PollMediaCreateRequest = z.infer<typeof PollMediaCreateRequestSchema>

export const PollAnswerCreateRequestSchema = z.object({
  poll_media: PollMediaCreateRequestSchema.meta({ description: 'The data of the answer' }),
})

export type PollAnswerCreateRequest = z.infer<typeof PollAnswerCreateRequestSchema>

export const PollLayoutTypesSchema = z.xor([
  z.literal(1).meta({ description: 'The, uhm, default layout type.' }),
])

export type PollLayoutTypes = z.infer<typeof PollLayoutTypesSchema>

export const PollCreateRequestSchema = z.object({
  question: PollMediaSchema.meta({
    description: 'The question of the poll. Only `text` is supported.',
  }),
  answers: z
    .array(PollAnswerCreateRequestSchema)
    .min(1)
    .max(10)
    .meta({ description: 'Each of the answers available in the poll, up to 10' }),
  allow_multiselect: z
    .boolean()
    .nullable()
    .meta({ description: 'Whether a user can select multiple answers' })
    .exactOptional(),
  layout_type: z
    .xor([z.null().nullable(), PollLayoutTypesSchema])
    .meta({ description: 'The layout type of the poll. Defaults to... DEFAULT!' })
    .exactOptional(),
  duration: z
    .int32()
    .min(1)
    .max(768)
    .nullable()
    .meta({
      description: 'Number of hours the poll should be open for, up to 32 days. Defaults to 24',
    })
    .exactOptional(),
})

export type PollCreateRequest = z.infer<typeof PollCreateRequestSchema>

export const MessageShareCustomUserThemeBaseThemeSchema = z.xor([
  z.literal(0).meta({ description: 'No base theme' }),
  z.literal(1).meta({ description: 'Dark base theme' }),
  z.literal(2).meta({ description: 'Light base theme' }),
  z.literal(3).meta({ description: 'Darker base theme' }),
  z.literal(4).meta({ description: 'Midnight base theme' }),
])

export type MessageShareCustomUserThemeBaseTheme = z.infer<
  typeof MessageShareCustomUserThemeBaseThemeSchema
>

export const CustomClientThemeShareRequestSchema = z.object({
  colors: z.array(z.string().length(6)).min(1).max(5),
  gradient_angle: z.int32().min(0).max(360),
  base_mix: z.int32().min(0).max(100),
  base_theme: z
    .xor([z.null().nullable(), MessageShareCustomUserThemeBaseThemeSchema])
    .exactOptional(),
})

export type CustomClientThemeShareRequest = z.infer<typeof CustomClientThemeShareRequestSchema>

export const BaseCreateMessageCreateRequestSchema = z.object({
  content: z.string().max(4000).nullable().exactOptional(),
  embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
  allowed_mentions: z
    .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
    .exactOptional(),
  sticker_ids: z.array(SnowflakeTypeSchema).max(3).nullable().exactOptional(),
  components: z
    .array(
      z.xor([
        ActionRowComponentForMessageRequestSchema,
        ContainerComponentForMessageRequestSchema,
        FileComponentForMessageRequestSchema,
        MediaGalleryComponentForMessageRequestSchema,
        SectionComponentForMessageRequestSchema,
        SeparatorComponentForMessageRequestSchema,
        TextDisplayComponentForMessageRequestSchema,
      ]),
    )
    .max(40)
    .nullable()
    .exactOptional(),
  flags: z.int().nullable().exactOptional(),
  attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
  poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
  shared_client_theme: z
    .xor([z.null().nullable(), CustomClientThemeShareRequestSchema])
    .exactOptional(),
})

export type BaseCreateMessageCreateRequest = z.infer<typeof BaseCreateMessageCreateRequestSchema>

export const BasicApplicationResponseWithBotSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  icon: z.string().nullable(),
  description: z.string(),
  type: z.xor([z.null().nullable(), ApplicationTypesSchema]),
  cover_image: z.string().exactOptional(),
  primary_sku_id: SnowflakeTypeSchema.exactOptional(),
  flags: z.int32(),
  flags_new: z.string(),
  bot: UserResponseSchema.exactOptional(),
})

export type BasicApplicationResponseWithBot = z.infer<typeof BasicApplicationResponseWithBotSchema>

export const BasicGuildMemberResponseSchema = z.object({
  avatar: z.string().nullable().meta({ description: "the member's guild avatar hash" }),
  avatar_decoration_data: z
    .xor([z.null().nullable(), UserAvatarDecorationResponseSchema])
    .meta({ description: "data for the member's guild avatar decoration" })
    .exactOptional(),
  banner: z.string().nullable().meta({ description: "the member's guild banner hash" }),
  communication_disabled_until: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({
      description:
        "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
    }),
  flags: z
    .int32()
    .meta({ description: 'guild member flags represented as a bit set, defaults to 0' }),
  joined_at: z.iso
    .datetime({ offset: true })
    .meta({ description: 'when the user joined the guild' }),
  nick: z.string().nullable().meta({ description: "this user's guild nickname" }),
  pending: z
    .boolean()
    .meta({
      description:
        "whether the user has not yet passed the guild's Membership Screening requirements",
    }),
  premium_since: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'when the user started boosting the guild' }),
  roles: z
    .array(SnowflakeTypeSchema)
    .refine((val) => new Set(val).size === val.length)
    .meta({ description: 'array of role object ids' }),
  collectibles: z
    .xor([z.null().nullable(), UserCollectiblesResponseSchema])
    .meta({ description: "data for the member's collectibles" })
    .exactOptional(),
})

export type BasicGuildMemberResponse = z.infer<typeof BasicGuildMemberResponseSchema>

export const MessageTypeSchema = z.xor([
  z.literal(0).meta({ description: '' }),
  z.literal(1).meta({ description: '' }),
  z.literal(2).meta({ description: '' }),
  z.literal(3).meta({ description: '' }),
  z.literal(4).meta({ description: '' }),
  z.literal(5).meta({ description: '' }),
  z.literal(6).meta({ description: '' }),
  z.literal(7).meta({ description: '' }),
  z.literal(8).meta({ description: '' }),
  z.literal(9).meta({ description: '' }),
  z.literal(10).meta({ description: '' }),
  z.literal(11).meta({ description: '' }),
  z.literal(12).meta({ description: '' }),
  z.literal(14).meta({ description: '' }),
  z.literal(15).meta({ description: '' }),
  z.literal(16).meta({ description: '' }),
  z.literal(17).meta({ description: '' }),
  z.literal(18).meta({ description: '' }),
  z.literal(19).meta({ description: '' }),
  z.literal(20).meta({ description: '' }),
  z.literal(21).meta({ description: '' }),
  z.literal(22).meta({ description: '' }),
  z.literal(23).meta({ description: '' }),
  z.literal(24).meta({ description: '' }),
  z.literal(25).meta({ description: '' }),
  z.literal(26).meta({ description: '' }),
  z.literal(27).meta({ description: '' }),
  z.literal(28).meta({ description: '' }),
  z.literal(29).meta({ description: '' }),
  z.literal(31).meta({ description: '' }),
  z.literal(32).meta({ description: '' }),
  z.literal(36).meta({ description: '' }),
  z.literal(37).meta({ description: '' }),
  z.literal(38).meta({ description: '' }),
  z.literal(39).meta({ description: '' }),
  z.literal(46).meta({ description: '' }),
  z.literal(55).meta({ description: '' }),
])

export type MessageType = z.infer<typeof MessageTypeSchema>

export const MessageAttachmentResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  filename: z.string(),
  size: z.int32(),
  url: z.url(),
  proxy_url: z.url(),
  width: z.int32().exactOptional(),
  height: z.int32().exactOptional(),
  duration_secs: z.number().exactOptional(),
  waveform: z.string().exactOptional(),
  description: z.string().exactOptional(),
  content_type: z.string().exactOptional(),
  ephemeral: z.boolean().exactOptional(),
  flags: z.int32().exactOptional(),
  placeholder: z.string().exactOptional(),
  placeholder_version: z.int32().exactOptional(),
  title: z.string().nullable().exactOptional(),
  application: ApplicationResponseSchema.exactOptional(),
  clip_created_at: z.iso.datetime({ offset: true }).exactOptional(),
  clip_participants: z.array(UserResponseSchema).exactOptional(),
})

export type MessageAttachmentResponse = z.infer<typeof MessageAttachmentResponseSchema>

export const MessageEmbedFieldResponseSchema = z.object({
  name: z.string(),
  value: z.string(),
  inline: z.boolean(),
})

export type MessageEmbedFieldResponse = z.infer<typeof MessageEmbedFieldResponseSchema>

export const MessageEmbedAuthorResponseSchema = z.object({
  name: z.string(),
  url: z.string().exactOptional(),
  icon_url: z.string().exactOptional(),
  proxy_icon_url: z.url().exactOptional(),
})

export type MessageEmbedAuthorResponse = z.infer<typeof MessageEmbedAuthorResponseSchema>

export const MessageEmbedProviderResponseSchema = z.object({
  name: z.string(),
  url: z.url().exactOptional(),
})

export type MessageEmbedProviderResponse = z.infer<typeof MessageEmbedProviderResponseSchema>

export const UInt32TypeSchema = z
  .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
  .transform((val) => BigInt(val))
  .pipe(z.int64().min(0n).max(4294967295n))

export type UInt32Type = z.infer<typeof UInt32TypeSchema>

export const MessageEmbedImageResponseSchema = z.object({
  url: z.string().exactOptional(),
  proxy_url: z.url().exactOptional(),
  width: UInt32TypeSchema.exactOptional(),
  height: UInt32TypeSchema.exactOptional(),
  content_type: z.string().exactOptional(),
  placeholder: z.string().exactOptional(),
  placeholder_version: UInt32TypeSchema.exactOptional(),
  description: z.string().exactOptional(),
  flags: UInt32TypeSchema.exactOptional(),
})

export type MessageEmbedImageResponse = z.infer<typeof MessageEmbedImageResponseSchema>

export const MessageEmbedVideoResponseSchema = z.object({
  url: z.string().exactOptional(),
  proxy_url: z.url().exactOptional(),
  width: UInt32TypeSchema.exactOptional(),
  height: UInt32TypeSchema.exactOptional(),
  content_type: z.string().exactOptional(),
  placeholder: z.string().exactOptional(),
  placeholder_version: UInt32TypeSchema.exactOptional(),
  description: z.string().exactOptional(),
  flags: UInt32TypeSchema.exactOptional(),
})

export type MessageEmbedVideoResponse = z.infer<typeof MessageEmbedVideoResponseSchema>

export const MessageEmbedAudioResponseSchema = z.object({
  url: z.string().exactOptional(),
  proxy_url: z.url().exactOptional(),
  content_type: z.string().exactOptional(),
  description: z.string().exactOptional(),
})

export type MessageEmbedAudioResponse = z.infer<typeof MessageEmbedAudioResponseSchema>

export const MessageEmbedFooterResponseSchema = z.object({
  text: z.string(),
  icon_url: z.string().exactOptional(),
  proxy_icon_url: z.url().exactOptional(),
})

export type MessageEmbedFooterResponse = z.infer<typeof MessageEmbedFooterResponseSchema>

export const ContentScanMetadataResponseSchema = z.object({ flags: z.int32() })

export type ContentScanMetadataResponse = z.infer<typeof ContentScanMetadataResponseSchema>

export const UnfurledMediaResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  url: z.string(),
  proxy_url: z.string().exactOptional(),
  width: z.int32().nullable().exactOptional(),
  height: z.int32().nullable().exactOptional(),
  placeholder: z.string().nullable().exactOptional(),
  placeholder_version: z.int32().nullable().exactOptional(),
  content_scan_metadata: ContentScanMetadataResponseSchema.exactOptional(),
  content_type: z.string().nullable().exactOptional(),
  flags: z.int32().exactOptional(),
  attachment_id: SnowflakeTypeSchema.exactOptional(),
})

export type UnfurledMediaResponse = z.infer<typeof UnfurledMediaResponseSchema>

export const FileComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  file: UnfurledMediaResponseSchema,
  name: z.string().nullable(),
  size: z.int32().nullable(),
  spoiler: z.boolean(),
})

export type FileComponentResponse = z.infer<typeof FileComponentResponseSchema>

export const MediaGalleryItemResponseSchema = z.object({
  media: UnfurledMediaResponseSchema,
  description: z.string().nullable(),
  spoiler: z.boolean(),
})

export type MediaGalleryItemResponse = z.infer<typeof MediaGalleryItemResponseSchema>

export const MediaGalleryComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  items: z.array(MediaGalleryItemResponseSchema),
})

export type MediaGalleryComponentResponse = z.infer<typeof MediaGalleryComponentResponseSchema>

export const TextDisplayComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  content: z.string(),
})

export type TextDisplayComponentResponse = z.infer<typeof TextDisplayComponentResponseSchema>

export const ThumbnailComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  media: UnfurledMediaResponseSchema,
  description: z.string().nullable(),
  spoiler: z.boolean(),
})

export type ThumbnailComponentResponse = z.infer<typeof ThumbnailComponentResponseSchema>

export const SectionComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  components: z.array(TextDisplayComponentResponseSchema),
  accessory: z.xor([ButtonComponentResponseSchema, ThumbnailComponentResponseSchema]),
})

export type SectionComponentResponse = z.infer<typeof SectionComponentResponseSchema>

export const SeparatorComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  spacing: MessageComponentSeparatorSpacingSizeSchema,
  divider: z.boolean(),
})

export type SeparatorComponentResponse = z.infer<typeof SeparatorComponentResponseSchema>

export const ContainerComponentResponseSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32(),
  accent_color: z.int32().nullable(),
  components: z.array(
    z.xor([
      ActionRowComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  spoiler: z.boolean(),
})

export type ContainerComponentResponse = z.infer<typeof ContainerComponentResponseSchema>

export const MessageEmbedResponseSchema = z.object({
  type: z.string(),
  url: z.url().exactOptional(),
  title: z.string().exactOptional(),
  description: z.string().exactOptional(),
  color: z.int32().exactOptional(),
  timestamp: z.iso.datetime({ offset: true }).exactOptional(),
  fields: z.array(MessageEmbedFieldResponseSchema).exactOptional(),
  author: MessageEmbedAuthorResponseSchema.exactOptional(),
  provider: MessageEmbedProviderResponseSchema.exactOptional(),
  image: MessageEmbedImageResponseSchema.exactOptional(),
  thumbnail: MessageEmbedImageResponseSchema.exactOptional(),
  video: MessageEmbedVideoResponseSchema.exactOptional(),
  audio: MessageEmbedAudioResponseSchema.exactOptional(),
  footer: MessageEmbedFooterResponseSchema.exactOptional(),
  flags: z.int32().nullable().exactOptional(),
  components: z.array(ContainerComponentResponseSchema).exactOptional(),
})

export type MessageEmbedResponse = z.infer<typeof MessageEmbedResponseSchema>

export const StickerTypesSchema = z.xor([
  z
    .literal(1)
    .meta({
      description: 'an official sticker in a pack, part of Nitro or in a removed purchasable pack',
    }),
  z.literal(2).meta({ description: "a sticker uploaded to a guild for the guild's members" }),
])

export type StickerTypes = z.infer<typeof StickerTypesSchema>

export const StickerFormatTypesSchema = z.xor([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
])

export type StickerFormatTypes = z.infer<typeof StickerFormatTypesSchema>

export const GuildStickerResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  tags: z.string(),
  type: StickerTypesSchema,
  format_type: z.xor([z.null().nullable(), StickerFormatTypesSchema]),
  description: z.string().nullable(),
  available: z.boolean(),
  guild_id: SnowflakeTypeSchema,
  user: UserResponseSchema.exactOptional(),
})

export type GuildStickerResponse = z.infer<typeof GuildStickerResponseSchema>

export const StandardStickerResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  tags: z.string(),
  type: StickerTypesSchema,
  format_type: z.xor([z.null().nullable(), StickerFormatTypesSchema]),
  description: z.string().nullable(),
  pack_id: SnowflakeTypeSchema,
  sort_value: z.int32(),
})

export type StandardStickerResponse = z.infer<typeof StandardStickerResponseSchema>

export const MessageStickerItemResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  format_type: StickerFormatTypesSchema,
})

export type MessageStickerItemResponse = z.infer<typeof MessageStickerItemResponseSchema>

export const MessageCallResponseSchema = z.object({
  ended_timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  participants: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
})

export type MessageCallResponse = z.infer<typeof MessageCallResponseSchema>

export const MessageActivityResponseSchema = z.object({
  type: ActivityActionTypesSchema,
  party_id: z.string().exactOptional(),
})

export type MessageActivityResponse = z.infer<typeof MessageActivityResponseSchema>

export const MessageInteractionResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  name: z.string(),
  user: UserResponseSchema.exactOptional(),
  name_localized: z.string().exactOptional(),
})

export type MessageInteractionResponse = z.infer<typeof MessageInteractionResponseSchema>

export const MessageReferenceTypeSchema = z.xor([
  z.literal(0).meta({ description: 'Reference to a message' }),
])

export type MessageReferenceType = z.infer<typeof MessageReferenceTypeSchema>

export const MessageReferenceResponseSchema = z.object({
  type: MessageReferenceTypeSchema,
  channel_id: SnowflakeTypeSchema,
  message_id: SnowflakeTypeSchema.exactOptional(),
  guild_id: SnowflakeTypeSchema.exactOptional(),
})

export type MessageReferenceResponse = z.infer<typeof MessageReferenceResponseSchema>

export const VideoQualityModesSchema = z.xor([
  z.literal(1).meta({ description: 'Discord chooses the quality for optimal performance' }),
  z.literal(2).meta({ description: '720p' }),
])

export type VideoQualityModes = z.infer<typeof VideoQualityModesSchema>

export const ThreadAutoArchiveDurationSchema = z.xor([
  z.literal(60).meta({ description: 'One hour' }),
  z.literal(1440).meta({ description: 'One day' }),
  z.literal(4320).meta({ description: 'Three days' }),
  z.literal(10080).meta({ description: 'Seven days' }),
])

export type ThreadAutoArchiveDuration = z.infer<typeof ThreadAutoArchiveDurationSchema>

export const ThreadMetadataResponseSchema = z.object({
  archived: z.boolean(),
  archive_timestamp: z.iso.datetime({ offset: true }).nullable(),
  auto_archive_duration: ThreadAutoArchiveDurationSchema,
  locked: z.boolean(),
  create_timestamp: z.iso.datetime({ offset: true }).exactOptional(),
  invitable: z.boolean().exactOptional(),
})

export type ThreadMetadataResponse = z.infer<typeof ThreadMetadataResponseSchema>

export const GuildMemberResponseSchema = z.object({
  avatar: z.string().nullable().meta({ description: "the member's guild avatar hash" }),
  avatar_decoration_data: z
    .xor([z.null().nullable(), UserAvatarDecorationResponseSchema])
    .meta({ description: "data for the member's guild avatar decoration" })
    .exactOptional(),
  banner: z.string().nullable().meta({ description: "the member's guild banner hash" }),
  communication_disabled_until: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({
      description:
        "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
    }),
  flags: z
    .int32()
    .meta({ description: 'guild member flags represented as a bit set, defaults to 0' }),
  joined_at: z.iso
    .datetime({ offset: true })
    .meta({ description: 'when the user joined the guild' }),
  nick: z.string().nullable().meta({ description: "this user's guild nickname" }),
  pending: z
    .boolean()
    .meta({
      description:
        "whether the user has not yet passed the guild's Membership Screening requirements",
    }),
  premium_since: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'when the user started boosting the guild' }),
  roles: z
    .array(SnowflakeTypeSchema)
    .refine((val) => new Set(val).size === val.length)
    .meta({ description: 'array of role object ids' }),
  collectibles: z
    .xor([z.null().nullable(), UserCollectiblesResponseSchema])
    .meta({ description: "data for the member's collectibles" })
    .exactOptional(),
  user: UserResponseSchema.meta({ description: 'the user this guild member represents' }),
  mute: z.boolean().meta({ description: 'whether the user is muted in voice channels' }),
  deaf: z.boolean().meta({ description: 'whether the user is deafened in voice channels' }),
})

export type GuildMemberResponse = z.infer<typeof GuildMemberResponseSchema>

export const ThreadMemberResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  join_timestamp: z.iso.datetime({ offset: true }),
  flags: z.int32(),
  member: GuildMemberResponseSchema.exactOptional(),
})

export type ThreadMemberResponse = z.infer<typeof ThreadMemberResponseSchema>

export const ThreadResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  flags: z.int32(),
  last_pin_timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  guild_id: SnowflakeTypeSchema,
  name: z.string(),
  parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  rate_limit_per_user: z.int32().exactOptional(),
  bitrate: z.int32().exactOptional(),
  user_limit: z.int32().exactOptional(),
  rtc_region: z.string().nullable().exactOptional(),
  video_quality_mode: VideoQualityModesSchema.exactOptional(),
  permissions: z.string().exactOptional(),
  owner_id: SnowflakeTypeSchema,
  thread_metadata: ThreadMetadataResponseSchema,
  message_count: z.int32(),
  member_count: z.int32(),
  total_message_sent: z.int32(),
  applied_tags: z.array(SnowflakeTypeSchema).exactOptional(),
  member: ThreadMemberResponseSchema.exactOptional(),
})

export type ThreadResponse = z.infer<typeof ThreadResponseSchema>

export const MessageMentionChannelResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  type: ChannelTypesSchema,
  guild_id: SnowflakeTypeSchema,
})

export type MessageMentionChannelResponse = z.infer<typeof MessageMentionChannelResponseSchema>

export const MessageRoleSubscriptionDataResponseSchema = z.object({
  role_subscription_listing_id: SnowflakeTypeSchema,
  tier_name: z.string(),
  total_months_subscribed: z.int32(),
  is_renewal: z.boolean(),
})

export type MessageRoleSubscriptionDataResponse = z.infer<
  typeof MessageRoleSubscriptionDataResponseSchema
>

export const PurchaseTypeSchema = z.xor([z.literal(0)])

export type PurchaseType = z.infer<typeof PurchaseTypeSchema>

export const GuildProductPurchaseResponseSchema = z.object({
  listing_id: SnowflakeTypeSchema,
  product_name: z.string(),
})

export type GuildProductPurchaseResponse = z.infer<typeof GuildProductPurchaseResponseSchema>

export const PurchaseNotificationResponseSchema = z.object({
  type: PurchaseTypeSchema,
  guild_product_purchase: GuildProductPurchaseResponseSchema.exactOptional(),
})

export type PurchaseNotificationResponse = z.infer<typeof PurchaseNotificationResponseSchema>

export const ChannelPermissionOverwritesSchema = z.xor([z.literal(0), z.literal(1)])

export type ChannelPermissionOverwrites = z.infer<typeof ChannelPermissionOverwritesSchema>

export const ChannelPermissionOverwriteResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: ChannelPermissionOverwritesSchema,
  allow: z.string(),
  deny: z.string(),
})

export type ChannelPermissionOverwriteResponse = z.infer<
  typeof ChannelPermissionOverwriteResponseSchema
>

export const ForumTagResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  moderated: z.boolean(),
  emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  emoji_name: z.string().nullable(),
})

export type ForumTagResponse = z.infer<typeof ForumTagResponseSchema>

export const DefaultReactionEmojiResponseSchema = z.object({
  emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  emoji_name: z.string().nullable(),
})

export type DefaultReactionEmojiResponse = z.infer<typeof DefaultReactionEmojiResponseSchema>

export const ThreadSortOrderSchema = z.xor([
  z.literal(0).meta({ description: 'Sort forum posts by activity' }),
  z
    .literal(1)
    .meta({ description: 'Sort forum posts by creation time (from most recent to oldest)' }),
])

export type ThreadSortOrder = z.infer<typeof ThreadSortOrderSchema>

export const ForumLayoutSchema = z.xor([
  z.literal(0).meta({ description: 'No default has been set for forum channel' }),
  z.literal(1).meta({ description: 'Display posts as a list' }),
  z.literal(2).meta({ description: 'Display posts as a collection of tiles' }),
])

export type ForumLayout = z.infer<typeof ForumLayoutSchema>

export const ThreadSearchTagSettingSchema = z.xor([
  z
    .literal('match_all')
    .meta({ description: 'The thread tags must contain all tags in the search query' }),
  z
    .literal('match_some')
    .meta({ description: 'The thread tags must contain at least one of tags in the search query' }),
])

export type ThreadSearchTagSetting = z.infer<typeof ThreadSearchTagSettingSchema>

export const GuildChannelResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  flags: z.int32(),
  last_pin_timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  guild_id: SnowflakeTypeSchema,
  name: z.string(),
  parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  rate_limit_per_user: z.int32().exactOptional(),
  bitrate: z.int32().exactOptional(),
  user_limit: z.int32().exactOptional(),
  rtc_region: z.string().nullable().exactOptional(),
  video_quality_mode: VideoQualityModesSchema.exactOptional(),
  permissions: z.string().exactOptional(),
  topic: z.string().nullable().exactOptional(),
  default_auto_archive_duration: ThreadAutoArchiveDurationSchema.exactOptional(),
  default_thread_rate_limit_per_user: z.int32().exactOptional(),
  position: z.int32(),
  permission_overwrites: z.array(ChannelPermissionOverwriteResponseSchema).exactOptional(),
  nsfw: z.boolean().exactOptional(),
  available_tags: z.array(ForumTagResponseSchema).exactOptional(),
  default_reaction_emoji: z
    .xor([z.null().nullable(), DefaultReactionEmojiResponseSchema])
    .exactOptional(),
  default_sort_order: z.xor([z.null().nullable(), ThreadSortOrderSchema]).exactOptional(),
  default_forum_layout: ForumLayoutSchema.exactOptional(),
  default_tag_setting: z.xor([z.null().nullable(), ThreadSearchTagSettingSchema]).exactOptional(),
})

export type GuildChannelResponse = z.infer<typeof GuildChannelResponseSchema>

export const PrivateChannelResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  flags: z.int32(),
  last_pin_timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  recipients: z.array(UserResponseSchema),
})

export type PrivateChannelResponse = z.infer<typeof PrivateChannelResponseSchema>

export const PrivateGroupChannelResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  flags: z.int32(),
  last_pin_timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  recipients: z.array(UserResponseSchema),
  name: z.string().nullable(),
  icon: z.string().nullable(),
  owner_id: SnowflakeTypeSchema,
  managed: z.boolean().exactOptional(),
  application_id: SnowflakeTypeSchema.exactOptional(),
})

export type PrivateGroupChannelResponse = z.infer<typeof PrivateGroupChannelResponseSchema>

export const GuildRoleColorsResponseSchema = z.object({
  primary_color: z.int32(),
  secondary_color: z.int32().nullable(),
  tertiary_color: z.int32().nullable(),
})

export type GuildRoleColorsResponse = z.infer<typeof GuildRoleColorsResponseSchema>

export const GuildRoleTagsResponseSchema = z.object({
  premium_subscriber: z.null().nullable().exactOptional(),
  bot_id: SnowflakeTypeSchema.exactOptional(),
  integration_id: SnowflakeTypeSchema.exactOptional(),
  subscription_listing_id: SnowflakeTypeSchema.exactOptional(),
  available_for_purchase: z.null().nullable().exactOptional(),
  guild_connections: z.null().nullable().exactOptional(),
})

export type GuildRoleTagsResponse = z.infer<typeof GuildRoleTagsResponseSchema>

export const GuildRoleResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  permissions: z.string(),
  position: z.int32(),
  color: z.int32(),
  colors: GuildRoleColorsResponseSchema,
  hoist: z.boolean(),
  managed: z.boolean(),
  mentionable: z.boolean(),
  icon: z.string().nullable(),
  unicode_emoji: z.string().nullable(),
  tags: GuildRoleTagsResponseSchema.exactOptional(),
  flags: z.int32(),
})

export type GuildRoleResponse = z.infer<typeof GuildRoleResponseSchema>

export const ResolvedObjectsResponseSchema = z.object({
  users: z.record(z.string(), UserResponseSchema).nullable().exactOptional(),
  members: z.record(z.string(), BasicGuildMemberResponseSchema).nullable().exactOptional(),
  channels: z
    .record(
      z.string(),
      z.xor([
        GuildChannelResponseSchema,
        PrivateChannelResponseSchema,
        PrivateGroupChannelResponseSchema,
        ThreadResponseSchema,
      ]),
    )
    .nullable()
    .exactOptional(),
  roles: z.record(z.string(), GuildRoleResponseSchema).nullable().exactOptional(),
})

export type ResolvedObjectsResponse = z.infer<typeof ResolvedObjectsResponseSchema>

export const MessageReactionEmojiResponseSchema = z.object({
  id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  name: z.string().nullable(),
  animated: z.boolean().exactOptional(),
})

export type MessageReactionEmojiResponse = z.infer<typeof MessageReactionEmojiResponseSchema>

export const PollMediaResponseSchema = z.object({
  text: z.string().meta({ description: 'The text of the field' }).exactOptional(),
  emoji: MessageReactionEmojiResponseSchema.meta({
    description: 'The emoji of the field',
  }).exactOptional(),
})

export type PollMediaResponse = z.infer<typeof PollMediaResponseSchema>

export const PollAnswerResponseSchema = z.object({
  answer_id: z.int32().meta({ description: 'The ID of the answer' }),
  poll_media: PollMediaResponseSchema.meta({ description: 'The data of the answer' }),
})

export type PollAnswerResponse = z.infer<typeof PollAnswerResponseSchema>

export const PollResultsEntryResponseSchema = z.object({
  id: z.int32().meta({ description: 'The answer_id' }),
  count: z.int32().meta({ description: 'The number of votes for this answer' }),
  me_voted: z.boolean().meta({ description: 'Whether the current user voted for this answer' }),
})

export type PollResultsEntryResponse = z.infer<typeof PollResultsEntryResponseSchema>

export const PollResultsResponseSchema = z.object({
  answer_counts: z
    .array(PollResultsEntryResponseSchema)
    .meta({ description: 'The counts for each answer' }),
  is_finalized: z.boolean().meta({ description: 'Whether the votes have been precisely counted' }),
})

export type PollResultsResponse = z.infer<typeof PollResultsResponseSchema>

export const PollResponseSchema = z.object({
  question: PollMediaResponseSchema.meta({
    description: 'The question of the poll. Only `text` is supported.',
  }),
  answers: z
    .array(PollAnswerResponseSchema)
    .meta({ description: 'Each of the answers available in the poll' }),
  expiry: z.iso.datetime({ offset: true }).meta({ description: 'The time when the poll ends' }),
  allow_multiselect: z
    .boolean()
    .meta({ description: 'Whether a user can select multiple answers' }),
  layout_type: PollLayoutTypesSchema.meta({ description: 'The layout type of the poll' }),
  results: PollResultsResponseSchema.meta({ description: 'The results of the poll' }),
})

export type PollResponse = z.infer<typeof PollResponseSchema>

export const CustomClientThemeResponseSchema = z.object({
  colors: z.array(z.string()),
  gradient_angle: z.int32(),
  base_mix: z.int32(),
  base_theme: MessageShareCustomUserThemeBaseThemeSchema,
})

export type CustomClientThemeResponse = z.infer<typeof CustomClientThemeResponseSchema>

export const MessageComponentInteractionMetadataResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  user: UserResponseSchema.exactOptional(),
  authorizing_integration_owners: z.record(z.string(), SnowflakeTypeSchema),
  original_response_message_id: SnowflakeTypeSchema.exactOptional(),
  interacted_message_id: SnowflakeTypeSchema,
})

export type MessageComponentInteractionMetadataResponse = z.infer<
  typeof MessageComponentInteractionMetadataResponseSchema
>

export const ModalSubmitInteractionMetadataResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  user: UserResponseSchema.exactOptional(),
  authorizing_integration_owners: z.record(z.string(), SnowflakeTypeSchema),
  original_response_message_id: SnowflakeTypeSchema.exactOptional(),
  triggering_interaction_metadata: z.xor([
    ApplicationCommandInteractionMetadataResponseSchema,
    MessageComponentInteractionMetadataResponseSchema,
  ]),
})

export type ModalSubmitInteractionMetadataResponse = z.infer<
  typeof ModalSubmitInteractionMetadataResponseSchema
>

export const MinimalContentMessageResponseSchema = z.object({
  type: MessageTypeSchema,
  content: z.string(),
  mentions: z.array(UserResponseSchema),
  mention_roles: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  attachments: z.array(MessageAttachmentResponseSchema),
  embeds: z.array(MessageEmbedResponseSchema),
  timestamp: z.iso.datetime({ offset: true }),
  edited_timestamp: z.iso.datetime({ offset: true }).nullable(),
  flags: z.int32(),
  components: z.array(
    z.xor([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: z
    .array(z.xor([GuildStickerResponseSchema, StandardStickerResponseSchema]))
    .exactOptional(),
  sticker_items: z.array(MessageStickerItemResponseSchema).exactOptional(),
})

export type MinimalContentMessageResponse = z.infer<typeof MinimalContentMessageResponseSchema>

export const MessageSnapshotResponseSchema = z.object({
  message: MinimalContentMessageResponseSchema,
})

export type MessageSnapshotResponse = z.infer<typeof MessageSnapshotResponseSchema>

export const MessageLobbyMemberResponseSchema = z.object({ additional_name: z.string() })

export type MessageLobbyMemberResponse = z.infer<typeof MessageLobbyMemberResponseSchema>

export const BasicMessageResponseSchema = z.object({
  type: MessageTypeSchema,
  content: z.string(),
  mentions: z.array(UserResponseSchema),
  mention_roles: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  attachments: z.array(MessageAttachmentResponseSchema),
  embeds: z.array(MessageEmbedResponseSchema),
  timestamp: z.iso.datetime({ offset: true }),
  edited_timestamp: z.iso.datetime({ offset: true }).nullable(),
  flags: z.int32(),
  components: z.array(
    z.xor([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: z
    .array(z.xor([GuildStickerResponseSchema, StandardStickerResponseSchema]))
    .exactOptional(),
  sticker_items: z.array(MessageStickerItemResponseSchema).exactOptional(),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: z.boolean(),
  mention_everyone: z.boolean(),
  tts: z.boolean(),
  call: MessageCallResponseSchema.exactOptional(),
  activity: MessageActivityResponseSchema.exactOptional(),
  application: BasicApplicationResponseWithBotSchema.exactOptional(),
  application_id: SnowflakeTypeSchema.exactOptional(),
  interaction: MessageInteractionResponseSchema.exactOptional(),
  nonce: z
    .xor([
      z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64().min(-9223372036854776000n).max(9223372036854776000n)),
      z.string().max(25),
    ])
    .exactOptional(),
  webhook_id: SnowflakeTypeSchema.exactOptional(),
  message_reference: MessageReferenceResponseSchema.exactOptional(),
  thread: ThreadResponseSchema.exactOptional(),
  mention_channels: z.array(MessageMentionChannelResponseSchema).exactOptional(),
  role_subscription_data: MessageRoleSubscriptionDataResponseSchema.exactOptional(),
  purchase_notification: PurchaseNotificationResponseSchema.exactOptional(),
  position: z.int32().exactOptional(),
  resolved: ResolvedObjectsResponseSchema.exactOptional(),
  poll: PollResponseSchema.exactOptional(),
  shared_client_theme: CustomClientThemeResponseSchema.exactOptional(),
  interaction_metadata: z
    .xor([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
      ModalSubmitInteractionMetadataResponseSchema,
    ])
    .exactOptional(),
  message_snapshots: z.array(MessageSnapshotResponseSchema).exactOptional(),
  lobby_member: MessageLobbyMemberResponseSchema.exactOptional(),
  actor: UserResponseSchema.exactOptional(),
})

export type BasicMessageResponse = z.infer<typeof BasicMessageResponseSchema>

export const BlockMessageActionMetadataSchema = z.object({
  custom_message: z.string().max(300).nullable().exactOptional(),
})

export type BlockMessageActionMetadata = z.infer<typeof BlockMessageActionMetadataSchema>

export const BlockMessageActionSchema = z.object({
  type: AutomodActionTypeSchema,
  metadata: z.xor([z.null().nullable(), BlockMessageActionMetadataSchema]).exactOptional(),
})

export type BlockMessageAction = z.infer<typeof BlockMessageActionSchema>

export const BlockMessageActionMetadataResponseSchema = z.object({
  custom_message: z.string().exactOptional(),
})

export type BlockMessageActionMetadataResponse = z.infer<
  typeof BlockMessageActionMetadataResponseSchema
>

export const BlockMessageActionResponseSchema = z.object({
  type: AutomodActionTypeSchema,
  metadata: BlockMessageActionMetadataResponseSchema,
})

export type BlockMessageActionResponse = z.infer<typeof BlockMessageActionResponseSchema>

export const BotAccountPatchRequestSchema = z.object({
  username: z.string().min(2).max(32),
  avatar: z.string().nullable().exactOptional(),
  banner: z.string().nullable().exactOptional(),
})

export type BotAccountPatchRequest = z.infer<typeof BotAccountPatchRequestSchema>

export const BotAddGuildMemberRequestSchema = z.object({
  nick: z.string().max(32).nullable().exactOptional(),
  roles: z
    .array(SnowflakeTypeSchema)
    .max(250)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  mute: z.boolean().nullable().exactOptional(),
  deaf: z.boolean().nullable().exactOptional(),
  access_token: z.string().max(10240),
  flags: z.int().nullable().exactOptional(),
})

export type BotAddGuildMemberRequest = z.infer<typeof BotAddGuildMemberRequestSchema>

export const BulkBanUsersRequestSchema = z.object({
  user_ids: z
    .array(SnowflakeTypeSchema)
    .max(200)
    .refine((val) => new Set(val).size === val.length),
  delete_message_seconds: z.int().min(0).max(604800).nullable().exactOptional(),
})

export type BulkBanUsersRequest = z.infer<typeof BulkBanUsersRequestSchema>

export const BulkBanUsersResponseSchema = z.object({
  banned_users: z.array(SnowflakeTypeSchema),
  failed_users: z.array(SnowflakeTypeSchema),
})

export type BulkBanUsersResponse = z.infer<typeof BulkBanUsersResponseSchema>

export const BulkLobbyMemberRequestSchema = z.object({
  id: SnowflakeTypeSchema,
  metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
  flags: z.xor([z.null().nullable(), z.literal(1)]).exactOptional(),
  additional_name: z.string().min(1).max(80).nullable().exactOptional(),
  remove_member: z.boolean().nullable().exactOptional(),
})

export type BulkLobbyMemberRequest = z.infer<typeof BulkLobbyMemberRequestSchema>

export const RecurrenceRuleWeekdaysSchema = z.xor([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
])

export type RecurrenceRuleWeekdays = z.infer<typeof RecurrenceRuleWeekdaysSchema>

export const ByNWeekdaySchema = z.object({
  n: z
    .int32()
    .min(1)
    .max(5)
    .meta({ description: 'The week to reoccur on (1-5, where 5 represents the last week)' }),
  day: RecurrenceRuleWeekdaysSchema.meta({ description: 'The day within the week to reoccur on' }),
})

export type ByNWeekday = z.infer<typeof ByNWeekdaySchema>

export const ByNWeekdayResponseSchema = z.object({
  n: z
    .int32()
    .meta({ description: 'The week to reoccur on (1-5, where 5 represents the last week)' }),
  day: RecurrenceRuleWeekdaysSchema.meta({ description: 'The day within the week to reoccur on' }),
})

export type ByNWeekdayResponse = z.infer<typeof ByNWeekdayResponseSchema>

export const ChannelFollowerResponseSchema = z.object({
  channel_id: SnowflakeTypeSchema,
  webhook_id: SnowflakeTypeSchema,
})

export type ChannelFollowerResponse = z.infer<typeof ChannelFollowerResponseSchema>

export const WebhookSourceGuildResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  icon: z.string().nullable(),
  name: z.string(),
})

export type WebhookSourceGuildResponse = z.infer<typeof WebhookSourceGuildResponseSchema>

export const WebhookSourceChannelResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
})

export type WebhookSourceChannelResponse = z.infer<typeof WebhookSourceChannelResponseSchema>

export const ChannelFollowerWebhookResponseSchema = z.object({
  application_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  avatar: z.string().nullable(),
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  id: SnowflakeTypeSchema,
  name: z.string(),
  type: WebhookTypesSchema,
  user: UserResponseSchema.exactOptional(),
  source_guild: WebhookSourceGuildResponseSchema.exactOptional(),
  source_channel: WebhookSourceChannelResponseSchema.exactOptional(),
})

export type ChannelFollowerWebhookResponse = z.infer<typeof ChannelFollowerWebhookResponseSchema>

export const ChannelPermissionOverwriteRequestSchema = z.object({
  id: SnowflakeTypeSchema,
  type: z.xor([z.null().nullable(), ChannelPermissionOverwritesSchema]).exactOptional(),
  allow: z.int().nullable().exactOptional(),
  deny: z.int().nullable().exactOptional(),
})

export type ChannelPermissionOverwriteRequest = z.infer<
  typeof ChannelPermissionOverwriteRequestSchema
>

export const ChannelSelectComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  placeholder: z.string().max(150).nullable().exactOptional(),
  min_values: z.int().min(0).max(25).nullable().exactOptional(),
  max_values: z.int().min(1).max(25).nullable().exactOptional(),
  disabled: z.boolean().nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  default_values: z.array(ChannelSelectDefaultValueSchema).max(25).nullable().exactOptional(),
  channel_types: z
    .array(ChannelTypesSchema)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
})

export type ChannelSelectComponentForModalRequest = z.infer<
  typeof ChannelSelectComponentForModalRequestSchema
>

export const CheckboxComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  default: z.boolean().nullable().exactOptional(),
})

export type CheckboxComponentForModalRequest = z.infer<
  typeof CheckboxComponentForModalRequestSchema
>

export const CheckboxGroupOptionForRequestSchema = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(100),
  description: z.string().max(100).nullable().exactOptional(),
  default: z.boolean().nullable().exactOptional(),
})

export type CheckboxGroupOptionForRequest = z.infer<typeof CheckboxGroupOptionForRequestSchema>

export const CheckboxGroupComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  min_values: z.int().min(0).max(10).nullable().exactOptional(),
  max_values: z.int().min(1).max(10).nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  options: z.array(CheckboxGroupOptionForRequestSchema).min(1).max(10),
})

export type CheckboxGroupComponentForModalRequest = z.infer<
  typeof CheckboxGroupComponentForModalRequestSchema
>

export const CommandPermissionResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: ApplicationCommandPermissionTypeSchema,
  permission: z.boolean(),
})

export type CommandPermissionResponse = z.infer<typeof CommandPermissionResponseSchema>

export const CommandPermissionsResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  permissions: z.array(CommandPermissionResponseSchema),
})

export type CommandPermissionsResponse = z.infer<typeof CommandPermissionsResponseSchema>

export const ConnectedAccountGuildResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  icon: z.string().nullable(),
})

export type ConnectedAccountGuildResponse = z.infer<typeof ConnectedAccountGuildResponseSchema>

export const IntegrationTypesSchema = z.xor([
  z.literal('discord'),
  z.literal('twitch'),
  z.literal('youtube'),
  z.literal('guild_subscription'),
])

export type IntegrationTypes = z.infer<typeof IntegrationTypesSchema>

export const ConnectedAccountIntegrationResponseSchema = z.object({
  id: z.string(),
  type: IntegrationTypesSchema,
  account: AccountResponseSchema,
  guild: ConnectedAccountGuildResponseSchema,
})

export type ConnectedAccountIntegrationResponse = z.infer<
  typeof ConnectedAccountIntegrationResponseSchema
>

export const ConnectedAccountProvidersSchema = z.xor([
  z.literal('battlenet'),
  z.literal('bluesky'),
  z.literal('bungie'),
  z.literal('ebay'),
  z.literal('epicgames'),
  z.literal('facebook'),
  z.literal('github'),
  z.literal('instagram'),
  z.literal('letterboxd'),
  z.literal('mastodon'),
  z.literal('leagueoflegends'),
  z.literal('paypal'),
  z.literal('playstation'),
  z.literal('reddit'),
  z.literal('riotgames'),
  z.literal('roblox'),
  z.literal('skype'),
  z.literal('spotify'),
  z.literal('steam'),
  z.literal('tiktok'),
  z.literal('twitch'),
  z.literal('twitter'),
  z.literal('xbox'),
  z.literal('youtube'),
  z.literal('domain'),
])

export type ConnectedAccountProviders = z.infer<typeof ConnectedAccountProvidersSchema>

export const ConnectedAccountVisibilitySchema = z.xor([z.literal(0), z.literal(1)])

export type ConnectedAccountVisibility = z.infer<typeof ConnectedAccountVisibilitySchema>

export const ConnectedAccountResponseSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  type: ConnectedAccountProvidersSchema,
  friend_sync: z.boolean(),
  integrations: z.array(ConnectedAccountIntegrationResponseSchema).exactOptional(),
  show_activity: z.boolean(),
  two_way_link: z.boolean(),
  verified: z.boolean(),
  visibility: ConnectedAccountVisibilitySchema,
  revoked: z.boolean().exactOptional(),
})

export type ConnectedAccountResponse = z.infer<typeof ConnectedAccountResponseSchema>

export const EntitlementOwnerTypesSchema = z.xor([
  z.literal(1).meta({ description: 'A guild subscription' }),
  z.literal(2).meta({ description: 'A user subscription' }),
])

export type EntitlementOwnerTypes = z.infer<typeof EntitlementOwnerTypesSchema>

export const CreateEntitlementRequestDataSchema = z.object({
  sku_id: SnowflakeTypeSchema.meta({ description: 'ID of the SKU to grant the entitlement to' }),
  owner_id: SnowflakeTypeSchema.meta({
    description: 'ID of the guild or user to grant the entitlement to',
  }),
  owner_type: EntitlementOwnerTypesSchema.meta({
    description: '1 for a guild subscription, 2 for a user subscription',
  }),
})

export type CreateEntitlementRequestData = z.infer<typeof CreateEntitlementRequestDataSchema>

export const CreateForumThreadRequestSchema = z.object({
  name: z.string().min(1).max(100),
  auto_archive_duration: z
    .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
    .exactOptional(),
  rate_limit_per_user: z.int32().min(0).max(21600).nullable().exactOptional(),
  applied_tags: z.array(SnowflakeTypeSchema).max(5).nullable().exactOptional(),
  message: BaseCreateMessageCreateRequestSchema,
})

export type CreateForumThreadRequest = z.infer<typeof CreateForumThreadRequestSchema>

export const CreateGroupDMInviteRequestSchema = z.object({
  max_age: z.int().min(1).max(2592000).nullable().exactOptional(),
})

export type CreateGroupDMInviteRequest = z.infer<typeof CreateGroupDMInviteRequestSchema>

export const UpdateDefaultReactionEmojiRequestSchema = z.object({
  emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  emoji_name: z.string().max(100).nullable().exactOptional(),
})

export type UpdateDefaultReactionEmojiRequest = z.infer<
  typeof UpdateDefaultReactionEmojiRequestSchema
>

export const CreateOrUpdateThreadTagRequestSchema = z.object({
  name: z.string().min(0).max(50),
  emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  emoji_name: z.string().max(100).nullable().exactOptional(),
  moderated: z.boolean().nullable().exactOptional(),
})

export type CreateOrUpdateThreadTagRequest = z.infer<typeof CreateOrUpdateThreadTagRequestSchema>

export const CreateGuildChannelRequestSchema = z.object({
  type: z.xor([z.null().nullable(), ChannelTypesSchema]).exactOptional(),
  name: z.string().min(1).max(100),
  position: z.int32().min(0).nullable().exactOptional(),
  topic: z.string().min(0).max(4096).nullable().exactOptional(),
  bitrate: z.int32().min(8000).nullable().exactOptional(),
  user_limit: z.int32().min(0).nullable().exactOptional(),
  nsfw: z.boolean().nullable().exactOptional(),
  rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
  parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  permission_overwrites: z
    .array(ChannelPermissionOverwriteRequestSchema)
    .max(100)
    .nullable()
    .exactOptional(),
  rtc_region: z.string().nullable().exactOptional(),
  video_quality_mode: z.xor([z.null().nullable(), VideoQualityModesSchema]).exactOptional(),
  default_auto_archive_duration: z
    .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
    .exactOptional(),
  default_reaction_emoji: z
    .xor([z.null().nullable(), UpdateDefaultReactionEmojiRequestSchema])
    .exactOptional(),
  default_thread_rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
  default_sort_order: z.xor([z.null().nullable(), ThreadSortOrderSchema]).exactOptional(),
  default_forum_layout: z.xor([z.null().nullable(), ForumLayoutSchema]).exactOptional(),
  default_tag_setting: z.xor([z.null().nullable(), ThreadSearchTagSettingSchema]).exactOptional(),
  available_tags: z
    .array(z.xor([z.null().nullable(), CreateOrUpdateThreadTagRequestSchema]))
    .max(20)
    .nullable()
    .exactOptional(),
})

export type CreateGuildChannelRequest = z.infer<typeof CreateGuildChannelRequestSchema>

export const InviteTargetTypesSchema = z.xor([z.literal(1), z.literal(2), z.literal(3)])

export type InviteTargetTypes = z.infer<typeof InviteTargetTypesSchema>

export const CreateGuildInviteRequestSchema = z.object({
  max_age: z.int().min(0).max(5184000).nullable().exactOptional(),
  temporary: z.boolean().nullable().exactOptional(),
  max_uses: z.int().min(0).max(100).nullable().exactOptional(),
  unique: z.boolean().nullable().exactOptional(),
  target_user_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  target_application_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  target_type: z.xor([z.null().nullable(), InviteTargetTypesSchema]).exactOptional(),
  role_ids: z
    .xor([
      z.string(),
      z
        .array(SnowflakeTypeSchema)
        .max(250)
        .refine((val) => new Set(val).size === val.length),
      z.null().nullable(),
    ])
    .exactOptional(),
  target_user_ids: z
    .xor([
      z.string(),
      z
        .array(SnowflakeTypeSchema)
        .max(1000)
        .refine((val) => new Set(val).size === val.length),
      z.null().nullable(),
    ])
    .meta({ description: 'The IDs of the users to target with this invite.' })
    .exactOptional(),
})

export type CreateGuildInviteRequest = z.infer<typeof CreateGuildInviteRequestSchema>

export const IncomingWebhookInteractionRequestSchema = z.object({
  content: z.string().max(2000).nullable().exactOptional(),
  embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
  allowed_mentions: z
    .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
    .exactOptional(),
  components: z
    .array(
      z.xor([
        ActionRowComponentForMessageRequestSchema,
        ContainerComponentForMessageRequestSchema,
        FileComponentForMessageRequestSchema,
        MediaGalleryComponentForMessageRequestSchema,
        SectionComponentForMessageRequestSchema,
        SeparatorComponentForMessageRequestSchema,
        TextDisplayComponentForMessageRequestSchema,
      ]),
    )
    .max(40)
    .nullable()
    .exactOptional(),
  attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
  poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
  tts: z.boolean().nullable().exactOptional(),
  flags: z.int().nullable().exactOptional(),
})

export type IncomingWebhookInteractionRequest = z.infer<
  typeof IncomingWebhookInteractionRequestSchema
>

export const CreateMessageInteractionCallbackRequestSchema = z.object({
  type: InteractionCallbackTypesSchema,
  data: z.xor([z.null().nullable(), IncomingWebhookInteractionRequestSchema]).exactOptional(),
})

export type CreateMessageInteractionCallbackRequest = z.infer<
  typeof CreateMessageInteractionCallbackRequestSchema
>

export const MessageReactionCountDetailsResponseSchema = z.object({
  burst: z.int32(),
  normal: z.int32(),
})

export type MessageReactionCountDetailsResponse = z.infer<
  typeof MessageReactionCountDetailsResponseSchema
>

export const MessageReactionResponseSchema = z.object({
  emoji: MessageReactionEmojiResponseSchema,
  count: z.int32(),
  count_details: MessageReactionCountDetailsResponseSchema,
  burst_colors: z.array(z.string()),
  me_burst: z.boolean(),
  me: z.boolean(),
})

export type MessageReactionResponse = z.infer<typeof MessageReactionResponseSchema>

export const MessageResponseSchema = z.object({
  type: MessageTypeSchema,
  content: z.string(),
  mentions: z.array(UserResponseSchema),
  mention_roles: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  attachments: z.array(MessageAttachmentResponseSchema),
  embeds: z.array(MessageEmbedResponseSchema),
  timestamp: z.iso.datetime({ offset: true }),
  edited_timestamp: z.iso.datetime({ offset: true }).nullable(),
  flags: z.int32(),
  components: z.array(
    z.xor([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: z
    .array(z.xor([GuildStickerResponseSchema, StandardStickerResponseSchema]))
    .exactOptional(),
  sticker_items: z.array(MessageStickerItemResponseSchema).exactOptional(),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: z.boolean(),
  mention_everyone: z.boolean(),
  tts: z.boolean(),
  call: MessageCallResponseSchema.exactOptional(),
  activity: MessageActivityResponseSchema.exactOptional(),
  application: BasicApplicationResponseWithBotSchema.exactOptional(),
  application_id: SnowflakeTypeSchema.exactOptional(),
  interaction: MessageInteractionResponseSchema.exactOptional(),
  nonce: z
    .xor([
      z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64().min(-9223372036854776000n).max(9223372036854776000n)),
      z.string().max(25),
    ])
    .exactOptional(),
  webhook_id: SnowflakeTypeSchema.exactOptional(),
  message_reference: MessageReferenceResponseSchema.exactOptional(),
  thread: ThreadResponseSchema.exactOptional(),
  mention_channels: z.array(MessageMentionChannelResponseSchema).exactOptional(),
  role_subscription_data: MessageRoleSubscriptionDataResponseSchema.exactOptional(),
  purchase_notification: PurchaseNotificationResponseSchema.exactOptional(),
  position: z.int32().exactOptional(),
  resolved: ResolvedObjectsResponseSchema.exactOptional(),
  poll: PollResponseSchema.exactOptional(),
  shared_client_theme: CustomClientThemeResponseSchema.exactOptional(),
  interaction_metadata: z
    .xor([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
      ModalSubmitInteractionMetadataResponseSchema,
    ])
    .exactOptional(),
  message_snapshots: z.array(MessageSnapshotResponseSchema).exactOptional(),
  lobby_member: MessageLobbyMemberResponseSchema.exactOptional(),
  actor: UserResponseSchema.exactOptional(),
  reactions: z.array(MessageReactionResponseSchema).exactOptional(),
  referenced_message: z.xor([z.null().nullable(), BasicMessageResponseSchema]).exactOptional(),
})

export type MessageResponse = z.infer<typeof MessageResponseSchema>

export const CreateMessageInteractionCallbackResponseSchema = z.object({
  type: InteractionCallbackTypesSchema,
  message: MessageResponseSchema,
})

export type CreateMessageInteractionCallbackResponse = z.infer<
  typeof CreateMessageInteractionCallbackResponseSchema
>

export const CreatePrivateChannelRequestSchema = z.object({
  recipient_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  access_tokens: z
    .array(z.string().max(152133))
    .max(1521)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  nicks: z.record(z.string(), z.string().max(152133).nullable()).nullable().exactOptional(),
})

export type CreatePrivateChannelRequest = z.infer<typeof CreatePrivateChannelRequestSchema>

export const RoleColorsSchema = z.object({
  primary_color: z.int().min(0).max(16777215).nullable().exactOptional(),
  secondary_color: z.int().min(0).max(16777215).nullable().exactOptional(),
  tertiary_color: z.int().min(0).max(16777215).nullable().exactOptional(),
})

export type RoleColors = z.infer<typeof RoleColorsSchema>

export const CreateRoleRequestSchema = z.object({
  name: z.string().min(1).max(100).nullable().exactOptional(),
  permissions: z.int().nullable().exactOptional(),
  color: z.int().min(0).max(16777215).nullable().exactOptional(),
  colors: z.xor([z.null().nullable(), RoleColorsSchema]).exactOptional(),
  hoist: z.boolean().nullable().exactOptional(),
  mentionable: z.boolean().nullable().exactOptional(),
  icon: z.string().nullable().exactOptional(),
  unicode_emoji: z.string().max(100).nullable().exactOptional(),
})

export type CreateRoleRequest = z.infer<typeof CreateRoleRequestSchema>

export const CreateTextThreadWithMessageRequestSchema = z.object({
  name: z.string().min(1).max(100),
  auto_archive_duration: z
    .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
    .exactOptional(),
  rate_limit_per_user: z.int32().min(0).max(21600).nullable().exactOptional(),
})

export type CreateTextThreadWithMessageRequest = z.infer<
  typeof CreateTextThreadWithMessageRequestSchema
>

export const CreateTextThreadWithoutMessageRequestSchema = z.object({
  name: z.string().min(1).max(100),
  auto_archive_duration: z
    .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
    .exactOptional(),
  rate_limit_per_user: z.int32().min(0).max(21600).nullable().exactOptional(),
  type: z.xor([z.null().nullable(), ChannelTypesSchema]).exactOptional(),
  invitable: z.boolean().nullable().exactOptional(),
})

export type CreateTextThreadWithoutMessageRequest = z.infer<
  typeof CreateTextThreadWithoutMessageRequestSchema
>

export const CreatedThreadResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  flags: z.int32(),
  last_pin_timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  guild_id: SnowflakeTypeSchema,
  name: z.string(),
  parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  rate_limit_per_user: z.int32().exactOptional(),
  bitrate: z.int32().exactOptional(),
  user_limit: z.int32().exactOptional(),
  rtc_region: z.string().nullable().exactOptional(),
  video_quality_mode: VideoQualityModesSchema.exactOptional(),
  permissions: z.string().exactOptional(),
  owner_id: SnowflakeTypeSchema,
  thread_metadata: ThreadMetadataResponseSchema,
  message_count: z.int32(),
  member_count: z.int32(),
  total_message_sent: z.int32(),
  applied_tags: z.array(SnowflakeTypeSchema).exactOptional(),
  member: ThreadMemberResponseSchema.exactOptional(),
})

export type CreatedThreadResponse = z.infer<typeof CreatedThreadResponseSchema>

export const DefaultKeywordListTriggerMetadataSchema = z.object({
  allow_list: z.array(z.string().min(1).max(60)).max(1000).nullable().exactOptional(),
  presets: z
    .array(AutomodKeywordPresetTypeSchema)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
})

export type DefaultKeywordListTriggerMetadata = z.infer<
  typeof DefaultKeywordListTriggerMetadataSchema
>

export const DefaultKeywordListTriggerMetadataResponseSchema = z.object({
  allow_list: z.array(z.string()),
  presets: z
    .array(AutomodKeywordPresetTypeSchema)
    .refine((val) => new Set(val).size === val.length),
})

export type DefaultKeywordListTriggerMetadataResponse = z.infer<
  typeof DefaultKeywordListTriggerMetadataResponseSchema
>

export const FlagToChannelActionMetadataSchema = z.object({ channel_id: SnowflakeTypeSchema })

export type FlagToChannelActionMetadata = z.infer<typeof FlagToChannelActionMetadataSchema>

export const FlagToChannelActionSchema = z.object({
  type: AutomodActionTypeSchema,
  metadata: FlagToChannelActionMetadataSchema,
})

export type FlagToChannelAction = z.infer<typeof FlagToChannelActionSchema>

export const QuarantineUserActionMetadataSchema = z.object({})

export type QuarantineUserActionMetadata = z.infer<typeof QuarantineUserActionMetadataSchema>

export const QuarantineUserActionSchema = z.object({
  type: AutomodActionTypeSchema,
  metadata: z.xor([z.null().nullable(), QuarantineUserActionMetadataSchema]).exactOptional(),
})

export type QuarantineUserAction = z.infer<typeof QuarantineUserActionSchema>

export const UserCommunicationDisabledActionMetadataSchema = z.object({
  duration_seconds: z.int().min(0).max(2419200).nullable().exactOptional(),
})

export type UserCommunicationDisabledActionMetadata = z.infer<
  typeof UserCommunicationDisabledActionMetadataSchema
>

export const UserCommunicationDisabledActionSchema = z.object({
  type: AutomodActionTypeSchema,
  metadata: UserCommunicationDisabledActionMetadataSchema,
})

export type UserCommunicationDisabledAction = z.infer<typeof UserCommunicationDisabledActionSchema>

export const DefaultKeywordListUpsertRequestSchema = z.object({
  name: z.string().max(100),
  event_type: AutomodEventTypeSchema,
  actions: z
    .array(
      z.xor([
        BlockMessageActionSchema,
        FlagToChannelActionSchema,
        QuarantineUserActionSchema,
        UserCommunicationDisabledActionSchema,
      ]),
    )
    .min(1)
    .max(5)
    .nullable()
    .exactOptional(),
  enabled: z.boolean().nullable().exactOptional(),
  exempt_roles: z
    .array(SnowflakeTypeSchema)
    .max(20)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  exempt_channels: z
    .array(SnowflakeTypeSchema)
    .max(50)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: DefaultKeywordListTriggerMetadataSchema,
})

export type DefaultKeywordListUpsertRequest = z.infer<typeof DefaultKeywordListUpsertRequestSchema>

export const DefaultKeywordListUpsertRequestPartialSchema = z.object({
  name: z.string().max(100).exactOptional(),
  event_type: AutomodEventTypeSchema.exactOptional(),
  actions: z
    .array(
      z.xor([
        BlockMessageActionSchema,
        FlagToChannelActionSchema,
        QuarantineUserActionSchema,
        UserCommunicationDisabledActionSchema,
      ]),
    )
    .min(1)
    .max(5)
    .nullable()
    .exactOptional(),
  enabled: z.boolean().nullable().exactOptional(),
  exempt_roles: z
    .array(SnowflakeTypeSchema)
    .max(20)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  exempt_channels: z
    .array(SnowflakeTypeSchema)
    .max(50)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  trigger_type: AutomodTriggerTypeSchema.exactOptional(),
  trigger_metadata: DefaultKeywordListTriggerMetadataSchema.exactOptional(),
})

export type DefaultKeywordListUpsertRequestPartial = z.infer<
  typeof DefaultKeywordListUpsertRequestPartialSchema
>

export const FlagToChannelActionMetadataResponseSchema = z.object({
  channel_id: SnowflakeTypeSchema,
})

export type FlagToChannelActionMetadataResponse = z.infer<
  typeof FlagToChannelActionMetadataResponseSchema
>

export const FlagToChannelActionResponseSchema = z.object({
  type: AutomodActionTypeSchema,
  metadata: FlagToChannelActionMetadataResponseSchema,
})

export type FlagToChannelActionResponse = z.infer<typeof FlagToChannelActionResponseSchema>

export const QuarantineUserActionMetadataResponseSchema = z.object({})

export type QuarantineUserActionMetadataResponse = z.infer<
  typeof QuarantineUserActionMetadataResponseSchema
>

export const QuarantineUserActionResponseSchema = z.object({
  type: AutomodActionTypeSchema,
  metadata: QuarantineUserActionMetadataResponseSchema,
})

export type QuarantineUserActionResponse = z.infer<typeof QuarantineUserActionResponseSchema>

export const UserCommunicationDisabledActionMetadataResponseSchema = z.object({
  duration_seconds: z.int32(),
})

export type UserCommunicationDisabledActionMetadataResponse = z.infer<
  typeof UserCommunicationDisabledActionMetadataResponseSchema
>

export const UserCommunicationDisabledActionResponseSchema = z.object({
  type: AutomodActionTypeSchema,
  metadata: UserCommunicationDisabledActionMetadataResponseSchema,
})

export type UserCommunicationDisabledActionResponse = z.infer<
  typeof UserCommunicationDisabledActionResponseSchema
>

export const DefaultKeywordRuleResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: z.string(),
  event_type: AutomodEventTypeSchema,
  actions: z.array(
    z.xor([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: z.boolean(),
  exempt_roles: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  exempt_channels: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  trigger_metadata: DefaultKeywordListTriggerMetadataResponseSchema,
})

export type DefaultKeywordRuleResponse = z.infer<typeof DefaultKeywordRuleResponseSchema>

export const IntegrationApplicationResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  icon: z.string().nullable(),
  description: z.string(),
  type: z.xor([z.null().nullable(), ApplicationTypesSchema]),
  cover_image: z.string().exactOptional(),
  primary_sku_id: SnowflakeTypeSchema.exactOptional(),
  flags: z.int32(),
  flags_new: z.string(),
  bot: UserResponseSchema.exactOptional(),
})

export type IntegrationApplicationResponse = z.infer<typeof IntegrationApplicationResponseSchema>

export const DiscordIntegrationResponseSchema = z.object({
  type: IntegrationTypesSchema,
  name: z.string().nullable(),
  account: AccountResponseSchema,
  enabled: z.boolean(),
  id: SnowflakeTypeSchema,
  application: IntegrationApplicationResponseSchema,
  scopes: z.array(OAuth2ScopesSchema).refine((val) => new Set(val).size === val.length),
  user: UserResponseSchema.exactOptional(),
})

export type DiscordIntegrationResponse = z.infer<typeof DiscordIntegrationResponseSchema>

export const EmbeddedActivityLocationKindSchema = z.xor([
  z.literal('gc').meta({ description: 'guild channel' }),
  z.literal('pc').meta({ description: 'private channel' }),
  z.literal('party').meta({ description: 'party' }),
])

export type EmbeddedActivityLocationKind = z.infer<typeof EmbeddedActivityLocationKindSchema>

export const GuildChannelLocationSchema = z.object({
  id: z.string(),
  kind: EmbeddedActivityLocationKindSchema,
  channel_id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
})

export type GuildChannelLocation = z.infer<typeof GuildChannelLocationSchema>

export const PrivateChannelLocationSchema = z.object({
  id: z.string(),
  kind: EmbeddedActivityLocationKindSchema,
  channel_id: SnowflakeTypeSchema,
})

export type PrivateChannelLocation = z.infer<typeof PrivateChannelLocationSchema>

export const EmbeddedActivityInstanceSchema = z.object({
  application_id: SnowflakeTypeSchema,
  instance_id: z.string(),
  launch_id: z.string(),
  location: z.xor([GuildChannelLocationSchema, PrivateChannelLocationSchema]),
  users: z.array(SnowflakeTypeSchema),
})

export type EmbeddedActivityInstance = z.infer<typeof EmbeddedActivityInstanceSchema>

export const EmojiResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  user: UserResponseSchema.exactOptional(),
  roles: z.array(SnowflakeTypeSchema),
  require_colons: z.boolean(),
  managed: z.boolean(),
  animated: z.boolean(),
  available: z.boolean(),
})

export type EmojiResponse = z.infer<typeof EmojiResponseSchema>

export const EntitlementTypesSchema = z.xor([z.literal(8), z.literal(10)])

export type EntitlementTypes = z.infer<typeof EntitlementTypesSchema>

export const EntitlementTenantFulfillmentStatusResponseSchema = z.xor([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
])

export type EntitlementTenantFulfillmentStatusResponse = z.infer<
  typeof EntitlementTenantFulfillmentStatusResponseSchema
>

export const EntitlementResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  sku_id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  deleted: z.boolean(),
  starts_at: z.iso.datetime({ offset: true }).nullable(),
  ends_at: z.iso.datetime({ offset: true }).nullable(),
  type: EntitlementTypesSchema,
  fulfilled_at: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  fulfillment_status: z
    .xor([z.null().nullable(), EntitlementTenantFulfillmentStatusResponseSchema])
    .exactOptional(),
  consumed: z.boolean().exactOptional(),
  gifter_user_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
})

export type EntitlementResponse = z.infer<typeof EntitlementResponseSchema>

export const EntityMetadataExternalSchema = z.object({ location: z.string().max(100) })

export type EntityMetadataExternal = z.infer<typeof EntityMetadataExternalSchema>

export const EntityMetadataExternalResponseSchema = z.object({
  location: z.string().meta({ description: 'Location of the external event' }),
})

export type EntityMetadataExternalResponse = z.infer<typeof EntityMetadataExternalResponseSchema>

export const EntityMetadataStageInstanceSchema = z.object({})

export type EntityMetadataStageInstance = z.infer<typeof EntityMetadataStageInstanceSchema>

export const EntityMetadataStageInstanceResponseSchema = z.object({})

export type EntityMetadataStageInstanceResponse = z.infer<
  typeof EntityMetadataStageInstanceResponseSchema
>

export const EntityMetadataVoiceSchema = z.object({})

export type EntityMetadataVoice = z.infer<typeof EntityMetadataVoiceSchema>

export const EntityMetadataVoiceResponseSchema = z.object({})

export type EntityMetadataVoiceResponse = z.infer<typeof EntityMetadataVoiceResponseSchema>

export const IntegrationExpireBehaviorTypesSchema = z.xor([
  z.literal(0).meta({ description: 'Remove role' }),
  z.literal(1).meta({ description: 'Kick' }),
])

export type IntegrationExpireBehaviorTypes = z.infer<typeof IntegrationExpireBehaviorTypesSchema>

export const IntegrationExpireGracePeriodTypesSchema = z.xor([
  z.literal(1).meta({ description: '1 day' }),
  z.literal(3).meta({ description: '3 days' }),
  z.literal(7).meta({ description: '7 days' }),
  z.literal(14).meta({ description: '14 days' }),
  z.literal(30).meta({ description: '30 days' }),
])

export type IntegrationExpireGracePeriodTypes = z.infer<
  typeof IntegrationExpireGracePeriodTypesSchema
>

export const ExternalConnectionIntegrationResponseSchema = z.object({
  type: IntegrationTypesSchema,
  name: z.string().nullable(),
  account: AccountResponseSchema,
  enabled: z.boolean(),
  id: z.string(),
  user: UserResponseSchema,
  revoked: z.boolean().exactOptional(),
  expire_behavior: IntegrationExpireBehaviorTypesSchema.exactOptional(),
  expire_grace_period: IntegrationExpireGracePeriodTypesSchema.exactOptional(),
  subscriber_count: z.int32().exactOptional(),
  synced_at: z.iso.datetime({ offset: true }).exactOptional(),
  role_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  syncing: z.boolean().exactOptional(),
  enable_emoticons: z.boolean().exactOptional(),
})

export type ExternalConnectionIntegrationResponse = z.infer<
  typeof ExternalConnectionIntegrationResponseSchema
>

export const GuildScheduledEventPrivacyLevelsSchema = z.xor([
  z.literal(2).meta({ description: 'the scheduled event is only accessible to guild members' }),
])

export type GuildScheduledEventPrivacyLevels = z.infer<
  typeof GuildScheduledEventPrivacyLevelsSchema
>

export const GuildScheduledEventEntityTypesSchema = z.xor([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
])

export type GuildScheduledEventEntityTypes = z.infer<typeof GuildScheduledEventEntityTypesSchema>

export const RecurrenceRuleFrequenciesSchema = z.xor([
  z.literal(3),
  z.literal(2),
  z.literal(1),
  z.literal(0),
])

export type RecurrenceRuleFrequencies = z.infer<typeof RecurrenceRuleFrequenciesSchema>

export const RecurrenceRuleMonthsSchema = z.xor([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
  z.literal(9),
  z.literal(10),
  z.literal(11),
  z.literal(12),
])

export type RecurrenceRuleMonths = z.infer<typeof RecurrenceRuleMonthsSchema>

export const RecurrenceRuleSchema = z.object({
  start: z.iso
    .datetime({ offset: true })
    .meta({ description: 'Starting time of the recurrence interval' }),
  end: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'Ending time of the recurrence interval' })
    .exactOptional(),
  frequency: RecurrenceRuleFrequenciesSchema.meta({ description: 'How often the event occurs' }),
  interval: z
    .int32()
    .nullable()
    .meta({ description: 'The spacing between events, defined by frequency' })
    .exactOptional(),
  by_weekday: z
    .array(RecurrenceRuleWeekdaysSchema)
    .max(7)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .meta({ description: 'Set of specific days within a week for the event to recur on' })
    .exactOptional(),
  by_n_weekday: z
    .array(ByNWeekdaySchema)
    .max(7)
    .nullable()
    .meta({ description: 'List of specific days within a specific week to recur on' })
    .exactOptional(),
  by_month: z
    .array(RecurrenceRuleMonthsSchema)
    .max(12)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .meta({ description: 'Set of specific months to recur on' })
    .exactOptional(),
  by_month_day: z
    .array(z.int32().min(-1).max(31))
    .max(33)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .meta({ description: 'Set of specific dates within a month to recur on' })
    .exactOptional(),
  by_year_day: z
    .array(z.int32().min(-1).max(365))
    .max(367)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .meta({ description: 'Set of days within a year to recur on (1-364)' })
    .exactOptional(),
  count: z
    .int32()
    .nullable()
    .meta({ description: 'Total number of times the event is allowed to recur' })
    .exactOptional(),
})

export type RecurrenceRule = z.infer<typeof RecurrenceRuleSchema>

export const ExternalScheduledEventCreateRequestSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(1000).nullable().exactOptional(),
  image: z.string().nullable().exactOptional(),
  scheduled_start_time: z.iso.datetime({ offset: true }),
  scheduled_end_time: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  recurrence_rule: z
    .xor([z.null().nullable(), RecurrenceRuleSchema])
    .meta({ description: 'Recurrence rule for the scheduled event' })
    .exactOptional(),
  entity_metadata: EntityMetadataExternalSchema,
})

export type ExternalScheduledEventCreateRequest = z.infer<
  typeof ExternalScheduledEventCreateRequestSchema
>

export const GuildScheduledEventStatusesSchema = z.xor([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
])

export type GuildScheduledEventStatuses = z.infer<typeof GuildScheduledEventStatusesSchema>

export const ExternalScheduledEventPatchRequestPartialSchema = z.object({
  status: z.xor([z.null().nullable(), GuildScheduledEventStatusesSchema]).exactOptional(),
  name: z.string().max(100).exactOptional(),
  description: z.string().max(1000).nullable().exactOptional(),
  image: z.string().nullable().exactOptional(),
  scheduled_start_time: z.iso.datetime({ offset: true }).exactOptional(),
  scheduled_end_time: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  entity_type: z.xor([z.null().nullable(), GuildScheduledEventEntityTypesSchema]).exactOptional(),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.exactOptional(),
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  recurrence_rule: z
    .xor([z.null().nullable(), RecurrenceRuleSchema])
    .meta({ description: 'Recurrence rule for the scheduled event' })
    .exactOptional(),
  entity_metadata: EntityMetadataExternalSchema.exactOptional(),
})

export type ExternalScheduledEventPatchRequestPartial = z.infer<
  typeof ExternalScheduledEventPatchRequestPartialSchema
>

export const RecurrenceRuleResponseSchema = z.object({
  start: z.iso
    .datetime({ offset: true })
    .meta({ description: 'Starting time of the recurrence interval' }),
  end: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'Ending time of the recurrence interval' })
    .exactOptional(),
  frequency: RecurrenceRuleFrequenciesSchema.meta({ description: 'How often the event occurs' }),
  interval: z.int32().meta({ description: 'The spacing between events, defined by frequency' }),
  by_weekday: z
    .array(RecurrenceRuleWeekdaysSchema)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .meta({ description: 'Set of specific days within a week for the event to recur on' }),
  by_n_weekday: z
    .array(ByNWeekdayResponseSchema)
    .nullable()
    .meta({ description: 'List of specific days within a specific week to recur on' }),
  by_month: z
    .array(RecurrenceRuleMonthsSchema)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .meta({ description: 'Set of specific months to recur on' }),
  by_month_day: z
    .array(z.int32())
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .meta({ description: 'Set of specific dates within a month to recur on' }),
  by_year_day: z
    .array(z.int32())
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .meta({ description: 'Set of days within a year to recur on (1-364)' })
    .exactOptional(),
  count: z
    .int32()
    .nullable()
    .meta({ description: 'Total number of times the event is allowed to recur' })
    .exactOptional(),
})

export type RecurrenceRuleResponse = z.infer<typeof RecurrenceRuleResponseSchema>

export const GuildScheduledEventUserResponsesSchema = z.xor([
  z.literal(0).meta({ description: 'User is not interested in the event' }),
  z.literal(1).meta({ description: 'User is interested in the event' }),
])

export type GuildScheduledEventUserResponses = z.infer<
  typeof GuildScheduledEventUserResponsesSchema
>

export const ScheduledEventUserResponseSchema = z.object({
  guild_scheduled_event_id: SnowflakeTypeSchema.meta({ description: 'ID of the scheduled event' }),
  guild_scheduled_event_exception_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: 'ID of the scheduled event exception' })
    .exactOptional(),
  user_id: SnowflakeTypeSchema.meta({ description: 'ID of the user' }),
  user: UserResponseSchema.meta({ description: 'User object for the RSVP user' }).exactOptional(),
  member: GuildMemberResponseSchema.meta({
    description: 'Guild member object for the RSVP user',
  }).exactOptional(),
  response: GuildScheduledEventUserResponsesSchema.meta({
    description: "User's RSVP status for the event",
  }),
})

export type ScheduledEventUserResponse = z.infer<typeof ScheduledEventUserResponseSchema>

export const GuildScheduledEventExceptionResponseSchema = z.object({
  event_id: SnowflakeTypeSchema.meta({
    description: 'ID of the scheduled event this exception belongs to',
  }),
  event_exception_id: SnowflakeTypeSchema.meta({ description: 'ID of the event exception' }),
  scheduled_start_time: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'Overridden start time of this occurrence' }),
  scheduled_end_time: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'Overridden end time of this occurrence' }),
  is_canceled: z.boolean().meta({ description: 'Whether this occurrence is canceled' }),
})

export type GuildScheduledEventExceptionResponse = z.infer<
  typeof GuildScheduledEventExceptionResponseSchema
>

export const ExternalScheduledEventResponseSchema = z.object({
  id: SnowflakeTypeSchema.meta({ description: 'ID of the scheduled event' }),
  guild_id: SnowflakeTypeSchema.meta({
    description: 'ID of the guild the scheduled event belongs to',
  }),
  name: z.string().meta({ description: 'Name of the scheduled event' }),
  description: z.string().nullable().meta({ description: 'Description of the scheduled event' }),
  channel_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({
      description:
        'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    }),
  creator_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: 'ID of the user that created the scheduled event' }),
  creator: UserResponseSchema.meta({
    description: 'User that created the scheduled event',
  }).exactOptional(),
  image: z.string().nullable().meta({ description: 'Cover image hash of the scheduled event' }),
  scheduled_start_time: z.iso
    .datetime({ offset: true })
    .meta({ description: 'When the scheduled event will start' }),
  scheduled_end_time: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'When the scheduled event will end, or null if no end time' }),
  status: GuildScheduledEventStatusesSchema.meta({ description: 'Status of the scheduled event' }),
  entity_type: GuildScheduledEventEntityTypesSchema.meta({
    description: 'Type of hosting entity associated with the scheduled event',
  }),
  entity_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: 'ID of the hosting entity associated with the scheduled event' }),
  recurrence_rule: z
    .xor([z.null().nullable(), RecurrenceRuleResponseSchema])
    .meta({ description: 'Recurrence rule for the scheduled event, or null if not recurring' }),
  user_count: z
    .int32()
    .meta({ description: 'Number of users subscribed to the scheduled event' })
    .exactOptional(),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.meta({
    description: 'Privacy level of the scheduled event',
  }),
  user_rsvp: z.xor([z.null().nullable(), ScheduledEventUserResponseSchema]).exactOptional(),
  guild_scheduled_event_exceptions: z.array(GuildScheduledEventExceptionResponseSchema),
  entity_metadata: EntityMetadataExternalResponseSchema,
})

export type ExternalScheduledEventResponse = z.infer<typeof ExternalScheduledEventResponseSchema>

export const FileUploadComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  min_values: z.int().min(0).max(10).nullable().exactOptional(),
  max_values: z.int().min(1).max(10).nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  file_types: z
    .array(z.string().min(1).max(16))
    .max(10)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
})

export type FileUploadComponentForModalRequest = z.infer<
  typeof FileUploadComponentForModalRequestSchema
>

export const InviteTypesSchema = z.xor([z.literal(0), z.literal(1), z.literal(2)])

export type InviteTypes = z.infer<typeof InviteTypesSchema>

export const InviteChannelRecipientResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  username: z.string(),
  avatar: z.string().nullable(),
})

export type InviteChannelRecipientResponse = z.infer<typeof InviteChannelRecipientResponseSchema>

export const InviteChannelResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  name: z.string().nullable(),
  icon: z.string().exactOptional(),
  nsfw: z.boolean().exactOptional(),
  recipients: z.array(InviteChannelRecipientResponseSchema).exactOptional(),
})

export type InviteChannelResponse = z.infer<typeof InviteChannelResponseSchema>

export const FriendInviteResponseSchema = z.object({
  type: InviteTypesSchema,
  code: z.string(),
  inviter: UserResponseSchema.exactOptional(),
  max_age: z.int32().exactOptional(),
  created_at: z.iso.datetime({ offset: true }).exactOptional(),
  expires_at: z.iso.datetime({ offset: true }).nullable(),
  friends_count: z.int32().exactOptional(),
  channel: z.xor([z.null().nullable(), InviteChannelResponseSchema]),
  is_contact: z.boolean().exactOptional(),
  uses: z.int32().exactOptional(),
  max_uses: z.int32().exactOptional(),
  flags: z.int32().exactOptional(),
})

export type FriendInviteResponse = z.infer<typeof FriendInviteResponseSchema>

export const GatewayBotSessionStartLimitResponseSchema = z.object({
  max_concurrency: z.int32(),
  remaining: z.int32(),
  reset_after: z.int32(),
  total: z.int32(),
})

export type GatewayBotSessionStartLimitResponse = z.infer<
  typeof GatewayBotSessionStartLimitResponseSchema
>

export const GatewayBotResponseSchema = z.object({
  url: z.url(),
  session_start_limit: GatewayBotSessionStartLimitResponseSchema,
  shards: z.int32(),
})

export type GatewayBotResponse = z.infer<typeof GatewayBotResponseSchema>

export const GatewayResponseSchema = z.object({ url: z.url() })

export type GatewayResponse = z.infer<typeof GatewayResponseSchema>

export const GithubAuthorSchema = z.object({
  username: z.string().max(152133).nullable().exactOptional(),
  name: z.string().max(152133),
})

export type GithubAuthor = z.infer<typeof GithubAuthorSchema>

export const GithubCheckAppSchema = z.object({ name: z.string().max(152133) })

export type GithubCheckApp = z.infer<typeof GithubCheckAppSchema>

export const GithubCheckPullRequestSchema = z.object({ number: z.int() })

export type GithubCheckPullRequest = z.infer<typeof GithubCheckPullRequestSchema>

export const GithubCheckSuiteSchema = z.object({
  conclusion: z.string().max(152133).nullable().exactOptional(),
  head_branch: z.string().max(152133).nullable().exactOptional(),
  head_sha: z.string().max(152133),
  pull_requests: z.array(GithubCheckPullRequestSchema).max(1521).nullable().exactOptional(),
  app: GithubCheckAppSchema,
})

export type GithubCheckSuite = z.infer<typeof GithubCheckSuiteSchema>

export const GithubCheckRunOutputSchema = z.object({
  title: z.string().max(152133).nullable().exactOptional(),
  summary: z.string().max(152133).nullable().exactOptional(),
})

export type GithubCheckRunOutput = z.infer<typeof GithubCheckRunOutputSchema>

export const GithubCheckRunSchema = z.object({
  conclusion: z.string().max(152133).nullable().exactOptional(),
  name: z.string().max(152133),
  html_url: z.url().max(2048),
  check_suite: GithubCheckSuiteSchema,
  details_url: z.url().max(2048).nullable().exactOptional(),
  output: z.xor([z.null().nullable(), GithubCheckRunOutputSchema]).exactOptional(),
  pull_requests: z.array(GithubCheckPullRequestSchema).max(1521).nullable().exactOptional(),
})

export type GithubCheckRun = z.infer<typeof GithubCheckRunSchema>

export const GithubUserSchema = z.object({
  id: z.int(),
  login: z.string().max(152133),
  html_url: z.url().max(2048),
  avatar_url: z.url().max(2048),
})

export type GithubUser = z.infer<typeof GithubUserSchema>

export const GithubCommentSchema = z.object({
  id: z.int(),
  html_url: z.url().max(2048),
  user: GithubUserSchema,
  commit_id: z.string().max(152133).nullable().exactOptional(),
  body: z.string().max(152133),
})

export type GithubComment = z.infer<typeof GithubCommentSchema>

export const GithubCommitSchema = z.object({
  id: z.string().max(152133),
  url: z.url().max(2048),
  message: z.string().max(152133),
  author: GithubAuthorSchema,
})

export type GithubCommit = z.infer<typeof GithubCommitSchema>

export const GithubDiscussionSchema = z.object({
  title: z.string().max(152133),
  number: z.int(),
  html_url: z.url().max(2048),
  answer_html_url: z.url().max(2048).nullable().exactOptional(),
  body: z.string().max(152133).nullable().exactOptional(),
  user: GithubUserSchema,
})

export type GithubDiscussion = z.infer<typeof GithubDiscussionSchema>

export const GithubIssueSchema = z.object({
  id: z.int(),
  number: z.int(),
  html_url: z.url().max(2048),
  user: GithubUserSchema,
  title: z.string().max(152133),
  body: z.string().max(152133).nullable().exactOptional(),
  pull_request: z.any().exactOptional(),
})

export type GithubIssue = z.infer<typeof GithubIssueSchema>

export const GithubReleaseSchema = z.object({
  id: z.int(),
  tag_name: z.string().max(152133),
  html_url: z.url().max(2048),
  author: GithubUserSchema,
})

export type GithubRelease = z.infer<typeof GithubReleaseSchema>

export const GithubRepositorySchema = z.object({
  id: z.int(),
  html_url: z.url().max(2048),
  name: z.string().max(152133),
  full_name: z.string().max(152133),
})

export type GithubRepository = z.infer<typeof GithubRepositorySchema>

export const GithubReviewSchema = z.object({
  user: GithubUserSchema,
  body: z.string().max(152133).nullable().exactOptional(),
  html_url: z.url().max(2048),
  state: z.string().max(152133),
})

export type GithubReview = z.infer<typeof GithubReviewSchema>

export const GithubWebhookSchema = z.object({
  action: z.string().max(152133).nullable().exactOptional(),
  ref: z.string().max(152133).nullable().exactOptional(),
  ref_type: z.string().max(152133).nullable().exactOptional(),
  comment: z.xor([z.null().nullable(), GithubCommentSchema]).exactOptional(),
  issue: z.xor([z.null().nullable(), GithubIssueSchema]).exactOptional(),
  pull_request: z.xor([z.null().nullable(), GithubIssueSchema]).exactOptional(),
  repository: z.xor([z.null().nullable(), GithubRepositorySchema]).exactOptional(),
  forkee: z.xor([z.null().nullable(), GithubRepositorySchema]).exactOptional(),
  sender: GithubUserSchema,
  member: z.xor([z.null().nullable(), GithubUserSchema]).exactOptional(),
  release: z.xor([z.null().nullable(), GithubReleaseSchema]).exactOptional(),
  head_commit: z.xor([z.null().nullable(), GithubCommitSchema]).exactOptional(),
  commits: z.array(GithubCommitSchema).max(1521).nullable().exactOptional(),
  forced: z.boolean().nullable().exactOptional(),
  compare: z.url().max(2048).nullable().exactOptional(),
  review: z.xor([z.null().nullable(), GithubReviewSchema]).exactOptional(),
  check_run: z.xor([z.null().nullable(), GithubCheckRunSchema]).exactOptional(),
  check_suite: z.xor([z.null().nullable(), GithubCheckSuiteSchema]).exactOptional(),
  discussion: z.xor([z.null().nullable(), GithubDiscussionSchema]).exactOptional(),
  answer: z.xor([z.null().nullable(), GithubCommentSchema]).exactOptional(),
})

export type GithubWebhook = z.infer<typeof GithubWebhookSchema>

export const GroupDMInviteResponseSchema = z.object({
  type: InviteTypesSchema,
  code: z.string(),
  inviter: UserResponseSchema.exactOptional(),
  max_age: z.int32().exactOptional(),
  created_at: z.iso.datetime({ offset: true }).exactOptional(),
  expires_at: z.iso.datetime({ offset: true }).nullable(),
  channel: InviteChannelResponseSchema,
  approximate_member_count: z.int32().nullable().exactOptional(),
})

export type GroupDMInviteResponse = z.infer<typeof GroupDMInviteResponseSchema>

export const PartialDiscordIntegrationResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: z.string().nullable(),
  account: AccountResponseSchema,
  application_id: SnowflakeTypeSchema,
})

export type PartialDiscordIntegrationResponse = z.infer<
  typeof PartialDiscordIntegrationResponseSchema
>

export const PartialExternalConnectionIntegrationResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: z.string().nullable(),
  account: AccountResponseSchema,
})

export type PartialExternalConnectionIntegrationResponse = z.infer<
  typeof PartialExternalConnectionIntegrationResponseSchema
>

export const PartialGuildSubscriptionIntegrationResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: z.string().nullable(),
  account: AccountResponseSchema,
})

export type PartialGuildSubscriptionIntegrationResponse = z.infer<
  typeof PartialGuildSubscriptionIntegrationResponseSchema
>

export const GuildIncomingWebhookResponseSchema = z.object({
  application_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  avatar: z.string().nullable(),
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  id: SnowflakeTypeSchema,
  name: z.string(),
  type: WebhookTypesSchema,
  user: UserResponseSchema.exactOptional(),
  token: z.string().exactOptional(),
  url: z.url().exactOptional(),
})

export type GuildIncomingWebhookResponse = z.infer<typeof GuildIncomingWebhookResponseSchema>

export const StageScheduledEventResponseSchema = z.object({
  id: SnowflakeTypeSchema.meta({ description: 'ID of the scheduled event' }),
  guild_id: SnowflakeTypeSchema.meta({
    description: 'ID of the guild the scheduled event belongs to',
  }),
  name: z.string().meta({ description: 'Name of the scheduled event' }),
  description: z.string().nullable().meta({ description: 'Description of the scheduled event' }),
  channel_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({
      description:
        'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    }),
  creator_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: 'ID of the user that created the scheduled event' }),
  creator: UserResponseSchema.meta({
    description: 'User that created the scheduled event',
  }).exactOptional(),
  image: z.string().nullable().meta({ description: 'Cover image hash of the scheduled event' }),
  scheduled_start_time: z.iso
    .datetime({ offset: true })
    .meta({ description: 'When the scheduled event will start' }),
  scheduled_end_time: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'When the scheduled event will end, or null if no end time' }),
  status: GuildScheduledEventStatusesSchema.meta({ description: 'Status of the scheduled event' }),
  entity_type: GuildScheduledEventEntityTypesSchema.meta({
    description: 'Type of hosting entity associated with the scheduled event',
  }),
  entity_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: 'ID of the hosting entity associated with the scheduled event' }),
  recurrence_rule: z
    .xor([z.null().nullable(), RecurrenceRuleResponseSchema])
    .meta({ description: 'Recurrence rule for the scheduled event, or null if not recurring' }),
  user_count: z
    .int32()
    .meta({ description: 'Number of users subscribed to the scheduled event' })
    .exactOptional(),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.meta({
    description: 'Privacy level of the scheduled event',
  }),
  user_rsvp: z.xor([z.null().nullable(), ScheduledEventUserResponseSchema]).exactOptional(),
  guild_scheduled_event_exceptions: z.array(GuildScheduledEventExceptionResponseSchema),
  entity_metadata: z.xor([z.null().nullable(), EntityMetadataStageInstanceResponseSchema]),
})

export type StageScheduledEventResponse = z.infer<typeof StageScheduledEventResponseSchema>

export const VoiceScheduledEventResponseSchema = z.object({
  id: SnowflakeTypeSchema.meta({ description: 'ID of the scheduled event' }),
  guild_id: SnowflakeTypeSchema.meta({
    description: 'ID of the guild the scheduled event belongs to',
  }),
  name: z.string().meta({ description: 'Name of the scheduled event' }),
  description: z.string().nullable().meta({ description: 'Description of the scheduled event' }),
  channel_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({
      description:
        'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    }),
  creator_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: 'ID of the user that created the scheduled event' }),
  creator: UserResponseSchema.meta({
    description: 'User that created the scheduled event',
  }).exactOptional(),
  image: z.string().nullable().meta({ description: 'Cover image hash of the scheduled event' }),
  scheduled_start_time: z.iso
    .datetime({ offset: true })
    .meta({ description: 'When the scheduled event will start' }),
  scheduled_end_time: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'When the scheduled event will end, or null if no end time' }),
  status: GuildScheduledEventStatusesSchema.meta({ description: 'Status of the scheduled event' }),
  entity_type: GuildScheduledEventEntityTypesSchema.meta({
    description: 'Type of hosting entity associated with the scheduled event',
  }),
  entity_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: 'ID of the hosting entity associated with the scheduled event' }),
  recurrence_rule: z
    .xor([z.null().nullable(), RecurrenceRuleResponseSchema])
    .meta({ description: 'Recurrence rule for the scheduled event, or null if not recurring' }),
  user_count: z
    .int32()
    .meta({ description: 'Number of users subscribed to the scheduled event' })
    .exactOptional(),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.meta({
    description: 'Privacy level of the scheduled event',
  }),
  user_rsvp: z.xor([z.null().nullable(), ScheduledEventUserResponseSchema]).exactOptional(),
  guild_scheduled_event_exceptions: z.array(GuildScheduledEventExceptionResponseSchema),
  entity_metadata: z.xor([z.null().nullable(), EntityMetadataVoiceResponseSchema]),
})

export type VoiceScheduledEventResponse = z.infer<typeof VoiceScheduledEventResponseSchema>

export const KeywordTriggerMetadataResponseSchema = z.object({
  keyword_filter: z.array(z.string()),
  regex_patterns: z.array(z.string()),
  allow_list: z.array(z.string()),
})

export type KeywordTriggerMetadataResponse = z.infer<typeof KeywordTriggerMetadataResponseSchema>

export const KeywordRuleResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: z.string(),
  event_type: AutomodEventTypeSchema,
  actions: z.array(
    z.xor([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: z.boolean(),
  exempt_roles: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  exempt_channels: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  trigger_metadata: KeywordTriggerMetadataResponseSchema,
})

export type KeywordRuleResponse = z.infer<typeof KeywordRuleResponseSchema>

export const MLSpamTriggerMetadataResponseSchema = z.object({})

export type MLSpamTriggerMetadataResponse = z.infer<typeof MLSpamTriggerMetadataResponseSchema>

export const MLSpamRuleResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: z.string(),
  event_type: AutomodEventTypeSchema,
  actions: z.array(
    z.xor([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: z.boolean(),
  exempt_roles: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  exempt_channels: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  trigger_metadata: MLSpamTriggerMetadataResponseSchema,
})

export type MLSpamRuleResponse = z.infer<typeof MLSpamRuleResponseSchema>

export const MentionSpamTriggerMetadataResponseSchema = z.object({
  mention_total_limit: z.int32(),
  mention_raid_protection_enabled: z.boolean(),
})

export type MentionSpamTriggerMetadataResponse = z.infer<
  typeof MentionSpamTriggerMetadataResponseSchema
>

export const MentionSpamRuleResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: z.string(),
  event_type: AutomodEventTypeSchema,
  actions: z.array(
    z.xor([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: z.boolean(),
  exempt_roles: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  exempt_channels: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  trigger_metadata: MentionSpamTriggerMetadataResponseSchema,
})

export type MentionSpamRuleResponse = z.infer<typeof MentionSpamRuleResponseSchema>

export const UserProfileMetadataResponseSchema = z.object({
  keyword_filter: z.array(z.string()),
  regex_patterns: z.array(z.string()),
  allow_list: z.array(z.string()),
})

export type UserProfileMetadataResponse = z.infer<typeof UserProfileMetadataResponseSchema>

export const UserProfileRuleResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: z.string(),
  event_type: AutomodEventTypeSchema,
  actions: z.array(
    z.xor([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: z.boolean(),
  exempt_roles: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  exempt_channels: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  trigger_metadata: UserProfileMetadataResponseSchema,
})

export type UserProfileRuleResponse = z.infer<typeof UserProfileRuleResponseSchema>

export const GuildAuditLogResponseSchema = z.object({
  audit_log_entries: z.array(AuditLogEntryResponseSchema),
  users: z.array(UserResponseSchema),
  integrations: z.array(
    z.xor([
      PartialDiscordIntegrationResponseSchema,
      PartialExternalConnectionIntegrationResponseSchema,
      PartialGuildSubscriptionIntegrationResponseSchema,
    ]),
  ),
  webhooks: z.array(
    z.xor([
      ApplicationIncomingWebhookResponseSchema,
      ChannelFollowerWebhookResponseSchema,
      GuildIncomingWebhookResponseSchema,
    ]),
  ),
  guild_scheduled_events: z.array(
    z.xor([
      ExternalScheduledEventResponseSchema,
      StageScheduledEventResponseSchema,
      VoiceScheduledEventResponseSchema,
    ]),
  ),
  threads: z.array(ThreadResponseSchema),
  application_commands: z.array(ApplicationCommandResponseSchema),
  auto_moderation_rules: z.array(
    z.xor([
      DefaultKeywordRuleResponseSchema,
      KeywordRuleResponseSchema,
      MLSpamRuleResponseSchema,
      MentionSpamRuleResponseSchema,
      UserProfileRuleResponseSchema,
      z.null().nullable(),
    ]),
  ),
})

export type GuildAuditLogResponse = z.infer<typeof GuildAuditLogResponseSchema>

export const GuildBanResponseSchema = z.object({
  user: UserResponseSchema,
  reason: z.string().nullable(),
})

export type GuildBanResponse = z.infer<typeof GuildBanResponseSchema>

export const GuildExplicitContentFilterTypesSchema = z.xor([
  z.literal(0).meta({ description: 'media content will not be scanned' }),
  z.literal(1).meta({ description: 'media content sent by members without roles will be scanned' }),
  z.literal(2).meta({ description: 'media content sent by all members will be scanned' }),
])

export type GuildExplicitContentFilterTypes = z.infer<typeof GuildExplicitContentFilterTypesSchema>

export const GuildFeaturesSchema = z.xor([
  z
    .literal('ANIMATED_BANNER')
    .meta({ description: 'guild has access to set an animated guild banner image' }),
  z
    .literal('ANIMATED_ICON')
    .meta({ description: 'guild has access to set an animated guild icon' }),
  z
    .literal('APPLICATION_COMMAND_PERMISSIONS_V2')
    .meta({ description: 'guild is using the old permissions configuration behavior' }),
  z.literal('AUTO_MODERATION').meta({ description: 'guild has set up auto moderation rules' }),
  z.literal('BANNER').meta({ description: 'guild has access to set a guild banner image' }),
  z
    .literal('COMMUNITY')
    .meta({
      description:
        'guild can enable welcome screen, Membership Screening, stage channels and discovery, and             receives community updates',
    }),
  z
    .literal('CREATOR_MONETIZABLE_PROVISIONAL')
    .meta({ description: 'guild has enabled monetization' }),
  z
    .literal('CREATOR_STORE_PAGE')
    .meta({ description: 'guild has enabled the role subscription promo page' }),
  z
    .literal('DEVELOPER_SUPPORT_SERVER')
    .meta({ description: 'guild has been set as a support server on the App Directory' }),
  z
    .literal('DISCOVERABLE')
    .meta({ description: 'guild is able to be discovered in the directory' }),
  z.literal('FEATURABLE').meta({ description: 'guild is able to be featured in the directory' }),
  z
    .literal('INVITES_DISABLED')
    .meta({ description: 'guild has paused invites, preventing new users from joining' }),
  z
    .literal('INVITE_SPLASH')
    .meta({ description: 'guild has access to set an invite splash background' }),
  z
    .literal('MEMBER_VERIFICATION_GATE_ENABLED')
    .meta({ description: 'guild has enabled Membership Screening' }),
  z.literal('MORE_STICKERS').meta({ description: 'guild has increased custom sticker slots' }),
  z.literal('NEWS').meta({ description: 'guild has access to create announcement channels' }),
  z.literal('PARTNERED').meta({ description: 'guild is partnered' }),
  z
    .literal('PREVIEW_ENABLED')
    .meta({
      description:
        'guild can be previewed before joining via Membership Screening or the directory',
    }),
  z
    .literal('RAID_ALERTS_DISABLED')
    .meta({
      description: 'guild has disabled activity alerts in the configured safety alerts channel',
    }),
  z
    .literal('PRUNE_REQUIRES_ADMIN')
    .meta({
      description: 'guild has restricted member prune to administrators and the guild owner',
    }),
  z.literal('ROLE_ICONS').meta({ description: 'guild is able to set role icons' }),
  z
    .literal('ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE')
    .meta({ description: 'guild has role subscriptions that can be purchased' }),
  z
    .literal('ROLE_SUBSCRIPTIONS_ENABLED')
    .meta({ description: 'guild has enabled role subscriptions' }),
  z.literal('TICKETED_EVENTS_ENABLED').meta({ description: 'guild has enabled ticketed events' }),
  z.literal('VANITY_URL').meta({ description: 'guild has access to set a vanity URL' }),
  z.literal('VERIFIED').meta({ description: 'guild is verified' }),
  z
    .literal('VIP_REGIONS')
    .meta({
      description:
        'guild has access to set 384kbps bitrate in voice (previously VIP voice servers)',
    }),
  z.literal('WELCOME_SCREEN_ENABLED').meta({ description: 'guild has enabled the welcome screen' }),
  z
    .literal('OFFICIAL_GAME_GUILD')
    .meta({ description: 'guild is an official guild for one or more games' }),
])

export type GuildFeatures = z.infer<typeof GuildFeaturesSchema>

export const WelcomeMessageResponseSchema = z.object({
  author_ids: z.array(SnowflakeTypeSchema),
  message: z.string(),
})

export type WelcomeMessageResponse = z.infer<typeof WelcomeMessageResponseSchema>

export const NewMemberActionTypeSchema = z.xor([z.literal(0), z.literal(1)])

export type NewMemberActionType = z.infer<typeof NewMemberActionTypeSchema>

export const SettingsEmojiResponseSchema = z.object({
  id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  name: z.string().nullable(),
  animated: z.boolean(),
})

export type SettingsEmojiResponse = z.infer<typeof SettingsEmojiResponseSchema>

export const NewMemberActionResponseSchema = z.object({
  channel_id: SnowflakeTypeSchema,
  action_type: NewMemberActionTypeSchema,
  title: z.string(),
  description: z.string(),
  emoji: SettingsEmojiResponseSchema.exactOptional(),
  icon: z.string().exactOptional(),
})

export type NewMemberActionResponse = z.infer<typeof NewMemberActionResponseSchema>

export const ResourceChannelResponseSchema = z.object({
  channel_id: SnowflakeTypeSchema,
  title: z.string(),
  emoji: SettingsEmojiResponseSchema.exactOptional(),
  icon: z.string().exactOptional(),
  description: z.string(),
})

export type ResourceChannelResponse = z.infer<typeof ResourceChannelResponseSchema>

export const GuildHomeSettingsResponseSchema = z.object({
  guild_id: SnowflakeTypeSchema,
  enabled: z.boolean(),
  welcome_message: WelcomeMessageResponseSchema.exactOptional(),
  new_member_actions: z.array(NewMemberActionResponseSchema),
  resource_channels: z.array(ResourceChannelResponseSchema),
})

export type GuildHomeSettingsResponse = z.infer<typeof GuildHomeSettingsResponseSchema>

export const GuildIncidentActionsRequestSchema = z.object({
  invites_disabled_until: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'When invites will be enabled again' })
    .exactOptional(),
  dms_disabled_until: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'When direct messages will be enabled again' })
    .exactOptional(),
})

export type GuildIncidentActionsRequest = z.infer<typeof GuildIncidentActionsRequestSchema>

export const GuildIncidentsDataResponseSchema = z.object({
  invites_disabled_until: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'When invites get enabled again' }),
  dms_disabled_until: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'When direct messages get enabled again' }),
})

export type GuildIncidentsDataResponse = z.infer<typeof GuildIncidentsDataResponseSchema>

export const VerificationLevelsSchema = z.xor([
  z.literal(0).meta({ description: 'unrestricted' }),
  z.literal(1).meta({ description: 'must have verified email on account' }),
  z.literal(2).meta({ description: 'must be registered on Discord for longer than 5 minutes' }),
  z.literal(3).meta({ description: 'must be a member of the server for longer than 10 minutes' }),
  z.literal(4).meta({ description: 'must have a verified phone number' }),
])

export type VerificationLevels = z.infer<typeof VerificationLevelsSchema>

export const GuildNSFWContentLevelSchema = z.xor([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
])

export type GuildNSFWContentLevel = z.infer<typeof GuildNSFWContentLevelSchema>

export const InviteGuildResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  splash: z.string().nullable(),
  banner: z.string().nullable(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  features: z.array(GuildFeaturesSchema).refine((val) => new Set(val).size === val.length),
  verification_level: z.xor([z.null().nullable(), VerificationLevelsSchema]),
  vanity_url_code: z.string().nullable(),
  nsfw_level: z.xor([z.null().nullable(), GuildNSFWContentLevelSchema]),
  nsfw: z.boolean().nullable(),
  premium_subscription_count: z.int32(),
})

export type InviteGuildResponse = z.infer<typeof InviteGuildResponseSchema>

export const InviteApplicationResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  icon: z.string().nullable(),
  description: z.string(),
  type: z.xor([z.null().nullable(), ApplicationTypesSchema]),
  cover_image: z.string().exactOptional(),
  primary_sku_id: SnowflakeTypeSchema.exactOptional(),
  flags: z.int32(),
  flags_new: z.string(),
  bot: UserResponseSchema.exactOptional(),
  slug: z.string().exactOptional(),
  conjure_project_id: SnowflakeTypeSchema.exactOptional(),
  vibegrations_project_id: SnowflakeTypeSchema.exactOptional(),
  guild_id: SnowflakeTypeSchema.exactOptional(),
  rpc_origins: z.array(z.string()).exactOptional(),
  bot_public: z.boolean().exactOptional(),
  bot_require_code_grant: z.boolean().exactOptional(),
  terms_of_service_url: z.url().exactOptional(),
  privacy_policy_url: z.url().exactOptional(),
  custom_install_url: z.url().exactOptional(),
  install_params: ApplicationOAuth2InstallParamsResponseSchema.exactOptional(),
  integration_types_config: z
    .record(z.string(), ApplicationIntegrationTypeConfigurationResponseSchema)
    .exactOptional(),
  verify_key: z.string(),
  max_participants: z.int32().nullable().exactOptional(),
  tags: z
    .array(z.string())
    .refine((val) => new Set(val).size === val.length)
    .exactOptional(),
})

export type InviteApplicationResponse = z.infer<typeof InviteApplicationResponseSchema>

export const ScheduledEventResponseSchema = z.object({
  id: SnowflakeTypeSchema.meta({ description: 'ID of the scheduled event' }),
  guild_id: SnowflakeTypeSchema.meta({
    description: 'ID of the guild the scheduled event belongs to',
  }),
  name: z.string().meta({ description: 'Name of the scheduled event' }),
  description: z.string().nullable().meta({ description: 'Description of the scheduled event' }),
  channel_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({
      description:
        'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    }),
  creator_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: 'ID of the user that created the scheduled event' }),
  creator: UserResponseSchema.meta({
    description: 'User that created the scheduled event',
  }).exactOptional(),
  image: z.string().nullable().meta({ description: 'Cover image hash of the scheduled event' }),
  scheduled_start_time: z.iso
    .datetime({ offset: true })
    .meta({ description: 'When the scheduled event will start' }),
  scheduled_end_time: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'When the scheduled event will end, or null if no end time' }),
  status: GuildScheduledEventStatusesSchema.meta({ description: 'Status of the scheduled event' }),
  entity_type: GuildScheduledEventEntityTypesSchema.meta({
    description: 'Type of hosting entity associated with the scheduled event',
  }),
  entity_id: z
    .xor([z.null().nullable(), SnowflakeTypeSchema])
    .meta({ description: 'ID of the hosting entity associated with the scheduled event' }),
  recurrence_rule: z
    .xor([z.null().nullable(), RecurrenceRuleResponseSchema])
    .meta({ description: 'Recurrence rule for the scheduled event, or null if not recurring' }),
  user_count: z
    .int32()
    .meta({ description: 'Number of users subscribed to the scheduled event' })
    .exactOptional(),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.meta({
    description: 'Privacy level of the scheduled event',
  }),
  user_rsvp: z.xor([z.null().nullable(), ScheduledEventUserResponseSchema]).exactOptional(),
  guild_scheduled_event_exceptions: z.array(GuildScheduledEventExceptionResponseSchema),
})

export type ScheduledEventResponse = z.infer<typeof ScheduledEventResponseSchema>

export const InviteGuildRoleResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  position: z.int32(),
  color: z.int32(),
  colors: GuildRoleColorsResponseSchema,
  icon: z.string().nullable(),
  unicode_emoji: z.string().nullable(),
  permissions: z.string().exactOptional(),
})

export type InviteGuildRoleResponse = z.infer<typeof InviteGuildRoleResponseSchema>

export const GuildInviteResponseSchema = z.object({
  type: InviteTypesSchema,
  code: z.string(),
  inviter: UserResponseSchema.exactOptional(),
  max_age: z.int32().exactOptional(),
  created_at: z.iso.datetime({ offset: true }).exactOptional(),
  expires_at: z.iso.datetime({ offset: true }).nullable(),
  is_contact: z.boolean().exactOptional(),
  flags: z.int32().exactOptional(),
  guild: InviteGuildResponseSchema,
  guild_id: SnowflakeTypeSchema,
  channel: InviteChannelResponseSchema,
  target_type: InviteTargetTypesSchema.exactOptional(),
  target_user: UserResponseSchema.exactOptional(),
  target_application: InviteApplicationResponseSchema.exactOptional(),
  guild_scheduled_event: ScheduledEventResponseSchema.exactOptional(),
  target_channel_id: SnowflakeTypeSchema.exactOptional(),
  target_message_id: SnowflakeTypeSchema.exactOptional(),
  uses: z.int32().exactOptional(),
  max_uses: z.int32().exactOptional(),
  temporary: z.boolean().exactOptional(),
  approximate_member_count: z.int32().nullable().exactOptional(),
  approximate_presence_count: z.int32().nullable().exactOptional(),
  is_nickname_changeable: z.boolean().exactOptional(),
  roles: z.array(InviteGuildRoleResponseSchema).nullable().exactOptional(),
})

export type GuildInviteResponse = z.infer<typeof GuildInviteResponseSchema>

export const GuildJoinRequestApplicationStatusSchema = z.xor([
  z
    .literal('STARTED')
    .meta({ description: 'Applicant started but not yet submitted join request' }),
  z
    .literal('SUBMITTED')
    .meta({ description: 'Applicant submitted join request that is awaiting review' }),
  z.literal('REJECTED').meta({ description: 'Join request rejected' }),
  z.literal('APPROVED').meta({ description: 'Join request approved' }),
])

export type GuildJoinRequestApplicationStatus = z.infer<
  typeof GuildJoinRequestApplicationStatusSchema
>

export const GuildMemberVerificationFormFieldTypeSchema = z.xor([
  z
    .literal('TERMS')
    .meta({ description: 'Field requiring applicant to acknowledge list of terms' }),
  z.literal('TEXT_INPUT').meta({ description: 'Short text input field' }),
  z.literal('PARAGRAPH').meta({ description: 'Long-form text input field' }),
  z
    .literal('MULTIPLE_CHOICE')
    .meta({ description: 'Field where applicant selects one of many options' }),
])

export type GuildMemberVerificationFormFieldType = z.infer<
  typeof GuildMemberVerificationFormFieldTypeSchema
>

export const MultipleChoiceFormFieldResponseSchema = z.object({
  field_type: GuildMemberVerificationFormFieldTypeSchema.meta({
    description: 'Type of form field',
  }),
  label: z.string().meta({ description: 'Label shown above field' }).exactOptional(),
  description: z
    .string()
    .meta({ description: 'Optional helper text shown below label' })
    .exactOptional(),
  required: z
    .boolean()
    .meta({ description: 'Whether applicant must fill in field' })
    .exactOptional(),
  choices: z.array(z.string()).meta({ description: 'Choices applicant can select from' }),
  response: z
    .int32()
    .meta({ description: 'Index of choice selected by applicant' })
    .exactOptional(),
})

export type MultipleChoiceFormFieldResponse = z.infer<typeof MultipleChoiceFormFieldResponseSchema>

export const ParagraphFormFieldResponseSchema = z.object({
  field_type: GuildMemberVerificationFormFieldTypeSchema.meta({
    description: 'Type of form field',
  }),
  label: z.string().meta({ description: 'Label shown above field' }).exactOptional(),
  description: z
    .string()
    .meta({ description: 'Optional helper text shown below label' })
    .exactOptional(),
  required: z
    .boolean()
    .meta({ description: 'Whether applicant must fill in field' })
    .exactOptional(),
  placeholder: z
    .string()
    .meta({ description: 'Placeholder text shown in empty input' })
    .exactOptional(),
  response: z.string().meta({ description: "Applicant's text response" }).exactOptional(),
})

export type ParagraphFormFieldResponse = z.infer<typeof ParagraphFormFieldResponseSchema>

export const TermsFormFieldResponseSchema = z.object({
  field_type: GuildMemberVerificationFormFieldTypeSchema.meta({
    description: 'Type of form field',
  }),
  label: z.string().meta({ description: 'Label shown above field' }).exactOptional(),
  description: z
    .string()
    .meta({ description: 'Optional helper text shown below label' })
    .exactOptional(),
  required: z
    .boolean()
    .meta({ description: 'Whether applicant must fill in field' })
    .exactOptional(),
  values: z.array(z.string()).meta({ description: 'Terms applicant must acknowledge' }),
  response: z.boolean().meta({ description: 'Whether applicant accepted terms' }).exactOptional(),
})

export type TermsFormFieldResponse = z.infer<typeof TermsFormFieldResponseSchema>

export const TextInputFormFieldResponseSchema = z.object({
  field_type: GuildMemberVerificationFormFieldTypeSchema.meta({
    description: 'Type of form field',
  }),
  label: z.string().meta({ description: 'Label shown above field' }).exactOptional(),
  description: z
    .string()
    .meta({ description: 'Optional helper text shown below label' })
    .exactOptional(),
  required: z
    .boolean()
    .meta({ description: 'Whether applicant must fill in field' })
    .exactOptional(),
  placeholder: z
    .string()
    .meta({ description: 'Placeholder text shown in empty input' })
    .exactOptional(),
  response: z.string().meta({ description: "Applicant's text response" }).exactOptional(),
})

export type TextInputFormFieldResponse = z.infer<typeof TextInputFormFieldResponseSchema>

export const GuildJoinRequestResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  created_at: z.iso.datetime({ offset: true }),
  reviewed_at: z.iso.datetime({ offset: true }).nullable(),
  application_status: z.xor([z.null().nullable(), GuildJoinRequestApplicationStatusSchema]),
  rejection_reason: z
    .string()
    .nullable()
    .meta({
      description: 'Reason request was rejected. Only set when application_status is REJECTED',
    }),
  guild_id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  user: z.xor([z.null().nullable(), UserResponseSchema]).exactOptional(),
  form_responses: z
    .array(
      z.xor([
        MultipleChoiceFormFieldResponseSchema,
        ParagraphFormFieldResponseSchema,
        TermsFormFieldResponseSchema,
        TextInputFormFieldResponseSchema,
      ]),
    )
    .nullable()
    .meta({ description: "Applicant's responses on join request form" })
    .exactOptional(),
  actioned_by_user: z.xor([z.null().nullable(), UserResponseSchema]).exactOptional(),
})

export type GuildJoinRequestResponse = z.infer<typeof GuildJoinRequestResponseSchema>

export const GuildJoinRequestsListResponseSchema = z.object({
  total: z.int32().exactOptional(),
  guild_join_requests: z.array(GuildJoinRequestResponseSchema).exactOptional(),
})

export type GuildJoinRequestsListResponse = z.infer<typeof GuildJoinRequestsListResponseSchema>

export const GuildMFALevelSchema = z.xor([
  z.literal(0).meta({ description: 'Guild has no MFA/2FA requirement for moderation actions' }),
  z.literal(1).meta({ description: 'Guild has a 2FA requirement for moderation actions' }),
])

export type GuildMFALevel = z.infer<typeof GuildMFALevelSchema>

export const GuildOnboardingModeSchema = z.xor([
  z.literal(0).meta({ description: 'Only Default Channels considered in constraints' }),
  z
    .literal(1)
    .meta({ description: 'Default Channels and Onboarding Prompts considered in constraints' }),
])

export type GuildOnboardingMode = z.infer<typeof GuildOnboardingModeSchema>

export const OnboardingPromptOptionResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  title: z.string(),
  description: z.string(),
  emoji: SettingsEmojiResponseSchema,
  role_ids: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  channel_ids: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
})

export type OnboardingPromptOptionResponse = z.infer<typeof OnboardingPromptOptionResponseSchema>

export const OnboardingPromptTypeSchema = z.xor([
  z.literal(0).meta({ description: 'Multiple choice options' }),
  z.literal(1).meta({ description: 'Many options shown as a dropdown' }),
])

export type OnboardingPromptType = z.infer<typeof OnboardingPromptTypeSchema>

export const OnboardingPromptResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  title: z.string(),
  options: z.array(OnboardingPromptOptionResponseSchema),
  single_select: z.boolean(),
  required: z.boolean(),
  in_onboarding: z.boolean(),
  type: OnboardingPromptTypeSchema,
})

export type OnboardingPromptResponse = z.infer<typeof OnboardingPromptResponseSchema>

export const GuildOnboardingResponseSchema = z.object({
  guild_id: SnowflakeTypeSchema,
  prompts: z.array(OnboardingPromptResponseSchema),
  default_channel_ids: z
    .array(SnowflakeTypeSchema)
    .refine((val) => new Set(val).size === val.length),
  enabled: z.boolean(),
  mode: GuildOnboardingModeSchema,
})

export type GuildOnboardingResponse = z.infer<typeof GuildOnboardingResponseSchema>

export const UserNotificationSettingsSchema = z.xor([
  z
    .literal(0)
    .meta({ description: 'members will receive notifications for all messages by default' }),
  z
    .literal(1)
    .meta({
      description:
        'members will receive notifications only for messages that @mention them by default',
    }),
])

export type UserNotificationSettings = z.infer<typeof UserNotificationSettingsSchema>

export const GuildPatchRequestPartialSchema = z.object({
  name: z.string().min(2).max(100).exactOptional(),
  description: z.string().min(0).max(300).nullable().exactOptional(),
  region: z.string().nullable().exactOptional(),
  icon: z.string().nullable().exactOptional(),
  verification_level: z.xor([z.null().nullable(), VerificationLevelsSchema]).exactOptional(),
  default_message_notifications: z
    .xor([z.null().nullable(), UserNotificationSettingsSchema])
    .exactOptional(),
  explicit_content_filter: z
    .xor([z.null().nullable(), GuildExplicitContentFilterTypesSchema])
    .exactOptional(),
  preferred_locale: z.xor([z.null().nullable(), AvailableLocalesEnumSchema]).exactOptional(),
  afk_timeout: z.xor([z.null().nullable(), AfkTimeoutsSchema]).exactOptional(),
  afk_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  system_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  splash: z.string().nullable().exactOptional(),
  banner: z.string().nullable().exactOptional(),
  system_channel_flags: z.int().nullable().exactOptional(),
  features: z
    .array(z.string().max(152133).nullable())
    .max(1521)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  discovery_splash: z.string().nullable().exactOptional(),
  home_header: z.string().nullable().exactOptional(),
  rules_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  safety_alerts_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  public_updates_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  premium_progress_bar_enabled: z.boolean().nullable().exactOptional(),
})

export type GuildPatchRequestPartial = z.infer<typeof GuildPatchRequestPartialSchema>

export const GuildPreviewResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  icon: z.string().nullable(),
  description: z.string().nullable(),
  home_header: z.string().nullable(),
  splash: z.string().nullable(),
  discovery_splash: z.string().nullable(),
  features: z.array(GuildFeaturesSchema).refine((val) => new Set(val).size === val.length),
  approximate_member_count: z.int32(),
  approximate_presence_count: z.int32(),
  emojis: z.array(EmojiResponseSchema),
  stickers: z.array(GuildStickerResponseSchema),
})

export type GuildPreviewResponse = z.infer<typeof GuildPreviewResponseSchema>

export const GuildPruneResponseSchema = z.object({ pruned: z.int32().nullable() })

export type GuildPruneResponse = z.infer<typeof GuildPruneResponseSchema>

export const PremiumGuildTiersSchema = z.xor([
  z.literal(0).meta({ description: 'Guild has not unlocked any Server Boost perks' }),
  z.literal(1).meta({ description: 'Guild has unlocked Server Boost level 1 perks' }),
  z.literal(2).meta({ description: 'Guild has unlocked Server Boost level 2 perks' }),
  z.literal(3).meta({ description: 'Guild has unlocked Server Boost level 3 perks' }),
])

export type PremiumGuildTiers = z.infer<typeof PremiumGuildTiersSchema>

export const GuildResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  icon: z.string().nullable(),
  description: z.string().nullable(),
  home_header: z.string().nullable(),
  splash: z.string().nullable(),
  discovery_splash: z.string().nullable(),
  features: z.array(GuildFeaturesSchema).refine((val) => new Set(val).size === val.length),
  banner: z.string().nullable(),
  owner_id: SnowflakeTypeSchema,
  application_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  region: z.string(),
  afk_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  system_channel_flags: z.int32(),
  widget_enabled: z.boolean(),
  widget_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  verification_level: VerificationLevelsSchema,
  roles: z.array(GuildRoleResponseSchema),
  default_message_notifications: UserNotificationSettingsSchema,
  mfa_level: GuildMFALevelSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  max_presences: z.int32().nullable(),
  max_members: z.int32(),
  max_stage_video_channel_users: z.int32(),
  max_video_channel_users: z.int32(),
  vanity_url_code: z.string().nullable(),
  premium_tier: PremiumGuildTiersSchema,
  premium_subscription_count: z.int32(),
  preferred_locale: AvailableLocalesEnumSchema,
  rules_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  safety_alerts_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  public_updates_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  premium_progress_bar_enabled: z.boolean(),
  premium_progress_bar_enabled_user_updated_at: z.iso
    .datetime({ offset: true })
    .nullable()
    .exactOptional(),
  nsfw: z.boolean(),
  nsfw_level: GuildNSFWContentLevelSchema,
  emojis: z.array(EmojiResponseSchema),
  stickers: z.array(GuildStickerResponseSchema),
  incidents_data: z.xor([z.null().nullable(), GuildIncidentsDataResponseSchema]),
})

export type GuildResponse = z.infer<typeof GuildResponseSchema>

export const GuildScheduledEventExceptionCreateRequestSchema = z.object({
  scheduled_start_time: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'Overridden start time of this occurrence' })
    .exactOptional(),
  scheduled_end_time: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'Overridden end time of this occurrence' })
    .exactOptional(),
  original_scheduled_start_time: z.iso
    .datetime({ offset: true })
    .meta({ description: 'The original start time of the occurrence to create an exception for' }),
  is_canceled: z
    .boolean()
    .nullable()
    .meta({ description: 'Whether this occurrence is canceled' })
    .exactOptional(),
})

export type GuildScheduledEventExceptionCreateRequest = z.infer<
  typeof GuildScheduledEventExceptionCreateRequestSchema
>

export const GuildScheduledEventExceptionPatchRequestPartialSchema = z.object({
  scheduled_start_time: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'Overridden start time of this occurrence' })
    .exactOptional(),
  scheduled_end_time: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'Overridden end time of this occurrence' })
    .exactOptional(),
  is_canceled: z
    .boolean()
    .nullable()
    .meta({ description: 'Whether this occurrence is canceled' })
    .exactOptional(),
})

export type GuildScheduledEventExceptionPatchRequestPartial = z.infer<
  typeof GuildScheduledEventExceptionPatchRequestPartialSchema
>

export const SearchMessageResponseSchema = z.object({
  type: MessageTypeSchema,
  content: z.string(),
  mentions: z.array(UserResponseSchema),
  mention_roles: z.array(SnowflakeTypeSchema).refine((val) => new Set(val).size === val.length),
  attachments: z.array(MessageAttachmentResponseSchema),
  embeds: z.array(MessageEmbedResponseSchema),
  timestamp: z.iso.datetime({ offset: true }),
  edited_timestamp: z.iso.datetime({ offset: true }).nullable(),
  flags: z.int32(),
  components: z.array(
    z.xor([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: z
    .array(z.xor([GuildStickerResponseSchema, StandardStickerResponseSchema]))
    .exactOptional(),
  sticker_items: z.array(MessageStickerItemResponseSchema).exactOptional(),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: z.boolean(),
  mention_everyone: z.boolean(),
  tts: z.boolean(),
  call: MessageCallResponseSchema.exactOptional(),
  activity: MessageActivityResponseSchema.exactOptional(),
  application: BasicApplicationResponseWithBotSchema.exactOptional(),
  application_id: SnowflakeTypeSchema.exactOptional(),
  interaction: MessageInteractionResponseSchema.exactOptional(),
  nonce: z
    .xor([
      z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64().min(-9223372036854776000n).max(9223372036854776000n)),
      z.string().max(25),
    ])
    .exactOptional(),
  webhook_id: SnowflakeTypeSchema.exactOptional(),
  message_reference: MessageReferenceResponseSchema.exactOptional(),
  thread: ThreadResponseSchema.exactOptional(),
  mention_channels: z.array(MessageMentionChannelResponseSchema).exactOptional(),
  role_subscription_data: MessageRoleSubscriptionDataResponseSchema.exactOptional(),
  purchase_notification: PurchaseNotificationResponseSchema.exactOptional(),
  position: z.int32().exactOptional(),
  resolved: ResolvedObjectsResponseSchema.exactOptional(),
  poll: PollResponseSchema.exactOptional(),
  shared_client_theme: CustomClientThemeResponseSchema.exactOptional(),
  interaction_metadata: z
    .xor([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
      ModalSubmitInteractionMetadataResponseSchema,
    ])
    .exactOptional(),
  message_snapshots: z.array(MessageSnapshotResponseSchema).exactOptional(),
  lobby_member: MessageLobbyMemberResponseSchema.exactOptional(),
  actor: UserResponseSchema.exactOptional(),
  reactions: z.array(MessageReactionResponseSchema).exactOptional(),
  referenced_message: z.xor([z.null().nullable(), BasicMessageResponseSchema]).exactOptional(),
  hit: z.boolean(),
  restriction_count: z.int32().exactOptional(),
  author_restriction_count: z.int32().exactOptional(),
  source_author_restriction_count: z.int32().exactOptional(),
  forward_source_author_id: SnowflakeTypeSchema.exactOptional(),
})

export type SearchMessageResponse = z.infer<typeof SearchMessageResponseSchema>

export const GuildSearchResponseSchema = z.object({
  messages: z.array(z.array(SearchMessageResponseSchema)),
  doing_deep_historical_index: z.boolean(),
  total_results: z.int32(),
  threads: z.array(ThreadResponseSchema).nullable().exactOptional(),
  members: z.array(ThreadMemberResponseSchema).nullable().exactOptional(),
  documents_indexed: z.int32().nullable().exactOptional(),
})

export type GuildSearchResponse = z.infer<typeof GuildSearchResponseSchema>

export const GuildSubscriptionIntegrationResponseSchema = z.object({
  type: IntegrationTypesSchema,
  name: z.string().nullable(),
  account: AccountResponseSchema,
  enabled: z.boolean(),
  id: SnowflakeTypeSchema,
})

export type GuildSubscriptionIntegrationResponse = z.infer<
  typeof GuildSubscriptionIntegrationResponseSchema
>

export const GuildTemplateChannelTagsSchema = z.object({
  id: z.int32().nullable(),
  name: z.string(),
  emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  emoji_name: z.string().nullable(),
  moderated: z.boolean().nullable(),
})

export type GuildTemplateChannelTags = z.infer<typeof GuildTemplateChannelTagsSchema>

export const GuildTemplateChannelResponseSchema = z.object({
  id: z.int32().nullable(),
  type: ChannelTypesSchema,
  name: z.string().nullable(),
  position: z.int32().nullable(),
  topic: z.string().nullable(),
  bitrate: z.int32(),
  user_limit: z.int32(),
  nsfw: z.boolean(),
  rate_limit_per_user: z.int32(),
  parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  default_auto_archive_duration: z.xor([z.null().nullable(), ThreadAutoArchiveDurationSchema]),
  permission_overwrites: z.array(ChannelPermissionOverwriteResponseSchema),
  available_tags: z.array(GuildTemplateChannelTagsSchema).nullable(),
  template: z.string(),
  default_reaction_emoji: z.xor([z.null().nullable(), DefaultReactionEmojiResponseSchema]),
  default_thread_rate_limit_per_user: z.int32().nullable(),
  default_sort_order: z.xor([z.null().nullable(), ThreadSortOrderSchema]),
  default_forum_layout: z.xor([z.null().nullable(), ForumLayoutSchema]),
  default_tag_setting: z.xor([z.null().nullable(), ThreadSearchTagSettingSchema]),
  theme_color: z.int32().nullable(),
})

export type GuildTemplateChannelResponse = z.infer<typeof GuildTemplateChannelResponseSchema>

export const GuildTemplateRoleColorsResponseSchema = z.object({
  primary_color: z.int32(),
  secondary_color: z.int32().nullable(),
  tertiary_color: z.int32().nullable(),
})

export type GuildTemplateRoleColorsResponse = z.infer<typeof GuildTemplateRoleColorsResponseSchema>

export const GuildTemplateRoleResponseSchema = z.object({
  id: z.int32(),
  name: z.string(),
  permissions: z.string(),
  color: z.int32(),
  colors: z.xor([z.null().nullable(), GuildTemplateRoleColorsResponseSchema]),
  hoist: z.boolean(),
  mentionable: z.boolean(),
  icon: z.string().nullable(),
  unicode_emoji: z.string().nullable(),
})

export type GuildTemplateRoleResponse = z.infer<typeof GuildTemplateRoleResponseSchema>

export const GuildTemplateSnapshotResponseSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  region: z.string().nullable(),
  verification_level: VerificationLevelsSchema,
  default_message_notifications: UserNotificationSettingsSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  preferred_locale: AvailableLocalesEnumSchema,
  afk_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  system_channel_flags: z.int32(),
  roles: z.array(GuildTemplateRoleResponseSchema),
  channels: z.array(GuildTemplateChannelResponseSchema),
})

export type GuildTemplateSnapshotResponse = z.infer<typeof GuildTemplateSnapshotResponseSchema>

export const GuildTemplateResponseSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  usage_count: z.int32(),
  creator_id: SnowflakeTypeSchema,
  creator: z.xor([z.null().nullable(), UserResponseSchema]),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
  source_guild_id: SnowflakeTypeSchema,
  serialized_source_guild: GuildTemplateSnapshotResponseSchema,
  is_dirty: z.boolean().nullable(),
})

export type GuildTemplateResponse = z.infer<typeof GuildTemplateResponseSchema>

export const GuildWelcomeChannelSchema = z.object({
  channel_id: SnowflakeTypeSchema,
  description: z.string().min(1).max(50),
  emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  emoji_name: z.string().max(152133).nullable().exactOptional(),
})

export type GuildWelcomeChannel = z.infer<typeof GuildWelcomeChannelSchema>

export const GuildWelcomeScreenChannelResponseSchema = z.object({
  channel_id: SnowflakeTypeSchema,
  description: z.string(),
  emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  emoji_name: z.string().nullable(),
})

export type GuildWelcomeScreenChannelResponse = z.infer<
  typeof GuildWelcomeScreenChannelResponseSchema
>

export const GuildWelcomeScreenResponseSchema = z.object({
  description: z.string().nullable(),
  welcome_channels: z.array(GuildWelcomeScreenChannelResponseSchema),
})

export type GuildWelcomeScreenResponse = z.infer<typeof GuildWelcomeScreenResponseSchema>

export const GuildWithCountsResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  icon: z.string().nullable(),
  description: z.string().nullable(),
  home_header: z.string().nullable(),
  splash: z.string().nullable(),
  discovery_splash: z.string().nullable(),
  features: z.array(GuildFeaturesSchema).refine((val) => new Set(val).size === val.length),
  banner: z.string().nullable(),
  owner_id: SnowflakeTypeSchema,
  application_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  region: z.string(),
  afk_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  system_channel_flags: z.int32(),
  widget_enabled: z.boolean(),
  widget_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  verification_level: VerificationLevelsSchema,
  roles: z.array(GuildRoleResponseSchema),
  default_message_notifications: UserNotificationSettingsSchema,
  mfa_level: GuildMFALevelSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  max_presences: z.int32().nullable(),
  max_members: z.int32(),
  max_stage_video_channel_users: z.int32(),
  max_video_channel_users: z.int32(),
  vanity_url_code: z.string().nullable(),
  premium_tier: PremiumGuildTiersSchema,
  premium_subscription_count: z.int32(),
  preferred_locale: AvailableLocalesEnumSchema,
  rules_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  safety_alerts_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  public_updates_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  premium_progress_bar_enabled: z.boolean(),
  premium_progress_bar_enabled_user_updated_at: z.iso
    .datetime({ offset: true })
    .nullable()
    .exactOptional(),
  nsfw: z.boolean(),
  nsfw_level: GuildNSFWContentLevelSchema,
  emojis: z.array(EmojiResponseSchema),
  stickers: z.array(GuildStickerResponseSchema),
  incidents_data: z.xor([z.null().nullable(), GuildIncidentsDataResponseSchema]),
  approximate_member_count: z.int32().nullable().exactOptional(),
  approximate_presence_count: z.int32().nullable().exactOptional(),
})

export type GuildWithCountsResponse = z.infer<typeof GuildWithCountsResponseSchema>

export const HasOptionSchema = z.xor([
  z.literal('link'),
  z.literal('embed'),
  z.literal('file'),
  z.literal('image'),
  z.literal('video'),
  z.literal('sound'),
  z.literal('sticker'),
  z.literal('poll'),
  z.literal('snapshot'),
  z.literal('-link'),
  z.literal('-embed'),
  z.literal('-file'),
  z.literal('-image'),
  z.literal('-video'),
  z.literal('-sound'),
  z.literal('-sticker'),
  z.literal('-poll'),
  z.literal('-snapshot'),
])

export type HasOption = z.infer<typeof HasOptionSchema>

export const IncomingWebhookRequestPartialSchema = z.object({
  content: z.string().max(2000).nullable().exactOptional(),
  embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
  allowed_mentions: z
    .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
    .exactOptional(),
  components: z
    .array(
      z.xor([
        ActionRowComponentForMessageRequestSchema,
        ContainerComponentForMessageRequestSchema,
        FileComponentForMessageRequestSchema,
        MediaGalleryComponentForMessageRequestSchema,
        SectionComponentForMessageRequestSchema,
        SeparatorComponentForMessageRequestSchema,
        TextDisplayComponentForMessageRequestSchema,
      ]),
    )
    .max(40)
    .nullable()
    .exactOptional(),
  attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
  poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
  tts: z.boolean().nullable().exactOptional(),
  flags: z.int().nullable().exactOptional(),
  username: z.string().min(1).max(80).nullable().exactOptional(),
  avatar_url: z.url().max(2048).nullable().exactOptional(),
  thread_name: z.string().min(0).max(100).nullable().exactOptional(),
  applied_tags: z.array(SnowflakeTypeSchema).max(5).nullable().exactOptional(),
})

export type IncomingWebhookRequestPartial = z.infer<typeof IncomingWebhookRequestPartialSchema>

export const IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema = z.object({
  content: z.string().max(2000).nullable().exactOptional(),
  embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
  allowed_mentions: z
    .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
    .exactOptional(),
  components: z
    .array(
      z.xor([
        ActionRowComponentForMessageRequestSchema,
        ContainerComponentForMessageRequestSchema,
        FileComponentForMessageRequestSchema,
        MediaGalleryComponentForMessageRequestSchema,
        SectionComponentForMessageRequestSchema,
        SeparatorComponentForMessageRequestSchema,
        TextDisplayComponentForMessageRequestSchema,
      ]),
    )
    .max(40)
    .nullable()
    .exactOptional(),
  attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
  flags: z.int().nullable().exactOptional(),
})

export type IncomingWebhookUpdateForInteractionCallbackRequestPartial = z.infer<
  typeof IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema
>

export const IncomingWebhookUpdateRequestPartialSchema = z.object({
  content: z.string().max(2000).nullable().exactOptional(),
  embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
  allowed_mentions: z
    .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
    .exactOptional(),
  components: z
    .array(
      z.xor([
        ActionRowComponentForMessageRequestSchema,
        ContainerComponentForMessageRequestSchema,
        FileComponentForMessageRequestSchema,
        MediaGalleryComponentForMessageRequestSchema,
        SectionComponentForMessageRequestSchema,
        SeparatorComponentForMessageRequestSchema,
        TextDisplayComponentForMessageRequestSchema,
      ]),
    )
    .max(40)
    .nullable()
    .exactOptional(),
  attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
  poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
  flags: z.int().nullable().exactOptional(),
})

export type IncomingWebhookUpdateRequestPartial = z.infer<
  typeof IncomingWebhookUpdateRequestPartialSchema
>

export const InteractionResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  activity_instance_id: z.string().nullable().exactOptional(),
  response_message_id: SnowflakeTypeSchema.exactOptional(),
  response_message_loading: z.boolean().exactOptional(),
  response_message_ephemeral: z.boolean().exactOptional(),
  channel_id: SnowflakeTypeSchema.exactOptional(),
  guild_id: SnowflakeTypeSchema.exactOptional(),
})

export type InteractionResponse = z.infer<typeof InteractionResponseSchema>

export const LaunchActivityInteractionCallbackResponseSchema = z.object({
  type: InteractionCallbackTypesSchema,
  activity_instance: ActivityInstanceCallbackResponseSchema,
})

export type LaunchActivityInteractionCallbackResponse = z.infer<
  typeof LaunchActivityInteractionCallbackResponseSchema
>

export const UpdateMessageInteractionCallbackResponseSchema = z.object({
  type: InteractionCallbackTypesSchema,
  message: MessageResponseSchema,
})

export type UpdateMessageInteractionCallbackResponse = z.infer<
  typeof UpdateMessageInteractionCallbackResponseSchema
>

export const InteractionCallbackResponseSchema = z.object({
  interaction: InteractionResponseSchema,
  resource: z
    .xor([
      CreateMessageInteractionCallbackResponseSchema,
      LaunchActivityInteractionCallbackResponseSchema,
      UpdateMessageInteractionCallbackResponseSchema,
    ])
    .exactOptional(),
})

export type InteractionCallbackResponse = z.infer<typeof InteractionCallbackResponseSchema>

export const KeywordTriggerMetadataSchema = z.object({
  keyword_filter: z.array(z.string().min(1).max(60)).max(1000).nullable().exactOptional(),
  regex_patterns: z.array(z.string().min(1).max(260)).max(10).nullable().exactOptional(),
  allow_list: z.array(z.string().min(1).max(60)).max(100).nullable().exactOptional(),
})

export type KeywordTriggerMetadata = z.infer<typeof KeywordTriggerMetadataSchema>

export const KeywordUpsertRequestSchema = z.object({
  name: z.string().max(100),
  event_type: AutomodEventTypeSchema,
  actions: z
    .array(
      z.xor([
        BlockMessageActionSchema,
        FlagToChannelActionSchema,
        QuarantineUserActionSchema,
        UserCommunicationDisabledActionSchema,
      ]),
    )
    .min(1)
    .max(5)
    .nullable()
    .exactOptional(),
  enabled: z.boolean().nullable().exactOptional(),
  exempt_roles: z
    .array(SnowflakeTypeSchema)
    .max(20)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  exempt_channels: z
    .array(SnowflakeTypeSchema)
    .max(50)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: z.xor([z.null().nullable(), KeywordTriggerMetadataSchema]).exactOptional(),
})

export type KeywordUpsertRequest = z.infer<typeof KeywordUpsertRequestSchema>

export const KeywordUpsertRequestPartialSchema = z.object({
  name: z.string().max(100).exactOptional(),
  event_type: AutomodEventTypeSchema.exactOptional(),
  actions: z
    .array(
      z.xor([
        BlockMessageActionSchema,
        FlagToChannelActionSchema,
        QuarantineUserActionSchema,
        UserCommunicationDisabledActionSchema,
      ]),
    )
    .min(1)
    .max(5)
    .nullable()
    .exactOptional(),
  enabled: z.boolean().nullable().exactOptional(),
  exempt_roles: z
    .array(SnowflakeTypeSchema)
    .max(20)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  exempt_channels: z
    .array(SnowflakeTypeSchema)
    .max(50)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  trigger_type: AutomodTriggerTypeSchema.exactOptional(),
  trigger_metadata: z.xor([z.null().nullable(), KeywordTriggerMetadataSchema]).exactOptional(),
})

export type KeywordUpsertRequestPartial = z.infer<typeof KeywordUpsertRequestPartialSchema>

export const MentionableSelectComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  placeholder: z.string().max(150).nullable().exactOptional(),
  min_values: z.int().min(0).max(25).nullable().exactOptional(),
  max_values: z.int().min(1).max(25).nullable().exactOptional(),
  disabled: z.boolean().nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  default_values: z
    .array(z.xor([RoleSelectDefaultValueSchema, UserSelectDefaultValueSchema]))
    .max(25)
    .nullable()
    .exactOptional(),
})

export type MentionableSelectComponentForModalRequest = z.infer<
  typeof MentionableSelectComponentForModalRequestSchema
>

export const RadioGroupOptionForRequestSchema = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(100),
  description: z.string().max(100).nullable().exactOptional(),
  default: z.boolean().nullable().exactOptional(),
})

export type RadioGroupOptionForRequest = z.infer<typeof RadioGroupOptionForRequestSchema>

export const RadioGroupComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  required: z.boolean().nullable().exactOptional(),
  options: z.array(RadioGroupOptionForRequestSchema).min(2).max(10),
})

export type RadioGroupComponentForModalRequest = z.infer<
  typeof RadioGroupComponentForModalRequestSchema
>

export const RoleSelectComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  placeholder: z.string().max(150).nullable().exactOptional(),
  min_values: z.int().min(0).max(25).nullable().exactOptional(),
  max_values: z.int().min(1).max(25).nullable().exactOptional(),
  disabled: z.boolean().nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  default_values: z.array(RoleSelectDefaultValueSchema).max(25).nullable().exactOptional(),
})

export type RoleSelectComponentForModalRequest = z.infer<
  typeof RoleSelectComponentForModalRequestSchema
>

export const StringSelectComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  placeholder: z.string().max(150).nullable().exactOptional(),
  min_values: z.int().min(0).max(25).nullable().exactOptional(),
  max_values: z.int().min(1).max(25).nullable().exactOptional(),
  disabled: z.boolean().nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  options: z.array(StringSelectOptionForRequestSchema).min(1).max(25),
})

export type StringSelectComponentForModalRequest = z.infer<
  typeof StringSelectComponentForModalRequestSchema
>

export const UserSelectComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  custom_id: z.string().min(1).max(100),
  placeholder: z.string().max(150).nullable().exactOptional(),
  min_values: z.int().min(0).max(25).nullable().exactOptional(),
  max_values: z.int().min(1).max(25).nullable().exactOptional(),
  disabled: z.boolean().nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  default_values: z.array(UserSelectDefaultValueSchema).max(25).nullable().exactOptional(),
})

export type UserSelectComponentForModalRequest = z.infer<
  typeof UserSelectComponentForModalRequestSchema
>

export const LabelComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  label: z.string().min(1).max(45),
  description: z.string().min(1).max(100).nullable().exactOptional(),
  component: z.xor([
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

export type LabelComponentForModalRequest = z.infer<typeof LabelComponentForModalRequestSchema>

export const LaunchActivityInteractionCallbackRequestSchema = z.object({
  type: InteractionCallbackTypesSchema,
})

export type LaunchActivityInteractionCallbackRequest = z.infer<
  typeof LaunchActivityInteractionCallbackRequestSchema
>

export const ListApplicationEmojisResponseSchema = z.object({ items: z.array(EmojiResponseSchema) })

export type ListApplicationEmojisResponse = z.infer<typeof ListApplicationEmojisResponseSchema>

export const SoundboardSoundResponseSchema = z.object({
  name: z.string(),
  sound_id: SnowflakeTypeSchema,
  volume: z.number(),
  emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  emoji_name: z.string().nullable(),
  guild_id: SnowflakeTypeSchema.exactOptional(),
  available: z.boolean(),
  user: UserResponseSchema.exactOptional(),
})

export type SoundboardSoundResponse = z.infer<typeof SoundboardSoundResponseSchema>

export const ListGuildSoundboardSoundsResponseSchema = z.object({
  items: z.array(SoundboardSoundResponseSchema),
})

export type ListGuildSoundboardSoundsResponse = z.infer<
  typeof ListGuildSoundboardSoundsResponseSchema
>

export const LobbyGuildInviteResponseSchema = z.object({ code: z.string() })

export type LobbyGuildInviteResponse = z.infer<typeof LobbyGuildInviteResponseSchema>

export const LobbyMemberRequestSchema = z.object({
  id: SnowflakeTypeSchema,
  metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
  flags: z.xor([z.null().nullable(), z.literal(1)]).exactOptional(),
  additional_name: z.string().min(1).max(80).nullable().exactOptional(),
})

export type LobbyMemberRequest = z.infer<typeof LobbyMemberRequestSchema>

export const LobbyMemberResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  metadata: z.record(z.string(), z.string()).nullable(),
  flags: z.int32(),
  additional_name: z.string().exactOptional(),
})

export type LobbyMemberResponse = z.infer<typeof LobbyMemberResponseSchema>

export const LobbyMessageResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  type: MessageTypeSchema,
  content: z.string(),
  lobby_id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  lobby_member: MessageLobbyMemberResponseSchema.exactOptional(),
  metadata: z.record(z.string(), z.string()).exactOptional(),
  moderation_metadata: z.record(z.string(), z.string()).exactOptional(),
  flags: z.int32(),
  application_id: SnowflakeTypeSchema.exactOptional(),
})

export type LobbyMessageResponse = z.infer<typeof LobbyMessageResponseSchema>

export const LobbyResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  metadata: z.record(z.string(), z.string()).nullable(),
  members: z.array(LobbyMemberResponseSchema),
  linked_channel: GuildChannelResponseSchema.exactOptional(),
  flags: UInt32TypeSchema,
  override_event_webhooks_url: z.string().nullable().exactOptional(),
})

export type LobbyResponse = z.infer<typeof LobbyResponseSchema>

export const MLSpamTriggerMetadataSchema = z.object({})

export type MLSpamTriggerMetadata = z.infer<typeof MLSpamTriggerMetadataSchema>

export const MLSpamUpsertRequestSchema = z.object({
  name: z.string().max(100),
  event_type: AutomodEventTypeSchema,
  actions: z
    .array(
      z.xor([
        BlockMessageActionSchema,
        FlagToChannelActionSchema,
        QuarantineUserActionSchema,
        UserCommunicationDisabledActionSchema,
      ]),
    )
    .min(1)
    .max(5)
    .nullable()
    .exactOptional(),
  enabled: z.boolean().nullable().exactOptional(),
  exempt_roles: z
    .array(SnowflakeTypeSchema)
    .max(20)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  exempt_channels: z
    .array(SnowflakeTypeSchema)
    .max(50)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: z.xor([z.null().nullable(), MLSpamTriggerMetadataSchema]).exactOptional(),
})

export type MLSpamUpsertRequest = z.infer<typeof MLSpamUpsertRequestSchema>

export const MLSpamUpsertRequestPartialSchema = z.object({
  name: z.string().max(100).exactOptional(),
  event_type: AutomodEventTypeSchema.exactOptional(),
  actions: z
    .array(
      z.xor([
        BlockMessageActionSchema,
        FlagToChannelActionSchema,
        QuarantineUserActionSchema,
        UserCommunicationDisabledActionSchema,
      ]),
    )
    .min(1)
    .max(5)
    .nullable()
    .exactOptional(),
  enabled: z.boolean().nullable().exactOptional(),
  exempt_roles: z
    .array(SnowflakeTypeSchema)
    .max(20)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  exempt_channels: z
    .array(SnowflakeTypeSchema)
    .max(50)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  trigger_type: AutomodTriggerTypeSchema.exactOptional(),
  trigger_metadata: z.xor([z.null().nullable(), MLSpamTriggerMetadataSchema]).exactOptional(),
})

export type MLSpamUpsertRequestPartial = z.infer<typeof MLSpamUpsertRequestPartialSchema>

export const MentionSpamTriggerMetadataSchema = z.object({
  mention_total_limit: z.int().min(0).max(50).nullable().exactOptional(),
  mention_raid_protection_enabled: z.boolean().nullable().exactOptional(),
})

export type MentionSpamTriggerMetadata = z.infer<typeof MentionSpamTriggerMetadataSchema>

export const MentionSpamUpsertRequestSchema = z.object({
  name: z.string().max(100),
  event_type: AutomodEventTypeSchema,
  actions: z
    .array(
      z.xor([
        BlockMessageActionSchema,
        FlagToChannelActionSchema,
        QuarantineUserActionSchema,
        UserCommunicationDisabledActionSchema,
      ]),
    )
    .min(1)
    .max(5)
    .nullable()
    .exactOptional(),
  enabled: z.boolean().nullable().exactOptional(),
  exempt_roles: z
    .array(SnowflakeTypeSchema)
    .max(20)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  exempt_channels: z
    .array(SnowflakeTypeSchema)
    .max(50)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: z.xor([z.null().nullable(), MentionSpamTriggerMetadataSchema]).exactOptional(),
})

export type MentionSpamUpsertRequest = z.infer<typeof MentionSpamUpsertRequestSchema>

export const MentionSpamUpsertRequestPartialSchema = z.object({
  name: z.string().max(100).exactOptional(),
  event_type: AutomodEventTypeSchema.exactOptional(),
  actions: z
    .array(
      z.xor([
        BlockMessageActionSchema,
        FlagToChannelActionSchema,
        QuarantineUserActionSchema,
        UserCommunicationDisabledActionSchema,
      ]),
    )
    .min(1)
    .max(5)
    .nullable()
    .exactOptional(),
  enabled: z.boolean().nullable().exactOptional(),
  exempt_roles: z
    .array(SnowflakeTypeSchema)
    .max(20)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  exempt_channels: z
    .array(SnowflakeTypeSchema)
    .max(50)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  trigger_type: AutomodTriggerTypeSchema.exactOptional(),
  trigger_metadata: z.xor([z.null().nullable(), MentionSpamTriggerMetadataSchema]).exactOptional(),
})

export type MentionSpamUpsertRequestPartial = z.infer<typeof MentionSpamUpsertRequestPartialSchema>

export const MessageReferenceRequestSchema = z.object({
  guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  message_id: SnowflakeTypeSchema,
  fail_if_not_exists: z.boolean().nullable().exactOptional(),
  type: z.xor([z.null().nullable(), MessageReferenceTypeSchema]).exactOptional(),
})

export type MessageReferenceRequest = z.infer<typeof MessageReferenceRequestSchema>

export const MessageCreateRequestSchema = z.object({
  content: z.string().max(4000).nullable().exactOptional(),
  embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
  allowed_mentions: z
    .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
    .exactOptional(),
  sticker_ids: z.array(SnowflakeTypeSchema).max(3).nullable().exactOptional(),
  components: z
    .array(
      z.xor([
        ActionRowComponentForMessageRequestSchema,
        ContainerComponentForMessageRequestSchema,
        FileComponentForMessageRequestSchema,
        MediaGalleryComponentForMessageRequestSchema,
        SectionComponentForMessageRequestSchema,
        SeparatorComponentForMessageRequestSchema,
        TextDisplayComponentForMessageRequestSchema,
      ]),
    )
    .max(40)
    .nullable()
    .exactOptional(),
  flags: z.int().nullable().exactOptional(),
  attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
  poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
  shared_client_theme: z
    .xor([z.null().nullable(), CustomClientThemeShareRequestSchema])
    .exactOptional(),
  message_reference: z.xor([z.null().nullable(), MessageReferenceRequestSchema]).exactOptional(),
  nonce: z
    .xor([
      z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64().min(-9223372036854776000n).max(9223372036854776000n)),
      z.string().max(25),
      z.null().nullable(),
    ])
    .exactOptional(),
  enforce_nonce: z.boolean().nullable().exactOptional(),
  tts: z.boolean().nullable().exactOptional(),
})

export type MessageCreateRequest = z.infer<typeof MessageCreateRequestSchema>

export const MessageEditRequestPartialSchema = z.object({
  content: z.string().max(4000).nullable().exactOptional(),
  embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
  flags: z.int().nullable().exactOptional(),
  allowed_mentions: z
    .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
    .exactOptional(),
  sticker_ids: z.array(SnowflakeTypeSchema).max(1521).nullable().exactOptional(),
  components: z
    .array(
      z.xor([
        ActionRowComponentForMessageRequestSchema,
        ContainerComponentForMessageRequestSchema,
        FileComponentForMessageRequestSchema,
        MediaGalleryComponentForMessageRequestSchema,
        SectionComponentForMessageRequestSchema,
        SeparatorComponentForMessageRequestSchema,
        TextDisplayComponentForMessageRequestSchema,
      ]),
    )
    .max(40)
    .nullable()
    .exactOptional(),
  attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
})

export type MessageEditRequestPartial = z.infer<typeof MessageEditRequestPartialSchema>

export const TextDisplayComponentForModalRequestSchema = z.object({
  type: MessageComponentTypesSchema,
  id: z.int32().min(0).nullable().exactOptional(),
  content: z.string().min(1).max(4000),
})

export type TextDisplayComponentForModalRequest = z.infer<
  typeof TextDisplayComponentForModalRequestSchema
>

export const ModalInteractionCallbackRequestDataSchema = z.object({
  custom_id: z.string().min(1).max(100),
  title: z.string().min(1).max(45),
  components: z
    .array(
      z.xor([
        ActionRowComponentForModalRequestSchema,
        LabelComponentForModalRequestSchema,
        TextDisplayComponentForModalRequestSchema,
      ]),
    )
    .min(1)
    .max(40),
})

export type ModalInteractionCallbackRequestData = z.infer<
  typeof ModalInteractionCallbackRequestDataSchema
>

export const ModalInteractionCallbackRequestSchema = z.object({
  type: InteractionCallbackTypesSchema,
  data: ModalInteractionCallbackRequestDataSchema,
})

export type ModalInteractionCallbackRequest = z.infer<typeof ModalInteractionCallbackRequestSchema>

export const MyGuildResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  icon: z.string().nullable(),
  banner: z.string().nullable(),
  owner: z.boolean(),
  permissions: z.string(),
  features: z.array(GuildFeaturesSchema).refine((val) => new Set(val).size === val.length),
  approximate_member_count: z.int32().nullable().exactOptional(),
  approximate_presence_count: z.int32().nullable().exactOptional(),
})

export type MyGuildResponse = z.infer<typeof MyGuildResponseSchema>

export const OAuth2GetAuthorizationResponseSchema = z.object({
  application: ApplicationResponseSchema,
  expires: z.iso.datetime({ offset: true }),
  scopes: z.array(OAuth2ScopesSchema).refine((val) => new Set(val).size === val.length),
  user: UserResponseSchema.exactOptional(),
})

export type OAuth2GetAuthorizationResponse = z.infer<typeof OAuth2GetAuthorizationResponseSchema>

export const OAuth2KeySchema = z.object({
  kty: z.string(),
  use: z.string(),
  kid: z.string(),
  n: z.string(),
  e: z.string(),
  alg: z.string(),
})

export type OAuth2Key = z.infer<typeof OAuth2KeySchema>

export const OAuth2GetKeysSchema = z.object({ keys: z.array(OAuth2KeySchema) })

export type OAuth2GetKeys = z.infer<typeof OAuth2GetKeysSchema>

export const OAuth2GetOpenIDConnectUserInfoResponseSchema = z.object({
  sub: z.string(),
  email: z.string().nullable().exactOptional(),
  email_verified: z.boolean().exactOptional(),
  preferred_username: z.string().exactOptional(),
  nickname: z.string().nullable().exactOptional(),
  picture: z.string().exactOptional(),
  locale: z.string().exactOptional(),
})

export type OAuth2GetOpenIDConnectUserInfoResponse = z.infer<
  typeof OAuth2GetOpenIDConnectUserInfoResponseSchema
>

export const OnboardingPromptOptionRequestSchema = z.object({
  id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  title: z.string().min(1).max(50),
  description: z.string().max(100).nullable().exactOptional(),
  emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  emoji_name: z.string().max(100).nullable().exactOptional(),
  emoji_animated: z.boolean().nullable().exactOptional(),
  role_ids: z
    .array(SnowflakeTypeSchema)
    .max(50)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  channel_ids: z
    .array(SnowflakeTypeSchema)
    .max(50)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
})

export type OnboardingPromptOptionRequest = z.infer<typeof OnboardingPromptOptionRequestSchema>

export const PermissionsResponseSchema = z.object({
  permissions: z
    .string()
    .meta({ description: 'The computed permissions, as a stringified bitfield' }),
})

export type PermissionsResponse = z.infer<typeof PermissionsResponseSchema>

export const PinnedMessageResponseSchema = z.object({
  pinned_at: z.iso.datetime({ offset: true }),
  message: MessageResponseSchema,
})

export type PinnedMessageResponse = z.infer<typeof PinnedMessageResponseSchema>

export const PinnedMessagesResponseSchema = z.object({
  items: z.array(PinnedMessageResponseSchema),
  has_more: z.boolean(),
})

export type PinnedMessagesResponse = z.infer<typeof PinnedMessagesResponseSchema>

export const PollAnswerDetailsResponseSchema = z.object({ users: z.array(UserResponseSchema) })

export type PollAnswerDetailsResponse = z.infer<typeof PollAnswerDetailsResponseSchema>

export const PongInteractionCallbackRequestSchema = z.object({
  type: InteractionCallbackTypesSchema,
})

export type PongInteractionCallbackRequest = z.infer<typeof PongInteractionCallbackRequestSchema>

export const PremiumTypesSchema = z.xor([
  z.literal(0).meta({ description: 'None' }),
  z.literal(1).meta({ description: 'Nitro Classic' }),
  z.literal(2).meta({ description: 'Nitro Standard' }),
  z.literal(3).meta({ description: 'Nitro Basic' }),
])

export type PremiumTypes = z.infer<typeof PremiumTypesSchema>

export const TeamMembershipStatesSchema = z.xor([
  z.literal(1).meta({ description: 'User has been invited to the team.' }),
  z.literal(2).meta({ description: 'User has accepted the team invitation.' }),
])

export type TeamMembershipStates = z.infer<typeof TeamMembershipStatesSchema>

export const TeamMemberRolesSchema = z.xor([
  z
    .literal('admin')
    .meta({
      description:
        'Admins have similar access as owners, except they cannot take destructive actions on the team or team-owned apps.',
    }),
  z
    .literal('developer')
    .meta({
      description:
        'Developers can access information about team-owned apps, like the client secret or public key. They can also take limited actions on team-owned apps, like configuring interaction endpoints or resetting the bot token. Members with the Developer role cannot manage the team or its members, or take destructive actions on team-owned apps.',
    }),
  z
    .literal('read_only')
    .meta({
      description:
        'Read-only members can access information about a team and any team-owned apps. Some examples include getting the IDs of applications and exporting payout records. Members can also invite bots associated with team-owned apps that are marked private.',
    }),
])

export type TeamMemberRoles = z.infer<typeof TeamMemberRolesSchema>

export const TeamMemberResponseSchema = z.object({
  user: UserResponseSchema,
  team_id: SnowflakeTypeSchema,
  membership_state: TeamMembershipStatesSchema,
  role: TeamMemberRolesSchema,
  permissions: z.array(z.string()),
})

export type TeamMemberResponse = z.infer<typeof TeamMemberResponseSchema>

export const TeamResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  icon: z.string().nullable(),
  name: z.string(),
  owner_user_id: SnowflakeTypeSchema,
  members: z.array(TeamMemberResponseSchema),
})

export type TeamResponse = z.infer<typeof TeamResponseSchema>

export const PrivateApplicationResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  icon: z.string().nullable(),
  description: z.string(),
  type: z.xor([z.null().nullable(), ApplicationTypesSchema]),
  cover_image: z.string().exactOptional(),
  primary_sku_id: SnowflakeTypeSchema.exactOptional(),
  flags: z.int32(),
  flags_new: z.string(),
  bot: UserResponseSchema.exactOptional(),
  slug: z.string().exactOptional(),
  conjure_project_id: SnowflakeTypeSchema.exactOptional(),
  vibegrations_project_id: SnowflakeTypeSchema.exactOptional(),
  guild_id: SnowflakeTypeSchema.exactOptional(),
  rpc_origins: z.array(z.string()).exactOptional(),
  bot_public: z.boolean().exactOptional(),
  bot_require_code_grant: z.boolean().exactOptional(),
  terms_of_service_url: z.url().exactOptional(),
  privacy_policy_url: z.url().exactOptional(),
  custom_install_url: z.url().exactOptional(),
  install_params: ApplicationOAuth2InstallParamsResponseSchema.exactOptional(),
  integration_types_config: z
    .record(z.string(), ApplicationIntegrationTypeConfigurationResponseSchema)
    .exactOptional(),
  verify_key: z.string(),
  max_participants: z.int32().nullable().exactOptional(),
  tags: z
    .array(z.string())
    .refine((val) => new Set(val).size === val.length)
    .exactOptional(),
  redirect_uris: z.array(z.url()),
  interactions_endpoint_url: z.url().nullable(),
  role_connections_verification_url: z.url().nullable(),
  owner: UserResponseSchema,
  approximate_guild_count: z.int32(),
  approximate_user_install_count: z.int32(),
  approximate_user_authorization_count: z.int32(),
  event_webhooks_url: z.url().nullable().exactOptional(),
  event_webhooks_status: ApplicationEventWebhooksStatusSchema.exactOptional(),
  event_webhooks_types: z
    .array(ActionTypesSchema)
    .refine((val) => new Set(val).size === val.length)
    .exactOptional(),
  explicit_content_filter: ApplicationExplicitContentFilterTypesSchema,
  team: z.xor([z.null().nullable(), TeamResponseSchema]),
  eligible_oauth2_scopes: z.array(OAuth2ScopesSchema),
})

export type PrivateApplicationResponse = z.infer<typeof PrivateApplicationResponseSchema>

export const PrivateGuildMemberResponseSchema = z.object({
  avatar: z.string().nullable().meta({ description: "the member's guild avatar hash" }),
  avatar_decoration_data: z
    .xor([z.null().nullable(), UserAvatarDecorationResponseSchema])
    .meta({ description: "data for the member's guild avatar decoration" })
    .exactOptional(),
  banner: z.string().nullable().meta({ description: "the member's guild banner hash" }),
  communication_disabled_until: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({
      description:
        "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
    }),
  flags: z
    .int32()
    .meta({ description: 'guild member flags represented as a bit set, defaults to 0' }),
  joined_at: z.iso
    .datetime({ offset: true })
    .meta({ description: 'when the user joined the guild' }),
  nick: z.string().nullable().meta({ description: "this user's guild nickname" }),
  pending: z
    .boolean()
    .meta({
      description:
        "whether the user has not yet passed the guild's Membership Screening requirements",
    }),
  premium_since: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'when the user started boosting the guild' }),
  roles: z
    .array(SnowflakeTypeSchema)
    .refine((val) => new Set(val).size === val.length)
    .meta({ description: 'array of role object ids' }),
  collectibles: z
    .xor([z.null().nullable(), UserCollectiblesResponseSchema])
    .meta({ description: "data for the member's collectibles" })
    .exactOptional(),
  user: UserResponseSchema.meta({ description: 'the user this guild member represents' }),
  mute: z.boolean().meta({ description: 'whether the user is muted in voice channels' }),
  deaf: z.boolean().meta({ description: 'whether the user is deafened in voice channels' }),
  permissions: z.string().exactOptional(),
})

export type PrivateGuildMemberResponse = z.infer<typeof PrivateGuildMemberResponseSchema>

export const ProvisionalTokenResponseSchema = z.object({
  token_type: z.string(),
  access_token: z.string(),
  expires_in: z.int32(),
  scope: z.string(),
  id_token: z.string(),
  refresh_token: z.string().nullable().exactOptional(),
  scopes: z.array(z.string()).nullable().exactOptional(),
  expires_at_s: z.int32().nullable().exactOptional(),
})

export type ProvisionalTokenResponse = z.infer<typeof ProvisionalTokenResponseSchema>

export const PruneGuildRequestSchema = z.object({
  days: z.int().min(1).max(30).nullable().exactOptional(),
  compute_prune_count: z.boolean().nullable().exactOptional(),
  include_roles: z
    .xor([
      z.string(),
      z
        .array(SnowflakeTypeSchema)
        .max(100)
        .refine((val) => new Set(val).size === val.length),
      z.null().nullable(),
    ])
    .exactOptional(),
})

export type PruneGuildRequest = z.infer<typeof PruneGuildRequestSchema>

export const ReactionTypesSchema = z.xor([
  z.literal(0).meta({ description: 'Normal reaction type' }),
  z.literal(1).meta({ description: 'Burst reaction type' }),
])

export type ReactionTypes = z.infer<typeof ReactionTypesSchema>

export const SDKMessageRequestSchema = z.object({
  content: z.string().max(4000).nullable().exactOptional(),
  embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
  allowed_mentions: z
    .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
    .exactOptional(),
  sticker_ids: z.array(SnowflakeTypeSchema).max(3).nullable().exactOptional(),
  components: z
    .array(
      z.xor([
        ActionRowComponentForMessageRequestSchema,
        ContainerComponentForMessageRequestSchema,
        FileComponentForMessageRequestSchema,
        MediaGalleryComponentForMessageRequestSchema,
        SectionComponentForMessageRequestSchema,
        SeparatorComponentForMessageRequestSchema,
        TextDisplayComponentForMessageRequestSchema,
      ]),
    )
    .max(40)
    .nullable()
    .exactOptional(),
  flags: z.int().nullable().exactOptional(),
  attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
  poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
  shared_client_theme: z
    .xor([z.null().nullable(), CustomClientThemeShareRequestSchema])
    .exactOptional(),
  message_reference: z.xor([z.null().nullable(), MessageReferenceRequestSchema]).exactOptional(),
  nonce: z
    .xor([
      z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64().min(-9223372036854776000n).max(9223372036854776000n)),
      z.string().max(25),
      z.null().nullable(),
    ])
    .exactOptional(),
  enforce_nonce: z.boolean().nullable().exactOptional(),
  tts: z.boolean().nullable().exactOptional(),
})

export type SDKMessageRequest = z.infer<typeof SDKMessageRequestSchema>

export const SKUIneligibilityReasonSchema = z.xor([
  z.literal(0).meta({ description: 'Other / catch-all' }),
  z.literal(1).meta({ description: 'User already owns this SKU or one of its components' }),
  z.literal(2).meta({ description: 'User account is not on an eligible platform' }),
])

export type SKUIneligibilityReason = z.infer<typeof SKUIneligibilityReasonSchema>

export const ScheduledEventUserCountResponseSchema = z.object({
  guild_scheduled_event_count: z
    .int32()
    .meta({ description: 'The number of users subscribed to the scheduled event' }),
  guild_scheduled_event_exception_counts: z
    .record(z.string(), z.int32())
    .meta({ description: 'Map of exception IDs to user counts for each exception' }),
})

export type ScheduledEventUserCountResponse = z.infer<typeof ScheduledEventUserCountResponseSchema>

export const SearchIndexNotReadyResponseSchema = z.object({
  message: z.string(),
  code: z.int32(),
  documents_indexed: z.int32(),
  retry_after: z.int32(),
})

export type SearchIndexNotReadyResponse = z.infer<typeof SearchIndexNotReadyResponseSchema>

export const SearchableEmbedTypeSchema = z.xor([
  z.literal('image'),
  z.literal('video'),
  z.literal('gif'),
  z.literal('sound'),
  z.literal('article'),
])

export type SearchableEmbedType = z.infer<typeof SearchableEmbedTypeSchema>

export const WebhookSlackEmbedFieldSchema = z.object({
  name: z.string().max(152133).nullable().exactOptional(),
  value: z.string().max(152133).nullable().exactOptional(),
  inline: z.boolean().nullable().exactOptional(),
})

export type WebhookSlackEmbedField = z.infer<typeof WebhookSlackEmbedFieldSchema>

export const WebhookSlackEmbedSchema = z.object({
  title: z.string().max(152133).nullable().exactOptional(),
  title_link: z.url().max(2048).nullable().exactOptional(),
  text: z.string().max(152133).nullable().exactOptional(),
  color: z
    .string()
    .regex(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/)
    .max(7)
    .nullable()
    .exactOptional(),
  ts: z.int().nullable().exactOptional(),
  pretext: z.string().max(152133).nullable().exactOptional(),
  footer: z.string().max(152133).nullable().exactOptional(),
  footer_icon: z.url().max(2048).nullable().exactOptional(),
  author_name: z.string().max(152133).nullable().exactOptional(),
  author_link: z.url().max(2048).nullable().exactOptional(),
  author_icon: z.url().max(2048).nullable().exactOptional(),
  image_url: z.url().max(2048).nullable().exactOptional(),
  thumb_url: z.url().max(2048).nullable().exactOptional(),
  fields: z.array(WebhookSlackEmbedFieldSchema).max(1521).nullable().exactOptional(),
})

export type WebhookSlackEmbed = z.infer<typeof WebhookSlackEmbedSchema>

export const SlackWebhookSchema = z.object({
  text: z.string().max(2000).nullable().exactOptional(),
  username: z.string().max(152133).nullable().exactOptional(),
  icon_url: z.url().max(2048).nullable().exactOptional(),
  attachments: z.array(WebhookSlackEmbedSchema).max(1521).nullable().exactOptional(),
})

export type SlackWebhook = z.infer<typeof SlackWebhookSchema>

export const SocialLayerSKUPurchaseEligibilityCallbackDataSchema = z.object({
  eligible: z.boolean(),
  ineligible_reason: z.xor([z.null().nullable(), SKUIneligibilityReasonSchema]).exactOptional(),
  ineligible_reason_description: z.string().max(255).nullable().exactOptional(),
})

export type SocialLayerSKUPurchaseEligibilityCallbackData = z.infer<
  typeof SocialLayerSKUPurchaseEligibilityCallbackDataSchema
>

export const SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema = z.object({
  type: InteractionCallbackTypesSchema,
  data: SocialLayerSKUPurchaseEligibilityCallbackDataSchema,
})

export type SocialLayerSKUPurchaseEligibilityInteractionCallbackRequest = z.infer<
  typeof SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema
>

export const SortingModeSchema = z.xor([z.literal('relevance'), z.literal('timestamp')])

export type SortingMode = z.infer<typeof SortingModeSchema>

export const SortingOrderSchema = z.xor([z.literal('asc'), z.literal('desc')])

export type SortingOrder = z.infer<typeof SortingOrderSchema>

export const SoundboardCreateRequestSchema = z.object({
  name: z.string().min(2).max(32),
  volume: z.number().min(0).max(1).nullable().exactOptional(),
  emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  emoji_name: z.string().min(1).max(32).nullable().exactOptional(),
  sound: z.string(),
})

export type SoundboardCreateRequest = z.infer<typeof SoundboardCreateRequestSchema>

export const SoundboardPatchRequestPartialSchema = z.object({
  name: z.string().min(2).max(32).exactOptional(),
  volume: z.number().min(0).max(1).nullable().exactOptional(),
  emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  emoji_name: z.string().min(1).max(32).nullable().exactOptional(),
})

export type SoundboardPatchRequestPartial = z.infer<typeof SoundboardPatchRequestPartialSchema>

export const SoundboardSoundSendRequestSchema = z.object({
  sound_id: SnowflakeTypeSchema,
  source_guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
})

export type SoundboardSoundSendRequest = z.infer<typeof SoundboardSoundSendRequestSchema>

export const StageInstancesPrivacyLevelsSchema = z.xor([
  z.literal(1).meta({ description: 'The Stage instance is visible publicly. (deprecated)' }),
  z.literal(2).meta({ description: 'The Stage instance is visible to only guild members.' }),
])

export type StageInstancesPrivacyLevels = z.infer<typeof StageInstancesPrivacyLevelsSchema>

export const StageInstanceResponseSchema = z.object({
  guild_id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  topic: z.string(),
  privacy_level: StageInstancesPrivacyLevelsSchema,
  id: SnowflakeTypeSchema,
  discoverable_disabled: z.boolean(),
  guild_scheduled_event_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
})

export type StageInstanceResponse = z.infer<typeof StageInstanceResponseSchema>

export const StageScheduledEventCreateRequestSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(1000).nullable().exactOptional(),
  image: z.string().nullable().exactOptional(),
  scheduled_start_time: z.iso.datetime({ offset: true }),
  scheduled_end_time: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  recurrence_rule: z
    .xor([z.null().nullable(), RecurrenceRuleSchema])
    .meta({ description: 'Recurrence rule for the scheduled event' })
    .exactOptional(),
  entity_metadata: z.xor([z.null().nullable(), EntityMetadataStageInstanceSchema]).exactOptional(),
})

export type StageScheduledEventCreateRequest = z.infer<
  typeof StageScheduledEventCreateRequestSchema
>

export const StageScheduledEventPatchRequestPartialSchema = z.object({
  status: z.xor([z.null().nullable(), GuildScheduledEventStatusesSchema]).exactOptional(),
  name: z.string().max(100).exactOptional(),
  description: z.string().max(1000).nullable().exactOptional(),
  image: z.string().nullable().exactOptional(),
  scheduled_start_time: z.iso.datetime({ offset: true }).exactOptional(),
  scheduled_end_time: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  entity_type: z.xor([z.null().nullable(), GuildScheduledEventEntityTypesSchema]).exactOptional(),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.exactOptional(),
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  recurrence_rule: z
    .xor([z.null().nullable(), RecurrenceRuleSchema])
    .meta({ description: 'Recurrence rule for the scheduled event' })
    .exactOptional(),
  entity_metadata: z.xor([z.null().nullable(), EntityMetadataStageInstanceSchema]).exactOptional(),
})

export type StageScheduledEventPatchRequestPartial = z.infer<
  typeof StageScheduledEventPatchRequestPartialSchema
>

export const StickerPackResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  sku_id: SnowflakeTypeSchema,
  name: z.string(),
  description: z.string().nullable(),
  stickers: z.array(StandardStickerResponseSchema),
  cover_sticker_id: SnowflakeTypeSchema.exactOptional(),
  banner_asset_id: SnowflakeTypeSchema.exactOptional(),
})

export type StickerPackResponse = z.infer<typeof StickerPackResponseSchema>

export const StickerPackCollectionResponseSchema = z.object({
  sticker_packs: z.array(StickerPackResponseSchema),
})

export type StickerPackCollectionResponse = z.infer<typeof StickerPackCollectionResponseSchema>

export const SubscriptionResponseStatusTypeSchema = z.xor([
  z.literal(0).meta({ description: 'Subscription is active and scheduled to renew' }),
  z.literal(1).meta({ description: 'Subscription is inactive and not being charged' }),
  z.literal(2).meta({ description: 'Subscription is active but will not renew' }),
])

export type SubscriptionResponseStatusType = z.infer<typeof SubscriptionResponseStatusTypeSchema>

export const SubscriptionResponseSchema = z.object({
  id: SnowflakeTypeSchema.meta({ description: 'ID of the subscription' }),
  user_id: SnowflakeTypeSchema.meta({ description: 'ID of the user who is subscribed' }),
  sku_ids: z
    .array(SnowflakeTypeSchema)
    .refine((val) => new Set(val).size === val.length)
    .meta({ description: 'List of SKUs subscribed to' }),
  renewal_sku_ids: z
    .array(SnowflakeTypeSchema)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .meta({ description: 'List of SKUs that this user will be subscribed to at renewal' }),
  entitlement_ids: z
    .array(SnowflakeTypeSchema)
    .refine((val) => new Set(val).size === val.length)
    .meta({ description: 'List of entitlements granted for this subscription' }),
  current_period_start: z.iso
    .datetime({ offset: true })
    .meta({ description: 'Start of the current subscription period' }),
  current_period_end: z.iso
    .datetime({ offset: true })
    .meta({ description: 'End of the current subscription period' }),
  status: SubscriptionResponseStatusTypeSchema.meta({
    description: 'Current status of the subscription',
  }),
  canceled_at: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'When the subscription was canceled' }),
  country: z
    .string()
    .nullable()
    .meta({
      description:
        'ISO3166-1 alpha-2 country code of the payment source used to purchase the subscription',
    })
    .exactOptional(),
})

export type SubscriptionResponse = z.infer<typeof SubscriptionResponseSchema>

export const TargetUsersJobStatusTypesSchema = z.xor([
  z.literal(0).meta({ description: 'The default value.' }),
  z.literal(1).meta({ description: 'The job is still being processed.' }),
  z.literal(2).meta({ description: 'The job has been completed successfully.' }),
  z
    .literal(3)
    .meta({ description: 'The job has failed, see error_message field for more details.' }),
])

export type TargetUsersJobStatusTypes = z.infer<typeof TargetUsersJobStatusTypesSchema>

export const TargetUsersJobStatusResponseSchema = z.object({
  status: TargetUsersJobStatusTypesSchema.meta({
    description: 'The status of the job processing the target users.',
  }),
  total_users: UInt32TypeSchema.meta({
    description: 'The total number of users in the provided list.',
  }),
  processed_users: UInt32TypeSchema.meta({ description: 'The number of users processed so far.' }),
  created_at: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'The timestamp when the job was created.' }),
  completed_at: z.iso
    .datetime({ offset: true })
    .nullable()
    .meta({ description: 'The timestamp when the job was successfully completed.' }),
  error_message: z
    .string()
    .nullable()
    .meta({ description: 'The error message if the job failed.' }),
})

export type TargetUsersJobStatusResponse = z.infer<typeof TargetUsersJobStatusResponseSchema>

export const ThreadSearchResponseSchema = z.object({
  threads: z.array(ThreadResponseSchema),
  members: z.array(ThreadMemberResponseSchema),
  has_more: z.boolean(),
  first_messages: z.array(MessageResponseSchema).exactOptional(),
  total_results: z.int32(),
})

export type ThreadSearchResponse = z.infer<typeof ThreadSearchResponseSchema>

export const ThreadSortingModeSchema = z.xor([
  z.literal('relevance'),
  z.literal('creation_time'),
  z.literal('last_message_time'),
  z.literal('archive_time'),
])

export type ThreadSortingMode = z.infer<typeof ThreadSortingModeSchema>

export const ThreadsResponseSchema = z.object({
  threads: z.array(ThreadResponseSchema),
  members: z.array(ThreadMemberResponseSchema),
  has_more: z.boolean(),
  first_messages: z.array(MessageResponseSchema).exactOptional(),
})

export type ThreadsResponse = z.infer<typeof ThreadsResponseSchema>

export const TypingIndicatorResponseSchema = z.object({})

export type TypingIndicatorResponse = z.infer<typeof TypingIndicatorResponseSchema>

export const UnbanUserFromGuildRequestSchema = z.object({})

export type UnbanUserFromGuildRequest = z.infer<typeof UnbanUserFromGuildRequestSchema>

export const UpdateApplicationUserRoleConnectionRequestSchema = z.object({
  platform_name: z.string().max(50).nullable().exactOptional(),
  platform_username: z.string().max(100).nullable().exactOptional(),
  metadata: z.record(z.string(), z.string().min(1).max(100)).nullable().exactOptional(),
})

export type UpdateApplicationUserRoleConnectionRequest = z.infer<
  typeof UpdateApplicationUserRoleConnectionRequestSchema
>

export const UpdateDMRequestPartialSchema = z.object({
  name: z.string().min(0).max(100).nullable().exactOptional(),
})

export type UpdateDMRequestPartial = z.infer<typeof UpdateDMRequestPartialSchema>

export const UpdateGroupDMRequestPartialSchema = z.object({
  name: z.string().min(0).max(100).nullable().exactOptional(),
  icon: z.string().nullable().exactOptional(),
})

export type UpdateGroupDMRequestPartial = z.infer<typeof UpdateGroupDMRequestPartialSchema>

export const UpdateThreadTagRequestSchema = z.object({
  name: z.string().min(0).max(50),
  emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  emoji_name: z.string().max(100).nullable().exactOptional(),
  moderated: z.boolean().nullable().exactOptional(),
  id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
})

export type UpdateThreadTagRequest = z.infer<typeof UpdateThreadTagRequestSchema>

export const UpdateGuildChannelRequestPartialSchema = z.object({
  type: z.xor([z.null().nullable(), ChannelTypesSchema]).exactOptional(),
  name: z.string().min(1).max(100).exactOptional(),
  position: z.int32().min(0).nullable().exactOptional(),
  topic: z.string().min(0).max(4096).nullable().exactOptional(),
  bitrate: z.int32().min(8000).nullable().exactOptional(),
  user_limit: z.int32().min(0).nullable().exactOptional(),
  nsfw: z.boolean().nullable().exactOptional(),
  rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
  parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  permission_overwrites: z
    .array(ChannelPermissionOverwriteRequestSchema)
    .max(100)
    .nullable()
    .exactOptional(),
  rtc_region: z.string().nullable().exactOptional(),
  video_quality_mode: z.xor([z.null().nullable(), VideoQualityModesSchema]).exactOptional(),
  default_auto_archive_duration: z
    .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
    .exactOptional(),
  default_reaction_emoji: z
    .xor([z.null().nullable(), UpdateDefaultReactionEmojiRequestSchema])
    .exactOptional(),
  default_thread_rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
  default_sort_order: z.xor([z.null().nullable(), ThreadSortOrderSchema]).exactOptional(),
  default_forum_layout: z.xor([z.null().nullable(), ForumLayoutSchema]).exactOptional(),
  default_tag_setting: z.xor([z.null().nullable(), ThreadSearchTagSettingSchema]).exactOptional(),
  flags: z.int().nullable().exactOptional(),
  available_tags: z.array(UpdateThreadTagRequestSchema).max(20).nullable().exactOptional(),
})

export type UpdateGuildChannelRequestPartial = z.infer<
  typeof UpdateGuildChannelRequestPartialSchema
>

export const UpdateOnboardingPromptRequestSchema = z.object({
  title: z.string().min(1).max(100),
  options: z.array(OnboardingPromptOptionRequestSchema).min(1).max(50),
  single_select: z.boolean().nullable().exactOptional(),
  required: z.boolean().nullable().exactOptional(),
  in_onboarding: z.boolean().nullable().exactOptional(),
  type: z.xor([z.null().nullable(), OnboardingPromptTypeSchema]).exactOptional(),
  id: SnowflakeTypeSchema,
})

export type UpdateOnboardingPromptRequest = z.infer<typeof UpdateOnboardingPromptRequestSchema>

export const UpdateGuildOnboardingRequestSchema = z.object({
  prompts: z.array(UpdateOnboardingPromptRequestSchema).max(15).nullable().exactOptional(),
  enabled: z.boolean().nullable().exactOptional(),
  default_channel_ids: z
    .array(SnowflakeTypeSchema)
    .max(500)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  mode: z.xor([z.null().nullable(), GuildOnboardingModeSchema]).exactOptional(),
})

export type UpdateGuildOnboardingRequest = z.infer<typeof UpdateGuildOnboardingRequestSchema>

export const UpdateMessageInteractionCallbackRequestSchema = z.object({
  type: InteractionCallbackTypesSchema,
  data: z
    .xor([z.null().nullable(), IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema])
    .exactOptional(),
})

export type UpdateMessageInteractionCallbackRequest = z.infer<
  typeof UpdateMessageInteractionCallbackRequestSchema
>

export const UpdateRolePositionsRequestSchema = z.object({
  id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  position: z.int32().nullable().exactOptional(),
})

export type UpdateRolePositionsRequest = z.infer<typeof UpdateRolePositionsRequestSchema>

export const UpdateRoleRequestPartialSchema = z.object({
  name: z.string().min(1).max(100).nullable().exactOptional(),
  permissions: z.int().nullable().exactOptional(),
  color: z.int().min(0).max(16777215).nullable().exactOptional(),
  colors: z.xor([z.null().nullable(), RoleColorsSchema]).exactOptional(),
  hoist: z.boolean().nullable().exactOptional(),
  mentionable: z.boolean().nullable().exactOptional(),
  icon: z.string().nullable().exactOptional(),
  unicode_emoji: z.string().max(100).nullable().exactOptional(),
})

export type UpdateRoleRequestPartial = z.infer<typeof UpdateRoleRequestPartialSchema>

export const UpdateSelfVoiceStateRequestPartialSchema = z.object({
  request_to_speak_timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  suppress: z.boolean().nullable().exactOptional(),
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
})

export type UpdateSelfVoiceStateRequestPartial = z.infer<
  typeof UpdateSelfVoiceStateRequestPartialSchema
>

export const UpdateThreadRequestPartialSchema = z.object({
  name: z.string().min(0).max(100).nullable().exactOptional(),
  archived: z.boolean().nullable().exactOptional(),
  locked: z.boolean().nullable().exactOptional(),
  invitable: z.boolean().nullable().exactOptional(),
  auto_archive_duration: z
    .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
    .exactOptional(),
  rate_limit_per_user: z.int32().min(0).max(21600).nullable().exactOptional(),
  flags: z.int().nullable().exactOptional(),
  applied_tags: z.array(SnowflakeTypeSchema).max(5).nullable().exactOptional(),
  bitrate: z.int32().min(8000).nullable().exactOptional(),
  user_limit: z.int().min(0).max(99).nullable().exactOptional(),
  rtc_region: z.string().nullable().exactOptional(),
  video_quality_mode: z.xor([z.null().nullable(), VideoQualityModesSchema]).exactOptional(),
})

export type UpdateThreadRequestPartial = z.infer<typeof UpdateThreadRequestPartialSchema>

export const UpdateVoiceStateRequestPartialSchema = z.object({
  suppress: z.boolean().nullable().exactOptional(),
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
})

export type UpdateVoiceStateRequestPartial = z.infer<typeof UpdateVoiceStateRequestPartialSchema>

export const UserGuildOnboardingResponseSchema = z.object({
  guild_id: SnowflakeTypeSchema,
  prompts: z.array(OnboardingPromptResponseSchema),
  default_channel_ids: z
    .array(SnowflakeTypeSchema)
    .refine((val) => new Set(val).size === val.length),
  enabled: z.boolean(),
  mode: GuildOnboardingModeSchema,
})

export type UserGuildOnboardingResponse = z.infer<typeof UserGuildOnboardingResponseSchema>

export const UserPIIResponseSchema = z.object({
  id: SnowflakeTypeSchema.meta({ description: "the user's id" }),
  username: z.string().meta({ description: "the user's username, not unique across the platform" }),
  avatar: z.string().nullable().meta({ description: "the user's avatar hash" }),
  discriminator: z.string().meta({ description: "the user's Discord-tag" }),
  public_flags: z.int32().meta({ description: "the public flags on a user's account" }),
  flags: Int53TypeSchema.meta({ description: "the flags on a user's account" }),
  bot: z
    .boolean()
    .meta({ description: 'whether the user belongs to an OAuth2 application' })
    .exactOptional(),
  system: z
    .boolean()
    .meta({
      description:
        'whether the user is an Official Discord System user (part of the urgent message system)',
    })
    .exactOptional(),
  banner: z.string().nullable().meta({ description: "the user's banner hash" }).exactOptional(),
  accent_color: z
    .int32()
    .nullable()
    .meta({
      description:
        "the user's banner color encoded as an integer representation of hexadecimal color code",
    })
    .exactOptional(),
  global_name: z.string().nullable().meta({ description: "the user's display name, if it is set" }),
  avatar_decoration_data: z
    .xor([z.null().nullable(), UserAvatarDecorationResponseSchema])
    .meta({ description: "data for the user's avatar decoration" })
    .exactOptional(),
  collectibles: z
    .xor([z.null().nullable(), UserCollectiblesResponseSchema])
    .meta({ description: "data for the user's collectibles" })
    .exactOptional(),
  primary_guild: z.xor([z.null().nullable(), UserPrimaryGuildResponseSchema]).exactOptional(),
  mfa_enabled: z.boolean(),
  locale: AvailableLocalesEnumSchema,
  premium_type: PremiumTypesSchema.exactOptional(),
  email: z.string().nullable().exactOptional(),
  verified: z.boolean().exactOptional(),
})

export type UserPIIResponse = z.infer<typeof UserPIIResponseSchema>

export const UserProfileMetadataSchema = z.object({
  keyword_filter: z.array(z.string().min(1).max(60)).max(1000).nullable().exactOptional(),
  regex_patterns: z.array(z.string().min(1).max(260)).max(10).nullable().exactOptional(),
  allow_list: z.array(z.string().min(1).max(60)).max(100).nullable().exactOptional(),
})

export type UserProfileMetadata = z.infer<typeof UserProfileMetadataSchema>

export const UserProfileUpsertRequestSchema = z.object({
  name: z.string().max(100),
  event_type: AutomodEventTypeSchema,
  actions: z
    .array(
      z.xor([
        BlockMessageActionSchema,
        FlagToChannelActionSchema,
        QuarantineUserActionSchema,
        UserCommunicationDisabledActionSchema,
      ]),
    )
    .min(1)
    .max(5)
    .nullable()
    .exactOptional(),
  enabled: z.boolean().nullable().exactOptional(),
  exempt_roles: z
    .array(SnowflakeTypeSchema)
    .max(20)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  exempt_channels: z
    .array(SnowflakeTypeSchema)
    .max(50)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: UserProfileMetadataSchema,
})

export type UserProfileUpsertRequest = z.infer<typeof UserProfileUpsertRequestSchema>

export const UserProfileUpsertRequestPartialSchema = z.object({
  name: z.string().max(100).exactOptional(),
  event_type: AutomodEventTypeSchema.exactOptional(),
  actions: z
    .array(
      z.xor([
        BlockMessageActionSchema,
        FlagToChannelActionSchema,
        QuarantineUserActionSchema,
        UserCommunicationDisabledActionSchema,
      ]),
    )
    .min(1)
    .max(5)
    .nullable()
    .exactOptional(),
  enabled: z.boolean().nullable().exactOptional(),
  exempt_roles: z
    .array(SnowflakeTypeSchema)
    .max(20)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  exempt_channels: z
    .array(SnowflakeTypeSchema)
    .max(50)
    .refine((val) => new Set(val).size === val.length)
    .nullable()
    .exactOptional(),
  trigger_type: AutomodTriggerTypeSchema.exactOptional(),
  trigger_metadata: UserProfileMetadataSchema.exactOptional(),
})

export type UserProfileUpsertRequestPartial = z.infer<typeof UserProfileUpsertRequestPartialSchema>

export const VanityURLErrorResponseSchema = z.object({ message: z.string(), code: z.int32() })

export type VanityURLErrorResponse = z.infer<typeof VanityURLErrorResponseSchema>

export const VanityURLResponseSchema = z.object({
  code: z.string().nullable(),
  uses: z.int32(),
  error: z.xor([z.null().nullable(), VanityURLErrorResponseSchema]).exactOptional(),
})

export type VanityURLResponse = z.infer<typeof VanityURLResponseSchema>

export const VoiceRegionResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  custom: z.boolean(),
  deprecated: z.boolean(),
  optimal: z.boolean(),
})

export type VoiceRegionResponse = z.infer<typeof VoiceRegionResponseSchema>

export const VoiceScheduledEventCreateRequestSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(1000).nullable().exactOptional(),
  image: z.string().nullable().exactOptional(),
  scheduled_start_time: z.iso.datetime({ offset: true }),
  scheduled_end_time: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  recurrence_rule: z
    .xor([z.null().nullable(), RecurrenceRuleSchema])
    .meta({ description: 'Recurrence rule for the scheduled event' })
    .exactOptional(),
  entity_metadata: z.xor([z.null().nullable(), EntityMetadataVoiceSchema]).exactOptional(),
})

export type VoiceScheduledEventCreateRequest = z.infer<
  typeof VoiceScheduledEventCreateRequestSchema
>

export const VoiceScheduledEventPatchRequestPartialSchema = z.object({
  status: z.xor([z.null().nullable(), GuildScheduledEventStatusesSchema]).exactOptional(),
  name: z.string().max(100).exactOptional(),
  description: z.string().max(1000).nullable().exactOptional(),
  image: z.string().nullable().exactOptional(),
  scheduled_start_time: z.iso.datetime({ offset: true }).exactOptional(),
  scheduled_end_time: z.iso.datetime({ offset: true }).nullable().exactOptional(),
  entity_type: z.xor([z.null().nullable(), GuildScheduledEventEntityTypesSchema]).exactOptional(),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.exactOptional(),
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
  recurrence_rule: z
    .xor([z.null().nullable(), RecurrenceRuleSchema])
    .meta({ description: 'Recurrence rule for the scheduled event' })
    .exactOptional(),
  entity_metadata: z.xor([z.null().nullable(), EntityMetadataVoiceSchema]).exactOptional(),
})

export type VoiceScheduledEventPatchRequestPartial = z.infer<
  typeof VoiceScheduledEventPatchRequestPartialSchema
>

export const VoiceStateResponseSchema = z.object({
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  deaf: z.boolean(),
  guild_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
  member: GuildMemberResponseSchema.exactOptional(),
  mute: z.boolean(),
  request_to_speak_timestamp: z.iso.datetime({ offset: true }).nullable(),
  suppress: z.boolean(),
  self_stream: z.boolean().nullable(),
  self_deaf: z.boolean(),
  self_mute: z.boolean(),
  self_video: z.boolean(),
  session_id: z.string(),
  user_id: SnowflakeTypeSchema,
})

export type VoiceStateResponse = z.infer<typeof VoiceStateResponseSchema>

export const WelcomeScreenPatchRequestPartialSchema = z.object({
  description: z.string().max(140).nullable().exactOptional(),
  welcome_channels: z.array(GuildWelcomeChannelSchema).max(5).nullable().exactOptional(),
  enabled: z.boolean().nullable().exactOptional(),
})

export type WelcomeScreenPatchRequestPartial = z.infer<
  typeof WelcomeScreenPatchRequestPartialSchema
>

export const WidgetActivitySchema = z.object({ name: z.string() })

export type WidgetActivity = z.infer<typeof WidgetActivitySchema>

export const WidgetChannelSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  position: z.int32(),
})

export type WidgetChannel = z.infer<typeof WidgetChannelSchema>

export const WidgetImageStylesSchema = z.xor([
  z
    .literal('shield')
    .meta({ description: 'shield style widget with Discord icon and guild members online count' }),
  z
    .literal('banner1')
    .meta({
      description:
        'large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget',
    }),
  z
    .literal('banner2')
    .meta({
      description:
        'smaller widget style with guild icon, name and online count. Split on the right with Discord logo',
    }),
  z
    .literal('banner3')
    .meta({
      description:
        'large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right',
    }),
  z
    .literal('banner4')
    .meta({
      description:
        'large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom',
    }),
])

export type WidgetImageStyles = z.infer<typeof WidgetImageStylesSchema>

export const WidgetUserDiscriminatorSchema = z.xor([z.literal('0000')])

export type WidgetUserDiscriminator = z.infer<typeof WidgetUserDiscriminatorSchema>

export const WidgetMemberSchema = z.object({
  id: z.string(),
  username: z.string(),
  discriminator: WidgetUserDiscriminatorSchema,
  avatar: z.null().nullable(),
  status: z.string(),
  avatar_url: z.url(),
  activity: WidgetActivitySchema.exactOptional(),
  deaf: z.boolean().exactOptional(),
  mute: z.boolean().exactOptional(),
  self_deaf: z.boolean().exactOptional(),
  self_mute: z.boolean().exactOptional(),
  suppress: z.boolean().exactOptional(),
  channel_id: SnowflakeTypeSchema.exactOptional(),
})

export type WidgetMember = z.infer<typeof WidgetMemberSchema>

export const WidgetResponseSchema = z.object({
  id: SnowflakeTypeSchema,
  name: z.string(),
  instant_invite: z.string().nullable(),
  channels: z.array(WidgetChannelSchema),
  members: z.array(WidgetMemberSchema),
  presence_count: z.int32(),
})

export type WidgetResponse = z.infer<typeof WidgetResponseSchema>

export const WidgetSettingsResponseSchema = z.object({
  enabled: z.boolean(),
  channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]),
})

export type WidgetSettingsResponse = z.infer<typeof WidgetSettingsResponseSchema>

export const ErrorSchema = z
  .object({
    code: z.int().meta({ description: 'Discord internal error code. See error code reference' }),
    message: z.string().meta({ description: 'Human-readable error message' }),
  })
  .meta({ description: 'A single error, either for an API response or a specific field.' })

export type Error = z.infer<typeof ErrorSchema>

export const InnerErrorsSchema = z.strictObject({
  _errors: z.array(ErrorSchema).meta({ description: 'The list of errors for this field' }),
})

export type InnerErrors = z.infer<typeof InnerErrorsSchema>

type ErrorDetailsType = { [key: string]: ErrorDetailsType } | z.infer<typeof InnerErrorsSchema>

export const ErrorDetailsSchema: z.ZodType<ErrorDetailsType> = z.xor([
  z.record(
    z.string(),
    z.lazy(() => ErrorDetailsSchema),
  ),
  InnerErrorsSchema,
])

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>

export const ErrorResponseSchema = z
  .intersection(ErrorSchema, z.object({ errors: ErrorDetailsSchema.exactOptional() }))
  .meta({ description: 'Errors object returned by the Discord API' })

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

export const RatelimitedResponseSchema = z
  .intersection(
    ErrorSchema,
    z.object({
      retry_after: z
        .number()
        .meta({ description: 'The number of seconds to wait before retrying your request' }),
      global: z
        .boolean()
        .meta({
          description:
            'Whether you are being ratelimited by the global ratelimit or a per-endpoint ratelimit',
        }),
    }),
  )
  .meta({ description: 'Ratelimit error object returned by the Discord API' })

export type RatelimitedResponse = z.infer<typeof RatelimitedResponseSchema>

export const XRateLimitLimitHeaderSchema = z.int()
export const XRateLimitRemainingHeaderSchema = z.int()
export const XRateLimitResetHeaderSchema = z.number()
export const XRateLimitResetAfterHeaderSchema = z.number()
export const XRateLimitBucketHeaderSchema = z.string()

export const BotTokenSecurityScheme = {
  type: 'apiKey',
  description: 'Discord bot token',
  name: 'Authorization',
  in: 'header',
}
export const OAuth2SecurityScheme = {
  type: 'oauth2',
  flows: {
    implicit: {
      authorizationUrl: 'https://discord.com/api/oauth2/authorize',
      refreshUrl: 'https://discord.com/api/oauth2/token',
      scopes: {
        'activities.invites.write':
          'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
        'activities.read':
          'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
        'activities.write':
          "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
        'applications.builds.read': "allows your app to read build data for a user's applications",
        'applications.builds.upload':
          "allows your app to upload/update builds for a user's applications - requires Discord approval",
        'applications.commands': 'allows your app to use commands in a guild',
        'applications.commands.permissions.update':
          'allows your app to update permissions for its commands in a guild a user has permissions to',
        'applications.entitlements':
          "allows your app to read entitlements for a user's applications",
        'applications.store.update':
          "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
        bot: "for oauth2 bots, this puts the bot in the user's selected guild by default",
        connections: 'allows /users/@me/connections to return linked third-party accounts',
        'dm_channels.read':
          "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
        email: 'enables /users/@me to return an email',
        'gdm.join': 'allows your app to join users to a group dm',
        guilds: "allows /users/@me/guilds to return basic information about all of a user's guilds",
        'guilds.join':
          'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
        'guilds.members.read':
          "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
        identify: 'allows /users/@me without email',
        'messages.read':
          'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
        openid:
          'for OpenID Connect, this allows your app to receive user id and basic profile information',
        'relationships.read':
          "allows your app to know a user's friends and implicit relationships - requires Discord approval",
        rpc: "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
        'rpc.activities.write':
          "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
        'rpc.notifications.read':
          'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
        'rpc.screenshare.read':
          "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
        'rpc.screenshare.write':
          "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
        'rpc.video.read':
          "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
        'rpc.video.write':
          "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
        'rpc.voice.read':
          "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
        'rpc.voice.write':
          "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
        voice:
          "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
        'webhook.incoming':
          'this generates a webhook that is returned in the oauth token response for authorization code grants',
      },
    },
    clientCredentials: {
      tokenUrl: 'https://discord.com/api/oauth2/token',
      refreshUrl: 'https://discord.com/api/oauth2/token',
      scopes: {
        'activities.invites.write':
          'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
        'activities.read':
          'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
        'activities.write':
          "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
        'applications.builds.read': "allows your app to read build data for a user's applications",
        'applications.builds.upload':
          "allows your app to upload/update builds for a user's applications - requires Discord approval",
        'applications.commands': 'allows your app to use commands in a guild',
        'applications.commands.permissions.update':
          'allows your app to update permissions for its commands in a guild a user has permissions to',
        'applications.commands.update':
          'allows your app to update its commands using a Bearer token - client credentials grant only',
        'applications.entitlements':
          "allows your app to read entitlements for a user's applications",
        'applications.store.update':
          "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
        bot: "for oauth2 bots, this puts the bot in the user's selected guild by default",
        connections: 'allows /users/@me/connections to return linked third-party accounts',
        'dm_channels.read':
          "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
        email: 'enables /users/@me to return an email',
        'gdm.join': 'allows your app to join users to a group dm',
        guilds: "allows /users/@me/guilds to return basic information about all of a user's guilds",
        'guilds.join':
          'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
        'guilds.members.read':
          "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
        identify: 'allows /users/@me without email',
        'messages.read':
          'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
        openid:
          'for OpenID Connect, this allows your app to receive user id and basic profile information',
        'relationships.read':
          "allows your app to know a user's friends and implicit relationships - requires Discord approval",
        rpc: "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
        'rpc.activities.write':
          "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
        'rpc.notifications.read':
          'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
        'rpc.screenshare.read':
          "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
        'rpc.screenshare.write':
          "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
        'rpc.video.read':
          "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
        'rpc.video.write':
          "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
        'rpc.voice.read':
          "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
        'rpc.voice.write':
          "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
        voice:
          "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
        'webhook.incoming':
          'this generates a webhook that is returned in the oauth token response for authorization code grants',
      },
    },
    authorizationCode: {
      authorizationUrl: 'https://discord.com/api/oauth2/authorize',
      tokenUrl: 'https://discord.com/api/oauth2/token',
      refreshUrl: 'https://discord.com/api/oauth2/token',
      scopes: {
        'activities.invites.write':
          'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
        'activities.read':
          'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
        'activities.write':
          "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
        'applications.builds.read': "allows your app to read build data for a user's applications",
        'applications.builds.upload':
          "allows your app to upload/update builds for a user's applications - requires Discord approval",
        'applications.commands': 'allows your app to use commands in a guild',
        'applications.commands.permissions.update':
          'allows your app to update permissions for its commands in a guild a user has permissions to',
        'applications.entitlements':
          "allows your app to read entitlements for a user's applications",
        'applications.store.update':
          "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
        bot: "for oauth2 bots, this puts the bot in the user's selected guild by default",
        connections: 'allows /users/@me/connections to return linked third-party accounts',
        'dm_channels.read':
          "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
        email: 'enables /users/@me to return an email',
        'gdm.join': 'allows your app to join users to a group dm',
        guilds: "allows /users/@me/guilds to return basic information about all of a user's guilds",
        'guilds.join':
          'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
        'guilds.members.read':
          "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
        identify: 'allows /users/@me without email',
        'messages.read':
          'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
        openid:
          'for OpenID Connect, this allows your app to receive user id and basic profile information',
        'relationships.read':
          "allows your app to know a user's friends and implicit relationships - requires Discord approval",
        'role_connections.write':
          "allows your app to update a user's connection and metadata for the app",
        rpc: "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
        'rpc.activities.write':
          "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
        'rpc.notifications.read':
          'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
        'rpc.screenshare.read':
          "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
        'rpc.screenshare.write':
          "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
        'rpc.video.read':
          "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
        'rpc.video.write':
          "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
        'rpc.voice.read':
          "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
        'rpc.voice.write':
          "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
        voice:
          "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
        'webhook.incoming':
          'this generates a webhook that is returned in the oauth token response for authorization code grants',
      },
    },
  },
}

export const ClientErrorResponseResponse = {
  description: 'Client error response',
  headers: {
    'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
    'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
    'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
    'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
    'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
  },
  content: { 'application/json': { schema: ErrorResponseSchema } },
}
export const ClientRatelimitedResponseResponse = {
  description: 'Client ratelimited response',
  headers: {
    'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
    'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
    'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
    'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
    'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
  },
  content: { 'application/json': { schema: RatelimitedResponseSchema } },
}
