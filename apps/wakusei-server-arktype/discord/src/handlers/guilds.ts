import { os } from '@orpc/server'
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
  .input(
    type({
      code: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
    }),
  )
  .output(GuildTemplateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}',
    successDescription: '200 response for get_guild',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'with_counts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(GuildWithCountsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}',
    successDescription: '200 response for update_guild',
  })
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
      'region?': type('string | null'),
      'icon?': type('string | null'),
      'verification_level?': type('null | null').or(VerificationLevelsSchema),
      'default_message_notifications?': type('null | null').or(UserNotificationSettingsSchema),
      'explicit_content_filter?': type('null | null').or(GuildExplicitContentFilterTypesSchema),
      'preferred_locale?': type('null | null').or(AvailableLocalesEnumSchema),
      'afk_timeout?': type('null | null').or(AfkTimeoutsSchema),
      'afk_channel_id?': type('null | null').or(SnowflakeTypeSchema),
      'system_channel_id?': type('null | null').or(SnowflakeTypeSchema),
      'splash?': type('string | null'),
      'banner?': type('string | null'),
      'system_channel_flags?': type('number.integer | null'),
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
      'discovery_splash?': type('string | null'),
      'home_header?': type('string | null'),
      'rules_channel_id?': type('null | null').or(SnowflakeTypeSchema),
      'safety_alerts_channel_id?': type('null | null').or(SnowflakeTypeSchema),
      'public_updates_channel_id?': type('null | null').or(SnowflakeTypeSchema),
      'premium_progress_bar_enabled?': type('boolean | null'),
    }),
  )
  .output(GuildResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdAuditLogs = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/audit-logs',
    successDescription: '200 response for list_guild_audit_log_entries',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'user_id?': SnowflakeTypeSchema,
      'target_id?': SnowflakeTypeSchema,
      'action_type?': AuditLogActionTypesSchema,
      'before?': SnowflakeTypeSchema,
      'after?': SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
    }),
  )
  .output(GuildAuditLogResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdAutoModerationRules = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/auto-moderation/rules',
    successDescription: '200 response for list_auto_moderation_rules',
  })
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
        ).or('null | null'),
      ).array(),
    ).or('null'),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdAutoModerationRules = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/auto-moderation/rules',
    successDescription: '200 response for create_auto_moderation_rule',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(
    type(
      type(
        type(type(DefaultKeywordRuleResponseSchema).or(KeywordRuleResponseSchema)).or(
          MLSpamRuleResponseSchema,
        ),
      ).or(MentionSpamRuleResponseSchema),
    ).or(UserProfileRuleResponseSchema),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdAutoModerationRulesRuleId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
    successDescription: '200 response for get_auto_moderation_rule',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdAutoModerationRulesRuleId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
    successStatus: 204,
    successDescription: '204 response for delete_auto_moderation_rule',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdAutoModerationRulesRuleId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
    successDescription: '200 response for update_auto_moderation_rule',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdBans = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/bans',
    successDescription: '200 response for list_guild_bans',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 1000'),
      'before?': SnowflakeTypeSchema,
      'after?': SnowflakeTypeSchema,
    }),
  )
  .output(type(type(GuildBanResponseSchema).array()).or('null'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdBansUserId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/bans/{user_id}',
    successDescription: '200 response for get_guild_ban',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .output(GuildBanResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putGuildsGuildIdBansUserId = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/bans/{user_id}',
    successStatus: 204,
    successDescription: '204 response for ban_user_from_guild',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      'delete_message_seconds?': type('number.integer >= 0 & number.integer <= 604800 | null'),
      'delete_message_days?': type('number.integer >= 0 & number.integer <= 7 | null'),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdBansUserId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/bans/{user_id}',
    successStatus: 204,
    successDescription: '204 response for unban_user_from_guild',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdBulkBan = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/bulk-ban',
    successDescription: '200 response for bulk_ban_users_from_guild',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      user_ids: type(type(SnowflakeTypeSchema).array())
        .and(type('unknown[] <= 200'))
        .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      'delete_message_seconds?': type('number.integer >= 0 & number.integer <= 604800 | null'),
    }),
  )
  .output(BulkBanUsersResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdChannels = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/channels',
    successDescription: '200 response for list_guild_channels',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdChannels = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/channels',
    successStatus: 201,
    successDescription: '201 response for create_guild_channel',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'type?': type('null | null').or(ChannelTypesSchema),
      name: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
      'position?': type(
        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
      ),
      'topic?': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow((data, ctx) => [...data].length <= 4096 || ctx.mustBe('at most 4096 characters')),
      ).or('null'),
      'bitrate?': type(
        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 8000 | null',
      ),
      'user_limit?': type(
        'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer >= 0 | null',
      ),
      'nsfw?': type('boolean | null'),
      'rate_limit_per_user?': type('number.integer >= 0 & number.integer <= 21600 | null'),
      'parent_id?': type('null | null').or(SnowflakeTypeSchema),
      'permission_overwrites?': type(
        type(type(ChannelPermissionOverwriteRequestSchema).array()).and(type('unknown[] <= 100')),
      ).or('null'),
      'rtc_region?': type('string | null'),
      'video_quality_mode?': type('null | null').or(VideoQualityModesSchema),
      'default_auto_archive_duration?': type('null | null').or(ThreadAutoArchiveDurationSchema),
      'default_reaction_emoji?': type('null | null').or(UpdateDefaultReactionEmojiRequestSchema),
      'default_thread_rate_limit_per_user?': type(
        'number.integer >= 0 & number.integer <= 21600 | null',
      ),
      'default_sort_order?': type('null | null').or(ThreadSortOrderSchema),
      'default_forum_layout?': type('null | null').or(ForumLayoutSchema),
      'default_tag_setting?': type('null | null').or(ThreadSearchTagSettingSchema),
      'available_tags?': type(
        type(type(type('null | null').or(CreateOrUpdateThreadTagRequestSchema)).array()).and(
          type('unknown[] <= 20'),
        ),
      ).or('null'),
    }),
  )
  .output(GuildChannelResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdChannels = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/channels',
    successStatus: 204,
    successDescription: '204 response for bulk_update_guild_channels',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdEmojis = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/emojis',
    successDescription: '200 response for list_guild_emojis',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(type(type(EmojiResponseSchema).array()).or('null'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdEmojis = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/emojis',
    successStatus: 201,
    successDescription: '201 response for create_guild_emoji',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      name: type('string')
        .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
      image: type('string'),
      'roles?': type(
        type(type(type('null | null').or(SnowflakeTypeSchema)).array())
          .and(type('unknown[] <= 1521'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
    }),
  )
  .output(EmojiResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdEmojisEmojiId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/emojis/{emoji_id}',
    successDescription: '200 response for get_guild_emoji',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
  .output(EmojiResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdEmojisEmojiId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/emojis/{emoji_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_emoji',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdEmojisEmojiId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/emojis/{emoji_id}',
    successDescription: '200 response for update_guild_emoji',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      emoji_id: SnowflakeTypeSchema,
      'name?': type('string')
        .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
      'roles?': type(
        type(type(type('null | null').or(SnowflakeTypeSchema)).array())
          .and(type('unknown[] <= 1521'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
    }),
  )
  .output(EmojiResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putGuildsGuildIdIncidentActions = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/incident-actions',
    description: 'Modifies the incident actions of the guild',
    successDescription: '200 response for update_guild_incident_actions',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdIntegrations = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/integrations',
    successDescription: '200 response for list_guild_integrations',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdIntegrationsIntegrationId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/integrations/{integration_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_integration',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdInvites = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/invites',
    successDescription: '200 response for list_guild_invites',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdMembers = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/members',
    successDescription: '200 response for list_guild_members',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 1000'),
      'after?': SnowflakeTypeSchema,
    }),
  )
  .output(type(GuildMemberResponseSchema).array())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdMembersMe = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/members/@me',
    successDescription: '200 response for update_my_guild_member',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'nick?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters'),
        ),
      ).or('null'),
      'avatar?': type('string | null'),
      'bio?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 300 || ctx.mustBe('at most 300 characters'),
        ),
      ).or('null'),
      'banner?': type('string | null'),
    }),
  )
  .output(PrivateGuildMemberResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdMembersSearch = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/members/search',
    successDescription: '200 response for search_guild_members',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 1000'),
      query: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  )
  .output(type(GuildMemberResponseSchema).array())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdMembersUserId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/members/{user_id}',
    successDescription: '200 response for get_guild_member',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .output(GuildMemberResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putGuildsGuildIdMembersUserId = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/members/{user_id}',
    successStatus: 201,
    successDescription: '201 response for add_guild_member',
  })
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
      'mute?': type('boolean | null'),
      'deaf?': type('boolean | null'),
      access_token: type('string').narrow(
        (data, ctx) => [...data].length <= 10240 || ctx.mustBe('at most 10240 characters'),
      ),
      'flags?': type('number.integer | null'),
    }),
  )
  .output(GuildMemberResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdMembersUserId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/members/{user_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_member',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdMembersUserId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/members/{user_id}',
    successDescription: '200 response for update_guild_member',
  })
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
        type(type(type('null | null').or(SnowflakeTypeSchema)).array())
          .and(type('unknown[] <= 350'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
      'mute?': type('boolean | null'),
      'deaf?': type('boolean | null'),
      'channel_id?': type('null | null').or(SnowflakeTypeSchema),
      'communication_disabled_until?': type(
        type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ).or('null'),
      'flags?': type('number.integer | null'),
    }),
  )
  .output(GuildMemberResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putGuildsGuildIdMembersUserIdRolesRoleId = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/members/{user_id}/roles/{role_id}',
    successStatus: 204,
    successDescription: '204 response for add_guild_member_role',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      role_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdMembersUserIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/members/{user_id}/roles/{role_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_member_role',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      role_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdMessagesSearch = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/messages/search',
    successDescription: '200 response for guild_search',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'sort_by?': SortingModeSchema,
      'sort_order?': SortingOrderSchema,
      'content?': type('string').narrow(
        (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
      ),
      'slop?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 100'),
      'author_id?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
      'author_type?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(type(AuthorTypeSchema).array())
          .and(type('unknown[] <= 6'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
      'mentions?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
      'mentions_role_id?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
      'replied_to_user_id?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
      'replied_to_message_id?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
      'mention_everyone?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'min_id?': SnowflakeTypeSchema,
      'max_id?': SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 25'),
      'offset?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 9975'),
      'has?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(type(HasOptionSchema).array())
          .and(type('unknown[] <= 18'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
      'link_hostname?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(
          type(
            type('string').narrow(
              (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
            ),
          ).array(),
        )
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
      'embed_provider?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(
          type(
            type('string').narrow(
              (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
            ),
          ).array(),
        )
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
      'embed_type?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(type(SearchableEmbedTypeSchema).array())
          .and(type('unknown[] <= 5'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
      'attachment_extension?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(
          type(
            type('string').narrow(
              (data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'),
            ),
          ).array(),
        )
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
      'attachment_filename?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(
          type(
            type('string').narrow(
              (data, ctx) => [...data].length <= 1024 || ctx.mustBe('at most 1024 characters'),
            ),
          ).array(),
        )
          .and(type('unknown[] <= 100'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
      'pinned?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'include_nsfw?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'channel_id?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 500'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ),
    }),
  )
  .output(GuildSearchResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdNewMemberWelcome = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/new-member-welcome',
    successDescription: '200 response for get_guild_new_member_welcome',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(GuildHomeSettingsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdOnboarding = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/onboarding',
    successDescription: '200 response for get_guilds_onboarding',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(UserGuildOnboardingResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putGuildsGuildIdOnboarding = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/onboarding',
    successDescription: '200 response for put_guilds_onboarding',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'prompts?': type(
        type(type(UpdateOnboardingPromptRequestSchema).array()).and(type('unknown[] <= 15')),
      ).or('null'),
      'enabled?': type('boolean | null'),
      'default_channel_ids?': type(
        type(type(SnowflakeTypeSchema).array())
          .and(type('unknown[] <= 500'))
          .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
      ).or('null'),
      'mode?': type('null | null').or(GuildOnboardingModeSchema),
    }),
  )
  .output(GuildOnboardingResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdPermissionsMemberUserId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/permissions/member/{user_id}',
    description:
      "Returns the fully cascaded guild-level permissions for a member, applying all of their roles including @everyone's",
    successDescription: '200 response for get_guild_member_permissions',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .output(PermissionsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdPermissionsRoleRoleId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/permissions/role/{role_id}',
    description:
      "Returns the permissions a role grants at the guild level, combining the role's own permissions with @everyone's.",
    successDescription: '200 response for get_guild_role_permissions',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
  .output(PermissionsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdPreview = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/preview',
    successDescription: '200 response for get_guild_preview',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(GuildPreviewResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdPrune = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/prune',
    successDescription: '200 response for preview_prune_guild',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'days?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 30'),
      'include_roles?': type('unknown').pipe((data, ctx) => {
        for (const branch of [
          type('string'),
          type('unknown').pipe(
            (data) => (data === undefined || Array.isArray(data) ? data : [data]),
            type(
              type(
                type('unknown').pipe(
                  (data) => (data === 'null' ? null : data),
                  type(
                    type('unknown').pipe((data, ctx) => {
                      for (const branch of [
                        type('unknown')
                          .pipe((data) => (data === 'null' ? null : data))
                          .to('null | null'),
                        SnowflakeTypeSchema,
                      ]) {
                        const out = branch(data)
                        if (!(out instanceof type.errors)) return out
                      }
                      return ctx.error('one of the members')
                    }),
                  ).or('null'),
                ),
              ).array(),
            )
              .and(type('unknown[] <= 100'))
              .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
          ),
        ]) {
          const out = branch(data)
          if (!(out instanceof type.errors)) return out
        }
        return ctx.error('one of the members')
      }),
    }),
  )
  .output(GuildPruneResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdPrune = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/prune',
    successDescription: '200 response for prune_guild',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'days?': type('number.integer >= 1 & number.integer <= 30 | null'),
      'compute_prune_count?': type('boolean | null'),
      'include_roles?': type(
        type('string').or(
          type(type(SnowflakeTypeSchema).array())
            .and(type('unknown[] <= 100'))
            .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
        ),
      ).or('null | null'),
    }),
  )
  .output(GuildPruneResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdRegions = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/regions',
    successDescription: '200 response for list_guild_voice_regions',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(type(type(VoiceRegionResponseSchema).array()).or('null'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdRequests = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/requests',
    description: 'List join requests for guild, optionally filtered by application status',
    successDescription: '200 response for get_guild_join_requests',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'status?': GuildJoinRequestApplicationStatusSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
      'before?': SnowflakeTypeSchema,
      'after?': SnowflakeTypeSchema,
    }),
  )
  .output(GuildJoinRequestsListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdRequestsRequestId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/requests/{request_id}',
    description: 'Approve or reject guild join request',
    successDescription: '200 response for action_guild_join_request',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdRoles = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/roles',
    successDescription: '200 response for list_guild_roles',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(type(GuildRoleResponseSchema).array())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdRoles = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/roles',
    successDescription: '200 response for create_guild_role',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'name?': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
      ).or('null'),
      'permissions?': type('number.integer | null'),
      'color?': type('number.integer >= 0 & number.integer <= 16777215 | null'),
      'colors?': type('null | null').or(RoleColorsSchema),
      'hoist?': type('boolean | null'),
      'mentionable?': type('boolean | null'),
      'icon?': type('string | null'),
      'unicode_emoji?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
        ),
      ).or('null'),
    }),
  )
  .output(GuildRoleResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdRoles = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/roles',
    successDescription: '200 response for bulk_update_guild_roles',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(type(GuildRoleResponseSchema).array())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdRolesMemberCounts = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/roles/member-counts',
    successDescription: '200 response for guild_role_member_counts',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(type({ '[string]': 'number.integer >= -2147483648 & number.integer <= 2147483647' }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/roles/{role_id}',
    successDescription: '200 response for get_guild_role',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
  .output(GuildRoleResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/roles/{role_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_role',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdRolesRoleId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/roles/{role_id}',
    successDescription: '200 response for update_guild_role',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      role_id: SnowflakeTypeSchema,
      'name?': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
      ).or('null'),
      'permissions?': type('number.integer | null'),
      'color?': type('number.integer >= 0 & number.integer <= 16777215 | null'),
      'colors?': type('null | null').or(RoleColorsSchema),
      'hoist?': type('boolean | null'),
      'mentionable?': type('boolean | null'),
      'icon?': type('string | null'),
      'unicode_emoji?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
        ),
      ).or('null'),
    }),
  )
  .output(GuildRoleResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdScheduledEvents = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/scheduled-events',
    successDescription: '200 response for list_guild_scheduled_events',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'with_user_count?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(
    type(
      type(
        type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
          VoiceScheduledEventResponseSchema,
        ),
      ).array(),
    ).or('null'),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdScheduledEvents = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/scheduled-events',
    successDescription: '200 response for create_guild_scheduled_event',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(
    type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
      VoiceScheduledEventResponseSchema,
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdScheduledEventsGuildScheduledEventId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    successDescription: '200 response for get_guild_scheduled_event',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      guild_scheduled_event_id: SnowflakeTypeSchema,
      'with_user_count?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(
    type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
      VoiceScheduledEventResponseSchema,
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdScheduledEventsGuildScheduledEventId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_scheduled_event',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdScheduledEventsGuildScheduledEventId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    successDescription: '200 response for update_guild_scheduled_event',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }))
  .output(
    type(type(ExternalScheduledEventResponseSchema).or(StageScheduledEventResponseSchema)).or(
      VoiceScheduledEventResponseSchema,
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptions = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions',
    description: 'Create an exception to a recurring guild scheduled event',
    successDescription: '200 response for create_guild_scheduled_event_exception',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}',
    description: 'Delete an exception to a recurring guild scheduled event',
    successStatus: 204,
    successDescription: '204 response for delete_guild_scheduled_event_exception',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      guild_scheduled_event_id: SnowflakeTypeSchema,
      exception_id: SnowflakeTypeSchema,
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}',
    description: 'Modify an exception to a recurring guild scheduled event',
    successDescription: '200 response for update_guild_scheduled_event_exception',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users',
    successDescription: '200 response for list_guild_scheduled_event_users',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      guild_scheduled_event_id: SnowflakeTypeSchema,
      'with_member?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
      'before?': SnowflakeTypeSchema,
      'after?': SnowflakeTypeSchema,
    }),
  )
  .output(type(type(ScheduledEventUserResponseSchema).array()).or('null'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users/counts',
    description: 'Get the count of users subscribed to a guild scheduled event',
    successDescription: '200 response for count_guild_scheduled_event_users',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      guild_scheduled_event_id: SnowflakeTypeSchema,
      'guild_scheduled_event_exception_ids?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(type(SnowflakeTypeSchema).array()).and(type('unknown[] <= 10')),
      ),
    }),
  )
  .output(ScheduledEventUserCountResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsers =
  os
    .route({
      method: 'GET',
      path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/{guild_scheduled_event_exception_id}/users',
      description: 'Get a list of users subscribed to a guild scheduled event exception',
      successDescription: '200 response for list_guild_scheduled_event_exception_users',
    })
    .input(
      type({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
        'with_member?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
      }),
    )
    .output(type(type(ScheduledEventUserResponseSchema).array()).or('null'))
    .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdSoundboardSounds = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/soundboard-sounds',
    successDescription: '200 response for list_guild_soundboard_sounds',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(ListGuildSoundboardSoundsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdSoundboardSounds = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/soundboard-sounds',
    successStatus: 201,
    successDescription: '201 response for create_guild_soundboard_sound',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      name: type('string')
        .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
      'volume?': type('number >= 0 & number <= 1 | null'),
      'emoji_id?': type('null | null').or(SnowflakeTypeSchema),
      'emoji_name?': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
      ).or('null'),
      sound: type('string'),
    }),
  )
  .output(SoundboardSoundResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdSoundboardSoundsSoundId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
    successDescription: '200 response for get_guild_soundboard_sound',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
  .output(SoundboardSoundResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdSoundboardSoundsSoundId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_soundboard_sound',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdSoundboardSoundsSoundId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
    successDescription: '200 response for update_guild_soundboard_sound',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      sound_id: SnowflakeTypeSchema,
      'name?': type('string')
        .narrow((data, ctx) => [...data].length >= 2 || ctx.mustBe('at least 2 characters'))
        .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
      'volume?': type('number >= 0 & number <= 1 | null'),
      'emoji_id?': type('null | null').or(SnowflakeTypeSchema),
      'emoji_name?': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 32 || ctx.mustBe('at most 32 characters')),
      ).or('null'),
    }),
  )
  .output(SoundboardSoundResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdStickers = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/stickers',
    successDescription: '200 response for list_guild_stickers',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(type(GuildStickerResponseSchema).array())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdStickers = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/stickers',
    successStatus: 201,
    successDescription: '201 response for create_guild_sticker',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(GuildStickerResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdStickersStickerId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/stickers/{sticker_id}',
    successDescription: '200 response for get_guild_sticker',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
  .output(GuildStickerResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdStickersStickerId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/stickers/{sticker_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_sticker',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdStickersStickerId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/stickers/{sticker_id}',
    successDescription: '200 response for update_guild_sticker',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdTemplates = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/templates',
    successDescription: '200 response for list_guild_templates',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(type(type(GuildTemplateResponseSchema).array()).or('null'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdTemplates = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/templates',
    successDescription: '200 response for create_guild_template',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putGuildsGuildIdTemplatesCode = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/templates/{code}',
    successDescription: '200 response for sync_guild_template',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      code: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
    }),
  )
  .output(GuildTemplateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdTemplatesCode = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/templates/{code}',
    successDescription: '200 response for delete_guild_template',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      code: type('string').narrow(
        (data, ctx) => [...data].length <= 152133 || ctx.mustBe('at most 152133 characters'),
      ),
    }),
  )
  .output(GuildTemplateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdTemplatesCode = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/templates/{code}',
    successDescription: '200 response for update_guild_template',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdThreadsActive = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/threads/active',
    successDescription: '200 response for get_active_guild_threads',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(ThreadsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdVanityUrl = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/vanity-url',
    successDescription: '200 response for get_guild_vanity_url',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(VanityURLResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdVoiceStatesMe = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/voice-states/@me',
    successDescription: '200 response for get_self_voice_state',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(VoiceStateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdVoiceStatesMe = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/voice-states/@me',
    successStatus: 204,
    successDescription: '204 response for update_self_voice_state',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'request_to_speak_timestamp?': type(
        type(
          /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
        ),
      ).or('null'),
      'suppress?': type('boolean | null'),
      'channel_id?': type('null | null').or(SnowflakeTypeSchema),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdVoiceStatesUserId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/voice-states/{user_id}',
    successDescription: '200 response for get_voice_state',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .output(VoiceStateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdVoiceStatesUserId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/voice-states/{user_id}',
    successStatus: 204,
    successDescription: '204 response for update_voice_state',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      'suppress?': type('boolean | null'),
      'channel_id?': type('null | null').or(SnowflakeTypeSchema),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdWebhooks = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/webhooks',
    successDescription: '200 response for get_guild_webhooks',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdWelcomeScreen = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/welcome-screen',
    successDescription: '200 response for get_guild_welcome_screen',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(GuildWelcomeScreenResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdWelcomeScreen = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/welcome-screen',
    successDescription: '200 response for update_guild_welcome_screen',
  })
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
      'enabled?': type('boolean | null'),
    }),
  )
  .output(GuildWelcomeScreenResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdWidget = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/widget',
    successDescription: '200 response for get_guild_widget_settings',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(WidgetSettingsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdWidget = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/widget',
    successDescription: '200 response for update_guild_widget_settings',
  })
  .input(
    type({
      guild_id: SnowflakeTypeSchema,
      'channel_id?': type('null | null').or(SnowflakeTypeSchema),
      'enabled?': type('boolean | null'),
    }),
  )
  .output(WidgetSettingsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdWidgetJson = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/widget.json',
    successDescription: '200 response for get_guild_widget',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(WidgetResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdWidgetPng = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/widget.png',
    successDescription: '200 response for get_guild_widget_png',
  })
  .input(type({ guild_id: SnowflakeTypeSchema, 'style?': WidgetImageStylesSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
