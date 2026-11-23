import { os } from '@orpc/server'
import { type } from 'arktype'
import {
  ActionRowComponentForMessageRequestSchema,
  ContainerComponentForMessageRequestSchema,
  CustomClientThemeShareRequestSchema,
  FileComponentForMessageRequestSchema,
  LobbyGuildInviteResponseSchema,
  LobbyMemberRequestSchema,
  LobbyMemberResponseSchema,
  LobbyMessageResponseSchema,
  LobbyResponseSchema,
  MediaGalleryComponentForMessageRequestSchema,
  MessageAllowedMentionsRequestSchema,
  MessageAttachmentRequestSchema,
  MessageReferenceRequestSchema,
  PollCreateRequestSchema,
  RichEmbedSchema,
  SectionComponentForMessageRequestSchema,
  SeparatorComponentForMessageRequestSchema,
  SnowflakeTypeSchema,
  TextDisplayComponentForMessageRequestSchema,
} from '../components'

export const postLobbies = os
  .route({
    method: 'POST',
    path: '/lobbies',
    successStatus: 201,
    successDescription: '201 response for create_lobby',
  })
  .input(
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
      'flags?': 'null | 1',
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
  )
  .output(LobbyResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putLobbies = os
  .route({
    method: 'PUT',
    path: '/lobbies',
    successDescription: '200 response for create_or_join_lobby',
  })
  .input(
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
      'flags?': 'null | 1',
      'name?': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
      ).or('null'),
    }),
  )
  .output(LobbyResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getLobbiesLobbyId = os
  .route({
    method: 'GET',
    path: '/lobbies/{lobby_id}',
    successDescription: '200 response for get_lobby',
  })
  .input(type({ lobby_id: SnowflakeTypeSchema }))
  .output(LobbyResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteLobbiesLobbyId = os
  .route({
    method: 'DELETE',
    path: '/lobbies/{lobby_id}',
    description:
      'Deletes the specified lobby if it exists. It is safe to call even if the lobby is already deleted.',
    successStatus: 204,
    successDescription: '204 response for delete_lobby',
  })
  .input(type({ lobby_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchLobbiesLobbyId = os
  .route({
    method: 'PATCH',
    path: '/lobbies/{lobby_id}',
    successDescription: '200 response for edit_lobby',
  })
  .input(
    type({
      lobby_id: SnowflakeTypeSchema,
      'idle_timeout_seconds?': type(
        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 5 & number.integer <= 604800 | null',
      ),
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
      'flags?': type('null | 1'),
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
  )
  .output(LobbyResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchLobbiesLobbyIdChannelLinking = os
  .route({
    method: 'PATCH',
    path: '/lobbies/{lobby_id}/channel-linking',
    successDescription: '200 response for edit_lobby_channel_link',
  })
  .input(
    type({ lobby_id: SnowflakeTypeSchema, 'channel_id?': type('null').or(SnowflakeTypeSchema) }),
  )
  .output(LobbyResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteLobbiesLobbyIdMembersMe = os
  .route({
    method: 'DELETE',
    path: '/lobbies/{lobby_id}/members/@me',
    successStatus: 204,
    successDescription: '204 response for leave_lobby',
  })
  .input(type({ lobby_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLobbiesLobbyIdMembersMeInvites = os
  .route({
    method: 'POST',
    path: '/lobbies/{lobby_id}/members/@me/invites',
    successDescription: '200 response for create_linked_lobby_guild_invite_for_self',
  })
  .input(type({ lobby_id: SnowflakeTypeSchema }))
  .output(LobbyGuildInviteResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLobbiesLobbyIdMembersBulk = os
  .route({
    method: 'POST',
    path: '/lobbies/{lobby_id}/members/bulk',
    successDescription: '200 response for bulk_update_lobby_members',
  })
  .input(type({ lobby_id: SnowflakeTypeSchema }))
  .output(type(type(LobbyMemberResponseSchema).array()).or('null'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putLobbiesLobbyIdMembersUserId = os
  .route({
    method: 'PUT',
    path: '/lobbies/{lobby_id}/members/{user_id}',
    successDescription: '200 response for add_lobby_member',
  })
  .input(
    type({
      lobby_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      'metadata?': type(
        type({
          '[string]': type('string').narrow(
            (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
          ),
        }),
      ).or('null'),
      'flags?': type('null | 1'),
      'additional_name?': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
      ).or('null'),
    }),
  )
  .output(LobbyMemberResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteLobbiesLobbyIdMembersUserId = os
  .route({
    method: 'DELETE',
    path: '/lobbies/{lobby_id}/members/{user_id}',
    successStatus: 204,
    successDescription: '204 response for delete_lobby_member',
  })
  .input(type({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLobbiesLobbyIdMembersUserIdInvites = os
  .route({
    method: 'POST',
    path: '/lobbies/{lobby_id}/members/{user_id}/invites',
    successDescription: '200 response for create_linked_lobby_guild_invite_for_user',
  })
  .input(type({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .output(LobbyGuildInviteResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getLobbiesLobbyIdMessages = os
  .route({
    method: 'GET',
    path: '/lobbies/{lobby_id}/messages',
    successDescription: '200 response for get_lobby_messages',
  })
  .input(
    type({
      lobby_id: SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 200'),
    }),
  )
  .output(type(type(LobbyMessageResponseSchema).array()).or('null'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLobbiesLobbyIdMessages = os
  .route({
    method: 'POST',
    path: '/lobbies/{lobby_id}/messages',
    successStatus: 201,
    successDescription: '201 response for create_lobby_message',
  })
  .input(
    type({
      lobby_id: SnowflakeTypeSchema,
      'content?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
        ),
      ).or('null'),
      'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or('null'),
      'allowed_mentions?': type('null').or(MessageAllowedMentionsRequestSchema),
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
      'flags?': type('number.integer | null'),
      'attachments?': type(
        type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
      ).or('null'),
      'poll?': type('null').or(PollCreateRequestSchema),
      'shared_client_theme?': type('null').or(CustomClientThemeShareRequestSchema),
      'message_reference?': type('null').or(MessageReferenceRequestSchema),
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
                data >= -9223372036854775808n || ctx.mustBe('at least -9223372036854775808'),
            )
            .narrow(
              (data, ctx) =>
                data <= 9223372036854775808n || ctx.mustBe('at most 9223372036854775808'),
            ),
        ).or(
          type('string').narrow(
            (data, ctx) => [...data].length <= 25 || ctx.mustBe('at most 25 characters'),
          ),
        ),
      ).or('null'),
      'enforce_nonce?': type('boolean | null'),
      'tts?': type('boolean | null'),
    }),
  )
  .output(LobbyMessageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putLobbiesLobbyIdMessagesMessageIdModerationMetadata = os
  .route({
    method: 'PUT',
    path: '/lobbies/{lobby_id}/messages/{message_id}/moderation-metadata',
    description: 'Update the external moderation metadata for a lobby message.',
    successStatus: 204,
    successDescription: '204 response for update_lobby_message_external_moderation_metadata',
  })
  .input(type({ lobby_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
