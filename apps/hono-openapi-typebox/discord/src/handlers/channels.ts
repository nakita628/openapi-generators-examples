import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  AllowedMentionTypesSchema,
  ApplicationIncomingWebhookResponseSchema,
  ButtonStyleTypesSchema,
  ChannelFollowerResponseSchema,
  ChannelFollowerWebhookResponseSchema,
  ChannelPermissionOverwritesSchema,
  ChannelSelectDefaultValueSchema,
  ChannelTypesSchema,
  ComponentEmojiForRequestSchema,
  CreateForumThreadRequestSchema,
  CreateGroupDMInviteRequestSchema,
  CreateGuildInviteRequestSchema,
  CreateTextThreadWithMessageRequestSchema,
  CreateTextThreadWithoutMessageRequestSchema,
  CreatedThreadResponseSchema,
  FriendInviteResponseSchema,
  GroupDMInviteResponseSchema,
  GuildChannelResponseSchema,
  GuildIncomingWebhookResponseSchema,
  GuildInviteResponseSchema,
  InviteTargetTypesSchema,
  MessageComponentSeparatorSpacingSizeSchema,
  MessageComponentTypesSchema,
  MessageCreateRequestSchema,
  MessageEditRequestPartialSchema,
  MessageReferenceTypeSchema,
  MessageResponseSchema,
  MessageShareCustomUserThemeBaseThemeSchema,
  PermissionsResponseSchema,
  PinnedMessagesResponseSchema,
  PollAnswerDetailsResponseSchema,
  PollLayoutTypesSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  ReactionTypesSchema,
  RichEmbedAudioSchema,
  RichEmbedAuthorSchema,
  RichEmbedFooterSchema,
  RichEmbedProviderSchema,
  RoleSelectDefaultValueSchema,
  SearchIndexNotReadyResponseSchema,
  SnowflakeTypeSchema,
  SortingOrderSchema,
  SoundboardSoundSendRequestSchema,
  ThreadAutoArchiveDurationSchema,
  ThreadMemberResponseSchema,
  ThreadResponseSchema,
  ThreadSearchResponseSchema,
  ThreadSearchTagSettingSchema,
  ThreadSortingModeSchema,
  ThreadsResponseSchema,
  TypingIndicatorResponseSchema,
  UnfurledMediaRequestSchema,
  UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
  UpdateDMRequestPartialSchema,
  UpdateGroupDMRequestPartialSchema,
  UpdateGuildChannelRequestPartialSchema,
  UpdateThreadRequestPartialSchema,
  UserResponseSchema,
  UserSelectDefaultValueSchema,
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

export const channelsHandler = new Hono()
  .get(
    '/channels/:channel_id',
    describeRoute({
      operationId: 'get_channel',
      responses: {
        '200': {
          description: '200 response for get_channel',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Compile(
                  Type.Union([
                    GuildChannelResponseSchema,
                    PrivateChannelResponseSchema,
                    PrivateGroupChannelResponseSchema,
                    ThreadResponseSchema,
                  ]),
                ),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id',
    describeRoute({
      operationId: 'delete_channel',
      responses: {
        '200': {
          description: '200 response for delete_channel',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Compile(
                  Type.Union([
                    GuildChannelResponseSchema,
                    PrivateChannelResponseSchema,
                    PrivateGroupChannelResponseSchema,
                    ThreadResponseSchema,
                  ]),
                ),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    (c) => {},
  )
  .patch(
    '/channels/:channel_id',
    describeRoute({
      operationId: 'update_channel',
      responses: {
        '200': {
          description: '200 response for update_channel',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Compile(
                  Type.Union([
                    GuildChannelResponseSchema,
                    PrivateChannelResponseSchema,
                    PrivateGroupChannelResponseSchema,
                    ThreadResponseSchema,
                  ]),
                ),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Union([
          UpdateDMRequestPartialSchema,
          UpdateGroupDMRequestPartialSchema,
          UpdateGuildChannelRequestPartialSchema,
          UpdateThreadRequestPartialSchema,
        ]),
      ),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/followers',
    describeRoute({
      operationId: 'follow_channel',
      responses: {
        '200': {
          description: '200 response for follow_channel',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(ChannelFollowerResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator('json', Compile(Type.Object({ webhook_channel_id: SnowflakeTypeSchema }))),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/invites',
    describeRoute({
      operationId: 'list_channel_invites',
      responses: {
        '200': {
          description: '200 response for list_channel_invites',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Compile(
                  Type.Union([
                    Type.Array(
                      Type.Union([
                        FriendInviteResponseSchema,
                        GroupDMInviteResponseSchema,
                        GuildInviteResponseSchema,
                        Type.Union([Type.Null(), Type.Null()]),
                      ]),
                    ),
                    Type.Null(),
                  ]),
                ),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/invites',
    describeRoute({
      operationId: 'create_channel_invite',
      responses: {
        '200': {
          description: '200 response for create_channel_invite',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Compile(
                  Type.Union([
                    FriendInviteResponseSchema,
                    GroupDMInviteResponseSchema,
                    GuildInviteResponseSchema,
                  ]),
                ),
              ),
            },
          },
        },
        '204': {
          description: '204 response for create_channel_invite',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(Type.Union([CreateGroupDMInviteRequestSchema, CreateGuildInviteRequestSchema])),
    ),
    validator(
      'form',
      Compile(
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
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/messages',
    describeRoute({
      operationId: 'list_messages',
      responses: {
        '200': {
          description: '200 response for list_messages',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Compile(Type.Union([Type.Array(MessageResponseSchema), Type.Null()])),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
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
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/messages',
    describeRoute({
      operationId: 'create_message',
      responses: {
        '200': {
          description: '200 response for create_message',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(MessageResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator('json', Compile(MessageCreateRequestSchema)),
    validator(
      'form',
      Compile(
        Type.Object({
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
                  waveform: Type.Optional(
                    Type.Union([Type.String({ maxLength: 400 }), Type.Null()]),
                  ),
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
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/messages/bulk-delete',
    describeRoute({
      operationId: 'bulk_delete_messages',
      responses: {
        '204': {
          description: '204 response for bulk_delete_messages',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Object({
          messages: Type.Array(SnowflakeTypeSchema, {
            minItems: 2,
            maxItems: 100,
            uniqueItems: true,
          }),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/messages/pins',
    describeRoute({
      operationId: 'list_pins',
      responses: {
        '200': {
          description: '200 response for list_pins',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(PinnedMessagesResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          before: Type.Optional(Type.String({ format: 'date-time' })),
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/messages/pins/:message_id',
    describeRoute({
      operationId: 'create_pin',
      responses: {
        '204': {
          description: '204 response for create_pin',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/messages/pins/:message_id',
    describeRoute({
      operationId: 'delete_pin',
      responses: {
        '204': {
          description: '204 response for delete_pin',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/messages/:message_id',
    describeRoute({
      operationId: 'get_message',
      responses: {
        '200': {
          description: '200 response for get_message',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(MessageResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/messages/:message_id',
    describeRoute({
      operationId: 'delete_message',
      responses: {
        '204': {
          description: '204 response for delete_message',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .patch(
    '/channels/:channel_id/messages/:message_id',
    describeRoute({
      operationId: 'update_message',
      responses: {
        '200': {
          description: '200 response for update_message',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(MessageResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    ),
    validator('json', Compile(MessageEditRequestPartialSchema)),
    validator(
      'form',
      Compile(
        Type.Object({
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
                  waveform: Type.Optional(
                    Type.Union([Type.String({ maxLength: 400 }), Type.Null()]),
                  ),
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
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/messages/:message_id/crosspost',
    describeRoute({
      operationId: 'crosspost_message',
      responses: {
        '200': {
          description: '200 response for crosspost_message',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(MessageResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions',
    describeRoute({
      operationId: 'delete_all_message_reactions',
      responses: {
        '204': {
          description: '204 response for delete_all_message_reactions',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    describeRoute({
      operationId: 'list_message_reactions_by_emoji',
      responses: {
        '200': {
          description: '200 response for list_message_reactions_by_emoji',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(Type.Array(UserResponseSchema))) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          emoji_name: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    validator(
      'query',
      Compile(
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
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    describeRoute({
      operationId: 'delete_all_message_reactions_by_emoji',
      responses: {
        '204': {
          description: '204 response for delete_all_message_reactions_by_emoji',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          emoji_name: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
    describeRoute({
      operationId: 'add_my_message_reaction',
      responses: {
        '204': {
          description: '204 response for add_my_message_reaction',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          emoji_name: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
    describeRoute({
      operationId: 'delete_my_message_reaction',
      responses: {
        '204': {
          description: '204 response for delete_my_message_reaction',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          emoji_name: Type.String({ maxLength: 152133 }),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/:user_id',
    describeRoute({
      operationId: 'delete_user_message_reaction',
      responses: {
        '204': {
          description: '204 response for delete_user_message_reaction',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          emoji_name: Type.String({ maxLength: 152133 }),
          user_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/messages/:message_id/threads',
    describeRoute({
      operationId: 'create_thread_from_message',
      responses: {
        '201': {
          description: '201 response for create_thread_from_message',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(ThreadResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    ),
    validator('json', Compile(CreateTextThreadWithMessageRequestSchema)),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/permissions/member/:user_id',
    describeRoute({
      description:
        "Returns the fully cascaded permissions for a member in this channel, applying their roles and the channel's permission overwrites.",
      operationId: 'get_channel_member_permissions',
      responses: {
        '200': {
          description: '200 response for get_channel_member_permissions',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(PermissionsResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          implicit: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/permissions/role/:role_id',
    describeRoute({
      description:
        "Returns the permissions a role grants in this channel, applying the channel's permission overwrites on top of the role's guild-level permissions.",
      operationId: 'get_channel_role_permissions',
      responses: {
        '200': {
          description: '200 response for get_channel_role_permissions',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(PermissionsResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          implicit: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/permissions/:overwrite_id',
    describeRoute({
      operationId: 'set_channel_permission_overwrite',
      responses: {
        '204': {
          description: '204 response for set_channel_permission_overwrite',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema })),
    ),
    validator(
      'json',
      Compile(
        Type.Object({
          type: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), ChannelPermissionOverwritesSchema]),
          ),
          allow: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
          deny: Type.Optional(Type.Union([Type.Integer(), Type.Null()])),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/permissions/:overwrite_id',
    describeRoute({
      operationId: 'delete_channel_permission_overwrite',
      responses: {
        '204': {
          description: '204 response for delete_channel_permission_overwrite',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/pins',
    describeRoute({
      operationId: 'deprecated_list_pins',
      responses: {
        '200': {
          description: '200 response for deprecated_list_pins',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Compile(Type.Union([Type.Array(MessageResponseSchema), Type.Null()])),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/pins/:message_id',
    describeRoute({
      operationId: 'deprecated_create_pin',
      responses: {
        '204': {
          description: '204 response for deprecated_create_pin',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/pins/:message_id',
    describeRoute({
      operationId: 'deprecated_delete_pin',
      responses: {
        '204': {
          description: '204 response for deprecated_delete_pin',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/polls/:message_id/answers/:answer_id',
    describeRoute({
      operationId: 'get_answer_voters',
      responses: {
        '200': {
          description: '200 response for get_answer_voters',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(PollAnswerDetailsResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          answer_id: Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          after: Type.Optional(SnowflakeTypeSchema),
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/polls/:message_id/expire',
    describeRoute({
      operationId: 'poll_expire',
      responses: {
        '200': {
          description: '200 response for poll_expire',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(MessageResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/recipients/:user_id',
    describeRoute({
      operationId: 'add_group_dm_user',
      responses: {
        '201': {
          description: '201 response for add_group_dm_user',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Compile(
                  Type.Union([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]),
                ),
              ),
            },
          },
        },
        '204': {
          description: '204 response for add_group_dm_user',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    validator(
      'json',
      Compile(
        Type.Object({
          access_token: Type.Optional(
            Type.Union([Type.String({ maxLength: 152133 }), Type.Null()]),
          ),
          nick: Type.Optional(Type.Union([Type.String({ maxLength: 152133 }), Type.Null()])),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/recipients/:user_id',
    describeRoute({
      operationId: 'delete_group_dm_user',
      responses: {
        '204': {
          description: '204 response for delete_group_dm_user',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/send-soundboard-sound',
    describeRoute({
      operationId: 'send_soundboard_sound',
      responses: {
        '204': {
          description: '204 response for send_soundboard_sound',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator('json', Compile(SoundboardSoundSendRequestSchema)),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/thread-members',
    describeRoute({
      operationId: 'list_thread_members',
      responses: {
        '200': {
          description: '200 response for list_thread_members',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(Compile(Type.Array(ThreadMemberResponseSchema))),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
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
    ),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/thread-members/@me',
    describeRoute({
      operationId: 'join_thread',
      responses: {
        '204': {
          description: '204 response for join_thread',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/thread-members/@me',
    describeRoute({
      operationId: 'leave_thread',
      responses: {
        '204': {
          description: '204 response for leave_thread',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/thread-members/:user_id',
    describeRoute({
      operationId: 'get_thread_member',
      responses: {
        '200': {
          description: '200 response for get_thread_member',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(ThreadMemberResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    validator(
      'query',
      Compile(
        Type.Object({
          with_member: Type.Optional(
            Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
              .Decode((value) => value === 'true')
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/thread-members/:user_id',
    describeRoute({
      operationId: 'add_thread_member',
      responses: {
        '204': {
          description: '204 response for add_thread_member',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .delete(
    '/channels/:channel_id/thread-members/:user_id',
    describeRoute({
      operationId: 'delete_thread_member',
      responses: {
        '204': {
          description: '204 response for delete_thread_member',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/threads',
    describeRoute({
      operationId: 'create_thread',
      responses: {
        '201': {
          description: '201 response for create_thread',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(CreatedThreadResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Union([CreateForumThreadRequestSchema, CreateTextThreadWithoutMessageRequestSchema]),
      ),
    ),
    validator(
      'form',
      Compile(
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
                        Type.Union([
                          Type.Union([Type.Null(), Type.Null()]),
                          RichEmbedProviderSchema,
                        ]),
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
                                        Type.Array(ChannelSelectDefaultValueSchema, {
                                          maxItems: 25,
                                        }),
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
                                          Type.Union([
                                            Type.String({ maxLength: 100 }),
                                            Type.Null(),
                                          ]),
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
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
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
                                  description: Type.Optional(
                                    Type.Union([
                                      Type.String({ minLength: 1, maxLength: 1024 }),
                                      Type.Null(),
                                    ]),
                                  ),
                                  spoiler: Type.Optional(
                                    Type.Union([
                                      Codec(
                                        Type.Union([Type.Literal('true'), Type.Literal('false')]),
                                      )
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
                                        [
                                          Type.Union([Type.Null(), Type.Null()]),
                                          SnowflakeTypeSchema,
                                        ],
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
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/threads/archived/private',
    describeRoute({
      operationId: 'list_private_archived_threads',
      responses: {
        '200': {
          description: '200 response for list_private_archived_threads',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(ThreadsResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          before: Type.Optional(Type.String({ format: 'date-time' })),
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/threads/archived/public',
    describeRoute({
      operationId: 'list_public_archived_threads',
      responses: {
        '200': {
          description: '200 response for list_public_archived_threads',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(ThreadsResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          before: Type.Optional(Type.String({ format: 'date-time' })),
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/threads/search',
    describeRoute({
      operationId: 'thread_search',
      responses: {
        '200': {
          description: '200 response for thread_search',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(ThreadSearchResponseSchema)) },
          },
        },
        '202': {
          description: '202 response for thread_search',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(SearchIndexNotReadyResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
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
    ),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/typing',
    describeRoute({
      operationId: 'trigger_typing_indicator',
      responses: {
        '200': {
          description: '200 response for trigger_typing_indicator',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(TypingIndicatorResponseSchema)) },
          },
        },
        '204': {
          description: '204 response for trigger_typing_indicator',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/users/@me/threads/archived/private',
    describeRoute({
      operationId: 'list_my_private_archived_threads',
      responses: {
        '200': {
          description: '200 response for list_my_private_archived_threads',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(ThreadsResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          before: Type.Optional(SnowflakeTypeSchema),
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .put(
    '/channels/:channel_id/voice-status',
    describeRoute({
      description: "Set a voice channel's status.",
      operationId: 'update_voice_channel_status',
      responses: {
        '204': {
          description: '204 response for update_voice_channel_status',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Object({
          status: Type.Optional(
            Type.Union([
              Type.String({ maxLength: 500, description: 'The new voice channel status' }),
              Type.Null(),
            ]),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/channels/:channel_id/webhooks',
    describeRoute({
      operationId: 'list_channel_webhooks',
      responses: {
        '200': {
          description: '200 response for list_channel_webhooks',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': {
              schema: resolver(
                Compile(
                  Type.Union([
                    Type.Array(
                      Type.Union([
                        ApplicationIncomingWebhookResponseSchema,
                        ChannelFollowerWebhookResponseSchema,
                        GuildIncomingWebhookResponseSchema,
                      ]),
                    ),
                    Type.Null(),
                  ]),
                ),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    (c) => {},
  )
  .post(
    '/channels/:channel_id/webhooks',
    describeRoute({
      operationId: 'create_webhook',
      responses: {
        '200': {
          description: '200 response for create_webhook',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(GuildIncomingWebhookResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ channel_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Object({
          name: Type.String({ minLength: 1, maxLength: 80 }),
          avatar: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        }),
      ),
    ),
    (c) => {},
  )
