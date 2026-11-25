import { resolver } from 'hono-openapi'
import * as v from 'valibot'

export const AccountResponseSchema = v.pipe(
  v.object({ id: v.string(), name: v.nullable(v.string()) }),
  v.metadata({ ref: 'AccountResponse' }),
)

export type AccountResponse = v.InferOutput<typeof AccountResponseSchema>

export const MessageComponentTypesSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'MessageComponentTypes' }),
)

export type MessageComponentTypes = v.InferOutput<typeof MessageComponentTypesSchema>

export const ButtonStyleTypesSchema = v.pipe(
  v.union([v.literal(1), v.literal(2), v.literal(3), v.literal(4), v.literal(5), v.literal(6)]),
  v.metadata({ ref: 'ButtonStyleTypes' }),
)

export type ButtonStyleTypes = v.InferOutput<typeof ButtonStyleTypesSchema>

export const SnowflakeTypeSchema = v.pipe(
  v.pipe(v.string(), v.regex(/^(0|[1-9][0-9]*)$/)),
  v.metadata({ ref: 'SnowflakeType' }),
)

export type SnowflakeType = v.InferOutput<typeof SnowflakeTypeSchema>

export const ComponentEmojiForRequestSchema = v.pipe(
  v.object({
    id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
    name: v.pipe(v.string(), v.maxCodePoints(32)),
  }),
  v.metadata({ ref: 'ComponentEmojiForRequest' }),
)

export type ComponentEmojiForRequest = v.InferOutput<typeof ComponentEmojiForRequestSchema>

export const ButtonComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ButtonComponentForMessageRequest' }),
)

export type ButtonComponentForMessageRequest = v.InferOutput<
  typeof ButtonComponentForMessageRequestSchema
>

export const SnowflakeSelectDefaultValueTypesSchema = v.pipe(
  v.union([v.literal('user'), v.literal('role'), v.literal('channel')]),
  v.metadata({ ref: 'SnowflakeSelectDefaultValueTypes' }),
)

export type SnowflakeSelectDefaultValueTypes = v.InferOutput<
  typeof SnowflakeSelectDefaultValueTypesSchema
>

export const ChannelSelectDefaultValueSchema = v.pipe(
  v.object({ type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema }),
  v.metadata({ ref: 'ChannelSelectDefaultValue' }),
)

export type ChannelSelectDefaultValue = v.InferOutput<typeof ChannelSelectDefaultValueSchema>

export const ChannelTypesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(1), v.description('A direct message between users')),
    v.pipe(v.literal(3), v.description('A direct message between multiple users')),
    v.pipe(v.literal(0), v.description('A text channel within a server')),
    v.pipe(v.literal(2), v.description('A voice channel within a server')),
    v.pipe(
      v.literal(4),
      v.description('An organizational category that contains up to 50 channels'),
    ),
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
  ]),
  v.metadata({ ref: 'ChannelTypes' }),
)

export type ChannelTypes = v.InferOutput<typeof ChannelTypesSchema>

export const ChannelSelectComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ChannelSelectComponentForMessageRequest' }),
)

export type ChannelSelectComponentForMessageRequest = v.InferOutput<
  typeof ChannelSelectComponentForMessageRequestSchema
>

export const RoleSelectDefaultValueSchema = v.pipe(
  v.object({ type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema }),
  v.metadata({ ref: 'RoleSelectDefaultValue' }),
)

export type RoleSelectDefaultValue = v.InferOutput<typeof RoleSelectDefaultValueSchema>

export const UserSelectDefaultValueSchema = v.pipe(
  v.object({ type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema }),
  v.metadata({ ref: 'UserSelectDefaultValue' }),
)

export type UserSelectDefaultValue = v.InferOutput<typeof UserSelectDefaultValueSchema>

export const MentionableSelectComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'MentionableSelectComponentForMessageRequest' }),
)

export type MentionableSelectComponentForMessageRequest = v.InferOutput<
  typeof MentionableSelectComponentForMessageRequestSchema
>

export const RoleSelectComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'RoleSelectComponentForMessageRequest' }),
)

export type RoleSelectComponentForMessageRequest = v.InferOutput<
  typeof RoleSelectComponentForMessageRequestSchema
>

export const StringSelectOptionForRequestSchema = v.pipe(
  v.object({
    label: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    value: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
    default: v.optional(v.nullable(v.boolean())),
    emoji: v.optional(v.union([v.null(), ComponentEmojiForRequestSchema])),
  }),
  v.metadata({ ref: 'StringSelectOptionForRequest' }),
)

export type StringSelectOptionForRequest = v.InferOutput<typeof StringSelectOptionForRequestSchema>

export const StringSelectComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'StringSelectComponentForMessageRequest' }),
)

export type StringSelectComponentForMessageRequest = v.InferOutput<
  typeof StringSelectComponentForMessageRequestSchema
>

export const UserSelectComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'UserSelectComponentForMessageRequest' }),
)

export type UserSelectComponentForMessageRequest = v.InferOutput<
  typeof UserSelectComponentForMessageRequestSchema
>

export const ActionRowComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ActionRowComponentForMessageRequest' }),
)

export type ActionRowComponentForMessageRequest = v.InferOutput<
  typeof ActionRowComponentForMessageRequestSchema
>

export const TextInputStyleTypesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(1), v.description('Single-line input')),
    v.pipe(v.literal(2), v.description('Multi-line input')),
  ]),
  v.metadata({ ref: 'TextInputStyleTypes' }),
)

export type TextInputStyleTypes = v.InferOutput<typeof TextInputStyleTypesSchema>

export const TextInputComponentForModalRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'TextInputComponentForModalRequest' }),
)

export type TextInputComponentForModalRequest = v.InferOutput<
  typeof TextInputComponentForModalRequestSchema
>

export const ActionRowComponentForModalRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ActionRowComponentForModalRequest' }),
)

export type ActionRowComponentForModalRequest = v.InferOutput<
  typeof ActionRowComponentForModalRequestSchema
>

export const ComponentEmojiResponseSchema = v.pipe(
  v.object({
    id: v.optional(SnowflakeTypeSchema),
    name: v.string(),
    animated: v.optional(v.boolean()),
  }),
  v.metadata({ ref: 'ComponentEmojiResponse' }),
)

export type ComponentEmojiResponse = v.InferOutput<typeof ComponentEmojiResponseSchema>

export const ButtonComponentResponseSchema = v.pipe(
  v.object({
    type: MessageComponentTypesSchema,
    id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    custom_id: v.optional(v.string()),
    style: ButtonStyleTypesSchema,
    label: v.optional(v.string()),
    disabled: v.optional(v.boolean()),
    emoji: v.optional(ComponentEmojiResponseSchema),
    url: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048)))),
    sku_id: v.optional(SnowflakeTypeSchema),
  }),
  v.metadata({ ref: 'ButtonComponentResponse' }),
)

export type ButtonComponentResponse = v.InferOutput<typeof ButtonComponentResponseSchema>

export const ChannelSelectDefaultValueResponseSchema = v.pipe(
  v.object({ type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema }),
  v.metadata({ ref: 'ChannelSelectDefaultValueResponse' }),
)

export type ChannelSelectDefaultValueResponse = v.InferOutput<
  typeof ChannelSelectDefaultValueResponseSchema
>

export const ChannelSelectComponentResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ChannelSelectComponentResponse' }),
)

export type ChannelSelectComponentResponse = v.InferOutput<
  typeof ChannelSelectComponentResponseSchema
>

export const RoleSelectDefaultValueResponseSchema = v.pipe(
  v.object({ type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema }),
  v.metadata({ ref: 'RoleSelectDefaultValueResponse' }),
)

export type RoleSelectDefaultValueResponse = v.InferOutput<
  typeof RoleSelectDefaultValueResponseSchema
>

export const UserSelectDefaultValueResponseSchema = v.pipe(
  v.object({ type: SnowflakeSelectDefaultValueTypesSchema, id: SnowflakeTypeSchema }),
  v.metadata({ ref: 'UserSelectDefaultValueResponse' }),
)

export type UserSelectDefaultValueResponse = v.InferOutput<
  typeof UserSelectDefaultValueResponseSchema
>

export const MentionableSelectComponentResponseSchema = v.pipe(
  v.object({
    type: MessageComponentTypesSchema,
    id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    custom_id: v.string(),
    placeholder: v.optional(v.string()),
    min_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    max_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    disabled: v.optional(v.boolean()),
    default_values: v.optional(
      v.array(
        v.union([RoleSelectDefaultValueResponseSchema, UserSelectDefaultValueResponseSchema]),
      ),
    ),
  }),
  v.metadata({ ref: 'MentionableSelectComponentResponse' }),
)

export type MentionableSelectComponentResponse = v.InferOutput<
  typeof MentionableSelectComponentResponseSchema
>

export const RoleSelectComponentResponseSchema = v.pipe(
  v.object({
    type: MessageComponentTypesSchema,
    id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    custom_id: v.string(),
    placeholder: v.optional(v.string()),
    min_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    max_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    disabled: v.optional(v.boolean()),
    default_values: v.optional(v.array(RoleSelectDefaultValueResponseSchema)),
  }),
  v.metadata({ ref: 'RoleSelectComponentResponse' }),
)

export type RoleSelectComponentResponse = v.InferOutput<typeof RoleSelectComponentResponseSchema>

export const StringSelectOptionResponseSchema = v.pipe(
  v.object({
    label: v.string(),
    value: v.string(),
    description: v.optional(v.string()),
    emoji: v.optional(ComponentEmojiResponseSchema),
    default: v.optional(v.boolean()),
  }),
  v.metadata({ ref: 'StringSelectOptionResponse' }),
)

export type StringSelectOptionResponse = v.InferOutput<typeof StringSelectOptionResponseSchema>

export const StringSelectComponentResponseSchema = v.pipe(
  v.object({
    type: MessageComponentTypesSchema,
    id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    custom_id: v.string(),
    placeholder: v.optional(v.string()),
    min_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    max_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    disabled: v.optional(v.boolean()),
    options: v.array(StringSelectOptionResponseSchema),
  }),
  v.metadata({ ref: 'StringSelectComponentResponse' }),
)

export type StringSelectComponentResponse = v.InferOutput<
  typeof StringSelectComponentResponseSchema
>

export const TextInputComponentResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'TextInputComponentResponse' }),
)

export type TextInputComponentResponse = v.InferOutput<typeof TextInputComponentResponseSchema>

export const UserSelectComponentResponseSchema = v.pipe(
  v.object({
    type: MessageComponentTypesSchema,
    id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    custom_id: v.string(),
    placeholder: v.optional(v.string()),
    min_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    max_values: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    disabled: v.optional(v.boolean()),
    default_values: v.optional(v.array(UserSelectDefaultValueResponseSchema)),
  }),
  v.metadata({ ref: 'UserSelectComponentResponse' }),
)

export type UserSelectComponentResponse = v.InferOutput<typeof UserSelectComponentResponseSchema>

export const ActionRowComponentResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ActionRowComponentResponse' }),
)

export type ActionRowComponentResponse = v.InferOutput<typeof ActionRowComponentResponseSchema>

export const ActionTypesSchema = v.pipe(
  v.union([
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
    v.pipe(
      v.literal('MESSAGE_DELETE_BULK'),
      v.description('Multiple messages were deleted at once'),
    ),
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
    v.pipe(
      v.literal('STAGE_INSTANCE_DELETE'),
      v.description('Stage instance was deleted or closed'),
    ),
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
  ]),
  v.metadata({ ref: 'ActionTypes' }),
)

export type ActionTypes = v.InferOutput<typeof ActionTypesSchema>

export const ApplicationTypesSchema = v.pipe(
  v.union([v.literal(4)]),
  v.metadata({ ref: 'ApplicationTypes' }),
)

export type ApplicationTypes = v.InferOutput<typeof ApplicationTypesSchema>

export const Int53TypeSchema = v.pipe(
  v.pipe(
    v.union([v.bigint(), v.pipe(v.number(), v.integer()), v.pipe(v.string(), v.regex(/^-?\d+$/))]),
    v.transform((input) => BigInt(input)),
    v.minValue(-9223372036854775808n),
    v.maxValue(9223372036854775807n),
    v.minValue(-9007199254740991n),
    v.maxValue(9007199254740991n),
  ),
  v.metadata({ ref: 'Int53Type' }),
)

export type Int53Type = v.InferOutput<typeof Int53TypeSchema>

export const UserAvatarDecorationResponseSchema = v.pipe(
  v.object({
    asset: v.pipe(v.string(), v.description('the avatar decoration hash')),
    sku_id: v.pipe(
      v.union([v.null(), SnowflakeTypeSchema]),
      v.description("id of the avatar decoration's SKU"),
    ),
  }),
  v.metadata({ ref: 'UserAvatarDecorationResponse' }),
)

export type UserAvatarDecorationResponse = v.InferOutput<typeof UserAvatarDecorationResponseSchema>

export const NameplatePaletteSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'NameplatePalette' }),
)

export type NameplatePalette = v.InferOutput<typeof NameplatePaletteSchema>

export const UserNameplateResponseSchema = v.pipe(
  v.object({
    sku_id: v.pipe(
      v.union([v.null(), SnowflakeTypeSchema]),
      v.description('ID of the nameplate SKU'),
    ),
    asset: v.pipe(v.string(), v.description('Path to the nameplate asset')),
    label: v.pipe(v.string(), v.description('The label of this nameplate. Currently unused')),
    palette: v.pipe(NameplatePaletteSchema, v.description('Background color of the nameplate')),
  }),
  v.metadata({ ref: 'UserNameplateResponse' }),
)

export type UserNameplateResponse = v.InferOutput<typeof UserNameplateResponseSchema>

export const UserCollectiblesResponseSchema = v.pipe(
  v.object({
    nameplate: v.pipe(
      v.union([v.null(), UserNameplateResponseSchema]),
      v.description('Object mapping of nameplate data'),
    ),
  }),
  v.metadata({ ref: 'UserCollectiblesResponse' }),
)

export type UserCollectiblesResponse = v.InferOutput<typeof UserCollectiblesResponseSchema>

export const UserPrimaryGuildResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'UserPrimaryGuildResponse' }),
)

export type UserPrimaryGuildResponse = v.InferOutput<typeof UserPrimaryGuildResponseSchema>

export const UserResponseSchema = v.pipe(
  v.object({
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
        v.nullable(
          v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        ),
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
  }),
  v.metadata({ ref: 'UserResponse' }),
)

export type UserResponse = v.InferOutput<typeof UserResponseSchema>

export const OAuth2ScopesSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'OAuth2Scopes' }),
)

export type OAuth2Scopes = v.InferOutput<typeof OAuth2ScopesSchema>

export const ApplicationOAuth2InstallParamsResponseSchema = v.pipe(
  v.object({
    scopes: v.pipe(
      v.array(OAuth2ScopesSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
    permissions: v.string(),
  }),
  v.metadata({ ref: 'ApplicationOAuth2InstallParamsResponse' }),
)

export type ApplicationOAuth2InstallParamsResponse = v.InferOutput<
  typeof ApplicationOAuth2InstallParamsResponseSchema
>

export const ApplicationIntegrationTypeConfigurationResponseSchema = v.pipe(
  v.partial(v.object({ oauth2_install_params: ApplicationOAuth2InstallParamsResponseSchema })),
  v.metadata({ ref: 'ApplicationIntegrationTypeConfigurationResponse' }),
)

export type ApplicationIntegrationTypeConfigurationResponse = v.InferOutput<
  typeof ApplicationIntegrationTypeConfigurationResponseSchema
>

export const ApplicationResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ApplicationResponse' }),
)

export type ApplicationResponse = v.InferOutput<typeof ApplicationResponseSchema>

export const AttachmentResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'AttachmentResponse' }),
)

export type AttachmentResponse = v.InferOutput<typeof AttachmentResponseSchema>

export const ActivitiesAttachmentResponseSchema = v.pipe(
  v.object({ attachment: AttachmentResponseSchema }),
  v.metadata({ ref: 'ActivitiesAttachmentResponse' }),
)

export type ActivitiesAttachmentResponse = v.InferOutput<typeof ActivitiesAttachmentResponseSchema>

export const ActivityActionTypesSchema = v.pipe(
  v.union([v.literal(1), v.literal(2), v.literal(3), v.literal(5), v.literal(6)]),
  v.metadata({ ref: 'ActivityActionTypes' }),
)

export type ActivityActionTypes = v.InferOutput<typeof ActivityActionTypesSchema>

export const ActivityInstanceCallbackResponseSchema = v.pipe(
  v.object({ id: v.string() }),
  v.metadata({ ref: 'ActivityInstanceCallbackResponse' }),
)

export type ActivityInstanceCallbackResponse = v.InferOutput<
  typeof ActivityInstanceCallbackResponseSchema
>

export const AfkTimeoutsSchema = v.pipe(
  v.union([v.literal(60), v.literal(300), v.literal(900), v.literal(1800), v.literal(3600)]),
  v.metadata({ ref: 'AfkTimeouts' }),
)

export type AfkTimeouts = v.InferOutput<typeof AfkTimeoutsSchema>

export const AllowedMentionTypesSchema = v.pipe(
  v.union([
    v.pipe(v.literal('users'), v.description('Controls role mentions')),
    v.pipe(v.literal('roles'), v.description('Controls user mentions')),
    v.pipe(v.literal('everyone'), v.description('Controls @everyone and @here mentions')),
  ]),
  v.metadata({ ref: 'AllowedMentionTypes' }),
)

export type AllowedMentionTypes = v.InferOutput<typeof AllowedMentionTypesSchema>

export const ApplicationCommandOptionTypeSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'ApplicationCommandOptionType' }),
)

export type ApplicationCommandOptionType = v.InferOutput<typeof ApplicationCommandOptionTypeSchema>

export const ApplicationCommandAttachmentOptionSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
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
  }),
  v.metadata({ ref: 'ApplicationCommandAttachmentOption' }),
)

export type ApplicationCommandAttachmentOption = v.InferOutput<
  typeof ApplicationCommandAttachmentOptionSchema
>

export const ApplicationCommandAttachmentOptionResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ApplicationCommandAttachmentOptionResponse' }),
)

export type ApplicationCommandAttachmentOptionResponse = v.InferOutput<
  typeof ApplicationCommandAttachmentOptionResponseSchema
>

export const InteractionCallbackTypesSchema = v.pipe(
  v.union([
    v.literal(1),
    v.literal(4),
    v.literal(5),
    v.literal(6),
    v.literal(7),
    v.literal(8),
    v.literal(9),
    v.literal(12),
    v.literal(13),
  ]),
  v.metadata({ ref: 'InteractionCallbackTypes' }),
)

export type InteractionCallbackTypes = v.InferOutput<typeof InteractionCallbackTypesSchema>

export const ApplicationCommandOptionIntegerChoiceSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    name_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
    ),
    value: Int53TypeSchema,
  }),
  v.metadata({ ref: 'ApplicationCommandOptionIntegerChoice' }),
)

export type ApplicationCommandOptionIntegerChoice = v.InferOutput<
  typeof ApplicationCommandOptionIntegerChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema = v.pipe(
  v.partial(
    v.object({
      choices: v.nullable(
        v.pipe(
          v.array(v.union([v.null(), ApplicationCommandOptionIntegerChoiceSchema])),
          v.maxLength(25),
        ),
      ),
    }),
  ),
  v.metadata({ ref: 'InteractionApplicationCommandAutocompleteCallbackIntegerData' }),
)

export type InteractionApplicationCommandAutocompleteCallbackIntegerData = v.InferOutput<
  typeof InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema
>

export const ApplicationCommandOptionNumberChoiceSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    name_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
    ),
    value: v.number(),
  }),
  v.metadata({ ref: 'ApplicationCommandOptionNumberChoice' }),
)

export type ApplicationCommandOptionNumberChoice = v.InferOutput<
  typeof ApplicationCommandOptionNumberChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackNumberDataSchema = v.pipe(
  v.partial(
    v.object({
      choices: v.nullable(
        v.pipe(
          v.array(v.union([v.null(), ApplicationCommandOptionNumberChoiceSchema])),
          v.maxLength(25),
        ),
      ),
    }),
  ),
  v.metadata({ ref: 'InteractionApplicationCommandAutocompleteCallbackNumberData' }),
)

export type InteractionApplicationCommandAutocompleteCallbackNumberData = v.InferOutput<
  typeof InteractionApplicationCommandAutocompleteCallbackNumberDataSchema
>

export const ApplicationCommandOptionStringChoiceSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    name_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
    ),
    value: v.pipe(v.string(), v.maxCodePoints(6000)),
  }),
  v.metadata({ ref: 'ApplicationCommandOptionStringChoice' }),
)

export type ApplicationCommandOptionStringChoice = v.InferOutput<
  typeof ApplicationCommandOptionStringChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackStringDataSchema = v.pipe(
  v.partial(
    v.object({
      choices: v.nullable(
        v.pipe(
          v.array(v.union([v.null(), ApplicationCommandOptionStringChoiceSchema])),
          v.maxLength(25),
        ),
      ),
    }),
  ),
  v.metadata({ ref: 'InteractionApplicationCommandAutocompleteCallbackStringData' }),
)

export type InteractionApplicationCommandAutocompleteCallbackStringData = v.InferOutput<
  typeof InteractionApplicationCommandAutocompleteCallbackStringDataSchema
>

export const ApplicationCommandAutocompleteCallbackRequestSchema = v.pipe(
  v.object({
    type: InteractionCallbackTypesSchema,
    data: v.union([
      InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema,
      InteractionApplicationCommandAutocompleteCallbackNumberDataSchema,
      InteractionApplicationCommandAutocompleteCallbackStringDataSchema,
    ]),
  }),
  v.metadata({ ref: 'ApplicationCommandAutocompleteCallbackRequest' }),
)

export type ApplicationCommandAutocompleteCallbackRequest = v.InferOutput<
  typeof ApplicationCommandAutocompleteCallbackRequestSchema
>

export const ApplicationCommandBooleanOptionSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
    ),
    required: v.optional(v.nullable(v.boolean())),
  }),
  v.metadata({ ref: 'ApplicationCommandBooleanOption' }),
)

export type ApplicationCommandBooleanOption = v.InferOutput<
  typeof ApplicationCommandBooleanOptionSchema
>

export const ApplicationCommandBooleanOptionResponseSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.string(),
    name_localized: v.optional(v.string()),
    name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    description: v.string(),
    description_localized: v.optional(v.string()),
    description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    required: v.optional(v.boolean()),
  }),
  v.metadata({ ref: 'ApplicationCommandBooleanOptionResponse' }),
)

export type ApplicationCommandBooleanOptionResponse = v.InferOutput<
  typeof ApplicationCommandBooleanOptionResponseSchema
>

export const ApplicationCommandChannelOptionSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
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
  }),
  v.metadata({ ref: 'ApplicationCommandChannelOption' }),
)

export type ApplicationCommandChannelOption = v.InferOutput<
  typeof ApplicationCommandChannelOptionSchema
>

export const ApplicationCommandChannelOptionResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ApplicationCommandChannelOptionResponse' }),
)

export type ApplicationCommandChannelOptionResponse = v.InferOutput<
  typeof ApplicationCommandChannelOptionResponseSchema
>

export const ApplicationCommandIntegerOptionSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
    ),
    required: v.optional(v.nullable(v.boolean())),
    autocomplete: v.optional(v.nullable(v.boolean())),
    choices: v.optional(
      v.nullable(v.pipe(v.array(ApplicationCommandOptionIntegerChoiceSchema), v.maxLength(25))),
    ),
    min_value: v.optional(v.union([v.null(), Int53TypeSchema])),
    max_value: v.optional(v.union([v.null(), Int53TypeSchema])),
  }),
  v.metadata({ ref: 'ApplicationCommandIntegerOption' }),
)

export type ApplicationCommandIntegerOption = v.InferOutput<
  typeof ApplicationCommandIntegerOptionSchema
>

export const ApplicationCommandMentionableOptionSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
    ),
    required: v.optional(v.nullable(v.boolean())),
  }),
  v.metadata({ ref: 'ApplicationCommandMentionableOption' }),
)

export type ApplicationCommandMentionableOption = v.InferOutput<
  typeof ApplicationCommandMentionableOptionSchema
>

export const ApplicationCommandNumberOptionSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
    ),
    required: v.optional(v.nullable(v.boolean())),
    autocomplete: v.optional(v.nullable(v.boolean())),
    choices: v.optional(
      v.nullable(v.pipe(v.array(ApplicationCommandOptionNumberChoiceSchema), v.maxLength(25))),
    ),
    min_value: v.optional(v.nullable(v.number())),
    max_value: v.optional(v.nullable(v.number())),
  }),
  v.metadata({ ref: 'ApplicationCommandNumberOption' }),
)

export type ApplicationCommandNumberOption = v.InferOutput<
  typeof ApplicationCommandNumberOptionSchema
>

export const ApplicationCommandRoleOptionSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
    ),
    required: v.optional(v.nullable(v.boolean())),
  }),
  v.metadata({ ref: 'ApplicationCommandRoleOption' }),
)

export type ApplicationCommandRoleOption = v.InferOutput<typeof ApplicationCommandRoleOptionSchema>

export const ApplicationCommandStringOptionSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
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
  }),
  v.metadata({ ref: 'ApplicationCommandStringOption' }),
)

export type ApplicationCommandStringOption = v.InferOutput<
  typeof ApplicationCommandStringOptionSchema
>

export const ApplicationCommandUserOptionSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
    ),
    required: v.optional(v.nullable(v.boolean())),
  }),
  v.metadata({ ref: 'ApplicationCommandUserOption' }),
)

export type ApplicationCommandUserOption = v.InferOutput<typeof ApplicationCommandUserOptionSchema>

export const ApplicationCommandSubcommandOptionSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
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
  }),
  v.metadata({ ref: 'ApplicationCommandSubcommandOption' }),
)

export type ApplicationCommandSubcommandOption = v.InferOutput<
  typeof ApplicationCommandSubcommandOptionSchema
>

export const ApplicationCommandSubcommandGroupOptionSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
    ),
    required: v.optional(v.nullable(v.boolean())),
    options: v.optional(
      v.nullable(v.pipe(v.array(ApplicationCommandSubcommandOptionSchema), v.maxLength(25))),
    ),
  }),
  v.metadata({ ref: 'ApplicationCommandSubcommandGroupOption' }),
)

export type ApplicationCommandSubcommandGroupOption = v.InferOutput<
  typeof ApplicationCommandSubcommandGroupOptionSchema
>

export const InteractionContextTypeSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('This command can be used within a Guild.')),
    v.pipe(
      v.literal(1),
      v.description("This command can be used within a DM with this application's bot."),
    ),
    v.pipe(
      v.literal(2),
      v.description('This command can be used within DMs and Group DMs with users.'),
    ),
  ]),
  v.metadata({ ref: 'InteractionContextType' }),
)

export type InteractionContextType = v.InferOutput<typeof InteractionContextTypeSchema>

export const ApplicationIntegrationTypeSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('For Guild install.')),
    v.pipe(v.literal(1), v.description('For User install.')),
  ]),
  v.metadata({ ref: 'ApplicationIntegrationType' }),
)

export type ApplicationIntegrationType = v.InferOutput<typeof ApplicationIntegrationTypeSchema>

export const ApplicationCommandHandlerSchema = v.pipe(
  v.union([
    v.pipe(
      v.literal(1),
      v.description('The app handles the interaction using an interaction token'),
    ),
    v.pipe(
      v.literal(2),
      v.description(
        'Discord handles the interaction by launching an Activity and sending a follow-up message without coordinating with the app',
      ),
    ),
  ]),
  v.metadata({ ref: 'ApplicationCommandHandler' }),
)

export type ApplicationCommandHandler = v.InferOutput<typeof ApplicationCommandHandlerSchema>

export const ApplicationCommandTypeSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'ApplicationCommandType' }),
)

export type ApplicationCommandType = v.InferOutput<typeof ApplicationCommandTypeSchema>

export const ApplicationCommandCreateRequestSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
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
  }),
  v.metadata({ ref: 'ApplicationCommandCreateRequest' }),
)

export type ApplicationCommandCreateRequest = v.InferOutput<
  typeof ApplicationCommandCreateRequestSchema
>

export const ApplicationCommandOptionIntegerChoiceResponseSchema = v.pipe(
  v.object({
    name: v.string(),
    name_localized: v.optional(v.string()),
    name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    value: Int53TypeSchema,
  }),
  v.metadata({ ref: 'ApplicationCommandOptionIntegerChoiceResponse' }),
)

export type ApplicationCommandOptionIntegerChoiceResponse = v.InferOutput<
  typeof ApplicationCommandOptionIntegerChoiceResponseSchema
>

export const ApplicationCommandIntegerOptionResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ApplicationCommandIntegerOptionResponse' }),
)

export type ApplicationCommandIntegerOptionResponse = v.InferOutput<
  typeof ApplicationCommandIntegerOptionResponseSchema
>

export const InteractionTypesSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'InteractionTypes' }),
)

export type InteractionTypes = v.InferOutput<typeof InteractionTypesSchema>

export const ApplicationCommandInteractionMetadataResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    user: v.optional(UserResponseSchema),
    authorizing_integration_owners: v.record(v.string(), SnowflakeTypeSchema),
    original_response_message_id: v.optional(SnowflakeTypeSchema),
    target_user: v.optional(UserResponseSchema),
    target_message_id: v.optional(SnowflakeTypeSchema),
  }),
  v.metadata({ ref: 'ApplicationCommandInteractionMetadataResponse' }),
)

export type ApplicationCommandInteractionMetadataResponse = v.InferOutput<
  typeof ApplicationCommandInteractionMetadataResponseSchema
>

export const ApplicationCommandMentionableOptionResponseSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.string(),
    name_localized: v.optional(v.string()),
    name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    description: v.string(),
    description_localized: v.optional(v.string()),
    description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    required: v.optional(v.boolean()),
  }),
  v.metadata({ ref: 'ApplicationCommandMentionableOptionResponse' }),
)

export type ApplicationCommandMentionableOptionResponse = v.InferOutput<
  typeof ApplicationCommandMentionableOptionResponseSchema
>

export const ApplicationCommandOptionNumberChoiceResponseSchema = v.pipe(
  v.object({
    name: v.string(),
    name_localized: v.optional(v.string()),
    name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    value: v.number(),
  }),
  v.metadata({ ref: 'ApplicationCommandOptionNumberChoiceResponse' }),
)

export type ApplicationCommandOptionNumberChoiceResponse = v.InferOutput<
  typeof ApplicationCommandOptionNumberChoiceResponseSchema
>

export const ApplicationCommandNumberOptionResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ApplicationCommandNumberOptionResponse' }),
)

export type ApplicationCommandNumberOptionResponse = v.InferOutput<
  typeof ApplicationCommandNumberOptionResponseSchema
>

export const ApplicationCommandOptionStringChoiceResponseSchema = v.pipe(
  v.object({
    name: v.string(),
    name_localized: v.optional(v.string()),
    name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    value: v.string(),
  }),
  v.metadata({ ref: 'ApplicationCommandOptionStringChoiceResponse' }),
)

export type ApplicationCommandOptionStringChoiceResponse = v.InferOutput<
  typeof ApplicationCommandOptionStringChoiceResponseSchema
>

export const ApplicationCommandPatchRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'ApplicationCommandPatchRequestPartial' }),
)

export type ApplicationCommandPatchRequestPartial = v.InferOutput<
  typeof ApplicationCommandPatchRequestPartialSchema
>

export const ApplicationCommandPermissionTypeSchema = v.pipe(
  v.union([
    v.pipe(v.literal(1), v.description('This permission is for a role.')),
    v.pipe(v.literal(2), v.description('This permission is for a user.')),
    v.pipe(v.literal(3), v.description('This permission is for a channel.')),
  ]),
  v.metadata({ ref: 'ApplicationCommandPermissionType' }),
)

export type ApplicationCommandPermissionType = v.InferOutput<
  typeof ApplicationCommandPermissionTypeSchema
>

export const ApplicationCommandPermissionSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: ApplicationCommandPermissionTypeSchema,
    permission: v.boolean(),
  }),
  v.metadata({ ref: 'ApplicationCommandPermission' }),
)

export type ApplicationCommandPermission = v.InferOutput<typeof ApplicationCommandPermissionSchema>

export const ApplicationCommandRoleOptionResponseSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.string(),
    name_localized: v.optional(v.string()),
    name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    description: v.string(),
    description_localized: v.optional(v.string()),
    description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    required: v.optional(v.boolean()),
  }),
  v.metadata({ ref: 'ApplicationCommandRoleOptionResponse' }),
)

export type ApplicationCommandRoleOptionResponse = v.InferOutput<
  typeof ApplicationCommandRoleOptionResponseSchema
>

export const ApplicationCommandStringOptionResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ApplicationCommandStringOptionResponse' }),
)

export type ApplicationCommandStringOptionResponse = v.InferOutput<
  typeof ApplicationCommandStringOptionResponseSchema
>

export const ApplicationCommandUserOptionResponseSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.string(),
    name_localized: v.optional(v.string()),
    name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    description: v.string(),
    description_localized: v.optional(v.string()),
    description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    required: v.optional(v.boolean()),
  }),
  v.metadata({ ref: 'ApplicationCommandUserOptionResponse' }),
)

export type ApplicationCommandUserOptionResponse = v.InferOutput<
  typeof ApplicationCommandUserOptionResponseSchema
>

export const ApplicationCommandSubcommandOptionResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ApplicationCommandSubcommandOptionResponse' }),
)

export type ApplicationCommandSubcommandOptionResponse = v.InferOutput<
  typeof ApplicationCommandSubcommandOptionResponseSchema
>

export const ApplicationCommandSubcommandGroupOptionResponseSchema = v.pipe(
  v.object({
    type: ApplicationCommandOptionTypeSchema,
    name: v.string(),
    name_localized: v.optional(v.string()),
    name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    description: v.string(),
    description_localized: v.optional(v.string()),
    description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    required: v.optional(v.boolean()),
    options: v.optional(v.array(ApplicationCommandSubcommandOptionResponseSchema)),
  }),
  v.metadata({ ref: 'ApplicationCommandSubcommandGroupOptionResponse' }),
)

export type ApplicationCommandSubcommandGroupOptionResponse = v.InferOutput<
  typeof ApplicationCommandSubcommandGroupOptionResponseSchema
>

export const ApplicationCommandResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ApplicationCommandResponse' }),
)

export type ApplicationCommandResponse = v.InferOutput<typeof ApplicationCommandResponseSchema>

export const ApplicationCommandUpdateRequestSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)),
    name_localizations: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    ),
    description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
    description_localizations: v.optional(
      v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
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
  }),
  v.metadata({ ref: 'ApplicationCommandUpdateRequest' }),
)

export type ApplicationCommandUpdateRequest = v.InferOutput<
  typeof ApplicationCommandUpdateRequestSchema
>

export const ApplicationEventWebhooksStatusSchema = v.pipe(
  v.union([
    v.pipe(v.literal(1), v.description('Webhook events are disabled by developer')),
    v.pipe(v.literal(2), v.description('Webhook events are enabled by developer')),
    v.pipe(
      v.literal(3),
      v.description('Webhook events are disabled by Discord, usually due to inactivity'),
    ),
  ]),
  v.metadata({ ref: 'ApplicationEventWebhooksStatus' }),
)

export type ApplicationEventWebhooksStatus = v.InferOutput<
  typeof ApplicationEventWebhooksStatusSchema
>

export const ApplicationExplicitContentFilterTypesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('inherit guild content filter setting')),
    v.pipe(v.literal(1), v.description('interactions will always be scanned')),
  ]),
  v.metadata({ ref: 'ApplicationExplicitContentFilterTypes' }),
)

export type ApplicationExplicitContentFilterTypes = v.InferOutput<
  typeof ApplicationExplicitContentFilterTypesSchema
>

export const ApplicationIdentityProviderAuthTypeSchema = v.pipe(
  v.union([
    v.literal('OIDC'),
    v.literal('EPIC_ONLINE_SERVICES_ACCESS_TOKEN'),
    v.literal('EPIC_ONLINE_SERVICES_ID_TOKEN'),
    v.literal('STEAM_SESSION_TICKET'),
    v.literal('UNITY_SERVICES_ID_TOKEN'),
    v.literal('DISCORD_BOT_ISSUED_ACCESS_TOKEN'),
    v.literal('APPLE_ID_TOKEN'),
    v.literal('PLAYSTATION_NETWORK_ID_TOKEN'),
  ]),
  v.metadata({ ref: 'ApplicationIdentityProviderAuthType' }),
)

export type ApplicationIdentityProviderAuthType = v.InferOutput<
  typeof ApplicationIdentityProviderAuthTypeSchema
>

export const WebhookTypesSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'WebhookTypes' }),
)

export type WebhookTypes = v.InferOutput<typeof WebhookTypesSchema>

export const ApplicationIncomingWebhookResponseSchema = v.pipe(
  v.object({
    application_id: v.union([v.null(), SnowflakeTypeSchema]),
    avatar: v.nullable(v.string()),
    channel_id: v.union([v.null(), SnowflakeTypeSchema]),
    guild_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
    id: SnowflakeTypeSchema,
    name: v.string(),
    type: WebhookTypesSchema,
    user: v.optional(UserResponseSchema),
  }),
  v.metadata({ ref: 'ApplicationIncomingWebhookResponse' }),
)

export type ApplicationIncomingWebhookResponse = v.InferOutput<
  typeof ApplicationIncomingWebhookResponseSchema
>

export const ApplicationOAuth2InstallParamsSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'ApplicationOAuth2InstallParams' }),
)

export type ApplicationOAuth2InstallParams = v.InferOutput<
  typeof ApplicationOAuth2InstallParamsSchema
>

export const ApplicationIntegrationTypeConfigurationSchema = v.pipe(
  v.partial(
    v.object({ oauth2_install_params: v.union([v.null(), ApplicationOAuth2InstallParamsSchema]) }),
  ),
  v.metadata({ ref: 'ApplicationIntegrationTypeConfiguration' }),
)

export type ApplicationIntegrationTypeConfiguration = v.InferOutput<
  typeof ApplicationIntegrationTypeConfigurationSchema
>

export const MetadataItemTypesSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'MetadataItemTypes' }),
)

export type MetadataItemTypes = v.InferOutput<typeof MetadataItemTypesSchema>

export const ApplicationRoleConnectionsMetadataItemRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ApplicationRoleConnectionsMetadataItemRequest' }),
)

export type ApplicationRoleConnectionsMetadataItemRequest = v.InferOutput<
  typeof ApplicationRoleConnectionsMetadataItemRequestSchema
>

export const ApplicationRoleConnectionsMetadataItemResponseSchema = v.pipe(
  v.object({
    type: MetadataItemTypesSchema,
    key: v.string(),
    name: v.string(),
    name_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
    description: v.string(),
    description_localizations: v.optional(v.nullable(v.record(v.string(), v.string()))),
  }),
  v.metadata({ ref: 'ApplicationRoleConnectionsMetadataItemResponse' }),
)

export type ApplicationRoleConnectionsMetadataItemResponse = v.InferOutput<
  typeof ApplicationRoleConnectionsMetadataItemResponseSchema
>

export const ApplicationUpdateFormPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'ApplicationUpdateFormPartial' }),
)

export type ApplicationUpdateFormPartial = v.InferOutput<typeof ApplicationUpdateFormPartialSchema>

export const ApplicationUserRoleConnectionResponseSchema = v.pipe(
  v.partial(
    v.object({
      platform_name: v.string(),
      platform_username: v.nullable(v.string()),
      metadata: v.record(v.string(), v.string()),
    }),
  ),
  v.metadata({ ref: 'ApplicationUserRoleConnectionResponse' }),
)

export type ApplicationUserRoleConnectionResponse = v.InferOutput<
  typeof ApplicationUserRoleConnectionResponseSchema
>

export const AuditLogActionTypesSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'AuditLogActionTypes' }),
)

export type AuditLogActionTypes = v.InferOutput<typeof AuditLogActionTypesSchema>

export const AuditLogObjectChangeResponseSchema = v.pipe(
  v.object({
    key: v.nullable(v.string()),
    new_value: v.optional(v.any()),
    old_value: v.optional(v.any()),
  }),
  v.metadata({ ref: 'AuditLogObjectChangeResponse' }),
)

export type AuditLogObjectChangeResponse = v.InferOutput<typeof AuditLogObjectChangeResponseSchema>

export const AuditLogEntryResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    action_type: AuditLogActionTypesSchema,
    user_id: v.union([v.null(), SnowflakeTypeSchema]),
    target_id: v.union([v.null(), SnowflakeTypeSchema]),
    changes: v.optional(v.array(AuditLogObjectChangeResponseSchema)),
    options: v.optional(v.record(v.string(), v.string())),
    reason: v.optional(v.string()),
  }),
  v.metadata({ ref: 'AuditLogEntryResponse' }),
)

export type AuditLogEntryResponse = v.InferOutput<typeof AuditLogEntryResponseSchema>

export const AuthorTypeSchema = v.pipe(
  v.union([
    v.literal('user'),
    v.literal('bot'),
    v.literal('webhook'),
    v.literal('-user'),
    v.literal('-bot'),
    v.literal('-webhook'),
  ]),
  v.metadata({ ref: 'AuthorType' }),
)

export type AuthorType = v.InferOutput<typeof AuthorTypeSchema>

export const AutomodActionTypeSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'AutomodActionType' }),
)

export type AutomodActionType = v.InferOutput<typeof AutomodActionTypeSchema>

export const AutomodEventTypeSchema = v.pipe(
  v.union([
    v.pipe(v.literal(1), v.description('A user submitted a message to a channel')),
    v.pipe(
      v.literal(2),
      v.description(
        "A user is attempting to join the server or a member's properties were updated.",
      ),
    ),
  ]),
  v.metadata({ ref: 'AutomodEventType' }),
)

export type AutomodEventType = v.InferOutput<typeof AutomodEventTypeSchema>

export const AutomodKeywordPresetTypeSchema = v.pipe(
  v.union([
    v.pipe(v.literal(1), v.description('Words and phrases that may be considered profanity')),
    v.pipe(
      v.literal(2),
      v.description('Words and phrases that may be considered as sexual content'),
    ),
    v.pipe(
      v.literal(3),
      v.description('Words and phrases that may be considered slurs and hate speech'),
    ),
  ]),
  v.metadata({ ref: 'AutomodKeywordPresetType' }),
)

export type AutomodKeywordPresetType = v.InferOutput<typeof AutomodKeywordPresetTypeSchema>

export const AutomodTriggerTypeSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'AutomodTriggerType' }),
)

export type AutomodTriggerType = v.InferOutput<typeof AutomodTriggerTypeSchema>

export const AvailableLocalesEnumSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'AvailableLocalesEnum' }),
)

export type AvailableLocalesEnum = v.InferOutput<typeof AvailableLocalesEnumSchema>

export const BanUserFromGuildRequestSchema = v.pipe(
  v.partial(
    v.object({
      delete_message_seconds: v.nullable(
        v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(604800)),
      ),
      delete_message_days: v.nullable(
        v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(7)),
      ),
    }),
  ),
  v.metadata({ ref: 'BanUserFromGuildRequest' }),
)

export type BanUserFromGuildRequest = v.InferOutput<typeof BanUserFromGuildRequestSchema>

export const RichEmbedAuthorSchema = v.pipe(
  v.partial(
    v.object({
      name: v.nullable(v.pipe(v.string(), v.maxCodePoints(256))),
      url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
      icon_url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    }),
  ),
  v.metadata({ ref: 'RichEmbedAuthor' }),
)

export type RichEmbedAuthor = v.InferOutput<typeof RichEmbedAuthorSchema>

export const RichEmbedImageSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'RichEmbedImage' }),
)

export type RichEmbedImage = v.InferOutput<typeof RichEmbedImageSchema>

export const RichEmbedThumbnailSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'RichEmbedThumbnail' }),
)

export type RichEmbedThumbnail = v.InferOutput<typeof RichEmbedThumbnailSchema>

export const RichEmbedFooterSchema = v.pipe(
  v.partial(
    v.object({
      text: v.nullable(v.pipe(v.string(), v.maxCodePoints(2048))),
      icon_url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    }),
  ),
  v.metadata({ ref: 'RichEmbedFooter' }),
)

export type RichEmbedFooter = v.InferOutput<typeof RichEmbedFooterSchema>

export const RichEmbedFieldSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.maxCodePoints(256)),
    value: v.pipe(v.string(), v.maxCodePoints(1024)),
    inline: v.optional(v.nullable(v.boolean())),
  }),
  v.metadata({ ref: 'RichEmbedField' }),
)

export type RichEmbedField = v.InferOutput<typeof RichEmbedFieldSchema>

export const RichEmbedProviderSchema = v.pipe(
  v.partial(
    v.object({
      name: v.nullable(v.pipe(v.string(), v.maxCodePoints(256))),
      url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
    }),
  ),
  v.metadata({ ref: 'RichEmbedProvider' }),
)

export type RichEmbedProvider = v.InferOutput<typeof RichEmbedProviderSchema>

export const RichEmbedVideoSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'RichEmbedVideo' }),
)

export type RichEmbedVideo = v.InferOutput<typeof RichEmbedVideoSchema>

export const RichEmbedAudioSchema = v.pipe(
  v.partial(
    v.object({
      url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
      description: v.nullable(v.pipe(v.string(), v.maxCodePoints(4096))),
    }),
  ),
  v.metadata({ ref: 'RichEmbedAudio' }),
)

export type RichEmbedAudio = v.InferOutput<typeof RichEmbedAudioSchema>

export const RichEmbedSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'RichEmbed' }),
)

export type RichEmbed = v.InferOutput<typeof RichEmbedSchema>

export const MessageAllowedMentionsRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'MessageAllowedMentionsRequest' }),
)

export type MessageAllowedMentionsRequest = v.InferOutput<
  typeof MessageAllowedMentionsRequestSchema
>

export const UnfurledMediaRequestWithAttachmentReferenceRequiredSchema = v.pipe(
  v.object({ url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)) }),
  v.metadata({ ref: 'UnfurledMediaRequestWithAttachmentReferenceRequired' }),
)

export type UnfurledMediaRequestWithAttachmentReferenceRequired = v.InferOutput<
  typeof UnfurledMediaRequestWithAttachmentReferenceRequiredSchema
>

export const FileComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'FileComponentForMessageRequest' }),
)

export type FileComponentForMessageRequest = v.InferOutput<
  typeof FileComponentForMessageRequestSchema
>

export const UnfurledMediaRequestSchema = v.pipe(
  v.object({ url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)) }),
  v.metadata({ ref: 'UnfurledMediaRequest' }),
)

export type UnfurledMediaRequest = v.InferOutput<typeof UnfurledMediaRequestSchema>

export const MediaGalleryItemForMessageRequestSchema = v.pipe(
  v.object({
    description: v.optional(
      v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1024))),
    ),
    spoiler: v.optional(v.nullable(v.boolean())),
    media: UnfurledMediaRequestSchema,
  }),
  v.metadata({ ref: 'MediaGalleryItemForMessageRequest' }),
)

export type MediaGalleryItemForMessageRequest = v.InferOutput<
  typeof MediaGalleryItemForMessageRequestSchema
>

export const MediaGalleryComponentForMessageRequestSchema = v.pipe(
  v.object({
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
    items: v.pipe(
      v.array(MediaGalleryItemForMessageRequestSchema),
      v.minLength(1),
      v.maxLength(10),
    ),
  }),
  v.metadata({ ref: 'MediaGalleryComponentForMessageRequest' }),
)

export type MediaGalleryComponentForMessageRequest = v.InferOutput<
  typeof MediaGalleryComponentForMessageRequestSchema
>

export const TextDisplayComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'TextDisplayComponentForMessageRequest' }),
)

export type TextDisplayComponentForMessageRequest = v.InferOutput<
  typeof TextDisplayComponentForMessageRequestSchema
>

export const ThumbnailComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ThumbnailComponentForMessageRequest' }),
)

export type ThumbnailComponentForMessageRequest = v.InferOutput<
  typeof ThumbnailComponentForMessageRequestSchema
>

export const SectionComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'SectionComponentForMessageRequest' }),
)

export type SectionComponentForMessageRequest = v.InferOutput<
  typeof SectionComponentForMessageRequestSchema
>

export const MessageComponentSeparatorSpacingSizeSchema = v.pipe(
  v.union([
    v.pipe(v.literal(1), v.description('Small spacing')),
    v.pipe(v.literal(2), v.description('Large spacing')),
  ]),
  v.metadata({ ref: 'MessageComponentSeparatorSpacingSize' }),
)

export type MessageComponentSeparatorSpacingSize = v.InferOutput<
  typeof MessageComponentSeparatorSpacingSizeSchema
>

export const SeparatorComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'SeparatorComponentForMessageRequest' }),
)

export type SeparatorComponentForMessageRequest = v.InferOutput<
  typeof SeparatorComponentForMessageRequestSchema
>

export const ContainerComponentForMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ContainerComponentForMessageRequest' }),
)

export type ContainerComponentForMessageRequest = v.InferOutput<
  typeof ContainerComponentForMessageRequestSchema
>

export const MessageAttachmentRequestSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    filename: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(1024)))),
    description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1024)))),
    duration_secs: v.optional(
      v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(2147483647))),
    ),
    waveform: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(400)))),
    title: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(1024)))),
    is_spoiler: v.optional(v.nullable(v.boolean())),
  }),
  v.metadata({ ref: 'MessageAttachmentRequest' }),
)

export type MessageAttachmentRequest = v.InferOutput<typeof MessageAttachmentRequestSchema>

export const PollEmojiSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'PollEmoji' }),
)

export type PollEmoji = v.InferOutput<typeof PollEmojiSchema>

export const PollMediaSchema = v.pipe(
  v.partial(
    v.object({
      text: v.pipe(
        v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(300))),
        v.description('The text of the field'),
      ),
      emoji: v.pipe(v.union([v.null(), PollEmojiSchema]), v.description('The emoji of the field')),
    }),
  ),
  v.metadata({ ref: 'PollMedia' }),
)

export type PollMedia = v.InferOutput<typeof PollMediaSchema>

export const PollEmojiCreateRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'PollEmojiCreateRequest' }),
)

export type PollEmojiCreateRequest = v.InferOutput<typeof PollEmojiCreateRequestSchema>

export const PollMediaCreateRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'PollMediaCreateRequest' }),
)

export type PollMediaCreateRequest = v.InferOutput<typeof PollMediaCreateRequestSchema>

export const PollAnswerCreateRequestSchema = v.pipe(
  v.object({
    poll_media: v.pipe(PollMediaCreateRequestSchema, v.description('The data of the answer')),
  }),
  v.metadata({ ref: 'PollAnswerCreateRequest' }),
)

export type PollAnswerCreateRequest = v.InferOutput<typeof PollAnswerCreateRequestSchema>

export const PollLayoutTypesSchema = v.pipe(
  v.union([v.pipe(v.literal(1), v.description('The, uhm, default layout type.'))]),
  v.metadata({ ref: 'PollLayoutTypes' }),
)

export type PollLayoutTypes = v.InferOutput<typeof PollLayoutTypesSchema>

export const PollCreateRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'PollCreateRequest' }),
)

export type PollCreateRequest = v.InferOutput<typeof PollCreateRequestSchema>

export const MessageShareCustomUserThemeBaseThemeSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('No base theme')),
    v.pipe(v.literal(1), v.description('Dark base theme')),
    v.pipe(v.literal(2), v.description('Light base theme')),
    v.pipe(v.literal(3), v.description('Darker base theme')),
    v.pipe(v.literal(4), v.description('Midnight base theme')),
  ]),
  v.metadata({ ref: 'MessageShareCustomUserThemeBaseTheme' }),
)

export type MessageShareCustomUserThemeBaseTheme = v.InferOutput<
  typeof MessageShareCustomUserThemeBaseThemeSchema
>

export const CustomClientThemeShareRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'CustomClientThemeShareRequest' }),
)

export type CustomClientThemeShareRequest = v.InferOutput<
  typeof CustomClientThemeShareRequestSchema
>

export const BaseCreateMessageCreateRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'BaseCreateMessageCreateRequest' }),
)

export type BaseCreateMessageCreateRequest = v.InferOutput<
  typeof BaseCreateMessageCreateRequestSchema
>

export const BasicApplicationResponseWithBotSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'BasicApplicationResponseWithBot' }),
)

export type BasicApplicationResponseWithBot = v.InferOutput<
  typeof BasicApplicationResponseWithBotSchema
>

export const BasicGuildMemberResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'BasicGuildMemberResponse' }),
)

export type BasicGuildMemberResponse = v.InferOutput<typeof BasicGuildMemberResponseSchema>

export const MessageTypeSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'MessageType' }),
)

export type MessageType = v.InferOutput<typeof MessageTypeSchema>

export const MessageAttachmentResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'MessageAttachmentResponse' }),
)

export type MessageAttachmentResponse = v.InferOutput<typeof MessageAttachmentResponseSchema>

export const MessageEmbedFieldResponseSchema = v.pipe(
  v.object({ name: v.string(), value: v.string(), inline: v.boolean() }),
  v.metadata({ ref: 'MessageEmbedFieldResponse' }),
)

export type MessageEmbedFieldResponse = v.InferOutput<typeof MessageEmbedFieldResponseSchema>

export const MessageEmbedAuthorResponseSchema = v.pipe(
  v.object({
    name: v.string(),
    url: v.optional(v.string()),
    icon_url: v.optional(v.string()),
    proxy_icon_url: v.optional(v.pipe(v.string(), v.url())),
  }),
  v.metadata({ ref: 'MessageEmbedAuthorResponse' }),
)

export type MessageEmbedAuthorResponse = v.InferOutput<typeof MessageEmbedAuthorResponseSchema>

export const MessageEmbedProviderResponseSchema = v.pipe(
  v.object({ name: v.string(), url: v.optional(v.pipe(v.string(), v.url())) }),
  v.metadata({ ref: 'MessageEmbedProviderResponse' }),
)

export type MessageEmbedProviderResponse = v.InferOutput<typeof MessageEmbedProviderResponseSchema>

export const UInt32TypeSchema = v.pipe(
  v.pipe(
    v.union([v.bigint(), v.pipe(v.number(), v.integer()), v.pipe(v.string(), v.regex(/^-?\d+$/))]),
    v.transform((input) => BigInt(input)),
    v.minValue(-9223372036854775808n),
    v.maxValue(9223372036854775807n),
    v.minValue(0n),
    v.maxValue(4294967295n),
  ),
  v.metadata({ ref: 'UInt32Type' }),
)

export type UInt32Type = v.InferOutput<typeof UInt32TypeSchema>

export const MessageEmbedImageResponseSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'MessageEmbedImageResponse' }),
)

export type MessageEmbedImageResponse = v.InferOutput<typeof MessageEmbedImageResponseSchema>

export const MessageEmbedVideoResponseSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'MessageEmbedVideoResponse' }),
)

export type MessageEmbedVideoResponse = v.InferOutput<typeof MessageEmbedVideoResponseSchema>

export const MessageEmbedAudioResponseSchema = v.pipe(
  v.partial(
    v.object({
      url: v.string(),
      proxy_url: v.pipe(v.string(), v.url()),
      content_type: v.string(),
      description: v.string(),
    }),
  ),
  v.metadata({ ref: 'MessageEmbedAudioResponse' }),
)

export type MessageEmbedAudioResponse = v.InferOutput<typeof MessageEmbedAudioResponseSchema>

export const MessageEmbedFooterResponseSchema = v.pipe(
  v.object({
    text: v.string(),
    icon_url: v.optional(v.string()),
    proxy_icon_url: v.optional(v.pipe(v.string(), v.url())),
  }),
  v.metadata({ ref: 'MessageEmbedFooterResponse' }),
)

export type MessageEmbedFooterResponse = v.InferOutput<typeof MessageEmbedFooterResponseSchema>

export const ContentScanMetadataResponseSchema = v.pipe(
  v.object({
    flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  }),
  v.metadata({ ref: 'ContentScanMetadataResponse' }),
)

export type ContentScanMetadataResponse = v.InferOutput<typeof ContentScanMetadataResponseSchema>

export const UnfurledMediaResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'UnfurledMediaResponse' }),
)

export type UnfurledMediaResponse = v.InferOutput<typeof UnfurledMediaResponseSchema>

export const FileComponentResponseSchema = v.pipe(
  v.object({
    type: MessageComponentTypesSchema,
    id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    file: UnfurledMediaResponseSchema,
    name: v.nullable(v.string()),
    size: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    ),
    spoiler: v.boolean(),
  }),
  v.metadata({ ref: 'FileComponentResponse' }),
)

export type FileComponentResponse = v.InferOutput<typeof FileComponentResponseSchema>

export const MediaGalleryItemResponseSchema = v.pipe(
  v.object({
    media: UnfurledMediaResponseSchema,
    description: v.nullable(v.string()),
    spoiler: v.boolean(),
  }),
  v.metadata({ ref: 'MediaGalleryItemResponse' }),
)

export type MediaGalleryItemResponse = v.InferOutput<typeof MediaGalleryItemResponseSchema>

export const MediaGalleryComponentResponseSchema = v.pipe(
  v.object({
    type: MessageComponentTypesSchema,
    id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    items: v.array(MediaGalleryItemResponseSchema),
  }),
  v.metadata({ ref: 'MediaGalleryComponentResponse' }),
)

export type MediaGalleryComponentResponse = v.InferOutput<
  typeof MediaGalleryComponentResponseSchema
>

export const TextDisplayComponentResponseSchema = v.pipe(
  v.object({
    type: MessageComponentTypesSchema,
    id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    content: v.string(),
  }),
  v.metadata({ ref: 'TextDisplayComponentResponse' }),
)

export type TextDisplayComponentResponse = v.InferOutput<typeof TextDisplayComponentResponseSchema>

export const ThumbnailComponentResponseSchema = v.pipe(
  v.object({
    type: MessageComponentTypesSchema,
    id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    media: UnfurledMediaResponseSchema,
    description: v.nullable(v.string()),
    spoiler: v.boolean(),
  }),
  v.metadata({ ref: 'ThumbnailComponentResponse' }),
)

export type ThumbnailComponentResponse = v.InferOutput<typeof ThumbnailComponentResponseSchema>

export const SectionComponentResponseSchema = v.pipe(
  v.object({
    type: MessageComponentTypesSchema,
    id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    components: v.array(TextDisplayComponentResponseSchema),
    accessory: v.union([ButtonComponentResponseSchema, ThumbnailComponentResponseSchema]),
  }),
  v.metadata({ ref: 'SectionComponentResponse' }),
)

export type SectionComponentResponse = v.InferOutput<typeof SectionComponentResponseSchema>

export const SeparatorComponentResponseSchema = v.pipe(
  v.object({
    type: MessageComponentTypesSchema,
    id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    spacing: MessageComponentSeparatorSpacingSizeSchema,
    divider: v.boolean(),
  }),
  v.metadata({ ref: 'SeparatorComponentResponse' }),
)

export type SeparatorComponentResponse = v.InferOutput<typeof SeparatorComponentResponseSchema>

export const ContainerComponentResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ContainerComponentResponse' }),
)

export type ContainerComponentResponse = v.InferOutput<typeof ContainerComponentResponseSchema>

export const MessageEmbedResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'MessageEmbedResponse' }),
)

export type MessageEmbedResponse = v.InferOutput<typeof MessageEmbedResponseSchema>

export const StickerTypesSchema = v.pipe(
  v.union([
    v.pipe(
      v.literal(1),
      v.description(
        'an official sticker in a pack, part of Nitro or in a removed purchasable pack',
      ),
    ),
    v.pipe(v.literal(2), v.description("a sticker uploaded to a guild for the guild's members")),
  ]),
  v.metadata({ ref: 'StickerTypes' }),
)

export type StickerTypes = v.InferOutput<typeof StickerTypesSchema>

export const StickerFormatTypesSchema = v.pipe(
  v.union([v.literal(1), v.literal(2), v.literal(3), v.literal(4)]),
  v.metadata({ ref: 'StickerFormatTypes' }),
)

export type StickerFormatTypes = v.InferOutput<typeof StickerFormatTypesSchema>

export const GuildStickerResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    name: v.string(),
    tags: v.string(),
    type: StickerTypesSchema,
    format_type: v.union([v.null(), StickerFormatTypesSchema]),
    description: v.nullable(v.string()),
    available: v.boolean(),
    guild_id: SnowflakeTypeSchema,
    user: v.optional(UserResponseSchema),
  }),
  v.metadata({ ref: 'GuildStickerResponse' }),
)

export type GuildStickerResponse = v.InferOutput<typeof GuildStickerResponseSchema>

export const StandardStickerResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    name: v.string(),
    tags: v.string(),
    type: StickerTypesSchema,
    format_type: v.union([v.null(), StickerFormatTypesSchema]),
    description: v.nullable(v.string()),
    pack_id: SnowflakeTypeSchema,
    sort_value: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  }),
  v.metadata({ ref: 'StandardStickerResponse' }),
)

export type StandardStickerResponse = v.InferOutput<typeof StandardStickerResponseSchema>

export const MessageStickerItemResponseSchema = v.pipe(
  v.object({ id: SnowflakeTypeSchema, name: v.string(), format_type: StickerFormatTypesSchema }),
  v.metadata({ ref: 'MessageStickerItemResponse' }),
)

export type MessageStickerItemResponse = v.InferOutput<typeof MessageStickerItemResponseSchema>

export const MessageCallResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'MessageCallResponse' }),
)

export type MessageCallResponse = v.InferOutput<typeof MessageCallResponseSchema>

export const MessageActivityResponseSchema = v.pipe(
  v.object({ type: ActivityActionTypesSchema, party_id: v.optional(v.string()) }),
  v.metadata({ ref: 'MessageActivityResponse' }),
)

export type MessageActivityResponse = v.InferOutput<typeof MessageActivityResponseSchema>

export const MessageInteractionResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    name: v.string(),
    user: v.optional(UserResponseSchema),
    name_localized: v.optional(v.string()),
  }),
  v.metadata({ ref: 'MessageInteractionResponse' }),
)

export type MessageInteractionResponse = v.InferOutput<typeof MessageInteractionResponseSchema>

export const MessageReferenceTypeSchema = v.pipe(
  v.union([v.pipe(v.literal(0), v.description('Reference to a message'))]),
  v.metadata({ ref: 'MessageReferenceType' }),
)

export type MessageReferenceType = v.InferOutput<typeof MessageReferenceTypeSchema>

export const MessageReferenceResponseSchema = v.pipe(
  v.object({
    type: MessageReferenceTypeSchema,
    channel_id: SnowflakeTypeSchema,
    message_id: v.optional(SnowflakeTypeSchema),
    guild_id: v.optional(SnowflakeTypeSchema),
  }),
  v.metadata({ ref: 'MessageReferenceResponse' }),
)

export type MessageReferenceResponse = v.InferOutput<typeof MessageReferenceResponseSchema>

export const VideoQualityModesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(1), v.description('Discord chooses the quality for optimal performance')),
    v.pipe(v.literal(2), v.description('720p')),
  ]),
  v.metadata({ ref: 'VideoQualityModes' }),
)

export type VideoQualityModes = v.InferOutput<typeof VideoQualityModesSchema>

export const ThreadAutoArchiveDurationSchema = v.pipe(
  v.union([
    v.pipe(v.literal(60), v.description('One hour')),
    v.pipe(v.literal(1440), v.description('One day')),
    v.pipe(v.literal(4320), v.description('Three days')),
    v.pipe(v.literal(10080), v.description('Seven days')),
  ]),
  v.metadata({ ref: 'ThreadAutoArchiveDuration' }),
)

export type ThreadAutoArchiveDuration = v.InferOutput<typeof ThreadAutoArchiveDurationSchema>

export const ThreadMetadataResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ThreadMetadataResponse' }),
)

export type ThreadMetadataResponse = v.InferOutput<typeof ThreadMetadataResponseSchema>

export const GuildMemberResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildMemberResponse' }),
)

export type GuildMemberResponse = v.InferOutput<typeof GuildMemberResponseSchema>

export const ThreadMemberResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ThreadMemberResponse' }),
)

export type ThreadMemberResponse = v.InferOutput<typeof ThreadMemberResponseSchema>

export const ThreadResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ThreadResponse' }),
)

export type ThreadResponse = v.InferOutput<typeof ThreadResponseSchema>

export const MessageMentionChannelResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    name: v.string(),
    type: ChannelTypesSchema,
    guild_id: SnowflakeTypeSchema,
  }),
  v.metadata({ ref: 'MessageMentionChannelResponse' }),
)

export type MessageMentionChannelResponse = v.InferOutput<
  typeof MessageMentionChannelResponseSchema
>

export const MessageRoleSubscriptionDataResponseSchema = v.pipe(
  v.object({
    role_subscription_listing_id: SnowflakeTypeSchema,
    tier_name: v.string(),
    total_months_subscribed: v.pipe(
      v.number(),
      v.integer(),
      v.minValue(-2147483648),
      v.maxValue(2147483647),
    ),
    is_renewal: v.boolean(),
  }),
  v.metadata({ ref: 'MessageRoleSubscriptionDataResponse' }),
)

export type MessageRoleSubscriptionDataResponse = v.InferOutput<
  typeof MessageRoleSubscriptionDataResponseSchema
>

export const PurchaseTypeSchema = v.pipe(
  v.union([v.literal(0)]),
  v.metadata({ ref: 'PurchaseType' }),
)

export type PurchaseType = v.InferOutput<typeof PurchaseTypeSchema>

export const GuildProductPurchaseResponseSchema = v.pipe(
  v.object({ listing_id: SnowflakeTypeSchema, product_name: v.string() }),
  v.metadata({ ref: 'GuildProductPurchaseResponse' }),
)

export type GuildProductPurchaseResponse = v.InferOutput<typeof GuildProductPurchaseResponseSchema>

export const PurchaseNotificationResponseSchema = v.pipe(
  v.object({
    type: PurchaseTypeSchema,
    guild_product_purchase: v.optional(GuildProductPurchaseResponseSchema),
  }),
  v.metadata({ ref: 'PurchaseNotificationResponse' }),
)

export type PurchaseNotificationResponse = v.InferOutput<typeof PurchaseNotificationResponseSchema>

export const ChannelPermissionOverwritesSchema = v.pipe(
  v.union([v.literal(0), v.literal(1)]),
  v.metadata({ ref: 'ChannelPermissionOverwrites' }),
)

export type ChannelPermissionOverwrites = v.InferOutput<typeof ChannelPermissionOverwritesSchema>

export const ChannelPermissionOverwriteResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: ChannelPermissionOverwritesSchema,
    allow: v.string(),
    deny: v.string(),
  }),
  v.metadata({ ref: 'ChannelPermissionOverwriteResponse' }),
)

export type ChannelPermissionOverwriteResponse = v.InferOutput<
  typeof ChannelPermissionOverwriteResponseSchema
>

export const ForumTagResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    name: v.string(),
    moderated: v.boolean(),
    emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
    emoji_name: v.nullable(v.string()),
  }),
  v.metadata({ ref: 'ForumTagResponse' }),
)

export type ForumTagResponse = v.InferOutput<typeof ForumTagResponseSchema>

export const DefaultReactionEmojiResponseSchema = v.pipe(
  v.object({
    emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
    emoji_name: v.nullable(v.string()),
  }),
  v.metadata({ ref: 'DefaultReactionEmojiResponse' }),
)

export type DefaultReactionEmojiResponse = v.InferOutput<typeof DefaultReactionEmojiResponseSchema>

export const ThreadSortOrderSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('Sort forum posts by activity')),
    v.pipe(
      v.literal(1),
      v.description('Sort forum posts by creation time (from most recent to oldest)'),
    ),
  ]),
  v.metadata({ ref: 'ThreadSortOrder' }),
)

export type ThreadSortOrder = v.InferOutput<typeof ThreadSortOrderSchema>

export const ForumLayoutSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('No default has been set for forum channel')),
    v.pipe(v.literal(1), v.description('Display posts as a list')),
    v.pipe(v.literal(2), v.description('Display posts as a collection of tiles')),
  ]),
  v.metadata({ ref: 'ForumLayout' }),
)

export type ForumLayout = v.InferOutput<typeof ForumLayoutSchema>

export const ThreadSearchTagSettingSchema = v.pipe(
  v.union([
    v.pipe(
      v.literal('match_all'),
      v.description('The thread tags must contain all tags in the search query'),
    ),
    v.pipe(
      v.literal('match_some'),
      v.description('The thread tags must contain at least one of tags in the search query'),
    ),
  ]),
  v.metadata({ ref: 'ThreadSearchTagSetting' }),
)

export type ThreadSearchTagSetting = v.InferOutput<typeof ThreadSearchTagSettingSchema>

export const GuildChannelResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildChannelResponse' }),
)

export type GuildChannelResponse = v.InferOutput<typeof GuildChannelResponseSchema>

export const PrivateChannelResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'PrivateChannelResponse' }),
)

export type PrivateChannelResponse = v.InferOutput<typeof PrivateChannelResponseSchema>

export const PrivateGroupChannelResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'PrivateGroupChannelResponse' }),
)

export type PrivateGroupChannelResponse = v.InferOutput<typeof PrivateGroupChannelResponseSchema>

export const GuildRoleColorsResponseSchema = v.pipe(
  v.object({
    primary_color: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    secondary_color: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    ),
    tertiary_color: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    ),
  }),
  v.metadata({ ref: 'GuildRoleColorsResponse' }),
)

export type GuildRoleColorsResponse = v.InferOutput<typeof GuildRoleColorsResponseSchema>

export const GuildRoleTagsResponseSchema = v.pipe(
  v.partial(
    v.object({
      premium_subscriber: v.null(),
      bot_id: SnowflakeTypeSchema,
      integration_id: SnowflakeTypeSchema,
      subscription_listing_id: SnowflakeTypeSchema,
      available_for_purchase: v.null(),
      guild_connections: v.null(),
    }),
  ),
  v.metadata({ ref: 'GuildRoleTagsResponse' }),
)

export type GuildRoleTagsResponse = v.InferOutput<typeof GuildRoleTagsResponseSchema>

export const GuildRoleResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildRoleResponse' }),
)

export type GuildRoleResponse = v.InferOutput<typeof GuildRoleResponseSchema>

export const ResolvedObjectsResponseSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'ResolvedObjectsResponse' }),
)

export type ResolvedObjectsResponse = v.InferOutput<typeof ResolvedObjectsResponseSchema>

export const MessageReactionEmojiResponseSchema = v.pipe(
  v.object({
    id: v.union([v.null(), SnowflakeTypeSchema]),
    name: v.nullable(v.string()),
    animated: v.optional(v.boolean()),
  }),
  v.metadata({ ref: 'MessageReactionEmojiResponse' }),
)

export type MessageReactionEmojiResponse = v.InferOutput<typeof MessageReactionEmojiResponseSchema>

export const PollMediaResponseSchema = v.pipe(
  v.partial(
    v.object({
      text: v.pipe(v.string(), v.description('The text of the field')),
      emoji: v.pipe(MessageReactionEmojiResponseSchema, v.description('The emoji of the field')),
    }),
  ),
  v.metadata({ ref: 'PollMediaResponse' }),
)

export type PollMediaResponse = v.InferOutput<typeof PollMediaResponseSchema>

export const PollAnswerResponseSchema = v.pipe(
  v.object({
    answer_id: v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description('The ID of the answer'),
    ),
    poll_media: v.pipe(PollMediaResponseSchema, v.description('The data of the answer')),
  }),
  v.metadata({ ref: 'PollAnswerResponse' }),
)

export type PollAnswerResponse = v.InferOutput<typeof PollAnswerResponseSchema>

export const PollResultsEntryResponseSchema = v.pipe(
  v.object({
    id: v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description('The answer_id'),
    ),
    count: v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description('The number of votes for this answer'),
    ),
    me_voted: v.pipe(v.boolean(), v.description('Whether the current user voted for this answer')),
  }),
  v.metadata({ ref: 'PollResultsEntryResponse' }),
)

export type PollResultsEntryResponse = v.InferOutput<typeof PollResultsEntryResponseSchema>

export const PollResultsResponseSchema = v.pipe(
  v.object({
    answer_counts: v.pipe(
      v.array(PollResultsEntryResponseSchema),
      v.description('The counts for each answer'),
    ),
    is_finalized: v.pipe(
      v.boolean(),
      v.description('Whether the votes have been precisely counted'),
    ),
  }),
  v.metadata({ ref: 'PollResultsResponse' }),
)

export type PollResultsResponse = v.InferOutput<typeof PollResultsResponseSchema>

export const PollResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'PollResponse' }),
)

export type PollResponse = v.InferOutput<typeof PollResponseSchema>

export const CustomClientThemeResponseSchema = v.pipe(
  v.object({
    colors: v.array(v.string()),
    gradient_angle: v.pipe(
      v.number(),
      v.integer(),
      v.minValue(-2147483648),
      v.maxValue(2147483647),
    ),
    base_mix: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    base_theme: MessageShareCustomUserThemeBaseThemeSchema,
  }),
  v.metadata({ ref: 'CustomClientThemeResponse' }),
)

export type CustomClientThemeResponse = v.InferOutput<typeof CustomClientThemeResponseSchema>

export const MessageComponentInteractionMetadataResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    user: v.optional(UserResponseSchema),
    authorizing_integration_owners: v.record(v.string(), SnowflakeTypeSchema),
    original_response_message_id: v.optional(SnowflakeTypeSchema),
    interacted_message_id: SnowflakeTypeSchema,
  }),
  v.metadata({ ref: 'MessageComponentInteractionMetadataResponse' }),
)

export type MessageComponentInteractionMetadataResponse = v.InferOutput<
  typeof MessageComponentInteractionMetadataResponseSchema
>

export const ModalSubmitInteractionMetadataResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    user: v.optional(UserResponseSchema),
    authorizing_integration_owners: v.record(v.string(), SnowflakeTypeSchema),
    original_response_message_id: v.optional(SnowflakeTypeSchema),
    triggering_interaction_metadata: v.union([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
    ]),
  }),
  v.metadata({ ref: 'ModalSubmitInteractionMetadataResponse' }),
)

export type ModalSubmitInteractionMetadataResponse = v.InferOutput<
  typeof ModalSubmitInteractionMetadataResponseSchema
>

export const MinimalContentMessageResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'MinimalContentMessageResponse' }),
)

export type MinimalContentMessageResponse = v.InferOutput<
  typeof MinimalContentMessageResponseSchema
>

export const MessageSnapshotResponseSchema = v.pipe(
  v.object({ message: MinimalContentMessageResponseSchema }),
  v.metadata({ ref: 'MessageSnapshotResponse' }),
)

export type MessageSnapshotResponse = v.InferOutput<typeof MessageSnapshotResponseSchema>

export const MessageLobbyMemberResponseSchema = v.pipe(
  v.object({ additional_name: v.string() }),
  v.metadata({ ref: 'MessageLobbyMemberResponse' }),
)

export type MessageLobbyMemberResponse = v.InferOutput<typeof MessageLobbyMemberResponseSchema>

export const BasicMessageResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'BasicMessageResponse' }),
)

export type BasicMessageResponse = v.InferOutput<typeof BasicMessageResponseSchema>

export const BlockMessageActionMetadataSchema = v.pipe(
  v.partial(v.object({ custom_message: v.nullable(v.pipe(v.string(), v.maxCodePoints(300))) })),
  v.metadata({ ref: 'BlockMessageActionMetadata' }),
)

export type BlockMessageActionMetadata = v.InferOutput<typeof BlockMessageActionMetadataSchema>

export const BlockMessageActionSchema = v.pipe(
  v.object({
    type: AutomodActionTypeSchema,
    metadata: v.optional(v.union([v.null(), BlockMessageActionMetadataSchema])),
  }),
  v.metadata({ ref: 'BlockMessageAction' }),
)

export type BlockMessageAction = v.InferOutput<typeof BlockMessageActionSchema>

export const BlockMessageActionMetadataResponseSchema = v.pipe(
  v.partial(v.object({ custom_message: v.string() })),
  v.metadata({ ref: 'BlockMessageActionMetadataResponse' }),
)

export type BlockMessageActionMetadataResponse = v.InferOutput<
  typeof BlockMessageActionMetadataResponseSchema
>

export const BlockMessageActionResponseSchema = v.pipe(
  v.object({ type: AutomodActionTypeSchema, metadata: BlockMessageActionMetadataResponseSchema }),
  v.metadata({ ref: 'BlockMessageActionResponse' }),
)

export type BlockMessageActionResponse = v.InferOutput<typeof BlockMessageActionResponseSchema>

export const BotAccountPatchRequestSchema = v.pipe(
  v.object({
    username: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
    avatar: v.optional(v.nullable(v.string())),
    banner: v.optional(v.nullable(v.string())),
  }),
  v.metadata({ ref: 'BotAccountPatchRequest' }),
)

export type BotAccountPatchRequest = v.InferOutput<typeof BotAccountPatchRequestSchema>

export const BotAddGuildMemberRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'BotAddGuildMemberRequest' }),
)

export type BotAddGuildMemberRequest = v.InferOutput<typeof BotAddGuildMemberRequestSchema>

export const BulkBanUsersRequestSchema = v.pipe(
  v.object({
    user_ids: v.pipe(
      v.array(SnowflakeTypeSchema),
      v.maxLength(200),
      v.check((input) => new Set(input).size === input.length),
    ),
    delete_message_seconds: v.optional(
      v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(604800))),
    ),
  }),
  v.metadata({ ref: 'BulkBanUsersRequest' }),
)

export type BulkBanUsersRequest = v.InferOutput<typeof BulkBanUsersRequestSchema>

export const BulkBanUsersResponseSchema = v.pipe(
  v.object({
    banned_users: v.array(SnowflakeTypeSchema),
    failed_users: v.array(SnowflakeTypeSchema),
  }),
  v.metadata({ ref: 'BulkBanUsersResponse' }),
)

export type BulkBanUsersResponse = v.InferOutput<typeof BulkBanUsersResponseSchema>

export const BulkLobbyMemberRequestSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    metadata: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024)))),
    ),
    flags: v.optional(v.union([v.null(), v.literal(1)])),
    additional_name: v.optional(
      v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80))),
    ),
    remove_member: v.optional(v.nullable(v.boolean())),
  }),
  v.metadata({ ref: 'BulkLobbyMemberRequest' }),
)

export type BulkLobbyMemberRequest = v.InferOutput<typeof BulkLobbyMemberRequestSchema>

export const RecurrenceRuleWeekdaysSchema = v.pipe(
  v.union([
    v.literal(0),
    v.literal(1),
    v.literal(2),
    v.literal(3),
    v.literal(4),
    v.literal(5),
    v.literal(6),
  ]),
  v.metadata({ ref: 'RecurrenceRuleWeekdays' }),
)

export type RecurrenceRuleWeekdays = v.InferOutput<typeof RecurrenceRuleWeekdaysSchema>

export const ByNWeekdaySchema = v.pipe(
  v.object({
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
    day: v.pipe(
      RecurrenceRuleWeekdaysSchema,
      v.description('The day within the week to reoccur on'),
    ),
  }),
  v.metadata({ ref: 'ByNWeekday' }),
)

export type ByNWeekday = v.InferOutput<typeof ByNWeekdaySchema>

export const ByNWeekdayResponseSchema = v.pipe(
  v.object({
    n: v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description('The week to reoccur on (1-5, where 5 represents the last week)'),
    ),
    day: v.pipe(
      RecurrenceRuleWeekdaysSchema,
      v.description('The day within the week to reoccur on'),
    ),
  }),
  v.metadata({ ref: 'ByNWeekdayResponse' }),
)

export type ByNWeekdayResponse = v.InferOutput<typeof ByNWeekdayResponseSchema>

export const ChannelFollowerResponseSchema = v.pipe(
  v.object({ channel_id: SnowflakeTypeSchema, webhook_id: SnowflakeTypeSchema }),
  v.metadata({ ref: 'ChannelFollowerResponse' }),
)

export type ChannelFollowerResponse = v.InferOutput<typeof ChannelFollowerResponseSchema>

export const WebhookSourceGuildResponseSchema = v.pipe(
  v.object({ id: SnowflakeTypeSchema, icon: v.nullable(v.string()), name: v.string() }),
  v.metadata({ ref: 'WebhookSourceGuildResponse' }),
)

export type WebhookSourceGuildResponse = v.InferOutput<typeof WebhookSourceGuildResponseSchema>

export const WebhookSourceChannelResponseSchema = v.pipe(
  v.object({ id: SnowflakeTypeSchema, name: v.string() }),
  v.metadata({ ref: 'WebhookSourceChannelResponse' }),
)

export type WebhookSourceChannelResponse = v.InferOutput<typeof WebhookSourceChannelResponseSchema>

export const ChannelFollowerWebhookResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ChannelFollowerWebhookResponse' }),
)

export type ChannelFollowerWebhookResponse = v.InferOutput<
  typeof ChannelFollowerWebhookResponseSchema
>

export const ChannelPermissionOverwriteRequestSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: v.optional(v.union([v.null(), ChannelPermissionOverwritesSchema])),
    allow: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
    deny: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
  }),
  v.metadata({ ref: 'ChannelPermissionOverwriteRequest' }),
)

export type ChannelPermissionOverwriteRequest = v.InferOutput<
  typeof ChannelPermissionOverwriteRequestSchema
>

export const ChannelSelectComponentForModalRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ChannelSelectComponentForModalRequest' }),
)

export type ChannelSelectComponentForModalRequest = v.InferOutput<
  typeof ChannelSelectComponentForModalRequestSchema
>

export const CheckboxComponentForModalRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'CheckboxComponentForModalRequest' }),
)

export type CheckboxComponentForModalRequest = v.InferOutput<
  typeof CheckboxComponentForModalRequestSchema
>

export const CheckboxGroupOptionForRequestSchema = v.pipe(
  v.object({
    label: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    value: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
    default: v.optional(v.nullable(v.boolean())),
  }),
  v.metadata({ ref: 'CheckboxGroupOptionForRequest' }),
)

export type CheckboxGroupOptionForRequest = v.InferOutput<
  typeof CheckboxGroupOptionForRequestSchema
>

export const CheckboxGroupComponentForModalRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'CheckboxGroupComponentForModalRequest' }),
)

export type CheckboxGroupComponentForModalRequest = v.InferOutput<
  typeof CheckboxGroupComponentForModalRequestSchema
>

export const CommandPermissionResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: ApplicationCommandPermissionTypeSchema,
    permission: v.boolean(),
  }),
  v.metadata({ ref: 'CommandPermissionResponse' }),
)

export type CommandPermissionResponse = v.InferOutput<typeof CommandPermissionResponseSchema>

export const CommandPermissionsResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    application_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
    permissions: v.array(CommandPermissionResponseSchema),
  }),
  v.metadata({ ref: 'CommandPermissionsResponse' }),
)

export type CommandPermissionsResponse = v.InferOutput<typeof CommandPermissionsResponseSchema>

export const ConnectedAccountGuildResponseSchema = v.pipe(
  v.object({ id: SnowflakeTypeSchema, name: v.string(), icon: v.nullable(v.string()) }),
  v.metadata({ ref: 'ConnectedAccountGuildResponse' }),
)

export type ConnectedAccountGuildResponse = v.InferOutput<
  typeof ConnectedAccountGuildResponseSchema
>

export const IntegrationTypesSchema = v.pipe(
  v.union([
    v.literal('discord'),
    v.literal('twitch'),
    v.literal('youtube'),
    v.literal('guild_subscription'),
  ]),
  v.metadata({ ref: 'IntegrationTypes' }),
)

export type IntegrationTypes = v.InferOutput<typeof IntegrationTypesSchema>

export const ConnectedAccountIntegrationResponseSchema = v.pipe(
  v.object({
    id: v.string(),
    type: IntegrationTypesSchema,
    account: AccountResponseSchema,
    guild: ConnectedAccountGuildResponseSchema,
  }),
  v.metadata({ ref: 'ConnectedAccountIntegrationResponse' }),
)

export type ConnectedAccountIntegrationResponse = v.InferOutput<
  typeof ConnectedAccountIntegrationResponseSchema
>

export const ConnectedAccountProvidersSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'ConnectedAccountProviders' }),
)

export type ConnectedAccountProviders = v.InferOutput<typeof ConnectedAccountProvidersSchema>

export const ConnectedAccountVisibilitySchema = v.pipe(
  v.union([v.literal(0), v.literal(1)]),
  v.metadata({ ref: 'ConnectedAccountVisibility' }),
)

export type ConnectedAccountVisibility = v.InferOutput<typeof ConnectedAccountVisibilitySchema>

export const ConnectedAccountResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ConnectedAccountResponse' }),
)

export type ConnectedAccountResponse = v.InferOutput<typeof ConnectedAccountResponseSchema>

export const EntitlementOwnerTypesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(1), v.description('A guild subscription')),
    v.pipe(v.literal(2), v.description('A user subscription')),
  ]),
  v.metadata({ ref: 'EntitlementOwnerTypes' }),
)

export type EntitlementOwnerTypes = v.InferOutput<typeof EntitlementOwnerTypesSchema>

export const CreateEntitlementRequestDataSchema = v.pipe(
  v.object({
    sku_id: v.pipe(SnowflakeTypeSchema, v.description('ID of the SKU to grant the entitlement to')),
    owner_id: v.pipe(
      SnowflakeTypeSchema,
      v.description('ID of the guild or user to grant the entitlement to'),
    ),
    owner_type: v.pipe(
      EntitlementOwnerTypesSchema,
      v.description('1 for a guild subscription, 2 for a user subscription'),
    ),
  }),
  v.metadata({ ref: 'CreateEntitlementRequestData' }),
)

export type CreateEntitlementRequestData = v.InferOutput<typeof CreateEntitlementRequestDataSchema>

export const CreateForumThreadRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'CreateForumThreadRequest' }),
)

export type CreateForumThreadRequest = v.InferOutput<typeof CreateForumThreadRequestSchema>

export const CreateGroupDMInviteRequestSchema = v.pipe(
  v.partial(
    v.object({
      max_age: v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(2592000))),
    }),
  ),
  v.metadata({ ref: 'CreateGroupDMInviteRequest' }),
)

export type CreateGroupDMInviteRequest = v.InferOutput<typeof CreateGroupDMInviteRequestSchema>

export const UpdateDefaultReactionEmojiRequestSchema = v.pipe(
  v.partial(
    v.object({
      emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
      emoji_name: v.nullable(v.pipe(v.string(), v.maxCodePoints(100))),
    }),
  ),
  v.metadata({ ref: 'UpdateDefaultReactionEmojiRequest' }),
)

export type UpdateDefaultReactionEmojiRequest = v.InferOutput<
  typeof UpdateDefaultReactionEmojiRequestSchema
>

export const CreateOrUpdateThreadTagRequestSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(50)),
    emoji_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
    emoji_name: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
    moderated: v.optional(v.nullable(v.boolean())),
  }),
  v.metadata({ ref: 'CreateOrUpdateThreadTagRequest' }),
)

export type CreateOrUpdateThreadTagRequest = v.InferOutput<
  typeof CreateOrUpdateThreadTagRequestSchema
>

export const CreateGuildChannelRequestSchema = v.pipe(
  v.object({
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
    default_reaction_emoji: v.optional(
      v.union([v.null(), UpdateDefaultReactionEmojiRequestSchema]),
    ),
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
  }),
  v.metadata({ ref: 'CreateGuildChannelRequest' }),
)

export type CreateGuildChannelRequest = v.InferOutput<typeof CreateGuildChannelRequestSchema>

export const InviteTargetTypesSchema = v.pipe(
  v.union([v.literal(1), v.literal(2), v.literal(3)]),
  v.metadata({ ref: 'InviteTargetTypes' }),
)

export type InviteTargetTypes = v.InferOutput<typeof InviteTargetTypesSchema>

export const CreateGuildInviteRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'CreateGuildInviteRequest' }),
)

export type CreateGuildInviteRequest = v.InferOutput<typeof CreateGuildInviteRequestSchema>

export const IncomingWebhookInteractionRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'IncomingWebhookInteractionRequest' }),
)

export type IncomingWebhookInteractionRequest = v.InferOutput<
  typeof IncomingWebhookInteractionRequestSchema
>

export const CreateMessageInteractionCallbackRequestSchema = v.pipe(
  v.object({
    type: InteractionCallbackTypesSchema,
    data: v.optional(v.union([v.null(), IncomingWebhookInteractionRequestSchema])),
  }),
  v.metadata({ ref: 'CreateMessageInteractionCallbackRequest' }),
)

export type CreateMessageInteractionCallbackRequest = v.InferOutput<
  typeof CreateMessageInteractionCallbackRequestSchema
>

export const MessageReactionCountDetailsResponseSchema = v.pipe(
  v.object({
    burst: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    normal: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  }),
  v.metadata({ ref: 'MessageReactionCountDetailsResponse' }),
)

export type MessageReactionCountDetailsResponse = v.InferOutput<
  typeof MessageReactionCountDetailsResponseSchema
>

export const MessageReactionResponseSchema = v.pipe(
  v.object({
    emoji: MessageReactionEmojiResponseSchema,
    count: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    count_details: MessageReactionCountDetailsResponseSchema,
    burst_colors: v.array(v.string()),
    me_burst: v.boolean(),
    me: v.boolean(),
  }),
  v.metadata({ ref: 'MessageReactionResponse' }),
)

export type MessageReactionResponse = v.InferOutput<typeof MessageReactionResponseSchema>

export const MessageResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'MessageResponse' }),
)

export type MessageResponse = v.InferOutput<typeof MessageResponseSchema>

export const CreateMessageInteractionCallbackResponseSchema = v.pipe(
  v.object({ type: InteractionCallbackTypesSchema, message: MessageResponseSchema }),
  v.metadata({ ref: 'CreateMessageInteractionCallbackResponse' }),
)

export type CreateMessageInteractionCallbackResponse = v.InferOutput<
  typeof CreateMessageInteractionCallbackResponseSchema
>

export const CreatePrivateChannelRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'CreatePrivateChannelRequest' }),
)

export type CreatePrivateChannelRequest = v.InferOutput<typeof CreatePrivateChannelRequestSchema>

export const RoleColorsSchema = v.pipe(
  v.partial(
    v.object({
      primary_color: v.nullable(
        v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215)),
      ),
      secondary_color: v.nullable(
        v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215)),
      ),
      tertiary_color: v.nullable(
        v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215)),
      ),
    }),
  ),
  v.metadata({ ref: 'RoleColors' }),
)

export type RoleColors = v.InferOutput<typeof RoleColorsSchema>

export const CreateRoleRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'CreateRoleRequest' }),
)

export type CreateRoleRequest = v.InferOutput<typeof CreateRoleRequestSchema>

export const CreateTextThreadWithMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'CreateTextThreadWithMessageRequest' }),
)

export type CreateTextThreadWithMessageRequest = v.InferOutput<
  typeof CreateTextThreadWithMessageRequestSchema
>

export const CreateTextThreadWithoutMessageRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'CreateTextThreadWithoutMessageRequest' }),
)

export type CreateTextThreadWithoutMessageRequest = v.InferOutput<
  typeof CreateTextThreadWithoutMessageRequestSchema
>

export const CreatedThreadResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'CreatedThreadResponse' }),
)

export type CreatedThreadResponse = v.InferOutput<typeof CreatedThreadResponseSchema>

export const DefaultKeywordListTriggerMetadataSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'DefaultKeywordListTriggerMetadata' }),
)

export type DefaultKeywordListTriggerMetadata = v.InferOutput<
  typeof DefaultKeywordListTriggerMetadataSchema
>

export const DefaultKeywordListTriggerMetadataResponseSchema = v.pipe(
  v.object({
    allow_list: v.array(v.string()),
    presets: v.pipe(
      v.array(AutomodKeywordPresetTypeSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
  }),
  v.metadata({ ref: 'DefaultKeywordListTriggerMetadataResponse' }),
)

export type DefaultKeywordListTriggerMetadataResponse = v.InferOutput<
  typeof DefaultKeywordListTriggerMetadataResponseSchema
>

export const FlagToChannelActionMetadataSchema = v.pipe(
  v.object({ channel_id: SnowflakeTypeSchema }),
  v.metadata({ ref: 'FlagToChannelActionMetadata' }),
)

export type FlagToChannelActionMetadata = v.InferOutput<typeof FlagToChannelActionMetadataSchema>

export const FlagToChannelActionSchema = v.pipe(
  v.object({ type: AutomodActionTypeSchema, metadata: FlagToChannelActionMetadataSchema }),
  v.metadata({ ref: 'FlagToChannelAction' }),
)

export type FlagToChannelAction = v.InferOutput<typeof FlagToChannelActionSchema>

export const QuarantineUserActionMetadataSchema = v.pipe(
  v.partial(v.object({})),
  v.metadata({ ref: 'QuarantineUserActionMetadata' }),
)

export type QuarantineUserActionMetadata = v.InferOutput<typeof QuarantineUserActionMetadataSchema>

export const QuarantineUserActionSchema = v.pipe(
  v.object({
    type: AutomodActionTypeSchema,
    metadata: v.optional(v.union([v.null(), QuarantineUserActionMetadataSchema])),
  }),
  v.metadata({ ref: 'QuarantineUserAction' }),
)

export type QuarantineUserAction = v.InferOutput<typeof QuarantineUserActionSchema>

export const UserCommunicationDisabledActionMetadataSchema = v.pipe(
  v.partial(
    v.object({
      duration_seconds: v.nullable(
        v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(2419200)),
      ),
    }),
  ),
  v.metadata({ ref: 'UserCommunicationDisabledActionMetadata' }),
)

export type UserCommunicationDisabledActionMetadata = v.InferOutput<
  typeof UserCommunicationDisabledActionMetadataSchema
>

export const UserCommunicationDisabledActionSchema = v.pipe(
  v.object({
    type: AutomodActionTypeSchema,
    metadata: UserCommunicationDisabledActionMetadataSchema,
  }),
  v.metadata({ ref: 'UserCommunicationDisabledAction' }),
)

export type UserCommunicationDisabledAction = v.InferOutput<
  typeof UserCommunicationDisabledActionSchema
>

export const DefaultKeywordListUpsertRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'DefaultKeywordListUpsertRequest' }),
)

export type DefaultKeywordListUpsertRequest = v.InferOutput<
  typeof DefaultKeywordListUpsertRequestSchema
>

export const DefaultKeywordListUpsertRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'DefaultKeywordListUpsertRequestPartial' }),
)

export type DefaultKeywordListUpsertRequestPartial = v.InferOutput<
  typeof DefaultKeywordListUpsertRequestPartialSchema
>

export const FlagToChannelActionMetadataResponseSchema = v.pipe(
  v.object({ channel_id: SnowflakeTypeSchema }),
  v.metadata({ ref: 'FlagToChannelActionMetadataResponse' }),
)

export type FlagToChannelActionMetadataResponse = v.InferOutput<
  typeof FlagToChannelActionMetadataResponseSchema
>

export const FlagToChannelActionResponseSchema = v.pipe(
  v.object({ type: AutomodActionTypeSchema, metadata: FlagToChannelActionMetadataResponseSchema }),
  v.metadata({ ref: 'FlagToChannelActionResponse' }),
)

export type FlagToChannelActionResponse = v.InferOutput<typeof FlagToChannelActionResponseSchema>

export const QuarantineUserActionMetadataResponseSchema = v.pipe(
  v.partial(v.object({})),
  v.metadata({ ref: 'QuarantineUserActionMetadataResponse' }),
)

export type QuarantineUserActionMetadataResponse = v.InferOutput<
  typeof QuarantineUserActionMetadataResponseSchema
>

export const QuarantineUserActionResponseSchema = v.pipe(
  v.object({ type: AutomodActionTypeSchema, metadata: QuarantineUserActionMetadataResponseSchema }),
  v.metadata({ ref: 'QuarantineUserActionResponse' }),
)

export type QuarantineUserActionResponse = v.InferOutput<typeof QuarantineUserActionResponseSchema>

export const UserCommunicationDisabledActionMetadataResponseSchema = v.pipe(
  v.object({
    duration_seconds: v.pipe(
      v.number(),
      v.integer(),
      v.minValue(-2147483648),
      v.maxValue(2147483647),
    ),
  }),
  v.metadata({ ref: 'UserCommunicationDisabledActionMetadataResponse' }),
)

export type UserCommunicationDisabledActionMetadataResponse = v.InferOutput<
  typeof UserCommunicationDisabledActionMetadataResponseSchema
>

export const UserCommunicationDisabledActionResponseSchema = v.pipe(
  v.object({
    type: AutomodActionTypeSchema,
    metadata: UserCommunicationDisabledActionMetadataResponseSchema,
  }),
  v.metadata({ ref: 'UserCommunicationDisabledActionResponse' }),
)

export type UserCommunicationDisabledActionResponse = v.InferOutput<
  typeof UserCommunicationDisabledActionResponseSchema
>

export const DefaultKeywordRuleResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'DefaultKeywordRuleResponse' }),
)

export type DefaultKeywordRuleResponse = v.InferOutput<typeof DefaultKeywordRuleResponseSchema>

export const IntegrationApplicationResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'IntegrationApplicationResponse' }),
)

export type IntegrationApplicationResponse = v.InferOutput<
  typeof IntegrationApplicationResponseSchema
>

export const DiscordIntegrationResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'DiscordIntegrationResponse' }),
)

export type DiscordIntegrationResponse = v.InferOutput<typeof DiscordIntegrationResponseSchema>

export const EmbeddedActivityLocationKindSchema = v.pipe(
  v.union([
    v.pipe(v.literal('gc'), v.description('guild channel')),
    v.pipe(v.literal('pc'), v.description('private channel')),
    v.pipe(v.literal('party'), v.description('party')),
  ]),
  v.metadata({ ref: 'EmbeddedActivityLocationKind' }),
)

export type EmbeddedActivityLocationKind = v.InferOutput<typeof EmbeddedActivityLocationKindSchema>

export const GuildChannelLocationSchema = v.pipe(
  v.object({
    id: v.string(),
    kind: EmbeddedActivityLocationKindSchema,
    channel_id: SnowflakeTypeSchema,
    guild_id: SnowflakeTypeSchema,
  }),
  v.metadata({ ref: 'GuildChannelLocation' }),
)

export type GuildChannelLocation = v.InferOutput<typeof GuildChannelLocationSchema>

export const PrivateChannelLocationSchema = v.pipe(
  v.object({
    id: v.string(),
    kind: EmbeddedActivityLocationKindSchema,
    channel_id: SnowflakeTypeSchema,
  }),
  v.metadata({ ref: 'PrivateChannelLocation' }),
)

export type PrivateChannelLocation = v.InferOutput<typeof PrivateChannelLocationSchema>

export const EmbeddedActivityInstanceSchema = v.pipe(
  v.object({
    application_id: SnowflakeTypeSchema,
    instance_id: v.string(),
    launch_id: v.string(),
    location: v.union([GuildChannelLocationSchema, PrivateChannelLocationSchema]),
    users: v.array(SnowflakeTypeSchema),
  }),
  v.metadata({ ref: 'EmbeddedActivityInstance' }),
)

export type EmbeddedActivityInstance = v.InferOutput<typeof EmbeddedActivityInstanceSchema>

export const EmojiResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    name: v.string(),
    user: v.optional(UserResponseSchema),
    roles: v.array(SnowflakeTypeSchema),
    require_colons: v.boolean(),
    managed: v.boolean(),
    animated: v.boolean(),
    available: v.boolean(),
  }),
  v.metadata({ ref: 'EmojiResponse' }),
)

export type EmojiResponse = v.InferOutput<typeof EmojiResponseSchema>

export const EntitlementTypesSchema = v.pipe(
  v.union([v.literal(8), v.literal(10)]),
  v.metadata({ ref: 'EntitlementTypes' }),
)

export type EntitlementTypes = v.InferOutput<typeof EntitlementTypesSchema>

export const EntitlementTenantFulfillmentStatusResponseSchema = v.pipe(
  v.union([
    v.literal(0),
    v.literal(1),
    v.literal(2),
    v.literal(3),
    v.literal(4),
    v.literal(5),
    v.literal(6),
    v.literal(7),
  ]),
  v.metadata({ ref: 'EntitlementTenantFulfillmentStatusResponse' }),
)

export type EntitlementTenantFulfillmentStatusResponse = v.InferOutput<
  typeof EntitlementTenantFulfillmentStatusResponseSchema
>

export const EntitlementResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'EntitlementResponse' }),
)

export type EntitlementResponse = v.InferOutput<typeof EntitlementResponseSchema>

export const EntityMetadataExternalSchema = v.pipe(
  v.object({ location: v.pipe(v.string(), v.maxCodePoints(100)) }),
  v.metadata({ ref: 'EntityMetadataExternal' }),
)

export type EntityMetadataExternal = v.InferOutput<typeof EntityMetadataExternalSchema>

export const EntityMetadataExternalResponseSchema = v.pipe(
  v.object({ location: v.pipe(v.string(), v.description('Location of the external event')) }),
  v.metadata({ ref: 'EntityMetadataExternalResponse' }),
)

export type EntityMetadataExternalResponse = v.InferOutput<
  typeof EntityMetadataExternalResponseSchema
>

export const EntityMetadataStageInstanceSchema = v.pipe(
  v.partial(v.object({})),
  v.metadata({ ref: 'EntityMetadataStageInstance' }),
)

export type EntityMetadataStageInstance = v.InferOutput<typeof EntityMetadataStageInstanceSchema>

export const EntityMetadataStageInstanceResponseSchema = v.pipe(
  v.partial(v.object({})),
  v.metadata({ ref: 'EntityMetadataStageInstanceResponse' }),
)

export type EntityMetadataStageInstanceResponse = v.InferOutput<
  typeof EntityMetadataStageInstanceResponseSchema
>

export const EntityMetadataVoiceSchema = v.pipe(
  v.partial(v.object({})),
  v.metadata({ ref: 'EntityMetadataVoice' }),
)

export type EntityMetadataVoice = v.InferOutput<typeof EntityMetadataVoiceSchema>

export const EntityMetadataVoiceResponseSchema = v.pipe(
  v.partial(v.object({})),
  v.metadata({ ref: 'EntityMetadataVoiceResponse' }),
)

export type EntityMetadataVoiceResponse = v.InferOutput<typeof EntityMetadataVoiceResponseSchema>

export const IntegrationExpireBehaviorTypesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('Remove role')),
    v.pipe(v.literal(1), v.description('Kick')),
  ]),
  v.metadata({ ref: 'IntegrationExpireBehaviorTypes' }),
)

export type IntegrationExpireBehaviorTypes = v.InferOutput<
  typeof IntegrationExpireBehaviorTypesSchema
>

export const IntegrationExpireGracePeriodTypesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(1), v.description('1 day')),
    v.pipe(v.literal(3), v.description('3 days')),
    v.pipe(v.literal(7), v.description('7 days')),
    v.pipe(v.literal(14), v.description('14 days')),
    v.pipe(v.literal(30), v.description('30 days')),
  ]),
  v.metadata({ ref: 'IntegrationExpireGracePeriodTypes' }),
)

export type IntegrationExpireGracePeriodTypes = v.InferOutput<
  typeof IntegrationExpireGracePeriodTypesSchema
>

export const ExternalConnectionIntegrationResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ExternalConnectionIntegrationResponse' }),
)

export type ExternalConnectionIntegrationResponse = v.InferOutput<
  typeof ExternalConnectionIntegrationResponseSchema
>

export const GuildScheduledEventPrivacyLevelsSchema = v.pipe(
  v.union([
    v.pipe(v.literal(2), v.description('the scheduled event is only accessible to guild members')),
  ]),
  v.metadata({ ref: 'GuildScheduledEventPrivacyLevels' }),
)

export type GuildScheduledEventPrivacyLevels = v.InferOutput<
  typeof GuildScheduledEventPrivacyLevelsSchema
>

export const GuildScheduledEventEntityTypesSchema = v.pipe(
  v.union([v.literal(0), v.literal(1), v.literal(2), v.literal(3)]),
  v.metadata({ ref: 'GuildScheduledEventEntityTypes' }),
)

export type GuildScheduledEventEntityTypes = v.InferOutput<
  typeof GuildScheduledEventEntityTypesSchema
>

export const RecurrenceRuleFrequenciesSchema = v.pipe(
  v.union([v.literal(3), v.literal(2), v.literal(1), v.literal(0)]),
  v.metadata({ ref: 'RecurrenceRuleFrequencies' }),
)

export type RecurrenceRuleFrequencies = v.InferOutput<typeof RecurrenceRuleFrequenciesSchema>

export const RecurrenceRuleMonthsSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'RecurrenceRuleMonths' }),
)

export type RecurrenceRuleMonths = v.InferOutput<typeof RecurrenceRuleMonthsSchema>

export const RecurrenceRuleSchema = v.pipe(
  v.object({
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
        v.nullable(
          v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        ),
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
        v.nullable(
          v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        ),
        v.description('Total number of times the event is allowed to recur'),
      ),
    ),
  }),
  v.metadata({ ref: 'RecurrenceRule' }),
)

export type RecurrenceRule = v.InferOutput<typeof RecurrenceRuleSchema>

export const ExternalScheduledEventCreateRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ExternalScheduledEventCreateRequest' }),
)

export type ExternalScheduledEventCreateRequest = v.InferOutput<
  typeof ExternalScheduledEventCreateRequestSchema
>

export const GuildScheduledEventStatusesSchema = v.pipe(
  v.union([v.literal(1), v.literal(2), v.literal(3), v.literal(4)]),
  v.metadata({ ref: 'GuildScheduledEventStatuses' }),
)

export type GuildScheduledEventStatuses = v.InferOutput<typeof GuildScheduledEventStatusesSchema>

export const ExternalScheduledEventPatchRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'ExternalScheduledEventPatchRequestPartial' }),
)

export type ExternalScheduledEventPatchRequestPartial = v.InferOutput<
  typeof ExternalScheduledEventPatchRequestPartialSchema
>

export const RecurrenceRuleResponseSchema = v.pipe(
  v.object({
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
            v.array(
              v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
            ),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        v.description('Set of days within a year to recur on (1-364)'),
      ),
    ),
    count: v.optional(
      v.pipe(
        v.nullable(
          v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        ),
        v.description('Total number of times the event is allowed to recur'),
      ),
    ),
  }),
  v.metadata({ ref: 'RecurrenceRuleResponse' }),
)

export type RecurrenceRuleResponse = v.InferOutput<typeof RecurrenceRuleResponseSchema>

export const GuildScheduledEventUserResponsesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('User is not interested in the event')),
    v.pipe(v.literal(1), v.description('User is interested in the event')),
  ]),
  v.metadata({ ref: 'GuildScheduledEventUserResponses' }),
)

export type GuildScheduledEventUserResponses = v.InferOutput<
  typeof GuildScheduledEventUserResponsesSchema
>

export const ScheduledEventUserResponseSchema = v.pipe(
  v.object({
    guild_scheduled_event_id: v.pipe(
      SnowflakeTypeSchema,
      v.description('ID of the scheduled event'),
    ),
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
  }),
  v.metadata({ ref: 'ScheduledEventUserResponse' }),
)

export type ScheduledEventUserResponse = v.InferOutput<typeof ScheduledEventUserResponseSchema>

export const GuildScheduledEventExceptionResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildScheduledEventExceptionResponse' }),
)

export type GuildScheduledEventExceptionResponse = v.InferOutput<
  typeof GuildScheduledEventExceptionResponseSchema
>

export const ExternalScheduledEventResponseSchema = v.pipe(
  v.object({
    id: v.pipe(SnowflakeTypeSchema, v.description('ID of the scheduled event')),
    guild_id: v.pipe(
      SnowflakeTypeSchema,
      v.description('ID of the guild the scheduled event belongs to'),
    ),
    name: v.pipe(v.string(), v.description('Name of the scheduled event')),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('Description of the scheduled event'),
    ),
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
    status: v.pipe(
      GuildScheduledEventStatusesSchema,
      v.description('Status of the scheduled event'),
    ),
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
  }),
  v.metadata({ ref: 'ExternalScheduledEventResponse' }),
)

export type ExternalScheduledEventResponse = v.InferOutput<
  typeof ExternalScheduledEventResponseSchema
>

export const FileUploadComponentForModalRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'FileUploadComponentForModalRequest' }),
)

export type FileUploadComponentForModalRequest = v.InferOutput<
  typeof FileUploadComponentForModalRequestSchema
>

export const InviteTypesSchema = v.pipe(
  v.union([v.literal(0), v.literal(1), v.literal(2)]),
  v.metadata({ ref: 'InviteTypes' }),
)

export type InviteTypes = v.InferOutput<typeof InviteTypesSchema>

export const InviteChannelRecipientResponseSchema = v.pipe(
  v.object({ id: SnowflakeTypeSchema, username: v.string(), avatar: v.nullable(v.string()) }),
  v.metadata({ ref: 'InviteChannelRecipientResponse' }),
)

export type InviteChannelRecipientResponse = v.InferOutput<
  typeof InviteChannelRecipientResponseSchema
>

export const InviteChannelResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: ChannelTypesSchema,
    name: v.nullable(v.string()),
    icon: v.optional(v.string()),
    nsfw: v.optional(v.boolean()),
    recipients: v.optional(v.array(InviteChannelRecipientResponseSchema)),
  }),
  v.metadata({ ref: 'InviteChannelResponse' }),
)

export type InviteChannelResponse = v.InferOutput<typeof InviteChannelResponseSchema>

export const FriendInviteResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'FriendInviteResponse' }),
)

export type FriendInviteResponse = v.InferOutput<typeof FriendInviteResponseSchema>

export const GatewayBotSessionStartLimitResponseSchema = v.pipe(
  v.object({
    max_concurrency: v.pipe(
      v.number(),
      v.integer(),
      v.minValue(-2147483648),
      v.maxValue(2147483647),
    ),
    remaining: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    reset_after: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    total: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  }),
  v.metadata({ ref: 'GatewayBotSessionStartLimitResponse' }),
)

export type GatewayBotSessionStartLimitResponse = v.InferOutput<
  typeof GatewayBotSessionStartLimitResponseSchema
>

export const GatewayBotResponseSchema = v.pipe(
  v.object({
    url: v.pipe(v.string(), v.url()),
    session_start_limit: GatewayBotSessionStartLimitResponseSchema,
    shards: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  }),
  v.metadata({ ref: 'GatewayBotResponse' }),
)

export type GatewayBotResponse = v.InferOutput<typeof GatewayBotResponseSchema>

export const GatewayResponseSchema = v.pipe(
  v.object({ url: v.pipe(v.string(), v.url()) }),
  v.metadata({ ref: 'GatewayResponse' }),
)

export type GatewayResponse = v.InferOutput<typeof GatewayResponseSchema>

export const GithubAuthorSchema = v.pipe(
  v.object({
    username: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
    name: v.pipe(v.string(), v.maxCodePoints(152133)),
  }),
  v.metadata({ ref: 'GithubAuthor' }),
)

export type GithubAuthor = v.InferOutput<typeof GithubAuthorSchema>

export const GithubCheckAppSchema = v.pipe(
  v.object({ name: v.pipe(v.string(), v.maxCodePoints(152133)) }),
  v.metadata({ ref: 'GithubCheckApp' }),
)

export type GithubCheckApp = v.InferOutput<typeof GithubCheckAppSchema>

export const GithubCheckPullRequestSchema = v.pipe(
  v.object({ number: v.pipe(v.number(), v.integer()) }),
  v.metadata({ ref: 'GithubCheckPullRequest' }),
)

export type GithubCheckPullRequest = v.InferOutput<typeof GithubCheckPullRequestSchema>

export const GithubCheckSuiteSchema = v.pipe(
  v.object({
    conclusion: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
    head_branch: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
    head_sha: v.pipe(v.string(), v.maxCodePoints(152133)),
    pull_requests: v.optional(
      v.nullable(v.pipe(v.array(GithubCheckPullRequestSchema), v.maxLength(1521))),
    ),
    app: GithubCheckAppSchema,
  }),
  v.metadata({ ref: 'GithubCheckSuite' }),
)

export type GithubCheckSuite = v.InferOutput<typeof GithubCheckSuiteSchema>

export const GithubCheckRunOutputSchema = v.pipe(
  v.partial(
    v.object({
      title: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
      summary: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
    }),
  ),
  v.metadata({ ref: 'GithubCheckRunOutput' }),
)

export type GithubCheckRunOutput = v.InferOutput<typeof GithubCheckRunOutputSchema>

export const GithubCheckRunSchema = v.pipe(
  v.object({
    conclusion: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
    name: v.pipe(v.string(), v.maxCodePoints(152133)),
    html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
    check_suite: GithubCheckSuiteSchema,
    details_url: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048)))),
    output: v.optional(v.union([v.null(), GithubCheckRunOutputSchema])),
    pull_requests: v.optional(
      v.nullable(v.pipe(v.array(GithubCheckPullRequestSchema), v.maxLength(1521))),
    ),
  }),
  v.metadata({ ref: 'GithubCheckRun' }),
)

export type GithubCheckRun = v.InferOutput<typeof GithubCheckRunSchema>

export const GithubUserSchema = v.pipe(
  v.object({
    id: v.pipe(v.number(), v.integer()),
    login: v.pipe(v.string(), v.maxCodePoints(152133)),
    html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
    avatar_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
  }),
  v.metadata({ ref: 'GithubUser' }),
)

export type GithubUser = v.InferOutput<typeof GithubUserSchema>

export const GithubCommentSchema = v.pipe(
  v.object({
    id: v.pipe(v.number(), v.integer()),
    html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
    user: GithubUserSchema,
    commit_id: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
    body: v.pipe(v.string(), v.maxCodePoints(152133)),
  }),
  v.metadata({ ref: 'GithubComment' }),
)

export type GithubComment = v.InferOutput<typeof GithubCommentSchema>

export const GithubCommitSchema = v.pipe(
  v.object({
    id: v.pipe(v.string(), v.maxCodePoints(152133)),
    url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
    message: v.pipe(v.string(), v.maxCodePoints(152133)),
    author: GithubAuthorSchema,
  }),
  v.metadata({ ref: 'GithubCommit' }),
)

export type GithubCommit = v.InferOutput<typeof GithubCommitSchema>

export const GithubDiscussionSchema = v.pipe(
  v.object({
    title: v.pipe(v.string(), v.maxCodePoints(152133)),
    number: v.pipe(v.number(), v.integer()),
    html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
    answer_html_url: v.optional(v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048)))),
    body: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
    user: GithubUserSchema,
  }),
  v.metadata({ ref: 'GithubDiscussion' }),
)

export type GithubDiscussion = v.InferOutput<typeof GithubDiscussionSchema>

export const GithubIssueSchema = v.pipe(
  v.object({
    id: v.pipe(v.number(), v.integer()),
    number: v.pipe(v.number(), v.integer()),
    html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
    user: GithubUserSchema,
    title: v.pipe(v.string(), v.maxCodePoints(152133)),
    body: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
    pull_request: v.optional(v.any()),
  }),
  v.metadata({ ref: 'GithubIssue' }),
)

export type GithubIssue = v.InferOutput<typeof GithubIssueSchema>

export const GithubReleaseSchema = v.pipe(
  v.object({
    id: v.pipe(v.number(), v.integer()),
    tag_name: v.pipe(v.string(), v.maxCodePoints(152133)),
    html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
    author: GithubUserSchema,
  }),
  v.metadata({ ref: 'GithubRelease' }),
)

export type GithubRelease = v.InferOutput<typeof GithubReleaseSchema>

export const GithubRepositorySchema = v.pipe(
  v.object({
    id: v.pipe(v.number(), v.integer()),
    html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
    name: v.pipe(v.string(), v.maxCodePoints(152133)),
    full_name: v.pipe(v.string(), v.maxCodePoints(152133)),
  }),
  v.metadata({ ref: 'GithubRepository' }),
)

export type GithubRepository = v.InferOutput<typeof GithubRepositorySchema>

export const GithubReviewSchema = v.pipe(
  v.object({
    user: GithubUserSchema,
    body: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
    html_url: v.pipe(v.string(), v.url(), v.maxCodePoints(2048)),
    state: v.pipe(v.string(), v.maxCodePoints(152133)),
  }),
  v.metadata({ ref: 'GithubReview' }),
)

export type GithubReview = v.InferOutput<typeof GithubReviewSchema>

export const GithubWebhookSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GithubWebhook' }),
)

export type GithubWebhook = v.InferOutput<typeof GithubWebhookSchema>

export const GroupDMInviteResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GroupDMInviteResponse' }),
)

export type GroupDMInviteResponse = v.InferOutput<typeof GroupDMInviteResponseSchema>

export const PartialDiscordIntegrationResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: IntegrationTypesSchema,
    name: v.nullable(v.string()),
    account: AccountResponseSchema,
    application_id: SnowflakeTypeSchema,
  }),
  v.metadata({ ref: 'PartialDiscordIntegrationResponse' }),
)

export type PartialDiscordIntegrationResponse = v.InferOutput<
  typeof PartialDiscordIntegrationResponseSchema
>

export const PartialExternalConnectionIntegrationResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: IntegrationTypesSchema,
    name: v.nullable(v.string()),
    account: AccountResponseSchema,
  }),
  v.metadata({ ref: 'PartialExternalConnectionIntegrationResponse' }),
)

export type PartialExternalConnectionIntegrationResponse = v.InferOutput<
  typeof PartialExternalConnectionIntegrationResponseSchema
>

export const PartialGuildSubscriptionIntegrationResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: IntegrationTypesSchema,
    name: v.nullable(v.string()),
    account: AccountResponseSchema,
  }),
  v.metadata({ ref: 'PartialGuildSubscriptionIntegrationResponse' }),
)

export type PartialGuildSubscriptionIntegrationResponse = v.InferOutput<
  typeof PartialGuildSubscriptionIntegrationResponseSchema
>

export const GuildIncomingWebhookResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildIncomingWebhookResponse' }),
)

export type GuildIncomingWebhookResponse = v.InferOutput<typeof GuildIncomingWebhookResponseSchema>

export const StageScheduledEventResponseSchema = v.pipe(
  v.object({
    id: v.pipe(SnowflakeTypeSchema, v.description('ID of the scheduled event')),
    guild_id: v.pipe(
      SnowflakeTypeSchema,
      v.description('ID of the guild the scheduled event belongs to'),
    ),
    name: v.pipe(v.string(), v.description('Name of the scheduled event')),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('Description of the scheduled event'),
    ),
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
    status: v.pipe(
      GuildScheduledEventStatusesSchema,
      v.description('Status of the scheduled event'),
    ),
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
  }),
  v.metadata({ ref: 'StageScheduledEventResponse' }),
)

export type StageScheduledEventResponse = v.InferOutput<typeof StageScheduledEventResponseSchema>

export const VoiceScheduledEventResponseSchema = v.pipe(
  v.object({
    id: v.pipe(SnowflakeTypeSchema, v.description('ID of the scheduled event')),
    guild_id: v.pipe(
      SnowflakeTypeSchema,
      v.description('ID of the guild the scheduled event belongs to'),
    ),
    name: v.pipe(v.string(), v.description('Name of the scheduled event')),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('Description of the scheduled event'),
    ),
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
    status: v.pipe(
      GuildScheduledEventStatusesSchema,
      v.description('Status of the scheduled event'),
    ),
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
  }),
  v.metadata({ ref: 'VoiceScheduledEventResponse' }),
)

export type VoiceScheduledEventResponse = v.InferOutput<typeof VoiceScheduledEventResponseSchema>

export const KeywordTriggerMetadataResponseSchema = v.pipe(
  v.object({
    keyword_filter: v.array(v.string()),
    regex_patterns: v.array(v.string()),
    allow_list: v.array(v.string()),
  }),
  v.metadata({ ref: 'KeywordTriggerMetadataResponse' }),
)

export type KeywordTriggerMetadataResponse = v.InferOutput<
  typeof KeywordTriggerMetadataResponseSchema
>

export const KeywordRuleResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'KeywordRuleResponse' }),
)

export type KeywordRuleResponse = v.InferOutput<typeof KeywordRuleResponseSchema>

export const MLSpamTriggerMetadataResponseSchema = v.pipe(
  v.partial(v.object({})),
  v.metadata({ ref: 'MLSpamTriggerMetadataResponse' }),
)

export type MLSpamTriggerMetadataResponse = v.InferOutput<
  typeof MLSpamTriggerMetadataResponseSchema
>

export const MLSpamRuleResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'MLSpamRuleResponse' }),
)

export type MLSpamRuleResponse = v.InferOutput<typeof MLSpamRuleResponseSchema>

export const MentionSpamTriggerMetadataResponseSchema = v.pipe(
  v.object({
    mention_total_limit: v.pipe(
      v.number(),
      v.integer(),
      v.minValue(-2147483648),
      v.maxValue(2147483647),
    ),
    mention_raid_protection_enabled: v.boolean(),
  }),
  v.metadata({ ref: 'MentionSpamTriggerMetadataResponse' }),
)

export type MentionSpamTriggerMetadataResponse = v.InferOutput<
  typeof MentionSpamTriggerMetadataResponseSchema
>

export const MentionSpamRuleResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'MentionSpamRuleResponse' }),
)

export type MentionSpamRuleResponse = v.InferOutput<typeof MentionSpamRuleResponseSchema>

export const UserProfileMetadataResponseSchema = v.pipe(
  v.object({
    keyword_filter: v.array(v.string()),
    regex_patterns: v.array(v.string()),
    allow_list: v.array(v.string()),
  }),
  v.metadata({ ref: 'UserProfileMetadataResponse' }),
)

export type UserProfileMetadataResponse = v.InferOutput<typeof UserProfileMetadataResponseSchema>

export const UserProfileRuleResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'UserProfileRuleResponse' }),
)

export type UserProfileRuleResponse = v.InferOutput<typeof UserProfileRuleResponseSchema>

export const GuildAuditLogResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildAuditLogResponse' }),
)

export type GuildAuditLogResponse = v.InferOutput<typeof GuildAuditLogResponseSchema>

export const GuildBanResponseSchema = v.pipe(
  v.object({ user: UserResponseSchema, reason: v.nullable(v.string()) }),
  v.metadata({ ref: 'GuildBanResponse' }),
)

export type GuildBanResponse = v.InferOutput<typeof GuildBanResponseSchema>

export const GuildExplicitContentFilterTypesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('media content will not be scanned')),
    v.pipe(
      v.literal(1),
      v.description('media content sent by members without roles will be scanned'),
    ),
    v.pipe(v.literal(2), v.description('media content sent by all members will be scanned')),
  ]),
  v.metadata({ ref: 'GuildExplicitContentFilterTypes' }),
)

export type GuildExplicitContentFilterTypes = v.InferOutput<
  typeof GuildExplicitContentFilterTypesSchema
>

export const GuildFeaturesSchema = v.pipe(
  v.union([
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
    v.pipe(
      v.literal('TICKETED_EVENTS_ENABLED'),
      v.description('guild has enabled ticketed events'),
    ),
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
  ]),
  v.metadata({ ref: 'GuildFeatures' }),
)

export type GuildFeatures = v.InferOutput<typeof GuildFeaturesSchema>

export const WelcomeMessageResponseSchema = v.pipe(
  v.object({ author_ids: v.array(SnowflakeTypeSchema), message: v.string() }),
  v.metadata({ ref: 'WelcomeMessageResponse' }),
)

export type WelcomeMessageResponse = v.InferOutput<typeof WelcomeMessageResponseSchema>

export const NewMemberActionTypeSchema = v.pipe(
  v.union([v.literal(0), v.literal(1)]),
  v.metadata({ ref: 'NewMemberActionType' }),
)

export type NewMemberActionType = v.InferOutput<typeof NewMemberActionTypeSchema>

export const SettingsEmojiResponseSchema = v.pipe(
  v.object({
    id: v.union([v.null(), SnowflakeTypeSchema]),
    name: v.nullable(v.string()),
    animated: v.boolean(),
  }),
  v.metadata({ ref: 'SettingsEmojiResponse' }),
)

export type SettingsEmojiResponse = v.InferOutput<typeof SettingsEmojiResponseSchema>

export const NewMemberActionResponseSchema = v.pipe(
  v.object({
    channel_id: SnowflakeTypeSchema,
    action_type: NewMemberActionTypeSchema,
    title: v.string(),
    description: v.string(),
    emoji: v.optional(SettingsEmojiResponseSchema),
    icon: v.optional(v.string()),
  }),
  v.metadata({ ref: 'NewMemberActionResponse' }),
)

export type NewMemberActionResponse = v.InferOutput<typeof NewMemberActionResponseSchema>

export const ResourceChannelResponseSchema = v.pipe(
  v.object({
    channel_id: SnowflakeTypeSchema,
    title: v.string(),
    emoji: v.optional(SettingsEmojiResponseSchema),
    icon: v.optional(v.string()),
    description: v.string(),
  }),
  v.metadata({ ref: 'ResourceChannelResponse' }),
)

export type ResourceChannelResponse = v.InferOutput<typeof ResourceChannelResponseSchema>

export const GuildHomeSettingsResponseSchema = v.pipe(
  v.object({
    guild_id: SnowflakeTypeSchema,
    enabled: v.boolean(),
    welcome_message: v.optional(WelcomeMessageResponseSchema),
    new_member_actions: v.array(NewMemberActionResponseSchema),
    resource_channels: v.array(ResourceChannelResponseSchema),
  }),
  v.metadata({ ref: 'GuildHomeSettingsResponse' }),
)

export type GuildHomeSettingsResponse = v.InferOutput<typeof GuildHomeSettingsResponseSchema>

export const GuildIncidentActionsRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'GuildIncidentActionsRequest' }),
)

export type GuildIncidentActionsRequest = v.InferOutput<typeof GuildIncidentActionsRequestSchema>

export const GuildIncidentsDataResponseSchema = v.pipe(
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
  }),
  v.metadata({ ref: 'GuildIncidentsDataResponse' }),
)

export type GuildIncidentsDataResponse = v.InferOutput<typeof GuildIncidentsDataResponseSchema>

export const VerificationLevelsSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('unrestricted')),
    v.pipe(v.literal(1), v.description('must have verified email on account')),
    v.pipe(v.literal(2), v.description('must be registered on Discord for longer than 5 minutes')),
    v.pipe(
      v.literal(3),
      v.description('must be a member of the server for longer than 10 minutes'),
    ),
    v.pipe(v.literal(4), v.description('must have a verified phone number')),
  ]),
  v.metadata({ ref: 'VerificationLevels' }),
)

export type VerificationLevels = v.InferOutput<typeof VerificationLevelsSchema>

export const GuildNSFWContentLevelSchema = v.pipe(
  v.union([v.literal(0), v.literal(1), v.literal(2), v.literal(3)]),
  v.metadata({ ref: 'GuildNSFWContentLevel' }),
)

export type GuildNSFWContentLevel = v.InferOutput<typeof GuildNSFWContentLevelSchema>

export const InviteGuildResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'InviteGuildResponse' }),
)

export type InviteGuildResponse = v.InferOutput<typeof InviteGuildResponseSchema>

export const InviteApplicationResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'InviteApplicationResponse' }),
)

export type InviteApplicationResponse = v.InferOutput<typeof InviteApplicationResponseSchema>

export const ScheduledEventResponseSchema = v.pipe(
  v.object({
    id: v.pipe(SnowflakeTypeSchema, v.description('ID of the scheduled event')),
    guild_id: v.pipe(
      SnowflakeTypeSchema,
      v.description('ID of the guild the scheduled event belongs to'),
    ),
    name: v.pipe(v.string(), v.description('Name of the scheduled event')),
    description: v.pipe(
      v.nullable(v.string()),
      v.description('Description of the scheduled event'),
    ),
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
    status: v.pipe(
      GuildScheduledEventStatusesSchema,
      v.description('Status of the scheduled event'),
    ),
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
  }),
  v.metadata({ ref: 'ScheduledEventResponse' }),
)

export type ScheduledEventResponse = v.InferOutput<typeof ScheduledEventResponseSchema>

export const InviteGuildRoleResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    name: v.string(),
    position: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    color: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    colors: GuildRoleColorsResponseSchema,
    icon: v.nullable(v.string()),
    unicode_emoji: v.nullable(v.string()),
    permissions: v.optional(v.string()),
  }),
  v.metadata({ ref: 'InviteGuildRoleResponse' }),
)

export type InviteGuildRoleResponse = v.InferOutput<typeof InviteGuildRoleResponseSchema>

export const GuildInviteResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildInviteResponse' }),
)

export type GuildInviteResponse = v.InferOutput<typeof GuildInviteResponseSchema>

export const GuildJoinRequestApplicationStatusSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'GuildJoinRequestApplicationStatus' }),
)

export type GuildJoinRequestApplicationStatus = v.InferOutput<
  typeof GuildJoinRequestApplicationStatusSchema
>

export const GuildMemberVerificationFormFieldTypeSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'GuildMemberVerificationFormFieldType' }),
)

export type GuildMemberVerificationFormFieldType = v.InferOutput<
  typeof GuildMemberVerificationFormFieldTypeSchema
>

export const MultipleChoiceFormFieldResponseSchema = v.pipe(
  v.object({
    field_type: v.pipe(
      GuildMemberVerificationFormFieldTypeSchema,
      v.description('Type of form field'),
    ),
    label: v.optional(v.pipe(v.string(), v.description('Label shown above field'))),
    description: v.optional(
      v.pipe(v.string(), v.description('Optional helper text shown below label')),
    ),
    required: v.optional(
      v.pipe(v.boolean(), v.description('Whether applicant must fill in field')),
    ),
    choices: v.pipe(v.array(v.string()), v.description('Choices applicant can select from')),
    response: v.optional(
      v.pipe(
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        v.description('Index of choice selected by applicant'),
      ),
    ),
  }),
  v.metadata({ ref: 'MultipleChoiceFormFieldResponse' }),
)

export type MultipleChoiceFormFieldResponse = v.InferOutput<
  typeof MultipleChoiceFormFieldResponseSchema
>

export const ParagraphFormFieldResponseSchema = v.pipe(
  v.object({
    field_type: v.pipe(
      GuildMemberVerificationFormFieldTypeSchema,
      v.description('Type of form field'),
    ),
    label: v.optional(v.pipe(v.string(), v.description('Label shown above field'))),
    description: v.optional(
      v.pipe(v.string(), v.description('Optional helper text shown below label')),
    ),
    required: v.optional(
      v.pipe(v.boolean(), v.description('Whether applicant must fill in field')),
    ),
    placeholder: v.optional(
      v.pipe(v.string(), v.description('Placeholder text shown in empty input')),
    ),
    response: v.optional(v.pipe(v.string(), v.description("Applicant's text response"))),
  }),
  v.metadata({ ref: 'ParagraphFormFieldResponse' }),
)

export type ParagraphFormFieldResponse = v.InferOutput<typeof ParagraphFormFieldResponseSchema>

export const TermsFormFieldResponseSchema = v.pipe(
  v.object({
    field_type: v.pipe(
      GuildMemberVerificationFormFieldTypeSchema,
      v.description('Type of form field'),
    ),
    label: v.optional(v.pipe(v.string(), v.description('Label shown above field'))),
    description: v.optional(
      v.pipe(v.string(), v.description('Optional helper text shown below label')),
    ),
    required: v.optional(
      v.pipe(v.boolean(), v.description('Whether applicant must fill in field')),
    ),
    values: v.pipe(v.array(v.string()), v.description('Terms applicant must acknowledge')),
    response: v.optional(v.pipe(v.boolean(), v.description('Whether applicant accepted terms'))),
  }),
  v.metadata({ ref: 'TermsFormFieldResponse' }),
)

export type TermsFormFieldResponse = v.InferOutput<typeof TermsFormFieldResponseSchema>

export const TextInputFormFieldResponseSchema = v.pipe(
  v.object({
    field_type: v.pipe(
      GuildMemberVerificationFormFieldTypeSchema,
      v.description('Type of form field'),
    ),
    label: v.optional(v.pipe(v.string(), v.description('Label shown above field'))),
    description: v.optional(
      v.pipe(v.string(), v.description('Optional helper text shown below label')),
    ),
    required: v.optional(
      v.pipe(v.boolean(), v.description('Whether applicant must fill in field')),
    ),
    placeholder: v.optional(
      v.pipe(v.string(), v.description('Placeholder text shown in empty input')),
    ),
    response: v.optional(v.pipe(v.string(), v.description("Applicant's text response"))),
  }),
  v.metadata({ ref: 'TextInputFormFieldResponse' }),
)

export type TextInputFormFieldResponse = v.InferOutput<typeof TextInputFormFieldResponseSchema>

export const GuildJoinRequestResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildJoinRequestResponse' }),
)

export type GuildJoinRequestResponse = v.InferOutput<typeof GuildJoinRequestResponseSchema>

export const GuildJoinRequestsListResponseSchema = v.pipe(
  v.partial(
    v.object({
      total: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      guild_join_requests: v.array(GuildJoinRequestResponseSchema),
    }),
  ),
  v.metadata({ ref: 'GuildJoinRequestsListResponse' }),
)

export type GuildJoinRequestsListResponse = v.InferOutput<
  typeof GuildJoinRequestsListResponseSchema
>

export const GuildMFALevelSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('Guild has no MFA/2FA requirement for moderation actions')),
    v.pipe(v.literal(1), v.description('Guild has a 2FA requirement for moderation actions')),
  ]),
  v.metadata({ ref: 'GuildMFALevel' }),
)

export type GuildMFALevel = v.InferOutput<typeof GuildMFALevelSchema>

export const GuildOnboardingModeSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('Only Default Channels considered in constraints')),
    v.pipe(
      v.literal(1),
      v.description('Default Channels and Onboarding Prompts considered in constraints'),
    ),
  ]),
  v.metadata({ ref: 'GuildOnboardingMode' }),
)

export type GuildOnboardingMode = v.InferOutput<typeof GuildOnboardingModeSchema>

export const OnboardingPromptOptionResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'OnboardingPromptOptionResponse' }),
)

export type OnboardingPromptOptionResponse = v.InferOutput<
  typeof OnboardingPromptOptionResponseSchema
>

export const OnboardingPromptTypeSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('Multiple choice options')),
    v.pipe(v.literal(1), v.description('Many options shown as a dropdown')),
  ]),
  v.metadata({ ref: 'OnboardingPromptType' }),
)

export type OnboardingPromptType = v.InferOutput<typeof OnboardingPromptTypeSchema>

export const OnboardingPromptResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    title: v.string(),
    options: v.array(OnboardingPromptOptionResponseSchema),
    single_select: v.boolean(),
    required: v.boolean(),
    in_onboarding: v.boolean(),
    type: OnboardingPromptTypeSchema,
  }),
  v.metadata({ ref: 'OnboardingPromptResponse' }),
)

export type OnboardingPromptResponse = v.InferOutput<typeof OnboardingPromptResponseSchema>

export const GuildOnboardingResponseSchema = v.pipe(
  v.object({
    guild_id: SnowflakeTypeSchema,
    prompts: v.array(OnboardingPromptResponseSchema),
    default_channel_ids: v.pipe(
      v.array(SnowflakeTypeSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
    enabled: v.boolean(),
    mode: GuildOnboardingModeSchema,
  }),
  v.metadata({ ref: 'GuildOnboardingResponse' }),
)

export type GuildOnboardingResponse = v.InferOutput<typeof GuildOnboardingResponseSchema>

export const UserNotificationSettingsSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'UserNotificationSettings' }),
)

export type UserNotificationSettings = v.InferOutput<typeof UserNotificationSettingsSchema>

export const GuildPatchRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'GuildPatchRequestPartial' }),
)

export type GuildPatchRequestPartial = v.InferOutput<typeof GuildPatchRequestPartialSchema>

export const GuildPreviewResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildPreviewResponse' }),
)

export type GuildPreviewResponse = v.InferOutput<typeof GuildPreviewResponseSchema>

export const GuildPruneResponseSchema = v.pipe(
  v.object({
    pruned: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    ),
  }),
  v.metadata({ ref: 'GuildPruneResponse' }),
)

export type GuildPruneResponse = v.InferOutput<typeof GuildPruneResponseSchema>

export const PremiumGuildTiersSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('Guild has not unlocked any Server Boost perks')),
    v.pipe(v.literal(1), v.description('Guild has unlocked Server Boost level 1 perks')),
    v.pipe(v.literal(2), v.description('Guild has unlocked Server Boost level 2 perks')),
    v.pipe(v.literal(3), v.description('Guild has unlocked Server Boost level 3 perks')),
  ]),
  v.metadata({ ref: 'PremiumGuildTiers' }),
)

export type PremiumGuildTiers = v.InferOutput<typeof PremiumGuildTiersSchema>

export const GuildResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildResponse' }),
)

export type GuildResponse = v.InferOutput<typeof GuildResponseSchema>

export const GuildScheduledEventExceptionCreateRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildScheduledEventExceptionCreateRequest' }),
)

export type GuildScheduledEventExceptionCreateRequest = v.InferOutput<
  typeof GuildScheduledEventExceptionCreateRequestSchema
>

export const GuildScheduledEventExceptionPatchRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'GuildScheduledEventExceptionPatchRequestPartial' }),
)

export type GuildScheduledEventExceptionPatchRequestPartial = v.InferOutput<
  typeof GuildScheduledEventExceptionPatchRequestPartialSchema
>

export const SearchMessageResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'SearchMessageResponse' }),
)

export type SearchMessageResponse = v.InferOutput<typeof SearchMessageResponseSchema>

export const GuildSearchResponseSchema = v.pipe(
  v.object({
    messages: v.array(v.array(SearchMessageResponseSchema)),
    doing_deep_historical_index: v.boolean(),
    total_results: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    threads: v.optional(v.nullable(v.array(ThreadResponseSchema))),
    members: v.optional(v.nullable(v.array(ThreadMemberResponseSchema))),
    documents_indexed: v.optional(
      v.nullable(v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647))),
    ),
  }),
  v.metadata({ ref: 'GuildSearchResponse' }),
)

export type GuildSearchResponse = v.InferOutput<typeof GuildSearchResponseSchema>

export const GuildSubscriptionIntegrationResponseSchema = v.pipe(
  v.object({
    type: IntegrationTypesSchema,
    name: v.nullable(v.string()),
    account: AccountResponseSchema,
    enabled: v.boolean(),
    id: SnowflakeTypeSchema,
  }),
  v.metadata({ ref: 'GuildSubscriptionIntegrationResponse' }),
)

export type GuildSubscriptionIntegrationResponse = v.InferOutput<
  typeof GuildSubscriptionIntegrationResponseSchema
>

export const GuildTemplateChannelTagsSchema = v.pipe(
  v.object({
    id: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    ),
    name: v.string(),
    emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
    emoji_name: v.nullable(v.string()),
    moderated: v.nullable(v.boolean()),
  }),
  v.metadata({ ref: 'GuildTemplateChannelTags' }),
)

export type GuildTemplateChannelTags = v.InferOutput<typeof GuildTemplateChannelTagsSchema>

export const GuildTemplateChannelResponseSchema = v.pipe(
  v.object({
    id: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    ),
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
  }),
  v.metadata({ ref: 'GuildTemplateChannelResponse' }),
)

export type GuildTemplateChannelResponse = v.InferOutput<typeof GuildTemplateChannelResponseSchema>

export const GuildTemplateRoleColorsResponseSchema = v.pipe(
  v.object({
    primary_color: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    secondary_color: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    ),
    tertiary_color: v.nullable(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    ),
  }),
  v.metadata({ ref: 'GuildTemplateRoleColorsResponse' }),
)

export type GuildTemplateRoleColorsResponse = v.InferOutput<
  typeof GuildTemplateRoleColorsResponseSchema
>

export const GuildTemplateRoleResponseSchema = v.pipe(
  v.object({
    id: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    name: v.string(),
    permissions: v.string(),
    color: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    colors: v.union([v.null(), GuildTemplateRoleColorsResponseSchema]),
    hoist: v.boolean(),
    mentionable: v.boolean(),
    icon: v.nullable(v.string()),
    unicode_emoji: v.nullable(v.string()),
  }),
  v.metadata({ ref: 'GuildTemplateRoleResponse' }),
)

export type GuildTemplateRoleResponse = v.InferOutput<typeof GuildTemplateRoleResponseSchema>

export const GuildTemplateSnapshotResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildTemplateSnapshotResponse' }),
)

export type GuildTemplateSnapshotResponse = v.InferOutput<
  typeof GuildTemplateSnapshotResponseSchema
>

export const GuildTemplateResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildTemplateResponse' }),
)

export type GuildTemplateResponse = v.InferOutput<typeof GuildTemplateResponseSchema>

export const GuildWelcomeChannelSchema = v.pipe(
  v.object({
    channel_id: SnowflakeTypeSchema,
    description: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(50)),
    emoji_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
    emoji_name: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
  }),
  v.metadata({ ref: 'GuildWelcomeChannel' }),
)

export type GuildWelcomeChannel = v.InferOutput<typeof GuildWelcomeChannelSchema>

export const GuildWelcomeScreenChannelResponseSchema = v.pipe(
  v.object({
    channel_id: SnowflakeTypeSchema,
    description: v.string(),
    emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
    emoji_name: v.nullable(v.string()),
  }),
  v.metadata({ ref: 'GuildWelcomeScreenChannelResponse' }),
)

export type GuildWelcomeScreenChannelResponse = v.InferOutput<
  typeof GuildWelcomeScreenChannelResponseSchema
>

export const GuildWelcomeScreenResponseSchema = v.pipe(
  v.object({
    description: v.nullable(v.string()),
    welcome_channels: v.array(GuildWelcomeScreenChannelResponseSchema),
  }),
  v.metadata({ ref: 'GuildWelcomeScreenResponse' }),
)

export type GuildWelcomeScreenResponse = v.InferOutput<typeof GuildWelcomeScreenResponseSchema>

export const GuildWithCountsResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'GuildWithCountsResponse' }),
)

export type GuildWithCountsResponse = v.InferOutput<typeof GuildWithCountsResponseSchema>

export const HasOptionSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'HasOption' }),
)

export type HasOption = v.InferOutput<typeof HasOptionSchema>

export const IncomingWebhookRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'IncomingWebhookRequestPartial' }),
)

export type IncomingWebhookRequestPartial = v.InferOutput<
  typeof IncomingWebhookRequestPartialSchema
>

export const IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'IncomingWebhookUpdateForInteractionCallbackRequestPartial' }),
)

export type IncomingWebhookUpdateForInteractionCallbackRequestPartial = v.InferOutput<
  typeof IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema
>

export const IncomingWebhookUpdateRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'IncomingWebhookUpdateRequestPartial' }),
)

export type IncomingWebhookUpdateRequestPartial = v.InferOutput<
  typeof IncomingWebhookUpdateRequestPartialSchema
>

export const InteractionResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    type: InteractionTypesSchema,
    activity_instance_id: v.optional(v.nullable(v.string())),
    response_message_id: v.optional(SnowflakeTypeSchema),
    response_message_loading: v.optional(v.boolean()),
    response_message_ephemeral: v.optional(v.boolean()),
    channel_id: v.optional(SnowflakeTypeSchema),
    guild_id: v.optional(SnowflakeTypeSchema),
  }),
  v.metadata({ ref: 'InteractionResponse' }),
)

export type InteractionResponse = v.InferOutput<typeof InteractionResponseSchema>

export const LaunchActivityInteractionCallbackResponseSchema = v.pipe(
  v.object({
    type: InteractionCallbackTypesSchema,
    activity_instance: ActivityInstanceCallbackResponseSchema,
  }),
  v.metadata({ ref: 'LaunchActivityInteractionCallbackResponse' }),
)

export type LaunchActivityInteractionCallbackResponse = v.InferOutput<
  typeof LaunchActivityInteractionCallbackResponseSchema
>

export const UpdateMessageInteractionCallbackResponseSchema = v.pipe(
  v.object({ type: InteractionCallbackTypesSchema, message: MessageResponseSchema }),
  v.metadata({ ref: 'UpdateMessageInteractionCallbackResponse' }),
)

export type UpdateMessageInteractionCallbackResponse = v.InferOutput<
  typeof UpdateMessageInteractionCallbackResponseSchema
>

export const InteractionCallbackResponseSchema = v.pipe(
  v.object({
    interaction: InteractionResponseSchema,
    resource: v.optional(
      v.union([
        CreateMessageInteractionCallbackResponseSchema,
        LaunchActivityInteractionCallbackResponseSchema,
        UpdateMessageInteractionCallbackResponseSchema,
      ]),
    ),
  }),
  v.metadata({ ref: 'InteractionCallbackResponse' }),
)

export type InteractionCallbackResponse = v.InferOutput<typeof InteractionCallbackResponseSchema>

export const KeywordTriggerMetadataSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'KeywordTriggerMetadata' }),
)

export type KeywordTriggerMetadata = v.InferOutput<typeof KeywordTriggerMetadataSchema>

export const KeywordUpsertRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'KeywordUpsertRequest' }),
)

export type KeywordUpsertRequest = v.InferOutput<typeof KeywordUpsertRequestSchema>

export const KeywordUpsertRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'KeywordUpsertRequestPartial' }),
)

export type KeywordUpsertRequestPartial = v.InferOutput<typeof KeywordUpsertRequestPartialSchema>

export const MentionableSelectComponentForModalRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'MentionableSelectComponentForModalRequest' }),
)

export type MentionableSelectComponentForModalRequest = v.InferOutput<
  typeof MentionableSelectComponentForModalRequestSchema
>

export const RadioGroupOptionForRequestSchema = v.pipe(
  v.object({
    label: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    value: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
    default: v.optional(v.nullable(v.boolean())),
  }),
  v.metadata({ ref: 'RadioGroupOptionForRequest' }),
)

export type RadioGroupOptionForRequest = v.InferOutput<typeof RadioGroupOptionForRequestSchema>

export const RadioGroupComponentForModalRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'RadioGroupComponentForModalRequest' }),
)

export type RadioGroupComponentForModalRequest = v.InferOutput<
  typeof RadioGroupComponentForModalRequestSchema
>

export const RoleSelectComponentForModalRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'RoleSelectComponentForModalRequest' }),
)

export type RoleSelectComponentForModalRequest = v.InferOutput<
  typeof RoleSelectComponentForModalRequestSchema
>

export const StringSelectComponentForModalRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'StringSelectComponentForModalRequest' }),
)

export type StringSelectComponentForModalRequest = v.InferOutput<
  typeof StringSelectComponentForModalRequestSchema
>

export const UserSelectComponentForModalRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'UserSelectComponentForModalRequest' }),
)

export type UserSelectComponentForModalRequest = v.InferOutput<
  typeof UserSelectComponentForModalRequestSchema
>

export const LabelComponentForModalRequestSchema = v.pipe(
  v.object({
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
    description: v.optional(
      v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
    ),
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
  }),
  v.metadata({ ref: 'LabelComponentForModalRequest' }),
)

export type LabelComponentForModalRequest = v.InferOutput<
  typeof LabelComponentForModalRequestSchema
>

export const LaunchActivityInteractionCallbackRequestSchema = v.pipe(
  v.object({ type: InteractionCallbackTypesSchema }),
  v.metadata({ ref: 'LaunchActivityInteractionCallbackRequest' }),
)

export type LaunchActivityInteractionCallbackRequest = v.InferOutput<
  typeof LaunchActivityInteractionCallbackRequestSchema
>

export const ListApplicationEmojisResponseSchema = v.pipe(
  v.object({ items: v.array(EmojiResponseSchema) }),
  v.metadata({ ref: 'ListApplicationEmojisResponse' }),
)

export type ListApplicationEmojisResponse = v.InferOutput<
  typeof ListApplicationEmojisResponseSchema
>

export const SoundboardSoundResponseSchema = v.pipe(
  v.object({
    name: v.string(),
    sound_id: SnowflakeTypeSchema,
    volume: v.number(),
    emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
    emoji_name: v.nullable(v.string()),
    guild_id: v.optional(SnowflakeTypeSchema),
    available: v.boolean(),
    user: v.optional(UserResponseSchema),
  }),
  v.metadata({ ref: 'SoundboardSoundResponse' }),
)

export type SoundboardSoundResponse = v.InferOutput<typeof SoundboardSoundResponseSchema>

export const ListGuildSoundboardSoundsResponseSchema = v.pipe(
  v.object({ items: v.array(SoundboardSoundResponseSchema) }),
  v.metadata({ ref: 'ListGuildSoundboardSoundsResponse' }),
)

export type ListGuildSoundboardSoundsResponse = v.InferOutput<
  typeof ListGuildSoundboardSoundsResponseSchema
>

export const LobbyGuildInviteResponseSchema = v.pipe(
  v.object({ code: v.string() }),
  v.metadata({ ref: 'LobbyGuildInviteResponse' }),
)

export type LobbyGuildInviteResponse = v.InferOutput<typeof LobbyGuildInviteResponseSchema>

export const LobbyMemberRequestSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    metadata: v.optional(
      v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024)))),
    ),
    flags: v.optional(v.union([v.null(), v.literal(1)])),
    additional_name: v.optional(
      v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80))),
    ),
  }),
  v.metadata({ ref: 'LobbyMemberRequest' }),
)

export type LobbyMemberRequest = v.InferOutput<typeof LobbyMemberRequestSchema>

export const LobbyMemberResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    metadata: v.nullable(v.record(v.string(), v.string())),
    flags: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    additional_name: v.optional(v.string()),
  }),
  v.metadata({ ref: 'LobbyMemberResponse' }),
)

export type LobbyMemberResponse = v.InferOutput<typeof LobbyMemberResponseSchema>

export const LobbyMessageResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'LobbyMessageResponse' }),
)

export type LobbyMessageResponse = v.InferOutput<typeof LobbyMessageResponseSchema>

export const LobbyResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    application_id: SnowflakeTypeSchema,
    metadata: v.nullable(v.record(v.string(), v.string())),
    members: v.array(LobbyMemberResponseSchema),
    linked_channel: v.optional(GuildChannelResponseSchema),
    flags: UInt32TypeSchema,
    override_event_webhooks_url: v.optional(v.nullable(v.string())),
  }),
  v.metadata({ ref: 'LobbyResponse' }),
)

export type LobbyResponse = v.InferOutput<typeof LobbyResponseSchema>

export const MLSpamTriggerMetadataSchema = v.pipe(
  v.partial(v.object({})),
  v.metadata({ ref: 'MLSpamTriggerMetadata' }),
)

export type MLSpamTriggerMetadata = v.InferOutput<typeof MLSpamTriggerMetadataSchema>

export const MLSpamUpsertRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'MLSpamUpsertRequest' }),
)

export type MLSpamUpsertRequest = v.InferOutput<typeof MLSpamUpsertRequestSchema>

export const MLSpamUpsertRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'MLSpamUpsertRequestPartial' }),
)

export type MLSpamUpsertRequestPartial = v.InferOutput<typeof MLSpamUpsertRequestPartialSchema>

export const MentionSpamTriggerMetadataSchema = v.pipe(
  v.partial(
    v.object({
      mention_total_limit: v.nullable(
        v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(50)),
      ),
      mention_raid_protection_enabled: v.nullable(v.boolean()),
    }),
  ),
  v.metadata({ ref: 'MentionSpamTriggerMetadata' }),
)

export type MentionSpamTriggerMetadata = v.InferOutput<typeof MentionSpamTriggerMetadataSchema>

export const MentionSpamUpsertRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'MentionSpamUpsertRequest' }),
)

export type MentionSpamUpsertRequest = v.InferOutput<typeof MentionSpamUpsertRequestSchema>

export const MentionSpamUpsertRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'MentionSpamUpsertRequestPartial' }),
)

export type MentionSpamUpsertRequestPartial = v.InferOutput<
  typeof MentionSpamUpsertRequestPartialSchema
>

export const MessageReferenceRequestSchema = v.pipe(
  v.object({
    guild_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
    channel_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
    message_id: SnowflakeTypeSchema,
    fail_if_not_exists: v.optional(v.nullable(v.boolean())),
    type: v.optional(v.union([v.null(), MessageReferenceTypeSchema])),
  }),
  v.metadata({ ref: 'MessageReferenceRequest' }),
)

export type MessageReferenceRequest = v.InferOutput<typeof MessageReferenceRequestSchema>

export const MessageCreateRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'MessageCreateRequest' }),
)

export type MessageCreateRequest = v.InferOutput<typeof MessageCreateRequestSchema>

export const MessageEditRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'MessageEditRequestPartial' }),
)

export type MessageEditRequestPartial = v.InferOutput<typeof MessageEditRequestPartialSchema>

export const TextDisplayComponentForModalRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'TextDisplayComponentForModalRequest' }),
)

export type TextDisplayComponentForModalRequest = v.InferOutput<
  typeof TextDisplayComponentForModalRequestSchema
>

export const ModalInteractionCallbackRequestDataSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ModalInteractionCallbackRequestData' }),
)

export type ModalInteractionCallbackRequestData = v.InferOutput<
  typeof ModalInteractionCallbackRequestDataSchema
>

export const ModalInteractionCallbackRequestSchema = v.pipe(
  v.object({
    type: InteractionCallbackTypesSchema,
    data: ModalInteractionCallbackRequestDataSchema,
  }),
  v.metadata({ ref: 'ModalInteractionCallbackRequest' }),
)

export type ModalInteractionCallbackRequest = v.InferOutput<
  typeof ModalInteractionCallbackRequestSchema
>

export const MyGuildResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'MyGuildResponse' }),
)

export type MyGuildResponse = v.InferOutput<typeof MyGuildResponseSchema>

export const OAuth2GetAuthorizationResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'OAuth2GetAuthorizationResponse' }),
)

export type OAuth2GetAuthorizationResponse = v.InferOutput<
  typeof OAuth2GetAuthorizationResponseSchema
>

export const OAuth2KeySchema = v.pipe(
  v.object({
    kty: v.string(),
    use: v.string(),
    kid: v.string(),
    n: v.string(),
    e: v.string(),
    alg: v.string(),
  }),
  v.metadata({ ref: 'OAuth2Key' }),
)

export type OAuth2Key = v.InferOutput<typeof OAuth2KeySchema>

export const OAuth2GetKeysSchema = v.pipe(
  v.object({ keys: v.array(OAuth2KeySchema) }),
  v.metadata({ ref: 'OAuth2GetKeys' }),
)

export type OAuth2GetKeys = v.InferOutput<typeof OAuth2GetKeysSchema>

export const OAuth2GetOpenIDConnectUserInfoResponseSchema = v.pipe(
  v.object({
    sub: v.string(),
    email: v.optional(v.nullable(v.string())),
    email_verified: v.optional(v.boolean()),
    preferred_username: v.optional(v.string()),
    nickname: v.optional(v.nullable(v.string())),
    picture: v.optional(v.string()),
    locale: v.optional(v.string()),
  }),
  v.metadata({ ref: 'OAuth2GetOpenIDConnectUserInfoResponse' }),
)

export type OAuth2GetOpenIDConnectUserInfoResponse = v.InferOutput<
  typeof OAuth2GetOpenIDConnectUserInfoResponseSchema
>

export const OnboardingPromptOptionRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'OnboardingPromptOptionRequest' }),
)

export type OnboardingPromptOptionRequest = v.InferOutput<
  typeof OnboardingPromptOptionRequestSchema
>

export const PermissionsResponseSchema = v.pipe(
  v.object({
    permissions: v.pipe(
      v.string(),
      v.description('The computed permissions, as a stringified bitfield'),
    ),
  }),
  v.metadata({ ref: 'PermissionsResponse' }),
)

export type PermissionsResponse = v.InferOutput<typeof PermissionsResponseSchema>

export const PinnedMessageResponseSchema = v.pipe(
  v.object({
    pinned_at: v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    message: MessageResponseSchema,
  }),
  v.metadata({ ref: 'PinnedMessageResponse' }),
)

export type PinnedMessageResponse = v.InferOutput<typeof PinnedMessageResponseSchema>

export const PinnedMessagesResponseSchema = v.pipe(
  v.object({ items: v.array(PinnedMessageResponseSchema), has_more: v.boolean() }),
  v.metadata({ ref: 'PinnedMessagesResponse' }),
)

export type PinnedMessagesResponse = v.InferOutput<typeof PinnedMessagesResponseSchema>

export const PollAnswerDetailsResponseSchema = v.pipe(
  v.object({ users: v.array(UserResponseSchema) }),
  v.metadata({ ref: 'PollAnswerDetailsResponse' }),
)

export type PollAnswerDetailsResponse = v.InferOutput<typeof PollAnswerDetailsResponseSchema>

export const PongInteractionCallbackRequestSchema = v.pipe(
  v.object({ type: InteractionCallbackTypesSchema }),
  v.metadata({ ref: 'PongInteractionCallbackRequest' }),
)

export type PongInteractionCallbackRequest = v.InferOutput<
  typeof PongInteractionCallbackRequestSchema
>

export const PremiumTypesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('None')),
    v.pipe(v.literal(1), v.description('Nitro Classic')),
    v.pipe(v.literal(2), v.description('Nitro Standard')),
    v.pipe(v.literal(3), v.description('Nitro Basic')),
  ]),
  v.metadata({ ref: 'PremiumTypes' }),
)

export type PremiumTypes = v.InferOutput<typeof PremiumTypesSchema>

export const TeamMembershipStatesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(1), v.description('User has been invited to the team.')),
    v.pipe(v.literal(2), v.description('User has accepted the team invitation.')),
  ]),
  v.metadata({ ref: 'TeamMembershipStates' }),
)

export type TeamMembershipStates = v.InferOutput<typeof TeamMembershipStatesSchema>

export const TeamMemberRolesSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'TeamMemberRoles' }),
)

export type TeamMemberRoles = v.InferOutput<typeof TeamMemberRolesSchema>

export const TeamMemberResponseSchema = v.pipe(
  v.object({
    user: UserResponseSchema,
    team_id: SnowflakeTypeSchema,
    membership_state: TeamMembershipStatesSchema,
    role: TeamMemberRolesSchema,
    permissions: v.array(v.string()),
  }),
  v.metadata({ ref: 'TeamMemberResponse' }),
)

export type TeamMemberResponse = v.InferOutput<typeof TeamMemberResponseSchema>

export const TeamResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    icon: v.nullable(v.string()),
    name: v.string(),
    owner_user_id: SnowflakeTypeSchema,
    members: v.array(TeamMemberResponseSchema),
  }),
  v.metadata({ ref: 'TeamResponse' }),
)

export type TeamResponse = v.InferOutput<typeof TeamResponseSchema>

export const PrivateApplicationResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'PrivateApplicationResponse' }),
)

export type PrivateApplicationResponse = v.InferOutput<typeof PrivateApplicationResponseSchema>

export const PrivateGuildMemberResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'PrivateGuildMemberResponse' }),
)

export type PrivateGuildMemberResponse = v.InferOutput<typeof PrivateGuildMemberResponseSchema>

export const ProvisionalTokenResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ProvisionalTokenResponse' }),
)

export type ProvisionalTokenResponse = v.InferOutput<typeof ProvisionalTokenResponseSchema>

export const PruneGuildRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'PruneGuildRequest' }),
)

export type PruneGuildRequest = v.InferOutput<typeof PruneGuildRequestSchema>

export const ReactionTypesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('Normal reaction type')),
    v.pipe(v.literal(1), v.description('Burst reaction type')),
  ]),
  v.metadata({ ref: 'ReactionTypes' }),
)

export type ReactionTypes = v.InferOutput<typeof ReactionTypesSchema>

export const SDKMessageRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'SDKMessageRequest' }),
)

export type SDKMessageRequest = v.InferOutput<typeof SDKMessageRequestSchema>

export const SKUIneligibilityReasonSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('Other / catch-all')),
    v.pipe(v.literal(1), v.description('User already owns this SKU or one of its components')),
    v.pipe(v.literal(2), v.description('User account is not on an eligible platform')),
  ]),
  v.metadata({ ref: 'SKUIneligibilityReason' }),
)

export type SKUIneligibilityReason = v.InferOutput<typeof SKUIneligibilityReasonSchema>

export const ScheduledEventUserCountResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'ScheduledEventUserCountResponse' }),
)

export type ScheduledEventUserCountResponse = v.InferOutput<
  typeof ScheduledEventUserCountResponseSchema
>

export const SearchIndexNotReadyResponseSchema = v.pipe(
  v.object({
    message: v.string(),
    code: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    documents_indexed: v.pipe(
      v.number(),
      v.integer(),
      v.minValue(-2147483648),
      v.maxValue(2147483647),
    ),
    retry_after: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  }),
  v.metadata({ ref: 'SearchIndexNotReadyResponse' }),
)

export type SearchIndexNotReadyResponse = v.InferOutput<typeof SearchIndexNotReadyResponseSchema>

export const SearchableEmbedTypeSchema = v.pipe(
  v.union([
    v.literal('image'),
    v.literal('video'),
    v.literal('gif'),
    v.literal('sound'),
    v.literal('article'),
  ]),
  v.metadata({ ref: 'SearchableEmbedType' }),
)

export type SearchableEmbedType = v.InferOutput<typeof SearchableEmbedTypeSchema>

export const WebhookSlackEmbedFieldSchema = v.pipe(
  v.partial(
    v.object({
      name: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
      value: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
      inline: v.nullable(v.boolean()),
    }),
  ),
  v.metadata({ ref: 'WebhookSlackEmbedField' }),
)

export type WebhookSlackEmbedField = v.InferOutput<typeof WebhookSlackEmbedFieldSchema>

export const WebhookSlackEmbedSchema = v.pipe(
  v.partial(
    v.object({
      title: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
      title_link: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
      text: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
      color: v.nullable(
        v.pipe(
          v.string(),
          v.regex(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/),
          v.maxCodePoints(7),
        ),
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
  ),
  v.metadata({ ref: 'WebhookSlackEmbed' }),
)

export type WebhookSlackEmbed = v.InferOutput<typeof WebhookSlackEmbedSchema>

export const SlackWebhookSchema = v.pipe(
  v.partial(
    v.object({
      text: v.nullable(v.pipe(v.string(), v.maxCodePoints(2000))),
      username: v.nullable(v.pipe(v.string(), v.maxCodePoints(152133))),
      icon_url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(2048))),
      attachments: v.nullable(v.pipe(v.array(WebhookSlackEmbedSchema), v.maxLength(1521))),
    }),
  ),
  v.metadata({ ref: 'SlackWebhook' }),
)

export type SlackWebhook = v.InferOutput<typeof SlackWebhookSchema>

export const SocialLayerSKUPurchaseEligibilityCallbackDataSchema = v.pipe(
  v.object({
    eligible: v.boolean(),
    ineligible_reason: v.optional(v.union([v.null(), SKUIneligibilityReasonSchema])),
    ineligible_reason_description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(255)))),
  }),
  v.metadata({ ref: 'SocialLayerSKUPurchaseEligibilityCallbackData' }),
)

export type SocialLayerSKUPurchaseEligibilityCallbackData = v.InferOutput<
  typeof SocialLayerSKUPurchaseEligibilityCallbackDataSchema
>

export const SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema = v.pipe(
  v.object({
    type: InteractionCallbackTypesSchema,
    data: SocialLayerSKUPurchaseEligibilityCallbackDataSchema,
  }),
  v.metadata({ ref: 'SocialLayerSKUPurchaseEligibilityInteractionCallbackRequest' }),
)

export type SocialLayerSKUPurchaseEligibilityInteractionCallbackRequest = v.InferOutput<
  typeof SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema
>

export const SortingModeSchema = v.pipe(
  v.union([v.literal('relevance'), v.literal('timestamp')]),
  v.metadata({ ref: 'SortingMode' }),
)

export type SortingMode = v.InferOutput<typeof SortingModeSchema>

export const SortingOrderSchema = v.pipe(
  v.union([v.literal('asc'), v.literal('desc')]),
  v.metadata({ ref: 'SortingOrder' }),
)

export type SortingOrder = v.InferOutput<typeof SortingOrderSchema>

export const SoundboardCreateRequestSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
    volume: v.optional(v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(1)))),
    emoji_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
    emoji_name: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32)))),
    sound: v.string(),
  }),
  v.metadata({ ref: 'SoundboardCreateRequest' }),
)

export type SoundboardCreateRequest = v.InferOutput<typeof SoundboardCreateRequestSchema>

export const SoundboardPatchRequestPartialSchema = v.pipe(
  v.partial(
    v.object({
      name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
      volume: v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(1))),
      emoji_id: v.union([v.null(), SnowflakeTypeSchema]),
      emoji_name: v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
    }),
  ),
  v.metadata({ ref: 'SoundboardPatchRequestPartial' }),
)

export type SoundboardPatchRequestPartial = v.InferOutput<
  typeof SoundboardPatchRequestPartialSchema
>

export const SoundboardSoundSendRequestSchema = v.pipe(
  v.object({
    sound_id: SnowflakeTypeSchema,
    source_guild_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  }),
  v.metadata({ ref: 'SoundboardSoundSendRequest' }),
)

export type SoundboardSoundSendRequest = v.InferOutput<typeof SoundboardSoundSendRequestSchema>

export const StageInstancesPrivacyLevelsSchema = v.pipe(
  v.union([
    v.pipe(v.literal(1), v.description('The Stage instance is visible publicly. (deprecated)')),
    v.pipe(v.literal(2), v.description('The Stage instance is visible to only guild members.')),
  ]),
  v.metadata({ ref: 'StageInstancesPrivacyLevels' }),
)

export type StageInstancesPrivacyLevels = v.InferOutput<typeof StageInstancesPrivacyLevelsSchema>

export const StageInstanceResponseSchema = v.pipe(
  v.object({
    guild_id: SnowflakeTypeSchema,
    channel_id: SnowflakeTypeSchema,
    topic: v.string(),
    privacy_level: StageInstancesPrivacyLevelsSchema,
    id: SnowflakeTypeSchema,
    discoverable_disabled: v.boolean(),
    guild_scheduled_event_id: v.union([v.null(), SnowflakeTypeSchema]),
  }),
  v.metadata({ ref: 'StageInstanceResponse' }),
)

export type StageInstanceResponse = v.InferOutput<typeof StageInstanceResponseSchema>

export const StageScheduledEventCreateRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'StageScheduledEventCreateRequest' }),
)

export type StageScheduledEventCreateRequest = v.InferOutput<
  typeof StageScheduledEventCreateRequestSchema
>

export const StageScheduledEventPatchRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'StageScheduledEventPatchRequestPartial' }),
)

export type StageScheduledEventPatchRequestPartial = v.InferOutput<
  typeof StageScheduledEventPatchRequestPartialSchema
>

export const StickerPackResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    sku_id: SnowflakeTypeSchema,
    name: v.string(),
    description: v.nullable(v.string()),
    stickers: v.array(StandardStickerResponseSchema),
    cover_sticker_id: v.optional(SnowflakeTypeSchema),
    banner_asset_id: v.optional(SnowflakeTypeSchema),
  }),
  v.metadata({ ref: 'StickerPackResponse' }),
)

export type StickerPackResponse = v.InferOutput<typeof StickerPackResponseSchema>

export const StickerPackCollectionResponseSchema = v.pipe(
  v.object({ sticker_packs: v.array(StickerPackResponseSchema) }),
  v.metadata({ ref: 'StickerPackCollectionResponse' }),
)

export type StickerPackCollectionResponse = v.InferOutput<
  typeof StickerPackCollectionResponseSchema
>

export const SubscriptionResponseStatusTypeSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('Subscription is active and scheduled to renew')),
    v.pipe(v.literal(1), v.description('Subscription is inactive and not being charged')),
    v.pipe(v.literal(2), v.description('Subscription is active but will not renew')),
  ]),
  v.metadata({ ref: 'SubscriptionResponseStatusType' }),
)

export type SubscriptionResponseStatusType = v.InferOutput<
  typeof SubscriptionResponseStatusTypeSchema
>

export const SubscriptionResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'SubscriptionResponse' }),
)

export type SubscriptionResponse = v.InferOutput<typeof SubscriptionResponseSchema>

export const TargetUsersJobStatusTypesSchema = v.pipe(
  v.union([
    v.pipe(v.literal(0), v.description('The default value.')),
    v.pipe(v.literal(1), v.description('The job is still being processed.')),
    v.pipe(v.literal(2), v.description('The job has been completed successfully.')),
    v.pipe(
      v.literal(3),
      v.description('The job has failed, see error_message field for more details.'),
    ),
  ]),
  v.metadata({ ref: 'TargetUsersJobStatusTypes' }),
)

export type TargetUsersJobStatusTypes = v.InferOutput<typeof TargetUsersJobStatusTypesSchema>

export const TargetUsersJobStatusResponseSchema = v.pipe(
  v.object({
    status: v.pipe(
      TargetUsersJobStatusTypesSchema,
      v.description('The status of the job processing the target users.'),
    ),
    total_users: v.pipe(
      UInt32TypeSchema,
      v.description('The total number of users in the provided list.'),
    ),
    processed_users: v.pipe(
      UInt32TypeSchema,
      v.description('The number of users processed so far.'),
    ),
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
  }),
  v.metadata({ ref: 'TargetUsersJobStatusResponse' }),
)

export type TargetUsersJobStatusResponse = v.InferOutput<typeof TargetUsersJobStatusResponseSchema>

export const ThreadSearchResponseSchema = v.pipe(
  v.object({
    threads: v.array(ThreadResponseSchema),
    members: v.array(ThreadMemberResponseSchema),
    has_more: v.boolean(),
    first_messages: v.optional(v.array(MessageResponseSchema)),
    total_results: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  }),
  v.metadata({ ref: 'ThreadSearchResponse' }),
)

export type ThreadSearchResponse = v.InferOutput<typeof ThreadSearchResponseSchema>

export const ThreadSortingModeSchema = v.pipe(
  v.union([
    v.literal('relevance'),
    v.literal('creation_time'),
    v.literal('last_message_time'),
    v.literal('archive_time'),
  ]),
  v.metadata({ ref: 'ThreadSortingMode' }),
)

export type ThreadSortingMode = v.InferOutput<typeof ThreadSortingModeSchema>

export const ThreadsResponseSchema = v.pipe(
  v.object({
    threads: v.array(ThreadResponseSchema),
    members: v.array(ThreadMemberResponseSchema),
    has_more: v.boolean(),
    first_messages: v.optional(v.array(MessageResponseSchema)),
  }),
  v.metadata({ ref: 'ThreadsResponse' }),
)

export type ThreadsResponse = v.InferOutput<typeof ThreadsResponseSchema>

export const TypingIndicatorResponseSchema = v.pipe(
  v.partial(v.object({})),
  v.metadata({ ref: 'TypingIndicatorResponse' }),
)

export type TypingIndicatorResponse = v.InferOutput<typeof TypingIndicatorResponseSchema>

export const UnbanUserFromGuildRequestSchema = v.pipe(
  v.partial(v.object({})),
  v.metadata({ ref: 'UnbanUserFromGuildRequest' }),
)

export type UnbanUserFromGuildRequest = v.InferOutput<typeof UnbanUserFromGuildRequestSchema>

export const UpdateApplicationUserRoleConnectionRequestSchema = v.pipe(
  v.partial(
    v.object({
      platform_name: v.nullable(v.pipe(v.string(), v.maxCodePoints(50))),
      platform_username: v.nullable(v.pipe(v.string(), v.maxCodePoints(100))),
      metadata: v.nullable(
        v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      ),
    }),
  ),
  v.metadata({ ref: 'UpdateApplicationUserRoleConnectionRequest' }),
)

export type UpdateApplicationUserRoleConnectionRequest = v.InferOutput<
  typeof UpdateApplicationUserRoleConnectionRequestSchema
>

export const UpdateDMRequestPartialSchema = v.pipe(
  v.partial(
    v.object({ name: v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(100))) }),
  ),
  v.metadata({ ref: 'UpdateDMRequestPartial' }),
)

export type UpdateDMRequestPartial = v.InferOutput<typeof UpdateDMRequestPartialSchema>

export const UpdateGroupDMRequestPartialSchema = v.pipe(
  v.partial(
    v.object({
      name: v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(100))),
      icon: v.nullable(v.string()),
    }),
  ),
  v.metadata({ ref: 'UpdateGroupDMRequestPartial' }),
)

export type UpdateGroupDMRequestPartial = v.InferOutput<typeof UpdateGroupDMRequestPartialSchema>

export const UpdateThreadTagRequestSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(50)),
    emoji_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
    emoji_name: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
    moderated: v.optional(v.nullable(v.boolean())),
    id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
  }),
  v.metadata({ ref: 'UpdateThreadTagRequest' }),
)

export type UpdateThreadTagRequest = v.InferOutput<typeof UpdateThreadTagRequestSchema>

export const UpdateGuildChannelRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'UpdateGuildChannelRequestPartial' }),
)

export type UpdateGuildChannelRequestPartial = v.InferOutput<
  typeof UpdateGuildChannelRequestPartialSchema
>

export const UpdateOnboardingPromptRequestSchema = v.pipe(
  v.object({
    title: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    options: v.pipe(v.array(OnboardingPromptOptionRequestSchema), v.minLength(1), v.maxLength(50)),
    single_select: v.optional(v.nullable(v.boolean())),
    required: v.optional(v.nullable(v.boolean())),
    in_onboarding: v.optional(v.nullable(v.boolean())),
    type: v.optional(v.union([v.null(), OnboardingPromptTypeSchema])),
    id: SnowflakeTypeSchema,
  }),
  v.metadata({ ref: 'UpdateOnboardingPromptRequest' }),
)

export type UpdateOnboardingPromptRequest = v.InferOutput<
  typeof UpdateOnboardingPromptRequestSchema
>

export const UpdateGuildOnboardingRequestSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'UpdateGuildOnboardingRequest' }),
)

export type UpdateGuildOnboardingRequest = v.InferOutput<typeof UpdateGuildOnboardingRequestSchema>

export const UpdateMessageInteractionCallbackRequestSchema = v.pipe(
  v.object({
    type: InteractionCallbackTypesSchema,
    data: v.optional(
      v.union([v.null(), IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema]),
    ),
  }),
  v.metadata({ ref: 'UpdateMessageInteractionCallbackRequest' }),
)

export type UpdateMessageInteractionCallbackRequest = v.InferOutput<
  typeof UpdateMessageInteractionCallbackRequestSchema
>

export const UpdateRolePositionsRequestSchema = v.pipe(
  v.partial(
    v.object({
      id: v.union([v.null(), SnowflakeTypeSchema]),
      position: v.nullable(
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      ),
    }),
  ),
  v.metadata({ ref: 'UpdateRolePositionsRequest' }),
)

export type UpdateRolePositionsRequest = v.InferOutput<typeof UpdateRolePositionsRequestSchema>

export const UpdateRoleRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'UpdateRoleRequestPartial' }),
)

export type UpdateRoleRequestPartial = v.InferOutput<typeof UpdateRoleRequestPartialSchema>

export const UpdateSelfVoiceStateRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'UpdateSelfVoiceStateRequestPartial' }),
)

export type UpdateSelfVoiceStateRequestPartial = v.InferOutput<
  typeof UpdateSelfVoiceStateRequestPartialSchema
>

export const UpdateThreadRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'UpdateThreadRequestPartial' }),
)

export type UpdateThreadRequestPartial = v.InferOutput<typeof UpdateThreadRequestPartialSchema>

export const UpdateVoiceStateRequestPartialSchema = v.pipe(
  v.partial(
    v.object({
      suppress: v.nullable(v.boolean()),
      channel_id: v.union([v.null(), SnowflakeTypeSchema]),
    }),
  ),
  v.metadata({ ref: 'UpdateVoiceStateRequestPartial' }),
)

export type UpdateVoiceStateRequestPartial = v.InferOutput<
  typeof UpdateVoiceStateRequestPartialSchema
>

export const UserGuildOnboardingResponseSchema = v.pipe(
  v.object({
    guild_id: SnowflakeTypeSchema,
    prompts: v.array(OnboardingPromptResponseSchema),
    default_channel_ids: v.pipe(
      v.array(SnowflakeTypeSchema),
      v.check((input) => new Set(input).size === input.length),
    ),
    enabled: v.boolean(),
    mode: GuildOnboardingModeSchema,
  }),
  v.metadata({ ref: 'UserGuildOnboardingResponse' }),
)

export type UserGuildOnboardingResponse = v.InferOutput<typeof UserGuildOnboardingResponseSchema>

export const UserPIIResponseSchema = v.pipe(
  v.object({
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
        v.nullable(
          v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
        ),
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
  }),
  v.metadata({ ref: 'UserPIIResponse' }),
)

export type UserPIIResponse = v.InferOutput<typeof UserPIIResponseSchema>

export const UserProfileMetadataSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'UserProfileMetadata' }),
)

export type UserProfileMetadata = v.InferOutput<typeof UserProfileMetadataSchema>

export const UserProfileUpsertRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'UserProfileUpsertRequest' }),
)

export type UserProfileUpsertRequest = v.InferOutput<typeof UserProfileUpsertRequestSchema>

export const UserProfileUpsertRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'UserProfileUpsertRequestPartial' }),
)

export type UserProfileUpsertRequestPartial = v.InferOutput<
  typeof UserProfileUpsertRequestPartialSchema
>

export const VanityURLErrorResponseSchema = v.pipe(
  v.object({
    message: v.string(),
    code: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  }),
  v.metadata({ ref: 'VanityURLErrorResponse' }),
)

export type VanityURLErrorResponse = v.InferOutput<typeof VanityURLErrorResponseSchema>

export const VanityURLResponseSchema = v.pipe(
  v.object({
    code: v.nullable(v.string()),
    uses: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    error: v.optional(v.union([v.null(), VanityURLErrorResponseSchema])),
  }),
  v.metadata({ ref: 'VanityURLResponse' }),
)

export type VanityURLResponse = v.InferOutput<typeof VanityURLResponseSchema>

export const VoiceRegionResponseSchema = v.pipe(
  v.object({
    id: v.string(),
    name: v.string(),
    custom: v.boolean(),
    deprecated: v.boolean(),
    optimal: v.boolean(),
  }),
  v.metadata({ ref: 'VoiceRegionResponse' }),
)

export type VoiceRegionResponse = v.InferOutput<typeof VoiceRegionResponseSchema>

export const VoiceScheduledEventCreateRequestSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'VoiceScheduledEventCreateRequest' }),
)

export type VoiceScheduledEventCreateRequest = v.InferOutput<
  typeof VoiceScheduledEventCreateRequestSchema
>

export const VoiceScheduledEventPatchRequestPartialSchema = v.pipe(
  v.partial(
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
  ),
  v.metadata({ ref: 'VoiceScheduledEventPatchRequestPartial' }),
)

export type VoiceScheduledEventPatchRequestPartial = v.InferOutput<
  typeof VoiceScheduledEventPatchRequestPartialSchema
>

export const VoiceStateResponseSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'VoiceStateResponse' }),
)

export type VoiceStateResponse = v.InferOutput<typeof VoiceStateResponseSchema>

export const WelcomeScreenPatchRequestPartialSchema = v.pipe(
  v.partial(
    v.object({
      description: v.nullable(v.pipe(v.string(), v.maxCodePoints(140))),
      welcome_channels: v.nullable(v.pipe(v.array(GuildWelcomeChannelSchema), v.maxLength(5))),
      enabled: v.nullable(v.boolean()),
    }),
  ),
  v.metadata({ ref: 'WelcomeScreenPatchRequestPartial' }),
)

export type WelcomeScreenPatchRequestPartial = v.InferOutput<
  typeof WelcomeScreenPatchRequestPartialSchema
>

export const WidgetActivitySchema = v.pipe(
  v.object({ name: v.string() }),
  v.metadata({ ref: 'WidgetActivity' }),
)

export type WidgetActivity = v.InferOutput<typeof WidgetActivitySchema>

export const WidgetChannelSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    name: v.string(),
    position: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
  }),
  v.metadata({ ref: 'WidgetChannel' }),
)

export type WidgetChannel = v.InferOutput<typeof WidgetChannelSchema>

export const WidgetImageStylesSchema = v.pipe(
  v.union([
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
  ]),
  v.metadata({ ref: 'WidgetImageStyles' }),
)

export type WidgetImageStyles = v.InferOutput<typeof WidgetImageStylesSchema>

export const WidgetUserDiscriminatorSchema = v.pipe(
  v.union([v.literal('0000')]),
  v.metadata({ ref: 'WidgetUserDiscriminator' }),
)

export type WidgetUserDiscriminator = v.InferOutput<typeof WidgetUserDiscriminatorSchema>

export const WidgetMemberSchema = v.pipe(
  v.object({
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
  }),
  v.metadata({ ref: 'WidgetMember' }),
)

export type WidgetMember = v.InferOutput<typeof WidgetMemberSchema>

export const WidgetResponseSchema = v.pipe(
  v.object({
    id: SnowflakeTypeSchema,
    name: v.string(),
    instant_invite: v.nullable(v.string()),
    channels: v.array(WidgetChannelSchema),
    members: v.array(WidgetMemberSchema),
    presence_count: v.pipe(
      v.number(),
      v.integer(),
      v.minValue(-2147483648),
      v.maxValue(2147483647),
    ),
  }),
  v.metadata({ ref: 'WidgetResponse' }),
)

export type WidgetResponse = v.InferOutput<typeof WidgetResponseSchema>

export const WidgetSettingsResponseSchema = v.pipe(
  v.object({ enabled: v.boolean(), channel_id: v.union([v.null(), SnowflakeTypeSchema]) }),
  v.metadata({ ref: 'WidgetSettingsResponse' }),
)

export type WidgetSettingsResponse = v.InferOutput<typeof WidgetSettingsResponseSchema>

export const ErrorSchema = v.pipe(
  v.pipe(
    v.object({
      code: v.pipe(
        v.pipe(v.number(), v.integer()),
        v.description('Discord internal error code. See error code reference'),
      ),
      message: v.pipe(v.string(), v.description('Human-readable error message')),
    }),
    v.description('A single error, either for an API response or a specific field.'),
  ),
  v.metadata({ ref: 'Error' }),
)

export type Error = v.InferOutput<typeof ErrorSchema>

export const InnerErrorsSchema = v.pipe(
  v.strictObject({
    _errors: v.pipe(v.array(ErrorSchema), v.description('The list of errors for this field')),
  }),
  v.metadata({ ref: 'InnerErrors' }),
)

export type InnerErrors = v.InferOutput<typeof InnerErrorsSchema>

type ErrorDetailsType =
  | { [key: string]: ErrorDetailsType }
  | v.InferOutput<typeof InnerErrorsSchema>

export const ErrorDetailsSchema: v.GenericSchema<ErrorDetailsType> = v.pipe(
  v.union([
    v.record(
      v.string(),
      v.lazy(() => ErrorDetailsSchema),
    ),
    InnerErrorsSchema,
  ]),
  v.metadata({ ref: 'ErrorDetails' }),
)

export type ErrorDetails = v.InferOutput<typeof ErrorDetailsSchema>

export const ErrorResponseSchema = v.pipe(
  v.pipe(
    v.intersect([ErrorSchema, v.partial(v.object({ errors: ErrorDetailsSchema }))]),
    v.description('Errors object returned by the Discord API'),
  ),
  v.metadata({ ref: 'ErrorResponse' }),
)

export type ErrorResponse = v.InferOutput<typeof ErrorResponseSchema>

export const RatelimitedResponseSchema = v.pipe(
  v.pipe(
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
  ),
  v.metadata({ ref: 'RatelimitedResponse' }),
)

export type RatelimitedResponse = v.InferOutput<typeof RatelimitedResponseSchema>

export const XRateLimitLimitHeaderSchema = resolver(v.pipe(v.number(), v.integer()))
export const XRateLimitRemainingHeaderSchema = resolver(v.pipe(v.number(), v.integer()))
export const XRateLimitResetHeaderSchema = resolver(v.number())
export const XRateLimitResetAfterHeaderSchema = resolver(v.number())
export const XRateLimitBucketHeaderSchema = resolver(v.string())

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
  content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
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
  content: { 'application/json': { schema: resolver(RatelimitedResponseSchema) } },
}
