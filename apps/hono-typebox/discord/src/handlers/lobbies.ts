import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import {
  AllowedMentionTypesSchema,
  BulkLobbyMemberRequestSchema,
  ButtonStyleTypesSchema,
  ChannelSelectDefaultValueSchema,
  ChannelTypesSchema,
  ComponentEmojiForRequestSchema,
  LobbyMemberRequestSchema,
  MessageComponentSeparatorSpacingSizeSchema,
  MessageComponentTypesSchema,
  MessageReferenceTypeSchema,
  MessageShareCustomUserThemeBaseThemeSchema,
  PollLayoutTypesSchema,
  RichEmbedAudioSchema,
  RichEmbedAuthorSchema,
  RichEmbedFooterSchema,
  RichEmbedProviderSchema,
  RoleSelectDefaultValueSchema,
  SDKMessageRequestSchema,
  SnowflakeTypeSchema,
  UnfurledMediaRequestSchema,
  UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
  UserSelectDefaultValueSchema,
} from '../components'

export const lobbiesHandler = new Hono()
  .put(
    '/lobbies',
    tbValidator(
      'json',
      Type.Object({
        idle_timeout_seconds: Type.Optional(
          Type.Union([Type.Integer({ minimum: 5, maximum: 604800 }), Type.Null()]),
        ),
        lobby_metadata: Type.Optional(
          Type.Union([
            Type.Record(Type.String(), Type.String({ maxLength: 1024 }), { maxProperties: 25 }),
            Type.Null(),
          ]),
        ),
        member_metadata: Type.Optional(
          Type.Union([
            Type.Record(Type.String(), Type.String({ maxLength: 1024 }), { maxProperties: 25 }),
            Type.Null(),
          ]),
        ),
        secret: Type.String({ maxLength: 250 }),
        flags: Type.Optional(Type.Union([Type.Union([Type.Null(), Type.Null()]), Type.Literal(1)])),
        name: Type.Optional(
          Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/lobbies',
    tbValidator(
      'json',
      Type.Object({
        idle_timeout_seconds: Type.Optional(
          Type.Union([Type.Integer({ minimum: 5, maximum: 604800 }), Type.Null()]),
        ),
        members: Type.Optional(
          Type.Union([Type.Array(LobbyMemberRequestSchema, { maxItems: 25 }), Type.Null()]),
        ),
        metadata: Type.Optional(
          Type.Union([
            Type.Record(Type.String(), Type.String({ maxLength: 1024 }), { maxProperties: 25 }),
            Type.Null(),
          ]),
        ),
        flags: Type.Optional(Type.Union([Type.Union([Type.Null(), Type.Null()]), Type.Literal(1)])),
        override_event_webhooks_url: Type.Optional(
          Type.Union([Type.String({ format: 'uri', maxLength: 512 }), Type.Null()]),
        ),
        name: Type.Optional(
          Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/lobbies/:lobby_id',
    tbValidator('param', Type.Object({ lobby_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .delete(
    '/lobbies/:lobby_id',
    tbValidator('param', Type.Object({ lobby_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .patch(
    '/lobbies/:lobby_id',
    tbValidator('param', Type.Object({ lobby_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Object({
        idle_timeout_seconds: Type.Optional(
          Type.Union([Type.Integer({ minimum: 5, maximum: 604800 }), Type.Null()]),
        ),
        metadata: Type.Optional(
          Type.Union([
            Type.Record(Type.String(), Type.String({ maxLength: 1024 }), { maxProperties: 25 }),
            Type.Null(),
          ]),
        ),
        members: Type.Optional(
          Type.Union([Type.Array(LobbyMemberRequestSchema, { maxItems: 25 }), Type.Null()]),
        ),
        flags: Type.Optional(Type.Union([Type.Union([Type.Null(), Type.Null()]), Type.Literal(1)])),
        override_event_webhooks_url: Type.Optional(
          Type.Union([Type.String({ format: 'uri', maxLength: 512 }), Type.Null()]),
        ),
        name: Type.Optional(
          Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
        ),
      }),
    ),
    (c) => {},
  )
  .patch(
    '/lobbies/:lobby_id/channel-linking',
    tbValidator('param', Type.Object({ lobby_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Object({
        channel_id: Type.Optional(
          Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
        ),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/lobbies/:lobby_id/members/@me',
    tbValidator('param', Type.Object({ lobby_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post(
    '/lobbies/:lobby_id/members/@me/invites',
    tbValidator('param', Type.Object({ lobby_id: SnowflakeTypeSchema })),
    (c) => {},
  )
  .post(
    '/lobbies/:lobby_id/members/bulk',
    tbValidator('param', Type.Object({ lobby_id: SnowflakeTypeSchema })),
    tbValidator(
      'json',
      Type.Union([
        Type.Array(BulkLobbyMemberRequestSchema, { minItems: 1, maxItems: 25 }),
        Type.Null(),
      ]),
    ),
    (c) => {},
  )
  .put(
    '/lobbies/:lobby_id/members/:user_id',
    tbValidator(
      'param',
      Type.Object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'json',
      Type.Object({
        metadata: Type.Optional(
          Type.Union([
            Type.Record(Type.String(), Type.String({ maxLength: 1024 }), { maxProperties: 25 }),
            Type.Null(),
          ]),
        ),
        flags: Type.Optional(Type.Union([Type.Union([Type.Null(), Type.Null()]), Type.Literal(1)])),
        additional_name: Type.Optional(
          Type.Union([Type.String({ minLength: 1, maxLength: 80 }), Type.Null()]),
        ),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/lobbies/:lobby_id/members/:user_id',
    tbValidator(
      'param',
      Type.Object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .post(
    '/lobbies/:lobby_id/members/:user_id/invites',
    tbValidator(
      'param',
      Type.Object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
    ),
    (c) => {},
  )
  .get(
    '/lobbies/:lobby_id/messages',
    tbValidator('param', Type.Object({ lobby_id: SnowflakeTypeSchema })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/lobbies/:lobby_id/messages',
    tbValidator('param', Type.Object({ lobby_id: SnowflakeTypeSchema })),
    tbValidator('json', SDKMessageRequestSchema),
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
    (c) => {},
  )
  .put(
    '/lobbies/:lobby_id/messages/:message_id/moderation-metadata',
    tbValidator(
      'param',
      Type.Object({ lobby_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    tbValidator(
      'json',
      Type.Record(Type.String(), Type.String({ maxLength: 2000 }), {
        maxProperties: 5,
        description: 'The moderation metadata attached to the message',
      }),
    ),
    tbValidator(
      'form',
      Type.Record(Type.String(), Type.String({ maxLength: 2000 }), {
        maxProperties: 5,
        description: 'The moderation metadata attached to the message',
      }),
    ),
    (c) => {},
  )
