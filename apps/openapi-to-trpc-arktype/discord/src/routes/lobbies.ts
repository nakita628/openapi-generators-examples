import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
    )
    .output(LobbyResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbies: t.procedure
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
    )
    .output(LobbyResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getLobbiesLobbyId: t.procedure
    .input(type({ lobby_id: SnowflakeTypeSchema }))
    .output(LobbyResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLobbiesLobbyId: t.procedure.input(type({ lobby_id: SnowflakeTypeSchema })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  patchLobbiesLobbyId: t.procedure
    .input(
      type({
        lobby_id: SnowflakeTypeSchema,
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
    )
    .output(LobbyResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchLobbiesLobbyIdChannelLinking: t.procedure
    .input(
      type({
        lobby_id: SnowflakeTypeSchema,
        'channel_id?': type('null | null').or(SnowflakeTypeSchema),
      }),
    )
    .output(LobbyResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLobbiesLobbyIdMembersMe: t.procedure
    .input(type({ lobby_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMembersMeInvites: t.procedure
    .input(type({ lobby_id: SnowflakeTypeSchema }))
    .output(LobbyGuildInviteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMembersBulk: t.procedure
    .input(
      type({
        lobby_id: SnowflakeTypeSchema,
        body: type(
          type(type(BulkLobbyMemberRequestSchema).array()).and(type('1 <= unknown[] <= 25')),
        ).or('null'),
      }),
    )
    .output(type(type(LobbyMemberResponseSchema).array()).or('null'))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putLobbiesLobbyIdMembersUserId: t.procedure
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
        'flags?': 'null | null | 1',
        'additional_name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
        ).or('null'),
      }),
    )
    .output(LobbyMemberResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteLobbiesLobbyIdMembersUserId: t.procedure
    .input(type({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMembersUserIdInvites: t.procedure
    .input(type({ lobby_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(LobbyGuildInviteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getLobbiesLobbyIdMessages: t.procedure
    .input(
      type({
        lobby_id: SnowflakeTypeSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 200',
      }),
    )
    .output(type(type(LobbyMessageResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postLobbiesLobbyIdMessages: t.procedure
    .input(
      type({
        lobby_id: SnowflakeTypeSchema,
        'content?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
          ),
        ).or('null'),
        'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or(
          'null',
        ),
        'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
        'sticker_ids?': type(
          type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 3')),
        ).or('null'),
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
        'flags?': 'number.integer | null',
        'attachments?': type(
          type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
        ).or('null'),
        'poll?': type('null | null').or(PollCreateRequestSchema),
        'shared_client_theme?': type('null | null').or(CustomClientThemeShareRequestSchema),
        'message_reference?': type('null | null').or(MessageReferenceRequestSchema),
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
                  data >= -9223372036854776000n || ctx.mustBe('at least -9223372036854776000'),
              )
              .narrow(
                (data, ctx) =>
                  data <= 9223372036854776000n || ctx.mustBe('at most 9223372036854776000'),
              ),
          ).or(
            type('string').narrow(
              (data, ctx) => [...data].length <= 25 || ctx.mustBe('at most 25 characters'),
            ),
          ),
        ).or('null | null'),
        'enforce_nonce?': 'boolean | null',
        'tts?': 'boolean | null',
      }),
    )
    .output(LobbyMessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putLobbiesLobbyIdMessagesMessageIdModerationMetadata: t.procedure
    .input(
      type({
        lobby_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        body: type({
          '[string]': type('string').narrow(
            (data, ctx) => [...data].length <= 2000 || ctx.mustBe('at most 2000 characters'),
          ),
        }).describe('The moderation metadata attached to the message'),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
