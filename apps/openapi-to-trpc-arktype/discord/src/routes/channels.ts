import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(type(GuildChannelResponseSchema).or(PrivateChannelResponseSchema)).or(
          PrivateGroupChannelResponseSchema,
        ),
      ).or(ThreadResponseSchema),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(type(GuildChannelResponseSchema).or(PrivateChannelResponseSchema)).or(
          PrivateGroupChannelResponseSchema,
        ),
      ).or(ThreadResponseSchema),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchChannelsChannelId: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        body: type(
          type(type(UpdateDMRequestPartialSchema).or(UpdateGroupDMRequestPartialSchema)).or(
            UpdateGuildChannelRequestPartialSchema,
          ),
        ).or(UpdateThreadRequestPartialSchema),
      }),
    )
    .output(
      type(
        type(type(GuildChannelResponseSchema).or(PrivateChannelResponseSchema)).or(
          PrivateGroupChannelResponseSchema,
        ),
      ).or(ThreadResponseSchema),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdFollowers: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, webhook_channel_id: SnowflakeTypeSchema }))
    .output(ChannelFollowerResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdInvites: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
              GuildInviteResponseSchema,
            ),
          ).or('null | null'),
        ).array(),
      ).or('null'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdInvites: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        body: type(CreateGroupDMInviteRequestSchema).or(CreateGuildInviteRequestSchema),
      }),
    )
    .output(
      type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
        GuildInviteResponseSchema,
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessages: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'around?': SnowflakeTypeSchema,
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 100',
      }),
    )
    .output(type(type(MessageResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessages: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
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
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessagesBulkDelete: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        messages: type(type(SnowflakeTypeSchema).array())
          .and(type('2 <= unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessagesPins: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'before?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'limit?': 'number.integer >= 1 & number.integer <= 50',
      }),
    )
    .output(PinnedMessagesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdMessagesPinsMessageId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesPinsMessageId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessagesMessageId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchChannelsChannelIdMessagesMessageId: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        'content?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 4000 || ctx.mustBe('at most 4000 characters'),
          ),
        ).or('null'),
        'embeds?': type(type(type(RichEmbedSchema).array()).and(type('unknown[] <= 10'))).or(
          'null',
        ),
        'flags?': 'number.integer | null',
        'allowed_mentions?': type('null | null').or(MessageAllowedMentionsRequestSchema),
        'sticker_ids?': type(
          type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 1521')),
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
        'attachments?': type(
          type(type(MessageAttachmentRequestSchema).array()).and(type('unknown[] <= 10')),
        ).or('null'),
      }),
    )
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessagesMessageIdCrosspost: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactions: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessagesMessageIdReactionsEmojiName: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'after?': SnowflakeTypeSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 100',
        'type?': ReactionTypesSchema,
      }),
    )
    .output(type(UserResponseSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiName: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        emoji_name: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        user_id: SnowflakeTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessagesMessageIdThreads: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        'auto_archive_duration?': type('null | null').or(ThreadAutoArchiveDurationSchema),
        'rate_limit_per_user?':
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 & number.integer <= 21600 | null',
      }),
    )
    .output(ThreadResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPermissionsMemberUserId: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'implicit?': 'boolean',
      }),
    )
    .output(PermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPermissionsRoleRoleId: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
        'implicit?': 'boolean',
      }),
    )
    .output(PermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdPermissionsOverwriteId: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        overwrite_id: SnowflakeTypeSchema,
        'type?': type('null | null').or(ChannelPermissionOverwritesSchema),
        'allow?': 'number.integer | null',
        'deny?': 'number.integer | null',
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdPermissionsOverwriteId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPins: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(type(type(MessageResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdPinsMessageId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdPinsMessageId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPollsMessageIdAnswersAnswerId: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        message_id: SnowflakeTypeSchema,
        answer_id:
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 1 & number.integer <= 10',
        'after?': SnowflakeTypeSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 100',
      }),
    )
    .output(PollAnswerDetailsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdPollsMessageIdExpire: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }))
    .output(MessageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdRecipientsUserId: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'access_token?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
          ),
        ).or('null'),
        'nick?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
          ),
        ).or('null'),
      }),
    )
    .output(type(PrivateChannelResponseSchema).or(PrivateGroupChannelResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdRecipientsUserId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdSendSoundboardSound: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        sound_id: SnowflakeTypeSchema,
        'source_guild_id?': type('null | null').or(SnowflakeTypeSchema),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadMembers: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'with_member?': 'boolean',
        'limit?': 'number.integer >= 1 & number.integer <= 100',
        'after?': SnowflakeTypeSchema,
      }),
    )
    .output(type(ThreadMemberResponseSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdThreadMembersMe: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdThreadMembersMe: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadMembersUserId: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'with_member?': 'boolean',
      }),
    )
    .output(ThreadMemberResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdThreadMembersUserId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdThreadMembersUserId: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdThreads: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        body: type(CreateForumThreadRequestSchema).or(CreateTextThreadWithoutMessageRequestSchema),
      }),
    )
    .output(CreatedThreadResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadsArchivedPrivate: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'before?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'limit?': 'number.integer >= 2 & number.integer <= 100',
      }),
    )
    .output(ThreadsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadsArchivedPublic: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'before?': type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
        'limit?': 'number.integer >= 2 & number.integer <= 100',
      }),
    )
    .output(ThreadsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadsSearch: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'name?': type('string').narrow(
          (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
        ),
        'slop?': 'number.integer >= 0 & number.integer <= 100',
        'min_id?': SnowflakeTypeSchema,
        'max_id?': SnowflakeTypeSchema,
        'tag?': type('string').or(
          type(type(SnowflakeTypeSchema).array())
            .and(type('unknown[] <= 20'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
        'tag_setting?': ThreadSearchTagSettingSchema,
        'archived?': 'boolean',
        'sort_by?': ThreadSortingModeSchema,
        'sort_order?': SortingOrderSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 25',
        'offset?': 'number.integer >= 0 & number.integer <= 9975',
      }),
    )
    .output(ThreadSearchResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdTyping: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(TypingIndicatorResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdUsersMeThreadsArchivedPrivate: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'before?': SnowflakeTypeSchema,
        'limit?': 'number.integer >= 2 & number.integer <= 100',
      }),
    )
    .output(ThreadsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdVoiceStatus: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        'status?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 500 || ctx.mustBe('at most 500 characters'),
          ),
        )
          .or('null')
          .describe('The new voice channel status'),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdWebhooks: t.procedure
    .input(type({ channel_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(ApplicationIncomingWebhookResponseSchema).or(ChannelFollowerWebhookResponseSchema),
          ).or(GuildIncomingWebhookResponseSchema),
        ).array(),
      ).or('null'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdWebhooks: t.procedure
    .input(
      type({
        channel_id: SnowflakeTypeSchema,
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 80 || ctx.mustBe('at most 80 characters')),
        'avatar?': 'string | null',
      }),
    )
    .output(GuildIncomingWebhookResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
