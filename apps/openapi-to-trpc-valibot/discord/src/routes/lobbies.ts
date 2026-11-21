import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbies: t.procedure
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
          override_event_webhooks_url: v.nullable(
            v.pipe(v.string(), v.url(), v.maxCodePoints(512)),
          ),
          name: v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
        }),
      ),
    )
    .output(LobbyResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getLobbiesLobbyId: t.procedure
    .input(v.object({ lobby_id: SnowflakeTypeSchema }))
    .output(LobbyResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLobbiesLobbyId: t.procedure
    .input(v.object({ lobby_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchLobbiesLobbyId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchLobbiesLobbyIdChannelLinking: t.procedure
    .input(
      v.object({
        lobby_id: SnowflakeTypeSchema,
        channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
      }),
    )
    .output(LobbyResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLobbiesLobbyIdMembersMe: t.procedure
    .input(v.object({ lobby_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMembersMeInvites: t.procedure
    .input(v.object({ lobby_id: SnowflakeTypeSchema }))
    .output(LobbyGuildInviteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMembersBulk: t.procedure
    .input(
      v.object({
        lobby_id: SnowflakeTypeSchema,
        body: v.nullable(
          v.pipe(v.array(BulkLobbyMemberRequestSchema), v.minLength(1), v.maxLength(25)),
        ),
      }),
    )
    .output(v.nullable(v.array(LobbyMemberResponseSchema)))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putLobbiesLobbyIdMembersUserId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLobbiesLobbyIdMembersUserId: t.procedure
    .input(v.object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMembersUserIdInvites: t.procedure
    .input(v.object({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(LobbyGuildInviteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getLobbiesLobbyIdMessages: t.procedure
    .input(
      v.object({
        lobby_id: SnowflakeTypeSchema,
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(200))),
      }),
    )
    .output(v.nullable(v.array(LobbyMessageResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMessages: t.procedure
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
        message_reference: v.optional(
          v.union([v.nullable(v.null()), MessageReferenceRequestSchema]),
        ),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putLobbiesLobbyIdMessagesMessageIdModerationMetadata: t.procedure
    .input(
      v.object({
        lobby_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        body: v.pipe(
          v.record(v.string(), v.pipe(v.string(), v.maxCodePoints(2000))),
          v.description('The moderation metadata attached to the message'),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
