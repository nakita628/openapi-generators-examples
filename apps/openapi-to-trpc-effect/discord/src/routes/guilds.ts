import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildTemplateResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          with_counts: Schema.optional(Schema.Boolean),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildWithCountsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 2, {
                expected: 'a string of at least 2 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 100, {
                expected: 'a string of at most 100 characters',
              }),
            ),
          ),
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 0, {
                  expected: 'a string of at least 0 characters',
                }),
                Schema.makeFilter((input) => [...input].length <= 300, {
                  expected: 'a string of at most 300 characters',
                }),
              ),
            ),
          ),
          region: Schema.optional(Schema.NullOr(Schema.String)),
          icon: Schema.optional(Schema.NullOr(Schema.String)),
          verification_level: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), VerificationLevelsSchema]),
          ),
          default_message_notifications: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), UserNotificationSettingsSchema]),
          ),
          explicit_content_filter: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), GuildExplicitContentFilterTypesSchema]),
          ),
          preferred_locale: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), AvailableLocalesEnumSchema]),
          ),
          afk_timeout: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), AfkTimeoutsSchema]),
          ),
          afk_channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          system_channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          splash: Schema.optional(Schema.NullOr(Schema.String)),
          banner: Schema.optional(Schema.NullOr(Schema.String)),
          system_channel_flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
          features: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.NullOr(
                  Schema.String.check(
                    Schema.makeFilter((input) => [...input].length <= 152133, {
                      expected: 'a string of at most 152133 characters',
                    }),
                  ),
                ),
              ).check(Schema.isMaxLength(1521), Schema.isUnique()),
            ),
          ),
          discovery_splash: Schema.optional(Schema.NullOr(Schema.String)),
          home_header: Schema.optional(Schema.NullOr(Schema.String)),
          rules_channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          safety_alerts_channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          public_updates_channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          premium_progress_bar_enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdAuditLogs: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          user_id: Schema.optional(SnowflakeTypeSchema),
          target_id: Schema.optional(SnowflakeTypeSchema),
          action_type: Schema.optional(AuditLogActionTypesSchema),
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
    .output(Schema.toStandardSchemaV1(GuildAuditLogResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdAutoModerationRules: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.NullOr(
          Schema.Array(
            Schema.Union([
              DefaultKeywordRuleResponseSchema,
              KeywordRuleResponseSchema,
              MLSpamRuleResponseSchema,
              MentionSpamRuleResponseSchema,
              UserProfileRuleResponseSchema,
              Schema.NullOr(Schema.Null),
            ]),
          ),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdAutoModerationRules: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          body: Schema.Union([
            DefaultKeywordListUpsertRequestSchema,
            KeywordUpsertRequestSchema,
            MLSpamUpsertRequestSchema,
            MentionSpamUpsertRequestSchema,
            UserProfileUpsertRequestSchema,
          ]),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          DefaultKeywordRuleResponseSchema,
          KeywordRuleResponseSchema,
          MLSpamRuleResponseSchema,
          MentionSpamRuleResponseSchema,
          UserProfileRuleResponseSchema,
        ]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdAutoModerationRulesRuleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          DefaultKeywordRuleResponseSchema,
          KeywordRuleResponseSchema,
          MLSpamRuleResponseSchema,
          MentionSpamRuleResponseSchema,
          UserProfileRuleResponseSchema,
        ]),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdAutoModerationRulesRuleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdAutoModerationRulesRuleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          rule_id: SnowflakeTypeSchema,
          body: Schema.Union([
            DefaultKeywordListUpsertRequestPartialSchema,
            KeywordUpsertRequestPartialSchema,
            MLSpamUpsertRequestPartialSchema,
            MentionSpamUpsertRequestPartialSchema,
            UserProfileUpsertRequestPartialSchema,
          ]),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          DefaultKeywordRuleResponseSchema,
          KeywordRuleResponseSchema,
          MLSpamRuleResponseSchema,
          MentionSpamRuleResponseSchema,
          UserProfileRuleResponseSchema,
        ]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdBans: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(1000),
            ),
          ),
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(GuildBanResponseSchema))))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdBansUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildBanResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdBansUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          delete_message_seconds: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(604800),
              ),
            ),
          ),
          delete_message_days: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(7),
              ),
            ),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdBansUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdBulkBan: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          user_ids: Schema.Array(SnowflakeTypeSchema).check(
            Schema.isMaxLength(200),
            Schema.isUnique(),
          ),
          delete_message_seconds: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(604800),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(BulkBanUsersResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdChannels: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.NullOr(
          Schema.Array(
            Schema.Union([
              GuildChannelResponseSchema,
              PrivateChannelResponseSchema,
              PrivateGroupChannelResponseSchema,
              ThreadResponseSchema,
            ]),
          ),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdChannels: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          type: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), ChannelTypesSchema])),
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 100, {
              expected: 'a string of at most 100 characters',
            }),
          ),
          position: Schema.optional(
            Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
          ),
          topic: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 0, {
                  expected: 'a string of at least 0 characters',
                }),
                Schema.makeFilter((input) => [...input].length <= 4096, {
                  expected: 'a string of at most 4096 characters',
                }),
              ),
            ),
          ),
          bitrate: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(8000)),
            ),
          ),
          user_limit: Schema.optional(
            Schema.NullOr(Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0))),
          ),
          nsfw: Schema.optional(Schema.NullOr(Schema.Boolean)),
          rate_limit_per_user: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(21600),
              ),
            ),
          ),
          parent_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          permission_overwrites: Schema.optional(
            Schema.NullOr(
              Schema.Array(ChannelPermissionOverwriteRequestSchema).check(Schema.isMaxLength(100)),
            ),
          ),
          rtc_region: Schema.optional(Schema.NullOr(Schema.String)),
          video_quality_mode: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), VideoQualityModesSchema]),
          ),
          default_auto_archive_duration: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ThreadAutoArchiveDurationSchema]),
          ),
          default_reaction_emoji: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), UpdateDefaultReactionEmojiRequestSchema]),
          ),
          default_thread_rate_limit_per_user: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(21600),
              ),
            ),
          ),
          default_sort_order: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ThreadSortOrderSchema]),
          ),
          default_forum_layout: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ForumLayoutSchema]),
          ),
          default_tag_setting: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), ThreadSearchTagSettingSchema]),
          ),
          available_tags: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.Union([Schema.NullOr(Schema.Null), CreateOrUpdateThreadTagRequestSchema]),
              ).check(Schema.isMaxLength(20)),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildChannelResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdChannels: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          body: Schema.Array(
            Schema.Struct({
              id: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])),
              position: Schema.optional(
                Schema.NullOr(
                  Schema.Number.check(Schema.isInt32(), Schema.isGreaterThanOrEqualTo(0)),
                ),
              ),
              parent_id: Schema.optional(
                Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
              ),
              lock_permissions: Schema.optional(Schema.NullOr(Schema.Boolean)),
            }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdEmojis: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(EmojiResponseSchema))))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdEmojis: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 2, {
              expected: 'a string of at least 2 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 32, {
              expected: 'a string of at most 32 characters',
            }),
          ),
          image: Schema.String,
          roles: Schema.optional(
            Schema.NullOr(
              Schema.Array(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])).check(
                Schema.isMaxLength(1521),
                Schema.isUnique(),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EmojiResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdEmojisEmojiId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EmojiResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdEmojisEmojiId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdEmojisEmojiId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          emoji_id: SnowflakeTypeSchema,
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 2, {
                expected: 'a string of at least 2 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 32, {
                expected: 'a string of at most 32 characters',
              }),
            ),
          ),
          roles: Schema.optional(
            Schema.NullOr(
              Schema.Array(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])).check(
                Schema.isMaxLength(1521),
                Schema.isUnique(),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EmojiResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdIncidentActions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          invites_disabled_until: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.isPattern(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ).annotate({ description: 'When invites will be enabled again' }),
          ),
          dms_disabled_until: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.isPattern(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ).annotate({ description: 'When direct messages will be enabled again' }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildIncidentsDataResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdIntegrations: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.NullOr(
          Schema.Array(
            Schema.Union([
              DiscordIntegrationResponseSchema,
              ExternalConnectionIntegrationResponseSchema,
              GuildSubscriptionIntegrationResponseSchema,
            ]),
          ),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdIntegrationsIntegrationId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdInvites: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
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
  getGuildsGuildIdMembers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(1000),
            ),
          ),
          after: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Array(GuildMemberResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdMembersMe: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          nick: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 32, {
                  expected: 'a string of at most 32 characters',
                }),
              ),
            ),
          ),
          avatar: Schema.optional(Schema.NullOr(Schema.String)),
          bio: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 300, {
                  expected: 'a string of at most 300 characters',
                }),
              ),
            ),
          ),
          banner: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PrivateGuildMemberResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMembersSearch: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(1000),
            ),
          ),
          query: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 100, {
              expected: 'a string of at most 100 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Array(GuildMemberResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMembersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildMemberResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdMembersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          nick: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 32, {
                  expected: 'a string of at most 32 characters',
                }),
              ),
            ),
          ),
          roles: Schema.optional(
            Schema.NullOr(
              Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(250), Schema.isUnique()),
            ),
          ),
          mute: Schema.optional(Schema.NullOr(Schema.Boolean)),
          deaf: Schema.optional(Schema.NullOr(Schema.Boolean)),
          access_token: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 10240, {
              expected: 'a string of at most 10240 characters',
            }),
          ),
          flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildMemberResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdMembersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdMembersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          nick: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 32, {
                  expected: 'a string of at most 32 characters',
                }),
              ),
            ),
          ),
          roles: Schema.optional(
            Schema.NullOr(
              Schema.Array(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])).check(
                Schema.isMaxLength(350),
                Schema.isUnique(),
              ),
            ),
          ),
          mute: Schema.optional(Schema.NullOr(Schema.Boolean)),
          deaf: Schema.optional(Schema.NullOr(Schema.Boolean)),
          channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          communication_disabled_until: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.isPattern(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
          ),
          flags: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildMemberResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdMembersUserIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          role_id: SnowflakeTypeSchema,
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdMembersUserIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          role_id: SnowflakeTypeSchema,
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdMessagesSearch: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          sort_by: Schema.optional(SortingModeSchema),
          sort_order: Schema.optional(SortingOrderSchema),
          content: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length <= 1024, {
                expected: 'a string of at most 1024 characters',
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
          author_id: Schema.optional(
            Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(100), Schema.isUnique()),
          ),
          author_type: Schema.optional(
            Schema.Array(AuthorTypeSchema).check(Schema.isMaxLength(6), Schema.isUnique()),
          ),
          mentions: Schema.optional(
            Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(100), Schema.isUnique()),
          ),
          mentions_role_id: Schema.optional(
            Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(100), Schema.isUnique()),
          ),
          replied_to_user_id: Schema.optional(
            Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(100), Schema.isUnique()),
          ),
          replied_to_message_id: Schema.optional(
            Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(100), Schema.isUnique()),
          ),
          mention_everyone: Schema.optional(Schema.Boolean),
          min_id: Schema.optional(SnowflakeTypeSchema),
          max_id: Schema.optional(SnowflakeTypeSchema),
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
          has: Schema.optional(
            Schema.Array(HasOptionSchema).check(Schema.isMaxLength(18), Schema.isUnique()),
          ),
          link_hostname: Schema.optional(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 256, {
                  expected: 'a string of at most 256 characters',
                }),
              ),
            ).check(Schema.isMaxLength(100), Schema.isUnique()),
          ),
          embed_provider: Schema.optional(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 256, {
                  expected: 'a string of at most 256 characters',
                }),
              ),
            ).check(Schema.isMaxLength(100), Schema.isUnique()),
          ),
          embed_type: Schema.optional(
            Schema.Array(SearchableEmbedTypeSchema).check(Schema.isMaxLength(5), Schema.isUnique()),
          ),
          attachment_extension: Schema.optional(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 256, {
                  expected: 'a string of at most 256 characters',
                }),
              ),
            ).check(Schema.isMaxLength(100), Schema.isUnique()),
          ),
          attachment_filename: Schema.optional(
            Schema.Array(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 1024, {
                  expected: 'a string of at most 1024 characters',
                }),
              ),
            ).check(Schema.isMaxLength(100), Schema.isUnique()),
          ),
          pinned: Schema.optional(Schema.Boolean),
          include_nsfw: Schema.optional(Schema.Boolean),
          channel_id: Schema.optional(
            Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(500), Schema.isUnique()),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildSearchResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdNewMemberWelcome: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(GuildHomeSettingsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdOnboarding: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(UserGuildOnboardingResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdOnboarding: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          prompts: Schema.optional(
            Schema.NullOr(
              Schema.Array(UpdateOnboardingPromptRequestSchema).check(Schema.isMaxLength(15)),
            ),
          ),
          enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
          default_channel_ids: Schema.optional(
            Schema.NullOr(
              Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(500), Schema.isUnique()),
            ),
          ),
          mode: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), GuildOnboardingModeSchema]),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildOnboardingResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPermissionsMemberUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PermissionsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPermissionsRoleRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PermissionsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPreview: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(GuildPreviewResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdPrune: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          days: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(30),
            ),
          ),
          include_roles: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Array(Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema])).check(
                Schema.isMaxLength(100),
                Schema.isUnique(),
              ),
            ]),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildPruneResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdPrune: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          days: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(30),
              ),
            ),
          ),
          compute_prune_count: Schema.optional(Schema.NullOr(Schema.Boolean)),
          include_roles: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(100), Schema.isUnique()),
              Schema.NullOr(Schema.Null),
            ]),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildPruneResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRegions: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(VoiceRegionResponseSchema))))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRequests: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          status: Schema.optional(GuildJoinRequestApplicationStatusSchema),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildJoinRequestsListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdRequestsRequestId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          request_id: SnowflakeTypeSchema,
          action: Schema.optional(
            GuildJoinRequestApplicationStatusSchema.annotate({
              description: 'Whether to approve or reject the join request',
            }),
          ),
          rejection_reason: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 160, {
                  expected: 'a string of at most 160 characters',
                }),
              ),
            ).annotate({ description: 'Reason for rejection. Only used when action is REJECTED' }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildJoinRequestResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRoles: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(Schema.Array(GuildRoleResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdRoles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          name: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
          permissions: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
          color: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(16777215),
              ),
            ),
          ),
          colors: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), RoleColorsSchema])),
          hoist: Schema.optional(Schema.NullOr(Schema.Boolean)),
          mentionable: Schema.optional(Schema.NullOr(Schema.Boolean)),
          icon: Schema.optional(Schema.NullOr(Schema.String)),
          unicode_emoji: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildRoleResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdRoles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          body: Schema.Array(UpdateRolePositionsRequestSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Array(GuildRoleResponseSchema)))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRolesMemberCounts: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.Record(Schema.String, Schema.Number.check(Schema.isInt32())),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildRoleResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          role_id: SnowflakeTypeSchema,
          name: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
          permissions: Schema.optional(Schema.NullOr(Schema.Number.check(Schema.isInt()))),
          color: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(16777215),
              ),
            ),
          ),
          colors: Schema.optional(Schema.Union([Schema.NullOr(Schema.Null), RoleColorsSchema])),
          hoist: Schema.optional(Schema.NullOr(Schema.Boolean)),
          mentionable: Schema.optional(Schema.NullOr(Schema.Boolean)),
          icon: Schema.optional(Schema.NullOr(Schema.String)),
          unicode_emoji: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildRoleResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEvents: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          with_user_count: Schema.optional(Schema.Boolean),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.NullOr(
          Schema.Array(
            Schema.Union([
              ExternalScheduledEventResponseSchema,
              StageScheduledEventResponseSchema,
              VoiceScheduledEventResponseSchema,
            ]),
          ),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdScheduledEvents: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          body: Schema.Union([
            ExternalScheduledEventCreateRequestSchema,
            StageScheduledEventCreateRequestSchema,
            VoiceScheduledEventCreateRequestSchema,
          ]),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          ExternalScheduledEventResponseSchema,
          StageScheduledEventResponseSchema,
          VoiceScheduledEventResponseSchema,
        ]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          with_user_count: Schema.optional(Schema.Boolean),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          ExternalScheduledEventResponseSchema,
          StageScheduledEventResponseSchema,
          VoiceScheduledEventResponseSchema,
        ]),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdScheduledEventsGuildScheduledEventId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdScheduledEventsGuildScheduledEventId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          body: Schema.Union([
            ExternalScheduledEventPatchRequestPartialSchema,
            StageScheduledEventPatchRequestPartialSchema,
            VoiceScheduledEventPatchRequestPartialSchema,
          ]),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Union([
          ExternalScheduledEventResponseSchema,
          StageScheduledEventResponseSchema,
          VoiceScheduledEventResponseSchema,
        ]),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          scheduled_start_time: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.isPattern(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ).annotate({ description: 'Overridden start time of this occurrence' }),
          ),
          scheduled_end_time: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.isPattern(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ).annotate({ description: 'Overridden end time of this occurrence' }),
          ),
          original_scheduled_start_time: Schema.String.check(
            Schema.isPattern(
              /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
            ),
          ).annotate({
            description: 'The original start time of the occurrence to create an exception for',
          }),
          is_canceled: Schema.optional(
            Schema.NullOr(Schema.Boolean).annotate({
              description: 'Whether this occurrence is canceled',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildScheduledEventExceptionResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          exception_id: SnowflakeTypeSchema,
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          exception_id: SnowflakeTypeSchema,
          scheduled_start_time: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.isPattern(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ).annotate({ description: 'Overridden start time of this occurrence' }),
          ),
          scheduled_end_time: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.isPattern(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ).annotate({ description: 'Overridden end time of this occurrence' }),
          ),
          is_canceled: Schema.optional(
            Schema.NullOr(Schema.Boolean).annotate({
              description: 'Whether this occurrence is canceled',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildScheduledEventExceptionResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          with_member: Schema.optional(Schema.Boolean),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          before: Schema.optional(SnowflakeTypeSchema),
          after: Schema.optional(SnowflakeTypeSchema),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(ScheduledEventUserResponseSchema))),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          guild_scheduled_event_id: SnowflakeTypeSchema,
          guild_scheduled_event_exception_ids: Schema.optional(
            Schema.Array(SnowflakeTypeSchema).check(Schema.isMaxLength(10)),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ScheduledEventUserCountResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsers:
    t.procedure
      .input(
        Schema.toStandardSchemaV1(
          Schema.Struct({
            guild_id: SnowflakeTypeSchema,
            guild_scheduled_event_id: SnowflakeTypeSchema,
            guild_scheduled_event_exception_id: SnowflakeTypeSchema,
            with_member: Schema.optional(Schema.Boolean),
            limit: Schema.optional(
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(100),
              ),
            ),
            before: Schema.optional(SnowflakeTypeSchema),
            after: Schema.optional(SnowflakeTypeSchema),
          }),
        ),
      )
      .output(
        Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(ScheduledEventUserResponseSchema))),
      )
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  getGuildsGuildIdSoundboardSounds: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(ListGuildSoundboardSoundsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdSoundboardSounds: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 2, {
              expected: 'a string of at least 2 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 32, {
              expected: 'a string of at most 32 characters',
            }),
          ),
          volume: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)),
            ),
          ),
          emoji_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          emoji_name: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 32, {
                  expected: 'a string of at most 32 characters',
                }),
              ),
            ),
          ),
          sound: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SoundboardSoundResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdSoundboardSoundsSoundId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SoundboardSoundResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdSoundboardSoundsSoundId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdSoundboardSoundsSoundId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          sound_id: SnowflakeTypeSchema,
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 2, {
                expected: 'a string of at least 2 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 32, {
                expected: 'a string of at most 32 characters',
              }),
            ),
          ),
          volume: Schema.optional(
            Schema.NullOr(
              Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(1)),
            ),
          ),
          emoji_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          emoji_name: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 32, {
                  expected: 'a string of at most 32 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SoundboardSoundResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdStickers: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(Schema.Array(GuildStickerResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdStickers: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(GuildStickerResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdStickersStickerId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildStickerResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdStickersStickerId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdStickersStickerId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          sticker_id: SnowflakeTypeSchema,
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 2, {
                expected: 'a string of at least 2 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 30, {
                expected: 'a string of at most 30 characters',
              }),
            ),
          ),
          tags: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 200, {
                expected: 'a string of at most 200 characters',
              }),
            ),
          ),
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 100, {
                  expected: 'a string of at most 100 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildStickerResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdTemplates: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(GuildTemplateResponseSchema))))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postGuildsGuildIdTemplates: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 100, {
              expected: 'a string of at most 100 characters',
            }),
          ),
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 120, {
                  expected: 'a string of at most 120 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildTemplateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putGuildsGuildIdTemplatesCode: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildTemplateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteGuildsGuildIdTemplatesCode: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildTemplateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdTemplatesCode: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 100, {
                expected: 'a string of at most 100 characters',
              }),
            ),
          ),
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 120, {
                  expected: 'a string of at most 120 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildTemplateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdThreadsActive: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(ThreadsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdVanityUrl: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(VanityURLResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdVoiceStatesMe: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(VoiceStateResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdVoiceStatesMe: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          request_to_speak_timestamp: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.isPattern(
                  /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
                ),
              ),
            ),
          ),
          suppress: Schema.optional(Schema.NullOr(Schema.Boolean)),
          channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdVoiceStatesUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(VoiceStateResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdVoiceStatesUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          user_id: SnowflakeTypeSchema,
          suppress: Schema.optional(Schema.NullOr(Schema.Boolean)),
          channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWebhooks: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
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
  getGuildsGuildIdWelcomeScreen: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(GuildWelcomeScreenResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdWelcomeScreen: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          description: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length <= 140, {
                  expected: 'a string of at most 140 characters',
                }),
              ),
            ),
          ),
          welcome_channels: Schema.optional(
            Schema.NullOr(Schema.Array(GuildWelcomeChannelSchema).check(Schema.isMaxLength(5))),
          ),
          enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GuildWelcomeScreenResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWidget: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(WidgetSettingsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  patchGuildsGuildIdWidget: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          channel_id: Schema.optional(
            Schema.Union([Schema.NullOr(Schema.Null), SnowflakeTypeSchema]),
          ),
          enabled: Schema.optional(Schema.NullOr(Schema.Boolean)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(WidgetSettingsResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWidgetJson: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ guild_id: SnowflakeTypeSchema })))
    .output(Schema.toStandardSchemaV1(WidgetResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getGuildsGuildIdWidgetPng: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          guild_id: SnowflakeTypeSchema,
          style: Schema.optional(WidgetImageStylesSchema),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
