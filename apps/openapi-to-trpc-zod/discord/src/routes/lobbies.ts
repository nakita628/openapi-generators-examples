import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  ActionRowComponentForMessageRequestSchema,
  BulkLobbyMemberRequestSchema,
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

const t = initTRPC.create()

export const lobbiesRouter = t.router({
  putLobbies: t.procedure
    .input(
      z.object({
        idle_timeout_seconds: z.int32().min(5).max(604800).nullable().exactOptional(),
        lobby_metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
        member_metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
        secret: z.string().max(250),
        flags: z.xor([z.null(), z.literal(1)]).exactOptional(),
        name: z.string().min(1).max(100).nullable().exactOptional(),
      }),
    )
    .output(LobbyResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbies: t.procedure
    .input(
      z.object({
        idle_timeout_seconds: z.int32().min(5).max(604800).nullable().exactOptional(),
        members: z.array(LobbyMemberRequestSchema).max(25).nullable().exactOptional(),
        metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
        flags: z.xor([z.null(), z.literal(1)]).exactOptional(),
        override_event_webhooks_url: z.url().max(512).nullable().exactOptional(),
        name: z.string().min(1).max(100).nullable().exactOptional(),
      }),
    )
    .output(LobbyResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getLobbiesLobbyId: t.procedure
    .input(z.object({ lobby_id: SnowflakeTypeSchema }))
    .output(LobbyResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLobbiesLobbyId: t.procedure
    .input(z.object({ lobby_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchLobbiesLobbyId: t.procedure
    .input(
      z.object({
        lobby_id: SnowflakeTypeSchema,
        idle_timeout_seconds: z.int32().min(5).max(604800).nullable().exactOptional(),
        metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
        members: z.array(LobbyMemberRequestSchema).max(25).nullable().exactOptional(),
        flags: z.xor([z.null(), z.literal(1)]).exactOptional(),
        override_event_webhooks_url: z.url().max(512).nullable().exactOptional(),
        name: z.string().min(1).max(100).nullable().exactOptional(),
      }),
    )
    .output(LobbyResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchLobbiesLobbyIdChannelLinking: t.procedure
    .input(
      z.object({
        lobby_id: SnowflakeTypeSchema,
        channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      }),
    )
    .output(LobbyResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLobbiesLobbyIdMembersMe: t.procedure
    .input(z.object({ lobby_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMembersMeInvites: t.procedure
    .input(z.object({ lobby_id: SnowflakeTypeSchema }))
    .output(LobbyGuildInviteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMembersBulk: t.procedure
    .input(
      z.object({
        lobby_id: SnowflakeTypeSchema,
        body: z.array(BulkLobbyMemberRequestSchema).min(1).max(25).nullable(),
      }),
    )
    .output(z.array(LobbyMemberResponseSchema).nullable())
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putLobbiesLobbyIdMembersUserId: t.procedure
    .input(
      z.object({
        lobby_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        metadata: z.record(z.string(), z.string().max(1024)).nullable().exactOptional(),
        flags: z.xor([z.null(), z.literal(1)]).exactOptional(),
        additional_name: z.string().min(1).max(80).nullable().exactOptional(),
      }),
    )
    .output(LobbyMemberResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLobbiesLobbyIdMembersUserId: t.procedure
    .input(z.object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMembersUserIdInvites: t.procedure
    .input(z.object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(LobbyGuildInviteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getLobbiesLobbyIdMessages: t.procedure
    .input(
      z.object({ lobby_id: SnowflakeTypeSchema, limit: z.int().min(1).max(200).exactOptional() }),
    )
    .output(z.array(LobbyMessageResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMessages: t.procedure
    .input(
      z.object({
        lobby_id: SnowflakeTypeSchema,
        content: z.string().max(4000).nullable().exactOptional(),
        embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
        allowed_mentions: z.xor([z.null(), MessageAllowedMentionsRequestSchema]).exactOptional(),
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
        poll: z.xor([z.null(), PollCreateRequestSchema]).exactOptional(),
        shared_client_theme: z.xor([z.null(), CustomClientThemeShareRequestSchema]).exactOptional(),
        message_reference: z.xor([z.null(), MessageReferenceRequestSchema]).exactOptional(),
        nonce: z
          .xor([
            z
              .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
              .transform((val) => BigInt(val))
              .pipe(z.int64().min(-9223372036854775808n).max(9223372036854775808n)),
            z.string().max(25),
            z.null(),
          ])
          .exactOptional(),
        enforce_nonce: z.boolean().nullable().exactOptional(),
        tts: z.boolean().nullable().exactOptional(),
      }),
    )
    .output(LobbyMessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putLobbiesLobbyIdMessagesMessageIdModerationMetadata: t.procedure
    .input(
      z.object({
        lobby_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        body: z
          .record(z.string(), z.string().max(2000))
          .meta({ description: 'The moderation metadata attached to the message' }),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
