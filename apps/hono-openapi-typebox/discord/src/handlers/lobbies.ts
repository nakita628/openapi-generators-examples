import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  AllowedMentionTypesSchema,
  BulkLobbyMemberRequestSchema,
  ButtonStyleTypesSchema,
  ChannelSelectDefaultValueSchema,
  ChannelTypesSchema,
  ComponentEmojiForRequestSchema,
  LobbyGuildInviteResponseSchema,
  LobbyMemberRequestSchema,
  LobbyMemberResponseSchema,
  LobbyMessageResponseSchema,
  LobbyResponseSchema,
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
  ClientErrorResponseResponse,
  ClientRatelimitedResponseResponse,
} from '../components'

export const lobbiesHandler = new Hono()
  .put(
    '/lobbies',
    describeRoute({
      operationId: 'create_or_join_lobby',
      responses: {
        '200': {
          description: '200 response for create_or_join_lobby',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(LobbyResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator(
      'json',
      Compile(
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
          flags: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), Type.Literal(1)]),
          ),
          name: Type.Optional(
            Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/lobbies',
    describeRoute({
      operationId: 'create_lobby',
      responses: {
        '201': {
          description: '201 response for create_lobby',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(LobbyResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'json',
      Compile(
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
          flags: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), Type.Literal(1)]),
          ),
          override_event_webhooks_url: Type.Optional(
            Type.Union([Type.String({ format: 'uri', maxLength: 512 }), Type.Null()]),
          ),
          name: Type.Optional(
            Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/lobbies/:lobby_id',
    describeRoute({
      operationId: 'get_lobby',
      responses: {
        '200': {
          description: '200 response for get_lobby',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(LobbyResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ lobby_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/lobbies/:lobby_id',
    describeRoute({
      description:
        'Deletes the specified lobby if it exists. It is safe to call even if the lobby is already deleted.',
      operationId: 'delete_lobby',
      responses: {
        '204': {
          description: '204 response for delete_lobby',
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
    validator('param', Compile(Type.Object({ lobby_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/lobbies/:lobby_id',
    describeRoute({
      operationId: 'edit_lobby',
      responses: {
        '200': {
          description: '200 response for edit_lobby',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(LobbyResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ lobby_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
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
          flags: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), Type.Literal(1)]),
          ),
          override_event_webhooks_url: Type.Optional(
            Type.Union([Type.String({ format: 'uri', maxLength: 512 }), Type.Null()]),
          ),
          name: Type.Optional(
            Type.Union([Type.String({ minLength: 1, maxLength: 100 }), Type.Null()]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .patch(
    '/lobbies/:lobby_id/channel-linking',
    describeRoute({
      operationId: 'edit_lobby_channel_link',
      responses: {
        '200': {
          description: '200 response for edit_lobby_channel_link',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(LobbyResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', Compile(Type.Object({ lobby_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Object({
          channel_id: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), SnowflakeTypeSchema]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/lobbies/:lobby_id/members/@me',
    describeRoute({
      operationId: 'leave_lobby',
      responses: {
        '204': {
          description: '204 response for leave_lobby',
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
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', Compile(Type.Object({ lobby_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/lobbies/:lobby_id/members/@me/invites',
    describeRoute({
      operationId: 'create_linked_lobby_guild_invite_for_self',
      responses: {
        '200': {
          description: '200 response for create_linked_lobby_guild_invite_for_self',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(LobbyGuildInviteResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', Compile(Type.Object({ lobby_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/lobbies/:lobby_id/members/bulk',
    describeRoute({
      operationId: 'bulk_update_lobby_members',
      responses: {
        '200': {
          description: '200 response for bulk_update_lobby_members',
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
                Compile(Type.Union([Type.Array(LobbyMemberResponseSchema), Type.Null()])),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', Compile(Type.Object({ lobby_id: SnowflakeTypeSchema }))),
    validator(
      'json',
      Compile(
        Type.Union([
          Type.Array(BulkLobbyMemberRequestSchema, { minItems: 1, maxItems: 25 }),
          Type.Null(),
        ]),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/lobbies/:lobby_id/members/:user_id',
    describeRoute({
      operationId: 'add_lobby_member',
      responses: {
        '200': {
          description: '200 response for add_lobby_member',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: { 'application/json': { schema: resolver(Compile(LobbyMemberResponseSchema)) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    validator(
      'json',
      Compile(
        Type.Object({
          metadata: Type.Optional(
            Type.Union([
              Type.Record(Type.String(), Type.String({ maxLength: 1024 }), { maxProperties: 25 }),
              Type.Null(),
            ]),
          ),
          flags: Type.Optional(
            Type.Union([Type.Union([Type.Null(), Type.Null()]), Type.Literal(1)]),
          ),
          additional_name: Type.Optional(
            Type.Union([Type.String({ minLength: 1, maxLength: 80 }), Type.Null()]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/lobbies/:lobby_id/members/:user_id',
    describeRoute({
      operationId: 'delete_lobby_member',
      responses: {
        '204': {
          description: '204 response for delete_lobby_member',
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
      Compile(Type.Object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/lobbies/:lobby_id/members/:user_id/invites',
    describeRoute({
      operationId: 'create_linked_lobby_guild_invite_for_user',
      responses: {
        '200': {
          description: '200 response for create_linked_lobby_guild_invite_for_user',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(LobbyGuildInviteResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'param',
      Compile(Type.Object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/lobbies/:lobby_id/messages',
    describeRoute({
      operationId: 'get_lobby_messages',
      responses: {
        '200': {
          description: '200 response for get_lobby_messages',
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
                Compile(Type.Union([Type.Array(LobbyMessageResponseSchema), Type.Null()])),
              ),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', Compile(Type.Object({ lobby_id: SnowflakeTypeSchema }))),
    validator(
      'query',
      Compile(
        Type.Object({
          limit: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/lobbies/:lobby_id/messages',
    describeRoute({
      operationId: 'create_lobby_message',
      responses: {
        '201': {
          description: '201 response for create_lobby_message',
          headers: {
            'X-RateLimit-Limit': { $ref: '#/components/headers/X-RateLimit-Limit' },
            'X-RateLimit-Remaining': { $ref: '#/components/headers/X-RateLimit-Remaining' },
            'X-RateLimit-Reset': { $ref: '#/components/headers/X-RateLimit-Reset' },
            'X-RateLimit-Reset-After': { $ref: '#/components/headers/X-RateLimit-Reset-After' },
            'X-RateLimit-Bucket': { $ref: '#/components/headers/X-RateLimit-Bucket' },
          },
          content: {
            'application/json': { schema: resolver(Compile(LobbyMessageResponseSchema)) },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', Compile(Type.Object({ lobby_id: SnowflakeTypeSchema }))),
    validator('json', Compile(SDKMessageRequestSchema)),
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
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/lobbies/:lobby_id/messages/:message_id/moderation-metadata',
    describeRoute({
      description: 'Update the external moderation metadata for a lobby message.',
      operationId: 'update_lobby_message_external_moderation_metadata',
      responses: {
        '204': {
          description: '204 response for update_lobby_message_external_moderation_metadata',
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
      Compile(Type.Object({ lobby_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    ),
    validator(
      'json',
      Compile(
        Type.Record(Type.String(), Type.String({ maxLength: 2000 }), {
          maxProperties: 5,
          description: 'The moderation metadata attached to the message',
        }),
      ),
    ),
    validator(
      'form',
      Compile(
        Type.Record(Type.String(), Type.String({ maxLength: 2000 }), {
          maxProperties: 5,
          description: 'The moderation metadata attached to the message',
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
