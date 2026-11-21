import { os } from '@orpc/server'
import * as v from 'valibot'
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
    v.partial(
      v.object({
        idle_timeout_seconds: v.nullable(
          v.pipe(
            v.number(),
            v.integer(),
            v.minValue(-2147483648),
            v.maxValue(2147483647),
            v.minValue(5),
            v.maxValue(604800),
          ),
        ),
        members: v.nullable(v.pipe(v.array(LobbyMemberRequestSchema), v.maxLength(25))),
        metadata: v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024)))),
        flags: v.union([v.nullable(v.null()), v.literal(1)]),
        override_event_webhooks_url: v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(512))),
        name: v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      }),
    ),
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
    v.object({
      idle_timeout_seconds: v.optional(
        v.nullable(
          v.pipe(
            v.number(),
            v.integer(),
            v.minValue(-2147483648),
            v.maxValue(2147483647),
            v.minValue(5),
            v.maxValue(604800),
          ),
        ),
      ),
      lobby_metadata: v.optional(
        v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024)))),
      ),
      member_metadata: v.optional(
        v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024)))),
      ),
      secret: v.pipe(v.string(), v.maxCodePoints(250)),
      flags: v.optional(v.union([v.nullable(v.null()), v.literal(1)])),
      name: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
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
  .input(v.object({ lobby_id: SnowflakeTypeSchema }))
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
  .input(v.object({ lobby_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchLobbiesLobbyId = os
  .route({
    method: 'PATCH',
    path: '/lobbies/{lobby_id}',
    successDescription: '200 response for edit_lobby',
  })
  .input(
    v.object({
      lobby_id: SnowflakeTypeSchema,
      idle_timeout_seconds: v.optional(
        v.nullable(
          v.pipe(
            v.number(),
            v.integer(),
            v.minValue(-2147483648),
            v.maxValue(2147483647),
            v.minValue(5),
            v.maxValue(604800),
          ),
        ),
      ),
      metadata: v.optional(
        v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024)))),
      ),
      members: v.optional(v.nullable(v.pipe(v.array(LobbyMemberRequestSchema), v.maxLength(25)))),
      flags: v.optional(v.union([v.nullable(v.null()), v.literal(1)])),
      override_event_webhooks_url: v.optional(
        v.nullable(v.pipe(v.string(), v.url(), v.maxCodePoints(512))),
      ),
      name: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
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
    v.object({
      lobby_id: SnowflakeTypeSchema,
      channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
    }),
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
  .input(v.object({ lobby_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLobbiesLobbyIdMembersMeInvites = os
  .route({
    method: 'POST',
    path: '/lobbies/{lobby_id}/members/@me/invites',
    successDescription: '200 response for create_linked_lobby_guild_invite_for_self',
  })
  .input(v.object({ lobby_id: SnowflakeTypeSchema }))
  .output(LobbyGuildInviteResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLobbiesLobbyIdMembersBulk = os
  .route({
    method: 'POST',
    path: '/lobbies/{lobby_id}/members/bulk',
    successDescription: '200 response for bulk_update_lobby_members',
  })
  .input(v.object({ lobby_id: SnowflakeTypeSchema }))
  .output(v.nullable(v.array(LobbyMemberResponseSchema)))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putLobbiesLobbyIdMembersUserId = os
  .route({
    method: 'PUT',
    path: '/lobbies/{lobby_id}/members/{user_id}',
    successDescription: '200 response for add_lobby_member',
  })
  .input(
    v.object({
      lobby_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      metadata: v.optional(
        v.nullable(v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(1024)))),
      ),
      flags: v.optional(v.union([v.nullable(v.null()), v.literal(1)])),
      additional_name: v.optional(
        v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80))),
      ),
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
  .input(v.object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLobbiesLobbyIdMembersUserIdInvites = os
  .route({
    method: 'POST',
    path: '/lobbies/{lobby_id}/members/{user_id}/invites',
    successDescription: '200 response for create_linked_lobby_guild_invite_for_user',
  })
  .input(v.object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .output(LobbyGuildInviteResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getLobbiesLobbyIdMessages = os
  .route({
    method: 'GET',
    path: '/lobbies/{lobby_id}/messages',
    successDescription: '200 response for get_lobby_messages',
  })
  .input(
    v.object({
      lobby_id: SnowflakeTypeSchema,
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(200),
        ),
      ),
    }),
  )
  .output(v.nullable(v.array(LobbyMessageResponseSchema)))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLobbiesLobbyIdMessages = os
  .route({
    method: 'POST',
    path: '/lobbies/{lobby_id}/messages',
    successStatus: 201,
    successDescription: '201 response for create_lobby_message',
  })
  .input(
    v.object({
      lobby_id: SnowflakeTypeSchema,
      content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(4000)))),
      embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
      allowed_mentions: v.optional(
        v.union([v.nullable(v.null()), MessageAllowedMentionsRequestSchema]),
      ),
      sticker_ids: v.optional(v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(3)))),
      components: v.optional(
        v.nullable(
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
      ),
      flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      attachments: v.optional(
        v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
      ),
      poll: v.optional(v.union([v.nullable(v.null()), PollCreateRequestSchema])),
      shared_client_theme: v.optional(
        v.union([v.nullable(v.null()), CustomClientThemeShareRequestSchema]),
      ),
      message_reference: v.optional(v.union([v.nullable(v.null()), MessageReferenceRequestSchema])),
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
            v.minValue(-9223372036854776000n),
            v.maxValue(9223372036854776000n),
          ),
          v.pipe(v.string(), v.maxCodePoints(25)),
          v.nullable(v.null()),
        ]),
      ),
      enforce_nonce: v.optional(v.nullable(v.boolean())),
      tts: v.optional(v.nullable(v.boolean())),
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
  .input(v.object({ lobby_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
