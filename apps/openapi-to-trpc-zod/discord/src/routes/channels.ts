import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  ActionRowComponentForMessageRequestSchema,
  ApplicationIncomingWebhookResponseSchema,
  ChannelFollowerResponseSchema,
  ChannelFollowerWebhookResponseSchema,
  ChannelPermissionOverwritesSchema,
  ContainerComponentForMessageRequestSchema,
  CreateForumThreadRequestSchema,
  CreateGroupDMInviteRequestSchema,
  CreateGuildInviteRequestSchema,
  CreateTextThreadWithoutMessageRequestSchema,
  CreatedThreadResponseSchema,
  CustomClientThemeShareRequestSchema,
  FileComponentForMessageRequestSchema,
  FriendInviteResponseSchema,
  GroupDMInviteResponseSchema,
  GuildChannelResponseSchema,
  GuildIncomingWebhookResponseSchema,
  GuildInviteResponseSchema,
  MediaGalleryComponentForMessageRequestSchema,
  MessageAllowedMentionsRequestSchema,
  MessageAttachmentRequestSchema,
  MessageReferenceRequestSchema,
  MessageResponseSchema,
  PermissionsResponseSchema,
  PinnedMessagesResponseSchema,
  PollAnswerDetailsResponseSchema,
  PollCreateRequestSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  ReactionTypesSchema,
  RichEmbedSchema,
  SectionComponentForMessageRequestSchema,
  SeparatorComponentForMessageRequestSchema,
  SnowflakeTypeSchema,
  SortingOrderSchema,
  TextDisplayComponentForMessageRequestSchema,
  ThreadAutoArchiveDurationSchema,
  ThreadMemberResponseSchema,
  ThreadResponseSchema,
  ThreadSearchResponseSchema,
  ThreadSearchTagSettingSchema,
  ThreadSortingModeSchema,
  ThreadsResponseSchema,
  TypingIndicatorResponseSchema,
  UpdateDMRequestPartialSchema,
  UpdateGroupDMRequestPartialSchema,
  UpdateGuildChannelRequestPartialSchema,
  UpdateThreadRequestPartialSchema,
  UserResponseSchema,
} from '../components'

const t = initTRPC.create()

export const channelsRouter = t.router({
  getChannelsChannelId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      z.xor([
        GuildChannelResponseSchema,
        PrivateChannelResponseSchema,
        PrivateGroupChannelResponseSchema,
        ThreadResponseSchema,
      ]),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      z.xor([
        GuildChannelResponseSchema,
        PrivateChannelResponseSchema,
        PrivateGroupChannelResponseSchema,
        ThreadResponseSchema,
      ]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchChannelsChannelId: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        body: z.union([
          UpdateDMRequestPartialSchema,
          UpdateGroupDMRequestPartialSchema,
          UpdateGuildChannelRequestPartialSchema,
          UpdateThreadRequestPartialSchema,
        ]),
      }),
    )
    .output(
      z.xor([
        GuildChannelResponseSchema,
        PrivateChannelResponseSchema,
        PrivateGroupChannelResponseSchema,
        ThreadResponseSchema,
      ]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdFollowers: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, webhook_channel_id: SnowflakeTypeSchema }))
    .output(ChannelFollowerResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdInvites: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            FriendInviteResponseSchema,
            GroupDMInviteResponseSchema,
            GuildInviteResponseSchema,
            z.null(),
          ]),
        )
        .nullable(),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdInvites: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        body: z.union([CreateGroupDMInviteRequestSchema, CreateGuildInviteRequestSchema]),
      }),
    )
    .output(
      z.xor([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessages: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        around: SnowflakeTypeSchema.exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.int().min(1).max(100).exactOptional(),
      }),
    )
    .output(z.array(MessageResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessages: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
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
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessagesBulkDelete: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        messages: z
          .array(SnowflakeTypeSchema)
          .min(2)
          .max(100)
          .refine((val) => new Set(val).size === val.length),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessagesPins: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        before: z.iso.datetime({ offset: true }).exactOptional(),
        limit: z.int().min(1).max(50).exactOptional(),
      }),
    )
    .output(PinnedMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdMessagesPinsMessageId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesPinsMessageId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessagesMessageId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchChannelsChannelIdMessagesMessageId: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        content: z.string().max(4000).nullable().exactOptional(),
        embeds: z.array(RichEmbedSchema).max(10).nullable().exactOptional(),
        flags: z.int().nullable().exactOptional(),
        allowed_mentions: z.xor([z.null(), MessageAllowedMentionsRequestSchema]).exactOptional(),
        sticker_ids: z.array(SnowflakeTypeSchema).max(1521).nullable().exactOptional(),
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
        attachments: z.array(MessageAttachmentRequestSchema).max(10).nullable().exactOptional(),
      }),
    )
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessagesMessageIdCrosspost: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactions: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessagesMessageIdReactionsEmojiName: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.int().min(1).max(100).exactOptional(),
        type: ReactionTypesSchema.exactOptional(),
      }),
    )
    .output(z.array(UserResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiName: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: z.string().max(152133),
        user_id: SnowflakeTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessagesMessageIdThreads: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(100),
        auto_archive_duration: z.xor([z.null(), ThreadAutoArchiveDurationSchema]).exactOptional(),
        rate_limit_per_user: z.int32().min(0).max(21600).nullable().exactOptional(),
      }),
    )
    .output(ThreadResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPermissionsMemberUserId: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        implicit: z.boolean().exactOptional(),
      }),
    )
    .output(PermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPermissionsRoleRoleId: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
        implicit: z.boolean().exactOptional(),
      }),
    )
    .output(PermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdPermissionsOverwriteId: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        overwrite_id: SnowflakeTypeSchema,
        type: z.xor([z.null(), ChannelPermissionOverwritesSchema]).exactOptional(),
        allow: z.int().nullable().exactOptional(),
        deny: z.int().nullable().exactOptional(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdPermissionsOverwriteId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPins: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(z.array(MessageResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdPinsMessageId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdPinsMessageId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPollsMessageIdAnswersAnswerId: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        answer_id: z.int32().min(1).max(10),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.int().min(1).max(100).exactOptional(),
      }),
    )
    .output(PollAnswerDetailsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdPollsMessageIdExpire: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdRecipientsUserId: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        access_token: z.string().max(152133).nullable().exactOptional(),
        nick: z.string().max(152133).nullable().exactOptional(),
      }),
    )
    .output(z.xor([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdRecipientsUserId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdSendSoundboardSound: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        sound_id: SnowflakeTypeSchema,
        source_guild_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadMembers: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        with_member: z.boolean().exactOptional(),
        limit: z.int().min(1).max(100).exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(z.array(ThreadMemberResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdThreadMembersMe: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdThreadMembersMe: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadMembersUserId: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        with_member: z.boolean().exactOptional(),
      }),
    )
    .output(ThreadMemberResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdThreadMembersUserId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdThreadMembersUserId: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdThreads: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        body: z.union([
          CreateForumThreadRequestSchema,
          CreateTextThreadWithoutMessageRequestSchema,
        ]),
      }),
    )
    .output(CreatedThreadResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadsArchivedPrivate: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        before: z.iso.datetime({ offset: true }).exactOptional(),
        limit: z.int().min(2).max(100).exactOptional(),
      }),
    )
    .output(ThreadsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadsArchivedPublic: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        before: z.iso.datetime({ offset: true }).exactOptional(),
        limit: z.int().min(2).max(100).exactOptional(),
      }),
    )
    .output(ThreadsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadsSearch: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        name: z.string().max(100).exactOptional(),
        slop: z.int().min(0).max(100).exactOptional(),
        min_id: SnowflakeTypeSchema.exactOptional(),
        max_id: SnowflakeTypeSchema.exactOptional(),
        tag: z
          .xor([
            z.string(),
            z
              .array(SnowflakeTypeSchema)
              .max(20)
              .refine((val) => new Set(val).size === val.length),
          ])
          .exactOptional(),
        tag_setting: ThreadSearchTagSettingSchema.exactOptional(),
        archived: z.boolean().exactOptional(),
        sort_by: ThreadSortingModeSchema.exactOptional(),
        sort_order: SortingOrderSchema.exactOptional(),
        limit: z.int().min(1).max(25).exactOptional(),
        offset: z.int().min(0).max(9975).exactOptional(),
      }),
    )
    .output(ThreadSearchResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdTyping: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(TypingIndicatorResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdUsersMeThreadsArchivedPrivate: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        before: SnowflakeTypeSchema.exactOptional(),
        limit: z.int().min(2).max(100).exactOptional(),
      }),
    )
    .output(ThreadsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdVoiceStatus: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        status: z
          .string()
          .max(500)
          .nullable()
          .meta({ description: 'The new voice channel status' })
          .exactOptional(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdWebhooks: t.procedure
    .input(z.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            ApplicationIncomingWebhookResponseSchema,
            ChannelFollowerWebhookResponseSchema,
            GuildIncomingWebhookResponseSchema,
          ]),
        )
        .nullable(),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdWebhooks: t.procedure
    .input(
      z.object({
        channel_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(80),
        avatar: z.string().nullable().exactOptional(),
      }),
    )
    .output(GuildIncomingWebhookResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
