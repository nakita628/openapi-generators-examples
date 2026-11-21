import { t, type UnwrapSchema } from 'elysia'
import {
  ApplicationIncomingWebhookResponseSchema,
  ChannelFollowerWebhookResponseSchema,
  DefaultKeywordListUpsertRequestSchema,
  DefaultKeywordListUpsertRequestPartialSchema,
  DefaultKeywordRuleResponseSchema,
  DiscordIntegrationResponseSchema,
  EmojiResponseSchema,
  ExternalConnectionIntegrationResponseSchema,
  ExternalScheduledEventCreateRequestSchema,
  ExternalScheduledEventPatchRequestPartialSchema,
  ExternalScheduledEventResponseSchema,
  FriendInviteResponseSchema,
  GroupDMInviteResponseSchema,
  GuildBanResponseSchema,
  GuildChannelResponseSchema,
  GuildIncomingWebhookResponseSchema,
  GuildInviteResponseSchema,
  GuildJoinRequestApplicationStatusSchema,
  GuildMemberResponseSchema,
  GuildRoleResponseSchema,
  GuildStickerResponseSchema,
  GuildSubscriptionIntegrationResponseSchema,
  GuildTemplateResponseSchema,
  KeywordRuleResponseSchema,
  KeywordUpsertRequestSchema,
  KeywordUpsertRequestPartialSchema,
  MLSpamRuleResponseSchema,
  MLSpamUpsertRequestSchema,
  MLSpamUpsertRequestPartialSchema,
  MentionSpamRuleResponseSchema,
  MentionSpamUpsertRequestSchema,
  MentionSpamUpsertRequestPartialSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  ScheduledEventUserResponseSchema,
  SnowflakeTypeSchema,
  StageScheduledEventCreateRequestSchema,
  StageScheduledEventPatchRequestPartialSchema,
  StageScheduledEventResponseSchema,
  ThreadResponseSchema,
  UpdateRolePositionsRequestSchema,
  UserProfileRuleResponseSchema,
  UserProfileUpsertRequestSchema,
  UserProfileUpsertRequestPartialSchema,
  VoiceRegionResponseSchema,
  VoiceScheduledEventCreateRequestSchema,
  VoiceScheduledEventPatchRequestPartialSchema,
  VoiceScheduledEventResponseSchema,
} from '../../components/schemas'

export const GuildsModel = {
  get_guild_templateParams: t.Object({ code: t.String({ maxLength: 152133 }) }),
  get_guildParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_guildQuery: t.Object({ with_counts: t.Optional(t.Boolean()) }),
  update_guildParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  list_guild_audit_log_entriesParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_audit_log_entriesQuery: t.Object({
    user_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    target_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    action_type: t.Optional(
      t.Union([
        t.Literal(1, { title: 'GUILD_UPDATE' }),
        t.Literal(10, { title: 'CHANNEL_CREATE' }),
        t.Literal(11, { title: 'CHANNEL_UPDATE' }),
        t.Literal(12, { title: 'CHANNEL_DELETE' }),
        t.Literal(13, { title: 'CHANNEL_OVERWRITE_CREATE' }),
        t.Literal(14, { title: 'CHANNEL_OVERWRITE_UPDATE' }),
        t.Literal(15, { title: 'CHANNEL_OVERWRITE_DELETE' }),
        t.Literal(16, { title: 'CHANNEL_POSITION_UPDATE', description: 'Channels were reordered' }),
        t.Literal(20, { title: 'MEMBER_KICK' }),
        t.Literal(21, { title: 'MEMBER_PRUNE' }),
        t.Literal(22, { title: 'MEMBER_BAN_ADD' }),
        t.Literal(23, { title: 'MEMBER_BAN_REMOVE' }),
        t.Literal(24, { title: 'MEMBER_UPDATE' }),
        t.Literal(25, { title: 'MEMBER_ROLE_UPDATE' }),
        t.Literal(26, { title: 'MEMBER_MOVE' }),
        t.Literal(27, { title: 'MEMBER_DISCONNECT' }),
        t.Literal(28, { title: 'BOT_ADD' }),
        t.Literal(30, { title: 'ROLE_CREATE' }),
        t.Literal(31, { title: 'ROLE_UPDATE' }),
        t.Literal(32, { title: 'ROLE_DELETE' }),
        t.Literal(33, { title: 'ROLE_POSITION_UPDATE', description: 'Roles were reordered' }),
        t.Literal(40, { title: 'INVITE_CREATE' }),
        t.Literal(41, { title: 'INVITE_UPDATE' }),
        t.Literal(42, { title: 'INVITE_DELETE' }),
        t.Literal(50, { title: 'WEBHOOK_CREATE' }),
        t.Literal(51, { title: 'WEBHOOK_UPDATE' }),
        t.Literal(52, { title: 'WEBHOOK_DELETE' }),
        t.Literal(60, { title: 'EMOJI_CREATE' }),
        t.Literal(61, { title: 'EMOJI_UPDATE' }),
        t.Literal(62, { title: 'EMOJI_DELETE' }),
        t.Literal(72, { title: 'MESSAGE_DELETE' }),
        t.Literal(73, { title: 'MESSAGE_BULK_DELETE' }),
        t.Literal(74, { title: 'MESSAGE_PIN' }),
        t.Literal(75, { title: 'MESSAGE_UNPIN' }),
        t.Literal(80, { title: 'INTEGRATION_CREATE' }),
        t.Literal(81, { title: 'INTEGRATION_UPDATE' }),
        t.Literal(82, { title: 'INTEGRATION_DELETE' }),
        t.Literal(83, { title: 'STAGE_INSTANCE_CREATE' }),
        t.Literal(84, { title: 'STAGE_INSTANCE_UPDATE' }),
        t.Literal(85, { title: 'STAGE_INSTANCE_DELETE' }),
        t.Literal(90, { title: 'STICKER_CREATE' }),
        t.Literal(91, { title: 'STICKER_UPDATE' }),
        t.Literal(92, { title: 'STICKER_DELETE' }),
        t.Literal(100, { title: 'GUILD_SCHEDULED_EVENT_CREATE' }),
        t.Literal(101, { title: 'GUILD_SCHEDULED_EVENT_UPDATE' }),
        t.Literal(102, { title: 'GUILD_SCHEDULED_EVENT_DELETE' }),
        t.Literal(110, { title: 'THREAD_CREATE' }),
        t.Literal(111, { title: 'THREAD_UPDATE' }),
        t.Literal(112, { title: 'THREAD_DELETE' }),
        t.Literal(121, { title: 'APPLICATION_COMMAND_PERMISSION_UPDATE' }),
        t.Literal(130, { title: 'SOUNDBOARD_SOUND_CREATE' }),
        t.Literal(131, { title: 'SOUNDBOARD_SOUND_UPDATE' }),
        t.Literal(132, { title: 'SOUNDBOARD_SOUND_DELETE' }),
        t.Literal(140, { title: 'AUTO_MODERATION_RULE_CREATE' }),
        t.Literal(141, { title: 'AUTO_MODERATION_RULE_UPDATE' }),
        t.Literal(142, { title: 'AUTO_MODERATION_RULE_DELETE' }),
        t.Literal(143, { title: 'AUTO_MODERATION_BLOCK_MESSAGE' }),
        t.Literal(144, { title: 'AUTO_MODERATION_FLAG_TO_CHANNEL' }),
        t.Literal(145, { title: 'AUTO_MODERATION_USER_COMM_DISABLED' }),
        t.Literal(146, { title: 'AUTO_MODERATION_QUARANTINE_USER' }),
        t.Literal(150, { title: 'CREATOR_MONETIZATION_REQUEST_CREATED' }),
        t.Literal(151, { title: 'CREATOR_MONETIZATION_TERMS_ACCEPTED' }),
        t.Literal(163, { title: 'ONBOARDING_PROMPT_CREATE' }),
        t.Literal(164, { title: 'ONBOARDING_PROMPT_UPDATE' }),
        t.Literal(165, { title: 'ONBOARDING_PROMPT_DELETE' }),
        t.Literal(166, { title: 'ONBOARDING_CREATE' }),
        t.Literal(167, { title: 'ONBOARDING_UPDATE' }),
        t.Literal(171, { title: 'GUILD_HOME_FEATURE_ITEM' }),
        t.Literal(172, { title: 'GUILD_HOME_REMOVE_ITEM' }),
        t.Literal(180, { title: 'HARMFUL_LINKS_BLOCKED_MESSAGE' }),
        t.Literal(190, { title: 'HOME_SETTINGS_CREATE' }),
        t.Literal(191, { title: 'HOME_SETTINGS_UPDATE' }),
        t.Literal(192, { title: 'VOICE_CHANNEL_STATUS_CREATE' }),
        t.Literal(193, { title: 'VOICE_CHANNEL_STATUS_DELETE' }),
        t.Literal(200, {
          title: 'GUILD_SCHEDULED_EVENT_EXCEPTION_CREATE',
          description: 'Scheduled event exception was created',
        }),
        t.Literal(201, {
          title: 'GUILD_SCHEDULED_EVENT_EXCEPTION_UPDATE',
          description: 'Scheduled event exception was updated',
        }),
        t.Literal(202, {
          title: 'GUILD_SCHEDULED_EVENT_EXCEPTION_DELETE',
          description: 'Scheduled event exception was deleted',
        }),
        t.Literal(211, { title: 'GUILD_PROFILE_UPDATE' }),
      ]),
    ),
    before: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    after: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
  }),
  list_auto_moderation_rulesParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_auto_moderation_rulesResponse200: t.Union([
    t.Array(
      t.Union([
        DefaultKeywordRuleResponseSchema,
        KeywordRuleResponseSchema,
        MLSpamRuleResponseSchema,
        MentionSpamRuleResponseSchema,
        UserProfileRuleResponseSchema,
        t.Null(),
      ]),
    ),
    t.Null(),
  ]),
  create_auto_moderation_ruleParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  create_auto_moderation_ruleBody: t.Union([
    DefaultKeywordListUpsertRequestSchema,
    KeywordUpsertRequestSchema,
    MLSpamUpsertRequestSchema,
    MentionSpamUpsertRequestSchema,
    UserProfileUpsertRequestSchema,
  ]),
  create_auto_moderation_ruleResponse200: t.Union([
    DefaultKeywordRuleResponseSchema,
    KeywordRuleResponseSchema,
    MLSpamRuleResponseSchema,
    MentionSpamRuleResponseSchema,
    UserProfileRuleResponseSchema,
  ]),
  get_auto_moderation_ruleParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    rule_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_auto_moderation_ruleResponse200: t.Union([
    DefaultKeywordRuleResponseSchema,
    KeywordRuleResponseSchema,
    MLSpamRuleResponseSchema,
    MentionSpamRuleResponseSchema,
    UserProfileRuleResponseSchema,
  ]),
  delete_auto_moderation_ruleParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    rule_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_auto_moderation_ruleParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    rule_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_auto_moderation_ruleBody: t.Union([
    DefaultKeywordListUpsertRequestPartialSchema,
    KeywordUpsertRequestPartialSchema,
    MLSpamUpsertRequestPartialSchema,
    MentionSpamUpsertRequestPartialSchema,
    UserProfileUpsertRequestPartialSchema,
  ]),
  update_auto_moderation_ruleResponse200: t.Union([
    DefaultKeywordRuleResponseSchema,
    KeywordRuleResponseSchema,
    MLSpamRuleResponseSchema,
    MentionSpamRuleResponseSchema,
    UserProfileRuleResponseSchema,
  ]),
  list_guild_bansParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  list_guild_bansQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 1000 })),
    before: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    after: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  list_guild_bansResponse200: t.Union([t.Array(GuildBanResponseSchema), t.Null()]),
  get_guild_banParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  ban_user_from_guildParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  unban_user_from_guildParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  bulk_ban_users_from_guildParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_channelsParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  list_guild_channelsResponse200: t.Union([
    t.Array(
      t.Union([
        GuildChannelResponseSchema,
        PrivateChannelResponseSchema,
        PrivateGroupChannelResponseSchema,
        ThreadResponseSchema,
      ]),
    ),
    t.Null(),
  ]),
  create_guild_channelParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  bulk_update_guild_channelsParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  bulk_update_guild_channelsBody: t.Array(
    t.Object({
      id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
      position: t.Optional(
        t.Union([t.Integer({ format: 'int32', minimum: 0, maximum: 2147483647 }), t.Null()]),
      ),
      parent_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
      lock_permissions: t.Optional(t.Union([t.Boolean(), t.Null()])),
    }),
  ),
  list_guild_emojisParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  list_guild_emojisResponse200: t.Union([t.Array(EmojiResponseSchema), t.Null()]),
  create_guild_emojiParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  create_guild_emojiBody: t.Object({
    name: t.String({ minLength: 2, maxLength: 32 }),
    image: t.String(),
    roles: t.Optional(
      t.Union([
        t.Array(t.Union([t.Null(), SnowflakeTypeSchema]), { maxItems: 1521, uniqueItems: true }),
        t.Null(),
      ]),
    ),
  }),
  get_guild_emojiParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    emoji_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  delete_guild_emojiParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    emoji_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_emojiParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    emoji_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_emojiBody: t.Object({
    name: t.Optional(t.String({ minLength: 2, maxLength: 32 })),
    roles: t.Optional(
      t.Union([
        t.Array(t.Union([t.Null(), SnowflakeTypeSchema]), { maxItems: 1521, uniqueItems: true }),
        t.Null(),
      ]),
    ),
  }),
  update_guild_incident_actionsParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_integrationsParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  list_guild_integrationsResponse200: t.Union([
    t.Array(
      t.Union([
        DiscordIntegrationResponseSchema,
        ExternalConnectionIntegrationResponseSchema,
        GuildSubscriptionIntegrationResponseSchema,
      ]),
    ),
    t.Null(),
  ]),
  delete_guild_integrationParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    integration_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_invitesParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  list_guild_invitesResponse200: t.Union([
    t.Array(
      t.Union([
        FriendInviteResponseSchema,
        GroupDMInviteResponseSchema,
        GuildInviteResponseSchema,
        t.Null(),
      ]),
    ),
    t.Null(),
  ]),
  list_guild_membersParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  list_guild_membersQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 1000 })),
    after: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  list_guild_membersResponse200: t.Array(GuildMemberResponseSchema),
  update_my_guild_memberParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  update_my_guild_memberBody: t.Object({
    nick: t.Optional(t.Union([t.String({ maxLength: 32 }), t.Null()])),
    avatar: t.Optional(t.Union([t.String(), t.Null()])),
    bio: t.Optional(t.Union([t.String({ maxLength: 300 }), t.Null()])),
    banner: t.Optional(t.Union([t.String(), t.Null()])),
  }),
  search_guild_membersParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  search_guild_membersQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 1000 })),
    query: t.String({ minLength: 1, maxLength: 100 }),
  }),
  search_guild_membersResponse200: t.Array(GuildMemberResponseSchema),
  get_guild_memberParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  add_guild_memberParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  delete_guild_memberParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_memberParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_memberBody: t.Object({
    nick: t.Optional(t.Union([t.String({ maxLength: 32 }), t.Null()])),
    roles: t.Optional(
      t.Union([
        t.Array(t.Union([t.Null(), SnowflakeTypeSchema]), { maxItems: 350, uniqueItems: true }),
        t.Null(),
      ]),
    ),
    mute: t.Optional(t.Union([t.Boolean(), t.Null()])),
    deaf: t.Optional(t.Union([t.Boolean(), t.Null()])),
    channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
    communication_disabled_until: t.Optional(t.Union([t.Date(), t.Null()])),
    flags: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
  }),
  add_guild_member_roleParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    role_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  delete_guild_member_roleParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    role_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  guild_searchParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  guild_searchQuery: t.Object({
    sort_by: t.Optional(
      t.Union([
        t.Literal('relevance', { title: 'RELEVANCE' }),
        t.Literal('timestamp', { title: 'TIMESTAMP' }),
      ]),
    ),
    sort_order: t.Optional(
      t.Union([t.Literal('asc', { title: 'ASC' }), t.Literal('desc', { title: 'DESC' })]),
    ),
    content: t.Optional(t.String({ maxLength: 1024 })),
    slop: t.Optional(t.Integer({ minimum: 0, maximum: 100 })),
    author_id: t.Optional(
      t.Array(t.String({ pattern: '^(0|[1-9][0-9]*)$' }), { maxItems: 100, uniqueItems: true }),
    ),
    author_type: t.Optional(
      t.Array(
        t.Union([
          t.Literal('user', { title: 'USER' }),
          t.Literal('bot', { title: 'BOT' }),
          t.Literal('webhook', { title: 'WEBHOOK' }),
          t.Literal('-user', { title: 'NO_USER' }),
          t.Literal('-bot', { title: 'NO_BOT' }),
          t.Literal('-webhook', { title: 'NO_WEBHOOK' }),
        ]),
        { maxItems: 6, uniqueItems: true },
      ),
    ),
    mentions: t.Optional(
      t.Array(t.String({ pattern: '^(0|[1-9][0-9]*)$' }), { maxItems: 100, uniqueItems: true }),
    ),
    mentions_role_id: t.Optional(
      t.Array(t.String({ pattern: '^(0|[1-9][0-9]*)$' }), { maxItems: 100, uniqueItems: true }),
    ),
    replied_to_user_id: t.Optional(
      t.Array(t.String({ pattern: '^(0|[1-9][0-9]*)$' }), { maxItems: 100, uniqueItems: true }),
    ),
    replied_to_message_id: t.Optional(
      t.Array(t.String({ pattern: '^(0|[1-9][0-9]*)$' }), { maxItems: 100, uniqueItems: true }),
    ),
    mention_everyone: t.Optional(t.Boolean()),
    min_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    max_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 25 })),
    offset: t.Optional(t.Integer({ minimum: 0, maximum: 9975 })),
    has: t.Optional(
      t.Array(
        t.Union([
          t.Literal('link', { title: 'LINK' }),
          t.Literal('embed', { title: 'EMBED' }),
          t.Literal('file', { title: 'FILE' }),
          t.Literal('image', { title: 'IMAGE' }),
          t.Literal('video', { title: 'VIDEO' }),
          t.Literal('sound', { title: 'SOUND' }),
          t.Literal('sticker', { title: 'STICKER' }),
          t.Literal('poll', { title: 'POLL' }),
          t.Literal('snapshot', { title: 'SNAPSHOT' }),
          t.Literal('-link', { title: 'NO_LINK' }),
          t.Literal('-embed', { title: 'NO_EMBED' }),
          t.Literal('-file', { title: 'NO_FILE' }),
          t.Literal('-image', { title: 'NO_IMAGE' }),
          t.Literal('-video', { title: 'NO_VIDEO' }),
          t.Literal('-sound', { title: 'NO_SOUND' }),
          t.Literal('-sticker', { title: 'NO_STICKER' }),
          t.Literal('-poll', { title: 'NO_POLL' }),
          t.Literal('-snapshot', { title: 'NO_SNAPSHOT' }),
        ]),
        { maxItems: 18, uniqueItems: true },
      ),
    ),
    link_hostname: t.Optional(
      t.Array(t.String({ maxLength: 256 }), { maxItems: 100, uniqueItems: true }),
    ),
    embed_provider: t.Optional(
      t.Array(t.String({ maxLength: 256 }), { maxItems: 100, uniqueItems: true }),
    ),
    embed_type: t.Optional(
      t.Array(
        t.Union([
          t.Literal('image', { title: 'IMAGE' }),
          t.Literal('video', { title: 'VIDEO' }),
          t.Literal('gif', { title: 'GIFV' }),
          t.Literal('sound', { title: 'SOUND' }),
          t.Literal('article', { title: 'ARTICLE' }),
        ]),
        { maxItems: 5, uniqueItems: true },
      ),
    ),
    attachment_extension: t.Optional(
      t.Array(t.String({ maxLength: 256 }), { maxItems: 100, uniqueItems: true }),
    ),
    attachment_filename: t.Optional(
      t.Array(t.String({ maxLength: 1024 }), { maxItems: 100, uniqueItems: true }),
    ),
    pinned: t.Optional(t.Boolean()),
    include_nsfw: t.Optional(t.Boolean()),
    channel_id: t.Optional(
      t.Array(t.String({ pattern: '^(0|[1-9][0-9]*)$' }), { maxItems: 500, uniqueItems: true }),
    ),
  }),
  get_guild_new_member_welcomeParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_guilds_onboardingParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  put_guilds_onboardingParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_guild_member_permissionsParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_guild_role_permissionsParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    role_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_guild_previewParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  preview_prune_guildParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  preview_prune_guildQuery: t.Object({
    days: t.Optional(t.Integer({ minimum: 1, maximum: 30 })),
    include_roles: t.Optional(
      t.Union([
        t.String(),
        t.Array(t.Union([t.Null(), t.String({ pattern: '^(0|[1-9][0-9]*)$' })]), {
          maxItems: 100,
          uniqueItems: true,
        }),
      ]),
    ),
  }),
  prune_guildParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  list_guild_voice_regionsParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_voice_regionsResponse200: t.Union([t.Array(VoiceRegionResponseSchema), t.Null()]),
  get_guild_join_requestsParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_guild_join_requestsQuery: t.Object({
    status: t.Optional(
      t.Union([
        t.Literal('STARTED', {
          title: 'STARTED',
          description: 'Applicant started but not yet submitted join request',
        }),
        t.Literal('SUBMITTED', {
          title: 'SUBMITTED',
          description: 'Applicant submitted join request that is awaiting review',
        }),
        t.Literal('REJECTED', { title: 'REJECTED', description: 'Join request rejected' }),
        t.Literal('APPROVED', { title: 'APPROVED', description: 'Join request approved' }),
      ]),
    ),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    before: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    after: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  action_guild_join_requestParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    request_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  action_guild_join_requestBody: t.Object({
    action: t.Optional(GuildJoinRequestApplicationStatusSchema),
    rejection_reason: t.Optional(
      t.Union([
        t.String({
          maxLength: 160,
          description: 'Reason for rejection. Only used when action is REJECTED',
        }),
        t.Null(),
      ]),
    ),
  }),
  list_guild_rolesParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  list_guild_rolesResponse200: t.Array(GuildRoleResponseSchema),
  create_guild_roleParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  bulk_update_guild_rolesParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  bulk_update_guild_rolesBody: t.Array(UpdateRolePositionsRequestSchema),
  bulk_update_guild_rolesResponse200: t.Array(GuildRoleResponseSchema),
  guild_role_member_countsParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  guild_role_member_countsResponse200: t.Record(
    t.String(),
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 }),
  ),
  get_guild_roleParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    role_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  delete_guild_roleParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    role_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_roleParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    role_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_scheduled_eventsParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_scheduled_eventsQuery: t.Object({ with_user_count: t.Optional(t.Boolean()) }),
  list_guild_scheduled_eventsResponse200: t.Union([
    t.Array(
      t.Union([
        ExternalScheduledEventResponseSchema,
        StageScheduledEventResponseSchema,
        VoiceScheduledEventResponseSchema,
      ]),
    ),
    t.Null(),
  ]),
  create_guild_scheduled_eventParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  create_guild_scheduled_eventBody: t.Union([
    ExternalScheduledEventCreateRequestSchema,
    StageScheduledEventCreateRequestSchema,
    VoiceScheduledEventCreateRequestSchema,
  ]),
  create_guild_scheduled_eventResponse200: t.Union([
    ExternalScheduledEventResponseSchema,
    StageScheduledEventResponseSchema,
    VoiceScheduledEventResponseSchema,
  ]),
  get_guild_scheduled_eventParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_scheduled_event_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_guild_scheduled_eventQuery: t.Object({ with_user_count: t.Optional(t.Boolean()) }),
  get_guild_scheduled_eventResponse200: t.Union([
    ExternalScheduledEventResponseSchema,
    StageScheduledEventResponseSchema,
    VoiceScheduledEventResponseSchema,
  ]),
  delete_guild_scheduled_eventParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_scheduled_event_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_scheduled_eventParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_scheduled_event_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_scheduled_eventBody: t.Union([
    ExternalScheduledEventPatchRequestPartialSchema,
    StageScheduledEventPatchRequestPartialSchema,
    VoiceScheduledEventPatchRequestPartialSchema,
  ]),
  update_guild_scheduled_eventResponse200: t.Union([
    ExternalScheduledEventResponseSchema,
    StageScheduledEventResponseSchema,
    VoiceScheduledEventResponseSchema,
  ]),
  create_guild_scheduled_event_exceptionParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_scheduled_event_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  delete_guild_scheduled_event_exceptionParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_scheduled_event_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    exception_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_scheduled_event_exceptionParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_scheduled_event_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    exception_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_scheduled_event_usersParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_scheduled_event_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_scheduled_event_usersQuery: t.Object({
    with_member: t.Optional(t.Boolean()),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    before: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    after: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  list_guild_scheduled_event_usersResponse200: t.Union([
    t.Array(ScheduledEventUserResponseSchema),
    t.Null(),
  ]),
  count_guild_scheduled_event_usersParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_scheduled_event_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  count_guild_scheduled_event_usersQuery: t.Object({
    guild_scheduled_event_exception_ids: t.Optional(
      t.Array(t.String({ pattern: '^(0|[1-9][0-9]*)$' }), { maxItems: 10 }),
    ),
  }),
  list_guild_scheduled_event_exception_usersParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_scheduled_event_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    guild_scheduled_event_exception_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_scheduled_event_exception_usersQuery: t.Object({
    with_member: t.Optional(t.Boolean()),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    before: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    after: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  list_guild_scheduled_event_exception_usersResponse200: t.Union([
    t.Array(ScheduledEventUserResponseSchema),
    t.Null(),
  ]),
  list_guild_soundboard_soundsParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  create_guild_soundboard_soundParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_guild_soundboard_soundParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    sound_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  delete_guild_soundboard_soundParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    sound_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_soundboard_soundParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    sound_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  list_guild_stickersParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  list_guild_stickersResponse200: t.Array(GuildStickerResponseSchema),
  create_guild_stickerParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  create_guild_stickerBody: t.Form({
    name: t.String({ minLength: 2, maxLength: 30 }),
    tags: t.String({ minLength: 1, maxLength: 200 }),
    description: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
    file: t.String(),
  }),
  get_guild_stickerParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    sticker_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  delete_guild_stickerParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    sticker_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_stickerParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    sticker_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_stickerBody: t.Object({
    name: t.Optional(t.String({ minLength: 2, maxLength: 30 })),
    tags: t.Optional(t.String({ minLength: 1, maxLength: 200 })),
    description: t.Optional(t.Union([t.String({ maxLength: 100 }), t.Null()])),
  }),
  list_guild_templatesParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  list_guild_templatesResponse200: t.Union([t.Array(GuildTemplateResponseSchema), t.Null()]),
  create_guild_templateParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  create_guild_templateBody: t.Object({
    name: t.String({ minLength: 1, maxLength: 100 }),
    description: t.Optional(t.Union([t.String({ maxLength: 120 }), t.Null()])),
  }),
  sync_guild_templateParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    code: t.String({ maxLength: 152133 }),
  }),
  delete_guild_templateParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    code: t.String({ maxLength: 152133 }),
  }),
  update_guild_templateParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    code: t.String({ maxLength: 152133 }),
  }),
  update_guild_templateBody: t.Object({
    name: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
    description: t.Optional(t.Union([t.String({ maxLength: 120 }), t.Null()])),
  }),
  get_active_guild_threadsParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_guild_vanity_urlParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_self_voice_stateParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  update_self_voice_stateParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_voice_stateParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_voice_stateParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_guild_webhooksParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_guild_webhooksResponse200: t.Union([
    t.Array(
      t.Union([
        ApplicationIncomingWebhookResponseSchema,
        ChannelFollowerWebhookResponseSchema,
        GuildIncomingWebhookResponseSchema,
      ]),
    ),
    t.Null(),
  ]),
  get_guild_welcome_screenParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_welcome_screenParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_guild_widget_settingsParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_widget_settingsParams: t.Object({
    guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_guild_widget_settingsBody: t.Object({
    channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
    enabled: t.Optional(t.Union([t.Boolean(), t.Null()])),
  }),
  get_guild_widgetParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_guild_widget_pngParams: t.Object({ guild_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_guild_widget_pngQuery: t.Object({
    style: t.Optional(
      t.Union([
        t.Literal('shield', {
          title: 'SHIELD',
          description: 'shield style widget with Discord icon and guild members online count',
        }),
        t.Literal('banner1', {
          title: 'BANNER1',
          description:
            'large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget',
        }),
        t.Literal('banner2', {
          title: 'BANNER2',
          description:
            'smaller widget style with guild icon, name and online count. Split on the right with Discord logo',
        }),
        t.Literal('banner3', {
          title: 'BANNER3',
          description:
            'large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right',
        }),
        t.Literal('banner4', {
          title: 'BANNER4',
          description:
            'large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom',
        }),
      ]),
    ),
  }),
} as const

export type GuildsModel = { [k in keyof typeof GuildsModel]: UnwrapSchema<(typeof GuildsModel)[k]> }
