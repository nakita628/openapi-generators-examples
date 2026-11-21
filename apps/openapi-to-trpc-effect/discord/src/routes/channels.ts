import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
    .input(Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          GuildChannelResponseSchema,
          PrivateChannelResponseSchema,
          PrivateGroupChannelResponseSchema,
          ThreadResponseSchema,
        ]),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          GuildChannelResponseSchema,
          PrivateChannelResponseSchema,
          PrivateGroupChannelResponseSchema,
          ThreadResponseSchema,
        ]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchChannelsChannelId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          body: Schema.Union([
            UpdateDMRequestPartialSchema,
            UpdateGroupDMRequestPartialSchema,
            UpdateGuildChannelRequestPartialSchema,
            UpdateThreadRequestPartialSchema,
          ]),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          GuildChannelResponseSchema,
          PrivateChannelResponseSchema,
          PrivateGroupChannelResponseSchema,
          ThreadResponseSchema,
        ]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdFollowers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, webhook_channel_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ChannelFollowerResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdInvites: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.NullOr(
          Schema.Array(
            Schema.Union([
              FriendInviteResponseSchema,
              GroupDMInviteResponseSchema,
              GuildInviteResponseSchema,
              Schema.NullOr(Schema.Null),
            ]),
          ),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdInvites: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          body: Schema.Union([CreateGroupDMInviteRequestSchema, CreateGuildInviteRequestSchema]),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          FriendInviteResponseSchema,
          GroupDMInviteResponseSchema,
          GuildInviteResponseSchema,
        ]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessages: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          around: Schema.optional(SnowflakeTypeSchema),
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(MessageResponseSchema))))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessages: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          content: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 4000, {
                  expected: 'a string of at most 4000 characters',
                }),
              ),
            ),
          ),
          embeds: Schema.optional(
            Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
          ),
          allowed_mentions: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), MessageAllowedMentionsRequestSchema]),
          ),
          sticker_ids: Schema.optional(
            Schema.NullOr(Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(3))),
          ),
          components: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Union([
                  ActionRowComponentForMessageRequestSchema,
                  ContainerComponentForMessageRequestSchema,
                  FileComponentForMessageRequestSchema,
                  MediaGalleryComponentForMessageRequestSchema,
                  SectionComponentForMessageRequestSchema,
                  SeparatorComponentForMessageRequestSchema,
                  TextDisplayComponentForMessageRequestSchema,
                ]),
              ).check(Schema.isMaxLength(40)),
            ),
          ),
          flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
          attachments: Schema.optional(
            Schema.NullOr(
              Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10)),
            ),
          ),
          poll: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), PollCreateRequestSchema]),
          ),
          shared_client_theme: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), CustomClientThemeShareRequestSchema]),
          ),
          message_reference: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), MessageReferenceRequestSchema]),
          ),
          nonce: Schema.optional(
            Schema.Union([
              Schema.Union([
                Schema.BigInt,
                Schema.Number.check(Schema.isInt()),
                Schema.String.check(Schema.isPattern(/^-?\d+$/)),
              ])
                .pipe(
                  Schema.decodeTo(
                    Schema.BigInt,
                    SchemaTransformation.transform({
                      decode: (input) => BigInt(input),
                      encode: (output) => output,
                    }),
                  ),
                )
                .check(
                  Schema.isBetweenBigInt({
                    minimum: -9223372036854775808n,
                    maximum: 9223372036854775807n,
                  }),
                  Schema.isGreaterThanOrEqualToBigInt(-9223372036854776000n),
                  Schema.isLessThanOrEqualToBigInt(9223372036854776000n),
                ),
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 25, {
                  expected: 'a string of at most 25 characters',
                }),
              ),
              Schema.NullOr(Schema.Null),
            ]),
          ),
          enforce_nonce: Schema.optional(Schema.NullOr(Schema.Boolean)),
          tts: Schema.optional(Schema.NullOr(Schema.Boolean)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessagesBulkDelete: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          messages: Schema.Array(SnowflakeTypeSchema).check(
            Schema.isMinLength(2),
            Schema.isMaxLength(100),
            Schema.isUnique(),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessagesPins: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          before: Schema.optional(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(50),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PinnedMessagesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdMessagesPinsMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesPinsMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessagesMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchChannelsChannelIdMessagesMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          content: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 4000, {
                  expected: 'a string of at most 4000 characters',
                }),
              ),
            ),
          ),
          embeds: Schema.optional(
            Schema.NullOr(Schema.Array(RichEmbedSchema).check(Schema.isMaxLength(10))),
          ),
          flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
          allowed_mentions: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), MessageAllowedMentionsRequestSchema]),
          ),
          sticker_ids: Schema.optional(
            Schema.NullOr(Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(1521))),
          ),
          components: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Union([
                  ActionRowComponentForMessageRequestSchema,
                  ContainerComponentForMessageRequestSchema,
                  FileComponentForMessageRequestSchema,
                  MediaGalleryComponentForMessageRequestSchema,
                  SectionComponentForMessageRequestSchema,
                  SeparatorComponentForMessageRequestSchema,
                  TextDisplayComponentForMessageRequestSchema,
                ]),
              ).check(Schema.isMaxLength(40)),
            ),
          ),
          attachments: Schema.optional(
            Schema.NullOr(
              Schema.Array(MessageAttachmentRequestSchema).check(Schema.isMaxLength(10)),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessagesMessageIdCrosspost: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdMessagesMessageIdReactionsEmojiName: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          emoji_name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          after: Schema.optional(SnowflakeTypeSchema),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          type: Schema.optional(ReactionTypesSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Array(UserResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiName: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          emoji_name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          emoji_name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          emoji_name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          emoji_name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          user_id: SnowflakeTypeSchema,
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdMessagesMessageIdThreads: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 100, {
              expected: 'a string of at most 100 characters',
            }),
          ),
          auto_archive_duration: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ThreadAutoArchiveDurationSchema]),
          ),
          rate_limit_per_user: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt32(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(21600),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreadResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPermissionsMemberUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          implicit: Schema.optional(Schema.Boolean),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PermissionsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPermissionsRoleRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          role_id: SnowflakeTypeSchema,
          implicit: Schema.optional(Schema.Boolean),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PermissionsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdPermissionsOverwriteId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          overwrite_id: SnowflakeTypeSchema,
          type: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ChannelPermissionOverwritesSchema]),
          ),
          allow: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
          deny: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdPermissionsOverwriteId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, overwrite_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPins: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(MessageResponseSchema))))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdPinsMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdPinsMessageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdPollsMessageIdAnswersAnswerId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          message_id: SnowflakeTypeSchema,
          answer_id: Schema.Number.check(
            Schema.isInt32(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(10),
          ),
          after: Schema.optional(SnowflakeTypeSchema),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PollAnswerDetailsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdPollsMessageIdExpire: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, message_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(MessageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdRecipientsUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          access_token: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 152133, {
                  expected: 'a string of at most 152133 characters',
                }),
              ),
            ),
          ),
          nick: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 152133, {
                  expected: 'a string of at most 152133 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdRecipientsUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdSendSoundboardSound: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          sound_id: SnowflakeTypeSchema,
          source_guild_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadMembers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          with_member: Schema.optional(Schema.Boolean),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          after: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Array(ThreadMemberResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdThreadMembersMe: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdThreadMembersMe: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadMembersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          with_member: Schema.optional(Schema.Boolean),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreadMemberResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdThreadMembersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChannelsChannelIdThreadMembersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ channel_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdThreads: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          body: Schema.Union([
            CreateForumThreadRequestSchema,
            CreateTextThreadWithoutMessageRequestSchema,
          ]),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CreatedThreadResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadsArchivedPrivate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          before: Schema.optional(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(2),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreadsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadsArchivedPublic: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          before: Schema.optional(
            Schema.String.check(
              Schema.isPattern(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(2),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreadsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdThreadsSearch: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 100, {
                expected: 'a string of at most 100 characters',
              }),
            ),
          ),
          slop: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          min_id: Schema.optional(SnowflakeTypeSchema),
          max_id: Schema.optional(SnowflakeTypeSchema),
          tag: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(20), Schema.isUnique()),
            ]),
          ),
          tag_setting: Schema.optional(ThreadSearchTagSettingSchema),
          archived: Schema.optional(Schema.Boolean),
          sort_by: Schema.optional(ThreadSortingModeSchema),
          sort_order: Schema.optional(SortingOrderSchema),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(25),
            ),
          ),
          offset: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(9975),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreadSearchResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdTyping: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(TypingIndicatorResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdUsersMeThreadsArchivedPrivate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          before: Schema.optional(SnowflakeTypeSchema),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(2),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ThreadsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putChannelsChannelIdVoiceStatus: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          status: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 500, {
                  expected: 'a string of at most 500 characters',
                }),
              ),
            ).annotate({ description: 'The new voice channel status' }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChannelsChannelIdWebhooks: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ channel_id: SnowflakeTypeSchema })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.NullOr(
          Schema.Array(
            Schema.Union([
              ApplicationIncomingWebhookResponseSchema,
              ChannelFollowerWebhookResponseSchema,
              GuildIncomingWebhookResponseSchema,
            ]),
          ),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChannelsChannelIdWebhooks: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          channel_id: SnowflakeTypeSchema,
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 80, {
              expected: 'a string of at most 80 characters',
            }),
          ),
          avatar: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildIncomingWebhookResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
