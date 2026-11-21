import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  ApplicationIncomingWebhookResponseSchema,
  ChannelFollowerResponseSchema,
  ChannelFollowerWebhookResponseSchema,
  ChannelPermissionOverwritesSchema,
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
  MessageCreateRequestSchema,
  MessageEditRequestPartialSchema,
  MessageResponseSchema,
  PermissionsResponseSchema,
  PinnedMessagesResponseSchema,
  PollAnswerDetailsResponseSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  RichEmbedAudioSchema,
  RichEmbedAuthorSchema,
  RichEmbedFooterSchema,
  RichEmbedProviderSchema,
  SearchIndexNotReadyResponseSchema,
  SnowflakeTypeSchema,
  SoundboardSoundSendRequestSchema,
  ThreadMemberResponseSchema,
  ThreadResponseSchema,
  ThreadSearchResponseSchema,
  ThreadsResponseSchema,
  TypingIndicatorResponseSchema,
  UnfurledMediaRequestSchema,
  UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
  UpdateDMRequestPartialSchema,
  UpdateGroupDMRequestPartialSchema,
  UpdateGuildChannelRequestPartialSchema,
  UpdateThreadRequestPartialSchema,
  UserResponseSchema,
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
                z.xor([
                  GuildChannelResponseSchema,
                  PrivateChannelResponseSchema,
                  PrivateGroupChannelResponseSchema,
                  ThreadResponseSchema,
                ]),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
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
                z.xor([
                  GuildChannelResponseSchema,
                  PrivateChannelResponseSchema,
                  PrivateGroupChannelResponseSchema,
                  ThreadResponseSchema,
                ]),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
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
                z.xor([
                  GuildChannelResponseSchema,
                  PrivateChannelResponseSchema,
                  PrivateGroupChannelResponseSchema,
                  ThreadResponseSchema,
                ]),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.union([
        UpdateDMRequestPartialSchema,
        UpdateGroupDMRequestPartialSchema,
        UpdateGuildChannelRequestPartialSchema,
        UpdateThreadRequestPartialSchema,
      ]),
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
          content: { 'application/json': { schema: resolver(ChannelFollowerResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator('json', z.object({ webhook_channel_id: SnowflakeTypeSchema })),
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
                z
                  .array(
                    z.xor([
                      FriendInviteResponseSchema,
                      GroupDMInviteResponseSchema,
                      GuildInviteResponseSchema,
                      z.null().nullable(),
                    ]),
                  )
                  .nullable(),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
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
                z.xor([
                  FriendInviteResponseSchema,
                  GroupDMInviteResponseSchema,
                  GuildInviteResponseSchema,
                ]),
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
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator('json', z.union([CreateGroupDMInviteRequestSchema, CreateGuildInviteRequestSchema])),
    validator(
      'form',
      z.union([
        z.object({
          max_age: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z.coerce.number().int().min(1).max(2592000).nullable(),
            )
            .exactOptional(),
        }),
        z.object({
          max_age: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z.coerce.number().int().min(0).max(5184000).nullable(),
            )
            .exactOptional(),
          temporary: z
            .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
            .exactOptional(),
          max_uses: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z.coerce.number().int().min(0).max(100).nullable(),
            )
            .exactOptional(),
          unique: z
            .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
            .exactOptional(),
          target_user_id: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  SnowflakeTypeSchema,
                ])
                .nullable(),
            )
            .exactOptional(),
          target_application_id: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  SnowflakeTypeSchema,
                ])
                .nullable(),
            )
            .exactOptional(),
          target_type: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  z.union([
                    z.coerce.number().pipe(z.literal(1)),
                    z.coerce.number().pipe(z.literal(2)),
                    z.coerce.number().pipe(z.literal(3)),
                  ]),
                ])
                .nullable(),
            )
            .exactOptional(),
          role_ids: z
            .union([
              z.string(),
              z.preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(SnowflakeTypeSchema)
                  .max(250)
                  .refine((val) => new Set(val).size === val.length),
              ),
              z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
            ])
            .exactOptional(),
          target_user_ids: z
            .union([
              z.string(),
              z.preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(SnowflakeTypeSchema)
                  .max(1000)
                  .refine((val) => new Set(val).size === val.length),
              ),
              z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
            ])
            .meta({ description: 'The IDs of the users to target with this invite.' })
            .exactOptional(),
        }),
      ]),
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
            'application/json': { schema: resolver(z.array(MessageResponseSchema).nullable()) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        around: SnowflakeTypeSchema.exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(MessageResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator('json', MessageCreateRequestSchema),
    validator(
      'form',
      z.object({
        content: z.string().max(4000).nullable().exactOptional(),
        embeds: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(
                    z.object({
                      type: z.string().max(152133).nullable().exactOptional(),
                      url: z.url().max(2048).nullable().exactOptional(),
                      title: z.string().max(256).nullable().exactOptional(),
                      color: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.coerce.number().int().min(0).max(16777215).nullable(),
                        )
                        .exactOptional(),
                      timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
                      description: z.string().max(4096).nullable().exactOptional(),
                      author: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedAuthorSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      image: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                url: z.url().max(2048).nullable().exactOptional(),
                                width: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                height: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                placeholder: z.string().max(64).nullable().exactOptional(),
                                placeholder_version: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().min(0).max(2147483647).nullable(),
                                  )
                                  .exactOptional(),
                                is_animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().max(4096).nullable().exactOptional(),
                              }),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      thumbnail: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                url: z.url().max(2048).nullable().exactOptional(),
                                width: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                height: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                placeholder: z.string().max(64).nullable().exactOptional(),
                                placeholder_version: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().min(0).max(2147483647).nullable(),
                                  )
                                  .exactOptional(),
                                is_animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().max(4096).nullable().exactOptional(),
                              }),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      footer: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedFooterSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      fields: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.object({
                                    name: z.string().max(256),
                                    value: z.string().max(1024),
                                    inline: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.stringbool().nullable(),
                                      )
                                      .exactOptional(),
                                  }),
                                )
                                .max(25),
                            )
                            .nullable(),
                        )
                        .exactOptional(),
                      provider: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedProviderSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      video: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                url: z.url().max(2048).nullable().exactOptional(),
                                width: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                height: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                placeholder: z.string().max(64).nullable().exactOptional(),
                                placeholder_version: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().min(0).max(2147483647).nullable(),
                                  )
                                  .exactOptional(),
                                is_animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().max(4096).nullable().exactOptional(),
                              }),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      audio: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedAudioSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                    }),
                  )
                  .max(10),
              )
              .nullable(),
          )
          .exactOptional(),
        allowed_mentions: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                z.object({
                  parse: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.union([
                                z.preprocess(
                                  (val) => (val === 'null' ? null : val),
                                  z.null().nullable(),
                                ),
                                z.union([
                                  z
                                    .literal('users')
                                    .meta({ description: 'Controls role mentions' }),
                                  z
                                    .literal('roles')
                                    .meta({ description: 'Controls user mentions' }),
                                  z
                                    .literal('everyone')
                                    .meta({ description: 'Controls @everyone and @here mentions' }),
                                ]),
                              ]),
                            )
                            .max(1521)
                            .refine((val) => new Set(val).size === val.length),
                        )
                        .nullable(),
                    )
                    .exactOptional(),
                  users: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    SnowflakeTypeSchema,
                                  ])
                                  .nullable(),
                              ),
                            )
                            .max(100)
                            .refine((val) => new Set(val).size === val.length),
                        )
                        .nullable(),
                    )
                    .exactOptional(),
                  roles: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    SnowflakeTypeSchema,
                                  ])
                                  .nullable(),
                              ),
                            )
                            .max(100)
                            .refine((val) => new Set(val).size === val.length),
                        )
                        .nullable(),
                    )
                    .exactOptional(),
                  replied_user: z
                    .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
                    .exactOptional(),
                }),
              ])
              .nullable(),
          )
          .exactOptional(),
        sticker_ids: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z.array(SnowflakeTypeSchema).max(3),
              )
              .nullable(),
          )
          .exactOptional(),
        components: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(
                    z.union([
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        components: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.union([
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100).nullable().exactOptional(),
                                  style: z.union([
                                    z.coerce.number().pipe(z.literal(1)),
                                    z.coerce.number().pipe(z.literal(2)),
                                    z.coerce.number().pipe(z.literal(3)),
                                    z.coerce.number().pipe(z.literal(4)),
                                    z.coerce.number().pipe(z.literal(5)),
                                    z.coerce.number().pipe(z.literal(6)),
                                  ]),
                                  label: z.string().max(80).nullable().exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  url: z.url().max(512).nullable().exactOptional(),
                                  sku_id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .union([
                                          z.preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.null().nullable(),
                                          ),
                                          SnowflakeTypeSchema,
                                        ])
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                  emoji: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .union([
                                          z.preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.null().nullable(),
                                          ),
                                          z.object({
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .union([
                                                    z.preprocess(
                                                      (val) => (val === 'null' ? null : val),
                                                      z.null().nullable(),
                                                    ),
                                                    SnowflakeTypeSchema,
                                                  ])
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                            name: z.string().max(32),
                                          }),
                                        ])
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.object({
                                                type: z.union([
                                                  z.literal('user'),
                                                  z.literal('role'),
                                                  z.literal('channel'),
                                                ]),
                                                id: SnowflakeTypeSchema,
                                              }),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                  channel_types: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.union([
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(1))
                                                  .meta({
                                                    description: 'A direct message between users',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(3))
                                                  .meta({
                                                    description:
                                                      'A direct message between multiple users',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(0))
                                                  .meta({
                                                    description: 'A text channel within a server',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(2))
                                                  .meta({
                                                    description: 'A voice channel within a server',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(4))
                                                  .meta({
                                                    description:
                                                      'An organizational category that contains up to 50 channels',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(5))
                                                  .meta({
                                                    description:
                                                      'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(10))
                                                  .meta({
                                                    description:
                                                      'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(11))
                                                  .meta({
                                                    description:
                                                      'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(12))
                                                  .meta({
                                                    description:
                                                      'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(13))
                                                  .meta({
                                                    description:
                                                      'A voice channel for hosting events with an audience',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(14))
                                                  .meta({
                                                    description:
                                                      'The channel in a hub containing the listed servers',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(15))
                                                  .meta({
                                                    description:
                                                      'Channel that can only contain threads',
                                                  }),
                                              ]),
                                            )
                                            .refine((val) => new Set(val).size === val.length),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.union([
                                                z.object({
                                                  type: z.union([
                                                    z.literal('user'),
                                                    z.literal('role'),
                                                    z.literal('channel'),
                                                  ]),
                                                  id: SnowflakeTypeSchema,
                                                }),
                                                z.object({
                                                  type: z.union([
                                                    z.literal('user'),
                                                    z.literal('role'),
                                                    z.literal('channel'),
                                                  ]),
                                                  id: SnowflakeTypeSchema,
                                                }),
                                              ]),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.object({
                                                type: z.union([
                                                  z.literal('user'),
                                                  z.literal('role'),
                                                  z.literal('channel'),
                                                ]),
                                                id: SnowflakeTypeSchema,
                                              }),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  options: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.object({
                                          label: z.string().min(1).max(100),
                                          value: z.string().min(1).max(100),
                                          description: z
                                            .string()
                                            .max(100)
                                            .nullable()
                                            .exactOptional(),
                                          default: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          emoji: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .union([
                                                  z.preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.null().nullable(),
                                                  ),
                                                  z.object({
                                                    id: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z
                                                          .union([
                                                            z.preprocess(
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z.null().nullable(),
                                                            ),
                                                            SnowflakeTypeSchema,
                                                          ])
                                                          .nullable(),
                                                      )
                                                      .exactOptional(),
                                                    name: z.string().max(32),
                                                  }),
                                                ])
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                        }),
                                      )
                                      .min(1)
                                      .max(25),
                                  ),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.object({
                                                type: z.union([
                                                  z.literal('user'),
                                                  z.literal('role'),
                                                  z.literal('channel'),
                                                ]),
                                                id: SnowflakeTypeSchema,
                                              }),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                              ]),
                            )
                            .min(1)
                            .max(5),
                        ),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        accent_color: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().int().min(0).max(16777215).nullable(),
                          )
                          .exactOptional(),
                        components: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.union([
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  components: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.union([
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z
                                              .string()
                                              .min(1)
                                              .max(100)
                                              .nullable()
                                              .exactOptional(),
                                            style: z.union([
                                              z.coerce.number().pipe(z.literal(1)),
                                              z.coerce.number().pipe(z.literal(2)),
                                              z.coerce.number().pipe(z.literal(3)),
                                              z.coerce.number().pipe(z.literal(4)),
                                              z.coerce.number().pipe(z.literal(5)),
                                              z.coerce.number().pipe(z.literal(6)),
                                            ]),
                                            label: z.string().max(80).nullable().exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            url: z.url().max(512).nullable().exactOptional(),
                                            sku_id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .union([
                                                    z.preprocess(
                                                      (val) => (val === 'null' ? null : val),
                                                      z.null().nullable(),
                                                    ),
                                                    SnowflakeTypeSchema,
                                                  ])
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                            emoji: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .union([
                                                    z.preprocess(
                                                      (val) => (val === 'null' ? null : val),
                                                      z.null().nullable(),
                                                    ),
                                                    z.object({
                                                      id: z
                                                        .preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z
                                                            .union([
                                                              z.preprocess(
                                                                (val) =>
                                                                  val === 'null' ? null : val,
                                                                z.null().nullable(),
                                                              ),
                                                              SnowflakeTypeSchema,
                                                            ])
                                                            .nullable(),
                                                        )
                                                        .exactOptional(),
                                                      name: z.string().max(32),
                                                    }),
                                                  ])
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.object({
                                                          type: z.union([
                                                            z.literal('user'),
                                                            z.literal('role'),
                                                            z.literal('channel'),
                                                          ]),
                                                          id: SnowflakeTypeSchema,
                                                        }),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                            channel_types: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.union([
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(1))
                                                            .meta({
                                                              description:
                                                                'A direct message between users',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(3))
                                                            .meta({
                                                              description:
                                                                'A direct message between multiple users',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(0))
                                                            .meta({
                                                              description:
                                                                'A text channel within a server',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(2))
                                                            .meta({
                                                              description:
                                                                'A voice channel within a server',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(4))
                                                            .meta({
                                                              description:
                                                                'An organizational category that contains up to 50 channels',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(5))
                                                            .meta({
                                                              description:
                                                                'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(10))
                                                            .meta({
                                                              description:
                                                                'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(11))
                                                            .meta({
                                                              description:
                                                                'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(12))
                                                            .meta({
                                                              description:
                                                                'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(13))
                                                            .meta({
                                                              description:
                                                                'A voice channel for hosting events with an audience',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(14))
                                                            .meta({
                                                              description:
                                                                'The channel in a hub containing the listed servers',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(15))
                                                            .meta({
                                                              description:
                                                                'Channel that can only contain threads',
                                                            }),
                                                        ]),
                                                      )
                                                      .refine(
                                                        (val) => new Set(val).size === val.length,
                                                      ),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.union([
                                                          z.object({
                                                            type: z.union([
                                                              z.literal('user'),
                                                              z.literal('role'),
                                                              z.literal('channel'),
                                                            ]),
                                                            id: SnowflakeTypeSchema,
                                                          }),
                                                          z.object({
                                                            type: z.union([
                                                              z.literal('user'),
                                                              z.literal('role'),
                                                              z.literal('channel'),
                                                            ]),
                                                            id: SnowflakeTypeSchema,
                                                          }),
                                                        ]),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.object({
                                                          type: z.union([
                                                            z.literal('user'),
                                                            z.literal('role'),
                                                            z.literal('channel'),
                                                          ]),
                                                          id: SnowflakeTypeSchema,
                                                        }),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            options: z.preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.object({
                                                    label: z.string().min(1).max(100),
                                                    value: z.string().min(1).max(100),
                                                    description: z
                                                      .string()
                                                      .max(100)
                                                      .nullable()
                                                      .exactOptional(),
                                                    default: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z.stringbool().nullable(),
                                                      )
                                                      .exactOptional(),
                                                    emoji: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z
                                                          .union([
                                                            z.preprocess(
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z.null().nullable(),
                                                            ),
                                                            z.object({
                                                              id: z
                                                                .preprocess(
                                                                  (val) =>
                                                                    val === 'null' ? null : val,
                                                                  z
                                                                    .union([
                                                                      z.preprocess(
                                                                        (val) =>
                                                                          val === 'null'
                                                                            ? null
                                                                            : val,
                                                                        z.null().nullable(),
                                                                      ),
                                                                      SnowflakeTypeSchema,
                                                                    ])
                                                                    .nullable(),
                                                                )
                                                                .exactOptional(),
                                                              name: z.string().max(32),
                                                            }),
                                                          ])
                                                          .nullable(),
                                                      )
                                                      .exactOptional(),
                                                  }),
                                                )
                                                .min(1)
                                                .max(25),
                                            ),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.object({
                                                          type: z.union([
                                                            z.literal('user'),
                                                            z.literal('role'),
                                                            z.literal('channel'),
                                                          ]),
                                                          id: SnowflakeTypeSchema,
                                                        }),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                        ]),
                                      )
                                      .min(1)
                                      .max(5),
                                  ),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  spoiler: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  items: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.object({
                                          description: z
                                            .string()
                                            .min(1)
                                            .max(1024)
                                            .nullable()
                                            .exactOptional(),
                                          spoiler: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          media: UnfurledMediaRequestSchema,
                                        }),
                                      )
                                      .min(1)
                                      .max(10),
                                  ),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  components: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.object({
                                          type: z.union([
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(1))
                                              .meta({
                                                description: 'Container for other components',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(2))
                                              .meta({ description: 'Button object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(3))
                                              .meta({
                                                description:
                                                  'Select menu for picking from defined text options',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(4))
                                              .meta({ description: 'Text input object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(5))
                                              .meta({ description: 'Select menu for users' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(6))
                                              .meta({ description: 'Select menu for roles' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(7))
                                              .meta({
                                                description:
                                                  'Select menu for mentionables (users and roles)',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(8))
                                              .meta({ description: 'Select menu for channels' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(9))
                                              .meta({ description: 'Section component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(10))
                                              .meta({ description: 'Text component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(11))
                                              .meta({ description: 'Thumbnail component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(12))
                                              .meta({ description: 'Media gallery component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(13))
                                              .meta({ description: 'File component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(14))
                                              .meta({ description: 'Separator component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(17))
                                              .meta({ description: 'Container component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(18))
                                              .meta({ description: 'Label component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(19))
                                              .meta({ description: 'File upload component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(21))
                                              .meta({ description: 'Radio group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(22))
                                              .meta({ description: 'Checkbox group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(23))
                                              .meta({ description: 'Checkbox component' }),
                                          ]),
                                          id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                            )
                                            .exactOptional(),
                                          content: z.string().min(1).max(4000),
                                        }),
                                      )
                                      .min(1)
                                      .max(3),
                                  ),
                                  accessory: z.union([
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z
                                        .string()
                                        .min(1)
                                        .max(100)
                                        .nullable()
                                        .exactOptional(),
                                      style: z.union([
                                        z.coerce.number().pipe(z.literal(1)),
                                        z.coerce.number().pipe(z.literal(2)),
                                        z.coerce.number().pipe(z.literal(3)),
                                        z.coerce.number().pipe(z.literal(4)),
                                        z.coerce.number().pipe(z.literal(5)),
                                        z.coerce.number().pipe(z.literal(6)),
                                      ]),
                                      label: z.string().max(80).nullable().exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      url: z.url().max(512).nullable().exactOptional(),
                                      sku_id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              SnowflakeTypeSchema,
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      emoji: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              z.object({
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .union([
                                                        z.preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z.null().nullable(),
                                                        ),
                                                        SnowflakeTypeSchema,
                                                      ])
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                name: z.string().max(32),
                                              }),
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      description: z
                                        .string()
                                        .min(1)
                                        .max(1024)
                                        .nullable()
                                        .exactOptional(),
                                      spoiler: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      media: UnfurledMediaRequestSchema,
                                    }),
                                  ]),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  spacing: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .union([
                                          z.preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.null().nullable(),
                                          ),
                                          z.union([
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(1))
                                              .meta({ description: 'Small spacing' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(2))
                                              .meta({ description: 'Large spacing' }),
                                          ]),
                                        ])
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                  divider: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  content: z.string().min(1).max(4000),
                                }),
                              ]),
                            )
                            .min(1)
                            .max(40),
                        ),
                        spoiler: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        spoiler: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                        file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        items: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                description: z.string().min(1).max(1024).nullable().exactOptional(),
                                spoiler: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                media: UnfurledMediaRequestSchema,
                              }),
                            )
                            .min(1)
                            .max(10),
                        ),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        components: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                type: z.union([
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(1))
                                    .meta({ description: 'Container for other components' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(2))
                                    .meta({ description: 'Button object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(3))
                                    .meta({
                                      description:
                                        'Select menu for picking from defined text options',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(4))
                                    .meta({ description: 'Text input object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(5))
                                    .meta({ description: 'Select menu for users' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(6))
                                    .meta({ description: 'Select menu for roles' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(7))
                                    .meta({
                                      description: 'Select menu for mentionables (users and roles)',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(8))
                                    .meta({ description: 'Select menu for channels' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(9))
                                    .meta({ description: 'Section component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(10))
                                    .meta({ description: 'Text component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(11))
                                    .meta({ description: 'Thumbnail component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(12))
                                    .meta({ description: 'Media gallery component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(13))
                                    .meta({ description: 'File component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(14))
                                    .meta({ description: 'Separator component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(17))
                                    .meta({ description: 'Container component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(18))
                                    .meta({ description: 'Label component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(19))
                                    .meta({ description: 'File upload component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(21))
                                    .meta({ description: 'Radio group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(22))
                                    .meta({ description: 'Checkbox group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(23))
                                    .meta({ description: 'Checkbox component' }),
                                ]),
                                id: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                  )
                                  .exactOptional(),
                                content: z.string().min(1).max(4000),
                              }),
                            )
                            .min(1)
                            .max(3),
                        ),
                        accessory: z.union([
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            custom_id: z.string().min(1).max(100).nullable().exactOptional(),
                            style: z.union([
                              z.coerce.number().pipe(z.literal(1)),
                              z.coerce.number().pipe(z.literal(2)),
                              z.coerce.number().pipe(z.literal(3)),
                              z.coerce.number().pipe(z.literal(4)),
                              z.coerce.number().pipe(z.literal(5)),
                              z.coerce.number().pipe(z.literal(6)),
                            ]),
                            label: z.string().max(80).nullable().exactOptional(),
                            disabled: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                            url: z.url().max(512).nullable().exactOptional(),
                            sku_id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    SnowflakeTypeSchema,
                                  ])
                                  .nullable(),
                              )
                              .exactOptional(),
                            emoji: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    z.object({
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              SnowflakeTypeSchema,
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      name: z.string().max(32),
                                    }),
                                  ])
                                  .nullable(),
                              )
                              .exactOptional(),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            description: z.string().min(1).max(1024).nullable().exactOptional(),
                            spoiler: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                            media: UnfurledMediaRequestSchema,
                          }),
                        ]),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        spacing: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z
                              .union([
                                z.preprocess(
                                  (val) => (val === 'null' ? null : val),
                                  z.null().nullable(),
                                ),
                                z.union([
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(1))
                                    .meta({ description: 'Small spacing' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(2))
                                    .meta({ description: 'Large spacing' }),
                                ]),
                              ])
                              .nullable(),
                          )
                          .exactOptional(),
                        divider: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        content: z.string().min(1).max(4000),
                      }),
                    ]),
                  )
                  .max(40),
              )
              .nullable(),
          )
          .exactOptional(),
        flags: z
          .preprocess((val) => (val === 'null' ? null : val), z.coerce.number().int().nullable())
          .exactOptional(),
        attachments: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(
                    z.object({
                      id: SnowflakeTypeSchema,
                      filename: z.string().min(1).max(1024).nullable().exactOptional(),
                      description: z.string().max(1024).nullable().exactOptional(),
                      duration_secs: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.coerce.number().min(0).max(2147483647).nullable(),
                        )
                        .exactOptional(),
                      waveform: z.string().max(400).nullable().exactOptional(),
                      title: z.string().max(1024).nullable().exactOptional(),
                      is_spoiler: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.stringbool().nullable(),
                        )
                        .exactOptional(),
                    }),
                  )
                  .max(10),
              )
              .nullable(),
          )
          .exactOptional(),
        poll: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                z.object({
                  question: z
                    .object({
                      text: z
                        .string()
                        .min(1)
                        .max(300)
                        .nullable()
                        .meta({ description: 'The text of the field' })
                        .exactOptional(),
                      emoji: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                id: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .union([
                                        z.preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.null().nullable(),
                                        ),
                                        SnowflakeTypeSchema,
                                      ])
                                      .meta({ description: 'The ID of the custom emoji' })
                                      .nullable(),
                                  )
                                  .exactOptional(),
                                name: z
                                  .string()
                                  .max(32)
                                  .nullable()
                                  .meta({
                                    description:
                                      'The name of the emoji, or the unicode emoji character',
                                  })
                                  .exactOptional(),
                                animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .stringbool()
                                      .nullable()
                                      .meta({ description: 'Whether the emoji is animated' }),
                                  )
                                  .exactOptional(),
                              }),
                            ])
                            .meta({ description: 'The emoji of the field' })
                            .nullable(),
                        )
                        .exactOptional(),
                    })
                    .meta({ description: 'The question of the poll. Only `text` is supported.' }),
                  answers: z
                    .preprocess(
                      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                      z
                        .array(
                          z.object({
                            poll_media: z
                              .object({
                                text: z
                                  .string()
                                  .min(1)
                                  .max(300)
                                  .nullable()
                                  .meta({ description: 'The text of the field' })
                                  .exactOptional(),
                                emoji: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .union([
                                        z.preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.null().nullable(),
                                        ),
                                        z.object({
                                          id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .union([
                                                  z.preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.null().nullable(),
                                                  ),
                                                  SnowflakeTypeSchema,
                                                ])
                                                .meta({ description: 'The ID of the custom emoji' })
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                          name: z
                                            .string()
                                            .max(32)
                                            .nullable()
                                            .meta({
                                              description:
                                                'The name of the emoji, or the unicode emoji character',
                                            })
                                            .exactOptional(),
                                          animated: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .stringbool()
                                                .nullable()
                                                .meta({
                                                  description: 'Whether the emoji is animated',
                                                }),
                                            )
                                            .exactOptional(),
                                        }),
                                      ])
                                      .meta({ description: 'The emoji of the field' })
                                      .nullable(),
                                  )
                                  .exactOptional(),
                              })
                              .meta({ description: 'The data of the answer' }),
                          }),
                        )
                        .min(1)
                        .max(10),
                    )
                    .meta({ description: 'Each of the answers available in the poll, up to 10' }),
                  allow_multiselect: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .stringbool()
                        .nullable()
                        .meta({ description: 'Whether a user can select multiple answers' }),
                    )
                    .exactOptional(),
                  layout_type: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .union([
                          z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                          z.union([
                            z.coerce
                              .number()
                              .pipe(z.literal(1))
                              .meta({ description: 'The, uhm, default layout type.' }),
                          ]),
                        ])
                        .meta({
                          description: 'The layout type of the poll. Defaults to... DEFAULT!',
                        })
                        .nullable(),
                    )
                    .exactOptional(),
                  duration: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z.coerce
                        .number()
                        .pipe(z.int32().min(1).max(768))
                        .nullable()
                        .meta({
                          description:
                            'Number of hours the poll should be open for, up to 32 days. Defaults to 24',
                        }),
                    )
                    .exactOptional(),
                }),
              ])
              .nullable(),
          )
          .exactOptional(),
        shared_client_theme: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                z.object({
                  colors: z.preprocess(
                    (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                    z.array(z.string().length(6)).min(1).max(5),
                  ),
                  gradient_angle: z.coerce.number().pipe(z.int32().min(0).max(360)),
                  base_mix: z.coerce.number().pipe(z.int32().min(0).max(100)),
                  base_theme: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .union([
                          z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                          z.union([
                            z.coerce
                              .number()
                              .pipe(z.literal(0))
                              .meta({ description: 'No base theme' }),
                            z.coerce
                              .number()
                              .pipe(z.literal(1))
                              .meta({ description: 'Dark base theme' }),
                            z.coerce
                              .number()
                              .pipe(z.literal(2))
                              .meta({ description: 'Light base theme' }),
                            z.coerce
                              .number()
                              .pipe(z.literal(3))
                              .meta({ description: 'Darker base theme' }),
                            z.coerce
                              .number()
                              .pipe(z.literal(4))
                              .meta({ description: 'Midnight base theme' }),
                          ]),
                        ])
                        .nullable(),
                    )
                    .exactOptional(),
                }),
              ])
              .nullable(),
          )
          .exactOptional(),
        message_reference: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                z.object({
                  guild_id: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .union([
                          z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                          SnowflakeTypeSchema,
                        ])
                        .nullable(),
                    )
                    .exactOptional(),
                  channel_id: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .union([
                          z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                          SnowflakeTypeSchema,
                        ])
                        .nullable(),
                    )
                    .exactOptional(),
                  message_id: SnowflakeTypeSchema,
                  fail_if_not_exists: z
                    .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
                    .exactOptional(),
                  type: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .union([
                          z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                          z.union([
                            z.coerce
                              .number()
                              .pipe(z.literal(0))
                              .meta({ description: 'Reference to a message' }),
                          ]),
                        ])
                        .nullable(),
                    )
                    .exactOptional(),
                }),
              ])
              .nullable(),
          )
          .exactOptional(),
        nonce: z
          .union([
            z.coerce.bigint().pipe(z.int64().min(-9223372036854776000n).max(9223372036854776000n)),
            z.string().max(25),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
        enforce_nonce: z
          .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
          .exactOptional(),
        tts: z
          .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
          .exactOptional(),
      }),
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
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.object({
        messages: z
          .array(SnowflakeTypeSchema)
          .min(2)
          .max(100)
          .refine((val) => new Set(val).size === val.length),
      }),
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
          content: { 'application/json': { schema: resolver(PinnedMessagesResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        before: z.iso.datetime({ offset: true }).exactOptional(),
        limit: z.coerce.number().int().min(1).max(50).exactOptional(),
      }),
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
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
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
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
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
          content: { 'application/json': { schema: resolver(MessageResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
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
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
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
          content: { 'application/json': { schema: resolver(MessageResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    validator('json', MessageEditRequestPartialSchema),
    validator(
      'form',
      z.object({
        content: z.string().max(4000).nullable().exactOptional(),
        embeds: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(
                    z.object({
                      type: z.string().max(152133).nullable().exactOptional(),
                      url: z.url().max(2048).nullable().exactOptional(),
                      title: z.string().max(256).nullable().exactOptional(),
                      color: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.coerce.number().int().min(0).max(16777215).nullable(),
                        )
                        .exactOptional(),
                      timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
                      description: z.string().max(4096).nullable().exactOptional(),
                      author: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedAuthorSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      image: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                url: z.url().max(2048).nullable().exactOptional(),
                                width: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                height: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                placeholder: z.string().max(64).nullable().exactOptional(),
                                placeholder_version: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().min(0).max(2147483647).nullable(),
                                  )
                                  .exactOptional(),
                                is_animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().max(4096).nullable().exactOptional(),
                              }),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      thumbnail: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                url: z.url().max(2048).nullable().exactOptional(),
                                width: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                height: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                placeholder: z.string().max(64).nullable().exactOptional(),
                                placeholder_version: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().min(0).max(2147483647).nullable(),
                                  )
                                  .exactOptional(),
                                is_animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().max(4096).nullable().exactOptional(),
                              }),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      footer: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedFooterSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      fields: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.object({
                                    name: z.string().max(256),
                                    value: z.string().max(1024),
                                    inline: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.stringbool().nullable(),
                                      )
                                      .exactOptional(),
                                  }),
                                )
                                .max(25),
                            )
                            .nullable(),
                        )
                        .exactOptional(),
                      provider: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedProviderSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      video: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.object({
                                url: z.url().max(2048).nullable().exactOptional(),
                                width: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                height: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().nullable(),
                                  )
                                  .exactOptional(),
                                placeholder: z.string().max(64).nullable().exactOptional(),
                                placeholder_version: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().int().min(0).max(2147483647).nullable(),
                                  )
                                  .exactOptional(),
                                is_animated: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().max(4096).nullable().exactOptional(),
                              }),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                      audio: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              RichEmbedAudioSchema,
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                    }),
                  )
                  .max(10),
              )
              .nullable(),
          )
          .exactOptional(),
        flags: z
          .preprocess((val) => (val === 'null' ? null : val), z.coerce.number().int().nullable())
          .exactOptional(),
        allowed_mentions: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                z.object({
                  parse: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.union([
                                z.preprocess(
                                  (val) => (val === 'null' ? null : val),
                                  z.null().nullable(),
                                ),
                                z.union([
                                  z
                                    .literal('users')
                                    .meta({ description: 'Controls role mentions' }),
                                  z
                                    .literal('roles')
                                    .meta({ description: 'Controls user mentions' }),
                                  z
                                    .literal('everyone')
                                    .meta({ description: 'Controls @everyone and @here mentions' }),
                                ]),
                              ]),
                            )
                            .max(1521)
                            .refine((val) => new Set(val).size === val.length),
                        )
                        .nullable(),
                    )
                    .exactOptional(),
                  users: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    SnowflakeTypeSchema,
                                  ])
                                  .nullable(),
                              ),
                            )
                            .max(100)
                            .refine((val) => new Set(val).size === val.length),
                        )
                        .nullable(),
                    )
                    .exactOptional(),
                  roles: z
                    .preprocess(
                      (val) => (val === 'null' ? null : val),
                      z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    SnowflakeTypeSchema,
                                  ])
                                  .nullable(),
                              ),
                            )
                            .max(100)
                            .refine((val) => new Set(val).size === val.length),
                        )
                        .nullable(),
                    )
                    .exactOptional(),
                  replied_user: z
                    .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
                    .exactOptional(),
                }),
              ])
              .nullable(),
          )
          .exactOptional(),
        sticker_ids: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z.array(SnowflakeTypeSchema).max(1521),
              )
              .nullable(),
          )
          .exactOptional(),
        components: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(
                    z.union([
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        components: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.union([
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100).nullable().exactOptional(),
                                  style: z.union([
                                    z.coerce.number().pipe(z.literal(1)),
                                    z.coerce.number().pipe(z.literal(2)),
                                    z.coerce.number().pipe(z.literal(3)),
                                    z.coerce.number().pipe(z.literal(4)),
                                    z.coerce.number().pipe(z.literal(5)),
                                    z.coerce.number().pipe(z.literal(6)),
                                  ]),
                                  label: z.string().max(80).nullable().exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  url: z.url().max(512).nullable().exactOptional(),
                                  sku_id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .union([
                                          z.preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.null().nullable(),
                                          ),
                                          SnowflakeTypeSchema,
                                        ])
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                  emoji: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .union([
                                          z.preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.null().nullable(),
                                          ),
                                          z.object({
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .union([
                                                    z.preprocess(
                                                      (val) => (val === 'null' ? null : val),
                                                      z.null().nullable(),
                                                    ),
                                                    SnowflakeTypeSchema,
                                                  ])
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                            name: z.string().max(32),
                                          }),
                                        ])
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.object({
                                                type: z.union([
                                                  z.literal('user'),
                                                  z.literal('role'),
                                                  z.literal('channel'),
                                                ]),
                                                id: SnowflakeTypeSchema,
                                              }),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                  channel_types: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.union([
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(1))
                                                  .meta({
                                                    description: 'A direct message between users',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(3))
                                                  .meta({
                                                    description:
                                                      'A direct message between multiple users',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(0))
                                                  .meta({
                                                    description: 'A text channel within a server',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(2))
                                                  .meta({
                                                    description: 'A voice channel within a server',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(4))
                                                  .meta({
                                                    description:
                                                      'An organizational category that contains up to 50 channels',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(5))
                                                  .meta({
                                                    description:
                                                      'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(10))
                                                  .meta({
                                                    description:
                                                      'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(11))
                                                  .meta({
                                                    description:
                                                      'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(12))
                                                  .meta({
                                                    description:
                                                      'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(13))
                                                  .meta({
                                                    description:
                                                      'A voice channel for hosting events with an audience',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(14))
                                                  .meta({
                                                    description:
                                                      'The channel in a hub containing the listed servers',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(15))
                                                  .meta({
                                                    description:
                                                      'Channel that can only contain threads',
                                                  }),
                                              ]),
                                            )
                                            .refine((val) => new Set(val).size === val.length),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.union([
                                                z.object({
                                                  type: z.union([
                                                    z.literal('user'),
                                                    z.literal('role'),
                                                    z.literal('channel'),
                                                  ]),
                                                  id: SnowflakeTypeSchema,
                                                }),
                                                z.object({
                                                  type: z.union([
                                                    z.literal('user'),
                                                    z.literal('role'),
                                                    z.literal('channel'),
                                                  ]),
                                                  id: SnowflakeTypeSchema,
                                                }),
                                              ]),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.object({
                                                type: z.union([
                                                  z.literal('user'),
                                                  z.literal('role'),
                                                  z.literal('channel'),
                                                ]),
                                                id: SnowflakeTypeSchema,
                                              }),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  options: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.object({
                                          label: z.string().min(1).max(100),
                                          value: z.string().min(1).max(100),
                                          description: z
                                            .string()
                                            .max(100)
                                            .nullable()
                                            .exactOptional(),
                                          default: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          emoji: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .union([
                                                  z.preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.null().nullable(),
                                                  ),
                                                  z.object({
                                                    id: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z
                                                          .union([
                                                            z.preprocess(
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z.null().nullable(),
                                                            ),
                                                            SnowflakeTypeSchema,
                                                          ])
                                                          .nullable(),
                                                      )
                                                      .exactOptional(),
                                                    name: z.string().max(32),
                                                  }),
                                                ])
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                        }),
                                      )
                                      .min(1)
                                      .max(25),
                                  ),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  custom_id: z.string().min(1).max(100),
                                  placeholder: z.string().max(150).nullable().exactOptional(),
                                  min_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(0).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  max_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().int().min(1).max(25).nullable(),
                                    )
                                    .exactOptional(),
                                  disabled: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  required: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  default_values: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .preprocess(
                                          (val) =>
                                            val === undefined || Array.isArray(val) ? val : [val],
                                          z
                                            .array(
                                              z.object({
                                                type: z.union([
                                                  z.literal('user'),
                                                  z.literal('role'),
                                                  z.literal('channel'),
                                                ]),
                                                id: SnowflakeTypeSchema,
                                              }),
                                            )
                                            .max(25),
                                        )
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                }),
                              ]),
                            )
                            .min(1)
                            .max(5),
                        ),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        accent_color: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().int().min(0).max(16777215).nullable(),
                          )
                          .exactOptional(),
                        components: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.union([
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  components: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.union([
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z
                                              .string()
                                              .min(1)
                                              .max(100)
                                              .nullable()
                                              .exactOptional(),
                                            style: z.union([
                                              z.coerce.number().pipe(z.literal(1)),
                                              z.coerce.number().pipe(z.literal(2)),
                                              z.coerce.number().pipe(z.literal(3)),
                                              z.coerce.number().pipe(z.literal(4)),
                                              z.coerce.number().pipe(z.literal(5)),
                                              z.coerce.number().pipe(z.literal(6)),
                                            ]),
                                            label: z.string().max(80).nullable().exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            url: z.url().max(512).nullable().exactOptional(),
                                            sku_id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .union([
                                                    z.preprocess(
                                                      (val) => (val === 'null' ? null : val),
                                                      z.null().nullable(),
                                                    ),
                                                    SnowflakeTypeSchema,
                                                  ])
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                            emoji: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .union([
                                                    z.preprocess(
                                                      (val) => (val === 'null' ? null : val),
                                                      z.null().nullable(),
                                                    ),
                                                    z.object({
                                                      id: z
                                                        .preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z
                                                            .union([
                                                              z.preprocess(
                                                                (val) =>
                                                                  val === 'null' ? null : val,
                                                                z.null().nullable(),
                                                              ),
                                                              SnowflakeTypeSchema,
                                                            ])
                                                            .nullable(),
                                                        )
                                                        .exactOptional(),
                                                      name: z.string().max(32),
                                                    }),
                                                  ])
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.object({
                                                          type: z.union([
                                                            z.literal('user'),
                                                            z.literal('role'),
                                                            z.literal('channel'),
                                                          ]),
                                                          id: SnowflakeTypeSchema,
                                                        }),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                            channel_types: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.union([
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(1))
                                                            .meta({
                                                              description:
                                                                'A direct message between users',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(3))
                                                            .meta({
                                                              description:
                                                                'A direct message between multiple users',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(0))
                                                            .meta({
                                                              description:
                                                                'A text channel within a server',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(2))
                                                            .meta({
                                                              description:
                                                                'A voice channel within a server',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(4))
                                                            .meta({
                                                              description:
                                                                'An organizational category that contains up to 50 channels',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(5))
                                                            .meta({
                                                              description:
                                                                'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(10))
                                                            .meta({
                                                              description:
                                                                'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(11))
                                                            .meta({
                                                              description:
                                                                'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(12))
                                                            .meta({
                                                              description:
                                                                'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(13))
                                                            .meta({
                                                              description:
                                                                'A voice channel for hosting events with an audience',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(14))
                                                            .meta({
                                                              description:
                                                                'The channel in a hub containing the listed servers',
                                                            }),
                                                          z.coerce
                                                            .number()
                                                            .pipe(z.literal(15))
                                                            .meta({
                                                              description:
                                                                'Channel that can only contain threads',
                                                            }),
                                                        ]),
                                                      )
                                                      .refine(
                                                        (val) => new Set(val).size === val.length,
                                                      ),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.union([
                                                          z.object({
                                                            type: z.union([
                                                              z.literal('user'),
                                                              z.literal('role'),
                                                              z.literal('channel'),
                                                            ]),
                                                            id: SnowflakeTypeSchema,
                                                          }),
                                                          z.object({
                                                            type: z.union([
                                                              z.literal('user'),
                                                              z.literal('role'),
                                                              z.literal('channel'),
                                                            ]),
                                                            id: SnowflakeTypeSchema,
                                                          }),
                                                        ]),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.object({
                                                          type: z.union([
                                                            z.literal('user'),
                                                            z.literal('role'),
                                                            z.literal('channel'),
                                                          ]),
                                                          id: SnowflakeTypeSchema,
                                                        }),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            options: z.preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.object({
                                                    label: z.string().min(1).max(100),
                                                    value: z.string().min(1).max(100),
                                                    description: z
                                                      .string()
                                                      .max(100)
                                                      .nullable()
                                                      .exactOptional(),
                                                    default: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z.stringbool().nullable(),
                                                      )
                                                      .exactOptional(),
                                                    emoji: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z
                                                          .union([
                                                            z.preprocess(
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z.null().nullable(),
                                                            ),
                                                            z.object({
                                                              id: z
                                                                .preprocess(
                                                                  (val) =>
                                                                    val === 'null' ? null : val,
                                                                  z
                                                                    .union([
                                                                      z.preprocess(
                                                                        (val) =>
                                                                          val === 'null'
                                                                            ? null
                                                                            : val,
                                                                        z.null().nullable(),
                                                                      ),
                                                                      SnowflakeTypeSchema,
                                                                    ])
                                                                    .nullable(),
                                                                )
                                                                .exactOptional(),
                                                              name: z.string().max(32),
                                                            }),
                                                          ])
                                                          .nullable(),
                                                      )
                                                      .exactOptional(),
                                                  }),
                                                )
                                                .min(1)
                                                .max(25),
                                            ),
                                          }),
                                          z.object({
                                            type: z.union([
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(1))
                                                .meta({
                                                  description: 'Container for other components',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(2))
                                                .meta({ description: 'Button object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(3))
                                                .meta({
                                                  description:
                                                    'Select menu for picking from defined text options',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(4))
                                                .meta({ description: 'Text input object' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(5))
                                                .meta({ description: 'Select menu for users' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(6))
                                                .meta({ description: 'Select menu for roles' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(7))
                                                .meta({
                                                  description:
                                                    'Select menu for mentionables (users and roles)',
                                                }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(8))
                                                .meta({ description: 'Select menu for channels' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(9))
                                                .meta({ description: 'Section component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(10))
                                                .meta({ description: 'Text component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(11))
                                                .meta({ description: 'Thumbnail component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(12))
                                                .meta({ description: 'Media gallery component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(13))
                                                .meta({ description: 'File component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(14))
                                                .meta({ description: 'Separator component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(17))
                                                .meta({ description: 'Container component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(18))
                                                .meta({ description: 'Label component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(19))
                                                .meta({ description: 'File upload component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(21))
                                                .meta({ description: 'Radio group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(22))
                                                .meta({ description: 'Checkbox group component' }),
                                              z.coerce
                                                .number()
                                                .pipe(z.literal(23))
                                                .meta({ description: 'Checkbox component' }),
                                            ]),
                                            id: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                              )
                                              .exactOptional(),
                                            custom_id: z.string().min(1).max(100),
                                            placeholder: z
                                              .string()
                                              .max(150)
                                              .nullable()
                                              .exactOptional(),
                                            min_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(0).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            max_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.coerce.number().int().min(1).max(25).nullable(),
                                              )
                                              .exactOptional(),
                                            disabled: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            required: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.stringbool().nullable(),
                                              )
                                              .exactOptional(),
                                            default_values: z
                                              .preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z
                                                  .preprocess(
                                                    (val) =>
                                                      val === undefined || Array.isArray(val)
                                                        ? val
                                                        : [val],
                                                    z
                                                      .array(
                                                        z.object({
                                                          type: z.union([
                                                            z.literal('user'),
                                                            z.literal('role'),
                                                            z.literal('channel'),
                                                          ]),
                                                          id: SnowflakeTypeSchema,
                                                        }),
                                                      )
                                                      .max(25),
                                                  )
                                                  .nullable(),
                                              )
                                              .exactOptional(),
                                          }),
                                        ]),
                                      )
                                      .min(1)
                                      .max(5),
                                  ),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  spoiler: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                  file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  items: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.object({
                                          description: z
                                            .string()
                                            .min(1)
                                            .max(1024)
                                            .nullable()
                                            .exactOptional(),
                                          spoiler: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          media: UnfurledMediaRequestSchema,
                                        }),
                                      )
                                      .min(1)
                                      .max(10),
                                  ),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  components: z.preprocess(
                                    (val) =>
                                      val === undefined || Array.isArray(val) ? val : [val],
                                    z
                                      .array(
                                        z.object({
                                          type: z.union([
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(1))
                                              .meta({
                                                description: 'Container for other components',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(2))
                                              .meta({ description: 'Button object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(3))
                                              .meta({
                                                description:
                                                  'Select menu for picking from defined text options',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(4))
                                              .meta({ description: 'Text input object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(5))
                                              .meta({ description: 'Select menu for users' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(6))
                                              .meta({ description: 'Select menu for roles' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(7))
                                              .meta({
                                                description:
                                                  'Select menu for mentionables (users and roles)',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(8))
                                              .meta({ description: 'Select menu for channels' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(9))
                                              .meta({ description: 'Section component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(10))
                                              .meta({ description: 'Text component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(11))
                                              .meta({ description: 'Thumbnail component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(12))
                                              .meta({ description: 'Media gallery component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(13))
                                              .meta({ description: 'File component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(14))
                                              .meta({ description: 'Separator component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(17))
                                              .meta({ description: 'Container component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(18))
                                              .meta({ description: 'Label component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(19))
                                              .meta({ description: 'File upload component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(21))
                                              .meta({ description: 'Radio group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(22))
                                              .meta({ description: 'Checkbox group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(23))
                                              .meta({ description: 'Checkbox component' }),
                                          ]),
                                          id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                            )
                                            .exactOptional(),
                                          content: z.string().min(1).max(4000),
                                        }),
                                      )
                                      .min(1)
                                      .max(3),
                                  ),
                                  accessory: z.union([
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z
                                        .string()
                                        .min(1)
                                        .max(100)
                                        .nullable()
                                        .exactOptional(),
                                      style: z.union([
                                        z.coerce.number().pipe(z.literal(1)),
                                        z.coerce.number().pipe(z.literal(2)),
                                        z.coerce.number().pipe(z.literal(3)),
                                        z.coerce.number().pipe(z.literal(4)),
                                        z.coerce.number().pipe(z.literal(5)),
                                        z.coerce.number().pipe(z.literal(6)),
                                      ]),
                                      label: z.string().max(80).nullable().exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      url: z.url().max(512).nullable().exactOptional(),
                                      sku_id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              SnowflakeTypeSchema,
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      emoji: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              z.object({
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .union([
                                                        z.preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z.null().nullable(),
                                                        ),
                                                        SnowflakeTypeSchema,
                                                      ])
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                name: z.string().max(32),
                                              }),
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      description: z
                                        .string()
                                        .min(1)
                                        .max(1024)
                                        .nullable()
                                        .exactOptional(),
                                      spoiler: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      media: UnfurledMediaRequestSchema,
                                    }),
                                  ]),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  spacing: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z
                                        .union([
                                          z.preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.null().nullable(),
                                          ),
                                          z.union([
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(1))
                                              .meta({ description: 'Small spacing' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(2))
                                              .meta({ description: 'Large spacing' }),
                                          ]),
                                        ])
                                        .nullable(),
                                    )
                                    .exactOptional(),
                                  divider: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.stringbool().nullable(),
                                    )
                                    .exactOptional(),
                                }),
                                z.object({
                                  type: z.union([
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(1))
                                      .meta({ description: 'Container for other components' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(2))
                                      .meta({ description: 'Button object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(3))
                                      .meta({
                                        description:
                                          'Select menu for picking from defined text options',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(4))
                                      .meta({ description: 'Text input object' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(5))
                                      .meta({ description: 'Select menu for users' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(6))
                                      .meta({ description: 'Select menu for roles' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(7))
                                      .meta({
                                        description:
                                          'Select menu for mentionables (users and roles)',
                                      }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(8))
                                      .meta({ description: 'Select menu for channels' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(9))
                                      .meta({ description: 'Section component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(10))
                                      .meta({ description: 'Text component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(11))
                                      .meta({ description: 'Thumbnail component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(12))
                                      .meta({ description: 'Media gallery component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(13))
                                      .meta({ description: 'File component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(14))
                                      .meta({ description: 'Separator component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(17))
                                      .meta({ description: 'Container component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(18))
                                      .meta({ description: 'Label component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(19))
                                      .meta({ description: 'File upload component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(21))
                                      .meta({ description: 'Radio group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(22))
                                      .meta({ description: 'Checkbox group component' }),
                                    z.coerce
                                      .number()
                                      .pipe(z.literal(23))
                                      .meta({ description: 'Checkbox component' }),
                                  ]),
                                  id: z
                                    .preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                    )
                                    .exactOptional(),
                                  content: z.string().min(1).max(4000),
                                }),
                              ]),
                            )
                            .min(1)
                            .max(40),
                        ),
                        spoiler: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        spoiler: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                        file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        items: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                description: z.string().min(1).max(1024).nullable().exactOptional(),
                                spoiler: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                media: UnfurledMediaRequestSchema,
                              }),
                            )
                            .min(1)
                            .max(10),
                        ),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        components: z.preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                type: z.union([
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(1))
                                    .meta({ description: 'Container for other components' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(2))
                                    .meta({ description: 'Button object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(3))
                                    .meta({
                                      description:
                                        'Select menu for picking from defined text options',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(4))
                                    .meta({ description: 'Text input object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(5))
                                    .meta({ description: 'Select menu for users' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(6))
                                    .meta({ description: 'Select menu for roles' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(7))
                                    .meta({
                                      description: 'Select menu for mentionables (users and roles)',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(8))
                                    .meta({ description: 'Select menu for channels' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(9))
                                    .meta({ description: 'Section component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(10))
                                    .meta({ description: 'Text component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(11))
                                    .meta({ description: 'Thumbnail component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(12))
                                    .meta({ description: 'Media gallery component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(13))
                                    .meta({ description: 'File component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(14))
                                    .meta({ description: 'Separator component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(17))
                                    .meta({ description: 'Container component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(18))
                                    .meta({ description: 'Label component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(19))
                                    .meta({ description: 'File upload component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(21))
                                    .meta({ description: 'Radio group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(22))
                                    .meta({ description: 'Checkbox group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(23))
                                    .meta({ description: 'Checkbox component' }),
                                ]),
                                id: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                  )
                                  .exactOptional(),
                                content: z.string().min(1).max(4000),
                              }),
                            )
                            .min(1)
                            .max(3),
                        ),
                        accessory: z.union([
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            custom_id: z.string().min(1).max(100).nullable().exactOptional(),
                            style: z.union([
                              z.coerce.number().pipe(z.literal(1)),
                              z.coerce.number().pipe(z.literal(2)),
                              z.coerce.number().pipe(z.literal(3)),
                              z.coerce.number().pipe(z.literal(4)),
                              z.coerce.number().pipe(z.literal(5)),
                              z.coerce.number().pipe(z.literal(6)),
                            ]),
                            label: z.string().max(80).nullable().exactOptional(),
                            disabled: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                            url: z.url().max(512).nullable().exactOptional(),
                            sku_id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    SnowflakeTypeSchema,
                                  ])
                                  .nullable(),
                              )
                              .exactOptional(),
                            emoji: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    z.object({
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              SnowflakeTypeSchema,
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      name: z.string().max(32),
                                    }),
                                  ])
                                  .nullable(),
                              )
                              .exactOptional(),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            description: z.string().min(1).max(1024).nullable().exactOptional(),
                            spoiler: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                            media: UnfurledMediaRequestSchema,
                          }),
                        ]),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        spacing: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z
                              .union([
                                z.preprocess(
                                  (val) => (val === 'null' ? null : val),
                                  z.null().nullable(),
                                ),
                                z.union([
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(1))
                                    .meta({ description: 'Small spacing' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(2))
                                    .meta({ description: 'Large spacing' }),
                                ]),
                              ])
                              .nullable(),
                          )
                          .exactOptional(),
                        divider: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.stringbool().nullable(),
                          )
                          .exactOptional(),
                      }),
                      z.object({
                        type: z.union([
                          z.coerce
                            .number()
                            .pipe(z.literal(1))
                            .meta({ description: 'Container for other components' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(2))
                            .meta({ description: 'Button object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(3))
                            .meta({
                              description: 'Select menu for picking from defined text options',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(4))
                            .meta({ description: 'Text input object' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(5))
                            .meta({ description: 'Select menu for users' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(6))
                            .meta({ description: 'Select menu for roles' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(7))
                            .meta({
                              description: 'Select menu for mentionables (users and roles)',
                            }),
                          z.coerce
                            .number()
                            .pipe(z.literal(8))
                            .meta({ description: 'Select menu for channels' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(9))
                            .meta({ description: 'Section component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(10))
                            .meta({ description: 'Text component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(11))
                            .meta({ description: 'Thumbnail component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(12))
                            .meta({ description: 'Media gallery component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(13))
                            .meta({ description: 'File component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(14))
                            .meta({ description: 'Separator component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(17))
                            .meta({ description: 'Container component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(18))
                            .meta({ description: 'Label component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(19))
                            .meta({ description: 'File upload component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(21))
                            .meta({ description: 'Radio group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(22))
                            .meta({ description: 'Checkbox group component' }),
                          z.coerce
                            .number()
                            .pipe(z.literal(23))
                            .meta({ description: 'Checkbox component' }),
                        ]),
                        id: z
                          .preprocess(
                            (val) => (val === 'null' ? null : val),
                            z.coerce.number().pipe(z.int32().min(0)).nullable(),
                          )
                          .exactOptional(),
                        content: z.string().min(1).max(4000),
                      }),
                    ]),
                  )
                  .max(40),
              )
              .nullable(),
          )
          .exactOptional(),
        attachments: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z
                  .array(
                    z.object({
                      id: SnowflakeTypeSchema,
                      filename: z.string().min(1).max(1024).nullable().exactOptional(),
                      description: z.string().max(1024).nullable().exactOptional(),
                      duration_secs: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.coerce.number().min(0).max(2147483647).nullable(),
                        )
                        .exactOptional(),
                      waveform: z.string().max(400).nullable().exactOptional(),
                      title: z.string().max(1024).nullable().exactOptional(),
                      is_spoiler: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.stringbool().nullable(),
                        )
                        .exactOptional(),
                    }),
                  )
                  .max(10),
              )
              .nullable(),
          )
          .exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(MessageResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
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
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
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
          content: { 'application/json': { schema: resolver(z.array(UserResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
    ),
    validator(
      'query',
      z.object({
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        type: z
          .union([
            z.coerce.number().pipe(z.literal(0)).meta({ description: 'Normal reaction type' }),
            z.coerce.number().pipe(z.literal(1)).meta({ description: 'Burst reaction type' }),
          ])
          .exactOptional(),
      }),
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
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
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
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
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
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
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
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
        user_id: SnowflakeTypeSchema,
      }),
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
          content: { 'application/json': { schema: resolver(ThreadResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
    ),
    validator('json', CreateTextThreadWithMessageRequestSchema),
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
          content: { 'application/json': { schema: resolver(PermissionsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator('query', z.object({ implicit: z.stringbool().exactOptional() })),
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
          content: { 'application/json': { schema: resolver(PermissionsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema })),
    validator('query', z.object({ implicit: z.stringbool().exactOptional() })),
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
      z.object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }),
    ),
    validator(
      'json',
      z.object({
        type: z.xor([z.null().nullable(), ChannelPermissionOverwritesSchema]).exactOptional(),
        allow: z.int().nullable().exactOptional(),
        deny: z.int().nullable().exactOptional(),
      }),
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
      z.object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }),
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
            'application/json': { schema: resolver(z.array(MessageResponseSchema).nullable()) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
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
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
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
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
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
          content: { 'application/json': { schema: resolver(PollAnswerDetailsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        answer_id: z.coerce.number().pipe(z.int32().min(1).max(10)),
      }),
    ),
    validator(
      'query',
      z.object({
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(MessageResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
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
                z.xor([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]),
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
    validator('param', z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.object({
        access_token: z.string().max(152133).nullable().exactOptional(),
        nick: z.string().max(152133).nullable().exactOptional(),
      }),
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
    validator('param', z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator('json', SoundboardSoundSendRequestSchema),
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
            'application/json': { schema: resolver(z.array(ThreadMemberResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        with_member: z.stringbool().exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
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
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
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
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(ThreadMemberResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator('query', z.object({ with_member: z.stringbool().exactOptional() })),
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
    validator('param', z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
    validator('param', z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(CreatedThreadResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.union([CreateForumThreadRequestSchema, CreateTextThreadWithoutMessageRequestSchema]),
    ),
    validator(
      'form',
      z.union([
        z.object({
          name: z.string().min(1).max(100),
          auto_archive_duration: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  z.union([
                    z.coerce.number().pipe(z.literal(60)).meta({ description: 'One hour' }),
                    z.coerce.number().pipe(z.literal(1440)).meta({ description: 'One day' }),
                    z.coerce.number().pipe(z.literal(4320)).meta({ description: 'Three days' }),
                    z.coerce.number().pipe(z.literal(10080)).meta({ description: 'Seven days' }),
                  ]),
                ])
                .nullable(),
            )
            .exactOptional(),
          rate_limit_per_user: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z.coerce.number().pipe(z.int32().min(0).max(21600)).nullable(),
            )
            .exactOptional(),
          applied_tags: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .preprocess(
                  (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                  z.array(SnowflakeTypeSchema).max(5),
                )
                .nullable(),
            )
            .exactOptional(),
          message: z.object({
            content: z.string().max(4000).nullable().exactOptional(),
            embeds: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .preprocess(
                    (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                    z
                      .array(
                        z.object({
                          type: z.string().max(152133).nullable().exactOptional(),
                          url: z.url().max(2048).nullable().exactOptional(),
                          title: z.string().max(256).nullable().exactOptional(),
                          color: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z.coerce.number().int().min(0).max(16777215).nullable(),
                            )
                            .exactOptional(),
                          timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
                          description: z.string().max(4096).nullable().exactOptional(),
                          author: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  RichEmbedAuthorSchema,
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                          image: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  z.object({
                                    url: z.url().max(2048).nullable().exactOptional(),
                                    width: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().nullable(),
                                      )
                                      .exactOptional(),
                                    height: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().nullable(),
                                      )
                                      .exactOptional(),
                                    placeholder: z.string().max(64).nullable().exactOptional(),
                                    placeholder_version: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().min(0).max(2147483647).nullable(),
                                      )
                                      .exactOptional(),
                                    is_animated: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.stringbool().nullable(),
                                      )
                                      .exactOptional(),
                                    description: z.string().max(4096).nullable().exactOptional(),
                                  }),
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                          thumbnail: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  z.object({
                                    url: z.url().max(2048).nullable().exactOptional(),
                                    width: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().nullable(),
                                      )
                                      .exactOptional(),
                                    height: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().nullable(),
                                      )
                                      .exactOptional(),
                                    placeholder: z.string().max(64).nullable().exactOptional(),
                                    placeholder_version: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().min(0).max(2147483647).nullable(),
                                      )
                                      .exactOptional(),
                                    is_animated: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.stringbool().nullable(),
                                      )
                                      .exactOptional(),
                                    description: z.string().max(4096).nullable().exactOptional(),
                                  }),
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                          footer: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  RichEmbedFooterSchema,
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                          fields: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .preprocess(
                                  (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                                  z
                                    .array(
                                      z.object({
                                        name: z.string().max(256),
                                        value: z.string().max(1024),
                                        inline: z
                                          .preprocess(
                                            (val) => (val === 'null' ? null : val),
                                            z.stringbool().nullable(),
                                          )
                                          .exactOptional(),
                                      }),
                                    )
                                    .max(25),
                                )
                                .nullable(),
                            )
                            .exactOptional(),
                          provider: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  RichEmbedProviderSchema,
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                          video: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  z.object({
                                    url: z.url().max(2048).nullable().exactOptional(),
                                    width: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().nullable(),
                                      )
                                      .exactOptional(),
                                    height: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().nullable(),
                                      )
                                      .exactOptional(),
                                    placeholder: z.string().max(64).nullable().exactOptional(),
                                    placeholder_version: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().int().min(0).max(2147483647).nullable(),
                                      )
                                      .exactOptional(),
                                    is_animated: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.stringbool().nullable(),
                                      )
                                      .exactOptional(),
                                    description: z.string().max(4096).nullable().exactOptional(),
                                  }),
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                          audio: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  RichEmbedAudioSchema,
                                ])
                                .nullable(),
                            )
                            .exactOptional(),
                        }),
                      )
                      .max(10),
                  )
                  .nullable(),
              )
              .exactOptional(),
            allowed_mentions: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .union([
                    z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                    z.object({
                      parse: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    z.union([
                                      z
                                        .literal('users')
                                        .meta({ description: 'Controls role mentions' }),
                                      z
                                        .literal('roles')
                                        .meta({ description: 'Controls user mentions' }),
                                      z
                                        .literal('everyone')
                                        .meta({
                                          description: 'Controls @everyone and @here mentions',
                                        }),
                                    ]),
                                  ]),
                                )
                                .max(1521)
                                .refine((val) => new Set(val).size === val.length),
                            )
                            .nullable(),
                        )
                        .exactOptional(),
                      users: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .union([
                                        z.preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.null().nullable(),
                                        ),
                                        SnowflakeTypeSchema,
                                      ])
                                      .nullable(),
                                  ),
                                )
                                .max(100)
                                .refine((val) => new Set(val).size === val.length),
                            )
                            .nullable(),
                        )
                        .exactOptional(),
                      roles: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .union([
                                        z.preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.null().nullable(),
                                        ),
                                        SnowflakeTypeSchema,
                                      ])
                                      .nullable(),
                                  ),
                                )
                                .max(100)
                                .refine((val) => new Set(val).size === val.length),
                            )
                            .nullable(),
                        )
                        .exactOptional(),
                      replied_user: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.stringbool().nullable(),
                        )
                        .exactOptional(),
                    }),
                  ])
                  .nullable(),
              )
              .exactOptional(),
            sticker_ids: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .preprocess(
                    (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                    z.array(SnowflakeTypeSchema).max(3),
                  )
                  .nullable(),
              )
              .exactOptional(),
            components: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .preprocess(
                    (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                    z
                      .array(
                        z.union([
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            components: z.preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.union([
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z
                                        .string()
                                        .min(1)
                                        .max(100)
                                        .nullable()
                                        .exactOptional(),
                                      style: z.union([
                                        z.coerce.number().pipe(z.literal(1)),
                                        z.coerce.number().pipe(z.literal(2)),
                                        z.coerce.number().pipe(z.literal(3)),
                                        z.coerce.number().pipe(z.literal(4)),
                                        z.coerce.number().pipe(z.literal(5)),
                                        z.coerce.number().pipe(z.literal(6)),
                                      ]),
                                      label: z.string().max(80).nullable().exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      url: z.url().max(512).nullable().exactOptional(),
                                      sku_id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              SnowflakeTypeSchema,
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      emoji: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              z.object({
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .union([
                                                        z.preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z.null().nullable(),
                                                        ),
                                                        SnowflakeTypeSchema,
                                                      ])
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                name: z.string().max(32),
                                              }),
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z.string().min(1).max(100),
                                      placeholder: z.string().max(150).nullable().exactOptional(),
                                      min_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(0).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      max_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(1).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      required: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      default_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.object({
                                                    type: z.union([
                                                      z.literal('user'),
                                                      z.literal('role'),
                                                      z.literal('channel'),
                                                    ]),
                                                    id: SnowflakeTypeSchema,
                                                  }),
                                                )
                                                .max(25),
                                            )
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      channel_types: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.union([
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(1))
                                                      .meta({
                                                        description:
                                                          'A direct message between users',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(3))
                                                      .meta({
                                                        description:
                                                          'A direct message between multiple users',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(0))
                                                      .meta({
                                                        description:
                                                          'A text channel within a server',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(2))
                                                      .meta({
                                                        description:
                                                          'A voice channel within a server',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(4))
                                                      .meta({
                                                        description:
                                                          'An organizational category that contains up to 50 channels',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(5))
                                                      .meta({
                                                        description:
                                                          'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(10))
                                                      .meta({
                                                        description:
                                                          'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(11))
                                                      .meta({
                                                        description:
                                                          'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(12))
                                                      .meta({
                                                        description:
                                                          'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(13))
                                                      .meta({
                                                        description:
                                                          'A voice channel for hosting events with an audience',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(14))
                                                      .meta({
                                                        description:
                                                          'The channel in a hub containing the listed servers',
                                                      }),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.literal(15))
                                                      .meta({
                                                        description:
                                                          'Channel that can only contain threads',
                                                      }),
                                                  ]),
                                                )
                                                .refine((val) => new Set(val).size === val.length),
                                            )
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z.string().min(1).max(100),
                                      placeholder: z.string().max(150).nullable().exactOptional(),
                                      min_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(0).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      max_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(1).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      required: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      default_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.union([
                                                    z.object({
                                                      type: z.union([
                                                        z.literal('user'),
                                                        z.literal('role'),
                                                        z.literal('channel'),
                                                      ]),
                                                      id: SnowflakeTypeSchema,
                                                    }),
                                                    z.object({
                                                      type: z.union([
                                                        z.literal('user'),
                                                        z.literal('role'),
                                                        z.literal('channel'),
                                                      ]),
                                                      id: SnowflakeTypeSchema,
                                                    }),
                                                  ]),
                                                )
                                                .max(25),
                                            )
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z.string().min(1).max(100),
                                      placeholder: z.string().max(150).nullable().exactOptional(),
                                      min_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(0).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      max_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(1).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      required: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      default_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.object({
                                                    type: z.union([
                                                      z.literal('user'),
                                                      z.literal('role'),
                                                      z.literal('channel'),
                                                    ]),
                                                    id: SnowflakeTypeSchema,
                                                  }),
                                                )
                                                .max(25),
                                            )
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z.string().min(1).max(100),
                                      placeholder: z.string().max(150).nullable().exactOptional(),
                                      min_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(0).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      max_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(1).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      required: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      options: z.preprocess(
                                        (val) =>
                                          val === undefined || Array.isArray(val) ? val : [val],
                                        z
                                          .array(
                                            z.object({
                                              label: z.string().min(1).max(100),
                                              value: z.string().min(1).max(100),
                                              description: z
                                                .string()
                                                .max(100)
                                                .nullable()
                                                .exactOptional(),
                                              default: z
                                                .preprocess(
                                                  (val) => (val === 'null' ? null : val),
                                                  z.stringbool().nullable(),
                                                )
                                                .exactOptional(),
                                              emoji: z
                                                .preprocess(
                                                  (val) => (val === 'null' ? null : val),
                                                  z
                                                    .union([
                                                      z.preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z.null().nullable(),
                                                      ),
                                                      z.object({
                                                        id: z
                                                          .preprocess(
                                                            (val) => (val === 'null' ? null : val),
                                                            z
                                                              .union([
                                                                z.preprocess(
                                                                  (val) =>
                                                                    val === 'null' ? null : val,
                                                                  z.null().nullable(),
                                                                ),
                                                                SnowflakeTypeSchema,
                                                              ])
                                                              .nullable(),
                                                          )
                                                          .exactOptional(),
                                                        name: z.string().max(32),
                                                      }),
                                                    ])
                                                    .nullable(),
                                                )
                                                .exactOptional(),
                                            }),
                                          )
                                          .min(1)
                                          .max(25),
                                      ),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      custom_id: z.string().min(1).max(100),
                                      placeholder: z.string().max(150).nullable().exactOptional(),
                                      min_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(0).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      max_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().int().min(1).max(25).nullable(),
                                        )
                                        .exactOptional(),
                                      disabled: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      required: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      default_values: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .preprocess(
                                              (val) =>
                                                val === undefined || Array.isArray(val)
                                                  ? val
                                                  : [val],
                                              z
                                                .array(
                                                  z.object({
                                                    type: z.union([
                                                      z.literal('user'),
                                                      z.literal('role'),
                                                      z.literal('channel'),
                                                    ]),
                                                    id: SnowflakeTypeSchema,
                                                  }),
                                                )
                                                .max(25),
                                            )
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                  ]),
                                )
                                .min(1)
                                .max(5),
                            ),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            accent_color: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().int().min(0).max(16777215).nullable(),
                              )
                              .exactOptional(),
                            components: z.preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.union([
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      components: z.preprocess(
                                        (val) =>
                                          val === undefined || Array.isArray(val) ? val : [val],
                                        z
                                          .array(
                                            z.union([
                                              z.object({
                                                type: z.union([
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(1))
                                                    .meta({
                                                      description: 'Container for other components',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(2))
                                                    .meta({ description: 'Button object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(3))
                                                    .meta({
                                                      description:
                                                        'Select menu for picking from defined text options',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(4))
                                                    .meta({ description: 'Text input object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(5))
                                                    .meta({ description: 'Select menu for users' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(6))
                                                    .meta({ description: 'Select menu for roles' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(7))
                                                    .meta({
                                                      description:
                                                        'Select menu for mentionables (users and roles)',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(8))
                                                    .meta({
                                                      description: 'Select menu for channels',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(9))
                                                    .meta({ description: 'Section component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(10))
                                                    .meta({ description: 'Text component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(11))
                                                    .meta({ description: 'Thumbnail component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(12))
                                                    .meta({
                                                      description: 'Media gallery component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(13))
                                                    .meta({ description: 'File component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(14))
                                                    .meta({ description: 'Separator component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(17))
                                                    .meta({ description: 'Container component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(18))
                                                    .meta({ description: 'Label component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(19))
                                                    .meta({ description: 'File upload component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(21))
                                                    .meta({ description: 'Radio group component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(22))
                                                    .meta({
                                                      description: 'Checkbox group component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(23))
                                                    .meta({ description: 'Checkbox component' }),
                                                ]),
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.int32().min(0))
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                custom_id: z
                                                  .string()
                                                  .min(1)
                                                  .max(100)
                                                  .nullable()
                                                  .exactOptional(),
                                                style: z.union([
                                                  z.coerce.number().pipe(z.literal(1)),
                                                  z.coerce.number().pipe(z.literal(2)),
                                                  z.coerce.number().pipe(z.literal(3)),
                                                  z.coerce.number().pipe(z.literal(4)),
                                                  z.coerce.number().pipe(z.literal(5)),
                                                  z.coerce.number().pipe(z.literal(6)),
                                                ]),
                                                label: z
                                                  .string()
                                                  .max(80)
                                                  .nullable()
                                                  .exactOptional(),
                                                disabled: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                url: z.url().max(512).nullable().exactOptional(),
                                                sku_id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .union([
                                                        z.preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z.null().nullable(),
                                                        ),
                                                        SnowflakeTypeSchema,
                                                      ])
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                emoji: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .union([
                                                        z.preprocess(
                                                          (val) => (val === 'null' ? null : val),
                                                          z.null().nullable(),
                                                        ),
                                                        z.object({
                                                          id: z
                                                            .preprocess(
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z
                                                                .union([
                                                                  z.preprocess(
                                                                    (val) =>
                                                                      val === 'null' ? null : val,
                                                                    z.null().nullable(),
                                                                  ),
                                                                  SnowflakeTypeSchema,
                                                                ])
                                                                .nullable(),
                                                            )
                                                            .exactOptional(),
                                                          name: z.string().max(32),
                                                        }),
                                                      ])
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                              }),
                                              z.object({
                                                type: z.union([
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(1))
                                                    .meta({
                                                      description: 'Container for other components',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(2))
                                                    .meta({ description: 'Button object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(3))
                                                    .meta({
                                                      description:
                                                        'Select menu for picking from defined text options',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(4))
                                                    .meta({ description: 'Text input object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(5))
                                                    .meta({ description: 'Select menu for users' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(6))
                                                    .meta({ description: 'Select menu for roles' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(7))
                                                    .meta({
                                                      description:
                                                        'Select menu for mentionables (users and roles)',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(8))
                                                    .meta({
                                                      description: 'Select menu for channels',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(9))
                                                    .meta({ description: 'Section component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(10))
                                                    .meta({ description: 'Text component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(11))
                                                    .meta({ description: 'Thumbnail component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(12))
                                                    .meta({
                                                      description: 'Media gallery component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(13))
                                                    .meta({ description: 'File component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(14))
                                                    .meta({ description: 'Separator component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(17))
                                                    .meta({ description: 'Container component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(18))
                                                    .meta({ description: 'Label component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(19))
                                                    .meta({ description: 'File upload component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(21))
                                                    .meta({ description: 'Radio group component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(22))
                                                    .meta({
                                                      description: 'Checkbox group component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(23))
                                                    .meta({ description: 'Checkbox component' }),
                                                ]),
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.int32().min(0))
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                custom_id: z.string().min(1).max(100),
                                                placeholder: z
                                                  .string()
                                                  .max(150)
                                                  .nullable()
                                                  .exactOptional(),
                                                min_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(0)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                max_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(1)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                disabled: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                required: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                default_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .preprocess(
                                                        (val) =>
                                                          val === undefined || Array.isArray(val)
                                                            ? val
                                                            : [val],
                                                        z
                                                          .array(
                                                            z.object({
                                                              type: z.union([
                                                                z.literal('user'),
                                                                z.literal('role'),
                                                                z.literal('channel'),
                                                              ]),
                                                              id: SnowflakeTypeSchema,
                                                            }),
                                                          )
                                                          .max(25),
                                                      )
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                channel_types: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .preprocess(
                                                        (val) =>
                                                          val === undefined || Array.isArray(val)
                                                            ? val
                                                            : [val],
                                                        z
                                                          .array(
                                                            z.union([
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(1))
                                                                .meta({
                                                                  description:
                                                                    'A direct message between users',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(3))
                                                                .meta({
                                                                  description:
                                                                    'A direct message between multiple users',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(0))
                                                                .meta({
                                                                  description:
                                                                    'A text channel within a server',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(2))
                                                                .meta({
                                                                  description:
                                                                    'A voice channel within a server',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(4))
                                                                .meta({
                                                                  description:
                                                                    'An organizational category that contains up to 50 channels',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(5))
                                                                .meta({
                                                                  description:
                                                                    'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(10))
                                                                .meta({
                                                                  description:
                                                                    'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(11))
                                                                .meta({
                                                                  description:
                                                                    'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(12))
                                                                .meta({
                                                                  description:
                                                                    'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(13))
                                                                .meta({
                                                                  description:
                                                                    'A voice channel for hosting events with an audience',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(14))
                                                                .meta({
                                                                  description:
                                                                    'The channel in a hub containing the listed servers',
                                                                }),
                                                              z.coerce
                                                                .number()
                                                                .pipe(z.literal(15))
                                                                .meta({
                                                                  description:
                                                                    'Channel that can only contain threads',
                                                                }),
                                                            ]),
                                                          )
                                                          .refine(
                                                            (val) =>
                                                              new Set(val).size === val.length,
                                                          ),
                                                      )
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                              }),
                                              z.object({
                                                type: z.union([
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(1))
                                                    .meta({
                                                      description: 'Container for other components',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(2))
                                                    .meta({ description: 'Button object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(3))
                                                    .meta({
                                                      description:
                                                        'Select menu for picking from defined text options',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(4))
                                                    .meta({ description: 'Text input object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(5))
                                                    .meta({ description: 'Select menu for users' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(6))
                                                    .meta({ description: 'Select menu for roles' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(7))
                                                    .meta({
                                                      description:
                                                        'Select menu for mentionables (users and roles)',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(8))
                                                    .meta({
                                                      description: 'Select menu for channels',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(9))
                                                    .meta({ description: 'Section component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(10))
                                                    .meta({ description: 'Text component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(11))
                                                    .meta({ description: 'Thumbnail component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(12))
                                                    .meta({
                                                      description: 'Media gallery component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(13))
                                                    .meta({ description: 'File component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(14))
                                                    .meta({ description: 'Separator component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(17))
                                                    .meta({ description: 'Container component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(18))
                                                    .meta({ description: 'Label component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(19))
                                                    .meta({ description: 'File upload component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(21))
                                                    .meta({ description: 'Radio group component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(22))
                                                    .meta({
                                                      description: 'Checkbox group component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(23))
                                                    .meta({ description: 'Checkbox component' }),
                                                ]),
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.int32().min(0))
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                custom_id: z.string().min(1).max(100),
                                                placeholder: z
                                                  .string()
                                                  .max(150)
                                                  .nullable()
                                                  .exactOptional(),
                                                min_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(0)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                max_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(1)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                disabled: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                required: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                default_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .preprocess(
                                                        (val) =>
                                                          val === undefined || Array.isArray(val)
                                                            ? val
                                                            : [val],
                                                        z
                                                          .array(
                                                            z.union([
                                                              z.object({
                                                                type: z.union([
                                                                  z.literal('user'),
                                                                  z.literal('role'),
                                                                  z.literal('channel'),
                                                                ]),
                                                                id: SnowflakeTypeSchema,
                                                              }),
                                                              z.object({
                                                                type: z.union([
                                                                  z.literal('user'),
                                                                  z.literal('role'),
                                                                  z.literal('channel'),
                                                                ]),
                                                                id: SnowflakeTypeSchema,
                                                              }),
                                                            ]),
                                                          )
                                                          .max(25),
                                                      )
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                              }),
                                              z.object({
                                                type: z.union([
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(1))
                                                    .meta({
                                                      description: 'Container for other components',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(2))
                                                    .meta({ description: 'Button object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(3))
                                                    .meta({
                                                      description:
                                                        'Select menu for picking from defined text options',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(4))
                                                    .meta({ description: 'Text input object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(5))
                                                    .meta({ description: 'Select menu for users' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(6))
                                                    .meta({ description: 'Select menu for roles' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(7))
                                                    .meta({
                                                      description:
                                                        'Select menu for mentionables (users and roles)',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(8))
                                                    .meta({
                                                      description: 'Select menu for channels',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(9))
                                                    .meta({ description: 'Section component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(10))
                                                    .meta({ description: 'Text component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(11))
                                                    .meta({ description: 'Thumbnail component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(12))
                                                    .meta({
                                                      description: 'Media gallery component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(13))
                                                    .meta({ description: 'File component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(14))
                                                    .meta({ description: 'Separator component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(17))
                                                    .meta({ description: 'Container component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(18))
                                                    .meta({ description: 'Label component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(19))
                                                    .meta({ description: 'File upload component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(21))
                                                    .meta({ description: 'Radio group component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(22))
                                                    .meta({
                                                      description: 'Checkbox group component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(23))
                                                    .meta({ description: 'Checkbox component' }),
                                                ]),
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.int32().min(0))
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                custom_id: z.string().min(1).max(100),
                                                placeholder: z
                                                  .string()
                                                  .max(150)
                                                  .nullable()
                                                  .exactOptional(),
                                                min_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(0)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                max_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(1)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                disabled: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                required: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                default_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .preprocess(
                                                        (val) =>
                                                          val === undefined || Array.isArray(val)
                                                            ? val
                                                            : [val],
                                                        z
                                                          .array(
                                                            z.object({
                                                              type: z.union([
                                                                z.literal('user'),
                                                                z.literal('role'),
                                                                z.literal('channel'),
                                                              ]),
                                                              id: SnowflakeTypeSchema,
                                                            }),
                                                          )
                                                          .max(25),
                                                      )
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                              }),
                                              z.object({
                                                type: z.union([
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(1))
                                                    .meta({
                                                      description: 'Container for other components',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(2))
                                                    .meta({ description: 'Button object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(3))
                                                    .meta({
                                                      description:
                                                        'Select menu for picking from defined text options',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(4))
                                                    .meta({ description: 'Text input object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(5))
                                                    .meta({ description: 'Select menu for users' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(6))
                                                    .meta({ description: 'Select menu for roles' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(7))
                                                    .meta({
                                                      description:
                                                        'Select menu for mentionables (users and roles)',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(8))
                                                    .meta({
                                                      description: 'Select menu for channels',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(9))
                                                    .meta({ description: 'Section component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(10))
                                                    .meta({ description: 'Text component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(11))
                                                    .meta({ description: 'Thumbnail component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(12))
                                                    .meta({
                                                      description: 'Media gallery component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(13))
                                                    .meta({ description: 'File component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(14))
                                                    .meta({ description: 'Separator component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(17))
                                                    .meta({ description: 'Container component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(18))
                                                    .meta({ description: 'Label component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(19))
                                                    .meta({ description: 'File upload component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(21))
                                                    .meta({ description: 'Radio group component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(22))
                                                    .meta({
                                                      description: 'Checkbox group component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(23))
                                                    .meta({ description: 'Checkbox component' }),
                                                ]),
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.int32().min(0))
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                custom_id: z.string().min(1).max(100),
                                                placeholder: z
                                                  .string()
                                                  .max(150)
                                                  .nullable()
                                                  .exactOptional(),
                                                min_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(0)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                max_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(1)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                disabled: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                required: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                options: z.preprocess(
                                                  (val) =>
                                                    val === undefined || Array.isArray(val)
                                                      ? val
                                                      : [val],
                                                  z
                                                    .array(
                                                      z.object({
                                                        label: z.string().min(1).max(100),
                                                        value: z.string().min(1).max(100),
                                                        description: z
                                                          .string()
                                                          .max(100)
                                                          .nullable()
                                                          .exactOptional(),
                                                        default: z
                                                          .preprocess(
                                                            (val) => (val === 'null' ? null : val),
                                                            z.stringbool().nullable(),
                                                          )
                                                          .exactOptional(),
                                                        emoji: z
                                                          .preprocess(
                                                            (val) => (val === 'null' ? null : val),
                                                            z
                                                              .union([
                                                                z.preprocess(
                                                                  (val) =>
                                                                    val === 'null' ? null : val,
                                                                  z.null().nullable(),
                                                                ),
                                                                z.object({
                                                                  id: z
                                                                    .preprocess(
                                                                      (val) =>
                                                                        val === 'null' ? null : val,
                                                                      z
                                                                        .union([
                                                                          z.preprocess(
                                                                            (val) =>
                                                                              val === 'null'
                                                                                ? null
                                                                                : val,
                                                                            z.null().nullable(),
                                                                          ),
                                                                          SnowflakeTypeSchema,
                                                                        ])
                                                                        .nullable(),
                                                                    )
                                                                    .exactOptional(),
                                                                  name: z.string().max(32),
                                                                }),
                                                              ])
                                                              .nullable(),
                                                          )
                                                          .exactOptional(),
                                                      }),
                                                    )
                                                    .min(1)
                                                    .max(25),
                                                ),
                                              }),
                                              z.object({
                                                type: z.union([
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(1))
                                                    .meta({
                                                      description: 'Container for other components',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(2))
                                                    .meta({ description: 'Button object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(3))
                                                    .meta({
                                                      description:
                                                        'Select menu for picking from defined text options',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(4))
                                                    .meta({ description: 'Text input object' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(5))
                                                    .meta({ description: 'Select menu for users' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(6))
                                                    .meta({ description: 'Select menu for roles' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(7))
                                                    .meta({
                                                      description:
                                                        'Select menu for mentionables (users and roles)',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(8))
                                                    .meta({
                                                      description: 'Select menu for channels',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(9))
                                                    .meta({ description: 'Section component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(10))
                                                    .meta({ description: 'Text component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(11))
                                                    .meta({ description: 'Thumbnail component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(12))
                                                    .meta({
                                                      description: 'Media gallery component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(13))
                                                    .meta({ description: 'File component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(14))
                                                    .meta({ description: 'Separator component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(17))
                                                    .meta({ description: 'Container component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(18))
                                                    .meta({ description: 'Label component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(19))
                                                    .meta({ description: 'File upload component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(21))
                                                    .meta({ description: 'Radio group component' }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(22))
                                                    .meta({
                                                      description: 'Checkbox group component',
                                                    }),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.literal(23))
                                                    .meta({ description: 'Checkbox component' }),
                                                ]),
                                                id: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .pipe(z.int32().min(0))
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                custom_id: z.string().min(1).max(100),
                                                placeholder: z
                                                  .string()
                                                  .max(150)
                                                  .nullable()
                                                  .exactOptional(),
                                                min_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(0)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                max_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.coerce
                                                      .number()
                                                      .int()
                                                      .min(1)
                                                      .max(25)
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                                disabled: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                required: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.stringbool().nullable(),
                                                  )
                                                  .exactOptional(),
                                                default_values: z
                                                  .preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z
                                                      .preprocess(
                                                        (val) =>
                                                          val === undefined || Array.isArray(val)
                                                            ? val
                                                            : [val],
                                                        z
                                                          .array(
                                                            z.object({
                                                              type: z.union([
                                                                z.literal('user'),
                                                                z.literal('role'),
                                                                z.literal('channel'),
                                                              ]),
                                                              id: SnowflakeTypeSchema,
                                                            }),
                                                          )
                                                          .max(25),
                                                      )
                                                      .nullable(),
                                                  )
                                                  .exactOptional(),
                                              }),
                                            ]),
                                          )
                                          .min(1)
                                          .max(5),
                                      ),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      spoiler: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                      file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      items: z.preprocess(
                                        (val) =>
                                          val === undefined || Array.isArray(val) ? val : [val],
                                        z
                                          .array(
                                            z.object({
                                              description: z
                                                .string()
                                                .min(1)
                                                .max(1024)
                                                .nullable()
                                                .exactOptional(),
                                              spoiler: z
                                                .preprocess(
                                                  (val) => (val === 'null' ? null : val),
                                                  z.stringbool().nullable(),
                                                )
                                                .exactOptional(),
                                              media: UnfurledMediaRequestSchema,
                                            }),
                                          )
                                          .min(1)
                                          .max(10),
                                      ),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      components: z.preprocess(
                                        (val) =>
                                          val === undefined || Array.isArray(val) ? val : [val],
                                        z
                                          .array(
                                            z.object({
                                              type: z.union([
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(1))
                                                  .meta({
                                                    description: 'Container for other components',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(2))
                                                  .meta({ description: 'Button object' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(3))
                                                  .meta({
                                                    description:
                                                      'Select menu for picking from defined text options',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(4))
                                                  .meta({ description: 'Text input object' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(5))
                                                  .meta({ description: 'Select menu for users' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(6))
                                                  .meta({ description: 'Select menu for roles' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(7))
                                                  .meta({
                                                    description:
                                                      'Select menu for mentionables (users and roles)',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(8))
                                                  .meta({
                                                    description: 'Select menu for channels',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(9))
                                                  .meta({ description: 'Section component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(10))
                                                  .meta({ description: 'Text component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(11))
                                                  .meta({ description: 'Thumbnail component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(12))
                                                  .meta({ description: 'Media gallery component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(13))
                                                  .meta({ description: 'File component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(14))
                                                  .meta({ description: 'Separator component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(17))
                                                  .meta({ description: 'Container component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(18))
                                                  .meta({ description: 'Label component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(19))
                                                  .meta({ description: 'File upload component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(21))
                                                  .meta({ description: 'Radio group component' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(22))
                                                  .meta({
                                                    description: 'Checkbox group component',
                                                  }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(23))
                                                  .meta({ description: 'Checkbox component' }),
                                              ]),
                                              id: z
                                                .preprocess(
                                                  (val) => (val === 'null' ? null : val),
                                                  z.coerce
                                                    .number()
                                                    .pipe(z.int32().min(0))
                                                    .nullable(),
                                                )
                                                .exactOptional(),
                                              content: z.string().min(1).max(4000),
                                            }),
                                          )
                                          .min(1)
                                          .max(3),
                                      ),
                                      accessory: z.union([
                                        z.object({
                                          type: z.union([
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(1))
                                              .meta({
                                                description: 'Container for other components',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(2))
                                              .meta({ description: 'Button object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(3))
                                              .meta({
                                                description:
                                                  'Select menu for picking from defined text options',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(4))
                                              .meta({ description: 'Text input object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(5))
                                              .meta({ description: 'Select menu for users' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(6))
                                              .meta({ description: 'Select menu for roles' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(7))
                                              .meta({
                                                description:
                                                  'Select menu for mentionables (users and roles)',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(8))
                                              .meta({ description: 'Select menu for channels' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(9))
                                              .meta({ description: 'Section component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(10))
                                              .meta({ description: 'Text component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(11))
                                              .meta({ description: 'Thumbnail component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(12))
                                              .meta({ description: 'Media gallery component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(13))
                                              .meta({ description: 'File component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(14))
                                              .meta({ description: 'Separator component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(17))
                                              .meta({ description: 'Container component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(18))
                                              .meta({ description: 'Label component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(19))
                                              .meta({ description: 'File upload component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(21))
                                              .meta({ description: 'Radio group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(22))
                                              .meta({ description: 'Checkbox group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(23))
                                              .meta({ description: 'Checkbox component' }),
                                          ]),
                                          id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                            )
                                            .exactOptional(),
                                          custom_id: z
                                            .string()
                                            .min(1)
                                            .max(100)
                                            .nullable()
                                            .exactOptional(),
                                          style: z.union([
                                            z.coerce.number().pipe(z.literal(1)),
                                            z.coerce.number().pipe(z.literal(2)),
                                            z.coerce.number().pipe(z.literal(3)),
                                            z.coerce.number().pipe(z.literal(4)),
                                            z.coerce.number().pipe(z.literal(5)),
                                            z.coerce.number().pipe(z.literal(6)),
                                          ]),
                                          label: z.string().max(80).nullable().exactOptional(),
                                          disabled: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          url: z.url().max(512).nullable().exactOptional(),
                                          sku_id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .union([
                                                  z.preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.null().nullable(),
                                                  ),
                                                  SnowflakeTypeSchema,
                                                ])
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                          emoji: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .union([
                                                  z.preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.null().nullable(),
                                                  ),
                                                  z.object({
                                                    id: z
                                                      .preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z
                                                          .union([
                                                            z.preprocess(
                                                              (val) =>
                                                                val === 'null' ? null : val,
                                                              z.null().nullable(),
                                                            ),
                                                            SnowflakeTypeSchema,
                                                          ])
                                                          .nullable(),
                                                      )
                                                      .exactOptional(),
                                                    name: z.string().max(32),
                                                  }),
                                                ])
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                        }),
                                        z.object({
                                          type: z.union([
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(1))
                                              .meta({
                                                description: 'Container for other components',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(2))
                                              .meta({ description: 'Button object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(3))
                                              .meta({
                                                description:
                                                  'Select menu for picking from defined text options',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(4))
                                              .meta({ description: 'Text input object' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(5))
                                              .meta({ description: 'Select menu for users' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(6))
                                              .meta({ description: 'Select menu for roles' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(7))
                                              .meta({
                                                description:
                                                  'Select menu for mentionables (users and roles)',
                                              }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(8))
                                              .meta({ description: 'Select menu for channels' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(9))
                                              .meta({ description: 'Section component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(10))
                                              .meta({ description: 'Text component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(11))
                                              .meta({ description: 'Thumbnail component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(12))
                                              .meta({ description: 'Media gallery component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(13))
                                              .meta({ description: 'File component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(14))
                                              .meta({ description: 'Separator component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(17))
                                              .meta({ description: 'Container component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(18))
                                              .meta({ description: 'Label component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(19))
                                              .meta({ description: 'File upload component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(21))
                                              .meta({ description: 'Radio group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(22))
                                              .meta({ description: 'Checkbox group component' }),
                                            z.coerce
                                              .number()
                                              .pipe(z.literal(23))
                                              .meta({ description: 'Checkbox component' }),
                                          ]),
                                          id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                            )
                                            .exactOptional(),
                                          description: z
                                            .string()
                                            .min(1)
                                            .max(1024)
                                            .nullable()
                                            .exactOptional(),
                                          spoiler: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.stringbool().nullable(),
                                            )
                                            .exactOptional(),
                                          media: UnfurledMediaRequestSchema,
                                        }),
                                      ]),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      spacing: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z
                                            .union([
                                              z.preprocess(
                                                (val) => (val === 'null' ? null : val),
                                                z.null().nullable(),
                                              ),
                                              z.union([
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(1))
                                                  .meta({ description: 'Small spacing' }),
                                                z.coerce
                                                  .number()
                                                  .pipe(z.literal(2))
                                                  .meta({ description: 'Large spacing' }),
                                              ]),
                                            ])
                                            .nullable(),
                                        )
                                        .exactOptional(),
                                      divider: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.stringbool().nullable(),
                                        )
                                        .exactOptional(),
                                    }),
                                    z.object({
                                      type: z.union([
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(1))
                                          .meta({ description: 'Container for other components' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(2))
                                          .meta({ description: 'Button object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(3))
                                          .meta({
                                            description:
                                              'Select menu for picking from defined text options',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(4))
                                          .meta({ description: 'Text input object' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(5))
                                          .meta({ description: 'Select menu for users' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(6))
                                          .meta({ description: 'Select menu for roles' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(7))
                                          .meta({
                                            description:
                                              'Select menu for mentionables (users and roles)',
                                          }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(8))
                                          .meta({ description: 'Select menu for channels' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(9))
                                          .meta({ description: 'Section component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(10))
                                          .meta({ description: 'Text component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(11))
                                          .meta({ description: 'Thumbnail component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(12))
                                          .meta({ description: 'Media gallery component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(13))
                                          .meta({ description: 'File component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(14))
                                          .meta({ description: 'Separator component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(17))
                                          .meta({ description: 'Container component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(18))
                                          .meta({ description: 'Label component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(19))
                                          .meta({ description: 'File upload component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(21))
                                          .meta({ description: 'Radio group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(22))
                                          .meta({ description: 'Checkbox group component' }),
                                        z.coerce
                                          .number()
                                          .pipe(z.literal(23))
                                          .meta({ description: 'Checkbox component' }),
                                      ]),
                                      id: z
                                        .preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                        )
                                        .exactOptional(),
                                      content: z.string().min(1).max(4000),
                                    }),
                                  ]),
                                )
                                .min(1)
                                .max(40),
                            ),
                            spoiler: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            spoiler: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                            file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            items: z.preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.object({
                                    description: z
                                      .string()
                                      .min(1)
                                      .max(1024)
                                      .nullable()
                                      .exactOptional(),
                                    spoiler: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.stringbool().nullable(),
                                      )
                                      .exactOptional(),
                                    media: UnfurledMediaRequestSchema,
                                  }),
                                )
                                .min(1)
                                .max(10),
                            ),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            components: z.preprocess(
                              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                              z
                                .array(
                                  z.object({
                                    type: z.union([
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(1))
                                        .meta({ description: 'Container for other components' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(2))
                                        .meta({ description: 'Button object' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(3))
                                        .meta({
                                          description:
                                            'Select menu for picking from defined text options',
                                        }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(4))
                                        .meta({ description: 'Text input object' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(5))
                                        .meta({ description: 'Select menu for users' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(6))
                                        .meta({ description: 'Select menu for roles' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(7))
                                        .meta({
                                          description:
                                            'Select menu for mentionables (users and roles)',
                                        }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(8))
                                        .meta({ description: 'Select menu for channels' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(9))
                                        .meta({ description: 'Section component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(10))
                                        .meta({ description: 'Text component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(11))
                                        .meta({ description: 'Thumbnail component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(12))
                                        .meta({ description: 'Media gallery component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(13))
                                        .meta({ description: 'File component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(14))
                                        .meta({ description: 'Separator component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(17))
                                        .meta({ description: 'Container component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(18))
                                        .meta({ description: 'Label component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(19))
                                        .meta({ description: 'File upload component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(21))
                                        .meta({ description: 'Radio group component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(22))
                                        .meta({ description: 'Checkbox group component' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(23))
                                        .meta({ description: 'Checkbox component' }),
                                    ]),
                                    id: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                      )
                                      .exactOptional(),
                                    content: z.string().min(1).max(4000),
                                  }),
                                )
                                .min(1)
                                .max(3),
                            ),
                            accessory: z.union([
                              z.object({
                                type: z.union([
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(1))
                                    .meta({ description: 'Container for other components' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(2))
                                    .meta({ description: 'Button object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(3))
                                    .meta({
                                      description:
                                        'Select menu for picking from defined text options',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(4))
                                    .meta({ description: 'Text input object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(5))
                                    .meta({ description: 'Select menu for users' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(6))
                                    .meta({ description: 'Select menu for roles' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(7))
                                    .meta({
                                      description: 'Select menu for mentionables (users and roles)',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(8))
                                    .meta({ description: 'Select menu for channels' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(9))
                                    .meta({ description: 'Section component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(10))
                                    .meta({ description: 'Text component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(11))
                                    .meta({ description: 'Thumbnail component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(12))
                                    .meta({ description: 'Media gallery component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(13))
                                    .meta({ description: 'File component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(14))
                                    .meta({ description: 'Separator component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(17))
                                    .meta({ description: 'Container component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(18))
                                    .meta({ description: 'Label component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(19))
                                    .meta({ description: 'File upload component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(21))
                                    .meta({ description: 'Radio group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(22))
                                    .meta({ description: 'Checkbox group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(23))
                                    .meta({ description: 'Checkbox component' }),
                                ]),
                                id: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                  )
                                  .exactOptional(),
                                custom_id: z.string().min(1).max(100).nullable().exactOptional(),
                                style: z.union([
                                  z.coerce.number().pipe(z.literal(1)),
                                  z.coerce.number().pipe(z.literal(2)),
                                  z.coerce.number().pipe(z.literal(3)),
                                  z.coerce.number().pipe(z.literal(4)),
                                  z.coerce.number().pipe(z.literal(5)),
                                  z.coerce.number().pipe(z.literal(6)),
                                ]),
                                label: z.string().max(80).nullable().exactOptional(),
                                disabled: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                url: z.url().max(512).nullable().exactOptional(),
                                sku_id: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .union([
                                        z.preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.null().nullable(),
                                        ),
                                        SnowflakeTypeSchema,
                                      ])
                                      .nullable(),
                                  )
                                  .exactOptional(),
                                emoji: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z
                                      .union([
                                        z.preprocess(
                                          (val) => (val === 'null' ? null : val),
                                          z.null().nullable(),
                                        ),
                                        z.object({
                                          id: z
                                            .preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z
                                                .union([
                                                  z.preprocess(
                                                    (val) => (val === 'null' ? null : val),
                                                    z.null().nullable(),
                                                  ),
                                                  SnowflakeTypeSchema,
                                                ])
                                                .nullable(),
                                            )
                                            .exactOptional(),
                                          name: z.string().max(32),
                                        }),
                                      ])
                                      .nullable(),
                                  )
                                  .exactOptional(),
                              }),
                              z.object({
                                type: z.union([
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(1))
                                    .meta({ description: 'Container for other components' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(2))
                                    .meta({ description: 'Button object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(3))
                                    .meta({
                                      description:
                                        'Select menu for picking from defined text options',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(4))
                                    .meta({ description: 'Text input object' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(5))
                                    .meta({ description: 'Select menu for users' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(6))
                                    .meta({ description: 'Select menu for roles' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(7))
                                    .meta({
                                      description: 'Select menu for mentionables (users and roles)',
                                    }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(8))
                                    .meta({ description: 'Select menu for channels' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(9))
                                    .meta({ description: 'Section component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(10))
                                    .meta({ description: 'Text component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(11))
                                    .meta({ description: 'Thumbnail component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(12))
                                    .meta({ description: 'Media gallery component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(13))
                                    .meta({ description: 'File component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(14))
                                    .meta({ description: 'Separator component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(17))
                                    .meta({ description: 'Container component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(18))
                                    .meta({ description: 'Label component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(19))
                                    .meta({ description: 'File upload component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(21))
                                    .meta({ description: 'Radio group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(22))
                                    .meta({ description: 'Checkbox group component' }),
                                  z.coerce
                                    .number()
                                    .pipe(z.literal(23))
                                    .meta({ description: 'Checkbox component' }),
                                ]),
                                id: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.coerce.number().pipe(z.int32().min(0)).nullable(),
                                  )
                                  .exactOptional(),
                                description: z.string().min(1).max(1024).nullable().exactOptional(),
                                spoiler: z
                                  .preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.stringbool().nullable(),
                                  )
                                  .exactOptional(),
                                media: UnfurledMediaRequestSchema,
                              }),
                            ]),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            spacing: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z
                                  .union([
                                    z.preprocess(
                                      (val) => (val === 'null' ? null : val),
                                      z.null().nullable(),
                                    ),
                                    z.union([
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(1))
                                        .meta({ description: 'Small spacing' }),
                                      z.coerce
                                        .number()
                                        .pipe(z.literal(2))
                                        .meta({ description: 'Large spacing' }),
                                    ]),
                                  ])
                                  .nullable(),
                              )
                              .exactOptional(),
                            divider: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.stringbool().nullable(),
                              )
                              .exactOptional(),
                          }),
                          z.object({
                            type: z.union([
                              z.coerce
                                .number()
                                .pipe(z.literal(1))
                                .meta({ description: 'Container for other components' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(2))
                                .meta({ description: 'Button object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(3))
                                .meta({
                                  description: 'Select menu for picking from defined text options',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(4))
                                .meta({ description: 'Text input object' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(5))
                                .meta({ description: 'Select menu for users' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(6))
                                .meta({ description: 'Select menu for roles' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(7))
                                .meta({
                                  description: 'Select menu for mentionables (users and roles)',
                                }),
                              z.coerce
                                .number()
                                .pipe(z.literal(8))
                                .meta({ description: 'Select menu for channels' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(9))
                                .meta({ description: 'Section component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(10))
                                .meta({ description: 'Text component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(11))
                                .meta({ description: 'Thumbnail component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(12))
                                .meta({ description: 'Media gallery component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(13))
                                .meta({ description: 'File component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(14))
                                .meta({ description: 'Separator component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(17))
                                .meta({ description: 'Container component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(18))
                                .meta({ description: 'Label component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(19))
                                .meta({ description: 'File upload component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(21))
                                .meta({ description: 'Radio group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(22))
                                .meta({ description: 'Checkbox group component' }),
                              z.coerce
                                .number()
                                .pipe(z.literal(23))
                                .meta({ description: 'Checkbox component' }),
                            ]),
                            id: z
                              .preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.coerce.number().pipe(z.int32().min(0)).nullable(),
                              )
                              .exactOptional(),
                            content: z.string().min(1).max(4000),
                          }),
                        ]),
                      )
                      .max(40),
                  )
                  .nullable(),
              )
              .exactOptional(),
            flags: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z.coerce.number().int().nullable(),
              )
              .exactOptional(),
            attachments: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .preprocess(
                    (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                    z
                      .array(
                        z.object({
                          id: SnowflakeTypeSchema,
                          filename: z.string().min(1).max(1024).nullable().exactOptional(),
                          description: z.string().max(1024).nullable().exactOptional(),
                          duration_secs: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z.coerce.number().min(0).max(2147483647).nullable(),
                            )
                            .exactOptional(),
                          waveform: z.string().max(400).nullable().exactOptional(),
                          title: z.string().max(1024).nullable().exactOptional(),
                          is_spoiler: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z.stringbool().nullable(),
                            )
                            .exactOptional(),
                        }),
                      )
                      .max(10),
                  )
                  .nullable(),
              )
              .exactOptional(),
            poll: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .union([
                    z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                    z.object({
                      question: z
                        .object({
                          text: z
                            .string()
                            .min(1)
                            .max(300)
                            .nullable()
                            .meta({ description: 'The text of the field' })
                            .exactOptional(),
                          emoji: z
                            .preprocess(
                              (val) => (val === 'null' ? null : val),
                              z
                                .union([
                                  z.preprocess(
                                    (val) => (val === 'null' ? null : val),
                                    z.null().nullable(),
                                  ),
                                  z.object({
                                    id: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z
                                          .union([
                                            z.preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.null().nullable(),
                                            ),
                                            SnowflakeTypeSchema,
                                          ])
                                          .meta({ description: 'The ID of the custom emoji' })
                                          .nullable(),
                                      )
                                      .exactOptional(),
                                    name: z
                                      .string()
                                      .max(32)
                                      .nullable()
                                      .meta({
                                        description:
                                          'The name of the emoji, or the unicode emoji character',
                                      })
                                      .exactOptional(),
                                    animated: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z
                                          .stringbool()
                                          .nullable()
                                          .meta({ description: 'Whether the emoji is animated' }),
                                      )
                                      .exactOptional(),
                                  }),
                                ])
                                .meta({ description: 'The emoji of the field' })
                                .nullable(),
                            )
                            .exactOptional(),
                        })
                        .meta({
                          description: 'The question of the poll. Only `text` is supported.',
                        }),
                      answers: z
                        .preprocess(
                          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                          z
                            .array(
                              z.object({
                                poll_media: z
                                  .object({
                                    text: z
                                      .string()
                                      .min(1)
                                      .max(300)
                                      .nullable()
                                      .meta({ description: 'The text of the field' })
                                      .exactOptional(),
                                    emoji: z
                                      .preprocess(
                                        (val) => (val === 'null' ? null : val),
                                        z
                                          .union([
                                            z.preprocess(
                                              (val) => (val === 'null' ? null : val),
                                              z.null().nullable(),
                                            ),
                                            z.object({
                                              id: z
                                                .preprocess(
                                                  (val) => (val === 'null' ? null : val),
                                                  z
                                                    .union([
                                                      z.preprocess(
                                                        (val) => (val === 'null' ? null : val),
                                                        z.null().nullable(),
                                                      ),
                                                      SnowflakeTypeSchema,
                                                    ])
                                                    .meta({
                                                      description: 'The ID of the custom emoji',
                                                    })
                                                    .nullable(),
                                                )
                                                .exactOptional(),
                                              name: z
                                                .string()
                                                .max(32)
                                                .nullable()
                                                .meta({
                                                  description:
                                                    'The name of the emoji, or the unicode emoji character',
                                                })
                                                .exactOptional(),
                                              animated: z
                                                .preprocess(
                                                  (val) => (val === 'null' ? null : val),
                                                  z
                                                    .stringbool()
                                                    .nullable()
                                                    .meta({
                                                      description: 'Whether the emoji is animated',
                                                    }),
                                                )
                                                .exactOptional(),
                                            }),
                                          ])
                                          .meta({ description: 'The emoji of the field' })
                                          .nullable(),
                                      )
                                      .exactOptional(),
                                  })
                                  .meta({ description: 'The data of the answer' }),
                              }),
                            )
                            .min(1)
                            .max(10),
                        )
                        .meta({
                          description: 'Each of the answers available in the poll, up to 10',
                        }),
                      allow_multiselect: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .stringbool()
                            .nullable()
                            .meta({ description: 'Whether a user can select multiple answers' }),
                        )
                        .exactOptional(),
                      layout_type: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.union([
                                z.coerce
                                  .number()
                                  .pipe(z.literal(1))
                                  .meta({ description: 'The, uhm, default layout type.' }),
                              ]),
                            ])
                            .meta({
                              description: 'The layout type of the poll. Defaults to... DEFAULT!',
                            })
                            .nullable(),
                        )
                        .exactOptional(),
                      duration: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z.coerce
                            .number()
                            .pipe(z.int32().min(1).max(768))
                            .nullable()
                            .meta({
                              description:
                                'Number of hours the poll should be open for, up to 32 days. Defaults to 24',
                            }),
                        )
                        .exactOptional(),
                    }),
                  ])
                  .nullable(),
              )
              .exactOptional(),
            shared_client_theme: z
              .preprocess(
                (val) => (val === 'null' ? null : val),
                z
                  .union([
                    z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                    z.object({
                      colors: z.preprocess(
                        (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                        z.array(z.string().length(6)).min(1).max(5),
                      ),
                      gradient_angle: z.coerce.number().pipe(z.int32().min(0).max(360)),
                      base_mix: z.coerce.number().pipe(z.int32().min(0).max(100)),
                      base_theme: z
                        .preprocess(
                          (val) => (val === 'null' ? null : val),
                          z
                            .union([
                              z.preprocess(
                                (val) => (val === 'null' ? null : val),
                                z.null().nullable(),
                              ),
                              z.union([
                                z.coerce
                                  .number()
                                  .pipe(z.literal(0))
                                  .meta({ description: 'No base theme' }),
                                z.coerce
                                  .number()
                                  .pipe(z.literal(1))
                                  .meta({ description: 'Dark base theme' }),
                                z.coerce
                                  .number()
                                  .pipe(z.literal(2))
                                  .meta({ description: 'Light base theme' }),
                                z.coerce
                                  .number()
                                  .pipe(z.literal(3))
                                  .meta({ description: 'Darker base theme' }),
                                z.coerce
                                  .number()
                                  .pipe(z.literal(4))
                                  .meta({ description: 'Midnight base theme' }),
                              ]),
                            ])
                            .nullable(),
                        )
                        .exactOptional(),
                    }),
                  ])
                  .nullable(),
              )
              .exactOptional(),
          }),
        }),
        z.object({
          name: z.string().min(1).max(100),
          auto_archive_duration: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  z.union([
                    z.coerce.number().pipe(z.literal(60)).meta({ description: 'One hour' }),
                    z.coerce.number().pipe(z.literal(1440)).meta({ description: 'One day' }),
                    z.coerce.number().pipe(z.literal(4320)).meta({ description: 'Three days' }),
                    z.coerce.number().pipe(z.literal(10080)).meta({ description: 'Seven days' }),
                  ]),
                ])
                .nullable(),
            )
            .exactOptional(),
          rate_limit_per_user: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z.coerce.number().pipe(z.int32().min(0).max(21600)).nullable(),
            )
            .exactOptional(),
          type: z
            .preprocess(
              (val) => (val === 'null' ? null : val),
              z
                .union([
                  z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
                  z.union([
                    z.coerce
                      .number()
                      .pipe(z.literal(1))
                      .meta({ description: 'A direct message between users' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(3))
                      .meta({ description: 'A direct message between multiple users' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(0))
                      .meta({ description: 'A text channel within a server' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(2))
                      .meta({ description: 'A voice channel within a server' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(4))
                      .meta({
                        description: 'An organizational category that contains up to 50 channels',
                      }),
                    z.coerce
                      .number()
                      .pipe(z.literal(5))
                      .meta({
                        description:
                          'A channel that users can follow and crosspost into their own server (formerly news channels)',
                      }),
                    z.coerce
                      .number()
                      .pipe(z.literal(10))
                      .meta({
                        description: 'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                      }),
                    z.coerce
                      .number()
                      .pipe(z.literal(11))
                      .meta({
                        description:
                          'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                      }),
                    z.coerce
                      .number()
                      .pipe(z.literal(12))
                      .meta({
                        description:
                          'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                      }),
                    z.coerce
                      .number()
                      .pipe(z.literal(13))
                      .meta({ description: 'A voice channel for hosting events with an audience' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(14))
                      .meta({ description: 'The channel in a hub containing the listed servers' }),
                    z.coerce
                      .number()
                      .pipe(z.literal(15))
                      .meta({ description: 'Channel that can only contain threads' }),
                  ]),
                ])
                .nullable(),
            )
            .exactOptional(),
          invitable: z
            .preprocess((val) => (val === 'null' ? null : val), z.stringbool().nullable())
            .exactOptional(),
        }),
      ]),
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
          content: { 'application/json': { schema: resolver(ThreadsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        before: z.iso.datetime({ offset: true }).exactOptional(),
        limit: z.coerce.number().int().min(2).max(100).exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(ThreadsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        before: z.iso.datetime({ offset: true }).exactOptional(),
        limit: z.coerce.number().int().min(2).max(100).exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(ThreadSearchResponseSchema) } },
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
          content: { 'application/json': { schema: resolver(SearchIndexNotReadyResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        name: z.string().max(100).exactOptional(),
        slop: z.coerce.number().int().min(0).max(100).exactOptional(),
        min_id: SnowflakeTypeSchema.exactOptional(),
        max_id: SnowflakeTypeSchema.exactOptional(),
        tag: z
          .union([
            z.string(),
            z.preprocess(
              (val) => (val === undefined || Array.isArray(val) ? val : [val]),
              z
                .array(SnowflakeTypeSchema)
                .max(20)
                .refine((val) => new Set(val).size === val.length),
            ),
          ])
          .exactOptional(),
        tag_setting: z
          .union([
            z
              .literal('match_all')
              .meta({ description: 'The thread tags must contain all tags in the search query' }),
            z
              .literal('match_some')
              .meta({
                description:
                  'The thread tags must contain at least one of tags in the search query',
              }),
          ])
          .exactOptional(),
        archived: z.stringbool().exactOptional(),
        sort_by: z
          .union([
            z.literal('relevance'),
            z.literal('creation_time'),
            z.literal('last_message_time'),
            z.literal('archive_time'),
          ])
          .exactOptional(),
        sort_order: z.union([z.literal('asc'), z.literal('desc')]).exactOptional(),
        limit: z.coerce.number().int().min(1).max(25).exactOptional(),
        offset: z.coerce.number().int().min(0).max(9975).exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(TypingIndicatorResponseSchema) } },
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
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(ThreadsResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'query',
      z.object({
        before: SnowflakeTypeSchema.exactOptional(),
        limit: z.coerce.number().int().min(2).max(100).exactOptional(),
      }),
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
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.object({
        status: z
          .string()
          .max(500)
          .nullable()
          .meta({ description: 'The new voice channel status' })
          .exactOptional(),
      }),
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
                z
                  .array(
                    z.xor([
                      ApplicationIncomingWebhookResponseSchema,
                      ChannelFollowerWebhookResponseSchema,
                      GuildIncomingWebhookResponseSchema,
                    ]),
                  )
                  .nullable(),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(GuildIncomingWebhookResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', z.object({ channel_id: SnowflakeTypeSchema })),
    validator(
      'json',
      z.object({ name: z.string().min(1).max(80), avatar: z.string().nullable().exactOptional() }),
    ),
    (c) => {},
  )
