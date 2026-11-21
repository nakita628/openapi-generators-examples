import { type, scope } from 'arktype'

export const AccountResponseSchema = type({ id: 'string', name: 'string | null' })

export type AccountResponse = typeof AccountResponseSchema.infer

export const MessageComponentTypesSchema = type(
  type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(
                            type(
                              type(
                                type(
                                  type(
                                    type(type('1').describe('Container for other components')).or(
                                      type('2').describe('Button object'),
                                    ),
                                  ).or(
                                    type('3').describe(
                                      'Select menu for picking from defined text options',
                                    ),
                                  ),
                                ).or(type('4').describe('Text input object')),
                              ).or(type('5').describe('Select menu for users')),
                            ).or(type('6').describe('Select menu for roles')),
                          ).or(
                            type('7').describe('Select menu for mentionables (users and roles)'),
                          ),
                        ).or(type('8').describe('Select menu for channels')),
                      ).or(type('9').describe('Section component')),
                    ).or(type('10').describe('Text component')),
                  ).or(type('11').describe('Thumbnail component')),
                ).or(type('12').describe('Media gallery component')),
              ).or(type('13').describe('File component')),
            ).or(type('14').describe('Separator component')),
          ).or(type('17').describe('Container component')),
        ).or(type('18').describe('Label component')),
      ).or(type('19').describe('File upload component')),
    ).or(type('21').describe('Radio group component')),
  ).or(type('22').describe('Checkbox group component')),
).or(type('23').describe('Checkbox component'))

export type MessageComponentTypes = typeof MessageComponentTypesSchema.infer

export const ButtonStyleTypesSchema = type('1 | 2 | 3 | 4 | 5 | 6')

export type ButtonStyleTypes = typeof ButtonStyleTypesSchema.infer

export const SnowflakeTypeSchema = type('string').and(/^(0|[1-9][0-9]*)$/)

export type SnowflakeType = typeof SnowflakeTypeSchema.infer

export const ComponentEmojiForRequestSchema = type({
  'id?': type('null | null').or(SnowflakeTypeSchema),
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
  ),
})

export type ComponentEmojiForRequest = typeof ComponentEmojiForRequestSchema.infer

export const ButtonComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  'custom_id?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  ).or('null'),
  style: ButtonStyleTypesSchema,
  'label?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters'),
    ),
  ).or('null'),
  'disabled?': 'boolean | null',
  'url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters'),
    ),
  ).or('null'),
  'sku_id?': type('null | null').or(SnowflakeTypeSchema),
  'emoji?': type('null | null').or(ComponentEmojiForRequestSchema),
})

export type ButtonComponentForMessageRequest = typeof ButtonComponentForMessageRequestSchema.infer

export const SnowflakeSelectDefaultValueTypesSchema = type("'user' | 'role' | 'channel'")

export type SnowflakeSelectDefaultValueTypes = typeof SnowflakeSelectDefaultValueTypesSchema.infer

export const ChannelSelectDefaultValueSchema = type({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type ChannelSelectDefaultValue = typeof ChannelSelectDefaultValueSchema.infer

export const ChannelTypesSchema = type(
  type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(type('1').describe('A direct message between users')).or(
                      type('3').describe('A direct message between multiple users'),
                    ),
                  ).or(type('0').describe('A text channel within a server')),
                ).or(type('2').describe('A voice channel within a server')),
              ).or(
                type('4').describe('An organizational category that contains up to 50 channels'),
              ),
            ).or(
              type('5').describe(
                'A channel that users can follow and crosspost into their own server (formerly news channels)',
              ),
            ),
          ).or(type('10').describe('A temporary sub-channel within a GUILD_ANNOUNCEMENT channel')),
        ).or(
          type('11').describe(
            'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
          ),
        ),
      ).or(
        type('12').describe(
          'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
        ),
      ),
    ).or(type('13').describe('A voice channel for hosting events with an audience')),
  ).or(type('14').describe('The channel in a hub containing the listed servers')),
).or(type('15').describe('Channel that can only contain threads'))

export type ChannelTypes = typeof ChannelTypesSchema.infer

export const ChannelSelectComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 150 || ctx.mustBe('at most 150 characters'),
    ),
  ).or('null'),
  'min_values?': 'number.integer >= 0 & number.integer <= 25 | null',
  'max_values?': 'number.integer >= 1 & number.integer <= 25 | null',
  'disabled?': 'boolean | null',
  'required?': 'boolean | null',
  'default_values?': type(
    type(type(ChannelSelectDefaultValueSchema).array()).and(type('unknown[] <= 25')),
  ).or('null'),
  'channel_types?': type(
    type(ChannelTypesSchema)
      .array()
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
})

export type ChannelSelectComponentForMessageRequest =
  typeof ChannelSelectComponentForMessageRequestSchema.infer

export const RoleSelectDefaultValueSchema = type({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type RoleSelectDefaultValue = typeof RoleSelectDefaultValueSchema.infer

export const UserSelectDefaultValueSchema = type({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type UserSelectDefaultValue = typeof UserSelectDefaultValueSchema.infer

export const MentionableSelectComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 150 || ctx.mustBe('at most 150 characters'),
    ),
  ).or('null'),
  'min_values?': 'number.integer >= 0 & number.integer <= 25 | null',
  'max_values?': 'number.integer >= 1 & number.integer <= 25 | null',
  'disabled?': 'boolean | null',
  'required?': 'boolean | null',
  'default_values?': type(
    type(type(type(RoleSelectDefaultValueSchema).or(UserSelectDefaultValueSchema)).array()).and(
      type('unknown[] <= 25'),
    ),
  ).or('null'),
})

export type MentionableSelectComponentForMessageRequest =
  typeof MentionableSelectComponentForMessageRequestSchema.infer

export const RoleSelectComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 150 || ctx.mustBe('at most 150 characters'),
    ),
  ).or('null'),
  'min_values?': 'number.integer >= 0 & number.integer <= 25 | null',
  'max_values?': 'number.integer >= 1 & number.integer <= 25 | null',
  'disabled?': 'boolean | null',
  'required?': 'boolean | null',
  'default_values?': type(
    type(type(RoleSelectDefaultValueSchema).array()).and(type('unknown[] <= 25')),
  ).or('null'),
})

export type RoleSelectComponentForMessageRequest =
  typeof RoleSelectComponentForMessageRequestSchema.infer

export const StringSelectOptionForRequestSchema = type({
  label: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  value: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
  'default?': 'boolean | null',
  'emoji?': type('null | null').or(ComponentEmojiForRequestSchema),
})

export type StringSelectOptionForRequest = typeof StringSelectOptionForRequestSchema.infer

export const StringSelectComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 150 || ctx.mustBe('at most 150 characters'),
    ),
  ).or('null'),
  'min_values?': 'number.integer >= 0 & number.integer <= 25 | null',
  'max_values?': 'number.integer >= 1 & number.integer <= 25 | null',
  'disabled?': 'boolean | null',
  'required?': 'boolean | null',
  options: type(type(StringSelectOptionForRequestSchema).array()).and(type('1 <= unknown[] <= 25')),
})

export type StringSelectComponentForMessageRequest =
  typeof StringSelectComponentForMessageRequestSchema.infer

export const UserSelectComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 150 || ctx.mustBe('at most 150 characters'),
    ),
  ).or('null'),
  'min_values?': 'number.integer >= 0 & number.integer <= 25 | null',
  'max_values?': 'number.integer >= 1 & number.integer <= 25 | null',
  'disabled?': 'boolean | null',
  'required?': 'boolean | null',
  'default_values?': type(
    type(type(UserSelectDefaultValueSchema).array()).and(type('unknown[] <= 25')),
  ).or('null'),
})

export type UserSelectComponentForMessageRequest =
  typeof UserSelectComponentForMessageRequestSchema.infer

export const ActionRowComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  components: type(
    type(
      type(
        type(
          type(
            type(
              type(ButtonComponentForMessageRequestSchema).or(
                ChannelSelectComponentForMessageRequestSchema,
              ),
            ).or(MentionableSelectComponentForMessageRequestSchema),
          ).or(RoleSelectComponentForMessageRequestSchema),
        ).or(StringSelectComponentForMessageRequestSchema),
      ).or(UserSelectComponentForMessageRequestSchema),
    ).array(),
  ).and(type('1 <= unknown[] <= 5')),
})

export type ActionRowComponentForMessageRequest =
  typeof ActionRowComponentForMessageRequestSchema.infer

export const TextInputStyleTypesSchema = type(type('1').describe('Single-line input')).or(
  type('2').describe('Multi-line input'),
)

export type TextInputStyleTypes = typeof TextInputStyleTypesSchema.infer

export const TextInputComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  style: TextInputStyleTypesSchema,
  'label?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 45 || ctx.mustBe('at most 45 characters')),
  ).or('null'),
  'value?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
    ),
  ).or('null'),
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
  'required?': 'boolean | null',
  'min_length?': 'number.integer >= 0 & number.integer <= 4000 | null',
  'max_length?': 'number.integer >= 1 & number.integer <= 4000 | null',
})

export type TextInputComponentForModalRequest = typeof TextInputComponentForModalRequestSchema.infer

export const ActionRowComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  components: type(type(TextInputComponentForModalRequestSchema).array()).and(
    type('1 <= unknown[] <= 5'),
  ),
})

export type ActionRowComponentForModalRequest = typeof ActionRowComponentForModalRequestSchema.infer

export const ComponentEmojiResponseSchema = type({
  'id?': SnowflakeTypeSchema,
  name: 'string',
  'animated?': 'boolean',
})

export type ComponentEmojiResponse = typeof ComponentEmojiResponseSchema.infer

export const ButtonComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'custom_id?': 'string',
  style: ButtonStyleTypesSchema,
  'label?': 'string',
  'disabled?': 'boolean',
  'emoji?': ComponentEmojiResponseSchema,
  'url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'sku_id?': SnowflakeTypeSchema,
})

export type ButtonComponentResponse = typeof ButtonComponentResponseSchema.infer

export const ChannelSelectDefaultValueResponseSchema = type({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type ChannelSelectDefaultValueResponse = typeof ChannelSelectDefaultValueResponseSchema.infer

export const ChannelSelectComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  custom_id: 'string',
  'placeholder?': 'string',
  min_values: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  max_values: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'disabled?': 'boolean',
  'channel_types?': type(ChannelTypesSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  'default_values?': type(ChannelSelectDefaultValueResponseSchema).array(),
})

export type ChannelSelectComponentResponse = typeof ChannelSelectComponentResponseSchema.infer

export const RoleSelectDefaultValueResponseSchema = type({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type RoleSelectDefaultValueResponse = typeof RoleSelectDefaultValueResponseSchema.infer

export const UserSelectDefaultValueResponseSchema = type({
  type: SnowflakeSelectDefaultValueTypesSchema,
  id: SnowflakeTypeSchema,
})

export type UserSelectDefaultValueResponse = typeof UserSelectDefaultValueResponseSchema.infer

export const MentionableSelectComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  custom_id: 'string',
  'placeholder?': 'string',
  min_values: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  max_values: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'disabled?': 'boolean',
  'default_values?': type(
    type(RoleSelectDefaultValueResponseSchema).or(UserSelectDefaultValueResponseSchema),
  ).array(),
})

export type MentionableSelectComponentResponse =
  typeof MentionableSelectComponentResponseSchema.infer

export const RoleSelectComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  custom_id: 'string',
  'placeholder?': 'string',
  min_values: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  max_values: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'disabled?': 'boolean',
  'default_values?': type(RoleSelectDefaultValueResponseSchema).array(),
})

export type RoleSelectComponentResponse = typeof RoleSelectComponentResponseSchema.infer

export const StringSelectOptionResponseSchema = type({
  label: 'string',
  value: 'string',
  'description?': 'string',
  'emoji?': ComponentEmojiResponseSchema,
  'default?': 'boolean',
})

export type StringSelectOptionResponse = typeof StringSelectOptionResponseSchema.infer

export const StringSelectComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  custom_id: 'string',
  'placeholder?': 'string',
  min_values: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  max_values: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'disabled?': 'boolean',
  options: type(StringSelectOptionResponseSchema).array(),
})

export type StringSelectComponentResponse = typeof StringSelectComponentResponseSchema.infer

export const TextInputComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  custom_id: 'string',
  style: TextInputStyleTypesSchema,
  label: 'string | null',
  'value?': 'string',
  'placeholder?': 'string',
  'required?': 'boolean',
  min_length: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  max_length: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
})

export type TextInputComponentResponse = typeof TextInputComponentResponseSchema.infer

export const UserSelectComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  custom_id: 'string',
  'placeholder?': 'string',
  min_values: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  max_values: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'disabled?': 'boolean',
  'default_values?': type(UserSelectDefaultValueResponseSchema).array(),
})

export type UserSelectComponentResponse = typeof UserSelectComponentResponseSchema.infer

export const ActionRowComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  components: type(
    type(
      type(
        type(
          type(
            type(type(ButtonComponentResponseSchema).or(ChannelSelectComponentResponseSchema)).or(
              MentionableSelectComponentResponseSchema,
            ),
          ).or(RoleSelectComponentResponseSchema),
        ).or(StringSelectComponentResponseSchema),
      ).or(TextInputComponentResponseSchema),
    ).or(UserSelectComponentResponseSchema),
  ).array(),
})

export type ActionRowComponentResponse = typeof ActionRowComponentResponseSchema.infer

export const ActionTypesSchema = type(
  type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(
                            type(
                              type(
                                type(
                                  type(
                                    type(
                                      type(
                                        type(
                                          type(
                                            type(
                                              type(
                                                type(
                                                  type(
                                                    type(
                                                      type(
                                                        type(
                                                          type(
                                                            type(
                                                              type(
                                                                type(
                                                                  type(
                                                                    type(
                                                                      type(
                                                                        type(
                                                                          type(
                                                                            type(
                                                                              type(
                                                                                type(
                                                                                  type(
                                                                                    type(
                                                                                      type(
                                                                                        type(
                                                                                          type(
                                                                                            type(
                                                                                              type(
                                                                                                type(
                                                                                                  type(
                                                                                                    type(
                                                                                                      type(
                                                                                                        type(
                                                                                                          type(
                                                                                                            type(
                                                                                                              type(
                                                                                                                type(
                                                                                                                  type(
                                                                                                                    type(
                                                                                                                      type(
                                                                                                                        type(
                                                                                                                          type(
                                                                                                                            type(
                                                                                                                              type(
                                                                                                                                type(
                                                                                                                                  type(
                                                                                                                                    type(
                                                                                                                                      type(
                                                                                                                                        type(
                                                                                                                                          type(
                                                                                                                                            type(
                                                                                                                                              type(
                                                                                                                                                type(
                                                                                                                                                  type(
                                                                                                                                                    type(
                                                                                                                                                      type(
                                                                                                                                                        type(
                                                                                                                                                          type(
                                                                                                                                                            type(
                                                                                                                                                              "'TYPING_START'",
                                                                                                                                                            ).describe(
                                                                                                                                                              'User started typing in a channel',
                                                                                                                                                            ),
                                                                                                                                                          ).or(
                                                                                                                                                            type(
                                                                                                                                                              "'INVITE_CREATE'",
                                                                                                                                                            ).describe(
                                                                                                                                                              'Invite to a channel was created',
                                                                                                                                                            ),
                                                                                                                                                          ),
                                                                                                                                                        ).or(
                                                                                                                                                          type(
                                                                                                                                                            "'INVITE_DELETE'",
                                                                                                                                                          ).describe(
                                                                                                                                                            'Invite to a channel was deleted',
                                                                                                                                                          ),
                                                                                                                                                        ),
                                                                                                                                                      ).or(
                                                                                                                                                        type(
                                                                                                                                                          "'WEBHOOKS_UPDATE'",
                                                                                                                                                        ).describe(
                                                                                                                                                          'Guild channel webhook was created, updated, or deleted',
                                                                                                                                                        ),
                                                                                                                                                      ),
                                                                                                                                                    ).or(
                                                                                                                                                      type(
                                                                                                                                                        "'CHANNEL_CREATE'",
                                                                                                                                                      ).describe(
                                                                                                                                                        'New guild channel created',
                                                                                                                                                      ),
                                                                                                                                                    ),
                                                                                                                                                  ).or(
                                                                                                                                                    type(
                                                                                                                                                      "'VOICE_CHANNEL_STATUS_UPDATE'",
                                                                                                                                                    ).describe(
                                                                                                                                                      'Voice channel status was updated',
                                                                                                                                                    ),
                                                                                                                                                  ),
                                                                                                                                                ).or(
                                                                                                                                                  type(
                                                                                                                                                    "'CHANNEL_UPDATE'",
                                                                                                                                                  ).describe(
                                                                                                                                                    'Channel was updated',
                                                                                                                                                  ),
                                                                                                                                                ),
                                                                                                                                              ).or(
                                                                                                                                                type(
                                                                                                                                                  "'CHANNEL_DELETE'",
                                                                                                                                                ).describe(
                                                                                                                                                  'Channel was deleted',
                                                                                                                                                ),
                                                                                                                                              ),
                                                                                                                                            ).or(
                                                                                                                                              type(
                                                                                                                                                "'CHANNEL_PINS_UPDATE'",
                                                                                                                                              ).describe(
                                                                                                                                                'Message was pinned or unpinned',
                                                                                                                                              ),
                                                                                                                                            ),
                                                                                                                                          ).or(
                                                                                                                                            type(
                                                                                                                                              "'THREAD_CREATE'",
                                                                                                                                            ).describe(
                                                                                                                                              'Thread created, also sent when being added to a private thread',
                                                                                                                                            ),
                                                                                                                                          ),
                                                                                                                                        ).or(
                                                                                                                                          type(
                                                                                                                                            "'THREAD_UPDATE'",
                                                                                                                                          ).describe(
                                                                                                                                            'Thread was updated',
                                                                                                                                          ),
                                                                                                                                        ),
                                                                                                                                      ).or(
                                                                                                                                        type(
                                                                                                                                          "'THREAD_DELETE'",
                                                                                                                                        ).describe(
                                                                                                                                          'Thread was deleted',
                                                                                                                                        ),
                                                                                                                                      ),
                                                                                                                                    ).or(
                                                                                                                                      type(
                                                                                                                                        "'THREAD_LIST_SYNC'",
                                                                                                                                      ).describe(
                                                                                                                                        'Sent when gaining access to a channel, contains all active threads in that channel',
                                                                                                                                      ),
                                                                                                                                    ),
                                                                                                                                  ).or(
                                                                                                                                    type(
                                                                                                                                      "'THREAD_MEMBER_UPDATE'",
                                                                                                                                    ).describe(
                                                                                                                                      'Thread member for the current user was updated',
                                                                                                                                    ),
                                                                                                                                  ),
                                                                                                                                ).or(
                                                                                                                                  type(
                                                                                                                                    "'THREAD_MEMBERS_UPDATE'",
                                                                                                                                  ).describe(
                                                                                                                                    'Some user(s) were added to or removed from a thread',
                                                                                                                                  ),
                                                                                                                                ),
                                                                                                                              ).or(
                                                                                                                                type(
                                                                                                                                  "'GUILD_CREATE'",
                                                                                                                                ).describe(
                                                                                                                                  'Lazy-load for unavailable guild, guild became available, or user joined a new guild',
                                                                                                                                ),
                                                                                                                              ),
                                                                                                                            ).or(
                                                                                                                              type(
                                                                                                                                "'GUILD_UPDATE'",
                                                                                                                              ).describe(
                                                                                                                                'Guild was updated',
                                                                                                                              ),
                                                                                                                            ),
                                                                                                                          ).or(
                                                                                                                            type(
                                                                                                                              "'GUILD_DELETE'",
                                                                                                                            ).describe(
                                                                                                                              'Guild became unavailable, or user left/was removed from a guild',
                                                                                                                            ),
                                                                                                                          ),
                                                                                                                        ).or(
                                                                                                                          type(
                                                                                                                            "'GUILD_EMOJIS_UPDATE'",
                                                                                                                          ).describe(
                                                                                                                            'Guild emojis were updated',
                                                                                                                          ),
                                                                                                                        ),
                                                                                                                      ).or(
                                                                                                                        type(
                                                                                                                          "'GUILD_STICKERS_UPDATE'",
                                                                                                                        ).describe(
                                                                                                                          'Guild stickers were updated',
                                                                                                                        ),
                                                                                                                      ),
                                                                                                                    ).or(
                                                                                                                      type(
                                                                                                                        "'GUILD_INTEGRATIONS_UPDATE'",
                                                                                                                      ).describe(
                                                                                                                        'Guild integration was updated',
                                                                                                                      ),
                                                                                                                    ),
                                                                                                                  ).or(
                                                                                                                    type(
                                                                                                                      "'GUILD_MEMBER_ADD'",
                                                                                                                    ).describe(
                                                                                                                      'New user joined a guild',
                                                                                                                    ),
                                                                                                                  ),
                                                                                                                ).or(
                                                                                                                  type(
                                                                                                                    "'GUILD_MEMBER_UPDATE'",
                                                                                                                  ).describe(
                                                                                                                    'Guild member was updated',
                                                                                                                  ),
                                                                                                                ),
                                                                                                              ).or(
                                                                                                                type(
                                                                                                                  "'GUILD_MEMBER_REMOVE'",
                                                                                                                ).describe(
                                                                                                                  'User was removed from a guild',
                                                                                                                ),
                                                                                                              ),
                                                                                                            ).or(
                                                                                                              type(
                                                                                                                "'GUILD_BAN_ADD'",
                                                                                                              ).describe(
                                                                                                                'User was banned from a guild',
                                                                                                              ),
                                                                                                            ),
                                                                                                          ).or(
                                                                                                            type(
                                                                                                              "'GUILD_BAN_REMOVE'",
                                                                                                            ).describe(
                                                                                                              'User was unbanned from a guild',
                                                                                                            ),
                                                                                                          ),
                                                                                                        ).or(
                                                                                                          type(
                                                                                                            "'GUILD_ROLE_CREATE'",
                                                                                                          ).describe(
                                                                                                            'Guild role was created',
                                                                                                          ),
                                                                                                        ),
                                                                                                      ).or(
                                                                                                        type(
                                                                                                          "'GUILD_ROLE_UPDATE'",
                                                                                                        ).describe(
                                                                                                          'Guild role was updated',
                                                                                                        ),
                                                                                                      ),
                                                                                                    ).or(
                                                                                                      type(
                                                                                                        "'GUILD_ROLE_DELETE'",
                                                                                                      ).describe(
                                                                                                        'Guild role was deleted',
                                                                                                      ),
                                                                                                    ),
                                                                                                  ).or(
                                                                                                    type(
                                                                                                      "'GUILD_MEMBERS_CHUNK'",
                                                                                                    ).describe(
                                                                                                      'Response to Request Guild Members',
                                                                                                    ),
                                                                                                  ),
                                                                                                ).or(
                                                                                                  type(
                                                                                                    "'MESSAGE_CREATE'",
                                                                                                  ).describe(
                                                                                                    'Message was created',
                                                                                                  ),
                                                                                                ),
                                                                                              ).or(
                                                                                                type(
                                                                                                  "'MESSAGE_UPDATE'",
                                                                                                ).describe(
                                                                                                  'Message was edited',
                                                                                                ),
                                                                                              ),
                                                                                            ).or(
                                                                                              type(
                                                                                                "'MESSAGE_DELETE'",
                                                                                              ).describe(
                                                                                                'Message was deleted',
                                                                                              ),
                                                                                            ),
                                                                                          ).or(
                                                                                            type(
                                                                                              "'MESSAGE_DELETE_BULK'",
                                                                                            ).describe(
                                                                                              'Multiple messages were deleted at once',
                                                                                            ),
                                                                                          ),
                                                                                        ).or(
                                                                                          type(
                                                                                            "'MESSAGE_REACTION_ADD'",
                                                                                          ).describe(
                                                                                            'User reacted to a message',
                                                                                          ),
                                                                                        ),
                                                                                      ).or(
                                                                                        type(
                                                                                          "'MESSAGE_REACTION_REMOVE'",
                                                                                        ).describe(
                                                                                          'User removed a reaction from a message',
                                                                                        ),
                                                                                      ),
                                                                                    ).or(
                                                                                      type(
                                                                                        "'MESSAGE_REACTION_REMOVE_ALL'",
                                                                                      ).describe(
                                                                                        'All reactions were explicitly removed from a message',
                                                                                      ),
                                                                                    ),
                                                                                  ).or(
                                                                                    type(
                                                                                      "'MESSAGE_REACTION_REMOVE_EMOJI'",
                                                                                    ).describe(
                                                                                      'All reactions for a given emoji were explicitly removed from a message',
                                                                                    ),
                                                                                  ),
                                                                                ).or(
                                                                                  type(
                                                                                    "'USER_UPDATE'",
                                                                                  ).describe(
                                                                                    'Properties about the user changed',
                                                                                  ),
                                                                                ),
                                                                              ).or(
                                                                                type(
                                                                                  "'ENTITLEMENT_CREATE'",
                                                                                ).describe(
                                                                                  'Entitlement was created',
                                                                                ),
                                                                              ),
                                                                            ).or(
                                                                              type(
                                                                                "'ENTITLEMENT_UPDATE'",
                                                                              ).describe(
                                                                                'Entitlement was updated',
                                                                              ),
                                                                            ),
                                                                          ).or(
                                                                            type(
                                                                              "'ENTITLEMENT_DELETE'",
                                                                            ).describe(
                                                                              'Entitlement was deleted',
                                                                            ),
                                                                          ),
                                                                        ).or(
                                                                          type("'READY'").describe(
                                                                            'Contains the initial state information',
                                                                          ),
                                                                        ),
                                                                      ).or(
                                                                        type("'RESUMED'").describe(
                                                                          'Response to Resume',
                                                                        ),
                                                                      ),
                                                                    ).or(
                                                                      type(
                                                                        "'PRESENCE_UPDATE'",
                                                                      ).describe(
                                                                        'User was updated',
                                                                      ),
                                                                    ),
                                                                  ).or(
                                                                    type(
                                                                      "'VOICE_STATE_UPDATE'",
                                                                    ).describe(
                                                                      'Someone joined, left, or moved a voice channel',
                                                                    ),
                                                                  ),
                                                                ).or(
                                                                  type(
                                                                    "'VOICE_SERVER_UPDATE'",
                                                                  ).describe(
                                                                    "Guild's voice server was updated",
                                                                  ),
                                                                ),
                                                              ).or(
                                                                type(
                                                                  "'LOBBY_MESSAGE_CREATE'",
                                                                ).describe(
                                                                  'Sent when a message is created in a lobby',
                                                                ),
                                                              ),
                                                            ).or(
                                                              type(
                                                                "'LOBBY_MESSAGE_UPDATE'",
                                                              ).describe(
                                                                'Sent when a message is updated in a lobby',
                                                              ),
                                                            ),
                                                          ).or(
                                                            type("'LOBBY_MESSAGE_DELETE'").describe(
                                                              'Sent when a message is deleted from a lobby',
                                                            ),
                                                          ),
                                                        ).or(
                                                          type(
                                                            "'GAME_DIRECT_MESSAGE_CREATE'",
                                                          ).describe(
                                                            'Sent when a direct message is created during an active Social SDK session',
                                                          ),
                                                        ),
                                                      ).or(
                                                        type(
                                                          "'GAME_DIRECT_MESSAGE_DELETE'",
                                                        ).describe(
                                                          'Sent when a direct message is deleted during an active Social SDK session',
                                                        ),
                                                      ),
                                                    ).or(
                                                      type("'GAME_DIRECT_MESSAGE_UPDATE'").describe(
                                                        'Sent when a direct message is updated during an active Social SDK session',
                                                      ),
                                                    ),
                                                  ).or(
                                                    type("'INTERACTION_CREATE'").describe(
                                                      'User used an interaction, such as an Application Command',
                                                    ),
                                                  ),
                                                ).or(
                                                  type("'INTEGRATION_CREATE'").describe(
                                                    'Guild integration was created',
                                                  ),
                                                ),
                                              ).or(
                                                type("'INTEGRATION_UPDATE'").describe(
                                                  'Guild integration was updated',
                                                ),
                                              ),
                                            ).or(
                                              type("'INTEGRATION_DELETE'").describe(
                                                'Guild integration was deleted',
                                              ),
                                            ),
                                          ).or(
                                            type(
                                              "'APPLICATION_COMMAND_PERMISSIONS_UPDATE'",
                                            ).describe(
                                              'Application command permission was updated',
                                            ),
                                          ),
                                        ).or(
                                          type("'APPLICATION_AUTHORIZED'").describe(
                                            'Sent when an app was authorized by a user to a server or their account',
                                          ),
                                        ),
                                      ).or(
                                        type("'APPLICATION_DEAUTHORIZED'").describe(
                                          'Sent when an app was deauthorized by a user',
                                        ),
                                      ),
                                    ).or(
                                      type("'STAGE_INSTANCE_CREATE'").describe(
                                        'Stage instance was created',
                                      ),
                                    ),
                                  ).or(
                                    type("'STAGE_INSTANCE_UPDATE'").describe(
                                      'Stage instance was updated',
                                    ),
                                  ),
                                ).or(
                                  type("'STAGE_INSTANCE_DELETE'").describe(
                                    'Stage instance was deleted or closed',
                                  ),
                                ),
                              ).or(
                                type("'GUILD_AUDIT_LOG_ENTRY_CREATE'").describe(
                                  'A guild audit log entry was created',
                                ),
                              ),
                            ).or(
                              type("'GUILD_SCHEDULED_EVENT_CREATE'").describe(
                                'Guild scheduled event was created',
                              ),
                            ),
                          ).or(
                            type("'GUILD_SCHEDULED_EVENT_UPDATE'").describe(
                              'Guild scheduled event was updated',
                            ),
                          ),
                        ).or(
                          type("'GUILD_SCHEDULED_EVENT_DELETE'").describe(
                            'Guild scheduled event was deleted',
                          ),
                        ),
                      ).or(
                        type("'GUILD_SCHEDULED_EVENT_USER_ADD'").describe(
                          'User subscribed to a guild scheduled event',
                        ),
                      ),
                    ).or(
                      type("'GUILD_SCHEDULED_EVENT_USER_REMOVE'").describe(
                        'User unsubscribed from a guild scheduled event',
                      ),
                    ),
                  ).or(
                    type("'AUTO_MODERATION_RULE_CREATE'").describe(
                      'Auto Moderation rule was created',
                    ),
                  ),
                ).or(
                  type("'AUTO_MODERATION_RULE_UPDATE'").describe(
                    'Auto Moderation rule was updated',
                  ),
                ),
              ).or(
                type("'AUTO_MODERATION_RULE_DELETE'").describe('Auto Moderation rule was deleted'),
              ),
            ).or(
              type("'AUTO_MODERATION_ACTION_EXECUTION'").describe(
                'Auto Moderation rule was triggered and an action was executed (.e.g. a message was blocked)',
              ),
            ),
          ).or("'GUILD_SOUNDBOARD_SOUNDS_UPDATE'"),
        ).or("'GUILD_SOUNDBOARD_SOUND_CREATE'"),
      ).or("'GUILD_SOUNDBOARD_SOUND_UPDATE'"),
    ).or("'GUILD_SOUNDBOARD_SOUND_DELETE'"),
  ).or(
    type("'QUEST_USER_ENROLLMENT'").describe('User was added to a Quest (currently unavailable)'),
  ),
).or("'RATE_LIMITED'")

export type ActionTypes = typeof ActionTypesSchema.infer

export const ApplicationTypesSchema = type('4')

export type ApplicationTypes = typeof ApplicationTypesSchema.infer

export const Int53TypeSchema = type('bigint | number.integer')
  .or(/^-?\d+$/)
  .pipe((data) => BigInt(data))
  .narrow(
    (data, ctx) =>
      (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
  )
  .narrow((data, ctx) => data >= -9007199254740991n || ctx.mustBe('at least -9007199254740991'))
  .narrow((data, ctx) => data <= 9007199254740991n || ctx.mustBe('at most 9007199254740991'))

export type Int53Type = typeof Int53TypeSchema.infer

export const UserAvatarDecorationResponseSchema = type({
  asset: type('string').describe('the avatar decoration hash'),
  sku_id: type('null | null').or(SnowflakeTypeSchema).describe("id of the avatar decoration's SKU"),
})

export type UserAvatarDecorationResponse = typeof UserAvatarDecorationResponseSchema.infer

export const NameplatePaletteSchema = type(
  type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(type("'crimson'").describe('Crimson color palette')).or(
                      type("'berry'").describe('Berry color palette'),
                    ),
                  ).or(type("'sky'").describe('Sky color palette')),
                ).or(type("'teal'").describe('Teal color palette')),
              ).or(type("'forest'").describe('Forest color palette')),
            ).or(type("'bubble_gum'").describe('Bubble gum color palette')),
          ).or(type("'violet'").describe('Violet color palette')),
        ).or(type("'cobalt'").describe('Cobalt color palette')),
      ).or(type("'clover'").describe('Clover color palette')),
    ).or(type("'lemon'").describe('Lemon color palette')),
  ).or(type("'white'").describe('White color palette')),
).or(type("'black'").describe('Black color palette'))

export type NameplatePalette = typeof NameplatePaletteSchema.infer

export const UserNameplateResponseSchema = type({
  sku_id: type('null | null').or(SnowflakeTypeSchema).describe('ID of the nameplate SKU'),
  asset: type('string').describe('Path to the nameplate asset'),
  label: type('string').describe('The label of this nameplate. Currently unused'),
  palette: NameplatePaletteSchema.describe('Background color of the nameplate'),
})

export type UserNameplateResponse = typeof UserNameplateResponseSchema.infer

export const UserCollectiblesResponseSchema = type({
  nameplate: type('null | null')
    .or(UserNameplateResponseSchema)
    .describe('Object mapping of nameplate data'),
})

export type UserCollectiblesResponse = typeof UserCollectiblesResponseSchema.infer

export const UserPrimaryGuildResponseSchema = type({
  identity_guild_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe("the id of the user's primary guild"),
  identity_enabled: type('boolean | null').describe(
    "whether the user is displaying the primary guild's server tag",
  ),
  tag: type('string | null').describe("the text of the user's server tag, limited to 4 characters"),
  badge: type('string | null').describe('the server tag badge hash'),
})

export type UserPrimaryGuildResponse = typeof UserPrimaryGuildResponseSchema.infer

export const UserResponseSchema = type({
  id: SnowflakeTypeSchema.describe("the user's id"),
  username: type('string').describe("the user's username, not unique across the platform"),
  avatar: type('string | null').describe("the user's avatar hash"),
  discriminator: type('string').describe("the user's Discord-tag"),
  public_flags: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    "the public flags on a user's account",
  ),
  flags: Int53TypeSchema.describe("the flags on a user's account"),
  'bot?': type('boolean').describe('whether the user belongs to an OAuth2 application'),
  'system?': type('boolean').describe(
    'whether the user is an Official Discord System user (part of the urgent message system)',
  ),
  'banner?': type('string | null').describe("the user's banner hash"),
  'accent_color?': type(
    'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  ).describe(
    "the user's banner color encoded as an integer representation of hexadecimal color code",
  ),
  global_name: type('string | null').describe("the user's display name, if it is set"),
  'avatar_decoration_data?': type('null | null')
    .or(UserAvatarDecorationResponseSchema)
    .describe("data for the user's avatar decoration"),
  'collectibles?': type('null | null')
    .or(UserCollectiblesResponseSchema)
    .describe("data for the user's collectibles"),
  primary_guild: type('null | null')
    .or(UserPrimaryGuildResponseSchema)
    .describe("the user's primary guild"),
})

export type UserResponse = typeof UserResponseSchema.infer

export const OAuth2ScopesSchema = type(
  type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(
                            type(
                              type(
                                type(
                                  type(
                                    type(
                                      type(
                                        type(
                                          type(
                                            type(
                                              type(
                                                type(
                                                  type(
                                                    type(
                                                      type(
                                                        type(
                                                          type(
                                                            type(
                                                              type(
                                                                type(
                                                                  type("'identify'").describe(
                                                                    'allows /users/@me without email',
                                                                  ),
                                                                ).or(
                                                                  type("'email'").describe(
                                                                    'enables /users/@me to return an email',
                                                                  ),
                                                                ),
                                                              ).or(
                                                                type("'connections'").describe(
                                                                  'allows /users/@me/connections to return linked third-party accounts',
                                                                ),
                                                              ),
                                                            ).or(
                                                              type("'guilds'").describe(
                                                                "allows /users/@me/guilds to return basic information about all of a user's guilds",
                                                              ),
                                                            ),
                                                          ).or(
                                                            type("'guilds.join'").describe(
                                                              'allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild',
                                                            ),
                                                          ),
                                                        ).or(
                                                          type("'guilds.members.read'").describe(
                                                            "allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild",
                                                          ),
                                                        ),
                                                      ).or(
                                                        type("'gdm.join'").describe(
                                                          'allows your app to join users to a group dm',
                                                        ),
                                                      ),
                                                    ).or(
                                                      type("'bot'").describe(
                                                        "for oauth2 bots, this puts the bot in the user's selected guild by default",
                                                      ),
                                                    ),
                                                  ).or(
                                                    type("'rpc'").describe(
                                                      "for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval",
                                                    ),
                                                  ),
                                                ).or(
                                                  type("'rpc.notifications.read'").describe(
                                                    'for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval',
                                                  ),
                                                ),
                                              ).or(
                                                type("'rpc.voice.read'").describe(
                                                  "for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval",
                                                ),
                                              ),
                                            ).or(
                                              type("'rpc.voice.write'").describe(
                                                "for local rpc server access, this allows you to update a user's voice settings - requires Discord approval",
                                              ),
                                            ),
                                          ).or(
                                            type("'rpc.video.read'").describe(
                                              "for local rpc server access, this allows you to read a user's video status - requires Discord approval",
                                            ),
                                          ),
                                        ).or(
                                          type("'rpc.video.write'").describe(
                                            "for local rpc server access, this allows you to update a user's video settings - requires Discord approval",
                                          ),
                                        ),
                                      ).or(
                                        type("'rpc.screenshare.read'").describe(
                                          "for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval",
                                        ),
                                      ),
                                    ).or(
                                      type("'rpc.screenshare.write'").describe(
                                        "for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval",
                                      ),
                                    ),
                                  ).or(
                                    type("'rpc.activities.write'").describe(
                                      "for local rpc server access, this allows you to update a user's activity - requires Discord approval",
                                    ),
                                  ),
                                ).or(
                                  type("'webhook.incoming'").describe(
                                    'this generates a webhook that is returned in the oauth token response for authorization code grants',
                                  ),
                                ),
                              ).or(
                                type("'messages.read'").describe(
                                  'for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)',
                                ),
                              ),
                            ).or(
                              type("'applications.builds.upload'").describe(
                                "allows your app to upload/update builds for a user's applications - requires Discord approval",
                              ),
                            ),
                          ).or(
                            type("'applications.builds.read'").describe(
                              "allows your app to read build data for a user's applications",
                            ),
                          ),
                        ).or(
                          type("'applications.commands'").describe(
                            'allows your app to use commands in a guild',
                          ),
                        ),
                      ).or(
                        type("'applications.commands.permissions.update'").describe(
                          'allows your app to update permissions for its commands in a guild a user has permissions to',
                        ),
                      ),
                    ).or(
                      type("'applications.commands.update'").describe(
                        'allows your app to update its commands using a Bearer token - client credentials grant only',
                      ),
                    ),
                  ).or(
                    type("'applications.store.update'").describe(
                      "allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications",
                    ),
                  ),
                ).or(
                  type("'applications.entitlements'").describe(
                    "allows your app to read entitlements for a user's applications",
                  ),
                ),
              ).or(
                type("'activities.read'").describe(
                  'allows your app to fetch data from a user\'s "Now Playing/Recently Played" list - requires Discord approval',
                ),
              ),
            ).or(
              type("'activities.write'").describe(
                "allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)",
              ),
            ),
          ).or(
            type("'activities.invites.write'").describe(
              'allows your app to send activity invites - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)',
            ),
          ),
        ).or(
          type("'relationships.read'").describe(
            "allows your app to know a user's friends and implicit relationships - requires Discord approval",
          ),
        ),
      ).or(
        type("'voice'").describe(
          "allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval",
        ),
      ),
    ).or(
      type("'dm_channels.read'").describe(
        "allows your app to see information about the user's DMs and group DMs - requires Discord approval",
      ),
    ),
  ).or(
    type("'role_connections.write'").describe(
      "allows your app to update a user's connection and metadata for the app",
    ),
  ),
).or(
  type("'openid'").describe(
    'for OpenID Connect, this allows your app to receive user id and basic profile information',
  ),
)

export type OAuth2Scopes = typeof OAuth2ScopesSchema.infer

export const ApplicationOAuth2InstallParamsResponseSchema = type({
  scopes: type(OAuth2ScopesSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  permissions: 'string',
})

export type ApplicationOAuth2InstallParamsResponse =
  typeof ApplicationOAuth2InstallParamsResponseSchema.infer

export const ApplicationIntegrationTypeConfigurationResponseSchema = type({
  'oauth2_install_params?': ApplicationOAuth2InstallParamsResponseSchema,
})

export type ApplicationIntegrationTypeConfigurationResponse =
  typeof ApplicationIntegrationTypeConfigurationResponseSchema.infer

export const ApplicationResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  icon: 'string | null',
  description: 'string',
  type: type('null | null').or(ApplicationTypesSchema),
  'cover_image?': 'string',
  'primary_sku_id?': SnowflakeTypeSchema,
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  flags_new: 'string',
  'bot?': UserResponseSchema,
  'slug?': 'string',
  'conjure_project_id?': SnowflakeTypeSchema,
  'vibegrations_project_id?': SnowflakeTypeSchema,
  'guild_id?': SnowflakeTypeSchema,
  'rpc_origins?': 'string[]',
  'bot_public?': 'boolean',
  'bot_require_code_grant?': 'boolean',
  'terms_of_service_url?': 'string.url',
  'privacy_policy_url?': 'string.url',
  'custom_install_url?': 'string.url',
  'install_params?': ApplicationOAuth2InstallParamsResponseSchema,
  'integration_types_config?': type({
    '[string]': ApplicationIntegrationTypeConfigurationResponseSchema,
  }),
  verify_key: 'string',
  'max_participants?': 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  'tags?': type('string[]').narrow((data: unknown[], ctx) => new Set(data).size === data.length),
})

export type ApplicationResponse = typeof ApplicationResponseSchema.infer

export const AttachmentResponseSchema = type({
  id: SnowflakeTypeSchema,
  filename: 'string',
  size: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  url: 'string.url',
  proxy_url: 'string.url',
  'width?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'height?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'duration_secs?': 'number',
  'waveform?': 'string',
  'description?': 'string',
  'content_type?': 'string',
  'ephemeral?': 'boolean',
  'flags?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'placeholder?': 'string',
  'placeholder_version?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'title?': 'string | null',
  'application?': ApplicationResponseSchema,
  'clip_created_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  'clip_participants?': type(UserResponseSchema).array(),
})

export type AttachmentResponse = typeof AttachmentResponseSchema.infer

export const ActivitiesAttachmentResponseSchema = type({ attachment: AttachmentResponseSchema })

export type ActivitiesAttachmentResponse = typeof ActivitiesAttachmentResponseSchema.infer

export const ActivityActionTypesSchema = type('1 | 2 | 3 | 5 | 6')

export type ActivityActionTypes = typeof ActivityActionTypesSchema.infer

export const ActivityInstanceCallbackResponseSchema = type({ id: 'string' })

export type ActivityInstanceCallbackResponse = typeof ActivityInstanceCallbackResponseSchema.infer

export const AfkTimeoutsSchema = type('60 | 300 | 900 | 1800 | 3600')

export type AfkTimeouts = typeof AfkTimeoutsSchema.infer

export const AllowedMentionTypesSchema = type(
  type(type("'users'").describe('Controls role mentions')).or(
    type("'roles'").describe('Controls user mentions'),
  ),
).or(type("'everyone'").describe('Controls @everyone and @here mentions'))

export type AllowedMentionTypes = typeof AllowedMentionTypesSchema.infer

export const ApplicationCommandOptionTypeSchema = type(
  type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(type('1').describe('A sub-action within a command or group')).or(
                    type('2').describe('A group of subcommands'),
                  ),
                ).or(type('3').describe('A string option')),
              ).or(
                type('4').describe(
                  'An integer option. Any integer between -2^53 and 2^53 is a valid value',
                ),
              ),
            ).or(type('5').describe('A boolean option')),
          ).or(type('6').describe('A snowflake option that represents a User')),
        ).or(
          type('7').describe(
            'A snowflake option that represents a Channel. Includes all channel types and categories',
          ),
        ),
      ).or(type('8').describe('A snowflake option that represents a Role')),
    ).or(type('9').describe('A snowflake option that represents anything you can mention')),
  ).or(type('10').describe('A number option. Any double between -2^53 and 2^53 is a valid value')),
).or(type('11').describe('An attachment option'))

export type ApplicationCommandOptionType = typeof ApplicationCommandOptionTypeSchema.infer

export const ApplicationCommandAttachmentOptionSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'required?': 'boolean | null',
  'file_types?': type(
    type(
      type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 16 || ctx.mustBe('at most 16 characters')),
      ).array(),
    )
      .and(type('unknown[] <= 10'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
})

export type ApplicationCommandAttachmentOption =
  typeof ApplicationCommandAttachmentOptionSchema.infer

export const ApplicationCommandAttachmentOptionResponseSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localized?': 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
  'required?': 'boolean',
  'file_types?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 16 || ctx.mustBe('at most 16 characters'),
    ),
  )
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
})

export type ApplicationCommandAttachmentOptionResponse =
  typeof ApplicationCommandAttachmentOptionResponseSchema.infer

export const InteractionCallbackTypesSchema = type('1 | 4 | 5 | 6 | 7 | 8 | 9 | 12 | 13')

export type InteractionCallbackTypes = typeof InteractionCallbackTypesSchema.infer

export const ApplicationCommandOptionIntegerChoiceSchema = type({
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  value: Int53TypeSchema,
})

export type ApplicationCommandOptionIntegerChoice =
  typeof ApplicationCommandOptionIntegerChoiceSchema.infer

export const InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema = type({
  'choices?': type(
    type(type(type('null | null').or(ApplicationCommandOptionIntegerChoiceSchema)).array()).and(
      type('unknown[] <= 25'),
    ),
  ).or('null'),
})

export type InteractionApplicationCommandAutocompleteCallbackIntegerData =
  typeof InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema.infer

export const ApplicationCommandOptionNumberChoiceSchema = type({
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  value: 'number',
})

export type ApplicationCommandOptionNumberChoice =
  typeof ApplicationCommandOptionNumberChoiceSchema.infer

export const InteractionApplicationCommandAutocompleteCallbackNumberDataSchema = type({
  'choices?': type(
    type(type(type('null | null').or(ApplicationCommandOptionNumberChoiceSchema)).array()).and(
      type('unknown[] <= 25'),
    ),
  ).or('null'),
})

export type InteractionApplicationCommandAutocompleteCallbackNumberData =
  typeof InteractionApplicationCommandAutocompleteCallbackNumberDataSchema.infer

export const ApplicationCommandOptionStringChoiceSchema = type({
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  value: type('string').narrow(
    (data, ctx) => [...data].length <= 6000 || ctx.mustBe('at most 6000 characters'),
  ),
})

export type ApplicationCommandOptionStringChoice =
  typeof ApplicationCommandOptionStringChoiceSchema.infer

export const InteractionApplicationCommandAutocompleteCallbackStringDataSchema = type({
  'choices?': type(
    type(type(type('null | null').or(ApplicationCommandOptionStringChoiceSchema)).array()).and(
      type('unknown[] <= 25'),
    ),
  ).or('null'),
})

export type InteractionApplicationCommandAutocompleteCallbackStringData =
  typeof InteractionApplicationCommandAutocompleteCallbackStringDataSchema.infer

export const ApplicationCommandAutocompleteCallbackRequestSchema = type({
  type: InteractionCallbackTypesSchema,
  data: type(
    type(InteractionApplicationCommandAutocompleteCallbackIntegerDataSchema).or(
      InteractionApplicationCommandAutocompleteCallbackNumberDataSchema,
    ),
  ).or(InteractionApplicationCommandAutocompleteCallbackStringDataSchema),
})

export type ApplicationCommandAutocompleteCallbackRequest =
  typeof ApplicationCommandAutocompleteCallbackRequestSchema.infer

export const ApplicationCommandBooleanOptionSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'required?': 'boolean | null',
})

export type ApplicationCommandBooleanOption = typeof ApplicationCommandBooleanOptionSchema.infer

export const ApplicationCommandBooleanOptionResponseSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localized?': 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
  'required?': 'boolean',
})

export type ApplicationCommandBooleanOptionResponse =
  typeof ApplicationCommandBooleanOptionResponseSchema.infer

export const ApplicationCommandChannelOptionSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'required?': 'boolean | null',
  'channel_types?': type(
    type(ChannelTypesSchema)
      .array()
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
})

export type ApplicationCommandChannelOption = typeof ApplicationCommandChannelOptionSchema.infer

export const ApplicationCommandChannelOptionResponseSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localized?': 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
  'required?': 'boolean',
  'channel_types?': type(ChannelTypesSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
})

export type ApplicationCommandChannelOptionResponse =
  typeof ApplicationCommandChannelOptionResponseSchema.infer

export const ApplicationCommandIntegerOptionSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'required?': 'boolean | null',
  'autocomplete?': 'boolean | null',
  'choices?': type(
    type(type(ApplicationCommandOptionIntegerChoiceSchema).array()).and(type('unknown[] <= 25')),
  ).or('null'),
  'min_value?': type('null | null').or(Int53TypeSchema),
  'max_value?': type('null | null').or(Int53TypeSchema),
})

export type ApplicationCommandIntegerOption = typeof ApplicationCommandIntegerOptionSchema.infer

export const ApplicationCommandMentionableOptionSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'required?': 'boolean | null',
})

export type ApplicationCommandMentionableOption =
  typeof ApplicationCommandMentionableOptionSchema.infer

export const ApplicationCommandNumberOptionSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'required?': 'boolean | null',
  'autocomplete?': 'boolean | null',
  'choices?': type(
    type(type(ApplicationCommandOptionNumberChoiceSchema).array()).and(type('unknown[] <= 25')),
  ).or('null'),
  'min_value?': 'number | null',
  'max_value?': 'number | null',
})

export type ApplicationCommandNumberOption = typeof ApplicationCommandNumberOptionSchema.infer

export const ApplicationCommandRoleOptionSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'required?': 'boolean | null',
})

export type ApplicationCommandRoleOption = typeof ApplicationCommandRoleOptionSchema.infer

export const ApplicationCommandStringOptionSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'required?': 'boolean | null',
  'autocomplete?': 'boolean | null',
  'min_length?': 'number.integer >= 0 & number.integer <= 6000 | null',
  'max_length?': 'number.integer >= 1 & number.integer <= 6000 | null',
  'choices?': type(
    type(type(ApplicationCommandOptionStringChoiceSchema).array()).and(type('unknown[] <= 25')),
  ).or('null'),
})

export type ApplicationCommandStringOption = typeof ApplicationCommandStringOptionSchema.infer

export const ApplicationCommandUserOptionSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'required?': 'boolean | null',
})

export type ApplicationCommandUserOption = typeof ApplicationCommandUserOptionSchema.infer

export const ApplicationCommandSubcommandOptionSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'required?': 'boolean | null',
  'options?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(ApplicationCommandAttachmentOptionSchema).or(
                        ApplicationCommandBooleanOptionSchema,
                      ),
                    ).or(ApplicationCommandChannelOptionSchema),
                  ).or(ApplicationCommandIntegerOptionSchema),
                ).or(ApplicationCommandMentionableOptionSchema),
              ).or(ApplicationCommandNumberOptionSchema),
            ).or(ApplicationCommandRoleOptionSchema),
          ).or(ApplicationCommandStringOptionSchema),
        ).or(ApplicationCommandUserOptionSchema),
      ).array(),
    ).and(type('unknown[] <= 25')),
  ).or('null'),
})

export type ApplicationCommandSubcommandOption =
  typeof ApplicationCommandSubcommandOptionSchema.infer

export const ApplicationCommandSubcommandGroupOptionSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'required?': 'boolean | null',
  'options?': type(
    type(type(ApplicationCommandSubcommandOptionSchema).array()).and(type('unknown[] <= 25')),
  ).or('null'),
})

export type ApplicationCommandSubcommandGroupOption =
  typeof ApplicationCommandSubcommandGroupOptionSchema.infer

export const InteractionContextTypeSchema = type(
  type(type('0').describe('This command can be used within a Guild.')).or(
    type('1').describe("This command can be used within a DM with this application's bot."),
  ),
).or(type('2').describe('This command can be used within DMs and Group DMs with users.'))

export type InteractionContextType = typeof InteractionContextTypeSchema.infer

export const ApplicationIntegrationTypeSchema = type(type('0').describe('For Guild install.')).or(
  type('1').describe('For User install.'),
)

export type ApplicationIntegrationType = typeof ApplicationIntegrationTypeSchema.infer

export const ApplicationCommandHandlerSchema = type(
  type('1').describe('The app handles the interaction using an interaction token'),
).or(
  type('2').describe(
    'Discord handles the interaction by launching an Activity and sending a follow-up message without coordinating with the app',
  ),
)

export type ApplicationCommandHandler = typeof ApplicationCommandHandlerSchema.infer

export const ApplicationCommandTypeSchema = type(
  type(
    type(
      type('1').describe('Slash commands; a text-based command that shows up when a user types /'),
    ).or(
      type('2').describe('A UI-based command that shows up when you right click or tap on a user'),
    ),
  ).or(
    type('3').describe('A UI-based command that shows up when you right click or tap on a message'),
  ),
).or(
  type('4').describe(
    'A command that represents the primary way to use an application (e.g. launching an Activity)',
  ),
)

export type ApplicationCommandType = typeof ApplicationCommandTypeSchema.infer

export const ApplicationCommandCreateRequestSchema = type({
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'options?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(ApplicationCommandAttachmentOptionSchema).or(
                            ApplicationCommandBooleanOptionSchema,
                          ),
                        ).or(ApplicationCommandChannelOptionSchema),
                      ).or(ApplicationCommandIntegerOptionSchema),
                    ).or(ApplicationCommandMentionableOptionSchema),
                  ).or(ApplicationCommandNumberOptionSchema),
                ).or(ApplicationCommandRoleOptionSchema),
              ).or(ApplicationCommandStringOptionSchema),
            ).or(ApplicationCommandSubcommandGroupOptionSchema),
          ).or(ApplicationCommandSubcommandOptionSchema),
        ).or(ApplicationCommandUserOptionSchema),
      ).array(),
    ).and(type('unknown[] <= 25')),
  ).or('null'),
  'default_member_permissions?': 'number.integer >= 0 & number.integer <= 18014398509481984 | null',
  'dm_permission?': 'boolean | null',
  'contexts?': type(
    type(type(InteractionContextTypeSchema).array())
      .and(type('unknown[] >= 1'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'integration_types?': type(
    type(type(ApplicationIntegrationTypeSchema).array())
      .and(type('unknown[] >= 1'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'handler?': type('null | null')
    .or(ApplicationCommandHandlerSchema)
    .describe(
      "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    ),
  'type?': type('null | null').or(ApplicationCommandTypeSchema),
})

export type ApplicationCommandCreateRequest = typeof ApplicationCommandCreateRequestSchema.infer

export const ApplicationCommandOptionIntegerChoiceResponseSchema = type({
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  value: Int53TypeSchema,
})

export type ApplicationCommandOptionIntegerChoiceResponse =
  typeof ApplicationCommandOptionIntegerChoiceResponseSchema.infer

export const ApplicationCommandIntegerOptionResponseSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localized?': 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
  'required?': 'boolean',
  'autocomplete?': 'boolean',
  'choices?': type(ApplicationCommandOptionIntegerChoiceResponseSchema).array(),
  'min_value?': Int53TypeSchema,
  'max_value?': Int53TypeSchema,
})

export type ApplicationCommandIntegerOptionResponse =
  typeof ApplicationCommandIntegerOptionResponseSchema.infer

export const InteractionTypesSchema = type(
  type(
    type(
      type(
        type(
          type('1').describe("Sent by Discord to validate your application's interaction handler"),
        ).or(type('2').describe('Sent when a user uses an application command')),
      ).or(
        type('3').describe(
          'Sent when a user interacts with a message component previously sent by your application',
        ),
      ),
    ).or(
      type('4').describe('Sent when a user is filling in an autocomplete option in a chat command'),
    ),
  ).or(type('5').describe('Sent when a user submits a modal previously sent by your application')),
).or(type('6').describe('Sent when Discord is checking if a user can purchase a Social Layer SKU'))

export type InteractionTypes = typeof InteractionTypesSchema.infer

export const ApplicationCommandInteractionMetadataResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  'user?': UserResponseSchema,
  authorizing_integration_owners: type({ '[string]': SnowflakeTypeSchema }),
  'original_response_message_id?': SnowflakeTypeSchema,
  'target_user?': UserResponseSchema,
  'target_message_id?': SnowflakeTypeSchema,
})

export type ApplicationCommandInteractionMetadataResponse =
  typeof ApplicationCommandInteractionMetadataResponseSchema.infer

export const ApplicationCommandMentionableOptionResponseSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localized?': 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
  'required?': 'boolean',
})

export type ApplicationCommandMentionableOptionResponse =
  typeof ApplicationCommandMentionableOptionResponseSchema.infer

export const ApplicationCommandOptionNumberChoiceResponseSchema = type({
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  value: 'number',
})

export type ApplicationCommandOptionNumberChoiceResponse =
  typeof ApplicationCommandOptionNumberChoiceResponseSchema.infer

export const ApplicationCommandNumberOptionResponseSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localized?': 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
  'required?': 'boolean',
  'autocomplete?': 'boolean',
  'choices?': type(ApplicationCommandOptionNumberChoiceResponseSchema).array(),
  'min_value?': 'number',
  'max_value?': 'number',
})

export type ApplicationCommandNumberOptionResponse =
  typeof ApplicationCommandNumberOptionResponseSchema.infer

export const ApplicationCommandOptionStringChoiceResponseSchema = type({
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  value: 'string',
})

export type ApplicationCommandOptionStringChoiceResponse =
  typeof ApplicationCommandOptionStringChoiceResponseSchema.infer

export const ApplicationCommandPatchRequestPartialSchema = type({
  'name?': type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'options?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(ApplicationCommandAttachmentOptionSchema).or(
                            ApplicationCommandBooleanOptionSchema,
                          ),
                        ).or(ApplicationCommandChannelOptionSchema),
                      ).or(ApplicationCommandIntegerOptionSchema),
                    ).or(ApplicationCommandMentionableOptionSchema),
                  ).or(ApplicationCommandNumberOptionSchema),
                ).or(ApplicationCommandRoleOptionSchema),
              ).or(ApplicationCommandStringOptionSchema),
            ).or(ApplicationCommandSubcommandGroupOptionSchema),
          ).or(ApplicationCommandSubcommandOptionSchema),
        ).or(ApplicationCommandUserOptionSchema),
      ).array(),
    ).and(type('unknown[] <= 25')),
  ).or('null'),
  'default_member_permissions?': 'number.integer >= 0 & number.integer <= 18014398509481984 | null',
  'dm_permission?': 'boolean | null',
  'contexts?': type(
    type(type(InteractionContextTypeSchema).array())
      .and(type('unknown[] >= 1'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'integration_types?': type(
    type(type(ApplicationIntegrationTypeSchema).array())
      .and(type('unknown[] >= 1'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'handler?': type('null | null')
    .or(ApplicationCommandHandlerSchema)
    .describe(
      "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    ),
})

export type ApplicationCommandPatchRequestPartial =
  typeof ApplicationCommandPatchRequestPartialSchema.infer

export const ApplicationCommandPermissionTypeSchema = type(
  type(type('1').describe('This permission is for a role.')).or(
    type('2').describe('This permission is for a user.'),
  ),
).or(type('3').describe('This permission is for a channel.'))

export type ApplicationCommandPermissionType = typeof ApplicationCommandPermissionTypeSchema.infer

export const ApplicationCommandPermissionSchema = type({
  id: SnowflakeTypeSchema,
  type: ApplicationCommandPermissionTypeSchema,
  permission: 'boolean',
})

export type ApplicationCommandPermission = typeof ApplicationCommandPermissionSchema.infer

export const ApplicationCommandRoleOptionResponseSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localized?': 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
  'required?': 'boolean',
})

export type ApplicationCommandRoleOptionResponse =
  typeof ApplicationCommandRoleOptionResponseSchema.infer

export const ApplicationCommandStringOptionResponseSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localized?': 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
  'required?': 'boolean',
  'autocomplete?': 'boolean',
  'choices?': type(ApplicationCommandOptionStringChoiceResponseSchema).array(),
  'min_length?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'max_length?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type ApplicationCommandStringOptionResponse =
  typeof ApplicationCommandStringOptionResponseSchema.infer

export const ApplicationCommandUserOptionResponseSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localized?': 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
  'required?': 'boolean',
})

export type ApplicationCommandUserOptionResponse =
  typeof ApplicationCommandUserOptionResponseSchema.infer

export const ApplicationCommandSubcommandOptionResponseSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localized?': 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
  'required?': 'boolean',
  'options?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(ApplicationCommandAttachmentOptionResponseSchema).or(
                    ApplicationCommandBooleanOptionResponseSchema,
                  ),
                ).or(ApplicationCommandChannelOptionResponseSchema),
              ).or(ApplicationCommandIntegerOptionResponseSchema),
            ).or(ApplicationCommandMentionableOptionResponseSchema),
          ).or(ApplicationCommandNumberOptionResponseSchema),
        ).or(ApplicationCommandRoleOptionResponseSchema),
      ).or(ApplicationCommandStringOptionResponseSchema),
    ).or(ApplicationCommandUserOptionResponseSchema),
  ).array(),
})

export type ApplicationCommandSubcommandOptionResponse =
  typeof ApplicationCommandSubcommandOptionResponseSchema.infer

export const ApplicationCommandSubcommandGroupOptionResponseSchema = type({
  type: ApplicationCommandOptionTypeSchema,
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localized?': 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
  'required?': 'boolean',
  'options?': type(ApplicationCommandSubcommandOptionResponseSchema).array(),
})

export type ApplicationCommandSubcommandGroupOptionResponse =
  typeof ApplicationCommandSubcommandGroupOptionResponseSchema.infer

export const ApplicationCommandResponseSchema = type({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  version: SnowflakeTypeSchema,
  default_member_permissions: 'string | null',
  type: ApplicationCommandTypeSchema,
  name: 'string',
  'name_localized?': 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localized?': 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
  'guild_id?': SnowflakeTypeSchema,
  'dm_permission?': 'boolean',
  'contexts?': type(
    type(InteractionContextTypeSchema)
      .array()
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'integration_types?': type(ApplicationIntegrationTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  'options?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(ApplicationCommandAttachmentOptionResponseSchema).or(
                        ApplicationCommandBooleanOptionResponseSchema,
                      ),
                    ).or(ApplicationCommandChannelOptionResponseSchema),
                  ).or(ApplicationCommandIntegerOptionResponseSchema),
                ).or(ApplicationCommandMentionableOptionResponseSchema),
              ).or(ApplicationCommandNumberOptionResponseSchema),
            ).or(ApplicationCommandRoleOptionResponseSchema),
          ).or(ApplicationCommandStringOptionResponseSchema),
        ).or(ApplicationCommandSubcommandGroupOptionResponseSchema),
      ).or(ApplicationCommandSubcommandOptionResponseSchema),
    ).or(ApplicationCommandUserOptionResponseSchema),
  ).array(),
  'nsfw?': 'boolean',
  'handler?': ApplicationCommandHandlerSchema.describe(
    "Determines whether the interaction is handled by the app's interactions handler or by Discord",
  ),
})

export type ApplicationCommandResponse = typeof ApplicationCommandResponseSchema.infer

export const ApplicationCommandUpdateRequestSchema = type({
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'name_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
    }),
  ).or('null'),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
  'description_localizations?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
  'options?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(ApplicationCommandAttachmentOptionSchema).or(
                            ApplicationCommandBooleanOptionSchema,
                          ),
                        ).or(ApplicationCommandChannelOptionSchema),
                      ).or(ApplicationCommandIntegerOptionSchema),
                    ).or(ApplicationCommandMentionableOptionSchema),
                  ).or(ApplicationCommandNumberOptionSchema),
                ).or(ApplicationCommandRoleOptionSchema),
              ).or(ApplicationCommandStringOptionSchema),
            ).or(ApplicationCommandSubcommandGroupOptionSchema),
          ).or(ApplicationCommandSubcommandOptionSchema),
        ).or(ApplicationCommandUserOptionSchema),
      ).array(),
    ).and(type('unknown[] <= 25')),
  ).or('null'),
  'default_member_permissions?': 'number.integer >= 0 & number.integer <= 18014398509481984 | null',
  'dm_permission?': 'boolean | null',
  'contexts?': type(
    type(type(InteractionContextTypeSchema).array())
      .and(type('unknown[] >= 1'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'integration_types?': type(
    type(type(ApplicationIntegrationTypeSchema).array())
      .and(type('unknown[] >= 1'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'handler?': type('null | null')
    .or(ApplicationCommandHandlerSchema)
    .describe(
      "Determines whether the interaction is handled by the app's interactions handler or by Discord",
    ),
  'type?': type('null | null').or(ApplicationCommandTypeSchema),
  'id?': type('null | null').or(SnowflakeTypeSchema),
})

export type ApplicationCommandUpdateRequest = typeof ApplicationCommandUpdateRequestSchema.infer

export const ApplicationEventWebhooksStatusSchema = type(
  type(type('1').describe('Webhook events are disabled by developer')).or(
    type('2').describe('Webhook events are enabled by developer'),
  ),
).or(type('3').describe('Webhook events are disabled by Discord, usually due to inactivity'))

export type ApplicationEventWebhooksStatus = typeof ApplicationEventWebhooksStatusSchema.infer

export const ApplicationExplicitContentFilterTypesSchema = type(
  type('0').describe('inherit guild content filter setting'),
).or(type('1').describe('interactions will always be scanned'))

export type ApplicationExplicitContentFilterTypes =
  typeof ApplicationExplicitContentFilterTypesSchema.infer

export const ApplicationOAuth2InstallParamsSchema = type({
  'scopes?': type(
    type(type(OAuth2ScopesSchema).array())
      .and(type('unknown[] >= 1'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'permissions?': 'number.integer >= 0 & number.integer <= 18014398509481984 | null',
})

export type ApplicationOAuth2InstallParams = typeof ApplicationOAuth2InstallParamsSchema.infer

export const ApplicationIntegrationTypeConfigurationSchema = type({
  'oauth2_install_params?': type('null | null').or(ApplicationOAuth2InstallParamsSchema),
})

export type ApplicationIntegrationTypeConfiguration =
  typeof ApplicationIntegrationTypeConfigurationSchema.infer

export const ApplicationFormPartialSchema = type({
  'description?': type(
    type({
      default: type('string').narrow(
        (data, ctx) => [...data].length <= 400 || ctx.mustBe('at most 400 characters'),
      ),
      'localizations?': type(
        type({
          '[string]': type('string').narrow(
            (data, ctx) => [...data].length <= 400 || ctx.mustBe('at most 400 characters'),
          ),
        }),
      ).or('null'),
    }),
  ).or('null'),
  'icon?': 'string | null',
  'cover_image?': 'string | null',
  'team_id?': type('null | null').or(SnowflakeTypeSchema),
  'flags?': 'number.integer | null',
  'interactions_endpoint_url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'explicit_content_filter?': type('null | null').or(ApplicationExplicitContentFilterTypesSchema),
  'max_participants?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= -1 | null',
  'type?': type('null | null').or(ApplicationTypesSchema),
  'tags?': type(
    type(
      type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 20 || ctx.mustBe('at most 20 characters'),
        ),
      ).array(),
    )
      .and(type('unknown[] <= 5'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'custom_install_url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'install_params?': type('null | null').or(ApplicationOAuth2InstallParamsSchema),
  'role_connections_verification_url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'integration_types_config?': type(
    type({ '[string]': type('null | null').or(ApplicationIntegrationTypeConfigurationSchema) }),
  ).or('null'),
  'event_webhooks_status?': type('null | null').or(ApplicationEventWebhooksStatusSchema),
  'event_webhooks_url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  )
    .or('null')
    .describe('Event webhooks URL for the app to receive webhook events'),
  'event_webhooks_types?': type(
    type(ActionTypesSchema)
      .array()
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
})

export type ApplicationFormPartial = typeof ApplicationFormPartialSchema.infer

export const ApplicationIdentityProviderAuthTypeSchema = type(
  "'OIDC' | 'EPIC_ONLINE_SERVICES_ACCESS_TOKEN' | 'EPIC_ONLINE_SERVICES_ID_TOKEN' | 'STEAM_SESSION_TICKET' | 'UNITY_SERVICES_ID_TOKEN' | 'DISCORD_BOT_ISSUED_ACCESS_TOKEN' | 'APPLE_ID_TOKEN' | 'PLAYSTATION_NETWORK_ID_TOKEN'",
)

export type ApplicationIdentityProviderAuthType =
  typeof ApplicationIdentityProviderAuthTypeSchema.infer

export const WebhookTypesSchema = type(
  type(
    type('1').describe('Incoming Webhooks can post messages to channels with a generated token'),
  ).or(
    type('2').describe(
      'Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels',
    ),
  ),
).or(type('3').describe('Application webhooks are webhooks used with Interactions'))

export type WebhookTypes = typeof WebhookTypesSchema.infer

export const ApplicationIncomingWebhookResponseSchema = type({
  application_id: type('null | null').or(SnowflakeTypeSchema),
  avatar: 'string | null',
  channel_id: type('null | null').or(SnowflakeTypeSchema),
  'guild_id?': type('null | null').or(SnowflakeTypeSchema),
  id: SnowflakeTypeSchema,
  name: 'string',
  type: WebhookTypesSchema,
  'user?': UserResponseSchema,
})

export type ApplicationIncomingWebhookResponse =
  typeof ApplicationIncomingWebhookResponseSchema.infer

export const MetadataItemTypesSchema = type(
  type(
    type(
      type(
        type(
          type(
            type(
              type('1').describe(
                "the metadata value (integer) is less than or equal to the guild's configured value (integer)",
              ),
            ).or(
              type('2').describe(
                "the metadata value (integer) is greater than or equal to the guild's configured value (integer)",
              ),
            ),
          ).or(
            type('3').describe(
              "the metadata value (integer) is equal to the guild's configured value (integer)",
            ),
          ),
        ).or(
          type('4').describe(
            "the metadata value (integer) is not equal to the guild's configured value (integer)",
          ),
        ),
      ).or(
        type('5').describe(
          "the metadata value (ISO8601 string) is less than or equal to the guild's configured value (integer; days before current date)",
        ),
      ),
    ).or(
      type('6').describe(
        "the metadata value (ISO8601 string) is greater than or equal to the guild's configured value (integer; days before current date)",
      ),
    ),
  ).or(
    type('7').describe(
      "the metadata value (integer) is equal to the guild's configured value (integer; 1)",
    ),
  ),
).or(
  type('8').describe(
    "the metadata value (integer) is not equal to the guild's configured value (integer; 1)",
  ),
)

export type MetadataItemTypes = typeof MetadataItemTypesSchema.infer

export const ApplicationRoleConnectionsMetadataItemRequestSchema = type({
  type: MetadataItemTypesSchema,
  key: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 50 || ctx.mustBe('at most 50 characters')),
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'name_localizations?': type(
    type({
      '[string]': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
      ).or('null'),
    }),
  ).or('null'),
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 200 || ctx.mustBe('at most 200 characters')),
  'description_localizations?': type(
    type({
      '[string]': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 200 || ctx.mustBe('at most 200 characters')),
      ).or('null'),
    }),
  ).or('null'),
})

export type ApplicationRoleConnectionsMetadataItemRequest =
  typeof ApplicationRoleConnectionsMetadataItemRequestSchema.infer

export const ApplicationRoleConnectionsMetadataItemResponseSchema = type({
  type: MetadataItemTypesSchema,
  key: 'string',
  name: 'string',
  'name_localizations?': type(type({ '[string]': 'string' })).or('null'),
  description: 'string',
  'description_localizations?': type(type({ '[string]': 'string' })).or('null'),
})

export type ApplicationRoleConnectionsMetadataItemResponse =
  typeof ApplicationRoleConnectionsMetadataItemResponseSchema.infer

export const ApplicationUserRoleConnectionResponseSchema = type({
  'platform_name?': 'string',
  'platform_username?': 'string | null',
  'metadata?': type({ '[string]': 'string' }),
})

export type ApplicationUserRoleConnectionResponse =
  typeof ApplicationUserRoleConnectionResponseSchema.infer

export const AuditLogActionTypesSchema = type(
  type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(
                            type(
                              type(
                                type(
                                  type(
                                    type(
                                      type(
                                        type(
                                          type(
                                            type(
                                              type(
                                                type(
                                                  type(
                                                    type(
                                                      type(
                                                        type(
                                                          type(
                                                            type(
                                                              type(
                                                                type(
                                                                  type(
                                                                    type(
                                                                      type(
                                                                        type(
                                                                          type(
                                                                            type(
                                                                              type(
                                                                                type(
                                                                                  type(
                                                                                    type(
                                                                                      type(
                                                                                        type(
                                                                                          type(
                                                                                            type(
                                                                                              type(
                                                                                                type(
                                                                                                  type(
                                                                                                    type(
                                                                                                      type(
                                                                                                        type(
                                                                                                          type(
                                                                                                            type(
                                                                                                              type(
                                                                                                                type(
                                                                                                                  type(
                                                                                                                    type(
                                                                                                                      type(
                                                                                                                        type(
                                                                                                                          type(
                                                                                                                            type(
                                                                                                                              type(
                                                                                                                                type(
                                                                                                                                  type(
                                                                                                                                    type(
                                                                                                                                      type(
                                                                                                                                        type(
                                                                                                                                          type(
                                                                                                                                            type(
                                                                                                                                              type(
                                                                                                                                                type(
                                                                                                                                                  type(
                                                                                                                                                    type(
                                                                                                                                                      type(
                                                                                                                                                        type(
                                                                                                                                                          '1',
                                                                                                                                                        ).or(
                                                                                                                                                          '10',
                                                                                                                                                        ),
                                                                                                                                                      ).or(
                                                                                                                                                        '11',
                                                                                                                                                      ),
                                                                                                                                                    ).or(
                                                                                                                                                      '12',
                                                                                                                                                    ),
                                                                                                                                                  ).or(
                                                                                                                                                    '13',
                                                                                                                                                  ),
                                                                                                                                                ).or(
                                                                                                                                                  '14',
                                                                                                                                                ),
                                                                                                                                              ).or(
                                                                                                                                                '15',
                                                                                                                                              ),
                                                                                                                                            ).or(
                                                                                                                                              type(
                                                                                                                                                '16',
                                                                                                                                              ).describe(
                                                                                                                                                'Channels were reordered',
                                                                                                                                              ),
                                                                                                                                            ),
                                                                                                                                          ).or(
                                                                                                                                            '20',
                                                                                                                                          ),
                                                                                                                                        ).or(
                                                                                                                                          '21',
                                                                                                                                        ),
                                                                                                                                      ).or(
                                                                                                                                        '22',
                                                                                                                                      ),
                                                                                                                                    ).or(
                                                                                                                                      '23',
                                                                                                                                    ),
                                                                                                                                  ).or(
                                                                                                                                    '24',
                                                                                                                                  ),
                                                                                                                                ).or(
                                                                                                                                  '25',
                                                                                                                                ),
                                                                                                                              ).or(
                                                                                                                                '26',
                                                                                                                              ),
                                                                                                                            ).or(
                                                                                                                              '27',
                                                                                                                            ),
                                                                                                                          ).or(
                                                                                                                            '28',
                                                                                                                          ),
                                                                                                                        ).or(
                                                                                                                          '30',
                                                                                                                        ),
                                                                                                                      ).or(
                                                                                                                        '31',
                                                                                                                      ),
                                                                                                                    ).or(
                                                                                                                      '32',
                                                                                                                    ),
                                                                                                                  ).or(
                                                                                                                    type(
                                                                                                                      '33',
                                                                                                                    ).describe(
                                                                                                                      'Roles were reordered',
                                                                                                                    ),
                                                                                                                  ),
                                                                                                                ).or(
                                                                                                                  '40',
                                                                                                                ),
                                                                                                              ).or(
                                                                                                                '41',
                                                                                                              ),
                                                                                                            ).or(
                                                                                                              '42',
                                                                                                            ),
                                                                                                          ).or(
                                                                                                            '50',
                                                                                                          ),
                                                                                                        ).or(
                                                                                                          '51',
                                                                                                        ),
                                                                                                      ).or(
                                                                                                        '52',
                                                                                                      ),
                                                                                                    ).or(
                                                                                                      '60',
                                                                                                    ),
                                                                                                  ).or(
                                                                                                    '61',
                                                                                                  ),
                                                                                                ).or(
                                                                                                  '62',
                                                                                                ),
                                                                                              ).or(
                                                                                                '72',
                                                                                              ),
                                                                                            ).or(
                                                                                              '73',
                                                                                            ),
                                                                                          ).or(
                                                                                            '74',
                                                                                          ),
                                                                                        ).or('75'),
                                                                                      ).or('80'),
                                                                                    ).or('81'),
                                                                                  ).or('82'),
                                                                                ).or('83'),
                                                                              ).or('84'),
                                                                            ).or('85'),
                                                                          ).or('90'),
                                                                        ).or('91'),
                                                                      ).or('92'),
                                                                    ).or('100'),
                                                                  ).or('101'),
                                                                ).or('102'),
                                                              ).or('110'),
                                                            ).or('111'),
                                                          ).or('112'),
                                                        ).or('121'),
                                                      ).or('130'),
                                                    ).or('131'),
                                                  ).or('132'),
                                                ).or('140'),
                                              ).or('141'),
                                            ).or('142'),
                                          ).or('143'),
                                        ).or('144'),
                                      ).or('145'),
                                    ).or('146'),
                                  ).or('150'),
                                ).or('151'),
                              ).or('163'),
                            ).or('164'),
                          ).or('165'),
                        ).or('166'),
                      ).or('167'),
                    ).or('171'),
                  ).or('172'),
                ).or('180'),
              ).or('190'),
            ).or('191'),
          ).or('192'),
        ).or('193'),
      ).or(type('200').describe('Scheduled event exception was created')),
    ).or(type('201').describe('Scheduled event exception was updated')),
  ).or(type('202').describe('Scheduled event exception was deleted')),
).or('211')

export type AuditLogActionTypes = typeof AuditLogActionTypesSchema.infer

export const AuditLogObjectChangeResponseSchema = type({
  key: 'string | null',
  'new_value?': 'unknown',
  'old_value?': 'unknown',
})

export type AuditLogObjectChangeResponse = typeof AuditLogObjectChangeResponseSchema.infer

export const AuditLogEntryResponseSchema = type({
  id: SnowflakeTypeSchema,
  action_type: AuditLogActionTypesSchema,
  user_id: type('null | null').or(SnowflakeTypeSchema),
  target_id: type('null | null').or(SnowflakeTypeSchema),
  'changes?': type(AuditLogObjectChangeResponseSchema).array(),
  'options?': type({ '[string]': 'string' }),
  'reason?': 'string',
})

export type AuditLogEntryResponse = typeof AuditLogEntryResponseSchema.infer

export const AuthorTypeSchema = type("'user' | 'bot' | 'webhook' | '-user' | '-bot' | '-webhook'")

export type AuthorType = typeof AuthorTypeSchema.infer

export const AutomodActionTypeSchema = type(
  type(
    type(
      type('1').describe(
        "Block a user's message and prevent it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked",
      ),
    ).or(
      type('2').describe(
        'Send a system message to a channel in order to log the user message that triggered the rule',
      ),
    ),
  ).or(
    type('3').describe(
      "Temporarily disable a user's ability to communicate in the server (timeout)",
    ),
  ),
).or(type('4').describe('Prevent a user from interacting in the server'))

export type AutomodActionType = typeof AutomodActionTypeSchema.infer

export const AutomodEventTypeSchema = type(
  type('1').describe('A user submitted a message to a channel'),
).or(
  type('2').describe(
    "A user is attempting to join the server or a member's properties were updated.",
  ),
)

export type AutomodEventType = typeof AutomodEventTypeSchema.infer

export const AutomodKeywordPresetTypeSchema = type(
  type(type('1').describe('Words and phrases that may be considered profanity')).or(
    type('2').describe('Words and phrases that may be considered as sexual content'),
  ),
).or(type('3').describe('Words and phrases that may be considered slurs and hate speech'))

export type AutomodKeywordPresetType = typeof AutomodKeywordPresetTypeSchema.infer

export const AutomodTriggerTypeSchema = type(
  type(
    type(
      type(
        type('1').describe(
          'Check if content contains words from a list of keywords or matches regex',
        ),
      ).or(type('3').describe('Check if content represents generic spam')),
    ).or(type('4').describe('Check if content contains words from internal pre-defined wordsets')),
  ).or(type('5').describe('Check if content contains more unique mentions than allowed')),
).or(
  type('6').describe(
    'Check if user profile fields contains words from a list of keywords or matches regex',
  ),
)

export type AutomodTriggerType = typeof AutomodTriggerTypeSchema.infer

export const AvailableLocalesEnumSchema = type(
  type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(
                            type(
                              type(
                                type(
                                  type(
                                    type(
                                      type(
                                        type(
                                          type(
                                            type(
                                              type(
                                                type(
                                                  type(
                                                    type(
                                                      type(
                                                        type(
                                                          type(
                                                            type(
                                                              type(
                                                                type(
                                                                  type("'ar'").describe(
                                                                    'The ar locale',
                                                                  ),
                                                                ).or(
                                                                  type("'bg'").describe(
                                                                    'The bg locale',
                                                                  ),
                                                                ),
                                                              ).or(
                                                                type("'cs'").describe(
                                                                  'The cs locale',
                                                                ),
                                                              ),
                                                            ).or(
                                                              type("'da'").describe(
                                                                'The da locale',
                                                              ),
                                                            ),
                                                          ).or(
                                                            type("'de'").describe('The de locale'),
                                                          ),
                                                        ).or(
                                                          type("'el'").describe('The el locale'),
                                                        ),
                                                      ).or(
                                                        type("'en-GB'").describe(
                                                          'The en-GB locale',
                                                        ),
                                                      ),
                                                    ).or(
                                                      type("'en-US'").describe('The en-US locale'),
                                                    ),
                                                  ).or(
                                                    type("'es-419'").describe('The es-419 locale'),
                                                  ),
                                                ).or(type("'es-ES'").describe('The es-ES locale')),
                                              ).or(type("'fi'").describe('The fi locale')),
                                            ).or(type("'fr'").describe('The fr locale')),
                                          ).or(type("'he'").describe('The he locale')),
                                        ).or(type("'hi'").describe('The hi locale')),
                                      ).or(type("'hr'").describe('The hr locale')),
                                    ).or(type("'hu'").describe('The hu locale')),
                                  ).or(type("'id'").describe('The id locale')),
                                ).or(type("'it'").describe('The it locale')),
                              ).or(type("'ja'").describe('The ja locale')),
                            ).or(type("'ko'").describe('The ko locale')),
                          ).or(type("'lt'").describe('The lt locale')),
                        ).or(type("'nl'").describe('The nl locale')),
                      ).or(type("'no'").describe('The no locale')),
                    ).or(type("'pl'").describe('The pl locale')),
                  ).or(type("'pt-BR'").describe('The pt-BR locale')),
                ).or(type("'ro'").describe('The ro locale')),
              ).or(type("'ru'").describe('The ru locale')),
            ).or(type("'sv-SE'").describe('The sv-SE locale')),
          ).or(type("'th'").describe('The th locale')),
        ).or(type("'tr'").describe('The tr locale')),
      ).or(type("'uk'").describe('The uk locale')),
    ).or(type("'vi'").describe('The vi locale')),
  ).or(type("'zh-CN'").describe('The zh-CN locale')),
).or(type("'zh-TW'").describe('The zh-TW locale'))

export type AvailableLocalesEnum = typeof AvailableLocalesEnumSchema.infer

export const BanUserFromGuildRequestSchema = type({
  'delete_message_seconds?': 'number.integer >= 0 & number.integer <= 604800 | null',
  'delete_message_days?': 'number.integer >= 0 & number.integer <= 7 | null',
})

export type BanUserFromGuildRequest = typeof BanUserFromGuildRequestSchema.infer

export const RichEmbedAuthorSchema = type({
  'name?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
    ),
  ).or('null'),
  'url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'icon_url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
})

export type RichEmbedAuthor = typeof RichEmbedAuthorSchema.infer

export const RichEmbedImageSchema = type({
  'url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'width?': 'number.integer | null',
  'height?': 'number.integer | null',
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 64 || ctx.mustBe('at most 64 characters'),
    ),
  ).or('null'),
  'placeholder_version?': 'number.integer >= 0 & number.integer <= 2147483647 | null',
  'is_animated?': 'boolean | null',
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 4096 || ctx.mustBe('at most 4096 characters'),
    ),
  ).or('null'),
})

export type RichEmbedImage = typeof RichEmbedImageSchema.infer

export const RichEmbedThumbnailSchema = type({
  'url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'width?': 'number.integer | null',
  'height?': 'number.integer | null',
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 64 || ctx.mustBe('at most 64 characters'),
    ),
  ).or('null'),
  'placeholder_version?': 'number.integer >= 0 & number.integer <= 2147483647 | null',
  'is_animated?': 'boolean | null',
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 4096 || ctx.mustBe('at most 4096 characters'),
    ),
  ).or('null'),
})

export type RichEmbedThumbnail = typeof RichEmbedThumbnailSchema.infer

export const RichEmbedFooterSchema = type({
  'text?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'icon_url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
})

export type RichEmbedFooter = typeof RichEmbedFooterSchema.infer

export const RichEmbedFieldSchema = type({
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
  ),
  value: type('string').narrow(
    (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
  ),
  'inline?': 'boolean | null',
})

export type RichEmbedField = typeof RichEmbedFieldSchema.infer

export const RichEmbedProviderSchema = type({
  'name?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
    ),
  ).or('null'),
  'url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
})

export type RichEmbedProvider = typeof RichEmbedProviderSchema.infer

export const RichEmbedVideoSchema = type({
  'url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'width?': 'number.integer | null',
  'height?': 'number.integer | null',
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 64 || ctx.mustBe('at most 64 characters'),
    ),
  ).or('null'),
  'placeholder_version?': 'number.integer >= 0 & number.integer <= 2147483647 | null',
  'is_animated?': 'boolean | null',
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 4096 || ctx.mustBe('at most 4096 characters'),
    ),
  ).or('null'),
})

export type RichEmbedVideo = typeof RichEmbedVideoSchema.infer

export const RichEmbedAudioSchema = type({
  'url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 4096 || ctx.mustBe('at most 4096 characters'),
    ),
  ).or('null'),
})

export type RichEmbedAudio = typeof RichEmbedAudioSchema.infer

export const RichEmbedSchema = type({
  'type?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'title?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
    ),
  ).or('null'),
  'color?': 'number.integer >= 0 & number.integer <= 16777215 | null',
  'timestamp?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 4096 || ctx.mustBe('at most 4096 characters'),
    ),
  ).or('null'),
  'author?': type('null | null').or(RichEmbedAuthorSchema),
  'image?': type('null | null').or(RichEmbedImageSchema),
  'thumbnail?': type('null | null').or(RichEmbedThumbnailSchema),
  'footer?': type('null | null').or(RichEmbedFooterSchema),
  'fields?': type(type(type(RichEmbedFieldSchema).array()).and(type('unknown[] <= 25'))).or('null'),
  'provider?': type('null | null').or(RichEmbedProviderSchema),
  'video?': type('null | null').or(RichEmbedVideoSchema),
  'audio?': type('null | null').or(RichEmbedAudioSchema),
})

export type RichEmbed = typeof RichEmbedSchema.infer

export const MessageAllowedMentionsRequestSchema = type({
  'parse?': type(
    type(type(type('null | null').or(AllowedMentionTypesSchema)).array())
      .and(type('unknown[] <= 1521'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'users?': type(
    type(type(type('null | null').or(SnowflakeTypeSchema)).array())
      .and(type('unknown[] <= 100'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'roles?': type(
    type(type(type('null | null').or(SnowflakeTypeSchema)).array())
      .and(type('unknown[] <= 100'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'replied_user?': 'boolean | null',
})

export type MessageAllowedMentionsRequest = typeof MessageAllowedMentionsRequestSchema.infer

export const UnfurledMediaRequestWithAttachmentReferenceRequiredSchema = type({
  url: type('string.url').narrow(
    (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
  ),
})

export type UnfurledMediaRequestWithAttachmentReferenceRequired =
  typeof UnfurledMediaRequestWithAttachmentReferenceRequiredSchema.infer

export const FileComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  'spoiler?': 'boolean | null',
  file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
})

export type FileComponentForMessageRequest = typeof FileComponentForMessageRequestSchema.infer

export const UnfurledMediaRequestSchema = type({
  url: type('string.url').narrow(
    (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
  ),
})

export type UnfurledMediaRequest = typeof UnfurledMediaRequestSchema.infer

export const MediaGalleryItemForMessageRequestSchema = type({
  'description?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters')),
  ).or('null'),
  'spoiler?': 'boolean | null',
  media: UnfurledMediaRequestSchema,
})

export type MediaGalleryItemForMessageRequest = typeof MediaGalleryItemForMessageRequestSchema.infer

export const MediaGalleryComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  items: type(type(MediaGalleryItemForMessageRequestSchema).array()).and(
    type('1 <= unknown[] <= 10'),
  ),
})

export type MediaGalleryComponentForMessageRequest =
  typeof MediaGalleryComponentForMessageRequestSchema.infer

export const TextDisplayComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  content: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters')),
})

export type TextDisplayComponentForMessageRequest =
  typeof TextDisplayComponentForMessageRequestSchema.infer

export const ThumbnailComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  'description?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters')),
  ).or('null'),
  'spoiler?': 'boolean | null',
  media: UnfurledMediaRequestSchema,
})

export type ThumbnailComponentForMessageRequest =
  typeof ThumbnailComponentForMessageRequestSchema.infer

export const SectionComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  components: type(type(TextDisplayComponentForMessageRequestSchema).array()).and(
    type('1 <= unknown[] <= 3'),
  ),
  accessory: type(ButtonComponentForMessageRequestSchema).or(
    ThumbnailComponentForMessageRequestSchema,
  ),
})

export type SectionComponentForMessageRequest = typeof SectionComponentForMessageRequestSchema.infer

export const MessageComponentSeparatorSpacingSizeSchema = type(
  type('1').describe('Small spacing'),
).or(type('2').describe('Large spacing'))

export type MessageComponentSeparatorSpacingSize =
  typeof MessageComponentSeparatorSpacingSizeSchema.infer

export const SeparatorComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  'spacing?': type('null | null').or(MessageComponentSeparatorSpacingSizeSchema),
  'divider?': 'boolean | null',
})

export type SeparatorComponentForMessageRequest =
  typeof SeparatorComponentForMessageRequestSchema.infer

export const ContainerComponentForMessageRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  'accent_color?': 'number.integer >= 0 & number.integer <= 16777215 | null',
  components: type(
    type(
      type(
        type(
          type(
            type(
              type(ActionRowComponentForMessageRequestSchema).or(
                FileComponentForMessageRequestSchema,
              ),
            ).or(MediaGalleryComponentForMessageRequestSchema),
          ).or(SectionComponentForMessageRequestSchema),
        ).or(SeparatorComponentForMessageRequestSchema),
      ).or(TextDisplayComponentForMessageRequestSchema),
    ).array(),
  ).and(type('1 <= unknown[] <= 40')),
  'spoiler?': 'boolean | null',
})

export type ContainerComponentForMessageRequest =
  typeof ContainerComponentForMessageRequestSchema.infer

export const MessageAttachmentRequestSchema = type({
  id: SnowflakeTypeSchema,
  'filename?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters')),
  ).or('null'),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
    ),
  ).or('null'),
  'duration_secs?': 'number >= 0 & number <= 2147483647 | null',
  'waveform?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 400 || ctx.mustBe('at most 400 characters'),
    ),
  ).or('null'),
  'title?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
    ),
  ).or('null'),
  'is_spoiler?': 'boolean | null',
})

export type MessageAttachmentRequest = typeof MessageAttachmentRequestSchema.infer

export const PollEmojiSchema = type({
  'id?': type('null | null').or(SnowflakeTypeSchema).describe('The ID of the custom emoji'),
  'name?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
    ),
  )
    .or('null')
    .describe('The name of the emoji, or the unicode emoji character'),
  'animated?': type('boolean | null').describe('Whether the emoji is animated'),
})

export type PollEmoji = typeof PollEmojiSchema.infer

export const PollMediaSchema = type({
  'text?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters')),
  )
    .or('null')
    .describe('The text of the field'),
  'emoji?': type('null | null').or(PollEmojiSchema).describe('The emoji of the field'),
})

export type PollMedia = typeof PollMediaSchema.infer

export const PollEmojiCreateRequestSchema = type({
  'id?': type('null | null').or(SnowflakeTypeSchema).describe('The ID of the custom emoji'),
  'name?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
    ),
  )
    .or('null')
    .describe('The name of the emoji, or the unicode emoji character'),
  'animated?': type('boolean | null').describe('Whether the emoji is animated'),
})

export type PollEmojiCreateRequest = typeof PollEmojiCreateRequestSchema.infer

export const PollMediaCreateRequestSchema = type({
  'text?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters')),
  )
    .or('null')
    .describe('The text of the field'),
  'emoji?': type('null | null').or(PollEmojiCreateRequestSchema).describe('The emoji of the field'),
})

export type PollMediaCreateRequest = typeof PollMediaCreateRequestSchema.infer

export const PollAnswerCreateRequestSchema = type({
  poll_media: PollMediaCreateRequestSchema.describe('The data of the answer'),
})

export type PollAnswerCreateRequest = typeof PollAnswerCreateRequestSchema.infer

export const PollLayoutTypesSchema = type('1').describe('The, uhm, default layout type.')

export type PollLayoutTypes = typeof PollLayoutTypesSchema.infer

export const PollCreateRequestSchema = type({
  question: PollMediaSchema.describe('The question of the poll. Only `text` is supported.'),
  answers: type(type(PollAnswerCreateRequestSchema).array())
    .and(type('1 <= unknown[] <= 10'))
    .describe('Each of the answers available in the poll, up to 10'),
  'allow_multiselect?': type('boolean | null').describe(
    'Whether a user can select multiple answers',
  ),
  'layout_type?': type('null | null')
    .or(PollLayoutTypesSchema)
    .describe('The layout type of the poll. Defaults to... DEFAULT!'),
  'duration?': type(
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 1 & number.integer <= 768 | null',
  ).describe('Number of hours the poll should be open for, up to 32 days. Defaults to 24'),
})

export type PollCreateRequest = typeof PollCreateRequestSchema.infer

export const MessageShareCustomUserThemeBaseThemeSchema = type(
  type(
    type(type(type('0').describe('No base theme')).or(type('1').describe('Dark base theme'))).or(
      type('2').describe('Light base theme'),
    ),
  ).or(type('3').describe('Darker base theme')),
).or(type('4').describe('Midnight base theme'))

export type MessageShareCustomUserThemeBaseTheme =
  typeof MessageShareCustomUserThemeBaseThemeSchema.infer

export const CustomClientThemeShareRequestSchema = type({
  colors: type(
    type(
      type('string').narrow(
        (data, ctx) => [...data].length === 6 || ctx.mustBe('exactly 6 characters'),
      ),
    ).array(),
  ).and(type('1 <= unknown[] <= 5')),
  gradient_angle:
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 & number.integer <= 360',
  base_mix:
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 & number.integer <= 100',
  'base_theme?': type('null | null').or(MessageShareCustomUserThemeBaseThemeSchema),
})

export type CustomClientThemeShareRequest = typeof CustomClientThemeShareRequestSchema.infer

export const BaseCreateMessageCreateRequestSchema = type({
  'content?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
    ),
  ).or('null'),
  'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
  'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
  'sticker_ids?': type(type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 3'))).or(
    'null',
  ),
  'components?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(ActionRowComponentForMessageRequestSchema).or(
                    ContainerComponentForMessageRequestSchema,
                  ),
                ).or(FileComponentForMessageRequestSchema),
              ).or(MediaGalleryComponentForMessageRequestSchema),
            ).or(SectionComponentForMessageRequestSchema),
          ).or(SeparatorComponentForMessageRequestSchema),
        ).or(TextDisplayComponentForMessageRequestSchema),
      ).array(),
    ).and(type('unknown[] <= 40')),
  ).or('null'),
  'flags?': 'number.integer | null',
  'attachments?': type(
    type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
  ).or('null'),
  'poll?': type('null | null').or(PollCreateRequestSchema),
  'shared_client_theme?': type('null | null').or(CustomClientThemeShareRequestSchema),
})

export type BaseCreateMessageCreateRequest = typeof BaseCreateMessageCreateRequestSchema.infer

export const BasicApplicationResponseWithBotSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  icon: 'string | null',
  description: 'string',
  type: type('null | null').or(ApplicationTypesSchema),
  'cover_image?': 'string',
  'primary_sku_id?': SnowflakeTypeSchema,
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  flags_new: 'string',
  'bot?': UserResponseSchema,
})

export type BasicApplicationResponseWithBot = typeof BasicApplicationResponseWithBotSchema.infer

export const BasicGuildMemberResponseSchema = type({
  avatar: type('string | null').describe("the member's guild avatar hash"),
  'avatar_decoration_data?': type('null | null')
    .or(UserAvatarDecorationResponseSchema)
    .describe("data for the member's guild avatar decoration"),
  banner: type('string | null').describe("the member's guild banner hash"),
  communication_disabled_until: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe(
      "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
    ),
  flags: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'guild member flags represented as a bit set, defaults to 0',
  ),
  joined_at: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('when the user joined the guild'),
  nick: type('string | null').describe("this user's guild nickname"),
  pending: type('boolean').describe(
    "whether the user has not yet passed the guild's Membership Screening requirements",
  ),
  premium_since: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('when the user started boosting the guild'),
  roles: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length)
    .describe('array of role object ids'),
  'collectibles?': type('null | null')
    .or(UserCollectiblesResponseSchema)
    .describe("data for the member's collectibles"),
})

export type BasicGuildMemberResponse = typeof BasicGuildMemberResponseSchema.infer

export const MessageTypeSchema = type(
  type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(
                            type(
                              type(
                                type(
                                  type(
                                    type(
                                      type(
                                        type(
                                          type(
                                            type(
                                              type(
                                                type(
                                                  type(
                                                    type(
                                                      type(
                                                        type(
                                                          type(
                                                            type(
                                                              type(
                                                                type(
                                                                  type(
                                                                    type(
                                                                      type(
                                                                        type('0').describe(''),
                                                                      ).or(type('1').describe('')),
                                                                    ).or(type('2').describe('')),
                                                                  ).or(type('3').describe('')),
                                                                ).or(type('4').describe('')),
                                                              ).or(type('5').describe('')),
                                                            ).or(type('6').describe('')),
                                                          ).or(type('7').describe('')),
                                                        ).or(type('8').describe('')),
                                                      ).or(type('9').describe('')),
                                                    ).or(type('10').describe('')),
                                                  ).or(type('11').describe('')),
                                                ).or(type('12').describe('')),
                                              ).or(type('14').describe('')),
                                            ).or(type('15').describe('')),
                                          ).or(type('16').describe('')),
                                        ).or(type('17').describe('')),
                                      ).or(type('18').describe('')),
                                    ).or(type('19').describe('')),
                                  ).or(type('20').describe('')),
                                ).or(type('21').describe('')),
                              ).or(type('22').describe('')),
                            ).or(type('23').describe('')),
                          ).or(type('24').describe('')),
                        ).or(type('25').describe('')),
                      ).or(type('26').describe('')),
                    ).or(type('27').describe('')),
                  ).or(type('28').describe('')),
                ).or(type('29').describe('')),
              ).or(type('31').describe('')),
            ).or(type('32').describe('')),
          ).or(type('36').describe('')),
        ).or(type('37').describe('')),
      ).or(type('38').describe('')),
    ).or(type('39').describe('')),
  ).or(type('46').describe('')),
).or(type('55').describe(''))

export type MessageType = typeof MessageTypeSchema.infer

export const MessageAttachmentResponseSchema = type({
  id: SnowflakeTypeSchema,
  filename: 'string',
  size: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  url: 'string.url',
  proxy_url: 'string.url',
  'width?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'height?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'duration_secs?': 'number',
  'waveform?': 'string',
  'description?': 'string',
  'content_type?': 'string',
  'ephemeral?': 'boolean',
  'flags?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'placeholder?': 'string',
  'placeholder_version?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'title?': 'string | null',
  'application?': ApplicationResponseSchema,
  'clip_created_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  'clip_participants?': type(UserResponseSchema).array(),
})

export type MessageAttachmentResponse = typeof MessageAttachmentResponseSchema.infer

export const MessageEmbedFieldResponseSchema = type({
  name: 'string',
  value: 'string',
  inline: 'boolean',
})

export type MessageEmbedFieldResponse = typeof MessageEmbedFieldResponseSchema.infer

export const MessageEmbedAuthorResponseSchema = type({
  name: 'string',
  'url?': 'string',
  'icon_url?': 'string',
  'proxy_icon_url?': 'string.url',
})

export type MessageEmbedAuthorResponse = typeof MessageEmbedAuthorResponseSchema.infer

export const MessageEmbedProviderResponseSchema = type({ name: 'string', 'url?': 'string.url' })

export type MessageEmbedProviderResponse = typeof MessageEmbedProviderResponseSchema.infer

export const UInt32TypeSchema = type('bigint | number.integer')
  .or(/^-?\d+$/)
  .pipe((data) => BigInt(data))
  .narrow(
    (data, ctx) =>
      (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
  )
  .narrow((data, ctx) => data >= 0n || ctx.mustBe('at least 0'))
  .narrow((data, ctx) => data <= 4294967295n || ctx.mustBe('at most 4294967295'))

export type UInt32Type = typeof UInt32TypeSchema.infer

export const MessageEmbedImageResponseSchema = type({
  'url?': 'string',
  'proxy_url?': 'string.url',
  'width?': UInt32TypeSchema,
  'height?': UInt32TypeSchema,
  'content_type?': 'string',
  'placeholder?': 'string',
  'placeholder_version?': UInt32TypeSchema,
  'description?': 'string',
  'flags?': UInt32TypeSchema,
})

export type MessageEmbedImageResponse = typeof MessageEmbedImageResponseSchema.infer

export const MessageEmbedVideoResponseSchema = type({
  'url?': 'string',
  'proxy_url?': 'string.url',
  'width?': UInt32TypeSchema,
  'height?': UInt32TypeSchema,
  'content_type?': 'string',
  'placeholder?': 'string',
  'placeholder_version?': UInt32TypeSchema,
  'description?': 'string',
  'flags?': UInt32TypeSchema,
})

export type MessageEmbedVideoResponse = typeof MessageEmbedVideoResponseSchema.infer

export const MessageEmbedAudioResponseSchema = type({
  'url?': 'string',
  'proxy_url?': 'string.url',
  'content_type?': 'string',
  'description?': 'string',
})

export type MessageEmbedAudioResponse = typeof MessageEmbedAudioResponseSchema.infer

export const MessageEmbedFooterResponseSchema = type({
  text: 'string',
  'icon_url?': 'string',
  'proxy_icon_url?': 'string.url',
})

export type MessageEmbedFooterResponse = typeof MessageEmbedFooterResponseSchema.infer

export const ContentScanMetadataResponseSchema = type({
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type ContentScanMetadataResponse = typeof ContentScanMetadataResponseSchema.infer

export const UnfurledMediaResponseSchema = type({
  id: SnowflakeTypeSchema,
  url: 'string',
  'proxy_url?': 'string',
  'width?': 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  'height?': 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  'placeholder?': 'string | null',
  'placeholder_version?': 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  'content_scan_metadata?': ContentScanMetadataResponseSchema,
  'content_type?': 'string | null',
  'flags?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'attachment_id?': SnowflakeTypeSchema,
})

export type UnfurledMediaResponse = typeof UnfurledMediaResponseSchema.infer

export const FileComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  file: UnfurledMediaResponseSchema,
  name: 'string | null',
  size: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  spoiler: 'boolean',
})

export type FileComponentResponse = typeof FileComponentResponseSchema.infer

export const MediaGalleryItemResponseSchema = type({
  media: UnfurledMediaResponseSchema,
  description: 'string | null',
  spoiler: 'boolean',
})

export type MediaGalleryItemResponse = typeof MediaGalleryItemResponseSchema.infer

export const MediaGalleryComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  items: type(MediaGalleryItemResponseSchema).array(),
})

export type MediaGalleryComponentResponse = typeof MediaGalleryComponentResponseSchema.infer

export const TextDisplayComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  content: 'string',
})

export type TextDisplayComponentResponse = typeof TextDisplayComponentResponseSchema.infer

export const ThumbnailComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  media: UnfurledMediaResponseSchema,
  description: 'string | null',
  spoiler: 'boolean',
})

export type ThumbnailComponentResponse = typeof ThumbnailComponentResponseSchema.infer

export const SectionComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  components: type(TextDisplayComponentResponseSchema).array(),
  accessory: type(ButtonComponentResponseSchema).or(ThumbnailComponentResponseSchema),
})

export type SectionComponentResponse = typeof SectionComponentResponseSchema.infer

export const SeparatorComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  spacing: MessageComponentSeparatorSpacingSizeSchema,
  divider: 'boolean',
})

export type SeparatorComponentResponse = typeof SeparatorComponentResponseSchema.infer

export const ContainerComponentResponseSchema = type({
  type: MessageComponentTypesSchema,
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  accent_color: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  components: type(
    type(
      type(
        type(
          type(type(ActionRowComponentResponseSchema).or(FileComponentResponseSchema)).or(
            MediaGalleryComponentResponseSchema,
          ),
        ).or(SectionComponentResponseSchema),
      ).or(SeparatorComponentResponseSchema),
    ).or(TextDisplayComponentResponseSchema),
  ).array(),
  spoiler: 'boolean',
})

export type ContainerComponentResponse = typeof ContainerComponentResponseSchema.infer

export const MessageEmbedResponseSchema = type({
  type: 'string',
  'url?': 'string.url',
  'title?': 'string',
  'description?': 'string',
  'color?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'timestamp?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  'fields?': type(MessageEmbedFieldResponseSchema).array(),
  'author?': MessageEmbedAuthorResponseSchema,
  'provider?': MessageEmbedProviderResponseSchema,
  'image?': MessageEmbedImageResponseSchema,
  'thumbnail?': MessageEmbedImageResponseSchema,
  'video?': MessageEmbedVideoResponseSchema,
  'audio?': MessageEmbedAudioResponseSchema,
  'footer?': MessageEmbedFooterResponseSchema,
  'flags?': 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  'components?': type(ContainerComponentResponseSchema).array(),
})

export type MessageEmbedResponse = typeof MessageEmbedResponseSchema.infer

export const StickerTypesSchema = type(
  type('1').describe(
    'an official sticker in a pack, part of Nitro or in a removed purchasable pack',
  ),
).or(type('2').describe("a sticker uploaded to a guild for the guild's members"))

export type StickerTypes = typeof StickerTypesSchema.infer

export const StickerFormatTypesSchema = type('1 | 2 | 3 | 4')

export type StickerFormatTypes = typeof StickerFormatTypesSchema.infer

export const GuildStickerResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  tags: 'string',
  type: StickerTypesSchema,
  format_type: type('null | null').or(StickerFormatTypesSchema),
  description: 'string | null',
  available: 'boolean',
  guild_id: SnowflakeTypeSchema,
  'user?': UserResponseSchema,
})

export type GuildStickerResponse = typeof GuildStickerResponseSchema.infer

export const StandardStickerResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  tags: 'string',
  type: StickerTypesSchema,
  format_type: type('null | null').or(StickerFormatTypesSchema),
  description: 'string | null',
  pack_id: SnowflakeTypeSchema,
  sort_value: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type StandardStickerResponse = typeof StandardStickerResponseSchema.infer

export const MessageStickerItemResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  format_type: StickerFormatTypesSchema,
})

export type MessageStickerItemResponse = typeof MessageStickerItemResponseSchema.infer

export const MessageCallResponseSchema = type({
  'ended_timestamp?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  participants: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
})

export type MessageCallResponse = typeof MessageCallResponseSchema.infer

export const MessageActivityResponseSchema = type({
  type: ActivityActionTypesSchema,
  'party_id?': 'string',
})

export type MessageActivityResponse = typeof MessageActivityResponseSchema.infer

export const MessageInteractionResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  name: 'string',
  'user?': UserResponseSchema,
  'name_localized?': 'string',
})

export type MessageInteractionResponse = typeof MessageInteractionResponseSchema.infer

export const MessageReferenceTypeSchema = type('0').describe('Reference to a message')

export type MessageReferenceType = typeof MessageReferenceTypeSchema.infer

export const MessageReferenceResponseSchema = type({
  type: MessageReferenceTypeSchema,
  channel_id: SnowflakeTypeSchema,
  'message_id?': SnowflakeTypeSchema,
  'guild_id?': SnowflakeTypeSchema,
})

export type MessageReferenceResponse = typeof MessageReferenceResponseSchema.infer

export const VideoQualityModesSchema = type(
  type('1').describe('Discord chooses the quality for optimal performance'),
).or(type('2').describe('720p'))

export type VideoQualityModes = typeof VideoQualityModesSchema.infer

export const ThreadAutoArchiveDurationSchema = type(
  type(type(type('60').describe('One hour')).or(type('1440').describe('One day'))).or(
    type('4320').describe('Three days'),
  ),
).or(type('10080').describe('Seven days'))

export type ThreadAutoArchiveDuration = typeof ThreadAutoArchiveDurationSchema.infer

export const ThreadMetadataResponseSchema = type({
  archived: 'boolean',
  archive_timestamp: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  auto_archive_duration: ThreadAutoArchiveDurationSchema,
  locked: 'boolean',
  'create_timestamp?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  'invitable?': 'boolean',
})

export type ThreadMetadataResponse = typeof ThreadMetadataResponseSchema.infer

export const GuildMemberResponseSchema = type({
  avatar: type('string | null').describe("the member's guild avatar hash"),
  'avatar_decoration_data?': type('null | null')
    .or(UserAvatarDecorationResponseSchema)
    .describe("data for the member's guild avatar decoration"),
  banner: type('string | null').describe("the member's guild banner hash"),
  communication_disabled_until: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe(
      "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
    ),
  flags: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'guild member flags represented as a bit set, defaults to 0',
  ),
  joined_at: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('when the user joined the guild'),
  nick: type('string | null').describe("this user's guild nickname"),
  pending: type('boolean').describe(
    "whether the user has not yet passed the guild's Membership Screening requirements",
  ),
  premium_since: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('when the user started boosting the guild'),
  roles: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length)
    .describe('array of role object ids'),
  'collectibles?': type('null | null')
    .or(UserCollectiblesResponseSchema)
    .describe("data for the member's collectibles"),
  user: UserResponseSchema.describe('the user this guild member represents'),
  mute: type('boolean').describe('whether the user is muted in voice channels'),
  deaf: type('boolean').describe('whether the user is deafened in voice channels'),
})

export type GuildMemberResponse = typeof GuildMemberResponseSchema.infer

export const ThreadMemberResponseSchema = type({
  id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  join_timestamp: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'member?': GuildMemberResponseSchema,
})

export type ThreadMemberResponse = typeof ThreadMemberResponseSchema.infer

export const ThreadResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  'last_message_id?': type('null | null').or(SnowflakeTypeSchema),
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'last_pin_timestamp?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  guild_id: SnowflakeTypeSchema,
  name: 'string',
  'parent_id?': type('null | null').or(SnowflakeTypeSchema),
  'rate_limit_per_user?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'bitrate?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'user_limit?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'rtc_region?': 'string | null',
  'video_quality_mode?': VideoQualityModesSchema,
  'permissions?': 'string',
  owner_id: SnowflakeTypeSchema,
  thread_metadata: ThreadMetadataResponseSchema,
  message_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  member_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  total_message_sent: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'applied_tags?': type(SnowflakeTypeSchema).array(),
  'member?': ThreadMemberResponseSchema,
})

export type ThreadResponse = typeof ThreadResponseSchema.infer

export const MessageMentionChannelResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  type: ChannelTypesSchema,
  guild_id: SnowflakeTypeSchema,
})

export type MessageMentionChannelResponse = typeof MessageMentionChannelResponseSchema.infer

export const MessageRoleSubscriptionDataResponseSchema = type({
  role_subscription_listing_id: SnowflakeTypeSchema,
  tier_name: 'string',
  total_months_subscribed: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  is_renewal: 'boolean',
})

export type MessageRoleSubscriptionDataResponse =
  typeof MessageRoleSubscriptionDataResponseSchema.infer

export const PurchaseTypeSchema = type('0')

export type PurchaseType = typeof PurchaseTypeSchema.infer

export const GuildProductPurchaseResponseSchema = type({
  listing_id: SnowflakeTypeSchema,
  product_name: 'string',
})

export type GuildProductPurchaseResponse = typeof GuildProductPurchaseResponseSchema.infer

export const PurchaseNotificationResponseSchema = type({
  type: PurchaseTypeSchema,
  'guild_product_purchase?': GuildProductPurchaseResponseSchema,
})

export type PurchaseNotificationResponse = typeof PurchaseNotificationResponseSchema.infer

export const ChannelPermissionOverwritesSchema = type('0 | 1')

export type ChannelPermissionOverwrites = typeof ChannelPermissionOverwritesSchema.infer

export const ChannelPermissionOverwriteResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: ChannelPermissionOverwritesSchema,
  allow: 'string',
  deny: 'string',
})

export type ChannelPermissionOverwriteResponse =
  typeof ChannelPermissionOverwriteResponseSchema.infer

export const ForumTagResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  moderated: 'boolean',
  emoji_id: type('null | null').or(SnowflakeTypeSchema),
  emoji_name: 'string | null',
})

export type ForumTagResponse = typeof ForumTagResponseSchema.infer

export const DefaultReactionEmojiResponseSchema = type({
  emoji_id: type('null | null').or(SnowflakeTypeSchema),
  emoji_name: 'string | null',
})

export type DefaultReactionEmojiResponse = typeof DefaultReactionEmojiResponseSchema.infer

export const ThreadSortOrderSchema = type(type('0').describe('Sort forum posts by activity')).or(
  type('1').describe('Sort forum posts by creation time (from most recent to oldest)'),
)

export type ThreadSortOrder = typeof ThreadSortOrderSchema.infer

export const ForumLayoutSchema = type(
  type(type('0').describe('No default has been set for forum channel')).or(
    type('1').describe('Display posts as a list'),
  ),
).or(type('2').describe('Display posts as a collection of tiles'))

export type ForumLayout = typeof ForumLayoutSchema.infer

export const ThreadSearchTagSettingSchema = type(
  type("'match_all'").describe('The thread tags must contain all tags in the search query'),
).or(
  type("'match_some'").describe(
    'The thread tags must contain at least one of tags in the search query',
  ),
)

export type ThreadSearchTagSetting = typeof ThreadSearchTagSettingSchema.infer

export const GuildChannelResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  'last_message_id?': type('null | null').or(SnowflakeTypeSchema),
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'last_pin_timestamp?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  guild_id: SnowflakeTypeSchema,
  name: 'string',
  'parent_id?': type('null | null').or(SnowflakeTypeSchema),
  'rate_limit_per_user?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'bitrate?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'user_limit?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'rtc_region?': 'string | null',
  'video_quality_mode?': VideoQualityModesSchema,
  'permissions?': 'string',
  'topic?': 'string | null',
  'default_auto_archive_duration?': ThreadAutoArchiveDurationSchema,
  'default_thread_rate_limit_per_user?':
    'number.integer >= -2147483648 & number.integer <= 2147483647',
  position: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'permission_overwrites?': type(ChannelPermissionOverwriteResponseSchema).array(),
  'nsfw?': 'boolean',
  'available_tags?': type(ForumTagResponseSchema).array(),
  'default_reaction_emoji?': type('null | null').or(DefaultReactionEmojiResponseSchema),
  'default_sort_order?': type('null | null').or(ThreadSortOrderSchema),
  'default_forum_layout?': ForumLayoutSchema,
  'default_tag_setting?': type('null | null').or(ThreadSearchTagSettingSchema),
})

export type GuildChannelResponse = typeof GuildChannelResponseSchema.infer

export const PrivateChannelResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  'last_message_id?': type('null | null').or(SnowflakeTypeSchema),
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'last_pin_timestamp?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  recipients: type(UserResponseSchema).array(),
})

export type PrivateChannelResponse = typeof PrivateChannelResponseSchema.infer

export const PrivateGroupChannelResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  'last_message_id?': type('null | null').or(SnowflakeTypeSchema),
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'last_pin_timestamp?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  recipients: type(UserResponseSchema).array(),
  name: 'string | null',
  icon: 'string | null',
  owner_id: SnowflakeTypeSchema,
  'managed?': 'boolean',
  'application_id?': SnowflakeTypeSchema,
})

export type PrivateGroupChannelResponse = typeof PrivateGroupChannelResponseSchema.infer

export const GuildRoleColorsResponseSchema = type({
  primary_color: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  secondary_color: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  tertiary_color: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
})

export type GuildRoleColorsResponse = typeof GuildRoleColorsResponseSchema.infer

export const GuildRoleTagsResponseSchema = type({
  'premium_subscriber?': 'null | null',
  'bot_id?': SnowflakeTypeSchema,
  'integration_id?': SnowflakeTypeSchema,
  'subscription_listing_id?': SnowflakeTypeSchema,
  'available_for_purchase?': 'null | null',
  'guild_connections?': 'null | null',
})

export type GuildRoleTagsResponse = typeof GuildRoleTagsResponseSchema.infer

export const GuildRoleResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  permissions: 'string',
  position: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  color: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  colors: GuildRoleColorsResponseSchema,
  hoist: 'boolean',
  managed: 'boolean',
  mentionable: 'boolean',
  icon: 'string | null',
  unicode_emoji: 'string | null',
  'tags?': GuildRoleTagsResponseSchema,
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type GuildRoleResponse = typeof GuildRoleResponseSchema.infer

export const ResolvedObjectsResponseSchema = type({
  'users?': type(type({ '[string]': UserResponseSchema })).or('null'),
  'members?': type(type({ '[string]': BasicGuildMemberResponseSchema })).or('null'),
  'channels?': type(
    type({
      '[string]': type(
        type(type(GuildChannelResponseSchema).or(PrivateChannelResponseSchema)).or(
          PrivateGroupChannelResponseSchema,
        ),
      ).or(ThreadResponseSchema),
    }),
  ).or('null'),
  'roles?': type(type({ '[string]': GuildRoleResponseSchema })).or('null'),
})

export type ResolvedObjectsResponse = typeof ResolvedObjectsResponseSchema.infer

export const MessageReactionEmojiResponseSchema = type({
  id: type('null | null').or(SnowflakeTypeSchema),
  name: 'string | null',
  'animated?': 'boolean',
})

export type MessageReactionEmojiResponse = typeof MessageReactionEmojiResponseSchema.infer

export const PollMediaResponseSchema = type({
  'text?': type('string').describe('The text of the field'),
  'emoji?': MessageReactionEmojiResponseSchema.describe('The emoji of the field'),
})

export type PollMediaResponse = typeof PollMediaResponseSchema.infer

export const PollAnswerResponseSchema = type({
  answer_id: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The ID of the answer',
  ),
  poll_media: PollMediaResponseSchema.describe('The data of the answer'),
})

export type PollAnswerResponse = typeof PollAnswerResponseSchema.infer

export const PollResultsEntryResponseSchema = type({
  id: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The answer_id',
  ),
  count: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The number of votes for this answer',
  ),
  me_voted: type('boolean').describe('Whether the current user voted for this answer'),
})

export type PollResultsEntryResponse = typeof PollResultsEntryResponseSchema.infer

export const PollResultsResponseSchema = type({
  answer_counts: type(PollResultsEntryResponseSchema)
    .array()
    .describe('The counts for each answer'),
  is_finalized: type('boolean').describe('Whether the votes have been precisely counted'),
})

export type PollResultsResponse = typeof PollResultsResponseSchema.infer

export const PollResponseSchema = type({
  question: PollMediaResponseSchema.describe('The question of the poll. Only `text` is supported.'),
  answers: type(PollAnswerResponseSchema)
    .array()
    .describe('Each of the answers available in the poll'),
  expiry: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('The time when the poll ends'),
  allow_multiselect: type('boolean').describe('Whether a user can select multiple answers'),
  layout_type: PollLayoutTypesSchema.describe('The layout type of the poll'),
  results: PollResultsResponseSchema.describe('The results of the poll'),
})

export type PollResponse = typeof PollResponseSchema.infer

export const CustomClientThemeResponseSchema = type({
  colors: 'string[]',
  gradient_angle: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  base_mix: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  base_theme: MessageShareCustomUserThemeBaseThemeSchema,
})

export type CustomClientThemeResponse = typeof CustomClientThemeResponseSchema.infer

export const MessageComponentInteractionMetadataResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  'user?': UserResponseSchema,
  authorizing_integration_owners: type({ '[string]': SnowflakeTypeSchema }),
  'original_response_message_id?': SnowflakeTypeSchema,
  interacted_message_id: SnowflakeTypeSchema,
})

export type MessageComponentInteractionMetadataResponse =
  typeof MessageComponentInteractionMetadataResponseSchema.infer

export const ModalSubmitInteractionMetadataResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  'user?': UserResponseSchema,
  authorizing_integration_owners: type({ '[string]': SnowflakeTypeSchema }),
  'original_response_message_id?': SnowflakeTypeSchema,
  triggering_interaction_metadata: type(ApplicationCommandInteractionMetadataResponseSchema).or(
    MessageComponentInteractionMetadataResponseSchema,
  ),
})

export type ModalSubmitInteractionMetadataResponse =
  typeof ModalSubmitInteractionMetadataResponseSchema.infer

export const MinimalContentMessageResponseSchema = type({
  type: MessageTypeSchema,
  content: 'string',
  mentions: type(UserResponseSchema).array(),
  mention_roles: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  attachments: type(MessageAttachmentResponseSchema).array(),
  embeds: type(MessageEmbedResponseSchema).array(),
  timestamp: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  edited_timestamp: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  components: type(
    type(
      type(
        type(
          type(
            type(type(ActionRowComponentResponseSchema).or(ContainerComponentResponseSchema)).or(
              FileComponentResponseSchema,
            ),
          ).or(MediaGalleryComponentResponseSchema),
        ).or(SectionComponentResponseSchema),
      ).or(SeparatorComponentResponseSchema),
    ).or(TextDisplayComponentResponseSchema),
  ).array(),
  'stickers?': type(type(GuildStickerResponseSchema).or(StandardStickerResponseSchema)).array(),
  'sticker_items?': type(MessageStickerItemResponseSchema).array(),
})

export type MinimalContentMessageResponse = typeof MinimalContentMessageResponseSchema.infer

export const MessageSnapshotResponseSchema = type({ message: MinimalContentMessageResponseSchema })

export type MessageSnapshotResponse = typeof MessageSnapshotResponseSchema.infer

export const MessageLobbyMemberResponseSchema = type({ additional_name: 'string' })

export type MessageLobbyMemberResponse = typeof MessageLobbyMemberResponseSchema.infer

export const BasicMessageResponseSchema = type({
  type: MessageTypeSchema,
  content: 'string',
  mentions: type(UserResponseSchema).array(),
  mention_roles: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  attachments: type(MessageAttachmentResponseSchema).array(),
  embeds: type(MessageEmbedResponseSchema).array(),
  timestamp: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  edited_timestamp: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  components: type(
    type(
      type(
        type(
          type(
            type(type(ActionRowComponentResponseSchema).or(ContainerComponentResponseSchema)).or(
              FileComponentResponseSchema,
            ),
          ).or(MediaGalleryComponentResponseSchema),
        ).or(SectionComponentResponseSchema),
      ).or(SeparatorComponentResponseSchema),
    ).or(TextDisplayComponentResponseSchema),
  ).array(),
  'stickers?': type(type(GuildStickerResponseSchema).or(StandardStickerResponseSchema)).array(),
  'sticker_items?': type(MessageStickerItemResponseSchema).array(),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: 'boolean',
  mention_everyone: 'boolean',
  tts: 'boolean',
  'call?': MessageCallResponseSchema,
  'activity?': MessageActivityResponseSchema,
  'application?': BasicApplicationResponseWithBotSchema,
  'application_id?': SnowflakeTypeSchema,
  'interaction?': MessageInteractionResponseSchema,
  'nonce?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      )
      .narrow(
        (data, ctx) => data >= -9223372036854776000n || ctx.mustBe('at least -9223372036854776000'),
      )
      .narrow(
        (data, ctx) => data <= 9223372036854776000n || ctx.mustBe('at most 9223372036854776000'),
      ),
  ).or(
    type('string').narrow(
      (data, ctx) => [...data].length <= 25 || ctx.mustBe('at most 25 characters'),
    ),
  ),
  'webhook_id?': SnowflakeTypeSchema,
  'message_reference?': MessageReferenceResponseSchema,
  'thread?': ThreadResponseSchema,
  'mention_channels?': type(MessageMentionChannelResponseSchema).array(),
  'role_subscription_data?': MessageRoleSubscriptionDataResponseSchema,
  'purchase_notification?': PurchaseNotificationResponseSchema,
  'position?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'resolved?': ResolvedObjectsResponseSchema,
  'poll?': PollResponseSchema,
  'shared_client_theme?': CustomClientThemeResponseSchema,
  'interaction_metadata?': type(
    type(ApplicationCommandInteractionMetadataResponseSchema).or(
      MessageComponentInteractionMetadataResponseSchema,
    ),
  ).or(ModalSubmitInteractionMetadataResponseSchema),
  'message_snapshots?': type(MessageSnapshotResponseSchema).array(),
  'lobby_member?': MessageLobbyMemberResponseSchema,
  'actor?': UserResponseSchema,
})

export type BasicMessageResponse = typeof BasicMessageResponseSchema.infer

export const BlockMessageActionMetadataSchema = type({
  'custom_message?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters'),
    ),
  ).or('null'),
})

export type BlockMessageActionMetadata = typeof BlockMessageActionMetadataSchema.infer

export const BlockMessageActionSchema = type({
  type: AutomodActionTypeSchema,
  'metadata?': type('null | null').or(BlockMessageActionMetadataSchema),
})

export type BlockMessageAction = typeof BlockMessageActionSchema.infer

export const BlockMessageActionMetadataResponseSchema = type({ 'custom_message?': 'string' })

export type BlockMessageActionMetadataResponse =
  typeof BlockMessageActionMetadataResponseSchema.infer

export const BlockMessageActionResponseSchema = type({
  type: AutomodActionTypeSchema,
  metadata: BlockMessageActionMetadataResponseSchema,
})

export type BlockMessageActionResponse = typeof BlockMessageActionResponseSchema.infer

export const BotAccountPatchRequestSchema = type({
  username: type('string')
    .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'avatar?': 'string | null',
  'banner?': 'string | null',
})

export type BotAccountPatchRequest = typeof BotAccountPatchRequestSchema.infer

export const BotAddGuildMemberRequestSchema = type({
  'nick?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
    ),
  ).or('null'),
  'roles?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 250'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'mute?': 'boolean | null',
  'deaf?': 'boolean | null',
  access_token: type('string').narrow(
    (data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters'),
  ),
  'flags?': 'number.integer | null',
})

export type BotAddGuildMemberRequest = typeof BotAddGuildMemberRequestSchema.infer

export const BulkBanUsersRequestSchema = type({
  user_ids: type(type(SnowflakeTypeSchema).array())
    .and(type('unknown[] <= 200'))
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  'delete_message_seconds?': 'number.integer >= 0 & number.integer <= 604800 | null',
})

export type BulkBanUsersRequest = typeof BulkBanUsersRequestSchema.infer

export const BulkBanUsersResponseSchema = type({
  banned_users: type(SnowflakeTypeSchema).array(),
  failed_users: type(SnowflakeTypeSchema).array(),
})

export type BulkBanUsersResponse = typeof BulkBanUsersResponseSchema.infer

export const BulkLobbyMemberRequestSchema = type({
  id: SnowflakeTypeSchema,
  'metadata?': type(
    type({
      '[string]': type('string').narrow(
        (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
      ),
    }),
  ).or('null'),
  'flags?': 'null | null | 1',
  'additional_name?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
  ).or('null'),
  'remove_member?': 'boolean | null',
})

export type BulkLobbyMemberRequest = typeof BulkLobbyMemberRequestSchema.infer

export const RecurrenceRuleWeekdaysSchema = type('0 | 1 | 2 | 3 | 4 | 5 | 6')

export type RecurrenceRuleWeekdays = typeof RecurrenceRuleWeekdaysSchema.infer

export const ByNWeekdaySchema = type({
  n: type(
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 1 & number.integer <= 5',
  ).describe('The week to reoccur on (1-5, where 5 represents the last week)'),
  day: RecurrenceRuleWeekdaysSchema.describe('The day within the week to reoccur on'),
})

export type ByNWeekday = typeof ByNWeekdaySchema.infer

export const ByNWeekdayResponseSchema = type({
  n: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The week to reoccur on (1-5, where 5 represents the last week)',
  ),
  day: RecurrenceRuleWeekdaysSchema.describe('The day within the week to reoccur on'),
})

export type ByNWeekdayResponse = typeof ByNWeekdayResponseSchema.infer

export const ChannelFollowerResponseSchema = type({
  channel_id: SnowflakeTypeSchema,
  webhook_id: SnowflakeTypeSchema,
})

export type ChannelFollowerResponse = typeof ChannelFollowerResponseSchema.infer

export const WebhookSourceGuildResponseSchema = type({
  id: SnowflakeTypeSchema,
  icon: 'string | null',
  name: 'string',
})

export type WebhookSourceGuildResponse = typeof WebhookSourceGuildResponseSchema.infer

export const WebhookSourceChannelResponseSchema = type({ id: SnowflakeTypeSchema, name: 'string' })

export type WebhookSourceChannelResponse = typeof WebhookSourceChannelResponseSchema.infer

export const ChannelFollowerWebhookResponseSchema = type({
  application_id: type('null | null').or(SnowflakeTypeSchema),
  avatar: 'string | null',
  channel_id: type('null | null').or(SnowflakeTypeSchema),
  'guild_id?': type('null | null').or(SnowflakeTypeSchema),
  id: SnowflakeTypeSchema,
  name: 'string',
  type: WebhookTypesSchema,
  'user?': UserResponseSchema,
  'source_guild?': WebhookSourceGuildResponseSchema,
  'source_channel?': WebhookSourceChannelResponseSchema,
})

export type ChannelFollowerWebhookResponse = typeof ChannelFollowerWebhookResponseSchema.infer

export const ChannelPermissionOverwriteRequestSchema = type({
  id: SnowflakeTypeSchema,
  'type?': type('null | null').or(ChannelPermissionOverwritesSchema),
  'allow?': 'number.integer | null',
  'deny?': 'number.integer | null',
})

export type ChannelPermissionOverwriteRequest = typeof ChannelPermissionOverwriteRequestSchema.infer

export const ChannelSelectComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 150 || ctx.mustBe('at most 150 characters'),
    ),
  ).or('null'),
  'min_values?': 'number.integer >= 0 & number.integer <= 25 | null',
  'max_values?': 'number.integer >= 1 & number.integer <= 25 | null',
  'disabled?': 'boolean | null',
  'required?': 'boolean | null',
  'default_values?': type(
    type(type(ChannelSelectDefaultValueSchema).array()).and(type('unknown[] <= 25')),
  ).or('null'),
  'channel_types?': type(
    type(ChannelTypesSchema)
      .array()
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
})

export type ChannelSelectComponentForModalRequest =
  typeof ChannelSelectComponentForModalRequestSchema.infer

export const CheckboxComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'default?': 'boolean | null',
})

export type CheckboxComponentForModalRequest = typeof CheckboxComponentForModalRequestSchema.infer

export const CheckboxGroupOptionForRequestSchema = type({
  label: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  value: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
  'default?': 'boolean | null',
})

export type CheckboxGroupOptionForRequest = typeof CheckboxGroupOptionForRequestSchema.infer

export const CheckboxGroupComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'min_values?': 'number.integer >= 0 & number.integer <= 10 | null',
  'max_values?': 'number.integer >= 1 & number.integer <= 10 | null',
  'required?': 'boolean | null',
  options: type(type(CheckboxGroupOptionForRequestSchema).array()).and(
    type('1 <= unknown[] <= 10'),
  ),
})

export type CheckboxGroupComponentForModalRequest =
  typeof CheckboxGroupComponentForModalRequestSchema.infer

export const CommandPermissionResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: ApplicationCommandPermissionTypeSchema,
  permission: 'boolean',
})

export type CommandPermissionResponse = typeof CommandPermissionResponseSchema.infer

export const CommandPermissionsResponseSchema = type({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  permissions: type(CommandPermissionResponseSchema).array(),
})

export type CommandPermissionsResponse = typeof CommandPermissionsResponseSchema.infer

export const ConnectedAccountGuildResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  icon: 'string | null',
})

export type ConnectedAccountGuildResponse = typeof ConnectedAccountGuildResponseSchema.infer

export const IntegrationTypesSchema = type(
  "'discord' | 'twitch' | 'youtube' | 'guild_subscription'",
)

export type IntegrationTypes = typeof IntegrationTypesSchema.infer

export const ConnectedAccountIntegrationResponseSchema = type({
  id: 'string',
  type: IntegrationTypesSchema,
  account: AccountResponseSchema,
  guild: ConnectedAccountGuildResponseSchema,
})

export type ConnectedAccountIntegrationResponse =
  typeof ConnectedAccountIntegrationResponseSchema.infer

export const ConnectedAccountProvidersSchema = type(
  "'battlenet' | 'bluesky' | 'bungie' | 'ebay' | 'epicgames' | 'facebook' | 'github' | 'instagram' | 'letterboxd' | 'mastodon' | 'leagueoflegends' | 'paypal' | 'playstation' | 'reddit' | 'riotgames' | 'roblox' | 'skype' | 'spotify' | 'steam' | 'tiktok' | 'twitch' | 'twitter' | 'xbox' | 'youtube' | 'domain'",
)

export type ConnectedAccountProviders = typeof ConnectedAccountProvidersSchema.infer

export const ConnectedAccountVisibilitySchema = type('0 | 1')

export type ConnectedAccountVisibility = typeof ConnectedAccountVisibilitySchema.infer

export const ConnectedAccountResponseSchema = type({
  id: 'string',
  name: 'string | null',
  type: ConnectedAccountProvidersSchema,
  friend_sync: 'boolean',
  'integrations?': type(ConnectedAccountIntegrationResponseSchema).array(),
  show_activity: 'boolean',
  two_way_link: 'boolean',
  verified: 'boolean',
  visibility: ConnectedAccountVisibilitySchema,
  'revoked?': 'boolean',
})

export type ConnectedAccountResponse = typeof ConnectedAccountResponseSchema.infer

export const EntitlementOwnerTypesSchema = type(type('1').describe('A guild subscription')).or(
  type('2').describe('A user subscription'),
)

export type EntitlementOwnerTypes = typeof EntitlementOwnerTypesSchema.infer

export const CreateEntitlementRequestDataSchema = type({
  sku_id: SnowflakeTypeSchema.describe('ID of the SKU to grant the entitlement to'),
  owner_id: SnowflakeTypeSchema.describe('ID of the guild or user to grant the entitlement to'),
  owner_type: EntitlementOwnerTypesSchema.describe(
    '1 for a guild subscription, 2 for a user subscription',
  ),
})

export type CreateEntitlementRequestData = typeof CreateEntitlementRequestDataSchema.infer

export const CreateForumThreadRequestSchema = type({
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'auto_archive_duration?': type('null | null').or(ThreadAutoArchiveDurationSchema),
  'rate_limit_per_user?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 & number.integer <= 21600 | null',
  'applied_tags?': type(type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 5'))).or(
    'null',
  ),
  message: BaseCreateMessageCreateRequestSchema,
})

export type CreateForumThreadRequest = typeof CreateForumThreadRequestSchema.infer

export const CreateGroupDMInviteRequestSchema = type({
  'max_age?': 'number.integer >= 1 & number.integer <= 2592000 | null',
})

export type CreateGroupDMInviteRequest = typeof CreateGroupDMInviteRequestSchema.infer

export const UpdateDefaultReactionEmojiRequestSchema = type({
  'emoji_id?': type('null | null').or(SnowflakeTypeSchema),
  'emoji_name?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
})

export type UpdateDefaultReactionEmojiRequest = typeof UpdateDefaultReactionEmojiRequestSchema.infer

export const CreateOrUpdateThreadTagRequestSchema = type({
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
    .narrow((data, ctx) => [...data].length <= 50 || ctx.mustBe('at most 50 characters')),
  'emoji_id?': type('null | null').or(SnowflakeTypeSchema),
  'emoji_name?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
  'moderated?': 'boolean | null',
})

export type CreateOrUpdateThreadTagRequest = typeof CreateOrUpdateThreadTagRequestSchema.infer

export const CreateGuildChannelRequestSchema = type({
  'type?': type('null | null').or(ChannelTypesSchema),
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'position?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  'topic?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
      .narrow((data, ctx) => [...data].length <= 4096 || ctx.mustBe('at most 4096 characters')),
  ).or('null'),
  'bitrate?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 8000 | null',
  'user_limit?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  'nsfw?': 'boolean | null',
  'rate_limit_per_user?': 'number.integer >= 0 & number.integer <= 21600 | null',
  'parent_id?': type('null | null').or(SnowflakeTypeSchema),
  'permission_overwrites?': type(
    type(type(ChannelPermissionOverwriteRequestSchema).array()).and(type('unknown[] <= 100')),
  ).or('null'),
  'rtc_region?': 'string | null',
  'video_quality_mode?': type('null | null').or(VideoQualityModesSchema),
  'default_auto_archive_duration?': type('null | null').or(ThreadAutoArchiveDurationSchema),
  'default_reaction_emoji?': type('null | null').or(UpdateDefaultReactionEmojiRequestSchema),
  'default_thread_rate_limit_per_user?': 'number.integer >= 0 & number.integer <= 21600 | null',
  'default_sort_order?': type('null | null').or(ThreadSortOrderSchema),
  'default_forum_layout?': type('null | null').or(ForumLayoutSchema),
  'default_tag_setting?': type('null | null').or(ThreadSearchTagSettingSchema),
  'available_tags?': type(
    type(type(type('null | null').or(CreateOrUpdateThreadTagRequestSchema)).array()).and(
      type('unknown[] <= 20'),
    ),
  ).or('null'),
})

export type CreateGuildChannelRequest = typeof CreateGuildChannelRequestSchema.infer

export const InviteTargetTypesSchema = type('1 | 2 | 3')

export type InviteTargetTypes = typeof InviteTargetTypesSchema.infer

export const CreateGuildInviteRequestSchema = type({
  'max_age?': 'number.integer >= 0 & number.integer <= 5184000 | null',
  'temporary?': 'boolean | null',
  'max_uses?': 'number.integer >= 0 & number.integer <= 100 | null',
  'unique?': 'boolean | null',
  'target_user_id?': type('null | null').or(SnowflakeTypeSchema),
  'target_application_id?': type('null | null').or(SnowflakeTypeSchema),
  'target_type?': type('null | null').or(InviteTargetTypesSchema),
  'role_ids?': type(
    type('string').or(
      type(type(SnowflakeTypeSchema).array())
        .and(type('unknown[] <= 250'))
        .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
    ),
  ).or('null | null'),
  'target_user_ids?': type(
    type('string').or(
      type(type(SnowflakeTypeSchema).array())
        .and(type('unknown[] <= 1000'))
        .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
    ),
  )
    .or('null | null')
    .describe('The IDs of the users to target with this invite.'),
})

export type CreateGuildInviteRequest = typeof CreateGuildInviteRequestSchema.infer

export const IncomingWebhookInteractionRequestSchema = type({
  'content?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
    ),
  ).or('null'),
  'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
  'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
  'components?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(ActionRowComponentForMessageRequestSchema).or(
                    ContainerComponentForMessageRequestSchema,
                  ),
                ).or(FileComponentForMessageRequestSchema),
              ).or(MediaGalleryComponentForMessageRequestSchema),
            ).or(SectionComponentForMessageRequestSchema),
          ).or(SeparatorComponentForMessageRequestSchema),
        ).or(TextDisplayComponentForMessageRequestSchema),
      ).array(),
    ).and(type('unknown[] <= 40')),
  ).or('null'),
  'attachments?': type(
    type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
  ).or('null'),
  'poll?': type('null | null').or(PollCreateRequestSchema),
  'tts?': 'boolean | null',
  'flags?': 'number.integer | null',
})

export type IncomingWebhookInteractionRequest = typeof IncomingWebhookInteractionRequestSchema.infer

export const CreateMessageInteractionCallbackRequestSchema = type({
  type: InteractionCallbackTypesSchema,
  'data?': type('null | null').or(IncomingWebhookInteractionRequestSchema),
})

export type CreateMessageInteractionCallbackRequest =
  typeof CreateMessageInteractionCallbackRequestSchema.infer

export const MessageReactionCountDetailsResponseSchema = type({
  burst: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  normal: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type MessageReactionCountDetailsResponse =
  typeof MessageReactionCountDetailsResponseSchema.infer

export const MessageReactionResponseSchema = type({
  emoji: MessageReactionEmojiResponseSchema,
  count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  count_details: MessageReactionCountDetailsResponseSchema,
  burst_colors: 'string[]',
  me_burst: 'boolean',
  me: 'boolean',
})

export type MessageReactionResponse = typeof MessageReactionResponseSchema.infer

export const MessageResponseSchema = type({
  type: MessageTypeSchema,
  content: 'string',
  mentions: type(UserResponseSchema).array(),
  mention_roles: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  attachments: type(MessageAttachmentResponseSchema).array(),
  embeds: type(MessageEmbedResponseSchema).array(),
  timestamp: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  edited_timestamp: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  components: type(
    type(
      type(
        type(
          type(
            type(type(ActionRowComponentResponseSchema).or(ContainerComponentResponseSchema)).or(
              FileComponentResponseSchema,
            ),
          ).or(MediaGalleryComponentResponseSchema),
        ).or(SectionComponentResponseSchema),
      ).or(SeparatorComponentResponseSchema),
    ).or(TextDisplayComponentResponseSchema),
  ).array(),
  'stickers?': type(type(GuildStickerResponseSchema).or(StandardStickerResponseSchema)).array(),
  'sticker_items?': type(MessageStickerItemResponseSchema).array(),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: 'boolean',
  mention_everyone: 'boolean',
  tts: 'boolean',
  'call?': MessageCallResponseSchema,
  'activity?': MessageActivityResponseSchema,
  'application?': BasicApplicationResponseWithBotSchema,
  'application_id?': SnowflakeTypeSchema,
  'interaction?': MessageInteractionResponseSchema,
  'nonce?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      )
      .narrow(
        (data, ctx) => data >= -9223372036854776000n || ctx.mustBe('at least -9223372036854776000'),
      )
      .narrow(
        (data, ctx) => data <= 9223372036854776000n || ctx.mustBe('at most 9223372036854776000'),
      ),
  ).or(
    type('string').narrow(
      (data, ctx) => [...data].length <= 25 || ctx.mustBe('at most 25 characters'),
    ),
  ),
  'webhook_id?': SnowflakeTypeSchema,
  'message_reference?': MessageReferenceResponseSchema,
  'thread?': ThreadResponseSchema,
  'mention_channels?': type(MessageMentionChannelResponseSchema).array(),
  'role_subscription_data?': MessageRoleSubscriptionDataResponseSchema,
  'purchase_notification?': PurchaseNotificationResponseSchema,
  'position?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'resolved?': ResolvedObjectsResponseSchema,
  'poll?': PollResponseSchema,
  'shared_client_theme?': CustomClientThemeResponseSchema,
  'interaction_metadata?': type(
    type(ApplicationCommandInteractionMetadataResponseSchema).or(
      MessageComponentInteractionMetadataResponseSchema,
    ),
  ).or(ModalSubmitInteractionMetadataResponseSchema),
  'message_snapshots?': type(MessageSnapshotResponseSchema).array(),
  'lobby_member?': MessageLobbyMemberResponseSchema,
  'actor?': UserResponseSchema,
  'reactions?': type(MessageReactionResponseSchema).array(),
  'referenced_message?': type('null | null').or(BasicMessageResponseSchema),
})

export type MessageResponse = typeof MessageResponseSchema.infer

export const CreateMessageInteractionCallbackResponseSchema = type({
  type: InteractionCallbackTypesSchema,
  message: MessageResponseSchema,
})

export type CreateMessageInteractionCallbackResponse =
  typeof CreateMessageInteractionCallbackResponseSchema.infer

export const CreatePrivateChannelRequestSchema = type({
  'recipient_id?': type('null | null').or(SnowflakeTypeSchema),
  'access_tokens?': type(
    type(
      type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      ).array(),
    )
      .and(type('unknown[] <= 1521'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'nicks?': type(
    type({
      '[string]': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      ).or('null'),
    }),
  ).or('null'),
})

export type CreatePrivateChannelRequest = typeof CreatePrivateChannelRequestSchema.infer

export const RoleColorsSchema = type({
  'primary_color?': 'number.integer >= 0 & number.integer <= 16777215 | null',
  'secondary_color?': 'number.integer >= 0 & number.integer <= 16777215 | null',
  'tertiary_color?': 'number.integer >= 0 & number.integer <= 16777215 | null',
})

export type RoleColors = typeof RoleColorsSchema.infer

export const CreateRoleRequestSchema = type({
  'name?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  ).or('null'),
  'permissions?': 'number.integer | null',
  'color?': 'number.integer >= 0 & number.integer <= 16777215 | null',
  'colors?': type('null | null').or(RoleColorsSchema),
  'hoist?': 'boolean | null',
  'mentionable?': 'boolean | null',
  'icon?': 'string | null',
  'unicode_emoji?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
})

export type CreateRoleRequest = typeof CreateRoleRequestSchema.infer

export const CreateTextThreadWithMessageRequestSchema = type({
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'auto_archive_duration?': type('null | null').or(ThreadAutoArchiveDurationSchema),
  'rate_limit_per_user?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 & number.integer <= 21600 | null',
})

export type CreateTextThreadWithMessageRequest =
  typeof CreateTextThreadWithMessageRequestSchema.infer

export const CreateTextThreadWithoutMessageRequestSchema = type({
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'auto_archive_duration?': type('null | null').or(ThreadAutoArchiveDurationSchema),
  'rate_limit_per_user?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 & number.integer <= 21600 | null',
  'type?': type('null | null').or(ChannelTypesSchema),
  'invitable?': 'boolean | null',
})

export type CreateTextThreadWithoutMessageRequest =
  typeof CreateTextThreadWithoutMessageRequestSchema.infer

export const CreatedThreadResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  'last_message_id?': type('null | null').or(SnowflakeTypeSchema),
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'last_pin_timestamp?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  guild_id: SnowflakeTypeSchema,
  name: 'string',
  'parent_id?': type('null | null').or(SnowflakeTypeSchema),
  'rate_limit_per_user?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'bitrate?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'user_limit?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'rtc_region?': 'string | null',
  'video_quality_mode?': VideoQualityModesSchema,
  'permissions?': 'string',
  owner_id: SnowflakeTypeSchema,
  thread_metadata: ThreadMetadataResponseSchema,
  message_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  member_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  total_message_sent: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'applied_tags?': type(SnowflakeTypeSchema).array(),
  'member?': ThreadMemberResponseSchema,
})

export type CreatedThreadResponse = typeof CreatedThreadResponseSchema.infer

export const DefaultKeywordListTriggerMetadataSchema = type({
  'allow_list?': type(
    type(
      type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 60 || ctx.mustBe('at most 60 characters')),
      ).array(),
    ).and(type('unknown[] <= 1000')),
  ).or('null'),
  'presets?': type(
    type(AutomodKeywordPresetTypeSchema)
      .array()
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
})

export type DefaultKeywordListTriggerMetadata = typeof DefaultKeywordListTriggerMetadataSchema.infer

export const DefaultKeywordListTriggerMetadataResponseSchema = type({
  allow_list: 'string[]',
  presets: type(AutomodKeywordPresetTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
})

export type DefaultKeywordListTriggerMetadataResponse =
  typeof DefaultKeywordListTriggerMetadataResponseSchema.infer

export const FlagToChannelActionMetadataSchema = type({ channel_id: SnowflakeTypeSchema })

export type FlagToChannelActionMetadata = typeof FlagToChannelActionMetadataSchema.infer

export const FlagToChannelActionSchema = type({
  type: AutomodActionTypeSchema,
  metadata: FlagToChannelActionMetadataSchema,
})

export type FlagToChannelAction = typeof FlagToChannelActionSchema.infer

export const QuarantineUserActionMetadataSchema = type({})

export type QuarantineUserActionMetadata = typeof QuarantineUserActionMetadataSchema.infer

export const QuarantineUserActionSchema = type({
  type: AutomodActionTypeSchema,
  'metadata?': type('null | null').or(QuarantineUserActionMetadataSchema),
})

export type QuarantineUserAction = typeof QuarantineUserActionSchema.infer

export const UserCommunicationDisabledActionMetadataSchema = type({
  'duration_seconds?': 'number.integer >= 0 & number.integer <= 2419200 | null',
})

export type UserCommunicationDisabledActionMetadata =
  typeof UserCommunicationDisabledActionMetadataSchema.infer

export const UserCommunicationDisabledActionSchema = type({
  type: AutomodActionTypeSchema,
  metadata: UserCommunicationDisabledActionMetadataSchema,
})

export type UserCommunicationDisabledAction = typeof UserCommunicationDisabledActionSchema.infer

export const DefaultKeywordListUpsertRequestSchema = type({
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  event_type: AutomodEventTypeSchema,
  'actions?': type(
    type(
      type(
        type(
          type(type(BlockMessageActionSchema).or(FlagToChannelActionSchema)).or(
            QuarantineUserActionSchema,
          ),
        ).or(UserCommunicationDisabledActionSchema),
      ).array(),
    ).and(type('1 <= unknown[] <= 5')),
  ).or('null'),
  'enabled?': 'boolean | null',
  'exempt_roles?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 20'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'exempt_channels?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 50'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: DefaultKeywordListTriggerMetadataSchema,
})

export type DefaultKeywordListUpsertRequest = typeof DefaultKeywordListUpsertRequestSchema.infer

export const DefaultKeywordListUpsertRequestPartialSchema = type({
  'name?': type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  'event_type?': AutomodEventTypeSchema,
  'actions?': type(
    type(
      type(
        type(
          type(type(BlockMessageActionSchema).or(FlagToChannelActionSchema)).or(
            QuarantineUserActionSchema,
          ),
        ).or(UserCommunicationDisabledActionSchema),
      ).array(),
    ).and(type('1 <= unknown[] <= 5')),
  ).or('null'),
  'enabled?': 'boolean | null',
  'exempt_roles?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 20'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'exempt_channels?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 50'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'trigger_type?': AutomodTriggerTypeSchema,
  'trigger_metadata?': DefaultKeywordListTriggerMetadataSchema,
})

export type DefaultKeywordListUpsertRequestPartial =
  typeof DefaultKeywordListUpsertRequestPartialSchema.infer

export const FlagToChannelActionMetadataResponseSchema = type({ channel_id: SnowflakeTypeSchema })

export type FlagToChannelActionMetadataResponse =
  typeof FlagToChannelActionMetadataResponseSchema.infer

export const FlagToChannelActionResponseSchema = type({
  type: AutomodActionTypeSchema,
  metadata: FlagToChannelActionMetadataResponseSchema,
})

export type FlagToChannelActionResponse = typeof FlagToChannelActionResponseSchema.infer

export const QuarantineUserActionMetadataResponseSchema = type({})

export type QuarantineUserActionMetadataResponse =
  typeof QuarantineUserActionMetadataResponseSchema.infer

export const QuarantineUserActionResponseSchema = type({
  type: AutomodActionTypeSchema,
  metadata: QuarantineUserActionMetadataResponseSchema,
})

export type QuarantineUserActionResponse = typeof QuarantineUserActionResponseSchema.infer

export const UserCommunicationDisabledActionMetadataResponseSchema = type({
  duration_seconds: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type UserCommunicationDisabledActionMetadataResponse =
  typeof UserCommunicationDisabledActionMetadataResponseSchema.infer

export const UserCommunicationDisabledActionResponseSchema = type({
  type: AutomodActionTypeSchema,
  metadata: UserCommunicationDisabledActionMetadataResponseSchema,
})

export type UserCommunicationDisabledActionResponse =
  typeof UserCommunicationDisabledActionResponseSchema.infer

export const DefaultKeywordRuleResponseSchema = type({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: 'string',
  event_type: AutomodEventTypeSchema,
  actions: type(
    type(
      type(type(BlockMessageActionResponseSchema).or(FlagToChannelActionResponseSchema)).or(
        QuarantineUserActionResponseSchema,
      ),
    ).or(UserCommunicationDisabledActionResponseSchema),
  ).array(),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: 'boolean',
  exempt_roles: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  exempt_channels: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  trigger_metadata: DefaultKeywordListTriggerMetadataResponseSchema,
})

export type DefaultKeywordRuleResponse = typeof DefaultKeywordRuleResponseSchema.infer

export const IntegrationApplicationResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  icon: 'string | null',
  description: 'string',
  type: type('null | null').or(ApplicationTypesSchema),
  'cover_image?': 'string',
  'primary_sku_id?': SnowflakeTypeSchema,
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  flags_new: 'string',
  'bot?': UserResponseSchema,
})

export type IntegrationApplicationResponse = typeof IntegrationApplicationResponseSchema.infer

export const DiscordIntegrationResponseSchema = type({
  type: IntegrationTypesSchema,
  name: 'string | null',
  account: AccountResponseSchema,
  enabled: 'boolean',
  id: SnowflakeTypeSchema,
  application: IntegrationApplicationResponseSchema,
  scopes: type(OAuth2ScopesSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  'user?': UserResponseSchema,
})

export type DiscordIntegrationResponse = typeof DiscordIntegrationResponseSchema.infer

export const EmbeddedActivityLocationKindSchema = type(
  type(type("'gc'").describe('guild channel')).or(type("'pc'").describe('private channel')),
).or(type("'party'").describe('party'))

export type EmbeddedActivityLocationKind = typeof EmbeddedActivityLocationKindSchema.infer

export const GuildChannelLocationSchema = type({
  id: 'string',
  kind: EmbeddedActivityLocationKindSchema,
  channel_id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
})

export type GuildChannelLocation = typeof GuildChannelLocationSchema.infer

export const PrivateChannelLocationSchema = type({
  id: 'string',
  kind: EmbeddedActivityLocationKindSchema,
  channel_id: SnowflakeTypeSchema,
})

export type PrivateChannelLocation = typeof PrivateChannelLocationSchema.infer

export const EmbeddedActivityInstanceSchema = type({
  application_id: SnowflakeTypeSchema,
  instance_id: 'string',
  launch_id: 'string',
  location: type(GuildChannelLocationSchema).or(PrivateChannelLocationSchema),
  users: type(SnowflakeTypeSchema).array(),
})

export type EmbeddedActivityInstance = typeof EmbeddedActivityInstanceSchema.infer

export const EmojiResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  'user?': UserResponseSchema,
  roles: type(SnowflakeTypeSchema).array(),
  require_colons: 'boolean',
  managed: 'boolean',
  animated: 'boolean',
  available: 'boolean',
})

export type EmojiResponse = typeof EmojiResponseSchema.infer

export const EntitlementTypesSchema = type('8 | 10')

export type EntitlementTypes = typeof EntitlementTypesSchema.infer

export const EntitlementTenantFulfillmentStatusResponseSchema = type(
  '0 | 1 | 2 | 3 | 4 | 5 | 6 | 7',
)

export type EntitlementTenantFulfillmentStatusResponse =
  typeof EntitlementTenantFulfillmentStatusResponseSchema.infer

export const EntitlementResponseSchema = type({
  id: SnowflakeTypeSchema,
  sku_id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  'guild_id?': type('null | null').or(SnowflakeTypeSchema),
  deleted: 'boolean',
  starts_at: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  ends_at: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  type: EntitlementTypesSchema,
  'fulfilled_at?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  'fulfillment_status?': type('null | null').or(EntitlementTenantFulfillmentStatusResponseSchema),
  'consumed?': 'boolean',
  'gifter_user_id?': type('null | null').or(SnowflakeTypeSchema),
  'parent_id?': type('null | null').or(SnowflakeTypeSchema),
})

export type EntitlementResponse = typeof EntitlementResponseSchema.infer

export const EntityMetadataExternalSchema = type({
  location: type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
})

export type EntityMetadataExternal = typeof EntityMetadataExternalSchema.infer

export const EntityMetadataExternalResponseSchema = type({
  location: type('string').describe('Location of the external event'),
})

export type EntityMetadataExternalResponse = typeof EntityMetadataExternalResponseSchema.infer

export const EntityMetadataStageInstanceSchema = type({})

export type EntityMetadataStageInstance = typeof EntityMetadataStageInstanceSchema.infer

export const EntityMetadataStageInstanceResponseSchema = type({})

export type EntityMetadataStageInstanceResponse =
  typeof EntityMetadataStageInstanceResponseSchema.infer

export const EntityMetadataVoiceSchema = type({})

export type EntityMetadataVoice = typeof EntityMetadataVoiceSchema.infer

export const EntityMetadataVoiceResponseSchema = type({})

export type EntityMetadataVoiceResponse = typeof EntityMetadataVoiceResponseSchema.infer

export const IntegrationExpireBehaviorTypesSchema = type(type('0').describe('Remove role')).or(
  type('1').describe('Kick'),
)

export type IntegrationExpireBehaviorTypes = typeof IntegrationExpireBehaviorTypesSchema.infer

export const IntegrationExpireGracePeriodTypesSchema = type(
  type(
    type(type(type('1').describe('1 day')).or(type('3').describe('3 days'))).or(
      type('7').describe('7 days'),
    ),
  ).or(type('14').describe('14 days')),
).or(type('30').describe('30 days'))

export type IntegrationExpireGracePeriodTypes = typeof IntegrationExpireGracePeriodTypesSchema.infer

export const ExternalConnectionIntegrationResponseSchema = type({
  type: IntegrationTypesSchema,
  name: 'string | null',
  account: AccountResponseSchema,
  enabled: 'boolean',
  id: 'string',
  user: UserResponseSchema,
  'revoked?': 'boolean',
  'expire_behavior?': IntegrationExpireBehaviorTypesSchema,
  'expire_grace_period?': IntegrationExpireGracePeriodTypesSchema,
  'subscriber_count?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'synced_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  'role_id?': type('null | null').or(SnowflakeTypeSchema),
  'syncing?': 'boolean',
  'enable_emoticons?': 'boolean',
})

export type ExternalConnectionIntegrationResponse =
  typeof ExternalConnectionIntegrationResponseSchema.infer

export const GuildScheduledEventPrivacyLevelsSchema = type('2').describe(
  'the scheduled event is only accessible to guild members',
)

export type GuildScheduledEventPrivacyLevels = typeof GuildScheduledEventPrivacyLevelsSchema.infer

export const GuildScheduledEventEntityTypesSchema = type('0 | 1 | 2 | 3')

export type GuildScheduledEventEntityTypes = typeof GuildScheduledEventEntityTypesSchema.infer

export const RecurrenceRuleFrequenciesSchema = type('3 | 2 | 1 | 0')

export type RecurrenceRuleFrequencies = typeof RecurrenceRuleFrequenciesSchema.infer

export const RecurrenceRuleMonthsSchema = type('1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12')

export type RecurrenceRuleMonths = typeof RecurrenceRuleMonthsSchema.infer

export const RecurrenceRuleSchema = type({
  start: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('Starting time of the recurrence interval'),
  'end?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('Ending time of the recurrence interval'),
  frequency: RecurrenceRuleFrequenciesSchema.describe('How often the event occurs'),
  'interval?': type('number.integer >= -2147483648 & number.integer <= 2147483647 | null').describe(
    'The spacing between events, defined by frequency',
  ),
  'by_weekday?': type(
    type(type(RecurrenceRuleWeekdaysSchema).array())
      .and(type('unknown[] <= 7'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  )
    .or('null')
    .describe('Set of specific days within a week for the event to recur on'),
  'by_n_weekday?': type(type(type(ByNWeekdaySchema).array()).and(type('unknown[] <= 7')))
    .or('null')
    .describe('List of specific days within a specific week to recur on'),
  'by_month?': type(
    type(type(RecurrenceRuleMonthsSchema).array())
      .and(type('unknown[] <= 12'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  )
    .or('null')
    .describe('Set of specific months to recur on'),
  'by_month_day?': type(
    type(
      'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= -1 & number.integer <= 31[]',
    )
      .and(type('unknown[] <= 33'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  )
    .or('null')
    .describe('Set of specific dates within a month to recur on'),
  'by_year_day?': type(
    type(
      'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= -1 & number.integer <= 365[]',
    )
      .and(type('unknown[] <= 367'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  )
    .or('null')
    .describe('Set of days within a year to recur on (1-364)'),
  'count?': type('number.integer >= -2147483648 & number.integer <= 2147483647 | null').describe(
    'Total number of times the event is allowed to recur',
  ),
})

export type RecurrenceRule = typeof RecurrenceRuleSchema.infer

export const ExternalScheduledEventCreateRequestSchema = type({
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 1000 || ctx.mustBe('at most 1000 characters'),
    ),
  ).or('null'),
  'image?': 'string | null',
  scheduled_start_time: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  'scheduled_end_time?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  'channel_id?': type('null | null').or(SnowflakeTypeSchema),
  'recurrence_rule?': type('null | null')
    .or(RecurrenceRuleSchema)
    .describe('Recurrence rule for the scheduled event'),
  entity_metadata: EntityMetadataExternalSchema,
})

export type ExternalScheduledEventCreateRequest =
  typeof ExternalScheduledEventCreateRequestSchema.infer

export const GuildScheduledEventStatusesSchema = type('1 | 2 | 3 | 4')

export type GuildScheduledEventStatuses = typeof GuildScheduledEventStatusesSchema.infer

export const ExternalScheduledEventPatchRequestPartialSchema = type({
  'status?': type('null | null').or(GuildScheduledEventStatusesSchema),
  'name?': type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 1000 || ctx.mustBe('at most 1000 characters'),
    ),
  ).or('null'),
  'image?': 'string | null',
  'scheduled_start_time?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  'scheduled_end_time?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  'entity_type?': type('null | null').or(GuildScheduledEventEntityTypesSchema),
  'privacy_level?': GuildScheduledEventPrivacyLevelsSchema,
  'channel_id?': type('null | null').or(SnowflakeTypeSchema),
  'recurrence_rule?': type('null | null')
    .or(RecurrenceRuleSchema)
    .describe('Recurrence rule for the scheduled event'),
  'entity_metadata?': EntityMetadataExternalSchema,
})

export type ExternalScheduledEventPatchRequestPartial =
  typeof ExternalScheduledEventPatchRequestPartialSchema.infer

export const RecurrenceRuleResponseSchema = type({
  start: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('Starting time of the recurrence interval'),
  'end?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('Ending time of the recurrence interval'),
  frequency: RecurrenceRuleFrequenciesSchema.describe('How often the event occurs'),
  interval: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'The spacing between events, defined by frequency',
  ),
  by_weekday: type(
    type(RecurrenceRuleWeekdaysSchema)
      .array()
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  )
    .or('null')
    .describe('Set of specific days within a week for the event to recur on'),
  by_n_weekday: type(type(ByNWeekdayResponseSchema).array())
    .or('null')
    .describe('List of specific days within a specific week to recur on'),
  by_month: type(
    type(RecurrenceRuleMonthsSchema)
      .array()
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  )
    .or('null')
    .describe('Set of specific months to recur on'),
  by_month_day: type(
    type('number.integer >= -2147483648 & number.integer <= 2147483647[]').narrow(
      (data: unknown[], ctx) => new Set(data).size === data.length,
    ),
  )
    .or('null')
    .describe('Set of specific dates within a month to recur on'),
  'by_year_day?': type(
    type('number.integer >= -2147483648 & number.integer <= 2147483647[]').narrow(
      (data: unknown[], ctx) => new Set(data).size === data.length,
    ),
  )
    .or('null')
    .describe('Set of days within a year to recur on (1-364)'),
  'count?': type('number.integer >= -2147483648 & number.integer <= 2147483647 | null').describe(
    'Total number of times the event is allowed to recur',
  ),
})

export type RecurrenceRuleResponse = typeof RecurrenceRuleResponseSchema.infer

export const GuildScheduledEventUserResponsesSchema = type(
  type('0').describe('User is not interested in the event'),
).or(type('1').describe('User is interested in the event'))

export type GuildScheduledEventUserResponses = typeof GuildScheduledEventUserResponsesSchema.infer

export const ScheduledEventUserResponseSchema = type({
  guild_scheduled_event_id: SnowflakeTypeSchema.describe('ID of the scheduled event'),
  'guild_scheduled_event_exception_id?': type('null | null')
    .or(SnowflakeTypeSchema)
    .describe('ID of the scheduled event exception'),
  user_id: SnowflakeTypeSchema.describe('ID of the user'),
  'user?': UserResponseSchema.describe('User object for the RSVP user'),
  'member?': GuildMemberResponseSchema.describe('Guild member object for the RSVP user'),
  response: GuildScheduledEventUserResponsesSchema.describe("User's RSVP status for the event"),
})

export type ScheduledEventUserResponse = typeof ScheduledEventUserResponseSchema.infer

export const GuildScheduledEventExceptionResponseSchema = type({
  event_id: SnowflakeTypeSchema.describe('ID of the scheduled event this exception belongs to'),
  event_exception_id: SnowflakeTypeSchema.describe('ID of the event exception'),
  scheduled_start_time: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('Overridden start time of this occurrence'),
  scheduled_end_time: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('Overridden end time of this occurrence'),
  is_canceled: type('boolean').describe('Whether this occurrence is canceled'),
})

export type GuildScheduledEventExceptionResponse =
  typeof GuildScheduledEventExceptionResponseSchema.infer

export const ExternalScheduledEventResponseSchema = type({
  id: SnowflakeTypeSchema.describe('ID of the scheduled event'),
  guild_id: SnowflakeTypeSchema.describe('ID of the guild the scheduled event belongs to'),
  name: type('string').describe('Name of the scheduled event'),
  description: type('string | null').describe('Description of the scheduled event'),
  channel_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe(
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    ),
  creator_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe('ID of the user that created the scheduled event'),
  'creator?': UserResponseSchema.describe('User that created the scheduled event'),
  image: type('string | null').describe('Cover image hash of the scheduled event'),
  scheduled_start_time: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('When the scheduled event will start'),
  scheduled_end_time: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('When the scheduled event will end, or null if no end time'),
  status: GuildScheduledEventStatusesSchema.describe('Status of the scheduled event'),
  entity_type: GuildScheduledEventEntityTypesSchema.describe(
    'Type of hosting entity associated with the scheduled event',
  ),
  entity_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe('ID of the hosting entity associated with the scheduled event'),
  recurrence_rule: type('null | null')
    .or(RecurrenceRuleResponseSchema)
    .describe('Recurrence rule for the scheduled event, or null if not recurring'),
  'user_count?': type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'Number of users subscribed to the scheduled event',
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.describe(
    'Privacy level of the scheduled event',
  ),
  'user_rsvp?': type('null | null').or(ScheduledEventUserResponseSchema),
  guild_scheduled_event_exceptions: type(GuildScheduledEventExceptionResponseSchema).array(),
  entity_metadata: EntityMetadataExternalResponseSchema,
})

export type ExternalScheduledEventResponse = typeof ExternalScheduledEventResponseSchema.infer

export const FileUploadComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'min_values?': 'number.integer >= 0 & number.integer <= 10 | null',
  'max_values?': 'number.integer >= 1 & number.integer <= 10 | null',
  'required?': 'boolean | null',
  'file_types?': type(
    type(
      type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 16 || ctx.mustBe('at most 16 characters')),
      ).array(),
    )
      .and(type('unknown[] <= 10'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
})

export type FileUploadComponentForModalRequest =
  typeof FileUploadComponentForModalRequestSchema.infer

export const InviteTypesSchema = type('0 | 1 | 2')

export type InviteTypes = typeof InviteTypesSchema.infer

export const InviteChannelRecipientResponseSchema = type({
  id: SnowflakeTypeSchema,
  username: 'string',
  avatar: 'string | null',
})

export type InviteChannelRecipientResponse = typeof InviteChannelRecipientResponseSchema.infer

export const InviteChannelResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: ChannelTypesSchema,
  name: 'string | null',
  'icon?': 'string',
  'nsfw?': 'boolean',
  'recipients?': type(InviteChannelRecipientResponseSchema).array(),
})

export type InviteChannelResponse = typeof InviteChannelResponseSchema.infer

export const FriendInviteResponseSchema = type({
  type: InviteTypesSchema,
  code: 'string',
  'inviter?': UserResponseSchema,
  'max_age?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'created_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  expires_at: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  'friends_count?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  channel: type('null | null').or(InviteChannelResponseSchema),
  'is_contact?': 'boolean',
  'uses?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'max_uses?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'flags?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type FriendInviteResponse = typeof FriendInviteResponseSchema.infer

export const GatewayBotSessionStartLimitResponseSchema = type({
  max_concurrency: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  remaining: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  reset_after: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  total: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type GatewayBotSessionStartLimitResponse =
  typeof GatewayBotSessionStartLimitResponseSchema.infer

export const GatewayBotResponseSchema = type({
  url: 'string.url',
  session_start_limit: GatewayBotSessionStartLimitResponseSchema,
  shards: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type GatewayBotResponse = typeof GatewayBotResponseSchema.infer

export const GatewayResponseSchema = type({ url: 'string.url' })

export type GatewayResponse = typeof GatewayResponseSchema.infer

export const GithubAuthorSchema = type({
  'username?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
})

export type GithubAuthor = typeof GithubAuthorSchema.infer

export const GithubCheckAppSchema = type({
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
})

export type GithubCheckApp = typeof GithubCheckAppSchema.infer

export const GithubCheckPullRequestSchema = type({ number: 'number.integer' })

export type GithubCheckPullRequest = typeof GithubCheckPullRequestSchema.infer

export const GithubCheckSuiteSchema = type({
  'conclusion?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'head_branch?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  head_sha: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
  'pull_requests?': type(
    type(type(GithubCheckPullRequestSchema).array()).and(type('unknown[] <= 1521')),
  ).or('null'),
  app: GithubCheckAppSchema,
})

export type GithubCheckSuite = typeof GithubCheckSuiteSchema.infer

export const GithubCheckRunOutputSchema = type({
  'title?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'summary?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
})

export type GithubCheckRunOutput = typeof GithubCheckRunOutputSchema.infer

export const GithubCheckRunSchema = type({
  'conclusion?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
  html_url: type('string.url').narrow(
    (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
  ),
  check_suite: GithubCheckSuiteSchema,
  'details_url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'output?': type('null | null').or(GithubCheckRunOutputSchema),
  'pull_requests?': type(
    type(type(GithubCheckPullRequestSchema).array()).and(type('unknown[] <= 1521')),
  ).or('null'),
})

export type GithubCheckRun = typeof GithubCheckRunSchema.infer

export const GithubUserSchema = type({
  id: 'number.integer',
  login: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
  html_url: type('string.url').narrow(
    (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
  ),
  avatar_url: type('string.url').narrow(
    (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
  ),
})

export type GithubUser = typeof GithubUserSchema.infer

export const GithubCommentSchema = type({
  id: 'number.integer',
  html_url: type('string.url').narrow(
    (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
  ),
  user: GithubUserSchema,
  'commit_id?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  body: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
})

export type GithubComment = typeof GithubCommentSchema.infer

export const GithubCommitSchema = type({
  id: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
  url: type('string.url').narrow(
    (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
  ),
  message: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
  author: GithubAuthorSchema,
})

export type GithubCommit = typeof GithubCommitSchema.infer

export const GithubDiscussionSchema = type({
  title: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
  number: 'number.integer',
  html_url: type('string.url').narrow(
    (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
  ),
  'answer_html_url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'body?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  user: GithubUserSchema,
})

export type GithubDiscussion = typeof GithubDiscussionSchema.infer

export const GithubIssueSchema = type({
  id: 'number.integer',
  number: 'number.integer',
  html_url: type('string.url').narrow(
    (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
  ),
  user: GithubUserSchema,
  title: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
  'body?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'pull_request?': 'unknown',
})

export type GithubIssue = typeof GithubIssueSchema.infer

export const GithubReleaseSchema = type({
  id: 'number.integer',
  tag_name: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
  html_url: type('string.url').narrow(
    (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
  ),
  author: GithubUserSchema,
})

export type GithubRelease = typeof GithubReleaseSchema.infer

export const GithubRepositorySchema = type({
  id: 'number.integer',
  html_url: type('string.url').narrow(
    (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
  ),
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
  full_name: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
})

export type GithubRepository = typeof GithubRepositorySchema.infer

export const GithubReviewSchema = type({
  user: GithubUserSchema,
  'body?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  html_url: type('string.url').narrow(
    (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
  ),
  state: type('string').narrow(
    (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
  ),
})

export type GithubReview = typeof GithubReviewSchema.infer

export const GithubWebhookSchema = type({
  'action?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'ref?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'ref_type?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'comment?': type('null | null').or(GithubCommentSchema),
  'issue?': type('null | null').or(GithubIssueSchema),
  'pull_request?': type('null | null').or(GithubIssueSchema),
  'repository?': type('null | null').or(GithubRepositorySchema),
  'forkee?': type('null | null').or(GithubRepositorySchema),
  sender: GithubUserSchema,
  'member?': type('null | null').or(GithubUserSchema),
  'release?': type('null | null').or(GithubReleaseSchema),
  'head_commit?': type('null | null').or(GithubCommitSchema),
  'commits?': type(type(type(GithubCommitSchema).array()).and(type('unknown[] <= 1521'))).or(
    'null',
  ),
  'forced?': 'boolean | null',
  'compare?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'review?': type('null | null').or(GithubReviewSchema),
  'check_run?': type('null | null').or(GithubCheckRunSchema),
  'check_suite?': type('null | null').or(GithubCheckSuiteSchema),
  'discussion?': type('null | null').or(GithubDiscussionSchema),
  'answer?': type('null | null').or(GithubCommentSchema),
})

export type GithubWebhook = typeof GithubWebhookSchema.infer

export const GroupDMInviteResponseSchema = type({
  type: InviteTypesSchema,
  code: 'string',
  'inviter?': UserResponseSchema,
  'max_age?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'created_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  expires_at: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  channel: InviteChannelResponseSchema,
  'approximate_member_count?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
})

export type GroupDMInviteResponse = typeof GroupDMInviteResponseSchema.infer

export const PartialDiscordIntegrationResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: 'string | null',
  account: AccountResponseSchema,
  application_id: SnowflakeTypeSchema,
})

export type PartialDiscordIntegrationResponse = typeof PartialDiscordIntegrationResponseSchema.infer

export const PartialExternalConnectionIntegrationResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: 'string | null',
  account: AccountResponseSchema,
})

export type PartialExternalConnectionIntegrationResponse =
  typeof PartialExternalConnectionIntegrationResponseSchema.infer

export const PartialGuildSubscriptionIntegrationResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: IntegrationTypesSchema,
  name: 'string | null',
  account: AccountResponseSchema,
})

export type PartialGuildSubscriptionIntegrationResponse =
  typeof PartialGuildSubscriptionIntegrationResponseSchema.infer

export const GuildIncomingWebhookResponseSchema = type({
  application_id: type('null | null').or(SnowflakeTypeSchema),
  avatar: 'string | null',
  channel_id: type('null | null').or(SnowflakeTypeSchema),
  'guild_id?': type('null | null').or(SnowflakeTypeSchema),
  id: SnowflakeTypeSchema,
  name: 'string',
  type: WebhookTypesSchema,
  'user?': UserResponseSchema,
  'token?': 'string',
  'url?': 'string.url',
})

export type GuildIncomingWebhookResponse = typeof GuildIncomingWebhookResponseSchema.infer

export const StageScheduledEventResponseSchema = type({
  id: SnowflakeTypeSchema.describe('ID of the scheduled event'),
  guild_id: SnowflakeTypeSchema.describe('ID of the guild the scheduled event belongs to'),
  name: type('string').describe('Name of the scheduled event'),
  description: type('string | null').describe('Description of the scheduled event'),
  channel_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe(
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    ),
  creator_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe('ID of the user that created the scheduled event'),
  'creator?': UserResponseSchema.describe('User that created the scheduled event'),
  image: type('string | null').describe('Cover image hash of the scheduled event'),
  scheduled_start_time: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('When the scheduled event will start'),
  scheduled_end_time: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('When the scheduled event will end, or null if no end time'),
  status: GuildScheduledEventStatusesSchema.describe('Status of the scheduled event'),
  entity_type: GuildScheduledEventEntityTypesSchema.describe(
    'Type of hosting entity associated with the scheduled event',
  ),
  entity_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe('ID of the hosting entity associated with the scheduled event'),
  recurrence_rule: type('null | null')
    .or(RecurrenceRuleResponseSchema)
    .describe('Recurrence rule for the scheduled event, or null if not recurring'),
  'user_count?': type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'Number of users subscribed to the scheduled event',
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.describe(
    'Privacy level of the scheduled event',
  ),
  'user_rsvp?': type('null | null').or(ScheduledEventUserResponseSchema),
  guild_scheduled_event_exceptions: type(GuildScheduledEventExceptionResponseSchema).array(),
  entity_metadata: type('null | null').or(EntityMetadataStageInstanceResponseSchema),
})

export type StageScheduledEventResponse = typeof StageScheduledEventResponseSchema.infer

export const VoiceScheduledEventResponseSchema = type({
  id: SnowflakeTypeSchema.describe('ID of the scheduled event'),
  guild_id: SnowflakeTypeSchema.describe('ID of the guild the scheduled event belongs to'),
  name: type('string').describe('Name of the scheduled event'),
  description: type('string | null').describe('Description of the scheduled event'),
  channel_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe(
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    ),
  creator_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe('ID of the user that created the scheduled event'),
  'creator?': UserResponseSchema.describe('User that created the scheduled event'),
  image: type('string | null').describe('Cover image hash of the scheduled event'),
  scheduled_start_time: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('When the scheduled event will start'),
  scheduled_end_time: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('When the scheduled event will end, or null if no end time'),
  status: GuildScheduledEventStatusesSchema.describe('Status of the scheduled event'),
  entity_type: GuildScheduledEventEntityTypesSchema.describe(
    'Type of hosting entity associated with the scheduled event',
  ),
  entity_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe('ID of the hosting entity associated with the scheduled event'),
  recurrence_rule: type('null | null')
    .or(RecurrenceRuleResponseSchema)
    .describe('Recurrence rule for the scheduled event, or null if not recurring'),
  'user_count?': type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'Number of users subscribed to the scheduled event',
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.describe(
    'Privacy level of the scheduled event',
  ),
  'user_rsvp?': type('null | null').or(ScheduledEventUserResponseSchema),
  guild_scheduled_event_exceptions: type(GuildScheduledEventExceptionResponseSchema).array(),
  entity_metadata: type('null | null').or(EntityMetadataVoiceResponseSchema),
})

export type VoiceScheduledEventResponse = typeof VoiceScheduledEventResponseSchema.infer

export const KeywordTriggerMetadataResponseSchema = type({
  keyword_filter: 'string[]',
  regex_patterns: 'string[]',
  allow_list: 'string[]',
})

export type KeywordTriggerMetadataResponse = typeof KeywordTriggerMetadataResponseSchema.infer

export const KeywordRuleResponseSchema = type({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: 'string',
  event_type: AutomodEventTypeSchema,
  actions: type(
    type(
      type(type(BlockMessageActionResponseSchema).or(FlagToChannelActionResponseSchema)).or(
        QuarantineUserActionResponseSchema,
      ),
    ).or(UserCommunicationDisabledActionResponseSchema),
  ).array(),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: 'boolean',
  exempt_roles: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  exempt_channels: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  trigger_metadata: KeywordTriggerMetadataResponseSchema,
})

export type KeywordRuleResponse = typeof KeywordRuleResponseSchema.infer

export const MLSpamTriggerMetadataResponseSchema = type({})

export type MLSpamTriggerMetadataResponse = typeof MLSpamTriggerMetadataResponseSchema.infer

export const MLSpamRuleResponseSchema = type({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: 'string',
  event_type: AutomodEventTypeSchema,
  actions: type(
    type(
      type(type(BlockMessageActionResponseSchema).or(FlagToChannelActionResponseSchema)).or(
        QuarantineUserActionResponseSchema,
      ),
    ).or(UserCommunicationDisabledActionResponseSchema),
  ).array(),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: 'boolean',
  exempt_roles: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  exempt_channels: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  trigger_metadata: MLSpamTriggerMetadataResponseSchema,
})

export type MLSpamRuleResponse = typeof MLSpamRuleResponseSchema.infer

export const MentionSpamTriggerMetadataResponseSchema = type({
  mention_total_limit: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  mention_raid_protection_enabled: 'boolean',
})

export type MentionSpamTriggerMetadataResponse =
  typeof MentionSpamTriggerMetadataResponseSchema.infer

export const MentionSpamRuleResponseSchema = type({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: 'string',
  event_type: AutomodEventTypeSchema,
  actions: type(
    type(
      type(type(BlockMessageActionResponseSchema).or(FlagToChannelActionResponseSchema)).or(
        QuarantineUserActionResponseSchema,
      ),
    ).or(UserCommunicationDisabledActionResponseSchema),
  ).array(),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: 'boolean',
  exempt_roles: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  exempt_channels: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  trigger_metadata: MentionSpamTriggerMetadataResponseSchema,
})

export type MentionSpamRuleResponse = typeof MentionSpamRuleResponseSchema.infer

export const UserProfileMetadataResponseSchema = type({
  keyword_filter: 'string[]',
  regex_patterns: 'string[]',
  allow_list: 'string[]',
})

export type UserProfileMetadataResponse = typeof UserProfileMetadataResponseSchema.infer

export const UserProfileRuleResponseSchema = type({
  id: SnowflakeTypeSchema,
  guild_id: SnowflakeTypeSchema,
  creator_id: SnowflakeTypeSchema,
  name: 'string',
  event_type: AutomodEventTypeSchema,
  actions: type(
    type(
      type(type(BlockMessageActionResponseSchema).or(FlagToChannelActionResponseSchema)).or(
        QuarantineUserActionResponseSchema,
      ),
    ).or(UserCommunicationDisabledActionResponseSchema),
  ).array(),
  trigger_type: AutomodTriggerTypeSchema,
  enabled: 'boolean',
  exempt_roles: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  exempt_channels: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  trigger_metadata: UserProfileMetadataResponseSchema,
})

export type UserProfileRuleResponse = typeof UserProfileRuleResponseSchema.infer

export const GuildAuditLogResponseSchema = type({
  audit_log_entries: type(AuditLogEntryResponseSchema).array(),
  users: type(UserResponseSchema).array(),
  integrations: type(
    type(
      type(PartialDiscordIntegrationResponseSchema).or(
        PartialExternalConnectionIntegrationResponseSchema,
      ),
    ).or(PartialGuildSubscriptionIntegrationResponseSchema),
  ).array(),
  webhooks: type(
    type(
      type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
    ).or(GuildIncomingWebhookResponseSchema),
  ).array(),
  guild_scheduled_events: type(
    type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
      VoiceScheduledEventResponseSchema,
    ),
  ).array(),
  threads: type(ThreadResponseSchema).array(),
  application_commands: type(ApplicationCommandResponseSchema).array(),
  auto_moderation_rules: type(
    type(
      type(
        type(
          type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
            MLSpamRuleResponseSchema,
          ),
        ).or(MentionSpamRuleResponseSchema),
      ).or(UserProfileRuleResponseSchema),
    ).or('null | null'),
  ).array(),
})

export type GuildAuditLogResponse = typeof GuildAuditLogResponseSchema.infer

export const GuildBanResponseSchema = type({ user: UserResponseSchema, reason: 'string | null' })

export type GuildBanResponse = typeof GuildBanResponseSchema.infer

export const GuildExplicitContentFilterTypesSchema = type(
  type(type('0').describe('media content will not be scanned')).or(
    type('1').describe('media content sent by members without roles will be scanned'),
  ),
).or(type('2').describe('media content sent by all members will be scanned'))

export type GuildExplicitContentFilterTypes = typeof GuildExplicitContentFilterTypesSchema.infer

export const GuildFeaturesSchema = type(
  type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(
                    type(
                      type(
                        type(
                          type(
                            type(
                              type(
                                type(
                                  type(
                                    type(
                                      type(
                                        type(
                                          type(
                                            type(
                                              type(
                                                type(
                                                  type(
                                                    type(
                                                      type(
                                                        type("'ANIMATED_BANNER'").describe(
                                                          'guild has access to set an animated guild banner image',
                                                        ),
                                                      ).or(
                                                        type("'ANIMATED_ICON'").describe(
                                                          'guild has access to set an animated guild icon',
                                                        ),
                                                      ),
                                                    ).or(
                                                      type(
                                                        "'APPLICATION_COMMAND_PERMISSIONS_V2'",
                                                      ).describe(
                                                        'guild is using the old permissions configuration behavior',
                                                      ),
                                                    ),
                                                  ).or(
                                                    type("'AUTO_MODERATION'").describe(
                                                      'guild has set up auto moderation rules',
                                                    ),
                                                  ),
                                                ).or(
                                                  type("'BANNER'").describe(
                                                    'guild has access to set a guild banner image',
                                                  ),
                                                ),
                                              ).or(
                                                type("'COMMUNITY'").describe(
                                                  'guild can enable welcome screen, Membership Screening, stage channels and discovery, and             receives community updates',
                                                ),
                                              ),
                                            ).or(
                                              type("'CREATOR_MONETIZABLE_PROVISIONAL'").describe(
                                                'guild has enabled monetization',
                                              ),
                                            ),
                                          ).or(
                                            type("'CREATOR_STORE_PAGE'").describe(
                                              'guild has enabled the role subscription promo page',
                                            ),
                                          ),
                                        ).or(
                                          type("'DEVELOPER_SUPPORT_SERVER'").describe(
                                            'guild has been set as a support server on the App Directory',
                                          ),
                                        ),
                                      ).or(
                                        type("'DISCOVERABLE'").describe(
                                          'guild is able to be discovered in the directory',
                                        ),
                                      ),
                                    ).or(
                                      type("'FEATURABLE'").describe(
                                        'guild is able to be featured in the directory',
                                      ),
                                    ),
                                  ).or(
                                    type("'INVITES_DISABLED'").describe(
                                      'guild has paused invites, preventing new users from joining',
                                    ),
                                  ),
                                ).or(
                                  type("'INVITE_SPLASH'").describe(
                                    'guild has access to set an invite splash background',
                                  ),
                                ),
                              ).or(
                                type("'MEMBER_VERIFICATION_GATE_ENABLED'").describe(
                                  'guild has enabled Membership Screening',
                                ),
                              ),
                            ).or(
                              type("'MORE_STICKERS'").describe(
                                'guild has increased custom sticker slots',
                              ),
                            ),
                          ).or(
                            type("'NEWS'").describe(
                              'guild has access to create announcement channels',
                            ),
                          ),
                        ).or(type("'PARTNERED'").describe('guild is partnered')),
                      ).or(
                        type("'PREVIEW_ENABLED'").describe(
                          'guild can be previewed before joining via Membership Screening or the directory',
                        ),
                      ),
                    ).or(
                      type("'RAID_ALERTS_DISABLED'").describe(
                        'guild has disabled activity alerts in the configured safety alerts channel',
                      ),
                    ),
                  ).or(
                    type("'PRUNE_REQUIRES_ADMIN'").describe(
                      'guild has restricted member prune to administrators and the guild owner',
                    ),
                  ),
                ).or(type("'ROLE_ICONS'").describe('guild is able to set role icons')),
              ).or(
                type("'ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE'").describe(
                  'guild has role subscriptions that can be purchased',
                ),
              ),
            ).or(
              type("'ROLE_SUBSCRIPTIONS_ENABLED'").describe('guild has enabled role subscriptions'),
            ),
          ).or(type("'TICKETED_EVENTS_ENABLED'").describe('guild has enabled ticketed events')),
        ).or(type("'VANITY_URL'").describe('guild has access to set a vanity URL')),
      ).or(type("'VERIFIED'").describe('guild is verified')),
    ).or(
      type("'VIP_REGIONS'").describe(
        'guild has access to set 384kbps bitrate in voice (previously VIP voice servers)',
      ),
    ),
  ).or(type("'WELCOME_SCREEN_ENABLED'").describe('guild has enabled the welcome screen')),
).or(type("'OFFICIAL_GAME_GUILD'").describe('guild is an official guild for one or more games'))

export type GuildFeatures = typeof GuildFeaturesSchema.infer

export const WelcomeMessageResponseSchema = type({
  author_ids: type(SnowflakeTypeSchema).array(),
  message: 'string',
})

export type WelcomeMessageResponse = typeof WelcomeMessageResponseSchema.infer

export const NewMemberActionTypeSchema = type('0 | 1')

export type NewMemberActionType = typeof NewMemberActionTypeSchema.infer

export const SettingsEmojiResponseSchema = type({
  id: type('null | null').or(SnowflakeTypeSchema),
  name: 'string | null',
  animated: 'boolean',
})

export type SettingsEmojiResponse = typeof SettingsEmojiResponseSchema.infer

export const NewMemberActionResponseSchema = type({
  channel_id: SnowflakeTypeSchema,
  action_type: NewMemberActionTypeSchema,
  title: 'string',
  description: 'string',
  'emoji?': SettingsEmojiResponseSchema,
  'icon?': 'string',
})

export type NewMemberActionResponse = typeof NewMemberActionResponseSchema.infer

export const ResourceChannelResponseSchema = type({
  channel_id: SnowflakeTypeSchema,
  title: 'string',
  'emoji?': SettingsEmojiResponseSchema,
  'icon?': 'string',
  description: 'string',
})

export type ResourceChannelResponse = typeof ResourceChannelResponseSchema.infer

export const GuildHomeSettingsResponseSchema = type({
  guild_id: SnowflakeTypeSchema,
  enabled: 'boolean',
  'welcome_message?': WelcomeMessageResponseSchema,
  new_member_actions: type(NewMemberActionResponseSchema).array(),
  resource_channels: type(ResourceChannelResponseSchema).array(),
})

export type GuildHomeSettingsResponse = typeof GuildHomeSettingsResponseSchema.infer

export const GuildIncidentActionsRequestSchema = type({
  'invites_disabled_until?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('When invites will be enabled again'),
  'dms_disabled_until?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('When direct messages will be enabled again'),
})

export type GuildIncidentActionsRequest = typeof GuildIncidentActionsRequestSchema.infer

export const GuildIncidentsDataResponseSchema = type({
  invites_disabled_until: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('When invites get enabled again'),
  dms_disabled_until: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('When direct messages get enabled again'),
})

export type GuildIncidentsDataResponse = typeof GuildIncidentsDataResponseSchema.infer

export const VerificationLevelsSchema = type(
  type(
    type(
      type(type('0').describe('unrestricted')).or(
        type('1').describe('must have verified email on account'),
      ),
    ).or(type('2').describe('must be registered on Discord for longer than 5 minutes')),
  ).or(type('3').describe('must be a member of the server for longer than 10 minutes')),
).or(type('4').describe('must have a verified phone number'))

export type VerificationLevels = typeof VerificationLevelsSchema.infer

export const GuildNSFWContentLevelSchema = type('0 | 1 | 2 | 3')

export type GuildNSFWContentLevel = typeof GuildNSFWContentLevelSchema.infer

export const InviteGuildResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  splash: 'string | null',
  banner: 'string | null',
  description: 'string | null',
  icon: 'string | null',
  features: type(GuildFeaturesSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  verification_level: type('null | null').or(VerificationLevelsSchema),
  vanity_url_code: 'string | null',
  nsfw_level: type('null | null').or(GuildNSFWContentLevelSchema),
  nsfw: 'boolean | null',
  premium_subscription_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type InviteGuildResponse = typeof InviteGuildResponseSchema.infer

export const InviteApplicationResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  icon: 'string | null',
  description: 'string',
  type: type('null | null').or(ApplicationTypesSchema),
  'cover_image?': 'string',
  'primary_sku_id?': SnowflakeTypeSchema,
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  flags_new: 'string',
  'bot?': UserResponseSchema,
  'slug?': 'string',
  'conjure_project_id?': SnowflakeTypeSchema,
  'vibegrations_project_id?': SnowflakeTypeSchema,
  'guild_id?': SnowflakeTypeSchema,
  'rpc_origins?': 'string[]',
  'bot_public?': 'boolean',
  'bot_require_code_grant?': 'boolean',
  'terms_of_service_url?': 'string.url',
  'privacy_policy_url?': 'string.url',
  'custom_install_url?': 'string.url',
  'install_params?': ApplicationOAuth2InstallParamsResponseSchema,
  'integration_types_config?': type({
    '[string]': ApplicationIntegrationTypeConfigurationResponseSchema,
  }),
  verify_key: 'string',
  'max_participants?': 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  'tags?': type('string[]').narrow((data: unknown[], ctx) => new Set(data).size === data.length),
})

export type InviteApplicationResponse = typeof InviteApplicationResponseSchema.infer

export const ScheduledEventResponseSchema = type({
  id: SnowflakeTypeSchema.describe('ID of the scheduled event'),
  guild_id: SnowflakeTypeSchema.describe('ID of the guild the scheduled event belongs to'),
  name: type('string').describe('Name of the scheduled event'),
  description: type('string | null').describe('Description of the scheduled event'),
  channel_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe(
      'Channel ID in which the scheduled event will be hosted, or null if entity type is EXTERNAL',
    ),
  creator_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe('ID of the user that created the scheduled event'),
  'creator?': UserResponseSchema.describe('User that created the scheduled event'),
  image: type('string | null').describe('Cover image hash of the scheduled event'),
  scheduled_start_time: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('When the scheduled event will start'),
  scheduled_end_time: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('When the scheduled event will end, or null if no end time'),
  status: GuildScheduledEventStatusesSchema.describe('Status of the scheduled event'),
  entity_type: GuildScheduledEventEntityTypesSchema.describe(
    'Type of hosting entity associated with the scheduled event',
  ),
  entity_id: type('null | null')
    .or(SnowflakeTypeSchema)
    .describe('ID of the hosting entity associated with the scheduled event'),
  recurrence_rule: type('null | null')
    .or(RecurrenceRuleResponseSchema)
    .describe('Recurrence rule for the scheduled event, or null if not recurring'),
  'user_count?': type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'Number of users subscribed to the scheduled event',
  ),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema.describe(
    'Privacy level of the scheduled event',
  ),
  'user_rsvp?': type('null | null').or(ScheduledEventUserResponseSchema),
  guild_scheduled_event_exceptions: type(GuildScheduledEventExceptionResponseSchema).array(),
})

export type ScheduledEventResponse = typeof ScheduledEventResponseSchema.infer

export const InviteGuildRoleResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  position: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  color: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  colors: GuildRoleColorsResponseSchema,
  icon: 'string | null',
  unicode_emoji: 'string | null',
  'permissions?': 'string',
})

export type InviteGuildRoleResponse = typeof InviteGuildRoleResponseSchema.infer

export const GuildInviteResponseSchema = type({
  type: InviteTypesSchema,
  code: 'string',
  'inviter?': UserResponseSchema,
  'max_age?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'created_at?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  expires_at: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  'is_contact?': 'boolean',
  'flags?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  guild: InviteGuildResponseSchema,
  guild_id: SnowflakeTypeSchema,
  channel: InviteChannelResponseSchema,
  'target_type?': InviteTargetTypesSchema,
  'target_user?': UserResponseSchema,
  'target_application?': InviteApplicationResponseSchema,
  'guild_scheduled_event?': ScheduledEventResponseSchema,
  'target_channel_id?': SnowflakeTypeSchema,
  'target_message_id?': SnowflakeTypeSchema,
  'uses?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'max_uses?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'temporary?': 'boolean',
  'approximate_member_count?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  'approximate_presence_count?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  'is_nickname_changeable?': 'boolean',
  'roles?': type(type(InviteGuildRoleResponseSchema).array()).or('null'),
})

export type GuildInviteResponse = typeof GuildInviteResponseSchema.infer

export const GuildJoinRequestApplicationStatusSchema = type(
  type(
    type(type("'STARTED'").describe('Applicant started but not yet submitted join request')).or(
      type("'SUBMITTED'").describe('Applicant submitted join request that is awaiting review'),
    ),
  ).or(type("'REJECTED'").describe('Join request rejected')),
).or(type("'APPROVED'").describe('Join request approved'))

export type GuildJoinRequestApplicationStatus = typeof GuildJoinRequestApplicationStatusSchema.infer

export const GuildMemberVerificationFormFieldTypeSchema = type(
  type(
    type(type("'TERMS'").describe('Field requiring applicant to acknowledge list of terms')).or(
      type("'TEXT_INPUT'").describe('Short text input field'),
    ),
  ).or(type("'PARAGRAPH'").describe('Long-form text input field')),
).or(type("'MULTIPLE_CHOICE'").describe('Field where applicant selects one of many options'))

export type GuildMemberVerificationFormFieldType =
  typeof GuildMemberVerificationFormFieldTypeSchema.infer

export const MultipleChoiceFormFieldResponseSchema = type({
  field_type: GuildMemberVerificationFormFieldTypeSchema.describe('Type of form field'),
  'label?': type('string').describe('Label shown above field'),
  'description?': type('string').describe('Optional helper text shown below label'),
  'required?': type('boolean').describe('Whether applicant must fill in field'),
  choices: type('string[]').describe('Choices applicant can select from'),
  'response?': type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'Index of choice selected by applicant',
  ),
})

export type MultipleChoiceFormFieldResponse = typeof MultipleChoiceFormFieldResponseSchema.infer

export const ParagraphFormFieldResponseSchema = type({
  field_type: GuildMemberVerificationFormFieldTypeSchema.describe('Type of form field'),
  'label?': type('string').describe('Label shown above field'),
  'description?': type('string').describe('Optional helper text shown below label'),
  'required?': type('boolean').describe('Whether applicant must fill in field'),
  'placeholder?': type('string').describe('Placeholder text shown in empty input'),
  'response?': type('string').describe("Applicant's text response"),
})

export type ParagraphFormFieldResponse = typeof ParagraphFormFieldResponseSchema.infer

export const TermsFormFieldResponseSchema = type({
  field_type: GuildMemberVerificationFormFieldTypeSchema.describe('Type of form field'),
  'label?': type('string').describe('Label shown above field'),
  'description?': type('string').describe('Optional helper text shown below label'),
  'required?': type('boolean').describe('Whether applicant must fill in field'),
  values: type('string[]').describe('Terms applicant must acknowledge'),
  'response?': type('boolean').describe('Whether applicant accepted terms'),
})

export type TermsFormFieldResponse = typeof TermsFormFieldResponseSchema.infer

export const TextInputFormFieldResponseSchema = type({
  field_type: GuildMemberVerificationFormFieldTypeSchema.describe('Type of form field'),
  'label?': type('string').describe('Label shown above field'),
  'description?': type('string').describe('Optional helper text shown below label'),
  'required?': type('boolean').describe('Whether applicant must fill in field'),
  'placeholder?': type('string').describe('Placeholder text shown in empty input'),
  'response?': type('string').describe("Applicant's text response"),
})

export type TextInputFormFieldResponse = typeof TextInputFormFieldResponseSchema.infer

export const GuildJoinRequestResponseSchema = type({
  id: SnowflakeTypeSchema,
  created_at: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  reviewed_at: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  application_status: type('null | null').or(GuildJoinRequestApplicationStatusSchema),
  rejection_reason: type('string | null').describe(
    'Reason request was rejected. Only set when application_status is REJECTED',
  ),
  guild_id: SnowflakeTypeSchema,
  user_id: SnowflakeTypeSchema,
  'user?': type('null | null').or(UserResponseSchema),
  'form_responses?': type(
    type(
      type(
        type(type(MultipleChoiceFormFieldResponseSchema).or(ParagraphFormFieldResponseSchema)).or(
          TermsFormFieldResponseSchema,
        ),
      ).or(TextInputFormFieldResponseSchema),
    ).array(),
  )
    .or('null')
    .describe("Applicant's responses on join request form"),
  'actioned_by_user?': type('null | null').or(UserResponseSchema),
})

export type GuildJoinRequestResponse = typeof GuildJoinRequestResponseSchema.infer

export const GuildJoinRequestsListResponseSchema = type({
  'total?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'guild_join_requests?': type(GuildJoinRequestResponseSchema).array(),
})

export type GuildJoinRequestsListResponse = typeof GuildJoinRequestsListResponseSchema.infer

export const GuildMFALevelSchema = type(
  type('0').describe('Guild has no MFA/2FA requirement for moderation actions'),
).or(type('1').describe('Guild has a 2FA requirement for moderation actions'))

export type GuildMFALevel = typeof GuildMFALevelSchema.infer

export const GuildOnboardingModeSchema = type(
  type('0').describe('Only Default Channels considered in constraints'),
).or(type('1').describe('Default Channels and Onboarding Prompts considered in constraints'))

export type GuildOnboardingMode = typeof GuildOnboardingModeSchema.infer

export const OnboardingPromptOptionResponseSchema = type({
  id: SnowflakeTypeSchema,
  title: 'string',
  description: 'string',
  emoji: SettingsEmojiResponseSchema,
  role_ids: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  channel_ids: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
})

export type OnboardingPromptOptionResponse = typeof OnboardingPromptOptionResponseSchema.infer

export const OnboardingPromptTypeSchema = type(type('0').describe('Multiple choice options')).or(
  type('1').describe('Many options shown as a dropdown'),
)

export type OnboardingPromptType = typeof OnboardingPromptTypeSchema.infer

export const OnboardingPromptResponseSchema = type({
  id: SnowflakeTypeSchema,
  title: 'string',
  options: type(OnboardingPromptOptionResponseSchema).array(),
  single_select: 'boolean',
  required: 'boolean',
  in_onboarding: 'boolean',
  type: OnboardingPromptTypeSchema,
})

export type OnboardingPromptResponse = typeof OnboardingPromptResponseSchema.infer

export const GuildOnboardingResponseSchema = type({
  guild_id: SnowflakeTypeSchema,
  prompts: type(OnboardingPromptResponseSchema).array(),
  default_channel_ids: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  enabled: 'boolean',
  mode: GuildOnboardingModeSchema,
})

export type GuildOnboardingResponse = typeof GuildOnboardingResponseSchema.infer

export const UserNotificationSettingsSchema = type(
  type('0').describe('members will receive notifications for all messages by default'),
).or(
  type('1').describe(
    'members will receive notifications only for messages that @mention them by default',
  ),
)

export type UserNotificationSettings = typeof UserNotificationSettingsSchema.infer

export const GuildPatchRequestPartialSchema = type({
  'name?': type('string')
    .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
      .narrow((data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters')),
  ).or('null'),
  'region?': 'string | null',
  'icon?': 'string | null',
  'verification_level?': type('null | null').or(VerificationLevelsSchema),
  'default_message_notifications?': type('null | null').or(UserNotificationSettingsSchema),
  'explicit_content_filter?': type('null | null').or(GuildExplicitContentFilterTypesSchema),
  'preferred_locale?': type('null | null').or(AvailableLocalesEnumSchema),
  'afk_timeout?': type('null | null').or(AfkTimeoutsSchema),
  'afk_channel_id?': type('null | null').or(SnowflakeTypeSchema),
  'system_channel_id?': type('null | null').or(SnowflakeTypeSchema),
  'splash?': 'string | null',
  'banner?': 'string | null',
  'system_channel_flags?': 'number.integer | null',
  'features?': type(
    type(
      type(
        type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
          ),
        ).or('null'),
      ).array(),
    )
      .and(type('unknown[] <= 1521'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'discovery_splash?': 'string | null',
  'home_header?': 'string | null',
  'rules_channel_id?': type('null | null').or(SnowflakeTypeSchema),
  'safety_alerts_channel_id?': type('null | null').or(SnowflakeTypeSchema),
  'public_updates_channel_id?': type('null | null').or(SnowflakeTypeSchema),
  'premium_progress_bar_enabled?': 'boolean | null',
})

export type GuildPatchRequestPartial = typeof GuildPatchRequestPartialSchema.infer

export const GuildPreviewResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  icon: 'string | null',
  description: 'string | null',
  home_header: 'string | null',
  splash: 'string | null',
  discovery_splash: 'string | null',
  features: type(GuildFeaturesSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  approximate_member_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  approximate_presence_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  emojis: type(EmojiResponseSchema).array(),
  stickers: type(GuildStickerResponseSchema).array(),
})

export type GuildPreviewResponse = typeof GuildPreviewResponseSchema.infer

export const GuildPruneResponseSchema = type({
  pruned: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
})

export type GuildPruneResponse = typeof GuildPruneResponseSchema.infer

export const PremiumGuildTiersSchema = type(
  type(
    type(type('0').describe('Guild has not unlocked any Server Boost perks')).or(
      type('1').describe('Guild has unlocked Server Boost level 1 perks'),
    ),
  ).or(type('2').describe('Guild has unlocked Server Boost level 2 perks')),
).or(type('3').describe('Guild has unlocked Server Boost level 3 perks'))

export type PremiumGuildTiers = typeof PremiumGuildTiersSchema.infer

export const GuildResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  icon: 'string | null',
  description: 'string | null',
  home_header: 'string | null',
  splash: 'string | null',
  discovery_splash: 'string | null',
  features: type(GuildFeaturesSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  banner: 'string | null',
  owner_id: SnowflakeTypeSchema,
  application_id: type('null | null').or(SnowflakeTypeSchema),
  region: 'string',
  afk_channel_id: type('null | null').or(SnowflakeTypeSchema),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: type('null | null').or(SnowflakeTypeSchema),
  system_channel_flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  widget_enabled: 'boolean',
  widget_channel_id: type('null | null').or(SnowflakeTypeSchema),
  verification_level: VerificationLevelsSchema,
  roles: type(GuildRoleResponseSchema).array(),
  default_message_notifications: UserNotificationSettingsSchema,
  mfa_level: GuildMFALevelSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  max_presences: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  max_members: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  max_stage_video_channel_users: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  max_video_channel_users: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  vanity_url_code: 'string | null',
  premium_tier: PremiumGuildTiersSchema,
  premium_subscription_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  preferred_locale: AvailableLocalesEnumSchema,
  rules_channel_id: type('null | null').or(SnowflakeTypeSchema),
  safety_alerts_channel_id: type('null | null').or(SnowflakeTypeSchema),
  public_updates_channel_id: type('null | null').or(SnowflakeTypeSchema),
  premium_progress_bar_enabled: 'boolean',
  'premium_progress_bar_enabled_user_updated_at?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  nsfw: 'boolean',
  nsfw_level: GuildNSFWContentLevelSchema,
  emojis: type(EmojiResponseSchema).array(),
  stickers: type(GuildStickerResponseSchema).array(),
  incidents_data: type('null | null').or(GuildIncidentsDataResponseSchema),
})

export type GuildResponse = typeof GuildResponseSchema.infer

export const GuildScheduledEventExceptionCreateRequestSchema = type({
  'scheduled_start_time?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('Overridden start time of this occurrence'),
  'scheduled_end_time?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('Overridden end time of this occurrence'),
  original_scheduled_start_time: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('The original start time of the occurrence to create an exception for'),
  'is_canceled?': type('boolean | null').describe('Whether this occurrence is canceled'),
})

export type GuildScheduledEventExceptionCreateRequest =
  typeof GuildScheduledEventExceptionCreateRequestSchema.infer

export const GuildScheduledEventExceptionPatchRequestPartialSchema = type({
  'scheduled_start_time?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('Overridden start time of this occurrence'),
  'scheduled_end_time?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('Overridden end time of this occurrence'),
  'is_canceled?': type('boolean | null').describe('Whether this occurrence is canceled'),
})

export type GuildScheduledEventExceptionPatchRequestPartial =
  typeof GuildScheduledEventExceptionPatchRequestPartialSchema.infer

export const SearchMessageResponseSchema = type({
  type: MessageTypeSchema,
  content: 'string',
  mentions: type(UserResponseSchema).array(),
  mention_roles: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  attachments: type(MessageAttachmentResponseSchema).array(),
  embeds: type(MessageEmbedResponseSchema).array(),
  timestamp: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  edited_timestamp: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  components: type(
    type(
      type(
        type(
          type(
            type(type(ActionRowComponentResponseSchema).or(ContainerComponentResponseSchema)).or(
              FileComponentResponseSchema,
            ),
          ).or(MediaGalleryComponentResponseSchema),
        ).or(SectionComponentResponseSchema),
      ).or(SeparatorComponentResponseSchema),
    ).or(TextDisplayComponentResponseSchema),
  ).array(),
  'stickers?': type(type(GuildStickerResponseSchema).or(StandardStickerResponseSchema)).array(),
  'sticker_items?': type(MessageStickerItemResponseSchema).array(),
  id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  pinned: 'boolean',
  mention_everyone: 'boolean',
  tts: 'boolean',
  'call?': MessageCallResponseSchema,
  'activity?': MessageActivityResponseSchema,
  'application?': BasicApplicationResponseWithBotSchema,
  'application_id?': SnowflakeTypeSchema,
  'interaction?': MessageInteractionResponseSchema,
  'nonce?': type(
    type('bigint | number.integer')
      .or(/^-?\d+$/)
      .pipe((data) => BigInt(data))
      .narrow(
        (data, ctx) =>
          (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
      )
      .narrow(
        (data, ctx) => data >= -9223372036854776000n || ctx.mustBe('at least -9223372036854776000'),
      )
      .narrow(
        (data, ctx) => data <= 9223372036854776000n || ctx.mustBe('at most 9223372036854776000'),
      ),
  ).or(
    type('string').narrow(
      (data, ctx) => [...data].length <= 25 || ctx.mustBe('at most 25 characters'),
    ),
  ),
  'webhook_id?': SnowflakeTypeSchema,
  'message_reference?': MessageReferenceResponseSchema,
  'thread?': ThreadResponseSchema,
  'mention_channels?': type(MessageMentionChannelResponseSchema).array(),
  'role_subscription_data?': MessageRoleSubscriptionDataResponseSchema,
  'purchase_notification?': PurchaseNotificationResponseSchema,
  'position?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'resolved?': ResolvedObjectsResponseSchema,
  'poll?': PollResponseSchema,
  'shared_client_theme?': CustomClientThemeResponseSchema,
  'interaction_metadata?': type(
    type(ApplicationCommandInteractionMetadataResponseSchema).or(
      MessageComponentInteractionMetadataResponseSchema,
    ),
  ).or(ModalSubmitInteractionMetadataResponseSchema),
  'message_snapshots?': type(MessageSnapshotResponseSchema).array(),
  'lobby_member?': MessageLobbyMemberResponseSchema,
  'actor?': UserResponseSchema,
  'reactions?': type(MessageReactionResponseSchema).array(),
  'referenced_message?': type('null | null').or(BasicMessageResponseSchema),
  hit: 'boolean',
  'restriction_count?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'author_restriction_count?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'source_author_restriction_count?':
    'number.integer >= -2147483648 & number.integer <= 2147483647',
  'forward_source_author_id?': SnowflakeTypeSchema,
})

export type SearchMessageResponse = typeof SearchMessageResponseSchema.infer

export const GuildSearchResponseSchema = type({
  messages: type(type(SearchMessageResponseSchema).array()).array(),
  doing_deep_historical_index: 'boolean',
  total_results: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'threads?': type(type(ThreadResponseSchema).array()).or('null'),
  'members?': type(type(ThreadMemberResponseSchema).array()).or('null'),
  'documents_indexed?': 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
})

export type GuildSearchResponse = typeof GuildSearchResponseSchema.infer

export const GuildSubscriptionIntegrationResponseSchema = type({
  type: IntegrationTypesSchema,
  name: 'string | null',
  account: AccountResponseSchema,
  enabled: 'boolean',
  id: SnowflakeTypeSchema,
})

export type GuildSubscriptionIntegrationResponse =
  typeof GuildSubscriptionIntegrationResponseSchema.infer

export const GuildTemplateChannelTagsSchema = type({
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  name: 'string',
  emoji_id: type('null | null').or(SnowflakeTypeSchema),
  emoji_name: 'string | null',
  moderated: 'boolean | null',
})

export type GuildTemplateChannelTags = typeof GuildTemplateChannelTagsSchema.infer

export const GuildTemplateChannelResponseSchema = type({
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  type: ChannelTypesSchema,
  name: 'string | null',
  position: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  topic: 'string | null',
  bitrate: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  user_limit: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  nsfw: 'boolean',
  rate_limit_per_user: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  parent_id: type('null | null').or(SnowflakeTypeSchema),
  default_auto_archive_duration: type('null | null').or(ThreadAutoArchiveDurationSchema),
  permission_overwrites: type(ChannelPermissionOverwriteResponseSchema).array(),
  available_tags: type(type(GuildTemplateChannelTagsSchema).array()).or('null'),
  template: 'string',
  default_reaction_emoji: type('null | null').or(DefaultReactionEmojiResponseSchema),
  default_thread_rate_limit_per_user:
    'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  default_sort_order: type('null | null').or(ThreadSortOrderSchema),
  default_forum_layout: type('null | null').or(ForumLayoutSchema),
  default_tag_setting: type('null | null').or(ThreadSearchTagSettingSchema),
  theme_color: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
})

export type GuildTemplateChannelResponse = typeof GuildTemplateChannelResponseSchema.infer

export const GuildTemplateRoleColorsResponseSchema = type({
  primary_color: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  secondary_color: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  tertiary_color: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
})

export type GuildTemplateRoleColorsResponse = typeof GuildTemplateRoleColorsResponseSchema.infer

export const GuildTemplateRoleResponseSchema = type({
  id: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  name: 'string',
  permissions: 'string',
  color: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  colors: type('null | null').or(GuildTemplateRoleColorsResponseSchema),
  hoist: 'boolean',
  mentionable: 'boolean',
  icon: 'string | null',
  unicode_emoji: 'string | null',
})

export type GuildTemplateRoleResponse = typeof GuildTemplateRoleResponseSchema.infer

export const GuildTemplateSnapshotResponseSchema = type({
  name: 'string',
  description: 'string | null',
  region: 'string | null',
  verification_level: VerificationLevelsSchema,
  default_message_notifications: UserNotificationSettingsSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  preferred_locale: AvailableLocalesEnumSchema,
  afk_channel_id: type('null | null').or(SnowflakeTypeSchema),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: type('null | null').or(SnowflakeTypeSchema),
  system_channel_flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  roles: type(GuildTemplateRoleResponseSchema).array(),
  channels: type(GuildTemplateChannelResponseSchema).array(),
})

export type GuildTemplateSnapshotResponse = typeof GuildTemplateSnapshotResponseSchema.infer

export const GuildTemplateResponseSchema = type({
  code: 'string',
  name: 'string',
  description: 'string | null',
  usage_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  creator_id: SnowflakeTypeSchema,
  creator: type('null | null').or(UserResponseSchema),
  created_at: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  updated_at: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  source_guild_id: SnowflakeTypeSchema,
  serialized_source_guild: GuildTemplateSnapshotResponseSchema,
  is_dirty: 'boolean | null',
})

export type GuildTemplateResponse = typeof GuildTemplateResponseSchema.infer

export const GuildWelcomeChannelSchema = type({
  channel_id: SnowflakeTypeSchema,
  description: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 50 || ctx.mustBe('at most 50 characters')),
  'emoji_id?': type('null | null').or(SnowflakeTypeSchema),
  'emoji_name?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
})

export type GuildWelcomeChannel = typeof GuildWelcomeChannelSchema.infer

export const GuildWelcomeScreenChannelResponseSchema = type({
  channel_id: SnowflakeTypeSchema,
  description: 'string',
  emoji_id: type('null | null').or(SnowflakeTypeSchema),
  emoji_name: 'string | null',
})

export type GuildWelcomeScreenChannelResponse = typeof GuildWelcomeScreenChannelResponseSchema.infer

export const GuildWelcomeScreenResponseSchema = type({
  description: 'string | null',
  welcome_channels: type(GuildWelcomeScreenChannelResponseSchema).array(),
})

export type GuildWelcomeScreenResponse = typeof GuildWelcomeScreenResponseSchema.infer

export const GuildWithCountsResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  icon: 'string | null',
  description: 'string | null',
  home_header: 'string | null',
  splash: 'string | null',
  discovery_splash: 'string | null',
  features: type(GuildFeaturesSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  banner: 'string | null',
  owner_id: SnowflakeTypeSchema,
  application_id: type('null | null').or(SnowflakeTypeSchema),
  region: 'string',
  afk_channel_id: type('null | null').or(SnowflakeTypeSchema),
  afk_timeout: AfkTimeoutsSchema,
  system_channel_id: type('null | null').or(SnowflakeTypeSchema),
  system_channel_flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  widget_enabled: 'boolean',
  widget_channel_id: type('null | null').or(SnowflakeTypeSchema),
  verification_level: VerificationLevelsSchema,
  roles: type(GuildRoleResponseSchema).array(),
  default_message_notifications: UserNotificationSettingsSchema,
  mfa_level: GuildMFALevelSchema,
  explicit_content_filter: GuildExplicitContentFilterTypesSchema,
  max_presences: 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  max_members: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  max_stage_video_channel_users: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  max_video_channel_users: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  vanity_url_code: 'string | null',
  premium_tier: PremiumGuildTiersSchema,
  premium_subscription_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  preferred_locale: AvailableLocalesEnumSchema,
  rules_channel_id: type('null | null').or(SnowflakeTypeSchema),
  safety_alerts_channel_id: type('null | null').or(SnowflakeTypeSchema),
  public_updates_channel_id: type('null | null').or(SnowflakeTypeSchema),
  premium_progress_bar_enabled: 'boolean',
  'premium_progress_bar_enabled_user_updated_at?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  nsfw: 'boolean',
  nsfw_level: GuildNSFWContentLevelSchema,
  emojis: type(EmojiResponseSchema).array(),
  stickers: type(GuildStickerResponseSchema).array(),
  incidents_data: type('null | null').or(GuildIncidentsDataResponseSchema),
  'approximate_member_count?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  'approximate_presence_count?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
})

export type GuildWithCountsResponse = typeof GuildWithCountsResponseSchema.infer

export const HasOptionSchema = type(
  "'link' | 'embed' | 'file' | 'image' | 'video' | 'sound' | 'sticker' | 'poll' | 'snapshot' | '-link' | '-embed' | '-file' | '-image' | '-video' | '-sound' | '-sticker' | '-poll' | '-snapshot'",
)

export type HasOption = typeof HasOptionSchema.infer

export const IncomingWebhookRequestPartialSchema = type({
  'content?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
    ),
  ).or('null'),
  'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
  'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
  'components?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(ActionRowComponentForMessageRequestSchema).or(
                    ContainerComponentForMessageRequestSchema,
                  ),
                ).or(FileComponentForMessageRequestSchema),
              ).or(MediaGalleryComponentForMessageRequestSchema),
            ).or(SectionComponentForMessageRequestSchema),
          ).or(SeparatorComponentForMessageRequestSchema),
        ).or(TextDisplayComponentForMessageRequestSchema),
      ).array(),
    ).and(type('unknown[] <= 40')),
  ).or('null'),
  'attachments?': type(
    type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
  ).or('null'),
  'poll?': type('null | null').or(PollCreateRequestSchema),
  'tts?': 'boolean | null',
  'flags?': 'number.integer | null',
  'username?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
  ).or('null'),
  'avatar_url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'thread_name?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
      .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  ).or('null'),
  'applied_tags?': type(type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 5'))).or(
    'null',
  ),
})

export type IncomingWebhookRequestPartial = typeof IncomingWebhookRequestPartialSchema.infer

export const IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema = type({
  'content?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
    ),
  ).or('null'),
  'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
  'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
  'components?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(ActionRowComponentForMessageRequestSchema).or(
                    ContainerComponentForMessageRequestSchema,
                  ),
                ).or(FileComponentForMessageRequestSchema),
              ).or(MediaGalleryComponentForMessageRequestSchema),
            ).or(SectionComponentForMessageRequestSchema),
          ).or(SeparatorComponentForMessageRequestSchema),
        ).or(TextDisplayComponentForMessageRequestSchema),
      ).array(),
    ).and(type('unknown[] <= 40')),
  ).or('null'),
  'attachments?': type(
    type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
  ).or('null'),
  'flags?': 'number.integer | null',
})

export type IncomingWebhookUpdateForInteractionCallbackRequestPartial =
  typeof IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema.infer

export const IncomingWebhookUpdateRequestPartialSchema = type({
  'content?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
    ),
  ).or('null'),
  'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
  'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
  'components?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(ActionRowComponentForMessageRequestSchema).or(
                    ContainerComponentForMessageRequestSchema,
                  ),
                ).or(FileComponentForMessageRequestSchema),
              ).or(MediaGalleryComponentForMessageRequestSchema),
            ).or(SectionComponentForMessageRequestSchema),
          ).or(SeparatorComponentForMessageRequestSchema),
        ).or(TextDisplayComponentForMessageRequestSchema),
      ).array(),
    ).and(type('unknown[] <= 40')),
  ).or('null'),
  'attachments?': type(
    type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
  ).or('null'),
  'poll?': type('null | null').or(PollCreateRequestSchema),
  'flags?': 'number.integer | null',
})

export type IncomingWebhookUpdateRequestPartial =
  typeof IncomingWebhookUpdateRequestPartialSchema.infer

export const InteractionResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: InteractionTypesSchema,
  'activity_instance_id?': 'string | null',
  'response_message_id?': SnowflakeTypeSchema,
  'response_message_loading?': 'boolean',
  'response_message_ephemeral?': 'boolean',
  'channel_id?': SnowflakeTypeSchema,
  'guild_id?': SnowflakeTypeSchema,
})

export type InteractionResponse = typeof InteractionResponseSchema.infer

export const LaunchActivityInteractionCallbackResponseSchema = type({
  type: InteractionCallbackTypesSchema,
  activity_instance: ActivityInstanceCallbackResponseSchema,
})

export type LaunchActivityInteractionCallbackResponse =
  typeof LaunchActivityInteractionCallbackResponseSchema.infer

export const UpdateMessageInteractionCallbackResponseSchema = type({
  type: InteractionCallbackTypesSchema,
  message: MessageResponseSchema,
})

export type UpdateMessageInteractionCallbackResponse =
  typeof UpdateMessageInteractionCallbackResponseSchema.infer

export const InteractionCallbackResponseSchema = type({
  interaction: InteractionResponseSchema,
  'resource?': type(
    type(CreateMessageInteractionCallbackResponseSchema).or(
      LaunchActivityInteractionCallbackResponseSchema,
    ),
  ).or(UpdateMessageInteractionCallbackResponseSchema),
})

export type InteractionCallbackResponse = typeof InteractionCallbackResponseSchema.infer

export const KeywordTriggerMetadataSchema = type({
  'keyword_filter?': type(
    type(
      type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 60 || ctx.mustBe('at most 60 characters')),
      ).array(),
    ).and(type('unknown[] <= 1000')),
  ).or('null'),
  'regex_patterns?': type(
    type(
      type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 260 || ctx.mustBe('at most 260 characters')),
      ).array(),
    ).and(type('unknown[] <= 10')),
  ).or('null'),
  'allow_list?': type(
    type(
      type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 60 || ctx.mustBe('at most 60 characters')),
      ).array(),
    ).and(type('unknown[] <= 100')),
  ).or('null'),
})

export type KeywordTriggerMetadata = typeof KeywordTriggerMetadataSchema.infer

export const KeywordUpsertRequestSchema = type({
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  event_type: AutomodEventTypeSchema,
  'actions?': type(
    type(
      type(
        type(
          type(type(BlockMessageActionSchema).or(FlagToChannelActionSchema)).or(
            QuarantineUserActionSchema,
          ),
        ).or(UserCommunicationDisabledActionSchema),
      ).array(),
    ).and(type('1 <= unknown[] <= 5')),
  ).or('null'),
  'enabled?': 'boolean | null',
  'exempt_roles?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 20'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'exempt_channels?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 50'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  trigger_type: AutomodTriggerTypeSchema,
  'trigger_metadata?': type('null | null').or(KeywordTriggerMetadataSchema),
})

export type KeywordUpsertRequest = typeof KeywordUpsertRequestSchema.infer

export const KeywordUpsertRequestPartialSchema = type({
  'name?': type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  'event_type?': AutomodEventTypeSchema,
  'actions?': type(
    type(
      type(
        type(
          type(type(BlockMessageActionSchema).or(FlagToChannelActionSchema)).or(
            QuarantineUserActionSchema,
          ),
        ).or(UserCommunicationDisabledActionSchema),
      ).array(),
    ).and(type('1 <= unknown[] <= 5')),
  ).or('null'),
  'enabled?': 'boolean | null',
  'exempt_roles?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 20'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'exempt_channels?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 50'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'trigger_type?': AutomodTriggerTypeSchema,
  'trigger_metadata?': type('null | null').or(KeywordTriggerMetadataSchema),
})

export type KeywordUpsertRequestPartial = typeof KeywordUpsertRequestPartialSchema.infer

export const MentionableSelectComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 150 || ctx.mustBe('at most 150 characters'),
    ),
  ).or('null'),
  'min_values?': 'number.integer >= 0 & number.integer <= 25 | null',
  'max_values?': 'number.integer >= 1 & number.integer <= 25 | null',
  'disabled?': 'boolean | null',
  'required?': 'boolean | null',
  'default_values?': type(
    type(type(type(RoleSelectDefaultValueSchema).or(UserSelectDefaultValueSchema)).array()).and(
      type('unknown[] <= 25'),
    ),
  ).or('null'),
})

export type MentionableSelectComponentForModalRequest =
  typeof MentionableSelectComponentForModalRequestSchema.infer

export const RadioGroupOptionForRequestSchema = type({
  label: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  value: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
  'default?': 'boolean | null',
})

export type RadioGroupOptionForRequest = typeof RadioGroupOptionForRequestSchema.infer

export const RadioGroupComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'required?': 'boolean | null',
  options: type(type(RadioGroupOptionForRequestSchema).array()).and(type('2 <= unknown[] <= 10')),
})

export type RadioGroupComponentForModalRequest =
  typeof RadioGroupComponentForModalRequestSchema.infer

export const RoleSelectComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 150 || ctx.mustBe('at most 150 characters'),
    ),
  ).or('null'),
  'min_values?': 'number.integer >= 0 & number.integer <= 25 | null',
  'max_values?': 'number.integer >= 1 & number.integer <= 25 | null',
  'disabled?': 'boolean | null',
  'required?': 'boolean | null',
  'default_values?': type(
    type(type(RoleSelectDefaultValueSchema).array()).and(type('unknown[] <= 25')),
  ).or('null'),
})

export type RoleSelectComponentForModalRequest =
  typeof RoleSelectComponentForModalRequestSchema.infer

export const StringSelectComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 150 || ctx.mustBe('at most 150 characters'),
    ),
  ).or('null'),
  'min_values?': 'number.integer >= 0 & number.integer <= 25 | null',
  'max_values?': 'number.integer >= 1 & number.integer <= 25 | null',
  'disabled?': 'boolean | null',
  'required?': 'boolean | null',
  options: type(type(StringSelectOptionForRequestSchema).array()).and(type('1 <= unknown[] <= 25')),
})

export type StringSelectComponentForModalRequest =
  typeof StringSelectComponentForModalRequestSchema.infer

export const UserSelectComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'placeholder?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 150 || ctx.mustBe('at most 150 characters'),
    ),
  ).or('null'),
  'min_values?': 'number.integer >= 0 & number.integer <= 25 | null',
  'max_values?': 'number.integer >= 1 & number.integer <= 25 | null',
  'disabled?': 'boolean | null',
  'required?': 'boolean | null',
  'default_values?': type(
    type(type(UserSelectDefaultValueSchema).array()).and(type('unknown[] <= 25')),
  ).or('null'),
})

export type UserSelectComponentForModalRequest =
  typeof UserSelectComponentForModalRequestSchema.infer

export const LabelComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  label: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 45 || ctx.mustBe('at most 45 characters')),
  'description?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  ).or('null'),
  component: type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(ChannelSelectComponentForModalRequestSchema).or(
                    CheckboxComponentForModalRequestSchema,
                  ),
                ).or(CheckboxGroupComponentForModalRequestSchema),
              ).or(FileUploadComponentForModalRequestSchema),
            ).or(MentionableSelectComponentForModalRequestSchema),
          ).or(RadioGroupComponentForModalRequestSchema),
        ).or(RoleSelectComponentForModalRequestSchema),
      ).or(StringSelectComponentForModalRequestSchema),
    ).or(TextInputComponentForModalRequestSchema),
  ).or(UserSelectComponentForModalRequestSchema),
})

export type LabelComponentForModalRequest = typeof LabelComponentForModalRequestSchema.infer

export const LaunchActivityInteractionCallbackRequestSchema = type({
  type: InteractionCallbackTypesSchema,
})

export type LaunchActivityInteractionCallbackRequest =
  typeof LaunchActivityInteractionCallbackRequestSchema.infer

export const ListApplicationEmojisResponseSchema = type({
  items: type(EmojiResponseSchema).array(),
})

export type ListApplicationEmojisResponse = typeof ListApplicationEmojisResponseSchema.infer

export const SoundboardSoundResponseSchema = type({
  name: 'string',
  sound_id: SnowflakeTypeSchema,
  volume: 'number',
  emoji_id: type('null | null').or(SnowflakeTypeSchema),
  emoji_name: 'string | null',
  'guild_id?': SnowflakeTypeSchema,
  available: 'boolean',
  'user?': UserResponseSchema,
})

export type SoundboardSoundResponse = typeof SoundboardSoundResponseSchema.infer

export const ListGuildSoundboardSoundsResponseSchema = type({
  items: type(SoundboardSoundResponseSchema).array(),
})

export type ListGuildSoundboardSoundsResponse = typeof ListGuildSoundboardSoundsResponseSchema.infer

export const LobbyGuildInviteResponseSchema = type({ code: 'string' })

export type LobbyGuildInviteResponse = typeof LobbyGuildInviteResponseSchema.infer

export const LobbyMemberRequestSchema = type({
  id: SnowflakeTypeSchema,
  'metadata?': type(
    type({
      '[string]': type('string').narrow(
        (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
      ),
    }),
  ).or('null'),
  'flags?': 'null | null | 1',
  'additional_name?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
  ).or('null'),
})

export type LobbyMemberRequest = typeof LobbyMemberRequestSchema.infer

export const LobbyMemberResponseSchema = type({
  id: SnowflakeTypeSchema,
  metadata: type(type({ '[string]': 'string' })).or('null'),
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'additional_name?': 'string',
})

export type LobbyMemberResponse = typeof LobbyMemberResponseSchema.infer

export const LobbyMessageResponseSchema = type({
  id: SnowflakeTypeSchema,
  type: MessageTypeSchema,
  content: 'string',
  lobby_id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  author: UserResponseSchema,
  'lobby_member?': MessageLobbyMemberResponseSchema,
  'metadata?': type({ '[string]': 'string' }),
  'moderation_metadata?': type({ '[string]': 'string' }),
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'application_id?': SnowflakeTypeSchema,
})

export type LobbyMessageResponse = typeof LobbyMessageResponseSchema.infer

export const LobbyResponseSchema = type({
  id: SnowflakeTypeSchema,
  application_id: SnowflakeTypeSchema,
  metadata: type(type({ '[string]': 'string' })).or('null'),
  members: type(LobbyMemberResponseSchema).array(),
  'linked_channel?': GuildChannelResponseSchema,
  flags: UInt32TypeSchema,
  'override_event_webhooks_url?': 'string | null',
})

export type LobbyResponse = typeof LobbyResponseSchema.infer

export const MLSpamTriggerMetadataSchema = type({})

export type MLSpamTriggerMetadata = typeof MLSpamTriggerMetadataSchema.infer

export const MLSpamUpsertRequestSchema = type({
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  event_type: AutomodEventTypeSchema,
  'actions?': type(
    type(
      type(
        type(
          type(type(BlockMessageActionSchema).or(FlagToChannelActionSchema)).or(
            QuarantineUserActionSchema,
          ),
        ).or(UserCommunicationDisabledActionSchema),
      ).array(),
    ).and(type('1 <= unknown[] <= 5')),
  ).or('null'),
  'enabled?': 'boolean | null',
  'exempt_roles?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 20'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'exempt_channels?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 50'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  trigger_type: AutomodTriggerTypeSchema,
  'trigger_metadata?': type('null | null').or(MLSpamTriggerMetadataSchema),
})

export type MLSpamUpsertRequest = typeof MLSpamUpsertRequestSchema.infer

export const MLSpamUpsertRequestPartialSchema = type({
  'name?': type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  'event_type?': AutomodEventTypeSchema,
  'actions?': type(
    type(
      type(
        type(
          type(type(BlockMessageActionSchema).or(FlagToChannelActionSchema)).or(
            QuarantineUserActionSchema,
          ),
        ).or(UserCommunicationDisabledActionSchema),
      ).array(),
    ).and(type('1 <= unknown[] <= 5')),
  ).or('null'),
  'enabled?': 'boolean | null',
  'exempt_roles?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 20'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'exempt_channels?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 50'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'trigger_type?': AutomodTriggerTypeSchema,
  'trigger_metadata?': type('null | null').or(MLSpamTriggerMetadataSchema),
})

export type MLSpamUpsertRequestPartial = typeof MLSpamUpsertRequestPartialSchema.infer

export const MentionSpamTriggerMetadataSchema = type({
  'mention_total_limit?': 'number.integer >= 0 & number.integer <= 50 | null',
  'mention_raid_protection_enabled?': 'boolean | null',
})

export type MentionSpamTriggerMetadata = typeof MentionSpamTriggerMetadataSchema.infer

export const MentionSpamUpsertRequestSchema = type({
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  event_type: AutomodEventTypeSchema,
  'actions?': type(
    type(
      type(
        type(
          type(type(BlockMessageActionSchema).or(FlagToChannelActionSchema)).or(
            QuarantineUserActionSchema,
          ),
        ).or(UserCommunicationDisabledActionSchema),
      ).array(),
    ).and(type('1 <= unknown[] <= 5')),
  ).or('null'),
  'enabled?': 'boolean | null',
  'exempt_roles?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 20'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'exempt_channels?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 50'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  trigger_type: AutomodTriggerTypeSchema,
  'trigger_metadata?': type('null | null').or(MentionSpamTriggerMetadataSchema),
})

export type MentionSpamUpsertRequest = typeof MentionSpamUpsertRequestSchema.infer

export const MentionSpamUpsertRequestPartialSchema = type({
  'name?': type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  'event_type?': AutomodEventTypeSchema,
  'actions?': type(
    type(
      type(
        type(
          type(type(BlockMessageActionSchema).or(FlagToChannelActionSchema)).or(
            QuarantineUserActionSchema,
          ),
        ).or(UserCommunicationDisabledActionSchema),
      ).array(),
    ).and(type('1 <= unknown[] <= 5')),
  ).or('null'),
  'enabled?': 'boolean | null',
  'exempt_roles?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 20'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'exempt_channels?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 50'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'trigger_type?': AutomodTriggerTypeSchema,
  'trigger_metadata?': type('null | null').or(MentionSpamTriggerMetadataSchema),
})

export type MentionSpamUpsertRequestPartial = typeof MentionSpamUpsertRequestPartialSchema.infer

export const MessageReferenceRequestSchema = type({
  'guild_id?': type('null | null').or(SnowflakeTypeSchema),
  'channel_id?': type('null | null').or(SnowflakeTypeSchema),
  message_id: SnowflakeTypeSchema,
  'fail_if_not_exists?': 'boolean | null',
  'type?': type('null | null').or(MessageReferenceTypeSchema),
})

export type MessageReferenceRequest = typeof MessageReferenceRequestSchema.infer

export const MessageCreateRequestSchema = type({
  'content?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
    ),
  ).or('null'),
  'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
  'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
  'sticker_ids?': type(type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 3'))).or(
    'null',
  ),
  'components?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(ActionRowComponentForMessageRequestSchema).or(
                    ContainerComponentForMessageRequestSchema,
                  ),
                ).or(FileComponentForMessageRequestSchema),
              ).or(MediaGalleryComponentForMessageRequestSchema),
            ).or(SectionComponentForMessageRequestSchema),
          ).or(SeparatorComponentForMessageRequestSchema),
        ).or(TextDisplayComponentForMessageRequestSchema),
      ).array(),
    ).and(type('unknown[] <= 40')),
  ).or('null'),
  'flags?': 'number.integer | null',
  'attachments?': type(
    type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
  ).or('null'),
  'poll?': type('null | null').or(PollCreateRequestSchema),
  'shared_client_theme?': type('null | null').or(CustomClientThemeShareRequestSchema),
  'message_reference?': type('null | null').or(MessageReferenceRequestSchema),
  'nonce?': type(
    type(
      type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow(
          (data, ctx) =>
            data >= -9223372036854776000n || ctx.mustBe('at least -9223372036854776000'),
        )
        .narrow(
          (data, ctx) => data <= 9223372036854776000n || ctx.mustBe('at most 9223372036854776000'),
        ),
    ).or(
      type('string').narrow(
        (data, ctx) => [...data].length <= 25 || ctx.mustBe('at most 25 characters'),
      ),
    ),
  ).or('null | null'),
  'enforce_nonce?': 'boolean | null',
  'tts?': 'boolean | null',
})

export type MessageCreateRequest = typeof MessageCreateRequestSchema.infer

export const MessageEditRequestPartialSchema = type({
  'content?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
    ),
  ).or('null'),
  'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
  'flags?': 'number.integer | null',
  'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
  'sticker_ids?': type(type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 1521'))).or(
    'null',
  ),
  'components?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(ActionRowComponentForMessageRequestSchema).or(
                    ContainerComponentForMessageRequestSchema,
                  ),
                ).or(FileComponentForMessageRequestSchema),
              ).or(MediaGalleryComponentForMessageRequestSchema),
            ).or(SectionComponentForMessageRequestSchema),
          ).or(SeparatorComponentForMessageRequestSchema),
        ).or(TextDisplayComponentForMessageRequestSchema),
      ).array(),
    ).and(type('unknown[] <= 40')),
  ).or('null'),
  'attachments?': type(
    type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
  ).or('null'),
})

export type MessageEditRequestPartial = typeof MessageEditRequestPartialSchema.infer

export const TextDisplayComponentForModalRequestSchema = type({
  type: MessageComponentTypesSchema,
  'id?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  content: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters')),
})

export type TextDisplayComponentForModalRequest =
  typeof TextDisplayComponentForModalRequestSchema.infer

export const ModalInteractionCallbackRequestDataSchema = type({
  custom_id: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  title: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 45 || ctx.mustBe('at most 45 characters')),
  components: type(
    type(
      type(
        type(ActionRowComponentForModalRequestSchema).or(LabelComponentForModalRequestSchema),
      ).or(TextDisplayComponentForModalRequestSchema),
    ).array(),
  ).and(type('1 <= unknown[] <= 40')),
})

export type ModalInteractionCallbackRequestData =
  typeof ModalInteractionCallbackRequestDataSchema.infer

export const ModalInteractionCallbackRequestSchema = type({
  type: InteractionCallbackTypesSchema,
  data: ModalInteractionCallbackRequestDataSchema,
})

export type ModalInteractionCallbackRequest = typeof ModalInteractionCallbackRequestSchema.infer

export const MyGuildResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  icon: 'string | null',
  banner: 'string | null',
  owner: 'boolean',
  permissions: 'string',
  features: type(GuildFeaturesSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  'approximate_member_count?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  'approximate_presence_count?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
})

export type MyGuildResponse = typeof MyGuildResponseSchema.infer

export const OAuth2GetAuthorizationResponseSchema = type({
  application: ApplicationResponseSchema,
  expires: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  scopes: type(OAuth2ScopesSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  'user?': UserResponseSchema,
})

export type OAuth2GetAuthorizationResponse = typeof OAuth2GetAuthorizationResponseSchema.infer

export const OAuth2KeySchema = type({
  kty: 'string',
  use: 'string',
  kid: 'string',
  n: 'string',
  e: 'string',
  alg: 'string',
})

export type OAuth2Key = typeof OAuth2KeySchema.infer

export const OAuth2GetKeysSchema = type({ keys: type(OAuth2KeySchema).array() })

export type OAuth2GetKeys = typeof OAuth2GetKeysSchema.infer

export const OAuth2GetOpenIDConnectUserInfoResponseSchema = type({
  sub: 'string',
  'email?': 'string | null',
  'email_verified?': 'boolean',
  'preferred_username?': 'string',
  'nickname?': 'string | null',
  'picture?': 'string',
  'locale?': 'string',
})

export type OAuth2GetOpenIDConnectUserInfoResponse =
  typeof OAuth2GetOpenIDConnectUserInfoResponseSchema.infer

export const OnboardingPromptOptionRequestSchema = type({
  'id?': type('null | null').or(SnowflakeTypeSchema),
  title: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 50 || ctx.mustBe('at most 50 characters')),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
  'emoji_id?': type('null | null').or(SnowflakeTypeSchema),
  'emoji_name?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
  'emoji_animated?': 'boolean | null',
  'role_ids?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 50'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'channel_ids?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 50'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
})

export type OnboardingPromptOptionRequest = typeof OnboardingPromptOptionRequestSchema.infer

export const PermissionsResponseSchema = type({
  permissions: type('string').describe('The computed permissions, as a stringified bitfield'),
})

export type PermissionsResponse = typeof PermissionsResponseSchema.infer

export const PinnedMessageResponseSchema = type({
  pinned_at: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  message: MessageResponseSchema,
})

export type PinnedMessageResponse = typeof PinnedMessageResponseSchema.infer

export const PinnedMessagesResponseSchema = type({
  items: type(PinnedMessageResponseSchema).array(),
  has_more: 'boolean',
})

export type PinnedMessagesResponse = typeof PinnedMessagesResponseSchema.infer

export const PollAnswerDetailsResponseSchema = type({ users: type(UserResponseSchema).array() })

export type PollAnswerDetailsResponse = typeof PollAnswerDetailsResponseSchema.infer

export const PongInteractionCallbackRequestSchema = type({ type: InteractionCallbackTypesSchema })

export type PongInteractionCallbackRequest = typeof PongInteractionCallbackRequestSchema.infer

export const PremiumTypesSchema = type(
  type(type(type('0').describe('None')).or(type('1').describe('Nitro Classic'))).or(
    type('2').describe('Nitro Standard'),
  ),
).or(type('3').describe('Nitro Basic'))

export type PremiumTypes = typeof PremiumTypesSchema.infer

export const TeamMembershipStatesSchema = type(
  type('1').describe('User has been invited to the team.'),
).or(type('2').describe('User has accepted the team invitation.'))

export type TeamMembershipStates = typeof TeamMembershipStatesSchema.infer

export const TeamMemberRolesSchema = type(
  type(
    type("'admin'").describe(
      'Admins have similar access as owners, except they cannot take destructive actions on the team or team-owned apps.',
    ),
  ).or(
    type("'developer'").describe(
      'Developers can access information about team-owned apps, like the client secret or public key. They can also take limited actions on team-owned apps, like configuring interaction endpoints or resetting the bot token. Members with the Developer role cannot manage the team or its members, or take destructive actions on team-owned apps.',
    ),
  ),
).or(
  type("'read_only'").describe(
    'Read-only members can access information about a team and any team-owned apps. Some examples include getting the IDs of applications and exporting payout records. Members can also invite bots associated with team-owned apps that are marked private.',
  ),
)

export type TeamMemberRoles = typeof TeamMemberRolesSchema.infer

export const TeamMemberResponseSchema = type({
  user: UserResponseSchema,
  team_id: SnowflakeTypeSchema,
  membership_state: TeamMembershipStatesSchema,
  role: TeamMemberRolesSchema,
  permissions: 'string[]',
})

export type TeamMemberResponse = typeof TeamMemberResponseSchema.infer

export const TeamResponseSchema = type({
  id: SnowflakeTypeSchema,
  icon: 'string | null',
  name: 'string',
  owner_user_id: SnowflakeTypeSchema,
  members: type(TeamMemberResponseSchema).array(),
})

export type TeamResponse = typeof TeamResponseSchema.infer

export const PrivateApplicationResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  icon: 'string | null',
  description: 'string',
  type: type('null | null').or(ApplicationTypesSchema),
  'cover_image?': 'string',
  'primary_sku_id?': SnowflakeTypeSchema,
  flags: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  flags_new: 'string',
  'bot?': UserResponseSchema,
  'slug?': 'string',
  'conjure_project_id?': SnowflakeTypeSchema,
  'vibegrations_project_id?': SnowflakeTypeSchema,
  'guild_id?': SnowflakeTypeSchema,
  'rpc_origins?': 'string[]',
  'bot_public?': 'boolean',
  'bot_require_code_grant?': 'boolean',
  'terms_of_service_url?': 'string.url',
  'privacy_policy_url?': 'string.url',
  'custom_install_url?': 'string.url',
  'install_params?': ApplicationOAuth2InstallParamsResponseSchema,
  'integration_types_config?': type({
    '[string]': ApplicationIntegrationTypeConfigurationResponseSchema,
  }),
  verify_key: 'string',
  'max_participants?': 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  'tags?': type('string[]').narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  redirect_uris: 'string.url[]',
  interactions_endpoint_url: 'string.url | null',
  role_connections_verification_url: 'string.url | null',
  owner: UserResponseSchema,
  approximate_guild_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  approximate_user_install_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  approximate_user_authorization_count:
    'number.integer >= -2147483648 & number.integer <= 2147483647',
  'event_webhooks_url?': 'string.url | null',
  'event_webhooks_status?': ApplicationEventWebhooksStatusSchema,
  'event_webhooks_types?': type(ActionTypesSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  explicit_content_filter: ApplicationExplicitContentFilterTypesSchema,
  team: type('null | null').or(TeamResponseSchema),
  eligible_oauth2_scopes: type(OAuth2ScopesSchema).array(),
})

export type PrivateApplicationResponse = typeof PrivateApplicationResponseSchema.infer

export const PrivateGuildMemberResponseSchema = type({
  avatar: type('string | null').describe("the member's guild avatar hash"),
  'avatar_decoration_data?': type('null | null')
    .or(UserAvatarDecorationResponseSchema)
    .describe("data for the member's guild avatar decoration"),
  banner: type('string | null').describe("the member's guild banner hash"),
  communication_disabled_until: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe(
      "when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out",
    ),
  flags: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'guild member flags represented as a bit set, defaults to 0',
  ),
  joined_at: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('when the user joined the guild'),
  nick: type('string | null').describe("this user's guild nickname"),
  pending: type('boolean').describe(
    "whether the user has not yet passed the guild's Membership Screening requirements",
  ),
  premium_since: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('when the user started boosting the guild'),
  roles: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length)
    .describe('array of role object ids'),
  'collectibles?': type('null | null')
    .or(UserCollectiblesResponseSchema)
    .describe("data for the member's collectibles"),
  user: UserResponseSchema.describe('the user this guild member represents'),
  mute: type('boolean').describe('whether the user is muted in voice channels'),
  deaf: type('boolean').describe('whether the user is deafened in voice channels'),
  'permissions?': 'string',
})

export type PrivateGuildMemberResponse = typeof PrivateGuildMemberResponseSchema.infer

export const ProvisionalTokenResponseSchema = type({
  token_type: 'string',
  access_token: 'string',
  expires_in: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  scope: 'string',
  id_token: 'string',
  'refresh_token?': 'string | null',
  'scopes?': 'string[] | null',
  'expires_at_s?': 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
})

export type ProvisionalTokenResponse = typeof ProvisionalTokenResponseSchema.infer

export const PruneGuildRequestSchema = type({
  'days?': 'number.integer >= 1 & number.integer <= 30 | null',
  'compute_prune_count?': 'boolean | null',
  'include_roles?': type(
    type('string').or(
      type(type(SnowflakeTypeSchema).array())
        .and(type('unknown[] <= 100'))
        .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
    ),
  ).or('null | null'),
})

export type PruneGuildRequest = typeof PruneGuildRequestSchema.infer

export const ReactionTypesSchema = type(type('0').describe('Normal reaction type')).or(
  type('1').describe('Burst reaction type'),
)

export type ReactionTypes = typeof ReactionTypesSchema.infer

export const SDKMessageRequestSchema = type({
  'content?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
    ),
  ).or('null'),
  'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
  'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
  'sticker_ids?': type(type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 3'))).or(
    'null',
  ),
  'components?': type(
    type(
      type(
        type(
          type(
            type(
              type(
                type(
                  type(ActionRowComponentForMessageRequestSchema).or(
                    ContainerComponentForMessageRequestSchema,
                  ),
                ).or(FileComponentForMessageRequestSchema),
              ).or(MediaGalleryComponentForMessageRequestSchema),
            ).or(SectionComponentForMessageRequestSchema),
          ).or(SeparatorComponentForMessageRequestSchema),
        ).or(TextDisplayComponentForMessageRequestSchema),
      ).array(),
    ).and(type('unknown[] <= 40')),
  ).or('null'),
  'flags?': 'number.integer | null',
  'attachments?': type(
    type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
  ).or('null'),
  'poll?': type('null | null').or(PollCreateRequestSchema),
  'shared_client_theme?': type('null | null').or(CustomClientThemeShareRequestSchema),
  'message_reference?': type('null | null').or(MessageReferenceRequestSchema),
  'nonce?': type(
    type(
      type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .narrow(
          (data, ctx) =>
            data >= -9223372036854776000n || ctx.mustBe('at least -9223372036854776000'),
        )
        .narrow(
          (data, ctx) => data <= 9223372036854776000n || ctx.mustBe('at most 9223372036854776000'),
        ),
    ).or(
      type('string').narrow(
        (data, ctx) => [...data].length <= 25 || ctx.mustBe('at most 25 characters'),
      ),
    ),
  ).or('null | null'),
  'enforce_nonce?': 'boolean | null',
  'tts?': 'boolean | null',
})

export type SDKMessageRequest = typeof SDKMessageRequestSchema.infer

export const SKUIneligibilityReasonSchema = type(
  type(type('0').describe('Other / catch-all')).or(
    type('1').describe('User already owns this SKU or one of its components'),
  ),
).or(type('2').describe('User account is not on an eligible platform'))

export type SKUIneligibilityReason = typeof SKUIneligibilityReasonSchema.infer

export const ScheduledEventUserCountResponseSchema = type({
  guild_scheduled_event_count: type(
    'number.integer >= -2147483648 & number.integer <= 2147483647',
  ).describe('The number of users subscribed to the scheduled event'),
  guild_scheduled_event_exception_counts: type({
    '[string]': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  }).describe('Map of exception IDs to user counts for each exception'),
})

export type ScheduledEventUserCountResponse = typeof ScheduledEventUserCountResponseSchema.infer

export const SearchIndexNotReadyResponseSchema = type({
  message: 'string',
  code: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  documents_indexed: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  retry_after: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type SearchIndexNotReadyResponse = typeof SearchIndexNotReadyResponseSchema.infer

export const SearchableEmbedTypeSchema = type("'image' | 'video' | 'gif' | 'sound' | 'article'")

export type SearchableEmbedType = typeof SearchableEmbedTypeSchema.infer

export const WebhookSlackEmbedFieldSchema = type({
  'name?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'value?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'inline?': 'boolean | null',
})

export type WebhookSlackEmbedField = typeof WebhookSlackEmbedFieldSchema.infer

export const WebhookSlackEmbedSchema = type({
  'title?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'title_link?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'text?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'color?': type(
    type('string')
      .and(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/)
      .narrow((data, ctx) => [...data].length <= 7 || ctx.mustBe('at most 7 characters')),
  ).or('null'),
  'ts?': 'number.integer | null',
  'pretext?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'footer?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'footer_icon?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'author_name?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'author_link?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'author_icon?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'image_url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'thumb_url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'fields?': type(
    type(type(WebhookSlackEmbedFieldSchema).array()).and(type('unknown[] <= 1521')),
  ).or('null'),
})

export type WebhookSlackEmbed = typeof WebhookSlackEmbedSchema.infer

export const SlackWebhookSchema = type({
  'text?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
    ),
  ).or('null'),
  'username?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
    ),
  ).or('null'),
  'icon_url?': type(
    type('string.url').narrow(
      (data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
    ),
  ).or('null'),
  'attachments?': type(
    type(type(WebhookSlackEmbedSchema).array()).and(type('unknown[] <= 1521')),
  ).or('null'),
})

export type SlackWebhook = typeof SlackWebhookSchema.infer

export const SocialLayerSKUPurchaseEligibilityCallbackDataSchema = type({
  eligible: 'boolean',
  'ineligible_reason?': type('null | null').or(SKUIneligibilityReasonSchema),
  'ineligible_reason_description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 255 || ctx.mustBe('at most 255 characters'),
    ),
  ).or('null'),
})

export type SocialLayerSKUPurchaseEligibilityCallbackData =
  typeof SocialLayerSKUPurchaseEligibilityCallbackDataSchema.infer

export const SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema = type({
  type: InteractionCallbackTypesSchema,
  data: SocialLayerSKUPurchaseEligibilityCallbackDataSchema,
})

export type SocialLayerSKUPurchaseEligibilityInteractionCallbackRequest =
  typeof SocialLayerSKUPurchaseEligibilityInteractionCallbackRequestSchema.infer

export const SortingModeSchema = type("'relevance' | 'timestamp'")

export type SortingMode = typeof SortingModeSchema.infer

export const SortingOrderSchema = type("'asc' | 'desc'")

export type SortingOrder = typeof SortingOrderSchema.infer

export const SoundboardCreateRequestSchema = type({
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'volume?': 'number >= 0 & number <= 1 | null',
  'emoji_id?': type('null | null').or(SnowflakeTypeSchema),
  'emoji_name?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  ).or('null'),
  sound: 'string',
})

export type SoundboardCreateRequest = typeof SoundboardCreateRequestSchema.infer

export const SoundboardPatchRequestPartialSchema = type({
  'name?': type('string')
    .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
    .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  'volume?': 'number >= 0 & number <= 1 | null',
  'emoji_id?': type('null | null').or(SnowflakeTypeSchema),
  'emoji_name?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
  ).or('null'),
})

export type SoundboardPatchRequestPartial = typeof SoundboardPatchRequestPartialSchema.infer

export const SoundboardSoundSendRequestSchema = type({
  sound_id: SnowflakeTypeSchema,
  'source_guild_id?': type('null | null').or(SnowflakeTypeSchema),
})

export type SoundboardSoundSendRequest = typeof SoundboardSoundSendRequestSchema.infer

export const StageInstancesPrivacyLevelsSchema = type(
  type('1').describe('The Stage instance is visible publicly. (deprecated)'),
).or(type('2').describe('The Stage instance is visible to only guild members.'))

export type StageInstancesPrivacyLevels = typeof StageInstancesPrivacyLevelsSchema.infer

export const StageInstanceResponseSchema = type({
  guild_id: SnowflakeTypeSchema,
  channel_id: SnowflakeTypeSchema,
  topic: 'string',
  privacy_level: StageInstancesPrivacyLevelsSchema,
  id: SnowflakeTypeSchema,
  discoverable_disabled: 'boolean',
  guild_scheduled_event_id: type('null | null').or(SnowflakeTypeSchema),
})

export type StageInstanceResponse = typeof StageInstanceResponseSchema.infer

export const StageScheduledEventCreateRequestSchema = type({
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 1000 || ctx.mustBe('at most 1000 characters'),
    ),
  ).or('null'),
  'image?': 'string | null',
  scheduled_start_time: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  'scheduled_end_time?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  'channel_id?': type('null | null').or(SnowflakeTypeSchema),
  'recurrence_rule?': type('null | null')
    .or(RecurrenceRuleSchema)
    .describe('Recurrence rule for the scheduled event'),
  'entity_metadata?': type('null | null').or(EntityMetadataStageInstanceSchema),
})

export type StageScheduledEventCreateRequest = typeof StageScheduledEventCreateRequestSchema.infer

export const StageScheduledEventPatchRequestPartialSchema = type({
  'status?': type('null | null').or(GuildScheduledEventStatusesSchema),
  'name?': type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 1000 || ctx.mustBe('at most 1000 characters'),
    ),
  ).or('null'),
  'image?': 'string | null',
  'scheduled_start_time?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  'scheduled_end_time?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  'entity_type?': type('null | null').or(GuildScheduledEventEntityTypesSchema),
  'privacy_level?': GuildScheduledEventPrivacyLevelsSchema,
  'channel_id?': type('null | null').or(SnowflakeTypeSchema),
  'recurrence_rule?': type('null | null')
    .or(RecurrenceRuleSchema)
    .describe('Recurrence rule for the scheduled event'),
  'entity_metadata?': type('null | null').or(EntityMetadataStageInstanceSchema),
})

export type StageScheduledEventPatchRequestPartial =
  typeof StageScheduledEventPatchRequestPartialSchema.infer

export const StickerPackResponseSchema = type({
  id: SnowflakeTypeSchema,
  sku_id: SnowflakeTypeSchema,
  name: 'string',
  description: 'string | null',
  stickers: type(StandardStickerResponseSchema).array(),
  'cover_sticker_id?': SnowflakeTypeSchema,
  'banner_asset_id?': SnowflakeTypeSchema,
})

export type StickerPackResponse = typeof StickerPackResponseSchema.infer

export const StickerPackCollectionResponseSchema = type({
  sticker_packs: type(StickerPackResponseSchema).array(),
})

export type StickerPackCollectionResponse = typeof StickerPackCollectionResponseSchema.infer

export const SubscriptionResponseStatusTypeSchema = type(
  type(type('0').describe('Subscription is active and scheduled to renew')).or(
    type('1').describe('Subscription is inactive and not being charged'),
  ),
).or(type('2').describe('Subscription is active but will not renew'))

export type SubscriptionResponseStatusType = typeof SubscriptionResponseStatusTypeSchema.infer

export const SubscriptionResponseSchema = type({
  id: SnowflakeTypeSchema.describe('ID of the subscription'),
  user_id: SnowflakeTypeSchema.describe('ID of the user who is subscribed'),
  sku_ids: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length)
    .describe('List of SKUs subscribed to'),
  renewal_sku_ids: type(
    type(SnowflakeTypeSchema)
      .array()
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  )
    .or('null')
    .describe('List of SKUs that this user will be subscribed to at renewal'),
  entitlement_ids: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length)
    .describe('List of entitlements granted for this subscription'),
  current_period_start: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('Start of the current subscription period'),
  current_period_end: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ).describe('End of the current subscription period'),
  status: SubscriptionResponseStatusTypeSchema.describe('Current status of the subscription'),
  canceled_at: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('When the subscription was canceled'),
  'country?': type('string | null').describe(
    'ISO3166-1 alpha-2 country code of the payment source used to purchase the subscription',
  ),
})

export type SubscriptionResponse = typeof SubscriptionResponseSchema.infer

export const TargetUsersJobStatusTypesSchema = type(
  type(
    type(type('0').describe('The default value.')).or(
      type('1').describe('The job is still being processed.'),
    ),
  ).or(type('2').describe('The job has been completed successfully.')),
).or(type('3').describe('The job has failed, see error_message field for more details.'))

export type TargetUsersJobStatusTypes = typeof TargetUsersJobStatusTypesSchema.infer

export const TargetUsersJobStatusResponseSchema = type({
  status: TargetUsersJobStatusTypesSchema.describe(
    'The status of the job processing the target users.',
  ),
  total_users: UInt32TypeSchema.describe('The total number of users in the provided list.'),
  processed_users: UInt32TypeSchema.describe('The number of users processed so far.'),
  created_at: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('The timestamp when the job was created.'),
  completed_at: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  )
    .or('null')
    .describe('The timestamp when the job was successfully completed.'),
  error_message: type('string | null').describe('The error message if the job failed.'),
})

export type TargetUsersJobStatusResponse = typeof TargetUsersJobStatusResponseSchema.infer

export const ThreadSearchResponseSchema = type({
  threads: type(ThreadResponseSchema).array(),
  members: type(ThreadMemberResponseSchema).array(),
  has_more: 'boolean',
  'first_messages?': type(MessageResponseSchema).array(),
  total_results: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type ThreadSearchResponse = typeof ThreadSearchResponseSchema.infer

export const ThreadSortingModeSchema = type(
  "'relevance' | 'creation_time' | 'last_message_time' | 'archive_time'",
)

export type ThreadSortingMode = typeof ThreadSortingModeSchema.infer

export const ThreadsResponseSchema = type({
  threads: type(ThreadResponseSchema).array(),
  members: type(ThreadMemberResponseSchema).array(),
  has_more: 'boolean',
  'first_messages?': type(MessageResponseSchema).array(),
})

export type ThreadsResponse = typeof ThreadsResponseSchema.infer

export const TypingIndicatorResponseSchema = type({})

export type TypingIndicatorResponse = typeof TypingIndicatorResponseSchema.infer

export const UnbanUserFromGuildRequestSchema = type({})

export type UnbanUserFromGuildRequest = typeof UnbanUserFromGuildRequestSchema.infer

export const UpdateApplicationUserRoleConnectionRequestSchema = type({
  'platform_name?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 50 || ctx.mustBe('at most 50 characters'),
    ),
  ).or('null'),
  'platform_username?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
  'metadata?': type(
    type({
      '[string]': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ).or('null'),
})

export type UpdateApplicationUserRoleConnectionRequest =
  typeof UpdateApplicationUserRoleConnectionRequestSchema.infer

export const UpdateDMRequestPartialSchema = type({
  'name?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
      .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  ).or('null'),
})

export type UpdateDMRequestPartial = typeof UpdateDMRequestPartialSchema.infer

export const UpdateGroupDMRequestPartialSchema = type({
  'name?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
      .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  ).or('null'),
  'icon?': 'string | null',
})

export type UpdateGroupDMRequestPartial = typeof UpdateGroupDMRequestPartialSchema.infer

export const UpdateThreadTagRequestSchema = type({
  name: type('string')
    .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
    .narrow((data, ctx) => [...data].length <= 50 || ctx.mustBe('at most 50 characters')),
  'emoji_id?': type('null | null').or(SnowflakeTypeSchema),
  'emoji_name?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
  'moderated?': 'boolean | null',
  'id?': type('null | null').or(SnowflakeTypeSchema),
})

export type UpdateThreadTagRequest = typeof UpdateThreadTagRequestSchema.infer

export const UpdateGuildChannelRequestPartialSchema = type({
  'type?': type('null | null').or(ChannelTypesSchema),
  'name?': type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  'position?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  'topic?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
      .narrow((data, ctx) => [...data].length <= 4096 || ctx.mustBe('at most 4096 characters')),
  ).or('null'),
  'bitrate?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 8000 | null',
  'user_limit?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
  'nsfw?': 'boolean | null',
  'rate_limit_per_user?': 'number.integer >= 0 & number.integer <= 21600 | null',
  'parent_id?': type('null | null').or(SnowflakeTypeSchema),
  'permission_overwrites?': type(
    type(type(ChannelPermissionOverwriteRequestSchema).array()).and(type('unknown[] <= 100')),
  ).or('null'),
  'rtc_region?': 'string | null',
  'video_quality_mode?': type('null | null').or(VideoQualityModesSchema),
  'default_auto_archive_duration?': type('null | null').or(ThreadAutoArchiveDurationSchema),
  'default_reaction_emoji?': type('null | null').or(UpdateDefaultReactionEmojiRequestSchema),
  'default_thread_rate_limit_per_user?': 'number.integer >= 0 & number.integer <= 21600 | null',
  'default_sort_order?': type('null | null').or(ThreadSortOrderSchema),
  'default_forum_layout?': type('null | null').or(ForumLayoutSchema),
  'default_tag_setting?': type('null | null').or(ThreadSearchTagSettingSchema),
  'flags?': 'number.integer | null',
  'available_tags?': type(
    type(type(UpdateThreadTagRequestSchema).array()).and(type('unknown[] <= 20')),
  ).or('null'),
})

export type UpdateGuildChannelRequestPartial = typeof UpdateGuildChannelRequestPartialSchema.infer

export const UpdateOnboardingPromptRequestSchema = type({
  title: type('string')
    .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
    .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  options: type(type(OnboardingPromptOptionRequestSchema).array()).and(
    type('1 <= unknown[] <= 50'),
  ),
  'single_select?': 'boolean | null',
  'required?': 'boolean | null',
  'in_onboarding?': 'boolean | null',
  'type?': type('null | null').or(OnboardingPromptTypeSchema),
  id: SnowflakeTypeSchema,
})

export type UpdateOnboardingPromptRequest = typeof UpdateOnboardingPromptRequestSchema.infer

export const UpdateGuildOnboardingRequestSchema = type({
  'prompts?': type(
    type(type(UpdateOnboardingPromptRequestSchema).array()).and(type('unknown[] <= 15')),
  ).or('null'),
  'enabled?': 'boolean | null',
  'default_channel_ids?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 500'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'mode?': type('null | null').or(GuildOnboardingModeSchema),
})

export type UpdateGuildOnboardingRequest = typeof UpdateGuildOnboardingRequestSchema.infer

export const UpdateMessageInteractionCallbackRequestSchema = type({
  type: InteractionCallbackTypesSchema,
  'data?': type('null | null').or(IncomingWebhookUpdateForInteractionCallbackRequestPartialSchema),
})

export type UpdateMessageInteractionCallbackRequest =
  typeof UpdateMessageInteractionCallbackRequestSchema.infer

export const UpdateRolePositionsRequestSchema = type({
  'id?': type('null | null').or(SnowflakeTypeSchema),
  'position?': 'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
})

export type UpdateRolePositionsRequest = typeof UpdateRolePositionsRequestSchema.infer

export const UpdateRoleRequestPartialSchema = type({
  'name?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
      .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  ).or('null'),
  'permissions?': 'number.integer | null',
  'color?': 'number.integer >= 0 & number.integer <= 16777215 | null',
  'colors?': type('null | null').or(RoleColorsSchema),
  'hoist?': 'boolean | null',
  'mentionable?': 'boolean | null',
  'icon?': 'string | null',
  'unicode_emoji?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
    ),
  ).or('null'),
})

export type UpdateRoleRequestPartial = typeof UpdateRoleRequestPartialSchema.infer

export const UpdateSelfVoiceStateRequestPartialSchema = type({
  'request_to_speak_timestamp?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  'suppress?': 'boolean | null',
  'channel_id?': type('null | null').or(SnowflakeTypeSchema),
})

export type UpdateSelfVoiceStateRequestPartial =
  typeof UpdateSelfVoiceStateRequestPartialSchema.infer

export const UpdateThreadRequestPartialSchema = type({
  'name?': type(
    type('string')
      .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
      .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
  ).or('null'),
  'archived?': 'boolean | null',
  'locked?': 'boolean | null',
  'invitable?': 'boolean | null',
  'auto_archive_duration?': type('null | null').or(ThreadAutoArchiveDurationSchema),
  'rate_limit_per_user?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 & number.integer <= 21600 | null',
  'flags?': 'number.integer | null',
  'applied_tags?': type(type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 5'))).or(
    'null',
  ),
  'bitrate?':
    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 8000 | null',
  'user_limit?': 'number.integer >= 0 & number.integer <= 99 | null',
  'rtc_region?': 'string | null',
  'video_quality_mode?': type('null | null').or(VideoQualityModesSchema),
})

export type UpdateThreadRequestPartial = typeof UpdateThreadRequestPartialSchema.infer

export const UpdateVoiceStateRequestPartialSchema = type({
  'suppress?': 'boolean | null',
  'channel_id?': type('null | null').or(SnowflakeTypeSchema),
})

export type UpdateVoiceStateRequestPartial = typeof UpdateVoiceStateRequestPartialSchema.infer

export const UserGuildOnboardingResponseSchema = type({
  guild_id: SnowflakeTypeSchema,
  prompts: type(OnboardingPromptResponseSchema).array(),
  default_channel_ids: type(SnowflakeTypeSchema)
    .array()
    .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  enabled: 'boolean',
  mode: GuildOnboardingModeSchema,
})

export type UserGuildOnboardingResponse = typeof UserGuildOnboardingResponseSchema.infer

export const UserPIIResponseSchema = type({
  id: SnowflakeTypeSchema.describe("the user's id"),
  username: type('string').describe("the user's username, not unique across the platform"),
  avatar: type('string | null').describe("the user's avatar hash"),
  discriminator: type('string').describe("the user's Discord-tag"),
  public_flags: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    "the public flags on a user's account",
  ),
  flags: Int53TypeSchema.describe("the flags on a user's account"),
  'bot?': type('boolean').describe('whether the user belongs to an OAuth2 application'),
  'system?': type('boolean').describe(
    'whether the user is an Official Discord System user (part of the urgent message system)',
  ),
  'banner?': type('string | null').describe("the user's banner hash"),
  'accent_color?': type(
    'number.integer >= -2147483648 & number.integer <= 2147483647 | null',
  ).describe(
    "the user's banner color encoded as an integer representation of hexadecimal color code",
  ),
  global_name: type('string | null').describe("the user's display name, if it is set"),
  'avatar_decoration_data?': type('null | null')
    .or(UserAvatarDecorationResponseSchema)
    .describe("data for the user's avatar decoration"),
  'collectibles?': type('null | null')
    .or(UserCollectiblesResponseSchema)
    .describe("data for the user's collectibles"),
  'primary_guild?': type('null | null').or(UserPrimaryGuildResponseSchema),
  mfa_enabled: 'boolean',
  locale: AvailableLocalesEnumSchema,
  'premium_type?': PremiumTypesSchema,
  'email?': 'string | null',
  'verified?': 'boolean',
})

export type UserPIIResponse = typeof UserPIIResponseSchema.infer

export const UserProfileMetadataSchema = type({
  'keyword_filter?': type(
    type(
      type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 60 || ctx.mustBe('at most 60 characters')),
      ).array(),
    ).and(type('unknown[] <= 1000')),
  ).or('null'),
  'regex_patterns?': type(
    type(
      type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 260 || ctx.mustBe('at most 260 characters')),
      ).array(),
    ).and(type('unknown[] <= 10')),
  ).or('null'),
  'allow_list?': type(
    type(
      type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 60 || ctx.mustBe('at most 60 characters')),
      ).array(),
    ).and(type('unknown[] <= 100')),
  ).or('null'),
})

export type UserProfileMetadata = typeof UserProfileMetadataSchema.infer

export const UserProfileUpsertRequestSchema = type({
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  event_type: AutomodEventTypeSchema,
  'actions?': type(
    type(
      type(
        type(
          type(type(BlockMessageActionSchema).or(FlagToChannelActionSchema)).or(
            QuarantineUserActionSchema,
          ),
        ).or(UserCommunicationDisabledActionSchema),
      ).array(),
    ).and(type('1 <= unknown[] <= 5')),
  ).or('null'),
  'enabled?': 'boolean | null',
  'exempt_roles?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 20'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'exempt_channels?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 50'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  trigger_type: AutomodTriggerTypeSchema,
  trigger_metadata: UserProfileMetadataSchema,
})

export type UserProfileUpsertRequest = typeof UserProfileUpsertRequestSchema.infer

export const UserProfileUpsertRequestPartialSchema = type({
  'name?': type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  'event_type?': AutomodEventTypeSchema,
  'actions?': type(
    type(
      type(
        type(
          type(type(BlockMessageActionSchema).or(FlagToChannelActionSchema)).or(
            QuarantineUserActionSchema,
          ),
        ).or(UserCommunicationDisabledActionSchema),
      ).array(),
    ).and(type('1 <= unknown[] <= 5')),
  ).or('null'),
  'enabled?': 'boolean | null',
  'exempt_roles?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 20'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'exempt_channels?': type(
    type(type(SnowflakeTypeSchema).array())
      .and(type('unknown[] <= 50'))
      .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
  ).or('null'),
  'trigger_type?': AutomodTriggerTypeSchema,
  'trigger_metadata?': UserProfileMetadataSchema,
})

export type UserProfileUpsertRequestPartial = typeof UserProfileUpsertRequestPartialSchema.infer

export const VanityURLErrorResponseSchema = type({
  message: 'string',
  code: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type VanityURLErrorResponse = typeof VanityURLErrorResponseSchema.infer

export const VanityURLResponseSchema = type({
  code: 'string | null',
  uses: 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'error?': type('null | null').or(VanityURLErrorResponseSchema),
})

export type VanityURLResponse = typeof VanityURLResponseSchema.infer

export const VoiceRegionResponseSchema = type({
  id: 'string',
  name: 'string',
  custom: 'boolean',
  deprecated: 'boolean',
  optimal: 'boolean',
})

export type VoiceRegionResponse = typeof VoiceRegionResponseSchema.infer

export const VoiceScheduledEventCreateRequestSchema = type({
  name: type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 1000 || ctx.mustBe('at most 1000 characters'),
    ),
  ).or('null'),
  'image?': 'string | null',
  scheduled_start_time: type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  'scheduled_end_time?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  privacy_level: GuildScheduledEventPrivacyLevelsSchema,
  entity_type: GuildScheduledEventEntityTypesSchema,
  'channel_id?': type('null | null').or(SnowflakeTypeSchema),
  'recurrence_rule?': type('null | null')
    .or(RecurrenceRuleSchema)
    .describe('Recurrence rule for the scheduled event'),
  'entity_metadata?': type('null | null').or(EntityMetadataVoiceSchema),
})

export type VoiceScheduledEventCreateRequest = typeof VoiceScheduledEventCreateRequestSchema.infer

export const VoiceScheduledEventPatchRequestPartialSchema = type({
  'status?': type('null | null').or(GuildScheduledEventStatusesSchema),
  'name?': type('string').narrow(
    (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
  ),
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 1000 || ctx.mustBe('at most 1000 characters'),
    ),
  ).or('null'),
  'image?': 'string | null',
  'scheduled_start_time?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  'scheduled_end_time?': type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  'entity_type?': type('null | null').or(GuildScheduledEventEntityTypesSchema),
  'privacy_level?': GuildScheduledEventPrivacyLevelsSchema,
  'channel_id?': type('null | null').or(SnowflakeTypeSchema),
  'recurrence_rule?': type('null | null')
    .or(RecurrenceRuleSchema)
    .describe('Recurrence rule for the scheduled event'),
  'entity_metadata?': type('null | null').or(EntityMetadataVoiceSchema),
})

export type VoiceScheduledEventPatchRequestPartial =
  typeof VoiceScheduledEventPatchRequestPartialSchema.infer

export const VoiceStateResponseSchema = type({
  channel_id: type('null | null').or(SnowflakeTypeSchema),
  deaf: 'boolean',
  guild_id: type('null | null').or(SnowflakeTypeSchema),
  'member?': GuildMemberResponseSchema,
  mute: 'boolean',
  request_to_speak_timestamp: type(
    type(
      /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
    ),
  ).or('null'),
  suppress: 'boolean',
  self_stream: 'boolean | null',
  self_deaf: 'boolean',
  self_mute: 'boolean',
  self_video: 'boolean',
  session_id: 'string',
  user_id: SnowflakeTypeSchema,
})

export type VoiceStateResponse = typeof VoiceStateResponseSchema.infer

export const WelcomeScreenPatchRequestPartialSchema = type({
  'description?': type(
    type('string').narrow(
      (data, ctx) => [...data].length <= 140 || ctx.mustBe('at most 140 characters'),
    ),
  ).or('null'),
  'welcome_channels?': type(
    type(type(GuildWelcomeChannelSchema).array()).and(type('unknown[] <= 5')),
  ).or('null'),
  'enabled?': 'boolean | null',
})

export type WelcomeScreenPatchRequestPartial = typeof WelcomeScreenPatchRequestPartialSchema.infer

export const WidgetActivitySchema = type({ name: 'string' })

export type WidgetActivity = typeof WidgetActivitySchema.infer

export const WidgetChannelSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  position: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type WidgetChannel = typeof WidgetChannelSchema.infer

export const WidgetImageStylesSchema = type(
  type(
    type(
      type(
        type("'shield'").describe(
          'shield style widget with Discord icon and guild members online count',
        ),
      ).or(
        type("'banner1'").describe(
          'large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget',
        ),
      ),
    ).or(
      type("'banner2'").describe(
        'smaller widget style with guild icon, name and online count. Split on the right with Discord logo',
      ),
    ),
  ).or(
    type("'banner3'").describe(
      'large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right',
    ),
  ),
).or(
  type("'banner4'").describe(
    'large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom',
  ),
)

export type WidgetImageStyles = typeof WidgetImageStylesSchema.infer

export const WidgetUserDiscriminatorSchema = type("'0000'")

export type WidgetUserDiscriminator = typeof WidgetUserDiscriminatorSchema.infer

export const WidgetMemberSchema = type({
  id: 'string',
  username: 'string',
  discriminator: WidgetUserDiscriminatorSchema,
  avatar: 'null | null',
  status: 'string',
  avatar_url: 'string.url',
  'activity?': WidgetActivitySchema,
  'deaf?': 'boolean',
  'mute?': 'boolean',
  'self_deaf?': 'boolean',
  'self_mute?': 'boolean',
  'suppress?': 'boolean',
  'channel_id?': SnowflakeTypeSchema,
})

export type WidgetMember = typeof WidgetMemberSchema.infer

export const WidgetResponseSchema = type({
  id: SnowflakeTypeSchema,
  name: 'string',
  instant_invite: 'string | null',
  channels: type(WidgetChannelSchema).array(),
  members: type(WidgetMemberSchema).array(),
  presence_count: 'number.integer >= -2147483648 & number.integer <= 2147483647',
})

export type WidgetResponse = typeof WidgetResponseSchema.infer

export const WidgetSettingsResponseSchema = type({
  enabled: 'boolean',
  channel_id: type('null | null').or(SnowflakeTypeSchema),
})

export type WidgetSettingsResponse = typeof WidgetSettingsResponseSchema.infer

export const ErrorSchema = type({
  code: type('number.integer').describe('Discord internal error code. See error code reference'),
  message: type('string').describe('Human-readable error message'),
}).describe('A single error, either for an API response or a specific field.')

export type Error = typeof ErrorSchema.infer

export const InnerErrorsSchema = type({
  _errors: type(ErrorSchema).array().describe('The list of errors for this field'),
  '+': 'reject',
})

export type InnerErrors = typeof InnerErrorsSchema.infer

export const ErrorDetailsSchema = scope({
  InnerErrorsSchema: InnerErrorsSchema,
  ErrorDetailsSchema: [{ '[string]': 'ErrorDetailsSchema' }, '|', 'InnerErrorsSchema'],
}).export().ErrorDetailsSchema

export type ErrorDetails = typeof ErrorDetailsSchema.infer

export const ErrorResponseSchema = type(ErrorSchema)
  .and(type({ 'errors?': ErrorDetailsSchema }))
  .describe('Errors object returned by the Discord API')

export type ErrorResponse = typeof ErrorResponseSchema.infer

export const RatelimitedResponseSchema = type(ErrorSchema)
  .and(
    type({
      retry_after: type('number').describe(
        'The number of seconds to wait before retrying your request',
      ),
      global: type('boolean').describe(
        'Whether you are being ratelimited by the global ratelimit or a per-endpoint ratelimit',
      ),
    }),
  )
  .describe('Ratelimit error object returned by the Discord API')

export type RatelimitedResponse = typeof RatelimitedResponseSchema.infer

export const XRateLimitLimitHeaderSchema = type('number.integer')
export const XRateLimitRemainingHeaderSchema = type('number.integer')
export const XRateLimitResetHeaderSchema = type('number')
export const XRateLimitResetAfterHeaderSchema = type('number')
export const XRateLimitBucketHeaderSchema = type('string')

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
