import { resolver } from 'hono-openapi'
import { Schema, SchemaTransformation } from 'effect'

export const AccountResponseSchema = Schema.Struct({
  id: Schema.String,
  name: Schema.NullOr(Schema.String),
}).annotate({ identifier: 'AccountResponse' })

export type AccountResponse = Schema.Schema.Type<typeof AccountResponseSchema>

export const MessageComponentTypesSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: 'Container for other components' }),
  Schema.Literal(2).annotate({ description: 'Button object' }),
  Schema.Literal(3).annotate({ description: 'Select menu for picking from defined text options' }),
  Schema.Literal(4).annotate({ description: 'Text input object' }),
  Schema.Literal(5).annotate({ description: 'Select menu for users' }),
  Schema.Literal(6).annotate({ description: 'Select menu for roles' }),
  Schema.Literal(7).annotate({ description: 'Select menu for mentionables (users and roles)' }),
  Schema.Literal(8).annotate({ description: 'Select menu for channels' }),
  Schema.Literal(9).annotate({ description: 'Section component' }),
  Schema.Literal(10).annotate({ description: 'Text component' }),
  Schema.Literal(11).annotate({ description: 'Thumbnail component' }),
  Schema.Literal(12).annotate({ description: 'Media gallery component' }),
  Schema.Literal(13).annotate({ description: 'File component' }),
  Schema.Literal(14).annotate({ description: 'Separator component' }),
  Schema.Literal(17).annotate({ description: 'Container component' }),
  Schema.Literal(18).annotate({ description: 'Label component' }),
  Schema.Literal(19).annotate({ description: 'File upload component' }),
  Schema.Literal(21).annotate({ description: 'Radio group component' }),
  Schema.Literal(22).annotate({ description: 'Checkbox group component' }),
  Schema.Literal(23).annotate({ description: 'Checkbox component' }),
]).annotate({ identifier: 'MessageComponentTypes' })

export type MessageComponentTypes = Schema.Schema.Type<typeof MessageComponentTypesSchema>

export const ButtonStyleTypesSchema = Schema.Union([
  Schema.Literal(1),
  Schema.Literal(2),
  Schema.Literal(3),
  Schema.Literal(4),
  Schema.Literal(5),
  Schema.Literal(6),
]).annotate({ identifier: 'ButtonStyleTypes' })

export type ButtonStyleTypes = Schema.Schema.Type<typeof ButtonStyleTypesSchema>

export const SnowflakeTypeSchema = Schema.String.check(
  Schema.isPattern(/^(0|[1-9][0-9]*)$/),
).annotate({ identifier: 'SnowflakeType' })

export type SnowflakeType = Schema.Schema.Type<typeof SnowflakeTypeSchema>

export const ComponentEmojiForRequestSchema = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
}).annotate({ identifier: 'ComponentEmojiForRequest' })

export type ComponentEmojiForRequest = Schema.Schema.Type<typeof ComponentEmojiForRequestSchema>

export const ButtonComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  style: ButtonStyleTypesSchema,
  label: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 80, {
          expected: 'a string of at most 80 characters',
        }),
      ),
    ),
  ),
  disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 512, {
          expected: 'a string of at most 512 characters',
        }),
      ),
    ),
  ),
  sku_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  emoji: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ComponentEmojiForRequestSchema]),
  ),
}).annotate({ identifier: 'ButtonComponentForMessageRequest' })

export type ButtonComponentForMessageRequest = Schema.Schema.Type<
  typeof ButtonComponentForMessageRequestSchema
>

export const SnowflakeSelectDefaultValueTypesSchema = Schema.Union([
  Schema.Literal('user'),
  Schema.Literal('role'),
  Schema.Literal('channel'),
]).annotate({ identifier: 'SnowflakeSelectDefaultValueTypes' })

export type SnowflakeSelectDefaultValueTypes = Schema.Schema.Type<
  typeof SnowflakeSelectDefaultValueTypesSchema
>

export const ChannelSelectDefaultValueSchema = Schema.Struct({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
}).annotate({ identifier: 'ChannelSelectDefaultValue' })

export type ChannelSelectDefaultValue = Schema.Schema.Type<typeof ChannelSelectDefaultValueSchema>

export const ChannelTypesSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: 'A direct message between users' }),
  Schema.Literal(3).annotate({ description: 'A direct message between multiple users' }),
  Schema.Literal(0).annotate({ description: 'A text channel within a server' }),
  Schema.Literal(2).annotate({ description: 'A voice channel within a server' }),
  Schema.Literal(4).annotate({
    description: 'An organizational category that contains up to 50 channels',
  }),
  Schema.Literal(5).annotate({
    description:
      'A channel that users can follow and crosspost into their own server (formerly news channels)',
  }),
  Schema.Literal(10).annotate({
    description: 'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
  }),
  Schema.Literal(11).annotate({
    description:
      'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
  }),
  Schema.Literal(12).annotate({
    description:
      'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
  }),
  Schema.Literal(13).annotate({
    description: 'A voice channel for hosting events with an audience',
  }),
  Schema.Literal(14).annotate({
    description: 'The channel in a hub containing the listed servers',
  }),
  Schema.Literal(15).annotate({ description: 'Channel that can only contain threads' }),
]).annotate({ identifier: 'ChannelTypes' })

export type ChannelTypes = Schema.Schema.Type<typeof ChannelTypesSchema>

export const ChannelSelectComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 150, {
          expected: 'a string of at most 150 characters',
        }),
      ),
    ),
  ),
  min_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  max_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  default_values: Schema.optional(
    Schema.NullOr(Schema.Array(ChannelSelectDefaultValueSchema).check(Schema.isMaxLength(25))),
  ),
  channel_types: Schema.optional(
    Schema.NullOr(Schema.Array(ChannelTypesSchema).check(Schema.isUnique())),
  ),
}).annotate({ identifier: 'ChannelSelectComponentForMessageRequest' })

export type ChannelSelectComponentForMessageRequest = Schema.Schema.Type<
  typeof ChannelSelectComponentForMessageRequestSchema
>

export const RoleSelectDefaultValueSchema = Schema.Struct({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
}).annotate({ identifier: 'RoleSelectDefaultValue' })

export type RoleSelectDefaultValue = Schema.Schema.Type<typeof RoleSelectDefaultValueSchema>

export const UserSelectDefaultValueSchema = Schema.Struct({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
}).annotate({ identifier: 'UserSelectDefaultValue' })

export type UserSelectDefaultValue = Schema.Schema.Type<typeof UserSelectDefaultValueSchema>

export const MentionableSelectComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 150, {
          expected: 'a string of at most 150 characters',
        }),
      ),
    ),
  ),
  min_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  max_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  default_values: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([RoleSelectDefaultValueSchema, UserSelectDefaultValueSchema]),
      ).check(Schema.isMaxLength(25)),
    ),
  ),
}).annotate({ identifier: 'MentionableSelectComponentForMessageRequest' })

export type MentionableSelectComponentForMessageRequest = Schema.Schema.Type<
  typeof MentionableSelectComponentForMessageRequestSchema
>

export const RoleSelectComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 150, {
          expected: 'a string of at most 150 characters',
        }),
      ),
    ),
  ),
  min_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  max_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  default_values: Schema.optional(
    Schema.NullOr(Schema.Array(RoleSelectDefaultValueSchema).check(Schema.isMaxLength(25))),
  ),
}).annotate({ identifier: 'RoleSelectComponentForMessageRequest' })

export type RoleSelectComponentForMessageRequest = Schema.Schema.Type<
  typeof RoleSelectComponentForMessageRequestSchema
>

export const StringSelectOptionForRequestSchema = Schema.Struct({
  label: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  value: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  default: Schema.optional(Schema.NullOr(Schema.Boolean)),
  emoji: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ComponentEmojiForRequestSchema]),
  ),
}).annotate({ identifier: 'StringSelectOptionForRequest' })

export type StringSelectOptionForRequest = Schema.Schema.Type<
  typeof StringSelectOptionForRequestSchema
>

export const StringSelectComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 150, {
          expected: 'a string of at most 150 characters',
        }),
      ),
    ),
  ),
  min_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  max_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  options: Schema.Array(StringSelectOptionForRequestSchema).check(
    Schema.isMinLength(1),
    Schema.isMaxLength(25),
  ),
}).annotate({ identifier: 'StringSelectComponentForMessageRequest' })

export type StringSelectComponentForMessageRequest = Schema.Schema.Type<
  typeof StringSelectComponentForMessageRequestSchema
>

export const UserSelectComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 150, {
          expected: 'a string of at most 150 characters',
        }),
      ),
    ),
  ),
  min_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  max_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  default_values: Schema.optional(
    Schema.NullOr(Schema.Array(UserSelectDefaultValueSchema).check(Schema.isMaxLength(25))),
  ),
}).annotate({ identifier: 'UserSelectComponentForMessageRequest' })

export type UserSelectComponentForMessageRequest = Schema.Schema.Type<
  typeof UserSelectComponentForMessageRequestSchema
>

export const ActionRowComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  components: Schema.Array(
    Schema.Union([
      ButtonComponentForMessageRequestSchema,
      ChannelSelectComponentForMessageRequestSchema,
      MentionableSelectComponentForMessageRequestSchema,
      RoleSelectComponentForMessageRequestSchema,
      StringSelectComponentForMessageRequestSchema,
      UserSelectComponentForMessageRequestSchema,
    ]),
  ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
}).annotate({ identifier: 'ActionRowComponentForMessageRequest' })

export type ActionRowComponentForMessageRequest = Schema.Schema.Type<
  typeof ActionRowComponentForMessageRequestSchema
>

export const TextInputStyleTypesSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: 'Single-line input' }),
  Schema.Literal(2).annotate({ description: 'Multi-line input' }),
]).annotate({ identifier: 'TextInputStyleTypes' })

export type TextInputStyleTypes = Schema.Schema.Type<typeof TextInputStyleTypesSchema>

export const TextInputComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  style: TextInputStyleTypesSchema,
  label: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 45, {
          expected: 'a string of at most 45 characters',
        }),
      ),
    ),
  ),
  value: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 4000, {
          expected: 'a string of at most 4000 characters',
        }),
      ),
    ),
  ),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  min_length: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(4000),
      ),
    ),
  ),
  max_length: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(4000),
      ),
    ),
  ),
}).annotate({ identifier: 'TextInputComponentForModalRequest' })

export type TextInputComponentForModalRequest = Schema.Schema.Type<
  typeof TextInputComponentForModalRequestSchema
>

export const ActionRowComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  components: Schema.Array(TextInputComponentForModalRequestSchema).check(
    Schema.isMinLength(1),
    Schema.isMaxLength(5),
  ),
}).annotate({ identifier: 'ActionRowComponentForModalRequest' })

export type ActionRowComponentForModalRequest = Schema.Schema.Type<
  typeof ActionRowComponentForModalRequestSchema
>

export const ComponentEmojiResponseSchema = Schema.Struct({
  id: Schema.optional(SnowflakeTypeSchema),
  name: Schema.String,
  animated: Schema.optional(Schema.Boolean),
}).annotate({ identifier: 'ComponentEmojiResponse' })

export type ComponentEmojiResponse = Schema.Schema.Type<typeof ComponentEmojiResponseSchema>

export const ButtonComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  custom_id: Schema.optional(Schema.String),
  style: ButtonStyleTypesSchema,
  label: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  emoji: Schema.optional(ComponentEmojiResponseSchema),
  url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  sku_id: Schema.optional(SnowflakeTypeSchema),
}).annotate({ identifier: 'ButtonComponentResponse' })

export type ButtonComponentResponse = Schema.Schema.Type<typeof ButtonComponentResponseSchema>

export const ChannelSelectDefaultValueResponseSchema = Schema.Struct({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
}).annotate({ identifier: 'ChannelSelectDefaultValueResponse' })

export type ChannelSelectDefaultValueResponse = Schema.Schema.Type<
  typeof ChannelSelectDefaultValueResponseSchema
>

export const ChannelSelectComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  custom_id: Schema.String,
  placeholder: Schema.optional(Schema.String),
  min_values: Schema.Number.check(Schema.isInt32()),
  max_values: Schema.Number.check(Schema.isInt32()),
  disabled: Schema.optional(Schema.Boolean),
  channel_types: Schema.optional(Schema.Array(ChannelTypesSchema).check(Schema.isUnique())),
  default_values: Schema.optional(Schema.Array(ChannelSelectDefaultValueResponseSchema)),
}).annotate({ identifier: 'ChannelSelectComponentResponse' })

export type ChannelSelectComponentResponse = Schema.Schema.Type<
  typeof ChannelSelectComponentResponseSchema
>

export const RoleSelectDefaultValueResponseSchema = Schema.Struct({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
}).annotate({ identifier: 'RoleSelectDefaultValueResponse' })

export type RoleSelectDefaultValueResponse = Schema.Schema.Type<
  typeof RoleSelectDefaultValueResponseSchema
>

export const UserSelectDefaultValueResponseSchema = Schema.Struct({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
}).annotate({ identifier: 'UserSelectDefaultValueResponse' })

export type UserSelectDefaultValueResponse = Schema.Schema.Type<
  typeof UserSelectDefaultValueResponseSchema
>

export const MentionableSelectComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  custom_id: Schema.String,
  placeholder: Schema.optional(Schema.String),
  min_values: Schema.Number.check(Schema.isInt32()),
  max_values: Schema.Number.check(Schema.isInt32()),
  disabled: Schema.optional(Schema.Boolean),
  default_values: Schema.optional(
    Schema.Array(
      Schema.Union([RoleSelectDefaultValueResponseSchema, UserSelectDefaultValueResponseSchema]),
    ),
  ),
}).annotate({ identifier: 'MentionableSelectComponentResponse' })

export type MentionableSelectComponentResponse = Schema.Schema.Type<
  typeof MentionableSelectComponentResponseSchema
>

export const RoleSelectComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  custom_id: Schema.String,
  placeholder: Schema.optional(Schema.String),
  min_values: Schema.Number.check(Schema.isInt32()),
  max_values: Schema.Number.check(Schema.isInt32()),
  disabled: Schema.optional(Schema.Boolean),
  default_values: Schema.optional(Schema.Array(RoleSelectDefaultValueResponseSchema)),
}).annotate({ identifier: 'RoleSelectComponentResponse' })

export type RoleSelectComponentResponse = Schema.Schema.Type<
  typeof RoleSelectComponentResponseSchema
>

export const StringSelectOptionResponseSchema = Schema.Struct({
  label: Schema.String,
  value: Schema.String,
  description: Schema.optional(Schema.String),
  emoji: Schema.optional(ComponentEmojiResponseSchema),
  default: Schema.optional(Schema.Boolean),
}).annotate({ identifier: 'StringSelectOptionResponse' })

export type StringSelectOptionResponse = Schema.Schema.Type<typeof StringSelectOptionResponseSchema>

export const StringSelectComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  custom_id: Schema.String,
  placeholder: Schema.optional(Schema.String),
  min_values: Schema.Number.check(Schema.isInt32()),
  max_values: Schema.Number.check(Schema.isInt32()),
  disabled: Schema.optional(Schema.Boolean),
  options: Schema.Array(StringSelectOptionResponseSchema),
}).annotate({ identifier: 'StringSelectComponentResponse' })

export type StringSelectComponentResponse = Schema.Schema.Type<
  typeof StringSelectComponentResponseSchema
>

export const TextInputComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  custom_id: Schema.String,
  style: TextInputStyleTypesSchema,
  label: Schema.NullOr(Schema.String),
  value: Schema.optional(Schema.String),
  placeholder: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Boolean),
  min_length: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
  max_length: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
}).annotate({ identifier: 'TextInputComponentResponse' })

export type TextInputComponentResponse = Schema.Schema.Type<typeof TextInputComponentResponseSchema>

export const UserSelectComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  custom_id: Schema.String,
  placeholder: Schema.optional(Schema.String),
  min_values: Schema.Number.check(Schema.isInt32()),
  max_values: Schema.Number.check(Schema.isInt32()),
  disabled: Schema.optional(Schema.Boolean),
  default_values: Schema.optional(Schema.Array(UserSelectDefaultValueResponseSchema)),
}).annotate({ identifier: 'UserSelectComponentResponse' })

export type UserSelectComponentResponse = Schema.Schema.Type<
  typeof UserSelectComponentResponseSchema
>

export const ActionRowComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  components: Schema.Array(
    Schema.Union([
      ButtonComponentResponseSchema,
      ChannelSelectComponentResponseSchema,
      MentionableSelectComponentResponseSchema,
      RoleSelectComponentResponseSchema,
      StringSelectComponentResponseSchema,
      TextInputComponentResponseSchema,
      UserSelectComponentResponseSchema,
    ]),
  ),
}).annotate({ identifier: 'ActionRowComponentResponse' })

export type ActionRowComponentResponse = Schema.Schema.Type<typeof ActionRowComponentResponseSchema>

export const ActionTypesSchema = Schema.Union([
  Schema.Literal('TYPING_START').annotate({ description: 'User started typing in a channel' }),
  Schema.Literal('INVITE_CREATE').annotate({ description: 'Invite to a channel was created' }),
  Schema.Literal('INVITE_DELETE').annotate({ description: 'Invite to a channel was deleted' }),
  Schema.Literal('WEBHOOKS_UPDATE').annotate({
    description: 'Guild channel webhook was created, updated, or deleted',
  }),
  Schema.Literal('CHANNEL_CREATE').annotate({ description: 'New guild channel created' }),
  Schema.Literal('VOICE_CHANNEL_STATUS_UPDATE').annotate({
    description: 'Voice channel status was updated',
  }),
  Schema.Literal('CHANNEL_UPDATE').annotate({ description: 'Channel was updated' }),
  Schema.Literal('CHANNEL_DELETE').annotate({ description: 'Channel was deleted' }),
  Schema.Literal('CHANNEL_PINS_UPDATE').annotate({ description: 'Message was pinned or unpinned' }),
  Schema.Literal('THREAD_CREATE').annotate({
    description: 'Thread created, also sent when being added to a private thread',
  }),
  Schema.Literal('THREAD_UPDATE').annotate({ description: 'Thread was updated' }),
  Schema.Literal('THREAD_DELETE').annotate({ description: 'Thread was deleted' }),
  Schema.Literal('THREAD_LIST_SYNC').annotate({
    description:
      'Sent when gaining access to a channel, contains all active threads in that channel',
  }),
  Schema.Literal('THREAD_MEMBER_UPDATE').annotate({
    description: 'Thread member for the current user was updated',
  }),
  Schema.Literal('THREAD_MEMBERS_UPDATE').annotate({
    description: 'Some user(s) were added to or removed from a thread',
  }),
  Schema.Literal('GUILD_CREATE').annotate({
    description:
      'Lazy-load for unavailable guild, guild became available, or user joined a new guild',
  }),
  Schema.Literal('GUILD_UPDATE').annotate({ description: 'Guild was updated' }),
  Schema.Literal('GUILD_DELETE').annotate({
    description: 'Guild became unavailable, or user left/was removed from a guild',
  }),
  Schema.Literal('GUILD_EMOJIS_UPDATE').annotate({ description: 'Guild emojis were updated' }),
  Schema.Literal('GUILD_STICKERS_UPDATE').annotate({ description: 'Guild stickers were updated' }),
  Schema.Literal('GUILD_INTEGRATIONS_UPDATE').annotate({
    description: 'Guild integration was updated',
  }),
  Schema.Literal('GUILD_MEMBER_ADD').annotate({ description: 'New user joined a guild' }),
  Schema.Literal('GUILD_MEMBER_UPDATE').annotate({ description: 'Guild member was updated' }),
  Schema.Literal('GUILD_MEMBER_REMOVE').annotate({ description: 'User was removed from a guild' }),
  Schema.Literal('GUILD_BAN_ADD').annotate({ description: 'User was banned from a guild' }),
  Schema.Literal('GUILD_BAN_REMOVE').annotate({ description: 'User was unbanned from a guild' }),
  Schema.Literal('GUILD_ROLE_CREATE').annotate({ description: 'Guild role was created' }),
  Schema.Literal('GUILD_ROLE_UPDATE').annotate({ description: 'Guild role was updated' }),
  Schema.Literal('GUILD_ROLE_DELETE').annotate({ description: 'Guild role was deleted' }),
  Schema.Literal('GUILD_MEMBERS_CHUNK').annotate({
    description: 'Response to Request Guild Members',
  }),
  Schema.Literal('MESSAGE_CREATE').annotate({ description: 'Message was created' }),
  Schema.Literal('MESSAGE_UPDATE').annotate({ description: 'Message was edited' }),
  Schema.Literal('MESSAGE_DELETE').annotate({ description: 'Message was deleted' }),
  Schema.Literal('MESSAGE_DELETE_BULK').annotate({
    description: 'Multiple messages were deleted at once',
  }),
  Schema.Literal('MESSAGE_REACTION_ADD').annotate({ description: 'User reacted to a message' }),
  Schema.Literal('MESSAGE_REACTION_REMOVE').annotate({
    description: 'User removed a reaction from a message',
  }),
  Schema.Literal('MESSAGE_REACTION_REMOVE_ALL').annotate({
    description: 'All reactions were explicitly removed from a message',
  }),
  Schema.Literal('MESSAGE_REACTION_REMOVE_EMOJI').annotate({
    description: 'All reactions for a given emoji were explicitly removed from a message',
  }),
  Schema.Literal('USER_UPDATE').annotate({ description: 'Properties about the user changed' }),
  Schema.Literal('ENTITLEMENT_CREATE').annotate({ description: 'Entitlement was created' }),
  Schema.Literal('ENTITLEMENT_UPDATE').annotate({ description: 'Entitlement was updated' }),
  Schema.Literal('ENTITLEMENT_DELETE').annotate({ description: 'Entitlement was deleted' }),
  Schema.Literal('READY').annotate({ description: 'Contains the initial state information' }),
  Schema.Literal('RESUMED').annotate({ description: 'Response to Resume' }),
  Schema.Literal('PRESENCE_UPDATE').annotate({ description: 'User was updated' }),
  Schema.Literal('VOICE_STATE_UPDATE').annotate({
    description: 'Someone joined, left, or moved a voice channel',
  }),
  Schema.Literal('VOICE_SERVER_UPDATE').annotate({
    description: "Guild's voice server was updated",
  }),
  Schema.Literal('LOBBY_MESSAGE_CREATE').annotate({
    description: 'Sent when a message is created in a lobby',
  }),
  Schema.Literal('LOBBY_MESSAGE_UPDATE').annotate({
    description: 'Sent when a message is updated in a lobby',
  }),
  Schema.Literal('LOBBY_MESSAGE_DELETE').annotate({
    description: 'Sent when a message is deleted from a lobby',
  }),
  Schema.Literal('GAME_DIRECT_MESSAGE_CREATE').annotate({
    description: 'Sent when a direct message is created during an active Social SDK session',
  }),
  Schema.Literal('GAME_DIRECT_MESSAGE_DELETE').annotate({
    description: 'Sent when a direct message is deleted during an active Social SDK session',
  }),
  Schema.Literal('GAME_DIRECT_MESSAGE_UPDATE').annotate({
    description: 'Sent when a direct message is updated during an active Social SDK session',
  }),
  Schema.Literal('INTERACTION_CREATE').annotate({
    description: 'User used an interaction, such as an Application Command',
  }),
  Schema.Literal('INTEGRATION_CREATE').annotate({ description: 'Guild integration was created' }),
  Schema.Literal('INTEGRATION_UPDATE').annotate({ description: 'Guild integration was updated' }),
  Schema.Literal('INTEGRATION_DELETE').annotate({ description: 'Guild integration was deleted' }),
  Schema.Literal('APPLICATION_COMMAND_PERMISSIONS_UPDATE').annotate({
    description: 'Application command permission was updated',
  }),
  Schema.Literal('APPLICATION_AUTHORIZED').annotate({
    description: 'Sent when an app was authorized by a user to a server or their account',
  }),
  Schema.Literal('APPLICATION_DEAUTHORIZED').annotate({
    description: 'Sent when an app was deauthorized by a user',
  }),
  Schema.Literal('STAGE_INSTANCE_CREATE').annotate({ description: 'Stage instance was created' }),
  Schema.Literal('STAGE_INSTANCE_UPDATE').annotate({ description: 'Stage instance was updated' }),
  Schema.Literal('STAGE_INSTANCE_DELETE').annotate({
    description: 'Stage instance was deleted or closed',
  }),
  Schema.Literal('GUILD_AUDIT_LOG_ENTRY_CREATE').annotate({
    description: 'A guild audit log entry was created',
  }),
  Schema.Literal('GUILD_SCHEDULED_EVENT_CREATE').annotate({
    description: 'Guild scheduled event was created',
  }),
  Schema.Literal('GUILD_SCHEDULED_EVENT_UPDATE').annotate({
    description: 'Guild scheduled event was updated',
  }),
  Schema.Literal('GUILD_SCHEDULED_EVENT_DELETE').annotate({
    description: 'Guild scheduled event was deleted',
  }),
  Schema.Literal('GUILD_SCHEDULED_EVENT_USER_ADD').annotate({
    description: 'User subscribed to a guild scheduled event',
  }),
  Schema.Literal('GUILD_SCHEDULED_EVENT_USER_REMOVE').annotate({
    description: 'User unsubscribed from a guild scheduled event',
  }),
  Schema.Literal('AUTO_MODERATION_RULE_CREATE').annotate({
    description: 'Auto Moderation rule was created',
  }),
  Schema.Literal('AUTO_MODERATION_RULE_UPDATE').annotate({
    description: 'Auto Moderation rule was updated',
  }),
  Schema.Literal('AUTO_MODERATION_RULE_DELETE').annotate({
    description: 'Auto Moderation rule was deleted',
  }),
  Schema.Literal('AUTO_MODERATION_ACTION_EXECUTION').annotate({
    description:
      'Auto Moderation rule was triggered and an action was executed (.e.g. a message was blocked)',
  }),
  Schema.Literal('GUILD_SOUNDBOARD_SOUNDS_UPDATE'),
  Schema.Literal('GUILD_SOUNDBOARD_SOUND_CREATE'),
  Schema.Literal('GUILD_SOUNDBOARD_SOUND_UPDATE'),
  Schema.Literal('GUILD_SOUNDBOARD_SOUND_DELETE'),
  Schema.Literal('QUEST_USER_ENROLLMENT').annotate({
    description: 'User was added to a Quest (currently unavailable)',
  }),
  Schema.Literal('RATE_LIMITED'),
]).annotate({ identifier: 'ActionTypes' })

export type ActionTypes = Schema.Schema.Type<typeof ActionTypesSchema>

export const ApplicationTypesSchema = Schema.Union([Schema.Literal(4)]).annotate({
  identifier: 'ApplicationTypes',
})

export type ApplicationTypes = Schema.Schema.Type<typeof ApplicationTypesSchema>

export const Int53TypeSchema = Schema.Union([
  Schema.BigInt,
  Schema.Number.check(Schema.isInt()),
  Schema.String.check(Schema.isPattern(/^-?\d+$/)),
])
  .pipe(
    Schema.decodeTo(
      Schema.BigInt,
      SchemaTransformation.transform({
        decode: (input) => BigInt(input),
        encode: (output) => output,
      }),
    ),
  )
  .check(
    Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
    Schema.isGreaterThanOrEqualToBigInt(-9007199254740991n),
    Schema.isLessThanOrEqualToBigInt(9007199254740991n),
  )
  .annotate({ identifier: 'Int53Type' })

export type Int53Type = Schema.Schema.Type<typeof Int53TypeSchema>

export const UserAvatarDecorationResponseSchema = Schema.Struct({
  asset: Schema.String.annotate({ description: 'the avatar decoration hash' }),
  sku_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description: "id of the avatar decoration's SKU",
  }),
}).annotate({ identifier: 'UserAvatarDecorationResponse' })

export type UserAvatarDecorationResponse = Schema.Schema.Type<
  typeof UserAvatarDecorationResponseSchema
>

export const NameplatePaletteSchema = Schema.Union([
  Schema.Literal('crimson').annotate({ description: 'Crimson color palette' }),
  Schema.Literal('berry').annotate({ description: 'Berry color palette' }),
  Schema.Literal('sky').annotate({ description: 'Sky color palette' }),
  Schema.Literal('teal').annotate({ description: 'Teal color palette' }),
  Schema.Literal('forest').annotate({ description: 'Forest color palette' }),
  Schema.Literal('bubble_gum').annotate({ description: 'Bubble gum color palette' }),
  Schema.Literal('violet').annotate({ description: 'Violet color palette' }),
  Schema.Literal('cobalt').annotate({ description: 'Cobalt color palette' }),
  Schema.Literal('clover').annotate({ description: 'Clover color palette' }),
  Schema.Literal('lemon').annotate({ description: 'Lemon color palette' }),
  Schema.Literal('white').annotate({ description: 'White color palette' }),
  Schema.Literal('black').annotate({ description: 'Black color palette' }),
]).annotate({ identifier: 'NameplatePalette' })

export type NameplatePalette = Schema.Schema.Type<typeof NameplatePaletteSchema>

export const UserNameplateResponseSchema = Schema.Struct({
  sku_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description: 'ID of the nameplate SKU',
  }),
  asset: Schema.String.annotate({ description: 'Path to the nameplate asset' }),
  label: Schema.String.annotate({ description: 'The label of this nameplate. Currently unused' }),
  palette: NameplatePaletteSchema.annotate({ description: 'Background color of the nameplate' }),
}).annotate({ identifier: 'UserNameplateResponse' })

export type UserNameplateResponse = Schema.Schema.Type<typeof UserNameplateResponseSchema>

export const UserCollectiblesResponseSchema = Schema.Struct({
  nameplate: Schema.Union([Schema.NullOr(Schema.Null), UserNameplateResponseSchema]).annotate({
    description: 'Object mapping of nameplate data',
  }),
}).annotate({ identifier: 'UserCollectiblesResponse' })

export type UserCollectiblesResponse = Schema.Schema.Type<typeof UserCollectiblesResponseSchema>

export const UserPrimaryGuildResponseSchema = Schema.Struct({
  identity_guild_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description: "the id of the user's primary guild",
  }),
  identity_enabled: Schema.NullOr(Schema.Boolean).annotate({
    description: "whether the user is displaying the primary guild's server tag",
  }),
  tag: Schema.NullOr(Schema.String).annotate({
    description: "the text of the user's server tag, limited to 4 characters",
  }),
  badge: Schema.NullOr(Schema.String).annotate({ description: 'the server tag badge hash' }),
}).annotate({ identifier: 'UserPrimaryGuildResponse' })

export type UserPrimaryGuildResponse = Schema.Schema.Type<typeof UserPrimaryGuildResponseSchema>

export const UserResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema.annotate({ description: "the user's id" }),
  username: Schema.String.annotate({
    description: "the user's username, not unique across the platform",
  }),
  avatar: Schema.NullOr(Schema.String).annotate({ description: "the user's avatar hash" }),
  discriminator: Schema.String.annotate({ description: "the user's Discord-tag" }),
  public_flags: Schema.Number.check(Schema.isInt32()).annotate({
    description: "the public flags on a user's account",
  }),
  flags: Int53TypeSchema.annotate({ description: "the flags on a user's account" }),
  bot: Schema.optional(
    Schema.Boolean.annotate({ description: 'whether the user belongs to an OAuth2 application' }),
  ),
  system: Schema.optional(
    Schema.Boolean.annotate({
      description:
        'whether the user is an Official Discord System user (part of the urgent message system)',
    }),
  ),
  banner: Schema.optional(
    Schema.NullOr(Schema.String).annotate({ description: "the user's banner hash" }),
  ),
  accent_color: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32())).annotate({
      description:
        "the user's banner color encoded as an integer representation of hexadecimal color code",
    }),
  ),
  global_name: Schema.NullOr(Schema.String).annotate({
    description: "the user's display name, if it is set",
  }),
  avatar_decoration_data: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UserAvatarDecorationResponseSchema]).annotate({
      description: "data for the user's avatar decoration",
    }),
  ),
  collectibles: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UserCollectiblesResponseSchema]).annotate({
      description: "data for the user's collectibles",
    }),
  ),
  primary_guild: Schema.Union([
    Schema.NullOr(Schema.Null),
    UserPrimaryGuildResponseSchema,
  ]).annotate({ description: "the user's primary guild" }),
}).annotate({ identifier: 'UserResponse' })

export type UserResponse = Schema.Schema.Type<typeof UserResponseSchema>

export const OAuth2ScopesSchema = Schema.Union([
  Schema.Literal('identify').annotate({ description: 'allows /users/@me without email' }),
  Schema.Literal('email').annotate({ description: 'enables /users/@me to return an email' }),
  Schema.Literal('connections').annotate({
    description: 'allows /users/@me/connections to return linked third-party accounts',
  }),
  Schema.Literal('guilds').annotate({
    description:
      "allows /users/@me/guilds to return basic information about all of a user's guilds",
  }),
  Schema.Literal('guilds.join').annotate({
    description:
      'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
  }),
  Schema.Literal('guilds.members.read').annotate({
    description:
      "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
  }),
  Schema.Literal('gdm.join').annotate({
    description: 'allows your app to join users to a group dm',
  }),
  Schema.Literal('bot').annotate({
    description: "for oauth2 bots, this puts the bot in the user's selected guild by default",
  }),
  Schema.Literal('rpc').annotate({
    description:
      "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
  }),
  Schema.Literal('rpc.notifications.read').annotate({
    description:
      'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
  }),
  Schema.Literal('rpc.voice.read').annotate({
    description:
      "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
  }),
  Schema.Literal('rpc.voice.write').annotate({
    description:
      "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
  }),
  Schema.Literal('rpc.video.read').annotate({
    description:
      "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
  }),
  Schema.Literal('rpc.video.write').annotate({
    description:
      "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
  }),
  Schema.Literal('rpc.screenshare.read').annotate({
    description:
      "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
  }),
  Schema.Literal('rpc.screenshare.write').annotate({
    description:
      "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
  }),
  Schema.Literal('rpc.activities.write').annotate({
    description:
      "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
  }),
  Schema.Literal('webhook.incoming').annotate({
    description:
      'this generates a webhook that is returned in the oauth token response for authorization code grants',
  }),
  Schema.Literal('messages.read').annotate({
    description:
      'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
  }),
  Schema.Literal('applications.builds.upload').annotate({
    description:
      "allows your app to upload/update builds for a user's applications - requires Discord approval",
  }),
  Schema.Literal('applications.builds.read').annotate({
    description: "allows your app to read build data for a user's applications",
  }),
  Schema.Literal('applications.commands').annotate({
    description: 'allows your app to use commands in a guild',
  }),
  Schema.Literal('applications.commands.permissions.update').annotate({
    description:
      'allows your app to update permissions for its commands in a guild a user has permissions to',
  }),
  Schema.Literal('applications.commands.update').annotate({
    description:
      'allows your app to update its commands using a Bearer token - client credentials grant only',
  }),
  Schema.Literal('applications.store.update').annotate({
    description:
      "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
  }),
  Schema.Literal('applications.entitlements').annotate({
    description: "allows your app to read entitlements for a user's applications",
  }),
  Schema.Literal('activities.read').annotate({
    description:
      'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
  }),
  Schema.Literal('activities.write').annotate({
    description:
      "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
  }),
  Schema.Literal('activities.invites.write').annotate({
    description:
      'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
  }),
  Schema.Literal('relationships.read').annotate({
    description:
      "allows your app to know a user's friends and implicit relationships - requires Discord approval",
  }),
  Schema.Literal('voice').annotate({
    description:
      "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
  }),
  Schema.Literal('dm_channels.read').annotate({
    description:
      "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
  }),
  Schema.Literal('role_connections.write').annotate({
    description: "allows your app to update a user's connection and metadata for the app",
  }),
  Schema.Literal('openid').annotate({
    description:
      'for OpenID Connect, this allows your app to receive user id and basic profile information',
  }),
]).annotate({ identifier: 'OAuth2Scopes' })

export type OAuth2Scopes = Schema.Schema.Type<typeof OAuth2ScopesSchema>

export const ApplicationOAuth2InstallParamsResponseSchema = Schema.Struct({
  scopes: Schema.Array(OAuth2ScopesSchema).check(Schema.isUnique()),
  permissions: Schema.String,
}).annotate({ identifier: 'ApplicationOAuth2InstallParamsResponse' })

export type ApplicationOAuth2InstallParamsResponse = Schema.Schema.Type<
  typeof ApplicationOAuth2InstallParamsResponseSchema
>

export const ApplicationIntegrationTypeConfigurationResponseSchema = Schema.Struct({
  oauth2_install_params: Schema.optional(ApplicationOAuth2InstallParamsResponseSchema),
}).annotate({ identifier: 'ApplicationIntegrationTypeConfigurationResponse' })

export type ApplicationIntegrationTypeConfigurationResponse = Schema.Schema.Type<
  typeof ApplicationIntegrationTypeConfigurationResponseSchema
>

export const ApplicationResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  icon: Schema.NullOr(Schema.String),
  description: Schema.String,
  type: Schema.Union([Schema.NullOr(Schema.Null), ApplicationTypesSchema]),
  cover_image: Schema.optional(Schema.String),
  primary_sku_id: Schema.optional(SnowflakeTypeSchema),
  flags: Schema.Number.check(Schema.isInt32()),
  flags_new: Schema.String,
  bot: Schema.optional(UserResponseSchema),
  slug: Schema.optional(Schema.String),
  conjure_project_id: Schema.optional(SnowflakeTypeSchema),
  vibegrations_project_id: Schema.optional(SnowflakeTypeSchema),
  guild_id: Schema.optional(SnowflakeTypeSchema),
  rpc_origins: Schema.optional(Schema.Array(Schema.String)),
  bot_public: Schema.optional(Schema.Boolean),
  bot_require_code_grant: Schema.optional(Schema.Boolean),
  terms_of_service_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  privacy_policy_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  custom_install_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  install_params: Schema.optional(ApplicationOAuth2InstallParamsResponseSchema),
  integration_types_config: Schema.optional(
    Schema.Record(Schema.String, ApplicationIntegrationTypeConfigurationResponseSchema),
  ),
  verify_key: Schema.String,
  max_participants: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
  tags: Schema.optional(Schema.Array(Schema.String).check(Schema.isUnique())),
}).annotate({ identifier: 'ApplicationResponse' })

export type ApplicationResponse = Schema.Schema.Type<typeof ApplicationResponseSchema>

export const AttachmentResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  filename: Schema.String,
  size: Schema.Number.check(Schema.isInt32()),
  url: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  proxy_url: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  width: Schema.optional(Schema.Number.check(Schema.isInt32())),
  height: Schema.optional(Schema.Number.check(Schema.isInt32())),
  duration_secs: Schema.optional(Schema.Number),
  waveform: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  content_type: Schema.optional(Schema.String),
  ephemeral: Schema.optional(Schema.Boolean),
  flags: Schema.optional(Schema.Number.check(Schema.isInt32())),
  placeholder: Schema.optional(Schema.String),
  placeholder_version: Schema.optional(Schema.Number.check(Schema.isInt32())),
  title: Schema.optional(Schema.NullOr(Schema.String)),
  application: Schema.optional(ApplicationResponseSchema),
  clip_created_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  clip_participants: Schema.optional(Schema.Array(UserResponseSchema)),
}).annotate({ identifier: 'AttachmentResponse' })

export type AttachmentResponse = Schema.Schema.Type<typeof AttachmentResponseSchema>

export const ActivitiesAttachmentResponseSchema = Schema.Struct({
  attachment: AttachmentResponseSchema,
}).annotate({ identifier: 'ActivitiesAttachmentResponse' })

export type ActivitiesAttachmentResponse = Schema.Schema.Type<
  typeof ActivitiesAttachmentResponseSchema
>

export const ActivityActionTypesSchema = Schema.Union([
  Schema.Literal(1),
  Schema.Literal(2),
  Schema.Literal(3),
  Schema.Literal(5),
  Schema.Literal(6),
]).annotate({ identifier: 'ActivityActionTypes' })

export type ActivityActionTypes = Schema.Schema.Type<typeof ActivityActionTypesSchema>

export const ActivityInstanceCallbackResponseSchema = Schema.Struct({ id: Schema.String }).annotate(
  { identifier: 'ActivityInstanceCallbackResponse' },
)

export type ActivityInstanceCallbackResponse = Schema.Schema.Type<
  typeof ActivityInstanceCallbackResponseSchema
>

export const AfkTimeoutsSchema = Schema.Union([
  Schema.Literal(60),
  Schema.Literal(300),
  Schema.Literal(900),
  Schema.Literal(1800),
  Schema.Literal(3600),
]).annotate({ identifier: 'AfkTimeouts' })

export type AfkTimeouts = Schema.Schema.Type<typeof AfkTimeoutsSchema>

export const AllowedMentionTypesSchema = Schema.Union([
  Schema.Literal('users').annotate({ description: 'Controls role mentions' }),
  Schema.Literal('roles').annotate({ description: 'Controls user mentions' }),
  Schema.Literal('everyone').annotate({ description: 'Controls @everyone and @here mentions' }),
]).annotate({ identifier: 'AllowedMentionTypes' })

export type AllowedMentionTypes = Schema.Schema.Type<typeof AllowedMentionTypesSchema>

export const ApplicationCommandOptionTypeSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: 'A sub-action within a command or group' }),
  Schema.Literal(2).annotate({ description: 'A group of subcommands' }),
  Schema.Literal(3).annotate({ description: 'A string option' }),
  Schema.Literal(4).annotate({
    description: 'An integer option. Any integer between -2^53 and 2^53 is a valid value',
  }),
  Schema.Literal(5).annotate({ description: 'A boolean option' }),
  Schema.Literal(6).annotate({ description: 'A snowflake option that represents a User' }),
  Schema.Literal(7).annotate({
    description:
      'A snowflake option that represents a Channel. Includes all channel types and categories',
  }),
  Schema.Literal(8).annotate({ description: 'A snowflake option that represents a Role' }),
  Schema.Literal(9).annotate({
    description: 'A snowflake option that represents anything you can mention',
  }),
  Schema.Literal(10).annotate({
    description: 'A number option. Any double between -2^53 and 2^53 is a valid value',
  }),
  Schema.Literal(11).annotate({ description: 'An attachment option' }),
]).annotate({ identifier: 'ApplicationCommandOptionType' })

export type ApplicationCommandOptionType = Schema.Schema.Type<
  typeof ApplicationCommandOptionTypeSchema
>

export const ApplicationCommandAttachmentOptionSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  file_types: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 16, {
            expected: 'a string of at most 16 characters',
          }),
        ),
      ).check(Schema.isMaxLength(10), Schema.isUnique()),
    ),
  ),
}).annotate({ identifier: 'ApplicationCommandAttachmentOption' })

export type ApplicationCommandAttachmentOption = Schema.Schema.Type<
  typeof ApplicationCommandAttachmentOptionSchema
>

export const ApplicationCommandAttachmentOptionResponseSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localized: Schema.optional(Schema.String),
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  required: Schema.optional(Schema.Boolean),
  file_types: Schema.optional(
    Schema.Array(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 16, {
          expected: 'a string of at most 16 characters',
        }),
      ),
    ).check(Schema.isUnique()),
  ),
}).annotate({ identifier: 'ApplicationCommandAttachmentOptionResponse' })

export type ApplicationCommandAttachmentOptionResponse = Schema.Schema.Type<
  typeof ApplicationCommandAttachmentOptionResponseSchema
>

export const InteractionCallbackTypesSchema = Schema.Union([
  Schema.Literal(1),
  Schema.Literal(4),
  Schema.Literal(5),
  Schema.Literal(6),
  Schema.Literal(7),
  Schema.Literal(8),
  Schema.Literal(9),
  Schema.Literal(12),
  Schema.Literal(13),
]).annotate({ identifier: 'InteractionCallbackTypes' })

export type InteractionCallbackTypes = Schema.Schema.Type<typeof InteractionCallbackTypesSchema>

export const ApplicationCommandOptionIntegerChoiceSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  value: Int53TypeSchema,
}).annotate({ identifier: 'ApplicationCommandOptionIntegerChoice' })

export type ApplicationCommandOptionIntegerChoice = Schema.Schema.Type<
  typeof ApplicationCommandOptionIntegerChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema = Schema.Struct({
  choices: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandOptionIntegerChoiceSchema]),
      ).check(Schema.isMaxLength(25)),
    ),
  ),
}).annotate({ identifier: 'InteractionApplicationCommandAutocompleteCallbackIntegerData' })

export type InteractionApplicationCommandAutocompleteCallbackIntegerData = Schema.Schema.Type<
  typeof InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema
>

export const ApplicationCommandOptionNumberChoiceSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  value: Schema.Number,
}).annotate({ identifier: 'ApplicationCommandOptionNumberChoice' })

export type ApplicationCommandOptionNumberChoice = Schema.Schema.Type<
  typeof ApplicationCommandOptionNumberChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackNumberDataSchema = Schema.Struct({
  choices: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandOptionNumberChoiceSchema]),
      ).check(Schema.isMaxLength(25)),
    ),
  ),
}).annotate({ identifier: 'InteractionApplicationCommandAutocompleteCallbackNumberData' })

export type InteractionApplicationCommandAutocompleteCallbackNumberData = Schema.Schema.Type<
  typeof InteractionApplicationCommandAutocompleteCallbackNumberDataSchema
>

export const ApplicationCommandOptionStringChoiceSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  value: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 6000, {
      expected: 'a string of at most 6000 characters',
    }),
  ),
}).annotate({ identifier: 'ApplicationCommandOptionStringChoice' })

export type ApplicationCommandOptionStringChoice = Schema.Schema.Type<
  typeof ApplicationCommandOptionStringChoiceSchema
>

export const InteractionApplicationCommandAutocompleteCallbackStringDataSchema = Schema.Struct({
  choices: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandOptionStringChoiceSchema]),
      ).check(Schema.isMaxLength(25)),
    ),
  ),
}).annotate({ identifier: 'InteractionApplicationCommandAutocompleteCallbackStringData' })

export type InteractionApplicationCommandAutocompleteCallbackStringData = Schema.Schema.Type<
  typeof InteractionApplicationCommandAutocompleteCallbackStringDataSchema
>

export const ApplicationCommandAutocompleteCallbackRequestSchema = Schema.Struct({
  type: InteractionCallbackTypesSchema,
  data: Schema.Union([
    InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema,
    InteractionApplicationCommandAutocompleteCallbackNumberDataSchema,
    InteractionApplicationCommandAutocompleteCallbackStringDataSchema,
  ]),
}).annotate({ identifier: 'ApplicationCommandAutocompleteCallbackRequest' })

export type ApplicationCommandAutocompleteCallbackRequest = Schema.Schema.Type<
  typeof ApplicationCommandAutocompleteCallbackRequestSchema
>

export const ApplicationCommandBooleanOptionSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'ApplicationCommandBooleanOption' })

export type ApplicationCommandBooleanOption = Schema.Schema.Type<
  typeof ApplicationCommandBooleanOptionSchema
>

export const ApplicationCommandBooleanOptionResponseSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localized: Schema.optional(Schema.String),
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  required: Schema.optional(Schema.Boolean),
}).annotate({ identifier: 'ApplicationCommandBooleanOptionResponse' })

export type ApplicationCommandBooleanOptionResponse = Schema.Schema.Type<
  typeof ApplicationCommandBooleanOptionResponseSchema
>

export const ApplicationCommandChannelOptionSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  channel_types: Schema.optional(
    Schema.NullOr(Schema.Array(ChannelTypesSchema).check(Schema.isUnique())),
  ),
}).annotate({ identifier: 'ApplicationCommandChannelOption' })

export type ApplicationCommandChannelOption = Schema.Schema.Type<
  typeof ApplicationCommandChannelOptionSchema
>

export const ApplicationCommandChannelOptionResponseSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localized: Schema.optional(Schema.String),
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  required: Schema.optional(Schema.Boolean),
  channel_types: Schema.optional(Schema.Array(ChannelTypesSchema).check(Schema.isUnique())),
}).annotate({ identifier: 'ApplicationCommandChannelOptionResponse' })

export type ApplicationCommandChannelOptionResponse = Schema.Schema.Type<
  typeof ApplicationCommandChannelOptionResponseSchema
>

export const ApplicationCommandIntegerOptionSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  autocomplete: Schema.optional(Schema.NullOr(Schema.Boolean)),
  choices: Schema.optional(
    Schema.NullOr(
      Schema.Array(ApplicationCommandOptionIntegerChoiceSchema).check(Schema.isMaxLength(25)),
    ),
  ),
  min_value: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), Int53TypeSchema])),
  max_value: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), Int53TypeSchema])),
}).annotate({ identifier: 'ApplicationCommandIntegerOption' })

export type ApplicationCommandIntegerOption = Schema.Schema.Type<
  typeof ApplicationCommandIntegerOptionSchema
>

export const ApplicationCommandMentionableOptionSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'ApplicationCommandMentionableOption' })

export type ApplicationCommandMentionableOption = Schema.Schema.Type<
  typeof ApplicationCommandMentionableOptionSchema
>

export const ApplicationCommandNumberOptionSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  autocomplete: Schema.optional(Schema.NullOr(Schema.Boolean)),
  choices: Schema.optional(
    Schema.NullOr(
      Schema.Array(ApplicationCommandOptionNumberChoiceSchema).check(Schema.isMaxLength(25)),
    ),
  ),
  min_value: Schema.optional(Schema.NullOr(Schema.Number)),
  max_value: Schema.optional(Schema.NullOr(Schema.Number)),
}).annotate({ identifier: 'ApplicationCommandNumberOption' })

export type ApplicationCommandNumberOption = Schema.Schema.Type<
  typeof ApplicationCommandNumberOptionSchema
>

export const ApplicationCommandRoleOptionSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'ApplicationCommandRoleOption' })

export type ApplicationCommandRoleOption = Schema.Schema.Type<
  typeof ApplicationCommandRoleOptionSchema
>

export const ApplicationCommandStringOptionSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  autocomplete: Schema.optional(Schema.NullOr(Schema.Boolean)),
  min_length: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(6000),
      ),
    ),
  ),
  max_length: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(6000),
      ),
    ),
  ),
  choices: Schema.optional(
    Schema.NullOr(
      Schema.Array(ApplicationCommandOptionStringChoiceSchema).check(Schema.isMaxLength(25)),
    ),
  ),
}).annotate({ identifier: 'ApplicationCommandStringOption' })

export type ApplicationCommandStringOption = Schema.Schema.Type<
  typeof ApplicationCommandStringOptionSchema
>

export const ApplicationCommandUserOptionSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'ApplicationCommandUserOption' })

export type ApplicationCommandUserOption = Schema.Schema.Type<
  typeof ApplicationCommandUserOptionSchema
>

export const ApplicationCommandSubcommandOptionSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  options: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
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
      ).check(Schema.isMaxLength(25)),
    ),
  ),
}).annotate({ identifier: 'ApplicationCommandSubcommandOption' })

export type ApplicationCommandSubcommandOption = Schema.Schema.Type<
  typeof ApplicationCommandSubcommandOptionSchema
>

export const ApplicationCommandSubcommandGroupOptionSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  options: Schema.optional(
    Schema.NullOr(
      Schema.Array(ApplicationCommandSubcommandOptionSchema).check(Schema.isMaxLength(25)),
    ),
  ),
}).annotate({ identifier: 'ApplicationCommandSubcommandGroupOption' })

export type ApplicationCommandSubcommandGroupOption = Schema.Schema.Type<
  typeof ApplicationCommandSubcommandGroupOptionSchema
>

export const InteractionContextTypeSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'This command can be used within a Guild.' }),
  Schema.Literal(1).annotate({
    description: "This command can be used within a DM with this application's bot.",
  }),
  Schema.Literal(2).annotate({
    description: 'This command can be used within DMs and Group DMs with users.',
  }),
]).annotate({ identifier: 'InteractionContextType' })

export type InteractionContextType = Schema.Schema.Type<typeof InteractionContextTypeSchema>

export const ApplicationIntegrationTypeSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'For Guild install.' }),
  Schema.Literal(1).annotate({ description: 'For User install.' }),
]).annotate({ identifier: 'ApplicationIntegrationType' })

export type ApplicationIntegrationType = Schema.Schema.Type<typeof ApplicationIntegrationTypeSchema>

export const ApplicationCommandHandlerSchema = Schema.Union([
  Schema.Literal(1).annotate({
    description: 'The app handles the interaction using an interaction token',
  }),
  Schema.Literal(2).annotate({
    description:
      'Discord handles the interaction by launching an Activity and sending a follow-up message without coordinating with the app',
  }),
]).annotate({ identifier: 'ApplicationCommandHandler' })

export type ApplicationCommandHandler = Schema.Schema.Type<typeof ApplicationCommandHandlerSchema>

export const ApplicationCommandTypeSchema = Schema.Union([
  Schema.Literal(1).annotate({
    description: 'Slash commands; a text-based command that shows up when a user types /',
  }),
  Schema.Literal(2).annotate({
    description: 'A UI-based command that shows up when you right click or tap on a user',
  }),
  Schema.Literal(3).annotate({
    description: 'A UI-based command that shows up when you right click or tap on a message',
  }),
  Schema.Literal(4).annotate({
    description:
      'A command that represents the primary way to use an application (e.g. launching an Activity)',
  }),
]).annotate({ identifier: 'ApplicationCommandType' })

export type ApplicationCommandType = Schema.Schema.Type<typeof ApplicationCommandTypeSchema>

export const ApplicationCommandCreateRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  options: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
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
      ).check(Schema.isMaxLength(25)),
    ),
  ),
  default_member_permissions: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(18014398509481984),
      ),
    ),
  ),
  dm_permission: Schema.optional(Schema.NullOr(Schema.Boolean)),
  contexts: Schema.optional(
    Schema.NullOr(
      Schema.Array(InteractionContextTypeSchema).check(Schema.isMinLength(1), Schema.isUnique()),
    ),
  ),
  integration_types: Schema.optional(
    Schema.NullOr(
      Schema.Array(ApplicationIntegrationTypeSchema).check(
        Schema.isMinLength(1),
        Schema.isUnique(),
      ),
    ),
  ),
  handler: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandHandlerSchema]).annotate({
      description:
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    }),
  ),
  type: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandTypeSchema])),
}).annotate({ identifier: 'ApplicationCommandCreateRequest' })

export type ApplicationCommandCreateRequest = Schema.Schema.Type<
  typeof ApplicationCommandCreateRequestSchema
>

export const ApplicationCommandOptionIntegerChoiceResponseSchema = Schema.Struct({
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  value: Int53TypeSchema,
}).annotate({ identifier: 'ApplicationCommandOptionIntegerChoiceResponse' })

export type ApplicationCommandOptionIntegerChoiceResponse = Schema.Schema.Type<
  typeof ApplicationCommandOptionIntegerChoiceResponseSchema
>

export const ApplicationCommandIntegerOptionResponseSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localized: Schema.optional(Schema.String),
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  required: Schema.optional(Schema.Boolean),
  autocomplete: Schema.optional(Schema.Boolean),
  choices: Schema.optional(Schema.Array(ApplicationCommandOptionIntegerChoiceResponseSchema)),
  min_value: Schema.optional(Int53TypeSchema),
  max_value: Schema.optional(Int53TypeSchema),
}).annotate({ identifier: 'ApplicationCommandIntegerOptionResponse' })

export type ApplicationCommandIntegerOptionResponse = Schema.Schema.Type<
  typeof ApplicationCommandIntegerOptionResponseSchema
>

export const InteractionTypesSchema = Schema.Union([
  Schema.Literal(1).annotate({
    description: "Sent by Discord to validate your application's interaction handler",
  }),
  Schema.Literal(2).annotate({ description: 'Sent when a user uses an application command' }),
  Schema.Literal(3).annotate({
    description:
      'Sent when a user interacts with a message component previously sent by your application',
  }),
  Schema.Literal(4).annotate({
    description: 'Sent when a user is filling in an autocomplete option in a chat command',
  }),
  Schema.Literal(5).annotate({
    description: 'Sent when a user submits a modal previously sent by your application',
  }),
  Schema.Literal(6).annotate({
    description: 'Sent when Discord is checking if a user can purchase a Social Layer SKU',
  }),
]).annotate({ identifier: 'InteractionTypes' })

export type InteractionTypes = Schema.Schema.Type<typeof InteractionTypesSchema>

export const ApplicationCommandInteractionMetadataResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  user: Schema.optional(UserResponseSchema),
  authorizing_integration_owners: Schema.Record(Schema.String, SnowflakeTypeSchema),
  original_response_message_id: Schema.optional(SnowflakeTypeSchema),
  target_user: Schema.optional(UserResponseSchema),
  target_message_id: Schema.optional(SnowflakeTypeSchema),
}).annotate({ identifier: 'ApplicationCommandInteractionMetadataResponse' })

export type ApplicationCommandInteractionMetadataResponse = Schema.Schema.Type<
  typeof ApplicationCommandInteractionMetadataResponseSchema
>

export const ApplicationCommandMentionableOptionResponseSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localized: Schema.optional(Schema.String),
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  required: Schema.optional(Schema.Boolean),
}).annotate({ identifier: 'ApplicationCommandMentionableOptionResponse' })

export type ApplicationCommandMentionableOptionResponse = Schema.Schema.Type<
  typeof ApplicationCommandMentionableOptionResponseSchema
>

export const ApplicationCommandOptionNumberChoiceResponseSchema = Schema.Struct({
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  value: Schema.Number,
}).annotate({ identifier: 'ApplicationCommandOptionNumberChoiceResponse' })

export type ApplicationCommandOptionNumberChoiceResponse = Schema.Schema.Type<
  typeof ApplicationCommandOptionNumberChoiceResponseSchema
>

export const ApplicationCommandNumberOptionResponseSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localized: Schema.optional(Schema.String),
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  required: Schema.optional(Schema.Boolean),
  autocomplete: Schema.optional(Schema.Boolean),
  choices: Schema.optional(Schema.Array(ApplicationCommandOptionNumberChoiceResponseSchema)),
  min_value: Schema.optional(Schema.Number),
  max_value: Schema.optional(Schema.Number),
}).annotate({ identifier: 'ApplicationCommandNumberOptionResponse' })

export type ApplicationCommandNumberOptionResponse = Schema.Schema.Type<
  typeof ApplicationCommandNumberOptionResponseSchema
>

export const ApplicationCommandOptionStringChoiceResponseSchema = Schema.Struct({
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  value: Schema.String,
}).annotate({ identifier: 'ApplicationCommandOptionStringChoiceResponse' })

export type ApplicationCommandOptionStringChoiceResponse = Schema.Schema.Type<
  typeof ApplicationCommandOptionStringChoiceResponseSchema
>

export const ApplicationCommandPatchRequestPartialSchema = Schema.Struct({
  name: Schema.optional(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length >= 1, {
        expected: 'a string of at least 1 character',
      }),
      Schema.makeFilter((input) => [...input].length <= 32, {
        expected: 'a string of at most 32 characters',
      }),
    ),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  options: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
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
      ).check(Schema.isMaxLength(25)),
    ),
  ),
  default_member_permissions: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(18014398509481984),
      ),
    ),
  ),
  dm_permission: Schema.optional(Schema.NullOr(Schema.Boolean)),
  contexts: Schema.optional(
    Schema.NullOr(
      Schema.Array(InteractionContextTypeSchema).check(Schema.isMinLength(1), Schema.isUnique()),
    ),
  ),
  integration_types: Schema.optional(
    Schema.NullOr(
      Schema.Array(ApplicationIntegrationTypeSchema).check(
        Schema.isMinLength(1),
        Schema.isUnique(),
      ),
    ),
  ),
  handler: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandHandlerSchema]).annotate({
      description:
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    }),
  ),
}).annotate({ identifier: 'ApplicationCommandPatchRequestPartial' })

export type ApplicationCommandPatchRequestPartial = Schema.Schema.Type<
  typeof ApplicationCommandPatchRequestPartialSchema
>

export const ApplicationCommandPermissionTypeSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: 'This permission is for a role.' }),
  Schema.Literal(2).annotate({ description: 'This permission is for a user.' }),
  Schema.Literal(3).annotate({ description: 'This permission is for a channel.' }),
]).annotate({ identifier: 'ApplicationCommandPermissionType' })

export type ApplicationCommandPermissionType = Schema.Schema.Type<
  typeof ApplicationCommandPermissionTypeSchema
>

export const ApplicationCommandPermissionSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: ApplicationCommandPermissionTypeSchema,
  permission: Schema.Boolean,
}).annotate({ identifier: 'ApplicationCommandPermission' })

export type ApplicationCommandPermission = Schema.Schema.Type<
  typeof ApplicationCommandPermissionSchema
>

export const ApplicationCommandRoleOptionResponseSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localized: Schema.optional(Schema.String),
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  required: Schema.optional(Schema.Boolean),
}).annotate({ identifier: 'ApplicationCommandRoleOptionResponse' })

export type ApplicationCommandRoleOptionResponse = Schema.Schema.Type<
  typeof ApplicationCommandRoleOptionResponseSchema
>

export const ApplicationCommandStringOptionResponseSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localized: Schema.optional(Schema.String),
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  required: Schema.optional(Schema.Boolean),
  autocomplete: Schema.optional(Schema.Boolean),
  choices: Schema.optional(Schema.Array(ApplicationCommandOptionStringChoiceResponseSchema)),
  min_length: Schema.optional(Schema.Number.check(Schema.isInt32())),
  max_length: Schema.optional(Schema.Number.check(Schema.isInt32())),
}).annotate({ identifier: 'ApplicationCommandStringOptionResponse' })

export type ApplicationCommandStringOptionResponse = Schema.Schema.Type<
  typeof ApplicationCommandStringOptionResponseSchema
>

export const ApplicationCommandUserOptionResponseSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localized: Schema.optional(Schema.String),
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  required: Schema.optional(Schema.Boolean),
}).annotate({ identifier: 'ApplicationCommandUserOptionResponse' })

export type ApplicationCommandUserOptionResponse = Schema.Schema.Type<
  typeof ApplicationCommandUserOptionResponseSchema
>

export const ApplicationCommandSubcommandOptionResponseSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localized: Schema.optional(Schema.String),
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  required: Schema.optional(Schema.Boolean),
  options: Schema.optional(
    Schema.Array(
      Schema.Union([
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
}).annotate({ identifier: 'ApplicationCommandSubcommandOptionResponse' })

export type ApplicationCommandSubcommandOptionResponse = Schema.Schema.Type<
  typeof ApplicationCommandSubcommandOptionResponseSchema
>

export const ApplicationCommandSubcommandGroupOptionResponseSchema = Schema.Struct({
  type: ApplicationCommandOptionTypeSchema,
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localized: Schema.optional(Schema.String),
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  required: Schema.optional(Schema.Boolean),
  options: Schema.optional(Schema.Array(ApplicationCommandSubcommandOptionResponseSchema)),
}).annotate({ identifier: 'ApplicationCommandSubcommandGroupOptionResponse' })

export type ApplicationCommandSubcommandGroupOptionResponse = Schema.Schema.Type<
  typeof ApplicationCommandSubcommandGroupOptionResponseSchema
>

export const ApplicationCommandResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  version: SnowflakeTypeSchema,
  default_member_permissions: Schema.NullOr(Schema.String),
  type: ApplicationCommandTypeSchema,
  name: Schema.String,
  name_localized: Schema.optional(Schema.String),
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localized: Schema.optional(Schema.String),
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
  guild_id: Schema.optional(SnowflakeTypeSchema),
  dm_permission: Schema.optional(Schema.Boolean),
  contexts: Schema.optional(
    Schema.NullOr(Schema.Array(InteractionContextTypeSchema).check(Schema.isUnique())),
  ),
  integration_types: Schema.optional(
    Schema.Array(ApplicationIntegrationTypeSchema).check(Schema.isUnique()),
  ),
  options: Schema.optional(
    Schema.Array(
      Schema.Union([
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
  nsfw: Schema.optional(Schema.Boolean),
  handler: Schema.optional(
    ApplicationCommandHandlerSchema.annotate({
      description:
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    }),
  ),
}).annotate({ identifier: 'ApplicationCommandResponse' })

export type ApplicationCommandResponse = Schema.Schema.Type<typeof ApplicationCommandResponseSchema>

export const ApplicationCommandUpdateRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 32, {
            expected: 'a string of at most 32 characters',
          }),
        ),
      ),
    ),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
  options: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
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
      ).check(Schema.isMaxLength(25)),
    ),
  ),
  default_member_permissions: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(18014398509481984),
      ),
    ),
  ),
  dm_permission: Schema.optional(Schema.NullOr(Schema.Boolean)),
  contexts: Schema.optional(
    Schema.NullOr(
      Schema.Array(InteractionContextTypeSchema).check(Schema.isMinLength(1), Schema.isUnique()),
    ),
  ),
  integration_types: Schema.optional(
    Schema.NullOr(
      Schema.Array(ApplicationIntegrationTypeSchema).check(
        Schema.isMinLength(1),
        Schema.isUnique(),
      ),
    ),
  ),
  handler: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandHandlerSchema]).annotate({
      description:
        "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    }),
  ),
  type: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), ApplicationCommandTypeSchema])),
  id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
}).annotate({ identifier: 'ApplicationCommandUpdateRequest' })

export type ApplicationCommandUpdateRequest = Schema.Schema.Type<
  typeof ApplicationCommandUpdateRequestSchema
>

export const ApplicationEventWebhooksStatusSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: 'Webhook events are disabled by developer' }),
  Schema.Literal(2).annotate({ description: 'Webhook events are enabled by developer' }),
  Schema.Literal(3).annotate({
    description: 'Webhook events are disabled by Discord, usually due to inactivity',
  }),
]).annotate({ identifier: 'ApplicationEventWebhooksStatus' })

export type ApplicationEventWebhooksStatus = Schema.Schema.Type<
  typeof ApplicationEventWebhooksStatusSchema
>

export const ApplicationExplicitContentFilterTypesSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'inherit guild content filter setting' }),
  Schema.Literal(1).annotate({ description: 'interactions will always be scanned' }),
]).annotate({ identifier: 'ApplicationExplicitContentFilterTypes' })

export type ApplicationExplicitContentFilterTypes = Schema.Schema.Type<
  typeof ApplicationExplicitContentFilterTypesSchema
>

export const ApplicationOAuth2InstallParamsSchema = Schema.Struct({
  scopes: Schema.optional(
    Schema.NullOr(Schema.Array(OAuth2ScopesSchema).check(Schema.isMinLength(1), Schema.isUnique())),
  ),
  permissions: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(18014398509481984),
      ),
    ),
  ),
}).annotate({ identifier: 'ApplicationOAuth2InstallParams' })

export type ApplicationOAuth2InstallParams = Schema.Schema.Type<
  typeof ApplicationOAuth2InstallParamsSchema
>

export const ApplicationIntegrationTypeConfigurationSchema = Schema.Struct({
  oauth2_install_params: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ApplicationOAuth2InstallParamsSchema]),
  ),
}).annotate({ identifier: 'ApplicationIntegrationTypeConfiguration' })

export type ApplicationIntegrationTypeConfiguration = Schema.Schema.Type<
  typeof ApplicationIntegrationTypeConfigurationSchema
>

export const ApplicationFormPartialSchema = Schema.Struct({
  description: Schema.optional(
    Schema.NullOr(
      Schema.Struct({
        default: Schema.String.check(
          Schema.makeFilter((input) => [...input].length <= 400, {
            expected: 'a string of at most 400 characters',
          }),
        ),
        localizations: Schema.optional(
          Schema.NullOr(
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 400, {
                  expected: 'a string of at most 400 characters',
                }),
              ),
            ),
          ),
        ),
      }),
    ),
  ),
  icon: Schema.optional(Schema.NullOr(Schema.String)),
  cover_image: Schema.optional(Schema.NullOr(Schema.String)),
  team_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  interactions_endpoint_url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  explicit_content_filter: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ApplicationExplicitContentFilterTypesSchema]),
  ),
  max_participants: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(-1))),
  ),
  type: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), ApplicationTypesSchema])),
  tags: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length <= 20, {
            expected: 'a string of at most 20 characters',
          }),
        ),
      ).check(Schema.isMaxLength(5), Schema.isUnique()),
    ),
  ),
  custom_install_url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  install_params: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ApplicationOAuth2InstallParamsSchema]),
  ),
  role_connections_verification_url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  integration_types_config: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.Union([Schema.NullOr(Schema.Null), ApplicationIntegrationTypeConfigurationSchema]),
      ),
    ),
  ),
  event_webhooks_status: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ApplicationEventWebhooksStatusSchema]),
  ),
  event_webhooks_url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ).annotate({ description: 'Event webhooks URL for the app to receive webhook events' }),
  ),
  event_webhooks_types: Schema.optional(
    Schema.NullOr(Schema.Array(ActionTypesSchema).check(Schema.isUnique())),
  ),
}).annotate({ identifier: 'ApplicationFormPartial' })

export type ApplicationFormPartial = Schema.Schema.Type<typeof ApplicationFormPartialSchema>

export const ApplicationIdentityProviderAuthTypeSchema = Schema.Union([
  Schema.Literal('OIDC'),
  Schema.Literal('EPIC_ONLINE_SERVICES_ACCESS_TOKEN'),
  Schema.Literal('EPIC_ONLINE_SERVICES_ID_TOKEN'),
  Schema.Literal('STEAM_SESSION_TICKET'),
  Schema.Literal('UNITY_SERVICES_ID_TOKEN'),
  Schema.Literal('DISCORD_BOT_ISSUED_ACCESS_TOKEN'),
  Schema.Literal('APPLE_ID_TOKEN'),
  Schema.Literal('PLAYSTATION_NETWORK_ID_TOKEN'),
]).annotate({ identifier: 'ApplicationIdentityProviderAuthType' })

export type ApplicationIdentityProviderAuthType = Schema.Schema.Type<
  typeof ApplicationIdentityProviderAuthTypeSchema
>

export const WebhookTypesSchema = Schema.Union([
  Schema.Literal(1).annotate({
    description: 'Incoming Webhooks can post messages to channels with a generated token',
  }),
  Schema.Literal(2).annotate({
    description:
      'Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels',
  }),
  Schema.Literal(3).annotate({
    description: 'Application webhooks are webhooks used with Interactions',
  }),
]).annotate({ identifier: 'WebhookTypes' })

export type WebhookTypes = Schema.Schema.Type<typeof WebhookTypesSchema>

export const ApplicationIncomingWebhookResponseSchema = Schema.Struct({
  application_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  avatar: Schema.NullOr(Schema.String),
  channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  guild_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  id: SnowflakeTypeSchema,
  name: Schema.String,
  type: WebhookTypesSchema,
  user: Schema.optional(UserResponseSchema),
}).annotate({ identifier: 'ApplicationIncomingWebhookResponse' })

export type ApplicationIncomingWebhookResponse = Schema.Schema.Type<
  typeof ApplicationIncomingWebhookResponseSchema
>

export const MetadataItemTypesSchema = Schema.Union([
  Schema.Literal(1).annotate({
    description:
      "the metadata value (integer) is less than or equal to the guild's configured value (integer)",
  }),
  Schema.Literal(2).annotate({
    description:
      "the metadata value (integer) is greater than or equal to the guild's configured value (integer)",
  }),
  Schema.Literal(3).annotate({
    description: "the metadata value (integer) is equal to the guild's configured value (integer)",
  }),
  Schema.Literal(4).annotate({
    description:
      "the metadata value (integer) is not equal to the guild's configured value (integer)",
  }),
  Schema.Literal(5).annotate({
    description:
      "the metadata value (ISO8601 string) is less than or equal to the guild's configured value (integer; days before current date)",
  }),
  Schema.Literal(6).annotate({
    description:
      "the metadata value (ISO8601 string) is greater than or equal to the guild's configured value (integer; days before current date)",
  }),
  Schema.Literal(7).annotate({
    description:
      "the metadata value (integer) is equal to the guild's configured value (integer; 1)",
  }),
  Schema.Literal(8).annotate({
    description:
      "the metadata value (integer) is not equal to the guild's configured value (integer; 1)",
  }),
]).annotate({ identifier: 'MetadataItemTypes' })

export type MetadataItemTypes = Schema.Schema.Type<typeof MetadataItemTypesSchema>

export const ApplicationRoleConnectionsMetadataItemRequestSchema = Schema.Struct({
  type: MetadataItemTypesSchema,
  key: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 50, {
      expected: 'a string of at most 50 characters',
    }),
  ),
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  name_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.NullOr(
          Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 100, {
              expected: 'a string of at most 100 characters',
            }),
          ),
        ),
      ),
    ),
  ),
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 200, {
      expected: 'a string of at most 200 characters',
    }),
  ),
  description_localizations: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.NullOr(
          Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 200, {
              expected: 'a string of at most 200 characters',
            }),
          ),
        ),
      ),
    ),
  ),
}).annotate({ identifier: 'ApplicationRoleConnectionsMetadataItemRequest' })

export type ApplicationRoleConnectionsMetadataItemRequest = Schema.Schema.Type<
  typeof ApplicationRoleConnectionsMetadataItemRequestSchema
>

export const ApplicationRoleConnectionsMetadataItemResponseSchema = Schema.Struct({
  type: MetadataItemTypesSchema,
  key: Schema.String,
  name: Schema.String,
  name_localizations: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
  description: Schema.String,
  description_localizations: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  ),
}).annotate({ identifier: 'ApplicationRoleConnectionsMetadataItemResponse' })

export type ApplicationRoleConnectionsMetadataItemResponse = Schema.Schema.Type<
  typeof ApplicationRoleConnectionsMetadataItemResponseSchema
>

export const ApplicationUserRoleConnectionResponseSchema = Schema.Struct({
  platform_name: Schema.optional(Schema.String),
  platform_username: Schema.optional(Schema.NullOr(Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
}).annotate({ identifier: 'ApplicationUserRoleConnectionResponse' })

export type ApplicationUserRoleConnectionResponse = Schema.Schema.Type<
  typeof ApplicationUserRoleConnectionResponseSchema
>

export const AuditLogActionTypesSchema = Schema.Union([
  Schema.Literal(1),
  Schema.Literal(10),
  Schema.Literal(11),
  Schema.Literal(12),
  Schema.Literal(13),
  Schema.Literal(14),
  Schema.Literal(15),
  Schema.Literal(16).annotate({ description: 'Channels were reordered' }),
  Schema.Literal(20),
  Schema.Literal(21),
  Schema.Literal(22),
  Schema.Literal(23),
  Schema.Literal(24),
  Schema.Literal(25),
  Schema.Literal(26),
  Schema.Literal(27),
  Schema.Literal(28),
  Schema.Literal(30),
  Schema.Literal(31),
  Schema.Literal(32),
  Schema.Literal(33).annotate({ description: 'Roles were reordered' }),
  Schema.Literal(40),
  Schema.Literal(41),
  Schema.Literal(42),
  Schema.Literal(50),
  Schema.Literal(51),
  Schema.Literal(52),
  Schema.Literal(60),
  Schema.Literal(61),
  Schema.Literal(62),
  Schema.Literal(72),
  Schema.Literal(73),
  Schema.Literal(74),
  Schema.Literal(75),
  Schema.Literal(80),
  Schema.Literal(81),
  Schema.Literal(82),
  Schema.Literal(83),
  Schema.Literal(84),
  Schema.Literal(85),
  Schema.Literal(90),
  Schema.Literal(91),
  Schema.Literal(92),
  Schema.Literal(100),
  Schema.Literal(101),
  Schema.Literal(102),
  Schema.Literal(110),
  Schema.Literal(111),
  Schema.Literal(112),
  Schema.Literal(121),
  Schema.Literal(130),
  Schema.Literal(131),
  Schema.Literal(132),
  Schema.Literal(140),
  Schema.Literal(141),
  Schema.Literal(142),
  Schema.Literal(143),
  Schema.Literal(144),
  Schema.Literal(145),
  Schema.Literal(146),
  Schema.Literal(150),
  Schema.Literal(151),
  Schema.Literal(163),
  Schema.Literal(164),
  Schema.Literal(165),
  Schema.Literal(166),
  Schema.Literal(167),
  Schema.Literal(171),
  Schema.Literal(172),
  Schema.Literal(180),
  Schema.Literal(190),
  Schema.Literal(191),
  Schema.Literal(192),
  Schema.Literal(193),
  Schema.Literal(200).annotate({ description: 'Scheduled event exception was created' }),
  Schema.Literal(201).annotate({ description: 'Scheduled event exception was updated' }),
  Schema.Literal(202).annotate({ description: 'Scheduled event exception was deleted' }),
  Schema.Literal(211),
]).annotate({ identifier: 'AuditLogActionTypes' })

export type AuditLogActionTypes = Schema.Schema.Type<typeof AuditLogActionTypesSchema>

export const AuditLogObjectChangeResponseSchema = Schema.Struct({
  key: Schema.NullOr(Schema.String),
  new_value: Schema.optional(Schema.Unknown),
  old_value: Schema.optional(Schema.Unknown),
}).annotate({ identifier: 'AuditLogObjectChangeResponse' })

export type AuditLogObjectChangeResponse = Schema.Schema.Type<
  typeof AuditLogObjectChangeResponseSchema
>

export const AuditLogEntryResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  action_type: AuditLogActionTypesSchema,
  user_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  target_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  changes: Schema.optional(Schema.Array(AuditLogObjectChangeResponseSchema)),
  options: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  reason: Schema.optional(Schema.String),
}).annotate({ identifier: 'AuditLogEntryResponse' })

export type AuditLogEntryResponse = Schema.Schema.Type<typeof AuditLogEntryResponseSchema>

export const AuthorTypeSchema = Schema.Union([
  Schema.Literal('user'),
  Schema.Literal('bot'),
  Schema.Literal('webhook'),
  Schema.Literal('-user'),
  Schema.Literal('-bot'),
  Schema.Literal('-webhook'),
]).annotate({ identifier: 'AuthorType' })

export type AuthorType = Schema.Schema.Type<typeof AuthorTypeSchema>

export const AutomodActionTypeSchema = Schema.Union([
  Schema.Literal(1).annotate({
    description:
      "Block a user's message and prevent it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked",
  }),
  Schema.Literal(2).annotate({
    description:
      'Send a system message to a channel in order to log the user message that triggered the rule',
  }),
  Schema.Literal(3).annotate({
    description: "Temporarily disable a user's ability to communicate in the server (timeout)",
  }),
  Schema.Literal(4).annotate({ description: 'Prevent a user from interacting in the server' }),
]).annotate({ identifier: 'AutomodActionType' })

export type AutomodActionType = Schema.Schema.Type<typeof AutomodActionTypeSchema>

export const AutomodEventTypeSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: 'A user submitted a message to a channel' }),
  Schema.Literal(2).annotate({
    description: "A user is attempting to join the server or a member's properties were updated.",
  }),
]).annotate({ identifier: 'AutomodEventType' })

export type AutomodEventType = Schema.Schema.Type<typeof AutomodEventTypeSchema>

export const AutomodKeywordPresetTypeSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: 'Words and phrases that may be considered profanity' }),
  Schema.Literal(2).annotate({
    description: 'Words and phrases that may be considered as sexual content',
  }),
  Schema.Literal(3).annotate({
    description: 'Words and phrases that may be considered slurs and hate speech',
  }),
]).annotate({ identifier: 'AutomodKeywordPresetType' })

export type AutomodKeywordPresetType = Schema.Schema.Type<typeof AutomodKeywordPresetTypeSchema>

export const AutomodTriggerTypeSchema = Schema.Union([
  Schema.Literal(1).annotate({
    description: 'Check if content contains words from a list of keywords or matches regex',
  }),
  Schema.Literal(3).annotate({ description: 'Check if content represents generic spam' }),
  Schema.Literal(4).annotate({
    description: 'Check if content contains words from internal pre-defined wordsets',
  }),
  Schema.Literal(5).annotate({
    description: 'Check if content contains more unique mentions than allowed',
  }),
  Schema.Literal(6).annotate({
    description:
      'Check if user profile fields contains words from a list of keywords or matches regex',
  }),
]).annotate({ identifier: 'AutomodTriggerType' })

export type AutomodTriggerType = Schema.Schema.Type<typeof AutomodTriggerTypeSchema>

export const AvailableLocalesEnumSchema = Schema.Union([
  Schema.Literal('ar').annotate({ description: 'The ar locale' }),
  Schema.Literal('bg').annotate({ description: 'The bg locale' }),
  Schema.Literal('cs').annotate({ description: 'The cs locale' }),
  Schema.Literal('da').annotate({ description: 'The da locale' }),
  Schema.Literal('de').annotate({ description: 'The de locale' }),
  Schema.Literal('el').annotate({ description: 'The el locale' }),
  Schema.Literal('en-GB').annotate({ description: 'The en-GB locale' }),
  Schema.Literal('en-US').annotate({ description: 'The en-US locale' }),
  Schema.Literal('es-419').annotate({ description: 'The es-419 locale' }),
  Schema.Literal('es-ES').annotate({ description: 'The es-ES locale' }),
  Schema.Literal('fi').annotate({ description: 'The fi locale' }),
  Schema.Literal('fr').annotate({ description: 'The fr locale' }),
  Schema.Literal('he').annotate({ description: 'The he locale' }),
  Schema.Literal('hi').annotate({ description: 'The hi locale' }),
  Schema.Literal('hr').annotate({ description: 'The hr locale' }),
  Schema.Literal('hu').annotate({ description: 'The hu locale' }),
  Schema.Literal('id').annotate({ description: 'The id locale' }),
  Schema.Literal('it').annotate({ description: 'The it locale' }),
  Schema.Literal('ja').annotate({ description: 'The ja locale' }),
  Schema.Literal('ko').annotate({ description: 'The ko locale' }),
  Schema.Literal('lt').annotate({ description: 'The lt locale' }),
  Schema.Literal('nl').annotate({ description: 'The nl locale' }),
  Schema.Literal('no').annotate({ description: 'The no locale' }),
  Schema.Literal('pl').annotate({ description: 'The pl locale' }),
  Schema.Literal('pt-BR').annotate({ description: 'The pt-BR locale' }),
  Schema.Literal('ro').annotate({ description: 'The ro locale' }),
  Schema.Literal('ru').annotate({ description: 'The ru locale' }),
  Schema.Literal('sv-SE').annotate({ description: 'The sv-SE locale' }),
  Schema.Literal('th').annotate({ description: 'The th locale' }),
  Schema.Literal('tr').annotate({ description: 'The tr locale' }),
  Schema.Literal('uk').annotate({ description: 'The uk locale' }),
  Schema.Literal('vi').annotate({ description: 'The vi locale' }),
  Schema.Literal('zh-CN').annotate({ description: 'The zh-CN locale' }),
  Schema.Literal('zh-TW').annotate({ description: 'The zh-TW locale' }),
]).annotate({ identifier: 'AvailableLocalesEnum' })

export type AvailableLocalesEnum = Schema.Schema.Type<typeof AvailableLocalesEnumSchema>

export const BanUserFromGuildRequestSchema = Schema.Struct({
  delete_message_seconds: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(604800),
      ),
    ),
  ),
  delete_message_days: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(7),
      ),
    ),
  ),
}).annotate({ identifier: 'BanUserFromGuildRequest' })

export type BanUserFromGuildRequest = Schema.Schema.Type<typeof BanUserFromGuildRequestSchema>

export const RichEmbedAuthorSchema = Schema.Struct({
  name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 256, {
          expected: 'a string of at most 256 characters',
        }),
      ),
    ),
  ),
  url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  icon_url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'RichEmbedAuthor' })

export type RichEmbedAuthor = Schema.Schema.Type<typeof RichEmbedAuthorSchema>

export const RichEmbedImageSchema = Schema.Struct({
  url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  width: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  height: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 64, {
          expected: 'a string of at most 64 characters',
        }),
      ),
    ),
  ),
  placeholder_version: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(2147483647),
      ),
    ),
  ),
  is_animated: Schema.optional(Schema.NullOr(Schema.Boolean)),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 4096, {
          expected: 'a string of at most 4096 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'RichEmbedImage' })

export type RichEmbedImage = Schema.Schema.Type<typeof RichEmbedImageSchema>

export const RichEmbedThumbnailSchema = Schema.Struct({
  url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  width: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  height: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 64, {
          expected: 'a string of at most 64 characters',
        }),
      ),
    ),
  ),
  placeholder_version: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(2147483647),
      ),
    ),
  ),
  is_animated: Schema.optional(Schema.NullOr(Schema.Boolean)),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 4096, {
          expected: 'a string of at most 4096 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'RichEmbedThumbnail' })

export type RichEmbedThumbnail = Schema.Schema.Type<typeof RichEmbedThumbnailSchema>

export const RichEmbedFooterSchema = Schema.Struct({
  text: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  icon_url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'RichEmbedFooter' })

export type RichEmbedFooter = Schema.Schema.Type<typeof RichEmbedFooterSchema>

export const RichEmbedFieldSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 256, {
      expected: 'a string of at most 256 characters',
    }),
  ),
  value: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 1024, {
      expected: 'a string of at most 1024 characters',
    }),
  ),
  inline: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'RichEmbedField' })

export type RichEmbedField = Schema.Schema.Type<typeof RichEmbedFieldSchema>

export const RichEmbedProviderSchema = Schema.Struct({
  name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 256, {
          expected: 'a string of at most 256 characters',
        }),
      ),
    ),
  ),
  url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'RichEmbedProvider' })

export type RichEmbedProvider = Schema.Schema.Type<typeof RichEmbedProviderSchema>

export const RichEmbedVideoSchema = Schema.Struct({
  url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  width: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  height: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 64, {
          expected: 'a string of at most 64 characters',
        }),
      ),
    ),
  ),
  placeholder_version: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(2147483647),
      ),
    ),
  ),
  is_animated: Schema.optional(Schema.NullOr(Schema.Boolean)),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 4096, {
          expected: 'a string of at most 4096 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'RichEmbedVideo' })

export type RichEmbedVideo = Schema.Schema.Type<typeof RichEmbedVideoSchema>

export const RichEmbedAudioSchema = Schema.Struct({
  url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 4096, {
          expected: 'a string of at most 4096 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'RichEmbedAudio' })

export type RichEmbedAudio = Schema.Schema.Type<typeof RichEmbedAudioSchema>

export const RichEmbedSchema = Schema.Struct({
  type: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  title: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 256, {
          expected: 'a string of at most 256 characters',
        }),
      ),
    ),
  ),
  color: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(16777215),
      ),
    ),
  ),
  timestamp: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 4096, {
          expected: 'a string of at most 4096 characters',
        }),
      ),
    ),
  ),
  author: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), RichEmbedAuthorSchema])),
  image: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), RichEmbedImageSchema])),
  thumbnail: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), RichEmbedThumbnailSchema])),
  footer: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), RichEmbedFooterSchema])),
  fields: Schema.optional(
    Schema.NullOr(Schema.Array(RichEmbedFieldSchema).check(Schema.isMaxLength(25))),
  ),
  provider: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), RichEmbedProviderSchema])),
  video: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), RichEmbedVideoSchema])),
  audio: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), RichEmbedAudioSchema])),
}).annotate({ identifier: 'RichEmbed' })

export type RichEmbed = Schema.Schema.Type<typeof RichEmbedSchema>

export const MessageAllowedMentionsRequestSchema = Schema.Struct({
  parse: Schema.optional(
    Schema.NullOr(
      Schema.Array(Schema.Union([Schema.NullOr(Schema.Null), AllowedMentionTypesSchema])).check(
        Schema.isMaxLength(1521),
        Schema.isUnique(),
      ),
    ),
  ),
  users: Schema.optional(
    Schema.NullOr(
      Schema.Array(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])).check(
        Schema.isMaxLength(100),
        Schema.isUnique(),
      ),
    ),
  ),
  roles: Schema.optional(
    Schema.NullOr(
      Schema.Array(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])).check(
        Schema.isMaxLength(100),
        Schema.isUnique(),
      ),
    ),
  ),
  replied_user: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'MessageAllowedMentionsRequest' })

export type MessageAllowedMentionsRequest = Schema.Schema.Type<
  typeof MessageAllowedMentionsRequestSchema
>

export const UnfurledMediaRequestWithAttachmentReferenceRequiredSchema = Schema.Struct({
  url: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length <= 2048, {
      expected: 'a string of at most 2048 characters',
    }),
  ),
}).annotate({ identifier: 'UnfurledMediaRequestWithAttachmentReferenceRequired' })

export type UnfurledMediaRequestWithAttachmentReferenceRequired = Schema.Schema.Type<
  typeof UnfurledMediaRequestWithAttachmentReferenceRequiredSchema
>

export const FileComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  spoiler: Schema.optional(Schema.NullOr(Schema.Boolean)),
  file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
}).annotate({ identifier: 'FileComponentForMessageRequest' })

export type FileComponentForMessageRequest = Schema.Schema.Type<
  typeof FileComponentForMessageRequestSchema
>

export const UnfurledMediaRequestSchema = Schema.Struct({
  url: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length <= 2048, {
      expected: 'a string of at most 2048 characters',
    }),
  ),
}).annotate({ identifier: 'UnfurledMediaRequest' })

export type UnfurledMediaRequest = Schema.Schema.Type<typeof UnfurledMediaRequestSchema>

export const MediaGalleryItemForMessageRequestSchema = Schema.Struct({
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 1024, {
          expected: 'a string of at most 1024 characters',
        }),
      ),
    ),
  ),
  spoiler: Schema.optional(Schema.NullOr(Schema.Boolean)),
  media: UnfurledMediaRequestSchema,
}).annotate({ identifier: 'MediaGalleryItemForMessageRequest' })

export type MediaGalleryItemForMessageRequest = Schema.Schema.Type<
  typeof MediaGalleryItemForMessageRequestSchema
>

export const MediaGalleryComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  items: Schema.Array(MediaGalleryItemForMessageRequestSchema).check(
    Schema.isMinLength(1),
    Schema.isMaxLength(10),
  ),
}).annotate({ identifier: 'MediaGalleryComponentForMessageRequest' })

export type MediaGalleryComponentForMessageRequest = Schema.Schema.Type<
  typeof MediaGalleryComponentForMessageRequestSchema
>

export const TextDisplayComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  content: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 4000, {
      expected: 'a string of at most 4000 characters',
    }),
  ),
}).annotate({ identifier: 'TextDisplayComponentForMessageRequest' })

export type TextDisplayComponentForMessageRequest = Schema.Schema.Type<
  typeof TextDisplayComponentForMessageRequestSchema
>

export const ThumbnailComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 1024, {
          expected: 'a string of at most 1024 characters',
        }),
      ),
    ),
  ),
  spoiler: Schema.optional(Schema.NullOr(Schema.Boolean)),
  media: UnfurledMediaRequestSchema,
}).annotate({ identifier: 'ThumbnailComponentForMessageRequest' })

export type ThumbnailComponentForMessageRequest = Schema.Schema.Type<
  typeof ThumbnailComponentForMessageRequestSchema
>

export const SectionComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  components: Schema.Array(TextDisplayComponentForMessageRequestSchema).check(
    Schema.isMinLength(1),
    Schema.isMaxLength(3),
  ),
  accessory: Schema.Union([
    ButtonComponentForMessageRequestSchema,
    ThumbnailComponentForMessageRequestSchema,
  ]),
}).annotate({ identifier: 'SectionComponentForMessageRequest' })

export type SectionComponentForMessageRequest = Schema.Schema.Type<
  typeof SectionComponentForMessageRequestSchema
>

export const MessageComponentSeparatorSpacingSizeSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: 'Small spacing' }),
  Schema.Literal(2).annotate({ description: 'Large spacing' }),
]).annotate({ identifier: 'MessageComponentSeparatorSpacingSize' })

export type MessageComponentSeparatorSpacingSize = Schema.Schema.Type<
  typeof MessageComponentSeparatorSpacingSizeSchema
>

export const SeparatorComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  spacing: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MessageComponentSeparatorSpacingSizeSchema]),
  ),
  divider: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'SeparatorComponentForMessageRequest' })

export type SeparatorComponentForMessageRequest = Schema.Schema.Type<
  typeof SeparatorComponentForMessageRequestSchema
>

export const ContainerComponentForMessageRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  accent_color: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(16777215),
      ),
    ),
  ),
  components: Schema.Array(
    Schema.Union([
      ActionRowComponentForMessageRequestSchema,
      FileComponentForMessageRequestSchema,
      MediaGalleryComponentForMessageRequestSchema,
      SectionComponentForMessageRequestSchema,
      SeparatorComponentForMessageRequestSchema,
      TextDisplayComponentForMessageRequestSchema,
    ]),
  ).check(Schema.isMinLength(1), Schema.isMaxLength(40)),
  spoiler: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'ContainerComponentForMessageRequest' })

export type ContainerComponentForMessageRequest = Schema.Schema.Type<
  typeof ContainerComponentForMessageRequestSchema
>

export const MessageAttachmentRequestSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  filename: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 1024, {
          expected: 'a string of at most 1024 characters',
        }),
      ),
    ),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 1024, {
          expected: 'a string of at most 1024 characters',
        }),
      ),
    ),
  ),
  duration_secs: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(2147483647)),
    ),
  ),
  waveform: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 400, {
          expected: 'a string of at most 400 characters',
        }),
      ),
    ),
  ),
  title: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 1024, {
          expected: 'a string of at most 1024 characters',
        }),
      ),
    ),
  ),
  is_spoiler: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'MessageAttachmentRequest' })

export type MessageAttachmentRequest = Schema.Schema.Type<typeof MessageAttachmentRequestSchema>

export const PollEmojiSchema = Schema.Struct({
  id: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
      description: 'The ID of the custom emoji',
    }),
  ),
  name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 32, {
          expected: 'a string of at most 32 characters',
        }),
      ),
    ).annotate({ description: 'The name of the emoji, or the unicode emoji character' }),
  ),
  animated: Schema.optional(
    Schema.NullOr(Schema.Boolean).annotate({ description: 'Whether the emoji is animated' }),
  ),
}).annotate({ identifier: 'PollEmoji' })

export type PollEmoji = Schema.Schema.Type<typeof PollEmojiSchema>

export const PollMediaSchema = Schema.Struct({
  text: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 300, {
          expected: 'a string of at most 300 characters',
        }),
      ),
    ).annotate({ description: 'The text of the field' }),
  ),
  emoji: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), PollEmojiSchema]).annotate({
      description: 'The emoji of the field',
    }),
  ),
}).annotate({ identifier: 'PollMedia' })

export type PollMedia = Schema.Schema.Type<typeof PollMediaSchema>

export const PollEmojiCreateRequestSchema = Schema.Struct({
  id: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
      description: 'The ID of the custom emoji',
    }),
  ),
  name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 32, {
          expected: 'a string of at most 32 characters',
        }),
      ),
    ).annotate({ description: 'The name of the emoji, or the unicode emoji character' }),
  ),
  animated: Schema.optional(
    Schema.NullOr(Schema.Boolean).annotate({ description: 'Whether the emoji is animated' }),
  ),
}).annotate({ identifier: 'PollEmojiCreateRequest' })

export type PollEmojiCreateRequest = Schema.Schema.Type<typeof PollEmojiCreateRequestSchema>

export const PollMediaCreateRequestSchema = Schema.Struct({
  text: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 300, {
          expected: 'a string of at most 300 characters',
        }),
      ),
    ).annotate({ description: 'The text of the field' }),
  ),
  emoji: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), PollEmojiCreateRequestSchema]).annotate({
      description: 'The emoji of the field',
    }),
  ),
}).annotate({ identifier: 'PollMediaCreateRequest' })

export type PollMediaCreateRequest = Schema.Schema.Type<typeof PollMediaCreateRequestSchema>

export const PollAnswerCreateRequestSchema = Schema.Struct({
  poll_media: PollMediaCreateRequestSchema.annotate({ description: 'The data of the answer' }),
}).annotate({ identifier: 'PollAnswerCreateRequest' })

export type PollAnswerCreateRequest = Schema.Schema.Type<typeof PollAnswerCreateRequestSchema>

export const PollLayoutTypesSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: 'The, uhm, default layout type.' }),
]).annotate({ identifier: 'PollLayoutTypes' })

export type PollLayoutTypes = Schema.Schema.Type<typeof PollLayoutTypesSchema>

export const PollCreateRequestSchema = Schema.Struct({
  question: PollMediaSchema.annotate({
    description: 'The question of the poll. Only `text` is supported.',
  }),
  answers: Schema.Array(PollAnswerCreateRequestSchema)
    .check(Schema.isMinLength(1), Schema.isMaxLength(10))
    .annotate({ description: 'Each of the answers available in the poll, up to 10' }),
  allow_multiselect: Schema.optional(
    Schema.NullOr(Schema.Boolean).annotate({
      description: 'Whether a user can select multiple answers',
    }),
  ),
  layout_type: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), PollLayoutTypesSchema]).annotate({
      description: 'The layout type of the poll. Defaults to... DEFAULT!',
    }),
  ),
  duration: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt32(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(768),
      ),
    ).annotate({
      description: 'Number of hours the poll should be open for, up to 32 days. Defaults to 24',
    }),
  ),
}).annotate({ identifier: 'PollCreateRequest' })

export type PollCreateRequest = Schema.Schema.Type<typeof PollCreateRequestSchema>

export const MessageShareCustomUserThemeBaseThemeSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'No base theme' }),
  Schema.Literal(1).annotate({ description: 'Dark base theme' }),
  Schema.Literal(2).annotate({ description: 'Light base theme' }),
  Schema.Literal(3).annotate({ description: 'Darker base theme' }),
  Schema.Literal(4).annotate({ description: 'Midnight base theme' }),
]).annotate({ identifier: 'MessageShareCustomUserThemeBaseTheme' })

export type MessageShareCustomUserThemeBaseTheme = Schema.Schema.Type<
  typeof MessageShareCustomUserThemeBaseThemeSchema
>

export const CustomClientThemeShareRequestSchema = Schema.Struct({
  colors: Schema.Array(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length === 6, {
        expected: 'a string of 6 characters',
      }),
    ),
  ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
  gradient_angle: Schema.Number.check(
    Schema.isInt32(),
    Schema.isGreaterThanOrEqualTo(0),
    Schema.isLessThanOrEqualTo(360),
  ),
  base_mix: Schema.Number.check(
    Schema.isInt32(),
    Schema.isGreaterThanOrEqualTo(0),
    Schema.isLessThanOrEqualTo(100),
  ),
  base_theme: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MessageShareCustomUserThemeBaseThemeSchema]),
  ),
}).annotate({ identifier: 'CustomClientThemeShareRequest' })

export type CustomClientThemeShareRequest = Schema.Schema.Type<
  typeof CustomClientThemeShareRequestSchema
>

export const BaseCreateMessageCreateRequestSchema = Schema.Struct({
  content: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 4000, {
          expected: 'a string of at most 4000 characters',
        }),
      ),
    ),
  ),
  embeds: Schema.optional(
    Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
  ),
  allowed_mentions: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MessageAllowedMentionsRequestSchema]),
  ),
  sticker_ids: Schema.optional(
    Schema.NullOr(Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(3))),
  ),
  components: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      ).check(Schema.isMaxLength(40)),
    ),
  ),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  attachments: Schema.optional(
    Schema.NullOr(Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10))),
  ),
  poll: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), PollCreateRequestSchema])),
  shared_client_theme: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), CustomClientThemeShareRequestSchema]),
  ),
}).annotate({ identifier: 'BaseCreateMessageCreateRequest' })

export type BaseCreateMessageCreateRequest = Schema.Schema.Type<
  typeof BaseCreateMessageCreateRequestSchema
>

export const BasicApplicationResponseWithBotSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  icon: Schema.NullOr(Schema.String),
  description: Schema.String,
  type: Schema.Union([Schema.NullOr(Schema.Null), ApplicationTypesSchema]),
  cover_image: Schema.optional(Schema.String),
  primary_sku_id: Schema.optional(SnowflakeTypeSchema),
  flags: Schema.Number.check(Schema.isInt32()),
  flags_new: Schema.String,
  bot: Schema.optional(UserResponseSchema),
}).annotate({ identifier: 'BasicApplicationResponseWithBot' })

export type BasicApplicationResponseWithBot = Schema.Schema.Type<
  typeof BasicApplicationResponseWithBotSchema
>

export const BasicGuildMemberResponseSchema = Schema.Struct({
  avatar: Schema.NullOr(Schema.String).annotate({ description: "the member's guild avatar hash" }),
  avatar_decoration_data: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UserAvatarDecorationResponseSchema]).annotate({
      description: "data for the member's guild avatar decoration",
    }),
  ),
  banner: Schema.NullOr(Schema.String).annotate({ description: "the member's guild banner hash" }),
  communication_disabled_until: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({
    description:
      "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
  }),
  flags: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'guild member flags represented as a bit set, defaults to 0',
  }),
  joined_at: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({ description: 'when the user joined the guild' }),
  nick: Schema.NullOr(Schema.String).annotate({ description: "this user's guild nickname" }),
  pending: Schema.Boolean.annotate({
    description:
      "whether the user has not yet passed the guild's Membership Screening requirements",
  }),
  premium_since: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'when the user started boosting the guild' }),
  roles: Schema.Array(SnowflakeTypeSchema)
    .check(Schema.isUnique())
    .annotate({ description: 'array of role object ids' }),
  collectibles: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UserCollectiblesResponseSchema]).annotate({
      description: "data for the member's collectibles",
    }),
  ),
}).annotate({ identifier: 'BasicGuildMemberResponse' })

export type BasicGuildMemberResponse = Schema.Schema.Type<typeof BasicGuildMemberResponseSchema>

export const MessageTypeSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: '' }),
  Schema.Literal(1).annotate({ description: '' }),
  Schema.Literal(2).annotate({ description: '' }),
  Schema.Literal(3).annotate({ description: '' }),
  Schema.Literal(4).annotate({ description: '' }),
  Schema.Literal(5).annotate({ description: '' }),
  Schema.Literal(6).annotate({ description: '' }),
  Schema.Literal(7).annotate({ description: '' }),
  Schema.Literal(8).annotate({ description: '' }),
  Schema.Literal(9).annotate({ description: '' }),
  Schema.Literal(10).annotate({ description: '' }),
  Schema.Literal(11).annotate({ description: '' }),
  Schema.Literal(12).annotate({ description: '' }),
  Schema.Literal(14).annotate({ description: '' }),
  Schema.Literal(15).annotate({ description: '' }),
  Schema.Literal(16).annotate({ description: '' }),
  Schema.Literal(17).annotate({ description: '' }),
  Schema.Literal(18).annotate({ description: '' }),
  Schema.Literal(19).annotate({ description: '' }),
  Schema.Literal(20).annotate({ description: '' }),
  Schema.Literal(21).annotate({ description: '' }),
  Schema.Literal(22).annotate({ description: '' }),
  Schema.Literal(23).annotate({ description: '' }),
  Schema.Literal(24).annotate({ description: '' }),
  Schema.Literal(25).annotate({ description: '' }),
  Schema.Literal(26).annotate({ description: '' }),
  Schema.Literal(27).annotate({ description: '' }),
  Schema.Literal(28).annotate({ description: '' }),
  Schema.Literal(29).annotate({ description: '' }),
  Schema.Literal(31).annotate({ description: '' }),
  Schema.Literal(32).annotate({ description: '' }),
  Schema.Literal(36).annotate({ description: '' }),
  Schema.Literal(37).annotate({ description: '' }),
  Schema.Literal(38).annotate({ description: '' }),
  Schema.Literal(39).annotate({ description: '' }),
  Schema.Literal(46).annotate({ description: '' }),
  Schema.Literal(55).annotate({ description: '' }),
]).annotate({ identifier: 'MessageType' })

export type MessageType = Schema.Schema.Type<typeof MessageTypeSchema>

export const MessageAttachmentResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  filename: Schema.String,
  size: Schema.Number.check(Schema.isInt32()),
  url: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  proxy_url: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  width: Schema.optional(Schema.Number.check(Schema.isInt32())),
  height: Schema.optional(Schema.Number.check(Schema.isInt32())),
  duration_secs: Schema.optional(Schema.Number),
  waveform: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  content_type: Schema.optional(Schema.String),
  ephemeral: Schema.optional(Schema.Boolean),
  flags: Schema.optional(Schema.Number.check(Schema.isInt32())),
  placeholder: Schema.optional(Schema.String),
  placeholder_version: Schema.optional(Schema.Number.check(Schema.isInt32())),
  title: Schema.optional(Schema.NullOr(Schema.String)),
  application: Schema.optional(ApplicationResponseSchema),
  clip_created_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  clip_participants: Schema.optional(Schema.Array(UserResponseSchema)),
}).annotate({ identifier: 'MessageAttachmentResponse' })

export type MessageAttachmentResponse = Schema.Schema.Type<typeof MessageAttachmentResponseSchema>

export const MessageEmbedFieldResponseSchema = Schema.Struct({
  name: Schema.String,
  value: Schema.String,
  inline: Schema.Boolean,
}).annotate({ identifier: 'MessageEmbedFieldResponse' })

export type MessageEmbedFieldResponse = Schema.Schema.Type<typeof MessageEmbedFieldResponseSchema>

export const MessageEmbedAuthorResponseSchema = Schema.Struct({
  name: Schema.String,
  url: Schema.optional(Schema.String),
  icon_url: Schema.optional(Schema.String),
  proxy_icon_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
}).annotate({ identifier: 'MessageEmbedAuthorResponse' })

export type MessageEmbedAuthorResponse = Schema.Schema.Type<typeof MessageEmbedAuthorResponseSchema>

export const MessageEmbedProviderResponseSchema = Schema.Struct({
  name: Schema.String,
  url: Schema.optional(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
}).annotate({ identifier: 'MessageEmbedProviderResponse' })

export type MessageEmbedProviderResponse = Schema.Schema.Type<
  typeof MessageEmbedProviderResponseSchema
>

export const UInt32TypeSchema = Schema.Union([
  Schema.BigInt,
  Schema.Number.check(Schema.isInt()),
  Schema.String.check(Schema.isPattern(/^-?\d+$/)),
])
  .pipe(
    Schema.decodeTo(
      Schema.BigInt,
      SchemaTransformation.transform({
        decode: (input) => BigInt(input),
        encode: (output) => output,
      }),
    ),
  )
  .check(
    Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
    Schema.isGreaterThanOrEqualToBigInt(0n),
    Schema.isLessThanOrEqualToBigInt(4294967295n),
  )
  .annotate({ identifier: 'UInt32Type' })

export type UInt32Type = Schema.Schema.Type<typeof UInt32TypeSchema>

export const MessageEmbedImageResponseSchema = Schema.Struct({
  url: Schema.optional(Schema.String),
  proxy_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  width: Schema.optional(UInt32TypeSchema),
  height: Schema.optional(UInt32TypeSchema),
  content_type: Schema.optional(Schema.String),
  placeholder: Schema.optional(Schema.String),
  placeholder_version: Schema.optional(UInt32TypeSchema),
  description: Schema.optional(Schema.String),
  flags: Schema.optional(UInt32TypeSchema),
}).annotate({ identifier: 'MessageEmbedImageResponse' })

export type MessageEmbedImageResponse = Schema.Schema.Type<typeof MessageEmbedImageResponseSchema>

export const MessageEmbedVideoResponseSchema = Schema.Struct({
  url: Schema.optional(Schema.String),
  proxy_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  width: Schema.optional(UInt32TypeSchema),
  height: Schema.optional(UInt32TypeSchema),
  content_type: Schema.optional(Schema.String),
  placeholder: Schema.optional(Schema.String),
  placeholder_version: Schema.optional(UInt32TypeSchema),
  description: Schema.optional(Schema.String),
  flags: Schema.optional(UInt32TypeSchema),
}).annotate({ identifier: 'MessageEmbedVideoResponse' })

export type MessageEmbedVideoResponse = Schema.Schema.Type<typeof MessageEmbedVideoResponseSchema>

export const MessageEmbedAudioResponseSchema = Schema.Struct({
  url: Schema.optional(Schema.String),
  proxy_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  content_type: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
}).annotate({ identifier: 'MessageEmbedAudioResponse' })

export type MessageEmbedAudioResponse = Schema.Schema.Type<typeof MessageEmbedAudioResponseSchema>

export const MessageEmbedFooterResponseSchema = Schema.Struct({
  text: Schema.String,
  icon_url: Schema.optional(Schema.String),
  proxy_icon_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
}).annotate({ identifier: 'MessageEmbedFooterResponse' })

export type MessageEmbedFooterResponse = Schema.Schema.Type<typeof MessageEmbedFooterResponseSchema>

export const ContentScanMetadataResponseSchema = Schema.Struct({
  flags: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'ContentScanMetadataResponse' })

export type ContentScanMetadataResponse = Schema.Schema.Type<
  typeof ContentScanMetadataResponseSchema
>

export const UnfurledMediaResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  url: Schema.String,
  proxy_url: Schema.optional(Schema.String),
  width: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
  height: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
  placeholder: Schema.optional(Schema.NullOr(Schema.String)),
  placeholder_version: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
  content_scan_metadata: Schema.optional(ContentScanMetadataResponseSchema),
  content_type: Schema.optional(Schema.NullOr(Schema.String)),
  flags: Schema.optional(Schema.Number.check(Schema.isInt32())),
  attachment_id: Schema.optional(SnowflakeTypeSchema),
}).annotate({ identifier: 'UnfurledMediaResponse' })

export type UnfurledMediaResponse = Schema.Schema.Type<typeof UnfurledMediaResponseSchema>

export const FileComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  file: UnfurledMediaResponseSchema,
  name: Schema.NullOr(Schema.String),
  size: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
  spoiler: Schema.Boolean,
}).annotate({ identifier: 'FileComponentResponse' })

export type FileComponentResponse = Schema.Schema.Type<typeof FileComponentResponseSchema>

export const MediaGalleryItemResponseSchema = Schema.Struct({
  media: UnfurledMediaResponseSchema,
  description: Schema.NullOr(Schema.String),
  spoiler: Schema.Boolean,
}).annotate({ identifier: 'MediaGalleryItemResponse' })

export type MediaGalleryItemResponse = Schema.Schema.Type<typeof MediaGalleryItemResponseSchema>

export const MediaGalleryComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  items: Schema.Array(MediaGalleryItemResponseSchema),
}).annotate({ identifier: 'MediaGalleryComponentResponse' })

export type MediaGalleryComponentResponse = Schema.Schema.Type<
  typeof MediaGalleryComponentResponseSchema
>

export const TextDisplayComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  content: Schema.String,
}).annotate({ identifier: 'TextDisplayComponentResponse' })

export type TextDisplayComponentResponse = Schema.Schema.Type<
  typeof TextDisplayComponentResponseSchema
>

export const ThumbnailComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  media: UnfurledMediaResponseSchema,
  description: Schema.NullOr(Schema.String),
  spoiler: Schema.Boolean,
}).annotate({ identifier: 'ThumbnailComponentResponse' })

export type ThumbnailComponentResponse = Schema.Schema.Type<typeof ThumbnailComponentResponseSchema>

export const SectionComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  components: Schema.Array(TextDisplayComponentResponseSchema),
  accessory: Schema.Union([ButtonComponentResponseSchema, ThumbnailComponentResponseSchema]),
}).annotate({ identifier: 'SectionComponentResponse' })

export type SectionComponentResponse = Schema.Schema.Type<typeof SectionComponentResponseSchema>

export const SeparatorComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  spacing: MessageComponentSeparatorSpacingSizeSchema,
  divider: Schema.Boolean,
}).annotate({ identifier: 'SeparatorComponentResponse' })

export type SeparatorComponentResponse = Schema.Schema.Type<typeof SeparatorComponentResponseSchema>

export const ContainerComponentResponseSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.Number.check(Schema.isInt32()),
  accent_color: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
  components: Schema.Array(
    Schema.Union([
      ActionRowComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  spoiler: Schema.Boolean,
}).annotate({ identifier: 'ContainerComponentResponse' })

export type ContainerComponentResponse = Schema.Schema.Type<typeof ContainerComponentResponseSchema>

export const MessageEmbedResponseSchema = Schema.Struct({
  type: Schema.String,
  url: Schema.optional(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  color: Schema.optional(Schema.Number.check(Schema.isInt32())),
  timestamp: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  fields: Schema.optional(Schema.Array(MessageEmbedFieldResponseSchema)),
  author: Schema.optional(MessageEmbedAuthorResponseSchema),
  provider: Schema.optional(MessageEmbedProviderResponseSchema),
  image: Schema.optional(MessageEmbedImageResponseSchema),
  thumbnail: Schema.optional(MessageEmbedImageResponseSchema),
  video: Schema.optional(MessageEmbedVideoResponseSchema),
  audio: Schema.optional(MessageEmbedAudioResponseSchema),
  footer: Schema.optional(MessageEmbedFooterResponseSchema),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
  components: Schema.optional(Schema.Array(ContainerComponentResponseSchema)),
}).annotate({ identifier: 'MessageEmbedResponse' })

export type MessageEmbedResponse = Schema.Schema.Type<typeof MessageEmbedResponseSchema>

export const StickerTypesSchema = Schema.Union([
  Schema.Literal(1).annotate({
    description: 'an official sticker in a pack, part of Nitro or in a removed purchasable pack',
  }),
  Schema.Literal(2).annotate({
    description: "a sticker uploaded to a guild for the guild's members",
  }),
]).annotate({ identifier: 'StickerTypes' })

export type StickerTypes = Schema.Schema.Type<typeof StickerTypesSchema>

export const StickerFormatTypesSchema = Schema.Union([
  Schema.Literal(1),
  Schema.Literal(2),
  Schema.Literal(3),
  Schema.Literal(4),
]).annotate({ identifier: 'StickerFormatTypes' })

export type StickerFormatTypes = Schema.Schema.Type<typeof StickerFormatTypesSchema>

export const GuildStickerResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  tags: Schema.String,
  type: StickerTypesSchema,
  format_type: Schema.Union([Schema.NullOr(Schema.Null), StickerFormatTypesSchema]),
  description: Schema.NullOr(Schema.String),
  available: Schema.Boolean,
  guild_id: SnowflakeTypeSchema,
  user: Schema.optional(UserResponseSchema),
}).annotate({ identifier: 'GuildStickerResponse' })

export type GuildStickerResponse = Schema.Schema.Type<typeof GuildStickerResponseSchema>

export const StandardStickerResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  tags: Schema.String,
  type: StickerTypesSchema,
  format_type: Schema.Union([Schema.NullOr(Schema.Null), StickerFormatTypesSchema]),
  description: Schema.NullOr(Schema.String),
  pack_id: SnowflakeTypeSchema,
  sort_value: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'StandardStickerResponse' })

export type StandardStickerResponse = Schema.Schema.Type<typeof StandardStickerResponseSchema>

export const MessageStickerItemResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  format_type: StickerFormatTypesSchema,
}).annotate({ identifier: 'MessageStickerItemResponse' })

export type MessageStickerItemResponse = Schema.Schema.Type<typeof MessageStickerItemResponseSchema>

export const MessageCallResponseSchema = Schema.Struct({
  ended_timestamp: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  participants: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
}).annotate({ identifier: 'MessageCallResponse' })

export type MessageCallResponse = Schema.Schema.Type<typeof MessageCallResponseSchema>

export const MessageActivityResponseSchema = Schema.Struct({
  type: ActivityActionTypesSchema,
  party_id: Schema.optional(Schema.String),
}).annotate({ identifier: 'MessageActivityResponse' })

export type MessageActivityResponse = Schema.Schema.Type<typeof MessageActivityResponseSchema>

export const MessageInteractionResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  name: Schema.String,
  user: Schema.optional(UserResponseSchema),
  name_localized: Schema.optional(Schema.String),
}).annotate({ identifier: 'MessageInteractionResponse' })

export type MessageInteractionResponse = Schema.Schema.Type<typeof MessageInteractionResponseSchema>

export const MessageReferenceTypeSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'Reference to a message' }),
]).annotate({ identifier: 'MessageReferenceType' })

export type MessageReferenceType = Schema.Schema.Type<typeof MessageReferenceTypeSchema>

export const MessageReferenceResponseSchema = Schema.Struct({
  type: MessageReferenceTypeSchema,
  channel_id: SnowflakeTypeSchema,
  message_id: Schema.optional(SnowflakeTypeSchema),
  guild_id: Schema.optional(SnowflakeTypeSchema),
}).annotate({ identifier: 'MessageReferenceResponse' })

export type MessageReferenceResponse = Schema.Schema.Type<typeof MessageReferenceResponseSchema>

export const VideoQualityModesSchema = Schema.Union([
  Schema.Literal(1).annotate({
    description: 'Discord chooses the quality for optimal performance',
  }),
  Schema.Literal(2).annotate({ description: '720p' }),
]).annotate({ identifier: 'VideoQualityModes' })

export type VideoQualityModes = Schema.Schema.Type<typeof VideoQualityModesSchema>

export const ThreadAutoArchiveDurationSchema = Schema.Union([
  Schema.Literal(60).annotate({ description: 'One hour' }),
  Schema.Literal(1440).annotate({ description: 'One day' }),
  Schema.Literal(4320).annotate({ description: 'Three days' }),
  Schema.Literal(10080).annotate({ description: 'Seven days' }),
]).annotate({ identifier: 'ThreadAutoArchiveDuration' })

export type ThreadAutoArchiveDuration = Schema.Schema.Type<typeof ThreadAutoArchiveDurationSchema>

export const ThreadMetadataResponseSchema = Schema.Struct({
  archived: Schema.Boolean,
  archive_timestamp: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  auto_archive_duration: ThreadAutoArchiveDurationSchema,
  locked: Schema.Boolean,
  create_timestamp: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  invitable: Schema.optional(Schema.Boolean),
}).annotate({ identifier: 'ThreadMetadataResponse' })

export type ThreadMetadataResponse = Schema.Schema.Type<typeof ThreadMetadataResponseSchema>

export const GuildMemberResponseSchema = Schema.Struct({
  avatar: Schema.NullOr(Schema.String).annotate({ description: "the member's guild avatar hash" }),
  avatar_decoration_data: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UserAvatarDecorationResponseSchema]).annotate({
      description: "data for the member's guild avatar decoration",
    }),
  ),
  banner: Schema.NullOr(Schema.String).annotate({ description: "the member's guild banner hash" }),
  communication_disabled_until: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({
    description:
      "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
  }),
  flags: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'guild member flags represented as a bit set, defaults to 0',
  }),
  joined_at: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({ description: 'when the user joined the guild' }),
  nick: Schema.NullOr(Schema.String).annotate({ description: "this user's guild nickname" }),
  pending: Schema.Boolean.annotate({
    description:
      "whether the user has not yet passed the guild's Membership Screening requirements",
  }),
  premium_since: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'when the user started boosting the guild' }),
  roles: Schema.Array(SnowflakeTypeSchema)
    .check(Schema.isUnique())
    .annotate({ description: 'array of role object ids' }),
  collectibles: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UserCollectiblesResponseSchema]).annotate({
      description: "data for the member's collectibles",
    }),
  ),
  user: UserResponseSchema.annotate({ description: 'the user this guild member represents' }),
  mute: Schema.Boolean.annotate({ description: 'whether the user is muted in voice channels' }),
  deaf: Schema.Boolean.annotate({ description: 'whether the user is deafened in voice channels' }),
}).annotate({ identifier: 'GuildMemberResponse' })

export type GuildMemberResponse = Schema.Schema.Type<typeof GuildMemberResponseSchema>

export const ThreadMemberResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  join_timestamp: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  flags: Schema.Number.check(Schema.isInt32()),
  member: Schema.optional(GuildMemberResponseSchema),
}).annotate({ identifier: 'ThreadMemberResponse' })

export type ThreadMemberResponse = Schema.Schema.Type<typeof ThreadMemberResponseSchema>

export const ThreadResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  flags: Schema.Number.check(Schema.isInt32()),
  last_pin_timestamp: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  guild_id: SnowflakeTypeSchema,
  name: Schema.String,
  parent_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  rate_limit_per_user: Schema.optional(Schema.Number.check(Schema.isInt32())),
  bitrate: Schema.optional(Schema.Number.check(Schema.isInt32())),
  user_limit: Schema.optional(Schema.Number.check(Schema.isInt32())),
  rtc_region: Schema.optional(Schema.NullOr(Schema.String)),
  video_quality_mode: Schema.optional(VideoQualityModesSchema),
  permissions: Schema.optional(Schema.String),
  owner_id: SnowflakeTypeSchema,
  thread_metadata: ThreadMetadataResponseSchema,
  message_count: Schema.Number.check(Schema.isInt32()),
  member_count: Schema.Number.check(Schema.isInt32()),
  total_message_sent: Schema.Number.check(Schema.isInt32()),
  applied_tags: Schema.optional(Schema.Array(SnowflakeTypeSchema)),
  member: Schema.optional(ThreadMemberResponseSchema),
}).annotate({ identifier: 'ThreadResponse' })

export type ThreadResponse = Schema.Schema.Type<typeof ThreadResponseSchema>

export const MessageMentionChannelResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  type: ChannelTypesSchema,
  guild_id: SnowflakeTypeSchema,
}).annotate({ identifier: 'MessageMentionChannelResponse' })

export type MessageMentionChannelResponse = Schema.Schema.Type<
  typeof MessageMentionChannelResponseSchema
>

export const MessageRoleSubscriptionDataResponseSchema = Schema.Struct({
  role_subscription_listing_id: SnowflakeTypeSchema,
  tier_name: Schema.String,
  total_months_subscribed: Schema.Number.check(Schema.isInt32()),
  is_renewal: Schema.Boolean,
}).annotate({ identifier: 'MessageRoleSubscriptionDataResponse' })

export type MessageRoleSubscriptionDataResponse = Schema.Schema.Type<
  typeof MessageRoleSubscriptionDataResponseSchema
>

export const PurchaseTypeSchema = Schema.Union([Schema.Literal(0)]).annotate({
  identifier: 'PurchaseType',
})

export type PurchaseType = Schema.Schema.Type<typeof PurchaseTypeSchema>

export const GuildProductPurchaseResponseSchema = Schema.Struct({
  listing_id: SnowflakeTypeSchema,
  product_name: Schema.String,
}).annotate({ identifier: 'GuildProductPurchaseResponse' })

export type GuildProductPurchaseResponse = Schema.Schema.Type<
  typeof GuildProductPurchaseResponseSchema
>

export const PurchaseNotificationResponseSchema = Schema.Struct({
  type: PurchaseTypeSchema,
  guild_product_purchase: Schema.optional(GuildProductPurchaseResponseSchema),
}).annotate({ identifier: 'PurchaseNotificationResponse' })

export type PurchaseNotificationResponse = Schema.Schema.Type<
  typeof PurchaseNotificationResponseSchema
>

export const ChannelPermissionOverwritesSchema = Schema.Union([
  Schema.Literal(0),
  Schema.Literal(1),
]).annotate({ identifier: 'ChannelPermissionOverwrites' })

export type ChannelPermissionOverwrites = Schema.Schema.Type<
  typeof ChannelPermissionOverwritesSchema
>

export const ChannelPermissionOverwriteResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: ChannelPermissionOverwritesSchema,
  allow: Schema.String,
  deny: Schema.String,
}).annotate({ identifier: 'ChannelPermissionOverwriteResponse' })

export type ChannelPermissionOverwriteResponse = Schema.Schema.Type<
  typeof ChannelPermissionOverwriteResponseSchema
>

export const ForumTagResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  moderated: Schema.Boolean,
  emoji_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  emoji_name: Schema.NullOr(Schema.String),
}).annotate({ identifier: 'ForumTagResponse' })

export type ForumTagResponse = Schema.Schema.Type<typeof ForumTagResponseSchema>

export const DefaultReactionEmojiResponseSchema = Schema.Struct({
  emoji_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  emoji_name: Schema.NullOr(Schema.String),
}).annotate({ identifier: 'DefaultReactionEmojiResponse' })

export type DefaultReactionEmojiResponse = Schema.Schema.Type<
  typeof DefaultReactionEmojiResponseSchema
>

export const ThreadSortOrderSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'Sort forum posts by activity' }),
  Schema.Literal(1).annotate({
    description: 'Sort forum posts by creation time (from most recent to oldest)',
  }),
]).annotate({ identifier: 'ThreadSortOrder' })

export type ThreadSortOrder = Schema.Schema.Type<typeof ThreadSortOrderSchema>

export const ForumLayoutSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'No default has been set for forum channel' }),
  Schema.Literal(1).annotate({ description: 'Display posts as a list' }),
  Schema.Literal(2).annotate({ description: 'Display posts as a collection of tiles' }),
]).annotate({ identifier: 'ForumLayout' })

export type ForumLayout = Schema.Schema.Type<typeof ForumLayoutSchema>

export const ThreadSearchTagSettingSchema = Schema.Union([
  Schema.Literal('match_all').annotate({
    description: 'The thread tags must contain all tags in the search query',
  }),
  Schema.Literal('match_some').annotate({
    description: 'The thread tags must contain at least one of tags in the search query',
  }),
]).annotate({ identifier: 'ThreadSearchTagSetting' })

export type ThreadSearchTagSetting = Schema.Schema.Type<typeof ThreadSearchTagSettingSchema>

export const GuildChannelResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  flags: Schema.Number.check(Schema.isInt32()),
  last_pin_timestamp: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  guild_id: SnowflakeTypeSchema,
  name: Schema.String,
  parent_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  rate_limit_per_user: Schema.optional(Schema.Number.check(Schema.isInt32())),
  bitrate: Schema.optional(Schema.Number.check(Schema.isInt32())),
  user_limit: Schema.optional(Schema.Number.check(Schema.isInt32())),
  rtc_region: Schema.optional(Schema.NullOr(Schema.String)),
  video_quality_mode: Schema.optional(VideoQualityModesSchema),
  permissions: Schema.optional(Schema.String),
  topic: Schema.optional(Schema.NullOr(Schema.String)),
  default_auto_archive_duration: Schema.optional(ThreadAutoArchiveDurationSchema),
  default_thread_rate_limit_per_user: Schema.optional(Schema.Number.check(Schema.isInt32())),
  position: Schema.Number.check(Schema.isInt32()),
  permission_overwrites: Schema.optional(Schema.Array(ChannelPermissionOverwriteResponseSchema)),
  nsfw: Schema.optional(Schema.Boolean),
  available_tags: Schema.optional(Schema.Array(ForumTagResponseSchema)),
  default_reaction_emoji: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), DefaultReactionEmojiResponseSchema]),
  ),
  default_sort_order: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ThreadSortOrderSchema]),
  ),
  default_forum_layout: Schema.optional(ForumLayoutSchema),
  default_tag_setting: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ThreadSearchTagSettingSchema]),
  ),
}).annotate({ identifier: 'GuildChannelResponse' })

export type GuildChannelResponse = Schema.Schema.Type<typeof GuildChannelResponseSchema>

export const PrivateChannelResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  flags: Schema.Number.check(Schema.isInt32()),
  last_pin_timestamp: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  recipients: Schema.Array(UserResponseSchema),
}).annotate({ identifier: 'PrivateChannelResponse' })

export type PrivateChannelResponse = Schema.Schema.Type<typeof PrivateChannelResponseSchema>

export const PrivateGroupChannelResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  flags: Schema.Number.check(Schema.isInt32()),
  last_pin_timestamp: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  recipients: Schema.Array(UserResponseSchema),
  name: Schema.NullOr(Schema.String),
  icon: Schema.NullOr(Schema.String),
  owner_id: SnowflakeTypeSchema,
  managed: Schema.optional(Schema.Boolean),
  application_id: Schema.optional(SnowflakeTypeSchema),
}).annotate({ identifier: 'PrivateGroupChannelResponse' })

export type PrivateGroupChannelResponse = Schema.Schema.Type<
  typeof PrivateGroupChannelResponseSchema
>

export const GuildRoleColorsResponseSchema = Schema.Struct({
  primary_color: Schema.Number.check(Schema.isInt32()),
  secondary_color: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
  tertiary_color: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
}).annotate({ identifier: 'GuildRoleColorsResponse' })

export type GuildRoleColorsResponse = Schema.Schema.Type<typeof GuildRoleColorsResponseSchema>

export const GuildRoleTagsResponseSchema = Schema.Struct({
  premium_subscriber: Schema.optional(Schema.NullOr(Schema.Null)),
  bot_id: Schema.optional(SnowflakeTypeSchema),
  integration_id: Schema.optional(SnowflakeTypeSchema),
  subscription_listing_id: Schema.optional(SnowflakeTypeSchema),
  available_for_purchase: Schema.optional(Schema.NullOr(Schema.Null)),
  guild_connections: Schema.optional(Schema.NullOr(Schema.Null)),
}).annotate({ identifier: 'GuildRoleTagsResponse' })

export type GuildRoleTagsResponse = Schema.Schema.Type<typeof GuildRoleTagsResponseSchema>

export const GuildRoleResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  permissions: Schema.String,
  position: Schema.Number.check(Schema.isInt32()),
  color: Schema.Number.check(Schema.isInt32()),
  colors: GuildRoleColorsResponseSchema,
  hoist: Schema.Boolean,
  managed: Schema.Boolean,
  mentionable: Schema.Boolean,
  icon: Schema.NullOr(Schema.String),
  unicode_emoji: Schema.NullOr(Schema.String),
  tags: Schema.optional(GuildRoleTagsResponseSchema),
  flags: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'GuildRoleResponse' })

export type GuildRoleResponse = Schema.Schema.Type<typeof GuildRoleResponseSchema>

export const ResolvedObjectsResponseSchema = Schema.Struct({
  users: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, UserResponseSchema))),
  members: Schema.optional(
    Schema.NullOr(Schema.Record(Schema.String, BasicGuildMemberResponseSchema)),
  ),
  channels: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.Union([
          GuildChannelResponseSchema,
          PrivateChannelResponseSchema,
          PrivateGroupChannelResponseSchema,
          ThreadResponseSchema,
        ]),
      ),
    ),
  ),
  roles: Schema.optional(Schema.NullOr(Schema.Record(Schema.String, GuildRoleResponseSchema))),
}).annotate({ identifier: 'ResolvedObjectsResponse' })

export type ResolvedObjectsResponse = Schema.Schema.Type<typeof ResolvedObjectsResponseSchema>

export const MessageReactionEmojiResponseSchema = Schema.Struct({
  id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  name: Schema.NullOr(Schema.String),
  animated: Schema.optional(Schema.Boolean),
}).annotate({ identifier: 'MessageReactionEmojiResponse' })

export type MessageReactionEmojiResponse = Schema.Schema.Type<
  typeof MessageReactionEmojiResponseSchema
>

export const PollMediaResponseSchema = Schema.Struct({
  text: Schema.optional(Schema.String.annotate({ description: 'The text of the field' })),
  emoji: Schema.optional(
    MessageReactionEmojiResponseSchema.annotate({ description: 'The emoji of the field' }),
  ),
}).annotate({ identifier: 'PollMediaResponse' })

export type PollMediaResponse = Schema.Schema.Type<typeof PollMediaResponseSchema>

export const PollAnswerResponseSchema = Schema.Struct({
  answer_id: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The ID of the answer',
  }),
  poll_media: PollMediaResponseSchema.annotate({ description: 'The data of the answer' }),
}).annotate({ identifier: 'PollAnswerResponse' })

export type PollAnswerResponse = Schema.Schema.Type<typeof PollAnswerResponseSchema>

export const PollResultsEntryResponseSchema = Schema.Struct({
  id: Schema.Number.check(Schema.isInt32()).annotate({ description: 'The answer_id' }),
  count: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The number of votes for this answer',
  }),
  me_voted: Schema.Boolean.annotate({
    description: 'Whether the current user voted for this answer',
  }),
}).annotate({ identifier: 'PollResultsEntryResponse' })

export type PollResultsEntryResponse = Schema.Schema.Type<typeof PollResultsEntryResponseSchema>

export const PollResultsResponseSchema = Schema.Struct({
  answer_counts: Schema.Array(PollResultsEntryResponseSchema).annotate({
    description: 'The counts for each answer',
  }),
  is_finalized: Schema.Boolean.annotate({
    description: 'Whether the votes have been precisely counted',
  }),
}).annotate({ identifier: 'PollResultsResponse' })

export type PollResultsResponse = Schema.Schema.Type<typeof PollResultsResponseSchema>

export const PollResponseSchema = Schema.Struct({
  question: PollMediaResponseSchema.annotate({
    description: 'The question of the poll. Only `text` is supported.',
  }),
  answers: Schema.Array(PollAnswerResponseSchema).annotate({
    description: 'Each of the answers available in the poll',
  }),
  expiry: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({ description: 'The time when the poll ends' }),
  allow_multiselect: Schema.Boolean.annotate({
    description: 'Whether a user can select multiple answers',
  }),
  layout_type: PollLayoutTypesSchema.annotate({ description: 'The layout type of the poll' }),
  results: PollResultsResponseSchema.annotate({ description: 'The results of the poll' }),
}).annotate({ identifier: 'PollResponse' })

export type PollResponse = Schema.Schema.Type<typeof PollResponseSchema>

export const CustomClientThemeResponseSchema = Schema.Struct({
  colors: Schema.Array(Schema.String),
  gradient_angle: Schema.Number.check(Schema.isInt32()),
  base_mix: Schema.Number.check(Schema.isInt32()),
  base_theme: MessageShareCustomUserThemeBaseThemeSchema,
}).annotate({ identifier: 'CustomClientThemeResponse' })

export type CustomClientThemeResponse = Schema.Schema.Type<typeof CustomClientThemeResponseSchema>

export const MessageComponentInteractionMetadataResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  user: Schema.optional(UserResponseSchema),
  authorizing_integration_owners: Schema.Record(Schema.String, SnowflakeTypeSchema),
  original_response_message_id: Schema.optional(SnowflakeTypeSchema),
  interacted_message_id: SnowflakeTypeSchema,
}).annotate({ identifier: 'MessageComponentInteractionMetadataResponse' })

export type MessageComponentInteractionMetadataResponse = Schema.Schema.Type<
  typeof MessageComponentInteractionMetadataResponseSchema
>

export const ModalSubmitInteractionMetadataResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  user: Schema.optional(UserResponseSchema),
  authorizing_integration_owners: Schema.Record(Schema.String, SnowflakeTypeSchema),
  original_response_message_id: Schema.optional(SnowflakeTypeSchema),
  triggering_interaction_metadata: Schema.Union([
    ApplicationCommandInteractionMetadataResponseSchema,
    MessageComponentInteractionMetadataResponseSchema,
  ]),
}).annotate({ identifier: 'ModalSubmitInteractionMetadataResponse' })

export type ModalSubmitInteractionMetadataResponse = Schema.Schema.Type<
  typeof ModalSubmitInteractionMetadataResponseSchema
>

export const MinimalContentMessageResponseSchema = Schema.Struct({
  type: MessageTypeSchema,
  content: Schema.String,
  mentions: Schema.Array(UserResponseSchema),
  mention_roles: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  attachments: Schema.Array(MessageAttachmentResponseSchema),
  embeds: Schema.Array(MessageEmbedResponseSchema),
  timestamp: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  edited_timestamp: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  flags: Schema.Number.check(Schema.isInt32()),
  components: Schema.Array(
    Schema.Union([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: Schema.optional(
    Schema.Array(Schema.Union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  ),
  sticker_items: Schema.optional(Schema.Array(MessageStickerItemResponseSchema)),
}).annotate({ identifier: 'MinimalContentMessageResponse' })

export type MinimalContentMessageResponse = Schema.Schema.Type<
  typeof MinimalContentMessageResponseSchema
>

export const MessageSnapshotResponseSchema = Schema.Struct({
  message: MinimalContentMessageResponseSchema,
}).annotate({ identifier: 'MessageSnapshotResponse' })

export type MessageSnapshotResponse = Schema.Schema.Type<typeof MessageSnapshotResponseSchema>

export const MessageLobbyMemberResponseSchema = Schema.Struct({
  additional_name: Schema.String,
}).annotate({ identifier: 'MessageLobbyMemberResponse' })

export type MessageLobbyMemberResponse = Schema.Schema.Type<typeof MessageLobbyMemberResponseSchema>

export const BasicMessageResponseSchema = Schema.Struct({
  type: MessageTypeSchema,
  content: Schema.String,
  mentions: Schema.Array(UserResponseSchema),
  mention_roles: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  attachments: Schema.Array(MessageAttachmentResponseSchema),
  embeds: Schema.Array(MessageEmbedResponseSchema),
  timestamp: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  edited_timestamp: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  flags: Schema.Number.check(Schema.isInt32()),
  components: Schema.Array(
    Schema.Union([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: Schema.optional(
    Schema.Array(Schema.Union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  ),
  sticker_items: Schema.optional(Schema.Array(MessageStickerItemResponseSchema)),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: Schema.Boolean,
  mention_everyone: Schema.Boolean,
  tts: Schema.Boolean,
  call: Schema.optional(MessageCallResponseSchema),
  activity: Schema.optional(MessageActivityResponseSchema),
  application: Schema.optional(BasicApplicationResponseWithBotSchema),
  application_id: Schema.optional(SnowflakeTypeSchema),
  interaction: Schema.optional(MessageInteractionResponseSchema),
  nonce: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
          Schema.isGreaterThanOrEqualToBigInt(-9223372036854776000n),
          Schema.isLessThanOrEqualToBigInt(9223372036854776000n),
        ),
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 25, {
          expected: 'a string of at most 25 characters',
        }),
      ),
    ]),
  ),
  webhook_id: Schema.optional(SnowflakeTypeSchema),
  message_reference: Schema.optional(MessageReferenceResponseSchema),
  thread: Schema.optional(ThreadResponseSchema),
  mention_channels: Schema.optional(Schema.Array(MessageMentionChannelResponseSchema)),
  role_subscription_data: Schema.optional(MessageRoleSubscriptionDataResponseSchema),
  purchase_notification: Schema.optional(PurchaseNotificationResponseSchema),
  position: Schema.optional(Schema.Number.check(Schema.isInt32())),
  resolved: Schema.optional(ResolvedObjectsResponseSchema),
  poll: Schema.optional(PollResponseSchema),
  shared_client_theme: Schema.optional(CustomClientThemeResponseSchema),
  interaction_metadata: Schema.optional(
    Schema.Union([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
      ModalSubmitInteractionMetadataResponseSchema,
    ]),
  ),
  message_snapshots: Schema.optional(Schema.Array(MessageSnapshotResponseSchema)),
  lobby_member: Schema.optional(MessageLobbyMemberResponseSchema),
  actor: Schema.optional(UserResponseSchema),
}).annotate({ identifier: 'BasicMessageResponse' })

export type BasicMessageResponse = Schema.Schema.Type<typeof BasicMessageResponseSchema>

export const BlockMessageActionMetadataSchema = Schema.Struct({
  custom_message: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 300, {
          expected: 'a string of at most 300 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'BlockMessageActionMetadata' })

export type BlockMessageActionMetadata = Schema.Schema.Type<typeof BlockMessageActionMetadataSchema>

export const BlockMessageActionSchema = Schema.Struct({
  type: AutomodActionTypeSchema,
  metadata: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), BlockMessageActionMetadataSchema]),
  ),
}).annotate({ identifier: 'BlockMessageAction' })

export type BlockMessageAction = Schema.Schema.Type<typeof BlockMessageActionSchema>

export const BlockMessageActionMetadataResponseSchema = Schema.Struct({
  custom_message: Schema.optional(Schema.String),
}).annotate({ identifier: 'BlockMessageActionMetadataResponse' })

export type BlockMessageActionMetadataResponse = Schema.Schema.Type<
  typeof BlockMessageActionMetadataResponseSchema
>

export const BlockMessageActionResponseSchema = Schema.Struct({
  type: AutomodActionTypeSchema,
  metadata: BlockMessageActionMetadataResponseSchema,
}).annotate({ identifier: 'BlockMessageActionResponse' })

export type BlockMessageActionResponse = Schema.Schema.Type<typeof BlockMessageActionResponseSchema>

export const BotAccountPatchRequestSchema = Schema.Struct({
  username: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 2, {
      expected: 'a string of at least 2 characters',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  avatar: Schema.optional(Schema.NullOr(Schema.String)),
  banner: Schema.optional(Schema.NullOr(Schema.String)),
}).annotate({ identifier: 'BotAccountPatchRequest' })

export type BotAccountPatchRequest = Schema.Schema.Type<typeof BotAccountPatchRequestSchema>

export const BotAddGuildMemberRequestSchema = Schema.Struct({
  nick: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 32, {
          expected: 'a string of at most 32 characters',
        }),
      ),
    ),
  ),
  roles: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(250), Schema.isUnique()),
    ),
  ),
  mute: Schema.optional(Schema.NullOr(Schema.Boolean)),
  deaf: Schema.optional(Schema.NullOr(Schema.Boolean)),
  access_token: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 10240, {
      expected: 'a string of at most 10240 characters',
    }),
  ),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
}).annotate({ identifier: 'BotAddGuildMemberRequest' })

export type BotAddGuildMemberRequest = Schema.Schema.Type<typeof BotAddGuildMemberRequestSchema>

export const BulkBanUsersRequestSchema = Schema.Struct({
  user_ids: Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(200), Schema.isUnique()),
  delete_message_seconds: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(604800),
      ),
    ),
  ),
}).annotate({ identifier: 'BulkBanUsersRequest' })

export type BulkBanUsersRequest = Schema.Schema.Type<typeof BulkBanUsersRequestSchema>

export const BulkBanUsersResponseSchema = Schema.Struct({
  banned_users: Schema.Array(SnowflakeTypeSchema),
  failed_users: Schema.Array(SnowflakeTypeSchema),
}).annotate({ identifier: 'BulkBanUsersResponse' })

export type BulkBanUsersResponse = Schema.Schema.Type<typeof BulkBanUsersResponseSchema>

export const BulkLobbyMemberRequestSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  metadata: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length <= 1024, {
            expected: 'a string of at most 1024 characters',
          }),
        ),
      ),
    ),
  ),
  flags: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), Schema.Literal(1)])),
  additional_name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 80, {
          expected: 'a string of at most 80 characters',
        }),
      ),
    ),
  ),
  remove_member: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'BulkLobbyMemberRequest' })

export type BulkLobbyMemberRequest = Schema.Schema.Type<typeof BulkLobbyMemberRequestSchema>

export const RecurrenceRuleWeekdaysSchema = Schema.Union([
  Schema.Literal(0),
  Schema.Literal(1),
  Schema.Literal(2),
  Schema.Literal(3),
  Schema.Literal(4),
  Schema.Literal(5),
  Schema.Literal(6),
]).annotate({ identifier: 'RecurrenceRuleWeekdays' })

export type RecurrenceRuleWeekdays = Schema.Schema.Type<typeof RecurrenceRuleWeekdaysSchema>

export const ByNWeekdaySchema = Schema.Struct({
  n: Schema.Number.check(
    Schema.isInt32(),
    Schema.isGreaterThanOrEqualTo(1),
    Schema.isLessThanOrEqualTo(5),
  ).annotate({ description: 'The week to reoccur on (1-5, where 5 represents the last week)' }),
  day: RecurrenceRuleWeekdaysSchema.annotate({
    description: 'The day within the week to reoccur on',
  }),
}).annotate({ identifier: 'ByNWeekday' })

export type ByNWeekday = Schema.Schema.Type<typeof ByNWeekdaySchema>

export const ByNWeekdayResponseSchema = Schema.Struct({
  n: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The week to reoccur on (1-5, where 5 represents the last week)',
  }),
  day: RecurrenceRuleWeekdaysSchema.annotate({
    description: 'The day within the week to reoccur on',
  }),
}).annotate({ identifier: 'ByNWeekdayResponse' })

export type ByNWeekdayResponse = Schema.Schema.Type<typeof ByNWeekdayResponseSchema>

export const ChannelFollowerResponseSchema = Schema.Struct({
  channel_id: SnowflakeTypeSchema,
  webhook_id: SnowflakeTypeSchema,
}).annotate({ identifier: 'ChannelFollowerResponse' })

export type ChannelFollowerResponse = Schema.Schema.Type<typeof ChannelFollowerResponseSchema>

export const WebhookSourceGuildResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  icon: Schema.NullOr(Schema.String),
  name: Schema.String,
}).annotate({ identifier: 'WebhookSourceGuildResponse' })

export type WebhookSourceGuildResponse = Schema.Schema.Type<typeof WebhookSourceGuildResponseSchema>

export const WebhookSourceChannelResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
}).annotate({ identifier: 'WebhookSourceChannelResponse' })

export type WebhookSourceChannelResponse = Schema.Schema.Type<
  typeof WebhookSourceChannelResponseSchema
>

export const ChannelFollowerWebhookResponseSchema = Schema.Struct({
  application_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  avatar: Schema.NullOr(Schema.String),
  channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  guild_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  id: SnowflakeTypeSchema,
  name: Schema.String,
  type: WebhookTypesSchema,
  user: Schema.optional(UserResponseSchema),
  source_guild: Schema.optional(WebhookSourceGuildResponseSchema),
  source_channel: Schema.optional(WebhookSourceChannelResponseSchema),
}).annotate({ identifier: 'ChannelFollowerWebhookResponse' })

export type ChannelFollowerWebhookResponse = Schema.Schema.Type<
  typeof ChannelFollowerWebhookResponseSchema
>

export const ChannelPermissionOverwriteRequestSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ChannelPermissionOverwritesSchema]),
  ),
  allow: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  deny: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
}).annotate({ identifier: 'ChannelPermissionOverwriteRequest' })

export type ChannelPermissionOverwriteRequest = Schema.Schema.Type<
  typeof ChannelPermissionOverwriteRequestSchema
>

export const ChannelSelectComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 150, {
          expected: 'a string of at most 150 characters',
        }),
      ),
    ),
  ),
  min_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  max_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  default_values: Schema.optional(
    Schema.NullOr(Schema.Array(ChannelSelectDefaultValueSchema).check(Schema.isMaxLength(25))),
  ),
  channel_types: Schema.optional(
    Schema.NullOr(Schema.Array(ChannelTypesSchema).check(Schema.isUnique())),
  ),
}).annotate({ identifier: 'ChannelSelectComponentForModalRequest' })

export type ChannelSelectComponentForModalRequest = Schema.Schema.Type<
  typeof ChannelSelectComponentForModalRequestSchema
>

export const CheckboxComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  default: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'CheckboxComponentForModalRequest' })

export type CheckboxComponentForModalRequest = Schema.Schema.Type<
  typeof CheckboxComponentForModalRequestSchema
>

export const CheckboxGroupOptionForRequestSchema = Schema.Struct({
  label: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  value: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  default: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'CheckboxGroupOptionForRequest' })

export type CheckboxGroupOptionForRequest = Schema.Schema.Type<
  typeof CheckboxGroupOptionForRequestSchema
>

export const CheckboxGroupComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  min_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(10),
      ),
    ),
  ),
  max_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(10),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  options: Schema.Array(CheckboxGroupOptionForRequestSchema).check(
    Schema.isMinLength(1),
    Schema.isMaxLength(10),
  ),
}).annotate({ identifier: 'CheckboxGroupComponentForModalRequest' })

export type CheckboxGroupComponentForModalRequest = Schema.Schema.Type<
  typeof CheckboxGroupComponentForModalRequestSchema
>

export const CommandPermissionResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: ApplicationCommandPermissionTypeSchema,
  permission: Schema.Boolean,
}).annotate({ identifier: 'CommandPermissionResponse' })

export type CommandPermissionResponse = Schema.Schema.Type<typeof CommandPermissionResponseSchema>

export const CommandPermissionsResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  permissions: Schema.Array(CommandPermissionResponseSchema),
}).annotate({ identifier: 'CommandPermissionsResponse' })

export type CommandPermissionsResponse = Schema.Schema.Type<typeof CommandPermissionsResponseSchema>

export const ConnectedAccountGuildResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  icon: Schema.NullOr(Schema.String),
}).annotate({ identifier: 'ConnectedAccountGuildResponse' })

export type ConnectedAccountGuildResponse = Schema.Schema.Type<
  typeof ConnectedAccountGuildResponseSchema
>

export const IntegrationTypesSchema = Schema.Union([
  Schema.Literal('discord'),
  Schema.Literal('twitch'),
  Schema.Literal('youtube'),
  Schema.Literal('guild_subscription'),
]).annotate({ identifier: 'IntegrationTypes' })

export type IntegrationTypes = Schema.Schema.Type<typeof IntegrationTypesSchema>

export const ConnectedAccountIntegrationResponseSchema = Schema.Struct({
  id: Schema.String,
  type: IntegrationTypesSchema,
  account: AccountResponseSchema,
  guild: ConnectedAccountGuildResponseSchema,
}).annotate({ identifier: 'ConnectedAccountIntegrationResponse' })

export type ConnectedAccountIntegrationResponse = Schema.Schema.Type<
  typeof ConnectedAccountIntegrationResponseSchema
>

export const ConnectedAccountProvidersSchema = Schema.Union([
  Schema.Literal('battlenet'),
  Schema.Literal('bluesky'),
  Schema.Literal('bungie'),
  Schema.Literal('ebay'),
  Schema.Literal('epicgames'),
  Schema.Literal('facebook'),
  Schema.Literal('github'),
  Schema.Literal('instagram'),
  Schema.Literal('letterboxd'),
  Schema.Literal('mastodon'),
  Schema.Literal('leagueoflegends'),
  Schema.Literal('paypal'),
  Schema.Literal('playstation'),
  Schema.Literal('reddit'),
  Schema.Literal('riotgames'),
  Schema.Literal('roblox'),
  Schema.Literal('skype'),
  Schema.Literal('spotify'),
  Schema.Literal('steam'),
  Schema.Literal('tiktok'),
  Schema.Literal('twitch'),
  Schema.Literal('twitter'),
  Schema.Literal('xbox'),
  Schema.Literal('youtube'),
  Schema.Literal('domain'),
]).annotate({ identifier: 'ConnectedAccountProviders' })

export type ConnectedAccountProviders = Schema.Schema.Type<typeof ConnectedAccountProvidersSchema>

export const ConnectedAccountVisibilitySchema = Schema.Union([
  Schema.Literal(0),
  Schema.Literal(1),
]).annotate({ identifier: 'ConnectedAccountVisibility' })

export type ConnectedAccountVisibility = Schema.Schema.Type<typeof ConnectedAccountVisibilitySchema>

export const ConnectedAccountResponseSchema = Schema.Struct({
  id: Schema.String,
  name: Schema.NullOr(Schema.String),
  type: ConnectedAccountProvidersSchema,
  friend_sync: Schema.Boolean,
  integrations: Schema.optional(Schema.Array(ConnectedAccountIntegrationResponseSchema)),
  show_activity: Schema.Boolean,
  two_way_link: Schema.Boolean,
  verified: Schema.Boolean,
  visibility: ConnectedAccountVisibilitySchema,
  revoked: Schema.optional(Schema.Boolean),
}).annotate({ identifier: 'ConnectedAccountResponse' })

export type ConnectedAccountResponse = Schema.Schema.Type<typeof ConnectedAccountResponseSchema>

export const EntitlementOwnerTypesSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: 'A guild subscription' }),
  Schema.Literal(2).annotate({ description: 'A user subscription' }),
]).annotate({ identifier: 'EntitlementOwnerTypes' })

export type EntitlementOwnerTypes = Schema.Schema.Type<typeof EntitlementOwnerTypesSchema>

export const CreateEntitlementRequestDataSchema = Schema.Struct({
  sku_id: SnowflakeTypeSchema.annotate({
    description: 'ID of the SKU to grant the entitlement to',
  }),
  owner_id: SnowflakeTypeSchema.annotate({
    description: 'ID of the guild or user to grant the entitlement to',
  }),
  owner_type: EntitlementOwnerTypesSchema.annotate({
    description: '1 for a guild subscription, 2 for a user subscription',
  }),
}).annotate({ identifier: 'CreateEntitlementRequestData' })

export type CreateEntitlementRequestData = Schema.Schema.Type<
  typeof CreateEntitlementRequestDataSchema
>

export const CreateForumThreadRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  auto_archive_duration: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ThreadAutoArchiveDurationSchema]),
  ),
  rate_limit_per_user: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt32(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(21600),
      ),
    ),
  ),
  applied_tags: Schema.optional(
    Schema.NullOr(Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(5))),
  ),
  message: BaseCreateMessageCreateRequestSchema,
}).annotate({ identifier: 'CreateForumThreadRequest' })

export type CreateForumThreadRequest = Schema.Schema.Type<typeof CreateForumThreadRequestSchema>

export const CreateGroupDMInviteRequestSchema = Schema.Struct({
  max_age: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(2592000),
      ),
    ),
  ),
}).annotate({ identifier: 'CreateGroupDMInviteRequest' })

export type CreateGroupDMInviteRequest = Schema.Schema.Type<typeof CreateGroupDMInviteRequestSchema>

export const UpdateDefaultReactionEmojiRequestSchema = Schema.Struct({
  emoji_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  emoji_name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'UpdateDefaultReactionEmojiRequest' })

export type UpdateDefaultReactionEmojiRequest = Schema.Schema.Type<
  typeof UpdateDefaultReactionEmojiRequestSchema
>

export const CreateOrUpdateThreadTagRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 0, {
      expected: 'a string of at least 0 characters',
    }),
    Schema.makeFilter((input) => [...input].length <= 50, {
      expected: 'a string of at most 50 characters',
    }),
  ),
  emoji_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  emoji_name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  moderated: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'CreateOrUpdateThreadTagRequest' })

export type CreateOrUpdateThreadTagRequest = Schema.Schema.Type<
  typeof CreateOrUpdateThreadTagRequestSchema
>

export const CreateGuildChannelRequestSchema = Schema.Struct({
  type: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), ChannelTypesSchema])),
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  position: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  topic: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 0, {
          expected: 'a string of at least 0 characters',
        }),
        Schema.makeFilter((input) => [...input].length <= 4096, {
          expected: 'a string of at most 4096 characters',
        }),
      ),
    ),
  ),
  bitrate: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(8000))),
  ),
  user_limit: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  nsfw: Schema.optional(Schema.NullOr(Schema.Boolean)),
  rate_limit_per_user: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(21600),
      ),
    ),
  ),
  parent_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  permission_overwrites: Schema.optional(
    Schema.NullOr(
      Schema.Array(ChannelPermissionOverwriteRequestSchema).check(Schema.isMaxLength(100)),
    ),
  ),
  rtc_region: Schema.optional(Schema.NullOr(Schema.String)),
  video_quality_mode: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), VideoQualityModesSchema]),
  ),
  default_auto_archive_duration: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ThreadAutoArchiveDurationSchema]),
  ),
  default_reaction_emoji: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UpdateDefaultReactionEmojiRequestSchema]),
  ),
  default_thread_rate_limit_per_user: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(21600),
      ),
    ),
  ),
  default_sort_order: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ThreadSortOrderSchema]),
  ),
  default_forum_layout: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ForumLayoutSchema]),
  ),
  default_tag_setting: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ThreadSearchTagSettingSchema]),
  ),
  available_tags: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([Schema.NullOr(Schema.Null), CreateOrUpdateThreadTagRequestSchema]),
      ).check(Schema.isMaxLength(20)),
    ),
  ),
}).annotate({ identifier: 'CreateGuildChannelRequest' })

export type CreateGuildChannelRequest = Schema.Schema.Type<typeof CreateGuildChannelRequestSchema>

export const InviteTargetTypesSchema = Schema.Union([
  Schema.Literal(1),
  Schema.Literal(2),
  Schema.Literal(3),
]).annotate({ identifier: 'InviteTargetTypes' })

export type InviteTargetTypes = Schema.Schema.Type<typeof InviteTargetTypesSchema>

export const CreateGuildInviteRequestSchema = Schema.Struct({
  max_age: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(5184000),
      ),
    ),
  ),
  temporary: Schema.optional(Schema.NullOr(Schema.Boolean)),
  max_uses: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(100),
      ),
    ),
  ),
  unique: Schema.optional(Schema.NullOr(Schema.Boolean)),
  target_user_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  target_application_id: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  ),
  target_type: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), InviteTargetTypesSchema])),
  role_ids: Schema.optional(
    Schema.Union([
      Schema.String,
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(250), Schema.isUnique()),
      Schema.NullOr(Schema.Null),
    ]),
  ),
  target_user_ids: Schema.optional(
    Schema.Union([
      Schema.String,
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(1000), Schema.isUnique()),
      Schema.NullOr(Schema.Null),
    ]).annotate({ description: 'The IDs of the users to target with this invite.' }),
  ),
}).annotate({ identifier: 'CreateGuildInviteRequest' })

export type CreateGuildInviteRequest = Schema.Schema.Type<typeof CreateGuildInviteRequestSchema>

export const IncomingWebhookInteractionRequestSchema = Schema.Struct({
  content: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 2000, {
          expected: 'a string of at most 2000 characters',
        }),
      ),
    ),
  ),
  embeds: Schema.optional(
    Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
  ),
  allowed_mentions: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MessageAllowedMentionsRequestSchema]),
  ),
  components: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      ).check(Schema.isMaxLength(40)),
    ),
  ),
  attachments: Schema.optional(
    Schema.NullOr(Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10))),
  ),
  poll: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), PollCreateRequestSchema])),
  tts: Schema.optional(Schema.NullOr(Schema.Boolean)),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
}).annotate({ identifier: 'IncomingWebhookInteractionRequest' })

export type IncomingWebhookInteractionRequest = Schema.Schema.Type<
  typeof IncomingWebhookInteractionRequestSchema
>

export const CreateMessageInteractionCallbackRequestSchema = Schema.Struct({
  type: InteractionCallbackTypesSchema,
  data: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), IncomingWebhookInteractionRequestSchema]),
  ),
}).annotate({ identifier: 'CreateMessageInteractionCallbackRequest' })

export type CreateMessageInteractionCallbackRequest = Schema.Schema.Type<
  typeof CreateMessageInteractionCallbackRequestSchema
>

export const MessageReactionCountDetailsResponseSchema = Schema.Struct({
  burst: Schema.Number.check(Schema.isInt32()),
  normal: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'MessageReactionCountDetailsResponse' })

export type MessageReactionCountDetailsResponse = Schema.Schema.Type<
  typeof MessageReactionCountDetailsResponseSchema
>

export const MessageReactionResponseSchema = Schema.Struct({
  emoji: MessageReactionEmojiResponseSchema,
  count: Schema.Number.check(Schema.isInt32()),
  count_details: MessageReactionCountDetailsResponseSchema,
  burst_colors: Schema.Array(Schema.String),
  me_burst: Schema.Boolean,
  me: Schema.Boolean,
}).annotate({ identifier: 'MessageReactionResponse' })

export type MessageReactionResponse = Schema.Schema.Type<typeof MessageReactionResponseSchema>

export const MessageResponseSchema = Schema.Struct({
  type: MessageTypeSchema,
  content: Schema.String,
  mentions: Schema.Array(UserResponseSchema),
  mention_roles: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  attachments: Schema.Array(MessageAttachmentResponseSchema),
  embeds: Schema.Array(MessageEmbedResponseSchema),
  timestamp: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  edited_timestamp: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  flags: Schema.Number.check(Schema.isInt32()),
  components: Schema.Array(
    Schema.Union([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: Schema.optional(
    Schema.Array(Schema.Union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  ),
  sticker_items: Schema.optional(Schema.Array(MessageStickerItemResponseSchema)),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: Schema.Boolean,
  mention_everyone: Schema.Boolean,
  tts: Schema.Boolean,
  call: Schema.optional(MessageCallResponseSchema),
  activity: Schema.optional(MessageActivityResponseSchema),
  application: Schema.optional(BasicApplicationResponseWithBotSchema),
  application_id: Schema.optional(SnowflakeTypeSchema),
  interaction: Schema.optional(MessageInteractionResponseSchema),
  nonce: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
          Schema.isGreaterThanOrEqualToBigInt(-9223372036854776000n),
          Schema.isLessThanOrEqualToBigInt(9223372036854776000n),
        ),
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 25, {
          expected: 'a string of at most 25 characters',
        }),
      ),
    ]),
  ),
  webhook_id: Schema.optional(SnowflakeTypeSchema),
  message_reference: Schema.optional(MessageReferenceResponseSchema),
  thread: Schema.optional(ThreadResponseSchema),
  mention_channels: Schema.optional(Schema.Array(MessageMentionChannelResponseSchema)),
  role_subscription_data: Schema.optional(MessageRoleSubscriptionDataResponseSchema),
  purchase_notification: Schema.optional(PurchaseNotificationResponseSchema),
  position: Schema.optional(Schema.Number.check(Schema.isInt32())),
  resolved: Schema.optional(ResolvedObjectsResponseSchema),
  poll: Schema.optional(PollResponseSchema),
  shared_client_theme: Schema.optional(CustomClientThemeResponseSchema),
  interaction_metadata: Schema.optional(
    Schema.Union([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
      ModalSubmitInteractionMetadataResponseSchema,
    ]),
  ),
  message_snapshots: Schema.optional(Schema.Array(MessageSnapshotResponseSchema)),
  lobby_member: Schema.optional(MessageLobbyMemberResponseSchema),
  actor: Schema.optional(UserResponseSchema),
  reactions: Schema.optional(Schema.Array(MessageReactionResponseSchema)),
  referenced_message: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), BasicMessageResponseSchema]),
  ),
}).annotate({ identifier: 'MessageResponse' })

export type MessageResponse = Schema.Schema.Type<typeof MessageResponseSchema>

export const CreateMessageInteractionCallbackResponseSchema = Schema.Struct({
  type: InteractionCallbackTypesSchema,
  message: MessageResponseSchema,
}).annotate({ identifier: 'CreateMessageInteractionCallbackResponse' })

export type CreateMessageInteractionCallbackResponse = Schema.Schema.Type<
  typeof CreateMessageInteractionCallbackResponseSchema
>

export const CreatePrivateChannelRequestSchema = Schema.Struct({
  recipient_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  access_tokens: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length <= 152133, {
            expected: 'a string of at most 152133 characters',
          }),
        ),
      ).check(Schema.isMaxLength(1521), Schema.isUnique()),
    ),
  ),
  nicks: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.NullOr(
          Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        ),
      ),
    ),
  ),
}).annotate({ identifier: 'CreatePrivateChannelRequest' })

export type CreatePrivateChannelRequest = Schema.Schema.Type<
  typeof CreatePrivateChannelRequestSchema
>

export const RoleColorsSchema = Schema.Struct({
  primary_color: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(16777215),
      ),
    ),
  ),
  secondary_color: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(16777215),
      ),
    ),
  ),
  tertiary_color: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(16777215),
      ),
    ),
  ),
}).annotate({ identifier: 'RoleColors' })

export type RoleColors = Schema.Schema.Type<typeof RoleColorsSchema>

export const CreateRoleRequestSchema = Schema.Struct({
  name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  permissions: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  color: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(16777215),
      ),
    ),
  ),
  colors: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), RoleColorsSchema])),
  hoist: Schema.optional(Schema.NullOr(Schema.Boolean)),
  mentionable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  icon: Schema.optional(Schema.NullOr(Schema.String)),
  unicode_emoji: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'CreateRoleRequest' })

export type CreateRoleRequest = Schema.Schema.Type<typeof CreateRoleRequestSchema>

export const CreateTextThreadWithMessageRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  auto_archive_duration: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ThreadAutoArchiveDurationSchema]),
  ),
  rate_limit_per_user: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt32(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(21600),
      ),
    ),
  ),
}).annotate({ identifier: 'CreateTextThreadWithMessageRequest' })

export type CreateTextThreadWithMessageRequest = Schema.Schema.Type<
  typeof CreateTextThreadWithMessageRequestSchema
>

export const CreateTextThreadWithoutMessageRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  auto_archive_duration: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ThreadAutoArchiveDurationSchema]),
  ),
  rate_limit_per_user: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt32(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(21600),
      ),
    ),
  ),
  type: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), ChannelTypesSchema])),
  invitable: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'CreateTextThreadWithoutMessageRequest' })

export type CreateTextThreadWithoutMessageRequest = Schema.Schema.Type<
  typeof CreateTextThreadWithoutMessageRequestSchema
>

export const CreatedThreadResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  last_message_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  flags: Schema.Number.check(Schema.isInt32()),
  last_pin_timestamp: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  guild_id: SnowflakeTypeSchema,
  name: Schema.String,
  parent_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  rate_limit_per_user: Schema.optional(Schema.Number.check(Schema.isInt32())),
  bitrate: Schema.optional(Schema.Number.check(Schema.isInt32())),
  user_limit: Schema.optional(Schema.Number.check(Schema.isInt32())),
  rtc_region: Schema.optional(Schema.NullOr(Schema.String)),
  video_quality_mode: Schema.optional(VideoQualityModesSchema),
  permissions: Schema.optional(Schema.String),
  owner_id: SnowflakeTypeSchema,
  thread_metadata: ThreadMetadataResponseSchema,
  message_count: Schema.Number.check(Schema.isInt32()),
  member_count: Schema.Number.check(Schema.isInt32()),
  total_message_sent: Schema.Number.check(Schema.isInt32()),
  applied_tags: Schema.optional(Schema.Array(SnowflakeTypeSchema)),
  member: Schema.optional(ThreadMemberResponseSchema),
}).annotate({ identifier: 'CreatedThreadResponse' })

export type CreatedThreadResponse = Schema.Schema.Type<typeof CreatedThreadResponseSchema>

export const DefaultKeywordListTriggerMetadataSchema = Schema.Struct({
  allow_list: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 60, {
            expected: 'a string of at most 60 characters',
          }),
        ),
      ).check(Schema.isMaxLength(1000)),
    ),
  ),
  presets: Schema.optional(
    Schema.NullOr(Schema.Array(AutomodKeywordPresetTypeSchema).check(Schema.isUnique())),
  ),
}).annotate({ identifier: 'DefaultKeywordListTriggerMetadata' })

export type DefaultKeywordListTriggerMetadata = Schema.Schema.Type<
  typeof DefaultKeywordListTriggerMetadataSchema
>

export const DefaultKeywordListTriggerMetadataResponseSchema = Schema.Struct({
  allow_list: Schema.Array(Schema.String),
  presets: Schema.Array(AutomodKeywordPresetTypeSchema).check(Schema.isUnique()),
}).annotate({ identifier: 'DefaultKeywordListTriggerMetadataResponse' })

export type DefaultKeywordListTriggerMetadataResponse = Schema.Schema.Type<
  typeof DefaultKeywordListTriggerMetadataResponseSchema
>

export const FlagToChannelActionMetadataSchema = Schema.Struct({
  channel_id: SnowflakeTypeSchema,
}).annotate({ identifier: 'FlagToChannelActionMetadata' })

export type FlagToChannelActionMetadata = Schema.Schema.Type<
  typeof FlagToChannelActionMetadataSchema
>

export const FlagToChannelActionSchema = Schema.Struct({
  type: AutomodActionTypeSchema,
  metadata: FlagToChannelActionMetadataSchema,
}).annotate({ identifier: 'FlagToChannelAction' })

export type FlagToChannelAction = Schema.Schema.Type<typeof FlagToChannelActionSchema>

export const QuarantineUserActionMetadataSchema = Schema.Struct({}).annotate({
  identifier: 'QuarantineUserActionMetadata',
})

export type QuarantineUserActionMetadata = Schema.Schema.Type<
  typeof QuarantineUserActionMetadataSchema
>

export const QuarantineUserActionSchema = Schema.Struct({
  type: AutomodActionTypeSchema,
  metadata: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), QuarantineUserActionMetadataSchema]),
  ),
}).annotate({ identifier: 'QuarantineUserAction' })

export type QuarantineUserAction = Schema.Schema.Type<typeof QuarantineUserActionSchema>

export const UserCommunicationDisabledActionMetadataSchema = Schema.Struct({
  duration_seconds: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(2419200),
      ),
    ),
  ),
}).annotate({ identifier: 'UserCommunicationDisabledActionMetadata' })

export type UserCommunicationDisabledActionMetadata = Schema.Schema.Type<
  typeof UserCommunicationDisabledActionMetadataSchema
>

export const UserCommunicationDisabledActionSchema = Schema.Struct({
  type: AutomodActionTypeSchema,
  metadata: UserCommunicationDisabledActionMetadataSchema,
}).annotate({ identifier: 'UserCommunicationDisabledAction' })

export type UserCommunicationDisabledAction = Schema.Schema.Type<
  typeof UserCommunicationDisabledActionSchema
>

export const DefaultKeywordListUpsertRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  event_type: AutomodEventTypeSchema,
  actions: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
    ),
  ),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  exempt_roles: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(20), Schema.isUnique()),
    ),
  ),
  exempt_channels: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(50), Schema.isUnique()),
    ),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: DefaultKeywordListTriggerMetadataSchema,
}).annotate({ identifier: 'DefaultKeywordListUpsertRequest' })

export type DefaultKeywordListUpsertRequest = Schema.Schema.Type<
  typeof DefaultKeywordListUpsertRequestSchema
>

export const DefaultKeywordListUpsertRequestPartialSchema = Schema.Struct({
  name: Schema.optional(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 100, {
        expected: 'a string of at most 100 characters',
      }),
    ),
  ),
  event_type: Schema.optional(AutomodEventTypeSchema),
  actions: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
    ),
  ),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  exempt_roles: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(20), Schema.isUnique()),
    ),
  ),
  exempt_channels: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(50), Schema.isUnique()),
    ),
  ),
  trigger_type: Schema.optional(AutomodTriggerTypeSchema),
  trigger_metadata: Schema.optional(DefaultKeywordListTriggerMetadataSchema),
}).annotate({ identifier: 'DefaultKeywordListUpsertRequestPartial' })

export type DefaultKeywordListUpsertRequestPartial = Schema.Schema.Type<
  typeof DefaultKeywordListUpsertRequestPartialSchema
>

export const FlagToChannelActionMetadataResponseSchema = Schema.Struct({
  channel_id: SnowflakeTypeSchema,
}).annotate({ identifier: 'FlagToChannelActionMetadataResponse' })

export type FlagToChannelActionMetadataResponse = Schema.Schema.Type<
  typeof FlagToChannelActionMetadataResponseSchema
>

export const FlagToChannelActionResponseSchema = Schema.Struct({
  type: AutomodActionTypeSchema,
  metadata: FlagToChannelActionMetadataResponseSchema,
}).annotate({ identifier: 'FlagToChannelActionResponse' })

export type FlagToChannelActionResponse = Schema.Schema.Type<
  typeof FlagToChannelActionResponseSchema
>

export const QuarantineUserActionMetadataResponseSchema = Schema.Struct({}).annotate({
  identifier: 'QuarantineUserActionMetadataResponse',
})

export type QuarantineUserActionMetadataResponse = Schema.Schema.Type<
  typeof QuarantineUserActionMetadataResponseSchema
>

export const QuarantineUserActionResponseSchema = Schema.Struct({
  type: AutomodActionTypeSchema,
  metadata: QuarantineUserActionMetadataResponseSchema,
}).annotate({ identifier: 'QuarantineUserActionResponse' })

export type QuarantineUserActionResponse = Schema.Schema.Type<
  typeof QuarantineUserActionResponseSchema
>

export const UserCommunicationDisabledActionMetadataResponseSchema = Schema.Struct({
  duration_seconds: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'UserCommunicationDisabledActionMetadataResponse' })

export type UserCommunicationDisabledActionMetadataResponse = Schema.Schema.Type<
  typeof UserCommunicationDisabledActionMetadataResponseSchema
>

export const UserCommunicationDisabledActionResponseSchema = Schema.Struct({
  type: AutomodActionTypeSchema,
  metadata: UserCommunicationDisabledActionMetadataResponseSchema,
}).annotate({ identifier: 'UserCommunicationDisabledActionResponse' })

export type UserCommunicationDisabledActionResponse = Schema.Schema.Type<
  typeof UserCommunicationDisabledActionResponseSchema
>

export const DefaultKeywordRuleResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: Schema.String,
  event_type: AutomodEventTypeSchema,
  actions: Schema.Array(
    Schema.Union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: Schema.Boolean,
  exempt_roles: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  exempt_channels: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  trigger_metadata: DefaultKeywordListTriggerMetadataResponseSchema,
}).annotate({ identifier: 'DefaultKeywordRuleResponse' })

export type DefaultKeywordRuleResponse = Schema.Schema.Type<typeof DefaultKeywordRuleResponseSchema>

export const IntegrationApplicationResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  icon: Schema.NullOr(Schema.String),
  description: Schema.String,
  type: Schema.Union([Schema.NullOr(Schema.Null), ApplicationTypesSchema]),
  cover_image: Schema.optional(Schema.String),
  primary_sku_id: Schema.optional(SnowflakeTypeSchema),
  flags: Schema.Number.check(Schema.isInt32()),
  flags_new: Schema.String,
  bot: Schema.optional(UserResponseSchema),
}).annotate({ identifier: 'IntegrationApplicationResponse' })

export type IntegrationApplicationResponse = Schema.Schema.Type<
  typeof IntegrationApplicationResponseSchema
>

export const DiscordIntegrationResponseSchema = Schema.Struct({
  type: IntegrationTypesSchema,
  name: Schema.NullOr(Schema.String),
  account: AccountResponseSchema,
  enabled: Schema.Boolean,
  id: SnowflakeTypeSchema,
  application: IntegrationApplicationResponseSchema,
  scopes: Schema.Array(OAuth2ScopesSchema).check(Schema.isUnique()),
  user: Schema.optional(UserResponseSchema),
}).annotate({ identifier: 'DiscordIntegrationResponse' })

export type DiscordIntegrationResponse = Schema.Schema.Type<typeof DiscordIntegrationResponseSchema>

export const EmbeddedActivityLocationKindSchema = Schema.Union([
  Schema.Literal('gc').annotate({ description: 'guild channel' }),
  Schema.Literal('pc').annotate({ description: 'private channel' }),
  Schema.Literal('party').annotate({ description: 'party' }),
]).annotate({ identifier: 'EmbeddedActivityLocationKind' })

export type EmbeddedActivityLocationKind = Schema.Schema.Type<
  typeof EmbeddedActivityLocationKindSchema
>

export const GuildChannelLocationSchema = Schema.Struct({
  id: Schema.String,
  kind: EmbeddedActivityLocationKindSchema,
  channel_id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
}).annotate({ identifier: 'GuildChannelLocation' })

export type GuildChannelLocation = Schema.Schema.Type<typeof GuildChannelLocationSchema>

export const PrivateChannelLocationSchema = Schema.Struct({
  id: Schema.String,
  kind: EmbeddedActivityLocationKindSchema,
  channel_id: SnowflakeTypeSchema,
}).annotate({ identifier: 'PrivateChannelLocation' })

export type PrivateChannelLocation = Schema.Schema.Type<typeof PrivateChannelLocationSchema>

export const EmbeddedActivityInstanceSchema = Schema.Struct({
  application_id: SnowflakeTypeSchema,
  instance_id: Schema.String,
  launch_id: Schema.String,
  location: Schema.Union([GuildChannelLocationSchema, PrivateChannelLocationSchema]),
  users: Schema.Array(SnowflakeTypeSchema),
}).annotate({ identifier: 'EmbeddedActivityInstance' })

export type EmbeddedActivityInstance = Schema.Schema.Type<typeof EmbeddedActivityInstanceSchema>

export const EmojiResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  user: Schema.optional(UserResponseSchema),
  roles: Schema.Array(SnowflakeTypeSchema),
  require_colons: Schema.Boolean,
  managed: Schema.Boolean,
  animated: Schema.Boolean,
  available: Schema.Boolean,
}).annotate({ identifier: 'EmojiResponse' })

export type EmojiResponse = Schema.Schema.Type<typeof EmojiResponseSchema>

export const EntitlementTypesSchema = Schema.Union([
  Schema.Literal(8),
  Schema.Literal(10),
]).annotate({ identifier: 'EntitlementTypes' })

export type EntitlementTypes = Schema.Schema.Type<typeof EntitlementTypesSchema>

export const EntitlementTenantFulfillmentStatusResponseSchema = Schema.Union([
  Schema.Literal(0),
  Schema.Literal(1),
  Schema.Literal(2),
  Schema.Literal(3),
  Schema.Literal(4),
  Schema.Literal(5),
  Schema.Literal(6),
  Schema.Literal(7),
]).annotate({ identifier: 'EntitlementTenantFulfillmentStatusResponse' })

export type EntitlementTenantFulfillmentStatusResponse = Schema.Schema.Type<
  typeof EntitlementTenantFulfillmentStatusResponseSchema
>

export const EntitlementResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  sku_id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  guild_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  deleted: Schema.Boolean,
  starts_at: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  ends_at: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  type: EntitlementTypesSchema,
  fulfilled_at: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  fulfillment_status: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), EntitlementTenantFulfillmentStatusResponseSchema]),
  ),
  consumed: Schema.optional(Schema.Boolean),
  gifter_user_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  parent_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
}).annotate({ identifier: 'EntitlementResponse' })

export type EntitlementResponse = Schema.Schema.Type<typeof EntitlementResponseSchema>

export const EntityMetadataExternalSchema = Schema.Struct({
  location: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
}).annotate({ identifier: 'EntityMetadataExternal' })

export type EntityMetadataExternal = Schema.Schema.Type<typeof EntityMetadataExternalSchema>

export const EntityMetadataExternalResponseSchema = Schema.Struct({
  location: Schema.String.annotate({ description: 'Location of the external event' }),
}).annotate({ identifier: 'EntityMetadataExternalResponse' })

export type EntityMetadataExternalResponse = Schema.Schema.Type<
  typeof EntityMetadataExternalResponseSchema
>

export const EntityMetadataStageInstanceSchema = Schema.Struct({}).annotate({
  identifier: 'EntityMetadataStageInstance',
})

export type EntityMetadataStageInstance = Schema.Schema.Type<
  typeof EntityMetadataStageInstanceSchema
>

export const EntityMetadataStageInstanceResponseSchema = Schema.Struct({}).annotate({
  identifier: 'EntityMetadataStageInstanceResponse',
})

export type EntityMetadataStageInstanceResponse = Schema.Schema.Type<
  typeof EntityMetadataStageInstanceResponseSchema
>

export const EntityMetadataVoiceSchema = Schema.Struct({}).annotate({
  identifier: 'EntityMetadataVoice',
})

export type EntityMetadataVoice = Schema.Schema.Type<typeof EntityMetadataVoiceSchema>

export const EntityMetadataVoiceResponseSchema = Schema.Struct({}).annotate({
  identifier: 'EntityMetadataVoiceResponse',
})

export type EntityMetadataVoiceResponse = Schema.Schema.Type<
  typeof EntityMetadataVoiceResponseSchema
>

export const IntegrationExpireBehaviorTypesSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'Remove role' }),
  Schema.Literal(1).annotate({ description: 'Kick' }),
]).annotate({ identifier: 'IntegrationExpireBehaviorTypes' })

export type IntegrationExpireBehaviorTypes = Schema.Schema.Type<
  typeof IntegrationExpireBehaviorTypesSchema
>

export const IntegrationExpireGracePeriodTypesSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: '1 day' }),
  Schema.Literal(3).annotate({ description: '3 days' }),
  Schema.Literal(7).annotate({ description: '7 days' }),
  Schema.Literal(14).annotate({ description: '14 days' }),
  Schema.Literal(30).annotate({ description: '30 days' }),
]).annotate({ identifier: 'IntegrationExpireGracePeriodTypes' })

export type IntegrationExpireGracePeriodTypes = Schema.Schema.Type<
  typeof IntegrationExpireGracePeriodTypesSchema
>

export const ExternalConnectionIntegrationResponseSchema = Schema.Struct({
  type: IntegrationTypesSchema,
  name: Schema.NullOr(Schema.String),
  account: AccountResponseSchema,
  enabled: Schema.Boolean,
  id: Schema.String,
  user: UserResponseSchema,
  revoked: Schema.optional(Schema.Boolean),
  expire_behavior: Schema.optional(IntegrationExpireBehaviorTypesSchema),
  expire_grace_period: Schema.optional(IntegrationExpireGracePeriodTypesSchema),
  subscriber_count: Schema.optional(Schema.Number.check(Schema.isInt32())),
  synced_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  role_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  syncing: Schema.optional(Schema.Boolean),
  enable_emoticons: Schema.optional(Schema.Boolean),
}).annotate({ identifier: 'ExternalConnectionIntegrationResponse' })

export type ExternalConnectionIntegrationResponse = Schema.Schema.Type<
  typeof ExternalConnectionIntegrationResponseSchema
>

export const GuildScheduledEventPrivacyLevelsSchema = Schema.Union([
  Schema.Literal(2).annotate({
    description: 'the scheduled event is only accessible to guild members',
  }),
]).annotate({ identifier: 'GuildScheduledEventPrivacyLevels' })

export type GuildScheduledEventPrivacyLevels = Schema.Schema.Type<
  typeof GuildScheduledEventPrivacyLevelsSchema
>

export const GuildScheduledEventEntityTypesSchema = Schema.Union([
  Schema.Literal(0),
  Schema.Literal(1),
  Schema.Literal(2),
  Schema.Literal(3),
]).annotate({ identifier: 'GuildScheduledEventEntityTypes' })

export type GuildScheduledEventEntityTypes = Schema.Schema.Type<
  typeof GuildScheduledEventEntityTypesSchema
>

export const RecurrenceRuleFrequenciesSchema = Schema.Union([
  Schema.Literal(3),
  Schema.Literal(2),
  Schema.Literal(1),
  Schema.Literal(0),
]).annotate({ identifier: 'RecurrenceRuleFrequencies' })

export type RecurrenceRuleFrequencies = Schema.Schema.Type<typeof RecurrenceRuleFrequenciesSchema>

export const RecurrenceRuleMonthsSchema = Schema.Union([
  Schema.Literal(1),
  Schema.Literal(2),
  Schema.Literal(3),
  Schema.Literal(4),
  Schema.Literal(5),
  Schema.Literal(6),
  Schema.Literal(7),
  Schema.Literal(8),
  Schema.Literal(9),
  Schema.Literal(10),
  Schema.Literal(11),
  Schema.Literal(12),
]).annotate({ identifier: 'RecurrenceRuleMonths' })

export type RecurrenceRuleMonths = Schema.Schema.Type<typeof RecurrenceRuleMonthsSchema>

export const RecurrenceRuleSchema = Schema.Struct({
  start: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({ description: 'Starting time of the recurrence interval' }),
  end: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ).annotate({ description: 'Ending time of the recurrence interval' }),
  ),
  frequency: RecurrenceRuleFrequenciesSchema.annotate({
    description: 'How often the event occurs',
  }),
  interval: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32())).annotate({
      description: 'The spacing between events, defined by frequency',
    }),
  ),
  by_weekday: Schema.optional(
    Schema.NullOr(
      Schema.Array(RecurrenceRuleWeekdaysSchema).check(Schema.isMaxLength(7), Schema.isUnique()),
    ).annotate({ description: 'Set of specific days within a week for the event to recur on' }),
  ),
  by_n_weekday: Schema.optional(
    Schema.NullOr(Schema.Array(ByNWeekdaySchema).check(Schema.isMaxLength(7))).annotate({
      description: 'List of specific days within a specific week to recur on',
    }),
  ),
  by_month: Schema.optional(
    Schema.NullOr(
      Schema.Array(RecurrenceRuleMonthsSchema).check(Schema.isMaxLength(12), Schema.isUnique()),
    ).annotate({ description: 'Set of specific months to recur on' }),
  ),
  by_month_day: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Number.check(
          Schema.isInt32(),
          Schema.isGreaterThanOrEqualTo(-1),
          Schema.isLessThanOrEqualTo(31),
        ),
      ).check(Schema.isMaxLength(33), Schema.isUnique()),
    ).annotate({ description: 'Set of specific dates within a month to recur on' }),
  ),
  by_year_day: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Number.check(
          Schema.isInt32(),
          Schema.isGreaterThanOrEqualTo(-1),
          Schema.isLessThanOrEqualTo(365),
        ),
      ).check(Schema.isMaxLength(367), Schema.isUnique()),
    ).annotate({ description: 'Set of days within a year to recur on (1-364)' }),
  ),
  count: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32())).annotate({
      description: 'Total number of times the event is allowed to recur',
    }),
  ),
}).annotate({ identifier: 'RecurrenceRule' })

export type RecurrenceRule = Schema.Schema.Type<typeof RecurrenceRuleSchema>

export const ExternalScheduledEventCreateRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 1000, {
          expected: 'a string of at most 1000 characters',
        }),
      ),
    ),
  ),
  image: Schema.optional(Schema.NullOr(Schema.String)),
  scheduled_start_time: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  scheduled_end_time: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  channel_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  recurrence_rule: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), RecurrenceRuleSchema]).annotate({
      description: 'Recurrence rule for the scheduled event',
    }),
  ),
  entity_metadata: EntityMetadataExternalSchema,
}).annotate({ identifier: 'ExternalScheduledEventCreateRequest' })

export type ExternalScheduledEventCreateRequest = Schema.Schema.Type<
  typeof ExternalScheduledEventCreateRequestSchema
>

export const GuildScheduledEventStatusesSchema = Schema.Union([
  Schema.Literal(1),
  Schema.Literal(2),
  Schema.Literal(3),
  Schema.Literal(4),
]).annotate({ identifier: 'GuildScheduledEventStatuses' })

export type GuildScheduledEventStatuses = Schema.Schema.Type<
  typeof GuildScheduledEventStatusesSchema
>

export const ExternalScheduledEventPatchRequestPartialSchema = Schema.Struct({
  status: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), GuildScheduledEventStatusesSchema]),
  ),
  name: Schema.optional(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 100, {
        expected: 'a string of at most 100 characters',
      }),
    ),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 1000, {
          expected: 'a string of at most 1000 characters',
        }),
      ),
    ),
  ),
  image: Schema.optional(Schema.NullOr(Schema.String)),
  scheduled_start_time: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  scheduled_end_time: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  entity_type: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), GuildScheduledEventEntityTypesSchema]),
  ),
  privacy_level: Schema.optional(GuildScheduledEventPrivacyLevelsSchema),
  channel_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  recurrence_rule: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), RecurrenceRuleSchema]).annotate({
      description: 'Recurrence rule for the scheduled event',
    }),
  ),
  entity_metadata: Schema.optional(EntityMetadataExternalSchema),
}).annotate({ identifier: 'ExternalScheduledEventPatchRequestPartial' })

export type ExternalScheduledEventPatchRequestPartial = Schema.Schema.Type<
  typeof ExternalScheduledEventPatchRequestPartialSchema
>

export const RecurrenceRuleResponseSchema = Schema.Struct({
  start: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({ description: 'Starting time of the recurrence interval' }),
  end: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ).annotate({ description: 'Ending time of the recurrence interval' }),
  ),
  frequency: RecurrenceRuleFrequenciesSchema.annotate({
    description: 'How often the event occurs',
  }),
  interval: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The spacing between events, defined by frequency',
  }),
  by_weekday: Schema.NullOr(
    Schema.Array(RecurrenceRuleWeekdaysSchema).check(Schema.isUnique()),
  ).annotate({ description: 'Set of specific days within a week for the event to recur on' }),
  by_n_weekday: Schema.NullOr(Schema.Array(ByNWeekdayResponseSchema)).annotate({
    description: 'List of specific days within a specific week to recur on',
  }),
  by_month: Schema.NullOr(
    Schema.Array(RecurrenceRuleMonthsSchema).check(Schema.isUnique()),
  ).annotate({ description: 'Set of specific months to recur on' }),
  by_month_day: Schema.NullOr(
    Schema.Array(Schema.Number.check(Schema.isInt32())).check(Schema.isUnique()),
  ).annotate({ description: 'Set of specific dates within a month to recur on' }),
  by_year_day: Schema.optional(
    Schema.NullOr(
      Schema.Array(Schema.Number.check(Schema.isInt32())).check(Schema.isUnique()),
    ).annotate({ description: 'Set of days within a year to recur on (1-364)' }),
  ),
  count: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32())).annotate({
      description: 'Total number of times the event is allowed to recur',
    }),
  ),
}).annotate({ identifier: 'RecurrenceRuleResponse' })

export type RecurrenceRuleResponse = Schema.Schema.Type<typeof RecurrenceRuleResponseSchema>

export const GuildScheduledEventUserResponsesSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'User is not interested in the event' }),
  Schema.Literal(1).annotate({ description: 'User is interested in the event' }),
]).annotate({ identifier: 'GuildScheduledEventUserResponses' })

export type GuildScheduledEventUserResponses = Schema.Schema.Type<
  typeof GuildScheduledEventUserResponsesSchema
>

export const ScheduledEventUserResponseSchema = Schema.Struct({
  guild_scheduled_event_id: SnowflakeTypeSchema.annotate({
    description: 'ID of the scheduled event',
  }),
  guild_scheduled_event_exception_id: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
      description: 'ID of the scheduled event exception',
    }),
  ),
  user_id: SnowflakeTypeSchema.annotate({ description: 'ID of the user' }),
  user: Schema.optional(
    UserResponseSchema.annotate({ description: 'User object for the RSVP user' }),
  ),
  member: Schema.optional(
    GuildMemberResponseSchema.annotate({ description: 'Guild member object for the RSVP user' }),
  ),
  response: GuildScheduledEventUserResponsesSchema.annotate({
    description: "User's RSVP status for the event",
  }),
}).annotate({ identifier: 'ScheduledEventUserResponse' })

export type ScheduledEventUserResponse = Schema.Schema.Type<typeof ScheduledEventUserResponseSchema>

export const GuildScheduledEventExceptionResponseSchema = Schema.Struct({
  event_id: SnowflakeTypeSchema.annotate({
    description: 'ID of the scheduled event this exception belongs to',
  }),
  event_exception_id: SnowflakeTypeSchema.annotate({ description: 'ID of the event exception' }),
  scheduled_start_time: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'Overridden start time of this occurrence' }),
  scheduled_end_time: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'Overridden end time of this occurrence' }),
  is_canceled: Schema.Boolean.annotate({ description: 'Whether this occurrence is canceled' }),
}).annotate({ identifier: 'GuildScheduledEventExceptionResponse' })

export type GuildScheduledEventExceptionResponse = Schema.Schema.Type<
  typeof GuildScheduledEventExceptionResponseSchema
>

export const ExternalScheduledEventResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema.annotate({ description: 'ID of the scheduled event' }),
  guild_id: SnowflakeTypeSchema.annotate({
    description: 'ID of the guild the scheduled event belongs to',
  }),
  name: Schema.String.annotate({ description: 'Name of the scheduled event' }),
  description: Schema.NullOr(Schema.String).annotate({
    description: 'Description of the scheduled event',
  }),
  channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description:
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
  }),
  creator_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description: 'ID of the user that created the scheduled event',
  }),
  creator: Schema.optional(
    UserResponseSchema.annotate({ description: 'User that created the scheduled event' }),
  ),
  image: Schema.NullOr(Schema.String).annotate({
    description: 'Cover image hash of the scheduled event',
  }),
  scheduled_start_time: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({ description: 'When the scheduled event will start' }),
  scheduled_end_time: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'When the scheduled event will end, or null if no end time' }),
  status: GuildScheduledEventStatusesSchema.annotate({
    description: 'Status of the scheduled event',
  }),
  entity_type: GuildScheduledEventEntityTypesSchema.annotate({
    description: 'Type of hosting entity associated with the scheduled event',
  }),
  entity_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description: 'ID of the hosting entity associated with the scheduled event',
  }),
  recurrence_rule: Schema.Union([
    Schema.NullOr(Schema.Null),
    RecurrenceRuleResponseSchema,
  ]).annotate({ description: 'Recurrence rule for the scheduled event, or null if not recurring' }),
  user_count: Schema.optional(
    Schema.Number.check(Schema.isInt32()).annotate({
      description: 'Number of users subscribed to the scheduled event',
    }),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.annotate({
    description: 'Privacy level of the scheduled event',
  }),
  user_rsvp: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ScheduledEventUserResponseSchema]),
  ),
  guild_scheduled_event_exceptions: Schema.Array(GuildScheduledEventExceptionResponseSchema),
  entity_metadata: EntityMetadataExternalResponseSchema,
}).annotate({ identifier: 'ExternalScheduledEventResponse' })

export type ExternalScheduledEventResponse = Schema.Schema.Type<
  typeof ExternalScheduledEventResponseSchema
>

export const FileUploadComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  min_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(10),
      ),
    ),
  ),
  max_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(10),
      ),
    ),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  file_types: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 16, {
            expected: 'a string of at most 16 characters',
          }),
        ),
      ).check(Schema.isMaxLength(10), Schema.isUnique()),
    ),
  ),
}).annotate({ identifier: 'FileUploadComponentForModalRequest' })

export type FileUploadComponentForModalRequest = Schema.Schema.Type<
  typeof FileUploadComponentForModalRequestSchema
>

export const InviteTypesSchema = Schema.Union([
  Schema.Literal(0),
  Schema.Literal(1),
  Schema.Literal(2),
]).annotate({ identifier: 'InviteTypes' })

export type InviteTypes = Schema.Schema.Type<typeof InviteTypesSchema>

export const InviteChannelRecipientResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  username: Schema.String,
  avatar: Schema.NullOr(Schema.String),
}).annotate({ identifier: 'InviteChannelRecipientResponse' })

export type InviteChannelRecipientResponse = Schema.Schema.Type<
  typeof InviteChannelRecipientResponseSchema
>

export const InviteChannelResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  name: Schema.NullOr(Schema.String),
  icon: Schema.optional(Schema.String),
  nsfw: Schema.optional(Schema.Boolean),
  recipients: Schema.optional(Schema.Array(InviteChannelRecipientResponseSchema)),
}).annotate({ identifier: 'InviteChannelResponse' })

export type InviteChannelResponse = Schema.Schema.Type<typeof InviteChannelResponseSchema>

export const FriendInviteResponseSchema = Schema.Struct({
  type: InviteTypesSchema,
  code: Schema.String,
  inviter: Schema.optional(UserResponseSchema),
  max_age: Schema.optional(Schema.Number.check(Schema.isInt32())),
  created_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  expires_at: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  friends_count: Schema.optional(Schema.Number.check(Schema.isInt32())),
  channel: Schema.Union([Schema.NullOr(Schema.Null), InviteChannelResponseSchema]),
  is_contact: Schema.optional(Schema.Boolean),
  uses: Schema.optional(Schema.Number.check(Schema.isInt32())),
  max_uses: Schema.optional(Schema.Number.check(Schema.isInt32())),
  flags: Schema.optional(Schema.Number.check(Schema.isInt32())),
}).annotate({ identifier: 'FriendInviteResponse' })

export type FriendInviteResponse = Schema.Schema.Type<typeof FriendInviteResponseSchema>

export const GatewayBotSessionStartLimitResponseSchema = Schema.Struct({
  max_concurrency: Schema.Number.check(Schema.isInt32()),
  remaining: Schema.Number.check(Schema.isInt32()),
  reset_after: Schema.Number.check(Schema.isInt32()),
  total: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'GatewayBotSessionStartLimitResponse' })

export type GatewayBotSessionStartLimitResponse = Schema.Schema.Type<
  typeof GatewayBotSessionStartLimitResponseSchema
>

export const GatewayBotResponseSchema = Schema.Struct({
  url: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  session_start_limit: GatewayBotSessionStartLimitResponseSchema,
  shards: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'GatewayBotResponse' })

export type GatewayBotResponse = Schema.Schema.Type<typeof GatewayBotResponseSchema>

export const GatewayResponseSchema = Schema.Struct({
  url: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
}).annotate({ identifier: 'GatewayResponse' })

export type GatewayResponse = Schema.Schema.Type<typeof GatewayResponseSchema>

export const GithubAuthorSchema = Schema.Struct({
  username: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
}).annotate({ identifier: 'GithubAuthor' })

export type GithubAuthor = Schema.Schema.Type<typeof GithubAuthorSchema>

export const GithubCheckAppSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
}).annotate({ identifier: 'GithubCheckApp' })

export type GithubCheckApp = Schema.Schema.Type<typeof GithubCheckAppSchema>

export const GithubCheckPullRequestSchema = Schema.Struct({
  number: Schema.Number.check(Schema.isInt()),
}).annotate({ identifier: 'GithubCheckPullRequest' })

export type GithubCheckPullRequest = Schema.Schema.Type<typeof GithubCheckPullRequestSchema>

export const GithubCheckSuiteSchema = Schema.Struct({
  conclusion: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  head_branch: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  head_sha: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
  pull_requests: Schema.optional(
    Schema.NullOr(Schema.Array(GithubCheckPullRequestSchema).check(Schema.isMaxLength(1521))),
  ),
  app: GithubCheckAppSchema,
}).annotate({ identifier: 'GithubCheckSuite' })

export type GithubCheckSuite = Schema.Schema.Type<typeof GithubCheckSuiteSchema>

export const GithubCheckRunOutputSchema = Schema.Struct({
  title: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  summary: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'GithubCheckRunOutput' })

export type GithubCheckRunOutput = Schema.Schema.Type<typeof GithubCheckRunOutputSchema>

export const GithubCheckRunSchema = Schema.Struct({
  conclusion: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
  html_url: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length <= 2048, {
      expected: 'a string of at most 2048 characters',
    }),
  ),
  check_suite: GithubCheckSuiteSchema,
  details_url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  output: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubCheckRunOutputSchema])),
  pull_requests: Schema.optional(
    Schema.NullOr(Schema.Array(GithubCheckPullRequestSchema).check(Schema.isMaxLength(1521))),
  ),
}).annotate({ identifier: 'GithubCheckRun' })

export type GithubCheckRun = Schema.Schema.Type<typeof GithubCheckRunSchema>

export const GithubUserSchema = Schema.Struct({
  id: Schema.Number.check(Schema.isInt()),
  login: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
  html_url: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length <= 2048, {
      expected: 'a string of at most 2048 characters',
    }),
  ),
  avatar_url: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length <= 2048, {
      expected: 'a string of at most 2048 characters',
    }),
  ),
}).annotate({ identifier: 'GithubUser' })

export type GithubUser = Schema.Schema.Type<typeof GithubUserSchema>

export const GithubCommentSchema = Schema.Struct({
  id: Schema.Number.check(Schema.isInt()),
  html_url: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length <= 2048, {
      expected: 'a string of at most 2048 characters',
    }),
  ),
  user: GithubUserSchema,
  commit_id: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  body: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
}).annotate({ identifier: 'GithubComment' })

export type GithubComment = Schema.Schema.Type<typeof GithubCommentSchema>

export const GithubCommitSchema = Schema.Struct({
  id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
  url: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length <= 2048, {
      expected: 'a string of at most 2048 characters',
    }),
  ),
  message: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
  author: GithubAuthorSchema,
}).annotate({ identifier: 'GithubCommit' })

export type GithubCommit = Schema.Schema.Type<typeof GithubCommitSchema>

export const GithubDiscussionSchema = Schema.Struct({
  title: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
  number: Schema.Number.check(Schema.isInt()),
  html_url: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length <= 2048, {
      expected: 'a string of at most 2048 characters',
    }),
  ),
  answer_html_url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  body: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  user: GithubUserSchema,
}).annotate({ identifier: 'GithubDiscussion' })

export type GithubDiscussion = Schema.Schema.Type<typeof GithubDiscussionSchema>

export const GithubIssueSchema = Schema.Struct({
  id: Schema.Number.check(Schema.isInt()),
  number: Schema.Number.check(Schema.isInt()),
  html_url: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length <= 2048, {
      expected: 'a string of at most 2048 characters',
    }),
  ),
  user: GithubUserSchema,
  title: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
  body: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  pull_request: Schema.optional(Schema.Unknown),
}).annotate({ identifier: 'GithubIssue' })

export type GithubIssue = Schema.Schema.Type<typeof GithubIssueSchema>

export const GithubReleaseSchema = Schema.Struct({
  id: Schema.Number.check(Schema.isInt()),
  tag_name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
  html_url: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length <= 2048, {
      expected: 'a string of at most 2048 characters',
    }),
  ),
  author: GithubUserSchema,
}).annotate({ identifier: 'GithubRelease' })

export type GithubRelease = Schema.Schema.Type<typeof GithubReleaseSchema>

export const GithubRepositorySchema = Schema.Struct({
  id: Schema.Number.check(Schema.isInt()),
  html_url: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length <= 2048, {
      expected: 'a string of at most 2048 characters',
    }),
  ),
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
  full_name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
}).annotate({ identifier: 'GithubRepository' })

export type GithubRepository = Schema.Schema.Type<typeof GithubRepositorySchema>

export const GithubReviewSchema = Schema.Struct({
  user: GithubUserSchema,
  body: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  html_url: Schema.String.check(
    Schema.makeFilter((input) => URL.canParse(input)),
    Schema.makeFilter((input) => [...input].length <= 2048, {
      expected: 'a string of at most 2048 characters',
    }),
  ),
  state: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 152133, {
      expected: 'a string of at most 152133 characters',
    }),
  ),
}).annotate({ identifier: 'GithubReview' })

export type GithubReview = Schema.Schema.Type<typeof GithubReviewSchema>

export const GithubWebhookSchema = Schema.Struct({
  action: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  ref: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  ref_type: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  comment: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubCommentSchema])),
  issue: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubIssueSchema])),
  pull_request: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubIssueSchema])),
  repository: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubRepositorySchema])),
  forkee: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubRepositorySchema])),
  sender: GithubUserSchema,
  member: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubUserSchema])),
  release: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubReleaseSchema])),
  head_commit: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubCommitSchema])),
  commits: Schema.optional(
    Schema.NullOr(Schema.Array(GithubCommitSchema).check(Schema.isMaxLength(1521))),
  ),
  forced: Schema.optional(Schema.NullOr(Schema.Boolean)),
  compare: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  review: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubReviewSchema])),
  check_run: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubCheckRunSchema])),
  check_suite: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubCheckSuiteSchema])),
  discussion: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubDiscussionSchema])),
  answer: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GithubCommentSchema])),
}).annotate({ identifier: 'GithubWebhook' })

export type GithubWebhook = Schema.Schema.Type<typeof GithubWebhookSchema>

export const GroupDMInviteResponseSchema = Schema.Struct({
  type: InviteTypesSchema,
  code: Schema.String,
  inviter: Schema.optional(UserResponseSchema),
  max_age: Schema.optional(Schema.Number.check(Schema.isInt32())),
  created_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  expires_at: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  channel: InviteChannelResponseSchema,
  approximate_member_count: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
}).annotate({ identifier: 'GroupDMInviteResponse' })

export type GroupDMInviteResponse = Schema.Schema.Type<typeof GroupDMInviteResponseSchema>

export const PartialDiscordIntegrationResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: Schema.NullOr(Schema.String),
  account: AccountResponseSchema,
  application_id: SnowflakeTypeSchema,
}).annotate({ identifier: 'PartialDiscordIntegrationResponse' })

export type PartialDiscordIntegrationResponse = Schema.Schema.Type<
  typeof PartialDiscordIntegrationResponseSchema
>

export const PartialExternalConnectionIntegrationResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: Schema.NullOr(Schema.String),
  account: AccountResponseSchema,
}).annotate({ identifier: 'PartialExternalConnectionIntegrationResponse' })

export type PartialExternalConnectionIntegrationResponse = Schema.Schema.Type<
  typeof PartialExternalConnectionIntegrationResponseSchema
>

export const PartialGuildSubscriptionIntegrationResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: Schema.NullOr(Schema.String),
  account: AccountResponseSchema,
}).annotate({ identifier: 'PartialGuildSubscriptionIntegrationResponse' })

export type PartialGuildSubscriptionIntegrationResponse = Schema.Schema.Type<
  typeof PartialGuildSubscriptionIntegrationResponseSchema
>

export const GuildIncomingWebhookResponseSchema = Schema.Struct({
  application_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  avatar: Schema.NullOr(Schema.String),
  channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  guild_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  id: SnowflakeTypeSchema,
  name: Schema.String,
  type: WebhookTypesSchema,
  user: Schema.optional(UserResponseSchema),
  token: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
}).annotate({ identifier: 'GuildIncomingWebhookResponse' })

export type GuildIncomingWebhookResponse = Schema.Schema.Type<
  typeof GuildIncomingWebhookResponseSchema
>

export const StageScheduledEventResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema.annotate({ description: 'ID of the scheduled event' }),
  guild_id: SnowflakeTypeSchema.annotate({
    description: 'ID of the guild the scheduled event belongs to',
  }),
  name: Schema.String.annotate({ description: 'Name of the scheduled event' }),
  description: Schema.NullOr(Schema.String).annotate({
    description: 'Description of the scheduled event',
  }),
  channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description:
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
  }),
  creator_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description: 'ID of the user that created the scheduled event',
  }),
  creator: Schema.optional(
    UserResponseSchema.annotate({ description: 'User that created the scheduled event' }),
  ),
  image: Schema.NullOr(Schema.String).annotate({
    description: 'Cover image hash of the scheduled event',
  }),
  scheduled_start_time: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({ description: 'When the scheduled event will start' }),
  scheduled_end_time: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'When the scheduled event will end, or null if no end time' }),
  status: GuildScheduledEventStatusesSchema.annotate({
    description: 'Status of the scheduled event',
  }),
  entity_type: GuildScheduledEventEntityTypesSchema.annotate({
    description: 'Type of hosting entity associated with the scheduled event',
  }),
  entity_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description: 'ID of the hosting entity associated with the scheduled event',
  }),
  recurrence_rule: Schema.Union([
    Schema.NullOr(Schema.Null),
    RecurrenceRuleResponseSchema,
  ]).annotate({ description: 'Recurrence rule for the scheduled event, or null if not recurring' }),
  user_count: Schema.optional(
    Schema.Number.check(Schema.isInt32()).annotate({
      description: 'Number of users subscribed to the scheduled event',
    }),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.annotate({
    description: 'Privacy level of the scheduled event',
  }),
  user_rsvp: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ScheduledEventUserResponseSchema]),
  ),
  guild_scheduled_event_exceptions: Schema.Array(GuildScheduledEventExceptionResponseSchema),
  entity_metadata: Schema.Union([
    Schema.NullOr(Schema.Null),
    EntityMetadataStageInstanceResponseSchema,
  ]),
}).annotate({ identifier: 'StageScheduledEventResponse' })

export type StageScheduledEventResponse = Schema.Schema.Type<
  typeof StageScheduledEventResponseSchema
>

export const VoiceScheduledEventResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema.annotate({ description: 'ID of the scheduled event' }),
  guild_id: SnowflakeTypeSchema.annotate({
    description: 'ID of the guild the scheduled event belongs to',
  }),
  name: Schema.String.annotate({ description: 'Name of the scheduled event' }),
  description: Schema.NullOr(Schema.String).annotate({
    description: 'Description of the scheduled event',
  }),
  channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description:
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
  }),
  creator_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description: 'ID of the user that created the scheduled event',
  }),
  creator: Schema.optional(
    UserResponseSchema.annotate({ description: 'User that created the scheduled event' }),
  ),
  image: Schema.NullOr(Schema.String).annotate({
    description: 'Cover image hash of the scheduled event',
  }),
  scheduled_start_time: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({ description: 'When the scheduled event will start' }),
  scheduled_end_time: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'When the scheduled event will end, or null if no end time' }),
  status: GuildScheduledEventStatusesSchema.annotate({
    description: 'Status of the scheduled event',
  }),
  entity_type: GuildScheduledEventEntityTypesSchema.annotate({
    description: 'Type of hosting entity associated with the scheduled event',
  }),
  entity_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description: 'ID of the hosting entity associated with the scheduled event',
  }),
  recurrence_rule: Schema.Union([
    Schema.NullOr(Schema.Null),
    RecurrenceRuleResponseSchema,
  ]).annotate({ description: 'Recurrence rule for the scheduled event, or null if not recurring' }),
  user_count: Schema.optional(
    Schema.Number.check(Schema.isInt32()).annotate({
      description: 'Number of users subscribed to the scheduled event',
    }),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.annotate({
    description: 'Privacy level of the scheduled event',
  }),
  user_rsvp: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ScheduledEventUserResponseSchema]),
  ),
  guild_scheduled_event_exceptions: Schema.Array(GuildScheduledEventExceptionResponseSchema),
  entity_metadata: Schema.Union([Schema.NullOr(Schema.Null), EntityMetadataVoiceResponseSchema]),
}).annotate({ identifier: 'VoiceScheduledEventResponse' })

export type VoiceScheduledEventResponse = Schema.Schema.Type<
  typeof VoiceScheduledEventResponseSchema
>

export const KeywordTriggerMetadataResponseSchema = Schema.Struct({
  keyword_filter: Schema.Array(Schema.String),
  regex_patterns: Schema.Array(Schema.String),
  allow_list: Schema.Array(Schema.String),
}).annotate({ identifier: 'KeywordTriggerMetadataResponse' })

export type KeywordTriggerMetadataResponse = Schema.Schema.Type<
  typeof KeywordTriggerMetadataResponseSchema
>

export const KeywordRuleResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: Schema.String,
  event_type: AutomodEventTypeSchema,
  actions: Schema.Array(
    Schema.Union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: Schema.Boolean,
  exempt_roles: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  exempt_channels: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  trigger_metadata: KeywordTriggerMetadataResponseSchema,
}).annotate({ identifier: 'KeywordRuleResponse' })

export type KeywordRuleResponse = Schema.Schema.Type<typeof KeywordRuleResponseSchema>

export const MLSpamTriggerMetadataResponseSchema = Schema.Struct({}).annotate({
  identifier: 'MLSpamTriggerMetadataResponse',
})

export type MLSpamTriggerMetadataResponse = Schema.Schema.Type<
  typeof MLSpamTriggerMetadataResponseSchema
>

export const MLSpamRuleResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: Schema.String,
  event_type: AutomodEventTypeSchema,
  actions: Schema.Array(
    Schema.Union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: Schema.Boolean,
  exempt_roles: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  exempt_channels: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  trigger_metadata: MLSpamTriggerMetadataResponseSchema,
}).annotate({ identifier: 'MLSpamRuleResponse' })

export type MLSpamRuleResponse = Schema.Schema.Type<typeof MLSpamRuleResponseSchema>

export const MentionSpamTriggerMetadataResponseSchema = Schema.Struct({
  mention_total_limit: Schema.Number.check(Schema.isInt32()),
  mention_raid_protection_enabled: Schema.Boolean,
}).annotate({ identifier: 'MentionSpamTriggerMetadataResponse' })

export type MentionSpamTriggerMetadataResponse = Schema.Schema.Type<
  typeof MentionSpamTriggerMetadataResponseSchema
>

export const MentionSpamRuleResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: Schema.String,
  event_type: AutomodEventTypeSchema,
  actions: Schema.Array(
    Schema.Union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: Schema.Boolean,
  exempt_roles: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  exempt_channels: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  trigger_metadata: MentionSpamTriggerMetadataResponseSchema,
}).annotate({ identifier: 'MentionSpamRuleResponse' })

export type MentionSpamRuleResponse = Schema.Schema.Type<typeof MentionSpamRuleResponseSchema>

export const UserProfileMetadataResponseSchema = Schema.Struct({
  keyword_filter: Schema.Array(Schema.String),
  regex_patterns: Schema.Array(Schema.String),
  allow_list: Schema.Array(Schema.String),
}).annotate({ identifier: 'UserProfileMetadataResponse' })

export type UserProfileMetadataResponse = Schema.Schema.Type<
  typeof UserProfileMetadataResponseSchema
>

export const UserProfileRuleResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: Schema.String,
  event_type: AutomodEventTypeSchema,
  actions: Schema.Array(
    Schema.Union([
      BlockMessageActionResponseSchema,
      FlagToChannelActionResponseSchema,
      QuarantineUserActionResponseSchema,
      UserCommunicationDisabledActionResponseSchema,
    ]),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: Schema.Boolean,
  exempt_roles: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  exempt_channels: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  trigger_metadata: UserProfileMetadataResponseSchema,
}).annotate({ identifier: 'UserProfileRuleResponse' })

export type UserProfileRuleResponse = Schema.Schema.Type<typeof UserProfileRuleResponseSchema>

export const GuildAuditLogResponseSchema = Schema.Struct({
  audit_log_entries: Schema.Array(AuditLogEntryResponseSchema),
  users: Schema.Array(UserResponseSchema),
  integrations: Schema.Array(
    Schema.Union([
      PartialDiscordIntegrationResponseSchema,
      PartialExternalConnectionIntegrationResponseSchema,
      PartialGuildSubscriptionIntegrationResponseSchema,
    ]),
  ),
  webhooks: Schema.Array(
    Schema.Union([
      ApplicationIncomingWebhookResponseSchema,
      ChannelFollowerWebhookResponseSchema,
      GuildIncomingWebhookResponseSchema,
    ]),
  ),
  guild_scheduled_events: Schema.Array(
    Schema.Union([
      ExternalScheduledEventResponseSchema,
      StageScheduledEventResponseSchema,
      VoiceScheduledEventResponseSchema,
    ]),
  ),
  threads: Schema.Array(ThreadResponseSchema),
  application_commands: Schema.Array(ApplicationCommandResponseSchema),
  auto_moderation_rules: Schema.Array(
    Schema.Union([
      DefaultKeywordRuleResponseSchema,
      KeywordRuleResponseSchema,
      MLSpamRuleResponseSchema,
      MentionSpamRuleResponseSchema,
      UserProfileRuleResponseSchema,
      Schema.NullOr(Schema.Null),
    ]),
  ),
}).annotate({ identifier: 'GuildAuditLogResponse' })

export type GuildAuditLogResponse = Schema.Schema.Type<typeof GuildAuditLogResponseSchema>

export const GuildBanResponseSchema = Schema.Struct({
  user: UserResponseSchema,
  reason: Schema.NullOr(Schema.String),
}).annotate({ identifier: 'GuildBanResponse' })

export type GuildBanResponse = Schema.Schema.Type<typeof GuildBanResponseSchema>

export const GuildExplicitContentFilterTypesSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'media content will not be scanned' }),
  Schema.Literal(1).annotate({
    description: 'media content sent by members without roles will be scanned',
  }),
  Schema.Literal(2).annotate({ description: 'media content sent by all members will be scanned' }),
]).annotate({ identifier: 'GuildExplicitContentFilterTypes' })

export type GuildExplicitContentFilterTypes = Schema.Schema.Type<
  typeof GuildExplicitContentFilterTypesSchema
>

export const GuildFeaturesSchema = Schema.Union([
  Schema.Literal('ANIMATED_BANNER').annotate({
    description: 'guild has access to set an animated guild banner image',
  }),
  Schema.Literal('ANIMATED_ICON').annotate({
    description: 'guild has access to set an animated guild icon',
  }),
  Schema.Literal('APPLICATION_COMMAND_PERMISSIONS_V2').annotate({
    description: 'guild is using the old permissions configuration behavior',
  }),
  Schema.Literal('AUTO_MODERATION').annotate({
    description: 'guild has set up auto moderation rules',
  }),
  Schema.Literal('BANNER').annotate({
    description: 'guild has access to set a guild banner image',
  }),
  Schema.Literal('COMMUNITY').annotate({
    description:
      'guild can enable welcome screen, Membership Screening, stage channels and discovery, and             receives community updates',
  }),
  Schema.Literal('CREATOR_MONETIZABLE_PROVISIONAL').annotate({
    description: 'guild has enabled monetization',
  }),
  Schema.Literal('CREATOR_STORE_PAGE').annotate({
    description: 'guild has enabled the role subscription promo page',
  }),
  Schema.Literal('DEVELOPER_SUPPORT_SERVER').annotate({
    description: 'guild has been set as a support server on the App Directory',
  }),
  Schema.Literal('DISCOVERABLE').annotate({
    description: 'guild is able to be discovered in the directory',
  }),
  Schema.Literal('FEATURABLE').annotate({
    description: 'guild is able to be featured in the directory',
  }),
  Schema.Literal('INVITES_DISABLED').annotate({
    description: 'guild has paused invites, preventing new users from joining',
  }),
  Schema.Literal('INVITE_SPLASH').annotate({
    description: 'guild has access to set an invite splash background',
  }),
  Schema.Literal('MEMBER_VERIFICATION_GATE_ENABLED').annotate({
    description: 'guild has enabled Membership Screening',
  }),
  Schema.Literal('MORE_STICKERS').annotate({
    description: 'guild has increased custom sticker slots',
  }),
  Schema.Literal('NEWS').annotate({
    description: 'guild has access to create announcement channels',
  }),
  Schema.Literal('PARTNERED').annotate({ description: 'guild is partnered' }),
  Schema.Literal('PREVIEW_ENABLED').annotate({
    description: 'guild can be previewed before joining via Membership Screening or the directory',
  }),
  Schema.Literal('RAID_ALERTS_DISABLED').annotate({
    description: 'guild has disabled activity alerts in the configured safety alerts channel',
  }),
  Schema.Literal('PRUNE_REQUIRES_ADMIN').annotate({
    description: 'guild has restricted member prune to administrators and the guild owner',
  }),
  Schema.Literal('ROLE_ICONS').annotate({ description: 'guild is able to set role icons' }),
  Schema.Literal('ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE').annotate({
    description: 'guild has role subscriptions that can be purchased',
  }),
  Schema.Literal('ROLE_SUBSCRIPTIONS_ENABLED').annotate({
    description: 'guild has enabled role subscriptions',
  }),
  Schema.Literal('TICKETED_EVENTS_ENABLED').annotate({
    description: 'guild has enabled ticketed events',
  }),
  Schema.Literal('VANITY_URL').annotate({ description: 'guild has access to set a vanity URL' }),
  Schema.Literal('VERIFIED').annotate({ description: 'guild is verified' }),
  Schema.Literal('VIP_REGIONS').annotate({
    description: 'guild has access to set 384kbps bitrate in voice (previously VIP voice servers)',
  }),
  Schema.Literal('WELCOME_SCREEN_ENABLED').annotate({
    description: 'guild has enabled the welcome screen',
  }),
  Schema.Literal('OFFICIAL_GAME_GUILD').annotate({
    description: 'guild is an official guild for one or more games',
  }),
]).annotate({ identifier: 'GuildFeatures' })

export type GuildFeatures = Schema.Schema.Type<typeof GuildFeaturesSchema>

export const WelcomeMessageResponseSchema = Schema.Struct({
  author_ids: Schema.Array(SnowflakeTypeSchema),
  message: Schema.String,
}).annotate({ identifier: 'WelcomeMessageResponse' })

export type WelcomeMessageResponse = Schema.Schema.Type<typeof WelcomeMessageResponseSchema>

export const NewMemberActionTypeSchema = Schema.Union([
  Schema.Literal(0),
  Schema.Literal(1),
]).annotate({ identifier: 'NewMemberActionType' })

export type NewMemberActionType = Schema.Schema.Type<typeof NewMemberActionTypeSchema>

export const SettingsEmojiResponseSchema = Schema.Struct({
  id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  name: Schema.NullOr(Schema.String),
  animated: Schema.Boolean,
}).annotate({ identifier: 'SettingsEmojiResponse' })

export type SettingsEmojiResponse = Schema.Schema.Type<typeof SettingsEmojiResponseSchema>

export const NewMemberActionResponseSchema = Schema.Struct({
  channel_id: SnowflakeTypeSchema,
  action_type: NewMemberActionTypeSchema,
  title: Schema.String,
  description: Schema.String,
  emoji: Schema.optional(SettingsEmojiResponseSchema),
  icon: Schema.optional(Schema.String),
}).annotate({ identifier: 'NewMemberActionResponse' })

export type NewMemberActionResponse = Schema.Schema.Type<typeof NewMemberActionResponseSchema>

export const ResourceChannelResponseSchema = Schema.Struct({
  channel_id: SnowflakeTypeSchema,
  title: Schema.String,
  emoji: Schema.optional(SettingsEmojiResponseSchema),
  icon: Schema.optional(Schema.String),
  description: Schema.String,
}).annotate({ identifier: 'ResourceChannelResponse' })

export type ResourceChannelResponse = Schema.Schema.Type<typeof ResourceChannelResponseSchema>

export const GuildHomeSettingsResponseSchema = Schema.Struct({
  guild_id: SnowflakeTypeSchema,
  enabled: Schema.Boolean,
  welcome_message: Schema.optional(WelcomeMessageResponseSchema),
  new_member_actions: Schema.Array(NewMemberActionResponseSchema),
  resource_channels: Schema.Array(ResourceChannelResponseSchema),
}).annotate({ identifier: 'GuildHomeSettingsResponse' })

export type GuildHomeSettingsResponse = Schema.Schema.Type<typeof GuildHomeSettingsResponseSchema>

export const GuildIncidentActionsRequestSchema = Schema.Struct({
  invites_disabled_until: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ).annotate({ description: 'When invites will be enabled again' }),
  ),
  dms_disabled_until: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ).annotate({ description: 'When direct messages will be enabled again' }),
  ),
}).annotate({ identifier: 'GuildIncidentActionsRequest' })

export type GuildIncidentActionsRequest = Schema.Schema.Type<
  typeof GuildIncidentActionsRequestSchema
>

export const GuildIncidentsDataResponseSchema = Schema.Struct({
  invites_disabled_until: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'When invites get enabled again' }),
  dms_disabled_until: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'When direct messages get enabled again' }),
}).annotate({ identifier: 'GuildIncidentsDataResponse' })

export type GuildIncidentsDataResponse = Schema.Schema.Type<typeof GuildIncidentsDataResponseSchema>

export const VerificationLevelsSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'unrestricted' }),
  Schema.Literal(1).annotate({ description: 'must have verified email on account' }),
  Schema.Literal(2).annotate({
    description: 'must be registered on Discord for longer than 5 minutes',
  }),
  Schema.Literal(3).annotate({
    description: 'must be a member of the server for longer than 10 minutes',
  }),
  Schema.Literal(4).annotate({ description: 'must have a verified phone number' }),
]).annotate({ identifier: 'VerificationLevels' })

export type VerificationLevels = Schema.Schema.Type<typeof VerificationLevelsSchema>

export const GuildNSFWContentLevelSchema = Schema.Union([
  Schema.Literal(0),
  Schema.Literal(1),
  Schema.Literal(2),
  Schema.Literal(3),
]).annotate({ identifier: 'GuildNSFWContentLevel' })

export type GuildNSFWContentLevel = Schema.Schema.Type<typeof GuildNSFWContentLevelSchema>

export const InviteGuildResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  splash: Schema.NullOr(Schema.String),
  banner: Schema.NullOr(Schema.String),
  description: Schema.NullOr(Schema.String),
  icon: Schema.NullOr(Schema.String),
  features: Schema.Array(GuildFeaturesSchema).check(Schema.isUnique()),
  verification_level: Schema.Union([Schema.NullOr(Schema.Null), VerificationLevelsSchema]),
  vanity_url_code: Schema.NullOr(Schema.String),
  nsfw_level: Schema.Union([Schema.NullOr(Schema.Null), GuildNSFWContentLevelSchema]),
  nsfw: Schema.NullOr(Schema.Boolean),
  premium_subscription_count: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'InviteGuildResponse' })

export type InviteGuildResponse = Schema.Schema.Type<typeof InviteGuildResponseSchema>

export const InviteApplicationResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  icon: Schema.NullOr(Schema.String),
  description: Schema.String,
  type: Schema.Union([Schema.NullOr(Schema.Null), ApplicationTypesSchema]),
  cover_image: Schema.optional(Schema.String),
  primary_sku_id: Schema.optional(SnowflakeTypeSchema),
  flags: Schema.Number.check(Schema.isInt32()),
  flags_new: Schema.String,
  bot: Schema.optional(UserResponseSchema),
  slug: Schema.optional(Schema.String),
  conjure_project_id: Schema.optional(SnowflakeTypeSchema),
  vibegrations_project_id: Schema.optional(SnowflakeTypeSchema),
  guild_id: Schema.optional(SnowflakeTypeSchema),
  rpc_origins: Schema.optional(Schema.Array(Schema.String)),
  bot_public: Schema.optional(Schema.Boolean),
  bot_require_code_grant: Schema.optional(Schema.Boolean),
  terms_of_service_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  privacy_policy_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  custom_install_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  install_params: Schema.optional(ApplicationOAuth2InstallParamsResponseSchema),
  integration_types_config: Schema.optional(
    Schema.Record(Schema.String, ApplicationIntegrationTypeConfigurationResponseSchema),
  ),
  verify_key: Schema.String,
  max_participants: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
  tags: Schema.optional(Schema.Array(Schema.String).check(Schema.isUnique())),
}).annotate({ identifier: 'InviteApplicationResponse' })

export type InviteApplicationResponse = Schema.Schema.Type<typeof InviteApplicationResponseSchema>

export const ScheduledEventResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema.annotate({ description: 'ID of the scheduled event' }),
  guild_id: SnowflakeTypeSchema.annotate({
    description: 'ID of the guild the scheduled event belongs to',
  }),
  name: Schema.String.annotate({ description: 'Name of the scheduled event' }),
  description: Schema.NullOr(Schema.String).annotate({
    description: 'Description of the scheduled event',
  }),
  channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description:
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
  }),
  creator_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description: 'ID of the user that created the scheduled event',
  }),
  creator: Schema.optional(
    UserResponseSchema.annotate({ description: 'User that created the scheduled event' }),
  ),
  image: Schema.NullOr(Schema.String).annotate({
    description: 'Cover image hash of the scheduled event',
  }),
  scheduled_start_time: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({ description: 'When the scheduled event will start' }),
  scheduled_end_time: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'When the scheduled event will end, or null if no end time' }),
  status: GuildScheduledEventStatusesSchema.annotate({
    description: 'Status of the scheduled event',
  }),
  entity_type: GuildScheduledEventEntityTypesSchema.annotate({
    description: 'Type of hosting entity associated with the scheduled event',
  }),
  entity_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]).annotate({
    description: 'ID of the hosting entity associated with the scheduled event',
  }),
  recurrence_rule: Schema.Union([
    Schema.NullOr(Schema.Null),
    RecurrenceRuleResponseSchema,
  ]).annotate({ description: 'Recurrence rule for the scheduled event, or null if not recurring' }),
  user_count: Schema.optional(
    Schema.Number.check(Schema.isInt32()).annotate({
      description: 'Number of users subscribed to the scheduled event',
    }),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.annotate({
    description: 'Privacy level of the scheduled event',
  }),
  user_rsvp: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ScheduledEventUserResponseSchema]),
  ),
  guild_scheduled_event_exceptions: Schema.Array(GuildScheduledEventExceptionResponseSchema),
}).annotate({ identifier: 'ScheduledEventResponse' })

export type ScheduledEventResponse = Schema.Schema.Type<typeof ScheduledEventResponseSchema>

export const InviteGuildRoleResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  position: Schema.Number.check(Schema.isInt32()),
  color: Schema.Number.check(Schema.isInt32()),
  colors: GuildRoleColorsResponseSchema,
  icon: Schema.NullOr(Schema.String),
  unicode_emoji: Schema.NullOr(Schema.String),
  permissions: Schema.optional(Schema.String),
}).annotate({ identifier: 'InviteGuildRoleResponse' })

export type InviteGuildRoleResponse = Schema.Schema.Type<typeof InviteGuildRoleResponseSchema>

export const GuildInviteResponseSchema = Schema.Struct({
  type: InviteTypesSchema,
  code: Schema.String,
  inviter: Schema.optional(UserResponseSchema),
  max_age: Schema.optional(Schema.Number.check(Schema.isInt32())),
  created_at: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  expires_at: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  is_contact: Schema.optional(Schema.Boolean),
  flags: Schema.optional(Schema.Number.check(Schema.isInt32())),
  guild: InviteGuildResponseSchema,
  guild_id: SnowflakeTypeSchema,
  channel: InviteChannelResponseSchema,
  target_type: Schema.optional(InviteTargetTypesSchema),
  target_user: Schema.optional(UserResponseSchema),
  target_application: Schema.optional(InviteApplicationResponseSchema),
  guild_scheduled_event: Schema.optional(ScheduledEventResponseSchema),
  target_channel_id: Schema.optional(SnowflakeTypeSchema),
  target_message_id: Schema.optional(SnowflakeTypeSchema),
  uses: Schema.optional(Schema.Number.check(Schema.isInt32())),
  max_uses: Schema.optional(Schema.Number.check(Schema.isInt32())),
  temporary: Schema.optional(Schema.Boolean),
  approximate_member_count: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
  approximate_presence_count: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
  is_nickname_changeable: Schema.optional(Schema.Boolean),
  roles: Schema.optional(Schema.NullOr(Schema.Array(InviteGuildRoleResponseSchema))),
}).annotate({ identifier: 'GuildInviteResponse' })

export type GuildInviteResponse = Schema.Schema.Type<typeof GuildInviteResponseSchema>

export const GuildJoinRequestApplicationStatusSchema = Schema.Union([
  Schema.Literal('STARTED').annotate({
    description: 'Applicant started but not yet submitted join request',
  }),
  Schema.Literal('SUBMITTED').annotate({
    description: 'Applicant submitted join request that is awaiting review',
  }),
  Schema.Literal('REJECTED').annotate({ description: 'Join request rejected' }),
  Schema.Literal('APPROVED').annotate({ description: 'Join request approved' }),
]).annotate({ identifier: 'GuildJoinRequestApplicationStatus' })

export type GuildJoinRequestApplicationStatus = Schema.Schema.Type<
  typeof GuildJoinRequestApplicationStatusSchema
>

export const GuildMemberVerificationFormFieldTypeSchema = Schema.Union([
  Schema.Literal('TERMS').annotate({
    description: 'Field requiring applicant to acknowledge list of terms',
  }),
  Schema.Literal('TEXT_INPUT').annotate({ description: 'Short text input field' }),
  Schema.Literal('PARAGRAPH').annotate({ description: 'Long-form text input field' }),
  Schema.Literal('MULTIPLE_CHOICE').annotate({
    description: 'Field where applicant selects one of many options',
  }),
]).annotate({ identifier: 'GuildMemberVerificationFormFieldType' })

export type GuildMemberVerificationFormFieldType = Schema.Schema.Type<
  typeof GuildMemberVerificationFormFieldTypeSchema
>

export const MultipleChoiceFormFieldResponseSchema = Schema.Struct({
  field_type: GuildMemberVerificationFormFieldTypeSchema.annotate({
    description: 'Type of form field',
  }),
  label: Schema.optional(Schema.String.annotate({ description: 'Label shown above field' })),
  description: Schema.optional(
    Schema.String.annotate({ description: 'Optional helper text shown below label' }),
  ),
  required: Schema.optional(
    Schema.Boolean.annotate({ description: 'Whether applicant must fill in field' }),
  ),
  choices: Schema.Array(Schema.String).annotate({
    description: 'Choices applicant can select from',
  }),
  response: Schema.optional(
    Schema.Number.check(Schema.isInt32()).annotate({
      description: 'Index of choice selected by applicant',
    }),
  ),
}).annotate({ identifier: 'MultipleChoiceFormFieldResponse' })

export type MultipleChoiceFormFieldResponse = Schema.Schema.Type<
  typeof MultipleChoiceFormFieldResponseSchema
>

export const ParagraphFormFieldResponseSchema = Schema.Struct({
  field_type: GuildMemberVerificationFormFieldTypeSchema.annotate({
    description: 'Type of form field',
  }),
  label: Schema.optional(Schema.String.annotate({ description: 'Label shown above field' })),
  description: Schema.optional(
    Schema.String.annotate({ description: 'Optional helper text shown below label' }),
  ),
  required: Schema.optional(
    Schema.Boolean.annotate({ description: 'Whether applicant must fill in field' }),
  ),
  placeholder: Schema.optional(
    Schema.String.annotate({ description: 'Placeholder text shown in empty input' }),
  ),
  response: Schema.optional(Schema.String.annotate({ description: "Applicant's text response" })),
}).annotate({ identifier: 'ParagraphFormFieldResponse' })

export type ParagraphFormFieldResponse = Schema.Schema.Type<typeof ParagraphFormFieldResponseSchema>

export const TermsFormFieldResponseSchema = Schema.Struct({
  field_type: GuildMemberVerificationFormFieldTypeSchema.annotate({
    description: 'Type of form field',
  }),
  label: Schema.optional(Schema.String.annotate({ description: 'Label shown above field' })),
  description: Schema.optional(
    Schema.String.annotate({ description: 'Optional helper text shown below label' }),
  ),
  required: Schema.optional(
    Schema.Boolean.annotate({ description: 'Whether applicant must fill in field' }),
  ),
  values: Schema.Array(Schema.String).annotate({ description: 'Terms applicant must acknowledge' }),
  response: Schema.optional(
    Schema.Boolean.annotate({ description: 'Whether applicant accepted terms' }),
  ),
}).annotate({ identifier: 'TermsFormFieldResponse' })

export type TermsFormFieldResponse = Schema.Schema.Type<typeof TermsFormFieldResponseSchema>

export const TextInputFormFieldResponseSchema = Schema.Struct({
  field_type: GuildMemberVerificationFormFieldTypeSchema.annotate({
    description: 'Type of form field',
  }),
  label: Schema.optional(Schema.String.annotate({ description: 'Label shown above field' })),
  description: Schema.optional(
    Schema.String.annotate({ description: 'Optional helper text shown below label' }),
  ),
  required: Schema.optional(
    Schema.Boolean.annotate({ description: 'Whether applicant must fill in field' }),
  ),
  placeholder: Schema.optional(
    Schema.String.annotate({ description: 'Placeholder text shown in empty input' }),
  ),
  response: Schema.optional(Schema.String.annotate({ description: "Applicant's text response" })),
}).annotate({ identifier: 'TextInputFormFieldResponse' })

export type TextInputFormFieldResponse = Schema.Schema.Type<typeof TextInputFormFieldResponseSchema>

export const GuildJoinRequestResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  created_at: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  reviewed_at: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  application_status: Schema.Union([
    Schema.NullOr(Schema.Null),
    GuildJoinRequestApplicationStatusSchema,
  ]),
  rejection_reason: Schema.NullOr(Schema.String).annotate({
    description: 'Reason request was rejected. Only set when application_status is REJECTED',
  }),
  guild_id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  user: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), UserResponseSchema])),
  form_responses: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          MultipleChoiceFormFieldResponseSchema,
          ParagraphFormFieldResponseSchema,
          TermsFormFieldResponseSchema,
          TextInputFormFieldResponseSchema,
        ]),
      ),
    ).annotate({ description: "Applicant's responses on join request form" }),
  ),
  actioned_by_user: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), UserResponseSchema])),
}).annotate({ identifier: 'GuildJoinRequestResponse' })

export type GuildJoinRequestResponse = Schema.Schema.Type<typeof GuildJoinRequestResponseSchema>

export const GuildJoinRequestsListResponseSchema = Schema.Struct({
  total: Schema.optional(Schema.Number.check(Schema.isInt32())),
  guild_join_requests: Schema.optional(Schema.Array(GuildJoinRequestResponseSchema)),
}).annotate({ identifier: 'GuildJoinRequestsListResponse' })

export type GuildJoinRequestsListResponse = Schema.Schema.Type<
  typeof GuildJoinRequestsListResponseSchema
>

export const GuildMFALevelSchema = Schema.Union([
  Schema.Literal(0).annotate({
    description: 'Guild has no MFA/2FA requirement for moderation actions',
  }),
  Schema.Literal(1).annotate({ description: 'Guild has a 2FA requirement for moderation actions' }),
]).annotate({ identifier: 'GuildMFALevel' })

export type GuildMFALevel = Schema.Schema.Type<typeof GuildMFALevelSchema>

export const GuildOnboardingModeSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'Only Default Channels considered in constraints' }),
  Schema.Literal(1).annotate({
    description: 'Default Channels and Onboarding Prompts considered in constraints',
  }),
]).annotate({ identifier: 'GuildOnboardingMode' })

export type GuildOnboardingMode = Schema.Schema.Type<typeof GuildOnboardingModeSchema>

export const OnboardingPromptOptionResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  title: Schema.String,
  description: Schema.String,
  emoji: SettingsEmojiResponseSchema,
  role_ids: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  channel_ids: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
}).annotate({ identifier: 'OnboardingPromptOptionResponse' })

export type OnboardingPromptOptionResponse = Schema.Schema.Type<
  typeof OnboardingPromptOptionResponseSchema
>

export const OnboardingPromptTypeSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'Multiple choice options' }),
  Schema.Literal(1).annotate({ description: 'Many options shown as a dropdown' }),
]).annotate({ identifier: 'OnboardingPromptType' })

export type OnboardingPromptType = Schema.Schema.Type<typeof OnboardingPromptTypeSchema>

export const OnboardingPromptResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  title: Schema.String,
  options: Schema.Array(OnboardingPromptOptionResponseSchema),
  single_select: Schema.Boolean,
  required: Schema.Boolean,
  in_onboarding: Schema.Boolean,
  type: OnboardingPromptTypeSchema,
}).annotate({ identifier: 'OnboardingPromptResponse' })

export type OnboardingPromptResponse = Schema.Schema.Type<typeof OnboardingPromptResponseSchema>

export const GuildOnboardingResponseSchema = Schema.Struct({
  guild_id: SnowflakeTypeSchema,
  prompts: Schema.Array(OnboardingPromptResponseSchema),
  default_channel_ids: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  enabled: Schema.Boolean,
  mode: GuildOnboardingModeSchema,
}).annotate({ identifier: 'GuildOnboardingResponse' })

export type GuildOnboardingResponse = Schema.Schema.Type<typeof GuildOnboardingResponseSchema>

export const UserNotificationSettingsSchema = Schema.Union([
  Schema.Literal(0).annotate({
    description: 'members will receive notifications for all messages by default',
  }),
  Schema.Literal(1).annotate({
    description:
      'members will receive notifications only for messages that @mention them by default',
  }),
]).annotate({ identifier: 'UserNotificationSettings' })

export type UserNotificationSettings = Schema.Schema.Type<typeof UserNotificationSettingsSchema>

export const GuildPatchRequestPartialSchema = Schema.Struct({
  name: Schema.optional(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length >= 2, {
        expected: 'a string of at least 2 characters',
      }),
      Schema.makeFilter((input) => [...input].length <= 100, {
        expected: 'a string of at most 100 characters',
      }),
    ),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 0, {
          expected: 'a string of at least 0 characters',
        }),
        Schema.makeFilter((input) => [...input].length <= 300, {
          expected: 'a string of at most 300 characters',
        }),
      ),
    ),
  ),
  region: Schema.optional(Schema.NullOr(Schema.String)),
  icon: Schema.optional(Schema.NullOr(Schema.String)),
  verification_level: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), VerificationLevelsSchema]),
  ),
  default_message_notifications: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UserNotificationSettingsSchema]),
  ),
  explicit_content_filter: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), GuildExplicitContentFilterTypesSchema]),
  ),
  preferred_locale: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), AvailableLocalesEnumSchema]),
  ),
  afk_timeout: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), AfkTimeoutsSchema])),
  afk_channel_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  system_channel_id: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  ),
  splash: Schema.optional(Schema.NullOr(Schema.String)),
  banner: Schema.optional(Schema.NullOr(Schema.String)),
  system_channel_flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  features: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.NullOr(
          Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        ),
      ).check(Schema.isMaxLength(1521), Schema.isUnique()),
    ),
  ),
  discovery_splash: Schema.optional(Schema.NullOr(Schema.String)),
  home_header: Schema.optional(Schema.NullOr(Schema.String)),
  rules_channel_id: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  ),
  safety_alerts_channel_id: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  ),
  public_updates_channel_id: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  ),
  premium_progress_bar_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'GuildPatchRequestPartial' })

export type GuildPatchRequestPartial = Schema.Schema.Type<typeof GuildPatchRequestPartialSchema>

export const GuildPreviewResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  icon: Schema.NullOr(Schema.String),
  description: Schema.NullOr(Schema.String),
  home_header: Schema.NullOr(Schema.String),
  splash: Schema.NullOr(Schema.String),
  discovery_splash: Schema.NullOr(Schema.String),
  features: Schema.Array(GuildFeaturesSchema).check(Schema.isUnique()),
  approximate_member_count: Schema.Number.check(Schema.isInt32()),
  approximate_presence_count: Schema.Number.check(Schema.isInt32()),
  emojis: Schema.Array(EmojiResponseSchema),
  stickers: Schema.Array(GuildStickerResponseSchema),
}).annotate({ identifier: 'GuildPreviewResponse' })

export type GuildPreviewResponse = Schema.Schema.Type<typeof GuildPreviewResponseSchema>

export const GuildPruneResponseSchema = Schema.Struct({
  pruned: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
}).annotate({ identifier: 'GuildPruneResponse' })

export type GuildPruneResponse = Schema.Schema.Type<typeof GuildPruneResponseSchema>

export const PremiumGuildTiersSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'Guild has not unlocked any Server Boost perks' }),
  Schema.Literal(1).annotate({ description: 'Guild has unlocked Server Boost level 1 perks' }),
  Schema.Literal(2).annotate({ description: 'Guild has unlocked Server Boost level 2 perks' }),
  Schema.Literal(3).annotate({ description: 'Guild has unlocked Server Boost level 3 perks' }),
]).annotate({ identifier: 'PremiumGuildTiers' })

export type PremiumGuildTiers = Schema.Schema.Type<typeof PremiumGuildTiersSchema>

export const GuildResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  icon: Schema.NullOr(Schema.String),
  description: Schema.NullOr(Schema.String),
  home_header: Schema.NullOr(Schema.String),
  splash: Schema.NullOr(Schema.String),
  discovery_splash: Schema.NullOr(Schema.String),
  features: Schema.Array(GuildFeaturesSchema).check(Schema.isUnique()),
  banner: Schema.NullOr(Schema.String),
  owner_id: SnowflakeTypeSchema,
  application_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  region: Schema.String,
  afk_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  system_channel_flags: Schema.Number.check(Schema.isInt32()),
  widget_enabled: Schema.Boolean,
  widget_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  verification_level: VerificationLevelsSchema,
  roles: Schema.Array(GuildRoleResponseSchema),
  default_message_notifications: UserNotificationSettingsSchema,
  mfa_level: GuildMFALevelSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  max_presences: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
  max_members: Schema.Number.check(Schema.isInt32()),
  max_stage_video_channel_users: Schema.Number.check(Schema.isInt32()),
  max_video_channel_users: Schema.Number.check(Schema.isInt32()),
  vanity_url_code: Schema.NullOr(Schema.String),
  premium_tier: PremiumGuildTiersSchema,
  premium_subscription_count: Schema.Number.check(Schema.isInt32()),
  preferred_locale: AvailableLocalesEnumSchema,
  rules_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  safety_alerts_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  public_updates_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  premium_progress_bar_enabled: Schema.Boolean,
  premium_progress_bar_enabled_user_updated_at: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  nsfw: Schema.Boolean,
  nsfw_level: GuildNSFWContentLevelSchema,
  emojis: Schema.Array(EmojiResponseSchema),
  stickers: Schema.Array(GuildStickerResponseSchema),
  incidents_data: Schema.Union([Schema.NullOr(Schema.Null), GuildIncidentsDataResponseSchema]),
}).annotate({ identifier: 'GuildResponse' })

export type GuildResponse = Schema.Schema.Type<typeof GuildResponseSchema>

export const GuildScheduledEventExceptionCreateRequestSchema = Schema.Struct({
  scheduled_start_time: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ).annotate({ description: 'Overridden start time of this occurrence' }),
  ),
  scheduled_end_time: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ).annotate({ description: 'Overridden end time of this occurrence' }),
  ),
  original_scheduled_start_time: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({
    description: 'The original start time of the occurrence to create an exception for',
  }),
  is_canceled: Schema.optional(
    Schema.NullOr(Schema.Boolean).annotate({ description: 'Whether this occurrence is canceled' }),
  ),
}).annotate({ identifier: 'GuildScheduledEventExceptionCreateRequest' })

export type GuildScheduledEventExceptionCreateRequest = Schema.Schema.Type<
  typeof GuildScheduledEventExceptionCreateRequestSchema
>

export const GuildScheduledEventExceptionPatchRequestPartialSchema = Schema.Struct({
  scheduled_start_time: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ).annotate({ description: 'Overridden start time of this occurrence' }),
  ),
  scheduled_end_time: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ).annotate({ description: 'Overridden end time of this occurrence' }),
  ),
  is_canceled: Schema.optional(
    Schema.NullOr(Schema.Boolean).annotate({ description: 'Whether this occurrence is canceled' }),
  ),
}).annotate({ identifier: 'GuildScheduledEventExceptionPatchRequestPartial' })

export type GuildScheduledEventExceptionPatchRequestPartial = Schema.Schema.Type<
  typeof GuildScheduledEventExceptionPatchRequestPartialSchema
>

export const SearchMessageResponseSchema = Schema.Struct({
  type: MessageTypeSchema,
  content: Schema.String,
  mentions: Schema.Array(UserResponseSchema),
  mention_roles: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  attachments: Schema.Array(MessageAttachmentResponseSchema),
  embeds: Schema.Array(MessageEmbedResponseSchema),
  timestamp: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  edited_timestamp: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  flags: Schema.Number.check(Schema.isInt32()),
  components: Schema.Array(
    Schema.Union([
      ActionRowComponentResponseSchema,
      ContainerComponentResponseSchema,
      FileComponentResponseSchema,
      MediaGalleryComponentResponseSchema,
      SectionComponentResponseSchema,
      SeparatorComponentResponseSchema,
      TextDisplayComponentResponseSchema,
    ]),
  ),
  stickers: Schema.optional(
    Schema.Array(Schema.Union([GuildStickerResponseSchema, StandardStickerResponseSchema])),
  ),
  sticker_items: Schema.optional(Schema.Array(MessageStickerItemResponseSchema)),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: Schema.Boolean,
  mention_everyone: Schema.Boolean,
  tts: Schema.Boolean,
  call: Schema.optional(MessageCallResponseSchema),
  activity: Schema.optional(MessageActivityResponseSchema),
  application: Schema.optional(BasicApplicationResponseWithBotSchema),
  application_id: Schema.optional(SnowflakeTypeSchema),
  interaction: Schema.optional(MessageInteractionResponseSchema),
  nonce: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
          Schema.isGreaterThanOrEqualToBigInt(-9223372036854776000n),
          Schema.isLessThanOrEqualToBigInt(9223372036854776000n),
        ),
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 25, {
          expected: 'a string of at most 25 characters',
        }),
      ),
    ]),
  ),
  webhook_id: Schema.optional(SnowflakeTypeSchema),
  message_reference: Schema.optional(MessageReferenceResponseSchema),
  thread: Schema.optional(ThreadResponseSchema),
  mention_channels: Schema.optional(Schema.Array(MessageMentionChannelResponseSchema)),
  role_subscription_data: Schema.optional(MessageRoleSubscriptionDataResponseSchema),
  purchase_notification: Schema.optional(PurchaseNotificationResponseSchema),
  position: Schema.optional(Schema.Number.check(Schema.isInt32())),
  resolved: Schema.optional(ResolvedObjectsResponseSchema),
  poll: Schema.optional(PollResponseSchema),
  shared_client_theme: Schema.optional(CustomClientThemeResponseSchema),
  interaction_metadata: Schema.optional(
    Schema.Union([
      ApplicationCommandInteractionMetadataResponseSchema,
      MessageComponentInteractionMetadataResponseSchema,
      ModalSubmitInteractionMetadataResponseSchema,
    ]),
  ),
  message_snapshots: Schema.optional(Schema.Array(MessageSnapshotResponseSchema)),
  lobby_member: Schema.optional(MessageLobbyMemberResponseSchema),
  actor: Schema.optional(UserResponseSchema),
  reactions: Schema.optional(Schema.Array(MessageReactionResponseSchema)),
  referenced_message: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), BasicMessageResponseSchema]),
  ),
  hit: Schema.Boolean,
  restriction_count: Schema.optional(Schema.Number.check(Schema.isInt32())),
  author_restriction_count: Schema.optional(Schema.Number.check(Schema.isInt32())),
  source_author_restriction_count: Schema.optional(Schema.Number.check(Schema.isInt32())),
  forward_source_author_id: Schema.optional(SnowflakeTypeSchema),
}).annotate({ identifier: 'SearchMessageResponse' })

export type SearchMessageResponse = Schema.Schema.Type<typeof SearchMessageResponseSchema>

export const GuildSearchResponseSchema = Schema.Struct({
  messages: Schema.Array(Schema.Array(SearchMessageResponseSchema)),
  doing_deep_historical_index: Schema.Boolean,
  total_results: Schema.Number.check(Schema.isInt32()),
  threads: Schema.optional(Schema.NullOr(Schema.Array(ThreadResponseSchema))),
  members: Schema.optional(Schema.NullOr(Schema.Array(ThreadMemberResponseSchema))),
  documents_indexed: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
}).annotate({ identifier: 'GuildSearchResponse' })

export type GuildSearchResponse = Schema.Schema.Type<typeof GuildSearchResponseSchema>

export const GuildSubscriptionIntegrationResponseSchema = Schema.Struct({
  type: IntegrationTypesSchema,
  name: Schema.NullOr(Schema.String),
  account: AccountResponseSchema,
  enabled: Schema.Boolean,
  id: SnowflakeTypeSchema,
}).annotate({ identifier: 'GuildSubscriptionIntegrationResponse' })

export type GuildSubscriptionIntegrationResponse = Schema.Schema.Type<
  typeof GuildSubscriptionIntegrationResponseSchema
>

export const GuildTemplateChannelTagsSchema = Schema.Struct({
  id: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
  name: Schema.String,
  emoji_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  emoji_name: Schema.NullOr(Schema.String),
  moderated: Schema.NullOr(Schema.Boolean),
}).annotate({ identifier: 'GuildTemplateChannelTags' })

export type GuildTemplateChannelTags = Schema.Schema.Type<typeof GuildTemplateChannelTagsSchema>

export const GuildTemplateChannelResponseSchema = Schema.Struct({
  id: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
  type: ChannelTypesSchema,
  name: Schema.NullOr(Schema.String),
  position: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
  topic: Schema.NullOr(Schema.String),
  bitrate: Schema.Number.check(Schema.isInt32()),
  user_limit: Schema.Number.check(Schema.isInt32()),
  nsfw: Schema.Boolean,
  rate_limit_per_user: Schema.Number.check(Schema.isInt32()),
  parent_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  default_auto_archive_duration: Schema.Union([
    Schema.NullOr(Schema.Null),
    ThreadAutoArchiveDurationSchema,
  ]),
  permission_overwrites: Schema.Array(ChannelPermissionOverwriteResponseSchema),
  available_tags: Schema.NullOr(Schema.Array(GuildTemplateChannelTagsSchema)),
  template: Schema.String,
  default_reaction_emoji: Schema.Union([
    Schema.NullOr(Schema.Null),
    DefaultReactionEmojiResponseSchema,
  ]),
  default_thread_rate_limit_per_user: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
  default_sort_order: Schema.Union([Schema.NullOr(Schema.Null), ThreadSortOrderSchema]),
  default_forum_layout: Schema.Union([Schema.NullOr(Schema.Null), ForumLayoutSchema]),
  default_tag_setting: Schema.Union([Schema.NullOr(Schema.Null), ThreadSearchTagSettingSchema]),
  theme_color: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
}).annotate({ identifier: 'GuildTemplateChannelResponse' })

export type GuildTemplateChannelResponse = Schema.Schema.Type<
  typeof GuildTemplateChannelResponseSchema
>

export const GuildTemplateRoleColorsResponseSchema = Schema.Struct({
  primary_color: Schema.Number.check(Schema.isInt32()),
  secondary_color: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
  tertiary_color: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
}).annotate({ identifier: 'GuildTemplateRoleColorsResponse' })

export type GuildTemplateRoleColorsResponse = Schema.Schema.Type<
  typeof GuildTemplateRoleColorsResponseSchema
>

export const GuildTemplateRoleResponseSchema = Schema.Struct({
  id: Schema.Number.check(Schema.isInt32()),
  name: Schema.String,
  permissions: Schema.String,
  color: Schema.Number.check(Schema.isInt32()),
  colors: Schema.Union([Schema.NullOr(Schema.Null), GuildTemplateRoleColorsResponseSchema]),
  hoist: Schema.Boolean,
  mentionable: Schema.Boolean,
  icon: Schema.NullOr(Schema.String),
  unicode_emoji: Schema.NullOr(Schema.String),
}).annotate({ identifier: 'GuildTemplateRoleResponse' })

export type GuildTemplateRoleResponse = Schema.Schema.Type<typeof GuildTemplateRoleResponseSchema>

export const GuildTemplateSnapshotResponseSchema = Schema.Struct({
  name: Schema.String,
  description: Schema.NullOr(Schema.String),
  region: Schema.NullOr(Schema.String),
  verification_level: VerificationLevelsSchema,
  default_message_notifications: UserNotificationSettingsSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  preferred_locale: AvailableLocalesEnumSchema,
  afk_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  system_channel_flags: Schema.Number.check(Schema.isInt32()),
  roles: Schema.Array(GuildTemplateRoleResponseSchema),
  channels: Schema.Array(GuildTemplateChannelResponseSchema),
}).annotate({ identifier: 'GuildTemplateSnapshotResponse' })

export type GuildTemplateSnapshotResponse = Schema.Schema.Type<
  typeof GuildTemplateSnapshotResponseSchema
>

export const GuildTemplateResponseSchema = Schema.Struct({
  code: Schema.String,
  name: Schema.String,
  description: Schema.NullOr(Schema.String),
  usage_count: Schema.Number.check(Schema.isInt32()),
  creator_id: SnowflakeTypeSchema,
  creator: Schema.Union([Schema.NullOr(Schema.Null), UserResponseSchema]),
  created_at: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  updated_at: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  source_guild_id: SnowflakeTypeSchema,
  serialized_source_guild: GuildTemplateSnapshotResponseSchema,
  is_dirty: Schema.NullOr(Schema.Boolean),
}).annotate({ identifier: 'GuildTemplateResponse' })

export type GuildTemplateResponse = Schema.Schema.Type<typeof GuildTemplateResponseSchema>

export const GuildWelcomeChannelSchema = Schema.Struct({
  channel_id: SnowflakeTypeSchema,
  description: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 50, {
      expected: 'a string of at most 50 characters',
    }),
  ),
  emoji_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  emoji_name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'GuildWelcomeChannel' })

export type GuildWelcomeChannel = Schema.Schema.Type<typeof GuildWelcomeChannelSchema>

export const GuildWelcomeScreenChannelResponseSchema = Schema.Struct({
  channel_id: SnowflakeTypeSchema,
  description: Schema.String,
  emoji_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  emoji_name: Schema.NullOr(Schema.String),
}).annotate({ identifier: 'GuildWelcomeScreenChannelResponse' })

export type GuildWelcomeScreenChannelResponse = Schema.Schema.Type<
  typeof GuildWelcomeScreenChannelResponseSchema
>

export const GuildWelcomeScreenResponseSchema = Schema.Struct({
  description: Schema.NullOr(Schema.String),
  welcome_channels: Schema.Array(GuildWelcomeScreenChannelResponseSchema),
}).annotate({ identifier: 'GuildWelcomeScreenResponse' })

export type GuildWelcomeScreenResponse = Schema.Schema.Type<typeof GuildWelcomeScreenResponseSchema>

export const GuildWithCountsResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  icon: Schema.NullOr(Schema.String),
  description: Schema.NullOr(Schema.String),
  home_header: Schema.NullOr(Schema.String),
  splash: Schema.NullOr(Schema.String),
  discovery_splash: Schema.NullOr(Schema.String),
  features: Schema.Array(GuildFeaturesSchema).check(Schema.isUnique()),
  banner: Schema.NullOr(Schema.String),
  owner_id: SnowflakeTypeSchema,
  application_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  region: Schema.String,
  afk_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  system_channel_flags: Schema.Number.check(Schema.isInt32()),
  widget_enabled: Schema.Boolean,
  widget_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  verification_level: VerificationLevelsSchema,
  roles: Schema.Array(GuildRoleResponseSchema),
  default_message_notifications: UserNotificationSettingsSchema,
  mfa_level: GuildMFALevelSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  max_presences: Schema.NullOr(Schema.Number.check(Schema.isInt32())),
  max_members: Schema.Number.check(Schema.isInt32()),
  max_stage_video_channel_users: Schema.Number.check(Schema.isInt32()),
  max_video_channel_users: Schema.Number.check(Schema.isInt32()),
  vanity_url_code: Schema.NullOr(Schema.String),
  premium_tier: PremiumGuildTiersSchema,
  premium_subscription_count: Schema.Number.check(Schema.isInt32()),
  preferred_locale: AvailableLocalesEnumSchema,
  rules_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  safety_alerts_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  public_updates_channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  premium_progress_bar_enabled: Schema.Boolean,
  premium_progress_bar_enabled_user_updated_at: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  nsfw: Schema.Boolean,
  nsfw_level: GuildNSFWContentLevelSchema,
  emojis: Schema.Array(EmojiResponseSchema),
  stickers: Schema.Array(GuildStickerResponseSchema),
  incidents_data: Schema.Union([Schema.NullOr(Schema.Null), GuildIncidentsDataResponseSchema]),
  approximate_member_count: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
  approximate_presence_count: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
}).annotate({ identifier: 'GuildWithCountsResponse' })

export type GuildWithCountsResponse = Schema.Schema.Type<typeof GuildWithCountsResponseSchema>

export const HasOptionSchema = Schema.Union([
  Schema.Literal('link'),
  Schema.Literal('embed'),
  Schema.Literal('file'),
  Schema.Literal('image'),
  Schema.Literal('video'),
  Schema.Literal('sound'),
  Schema.Literal('sticker'),
  Schema.Literal('poll'),
  Schema.Literal('snapshot'),
  Schema.Literal('-link'),
  Schema.Literal('-embed'),
  Schema.Literal('-file'),
  Schema.Literal('-image'),
  Schema.Literal('-video'),
  Schema.Literal('-sound'),
  Schema.Literal('-sticker'),
  Schema.Literal('-poll'),
  Schema.Literal('-snapshot'),
]).annotate({ identifier: 'HasOption' })

export type HasOption = Schema.Schema.Type<typeof HasOptionSchema>

export const IncomingWebhookRequestPartialSchema = Schema.Struct({
  content: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 2000, {
          expected: 'a string of at most 2000 characters',
        }),
      ),
    ),
  ),
  embeds: Schema.optional(
    Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
  ),
  allowed_mentions: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MessageAllowedMentionsRequestSchema]),
  ),
  components: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      ).check(Schema.isMaxLength(40)),
    ),
  ),
  attachments: Schema.optional(
    Schema.NullOr(Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10))),
  ),
  poll: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), PollCreateRequestSchema])),
  tts: Schema.optional(Schema.NullOr(Schema.Boolean)),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  username: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 80, {
          expected: 'a string of at most 80 characters',
        }),
      ),
    ),
  ),
  avatar_url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  thread_name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 0, {
          expected: 'a string of at least 0 characters',
        }),
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  applied_tags: Schema.optional(
    Schema.NullOr(Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(5))),
  ),
}).annotate({ identifier: 'IncomingWebhookRequestPartial' })

export type IncomingWebhookRequestPartial = Schema.Schema.Type<
  typeof IncomingWebhookRequestPartialSchema
>

export const IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema = Schema.Struct({
  content: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 2000, {
          expected: 'a string of at most 2000 characters',
        }),
      ),
    ),
  ),
  embeds: Schema.optional(
    Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
  ),
  allowed_mentions: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MessageAllowedMentionsRequestSchema]),
  ),
  components: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      ).check(Schema.isMaxLength(40)),
    ),
  ),
  attachments: Schema.optional(
    Schema.NullOr(Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10))),
  ),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
}).annotate({ identifier: 'IncomingWebhookUpdateForInteractionCallbackRequestPartial' })

export type IncomingWebhookUpdateForInteractionCallbackRequestPartial = Schema.Schema.Type<
  typeof IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema
>

export const IncomingWebhookUpdateRequestPartialSchema = Schema.Struct({
  content: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 2000, {
          expected: 'a string of at most 2000 characters',
        }),
      ),
    ),
  ),
  embeds: Schema.optional(
    Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
  ),
  allowed_mentions: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MessageAllowedMentionsRequestSchema]),
  ),
  components: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      ).check(Schema.isMaxLength(40)),
    ),
  ),
  attachments: Schema.optional(
    Schema.NullOr(Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10))),
  ),
  poll: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), PollCreateRequestSchema])),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
}).annotate({ identifier: 'IncomingWebhookUpdateRequestPartial' })

export type IncomingWebhookUpdateRequestPartial = Schema.Schema.Type<
  typeof IncomingWebhookUpdateRequestPartialSchema
>

export const InteractionResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  activity_instance_id: Schema.optional(Schema.NullOr(Schema.String)),
  response_message_id: Schema.optional(SnowflakeTypeSchema),
  response_message_loading: Schema.optional(Schema.Boolean),
  response_message_ephemeral: Schema.optional(Schema.Boolean),
  channel_id: Schema.optional(SnowflakeTypeSchema),
  guild_id: Schema.optional(SnowflakeTypeSchema),
}).annotate({ identifier: 'InteractionResponse' })

export type InteractionResponse = Schema.Schema.Type<typeof InteractionResponseSchema>

export const LaunchActivityInteractionCallbackResponseSchema = Schema.Struct({
  type: InteractionCallbackTypesSchema,
  activity_instance: ActivityInstanceCallbackResponseSchema,
}).annotate({ identifier: 'LaunchActivityInteractionCallbackResponse' })

export type LaunchActivityInteractionCallbackResponse = Schema.Schema.Type<
  typeof LaunchActivityInteractionCallbackResponseSchema
>

export const UpdateMessageInteractionCallbackResponseSchema = Schema.Struct({
  type: InteractionCallbackTypesSchema,
  message: MessageResponseSchema,
}).annotate({ identifier: 'UpdateMessageInteractionCallbackResponse' })

export type UpdateMessageInteractionCallbackResponse = Schema.Schema.Type<
  typeof UpdateMessageInteractionCallbackResponseSchema
>

export const InteractionCallbackResponseSchema = Schema.Struct({
  interaction: InteractionResponseSchema,
  resource: Schema.optional(
    Schema.Union([
      CreateMessageInteractionCallbackResponseSchema,
      LaunchActivityInteractionCallbackResponseSchema,
      UpdateMessageInteractionCallbackResponseSchema,
    ]),
  ),
}).annotate({ identifier: 'InteractionCallbackResponse' })

export type InteractionCallbackResponse = Schema.Schema.Type<
  typeof InteractionCallbackResponseSchema
>

export const KeywordTriggerMetadataSchema = Schema.Struct({
  keyword_filter: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 60, {
            expected: 'a string of at most 60 characters',
          }),
        ),
      ).check(Schema.isMaxLength(1000)),
    ),
  ),
  regex_patterns: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 260, {
            expected: 'a string of at most 260 characters',
          }),
        ),
      ).check(Schema.isMaxLength(10)),
    ),
  ),
  allow_list: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 60, {
            expected: 'a string of at most 60 characters',
          }),
        ),
      ).check(Schema.isMaxLength(100)),
    ),
  ),
}).annotate({ identifier: 'KeywordTriggerMetadata' })

export type KeywordTriggerMetadata = Schema.Schema.Type<typeof KeywordTriggerMetadataSchema>

export const KeywordUpsertRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  event_type: AutomodEventTypeSchema,
  actions: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
    ),
  ),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  exempt_roles: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(20), Schema.isUnique()),
    ),
  ),
  exempt_channels: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(50), Schema.isUnique()),
    ),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), KeywordTriggerMetadataSchema]),
  ),
}).annotate({ identifier: 'KeywordUpsertRequest' })

export type KeywordUpsertRequest = Schema.Schema.Type<typeof KeywordUpsertRequestSchema>

export const KeywordUpsertRequestPartialSchema = Schema.Struct({
  name: Schema.optional(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 100, {
        expected: 'a string of at most 100 characters',
      }),
    ),
  ),
  event_type: Schema.optional(AutomodEventTypeSchema),
  actions: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
    ),
  ),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  exempt_roles: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(20), Schema.isUnique()),
    ),
  ),
  exempt_channels: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(50), Schema.isUnique()),
    ),
  ),
  trigger_type: Schema.optional(AutomodTriggerTypeSchema),
  trigger_metadata: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), KeywordTriggerMetadataSchema]),
  ),
}).annotate({ identifier: 'KeywordUpsertRequestPartial' })

export type KeywordUpsertRequestPartial = Schema.Schema.Type<
  typeof KeywordUpsertRequestPartialSchema
>

export const MentionableSelectComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 150, {
          expected: 'a string of at most 150 characters',
        }),
      ),
    ),
  ),
  min_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  max_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  default_values: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([RoleSelectDefaultValueSchema, UserSelectDefaultValueSchema]),
      ).check(Schema.isMaxLength(25)),
    ),
  ),
}).annotate({ identifier: 'MentionableSelectComponentForModalRequest' })

export type MentionableSelectComponentForModalRequest = Schema.Schema.Type<
  typeof MentionableSelectComponentForModalRequestSchema
>

export const RadioGroupOptionForRequestSchema = Schema.Struct({
  label: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  value: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  default: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'RadioGroupOptionForRequest' })

export type RadioGroupOptionForRequest = Schema.Schema.Type<typeof RadioGroupOptionForRequestSchema>

export const RadioGroupComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  options: Schema.Array(RadioGroupOptionForRequestSchema).check(
    Schema.isMinLength(2),
    Schema.isMaxLength(10),
  ),
}).annotate({ identifier: 'RadioGroupComponentForModalRequest' })

export type RadioGroupComponentForModalRequest = Schema.Schema.Type<
  typeof RadioGroupComponentForModalRequestSchema
>

export const RoleSelectComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 150, {
          expected: 'a string of at most 150 characters',
        }),
      ),
    ),
  ),
  min_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  max_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  default_values: Schema.optional(
    Schema.NullOr(Schema.Array(RoleSelectDefaultValueSchema).check(Schema.isMaxLength(25))),
  ),
}).annotate({ identifier: 'RoleSelectComponentForModalRequest' })

export type RoleSelectComponentForModalRequest = Schema.Schema.Type<
  typeof RoleSelectComponentForModalRequestSchema
>

export const StringSelectComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 150, {
          expected: 'a string of at most 150 characters',
        }),
      ),
    ),
  ),
  min_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  max_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  options: Schema.Array(StringSelectOptionForRequestSchema).check(
    Schema.isMinLength(1),
    Schema.isMaxLength(25),
  ),
}).annotate({ identifier: 'StringSelectComponentForModalRequest' })

export type StringSelectComponentForModalRequest = Schema.Schema.Type<
  typeof StringSelectComponentForModalRequestSchema
>

export const UserSelectComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  placeholder: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 150, {
          expected: 'a string of at most 150 characters',
        }),
      ),
    ),
  ),
  min_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  max_values: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(25),
      ),
    ),
  ),
  disabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  default_values: Schema.optional(
    Schema.NullOr(Schema.Array(UserSelectDefaultValueSchema).check(Schema.isMaxLength(25))),
  ),
}).annotate({ identifier: 'UserSelectComponentForModalRequest' })

export type UserSelectComponentForModalRequest = Schema.Schema.Type<
  typeof UserSelectComponentForModalRequestSchema
>

export const LabelComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  label: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 45, {
      expected: 'a string of at most 45 characters',
    }),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  component: Schema.Union([
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
}).annotate({ identifier: 'LabelComponentForModalRequest' })

export type LabelComponentForModalRequest = Schema.Schema.Type<
  typeof LabelComponentForModalRequestSchema
>

export const LaunchActivityInteractionCallbackRequestSchema = Schema.Struct({
  type: InteractionCallbackTypesSchema,
}).annotate({ identifier: 'LaunchActivityInteractionCallbackRequest' })

export type LaunchActivityInteractionCallbackRequest = Schema.Schema.Type<
  typeof LaunchActivityInteractionCallbackRequestSchema
>

export const ListApplicationEmojisResponseSchema = Schema.Struct({
  items: Schema.Array(EmojiResponseSchema),
}).annotate({ identifier: 'ListApplicationEmojisResponse' })

export type ListApplicationEmojisResponse = Schema.Schema.Type<
  typeof ListApplicationEmojisResponseSchema
>

export const SoundboardSoundResponseSchema = Schema.Struct({
  name: Schema.String,
  sound_id: SnowflakeTypeSchema,
  volume: Schema.Number,
  emoji_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  emoji_name: Schema.NullOr(Schema.String),
  guild_id: Schema.optional(SnowflakeTypeSchema),
  available: Schema.Boolean,
  user: Schema.optional(UserResponseSchema),
}).annotate({ identifier: 'SoundboardSoundResponse' })

export type SoundboardSoundResponse = Schema.Schema.Type<typeof SoundboardSoundResponseSchema>

export const ListGuildSoundboardSoundsResponseSchema = Schema.Struct({
  items: Schema.Array(SoundboardSoundResponseSchema),
}).annotate({ identifier: 'ListGuildSoundboardSoundsResponse' })

export type ListGuildSoundboardSoundsResponse = Schema.Schema.Type<
  typeof ListGuildSoundboardSoundsResponseSchema
>

export const LobbyGuildInviteResponseSchema = Schema.Struct({ code: Schema.String }).annotate({
  identifier: 'LobbyGuildInviteResponse',
})

export type LobbyGuildInviteResponse = Schema.Schema.Type<typeof LobbyGuildInviteResponseSchema>

export const LobbyMemberRequestSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  metadata: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length <= 1024, {
            expected: 'a string of at most 1024 characters',
          }),
        ),
      ),
    ),
  ),
  flags: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), Schema.Literal(1)])),
  additional_name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 80, {
          expected: 'a string of at most 80 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'LobbyMemberRequest' })

export type LobbyMemberRequest = Schema.Schema.Type<typeof LobbyMemberRequestSchema>

export const LobbyMemberResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  flags: Schema.Number.check(Schema.isInt32()),
  additional_name: Schema.optional(Schema.String),
}).annotate({ identifier: 'LobbyMemberResponse' })

export type LobbyMemberResponse = Schema.Schema.Type<typeof LobbyMemberResponseSchema>

export const LobbyMessageResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  type: MessageTypeSchema,
  content: Schema.String,
  lobby_id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  lobby_member: Schema.optional(MessageLobbyMemberResponseSchema),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  moderation_metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  flags: Schema.Number.check(Schema.isInt32()),
  application_id: Schema.optional(SnowflakeTypeSchema),
}).annotate({ identifier: 'LobbyMessageResponse' })

export type LobbyMessageResponse = Schema.Schema.Type<typeof LobbyMessageResponseSchema>

export const LobbyResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  members: Schema.Array(LobbyMemberResponseSchema),
  linked_channel: Schema.optional(GuildChannelResponseSchema),
  flags: UInt32TypeSchema,
  override_event_webhooks_url: Schema.optional(Schema.NullOr(Schema.String)),
}).annotate({ identifier: 'LobbyResponse' })

export type LobbyResponse = Schema.Schema.Type<typeof LobbyResponseSchema>

export const MLSpamTriggerMetadataSchema = Schema.Struct({}).annotate({
  identifier: 'MLSpamTriggerMetadata',
})

export type MLSpamTriggerMetadata = Schema.Schema.Type<typeof MLSpamTriggerMetadataSchema>

export const MLSpamUpsertRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  event_type: AutomodEventTypeSchema,
  actions: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
    ),
  ),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  exempt_roles: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(20), Schema.isUnique()),
    ),
  ),
  exempt_channels: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(50), Schema.isUnique()),
    ),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MLSpamTriggerMetadataSchema]),
  ),
}).annotate({ identifier: 'MLSpamUpsertRequest' })

export type MLSpamUpsertRequest = Schema.Schema.Type<typeof MLSpamUpsertRequestSchema>

export const MLSpamUpsertRequestPartialSchema = Schema.Struct({
  name: Schema.optional(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 100, {
        expected: 'a string of at most 100 characters',
      }),
    ),
  ),
  event_type: Schema.optional(AutomodEventTypeSchema),
  actions: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
    ),
  ),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  exempt_roles: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(20), Schema.isUnique()),
    ),
  ),
  exempt_channels: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(50), Schema.isUnique()),
    ),
  ),
  trigger_type: Schema.optional(AutomodTriggerTypeSchema),
  trigger_metadata: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MLSpamTriggerMetadataSchema]),
  ),
}).annotate({ identifier: 'MLSpamUpsertRequestPartial' })

export type MLSpamUpsertRequestPartial = Schema.Schema.Type<typeof MLSpamUpsertRequestPartialSchema>

export const MentionSpamTriggerMetadataSchema = Schema.Struct({
  mention_total_limit: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(50),
      ),
    ),
  ),
  mention_raid_protection_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'MentionSpamTriggerMetadata' })

export type MentionSpamTriggerMetadata = Schema.Schema.Type<typeof MentionSpamTriggerMetadataSchema>

export const MentionSpamUpsertRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  event_type: AutomodEventTypeSchema,
  actions: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
    ),
  ),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  exempt_roles: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(20), Schema.isUnique()),
    ),
  ),
  exempt_channels: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(50), Schema.isUnique()),
    ),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MentionSpamTriggerMetadataSchema]),
  ),
}).annotate({ identifier: 'MentionSpamUpsertRequest' })

export type MentionSpamUpsertRequest = Schema.Schema.Type<typeof MentionSpamUpsertRequestSchema>

export const MentionSpamUpsertRequestPartialSchema = Schema.Struct({
  name: Schema.optional(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 100, {
        expected: 'a string of at most 100 characters',
      }),
    ),
  ),
  event_type: Schema.optional(AutomodEventTypeSchema),
  actions: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
    ),
  ),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  exempt_roles: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(20), Schema.isUnique()),
    ),
  ),
  exempt_channels: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(50), Schema.isUnique()),
    ),
  ),
  trigger_type: Schema.optional(AutomodTriggerTypeSchema),
  trigger_metadata: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MentionSpamTriggerMetadataSchema]),
  ),
}).annotate({ identifier: 'MentionSpamUpsertRequestPartial' })

export type MentionSpamUpsertRequestPartial = Schema.Schema.Type<
  typeof MentionSpamUpsertRequestPartialSchema
>

export const MessageReferenceRequestSchema = Schema.Struct({
  guild_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  channel_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  message_id: SnowflakeTypeSchema,
  fail_if_not_exists: Schema.optional(Schema.NullOr(Schema.Boolean)),
  type: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), MessageReferenceTypeSchema])),
}).annotate({ identifier: 'MessageReferenceRequest' })

export type MessageReferenceRequest = Schema.Schema.Type<typeof MessageReferenceRequestSchema>

export const MessageCreateRequestSchema = Schema.Struct({
  content: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 4000, {
          expected: 'a string of at most 4000 characters',
        }),
      ),
    ),
  ),
  embeds: Schema.optional(
    Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
  ),
  allowed_mentions: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MessageAllowedMentionsRequestSchema]),
  ),
  sticker_ids: Schema.optional(
    Schema.NullOr(Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(3))),
  ),
  components: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      ).check(Schema.isMaxLength(40)),
    ),
  ),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  attachments: Schema.optional(
    Schema.NullOr(Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10))),
  ),
  poll: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), PollCreateRequestSchema])),
  shared_client_theme: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), CustomClientThemeShareRequestSchema]),
  ),
  message_reference: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MessageReferenceRequestSchema]),
  ),
  nonce: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
          Schema.isGreaterThanOrEqualToBigInt(-9223372036854776000n),
          Schema.isLessThanOrEqualToBigInt(9223372036854776000n),
        ),
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 25, {
          expected: 'a string of at most 25 characters',
        }),
      ),
      Schema.NullOr(Schema.Null),
    ]),
  ),
  enforce_nonce: Schema.optional(Schema.NullOr(Schema.Boolean)),
  tts: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'MessageCreateRequest' })

export type MessageCreateRequest = Schema.Schema.Type<typeof MessageCreateRequestSchema>

export const MessageEditRequestPartialSchema = Schema.Struct({
  content: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 4000, {
          expected: 'a string of at most 4000 characters',
        }),
      ),
    ),
  ),
  embeds: Schema.optional(
    Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
  ),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  allowed_mentions: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MessageAllowedMentionsRequestSchema]),
  ),
  sticker_ids: Schema.optional(
    Schema.NullOr(Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(1521))),
  ),
  components: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      ).check(Schema.isMaxLength(40)),
    ),
  ),
  attachments: Schema.optional(
    Schema.NullOr(Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10))),
  ),
}).annotate({ identifier: 'MessageEditRequestPartial' })

export type MessageEditRequestPartial = Schema.Schema.Type<typeof MessageEditRequestPartialSchema>

export const TextDisplayComponentForModalRequestSchema = Schema.Struct({
  type: MessageComponentTypesSchema,
  id: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  content: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 4000, {
      expected: 'a string of at most 4000 characters',
    }),
  ),
}).annotate({ identifier: 'TextDisplayComponentForModalRequest' })

export type TextDisplayComponentForModalRequest = Schema.Schema.Type<
  typeof TextDisplayComponentForModalRequestSchema
>

export const ModalInteractionCallbackRequestDataSchema = Schema.Struct({
  custom_id: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  title: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 45, {
      expected: 'a string of at most 45 characters',
    }),
  ),
  components: Schema.Array(
    Schema.Union([
      ActionRowComponentForModalRequestSchema,
      LabelComponentForModalRequestSchema,
      TextDisplayComponentForModalRequestSchema,
    ]),
  ).check(Schema.isMinLength(1), Schema.isMaxLength(40)),
}).annotate({ identifier: 'ModalInteractionCallbackRequestData' })

export type ModalInteractionCallbackRequestData = Schema.Schema.Type<
  typeof ModalInteractionCallbackRequestDataSchema
>

export const ModalInteractionCallbackRequestSchema = Schema.Struct({
  type: InteractionCallbackTypesSchema,
  data: ModalInteractionCallbackRequestDataSchema,
}).annotate({ identifier: 'ModalInteractionCallbackRequest' })

export type ModalInteractionCallbackRequest = Schema.Schema.Type<
  typeof ModalInteractionCallbackRequestSchema
>

export const MyGuildResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  icon: Schema.NullOr(Schema.String),
  banner: Schema.NullOr(Schema.String),
  owner: Schema.Boolean,
  permissions: Schema.String,
  features: Schema.Array(GuildFeaturesSchema).check(Schema.isUnique()),
  approximate_member_count: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
  approximate_presence_count: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
}).annotate({ identifier: 'MyGuildResponse' })

export type MyGuildResponse = Schema.Schema.Type<typeof MyGuildResponseSchema>

export const OAuth2GetAuthorizationResponseSchema = Schema.Struct({
  application: ApplicationResponseSchema,
  expires: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  scopes: Schema.Array(OAuth2ScopesSchema).check(Schema.isUnique()),
  user: Schema.optional(UserResponseSchema),
}).annotate({ identifier: 'OAuth2GetAuthorizationResponse' })

export type OAuth2GetAuthorizationResponse = Schema.Schema.Type<
  typeof OAuth2GetAuthorizationResponseSchema
>

export const OAuth2KeySchema = Schema.Struct({
  kty: Schema.String,
  use: Schema.String,
  kid: Schema.String,
  n: Schema.String,
  e: Schema.String,
  alg: Schema.String,
}).annotate({ identifier: 'OAuth2Key' })

export type OAuth2Key = Schema.Schema.Type<typeof OAuth2KeySchema>

export const OAuth2GetKeysSchema = Schema.Struct({ keys: Schema.Array(OAuth2KeySchema) }).annotate({
  identifier: 'OAuth2GetKeys',
})

export type OAuth2GetKeys = Schema.Schema.Type<typeof OAuth2GetKeysSchema>

export const OAuth2GetOpenIDConnectUserInfoResponseSchema = Schema.Struct({
  sub: Schema.String,
  email: Schema.optional(Schema.NullOr(Schema.String)),
  email_verified: Schema.optional(Schema.Boolean),
  preferred_username: Schema.optional(Schema.String),
  nickname: Schema.optional(Schema.NullOr(Schema.String)),
  picture: Schema.optional(Schema.String),
  locale: Schema.optional(Schema.String),
}).annotate({ identifier: 'OAuth2GetOpenIDConnectUserInfoResponse' })

export type OAuth2GetOpenIDConnectUserInfoResponse = Schema.Schema.Type<
  typeof OAuth2GetOpenIDConnectUserInfoResponseSchema
>

export const OnboardingPromptOptionRequestSchema = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  title: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 50, {
      expected: 'a string of at most 50 characters',
    }),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  emoji_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  emoji_name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  emoji_animated: Schema.optional(Schema.NullOr(Schema.Boolean)),
  role_ids: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(50), Schema.isUnique()),
    ),
  ),
  channel_ids: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(50), Schema.isUnique()),
    ),
  ),
}).annotate({ identifier: 'OnboardingPromptOptionRequest' })

export type OnboardingPromptOptionRequest = Schema.Schema.Type<
  typeof OnboardingPromptOptionRequestSchema
>

export const PermissionsResponseSchema = Schema.Struct({
  permissions: Schema.String.annotate({
    description: 'The computed permissions, as a stringified bitfield',
  }),
}).annotate({ identifier: 'PermissionsResponse' })

export type PermissionsResponse = Schema.Schema.Type<typeof PermissionsResponseSchema>

export const PinnedMessageResponseSchema = Schema.Struct({
  pinned_at: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  message: MessageResponseSchema,
}).annotate({ identifier: 'PinnedMessageResponse' })

export type PinnedMessageResponse = Schema.Schema.Type<typeof PinnedMessageResponseSchema>

export const PinnedMessagesResponseSchema = Schema.Struct({
  items: Schema.Array(PinnedMessageResponseSchema),
  has_more: Schema.Boolean,
}).annotate({ identifier: 'PinnedMessagesResponse' })

export type PinnedMessagesResponse = Schema.Schema.Type<typeof PinnedMessagesResponseSchema>

export const PollAnswerDetailsResponseSchema = Schema.Struct({
  users: Schema.Array(UserResponseSchema),
}).annotate({ identifier: 'PollAnswerDetailsResponse' })

export type PollAnswerDetailsResponse = Schema.Schema.Type<typeof PollAnswerDetailsResponseSchema>

export const PongInteractionCallbackRequestSchema = Schema.Struct({
  type: InteractionCallbackTypesSchema,
}).annotate({ identifier: 'PongInteractionCallbackRequest' })

export type PongInteractionCallbackRequest = Schema.Schema.Type<
  typeof PongInteractionCallbackRequestSchema
>

export const PremiumTypesSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'None' }),
  Schema.Literal(1).annotate({ description: 'Nitro Classic' }),
  Schema.Literal(2).annotate({ description: 'Nitro Standard' }),
  Schema.Literal(3).annotate({ description: 'Nitro Basic' }),
]).annotate({ identifier: 'PremiumTypes' })

export type PremiumTypes = Schema.Schema.Type<typeof PremiumTypesSchema>

export const TeamMembershipStatesSchema = Schema.Union([
  Schema.Literal(1).annotate({ description: 'User has been invited to the team.' }),
  Schema.Literal(2).annotate({ description: 'User has accepted the team invitation.' }),
]).annotate({ identifier: 'TeamMembershipStates' })

export type TeamMembershipStates = Schema.Schema.Type<typeof TeamMembershipStatesSchema>

export const TeamMemberRolesSchema = Schema.Union([
  Schema.Literal('admin').annotate({
    description:
      'Admins have similar access as owners, except they cannot take destructive actions on the team or team-owned apps.',
  }),
  Schema.Literal('developer').annotate({
    description:
      'Developers can access information about team-owned apps, like the client secret or public key. They can also take limited actions on team-owned apps, like configuring interaction endpoints or resetting the bot token. Members with the Developer role cannot manage the team or its members, or take destructive actions on team-owned apps.',
  }),
  Schema.Literal('read_only').annotate({
    description:
      'Read-only members can access information about a team and any team-owned apps. Some examples include getting the IDs of applications and exporting payout records. Members can also invite bots associated with team-owned apps that are marked private.',
  }),
]).annotate({ identifier: 'TeamMemberRoles' })

export type TeamMemberRoles = Schema.Schema.Type<typeof TeamMemberRolesSchema>

export const TeamMemberResponseSchema = Schema.Struct({
  user: UserResponseSchema,
  team_id: SnowflakeTypeSchema,
  membership_state: TeamMembershipStatesSchema,
  role: TeamMemberRolesSchema,
  permissions: Schema.Array(Schema.String),
}).annotate({ identifier: 'TeamMemberResponse' })

export type TeamMemberResponse = Schema.Schema.Type<typeof TeamMemberResponseSchema>

export const TeamResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  icon: Schema.NullOr(Schema.String),
  name: Schema.String,
  owner_user_id: SnowflakeTypeSchema,
  members: Schema.Array(TeamMemberResponseSchema),
}).annotate({ identifier: 'TeamResponse' })

export type TeamResponse = Schema.Schema.Type<typeof TeamResponseSchema>

export const PrivateApplicationResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  icon: Schema.NullOr(Schema.String),
  description: Schema.String,
  type: Schema.Union([Schema.NullOr(Schema.Null), ApplicationTypesSchema]),
  cover_image: Schema.optional(Schema.String),
  primary_sku_id: Schema.optional(SnowflakeTypeSchema),
  flags: Schema.Number.check(Schema.isInt32()),
  flags_new: Schema.String,
  bot: Schema.optional(UserResponseSchema),
  slug: Schema.optional(Schema.String),
  conjure_project_id: Schema.optional(SnowflakeTypeSchema),
  vibegrations_project_id: Schema.optional(SnowflakeTypeSchema),
  guild_id: Schema.optional(SnowflakeTypeSchema),
  rpc_origins: Schema.optional(Schema.Array(Schema.String)),
  bot_public: Schema.optional(Schema.Boolean),
  bot_require_code_grant: Schema.optional(Schema.Boolean),
  terms_of_service_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  privacy_policy_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  custom_install_url: Schema.optional(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  install_params: Schema.optional(ApplicationOAuth2InstallParamsResponseSchema),
  integration_types_config: Schema.optional(
    Schema.Record(Schema.String, ApplicationIntegrationTypeConfigurationResponseSchema),
  ),
  verify_key: Schema.String,
  max_participants: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
  tags: Schema.optional(Schema.Array(Schema.String).check(Schema.isUnique())),
  redirect_uris: Schema.Array(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  interactions_endpoint_url: Schema.NullOr(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  role_connections_verification_url: Schema.NullOr(
    Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  ),
  owner: UserResponseSchema,
  approximate_guild_count: Schema.Number.check(Schema.isInt32()),
  approximate_user_install_count: Schema.Number.check(Schema.isInt32()),
  approximate_user_authorization_count: Schema.Number.check(Schema.isInt32()),
  event_webhooks_url: Schema.optional(
    Schema.NullOr(Schema.String.check(Schema.makeFilter((input) => URL.canParse(input)))),
  ),
  event_webhooks_status: Schema.optional(ApplicationEventWebhooksStatusSchema),
  event_webhooks_types: Schema.optional(Schema.Array(ActionTypesSchema).check(Schema.isUnique())),
  explicit_content_filter: ApplicationExplicitContentFilterTypesSchema,
  team: Schema.Union([Schema.NullOr(Schema.Null), TeamResponseSchema]),
  eligible_oauth2_scopes: Schema.Array(OAuth2ScopesSchema),
}).annotate({ identifier: 'PrivateApplicationResponse' })

export type PrivateApplicationResponse = Schema.Schema.Type<typeof PrivateApplicationResponseSchema>

export const PrivateGuildMemberResponseSchema = Schema.Struct({
  avatar: Schema.NullOr(Schema.String).annotate({ description: "the member's guild avatar hash" }),
  avatar_decoration_data: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UserAvatarDecorationResponseSchema]).annotate({
      description: "data for the member's guild avatar decoration",
    }),
  ),
  banner: Schema.NullOr(Schema.String).annotate({ description: "the member's guild banner hash" }),
  communication_disabled_until: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({
    description:
      "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
  }),
  flags: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'guild member flags represented as a bit set, defaults to 0',
  }),
  joined_at: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({ description: 'when the user joined the guild' }),
  nick: Schema.NullOr(Schema.String).annotate({ description: "this user's guild nickname" }),
  pending: Schema.Boolean.annotate({
    description:
      "whether the user has not yet passed the guild's Membership Screening requirements",
  }),
  premium_since: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'when the user started boosting the guild' }),
  roles: Schema.Array(SnowflakeTypeSchema)
    .check(Schema.isUnique())
    .annotate({ description: 'array of role object ids' }),
  collectibles: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UserCollectiblesResponseSchema]).annotate({
      description: "data for the member's collectibles",
    }),
  ),
  user: UserResponseSchema.annotate({ description: 'the user this guild member represents' }),
  mute: Schema.Boolean.annotate({ description: 'whether the user is muted in voice channels' }),
  deaf: Schema.Boolean.annotate({ description: 'whether the user is deafened in voice channels' }),
  permissions: Schema.optional(Schema.String),
}).annotate({ identifier: 'PrivateGuildMemberResponse' })

export type PrivateGuildMemberResponse = Schema.Schema.Type<typeof PrivateGuildMemberResponseSchema>

export const ProvisionalTokenResponseSchema = Schema.Struct({
  token_type: Schema.String,
  access_token: Schema.String,
  expires_in: Schema.Number.check(Schema.isInt32()),
  scope: Schema.String,
  id_token: Schema.String,
  refresh_token: Schema.optional(Schema.NullOr(Schema.String)),
  scopes: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  expires_at_s: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
}).annotate({ identifier: 'ProvisionalTokenResponse' })

export type ProvisionalTokenResponse = Schema.Schema.Type<typeof ProvisionalTokenResponseSchema>

export const PruneGuildRequestSchema = Schema.Struct({
  days: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(1),
        Schema.isLessThanOrEqualTo(30),
      ),
    ),
  ),
  compute_prune_count: Schema.optional(Schema.NullOr(Schema.Boolean)),
  include_roles: Schema.optional(
    Schema.Union([
      Schema.String,
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(100), Schema.isUnique()),
      Schema.NullOr(Schema.Null),
    ]),
  ),
}).annotate({ identifier: 'PruneGuildRequest' })

export type PruneGuildRequest = Schema.Schema.Type<typeof PruneGuildRequestSchema>

export const ReactionTypesSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'Normal reaction type' }),
  Schema.Literal(1).annotate({ description: 'Burst reaction type' }),
]).annotate({ identifier: 'ReactionTypes' })

export type ReactionTypes = Schema.Schema.Type<typeof ReactionTypesSchema>

export const SDKMessageRequestSchema = Schema.Struct({
  content: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 4000, {
          expected: 'a string of at most 4000 characters',
        }),
      ),
    ),
  ),
  embeds: Schema.optional(
    Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
  ),
  allowed_mentions: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MessageAllowedMentionsRequestSchema]),
  ),
  sticker_ids: Schema.optional(
    Schema.NullOr(Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(3))),
  ),
  components: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          ActionRowComponentForMessageRequestSchema,
          ContainerComponentForMessageRequestSchema,
          FileComponentForMessageRequestSchema,
          MediaGalleryComponentForMessageRequestSchema,
          SectionComponentForMessageRequestSchema,
          SeparatorComponentForMessageRequestSchema,
          TextDisplayComponentForMessageRequestSchema,
        ]),
      ).check(Schema.isMaxLength(40)),
    ),
  ),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  attachments: Schema.optional(
    Schema.NullOr(Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10))),
  ),
  poll: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), PollCreateRequestSchema])),
  shared_client_theme: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), CustomClientThemeShareRequestSchema]),
  ),
  message_reference: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), MessageReferenceRequestSchema]),
  ),
  nonce: Schema.optional(
    Schema.Union([
      Schema.Union([
        Schema.BigInt,
        Schema.Number.check(Schema.isInt()),
        Schema.String.check(Schema.isPattern(/^-?\d+$/)),
      ])
        .pipe(
          Schema.decodeTo(
            Schema.BigInt,
            SchemaTransformation.transform({
              decode: (input) => BigInt(input),
              encode: (output) => output,
            }),
          ),
        )
        .check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
          Schema.isGreaterThanOrEqualToBigInt(-9223372036854776000n),
          Schema.isLessThanOrEqualToBigInt(9223372036854776000n),
        ),
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 25, {
          expected: 'a string of at most 25 characters',
        }),
      ),
      Schema.NullOr(Schema.Null),
    ]),
  ),
  enforce_nonce: Schema.optional(Schema.NullOr(Schema.Boolean)),
  tts: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'SDKMessageRequest' })

export type SDKMessageRequest = Schema.Schema.Type<typeof SDKMessageRequestSchema>

export const SKUIneligibilityReasonSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'Other / catch-all' }),
  Schema.Literal(1).annotate({
    description: 'User already owns this SKU or one of its components',
  }),
  Schema.Literal(2).annotate({ description: 'User account is not on an eligible platform' }),
]).annotate({ identifier: 'SKUIneligibilityReason' })

export type SKUIneligibilityReason = Schema.Schema.Type<typeof SKUIneligibilityReasonSchema>

export const ScheduledEventUserCountResponseSchema = Schema.Struct({
  guild_scheduled_event_count: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'The number of users subscribed to the scheduled event',
  }),
  guild_scheduled_event_exception_counts: Schema.Record(
    Schema.String,
    Schema.Number.check(Schema.isInt32()),
  ).annotate({ description: 'Map of exception IDs to user counts for each exception' }),
}).annotate({ identifier: 'ScheduledEventUserCountResponse' })

export type ScheduledEventUserCountResponse = Schema.Schema.Type<
  typeof ScheduledEventUserCountResponseSchema
>

export const SearchIndexNotReadyResponseSchema = Schema.Struct({
  message: Schema.String,
  code: Schema.Number.check(Schema.isInt32()),
  documents_indexed: Schema.Number.check(Schema.isInt32()),
  retry_after: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'SearchIndexNotReadyResponse' })

export type SearchIndexNotReadyResponse = Schema.Schema.Type<
  typeof SearchIndexNotReadyResponseSchema
>

export const SearchableEmbedTypeSchema = Schema.Union([
  Schema.Literal('image'),
  Schema.Literal('video'),
  Schema.Literal('gif'),
  Schema.Literal('sound'),
  Schema.Literal('article'),
]).annotate({ identifier: 'SearchableEmbedType' })

export type SearchableEmbedType = Schema.Schema.Type<typeof SearchableEmbedTypeSchema>

export const WebhookSlackEmbedFieldSchema = Schema.Struct({
  name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  value: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  inline: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'WebhookSlackEmbedField' })

export type WebhookSlackEmbedField = Schema.Schema.Type<typeof WebhookSlackEmbedFieldSchema>

export const WebhookSlackEmbedSchema = Schema.Struct({
  title: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  title_link: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  text: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  color: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/),
        Schema.makeFilter((input) => [...input].length <= 7, {
          expected: 'a string of at most 7 characters',
        }),
      ),
    ),
  ),
  ts: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  pretext: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  footer: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  footer_icon: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  author_name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  author_link: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  author_icon: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  image_url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  thumb_url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  fields: Schema.optional(
    Schema.NullOr(Schema.Array(WebhookSlackEmbedFieldSchema).check(Schema.isMaxLength(1521))),
  ),
}).annotate({ identifier: 'WebhookSlackEmbed' })

export type WebhookSlackEmbed = Schema.Schema.Type<typeof WebhookSlackEmbedSchema>

export const SlackWebhookSchema = Schema.Struct({
  text: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 2000, {
          expected: 'a string of at most 2000 characters',
        }),
      ),
    ),
  ),
  username: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 152133, {
          expected: 'a string of at most 152133 characters',
        }),
      ),
    ),
  ),
  icon_url: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => URL.canParse(input)),
        Schema.makeFilter((input) => [...input].length <= 2048, {
          expected: 'a string of at most 2048 characters',
        }),
      ),
    ),
  ),
  attachments: Schema.optional(
    Schema.NullOr(Schema.Array(WebhookSlackEmbedSchema).check(Schema.isMaxLength(1521))),
  ),
}).annotate({ identifier: 'SlackWebhook' })

export type SlackWebhook = Schema.Schema.Type<typeof SlackWebhookSchema>

export const SocialLayerSKUPurchaseEligibilityCallbackDataSchema = Schema.Struct({
  eligible: Schema.Boolean,
  ineligible_reason: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), SKUIneligibilityReasonSchema]),
  ),
  ineligible_reason_description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 255, {
          expected: 'a string of at most 255 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'SocialLayerSKUPurchaseEligibilityCallbackData' })

export type SocialLayerSKUPurchaseEligibilityCallbackData = Schema.Schema.Type<
  typeof SocialLayerSKUPurchaseEligibilityCallbackDataSchema
>

export const SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema = Schema.Struct({
  type: InteractionCallbackTypesSchema,
  data: SocialLayerSKUPurchaseEligibilityCallbackDataSchema,
}).annotate({ identifier: 'SocialLayerSKUPurchaseEligibilityInteractionCallbackRequest' })

export type SocialLayerSKUPurchaseEligibilityInteractionCallbackRequest = Schema.Schema.Type<
  typeof SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema
>

export const SortingModeSchema = Schema.Union([
  Schema.Literal('relevance'),
  Schema.Literal('timestamp'),
]).annotate({ identifier: 'SortingMode' })

export type SortingMode = Schema.Schema.Type<typeof SortingModeSchema>

export const SortingOrderSchema = Schema.Union([
  Schema.Literal('asc'),
  Schema.Literal('desc'),
]).annotate({ identifier: 'SortingOrder' })

export type SortingOrder = Schema.Schema.Type<typeof SortingOrderSchema>

export const SoundboardCreateRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 2, {
      expected: 'a string of at least 2 characters',
    }),
    Schema.makeFilter((input) => [...input].length <= 32, {
      expected: 'a string of at most 32 characters',
    }),
  ),
  volume: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)),
    ),
  ),
  emoji_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  emoji_name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 32, {
          expected: 'a string of at most 32 characters',
        }),
      ),
    ),
  ),
  sound: Schema.String,
}).annotate({ identifier: 'SoundboardCreateRequest' })

export type SoundboardCreateRequest = Schema.Schema.Type<typeof SoundboardCreateRequestSchema>

export const SoundboardPatchRequestPartialSchema = Schema.Struct({
  name: Schema.optional(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length >= 2, {
        expected: 'a string of at least 2 characters',
      }),
      Schema.makeFilter((input) => [...input].length <= 32, {
        expected: 'a string of at most 32 characters',
      }),
    ),
  ),
  volume: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)),
    ),
  ),
  emoji_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  emoji_name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 32, {
          expected: 'a string of at most 32 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'SoundboardPatchRequestPartial' })

export type SoundboardPatchRequestPartial = Schema.Schema.Type<
  typeof SoundboardPatchRequestPartialSchema
>

export const SoundboardSoundSendRequestSchema = Schema.Struct({
  sound_id: SnowflakeTypeSchema,
  source_guild_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
}).annotate({ identifier: 'SoundboardSoundSendRequest' })

export type SoundboardSoundSendRequest = Schema.Schema.Type<typeof SoundboardSoundSendRequestSchema>

export const StageInstancesPrivacyLevelsSchema = Schema.Union([
  Schema.Literal(1).annotate({
    description: 'The Stage instance is visible publicly. (deprecated)',
  }),
  Schema.Literal(2).annotate({
    description: 'The Stage instance is visible to only guild members.',
  }),
]).annotate({ identifier: 'StageInstancesPrivacyLevels' })

export type StageInstancesPrivacyLevels = Schema.Schema.Type<
  typeof StageInstancesPrivacyLevelsSchema
>

export const StageInstanceResponseSchema = Schema.Struct({
  guild_id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  topic: Schema.String,
  privacy_level: StageInstancesPrivacyLevelsSchema,
  id: SnowflakeTypeSchema,
  discoverable_disabled: Schema.Boolean,
  guild_scheduled_event_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
}).annotate({ identifier: 'StageInstanceResponse' })

export type StageInstanceResponse = Schema.Schema.Type<typeof StageInstanceResponseSchema>

export const StageScheduledEventCreateRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 1000, {
          expected: 'a string of at most 1000 characters',
        }),
      ),
    ),
  ),
  image: Schema.optional(Schema.NullOr(Schema.String)),
  scheduled_start_time: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  scheduled_end_time: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  channel_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  recurrence_rule: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), RecurrenceRuleSchema]).annotate({
      description: 'Recurrence rule for the scheduled event',
    }),
  ),
  entity_metadata: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), EntityMetadataStageInstanceSchema]),
  ),
}).annotate({ identifier: 'StageScheduledEventCreateRequest' })

export type StageScheduledEventCreateRequest = Schema.Schema.Type<
  typeof StageScheduledEventCreateRequestSchema
>

export const StageScheduledEventPatchRequestPartialSchema = Schema.Struct({
  status: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), GuildScheduledEventStatusesSchema]),
  ),
  name: Schema.optional(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 100, {
        expected: 'a string of at most 100 characters',
      }),
    ),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 1000, {
          expected: 'a string of at most 1000 characters',
        }),
      ),
    ),
  ),
  image: Schema.optional(Schema.NullOr(Schema.String)),
  scheduled_start_time: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  scheduled_end_time: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  entity_type: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), GuildScheduledEventEntityTypesSchema]),
  ),
  privacy_level: Schema.optional(GuildScheduledEventPrivacyLevelsSchema),
  channel_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  recurrence_rule: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), RecurrenceRuleSchema]).annotate({
      description: 'Recurrence rule for the scheduled event',
    }),
  ),
  entity_metadata: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), EntityMetadataStageInstanceSchema]),
  ),
}).annotate({ identifier: 'StageScheduledEventPatchRequestPartial' })

export type StageScheduledEventPatchRequestPartial = Schema.Schema.Type<
  typeof StageScheduledEventPatchRequestPartialSchema
>

export const StickerPackResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  sku_id: SnowflakeTypeSchema,
  name: Schema.String,
  description: Schema.NullOr(Schema.String),
  stickers: Schema.Array(StandardStickerResponseSchema),
  cover_sticker_id: Schema.optional(SnowflakeTypeSchema),
  banner_asset_id: Schema.optional(SnowflakeTypeSchema),
}).annotate({ identifier: 'StickerPackResponse' })

export type StickerPackResponse = Schema.Schema.Type<typeof StickerPackResponseSchema>

export const StickerPackCollectionResponseSchema = Schema.Struct({
  sticker_packs: Schema.Array(StickerPackResponseSchema),
}).annotate({ identifier: 'StickerPackCollectionResponse' })

export type StickerPackCollectionResponse = Schema.Schema.Type<
  typeof StickerPackCollectionResponseSchema
>

export const SubscriptionResponseStatusTypeSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'Subscription is active and scheduled to renew' }),
  Schema.Literal(1).annotate({ description: 'Subscription is inactive and not being charged' }),
  Schema.Literal(2).annotate({ description: 'Subscription is active but will not renew' }),
]).annotate({ identifier: 'SubscriptionResponseStatusType' })

export type SubscriptionResponseStatusType = Schema.Schema.Type<
  typeof SubscriptionResponseStatusTypeSchema
>

export const SubscriptionResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema.annotate({ description: 'ID of the subscription' }),
  user_id: SnowflakeTypeSchema.annotate({ description: 'ID of the user who is subscribed' }),
  sku_ids: Schema.Array(SnowflakeTypeSchema)
    .check(Schema.isUnique())
    .annotate({ description: 'List of SKUs subscribed to' }),
  renewal_sku_ids: Schema.NullOr(
    Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  ).annotate({ description: 'List of SKUs that this user will be subscribed to at renewal' }),
  entitlement_ids: Schema.Array(SnowflakeTypeSchema)
    .check(Schema.isUnique())
    .annotate({ description: 'List of entitlements granted for this subscription' }),
  current_period_start: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({ description: 'Start of the current subscription period' }),
  current_period_end: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).annotate({ description: 'End of the current subscription period' }),
  status: SubscriptionResponseStatusTypeSchema.annotate({
    description: 'Current status of the subscription',
  }),
  canceled_at: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'When the subscription was canceled' }),
  country: Schema.optional(
    Schema.NullOr(Schema.String).annotate({
      description:
        'ISO3166-1 alpha-2 country code of the payment source used to purchase the subscription',
    }),
  ),
}).annotate({ identifier: 'SubscriptionResponse' })

export type SubscriptionResponse = Schema.Schema.Type<typeof SubscriptionResponseSchema>

export const TargetUsersJobStatusTypesSchema = Schema.Union([
  Schema.Literal(0).annotate({ description: 'The default value.' }),
  Schema.Literal(1).annotate({ description: 'The job is still being processed.' }),
  Schema.Literal(2).annotate({ description: 'The job has been completed successfully.' }),
  Schema.Literal(3).annotate({
    description: 'The job has failed, see error_message field for more details.',
  }),
]).annotate({ identifier: 'TargetUsersJobStatusTypes' })

export type TargetUsersJobStatusTypes = Schema.Schema.Type<typeof TargetUsersJobStatusTypesSchema>

export const TargetUsersJobStatusResponseSchema = Schema.Struct({
  status: TargetUsersJobStatusTypesSchema.annotate({
    description: 'The status of the job processing the target users.',
  }),
  total_users: UInt32TypeSchema.annotate({
    description: 'The total number of users in the provided list.',
  }),
  processed_users: UInt32TypeSchema.annotate({
    description: 'The number of users processed so far.',
  }),
  created_at: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'The timestamp when the job was created.' }),
  completed_at: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ).annotate({ description: 'The timestamp when the job was successfully completed.' }),
  error_message: Schema.NullOr(Schema.String).annotate({
    description: 'The error message if the job failed.',
  }),
}).annotate({ identifier: 'TargetUsersJobStatusResponse' })

export type TargetUsersJobStatusResponse = Schema.Schema.Type<
  typeof TargetUsersJobStatusResponseSchema
>

export const ThreadSearchResponseSchema = Schema.Struct({
  threads: Schema.Array(ThreadResponseSchema),
  members: Schema.Array(ThreadMemberResponseSchema),
  has_more: Schema.Boolean,
  first_messages: Schema.optional(Schema.Array(MessageResponseSchema)),
  total_results: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'ThreadSearchResponse' })

export type ThreadSearchResponse = Schema.Schema.Type<typeof ThreadSearchResponseSchema>

export const ThreadSortingModeSchema = Schema.Union([
  Schema.Literal('relevance'),
  Schema.Literal('creation_time'),
  Schema.Literal('last_message_time'),
  Schema.Literal('archive_time'),
]).annotate({ identifier: 'ThreadSortingMode' })

export type ThreadSortingMode = Schema.Schema.Type<typeof ThreadSortingModeSchema>

export const ThreadsResponseSchema = Schema.Struct({
  threads: Schema.Array(ThreadResponseSchema),
  members: Schema.Array(ThreadMemberResponseSchema),
  has_more: Schema.Boolean,
  first_messages: Schema.optional(Schema.Array(MessageResponseSchema)),
}).annotate({ identifier: 'ThreadsResponse' })

export type ThreadsResponse = Schema.Schema.Type<typeof ThreadsResponseSchema>

export const TypingIndicatorResponseSchema = Schema.Struct({}).annotate({
  identifier: 'TypingIndicatorResponse',
})

export type TypingIndicatorResponse = Schema.Schema.Type<typeof TypingIndicatorResponseSchema>

export const UnbanUserFromGuildRequestSchema = Schema.Struct({}).annotate({
  identifier: 'UnbanUserFromGuildRequest',
})

export type UnbanUserFromGuildRequest = Schema.Schema.Type<typeof UnbanUserFromGuildRequestSchema>

export const UpdateApplicationUserRoleConnectionRequestSchema = Schema.Struct({
  platform_name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 50, {
          expected: 'a string of at most 50 characters',
        }),
      ),
    ),
  ),
  platform_username: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  metadata: Schema.optional(
    Schema.NullOr(
      Schema.Record(
        Schema.String,
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 100, {
            expected: 'a string of at most 100 characters',
          }),
        ),
      ),
    ),
  ),
}).annotate({ identifier: 'UpdateApplicationUserRoleConnectionRequest' })

export type UpdateApplicationUserRoleConnectionRequest = Schema.Schema.Type<
  typeof UpdateApplicationUserRoleConnectionRequestSchema
>

export const UpdateDMRequestPartialSchema = Schema.Struct({
  name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 0, {
          expected: 'a string of at least 0 characters',
        }),
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'UpdateDMRequestPartial' })

export type UpdateDMRequestPartial = Schema.Schema.Type<typeof UpdateDMRequestPartialSchema>

export const UpdateGroupDMRequestPartialSchema = Schema.Struct({
  name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 0, {
          expected: 'a string of at least 0 characters',
        }),
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  icon: Schema.optional(Schema.NullOr(Schema.String)),
}).annotate({ identifier: 'UpdateGroupDMRequestPartial' })

export type UpdateGroupDMRequestPartial = Schema.Schema.Type<
  typeof UpdateGroupDMRequestPartialSchema
>

export const UpdateThreadTagRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 0, {
      expected: 'a string of at least 0 characters',
    }),
    Schema.makeFilter((input) => [...input].length <= 50, {
      expected: 'a string of at most 50 characters',
    }),
  ),
  emoji_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  emoji_name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  moderated: Schema.optional(Schema.NullOr(Schema.Boolean)),
  id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
}).annotate({ identifier: 'UpdateThreadTagRequest' })

export type UpdateThreadTagRequest = Schema.Schema.Type<typeof UpdateThreadTagRequestSchema>

export const UpdateGuildChannelRequestPartialSchema = Schema.Struct({
  type: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), ChannelTypesSchema])),
  name: Schema.optional(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length >= 1, {
        expected: 'a string of at least 1 character',
      }),
      Schema.makeFilter((input) => [...input].length <= 100, {
        expected: 'a string of at most 100 characters',
      }),
    ),
  ),
  position: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  topic: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 0, {
          expected: 'a string of at least 0 characters',
        }),
        Schema.makeFilter((input) => [...input].length <= 4096, {
          expected: 'a string of at most 4096 characters',
        }),
      ),
    ),
  ),
  bitrate: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(8000))),
  ),
  user_limit: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
  ),
  nsfw: Schema.optional(Schema.NullOr(Schema.Boolean)),
  rate_limit_per_user: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(21600),
      ),
    ),
  ),
  parent_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  permission_overwrites: Schema.optional(
    Schema.NullOr(
      Schema.Array(ChannelPermissionOverwriteRequestSchema).check(Schema.isMaxLength(100)),
    ),
  ),
  rtc_region: Schema.optional(Schema.NullOr(Schema.String)),
  video_quality_mode: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), VideoQualityModesSchema]),
  ),
  default_auto_archive_duration: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ThreadAutoArchiveDurationSchema]),
  ),
  default_reaction_emoji: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UpdateDefaultReactionEmojiRequestSchema]),
  ),
  default_thread_rate_limit_per_user: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(21600),
      ),
    ),
  ),
  default_sort_order: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ThreadSortOrderSchema]),
  ),
  default_forum_layout: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ForumLayoutSchema]),
  ),
  default_tag_setting: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ThreadSearchTagSettingSchema]),
  ),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  available_tags: Schema.optional(
    Schema.NullOr(Schema.Array(UpdateThreadTagRequestSchema).check(Schema.isMaxLength(20))),
  ),
}).annotate({ identifier: 'UpdateGuildChannelRequestPartial' })

export type UpdateGuildChannelRequestPartial = Schema.Schema.Type<
  typeof UpdateGuildChannelRequestPartialSchema
>

export const UpdateOnboardingPromptRequestSchema = Schema.Struct({
  title: Schema.String.check(
    Schema.makeFilter((input) => [...input].length >= 1, {
      expected: 'a string of at least 1 character',
    }),
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  options: Schema.Array(OnboardingPromptOptionRequestSchema).check(
    Schema.isMinLength(1),
    Schema.isMaxLength(50),
  ),
  single_select: Schema.optional(Schema.NullOr(Schema.Boolean)),
  required: Schema.optional(Schema.NullOr(Schema.Boolean)),
  in_onboarding: Schema.optional(Schema.NullOr(Schema.Boolean)),
  type: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), OnboardingPromptTypeSchema])),
  id: SnowflakeTypeSchema,
}).annotate({ identifier: 'UpdateOnboardingPromptRequest' })

export type UpdateOnboardingPromptRequest = Schema.Schema.Type<
  typeof UpdateOnboardingPromptRequestSchema
>

export const UpdateGuildOnboardingRequestSchema = Schema.Struct({
  prompts: Schema.optional(
    Schema.NullOr(Schema.Array(UpdateOnboardingPromptRequestSchema).check(Schema.isMaxLength(15))),
  ),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  default_channel_ids: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(500), Schema.isUnique()),
    ),
  ),
  mode: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), GuildOnboardingModeSchema])),
}).annotate({ identifier: 'UpdateGuildOnboardingRequest' })

export type UpdateGuildOnboardingRequest = Schema.Schema.Type<
  typeof UpdateGuildOnboardingRequestSchema
>

export const UpdateMessageInteractionCallbackRequestSchema = Schema.Struct({
  type: InteractionCallbackTypesSchema,
  data: Schema.optional(
    Schema.Union([
      Schema.NullOr(Schema.Null),
      IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema,
    ]),
  ),
}).annotate({ identifier: 'UpdateMessageInteractionCallbackRequest' })

export type UpdateMessageInteractionCallbackRequest = Schema.Schema.Type<
  typeof UpdateMessageInteractionCallbackRequestSchema
>

export const UpdateRolePositionsRequestSchema = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  position: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt32()))),
}).annotate({ identifier: 'UpdateRolePositionsRequest' })

export type UpdateRolePositionsRequest = Schema.Schema.Type<typeof UpdateRolePositionsRequestSchema>

export const UpdateRoleRequestPartialSchema = Schema.Struct({
  name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 1, {
          expected: 'a string of at least 1 character',
        }),
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  permissions: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  color: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(16777215),
      ),
    ),
  ),
  colors: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), RoleColorsSchema])),
  hoist: Schema.optional(Schema.NullOr(Schema.Boolean)),
  mentionable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  icon: Schema.optional(Schema.NullOr(Schema.String)),
  unicode_emoji: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
}).annotate({ identifier: 'UpdateRoleRequestPartial' })

export type UpdateRoleRequestPartial = Schema.Schema.Type<typeof UpdateRoleRequestPartialSchema>

export const UpdateSelfVoiceStateRequestPartialSchema = Schema.Struct({
  request_to_speak_timestamp: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  suppress: Schema.optional(Schema.NullOr(Schema.Boolean)),
  channel_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
}).annotate({ identifier: 'UpdateSelfVoiceStateRequestPartial' })

export type UpdateSelfVoiceStateRequestPartial = Schema.Schema.Type<
  typeof UpdateSelfVoiceStateRequestPartialSchema
>

export const UpdateThreadRequestPartialSchema = Schema.Struct({
  name: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length >= 0, {
          expected: 'a string of at least 0 characters',
        }),
        Schema.makeFilter((input) => [...input].length <= 100, {
          expected: 'a string of at most 100 characters',
        }),
      ),
    ),
  ),
  archived: Schema.optional(Schema.NullOr(Schema.Boolean)),
  locked: Schema.optional(Schema.NullOr(Schema.Boolean)),
  invitable: Schema.optional(Schema.NullOr(Schema.Boolean)),
  auto_archive_duration: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), ThreadAutoArchiveDurationSchema]),
  ),
  rate_limit_per_user: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt32(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(21600),
      ),
    ),
  ),
  flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
  applied_tags: Schema.optional(
    Schema.NullOr(Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(5))),
  ),
  bitrate: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(8000))),
  ),
  user_limit: Schema.optional(
    Schema.NullOr(
      Schema.Number.check(
        Schema.isInt(),
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(99),
      ),
    ),
  ),
  rtc_region: Schema.optional(Schema.NullOr(Schema.String)),
  video_quality_mode: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), VideoQualityModesSchema]),
  ),
}).annotate({ identifier: 'UpdateThreadRequestPartial' })

export type UpdateThreadRequestPartial = Schema.Schema.Type<typeof UpdateThreadRequestPartialSchema>

export const UpdateVoiceStateRequestPartialSchema = Schema.Struct({
  suppress: Schema.optional(Schema.NullOr(Schema.Boolean)),
  channel_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
}).annotate({ identifier: 'UpdateVoiceStateRequestPartial' })

export type UpdateVoiceStateRequestPartial = Schema.Schema.Type<
  typeof UpdateVoiceStateRequestPartialSchema
>

export const UserGuildOnboardingResponseSchema = Schema.Struct({
  guild_id: SnowflakeTypeSchema,
  prompts: Schema.Array(OnboardingPromptResponseSchema),
  default_channel_ids: Schema.Array(SnowflakeTypeSchema).check(Schema.isUnique()),
  enabled: Schema.Boolean,
  mode: GuildOnboardingModeSchema,
}).annotate({ identifier: 'UserGuildOnboardingResponse' })

export type UserGuildOnboardingResponse = Schema.Schema.Type<
  typeof UserGuildOnboardingResponseSchema
>

export const UserPIIResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema.annotate({ description: "the user's id" }),
  username: Schema.String.annotate({
    description: "the user's username, not unique across the platform",
  }),
  avatar: Schema.NullOr(Schema.String).annotate({ description: "the user's avatar hash" }),
  discriminator: Schema.String.annotate({ description: "the user's Discord-tag" }),
  public_flags: Schema.Number.check(Schema.isInt32()).annotate({
    description: "the public flags on a user's account",
  }),
  flags: Int53TypeSchema.annotate({ description: "the flags on a user's account" }),
  bot: Schema.optional(
    Schema.Boolean.annotate({ description: 'whether the user belongs to an OAuth2 application' }),
  ),
  system: Schema.optional(
    Schema.Boolean.annotate({
      description:
        'whether the user is an Official Discord System user (part of the urgent message system)',
    }),
  ),
  banner: Schema.optional(
    Schema.NullOr(Schema.String).annotate({ description: "the user's banner hash" }),
  ),
  accent_color: Schema.optional(
    Schema.NullOr(Schema.Number.check(Schema.isInt32())).annotate({
      description:
        "the user's banner color encoded as an integer representation of hexadecimal color code",
    }),
  ),
  global_name: Schema.NullOr(Schema.String).annotate({
    description: "the user's display name, if it is set",
  }),
  avatar_decoration_data: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UserAvatarDecorationResponseSchema]).annotate({
      description: "data for the user's avatar decoration",
    }),
  ),
  collectibles: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UserCollectiblesResponseSchema]).annotate({
      description: "data for the user's collectibles",
    }),
  ),
  primary_guild: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), UserPrimaryGuildResponseSchema]),
  ),
  mfa_enabled: Schema.Boolean,
  locale: AvailableLocalesEnumSchema,
  premium_type: Schema.optional(PremiumTypesSchema),
  email: Schema.optional(Schema.NullOr(Schema.String)),
  verified: Schema.optional(Schema.Boolean),
}).annotate({ identifier: 'UserPIIResponse' })

export type UserPIIResponse = Schema.Schema.Type<typeof UserPIIResponseSchema>

export const UserProfileMetadataSchema = Schema.Struct({
  keyword_filter: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 60, {
            expected: 'a string of at most 60 characters',
          }),
        ),
      ).check(Schema.isMaxLength(1000)),
    ),
  ),
  regex_patterns: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 260, {
            expected: 'a string of at most 260 characters',
          }),
        ),
      ).check(Schema.isMaxLength(10)),
    ),
  ),
  allow_list: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.String.check(
          Schema.makeFilter((input) => [...input].length >= 1, {
            expected: 'a string of at least 1 character',
          }),
          Schema.makeFilter((input) => [...input].length <= 60, {
            expected: 'a string of at most 60 characters',
          }),
        ),
      ).check(Schema.isMaxLength(100)),
    ),
  ),
}).annotate({ identifier: 'UserProfileMetadata' })

export type UserProfileMetadata = Schema.Schema.Type<typeof UserProfileMetadataSchema>

export const UserProfileUpsertRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  event_type: AutomodEventTypeSchema,
  actions: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
    ),
  ),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  exempt_roles: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(20), Schema.isUnique()),
    ),
  ),
  exempt_channels: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(50), Schema.isUnique()),
    ),
  ),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: UserProfileMetadataSchema,
}).annotate({ identifier: 'UserProfileUpsertRequest' })

export type UserProfileUpsertRequest = Schema.Schema.Type<typeof UserProfileUpsertRequestSchema>

export const UserProfileUpsertRequestPartialSchema = Schema.Struct({
  name: Schema.optional(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 100, {
        expected: 'a string of at most 100 characters',
      }),
    ),
  ),
  event_type: Schema.optional(AutomodEventTypeSchema),
  actions: Schema.optional(
    Schema.NullOr(
      Schema.Array(
        Schema.Union([
          BlockMessageActionSchema,
          FlagToChannelActionSchema,
          QuarantineUserActionSchema,
          UserCommunicationDisabledActionSchema,
        ]),
      ).check(Schema.isMinLength(1), Schema.isMaxLength(5)),
    ),
  ),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
  exempt_roles: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(20), Schema.isUnique()),
    ),
  ),
  exempt_channels: Schema.optional(
    Schema.NullOr(
      Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(50), Schema.isUnique()),
    ),
  ),
  trigger_type: Schema.optional(AutomodTriggerTypeSchema),
  trigger_metadata: Schema.optional(UserProfileMetadataSchema),
}).annotate({ identifier: 'UserProfileUpsertRequestPartial' })

export type UserProfileUpsertRequestPartial = Schema.Schema.Type<
  typeof UserProfileUpsertRequestPartialSchema
>

export const VanityURLErrorResponseSchema = Schema.Struct({
  message: Schema.String,
  code: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'VanityURLErrorResponse' })

export type VanityURLErrorResponse = Schema.Schema.Type<typeof VanityURLErrorResponseSchema>

export const VanityURLResponseSchema = Schema.Struct({
  code: Schema.NullOr(Schema.String),
  uses: Schema.Number.check(Schema.isInt32()),
  error: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), VanityURLErrorResponseSchema])),
}).annotate({ identifier: 'VanityURLResponse' })

export type VanityURLResponse = Schema.Schema.Type<typeof VanityURLResponseSchema>

export const VoiceRegionResponseSchema = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  custom: Schema.Boolean,
  deprecated: Schema.Boolean,
  optimal: Schema.Boolean,
}).annotate({ identifier: 'VoiceRegionResponse' })

export type VoiceRegionResponse = Schema.Schema.Type<typeof VoiceRegionResponseSchema>

export const VoiceScheduledEventCreateRequestSchema = Schema.Struct({
  name: Schema.String.check(
    Schema.makeFilter((input) => [...input].length <= 100, {
      expected: 'a string of at most 100 characters',
    }),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 1000, {
          expected: 'a string of at most 1000 characters',
        }),
      ),
    ),
  ),
  image: Schema.optional(Schema.NullOr(Schema.String)),
  scheduled_start_time: Schema.String.check(
    Schema.isPattern(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ),
  scheduled_end_time: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  channel_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  recurrence_rule: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), RecurrenceRuleSchema]).annotate({
      description: 'Recurrence rule for the scheduled event',
    }),
  ),
  entity_metadata: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), EntityMetadataVoiceSchema]),
  ),
}).annotate({ identifier: 'VoiceScheduledEventCreateRequest' })

export type VoiceScheduledEventCreateRequest = Schema.Schema.Type<
  typeof VoiceScheduledEventCreateRequestSchema
>

export const VoiceScheduledEventPatchRequestPartialSchema = Schema.Struct({
  status: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), GuildScheduledEventStatusesSchema]),
  ),
  name: Schema.optional(
    Schema.String.check(
      Schema.makeFilter((input) => [...input].length <= 100, {
        expected: 'a string of at most 100 characters',
      }),
    ),
  ),
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 1000, {
          expected: 'a string of at most 1000 characters',
        }),
      ),
    ),
  ),
  image: Schema.optional(Schema.NullOr(Schema.String)),
  scheduled_start_time: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  scheduled_end_time: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.isPattern(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ),
    ),
  ),
  entity_type: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), GuildScheduledEventEntityTypesSchema]),
  ),
  privacy_level: Schema.optional(GuildScheduledEventPrivacyLevelsSchema),
  channel_id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
  recurrence_rule: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), RecurrenceRuleSchema]).annotate({
      description: 'Recurrence rule for the scheduled event',
    }),
  ),
  entity_metadata: Schema.optional(
    Schema.Union([Schema.NullOr(Schema.Null), EntityMetadataVoiceSchema]),
  ),
}).annotate({ identifier: 'VoiceScheduledEventPatchRequestPartial' })

export type VoiceScheduledEventPatchRequestPartial = Schema.Schema.Type<
  typeof VoiceScheduledEventPatchRequestPartialSchema
>

export const VoiceStateResponseSchema = Schema.Struct({
  channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  deaf: Schema.Boolean,
  guild_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
  member: Schema.optional(GuildMemberResponseSchema),
  mute: Schema.Boolean,
  request_to_speak_timestamp: Schema.NullOr(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  suppress: Schema.Boolean,
  self_stream: Schema.NullOr(Schema.Boolean),
  self_deaf: Schema.Boolean,
  self_mute: Schema.Boolean,
  self_video: Schema.Boolean,
  session_id: Schema.String,
  user_id: SnowflakeTypeSchema,
}).annotate({ identifier: 'VoiceStateResponse' })

export type VoiceStateResponse = Schema.Schema.Type<typeof VoiceStateResponseSchema>

export const WelcomeScreenPatchRequestPartialSchema = Schema.Struct({
  description: Schema.optional(
    Schema.NullOr(
      Schema.String.check(
        Schema.makeFilter((input) => [...input].length <= 140, {
          expected: 'a string of at most 140 characters',
        }),
      ),
    ),
  ),
  welcome_channels: Schema.optional(
    Schema.NullOr(Schema.Array(GuildWelcomeChannelSchema).check(Schema.isMaxLength(5))),
  ),
  enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
}).annotate({ identifier: 'WelcomeScreenPatchRequestPartial' })

export type WelcomeScreenPatchRequestPartial = Schema.Schema.Type<
  typeof WelcomeScreenPatchRequestPartialSchema
>

export const WidgetActivitySchema = Schema.Struct({ name: Schema.String }).annotate({
  identifier: 'WidgetActivity',
})

export type WidgetActivity = Schema.Schema.Type<typeof WidgetActivitySchema>

export const WidgetChannelSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  position: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'WidgetChannel' })

export type WidgetChannel = Schema.Schema.Type<typeof WidgetChannelSchema>

export const WidgetImageStylesSchema = Schema.Union([
  Schema.Literal('shield').annotate({
    description: 'shield style widget with Discord icon and guild members online count',
  }),
  Schema.Literal('banner1').annotate({
    description:
      'large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget',
  }),
  Schema.Literal('banner2').annotate({
    description:
      'smaller widget style with guild icon, name and online count. Split on the right with Discord logo',
  }),
  Schema.Literal('banner3').annotate({
    description:
      'large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right',
  }),
  Schema.Literal('banner4').annotate({
    description:
      'large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom',
  }),
]).annotate({ identifier: 'WidgetImageStyles' })

export type WidgetImageStyles = Schema.Schema.Type<typeof WidgetImageStylesSchema>

export const WidgetUserDiscriminatorSchema = Schema.Union([Schema.Literal('0000')]).annotate({
  identifier: 'WidgetUserDiscriminator',
})

export type WidgetUserDiscriminator = Schema.Schema.Type<typeof WidgetUserDiscriminatorSchema>

export const WidgetMemberSchema = Schema.Struct({
  id: Schema.String,
  username: Schema.String,
  discriminator: WidgetUserDiscriminatorSchema,
  avatar: Schema.NullOr(Schema.Null),
  status: Schema.String,
  avatar_url: Schema.String.check(Schema.makeFilter((input) => URL.canParse(input))),
  activity: Schema.optional(WidgetActivitySchema),
  deaf: Schema.optional(Schema.Boolean),
  mute: Schema.optional(Schema.Boolean),
  self_deaf: Schema.optional(Schema.Boolean),
  self_mute: Schema.optional(Schema.Boolean),
  suppress: Schema.optional(Schema.Boolean),
  channel_id: Schema.optional(SnowflakeTypeSchema),
}).annotate({ identifier: 'WidgetMember' })

export type WidgetMember = Schema.Schema.Type<typeof WidgetMemberSchema>

export const WidgetResponseSchema = Schema.Struct({
  id: SnowflakeTypeSchema,
  name: Schema.String,
  instant_invite: Schema.NullOr(Schema.String),
  channels: Schema.Array(WidgetChannelSchema),
  members: Schema.Array(WidgetMemberSchema),
  presence_count: Schema.Number.check(Schema.isInt32()),
}).annotate({ identifier: 'WidgetResponse' })

export type WidgetResponse = Schema.Schema.Type<typeof WidgetResponseSchema>

export const WidgetSettingsResponseSchema = Schema.Struct({
  enabled: Schema.Boolean,
  channel_id: Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
}).annotate({ identifier: 'WidgetSettingsResponse' })

export type WidgetSettingsResponse = Schema.Schema.Type<typeof WidgetSettingsResponseSchema>

export const ErrorSchema = Schema.Struct({
  code: Schema.Number.check(Schema.isInt()).annotate({
    description: 'Discord internal error code. See error code reference',
  }),
  message: Schema.String.annotate({ description: 'Human-readable error message' }),
})
  .annotate({ description: 'A single error, either for an API response or a specific field.' })
  .annotate({ identifier: 'Error' })

export type Error = Schema.Schema.Type<typeof ErrorSchema>

export const InnerErrorsSchema = Schema.Struct({
  _errors: Schema.Array(ErrorSchema).annotate({ description: 'The list of errors for this field' }),
})
  .annotate({ parseOptions: { onExcessProperty: 'error' } })
  .annotate({ identifier: 'InnerErrors' })

export type InnerErrors = Schema.Schema.Type<typeof InnerErrorsSchema>

type ErrorDetailsType =
  | { [key: string]: ErrorDetailsType }
  | Schema.Schema.Type<typeof InnerErrorsSchema>

export const ErrorDetailsSchema: Schema.Codec<ErrorDetailsType> = Schema.Union([
  Schema.Record(
    Schema.String,
    Schema.suspend(() => ErrorDetailsSchema),
  ),
  InnerErrorsSchema,
]).annotate({ identifier: 'ErrorDetails' })

export type ErrorDetails = Schema.Schema.Type<typeof ErrorDetailsSchema>

export const ErrorResponseSchema = ErrorSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(Schema.Struct({ errors: Schema.optional(ErrorDetailsSchema) }))(input),
  ),
)
  .annotate({ description: 'Errors object returned by the Discord API' })
  .annotate({ identifier: 'ErrorResponse' })

export type ErrorResponse = Schema.Schema.Type<typeof ErrorResponseSchema>

export const RatelimitedResponseSchema = ErrorSchema.check(
  Schema.makeFilter((input) =>
    Schema.is(
      Schema.Struct({
        retry_after: Schema.Number.annotate({
          description: 'The number of seconds to wait before retrying your request',
        }),
        global: Schema.Boolean.annotate({
          description:
            'Whether you are being ratelimited by the global ratelimit or a per-endpoint ratelimit',
        }),
      }),
    )(input),
  ),
)
  .annotate({ description: 'Ratelimit error object returned by the Discord API' })
  .annotate({ identifier: 'RatelimitedResponse' })

export type RatelimitedResponse = Schema.Schema.Type<typeof RatelimitedResponseSchema>

export const XRateLimitLimitHeaderSchema = resolver(
  Schema.toStandardSchemaV1(Schema.Number.check(Schema.isInt())),
)
export const XRateLimitRemainingHeaderSchema = resolver(
  Schema.toStandardSchemaV1(Schema.Number.check(Schema.isInt())),
)
export const XRateLimitResetHeaderSchema = resolver(Schema.toStandardSchemaV1(Schema.Number))
export const XRateLimitResetAfterHeaderSchema = resolver(Schema.toStandardSchemaV1(Schema.Number))
export const XRateLimitBucketHeaderSchema = resolver(Schema.toStandardSchemaV1(Schema.String))

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
  content: {
    'application/json': { schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)) },
  },
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
    'application/json': { schema: resolver(Schema.toStandardSchemaV1(RatelimitedResponseSchema)) },
  },
}
