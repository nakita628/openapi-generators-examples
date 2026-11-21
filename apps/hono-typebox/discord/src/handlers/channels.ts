import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import {
  AllowedMentionTypesSchema,
  ButtonStyleTypesSchema,
  ChannelPermissionOverwritesSchema,
  ChannelSelectDefaultValueSchema,
  ChannelTypesSchema,
  ComponentEmojiForRequestSchema,
  CreateForumThreadRequestSchema,
  CreateGroupDMInviteRequestSchema,
  CreateGuildInviteRequestSchema,
  CreateTextThreadWithMessageRequestSchema,
  CreateTextThreadWithoutMessageRequestSchema,
  InviteTargetTypesSchema,
  MessageComponentSeparatorSpacingSizeSchema,
  MessageComponentTypesSchema,
  MessageCreateRequestSchema,
  MessageEditRequestPartialSchema,
  MessageReferenceTypeSchema,
  MessageShareCustomUserThemeBaseThemeSchema,
  PollLayoutTypesSchema,
  ReactionTypesSchema,
  RichEmbedAudioSchema,
  RichEmbedAuthorSchema,
  RichEmbedFooterSchema,
  RichEmbedProviderSchema,
  RoleSelectDefaultValueSchema,
  SnowflakeTypeSchema,
  SortingOrderSchema,
  SoundboardSoundSendRequestSchema,
  ThreadAutoArchiveDurationSchema,
  ThreadSearchTagSettingSchema,
  ThreadSortingModeSchema,
  UnfurledMediaRequestSchema,
  UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
  UpdateDMRequestPartialSchema,
  UpdateGroupDMRequestPartialSchema,
  UpdateGuildChannelRequestPartialSchema,
  UpdateThreadRequestPartialSchema,
  UserSelectDefaultValueSchema,
} from '../components'

export const channelsHandler = new Hono()
  .get(
    '/channels/:channel_id',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/channels/:channel_id',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/channels/:channel_id',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Union([
        UpdateDMRequestPartialSchema,
        UpdateGroupDMRequestPartialSchema,
        UpdateGuildChannelRequestPartialSchema,
        UpdateThreadRequestPartialSchema,
      ]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/channels/:channel_id/followers',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator('json', Type.Object({ webhook_channel_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/invites',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/channels/:channel_id/invites',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Union([CreateGroupDMInviteRequestSchema, CreateGuildInviteRequestSchema]),
    ),
    tbValidator(
      'form',
      Type.Union([
        Type.Object({
          max_age: Type.Optional(
            Type.Union([
              Codec(Type.String())
                .Decode((value) => Number.parseInt(value, 10))
                .Encode((value) => String(value)),
              Type.Null(),
            ]),
          ),
        }),
        Type.Object({
          max_age: Type.Optional(
            Type.Union([
              Codec(Type.String())
                .Decode((value) => Number.parseInt(value, 10))
                .Encode((value) => String(value)),
              Type.Null(),
            ]),
          ),
          temporary: Type.Optional(
            Type.Union([
              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                .Decode((value) => value === 'true')
                .Encode((value) => (value ? 'true' : 'false')),
              Type.Null(),
            ]),
          ),
          max_uses: Type.Optional(
            Type.Union([
              Codec(Type.String())
                .Decode((value) => Number.parseInt(value, 10))
                .Encode((value) => String(value)),
              Type.Null(),
            ]),
          ),
          unique: Type.Optional(
            Type.Union([
              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                .Decode((value) => value === 'true')
                .Encode((value) => (value ? 'true' : 'false')),
              Type.Null(),
            ]),
          ),
          target_user_id: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
          ),
          target_application_id: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
          ),
          target_type: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), InviteTargetTypesSchema]),
          ),
          role_ids: Type.Optional(
            Type.Union([
              Type.String(),
              Type.Array(SnowflakeTypeSchema, { maxItems: 250, uniqueItems: true }),
              Type.Union([Type.Null(), Type.Null()]),
            ]),
          ),
          target_user_ids: Type.Optional(
            Type.Union(
              [
                Type.String(),
                Type.Array(SnowflakeTypeSchema, { maxItems: 1000, uniqueItems: true }),
                Type.Union([Type.Null(), Type.Null()]),
              ],
              { description: 'The IDs of the users to target with this invite.' },
            ),
          ),
        }),
      ]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/messages',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        around: Type.Optional(SnowflakeTypeSchema),
        before: Type.Optional(SnowflakeTypeSchema),
        after: Type.Optional(SnowflakeTypeSchema),
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/channels/:channel_id/messages',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator('json', MessageCreateRequestSchema),
    tbValidator(
      'form',
      Type.Object({
        content: Type.Optional(Type.Union([Type.String({ maxLength: 4000 }), Type.Null()])),
        embeds: Type.Optional(
          Type.Union([
            Type.Array(
              Type.Object({
                type: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
                url: Type.Optional(
                  Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                ),
                title: Type.Optional(Type.Union([Type.String({ maxLength: 256 }), Type.Null()])),
                color: Type.Optional(
                  Type.Union([
                    Codec(Type.String())
                      .Decode((value) => Number.parseInt(value, 10))
                      .Encode((value) => String(value)),
                    Type.Null(),
                  ]),
                ),
                timestamp: Type.Optional(
                  Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
                ),
                description: Type.Optional(
                  Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                ),
                author: Type.Optional(
                  Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAuthorSchema]),
                ),
                image: Type.Optional(
                  Type.Union([
                    Type.Union([Type.Null(), Type.Null()]),
                    Type.Object({
                      url: Type.Optional(
                        Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                      ),
                      width: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      height: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      placeholder: Type.Optional(
                        Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                      ),
                      placeholder_version: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      is_animated: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      description: Type.Optional(
                        Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                      ),
                    }),
                  ]),
                ),
                thumbnail: Type.Optional(
                  Type.Union([
                    Type.Union([Type.Null(), Type.Null()]),
                    Type.Object({
                      url: Type.Optional(
                        Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                      ),
                      width: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      height: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      placeholder: Type.Optional(
                        Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                      ),
                      placeholder_version: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      is_animated: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      description: Type.Optional(
                        Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                      ),
                    }),
                  ]),
                ),
                footer: Type.Optional(
                  Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedFooterSchema]),
                ),
                fields: Type.Optional(
                  Type.Union([
                    Type.Array(
                      Type.Object({
                        name: Type.String({ maxLength: 256 }),
                        value: Type.String({ maxLength: 1024 }),
                        inline: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                      }),
                      { maxItems: 25 },
                    ),
                    Type.Null(),
                  ]),
                ),
                provider: Type.Optional(
                  Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedProviderSchema]),
                ),
                video: Type.Optional(
                  Type.Union([
                    Type.Union([Type.Null(), Type.Null()]),
                    Type.Object({
                      url: Type.Optional(
                        Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                      ),
                      width: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      height: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      placeholder: Type.Optional(
                        Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                      ),
                      placeholder_version: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      is_animated: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      description: Type.Optional(
                        Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                      ),
                    }),
                  ]),
                ),
                audio: Type.Optional(
                  Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAudioSchema]),
                ),
              }),
              { maxItems: 10 },
            ),
            Type.Null(),
          ]),
        ),
        allowed_mentions: Type.Optional(
          Type.Union([
            Type.Union([Type.Null(), Type.Null()]),
            Type.Object({
              parse: Type.Optional(
                Type.Union([
                  Type.Array(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), AllowedMentionTypesSchema]),
                    { maxItems: 1521, uniqueItems: true },
                  ),
                  Type.Null(),
                ]),
              ),
              users: Type.Optional(
                Type.Union([
                  Type.Array(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                    { maxItems: 100, uniqueItems: true },
                  ),
                  Type.Null(),
                ]),
              ),
              roles: Type.Optional(
                Type.Union([
                  Type.Array(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                    { maxItems: 100, uniqueItems: true },
                  ),
                  Type.Null(),
                ]),
              ),
              replied_user: Type.Optional(
                Type.Union([
                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                    .Decode((value) => value === 'true')
                    .Encode((value) => (value ? 'true' : 'false')),
                  Type.Null(),
                ]),
              ),
            }),
          ]),
        ),
        sticker_ids: Type.Optional(
          Type.Union([Type.Array(SnowflakeTypeSchema, { maxItems: 3 }), Type.Null()]),
        ),
        components: Type.Optional(
          Type.Union([
            Type.Array(
              Type.Union([
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  components: Type.Array(
                    Type.Union([
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.Optional(
                          Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
                        ),
                        style: ButtonStyleTypesSchema,
                        label: Type.Optional(
                          Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        url: Type.Optional(
                          Type.Union([Type.String({ format: 'uri', maxLength: 512 }), Type.Null()]),
                        ),
                        sku_id: Type.Optional(
                          Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                        ),
                        emoji: Type.Optional(
                          Type.Union([
                            Type.Union([Type.Null(), Type.Null()]),
                            ComponentEmojiForRequestSchema,
                          ]),
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                        ),
                        min_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        max_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        required: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        default_values: Type.Optional(
                          Type.Union([
                            Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                            Type.Null(),
                          ]),
                        ),
                        channel_types: Type.Optional(
                          Type.Union([
                            Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                            Type.Null(),
                          ]),
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                        ),
                        min_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        max_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        required: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        default_values: Type.Optional(
                          Type.Union([
                            Type.Array(
                              Type.Union([
                                RoleSelectDefaultValueSchema,
                                UserSelectDefaultValueSchema,
                              ]),
                              { maxItems: 25 },
                            ),
                            Type.Null(),
                          ]),
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                        ),
                        min_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        max_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        required: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        default_values: Type.Optional(
                          Type.Union([
                            Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                            Type.Null(),
                          ]),
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                        ),
                        min_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        max_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        required: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        options: Type.Array(
                          Type.Object({
                            label: Type.String({ minLength: 1, maxLength: 100 }),
                            value: Type.String({ minLength: 1, maxLength: 100 }),
                            description: Type.Optional(
                              Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                            ),
                            default: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            emoji: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                ComponentEmojiForRequestSchema,
                              ]),
                            ),
                          }),
                          { minItems: 1, maxItems: 25 },
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                        ),
                        min_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        max_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        required: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        default_values: Type.Optional(
                          Type.Union([
                            Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                            Type.Null(),
                          ]),
                        ),
                      }),
                    ]),
                    { minItems: 1, maxItems: 5 },
                  ),
                }),
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  accent_color: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  components: Type.Array(
                    Type.Union([
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        components: Type.Array(
                          Type.Union([
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.Optional(
                                Type.Union([
                                  Type.String({ minLength: 1, maxLength: 100 }),
                                  Type.Null(),
                                ]),
                              ),
                              style: ButtonStyleTypesSchema,
                              label: Type.Optional(
                                Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              url: Type.Optional(
                                Type.Union([
                                  Type.String({ format: 'uri', maxLength: 512 }),
                                  Type.Null(),
                                ]),
                              ),
                              sku_id: Type.Optional(
                                Type.Union([
                                  Type.Union([Type.Null(), Type.Null()]),
                                  SnowflakeTypeSchema,
                                ]),
                              ),
                              emoji: Type.Optional(
                                Type.Union([
                                  Type.Union([Type.Null(), Type.Null()]),
                                  ComponentEmojiForRequestSchema,
                                ]),
                              ),
                            }),
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                              placeholder: Type.Optional(
                                Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                              ),
                              min_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              max_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              required: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              default_values: Type.Optional(
                                Type.Union([
                                  Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                                  Type.Null(),
                                ]),
                              ),
                              channel_types: Type.Optional(
                                Type.Union([
                                  Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                                  Type.Null(),
                                ]),
                              ),
                            }),
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                              placeholder: Type.Optional(
                                Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                              ),
                              min_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              max_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              required: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              default_values: Type.Optional(
                                Type.Union([
                                  Type.Array(
                                    Type.Union([
                                      RoleSelectDefaultValueSchema,
                                      UserSelectDefaultValueSchema,
                                    ]),
                                    { maxItems: 25 },
                                  ),
                                  Type.Null(),
                                ]),
                              ),
                            }),
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                              placeholder: Type.Optional(
                                Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                              ),
                              min_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              max_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              required: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              default_values: Type.Optional(
                                Type.Union([
                                  Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                                  Type.Null(),
                                ]),
                              ),
                            }),
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                              placeholder: Type.Optional(
                                Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                              ),
                              min_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              max_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              required: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              options: Type.Array(
                                Type.Object({
                                  label: Type.String({ minLength: 1, maxLength: 100 }),
                                  value: Type.String({ minLength: 1, maxLength: 100 }),
                                  description: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                                  ),
                                  default: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  emoji: Type.Optional(
                                    Type.Union([
                                      Type.Union([Type.Null(), Type.Null()]),
                                      ComponentEmojiForRequestSchema,
                                    ]),
                                  ),
                                }),
                                { minItems: 1, maxItems: 25 },
                              ),
                            }),
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                              placeholder: Type.Optional(
                                Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                              ),
                              min_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              max_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              required: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              default_values: Type.Optional(
                                Type.Union([
                                  Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                                  Type.Null(),
                                ]),
                              ),
                            }),
                          ]),
                          { minItems: 1, maxItems: 5 },
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        spoiler: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        items: Type.Array(
                          Type.Object({
                            description: Type.Optional(
                              Type.Union([
                                Type.String({ minLength: 1, maxLength: 1024 }),
                                Type.Null(),
                              ]),
                            ),
                            spoiler: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            media: UnfurledMediaRequestSchema,
                          }),
                          { minItems: 1, maxItems: 10 },
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        components: Type.Array(
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            content: Type.String({ minLength: 1, maxLength: 4000 }),
                          }),
                          { minItems: 1, maxItems: 3 },
                        ),
                        accessory: Type.Union([
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.Optional(
                              Type.Union([
                                Type.String({ minLength: 1, maxLength: 100 }),
                                Type.Null(),
                              ]),
                            ),
                            style: ButtonStyleTypesSchema,
                            label: Type.Optional(
                              Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            url: Type.Optional(
                              Type.Union([
                                Type.String({ format: 'uri', maxLength: 512 }),
                                Type.Null(),
                              ]),
                            ),
                            sku_id: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                SnowflakeTypeSchema,
                              ]),
                            ),
                            emoji: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                ComponentEmojiForRequestSchema,
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            description: Type.Optional(
                              Type.Union([
                                Type.String({ minLength: 1, maxLength: 1024 }),
                                Type.Null(),
                              ]),
                            ),
                            spoiler: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            media: UnfurledMediaRequestSchema,
                          }),
                        ]),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        spacing: Type.Optional(
                          Type.Union([
                            Type.Union([Type.Null(), Type.Null()]),
                            MessageComponentSeparatorSpacingSizeSchema,
                          ]),
                        ),
                        divider: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        content: Type.String({ minLength: 1, maxLength: 4000 }),
                      }),
                    ]),
                    { minItems: 1, maxItems: 40 },
                  ),
                  spoiler: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                }),
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  spoiler: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                  file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                }),
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  items: Type.Array(
                    Type.Object({
                      description: Type.Optional(
                        Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                      ),
                      spoiler: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      media: UnfurledMediaRequestSchema,
                    }),
                    { minItems: 1, maxItems: 10 },
                  ),
                }),
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  components: Type.Array(
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      content: Type.String({ minLength: 1, maxLength: 4000 }),
                    }),
                    { minItems: 1, maxItems: 3 },
                  ),
                  accessory: Type.Union([
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      custom_id: Type.Optional(
                        Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
                      ),
                      style: ButtonStyleTypesSchema,
                      label: Type.Optional(
                        Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                      ),
                      disabled: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      url: Type.Optional(
                        Type.Union([Type.String({ format: 'uri', maxLength: 512 }), Type.Null()]),
                      ),
                      sku_id: Type.Optional(
                        Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                      ),
                      emoji: Type.Optional(
                        Type.Union([
                          Type.Union([Type.Null(), Type.Null()]),
                          ComponentEmojiForRequestSchema,
                        ]),
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      description: Type.Optional(
                        Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                      ),
                      spoiler: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      media: UnfurledMediaRequestSchema,
                    }),
                  ]),
                }),
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  spacing: Type.Optional(
                    Type.Union([
                      Type.Union([Type.Null(), Type.Null()]),
                      MessageComponentSeparatorSpacingSizeSchema,
                    ]),
                  ),
                  divider: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                }),
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  content: Type.String({ minLength: 1, maxLength: 4000 }),
                }),
              ]),
              { maxItems: 40 },
            ),
            Type.Null(),
          ]),
        ),
        flags: Type.Optional(
          Type.Union([
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
            Type.Null(),
          ]),
        ),
        attachments: Type.Optional(
          Type.Union([
            Type.Array(
              Type.Object({
                id: SnowflakeTypeSchema,
                filename: Type.Optional(
                  Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                ),
                description: Type.Optional(
                  Type.Union([Type.String({ maxLength: 1024 }), Type.Null()]),
                ),
                duration_secs: Type.Optional(
                  Type.Union([
                    Codec(Type.String())
                      .Decode((value) => Number(value))
                      .Encode((value) => String(value)),
                    Type.Null(),
                  ]),
                ),
                waveform: Type.Optional(Type.Union([Type.String({ maxLength: 400 }), Type.Null()])),
                title: Type.Optional(Type.Union([Type.String({ maxLength: 1024 }), Type.Null()])),
                is_spoiler: Type.Optional(
                  Type.Union([
                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                      .Decode((value) => value === 'true')
                      .Encode((value) => (value ? 'true' : 'false')),
                    Type.Null(),
                  ]),
                ),
              }),
              { maxItems: 10 },
            ),
            Type.Null(),
          ]),
        ),
        poll: Type.Optional(
          Type.Union([
            Type.Union([Type.Null(), Type.Null()]),
            Type.Object({
              question: Type.Object(
                {
                  text: Type.Optional(
                    Type.Union([
                      Type.String({
                        minLength: 1,
                        maxLength: 300,
                        description: 'The text of the field',
                      }),
                      Type.Null(),
                    ]),
                  ),
                  emoji: Type.Optional(
                    Type.Union(
                      [
                        Type.Union([Type.Null(), Type.Null()]),
                        Type.Object({
                          id: Type.Optional(
                            Type.Union(
                              [Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema],
                              { description: 'The ID of the custom emoji' },
                            ),
                          ),
                          name: Type.Optional(
                            Type.Union([
                              Type.String({
                                maxLength: 32,
                                description:
                                  'The name of the emoji, or the unicode emoji character',
                              }),
                              Type.Null(),
                            ]),
                          ),
                          animated: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                        }),
                      ],
                      { description: 'The emoji of the field' },
                    ),
                  ),
                },
                { description: 'The question of the poll. Only `text` is supported.' },
              ),
              answers: Type.Array(
                Type.Object({
                  poll_media: Type.Object(
                    {
                      text: Type.Optional(
                        Type.Union([
                          Type.String({
                            minLength: 1,
                            maxLength: 300,
                            description: 'The text of the field',
                          }),
                          Type.Null(),
                        ]),
                      ),
                      emoji: Type.Optional(
                        Type.Union(
                          [
                            Type.Union([Type.Null(), Type.Null()]),
                            Type.Object({
                              id: Type.Optional(
                                Type.Union(
                                  [Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema],
                                  { description: 'The ID of the custom emoji' },
                                ),
                              ),
                              name: Type.Optional(
                                Type.Union([
                                  Type.String({
                                    maxLength: 32,
                                    description:
                                      'The name of the emoji, or the unicode emoji character',
                                  }),
                                  Type.Null(),
                                ]),
                              ),
                              animated: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                            }),
                          ],
                          { description: 'The emoji of the field' },
                        ),
                      ),
                    },
                    { description: 'The data of the answer' },
                  ),
                }),
                {
                  minItems: 1,
                  maxItems: 10,
                  description: 'Each of the answers available in the poll, up to 10',
                },
              ),
              allow_multiselect: Type.Optional(
                Type.Union([
                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                    .Decode((value) => value === 'true')
                    .Encode((value) => (value ? 'true' : 'false')),
                  Type.Null(),
                ]),
              ),
              layout_type: Type.Optional(
                Type.Union([Type.Union([Type.Null(), Type.Null()]), PollLayoutTypesSchema], {
                  description: 'The layout type of the poll. Defaults to... DEFAULT!',
                }),
              ),
              duration: Type.Optional(
                Type.Union([
                  Codec(Type.String())
                    .Decode((value) => Number.parseInt(value, 10))
                    .Encode((value) => String(value)),
                  Type.Null(),
                ]),
              ),
            }),
          ]),
        ),
        shared_client_theme: Type.Optional(
          Type.Union([
            Type.Union([Type.Null(), Type.Null()]),
            Type.Object({
              colors: Type.Array(Type.String({ minLength: 6, maxLength: 6 }), {
                minItems: 1,
                maxItems: 5,
              }),
              gradient_angle: Codec(Type.String())
                .Decode((value) => Number.parseInt(value, 10))
                .Encode((value) => String(value)),
              base_mix: Codec(Type.String())
                .Decode((value) => Number.parseInt(value, 10))
                .Encode((value) => String(value)),
              base_theme: Type.Optional(
                Type.Union([
                  Type.Union([Type.Null(), Type.Null()]),
                  MessageShareCustomUserThemeBaseThemeSchema,
                ]),
              ),
            }),
          ]),
        ),
        message_reference: Type.Optional(
          Type.Union([
            Type.Union([Type.Null(), Type.Null()]),
            Type.Object({
              guild_id: Type.Optional(
                Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
              ),
              channel_id: Type.Optional(
                Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
              ),
              message_id: SnowflakeTypeSchema,
              fail_if_not_exists: Type.Optional(
                Type.Union([
                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                    .Decode((value) => value === 'true')
                    .Encode((value) => (value ? 'true' : 'false')),
                  Type.Null(),
                ]),
              ),
              type: Type.Optional(
                Type.Union([Type.Union([Type.Null(), Type.Null()]), MessageReferenceTypeSchema]),
              ),
            }),
          ]),
        ),
        nonce: Type.Optional(
          Type.Union([
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
            Type.String({ maxLength: 25 }),
            Type.Union([Type.Null(), Type.Null()]),
          ]),
        ),
        enforce_nonce: Type.Optional(
          Type.Union([
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
            Type.Null(),
          ]),
        ),
        tts: Type.Optional(
          Type.Union([
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
            Type.Null(),
          ]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/channels/:channel_id/messages/bulk-delete',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Object({
        messages: Type.Array(SnowflakeTypeSchema, {
          minItems: 2,
          maxItems: 100,
          uniqueItems: true,
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/messages/pins',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        before: Type.Optional(Type.String({ format: 'date-time' })),
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/channels/:channel_id/messages/pins/:message_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/channels/:channel_id/messages/pins/:message_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/messages/:message_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/channels/:channel_id/messages/:message_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/channels/:channel_id/messages/:message_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    tbValidator('json', MessageEditRequestPartialSchema),
    tbValidator(
      'form',
      Type.Object({
        content: Type.Optional(Type.Union([Type.String({ maxLength: 4000 }), Type.Null()])),
        embeds: Type.Optional(
          Type.Union([
            Type.Array(
              Type.Object({
                type: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
                url: Type.Optional(
                  Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                ),
                title: Type.Optional(Type.Union([Type.String({ maxLength: 256 }), Type.Null()])),
                color: Type.Optional(
                  Type.Union([
                    Codec(Type.String())
                      .Decode((value) => Number.parseInt(value, 10))
                      .Encode((value) => String(value)),
                    Type.Null(),
                  ]),
                ),
                timestamp: Type.Optional(
                  Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
                ),
                description: Type.Optional(
                  Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                ),
                author: Type.Optional(
                  Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAuthorSchema]),
                ),
                image: Type.Optional(
                  Type.Union([
                    Type.Union([Type.Null(), Type.Null()]),
                    Type.Object({
                      url: Type.Optional(
                        Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                      ),
                      width: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      height: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      placeholder: Type.Optional(
                        Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                      ),
                      placeholder_version: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      is_animated: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      description: Type.Optional(
                        Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                      ),
                    }),
                  ]),
                ),
                thumbnail: Type.Optional(
                  Type.Union([
                    Type.Union([Type.Null(), Type.Null()]),
                    Type.Object({
                      url: Type.Optional(
                        Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                      ),
                      width: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      height: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      placeholder: Type.Optional(
                        Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                      ),
                      placeholder_version: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      is_animated: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      description: Type.Optional(
                        Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                      ),
                    }),
                  ]),
                ),
                footer: Type.Optional(
                  Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedFooterSchema]),
                ),
                fields: Type.Optional(
                  Type.Union([
                    Type.Array(
                      Type.Object({
                        name: Type.String({ maxLength: 256 }),
                        value: Type.String({ maxLength: 1024 }),
                        inline: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                      }),
                      { maxItems: 25 },
                    ),
                    Type.Null(),
                  ]),
                ),
                provider: Type.Optional(
                  Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedProviderSchema]),
                ),
                video: Type.Optional(
                  Type.Union([
                    Type.Union([Type.Null(), Type.Null()]),
                    Type.Object({
                      url: Type.Optional(
                        Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                      ),
                      width: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      height: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      placeholder: Type.Optional(
                        Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                      ),
                      placeholder_version: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      is_animated: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      description: Type.Optional(
                        Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                      ),
                    }),
                  ]),
                ),
                audio: Type.Optional(
                  Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAudioSchema]),
                ),
              }),
              { maxItems: 10 },
            ),
            Type.Null(),
          ]),
        ),
        flags: Type.Optional(
          Type.Union([
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
            Type.Null(),
          ]),
        ),
        allowed_mentions: Type.Optional(
          Type.Union([
            Type.Union([Type.Null(), Type.Null()]),
            Type.Object({
              parse: Type.Optional(
                Type.Union([
                  Type.Array(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), AllowedMentionTypesSchema]),
                    { maxItems: 1521, uniqueItems: true },
                  ),
                  Type.Null(),
                ]),
              ),
              users: Type.Optional(
                Type.Union([
                  Type.Array(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                    { maxItems: 100, uniqueItems: true },
                  ),
                  Type.Null(),
                ]),
              ),
              roles: Type.Optional(
                Type.Union([
                  Type.Array(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                    { maxItems: 100, uniqueItems: true },
                  ),
                  Type.Null(),
                ]),
              ),
              replied_user: Type.Optional(
                Type.Union([
                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                    .Decode((value) => value === 'true')
                    .Encode((value) => (value ? 'true' : 'false')),
                  Type.Null(),
                ]),
              ),
            }),
          ]),
        ),
        sticker_ids: Type.Optional(
          Type.Union([Type.Array(SnowflakeTypeSchema, { maxItems: 1521 }), Type.Null()]),
        ),
        components: Type.Optional(
          Type.Union([
            Type.Array(
              Type.Union([
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  components: Type.Array(
                    Type.Union([
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.Optional(
                          Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
                        ),
                        style: ButtonStyleTypesSchema,
                        label: Type.Optional(
                          Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        url: Type.Optional(
                          Type.Union([Type.String({ format: 'uri', maxLength: 512 }), Type.Null()]),
                        ),
                        sku_id: Type.Optional(
                          Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                        ),
                        emoji: Type.Optional(
                          Type.Union([
                            Type.Union([Type.Null(), Type.Null()]),
                            ComponentEmojiForRequestSchema,
                          ]),
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                        ),
                        min_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        max_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        required: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        default_values: Type.Optional(
                          Type.Union([
                            Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                            Type.Null(),
                          ]),
                        ),
                        channel_types: Type.Optional(
                          Type.Union([
                            Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                            Type.Null(),
                          ]),
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                        ),
                        min_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        max_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        required: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        default_values: Type.Optional(
                          Type.Union([
                            Type.Array(
                              Type.Union([
                                RoleSelectDefaultValueSchema,
                                UserSelectDefaultValueSchema,
                              ]),
                              { maxItems: 25 },
                            ),
                            Type.Null(),
                          ]),
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                        ),
                        min_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        max_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        required: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        default_values: Type.Optional(
                          Type.Union([
                            Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                            Type.Null(),
                          ]),
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                        ),
                        min_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        max_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        required: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        options: Type.Array(
                          Type.Object({
                            label: Type.String({ minLength: 1, maxLength: 100 }),
                            value: Type.String({ minLength: 1, maxLength: 100 }),
                            description: Type.Optional(
                              Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                            ),
                            default: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            emoji: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                ComponentEmojiForRequestSchema,
                              ]),
                            ),
                          }),
                          { minItems: 1, maxItems: 25 },
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                        placeholder: Type.Optional(
                          Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                        ),
                        min_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        max_values: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        disabled: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        required: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        default_values: Type.Optional(
                          Type.Union([
                            Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                            Type.Null(),
                          ]),
                        ),
                      }),
                    ]),
                    { minItems: 1, maxItems: 5 },
                  ),
                }),
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  accent_color: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  components: Type.Array(
                    Type.Union([
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        components: Type.Array(
                          Type.Union([
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.Optional(
                                Type.Union([
                                  Type.String({ minLength: 1, maxLength: 100 }),
                                  Type.Null(),
                                ]),
                              ),
                              style: ButtonStyleTypesSchema,
                              label: Type.Optional(
                                Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              url: Type.Optional(
                                Type.Union([
                                  Type.String({ format: 'uri', maxLength: 512 }),
                                  Type.Null(),
                                ]),
                              ),
                              sku_id: Type.Optional(
                                Type.Union([
                                  Type.Union([Type.Null(), Type.Null()]),
                                  SnowflakeTypeSchema,
                                ]),
                              ),
                              emoji: Type.Optional(
                                Type.Union([
                                  Type.Union([Type.Null(), Type.Null()]),
                                  ComponentEmojiForRequestSchema,
                                ]),
                              ),
                            }),
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                              placeholder: Type.Optional(
                                Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                              ),
                              min_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              max_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              required: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              default_values: Type.Optional(
                                Type.Union([
                                  Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                                  Type.Null(),
                                ]),
                              ),
                              channel_types: Type.Optional(
                                Type.Union([
                                  Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                                  Type.Null(),
                                ]),
                              ),
                            }),
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                              placeholder: Type.Optional(
                                Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                              ),
                              min_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              max_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              required: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              default_values: Type.Optional(
                                Type.Union([
                                  Type.Array(
                                    Type.Union([
                                      RoleSelectDefaultValueSchema,
                                      UserSelectDefaultValueSchema,
                                    ]),
                                    { maxItems: 25 },
                                  ),
                                  Type.Null(),
                                ]),
                              ),
                            }),
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                              placeholder: Type.Optional(
                                Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                              ),
                              min_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              max_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              required: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              default_values: Type.Optional(
                                Type.Union([
                                  Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                                  Type.Null(),
                                ]),
                              ),
                            }),
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                              placeholder: Type.Optional(
                                Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                              ),
                              min_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              max_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              required: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              options: Type.Array(
                                Type.Object({
                                  label: Type.String({ minLength: 1, maxLength: 100 }),
                                  value: Type.String({ minLength: 1, maxLength: 100 }),
                                  description: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                                  ),
                                  default: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  emoji: Type.Optional(
                                    Type.Union([
                                      Type.Union([Type.Null(), Type.Null()]),
                                      ComponentEmojiForRequestSchema,
                                    ]),
                                  ),
                                }),
                                { minItems: 1, maxItems: 25 },
                              ),
                            }),
                            Type.Object({
                              type: MessageComponentTypesSchema,
                              id: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                              placeholder: Type.Optional(
                                Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                              ),
                              min_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              max_values: Type.Optional(
                                Type.Union([
                                  Codec(Type.String())
                                    .Decode((value) => Number.parseInt(value, 10))
                                    .Encode((value) => String(value)),
                                  Type.Null(),
                                ]),
                              ),
                              disabled: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              required: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                              default_values: Type.Optional(
                                Type.Union([
                                  Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                                  Type.Null(),
                                ]),
                              ),
                            }),
                          ]),
                          { minItems: 1, maxItems: 5 },
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        spoiler: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                        file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        items: Type.Array(
                          Type.Object({
                            description: Type.Optional(
                              Type.Union([
                                Type.String({ minLength: 1, maxLength: 1024 }),
                                Type.Null(),
                              ]),
                            ),
                            spoiler: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            media: UnfurledMediaRequestSchema,
                          }),
                          { minItems: 1, maxItems: 10 },
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        components: Type.Array(
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            content: Type.String({ minLength: 1, maxLength: 4000 }),
                          }),
                          { minItems: 1, maxItems: 3 },
                        ),
                        accessory: Type.Union([
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.Optional(
                              Type.Union([
                                Type.String({ minLength: 1, maxLength: 100 }),
                                Type.Null(),
                              ]),
                            ),
                            style: ButtonStyleTypesSchema,
                            label: Type.Optional(
                              Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            url: Type.Optional(
                              Type.Union([
                                Type.String({ format: 'uri', maxLength: 512 }),
                                Type.Null(),
                              ]),
                            ),
                            sku_id: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                SnowflakeTypeSchema,
                              ]),
                            ),
                            emoji: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                ComponentEmojiForRequestSchema,
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            description: Type.Optional(
                              Type.Union([
                                Type.String({ minLength: 1, maxLength: 1024 }),
                                Type.Null(),
                              ]),
                            ),
                            spoiler: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            media: UnfurledMediaRequestSchema,
                          }),
                        ]),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        spacing: Type.Optional(
                          Type.Union([
                            Type.Union([Type.Null(), Type.Null()]),
                            MessageComponentSeparatorSpacingSizeSchema,
                          ]),
                        ),
                        divider: Type.Optional(
                          Type.Union([
                            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                              .Decode((value) => value === 'true')
                              .Encode((value) => (value ? 'true' : 'false')),
                            Type.Null(),
                          ]),
                        ),
                      }),
                      Type.Object({
                        type: MessageComponentTypesSchema,
                        id: Type.Optional(
                          Type.Union([
                            Codec(Type.String())
                              .Decode((value) => Number.parseInt(value, 10))
                              .Encode((value) => String(value)),
                            Type.Null(),
                          ]),
                        ),
                        content: Type.String({ minLength: 1, maxLength: 4000 }),
                      }),
                    ]),
                    { minItems: 1, maxItems: 40 },
                  ),
                  spoiler: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                }),
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  spoiler: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                  file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                }),
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  items: Type.Array(
                    Type.Object({
                      description: Type.Optional(
                        Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                      ),
                      spoiler: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      media: UnfurledMediaRequestSchema,
                    }),
                    { minItems: 1, maxItems: 10 },
                  ),
                }),
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  components: Type.Array(
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      content: Type.String({ minLength: 1, maxLength: 4000 }),
                    }),
                    { minItems: 1, maxItems: 3 },
                  ),
                  accessory: Type.Union([
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      custom_id: Type.Optional(
                        Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
                      ),
                      style: ButtonStyleTypesSchema,
                      label: Type.Optional(
                        Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                      ),
                      disabled: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      url: Type.Optional(
                        Type.Union([Type.String({ format: 'uri', maxLength: 512 }), Type.Null()]),
                      ),
                      sku_id: Type.Optional(
                        Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                      ),
                      emoji: Type.Optional(
                        Type.Union([
                          Type.Union([Type.Null(), Type.Null()]),
                          ComponentEmojiForRequestSchema,
                        ]),
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      description: Type.Optional(
                        Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                      ),
                      spoiler: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      media: UnfurledMediaRequestSchema,
                    }),
                  ]),
                }),
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  spacing: Type.Optional(
                    Type.Union([
                      Type.Union([Type.Null(), Type.Null()]),
                      MessageComponentSeparatorSpacingSizeSchema,
                    ]),
                  ),
                  divider: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                }),
                Type.Object({
                  type: MessageComponentTypesSchema,
                  id: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                  content: Type.String({ minLength: 1, maxLength: 4000 }),
                }),
              ]),
              { maxItems: 40 },
            ),
            Type.Null(),
          ]),
        ),
        attachments: Type.Optional(
          Type.Union([
            Type.Array(
              Type.Object({
                id: SnowflakeTypeSchema,
                filename: Type.Optional(
                  Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                ),
                description: Type.Optional(
                  Type.Union([Type.String({ maxLength: 1024 }), Type.Null()]),
                ),
                duration_secs: Type.Optional(
                  Type.Union([
                    Codec(Type.String())
                      .Decode((value) => Number(value))
                      .Encode((value) => String(value)),
                    Type.Null(),
                  ]),
                ),
                waveform: Type.Optional(Type.Union([Type.String({ maxLength: 400 }), Type.Null()])),
                title: Type.Optional(Type.Union([Type.String({ maxLength: 1024 }), Type.Null()])),
                is_spoiler: Type.Optional(
                  Type.Union([
                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                      .Decode((value) => value === 'true')
                      .Encode((value) => (value ? 'true' : 'false')),
                    Type.Null(),
                  ]),
                ),
              }),
              { maxItems: 10 },
            ),
            Type.Null(),
          ]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/channels/:channel_id/messages/:message_id/crosspost',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    tbValidator(
      'param',
      Type.Object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: Type.String({ maxLength: 152133 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        after: Type.Optional(SnowflakeTypeSchema),
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        type: Type.Optional(ReactionTypesSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    tbValidator(
      'param',
      Type.Object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: Type.String({ maxLength: 152133 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
    tbValidator(
      'param',
      Type.Object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: Type.String({ maxLength: 152133 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
    tbValidator(
      'param',
      Type.Object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: Type.String({ maxLength: 152133 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/:user_id',
    tbValidator(
      'param',
      Type.Object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: Type.String({ maxLength: 152133 }),
        user_id: SnowflakeTypeSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/channels/:channel_id/messages/:message_id/threads',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    tbValidator('json', CreateTextThreadWithMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/permissions/member/:user_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'query',
      Type.Object({
        implicit: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/permissions/role/:role_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'query',
      Type.Object({
        implicit: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/channels/:channel_id/permissions/:overwrite_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'json',
      Type.Object({
        type: Type.Optional(
          Type.Union([Type.Union([Type.Null(), Type.Null()]), ChannelPermissionOverwritesSchema]),
        ),
        allow: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
        deny: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/channels/:channel_id/permissions/:overwrite_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/pins',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/channels/:channel_id/pins/:message_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/channels/:channel_id/pins/:message_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/polls/:message_id/answers/:answer_id',
    tbValidator(
      'param',
      Type.Object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        answer_id: Codec(Type.String())
          .Decode((value) => Number.parseInt(value, 10))
          .Encode((value) => String(value)),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        after: Type.Optional(SnowflakeTypeSchema),
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/channels/:channel_id/polls/:message_id/expire',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/channels/:channel_id/recipients/:user_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'json',
      Type.Object({
        access_token: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
        nick: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/channels/:channel_id/recipients/:user_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/channels/:channel_id/send-soundboard-sound',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator('json', SoundboardSoundSendRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/thread-members',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        with_member: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(SnowflakeTypeSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/channels/:channel_id/thread-members/@me',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/channels/:channel_id/thread-members/@me',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/thread-members/:user_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'query',
      Type.Object({
        with_member: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/channels/:channel_id/thread-members/:user_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/channels/:channel_id/thread-members/:user_id',
    tbValidator(
      'param',
      Type.Object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/channels/:channel_id/threads',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Union([CreateForumThreadRequestSchema, CreateTextThreadWithoutMessageRequestSchema]),
    ),
    tbValidator(
      'form',
      Type.Union([
        Type.Object({
          name: Type.String({ minLength: 1, maxLength: 100 }),
          auto_archive_duration: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), ThreadAutoArchiveDurationSchema]),
          ),
          rate_limit_per_user: Type.Optional(
            Type.Union([
              Codec(Type.String())
                .Decode((value) => Number.parseInt(value, 10))
                .Encode((value) => String(value)),
              Type.Null(),
            ]),
          ),
          applied_tags: Type.Optional(
            Type.Union([Type.Array(SnowflakeTypeSchema, { maxItems: 5 }), Type.Null()]),
          ),
          message: Type.Object({
            content: Type.Optional(Type.Union([Type.String({ maxLength: 4000 }), Type.Null()])),
            embeds: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Object({
                    type: Type.Optional(
                      Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
                    ),
                    url: Type.Optional(
                      Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
                    ),
                    title: Type.Optional(
                      Type.Union([Type.String({ maxLength: 256 }), Type.Null()]),
                    ),
                    color: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number.parseInt(value, 10))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    timestamp: Type.Optional(
                      Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
                    ),
                    description: Type.Optional(
                      Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                    ),
                    author: Type.Optional(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAuthorSchema]),
                    ),
                    image: Type.Optional(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        Type.Object({
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 2048 }),
                              Type.Null(),
                            ]),
                          ),
                          width: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          height: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                          ),
                          placeholder_version: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          is_animated: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          description: Type.Optional(
                            Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                          ),
                        }),
                      ]),
                    ),
                    thumbnail: Type.Optional(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        Type.Object({
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 2048 }),
                              Type.Null(),
                            ]),
                          ),
                          width: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          height: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                          ),
                          placeholder_version: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          is_animated: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          description: Type.Optional(
                            Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                          ),
                        }),
                      ]),
                    ),
                    footer: Type.Optional(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedFooterSchema]),
                    ),
                    fields: Type.Optional(
                      Type.Union([
                        Type.Array(
                          Type.Object({
                            name: Type.String({ maxLength: 256 }),
                            value: Type.String({ maxLength: 1024 }),
                            inline: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          { maxItems: 25 },
                        ),
                        Type.Null(),
                      ]),
                    ),
                    provider: Type.Optional(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedProviderSchema]),
                    ),
                    video: Type.Optional(
                      Type.Union([
                        Type.Union([Type.Null(), Type.Null()]),
                        Type.Object({
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 2048 }),
                              Type.Null(),
                            ]),
                          ),
                          width: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          height: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          placeholder: Type.Optional(
                            Type.Union([Type.String({ maxLength: 64 }), Type.Null()]),
                          ),
                          placeholder_version: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          is_animated: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          description: Type.Optional(
                            Type.Union([Type.String({ maxLength: 4096 }), Type.Null()]),
                          ),
                        }),
                      ]),
                    ),
                    audio: Type.Optional(
                      Type.Union([Type.Union([Type.Null(), Type.Null()]), RichEmbedAudioSchema]),
                    ),
                  }),
                  { maxItems: 10 },
                ),
                Type.Null(),
              ]),
            ),
            allowed_mentions: Type.Optional(
              Type.Union([
                Type.Union([Type.Null(), Type.Null()]),
                Type.Object({
                  parse: Type.Optional(
                    Type.Union([
                      Type.Array(
                        Type.Union([
                          Type.Union([Type.Null(), Type.Null()]),
                          AllowedMentionTypesSchema,
                        ]),
                        { maxItems: 1521, uniqueItems: true },
                      ),
                      Type.Null(),
                    ]),
                  ),
                  users: Type.Optional(
                    Type.Union([
                      Type.Array(
                        Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                        { maxItems: 100, uniqueItems: true },
                      ),
                      Type.Null(),
                    ]),
                  ),
                  roles: Type.Optional(
                    Type.Union([
                      Type.Array(
                        Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
                        { maxItems: 100, uniqueItems: true },
                      ),
                      Type.Null(),
                    ]),
                  ),
                  replied_user: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                }),
              ]),
            ),
            sticker_ids: Type.Optional(
              Type.Union([Type.Array(SnowflakeTypeSchema, { maxItems: 3 }), Type.Null()]),
            ),
            components: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Union([
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      components: Type.Array(
                        Type.Union([
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.Optional(
                              Type.Union([
                                Type.String({ minLength: 1, maxLength: 100 }),
                                Type.Null(),
                              ]),
                            ),
                            style: ButtonStyleTypesSchema,
                            label: Type.Optional(
                              Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            url: Type.Optional(
                              Type.Union([
                                Type.String({ format: 'uri', maxLength: 512 }),
                                Type.Null(),
                              ]),
                            ),
                            sku_id: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                SnowflakeTypeSchema,
                              ]),
                            ),
                            emoji: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                ComponentEmojiForRequestSchema,
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            default_values: Type.Optional(
                              Type.Union([
                                Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                                Type.Null(),
                              ]),
                            ),
                            channel_types: Type.Optional(
                              Type.Union([
                                Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            default_values: Type.Optional(
                              Type.Union([
                                Type.Array(
                                  Type.Union([
                                    RoleSelectDefaultValueSchema,
                                    UserSelectDefaultValueSchema,
                                  ]),
                                  { maxItems: 25 },
                                ),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            default_values: Type.Optional(
                              Type.Union([
                                Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            options: Type.Array(
                              Type.Object({
                                label: Type.String({ minLength: 1, maxLength: 100 }),
                                value: Type.String({ minLength: 1, maxLength: 100 }),
                                description: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                                ),
                                default: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                emoji: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    ComponentEmojiForRequestSchema,
                                  ]),
                                ),
                              }),
                              { minItems: 1, maxItems: 25 },
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                            placeholder: Type.Optional(
                              Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                            ),
                            min_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            max_values: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            disabled: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            required: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            default_values: Type.Optional(
                              Type.Union([
                                Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                                Type.Null(),
                              ]),
                            ),
                          }),
                        ]),
                        { minItems: 1, maxItems: 5 },
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      accent_color: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      components: Type.Array(
                        Type.Union([
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            components: Type.Array(
                              Type.Union([
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.Optional(
                                    Type.Union([
                                      Type.String({ minLength: 1, maxLength: 100 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  style: ButtonStyleTypesSchema,
                                  label: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  url: Type.Optional(
                                    Type.Union([
                                      Type.String({ format: 'uri', maxLength: 512 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  sku_id: Type.Optional(
                                    Type.Union([
                                      Type.Union([Type.Null(), Type.Null()]),
                                      SnowflakeTypeSchema,
                                    ]),
                                  ),
                                  emoji: Type.Optional(
                                    Type.Union([
                                      Type.Union([Type.Null(), Type.Null()]),
                                      ComponentEmojiForRequestSchema,
                                    ]),
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  default_values: Type.Optional(
                                    Type.Union([
                                      Type.Array(ChannelSelectDefaultValueSchema, { maxItems: 25 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  channel_types: Type.Optional(
                                    Type.Union([
                                      Type.Array(ChannelTypesSchema, { uniqueItems: true }),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  default_values: Type.Optional(
                                    Type.Union([
                                      Type.Array(
                                        Type.Union([
                                          RoleSelectDefaultValueSchema,
                                          UserSelectDefaultValueSchema,
                                        ]),
                                        { maxItems: 25 },
                                      ),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  default_values: Type.Optional(
                                    Type.Union([
                                      Type.Array(RoleSelectDefaultValueSchema, { maxItems: 25 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  options: Type.Array(
                                    Type.Object({
                                      label: Type.String({ minLength: 1, maxLength: 100 }),
                                      value: Type.String({ minLength: 1, maxLength: 100 }),
                                      description: Type.Optional(
                                        Type.Union([Type.String({ maxLength: 100 }), Type.Null()]),
                                      ),
                                      default: Type.Optional(
                                        Type.Union([
                                          Codec(
                                            Type.Union([
                                              Type.Literal('true'),
                                              Type.Literal('false'),
                                            ]),
                                          )
                                            .Decode((value) => value === 'true')
                                            .Encode((value) => (value ? 'true' : 'false')),
                                          Type.Null(),
                                        ]),
                                      ),
                                      emoji: Type.Optional(
                                        Type.Union([
                                          Type.Union([Type.Null(), Type.Null()]),
                                          ComponentEmojiForRequestSchema,
                                        ]),
                                      ),
                                    }),
                                    { minItems: 1, maxItems: 25 },
                                  ),
                                }),
                                Type.Object({
                                  type: MessageComponentTypesSchema,
                                  id: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  custom_id: Type.String({ minLength: 1, maxLength: 100 }),
                                  placeholder: Type.Optional(
                                    Type.Union([Type.String({ maxLength: 150 }), Type.Null()]),
                                  ),
                                  min_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  max_values: Type.Optional(
                                    Type.Union([
                                      Codec(Type.String())
                                        .Decode((value) => Number.parseInt(value, 10))
                                        .Encode((value) => String(value)),
                                      Type.Null(),
                                    ]),
                                  ),
                                  disabled: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  required: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                  default_values: Type.Optional(
                                    Type.Union([
                                      Type.Array(UserSelectDefaultValueSchema, { maxItems: 25 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                              ]),
                              { minItems: 1, maxItems: 5 },
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            spoiler: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                            file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            items: Type.Array(
                              Type.Object({
                                description: Type.Optional(
                                  Type.Union([
                                    Type.String({ minLength: 1, maxLength: 1024 }),
                                    Type.Null(),
                                  ]),
                                ),
                                spoiler: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                media: UnfurledMediaRequestSchema,
                              }),
                              { minItems: 1, maxItems: 10 },
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            components: Type.Array(
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                content: Type.String({ minLength: 1, maxLength: 4000 }),
                              }),
                              { minItems: 1, maxItems: 3 },
                            ),
                            accessory: Type.Union([
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                custom_id: Type.Optional(
                                  Type.Union([
                                    Type.String({ minLength: 1, maxLength: 100 }),
                                    Type.Null(),
                                  ]),
                                ),
                                style: ButtonStyleTypesSchema,
                                label: Type.Optional(
                                  Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                                ),
                                disabled: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                url: Type.Optional(
                                  Type.Union([
                                    Type.String({ format: 'uri', maxLength: 512 }),
                                    Type.Null(),
                                  ]),
                                ),
                                sku_id: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    SnowflakeTypeSchema,
                                  ]),
                                ),
                                emoji: Type.Optional(
                                  Type.Union([
                                    Type.Union([Type.Null(), Type.Null()]),
                                    ComponentEmojiForRequestSchema,
                                  ]),
                                ),
                              }),
                              Type.Object({
                                type: MessageComponentTypesSchema,
                                id: Type.Optional(
                                  Type.Union([
                                    Codec(Type.String())
                                      .Decode((value) => Number.parseInt(value, 10))
                                      .Encode((value) => String(value)),
                                    Type.Null(),
                                  ]),
                                ),
                                description: Type.Optional(
                                  Type.Union([
                                    Type.String({ minLength: 1, maxLength: 1024 }),
                                    Type.Null(),
                                  ]),
                                ),
                                spoiler: Type.Optional(
                                  Type.Union([
                                    Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                      .Decode((value) => value === 'true')
                                      .Encode((value) => (value ? 'true' : 'false')),
                                    Type.Null(),
                                  ]),
                                ),
                                media: UnfurledMediaRequestSchema,
                              }),
                            ]),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            spacing: Type.Optional(
                              Type.Union([
                                Type.Union([Type.Null(), Type.Null()]),
                                MessageComponentSeparatorSpacingSizeSchema,
                              ]),
                            ),
                            divider: Type.Optional(
                              Type.Union([
                                Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                  .Decode((value) => value === 'true')
                                  .Encode((value) => (value ? 'true' : 'false')),
                                Type.Null(),
                              ]),
                            ),
                          }),
                          Type.Object({
                            type: MessageComponentTypesSchema,
                            id: Type.Optional(
                              Type.Union([
                                Codec(Type.String())
                                  .Decode((value) => Number.parseInt(value, 10))
                                  .Encode((value) => String(value)),
                                Type.Null(),
                              ]),
                            ),
                            content: Type.String({ minLength: 1, maxLength: 4000 }),
                          }),
                        ]),
                        { minItems: 1, maxItems: 40 },
                      ),
                      spoiler: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      spoiler: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                      file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      items: Type.Array(
                        Type.Object({
                          description: Type.Optional(
                            Type.Union([
                              Type.String({ minLength: 1, maxLength: 1024 }),
                              Type.Null(),
                            ]),
                          ),
                          spoiler: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          media: UnfurledMediaRequestSchema,
                        }),
                        { minItems: 1, maxItems: 10 },
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      components: Type.Array(
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          content: Type.String({ minLength: 1, maxLength: 4000 }),
                        }),
                        { minItems: 1, maxItems: 3 },
                      ),
                      accessory: Type.Union([
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          custom_id: Type.Optional(
                            Type.Union([
                              Type.String({ minLength: 1, maxLength: 100 }),
                              Type.Null(),
                            ]),
                          ),
                          style: ButtonStyleTypesSchema,
                          label: Type.Optional(
                            Type.Union([Type.String({ maxLength: 80 }), Type.Null()]),
                          ),
                          disabled: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          url: Type.Optional(
                            Type.Union([
                              Type.String({ format: 'uri', maxLength: 512 }),
                              Type.Null(),
                            ]),
                          ),
                          sku_id: Type.Optional(
                            Type.Union([
                              Type.Union([Type.Null(), Type.Null()]),
                              SnowflakeTypeSchema,
                            ]),
                          ),
                          emoji: Type.Optional(
                            Type.Union([
                              Type.Union([Type.Null(), Type.Null()]),
                              ComponentEmojiForRequestSchema,
                            ]),
                          ),
                        }),
                        Type.Object({
                          type: MessageComponentTypesSchema,
                          id: Type.Optional(
                            Type.Union([
                              Codec(Type.String())
                                .Decode((value) => Number.parseInt(value, 10))
                                .Encode((value) => String(value)),
                              Type.Null(),
                            ]),
                          ),
                          description: Type.Optional(
                            Type.Union([
                              Type.String({ minLength: 1, maxLength: 1024 }),
                              Type.Null(),
                            ]),
                          ),
                          spoiler: Type.Optional(
                            Type.Union([
                              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                .Decode((value) => value === 'true')
                                .Encode((value) => (value ? 'true' : 'false')),
                              Type.Null(),
                            ]),
                          ),
                          media: UnfurledMediaRequestSchema,
                        }),
                      ]),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      spacing: Type.Optional(
                        Type.Union([
                          Type.Union([Type.Null(), Type.Null()]),
                          MessageComponentSeparatorSpacingSizeSchema,
                        ]),
                      ),
                      divider: Type.Optional(
                        Type.Union([
                          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                            .Decode((value) => value === 'true')
                            .Encode((value) => (value ? 'true' : 'false')),
                          Type.Null(),
                        ]),
                      ),
                    }),
                    Type.Object({
                      type: MessageComponentTypesSchema,
                      id: Type.Optional(
                        Type.Union([
                          Codec(Type.String())
                            .Decode((value) => Number.parseInt(value, 10))
                            .Encode((value) => String(value)),
                          Type.Null(),
                        ]),
                      ),
                      content: Type.String({ minLength: 1, maxLength: 4000 }),
                    }),
                  ]),
                  { maxItems: 40 },
                ),
                Type.Null(),
              ]),
            ),
            flags: Type.Optional(
              Type.Union([
                Codec(Type.String())
                  .Decode((value) => Number.parseInt(value, 10))
                  .Encode((value) => String(value)),
                Type.Null(),
              ]),
            ),
            attachments: Type.Optional(
              Type.Union([
                Type.Array(
                  Type.Object({
                    id: SnowflakeTypeSchema,
                    filename: Type.Optional(
                      Type.Union([Type.String({ minLength: 1, maxLength: 1024 }), Type.Null()]),
                    ),
                    description: Type.Optional(
                      Type.Union([Type.String({ maxLength: 1024 }), Type.Null()]),
                    ),
                    duration_secs: Type.Optional(
                      Type.Union([
                        Codec(Type.String())
                          .Decode((value) => Number(value))
                          .Encode((value) => String(value)),
                        Type.Null(),
                      ]),
                    ),
                    waveform: Type.Optional(
                      Type.Union([Type.String({ maxLength: 400 }), Type.Null()]),
                    ),
                    title: Type.Optional(
                      Type.Union([Type.String({ maxLength: 1024 }), Type.Null()]),
                    ),
                    is_spoiler: Type.Optional(
                      Type.Union([
                        Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                          .Decode((value) => value === 'true')
                          .Encode((value) => (value ? 'true' : 'false')),
                        Type.Null(),
                      ]),
                    ),
                  }),
                  { maxItems: 10 },
                ),
                Type.Null(),
              ]),
            ),
            poll: Type.Optional(
              Type.Union([
                Type.Union([Type.Null(), Type.Null()]),
                Type.Object({
                  question: Type.Object(
                    {
                      text: Type.Optional(
                        Type.Union([
                          Type.String({
                            minLength: 1,
                            maxLength: 300,
                            description: 'The text of the field',
                          }),
                          Type.Null(),
                        ]),
                      ),
                      emoji: Type.Optional(
                        Type.Union(
                          [
                            Type.Union([Type.Null(), Type.Null()]),
                            Type.Object({
                              id: Type.Optional(
                                Type.Union(
                                  [Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema],
                                  { description: 'The ID of the custom emoji' },
                                ),
                              ),
                              name: Type.Optional(
                                Type.Union([
                                  Type.String({
                                    maxLength: 32,
                                    description:
                                      'The name of the emoji, or the unicode emoji character',
                                  }),
                                  Type.Null(),
                                ]),
                              ),
                              animated: Type.Optional(
                                Type.Union([
                                  Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                                    .Decode((value) => value === 'true')
                                    .Encode((value) => (value ? 'true' : 'false')),
                                  Type.Null(),
                                ]),
                              ),
                            }),
                          ],
                          { description: 'The emoji of the field' },
                        ),
                      ),
                    },
                    { description: 'The question of the poll. Only `text` is supported.' },
                  ),
                  answers: Type.Array(
                    Type.Object({
                      poll_media: Type.Object(
                        {
                          text: Type.Optional(
                            Type.Union([
                              Type.String({
                                minLength: 1,
                                maxLength: 300,
                                description: 'The text of the field',
                              }),
                              Type.Null(),
                            ]),
                          ),
                          emoji: Type.Optional(
                            Type.Union(
                              [
                                Type.Union([Type.Null(), Type.Null()]),
                                Type.Object({
                                  id: Type.Optional(
                                    Type.Union(
                                      [Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema],
                                      { description: 'The ID of the custom emoji' },
                                    ),
                                  ),
                                  name: Type.Optional(
                                    Type.Union([
                                      Type.String({
                                        maxLength: 32,
                                        description:
                                          'The name of the emoji, or the unicode emoji character',
                                      }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  animated: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
                                        .Decode((value) => value === 'true')
                                        .Encode((value) => (value ? 'true' : 'false')),
                                      Type.Null(),
                                    ]),
                                  ),
                                }),
                              ],
                              { description: 'The emoji of the field' },
                            ),
                          ),
                        },
                        { description: 'The data of the answer' },
                      ),
                    }),
                    {
                      minItems: 1,
                      maxItems: 10,
                      description: 'Each of the answers available in the poll, up to 10',
                    },
                  ),
                  allow_multiselect: Type.Optional(
                    Type.Union([
                      Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                        .Decode((value) => value === 'true')
                        .Encode((value) => (value ? 'true' : 'false')),
                      Type.Null(),
                    ]),
                  ),
                  layout_type: Type.Optional(
                    Type.Union([Type.Union([Type.Null(), Type.Null()]), PollLayoutTypesSchema], {
                      description: 'The layout type of the poll. Defaults to... DEFAULT!',
                    }),
                  ),
                  duration: Type.Optional(
                    Type.Union([
                      Codec(Type.String())
                        .Decode((value) => Number.parseInt(value, 10))
                        .Encode((value) => String(value)),
                      Type.Null(),
                    ]),
                  ),
                }),
              ]),
            ),
            shared_client_theme: Type.Optional(
              Type.Union([
                Type.Union([Type.Null(), Type.Null()]),
                Type.Object({
                  colors: Type.Array(Type.String({ minLength: 6, maxLength: 6 }), {
                    minItems: 1,
                    maxItems: 5,
                  }),
                  gradient_angle: Codec(Type.String())
                    .Decode((value) => Number.parseInt(value, 10))
                    .Encode((value) => String(value)),
                  base_mix: Codec(Type.String())
                    .Decode((value) => Number.parseInt(value, 10))
                    .Encode((value) => String(value)),
                  base_theme: Type.Optional(
                    Type.Union([
                      Type.Union([Type.Null(), Type.Null()]),
                      MessageShareCustomUserThemeBaseThemeSchema,
                    ]),
                  ),
                }),
              ]),
            ),
          }),
        }),
        Type.Object({
          name: Type.String({ minLength: 1, maxLength: 100 }),
          auto_archive_duration: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), ThreadAutoArchiveDurationSchema]),
          ),
          rate_limit_per_user: Type.Optional(
            Type.Union([
              Codec(Type.String())
                .Decode((value) => Number.parseInt(value, 10))
                .Encode((value) => String(value)),
              Type.Null(),
            ]),
          ),
          type: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), ChannelTypesSchema]),
          ),
          invitable: Type.Optional(
            Type.Union([
              Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
                .Decode((value) => value === 'true')
                .Encode((value) => (value ? 'true' : 'false')),
              Type.Null(),
            ]),
          ),
        }),
      ]),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/threads/archived/private',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        before: Type.Optional(Type.String({ format: 'date-time' })),
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/threads/archived/public',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        before: Type.Optional(Type.String({ format: 'date-time' })),
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/threads/search',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        name: Type.Optional(Type.String({ maxLength: 100 })),
        slop: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        min_id: Type.Optional(SnowflakeTypeSchema),
        max_id: Type.Optional(SnowflakeTypeSchema),
        tag: Type.Optional(
          Type.Union([
            Type.String(),
            Type.Array(SnowflakeTypeSchema, { maxItems: 20, uniqueItems: true }),
          ]),
        ),
        tag_setting: Type.Optional(ThreadSearchTagSettingSchema),
        archived: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        sort_by: Type.Optional(ThreadSortingModeSchema),
        sort_order: Type.Optional(SortingOrderSchema),
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        offset: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/channels/:channel_id/typing',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/users/@me/threads/archived/private',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        before: Type.Optional(SnowflakeTypeSchema),
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/channels/:channel_id/voice-status',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Object({
        status: Type.Optional(
          Type.Union([
            Type.String({ maxLength: 500, description: 'The new voice channel status' }),
            Type.Null(),
          ]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/channels/:channel_id/webhooks',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/channels/:channel_id/webhooks',
    tbValidator('param', Type.Object({ channel_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Object({
        name: Type.String({ minLength: 1, maxLength: 80 }),
        avatar: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
