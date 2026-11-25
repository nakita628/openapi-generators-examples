import { resolver, validator } from 'hono-openapi'
import { Type, type Static, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

export const AccountResponseSchema = Type.Object(
  { id: Type.String(), name: Type.Union([Type.String(), Type.Null()]) },
  { ref: 'AccountResponse' },
)

export type AccountResponse = Static<typeof AccountResponseSchema>

export const MessageComponentTypesSchema = Type.Union(
  [
    Type.Literal(1, { description: 'Container for other components' }),
    Type.Literal(2, { description: 'Button object' }),
    Type.Literal(3, { description: 'Select menu for picking from defined text options' }),
    Type.Literal(4, { description: 'Text input object' }),
    Type.Literal(5, { description: 'Select menu for users' }),
    Type.Literal(6, { description: 'Select menu for roles' }),
    Type.Literal(7, { description: 'Select menu for mentionables (users and roles)' }),
    Type.Literal(8, { description: 'Select menu for channels' }),
    Type.Literal(9, { description: 'Section component' }),
    Type.Literal(10, { description: 'Text component' }),
    Type.Literal(11, { description: 'Thumbnail component' }),
    Type.Literal(12, { description: 'Media gallery component' }),
    Type.Literal(13, { description: 'File component' }),
    Type.Literal(14, { description: 'Separator component' }),
    Type.Literal(17, { description: 'Container component' }),
    Type.Literal(18, { description: 'Label component' }),
    Type.Literal(19, { description: 'File upload component' }),
    Type.Literal(21, { description: 'Radio group component' }),
    Type.Literal(22, { description: 'Checkbox group component' }),
    Type.Literal(23, { description: 'Checkbox component' }),
  ],
  { ref: 'MessageComponentTypes' },
)

export type MessageComponentTypes = Static<typeof MessageComponentTypesSchema>

export const ButtonStyleTypesSchema = Type.Union(
  [
    Type.Literal(1),
    Type.Literal(2),
    Type.Literal(3),
    Type.Literal(4),
    Type.Literal(5),
    Type.Literal(6),
  ],
  { ref: 'ButtonStyleTypes' },
)

export type ButtonStyleTypes = Static<typeof ButtonStyleTypesSchema>

export const SnowflakeTypeSchema = Type.String({
  ref: 'SnowflakeType',
  pattern: '^(0|[1-9][0-9]*)$',
})

export type SnowflakeType = Static<typeof SnowflakeTypeSchema>

export const ComponentEmojiForRequestSchema = Type.Object(
  {
    id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    name: Type.String({ maxLength: 32 }),
  },
  { ref: 'ComponentEmojiForRequest' },
)

export type ComponentEmojiForRequest = Static<typeof ComponentEmojiForRequestSchema>

export const ButtonComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.Optional(
      Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
    ),
    style: ButtonStyleTypesSchema,
    label: Type.Optional(Type.Union([Type.String({ maxLength: 80 }), Type.Null()])),
    disabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    url: Type.Optional(Type.Union([Type.String({ format: 'uri', maxLength: 512 }), Type.Null()])),
    sku_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    emoji: Type.Optional(Type.Union([Type.Null(), ComponentEmojiForRequestSchema])),
  },
  { ref: 'ButtonComponentForMessageRequest' },
)

export type ButtonComponentForMessageRequest = Static<typeof ButtonComponentForMessageRequestSchema>

export const SnowflakeSelectDefaultValueTypesSchema = Type.Union(
  [Type.Literal('user'), Type.Literal('role'), Type.Literal('channel')],
  { ref: 'SnowflakeSelectDefaultValueTypes' },
)

export type SnowflakeSelectDefaultValueTypes = Static<typeof SnowflakeSelectDefaultValueTypesSchema>

export const ChannelSelectDefaultValueSchema = Type.Object(
  { type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema },
  { ref: 'ChannelSelectDefaultValue' },
)

export type ChannelSelectDefaultValue = Static<typeof ChannelSelectDefaultValueSchema>

export const ChannelTypesSchema = Type.Union(
  [
    Type.Literal(1, { description: 'A direct message between users' }),
    Type.Literal(3, { description: 'A direct message between multiple users' }),
    Type.Literal(0, { description: 'A text channel within a server' }),
    Type.Literal(2, { description: 'A voice channel within a server' }),
    Type.Literal(4, { description: 'An organizational category that contains up to 50 channels' }),
    Type.Literal(5, {
      description:
        'A channel that users can follow and crosspost into their own server (formerly news channels)',
    }),
    Type.Literal(10, {
      description: 'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
    }),
    Type.Literal(11, {
      description:
        'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
    }),
    Type.Literal(12, {
      description:
        'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
    }),
    Type.Literal(13, { description: 'A voice channel for hosting events with an audience' }),
    Type.Literal(14, { description: 'The channel in a hub containing the listed servers' }),
    Type.Literal(15, { description: 'Channel that can only contain threads' }),
  ],
  { ref: 'ChannelTypes' },
)

export type ChannelTypes = Static<typeof ChannelTypesSchema>

export const ChannelSelectComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 150 }), Type.Null()])),
    min_values: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 25 }), Type.Null()])),
    max_values: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 25 }), Type.Null()])),
    disabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    default_values: Type.Optional(
      Type.Union([Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }), Type.Null()]),
    ),
    channel_types: Type.Optional(
      Type.Union([Type.Array(ChannelTypesSchema, { uniqueItems: true }), Type.Null()]),
    ),
  },
  { ref: 'ChannelSelectComponentForMessageRequest' },
)

export type ChannelSelectComponentForMessageRequest = Static<
  typeof ChannelSelectComponentForMessageRequestSchema
>

export const RoleSelectDefaultValueSchema = Type.Object(
  { type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema },
  { ref: 'RoleSelectDefaultValue' },
)

export type RoleSelectDefaultValue = Static<typeof RoleSelectDefaultValueSchema>

export const UserSelectDefaultValueSchema = Type.Object(
  { type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema },
  { ref: 'UserSelectDefaultValue' },
)

export type UserSelectDefaultValue = Static<typeof UserSelectDefaultValueSchema>

export const MentionableSelectComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 150 }), Type.Null()])),
    min_values: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 25 }), Type.Null()])),
    max_values: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 25 }), Type.Null()])),
    disabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    default_values: Type.Optional(
      Type.Union([
        Type.Array(Type.Union([RoleSelectDefaultValueSchema, UserSelectDefaultValueSchema]), {
          maxItems: 25,
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'MentionableSelectComponentForMessageRequest' },
)

export type MentionableSelectComponentForMessageRequest = Static<
  typeof MentionableSelectComponentForMessageRequestSchema
>

export const RoleSelectComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 150 }), Type.Null()])),
    min_values: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 25 }), Type.Null()])),
    max_values: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 25 }), Type.Null()])),
    disabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    default_values: Type.Optional(
      Type.Union([Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }), Type.Null()]),
    ),
  },
  { ref: 'RoleSelectComponentForMessageRequest' },
)

export type RoleSelectComponentForMessageRequest = Static<
  typeof RoleSelectComponentForMessageRequestSchema
>

export const StringSelectOptionForRequestSchema = Type.Object(
  {
    label: Type.String({ minLength: 1, maxLength: 100 }),
    value: Type.String({ minLength: 1, maxLength: 100 }),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
    default: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    emoji: Type.Optional(Type.Union([Type.Null(), ComponentEmojiForRequestSchema])),
  },
  { ref: 'StringSelectOptionForRequest' },
)

export type StringSelectOptionForRequest = Static<typeof StringSelectOptionForRequestSchema>

export const StringSelectComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 150 }), Type.Null()])),
    min_values: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 25 }), Type.Null()])),
    max_values: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 25 }), Type.Null()])),
    disabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    options: Type.Array(StringSelectOptionForRequestSchema, { minItems: 1, maxItems: 25 }),
  },
  { ref: 'StringSelectComponentForMessageRequest' },
)

export type StringSelectComponentForMessageRequest = Static<
  typeof StringSelectComponentForMessageRequestSchema
>

export const UserSelectComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 150 }), Type.Null()])),
    min_values: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 25 }), Type.Null()])),
    max_values: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 25 }), Type.Null()])),
    disabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    default_values: Type.Optional(
      Type.Union([Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }), Type.Null()]),
    ),
  },
  { ref: 'UserSelectComponentForMessageRequest' },
)

export type UserSelectComponentForMessageRequest = Static<
  typeof UserSelectComponentForMessageRequestSchema
>

export const ActionRowComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    components: Type.Array(
      Type.Union([
        ButtonComponentForMessageRequestSchema,
        ChannelSelectComponentForMessageRequestSchema,
        MentionableSelectComponentForMessageRequestSchema,
        RoleSelectComponentForMessageRequestSchema,
        StringSelectComponentForMessageRequestSchema,
        UserSelectComponentForMessageRequestSchema,
      ]),
      { minItems: 1, maxItems: 5 },
    ),
  },
  { ref: 'ActionRowComponentForMessageRequest' },
)

export type ActionRowComponentForMessageRequest = Static<
  typeof ActionRowComponentForMessageRequestSchema
>

export const TextInputStyleTypesSchema = Type.Union(
  [
    Type.Literal(1, { description: 'Single-line input' }),
    Type.Literal(2, { description: 'Multi-line input' }),
  ],
  { ref: 'TextInputStyleTypes' },
)

export type TextInputStyleTypes = Static<typeof TextInputStyleTypesSchema>

export const TextInputComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    style: TextInputStyleTypesSchema,
    label: Type.Optional(Type.Union([Type.String({ minLength: 1, maxLength: 45 }), Type.Null()])),
    value: Type.Optional(Type.Union([Type.String({ maxLength: 4000 }), Type.Null()])),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    min_length: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 4000 }), Type.Null()]),
    ),
    max_length: Type.Optional(
      Type.Union([Type.Integer({ minimum: 1, maximum: 4000 }), Type.Null()]),
    ),
  },
  { ref: 'TextInputComponentForModalRequest' },
)

export type TextInputComponentForModalRequest = Static<
  typeof TextInputComponentForModalRequestSchema
>

export const ActionRowComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    components: Type.Array(TextInputComponentForModalRequestSchema, { minItems: 1, maxItems: 5 }),
  },
  { ref: 'ActionRowComponentForModalRequest' },
)

export type ActionRowComponentForModalRequest = Static<
  typeof ActionRowComponentForModalRequestSchema
>

export const ComponentEmojiResponseSchema = Type.Object(
  {
    id: Type.Optional(SnowflakeTypeSchema),
    name: Type.String(),
    animated: Type.Optional(Type.Boolean()),
  },
  { ref: 'ComponentEmojiResponse' },
)

export type ComponentEmojiResponse = Static<typeof ComponentEmojiResponseSchema>

export const ButtonComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    custom_id: Type.Optional(Type.String()),
    style: ButtonStyleTypesSchema,
    label: Type.Optional(Type.String()),
    disabled: Type.Optional(Type.Boolean()),
    emoji: Type.Optional(ComponentEmojiResponseSchema),
    url: Type.Optional(Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()])),
    sku_id: Type.Optional(SnowflakeTypeSchema),
  },
  { ref: 'ButtonComponentResponse' },
)

export type ButtonComponentResponse = Static<typeof ButtonComponentResponseSchema>

export const ChannelSelectDefaultValueResponseSchema = Type.Object(
  { type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema },
  { ref: 'ChannelSelectDefaultValueResponse' },
)

export type ChannelSelectDefaultValueResponse = Static<
  typeof ChannelSelectDefaultValueResponseSchema
>

export const ChannelSelectComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    custom_id: Type.String(),
    placeholder: Type.Optional(Type.String()),
    min_values: Type.Integer(),
    max_values: Type.Integer(),
    disabled: Type.Optional(Type.Boolean()),
    channel_types: Type.Optional(Type.Array(ChannelTypesSchema, { uniqueItems: true })),
    default_values: Type.Optional(Type.Array(ChannelSelectDefaultValueResponseSchema)),
  },
  { ref: 'ChannelSelectComponentResponse' },
)

export type ChannelSelectComponentResponse = Static<typeof ChannelSelectComponentResponseSchema>

export const RoleSelectDefaultValueResponseSchema = Type.Object(
  { type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema },
  { ref: 'RoleSelectDefaultValueResponse' },
)

export type RoleSelectDefaultValueResponse = Static<typeof RoleSelectDefaultValueResponseSchema>

export const UserSelectDefaultValueResponseSchema = Type.Object(
  { type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema },
  { ref: 'UserSelectDefaultValueResponse' },
)

export type UserSelectDefaultValueResponse = Static<typeof UserSelectDefaultValueResponseSchema>

export const MentionableSelectComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    custom_id: Type.String(),
    placeholder: Type.Optional(Type.String()),
    min_values: Type.Integer(),
    max_values: Type.Integer(),
    disabled: Type.Optional(Type.Boolean()),
    default_values: Type.Optional(
      Type.Array(
        Type.Union([RoleSelectDefaultValueResponseSchema, UserSelectDefaultValueResponseSchema]),
      ),
    ),
  },
  { ref: 'MentionableSelectComponentResponse' },
)

export type MentionableSelectComponentResponse = Static<
  typeof MentionableSelectComponentResponseSchema
>

export const RoleSelectComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    custom_id: Type.String(),
    placeholder: Type.Optional(Type.String()),
    min_values: Type.Integer(),
    max_values: Type.Integer(),
    disabled: Type.Optional(Type.Boolean()),
    default_values: Type.Optional(Type.Array(RoleSelectDefaultValueResponseSchema)),
  },
  { ref: 'RoleSelectComponentResponse' },
)

export type RoleSelectComponentResponse = Static<typeof RoleSelectComponentResponseSchema>

export const StringSelectOptionResponseSchema = Type.Object(
  {
    label: Type.String(),
    value: Type.String(),
    description: Type.Optional(Type.String()),
    emoji: Type.Optional(ComponentEmojiResponseSchema),
    default: Type.Optional(Type.Boolean()),
  },
  { ref: 'StringSelectOptionResponse' },
)

export type StringSelectOptionResponse = Static<typeof StringSelectOptionResponseSchema>

export const StringSelectComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    custom_id: Type.String(),
    placeholder: Type.Optional(Type.String()),
    min_values: Type.Integer(),
    max_values: Type.Integer(),
    disabled: Type.Optional(Type.Boolean()),
    options: Type.Array(StringSelectOptionResponseSchema),
  },
  { ref: 'StringSelectComponentResponse' },
)

export type StringSelectComponentResponse = Static<typeof StringSelectComponentResponseSchema>

export const TextInputComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    custom_id: Type.String(),
    style: TextInputStyleTypesSchema,
    label: Type.Union([Type.String(), Type.Null()]),
    value: Type.Optional(Type.String()),
    placeholder: Type.Optional(Type.String()),
    required: Type.Optional(Type.Boolean()),
    min_length: Type.Union([Type.Integer(), Type.Null()]),
    max_length: Type.Union([Type.Integer(), Type.Null()]),
  },
  { ref: 'TextInputComponentResponse' },
)

export type TextInputComponentResponse = Static<typeof TextInputComponentResponseSchema>

export const UserSelectComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    custom_id: Type.String(),
    placeholder: Type.Optional(Type.String()),
    min_values: Type.Integer(),
    max_values: Type.Integer(),
    disabled: Type.Optional(Type.Boolean()),
    default_values: Type.Optional(Type.Array(UserSelectDefaultValueResponseSchema)),
  },
  { ref: 'UserSelectComponentResponse' },
)

export type UserSelectComponentResponse = Static<typeof UserSelectComponentResponseSchema>

export const ActionRowComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    components: Type.Array(
      Type.Union([
        ButtonComponentResponseSchema,
        ChannelSelectComponentResponseSchema,
        MentionableSelectComponentResponseSchema,
        RoleSelectComponentResponseSchema,
        StringSelectComponentResponseSchema,
        TextInputComponentResponseSchema,
        UserSelectComponentResponseSchema,
      ]),
    ),
  },
  { ref: 'ActionRowComponentResponse' },
)

export type ActionRowComponentResponse = Static<typeof ActionRowComponentResponseSchema>

export const ActionTypesSchema = Type.Union(
  [
    Type.Literal('TYPING_START', { description: 'User started typing in a channel' }),
    Type.Literal('INVITE_CREATE', { description: 'Invite to a channel was created' }),
    Type.Literal('INVITE_DELETE', { description: 'Invite to a channel was deleted' }),
    Type.Literal('WEBHOOKS_UPDATE', {
      description: 'Guild channel webhook was created, updated, or deleted',
    }),
    Type.Literal('CHANNEL_CREATE', { description: 'New guild channel created' }),
    Type.Literal('VOICE_CHANNEL_STATUS_UPDATE', {
      description: 'Voice channel status was updated',
    }),
    Type.Literal('CHANNEL_UPDATE', { description: 'Channel was updated' }),
    Type.Literal('CHANNEL_DELETE', { description: 'Channel was deleted' }),
    Type.Literal('CHANNEL_PINS_UPDATE', { description: 'Message was pinned or unpinned' }),
    Type.Literal('THREAD_CREATE', {
      description: 'Thread created, also sent when being added to a private thread',
    }),
    Type.Literal('THREAD_UPDATE', { description: 'Thread was updated' }),
    Type.Literal('THREAD_DELETE', { description: 'Thread was deleted' }),
    Type.Literal('THREAD_LIST_SYNC', {
      description:
        'Sent when gaining access to a channel, contains all active threads in that channel',
    }),
    Type.Literal('THREAD_MEMBER_UPDATE', {
      description: 'Thread member for the current user was updated',
    }),
    Type.Literal('THREAD_MEMBERS_UPDATE', {
      description: 'Some user(s) were added to or removed from a thread',
    }),
    Type.Literal('GUILD_CREATE', {
      description:
        'Lazy-load for unavailable guild, guild became available, or user joined a new guild',
    }),
    Type.Literal('GUILD_UPDATE', { description: 'Guild was updated' }),
    Type.Literal('GUILD_DELETE', {
      description: 'Guild became unavailable, or user left/was removed from a guild',
    }),
    Type.Literal('GUILD_EMOJIS_UPDATE', { description: 'Guild emojis were updated' }),
    Type.Literal('GUILD_STICKERS_UPDATE', { description: 'Guild stickers were updated' }),
    Type.Literal('GUILD_INTEGRATIONS_UPDATE', { description: 'Guild integration was updated' }),
    Type.Literal('GUILD_MEMBER_ADD', { description: 'New user joined a guild' }),
    Type.Literal('GUILD_MEMBER_UPDATE', { description: 'Guild member was updated' }),
    Type.Literal('GUILD_MEMBER_REMOVE', { description: 'User was removed from a guild' }),
    Type.Literal('GUILD_BAN_ADD', { description: 'User was banned from a guild' }),
    Type.Literal('GUILD_BAN_REMOVE', { description: 'User was unbanned from a guild' }),
    Type.Literal('GUILD_ROLE_CREATE', { description: 'Guild role was created' }),
    Type.Literal('GUILD_ROLE_UPDATE', { description: 'Guild role was updated' }),
    Type.Literal('GUILD_ROLE_DELETE', { description: 'Guild role was deleted' }),
    Type.Literal('GUILD_MEMBERS_CHUNK', { description: 'Response to Request Guild Members' }),
    Type.Literal('MESSAGE_CREATE', { description: 'Message was created' }),
    Type.Literal('MESSAGE_UPDATE', { description: 'Message was edited' }),
    Type.Literal('MESSAGE_DELETE', { description: 'Message was deleted' }),
    Type.Literal('MESSAGE_DELETE_BULK', { description: 'Multiple messages were deleted at once' }),
    Type.Literal('MESSAGE_REACTION_ADD', { description: 'User reacted to a message' }),
    Type.Literal('MESSAGE_REACTION_REMOVE', {
      description: 'User removed a reaction from a message',
    }),
    Type.Literal('MESSAGE_REACTION_REMOVE_ALL', {
      description: 'All reactions were explicitly removed from a message',
    }),
    Type.Literal('MESSAGE_REACTION_REMOVE_EMOJI', {
      description: 'All reactions for a given emoji were explicitly removed from a message',
    }),
    Type.Literal('USER_UPDATE', { description: 'Properties about the user changed' }),
    Type.Literal('ENTITLEMENT_CREATE', { description: 'Entitlement was created' }),
    Type.Literal('ENTITLEMENT_UPDATE', { description: 'Entitlement was updated' }),
    Type.Literal('ENTITLEMENT_DELETE', { description: 'Entitlement was deleted' }),
    Type.Literal('READY', { description: 'Contains the initial state information' }),
    Type.Literal('RESUMED', { description: 'Response to Resume' }),
    Type.Literal('PRESENCE_UPDATE', { description: 'User was updated' }),
    Type.Literal('VOICE_STATE_UPDATE', {
      description: 'Someone joined, left, or moved a voice channel',
    }),
    Type.Literal('VOICE_SERVER_UPDATE', { description: "Guild's voice server was updated" }),
    Type.Literal('LOBBY_MESSAGE_CREATE', {
      description: 'Sent when a message is created in a lobby',
    }),
    Type.Literal('LOBBY_MESSAGE_UPDATE', {
      description: 'Sent when a message is updated in a lobby',
    }),
    Type.Literal('LOBBY_MESSAGE_DELETE', {
      description: 'Sent when a message is deleted from a lobby',
    }),
    Type.Literal('GAME_DIRECT_MESSAGE_CREATE', {
      description: 'Sent when a direct message is created during an active Social SDK session',
    }),
    Type.Literal('GAME_DIRECT_MESSAGE_DELETE', {
      description: 'Sent when a direct message is deleted during an active Social SDK session',
    }),
    Type.Literal('GAME_DIRECT_MESSAGE_UPDATE', {
      description: 'Sent when a direct message is updated during an active Social SDK session',
    }),
    Type.Literal('INTERACTION_CREATE', {
      description: 'User used an interaction, such as an Application Command',
    }),
    Type.Literal('INTEGRATION_CREATE', { description: 'Guild integration was created' }),
    Type.Literal('INTEGRATION_UPDATE', { description: 'Guild integration was updated' }),
    Type.Literal('INTEGRATION_DELETE', { description: 'Guild integration was deleted' }),
    Type.Literal('APPLICATION_COMMAND_PERMISSIONS_UPDATE', {
      description: 'Application command permission was updated',
    }),
    Type.Literal('APPLICATION_AUTHORIZED', {
      description: 'Sent when an app was authorized by a user to a server or their account',
    }),
    Type.Literal('APPLICATION_DEAUTHORIZED', {
      description: 'Sent when an app was deauthorized by a user',
    }),
    Type.Literal('STAGE_INSTANCE_CREATE', { description: 'Stage instance was created' }),
    Type.Literal('STAGE_INSTANCE_UPDATE', { description: 'Stage instance was updated' }),
    Type.Literal('STAGE_INSTANCE_DELETE', { description: 'Stage instance was deleted or closed' }),
    Type.Literal('GUILD_AUDIT_LOG_ENTRY_CREATE', {
      description: 'A guild audit log entry was created',
    }),
    Type.Literal('GUILD_SCHEDULED_EVENT_CREATE', {
      description: 'Guild scheduled event was created',
    }),
    Type.Literal('GUILD_SCHEDULED_EVENT_UPDATE', {
      description: 'Guild scheduled event was updated',
    }),
    Type.Literal('GUILD_SCHEDULED_EVENT_DELETE', {
      description: 'Guild scheduled event was deleted',
    }),
    Type.Literal('GUILD_SCHEDULED_EVENT_USER_ADD', {
      description: 'User subscribed to a guild scheduled event',
    }),
    Type.Literal('GUILD_SCHEDULED_EVENT_USER_REMOVE', {
      description: 'User unsubscribed from a guild scheduled event',
    }),
    Type.Literal('AUTO_MODERATION_RULE_CREATE', {
      description: 'Auto Moderation rule was created',
    }),
    Type.Literal('AUTO_MODERATION_RULE_UPDATE', {
      description: 'Auto Moderation rule was updated',
    }),
    Type.Literal('AUTO_MODERATION_RULE_DELETE', {
      description: 'Auto Moderation rule was deleted',
    }),
    Type.Literal('AUTO_MODERATION_ACTION_EXECUTION', {
      description:
        'Auto Moderation rule was triggered and an action was executed (.e.g. a message was blocked)',
    }),
    Type.Literal('GUILD_SOUNDBOARD_SOUNDS_UPDATE'),
    Type.Literal('GUILD_SOUNDBOARD_SOUND_CREATE'),
    Type.Literal('GUILD_SOUNDBOARD_SOUND_UPDATE'),
    Type.Literal('GUILD_SOUNDBOARD_SOUND_DELETE'),
    Type.Literal('QUEST_USER_ENROLLMENT', {
      description: 'User was added to a Quest (currently unavailable)',
    }),
    Type.Literal('RATE_LIMITED'),
  ],
  { ref: 'ActionTypes' },
)

export type ActionTypes = Static<typeof ActionTypesSchema>

export const ApplicationTypesSchema = Type.Union([Type.Literal(4)], { ref: 'ApplicationTypes' })

export type ApplicationTypes = Static<typeof ApplicationTypesSchema>

export const Int53TypeSchema = Type.Integer({
  ref: 'Int53Type',
  minimum: -9007199254740991,
  maximum: 9007199254740991,
})

export type Int53Type = Static<typeof Int53TypeSchema>

export const UserAvatarDecorationResponseSchema = Type.Object(
  {
    asset: Type.String({ description: 'the avatar decoration hash' }),
    sku_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description: "id of the avatar decoration's SKU",
    }),
  },
  { ref: 'UserAvatarDecorationResponse' },
)

export type UserAvatarDecorationResponse = Static<typeof UserAvatarDecorationResponseSchema>

export const NameplatePaletteSchema = Type.Union(
  [
    Type.Literal('crimson', { description: 'Crimson color palette' }),
    Type.Literal('berry', { description: 'Berry color palette' }),
    Type.Literal('sky', { description: 'Sky color palette' }),
    Type.Literal('teal', { description: 'Teal color palette' }),
    Type.Literal('forest', { description: 'Forest color palette' }),
    Type.Literal('bubble_gum', { description: 'Bubble gum color palette' }),
    Type.Literal('violet', { description: 'Violet color palette' }),
    Type.Literal('cobalt', { description: 'Cobalt color palette' }),
    Type.Literal('clover', { description: 'Clover color palette' }),
    Type.Literal('lemon', { description: 'Lemon color palette' }),
    Type.Literal('white', { description: 'White color palette' }),
    Type.Literal('black', { description: 'Black color palette' }),
  ],
  { ref: 'NameplatePalette' },
)

export type NameplatePalette = Static<typeof NameplatePaletteSchema>

export const UserNameplateResponseSchema = Type.Object(
  {
    sku_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description: 'ID of the nameplate SKU',
    }),
    asset: Type.String({ description: 'Path to the nameplate asset' }),
    label: Type.String({ description: 'The label of this nameplate. Currently unused' }),
    palette: NameplatePaletteSchema,
  },
  { ref: 'UserNameplateResponse' },
)

export type UserNameplateResponse = Static<typeof UserNameplateResponseSchema>

export const UserCollectiblesResponseSchema = Type.Object(
  {
    nameplate: Type.Union([Type.Null(), UserNameplateResponseSchema], {
      description: 'Object mapping of nameplate data',
    }),
  },
  { ref: 'UserCollectiblesResponse' },
)

export type UserCollectiblesResponse = Static<typeof UserCollectiblesResponseSchema>

export const UserPrimaryGuildResponseSchema = Type.Object(
  {
    identity_guild_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description: "the id of the user's primary guild",
    }),
    identity_enabled: Type.Union([
      Type.Boolean({
        description: "whether the user is displaying the primary guild's server tag",
      }),
      Type.Null(),
    ]),
    tag: Type.Union([
      Type.String({ description: "the text of the user's server tag, limited to 4 characters" }),
      Type.Null(),
    ]),
    badge: Type.Union([Type.String({ description: 'the server tag badge hash' }), Type.Null()]),
  },
  { ref: 'UserPrimaryGuildResponse' },
)

export type UserPrimaryGuildResponse = Static<typeof UserPrimaryGuildResponseSchema>

export const UserResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    username: Type.String({ description: "the user's username, not unique across the platform" }),
    avatar: Type.Union([Type.String({ description: "the user's avatar hash" }), Type.Null()]),
    discriminator: Type.String({ description: "the user's Discord-tag" }),
    public_flags: Type.Integer({ description: "the public flags on a user's account" }),
    flags: Int53TypeSchema,
    bot: Type.Optional(
      Type.Boolean({ description: 'whether the user belongs to an OAuth2 application' }),
    ),
    system: Type.Optional(
      Type.Boolean({
        description:
          'whether the user is an Official Discord System user (part of the urgent message system)',
      }),
    ),
    banner: Type.Optional(
      Type.Union([Type.String({ description: "the user's banner hash" }), Type.Null()]),
    ),
    accent_color: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            "the user's banner color encoded as an integer representation of hexadecimal color code",
        }),
        Type.Null(),
      ]),
    ),
    global_name: Type.Union([
      Type.String({ description: "the user's display name, if it is set" }),
      Type.Null(),
    ]),
    avatar_decoration_data: Type.Optional(
      Type.Union([Type.Null(), UserAvatarDecorationResponseSchema], {
        description: "data for the user's avatar decoration",
      }),
    ),
    collectibles: Type.Optional(
      Type.Union([Type.Null(), UserCollectiblesResponseSchema], {
        description: "data for the user's collectibles",
      }),
    ),
    primary_guild: Type.Union([Type.Null(), UserPrimaryGuildResponseSchema], {
      description: "the user's primary guild",
    }),
  },
  { ref: 'UserResponse' },
)

export type UserResponse = Static<typeof UserResponseSchema>

export const OAuth2ScopesSchema = Type.Union(
  [
    Type.Literal('identify', { description: 'allows /users/@me without email' }),
    Type.Literal('email', { description: 'enables /users/@me to return an email' }),
    Type.Literal('connections', {
      description: 'allows /users/@me/connections to return linked third-party accounts',
    }),
    Type.Literal('guilds', {
      description:
        "allows /users/@me/guilds to return basic information about all of a user's guilds",
    }),
    Type.Literal('guilds.join', {
      description:
        'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
    }),
    Type.Literal('guilds.members.read', {
      description:
        "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
    }),
    Type.Literal('gdm.join', { description: 'allows your app to join users to a group dm' }),
    Type.Literal('bot', {
      description: "for oauth2 bots, this puts the bot in the user's selected guild by default",
    }),
    Type.Literal('rpc', {
      description:
        "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
    }),
    Type.Literal('rpc.notifications.read', {
      description:
        'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
    }),
    Type.Literal('rpc.voice.read', {
      description:
        "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
    }),
    Type.Literal('rpc.voice.write', {
      description:
        "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
    }),
    Type.Literal('rpc.video.read', {
      description:
        "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
    }),
    Type.Literal('rpc.video.write', {
      description:
        "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
    }),
    Type.Literal('rpc.screenshare.read', {
      description:
        "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
    }),
    Type.Literal('rpc.screenshare.write', {
      description:
        "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
    }),
    Type.Literal('rpc.activities.write', {
      description:
        "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
    }),
    Type.Literal('webhook.incoming', {
      description:
        'this generates a webhook that is returned in the oauth token response for authorization code grants',
    }),
    Type.Literal('messages.read', {
      description:
        'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
    }),
    Type.Literal('applications.builds.upload', {
      description:
        "allows your app to upload/update builds for a user's applications - requires Discord approval",
    }),
    Type.Literal('applications.builds.read', {
      description: "allows your app to read build data for a user's applications",
    }),
    Type.Literal('applications.commands', {
      description: 'allows your app to use commands in a guild',
    }),
    Type.Literal('applications.commands.permissions.update', {
      description:
        'allows your app to update permissions for its commands in a guild a user has permissions to',
    }),
    Type.Literal('applications.commands.update', {
      description:
        'allows your app to update its commands using a Bearer token - client credentials grant only',
    }),
    Type.Literal('applications.store.update', {
      description:
        "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
    }),
    Type.Literal('applications.entitlements', {
      description: "allows your app to read entitlements for a user's applications",
    }),
    Type.Literal('activities.read', {
      description:
        'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
    }),
    Type.Literal('activities.write', {
      description:
        "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
    }),
    Type.Literal('activities.invites.write', {
      description:
        'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
    }),
    Type.Literal('relationships.read', {
      description:
        "allows your app to know a user's friends and implicit relationships - requires Discord approval",
    }),
    Type.Literal('voice', {
      description:
        "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
    }),
    Type.Literal('dm_channels.read', {
      description:
        "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
    }),
    Type.Literal('role_connections.write', {
      description: "allows your app to update a user's connection and metadata for the app",
    }),
    Type.Literal('openid', {
      description:
        'for OpenID Connect, this allows your app to receive user id and basic profile information',
    }),
  ],
  { ref: 'OAuth2Scopes' },
)

export type OAuth2Scopes = Static<typeof OAuth2ScopesSchema>

export const ApplicationOAuth2InstallParamsResponseSchema = Type.Object(
  { scopes: Type.Array(OAuth2ScopesSchema, { uniqueItems: true }), permissions: Type.String() },
  { ref: 'ApplicationOAuth2InstallParamsResponse' },
)

export type ApplicationOAuth2InstallParamsResponse = Static<
  typeof ApplicationOAuth2InstallParamsResponseSchema
>

export const ApplicationIntegrationTypeConfigurationResponseSchema = Type.Object(
  { oauth2_install_params: Type.Optional(ApplicationOAuth2InstallParamsResponseSchema) },
  { ref: 'ApplicationIntegrationTypeConfigurationResponse' },
)

export type ApplicationIntegrationTypeConfigurationResponse = Static<
  typeof ApplicationIntegrationTypeConfigurationResponseSchema
>

export const ApplicationResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    icon: Type.Union([Type.String(), Type.Null()]),
    description: Type.String(),
    type: Type.Union([Type.Null(), ApplicationTypesSchema]),
    cover_image: Type.Optional(Type.String()),
    primary_sku_id: Type.Optional(SnowflakeTypeSchema),
    flags: Type.Integer(),
    flags_new: Type.String(),
    bot: Type.Optional(UserResponseSchema),
    slug: Type.Optional(Type.String()),
    conjure_project_id: Type.Optional(SnowflakeTypeSchema),
    vibegrations_project_id: Type.Optional(SnowflakeTypeSchema),
    guild_id: Type.Optional(SnowflakeTypeSchema),
    rpc_origins: Type.Optional(Type.Array(Type.String())),
    bot_public: Type.Optional(Type.Boolean()),
    bot_require_code_grant: Type.Optional(Type.Boolean()),
    terms_of_service_url: Type.Optional(Type.String({ format: 'uri' })),
    privacy_policy_url: Type.Optional(Type.String({ format: 'uri' })),
    custom_install_url: Type.Optional(Type.String({ format: 'uri' })),
    install_params: Type.Optional(ApplicationOAuth2InstallParamsResponseSchema),
    integration_types_config: Type.Optional(
      Type.Record(Type.String(), ApplicationIntegrationTypeConfigurationResponseSchema),
    ),
    verify_key: Type.String(),
    max_participants: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    tags: Type.Optional(Type.Array(Type.String(), { uniqueItems: true })),
  },
  { ref: 'ApplicationResponse' },
)

export type ApplicationResponse = Static<typeof ApplicationResponseSchema>

export const AttachmentResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    filename: Type.String(),
    size: Type.Integer(),
    url: Type.String({ format: 'uri' }),
    proxy_url: Type.String({ format: 'uri' }),
    width: Type.Optional(Type.Integer()),
    height: Type.Optional(Type.Integer()),
    duration_secs: Type.Optional(Type.Number()),
    waveform: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    content_type: Type.Optional(Type.String()),
    ephemeral: Type.Optional(Type.Boolean()),
    flags: Type.Optional(Type.Integer()),
    placeholder: Type.Optional(Type.String()),
    placeholder_version: Type.Optional(Type.Integer()),
    title: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    application: Type.Optional(ApplicationResponseSchema),
    clip_created_at: Type.Optional(Type.String({ format: 'date-time' })),
    clip_participants: Type.Optional(Type.Array(UserResponseSchema)),
  },
  { ref: 'AttachmentResponse' },
)

export type AttachmentResponse = Static<typeof AttachmentResponseSchema>

export const ActivitiesAttachmentResponseSchema = Type.Object(
  { attachment: AttachmentResponseSchema },
  { ref: 'ActivitiesAttachmentResponse' },
)

export type ActivitiesAttachmentResponse = Static<typeof ActivitiesAttachmentResponseSchema>

export const ActivityActionTypesSchema = Type.Union(
  [Type.Literal(1), Type.Literal(2), Type.Literal(3), Type.Literal(5), Type.Literal(6)],
  { ref: 'ActivityActionTypes' },
)

export type ActivityActionTypes = Static<typeof ActivityActionTypesSchema>

export const ActivityInstanceCallbackResponseSchema = Type.Object(
  { id: Type.String() },
  { ref: 'ActivityInstanceCallbackResponse' },
)

export type ActivityInstanceCallbackResponse = Static<typeof ActivityInstanceCallbackResponseSchema>

export const AfkTimeoutsSchema = Type.Union(
  [Type.Literal(60), Type.Literal(300), Type.Literal(900), Type.Literal(1800), Type.Literal(3600)],
  { ref: 'AfkTimeouts' },
)

export type AfkTimeouts = Static<typeof AfkTimeoutsSchema>

export const AllowedMentionTypesSchema = Type.Union(
  [
    Type.Literal('users', { description: 'Controls role mentions' }),
    Type.Literal('roles', { description: 'Controls user mentions' }),
    Type.Literal('everyone', { description: 'Controls @everyone and @here mentions' }),
  ],
  { ref: 'AllowedMentionTypes' },
)

export type AllowedMentionTypes = Static<typeof AllowedMentionTypesSchema>

export const ApplicationCommandOptionTypeSchema = Type.Union(
  [
    Type.Literal(1, { description: 'A sub-action within a command or group' }),
    Type.Literal(2, { description: 'A group of subcommands' }),
    Type.Literal(3, { description: 'A string option' }),
    Type.Literal(4, {
      description: 'An integer option. Any integer between -2^53 and 2^53 is a valid value',
    }),
    Type.Literal(5, { description: 'A boolean option' }),
    Type.Literal(6, { description: 'A snowflake option that represents a User' }),
    Type.Literal(7, {
      description:
        'A snowflake option that represents a Channel. Includes all channel types and categories',
    }),
    Type.Literal(8, { description: 'A snowflake option that represents a Role' }),
    Type.Literal(9, { description: 'A snowflake option that represents anything you can mention' }),
    Type.Literal(10, {
      description: 'A number option. Any double between -2^53 and 2^53 is a valid value',
    }),
    Type.Literal(11, { description: 'An attachment option' }),
  ],
  { ref: 'ApplicationCommandOptionType' },
)

export type ApplicationCommandOptionType = Static<typeof ApplicationCommandOptionTypeSchema>

export const ApplicationCommandAttachmentOptionSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.String({ minLength: 1, maxLength: 100 }),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    file_types: Type.Optional(
      Type.Union([
        Type.Array(Type.String({ minLength: 1, maxLength: 16 }), {
          maxItems: 10,
          uniqueItems: true,
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'ApplicationCommandAttachmentOption' },
)

export type ApplicationCommandAttachmentOption = Static<
  typeof ApplicationCommandAttachmentOptionSchema
>

export const ApplicationCommandAttachmentOptionResponseSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localized: Type.Optional(Type.String()),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    required: Type.Optional(Type.Boolean()),
    file_types: Type.Optional(Type.Array(Type.String({ maxLength: 16 }), { uniqueItems: true })),
  },
  { ref: 'ApplicationCommandAttachmentOptionResponse' },
)

export type ApplicationCommandAttachmentOptionResponse = Static<
  typeof ApplicationCommandAttachmentOptionResponseSchema
>

export const InteractionCallbackTypesSchema = Type.Union(
  [
    Type.Literal(1),
    Type.Literal(4),
    Type.Literal(5),
    Type.Literal(6),
    Type.Literal(7),
    Type.Literal(8),
    Type.Literal(9),
    Type.Literal(12),
    Type.Literal(13),
  ],
  { ref: 'InteractionCallbackTypes' },
)

export type InteractionCallbackTypes = Static<typeof InteractionCallbackTypesSchema>

export const ApplicationCommandOptionIntegerChoiceSchema = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: 100 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    value: Int53TypeSchema,
  },
  { ref: 'ApplicationCommandOptionIntegerChoice' },
)

export type ApplicationCommandOptionIntegerChoice = Static<
  typeof ApplicationCommandOptionIntegerChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema = Type.Object(
  {
    choices: Type.Optional(
      Type.Union([
        Type.Array(Type.Union([Type.Null(), ApplicationCommandOptionIntegerChoiceSchema]), {
          maxItems: 25,
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'InteractionApplicationCommandAutocompleteCallbackIntegerData' },
)

export type InteractionApplicationCommandAutocompleteCallbackIntegerData = Static<
  typeof InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema
>

export const ApplicationCommandOptionNumberChoiceSchema = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: 100 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    value: Type.Number(),
  },
  { ref: 'ApplicationCommandOptionNumberChoice' },
)

export type ApplicationCommandOptionNumberChoice = Static<
  typeof ApplicationCommandOptionNumberChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackNumberDataSchema = Type.Object(
  {
    choices: Type.Optional(
      Type.Union([
        Type.Array(Type.Union([Type.Null(), ApplicationCommandOptionNumberChoiceSchema]), {
          maxItems: 25,
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'InteractionApplicationCommandAutocompleteCallbackNumberData' },
)

export type InteractionApplicationCommandAutocompleteCallbackNumberData = Static<
  typeof InteractionApplicationCommandAutocompleteCallbackNumberDataSchema
>

export const ApplicationCommandOptionStringChoiceSchema = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: 100 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    value: Type.String({ maxLength: 6000 }),
  },
  { ref: 'ApplicationCommandOptionStringChoice' },
)

export type ApplicationCommandOptionStringChoice = Static<
  typeof ApplicationCommandOptionStringChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackStringDataSchema = Type.Object(
  {
    choices: Type.Optional(
      Type.Union([
        Type.Array(Type.Union([Type.Null(), ApplicationCommandOptionStringChoiceSchema]), {
          maxItems: 25,
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'InteractionApplicationCommandAutocompleteCallbackStringData' },
)

export type InteractionApplicationCommandAutocompleteCallbackStringData = Static<
  typeof InteractionApplicationCommandAutocompleteCallbackStringDataSchema
>

export const ApplicationCommandAutocompleteCallbackRequestSchema = Type.Object(
  {
    type: InteractionCallbackTypesSchema,
    data: Type.Union([
      InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema,
      InteractionApplicationCommandAutocompleteCallbackNumberDataSchema,
      InteractionApplicationCommandAutocompleteCallbackStringDataSchema,
    ]),
  },
  { ref: 'ApplicationCommandAutocompleteCallbackRequest' },
)

export type ApplicationCommandAutocompleteCallbackRequest = Static<
  typeof ApplicationCommandAutocompleteCallbackRequestSchema
>

export const ApplicationCommandBooleanOptionSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.String({ minLength: 1, maxLength: 100 }),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'ApplicationCommandBooleanOption' },
)

export type ApplicationCommandBooleanOption = Static<typeof ApplicationCommandBooleanOptionSchema>

export const ApplicationCommandBooleanOptionResponseSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localized: Type.Optional(Type.String()),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    required: Type.Optional(Type.Boolean()),
  },
  { ref: 'ApplicationCommandBooleanOptionResponse' },
)

export type ApplicationCommandBooleanOptionResponse = Static<
  typeof ApplicationCommandBooleanOptionResponseSchema
>

export const ApplicationCommandChannelOptionSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.String({ minLength: 1, maxLength: 100 }),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    channel_types: Type.Optional(
      Type.Union([Type.Array(ChannelTypesSchema, { uniqueItems: true }), Type.Null()]),
    ),
  },
  { ref: 'ApplicationCommandChannelOption' },
)

export type ApplicationCommandChannelOption = Static<typeof ApplicationCommandChannelOptionSchema>

export const ApplicationCommandChannelOptionResponseSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localized: Type.Optional(Type.String()),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    required: Type.Optional(Type.Boolean()),
    channel_types: Type.Optional(Type.Array(ChannelTypesSchema, { uniqueItems: true })),
  },
  { ref: 'ApplicationCommandChannelOptionResponse' },
)

export type ApplicationCommandChannelOptionResponse = Static<
  typeof ApplicationCommandChannelOptionResponseSchema
>

export const ApplicationCommandIntegerOptionSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.String({ minLength: 1, maxLength: 100 }),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    autocomplete: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    choices: Type.Optional(
      Type.Union([
        Type.Array(ApplicationCommandOptionIntegerChoiceSchema, { maxItems: 25 }),
        Type.Null(),
      ]),
    ),
    min_value: Type.Optional(Type.Union([Type.Null(), Int53TypeSchema])),
    max_value: Type.Optional(Type.Union([Type.Null(), Int53TypeSchema])),
  },
  { ref: 'ApplicationCommandIntegerOption' },
)

export type ApplicationCommandIntegerOption = Static<typeof ApplicationCommandIntegerOptionSchema>

export const ApplicationCommandMentionableOptionSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.String({ minLength: 1, maxLength: 100 }),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'ApplicationCommandMentionableOption' },
)

export type ApplicationCommandMentionableOption = Static<
  typeof ApplicationCommandMentionableOptionSchema
>

export const ApplicationCommandNumberOptionSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.String({ minLength: 1, maxLength: 100 }),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    autocomplete: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    choices: Type.Optional(
      Type.Union([
        Type.Array(ApplicationCommandOptionNumberChoiceSchema, { maxItems: 25 }),
        Type.Null(),
      ]),
    ),
    min_value: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
    max_value: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
  },
  { ref: 'ApplicationCommandNumberOption' },
)

export type ApplicationCommandNumberOption = Static<typeof ApplicationCommandNumberOptionSchema>

export const ApplicationCommandRoleOptionSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.String({ minLength: 1, maxLength: 100 }),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'ApplicationCommandRoleOption' },
)

export type ApplicationCommandRoleOption = Static<typeof ApplicationCommandRoleOptionSchema>

export const ApplicationCommandStringOptionSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.String({ minLength: 1, maxLength: 100 }),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    autocomplete: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    min_length: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 6000 }), Type.Null()]),
    ),
    max_length: Type.Optional(
      Type.Union([Type.Integer({ minimum: 1, maximum: 6000 }), Type.Null()]),
    ),
    choices: Type.Optional(
      Type.Union([
        Type.Array(ApplicationCommandOptionStringChoiceSchema, { maxItems: 25 }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'ApplicationCommandStringOption' },
)

export type ApplicationCommandStringOption = Static<typeof ApplicationCommandStringOptionSchema>

export const ApplicationCommandUserOptionSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.String({ minLength: 1, maxLength: 100 }),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'ApplicationCommandUserOption' },
)

export type ApplicationCommandUserOption = Static<typeof ApplicationCommandUserOptionSchema>

export const ApplicationCommandSubcommandOptionSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.String({ minLength: 1, maxLength: 100 }),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    options: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
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
        Type.Null(),
      ]),
    ),
  },
  { ref: 'ApplicationCommandSubcommandOption' },
)

export type ApplicationCommandSubcommandOption = Static<
  typeof ApplicationCommandSubcommandOptionSchema
>

export const ApplicationCommandSubcommandGroupOptionSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.String({ minLength: 1, maxLength: 100 }),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    options: Type.Optional(
      Type.Union([
        Type.Array(ApplicationCommandSubcommandOptionSchema, { maxItems: 25 }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'ApplicationCommandSubcommandGroupOption' },
)

export type ApplicationCommandSubcommandGroupOption = Static<
  typeof ApplicationCommandSubcommandGroupOptionSchema
>

export const InteractionContextTypeSchema = Type.Union(
  [
    Type.Literal(0, { description: 'This command can be used within a Guild.' }),
    Type.Literal(1, {
      description: "This command can be used within a DM with this application's bot.",
    }),
    Type.Literal(2, {
      description: 'This command can be used within DMs and Group DMs with users.',
    }),
  ],
  { ref: 'InteractionContextType' },
)

export type InteractionContextType = Static<typeof InteractionContextTypeSchema>

export const ApplicationIntegrationTypeSchema = Type.Union(
  [
    Type.Literal(0, { description: 'For Guild install.' }),
    Type.Literal(1, { description: 'For User install.' }),
  ],
  { ref: 'ApplicationIntegrationType' },
)

export type ApplicationIntegrationType = Static<typeof ApplicationIntegrationTypeSchema>

export const ApplicationCommandHandlerSchema = Type.Union(
  [
    Type.Literal(1, { description: 'The app handles the interaction using an interaction token' }),
    Type.Literal(2, {
      description:
        'Discord handles the interaction by launching an Activity and sending a follow-up message without coordinating with the app',
    }),
  ],
  { ref: 'ApplicationCommandHandler' },
)

export type ApplicationCommandHandler = Static<typeof ApplicationCommandHandlerSchema>

export const ApplicationCommandTypeSchema = Type.Union(
  [
    Type.Literal(1, {
      description: 'Slash commands; a text-based command that shows up when a user types /',
    }),
    Type.Literal(2, {
      description: 'A UI-based command that shows up when you right click or tap on a user',
    }),
    Type.Literal(3, {
      description: 'A UI-based command that shows up when you right click or tap on a message',
    }),
    Type.Literal(4, {
      description:
        'A command that represents the primary way to use an application (e.g. launching an Activity)',
    }),
  ],
  { ref: 'ApplicationCommandType' },
)

export type ApplicationCommandType = Static<typeof ApplicationCommandTypeSchema>

export const ApplicationCommandCreateRequestSchema = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    options: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
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
        Type.Null(),
      ]),
    ),
    default_member_permissions: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 18014398509481984 }), Type.Null()]),
    ),
    dm_permission: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    contexts: Type.Optional(
      Type.Union([
        Type.Array(InteractionContextTypeSchema, { minItems: 1, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    integration_types: Type.Optional(
      Type.Union([
        Type.Array(ApplicationIntegrationTypeSchema, { minItems: 1, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    handler: Type.Optional(
      Type.Union([Type.Null(), ApplicationCommandHandlerSchema], {
        description:
          "Determines whether the interaction is handled by the app's interactions handler or by Discord",
      }),
    ),
    type: Type.Optional(Type.Union([Type.Null(), ApplicationCommandTypeSchema])),
  },
  { ref: 'ApplicationCommandCreateRequest' },
)

export type ApplicationCommandCreateRequest = Static<typeof ApplicationCommandCreateRequestSchema>

export const ApplicationCommandOptionIntegerChoiceResponseSchema = Type.Object(
  {
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    value: Int53TypeSchema,
  },
  { ref: 'ApplicationCommandOptionIntegerChoiceResponse' },
)

export type ApplicationCommandOptionIntegerChoiceResponse = Static<
  typeof ApplicationCommandOptionIntegerChoiceResponseSchema
>

export const ApplicationCommandIntegerOptionResponseSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localized: Type.Optional(Type.String()),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    required: Type.Optional(Type.Boolean()),
    autocomplete: Type.Optional(Type.Boolean()),
    choices: Type.Optional(Type.Array(ApplicationCommandOptionIntegerChoiceResponseSchema)),
    min_value: Type.Optional(Int53TypeSchema),
    max_value: Type.Optional(Int53TypeSchema),
  },
  { ref: 'ApplicationCommandIntegerOptionResponse' },
)

export type ApplicationCommandIntegerOptionResponse = Static<
  typeof ApplicationCommandIntegerOptionResponseSchema
>

export const InteractionTypesSchema = Type.Union(
  [
    Type.Literal(1, {
      description: "Sent by Discord to validate your application's interaction handler",
    }),
    Type.Literal(2, { description: 'Sent when a user uses an application command' }),
    Type.Literal(3, {
      description:
        'Sent when a user interacts with a message component previously sent by your application',
    }),
    Type.Literal(4, {
      description: 'Sent when a user is filling in an autocomplete option in a chat command',
    }),
    Type.Literal(5, {
      description: 'Sent when a user submits a modal previously sent by your application',
    }),
    Type.Literal(6, {
      description: 'Sent when Discord is checking if a user can purchase a Social Layer SKU',
    }),
  ],
  { ref: 'InteractionTypes' },
)

export type InteractionTypes = Static<typeof InteractionTypesSchema>

export const ApplicationCommandInteractionMetadataResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    user: Type.Optional(UserResponseSchema),
    authorizing_integration_owners: Type.Record(Type.String(), SnowflakeTypeSchema),
    original_response_message_id: Type.Optional(SnowflakeTypeSchema),
    target_user: Type.Optional(UserResponseSchema),
    target_message_id: Type.Optional(SnowflakeTypeSchema),
  },
  { ref: 'ApplicationCommandInteractionMetadataResponse' },
)

export type ApplicationCommandInteractionMetadataResponse = Static<
  typeof ApplicationCommandInteractionMetadataResponseSchema
>

export const ApplicationCommandMentionableOptionResponseSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localized: Type.Optional(Type.String()),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    required: Type.Optional(Type.Boolean()),
  },
  { ref: 'ApplicationCommandMentionableOptionResponse' },
)

export type ApplicationCommandMentionableOptionResponse = Static<
  typeof ApplicationCommandMentionableOptionResponseSchema
>

export const ApplicationCommandOptionNumberChoiceResponseSchema = Type.Object(
  {
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    value: Type.Number(),
  },
  { ref: 'ApplicationCommandOptionNumberChoiceResponse' },
)

export type ApplicationCommandOptionNumberChoiceResponse = Static<
  typeof ApplicationCommandOptionNumberChoiceResponseSchema
>

export const ApplicationCommandNumberOptionResponseSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localized: Type.Optional(Type.String()),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    required: Type.Optional(Type.Boolean()),
    autocomplete: Type.Optional(Type.Boolean()),
    choices: Type.Optional(Type.Array(ApplicationCommandOptionNumberChoiceResponseSchema)),
    min_value: Type.Optional(Type.Number()),
    max_value: Type.Optional(Type.Number()),
  },
  { ref: 'ApplicationCommandNumberOptionResponse' },
)

export type ApplicationCommandNumberOptionResponse = Static<
  typeof ApplicationCommandNumberOptionResponseSchema
>

export const ApplicationCommandOptionStringChoiceResponseSchema = Type.Object(
  {
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    value: Type.String(),
  },
  { ref: 'ApplicationCommandOptionStringChoiceResponse' },
)

export type ApplicationCommandOptionStringChoiceResponse = Static<
  typeof ApplicationCommandOptionStringChoiceResponseSchema
>

export const ApplicationCommandPatchRequestPartialSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ minLength: 1, maxLength: 32 })),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    options: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
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
        Type.Null(),
      ]),
    ),
    default_member_permissions: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 18014398509481984 }), Type.Null()]),
    ),
    dm_permission: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    contexts: Type.Optional(
      Type.Union([
        Type.Array(InteractionContextTypeSchema, { minItems: 1, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    integration_types: Type.Optional(
      Type.Union([
        Type.Array(ApplicationIntegrationTypeSchema, { minItems: 1, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    handler: Type.Optional(
      Type.Union([Type.Null(), ApplicationCommandHandlerSchema], {
        description:
          "Determines whether the interaction is handled by the app's interactions handler or by Discord",
      }),
    ),
  },
  { ref: 'ApplicationCommandPatchRequestPartial' },
)

export type ApplicationCommandPatchRequestPartial = Static<
  typeof ApplicationCommandPatchRequestPartialSchema
>

export const ApplicationCommandPermissionTypeSchema = Type.Union(
  [
    Type.Literal(1, { description: 'This permission is for a role.' }),
    Type.Literal(2, { description: 'This permission is for a user.' }),
    Type.Literal(3, { description: 'This permission is for a channel.' }),
  ],
  { ref: 'ApplicationCommandPermissionType' },
)

export type ApplicationCommandPermissionType = Static<typeof ApplicationCommandPermissionTypeSchema>

export const ApplicationCommandPermissionSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: ApplicationCommandPermissionTypeSchema,
    permission: Type.Boolean(),
  },
  { ref: 'ApplicationCommandPermission' },
)

export type ApplicationCommandPermission = Static<typeof ApplicationCommandPermissionSchema>

export const ApplicationCommandRoleOptionResponseSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localized: Type.Optional(Type.String()),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    required: Type.Optional(Type.Boolean()),
  },
  { ref: 'ApplicationCommandRoleOptionResponse' },
)

export type ApplicationCommandRoleOptionResponse = Static<
  typeof ApplicationCommandRoleOptionResponseSchema
>

export const ApplicationCommandStringOptionResponseSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localized: Type.Optional(Type.String()),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    required: Type.Optional(Type.Boolean()),
    autocomplete: Type.Optional(Type.Boolean()),
    choices: Type.Optional(Type.Array(ApplicationCommandOptionStringChoiceResponseSchema)),
    min_length: Type.Optional(Type.Integer()),
    max_length: Type.Optional(Type.Integer()),
  },
  { ref: 'ApplicationCommandStringOptionResponse' },
)

export type ApplicationCommandStringOptionResponse = Static<
  typeof ApplicationCommandStringOptionResponseSchema
>

export const ApplicationCommandUserOptionResponseSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localized: Type.Optional(Type.String()),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    required: Type.Optional(Type.Boolean()),
  },
  { ref: 'ApplicationCommandUserOptionResponse' },
)

export type ApplicationCommandUserOptionResponse = Static<
  typeof ApplicationCommandUserOptionResponseSchema
>

export const ApplicationCommandSubcommandOptionResponseSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localized: Type.Optional(Type.String()),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    required: Type.Optional(Type.Boolean()),
    options: Type.Optional(
      Type.Array(
        Type.Union([
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
  },
  { ref: 'ApplicationCommandSubcommandOptionResponse' },
)

export type ApplicationCommandSubcommandOptionResponse = Static<
  typeof ApplicationCommandSubcommandOptionResponseSchema
>

export const ApplicationCommandSubcommandGroupOptionResponseSchema = Type.Object(
  {
    type: ApplicationCommandOptionTypeSchema,
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localized: Type.Optional(Type.String()),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    required: Type.Optional(Type.Boolean()),
    options: Type.Optional(Type.Array(ApplicationCommandSubcommandOptionResponseSchema)),
  },
  { ref: 'ApplicationCommandSubcommandGroupOptionResponse' },
)

export type ApplicationCommandSubcommandGroupOptionResponse = Static<
  typeof ApplicationCommandSubcommandGroupOptionResponseSchema
>

export const ApplicationCommandResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    application_id: SnowflakeTypeSchema,
    version: SnowflakeTypeSchema,
    default_member_permissions: Type.Union([Type.String(), Type.Null()]),
    type: ApplicationCommandTypeSchema,
    name: Type.String(),
    name_localized: Type.Optional(Type.String()),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localized: Type.Optional(Type.String()),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    guild_id: Type.Optional(SnowflakeTypeSchema),
    dm_permission: Type.Optional(Type.Boolean()),
    contexts: Type.Optional(
      Type.Union([Type.Array(InteractionContextTypeSchema, { uniqueItems: true }), Type.Null()]),
    ),
    integration_types: Type.Optional(
      Type.Array(ApplicationIntegrationTypeSchema, { uniqueItems: true }),
    ),
    options: Type.Optional(
      Type.Array(
        Type.Union([
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
    nsfw: Type.Optional(Type.Boolean()),
    handler: Type.Optional(ApplicationCommandHandlerSchema),
  },
  { ref: 'ApplicationCommandResponse' },
)

export type ApplicationCommandResponse = Static<typeof ApplicationCommandResponseSchema>

export const ApplicationCommandUpdateRequestSchema = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: 32 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 32 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 34,
        }),
        Type.Null(),
      ]),
    ),
    options: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
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
        Type.Null(),
      ]),
    ),
    default_member_permissions: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 18014398509481984 }), Type.Null()]),
    ),
    dm_permission: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    contexts: Type.Optional(
      Type.Union([
        Type.Array(InteractionContextTypeSchema, { minItems: 1, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    integration_types: Type.Optional(
      Type.Union([
        Type.Array(ApplicationIntegrationTypeSchema, { minItems: 1, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    handler: Type.Optional(
      Type.Union([Type.Null(), ApplicationCommandHandlerSchema], {
        description:
          "Determines whether the interaction is handled by the app's interactions handler or by Discord",
      }),
    ),
    type: Type.Optional(Type.Union([Type.Null(), ApplicationCommandTypeSchema])),
    id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
  },
  { ref: 'ApplicationCommandUpdateRequest' },
)

export type ApplicationCommandUpdateRequest = Static<typeof ApplicationCommandUpdateRequestSchema>

export const ApplicationEventWebhooksStatusSchema = Type.Union(
  [
    Type.Literal(1, { description: 'Webhook events are disabled by developer' }),
    Type.Literal(2, { description: 'Webhook events are enabled by developer' }),
    Type.Literal(3, {
      description: 'Webhook events are disabled by Discord, usually due to inactivity',
    }),
  ],
  { ref: 'ApplicationEventWebhooksStatus' },
)

export type ApplicationEventWebhooksStatus = Static<typeof ApplicationEventWebhooksStatusSchema>

export const ApplicationExplicitContentFilterTypesSchema = Type.Union(
  [
    Type.Literal(0, { description: 'inherit guild content filter setting' }),
    Type.Literal(1, { description: 'interactions will always be scanned' }),
  ],
  { ref: 'ApplicationExplicitContentFilterTypes' },
)

export type ApplicationExplicitContentFilterTypes = Static<
  typeof ApplicationExplicitContentFilterTypesSchema
>

export const ApplicationIdentityProviderAuthTypeSchema = Type.Union(
  [
    Type.Literal('OIDC'),
    Type.Literal('EPIC_ONLINE_SERVICES_ACCESS_TOKEN'),
    Type.Literal('EPIC_ONLINE_SERVICES_ID_TOKEN'),
    Type.Literal('STEAM_SESSION_TICKET'),
    Type.Literal('UNITY_SERVICES_ID_TOKEN'),
    Type.Literal('DISCORD_BOT_ISSUED_ACCESS_TOKEN'),
    Type.Literal('APPLE_ID_TOKEN'),
    Type.Literal('PLAYSTATION_NETWORK_ID_TOKEN'),
  ],
  { ref: 'ApplicationIdentityProviderAuthType' },
)

export type ApplicationIdentityProviderAuthType = Static<
  typeof ApplicationIdentityProviderAuthTypeSchema
>

export const WebhookTypesSchema = Type.Union(
  [
    Type.Literal(1, {
      description: 'Incoming Webhooks can post messages to channels with a generated token',
    }),
    Type.Literal(2, {
      description:
        'Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels',
    }),
    Type.Literal(3, { description: 'Application webhooks are webhooks used with Interactions' }),
  ],
  { ref: 'WebhookTypes' },
)

export type WebhookTypes = Static<typeof WebhookTypesSchema>

export const ApplicationIncomingWebhookResponseSchema = Type.Object(
  {
    application_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    avatar: Type.Union([Type.String(), Type.Null()]),
    channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    guild_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    id: SnowflakeTypeSchema,
    name: Type.String(),
    type: WebhookTypesSchema,
    user: Type.Optional(UserResponseSchema),
  },
  { ref: 'ApplicationIncomingWebhookResponse' },
)

export type ApplicationIncomingWebhookResponse = Static<
  typeof ApplicationIncomingWebhookResponseSchema
>

export const ApplicationOAuth2InstallParamsSchema = Type.Object(
  {
    scopes: Type.Optional(
      Type.Union([Type.Array(OAuth2ScopesSchema, { minItems: 1, uniqueItems: true }), Type.Null()]),
    ),
    permissions: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 18014398509481984 }), Type.Null()]),
    ),
  },
  { ref: 'ApplicationOAuth2InstallParams' },
)

export type ApplicationOAuth2InstallParams = Static<typeof ApplicationOAuth2InstallParamsSchema>

export const ApplicationIntegrationTypeConfigurationSchema = Type.Object(
  {
    oauth2_install_params: Type.Optional(
      Type.Union([Type.Null(), ApplicationOAuth2InstallParamsSchema]),
    ),
  },
  { ref: 'ApplicationIntegrationTypeConfiguration' },
)

export type ApplicationIntegrationTypeConfiguration = Static<
  typeof ApplicationIntegrationTypeConfigurationSchema
>

export const MetadataItemTypesSchema = Type.Union(
  [
    Type.Literal(1, {
      description:
        "the metadata value (integer) is less than or equal to the guild's configured value (integer)",
    }),
    Type.Literal(2, {
      description:
        "the metadata value (integer) is greater than or equal to the guild's configured value (integer)",
    }),
    Type.Literal(3, {
      description:
        "the metadata value (integer) is equal to the guild's configured value (integer)",
    }),
    Type.Literal(4, {
      description:
        "the metadata value (integer) is not equal to the guild's configured value (integer)",
    }),
    Type.Literal(5, {
      description:
        "the metadata value (ISO8601 string) is less than or equal to the guild's configured value (integer; days before current date)",
    }),
    Type.Literal(6, {
      description:
        "the metadata value (ISO8601 string) is greater than or equal to the guild's configured value (integer; days before current date)",
    }),
    Type.Literal(7, {
      description:
        "the metadata value (integer) is equal to the guild's configured value (integer; 1)",
    }),
    Type.Literal(8, {
      description:
        "the metadata value (integer) is not equal to the guild's configured value (integer; 1)",
    }),
  ],
  { ref: 'MetadataItemTypes' },
)

export type MetadataItemTypes = Static<typeof MetadataItemTypesSchema>

export const ApplicationRoleConnectionsMetadataItemRequestSchema = Type.Object(
  {
    type: MetadataItemTypesSchema,
    key: Type.String({ minLength: 1, maxLength: 50 }),
    name: Type.String({ minLength: 1, maxLength: 100 }),
    name_localizations: Type.Optional(
      Type.Union([
        Type.Record(
          Type.String(),
          Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
          { maxProperties: 1521 },
        ),
        Type.Null(),
      ]),
    ),
    description: Type.String({ minLength: 1, maxLength: 200 }),
    description_localizations: Type.Optional(
      Type.Union([
        Type.Record(
          Type.String(),
          Type.Union([Type.String({ minLength: 1, maxLength: 200 }), Type.Null()]),
          { maxProperties: 1521 },
        ),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'ApplicationRoleConnectionsMetadataItemRequest' },
)

export type ApplicationRoleConnectionsMetadataItemRequest = Static<
  typeof ApplicationRoleConnectionsMetadataItemRequestSchema
>

export const ApplicationRoleConnectionsMetadataItemResponseSchema = Type.Object(
  {
    type: MetadataItemTypesSchema,
    key: Type.String(),
    name: Type.String(),
    name_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
    description: Type.String(),
    description_localizations: Type.Optional(
      Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    ),
  },
  { ref: 'ApplicationRoleConnectionsMetadataItemResponse' },
)

export type ApplicationRoleConnectionsMetadataItemResponse = Static<
  typeof ApplicationRoleConnectionsMetadataItemResponseSchema
>

export const ApplicationUpdateFormPartialSchema = Type.Object(
  {
    description: Type.Optional(
      Type.Union([
        Type.Object({
          default: Type.String({ maxLength: 400 }),
          localizations: Type.Optional(
            Type.Union([Type.Record(Type.String(), Type.String({ maxLength: 400 })), Type.Null()]),
          ),
        }),
        Type.Null(),
      ]),
    ),
    icon: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    cover_image: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    team_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    interactions_endpoint_url: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    explicit_content_filter: Type.Optional(
      Type.Union([Type.Null(), ApplicationExplicitContentFilterTypesSchema]),
    ),
    max_participants: Type.Optional(Type.Union([Type.Integer({ minimum: -1 }), Type.Null()])),
    type: Type.Optional(Type.Union([Type.Null(), ApplicationTypesSchema])),
    tags: Type.Optional(
      Type.Union([
        Type.Array(Type.String({ maxLength: 20 }), { maxItems: 5, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    custom_install_url: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    install_params: Type.Optional(Type.Union([Type.Null(), ApplicationOAuth2InstallParamsSchema])),
    role_connections_verification_url: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    integration_types_config: Type.Optional(
      Type.Union([
        Type.Record(
          Type.String(),
          Type.Union([Type.Null(), ApplicationIntegrationTypeConfigurationSchema]),
          { minProperties: 1, maxProperties: 2 },
        ),
        Type.Null(),
      ]),
    ),
    event_webhooks_status: Type.Optional(
      Type.Union([Type.Null(), ApplicationEventWebhooksStatusSchema]),
    ),
    event_webhooks_url: Type.Optional(
      Type.Union([
        Type.String({
          format: 'uri',
          maxLength: 2048,
          description: 'Event webhooks URL for the app to receive webhook events',
        }),
        Type.Null(),
      ]),
    ),
    event_webhooks_types: Type.Optional(
      Type.Union([Type.Array(ActionTypesSchema, { uniqueItems: true }), Type.Null()]),
    ),
  },
  { ref: 'ApplicationUpdateFormPartial' },
)

export type ApplicationUpdateFormPartial = Static<typeof ApplicationUpdateFormPartialSchema>

export const ApplicationUserRoleConnectionResponseSchema = Type.Object(
  {
    platform_name: Type.Optional(Type.String()),
    platform_username: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    metadata: Type.Optional(Type.Record(Type.String(), Type.String())),
  },
  { ref: 'ApplicationUserRoleConnectionResponse' },
)

export type ApplicationUserRoleConnectionResponse = Static<
  typeof ApplicationUserRoleConnectionResponseSchema
>

export const AuditLogActionTypesSchema = Type.Union(
  [
    Type.Literal(1),
    Type.Literal(10),
    Type.Literal(11),
    Type.Literal(12),
    Type.Literal(13),
    Type.Literal(14),
    Type.Literal(15),
    Type.Literal(16, { description: 'Channels were reordered' }),
    Type.Literal(20),
    Type.Literal(21),
    Type.Literal(22),
    Type.Literal(23),
    Type.Literal(24),
    Type.Literal(25),
    Type.Literal(26),
    Type.Literal(27),
    Type.Literal(28),
    Type.Literal(30),
    Type.Literal(31),
    Type.Literal(32),
    Type.Literal(33, { description: 'Roles were reordered' }),
    Type.Literal(40),
    Type.Literal(41),
    Type.Literal(42),
    Type.Literal(50),
    Type.Literal(51),
    Type.Literal(52),
    Type.Literal(60),
    Type.Literal(61),
    Type.Literal(62),
    Type.Literal(72),
    Type.Literal(73),
    Type.Literal(74),
    Type.Literal(75),
    Type.Literal(80),
    Type.Literal(81),
    Type.Literal(82),
    Type.Literal(83),
    Type.Literal(84),
    Type.Literal(85),
    Type.Literal(90),
    Type.Literal(91),
    Type.Literal(92),
    Type.Literal(100),
    Type.Literal(101),
    Type.Literal(102),
    Type.Literal(110),
    Type.Literal(111),
    Type.Literal(112),
    Type.Literal(121),
    Type.Literal(130),
    Type.Literal(131),
    Type.Literal(132),
    Type.Literal(140),
    Type.Literal(141),
    Type.Literal(142),
    Type.Literal(143),
    Type.Literal(144),
    Type.Literal(145),
    Type.Literal(146),
    Type.Literal(150),
    Type.Literal(151),
    Type.Literal(163),
    Type.Literal(164),
    Type.Literal(165),
    Type.Literal(166),
    Type.Literal(167),
    Type.Literal(171),
    Type.Literal(172),
    Type.Literal(180),
    Type.Literal(190),
    Type.Literal(191),
    Type.Literal(192),
    Type.Literal(193),
    Type.Literal(200, { description: 'Scheduled event exception was created' }),
    Type.Literal(201, { description: 'Scheduled event exception was updated' }),
    Type.Literal(202, { description: 'Scheduled event exception was deleted' }),
    Type.Literal(211),
  ],
  { ref: 'AuditLogActionTypes' },
)

export type AuditLogActionTypes = Static<typeof AuditLogActionTypesSchema>

export const AuditLogObjectChangeResponseSchema = Type.Object(
  {
    key: Type.Union([Type.String(), Type.Null()]),
    new_value: Type.Optional(Type.Any()),
    old_value: Type.Optional(Type.Any()),
  },
  { ref: 'AuditLogObjectChangeResponse' },
)

export type AuditLogObjectChangeResponse = Static<typeof AuditLogObjectChangeResponseSchema>

export const AuditLogEntryResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    action_type: AuditLogActionTypesSchema,
    user_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    target_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    changes: Type.Optional(Type.Array(AuditLogObjectChangeResponseSchema)),
    options: Type.Optional(Type.Record(Type.String(), Type.String())),
    reason: Type.Optional(Type.String()),
  },
  { ref: 'AuditLogEntryResponse' },
)

export type AuditLogEntryResponse = Static<typeof AuditLogEntryResponseSchema>

export const AuthorTypeSchema = Type.Union(
  [
    Type.Literal('user'),
    Type.Literal('bot'),
    Type.Literal('webhook'),
    Type.Literal('-user'),
    Type.Literal('-bot'),
    Type.Literal('-webhook'),
  ],
  { ref: 'AuthorType' },
)

export type AuthorType = Static<typeof AuthorTypeSchema>

export const AutomodActionTypeSchema = Type.Union(
  [
    Type.Literal(1, {
      description:
        "Block a user's message and prevent it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked",
    }),
    Type.Literal(2, {
      description:
        'Send a system message to a channel in order to log the user message that triggered the rule',
    }),
    Type.Literal(3, {
      description: "Temporarily disable a user's ability to communicate in the server (timeout)",
    }),
    Type.Literal(4, { description: 'Prevent a user from interacting in the server' }),
  ],
  { ref: 'AutomodActionType' },
)

export type AutomodActionType = Static<typeof AutomodActionTypeSchema>

export const AutomodEventTypeSchema = Type.Union(
  [
    Type.Literal(1, { description: 'A user submitted a message to a channel' }),
    Type.Literal(2, {
      description: "A user is attempting to join the server or a member's properties were updated.",
    }),
  ],
  { ref: 'AutomodEventType' },
)

export type AutomodEventType = Static<typeof AutomodEventTypeSchema>

export const AutomodKeywordPresetTypeSchema = Type.Union(
  [
    Type.Literal(1, { description: 'Words and phrases that may be considered profanity' }),
    Type.Literal(2, { description: 'Words and phrases that may be considered as sexual content' }),
    Type.Literal(3, {
      description: 'Words and phrases that may be considered slurs and hate speech',
    }),
  ],
  { ref: 'AutomodKeywordPresetType' },
)

export type AutomodKeywordPresetType = Static<typeof AutomodKeywordPresetTypeSchema>

export const AutomodTriggerTypeSchema = Type.Union(
  [
    Type.Literal(1, {
      description: 'Check if content contains words from a list of keywords or matches regex',
    }),
    Type.Literal(3, { description: 'Check if content represents generic spam' }),
    Type.Literal(4, {
      description: 'Check if content contains words from internal pre-defined wordsets',
    }),
    Type.Literal(5, { description: 'Check if content contains more unique mentions than allowed' }),
    Type.Literal(6, {
      description:
        'Check if user profile fields contains words from a list of keywords or matches regex',
    }),
  ],
  { ref: 'AutomodTriggerType' },
)

export type AutomodTriggerType = Static<typeof AutomodTriggerTypeSchema>

export const AvailableLocalesEnumSchema = Type.Union(
  [
    Type.Literal('ar', { description: 'The ar locale' }),
    Type.Literal('bg', { description: 'The bg locale' }),
    Type.Literal('cs', { description: 'The cs locale' }),
    Type.Literal('da', { description: 'The da locale' }),
    Type.Literal('de', { description: 'The de locale' }),
    Type.Literal('el', { description: 'The el locale' }),
    Type.Literal('en-GB', { description: 'The en-GB locale' }),
    Type.Literal('en-US', { description: 'The en-US locale' }),
    Type.Literal('es-419', { description: 'The es-419 locale' }),
    Type.Literal('es-ES', { description: 'The es-ES locale' }),
    Type.Literal('fi', { description: 'The fi locale' }),
    Type.Literal('fr', { description: 'The fr locale' }),
    Type.Literal('he', { description: 'The he locale' }),
    Type.Literal('hi', { description: 'The hi locale' }),
    Type.Literal('hr', { description: 'The hr locale' }),
    Type.Literal('hu', { description: 'The hu locale' }),
    Type.Literal('id', { description: 'The id locale' }),
    Type.Literal('it', { description: 'The it locale' }),
    Type.Literal('ja', { description: 'The ja locale' }),
    Type.Literal('ko', { description: 'The ko locale' }),
    Type.Literal('lt', { description: 'The lt locale' }),
    Type.Literal('nl', { description: 'The nl locale' }),
    Type.Literal('no', { description: 'The no locale' }),
    Type.Literal('pl', { description: 'The pl locale' }),
    Type.Literal('pt-BR', { description: 'The pt-BR locale' }),
    Type.Literal('ro', { description: 'The ro locale' }),
    Type.Literal('ru', { description: 'The ru locale' }),
    Type.Literal('sv-SE', { description: 'The sv-SE locale' }),
    Type.Literal('th', { description: 'The th locale' }),
    Type.Literal('tr', { description: 'The tr locale' }),
    Type.Literal('uk', { description: 'The uk locale' }),
    Type.Literal('vi', { description: 'The vi locale' }),
    Type.Literal('zh-CN', { description: 'The zh-CN locale' }),
    Type.Literal('zh-TW', { description: 'The zh-TW locale' }),
  ],
  { ref: 'AvailableLocalesEnum' },
)

export type AvailableLocalesEnum = Static<typeof AvailableLocalesEnumSchema>

export const BanUserFromGuildRequestSchema = Type.Object(
  {
    delete_message_seconds: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 604800 }), Type.Null()]),
    ),
    delete_message_days: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 7 }), Type.Null()]),
    ),
  },
  { ref: 'BanUserFromGuildRequest' },
)

export type BanUserFromGuildRequest = Static<typeof BanUserFromGuildRequestSchema>

export const RichEmbedAuthorSchema = Type.Object(
  {
    name: Type.Optional(Type.Union([Type.String({ maxLength: 256 }), Type.Null()])),
    url: Type.Optional(Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()])),
    icon_url: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
  },
  { ref: 'RichEmbedAuthor' },
)

export type RichEmbedAuthor = Static<typeof RichEmbedAuthorSchema>

export const RichEmbedImageSchema = Type.Object(
  {
    url: Type.Optional(Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()])),
    width: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    height: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 64 }), Type.Null()])),
    placeholder_version: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 2147483647 }), Type.Null()]),
    ),
    is_animated: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 4096 }), Type.Null()])),
  },
  { ref: 'RichEmbedImage' },
)

export type RichEmbedImage = Static<typeof RichEmbedImageSchema>

export const RichEmbedThumbnailSchema = Type.Object(
  {
    url: Type.Optional(Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()])),
    width: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    height: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 64 }), Type.Null()])),
    placeholder_version: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 2147483647 }), Type.Null()]),
    ),
    is_animated: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 4096 }), Type.Null()])),
  },
  { ref: 'RichEmbedThumbnail' },
)

export type RichEmbedThumbnail = Static<typeof RichEmbedThumbnailSchema>

export const RichEmbedFooterSchema = Type.Object(
  {
    text: Type.Optional(Type.Union([Type.String({ maxLength: 2048 }), Type.Null()])),
    icon_url: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
  },
  { ref: 'RichEmbedFooter' },
)

export type RichEmbedFooter = Static<typeof RichEmbedFooterSchema>

export const RichEmbedFieldSchema = Type.Object(
  {
    name: Type.String({ maxLength: 256 }),
    value: Type.String({ maxLength: 1024 }),
    inline: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'RichEmbedField' },
)

export type RichEmbedField = Static<typeof RichEmbedFieldSchema>

export const RichEmbedProviderSchema = Type.Object(
  {
    name: Type.Optional(Type.Union([Type.String({ maxLength: 256 }), Type.Null()])),
    url: Type.Optional(Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()])),
  },
  { ref: 'RichEmbedProvider' },
)

export type RichEmbedProvider = Static<typeof RichEmbedProviderSchema>

export const RichEmbedVideoSchema = Type.Object(
  {
    url: Type.Optional(Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()])),
    width: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    height: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 64 }), Type.Null()])),
    placeholder_version: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 2147483647 }), Type.Null()]),
    ),
    is_animated: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 4096 }), Type.Null()])),
  },
  { ref: 'RichEmbedVideo' },
)

export type RichEmbedVideo = Static<typeof RichEmbedVideoSchema>

export const RichEmbedAudioSchema = Type.Object(
  {
    url: Type.Optional(Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()])),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 4096 }), Type.Null()])),
  },
  { ref: 'RichEmbedAudio' },
)

export type RichEmbedAudio = Static<typeof RichEmbedAudioSchema>

export const RichEmbedSchema = Type.Object(
  {
    type: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    url: Type.Optional(Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()])),
    title: Type.Optional(Type.Union([Type.String({ maxLength: 256 }), Type.Null()])),
    color: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 16777215 }), Type.Null()]),
    ),
    timestamp: Type.Optional(Type.Union([Type.String({ format: 'date-time' }), Type.Null()])),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 4096 }), Type.Null()])),
    author: Type.Optional(Type.Union([Type.Null(), RichEmbedAuthorSchema])),
    image: Type.Optional(Type.Union([Type.Null(), RichEmbedImageSchema])),
    thumbnail: Type.Optional(Type.Union([Type.Null(), RichEmbedThumbnailSchema])),
    footer: Type.Optional(Type.Union([Type.Null(), RichEmbedFooterSchema])),
    fields: Type.Optional(
      Type.Union([Type.Array(RichEmbedFieldSchema, { maxItems: 25 }), Type.Null()]),
    ),
    provider: Type.Optional(Type.Union([Type.Null(), RichEmbedProviderSchema])),
    video: Type.Optional(Type.Union([Type.Null(), RichEmbedVideoSchema])),
    audio: Type.Optional(Type.Union([Type.Null(), RichEmbedAudioSchema])),
  },
  { ref: 'RichEmbed' },
)

export type RichEmbed = Static<typeof RichEmbedSchema>

export const MessageAllowedMentionsRequestSchema = Type.Object(
  {
    parse: Type.Optional(
      Type.Union([
        Type.Array(Type.Union([Type.Null(), AllowedMentionTypesSchema]), {
          maxItems: 1521,
          uniqueItems: true,
        }),
        Type.Null(),
      ]),
    ),
    users: Type.Optional(
      Type.Union([
        Type.Array(Type.Union([Type.Null(), SnowflakeTypeSchema]), {
          maxItems: 100,
          uniqueItems: true,
        }),
        Type.Null(),
      ]),
    ),
    roles: Type.Optional(
      Type.Union([
        Type.Array(Type.Union([Type.Null(), SnowflakeTypeSchema]), {
          maxItems: 100,
          uniqueItems: true,
        }),
        Type.Null(),
      ]),
    ),
    replied_user: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'MessageAllowedMentionsRequest' },
)

export type MessageAllowedMentionsRequest = Static<typeof MessageAllowedMentionsRequestSchema>

export const UnfurledMediaRequestWithAttachmentReferenceRequiredSchema = Type.Object(
  { url: Type.String({ format: 'uri', maxLength: 2048 }) },
  { ref: 'UnfurledMediaRequestWithAttachmentReferenceRequired' },
)

export type UnfurledMediaRequestWithAttachmentReferenceRequired = Static<
  typeof UnfurledMediaRequestWithAttachmentReferenceRequiredSchema
>

export const FileComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    spoiler: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
  },
  { ref: 'FileComponentForMessageRequest' },
)

export type FileComponentForMessageRequest = Static<typeof FileComponentForMessageRequestSchema>

export const UnfurledMediaRequestSchema = Type.Object(
  { url: Type.String({ format: 'uri', maxLength: 2048 }) },
  { ref: 'UnfurledMediaRequest' },
)

export type UnfurledMediaRequest = Static<typeof UnfurledMediaRequestSchema>

export const MediaGalleryItemForMessageRequestSchema = Type.Object(
  {
    description: Type.Optional(
      Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
    ),
    spoiler: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    media: UnfurledMediaRequestSchema,
  },
  { ref: 'MediaGalleryItemForMessageRequest' },
)

export type MediaGalleryItemForMessageRequest = Static<
  typeof MediaGalleryItemForMessageRequestSchema
>

export const MediaGalleryComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    items: Type.Array(MediaGalleryItemForMessageRequestSchema, { minItems: 1, maxItems: 10 }),
  },
  { ref: 'MediaGalleryComponentForMessageRequest' },
)

export type MediaGalleryComponentForMessageRequest = Static<
  typeof MediaGalleryComponentForMessageRequestSchema
>

export const TextDisplayComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    content: Type.String({ minLength: 1, maxLength: 4000 }),
  },
  { ref: 'TextDisplayComponentForMessageRequest' },
)

export type TextDisplayComponentForMessageRequest = Static<
  typeof TextDisplayComponentForMessageRequestSchema
>

export const ThumbnailComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    description: Type.Optional(
      Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
    ),
    spoiler: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    media: UnfurledMediaRequestSchema,
  },
  { ref: 'ThumbnailComponentForMessageRequest' },
)

export type ThumbnailComponentForMessageRequest = Static<
  typeof ThumbnailComponentForMessageRequestSchema
>

export const SectionComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    components: Type.Array(TextDisplayComponentForMessageRequestSchema, {
      minItems: 1,
      maxItems: 3,
    }),
    accessory: Type.Union([
      ButtonComponentForMessageRequestSchema,
      ThumbnailComponentForMessageRequestSchema,
    ]),
  },
  { ref: 'SectionComponentForMessageRequest' },
)

export type SectionComponentForMessageRequest = Static<
  typeof SectionComponentForMessageRequestSchema
>

export const MessageComponentSeparatorSpacingSizeSchema = Type.Union(
  [
    Type.Literal(1, { description: 'Small spacing' }),
    Type.Literal(2, { description: 'Large spacing' }),
  ],
  { ref: 'MessageComponentSeparatorSpacingSize' },
)

export type MessageComponentSeparatorSpacingSize = Static<
  typeof MessageComponentSeparatorSpacingSizeSchema
>

export const SeparatorComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    spacing: Type.Optional(Type.Union([Type.Null(), MessageComponentSeparatorSpacingSizeSchema])),
    divider: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'SeparatorComponentForMessageRequest' },
)

export type SeparatorComponentForMessageRequest = Static<
  typeof SeparatorComponentForMessageRequestSchema
>

export const ContainerComponentForMessageRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    accent_color: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 16777215 }), Type.Null()]),
    ),
    components: Type.Array(
      Type.Union([
        ActionRowComponentForMessageRequestSchema,
        FileComponentForMessageRequestSchema,
        MediaGalleryComponentForMessageRequestSchema,
        SectionComponentForMessageRequestSchema,
        SeparatorComponentForMessageRequestSchema,
        TextDisplayComponentForMessageRequestSchema,
      ]),
      { minItems: 1, maxItems: 40 },
    ),
    spoiler: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'ContainerComponentForMessageRequest' },
)

export type ContainerComponentForMessageRequest = Static<
  typeof ContainerComponentForMessageRequestSchema
>

export const MessageAttachmentRequestSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    filename: Type.Optional(
      Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
    ),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 1024 }), Type.Null()])),
    duration_secs: Type.Optional(
      Type.Union([Type.Number({ minimum: 0, maximum: 2147483647 }), Type.Null()]),
    ),
    waveform: Type.Optional(Type.Union([Type.String({ maxLength: 400 }), Type.Null()])),
    title: Type.Optional(Type.Union([Type.String({ maxLength: 1024 }), Type.Null()])),
    is_spoiler: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'MessageAttachmentRequest' },
)

export type MessageAttachmentRequest = Static<typeof MessageAttachmentRequestSchema>

export const PollEmojiSchema = Type.Object(
  {
    id: Type.Optional(
      Type.Union([Type.Null(), SnowflakeTypeSchema], { description: 'The ID of the custom emoji' }),
    ),
    name: Type.Optional(
      Type.Union([
        Type.String({
          maxLength: 32,
          description: 'The name of the emoji, or the unicode emoji character',
        }),
        Type.Null(),
      ]),
    ),
    animated: Type.Optional(
      Type.Union([Type.Boolean({ description: 'Whether the emoji is animated' }), Type.Null()]),
    ),
  },
  { ref: 'PollEmoji' },
)

export type PollEmoji = Static<typeof PollEmojiSchema>

export const PollMediaSchema = Type.Object(
  {
    text: Type.Optional(
      Type.Union([
        Type.String({ minLength: 1, maxLength: 300, description: 'The text of the field' }),
        Type.Null(),
      ]),
    ),
    emoji: Type.Optional(
      Type.Union([Type.Null(), PollEmojiSchema], { description: 'The emoji of the field' }),
    ),
  },
  { ref: 'PollMedia' },
)

export type PollMedia = Static<typeof PollMediaSchema>

export const PollEmojiCreateRequestSchema = Type.Object(
  {
    id: Type.Optional(
      Type.Union([Type.Null(), SnowflakeTypeSchema], { description: 'The ID of the custom emoji' }),
    ),
    name: Type.Optional(
      Type.Union([
        Type.String({
          maxLength: 32,
          description: 'The name of the emoji, or the unicode emoji character',
        }),
        Type.Null(),
      ]),
    ),
    animated: Type.Optional(
      Type.Union([Type.Boolean({ description: 'Whether the emoji is animated' }), Type.Null()]),
    ),
  },
  { ref: 'PollEmojiCreateRequest' },
)

export type PollEmojiCreateRequest = Static<typeof PollEmojiCreateRequestSchema>

export const PollMediaCreateRequestSchema = Type.Object(
  {
    text: Type.Optional(
      Type.Union([
        Type.String({ minLength: 1, maxLength: 300, description: 'The text of the field' }),
        Type.Null(),
      ]),
    ),
    emoji: Type.Optional(
      Type.Union([Type.Null(), PollEmojiCreateRequestSchema], {
        description: 'The emoji of the field',
      }),
    ),
  },
  { ref: 'PollMediaCreateRequest' },
)

export type PollMediaCreateRequest = Static<typeof PollMediaCreateRequestSchema>

export const PollAnswerCreateRequestSchema = Type.Object(
  { poll_media: PollMediaCreateRequestSchema },
  { ref: 'PollAnswerCreateRequest' },
)

export type PollAnswerCreateRequest = Static<typeof PollAnswerCreateRequestSchema>

export const PollLayoutTypesSchema = Type.Union(
  [Type.Literal(1, { description: 'The, uhm, default layout type.' })],
  { ref: 'PollLayoutTypes' },
)

export type PollLayoutTypes = Static<typeof PollLayoutTypesSchema>

export const PollCreateRequestSchema = Type.Object(
  {
    question: PollMediaSchema,
    answers: Type.Array(PollAnswerCreateRequestSchema, {
      minItems: 1,
      maxItems: 10,
      description: 'Each of the answers available in the poll, up to 10',
    }),
    allow_multiselect: Type.Optional(
      Type.Union([
        Type.Boolean({ description: 'Whether a user can select multiple answers' }),
        Type.Null(),
      ]),
    ),
    layout_type: Type.Optional(
      Type.Union([Type.Null(), PollLayoutTypesSchema], {
        description: 'The layout type of the poll. Defaults to... DEFAULT!',
      }),
    ),
    duration: Type.Optional(
      Type.Union([
        Type.Integer({
          minimum: 1,
          maximum: 768,
          description: 'Number of hours the poll should be open for, up to 32 days. Defaults to 24',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'PollCreateRequest' },
)

export type PollCreateRequest = Static<typeof PollCreateRequestSchema>

export const MessageShareCustomUserThemeBaseThemeSchema = Type.Union(
  [
    Type.Literal(0, { description: 'No base theme' }),
    Type.Literal(1, { description: 'Dark base theme' }),
    Type.Literal(2, { description: 'Light base theme' }),
    Type.Literal(3, { description: 'Darker base theme' }),
    Type.Literal(4, { description: 'Midnight base theme' }),
  ],
  { ref: 'MessageShareCustomUserThemeBaseTheme' },
)

export type MessageShareCustomUserThemeBaseTheme = Static<
  typeof MessageShareCustomUserThemeBaseThemeSchema
>

export const CustomClientThemeShareRequestSchema = Type.Object(
  {
    colors: Type.Array(Type.String({ minLength: 6, maxLength: 6 }), { minItems: 1, maxItems: 5 }),
    gradient_angle: Type.Integer({ minimum: 0, maximum: 360 }),
    base_mix: Type.Integer({ minimum: 0, maximum: 100 }),
    base_theme: Type.Optional(
      Type.Union([Type.Null(), MessageShareCustomUserThemeBaseThemeSchema]),
    ),
  },
  { ref: 'CustomClientThemeShareRequest' },
)

export type CustomClientThemeShareRequest = Static<typeof CustomClientThemeShareRequestSchema>

export const BaseCreateMessageCreateRequestSchema = Type.Object(
  {
    content: Type.Optional(Type.Union([Type.String({ maxLength: 4000 }), Type.Null()])),
    embeds: Type.Optional(Type.Union([Type.Array(RichEmbedSchema, { maxItems: 10 }), Type.Null()])),
    allowed_mentions: Type.Optional(Type.Union([Type.Null(), MessageAllowedMentionsRequestSchema])),
    sticker_ids: Type.Optional(
      Type.Union([Type.Array(SnowflakeTypeSchema, { maxItems: 3 }), Type.Null()]),
    ),
    components: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
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
        Type.Null(),
      ]),
    ),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    attachments: Type.Optional(
      Type.Union([Type.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), Type.Null()]),
    ),
    poll: Type.Optional(Type.Union([Type.Null(), PollCreateRequestSchema])),
    shared_client_theme: Type.Optional(
      Type.Union([Type.Null(), CustomClientThemeShareRequestSchema]),
    ),
  },
  { ref: 'BaseCreateMessageCreateRequest' },
)

export type BaseCreateMessageCreateRequest = Static<typeof BaseCreateMessageCreateRequestSchema>

export const BasicApplicationResponseWithBotSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    icon: Type.Union([Type.String(), Type.Null()]),
    description: Type.String(),
    type: Type.Union([Type.Null(), ApplicationTypesSchema]),
    cover_image: Type.Optional(Type.String()),
    primary_sku_id: Type.Optional(SnowflakeTypeSchema),
    flags: Type.Integer(),
    flags_new: Type.String(),
    bot: Type.Optional(UserResponseSchema),
  },
  { ref: 'BasicApplicationResponseWithBot' },
)

export type BasicApplicationResponseWithBot = Static<typeof BasicApplicationResponseWithBotSchema>

export const BasicGuildMemberResponseSchema = Type.Object(
  {
    avatar: Type.Union([
      Type.String({ description: "the member's guild avatar hash" }),
      Type.Null(),
    ]),
    avatar_decoration_data: Type.Optional(
      Type.Union([Type.Null(), UserAvatarDecorationResponseSchema], {
        description: "data for the member's guild avatar decoration",
      }),
    ),
    banner: Type.Union([
      Type.String({ description: "the member's guild banner hash" }),
      Type.Null(),
    ]),
    communication_disabled_until: Type.Union([
      Type.String({
        format: 'date-time',
        description:
          "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
      }),
      Type.Null(),
    ]),
    flags: Type.Integer({
      description: 'guild member flags represented as a bit set, defaults to 0',
    }),
    joined_at: Type.String({ format: 'date-time', description: 'when the user joined the guild' }),
    nick: Type.Union([Type.String({ description: "this user's guild nickname" }), Type.Null()]),
    pending: Type.Boolean({
      description:
        "whether the user has not yet passed the guild's Membership Screening requirements",
    }),
    premium_since: Type.Union([
      Type.String({ format: 'date-time', description: 'when the user started boosting the guild' }),
      Type.Null(),
    ]),
    roles: Type.Array(SnowflakeTypeSchema, {
      uniqueItems: true,
      description: 'array of role object ids',
    }),
    collectibles: Type.Optional(
      Type.Union([Type.Null(), UserCollectiblesResponseSchema], {
        description: "data for the member's collectibles",
      }),
    ),
  },
  { ref: 'BasicGuildMemberResponse' },
)

export type BasicGuildMemberResponse = Static<typeof BasicGuildMemberResponseSchema>

export const MessageTypeSchema = Type.Union(
  [
    Type.Literal(0, { description: '' }),
    Type.Literal(1, { description: '' }),
    Type.Literal(2, { description: '' }),
    Type.Literal(3, { description: '' }),
    Type.Literal(4, { description: '' }),
    Type.Literal(5, { description: '' }),
    Type.Literal(6, { description: '' }),
    Type.Literal(7, { description: '' }),
    Type.Literal(8, { description: '' }),
    Type.Literal(9, { description: '' }),
    Type.Literal(10, { description: '' }),
    Type.Literal(11, { description: '' }),
    Type.Literal(12, { description: '' }),
    Type.Literal(14, { description: '' }),
    Type.Literal(15, { description: '' }),
    Type.Literal(16, { description: '' }),
    Type.Literal(17, { description: '' }),
    Type.Literal(18, { description: '' }),
    Type.Literal(19, { description: '' }),
    Type.Literal(20, { description: '' }),
    Type.Literal(21, { description: '' }),
    Type.Literal(22, { description: '' }),
    Type.Literal(23, { description: '' }),
    Type.Literal(24, { description: '' }),
    Type.Literal(25, { description: '' }),
    Type.Literal(26, { description: '' }),
    Type.Literal(27, { description: '' }),
    Type.Literal(28, { description: '' }),
    Type.Literal(29, { description: '' }),
    Type.Literal(31, { description: '' }),
    Type.Literal(32, { description: '' }),
    Type.Literal(36, { description: '' }),
    Type.Literal(37, { description: '' }),
    Type.Literal(38, { description: '' }),
    Type.Literal(39, { description: '' }),
    Type.Literal(46, { description: '' }),
    Type.Literal(55, { description: '' }),
  ],
  { ref: 'MessageType' },
)

export type MessageType = Static<typeof MessageTypeSchema>

export const MessageAttachmentResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    filename: Type.String(),
    size: Type.Integer(),
    url: Type.String({ format: 'uri' }),
    proxy_url: Type.String({ format: 'uri' }),
    width: Type.Optional(Type.Integer()),
    height: Type.Optional(Type.Integer()),
    duration_secs: Type.Optional(Type.Number()),
    waveform: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    content_type: Type.Optional(Type.String()),
    ephemeral: Type.Optional(Type.Boolean()),
    flags: Type.Optional(Type.Integer()),
    placeholder: Type.Optional(Type.String()),
    placeholder_version: Type.Optional(Type.Integer()),
    title: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    application: Type.Optional(ApplicationResponseSchema),
    clip_created_at: Type.Optional(Type.String({ format: 'date-time' })),
    clip_participants: Type.Optional(Type.Array(UserResponseSchema)),
  },
  { ref: 'MessageAttachmentResponse' },
)

export type MessageAttachmentResponse = Static<typeof MessageAttachmentResponseSchema>

export const MessageEmbedFieldResponseSchema = Type.Object(
  { name: Type.String(), value: Type.String(), inline: Type.Boolean() },
  { ref: 'MessageEmbedFieldResponse' },
)

export type MessageEmbedFieldResponse = Static<typeof MessageEmbedFieldResponseSchema>

export const MessageEmbedAuthorResponseSchema = Type.Object(
  {
    name: Type.String(),
    url: Type.Optional(Type.String()),
    icon_url: Type.Optional(Type.String()),
    proxy_icon_url: Type.Optional(Type.String({ format: 'uri' })),
  },
  { ref: 'MessageEmbedAuthorResponse' },
)

export type MessageEmbedAuthorResponse = Static<typeof MessageEmbedAuthorResponseSchema>

export const MessageEmbedProviderResponseSchema = Type.Object(
  { name: Type.String(), url: Type.Optional(Type.String({ format: 'uri' })) },
  { ref: 'MessageEmbedProviderResponse' },
)

export type MessageEmbedProviderResponse = Static<typeof MessageEmbedProviderResponseSchema>

export const UInt32TypeSchema = Type.Integer({ ref: 'UInt32Type', minimum: 0, maximum: 4294967295 })

export type UInt32Type = Static<typeof UInt32TypeSchema>

export const MessageEmbedImageResponseSchema = Type.Object(
  {
    url: Type.Optional(Type.String()),
    proxy_url: Type.Optional(Type.String({ format: 'uri' })),
    width: Type.Optional(UInt32TypeSchema),
    height: Type.Optional(UInt32TypeSchema),
    content_type: Type.Optional(Type.String()),
    placeholder: Type.Optional(Type.String()),
    placeholder_version: Type.Optional(UInt32TypeSchema),
    description: Type.Optional(Type.String()),
    flags: Type.Optional(UInt32TypeSchema),
  },
  { ref: 'MessageEmbedImageResponse' },
)

export type MessageEmbedImageResponse = Static<typeof MessageEmbedImageResponseSchema>

export const MessageEmbedVideoResponseSchema = Type.Object(
  {
    url: Type.Optional(Type.String()),
    proxy_url: Type.Optional(Type.String({ format: 'uri' })),
    width: Type.Optional(UInt32TypeSchema),
    height: Type.Optional(UInt32TypeSchema),
    content_type: Type.Optional(Type.String()),
    placeholder: Type.Optional(Type.String()),
    placeholder_version: Type.Optional(UInt32TypeSchema),
    description: Type.Optional(Type.String()),
    flags: Type.Optional(UInt32TypeSchema),
  },
  { ref: 'MessageEmbedVideoResponse' },
)

export type MessageEmbedVideoResponse = Static<typeof MessageEmbedVideoResponseSchema>

export const MessageEmbedAudioResponseSchema = Type.Object(
  {
    url: Type.Optional(Type.String()),
    proxy_url: Type.Optional(Type.String({ format: 'uri' })),
    content_type: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
  },
  { ref: 'MessageEmbedAudioResponse' },
)

export type MessageEmbedAudioResponse = Static<typeof MessageEmbedAudioResponseSchema>

export const MessageEmbedFooterResponseSchema = Type.Object(
  {
    text: Type.String(),
    icon_url: Type.Optional(Type.String()),
    proxy_icon_url: Type.Optional(Type.String({ format: 'uri' })),
  },
  { ref: 'MessageEmbedFooterResponse' },
)

export type MessageEmbedFooterResponse = Static<typeof MessageEmbedFooterResponseSchema>

export const ContentScanMetadataResponseSchema = Type.Object(
  { flags: Type.Integer() },
  { ref: 'ContentScanMetadataResponse' },
)

export type ContentScanMetadataResponse = Static<typeof ContentScanMetadataResponseSchema>

export const UnfurledMediaResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    url: Type.String(),
    proxy_url: Type.Optional(Type.String()),
    width: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    height: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    placeholder: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    placeholder_version: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    content_scan_metadata: Type.Optional(ContentScanMetadataResponseSchema),
    content_type: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    flags: Type.Optional(Type.Integer()),
    attachment_id: Type.Optional(SnowflakeTypeSchema),
  },
  { ref: 'UnfurledMediaResponse' },
)

export type UnfurledMediaResponse = Static<typeof UnfurledMediaResponseSchema>

export const FileComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    file: UnfurledMediaResponseSchema,
    name: Type.Union([Type.String(), Type.Null()]),
    size: Type.Union([Type.Integer(), Type.Null()]),
    spoiler: Type.Boolean(),
  },
  { ref: 'FileComponentResponse' },
)

export type FileComponentResponse = Static<typeof FileComponentResponseSchema>

export const MediaGalleryItemResponseSchema = Type.Object(
  {
    media: UnfurledMediaResponseSchema,
    description: Type.Union([Type.String(), Type.Null()]),
    spoiler: Type.Boolean(),
  },
  { ref: 'MediaGalleryItemResponse' },
)

export type MediaGalleryItemResponse = Static<typeof MediaGalleryItemResponseSchema>

export const MediaGalleryComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    items: Type.Array(MediaGalleryItemResponseSchema),
  },
  { ref: 'MediaGalleryComponentResponse' },
)

export type MediaGalleryComponentResponse = Static<typeof MediaGalleryComponentResponseSchema>

export const TextDisplayComponentResponseSchema = Type.Object(
  { type: MessageComponentTypesSchema, id: Type.Integer(), content: Type.String() },
  { ref: 'TextDisplayComponentResponse' },
)

export type TextDisplayComponentResponse = Static<typeof TextDisplayComponentResponseSchema>

export const ThumbnailComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    media: UnfurledMediaResponseSchema,
    description: Type.Union([Type.String(), Type.Null()]),
    spoiler: Type.Boolean(),
  },
  { ref: 'ThumbnailComponentResponse' },
)

export type ThumbnailComponentResponse = Static<typeof ThumbnailComponentResponseSchema>

export const SectionComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    components: Type.Array(TextDisplayComponentResponseSchema),
    accessory: Type.Union([ButtonComponentResponseSchema, ThumbnailComponentResponseSchema]),
  },
  { ref: 'SectionComponentResponse' },
)

export type SectionComponentResponse = Static<typeof SectionComponentResponseSchema>

export const SeparatorComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    spacing: MessageComponentSeparatorSpacingSizeSchema,
    divider: Type.Boolean(),
  },
  { ref: 'SeparatorComponentResponse' },
)

export type SeparatorComponentResponse = Static<typeof SeparatorComponentResponseSchema>

export const ContainerComponentResponseSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Integer(),
    accent_color: Type.Union([Type.Integer(), Type.Null()]),
    components: Type.Array(
      Type.Union([
        ActionRowComponentResponseSchema,
        FileComponentResponseSchema,
        MediaGalleryComponentResponseSchema,
        SectionComponentResponseSchema,
        SeparatorComponentResponseSchema,
        TextDisplayComponentResponseSchema,
      ]),
    ),
    spoiler: Type.Boolean(),
  },
  { ref: 'ContainerComponentResponse' },
)

export type ContainerComponentResponse = Static<typeof ContainerComponentResponseSchema>

export const MessageEmbedResponseSchema = Type.Object(
  {
    type: Type.String(),
    url: Type.Optional(Type.String({ format: 'uri' })),
    title: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    color: Type.Optional(Type.Integer()),
    timestamp: Type.Optional(Type.String({ format: 'date-time' })),
    fields: Type.Optional(Type.Array(MessageEmbedFieldResponseSchema)),
    author: Type.Optional(MessageEmbedAuthorResponseSchema),
    provider: Type.Optional(MessageEmbedProviderResponseSchema),
    image: Type.Optional(MessageEmbedImageResponseSchema),
    thumbnail: Type.Optional(MessageEmbedImageResponseSchema),
    video: Type.Optional(MessageEmbedVideoResponseSchema),
    audio: Type.Optional(MessageEmbedAudioResponseSchema),
    footer: Type.Optional(MessageEmbedFooterResponseSchema),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    components: Type.Optional(Type.Array(ContainerComponentResponseSchema)),
  },
  { ref: 'MessageEmbedResponse' },
)

export type MessageEmbedResponse = Static<typeof MessageEmbedResponseSchema>

export const StickerTypesSchema = Type.Union(
  [
    Type.Literal(1, {
      description: 'an official sticker in a pack, part of Nitro or in a removed purchasable pack',
    }),
    Type.Literal(2, { description: "a sticker uploaded to a guild for the guild's members" }),
  ],
  { ref: 'StickerTypes' },
)

export type StickerTypes = Static<typeof StickerTypesSchema>

export const StickerFormatTypesSchema = Type.Union(
  [Type.Literal(1), Type.Literal(2), Type.Literal(3), Type.Literal(4)],
  { ref: 'StickerFormatTypes' },
)

export type StickerFormatTypes = Static<typeof StickerFormatTypesSchema>

export const GuildStickerResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    tags: Type.String(),
    type: StickerTypesSchema,
    format_type: Type.Union([Type.Null(), StickerFormatTypesSchema]),
    description: Type.Union([Type.String(), Type.Null()]),
    available: Type.Boolean(),
    guild_id: SnowflakeTypeSchema,
    user: Type.Optional(UserResponseSchema),
  },
  { ref: 'GuildStickerResponse' },
)

export type GuildStickerResponse = Static<typeof GuildStickerResponseSchema>

export const StandardStickerResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    tags: Type.String(),
    type: StickerTypesSchema,
    format_type: Type.Union([Type.Null(), StickerFormatTypesSchema]),
    description: Type.Union([Type.String(), Type.Null()]),
    pack_id: SnowflakeTypeSchema,
    sort_value: Type.Integer(),
  },
  { ref: 'StandardStickerResponse' },
)

export type StandardStickerResponse = Static<typeof StandardStickerResponseSchema>

export const MessageStickerItemResponseSchema = Type.Object(
  { id: SnowflakeTypeSchema, name: Type.String(), format_type: StickerFormatTypesSchema },
  { ref: 'MessageStickerItemResponse' },
)

export type MessageStickerItemResponse = Static<typeof MessageStickerItemResponseSchema>

export const MessageCallResponseSchema = Type.Object(
  {
    ended_timestamp: Type.Optional(Type.Union([Type.String({ format: 'date-time' }), Type.Null()])),
    participants: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  },
  { ref: 'MessageCallResponse' },
)

export type MessageCallResponse = Static<typeof MessageCallResponseSchema>

export const MessageActivityResponseSchema = Type.Object(
  { type: ActivityActionTypesSchema, party_id: Type.Optional(Type.String()) },
  { ref: 'MessageActivityResponse' },
)

export type MessageActivityResponse = Static<typeof MessageActivityResponseSchema>

export const MessageInteractionResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    name: Type.String(),
    user: Type.Optional(UserResponseSchema),
    name_localized: Type.Optional(Type.String()),
  },
  { ref: 'MessageInteractionResponse' },
)

export type MessageInteractionResponse = Static<typeof MessageInteractionResponseSchema>

export const MessageReferenceTypeSchema = Type.Union(
  [Type.Literal(0, { description: 'Reference to a message' })],
  { ref: 'MessageReferenceType' },
)

export type MessageReferenceType = Static<typeof MessageReferenceTypeSchema>

export const MessageReferenceResponseSchema = Type.Object(
  {
    type: MessageReferenceTypeSchema,
    channel_id: SnowflakeTypeSchema,
    message_id: Type.Optional(SnowflakeTypeSchema),
    guild_id: Type.Optional(SnowflakeTypeSchema),
  },
  { ref: 'MessageReferenceResponse' },
)

export type MessageReferenceResponse = Static<typeof MessageReferenceResponseSchema>

export const VideoQualityModesSchema = Type.Union(
  [
    Type.Literal(1, { description: 'Discord chooses the quality for optimal performance' }),
    Type.Literal(2, { description: '720p' }),
  ],
  { ref: 'VideoQualityModes' },
)

export type VideoQualityModes = Static<typeof VideoQualityModesSchema>

export const ThreadAutoArchiveDurationSchema = Type.Union(
  [
    Type.Literal(60, { description: 'One hour' }),
    Type.Literal(1440, { description: 'One day' }),
    Type.Literal(4320, { description: 'Three days' }),
    Type.Literal(10080, { description: 'Seven days' }),
  ],
  { ref: 'ThreadAutoArchiveDuration' },
)

export type ThreadAutoArchiveDuration = Static<typeof ThreadAutoArchiveDurationSchema>

export const ThreadMetadataResponseSchema = Type.Object(
  {
    archived: Type.Boolean(),
    archive_timestamp: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    auto_archive_duration: ThreadAutoArchiveDurationSchema,
    locked: Type.Boolean(),
    create_timestamp: Type.Optional(Type.String({ format: 'date-time' })),
    invitable: Type.Optional(Type.Boolean()),
  },
  { ref: 'ThreadMetadataResponse' },
)

export type ThreadMetadataResponse = Static<typeof ThreadMetadataResponseSchema>

export const GuildMemberResponseSchema = Type.Object(
  {
    avatar: Type.Union([
      Type.String({ description: "the member's guild avatar hash" }),
      Type.Null(),
    ]),
    avatar_decoration_data: Type.Optional(
      Type.Union([Type.Null(), UserAvatarDecorationResponseSchema], {
        description: "data for the member's guild avatar decoration",
      }),
    ),
    banner: Type.Union([
      Type.String({ description: "the member's guild banner hash" }),
      Type.Null(),
    ]),
    communication_disabled_until: Type.Union([
      Type.String({
        format: 'date-time',
        description:
          "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
      }),
      Type.Null(),
    ]),
    flags: Type.Integer({
      description: 'guild member flags represented as a bit set, defaults to 0',
    }),
    joined_at: Type.String({ format: 'date-time', description: 'when the user joined the guild' }),
    nick: Type.Union([Type.String({ description: "this user's guild nickname" }), Type.Null()]),
    pending: Type.Boolean({
      description:
        "whether the user has not yet passed the guild's Membership Screening requirements",
    }),
    premium_since: Type.Union([
      Type.String({ format: 'date-time', description: 'when the user started boosting the guild' }),
      Type.Null(),
    ]),
    roles: Type.Array(SnowflakeTypeSchema, {
      uniqueItems: true,
      description: 'array of role object ids',
    }),
    collectibles: Type.Optional(
      Type.Union([Type.Null(), UserCollectiblesResponseSchema], {
        description: "data for the member's collectibles",
      }),
    ),
    user: UserResponseSchema,
    mute: Type.Boolean({ description: 'whether the user is muted in voice channels' }),
    deaf: Type.Boolean({ description: 'whether the user is deafened in voice channels' }),
  },
  { ref: 'GuildMemberResponse' },
)

export type GuildMemberResponse = Static<typeof GuildMemberResponseSchema>

export const ThreadMemberResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    user_id: SnowflakeTypeSchema,
    join_timestamp: Type.String({ format: 'date-time' }),
    flags: Type.Integer(),
    member: Type.Optional(GuildMemberResponseSchema),
  },
  { ref: 'ThreadMemberResponse' },
)

export type ThreadMemberResponse = Static<typeof ThreadMemberResponseSchema>

export const ThreadResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    last_message_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    flags: Type.Integer(),
    last_pin_timestamp: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    guild_id: SnowflakeTypeSchema,
    name: Type.String(),
    parent_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    rate_limit_per_user: Type.Optional(Type.Integer()),
    bitrate: Type.Optional(Type.Integer()),
    user_limit: Type.Optional(Type.Integer()),
    rtc_region: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    video_quality_mode: Type.Optional(VideoQualityModesSchema),
    permissions: Type.Optional(Type.String()),
    owner_id: SnowflakeTypeSchema,
    thread_metadata: ThreadMetadataResponseSchema,
    message_count: Type.Integer(),
    member_count: Type.Integer(),
    total_message_sent: Type.Integer(),
    applied_tags: Type.Optional(Type.Array(SnowflakeTypeSchema)),
    member: Type.Optional(ThreadMemberResponseSchema),
  },
  { ref: 'ThreadResponse' },
)

export type ThreadResponse = Static<typeof ThreadResponseSchema>

export const MessageMentionChannelResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    type: ChannelTypesSchema,
    guild_id: SnowflakeTypeSchema,
  },
  { ref: 'MessageMentionChannelResponse' },
)

export type MessageMentionChannelResponse = Static<typeof MessageMentionChannelResponseSchema>

export const MessageRoleSubscriptionDataResponseSchema = Type.Object(
  {
    role_subscription_listing_id: SnowflakeTypeSchema,
    tier_name: Type.String(),
    total_months_subscribed: Type.Integer(),
    is_renewal: Type.Boolean(),
  },
  { ref: 'MessageRoleSubscriptionDataResponse' },
)

export type MessageRoleSubscriptionDataResponse = Static<
  typeof MessageRoleSubscriptionDataResponseSchema
>

export const PurchaseTypeSchema = Type.Union([Type.Literal(0)], { ref: 'PurchaseType' })

export type PurchaseType = Static<typeof PurchaseTypeSchema>

export const GuildProductPurchaseResponseSchema = Type.Object(
  { listing_id: SnowflakeTypeSchema, product_name: Type.String() },
  { ref: 'GuildProductPurchaseResponse' },
)

export type GuildProductPurchaseResponse = Static<typeof GuildProductPurchaseResponseSchema>

export const PurchaseNotificationResponseSchema = Type.Object(
  {
    type: PurchaseTypeSchema,
    guild_product_purchase: Type.Optional(GuildProductPurchaseResponseSchema),
  },
  { ref: 'PurchaseNotificationResponse' },
)

export type PurchaseNotificationResponse = Static<typeof PurchaseNotificationResponseSchema>

export const ChannelPermissionOverwritesSchema = Type.Union([Type.Literal(0), Type.Literal(1)], {
  ref: 'ChannelPermissionOverwrites',
})

export type ChannelPermissionOverwrites = Static<typeof ChannelPermissionOverwritesSchema>

export const ChannelPermissionOverwriteResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: ChannelPermissionOverwritesSchema,
    allow: Type.String(),
    deny: Type.String(),
  },
  { ref: 'ChannelPermissionOverwriteResponse' },
)

export type ChannelPermissionOverwriteResponse = Static<
  typeof ChannelPermissionOverwriteResponseSchema
>

export const ForumTagResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    moderated: Type.Boolean(),
    emoji_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    emoji_name: Type.Union([Type.String(), Type.Null()]),
  },
  { ref: 'ForumTagResponse' },
)

export type ForumTagResponse = Static<typeof ForumTagResponseSchema>

export const DefaultReactionEmojiResponseSchema = Type.Object(
  {
    emoji_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    emoji_name: Type.Union([Type.String(), Type.Null()]),
  },
  { ref: 'DefaultReactionEmojiResponse' },
)

export type DefaultReactionEmojiResponse = Static<typeof DefaultReactionEmojiResponseSchema>

export const ThreadSortOrderSchema = Type.Union(
  [
    Type.Literal(0, { description: 'Sort forum posts by activity' }),
    Type.Literal(1, {
      description: 'Sort forum posts by creation time (from most recent to oldest)',
    }),
  ],
  { ref: 'ThreadSortOrder' },
)

export type ThreadSortOrder = Static<typeof ThreadSortOrderSchema>

export const ForumLayoutSchema = Type.Union(
  [
    Type.Literal(0, { description: 'No default has been set for forum channel' }),
    Type.Literal(1, { description: 'Display posts as a list' }),
    Type.Literal(2, { description: 'Display posts as a collection of tiles' }),
  ],
  { ref: 'ForumLayout' },
)

export type ForumLayout = Static<typeof ForumLayoutSchema>

export const ThreadSearchTagSettingSchema = Type.Union(
  [
    Type.Literal('match_all', {
      description: 'The thread tags must contain all tags in the search query',
    }),
    Type.Literal('match_some', {
      description: 'The thread tags must contain at least one of tags in the search query',
    }),
  ],
  { ref: 'ThreadSearchTagSetting' },
)

export type ThreadSearchTagSetting = Static<typeof ThreadSearchTagSettingSchema>

export const GuildChannelResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    last_message_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    flags: Type.Integer(),
    last_pin_timestamp: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    guild_id: SnowflakeTypeSchema,
    name: Type.String(),
    parent_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    rate_limit_per_user: Type.Optional(Type.Integer()),
    bitrate: Type.Optional(Type.Integer()),
    user_limit: Type.Optional(Type.Integer()),
    rtc_region: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    video_quality_mode: Type.Optional(VideoQualityModesSchema),
    permissions: Type.Optional(Type.String()),
    topic: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    default_auto_archive_duration: Type.Optional(ThreadAutoArchiveDurationSchema),
    default_thread_rate_limit_per_user: Type.Optional(Type.Integer()),
    position: Type.Integer(),
    permission_overwrites: Type.Optional(Type.Array(ChannelPermissionOverwriteResponseSchema)),
    nsfw: Type.Optional(Type.Boolean()),
    available_tags: Type.Optional(Type.Array(ForumTagResponseSchema)),
    default_reaction_emoji: Type.Optional(
      Type.Union([Type.Null(), DefaultReactionEmojiResponseSchema]),
    ),
    default_sort_order: Type.Optional(Type.Union([Type.Null(), ThreadSortOrderSchema])),
    default_forum_layout: Type.Optional(ForumLayoutSchema),
    default_tag_setting: Type.Optional(Type.Union([Type.Null(), ThreadSearchTagSettingSchema])),
  },
  { ref: 'GuildChannelResponse' },
)

export type GuildChannelResponse = Static<typeof GuildChannelResponseSchema>

export const PrivateChannelResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    last_message_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    flags: Type.Integer(),
    last_pin_timestamp: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    recipients: Type.Array(UserResponseSchema),
  },
  { ref: 'PrivateChannelResponse' },
)

export type PrivateChannelResponse = Static<typeof PrivateChannelResponseSchema>

export const PrivateGroupChannelResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    last_message_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    flags: Type.Integer(),
    last_pin_timestamp: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    recipients: Type.Array(UserResponseSchema),
    name: Type.Union([Type.String(), Type.Null()]),
    icon: Type.Union([Type.String(), Type.Null()]),
    owner_id: SnowflakeTypeSchema,
    managed: Type.Optional(Type.Boolean()),
    application_id: Type.Optional(SnowflakeTypeSchema),
  },
  { ref: 'PrivateGroupChannelResponse' },
)

export type PrivateGroupChannelResponse = Static<typeof PrivateGroupChannelResponseSchema>

export const GuildRoleColorsResponseSchema = Type.Object(
  {
    primary_color: Type.Integer(),
    secondary_color: Type.Union([Type.Integer(), Type.Null()]),
    tertiary_color: Type.Union([Type.Integer(), Type.Null()]),
  },
  { ref: 'GuildRoleColorsResponse' },
)

export type GuildRoleColorsResponse = Static<typeof GuildRoleColorsResponseSchema>

export const GuildRoleTagsResponseSchema = Type.Object(
  {
    premium_subscriber: Type.Optional(Type.Null()),
    bot_id: Type.Optional(SnowflakeTypeSchema),
    integration_id: Type.Optional(SnowflakeTypeSchema),
    subscription_listing_id: Type.Optional(SnowflakeTypeSchema),
    available_for_purchase: Type.Optional(Type.Null()),
    guild_connections: Type.Optional(Type.Null()),
  },
  { ref: 'GuildRoleTagsResponse' },
)

export type GuildRoleTagsResponse = Static<typeof GuildRoleTagsResponseSchema>

export const GuildRoleResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    permissions: Type.String(),
    position: Type.Integer(),
    color: Type.Integer(),
    colors: GuildRoleColorsResponseSchema,
    hoist: Type.Boolean(),
    managed: Type.Boolean(),
    mentionable: Type.Boolean(),
    icon: Type.Union([Type.String(), Type.Null()]),
    unicode_emoji: Type.Union([Type.String(), Type.Null()]),
    tags: Type.Optional(GuildRoleTagsResponseSchema),
    flags: Type.Integer(),
  },
  { ref: 'GuildRoleResponse' },
)

export type GuildRoleResponse = Static<typeof GuildRoleResponseSchema>

export const ResolvedObjectsResponseSchema = Type.Object(
  {
    users: Type.Optional(Type.Union([Type.Record(Type.String(), UserResponseSchema), Type.Null()])),
    members: Type.Optional(
      Type.Union([Type.Record(Type.String(), BasicGuildMemberResponseSchema), Type.Null()]),
    ),
    channels: Type.Optional(
      Type.Union([
        Type.Record(
          Type.String(),
          Type.Union([
            GuildChannelResponseSchema,
            PrivateChannelResponseSchema,
            PrivateGroupChannelResponseSchema,
            ThreadResponseSchema,
          ]),
        ),
        Type.Null(),
      ]),
    ),
    roles: Type.Optional(
      Type.Union([Type.Record(Type.String(), GuildRoleResponseSchema), Type.Null()]),
    ),
  },
  { ref: 'ResolvedObjectsResponse' },
)

export type ResolvedObjectsResponse = Static<typeof ResolvedObjectsResponseSchema>

export const MessageReactionEmojiResponseSchema = Type.Object(
  {
    id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    name: Type.Union([Type.String(), Type.Null()]),
    animated: Type.Optional(Type.Boolean()),
  },
  { ref: 'MessageReactionEmojiResponse' },
)

export type MessageReactionEmojiResponse = Static<typeof MessageReactionEmojiResponseSchema>

export const PollMediaResponseSchema = Type.Object(
  {
    text: Type.Optional(Type.String({ description: 'The text of the field' })),
    emoji: Type.Optional(MessageReactionEmojiResponseSchema),
  },
  { ref: 'PollMediaResponse' },
)

export type PollMediaResponse = Static<typeof PollMediaResponseSchema>

export const PollAnswerResponseSchema = Type.Object(
  {
    answer_id: Type.Integer({ description: 'The ID of the answer' }),
    poll_media: PollMediaResponseSchema,
  },
  { ref: 'PollAnswerResponse' },
)

export type PollAnswerResponse = Static<typeof PollAnswerResponseSchema>

export const PollResultsEntryResponseSchema = Type.Object(
  {
    id: Type.Integer({ description: 'The answer_id' }),
    count: Type.Integer({ description: 'The number of votes for this answer' }),
    me_voted: Type.Boolean({ description: 'Whether the current user voted for this answer' }),
  },
  { ref: 'PollResultsEntryResponse' },
)

export type PollResultsEntryResponse = Static<typeof PollResultsEntryResponseSchema>

export const PollResultsResponseSchema = Type.Object(
  {
    answer_counts: Type.Array(PollResultsEntryResponseSchema, {
      description: 'The counts for each answer',
    }),
    is_finalized: Type.Boolean({ description: 'Whether the votes have been precisely counted' }),
  },
  { ref: 'PollResultsResponse' },
)

export type PollResultsResponse = Static<typeof PollResultsResponseSchema>

export const PollResponseSchema = Type.Object(
  {
    question: PollMediaResponseSchema,
    answers: Type.Array(PollAnswerResponseSchema, {
      description: 'Each of the answers available in the poll',
    }),
    expiry: Type.String({ format: 'date-time', description: 'The time when the poll ends' }),
    allow_multiselect: Type.Boolean({ description: 'Whether a user can select multiple answers' }),
    layout_type: PollLayoutTypesSchema,
    results: PollResultsResponseSchema,
  },
  { ref: 'PollResponse' },
)

export type PollResponse = Static<typeof PollResponseSchema>

export const CustomClientThemeResponseSchema = Type.Object(
  {
    colors: Type.Array(Type.String()),
    gradient_angle: Type.Integer(),
    base_mix: Type.Integer(),
    base_theme: MessageShareCustomUserThemeBaseThemeSchema,
  },
  { ref: 'CustomClientThemeResponse' },
)

export type CustomClientThemeResponse = Static<typeof CustomClientThemeResponseSchema>

export const MessageComponentInteractionMetadataResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    user: Type.Optional(UserResponseSchema),
    authorizing_integration_owners: Type.Record(Type.String(), SnowflakeTypeSchema),
    original_response_message_id: Type.Optional(SnowflakeTypeSchema),
    interacted_message_id: SnowflakeTypeSchema,
  },
  { ref: 'MessageComponentInteractionMetadataResponse' },
)

export type MessageComponentInteractionMetadataResponse = Static<
  typeof MessageComponentInteractionMetadataResponseSchema
>

export const ModalSubmitInteractionMetadataResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    user: Type.Optional(UserResponseSchema),
    authorizing_integration_owners: Type.Record(Type.String(), SnowflakeTypeSchema),
    original_response_message_id: Type.Optional(SnowflakeTypeSchema),
    triggering_interaction_metadata: Type.Union([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
    ]),
  },
  { ref: 'ModalSubmitInteractionMetadataResponse' },
)

export type ModalSubmitInteractionMetadataResponse = Static<
  typeof ModalSubmitInteractionMetadataResponseSchema
>

export const MinimalContentMessageResponseSchema = Type.Object(
  {
    type: MessageTypeSchema,
    content: Type.String(),
    mentions: Type.Array(UserResponseSchema),
    mention_roles: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    attachments: Type.Array(MessageAttachmentResponseSchema),
    embeds: Type.Array(MessageEmbedResponseSchema),
    timestamp: Type.String({ format: 'date-time' }),
    edited_timestamp: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    flags: Type.Integer(),
    components: Type.Array(
      Type.Union([
        ActionRowComponentResponseSchema,
        ContainerComponentResponseSchema,
        FileComponentResponseSchema,
        MediaGalleryComponentResponseSchema,
        SectionComponentResponseSchema,
        SeparatorComponentResponseSchema,
        TextDisplayComponentResponseSchema,
      ]),
    ),
    stickers: Type.Optional(
      Type.Array(Type.Union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
    ),
    sticker_items: Type.Optional(Type.Array(MessageStickerItemResponseSchema)),
  },
  { ref: 'MinimalContentMessageResponse' },
)

export type MinimalContentMessageResponse = Static<typeof MinimalContentMessageResponseSchema>

export const MessageSnapshotResponseSchema = Type.Object(
  { message: MinimalContentMessageResponseSchema },
  { ref: 'MessageSnapshotResponse' },
)

export type MessageSnapshotResponse = Static<typeof MessageSnapshotResponseSchema>

export const MessageLobbyMemberResponseSchema = Type.Object(
  { additional_name: Type.String() },
  { ref: 'MessageLobbyMemberResponse' },
)

export type MessageLobbyMemberResponse = Static<typeof MessageLobbyMemberResponseSchema>

export const BasicMessageResponseSchema = Type.Object(
  {
    type: MessageTypeSchema,
    content: Type.String(),
    mentions: Type.Array(UserResponseSchema),
    mention_roles: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    attachments: Type.Array(MessageAttachmentResponseSchema),
    embeds: Type.Array(MessageEmbedResponseSchema),
    timestamp: Type.String({ format: 'date-time' }),
    edited_timestamp: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    flags: Type.Integer(),
    components: Type.Array(
      Type.Union([
        ActionRowComponentResponseSchema,
        ContainerComponentResponseSchema,
        FileComponentResponseSchema,
        MediaGalleryComponentResponseSchema,
        SectionComponentResponseSchema,
        SeparatorComponentResponseSchema,
        TextDisplayComponentResponseSchema,
      ]),
    ),
    stickers: Type.Optional(
      Type.Array(Type.Union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
    ),
    sticker_items: Type.Optional(Type.Array(MessageStickerItemResponseSchema)),
    id: SnowflakeTypeSchema,
    channel_id: SnowflakeTypeSchema,
    author: UserResponseSchema,
    pinned: Type.Boolean(),
    mention_everyone: Type.Boolean(),
    tts: Type.Boolean(),
    call: Type.Optional(MessageCallResponseSchema),
    activity: Type.Optional(MessageActivityResponseSchema),
    application: Type.Optional(BasicApplicationResponseWithBotSchema),
    application_id: Type.Optional(SnowflakeTypeSchema),
    interaction: Type.Optional(MessageInteractionResponseSchema),
    nonce: Type.Optional(
      Type.Union([
        Type.Integer({ minimum: -9223372036854776000, maximum: 9223372036854776000 }),
        Type.String({ maxLength: 25 }),
      ]),
    ),
    webhook_id: Type.Optional(SnowflakeTypeSchema),
    message_reference: Type.Optional(MessageReferenceResponseSchema),
    thread: Type.Optional(ThreadResponseSchema),
    mention_channels: Type.Optional(Type.Array(MessageMentionChannelResponseSchema)),
    role_subscription_data: Type.Optional(MessageRoleSubscriptionDataResponseSchema),
    purchase_notification: Type.Optional(PurchaseNotificationResponseSchema),
    position: Type.Optional(Type.Integer()),
    resolved: Type.Optional(ResolvedObjectsResponseSchema),
    poll: Type.Optional(PollResponseSchema),
    shared_client_theme: Type.Optional(CustomClientThemeResponseSchema),
    interaction_metadata: Type.Optional(
      Type.Union([
        ApplicationCommandInteractionMetadataResponseSchema,
        MessageComponentInteractionMetadataResponseSchema,
        ModalSubmitInteractionMetadataResponseSchema,
      ]),
    ),
    message_snapshots: Type.Optional(Type.Array(MessageSnapshotResponseSchema)),
    lobby_member: Type.Optional(MessageLobbyMemberResponseSchema),
    actor: Type.Optional(UserResponseSchema),
  },
  { ref: 'BasicMessageResponse' },
)

export type BasicMessageResponse = Static<typeof BasicMessageResponseSchema>

export const BlockMessageActionMetadataSchema = Type.Object(
  { custom_message: Type.Optional(Type.Union([Type.String({ maxLength: 300 }), Type.Null()])) },
  { ref: 'BlockMessageActionMetadata' },
)

export type BlockMessageActionMetadata = Static<typeof BlockMessageActionMetadataSchema>

export const BlockMessageActionSchema = Type.Object(
  {
    type: AutomodActionTypeSchema,
    metadata: Type.Optional(Type.Union([Type.Null(), BlockMessageActionMetadataSchema])),
  },
  { ref: 'BlockMessageAction' },
)

export type BlockMessageAction = Static<typeof BlockMessageActionSchema>

export const BlockMessageActionMetadataResponseSchema = Type.Object(
  { custom_message: Type.Optional(Type.String()) },
  { ref: 'BlockMessageActionMetadataResponse' },
)

export type BlockMessageActionMetadataResponse = Static<
  typeof BlockMessageActionMetadataResponseSchema
>

export const BlockMessageActionResponseSchema = Type.Object(
  { type: AutomodActionTypeSchema, metadata: BlockMessageActionMetadataResponseSchema },
  { ref: 'BlockMessageActionResponse' },
)

export type BlockMessageActionResponse = Static<typeof BlockMessageActionResponseSchema>

export const BotAccountPatchRequestSchema = Type.Object(
  {
    username: Type.String({ minLength: 2, maxLength: 32 }),
    avatar: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    banner: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { ref: 'BotAccountPatchRequest' },
)

export type BotAccountPatchRequest = Static<typeof BotAccountPatchRequestSchema>

export const BotAddGuildMemberRequestSchema = Type.Object(
  {
    nick: Type.Optional(Type.Union([Type.String({ maxLength: 32 }), Type.Null()])),
    roles: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 250, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    mute: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    deaf: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    access_token: Type.String({ maxLength: 10240 }),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
  },
  { ref: 'BotAddGuildMemberRequest' },
)

export type BotAddGuildMemberRequest = Static<typeof BotAddGuildMemberRequestSchema>

export const BulkBanUsersRequestSchema = Type.Object(
  {
    user_ids: Type.Array(SnowflakeTypeSchema, { maxItems: 200, uniqueItems: true }),
    delete_message_seconds: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 604800 }), Type.Null()]),
    ),
  },
  { ref: 'BulkBanUsersRequest' },
)

export type BulkBanUsersRequest = Static<typeof BulkBanUsersRequestSchema>

export const BulkBanUsersResponseSchema = Type.Object(
  { banned_users: Type.Array(SnowflakeTypeSchema), failed_users: Type.Array(SnowflakeTypeSchema) },
  { ref: 'BulkBanUsersResponse' },
)

export type BulkBanUsersResponse = Static<typeof BulkBanUsersResponseSchema>

export const BulkLobbyMemberRequestSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    metadata: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ maxLength: 1024 }), { maxProperties: 25 }),
        Type.Null(),
      ]),
    ),
    flags: Type.Optional(Type.Union([Type.Null(), Type.Literal(1)])),
    additional_name: Type.Optional(
      Type.Union([Type.String({ minLength: 1, maxLength: 80 }), Type.Null()]),
    ),
    remove_member: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'BulkLobbyMemberRequest' },
)

export type BulkLobbyMemberRequest = Static<typeof BulkLobbyMemberRequestSchema>

export const RecurrenceRuleWeekdaysSchema = Type.Union(
  [
    Type.Literal(0),
    Type.Literal(1),
    Type.Literal(2),
    Type.Literal(3),
    Type.Literal(4),
    Type.Literal(5),
    Type.Literal(6),
  ],
  { ref: 'RecurrenceRuleWeekdays' },
)

export type RecurrenceRuleWeekdays = Static<typeof RecurrenceRuleWeekdaysSchema>

export const ByNWeekdaySchema = Type.Object(
  {
    n: Type.Integer({
      minimum: 1,
      maximum: 5,
      description: 'The week to reoccur on (1-5, where 5 represents the last week)',
    }),
    day: RecurrenceRuleWeekdaysSchema,
  },
  { ref: 'ByNWeekday' },
)

export type ByNWeekday = Static<typeof ByNWeekdaySchema>

export const ByNWeekdayResponseSchema = Type.Object(
  {
    n: Type.Integer({
      description: 'The week to reoccur on (1-5, where 5 represents the last week)',
    }),
    day: RecurrenceRuleWeekdaysSchema,
  },
  { ref: 'ByNWeekdayResponse' },
)

export type ByNWeekdayResponse = Static<typeof ByNWeekdayResponseSchema>

export const ChannelFollowerResponseSchema = Type.Object(
  { channel_id: SnowflakeTypeSchema, webhook_id: SnowflakeTypeSchema },
  { ref: 'ChannelFollowerResponse' },
)

export type ChannelFollowerResponse = Static<typeof ChannelFollowerResponseSchema>

export const WebhookSourceGuildResponseSchema = Type.Object(
  { id: SnowflakeTypeSchema, icon: Type.Union([Type.String(), Type.Null()]), name: Type.String() },
  { ref: 'WebhookSourceGuildResponse' },
)

export type WebhookSourceGuildResponse = Static<typeof WebhookSourceGuildResponseSchema>

export const WebhookSourceChannelResponseSchema = Type.Object(
  { id: SnowflakeTypeSchema, name: Type.String() },
  { ref: 'WebhookSourceChannelResponse' },
)

export type WebhookSourceChannelResponse = Static<typeof WebhookSourceChannelResponseSchema>

export const ChannelFollowerWebhookResponseSchema = Type.Object(
  {
    application_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    avatar: Type.Union([Type.String(), Type.Null()]),
    channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    guild_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    id: SnowflakeTypeSchema,
    name: Type.String(),
    type: WebhookTypesSchema,
    user: Type.Optional(UserResponseSchema),
    source_guild: Type.Optional(WebhookSourceGuildResponseSchema),
    source_channel: Type.Optional(WebhookSourceChannelResponseSchema),
  },
  { ref: 'ChannelFollowerWebhookResponse' },
)

export type ChannelFollowerWebhookResponse = Static<typeof ChannelFollowerWebhookResponseSchema>

export const ChannelPermissionOverwriteRequestSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: Type.Optional(Type.Union([Type.Null(), ChannelPermissionOverwritesSchema])),
    allow: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    deny: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
  },
  { ref: 'ChannelPermissionOverwriteRequest' },
)

export type ChannelPermissionOverwriteRequest = Static<
  typeof ChannelPermissionOverwriteRequestSchema
>

export const ChannelSelectComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 150 }), Type.Null()])),
    min_values: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 25 }), Type.Null()])),
    max_values: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 25 }), Type.Null()])),
    disabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    default_values: Type.Optional(
      Type.Union([Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }), Type.Null()]),
    ),
    channel_types: Type.Optional(
      Type.Union([Type.Array(ChannelTypesSchema, { uniqueItems: true }), Type.Null()]),
    ),
  },
  { ref: 'ChannelSelectComponentForModalRequest' },
)

export type ChannelSelectComponentForModalRequest = Static<
  typeof ChannelSelectComponentForModalRequestSchema
>

export const CheckboxComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    default: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'CheckboxComponentForModalRequest' },
)

export type CheckboxComponentForModalRequest = Static<typeof CheckboxComponentForModalRequestSchema>

export const CheckboxGroupOptionForRequestSchema = Type.Object(
  {
    label: Type.String({ minLength: 1, maxLength: 100 }),
    value: Type.String({ minLength: 1, maxLength: 100 }),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
    default: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'CheckboxGroupOptionForRequest' },
)

export type CheckboxGroupOptionForRequest = Static<typeof CheckboxGroupOptionForRequestSchema>

export const CheckboxGroupComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    min_values: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 10 }), Type.Null()])),
    max_values: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 10 }), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    options: Type.Array(CheckboxGroupOptionForRequestSchema, { minItems: 1, maxItems: 10 }),
  },
  { ref: 'CheckboxGroupComponentForModalRequest' },
)

export type CheckboxGroupComponentForModalRequest = Static<
  typeof CheckboxGroupComponentForModalRequestSchema
>

export const CommandPermissionResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: ApplicationCommandPermissionTypeSchema,
    permission: Type.Boolean(),
  },
  { ref: 'CommandPermissionResponse' },
)

export type CommandPermissionResponse = Static<typeof CommandPermissionResponseSchema>

export const CommandPermissionsResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    application_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    permissions: Type.Array(CommandPermissionResponseSchema),
  },
  { ref: 'CommandPermissionsResponse' },
)

export type CommandPermissionsResponse = Static<typeof CommandPermissionsResponseSchema>

export const ConnectedAccountGuildResponseSchema = Type.Object(
  { id: SnowflakeTypeSchema, name: Type.String(), icon: Type.Union([Type.String(), Type.Null()]) },
  { ref: 'ConnectedAccountGuildResponse' },
)

export type ConnectedAccountGuildResponse = Static<typeof ConnectedAccountGuildResponseSchema>

export const IntegrationTypesSchema = Type.Union(
  [
    Type.Literal('discord'),
    Type.Literal('twitch'),
    Type.Literal('youtube'),
    Type.Literal('guild_subscription'),
  ],
  { ref: 'IntegrationTypes' },
)

export type IntegrationTypes = Static<typeof IntegrationTypesSchema>

export const ConnectedAccountIntegrationResponseSchema = Type.Object(
  {
    id: Type.String(),
    type: IntegrationTypesSchema,
    account: AccountResponseSchema,
    guild: ConnectedAccountGuildResponseSchema,
  },
  { ref: 'ConnectedAccountIntegrationResponse' },
)

export type ConnectedAccountIntegrationResponse = Static<
  typeof ConnectedAccountIntegrationResponseSchema
>

export const ConnectedAccountProvidersSchema = Type.Union(
  [
    Type.Literal('battlenet'),
    Type.Literal('bluesky'),
    Type.Literal('bungie'),
    Type.Literal('ebay'),
    Type.Literal('epicgames'),
    Type.Literal('facebook'),
    Type.Literal('github'),
    Type.Literal('instagram'),
    Type.Literal('letterboxd'),
    Type.Literal('mastodon'),
    Type.Literal('leagueoflegends'),
    Type.Literal('paypal'),
    Type.Literal('playstation'),
    Type.Literal('reddit'),
    Type.Literal('riotgames'),
    Type.Literal('roblox'),
    Type.Literal('skype'),
    Type.Literal('spotify'),
    Type.Literal('steam'),
    Type.Literal('tiktok'),
    Type.Literal('twitch'),
    Type.Literal('twitter'),
    Type.Literal('xbox'),
    Type.Literal('youtube'),
    Type.Literal('domain'),
  ],
  { ref: 'ConnectedAccountProviders' },
)

export type ConnectedAccountProviders = Static<typeof ConnectedAccountProvidersSchema>

export const ConnectedAccountVisibilitySchema = Type.Union([Type.Literal(0), Type.Literal(1)], {
  ref: 'ConnectedAccountVisibility',
})

export type ConnectedAccountVisibility = Static<typeof ConnectedAccountVisibilitySchema>

export const ConnectedAccountResponseSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.Union([Type.String(), Type.Null()]),
    type: ConnectedAccountProvidersSchema,
    friend_sync: Type.Boolean(),
    integrations: Type.Optional(Type.Array(ConnectedAccountIntegrationResponseSchema)),
    show_activity: Type.Boolean(),
    two_way_link: Type.Boolean(),
    verified: Type.Boolean(),
    visibility: ConnectedAccountVisibilitySchema,
    revoked: Type.Optional(Type.Boolean()),
  },
  { ref: 'ConnectedAccountResponse' },
)

export type ConnectedAccountResponse = Static<typeof ConnectedAccountResponseSchema>

export const EntitlementOwnerTypesSchema = Type.Union(
  [
    Type.Literal(1, { description: 'A guild subscription' }),
    Type.Literal(2, { description: 'A user subscription' }),
  ],
  { ref: 'EntitlementOwnerTypes' },
)

export type EntitlementOwnerTypes = Static<typeof EntitlementOwnerTypesSchema>

export const CreateEntitlementRequestDataSchema = Type.Object(
  {
    sku_id: SnowflakeTypeSchema,
    owner_id: SnowflakeTypeSchema,
    owner_type: EntitlementOwnerTypesSchema,
  },
  { ref: 'CreateEntitlementRequestData' },
)

export type CreateEntitlementRequestData = Static<typeof CreateEntitlementRequestDataSchema>

export const CreateForumThreadRequestSchema = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: 100 }),
    auto_archive_duration: Type.Optional(
      Type.Union([Type.Null(), ThreadAutoArchiveDurationSchema]),
    ),
    rate_limit_per_user: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 21600 }), Type.Null()]),
    ),
    applied_tags: Type.Optional(
      Type.Union([Type.Array(SnowflakeTypeSchema, { maxItems: 5 }), Type.Null()]),
    ),
    message: BaseCreateMessageCreateRequestSchema,
  },
  { ref: 'CreateForumThreadRequest' },
)

export type CreateForumThreadRequest = Static<typeof CreateForumThreadRequestSchema>

export const CreateGroupDMInviteRequestSchema = Type.Object(
  {
    max_age: Type.Optional(
      Type.Union([Type.Integer({ minimum: 1, maximum: 2592000 }), Type.Null()]),
    ),
  },
  { ref: 'CreateGroupDMInviteRequest' },
)

export type CreateGroupDMInviteRequest = Static<typeof CreateGroupDMInviteRequestSchema>

export const UpdateDefaultReactionEmojiRequestSchema = Type.Object(
  {
    emoji_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    emoji_name: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
  },
  { ref: 'UpdateDefaultReactionEmojiRequest' },
)

export type UpdateDefaultReactionEmojiRequest = Static<
  typeof UpdateDefaultReactionEmojiRequestSchema
>

export const CreateOrUpdateThreadTagRequestSchema = Type.Object(
  {
    name: Type.String({ minLength: 0, maxLength: 50 }),
    emoji_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    emoji_name: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
    moderated: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'CreateOrUpdateThreadTagRequest' },
)

export type CreateOrUpdateThreadTagRequest = Static<typeof CreateOrUpdateThreadTagRequestSchema>

export const CreateGuildChannelRequestSchema = Type.Object(
  {
    type: Type.Optional(Type.Union([Type.Null(), ChannelTypesSchema])),
    name: Type.String({ minLength: 1, maxLength: 100 }),
    position: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    topic: Type.Optional(Type.Union([Type.String({ minLength: 0, maxLength: 4096 }), Type.Null()])),
    bitrate: Type.Optional(Type.Union([Type.Integer({ minimum: 8000 }), Type.Null()])),
    user_limit: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    nsfw: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    rate_limit_per_user: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 21600 }), Type.Null()]),
    ),
    parent_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    permission_overwrites: Type.Optional(
      Type.Union([
        Type.Array(ChannelPermissionOverwriteRequestSchema, { maxItems: 100 }),
        Type.Null(),
      ]),
    ),
    rtc_region: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    video_quality_mode: Type.Optional(Type.Union([Type.Null(), VideoQualityModesSchema])),
    default_auto_archive_duration: Type.Optional(
      Type.Union([Type.Null(), ThreadAutoArchiveDurationSchema]),
    ),
    default_reaction_emoji: Type.Optional(
      Type.Union([Type.Null(), UpdateDefaultReactionEmojiRequestSchema]),
    ),
    default_thread_rate_limit_per_user: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 21600 }), Type.Null()]),
    ),
    default_sort_order: Type.Optional(Type.Union([Type.Null(), ThreadSortOrderSchema])),
    default_forum_layout: Type.Optional(Type.Union([Type.Null(), ForumLayoutSchema])),
    default_tag_setting: Type.Optional(Type.Union([Type.Null(), ThreadSearchTagSettingSchema])),
    available_tags: Type.Optional(
      Type.Union([
        Type.Array(Type.Union([Type.Null(), CreateOrUpdateThreadTagRequestSchema]), {
          maxItems: 20,
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'CreateGuildChannelRequest' },
)

export type CreateGuildChannelRequest = Static<typeof CreateGuildChannelRequestSchema>

export const InviteTargetTypesSchema = Type.Union(
  [Type.Literal(1), Type.Literal(2), Type.Literal(3)],
  { ref: 'InviteTargetTypes' },
)

export type InviteTargetTypes = Static<typeof InviteTargetTypesSchema>

export const CreateGuildInviteRequestSchema = Type.Object(
  {
    max_age: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 5184000 }), Type.Null()]),
    ),
    temporary: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    max_uses: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 100 }), Type.Null()])),
    unique: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    target_user_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    target_application_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    target_type: Type.Optional(Type.Union([Type.Null(), InviteTargetTypesSchema])),
    role_ids: Type.Optional(
      Type.Union([
        Type.String(),
        Type.Array(SnowflakeTypeSchema, { maxItems: 250, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    target_user_ids: Type.Optional(
      Type.Union(
        [
          Type.String(),
          Type.Array(SnowflakeTypeSchema, { maxItems: 1000, uniqueItems: true }),
          Type.Null(),
        ],
        { description: 'The IDs of the users to target with this invite.' },
      ),
    ),
  },
  { ref: 'CreateGuildInviteRequest' },
)

export type CreateGuildInviteRequest = Static<typeof CreateGuildInviteRequestSchema>

export const IncomingWebhookInteractionRequestSchema = Type.Object(
  {
    content: Type.Optional(Type.Union([Type.String({ maxLength: 2000 }), Type.Null()])),
    embeds: Type.Optional(Type.Union([Type.Array(RichEmbedSchema, { maxItems: 10 }), Type.Null()])),
    allowed_mentions: Type.Optional(Type.Union([Type.Null(), MessageAllowedMentionsRequestSchema])),
    components: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
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
        Type.Null(),
      ]),
    ),
    attachments: Type.Optional(
      Type.Union([Type.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), Type.Null()]),
    ),
    poll: Type.Optional(Type.Union([Type.Null(), PollCreateRequestSchema])),
    tts: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
  },
  { ref: 'IncomingWebhookInteractionRequest' },
)

export type IncomingWebhookInteractionRequest = Static<
  typeof IncomingWebhookInteractionRequestSchema
>

export const CreateMessageInteractionCallbackRequestSchema = Type.Object(
  {
    type: InteractionCallbackTypesSchema,
    data: Type.Optional(Type.Union([Type.Null(), IncomingWebhookInteractionRequestSchema])),
  },
  { ref: 'CreateMessageInteractionCallbackRequest' },
)

export type CreateMessageInteractionCallbackRequest = Static<
  typeof CreateMessageInteractionCallbackRequestSchema
>

export const MessageReactionCountDetailsResponseSchema = Type.Object(
  { burst: Type.Integer(), normal: Type.Integer() },
  { ref: 'MessageReactionCountDetailsResponse' },
)

export type MessageReactionCountDetailsResponse = Static<
  typeof MessageReactionCountDetailsResponseSchema
>

export const MessageReactionResponseSchema = Type.Object(
  {
    emoji: MessageReactionEmojiResponseSchema,
    count: Type.Integer(),
    count_details: MessageReactionCountDetailsResponseSchema,
    burst_colors: Type.Array(Type.String()),
    me_burst: Type.Boolean(),
    me: Type.Boolean(),
  },
  { ref: 'MessageReactionResponse' },
)

export type MessageReactionResponse = Static<typeof MessageReactionResponseSchema>

export const MessageResponseSchema = Type.Object(
  {
    type: MessageTypeSchema,
    content: Type.String(),
    mentions: Type.Array(UserResponseSchema),
    mention_roles: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    attachments: Type.Array(MessageAttachmentResponseSchema),
    embeds: Type.Array(MessageEmbedResponseSchema),
    timestamp: Type.String({ format: 'date-time' }),
    edited_timestamp: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    flags: Type.Integer(),
    components: Type.Array(
      Type.Union([
        ActionRowComponentResponseSchema,
        ContainerComponentResponseSchema,
        FileComponentResponseSchema,
        MediaGalleryComponentResponseSchema,
        SectionComponentResponseSchema,
        SeparatorComponentResponseSchema,
        TextDisplayComponentResponseSchema,
      ]),
    ),
    stickers: Type.Optional(
      Type.Array(Type.Union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
    ),
    sticker_items: Type.Optional(Type.Array(MessageStickerItemResponseSchema)),
    id: SnowflakeTypeSchema,
    channel_id: SnowflakeTypeSchema,
    author: UserResponseSchema,
    pinned: Type.Boolean(),
    mention_everyone: Type.Boolean(),
    tts: Type.Boolean(),
    call: Type.Optional(MessageCallResponseSchema),
    activity: Type.Optional(MessageActivityResponseSchema),
    application: Type.Optional(BasicApplicationResponseWithBotSchema),
    application_id: Type.Optional(SnowflakeTypeSchema),
    interaction: Type.Optional(MessageInteractionResponseSchema),
    nonce: Type.Optional(
      Type.Union([
        Type.Integer({ minimum: -9223372036854776000, maximum: 9223372036854776000 }),
        Type.String({ maxLength: 25 }),
      ]),
    ),
    webhook_id: Type.Optional(SnowflakeTypeSchema),
    message_reference: Type.Optional(MessageReferenceResponseSchema),
    thread: Type.Optional(ThreadResponseSchema),
    mention_channels: Type.Optional(Type.Array(MessageMentionChannelResponseSchema)),
    role_subscription_data: Type.Optional(MessageRoleSubscriptionDataResponseSchema),
    purchase_notification: Type.Optional(PurchaseNotificationResponseSchema),
    position: Type.Optional(Type.Integer()),
    resolved: Type.Optional(ResolvedObjectsResponseSchema),
    poll: Type.Optional(PollResponseSchema),
    shared_client_theme: Type.Optional(CustomClientThemeResponseSchema),
    interaction_metadata: Type.Optional(
      Type.Union([
        ApplicationCommandInteractionMetadataResponseSchema,
        MessageComponentInteractionMetadataResponseSchema,
        ModalSubmitInteractionMetadataResponseSchema,
      ]),
    ),
    message_snapshots: Type.Optional(Type.Array(MessageSnapshotResponseSchema)),
    lobby_member: Type.Optional(MessageLobbyMemberResponseSchema),
    actor: Type.Optional(UserResponseSchema),
    reactions: Type.Optional(Type.Array(MessageReactionResponseSchema)),
    referenced_message: Type.Optional(Type.Union([Type.Null(), BasicMessageResponseSchema])),
  },
  { ref: 'MessageResponse' },
)

export type MessageResponse = Static<typeof MessageResponseSchema>

export const CreateMessageInteractionCallbackResponseSchema = Type.Object(
  { type: InteractionCallbackTypesSchema, message: MessageResponseSchema },
  { ref: 'CreateMessageInteractionCallbackResponse' },
)

export type CreateMessageInteractionCallbackResponse = Static<
  typeof CreateMessageInteractionCallbackResponseSchema
>

export const CreatePrivateChannelRequestSchema = Type.Object(
  {
    recipient_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    access_tokens: Type.Optional(
      Type.Union([
        Type.Array(Type.String({ maxLength: 152133 }), { maxItems: 1521, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    nicks: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]), {
          maxProperties: 1521,
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'CreatePrivateChannelRequest' },
)

export type CreatePrivateChannelRequest = Static<typeof CreatePrivateChannelRequestSchema>

export const RoleColorsSchema = Type.Object(
  {
    primary_color: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 16777215 }), Type.Null()]),
    ),
    secondary_color: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 16777215 }), Type.Null()]),
    ),
    tertiary_color: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 16777215 }), Type.Null()]),
    ),
  },
  { ref: 'RoleColors' },
)

export type RoleColors = Static<typeof RoleColorsSchema>

export const CreateRoleRequestSchema = Type.Object(
  {
    name: Type.Optional(Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()])),
    permissions: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    color: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 16777215 }), Type.Null()]),
    ),
    colors: Type.Optional(Type.Union([Type.Null(), RoleColorsSchema])),
    hoist: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    mentionable: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    icon: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    unicode_emoji: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
  },
  { ref: 'CreateRoleRequest' },
)

export type CreateRoleRequest = Static<typeof CreateRoleRequestSchema>

export const CreateTextThreadWithMessageRequestSchema = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: 100 }),
    auto_archive_duration: Type.Optional(
      Type.Union([Type.Null(), ThreadAutoArchiveDurationSchema]),
    ),
    rate_limit_per_user: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 21600 }), Type.Null()]),
    ),
  },
  { ref: 'CreateTextThreadWithMessageRequest' },
)

export type CreateTextThreadWithMessageRequest = Static<
  typeof CreateTextThreadWithMessageRequestSchema
>

export const CreateTextThreadWithoutMessageRequestSchema = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: 100 }),
    auto_archive_duration: Type.Optional(
      Type.Union([Type.Null(), ThreadAutoArchiveDurationSchema]),
    ),
    rate_limit_per_user: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 21600 }), Type.Null()]),
    ),
    type: Type.Optional(Type.Union([Type.Null(), ChannelTypesSchema])),
    invitable: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'CreateTextThreadWithoutMessageRequest' },
)

export type CreateTextThreadWithoutMessageRequest = Static<
  typeof CreateTextThreadWithoutMessageRequestSchema
>

export const CreatedThreadResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    last_message_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    flags: Type.Integer(),
    last_pin_timestamp: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    guild_id: SnowflakeTypeSchema,
    name: Type.String(),
    parent_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    rate_limit_per_user: Type.Optional(Type.Integer()),
    bitrate: Type.Optional(Type.Integer()),
    user_limit: Type.Optional(Type.Integer()),
    rtc_region: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    video_quality_mode: Type.Optional(VideoQualityModesSchema),
    permissions: Type.Optional(Type.String()),
    owner_id: SnowflakeTypeSchema,
    thread_metadata: ThreadMetadataResponseSchema,
    message_count: Type.Integer(),
    member_count: Type.Integer(),
    total_message_sent: Type.Integer(),
    applied_tags: Type.Optional(Type.Array(SnowflakeTypeSchema)),
    member: Type.Optional(ThreadMemberResponseSchema),
  },
  { ref: 'CreatedThreadResponse' },
)

export type CreatedThreadResponse = Static<typeof CreatedThreadResponseSchema>

export const DefaultKeywordListTriggerMetadataSchema = Type.Object(
  {
    allow_list: Type.Optional(
      Type.Union([
        Type.Array(Type.String({ minLength: 1, maxLength: 60 }), { maxItems: 1000 }),
        Type.Null(),
      ]),
    ),
    presets: Type.Optional(
      Type.Union([Type.Array(AutomodKeywordPresetTypeSchema, { uniqueItems: true }), Type.Null()]),
    ),
  },
  { ref: 'DefaultKeywordListTriggerMetadata' },
)

export type DefaultKeywordListTriggerMetadata = Static<
  typeof DefaultKeywordListTriggerMetadataSchema
>

export const DefaultKeywordListTriggerMetadataResponseSchema = Type.Object(
  {
    allow_list: Type.Array(Type.String()),
    presets: Type.Array(AutomodKeywordPresetTypeSchema, { uniqueItems: true }),
  },
  { ref: 'DefaultKeywordListTriggerMetadataResponse' },
)

export type DefaultKeywordListTriggerMetadataResponse = Static<
  typeof DefaultKeywordListTriggerMetadataResponseSchema
>

export const FlagToChannelActionMetadataSchema = Type.Object(
  { channel_id: SnowflakeTypeSchema },
  { ref: 'FlagToChannelActionMetadata' },
)

export type FlagToChannelActionMetadata = Static<typeof FlagToChannelActionMetadataSchema>

export const FlagToChannelActionSchema = Type.Object(
  { type: AutomodActionTypeSchema, metadata: FlagToChannelActionMetadataSchema },
  { ref: 'FlagToChannelAction' },
)

export type FlagToChannelAction = Static<typeof FlagToChannelActionSchema>

export const QuarantineUserActionMetadataSchema = Type.Object(
  {},
  { ref: 'QuarantineUserActionMetadata' },
)

export type QuarantineUserActionMetadata = Static<typeof QuarantineUserActionMetadataSchema>

export const QuarantineUserActionSchema = Type.Object(
  {
    type: AutomodActionTypeSchema,
    metadata: Type.Optional(Type.Union([Type.Null(), QuarantineUserActionMetadataSchema])),
  },
  { ref: 'QuarantineUserAction' },
)

export type QuarantineUserAction = Static<typeof QuarantineUserActionSchema>

export const UserCommunicationDisabledActionMetadataSchema = Type.Object(
  {
    duration_seconds: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 2419200 }), Type.Null()]),
    ),
  },
  { ref: 'UserCommunicationDisabledActionMetadata' },
)

export type UserCommunicationDisabledActionMetadata = Static<
  typeof UserCommunicationDisabledActionMetadataSchema
>

export const UserCommunicationDisabledActionSchema = Type.Object(
  { type: AutomodActionTypeSchema, metadata: UserCommunicationDisabledActionMetadataSchema },
  { ref: 'UserCommunicationDisabledAction' },
)

export type UserCommunicationDisabledAction = Static<typeof UserCommunicationDisabledActionSchema>

export const DefaultKeywordListUpsertRequestSchema = Type.Object(
  {
    name: Type.String({ maxLength: 100 }),
    event_type: AutomodEventTypeSchema,
    actions: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
          { minItems: 1, maxItems: 5 },
        ),
        Type.Null(),
      ]),
    ),
    enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    exempt_roles: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    exempt_channels: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: DefaultKeywordListTriggerMetadataSchema,
  },
  { ref: 'DefaultKeywordListUpsertRequest' },
)

export type DefaultKeywordListUpsertRequest = Static<typeof DefaultKeywordListUpsertRequestSchema>

export const DefaultKeywordListUpsertRequestPartialSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ maxLength: 100 })),
    event_type: Type.Optional(AutomodEventTypeSchema),
    actions: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
          { minItems: 1, maxItems: 5 },
        ),
        Type.Null(),
      ]),
    ),
    enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    exempt_roles: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    exempt_channels: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    trigger_type: Type.Optional(AutomodTriggerTypeSchema),
    trigger_metadata: Type.Optional(DefaultKeywordListTriggerMetadataSchema),
  },
  { ref: 'DefaultKeywordListUpsertRequestPartial' },
)

export type DefaultKeywordListUpsertRequestPartial = Static<
  typeof DefaultKeywordListUpsertRequestPartialSchema
>

export const FlagToChannelActionMetadataResponseSchema = Type.Object(
  { channel_id: SnowflakeTypeSchema },
  { ref: 'FlagToChannelActionMetadataResponse' },
)

export type FlagToChannelActionMetadataResponse = Static<
  typeof FlagToChannelActionMetadataResponseSchema
>

export const FlagToChannelActionResponseSchema = Type.Object(
  { type: AutomodActionTypeSchema, metadata: FlagToChannelActionMetadataResponseSchema },
  { ref: 'FlagToChannelActionResponse' },
)

export type FlagToChannelActionResponse = Static<typeof FlagToChannelActionResponseSchema>

export const QuarantineUserActionMetadataResponseSchema = Type.Object(
  {},
  { ref: 'QuarantineUserActionMetadataResponse' },
)

export type QuarantineUserActionMetadataResponse = Static<
  typeof QuarantineUserActionMetadataResponseSchema
>

export const QuarantineUserActionResponseSchema = Type.Object(
  { type: AutomodActionTypeSchema, metadata: QuarantineUserActionMetadataResponseSchema },
  { ref: 'QuarantineUserActionResponse' },
)

export type QuarantineUserActionResponse = Static<typeof QuarantineUserActionResponseSchema>

export const UserCommunicationDisabledActionMetadataResponseSchema = Type.Object(
  { duration_seconds: Type.Integer() },
  { ref: 'UserCommunicationDisabledActionMetadataResponse' },
)

export type UserCommunicationDisabledActionMetadataResponse = Static<
  typeof UserCommunicationDisabledActionMetadataResponseSchema
>

export const UserCommunicationDisabledActionResponseSchema = Type.Object(
  {
    type: AutomodActionTypeSchema,
    metadata: UserCommunicationDisabledActionMetadataResponseSchema,
  },
  { ref: 'UserCommunicationDisabledActionResponse' },
)

export type UserCommunicationDisabledActionResponse = Static<
  typeof UserCommunicationDisabledActionResponseSchema
>

export const DefaultKeywordRuleResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    creator_id: SnowflakeTypeSchema,
    name: Type.String(),
    event_type: AutomodEventTypeSchema,
    actions: Type.Array(
      Type.Union([
        BlockMessageActionResponseSchema,
        FlagToChannelActionResponseSchema,
        QuarantineUserActionResponseSchema,
        UserCommunicationDisabledActionResponseSchema,
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    enabled: Type.Boolean(),
    exempt_roles: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    exempt_channels: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    trigger_metadata: DefaultKeywordListTriggerMetadataResponseSchema,
  },
  { ref: 'DefaultKeywordRuleResponse' },
)

export type DefaultKeywordRuleResponse = Static<typeof DefaultKeywordRuleResponseSchema>

export const IntegrationApplicationResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    icon: Type.Union([Type.String(), Type.Null()]),
    description: Type.String(),
    type: Type.Union([Type.Null(), ApplicationTypesSchema]),
    cover_image: Type.Optional(Type.String()),
    primary_sku_id: Type.Optional(SnowflakeTypeSchema),
    flags: Type.Integer(),
    flags_new: Type.String(),
    bot: Type.Optional(UserResponseSchema),
  },
  { ref: 'IntegrationApplicationResponse' },
)

export type IntegrationApplicationResponse = Static<typeof IntegrationApplicationResponseSchema>

export const DiscordIntegrationResponseSchema = Type.Object(
  {
    type: IntegrationTypesSchema,
    name: Type.Union([Type.String(), Type.Null()]),
    account: AccountResponseSchema,
    enabled: Type.Boolean(),
    id: SnowflakeTypeSchema,
    application: IntegrationApplicationResponseSchema,
    scopes: Type.Array(OAuth2ScopesSchema, { uniqueItems: true }),
    user: Type.Optional(UserResponseSchema),
  },
  { ref: 'DiscordIntegrationResponse' },
)

export type DiscordIntegrationResponse = Static<typeof DiscordIntegrationResponseSchema>

export const EmbeddedActivityLocationKindSchema = Type.Union(
  [
    Type.Literal('gc', { description: 'guild channel' }),
    Type.Literal('pc', { description: 'private channel' }),
    Type.Literal('party', { description: 'party' }),
  ],
  { ref: 'EmbeddedActivityLocationKind' },
)

export type EmbeddedActivityLocationKind = Static<typeof EmbeddedActivityLocationKindSchema>

export const GuildChannelLocationSchema = Type.Object(
  {
    id: Type.String(),
    kind: EmbeddedActivityLocationKindSchema,
    channel_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
  },
  { ref: 'GuildChannelLocation' },
)

export type GuildChannelLocation = Static<typeof GuildChannelLocationSchema>

export const PrivateChannelLocationSchema = Type.Object(
  { id: Type.String(), kind: EmbeddedActivityLocationKindSchema, channel_id: SnowflakeTypeSchema },
  { ref: 'PrivateChannelLocation' },
)

export type PrivateChannelLocation = Static<typeof PrivateChannelLocationSchema>

export const EmbeddedActivityInstanceSchema = Type.Object(
  {
    application_id: SnowflakeTypeSchema,
    instance_id: Type.String(),
    launch_id: Type.String(),
    location: Type.Union([GuildChannelLocationSchema, PrivateChannelLocationSchema]),
    users: Type.Array(SnowflakeTypeSchema),
  },
  { ref: 'EmbeddedActivityInstance' },
)

export type EmbeddedActivityInstance = Static<typeof EmbeddedActivityInstanceSchema>

export const EmojiResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    user: Type.Optional(UserResponseSchema),
    roles: Type.Array(SnowflakeTypeSchema),
    require_colons: Type.Boolean(),
    managed: Type.Boolean(),
    animated: Type.Boolean(),
    available: Type.Boolean(),
  },
  { ref: 'EmojiResponse' },
)

export type EmojiResponse = Static<typeof EmojiResponseSchema>

export const EntitlementTypesSchema = Type.Union([Type.Literal(8), Type.Literal(10)], {
  ref: 'EntitlementTypes',
})

export type EntitlementTypes = Static<typeof EntitlementTypesSchema>

export const EntitlementTenantFulfillmentStatusResponseSchema = Type.Union(
  [
    Type.Literal(0),
    Type.Literal(1),
    Type.Literal(2),
    Type.Literal(3),
    Type.Literal(4),
    Type.Literal(5),
    Type.Literal(6),
    Type.Literal(7),
  ],
  { ref: 'EntitlementTenantFulfillmentStatusResponse' },
)

export type EntitlementTenantFulfillmentStatusResponse = Static<
  typeof EntitlementTenantFulfillmentStatusResponseSchema
>

export const EntitlementResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    sku_id: SnowflakeTypeSchema,
    application_id: SnowflakeTypeSchema,
    user_id: SnowflakeTypeSchema,
    guild_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    deleted: Type.Boolean(),
    starts_at: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ends_at: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    type: EntitlementTypesSchema,
    fulfilled_at: Type.Optional(Type.Union([Type.String({ format: 'date-time' }), Type.Null()])),
    fulfillment_status: Type.Optional(
      Type.Union([Type.Null(), EntitlementTenantFulfillmentStatusResponseSchema]),
    ),
    consumed: Type.Optional(Type.Boolean()),
    gifter_user_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    parent_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
  },
  { ref: 'EntitlementResponse' },
)

export type EntitlementResponse = Static<typeof EntitlementResponseSchema>

export const EntityMetadataExternalSchema = Type.Object(
  { location: Type.String({ maxLength: 100 }) },
  { ref: 'EntityMetadataExternal' },
)

export type EntityMetadataExternal = Static<typeof EntityMetadataExternalSchema>

export const EntityMetadataExternalResponseSchema = Type.Object(
  { location: Type.String({ description: 'Location of the external event' }) },
  { ref: 'EntityMetadataExternalResponse' },
)

export type EntityMetadataExternalResponse = Static<typeof EntityMetadataExternalResponseSchema>

export const EntityMetadataStageInstanceSchema = Type.Object(
  {},
  { ref: 'EntityMetadataStageInstance' },
)

export type EntityMetadataStageInstance = Static<typeof EntityMetadataStageInstanceSchema>

export const EntityMetadataStageInstanceResponseSchema = Type.Object(
  {},
  { ref: 'EntityMetadataStageInstanceResponse' },
)

export type EntityMetadataStageInstanceResponse = Static<
  typeof EntityMetadataStageInstanceResponseSchema
>

export const EntityMetadataVoiceSchema = Type.Object({}, { ref: 'EntityMetadataVoice' })

export type EntityMetadataVoice = Static<typeof EntityMetadataVoiceSchema>

export const EntityMetadataVoiceResponseSchema = Type.Object(
  {},
  { ref: 'EntityMetadataVoiceResponse' },
)

export type EntityMetadataVoiceResponse = Static<typeof EntityMetadataVoiceResponseSchema>

export const IntegrationExpireBehaviorTypesSchema = Type.Union(
  [Type.Literal(0, { description: 'Remove role' }), Type.Literal(1, { description: 'Kick' })],
  { ref: 'IntegrationExpireBehaviorTypes' },
)

export type IntegrationExpireBehaviorTypes = Static<typeof IntegrationExpireBehaviorTypesSchema>

export const IntegrationExpireGracePeriodTypesSchema = Type.Union(
  [
    Type.Literal(1, { description: '1 day' }),
    Type.Literal(3, { description: '3 days' }),
    Type.Literal(7, { description: '7 days' }),
    Type.Literal(14, { description: '14 days' }),
    Type.Literal(30, { description: '30 days' }),
  ],
  { ref: 'IntegrationExpireGracePeriodTypes' },
)

export type IntegrationExpireGracePeriodTypes = Static<
  typeof IntegrationExpireGracePeriodTypesSchema
>

export const ExternalConnectionIntegrationResponseSchema = Type.Object(
  {
    type: IntegrationTypesSchema,
    name: Type.Union([Type.String(), Type.Null()]),
    account: AccountResponseSchema,
    enabled: Type.Boolean(),
    id: Type.String(),
    user: UserResponseSchema,
    revoked: Type.Optional(Type.Boolean()),
    expire_behavior: Type.Optional(IntegrationExpireBehaviorTypesSchema),
    expire_grace_period: Type.Optional(IntegrationExpireGracePeriodTypesSchema),
    subscriber_count: Type.Optional(Type.Integer()),
    synced_at: Type.Optional(Type.String({ format: 'date-time' })),
    role_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    syncing: Type.Optional(Type.Boolean()),
    enable_emoticons: Type.Optional(Type.Boolean()),
  },
  { ref: 'ExternalConnectionIntegrationResponse' },
)

export type ExternalConnectionIntegrationResponse = Static<
  typeof ExternalConnectionIntegrationResponseSchema
>

export const GuildScheduledEventPrivacyLevelsSchema = Type.Union(
  [Type.Literal(2, { description: 'the scheduled event is only accessible to guild members' })],
  { ref: 'GuildScheduledEventPrivacyLevels' },
)

export type GuildScheduledEventPrivacyLevels = Static<typeof GuildScheduledEventPrivacyLevelsSchema>

export const GuildScheduledEventEntityTypesSchema = Type.Union(
  [Type.Literal(0), Type.Literal(1), Type.Literal(2), Type.Literal(3)],
  { ref: 'GuildScheduledEventEntityTypes' },
)

export type GuildScheduledEventEntityTypes = Static<typeof GuildScheduledEventEntityTypesSchema>

export const RecurrenceRuleFrequenciesSchema = Type.Union(
  [Type.Literal(3), Type.Literal(2), Type.Literal(1), Type.Literal(0)],
  { ref: 'RecurrenceRuleFrequencies' },
)

export type RecurrenceRuleFrequencies = Static<typeof RecurrenceRuleFrequenciesSchema>

export const RecurrenceRuleMonthsSchema = Type.Union(
  [
    Type.Literal(1),
    Type.Literal(2),
    Type.Literal(3),
    Type.Literal(4),
    Type.Literal(5),
    Type.Literal(6),
    Type.Literal(7),
    Type.Literal(8),
    Type.Literal(9),
    Type.Literal(10),
    Type.Literal(11),
    Type.Literal(12),
  ],
  { ref: 'RecurrenceRuleMonths' },
)

export type RecurrenceRuleMonths = Static<typeof RecurrenceRuleMonthsSchema>

export const RecurrenceRuleSchema = Type.Object(
  {
    start: Type.String({
      format: 'date-time',
      description: 'Starting time of the recurrence interval',
    }),
    end: Type.Optional(
      Type.Union([
        Type.String({ format: 'date-time', description: 'Ending time of the recurrence interval' }),
        Type.Null(),
      ]),
    ),
    frequency: RecurrenceRuleFrequenciesSchema,
    interval: Type.Optional(
      Type.Union([
        Type.Integer({ description: 'The spacing between events, defined by frequency' }),
        Type.Null(),
      ]),
    ),
    by_weekday: Type.Optional(
      Type.Union([
        Type.Array(RecurrenceRuleWeekdaysSchema, {
          maxItems: 7,
          uniqueItems: true,
          description: 'Set of specific days within a week for the event to recur on',
        }),
        Type.Null(),
      ]),
    ),
    by_n_weekday: Type.Optional(
      Type.Union([
        Type.Array(ByNWeekdaySchema, {
          maxItems: 7,
          description: 'List of specific days within a specific week to recur on',
        }),
        Type.Null(),
      ]),
    ),
    by_month: Type.Optional(
      Type.Union([
        Type.Array(RecurrenceRuleMonthsSchema, {
          maxItems: 12,
          uniqueItems: true,
          description: 'Set of specific months to recur on',
        }),
        Type.Null(),
      ]),
    ),
    by_month_day: Type.Optional(
      Type.Union([
        Type.Array(Type.Integer({ minimum: -1, maximum: 31 }), {
          maxItems: 33,
          uniqueItems: true,
          description: 'Set of specific dates within a month to recur on',
        }),
        Type.Null(),
      ]),
    ),
    by_year_day: Type.Optional(
      Type.Union([
        Type.Array(Type.Integer({ minimum: -1, maximum: 365 }), {
          maxItems: 367,
          uniqueItems: true,
          description: 'Set of days within a year to recur on (1-364)',
        }),
        Type.Null(),
      ]),
    ),
    count: Type.Optional(
      Type.Union([
        Type.Integer({ description: 'Total number of times the event is allowed to recur' }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'RecurrenceRule' },
)

export type RecurrenceRule = Static<typeof RecurrenceRuleSchema>

export const ExternalScheduledEventCreateRequestSchema = Type.Object(
  {
    name: Type.String({ maxLength: 100 }),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 1000 }), Type.Null()])),
    image: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    scheduled_start_time: Type.String({ format: 'date-time' }),
    scheduled_end_time: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    recurrence_rule: Type.Optional(
      Type.Union([Type.Null(), RecurrenceRuleSchema], {
        description: 'Recurrence rule for the scheduled event',
      }),
    ),
    entity_metadata: EntityMetadataExternalSchema,
  },
  { ref: 'ExternalScheduledEventCreateRequest' },
)

export type ExternalScheduledEventCreateRequest = Static<
  typeof ExternalScheduledEventCreateRequestSchema
>

export const GuildScheduledEventStatusesSchema = Type.Union(
  [Type.Literal(1), Type.Literal(2), Type.Literal(3), Type.Literal(4)],
  { ref: 'GuildScheduledEventStatuses' },
)

export type GuildScheduledEventStatuses = Static<typeof GuildScheduledEventStatusesSchema>

export const ExternalScheduledEventPatchRequestPartialSchema = Type.Object(
  {
    status: Type.Optional(Type.Union([Type.Null(), GuildScheduledEventStatusesSchema])),
    name: Type.Optional(Type.String({ maxLength: 100 })),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 1000 }), Type.Null()])),
    image: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    scheduled_start_time: Type.Optional(Type.String({ format: 'date-time' })),
    scheduled_end_time: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    entity_type: Type.Optional(Type.Union([Type.Null(), GuildScheduledEventEntityTypesSchema])),
    privacy_level: Type.Optional(GuildScheduledEventPrivacyLevelsSchema),
    channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    recurrence_rule: Type.Optional(
      Type.Union([Type.Null(), RecurrenceRuleSchema], {
        description: 'Recurrence rule for the scheduled event',
      }),
    ),
    entity_metadata: Type.Optional(EntityMetadataExternalSchema),
  },
  { ref: 'ExternalScheduledEventPatchRequestPartial' },
)

export type ExternalScheduledEventPatchRequestPartial = Static<
  typeof ExternalScheduledEventPatchRequestPartialSchema
>

export const RecurrenceRuleResponseSchema = Type.Object(
  {
    start: Type.String({
      format: 'date-time',
      description: 'Starting time of the recurrence interval',
    }),
    end: Type.Optional(
      Type.Union([
        Type.String({ format: 'date-time', description: 'Ending time of the recurrence interval' }),
        Type.Null(),
      ]),
    ),
    frequency: RecurrenceRuleFrequenciesSchema,
    interval: Type.Integer({ description: 'The spacing between events, defined by frequency' }),
    by_weekday: Type.Union([
      Type.Array(RecurrenceRuleWeekdaysSchema, {
        uniqueItems: true,
        description: 'Set of specific days within a week for the event to recur on',
      }),
      Type.Null(),
    ]),
    by_n_weekday: Type.Union([
      Type.Array(ByNWeekdayResponseSchema, {
        description: 'List of specific days within a specific week to recur on',
      }),
      Type.Null(),
    ]),
    by_month: Type.Union([
      Type.Array(RecurrenceRuleMonthsSchema, {
        uniqueItems: true,
        description: 'Set of specific months to recur on',
      }),
      Type.Null(),
    ]),
    by_month_day: Type.Union([
      Type.Array(Type.Integer(), {
        uniqueItems: true,
        description: 'Set of specific dates within a month to recur on',
      }),
      Type.Null(),
    ]),
    by_year_day: Type.Optional(
      Type.Union([
        Type.Array(Type.Integer(), {
          uniqueItems: true,
          description: 'Set of days within a year to recur on (1-364)',
        }),
        Type.Null(),
      ]),
    ),
    count: Type.Optional(
      Type.Union([
        Type.Integer({ description: 'Total number of times the event is allowed to recur' }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'RecurrenceRuleResponse' },
)

export type RecurrenceRuleResponse = Static<typeof RecurrenceRuleResponseSchema>

export const GuildScheduledEventUserResponsesSchema = Type.Union(
  [
    Type.Literal(0, { description: 'User is not interested in the event' }),
    Type.Literal(1, { description: 'User is interested in the event' }),
  ],
  { ref: 'GuildScheduledEventUserResponses' },
)

export type GuildScheduledEventUserResponses = Static<typeof GuildScheduledEventUserResponsesSchema>

export const ScheduledEventUserResponseSchema = Type.Object(
  {
    guild_scheduled_event_id: SnowflakeTypeSchema,
    guild_scheduled_event_exception_id: Type.Optional(
      Type.Union([Type.Null(), SnowflakeTypeSchema], {
        description: 'ID of the scheduled event exception',
      }),
    ),
    user_id: SnowflakeTypeSchema,
    user: Type.Optional(UserResponseSchema),
    member: Type.Optional(GuildMemberResponseSchema),
    response: GuildScheduledEventUserResponsesSchema,
  },
  { ref: 'ScheduledEventUserResponse' },
)

export type ScheduledEventUserResponse = Static<typeof ScheduledEventUserResponseSchema>

export const GuildScheduledEventExceptionResponseSchema = Type.Object(
  {
    event_id: SnowflakeTypeSchema,
    event_exception_id: SnowflakeTypeSchema,
    scheduled_start_time: Type.Union([
      Type.String({ format: 'date-time', description: 'Overridden start time of this occurrence' }),
      Type.Null(),
    ]),
    scheduled_end_time: Type.Union([
      Type.String({ format: 'date-time', description: 'Overridden end time of this occurrence' }),
      Type.Null(),
    ]),
    is_canceled: Type.Boolean({ description: 'Whether this occurrence is canceled' }),
  },
  { ref: 'GuildScheduledEventExceptionResponse' },
)

export type GuildScheduledEventExceptionResponse = Static<
  typeof GuildScheduledEventExceptionResponseSchema
>

export const ExternalScheduledEventResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    name: Type.String({ description: 'Name of the scheduled event' }),
    description: Type.Union([
      Type.String({ description: 'Description of the scheduled event' }),
      Type.Null(),
    ]),
    channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description:
        'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    }),
    creator_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description: 'ID of the user that created the scheduled event',
    }),
    creator: Type.Optional(UserResponseSchema),
    image: Type.Union([
      Type.String({ description: 'Cover image hash of the scheduled event' }),
      Type.Null(),
    ]),
    scheduled_start_time: Type.String({
      format: 'date-time',
      description: 'When the scheduled event will start',
    }),
    scheduled_end_time: Type.Union([
      Type.String({
        format: 'date-time',
        description: 'When the scheduled event will end, or null if no end time',
      }),
      Type.Null(),
    ]),
    status: GuildScheduledEventStatusesSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    entity_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description: 'ID of the hosting entity associated with the scheduled event',
    }),
    recurrence_rule: Type.Union([Type.Null(), RecurrenceRuleResponseSchema], {
      description: 'Recurrence rule for the scheduled event, or null if not recurring',
    }),
    user_count: Type.Optional(
      Type.Integer({ description: 'Number of users subscribed to the scheduled event' }),
    ),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    user_rsvp: Type.Optional(Type.Union([Type.Null(), ScheduledEventUserResponseSchema])),
    guild_scheduled_event_exceptions: Type.Array(GuildScheduledEventExceptionResponseSchema),
    entity_metadata: EntityMetadataExternalResponseSchema,
  },
  { ref: 'ExternalScheduledEventResponse' },
)

export type ExternalScheduledEventResponse = Static<typeof ExternalScheduledEventResponseSchema>

export const FileUploadComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    min_values: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 10 }), Type.Null()])),
    max_values: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 10 }), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    file_types: Type.Optional(
      Type.Union([
        Type.Array(Type.String({ minLength: 1, maxLength: 16 }), {
          maxItems: 10,
          uniqueItems: true,
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'FileUploadComponentForModalRequest' },
)

export type FileUploadComponentForModalRequest = Static<
  typeof FileUploadComponentForModalRequestSchema
>

export const InviteTypesSchema = Type.Union([Type.Literal(0), Type.Literal(1), Type.Literal(2)], {
  ref: 'InviteTypes',
})

export type InviteTypes = Static<typeof InviteTypesSchema>

export const InviteChannelRecipientResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    username: Type.String(),
    avatar: Type.Union([Type.String(), Type.Null()]),
  },
  { ref: 'InviteChannelRecipientResponse' },
)

export type InviteChannelRecipientResponse = Static<typeof InviteChannelRecipientResponseSchema>

export const InviteChannelResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    name: Type.Union([Type.String(), Type.Null()]),
    icon: Type.Optional(Type.String()),
    nsfw: Type.Optional(Type.Boolean()),
    recipients: Type.Optional(Type.Array(InviteChannelRecipientResponseSchema)),
  },
  { ref: 'InviteChannelResponse' },
)

export type InviteChannelResponse = Static<typeof InviteChannelResponseSchema>

export const FriendInviteResponseSchema = Type.Object(
  {
    type: InviteTypesSchema,
    code: Type.String(),
    inviter: Type.Optional(UserResponseSchema),
    max_age: Type.Optional(Type.Integer()),
    created_at: Type.Optional(Type.String({ format: 'date-time' })),
    expires_at: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    friends_count: Type.Optional(Type.Integer()),
    channel: Type.Union([Type.Null(), InviteChannelResponseSchema]),
    is_contact: Type.Optional(Type.Boolean()),
    uses: Type.Optional(Type.Integer()),
    max_uses: Type.Optional(Type.Integer()),
    flags: Type.Optional(Type.Integer()),
  },
  { ref: 'FriendInviteResponse' },
)

export type FriendInviteResponse = Static<typeof FriendInviteResponseSchema>

export const GatewayBotSessionStartLimitResponseSchema = Type.Object(
  {
    max_concurrency: Type.Integer(),
    remaining: Type.Integer(),
    reset_after: Type.Integer(),
    total: Type.Integer(),
  },
  { ref: 'GatewayBotSessionStartLimitResponse' },
)

export type GatewayBotSessionStartLimitResponse = Static<
  typeof GatewayBotSessionStartLimitResponseSchema
>

export const GatewayBotResponseSchema = Type.Object(
  {
    url: Type.String({ format: 'uri' }),
    session_start_limit: GatewayBotSessionStartLimitResponseSchema,
    shards: Type.Integer(),
  },
  { ref: 'GatewayBotResponse' },
)

export type GatewayBotResponse = Static<typeof GatewayBotResponseSchema>

export const GatewayResponseSchema = Type.Object(
  { url: Type.String({ format: 'uri' }) },
  { ref: 'GatewayResponse' },
)

export type GatewayResponse = Static<typeof GatewayResponseSchema>

export const GithubAuthorSchema = Type.Object(
  {
    username: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    name: Type.String({ maxLength: 152133 }),
  },
  { ref: 'GithubAuthor' },
)

export type GithubAuthor = Static<typeof GithubAuthorSchema>

export const GithubCheckAppSchema = Type.Object(
  { name: Type.String({ maxLength: 152133 }) },
  { ref: 'GithubCheckApp' },
)

export type GithubCheckApp = Static<typeof GithubCheckAppSchema>

export const GithubCheckPullRequestSchema = Type.Object(
  { number: Type.Integer() },
  { ref: 'GithubCheckPullRequest' },
)

export type GithubCheckPullRequest = Static<typeof GithubCheckPullRequestSchema>

export const GithubCheckSuiteSchema = Type.Object(
  {
    conclusion: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    head_branch: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    head_sha: Type.String({ maxLength: 152133 }),
    pull_requests: Type.Optional(
      Type.Union([Type.Array(GithubCheckPullRequestSchema, { maxItems: 1521 }), Type.Null()]),
    ),
    app: GithubCheckAppSchema,
  },
  { ref: 'GithubCheckSuite' },
)

export type GithubCheckSuite = Static<typeof GithubCheckSuiteSchema>

export const GithubCheckRunOutputSchema = Type.Object(
  {
    title: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    summary: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
  },
  { ref: 'GithubCheckRunOutput' },
)

export type GithubCheckRunOutput = Static<typeof GithubCheckRunOutputSchema>

export const GithubCheckRunSchema = Type.Object(
  {
    conclusion: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    name: Type.String({ maxLength: 152133 }),
    html_url: Type.String({ format: 'uri', maxLength: 2048 }),
    check_suite: GithubCheckSuiteSchema,
    details_url: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    output: Type.Optional(Type.Union([Type.Null(), GithubCheckRunOutputSchema])),
    pull_requests: Type.Optional(
      Type.Union([Type.Array(GithubCheckPullRequestSchema, { maxItems: 1521 }), Type.Null()]),
    ),
  },
  { ref: 'GithubCheckRun' },
)

export type GithubCheckRun = Static<typeof GithubCheckRunSchema>

export const GithubUserSchema = Type.Object(
  {
    id: Type.Integer(),
    login: Type.String({ maxLength: 152133 }),
    html_url: Type.String({ format: 'uri', maxLength: 2048 }),
    avatar_url: Type.String({ format: 'uri', maxLength: 2048 }),
  },
  { ref: 'GithubUser' },
)

export type GithubUser = Static<typeof GithubUserSchema>

export const GithubCommentSchema = Type.Object(
  {
    id: Type.Integer(),
    html_url: Type.String({ format: 'uri', maxLength: 2048 }),
    user: GithubUserSchema,
    commit_id: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    body: Type.String({ maxLength: 152133 }),
  },
  { ref: 'GithubComment' },
)

export type GithubComment = Static<typeof GithubCommentSchema>

export const GithubCommitSchema = Type.Object(
  {
    id: Type.String({ maxLength: 152133 }),
    url: Type.String({ format: 'uri', maxLength: 2048 }),
    message: Type.String({ maxLength: 152133 }),
    author: GithubAuthorSchema,
  },
  { ref: 'GithubCommit' },
)

export type GithubCommit = Static<typeof GithubCommitSchema>

export const GithubDiscussionSchema = Type.Object(
  {
    title: Type.String({ maxLength: 152133 }),
    number: Type.Integer(),
    html_url: Type.String({ format: 'uri', maxLength: 2048 }),
    answer_html_url: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    body: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    user: GithubUserSchema,
  },
  { ref: 'GithubDiscussion' },
)

export type GithubDiscussion = Static<typeof GithubDiscussionSchema>

export const GithubIssueSchema = Type.Object(
  {
    id: Type.Integer(),
    number: Type.Integer(),
    html_url: Type.String({ format: 'uri', maxLength: 2048 }),
    user: GithubUserSchema,
    title: Type.String({ maxLength: 152133 }),
    body: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    pull_request: Type.Optional(Type.Any()),
  },
  { ref: 'GithubIssue' },
)

export type GithubIssue = Static<typeof GithubIssueSchema>

export const GithubReleaseSchema = Type.Object(
  {
    id: Type.Integer(),
    tag_name: Type.String({ maxLength: 152133 }),
    html_url: Type.String({ format: 'uri', maxLength: 2048 }),
    author: GithubUserSchema,
  },
  { ref: 'GithubRelease' },
)

export type GithubRelease = Static<typeof GithubReleaseSchema>

export const GithubRepositorySchema = Type.Object(
  {
    id: Type.Integer(),
    html_url: Type.String({ format: 'uri', maxLength: 2048 }),
    name: Type.String({ maxLength: 152133 }),
    full_name: Type.String({ maxLength: 152133 }),
  },
  { ref: 'GithubRepository' },
)

export type GithubRepository = Static<typeof GithubRepositorySchema>

export const GithubReviewSchema = Type.Object(
  {
    user: GithubUserSchema,
    body: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    html_url: Type.String({ format: 'uri', maxLength: 2048 }),
    state: Type.String({ maxLength: 152133 }),
  },
  { ref: 'GithubReview' },
)

export type GithubReview = Static<typeof GithubReviewSchema>

export const GithubWebhookSchema = Type.Object(
  {
    action: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    ref: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    ref_type: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    comment: Type.Optional(Type.Union([Type.Null(), GithubCommentSchema])),
    issue: Type.Optional(Type.Union([Type.Null(), GithubIssueSchema])),
    pull_request: Type.Optional(Type.Union([Type.Null(), GithubIssueSchema])),
    repository: Type.Optional(Type.Union([Type.Null(), GithubRepositorySchema])),
    forkee: Type.Optional(Type.Union([Type.Null(), GithubRepositorySchema])),
    sender: GithubUserSchema,
    member: Type.Optional(Type.Union([Type.Null(), GithubUserSchema])),
    release: Type.Optional(Type.Union([Type.Null(), GithubReleaseSchema])),
    head_commit: Type.Optional(Type.Union([Type.Null(), GithubCommitSchema])),
    commits: Type.Optional(
      Type.Union([Type.Array(GithubCommitSchema, { maxItems: 1521 }), Type.Null()]),
    ),
    forced: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    compare: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    review: Type.Optional(Type.Union([Type.Null(), GithubReviewSchema])),
    check_run: Type.Optional(Type.Union([Type.Null(), GithubCheckRunSchema])),
    check_suite: Type.Optional(Type.Union([Type.Null(), GithubCheckSuiteSchema])),
    discussion: Type.Optional(Type.Union([Type.Null(), GithubDiscussionSchema])),
    answer: Type.Optional(Type.Union([Type.Null(), GithubCommentSchema])),
  },
  { ref: 'GithubWebhook' },
)

export type GithubWebhook = Static<typeof GithubWebhookSchema>

export const GroupDMInviteResponseSchema = Type.Object(
  {
    type: InviteTypesSchema,
    code: Type.String(),
    inviter: Type.Optional(UserResponseSchema),
    max_age: Type.Optional(Type.Integer()),
    created_at: Type.Optional(Type.String({ format: 'date-time' })),
    expires_at: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    channel: InviteChannelResponseSchema,
    approximate_member_count: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
  },
  { ref: 'GroupDMInviteResponse' },
)

export type GroupDMInviteResponse = Static<typeof GroupDMInviteResponseSchema>

export const PartialDiscordIntegrationResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: IntegrationTypesSchema,
    name: Type.Union([Type.String(), Type.Null()]),
    account: AccountResponseSchema,
    application_id: SnowflakeTypeSchema,
  },
  { ref: 'PartialDiscordIntegrationResponse' },
)

export type PartialDiscordIntegrationResponse = Static<
  typeof PartialDiscordIntegrationResponseSchema
>

export const PartialExternalConnectionIntegrationResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: IntegrationTypesSchema,
    name: Type.Union([Type.String(), Type.Null()]),
    account: AccountResponseSchema,
  },
  { ref: 'PartialExternalConnectionIntegrationResponse' },
)

export type PartialExternalConnectionIntegrationResponse = Static<
  typeof PartialExternalConnectionIntegrationResponseSchema
>

export const PartialGuildSubscriptionIntegrationResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: IntegrationTypesSchema,
    name: Type.Union([Type.String(), Type.Null()]),
    account: AccountResponseSchema,
  },
  { ref: 'PartialGuildSubscriptionIntegrationResponse' },
)

export type PartialGuildSubscriptionIntegrationResponse = Static<
  typeof PartialGuildSubscriptionIntegrationResponseSchema
>

export const GuildIncomingWebhookResponseSchema = Type.Object(
  {
    application_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    avatar: Type.Union([Type.String(), Type.Null()]),
    channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    guild_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    id: SnowflakeTypeSchema,
    name: Type.String(),
    type: WebhookTypesSchema,
    user: Type.Optional(UserResponseSchema),
    token: Type.Optional(Type.String()),
    url: Type.Optional(Type.String({ format: 'uri' })),
  },
  { ref: 'GuildIncomingWebhookResponse' },
)

export type GuildIncomingWebhookResponse = Static<typeof GuildIncomingWebhookResponseSchema>

export const StageScheduledEventResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    name: Type.String({ description: 'Name of the scheduled event' }),
    description: Type.Union([
      Type.String({ description: 'Description of the scheduled event' }),
      Type.Null(),
    ]),
    channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description:
        'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    }),
    creator_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description: 'ID of the user that created the scheduled event',
    }),
    creator: Type.Optional(UserResponseSchema),
    image: Type.Union([
      Type.String({ description: 'Cover image hash of the scheduled event' }),
      Type.Null(),
    ]),
    scheduled_start_time: Type.String({
      format: 'date-time',
      description: 'When the scheduled event will start',
    }),
    scheduled_end_time: Type.Union([
      Type.String({
        format: 'date-time',
        description: 'When the scheduled event will end, or null if no end time',
      }),
      Type.Null(),
    ]),
    status: GuildScheduledEventStatusesSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    entity_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description: 'ID of the hosting entity associated with the scheduled event',
    }),
    recurrence_rule: Type.Union([Type.Null(), RecurrenceRuleResponseSchema], {
      description: 'Recurrence rule for the scheduled event, or null if not recurring',
    }),
    user_count: Type.Optional(
      Type.Integer({ description: 'Number of users subscribed to the scheduled event' }),
    ),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    user_rsvp: Type.Optional(Type.Union([Type.Null(), ScheduledEventUserResponseSchema])),
    guild_scheduled_event_exceptions: Type.Array(GuildScheduledEventExceptionResponseSchema),
    entity_metadata: Type.Union([Type.Null(), EntityMetadataStageInstanceResponseSchema]),
  },
  { ref: 'StageScheduledEventResponse' },
)

export type StageScheduledEventResponse = Static<typeof StageScheduledEventResponseSchema>

export const VoiceScheduledEventResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    name: Type.String({ description: 'Name of the scheduled event' }),
    description: Type.Union([
      Type.String({ description: 'Description of the scheduled event' }),
      Type.Null(),
    ]),
    channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description:
        'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    }),
    creator_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description: 'ID of the user that created the scheduled event',
    }),
    creator: Type.Optional(UserResponseSchema),
    image: Type.Union([
      Type.String({ description: 'Cover image hash of the scheduled event' }),
      Type.Null(),
    ]),
    scheduled_start_time: Type.String({
      format: 'date-time',
      description: 'When the scheduled event will start',
    }),
    scheduled_end_time: Type.Union([
      Type.String({
        format: 'date-time',
        description: 'When the scheduled event will end, or null if no end time',
      }),
      Type.Null(),
    ]),
    status: GuildScheduledEventStatusesSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    entity_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description: 'ID of the hosting entity associated with the scheduled event',
    }),
    recurrence_rule: Type.Union([Type.Null(), RecurrenceRuleResponseSchema], {
      description: 'Recurrence rule for the scheduled event, or null if not recurring',
    }),
    user_count: Type.Optional(
      Type.Integer({ description: 'Number of users subscribed to the scheduled event' }),
    ),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    user_rsvp: Type.Optional(Type.Union([Type.Null(), ScheduledEventUserResponseSchema])),
    guild_scheduled_event_exceptions: Type.Array(GuildScheduledEventExceptionResponseSchema),
    entity_metadata: Type.Union([Type.Null(), EntityMetadataVoiceResponseSchema]),
  },
  { ref: 'VoiceScheduledEventResponse' },
)

export type VoiceScheduledEventResponse = Static<typeof VoiceScheduledEventResponseSchema>

export const KeywordTriggerMetadataResponseSchema = Type.Object(
  {
    keyword_filter: Type.Array(Type.String()),
    regex_patterns: Type.Array(Type.String()),
    allow_list: Type.Array(Type.String()),
  },
  { ref: 'KeywordTriggerMetadataResponse' },
)

export type KeywordTriggerMetadataResponse = Static<typeof KeywordTriggerMetadataResponseSchema>

export const KeywordRuleResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    creator_id: SnowflakeTypeSchema,
    name: Type.String(),
    event_type: AutomodEventTypeSchema,
    actions: Type.Array(
      Type.Union([
        BlockMessageActionResponseSchema,
        FlagToChannelActionResponseSchema,
        QuarantineUserActionResponseSchema,
        UserCommunicationDisabledActionResponseSchema,
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    enabled: Type.Boolean(),
    exempt_roles: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    exempt_channels: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    trigger_metadata: KeywordTriggerMetadataResponseSchema,
  },
  { ref: 'KeywordRuleResponse' },
)

export type KeywordRuleResponse = Static<typeof KeywordRuleResponseSchema>

export const MLSpamTriggerMetadataResponseSchema = Type.Object(
  {},
  { ref: 'MLSpamTriggerMetadataResponse' },
)

export type MLSpamTriggerMetadataResponse = Static<typeof MLSpamTriggerMetadataResponseSchema>

export const MLSpamRuleResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    creator_id: SnowflakeTypeSchema,
    name: Type.String(),
    event_type: AutomodEventTypeSchema,
    actions: Type.Array(
      Type.Union([
        BlockMessageActionResponseSchema,
        FlagToChannelActionResponseSchema,
        QuarantineUserActionResponseSchema,
        UserCommunicationDisabledActionResponseSchema,
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    enabled: Type.Boolean(),
    exempt_roles: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    exempt_channels: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    trigger_metadata: MLSpamTriggerMetadataResponseSchema,
  },
  { ref: 'MLSpamRuleResponse' },
)

export type MLSpamRuleResponse = Static<typeof MLSpamRuleResponseSchema>

export const MentionSpamTriggerMetadataResponseSchema = Type.Object(
  { mention_total_limit: Type.Integer(), mention_raid_protection_enabled: Type.Boolean() },
  { ref: 'MentionSpamTriggerMetadataResponse' },
)

export type MentionSpamTriggerMetadataResponse = Static<
  typeof MentionSpamTriggerMetadataResponseSchema
>

export const MentionSpamRuleResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    creator_id: SnowflakeTypeSchema,
    name: Type.String(),
    event_type: AutomodEventTypeSchema,
    actions: Type.Array(
      Type.Union([
        BlockMessageActionResponseSchema,
        FlagToChannelActionResponseSchema,
        QuarantineUserActionResponseSchema,
        UserCommunicationDisabledActionResponseSchema,
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    enabled: Type.Boolean(),
    exempt_roles: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    exempt_channels: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    trigger_metadata: MentionSpamTriggerMetadataResponseSchema,
  },
  { ref: 'MentionSpamRuleResponse' },
)

export type MentionSpamRuleResponse = Static<typeof MentionSpamRuleResponseSchema>

export const UserProfileMetadataResponseSchema = Type.Object(
  {
    keyword_filter: Type.Array(Type.String()),
    regex_patterns: Type.Array(Type.String()),
    allow_list: Type.Array(Type.String()),
  },
  { ref: 'UserProfileMetadataResponse' },
)

export type UserProfileMetadataResponse = Static<typeof UserProfileMetadataResponseSchema>

export const UserProfileRuleResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    creator_id: SnowflakeTypeSchema,
    name: Type.String(),
    event_type: AutomodEventTypeSchema,
    actions: Type.Array(
      Type.Union([
        BlockMessageActionResponseSchema,
        FlagToChannelActionResponseSchema,
        QuarantineUserActionResponseSchema,
        UserCommunicationDisabledActionResponseSchema,
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    enabled: Type.Boolean(),
    exempt_roles: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    exempt_channels: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    trigger_metadata: UserProfileMetadataResponseSchema,
  },
  { ref: 'UserProfileRuleResponse' },
)

export type UserProfileRuleResponse = Static<typeof UserProfileRuleResponseSchema>

export const GuildAuditLogResponseSchema = Type.Object(
  {
    audit_log_entries: Type.Array(AuditLogEntryResponseSchema),
    users: Type.Array(UserResponseSchema),
    integrations: Type.Array(
      Type.Union([
        PartialDiscordIntegrationResponseSchema,
        PartialExternalConnectionIntegrationResponseSchema,
        PartialGuildSubscriptionIntegrationResponseSchema,
      ]),
    ),
    webhooks: Type.Array(
      Type.Union([
        ApplicationIncomingWebhookResponseSchema,
        ChannelFollowerWebhookResponseSchema,
        GuildIncomingWebhookResponseSchema,
      ]),
    ),
    guild_scheduled_events: Type.Array(
      Type.Union([
        ExternalScheduledEventResponseSchema,
        StageScheduledEventResponseSchema,
        VoiceScheduledEventResponseSchema,
      ]),
    ),
    threads: Type.Array(ThreadResponseSchema),
    application_commands: Type.Array(ApplicationCommandResponseSchema),
    auto_moderation_rules: Type.Array(
      Type.Union([
        DefaultKeywordRuleResponseSchema,
        KeywordRuleResponseSchema,
        MLSpamRuleResponseSchema,
        MentionSpamRuleResponseSchema,
        UserProfileRuleResponseSchema,
        Type.Null(),
      ]),
    ),
  },
  { ref: 'GuildAuditLogResponse' },
)

export type GuildAuditLogResponse = Static<typeof GuildAuditLogResponseSchema>

export const GuildBanResponseSchema = Type.Object(
  { user: UserResponseSchema, reason: Type.Union([Type.String(), Type.Null()]) },
  { ref: 'GuildBanResponse' },
)

export type GuildBanResponse = Static<typeof GuildBanResponseSchema>

export const GuildExplicitContentFilterTypesSchema = Type.Union(
  [
    Type.Literal(0, { description: 'media content will not be scanned' }),
    Type.Literal(1, { description: 'media content sent by members without roles will be scanned' }),
    Type.Literal(2, { description: 'media content sent by all members will be scanned' }),
  ],
  { ref: 'GuildExplicitContentFilterTypes' },
)

export type GuildExplicitContentFilterTypes = Static<typeof GuildExplicitContentFilterTypesSchema>

export const GuildFeaturesSchema = Type.Union(
  [
    Type.Literal('ANIMATED_BANNER', {
      description: 'guild has access to set an animated guild banner image',
    }),
    Type.Literal('ANIMATED_ICON', {
      description: 'guild has access to set an animated guild icon',
    }),
    Type.Literal('APPLICATION_COMMAND_PERMISSIONS_V2', {
      description: 'guild is using the old permissions configuration behavior',
    }),
    Type.Literal('AUTO_MODERATION', { description: 'guild has set up auto moderation rules' }),
    Type.Literal('BANNER', { description: 'guild has access to set a guild banner image' }),
    Type.Literal('COMMUNITY', {
      description:
        'guild can enable welcome screen, Membership Screening, stage channels and discovery, and             receives community updates',
    }),
    Type.Literal('CREATOR_MONETIZABLE_PROVISIONAL', {
      description: 'guild has enabled monetization',
    }),
    Type.Literal('CREATOR_STORE_PAGE', {
      description: 'guild has enabled the role subscription promo page',
    }),
    Type.Literal('DEVELOPER_SUPPORT_SERVER', {
      description: 'guild has been set as a support server on the App Directory',
    }),
    Type.Literal('DISCOVERABLE', {
      description: 'guild is able to be discovered in the directory',
    }),
    Type.Literal('FEATURABLE', { description: 'guild is able to be featured in the directory' }),
    Type.Literal('INVITES_DISABLED', {
      description: 'guild has paused invites, preventing new users from joining',
    }),
    Type.Literal('INVITE_SPLASH', {
      description: 'guild has access to set an invite splash background',
    }),
    Type.Literal('MEMBER_VERIFICATION_GATE_ENABLED', {
      description: 'guild has enabled Membership Screening',
    }),
    Type.Literal('MORE_STICKERS', { description: 'guild has increased custom sticker slots' }),
    Type.Literal('NEWS', { description: 'guild has access to create announcement channels' }),
    Type.Literal('PARTNERED', { description: 'guild is partnered' }),
    Type.Literal('PREVIEW_ENABLED', {
      description:
        'guild can be previewed before joining via Membership Screening or the directory',
    }),
    Type.Literal('RAID_ALERTS_DISABLED', {
      description: 'guild has disabled activity alerts in the configured safety alerts channel',
    }),
    Type.Literal('PRUNE_REQUIRES_ADMIN', {
      description: 'guild has restricted member prune to administrators and the guild owner',
    }),
    Type.Literal('ROLE_ICONS', { description: 'guild is able to set role icons' }),
    Type.Literal('ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE', {
      description: 'guild has role subscriptions that can be purchased',
    }),
    Type.Literal('ROLE_SUBSCRIPTIONS_ENABLED', {
      description: 'guild has enabled role subscriptions',
    }),
    Type.Literal('TICKETED_EVENTS_ENABLED', { description: 'guild has enabled ticketed events' }),
    Type.Literal('VANITY_URL', { description: 'guild has access to set a vanity URL' }),
    Type.Literal('VERIFIED', { description: 'guild is verified' }),
    Type.Literal('VIP_REGIONS', {
      description:
        'guild has access to set 384kbps bitrate in voice (previously VIP voice servers)',
    }),
    Type.Literal('WELCOME_SCREEN_ENABLED', { description: 'guild has enabled the welcome screen' }),
    Type.Literal('OFFICIAL_GAME_GUILD', {
      description: 'guild is an official guild for one or more games',
    }),
  ],
  { ref: 'GuildFeatures' },
)

export type GuildFeatures = Static<typeof GuildFeaturesSchema>

export const WelcomeMessageResponseSchema = Type.Object(
  { author_ids: Type.Array(SnowflakeTypeSchema), message: Type.String() },
  { ref: 'WelcomeMessageResponse' },
)

export type WelcomeMessageResponse = Static<typeof WelcomeMessageResponseSchema>

export const NewMemberActionTypeSchema = Type.Union([Type.Literal(0), Type.Literal(1)], {
  ref: 'NewMemberActionType',
})

export type NewMemberActionType = Static<typeof NewMemberActionTypeSchema>

export const SettingsEmojiResponseSchema = Type.Object(
  {
    id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    name: Type.Union([Type.String(), Type.Null()]),
    animated: Type.Boolean(),
  },
  { ref: 'SettingsEmojiResponse' },
)

export type SettingsEmojiResponse = Static<typeof SettingsEmojiResponseSchema>

export const NewMemberActionResponseSchema = Type.Object(
  {
    channel_id: SnowflakeTypeSchema,
    action_type: NewMemberActionTypeSchema,
    title: Type.String(),
    description: Type.String(),
    emoji: Type.Optional(SettingsEmojiResponseSchema),
    icon: Type.Optional(Type.String()),
  },
  { ref: 'NewMemberActionResponse' },
)

export type NewMemberActionResponse = Static<typeof NewMemberActionResponseSchema>

export const ResourceChannelResponseSchema = Type.Object(
  {
    channel_id: SnowflakeTypeSchema,
    title: Type.String(),
    emoji: Type.Optional(SettingsEmojiResponseSchema),
    icon: Type.Optional(Type.String()),
    description: Type.String(),
  },
  { ref: 'ResourceChannelResponse' },
)

export type ResourceChannelResponse = Static<typeof ResourceChannelResponseSchema>

export const GuildHomeSettingsResponseSchema = Type.Object(
  {
    guild_id: SnowflakeTypeSchema,
    enabled: Type.Boolean(),
    welcome_message: Type.Optional(WelcomeMessageResponseSchema),
    new_member_actions: Type.Array(NewMemberActionResponseSchema),
    resource_channels: Type.Array(ResourceChannelResponseSchema),
  },
  { ref: 'GuildHomeSettingsResponse' },
)

export type GuildHomeSettingsResponse = Static<typeof GuildHomeSettingsResponseSchema>

export const GuildIncidentActionsRequestSchema = Type.Object(
  {
    invites_disabled_until: Type.Optional(
      Type.Union([
        Type.String({ format: 'date-time', description: 'When invites will be enabled again' }),
        Type.Null(),
      ]),
    ),
    dms_disabled_until: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date-time',
          description: 'When direct messages will be enabled again',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'GuildIncidentActionsRequest' },
)

export type GuildIncidentActionsRequest = Static<typeof GuildIncidentActionsRequestSchema>

export const GuildIncidentsDataResponseSchema = Type.Object(
  {
    invites_disabled_until: Type.Union([
      Type.String({ format: 'date-time', description: 'When invites get enabled again' }),
      Type.Null(),
    ]),
    dms_disabled_until: Type.Union([
      Type.String({ format: 'date-time', description: 'When direct messages get enabled again' }),
      Type.Null(),
    ]),
  },
  { ref: 'GuildIncidentsDataResponse' },
)

export type GuildIncidentsDataResponse = Static<typeof GuildIncidentsDataResponseSchema>

export const VerificationLevelsSchema = Type.Union(
  [
    Type.Literal(0, { description: 'unrestricted' }),
    Type.Literal(1, { description: 'must have verified email on account' }),
    Type.Literal(2, { description: 'must be registered on Discord for longer than 5 minutes' }),
    Type.Literal(3, { description: 'must be a member of the server for longer than 10 minutes' }),
    Type.Literal(4, { description: 'must have a verified phone number' }),
  ],
  { ref: 'VerificationLevels' },
)

export type VerificationLevels = Static<typeof VerificationLevelsSchema>

export const GuildNSFWContentLevelSchema = Type.Union(
  [Type.Literal(0), Type.Literal(1), Type.Literal(2), Type.Literal(3)],
  { ref: 'GuildNSFWContentLevel' },
)

export type GuildNSFWContentLevel = Static<typeof GuildNSFWContentLevelSchema>

export const InviteGuildResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    splash: Type.Union([Type.String(), Type.Null()]),
    banner: Type.Union([Type.String(), Type.Null()]),
    description: Type.Union([Type.String(), Type.Null()]),
    icon: Type.Union([Type.String(), Type.Null()]),
    features: Type.Array(GuildFeaturesSchema, { uniqueItems: true }),
    verification_level: Type.Union([Type.Null(), VerificationLevelsSchema]),
    vanity_url_code: Type.Union([Type.String(), Type.Null()]),
    nsfw_level: Type.Union([Type.Null(), GuildNSFWContentLevelSchema]),
    nsfw: Type.Union([Type.Boolean(), Type.Null()]),
    premium_subscription_count: Type.Integer(),
  },
  { ref: 'InviteGuildResponse' },
)

export type InviteGuildResponse = Static<typeof InviteGuildResponseSchema>

export const InviteApplicationResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    icon: Type.Union([Type.String(), Type.Null()]),
    description: Type.String(),
    type: Type.Union([Type.Null(), ApplicationTypesSchema]),
    cover_image: Type.Optional(Type.String()),
    primary_sku_id: Type.Optional(SnowflakeTypeSchema),
    flags: Type.Integer(),
    flags_new: Type.String(),
    bot: Type.Optional(UserResponseSchema),
    slug: Type.Optional(Type.String()),
    conjure_project_id: Type.Optional(SnowflakeTypeSchema),
    vibegrations_project_id: Type.Optional(SnowflakeTypeSchema),
    guild_id: Type.Optional(SnowflakeTypeSchema),
    rpc_origins: Type.Optional(Type.Array(Type.String())),
    bot_public: Type.Optional(Type.Boolean()),
    bot_require_code_grant: Type.Optional(Type.Boolean()),
    terms_of_service_url: Type.Optional(Type.String({ format: 'uri' })),
    privacy_policy_url: Type.Optional(Type.String({ format: 'uri' })),
    custom_install_url: Type.Optional(Type.String({ format: 'uri' })),
    install_params: Type.Optional(ApplicationOAuth2InstallParamsResponseSchema),
    integration_types_config: Type.Optional(
      Type.Record(Type.String(), ApplicationIntegrationTypeConfigurationResponseSchema),
    ),
    verify_key: Type.String(),
    max_participants: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    tags: Type.Optional(Type.Array(Type.String(), { uniqueItems: true })),
  },
  { ref: 'InviteApplicationResponse' },
)

export type InviteApplicationResponse = Static<typeof InviteApplicationResponseSchema>

export const ScheduledEventResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    name: Type.String({ description: 'Name of the scheduled event' }),
    description: Type.Union([
      Type.String({ description: 'Description of the scheduled event' }),
      Type.Null(),
    ]),
    channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description:
        'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    }),
    creator_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description: 'ID of the user that created the scheduled event',
    }),
    creator: Type.Optional(UserResponseSchema),
    image: Type.Union([
      Type.String({ description: 'Cover image hash of the scheduled event' }),
      Type.Null(),
    ]),
    scheduled_start_time: Type.String({
      format: 'date-time',
      description: 'When the scheduled event will start',
    }),
    scheduled_end_time: Type.Union([
      Type.String({
        format: 'date-time',
        description: 'When the scheduled event will end, or null if no end time',
      }),
      Type.Null(),
    ]),
    status: GuildScheduledEventStatusesSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    entity_id: Type.Union([Type.Null(), SnowflakeTypeSchema], {
      description: 'ID of the hosting entity associated with the scheduled event',
    }),
    recurrence_rule: Type.Union([Type.Null(), RecurrenceRuleResponseSchema], {
      description: 'Recurrence rule for the scheduled event, or null if not recurring',
    }),
    user_count: Type.Optional(
      Type.Integer({ description: 'Number of users subscribed to the scheduled event' }),
    ),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    user_rsvp: Type.Optional(Type.Union([Type.Null(), ScheduledEventUserResponseSchema])),
    guild_scheduled_event_exceptions: Type.Array(GuildScheduledEventExceptionResponseSchema),
  },
  { ref: 'ScheduledEventResponse' },
)

export type ScheduledEventResponse = Static<typeof ScheduledEventResponseSchema>

export const InviteGuildRoleResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    position: Type.Integer(),
    color: Type.Integer(),
    colors: GuildRoleColorsResponseSchema,
    icon: Type.Union([Type.String(), Type.Null()]),
    unicode_emoji: Type.Union([Type.String(), Type.Null()]),
    permissions: Type.Optional(Type.String()),
  },
  { ref: 'InviteGuildRoleResponse' },
)

export type InviteGuildRoleResponse = Static<typeof InviteGuildRoleResponseSchema>

export const GuildInviteResponseSchema = Type.Object(
  {
    type: InviteTypesSchema,
    code: Type.String(),
    inviter: Type.Optional(UserResponseSchema),
    max_age: Type.Optional(Type.Integer()),
    created_at: Type.Optional(Type.String({ format: 'date-time' })),
    expires_at: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    is_contact: Type.Optional(Type.Boolean()),
    flags: Type.Optional(Type.Integer()),
    guild: InviteGuildResponseSchema,
    guild_id: SnowflakeTypeSchema,
    channel: InviteChannelResponseSchema,
    target_type: Type.Optional(InviteTargetTypesSchema),
    target_user: Type.Optional(UserResponseSchema),
    target_application: Type.Optional(InviteApplicationResponseSchema),
    guild_scheduled_event: Type.Optional(ScheduledEventResponseSchema),
    target_channel_id: Type.Optional(SnowflakeTypeSchema),
    target_message_id: Type.Optional(SnowflakeTypeSchema),
    uses: Type.Optional(Type.Integer()),
    max_uses: Type.Optional(Type.Integer()),
    temporary: Type.Optional(Type.Boolean()),
    approximate_member_count: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    approximate_presence_count: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    is_nickname_changeable: Type.Optional(Type.Boolean()),
    roles: Type.Optional(Type.Union([Type.Array(InviteGuildRoleResponseSchema), Type.Null()])),
  },
  { ref: 'GuildInviteResponse' },
)

export type GuildInviteResponse = Static<typeof GuildInviteResponseSchema>

export const GuildJoinRequestApplicationStatusSchema = Type.Union(
  [
    Type.Literal('STARTED', {
      description: 'Applicant started but not yet submitted join request',
    }),
    Type.Literal('SUBMITTED', {
      description: 'Applicant submitted join request that is awaiting review',
    }),
    Type.Literal('REJECTED', { description: 'Join request rejected' }),
    Type.Literal('APPROVED', { description: 'Join request approved' }),
  ],
  { ref: 'GuildJoinRequestApplicationStatus' },
)

export type GuildJoinRequestApplicationStatus = Static<
  typeof GuildJoinRequestApplicationStatusSchema
>

export const GuildMemberVerificationFormFieldTypeSchema = Type.Union(
  [
    Type.Literal('TERMS', {
      description: 'Field requiring applicant to acknowledge list of terms',
    }),
    Type.Literal('TEXT_INPUT', { description: 'Short text input field' }),
    Type.Literal('PARAGRAPH', { description: 'Long-form text input field' }),
    Type.Literal('MULTIPLE_CHOICE', {
      description: 'Field where applicant selects one of many options',
    }),
  ],
  { ref: 'GuildMemberVerificationFormFieldType' },
)

export type GuildMemberVerificationFormFieldType = Static<
  typeof GuildMemberVerificationFormFieldTypeSchema
>

export const MultipleChoiceFormFieldResponseSchema = Type.Object(
  {
    field_type: GuildMemberVerificationFormFieldTypeSchema,
    label: Type.Optional(Type.String({ description: 'Label shown above field' })),
    description: Type.Optional(
      Type.String({ description: 'Optional helper text shown below label' }),
    ),
    required: Type.Optional(Type.Boolean({ description: 'Whether applicant must fill in field' })),
    choices: Type.Array(Type.String(), { description: 'Choices applicant can select from' }),
    response: Type.Optional(Type.Integer({ description: 'Index of choice selected by applicant' })),
  },
  { ref: 'MultipleChoiceFormFieldResponse' },
)

export type MultipleChoiceFormFieldResponse = Static<typeof MultipleChoiceFormFieldResponseSchema>

export const ParagraphFormFieldResponseSchema = Type.Object(
  {
    field_type: GuildMemberVerificationFormFieldTypeSchema,
    label: Type.Optional(Type.String({ description: 'Label shown above field' })),
    description: Type.Optional(
      Type.String({ description: 'Optional helper text shown below label' }),
    ),
    required: Type.Optional(Type.Boolean({ description: 'Whether applicant must fill in field' })),
    placeholder: Type.Optional(
      Type.String({ description: 'Placeholder text shown in empty input' }),
    ),
    response: Type.Optional(Type.String({ description: "Applicant's text response" })),
  },
  { ref: 'ParagraphFormFieldResponse' },
)

export type ParagraphFormFieldResponse = Static<typeof ParagraphFormFieldResponseSchema>

export const TermsFormFieldResponseSchema = Type.Object(
  {
    field_type: GuildMemberVerificationFormFieldTypeSchema,
    label: Type.Optional(Type.String({ description: 'Label shown above field' })),
    description: Type.Optional(
      Type.String({ description: 'Optional helper text shown below label' }),
    ),
    required: Type.Optional(Type.Boolean({ description: 'Whether applicant must fill in field' })),
    values: Type.Array(Type.String(), { description: 'Terms applicant must acknowledge' }),
    response: Type.Optional(Type.Boolean({ description: 'Whether applicant accepted terms' })),
  },
  { ref: 'TermsFormFieldResponse' },
)

export type TermsFormFieldResponse = Static<typeof TermsFormFieldResponseSchema>

export const TextInputFormFieldResponseSchema = Type.Object(
  {
    field_type: GuildMemberVerificationFormFieldTypeSchema,
    label: Type.Optional(Type.String({ description: 'Label shown above field' })),
    description: Type.Optional(
      Type.String({ description: 'Optional helper text shown below label' }),
    ),
    required: Type.Optional(Type.Boolean({ description: 'Whether applicant must fill in field' })),
    placeholder: Type.Optional(
      Type.String({ description: 'Placeholder text shown in empty input' }),
    ),
    response: Type.Optional(Type.String({ description: "Applicant's text response" })),
  },
  { ref: 'TextInputFormFieldResponse' },
)

export type TextInputFormFieldResponse = Static<typeof TextInputFormFieldResponseSchema>

export const GuildJoinRequestResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    created_at: Type.String({ format: 'date-time' }),
    reviewed_at: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    application_status: Type.Union([Type.Null(), GuildJoinRequestApplicationStatusSchema]),
    rejection_reason: Type.Union([
      Type.String({
        description: 'Reason request was rejected. Only set when application_status is REJECTED',
      }),
      Type.Null(),
    ]),
    guild_id: SnowflakeTypeSchema,
    user_id: SnowflakeTypeSchema,
    user: Type.Optional(Type.Union([Type.Null(), UserResponseSchema])),
    form_responses: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            MultipleChoiceFormFieldResponseSchema,
            ParagraphFormFieldResponseSchema,
            TermsFormFieldResponseSchema,
            TextInputFormFieldResponseSchema,
          ]),
          { description: "Applicant's responses on join request form" },
        ),
        Type.Null(),
      ]),
    ),
    actioned_by_user: Type.Optional(Type.Union([Type.Null(), UserResponseSchema])),
  },
  { ref: 'GuildJoinRequestResponse' },
)

export type GuildJoinRequestResponse = Static<typeof GuildJoinRequestResponseSchema>

export const GuildJoinRequestsListResponseSchema = Type.Object(
  {
    total: Type.Optional(Type.Integer()),
    guild_join_requests: Type.Optional(Type.Array(GuildJoinRequestResponseSchema)),
  },
  { ref: 'GuildJoinRequestsListResponse' },
)

export type GuildJoinRequestsListResponse = Static<typeof GuildJoinRequestsListResponseSchema>

export const GuildMFALevelSchema = Type.Union(
  [
    Type.Literal(0, { description: 'Guild has no MFA/2FA requirement for moderation actions' }),
    Type.Literal(1, { description: 'Guild has a 2FA requirement for moderation actions' }),
  ],
  { ref: 'GuildMFALevel' },
)

export type GuildMFALevel = Static<typeof GuildMFALevelSchema>

export const GuildOnboardingModeSchema = Type.Union(
  [
    Type.Literal(0, { description: 'Only Default Channels considered in constraints' }),
    Type.Literal(1, {
      description: 'Default Channels and Onboarding Prompts considered in constraints',
    }),
  ],
  { ref: 'GuildOnboardingMode' },
)

export type GuildOnboardingMode = Static<typeof GuildOnboardingModeSchema>

export const OnboardingPromptOptionResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    title: Type.String(),
    description: Type.String(),
    emoji: SettingsEmojiResponseSchema,
    role_ids: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    channel_ids: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
  },
  { ref: 'OnboardingPromptOptionResponse' },
)

export type OnboardingPromptOptionResponse = Static<typeof OnboardingPromptOptionResponseSchema>

export const OnboardingPromptTypeSchema = Type.Union(
  [
    Type.Literal(0, { description: 'Multiple choice options' }),
    Type.Literal(1, { description: 'Many options shown as a dropdown' }),
  ],
  { ref: 'OnboardingPromptType' },
)

export type OnboardingPromptType = Static<typeof OnboardingPromptTypeSchema>

export const OnboardingPromptResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    title: Type.String(),
    options: Type.Array(OnboardingPromptOptionResponseSchema),
    single_select: Type.Boolean(),
    required: Type.Boolean(),
    in_onboarding: Type.Boolean(),
    type: OnboardingPromptTypeSchema,
  },
  { ref: 'OnboardingPromptResponse' },
)

export type OnboardingPromptResponse = Static<typeof OnboardingPromptResponseSchema>

export const GuildOnboardingResponseSchema = Type.Object(
  {
    guild_id: SnowflakeTypeSchema,
    prompts: Type.Array(OnboardingPromptResponseSchema),
    default_channel_ids: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    enabled: Type.Boolean(),
    mode: GuildOnboardingModeSchema,
  },
  { ref: 'GuildOnboardingResponse' },
)

export type GuildOnboardingResponse = Static<typeof GuildOnboardingResponseSchema>

export const UserNotificationSettingsSchema = Type.Union(
  [
    Type.Literal(0, {
      description: 'members will receive notifications for all messages by default',
    }),
    Type.Literal(1, {
      description:
        'members will receive notifications only for messages that @mention them by default',
    }),
  ],
  { ref: 'UserNotificationSettings' },
)

export type UserNotificationSettings = Static<typeof UserNotificationSettingsSchema>

export const GuildPatchRequestPartialSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ minLength: 2, maxLength: 100 })),
    description: Type.Optional(
      Type.Union([Type.String({ minLength: 0, maxLength: 300 }), Type.Null()]),
    ),
    region: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    icon: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    verification_level: Type.Optional(Type.Union([Type.Null(), VerificationLevelsSchema])),
    default_message_notifications: Type.Optional(
      Type.Union([Type.Null(), UserNotificationSettingsSchema]),
    ),
    explicit_content_filter: Type.Optional(
      Type.Union([Type.Null(), GuildExplicitContentFilterTypesSchema]),
    ),
    preferred_locale: Type.Optional(Type.Union([Type.Null(), AvailableLocalesEnumSchema])),
    afk_timeout: Type.Optional(Type.Union([Type.Null(), AfkTimeoutsSchema])),
    afk_channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    system_channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    splash: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    banner: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    system_channel_flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    features: Type.Optional(
      Type.Union([
        Type.Array(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]), {
          maxItems: 1521,
          uniqueItems: true,
        }),
        Type.Null(),
      ]),
    ),
    discovery_splash: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    home_header: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    rules_channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    safety_alerts_channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    public_updates_channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    premium_progress_bar_enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'GuildPatchRequestPartial' },
)

export type GuildPatchRequestPartial = Static<typeof GuildPatchRequestPartialSchema>

export const GuildPreviewResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    icon: Type.Union([Type.String(), Type.Null()]),
    description: Type.Union([Type.String(), Type.Null()]),
    home_header: Type.Union([Type.String(), Type.Null()]),
    splash: Type.Union([Type.String(), Type.Null()]),
    discovery_splash: Type.Union([Type.String(), Type.Null()]),
    features: Type.Array(GuildFeaturesSchema, { uniqueItems: true }),
    approximate_member_count: Type.Integer(),
    approximate_presence_count: Type.Integer(),
    emojis: Type.Array(EmojiResponseSchema),
    stickers: Type.Array(GuildStickerResponseSchema),
  },
  { ref: 'GuildPreviewResponse' },
)

export type GuildPreviewResponse = Static<typeof GuildPreviewResponseSchema>

export const GuildPruneResponseSchema = Type.Object(
  { pruned: Type.Union([Type.Integer(), Type.Null()]) },
  { ref: 'GuildPruneResponse' },
)

export type GuildPruneResponse = Static<typeof GuildPruneResponseSchema>

export const PremiumGuildTiersSchema = Type.Union(
  [
    Type.Literal(0, { description: 'Guild has not unlocked any Server Boost perks' }),
    Type.Literal(1, { description: 'Guild has unlocked Server Boost level 1 perks' }),
    Type.Literal(2, { description: 'Guild has unlocked Server Boost level 2 perks' }),
    Type.Literal(3, { description: 'Guild has unlocked Server Boost level 3 perks' }),
  ],
  { ref: 'PremiumGuildTiers' },
)

export type PremiumGuildTiers = Static<typeof PremiumGuildTiersSchema>

export const GuildResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    icon: Type.Union([Type.String(), Type.Null()]),
    description: Type.Union([Type.String(), Type.Null()]),
    home_header: Type.Union([Type.String(), Type.Null()]),
    splash: Type.Union([Type.String(), Type.Null()]),
    discovery_splash: Type.Union([Type.String(), Type.Null()]),
    features: Type.Array(GuildFeaturesSchema, { uniqueItems: true }),
    banner: Type.Union([Type.String(), Type.Null()]),
    owner_id: SnowflakeTypeSchema,
    application_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    region: Type.String(),
    afk_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    afk_timeout: AfkTimeoutsSchema,
    system_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    system_channel_flags: Type.Integer(),
    widget_enabled: Type.Boolean(),
    widget_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    verification_level: VerificationLevelsSchema,
    roles: Type.Array(GuildRoleResponseSchema),
    default_message_notifications: UserNotificationSettingsSchema,
    mfa_level: GuildMFALevelSchema,
    explicit_content_filter: GuildExplicitContentFilterTypesSchema,
    max_presences: Type.Union([Type.Integer(), Type.Null()]),
    max_members: Type.Integer(),
    max_stage_video_channel_users: Type.Integer(),
    max_video_channel_users: Type.Integer(),
    vanity_url_code: Type.Union([Type.String(), Type.Null()]),
    premium_tier: PremiumGuildTiersSchema,
    premium_subscription_count: Type.Integer(),
    preferred_locale: AvailableLocalesEnumSchema,
    rules_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    safety_alerts_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    public_updates_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    premium_progress_bar_enabled: Type.Boolean(),
    premium_progress_bar_enabled_user_updated_at: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    nsfw: Type.Boolean(),
    nsfw_level: GuildNSFWContentLevelSchema,
    emojis: Type.Array(EmojiResponseSchema),
    stickers: Type.Array(GuildStickerResponseSchema),
    incidents_data: Type.Union([Type.Null(), GuildIncidentsDataResponseSchema]),
  },
  { ref: 'GuildResponse' },
)

export type GuildResponse = Static<typeof GuildResponseSchema>

export const GuildScheduledEventExceptionCreateRequestSchema = Type.Object(
  {
    scheduled_start_time: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date-time',
          description: 'Overridden start time of this occurrence',
        }),
        Type.Null(),
      ]),
    ),
    scheduled_end_time: Type.Optional(
      Type.Union([
        Type.String({ format: 'date-time', description: 'Overridden end time of this occurrence' }),
        Type.Null(),
      ]),
    ),
    original_scheduled_start_time: Type.String({
      format: 'date-time',
      description: 'The original start time of the occurrence to create an exception for',
    }),
    is_canceled: Type.Optional(
      Type.Union([
        Type.Boolean({ description: 'Whether this occurrence is canceled' }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'GuildScheduledEventExceptionCreateRequest' },
)

export type GuildScheduledEventExceptionCreateRequest = Static<
  typeof GuildScheduledEventExceptionCreateRequestSchema
>

export const GuildScheduledEventExceptionPatchRequestPartialSchema = Type.Object(
  {
    scheduled_start_time: Type.Optional(
      Type.Union([
        Type.String({
          format: 'date-time',
          description: 'Overridden start time of this occurrence',
        }),
        Type.Null(),
      ]),
    ),
    scheduled_end_time: Type.Optional(
      Type.Union([
        Type.String({ format: 'date-time', description: 'Overridden end time of this occurrence' }),
        Type.Null(),
      ]),
    ),
    is_canceled: Type.Optional(
      Type.Union([
        Type.Boolean({ description: 'Whether this occurrence is canceled' }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'GuildScheduledEventExceptionPatchRequestPartial' },
)

export type GuildScheduledEventExceptionPatchRequestPartial = Static<
  typeof GuildScheduledEventExceptionPatchRequestPartialSchema
>

export const SearchMessageResponseSchema = Type.Object(
  {
    type: MessageTypeSchema,
    content: Type.String(),
    mentions: Type.Array(UserResponseSchema),
    mention_roles: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    attachments: Type.Array(MessageAttachmentResponseSchema),
    embeds: Type.Array(MessageEmbedResponseSchema),
    timestamp: Type.String({ format: 'date-time' }),
    edited_timestamp: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    flags: Type.Integer(),
    components: Type.Array(
      Type.Union([
        ActionRowComponentResponseSchema,
        ContainerComponentResponseSchema,
        FileComponentResponseSchema,
        MediaGalleryComponentResponseSchema,
        SectionComponentResponseSchema,
        SeparatorComponentResponseSchema,
        TextDisplayComponentResponseSchema,
      ]),
    ),
    stickers: Type.Optional(
      Type.Array(Type.Union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
    ),
    sticker_items: Type.Optional(Type.Array(MessageStickerItemResponseSchema)),
    id: SnowflakeTypeSchema,
    channel_id: SnowflakeTypeSchema,
    author: UserResponseSchema,
    pinned: Type.Boolean(),
    mention_everyone: Type.Boolean(),
    tts: Type.Boolean(),
    call: Type.Optional(MessageCallResponseSchema),
    activity: Type.Optional(MessageActivityResponseSchema),
    application: Type.Optional(BasicApplicationResponseWithBotSchema),
    application_id: Type.Optional(SnowflakeTypeSchema),
    interaction: Type.Optional(MessageInteractionResponseSchema),
    nonce: Type.Optional(
      Type.Union([
        Type.Integer({ minimum: -9223372036854776000, maximum: 9223372036854776000 }),
        Type.String({ maxLength: 25 }),
      ]),
    ),
    webhook_id: Type.Optional(SnowflakeTypeSchema),
    message_reference: Type.Optional(MessageReferenceResponseSchema),
    thread: Type.Optional(ThreadResponseSchema),
    mention_channels: Type.Optional(Type.Array(MessageMentionChannelResponseSchema)),
    role_subscription_data: Type.Optional(MessageRoleSubscriptionDataResponseSchema),
    purchase_notification: Type.Optional(PurchaseNotificationResponseSchema),
    position: Type.Optional(Type.Integer()),
    resolved: Type.Optional(ResolvedObjectsResponseSchema),
    poll: Type.Optional(PollResponseSchema),
    shared_client_theme: Type.Optional(CustomClientThemeResponseSchema),
    interaction_metadata: Type.Optional(
      Type.Union([
        ApplicationCommandInteractionMetadataResponseSchema,
        MessageComponentInteractionMetadataResponseSchema,
        ModalSubmitInteractionMetadataResponseSchema,
      ]),
    ),
    message_snapshots: Type.Optional(Type.Array(MessageSnapshotResponseSchema)),
    lobby_member: Type.Optional(MessageLobbyMemberResponseSchema),
    actor: Type.Optional(UserResponseSchema),
    reactions: Type.Optional(Type.Array(MessageReactionResponseSchema)),
    referenced_message: Type.Optional(Type.Union([Type.Null(), BasicMessageResponseSchema])),
    hit: Type.Boolean(),
    restriction_count: Type.Optional(Type.Integer()),
    author_restriction_count: Type.Optional(Type.Integer()),
    source_author_restriction_count: Type.Optional(Type.Integer()),
    forward_source_author_id: Type.Optional(SnowflakeTypeSchema),
  },
  { ref: 'SearchMessageResponse' },
)

export type SearchMessageResponse = Static<typeof SearchMessageResponseSchema>

export const GuildSearchResponseSchema = Type.Object(
  {
    messages: Type.Array(Type.Array(SearchMessageResponseSchema)),
    doing_deep_historical_index: Type.Boolean(),
    total_results: Type.Integer(),
    threads: Type.Optional(Type.Union([Type.Array(ThreadResponseSchema), Type.Null()])),
    members: Type.Optional(Type.Union([Type.Array(ThreadMemberResponseSchema), Type.Null()])),
    documents_indexed: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
  },
  { ref: 'GuildSearchResponse' },
)

export type GuildSearchResponse = Static<typeof GuildSearchResponseSchema>

export const GuildSubscriptionIntegrationResponseSchema = Type.Object(
  {
    type: IntegrationTypesSchema,
    name: Type.Union([Type.String(), Type.Null()]),
    account: AccountResponseSchema,
    enabled: Type.Boolean(),
    id: SnowflakeTypeSchema,
  },
  { ref: 'GuildSubscriptionIntegrationResponse' },
)

export type GuildSubscriptionIntegrationResponse = Static<
  typeof GuildSubscriptionIntegrationResponseSchema
>

export const GuildTemplateChannelTagsSchema = Type.Object(
  {
    id: Type.Union([Type.Integer(), Type.Null()]),
    name: Type.String(),
    emoji_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    emoji_name: Type.Union([Type.String(), Type.Null()]),
    moderated: Type.Union([Type.Boolean(), Type.Null()]),
  },
  { ref: 'GuildTemplateChannelTags' },
)

export type GuildTemplateChannelTags = Static<typeof GuildTemplateChannelTagsSchema>

export const GuildTemplateChannelResponseSchema = Type.Object(
  {
    id: Type.Union([Type.Integer(), Type.Null()]),
    type: ChannelTypesSchema,
    name: Type.Union([Type.String(), Type.Null()]),
    position: Type.Union([Type.Integer(), Type.Null()]),
    topic: Type.Union([Type.String(), Type.Null()]),
    bitrate: Type.Integer(),
    user_limit: Type.Integer(),
    nsfw: Type.Boolean(),
    rate_limit_per_user: Type.Integer(),
    parent_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    default_auto_archive_duration: Type.Union([Type.Null(), ThreadAutoArchiveDurationSchema]),
    permission_overwrites: Type.Array(ChannelPermissionOverwriteResponseSchema),
    available_tags: Type.Union([Type.Array(GuildTemplateChannelTagsSchema), Type.Null()]),
    template: Type.String(),
    default_reaction_emoji: Type.Union([Type.Null(), DefaultReactionEmojiResponseSchema]),
    default_thread_rate_limit_per_user: Type.Union([Type.Integer(), Type.Null()]),
    default_sort_order: Type.Union([Type.Null(), ThreadSortOrderSchema]),
    default_forum_layout: Type.Union([Type.Null(), ForumLayoutSchema]),
    default_tag_setting: Type.Union([Type.Null(), ThreadSearchTagSettingSchema]),
    theme_color: Type.Union([Type.Integer(), Type.Null()]),
  },
  { ref: 'GuildTemplateChannelResponse' },
)

export type GuildTemplateChannelResponse = Static<typeof GuildTemplateChannelResponseSchema>

export const GuildTemplateRoleColorsResponseSchema = Type.Object(
  {
    primary_color: Type.Integer(),
    secondary_color: Type.Union([Type.Integer(), Type.Null()]),
    tertiary_color: Type.Union([Type.Integer(), Type.Null()]),
  },
  { ref: 'GuildTemplateRoleColorsResponse' },
)

export type GuildTemplateRoleColorsResponse = Static<typeof GuildTemplateRoleColorsResponseSchema>

export const GuildTemplateRoleResponseSchema = Type.Object(
  {
    id: Type.Integer(),
    name: Type.String(),
    permissions: Type.String(),
    color: Type.Integer(),
    colors: Type.Union([Type.Null(), GuildTemplateRoleColorsResponseSchema]),
    hoist: Type.Boolean(),
    mentionable: Type.Boolean(),
    icon: Type.Union([Type.String(), Type.Null()]),
    unicode_emoji: Type.Union([Type.String(), Type.Null()]),
  },
  { ref: 'GuildTemplateRoleResponse' },
)

export type GuildTemplateRoleResponse = Static<typeof GuildTemplateRoleResponseSchema>

export const GuildTemplateSnapshotResponseSchema = Type.Object(
  {
    name: Type.String(),
    description: Type.Union([Type.String(), Type.Null()]),
    region: Type.Union([Type.String(), Type.Null()]),
    verification_level: VerificationLevelsSchema,
    default_message_notifications: UserNotificationSettingsSchema,
    explicit_content_filter: GuildExplicitContentFilterTypesSchema,
    preferred_locale: AvailableLocalesEnumSchema,
    afk_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    afk_timeout: AfkTimeoutsSchema,
    system_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    system_channel_flags: Type.Integer(),
    roles: Type.Array(GuildTemplateRoleResponseSchema),
    channels: Type.Array(GuildTemplateChannelResponseSchema),
  },
  { ref: 'GuildTemplateSnapshotResponse' },
)

export type GuildTemplateSnapshotResponse = Static<typeof GuildTemplateSnapshotResponseSchema>

export const GuildTemplateResponseSchema = Type.Object(
  {
    code: Type.String(),
    name: Type.String(),
    description: Type.Union([Type.String(), Type.Null()]),
    usage_count: Type.Integer(),
    creator_id: SnowflakeTypeSchema,
    creator: Type.Union([Type.Null(), UserResponseSchema]),
    created_at: Type.String({ format: 'date-time' }),
    updated_at: Type.String({ format: 'date-time' }),
    source_guild_id: SnowflakeTypeSchema,
    serialized_source_guild: GuildTemplateSnapshotResponseSchema,
    is_dirty: Type.Union([Type.Boolean(), Type.Null()]),
  },
  { ref: 'GuildTemplateResponse' },
)

export type GuildTemplateResponse = Static<typeof GuildTemplateResponseSchema>

export const GuildWelcomeChannelSchema = Type.Object(
  {
    channel_id: SnowflakeTypeSchema,
    description: Type.String({ minLength: 1, maxLength: 50 }),
    emoji_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    emoji_name: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
  },
  { ref: 'GuildWelcomeChannel' },
)

export type GuildWelcomeChannel = Static<typeof GuildWelcomeChannelSchema>

export const GuildWelcomeScreenChannelResponseSchema = Type.Object(
  {
    channel_id: SnowflakeTypeSchema,
    description: Type.String(),
    emoji_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    emoji_name: Type.Union([Type.String(), Type.Null()]),
  },
  { ref: 'GuildWelcomeScreenChannelResponse' },
)

export type GuildWelcomeScreenChannelResponse = Static<
  typeof GuildWelcomeScreenChannelResponseSchema
>

export const GuildWelcomeScreenResponseSchema = Type.Object(
  {
    description: Type.Union([Type.String(), Type.Null()]),
    welcome_channels: Type.Array(GuildWelcomeScreenChannelResponseSchema),
  },
  { ref: 'GuildWelcomeScreenResponse' },
)

export type GuildWelcomeScreenResponse = Static<typeof GuildWelcomeScreenResponseSchema>

export const GuildWithCountsResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    icon: Type.Union([Type.String(), Type.Null()]),
    description: Type.Union([Type.String(), Type.Null()]),
    home_header: Type.Union([Type.String(), Type.Null()]),
    splash: Type.Union([Type.String(), Type.Null()]),
    discovery_splash: Type.Union([Type.String(), Type.Null()]),
    features: Type.Array(GuildFeaturesSchema, { uniqueItems: true }),
    banner: Type.Union([Type.String(), Type.Null()]),
    owner_id: SnowflakeTypeSchema,
    application_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    region: Type.String(),
    afk_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    afk_timeout: AfkTimeoutsSchema,
    system_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    system_channel_flags: Type.Integer(),
    widget_enabled: Type.Boolean(),
    widget_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    verification_level: VerificationLevelsSchema,
    roles: Type.Array(GuildRoleResponseSchema),
    default_message_notifications: UserNotificationSettingsSchema,
    mfa_level: GuildMFALevelSchema,
    explicit_content_filter: GuildExplicitContentFilterTypesSchema,
    max_presences: Type.Union([Type.Integer(), Type.Null()]),
    max_members: Type.Integer(),
    max_stage_video_channel_users: Type.Integer(),
    max_video_channel_users: Type.Integer(),
    vanity_url_code: Type.Union([Type.String(), Type.Null()]),
    premium_tier: PremiumGuildTiersSchema,
    premium_subscription_count: Type.Integer(),
    preferred_locale: AvailableLocalesEnumSchema,
    rules_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    safety_alerts_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    public_updates_channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    premium_progress_bar_enabled: Type.Boolean(),
    premium_progress_bar_enabled_user_updated_at: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    nsfw: Type.Boolean(),
    nsfw_level: GuildNSFWContentLevelSchema,
    emojis: Type.Array(EmojiResponseSchema),
    stickers: Type.Array(GuildStickerResponseSchema),
    incidents_data: Type.Union([Type.Null(), GuildIncidentsDataResponseSchema]),
    approximate_member_count: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    approximate_presence_count: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
  },
  { ref: 'GuildWithCountsResponse' },
)

export type GuildWithCountsResponse = Static<typeof GuildWithCountsResponseSchema>

export const HasOptionSchema = Type.Union(
  [
    Type.Literal('link'),
    Type.Literal('embed'),
    Type.Literal('file'),
    Type.Literal('image'),
    Type.Literal('video'),
    Type.Literal('sound'),
    Type.Literal('sticker'),
    Type.Literal('poll'),
    Type.Literal('snapshot'),
    Type.Literal('-link'),
    Type.Literal('-embed'),
    Type.Literal('-file'),
    Type.Literal('-image'),
    Type.Literal('-video'),
    Type.Literal('-sound'),
    Type.Literal('-sticker'),
    Type.Literal('-poll'),
    Type.Literal('-snapshot'),
  ],
  { ref: 'HasOption' },
)

export type HasOption = Static<typeof HasOptionSchema>

export const IncomingWebhookRequestPartialSchema = Type.Object(
  {
    content: Type.Optional(Type.Union([Type.String({ maxLength: 2000 }), Type.Null()])),
    embeds: Type.Optional(Type.Union([Type.Array(RichEmbedSchema, { maxItems: 10 }), Type.Null()])),
    allowed_mentions: Type.Optional(Type.Union([Type.Null(), MessageAllowedMentionsRequestSchema])),
    components: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
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
        Type.Null(),
      ]),
    ),
    attachments: Type.Optional(
      Type.Union([Type.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), Type.Null()]),
    ),
    poll: Type.Optional(Type.Union([Type.Null(), PollCreateRequestSchema])),
    tts: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    username: Type.Optional(
      Type.Union([Type.String({ minLength: 1, maxLength: 80 }), Type.Null()]),
    ),
    avatar_url: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    thread_name: Type.Optional(
      Type.Union([Type.String({ minLength: 0, maxLength: 100 }), Type.Null()]),
    ),
    applied_tags: Type.Optional(
      Type.Union([Type.Array(SnowflakeTypeSchema, { maxItems: 5 }), Type.Null()]),
    ),
  },
  { ref: 'IncomingWebhookRequestPartial' },
)

export type IncomingWebhookRequestPartial = Static<typeof IncomingWebhookRequestPartialSchema>

export const IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema = Type.Object(
  {
    content: Type.Optional(Type.Union([Type.String({ maxLength: 2000 }), Type.Null()])),
    embeds: Type.Optional(Type.Union([Type.Array(RichEmbedSchema, { maxItems: 10 }), Type.Null()])),
    allowed_mentions: Type.Optional(Type.Union([Type.Null(), MessageAllowedMentionsRequestSchema])),
    components: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
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
        Type.Null(),
      ]),
    ),
    attachments: Type.Optional(
      Type.Union([Type.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), Type.Null()]),
    ),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
  },
  { ref: 'IncomingWebhookUpdateForInteractionCallbackRequestPartial' },
)

export type IncomingWebhookUpdateForInteractionCallbackRequestPartial = Static<
  typeof IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema
>

export const IncomingWebhookUpdateRequestPartialSchema = Type.Object(
  {
    content: Type.Optional(Type.Union([Type.String({ maxLength: 2000 }), Type.Null()])),
    embeds: Type.Optional(Type.Union([Type.Array(RichEmbedSchema, { maxItems: 10 }), Type.Null()])),
    allowed_mentions: Type.Optional(Type.Union([Type.Null(), MessageAllowedMentionsRequestSchema])),
    components: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
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
        Type.Null(),
      ]),
    ),
    attachments: Type.Optional(
      Type.Union([Type.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), Type.Null()]),
    ),
    poll: Type.Optional(Type.Union([Type.Null(), PollCreateRequestSchema])),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
  },
  { ref: 'IncomingWebhookUpdateRequestPartial' },
)

export type IncomingWebhookUpdateRequestPartial = Static<
  typeof IncomingWebhookUpdateRequestPartialSchema
>

export const InteractionResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    activity_instance_id: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    response_message_id: Type.Optional(SnowflakeTypeSchema),
    response_message_loading: Type.Optional(Type.Boolean()),
    response_message_ephemeral: Type.Optional(Type.Boolean()),
    channel_id: Type.Optional(SnowflakeTypeSchema),
    guild_id: Type.Optional(SnowflakeTypeSchema),
  },
  { ref: 'InteractionResponse' },
)

export type InteractionResponse = Static<typeof InteractionResponseSchema>

export const LaunchActivityInteractionCallbackResponseSchema = Type.Object(
  {
    type: InteractionCallbackTypesSchema,
    activity_instance: ActivityInstanceCallbackResponseSchema,
  },
  { ref: 'LaunchActivityInteractionCallbackResponse' },
)

export type LaunchActivityInteractionCallbackResponse = Static<
  typeof LaunchActivityInteractionCallbackResponseSchema
>

export const UpdateMessageInteractionCallbackResponseSchema = Type.Object(
  { type: InteractionCallbackTypesSchema, message: MessageResponseSchema },
  { ref: 'UpdateMessageInteractionCallbackResponse' },
)

export type UpdateMessageInteractionCallbackResponse = Static<
  typeof UpdateMessageInteractionCallbackResponseSchema
>

export const InteractionCallbackResponseSchema = Type.Object(
  {
    interaction: InteractionResponseSchema,
    resource: Type.Optional(
      Type.Union([
        CreateMessageInteractionCallbackResponseSchema,
        LaunchActivityInteractionCallbackResponseSchema,
        UpdateMessageInteractionCallbackResponseSchema,
      ]),
    ),
  },
  { ref: 'InteractionCallbackResponse' },
)

export type InteractionCallbackResponse = Static<typeof InteractionCallbackResponseSchema>

export const KeywordTriggerMetadataSchema = Type.Object(
  {
    keyword_filter: Type.Optional(
      Type.Union([
        Type.Array(Type.String({ minLength: 1, maxLength: 60 }), { maxItems: 1000 }),
        Type.Null(),
      ]),
    ),
    regex_patterns: Type.Optional(
      Type.Union([
        Type.Array(Type.String({ minLength: 1, maxLength: 260 }), { maxItems: 10 }),
        Type.Null(),
      ]),
    ),
    allow_list: Type.Optional(
      Type.Union([
        Type.Array(Type.String({ minLength: 1, maxLength: 60 }), { maxItems: 100 }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'KeywordTriggerMetadata' },
)

export type KeywordTriggerMetadata = Static<typeof KeywordTriggerMetadataSchema>

export const KeywordUpsertRequestSchema = Type.Object(
  {
    name: Type.String({ maxLength: 100 }),
    event_type: AutomodEventTypeSchema,
    actions: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
          { minItems: 1, maxItems: 5 },
        ),
        Type.Null(),
      ]),
    ),
    enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    exempt_roles: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    exempt_channels: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: Type.Optional(Type.Union([Type.Null(), KeywordTriggerMetadataSchema])),
  },
  { ref: 'KeywordUpsertRequest' },
)

export type KeywordUpsertRequest = Static<typeof KeywordUpsertRequestSchema>

export const KeywordUpsertRequestPartialSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ maxLength: 100 })),
    event_type: Type.Optional(AutomodEventTypeSchema),
    actions: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
          { minItems: 1, maxItems: 5 },
        ),
        Type.Null(),
      ]),
    ),
    enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    exempt_roles: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    exempt_channels: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    trigger_type: Type.Optional(AutomodTriggerTypeSchema),
    trigger_metadata: Type.Optional(Type.Union([Type.Null(), KeywordTriggerMetadataSchema])),
  },
  { ref: 'KeywordUpsertRequestPartial' },
)

export type KeywordUpsertRequestPartial = Static<typeof KeywordUpsertRequestPartialSchema>

export const MentionableSelectComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 150 }), Type.Null()])),
    min_values: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 25 }), Type.Null()])),
    max_values: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 25 }), Type.Null()])),
    disabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    default_values: Type.Optional(
      Type.Union([
        Type.Array(Type.Union([RoleSelectDefaultValueSchema, UserSelectDefaultValueSchema]), {
          maxItems: 25,
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'MentionableSelectComponentForModalRequest' },
)

export type MentionableSelectComponentForModalRequest = Static<
  typeof MentionableSelectComponentForModalRequestSchema
>

export const RadioGroupOptionForRequestSchema = Type.Object(
  {
    label: Type.String({ minLength: 1, maxLength: 100 }),
    value: Type.String({ minLength: 1, maxLength: 100 }),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
    default: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'RadioGroupOptionForRequest' },
)

export type RadioGroupOptionForRequest = Static<typeof RadioGroupOptionForRequestSchema>

export const RadioGroupComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    options: Type.Array(RadioGroupOptionForRequestSchema, { minItems: 2, maxItems: 10 }),
  },
  { ref: 'RadioGroupComponentForModalRequest' },
)

export type RadioGroupComponentForModalRequest = Static<
  typeof RadioGroupComponentForModalRequestSchema
>

export const RoleSelectComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 150 }), Type.Null()])),
    min_values: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 25 }), Type.Null()])),
    max_values: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 25 }), Type.Null()])),
    disabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    default_values: Type.Optional(
      Type.Union([Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }), Type.Null()]),
    ),
  },
  { ref: 'RoleSelectComponentForModalRequest' },
)

export type RoleSelectComponentForModalRequest = Static<
  typeof RoleSelectComponentForModalRequestSchema
>

export const StringSelectComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 150 }), Type.Null()])),
    min_values: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 25 }), Type.Null()])),
    max_values: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 25 }), Type.Null()])),
    disabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    options: Type.Array(StringSelectOptionForRequestSchema, { minItems: 1, maxItems: 25 }),
  },
  { ref: 'StringSelectComponentForModalRequest' },
)

export type StringSelectComponentForModalRequest = Static<
  typeof StringSelectComponentForModalRequestSchema
>

export const UserSelectComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    placeholder: Type.Optional(Type.Union([Type.String({ maxLength: 150 }), Type.Null()])),
    min_values: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 25 }), Type.Null()])),
    max_values: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 25 }), Type.Null()])),
    disabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    default_values: Type.Optional(
      Type.Union([Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }), Type.Null()]),
    ),
  },
  { ref: 'UserSelectComponentForModalRequest' },
)

export type UserSelectComponentForModalRequest = Static<
  typeof UserSelectComponentForModalRequestSchema
>

export const LabelComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    label: Type.String({ minLength: 1, maxLength: 45 }),
    description: Type.Optional(
      Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
    ),
    component: Type.Union([
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
  },
  { ref: 'LabelComponentForModalRequest' },
)

export type LabelComponentForModalRequest = Static<typeof LabelComponentForModalRequestSchema>

export const LaunchActivityInteractionCallbackRequestSchema = Type.Object(
  { type: InteractionCallbackTypesSchema },
  { ref: 'LaunchActivityInteractionCallbackRequest' },
)

export type LaunchActivityInteractionCallbackRequest = Static<
  typeof LaunchActivityInteractionCallbackRequestSchema
>

export const ListApplicationEmojisResponseSchema = Type.Object(
  { items: Type.Array(EmojiResponseSchema) },
  { ref: 'ListApplicationEmojisResponse' },
)

export type ListApplicationEmojisResponse = Static<typeof ListApplicationEmojisResponseSchema>

export const SoundboardSoundResponseSchema = Type.Object(
  {
    name: Type.String(),
    sound_id: SnowflakeTypeSchema,
    volume: Type.Number(),
    emoji_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    emoji_name: Type.Union([Type.String(), Type.Null()]),
    guild_id: Type.Optional(SnowflakeTypeSchema),
    available: Type.Boolean(),
    user: Type.Optional(UserResponseSchema),
  },
  { ref: 'SoundboardSoundResponse' },
)

export type SoundboardSoundResponse = Static<typeof SoundboardSoundResponseSchema>

export const ListGuildSoundboardSoundsResponseSchema = Type.Object(
  { items: Type.Array(SoundboardSoundResponseSchema) },
  { ref: 'ListGuildSoundboardSoundsResponse' },
)

export type ListGuildSoundboardSoundsResponse = Static<
  typeof ListGuildSoundboardSoundsResponseSchema
>

export const LobbyGuildInviteResponseSchema = Type.Object(
  { code: Type.String() },
  { ref: 'LobbyGuildInviteResponse' },
)

export type LobbyGuildInviteResponse = Static<typeof LobbyGuildInviteResponseSchema>

export const LobbyMemberRequestSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    metadata: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ maxLength: 1024 }), { maxProperties: 25 }),
        Type.Null(),
      ]),
    ),
    flags: Type.Optional(Type.Union([Type.Null(), Type.Literal(1)])),
    additional_name: Type.Optional(
      Type.Union([Type.String({ minLength: 1, maxLength: 80 }), Type.Null()]),
    ),
  },
  { ref: 'LobbyMemberRequest' },
)

export type LobbyMemberRequest = Static<typeof LobbyMemberRequestSchema>

export const LobbyMemberResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    metadata: Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    flags: Type.Integer(),
    additional_name: Type.Optional(Type.String()),
  },
  { ref: 'LobbyMemberResponse' },
)

export type LobbyMemberResponse = Static<typeof LobbyMemberResponseSchema>

export const LobbyMessageResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    type: MessageTypeSchema,
    content: Type.String(),
    lobby_id: SnowflakeTypeSchema,
    channel_id: SnowflakeTypeSchema,
    author: UserResponseSchema,
    lobby_member: Type.Optional(MessageLobbyMemberResponseSchema),
    metadata: Type.Optional(Type.Record(Type.String(), Type.String())),
    moderation_metadata: Type.Optional(Type.Record(Type.String(), Type.String())),
    flags: Type.Integer(),
    application_id: Type.Optional(SnowflakeTypeSchema),
  },
  { ref: 'LobbyMessageResponse' },
)

export type LobbyMessageResponse = Static<typeof LobbyMessageResponseSchema>

export const LobbyResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    application_id: SnowflakeTypeSchema,
    metadata: Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
    members: Type.Array(LobbyMemberResponseSchema),
    linked_channel: Type.Optional(GuildChannelResponseSchema),
    flags: UInt32TypeSchema,
    override_event_webhooks_url: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { ref: 'LobbyResponse' },
)

export type LobbyResponse = Static<typeof LobbyResponseSchema>

export const MLSpamTriggerMetadataSchema = Type.Object({}, { ref: 'MLSpamTriggerMetadata' })

export type MLSpamTriggerMetadata = Static<typeof MLSpamTriggerMetadataSchema>

export const MLSpamUpsertRequestSchema = Type.Object(
  {
    name: Type.String({ maxLength: 100 }),
    event_type: AutomodEventTypeSchema,
    actions: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
          { minItems: 1, maxItems: 5 },
        ),
        Type.Null(),
      ]),
    ),
    enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    exempt_roles: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    exempt_channels: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: Type.Optional(Type.Union([Type.Null(), MLSpamTriggerMetadataSchema])),
  },
  { ref: 'MLSpamUpsertRequest' },
)

export type MLSpamUpsertRequest = Static<typeof MLSpamUpsertRequestSchema>

export const MLSpamUpsertRequestPartialSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ maxLength: 100 })),
    event_type: Type.Optional(AutomodEventTypeSchema),
    actions: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
          { minItems: 1, maxItems: 5 },
        ),
        Type.Null(),
      ]),
    ),
    enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    exempt_roles: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    exempt_channels: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    trigger_type: Type.Optional(AutomodTriggerTypeSchema),
    trigger_metadata: Type.Optional(Type.Union([Type.Null(), MLSpamTriggerMetadataSchema])),
  },
  { ref: 'MLSpamUpsertRequestPartial' },
)

export type MLSpamUpsertRequestPartial = Static<typeof MLSpamUpsertRequestPartialSchema>

export const MentionSpamTriggerMetadataSchema = Type.Object(
  {
    mention_total_limit: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 50 }), Type.Null()]),
    ),
    mention_raid_protection_enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'MentionSpamTriggerMetadata' },
)

export type MentionSpamTriggerMetadata = Static<typeof MentionSpamTriggerMetadataSchema>

export const MentionSpamUpsertRequestSchema = Type.Object(
  {
    name: Type.String({ maxLength: 100 }),
    event_type: AutomodEventTypeSchema,
    actions: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
          { minItems: 1, maxItems: 5 },
        ),
        Type.Null(),
      ]),
    ),
    enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    exempt_roles: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    exempt_channels: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: Type.Optional(Type.Union([Type.Null(), MentionSpamTriggerMetadataSchema])),
  },
  { ref: 'MentionSpamUpsertRequest' },
)

export type MentionSpamUpsertRequest = Static<typeof MentionSpamUpsertRequestSchema>

export const MentionSpamUpsertRequestPartialSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ maxLength: 100 })),
    event_type: Type.Optional(AutomodEventTypeSchema),
    actions: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
          { minItems: 1, maxItems: 5 },
        ),
        Type.Null(),
      ]),
    ),
    enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    exempt_roles: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    exempt_channels: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    trigger_type: Type.Optional(AutomodTriggerTypeSchema),
    trigger_metadata: Type.Optional(Type.Union([Type.Null(), MentionSpamTriggerMetadataSchema])),
  },
  { ref: 'MentionSpamUpsertRequestPartial' },
)

export type MentionSpamUpsertRequestPartial = Static<typeof MentionSpamUpsertRequestPartialSchema>

export const MessageReferenceRequestSchema = Type.Object(
  {
    guild_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    message_id: SnowflakeTypeSchema,
    fail_if_not_exists: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    type: Type.Optional(Type.Union([Type.Null(), MessageReferenceTypeSchema])),
  },
  { ref: 'MessageReferenceRequest' },
)

export type MessageReferenceRequest = Static<typeof MessageReferenceRequestSchema>

export const MessageCreateRequestSchema = Type.Object(
  {
    content: Type.Optional(Type.Union([Type.String({ maxLength: 4000 }), Type.Null()])),
    embeds: Type.Optional(Type.Union([Type.Array(RichEmbedSchema, { maxItems: 10 }), Type.Null()])),
    allowed_mentions: Type.Optional(Type.Union([Type.Null(), MessageAllowedMentionsRequestSchema])),
    sticker_ids: Type.Optional(
      Type.Union([Type.Array(SnowflakeTypeSchema, { maxItems: 3 }), Type.Null()]),
    ),
    components: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
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
        Type.Null(),
      ]),
    ),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    attachments: Type.Optional(
      Type.Union([Type.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), Type.Null()]),
    ),
    poll: Type.Optional(Type.Union([Type.Null(), PollCreateRequestSchema])),
    shared_client_theme: Type.Optional(
      Type.Union([Type.Null(), CustomClientThemeShareRequestSchema]),
    ),
    message_reference: Type.Optional(Type.Union([Type.Null(), MessageReferenceRequestSchema])),
    nonce: Type.Optional(
      Type.Union([
        Type.Integer({ minimum: -9223372036854776000, maximum: 9223372036854776000 }),
        Type.String({ maxLength: 25 }),
        Type.Null(),
      ]),
    ),
    enforce_nonce: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    tts: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'MessageCreateRequest' },
)

export type MessageCreateRequest = Static<typeof MessageCreateRequestSchema>

export const MessageEditRequestPartialSchema = Type.Object(
  {
    content: Type.Optional(Type.Union([Type.String({ maxLength: 4000 }), Type.Null()])),
    embeds: Type.Optional(Type.Union([Type.Array(RichEmbedSchema, { maxItems: 10 }), Type.Null()])),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    allowed_mentions: Type.Optional(Type.Union([Type.Null(), MessageAllowedMentionsRequestSchema])),
    sticker_ids: Type.Optional(
      Type.Union([Type.Array(SnowflakeTypeSchema, { maxItems: 1521 }), Type.Null()]),
    ),
    components: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
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
        Type.Null(),
      ]),
    ),
    attachments: Type.Optional(
      Type.Union([Type.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), Type.Null()]),
    ),
  },
  { ref: 'MessageEditRequestPartial' },
)

export type MessageEditRequestPartial = Static<typeof MessageEditRequestPartialSchema>

export const TextDisplayComponentForModalRequestSchema = Type.Object(
  {
    type: MessageComponentTypesSchema,
    id: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    content: Type.String({ minLength: 1, maxLength: 4000 }),
  },
  { ref: 'TextDisplayComponentForModalRequest' },
)

export type TextDisplayComponentForModalRequest = Static<
  typeof TextDisplayComponentForModalRequestSchema
>

export const ModalInteractionCallbackRequestDataSchema = Type.Object(
  {
    custom_id: Type.String({ minLength: 1, maxLength: 100 }),
    title: Type.String({ minLength: 1, maxLength: 45 }),
    components: Type.Array(
      Type.Union([
        ActionRowComponentForModalRequestSchema,
        LabelComponentForModalRequestSchema,
        TextDisplayComponentForModalRequestSchema,
      ]),
      { minItems: 1, maxItems: 40 },
    ),
  },
  { ref: 'ModalInteractionCallbackRequestData' },
)

export type ModalInteractionCallbackRequestData = Static<
  typeof ModalInteractionCallbackRequestDataSchema
>

export const ModalInteractionCallbackRequestSchema = Type.Object(
  { type: InteractionCallbackTypesSchema, data: ModalInteractionCallbackRequestDataSchema },
  { ref: 'ModalInteractionCallbackRequest' },
)

export type ModalInteractionCallbackRequest = Static<typeof ModalInteractionCallbackRequestSchema>

export const MyGuildResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    icon: Type.Union([Type.String(), Type.Null()]),
    banner: Type.Union([Type.String(), Type.Null()]),
    owner: Type.Boolean(),
    permissions: Type.String(),
    features: Type.Array(GuildFeaturesSchema, { uniqueItems: true }),
    approximate_member_count: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    approximate_presence_count: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
  },
  { ref: 'MyGuildResponse' },
)

export type MyGuildResponse = Static<typeof MyGuildResponseSchema>

export const OAuth2GetAuthorizationResponseSchema = Type.Object(
  {
    application: ApplicationResponseSchema,
    expires: Type.String({ format: 'date-time' }),
    scopes: Type.Array(OAuth2ScopesSchema, { uniqueItems: true }),
    user: Type.Optional(UserResponseSchema),
  },
  { ref: 'OAuth2GetAuthorizationResponse' },
)

export type OAuth2GetAuthorizationResponse = Static<typeof OAuth2GetAuthorizationResponseSchema>

export const OAuth2KeySchema = Type.Object(
  {
    kty: Type.String(),
    use: Type.String(),
    kid: Type.String(),
    n: Type.String(),
    e: Type.String(),
    alg: Type.String(),
  },
  { ref: 'OAuth2Key' },
)

export type OAuth2Key = Static<typeof OAuth2KeySchema>

export const OAuth2GetKeysSchema = Type.Object(
  { keys: Type.Array(OAuth2KeySchema) },
  { ref: 'OAuth2GetKeys' },
)

export type OAuth2GetKeys = Static<typeof OAuth2GetKeysSchema>

export const OAuth2GetOpenIDConnectUserInfoResponseSchema = Type.Object(
  {
    sub: Type.String(),
    email: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    email_verified: Type.Optional(Type.Boolean()),
    preferred_username: Type.Optional(Type.String()),
    nickname: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    picture: Type.Optional(Type.String()),
    locale: Type.Optional(Type.String()),
  },
  { ref: 'OAuth2GetOpenIDConnectUserInfoResponse' },
)

export type OAuth2GetOpenIDConnectUserInfoResponse = Static<
  typeof OAuth2GetOpenIDConnectUserInfoResponseSchema
>

export const OnboardingPromptOptionRequestSchema = Type.Object(
  {
    id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    title: Type.String({ minLength: 1, maxLength: 50 }),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
    emoji_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    emoji_name: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
    emoji_animated: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    role_ids: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    channel_ids: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'OnboardingPromptOptionRequest' },
)

export type OnboardingPromptOptionRequest = Static<typeof OnboardingPromptOptionRequestSchema>

export const PermissionsResponseSchema = Type.Object(
  {
    permissions: Type.String({
      description: 'The computed permissions, as a stringified bitfield',
    }),
  },
  { ref: 'PermissionsResponse' },
)

export type PermissionsResponse = Static<typeof PermissionsResponseSchema>

export const PinnedMessageResponseSchema = Type.Object(
  { pinned_at: Type.String({ format: 'date-time' }), message: MessageResponseSchema },
  { ref: 'PinnedMessageResponse' },
)

export type PinnedMessageResponse = Static<typeof PinnedMessageResponseSchema>

export const PinnedMessagesResponseSchema = Type.Object(
  { items: Type.Array(PinnedMessageResponseSchema), has_more: Type.Boolean() },
  { ref: 'PinnedMessagesResponse' },
)

export type PinnedMessagesResponse = Static<typeof PinnedMessagesResponseSchema>

export const PollAnswerDetailsResponseSchema = Type.Object(
  { users: Type.Array(UserResponseSchema) },
  { ref: 'PollAnswerDetailsResponse' },
)

export type PollAnswerDetailsResponse = Static<typeof PollAnswerDetailsResponseSchema>

export const PongInteractionCallbackRequestSchema = Type.Object(
  { type: InteractionCallbackTypesSchema },
  { ref: 'PongInteractionCallbackRequest' },
)

export type PongInteractionCallbackRequest = Static<typeof PongInteractionCallbackRequestSchema>

export const PremiumTypesSchema = Type.Union(
  [
    Type.Literal(0, { description: 'None' }),
    Type.Literal(1, { description: 'Nitro Classic' }),
    Type.Literal(2, { description: 'Nitro Standard' }),
    Type.Literal(3, { description: 'Nitro Basic' }),
  ],
  { ref: 'PremiumTypes' },
)

export type PremiumTypes = Static<typeof PremiumTypesSchema>

export const TeamMembershipStatesSchema = Type.Union(
  [
    Type.Literal(1, { description: 'User has been invited to the team.' }),
    Type.Literal(2, { description: 'User has accepted the team invitation.' }),
  ],
  { ref: 'TeamMembershipStates' },
)

export type TeamMembershipStates = Static<typeof TeamMembershipStatesSchema>

export const TeamMemberRolesSchema = Type.Union(
  [
    Type.Literal('admin', {
      description:
        'Admins have similar access as owners, except they cannot take destructive actions on the team or team-owned apps.',
    }),
    Type.Literal('developer', {
      description:
        'Developers can access information about team-owned apps, like the client secret or public key. They can also take limited actions on team-owned apps, like configuring interaction endpoints or resetting the bot token. Members with the Developer role cannot manage the team or its members, or take destructive actions on team-owned apps.',
    }),
    Type.Literal('read_only', {
      description:
        'Read-only members can access information about a team and any team-owned apps. Some examples include getting the IDs of applications and exporting payout records. Members can also invite bots associated with team-owned apps that are marked private.',
    }),
  ],
  { ref: 'TeamMemberRoles' },
)

export type TeamMemberRoles = Static<typeof TeamMemberRolesSchema>

export const TeamMemberResponseSchema = Type.Object(
  {
    user: UserResponseSchema,
    team_id: SnowflakeTypeSchema,
    membership_state: TeamMembershipStatesSchema,
    role: TeamMemberRolesSchema,
    permissions: Type.Array(Type.String()),
  },
  { ref: 'TeamMemberResponse' },
)

export type TeamMemberResponse = Static<typeof TeamMemberResponseSchema>

export const TeamResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    icon: Type.Union([Type.String(), Type.Null()]),
    name: Type.String(),
    owner_user_id: SnowflakeTypeSchema,
    members: Type.Array(TeamMemberResponseSchema),
  },
  { ref: 'TeamResponse' },
)

export type TeamResponse = Static<typeof TeamResponseSchema>

export const PrivateApplicationResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    icon: Type.Union([Type.String(), Type.Null()]),
    description: Type.String(),
    type: Type.Union([Type.Null(), ApplicationTypesSchema]),
    cover_image: Type.Optional(Type.String()),
    primary_sku_id: Type.Optional(SnowflakeTypeSchema),
    flags: Type.Integer(),
    flags_new: Type.String(),
    bot: Type.Optional(UserResponseSchema),
    slug: Type.Optional(Type.String()),
    conjure_project_id: Type.Optional(SnowflakeTypeSchema),
    vibegrations_project_id: Type.Optional(SnowflakeTypeSchema),
    guild_id: Type.Optional(SnowflakeTypeSchema),
    rpc_origins: Type.Optional(Type.Array(Type.String())),
    bot_public: Type.Optional(Type.Boolean()),
    bot_require_code_grant: Type.Optional(Type.Boolean()),
    terms_of_service_url: Type.Optional(Type.String({ format: 'uri' })),
    privacy_policy_url: Type.Optional(Type.String({ format: 'uri' })),
    custom_install_url: Type.Optional(Type.String({ format: 'uri' })),
    install_params: Type.Optional(ApplicationOAuth2InstallParamsResponseSchema),
    integration_types_config: Type.Optional(
      Type.Record(Type.String(), ApplicationIntegrationTypeConfigurationResponseSchema),
    ),
    verify_key: Type.String(),
    max_participants: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    tags: Type.Optional(Type.Array(Type.String(), { uniqueItems: true })),
    redirect_uris: Type.Array(Type.String({ format: 'uri' })),
    interactions_endpoint_url: Type.Union([Type.String({ format: 'uri' }), Type.Null()]),
    role_connections_verification_url: Type.Union([Type.String({ format: 'uri' }), Type.Null()]),
    owner: UserResponseSchema,
    approximate_guild_count: Type.Integer(),
    approximate_user_install_count: Type.Integer(),
    approximate_user_authorization_count: Type.Integer(),
    event_webhooks_url: Type.Optional(Type.Union([Type.String({ format: 'uri' }), Type.Null()])),
    event_webhooks_status: Type.Optional(ApplicationEventWebhooksStatusSchema),
    event_webhooks_types: Type.Optional(Type.Array(ActionTypesSchema, { uniqueItems: true })),
    explicit_content_filter: ApplicationExplicitContentFilterTypesSchema,
    team: Type.Union([Type.Null(), TeamResponseSchema]),
    eligible_oauth2_scopes: Type.Array(OAuth2ScopesSchema),
  },
  { ref: 'PrivateApplicationResponse' },
)

export type PrivateApplicationResponse = Static<typeof PrivateApplicationResponseSchema>

export const PrivateGuildMemberResponseSchema = Type.Object(
  {
    avatar: Type.Union([
      Type.String({ description: "the member's guild avatar hash" }),
      Type.Null(),
    ]),
    avatar_decoration_data: Type.Optional(
      Type.Union([Type.Null(), UserAvatarDecorationResponseSchema], {
        description: "data for the member's guild avatar decoration",
      }),
    ),
    banner: Type.Union([
      Type.String({ description: "the member's guild banner hash" }),
      Type.Null(),
    ]),
    communication_disabled_until: Type.Union([
      Type.String({
        format: 'date-time',
        description:
          "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
      }),
      Type.Null(),
    ]),
    flags: Type.Integer({
      description: 'guild member flags represented as a bit set, defaults to 0',
    }),
    joined_at: Type.String({ format: 'date-time', description: 'when the user joined the guild' }),
    nick: Type.Union([Type.String({ description: "this user's guild nickname" }), Type.Null()]),
    pending: Type.Boolean({
      description:
        "whether the user has not yet passed the guild's Membership Screening requirements",
    }),
    premium_since: Type.Union([
      Type.String({ format: 'date-time', description: 'when the user started boosting the guild' }),
      Type.Null(),
    ]),
    roles: Type.Array(SnowflakeTypeSchema, {
      uniqueItems: true,
      description: 'array of role object ids',
    }),
    collectibles: Type.Optional(
      Type.Union([Type.Null(), UserCollectiblesResponseSchema], {
        description: "data for the member's collectibles",
      }),
    ),
    user: UserResponseSchema,
    mute: Type.Boolean({ description: 'whether the user is muted in voice channels' }),
    deaf: Type.Boolean({ description: 'whether the user is deafened in voice channels' }),
    permissions: Type.Optional(Type.String()),
  },
  { ref: 'PrivateGuildMemberResponse' },
)

export type PrivateGuildMemberResponse = Static<typeof PrivateGuildMemberResponseSchema>

export const ProvisionalTokenResponseSchema = Type.Object(
  {
    token_type: Type.String(),
    access_token: Type.String(),
    expires_in: Type.Integer(),
    scope: Type.String(),
    id_token: Type.String(),
    refresh_token: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    scopes: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
    expires_at_s: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
  },
  { ref: 'ProvisionalTokenResponse' },
)

export type ProvisionalTokenResponse = Static<typeof ProvisionalTokenResponseSchema>

export const PruneGuildRequestSchema = Type.Object(
  {
    days: Type.Optional(Type.Union([Type.Integer({ minimum: 1, maximum: 30 }), Type.Null()])),
    compute_prune_count: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    include_roles: Type.Optional(
      Type.Union([
        Type.String(),
        Type.Array(SnowflakeTypeSchema, { maxItems: 100, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'PruneGuildRequest' },
)

export type PruneGuildRequest = Static<typeof PruneGuildRequestSchema>

export const ReactionTypesSchema = Type.Union(
  [
    Type.Literal(0, { description: 'Normal reaction type' }),
    Type.Literal(1, { description: 'Burst reaction type' }),
  ],
  { ref: 'ReactionTypes' },
)

export type ReactionTypes = Static<typeof ReactionTypesSchema>

export const SDKMessageRequestSchema = Type.Object(
  {
    content: Type.Optional(Type.Union([Type.String({ maxLength: 4000 }), Type.Null()])),
    embeds: Type.Optional(Type.Union([Type.Array(RichEmbedSchema, { maxItems: 10 }), Type.Null()])),
    allowed_mentions: Type.Optional(Type.Union([Type.Null(), MessageAllowedMentionsRequestSchema])),
    sticker_ids: Type.Optional(
      Type.Union([Type.Array(SnowflakeTypeSchema, { maxItems: 3 }), Type.Null()]),
    ),
    components: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
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
        Type.Null(),
      ]),
    ),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    attachments: Type.Optional(
      Type.Union([Type.Array(MessageAttachmentRequestSchema, { maxItems: 10 }), Type.Null()]),
    ),
    poll: Type.Optional(Type.Union([Type.Null(), PollCreateRequestSchema])),
    shared_client_theme: Type.Optional(
      Type.Union([Type.Null(), CustomClientThemeShareRequestSchema]),
    ),
    message_reference: Type.Optional(Type.Union([Type.Null(), MessageReferenceRequestSchema])),
    nonce: Type.Optional(
      Type.Union([
        Type.Integer({ minimum: -9223372036854776000, maximum: 9223372036854776000 }),
        Type.String({ maxLength: 25 }),
        Type.Null(),
      ]),
    ),
    enforce_nonce: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    tts: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'SDKMessageRequest' },
)

export type SDKMessageRequest = Static<typeof SDKMessageRequestSchema>

export const SKUIneligibilityReasonSchema = Type.Union(
  [
    Type.Literal(0, { description: 'Other / catch-all' }),
    Type.Literal(1, { description: 'User already owns this SKU or one of its components' }),
    Type.Literal(2, { description: 'User account is not on an eligible platform' }),
  ],
  { ref: 'SKUIneligibilityReason' },
)

export type SKUIneligibilityReason = Static<typeof SKUIneligibilityReasonSchema>

export const ScheduledEventUserCountResponseSchema = Type.Object(
  {
    guild_scheduled_event_count: Type.Integer({
      description: 'The number of users subscribed to the scheduled event',
    }),
    guild_scheduled_event_exception_counts: Type.Record(Type.String(), Type.Integer(), {
      description: 'Map of exception IDs to user counts for each exception',
    }),
  },
  { ref: 'ScheduledEventUserCountResponse' },
)

export type ScheduledEventUserCountResponse = Static<typeof ScheduledEventUserCountResponseSchema>

export const SearchIndexNotReadyResponseSchema = Type.Object(
  {
    message: Type.String(),
    code: Type.Integer(),
    documents_indexed: Type.Integer(),
    retry_after: Type.Integer(),
  },
  { ref: 'SearchIndexNotReadyResponse' },
)

export type SearchIndexNotReadyResponse = Static<typeof SearchIndexNotReadyResponseSchema>

export const SearchableEmbedTypeSchema = Type.Union(
  [
    Type.Literal('image'),
    Type.Literal('video'),
    Type.Literal('gif'),
    Type.Literal('sound'),
    Type.Literal('article'),
  ],
  { ref: 'SearchableEmbedType' },
)

export type SearchableEmbedType = Static<typeof SearchableEmbedTypeSchema>

export const WebhookSlackEmbedFieldSchema = Type.Object(
  {
    name: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    value: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    inline: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'WebhookSlackEmbedField' },
)

export type WebhookSlackEmbedField = Static<typeof WebhookSlackEmbedFieldSchema>

export const WebhookSlackEmbedSchema = Type.Object(
  {
    title: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    title_link: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    text: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    color: Type.Optional(
      Type.Union([
        Type.String({ pattern: '^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$', maxLength: 7 }),
        Type.Null(),
      ]),
    ),
    ts: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    pretext: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    footer: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    footer_icon: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    author_name: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    author_link: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    author_icon: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    image_url: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    thumb_url: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    fields: Type.Optional(
      Type.Union([Type.Array(WebhookSlackEmbedFieldSchema, { maxItems: 1521 }), Type.Null()]),
    ),
  },
  { ref: 'WebhookSlackEmbed' },
)

export type WebhookSlackEmbed = Static<typeof WebhookSlackEmbedSchema>

export const SlackWebhookSchema = Type.Object(
  {
    text: Type.Optional(Type.Union([Type.String({ maxLength: 2000 }), Type.Null()])),
    username: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
    icon_url: Type.Optional(
      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    ),
    attachments: Type.Optional(
      Type.Union([Type.Array(WebhookSlackEmbedSchema, { maxItems: 1521 }), Type.Null()]),
    ),
  },
  { ref: 'SlackWebhook' },
)

export type SlackWebhook = Static<typeof SlackWebhookSchema>

export const SocialLayerSKUPurchaseEligibilityCallbackDataSchema = Type.Object(
  {
    eligible: Type.Boolean(),
    ineligible_reason: Type.Optional(Type.Union([Type.Null(), SKUIneligibilityReasonSchema])),
    ineligible_reason_description: Type.Optional(
      Type.Union([Type.String({ maxLength: 255 }), Type.Null()]),
    ),
  },
  { ref: 'SocialLayerSKUPurchaseEligibilityCallbackData' },
)

export type SocialLayerSKUPurchaseEligibilityCallbackData = Static<
  typeof SocialLayerSKUPurchaseEligibilityCallbackDataSchema
>

export const SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema = Type.Object(
  {
    type: InteractionCallbackTypesSchema,
    data: SocialLayerSKUPurchaseEligibilityCallbackDataSchema,
  },
  { ref: 'SocialLayerSKUPurchaseEligibilityInteractionCallbackRequest' },
)

export type SocialLayerSKUPurchaseEligibilityInteractionCallbackRequest = Static<
  typeof SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema
>

export const SortingModeSchema = Type.Union(
  [Type.Literal('relevance'), Type.Literal('timestamp')],
  { ref: 'SortingMode' },
)

export type SortingMode = Static<typeof SortingModeSchema>

export const SortingOrderSchema = Type.Union([Type.Literal('asc'), Type.Literal('desc')], {
  ref: 'SortingOrder',
})

export type SortingOrder = Static<typeof SortingOrderSchema>

export const SoundboardCreateRequestSchema = Type.Object(
  {
    name: Type.String({ minLength: 2, maxLength: 32 }),
    volume: Type.Optional(Type.Union([Type.Number({ minimum: 0, maximum: 1 }), Type.Null()])),
    emoji_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    emoji_name: Type.Optional(
      Type.Union([Type.String({ minLength: 1, maxLength: 32 }), Type.Null()]),
    ),
    sound: Type.String(),
  },
  { ref: 'SoundboardCreateRequest' },
)

export type SoundboardCreateRequest = Static<typeof SoundboardCreateRequestSchema>

export const SoundboardPatchRequestPartialSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ minLength: 2, maxLength: 32 })),
    volume: Type.Optional(Type.Union([Type.Number({ minimum: 0, maximum: 1 }), Type.Null()])),
    emoji_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    emoji_name: Type.Optional(
      Type.Union([Type.String({ minLength: 1, maxLength: 32 }), Type.Null()]),
    ),
  },
  { ref: 'SoundboardPatchRequestPartial' },
)

export type SoundboardPatchRequestPartial = Static<typeof SoundboardPatchRequestPartialSchema>

export const SoundboardSoundSendRequestSchema = Type.Object(
  {
    sound_id: SnowflakeTypeSchema,
    source_guild_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
  },
  { ref: 'SoundboardSoundSendRequest' },
)

export type SoundboardSoundSendRequest = Static<typeof SoundboardSoundSendRequestSchema>

export const StageInstancesPrivacyLevelsSchema = Type.Union(
  [
    Type.Literal(1, { description: 'The Stage instance is visible publicly. (deprecated)' }),
    Type.Literal(2, { description: 'The Stage instance is visible to only guild members.' }),
  ],
  { ref: 'StageInstancesPrivacyLevels' },
)

export type StageInstancesPrivacyLevels = Static<typeof StageInstancesPrivacyLevelsSchema>

export const StageInstanceResponseSchema = Type.Object(
  {
    guild_id: SnowflakeTypeSchema,
    channel_id: SnowflakeTypeSchema,
    topic: Type.String(),
    privacy_level: StageInstancesPrivacyLevelsSchema,
    id: SnowflakeTypeSchema,
    discoverable_disabled: Type.Boolean(),
    guild_scheduled_event_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
  },
  { ref: 'StageInstanceResponse' },
)

export type StageInstanceResponse = Static<typeof StageInstanceResponseSchema>

export const StageScheduledEventCreateRequestSchema = Type.Object(
  {
    name: Type.String({ maxLength: 100 }),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 1000 }), Type.Null()])),
    image: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    scheduled_start_time: Type.String({ format: 'date-time' }),
    scheduled_end_time: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    recurrence_rule: Type.Optional(
      Type.Union([Type.Null(), RecurrenceRuleSchema], {
        description: 'Recurrence rule for the scheduled event',
      }),
    ),
    entity_metadata: Type.Optional(Type.Union([Type.Null(), EntityMetadataStageInstanceSchema])),
  },
  { ref: 'StageScheduledEventCreateRequest' },
)

export type StageScheduledEventCreateRequest = Static<typeof StageScheduledEventCreateRequestSchema>

export const StageScheduledEventPatchRequestPartialSchema = Type.Object(
  {
    status: Type.Optional(Type.Union([Type.Null(), GuildScheduledEventStatusesSchema])),
    name: Type.Optional(Type.String({ maxLength: 100 })),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 1000 }), Type.Null()])),
    image: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    scheduled_start_time: Type.Optional(Type.String({ format: 'date-time' })),
    scheduled_end_time: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    entity_type: Type.Optional(Type.Union([Type.Null(), GuildScheduledEventEntityTypesSchema])),
    privacy_level: Type.Optional(GuildScheduledEventPrivacyLevelsSchema),
    channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    recurrence_rule: Type.Optional(
      Type.Union([Type.Null(), RecurrenceRuleSchema], {
        description: 'Recurrence rule for the scheduled event',
      }),
    ),
    entity_metadata: Type.Optional(Type.Union([Type.Null(), EntityMetadataStageInstanceSchema])),
  },
  { ref: 'StageScheduledEventPatchRequestPartial' },
)

export type StageScheduledEventPatchRequestPartial = Static<
  typeof StageScheduledEventPatchRequestPartialSchema
>

export const StickerPackResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    sku_id: SnowflakeTypeSchema,
    name: Type.String(),
    description: Type.Union([Type.String(), Type.Null()]),
    stickers: Type.Array(StandardStickerResponseSchema),
    cover_sticker_id: Type.Optional(SnowflakeTypeSchema),
    banner_asset_id: Type.Optional(SnowflakeTypeSchema),
  },
  { ref: 'StickerPackResponse' },
)

export type StickerPackResponse = Static<typeof StickerPackResponseSchema>

export const StickerPackCollectionResponseSchema = Type.Object(
  { sticker_packs: Type.Array(StickerPackResponseSchema) },
  { ref: 'StickerPackCollectionResponse' },
)

export type StickerPackCollectionResponse = Static<typeof StickerPackCollectionResponseSchema>

export const SubscriptionResponseStatusTypeSchema = Type.Union(
  [
    Type.Literal(0, { description: 'Subscription is active and scheduled to renew' }),
    Type.Literal(1, { description: 'Subscription is inactive and not being charged' }),
    Type.Literal(2, { description: 'Subscription is active but will not renew' }),
  ],
  { ref: 'SubscriptionResponseStatusType' },
)

export type SubscriptionResponseStatusType = Static<typeof SubscriptionResponseStatusTypeSchema>

export const SubscriptionResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    user_id: SnowflakeTypeSchema,
    sku_ids: Type.Array(SnowflakeTypeSchema, {
      uniqueItems: true,
      description: 'List of SKUs subscribed to',
    }),
    renewal_sku_ids: Type.Union([
      Type.Array(SnowflakeTypeSchema, {
        uniqueItems: true,
        description: 'List of SKUs that this user will be subscribed to at renewal',
      }),
      Type.Null(),
    ]),
    entitlement_ids: Type.Array(SnowflakeTypeSchema, {
      uniqueItems: true,
      description: 'List of entitlements granted for this subscription',
    }),
    current_period_start: Type.String({
      format: 'date-time',
      description: 'Start of the current subscription period',
    }),
    current_period_end: Type.String({
      format: 'date-time',
      description: 'End of the current subscription period',
    }),
    status: SubscriptionResponseStatusTypeSchema,
    canceled_at: Type.Union([
      Type.String({ format: 'date-time', description: 'When the subscription was canceled' }),
      Type.Null(),
    ]),
    country: Type.Optional(
      Type.Union([
        Type.String({
          description:
            'ISO3166-1 alpha-2 country code of the payment source used to purchase the subscription',
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'SubscriptionResponse' },
)

export type SubscriptionResponse = Static<typeof SubscriptionResponseSchema>

export const TargetUsersJobStatusTypesSchema = Type.Union(
  [
    Type.Literal(0, { description: 'The default value.' }),
    Type.Literal(1, { description: 'The job is still being processed.' }),
    Type.Literal(2, { description: 'The job has been completed successfully.' }),
    Type.Literal(3, {
      description: 'The job has failed, see error_message field for more details.',
    }),
  ],
  { ref: 'TargetUsersJobStatusTypes' },
)

export type TargetUsersJobStatusTypes = Static<typeof TargetUsersJobStatusTypesSchema>

export const TargetUsersJobStatusResponseSchema = Type.Object(
  {
    status: TargetUsersJobStatusTypesSchema,
    total_users: UInt32TypeSchema,
    processed_users: UInt32TypeSchema,
    created_at: Type.Union([
      Type.String({ format: 'date-time', description: 'The timestamp when the job was created.' }),
      Type.Null(),
    ]),
    completed_at: Type.Union([
      Type.String({
        format: 'date-time',
        description: 'The timestamp when the job was successfully completed.',
      }),
      Type.Null(),
    ]),
    error_message: Type.Union([
      Type.String({ description: 'The error message if the job failed.' }),
      Type.Null(),
    ]),
  },
  { ref: 'TargetUsersJobStatusResponse' },
)

export type TargetUsersJobStatusResponse = Static<typeof TargetUsersJobStatusResponseSchema>

export const ThreadSearchResponseSchema = Type.Object(
  {
    threads: Type.Array(ThreadResponseSchema),
    members: Type.Array(ThreadMemberResponseSchema),
    has_more: Type.Boolean(),
    first_messages: Type.Optional(Type.Array(MessageResponseSchema)),
    total_results: Type.Integer(),
  },
  { ref: 'ThreadSearchResponse' },
)

export type ThreadSearchResponse = Static<typeof ThreadSearchResponseSchema>

export const ThreadSortingModeSchema = Type.Union(
  [
    Type.Literal('relevance'),
    Type.Literal('creation_time'),
    Type.Literal('last_message_time'),
    Type.Literal('archive_time'),
  ],
  { ref: 'ThreadSortingMode' },
)

export type ThreadSortingMode = Static<typeof ThreadSortingModeSchema>

export const ThreadsResponseSchema = Type.Object(
  {
    threads: Type.Array(ThreadResponseSchema),
    members: Type.Array(ThreadMemberResponseSchema),
    has_more: Type.Boolean(),
    first_messages: Type.Optional(Type.Array(MessageResponseSchema)),
  },
  { ref: 'ThreadsResponse' },
)

export type ThreadsResponse = Static<typeof ThreadsResponseSchema>

export const TypingIndicatorResponseSchema = Type.Object({}, { ref: 'TypingIndicatorResponse' })

export type TypingIndicatorResponse = Static<typeof TypingIndicatorResponseSchema>

export const UnbanUserFromGuildRequestSchema = Type.Object({}, { ref: 'UnbanUserFromGuildRequest' })

export type UnbanUserFromGuildRequest = Static<typeof UnbanUserFromGuildRequestSchema>

export const UpdateApplicationUserRoleConnectionRequestSchema = Type.Object(
  {
    platform_name: Type.Optional(Type.Union([Type.String({ maxLength: 50 }), Type.Null()])),
    platform_username: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
    metadata: Type.Optional(
      Type.Union([
        Type.Record(Type.String(), Type.String({ minLength: 1, maxLength: 100 }), {
          maxProperties: 5,
        }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'UpdateApplicationUserRoleConnectionRequest' },
)

export type UpdateApplicationUserRoleConnectionRequest = Static<
  typeof UpdateApplicationUserRoleConnectionRequestSchema
>

export const UpdateDMRequestPartialSchema = Type.Object(
  { name: Type.Optional(Type.Union([Type.String({ minLength: 0, maxLength: 100 }), Type.Null()])) },
  { ref: 'UpdateDMRequestPartial' },
)

export type UpdateDMRequestPartial = Static<typeof UpdateDMRequestPartialSchema>

export const UpdateGroupDMRequestPartialSchema = Type.Object(
  {
    name: Type.Optional(Type.Union([Type.String({ minLength: 0, maxLength: 100 }), Type.Null()])),
    icon: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { ref: 'UpdateGroupDMRequestPartial' },
)

export type UpdateGroupDMRequestPartial = Static<typeof UpdateGroupDMRequestPartialSchema>

export const UpdateThreadTagRequestSchema = Type.Object(
  {
    name: Type.String({ minLength: 0, maxLength: 50 }),
    emoji_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    emoji_name: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
    moderated: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
  },
  { ref: 'UpdateThreadTagRequest' },
)

export type UpdateThreadTagRequest = Static<typeof UpdateThreadTagRequestSchema>

export const UpdateGuildChannelRequestPartialSchema = Type.Object(
  {
    type: Type.Optional(Type.Union([Type.Null(), ChannelTypesSchema])),
    name: Type.Optional(Type.String({ minLength: 1, maxLength: 100 })),
    position: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    topic: Type.Optional(Type.Union([Type.String({ minLength: 0, maxLength: 4096 }), Type.Null()])),
    bitrate: Type.Optional(Type.Union([Type.Integer({ minimum: 8000 }), Type.Null()])),
    user_limit: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
    nsfw: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    rate_limit_per_user: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 21600 }), Type.Null()]),
    ),
    parent_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    permission_overwrites: Type.Optional(
      Type.Union([
        Type.Array(ChannelPermissionOverwriteRequestSchema, { maxItems: 100 }),
        Type.Null(),
      ]),
    ),
    rtc_region: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    video_quality_mode: Type.Optional(Type.Union([Type.Null(), VideoQualityModesSchema])),
    default_auto_archive_duration: Type.Optional(
      Type.Union([Type.Null(), ThreadAutoArchiveDurationSchema]),
    ),
    default_reaction_emoji: Type.Optional(
      Type.Union([Type.Null(), UpdateDefaultReactionEmojiRequestSchema]),
    ),
    default_thread_rate_limit_per_user: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 21600 }), Type.Null()]),
    ),
    default_sort_order: Type.Optional(Type.Union([Type.Null(), ThreadSortOrderSchema])),
    default_forum_layout: Type.Optional(Type.Union([Type.Null(), ForumLayoutSchema])),
    default_tag_setting: Type.Optional(Type.Union([Type.Null(), ThreadSearchTagSettingSchema])),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    available_tags: Type.Optional(
      Type.Union([Type.Array(UpdateThreadTagRequestSchema, { maxItems: 20 }), Type.Null()]),
    ),
  },
  { ref: 'UpdateGuildChannelRequestPartial' },
)

export type UpdateGuildChannelRequestPartial = Static<typeof UpdateGuildChannelRequestPartialSchema>

export const UpdateOnboardingPromptRequestSchema = Type.Object(
  {
    title: Type.String({ minLength: 1, maxLength: 100 }),
    options: Type.Array(OnboardingPromptOptionRequestSchema, { minItems: 1, maxItems: 50 }),
    single_select: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    required: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    in_onboarding: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    type: Type.Optional(Type.Union([Type.Null(), OnboardingPromptTypeSchema])),
    id: SnowflakeTypeSchema,
  },
  { ref: 'UpdateOnboardingPromptRequest' },
)

export type UpdateOnboardingPromptRequest = Static<typeof UpdateOnboardingPromptRequestSchema>

export const UpdateGuildOnboardingRequestSchema = Type.Object(
  {
    prompts: Type.Optional(
      Type.Union([Type.Array(UpdateOnboardingPromptRequestSchema, { maxItems: 15 }), Type.Null()]),
    ),
    enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    default_channel_ids: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 500, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    mode: Type.Optional(Type.Union([Type.Null(), GuildOnboardingModeSchema])),
  },
  { ref: 'UpdateGuildOnboardingRequest' },
)

export type UpdateGuildOnboardingRequest = Static<typeof UpdateGuildOnboardingRequestSchema>

export const UpdateMessageInteractionCallbackRequestSchema = Type.Object(
  {
    type: InteractionCallbackTypesSchema,
    data: Type.Optional(
      Type.Union([Type.Null(), IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema]),
    ),
  },
  { ref: 'UpdateMessageInteractionCallbackRequest' },
)

export type UpdateMessageInteractionCallbackRequest = Static<
  typeof UpdateMessageInteractionCallbackRequestSchema
>

export const UpdateRolePositionsRequestSchema = Type.Object(
  {
    id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    position: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
  },
  { ref: 'UpdateRolePositionsRequest' },
)

export type UpdateRolePositionsRequest = Static<typeof UpdateRolePositionsRequestSchema>

export const UpdateRoleRequestPartialSchema = Type.Object(
  {
    name: Type.Optional(Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()])),
    permissions: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    color: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 16777215 }), Type.Null()]),
    ),
    colors: Type.Optional(Type.Union([Type.Null(), RoleColorsSchema])),
    hoist: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    mentionable: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    icon: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    unicode_emoji: Type.Optional(Type.Union([Type.String({ maxLength: 100 }), Type.Null()])),
  },
  { ref: 'UpdateRoleRequestPartial' },
)

export type UpdateRoleRequestPartial = Static<typeof UpdateRoleRequestPartialSchema>

export const UpdateSelfVoiceStateRequestPartialSchema = Type.Object(
  {
    request_to_speak_timestamp: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    suppress: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
  },
  { ref: 'UpdateSelfVoiceStateRequestPartial' },
)

export type UpdateSelfVoiceStateRequestPartial = Static<
  typeof UpdateSelfVoiceStateRequestPartialSchema
>

export const UpdateThreadRequestPartialSchema = Type.Object(
  {
    name: Type.Optional(Type.Union([Type.String({ minLength: 0, maxLength: 100 }), Type.Null()])),
    archived: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    locked: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    invitable: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    auto_archive_duration: Type.Optional(
      Type.Union([Type.Null(), ThreadAutoArchiveDurationSchema]),
    ),
    rate_limit_per_user: Type.Optional(
      Type.Union([Type.Integer({ minimum: 0, maximum: 21600 }), Type.Null()]),
    ),
    flags: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
    applied_tags: Type.Optional(
      Type.Union([Type.Array(SnowflakeTypeSchema, { maxItems: 5 }), Type.Null()]),
    ),
    bitrate: Type.Optional(Type.Union([Type.Integer({ minimum: 8000 }), Type.Null()])),
    user_limit: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 99 }), Type.Null()])),
    rtc_region: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    video_quality_mode: Type.Optional(Type.Union([Type.Null(), VideoQualityModesSchema])),
  },
  { ref: 'UpdateThreadRequestPartial' },
)

export type UpdateThreadRequestPartial = Static<typeof UpdateThreadRequestPartialSchema>

export const UpdateVoiceStateRequestPartialSchema = Type.Object(
  {
    suppress: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
  },
  { ref: 'UpdateVoiceStateRequestPartial' },
)

export type UpdateVoiceStateRequestPartial = Static<typeof UpdateVoiceStateRequestPartialSchema>

export const UserGuildOnboardingResponseSchema = Type.Object(
  {
    guild_id: SnowflakeTypeSchema,
    prompts: Type.Array(OnboardingPromptResponseSchema),
    default_channel_ids: Type.Array(SnowflakeTypeSchema, { uniqueItems: true }),
    enabled: Type.Boolean(),
    mode: GuildOnboardingModeSchema,
  },
  { ref: 'UserGuildOnboardingResponse' },
)

export type UserGuildOnboardingResponse = Static<typeof UserGuildOnboardingResponseSchema>

export const UserPIIResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    username: Type.String({ description: "the user's username, not unique across the platform" }),
    avatar: Type.Union([Type.String({ description: "the user's avatar hash" }), Type.Null()]),
    discriminator: Type.String({ description: "the user's Discord-tag" }),
    public_flags: Type.Integer({ description: "the public flags on a user's account" }),
    flags: Int53TypeSchema,
    bot: Type.Optional(
      Type.Boolean({ description: 'whether the user belongs to an OAuth2 application' }),
    ),
    system: Type.Optional(
      Type.Boolean({
        description:
          'whether the user is an Official Discord System user (part of the urgent message system)',
      }),
    ),
    banner: Type.Optional(
      Type.Union([Type.String({ description: "the user's banner hash" }), Type.Null()]),
    ),
    accent_color: Type.Optional(
      Type.Union([
        Type.Integer({
          description:
            "the user's banner color encoded as an integer representation of hexadecimal color code",
        }),
        Type.Null(),
      ]),
    ),
    global_name: Type.Union([
      Type.String({ description: "the user's display name, if it is set" }),
      Type.Null(),
    ]),
    avatar_decoration_data: Type.Optional(
      Type.Union([Type.Null(), UserAvatarDecorationResponseSchema], {
        description: "data for the user's avatar decoration",
      }),
    ),
    collectibles: Type.Optional(
      Type.Union([Type.Null(), UserCollectiblesResponseSchema], {
        description: "data for the user's collectibles",
      }),
    ),
    primary_guild: Type.Optional(Type.Union([Type.Null(), UserPrimaryGuildResponseSchema])),
    mfa_enabled: Type.Boolean(),
    locale: AvailableLocalesEnumSchema,
    premium_type: Type.Optional(PremiumTypesSchema),
    email: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    verified: Type.Optional(Type.Boolean()),
  },
  { ref: 'UserPIIResponse' },
)

export type UserPIIResponse = Static<typeof UserPIIResponseSchema>

export const UserProfileMetadataSchema = Type.Object(
  {
    keyword_filter: Type.Optional(
      Type.Union([
        Type.Array(Type.String({ minLength: 1, maxLength: 60 }), { maxItems: 1000 }),
        Type.Null(),
      ]),
    ),
    regex_patterns: Type.Optional(
      Type.Union([
        Type.Array(Type.String({ minLength: 1, maxLength: 260 }), { maxItems: 10 }),
        Type.Null(),
      ]),
    ),
    allow_list: Type.Optional(
      Type.Union([
        Type.Array(Type.String({ minLength: 1, maxLength: 60 }), { maxItems: 100 }),
        Type.Null(),
      ]),
    ),
  },
  { ref: 'UserProfileMetadata' },
)

export type UserProfileMetadata = Static<typeof UserProfileMetadataSchema>

export const UserProfileUpsertRequestSchema = Type.Object(
  {
    name: Type.String({ maxLength: 100 }),
    event_type: AutomodEventTypeSchema,
    actions: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
          { minItems: 1, maxItems: 5 },
        ),
        Type.Null(),
      ]),
    ),
    enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    exempt_roles: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    exempt_channels: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    trigger_type: AutomodTriggerTypeSchema,
    trigger_metadata: UserProfileMetadataSchema,
  },
  { ref: 'UserProfileUpsertRequest' },
)

export type UserProfileUpsertRequest = Static<typeof UserProfileUpsertRequestSchema>

export const UserProfileUpsertRequestPartialSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ maxLength: 100 })),
    event_type: Type.Optional(AutomodEventTypeSchema),
    actions: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            BlockMessageActionSchema,
            FlagToChannelActionSchema,
            QuarantineUserActionSchema,
            UserCommunicationDisabledActionSchema,
          ]),
          { minItems: 1, maxItems: 5 },
        ),
        Type.Null(),
      ]),
    ),
    enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
    exempt_roles: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    exempt_channels: Type.Optional(
      Type.Union([
        Type.Array(SnowflakeTypeSchema, { maxItems: 50, uniqueItems: true }),
        Type.Null(),
      ]),
    ),
    trigger_type: Type.Optional(AutomodTriggerTypeSchema),
    trigger_metadata: Type.Optional(UserProfileMetadataSchema),
  },
  { ref: 'UserProfileUpsertRequestPartial' },
)

export type UserProfileUpsertRequestPartial = Static<typeof UserProfileUpsertRequestPartialSchema>

export const VanityURLErrorResponseSchema = Type.Object(
  { message: Type.String(), code: Type.Integer() },
  { ref: 'VanityURLErrorResponse' },
)

export type VanityURLErrorResponse = Static<typeof VanityURLErrorResponseSchema>

export const VanityURLResponseSchema = Type.Object(
  {
    code: Type.Union([Type.String(), Type.Null()]),
    uses: Type.Integer(),
    error: Type.Optional(Type.Union([Type.Null(), VanityURLErrorResponseSchema])),
  },
  { ref: 'VanityURLResponse' },
)

export type VanityURLResponse = Static<typeof VanityURLResponseSchema>

export const VoiceRegionResponseSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    custom: Type.Boolean(),
    deprecated: Type.Boolean(),
    optimal: Type.Boolean(),
  },
  { ref: 'VoiceRegionResponse' },
)

export type VoiceRegionResponse = Static<typeof VoiceRegionResponseSchema>

export const VoiceScheduledEventCreateRequestSchema = Type.Object(
  {
    name: Type.String({ maxLength: 100 }),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 1000 }), Type.Null()])),
    image: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    scheduled_start_time: Type.String({ format: 'date-time' }),
    scheduled_end_time: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    privacy_level: GuildScheduledEventPrivacyLevelsSchema,
    entity_type: GuildScheduledEventEntityTypesSchema,
    channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    recurrence_rule: Type.Optional(
      Type.Union([Type.Null(), RecurrenceRuleSchema], {
        description: 'Recurrence rule for the scheduled event',
      }),
    ),
    entity_metadata: Type.Optional(Type.Union([Type.Null(), EntityMetadataVoiceSchema])),
  },
  { ref: 'VoiceScheduledEventCreateRequest' },
)

export type VoiceScheduledEventCreateRequest = Static<typeof VoiceScheduledEventCreateRequestSchema>

export const VoiceScheduledEventPatchRequestPartialSchema = Type.Object(
  {
    status: Type.Optional(Type.Union([Type.Null(), GuildScheduledEventStatusesSchema])),
    name: Type.Optional(Type.String({ maxLength: 100 })),
    description: Type.Optional(Type.Union([Type.String({ maxLength: 1000 }), Type.Null()])),
    image: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    scheduled_start_time: Type.Optional(Type.String({ format: 'date-time' })),
    scheduled_end_time: Type.Optional(
      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    ),
    entity_type: Type.Optional(Type.Union([Type.Null(), GuildScheduledEventEntityTypesSchema])),
    privacy_level: Type.Optional(GuildScheduledEventPrivacyLevelsSchema),
    channel_id: Type.Optional(Type.Union([Type.Null(), SnowflakeTypeSchema])),
    recurrence_rule: Type.Optional(
      Type.Union([Type.Null(), RecurrenceRuleSchema], {
        description: 'Recurrence rule for the scheduled event',
      }),
    ),
    entity_metadata: Type.Optional(Type.Union([Type.Null(), EntityMetadataVoiceSchema])),
  },
  { ref: 'VoiceScheduledEventPatchRequestPartial' },
)

export type VoiceScheduledEventPatchRequestPartial = Static<
  typeof VoiceScheduledEventPatchRequestPartialSchema
>

export const VoiceStateResponseSchema = Type.Object(
  {
    channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    deaf: Type.Boolean(),
    guild_id: Type.Union([Type.Null(), SnowflakeTypeSchema]),
    member: Type.Optional(GuildMemberResponseSchema),
    mute: Type.Boolean(),
    request_to_speak_timestamp: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    suppress: Type.Boolean(),
    self_stream: Type.Union([Type.Boolean(), Type.Null()]),
    self_deaf: Type.Boolean(),
    self_mute: Type.Boolean(),
    self_video: Type.Boolean(),
    session_id: Type.String(),
    user_id: SnowflakeTypeSchema,
  },
  { ref: 'VoiceStateResponse' },
)

export type VoiceStateResponse = Static<typeof VoiceStateResponseSchema>

export const WelcomeScreenPatchRequestPartialSchema = Type.Object(
  {
    description: Type.Optional(Type.Union([Type.String({ maxLength: 140 }), Type.Null()])),
    welcome_channels: Type.Optional(
      Type.Union([Type.Array(GuildWelcomeChannelSchema, { maxItems: 5 }), Type.Null()]),
    ),
    enabled: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  },
  { ref: 'WelcomeScreenPatchRequestPartial' },
)

export type WelcomeScreenPatchRequestPartial = Static<typeof WelcomeScreenPatchRequestPartialSchema>

export const WidgetActivitySchema = Type.Object({ name: Type.String() }, { ref: 'WidgetActivity' })

export type WidgetActivity = Static<typeof WidgetActivitySchema>

export const WidgetChannelSchema = Type.Object(
  { id: SnowflakeTypeSchema, name: Type.String(), position: Type.Integer() },
  { ref: 'WidgetChannel' },
)

export type WidgetChannel = Static<typeof WidgetChannelSchema>

export const WidgetImageStylesSchema = Type.Union(
  [
    Type.Literal('shield', {
      description: 'shield style widget with Discord icon and guild members online count',
    }),
    Type.Literal('banner1', {
      description:
        'large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget',
    }),
    Type.Literal('banner2', {
      description:
        'smaller widget style with guild icon, name and online count. Split on the right with Discord logo',
    }),
    Type.Literal('banner3', {
      description:
        'large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right',
    }),
    Type.Literal('banner4', {
      description:
        'large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom',
    }),
  ],
  { ref: 'WidgetImageStyles' },
)

export type WidgetImageStyles = Static<typeof WidgetImageStylesSchema>

export const WidgetUserDiscriminatorSchema = Type.Union([Type.Literal('0000')], {
  ref: 'WidgetUserDiscriminator',
})

export type WidgetUserDiscriminator = Static<typeof WidgetUserDiscriminatorSchema>

export const WidgetMemberSchema = Type.Object(
  {
    id: Type.String(),
    username: Type.String(),
    discriminator: WidgetUserDiscriminatorSchema,
    avatar: Type.Null(),
    status: Type.String(),
    avatar_url: Type.String({ format: 'uri' }),
    activity: Type.Optional(WidgetActivitySchema),
    deaf: Type.Optional(Type.Boolean()),
    mute: Type.Optional(Type.Boolean()),
    self_deaf: Type.Optional(Type.Boolean()),
    self_mute: Type.Optional(Type.Boolean()),
    suppress: Type.Optional(Type.Boolean()),
    channel_id: Type.Optional(SnowflakeTypeSchema),
  },
  { ref: 'WidgetMember' },
)

export type WidgetMember = Static<typeof WidgetMemberSchema>

export const WidgetResponseSchema = Type.Object(
  {
    id: SnowflakeTypeSchema,
    name: Type.String(),
    instant_invite: Type.Union([Type.String(), Type.Null()]),
    channels: Type.Array(WidgetChannelSchema),
    members: Type.Array(WidgetMemberSchema),
    presence_count: Type.Integer(),
  },
  { ref: 'WidgetResponse' },
)

export type WidgetResponse = Static<typeof WidgetResponseSchema>

export const WidgetSettingsResponseSchema = Type.Object(
  { enabled: Type.Boolean(), channel_id: Type.Union([Type.Null(), SnowflakeTypeSchema]) },
  { ref: 'WidgetSettingsResponse' },
)

export type WidgetSettingsResponse = Static<typeof WidgetSettingsResponseSchema>

export const ErrorSchema = Type.Object(
  {
    code: Type.Integer({ description: 'Discord internal error code. See error code reference' }),
    message: Type.String({ description: 'Human-readable error message' }),
  },
  { ref: 'Error', description: 'A single error, either for an API response or a specific field.' },
)

export type Error = Static<typeof ErrorSchema>

export const InnerErrorsSchema = Type.Object(
  { _errors: Type.Array(ErrorSchema, { description: 'The list of errors for this field' }) },
  { ref: 'InnerErrors', additionalProperties: false },
)

export type InnerErrors = Static<typeof InnerErrorsSchema>

export const ErrorDetailsSchema = Type.Cyclic(
  {
    ErrorDetailsSchema: Type.Union([
      Type.Record(Type.String(), Type.Ref('ErrorDetailsSchema')),
      InnerErrorsSchema,
    ]),
  },
  'ErrorDetailsSchema',
  { ref: 'ErrorDetails' },
)

export type ErrorDetails = Static<typeof ErrorDetailsSchema>

export const ErrorResponseSchema = Type.Intersect(
  [ErrorSchema, Type.Object({ errors: Type.Optional(ErrorDetailsSchema) })],
  { ref: 'ErrorResponse', description: 'Errors object returned by the Discord API' },
)

export type ErrorResponse = Static<typeof ErrorResponseSchema>

export const RatelimitedResponseSchema = Type.Intersect(
  [
    ErrorSchema,
    Type.Object({
      retry_after: Type.Number({
        description: 'The number of seconds to wait before retrying your request',
      }),
      global: Type.Boolean({
        description:
          'Whether you are being ratelimited by the global ratelimit or a per-endpoint ratelimit',
      }),
    }),
  ],
  { ref: 'RatelimitedResponse', description: 'Ratelimit error object returned by the Discord API' },
)

export type RatelimitedResponse = Static<typeof RatelimitedResponseSchema>

export const XRateLimitLimitHeaderSchema = resolver(toStandardSchemaV1(Type.Integer()))
export const XRateLimitRemainingHeaderSchema = resolver(toStandardSchemaV1(Type.Integer()))
export const XRateLimitResetHeaderSchema = resolver(toStandardSchemaV1(Type.Number()))
export const XRateLimitResetAfterHeaderSchema = resolver(toStandardSchemaV1(Type.Number()))
export const XRateLimitBucketHeaderSchema = resolver(toStandardSchemaV1(Type.String()))

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
  content: { 'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) } },
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
  content: {
    'application/json': { schema: resolver(toStandardSchemaV1(RatelimitedResponseSchema)) },
  },
}
