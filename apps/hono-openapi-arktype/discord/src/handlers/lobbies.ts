import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
import {
  AllowedMentionTypesSchema,
  BulkLobbyMemberRequestSchema,
  ChannelSelectDefaultValueSchema,
  LobbyGuildInviteResponseSchema,
  LobbyMemberRequestSchema,
  LobbyMemberResponseSchema,
  LobbyMessageResponseSchema,
  LobbyResponseSchema,
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
          content: { 'application/json': { schema: resolver(LobbyResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator(
      'json',
      type({
        'idle_timeout_seconds?':
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 5 & number.integer <= 604800 | null',
        'lobby_metadata?': type(
          type({
            '[string]': type('string').narrow(
              (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
            ),
          }),
        ).or('null'),
        'member_metadata?': type(
          type({
            '[string]': type('string').narrow(
              (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
            ),
          }),
        ).or('null'),
        secret: type('string').narrow(
          (data, ctx) => [...data].length <= 250 || ctx.mustBe('at most 250 characters'),
        ),
        'flags?': 'null | null | 1',
        'name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        ).or('null'),
      }),
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
          content: { 'application/json': { schema: resolver(LobbyResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator(
      'json',
      type({
        'idle_timeout_seconds?':
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 5 & number.integer <= 604800 | null',
        'members?': type(
          type(type(LobbyMemberRequestSchema).array()).and(type('unknown[] <= 25')),
        ).or('null'),
        'metadata?': type(
          type({
            '[string]': type('string').narrow(
              (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
            ),
          }),
        ).or('null'),
        'flags?': 'null | null | 1',
        'override_event_webhooks_url?': type(
          type('string.url').narrow(
            (data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters'),
          ),
        ).or('null'),
        'name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        ).or('null'),
      }),
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
          content: { 'application/json': { schema: resolver(LobbyResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ lobby_id: SnowflakeTypeSchema })),
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
    validator('param', type({ lobby_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(LobbyResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ lobby_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type({
        'idle_timeout_seconds?':
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 5 & number.integer <= 604800 | null',
        'metadata?': type(
          type({
            '[string]': type('string').narrow(
              (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
            ),
          }),
        ).or('null'),
        'members?': type(
          type(type(LobbyMemberRequestSchema).array()).and(type('unknown[] <= 25')),
        ).or('null'),
        'flags?': 'null | null | 1',
        'override_event_webhooks_url?': type(
          type('string.url').narrow(
            (data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters'),
          ),
        ).or('null'),
        'name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        ).or('null'),
      }),
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
          content: { 'application/json': { schema: resolver(LobbyResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', type({ lobby_id: SnowflakeTypeSchema })),
    validator('json', type({ 'channel_id?': type('null | null').or(SnowflakeTypeSchema) })),
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
    validator('param', type({ lobby_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(LobbyGuildInviteResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', type({ lobby_id: SnowflakeTypeSchema })),
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
              schema: resolver(type(type(LobbyMemberResponseSchema).array()).or('null')),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ lobby_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type(type(type(BulkLobbyMemberRequestSchema).array()).and(type('1 <= unknown[] <= 25'))).or(
        'null',
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
          content: { 'application/json': { schema: resolver(LobbyMemberResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type({
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
      }),
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
    validator('param', type({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
          content: { 'application/json': { schema: resolver(LobbyGuildInviteResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }],
    }),
    validator('param', type({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema })),
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
              schema: resolver(type(type(LobbyMessageResponseSchema).array()).or('null')),
            },
          },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', type({ lobby_id: SnowflakeTypeSchema })),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 200'),
      }),
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
          content: { 'application/json': { schema: resolver(LobbyMessageResponseSchema) } },
        },
        '429': ClientRatelimitedResponseResponse,
        '4XX': ClientErrorResponseResponse,
      },
      security: [{ BotToken: [] }, { OAuth2: [] }],
    }),
    validator('param', type({ lobby_id: SnowflakeTypeSchema })),
    validator('json', SDKMessageRequestSchema),
    validator(
      'form',
      type({
        'content?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
          ),
        ).or('null'),
        'embeds?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown').pipe(
              (data) => (data === undefined || Array.isArray(data) ? data : [data]),
              type(
                type(
                  type({
                    'type?': type(
                      type('string').narrow(
                        (data, ctx) =>
                          [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
                      ),
                    ).or('null'),
                    'url?': type(
                      type('string.url').narrow(
                        (data, ctx) =>
                          [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'),
                      ),
                    ).or('null'),
                    'title?': type(
                      type('string').narrow(
                        (data, ctx) =>
                          [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
                      ),
                    ).or('null'),
                    'color?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type('string')
                          .pipe((data, ctx) => {
                            const value = Number(data)
                            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                          })
                          .to('number.integer >= 0 & number.integer <= 16777215'),
                      ).or('null'),
                    ),
                    'timestamp?': type(
                      type(
                        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                      ),
                    ).or('null'),
                    'description?': type(
                      type('string').narrow(
                        (data, ctx) =>
                          [...data].length <= 4096 || ctx.mustBe('at most 4096 characters'),
                      ),
                    ).or('null'),
                    'author?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('unknown')
                              .pipe((data) => (data === 'null' ? null : data))
                              .to('null | null'),
                            RichEmbedAuthorSchema,
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                      ).or('null'),
                    ),
                    'image?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('unknown')
                              .pipe((data) => (data === 'null' ? null : data))
                              .to('null | null'),
                            type({
                              'url?': type(
                                type('string.url').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 2048 ||
                                    ctx.mustBe('at most 2048 characters'),
                                ),
                              ).or('null'),
                              'width?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('string').pipe((data, ctx) => {
                                    const value = Number(data)
                                    return Number.isSafeInteger(value)
                                      ? value
                                      : ctx.error('an integer')
                                  }),
                                ).or('null'),
                              ),
                              'height?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('string').pipe((data, ctx) => {
                                    const value = Number(data)
                                    return Number.isSafeInteger(value)
                                      ? value
                                      : ctx.error('an integer')
                                  }),
                                ).or('null'),
                              ),
                              'placeholder?': type(
                                type('string').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 64 || ctx.mustBe('at most 64 characters'),
                                ),
                              ).or('null'),
                              'placeholder_version?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isSafeInteger(value)
                                        ? value
                                        : ctx.error('an integer')
                                    })
                                    .to('number.integer >= 0 & number.integer <= 2147483647'),
                                ).or('null'),
                              ),
                              'is_animated?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type(
                                    /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                  ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
                                ).or('null'),
                              ),
                              'description?': type(
                                type('string').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 4096 ||
                                    ctx.mustBe('at most 4096 characters'),
                                ),
                              ).or('null'),
                            }),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                      ).or('null'),
                    ),
                    'thumbnail?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('unknown')
                              .pipe((data) => (data === 'null' ? null : data))
                              .to('null | null'),
                            type({
                              'url?': type(
                                type('string.url').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 2048 ||
                                    ctx.mustBe('at most 2048 characters'),
                                ),
                              ).or('null'),
                              'width?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('string').pipe((data, ctx) => {
                                    const value = Number(data)
                                    return Number.isSafeInteger(value)
                                      ? value
                                      : ctx.error('an integer')
                                  }),
                                ).or('null'),
                              ),
                              'height?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('string').pipe((data, ctx) => {
                                    const value = Number(data)
                                    return Number.isSafeInteger(value)
                                      ? value
                                      : ctx.error('an integer')
                                  }),
                                ).or('null'),
                              ),
                              'placeholder?': type(
                                type('string').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 64 || ctx.mustBe('at most 64 characters'),
                                ),
                              ).or('null'),
                              'placeholder_version?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isSafeInteger(value)
                                        ? value
                                        : ctx.error('an integer')
                                    })
                                    .to('number.integer >= 0 & number.integer <= 2147483647'),
                                ).or('null'),
                              ),
                              'is_animated?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type(
                                    /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                  ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
                                ).or('null'),
                              ),
                              'description?': type(
                                type('string').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 4096 ||
                                    ctx.mustBe('at most 4096 characters'),
                                ),
                              ).or('null'),
                            }),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                      ).or('null'),
                    ),
                    'footer?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('unknown')
                              .pipe((data) => (data === 'null' ? null : data))
                              .to('null | null'),
                            RichEmbedFooterSchema,
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                      ).or('null'),
                    ),
                    'fields?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type('unknown').pipe(
                          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                          type(
                            type(
                              type({
                                name: type('string').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
                                ),
                                value: type('string').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 1024 ||
                                    ctx.mustBe('at most 1024 characters'),
                                ),
                                'inline?': type('unknown').pipe(
                                  (data) => (data === 'null' ? null : data),
                                  type(
                                    type(
                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                    ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
                                  ).or('null'),
                                ),
                              }),
                            ).array(),
                          ).and(type('unknown[] <= 25')),
                        ),
                      ).or('null'),
                    ),
                    'provider?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('unknown')
                              .pipe((data) => (data === 'null' ? null : data))
                              .to('null | null'),
                            RichEmbedProviderSchema,
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                      ).or('null'),
                    ),
                    'video?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('unknown')
                              .pipe((data) => (data === 'null' ? null : data))
                              .to('null | null'),
                            type({
                              'url?': type(
                                type('string.url').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 2048 ||
                                    ctx.mustBe('at most 2048 characters'),
                                ),
                              ).or('null'),
                              'width?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('string').pipe((data, ctx) => {
                                    const value = Number(data)
                                    return Number.isSafeInteger(value)
                                      ? value
                                      : ctx.error('an integer')
                                  }),
                                ).or('null'),
                              ),
                              'height?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('string').pipe((data, ctx) => {
                                    const value = Number(data)
                                    return Number.isSafeInteger(value)
                                      ? value
                                      : ctx.error('an integer')
                                  }),
                                ).or('null'),
                              ),
                              'placeholder?': type(
                                type('string').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 64 || ctx.mustBe('at most 64 characters'),
                                ),
                              ).or('null'),
                              'placeholder_version?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isSafeInteger(value)
                                        ? value
                                        : ctx.error('an integer')
                                    })
                                    .to('number.integer >= 0 & number.integer <= 2147483647'),
                                ).or('null'),
                              ),
                              'is_animated?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type(
                                    /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                  ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
                                ).or('null'),
                              ),
                              'description?': type(
                                type('string').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 4096 ||
                                    ctx.mustBe('at most 4096 characters'),
                                ),
                              ).or('null'),
                            }),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                      ).or('null'),
                    ),
                    'audio?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('unknown')
                              .pipe((data) => (data === 'null' ? null : data))
                              .to('null | null'),
                            RichEmbedAudioSchema,
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                      ).or('null'),
                    ),
                  }),
                ).array(),
              ).and(type('unknown[] <= 10')),
            ),
          ).or('null'),
        ),
        'allowed_mentions?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown').pipe((data, ctx) => {
              for (const branch of [
                type('unknown')
                  .pipe((data) => (data === 'null' ? null : data))
                  .to('null | null'),
                type({
                  'parse?': type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type('unknown').pipe(
                        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                        type(
                          type(
                            type('unknown').pipe(
                              (data) => (data === 'null' ? null : data),
                              type(
                                type('unknown').pipe((data, ctx) => {
                                  for (const branch of [
                                    type('unknown')
                                      .pipe((data) => (data === 'null' ? null : data))
                                      .to('null | null'),
                                    AllowedMentionTypesSchema,
                                  ]) {
                                    const out = branch(data)
                                    if (!(out instanceof type.errors)) return out
                                  }
                                  return ctx.error('one of the members')
                                }),
                              ).or('null'),
                            ),
                          ).array(),
                        )
                          .and(type('unknown[] <= 1521'))
                          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
                      ),
                    ).or('null'),
                  ),
                  'users?': type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type('unknown').pipe(
                        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                        type(
                          type(
                            type('unknown').pipe(
                              (data) => (data === 'null' ? null : data),
                              type(
                                type('unknown').pipe((data, ctx) => {
                                  for (const branch of [
                                    type('unknown')
                                      .pipe((data) => (data === 'null' ? null : data))
                                      .to('null | null'),
                                    SnowflakeTypeSchema,
                                  ]) {
                                    const out = branch(data)
                                    if (!(out instanceof type.errors)) return out
                                  }
                                  return ctx.error('one of the members')
                                }),
                              ).or('null'),
                            ),
                          ).array(),
                        )
                          .and(type('unknown[] <= 100'))
                          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
                      ),
                    ).or('null'),
                  ),
                  'roles?': type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type('unknown').pipe(
                        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                        type(
                          type(
                            type('unknown').pipe(
                              (data) => (data === 'null' ? null : data),
                              type(
                                type('unknown').pipe((data, ctx) => {
                                  for (const branch of [
                                    type('unknown')
                                      .pipe((data) => (data === 'null' ? null : data))
                                      .to('null | null'),
                                    SnowflakeTypeSchema,
                                  ]) {
                                    const out = branch(data)
                                    if (!(out instanceof type.errors)) return out
                                  }
                                  return ctx.error('one of the members')
                                }),
                              ).or('null'),
                            ),
                          ).array(),
                        )
                          .and(type('unknown[] <= 100'))
                          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
                      ),
                    ).or('null'),
                  ),
                  'replied_user?': type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
                        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                      ),
                    ).or('null'),
                  ),
                }),
              ]) {
                const out = branch(data)
                if (!(out instanceof type.errors)) return out
              }
              return ctx.error('one of the members')
            }),
          ).or('null'),
        ),
        'sticker_ids?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown').pipe(
              (data) => (data === undefined || Array.isArray(data) ? data : [data]),
              type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 3')),
            ),
          ).or('null'),
        ),
        'components?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown').pipe(
              (data) => (data === undefined || Array.isArray(data) ? data : [data]),
              type(
                type(
                  type('unknown').pipe((data, ctx) => {
                    for (const branch of [
                      type({
                        type: type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('1')
                              .describe('Container for other components'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('2')
                              .describe('Button object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('3')
                              .describe('Select menu for picking from defined text options'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('4')
                              .describe('Text input object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('5')
                              .describe('Select menu for users'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('6')
                              .describe('Select menu for roles'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('7')
                              .describe('Select menu for mentionables (users and roles)'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('8')
                              .describe('Select menu for channels'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('9')
                              .describe('Section component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('10')
                              .describe('Text component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('11')
                              .describe('Thumbnail component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('12')
                              .describe('Media gallery component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('13')
                              .describe('File component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('14')
                              .describe('Separator component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('17')
                              .describe('Container component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('18')
                              .describe('Label component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('19')
                              .describe('File upload component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('21')
                              .describe('Radio group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('22')
                              .describe('Checkbox group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('23')
                              .describe('Checkbox component'),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                        'id?': type('unknown').pipe(
                          (data) => (data === 'null' ? null : data),
                          type(
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                              })
                              .to(
                                'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                              ),
                          ).or('null'),
                        ),
                        components: type('unknown').pipe(
                          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                          type(
                            type(
                              type('unknown').pipe((data, ctx) => {
                                for (const branch of [
                                  type({
                                    type: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1')
                                          .describe('Container for other components'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2')
                                          .describe('Button object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3')
                                          .describe(
                                            'Select menu for picking from defined text options',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4')
                                          .describe('Text input object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5')
                                          .describe('Select menu for users'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6')
                                          .describe('Select menu for roles'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('7')
                                          .describe(
                                            'Select menu for mentionables (users and roles)',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('8')
                                          .describe('Select menu for channels'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('9')
                                          .describe('Section component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('10')
                                          .describe('Text component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('11')
                                          .describe('Thumbnail component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('12')
                                          .describe('Media gallery component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('13')
                                          .describe('File component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('14')
                                          .describe('Separator component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('17')
                                          .describe('Container component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('18')
                                          .describe('Label component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('19')
                                          .describe('File upload component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('21')
                                          .describe('Radio group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('22')
                                          .describe('Checkbox group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('23')
                                          .describe('Checkbox component'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to(
                                            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                          ),
                                      ).or('null'),
                                    ),
                                    'custom_id?': type(
                                      type('string')
                                        .narrow(
                                          (data, ctx) =>
                                            [...data].length >= 1 ||
                                            ctx.mustBe('at least 1 character'),
                                        )
                                        .narrow(
                                          (data, ctx) =>
                                            [...data].length <= 100 ||
                                            ctx.mustBe('at most 100 characters'),
                                        ),
                                    ).or('null'),
                                    style: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'label?': type(
                                      type('string').narrow(
                                        (data, ctx) =>
                                          [...data].length <= 80 ||
                                          ctx.mustBe('at most 80 characters'),
                                      ),
                                    ).or('null'),
                                    'disabled?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                    'url?': type(
                                      type('string.url').narrow(
                                        (data, ctx) =>
                                          [...data].length <= 512 ||
                                          ctx.mustBe('at most 512 characters'),
                                      ),
                                    ).or('null'),
                                    'sku_id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('unknown').pipe((data, ctx) => {
                                          for (const branch of [
                                            type('unknown')
                                              .pipe((data) => (data === 'null' ? null : data))
                                              .to('null | null'),
                                            SnowflakeTypeSchema,
                                          ]) {
                                            const out = branch(data)
                                            if (!(out instanceof type.errors)) return out
                                          }
                                          return ctx.error('one of the members')
                                        }),
                                      ).or('null'),
                                    ),
                                    'emoji?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('unknown').pipe((data, ctx) => {
                                          for (const branch of [
                                            type('unknown')
                                              .pipe((data) => (data === 'null' ? null : data))
                                              .to('null | null'),
                                            type({
                                              'id?': type('unknown').pipe(
                                                (data) => (data === 'null' ? null : data),
                                                type(
                                                  type('unknown').pipe((data, ctx) => {
                                                    for (const branch of [
                                                      type('unknown')
                                                        .pipe((data) =>
                                                          data === 'null' ? null : data,
                                                        )
                                                        .to('null | null'),
                                                      SnowflakeTypeSchema,
                                                    ]) {
                                                      const out = branch(data)
                                                      if (!(out instanceof type.errors)) return out
                                                    }
                                                    return ctx.error('one of the members')
                                                  }),
                                                ).or('null'),
                                              ),
                                              name: type('string').narrow(
                                                (data, ctx) =>
                                                  [...data].length <= 32 ||
                                                  ctx.mustBe('at most 32 characters'),
                                              ),
                                            }),
                                          ]) {
                                            const out = branch(data)
                                            if (!(out instanceof type.errors)) return out
                                          }
                                          return ctx.error('one of the members')
                                        }),
                                      ).or('null'),
                                    ),
                                  }),
                                  type({
                                    type: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1')
                                          .describe('Container for other components'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2')
                                          .describe('Button object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3')
                                          .describe(
                                            'Select menu for picking from defined text options',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4')
                                          .describe('Text input object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5')
                                          .describe('Select menu for users'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6')
                                          .describe('Select menu for roles'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('7')
                                          .describe(
                                            'Select menu for mentionables (users and roles)',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('8')
                                          .describe('Select menu for channels'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('9')
                                          .describe('Section component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('10')
                                          .describe('Text component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('11')
                                          .describe('Thumbnail component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('12')
                                          .describe('Media gallery component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('13')
                                          .describe('File component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('14')
                                          .describe('Separator component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('17')
                                          .describe('Container component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('18')
                                          .describe('Label component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('19')
                                          .describe('File upload component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('21')
                                          .describe('Radio group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('22')
                                          .describe('Checkbox group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('23')
                                          .describe('Checkbox component'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to(
                                            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                          ),
                                      ).or('null'),
                                    ),
                                    custom_id: type('string')
                                      .narrow(
                                        (data, ctx) =>
                                          [...data].length >= 1 ||
                                          ctx.mustBe('at least 1 character'),
                                      )
                                      .narrow(
                                        (data, ctx) =>
                                          [...data].length <= 100 ||
                                          ctx.mustBe('at most 100 characters'),
                                      ),
                                    'placeholder?': type(
                                      type('string').narrow(
                                        (data, ctx) =>
                                          [...data].length <= 150 ||
                                          ctx.mustBe('at most 150 characters'),
                                      ),
                                    ).or('null'),
                                    'min_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to('number.integer >= 0 & number.integer <= 25'),
                                      ).or('null'),
                                    ),
                                    'max_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to('number.integer >= 1 & number.integer <= 25'),
                                      ).or('null'),
                                    ),
                                    'disabled?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                    'required?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                    'default_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('unknown').pipe(
                                          (data) =>
                                            data === undefined || Array.isArray(data)
                                              ? data
                                              : [data],
                                          type(type(ChannelSelectDefaultValueSchema).array()).and(
                                            type('unknown[] <= 25'),
                                          ),
                                        ),
                                      ).or('null'),
                                    ),
                                    'channel_types?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('unknown').pipe(
                                          (data) =>
                                            data === undefined || Array.isArray(data)
                                              ? data
                                              : [data],
                                          type(
                                            type('unknown').pipe((data, ctx) => {
                                              for (const branch of [
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('1')
                                                  .describe('A direct message between users'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('3')
                                                  .describe(
                                                    'A direct message between multiple users',
                                                  ),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('0')
                                                  .describe('A text channel within a server'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('2')
                                                  .describe('A voice channel within a server'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('4')
                                                  .describe(
                                                    'An organizational category that contains up to 50 channels',
                                                  ),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('5')
                                                  .describe(
                                                    'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                  ),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('10')
                                                  .describe(
                                                    'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                  ),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('11')
                                                  .describe(
                                                    'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                  ),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('12')
                                                  .describe(
                                                    'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                  ),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('13')
                                                  .describe(
                                                    'A voice channel for hosting events with an audience',
                                                  ),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('14')
                                                  .describe(
                                                    'The channel in a hub containing the listed servers',
                                                  ),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('15')
                                                  .describe(
                                                    'Channel that can only contain threads',
                                                  ),
                                              ]) {
                                                const out = branch(data)
                                                if (!(out instanceof type.errors)) return out
                                              }
                                              return ctx.error('one of the members')
                                            }),
                                          )
                                            .array()
                                            .narrow(
                                              (data: unknown[], ctx) =>
                                                new Set(data).size === data.length,
                                            ),
                                        ),
                                      ).or('null'),
                                    ),
                                  }),
                                  type({
                                    type: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1')
                                          .describe('Container for other components'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2')
                                          .describe('Button object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3')
                                          .describe(
                                            'Select menu for picking from defined text options',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4')
                                          .describe('Text input object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5')
                                          .describe('Select menu for users'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6')
                                          .describe('Select menu for roles'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('7')
                                          .describe(
                                            'Select menu for mentionables (users and roles)',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('8')
                                          .describe('Select menu for channels'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('9')
                                          .describe('Section component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('10')
                                          .describe('Text component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('11')
                                          .describe('Thumbnail component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('12')
                                          .describe('Media gallery component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('13')
                                          .describe('File component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('14')
                                          .describe('Separator component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('17')
                                          .describe('Container component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('18')
                                          .describe('Label component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('19')
                                          .describe('File upload component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('21')
                                          .describe('Radio group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('22')
                                          .describe('Checkbox group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('23')
                                          .describe('Checkbox component'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to(
                                            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                          ),
                                      ).or('null'),
                                    ),
                                    custom_id: type('string')
                                      .narrow(
                                        (data, ctx) =>
                                          [...data].length >= 1 ||
                                          ctx.mustBe('at least 1 character'),
                                      )
                                      .narrow(
                                        (data, ctx) =>
                                          [...data].length <= 100 ||
                                          ctx.mustBe('at most 100 characters'),
                                      ),
                                    'placeholder?': type(
                                      type('string').narrow(
                                        (data, ctx) =>
                                          [...data].length <= 150 ||
                                          ctx.mustBe('at most 150 characters'),
                                      ),
                                    ).or('null'),
                                    'min_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to('number.integer >= 0 & number.integer <= 25'),
                                      ).or('null'),
                                    ),
                                    'max_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to('number.integer >= 1 & number.integer <= 25'),
                                      ).or('null'),
                                    ),
                                    'disabled?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                    'required?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                    'default_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('unknown').pipe(
                                          (data) =>
                                            data === undefined || Array.isArray(data)
                                              ? data
                                              : [data],
                                          type(
                                            type(
                                              type(RoleSelectDefaultValueSchema).or(
                                                UserSelectDefaultValueSchema,
                                              ),
                                            ).array(),
                                          ).and(type('unknown[] <= 25')),
                                        ),
                                      ).or('null'),
                                    ),
                                  }),
                                  type({
                                    type: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1')
                                          .describe('Container for other components'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2')
                                          .describe('Button object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3')
                                          .describe(
                                            'Select menu for picking from defined text options',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4')
                                          .describe('Text input object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5')
                                          .describe('Select menu for users'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6')
                                          .describe('Select menu for roles'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('7')
                                          .describe(
                                            'Select menu for mentionables (users and roles)',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('8')
                                          .describe('Select menu for channels'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('9')
                                          .describe('Section component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('10')
                                          .describe('Text component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('11')
                                          .describe('Thumbnail component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('12')
                                          .describe('Media gallery component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('13')
                                          .describe('File component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('14')
                                          .describe('Separator component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('17')
                                          .describe('Container component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('18')
                                          .describe('Label component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('19')
                                          .describe('File upload component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('21')
                                          .describe('Radio group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('22')
                                          .describe('Checkbox group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('23')
                                          .describe('Checkbox component'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to(
                                            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                          ),
                                      ).or('null'),
                                    ),
                                    custom_id: type('string')
                                      .narrow(
                                        (data, ctx) =>
                                          [...data].length >= 1 ||
                                          ctx.mustBe('at least 1 character'),
                                      )
                                      .narrow(
                                        (data, ctx) =>
                                          [...data].length <= 100 ||
                                          ctx.mustBe('at most 100 characters'),
                                      ),
                                    'placeholder?': type(
                                      type('string').narrow(
                                        (data, ctx) =>
                                          [...data].length <= 150 ||
                                          ctx.mustBe('at most 150 characters'),
                                      ),
                                    ).or('null'),
                                    'min_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to('number.integer >= 0 & number.integer <= 25'),
                                      ).or('null'),
                                    ),
                                    'max_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to('number.integer >= 1 & number.integer <= 25'),
                                      ).or('null'),
                                    ),
                                    'disabled?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                    'required?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                    'default_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('unknown').pipe(
                                          (data) =>
                                            data === undefined || Array.isArray(data)
                                              ? data
                                              : [data],
                                          type(type(RoleSelectDefaultValueSchema).array()).and(
                                            type('unknown[] <= 25'),
                                          ),
                                        ),
                                      ).or('null'),
                                    ),
                                  }),
                                  type({
                                    type: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1')
                                          .describe('Container for other components'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2')
                                          .describe('Button object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3')
                                          .describe(
                                            'Select menu for picking from defined text options',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4')
                                          .describe('Text input object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5')
                                          .describe('Select menu for users'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6')
                                          .describe('Select menu for roles'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('7')
                                          .describe(
                                            'Select menu for mentionables (users and roles)',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('8')
                                          .describe('Select menu for channels'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('9')
                                          .describe('Section component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('10')
                                          .describe('Text component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('11')
                                          .describe('Thumbnail component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('12')
                                          .describe('Media gallery component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('13')
                                          .describe('File component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('14')
                                          .describe('Separator component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('17')
                                          .describe('Container component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('18')
                                          .describe('Label component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('19')
                                          .describe('File upload component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('21')
                                          .describe('Radio group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('22')
                                          .describe('Checkbox group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('23')
                                          .describe('Checkbox component'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to(
                                            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                          ),
                                      ).or('null'),
                                    ),
                                    custom_id: type('string')
                                      .narrow(
                                        (data, ctx) =>
                                          [...data].length >= 1 ||
                                          ctx.mustBe('at least 1 character'),
                                      )
                                      .narrow(
                                        (data, ctx) =>
                                          [...data].length <= 100 ||
                                          ctx.mustBe('at most 100 characters'),
                                      ),
                                    'placeholder?': type(
                                      type('string').narrow(
                                        (data, ctx) =>
                                          [...data].length <= 150 ||
                                          ctx.mustBe('at most 150 characters'),
                                      ),
                                    ).or('null'),
                                    'min_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to('number.integer >= 0 & number.integer <= 25'),
                                      ).or('null'),
                                    ),
                                    'max_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to('number.integer >= 1 & number.integer <= 25'),
                                      ).or('null'),
                                    ),
                                    'disabled?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                    'required?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                    options: type('unknown').pipe(
                                      (data) =>
                                        data === undefined || Array.isArray(data) ? data : [data],
                                      type(
                                        type(
                                          type({
                                            label: type('string')
                                              .narrow(
                                                (data, ctx) =>
                                                  [...data].length >= 1 ||
                                                  ctx.mustBe('at least 1 character'),
                                              )
                                              .narrow(
                                                (data, ctx) =>
                                                  [...data].length <= 100 ||
                                                  ctx.mustBe('at most 100 characters'),
                                              ),
                                            value: type('string')
                                              .narrow(
                                                (data, ctx) =>
                                                  [...data].length >= 1 ||
                                                  ctx.mustBe('at least 1 character'),
                                              )
                                              .narrow(
                                                (data, ctx) =>
                                                  [...data].length <= 100 ||
                                                  ctx.mustBe('at most 100 characters'),
                                              ),
                                            'description?': type(
                                              type('string').narrow(
                                                (data, ctx) =>
                                                  [...data].length <= 100 ||
                                                  ctx.mustBe('at most 100 characters'),
                                              ),
                                            ).or('null'),
                                            'default?': type('unknown').pipe(
                                              (data) => (data === 'null' ? null : data),
                                              type(
                                                type(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ).pipe((data) =>
                                                  /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                ),
                                              ).or('null'),
                                            ),
                                            'emoji?': type('unknown').pipe(
                                              (data) => (data === 'null' ? null : data),
                                              type(
                                                type('unknown').pipe((data, ctx) => {
                                                  for (const branch of [
                                                    type('unknown')
                                                      .pipe((data) =>
                                                        data === 'null' ? null : data,
                                                      )
                                                      .to('null | null'),
                                                    type({
                                                      'id?': type('unknown').pipe(
                                                        (data) => (data === 'null' ? null : data),
                                                        type(
                                                          type('unknown').pipe((data, ctx) => {
                                                            for (const branch of [
                                                              type('unknown')
                                                                .pipe((data) =>
                                                                  data === 'null' ? null : data,
                                                                )
                                                                .to('null | null'),
                                                              SnowflakeTypeSchema,
                                                            ]) {
                                                              const out = branch(data)
                                                              if (!(out instanceof type.errors))
                                                                return out
                                                            }
                                                            return ctx.error('one of the members')
                                                          }),
                                                        ).or('null'),
                                                      ),
                                                      name: type('string').narrow(
                                                        (data, ctx) =>
                                                          [...data].length <= 32 ||
                                                          ctx.mustBe('at most 32 characters'),
                                                      ),
                                                    }),
                                                  ]) {
                                                    const out = branch(data)
                                                    if (!(out instanceof type.errors)) return out
                                                  }
                                                  return ctx.error('one of the members')
                                                }),
                                              ).or('null'),
                                            ),
                                          }),
                                        ).array(),
                                      ).and(type('1 <= unknown[] <= 25')),
                                    ),
                                  }),
                                  type({
                                    type: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1')
                                          .describe('Container for other components'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2')
                                          .describe('Button object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3')
                                          .describe(
                                            'Select menu for picking from defined text options',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4')
                                          .describe('Text input object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5')
                                          .describe('Select menu for users'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6')
                                          .describe('Select menu for roles'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('7')
                                          .describe(
                                            'Select menu for mentionables (users and roles)',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('8')
                                          .describe('Select menu for channels'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('9')
                                          .describe('Section component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('10')
                                          .describe('Text component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('11')
                                          .describe('Thumbnail component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('12')
                                          .describe('Media gallery component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('13')
                                          .describe('File component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('14')
                                          .describe('Separator component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('17')
                                          .describe('Container component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('18')
                                          .describe('Label component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('19')
                                          .describe('File upload component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('21')
                                          .describe('Radio group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('22')
                                          .describe('Checkbox group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('23')
                                          .describe('Checkbox component'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to(
                                            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                          ),
                                      ).or('null'),
                                    ),
                                    custom_id: type('string')
                                      .narrow(
                                        (data, ctx) =>
                                          [...data].length >= 1 ||
                                          ctx.mustBe('at least 1 character'),
                                      )
                                      .narrow(
                                        (data, ctx) =>
                                          [...data].length <= 100 ||
                                          ctx.mustBe('at most 100 characters'),
                                      ),
                                    'placeholder?': type(
                                      type('string').narrow(
                                        (data, ctx) =>
                                          [...data].length <= 150 ||
                                          ctx.mustBe('at most 150 characters'),
                                      ),
                                    ).or('null'),
                                    'min_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to('number.integer >= 0 & number.integer <= 25'),
                                      ).or('null'),
                                    ),
                                    'max_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to('number.integer >= 1 & number.integer <= 25'),
                                      ).or('null'),
                                    ),
                                    'disabled?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                    'required?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                    'default_values?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('unknown').pipe(
                                          (data) =>
                                            data === undefined || Array.isArray(data)
                                              ? data
                                              : [data],
                                          type(type(UserSelectDefaultValueSchema).array()).and(
                                            type('unknown[] <= 25'),
                                          ),
                                        ),
                                      ).or('null'),
                                    ),
                                  }),
                                ]) {
                                  const out = branch(data)
                                  if (!(out instanceof type.errors)) return out
                                }
                                return ctx.error('one of the members')
                              }),
                            ).array(),
                          ).and(type('1 <= unknown[] <= 5')),
                        ),
                      }),
                      type({
                        type: type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('1')
                              .describe('Container for other components'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('2')
                              .describe('Button object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('3')
                              .describe('Select menu for picking from defined text options'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('4')
                              .describe('Text input object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('5')
                              .describe('Select menu for users'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('6')
                              .describe('Select menu for roles'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('7')
                              .describe('Select menu for mentionables (users and roles)'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('8')
                              .describe('Select menu for channels'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('9')
                              .describe('Section component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('10')
                              .describe('Text component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('11')
                              .describe('Thumbnail component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('12')
                              .describe('Media gallery component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('13')
                              .describe('File component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('14')
                              .describe('Separator component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('17')
                              .describe('Container component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('18')
                              .describe('Label component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('19')
                              .describe('File upload component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('21')
                              .describe('Radio group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('22')
                              .describe('Checkbox group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('23')
                              .describe('Checkbox component'),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                        'id?': type('unknown').pipe(
                          (data) => (data === 'null' ? null : data),
                          type(
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                              })
                              .to(
                                'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                              ),
                          ).or('null'),
                        ),
                        'accent_color?': type('unknown').pipe(
                          (data) => (data === 'null' ? null : data),
                          type(
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                              })
                              .to('number.integer >= 0 & number.integer <= 16777215'),
                          ).or('null'),
                        ),
                        components: type('unknown').pipe(
                          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                          type(
                            type(
                              type('unknown').pipe((data, ctx) => {
                                for (const branch of [
                                  type({
                                    type: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1')
                                          .describe('Container for other components'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2')
                                          .describe('Button object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3')
                                          .describe(
                                            'Select menu for picking from defined text options',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4')
                                          .describe('Text input object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5')
                                          .describe('Select menu for users'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6')
                                          .describe('Select menu for roles'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('7')
                                          .describe(
                                            'Select menu for mentionables (users and roles)',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('8')
                                          .describe('Select menu for channels'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('9')
                                          .describe('Section component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('10')
                                          .describe('Text component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('11')
                                          .describe('Thumbnail component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('12')
                                          .describe('Media gallery component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('13')
                                          .describe('File component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('14')
                                          .describe('Separator component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('17')
                                          .describe('Container component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('18')
                                          .describe('Label component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('19')
                                          .describe('File upload component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('21')
                                          .describe('Radio group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('22')
                                          .describe('Checkbox group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('23')
                                          .describe('Checkbox component'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to(
                                            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                          ),
                                      ).or('null'),
                                    ),
                                    components: type('unknown').pipe(
                                      (data) =>
                                        data === undefined || Array.isArray(data) ? data : [data],
                                      type(
                                        type(
                                          type('unknown').pipe((data, ctx) => {
                                            for (const branch of [
                                              type({
                                                type: type('unknown').pipe((data, ctx) => {
                                                  for (const branch of [
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('1')
                                                      .describe('Container for other components'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('2')
                                                      .describe('Button object'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('3')
                                                      .describe(
                                                        'Select menu for picking from defined text options',
                                                      ),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('4')
                                                      .describe('Text input object'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('5')
                                                      .describe('Select menu for users'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('6')
                                                      .describe('Select menu for roles'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('7')
                                                      .describe(
                                                        'Select menu for mentionables (users and roles)',
                                                      ),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('8')
                                                      .describe('Select menu for channels'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('9')
                                                      .describe('Section component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('10')
                                                      .describe('Text component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('11')
                                                      .describe('Thumbnail component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('12')
                                                      .describe('Media gallery component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('13')
                                                      .describe('File component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('14')
                                                      .describe('Separator component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('17')
                                                      .describe('Container component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('18')
                                                      .describe('Label component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('19')
                                                      .describe('File upload component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('21')
                                                      .describe('Radio group component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('22')
                                                      .describe('Checkbox group component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('23')
                                                      .describe('Checkbox component'),
                                                  ]) {
                                                    const out = branch(data)
                                                    if (!(out instanceof type.errors)) return out
                                                  }
                                                  return ctx.error('one of the members')
                                                }),
                                                'id?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                'custom_id?': type(
                                                  type('string')
                                                    .narrow(
                                                      (data, ctx) =>
                                                        [...data].length >= 1 ||
                                                        ctx.mustBe('at least 1 character'),
                                                    )
                                                    .narrow(
                                                      (data, ctx) =>
                                                        [...data].length <= 100 ||
                                                        ctx.mustBe('at most 100 characters'),
                                                    ),
                                                ).or('null'),
                                                style: type('unknown').pipe((data, ctx) => {
                                                  for (const branch of [
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('1'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('2'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('3'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('4'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('5'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('6'),
                                                  ]) {
                                                    const out = branch(data)
                                                    if (!(out instanceof type.errors)) return out
                                                  }
                                                  return ctx.error('one of the members')
                                                }),
                                                'label?': type(
                                                  type('string').narrow(
                                                    (data, ctx) =>
                                                      [...data].length <= 80 ||
                                                      ctx.mustBe('at most 80 characters'),
                                                  ),
                                                ).or('null'),
                                                'disabled?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ).pipe((data) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                    ),
                                                  ).or('null'),
                                                ),
                                                'url?': type(
                                                  type('string.url').narrow(
                                                    (data, ctx) =>
                                                      [...data].length <= 512 ||
                                                      ctx.mustBe('at most 512 characters'),
                                                  ),
                                                ).or('null'),
                                                'sku_id?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('unknown').pipe((data, ctx) => {
                                                      for (const branch of [
                                                        type('unknown')
                                                          .pipe((data) =>
                                                            data === 'null' ? null : data,
                                                          )
                                                          .to('null | null'),
                                                        SnowflakeTypeSchema,
                                                      ]) {
                                                        const out = branch(data)
                                                        if (!(out instanceof type.errors))
                                                          return out
                                                      }
                                                      return ctx.error('one of the members')
                                                    }),
                                                  ).or('null'),
                                                ),
                                                'emoji?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('unknown').pipe((data, ctx) => {
                                                      for (const branch of [
                                                        type('unknown')
                                                          .pipe((data) =>
                                                            data === 'null' ? null : data,
                                                          )
                                                          .to('null | null'),
                                                        type({
                                                          'id?': type('unknown').pipe(
                                                            (data) =>
                                                              data === 'null' ? null : data,
                                                            type(
                                                              type('unknown').pipe((data, ctx) => {
                                                                for (const branch of [
                                                                  type('unknown')
                                                                    .pipe((data) =>
                                                                      data === 'null' ? null : data,
                                                                    )
                                                                    .to('null | null'),
                                                                  SnowflakeTypeSchema,
                                                                ]) {
                                                                  const out = branch(data)
                                                                  if (!(out instanceof type.errors))
                                                                    return out
                                                                }
                                                                return ctx.error(
                                                                  'one of the members',
                                                                )
                                                              }),
                                                            ).or('null'),
                                                          ),
                                                          name: type('string').narrow(
                                                            (data, ctx) =>
                                                              [...data].length <= 32 ||
                                                              ctx.mustBe('at most 32 characters'),
                                                          ),
                                                        }),
                                                      ]) {
                                                        const out = branch(data)
                                                        if (!(out instanceof type.errors))
                                                          return out
                                                      }
                                                      return ctx.error('one of the members')
                                                    }),
                                                  ).or('null'),
                                                ),
                                              }),
                                              type({
                                                type: type('unknown').pipe((data, ctx) => {
                                                  for (const branch of [
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('1')
                                                      .describe('Container for other components'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('2')
                                                      .describe('Button object'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('3')
                                                      .describe(
                                                        'Select menu for picking from defined text options',
                                                      ),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('4')
                                                      .describe('Text input object'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('5')
                                                      .describe('Select menu for users'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('6')
                                                      .describe('Select menu for roles'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('7')
                                                      .describe(
                                                        'Select menu for mentionables (users and roles)',
                                                      ),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('8')
                                                      .describe('Select menu for channels'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('9')
                                                      .describe('Section component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('10')
                                                      .describe('Text component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('11')
                                                      .describe('Thumbnail component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('12')
                                                      .describe('Media gallery component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('13')
                                                      .describe('File component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('14')
                                                      .describe('Separator component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('17')
                                                      .describe('Container component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('18')
                                                      .describe('Label component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('19')
                                                      .describe('File upload component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('21')
                                                      .describe('Radio group component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('22')
                                                      .describe('Checkbox group component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('23')
                                                      .describe('Checkbox component'),
                                                  ]) {
                                                    const out = branch(data)
                                                    if (!(out instanceof type.errors)) return out
                                                  }
                                                  return ctx.error('one of the members')
                                                }),
                                                'id?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                custom_id: type('string')
                                                  .narrow(
                                                    (data, ctx) =>
                                                      [...data].length >= 1 ||
                                                      ctx.mustBe('at least 1 character'),
                                                  )
                                                  .narrow(
                                                    (data, ctx) =>
                                                      [...data].length <= 100 ||
                                                      ctx.mustBe('at most 100 characters'),
                                                  ),
                                                'placeholder?': type(
                                                  type('string').narrow(
                                                    (data, ctx) =>
                                                      [...data].length <= 150 ||
                                                      ctx.mustBe('at most 150 characters'),
                                                  ),
                                                ).or('null'),
                                                'min_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= 0 & number.integer <= 25',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                'max_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= 1 & number.integer <= 25',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                'disabled?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ).pipe((data) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                    ),
                                                  ).or('null'),
                                                ),
                                                'required?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ).pipe((data) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                    ),
                                                  ).or('null'),
                                                ),
                                                'default_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('unknown').pipe(
                                                      (data) =>
                                                        data === undefined || Array.isArray(data)
                                                          ? data
                                                          : [data],
                                                      type(
                                                        type(
                                                          ChannelSelectDefaultValueSchema,
                                                        ).array(),
                                                      ).and(type('unknown[] <= 25')),
                                                    ),
                                                  ).or('null'),
                                                ),
                                                'channel_types?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('unknown').pipe(
                                                      (data) =>
                                                        data === undefined || Array.isArray(data)
                                                          ? data
                                                          : [data],
                                                      type(
                                                        type('unknown').pipe((data, ctx) => {
                                                          for (const branch of [
                                                            type('string')
                                                              .pipe((data, ctx) => {
                                                                const value = Number(data)
                                                                return Number.isFinite(value)
                                                                  ? value
                                                                  : ctx.error('a number')
                                                              })
                                                              .to('1')
                                                              .describe(
                                                                'A direct message between users',
                                                              ),
                                                            type('string')
                                                              .pipe((data, ctx) => {
                                                                const value = Number(data)
                                                                return Number.isFinite(value)
                                                                  ? value
                                                                  : ctx.error('a number')
                                                              })
                                                              .to('3')
                                                              .describe(
                                                                'A direct message between multiple users',
                                                              ),
                                                            type('string')
                                                              .pipe((data, ctx) => {
                                                                const value = Number(data)
                                                                return Number.isFinite(value)
                                                                  ? value
                                                                  : ctx.error('a number')
                                                              })
                                                              .to('0')
                                                              .describe(
                                                                'A text channel within a server',
                                                              ),
                                                            type('string')
                                                              .pipe((data, ctx) => {
                                                                const value = Number(data)
                                                                return Number.isFinite(value)
                                                                  ? value
                                                                  : ctx.error('a number')
                                                              })
                                                              .to('2')
                                                              .describe(
                                                                'A voice channel within a server',
                                                              ),
                                                            type('string')
                                                              .pipe((data, ctx) => {
                                                                const value = Number(data)
                                                                return Number.isFinite(value)
                                                                  ? value
                                                                  : ctx.error('a number')
                                                              })
                                                              .to('4')
                                                              .describe(
                                                                'An organizational category that contains up to 50 channels',
                                                              ),
                                                            type('string')
                                                              .pipe((data, ctx) => {
                                                                const value = Number(data)
                                                                return Number.isFinite(value)
                                                                  ? value
                                                                  : ctx.error('a number')
                                                              })
                                                              .to('5')
                                                              .describe(
                                                                'A channel that users can follow and crosspost into their own server (formerly news channels)',
                                                              ),
                                                            type('string')
                                                              .pipe((data, ctx) => {
                                                                const value = Number(data)
                                                                return Number.isFinite(value)
                                                                  ? value
                                                                  : ctx.error('a number')
                                                              })
                                                              .to('10')
                                                              .describe(
                                                                'A temporary sub-channel within a GUILD_ANNOUNCEMENT channel',
                                                              ),
                                                            type('string')
                                                              .pipe((data, ctx) => {
                                                                const value = Number(data)
                                                                return Number.isFinite(value)
                                                                  ? value
                                                                  : ctx.error('a number')
                                                              })
                                                              .to('11')
                                                              .describe(
                                                                'A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set',
                                                              ),
                                                            type('string')
                                                              .pipe((data, ctx) => {
                                                                const value = Number(data)
                                                                return Number.isFinite(value)
                                                                  ? value
                                                                  : ctx.error('a number')
                                                              })
                                                              .to('12')
                                                              .describe(
                                                                'A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission',
                                                              ),
                                                            type('string')
                                                              .pipe((data, ctx) => {
                                                                const value = Number(data)
                                                                return Number.isFinite(value)
                                                                  ? value
                                                                  : ctx.error('a number')
                                                              })
                                                              .to('13')
                                                              .describe(
                                                                'A voice channel for hosting events with an audience',
                                                              ),
                                                            type('string')
                                                              .pipe((data, ctx) => {
                                                                const value = Number(data)
                                                                return Number.isFinite(value)
                                                                  ? value
                                                                  : ctx.error('a number')
                                                              })
                                                              .to('14')
                                                              .describe(
                                                                'The channel in a hub containing the listed servers',
                                                              ),
                                                            type('string')
                                                              .pipe((data, ctx) => {
                                                                const value = Number(data)
                                                                return Number.isFinite(value)
                                                                  ? value
                                                                  : ctx.error('a number')
                                                              })
                                                              .to('15')
                                                              .describe(
                                                                'Channel that can only contain threads',
                                                              ),
                                                          ]) {
                                                            const out = branch(data)
                                                            if (!(out instanceof type.errors))
                                                              return out
                                                          }
                                                          return ctx.error('one of the members')
                                                        }),
                                                      )
                                                        .array()
                                                        .narrow(
                                                          (data: unknown[], ctx) =>
                                                            new Set(data).size === data.length,
                                                        ),
                                                    ),
                                                  ).or('null'),
                                                ),
                                              }),
                                              type({
                                                type: type('unknown').pipe((data, ctx) => {
                                                  for (const branch of [
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('1')
                                                      .describe('Container for other components'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('2')
                                                      .describe('Button object'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('3')
                                                      .describe(
                                                        'Select menu for picking from defined text options',
                                                      ),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('4')
                                                      .describe('Text input object'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('5')
                                                      .describe('Select menu for users'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('6')
                                                      .describe('Select menu for roles'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('7')
                                                      .describe(
                                                        'Select menu for mentionables (users and roles)',
                                                      ),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('8')
                                                      .describe('Select menu for channels'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('9')
                                                      .describe('Section component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('10')
                                                      .describe('Text component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('11')
                                                      .describe('Thumbnail component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('12')
                                                      .describe('Media gallery component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('13')
                                                      .describe('File component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('14')
                                                      .describe('Separator component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('17')
                                                      .describe('Container component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('18')
                                                      .describe('Label component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('19')
                                                      .describe('File upload component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('21')
                                                      .describe('Radio group component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('22')
                                                      .describe('Checkbox group component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('23')
                                                      .describe('Checkbox component'),
                                                  ]) {
                                                    const out = branch(data)
                                                    if (!(out instanceof type.errors)) return out
                                                  }
                                                  return ctx.error('one of the members')
                                                }),
                                                'id?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                custom_id: type('string')
                                                  .narrow(
                                                    (data, ctx) =>
                                                      [...data].length >= 1 ||
                                                      ctx.mustBe('at least 1 character'),
                                                  )
                                                  .narrow(
                                                    (data, ctx) =>
                                                      [...data].length <= 100 ||
                                                      ctx.mustBe('at most 100 characters'),
                                                  ),
                                                'placeholder?': type(
                                                  type('string').narrow(
                                                    (data, ctx) =>
                                                      [...data].length <= 150 ||
                                                      ctx.mustBe('at most 150 characters'),
                                                  ),
                                                ).or('null'),
                                                'min_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= 0 & number.integer <= 25',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                'max_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= 1 & number.integer <= 25',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                'disabled?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ).pipe((data) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                    ),
                                                  ).or('null'),
                                                ),
                                                'required?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ).pipe((data) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                    ),
                                                  ).or('null'),
                                                ),
                                                'default_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('unknown').pipe(
                                                      (data) =>
                                                        data === undefined || Array.isArray(data)
                                                          ? data
                                                          : [data],
                                                      type(
                                                        type(
                                                          type(RoleSelectDefaultValueSchema).or(
                                                            UserSelectDefaultValueSchema,
                                                          ),
                                                        ).array(),
                                                      ).and(type('unknown[] <= 25')),
                                                    ),
                                                  ).or('null'),
                                                ),
                                              }),
                                              type({
                                                type: type('unknown').pipe((data, ctx) => {
                                                  for (const branch of [
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('1')
                                                      .describe('Container for other components'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('2')
                                                      .describe('Button object'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('3')
                                                      .describe(
                                                        'Select menu for picking from defined text options',
                                                      ),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('4')
                                                      .describe('Text input object'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('5')
                                                      .describe('Select menu for users'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('6')
                                                      .describe('Select menu for roles'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('7')
                                                      .describe(
                                                        'Select menu for mentionables (users and roles)',
                                                      ),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('8')
                                                      .describe('Select menu for channels'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('9')
                                                      .describe('Section component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('10')
                                                      .describe('Text component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('11')
                                                      .describe('Thumbnail component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('12')
                                                      .describe('Media gallery component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('13')
                                                      .describe('File component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('14')
                                                      .describe('Separator component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('17')
                                                      .describe('Container component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('18')
                                                      .describe('Label component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('19')
                                                      .describe('File upload component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('21')
                                                      .describe('Radio group component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('22')
                                                      .describe('Checkbox group component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('23')
                                                      .describe('Checkbox component'),
                                                  ]) {
                                                    const out = branch(data)
                                                    if (!(out instanceof type.errors)) return out
                                                  }
                                                  return ctx.error('one of the members')
                                                }),
                                                'id?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                custom_id: type('string')
                                                  .narrow(
                                                    (data, ctx) =>
                                                      [...data].length >= 1 ||
                                                      ctx.mustBe('at least 1 character'),
                                                  )
                                                  .narrow(
                                                    (data, ctx) =>
                                                      [...data].length <= 100 ||
                                                      ctx.mustBe('at most 100 characters'),
                                                  ),
                                                'placeholder?': type(
                                                  type('string').narrow(
                                                    (data, ctx) =>
                                                      [...data].length <= 150 ||
                                                      ctx.mustBe('at most 150 characters'),
                                                  ),
                                                ).or('null'),
                                                'min_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= 0 & number.integer <= 25',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                'max_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= 1 & number.integer <= 25',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                'disabled?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ).pipe((data) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                    ),
                                                  ).or('null'),
                                                ),
                                                'required?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ).pipe((data) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                    ),
                                                  ).or('null'),
                                                ),
                                                'default_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('unknown').pipe(
                                                      (data) =>
                                                        data === undefined || Array.isArray(data)
                                                          ? data
                                                          : [data],
                                                      type(
                                                        type(RoleSelectDefaultValueSchema).array(),
                                                      ).and(type('unknown[] <= 25')),
                                                    ),
                                                  ).or('null'),
                                                ),
                                              }),
                                              type({
                                                type: type('unknown').pipe((data, ctx) => {
                                                  for (const branch of [
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('1')
                                                      .describe('Container for other components'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('2')
                                                      .describe('Button object'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('3')
                                                      .describe(
                                                        'Select menu for picking from defined text options',
                                                      ),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('4')
                                                      .describe('Text input object'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('5')
                                                      .describe('Select menu for users'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('6')
                                                      .describe('Select menu for roles'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('7')
                                                      .describe(
                                                        'Select menu for mentionables (users and roles)',
                                                      ),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('8')
                                                      .describe('Select menu for channels'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('9')
                                                      .describe('Section component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('10')
                                                      .describe('Text component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('11')
                                                      .describe('Thumbnail component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('12')
                                                      .describe('Media gallery component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('13')
                                                      .describe('File component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('14')
                                                      .describe('Separator component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('17')
                                                      .describe('Container component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('18')
                                                      .describe('Label component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('19')
                                                      .describe('File upload component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('21')
                                                      .describe('Radio group component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('22')
                                                      .describe('Checkbox group component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('23')
                                                      .describe('Checkbox component'),
                                                  ]) {
                                                    const out = branch(data)
                                                    if (!(out instanceof type.errors)) return out
                                                  }
                                                  return ctx.error('one of the members')
                                                }),
                                                'id?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                custom_id: type('string')
                                                  .narrow(
                                                    (data, ctx) =>
                                                      [...data].length >= 1 ||
                                                      ctx.mustBe('at least 1 character'),
                                                  )
                                                  .narrow(
                                                    (data, ctx) =>
                                                      [...data].length <= 100 ||
                                                      ctx.mustBe('at most 100 characters'),
                                                  ),
                                                'placeholder?': type(
                                                  type('string').narrow(
                                                    (data, ctx) =>
                                                      [...data].length <= 150 ||
                                                      ctx.mustBe('at most 150 characters'),
                                                  ),
                                                ).or('null'),
                                                'min_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= 0 & number.integer <= 25',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                'max_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= 1 & number.integer <= 25',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                'disabled?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ).pipe((data) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                    ),
                                                  ).or('null'),
                                                ),
                                                'required?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ).pipe((data) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                    ),
                                                  ).or('null'),
                                                ),
                                                options: type('unknown').pipe(
                                                  (data) =>
                                                    data === undefined || Array.isArray(data)
                                                      ? data
                                                      : [data],
                                                  type(
                                                    type(
                                                      type({
                                                        label: type('string')
                                                          .narrow(
                                                            (data, ctx) =>
                                                              [...data].length >= 1 ||
                                                              ctx.mustBe('at least 1 character'),
                                                          )
                                                          .narrow(
                                                            (data, ctx) =>
                                                              [...data].length <= 100 ||
                                                              ctx.mustBe('at most 100 characters'),
                                                          ),
                                                        value: type('string')
                                                          .narrow(
                                                            (data, ctx) =>
                                                              [...data].length >= 1 ||
                                                              ctx.mustBe('at least 1 character'),
                                                          )
                                                          .narrow(
                                                            (data, ctx) =>
                                                              [...data].length <= 100 ||
                                                              ctx.mustBe('at most 100 characters'),
                                                          ),
                                                        'description?': type(
                                                          type('string').narrow(
                                                            (data, ctx) =>
                                                              [...data].length <= 100 ||
                                                              ctx.mustBe('at most 100 characters'),
                                                          ),
                                                        ).or('null'),
                                                        'default?': type('unknown').pipe(
                                                          (data) => (data === 'null' ? null : data),
                                                          type(
                                                            type(
                                                              /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                            ).pipe((data) =>
                                                              /^(?:true|1|yes|on|y|enabled)$/i.test(
                                                                data,
                                                              ),
                                                            ),
                                                          ).or('null'),
                                                        ),
                                                        'emoji?': type('unknown').pipe(
                                                          (data) => (data === 'null' ? null : data),
                                                          type(
                                                            type('unknown').pipe((data, ctx) => {
                                                              for (const branch of [
                                                                type('unknown')
                                                                  .pipe((data) =>
                                                                    data === 'null' ? null : data,
                                                                  )
                                                                  .to('null | null'),
                                                                type({
                                                                  'id?': type('unknown').pipe(
                                                                    (data) =>
                                                                      data === 'null' ? null : data,
                                                                    type(
                                                                      type('unknown').pipe(
                                                                        (data, ctx) => {
                                                                          for (const branch of [
                                                                            type('unknown')
                                                                              .pipe((data) =>
                                                                                data === 'null'
                                                                                  ? null
                                                                                  : data,
                                                                              )
                                                                              .to('null | null'),
                                                                            SnowflakeTypeSchema,
                                                                          ]) {
                                                                            const out = branch(data)
                                                                            if (
                                                                              !(
                                                                                out instanceof
                                                                                type.errors
                                                                              )
                                                                            )
                                                                              return out
                                                                          }
                                                                          return ctx.error(
                                                                            'one of the members',
                                                                          )
                                                                        },
                                                                      ),
                                                                    ).or('null'),
                                                                  ),
                                                                  name: type('string').narrow(
                                                                    (data, ctx) =>
                                                                      [...data].length <= 32 ||
                                                                      ctx.mustBe(
                                                                        'at most 32 characters',
                                                                      ),
                                                                  ),
                                                                }),
                                                              ]) {
                                                                const out = branch(data)
                                                                if (!(out instanceof type.errors))
                                                                  return out
                                                              }
                                                              return ctx.error('one of the members')
                                                            }),
                                                          ).or('null'),
                                                        ),
                                                      }),
                                                    ).array(),
                                                  ).and(type('1 <= unknown[] <= 25')),
                                                ),
                                              }),
                                              type({
                                                type: type('unknown').pipe((data, ctx) => {
                                                  for (const branch of [
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('1')
                                                      .describe('Container for other components'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('2')
                                                      .describe('Button object'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('3')
                                                      .describe(
                                                        'Select menu for picking from defined text options',
                                                      ),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('4')
                                                      .describe('Text input object'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('5')
                                                      .describe('Select menu for users'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('6')
                                                      .describe('Select menu for roles'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('7')
                                                      .describe(
                                                        'Select menu for mentionables (users and roles)',
                                                      ),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('8')
                                                      .describe('Select menu for channels'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('9')
                                                      .describe('Section component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('10')
                                                      .describe('Text component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('11')
                                                      .describe('Thumbnail component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('12')
                                                      .describe('Media gallery component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('13')
                                                      .describe('File component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('14')
                                                      .describe('Separator component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('17')
                                                      .describe('Container component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('18')
                                                      .describe('Label component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('19')
                                                      .describe('File upload component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('21')
                                                      .describe('Radio group component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('22')
                                                      .describe('Checkbox group component'),
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isFinite(value)
                                                          ? value
                                                          : ctx.error('a number')
                                                      })
                                                      .to('23')
                                                      .describe('Checkbox component'),
                                                  ]) {
                                                    const out = branch(data)
                                                    if (!(out instanceof type.errors)) return out
                                                  }
                                                  return ctx.error('one of the members')
                                                }),
                                                'id?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                custom_id: type('string')
                                                  .narrow(
                                                    (data, ctx) =>
                                                      [...data].length >= 1 ||
                                                      ctx.mustBe('at least 1 character'),
                                                  )
                                                  .narrow(
                                                    (data, ctx) =>
                                                      [...data].length <= 100 ||
                                                      ctx.mustBe('at most 100 characters'),
                                                  ),
                                                'placeholder?': type(
                                                  type('string').narrow(
                                                    (data, ctx) =>
                                                      [...data].length <= 150 ||
                                                      ctx.mustBe('at most 150 characters'),
                                                  ),
                                                ).or('null'),
                                                'min_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= 0 & number.integer <= 25',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                'max_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('string')
                                                      .pipe((data, ctx) => {
                                                        const value = Number(data)
                                                        return Number.isSafeInteger(value)
                                                          ? value
                                                          : ctx.error('an integer')
                                                      })
                                                      .to(
                                                        'number.integer >= 1 & number.integer <= 25',
                                                      ),
                                                  ).or('null'),
                                                ),
                                                'disabled?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ).pipe((data) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                    ),
                                                  ).or('null'),
                                                ),
                                                'required?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type(
                                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                    ).pipe((data) =>
                                                      /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                    ),
                                                  ).or('null'),
                                                ),
                                                'default_values?': type('unknown').pipe(
                                                  (data) => (data === 'null' ? null : data),
                                                  type(
                                                    type('unknown').pipe(
                                                      (data) =>
                                                        data === undefined || Array.isArray(data)
                                                          ? data
                                                          : [data],
                                                      type(
                                                        type(UserSelectDefaultValueSchema).array(),
                                                      ).and(type('unknown[] <= 25')),
                                                    ),
                                                  ).or('null'),
                                                ),
                                              }),
                                            ]) {
                                              const out = branch(data)
                                              if (!(out instanceof type.errors)) return out
                                            }
                                            return ctx.error('one of the members')
                                          }),
                                        ).array(),
                                      ).and(type('1 <= unknown[] <= 5')),
                                    ),
                                  }),
                                  type({
                                    type: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1')
                                          .describe('Container for other components'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2')
                                          .describe('Button object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3')
                                          .describe(
                                            'Select menu for picking from defined text options',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4')
                                          .describe('Text input object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5')
                                          .describe('Select menu for users'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6')
                                          .describe('Select menu for roles'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('7')
                                          .describe(
                                            'Select menu for mentionables (users and roles)',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('8')
                                          .describe('Select menu for channels'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('9')
                                          .describe('Section component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('10')
                                          .describe('Text component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('11')
                                          .describe('Thumbnail component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('12')
                                          .describe('Media gallery component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('13')
                                          .describe('File component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('14')
                                          .describe('Separator component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('17')
                                          .describe('Container component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('18')
                                          .describe('Label component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('19')
                                          .describe('File upload component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('21')
                                          .describe('Radio group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('22')
                                          .describe('Checkbox group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('23')
                                          .describe('Checkbox component'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to(
                                            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                          ),
                                      ).or('null'),
                                    ),
                                    'spoiler?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                    file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                                  }),
                                  type({
                                    type: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1')
                                          .describe('Container for other components'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2')
                                          .describe('Button object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3')
                                          .describe(
                                            'Select menu for picking from defined text options',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4')
                                          .describe('Text input object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5')
                                          .describe('Select menu for users'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6')
                                          .describe('Select menu for roles'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('7')
                                          .describe(
                                            'Select menu for mentionables (users and roles)',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('8')
                                          .describe('Select menu for channels'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('9')
                                          .describe('Section component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('10')
                                          .describe('Text component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('11')
                                          .describe('Thumbnail component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('12')
                                          .describe('Media gallery component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('13')
                                          .describe('File component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('14')
                                          .describe('Separator component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('17')
                                          .describe('Container component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('18')
                                          .describe('Label component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('19')
                                          .describe('File upload component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('21')
                                          .describe('Radio group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('22')
                                          .describe('Checkbox group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('23')
                                          .describe('Checkbox component'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to(
                                            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                          ),
                                      ).or('null'),
                                    ),
                                    items: type('unknown').pipe(
                                      (data) =>
                                        data === undefined || Array.isArray(data) ? data : [data],
                                      type(
                                        type(
                                          type({
                                            'description?': type(
                                              type('string')
                                                .narrow(
                                                  (data, ctx) =>
                                                    [...data].length >= 1 ||
                                                    ctx.mustBe('at least 1 character'),
                                                )
                                                .narrow(
                                                  (data, ctx) =>
                                                    [...data].length <= 1024 ||
                                                    ctx.mustBe('at most 1024 characters'),
                                                ),
                                            ).or('null'),
                                            'spoiler?': type('unknown').pipe(
                                              (data) => (data === 'null' ? null : data),
                                              type(
                                                type(
                                                  /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                                ).pipe((data) =>
                                                  /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                                ),
                                              ).or('null'),
                                            ),
                                            media: UnfurledMediaRequestSchema,
                                          }),
                                        ).array(),
                                      ).and(type('1 <= unknown[] <= 10')),
                                    ),
                                  }),
                                  type({
                                    type: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1')
                                          .describe('Container for other components'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2')
                                          .describe('Button object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3')
                                          .describe(
                                            'Select menu for picking from defined text options',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4')
                                          .describe('Text input object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5')
                                          .describe('Select menu for users'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6')
                                          .describe('Select menu for roles'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('7')
                                          .describe(
                                            'Select menu for mentionables (users and roles)',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('8')
                                          .describe('Select menu for channels'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('9')
                                          .describe('Section component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('10')
                                          .describe('Text component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('11')
                                          .describe('Thumbnail component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('12')
                                          .describe('Media gallery component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('13')
                                          .describe('File component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('14')
                                          .describe('Separator component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('17')
                                          .describe('Container component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('18')
                                          .describe('Label component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('19')
                                          .describe('File upload component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('21')
                                          .describe('Radio group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('22')
                                          .describe('Checkbox group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('23')
                                          .describe('Checkbox component'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to(
                                            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                          ),
                                      ).or('null'),
                                    ),
                                    components: type('unknown').pipe(
                                      (data) =>
                                        data === undefined || Array.isArray(data) ? data : [data],
                                      type(
                                        type(
                                          type({
                                            type: type('unknown').pipe((data, ctx) => {
                                              for (const branch of [
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('1')
                                                  .describe('Container for other components'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('2')
                                                  .describe('Button object'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('3')
                                                  .describe(
                                                    'Select menu for picking from defined text options',
                                                  ),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('4')
                                                  .describe('Text input object'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('5')
                                                  .describe('Select menu for users'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('6')
                                                  .describe('Select menu for roles'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('7')
                                                  .describe(
                                                    'Select menu for mentionables (users and roles)',
                                                  ),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('8')
                                                  .describe('Select menu for channels'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('9')
                                                  .describe('Section component'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('10')
                                                  .describe('Text component'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('11')
                                                  .describe('Thumbnail component'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('12')
                                                  .describe('Media gallery component'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('13')
                                                  .describe('File component'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('14')
                                                  .describe('Separator component'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('17')
                                                  .describe('Container component'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('18')
                                                  .describe('Label component'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('19')
                                                  .describe('File upload component'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('21')
                                                  .describe('Radio group component'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('22')
                                                  .describe('Checkbox group component'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('23')
                                                  .describe('Checkbox component'),
                                              ]) {
                                                const out = branch(data)
                                                if (!(out instanceof type.errors)) return out
                                              }
                                              return ctx.error('one of the members')
                                            }),
                                            'id?': type('unknown').pipe(
                                              (data) => (data === 'null' ? null : data),
                                              type(
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isSafeInteger(value)
                                                      ? value
                                                      : ctx.error('an integer')
                                                  })
                                                  .to(
                                                    'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                                  ),
                                              ).or('null'),
                                            ),
                                            content: type('string')
                                              .narrow(
                                                (data, ctx) =>
                                                  [...data].length >= 1 ||
                                                  ctx.mustBe('at least 1 character'),
                                              )
                                              .narrow(
                                                (data, ctx) =>
                                                  [...data].length <= 4000 ||
                                                  ctx.mustBe('at most 4000 characters'),
                                              ),
                                          }),
                                        ).array(),
                                      ).and(type('1 <= unknown[] <= 3')),
                                    ),
                                    accessory: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type({
                                          type: type('unknown').pipe((data, ctx) => {
                                            for (const branch of [
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('1')
                                                .describe('Container for other components'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('2')
                                                .describe('Button object'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('3')
                                                .describe(
                                                  'Select menu for picking from defined text options',
                                                ),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('4')
                                                .describe('Text input object'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('5')
                                                .describe('Select menu for users'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('6')
                                                .describe('Select menu for roles'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('7')
                                                .describe(
                                                  'Select menu for mentionables (users and roles)',
                                                ),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('8')
                                                .describe('Select menu for channels'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('9')
                                                .describe('Section component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('10')
                                                .describe('Text component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('11')
                                                .describe('Thumbnail component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('12')
                                                .describe('Media gallery component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('13')
                                                .describe('File component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('14')
                                                .describe('Separator component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('17')
                                                .describe('Container component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('18')
                                                .describe('Label component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('19')
                                                .describe('File upload component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('21')
                                                .describe('Radio group component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('22')
                                                .describe('Checkbox group component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('23')
                                                .describe('Checkbox component'),
                                            ]) {
                                              const out = branch(data)
                                              if (!(out instanceof type.errors)) return out
                                            }
                                            return ctx.error('one of the members')
                                          }),
                                          'id?': type('unknown').pipe(
                                            (data) => (data === 'null' ? null : data),
                                            type(
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isSafeInteger(value)
                                                    ? value
                                                    : ctx.error('an integer')
                                                })
                                                .to(
                                                  'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                                ),
                                            ).or('null'),
                                          ),
                                          'custom_id?': type(
                                            type('string')
                                              .narrow(
                                                (data, ctx) =>
                                                  [...data].length >= 1 ||
                                                  ctx.mustBe('at least 1 character'),
                                              )
                                              .narrow(
                                                (data, ctx) =>
                                                  [...data].length <= 100 ||
                                                  ctx.mustBe('at most 100 characters'),
                                              ),
                                          ).or('null'),
                                          style: type('unknown').pipe((data, ctx) => {
                                            for (const branch of [
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('1'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('2'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('3'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('4'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('5'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('6'),
                                            ]) {
                                              const out = branch(data)
                                              if (!(out instanceof type.errors)) return out
                                            }
                                            return ctx.error('one of the members')
                                          }),
                                          'label?': type(
                                            type('string').narrow(
                                              (data, ctx) =>
                                                [...data].length <= 80 ||
                                                ctx.mustBe('at most 80 characters'),
                                            ),
                                          ).or('null'),
                                          'disabled?': type('unknown').pipe(
                                            (data) => (data === 'null' ? null : data),
                                            type(
                                              type(
                                                /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                              ).pipe((data) =>
                                                /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                              ),
                                            ).or('null'),
                                          ),
                                          'url?': type(
                                            type('string.url').narrow(
                                              (data, ctx) =>
                                                [...data].length <= 512 ||
                                                ctx.mustBe('at most 512 characters'),
                                            ),
                                          ).or('null'),
                                          'sku_id?': type('unknown').pipe(
                                            (data) => (data === 'null' ? null : data),
                                            type(
                                              type('unknown').pipe((data, ctx) => {
                                                for (const branch of [
                                                  type('unknown')
                                                    .pipe((data) => (data === 'null' ? null : data))
                                                    .to('null | null'),
                                                  SnowflakeTypeSchema,
                                                ]) {
                                                  const out = branch(data)
                                                  if (!(out instanceof type.errors)) return out
                                                }
                                                return ctx.error('one of the members')
                                              }),
                                            ).or('null'),
                                          ),
                                          'emoji?': type('unknown').pipe(
                                            (data) => (data === 'null' ? null : data),
                                            type(
                                              type('unknown').pipe((data, ctx) => {
                                                for (const branch of [
                                                  type('unknown')
                                                    .pipe((data) => (data === 'null' ? null : data))
                                                    .to('null | null'),
                                                  type({
                                                    'id?': type('unknown').pipe(
                                                      (data) => (data === 'null' ? null : data),
                                                      type(
                                                        type('unknown').pipe((data, ctx) => {
                                                          for (const branch of [
                                                            type('unknown')
                                                              .pipe((data) =>
                                                                data === 'null' ? null : data,
                                                              )
                                                              .to('null | null'),
                                                            SnowflakeTypeSchema,
                                                          ]) {
                                                            const out = branch(data)
                                                            if (!(out instanceof type.errors))
                                                              return out
                                                          }
                                                          return ctx.error('one of the members')
                                                        }),
                                                      ).or('null'),
                                                    ),
                                                    name: type('string').narrow(
                                                      (data, ctx) =>
                                                        [...data].length <= 32 ||
                                                        ctx.mustBe('at most 32 characters'),
                                                    ),
                                                  }),
                                                ]) {
                                                  const out = branch(data)
                                                  if (!(out instanceof type.errors)) return out
                                                }
                                                return ctx.error('one of the members')
                                              }),
                                            ).or('null'),
                                          ),
                                        }),
                                        type({
                                          type: type('unknown').pipe((data, ctx) => {
                                            for (const branch of [
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('1')
                                                .describe('Container for other components'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('2')
                                                .describe('Button object'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('3')
                                                .describe(
                                                  'Select menu for picking from defined text options',
                                                ),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('4')
                                                .describe('Text input object'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('5')
                                                .describe('Select menu for users'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('6')
                                                .describe('Select menu for roles'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('7')
                                                .describe(
                                                  'Select menu for mentionables (users and roles)',
                                                ),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('8')
                                                .describe('Select menu for channels'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('9')
                                                .describe('Section component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('10')
                                                .describe('Text component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('11')
                                                .describe('Thumbnail component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('12')
                                                .describe('Media gallery component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('13')
                                                .describe('File component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('14')
                                                .describe('Separator component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('17')
                                                .describe('Container component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('18')
                                                .describe('Label component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('19')
                                                .describe('File upload component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('21')
                                                .describe('Radio group component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('22')
                                                .describe('Checkbox group component'),
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isFinite(value)
                                                    ? value
                                                    : ctx.error('a number')
                                                })
                                                .to('23')
                                                .describe('Checkbox component'),
                                            ]) {
                                              const out = branch(data)
                                              if (!(out instanceof type.errors)) return out
                                            }
                                            return ctx.error('one of the members')
                                          }),
                                          'id?': type('unknown').pipe(
                                            (data) => (data === 'null' ? null : data),
                                            type(
                                              type('string')
                                                .pipe((data, ctx) => {
                                                  const value = Number(data)
                                                  return Number.isSafeInteger(value)
                                                    ? value
                                                    : ctx.error('an integer')
                                                })
                                                .to(
                                                  'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                                ),
                                            ).or('null'),
                                          ),
                                          'description?': type(
                                            type('string')
                                              .narrow(
                                                (data, ctx) =>
                                                  [...data].length >= 1 ||
                                                  ctx.mustBe('at least 1 character'),
                                              )
                                              .narrow(
                                                (data, ctx) =>
                                                  [...data].length <= 1024 ||
                                                  ctx.mustBe('at most 1024 characters'),
                                              ),
                                          ).or('null'),
                                          'spoiler?': type('unknown').pipe(
                                            (data) => (data === 'null' ? null : data),
                                            type(
                                              type(
                                                /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                              ).pipe((data) =>
                                                /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                              ),
                                            ).or('null'),
                                          ),
                                          media: UnfurledMediaRequestSchema,
                                        }),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                  }),
                                  type({
                                    type: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1')
                                          .describe('Container for other components'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2')
                                          .describe('Button object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3')
                                          .describe(
                                            'Select menu for picking from defined text options',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4')
                                          .describe('Text input object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5')
                                          .describe('Select menu for users'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6')
                                          .describe('Select menu for roles'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('7')
                                          .describe(
                                            'Select menu for mentionables (users and roles)',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('8')
                                          .describe('Select menu for channels'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('9')
                                          .describe('Section component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('10')
                                          .describe('Text component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('11')
                                          .describe('Thumbnail component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('12')
                                          .describe('Media gallery component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('13')
                                          .describe('File component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('14')
                                          .describe('Separator component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('17')
                                          .describe('Container component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('18')
                                          .describe('Label component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('19')
                                          .describe('File upload component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('21')
                                          .describe('Radio group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('22')
                                          .describe('Checkbox group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('23')
                                          .describe('Checkbox component'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to(
                                            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                          ),
                                      ).or('null'),
                                    ),
                                    'spacing?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('unknown').pipe((data, ctx) => {
                                          for (const branch of [
                                            type('unknown')
                                              .pipe((data) => (data === 'null' ? null : data))
                                              .to('null | null'),
                                            type('unknown').pipe((data, ctx) => {
                                              for (const branch of [
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('1')
                                                  .describe('Small spacing'),
                                                type('string')
                                                  .pipe((data, ctx) => {
                                                    const value = Number(data)
                                                    return Number.isFinite(value)
                                                      ? value
                                                      : ctx.error('a number')
                                                  })
                                                  .to('2')
                                                  .describe('Large spacing'),
                                              ]) {
                                                const out = branch(data)
                                                if (!(out instanceof type.errors)) return out
                                              }
                                              return ctx.error('one of the members')
                                            }),
                                          ]) {
                                            const out = branch(data)
                                            if (!(out instanceof type.errors)) return out
                                          }
                                          return ctx.error('one of the members')
                                        }),
                                      ).or('null'),
                                    ),
                                    'divider?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type(
                                          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                        ).pipe((data) =>
                                          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                        ),
                                      ).or('null'),
                                    ),
                                  }),
                                  type({
                                    type: type('unknown').pipe((data, ctx) => {
                                      for (const branch of [
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('1')
                                          .describe('Container for other components'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('2')
                                          .describe('Button object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('3')
                                          .describe(
                                            'Select menu for picking from defined text options',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('4')
                                          .describe('Text input object'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('5')
                                          .describe('Select menu for users'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('6')
                                          .describe('Select menu for roles'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('7')
                                          .describe(
                                            'Select menu for mentionables (users and roles)',
                                          ),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('8')
                                          .describe('Select menu for channels'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('9')
                                          .describe('Section component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('10')
                                          .describe('Text component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('11')
                                          .describe('Thumbnail component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('12')
                                          .describe('Media gallery component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('13')
                                          .describe('File component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('14')
                                          .describe('Separator component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('17')
                                          .describe('Container component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('18')
                                          .describe('Label component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('19')
                                          .describe('File upload component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('21')
                                          .describe('Radio group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('22')
                                          .describe('Checkbox group component'),
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isFinite(value)
                                              ? value
                                              : ctx.error('a number')
                                          })
                                          .to('23')
                                          .describe('Checkbox component'),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    }),
                                    'id?': type('unknown').pipe(
                                      (data) => (data === 'null' ? null : data),
                                      type(
                                        type('string')
                                          .pipe((data, ctx) => {
                                            const value = Number(data)
                                            return Number.isSafeInteger(value)
                                              ? value
                                              : ctx.error('an integer')
                                          })
                                          .to(
                                            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                          ),
                                      ).or('null'),
                                    ),
                                    content: type('string')
                                      .narrow(
                                        (data, ctx) =>
                                          [...data].length >= 1 ||
                                          ctx.mustBe('at least 1 character'),
                                      )
                                      .narrow(
                                        (data, ctx) =>
                                          [...data].length <= 4000 ||
                                          ctx.mustBe('at most 4000 characters'),
                                      ),
                                  }),
                                ]) {
                                  const out = branch(data)
                                  if (!(out instanceof type.errors)) return out
                                }
                                return ctx.error('one of the members')
                              }),
                            ).array(),
                          ).and(type('1 <= unknown[] <= 40')),
                        ),
                        'spoiler?': type('unknown').pipe(
                          (data) => (data === 'null' ? null : data),
                          type(
                            type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
                              (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                            ),
                          ).or('null'),
                        ),
                      }),
                      type({
                        type: type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('1')
                              .describe('Container for other components'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('2')
                              .describe('Button object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('3')
                              .describe('Select menu for picking from defined text options'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('4')
                              .describe('Text input object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('5')
                              .describe('Select menu for users'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('6')
                              .describe('Select menu for roles'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('7')
                              .describe('Select menu for mentionables (users and roles)'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('8')
                              .describe('Select menu for channels'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('9')
                              .describe('Section component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('10')
                              .describe('Text component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('11')
                              .describe('Thumbnail component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('12')
                              .describe('Media gallery component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('13')
                              .describe('File component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('14')
                              .describe('Separator component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('17')
                              .describe('Container component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('18')
                              .describe('Label component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('19')
                              .describe('File upload component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('21')
                              .describe('Radio group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('22')
                              .describe('Checkbox group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('23')
                              .describe('Checkbox component'),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                        'id?': type('unknown').pipe(
                          (data) => (data === 'null' ? null : data),
                          type(
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                              })
                              .to(
                                'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                              ),
                          ).or('null'),
                        ),
                        'spoiler?': type('unknown').pipe(
                          (data) => (data === 'null' ? null : data),
                          type(
                            type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
                              (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                            ),
                          ).or('null'),
                        ),
                        file: UnfurledMediaRequestWithAttachmentReferenceRequiredSchema,
                      }),
                      type({
                        type: type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('1')
                              .describe('Container for other components'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('2')
                              .describe('Button object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('3')
                              .describe('Select menu for picking from defined text options'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('4')
                              .describe('Text input object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('5')
                              .describe('Select menu for users'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('6')
                              .describe('Select menu for roles'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('7')
                              .describe('Select menu for mentionables (users and roles)'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('8')
                              .describe('Select menu for channels'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('9')
                              .describe('Section component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('10')
                              .describe('Text component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('11')
                              .describe('Thumbnail component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('12')
                              .describe('Media gallery component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('13')
                              .describe('File component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('14')
                              .describe('Separator component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('17')
                              .describe('Container component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('18')
                              .describe('Label component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('19')
                              .describe('File upload component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('21')
                              .describe('Radio group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('22')
                              .describe('Checkbox group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('23')
                              .describe('Checkbox component'),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                        'id?': type('unknown').pipe(
                          (data) => (data === 'null' ? null : data),
                          type(
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                              })
                              .to(
                                'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                              ),
                          ).or('null'),
                        ),
                        items: type('unknown').pipe(
                          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                          type(
                            type(
                              type({
                                'description?': type(
                                  type('string')
                                    .narrow(
                                      (data, ctx) =>
                                        [...data].length >= 1 || ctx.mustBe('at least 1 character'),
                                    )
                                    .narrow(
                                      (data, ctx) =>
                                        [...data].length <= 1024 ||
                                        ctx.mustBe('at most 1024 characters'),
                                    ),
                                ).or('null'),
                                'spoiler?': type('unknown').pipe(
                                  (data) => (data === 'null' ? null : data),
                                  type(
                                    type(
                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                    ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
                                  ).or('null'),
                                ),
                                media: UnfurledMediaRequestSchema,
                              }),
                            ).array(),
                          ).and(type('1 <= unknown[] <= 10')),
                        ),
                      }),
                      type({
                        type: type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('1')
                              .describe('Container for other components'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('2')
                              .describe('Button object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('3')
                              .describe('Select menu for picking from defined text options'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('4')
                              .describe('Text input object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('5')
                              .describe('Select menu for users'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('6')
                              .describe('Select menu for roles'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('7')
                              .describe('Select menu for mentionables (users and roles)'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('8')
                              .describe('Select menu for channels'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('9')
                              .describe('Section component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('10')
                              .describe('Text component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('11')
                              .describe('Thumbnail component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('12')
                              .describe('Media gallery component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('13')
                              .describe('File component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('14')
                              .describe('Separator component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('17')
                              .describe('Container component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('18')
                              .describe('Label component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('19')
                              .describe('File upload component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('21')
                              .describe('Radio group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('22')
                              .describe('Checkbox group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('23')
                              .describe('Checkbox component'),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                        'id?': type('unknown').pipe(
                          (data) => (data === 'null' ? null : data),
                          type(
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                              })
                              .to(
                                'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                              ),
                          ).or('null'),
                        ),
                        components: type('unknown').pipe(
                          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                          type(
                            type(
                              type({
                                type: type('unknown').pipe((data, ctx) => {
                                  for (const branch of [
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('1')
                                      .describe('Container for other components'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('2')
                                      .describe('Button object'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('3')
                                      .describe(
                                        'Select menu for picking from defined text options',
                                      ),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('4')
                                      .describe('Text input object'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('5')
                                      .describe('Select menu for users'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('6')
                                      .describe('Select menu for roles'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('7')
                                      .describe('Select menu for mentionables (users and roles)'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('8')
                                      .describe('Select menu for channels'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('9')
                                      .describe('Section component'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('10')
                                      .describe('Text component'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('11')
                                      .describe('Thumbnail component'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('12')
                                      .describe('Media gallery component'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('13')
                                      .describe('File component'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('14')
                                      .describe('Separator component'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('17')
                                      .describe('Container component'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('18')
                                      .describe('Label component'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('19')
                                      .describe('File upload component'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('21')
                                      .describe('Radio group component'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('22')
                                      .describe('Checkbox group component'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('23')
                                      .describe('Checkbox component'),
                                  ]) {
                                    const out = branch(data)
                                    if (!(out instanceof type.errors)) return out
                                  }
                                  return ctx.error('one of the members')
                                }),
                                'id?': type('unknown').pipe(
                                  (data) => (data === 'null' ? null : data),
                                  type(
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isSafeInteger(value)
                                          ? value
                                          : ctx.error('an integer')
                                      })
                                      .to(
                                        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                      ),
                                  ).or('null'),
                                ),
                                content: type('string')
                                  .narrow(
                                    (data, ctx) =>
                                      [...data].length >= 1 || ctx.mustBe('at least 1 character'),
                                  )
                                  .narrow(
                                    (data, ctx) =>
                                      [...data].length <= 4000 ||
                                      ctx.mustBe('at most 4000 characters'),
                                  ),
                              }),
                            ).array(),
                          ).and(type('1 <= unknown[] <= 3')),
                        ),
                        accessory: type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type({
                              type: type('unknown').pipe((data, ctx) => {
                                for (const branch of [
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('1')
                                    .describe('Container for other components'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('2')
                                    .describe('Button object'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('3')
                                    .describe('Select menu for picking from defined text options'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('4')
                                    .describe('Text input object'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('5')
                                    .describe('Select menu for users'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('6')
                                    .describe('Select menu for roles'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('7')
                                    .describe('Select menu for mentionables (users and roles)'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('8')
                                    .describe('Select menu for channels'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('9')
                                    .describe('Section component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('10')
                                    .describe('Text component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('11')
                                    .describe('Thumbnail component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('12')
                                    .describe('Media gallery component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('13')
                                    .describe('File component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('14')
                                    .describe('Separator component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('17')
                                    .describe('Container component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('18')
                                    .describe('Label component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('19')
                                    .describe('File upload component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('21')
                                    .describe('Radio group component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('22')
                                    .describe('Checkbox group component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('23')
                                    .describe('Checkbox component'),
                                ]) {
                                  const out = branch(data)
                                  if (!(out instanceof type.errors)) return out
                                }
                                return ctx.error('one of the members')
                              }),
                              'id?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isSafeInteger(value)
                                        ? value
                                        : ctx.error('an integer')
                                    })
                                    .to(
                                      'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                    ),
                                ).or('null'),
                              ),
                              'custom_id?': type(
                                type('string')
                                  .narrow(
                                    (data, ctx) =>
                                      [...data].length >= 1 || ctx.mustBe('at least 1 character'),
                                  )
                                  .narrow(
                                    (data, ctx) =>
                                      [...data].length <= 100 ||
                                      ctx.mustBe('at most 100 characters'),
                                  ),
                              ).or('null'),
                              style: type('unknown').pipe((data, ctx) => {
                                for (const branch of [
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('1'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('2'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('3'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('4'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('5'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('6'),
                                ]) {
                                  const out = branch(data)
                                  if (!(out instanceof type.errors)) return out
                                }
                                return ctx.error('one of the members')
                              }),
                              'label?': type(
                                type('string').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 80 || ctx.mustBe('at most 80 characters'),
                                ),
                              ).or('null'),
                              'disabled?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type(
                                    /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                  ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
                                ).or('null'),
                              ),
                              'url?': type(
                                type('string.url').narrow(
                                  (data, ctx) =>
                                    [...data].length <= 512 || ctx.mustBe('at most 512 characters'),
                                ),
                              ).or('null'),
                              'sku_id?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('unknown').pipe((data, ctx) => {
                                    for (const branch of [
                                      type('unknown')
                                        .pipe((data) => (data === 'null' ? null : data))
                                        .to('null | null'),
                                      SnowflakeTypeSchema,
                                    ]) {
                                      const out = branch(data)
                                      if (!(out instanceof type.errors)) return out
                                    }
                                    return ctx.error('one of the members')
                                  }),
                                ).or('null'),
                              ),
                              'emoji?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('unknown').pipe((data, ctx) => {
                                    for (const branch of [
                                      type('unknown')
                                        .pipe((data) => (data === 'null' ? null : data))
                                        .to('null | null'),
                                      type({
                                        'id?': type('unknown').pipe(
                                          (data) => (data === 'null' ? null : data),
                                          type(
                                            type('unknown').pipe((data, ctx) => {
                                              for (const branch of [
                                                type('unknown')
                                                  .pipe((data) => (data === 'null' ? null : data))
                                                  .to('null | null'),
                                                SnowflakeTypeSchema,
                                              ]) {
                                                const out = branch(data)
                                                if (!(out instanceof type.errors)) return out
                                              }
                                              return ctx.error('one of the members')
                                            }),
                                          ).or('null'),
                                        ),
                                        name: type('string').narrow(
                                          (data, ctx) =>
                                            [...data].length <= 32 ||
                                            ctx.mustBe('at most 32 characters'),
                                        ),
                                      }),
                                    ]) {
                                      const out = branch(data)
                                      if (!(out instanceof type.errors)) return out
                                    }
                                    return ctx.error('one of the members')
                                  }),
                                ).or('null'),
                              ),
                            }),
                            type({
                              type: type('unknown').pipe((data, ctx) => {
                                for (const branch of [
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('1')
                                    .describe('Container for other components'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('2')
                                    .describe('Button object'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('3')
                                    .describe('Select menu for picking from defined text options'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('4')
                                    .describe('Text input object'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('5')
                                    .describe('Select menu for users'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('6')
                                    .describe('Select menu for roles'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('7')
                                    .describe('Select menu for mentionables (users and roles)'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('8')
                                    .describe('Select menu for channels'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('9')
                                    .describe('Section component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('10')
                                    .describe('Text component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('11')
                                    .describe('Thumbnail component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('12')
                                    .describe('Media gallery component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('13')
                                    .describe('File component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('14')
                                    .describe('Separator component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('17')
                                    .describe('Container component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('18')
                                    .describe('Label component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('19')
                                    .describe('File upload component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('21')
                                    .describe('Radio group component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('22')
                                    .describe('Checkbox group component'),
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isFinite(value) ? value : ctx.error('a number')
                                    })
                                    .to('23')
                                    .describe('Checkbox component'),
                                ]) {
                                  const out = branch(data)
                                  if (!(out instanceof type.errors)) return out
                                }
                                return ctx.error('one of the members')
                              }),
                              'id?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('string')
                                    .pipe((data, ctx) => {
                                      const value = Number(data)
                                      return Number.isSafeInteger(value)
                                        ? value
                                        : ctx.error('an integer')
                                    })
                                    .to(
                                      'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                                    ),
                                ).or('null'),
                              ),
                              'description?': type(
                                type('string')
                                  .narrow(
                                    (data, ctx) =>
                                      [...data].length >= 1 || ctx.mustBe('at least 1 character'),
                                  )
                                  .narrow(
                                    (data, ctx) =>
                                      [...data].length <= 1024 ||
                                      ctx.mustBe('at most 1024 characters'),
                                  ),
                              ).or('null'),
                              'spoiler?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type(
                                    /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                  ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
                                ).or('null'),
                              ),
                              media: UnfurledMediaRequestSchema,
                            }),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                      }),
                      type({
                        type: type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('1')
                              .describe('Container for other components'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('2')
                              .describe('Button object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('3')
                              .describe('Select menu for picking from defined text options'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('4')
                              .describe('Text input object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('5')
                              .describe('Select menu for users'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('6')
                              .describe('Select menu for roles'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('7')
                              .describe('Select menu for mentionables (users and roles)'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('8')
                              .describe('Select menu for channels'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('9')
                              .describe('Section component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('10')
                              .describe('Text component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('11')
                              .describe('Thumbnail component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('12')
                              .describe('Media gallery component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('13')
                              .describe('File component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('14')
                              .describe('Separator component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('17')
                              .describe('Container component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('18')
                              .describe('Label component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('19')
                              .describe('File upload component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('21')
                              .describe('Radio group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('22')
                              .describe('Checkbox group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('23')
                              .describe('Checkbox component'),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                        'id?': type('unknown').pipe(
                          (data) => (data === 'null' ? null : data),
                          type(
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                              })
                              .to(
                                'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                              ),
                          ).or('null'),
                        ),
                        'spacing?': type('unknown').pipe(
                          (data) => (data === 'null' ? null : data),
                          type(
                            type('unknown').pipe((data, ctx) => {
                              for (const branch of [
                                type('unknown')
                                  .pipe((data) => (data === 'null' ? null : data))
                                  .to('null | null'),
                                type('unknown').pipe((data, ctx) => {
                                  for (const branch of [
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('1')
                                      .describe('Small spacing'),
                                    type('string')
                                      .pipe((data, ctx) => {
                                        const value = Number(data)
                                        return Number.isFinite(value)
                                          ? value
                                          : ctx.error('a number')
                                      })
                                      .to('2')
                                      .describe('Large spacing'),
                                  ]) {
                                    const out = branch(data)
                                    if (!(out instanceof type.errors)) return out
                                  }
                                  return ctx.error('one of the members')
                                }),
                              ]) {
                                const out = branch(data)
                                if (!(out instanceof type.errors)) return out
                              }
                              return ctx.error('one of the members')
                            }),
                          ).or('null'),
                        ),
                        'divider?': type('unknown').pipe(
                          (data) => (data === 'null' ? null : data),
                          type(
                            type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
                              (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                            ),
                          ).or('null'),
                        ),
                      }),
                      type({
                        type: type('unknown').pipe((data, ctx) => {
                          for (const branch of [
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('1')
                              .describe('Container for other components'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('2')
                              .describe('Button object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('3')
                              .describe('Select menu for picking from defined text options'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('4')
                              .describe('Text input object'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('5')
                              .describe('Select menu for users'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('6')
                              .describe('Select menu for roles'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('7')
                              .describe('Select menu for mentionables (users and roles)'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('8')
                              .describe('Select menu for channels'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('9')
                              .describe('Section component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('10')
                              .describe('Text component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('11')
                              .describe('Thumbnail component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('12')
                              .describe('Media gallery component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('13')
                              .describe('File component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('14')
                              .describe('Separator component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('17')
                              .describe('Container component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('18')
                              .describe('Label component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('19')
                              .describe('File upload component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('21')
                              .describe('Radio group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('22')
                              .describe('Checkbox group component'),
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isFinite(value) ? value : ctx.error('a number')
                              })
                              .to('23')
                              .describe('Checkbox component'),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        }),
                        'id?': type('unknown').pipe(
                          (data) => (data === 'null' ? null : data),
                          type(
                            type('string')
                              .pipe((data, ctx) => {
                                const value = Number(data)
                                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                              })
                              .to(
                                'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0',
                              ),
                          ).or('null'),
                        ),
                        content: type('string')
                          .narrow(
                            (data, ctx) =>
                              [...data].length >= 1 || ctx.mustBe('at least 1 character'),
                          )
                          .narrow(
                            (data, ctx) =>
                              [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
                          ),
                      }),
                    ]) {
                      const out = branch(data)
                      if (!(out instanceof type.errors)) return out
                    }
                    return ctx.error('one of the members')
                  }),
                ).array(),
              ).and(type('unknown[] <= 40')),
            ),
          ).or('null'),
        ),
        'flags?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('string').pipe((data, ctx) => {
              const value = Number(data)
              return Number.isSafeInteger(value) ? value : ctx.error('an integer')
            }),
          ).or('null'),
        ),
        'attachments?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown').pipe(
              (data) => (data === undefined || Array.isArray(data) ? data : [data]),
              type(
                type(
                  type({
                    id: SnowflakeTypeSchema,
                    'filename?': type(
                      type('string')
                        .narrow(
                          (data, ctx) =>
                            [...data].length >= 1 || ctx.mustBe('at least 1 character'),
                        )
                        .narrow(
                          (data, ctx) =>
                            [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
                        ),
                    ).or('null'),
                    'description?': type(
                      type('string').narrow(
                        (data, ctx) =>
                          [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
                      ),
                    ).or('null'),
                    'duration_secs?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type('string')
                          .pipe((data, ctx) => {
                            const value = Number(data)
                            return Number.isFinite(value) ? value : ctx.error('a number')
                          })
                          .to('number >= 0 & number <= 2147483647'),
                      ).or('null'),
                    ),
                    'waveform?': type(
                      type('string').narrow(
                        (data, ctx) =>
                          [...data].length <= 400 || ctx.mustBe('at most 400 characters'),
                      ),
                    ).or('null'),
                    'title?': type(
                      type('string').narrow(
                        (data, ctx) =>
                          [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
                      ),
                    ).or('null'),
                    'is_spoiler?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
                          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                        ),
                      ).or('null'),
                    ),
                  }),
                ).array(),
              ).and(type('unknown[] <= 10')),
            ),
          ).or('null'),
        ),
        'poll?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown').pipe((data, ctx) => {
              for (const branch of [
                type('unknown')
                  .pipe((data) => (data === 'null' ? null : data))
                  .to('null | null'),
                type({
                  question: type({
                    'text?': type(
                      type('string')
                        .narrow(
                          (data, ctx) =>
                            [...data].length >= 1 || ctx.mustBe('at least 1 character'),
                        )
                        .narrow(
                          (data, ctx) =>
                            [...data].length <= 300 || ctx.mustBe('at most 300 characters'),
                        ),
                    )
                      .or('null')
                      .describe('The text of the field'),
                    'emoji?': type('unknown').pipe(
                      (data) => (data === 'null' ? null : data),
                      type(
                        type('unknown')
                          .pipe((data, ctx) => {
                            for (const branch of [
                              type('unknown')
                                .pipe((data) => (data === 'null' ? null : data))
                                .to('null | null'),
                              type({
                                'id?': type('unknown').pipe(
                                  (data) => (data === 'null' ? null : data),
                                  type(
                                    type('unknown')
                                      .pipe((data, ctx) => {
                                        for (const branch of [
                                          type('unknown')
                                            .pipe((data) => (data === 'null' ? null : data))
                                            .to('null | null'),
                                          SnowflakeTypeSchema,
                                        ]) {
                                          const out = branch(data)
                                          if (!(out instanceof type.errors)) return out
                                        }
                                        return ctx.error('one of the members')
                                      })
                                      .describe('The ID of the custom emoji'),
                                  ).or('null'),
                                ),
                                'name?': type(
                                  type('string').narrow(
                                    (data, ctx) =>
                                      [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
                                  ),
                                )
                                  .or('null')
                                  .describe(
                                    'The name of the emoji, or the unicode emoji character',
                                  ),
                                'animated?': type('unknown').pipe(
                                  (data) => (data === 'null' ? null : data),
                                  type(
                                    type(
                                      /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                    ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
                                  )
                                    .or('null')
                                    .describe('Whether the emoji is animated'),
                                ),
                              }),
                            ]) {
                              const out = branch(data)
                              if (!(out instanceof type.errors)) return out
                            }
                            return ctx.error('one of the members')
                          })
                          .describe('The emoji of the field'),
                      ).or('null'),
                    ),
                  }).describe('The question of the poll. Only `text` is supported.'),
                  answers: type('unknown')
                    .pipe(
                      (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                      type(
                        type(
                          type({
                            poll_media: type({
                              'text?': type(
                                type('string')
                                  .narrow(
                                    (data, ctx) =>
                                      [...data].length >= 1 || ctx.mustBe('at least 1 character'),
                                  )
                                  .narrow(
                                    (data, ctx) =>
                                      [...data].length <= 300 ||
                                      ctx.mustBe('at most 300 characters'),
                                  ),
                              )
                                .or('null')
                                .describe('The text of the field'),
                              'emoji?': type('unknown').pipe(
                                (data) => (data === 'null' ? null : data),
                                type(
                                  type('unknown')
                                    .pipe((data, ctx) => {
                                      for (const branch of [
                                        type('unknown')
                                          .pipe((data) => (data === 'null' ? null : data))
                                          .to('null | null'),
                                        type({
                                          'id?': type('unknown').pipe(
                                            (data) => (data === 'null' ? null : data),
                                            type(
                                              type('unknown')
                                                .pipe((data, ctx) => {
                                                  for (const branch of [
                                                    type('unknown')
                                                      .pipe((data) =>
                                                        data === 'null' ? null : data,
                                                      )
                                                      .to('null | null'),
                                                    SnowflakeTypeSchema,
                                                  ]) {
                                                    const out = branch(data)
                                                    if (!(out instanceof type.errors)) return out
                                                  }
                                                  return ctx.error('one of the members')
                                                })
                                                .describe('The ID of the custom emoji'),
                                            ).or('null'),
                                          ),
                                          'name?': type(
                                            type('string').narrow(
                                              (data, ctx) =>
                                                [...data].length <= 32 ||
                                                ctx.mustBe('at most 32 characters'),
                                            ),
                                          )
                                            .or('null')
                                            .describe(
                                              'The name of the emoji, or the unicode emoji character',
                                            ),
                                          'animated?': type('unknown').pipe(
                                            (data) => (data === 'null' ? null : data),
                                            type(
                                              type(
                                                /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                                              ).pipe((data) =>
                                                /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                                              ),
                                            )
                                              .or('null')
                                              .describe('Whether the emoji is animated'),
                                          ),
                                        }),
                                      ]) {
                                        const out = branch(data)
                                        if (!(out instanceof type.errors)) return out
                                      }
                                      return ctx.error('one of the members')
                                    })
                                    .describe('The emoji of the field'),
                                ).or('null'),
                              ),
                            }).describe('The data of the answer'),
                          }),
                        ).array(),
                      ).and(type('1 <= unknown[] <= 10')),
                    )
                    .describe('Each of the answers available in the poll, up to 10'),
                  'allow_multiselect?': type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
                        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                      ),
                    )
                      .or('null')
                      .describe('Whether a user can select multiple answers'),
                  ),
                  'layout_type?': type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type('unknown')
                        .pipe((data, ctx) => {
                          for (const branch of [
                            type('unknown')
                              .pipe((data) => (data === 'null' ? null : data))
                              .to('null | null'),
                            type('unknown').pipe((data, ctx) => {
                              for (const branch of [
                                type('string')
                                  .pipe((data, ctx) => {
                                    const value = Number(data)
                                    return Number.isFinite(value) ? value : ctx.error('a number')
                                  })
                                  .to('1')
                                  .describe('The, uhm, default layout type.'),
                              ]) {
                                const out = branch(data)
                                if (!(out instanceof type.errors)) return out
                              }
                              return ctx.error('one of the members')
                            }),
                          ]) {
                            const out = branch(data)
                            if (!(out instanceof type.errors)) return out
                          }
                          return ctx.error('one of the members')
                        })
                        .describe('The layout type of the poll. Defaults to... DEFAULT!'),
                    ).or('null'),
                  ),
                  'duration?': type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type('string')
                        .pipe((data, ctx) => {
                          const value = Number(data)
                          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                        })
                        .to(
                          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 1 & number.integer <= 768',
                        ),
                    )
                      .or('null')
                      .describe(
                        'Number of hours the poll should be open for, up to 32 days. Defaults to 24',
                      ),
                  ),
                }),
              ]) {
                const out = branch(data)
                if (!(out instanceof type.errors)) return out
              }
              return ctx.error('one of the members')
            }),
          ).or('null'),
        ),
        'shared_client_theme?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown').pipe((data, ctx) => {
              for (const branch of [
                type('unknown')
                  .pipe((data) => (data === 'null' ? null : data))
                  .to('null | null'),
                type({
                  colors: type('unknown').pipe(
                    (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                    type(
                      type(
                        type('string').narrow(
                          (data, ctx) =>
                            [...data].length === 6 || ctx.mustBe('exactly 6 characters'),
                        ),
                      ).array(),
                    ).and(type('1 <= unknown[] <= 5')),
                  ),
                  gradient_angle: type('string')
                    .pipe((data, ctx) => {
                      const value = Number(data)
                      return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                    })
                    .to(
                      'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 & number.integer <= 360',
                    ),
                  base_mix: type('string')
                    .pipe((data, ctx) => {
                      const value = Number(data)
                      return Number.isSafeInteger(value) ? value : ctx.error('an integer')
                    })
                    .to(
                      'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 & number.integer <= 100',
                    ),
                  'base_theme?': type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type('unknown').pipe((data, ctx) => {
                        for (const branch of [
                          type('unknown')
                            .pipe((data) => (data === 'null' ? null : data))
                            .to('null | null'),
                          type('unknown').pipe((data, ctx) => {
                            for (const branch of [
                              type('string')
                                .pipe((data, ctx) => {
                                  const value = Number(data)
                                  return Number.isFinite(value) ? value : ctx.error('a number')
                                })
                                .to('0')
                                .describe('No base theme'),
                              type('string')
                                .pipe((data, ctx) => {
                                  const value = Number(data)
                                  return Number.isFinite(value) ? value : ctx.error('a number')
                                })
                                .to('1')
                                .describe('Dark base theme'),
                              type('string')
                                .pipe((data, ctx) => {
                                  const value = Number(data)
                                  return Number.isFinite(value) ? value : ctx.error('a number')
                                })
                                .to('2')
                                .describe('Light base theme'),
                              type('string')
                                .pipe((data, ctx) => {
                                  const value = Number(data)
                                  return Number.isFinite(value) ? value : ctx.error('a number')
                                })
                                .to('3')
                                .describe('Darker base theme'),
                              type('string')
                                .pipe((data, ctx) => {
                                  const value = Number(data)
                                  return Number.isFinite(value) ? value : ctx.error('a number')
                                })
                                .to('4')
                                .describe('Midnight base theme'),
                            ]) {
                              const out = branch(data)
                              if (!(out instanceof type.errors)) return out
                            }
                            return ctx.error('one of the members')
                          }),
                        ]) {
                          const out = branch(data)
                          if (!(out instanceof type.errors)) return out
                        }
                        return ctx.error('one of the members')
                      }),
                    ).or('null'),
                  ),
                }),
              ]) {
                const out = branch(data)
                if (!(out instanceof type.errors)) return out
              }
              return ctx.error('one of the members')
            }),
          ).or('null'),
        ),
        'message_reference?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown').pipe((data, ctx) => {
              for (const branch of [
                type('unknown')
                  .pipe((data) => (data === 'null' ? null : data))
                  .to('null | null'),
                type({
                  'guild_id?': type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type('unknown').pipe((data, ctx) => {
                        for (const branch of [
                          type('unknown')
                            .pipe((data) => (data === 'null' ? null : data))
                            .to('null | null'),
                          SnowflakeTypeSchema,
                        ]) {
                          const out = branch(data)
                          if (!(out instanceof type.errors)) return out
                        }
                        return ctx.error('one of the members')
                      }),
                    ).or('null'),
                  ),
                  'channel_id?': type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type('unknown').pipe((data, ctx) => {
                        for (const branch of [
                          type('unknown')
                            .pipe((data) => (data === 'null' ? null : data))
                            .to('null | null'),
                          SnowflakeTypeSchema,
                        ]) {
                          const out = branch(data)
                          if (!(out instanceof type.errors)) return out
                        }
                        return ctx.error('one of the members')
                      }),
                    ).or('null'),
                  ),
                  message_id: SnowflakeTypeSchema,
                  'fail_if_not_exists?': type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
                        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
                      ),
                    ).or('null'),
                  ),
                  'type?': type('unknown').pipe(
                    (data) => (data === 'null' ? null : data),
                    type(
                      type('unknown').pipe((data, ctx) => {
                        for (const branch of [
                          type('unknown')
                            .pipe((data) => (data === 'null' ? null : data))
                            .to('null | null'),
                          type('unknown').pipe((data, ctx) => {
                            for (const branch of [
                              type('string')
                                .pipe((data, ctx) => {
                                  const value = Number(data)
                                  return Number.isFinite(value) ? value : ctx.error('a number')
                                })
                                .to('0')
                                .describe('Reference to a message'),
                            ]) {
                              const out = branch(data)
                              if (!(out instanceof type.errors)) return out
                            }
                            return ctx.error('one of the members')
                          }),
                        ]) {
                          const out = branch(data)
                          if (!(out instanceof type.errors)) return out
                        }
                        return ctx.error('one of the members')
                      }),
                    ).or('null'),
                  ),
                }),
              ]) {
                const out = branch(data)
                if (!(out instanceof type.errors)) return out
              }
              return ctx.error('one of the members')
            }),
          ).or('null'),
        ),
        'nonce?': type('unknown').pipe((data, ctx) => {
          for (const branch of [
            type('string')
              .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
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
                (data, ctx) =>
                  data <= 9223372036854776000n || ctx.mustBe('at most 9223372036854776000'),
              ),
            type('string').narrow(
              (data, ctx) => [...data].length <= 25 || ctx.mustBe('at most 25 characters'),
            ),
            type('unknown')
              .pipe((data) => (data === 'null' ? null : data))
              .to('null | null'),
          ]) {
            const out = branch(data)
            if (!(out instanceof type.errors)) return out
          }
          return ctx.error('one of the members')
        }),
        'enforce_nonce?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
              /^(?:true|1|yes|on|y|enabled)$/i.test(data),
            ),
          ).or('null'),
        ),
        'tts?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
              /^(?:true|1|yes|on|y|enabled)$/i.test(data),
            ),
          ).or('null'),
        ),
      }),
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
    validator('param', type({ lobby_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema })),
    validator(
      'json',
      type({
        '[string]': type('string').narrow(
          (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
        ),
      }).describe('The moderation metadata attached to the message'),
    ),
    validator(
      'form',
      type({
        '[string]': type('string').narrow(
          (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
        ),
      }).describe('The moderation metadata attached to the message'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
