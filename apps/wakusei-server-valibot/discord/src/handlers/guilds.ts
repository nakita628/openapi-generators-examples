import { os } from '@orpc/server'
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
  DefaultKeywordRuleResponseSchema,
  DiscordIntegrationResponseSchema,
  EmojiResponseSchema,
  ExternalConnectionIntegrationResponseSchema,
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
  ListGuildSoundboardSoundsResponseSchema,
  MLSpamRuleResponseSchema,
  MentionSpamRuleResponseSchema,
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
  StageScheduledEventResponseSchema,
  ThreadAutoArchiveDurationSchema,
  ThreadResponseSchema,
  ThreadSearchTagSettingSchema,
  ThreadSortOrderSchema,
  ThreadsResponseSchema,
  UpdateDefaultReactionEmojiRequestSchema,
  UpdateOnboardingPromptRequestSchema,
  UserGuildOnboardingResponseSchema,
  UserNotificationSettingsSchema,
  UserProfileRuleResponseSchema,
  VanityURLResponseSchema,
  VerificationLevelsSchema,
  VideoQualityModesSchema,
  VoiceRegionResponseSchema,
  VoiceScheduledEventResponseSchema,
  VoiceStateResponseSchema,
  WidgetImageStylesSchema,
  WidgetResponseSchema,
  WidgetSettingsResponseSchema,
} from '../components'

export const getGuildsTemplatesCode = os
  .route({
    method: 'GET',
    path: '/guilds/templates/{code}',
    successDescription: '200 response for get_guild_template',
  })
  .input(v.object({ code: v.pipe(v.string(), v.maxCodePoints(152133)) }))
  .output(GuildTemplateResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}',
    successDescription: '200 response for get_guild',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      with_counts: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
    }),
  )
  .output(GuildWithCountsResponseSchema)
  .handler(async ({ input }) => {})

export const patchGuildsGuildId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}',
    successDescription: '200 response for update_guild',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdAuditLogs = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/audit-logs',
    successDescription: '200 response for list_guild_audit_log_entries',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      user_id: v.optional(SnowflakeTypeSchema),
      target_id: v.optional(SnowflakeTypeSchema),
      action_type: v.optional(AuditLogActionTypesSchema),
      before: v.optional(SnowflakeTypeSchema),
      after: v.optional(SnowflakeTypeSchema),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
    }),
  )
  .output(GuildAuditLogResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdAutoModerationRules = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/auto-moderation/rules',
    successDescription: '200 response for list_auto_moderation_rules',
  })
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
  .handler(async ({ input }) => {})

export const postGuildsGuildIdAutoModerationRules = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/auto-moderation/rules',
    successDescription: '200 response for create_auto_moderation_rule',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(
    v.union([
      DefaultKeywordRuleResponseSchema,
      KeywordRuleResponseSchema,
      MLSpamRuleResponseSchema,
      MentionSpamRuleResponseSchema,
      UserProfileRuleResponseSchema,
    ]),
  )
  .handler(async ({ input }) => {})

export const getGuildsGuildIdAutoModerationRulesRuleId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
    successDescription: '200 response for get_auto_moderation_rule',
  })
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
  .handler(async ({ input }) => {})

export const deleteGuildsGuildIdAutoModerationRulesRuleId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
    successStatus: 204,
    successDescription: '204 response for delete_auto_moderation_rule',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdAutoModerationRulesRuleId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
    successDescription: '200 response for update_auto_moderation_rule',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdBans = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/bans',
    successDescription: '200 response for list_guild_bans',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(1000),
        ),
      ),
      before: v.optional(SnowflakeTypeSchema),
      after: v.optional(SnowflakeTypeSchema),
    }),
  )
  .output(v.nullable(v.array(GuildBanResponseSchema)))
  .handler(async ({ input }) => {})

export const getGuildsGuildIdBansUserId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/bans/{user_id}',
    successDescription: '200 response for get_guild_ban',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .output(GuildBanResponseSchema)
  .handler(async ({ input }) => {})

export const putGuildsGuildIdBansUserId = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/bans/{user_id}',
    successStatus: 204,
    successDescription: '204 response for ban_user_from_guild',
  })
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
  .handler(async ({ input }) => {})

export const deleteGuildsGuildIdBansUserId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/bans/{user_id}',
    successStatus: 204,
    successDescription: '204 response for unban_user_from_guild',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const postGuildsGuildIdBulkBan = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/bulk-ban',
    successDescription: '200 response for bulk_ban_users_from_guild',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdChannels = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/channels',
    successDescription: '200 response for list_guild_channels',
  })
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
  .handler(async ({ input }) => {})

export const postGuildsGuildIdChannels = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/channels',
    successStatus: 201,
    successDescription: '201 response for create_guild_channel',
  })
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
      topic: v.optional(v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(4096)))),
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
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdChannels = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/channels',
    successStatus: 204,
    successDescription: '204 response for bulk_update_guild_channels',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const getGuildsGuildIdEmojis = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/emojis',
    successDescription: '200 response for list_guild_emojis',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(v.nullable(v.array(EmojiResponseSchema)))
  .handler(async ({ input }) => {})

export const postGuildsGuildIdEmojis = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/emojis',
    successStatus: 201,
    successDescription: '201 response for create_guild_emoji',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdEmojisEmojiId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/emojis/{emoji_id}',
    successDescription: '200 response for get_guild_emoji',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
  .output(EmojiResponseSchema)
  .handler(async ({ input }) => {})

export const deleteGuildsGuildIdEmojisEmojiId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/emojis/{emoji_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_emoji',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdEmojisEmojiId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/emojis/{emoji_id}',
    successDescription: '200 response for update_guild_emoji',
  })
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
  .handler(async ({ input }) => {})

export const putGuildsGuildIdIncidentActions = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/incident-actions',
    description: 'Modifies the incident actions of the guild',
    successDescription: '200 response for update_guild_incident_actions',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdIntegrations = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/integrations',
    successDescription: '200 response for list_guild_integrations',
  })
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
  .handler(async ({ input }) => {})

export const deleteGuildsGuildIdIntegrationsIntegrationId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/integrations/{integration_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_integration',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const getGuildsGuildIdInvites = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/invites',
    successDescription: '200 response for list_guild_invites',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdMembers = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/members',
    successDescription: '200 response for list_guild_members',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(1000),
        ),
      ),
      after: v.optional(SnowflakeTypeSchema),
    }),
  )
  .output(v.array(GuildMemberResponseSchema))
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdMembersMe = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/members/@me',
    successDescription: '200 response for update_my_guild_member',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdMembersSearch = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/members/search',
    successDescription: '200 response for search_guild_members',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(1000),
        ),
      ),
      query: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
    }),
  )
  .output(v.array(GuildMemberResponseSchema))
  .handler(async ({ input }) => {})

export const getGuildsGuildIdMembersUserId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/members/{user_id}',
    successDescription: '200 response for get_guild_member',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .output(GuildMemberResponseSchema)
  .handler(async ({ input }) => {})

export const putGuildsGuildIdMembersUserId = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/members/{user_id}',
    successStatus: 201,
    successDescription: '201 response for add_guild_member',
  })
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
  .handler(async ({ input }) => {})

export const deleteGuildsGuildIdMembersUserId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/members/{user_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_member',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdMembersUserId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/members/{user_id}',
    successDescription: '200 response for update_guild_member',
  })
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
  .handler(async ({ input }) => {})

export const putGuildsGuildIdMembersUserIdRolesRoleId = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/members/{user_id}/roles/{role_id}',
    successStatus: 204,
    successDescription: '204 response for add_guild_member_role',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      role_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => {})

export const deleteGuildsGuildIdMembersUserIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/members/{user_id}/roles/{role_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_member_role',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      role_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => {})

export const getGuildsGuildIdMessagesSearch = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/messages/search',
    successDescription: '200 response for guild_search',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      sort_by: v.optional(SortingModeSchema),
      sort_order: v.optional(SortingOrderSchema),
      content: v.optional(v.pipe(v.string(), v.maxCodePoints(1024))),
      slop: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(100),
        ),
      ),
      author_id: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(SnowflakeTypeSchema),
          v.maxLength(100),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      author_type: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(AuthorTypeSchema),
          v.maxLength(6),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      mentions: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(SnowflakeTypeSchema),
          v.maxLength(100),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      mentions_role_id: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(SnowflakeTypeSchema),
          v.maxLength(100),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      replied_to_user_id: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(SnowflakeTypeSchema),
          v.maxLength(100),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      replied_to_message_id: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(SnowflakeTypeSchema),
          v.maxLength(100),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      mention_everyone: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      min_id: v.optional(SnowflakeTypeSchema),
      max_id: v.optional(SnowflakeTypeSchema),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(25),
        ),
      ),
      offset: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(9975),
        ),
      ),
      has: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(HasOptionSchema),
          v.maxLength(18),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      link_hostname: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(256))),
          v.maxLength(100),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      embed_provider: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(256))),
          v.maxLength(100),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      embed_type: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(SearchableEmbedTypeSchema),
          v.maxLength(5),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      attachment_extension: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(256))),
          v.maxLength(100),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      attachment_filename: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.pipe(v.string(), v.maxCodePoints(1024))),
          v.maxLength(100),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
      pinned: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      include_nsfw: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      channel_id: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(SnowflakeTypeSchema),
          v.maxLength(500),
          v.check((input) => new Set(input).size === input.length),
        ),
      ),
    }),
  )
  .output(GuildSearchResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdNewMemberWelcome = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/new-member-welcome',
    successDescription: '200 response for get_guild_new_member_welcome',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(GuildHomeSettingsResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdOnboarding = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/onboarding',
    successDescription: '200 response for get_guilds_onboarding',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(UserGuildOnboardingResponseSchema)
  .handler(async ({ input }) => {})

export const putGuildsGuildIdOnboarding = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/onboarding',
    successDescription: '200 response for put_guilds_onboarding',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdPermissionsMemberUserId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/permissions/member/{user_id}',
    description:
      "Returns the fully cascaded guild-level permissions for a member, applying all of their roles including @everyone's",
    successDescription: '200 response for get_guild_member_permissions',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .output(PermissionsResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdPermissionsRoleRoleId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/permissions/role/{role_id}',
    description:
      "Returns the permissions a role grants at the guild level, combining the role's own permissions with @everyone's.",
    successDescription: '200 response for get_guild_role_permissions',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
  .output(PermissionsResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdPreview = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/preview',
    successDescription: '200 response for get_guild_preview',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(GuildPreviewResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdPrune = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/prune',
    successDescription: '200 response for preview_prune_guild',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      days: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(30),
        ),
      ),
      include_roles: v.optional(
        v.union([
          v.string(),
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(
                  v.union([
                    v.pipe(
                      v.unknown(),
                      v.transform((input) => (input === 'null' ? null : input)),
                      v.nullable(v.null()),
                    ),
                    SnowflakeTypeSchema,
                  ]),
                ),
              ),
            ),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ]),
      ),
    }),
  )
  .output(GuildPruneResponseSchema)
  .handler(async ({ input }) => {})

export const postGuildsGuildIdPrune = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/prune',
    successDescription: '200 response for prune_guild',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      days: v.optional(v.nullable(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(30)))),
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdRegions = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/regions',
    successDescription: '200 response for list_guild_voice_regions',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(v.nullable(v.array(VoiceRegionResponseSchema)))
  .handler(async ({ input }) => {})

export const getGuildsGuildIdRequests = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/requests',
    description: 'List join requests for guild, optionally filtered by application status',
    successDescription: '200 response for get_guild_join_requests',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      status: v.optional(GuildJoinRequestApplicationStatusSchema),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
      before: v.optional(SnowflakeTypeSchema),
      after: v.optional(SnowflakeTypeSchema),
    }),
  )
  .output(GuildJoinRequestsListResponseSchema)
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdRequestsRequestId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/requests/{request_id}',
    description: 'Approve or reject guild join request',
    successDescription: '200 response for action_guild_join_request',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdRoles = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/roles',
    successDescription: '200 response for list_guild_roles',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(v.array(GuildRoleResponseSchema))
  .handler(async ({ input }) => {})

export const postGuildsGuildIdRoles = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/roles',
    successDescription: '200 response for create_guild_role',
  })
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
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdRoles = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/roles',
    successDescription: '200 response for bulk_update_guild_roles',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(v.array(GuildRoleResponseSchema))
  .handler(async ({ input }) => {})

export const getGuildsGuildIdRolesMemberCounts = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/roles/member-counts',
    successDescription: '200 response for guild_role_member_counts',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(
    v.record(
      v.string(),
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    ),
  )
  .handler(async ({ input }) => {})

export const getGuildsGuildIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/roles/{role_id}',
    successDescription: '200 response for get_guild_role',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
  .output(GuildRoleResponseSchema)
  .handler(async ({ input }) => {})

export const deleteGuildsGuildIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/roles/{role_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_role',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdRolesRoleId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/roles/{role_id}',
    successDescription: '200 response for update_guild_role',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdScheduledEvents = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/scheduled-events',
    successDescription: '200 response for list_guild_scheduled_events',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      with_user_count: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
    }),
  )
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
  .handler(async ({ input }) => {})

export const postGuildsGuildIdScheduledEvents = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/scheduled-events',
    successDescription: '200 response for create_guild_scheduled_event',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(
    v.union([
      ExternalScheduledEventResponseSchema,
      StageScheduledEventResponseSchema,
      VoiceScheduledEventResponseSchema,
    ]),
  )
  .handler(async ({ input }) => {})

export const getGuildsGuildIdScheduledEventsGuildScheduledEventId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    successDescription: '200 response for get_guild_scheduled_event',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      guild_scheduled_event_id: SnowflakeTypeSchema,
      with_user_count: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
    }),
  )
  .output(
    v.union([
      ExternalScheduledEventResponseSchema,
      StageScheduledEventResponseSchema,
      VoiceScheduledEventResponseSchema,
    ]),
  )
  .handler(async ({ input }) => {})

export const deleteGuildsGuildIdScheduledEventsGuildScheduledEventId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_scheduled_event',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdScheduledEventsGuildScheduledEventId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    successDescription: '200 response for update_guild_scheduled_event',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }))
  .output(
    v.union([
      ExternalScheduledEventResponseSchema,
      StageScheduledEventResponseSchema,
      VoiceScheduledEventResponseSchema,
    ]),
  )
  .handler(async ({ input }) => {})

export const postGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptions = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions',
    description: 'Create an exception to a recurring guild scheduled event',
    successDescription: '200 response for create_guild_scheduled_event_exception',
  })
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
  .handler(async ({ input }) => {})

export const deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}',
    description: 'Delete an exception to a recurring guild scheduled event',
    successStatus: 204,
    successDescription: '204 response for delete_guild_scheduled_event_exception',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      guild_scheduled_event_id: SnowflakeTypeSchema,
      exception_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}',
    description: 'Modify an exception to a recurring guild scheduled event',
    successDescription: '200 response for update_guild_scheduled_event_exception',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users',
    successDescription: '200 response for list_guild_scheduled_event_users',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      guild_scheduled_event_id: SnowflakeTypeSchema,
      with_member: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
      before: v.optional(SnowflakeTypeSchema),
      after: v.optional(SnowflakeTypeSchema),
    }),
  )
  .output(v.nullable(v.array(ScheduledEventUserResponseSchema)))
  .handler(async ({ input }) => {})

export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users/counts',
    description: 'Get the count of users subscribed to a guild scheduled event',
    successDescription: '200 response for count_guild_scheduled_event_users',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      guild_scheduled_event_id: SnowflakeTypeSchema,
      guild_scheduled_event_exception_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(SnowflakeTypeSchema),
          v.maxLength(10),
        ),
      ),
    }),
  )
  .output(ScheduledEventUserCountResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsers =
  os
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/{guild_scheduled_event_exception_id}/users',
      description: 'Get a list of users subscribed to a guild scheduled event exception',
      successDescription: '200 response for list_guild_scheduled_event_exception_users',
    })
    .input(
      v.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
        with_member: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        ),
        limit: v.optional(
          v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
        ),
        before: v.optional(SnowflakeTypeSchema),
        after: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(v.nullable(v.array(ScheduledEventUserResponseSchema)))
    .handler(async ({ input }) => {})

export const getGuildsGuildIdSoundboardSounds = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/soundboard-sounds',
    successDescription: '200 response for list_guild_soundboard_sounds',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(ListGuildSoundboardSoundsResponseSchema)
  .handler(async ({ input }) => {})

export const postGuildsGuildIdSoundboardSounds = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/soundboard-sounds',
    successStatus: 201,
    successDescription: '201 response for create_guild_soundboard_sound',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdSoundboardSoundsSoundId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
    successDescription: '200 response for get_guild_soundboard_sound',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
  .output(SoundboardSoundResponseSchema)
  .handler(async ({ input }) => {})

export const deleteGuildsGuildIdSoundboardSoundsSoundId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_soundboard_sound',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdSoundboardSoundsSoundId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
    successDescription: '200 response for update_guild_soundboard_sound',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdStickers = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/stickers',
    successDescription: '200 response for list_guild_stickers',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(v.array(GuildStickerResponseSchema))
  .handler(async ({ input }) => {})

export const postGuildsGuildIdStickers = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/stickers',
    successStatus: 201,
    successDescription: '201 response for create_guild_sticker',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(GuildStickerResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdStickersStickerId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/stickers/{sticker_id}',
    successDescription: '200 response for get_guild_sticker',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
  .output(GuildStickerResponseSchema)
  .handler(async ({ input }) => {})

export const deleteGuildsGuildIdStickersStickerId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/stickers/{sticker_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_sticker',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdStickersStickerId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/stickers/{sticker_id}',
    successDescription: '200 response for update_guild_sticker',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdTemplates = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/templates',
    successDescription: '200 response for list_guild_templates',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(v.nullable(v.array(GuildTemplateResponseSchema)))
  .handler(async ({ input }) => {})

export const postGuildsGuildIdTemplates = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/templates',
    successDescription: '200 response for create_guild_template',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      name: v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100)),
      description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(120)))),
    }),
  )
  .output(GuildTemplateResponseSchema)
  .handler(async ({ input }) => {})

export const putGuildsGuildIdTemplatesCode = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/templates/{code}',
    successDescription: '200 response for sync_guild_template',
  })
  .input(
    v.object({ guild_id: SnowflakeTypeSchema, code: v.pipe(v.string(), v.maxCodePoints(152133)) }),
  )
  .output(GuildTemplateResponseSchema)
  .handler(async ({ input }) => {})

export const deleteGuildsGuildIdTemplatesCode = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/templates/{code}',
    successDescription: '200 response for delete_guild_template',
  })
  .input(
    v.object({ guild_id: SnowflakeTypeSchema, code: v.pipe(v.string(), v.maxCodePoints(152133)) }),
  )
  .output(GuildTemplateResponseSchema)
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdTemplatesCode = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/templates/{code}',
    successDescription: '200 response for update_guild_template',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      code: v.pipe(v.string(), v.maxCodePoints(152133)),
      name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
      description: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(120)))),
    }),
  )
  .output(GuildTemplateResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdThreadsActive = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/threads/active',
    successDescription: '200 response for get_active_guild_threads',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(ThreadsResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdVanityUrl = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/vanity-url',
    successDescription: '200 response for get_guild_vanity_url',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(VanityURLResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdVoiceStatesMe = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/voice-states/@me',
    successDescription: '200 response for get_self_voice_state',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(VoiceStateResponseSchema)
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdVoiceStatesMe = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/voice-states/@me',
    successStatus: 204,
    successDescription: '204 response for update_self_voice_state',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdVoiceStatesUserId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/voice-states/{user_id}',
    successDescription: '200 response for get_voice_state',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .output(VoiceStateResponseSchema)
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdVoiceStatesUserId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/voice-states/{user_id}',
    successStatus: 204,
    successDescription: '204 response for update_voice_state',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      suppress: v.optional(v.nullable(v.boolean())),
      channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
    }),
  )
  .handler(async ({ input }) => {})

export const getGuildsGuildIdWebhooks = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/webhooks',
    successDescription: '200 response for get_guild_webhooks',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdWelcomeScreen = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/welcome-screen',
    successDescription: '200 response for get_guild_welcome_screen',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(GuildWelcomeScreenResponseSchema)
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdWelcomeScreen = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/welcome-screen',
    successDescription: '200 response for update_guild_welcome_screen',
  })
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
  .handler(async ({ input }) => {})

export const getGuildsGuildIdWidget = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/widget',
    successDescription: '200 response for get_guild_widget_settings',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(WidgetSettingsResponseSchema)
  .handler(async ({ input }) => {})

export const patchGuildsGuildIdWidget = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/widget',
    successDescription: '200 response for update_guild_widget_settings',
  })
  .input(
    v.object({
      guild_id: SnowflakeTypeSchema,
      channel_id: v.optional(v.union([v.nullable(v.null()), SnowflakeTypeSchema])),
      enabled: v.optional(v.nullable(v.boolean())),
    }),
  )
  .output(WidgetSettingsResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdWidgetJson = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/widget.json',
    successDescription: '200 response for get_guild_widget',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(WidgetResponseSchema)
  .handler(async ({ input }) => {})

export const getGuildsGuildIdWidgetPng = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/widget.png',
    successDescription: '200 response for get_guild_widget_png',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema, style: v.optional(WidgetImageStylesSchema) }))
  .handler(async ({ input }) => {})
