import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
    .input(
      type({
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .output(GuildTemplateResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, 'with_counts?': 'boolean' }))
    .output(GuildWithCountsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        'description?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow((data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters')),
        ).or('null'),
        'region?': 'string | null',
        'icon?': 'string | null',
        'verification_level?': type('null').or(VerificationLevelsSchema),
        'default_message_notifications?': type('null').or(UserNotificationSettingsSchema),
        'explicit_content_filter?': type('null').or(GuildExplicitContentFilterTypesSchema),
        'preferred_locale?': type('null').or(AvailableLocalesEnumSchema),
        'afk_timeout?': type('null').or(AfkTimeoutsSchema),
        'afk_channel_id?': type('null').or(SnowflakeTypeSchema),
        'system_channel_id?': type('null').or(SnowflakeTypeSchema),
        'splash?': 'string | null',
        'banner?': 'string | null',
        'system_channel_flags?': 'number.integer | null',
        'features?': type(
          type(
            type(
              type(
                type('string').narrow(
                  (data, ctx) =>
                    [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
                ),
              ).or('null'),
            ).array(),
          )
            .and(type('unknown[] <= 1521'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
        'discovery_splash?': 'string | null',
        'home_header?': 'string | null',
        'rules_channel_id?': type('null').or(SnowflakeTypeSchema),
        'safety_alerts_channel_id?': type('null').or(SnowflakeTypeSchema),
        'public_updates_channel_id?': type('null').or(SnowflakeTypeSchema),
        'premium_progress_bar_enabled?': 'boolean | null',
      }),
    )
    .output(GuildResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdAuditLogs: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'user_id?': SnowflakeTypeSchema,
        'target_id?': SnowflakeTypeSchema,
        'action_type?': AuditLogActionTypesSchema,
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 100',
      }),
    )
    .output(GuildAuditLogResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdAutoModerationRules: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(
              type(
                type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
                  MLSpamRuleResponseSchema,
                ),
              ).or(MentionSpamRuleResponseSchema),
            ).or(UserProfileRuleResponseSchema),
          ).or('null'),
        ).array(),
      ).or('null'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdAutoModerationRules: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        body: type(
          type(
            type(type(DefaultKeywordListUpsertRequestSchema).or(KeywordUpsertRequestSchema)).or(
              MLSpamUpsertRequestSchema,
            ),
          ).or(MentionSpamUpsertRequestSchema),
        ).or(UserProfileUpsertRequestSchema),
      }),
    )
    .output(
      type(
        type(
          type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
            MLSpamRuleResponseSchema,
          ),
        ).or(MentionSpamRuleResponseSchema),
      ).or(UserProfileRuleResponseSchema),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdAutoModerationRulesRuleId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
            MLSpamRuleResponseSchema,
          ),
        ).or(MentionSpamRuleResponseSchema),
      ).or(UserProfileRuleResponseSchema),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdAutoModerationRulesRuleId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdAutoModerationRulesRuleId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        rule_id: SnowflakeTypeSchema,
        body: type(
          type(
            type(
              type(DefaultKeywordListUpsertRequestPartialSchema).or(
                KeywordUpsertRequestPartialSchema,
              ),
            ).or(MLSpamUpsertRequestPartialSchema),
          ).or(MentionSpamUpsertRequestPartialSchema),
        ).or(UserProfileUpsertRequestPartialSchema),
      }),
    )
    .output(
      type(
        type(
          type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
            MLSpamRuleResponseSchema,
          ),
        ).or(MentionSpamRuleResponseSchema),
      ).or(UserProfileRuleResponseSchema),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdBans: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 1000',
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
      }),
    )
    .output(type(type(GuildBanResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdBansUserId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(GuildBanResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdBansUserId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'delete_message_seconds?': 'number.integer >= 0 & number.integer <= 604800 | null',
        'delete_message_days?': 'number.integer >= 0 & number.integer <= 7 | null',
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdBansUserId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdBulkBan: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        user_ids: type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 200'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'delete_message_seconds?': 'number.integer >= 0 & number.integer <= 604800 | null',
      }),
    )
    .output(BulkBanUsersResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdChannels: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(type(GuildChannelResponseSchema).or(PrivateChannelResponseSchema)).or(
              PrivateGroupChannelResponseSchema,
            ),
          ).or(ThreadResponseSchema),
        ).array(),
      ).or('null'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdChannels: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'type?': type('null').or(ChannelTypesSchema),
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        'position?':
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
        'topic?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow(
              (data, ctx) => [...data].length <= 4096 || ctx.mustBe('at most 4096 characters'),
            ),
        ).or('null'),
        'bitrate?':
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 8000 | null',
        'user_limit?':
          'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
        'nsfw?': 'boolean | null',
        'rate_limit_per_user?': 'number.integer >= 0 & number.integer <= 21600 | null',
        'parent_id?': type('null').or(SnowflakeTypeSchema),
        'permission_overwrites?': type(
          type(type(ChannelPermissionOverwriteRequestSchema).array()).and(type('unknown[] <= 100')),
        ).or('null'),
        'rtc_region?': 'string | null',
        'video_quality_mode?': type('null').or(VideoQualityModesSchema),
        'default_auto_archive_duration?': type('null').or(ThreadAutoArchiveDurationSchema),
        'default_reaction_emoji?': type('null').or(UpdateDefaultReactionEmojiRequestSchema),
        'default_thread_rate_limit_per_user?':
          'number.integer >= 0 & number.integer <= 21600 | null',
        'default_sort_order?': type('null').or(ThreadSortOrderSchema),
        'default_forum_layout?': type('null').or(ForumLayoutSchema),
        'default_tag_setting?': type('null').or(ThreadSearchTagSettingSchema),
        'available_tags?': type(
          type(type(type('null').or(CreateOrUpdateThreadTagRequestSchema)).array()).and(
            type('unknown[] <= 20'),
          ),
        ).or('null'),
      }),
    )
    .output(GuildChannelResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdChannels: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        body: type(
          type({
            'id?': type('null').or(SnowflakeTypeSchema),
            'position?':
              'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
            'parent_id?': type('null').or(SnowflakeTypeSchema),
            'lock_permissions?': 'boolean | null',
          }),
        ).array(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdEmojis: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type(type(EmojiResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdEmojis: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        image: 'string',
        'roles?': type(
          type(type(type('null').or(SnowflakeTypeSchema)).array())
            .and(type('unknown[] <= 1521'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
      }),
    )
    .output(EmojiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdEmojisEmojiId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .output(EmojiResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdEmojisEmojiId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdEmojisEmojiId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        emoji_id: SnowflakeTypeSchema,
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        'roles?': type(
          type(type(type('null').or(SnowflakeTypeSchema)).array())
            .and(type('unknown[] <= 1521'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
      }),
    )
    .output(EmojiResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdIncidentActions: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'invites_disabled_until?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        )
          .or('null')
          .describe('When invites will be enabled again'),
        'dms_disabled_until?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        )
          .or('null')
          .describe('When direct messages will be enabled again'),
      }),
    )
    .output(GuildIncidentsDataResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdIntegrations: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(DiscordIntegrationResponseSchema).or(ExternalConnectionIntegrationResponseSchema),
          ).or(GuildSubscriptionIntegrationResponseSchema),
        ).array(),
      ).or('null'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdIntegrationsIntegrationId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdInvites: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(
      type(
        type(
          type(
            type(type(FriendInviteResponseSchema).or(GroupDMInviteResponseSchema)).or(
              GuildInviteResponseSchema,
            ),
          ).or('null'),
        ).array(),
      ).or('null'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMembers: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 1000',
        'after?': SnowflakeTypeSchema,
      }),
    )
    .output(type(GuildMemberResponseSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdMembersMe: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'nick?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
          ),
        ).or('null'),
        'avatar?': 'string | null',
        'bio?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters'),
          ),
        ).or('null'),
        'banner?': 'string | null',
      }),
    )
    .output(PrivateGuildMemberResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMembersSearch: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 1000',
        query: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
      }),
    )
    .output(type(GuildMemberResponseSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMembersUserId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(GuildMemberResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdMembersUserId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'nick?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
          ),
        ).or('null'),
        'roles?': type(
          type(type(SnowflakeTypeSchema).array())
            .and(type('unknown[] <= 250'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
        'mute?': 'boolean | null',
        'deaf?': 'boolean | null',
        access_token: type('string').narrow(
          (data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters'),
        ),
        'flags?': 'number.integer | null',
      }),
    )
    .output(GuildMemberResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdMembersUserId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdMembersUserId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'nick?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
          ),
        ).or('null'),
        'roles?': type(
          type(type(type('null').or(SnowflakeTypeSchema)).array())
            .and(type('unknown[] <= 350'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
        'mute?': 'boolean | null',
        'deaf?': 'boolean | null',
        'channel_id?': type('null').or(SnowflakeTypeSchema),
        'communication_disabled_until?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ).or('null'),
        'flags?': 'number.integer | null',
      }),
    )
    .output(GuildMemberResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdMembersUserIdRolesRoleId: t.procedure
    .input(
      type({
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
      type({
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
      type({
        guild_id: SnowflakeTypeSchema,
        'sort_by?': SortingModeSchema,
        'sort_order?': SortingOrderSchema,
        'content?': type('string').narrow(
          (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
        ),
        'slop?': 'number.integer >= 0 & number.integer <= 100',
        'author_id?': type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'author_type?': type(type(AuthorTypeSchema).array())
          .and(type('unknown[] <= 6'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'mentions?': type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'mentions_role_id?': type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'replied_to_user_id?': type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'replied_to_message_id?': type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'mention_everyone?': 'boolean',
        'min_id?': SnowflakeTypeSchema,
        'max_id?': SnowflakeTypeSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 25',
        'offset?': 'number.integer >= 0 & number.integer <= 9975',
        'has?': type(type(HasOptionSchema).array())
          .and(type('unknown[] <= 18'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'link_hostname?': type(
          type(
            type('string').narrow(
              (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
            ),
          ).array(),
        )
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'embed_provider?': type(
          type(
            type('string').narrow(
              (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
            ),
          ).array(),
        )
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'embed_type?': type(type(SearchableEmbedTypeSchema).array())
          .and(type('unknown[] <= 5'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'attachment_extension?': type(
          type(
            type('string').narrow(
              (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
            ),
          ).array(),
        )
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'attachment_filename?': type(
          type(
            type('string').narrow(
              (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
            ),
          ).array(),
        )
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        'pinned?': 'boolean',
        'include_nsfw?': 'boolean',
        'channel_id?': type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 500'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      }),
    )
    .output(GuildSearchResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdNewMemberWelcome: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(GuildHomeSettingsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdOnboarding: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(UserGuildOnboardingResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdOnboarding: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'prompts?': type(
          type(type(UpdateOnboardingPromptRequestSchema).array()).and(type('unknown[] <= 15')),
        ).or('null'),
        'enabled?': 'boolean | null',
        'default_channel_ids?': type(
          type(type(SnowflakeTypeSchema).array())
            .and(type('unknown[] <= 500'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ).or('null'),
        'mode?': type('null').or(GuildOnboardingModeSchema),
      }),
    )
    .output(GuildOnboardingResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPermissionsMemberUserId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(PermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPermissionsRoleRoleId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .output(PermissionsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPreview: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(GuildPreviewResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPrune: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'days?': 'number.integer >= 1 & number.integer <= 30',
        'include_roles?': type('string').or(
          type(type(type('null').or(SnowflakeTypeSchema)).array())
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
      }),
    )
    .output(GuildPruneResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdPrune: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'days?': 'number.integer >= 1 & number.integer <= 30 | null',
        'compute_prune_count?': 'boolean | null',
        'include_roles?': type(
          type('string').or(
            type(type(SnowflakeTypeSchema).array())
              .and(type('unknown[] <= 100'))
              .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
          ),
        ).or('null'),
      }),
    )
    .output(GuildPruneResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRegions: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type(type(VoiceRegionResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRequests: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'status?': GuildJoinRequestApplicationStatusSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 100',
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
      }),
    )
    .output(GuildJoinRequestsListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdRequestsRequestId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        request_id: SnowflakeTypeSchema,
        'action?': GuildJoinRequestApplicationStatusSchema.describe(
          'Whether to approve or reject the join request',
        ),
        'rejection_reason?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 160 || ctx.mustBe('at most 160 characters'),
          ),
        )
          .or('null')
          .describe('Reason for rejection. Only used when action is REJECTED'),
      }),
    )
    .output(GuildJoinRequestResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRoles: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type(GuildRoleResponseSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdRoles: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        ).or('null'),
        'permissions?': 'number.integer | null',
        'color?': 'number.integer >= 0 & number.integer <= 16777215 | null',
        'colors?': type('null').or(RoleColorsSchema),
        'hoist?': 'boolean | null',
        'mentionable?': 'boolean | null',
        'icon?': 'string | null',
        'unicode_emoji?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
          ),
        ).or('null'),
      }),
    )
    .output(GuildRoleResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdRoles: t.procedure
    .input(
      type({ guild_id: SnowflakeTypeSchema, body: type(UpdateRolePositionsRequestSchema).array() }),
    )
    .output(type(GuildRoleResponseSchema).array())
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRolesMemberCounts: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type({ '[string]': 'number.integer >= -2147483648 & number.integer <= 2147483647' }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRolesRoleId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .output(GuildRoleResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdRolesRoleId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdRolesRoleId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        role_id: SnowflakeTypeSchema,
        'name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        ).or('null'),
        'permissions?': 'number.integer | null',
        'color?': 'number.integer >= 0 & number.integer <= 16777215 | null',
        'colors?': type('null').or(RoleColorsSchema),
        'hoist?': 'boolean | null',
        'mentionable?': 'boolean | null',
        'icon?': 'string | null',
        'unicode_emoji?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
          ),
        ).or('null'),
      }),
    )
    .output(GuildRoleResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEvents: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, 'with_user_count?': 'boolean' }))
    .output(
      type(
        type(
          type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
            VoiceScheduledEventResponseSchema,
          ),
        ).array(),
      ).or('null'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdScheduledEvents: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        body: type(
          type(ExternalScheduledEventCreateRequestSchema).or(
            StageScheduledEventCreateRequestSchema,
          ),
        ).or(VoiceScheduledEventCreateRequestSchema),
      }),
    )
    .output(
      type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
        VoiceScheduledEventResponseSchema,
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        'with_user_count?': 'boolean',
      }),
    )
    .output(
      type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
        VoiceScheduledEventResponseSchema,
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdScheduledEventsGuildScheduledEventId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdScheduledEventsGuildScheduledEventId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        body: type(
          type(ExternalScheduledEventPatchRequestPartialSchema).or(
            StageScheduledEventPatchRequestPartialSchema,
          ),
        ).or(VoiceScheduledEventPatchRequestPartialSchema),
      }),
    )
    .output(
      type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
        VoiceScheduledEventResponseSchema,
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptions: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        'scheduled_start_time?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        )
          .or('null')
          .describe('Overridden start time of this occurrence'),
        'scheduled_end_time?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        )
          .or('null')
          .describe('Overridden end time of this occurrence'),
        original_scheduled_start_time: type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ).describe('The original start time of the occurrence to create an exception for'),
        'is_canceled?': type('boolean | null').describe('Whether this occurrence is canceled'),
      }),
    )
    .output(GuildScheduledEventExceptionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId: t.procedure
    .input(
      type({
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
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        exception_id: SnowflakeTypeSchema,
        'scheduled_start_time?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        )
          .or('null')
          .describe('Overridden start time of this occurrence'),
        'scheduled_end_time?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        )
          .or('null')
          .describe('Overridden end time of this occurrence'),
        'is_canceled?': type('boolean | null').describe('Whether this occurrence is canceled'),
      }),
    )
    .output(GuildScheduledEventExceptionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        'with_member?': 'boolean',
        'limit?': 'number.integer >= 1 & number.integer <= 100',
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
      }),
    )
    .output(type(type(ScheduledEventUserResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        'guild_scheduled_event_exception_ids?': type(type(SnowflakeTypeSchema).array()).and(
          type('unknown[] <= 10'),
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
        type({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          guild_scheduled_event_exception_id: SnowflakeTypeSchema,
          'with_member?': 'boolean',
          'limit?': 'number.integer >= 1 & number.integer <= 100',
          'before?': SnowflakeTypeSchema,
          'after?': SnowflakeTypeSchema,
        }),
      )
      .output(type(type(ScheduledEventUserResponseSchema).array()).or('null'))
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  getGuildsGuildIdSoundboardSounds: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(ListGuildSoundboardSoundsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdSoundboardSounds: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        'volume?': 'number >= 0 & number <= 1 | null',
        'emoji_id?': type('null').or(SnowflakeTypeSchema),
        'emoji_name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        ).or('null'),
        sound: 'string',
      }),
    )
    .output(SoundboardSoundResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdSoundboardSoundsSoundId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
    .output(SoundboardSoundResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdSoundboardSoundsSoundId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdSoundboardSoundsSoundId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        sound_id: SnowflakeTypeSchema,
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        'volume?': 'number >= 0 & number <= 1 | null',
        'emoji_id?': type('null').or(SnowflakeTypeSchema),
        'emoji_name?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
        ).or('null'),
      }),
    )
    .output(SoundboardSoundResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdStickers: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type(GuildStickerResponseSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdStickers: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(GuildStickerResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdStickersStickerId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
    .output(GuildStickerResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdStickersStickerId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdStickersStickerId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        sticker_id: SnowflakeTypeSchema,
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
          .narrow((data, ctx) => [...data].length <= 30 || ctx.mustBe('at most 30 characters')),
        'tags?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 200 || ctx.mustBe('at most 200 characters')),
        'description?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
          ),
        ).or('null'),
      }),
    )
    .output(GuildStickerResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdTemplates: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(type(type(GuildTemplateResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdTemplates: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        'description?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'),
          ),
        ).or('null'),
      }),
    )
    .output(GuildTemplateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdTemplatesCode: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .output(GuildTemplateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdTemplatesCode: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
      }),
    )
    .output(GuildTemplateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdTemplatesCode: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        code: type('string').narrow(
          (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
        ),
        'name?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        'description?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 120 || ctx.mustBe('at most 120 characters'),
          ),
        ).or('null'),
      }),
    )
    .output(GuildTemplateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdThreadsActive: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(ThreadsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdVanityUrl: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(VanityURLResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdVoiceStatesMe: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(VoiceStateResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdVoiceStatesMe: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'request_to_speak_timestamp?': type(
          type(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ).or('null'),
        'suppress?': 'boolean | null',
        'channel_id?': type('null').or(SnowflakeTypeSchema),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdVoiceStatesUserId: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
    .output(VoiceStateResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdVoiceStatesUserId: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema,
        'suppress?': 'boolean | null',
        'channel_id?': type('null').or(SnowflakeTypeSchema),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWebhooks: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
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
  getGuildsGuildIdWelcomeScreen: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(GuildWelcomeScreenResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdWelcomeScreen: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'description?': type(
          type('string').narrow(
            (data, ctx) => [...data].length <= 140 || ctx.mustBe('at most 140 characters'),
          ),
        ).or('null'),
        'welcome_channels?': type(
          type(type(GuildWelcomeChannelSchema).array()).and(type('unknown[] <= 5')),
        ).or('null'),
        'enabled?': 'boolean | null',
      }),
    )
    .output(GuildWelcomeScreenResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWidget: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(WidgetSettingsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdWidget: t.procedure
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        'channel_id?': type('null').or(SnowflakeTypeSchema),
        'enabled?': 'boolean | null',
      }),
    )
    .output(WidgetSettingsResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWidgetJson: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema }))
    .output(WidgetResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWidgetPng: t.procedure
    .input(type({ guild_id: SnowflakeTypeSchema, 'style?': WidgetImageStylesSchema }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
