import { os } from '@orpc/server'
import * as z from 'zod'
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
    z.object({
      idle_timeout_seconds: z.int32().min(5).max(604800).nullable().exactOptional(),
      members: z.array(LobbyMemberRequestSchema).max(25).nullable().exactOptional(),
      metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
      flags: z.xor([z.null().nullable(), z.literal(1)]).exactOptional(),
      override_event_webhooks_url: z.url().max(512).nullable().exactOptional(),
      name: z.string().min(1).max(100).nullable().exactOptional(),
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
    z.object({
      idle_timeout_seconds: z.int32().min(5).max(604800).nullable().exactOptional(),
      lobby_metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
      member_metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
      secret: z.string().max(250),
      flags: z.xor([z.null().nullable(), z.literal(1)]).exactOptional(),
      name: z.string().min(1).max(100).nullable().exactOptional(),
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
  .input(z.object({ lobby_id: SnowflakeTypeSchema }))
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
  .input(z.object({ lobby_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchLobbiesLobbyId = os
  .route({
    method: 'PATCH',
    path: '/lobbies/{lobby_id}',
    successDescription: '200 response for edit_lobby',
  })
  .input(
    z.object({
      lobby_id: SnowflakeTypeSchema,
      idle_timeout_seconds: z.int32().min(5).max(604800).nullable().exactOptional(),
      metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
      members: z.array(LobbyMemberRequestSchema).max(25).nullable().exactOptional(),
      flags: z.xor([z.null().nullable(), z.literal(1)]).exactOptional(),
      override_event_webhooks_url: z.url().max(512).nullable().exactOptional(),
      name: z.string().min(1).max(100).nullable().exactOptional(),
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
    z.object({
      lobby_id: SnowflakeTypeSchema,
      channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
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
  .input(z.object({ lobby_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLobbiesLobbyIdMembersMeInvites = os
  .route({
    method: 'POST',
    path: '/lobbies/{lobby_id}/members/@me/invites',
    successDescription: '200 response for create_linked_lobby_guild_invite_for_self',
  })
  .input(z.object({ lobby_id: SnowflakeTypeSchema }))
  .output(LobbyGuildInviteResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLobbiesLobbyIdMembersBulk = os
  .route({
    method: 'POST',
    path: '/lobbies/{lobby_id}/members/bulk',
    successDescription: '200 response for bulk_update_lobby_members',
  })
  .input(z.object({ lobby_id: SnowflakeTypeSchema }))
  .output(z.array(LobbyMemberResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putLobbiesLobbyIdMembersUserId = os
  .route({
    method: 'PUT',
    path: '/lobbies/{lobby_id}/members/{user_id}',
    successDescription: '200 response for add_lobby_member',
  })
  .input(
    z.object({
      lobby_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
      flags: z.xor([z.null().nullable(), z.literal(1)]).exactOptional(),
      additional_name: z.string().min(1).max(80).nullable().exactOptional(),
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
  .input(z.object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLobbiesLobbyIdMembersUserIdInvites = os
  .route({
    method: 'POST',
    path: '/lobbies/{lobby_id}/members/{user_id}/invites',
    successDescription: '200 response for create_linked_lobby_guild_invite_for_user',
  })
  .input(z.object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .output(LobbyGuildInviteResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getLobbiesLobbyIdMessages = os
  .route({
    method: 'GET',
    path: '/lobbies/{lobby_id}/messages',
    successDescription: '200 response for get_lobby_messages',
  })
  .input(
    z.object({
      lobby_id: SnowflakeTypeSchema,
      limit: z.coerce.number().int().min(1).max(200).exactOptional(),
    }),
  )
  .output(z.array(LobbyMessageResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postLobbiesLobbyIdMessages = os
  .route({
    method: 'POST',
    path: '/lobbies/{lobby_id}/messages',
    successStatus: 201,
    successDescription: '201 response for create_lobby_message',
  })
  .input(
    z.object({
      lobby_id: SnowflakeTypeSchema,
      content: z.string().max(4000).nullable().exactOptional(),
      embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
      allowed_mentions: z
        .xor([z.null().nullable(), MessageAllowedMentionsRequestSchema])
        .exactOptional(),
      sticker_ids: z.array(SnowflakeTypeSchema).max(3).nullable().exactOptional(),
      components: z
        .array(
          z.xor([
            ActionRowComponentForMessageRequestSchema,
            ContainerComponentForMessageRequestSchema,
            FileComponentForMessageRequestSchema,
            MediaGalleryComponentForMessageRequestSchema,
            SectionComponentForMessageRequestSchema,
            SeparatorComponentForMessageRequestSchema,
            TextDisplayComponentForMessageRequestSchema,
          ]),
        )
        .max(40)
        .nullable()
        .exactOptional(),
      flags: z.int().nullable().exactOptional(),
      attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
      poll: z.xor([z.null().nullable(), PollCreateRequestSchema]).exactOptional(),
      shared_client_theme: z
        .xor([z.null().nullable(), CustomClientThemeShareRequestSchema])
        .exactOptional(),
      message_reference: z
        .xor([z.null().nullable(), MessageReferenceRequestSchema])
        .exactOptional(),
      nonce: z
        .xor([
          z
            .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
            .transform((val) => BigInt(val))
            .pipe(z.int64().min(-9223372036854776000n).max(9223372036854776000n)),
          z.string().max(25),
          z.null().nullable(),
        ])
        .exactOptional(),
      enforce_nonce: z.boolean().nullable().exactOptional(),
      tts: z.boolean().nullable().exactOptional(),
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
  .input(z.object({ lobby_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
