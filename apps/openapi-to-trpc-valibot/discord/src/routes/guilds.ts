import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
    .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
    .output(GuildTemplateResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, with_counts: v.optional(v.boolean()) }))
    .output(GuildWithCountsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildId: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(100))),
        description: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(300))),
        ),
        region: v.optional(v.nullable(v.string())),
        icon: v.optional(v.nullable(v.string())),
        verification_level: v.optional(v.union([v.nullable(v.null()), VerificationLevelsSchema])),
        default_message_notifications: v.optional(
          v.union([v.nullable(v.null()), UserNotificationSettingsSchema]),
        ),
        explicit_content_filter: v.optional(
          v.union([v.nullable(v.null()), GuildExplicitContentFilterTypesSchema]),
        ),
        preferred_locale: v.optional(v.union([v.nullable(v.null()), AvailableLocalesEnumSchema])),
        afk_timeout: v.optional(v.union([v.nullable(v.null()), AfkTimeoutsSchema])),
        afk_channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        system_channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        splash: v.optional(v.nullable(v.string())),
        banner: v.optional(v.nullable(v.string())),
        system_channel_flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        features: v.optional(
          v.nullable(
            v.pipe(
              v.array(v.nullable(v.pipe(v.string(), v.maxCodePoints(152133)))),
              v.maxLength(1521),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        discovery_splash: v.optional(v.nullable(v.string())),
        home_header: v.optional(v.nullable(v.string())),
        rules_channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        safety_alerts_channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        public_updates_channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        premium_progress_bar_enabled: v.optional(v.nullable(v.boolean())),
      }),
    )
    .output(GuildResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdAuditLogs: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: v.optional(SnowflakeTypeSchema),
        target_id: v.optional(SnowflakeTypeSchema),
        action_type: v.optional(AuditLogActionTypesSchema),
        before: v.optional(SnowflakeTypeSchema),
        after: v.optional(SnowflakeTypeSchema),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100))),
      }),
    )
    .output(GuildAuditLogResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdAutoModerationRules: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            DefaultKeywordRuleResponseSchema,
            KeywordRuleResponseSchema,
            MLSpamRuleResponseSchema,
            MentionSpamRuleResponseSchema,
            UserProfileRuleResponseSchema,
            v.nullable(v.null()),
          ]),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdAutoModerationRules: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        body: v.union([
          DefaultKeywordListUpsertRequestSchema,
          KeywordUpsertRequestSchema,
          MLSpamUpsertRequestSchema,
          MentionSpamUpsertRequestSchema,
          UserProfileUpsertRequestSchema,
        ]),
      }),
    )
    .output(
      v.union([
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
    .input(v.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
    .output(
      v.union([
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
    .input(v.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdAutoModerationRulesRuleId: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        rule_id: SnowflakeTypeSchema,
        body: v.union([
          DefaultKeywordListUpsertRequestPartialSchema,
          KeywordUpsertRequestPartialSchema,
          MLSpamUpsertRequestPartialSchema,
          MentionSpamUpsertRequestPartialSchema,
          UserProfileUpsertRequestPartialSchema,
        ]),
      }),
    )
    .output(
      v.union([
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(1000))),
        before: v.optional(SnowflakeTypeSchema),
        after: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(v.nullable(v.array(GuildBanResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdBansUserId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(GuildBanResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdBansUserId: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        delete_message_seconds: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(604800))),
        ),
        delete_message_days: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(7))),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdBansUserId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdBulkBan: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_ids: v.pipe(
          v.array(SnowflakeTypeSchema),
          v.maxLength(200),
          v.check((input) => new Set(input).size === input.length),
        ),
        delete_message_seconds: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(604800))),
        ),
      }),
    )
    .output(BulkBanUsersResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdChannels: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            GuildChannelResponseSchema,
            PrivateChannelResponseSchema,
            PrivateGroupChannelResponseSchema,
            ThreadResponseSchema,
          ]),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdChannels: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        type: v.optional(v.union([v.nullable(v.null()), ChannelTypesSchema])),
        name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
        position: v.optional(
          v.nullable(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(0),
            ),
          ),
        ),
        topic: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(4096))),
        ),
        bitrate: v.optional(
          v.nullable(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(8000),
            ),
          ),
        ),
        user_limit: v.optional(
          v.nullable(
            v.pipe(
              v.number(),
              v.integer(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.minValue(0),
            ),
          ),
        ),
        nsfw: v.optional(v.nullable(v.boolean())),
        rate_limit_per_user: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(21600))),
        ),
        parent_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        permission_overwrites: v.optional(
          v.nullable(v.pipe(v.array(ChannelPermissionOverwriteRequestSchema), v.maxLength(100))),
        ),
        rtc_region: v.optional(v.nullable(v.string())),
        video_quality_mode: v.optional(v.union([v.nullable(v.null()), VideoQualityModesSchema])),
        default_auto_archive_duration: v.optional(
          v.union([v.nullable(v.null()), ThreadAutoArchiveDurationSchema]),
        ),
        default_reaction_emoji: v.optional(
          v.union([v.nullable(v.null()), UpdateDefaultReactionEmojiRequestSchema]),
        ),
        default_thread_rate_limit_per_user: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(21600))),
        ),
        default_sort_order: v.optional(v.union([v.nullable(v.null()), ThreadSortOrderSchema])),
        default_forum_layout: v.optional(v.union([v.nullable(v.null()), ForumLayoutSchema])),
        default_tag_setting: v.optional(
          v.union([v.nullable(v.null()), ThreadSearchTagSettingSchema]),
        ),
        available_tags: v.optional(
          v.nullable(
            v.pipe(
              v.array(v.union([v.nullable(v.null()), CreateOrUpdateThreadTagRequestSchema])),
              v.maxLength(20),
            ),
          ),
        ),
      }),
    )
    .output(GuildChannelResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdChannels: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        body: v.array(
          v.partial(
            v.object({
              id: v.union([v.nullable(v.null()), SnowflakeTypeSchema]),
              position: v.nullable(
                v.pipe(
                  v.number(),
                  v.integer(),
                  v.minValue(-2147483648),
                  v.maxValue(2147483647),
                  v.minValue(0),
                ),
              ),
              parent_id: v.union([v.nullable(v.null()), SnowflakeTypeSchema]),
              lock_permissions: v.nullable(v.boolean()),
            }),
          ),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdEmojis: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(EmojiResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdEmojis: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
        image: v.string(),
        roles: v.optional(
          v.nullable(
            v.pipe(
              v.array(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
              v.maxLength(1521),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
      }),
    )
    .output(EmojiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdEmojisEmojiId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .output(EmojiResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdEmojisEmojiId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdEmojisEmojiId: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        emoji_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32))),
        roles: v.optional(
          v.nullable(
            v.pipe(
              v.array(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
              v.maxLength(1521),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
      }),
    )
    .output(EmojiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdIncidentActions: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        invites_disabled_until: v.optional(
          v.pipe(
            v.nullable(
              v.pipe(
                v.string(),
                v.regex(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
            v.description('When invites will be enabled again'),
          ),
        ),
        dms_disabled_until: v.optional(
          v.pipe(
            v.nullable(
              v.pipe(
                v.string(),
                v.regex(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
            v.description('When direct messages will be enabled again'),
          ),
        ),
      }),
    )
    .output(GuildIncidentsDataResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdIntegrations: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            DiscordIntegrationResponseSchema,
            ExternalConnectionIntegrationResponseSchema,
            GuildSubscriptionIntegrationResponseSchema,
          ]),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdIntegrationsIntegrationId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdInvites: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.nullable(
        v.array(
          v.union([
            FriendInviteResponseSchema,
            GroupDMInviteResponseSchema,
            GuildInviteResponseSchema,
            v.nullable(v.null()),
          ]),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMembers: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(1000))),
        after: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(v.array(GuildMemberResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdMembersMe: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        nick: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(32)))),
        avatar: v.optional(v.nullable(v.string())),
        bio: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(300)))),
        banner: v.optional(v.nullable(v.string())),
      }),
    )
    .output(PrivateGuildMemberResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMembersSearch: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(1000))),
        query: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
      }),
    )
    .output(v.array(GuildMemberResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMembersUserId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(GuildMemberResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdMembersUserId: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        nick: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(32)))),
        roles: v.optional(
          v.nullable(
            v.pipe(
              v.array(SnowflakeTypeSchema),
              v.maxLength(250),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        mute: v.optional(v.nullable(v.boolean())),
        deaf: v.optional(v.nullable(v.boolean())),
        access_token: v.pipe(v.string(), v.maxCodePoints(10240)),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      }),
    )
    .output(GuildMemberResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdMembersUserId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdMembersUserId: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        nick: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(32)))),
        roles: v.optional(
          v.nullable(
            v.pipe(
              v.array(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
              v.maxLength(350),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        mute: v.optional(v.nullable(v.boolean())),
        deaf: v.optional(v.nullable(v.boolean())),
        channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        communication_disabled_until: v.optional(
          v.nullable(
            v.pipe(
              v.string(),
              v.regex(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
        ),
        flags: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
      }),
    )
    .output(GuildMemberResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdMembersUserIdRolesRoleId: t.procedure
    .input(
      v.object({
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
      v.object({
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        sort_by: v.optional(SortingModeSchema),
        sort_order: v.optional(SortingOrderSchema),
        content: v.optional(v.pipe(v.string(), v.maxCodePoints(1024))),
        slop: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100))),
        author_id: v.optional(
          v.pipe(
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        author_type: v.optional(
          v.pipe(
            v.array(AuthorTypeSchema),
            v.maxLength(6),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        mentions: v.optional(
          v.pipe(
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        mentions_role_id: v.optional(
          v.pipe(
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        replied_to_user_id: v.optional(
          v.pipe(
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        replied_to_message_id: v.optional(
          v.pipe(
            v.array(SnowflakeTypeSchema),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        mention_everyone: v.optional(v.boolean()),
        min_id: v.optional(SnowflakeTypeSchema),
        max_id: v.optional(SnowflakeTypeSchema),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(25))),
        offset: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(9975))),
        has: v.optional(
          v.pipe(
            v.array(HasOptionSchema),
            v.maxLength(18),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        link_hostname: v.optional(
          v.pipe(
            v.array(v.pipe(v.string(), v.maxCodePoints(256))),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        embed_provider: v.optional(
          v.pipe(
            v.array(v.pipe(v.string(), v.maxCodePoints(256))),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        embed_type: v.optional(
          v.pipe(
            v.array(SearchableEmbedTypeSchema),
            v.maxLength(5),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        attachment_extension: v.optional(
          v.pipe(
            v.array(v.pipe(v.string(), v.maxCodePoints(256))),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        attachment_filename: v.optional(
          v.pipe(
            v.array(v.pipe(v.string(), v.maxCodePoints(1024))),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
        pinned: v.optional(v.boolean()),
        include_nsfw: v.optional(v.boolean()),
        channel_id: v.optional(
          v.pipe(
            v.array(SnowflakeTypeSchema),
            v.maxLength(500),
            v.check((input) => new Set(input).size === input.length),
          ),
        ),
      }),
    )
    .output(GuildSearchResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdNewMemberWelcome: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildHomeSettingsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdOnboarding: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(UserGuildOnboardingResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdOnboarding: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        prompts: v.optional(
          v.nullable(v.pipe(v.array(UpdateOnboardingPromptRequestSchema), v.maxLength(15))),
        ),
        enabled: v.optional(v.nullable(v.boolean())),
        default_channel_ids: v.optional(
          v.nullable(
            v.pipe(
              v.array(SnowflakeTypeSchema),
              v.maxLength(500),
              v.check((input) => new Set(input).size === input.length),
            ),
          ),
        ),
        mode: v.optional(v.union([v.nullable(v.null()), GuildOnboardingModeSchema])),
      }),
    )
    .output(GuildOnboardingResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPermissionsMemberUserId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(PermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPermissionsRoleRoleId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .output(PermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPreview: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildPreviewResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPrune: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        days: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(30))),
        include_roles: v.optional(
          v.union([
            v.string(),
            v.pipe(
              v.array(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
              v.maxLength(100),
              v.check((input) => new Set(input).size === input.length),
            ),
          ]),
        ),
      }),
    )
    .output(GuildPruneResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdPrune: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        days: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(30))),
        ),
        compute_prune_count: v.optional(v.nullable(v.boolean())),
        include_roles: v.optional(
          v.union([
            v.string(),
            v.pipe(
              v.array(SnowflakeTypeSchema),
              v.maxLength(100),
              v.check((input) => new Set(input).size === input.length),
            ),
            v.nullable(v.null()),
          ]),
        ),
      }),
    )
    .output(GuildPruneResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRegions: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(VoiceRegionResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRequests: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        status: v.optional(GuildJoinRequestApplicationStatusSchema),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100))),
        before: v.optional(SnowflakeTypeSchema),
        after: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(GuildJoinRequestsListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdRequestsRequestId: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        request_id: SnowflakeTypeSchema,
        action: v.optional(
          v.pipe(
            GuildJoinRequestApplicationStatusSchema,
            v.description('Whether to approve or reject the join request'),
          ),
        ),
        rejection_reason: v.optional(
          v.pipe(
            v.nullable(v.pipe(v.string(), v.maxCodePoints(160))),
            v.description('Reason for rejection. Only used when action is REJECTED'),
          ),
        ),
      }),
    )
    .output(GuildJoinRequestResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRoles: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(v.array(GuildRoleResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdRoles: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        name: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
        permissions: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        color: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215))),
        ),
        colors: v.optional(v.union([v.nullable(v.null()), RoleColorsSchema])),
        hoist: v.optional(v.nullable(v.boolean())),
        mentionable: v.optional(v.nullable(v.boolean())),
        icon: v.optional(v.nullable(v.string())),
        unicode_emoji: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
      }),
    )
    .output(GuildRoleResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdRoles: t.procedure
    .input(
      v.object({ guild_id: SnowflakeTypeSchema, body: v.array(UpdateRolePositionsRequestSchema) }),
    )
    .output(v.array(GuildRoleResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRolesMemberCounts: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(
      v.record(
        v.string(),
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRolesRoleId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .output(GuildRoleResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdRolesRoleId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdRolesRoleId: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
        name: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)))),
        permissions: v.optional(v.nullable(v.pipe(v.number(), v.integer()))),
        color: v.optional(
          v.nullable(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(16777215))),
        ),
        colors: v.optional(v.union([v.nullable(v.null()), RoleColorsSchema])),
        hoist: v.optional(v.nullable(v.boolean())),
        mentionable: v.optional(v.nullable(v.boolean())),
        icon: v.optional(v.nullable(v.string())),
        unicode_emoji: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
      }),
    )
    .output(GuildRoleResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEvents: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, with_user_count: v.optional(v.boolean()) }))
    .output(
      v.nullable(
        v.array(
          v.union([
            ExternalScheduledEventResponseSchema,
            StageScheduledEventResponseSchema,
            VoiceScheduledEventResponseSchema,
          ]),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdScheduledEvents: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        body: v.union([
          ExternalScheduledEventCreateRequestSchema,
          StageScheduledEventCreateRequestSchema,
          VoiceScheduledEventCreateRequestSchema,
        ]),
      }),
    )
    .output(
      v.union([
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        with_user_count: v.optional(v.boolean()),
      }),
    )
    .output(
      v.union([
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
      v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdScheduledEventsGuildScheduledEventId: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        body: v.union([
          ExternalScheduledEventPatchRequestPartialSchema,
          StageScheduledEventPatchRequestPartialSchema,
          VoiceScheduledEventPatchRequestPartialSchema,
        ]),
      }),
    )
    .output(
      v.union([
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        scheduled_start_time: v.optional(
          v.pipe(
            v.nullable(
              v.pipe(
                v.string(),
                v.regex(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
            v.description('Overridden start time of this occurrence'),
          ),
        ),
        scheduled_end_time: v.optional(
          v.pipe(
            v.nullable(
              v.pipe(
                v.string(),
                v.regex(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
            v.description('Overridden end time of this occurrence'),
          ),
        ),
        original_scheduled_start_time: v.pipe(
          v.pipe(
            v.string(),
            v.regex(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ),
          v.description('The original start time of the occurrence to create an exception for'),
        ),
        is_canceled: v.optional(
          v.pipe(v.nullable(v.boolean()), v.description('Whether this occurrence is canceled')),
        ),
      }),
    )
    .output(GuildScheduledEventExceptionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId: t.procedure
    .input(
      v.object({
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
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
        scheduled_start_time: v.optional(
          v.pipe(
            v.nullable(
              v.pipe(
                v.string(),
                v.regex(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
            v.description('Overridden start time of this occurrence'),
          ),
        ),
        scheduled_end_time: v.optional(
          v.pipe(
            v.nullable(
              v.pipe(
                v.string(),
                v.regex(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
            v.description('Overridden end time of this occurrence'),
          ),
        ),
        is_canceled: v.optional(
          v.pipe(v.nullable(v.boolean()), v.description('Whether this occurrence is canceled')),
        ),
      }),
    )
    .output(GuildScheduledEventExceptionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        with_member: v.optional(v.boolean()),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100))),
        before: v.optional(SnowflakeTypeSchema),
        after: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(v.nullable(v.array(ScheduledEventUserResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_ids: v.optional(
          v.pipe(v.array(SnowflakeTypeSchema), v.maxLength(10)),
        ),
      }),
    )
    .output(ScheduledEventUserCountResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsers:
    t.procedure
      .input(
        v.object({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          guild_scheduled_event_exception_id: SnowflakeTypeSchema,
          with_member: v.optional(v.boolean()),
          limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100))),
          before: v.optional(SnowflakeTypeSchema),
          after: v.optional(SnowflakeTypeSchema),
        }),
      )
      .output(v.nullable(v.array(ScheduledEventUserResponseSchema)))
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  getGuildsGuildIdSoundboardSounds: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(ListGuildSoundboardSoundsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdSoundboardSounds: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32)),
        volume: v.optional(v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(1)))),
        emoji_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        emoji_name: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
        ),
        sound: v.string(),
      }),
    )
    .output(SoundboardSoundResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdSoundboardSoundsSoundId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
    .output(SoundboardSoundResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdSoundboardSoundsSoundId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdSoundboardSoundsSoundId: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        sound_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(32))),
        volume: v.optional(v.nullable(v.pipe(v.number(), v.minValue(0), v.maxValue(1)))),
        emoji_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        emoji_name: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(32))),
        ),
      }),
    )
    .output(SoundboardSoundResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdStickers: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(v.array(GuildStickerResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdStickers: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildStickerResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdStickersStickerId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
    .output(GuildStickerResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdStickersStickerId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdStickersStickerId: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        sticker_id: SnowflakeTypeSchema,
        name: v.optional(v.pipe(v.string(), v.minCodePoints(2), v.maxCodePoints(30))),
        tags: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(200))),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
      }),
    )
    .output(GuildStickerResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdTemplates: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(v.nullable(v.array(GuildTemplateResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdTemplates: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(120)))),
      }),
    )
    .output(GuildTemplateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdTemplatesCode: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    )
    .output(GuildTemplateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdTemplatesCode: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
      }),
    )
    .output(GuildTemplateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdTemplatesCode: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        code: v.pipe(v.string(), v.maxCodePoints(152133)),
        name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(120)))),
      }),
    )
    .output(GuildTemplateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdThreadsActive: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(ThreadsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdVanityUrl: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(VanityURLResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdVoiceStatesMe: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(VoiceStateResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdVoiceStatesMe: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        request_to_speak_timestamp: v.optional(
          v.nullable(
            v.pipe(
              v.string(),
              v.regex(
                /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
              ),
            ),
          ),
        ),
        suppress: v.optional(v.nullable(v.boolean())),
        channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdVoiceStatesUserId: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(VoiceStateResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdVoiceStatesUserId: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        suppress: v.optional(v.nullable(v.boolean())),
        channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWebhooks: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
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
  getGuildsGuildIdWelcomeScreen: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(GuildWelcomeScreenResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdWelcomeScreen: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(140)))),
        welcome_channels: v.optional(
          v.nullable(v.pipe(v.array(GuildWelcomeChannelSchema), v.maxLength(5))),
        ),
        enabled: v.optional(v.nullable(v.boolean())),
      }),
    )
    .output(GuildWelcomeScreenResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWidget: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(WidgetSettingsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdWidget: t.procedure
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
        enabled: v.optional(v.nullable(v.boolean())),
      }),
    )
    .output(WidgetSettingsResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWidgetJson: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema }))
    .output(WidgetResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWidgetPng: t.procedure
    .input(v.object({ guild_id: SnowflakeTypeSchema, style: v.optional(WidgetImageStylesSchema) }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
