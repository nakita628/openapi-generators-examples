import { os } from '@orpc/server'
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
  .input(z.object({ code: z.string().max(152133) }))
  .output(GuildTemplateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}',
    successDescription: '200 response for get_guild',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, with_counts: z.stringbool().exactOptional() }))
  .output(GuildWithCountsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}',
    successDescription: '200 response for update_guild',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      name: z.string().min(2).max(100).exactOptional(),
      description: z.string().min(0).max(300).nullable().exactOptional(),
      region: z.string().nullable().exactOptional(),
      icon: z.string().nullable().exactOptional(),
      verification_level: z.xor([z.null(), VerificationLevelsSchema]).exactOptional(),
      default_message_notifications: z
        .xor([z.null(), UserNotificationSettingsSchema])
        .exactOptional(),
      explicit_content_filter: z
        .xor([z.null(), GuildExplicitContentFilterTypesSchema])
        .exactOptional(),
      preferred_locale: z.xor([z.null(), AvailableLocalesEnumSchema]).exactOptional(),
      afk_timeout: z.xor([z.null(), AfkTimeoutsSchema]).exactOptional(),
      afk_channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      system_channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
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
      rules_channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      safety_alerts_channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      public_updates_channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      premium_progress_bar_enabled: z.boolean().nullable().exactOptional(),
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
    z.object({
      guild_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema.exactOptional(),
      target_id: SnowflakeTypeSchema.exactOptional(),
      action_type: AuditLogActionTypesSchema.exactOptional(),
      before: SnowflakeTypeSchema.exactOptional(),
      after: SnowflakeTypeSchema.exactOptional(),
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(1).max(100),
        )
        .exactOptional(),
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
          z.null(),
        ]),
      )
      .nullable(),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdAutoModerationRules = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/auto-moderation/rules',
    successDescription: '200 response for create_auto_moderation_rule',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(
    z.xor([
      DefaultKeywordRuleResponseSchema,
      KeywordRuleResponseSchema,
      MLSpamRuleResponseSchema,
      MentionSpamRuleResponseSchema,
      UserProfileRuleResponseSchema,
    ]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdAutoModerationRulesRuleId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
    successDescription: '200 response for get_auto_moderation_rule',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdAutoModerationRulesRuleId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
    successStatus: 204,
    successDescription: '204 response for delete_auto_moderation_rule',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, rule_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdAutoModerationRulesRuleId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
    successDescription: '200 response for update_auto_moderation_rule',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdBans = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/bans',
    successDescription: '200 response for list_guild_bans',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(1).max(1000),
        )
        .exactOptional(),
      before: SnowflakeTypeSchema.exactOptional(),
      after: SnowflakeTypeSchema.exactOptional(),
    }),
  )
  .output(z.array(GuildBanResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdBansUserId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/bans/{user_id}',
    successDescription: '200 response for get_guild_ban',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
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
    z.object({
      guild_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      delete_message_seconds: z.int().min(0).max(604800).nullable().exactOptional(),
      delete_message_days: z.int().min(0).max(7).nullable().exactOptional(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdBulkBan = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/bulk-ban',
    successDescription: '200 response for bulk_ban_users_from_guild',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdChannels = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/channels',
    successDescription: '200 response for list_guild_channels',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdChannels = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/channels',
    successStatus: 201,
    successDescription: '201 response for create_guild_channel',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      type: z.xor([z.null(), ChannelTypesSchema]).exactOptional(),
      name: z.string().min(1).max(100),
      position: z.int32().min(0).nullable().exactOptional(),
      topic: z.string().min(0).max(4096).nullable().exactOptional(),
      bitrate: z.int32().min(8000).nullable().exactOptional(),
      user_limit: z.int32().min(0).nullable().exactOptional(),
      nsfw: z.boolean().nullable().exactOptional(),
      rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
      parent_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      permission_overwrites: z
        .array(ChannelPermissionOverwriteRequestSchema)
        .max(100)
        .nullable()
        .exactOptional(),
      rtc_region: z.string().nullable().exactOptional(),
      video_quality_mode: z.xor([z.null(), VideoQualityModesSchema]).exactOptional(),
      default_auto_archive_duration: z
        .xor([z.null(), ThreadAutoArchiveDurationSchema])
        .exactOptional(),
      default_reaction_emoji: z
        .xor([z.null(), UpdateDefaultReactionEmojiRequestSchema])
        .exactOptional(),
      default_thread_rate_limit_per_user: z.int().min(0).max(21600).nullable().exactOptional(),
      default_sort_order: z.xor([z.null(), ThreadSortOrderSchema]).exactOptional(),
      default_forum_layout: z.xor([z.null(), ForumLayoutSchema]).exactOptional(),
      default_tag_setting: z.xor([z.null(), ThreadSearchTagSettingSchema]).exactOptional(),
      available_tags: z
        .array(z.xor([z.null(), CreateOrUpdateThreadTagRequestSchema]))
        .max(20)
        .nullable()
        .exactOptional(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdEmojis = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/emojis',
    successDescription: '200 response for list_guild_emojis',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(z.array(EmojiResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdEmojis = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/emojis',
    successStatus: 201,
    successDescription: '201 response for create_guild_emoji',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      name: z.string().min(2).max(32),
      image: z.string(),
      roles: z
        .array(z.xor([z.null(), SnowflakeTypeSchema]))
        .max(1521)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
  .output(EmojiResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdEmojisEmojiId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/emojis/{emoji_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_emoji',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, emoji_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdEmojisEmojiId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/emojis/{emoji_id}',
    successDescription: '200 response for update_guild_emoji',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      emoji_id: SnowflakeTypeSchema,
      name: z.string().min(2).max(32).exactOptional(),
      roles: z
        .array(z.xor([z.null(), SnowflakeTypeSchema]))
        .max(1521)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdIntegrations = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/integrations',
    successDescription: '200 response for list_guild_integrations',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdIntegrationsIntegrationId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/integrations/{integration_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_integration',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, integration_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdInvites = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/invites',
    successDescription: '200 response for list_guild_invites',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdMembers = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/members',
    successDescription: '200 response for list_guild_members',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(1).max(1000),
        )
        .exactOptional(),
      after: SnowflakeTypeSchema.exactOptional(),
    }),
  )
  .output(z.array(GuildMemberResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdMembersMe = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/members/@me',
    successDescription: '200 response for update_my_guild_member',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdMembersSearch = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/members/search',
    successDescription: '200 response for search_guild_members',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(1).max(1000),
        )
        .exactOptional(),
      query: z.string().min(1).max(100),
    }),
  )
  .output(z.array(GuildMemberResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdMembersUserId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/members/{user_id}',
    successDescription: '200 response for get_guild_member',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdMembersUserId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/members/{user_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_member',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdMembersUserId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/members/{user_id}',
    successDescription: '200 response for update_guild_member',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      nick: z.string().max(32).nullable().exactOptional(),
      roles: z
        .array(z.xor([z.null(), SnowflakeTypeSchema]))
        .max(350)
        .refine((val) => new Set(val).size === val.length)
        .nullable()
        .exactOptional(),
      mute: z.boolean().nullable().exactOptional(),
      deaf: z.boolean().nullable().exactOptional(),
      channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      communication_disabled_until: z.iso.datetime({ offset: true }).nullable().exactOptional(),
      flags: z.int().nullable().exactOptional(),
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
    z.object({
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
    z.object({
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
    z.object({
      guild_id: SnowflakeTypeSchema,
      sort_by: SortingModeSchema.exactOptional(),
      sort_order: SortingOrderSchema.exactOptional(),
      content: z.string().max(1024).exactOptional(),
      slop: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0).max(100),
        )
        .exactOptional(),
      author_id: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(SnowflakeTypeSchema)
            .max(100)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
      author_type: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(AuthorTypeSchema)
            .max(6)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
      mentions: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(SnowflakeTypeSchema)
            .max(100)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
      mentions_role_id: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(SnowflakeTypeSchema)
            .max(100)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
      replied_to_user_id: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(SnowflakeTypeSchema)
            .max(100)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
      replied_to_message_id: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(SnowflakeTypeSchema)
            .max(100)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
      mention_everyone: z.stringbool().exactOptional(),
      min_id: SnowflakeTypeSchema.exactOptional(),
      max_id: SnowflakeTypeSchema.exactOptional(),
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(1).max(25),
        )
        .exactOptional(),
      offset: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0).max(9975),
        )
        .exactOptional(),
      has: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(HasOptionSchema)
            .max(18)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
      link_hostname: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(z.string().max(256))
            .max(100)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
      embed_provider: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(z.string().max(256))
            .max(100)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
      embed_type: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(SearchableEmbedTypeSchema)
            .max(5)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
      attachment_extension: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(z.string().max(256))
            .max(100)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
      attachment_filename: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(z.string().max(1024))
            .max(100)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
      pinned: z.stringbool().exactOptional(),
      include_nsfw: z.stringbool().exactOptional(),
      channel_id: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z
            .array(SnowflakeTypeSchema)
            .max(500)
            .refine((val) => new Set(val).size === val.length),
        )
        .exactOptional(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(GuildHomeSettingsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdOnboarding = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/onboarding',
    successDescription: '200 response for get_guilds_onboarding',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(UserGuildOnboardingResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putGuildsGuildIdOnboarding = os
  .route({
    method: 'PUT',
    path: '/guilds/{guild_id}/onboarding',
    successDescription: '200 response for put_guilds_onboarding',
  })
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
      mode: z.xor([z.null(), GuildOnboardingModeSchema]).exactOptional(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
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
  .input(z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
  .output(PermissionsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdPreview = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/preview',
    successDescription: '200 response for get_guild_preview',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(GuildPreviewResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdPrune = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/prune',
    successDescription: '200 response for preview_prune_guild',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      days: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(1).max(30),
        )
        .exactOptional(),
      include_roles: z
        .union([
          z.string(),
          z.preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(
                z.preprocess(
                  (val) => (val === 'null' ? null : val),
                  z
                    .union([
                      z.preprocess((val) => (val === 'null' ? null : val), z.null()),
                      SnowflakeTypeSchema,
                    ])
                    .nullable(),
                ),
              )
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          ),
        ])
        .exactOptional(),
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
          z.null(),
        ])
        .exactOptional(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(z.array(VoiceRegionResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdRequests = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/requests',
    description: 'List join requests for guild, optionally filtered by application status',
    successDescription: '200 response for get_guild_join_requests',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      status: GuildJoinRequestApplicationStatusSchema.exactOptional(),
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(1).max(100),
        )
        .exactOptional(),
      before: SnowflakeTypeSchema.exactOptional(),
      after: SnowflakeTypeSchema.exactOptional(),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdRoles = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/roles',
    successDescription: '200 response for list_guild_roles',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(z.array(GuildRoleResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdRoles = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/roles',
    successDescription: '200 response for create_guild_role',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      name: z.string().min(1).max(100).nullable().exactOptional(),
      permissions: z.int().nullable().exactOptional(),
      color: z.int().min(0).max(16777215).nullable().exactOptional(),
      colors: z.xor([z.null(), RoleColorsSchema]).exactOptional(),
      hoist: z.boolean().nullable().exactOptional(),
      mentionable: z.boolean().nullable().exactOptional(),
      icon: z.string().nullable().exactOptional(),
      unicode_emoji: z.string().max(100).nullable().exactOptional(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(z.array(GuildRoleResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdRolesMemberCounts = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/roles/member-counts',
    successDescription: '200 response for guild_role_member_counts',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(z.record(z.string(), z.int32()))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/roles/{role_id}',
    successDescription: '200 response for get_guild_role',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
  .output(GuildRoleResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/roles/{role_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_role',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, role_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdRolesRoleId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/roles/{role_id}',
    successDescription: '200 response for update_guild_role',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      role_id: SnowflakeTypeSchema,
      name: z.string().min(1).max(100).nullable().exactOptional(),
      permissions: z.int().nullable().exactOptional(),
      color: z.int().min(0).max(16777215).nullable().exactOptional(),
      colors: z.xor([z.null(), RoleColorsSchema]).exactOptional(),
      hoist: z.boolean().nullable().exactOptional(),
      mentionable: z.boolean().nullable().exactOptional(),
      icon: z.string().nullable().exactOptional(),
      unicode_emoji: z.string().max(100).nullable().exactOptional(),
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
    z.object({ guild_id: SnowflakeTypeSchema, with_user_count: z.stringbool().exactOptional() }),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdScheduledEvents = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/scheduled-events',
    successDescription: '200 response for create_guild_scheduled_event',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(
    z.xor([
      ExternalScheduledEventResponseSchema,
      StageScheduledEventResponseSchema,
      VoiceScheduledEventResponseSchema,
    ]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdScheduledEventsGuildScheduledEventId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    successDescription: '200 response for get_guild_scheduled_event',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      guild_scheduled_event_id: SnowflakeTypeSchema,
      with_user_count: z.stringbool().exactOptional(),
    }),
  )
  .output(
    z.xor([
      ExternalScheduledEventResponseSchema,
      StageScheduledEventResponseSchema,
      VoiceScheduledEventResponseSchema,
    ]),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdScheduledEventsGuildScheduledEventId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_scheduled_event',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdScheduledEventsGuildScheduledEventId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    successDescription: '200 response for update_guild_scheduled_event',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, guild_scheduled_event_id: SnowflakeTypeSchema }))
  .output(
    z.xor([
      ExternalScheduledEventResponseSchema,
      StageScheduledEventResponseSchema,
      VoiceScheduledEventResponseSchema,
    ]),
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
    z.object({
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users',
    successDescription: '200 response for list_guild_scheduled_event_users',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      guild_scheduled_event_id: SnowflakeTypeSchema,
      with_member: z.stringbool().exactOptional(),
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(1).max(100),
        )
        .exactOptional(),
      before: SnowflakeTypeSchema.exactOptional(),
      after: SnowflakeTypeSchema.exactOptional(),
    }),
  )
  .output(z.array(ScheduledEventUserResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users/counts',
    description: 'Get the count of users subscribed to a guild scheduled event',
    successDescription: '200 response for count_guild_scheduled_event_users',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      guild_scheduled_event_id: SnowflakeTypeSchema,
      guild_scheduled_event_exception_ids: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(SnowflakeTypeSchema).max(10),
        )
        .exactOptional(),
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
      z.object({
        guild_id: SnowflakeTypeSchema,
        guild_scheduled_event_id: SnowflakeTypeSchema,
        guild_scheduled_event_exception_id: SnowflakeTypeSchema,
        with_member: z.stringbool().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(1).max(100),
          )
          .exactOptional(),
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(z.array(ScheduledEventUserResponseSchema).nullable())
    .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdSoundboardSounds = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/soundboard-sounds',
    successDescription: '200 response for list_guild_soundboard_sounds',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
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
    z.object({
      guild_id: SnowflakeTypeSchema,
      name: z.string().min(2).max(32),
      volume: z.number().min(0).max(1).nullable().exactOptional(),
      emoji_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      emoji_name: z.string().min(1).max(32).nullable().exactOptional(),
      sound: z.string(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
  .output(SoundboardSoundResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdSoundboardSoundsSoundId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_soundboard_sound',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, sound_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdSoundboardSoundsSoundId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
    successDescription: '200 response for update_guild_soundboard_sound',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      sound_id: SnowflakeTypeSchema,
      name: z.string().min(2).max(32).exactOptional(),
      volume: z.number().min(0).max(1).nullable().exactOptional(),
      emoji_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      emoji_name: z.string().min(1).max(32).nullable().exactOptional(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(z.array(GuildStickerResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdStickers = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/stickers',
    successStatus: 201,
    successDescription: '201 response for create_guild_sticker',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(GuildStickerResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdStickersStickerId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/stickers/{sticker_id}',
    successDescription: '200 response for get_guild_sticker',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
  .output(GuildStickerResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdStickersStickerId = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/stickers/{sticker_id}',
    successStatus: 204,
    successDescription: '204 response for delete_guild_sticker',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, sticker_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdStickersStickerId = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/stickers/{sticker_id}',
    successDescription: '200 response for update_guild_sticker',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdTemplates = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/templates',
    successDescription: '200 response for list_guild_templates',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(z.array(GuildTemplateResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postGuildsGuildIdTemplates = os
  .route({
    method: 'POST',
    path: '/guilds/{guild_id}/templates',
    successDescription: '200 response for create_guild_template',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      name: z.string().min(1).max(100),
      description: z.string().max(120).nullable().exactOptional(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema, code: z.string().max(152133) }))
  .output(GuildTemplateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteGuildsGuildIdTemplatesCode = os
  .route({
    method: 'DELETE',
    path: '/guilds/{guild_id}/templates/{code}',
    successDescription: '200 response for delete_guild_template',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, code: z.string().max(152133) }))
  .output(GuildTemplateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdTemplatesCode = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/templates/{code}',
    successDescription: '200 response for update_guild_template',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      code: z.string().max(152133),
      name: z.string().min(1).max(100).exactOptional(),
      description: z.string().max(120).nullable().exactOptional(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(ThreadsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdVanityUrl = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/vanity-url',
    successDescription: '200 response for get_guild_vanity_url',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(VanityURLResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdVoiceStatesMe = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/voice-states/@me',
    successDescription: '200 response for get_self_voice_state',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
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
    z.object({
      guild_id: SnowflakeTypeSchema,
      request_to_speak_timestamp: z.iso.datetime({ offset: true }).nullable().exactOptional(),
      suppress: z.boolean().nullable().exactOptional(),
      channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdVoiceStatesUserId = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/voice-states/{user_id}',
    successDescription: '200 response for get_voice_state',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema, user_id: SnowflakeTypeSchema }))
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
    z.object({
      guild_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema,
      suppress: z.boolean().nullable().exactOptional(),
      channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdWebhooks = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/webhooks',
    successDescription: '200 response for get_guild_webhooks',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdWelcomeScreen = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/welcome-screen',
    successDescription: '200 response for get_guild_welcome_screen',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(GuildWelcomeScreenResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdWelcomeScreen = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/welcome-screen',
    successDescription: '200 response for update_guild_welcome_screen',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      description: z.string().max(140).nullable().exactOptional(),
      welcome_channels: z.array(GuildWelcomeChannelSchema).max(5).nullable().exactOptional(),
      enabled: z.boolean().nullable().exactOptional(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(WidgetSettingsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchGuildsGuildIdWidget = os
  .route({
    method: 'PATCH',
    path: '/guilds/{guild_id}/widget',
    successDescription: '200 response for update_guild_widget_settings',
  })
  .input(
    z.object({
      guild_id: SnowflakeTypeSchema,
      channel_id: z.xor([z.null(), SnowflakeTypeSchema]).exactOptional(),
      enabled: z.boolean().nullable().exactOptional(),
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
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(WidgetResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getGuildsGuildIdWidgetPng = os
  .route({
    method: 'GET',
    path: '/guilds/{guild_id}/widget.png',
    successDescription: '200 response for get_guild_widget_png',
  })
  .input(
    z.object({ guild_id: SnowflakeTypeSchema, style: WidgetImageStylesSchema.exactOptional() }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })
