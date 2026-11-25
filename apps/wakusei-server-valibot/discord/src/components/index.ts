import * as v from 'valibot'

export const AccountResponseSchema = v.object({ id: v.string(), name: v.nullable(v.string()) })

export type AccountResponseSchema = v.InferOutput<typeof AccountResponseSchema>

export const MessageComponentTypesSchema = v.union([
  v.pipe(v.literal(1), v.description('Container for other components')),
  v.pipe(v.literal(2), v.description('Button object')),
  v.pipe(v.literal(3), v.description('Select menu for picking from defined text options')),
  v.pipe(v.literal(4), v.description('Text input object')),
  v.pipe(v.literal(5), v.description('Select menu for users')),
  v.pipe(v.literal(6), v.description('Select menu for roles')),
  v.pipe(v.literal(7), v.description('Select menu for mentionables (users and roles)')),
  v.pipe(v.literal(8), v.description('Select menu for channels')),
  v.pipe(v.literal(9), v.description('Section component')),
  v.pipe(v.literal(10), v.description('Text component')),
  v.pipe(v.literal(11), v.description('Thumbnail component')),
  v.pipe(v.literal(12), v.description('Media gallery component')),
  v.pipe(v.literal(13), v.description('File component')),
  v.pipe(v.literal(14), v.description('Separator component')),
  v.pipe(v.literal(17), v.description('Container component')),
  v.pipe(v.literal(18), v.description('Label component')),
  v.pipe(v.literal(19), v.description('File upload component')),
  v.pipe(v.literal(21), v.description('Radio group component')),
  v.pipe(v.literal(22), v.description('Checkbox group component')),
  v.pipe(v.literal(23), v.description('Checkbox component')),
])

export type MessageComponentTypesSchema = v.InferOutput<typeof MessageComponentTypesSchema>

export const ButtonStyleTypesSchema = v.union([
  v.literal(1),
  v.literal(2),
  v.literal(3),
  v.literal(4),
  v.literal(5),
  v.literal(6),
])

export type ButtonStyleTypesSchema = v.InferOutput<typeof ButtonStyleTypesSchema>

export const SnowflakeTypeSchema = v.pipe(v.string(), v.regex(/^(0|[1-9][0-9]*)$/))

export type SnowflakeTypeSchema = v.InferOutput<typeof SnowflakeTypeSchema>

export const ComponentEmojiForRequestSchema = v.object({
  id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  name: v.pipe(v.string(), v.maxCodePoints(32)),
})

export type ComponentEmojiForRequestSchema = v.InferOutput<typeof ComponentEmojiForRequestSchema>

export const ButtonComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  style: ButtonStyleTypesSchema,
  label: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(80)))),
  disabled: v.optional(v.nullable(v.boolean())),
  url: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(512)))),
  sku_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  emoji: v.optional(v.union([v.null(), ComponentEmojiForRequestSchema])),
})

export type ButtonComponentForMessageRequestSchema = v.InferOutput<
  typeof ButtonComponentForMessageRequestSchema
>

export const SnowflakeSelectDefaultValueTypesSchema = v.union([
  v.literal('user'),
  v.literal('role'),
  v.literal('channel'),
])

export type SnowflakeSelectDefaultValueTypesSchema = v.InferOutput<
  typeof SnowflakeSelectDefaultValueTypesSchema
>

export const ChannelSelectDefaultValueSchema = v.object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type ChannelSelectDefaultValueSchema = v.InferOutput<typeof ChannelSelectDefaultValueSchema>

export const ChannelTypesSchema = v.union([
  v.pipe(v.literal(1), v.description('A direct message between users')),
  v.pipe(v.literal(3), v.description('A direct message between multiple users')),
  v.pipe(v.literal(0), v.description('A text channel within a server')),
  v.pipe(v.literal(2), v.description('A voice channel within a server')),
  v.pipe(v.literal(4), v.description('An organizational category that contains up to 50 channels')),
  v.pipe(
    v.literal(5),
    v.description(
      'A channel that users can follow and crosspost into their own server (formerly news channels)',
    ),
  ),
  v.pipe(
    v.literal(10),
    v.description('A temporary sub-channel within a GUILD_ANNOUNCEMENT channel'),
  ),
  v.pipe(
    v.literal(11),
    v.description(
      'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
    ),
  ),
  v.pipe(
    v.literal(12),
    v.description(
      'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
    ),
  ),
  v.pipe(v.literal(13), v.description('A voice channel for hosting events with an audience')),
  v.pipe(v.literal(14), v.description('The channel in a hub containing the listed servers')),
  v.pipe(v.literal(15), v.description('Channel that can only contain threads')),
])

export type ChannelTypesSchema = v.InferOutput<typeof ChannelTypesSchema>

export const ChannelSelectComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  placeholder: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(150)))),
  min_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(25))),
  ),
  max_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(25))),
  ),
  disabled: v.optional(v.nullable(v.boolean())),
  required: v.optional(v.nullable(v.boolean())),
  default_values: v.optional(
    v.nullable(v.pipe(v.array(ChannelSelectDefaultValueSchema), v.maxLength(25))),
  ),
  channel_types: v.optional(
    v.nullable(
      v.pipe(
        v.array(ChannelTypesSchema),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
})

export type ChannelSelectComponentForMessageRequestSchema = v.InferOutput<
  typeof ChannelSelectComponentForMessageRequestSchema
>

export const RoleSelectDefaultValueSchema = v.object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type RoleSelectDefaultValueSchema = v.InferOutput<typeof RoleSelectDefaultValueSchema>

export const UserSelectDefaultValueSchema = v.object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type UserSelectDefaultValueSchema = v.InferOutput<typeof UserSelectDefaultValueSchema>

export const MentionableSelectComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  placeholder: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(150)))),
  min_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(25))),
  ),
  max_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(25))),
  ),
  disabled: v.optional(v.nullable(v.boolean())),
  required: v.optional(v.nullable(v.boolean())),
  default_values: v.optional(
    v.nullable(
      v.pipe(
        v.array(v.union([RoleSelectDefaultValueSchema, UserSelectDefaultValueSchema])),
        v.maxLength(25),
      ),
    ),
  ),
})

export type MentionableSelectComponentForMessageRequestSchema = v.InferOutput<
  typeof MentionableSelectComponentForMessageRequestSchema
>

export const RoleSelectComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  placeholder: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(150)))),
  min_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(25))),
  ),
  max_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(25))),
  ),
  disabled: v.optional(v.nullable(v.boolean())),
  required: v.optional(v.nullable(v.boolean())),
  default_values: v.optional(
    v.nullable(v.pipe(v.array(RoleSelectDefaultValueSchema), v.maxLength(25))),
  ),
})

export type RoleSelectComponentForMessageRequestSchema = v.InferOutput<
  typeof RoleSelectComponentForMessageRequestSchema
>

export const StringSelectOptionForRequestSchema = v.object({
  label: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  value: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
  default: v.optional(v.nullable(v.boolean())),
  emoji: v.optional(v.union([v.null(), ComponentEmojiForRequestSchema])),
})

export type StringSelectOptionForRequestSchema = v.InferOutput<
  typeof StringSelectOptionForRequestSchema
>

export const StringSelectComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  placeholder: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(150)))),
  min_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(25))),
  ),
  max_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(25))),
  ),
  disabled: v.optional(v.nullable(v.boolean())),
  required: v.optional(v.nullable(v.boolean())),
  options: v.pipe(v.array(StringSelectOptionForRequestSchema), v.minLength(1), v.maxLength(25)),
})

export type StringSelectComponentForMessageRequestSchema = v.InferOutput<
  typeof StringSelectComponentForMessageRequestSchema
>

export const UserSelectComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  placeholder: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(150)))),
  min_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(25))),
  ),
  max_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(25))),
  ),
  disabled: v.optional(v.nullable(v.boolean())),
  required: v.optional(v.nullable(v.boolean())),
  default_values: v.optional(
    v.nullable(v.pipe(v.array(UserSelectDefaultValueSchema), v.maxLength(25))),
  ),
})

export type UserSelectComponentForMessageRequestSchema = v.InferOutput<
  typeof UserSelectComponentForMessageRequestSchema
>

export const ActionRowComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  components: v.pipe(
    v.array(
      v.union([
        ButtonComponentForMessageRequestSchema,
        ChannelSelectComponentForMessageRequestSchema,
        MentionableSelectComponentForMessageRequestSchema,
        RoleSelectComponentForMessageRequestSchema,
        StringSelectComponentForMessageRequestSchema,
        UserSelectComponentForMessageRequestSchema,
      ]),
    ),
    v.minLength(1),
    v.maxLength(5),
  ),
})

export type ActionRowComponentForMessageRequestSchema = v.InferOutput<
  typeof ActionRowComponentForMessageRequestSchema
>

export const TextInputStyleTypesSchema = v.union([
  v.pipe(v.literal(1), v.description('Single-line input')),
  v.pipe(v.literal(2), v.description('Multi-line input')),
])

export type TextInputStyleTypesSchema = v.InferOutput<typeof TextInputStyleTypesSchema>

export const TextInputComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  style: TextInputStyleTypesSchema,
  label: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(45)))),
  value: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(4000)))),
  placeholder: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
  required: v.optional(v.nullable(v.boolean())),
  min_length: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(4000))),
  ),
  max_length: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(4000))),
  ),
})

export type TextInputComponentForModalRequestSchema = v.InferOutput<
  typeof TextInputComponentForModalRequestSchema
>

export const ActionRowComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  components: v.pipe(
    v.array(TextInputComponentForModalRequestSchema),
    v.minLength(1),
    v.maxLength(5),
  ),
})

export type ActionRowComponentForModalRequestSchema = v.InferOutput<
  typeof ActionRowComponentForModalRequestSchema
>

export const ComponentEmojiResponseSchema = v.object({
  id: v.optional(SnowflakeTypeSchema),
  name: v.string(),
  animated: v.optional(v.boolean()),
})

export type ComponentEmojiResponseSchema = v.InferOutput<typeof ComponentEmojiResponseSchema>

export const ButtonComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  custom_id: v.optional(v.string()),
  style: ButtonStyleTypesSchema,
  label: v.optional(v.string()),
  disabled: v.optional(v.boolean()),
  emoji: v.optional(ComponentEmojiResponseSchema),
  url: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048)))),
  sku_id: v.optional(SnowflakeTypeSchema),
})

export type ButtonComponentResponseSchema = v.InferOutput<typeof ButtonComponentResponseSchema>

export const ChannelSelectDefaultValueResponseSchema = v.object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type ChannelSelectDefaultValueResponseSchema = v.InferOutput<
  typeof ChannelSelectDefaultValueResponseSchema
>

export const ChannelSelectComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  custom_id: v.string(),
  placeholder: v.optional(v.string()),
  min_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  max_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  disabled: v.optional(v.boolean()),
  channel_types: v.optional(
    v.pipe(
      v.array(ChannelTypesSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
  ),
  default_values: v.optional(v.array(ChannelSelectDefaultValueResponseSchema)),
})

export type ChannelSelectComponentResponseSchema = v.InferOutput<
  typeof ChannelSelectComponentResponseSchema
>

export const RoleSelectDefaultValueResponseSchema = v.object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type RoleSelectDefaultValueResponseSchema = v.InferOutput<
  typeof RoleSelectDefaultValueResponseSchema
>

export const UserSelectDefaultValueResponseSchema = v.object({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type UserSelectDefaultValueResponseSchema = v.InferOutput<
  typeof UserSelectDefaultValueResponseSchema
>

export const MentionableSelectComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  custom_id: v.string(),
  placeholder: v.optional(v.string()),
  min_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  max_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  disabled: v.optional(v.boolean()),
  default_values: v.optional(
    v.array(v.union([RoleSelectDefaultValueResponseSchema, UserSelectDefaultValueResponseSchema])),
  ),
})

export type MentionableSelectComponentResponseSchema = v.InferOutput<
  typeof MentionableSelectComponentResponseSchema
>

export const RoleSelectComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  custom_id: v.string(),
  placeholder: v.optional(v.string()),
  min_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  max_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  disabled: v.optional(v.boolean()),
  default_values: v.optional(v.array(RoleSelectDefaultValueResponseSchema)),
})

export type RoleSelectComponentResponseSchema = v.InferOutput<
  typeof RoleSelectComponentResponseSchema
>

export const StringSelectOptionResponseSchema = v.object({
  label: v.string(),
  value: v.string(),
  description: v.optional(v.string()),
  emoji: v.optional(ComponentEmojiResponseSchema),
  default: v.optional(v.boolean()),
})

export type StringSelectOptionResponseSchema = v.InferOutput<
  typeof StringSelectOptionResponseSchema
>

export const StringSelectComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  custom_id: v.string(),
  placeholder: v.optional(v.string()),
  min_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  max_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  disabled: v.optional(v.boolean()),
  options: v.array(StringSelectOptionResponseSchema),
})

export type StringSelectComponentResponseSchema = v.InferOutput<
  typeof StringSelectComponentResponseSchema
>

export const TextInputComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  custom_id: v.string(),
  style: TextInputStyleTypesSchema,
  label: v.nullable(v.string()),
  value: v.optional(v.string()),
  placeholder: v.optional(v.string()),
  required: v.optional(v.boolean()),
  min_length: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  max_length: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
})

export type TextInputComponentResponseSchema = v.InferOutput<
  typeof TextInputComponentResponseSchema
>

export const UserSelectComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  custom_id: v.string(),
  placeholder: v.optional(v.string()),
  min_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  max_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  disabled: v.optional(v.boolean()),
  default_values: v.optional(v.array(UserSelectDefaultValueResponseSchema)),
})

export type UserSelectComponentResponseSchema = v.InferOutput<
  typeof UserSelectComponentResponseSchema
>

export const ActionRowComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  components: v.array(
    v.union([
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

export type ActionRowComponentResponseSchema = v.InferOutput<
  typeof ActionRowComponentResponseSchema
>

export const ActionTypesSchema = v.union([
  v.pipe(v.literal('TYPING_START'), v.description('User started typing in a channel')),
  v.pipe(v.literal('INVITE_CREATE'), v.description('Invite to a channel was created')),
  v.pipe(v.literal('INVITE_DELETE'), v.description('Invite to a channel was deleted')),
  v.pipe(
    v.literal('WEBHOOKS_UPDATE'),
    v.description('Guild channel webhook was created, updated, or deleted'),
  ),
  v.pipe(v.literal('CHANNEL_CREATE'), v.description('New guild channel created')),
  v.pipe(
    v.literal('VOICE_CHANNEL_STATUS_UPDATE'),
    v.description('Voice channel status was updated'),
  ),
  v.pipe(v.literal('CHANNEL_UPDATE'), v.description('Channel was updated')),
  v.pipe(v.literal('CHANNEL_DELETE'), v.description('Channel was deleted')),
  v.pipe(v.literal('CHANNEL_PINS_UPDATE'), v.description('Message was pinned or unpinned')),
  v.pipe(
    v.literal('THREAD_CREATE'),
    v.description('Thread created, also sent when being added to a private thread'),
  ),
  v.pipe(v.literal('THREAD_UPDATE'), v.description('Thread was updated')),
  v.pipe(v.literal('THREAD_DELETE'), v.description('Thread was deleted')),
  v.pipe(
    v.literal('THREAD_LIST_SYNC'),
    v.description(
      'Sent when gaining access to a channel, contains all active threads in that channel',
    ),
  ),
  v.pipe(
    v.literal('THREAD_MEMBER_UPDATE'),
    v.description('Thread member for the current user was updated'),
  ),
  v.pipe(
    v.literal('THREAD_MEMBERS_UPDATE'),
    v.description('Some user(s) were added to or removed from a thread'),
  ),
  v.pipe(
    v.literal('GUILD_CREATE'),
    v.description(
      'Lazy-load for unavailable guild, guild became available, or user joined a new guild',
    ),
  ),
  v.pipe(v.literal('GUILD_UPDATE'), v.description('Guild was updated')),
  v.pipe(
    v.literal('GUILD_DELETE'),
    v.description('Guild became unavailable, or user left/was removed from a guild'),
  ),
  v.pipe(v.literal('GUILD_EMOJIS_UPDATE'), v.description('Guild emojis were updated')),
  v.pipe(v.literal('GUILD_STICKERS_UPDATE'), v.description('Guild stickers were updated')),
  v.pipe(v.literal('GUILD_INTEGRATIONS_UPDATE'), v.description('Guild integration was updated')),
  v.pipe(v.literal('GUILD_MEMBER_ADD'), v.description('New user joined a guild')),
  v.pipe(v.literal('GUILD_MEMBER_UPDATE'), v.description('Guild member was updated')),
  v.pipe(v.literal('GUILD_MEMBER_REMOVE'), v.description('User was removed from a guild')),
  v.pipe(v.literal('GUILD_BAN_ADD'), v.description('User was banned from a guild')),
  v.pipe(v.literal('GUILD_BAN_REMOVE'), v.description('User was unbanned from a guild')),
  v.pipe(v.literal('GUILD_ROLE_CREATE'), v.description('Guild role was created')),
  v.pipe(v.literal('GUILD_ROLE_UPDATE'), v.description('Guild role was updated')),
  v.pipe(v.literal('GUILD_ROLE_DELETE'), v.description('Guild role was deleted')),
  v.pipe(v.literal('GUILD_MEMBERS_CHUNK'), v.description('Response to Request Guild Members')),
  v.pipe(v.literal('MESSAGE_CREATE'), v.description('Message was created')),
  v.pipe(v.literal('MESSAGE_UPDATE'), v.description('Message was edited')),
  v.pipe(v.literal('MESSAGE_DELETE'), v.description('Message was deleted')),
  v.pipe(v.literal('MESSAGE_DELETE_BULK'), v.description('Multiple messages were deleted at once')),
  v.pipe(v.literal('MESSAGE_REACTION_ADD'), v.description('User reacted to a message')),
  v.pipe(
    v.literal('MESSAGE_REACTION_REMOVE'),
    v.description('User removed a reaction from a message'),
  ),
  v.pipe(
    v.literal('MESSAGE_REACTION_REMOVE_ALL'),
    v.description('All reactions were explicitly removed from a message'),
  ),
  v.pipe(
    v.literal('MESSAGE_REACTION_REMOVE_EMOJI'),
    v.description('All reactions for a given emoji were explicitly removed from a message'),
  ),
  v.pipe(v.literal('USER_UPDATE'), v.description('Properties about the user changed')),
  v.pipe(v.literal('ENTITLEMENT_CREATE'), v.description('Entitlement was created')),
  v.pipe(v.literal('ENTITLEMENT_UPDATE'), v.description('Entitlement was updated')),
  v.pipe(v.literal('ENTITLEMENT_DELETE'), v.description('Entitlement was deleted')),
  v.pipe(v.literal('READY'), v.description('Contains the initial state information')),
  v.pipe(v.literal('RESUMED'), v.description('Response to Resume')),
  v.pipe(v.literal('PRESENCE_UPDATE'), v.description('User was updated')),
  v.pipe(
    v.literal('VOICE_STATE_UPDATE'),
    v.description('Someone joined, left, or moved a voice channel'),
  ),
  v.pipe(v.literal('VOICE_SERVER_UPDATE'), v.description("Guild's voice server was updated")),
  v.pipe(
    v.literal('LOBBY_MESSAGE_CREATE'),
    v.description('Sent when a message is created in a lobby'),
  ),
  v.pipe(
    v.literal('LOBBY_MESSAGE_UPDATE'),
    v.description('Sent when a message is updated in a lobby'),
  ),
  v.pipe(
    v.literal('LOBBY_MESSAGE_DELETE'),
    v.description('Sent when a message is deleted from a lobby'),
  ),
  v.pipe(
    v.literal('GAME_DIRECT_MESSAGE_CREATE'),
    v.description('Sent when a direct message is created during an active Social SDK session'),
  ),
  v.pipe(
    v.literal('GAME_DIRECT_MESSAGE_DELETE'),
    v.description('Sent when a direct message is deleted during an active Social SDK session'),
  ),
  v.pipe(
    v.literal('GAME_DIRECT_MESSAGE_UPDATE'),
    v.description('Sent when a direct message is updated during an active Social SDK session'),
  ),
  v.pipe(
    v.literal('INTERACTION_CREATE'),
    v.description('User used an interaction, such as an Application Command'),
  ),
  v.pipe(v.literal('INTEGRATION_CREATE'), v.description('Guild integration was created')),
  v.pipe(v.literal('INTEGRATION_UPDATE'), v.description('Guild integration was updated')),
  v.pipe(v.literal('INTEGRATION_DELETE'), v.description('Guild integration was deleted')),
  v.pipe(
    v.literal('APPLICATION_COMMAND_PERMISSIONS_UPDATE'),
    v.description('Application command permission was updated'),
  ),
  v.pipe(
    v.literal('APPLICATION_AUTHORIZED'),
    v.description('Sent when an app was authorized by a user to a server or their account'),
  ),
  v.pipe(
    v.literal('APPLICATION_DEAUTHORIZED'),
    v.description('Sent when an app was deauthorized by a user'),
  ),
  v.pipe(v.literal('STAGE_INSTANCE_CREATE'), v.description('Stage instance was created')),
  v.pipe(v.literal('STAGE_INSTANCE_UPDATE'), v.description('Stage instance was updated')),
  v.pipe(v.literal('STAGE_INSTANCE_DELETE'), v.description('Stage instance was deleted or closed')),
  v.pipe(
    v.literal('GUILD_AUDIT_LOG_ENTRY_CREATE'),
    v.description('A guild audit log entry was created'),
  ),
  v.pipe(
    v.literal('GUILD_SCHEDULED_EVENT_CREATE'),
    v.description('Guild scheduled event was created'),
  ),
  v.pipe(
    v.literal('GUILD_SCHEDULED_EVENT_UPDATE'),
    v.description('Guild scheduled event was updated'),
  ),
  v.pipe(
    v.literal('GUILD_SCHEDULED_EVENT_DELETE'),
    v.description('Guild scheduled event was deleted'),
  ),
  v.pipe(
    v.literal('GUILD_SCHEDULED_EVENT_USER_ADD'),
    v.description('User subscribed to a guild scheduled event'),
  ),
  v.pipe(
    v.literal('GUILD_SCHEDULED_EVENT_USER_REMOVE'),
    v.description('User unsubscribed from a guild scheduled event'),
  ),
  v.pipe(
    v.literal('AUTO_MODERATION_RULE_CREATE'),
    v.description('Auto Moderation rule was created'),
  ),
  v.pipe(
    v.literal('AUTO_MODERATION_RULE_UPDATE'),
    v.description('Auto Moderation rule was updated'),
  ),
  v.pipe(
    v.literal('AUTO_MODERATION_RULE_DELETE'),
    v.description('Auto Moderation rule was deleted'),
  ),
  v.pipe(
    v.literal('AUTO_MODERATION_ACTION_EXECUTION'),
    v.description(
      'Auto Moderation rule was triggered and an action was executed (.e.g. a message was blocked)',
    ),
  ),
  v.literal('GUILD_SOUNDBOARD_SOUNDS_UPDATE'),
  v.literal('GUILD_SOUNDBOARD_SOUND_CREATE'),
  v.literal('GUILD_SOUNDBOARD_SOUND_UPDATE'),
  v.literal('GUILD_SOUNDBOARD_SOUND_DELETE'),
  v.pipe(
    v.literal('QUEST_USER_ENROLLMENT'),
    v.description('User was added to a Quest (currently unavailable)'),
  ),
  v.literal('RATE_LIMITED'),
])

export type ActionTypesSchema = v.InferOutput<typeof ActionTypesSchema>

export const ApplicationTypesSchema = v.union([v.literal(4)])

export type ApplicationTypesSchema = v.InferOutput<typeof ApplicationTypesSchema>

export const Int53TypeSchema = v.pipe(
  v.union([v.bigint(), v.pipe(v.number(), v.integer()), v.pipe(v.string(), v.regex(/^-?\d+$/))]),
  v.transform((input) => BigInt(input)),
  v.minValue(-9223372036854775808n),
  v.maxValue(9223372036854775807n),
  v.minValue(-9007199254740991n),
  v.maxValue(9007199254740991n),
)

export type Int53TypeSchema = v.InferOutput<typeof Int53TypeSchema>

export const UserAvatarDecorationResponseSchema = v.object({
  asset: v.pipe(v.string(), v.description('the avatar decoration hash')),
  sku_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description("id of the avatar decoration's SKU"),
  ),
})

export type UserAvatarDecorationResponseSchema = v.InferOutput<
  typeof UserAvatarDecorationResponseSchema
>

export const NameplatePaletteSchema = v.union([
  v.pipe(v.literal('crimson'), v.description('Crimson color palette')),
  v.pipe(v.literal('berry'), v.description('Berry color palette')),
  v.pipe(v.literal('sky'), v.description('Sky color palette')),
  v.pipe(v.literal('teal'), v.description('Teal color palette')),
  v.pipe(v.literal('forest'), v.description('Forest color palette')),
  v.pipe(v.literal('bubble_gum'), v.description('Bubble gum color palette')),
  v.pipe(v.literal('violet'), v.description('Violet color palette')),
  v.pipe(v.literal('cobalt'), v.description('Cobalt color palette')),
  v.pipe(v.literal('clover'), v.description('Clover color palette')),
  v.pipe(v.literal('lemon'), v.description('Lemon color palette')),
  v.pipe(v.literal('white'), v.description('White color palette')),
  v.pipe(v.literal('black'), v.description('Black color palette')),
])

export type NameplatePaletteSchema = v.InferOutput<typeof NameplatePaletteSchema>

export const UserNameplateResponseSchema = v.object({
  sku_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description('ID of the nameplate SKU'),
  ),
  asset: v.pipe(v.string(), v.description('Path to the nameplate asset')),
  label: v.pipe(v.string(), v.description('The label of this nameplate. Currently unused')),
  palette: v.pipe(NameplatePaletteSchema, v.description('Background color of the nameplate')),
})

export type UserNameplateResponseSchema = v.InferOutput<typeof UserNameplateResponseSchema>

export const UserCollectiblesResponseSchema = v.object({
  nameplate: v.pipe(
    v.union([v.null(), UserNameplateResponseSchema]),
    v.description('Object mapping of nameplate data'),
  ),
})

export type UserCollectiblesResponseSchema = v.InferOutput<typeof UserCollectiblesResponseSchema>

export const UserPrimaryGuildResponseSchema = v.object({
  identity_guild_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description("the id of the user's primary guild"),
  ),
  identity_enabled: v.pipe(
    v.nullable(v.boolean()),
    v.description("whether the user is displaying the primary guild's server tag"),
  ),
  tag: v.pipe(
    v.nullable(v.string()),
    v.description("the text of the user's server tag, limited to 4 characters"),
  ),
  badge: v.pipe(v.nullable(v.string()), v.description('the server tag badge hash')),
})

export type UserPrimaryGuildResponseSchema = v.InferOutput<typeof UserPrimaryGuildResponseSchema>

export const UserResponseSchema = v.object({
  id: v.pipe(SnowflakeTypeSchema, v.description("the user's id")),
  username: v.pipe(
    v.string(),
    v.description("the user's username, not unique across the platform"),
  ),
  avatar: v.pipe(v.nullable(v.string()), v.description("the user's avatar hash")),
  discriminator: v.pipe(v.string(), v.description("the user's Discord-tag")),
  public_flags: v.pipe(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    v.description("the public flags on a user's account"),
  ),
  flags: v.pipe(Int53TypeSchema, v.description("the flags on a user's account")),
  bot: v.optional(
    v.pipe(v.boolean(), v.description('whether the user belongs to an OAuth2 application')),
  ),
  system: v.optional(
    v.pipe(
      v.boolean(),
      v.description(
        'whether the user is an Official Discord System user (part of the urgent message system)',
      ),
    ),
  ),
  banner: v.optional(v.pipe(v.nullable(v.string()), v.description("the user's banner hash"))),
  accent_color: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
      v.description(
        "the user's banner color encoded as an integer representation of hexadecimal color code",
      ),
    ),
  ),
  global_name: v.pipe(
    v.nullable(v.string()),
    v.description("the user's display name, if it is set"),
  ),
  avatar_decoration_data: v.optional(
    v.pipe(
      v.union([v.null(), UserAvatarDecorationResponseSchema]),
      v.description("data for the user's avatar decoration"),
    ),
  ),
  collectibles: v.optional(
    v.pipe(
      v.union([v.null(), UserCollectiblesResponseSchema]),
      v.description("data for the user's collectibles"),
    ),
  ),
  primary_guild: v.pipe(
    v.union([v.null(), UserPrimaryGuildResponseSchema]),
    v.description("the user's primary guild"),
  ),
})

export type UserResponseSchema = v.InferOutput<typeof UserResponseSchema>

export const OAuth2ScopesSchema = v.union([
  v.pipe(v.literal('identify'), v.description('allows /users/@me without email')),
  v.pipe(v.literal('email'), v.description('enables /users/@me to return an email')),
  v.pipe(
    v.literal('connections'),
    v.description('allows /users/@me/connections to return linked third-party accounts'),
  ),
  v.pipe(
    v.literal('guilds'),
    v.description(
      "allows /users/@me/guilds to return basic information about all of a user's guilds",
    ),
  ),
  v.pipe(
    v.literal('guilds.join'),
    v.description(
      'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
    ),
  ),
  v.pipe(
    v.literal('guilds.members.read'),
    v.description(
      "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
    ),
  ),
  v.pipe(v.literal('gdm.join'), v.description('allows your app to join users to a group dm')),
  v.pipe(
    v.literal('bot'),
    v.description("for oauth2 bots, this puts the bot in the user's selected guild by default"),
  ),
  v.pipe(
    v.literal('rpc'),
    v.description(
      "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
    ),
  ),
  v.pipe(
    v.literal('rpc.notifications.read'),
    v.description(
      'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
    ),
  ),
  v.pipe(
    v.literal('rpc.voice.read'),
    v.description(
      "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
    ),
  ),
  v.pipe(
    v.literal('rpc.voice.write'),
    v.description(
      "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
    ),
  ),
  v.pipe(
    v.literal('rpc.video.read'),
    v.description(
      "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
    ),
  ),
  v.pipe(
    v.literal('rpc.video.write'),
    v.description(
      "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
    ),
  ),
  v.pipe(
    v.literal('rpc.screenshare.read'),
    v.description(
      "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
    ),
  ),
  v.pipe(
    v.literal('rpc.screenshare.write'),
    v.description(
      "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
    ),
  ),
  v.pipe(
    v.literal('rpc.activities.write'),
    v.description(
      "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
    ),
  ),
  v.pipe(
    v.literal('webhook.incoming'),
    v.description(
      'this generates a webhook that is returned in the oauth token response for authorization code grants',
    ),
  ),
  v.pipe(
    v.literal('messages.read'),
    v.description(
      'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
    ),
  ),
  v.pipe(
    v.literal('applications.builds.upload'),
    v.description(
      "allows your app to upload/update builds for a user's applications - requires Discord approval",
    ),
  ),
  v.pipe(
    v.literal('applications.builds.read'),
    v.description("allows your app to read build data for a user's applications"),
  ),
  v.pipe(
    v.literal('applications.commands'),
    v.description('allows your app to use commands in a guild'),
  ),
  v.pipe(
    v.literal('applications.commands.permissions.update'),
    v.description(
      'allows your app to update permissions for its commands in a guild a user has permissions to',
    ),
  ),
  v.pipe(
    v.literal('applications.commands.update'),
    v.description(
      'allows your app to update its commands using a Bearer token - client credentials grant only',
    ),
  ),
  v.pipe(
    v.literal('applications.store.update'),
    v.description(
      "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
    ),
  ),
  v.pipe(
    v.literal('applications.entitlements'),
    v.description("allows your app to read entitlements for a user's applications"),
  ),
  v.pipe(
    v.literal('activities.read'),
    v.description(
      'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
    ),
  ),
  v.pipe(
    v.literal('activities.write'),
    v.description(
      "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
    ),
  ),
  v.pipe(
    v.literal('activities.invites.write'),
    v.description(
      'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
    ),
  ),
  v.pipe(
    v.literal('relationships.read'),
    v.description(
      "allows your app to know a user's friends and implicit relationships - requires Discord approval",
    ),
  ),
  v.pipe(
    v.literal('voice'),
    v.description(
      "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
    ),
  ),
  v.pipe(
    v.literal('dm_channels.read'),
    v.description(
      "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
    ),
  ),
  v.pipe(
    v.literal('role_connections.write'),
    v.description("allows your app to update a user's connection and metadata for the app"),
  ),
  v.pipe(
    v.literal('openid'),
    v.description(
      'for OpenID Connect, this allows your app to receive user id and basic profile information',
    ),
  ),
])

export type OAuth2ScopesSchema = v.InferOutput<typeof OAuth2ScopesSchema>

export const ApplicationOAuth2InstallParamsResponseSchema = v.object({
  scopes: v.pipe(
    v.array(OAuth2ScopesSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  permissions: v.string(),
})

export type ApplicationOAuth2InstallParamsResponseSchema = v.InferOutput<
  typeof ApplicationOAuth2InstallParamsResponseSchema
>

export const ApplicationIntegrationTypeConfigurationResponseSchema = v.partial(
  v.object({ oauth2_install_params: ApplicationOAuth2InstallParamsResponseSchema }),
)

export type ApplicationIntegrationTypeConfigurationResponseSchema = v.InferOutput<
  typeof ApplicationIntegrationTypeConfigurationResponseSchema
>

export const ApplicationResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  icon: v.nullable(v.string()),
  description: v.string(),
  type: v.union([v.null(), ApplicationTypesSchema]),
  cover_image: v.optional(v.string()),
  primary_sku_id: v.optional(SnowflakeTypeSchema),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  flags_new: v.string(),
  bot: v.optional(UserResponseSchema),
  slug: v.optional(v.string()),
  conjure_project_id: v.optional(SnowflakeTypeSchema),
  vibegrations_project_id: v.optional(SnowflakeTypeSchema),
  guild_id: v.optional(SnowflakeTypeSchema),
  rpc_origins: v.optional(v.array(v.string())),
  bot_public: v.optional(v.boolean()),
  bot_require_code_grant: v.optional(v.boolean()),
  terms_of_service_url: v.optional(v.pipe(v.string(), v.url())),
  privacy_policy_url: v.optional(v.pipe(v.string(), v.url())),
  custom_install_url: v.optional(v.pipe(v.string(), v.url())),
  install_params: v.optional(ApplicationOAuth2InstallParamsResponseSchema),
  integration_types_config: v.optional(
    v.record(v.string(), ApplicationIntegrationTypeConfigurationResponseSchema),
  ),
  verify_key: v.string(),
  max_participants: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
  tags: v.optional(
    v.pipe(
      v.array(v.string()),
      v.check((input) => new Set(input).size === input.length),
    ),
  ),
})

export type ApplicationResponseSchema = v.InferOutput<typeof ApplicationResponseSchema>

export const AttachmentResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  filename: v.string(),
  size: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  url: v.pipe(v.string(), v.url()),
  proxy_url: v.pipe(v.string(), v.url()),
  width: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  height: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  duration_secs: v.optional(v.number()),
  waveform: v.optional(v.string()),
  description: v.optional(v.string()),
  content_type: v.optional(v.string()),
  ephemeral: v.optional(v.boolean()),
  flags: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  placeholder: v.optional(v.string()),
  placeholder_version: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  title: v.optional(v.nullable(v.string())),
  application: v.optional(ApplicationResponseSchema),
  clip_created_at: v.optional(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  clip_participants: v.optional(v.array(UserResponseSchema)),
})

export type AttachmentResponseSchema = v.InferOutput<typeof AttachmentResponseSchema>

export const ActivitiesAttachmentResponseSchema = v.object({ attachment: AttachmentResponseSchema })

export type ActivitiesAttachmentResponseSchema = v.InferOutput<
  typeof ActivitiesAttachmentResponseSchema
>

export const ActivityActionTypesSchema = v.union([
  v.literal(1),
  v.literal(2),
  v.literal(3),
  v.literal(5),
  v.literal(6),
])

export type ActivityActionTypesSchema = v.InferOutput<typeof ActivityActionTypesSchema>

export const ActivityInstanceCallbackResponseSchema = v.object({ id: v.string() })

export type ActivityInstanceCallbackResponseSchema = v.InferOutput<
  typeof ActivityInstanceCallbackResponseSchema
>

export const AfkTimeoutsSchema = v.union([
  v.literal(60),
  v.literal(300),
  v.literal(900),
  v.literal(1800),
  v.literal(3600),
])

export type AfkTimeoutsSchema = v.InferOutput<typeof AfkTimeoutsSchema>

export const AllowedMentionTypesSchema = v.union([
  v.pipe(v.literal('users'), v.description('Controls role mentions')),
  v.pipe(v.literal('roles'), v.description('Controls user mentions')),
  v.pipe(v.literal('everyone'), v.description('Controls @everyone and @here mentions')),
])

export type AllowedMentionTypesSchema = v.InferOutput<typeof AllowedMentionTypesSchema>

export const ApplicationCommandOptionTypeSchema = v.union([
  v.pipe(v.literal(1), v.description('A sub-action within a command or group')),
  v.pipe(v.literal(2), v.description('A group of subcommands')),
  v.pipe(v.literal(3), v.description('A string option')),
  v.pipe(
    v.literal(4),
    v.description('An integer option. Any integer between -2^53 and 2^53 is a valid value'),
  ),
  v.pipe(v.literal(5), v.description('A boolean option')),
  v.pipe(v.literal(6), v.description('A snowflake option that represents a User')),
  v.pipe(
    v.literal(7),
    v.description(
      'A snowflake option that represents a Channel. Includes all channel types and categories',
    ),
  ),
  v.pipe(v.literal(8), v.description('A snowflake option that represents a Role')),
  v.pipe(
    v.literal(9),
    v.description('A snowflake option that represents anything you can mention'),
  ),
  v.pipe(
    v.literal(10),
    v.description('A number option. Any double between -2^53 and 2^53 is a valid value'),
  ),
  v.pipe(v.literal(11), v.description('An attachment option')),
])

export type ApplicationCommandOptionTypeSchema = v.InferOutput<
  typeof ApplicationCommandOptionTypeSchema
>

export const ApplicationCommandAttachmentOptionSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  required: v.optional(v.nullable(v.boolean())),
  file_types: v.optional(
    v.nullable(
      v.pipe(
        v.array(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(16))),
        v.maxLength(10),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
})

export type ApplicationCommandAttachmentOptionSchema = v.InferOutput<
  typeof ApplicationCommandAttachmentOptionSchema
>

export const ApplicationCommandAttachmentOptionResponseSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localized: v.optional(v.string()),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  required: v.optional(v.boolean()),
  file_types: v.optional(
    v.pipe(
      v.array(v.pipe(v.string(), v.maxCodePoints(16))),
      v.check((input) => new Set(input).size === input.length),
    ),
  ),
})

export type ApplicationCommandAttachmentOptionResponseSchema = v.InferOutput<
  typeof ApplicationCommandAttachmentOptionResponseSchema
>

export const InteractionCallbackTypesSchema = v.union([
  v.literal(1),
  v.literal(4),
  v.literal(5),
  v.literal(6),
  v.literal(7),
  v.literal(8),
  v.literal(9),
  v.literal(12),
  v.literal(13),
])

export type InteractionCallbackTypesSchema = v.InferOutput<typeof InteractionCallbackTypesSchema>

export const ApplicationCommandOptionIntegerChoiceSchema = v.object({
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  value: Int53TypeSchema,
})

export type ApplicationCommandOptionIntegerChoiceSchema = v.InferOutput<
  typeof ApplicationCommandOptionIntegerChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema = v.partial(
  v.object({
    choices: v.nullable(
      v.pipe(
        v.array(v.union([v.null(), ApplicationCommandOptionIntegerChoiceSchema])),
        v.maxLength(25),
      ),
    ),
  }),
)

export type InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema = v.InferOutput<
  typeof InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema
>

export const ApplicationCommandOptionNumberChoiceSchema = v.object({
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  value: v.number(),
})

export type ApplicationCommandOptionNumberChoiceSchema = v.InferOutput<
  typeof ApplicationCommandOptionNumberChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackNumberDataSchema = v.partial(
  v.object({
    choices: v.nullable(
      v.pipe(
        v.array(v.union([v.null(), ApplicationCommandOptionNumberChoiceSchema])),
        v.maxLength(25),
      ),
    ),
  }),
)

export type InteractionApplicationCommandAutocompleteCallbackNumberDataSchema = v.InferOutput<
  typeof InteractionApplicationCommandAutocompleteCallbackNumberDataSchema
>

export const ApplicationCommandOptionStringChoiceSchema = v.object({
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  value: v.pipe(v.string(), v.maxCodePoints(6000)),
})

export type ApplicationCommandOptionStringChoiceSchema = v.InferOutput<
  typeof ApplicationCommandOptionStringChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackStringDataSchema = v.partial(
  v.object({
    choices: v.nullable(
      v.pipe(
        v.array(v.union([v.null(), ApplicationCommandOptionStringChoiceSchema])),
        v.maxLength(25),
      ),
    ),
  }),
)

export type InteractionApplicationCommandAutocompleteCallbackStringDataSchema = v.InferOutput<
  typeof InteractionApplicationCommandAutocompleteCallbackStringDataSchema
>

export const ApplicationCommandAutocompleteCallbackRequestSchema = v.object({
  type: InteractionCallbackTypesSchema,
  data: v.union([
    InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema,
    InteractionApplicationCommandAutocompleteCallbackNumberDataSchema,
    InteractionApplicationCommandAutocompleteCallbackStringDataSchema,
  ]),
})

export type ApplicationCommandAutocompleteCallbackRequestSchema = v.InferOutput<
  typeof ApplicationCommandAutocompleteCallbackRequestSchema
>

export const ApplicationCommandBooleanOptionSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  required: v.optional(v.nullable(v.boolean())),
})

export type ApplicationCommandBooleanOptionSchema = v.InferOutput<
  typeof ApplicationCommandBooleanOptionSchema
>

export const ApplicationCommandBooleanOptionResponseSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localized: v.optional(v.string()),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  required: v.optional(v.boolean()),
})

export type ApplicationCommandBooleanOptionResponseSchema = v.InferOutput<
  typeof ApplicationCommandBooleanOptionResponseSchema
>

export const ApplicationCommandChannelOptionSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  required: v.optional(v.nullable(v.boolean())),
  channel_types: v.optional(
    v.nullable(
      v.pipe(
        v.array(ChannelTypesSchema),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
})

export type ApplicationCommandChannelOptionSchema = v.InferOutput<
  typeof ApplicationCommandChannelOptionSchema
>

export const ApplicationCommandChannelOptionResponseSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localized: v.optional(v.string()),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  required: v.optional(v.boolean()),
  channel_types: v.optional(
    v.pipe(
      v.array(ChannelTypesSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
  ),
})

export type ApplicationCommandChannelOptionResponseSchema = v.InferOutput<
  typeof ApplicationCommandChannelOptionResponseSchema
>

export const ApplicationCommandIntegerOptionSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  required: v.optional(v.nullable(v.boolean())),
  autocomplete: v.optional(v.nullable(v.boolean())),
  choices: v.optional(
    v.nullable(v.pipe(v.array(ApplicationCommandOptionIntegerChoiceSchema), v.maxLength(25))),
  ),
  min_value: v.optional(v.union([v.null(), Int53TypeSchema])),
  max_value: v.optional(v.union([v.null(), Int53TypeSchema])),
})

export type ApplicationCommandIntegerOptionSchema = v.InferOutput<
  typeof ApplicationCommandIntegerOptionSchema
>

export const ApplicationCommandMentionableOptionSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  required: v.optional(v.nullable(v.boolean())),
})

export type ApplicationCommandMentionableOptionSchema = v.InferOutput<
  typeof ApplicationCommandMentionableOptionSchema
>

export const ApplicationCommandNumberOptionSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  required: v.optional(v.nullable(v.boolean())),
  autocomplete: v.optional(v.nullable(v.boolean())),
  choices: v.optional(
    v.nullable(v.pipe(v.array(ApplicationCommandOptionNumberChoiceSchema), v.maxLength(25))),
  ),
  min_value: v.optional(v.nullable(v.number())),
  max_value: v.optional(v.nullable(v.number())),
})

export type ApplicationCommandNumberOptionSchema = v.InferOutput<
  typeof ApplicationCommandNumberOptionSchema
>

export const ApplicationCommandRoleOptionSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  required: v.optional(v.nullable(v.boolean())),
})

export type ApplicationCommandRoleOptionSchema = v.InferOutput<
  typeof ApplicationCommandRoleOptionSchema
>

export const ApplicationCommandStringOptionSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  required: v.optional(v.nullable(v.boolean())),
  autocomplete: v.optional(v.nullable(v.boolean())),
  min_length: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(6000))),
  ),
  max_length: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(6000))),
  ),
  choices: v.optional(
    v.nullable(v.pipe(v.array(ApplicationCommandOptionStringChoiceSchema), v.maxLength(25))),
  ),
})

export type ApplicationCommandStringOptionSchema = v.InferOutput<
  typeof ApplicationCommandStringOptionSchema
>

export const ApplicationCommandUserOptionSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  required: v.optional(v.nullable(v.boolean())),
})

export type ApplicationCommandUserOptionSchema = v.InferOutput<
  typeof ApplicationCommandUserOptionSchema
>

export const ApplicationCommandSubcommandOptionSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  required: v.optional(v.nullable(v.boolean())),
  options: v.optional(
    v.nullable(
      v.pipe(
        v.array(
          v.union([
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
        ),
        v.maxLength(25),
      ),
    ),
  ),
})

export type ApplicationCommandSubcommandOptionSchema = v.InferOutput<
  typeof ApplicationCommandSubcommandOptionSchema
>

export const ApplicationCommandSubcommandGroupOptionSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  required: v.optional(v.nullable(v.boolean())),
  options: v.optional(
    v.nullable(v.pipe(v.array(ApplicationCommandSubcommandOptionSchema), v.maxLength(25))),
  ),
})

export type ApplicationCommandSubcommandGroupOptionSchema = v.InferOutput<
  typeof ApplicationCommandSubcommandGroupOptionSchema
>

export const InteractionContextTypeSchema = v.union([
  v.pipe(v.literal(0), v.description('This command can be used within a Guild.')),
  v.pipe(
    v.literal(1),
    v.description("This command can be used within a DM with this application's bot."),
  ),
  v.pipe(
    v.literal(2),
    v.description('This command can be used within DMs and Group DMs with users.'),
  ),
])

export type InteractionContextTypeSchema = v.InferOutput<typeof InteractionContextTypeSchema>

export const ApplicationIntegrationTypeSchema = v.union([
  v.pipe(v.literal(0), v.description('For Guild install.')),
  v.pipe(v.literal(1), v.description('For User install.')),
])

export type ApplicationIntegrationTypeSchema = v.InferOutput<
  typeof ApplicationIntegrationTypeSchema
>

export const ApplicationCommandHandlerSchema = v.union([
  v.pipe(v.literal(1), v.description('The app handles the interaction using an interaction token')),
  v.pipe(
    v.literal(2),
    v.description(
      'Discord handles the interaction by launching an Activity and sending a follow-up message without coordinating with the app',
    ),
  ),
])

export type ApplicationCommandHandlerSchema = v.InferOutput<typeof ApplicationCommandHandlerSchema>

export const ApplicationCommandTypeSchema = v.union([
  v.pipe(
    v.literal(1),
    v.description('Slash commands; a text-based command that shows up when a user types /'),
  ),
  v.pipe(
    v.literal(2),
    v.description('A UI-based command that shows up when you right click or tap on a user'),
  ),
  v.pipe(
    v.literal(3),
    v.description('A UI-based command that shows up when you right click or tap on a message'),
  ),
  v.pipe(
    v.literal(4),
    v.description(
      'A command that represents the primary way to use an application (e.g. launching an Activity)',
    ),
  ),
])

export type ApplicationCommandTypeSchema = v.InferOutput<typeof ApplicationCommandTypeSchema>

export const ApplicationCommandCreateRequestSchema = v.object({
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  options: v.optional(
    v.nullable(
      v.pipe(
        v.array(
          v.union([
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
        ),
        v.maxLength(25),
      ),
    ),
  ),
  default_member_permissions: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(18014398509481984))),
  ),
  dm_permission: v.optional(v.nullable(v.boolean())),
  contexts: v.optional(
    v.nullable(
      v.pipe(
        v.array(InteractionContextTypeSchema),
        v.minLength(1),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  integration_types: v.optional(
    v.nullable(
      v.pipe(
        v.array(ApplicationIntegrationTypeSchema),
        v.minLength(1),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  handler: v.optional(
    v.pipe(
      v.union([v.null(), ApplicationCommandHandlerSchema]),
      v.description(
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
      ),
    ),
  ),
  type: v.optional(v.union([v.null(), ApplicationCommandTypeSchema])),
})

export type ApplicationCommandCreateRequestSchema = v.InferOutput<
  typeof ApplicationCommandCreateRequestSchema
>

export const ApplicationCommandOptionIntegerChoiceResponseSchema = v.object({
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  value: Int53TypeSchema,
})

export type ApplicationCommandOptionIntegerChoiceResponseSchema = v.InferOutput<
  typeof ApplicationCommandOptionIntegerChoiceResponseSchema
>

export const ApplicationCommandIntegerOptionResponseSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localized: v.optional(v.string()),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  required: v.optional(v.boolean()),
  autocomplete: v.optional(v.boolean()),
  choices: v.optional(v.array(ApplicationCommandOptionIntegerChoiceResponseSchema)),
  min_value: v.optional(Int53TypeSchema),
  max_value: v.optional(Int53TypeSchema),
})

export type ApplicationCommandIntegerOptionResponseSchema = v.InferOutput<
  typeof ApplicationCommandIntegerOptionResponseSchema
>

export const InteractionTypesSchema = v.union([
  v.pipe(
    v.literal(1),
    v.description("Sent by Discord to validate your application's interaction handler"),
  ),
  v.pipe(v.literal(2), v.description('Sent when a user uses an application command')),
  v.pipe(
    v.literal(3),
    v.description(
      'Sent when a user interacts with a message component previously sent by your application',
    ),
  ),
  v.pipe(
    v.literal(4),
    v.description('Sent when a user is filling in an autocomplete option in a chat command'),
  ),
  v.pipe(
    v.literal(5),
    v.description('Sent when a user submits a modal previously sent by your application'),
  ),
  v.pipe(
    v.literal(6),
    v.description('Sent when Discord is checking if a user can purchase a Social Layer SKU'),
  ),
])

export type InteractionTypesSchema = v.InferOutput<typeof InteractionTypesSchema>

export const ApplicationCommandInteractionMetadataResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  user: v.optional(UserResponseSchema),
  authorizing_integration_owners: v.record(v.string(), SnowflakeTypeSchema),
  original_response_message_id: v.optional(SnowflakeTypeSchema),
  target_user: v.optional(UserResponseSchema),
  target_message_id: v.optional(SnowflakeTypeSchema),
})

export type ApplicationCommandInteractionMetadataResponseSchema = v.InferOutput<
  typeof ApplicationCommandInteractionMetadataResponseSchema
>

export const ApplicationCommandMentionableOptionResponseSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localized: v.optional(v.string()),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  required: v.optional(v.boolean()),
})

export type ApplicationCommandMentionableOptionResponseSchema = v.InferOutput<
  typeof ApplicationCommandMentionableOptionResponseSchema
>

export const ApplicationCommandOptionNumberChoiceResponseSchema = v.object({
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  value: v.number(),
})

export type ApplicationCommandOptionNumberChoiceResponseSchema = v.InferOutput<
  typeof ApplicationCommandOptionNumberChoiceResponseSchema
>

export const ApplicationCommandNumberOptionResponseSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localized: v.optional(v.string()),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  required: v.optional(v.boolean()),
  autocomplete: v.optional(v.boolean()),
  choices: v.optional(v.array(ApplicationCommandOptionNumberChoiceResponseSchema)),
  min_value: v.optional(v.number()),
  max_value: v.optional(v.number()),
})

export type ApplicationCommandNumberOptionResponseSchema = v.InferOutput<
  typeof ApplicationCommandNumberOptionResponseSchema
>

export const ApplicationCommandOptionStringChoiceResponseSchema = v.object({
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  value: v.string(),
})

export type ApplicationCommandOptionStringChoiceResponseSchema = v.InferOutput<
  typeof ApplicationCommandOptionStringChoiceResponseSchema
>

export const ApplicationCommandPatchRequestPartialSchema = v.partial(
  v.object({
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.nullable(
      v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
    ),
    description: v.nullable(v.pipe(v.string(), v.maxCodePoints(100))),
    description_localizations: v.nullable(
      v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
    ),
    options: v.nullable(
      v.pipe(
        v.array(
          v.union([
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
        ),
        v.maxLength(25),
      ),
    ),
    default_member_permissions: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(18014398509481984)),
    ),
    dm_permission: v.nullable(v.boolean()),
    contexts: v.nullable(
      v.pipe(
        v.array(InteractionContextTypeSchema),
        v.minLength(1),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    integration_types: v.nullable(
      v.pipe(
        v.array(ApplicationIntegrationTypeSchema),
        v.minLength(1),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    handler: v.pipe(
      v.union([v.null(), ApplicationCommandHandlerSchema]),
      v.description(
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
      ),
    ),
  }),
)

export type ApplicationCommandPatchRequestPartialSchema = v.InferOutput<
  typeof ApplicationCommandPatchRequestPartialSchema
>

export const ApplicationCommandPermissionTypeSchema = v.union([
  v.pipe(v.literal(1), v.description('This permission is for a role.')),
  v.pipe(v.literal(2), v.description('This permission is for a user.')),
  v.pipe(v.literal(3), v.description('This permission is for a channel.')),
])

export type ApplicationCommandPermissionTypeSchema = v.InferOutput<
  typeof ApplicationCommandPermissionTypeSchema
>

export const ApplicationCommandPermissionSchema = v.object({
  id: SnowflakeTypeSchema,
  type: ApplicationCommandPermissionTypeSchema,
  permission: v.boolean(),
})

export type ApplicationCommandPermissionSchema = v.InferOutput<
  typeof ApplicationCommandPermissionSchema
>

export const ApplicationCommandRoleOptionResponseSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localized: v.optional(v.string()),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  required: v.optional(v.boolean()),
})

export type ApplicationCommandRoleOptionResponseSchema = v.InferOutput<
  typeof ApplicationCommandRoleOptionResponseSchema
>

export const ApplicationCommandStringOptionResponseSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localized: v.optional(v.string()),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  required: v.optional(v.boolean()),
  autocomplete: v.optional(v.boolean()),
  choices: v.optional(v.array(ApplicationCommandOptionStringChoiceResponseSchema)),
  min_length: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  max_length: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
})

export type ApplicationCommandStringOptionResponseSchema = v.InferOutput<
  typeof ApplicationCommandStringOptionResponseSchema
>

export const ApplicationCommandUserOptionResponseSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localized: v.optional(v.string()),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  required: v.optional(v.boolean()),
})

export type ApplicationCommandUserOptionResponseSchema = v.InferOutput<
  typeof ApplicationCommandUserOptionResponseSchema
>

export const ApplicationCommandSubcommandOptionResponseSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localized: v.optional(v.string()),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  required: v.optional(v.boolean()),
  options: v.optional(
    v.array(
      v.union([
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

export type ApplicationCommandSubcommandOptionResponseSchema = v.InferOutput<
  typeof ApplicationCommandSubcommandOptionResponseSchema
>

export const ApplicationCommandSubcommandGroupOptionResponseSchema = v.object({
  type: ApplicationCommandOptionTypeSchema,
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localized: v.optional(v.string()),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  required: v.optional(v.boolean()),
  options: v.optional(v.array(ApplicationCommandSubcommandOptionResponseSchema)),
})

export type ApplicationCommandSubcommandGroupOptionResponseSchema = v.InferOutput<
  typeof ApplicationCommandSubcommandGroupOptionResponseSchema
>

export const ApplicationCommandResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  version: SnowflakeTypeSchema,
  default_member_permissions: v.nullable(v.string()),
  type: ApplicationCommandTypeSchema,
  name: v.string(),
  name_localized: v.optional(v.string()),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localized: v.optional(v.string()),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  guild_id: v.optional(SnowflakeTypeSchema),
  dm_permission: v.optional(v.boolean()),
  contexts: v.optional(
    v.nullable(
      v.pipe(
        v.array(InteractionContextTypeSchema),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  integration_types: v.optional(
    v.pipe(
      v.array(ApplicationIntegrationTypeSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
  ),
  options: v.optional(
    v.array(
      v.union([
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
  nsfw: v.optional(v.boolean()),
  handler: v.optional(
    v.pipe(
      ApplicationCommandHandlerSchema,
      v.description(
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
      ),
    ),
  ),
})

export type ApplicationCommandResponseSchema = v.InferOutput<
  typeof ApplicationCommandResponseSchema
>

export const ApplicationCommandUpdateRequestSchema = v.object({
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
  name_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  ),
  description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
  description_localizations: v.optional(
    v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  ),
  options: v.optional(
    v.nullable(
      v.pipe(
        v.array(
          v.union([
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
        ),
        v.maxLength(25),
      ),
    ),
  ),
  default_member_permissions: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(18014398509481984))),
  ),
  dm_permission: v.optional(v.nullable(v.boolean())),
  contexts: v.optional(
    v.nullable(
      v.pipe(
        v.array(InteractionContextTypeSchema),
        v.minLength(1),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  integration_types: v.optional(
    v.nullable(
      v.pipe(
        v.array(ApplicationIntegrationTypeSchema),
        v.minLength(1),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  handler: v.optional(
    v.pipe(
      v.union([v.null(), ApplicationCommandHandlerSchema]),
      v.description(
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
      ),
    ),
  ),
  type: v.optional(v.union([v.null(), ApplicationCommandTypeSchema])),
  id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
})

export type ApplicationCommandUpdateRequestSchema = v.InferOutput<
  typeof ApplicationCommandUpdateRequestSchema
>

export const ApplicationEventWebhooksStatusSchema = v.union([
  v.pipe(v.literal(1), v.description('Webhook events are disabled by developer')),
  v.pipe(v.literal(2), v.description('Webhook events are enabled by developer')),
  v.pipe(
    v.literal(3),
    v.description('Webhook events are disabled by Discord, usually due to inactivity'),
  ),
])

export type ApplicationEventWebhooksStatusSchema = v.InferOutput<
  typeof ApplicationEventWebhooksStatusSchema
>

export const ApplicationExplicitContentFilterTypesSchema = v.union([
  v.pipe(v.literal(0), v.description('inherit guild content filter setting')),
  v.pipe(v.literal(1), v.description('interactions will always be scanned')),
])

export type ApplicationExplicitContentFilterTypesSchema = v.InferOutput<
  typeof ApplicationExplicitContentFilterTypesSchema
>

export const ApplicationIdentityProviderAuthTypeSchema = v.union([
  v.literal('OIDC'),
  v.literal('EPIC_ONLINE_SERVICES_ACCESS_TOKEN'),
  v.literal('EPIC_ONLINE_SERVICES_ID_TOKEN'),
  v.literal('STEAM_SESSION_TICKET'),
  v.literal('UNITY_SERVICES_ID_TOKEN'),
  v.literal('DISCORD_BOT_ISSUED_ACCESS_TOKEN'),
  v.literal('APPLE_ID_TOKEN'),
  v.literal('PLAYSTATION_NETWORK_ID_TOKEN'),
])

export type ApplicationIdentityProviderAuthTypeSchema = v.InferOutput<
  typeof ApplicationIdentityProviderAuthTypeSchema
>

export const WebhookTypesSchema = v.union([
  v.pipe(
    v.literal(1),
    v.description('Incoming Webhooks can post messages to channels with a generated token'),
  ),
  v.pipe(
    v.literal(2),
    v.description(
      'Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels',
    ),
  ),
  v.pipe(v.literal(3), v.description('Application webhooks are webhooks used with Interactions')),
])

export type WebhookTypesSchema = v.InferOutput<typeof WebhookTypesSchema>

export const ApplicationIncomingWebhookResponseSchema = v.object({
  application_id: v.union([v.null(), SnowflakeTypeSchema]),
  avatar: v.nullable(v.string()),
  channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  guild_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  id: SnowflakeTypeSchema,
  name: v.string(),
  type: WebhookTypesSchema,
  user: v.optional(UserResponseSchema),
})

export type ApplicationIncomingWebhookResponseSchema = v.InferOutput<
  typeof ApplicationIncomingWebhookResponseSchema
>

export const ApplicationOAuth2InstallParamsSchema = v.partial(
  v.object({
    scopes: v.nullable(
      v.pipe(
        v.array(OAuth2ScopesSchema),
        v.minLength(1),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    permissions: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(18014398509481984)),
    ),
  }),
)

export type ApplicationOAuth2InstallParamsSchema = v.InferOutput<
  typeof ApplicationOAuth2InstallParamsSchema
>

export const ApplicationIntegrationTypeConfigurationSchema = v.partial(
  v.object({ oauth2_install_params: v.union([v.null(), ApplicationOAuth2InstallParamsSchema]) }),
)

export type ApplicationIntegrationTypeConfigurationSchema = v.InferOutput<
  typeof ApplicationIntegrationTypeConfigurationSchema
>

export const MetadataItemTypesSchema = v.union([
  v.pipe(
    v.literal(1),
    v.description(
      "the metadata value (integer) is less than or equal to the guild's configured value (integer)",
    ),
  ),
  v.pipe(
    v.literal(2),
    v.description(
      "the metadata value (integer) is greater than or equal to the guild's configured value (integer)",
    ),
  ),
  v.pipe(
    v.literal(3),
    v.description(
      "the metadata value (integer) is equal to the guild's configured value (integer)",
    ),
  ),
  v.pipe(
    v.literal(4),
    v.description(
      "the metadata value (integer) is not equal to the guild's configured value (integer)",
    ),
  ),
  v.pipe(
    v.literal(5),
    v.description(
      "the metadata value (ISO8601 string) is less than or equal to the guild's configured value (integer; days before current date)",
    ),
  ),
  v.pipe(
    v.literal(6),
    v.description(
      "the metadata value (ISO8601 string) is greater than or equal to the guild's configured value (integer; days before current date)",
    ),
  ),
  v.pipe(
    v.literal(7),
    v.description(
      "the metadata value (integer) is equal to the guild's configured value (integer; 1)",
    ),
  ),
  v.pipe(
    v.literal(8),
    v.description(
      "the metadata value (integer) is not equal to the guild's configured value (integer; 1)",
    ),
  ),
])

export type MetadataItemTypesSchema = v.InferOutput<typeof MetadataItemTypesSchema>

export const ApplicationRoleConnectionsMetadataItemRequestSchema = v.object({
  type: MetadataItemTypesSchema,
  key: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(50)),
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  name_localizations: v.optional(
    v.nullable(
      v.record(
        v.string(),
        v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
    ),
  ),
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(200)),
  description_localizations: v.optional(
    v.nullable(
      v.record(
        v.string(),
        v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(200))),
      ),
    ),
  ),
})

export type ApplicationRoleConnectionsMetadataItemRequestSchema = v.InferOutput<
  typeof ApplicationRoleConnectionsMetadataItemRequestSchema
>

export const ApplicationRoleConnectionsMetadataItemResponseSchema = v.object({
  type: MetadataItemTypesSchema,
  key: v.string(),
  name: v.string(),
  name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  description: v.string(),
  description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
})

export type ApplicationRoleConnectionsMetadataItemResponseSchema = v.InferOutput<
  typeof ApplicationRoleConnectionsMetadataItemResponseSchema
>

export const ApplicationUpdateFormPartialSchema = v.partial(
  v.object({
    description: v.nullable(
      v.object({
        default: v.pipe(v.string(), v.maxCodePoints(400)),
        localizations: v.optional(
          v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(400)))),
        ),
      }),
    ),
    icon: v.nullable(v.string()),
    cover_image: v.nullable(v.string()),
    team_id: v.union([v.null(), SnowflakeTypeSchema]),
    flags: v.nullable(v.pipe(v.number(), v.integer())),
    interactions_endpoint_url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    explicit_content_filter: v.union([v.null(), ApplicationExplicitContentFilterTypesSchema]),
    max_participants: v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(-1),
      ),
    ),
    type: v.union([v.null(), ApplicationTypesSchema]),
    tags: v.nullable(
      v.pipe(
        v.array(v.pipe(v.string(), v.maxCodePoints(20))),
        v.maxLength(5),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    custom_install_url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    install_params: v.union([v.null(), ApplicationOAuth2InstallParamsSchema]),
    role_connections_verification_url: v.nullable(
      v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
    ),
    integration_types_config: v.nullable(
      v.record(v.string(), v.union([v.null(), ApplicationIntegrationTypeConfigurationSchema])),
    ),
    event_webhooks_status: v.union([v.null(), ApplicationEventWebhooksStatusSchema]),
    event_webhooks_url: v.pipe(
      v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
      v.description('Event webhooks URL for the app to receive webhook events'),
    ),
    event_webhooks_types: v.nullable(
      v.pipe(
        v.array(ActionTypesSchema),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  }),
)

export type ApplicationUpdateFormPartialSchema = v.InferOutput<
  typeof ApplicationUpdateFormPartialSchema
>

export const ApplicationUserRoleConnectionResponseSchema = v.partial(
  v.object({
    platform_name: v.string(),
    platform_username: v.nullable(v.string()),
    metadata: v.record(v.string(), v.string()),
  }),
)

export type ApplicationUserRoleConnectionResponseSchema = v.InferOutput<
  typeof ApplicationUserRoleConnectionResponseSchema
>

export const AuditLogActionTypesSchema = v.union([
  v.literal(1),
  v.literal(10),
  v.literal(11),
  v.literal(12),
  v.literal(13),
  v.literal(14),
  v.literal(15),
  v.pipe(v.literal(16), v.description('Channels were reordered')),
  v.literal(20),
  v.literal(21),
  v.literal(22),
  v.literal(23),
  v.literal(24),
  v.literal(25),
  v.literal(26),
  v.literal(27),
  v.literal(28),
  v.literal(30),
  v.literal(31),
  v.literal(32),
  v.pipe(v.literal(33), v.description('Roles were reordered')),
  v.literal(40),
  v.literal(41),
  v.literal(42),
  v.literal(50),
  v.literal(51),
  v.literal(52),
  v.literal(60),
  v.literal(61),
  v.literal(62),
  v.literal(72),
  v.literal(73),
  v.literal(74),
  v.literal(75),
  v.literal(80),
  v.literal(81),
  v.literal(82),
  v.literal(83),
  v.literal(84),
  v.literal(85),
  v.literal(90),
  v.literal(91),
  v.literal(92),
  v.literal(100),
  v.literal(101),
  v.literal(102),
  v.literal(110),
  v.literal(111),
  v.literal(112),
  v.literal(121),
  v.literal(130),
  v.literal(131),
  v.literal(132),
  v.literal(140),
  v.literal(141),
  v.literal(142),
  v.literal(143),
  v.literal(144),
  v.literal(145),
  v.literal(146),
  v.literal(150),
  v.literal(151),
  v.literal(163),
  v.literal(164),
  v.literal(165),
  v.literal(166),
  v.literal(167),
  v.literal(171),
  v.literal(172),
  v.literal(180),
  v.literal(190),
  v.literal(191),
  v.literal(192),
  v.literal(193),
  v.pipe(v.literal(200), v.description('Scheduled event exception was created')),
  v.pipe(v.literal(201), v.description('Scheduled event exception was updated')),
  v.pipe(v.literal(202), v.description('Scheduled event exception was deleted')),
  v.literal(211),
])

export type AuditLogActionTypesSchema = v.InferOutput<typeof AuditLogActionTypesSchema>

export const AuditLogObjectChangeResponseSchema = v.object({
  key: v.nullable(v.string()),
  new_value: v.optional(v.any()),
  old_value: v.optional(v.any()),
})

export type AuditLogObjectChangeResponseSchema = v.InferOutput<
  typeof AuditLogObjectChangeResponseSchema
>

export const AuditLogEntryResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  action_type: AuditLogActionTypesSchema,
  user_id: v.union([v.null(), SnowflakeTypeSchema]),
  target_id: v.union([v.null(), SnowflakeTypeSchema]),
  changes: v.optional(v.array(AuditLogObjectChangeResponseSchema)),
  options: v.optional(v.record(v.string(), v.string())),
  reason: v.optional(v.string()),
})

export type AuditLogEntryResponseSchema = v.InferOutput<typeof AuditLogEntryResponseSchema>

export const AuthorTypeSchema = v.union([
  v.literal('user'),
  v.literal('bot'),
  v.literal('webhook'),
  v.literal('-user'),
  v.literal('-bot'),
  v.literal('-webhook'),
])

export type AuthorTypeSchema = v.InferOutput<typeof AuthorTypeSchema>

export const AutomodActionTypeSchema = v.union([
  v.pipe(
    v.literal(1),
    v.description(
      "Block a user's message and prevent it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked",
    ),
  ),
  v.pipe(
    v.literal(2),
    v.description(
      'Send a system message to a channel in order to log the user message that triggered the rule',
    ),
  ),
  v.pipe(
    v.literal(3),
    v.description("Temporarily disable a user's ability to communicate in the server (timeout)"),
  ),
  v.pipe(v.literal(4), v.description('Prevent a user from interacting in the server')),
])

export type AutomodActionTypeSchema = v.InferOutput<typeof AutomodActionTypeSchema>

export const AutomodEventTypeSchema = v.union([
  v.pipe(v.literal(1), v.description('A user submitted a message to a channel')),
  v.pipe(
    v.literal(2),
    v.description("A user is attempting to join the server or a member's properties were updated."),
  ),
])

export type AutomodEventTypeSchema = v.InferOutput<typeof AutomodEventTypeSchema>

export const AutomodKeywordPresetTypeSchema = v.union([
  v.pipe(v.literal(1), v.description('Words and phrases that may be considered profanity')),
  v.pipe(v.literal(2), v.description('Words and phrases that may be considered as sexual content')),
  v.pipe(
    v.literal(3),
    v.description('Words and phrases that may be considered slurs and hate speech'),
  ),
])

export type AutomodKeywordPresetTypeSchema = v.InferOutput<typeof AutomodKeywordPresetTypeSchema>

export const AutomodTriggerTypeSchema = v.union([
  v.pipe(
    v.literal(1),
    v.description('Check if content contains words from a list of keywords or matches regex'),
  ),
  v.pipe(v.literal(3), v.description('Check if content represents generic spam')),
  v.pipe(
    v.literal(4),
    v.description('Check if content contains words from internal pre-defined wordsets'),
  ),
  v.pipe(
    v.literal(5),
    v.description('Check if content contains more unique mentions than allowed'),
  ),
  v.pipe(
    v.literal(6),
    v.description(
      'Check if user profile fields contains words from a list of keywords or matches regex',
    ),
  ),
])

export type AutomodTriggerTypeSchema = v.InferOutput<typeof AutomodTriggerTypeSchema>

export const AvailableLocalesEnumSchema = v.union([
  v.pipe(v.literal('ar'), v.description('The ar locale')),
  v.pipe(v.literal('bg'), v.description('The bg locale')),
  v.pipe(v.literal('cs'), v.description('The cs locale')),
  v.pipe(v.literal('da'), v.description('The da locale')),
  v.pipe(v.literal('de'), v.description('The de locale')),
  v.pipe(v.literal('el'), v.description('The el locale')),
  v.pipe(v.literal('en-GB'), v.description('The en-GB locale')),
  v.pipe(v.literal('en-US'), v.description('The en-US locale')),
  v.pipe(v.literal('es-419'), v.description('The es-419 locale')),
  v.pipe(v.literal('es-ES'), v.description('The es-ES locale')),
  v.pipe(v.literal('fi'), v.description('The fi locale')),
  v.pipe(v.literal('fr'), v.description('The fr locale')),
  v.pipe(v.literal('he'), v.description('The he locale')),
  v.pipe(v.literal('hi'), v.description('The hi locale')),
  v.pipe(v.literal('hr'), v.description('The hr locale')),
  v.pipe(v.literal('hu'), v.description('The hu locale')),
  v.pipe(v.literal('id'), v.description('The id locale')),
  v.pipe(v.literal('it'), v.description('The it locale')),
  v.pipe(v.literal('ja'), v.description('The ja locale')),
  v.pipe(v.literal('ko'), v.description('The ko locale')),
  v.pipe(v.literal('lt'), v.description('The lt locale')),
  v.pipe(v.literal('nl'), v.description('The nl locale')),
  v.pipe(v.literal('no'), v.description('The no locale')),
  v.pipe(v.literal('pl'), v.description('The pl locale')),
  v.pipe(v.literal('pt-BR'), v.description('The pt-BR locale')),
  v.pipe(v.literal('ro'), v.description('The ro locale')),
  v.pipe(v.literal('ru'), v.description('The ru locale')),
  v.pipe(v.literal('sv-SE'), v.description('The sv-SE locale')),
  v.pipe(v.literal('th'), v.description('The th locale')),
  v.pipe(v.literal('tr'), v.description('The tr locale')),
  v.pipe(v.literal('uk'), v.description('The uk locale')),
  v.pipe(v.literal('vi'), v.description('The vi locale')),
  v.pipe(v.literal('zh-CN'), v.description('The zh-CN locale')),
  v.pipe(v.literal('zh-TW'), v.description('The zh-TW locale')),
])

export type AvailableLocalesEnumSchema = v.InferOutput<typeof AvailableLocalesEnumSchema>

export const BanUserFromGuildRequestSchema = v.partial(
  v.object({
    delete_message_seconds: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(604800)),
    ),
    delete_message_days: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(7))),
  }),
)

export type BanUserFromGuildRequestSchema = v.InferOutput<typeof BanUserFromGuildRequestSchema>

export const RichEmbedAuthorSchema = v.partial(
  v.object({
    name: v.nullable(v.pipe(v.string(), v.maxCodePoints(256))),
    url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    icon_url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
  }),
)

export type RichEmbedAuthorSchema = v.InferOutput<typeof RichEmbedAuthorSchema>

export const RichEmbedImageSchema = v.partial(
  v.object({
    url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    width: v.nullable(v.pipe(v.number(), v.integer())),
    height: v.nullable(v.pipe(v.number(), v.integer())),
    placeholder: v.nullable(v.pipe(v.string(), v.maxCodePoints(64))),
    placeholder_version: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(2147483647)),
    ),
    is_animated: v.nullable(v.boolean()),
    description: v.nullable(v.pipe(v.string(), v.maxCodePoints(4096))),
  }),
)

export type RichEmbedImageSchema = v.InferOutput<typeof RichEmbedImageSchema>

export const RichEmbedThumbnailSchema = v.partial(
  v.object({
    url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    width: v.nullable(v.pipe(v.number(), v.integer())),
    height: v.nullable(v.pipe(v.number(), v.integer())),
    placeholder: v.nullable(v.pipe(v.string(), v.maxCodePoints(64))),
    placeholder_version: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(2147483647)),
    ),
    is_animated: v.nullable(v.boolean()),
    description: v.nullable(v.pipe(v.string(), v.maxCodePoints(4096))),
  }),
)

export type RichEmbedThumbnailSchema = v.InferOutput<typeof RichEmbedThumbnailSchema>

export const RichEmbedFooterSchema = v.partial(
  v.object({
    text: v.nullable(v.pipe(v.string(), v.maxCodePoints(2048))),
    icon_url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
  }),
)

export type RichEmbedFooterSchema = v.InferOutput<typeof RichEmbedFooterSchema>

export const RichEmbedFieldSchema = v.object({
  name: v.pipe(v.string(), v.maxCodePoints(256)),
  value: v.pipe(v.string(), v.maxCodePoints(1024)),
  inline: v.optional(v.nullable(v.boolean())),
})

export type RichEmbedFieldSchema = v.InferOutput<typeof RichEmbedFieldSchema>

export const RichEmbedProviderSchema = v.partial(
  v.object({
    name: v.nullable(v.pipe(v.string(), v.maxCodePoints(256))),
    url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
  }),
)

export type RichEmbedProviderSchema = v.InferOutput<typeof RichEmbedProviderSchema>

export const RichEmbedVideoSchema = v.partial(
  v.object({
    url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    width: v.nullable(v.pipe(v.number(), v.integer())),
    height: v.nullable(v.pipe(v.number(), v.integer())),
    placeholder: v.nullable(v.pipe(v.string(), v.maxCodePoints(64))),
    placeholder_version: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(2147483647)),
    ),
    is_animated: v.nullable(v.boolean()),
    description: v.nullable(v.pipe(v.string(), v.maxCodePoints(4096))),
  }),
)

export type RichEmbedVideoSchema = v.InferOutput<typeof RichEmbedVideoSchema>

export const RichEmbedAudioSchema = v.partial(
  v.object({
    url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    description: v.nullable(v.pipe(v.string(), v.maxCodePoints(4096))),
  }),
)

export type RichEmbedAudioSchema = v.InferOutput<typeof RichEmbedAudioSchema>

export const RichEmbedSchema = v.partial(
  v.object({
    type: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
    url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    title: v.nullable(v.pipe(v.string(), v.maxCodePoints(256))),
    color: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215))),
    timestamp: v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    description: v.nullable(v.pipe(v.string(), v.maxCodePoints(4096))),
    author: v.union([v.null(), RichEmbedAuthorSchema]),
    image: v.union([v.null(), RichEmbedImageSchema]),
    thumbnail: v.union([v.null(), RichEmbedThumbnailSchema]),
    footer: v.union([v.null(), RichEmbedFooterSchema]),
    fields: v.nullable(v.pipe(v.array(RichEmbedFieldSchema), v.maxLength(25))),
    provider: v.union([v.null(), RichEmbedProviderSchema]),
    video: v.union([v.null(), RichEmbedVideoSchema]),
    audio: v.union([v.null(), RichEmbedAudioSchema]),
  }),
)

export type RichEmbedSchema = v.InferOutput<typeof RichEmbedSchema>

export const MessageAllowedMentionsRequestSchema = v.partial(
  v.object({
    parse: v.nullable(
      v.pipe(
        v.array(v.union([v.null(), AllowedMentionTypesSchema])),
        v.maxLength(1521),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    users: v.nullable(
      v.pipe(
        v.array(v.union([v.null(), SnowflakeTypeSchema])),
        v.maxLength(100),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    roles: v.nullable(
      v.pipe(
        v.array(v.union([v.null(), SnowflakeTypeSchema])),
        v.maxLength(100),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    replied_user: v.nullable(v.boolean()),
  }),
)

export type MessageAllowedMentionsRequestSchema = v.InferOutput<
  typeof MessageAllowedMentionsRequestSchema
>

export const UnfurledMediaRequestWithAttachmentReferenceRequiredSchema = v.object({
  url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
})

export type UnfurledMediaRequestWithAttachmentReferenceRequiredSchema = v.InferOutput<
  typeof UnfurledMediaRequestWithAttachmentReferenceRequiredSchema
>

export const FileComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  spoiler: v.optional(v.nullable(v.boolean())),
  file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
})

export type FileComponentForMessageRequestSchema = v.InferOutput<
  typeof FileComponentForMessageRequestSchema
>

export const UnfurledMediaRequestSchema = v.object({
  url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
})

export type UnfurledMediaRequestSchema = v.InferOutput<typeof UnfurledMediaRequestSchema>

export const MediaGalleryItemForMessageRequestSchema = v.object({
  description: v.optional(
    v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1024))),
  ),
  spoiler: v.optional(v.nullable(v.boolean())),
  media: UnfurledMediaRequestSchema,
})

export type MediaGalleryItemForMessageRequestSchema = v.InferOutput<
  typeof MediaGalleryItemForMessageRequestSchema
>

export const MediaGalleryComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  items: v.pipe(v.array(MediaGalleryItemForMessageRequestSchema), v.minLength(1), v.maxLength(10)),
})

export type MediaGalleryComponentForMessageRequestSchema = v.InferOutput<
  typeof MediaGalleryComponentForMessageRequestSchema
>

export const TextDisplayComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  content: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(4000)),
})

export type TextDisplayComponentForMessageRequestSchema = v.InferOutput<
  typeof TextDisplayComponentForMessageRequestSchema
>

export const ThumbnailComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  description: v.optional(
    v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1024))),
  ),
  spoiler: v.optional(v.nullable(v.boolean())),
  media: UnfurledMediaRequestSchema,
})

export type ThumbnailComponentForMessageRequestSchema = v.InferOutput<
  typeof ThumbnailComponentForMessageRequestSchema
>

export const SectionComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  components: v.pipe(
    v.array(TextDisplayComponentForMessageRequestSchema),
    v.minLength(1),
    v.maxLength(3),
  ),
  accessory: v.union([
    ButtonComponentForMessageRequestSchema,
    ThumbnailComponentForMessageRequestSchema,
  ]),
})

export type SectionComponentForMessageRequestSchema = v.InferOutput<
  typeof SectionComponentForMessageRequestSchema
>

export const MessageComponentSeparatorSpacingSizeSchema = v.union([
  v.pipe(v.literal(1), v.description('Small spacing')),
  v.pipe(v.literal(2), v.description('Large spacing')),
])

export type MessageComponentSeparatorSpacingSizeSchema = v.InferOutput<
  typeof MessageComponentSeparatorSpacingSizeSchema
>

export const SeparatorComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  spacing: v.optional(v.union([v.null(), MessageComponentSeparatorSpacingSizeSchema])),
  divider: v.optional(v.nullable(v.boolean())),
})

export type SeparatorComponentForMessageRequestSchema = v.InferOutput<
  typeof SeparatorComponentForMessageRequestSchema
>

export const ContainerComponentForMessageRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  accent_color: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215))),
  ),
  components: v.pipe(
    v.array(
      v.union([
        ActionRowComponentForMessageRequestSchema,
        FileComponentForMessageRequestSchema,
        MediaGalleryComponentForMessageRequestSchema,
        SectionComponentForMessageRequestSchema,
        SeparatorComponentForMessageRequestSchema,
        TextDisplayComponentForMessageRequestSchema,
      ]),
    ),
    v.minLength(1),
    v.maxLength(40),
  ),
  spoiler: v.optional(v.nullable(v.boolean())),
})

export type ContainerComponentForMessageRequestSchema = v.InferOutput<
  typeof ContainerComponentForMessageRequestSchema
>

export const MessageAttachmentRequestSchema = v.object({
  id: SnowflakeTypeSchema,
  filename: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1024)))),
  description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1024)))),
  duration_secs: v.optional(v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(2147483647)))),
  waveform: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(400)))),
  title: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1024)))),
  is_spoiler: v.optional(v.nullable(v.boolean())),
})

export type MessageAttachmentRequestSchema = v.InferOutput<typeof MessageAttachmentRequestSchema>

export const PollEmojiSchema = v.partial(
  v.object({
    id: v.pipe(
      v.union([v.null(), SnowflakeTypeSchema]),
      v.description('The ID of the custom emoji'),
    ),
    name: v.pipe(
      v.nullable(v.pipe(v.string(), v.maxCodePoints(32))),
      v.description('The name of the emoji, or the unicode emoji character'),
    ),
    animated: v.pipe(v.nullable(v.boolean()), v.description('Whether the emoji is animated')),
  }),
)

export type PollEmojiSchema = v.InferOutput<typeof PollEmojiSchema>

export const PollMediaSchema = v.partial(
  v.object({
    text: v.pipe(
      v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(300))),
      v.description('The text of the field'),
    ),
    emoji: v.pipe(v.union([v.null(), PollEmojiSchema]), v.description('The emoji of the field')),
  }),
)

export type PollMediaSchema = v.InferOutput<typeof PollMediaSchema>

export const PollEmojiCreateRequestSchema = v.partial(
  v.object({
    id: v.pipe(
      v.union([v.null(), SnowflakeTypeSchema]),
      v.description('The ID of the custom emoji'),
    ),
    name: v.pipe(
      v.nullable(v.pipe(v.string(), v.maxCodePoints(32))),
      v.description('The name of the emoji, or the unicode emoji character'),
    ),
    animated: v.pipe(v.nullable(v.boolean()), v.description('Whether the emoji is animated')),
  }),
)

export type PollEmojiCreateRequestSchema = v.InferOutput<typeof PollEmojiCreateRequestSchema>

export const PollMediaCreateRequestSchema = v.partial(
  v.object({
    text: v.pipe(
      v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(300))),
      v.description('The text of the field'),
    ),
    emoji: v.pipe(
      v.union([v.null(), PollEmojiCreateRequestSchema]),
      v.description('The emoji of the field'),
    ),
  }),
)

export type PollMediaCreateRequestSchema = v.InferOutput<typeof PollMediaCreateRequestSchema>

export const PollAnswerCreateRequestSchema = v.object({
  poll_media: v.pipe(PollMediaCreateRequestSchema, v.description('The data of the answer')),
})

export type PollAnswerCreateRequestSchema = v.InferOutput<typeof PollAnswerCreateRequestSchema>

export const PollLayoutTypesSchema = v.union([
  v.pipe(v.literal(1), v.description('The, uhm, default layout type.')),
])

export type PollLayoutTypesSchema = v.InferOutput<typeof PollLayoutTypesSchema>

export const PollCreateRequestSchema = v.object({
  question: v.pipe(
    PollMediaSchema,
    v.description('The question of the poll. Only `text` is supported.'),
  ),
  answers: v.pipe(
    v.pipe(v.array(PollAnswerCreateRequestSchema), v.minLength(1), v.maxLength(10)),
    v.description('Each of the answers available in the poll, up to 10'),
  ),
  allow_multiselect: v.optional(
    v.pipe(v.nullable(v.boolean()), v.description('Whether a user can select multiple answers')),
  ),
  layout_type: v.optional(
    v.pipe(
      v.union([v.null(), PollLayoutTypesSchema]),
      v.description('The layout type of the poll. Defaults to... DEFAULT!'),
    ),
  ),
  duration: v.optional(
    v.pipe(
      v.nullable(
        v.pipe(
          v.number(),
          v.integer(),
          v.minValue(-2147483648),
          v.maxValue(2147483647),
          v.minValue(1),
          v.maxValue(768),
        ),
      ),
      v.description('Number of hours the poll should be open for, up to 32 days. Defaults to 24'),
    ),
  ),
})

export type PollCreateRequestSchema = v.InferOutput<typeof PollCreateRequestSchema>

export const MessageShareCustomUserThemeBaseThemeSchema = v.union([
  v.pipe(v.literal(0), v.description('No base theme')),
  v.pipe(v.literal(1), v.description('Dark base theme')),
  v.pipe(v.literal(2), v.description('Light base theme')),
  v.pipe(v.literal(3), v.description('Darker base theme')),
  v.pipe(v.literal(4), v.description('Midnight base theme')),
])

export type MessageShareCustomUserThemeBaseThemeSchema = v.InferOutput<
  typeof MessageShareCustomUserThemeBaseThemeSchema
>

export const CustomClientThemeShareRequestSchema = v.object({
  colors: v.pipe(v.array(v.pipe(v.string(), v.codePoints(6))), v.minLength(1), v.maxLength(5)),
  gradient_angle: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
    v.minValue(0),
    v.maxValue(360),
  ),
  base_mix: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
    v.minValue(0),
    v.maxValue(100),
  ),
  base_theme: v.optional(v.union([v.null(), MessageShareCustomUserThemeBaseThemeSchema])),
})

export type CustomClientThemeShareRequestSchema = v.InferOutput<
  typeof CustomClientThemeShareRequestSchema
>

export const BaseCreateMessageCreateRequestSchema = v.partial(
  v.object({
    content: v.nullable(v.pipe(v.string(), v.maxCodePoints(4000))),
    embeds: v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10))),
    allowed_mentions: v.union([v.null(), MessageAllowedMentionsRequestSchema]),
    sticker_ids: v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(3))),
    components: v.nullable(
      v.pipe(
        v.array(
          v.union([
            ActionRowComponentForMessageRequestSchema,
            ContainerComponentForMessageRequestSchema,
            FileComponentForMessageRequestSchema,
            MediaGalleryComponentForMessageRequestSchema,
            SectionComponentForMessageRequestSchema,
            SeparatorComponentForMessageRequestSchema,
            TextDisplayComponentForMessageRequestSchema,
          ]),
        ),
        v.maxLength(40),
      ),
    ),
    flags: v.nullable(v.pipe(v.number(), v.integer())),
    attachments: v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
    poll: v.union([v.null(), PollCreateRequestSchema]),
    shared_client_theme: v.union([v.null(), CustomClientThemeShareRequestSchema]),
  }),
)

export type BaseCreateMessageCreateRequestSchema = v.InferOutput<
  typeof BaseCreateMessageCreateRequestSchema
>

export const BasicApplicationResponseWithBotSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  icon: v.nullable(v.string()),
  description: v.string(),
  type: v.union([v.null(), ApplicationTypesSchema]),
  cover_image: v.optional(v.string()),
  primary_sku_id: v.optional(SnowflakeTypeSchema),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  flags_new: v.string(),
  bot: v.optional(UserResponseSchema),
})

export type BasicApplicationResponseWithBotSchema = v.InferOutput<
  typeof BasicApplicationResponseWithBotSchema
>

export const BasicGuildMemberResponseSchema = v.object({
  avatar: v.pipe(v.nullable(v.string()), v.description("the member's guild avatar hash")),
  avatar_decoration_data: v.optional(
    v.pipe(
      v.union([v.null(), UserAvatarDecorationResponseSchema]),
      v.description("data for the member's guild avatar decoration"),
    ),
  ),
  banner: v.pipe(v.nullable(v.string()), v.description("the member's guild banner hash")),
  communication_disabled_until: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description(
      "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
    ),
  ),
  flags: v.pipe(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    v.description('guild member flags represented as a bit set, defaults to 0'),
  ),
  joined_at: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('when the user joined the guild'),
  ),
  nick: v.pipe(v.nullable(v.string()), v.description("this user's guild nickname")),
  pending: v.pipe(
    v.boolean(),
    v.description(
      "whether the user has not yet passed the guild's Membership Screening requirements",
    ),
  ),
  premium_since: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('when the user started boosting the guild'),
  ),
  roles: v.pipe(
    v.pipe(
      v.array(SnowflakeTypeSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
    v.description('array of role object ids'),
  ),
  collectibles: v.optional(
    v.pipe(
      v.union([v.null(), UserCollectiblesResponseSchema]),
      v.description("data for the member's collectibles"),
    ),
  ),
})

export type BasicGuildMemberResponseSchema = v.InferOutput<typeof BasicGuildMemberResponseSchema>

export const MessageTypeSchema = v.union([
  v.pipe(v.literal(0), v.description('')),
  v.pipe(v.literal(1), v.description('')),
  v.pipe(v.literal(2), v.description('')),
  v.pipe(v.literal(3), v.description('')),
  v.pipe(v.literal(4), v.description('')),
  v.pipe(v.literal(5), v.description('')),
  v.pipe(v.literal(6), v.description('')),
  v.pipe(v.literal(7), v.description('')),
  v.pipe(v.literal(8), v.description('')),
  v.pipe(v.literal(9), v.description('')),
  v.pipe(v.literal(10), v.description('')),
  v.pipe(v.literal(11), v.description('')),
  v.pipe(v.literal(12), v.description('')),
  v.pipe(v.literal(14), v.description('')),
  v.pipe(v.literal(15), v.description('')),
  v.pipe(v.literal(16), v.description('')),
  v.pipe(v.literal(17), v.description('')),
  v.pipe(v.literal(18), v.description('')),
  v.pipe(v.literal(19), v.description('')),
  v.pipe(v.literal(20), v.description('')),
  v.pipe(v.literal(21), v.description('')),
  v.pipe(v.literal(22), v.description('')),
  v.pipe(v.literal(23), v.description('')),
  v.pipe(v.literal(24), v.description('')),
  v.pipe(v.literal(25), v.description('')),
  v.pipe(v.literal(26), v.description('')),
  v.pipe(v.literal(27), v.description('')),
  v.pipe(v.literal(28), v.description('')),
  v.pipe(v.literal(29), v.description('')),
  v.pipe(v.literal(31), v.description('')),
  v.pipe(v.literal(32), v.description('')),
  v.pipe(v.literal(36), v.description('')),
  v.pipe(v.literal(37), v.description('')),
  v.pipe(v.literal(38), v.description('')),
  v.pipe(v.literal(39), v.description('')),
  v.pipe(v.literal(46), v.description('')),
  v.pipe(v.literal(55), v.description('')),
])

export type MessageTypeSchema = v.InferOutput<typeof MessageTypeSchema>

export const MessageAttachmentResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  filename: v.string(),
  size: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  url: v.pipe(v.string(), v.url()),
  proxy_url: v.pipe(v.string(), v.url()),
  width: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  height: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  duration_secs: v.optional(v.number()),
  waveform: v.optional(v.string()),
  description: v.optional(v.string()),
  content_type: v.optional(v.string()),
  ephemeral: v.optional(v.boolean()),
  flags: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  placeholder: v.optional(v.string()),
  placeholder_version: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  title: v.optional(v.nullable(v.string())),
  application: v.optional(ApplicationResponseSchema),
  clip_created_at: v.optional(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  clip_participants: v.optional(v.array(UserResponseSchema)),
})

export type MessageAttachmentResponseSchema = v.InferOutput<typeof MessageAttachmentResponseSchema>

export const MessageEmbedFieldResponseSchema = v.object({
  name: v.string(),
  value: v.string(),
  inline: v.boolean(),
})

export type MessageEmbedFieldResponseSchema = v.InferOutput<typeof MessageEmbedFieldResponseSchema>

export const MessageEmbedAuthorResponseSchema = v.object({
  name: v.string(),
  url: v.optional(v.string()),
  icon_url: v.optional(v.string()),
  proxy_icon_url: v.optional(v.pipe(v.string(), v.url())),
})

export type MessageEmbedAuthorResponseSchema = v.InferOutput<
  typeof MessageEmbedAuthorResponseSchema
>

export const MessageEmbedProviderResponseSchema = v.object({
  name: v.string(),
  url: v.optional(v.pipe(v.string(), v.url())),
})

export type MessageEmbedProviderResponseSchema = v.InferOutput<
  typeof MessageEmbedProviderResponseSchema
>

export const UInt32TypeSchema = v.pipe(
  v.union([v.bigint(), v.pipe(v.number(), v.integer()), v.pipe(v.string(), v.regex(/^-?\d+$/))]),
  v.transform((input) => BigInt(input)),
  v.minValue(-9223372036854775808n),
  v.maxValue(9223372036854775807n),
  v.minValue(0n),
  v.maxValue(4294967295n),
)

export type UInt32TypeSchema = v.InferOutput<typeof UInt32TypeSchema>

export const MessageEmbedImageResponseSchema = v.partial(
  v.object({
    url: v.string(),
    proxy_url: v.pipe(v.string(), v.url()),
    width: UInt32TypeSchema,
    height: UInt32TypeSchema,
    content_type: v.string(),
    placeholder: v.string(),
    placeholder_version: UInt32TypeSchema,
    description: v.string(),
    flags: UInt32TypeSchema,
  }),
)

export type MessageEmbedImageResponseSchema = v.InferOutput<typeof MessageEmbedImageResponseSchema>

export const MessageEmbedVideoResponseSchema = v.partial(
  v.object({
    url: v.string(),
    proxy_url: v.pipe(v.string(), v.url()),
    width: UInt32TypeSchema,
    height: UInt32TypeSchema,
    content_type: v.string(),
    placeholder: v.string(),
    placeholder_version: UInt32TypeSchema,
    description: v.string(),
    flags: UInt32TypeSchema,
  }),
)

export type MessageEmbedVideoResponseSchema = v.InferOutput<typeof MessageEmbedVideoResponseSchema>

export const MessageEmbedAudioResponseSchema = v.partial(
  v.object({
    url: v.string(),
    proxy_url: v.pipe(v.string(), v.url()),
    content_type: v.string(),
    description: v.string(),
  }),
)

export type MessageEmbedAudioResponseSchema = v.InferOutput<typeof MessageEmbedAudioResponseSchema>

export const MessageEmbedFooterResponseSchema = v.object({
  text: v.string(),
  icon_url: v.optional(v.string()),
  proxy_icon_url: v.optional(v.pipe(v.string(), v.url())),
})

export type MessageEmbedFooterResponseSchema = v.InferOutput<
  typeof MessageEmbedFooterResponseSchema
>

export const ContentScanMetadataResponseSchema = v.object({
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type ContentScanMetadataResponseSchema = v.InferOutput<
  typeof ContentScanMetadataResponseSchema
>

export const UnfurledMediaResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  url: v.string(),
  proxy_url: v.optional(v.string()),
  width: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
  height: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
  placeholder: v.optional(v.nullable(v.string())),
  placeholder_version: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
  content_scan_metadata: v.optional(ContentScanMetadataResponseSchema),
  content_type: v.optional(v.nullable(v.string())),
  flags: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  attachment_id: v.optional(SnowflakeTypeSchema),
})

export type UnfurledMediaResponseSchema = v.InferOutput<typeof UnfurledMediaResponseSchema>

export const FileComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  file: UnfurledMediaResponseSchema,
  name: v.nullable(v.string()),
  size: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  spoiler: v.boolean(),
})

export type FileComponentResponseSchema = v.InferOutput<typeof FileComponentResponseSchema>

export const MediaGalleryItemResponseSchema = v.object({
  media: UnfurledMediaResponseSchema,
  description: v.nullable(v.string()),
  spoiler: v.boolean(),
})

export type MediaGalleryItemResponseSchema = v.InferOutput<typeof MediaGalleryItemResponseSchema>

export const MediaGalleryComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  items: v.array(MediaGalleryItemResponseSchema),
})

export type MediaGalleryComponentResponseSchema = v.InferOutput<
  typeof MediaGalleryComponentResponseSchema
>

export const TextDisplayComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  content: v.string(),
})

export type TextDisplayComponentResponseSchema = v.InferOutput<
  typeof TextDisplayComponentResponseSchema
>

export const ThumbnailComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  media: UnfurledMediaResponseSchema,
  description: v.nullable(v.string()),
  spoiler: v.boolean(),
})

export type ThumbnailComponentResponseSchema = v.InferOutput<
  typeof ThumbnailComponentResponseSchema
>

export const SectionComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  components: v.array(TextDisplayComponentResponseSchema),
  accessory: v.union([ButtonComponentResponseSchema, ThumbnailComponentResponseSchema]),
})

export type SectionComponentResponseSchema = v.InferOutput<typeof SectionComponentResponseSchema>

export const SeparatorComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  spacing: MessageComponentSeparatorSpacingSizeSchema,
  divider: v.boolean(),
})

export type SeparatorComponentResponseSchema = v.InferOutput<
  typeof SeparatorComponentResponseSchema
>

export const ContainerComponentResponseSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  accent_color: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  components: v.array(
    v.union([
      ActionRowComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  spoiler: v.boolean(),
})

export type ContainerComponentResponseSchema = v.InferOutput<
  typeof ContainerComponentResponseSchema
>

export const MessageEmbedResponseSchema = v.object({
  type: v.string(),
  url: v.optional(v.pipe(v.string(), v.url())),
  title: v.optional(v.string()),
  description: v.optional(v.string()),
  color: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  timestamp: v.optional(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  fields: v.optional(v.array(MessageEmbedFieldResponseSchema)),
  author: v.optional(MessageEmbedAuthorResponseSchema),
  provider: v.optional(MessageEmbedProviderResponseSchema),
  image: v.optional(MessageEmbedImageResponseSchema),
  thumbnail: v.optional(MessageEmbedImageResponseSchema),
  video: v.optional(MessageEmbedVideoResponseSchema),
  audio: v.optional(MessageEmbedAudioResponseSchema),
  footer: v.optional(MessageEmbedFooterResponseSchema),
  flags: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
  components: v.optional(v.array(ContainerComponentResponseSchema)),
})

export type MessageEmbedResponseSchema = v.InferOutput<typeof MessageEmbedResponseSchema>

export const StickerTypesSchema = v.union([
  v.pipe(
    v.literal(1),
    v.description('an official sticker in a pack, part of Nitro or in a removed purchasable pack'),
  ),
  v.pipe(v.literal(2), v.description("a sticker uploaded to a guild for the guild's members")),
])

export type StickerTypesSchema = v.InferOutput<typeof StickerTypesSchema>

export const StickerFormatTypesSchema = v.union([
  v.literal(1),
  v.literal(2),
  v.literal(3),
  v.literal(4),
])

export type StickerFormatTypesSchema = v.InferOutput<typeof StickerFormatTypesSchema>

export const GuildStickerResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  tags: v.string(),
  type: StickerTypesSchema,
  format_type: v.union([v.null(), StickerFormatTypesSchema]),
  description: v.nullable(v.string()),
  available: v.boolean(),
  guild_id: SnowflakeTypeSchema,
  user: v.optional(UserResponseSchema),
})

export type GuildStickerResponseSchema = v.InferOutput<typeof GuildStickerResponseSchema>

export const StandardStickerResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  tags: v.string(),
  type: StickerTypesSchema,
  format_type: v.union([v.null(), StickerFormatTypesSchema]),
  description: v.nullable(v.string()),
  pack_id: SnowflakeTypeSchema,
  sort_value: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type StandardStickerResponseSchema = v.InferOutput<typeof StandardStickerResponseSchema>

export const MessageStickerItemResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  format_type: StickerFormatTypesSchema,
})

export type MessageStickerItemResponseSchema = v.InferOutput<
  typeof MessageStickerItemResponseSchema
>

export const MessageCallResponseSchema = v.object({
  ended_timestamp: v.optional(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  participants: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
})

export type MessageCallResponseSchema = v.InferOutput<typeof MessageCallResponseSchema>

export const MessageActivityResponseSchema = v.object({
  type: ActivityActionTypesSchema,
  party_id: v.optional(v.string()),
})

export type MessageActivityResponseSchema = v.InferOutput<typeof MessageActivityResponseSchema>

export const MessageInteractionResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  name: v.string(),
  user: v.optional(UserResponseSchema),
  name_localized: v.optional(v.string()),
})

export type MessageInteractionResponseSchema = v.InferOutput<
  typeof MessageInteractionResponseSchema
>

export const MessageReferenceTypeSchema = v.union([
  v.pipe(v.literal(0), v.description('Reference to a message')),
])

export type MessageReferenceTypeSchema = v.InferOutput<typeof MessageReferenceTypeSchema>

export const MessageReferenceResponseSchema = v.object({
  type: MessageReferenceTypeSchema,
  channel_id: SnowflakeTypeSchema,
  message_id: v.optional(SnowflakeTypeSchema),
  guild_id: v.optional(SnowflakeTypeSchema),
})

export type MessageReferenceResponseSchema = v.InferOutput<typeof MessageReferenceResponseSchema>

export const VideoQualityModesSchema = v.union([
  v.pipe(v.literal(1), v.description('Discord chooses the quality for optimal performance')),
  v.pipe(v.literal(2), v.description('720p')),
])

export type VideoQualityModesSchema = v.InferOutput<typeof VideoQualityModesSchema>

export const ThreadAutoArchiveDurationSchema = v.union([
  v.pipe(v.literal(60), v.description('One hour')),
  v.pipe(v.literal(1440), v.description('One day')),
  v.pipe(v.literal(4320), v.description('Three days')),
  v.pipe(v.literal(10080), v.description('Seven days')),
])

export type ThreadAutoArchiveDurationSchema = v.InferOutput<typeof ThreadAutoArchiveDurationSchema>

export const ThreadMetadataResponseSchema = v.object({
  archived: v.boolean(),
  archive_timestamp: v.nullable(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  auto_archive_duration: ThreadAutoArchiveDurationSchema,
  locked: v.boolean(),
  create_timestamp: v.optional(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  invitable: v.optional(v.boolean()),
})

export type ThreadMetadataResponseSchema = v.InferOutput<typeof ThreadMetadataResponseSchema>

export const GuildMemberResponseSchema = v.object({
  avatar: v.pipe(v.nullable(v.string()), v.description("the member's guild avatar hash")),
  avatar_decoration_data: v.optional(
    v.pipe(
      v.union([v.null(), UserAvatarDecorationResponseSchema]),
      v.description("data for the member's guild avatar decoration"),
    ),
  ),
  banner: v.pipe(v.nullable(v.string()), v.description("the member's guild banner hash")),
  communication_disabled_until: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description(
      "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
    ),
  ),
  flags: v.pipe(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    v.description('guild member flags represented as a bit set, defaults to 0'),
  ),
  joined_at: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('when the user joined the guild'),
  ),
  nick: v.pipe(v.nullable(v.string()), v.description("this user's guild nickname")),
  pending: v.pipe(
    v.boolean(),
    v.description(
      "whether the user has not yet passed the guild's Membership Screening requirements",
    ),
  ),
  premium_since: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('when the user started boosting the guild'),
  ),
  roles: v.pipe(
    v.pipe(
      v.array(SnowflakeTypeSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
    v.description('array of role object ids'),
  ),
  collectibles: v.optional(
    v.pipe(
      v.union([v.null(), UserCollectiblesResponseSchema]),
      v.description("data for the member's collectibles"),
    ),
  ),
  user: v.pipe(UserResponseSchema, v.description('the user this guild member represents')),
  mute: v.pipe(v.boolean(), v.description('whether the user is muted in voice channels')),
  deaf: v.pipe(v.boolean(), v.description('whether the user is deafened in voice channels')),
})

export type GuildMemberResponseSchema = v.InferOutput<typeof GuildMemberResponseSchema>

export const ThreadMemberResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  join_timestamp: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  member: v.optional(GuildMemberResponseSchema),
})

export type ThreadMemberResponseSchema = v.InferOutput<typeof ThreadMemberResponseSchema>

export const ThreadResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  last_pin_timestamp: v.optional(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  guild_id: SnowflakeTypeSchema,
  name: v.string(),
  parent_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  rate_limit_per_user: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  bitrate: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  user_limit: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  rtc_region: v.optional(v.nullable(v.string())),
  video_quality_mode: v.optional(VideoQualityModesSchema),
  permissions: v.optional(v.string()),
  owner_id: SnowflakeTypeSchema,
  thread_metadata: ThreadMetadataResponseSchema,
  message_count: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  member_count: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  total_message_sent: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  applied_tags: v.optional(v.array(SnowflakeTypeSchema)),
  member: v.optional(ThreadMemberResponseSchema),
})

export type ThreadResponseSchema = v.InferOutput<typeof ThreadResponseSchema>

export const MessageMentionChannelResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  type: ChannelTypesSchema,
  guild_id: SnowflakeTypeSchema,
})

export type MessageMentionChannelResponseSchema = v.InferOutput<
  typeof MessageMentionChannelResponseSchema
>

export const MessageRoleSubscriptionDataResponseSchema = v.object({
  role_subscription_listing_id: SnowflakeTypeSchema,
  tier_name: v.string(),
  total_months_subscribed: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  is_renewal: v.boolean(),
})

export type MessageRoleSubscriptionDataResponseSchema = v.InferOutput<
  typeof MessageRoleSubscriptionDataResponseSchema
>

export const PurchaseTypeSchema = v.union([v.literal(0)])

export type PurchaseTypeSchema = v.InferOutput<typeof PurchaseTypeSchema>

export const GuildProductPurchaseResponseSchema = v.object({
  listing_id: SnowflakeTypeSchema,
  product_name: v.string(),
})

export type GuildProductPurchaseResponseSchema = v.InferOutput<
  typeof GuildProductPurchaseResponseSchema
>

export const PurchaseNotificationResponseSchema = v.object({
  type: PurchaseTypeSchema,
  guild_product_purchase: v.optional(GuildProductPurchaseResponseSchema),
})

export type PurchaseNotificationResponseSchema = v.InferOutput<
  typeof PurchaseNotificationResponseSchema
>

export const ChannelPermissionOverwritesSchema = v.union([v.literal(0), v.literal(1)])

export type ChannelPermissionOverwritesSchema = v.InferOutput<
  typeof ChannelPermissionOverwritesSchema
>

export const ChannelPermissionOverwriteResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: ChannelPermissionOverwritesSchema,
  allow: v.string(),
  deny: v.string(),
})

export type ChannelPermissionOverwriteResponseSchema = v.InferOutput<
  typeof ChannelPermissionOverwriteResponseSchema
>

export const ForumTagResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  moderated: v.boolean(),
  emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
  emoji_name: v.nullable(v.string()),
})

export type ForumTagResponseSchema = v.InferOutput<typeof ForumTagResponseSchema>

export const DefaultReactionEmojiResponseSchema = v.object({
  emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
  emoji_name: v.nullable(v.string()),
})

export type DefaultReactionEmojiResponseSchema = v.InferOutput<
  typeof DefaultReactionEmojiResponseSchema
>

export const ThreadSortOrderSchema = v.union([
  v.pipe(v.literal(0), v.description('Sort forum posts by activity')),
  v.pipe(
    v.literal(1),
    v.description('Sort forum posts by creation time (from most recent to oldest)'),
  ),
])

export type ThreadSortOrderSchema = v.InferOutput<typeof ThreadSortOrderSchema>

export const ForumLayoutSchema = v.union([
  v.pipe(v.literal(0), v.description('No default has been set for forum channel')),
  v.pipe(v.literal(1), v.description('Display posts as a list')),
  v.pipe(v.literal(2), v.description('Display posts as a collection of tiles')),
])

export type ForumLayoutSchema = v.InferOutput<typeof ForumLayoutSchema>

export const ThreadSearchTagSettingSchema = v.union([
  v.pipe(
    v.literal('match_all'),
    v.description('The thread tags must contain all tags in the search query'),
  ),
  v.pipe(
    v.literal('match_some'),
    v.description('The thread tags must contain at least one of tags in the search query'),
  ),
])

export type ThreadSearchTagSettingSchema = v.InferOutput<typeof ThreadSearchTagSettingSchema>

export const GuildChannelResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  last_pin_timestamp: v.optional(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  guild_id: SnowflakeTypeSchema,
  name: v.string(),
  parent_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  rate_limit_per_user: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  bitrate: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  user_limit: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  rtc_region: v.optional(v.nullable(v.string())),
  video_quality_mode: v.optional(VideoQualityModesSchema),
  permissions: v.optional(v.string()),
  topic: v.optional(v.nullable(v.string())),
  default_auto_archive_duration: v.optional(ThreadAutoArchiveDurationSchema),
  default_thread_rate_limit_per_user: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  position: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  permission_overwrites: v.optional(v.array(ChannelPermissionOverwriteResponseSchema)),
  nsfw: v.optional(v.boolean()),
  available_tags: v.optional(v.array(ForumTagResponseSchema)),
  default_reaction_emoji: v.optional(v.union([v.null(), DefaultReactionEmojiResponseSchema])),
  default_sort_order: v.optional(v.union([v.null(), ThreadSortOrderSchema])),
  default_forum_layout: v.optional(ForumLayoutSchema),
  default_tag_setting: v.optional(v.union([v.null(), ThreadSearchTagSettingSchema])),
})

export type GuildChannelResponseSchema = v.InferOutput<typeof GuildChannelResponseSchema>

export const PrivateChannelResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  last_pin_timestamp: v.optional(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  recipients: v.array(UserResponseSchema),
})

export type PrivateChannelResponseSchema = v.InferOutput<typeof PrivateChannelResponseSchema>

export const PrivateGroupChannelResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  last_pin_timestamp: v.optional(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  recipients: v.array(UserResponseSchema),
  name: v.nullable(v.string()),
  icon: v.nullable(v.string()),
  owner_id: SnowflakeTypeSchema,
  managed: v.optional(v.boolean()),
  application_id: v.optional(SnowflakeTypeSchema),
})

export type PrivateGroupChannelResponseSchema = v.InferOutput<
  typeof PrivateGroupChannelResponseSchema
>

export const GuildRoleColorsResponseSchema = v.object({
  primary_color: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  secondary_color: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  tertiary_color: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
})

export type GuildRoleColorsResponseSchema = v.InferOutput<typeof GuildRoleColorsResponseSchema>

export const GuildRoleTagsResponseSchema = v.partial(
  v.object({
    premium_subscriber: v.null(),
    bot_id: SnowflakeTypeSchema,
    integration_id: SnowflakeTypeSchema,
    subscription_listing_id: SnowflakeTypeSchema,
    available_for_purchase: v.null(),
    guild_connections: v.null(),
  }),
)

export type GuildRoleTagsResponseSchema = v.InferOutput<typeof GuildRoleTagsResponseSchema>

export const GuildRoleResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  permissions: v.string(),
  position: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  color: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  colors: GuildRoleColorsResponseSchema,
  hoist: v.boolean(),
  managed: v.boolean(),
  mentionable: v.boolean(),
  icon: v.nullable(v.string()),
  unicode_emoji: v.nullable(v.string()),
  tags: v.optional(GuildRoleTagsResponseSchema),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type GuildRoleResponseSchema = v.InferOutput<typeof GuildRoleResponseSchema>

export const ResolvedObjectsResponseSchema = v.partial(
  v.object({
    users: v.nullable(v.record(v.string(), UserResponseSchema)),
    members: v.nullable(v.record(v.string(), BasicGuildMemberResponseSchema)),
    channels: v.nullable(
      v.record(
        v.string(),
        v.union([
          GuildChannelResponseSchema,
          PrivateChannelResponseSchema,
          PrivateGroupChannelResponseSchema,
          ThreadResponseSchema,
        ]),
      ),
    ),
    roles: v.nullable(v.record(v.string(), GuildRoleResponseSchema)),
  }),
)

export type ResolvedObjectsResponseSchema = v.InferOutput<typeof ResolvedObjectsResponseSchema>

export const MessageReactionEmojiResponseSchema = v.object({
  id: v.union([v.null(), SnowflakeTypeSchema]),
  name: v.nullable(v.string()),
  animated: v.optional(v.boolean()),
})

export type MessageReactionEmojiResponseSchema = v.InferOutput<
  typeof MessageReactionEmojiResponseSchema
>

export const PollMediaResponseSchema = v.partial(
  v.object({
    text: v.pipe(v.string(), v.description('The text of the field')),
    emoji: v.pipe(MessageReactionEmojiResponseSchema, v.description('The emoji of the field')),
  }),
)

export type PollMediaResponseSchema = v.InferOutput<typeof PollMediaResponseSchema>

export const PollAnswerResponseSchema = v.object({
  answer_id: v.pipe(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    v.description('The ID of the answer'),
  ),
  poll_media: v.pipe(PollMediaResponseSchema, v.description('The data of the answer')),
})

export type PollAnswerResponseSchema = v.InferOutput<typeof PollAnswerResponseSchema>

export const PollResultsEntryResponseSchema = v.object({
  id: v.pipe(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    v.description('The answer_id'),
  ),
  count: v.pipe(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    v.description('The number of votes for this answer'),
  ),
  me_voted: v.pipe(v.boolean(), v.description('Whether the current user voted for this answer')),
})

export type PollResultsEntryResponseSchema = v.InferOutput<typeof PollResultsEntryResponseSchema>

export const PollResultsResponseSchema = v.object({
  answer_counts: v.pipe(
    v.array(PollResultsEntryResponseSchema),
    v.description('The counts for each answer'),
  ),
  is_finalized: v.pipe(v.boolean(), v.description('Whether the votes have been precisely counted')),
})

export type PollResultsResponseSchema = v.InferOutput<typeof PollResultsResponseSchema>

export const PollResponseSchema = v.object({
  question: v.pipe(
    PollMediaResponseSchema,
    v.description('The question of the poll. Only `text` is supported.'),
  ),
  answers: v.pipe(
    v.array(PollAnswerResponseSchema),
    v.description('Each of the answers available in the poll'),
  ),
  expiry: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('The time when the poll ends'),
  ),
  allow_multiselect: v.pipe(
    v.boolean(),
    v.description('Whether a user can select multiple answers'),
  ),
  layout_type: v.pipe(PollLayoutTypesSchema, v.description('The layout type of the poll')),
  results: v.pipe(PollResultsResponseSchema, v.description('The results of the poll')),
})

export type PollResponseSchema = v.InferOutput<typeof PollResponseSchema>

export const CustomClientThemeResponseSchema = v.object({
  colors: v.array(v.string()),
  gradient_angle: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  base_mix: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  base_theme: MessageShareCustomUserThemeBaseThemeSchema,
})

export type CustomClientThemeResponseSchema = v.InferOutput<typeof CustomClientThemeResponseSchema>

export const MessageComponentInteractionMetadataResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  user: v.optional(UserResponseSchema),
  authorizing_integration_owners: v.record(v.string(), SnowflakeTypeSchema),
  original_response_message_id: v.optional(SnowflakeTypeSchema),
  interacted_message_id: SnowflakeTypeSchema,
})

export type MessageComponentInteractionMetadataResponseSchema = v.InferOutput<
  typeof MessageComponentInteractionMetadataResponseSchema
>

export const ModalSubmitInteractionMetadataResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  user: v.optional(UserResponseSchema),
  authorizing_integration_owners: v.record(v.string(), SnowflakeTypeSchema),
  original_response_message_id: v.optional(SnowflakeTypeSchema),
  triggering_interaction_metadata: v.union([
    ApplicationCommandInteractionMetadataResponseSchema,
    MessageComponentInteractionMetadataResponseSchema,
  ]),
})

export type ModalSubmitInteractionMetadataResponseSchema = v.InferOutput<
  typeof ModalSubmitInteractionMetadataResponseSchema
>

export const MinimalContentMessageResponseSchema = v.object({
  type: MessageTypeSchema,
  content: v.string(),
  mentions: v.array(UserResponseSchema),
  mention_roles: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  attachments: v.array(MessageAttachmentResponseSchema),
  embeds: v.array(MessageEmbedResponseSchema),
  timestamp: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  edited_timestamp: v.nullable(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  components: v.array(
    v.union([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: v.optional(
    v.array(v.union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  ),
  sticker_items: v.optional(v.array(MessageStickerItemResponseSchema)),
})

export type MinimalContentMessageResponseSchema = v.InferOutput<
  typeof MinimalContentMessageResponseSchema
>

export const MessageSnapshotResponseSchema = v.object({
  message: MinimalContentMessageResponseSchema,
})

export type MessageSnapshotResponseSchema = v.InferOutput<typeof MessageSnapshotResponseSchema>

export const MessageLobbyMemberResponseSchema = v.object({ additional_name: v.string() })

export type MessageLobbyMemberResponseSchema = v.InferOutput<
  typeof MessageLobbyMemberResponseSchema
>

export const BasicMessageResponseSchema = v.object({
  type: MessageTypeSchema,
  content: v.string(),
  mentions: v.array(UserResponseSchema),
  mention_roles: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  attachments: v.array(MessageAttachmentResponseSchema),
  embeds: v.array(MessageEmbedResponseSchema),
  timestamp: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  edited_timestamp: v.nullable(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  components: v.array(
    v.union([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: v.optional(
    v.array(v.union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  ),
  sticker_items: v.optional(v.array(MessageStickerItemResponseSchema)),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: v.boolean(),
  mention_everyone: v.boolean(),
  tts: v.boolean(),
  call: v.optional(MessageCallResponseSchema),
  activity: v.optional(MessageActivityResponseSchema),
  application: v.optional(BasicApplicationResponseWithBotSchema),
  application_id: v.optional(SnowflakeTypeSchema),
  interaction: v.optional(MessageInteractionResponseSchema),
  nonce: v.optional(
    v.union([
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775808n),
      ),
      v.pipe(v.string(), v.maxCodePoints(25)),
    ]),
  ),
  webhook_id: v.optional(SnowflakeTypeSchema),
  message_reference: v.optional(MessageReferenceResponseSchema),
  thread: v.optional(ThreadResponseSchema),
  mention_channels: v.optional(v.array(MessageMentionChannelResponseSchema)),
  role_subscription_data: v.optional(MessageRoleSubscriptionDataResponseSchema),
  purchase_notification: v.optional(PurchaseNotificationResponseSchema),
  position: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  resolved: v.optional(ResolvedObjectsResponseSchema),
  poll: v.optional(PollResponseSchema),
  shared_client_theme: v.optional(CustomClientThemeResponseSchema),
  interaction_metadata: v.optional(
    v.union([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
      ModalSubmitInteractionMetadataResponseSchema,
    ]),
  ),
  message_snapshots: v.optional(v.array(MessageSnapshotResponseSchema)),
  lobby_member: v.optional(MessageLobbyMemberResponseSchema),
  actor: v.optional(UserResponseSchema),
})

export type BasicMessageResponseSchema = v.InferOutput<typeof BasicMessageResponseSchema>

export const BlockMessageActionMetadataSchema = v.partial(
  v.object({ custom_message: v.nullable(v.pipe(v.string(), v.maxCodePoints(300))) }),
)

export type BlockMessageActionMetadataSchema = v.InferOutput<
  typeof BlockMessageActionMetadataSchema
>

export const BlockMessageActionSchema = v.object({
  type: AutomodActionTypeSchema,
  metadata: v.optional(v.union([v.null(), BlockMessageActionMetadataSchema])),
})

export type BlockMessageActionSchema = v.InferOutput<typeof BlockMessageActionSchema>

export const BlockMessageActionMetadataResponseSchema = v.partial(
  v.object({ custom_message: v.string() }),
)

export type BlockMessageActionMetadataResponseSchema = v.InferOutput<
  typeof BlockMessageActionMetadataResponseSchema
>

export const BlockMessageActionResponseSchema = v.object({
  type: AutomodActionTypeSchema,
  metadata: BlockMessageActionMetadataResponseSchema,
})

export type BlockMessageActionResponseSchema = v.InferOutput<
  typeof BlockMessageActionResponseSchema
>

export const BotAccountPatchRequestSchema = v.object({
  username: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
  avatar: v.optional(v.nullable(v.string())),
  banner: v.optional(v.nullable(v.string())),
})

export type BotAccountPatchRequestSchema = v.InferOutput<typeof BotAccountPatchRequestSchema>

export const BotAddGuildMemberRequestSchema = v.object({
  nick: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(32)))),
  roles: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(250),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  mute: v.optional(v.nullable(v.boolean())),
  deaf: v.optional(v.nullable(v.boolean())),
  access_token: v.pipe(v.string(), v.maxCodePoints(10240)),
  flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
})

export type BotAddGuildMemberRequestSchema = v.InferOutput<typeof BotAddGuildMemberRequestSchema>

export const BulkBanUsersRequestSchema = v.object({
  user_ids: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.maxLength(200),
    v.check((input) => new Set(input).size === input.length),
  ),
  delete_message_seconds: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(604800))),
  ),
})

export type BulkBanUsersRequestSchema = v.InferOutput<typeof BulkBanUsersRequestSchema>

export const BulkBanUsersResponseSchema = v.object({
  banned_users: v.array(SnowflakeTypeSchema),
  failed_users: v.array(SnowflakeTypeSchema),
})

export type BulkBanUsersResponseSchema = v.InferOutput<typeof BulkBanUsersResponseSchema>

export const BulkLobbyMemberRequestSchema = v.object({
  id: SnowflakeTypeSchema,
  metadata: v.optional(v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024))))),
  flags: v.optional(v.union([v.null(), v.literal(1)])),
  additional_name: v.optional(
    v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80))),
  ),
  remove_member: v.optional(v.nullable(v.boolean())),
})

export type BulkLobbyMemberRequestSchema = v.InferOutput<typeof BulkLobbyMemberRequestSchema>

export const RecurrenceRuleWeekdaysSchema = v.union([
  v.literal(0),
  v.literal(1),
  v.literal(2),
  v.literal(3),
  v.literal(4),
  v.literal(5),
  v.literal(6),
])

export type RecurrenceRuleWeekdaysSchema = v.InferOutput<typeof RecurrenceRuleWeekdaysSchema>

export const ByNWeekdaySchema = v.object({
  n: v.pipe(
    v.pipe(
      v.number(),
      v.integer(),
      v.minValue(-2147483648),
      v.maxValue(2147483647),
      v.minValue(1),
      v.maxValue(5),
    ),
    v.description('The week to reoccur on (1-5, where 5 represents the last week)'),
  ),
  day: v.pipe(RecurrenceRuleWeekdaysSchema, v.description('The day within the week to reoccur on')),
})

export type ByNWeekdaySchema = v.InferOutput<typeof ByNWeekdaySchema>

export const ByNWeekdayResponseSchema = v.object({
  n: v.pipe(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    v.description('The week to reoccur on (1-5, where 5 represents the last week)'),
  ),
  day: v.pipe(RecurrenceRuleWeekdaysSchema, v.description('The day within the week to reoccur on')),
})

export type ByNWeekdayResponseSchema = v.InferOutput<typeof ByNWeekdayResponseSchema>

export const ChannelFollowerResponseSchema = v.object({
  channel_id: SnowflakeTypeSchema,
  webhook_id: SnowflakeTypeSchema,
})

export type ChannelFollowerResponseSchema = v.InferOutput<typeof ChannelFollowerResponseSchema>

export const WebhookSourceGuildResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  icon: v.nullable(v.string()),
  name: v.string(),
})

export type WebhookSourceGuildResponseSchema = v.InferOutput<
  typeof WebhookSourceGuildResponseSchema
>

export const WebhookSourceChannelResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
})

export type WebhookSourceChannelResponseSchema = v.InferOutput<
  typeof WebhookSourceChannelResponseSchema
>

export const ChannelFollowerWebhookResponseSchema = v.object({
  application_id: v.union([v.null(), SnowflakeTypeSchema]),
  avatar: v.nullable(v.string()),
  channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  guild_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  id: SnowflakeTypeSchema,
  name: v.string(),
  type: WebhookTypesSchema,
  user: v.optional(UserResponseSchema),
  source_guild: v.optional(WebhookSourceGuildResponseSchema),
  source_channel: v.optional(WebhookSourceChannelResponseSchema),
})

export type ChannelFollowerWebhookResponseSchema = v.InferOutput<
  typeof ChannelFollowerWebhookResponseSchema
>

export const ChannelPermissionOverwriteRequestSchema = v.object({
  id: SnowflakeTypeSchema,
  type: v.optional(v.union([v.null(), ChannelPermissionOverwritesSchema])),
  allow: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
  deny: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
})

export type ChannelPermissionOverwriteRequestSchema = v.InferOutput<
  typeof ChannelPermissionOverwriteRequestSchema
>

export const ChannelSelectComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  placeholder: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(150)))),
  min_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(25))),
  ),
  max_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(25))),
  ),
  disabled: v.optional(v.nullable(v.boolean())),
  required: v.optional(v.nullable(v.boolean())),
  default_values: v.optional(
    v.nullable(v.pipe(v.array(ChannelSelectDefaultValueSchema), v.maxLength(25))),
  ),
  channel_types: v.optional(
    v.nullable(
      v.pipe(
        v.array(ChannelTypesSchema),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
})

export type ChannelSelectComponentForModalRequestSchema = v.InferOutput<
  typeof ChannelSelectComponentForModalRequestSchema
>

export const CheckboxComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  default: v.optional(v.nullable(v.boolean())),
})

export type CheckboxComponentForModalRequestSchema = v.InferOutput<
  typeof CheckboxComponentForModalRequestSchema
>

export const CheckboxGroupOptionForRequestSchema = v.object({
  label: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  value: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
  default: v.optional(v.nullable(v.boolean())),
})

export type CheckboxGroupOptionForRequestSchema = v.InferOutput<
  typeof CheckboxGroupOptionForRequestSchema
>

export const CheckboxGroupComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  min_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(10))),
  ),
  max_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(10))),
  ),
  required: v.optional(v.nullable(v.boolean())),
  options: v.pipe(v.array(CheckboxGroupOptionForRequestSchema), v.minLength(1), v.maxLength(10)),
})

export type CheckboxGroupComponentForModalRequestSchema = v.InferOutput<
  typeof CheckboxGroupComponentForModalRequestSchema
>

export const CommandPermissionResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: ApplicationCommandPermissionTypeSchema,
  permission: v.boolean(),
})

export type CommandPermissionResponseSchema = v.InferOutput<typeof CommandPermissionResponseSchema>

export const CommandPermissionsResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  permissions: v.array(CommandPermissionResponseSchema),
})

export type CommandPermissionsResponseSchema = v.InferOutput<
  typeof CommandPermissionsResponseSchema
>

export const ConnectedAccountGuildResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  icon: v.nullable(v.string()),
})

export type ConnectedAccountGuildResponseSchema = v.InferOutput<
  typeof ConnectedAccountGuildResponseSchema
>

export const IntegrationTypesSchema = v.union([
  v.literal('discord'),
  v.literal('twitch'),
  v.literal('youtube'),
  v.literal('guild_subscription'),
])

export type IntegrationTypesSchema = v.InferOutput<typeof IntegrationTypesSchema>

export const ConnectedAccountIntegrationResponseSchema = v.object({
  id: v.string(),
  type: IntegrationTypesSchema,
  account: AccountResponseSchema,
  guild: ConnectedAccountGuildResponseSchema,
})

export type ConnectedAccountIntegrationResponseSchema = v.InferOutput<
  typeof ConnectedAccountIntegrationResponseSchema
>

export const ConnectedAccountProvidersSchema = v.union([
  v.literal('battlenet'),
  v.literal('bluesky'),
  v.literal('bungie'),
  v.literal('ebay'),
  v.literal('epicgames'),
  v.literal('facebook'),
  v.literal('github'),
  v.literal('instagram'),
  v.literal('letterboxd'),
  v.literal('mastodon'),
  v.literal('leagueoflegends'),
  v.literal('paypal'),
  v.literal('playstation'),
  v.literal('reddit'),
  v.literal('riotgames'),
  v.literal('roblox'),
  v.literal('skype'),
  v.literal('spotify'),
  v.literal('steam'),
  v.literal('tiktok'),
  v.literal('twitch'),
  v.literal('twitter'),
  v.literal('xbox'),
  v.literal('youtube'),
  v.literal('domain'),
])

export type ConnectedAccountProvidersSchema = v.InferOutput<typeof ConnectedAccountProvidersSchema>

export const ConnectedAccountVisibilitySchema = v.union([v.literal(0), v.literal(1)])

export type ConnectedAccountVisibilitySchema = v.InferOutput<
  typeof ConnectedAccountVisibilitySchema
>

export const ConnectedAccountResponseSchema = v.object({
  id: v.string(),
  name: v.nullable(v.string()),
  type: ConnectedAccountProvidersSchema,
  friend_sync: v.boolean(),
  integrations: v.optional(v.array(ConnectedAccountIntegrationResponseSchema)),
  show_activity: v.boolean(),
  two_way_link: v.boolean(),
  verified: v.boolean(),
  visibility: ConnectedAccountVisibilitySchema,
  revoked: v.optional(v.boolean()),
})

export type ConnectedAccountResponseSchema = v.InferOutput<typeof ConnectedAccountResponseSchema>

export const EntitlementOwnerTypesSchema = v.union([
  v.pipe(v.literal(1), v.description('A guild subscription')),
  v.pipe(v.literal(2), v.description('A user subscription')),
])

export type EntitlementOwnerTypesSchema = v.InferOutput<typeof EntitlementOwnerTypesSchema>

export const CreateEntitlementRequestDataSchema = v.object({
  sku_id: v.pipe(SnowflakeTypeSchema, v.description('ID of the SKU to grant the entitlement to')),
  owner_id: v.pipe(
    SnowflakeTypeSchema,
    v.description('ID of the guild or user to grant the entitlement to'),
  ),
  owner_type: v.pipe(
    EntitlementOwnerTypesSchema,
    v.description('1 for a guild subscription, 2 for a user subscription'),
  ),
})

export type CreateEntitlementRequestDataSchema = v.InferOutput<
  typeof CreateEntitlementRequestDataSchema
>

export const CreateForumThreadRequestSchema = v.object({
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  auto_archive_duration: v.optional(v.union([v.null(), ThreadAutoArchiveDurationSchema])),
  rate_limit_per_user: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
        v.maxValue(21600),
      ),
    ),
  ),
  applied_tags: v.optional(v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(5)))),
  message: BaseCreateMessageCreateRequestSchema,
})

export type CreateForumThreadRequestSchema = v.InferOutput<typeof CreateForumThreadRequestSchema>

export const CreateGroupDMInviteRequestSchema = v.partial(
  v.object({
    max_age: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(2592000))),
  }),
)

export type CreateGroupDMInviteRequestSchema = v.InferOutput<
  typeof CreateGroupDMInviteRequestSchema
>

export const UpdateDefaultReactionEmojiRequestSchema = v.partial(
  v.object({
    emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
    emoji_name: v.nullable(v.pipe(v.string(), v.maxCodePoints(100))),
  }),
)

export type UpdateDefaultReactionEmojiRequestSchema = v.InferOutput<
  typeof UpdateDefaultReactionEmojiRequestSchema
>

export const CreateOrUpdateThreadTagRequestSchema = v.object({
  name: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(50)),
  emoji_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  emoji_name: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
  moderated: v.optional(v.nullable(v.boolean())),
})

export type CreateOrUpdateThreadTagRequestSchema = v.InferOutput<
  typeof CreateOrUpdateThreadTagRequestSchema
>

export const CreateGuildChannelRequestSchema = v.object({
  type: v.optional(v.union([v.null(), ChannelTypesSchema])),
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  position: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  topic: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(4096)))),
  bitrate: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(8000),
      ),
    ),
  ),
  user_limit: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  nsfw: v.optional(v.nullable(v.boolean())),
  rate_limit_per_user: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(21600))),
  ),
  parent_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  permission_overwrites: v.optional(
    v.nullable(v.pipe(v.array(ChannelPermissionOverwriteRequestSchema), v.maxLength(100))),
  ),
  rtc_region: v.optional(v.nullable(v.string())),
  video_quality_mode: v.optional(v.union([v.null(), VideoQualityModesSchema])),
  default_auto_archive_duration: v.optional(v.union([v.null(), ThreadAutoArchiveDurationSchema])),
  default_reaction_emoji: v.optional(v.union([v.null(), UpdateDefaultReactionEmojiRequestSchema])),
  default_thread_rate_limit_per_user: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(21600))),
  ),
  default_sort_order: v.optional(v.union([v.null(), ThreadSortOrderSchema])),
  default_forum_layout: v.optional(v.union([v.null(), ForumLayoutSchema])),
  default_tag_setting: v.optional(v.union([v.null(), ThreadSearchTagSettingSchema])),
  available_tags: v.optional(
    v.nullable(
      v.pipe(v.array(v.union([v.null(), CreateOrUpdateThreadTagRequestSchema])), v.maxLength(20)),
    ),
  ),
})

export type CreateGuildChannelRequestSchema = v.InferOutput<typeof CreateGuildChannelRequestSchema>

export const InviteTargetTypesSchema = v.union([v.literal(1), v.literal(2), v.literal(3)])

export type InviteTargetTypesSchema = v.InferOutput<typeof InviteTargetTypesSchema>

export const CreateGuildInviteRequestSchema = v.partial(
  v.object({
    max_age: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(5184000))),
    temporary: v.nullable(v.boolean()),
    max_uses: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100))),
    unique: v.nullable(v.boolean()),
    target_user_id: v.union([v.null(), SnowflakeTypeSchema]),
    target_application_id: v.union([v.null(), SnowflakeTypeSchema]),
    target_type: v.union([v.null(), InviteTargetTypesSchema]),
    role_ids: v.union([
      v.string(),
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(250),
        v.check((input) => new Set(input).size === input.length),
      ),
      v.null(),
    ]),
    target_user_ids: v.pipe(
      v.union([
        v.string(),
        v.pipe(
          v.array(SnowflakeTypeSchema),
          v.maxLength(1000),
          v.check((input) => new Set(input).size === input.length),
        ),
        v.null(),
      ]),
      v.description('The IDs of the users to target with this invite.'),
    ),
  }),
)

export type CreateGuildInviteRequestSchema = v.InferOutput<typeof CreateGuildInviteRequestSchema>

export const IncomingWebhookInteractionRequestSchema = v.partial(
  v.object({
    content: v.nullable(v.pipe(v.string(), v.maxCodePoints(2000))),
    embeds: v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10))),
    allowed_mentions: v.union([v.null(), MessageAllowedMentionsRequestSchema]),
    components: v.nullable(
      v.pipe(
        v.array(
          v.union([
            ActionRowComponentForMessageRequestSchema,
            ContainerComponentForMessageRequestSchema,
            FileComponentForMessageRequestSchema,
            MediaGalleryComponentForMessageRequestSchema,
            SectionComponentForMessageRequestSchema,
            SeparatorComponentForMessageRequestSchema,
            TextDisplayComponentForMessageRequestSchema,
          ]),
        ),
        v.maxLength(40),
      ),
    ),
    attachments: v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
    poll: v.union([v.null(), PollCreateRequestSchema]),
    tts: v.nullable(v.boolean()),
    flags: v.nullable(v.pipe(v.number(), v.integer())),
  }),
)

export type IncomingWebhookInteractionRequestSchema = v.InferOutput<
  typeof IncomingWebhookInteractionRequestSchema
>

export const CreateMessageInteractionCallbackRequestSchema = v.object({
  type: InteractionCallbackTypesSchema,
  data: v.optional(v.union([v.null(), IncomingWebhookInteractionRequestSchema])),
})

export type CreateMessageInteractionCallbackRequestSchema = v.InferOutput<
  typeof CreateMessageInteractionCallbackRequestSchema
>

export const MessageReactionCountDetailsResponseSchema = v.object({
  burst: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  normal: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type MessageReactionCountDetailsResponseSchema = v.InferOutput<
  typeof MessageReactionCountDetailsResponseSchema
>

export const MessageReactionResponseSchema = v.object({
  emoji: MessageReactionEmojiResponseSchema,
  count: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  count_details: MessageReactionCountDetailsResponseSchema,
  burst_colors: v.array(v.string()),
  me_burst: v.boolean(),
  me: v.boolean(),
})

export type MessageReactionResponseSchema = v.InferOutput<typeof MessageReactionResponseSchema>

export const MessageResponseSchema = v.object({
  type: MessageTypeSchema,
  content: v.string(),
  mentions: v.array(UserResponseSchema),
  mention_roles: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  attachments: v.array(MessageAttachmentResponseSchema),
  embeds: v.array(MessageEmbedResponseSchema),
  timestamp: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  edited_timestamp: v.nullable(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  components: v.array(
    v.union([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: v.optional(
    v.array(v.union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  ),
  sticker_items: v.optional(v.array(MessageStickerItemResponseSchema)),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: v.boolean(),
  mention_everyone: v.boolean(),
  tts: v.boolean(),
  call: v.optional(MessageCallResponseSchema),
  activity: v.optional(MessageActivityResponseSchema),
  application: v.optional(BasicApplicationResponseWithBotSchema),
  application_id: v.optional(SnowflakeTypeSchema),
  interaction: v.optional(MessageInteractionResponseSchema),
  nonce: v.optional(
    v.union([
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775808n),
      ),
      v.pipe(v.string(), v.maxCodePoints(25)),
    ]),
  ),
  webhook_id: v.optional(SnowflakeTypeSchema),
  message_reference: v.optional(MessageReferenceResponseSchema),
  thread: v.optional(ThreadResponseSchema),
  mention_channels: v.optional(v.array(MessageMentionChannelResponseSchema)),
  role_subscription_data: v.optional(MessageRoleSubscriptionDataResponseSchema),
  purchase_notification: v.optional(PurchaseNotificationResponseSchema),
  position: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  resolved: v.optional(ResolvedObjectsResponseSchema),
  poll: v.optional(PollResponseSchema),
  shared_client_theme: v.optional(CustomClientThemeResponseSchema),
  interaction_metadata: v.optional(
    v.union([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
      ModalSubmitInteractionMetadataResponseSchema,
    ]),
  ),
  message_snapshots: v.optional(v.array(MessageSnapshotResponseSchema)),
  lobby_member: v.optional(MessageLobbyMemberResponseSchema),
  actor: v.optional(UserResponseSchema),
  reactions: v.optional(v.array(MessageReactionResponseSchema)),
  referenced_message: v.optional(v.union([v.null(), BasicMessageResponseSchema])),
})

export type MessageResponseSchema = v.InferOutput<typeof MessageResponseSchema>

export const CreateMessageInteractionCallbackResponseSchema = v.object({
  type: InteractionCallbackTypesSchema,
  message: MessageResponseSchema,
})

export type CreateMessageInteractionCallbackResponseSchema = v.InferOutput<
  typeof CreateMessageInteractionCallbackResponseSchema
>

export const CreatePrivateChannelRequestSchema = v.partial(
  v.object({
    recipient_id: v.union([v.null(), SnowflakeTypeSchema]),
    access_tokens: v.nullable(
      v.pipe(
        v.array(v.pipe(v.string(), v.maxCodePoints(152133))),
        v.maxLength(1521),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    nicks: v.nullable(
      v.record(v.string(), v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
    ),
  }),
)

export type CreatePrivateChannelRequestSchema = v.InferOutput<
  typeof CreatePrivateChannelRequestSchema
>

export const RoleColorsSchema = v.partial(
  v.object({
    primary_color: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215))),
    secondary_color: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215)),
    ),
    tertiary_color: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215)),
    ),
  }),
)

export type RoleColorsSchema = v.InferOutput<typeof RoleColorsSchema>

export const CreateRoleRequestSchema = v.partial(
  v.object({
    name: v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
    permissions: v.nullable(v.pipe(v.number(), v.integer())),
    color: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215))),
    colors: v.union([v.null(), RoleColorsSchema]),
    hoist: v.nullable(v.boolean()),
    mentionable: v.nullable(v.boolean()),
    icon: v.nullable(v.string()),
    unicode_emoji: v.nullable(v.pipe(v.string(), v.maxCodePoints(100))),
  }),
)

export type CreateRoleRequestSchema = v.InferOutput<typeof CreateRoleRequestSchema>

export const CreateTextThreadWithMessageRequestSchema = v.object({
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  auto_archive_duration: v.optional(v.union([v.null(), ThreadAutoArchiveDurationSchema])),
  rate_limit_per_user: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
        v.maxValue(21600),
      ),
    ),
  ),
})

export type CreateTextThreadWithMessageRequestSchema = v.InferOutput<
  typeof CreateTextThreadWithMessageRequestSchema
>

export const CreateTextThreadWithoutMessageRequestSchema = v.object({
  name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  auto_archive_duration: v.optional(v.union([v.null(), ThreadAutoArchiveDurationSchema])),
  rate_limit_per_user: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
        v.maxValue(21600),
      ),
    ),
  ),
  type: v.optional(v.union([v.null(), ChannelTypesSchema])),
  invitable: v.optional(v.nullable(v.boolean())),
})

export type CreateTextThreadWithoutMessageRequestSchema = v.InferOutput<
  typeof CreateTextThreadWithoutMessageRequestSchema
>

export const CreatedThreadResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  last_pin_timestamp: v.optional(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  guild_id: SnowflakeTypeSchema,
  name: v.string(),
  parent_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  rate_limit_per_user: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  bitrate: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  user_limit: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  rtc_region: v.optional(v.nullable(v.string())),
  video_quality_mode: v.optional(VideoQualityModesSchema),
  permissions: v.optional(v.string()),
  owner_id: SnowflakeTypeSchema,
  thread_metadata: ThreadMetadataResponseSchema,
  message_count: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  member_count: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  total_message_sent: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  applied_tags: v.optional(v.array(SnowflakeTypeSchema)),
  member: v.optional(ThreadMemberResponseSchema),
})

export type CreatedThreadResponseSchema = v.InferOutput<typeof CreatedThreadResponseSchema>

export const DefaultKeywordListTriggerMetadataSchema = v.partial(
  v.object({
    allow_list: v.nullable(
      v.pipe(
        v.array(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(60))),
        v.maxLength(1000),
      ),
    ),
    presets: v.nullable(
      v.pipe(
        v.array(AutomodKeywordPresetTypeSchema),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  }),
)

export type DefaultKeywordListTriggerMetadataSchema = v.InferOutput<
  typeof DefaultKeywordListTriggerMetadataSchema
>

export const DefaultKeywordListTriggerMetadataResponseSchema = v.object({
  allow_list: v.array(v.string()),
  presets: v.pipe(
    v.array(AutomodKeywordPresetTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
})

export type DefaultKeywordListTriggerMetadataResponseSchema = v.InferOutput<
  typeof DefaultKeywordListTriggerMetadataResponseSchema
>

export const FlagToChannelActionMetadataSchema = v.object({ channel_id: SnowflakeTypeSchema })

export type FlagToChannelActionMetadataSchema = v.InferOutput<
  typeof FlagToChannelActionMetadataSchema
>

export const FlagToChannelActionSchema = v.object({
  type: AutomodActionTypeSchema,
  metadata: FlagToChannelActionMetadataSchema,
})

export type FlagToChannelActionSchema = v.InferOutput<typeof FlagToChannelActionSchema>

export const QuarantineUserActionMetadataSchema = v.partial(v.object({}))

export type QuarantineUserActionMetadataSchema = v.InferOutput<
  typeof QuarantineUserActionMetadataSchema
>

export const QuarantineUserActionSchema = v.object({
  type: AutomodActionTypeSchema,
  metadata: v.optional(v.union([v.null(), QuarantineUserActionMetadataSchema])),
})

export type QuarantineUserActionSchema = v.InferOutput<typeof QuarantineUserActionSchema>

export const UserCommunicationDisabledActionMetadataSchema = v.partial(
  v.object({
    duration_seconds: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(2419200)),
    ),
  }),
)

export type UserCommunicationDisabledActionMetadataSchema = v.InferOutput<
  typeof UserCommunicationDisabledActionMetadataSchema
>

export const UserCommunicationDisabledActionSchema = v.object({
  type: AutomodActionTypeSchema,
  metadata: UserCommunicationDisabledActionMetadataSchema,
})

export type UserCommunicationDisabledActionSchema = v.InferOutput<
  typeof UserCommunicationDisabledActionSchema
>

export const DefaultKeywordListUpsertRequestSchema = v.object({
  name: v.pipe(v.string(), v.maxCodePoints(100)),
  event_type: AutomodEventTypeSchema,
  actions: v.optional(
    v.nullable(
      v.pipe(
        v.array(
          v.union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
        ),
        v.minLength(1),
        v.maxLength(5),
      ),
    ),
  ),
  enabled: v.optional(v.nullable(v.boolean())),
  exempt_roles: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(20),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  exempt_channels: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(50),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: DefaultKeywordListTriggerMetadataSchema,
})

export type DefaultKeywordListUpsertRequestSchema = v.InferOutput<
  typeof DefaultKeywordListUpsertRequestSchema
>

export const DefaultKeywordListUpsertRequestPartialSchema = v.partial(
  v.object({
    name: v.pipe(v.string(), v.maxCodePoints(100)),
    event_type: AutomodEventTypeSchema,
    actions: v.nullable(
      v.pipe(
        v.array(
          v.union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
        ),
        v.minLength(1),
        v.maxLength(5),
      ),
    ),
    enabled: v.nullable(v.boolean()),
    exempt_roles: v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(20),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    exempt_channels: v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(50),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: DefaultKeywordListTriggerMetadataSchema,
  }),
)

export type DefaultKeywordListUpsertRequestPartialSchema = v.InferOutput<
  typeof DefaultKeywordListUpsertRequestPartialSchema
>

export const FlagToChannelActionMetadataResponseSchema = v.object({
  channel_id: SnowflakeTypeSchema,
})

export type FlagToChannelActionMetadataResponseSchema = v.InferOutput<
  typeof FlagToChannelActionMetadataResponseSchema
>

export const FlagToChannelActionResponseSchema = v.object({
  type: AutomodActionTypeSchema,
  metadata: FlagToChannelActionMetadataResponseSchema,
})

export type FlagToChannelActionResponseSchema = v.InferOutput<
  typeof FlagToChannelActionResponseSchema
>

export const QuarantineUserActionMetadataResponseSchema = v.partial(v.object({}))

export type QuarantineUserActionMetadataResponseSchema = v.InferOutput<
  typeof QuarantineUserActionMetadataResponseSchema
>

export const QuarantineUserActionResponseSchema = v.object({
  type: AutomodActionTypeSchema,
  metadata: QuarantineUserActionMetadataResponseSchema,
})

export type QuarantineUserActionResponseSchema = v.InferOutput<
  typeof QuarantineUserActionResponseSchema
>

export const UserCommunicationDisabledActionMetadataResponseSchema = v.object({
  duration_seconds: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
})

export type UserCommunicationDisabledActionMetadataResponseSchema = v.InferOutput<
  typeof UserCommunicationDisabledActionMetadataResponseSchema
>

export const UserCommunicationDisabledActionResponseSchema = v.object({
  type: AutomodActionTypeSchema,
  metadata: UserCommunicationDisabledActionMetadataResponseSchema,
})

export type UserCommunicationDisabledActionResponseSchema = v.InferOutput<
  typeof UserCommunicationDisabledActionResponseSchema
>

export const DefaultKeywordRuleResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: v.string(),
  event_type: AutomodEventTypeSchema,
  actions: v.array(
    v.union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: v.boolean(),
  exempt_roles: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  exempt_channels: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  trigger_metadata: DefaultKeywordListTriggerMetadataResponseSchema,
})

export type DefaultKeywordRuleResponseSchema = v.InferOutput<
  typeof DefaultKeywordRuleResponseSchema
>

export const IntegrationApplicationResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  icon: v.nullable(v.string()),
  description: v.string(),
  type: v.union([v.null(), ApplicationTypesSchema]),
  cover_image: v.optional(v.string()),
  primary_sku_id: v.optional(SnowflakeTypeSchema),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  flags_new: v.string(),
  bot: v.optional(UserResponseSchema),
})

export type IntegrationApplicationResponseSchema = v.InferOutput<
  typeof IntegrationApplicationResponseSchema
>

export const DiscordIntegrationResponseSchema = v.object({
  type: IntegrationTypesSchema,
  name: v.nullable(v.string()),
  account: AccountResponseSchema,
  enabled: v.boolean(),
  id: SnowflakeTypeSchema,
  application: IntegrationApplicationResponseSchema,
  scopes: v.pipe(
    v.array(OAuth2ScopesSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  user: v.optional(UserResponseSchema),
})

export type DiscordIntegrationResponseSchema = v.InferOutput<
  typeof DiscordIntegrationResponseSchema
>

export const EmbeddedActivityLocationKindSchema = v.union([
  v.pipe(v.literal('gc'), v.description('guild channel')),
  v.pipe(v.literal('pc'), v.description('private channel')),
  v.pipe(v.literal('party'), v.description('party')),
])

export type EmbeddedActivityLocationKindSchema = v.InferOutput<
  typeof EmbeddedActivityLocationKindSchema
>

export const GuildChannelLocationSchema = v.object({
  id: v.string(),
  kind: EmbeddedActivityLocationKindSchema,
  channel_id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
})

export type GuildChannelLocationSchema = v.InferOutput<typeof GuildChannelLocationSchema>

export const PrivateChannelLocationSchema = v.object({
  id: v.string(),
  kind: EmbeddedActivityLocationKindSchema,
  channel_id: SnowflakeTypeSchema,
})

export type PrivateChannelLocationSchema = v.InferOutput<typeof PrivateChannelLocationSchema>

export const EmbeddedActivityInstanceSchema = v.object({
  application_id: SnowflakeTypeSchema,
  instance_id: v.string(),
  launch_id: v.string(),
  location: v.union([GuildChannelLocationSchema, PrivateChannelLocationSchema]),
  users: v.array(SnowflakeTypeSchema),
})

export type EmbeddedActivityInstanceSchema = v.InferOutput<typeof EmbeddedActivityInstanceSchema>

export const EmojiResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  user: v.optional(UserResponseSchema),
  roles: v.array(SnowflakeTypeSchema),
  require_colons: v.boolean(),
  managed: v.boolean(),
  animated: v.boolean(),
  available: v.boolean(),
})

export type EmojiResponseSchema = v.InferOutput<typeof EmojiResponseSchema>

export const EntitlementTypesSchema = v.union([v.literal(8), v.literal(10)])

export type EntitlementTypesSchema = v.InferOutput<typeof EntitlementTypesSchema>

export const EntitlementTenantFulfillmentStatusResponseSchema = v.union([
  v.literal(0),
  v.literal(1),
  v.literal(2),
  v.literal(3),
  v.literal(4),
  v.literal(5),
  v.literal(6),
  v.literal(7),
])

export type EntitlementTenantFulfillmentStatusResponseSchema = v.InferOutput<
  typeof EntitlementTenantFulfillmentStatusResponseSchema
>

export const EntitlementResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  sku_id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  guild_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  deleted: v.boolean(),
  starts_at: v.nullable(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  ends_at: v.nullable(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  type: EntitlementTypesSchema,
  fulfilled_at: v.optional(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  fulfillment_status: v.optional(
    v.union([v.null(), EntitlementTenantFulfillmentStatusResponseSchema]),
  ),
  consumed: v.optional(v.boolean()),
  gifter_user_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  parent_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
})

export type EntitlementResponseSchema = v.InferOutput<typeof EntitlementResponseSchema>

export const EntityMetadataExternalSchema = v.object({
  location: v.pipe(v.string(), v.maxCodePoints(100)),
})

export type EntityMetadataExternalSchema = v.InferOutput<typeof EntityMetadataExternalSchema>

export const EntityMetadataExternalResponseSchema = v.object({
  location: v.pipe(v.string(), v.description('Location of the external event')),
})

export type EntityMetadataExternalResponseSchema = v.InferOutput<
  typeof EntityMetadataExternalResponseSchema
>

export const EntityMetadataStageInstanceSchema = v.partial(v.object({}))

export type EntityMetadataStageInstanceSchema = v.InferOutput<
  typeof EntityMetadataStageInstanceSchema
>

export const EntityMetadataStageInstanceResponseSchema = v.partial(v.object({}))

export type EntityMetadataStageInstanceResponseSchema = v.InferOutput<
  typeof EntityMetadataStageInstanceResponseSchema
>

export const EntityMetadataVoiceSchema = v.partial(v.object({}))

export type EntityMetadataVoiceSchema = v.InferOutput<typeof EntityMetadataVoiceSchema>

export const EntityMetadataVoiceResponseSchema = v.partial(v.object({}))

export type EntityMetadataVoiceResponseSchema = v.InferOutput<
  typeof EntityMetadataVoiceResponseSchema
>

export const IntegrationExpireBehaviorTypesSchema = v.union([
  v.pipe(v.literal(0), v.description('Remove role')),
  v.pipe(v.literal(1), v.description('Kick')),
])

export type IntegrationExpireBehaviorTypesSchema = v.InferOutput<
  typeof IntegrationExpireBehaviorTypesSchema
>

export const IntegrationExpireGracePeriodTypesSchema = v.union([
  v.pipe(v.literal(1), v.description('1 day')),
  v.pipe(v.literal(3), v.description('3 days')),
  v.pipe(v.literal(7), v.description('7 days')),
  v.pipe(v.literal(14), v.description('14 days')),
  v.pipe(v.literal(30), v.description('30 days')),
])

export type IntegrationExpireGracePeriodTypesSchema = v.InferOutput<
  typeof IntegrationExpireGracePeriodTypesSchema
>

export const ExternalConnectionIntegrationResponseSchema = v.object({
  type: IntegrationTypesSchema,
  name: v.nullable(v.string()),
  account: AccountResponseSchema,
  enabled: v.boolean(),
  id: v.string(),
  user: UserResponseSchema,
  revoked: v.optional(v.boolean()),
  expire_behavior: v.optional(IntegrationExpireBehaviorTypesSchema),
  expire_grace_period: v.optional(IntegrationExpireGracePeriodTypesSchema),
  subscriber_count: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  synced_at: v.optional(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  role_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  syncing: v.optional(v.boolean()),
  enable_emoticons: v.optional(v.boolean()),
})

export type ExternalConnectionIntegrationResponseSchema = v.InferOutput<
  typeof ExternalConnectionIntegrationResponseSchema
>

export const GuildScheduledEventPrivacyLevelsSchema = v.union([
  v.pipe(v.literal(2), v.description('the scheduled event is only accessible to guild members')),
])

export type GuildScheduledEventPrivacyLevelsSchema = v.InferOutput<
  typeof GuildScheduledEventPrivacyLevelsSchema
>

export const GuildScheduledEventEntityTypesSchema = v.union([
  v.literal(0),
  v.literal(1),
  v.literal(2),
  v.literal(3),
])

export type GuildScheduledEventEntityTypesSchema = v.InferOutput<
  typeof GuildScheduledEventEntityTypesSchema
>

export const RecurrenceRuleFrequenciesSchema = v.union([
  v.literal(3),
  v.literal(2),
  v.literal(1),
  v.literal(0),
])

export type RecurrenceRuleFrequenciesSchema = v.InferOutput<typeof RecurrenceRuleFrequenciesSchema>

export const RecurrenceRuleMonthsSchema = v.union([
  v.literal(1),
  v.literal(2),
  v.literal(3),
  v.literal(4),
  v.literal(5),
  v.literal(6),
  v.literal(7),
  v.literal(8),
  v.literal(9),
  v.literal(10),
  v.literal(11),
  v.literal(12),
])

export type RecurrenceRuleMonthsSchema = v.InferOutput<typeof RecurrenceRuleMonthsSchema>

export const RecurrenceRuleSchema = v.object({
  start: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('Starting time of the recurrence interval'),
  ),
  end: v.optional(
    v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
      ),
      v.description('Ending time of the recurrence interval'),
    ),
  ),
  frequency: v.pipe(RecurrenceRuleFrequenciesSchema, v.description('How often the event occurs')),
  interval: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
      v.description('The spacing between events, defined by frequency'),
    ),
  ),
  by_weekday: v.optional(
    v.pipe(
      v.nullable(
        v.pipe(
          v.array(RecurrenceRuleWeekdaysSchema),
          v.maxLength(7),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      v.description('Set of specific days within a week for the event to recur on'),
    ),
  ),
  by_n_weekday: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.array(ByNWeekdaySchema), v.maxLength(7))),
      v.description('List of specific days within a specific week to recur on'),
    ),
  ),
  by_month: v.optional(
    v.pipe(
      v.nullable(
        v.pipe(
          v.array(RecurrenceRuleMonthsSchema),
          v.maxLength(12),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      v.description('Set of specific months to recur on'),
    ),
  ),
  by_month_day: v.optional(
    v.pipe(
      v.nullable(
        v.pipe(
          v.array(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(-1),
              v.maxValue(31),
            ),
          ),
          v.maxLength(33),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      v.description('Set of specific dates within a month to recur on'),
    ),
  ),
  by_year_day: v.optional(
    v.pipe(
      v.nullable(
        v.pipe(
          v.array(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(-1),
              v.maxValue(365),
            ),
          ),
          v.maxLength(367),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      v.description('Set of days within a year to recur on (1-364)'),
    ),
  ),
  count: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
      v.description('Total number of times the event is allowed to recur'),
    ),
  ),
})

export type RecurrenceRuleSchema = v.InferOutput<typeof RecurrenceRuleSchema>

export const ExternalScheduledEventCreateRequestSchema = v.object({
  name: v.pipe(v.string(), v.maxCodePoints(100)),
  description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1000)))),
  image: v.optional(v.nullable(v.string())),
  scheduled_start_time: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  scheduled_end_time: v.optional(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  recurrence_rule: v.optional(
    v.pipe(
      v.union([v.null(), RecurrenceRuleSchema]),
      v.description('Recurrence rule for the scheduled event'),
    ),
  ),
  entity_metadata: EntityMetadataExternalSchema,
})

export type ExternalScheduledEventCreateRequestSchema = v.InferOutput<
  typeof ExternalScheduledEventCreateRequestSchema
>

export const GuildScheduledEventStatusesSchema = v.union([
  v.literal(1),
  v.literal(2),
  v.literal(3),
  v.literal(4),
])

export type GuildScheduledEventStatusesSchema = v.InferOutput<
  typeof GuildScheduledEventStatusesSchema
>

export const ExternalScheduledEventPatchRequestPartialSchema = v.partial(
  v.object({
    status: v.union([v.null(), GuildScheduledEventStatusesSchema]),
    name: v.pipe(v.string(), v.maxCodePoints(100)),
    description: v.nullable(v.pipe(v.string(), v.maxCodePoints(1000))),
    image: v.nullable(v.string()),
    scheduled_start_time: v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    scheduled_end_time: v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    entity_type: v.union([v.null(), GuildScheduledEventEntityTypesSchema]),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    channel_id: v.union([v.null(), SnowflakeTypeSchema]),
    recurrence_rule: v.pipe(
      v.union([v.null(), RecurrenceRuleSchema]),
      v.description('Recurrence rule for the scheduled event'),
    ),
    entity_metadata: EntityMetadataExternalSchema,
  }),
)

export type ExternalScheduledEventPatchRequestPartialSchema = v.InferOutput<
  typeof ExternalScheduledEventPatchRequestPartialSchema
>

export const RecurrenceRuleResponseSchema = v.object({
  start: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('Starting time of the recurrence interval'),
  ),
  end: v.optional(
    v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
      ),
      v.description('Ending time of the recurrence interval'),
    ),
  ),
  frequency: v.pipe(RecurrenceRuleFrequenciesSchema, v.description('How often the event occurs')),
  interval: v.pipe(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    v.description('The spacing between events, defined by frequency'),
  ),
  by_weekday: v.pipe(
    v.nullable(
      v.pipe(
        v.array(RecurrenceRuleWeekdaysSchema),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    v.description('Set of specific days within a week for the event to recur on'),
  ),
  by_n_weekday: v.pipe(
    v.nullable(v.array(ByNWeekdayResponseSchema)),
    v.description('List of specific days within a specific week to recur on'),
  ),
  by_month: v.pipe(
    v.nullable(
      v.pipe(
        v.array(RecurrenceRuleMonthsSchema),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    v.description('Set of specific months to recur on'),
  ),
  by_month_day: v.pipe(
    v.nullable(
      v.pipe(
        v.array(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    v.description('Set of specific dates within a month to recur on'),
  ),
  by_year_day: v.optional(
    v.pipe(
      v.nullable(
        v.pipe(
          v.array(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      v.description('Set of days within a year to recur on (1-364)'),
    ),
  ),
  count: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
      v.description('Total number of times the event is allowed to recur'),
    ),
  ),
})

export type RecurrenceRuleResponseSchema = v.InferOutput<typeof RecurrenceRuleResponseSchema>

export const GuildScheduledEventUserResponsesSchema = v.union([
  v.pipe(v.literal(0), v.description('User is not interested in the event')),
  v.pipe(v.literal(1), v.description('User is interested in the event')),
])

export type GuildScheduledEventUserResponsesSchema = v.InferOutput<
  typeof GuildScheduledEventUserResponsesSchema
>

export const ScheduledEventUserResponseSchema = v.object({
  guild_scheduled_event_id: v.pipe(SnowflakeTypeSchema, v.description('ID of the scheduled event')),
  guild_scheduled_event_exception_id: v.optional(
    v.pipe(
      v.union([v.null(), SnowflakeTypeSchema]),
      v.description('ID of the scheduled event exception'),
    ),
  ),
  user_id: v.pipe(SnowflakeTypeSchema, v.description('ID of the user')),
  user: v.optional(v.pipe(UserResponseSchema, v.description('User object for the RSVP user'))),
  member: v.optional(
    v.pipe(GuildMemberResponseSchema, v.description('Guild member object for the RSVP user')),
  ),
  response: v.pipe(
    GuildScheduledEventUserResponsesSchema,
    v.description("User's RSVP status for the event"),
  ),
})

export type ScheduledEventUserResponseSchema = v.InferOutput<
  typeof ScheduledEventUserResponseSchema
>

export const GuildScheduledEventExceptionResponseSchema = v.object({
  event_id: v.pipe(
    SnowflakeTypeSchema,
    v.description('ID of the scheduled event this exception belongs to'),
  ),
  event_exception_id: v.pipe(SnowflakeTypeSchema, v.description('ID of the event exception')),
  scheduled_start_time: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('Overridden start time of this occurrence'),
  ),
  scheduled_end_time: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('Overridden end time of this occurrence'),
  ),
  is_canceled: v.pipe(v.boolean(), v.description('Whether this occurrence is canceled')),
})

export type GuildScheduledEventExceptionResponseSchema = v.InferOutput<
  typeof GuildScheduledEventExceptionResponseSchema
>

export const ExternalScheduledEventResponseSchema = v.object({
  id: v.pipe(SnowflakeTypeSchema, v.description('ID of the scheduled event')),
  guild_id: v.pipe(
    SnowflakeTypeSchema,
    v.description('ID of the guild the scheduled event belongs to'),
  ),
  name: v.pipe(v.string(), v.description('Name of the scheduled event')),
  description: v.pipe(v.nullable(v.string()), v.description('Description of the scheduled event')),
  channel_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description(
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    ),
  ),
  creator_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description('ID of the user that created the scheduled event'),
  ),
  creator: v.optional(
    v.pipe(UserResponseSchema, v.description('User that created the scheduled event')),
  ),
  image: v.pipe(v.nullable(v.string()), v.description('Cover image hash of the scheduled event')),
  scheduled_start_time: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('When the scheduled event will start'),
  ),
  scheduled_end_time: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('When the scheduled event will end, or null if no end time'),
  ),
  status: v.pipe(GuildScheduledEventStatusesSchema, v.description('Status of the scheduled event')),
  entity_type: v.pipe(
    GuildScheduledEventEntityTypesSchema,
    v.description('Type of hosting entity associated with the scheduled event'),
  ),
  entity_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description('ID of the hosting entity associated with the scheduled event'),
  ),
  recurrence_rule: v.pipe(
    v.union([v.null(), RecurrenceRuleResponseSchema]),
    v.description('Recurrence rule for the scheduled event, or null if not recurring'),
  ),
  user_count: v.optional(
    v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description('Number of users subscribed to the scheduled event'),
    ),
  ),
  privacy_level: v.pipe(
    GuildScheduledEventPrivacyLevelsSchema,
    v.description('Privacy level of the scheduled event'),
  ),
  user_rsvp: v.optional(v.union([v.null(), ScheduledEventUserResponseSchema])),
  guild_scheduled_event_exceptions: v.array(GuildScheduledEventExceptionResponseSchema),
  entity_metadata: EntityMetadataExternalResponseSchema,
})

export type ExternalScheduledEventResponseSchema = v.InferOutput<
  typeof ExternalScheduledEventResponseSchema
>

export const FileUploadComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  min_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(10))),
  ),
  max_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(10))),
  ),
  required: v.optional(v.nullable(v.boolean())),
  file_types: v.optional(
    v.nullable(
      v.pipe(
        v.array(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(16))),
        v.maxLength(10),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
})

export type FileUploadComponentForModalRequestSchema = v.InferOutput<
  typeof FileUploadComponentForModalRequestSchema
>

export const InviteTypesSchema = v.union([v.literal(0), v.literal(1), v.literal(2)])

export type InviteTypesSchema = v.InferOutput<typeof InviteTypesSchema>

export const InviteChannelRecipientResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  username: v.string(),
  avatar: v.nullable(v.string()),
})

export type InviteChannelRecipientResponseSchema = v.InferOutput<
  typeof InviteChannelRecipientResponseSchema
>

export const InviteChannelResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  name: v.nullable(v.string()),
  icon: v.optional(v.string()),
  nsfw: v.optional(v.boolean()),
  recipients: v.optional(v.array(InviteChannelRecipientResponseSchema)),
})

export type InviteChannelResponseSchema = v.InferOutput<typeof InviteChannelResponseSchema>

export const FriendInviteResponseSchema = v.object({
  type: InviteTypesSchema,
  code: v.string(),
  inviter: v.optional(UserResponseSchema),
  max_age: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  created_at: v.optional(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  expires_at: v.nullable(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  friends_count: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  channel: v.union([v.null(), InviteChannelResponseSchema]),
  is_contact: v.optional(v.boolean()),
  uses: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  max_uses: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  flags: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
})

export type FriendInviteResponseSchema = v.InferOutput<typeof FriendInviteResponseSchema>

export const GatewayBotSessionStartLimitResponseSchema = v.object({
  max_concurrency: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  remaining: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  reset_after: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  total: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type GatewayBotSessionStartLimitResponseSchema = v.InferOutput<
  typeof GatewayBotSessionStartLimitResponseSchema
>

export const GatewayBotResponseSchema = v.object({
  url: v.pipe(v.string(), v.url()),
  session_start_limit: GatewayBotSessionStartLimitResponseSchema,
  shards: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type GatewayBotResponseSchema = v.InferOutput<typeof GatewayBotResponseSchema>

export const GatewayResponseSchema = v.object({ url: v.pipe(v.string(), v.url()) })

export type GatewayResponseSchema = v.InferOutput<typeof GatewayResponseSchema>

export const GithubAuthorSchema = v.object({
  username: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
  name: v.pipe(v.string(), v.maxCodePoints(152133)),
})

export type GithubAuthorSchema = v.InferOutput<typeof GithubAuthorSchema>

export const GithubCheckAppSchema = v.object({ name: v.pipe(v.string(), v.maxCodePoints(152133)) })

export type GithubCheckAppSchema = v.InferOutput<typeof GithubCheckAppSchema>

export const GithubCheckPullRequestSchema = v.object({ number: v.pipe(v.number(), v.integer()) })

export type GithubCheckPullRequestSchema = v.InferOutput<typeof GithubCheckPullRequestSchema>

export const GithubCheckSuiteSchema = v.object({
  conclusion: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
  head_branch: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
  head_sha: v.pipe(v.string(), v.maxCodePoints(152133)),
  pull_requests: v.optional(
    v.nullable(v.pipe(v.array(GithubCheckPullRequestSchema), v.maxLength(1521))),
  ),
  app: GithubCheckAppSchema,
})

export type GithubCheckSuiteSchema = v.InferOutput<typeof GithubCheckSuiteSchema>

export const GithubCheckRunOutputSchema = v.partial(
  v.object({
    title: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
    summary: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
  }),
)

export type GithubCheckRunOutputSchema = v.InferOutput<typeof GithubCheckRunOutputSchema>

export const GithubCheckRunSchema = v.object({
  conclusion: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
  name: v.pipe(v.string(), v.maxCodePoints(152133)),
  html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
  check_suite: GithubCheckSuiteSchema,
  details_url: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048)))),
  output: v.optional(v.union([v.null(), GithubCheckRunOutputSchema])),
  pull_requests: v.optional(
    v.nullable(v.pipe(v.array(GithubCheckPullRequestSchema), v.maxLength(1521))),
  ),
})

export type GithubCheckRunSchema = v.InferOutput<typeof GithubCheckRunSchema>

export const GithubUserSchema = v.object({
  id: v.pipe(v.number(), v.integer()),
  login: v.pipe(v.string(), v.maxCodePoints(152133)),
  html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
  avatar_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
})

export type GithubUserSchema = v.InferOutput<typeof GithubUserSchema>

export const GithubCommentSchema = v.object({
  id: v.pipe(v.number(), v.integer()),
  html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
  user: GithubUserSchema,
  commit_id: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
  body: v.pipe(v.string(), v.maxCodePoints(152133)),
})

export type GithubCommentSchema = v.InferOutput<typeof GithubCommentSchema>

export const GithubCommitSchema = v.object({
  id: v.pipe(v.string(), v.maxCodePoints(152133)),
  url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
  message: v.pipe(v.string(), v.maxCodePoints(152133)),
  author: GithubAuthorSchema,
})

export type GithubCommitSchema = v.InferOutput<typeof GithubCommitSchema>

export const GithubDiscussionSchema = v.object({
  title: v.pipe(v.string(), v.maxCodePoints(152133)),
  number: v.pipe(v.number(), v.integer()),
  html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
  answer_html_url: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048)))),
  body: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
  user: GithubUserSchema,
})

export type GithubDiscussionSchema = v.InferOutput<typeof GithubDiscussionSchema>

export const GithubIssueSchema = v.object({
  id: v.pipe(v.number(), v.integer()),
  number: v.pipe(v.number(), v.integer()),
  html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
  user: GithubUserSchema,
  title: v.pipe(v.string(), v.maxCodePoints(152133)),
  body: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
  pull_request: v.optional(v.any()),
})

export type GithubIssueSchema = v.InferOutput<typeof GithubIssueSchema>

export const GithubReleaseSchema = v.object({
  id: v.pipe(v.number(), v.integer()),
  tag_name: v.pipe(v.string(), v.maxCodePoints(152133)),
  html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
  author: GithubUserSchema,
})

export type GithubReleaseSchema = v.InferOutput<typeof GithubReleaseSchema>

export const GithubRepositorySchema = v.object({
  id: v.pipe(v.number(), v.integer()),
  html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
  name: v.pipe(v.string(), v.maxCodePoints(152133)),
  full_name: v.pipe(v.string(), v.maxCodePoints(152133)),
})

export type GithubRepositorySchema = v.InferOutput<typeof GithubRepositorySchema>

export const GithubReviewSchema = v.object({
  user: GithubUserSchema,
  body: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
  html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
  state: v.pipe(v.string(), v.maxCodePoints(152133)),
})

export type GithubReviewSchema = v.InferOutput<typeof GithubReviewSchema>

export const GithubWebhookSchema = v.object({
  action: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
  ref: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
  ref_type: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
  comment: v.optional(v.union([v.null(), GithubCommentSchema])),
  issue: v.optional(v.union([v.null(), GithubIssueSchema])),
  pull_request: v.optional(v.union([v.null(), GithubIssueSchema])),
  repository: v.optional(v.union([v.null(), GithubRepositorySchema])),
  forkee: v.optional(v.union([v.null(), GithubRepositorySchema])),
  sender: GithubUserSchema,
  member: v.optional(v.union([v.null(), GithubUserSchema])),
  release: v.optional(v.union([v.null(), GithubReleaseSchema])),
  head_commit: v.optional(v.union([v.null(), GithubCommitSchema])),
  commits: v.optional(v.nullable(v.pipe(v.array(GithubCommitSchema), v.maxLength(1521)))),
  forced: v.optional(v.nullable(v.boolean())),
  compare: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048)))),
  review: v.optional(v.union([v.null(), GithubReviewSchema])),
  check_run: v.optional(v.union([v.null(), GithubCheckRunSchema])),
  check_suite: v.optional(v.union([v.null(), GithubCheckSuiteSchema])),
  discussion: v.optional(v.union([v.null(), GithubDiscussionSchema])),
  answer: v.optional(v.union([v.null(), GithubCommentSchema])),
})

export type GithubWebhookSchema = v.InferOutput<typeof GithubWebhookSchema>

export const GroupDMInviteResponseSchema = v.object({
  type: InviteTypesSchema,
  code: v.string(),
  inviter: v.optional(UserResponseSchema),
  max_age: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  created_at: v.optional(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  expires_at: v.nullable(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  channel: InviteChannelResponseSchema,
  approximate_member_count: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
})

export type GroupDMInviteResponseSchema = v.InferOutput<typeof GroupDMInviteResponseSchema>

export const PartialDiscordIntegrationResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: v.nullable(v.string()),
  account: AccountResponseSchema,
  application_id: SnowflakeTypeSchema,
})

export type PartialDiscordIntegrationResponseSchema = v.InferOutput<
  typeof PartialDiscordIntegrationResponseSchema
>

export const PartialExternalConnectionIntegrationResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: v.nullable(v.string()),
  account: AccountResponseSchema,
})

export type PartialExternalConnectionIntegrationResponseSchema = v.InferOutput<
  typeof PartialExternalConnectionIntegrationResponseSchema
>

export const PartialGuildSubscriptionIntegrationResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: v.nullable(v.string()),
  account: AccountResponseSchema,
})

export type PartialGuildSubscriptionIntegrationResponseSchema = v.InferOutput<
  typeof PartialGuildSubscriptionIntegrationResponseSchema
>

export const GuildIncomingWebhookResponseSchema = v.object({
  application_id: v.union([v.null(), SnowflakeTypeSchema]),
  avatar: v.nullable(v.string()),
  channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  guild_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  id: SnowflakeTypeSchema,
  name: v.string(),
  type: WebhookTypesSchema,
  user: v.optional(UserResponseSchema),
  token: v.optional(v.string()),
  url: v.optional(v.pipe(v.string(), v.url())),
})

export type GuildIncomingWebhookResponseSchema = v.InferOutput<
  typeof GuildIncomingWebhookResponseSchema
>

export const StageScheduledEventResponseSchema = v.object({
  id: v.pipe(SnowflakeTypeSchema, v.description('ID of the scheduled event')),
  guild_id: v.pipe(
    SnowflakeTypeSchema,
    v.description('ID of the guild the scheduled event belongs to'),
  ),
  name: v.pipe(v.string(), v.description('Name of the scheduled event')),
  description: v.pipe(v.nullable(v.string()), v.description('Description of the scheduled event')),
  channel_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description(
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    ),
  ),
  creator_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description('ID of the user that created the scheduled event'),
  ),
  creator: v.optional(
    v.pipe(UserResponseSchema, v.description('User that created the scheduled event')),
  ),
  image: v.pipe(v.nullable(v.string()), v.description('Cover image hash of the scheduled event')),
  scheduled_start_time: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('When the scheduled event will start'),
  ),
  scheduled_end_time: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('When the scheduled event will end, or null if no end time'),
  ),
  status: v.pipe(GuildScheduledEventStatusesSchema, v.description('Status of the scheduled event')),
  entity_type: v.pipe(
    GuildScheduledEventEntityTypesSchema,
    v.description('Type of hosting entity associated with the scheduled event'),
  ),
  entity_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description('ID of the hosting entity associated with the scheduled event'),
  ),
  recurrence_rule: v.pipe(
    v.union([v.null(), RecurrenceRuleResponseSchema]),
    v.description('Recurrence rule for the scheduled event, or null if not recurring'),
  ),
  user_count: v.optional(
    v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description('Number of users subscribed to the scheduled event'),
    ),
  ),
  privacy_level: v.pipe(
    GuildScheduledEventPrivacyLevelsSchema,
    v.description('Privacy level of the scheduled event'),
  ),
  user_rsvp: v.optional(v.union([v.null(), ScheduledEventUserResponseSchema])),
  guild_scheduled_event_exceptions: v.array(GuildScheduledEventExceptionResponseSchema),
  entity_metadata: v.union([v.null(), EntityMetadataStageInstanceResponseSchema]),
})

export type StageScheduledEventResponseSchema = v.InferOutput<
  typeof StageScheduledEventResponseSchema
>

export const VoiceScheduledEventResponseSchema = v.object({
  id: v.pipe(SnowflakeTypeSchema, v.description('ID of the scheduled event')),
  guild_id: v.pipe(
    SnowflakeTypeSchema,
    v.description('ID of the guild the scheduled event belongs to'),
  ),
  name: v.pipe(v.string(), v.description('Name of the scheduled event')),
  description: v.pipe(v.nullable(v.string()), v.description('Description of the scheduled event')),
  channel_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description(
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    ),
  ),
  creator_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description('ID of the user that created the scheduled event'),
  ),
  creator: v.optional(
    v.pipe(UserResponseSchema, v.description('User that created the scheduled event')),
  ),
  image: v.pipe(v.nullable(v.string()), v.description('Cover image hash of the scheduled event')),
  scheduled_start_time: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('When the scheduled event will start'),
  ),
  scheduled_end_time: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('When the scheduled event will end, or null if no end time'),
  ),
  status: v.pipe(GuildScheduledEventStatusesSchema, v.description('Status of the scheduled event')),
  entity_type: v.pipe(
    GuildScheduledEventEntityTypesSchema,
    v.description('Type of hosting entity associated with the scheduled event'),
  ),
  entity_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description('ID of the hosting entity associated with the scheduled event'),
  ),
  recurrence_rule: v.pipe(
    v.union([v.null(), RecurrenceRuleResponseSchema]),
    v.description('Recurrence rule for the scheduled event, or null if not recurring'),
  ),
  user_count: v.optional(
    v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description('Number of users subscribed to the scheduled event'),
    ),
  ),
  privacy_level: v.pipe(
    GuildScheduledEventPrivacyLevelsSchema,
    v.description('Privacy level of the scheduled event'),
  ),
  user_rsvp: v.optional(v.union([v.null(), ScheduledEventUserResponseSchema])),
  guild_scheduled_event_exceptions: v.array(GuildScheduledEventExceptionResponseSchema),
  entity_metadata: v.union([v.null(), EntityMetadataVoiceResponseSchema]),
})

export type VoiceScheduledEventResponseSchema = v.InferOutput<
  typeof VoiceScheduledEventResponseSchema
>

export const KeywordTriggerMetadataResponseSchema = v.object({
  keyword_filter: v.array(v.string()),
  regex_patterns: v.array(v.string()),
  allow_list: v.array(v.string()),
})

export type KeywordTriggerMetadataResponseSchema = v.InferOutput<
  typeof KeywordTriggerMetadataResponseSchema
>

export const KeywordRuleResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: v.string(),
  event_type: AutomodEventTypeSchema,
  actions: v.array(
    v.union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: v.boolean(),
  exempt_roles: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  exempt_channels: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  trigger_metadata: KeywordTriggerMetadataResponseSchema,
})

export type KeywordRuleResponseSchema = v.InferOutput<typeof KeywordRuleResponseSchema>

export const MLSpamTriggerMetadataResponseSchema = v.partial(v.object({}))

export type MLSpamTriggerMetadataResponseSchema = v.InferOutput<
  typeof MLSpamTriggerMetadataResponseSchema
>

export const MLSpamRuleResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: v.string(),
  event_type: AutomodEventTypeSchema,
  actions: v.array(
    v.union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: v.boolean(),
  exempt_roles: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  exempt_channels: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  trigger_metadata: MLSpamTriggerMetadataResponseSchema,
})

export type MLSpamRuleResponseSchema = v.InferOutput<typeof MLSpamRuleResponseSchema>

export const MentionSpamTriggerMetadataResponseSchema = v.object({
  mention_total_limit: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  mention_raid_protection_enabled: v.boolean(),
})

export type MentionSpamTriggerMetadataResponseSchema = v.InferOutput<
  typeof MentionSpamTriggerMetadataResponseSchema
>

export const MentionSpamRuleResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: v.string(),
  event_type: AutomodEventTypeSchema,
  actions: v.array(
    v.union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: v.boolean(),
  exempt_roles: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  exempt_channels: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  trigger_metadata: MentionSpamTriggerMetadataResponseSchema,
})

export type MentionSpamRuleResponseSchema = v.InferOutput<typeof MentionSpamRuleResponseSchema>

export const UserProfileMetadataResponseSchema = v.object({
  keyword_filter: v.array(v.string()),
  regex_patterns: v.array(v.string()),
  allow_list: v.array(v.string()),
})

export type UserProfileMetadataResponseSchema = v.InferOutput<
  typeof UserProfileMetadataResponseSchema
>

export const UserProfileRuleResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: v.string(),
  event_type: AutomodEventTypeSchema,
  actions: v.array(
    v.union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: v.boolean(),
  exempt_roles: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  exempt_channels: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  trigger_metadata: UserProfileMetadataResponseSchema,
})

export type UserProfileRuleResponseSchema = v.InferOutput<typeof UserProfileRuleResponseSchema>

export const GuildAuditLogResponseSchema = v.object({
  audit_log_entries: v.array(AuditLogEntryResponseSchema),
  users: v.array(UserResponseSchema),
  integrations: v.array(
    v.union([
      PartialDiscordIntegrationResponseSchema,
      PartialExternalConnectionIntegrationResponseSchema,
      PartialGuildSubscriptionIntegrationResponseSchema,
    ]),
  ),
  webhooks: v.array(
    v.union([
      ApplicationIncomingWebhookResponseSchema,
      ChannelFollowerWebhookResponseSchema,
      GuildIncomingWebhookResponseSchema,
    ]),
  ),
  guild_scheduled_events: v.array(
    v.union([
      ExternalScheduledEventResponseSchema,
      StageScheduledEventResponseSchema,
      VoiceScheduledEventResponseSchema,
    ]),
  ),
  threads: v.array(ThreadResponseSchema),
  application_commands: v.array(ApplicationCommandResponseSchema),
  auto_moderation_rules: v.array(
    v.union([
      DefaultKeywordRuleResponseSchema,
      KeywordRuleResponseSchema,
      MLSpamRuleResponseSchema,
      MentionSpamRuleResponseSchema,
      UserProfileRuleResponseSchema,
      v.null(),
    ]),
  ),
})

export type GuildAuditLogResponseSchema = v.InferOutput<typeof GuildAuditLogResponseSchema>

export const GuildBanResponseSchema = v.object({
  user: UserResponseSchema,
  reason: v.nullable(v.string()),
})

export type GuildBanResponseSchema = v.InferOutput<typeof GuildBanResponseSchema>

export const GuildExplicitContentFilterTypesSchema = v.union([
  v.pipe(v.literal(0), v.description('media content will not be scanned')),
  v.pipe(
    v.literal(1),
    v.description('media content sent by members without roles will be scanned'),
  ),
  v.pipe(v.literal(2), v.description('media content sent by all members will be scanned')),
])

export type GuildExplicitContentFilterTypesSchema = v.InferOutput<
  typeof GuildExplicitContentFilterTypesSchema
>

export const GuildFeaturesSchema = v.union([
  v.pipe(
    v.literal('ANIMATED_BANNER'),
    v.description('guild has access to set an animated guild banner image'),
  ),
  v.pipe(
    v.literal('ANIMATED_ICON'),
    v.description('guild has access to set an animated guild icon'),
  ),
  v.pipe(
    v.literal('APPLICATION_COMMAND_PERMISSIONS_V2'),
    v.description('guild is using the old permissions configuration behavior'),
  ),
  v.pipe(v.literal('AUTO_MODERATION'), v.description('guild has set up auto moderation rules')),
  v.pipe(v.literal('BANNER'), v.description('guild has access to set a guild banner image')),
  v.pipe(
    v.literal('COMMUNITY'),
    v.description(
      'guild can enable welcome screen, Membership Screening, stage channels and discovery, and             receives community updates',
    ),
  ),
  v.pipe(
    v.literal('CREATOR_MONETIZABLE_PROVISIONAL'),
    v.description('guild has enabled monetization'),
  ),
  v.pipe(
    v.literal('CREATOR_STORE_PAGE'),
    v.description('guild has enabled the role subscription promo page'),
  ),
  v.pipe(
    v.literal('DEVELOPER_SUPPORT_SERVER'),
    v.description('guild has been set as a support server on the App Directory'),
  ),
  v.pipe(
    v.literal('DISCOVERABLE'),
    v.description('guild is able to be discovered in the directory'),
  ),
  v.pipe(v.literal('FEATURABLE'), v.description('guild is able to be featured in the directory')),
  v.pipe(
    v.literal('INVITES_DISABLED'),
    v.description('guild has paused invites, preventing new users from joining'),
  ),
  v.pipe(
    v.literal('INVITE_SPLASH'),
    v.description('guild has access to set an invite splash background'),
  ),
  v.pipe(
    v.literal('MEMBER_VERIFICATION_GATE_ENABLED'),
    v.description('guild has enabled Membership Screening'),
  ),
  v.pipe(v.literal('MORE_STICKERS'), v.description('guild has increased custom sticker slots')),
  v.pipe(v.literal('NEWS'), v.description('guild has access to create announcement channels')),
  v.pipe(v.literal('PARTNERED'), v.description('guild is partnered')),
  v.pipe(
    v.literal('PREVIEW_ENABLED'),
    v.description(
      'guild can be previewed before joining via Membership Screening or the directory',
    ),
  ),
  v.pipe(
    v.literal('RAID_ALERTS_DISABLED'),
    v.description('guild has disabled activity alerts in the configured safety alerts channel'),
  ),
  v.pipe(
    v.literal('PRUNE_REQUIRES_ADMIN'),
    v.description('guild has restricted member prune to administrators and the guild owner'),
  ),
  v.pipe(v.literal('ROLE_ICONS'), v.description('guild is able to set role icons')),
  v.pipe(
    v.literal('ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE'),
    v.description('guild has role subscriptions that can be purchased'),
  ),
  v.pipe(
    v.literal('ROLE_SUBSCRIPTIONS_ENABLED'),
    v.description('guild has enabled role subscriptions'),
  ),
  v.pipe(v.literal('TICKETED_EVENTS_ENABLED'), v.description('guild has enabled ticketed events')),
  v.pipe(v.literal('VANITY_URL'), v.description('guild has access to set a vanity URL')),
  v.pipe(v.literal('VERIFIED'), v.description('guild is verified')),
  v.pipe(
    v.literal('VIP_REGIONS'),
    v.description(
      'guild has access to set 384kbps bitrate in voice (previously VIP voice servers)',
    ),
  ),
  v.pipe(
    v.literal('WELCOME_SCREEN_ENABLED'),
    v.description('guild has enabled the welcome screen'),
  ),
  v.pipe(
    v.literal('OFFICIAL_GAME_GUILD'),
    v.description('guild is an official guild for one or more games'),
  ),
])

export type GuildFeaturesSchema = v.InferOutput<typeof GuildFeaturesSchema>

export const WelcomeMessageResponseSchema = v.object({
  author_ids: v.array(SnowflakeTypeSchema),
  message: v.string(),
})

export type WelcomeMessageResponseSchema = v.InferOutput<typeof WelcomeMessageResponseSchema>

export const NewMemberActionTypeSchema = v.union([v.literal(0), v.literal(1)])

export type NewMemberActionTypeSchema = v.InferOutput<typeof NewMemberActionTypeSchema>

export const SettingsEmojiResponseSchema = v.object({
  id: v.union([v.null(), SnowflakeTypeSchema]),
  name: v.nullable(v.string()),
  animated: v.boolean(),
})

export type SettingsEmojiResponseSchema = v.InferOutput<typeof SettingsEmojiResponseSchema>

export const NewMemberActionResponseSchema = v.object({
  channel_id: SnowflakeTypeSchema,
  action_type: NewMemberActionTypeSchema,
  title: v.string(),
  description: v.string(),
  emoji: v.optional(SettingsEmojiResponseSchema),
  icon: v.optional(v.string()),
})

export type NewMemberActionResponseSchema = v.InferOutput<typeof NewMemberActionResponseSchema>

export const ResourceChannelResponseSchema = v.object({
  channel_id: SnowflakeTypeSchema,
  title: v.string(),
  emoji: v.optional(SettingsEmojiResponseSchema),
  icon: v.optional(v.string()),
  description: v.string(),
})

export type ResourceChannelResponseSchema = v.InferOutput<typeof ResourceChannelResponseSchema>

export const GuildHomeSettingsResponseSchema = v.object({
  guild_id: SnowflakeTypeSchema,
  enabled: v.boolean(),
  welcome_message: v.optional(WelcomeMessageResponseSchema),
  new_member_actions: v.array(NewMemberActionResponseSchema),
  resource_channels: v.array(ResourceChannelResponseSchema),
})

export type GuildHomeSettingsResponseSchema = v.InferOutput<typeof GuildHomeSettingsResponseSchema>

export const GuildIncidentActionsRequestSchema = v.partial(
  v.object({
    invites_disabled_until: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
      ),
      v.description('When invites will be enabled again'),
    ),
    dms_disabled_until: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
      ),
      v.description('When direct messages will be enabled again'),
    ),
  }),
)

export type GuildIncidentActionsRequestSchema = v.InferOutput<
  typeof GuildIncidentActionsRequestSchema
>

export const GuildIncidentsDataResponseSchema = v.object({
  invites_disabled_until: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('When invites get enabled again'),
  ),
  dms_disabled_until: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('When direct messages get enabled again'),
  ),
})

export type GuildIncidentsDataResponseSchema = v.InferOutput<
  typeof GuildIncidentsDataResponseSchema
>

export const VerificationLevelsSchema = v.union([
  v.pipe(v.literal(0), v.description('unrestricted')),
  v.pipe(v.literal(1), v.description('must have verified email on account')),
  v.pipe(v.literal(2), v.description('must be registered on Discord for longer than 5 minutes')),
  v.pipe(v.literal(3), v.description('must be a member of the server for longer than 10 minutes')),
  v.pipe(v.literal(4), v.description('must have a verified phone number')),
])

export type VerificationLevelsSchema = v.InferOutput<typeof VerificationLevelsSchema>

export const GuildNSFWContentLevelSchema = v.union([
  v.literal(0),
  v.literal(1),
  v.literal(2),
  v.literal(3),
])

export type GuildNSFWContentLevelSchema = v.InferOutput<typeof GuildNSFWContentLevelSchema>

export const InviteGuildResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  splash: v.nullable(v.string()),
  banner: v.nullable(v.string()),
  description: v.nullable(v.string()),
  icon: v.nullable(v.string()),
  features: v.pipe(
    v.array(GuildFeaturesSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  verification_level: v.union([v.null(), VerificationLevelsSchema]),
  vanity_url_code: v.nullable(v.string()),
  nsfw_level: v.union([v.null(), GuildNSFWContentLevelSchema]),
  nsfw: v.nullable(v.boolean()),
  premium_subscription_count: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
})

export type InviteGuildResponseSchema = v.InferOutput<typeof InviteGuildResponseSchema>

export const InviteApplicationResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  icon: v.nullable(v.string()),
  description: v.string(),
  type: v.union([v.null(), ApplicationTypesSchema]),
  cover_image: v.optional(v.string()),
  primary_sku_id: v.optional(SnowflakeTypeSchema),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  flags_new: v.string(),
  bot: v.optional(UserResponseSchema),
  slug: v.optional(v.string()),
  conjure_project_id: v.optional(SnowflakeTypeSchema),
  vibegrations_project_id: v.optional(SnowflakeTypeSchema),
  guild_id: v.optional(SnowflakeTypeSchema),
  rpc_origins: v.optional(v.array(v.string())),
  bot_public: v.optional(v.boolean()),
  bot_require_code_grant: v.optional(v.boolean()),
  terms_of_service_url: v.optional(v.pipe(v.string(), v.url())),
  privacy_policy_url: v.optional(v.pipe(v.string(), v.url())),
  custom_install_url: v.optional(v.pipe(v.string(), v.url())),
  install_params: v.optional(ApplicationOAuth2InstallParamsResponseSchema),
  integration_types_config: v.optional(
    v.record(v.string(), ApplicationIntegrationTypeConfigurationResponseSchema),
  ),
  verify_key: v.string(),
  max_participants: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
  tags: v.optional(
    v.pipe(
      v.array(v.string()),
      v.check((input) => new Set(input).size === input.length),
    ),
  ),
})

export type InviteApplicationResponseSchema = v.InferOutput<typeof InviteApplicationResponseSchema>

export const ScheduledEventResponseSchema = v.object({
  id: v.pipe(SnowflakeTypeSchema, v.description('ID of the scheduled event')),
  guild_id: v.pipe(
    SnowflakeTypeSchema,
    v.description('ID of the guild the scheduled event belongs to'),
  ),
  name: v.pipe(v.string(), v.description('Name of the scheduled event')),
  description: v.pipe(v.nullable(v.string()), v.description('Description of the scheduled event')),
  channel_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description(
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    ),
  ),
  creator_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description('ID of the user that created the scheduled event'),
  ),
  creator: v.optional(
    v.pipe(UserResponseSchema, v.description('User that created the scheduled event')),
  ),
  image: v.pipe(v.nullable(v.string()), v.description('Cover image hash of the scheduled event')),
  scheduled_start_time: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('When the scheduled event will start'),
  ),
  scheduled_end_time: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('When the scheduled event will end, or null if no end time'),
  ),
  status: v.pipe(GuildScheduledEventStatusesSchema, v.description('Status of the scheduled event')),
  entity_type: v.pipe(
    GuildScheduledEventEntityTypesSchema,
    v.description('Type of hosting entity associated with the scheduled event'),
  ),
  entity_id: v.pipe(
    v.union([v.null(), SnowflakeTypeSchema]),
    v.description('ID of the hosting entity associated with the scheduled event'),
  ),
  recurrence_rule: v.pipe(
    v.union([v.null(), RecurrenceRuleResponseSchema]),
    v.description('Recurrence rule for the scheduled event, or null if not recurring'),
  ),
  user_count: v.optional(
    v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description('Number of users subscribed to the scheduled event'),
    ),
  ),
  privacy_level: v.pipe(
    GuildScheduledEventPrivacyLevelsSchema,
    v.description('Privacy level of the scheduled event'),
  ),
  user_rsvp: v.optional(v.union([v.null(), ScheduledEventUserResponseSchema])),
  guild_scheduled_event_exceptions: v.array(GuildScheduledEventExceptionResponseSchema),
})

export type ScheduledEventResponseSchema = v.InferOutput<typeof ScheduledEventResponseSchema>

export const InviteGuildRoleResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  position: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  color: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  colors: GuildRoleColorsResponseSchema,
  icon: v.nullable(v.string()),
  unicode_emoji: v.nullable(v.string()),
  permissions: v.optional(v.string()),
})

export type InviteGuildRoleResponseSchema = v.InferOutput<typeof InviteGuildRoleResponseSchema>

export const GuildInviteResponseSchema = v.object({
  type: InviteTypesSchema,
  code: v.string(),
  inviter: v.optional(UserResponseSchema),
  max_age: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  created_at: v.optional(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  expires_at: v.nullable(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  is_contact: v.optional(v.boolean()),
  flags: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  guild: InviteGuildResponseSchema,
  guild_id: SnowflakeTypeSchema,
  channel: InviteChannelResponseSchema,
  target_type: v.optional(InviteTargetTypesSchema),
  target_user: v.optional(UserResponseSchema),
  target_application: v.optional(InviteApplicationResponseSchema),
  guild_scheduled_event: v.optional(ScheduledEventResponseSchema),
  target_channel_id: v.optional(SnowflakeTypeSchema),
  target_message_id: v.optional(SnowflakeTypeSchema),
  uses: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  max_uses: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  temporary: v.optional(v.boolean()),
  approximate_member_count: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
  approximate_presence_count: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
  is_nickname_changeable: v.optional(v.boolean()),
  roles: v.optional(v.nullable(v.array(InviteGuildRoleResponseSchema))),
})

export type GuildInviteResponseSchema = v.InferOutput<typeof GuildInviteResponseSchema>

export const GuildJoinRequestApplicationStatusSchema = v.union([
  v.pipe(
    v.literal('STARTED'),
    v.description('Applicant started but not yet submitted join request'),
  ),
  v.pipe(
    v.literal('SUBMITTED'),
    v.description('Applicant submitted join request that is awaiting review'),
  ),
  v.pipe(v.literal('REJECTED'), v.description('Join request rejected')),
  v.pipe(v.literal('APPROVED'), v.description('Join request approved')),
])

export type GuildJoinRequestApplicationStatusSchema = v.InferOutput<
  typeof GuildJoinRequestApplicationStatusSchema
>

export const GuildMemberVerificationFormFieldTypeSchema = v.union([
  v.pipe(
    v.literal('TERMS'),
    v.description('Field requiring applicant to acknowledge list of terms'),
  ),
  v.pipe(v.literal('TEXT_INPUT'), v.description('Short text input field')),
  v.pipe(v.literal('PARAGRAPH'), v.description('Long-form text input field')),
  v.pipe(
    v.literal('MULTIPLE_CHOICE'),
    v.description('Field where applicant selects one of many options'),
  ),
])

export type GuildMemberVerificationFormFieldTypeSchema = v.InferOutput<
  typeof GuildMemberVerificationFormFieldTypeSchema
>

export const MultipleChoiceFormFieldResponseSchema = v.object({
  field_type: v.pipe(
    GuildMemberVerificationFormFieldTypeSchema,
    v.description('Type of form field'),
  ),
  label: v.optional(v.pipe(v.string(), v.description('Label shown above field'))),
  description: v.optional(
    v.pipe(v.string(), v.description('Optional helper text shown below label')),
  ),
  required: v.optional(v.pipe(v.boolean(), v.description('Whether applicant must fill in field'))),
  choices: v.pipe(v.array(v.string()), v.description('Choices applicant can select from')),
  response: v.optional(
    v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description('Index of choice selected by applicant'),
    ),
  ),
})

export type MultipleChoiceFormFieldResponseSchema = v.InferOutput<
  typeof MultipleChoiceFormFieldResponseSchema
>

export const ParagraphFormFieldResponseSchema = v.object({
  field_type: v.pipe(
    GuildMemberVerificationFormFieldTypeSchema,
    v.description('Type of form field'),
  ),
  label: v.optional(v.pipe(v.string(), v.description('Label shown above field'))),
  description: v.optional(
    v.pipe(v.string(), v.description('Optional helper text shown below label')),
  ),
  required: v.optional(v.pipe(v.boolean(), v.description('Whether applicant must fill in field'))),
  placeholder: v.optional(
    v.pipe(v.string(), v.description('Placeholder text shown in empty input')),
  ),
  response: v.optional(v.pipe(v.string(), v.description("Applicant's text response"))),
})

export type ParagraphFormFieldResponseSchema = v.InferOutput<
  typeof ParagraphFormFieldResponseSchema
>

export const TermsFormFieldResponseSchema = v.object({
  field_type: v.pipe(
    GuildMemberVerificationFormFieldTypeSchema,
    v.description('Type of form field'),
  ),
  label: v.optional(v.pipe(v.string(), v.description('Label shown above field'))),
  description: v.optional(
    v.pipe(v.string(), v.description('Optional helper text shown below label')),
  ),
  required: v.optional(v.pipe(v.boolean(), v.description('Whether applicant must fill in field'))),
  values: v.pipe(v.array(v.string()), v.description('Terms applicant must acknowledge')),
  response: v.optional(v.pipe(v.boolean(), v.description('Whether applicant accepted terms'))),
})

export type TermsFormFieldResponseSchema = v.InferOutput<typeof TermsFormFieldResponseSchema>

export const TextInputFormFieldResponseSchema = v.object({
  field_type: v.pipe(
    GuildMemberVerificationFormFieldTypeSchema,
    v.description('Type of form field'),
  ),
  label: v.optional(v.pipe(v.string(), v.description('Label shown above field'))),
  description: v.optional(
    v.pipe(v.string(), v.description('Optional helper text shown below label')),
  ),
  required: v.optional(v.pipe(v.boolean(), v.description('Whether applicant must fill in field'))),
  placeholder: v.optional(
    v.pipe(v.string(), v.description('Placeholder text shown in empty input')),
  ),
  response: v.optional(v.pipe(v.string(), v.description("Applicant's text response"))),
})

export type TextInputFormFieldResponseSchema = v.InferOutput<
  typeof TextInputFormFieldResponseSchema
>

export const GuildJoinRequestResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  created_at: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  reviewed_at: v.nullable(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  application_status: v.union([v.null(), GuildJoinRequestApplicationStatusSchema]),
  rejection_reason: v.pipe(
    v.nullable(v.string()),
    v.description('Reason request was rejected. Only set when application_status is REJECTED'),
  ),
  guild_id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  user: v.optional(v.union([v.null(), UserResponseSchema])),
  form_responses: v.optional(
    v.pipe(
      v.nullable(
        v.array(
          v.union([
            MultipleChoiceFormFieldResponseSchema,
            ParagraphFormFieldResponseSchema,
            TermsFormFieldResponseSchema,
            TextInputFormFieldResponseSchema,
          ]),
        ),
      ),
      v.description("Applicant's responses on join request form"),
    ),
  ),
  actioned_by_user: v.optional(v.union([v.null(), UserResponseSchema])),
})

export type GuildJoinRequestResponseSchema = v.InferOutput<typeof GuildJoinRequestResponseSchema>

export const GuildJoinRequestsListResponseSchema = v.partial(
  v.object({
    total: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    guild_join_requests: v.array(GuildJoinRequestResponseSchema),
  }),
)

export type GuildJoinRequestsListResponseSchema = v.InferOutput<
  typeof GuildJoinRequestsListResponseSchema
>

export const GuildMFALevelSchema = v.union([
  v.pipe(v.literal(0), v.description('Guild has no MFA/2FA requirement for moderation actions')),
  v.pipe(v.literal(1), v.description('Guild has a 2FA requirement for moderation actions')),
])

export type GuildMFALevelSchema = v.InferOutput<typeof GuildMFALevelSchema>

export const GuildOnboardingModeSchema = v.union([
  v.pipe(v.literal(0), v.description('Only Default Channels considered in constraints')),
  v.pipe(
    v.literal(1),
    v.description('Default Channels and Onboarding Prompts considered in constraints'),
  ),
])

export type GuildOnboardingModeSchema = v.InferOutput<typeof GuildOnboardingModeSchema>

export const OnboardingPromptOptionResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  title: v.string(),
  description: v.string(),
  emoji: SettingsEmojiResponseSchema,
  role_ids: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  channel_ids: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
})

export type OnboardingPromptOptionResponseSchema = v.InferOutput<
  typeof OnboardingPromptOptionResponseSchema
>

export const OnboardingPromptTypeSchema = v.union([
  v.pipe(v.literal(0), v.description('Multiple choice options')),
  v.pipe(v.literal(1), v.description('Many options shown as a dropdown')),
])

export type OnboardingPromptTypeSchema = v.InferOutput<typeof OnboardingPromptTypeSchema>

export const OnboardingPromptResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  title: v.string(),
  options: v.array(OnboardingPromptOptionResponseSchema),
  single_select: v.boolean(),
  required: v.boolean(),
  in_onboarding: v.boolean(),
  type: OnboardingPromptTypeSchema,
})

export type OnboardingPromptResponseSchema = v.InferOutput<typeof OnboardingPromptResponseSchema>

export const GuildOnboardingResponseSchema = v.object({
  guild_id: SnowflakeTypeSchema,
  prompts: v.array(OnboardingPromptResponseSchema),
  default_channel_ids: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  enabled: v.boolean(),
  mode: GuildOnboardingModeSchema,
})

export type GuildOnboardingResponseSchema = v.InferOutput<typeof GuildOnboardingResponseSchema>

export const UserNotificationSettingsSchema = v.union([
  v.pipe(
    v.literal(0),
    v.description('members will receive notifications for all messages by default'),
  ),
  v.pipe(
    v.literal(1),
    v.description(
      'members will receive notifications only for messages that @mention them by default',
    ),
  ),
])

export type UserNotificationSettingsSchema = v.InferOutput<typeof UserNotificationSettingsSchema>

export const GuildPatchRequestPartialSchema = v.partial(
  v.object({
    name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(100)),
    description: v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(300))),
    region: v.nullable(v.string()),
    icon: v.nullable(v.string()),
    verification_level: v.union([v.null(), VerificationLevelsSchema]),
    default_message_notifications: v.union([v.null(), UserNotificationSettingsSchema]),
    explicit_content_filter: v.union([v.null(), GuildExplicitContentFilterTypesSchema]),
    preferred_locale: v.union([v.null(), AvailableLocalesEnumSchema]),
    afk_timeout: v.union([v.null(), AfkTimeoutsSchema]),
    afk_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
    system_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
    splash: v.nullable(v.string()),
    banner: v.nullable(v.string()),
    system_channel_flags: v.nullable(v.pipe(v.number(), v.integer())),
    features: v.nullable(
      v.pipe(
        v.array(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
        v.maxLength(1521),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    discovery_splash: v.nullable(v.string()),
    home_header: v.nullable(v.string()),
    rules_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
    safety_alerts_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
    public_updates_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
    premium_progress_bar_enabled: v.nullable(v.boolean()),
  }),
)

export type GuildPatchRequestPartialSchema = v.InferOutput<typeof GuildPatchRequestPartialSchema>

export const GuildPreviewResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  icon: v.nullable(v.string()),
  description: v.nullable(v.string()),
  home_header: v.nullable(v.string()),
  splash: v.nullable(v.string()),
  discovery_splash: v.nullable(v.string()),
  features: v.pipe(
    v.array(GuildFeaturesSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  approximate_member_count: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  approximate_presence_count: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  emojis: v.array(EmojiResponseSchema),
  stickers: v.array(GuildStickerResponseSchema),
})

export type GuildPreviewResponseSchema = v.InferOutput<typeof GuildPreviewResponseSchema>

export const GuildPruneResponseSchema = v.object({
  pruned: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
})

export type GuildPruneResponseSchema = v.InferOutput<typeof GuildPruneResponseSchema>

export const PremiumGuildTiersSchema = v.union([
  v.pipe(v.literal(0), v.description('Guild has not unlocked any Server Boost perks')),
  v.pipe(v.literal(1), v.description('Guild has unlocked Server Boost level 1 perks')),
  v.pipe(v.literal(2), v.description('Guild has unlocked Server Boost level 2 perks')),
  v.pipe(v.literal(3), v.description('Guild has unlocked Server Boost level 3 perks')),
])

export type PremiumGuildTiersSchema = v.InferOutput<typeof PremiumGuildTiersSchema>

export const GuildResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  icon: v.nullable(v.string()),
  description: v.nullable(v.string()),
  home_header: v.nullable(v.string()),
  splash: v.nullable(v.string()),
  discovery_splash: v.nullable(v.string()),
  features: v.pipe(
    v.array(GuildFeaturesSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  banner: v.nullable(v.string()),
  owner_id: SnowflakeTypeSchema,
  application_id: v.union([v.null(), SnowflakeTypeSchema]),
  region: v.string(),
  afk_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  system_channel_flags: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  widget_enabled: v.boolean(),
  widget_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  verification_level: VerificationLevelsSchema,
  roles: v.array(GuildRoleResponseSchema),
  default_message_notifications: UserNotificationSettingsSchema,
  mfa_level: GuildMFALevelSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  max_presences: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  max_members: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  max_stage_video_channel_users: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  max_video_channel_users: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  vanity_url_code: v.nullable(v.string()),
  premium_tier: PremiumGuildTiersSchema,
  premium_subscription_count: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  preferred_locale: AvailableLocalesEnumSchema,
  rules_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  safety_alerts_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  public_updates_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  premium_progress_bar_enabled: v.boolean(),
  premium_progress_bar_enabled_user_updated_at: v.optional(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  nsfw: v.boolean(),
  nsfw_level: GuildNSFWContentLevelSchema,
  emojis: v.array(EmojiResponseSchema),
  stickers: v.array(GuildStickerResponseSchema),
  incidents_data: v.union([v.null(), GuildIncidentsDataResponseSchema]),
})

export type GuildResponseSchema = v.InferOutput<typeof GuildResponseSchema>

export const GuildScheduledEventExceptionCreateRequestSchema = v.object({
  scheduled_start_time: v.optional(
    v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
      ),
      v.description('Overridden start time of this occurrence'),
    ),
  ),
  scheduled_end_time: v.optional(
    v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
      ),
      v.description('Overridden end time of this occurrence'),
    ),
  ),
  original_scheduled_start_time: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('The original start time of the occurrence to create an exception for'),
  ),
  is_canceled: v.optional(
    v.pipe(v.nullable(v.boolean()), v.description('Whether this occurrence is canceled')),
  ),
})

export type GuildScheduledEventExceptionCreateRequestSchema = v.InferOutput<
  typeof GuildScheduledEventExceptionCreateRequestSchema
>

export const GuildScheduledEventExceptionPatchRequestPartialSchema = v.partial(
  v.object({
    scheduled_start_time: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
      ),
      v.description('Overridden start time of this occurrence'),
    ),
    scheduled_end_time: v.pipe(
      v.nullable(
        v.pipe(
          v.string(),
          v.regex(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
      ),
      v.description('Overridden end time of this occurrence'),
    ),
    is_canceled: v.pipe(
      v.nullable(v.boolean()),
      v.description('Whether this occurrence is canceled'),
    ),
  }),
)

export type GuildScheduledEventExceptionPatchRequestPartialSchema = v.InferOutput<
  typeof GuildScheduledEventExceptionPatchRequestPartialSchema
>

export const SearchMessageResponseSchema = v.object({
  type: MessageTypeSchema,
  content: v.string(),
  mentions: v.array(UserResponseSchema),
  mention_roles: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  attachments: v.array(MessageAttachmentResponseSchema),
  embeds: v.array(MessageEmbedResponseSchema),
  timestamp: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  edited_timestamp: v.nullable(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  components: v.array(
    v.union([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: v.optional(
    v.array(v.union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  ),
  sticker_items: v.optional(v.array(MessageStickerItemResponseSchema)),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: v.boolean(),
  mention_everyone: v.boolean(),
  tts: v.boolean(),
  call: v.optional(MessageCallResponseSchema),
  activity: v.optional(MessageActivityResponseSchema),
  application: v.optional(BasicApplicationResponseWithBotSchema),
  application_id: v.optional(SnowflakeTypeSchema),
  interaction: v.optional(MessageInteractionResponseSchema),
  nonce: v.optional(
    v.union([
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775808n),
      ),
      v.pipe(v.string(), v.maxCodePoints(25)),
    ]),
  ),
  webhook_id: v.optional(SnowflakeTypeSchema),
  message_reference: v.optional(MessageReferenceResponseSchema),
  thread: v.optional(ThreadResponseSchema),
  mention_channels: v.optional(v.array(MessageMentionChannelResponseSchema)),
  role_subscription_data: v.optional(MessageRoleSubscriptionDataResponseSchema),
  purchase_notification: v.optional(PurchaseNotificationResponseSchema),
  position: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  resolved: v.optional(ResolvedObjectsResponseSchema),
  poll: v.optional(PollResponseSchema),
  shared_client_theme: v.optional(CustomClientThemeResponseSchema),
  interaction_metadata: v.optional(
    v.union([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
      ModalSubmitInteractionMetadataResponseSchema,
    ]),
  ),
  message_snapshots: v.optional(v.array(MessageSnapshotResponseSchema)),
  lobby_member: v.optional(MessageLobbyMemberResponseSchema),
  actor: v.optional(UserResponseSchema),
  reactions: v.optional(v.array(MessageReactionResponseSchema)),
  referenced_message: v.optional(v.union([v.null(), BasicMessageResponseSchema])),
  hit: v.boolean(),
  restriction_count: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  author_restriction_count: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  source_author_restriction_count: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  forward_source_author_id: v.optional(SnowflakeTypeSchema),
})

export type SearchMessageResponseSchema = v.InferOutput<typeof SearchMessageResponseSchema>

export const GuildSearchResponseSchema = v.object({
  messages: v.array(v.array(SearchMessageResponseSchema)),
  doing_deep_historical_index: v.boolean(),
  total_results: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  threads: v.optional(v.nullable(v.array(ThreadResponseSchema))),
  members: v.optional(v.nullable(v.array(ThreadMemberResponseSchema))),
  documents_indexed: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
})

export type GuildSearchResponseSchema = v.InferOutput<typeof GuildSearchResponseSchema>

export const GuildSubscriptionIntegrationResponseSchema = v.object({
  type: IntegrationTypesSchema,
  name: v.nullable(v.string()),
  account: AccountResponseSchema,
  enabled: v.boolean(),
  id: SnowflakeTypeSchema,
})

export type GuildSubscriptionIntegrationResponseSchema = v.InferOutput<
  typeof GuildSubscriptionIntegrationResponseSchema
>

export const GuildTemplateChannelTagsSchema = v.object({
  id: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  name: v.string(),
  emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
  emoji_name: v.nullable(v.string()),
  moderated: v.nullable(v.boolean()),
})

export type GuildTemplateChannelTagsSchema = v.InferOutput<typeof GuildTemplateChannelTagsSchema>

export const GuildTemplateChannelResponseSchema = v.object({
  id: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  type: ChannelTypesSchema,
  name: v.nullable(v.string()),
  position: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  topic: v.nullable(v.string()),
  bitrate: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  user_limit: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  nsfw: v.boolean(),
  rate_limit_per_user: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  parent_id: v.union([v.null(), SnowflakeTypeSchema]),
  default_auto_archive_duration: v.union([v.null(), ThreadAutoArchiveDurationSchema]),
  permission_overwrites: v.array(ChannelPermissionOverwriteResponseSchema),
  available_tags: v.nullable(v.array(GuildTemplateChannelTagsSchema)),
  template: v.string(),
  default_reaction_emoji: v.union([v.null(), DefaultReactionEmojiResponseSchema]),
  default_thread_rate_limit_per_user: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  default_sort_order: v.union([v.null(), ThreadSortOrderSchema]),
  default_forum_layout: v.union([v.null(), ForumLayoutSchema]),
  default_tag_setting: v.union([v.null(), ThreadSearchTagSettingSchema]),
  theme_color: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
})

export type GuildTemplateChannelResponseSchema = v.InferOutput<
  typeof GuildTemplateChannelResponseSchema
>

export const GuildTemplateRoleColorsResponseSchema = v.object({
  primary_color: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  secondary_color: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  tertiary_color: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
})

export type GuildTemplateRoleColorsResponseSchema = v.InferOutput<
  typeof GuildTemplateRoleColorsResponseSchema
>

export const GuildTemplateRoleResponseSchema = v.object({
  id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  name: v.string(),
  permissions: v.string(),
  color: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  colors: v.union([v.null(), GuildTemplateRoleColorsResponseSchema]),
  hoist: v.boolean(),
  mentionable: v.boolean(),
  icon: v.nullable(v.string()),
  unicode_emoji: v.nullable(v.string()),
})

export type GuildTemplateRoleResponseSchema = v.InferOutput<typeof GuildTemplateRoleResponseSchema>

export const GuildTemplateSnapshotResponseSchema = v.object({
  name: v.string(),
  description: v.nullable(v.string()),
  region: v.nullable(v.string()),
  verification_level: VerificationLevelsSchema,
  default_message_notifications: UserNotificationSettingsSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  preferred_locale: AvailableLocalesEnumSchema,
  afk_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  system_channel_flags: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  roles: v.array(GuildTemplateRoleResponseSchema),
  channels: v.array(GuildTemplateChannelResponseSchema),
})

export type GuildTemplateSnapshotResponseSchema = v.InferOutput<
  typeof GuildTemplateSnapshotResponseSchema
>

export const GuildTemplateResponseSchema = v.object({
  code: v.string(),
  name: v.string(),
  description: v.nullable(v.string()),
  usage_count: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  creator_id: SnowflakeTypeSchema,
  creator: v.union([v.null(), UserResponseSchema]),
  created_at: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  updated_at: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  source_guild_id: SnowflakeTypeSchema,
  serialized_source_guild: GuildTemplateSnapshotResponseSchema,
  is_dirty: v.nullable(v.boolean()),
})

export type GuildTemplateResponseSchema = v.InferOutput<typeof GuildTemplateResponseSchema>

export const GuildWelcomeChannelSchema = v.object({
  channel_id: SnowflakeTypeSchema,
  description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(50)),
  emoji_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  emoji_name: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
})

export type GuildWelcomeChannelSchema = v.InferOutput<typeof GuildWelcomeChannelSchema>

export const GuildWelcomeScreenChannelResponseSchema = v.object({
  channel_id: SnowflakeTypeSchema,
  description: v.string(),
  emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
  emoji_name: v.nullable(v.string()),
})

export type GuildWelcomeScreenChannelResponseSchema = v.InferOutput<
  typeof GuildWelcomeScreenChannelResponseSchema
>

export const GuildWelcomeScreenResponseSchema = v.object({
  description: v.nullable(v.string()),
  welcome_channels: v.array(GuildWelcomeScreenChannelResponseSchema),
})

export type GuildWelcomeScreenResponseSchema = v.InferOutput<
  typeof GuildWelcomeScreenResponseSchema
>

export const GuildWithCountsResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  icon: v.nullable(v.string()),
  description: v.nullable(v.string()),
  home_header: v.nullable(v.string()),
  splash: v.nullable(v.string()),
  discovery_splash: v.nullable(v.string()),
  features: v.pipe(
    v.array(GuildFeaturesSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  banner: v.nullable(v.string()),
  owner_id: SnowflakeTypeSchema,
  application_id: v.union([v.null(), SnowflakeTypeSchema]),
  region: v.string(),
  afk_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  system_channel_flags: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  widget_enabled: v.boolean(),
  widget_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  verification_level: VerificationLevelsSchema,
  roles: v.array(GuildRoleResponseSchema),
  default_message_notifications: UserNotificationSettingsSchema,
  mfa_level: GuildMFALevelSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  max_presences: v.nullable(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  ),
  max_members: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  max_stage_video_channel_users: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  max_video_channel_users: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  vanity_url_code: v.nullable(v.string()),
  premium_tier: PremiumGuildTiersSchema,
  premium_subscription_count: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  preferred_locale: AvailableLocalesEnumSchema,
  rules_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  safety_alerts_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  public_updates_channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  premium_progress_bar_enabled: v.boolean(),
  premium_progress_bar_enabled_user_updated_at: v.optional(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  nsfw: v.boolean(),
  nsfw_level: GuildNSFWContentLevelSchema,
  emojis: v.array(EmojiResponseSchema),
  stickers: v.array(GuildStickerResponseSchema),
  incidents_data: v.union([v.null(), GuildIncidentsDataResponseSchema]),
  approximate_member_count: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
  approximate_presence_count: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
})

export type GuildWithCountsResponseSchema = v.InferOutput<typeof GuildWithCountsResponseSchema>

export const HasOptionSchema = v.union([
  v.literal('link'),
  v.literal('embed'),
  v.literal('file'),
  v.literal('image'),
  v.literal('video'),
  v.literal('sound'),
  v.literal('sticker'),
  v.literal('poll'),
  v.literal('snapshot'),
  v.literal('-link'),
  v.literal('-embed'),
  v.literal('-file'),
  v.literal('-image'),
  v.literal('-video'),
  v.literal('-sound'),
  v.literal('-sticker'),
  v.literal('-poll'),
  v.literal('-snapshot'),
])

export type HasOptionSchema = v.InferOutput<typeof HasOptionSchema>

export const IncomingWebhookRequestPartialSchema = v.partial(
  v.object({
    content: v.nullable(v.pipe(v.string(), v.maxCodePoints(2000))),
    embeds: v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10))),
    allowed_mentions: v.union([v.null(), MessageAllowedMentionsRequestSchema]),
    components: v.nullable(
      v.pipe(
        v.array(
          v.union([
            ActionRowComponentForMessageRequestSchema,
            ContainerComponentForMessageRequestSchema,
            FileComponentForMessageRequestSchema,
            MediaGalleryComponentForMessageRequestSchema,
            SectionComponentForMessageRequestSchema,
            SeparatorComponentForMessageRequestSchema,
            TextDisplayComponentForMessageRequestSchema,
          ]),
        ),
        v.maxLength(40),
      ),
    ),
    attachments: v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
    poll: v.union([v.null(), PollCreateRequestSchema]),
    tts: v.nullable(v.boolean()),
    flags: v.nullable(v.pipe(v.number(), v.integer())),
    username: v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80))),
    avatar_url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    thread_name: v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(100))),
    applied_tags: v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(5))),
  }),
)

export type IncomingWebhookRequestPartialSchema = v.InferOutput<
  typeof IncomingWebhookRequestPartialSchema
>

export const IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema = v.partial(
  v.object({
    content: v.nullable(v.pipe(v.string(), v.maxCodePoints(2000))),
    embeds: v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10))),
    allowed_mentions: v.union([v.null(), MessageAllowedMentionsRequestSchema]),
    components: v.nullable(
      v.pipe(
        v.array(
          v.union([
            ActionRowComponentForMessageRequestSchema,
            ContainerComponentForMessageRequestSchema,
            FileComponentForMessageRequestSchema,
            MediaGalleryComponentForMessageRequestSchema,
            SectionComponentForMessageRequestSchema,
            SeparatorComponentForMessageRequestSchema,
            TextDisplayComponentForMessageRequestSchema,
          ]),
        ),
        v.maxLength(40),
      ),
    ),
    attachments: v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
    flags: v.nullable(v.pipe(v.number(), v.integer())),
  }),
)

export type IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema = v.InferOutput<
  typeof IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema
>

export const IncomingWebhookUpdateRequestPartialSchema = v.partial(
  v.object({
    content: v.nullable(v.pipe(v.string(), v.maxCodePoints(2000))),
    embeds: v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10))),
    allowed_mentions: v.union([v.null(), MessageAllowedMentionsRequestSchema]),
    components: v.nullable(
      v.pipe(
        v.array(
          v.union([
            ActionRowComponentForMessageRequestSchema,
            ContainerComponentForMessageRequestSchema,
            FileComponentForMessageRequestSchema,
            MediaGalleryComponentForMessageRequestSchema,
            SectionComponentForMessageRequestSchema,
            SeparatorComponentForMessageRequestSchema,
            TextDisplayComponentForMessageRequestSchema,
          ]),
        ),
        v.maxLength(40),
      ),
    ),
    attachments: v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
    poll: v.union([v.null(), PollCreateRequestSchema]),
    flags: v.nullable(v.pipe(v.number(), v.integer())),
  }),
)

export type IncomingWebhookUpdateRequestPartialSchema = v.InferOutput<
  typeof IncomingWebhookUpdateRequestPartialSchema
>

export const InteractionResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  activity_instance_id: v.optional(v.nullable(v.string())),
  response_message_id: v.optional(SnowflakeTypeSchema),
  response_message_loading: v.optional(v.boolean()),
  response_message_ephemeral: v.optional(v.boolean()),
  channel_id: v.optional(SnowflakeTypeSchema),
  guild_id: v.optional(SnowflakeTypeSchema),
})

export type InteractionResponseSchema = v.InferOutput<typeof InteractionResponseSchema>

export const LaunchActivityInteractionCallbackResponseSchema = v.object({
  type: InteractionCallbackTypesSchema,
  activity_instance: ActivityInstanceCallbackResponseSchema,
})

export type LaunchActivityInteractionCallbackResponseSchema = v.InferOutput<
  typeof LaunchActivityInteractionCallbackResponseSchema
>

export const UpdateMessageInteractionCallbackResponseSchema = v.object({
  type: InteractionCallbackTypesSchema,
  message: MessageResponseSchema,
})

export type UpdateMessageInteractionCallbackResponseSchema = v.InferOutput<
  typeof UpdateMessageInteractionCallbackResponseSchema
>

export const InteractionCallbackResponseSchema = v.object({
  interaction: InteractionResponseSchema,
  resource: v.optional(
    v.union([
      CreateMessageInteractionCallbackResponseSchema,
      LaunchActivityInteractionCallbackResponseSchema,
      UpdateMessageInteractionCallbackResponseSchema,
    ]),
  ),
})

export type InteractionCallbackResponseSchema = v.InferOutput<
  typeof InteractionCallbackResponseSchema
>

export const KeywordTriggerMetadataSchema = v.partial(
  v.object({
    keyword_filter: v.nullable(
      v.pipe(
        v.array(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(60))),
        v.maxLength(1000),
      ),
    ),
    regex_patterns: v.nullable(
      v.pipe(
        v.array(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(260))),
        v.maxLength(10),
      ),
    ),
    allow_list: v.nullable(
      v.pipe(
        v.array(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(60))),
        v.maxLength(100),
      ),
    ),
  }),
)

export type KeywordTriggerMetadataSchema = v.InferOutput<typeof KeywordTriggerMetadataSchema>

export const KeywordUpsertRequestSchema = v.object({
  name: v.pipe(v.string(), v.maxCodePoints(100)),
  event_type: AutomodEventTypeSchema,
  actions: v.optional(
    v.nullable(
      v.pipe(
        v.array(
          v.union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
        ),
        v.minLength(1),
        v.maxLength(5),
      ),
    ),
  ),
  enabled: v.optional(v.nullable(v.boolean())),
  exempt_roles: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(20),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  exempt_channels: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(50),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: v.optional(v.union([v.null(), KeywordTriggerMetadataSchema])),
})

export type KeywordUpsertRequestSchema = v.InferOutput<typeof KeywordUpsertRequestSchema>

export const KeywordUpsertRequestPartialSchema = v.partial(
  v.object({
    name: v.pipe(v.string(), v.maxCodePoints(100)),
    event_type: AutomodEventTypeSchema,
    actions: v.nullable(
      v.pipe(
        v.array(
          v.union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
        ),
        v.minLength(1),
        v.maxLength(5),
      ),
    ),
    enabled: v.nullable(v.boolean()),
    exempt_roles: v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(20),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    exempt_channels: v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(50),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: v.union([v.null(), KeywordTriggerMetadataSchema]),
  }),
)

export type KeywordUpsertRequestPartialSchema = v.InferOutput<
  typeof KeywordUpsertRequestPartialSchema
>

export const MentionableSelectComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  placeholder: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(150)))),
  min_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(25))),
  ),
  max_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(25))),
  ),
  disabled: v.optional(v.nullable(v.boolean())),
  required: v.optional(v.nullable(v.boolean())),
  default_values: v.optional(
    v.nullable(
      v.pipe(
        v.array(v.union([RoleSelectDefaultValueSchema, UserSelectDefaultValueSchema])),
        v.maxLength(25),
      ),
    ),
  ),
})

export type MentionableSelectComponentForModalRequestSchema = v.InferOutput<
  typeof MentionableSelectComponentForModalRequestSchema
>

export const RadioGroupOptionForRequestSchema = v.object({
  label: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  value: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
  default: v.optional(v.nullable(v.boolean())),
})

export type RadioGroupOptionForRequestSchema = v.InferOutput<
  typeof RadioGroupOptionForRequestSchema
>

export const RadioGroupComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  required: v.optional(v.nullable(v.boolean())),
  options: v.pipe(v.array(RadioGroupOptionForRequestSchema), v.minLength(2), v.maxLength(10)),
})

export type RadioGroupComponentForModalRequestSchema = v.InferOutput<
  typeof RadioGroupComponentForModalRequestSchema
>

export const RoleSelectComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  placeholder: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(150)))),
  min_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(25))),
  ),
  max_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(25))),
  ),
  disabled: v.optional(v.nullable(v.boolean())),
  required: v.optional(v.nullable(v.boolean())),
  default_values: v.optional(
    v.nullable(v.pipe(v.array(RoleSelectDefaultValueSchema), v.maxLength(25))),
  ),
})

export type RoleSelectComponentForModalRequestSchema = v.InferOutput<
  typeof RoleSelectComponentForModalRequestSchema
>

export const StringSelectComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  placeholder: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(150)))),
  min_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(25))),
  ),
  max_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(25))),
  ),
  disabled: v.optional(v.nullable(v.boolean())),
  required: v.optional(v.nullable(v.boolean())),
  options: v.pipe(v.array(StringSelectOptionForRequestSchema), v.minLength(1), v.maxLength(25)),
})

export type StringSelectComponentForModalRequestSchema = v.InferOutput<
  typeof StringSelectComponentForModalRequestSchema
>

export const UserSelectComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  placeholder: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(150)))),
  min_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(25))),
  ),
  max_values: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(25))),
  ),
  disabled: v.optional(v.nullable(v.boolean())),
  required: v.optional(v.nullable(v.boolean())),
  default_values: v.optional(
    v.nullable(v.pipe(v.array(UserSelectDefaultValueSchema), v.maxLength(25))),
  ),
})

export type UserSelectComponentForModalRequestSchema = v.InferOutput<
  typeof UserSelectComponentForModalRequestSchema
>

export const LabelComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  label: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(45)),
  description: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
  component: v.union([
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

export type LabelComponentForModalRequestSchema = v.InferOutput<
  typeof LabelComponentForModalRequestSchema
>

export const LaunchActivityInteractionCallbackRequestSchema = v.object({
  type: InteractionCallbackTypesSchema,
})

export type LaunchActivityInteractionCallbackRequestSchema = v.InferOutput<
  typeof LaunchActivityInteractionCallbackRequestSchema
>

export const ListApplicationEmojisResponseSchema = v.object({ items: v.array(EmojiResponseSchema) })

export type ListApplicationEmojisResponseSchema = v.InferOutput<
  typeof ListApplicationEmojisResponseSchema
>

export const SoundboardSoundResponseSchema = v.object({
  name: v.string(),
  sound_id: SnowflakeTypeSchema,
  volume: v.number(),
  emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
  emoji_name: v.nullable(v.string()),
  guild_id: v.optional(SnowflakeTypeSchema),
  available: v.boolean(),
  user: v.optional(UserResponseSchema),
})

export type SoundboardSoundResponseSchema = v.InferOutput<typeof SoundboardSoundResponseSchema>

export const ListGuildSoundboardSoundsResponseSchema = v.object({
  items: v.array(SoundboardSoundResponseSchema),
})

export type ListGuildSoundboardSoundsResponseSchema = v.InferOutput<
  typeof ListGuildSoundboardSoundsResponseSchema
>

export const LobbyGuildInviteResponseSchema = v.object({ code: v.string() })

export type LobbyGuildInviteResponseSchema = v.InferOutput<typeof LobbyGuildInviteResponseSchema>

export const LobbyMemberRequestSchema = v.object({
  id: SnowflakeTypeSchema,
  metadata: v.optional(v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024))))),
  flags: v.optional(v.union([v.null(), v.literal(1)])),
  additional_name: v.optional(
    v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80))),
  ),
})

export type LobbyMemberRequestSchema = v.InferOutput<typeof LobbyMemberRequestSchema>

export const LobbyMemberResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  metadata: v.nullable(v.record(v.string(), v.string())),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  additional_name: v.optional(v.string()),
})

export type LobbyMemberResponseSchema = v.InferOutput<typeof LobbyMemberResponseSchema>

export const LobbyMessageResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  type: MessageTypeSchema,
  content: v.string(),
  lobby_id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  lobby_member: v.optional(MessageLobbyMemberResponseSchema),
  metadata: v.optional(v.record(v.string(), v.string())),
  moderation_metadata: v.optional(v.record(v.string(), v.string())),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  application_id: v.optional(SnowflakeTypeSchema),
})

export type LobbyMessageResponseSchema = v.InferOutput<typeof LobbyMessageResponseSchema>

export const LobbyResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  metadata: v.nullable(v.record(v.string(), v.string())),
  members: v.array(LobbyMemberResponseSchema),
  linked_channel: v.optional(GuildChannelResponseSchema),
  flags: UInt32TypeSchema,
  override_event_webhooks_url: v.optional(v.nullable(v.string())),
})

export type LobbyResponseSchema = v.InferOutput<typeof LobbyResponseSchema>

export const MLSpamTriggerMetadataSchema = v.partial(v.object({}))

export type MLSpamTriggerMetadataSchema = v.InferOutput<typeof MLSpamTriggerMetadataSchema>

export const MLSpamUpsertRequestSchema = v.object({
  name: v.pipe(v.string(), v.maxCodePoints(100)),
  event_type: AutomodEventTypeSchema,
  actions: v.optional(
    v.nullable(
      v.pipe(
        v.array(
          v.union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
        ),
        v.minLength(1),
        v.maxLength(5),
      ),
    ),
  ),
  enabled: v.optional(v.nullable(v.boolean())),
  exempt_roles: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(20),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  exempt_channels: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(50),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: v.optional(v.union([v.null(), MLSpamTriggerMetadataSchema])),
})

export type MLSpamUpsertRequestSchema = v.InferOutput<typeof MLSpamUpsertRequestSchema>

export const MLSpamUpsertRequestPartialSchema = v.partial(
  v.object({
    name: v.pipe(v.string(), v.maxCodePoints(100)),
    event_type: AutomodEventTypeSchema,
    actions: v.nullable(
      v.pipe(
        v.array(
          v.union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
        ),
        v.minLength(1),
        v.maxLength(5),
      ),
    ),
    enabled: v.nullable(v.boolean()),
    exempt_roles: v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(20),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    exempt_channels: v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(50),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: v.union([v.null(), MLSpamTriggerMetadataSchema]),
  }),
)

export type MLSpamUpsertRequestPartialSchema = v.InferOutput<
  typeof MLSpamUpsertRequestPartialSchema
>

export const MentionSpamTriggerMetadataSchema = v.partial(
  v.object({
    mention_total_limit: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(50))),
    mention_raid_protection_enabled: v.nullable(v.boolean()),
  }),
)

export type MentionSpamTriggerMetadataSchema = v.InferOutput<
  typeof MentionSpamTriggerMetadataSchema
>

export const MentionSpamUpsertRequestSchema = v.object({
  name: v.pipe(v.string(), v.maxCodePoints(100)),
  event_type: AutomodEventTypeSchema,
  actions: v.optional(
    v.nullable(
      v.pipe(
        v.array(
          v.union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
        ),
        v.minLength(1),
        v.maxLength(5),
      ),
    ),
  ),
  enabled: v.optional(v.nullable(v.boolean())),
  exempt_roles: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(20),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  exempt_channels: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(50),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: v.optional(v.union([v.null(), MentionSpamTriggerMetadataSchema])),
})

export type MentionSpamUpsertRequestSchema = v.InferOutput<typeof MentionSpamUpsertRequestSchema>

export const MentionSpamUpsertRequestPartialSchema = v.partial(
  v.object({
    name: v.pipe(v.string(), v.maxCodePoints(100)),
    event_type: AutomodEventTypeSchema,
    actions: v.nullable(
      v.pipe(
        v.array(
          v.union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
        ),
        v.minLength(1),
        v.maxLength(5),
      ),
    ),
    enabled: v.nullable(v.boolean()),
    exempt_roles: v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(20),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    exempt_channels: v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(50),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: v.union([v.null(), MentionSpamTriggerMetadataSchema]),
  }),
)

export type MentionSpamUpsertRequestPartialSchema = v.InferOutput<
  typeof MentionSpamUpsertRequestPartialSchema
>

export const MessageReferenceRequestSchema = v.object({
  guild_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  message_id: SnowflakeTypeSchema,
  fail_if_not_exists: v.optional(v.nullable(v.boolean())),
  type: v.optional(v.union([v.null(), MessageReferenceTypeSchema])),
})

export type MessageReferenceRequestSchema = v.InferOutput<typeof MessageReferenceRequestSchema>

export const MessageCreateRequestSchema = v.partial(
  v.object({
    content: v.nullable(v.pipe(v.string(), v.maxCodePoints(4000))),
    embeds: v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10))),
    allowed_mentions: v.union([v.null(), MessageAllowedMentionsRequestSchema]),
    sticker_ids: v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(3))),
    components: v.nullable(
      v.pipe(
        v.array(
          v.union([
            ActionRowComponentForMessageRequestSchema,
            ContainerComponentForMessageRequestSchema,
            FileComponentForMessageRequestSchema,
            MediaGalleryComponentForMessageRequestSchema,
            SectionComponentForMessageRequestSchema,
            SeparatorComponentForMessageRequestSchema,
            TextDisplayComponentForMessageRequestSchema,
          ]),
        ),
        v.maxLength(40),
      ),
    ),
    flags: v.nullable(v.pipe(v.number(), v.integer())),
    attachments: v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
    poll: v.union([v.null(), PollCreateRequestSchema]),
    shared_client_theme: v.union([v.null(), CustomClientThemeShareRequestSchema]),
    message_reference: v.union([v.null(), MessageReferenceRequestSchema]),
    nonce: v.union([
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775808n),
      ),
      v.pipe(v.string(), v.maxCodePoints(25)),
      v.null(),
    ]),
    enforce_nonce: v.nullable(v.boolean()),
    tts: v.nullable(v.boolean()),
  }),
)

export type MessageCreateRequestSchema = v.InferOutput<typeof MessageCreateRequestSchema>

export const MessageEditRequestPartialSchema = v.partial(
  v.object({
    content: v.nullable(v.pipe(v.string(), v.maxCodePoints(4000))),
    embeds: v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10))),
    flags: v.nullable(v.pipe(v.number(), v.integer())),
    allowed_mentions: v.union([v.null(), MessageAllowedMentionsRequestSchema]),
    sticker_ids: v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(1521))),
    components: v.nullable(
      v.pipe(
        v.array(
          v.union([
            ActionRowComponentForMessageRequestSchema,
            ContainerComponentForMessageRequestSchema,
            FileComponentForMessageRequestSchema,
            MediaGalleryComponentForMessageRequestSchema,
            SectionComponentForMessageRequestSchema,
            SeparatorComponentForMessageRequestSchema,
            TextDisplayComponentForMessageRequestSchema,
          ]),
        ),
        v.maxLength(40),
      ),
    ),
    attachments: v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
  }),
)

export type MessageEditRequestPartialSchema = v.InferOutput<typeof MessageEditRequestPartialSchema>

export const TextDisplayComponentForModalRequestSchema = v.object({
  type: MessageComponentTypesSchema,
  id: v.optional(
    v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
  ),
  content: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(4000)),
})

export type TextDisplayComponentForModalRequestSchema = v.InferOutput<
  typeof TextDisplayComponentForModalRequestSchema
>

export const ModalInteractionCallbackRequestDataSchema = v.object({
  custom_id: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  title: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(45)),
  components: v.pipe(
    v.array(
      v.union([
        ActionRowComponentForModalRequestSchema,
        LabelComponentForModalRequestSchema,
        TextDisplayComponentForModalRequestSchema,
      ]),
    ),
    v.minLength(1),
    v.maxLength(40),
  ),
})

export type ModalInteractionCallbackRequestDataSchema = v.InferOutput<
  typeof ModalInteractionCallbackRequestDataSchema
>

export const ModalInteractionCallbackRequestSchema = v.object({
  type: InteractionCallbackTypesSchema,
  data: ModalInteractionCallbackRequestDataSchema,
})

export type ModalInteractionCallbackRequestSchema = v.InferOutput<
  typeof ModalInteractionCallbackRequestSchema
>

export const MyGuildResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  icon: v.nullable(v.string()),
  banner: v.nullable(v.string()),
  owner: v.boolean(),
  permissions: v.string(),
  features: v.pipe(
    v.array(GuildFeaturesSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  approximate_member_count: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
  approximate_presence_count: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
})

export type MyGuildResponseSchema = v.InferOutput<typeof MyGuildResponseSchema>

export const OAuth2GetAuthorizationResponseSchema = v.object({
  application: ApplicationResponseSchema,
  expires: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  scopes: v.pipe(
    v.array(OAuth2ScopesSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  user: v.optional(UserResponseSchema),
})

export type OAuth2GetAuthorizationResponseSchema = v.InferOutput<
  typeof OAuth2GetAuthorizationResponseSchema
>

export const OAuth2KeySchema = v.object({
  kty: v.string(),
  use: v.string(),
  kid: v.string(),
  n: v.string(),
  e: v.string(),
  alg: v.string(),
})

export type OAuth2KeySchema = v.InferOutput<typeof OAuth2KeySchema>

export const OAuth2GetKeysSchema = v.object({ keys: v.array(OAuth2KeySchema) })

export type OAuth2GetKeysSchema = v.InferOutput<typeof OAuth2GetKeysSchema>

export const OAuth2GetOpenIDConnectUserInfoResponseSchema = v.object({
  sub: v.string(),
  email: v.optional(v.nullable(v.string())),
  email_verified: v.optional(v.boolean()),
  preferred_username: v.optional(v.string()),
  nickname: v.optional(v.nullable(v.string())),
  picture: v.optional(v.string()),
  locale: v.optional(v.string()),
})

export type OAuth2GetOpenIDConnectUserInfoResponseSchema = v.InferOutput<
  typeof OAuth2GetOpenIDConnectUserInfoResponseSchema
>

export const OnboardingPromptOptionRequestSchema = v.object({
  id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  title: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(50)),
  description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
  emoji_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  emoji_name: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
  emoji_animated: v.optional(v.nullable(v.boolean())),
  role_ids: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(50),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  channel_ids: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(50),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
})

export type OnboardingPromptOptionRequestSchema = v.InferOutput<
  typeof OnboardingPromptOptionRequestSchema
>

export const PermissionsResponseSchema = v.object({
  permissions: v.pipe(
    v.string(),
    v.description('The computed permissions, as a stringified bitfield'),
  ),
})

export type PermissionsResponseSchema = v.InferOutput<typeof PermissionsResponseSchema>

export const PinnedMessageResponseSchema = v.object({
  pinned_at: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  message: MessageResponseSchema,
})

export type PinnedMessageResponseSchema = v.InferOutput<typeof PinnedMessageResponseSchema>

export const PinnedMessagesResponseSchema = v.object({
  items: v.array(PinnedMessageResponseSchema),
  has_more: v.boolean(),
})

export type PinnedMessagesResponseSchema = v.InferOutput<typeof PinnedMessagesResponseSchema>

export const PollAnswerDetailsResponseSchema = v.object({ users: v.array(UserResponseSchema) })

export type PollAnswerDetailsResponseSchema = v.InferOutput<typeof PollAnswerDetailsResponseSchema>

export const PongInteractionCallbackRequestSchema = v.object({
  type: InteractionCallbackTypesSchema,
})

export type PongInteractionCallbackRequestSchema = v.InferOutput<
  typeof PongInteractionCallbackRequestSchema
>

export const PremiumTypesSchema = v.union([
  v.pipe(v.literal(0), v.description('None')),
  v.pipe(v.literal(1), v.description('Nitro Classic')),
  v.pipe(v.literal(2), v.description('Nitro Standard')),
  v.pipe(v.literal(3), v.description('Nitro Basic')),
])

export type PremiumTypesSchema = v.InferOutput<typeof PremiumTypesSchema>

export const TeamMembershipStatesSchema = v.union([
  v.pipe(v.literal(1), v.description('User has been invited to the team.')),
  v.pipe(v.literal(2), v.description('User has accepted the team invitation.')),
])

export type TeamMembershipStatesSchema = v.InferOutput<typeof TeamMembershipStatesSchema>

export const TeamMemberRolesSchema = v.union([
  v.pipe(
    v.literal('admin'),
    v.description(
      'Admins have similar access as owners, except they cannot take destructive actions on the team or team-owned apps.',
    ),
  ),
  v.pipe(
    v.literal('developer'),
    v.description(
      'Developers can access information about team-owned apps, like the client secret or public key. They can also take limited actions on team-owned apps, like configuring interaction endpoints or resetting the bot token. Members with the Developer role cannot manage the team or its members, or take destructive actions on team-owned apps.',
    ),
  ),
  v.pipe(
    v.literal('read_only'),
    v.description(
      'Read-only members can access information about a team and any team-owned apps. Some examples include getting the IDs of applications and exporting payout records. Members can also invite bots associated with team-owned apps that are marked private.',
    ),
  ),
])

export type TeamMemberRolesSchema = v.InferOutput<typeof TeamMemberRolesSchema>

export const TeamMemberResponseSchema = v.object({
  user: UserResponseSchema,
  team_id: SnowflakeTypeSchema,
  membership_state: TeamMembershipStatesSchema,
  role: TeamMemberRolesSchema,
  permissions: v.array(v.string()),
})

export type TeamMemberResponseSchema = v.InferOutput<typeof TeamMemberResponseSchema>

export const TeamResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  icon: v.nullable(v.string()),
  name: v.string(),
  owner_user_id: SnowflakeTypeSchema,
  members: v.array(TeamMemberResponseSchema),
})

export type TeamResponseSchema = v.InferOutput<typeof TeamResponseSchema>

export const PrivateApplicationResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  icon: v.nullable(v.string()),
  description: v.string(),
  type: v.union([v.null(), ApplicationTypesSchema]),
  cover_image: v.optional(v.string()),
  primary_sku_id: v.optional(SnowflakeTypeSchema),
  flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  flags_new: v.string(),
  bot: v.optional(UserResponseSchema),
  slug: v.optional(v.string()),
  conjure_project_id: v.optional(SnowflakeTypeSchema),
  vibegrations_project_id: v.optional(SnowflakeTypeSchema),
  guild_id: v.optional(SnowflakeTypeSchema),
  rpc_origins: v.optional(v.array(v.string())),
  bot_public: v.optional(v.boolean()),
  bot_require_code_grant: v.optional(v.boolean()),
  terms_of_service_url: v.optional(v.pipe(v.string(), v.url())),
  privacy_policy_url: v.optional(v.pipe(v.string(), v.url())),
  custom_install_url: v.optional(v.pipe(v.string(), v.url())),
  install_params: v.optional(ApplicationOAuth2InstallParamsResponseSchema),
  integration_types_config: v.optional(
    v.record(v.string(), ApplicationIntegrationTypeConfigurationResponseSchema),
  ),
  verify_key: v.string(),
  max_participants: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
  tags: v.optional(
    v.pipe(
      v.array(v.string()),
      v.check((input) => new Set(input).size === input.length),
    ),
  ),
  redirect_uris: v.array(v.pipe(v.string(), v.url())),
  interactions_endpoint_url: v.nullable(v.pipe(v.string(), v.url())),
  role_connections_verification_url: v.nullable(v.pipe(v.string(), v.url())),
  owner: UserResponseSchema,
  approximate_guild_count: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  approximate_user_install_count: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  approximate_user_authorization_count: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  event_webhooks_url: v.optional(v.nullable(v.pipe(v.string(), v.url()))),
  event_webhooks_status: v.optional(ApplicationEventWebhooksStatusSchema),
  event_webhooks_types: v.optional(
    v.pipe(
      v.array(ActionTypesSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
  ),
  explicit_content_filter: ApplicationExplicitContentFilterTypesSchema,
  team: v.union([v.null(), TeamResponseSchema]),
  eligible_oauth2_scopes: v.array(OAuth2ScopesSchema),
})

export type PrivateApplicationResponseSchema = v.InferOutput<
  typeof PrivateApplicationResponseSchema
>

export const PrivateGuildMemberResponseSchema = v.object({
  avatar: v.pipe(v.nullable(v.string()), v.description("the member's guild avatar hash")),
  avatar_decoration_data: v.optional(
    v.pipe(
      v.union([v.null(), UserAvatarDecorationResponseSchema]),
      v.description("data for the member's guild avatar decoration"),
    ),
  ),
  banner: v.pipe(v.nullable(v.string()), v.description("the member's guild banner hash")),
  communication_disabled_until: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description(
      "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
    ),
  ),
  flags: v.pipe(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    v.description('guild member flags represented as a bit set, defaults to 0'),
  ),
  joined_at: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('when the user joined the guild'),
  ),
  nick: v.pipe(v.nullable(v.string()), v.description("this user's guild nickname")),
  pending: v.pipe(
    v.boolean(),
    v.description(
      "whether the user has not yet passed the guild's Membership Screening requirements",
    ),
  ),
  premium_since: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('when the user started boosting the guild'),
  ),
  roles: v.pipe(
    v.pipe(
      v.array(SnowflakeTypeSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
    v.description('array of role object ids'),
  ),
  collectibles: v.optional(
    v.pipe(
      v.union([v.null(), UserCollectiblesResponseSchema]),
      v.description("data for the member's collectibles"),
    ),
  ),
  user: v.pipe(UserResponseSchema, v.description('the user this guild member represents')),
  mute: v.pipe(v.boolean(), v.description('whether the user is muted in voice channels')),
  deaf: v.pipe(v.boolean(), v.description('whether the user is deafened in voice channels')),
  permissions: v.optional(v.string()),
})

export type PrivateGuildMemberResponseSchema = v.InferOutput<
  typeof PrivateGuildMemberResponseSchema
>

export const ProvisionalTokenResponseSchema = v.object({
  token_type: v.string(),
  access_token: v.string(),
  expires_in: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  scope: v.string(),
  id_token: v.string(),
  refresh_token: v.optional(v.nullable(v.string())),
  scopes: v.optional(v.nullable(v.array(v.string()))),
  expires_at_s: v.optional(
    v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
  ),
})

export type ProvisionalTokenResponseSchema = v.InferOutput<typeof ProvisionalTokenResponseSchema>

export const PruneGuildRequestSchema = v.partial(
  v.object({
    days: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(30))),
    compute_prune_count: v.nullable(v.boolean()),
    include_roles: v.union([
      v.string(),
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(100),
        v.check((input) => new Set(input).size === input.length),
      ),
      v.null(),
    ]),
  }),
)

export type PruneGuildRequestSchema = v.InferOutput<typeof PruneGuildRequestSchema>

export const ReactionTypesSchema = v.union([
  v.pipe(v.literal(0), v.description('Normal reaction type')),
  v.pipe(v.literal(1), v.description('Burst reaction type')),
])

export type ReactionTypesSchema = v.InferOutput<typeof ReactionTypesSchema>

export const SDKMessageRequestSchema = v.partial(
  v.object({
    content: v.nullable(v.pipe(v.string(), v.maxCodePoints(4000))),
    embeds: v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10))),
    allowed_mentions: v.union([v.null(), MessageAllowedMentionsRequestSchema]),
    sticker_ids: v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(3))),
    components: v.nullable(
      v.pipe(
        v.array(
          v.union([
            ActionRowComponentForMessageRequestSchema,
            ContainerComponentForMessageRequestSchema,
            FileComponentForMessageRequestSchema,
            MediaGalleryComponentForMessageRequestSchema,
            SectionComponentForMessageRequestSchema,
            SeparatorComponentForMessageRequestSchema,
            TextDisplayComponentForMessageRequestSchema,
          ]),
        ),
        v.maxLength(40),
      ),
    ),
    flags: v.nullable(v.pipe(v.number(), v.integer())),
    attachments: v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
    poll: v.union([v.null(), PollCreateRequestSchema]),
    shared_client_theme: v.union([v.null(), CustomClientThemeShareRequestSchema]),
    message_reference: v.union([v.null(), MessageReferenceRequestSchema]),
    nonce: v.union([
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775808n),
      ),
      v.pipe(v.string(), v.maxCodePoints(25)),
      v.null(),
    ]),
    enforce_nonce: v.nullable(v.boolean()),
    tts: v.nullable(v.boolean()),
  }),
)

export type SDKMessageRequestSchema = v.InferOutput<typeof SDKMessageRequestSchema>

export const SKUIneligibilityReasonSchema = v.union([
  v.pipe(v.literal(0), v.description('Other / catch-all')),
  v.pipe(v.literal(1), v.description('User already owns this SKU or one of its components')),
  v.pipe(v.literal(2), v.description('User account is not on an eligible platform')),
])

export type SKUIneligibilityReasonSchema = v.InferOutput<typeof SKUIneligibilityReasonSchema>

export const ScheduledEventUserCountResponseSchema = v.object({
  guild_scheduled_event_count: v.pipe(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    v.description('The number of users subscribed to the scheduled event'),
  ),
  guild_scheduled_event_exception_counts: v.pipe(
    v.record(
      v.string(),
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    ),
    v.description('Map of exception IDs to user counts for each exception'),
  ),
})

export type ScheduledEventUserCountResponseSchema = v.InferOutput<
  typeof ScheduledEventUserCountResponseSchema
>

export const SearchIndexNotReadyResponseSchema = v.object({
  message: v.string(),
  code: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  documents_indexed: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  retry_after: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type SearchIndexNotReadyResponseSchema = v.InferOutput<
  typeof SearchIndexNotReadyResponseSchema
>

export const SearchableEmbedTypeSchema = v.union([
  v.literal('image'),
  v.literal('video'),
  v.literal('gif'),
  v.literal('sound'),
  v.literal('article'),
])

export type SearchableEmbedTypeSchema = v.InferOutput<typeof SearchableEmbedTypeSchema>

export const WebhookSlackEmbedFieldSchema = v.partial(
  v.object({
    name: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
    value: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
    inline: v.nullable(v.boolean()),
  }),
)

export type WebhookSlackEmbedFieldSchema = v.InferOutput<typeof WebhookSlackEmbedFieldSchema>

export const WebhookSlackEmbedSchema = v.partial(
  v.object({
    title: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
    title_link: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    text: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
    color: v.nullable(
      v.pipe(v.string(), v.regex(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/), v.maxCodePoints(7)),
    ),
    ts: v.nullable(v.pipe(v.number(), v.integer())),
    pretext: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
    footer: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
    footer_icon: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    author_name: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
    author_link: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    author_icon: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    image_url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    thumb_url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    fields: v.nullable(v.pipe(v.array(WebhookSlackEmbedFieldSchema), v.maxLength(1521))),
  }),
)

export type WebhookSlackEmbedSchema = v.InferOutput<typeof WebhookSlackEmbedSchema>

export const SlackWebhookSchema = v.partial(
  v.object({
    text: v.nullable(v.pipe(v.string(), v.maxCodePoints(2000))),
    username: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
    icon_url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    attachments: v.nullable(v.pipe(v.array(WebhookSlackEmbedSchema), v.maxLength(1521))),
  }),
)

export type SlackWebhookSchema = v.InferOutput<typeof SlackWebhookSchema>

export const SocialLayerSKUPurchaseEligibilityCallbackDataSchema = v.object({
  eligible: v.boolean(),
  ineligible_reason: v.optional(v.union([v.null(), SKUIneligibilityReasonSchema])),
  ineligible_reason_description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(255)))),
})

export type SocialLayerSKUPurchaseEligibilityCallbackDataSchema = v.InferOutput<
  typeof SocialLayerSKUPurchaseEligibilityCallbackDataSchema
>

export const SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema = v.object({
  type: InteractionCallbackTypesSchema,
  data: SocialLayerSKUPurchaseEligibilityCallbackDataSchema,
})

export type SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema = v.InferOutput<
  typeof SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema
>

export const SortingModeSchema = v.union([v.literal('relevance'), v.literal('timestamp')])

export type SortingModeSchema = v.InferOutput<typeof SortingModeSchema>

export const SortingOrderSchema = v.union([v.literal('asc'), v.literal('desc')])

export type SortingOrderSchema = v.InferOutput<typeof SortingOrderSchema>

export const SoundboardCreateRequestSchema = v.object({
  name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
  volume: v.optional(v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(1)))),
  emoji_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  emoji_name: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
  sound: v.string(),
})

export type SoundboardCreateRequestSchema = v.InferOutput<typeof SoundboardCreateRequestSchema>

export const SoundboardPatchRequestPartialSchema = v.partial(
  v.object({
    name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
    volume: v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(1))),
    emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
    emoji_name: v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
  }),
)

export type SoundboardPatchRequestPartialSchema = v.InferOutput<
  typeof SoundboardPatchRequestPartialSchema
>

export const SoundboardSoundSendRequestSchema = v.object({
  sound_id: SnowflakeTypeSchema,
  source_guild_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
})

export type SoundboardSoundSendRequestSchema = v.InferOutput<
  typeof SoundboardSoundSendRequestSchema
>

export const StageInstancesPrivacyLevelsSchema = v.union([
  v.pipe(v.literal(1), v.description('The Stage instance is visible publicly. (deprecated)')),
  v.pipe(v.literal(2), v.description('The Stage instance is visible to only guild members.')),
])

export type StageInstancesPrivacyLevelsSchema = v.InferOutput<
  typeof StageInstancesPrivacyLevelsSchema
>

export const StageInstanceResponseSchema = v.object({
  guild_id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  topic: v.string(),
  privacy_level: StageInstancesPrivacyLevelsSchema,
  id: SnowflakeTypeSchema,
  discoverable_disabled: v.boolean(),
  guild_scheduled_event_id: v.union([v.null(), SnowflakeTypeSchema]),
})

export type StageInstanceResponseSchema = v.InferOutput<typeof StageInstanceResponseSchema>

export const StageScheduledEventCreateRequestSchema = v.object({
  name: v.pipe(v.string(), v.maxCodePoints(100)),
  description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1000)))),
  image: v.optional(v.nullable(v.string())),
  scheduled_start_time: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  scheduled_end_time: v.optional(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  recurrence_rule: v.optional(
    v.pipe(
      v.union([v.null(), RecurrenceRuleSchema]),
      v.description('Recurrence rule for the scheduled event'),
    ),
  ),
  entity_metadata: v.optional(v.union([v.null(), EntityMetadataStageInstanceSchema])),
})

export type StageScheduledEventCreateRequestSchema = v.InferOutput<
  typeof StageScheduledEventCreateRequestSchema
>

export const StageScheduledEventPatchRequestPartialSchema = v.partial(
  v.object({
    status: v.union([v.null(), GuildScheduledEventStatusesSchema]),
    name: v.pipe(v.string(), v.maxCodePoints(100)),
    description: v.nullable(v.pipe(v.string(), v.maxCodePoints(1000))),
    image: v.nullable(v.string()),
    scheduled_start_time: v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    scheduled_end_time: v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    entity_type: v.union([v.null(), GuildScheduledEventEntityTypesSchema]),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    channel_id: v.union([v.null(), SnowflakeTypeSchema]),
    recurrence_rule: v.pipe(
      v.union([v.null(), RecurrenceRuleSchema]),
      v.description('Recurrence rule for the scheduled event'),
    ),
    entity_metadata: v.union([v.null(), EntityMetadataStageInstanceSchema]),
  }),
)

export type StageScheduledEventPatchRequestPartialSchema = v.InferOutput<
  typeof StageScheduledEventPatchRequestPartialSchema
>

export const StickerPackResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  sku_id: SnowflakeTypeSchema,
  name: v.string(),
  description: v.nullable(v.string()),
  stickers: v.array(StandardStickerResponseSchema),
  cover_sticker_id: v.optional(SnowflakeTypeSchema),
  banner_asset_id: v.optional(SnowflakeTypeSchema),
})

export type StickerPackResponseSchema = v.InferOutput<typeof StickerPackResponseSchema>

export const StickerPackCollectionResponseSchema = v.object({
  sticker_packs: v.array(StickerPackResponseSchema),
})

export type StickerPackCollectionResponseSchema = v.InferOutput<
  typeof StickerPackCollectionResponseSchema
>

export const SubscriptionResponseStatusTypeSchema = v.union([
  v.pipe(v.literal(0), v.description('Subscription is active and scheduled to renew')),
  v.pipe(v.literal(1), v.description('Subscription is inactive and not being charged')),
  v.pipe(v.literal(2), v.description('Subscription is active but will not renew')),
])

export type SubscriptionResponseStatusTypeSchema = v.InferOutput<
  typeof SubscriptionResponseStatusTypeSchema
>

export const SubscriptionResponseSchema = v.object({
  id: v.pipe(SnowflakeTypeSchema, v.description('ID of the subscription')),
  user_id: v.pipe(SnowflakeTypeSchema, v.description('ID of the user who is subscribed')),
  sku_ids: v.pipe(
    v.pipe(
      v.array(SnowflakeTypeSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
    v.description('List of SKUs subscribed to'),
  ),
  renewal_sku_ids: v.pipe(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    v.description('List of SKUs that this user will be subscribed to at renewal'),
  ),
  entitlement_ids: v.pipe(
    v.pipe(
      v.array(SnowflakeTypeSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
    v.description('List of entitlements granted for this subscription'),
  ),
  current_period_start: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('Start of the current subscription period'),
  ),
  current_period_end: v.pipe(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    v.description('End of the current subscription period'),
  ),
  status: v.pipe(
    SubscriptionResponseStatusTypeSchema,
    v.description('Current status of the subscription'),
  ),
  canceled_at: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('When the subscription was canceled'),
  ),
  country: v.optional(
    v.pipe(
      v.nullable(v.string()),
      v.description(
        'ISO3166-1 alpha-2 country code of the payment source used to purchase the subscription',
      ),
    ),
  ),
})

export type SubscriptionResponseSchema = v.InferOutput<typeof SubscriptionResponseSchema>

export const TargetUsersJobStatusTypesSchema = v.union([
  v.pipe(v.literal(0), v.description('The default value.')),
  v.pipe(v.literal(1), v.description('The job is still being processed.')),
  v.pipe(v.literal(2), v.description('The job has been completed successfully.')),
  v.pipe(
    v.literal(3),
    v.description('The job has failed, see error_message field for more details.'),
  ),
])

export type TargetUsersJobStatusTypesSchema = v.InferOutput<typeof TargetUsersJobStatusTypesSchema>

export const TargetUsersJobStatusResponseSchema = v.object({
  status: v.pipe(
    TargetUsersJobStatusTypesSchema,
    v.description('The status of the job processing the target users.'),
  ),
  total_users: v.pipe(
    UInt32TypeSchema,
    v.description('The total number of users in the provided list.'),
  ),
  processed_users: v.pipe(UInt32TypeSchema, v.description('The number of users processed so far.')),
  created_at: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('The timestamp when the job was created.'),
  ),
  completed_at: v.pipe(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    v.description('The timestamp when the job was successfully completed.'),
  ),
  error_message: v.pipe(
    v.nullable(v.string()),
    v.description('The error message if the job failed.'),
  ),
})

export type TargetUsersJobStatusResponseSchema = v.InferOutput<
  typeof TargetUsersJobStatusResponseSchema
>

export const ThreadSearchResponseSchema = v.object({
  threads: v.array(ThreadResponseSchema),
  members: v.array(ThreadMemberResponseSchema),
  has_more: v.boolean(),
  first_messages: v.optional(v.array(MessageResponseSchema)),
  total_results: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type ThreadSearchResponseSchema = v.InferOutput<typeof ThreadSearchResponseSchema>

export const ThreadSortingModeSchema = v.union([
  v.literal('relevance'),
  v.literal('creation_time'),
  v.literal('last_message_time'),
  v.literal('archive_time'),
])

export type ThreadSortingModeSchema = v.InferOutput<typeof ThreadSortingModeSchema>

export const ThreadsResponseSchema = v.object({
  threads: v.array(ThreadResponseSchema),
  members: v.array(ThreadMemberResponseSchema),
  has_more: v.boolean(),
  first_messages: v.optional(v.array(MessageResponseSchema)),
})

export type ThreadsResponseSchema = v.InferOutput<typeof ThreadsResponseSchema>

export const TypingIndicatorResponseSchema = v.partial(v.object({}))

export type TypingIndicatorResponseSchema = v.InferOutput<typeof TypingIndicatorResponseSchema>

export const UnbanUserFromGuildRequestSchema = v.partial(v.object({}))

export type UnbanUserFromGuildRequestSchema = v.InferOutput<typeof UnbanUserFromGuildRequestSchema>

export const UpdateApplicationUserRoleConnectionRequestSchema = v.partial(
  v.object({
    platform_name: v.nullable(v.pipe(v.string(), v.maxCodePoints(50))),
    platform_username: v.nullable(v.pipe(v.string(), v.maxCodePoints(100))),
    metadata: v.nullable(
      v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
    ),
  }),
)

export type UpdateApplicationUserRoleConnectionRequestSchema = v.InferOutput<
  typeof UpdateApplicationUserRoleConnectionRequestSchema
>

export const UpdateDMRequestPartialSchema = v.partial(
  v.object({ name: v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(100))) }),
)

export type UpdateDMRequestPartialSchema = v.InferOutput<typeof UpdateDMRequestPartialSchema>

export const UpdateGroupDMRequestPartialSchema = v.partial(
  v.object({
    name: v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(100))),
    icon: v.nullable(v.string()),
  }),
)

export type UpdateGroupDMRequestPartialSchema = v.InferOutput<
  typeof UpdateGroupDMRequestPartialSchema
>

export const UpdateThreadTagRequestSchema = v.object({
  name: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(50)),
  emoji_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  emoji_name: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
  moderated: v.optional(v.nullable(v.boolean())),
  id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
})

export type UpdateThreadTagRequestSchema = v.InferOutput<typeof UpdateThreadTagRequestSchema>

export const UpdateGuildChannelRequestPartialSchema = v.partial(
  v.object({
    type: v.union([v.null(), ChannelTypesSchema]),
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    position: v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
    topic: v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(4096))),
    bitrate: v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(8000),
      ),
    ),
    user_limit: v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
      ),
    ),
    nsfw: v.nullable(v.boolean()),
    rate_limit_per_user: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(21600)),
    ),
    parent_id: v.union([v.null(), SnowflakeTypeSchema]),
    permission_overwrites: v.nullable(
      v.pipe(v.array(ChannelPermissionOverwriteRequestSchema), v.maxLength(100)),
    ),
    rtc_region: v.nullable(v.string()),
    video_quality_mode: v.union([v.null(), VideoQualityModesSchema]),
    default_auto_archive_duration: v.union([v.null(), ThreadAutoArchiveDurationSchema]),
    default_reaction_emoji: v.union([v.null(), UpdateDefaultReactionEmojiRequestSchema]),
    default_thread_rate_limit_per_user: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(21600)),
    ),
    default_sort_order: v.union([v.null(), ThreadSortOrderSchema]),
    default_forum_layout: v.union([v.null(), ForumLayoutSchema]),
    default_tag_setting: v.union([v.null(), ThreadSearchTagSettingSchema]),
    flags: v.nullable(v.pipe(v.number(), v.integer())),
    available_tags: v.nullable(v.pipe(v.array(UpdateThreadTagRequestSchema), v.maxLength(20))),
  }),
)

export type UpdateGuildChannelRequestPartialSchema = v.InferOutput<
  typeof UpdateGuildChannelRequestPartialSchema
>

export const UpdateOnboardingPromptRequestSchema = v.object({
  title: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
  options: v.pipe(v.array(OnboardingPromptOptionRequestSchema), v.minLength(1), v.maxLength(50)),
  single_select: v.optional(v.nullable(v.boolean())),
  required: v.optional(v.nullable(v.boolean())),
  in_onboarding: v.optional(v.nullable(v.boolean())),
  type: v.optional(v.union([v.null(), OnboardingPromptTypeSchema])),
  id: SnowflakeTypeSchema,
})

export type UpdateOnboardingPromptRequestSchema = v.InferOutput<
  typeof UpdateOnboardingPromptRequestSchema
>

export const UpdateGuildOnboardingRequestSchema = v.partial(
  v.object({
    prompts: v.nullable(v.pipe(v.array(UpdateOnboardingPromptRequestSchema), v.maxLength(15))),
    enabled: v.nullable(v.boolean()),
    default_channel_ids: v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(500),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    mode: v.union([v.null(), GuildOnboardingModeSchema]),
  }),
)

export type UpdateGuildOnboardingRequestSchema = v.InferOutput<
  typeof UpdateGuildOnboardingRequestSchema
>

export const UpdateMessageInteractionCallbackRequestSchema = v.object({
  type: InteractionCallbackTypesSchema,
  data: v.optional(
    v.union([v.null(), IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema]),
  ),
})

export type UpdateMessageInteractionCallbackRequestSchema = v.InferOutput<
  typeof UpdateMessageInteractionCallbackRequestSchema
>

export const UpdateRolePositionsRequestSchema = v.partial(
  v.object({
    id: v.union([v.null(), SnowflakeTypeSchema]),
    position: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    ),
  }),
)

export type UpdateRolePositionsRequestSchema = v.InferOutput<
  typeof UpdateRolePositionsRequestSchema
>

export const UpdateRoleRequestPartialSchema = v.partial(
  v.object({
    name: v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
    permissions: v.nullable(v.pipe(v.number(), v.integer())),
    color: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215))),
    colors: v.union([v.null(), RoleColorsSchema]),
    hoist: v.nullable(v.boolean()),
    mentionable: v.nullable(v.boolean()),
    icon: v.nullable(v.string()),
    unicode_emoji: v.nullable(v.pipe(v.string(), v.maxCodePoints(100))),
  }),
)

export type UpdateRoleRequestPartialSchema = v.InferOutput<typeof UpdateRoleRequestPartialSchema>

export const UpdateSelfVoiceStateRequestPartialSchema = v.partial(
  v.object({
    request_to_speak_timestamp: v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    suppress: v.nullable(v.boolean()),
    channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  }),
)

export type UpdateSelfVoiceStateRequestPartialSchema = v.InferOutput<
  typeof UpdateSelfVoiceStateRequestPartialSchema
>

export const UpdateThreadRequestPartialSchema = v.partial(
  v.object({
    name: v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(100))),
    archived: v.nullable(v.boolean()),
    locked: v.nullable(v.boolean()),
    invitable: v.nullable(v.boolean()),
    auto_archive_duration: v.union([v.null(), ThreadAutoArchiveDurationSchema]),
    rate_limit_per_user: v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(0),
        v.maxValue(21600),
      ),
    ),
    flags: v.nullable(v.pipe(v.number(), v.integer())),
    applied_tags: v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(5))),
    bitrate: v.nullable(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(-2147483648),
        v.maxValue(2147483647),
        v.minValue(8000),
      ),
    ),
    user_limit: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(99))),
    rtc_region: v.nullable(v.string()),
    video_quality_mode: v.union([v.null(), VideoQualityModesSchema]),
  }),
)

export type UpdateThreadRequestPartialSchema = v.InferOutput<
  typeof UpdateThreadRequestPartialSchema
>

export const UpdateVoiceStateRequestPartialSchema = v.partial(
  v.object({
    suppress: v.nullable(v.boolean()),
    channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  }),
)

export type UpdateVoiceStateRequestPartialSchema = v.InferOutput<
  typeof UpdateVoiceStateRequestPartialSchema
>

export const UserGuildOnboardingResponseSchema = v.object({
  guild_id: SnowflakeTypeSchema,
  prompts: v.array(OnboardingPromptResponseSchema),
  default_channel_ids: v.pipe(
    v.array(SnowflakeTypeSchema),
    v.check((input) => new Set(input).size === input.length),
  ),
  enabled: v.boolean(),
  mode: GuildOnboardingModeSchema,
})

export type UserGuildOnboardingResponseSchema = v.InferOutput<
  typeof UserGuildOnboardingResponseSchema
>

export const UserPIIResponseSchema = v.object({
  id: v.pipe(SnowflakeTypeSchema, v.description("the user's id")),
  username: v.pipe(
    v.string(),
    v.description("the user's username, not unique across the platform"),
  ),
  avatar: v.pipe(v.nullable(v.string()), v.description("the user's avatar hash")),
  discriminator: v.pipe(v.string(), v.description("the user's Discord-tag")),
  public_flags: v.pipe(
    v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    v.description("the public flags on a user's account"),
  ),
  flags: v.pipe(Int53TypeSchema, v.description("the flags on a user's account")),
  bot: v.optional(
    v.pipe(v.boolean(), v.description('whether the user belongs to an OAuth2 application')),
  ),
  system: v.optional(
    v.pipe(
      v.boolean(),
      v.description(
        'whether the user is an Official Discord System user (part of the urgent message system)',
      ),
    ),
  ),
  banner: v.optional(v.pipe(v.nullable(v.string()), v.description("the user's banner hash"))),
  accent_color: v.optional(
    v.pipe(
      v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
      v.description(
        "the user's banner color encoded as an integer representation of hexadecimal color code",
      ),
    ),
  ),
  global_name: v.pipe(
    v.nullable(v.string()),
    v.description("the user's display name, if it is set"),
  ),
  avatar_decoration_data: v.optional(
    v.pipe(
      v.union([v.null(), UserAvatarDecorationResponseSchema]),
      v.description("data for the user's avatar decoration"),
    ),
  ),
  collectibles: v.optional(
    v.pipe(
      v.union([v.null(), UserCollectiblesResponseSchema]),
      v.description("data for the user's collectibles"),
    ),
  ),
  primary_guild: v.optional(v.union([v.null(), UserPrimaryGuildResponseSchema])),
  mfa_enabled: v.boolean(),
  locale: AvailableLocalesEnumSchema,
  premium_type: v.optional(PremiumTypesSchema),
  email: v.optional(v.nullable(v.string())),
  verified: v.optional(v.boolean()),
})

export type UserPIIResponseSchema = v.InferOutput<typeof UserPIIResponseSchema>

export const UserProfileMetadataSchema = v.partial(
  v.object({
    keyword_filter: v.nullable(
      v.pipe(
        v.array(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(60))),
        v.maxLength(1000),
      ),
    ),
    regex_patterns: v.nullable(
      v.pipe(
        v.array(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(260))),
        v.maxLength(10),
      ),
    ),
    allow_list: v.nullable(
      v.pipe(
        v.array(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(60))),
        v.maxLength(100),
      ),
    ),
  }),
)

export type UserProfileMetadataSchema = v.InferOutput<typeof UserProfileMetadataSchema>

export const UserProfileUpsertRequestSchema = v.object({
  name: v.pipe(v.string(), v.maxCodePoints(100)),
  event_type: AutomodEventTypeSchema,
  actions: v.optional(
    v.nullable(
      v.pipe(
        v.array(
          v.union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
        ),
        v.minLength(1),
        v.maxLength(5),
      ),
    ),
  ),
  enabled: v.optional(v.nullable(v.boolean())),
  exempt_roles: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(20),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  exempt_channels: v.optional(
    v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(50),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: UserProfileMetadataSchema,
})

export type UserProfileUpsertRequestSchema = v.InferOutput<typeof UserProfileUpsertRequestSchema>

export const UserProfileUpsertRequestPartialSchema = v.partial(
  v.object({
    name: v.pipe(v.string(), v.maxCodePoints(100)),
    event_type: AutomodEventTypeSchema,
    actions: v.nullable(
      v.pipe(
        v.array(
          v.union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
        ),
        v.minLength(1),
        v.maxLength(5),
      ),
    ),
    enabled: v.nullable(v.boolean()),
    exempt_roles: v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(20),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    exempt_channels: v.nullable(
      v.pipe(
        v.array(SnowflakeTypeSchema),
        v.maxLength(50),
        v.check((input) => new Set(input).size === input.length),
      ),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: UserProfileMetadataSchema,
  }),
)

export type UserProfileUpsertRequestPartialSchema = v.InferOutput<
  typeof UserProfileUpsertRequestPartialSchema
>

export const VanityURLErrorResponseSchema = v.object({
  message: v.string(),
  code: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type VanityURLErrorResponseSchema = v.InferOutput<typeof VanityURLErrorResponseSchema>

export const VanityURLResponseSchema = v.object({
  code: v.nullable(v.string()),
  uses: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  error: v.optional(v.union([v.null(), VanityURLErrorResponseSchema])),
})

export type VanityURLResponseSchema = v.InferOutput<typeof VanityURLResponseSchema>

export const VoiceRegionResponseSchema = v.object({
  id: v.string(),
  name: v.string(),
  custom: v.boolean(),
  deprecated: v.boolean(),
  optimal: v.boolean(),
})

export type VoiceRegionResponseSchema = v.InferOutput<typeof VoiceRegionResponseSchema>

export const VoiceScheduledEventCreateRequestSchema = v.object({
  name: v.pipe(v.string(), v.maxCodePoints(100)),
  description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1000)))),
  image: v.optional(v.nullable(v.string())),
  scheduled_start_time: v.pipe(
    v.string(),
    v.regex(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  scheduled_end_time: v.optional(
    v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  recurrence_rule: v.optional(
    v.pipe(
      v.union([v.null(), RecurrenceRuleSchema]),
      v.description('Recurrence rule for the scheduled event'),
    ),
  ),
  entity_metadata: v.optional(v.union([v.null(), EntityMetadataVoiceSchema])),
})

export type VoiceScheduledEventCreateRequestSchema = v.InferOutput<
  typeof VoiceScheduledEventCreateRequestSchema
>

export const VoiceScheduledEventPatchRequestPartialSchema = v.partial(
  v.object({
    status: v.union([v.null(), GuildScheduledEventStatusesSchema]),
    name: v.pipe(v.string(), v.maxCodePoints(100)),
    description: v.nullable(v.pipe(v.string(), v.maxCodePoints(1000))),
    image: v.nullable(v.string()),
    scheduled_start_time: v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    scheduled_end_time: v.nullable(
      v.pipe(
        v.string(),
        v.regex(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
    entity_type: v.union([v.null(), GuildScheduledEventEntityTypesSchema]),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    channel_id: v.union([v.null(), SnowflakeTypeSchema]),
    recurrence_rule: v.pipe(
      v.union([v.null(), RecurrenceRuleSchema]),
      v.description('Recurrence rule for the scheduled event'),
    ),
    entity_metadata: v.union([v.null(), EntityMetadataVoiceSchema]),
  }),
)

export type VoiceScheduledEventPatchRequestPartialSchema = v.InferOutput<
  typeof VoiceScheduledEventPatchRequestPartialSchema
>

export const VoiceStateResponseSchema = v.object({
  channel_id: v.union([v.null(), SnowflakeTypeSchema]),
  deaf: v.boolean(),
  guild_id: v.union([v.null(), SnowflakeTypeSchema]),
  member: v.optional(GuildMemberResponseSchema),
  mute: v.boolean(),
  request_to_speak_timestamp: v.nullable(
    v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  suppress: v.boolean(),
  self_stream: v.nullable(v.boolean()),
  self_deaf: v.boolean(),
  self_mute: v.boolean(),
  self_video: v.boolean(),
  session_id: v.string(),
  user_id: SnowflakeTypeSchema,
})

export type VoiceStateResponseSchema = v.InferOutput<typeof VoiceStateResponseSchema>

export const WelcomeScreenPatchRequestPartialSchema = v.partial(
  v.object({
    description: v.nullable(v.pipe(v.string(), v.maxCodePoints(140))),
    welcome_channels: v.nullable(v.pipe(v.array(GuildWelcomeChannelSchema), v.maxLength(5))),
    enabled: v.nullable(v.boolean()),
  }),
)

export type WelcomeScreenPatchRequestPartialSchema = v.InferOutput<
  typeof WelcomeScreenPatchRequestPartialSchema
>

export const WidgetActivitySchema = v.object({ name: v.string() })

export type WidgetActivitySchema = v.InferOutput<typeof WidgetActivitySchema>

export const WidgetChannelSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  position: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type WidgetChannelSchema = v.InferOutput<typeof WidgetChannelSchema>

export const WidgetImageStylesSchema = v.union([
  v.pipe(
    v.literal('shield'),
    v.description('shield style widget with Discord icon and guild members online count'),
  ),
  v.pipe(
    v.literal('banner1'),
    v.description(
      'large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget',
    ),
  ),
  v.pipe(
    v.literal('banner2'),
    v.description(
      'smaller widget style with guild icon, name and online count. Split on the right with Discord logo',
    ),
  ),
  v.pipe(
    v.literal('banner3'),
    v.description(
      'large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right',
    ),
  ),
  v.pipe(
    v.literal('banner4'),
    v.description(
      'large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom',
    ),
  ),
])

export type WidgetImageStylesSchema = v.InferOutput<typeof WidgetImageStylesSchema>

export const WidgetUserDiscriminatorSchema = v.union([v.literal('0000')])

export type WidgetUserDiscriminatorSchema = v.InferOutput<typeof WidgetUserDiscriminatorSchema>

export const WidgetMemberSchema = v.object({
  id: v.string(),
  username: v.string(),
  discriminator: WidgetUserDiscriminatorSchema,
  avatar: v.null(),
  status: v.string(),
  avatar_url: v.pipe(v.string(), v.url()),
  activity: v.optional(WidgetActivitySchema),
  deaf: v.optional(v.boolean()),
  mute: v.optional(v.boolean()),
  self_deaf: v.optional(v.boolean()),
  self_mute: v.optional(v.boolean()),
  suppress: v.optional(v.boolean()),
  channel_id: v.optional(SnowflakeTypeSchema),
})

export type WidgetMemberSchema = v.InferOutput<typeof WidgetMemberSchema>

export const WidgetResponseSchema = v.object({
  id: SnowflakeTypeSchema,
  name: v.string(),
  instant_invite: v.nullable(v.string()),
  channels: v.array(WidgetChannelSchema),
  members: v.array(WidgetMemberSchema),
  presence_count: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
})

export type WidgetResponseSchema = v.InferOutput<typeof WidgetResponseSchema>

export const WidgetSettingsResponseSchema = v.object({
  enabled: v.boolean(),
  channel_id: v.union([v.null(), SnowflakeTypeSchema]),
})

export type WidgetSettingsResponseSchema = v.InferOutput<typeof WidgetSettingsResponseSchema>

export const ErrorSchema = v.pipe(
  v.object({
    code: v.pipe(
      v.pipe(v.number(), v.integer()),
      v.description('Discord internal error code. See error code reference'),
    ),
    message: v.pipe(v.string(), v.description('Human-readable error message')),
  }),
  v.description('A single error, either for an API response or a specific field.'),
)

export type ErrorSchema = v.InferOutput<typeof ErrorSchema>

export const InnerErrorsSchema = v.strictObject({
  _errors: v.pipe(v.array(ErrorSchema), v.description('The list of errors for this field')),
})

export type InnerErrorsSchema = v.InferOutput<typeof InnerErrorsSchema>

type ErrorDetailsType =
  | { [key: string]: ErrorDetailsType }
  | v.InferOutput<typeof InnerErrorsSchema>

export const ErrorDetailsSchema: v.GenericSchema<ErrorDetailsType> = v.union([
  v.record(
    v.string(),
    v.lazy(() => ErrorDetailsSchema),
  ),
  InnerErrorsSchema,
])

export type ErrorDetailsSchema = v.InferOutput<typeof ErrorDetailsSchema>

export const ErrorResponseSchema = v.pipe(
  v.intersect([ErrorSchema, v.partial(v.object({ errors: ErrorDetailsSchema }))]),
  v.description('Errors object returned by the Discord API'),
)

export type ErrorResponseSchema = v.InferOutput<typeof ErrorResponseSchema>

export const RatelimitedResponseSchema = v.pipe(
  v.intersect([
    ErrorSchema,
    v.object({
      retry_after: v.pipe(
        v.number(),
        v.description('The number of seconds to wait before retrying your request'),
      ),
      global: v.pipe(
        v.boolean(),
        v.description(
          'Whether you are being ratelimited by the global ratelimit or a per-endpoint ratelimit',
        ),
      ),
    }),
  ]),
  v.description('Ratelimit error object returned by the Discord API'),
)

export type RatelimitedResponseSchema = v.InferOutput<typeof RatelimitedResponseSchema>
