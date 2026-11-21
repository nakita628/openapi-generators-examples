import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  AfkTimeoutsSchema,
  ApplicationIncomingWebhookResponseSchema,
  AuditLogActionTypesSchema,
  AuthorTypeSchema,
  AvailableLocalesEnumSchema,
  BulkBanUsersResponseSchema,
  ChannelFollowerWebhookResponseSchema,
  ChannelPermissionOverwriteRequestSchema,
  ChannelTypesSchema,
  CreateOrUpdateThreadTagRequestSchema,
  DefaultKeywordListUpsertRequestPartialSchema,
  DefaultKeywordListUpsertRequestSchema,
  DefaultKeywordRuleResponseSchema,
  DiscordIntegrationResponseSchema,
  EmojiResponseSchema,
  ExternalConnectionIntegrationResponseSchema,
  ExternalScheduledEventCreateRequestSchema,
  ExternalScheduledEventPatchRequestPartialSchema,
  ExternalScheduledEventResponseSchema,
  ForumLayoutSchema,
  FriendInviteResponseSchema,
  GroupDMInviteResponseSchema,
  GuildAuditLogResponseSchema,
  GuildBanResponseSchema,
  GuildChannelResponseSchema,
  GuildExplicitContentFilterTypesSchema,
  GuildHomeSettingsResponseSchema,
  GuildIncidentsDataResponseSchema,
  GuildIncomingWebhookResponseSchema,
  GuildInviteResponseSchema,
  GuildJoinRequestApplicationStatusSchema,
  GuildJoinRequestResponseSchema,
  GuildJoinRequestsListResponseSchema,
  GuildMemberResponseSchema,
  GuildOnboardingModeSchema,
  GuildOnboardingResponseSchema,
  GuildPreviewResponseSchema,
  GuildPruneResponseSchema,
  GuildResponseSchema,
  GuildRoleResponseSchema,
  GuildScheduledEventExceptionResponseSchema,
  GuildSearchResponseSchema,
  GuildStickerResponseSchema,
  GuildSubscriptionIntegrationResponseSchema,
  GuildTemplateResponseSchema,
  GuildWelcomeChannelSchema,
  GuildWelcomeScreenResponseSchema,
  GuildWithCountsResponseSchema,
  HasOptionSchema,
  KeywordRuleResponseSchema,
  KeywordUpsertRequestPartialSchema,
  KeywordUpsertRequestSchema,
  ListGuildSoundboardSoundsResponseSchema,
  MLSpamRuleResponseSchema,
  MLSpamUpsertRequestPartialSchema,
  MLSpamUpsertRequestSchema,
  MentionSpamRuleResponseSchema,
  MentionSpamUpsertRequestPartialSchema,
  MentionSpamUpsertRequestSchema,
  PermissionsResponseSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  PrivateGuildMemberResponseSchema,
  RoleColorsSchema,
  ScheduledEventUserCountResponseSchema,
  ScheduledEventUserResponseSchema,
  SearchableEmbedTypeSchema,
  SnowflakeTypeSchema,
  SortingModeSchema,
  SortingOrderSchema,
  SoundboardSoundResponseSchema,
  StageScheduledEventCreateRequestSchema,
  StageScheduledEventPatchRequestPartialSchema,
  StageScheduledEventResponseSchema,
  ThreadAutoArchiveDurationSchema,
  ThreadResponseSchema,
  ThreadSearchTagSettingSchema,
  ThreadSortOrderSchema,
  ThreadsResponseSchema,
  UpdateDefaultReactionEmojiRequestSchema,
  UpdateOnboardingPromptRequestSchema,
  UpdateRolePositionsRequestSchema,
  UserGuildOnboardingResponseSchema,
  UserNotificationSettingsSchema,
  UserProfileRuleResponseSchema,
  UserProfileUpsertRequestPartialSchema,
  UserProfileUpsertRequestSchema,
  VanityURLResponseSchema,
  VerificationLevelsSchema,
  VideoQualityModesSchema,
  VoiceRegionResponseSchema,
  VoiceScheduledEventCreateRequestSchema,
  VoiceScheduledEventPatchRequestPartialSchema,
  VoiceScheduledEventResponseSchema,
  VoiceStateResponseSchema,
  WidgetImageStylesSchema,
  WidgetResponseSchema,
  WidgetSettingsResponseSchema,
} from '../components'

const t = initTRPC.create()

export const guildsRouter = t.router({
  getGuildsTemplatesCode: t.procedure
    .input(z.object({ code: z.string().max(152133) }))
    .output(GuildTemplateResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, with_counts: z.boolean().exactOptional() }))
    .output(GuildWithCountsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(100).exactOptional(),
        description: z.string().min(0).max(300).nullable().exactOptional(),
        region: z.string().nullable().exactOptional(),
        icon: z.string().nullable().exactOptional(),
        verification_level: z.xor([z.null().nullable(), VerificationLevelsSchema]).exactOptional(),
        default_message_notifications: z
          .xor([z.null().nullable(), UserNotificationSettingsSchema])
          .exactOptional(),
        explicit_content_filter: z
          .xor([z.null().nullable(), GuildExplicitContentFilterTypesSchema])
          .exactOptional(),
        preferred_locale: z.xor([z.null().nullable(), AvailableLocalesEnumSchema]).exactOptional(),
        afk_timeout: z.xor([z.null().nullable(), AfkTimeoutsSchema]).exactOptional(),
        afk_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        system_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        splash: z.string().nullable().exactOptional(),
        banner: z.string().nullable().exactOptional(),
        system_channel_flags: z.int().nullable().exactOptional(),
        features: z
          .array(z.string().max(152133).nullable())
          .max(1521)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        discovery_splash: z.string().nullable().exactOptional(),
        home_header: z.string().nullable().exactOptional(),
        rules_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        safety_alerts_channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        public_updates_channel_id: z
          .xor([z.null().nullable(), SnowflakeTypeSchema])
          .exactOptional(),
        premium_progress_bar_enabled: z.boolean().nullable().exactOptional(),
      }),
    )
    .output(GuildResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdAuditLogs: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema.exactOptional(),
        target_id: SnowflakeTypeSchema.exactOptional(),
        action_type: AuditLogActionTypesSchema.exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.int().min(1).max(100).exactOptional(),
      }),
    )
    .output(GuildAuditLogResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdAutoModerationRules: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            DefaultKeywordRuleResponseSchema,
            KeywordRuleResponseSchema,
            MLSpamRuleResponseSchema,
            MentionSpamRuleResponseSchema,
            UserProfileRuleResponseSchema,
            z.null().nullable(),
          ]),
        )
        .nullable(),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdAutoModerationRules: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        body: z.xor([
          DefaultKeywordListUpsertRequestSchema,
          KeywordUpsertRequestSchema,
          MLSpamUpsertRequestSchema,
          MentionSpamUpsertRequestSchema,
          UserProfileUpsertRequestSchema,
        ]),
      }),
    )
    .output(
      z.xor([
        DefaultKeywordRuleResponseSchema,
        KeywordRuleResponseSchema,
        MLSpamRuleResponseSchema,
        MentionSpamRuleResponseSchema,
        UserProfileRuleResponseSchema,
      ]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdAutoModerationRulesRuleId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
    .output(
      z.xor([
        DefaultKeywordRuleResponseSchema,
        KeywordRuleResponseSchema,
        MLSpamRuleResponseSchema,
        MentionSpamRuleResponseSchema,
        UserProfileRuleResponseSchema,
      ]),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdAutoModerationRulesRuleId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdAutoModerationRulesRuleId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        rule_id: SnowflakeTypeSchema,
        body: z.union([
          DefaultKeywordListUpsertRequestPartialSchema,
          KeywordUpsertRequestPartialSchema,
          MLSpamUpsertRequestPartialSchema,
          MentionSpamUpsertRequestPartialSchema,
          UserProfileUpsertRequestPartialSchema,
        ]),
      }),
    )
    .output(
      z.xor([
        DefaultKeywordRuleResponseSchema,
        KeywordRuleResponseSchema,
        MLSpamRuleResponseSchema,
        MentionSpamRuleResponseSchema,
        UserProfileRuleResponseSchema,
      ]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdBans: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        limit: z.int().min(1).max(1000).exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(z.array(GuildBanResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdBansUserId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(GuildBanResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdBansUserId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        delete_message_seconds: z.int().min(0).max(604800).nullable().exactOptional(),
        delete_message_days: z.int().min(0).max(7).nullable().exactOptional(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdBansUserId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdBulkBan: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_ids: z
          .array(SnowflakeTypeSchema)
          .max(200)
          .refine((val) => new Set(val).size === val.length),
        delete_message_seconds: z.int().min(0).max(604800).nullable().exactOptional(),
      }),
    )
    .output(BulkBanUsersResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdChannels: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            GuildChannelResponseSchema,
            PrivateChannelResponseSchema,
            PrivateGroupChannelResponseSchema,
            ThreadResponseSchema,
          ]),
        )
        .nullable(),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdChannels: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        type: z.xor([z.null().nullable(), ChannelTypesSchema]).exactOptional(),
        name: z.string().min(1).max(100),
        position: z.int32().min(0).nullable().exactOptional(),
        topic: z.string().min(0).max(4096).nullable().exactOptional(),
        bitrate: z.int32().min(8000).nullable().exactOptional(),
        user_limit: z.int32().min(0).nullable().exactOptional(),
        nsfw: z.boolean().nullable().exactOptional(),
        rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
        parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        permission_overwrites: z
          .array(ChannelPermissionOverwriteRequestSchema)
          .max(100)
          .nullable()
          .exactOptional(),
        rtc_region: z.string().nullable().exactOptional(),
        video_quality_mode: z.xor([z.null().nullable(), VideoQualityModesSchema]).exactOptional(),
        default_auto_archive_duration: z
          .xor([z.null().nullable(), ThreadAutoArchiveDurationSchema])
          .exactOptional(),
        default_reaction_emoji: z
          .xor([z.null().nullable(), UpdateDefaultReactionEmojiRequestSchema])
          .exactOptional(),
        default_thread_rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
        default_sort_order: z.xor([z.null().nullable(), ThreadSortOrderSchema]).exactOptional(),
        default_forum_layout: z.xor([z.null().nullable(), ForumLayoutSchema]).exactOptional(),
        default_tag_setting: z
          .xor([z.null().nullable(), ThreadSearchTagSettingSchema])
          .exactOptional(),
        available_tags: z
          .array(z.xor([z.null().nullable(), CreateOrUpdateThreadTagRequestSchema]))
          .max(20)
          .nullable()
          .exactOptional(),
      }),
    )
    .output(GuildChannelResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdChannels: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        body: z.array(
          z.object({
            id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
            position: z.int32().min(0).nullable().exactOptional(),
            parent_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
            lock_permissions: z.boolean().nullable().exactOptional(),
          }),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdEmojis: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.array(EmojiResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdEmojis: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(32),
        image: z.string(),
        roles: z
          .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
          .max(1521)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
      }),
    )
    .output(EmojiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdEmojisEmojiId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .output(EmojiResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdEmojisEmojiId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdEmojisEmojiId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        emoji_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(32).exactOptional(),
        roles: z
          .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
          .max(1521)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
      }),
    )
    .output(EmojiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdIncidentActions: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        invites_disabled_until: z.iso
          .datetime({ offset: true })
          .nullable()
          .meta({ description: 'When invites will be enabled again' })
          .exactOptional(),
        dms_disabled_until: z.iso
          .datetime({ offset: true })
          .nullable()
          .meta({ description: 'When direct messages will be enabled again' })
          .exactOptional(),
      }),
    )
    .output(GuildIncidentsDataResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdIntegrations: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            DiscordIntegrationResponseSchema,
            ExternalConnectionIntegrationResponseSchema,
            GuildSubscriptionIntegrationResponseSchema,
          ]),
        )
        .nullable(),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdIntegrationsIntegrationId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdInvites: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      z
        .array(
          z.xor([
            FriendInviteResponseSchema,
            GroupDMInviteResponseSchema,
            GuildInviteResponseSchema,
            z.null().nullable(),
          ]),
        )
        .nullable(),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMembers: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        limit: z.int().min(1).max(1000).exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(z.array(GuildMemberResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdMembersMe: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        nick: z.string().max(32).nullable().exactOptional(),
        avatar: z.string().nullable().exactOptional(),
        bio: z.string().max(300).nullable().exactOptional(),
        banner: z.string().nullable().exactOptional(),
      }),
    )
    .output(PrivateGuildMemberResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMembersSearch: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        limit: z.int().min(1).max(1000).exactOptional(),
        query: z.string().min(1).max(100),
      }),
    )
    .output(z.array(GuildMemberResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMembersUserId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(GuildMemberResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdMembersUserId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        nick: z.string().max(32).nullable().exactOptional(),
        roles: z
          .array(SnowflakeTypeSchema)
          .max(250)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        mute: z.boolean().nullable().exactOptional(),
        deaf: z.boolean().nullable().exactOptional(),
        access_token: z.string().max(10240),
        flags: z.int().nullable().exactOptional(),
      }),
    )
    .output(GuildMemberResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdMembersUserId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdMembersUserId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        nick: z.string().max(32).nullable().exactOptional(),
        roles: z
          .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
          .max(350)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        mute: z.boolean().nullable().exactOptional(),
        deaf: z.boolean().nullable().exactOptional(),
        channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        communication_disabled_until: z.iso.datetime({ offset: true }).nullable().exactOptional(),
        flags: z.int().nullable().exactOptional(),
      }),
    )
    .output(GuildMemberResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdMembersUserIdRolesRoleId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdMembersUserIdRolesRoleId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMessagesSearch: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        sort_by: SortingModeSchema.exactOptional(),
        sort_order: SortingOrderSchema.exactOptional(),
        content: z.string().max(1024).exactOptional(),
        slop: z.int().min(0).max(100).exactOptional(),
        author_id: z
          .array(SnowflakeTypeSchema)
          .max(100)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        author_type: z
          .array(AuthorTypeSchema)
          .max(6)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        mentions: z
          .array(SnowflakeTypeSchema)
          .max(100)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        mentions_role_id: z
          .array(SnowflakeTypeSchema)
          .max(100)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        replied_to_user_id: z
          .array(SnowflakeTypeSchema)
          .max(100)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        replied_to_message_id: z
          .array(SnowflakeTypeSchema)
          .max(100)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        mention_everyone: z.boolean().exactOptional(),
        min_id: SnowflakeTypeSchema.exactOptional(),
        max_id: SnowflakeTypeSchema.exactOptional(),
        limit: z.int().min(1).max(25).exactOptional(),
        offset: z.int().min(0).max(9975).exactOptional(),
        has: z
          .array(HasOptionSchema)
          .max(18)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        link_hostname: z
          .array(z.string().max(256))
          .max(100)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        embed_provider: z
          .array(z.string().max(256))
          .max(100)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        embed_type: z
          .array(SearchableEmbedTypeSchema)
          .max(5)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        attachment_extension: z
          .array(z.string().max(256))
          .max(100)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        attachment_filename: z
          .array(z.string().max(1024))
          .max(100)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
        pinned: z.boolean().exactOptional(),
        include_nsfw: z.boolean().exactOptional(),
        channel_id: z
          .array(SnowflakeTypeSchema)
          .max(500)
          .refine((val) => new Set(val).size === val.length)
          .exactOptional(),
      }),
    )
    .output(GuildSearchResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdNewMemberWelcome: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildHomeSettingsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdOnboarding: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(UserGuildOnboardingResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdOnboarding: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        prompts: z.array(UpdateOnboardingPromptRequestSchema).max(15).nullable().exactOptional(),
        enabled: z.boolean().nullable().exactOptional(),
        default_channel_ids: z
          .array(SnowflakeTypeSchema)
          .max(500)
          .refine((val) => new Set(val).size === val.length)
          .nullable()
          .exactOptional(),
        mode: z.xor([z.null().nullable(), GuildOnboardingModeSchema]).exactOptional(),
      }),
    )
    .output(GuildOnboardingResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPermissionsMemberUserId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(PermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPermissionsRoleRoleId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .output(PermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPreview: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildPreviewResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPrune: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        days: z.int().min(1).max(30).exactOptional(),
        include_roles: z
          .xor([
            z.string(),
            z
              .array(z.xor([z.null().nullable(), SnowflakeTypeSchema]))
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          ])
          .exactOptional(),
      }),
    )
    .output(GuildPruneResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdPrune: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        days: z.int().min(1).max(30).nullable().exactOptional(),
        compute_prune_count: z.boolean().nullable().exactOptional(),
        include_roles: z
          .xor([
            z.string(),
            z
              .array(SnowflakeTypeSchema)
              .max(100)
              .refine((val) => new Set(val).size === val.length),
            z.null().nullable(),
          ])
          .exactOptional(),
      }),
    )
    .output(GuildPruneResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRegions: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.array(VoiceRegionResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRequests: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        status: GuildJoinRequestApplicationStatusSchema.exactOptional(),
        limit: z.int().min(1).max(100).exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(GuildJoinRequestsListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdRequestsRequestId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        request_id: SnowflakeTypeSchema,
        action: GuildJoinRequestApplicationStatusSchema.meta({
          description: 'Whether to approve or reject the join request',
        }).exactOptional(),
        rejection_reason: z
          .string()
          .max(160)
          .nullable()
          .meta({ description: 'Reason for rejection. Only used when action is REJECTED' })
          .exactOptional(),
      }),
    )
    .output(GuildJoinRequestResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRoles: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.array(GuildRoleResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdRoles: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(100).nullable().exactOptional(),
        permissions: z.int().nullable().exactOptional(),
        color: z.int().min(0).max(16777215).nullable().exactOptional(),
        colors: z.xor([z.null().nullable(), RoleColorsSchema]).exactOptional(),
        hoist: z.boolean().nullable().exactOptional(),
        mentionable: z.boolean().nullable().exactOptional(),
        icon: z.string().nullable().exactOptional(),
        unicode_emoji: z.string().max(100).nullable().exactOptional(),
      }),
    )
    .output(GuildRoleResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdRoles: t.procedure
    .input(
      z.object({ guild_id: SnowflakeTypeSchema, body: z.array(UpdateRolePositionsRequestSchema) }),
    )
    .output(z.array(GuildRoleResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRolesMemberCounts: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.record(z.string(), z.int32()))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRolesRoleId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .output(GuildRoleResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdRolesRoleId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdRolesRoleId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(100).nullable().exactOptional(),
        permissions: z.int().nullable().exactOptional(),
        color: z.int().min(0).max(16777215).nullable().exactOptional(),
        colors: z.xor([z.null().nullable(), RoleColorsSchema]).exactOptional(),
        hoist: z.boolean().nullable().exactOptional(),
        mentionable: z.boolean().nullable().exactOptional(),
        icon: z.string().nullable().exactOptional(),
        unicode_emoji: z.string().max(100).nullable().exactOptional(),
      }),
    )
    .output(GuildRoleResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEvents: t.procedure
    .input(
      z.object({ guild_id: SnowflakeTypeSchema, with_user_count: z.boolean().exactOptional() }),
    )
    .output(
      z
        .array(
          z.xor([
            ExternalScheduledEventResponseSchema,
            StageScheduledEventResponseSchema,
            VoiceScheduledEventResponseSchema,
          ]),
        )
        .nullable(),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdScheduledEvents: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        body: z.xor([
          ExternalScheduledEventCreateRequestSchema,
          StageScheduledEventCreateRequestSchema,
          VoiceScheduledEventCreateRequestSchema,
        ]),
      }),
    )
    .output(
      z.xor([
        ExternalScheduledEventResponseSchema,
        StageScheduledEventResponseSchema,
        VoiceScheduledEventResponseSchema,
      ]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        with_user_count: z.boolean().exactOptional(),
      }),
    )
    .output(
      z.xor([
        ExternalScheduledEventResponseSchema,
        StageScheduledEventResponseSchema,
        VoiceScheduledEventResponseSchema,
      ]),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdScheduledEventsGuildScheduledEventId: t.procedure
    .input(
      z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdScheduledEventsGuildScheduledEventId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        body: z.union([
          ExternalScheduledEventPatchRequestPartialSchema,
          StageScheduledEventPatchRequestPartialSchema,
          VoiceScheduledEventPatchRequestPartialSchema,
        ]),
      }),
    )
    .output(
      z.xor([
        ExternalScheduledEventResponseSchema,
        StageScheduledEventResponseSchema,
        VoiceScheduledEventResponseSchema,
      ]),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptions: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        scheduled_start_time: z.iso
          .datetime({ offset: true })
          .nullable()
          .meta({ description: 'Overridden start time of this occurrence' })
          .exactOptional(),
        scheduled_end_time: z.iso
          .datetime({ offset: true })
          .nullable()
          .meta({ description: 'Overridden end time of this occurrence' })
          .exactOptional(),
        original_scheduled_start_time: z.iso
          .datetime({ offset: true })
          .meta({
            description: 'The original start time of the occurrence to create an exception for',
          }),
        is_canceled: z
          .boolean()
          .nullable()
          .meta({ description: 'Whether this occurrence is canceled' })
          .exactOptional(),
      }),
    )
    .output(GuildScheduledEventExceptionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
        scheduled_start_time: z.iso
          .datetime({ offset: true })
          .nullable()
          .meta({ description: 'Overridden start time of this occurrence' })
          .exactOptional(),
        scheduled_end_time: z.iso
          .datetime({ offset: true })
          .nullable()
          .meta({ description: 'Overridden end time of this occurrence' })
          .exactOptional(),
        is_canceled: z
          .boolean()
          .nullable()
          .meta({ description: 'Whether this occurrence is canceled' })
          .exactOptional(),
      }),
    )
    .output(GuildScheduledEventExceptionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        with_member: z.boolean().exactOptional(),
        limit: z.int().min(1).max(100).exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(z.array(ScheduledEventUserResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_ids: z.array(SnowflakeTypeSchema).max(10).exactOptional(),
      }),
    )
    .output(ScheduledEventUserCountResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsers:
    t.procedure
      .input(
        z.object({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          guild_scheduled_event_exception_id: SnowflakeTypeSchema,
          with_member: z.boolean().exactOptional(),
          limit: z.int().min(1).max(100).exactOptional(),
          before: SnowflakeTypeSchema.exactOptional(),
          after: SnowflakeTypeSchema.exactOptional(),
        }),
      )
      .output(z.array(ScheduledEventUserResponseSchema).nullable())
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  getGuildsGuildIdSoundboardSounds: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(ListGuildSoundboardSoundsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdSoundboardSounds: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(32),
        volume: z.number().min(0).max(1).nullable().exactOptional(),
        emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        emoji_name: z.string().min(1).max(32).nullable().exactOptional(),
        sound: z.string(),
      }),
    )
    .output(SoundboardSoundResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdSoundboardSoundsSoundId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
    .output(SoundboardSoundResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdSoundboardSoundsSoundId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdSoundboardSoundsSoundId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        sound_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(32).exactOptional(),
        volume: z.number().min(0).max(1).nullable().exactOptional(),
        emoji_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        emoji_name: z.string().min(1).max(32).nullable().exactOptional(),
      }),
    )
    .output(SoundboardSoundResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdStickers: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.array(GuildStickerResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdStickers: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildStickerResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdStickersStickerId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
    .output(GuildStickerResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdStickersStickerId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdStickersStickerId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        sticker_id: SnowflakeTypeSchema,
        name: z.string().min(2).max(30).exactOptional(),
        tags: z.string().min(1).max(200).exactOptional(),
        description: z.string().max(100).nullable().exactOptional(),
      }),
    )
    .output(GuildStickerResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdTemplates: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(z.array(GuildTemplateResponseSchema).nullable())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdTemplates: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        name: z.string().min(1).max(100),
        description: z.string().max(120).nullable().exactOptional(),
      }),
    )
    .output(GuildTemplateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdTemplatesCode: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, code: z.string().max(152133) }))
    .output(GuildTemplateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdTemplatesCode: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, code: z.string().max(152133) }))
    .output(GuildTemplateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdTemplatesCode: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        code: z.string().max(152133),
        name: z.string().min(1).max(100).exactOptional(),
        description: z.string().max(120).nullable().exactOptional(),
      }),
    )
    .output(GuildTemplateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdThreadsActive: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(ThreadsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdVanityUrl: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(VanityURLResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdVoiceStatesMe: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(VoiceStateResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdVoiceStatesMe: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        request_to_speak_timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
        suppress: z.boolean().nullable().exactOptional(),
        channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdVoiceStatesUserId: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(VoiceStateResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdVoiceStatesUserId: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        suppress: z.boolean().nullable().exactOptional(),
        channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWebhooks: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
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
  getGuildsGuildIdWelcomeScreen: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildWelcomeScreenResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdWelcomeScreen: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        description: z.string().max(140).nullable().exactOptional(),
        welcome_channels: z.array(GuildWelcomeChannelSchema).max(5).nullable().exactOptional(),
        enabled: z.boolean().nullable().exactOptional(),
      }),
    )
    .output(GuildWelcomeScreenResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWidget: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(WidgetSettingsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdWidget: t.procedure
    .input(
      z.object({
        guild_id: SnowflakeTypeSchema,
        channel_id: z.xor([z.null().nullable(), SnowflakeTypeSchema]).exactOptional(),
        enabled: z.boolean().nullable().exactOptional(),
      }),
    )
    .output(WidgetSettingsResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWidgetJson: t.procedure
    .input(z.object({ guild_id: SnowflakeTypeSchema }))
    .output(WidgetResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWidgetPng: t.procedure
    .input(
      z.object({ guild_id: SnowflakeTypeSchema, style: WidgetImageStylesSchema.exactOptional() }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
