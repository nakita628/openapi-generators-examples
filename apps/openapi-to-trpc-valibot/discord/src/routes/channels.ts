import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      v.union([
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
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      v.union([
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        body: v.union([
          UpdateDMRequestPartialSchema,
          UpdateGroupDMRequestPartialSchema,
          UpdateGuildChannelRequestPartialSchema,
          UpdateThreadRequestPartialSchema,
        ]),
      }),
    )
    .output(
      v.union([
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
    .input(v.object({ channel_id: SnowflakeTypeSchema, webhook_channel_id: SnowflakeTypeSchema }))
    .output(ChannelFollowerResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdInvites: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            FriendInviteResponseSchema,
            GroupDMInviteResponseSchema,
            GuildInviteResponseSchema,
            v.null(),
          ]),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdInvites: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        body: v.union([CreateGroupDMInviteRequestSchema, CreateGuildInviteRequestSchema]),
      }),
    )
    .output(
      v.union([FriendInviteResponseSchema, GroupDMInviteResponseSchema, GuildInviteResponseSchema]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessages: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        around: v.optional(SnowflakeTypeSchema),
        before: v.optional(SnowflakeTypeSchema),
        after: v.optional(SnowflakeTypeSchema),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100))),
      }),
    )
    .output(v.nullable(v.array(MessageResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessages: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(4000)))),
        embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
        allowed_mentions: v.optional(v.union([v.null(), MessageAllowedMentionsRequestSchema])),
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
        poll: v.optional(v.union([v.null(), PollCreateRequestSchema])),
        shared_client_theme: v.optional(v.union([v.null(), CustomClientThemeShareRequestSchema])),
        message_reference: v.optional(v.union([v.null(), MessageReferenceRequestSchema])),
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
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775808n),
            ),
            v.pipe(v.string(), v.maxCodePoints(25)),
            v.null(),
          ]),
        ),
        enforce_nonce: v.optional(v.nullable(v.boolean())),
        tts: v.optional(v.nullable(v.boolean())),
      }),
    )
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessagesBulkDelete: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        messages: v.pipe(
          v.array(SnowflakeTypeSchema),
          v.minLength(2),
          v.maxLength(100),
          v.check((input) => new Set(input).size === input.length),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessagesPins: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        before: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(50))),
      }),
    )
    .output(PinnedMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdMessagesPinsMessageId: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesPinsMessageId: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessagesMessageId: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageId: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchChannelsChannelIdMessagesMessageId: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        content: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(4000)))),
        embeds: v.optional(v.nullable(v.pipe(v.array(RichEmbedSchema), v.maxLength(10)))),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        allowed_mentions: v.optional(v.union([v.null(), MessageAllowedMentionsRequestSchema])),
        sticker_ids: v.optional(
          v.nullable(v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(1521))),
        ),
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
        attachments: v.optional(
          v.nullable(v.pipe(v.array(MessageAttachmentRequestSchema), v.maxLength(10))),
        ),
      }),
    )
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessagesMessageIdCrosspost: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactions: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessagesMessageIdReactionsEmojiName: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
        after: v.optional(SnowflakeTypeSchema),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100))),
        type: v.optional(ReactionTypesSchema),
      }),
    )
    .output(v.array(UserResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiName: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: v.pipe(v.string(), v.maxCodePoints(152133)),
        user_id: SnowflakeTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessagesMessageIdThreads: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
        auto_archive_duration: v.optional(v.union([v.null(), ThreadAutoArchiveDurationSchema])),
        rate_limit_per_user: v.optional(
          v.nullable(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(0),
              v.maxValue(21600),
            ),
          ),
        ),
      }),
    )
    .output(ThreadResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPermissionsMemberUserId: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        implicit: v.optional(v.boolean()),
      }),
    )
    .output(PermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPermissionsRoleRoleId: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
        implicit: v.optional(v.boolean()),
      }),
    )
    .output(PermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdPermissionsOverwriteId: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        overwrite_id: SnowflakeTypeSchema,
        type: v.optional(v.union([v.null(), ChannelPermissionOverwritesSchema])),
        allow: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        deny: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdPermissionsOverwriteId: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPins: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(MessageResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdPinsMessageId: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdPinsMessageId: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPollsMessageIdAnswersAnswerId: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        answer_id: v.pipe(
          v.number(),
          v.integer(),
          v.minValue(-2147483648),
          v.maxValue(2147483647),
          v.minValue(1),
          v.maxValue(10),
        ),
        after: v.optional(SnowflakeTypeSchema),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100))),
      }),
    )
    .output(PollAnswerDetailsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdPollsMessageIdExpire: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdRecipientsUserId: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        access_token: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
        nick: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
      }),
    )
    .output(v.union([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdRecipientsUserId: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdSendSoundboardSound: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        sound_id: SnowflakeTypeSchema,
        source_guild_id: v.optional(v.union([v.null(), SnowflakeTypeSchema])),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadMembers: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        with_member: v.optional(v.boolean()),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100))),
        after: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(v.array(ThreadMemberResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdThreadMembersMe: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdThreadMembersMe: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadMembersUserId: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        with_member: v.optional(v.boolean()),
      }),
    )
    .output(ThreadMemberResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdThreadMembersUserId: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdThreadMembersUserId: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdThreads: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        body: v.union([
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
      v.object({
        channel_id: SnowflakeTypeSchema,
        before: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(2), v.maxValue(100))),
      }),
    )
    .output(ThreadsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadsArchivedPublic: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        before: v.optional(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
        ),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(2), v.maxValue(100))),
      }),
    )
    .output(ThreadsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadsSearch: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.maxCodePoints(100))),
        slop: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100))),
        min_id: v.optional(SnowflakeTypeSchema),
        max_id: v.optional(SnowflakeTypeSchema),
        tag: v.optional(
          v.union([
            v.string(),
            v.pipe(
              v.array(SnowflakeTypeSchema),
              v.maxLength(20),
              v.check((input) => new Set(input).size === input.length),
            ),
          ]),
        ),
        tag_setting: v.optional(ThreadSearchTagSettingSchema),
        archived: v.optional(v.boolean()),
        sort_by: v.optional(ThreadSortingModeSchema),
        sort_order: v.optional(SortingOrderSchema),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(25))),
        offset: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(9975))),
      }),
    )
    .output(ThreadSearchResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdTyping: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(TypingIndicatorResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdUsersMeThreadsArchivedPrivate: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        before: v.optional(SnowflakeTypeSchema),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(2), v.maxValue(100))),
      }),
    )
    .output(ThreadsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdVoiceStatus: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        status: v.optional(
          v.pipe(
            v.nullable(v.pipe(v.string(), v.maxCodePoints(500))),
            v.description('The new voice channel status'),
          ),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdWebhooks: t.procedure
    .input(v.object({ channel_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            ApplicationIncomingWebhookResponseSchema,
            ChannelFollowerWebhookResponseSchema,
            GuildIncomingWebhookResponseSchema,
          ]),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdWebhooks: t.procedure
    .input(
      v.object({
        channel_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(80)),
        avatar: v.optional(v.nullable(v.string())),
      }),
    )
    .output(GuildIncomingWebhookResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
