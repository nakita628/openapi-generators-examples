import { Hono } from 'hono'
import {
  getGuildsTemplatesCodeHandler,
  getGuildsGuildIdHandler,
  patchGuildsGuildIdHandler,
  getGuildsGuildIdAuditLogsHandler,
  getGuildsGuildIdAutoModerationRulesHandler,
  postGuildsGuildIdAutoModerationRulesHandler,
  getGuildsGuildIdAutoModerationRulesRuleIdHandler,
  deleteGuildsGuildIdAutoModerationRulesRuleIdHandler,
  patchGuildsGuildIdAutoModerationRulesRuleIdHandler,
  getGuildsGuildIdBansHandler,
  getGuildsGuildIdBansUserIdHandler,
  putGuildsGuildIdBansUserIdHandler,
  deleteGuildsGuildIdBansUserIdHandler,
  postGuildsGuildIdBulkBanHandler,
  getGuildsGuildIdChannelsHandler,
  postGuildsGuildIdChannelsHandler,
  patchGuildsGuildIdChannelsHandler,
  getGuildsGuildIdEmojisHandler,
  postGuildsGuildIdEmojisHandler,
  getGuildsGuildIdEmojisEmojiIdHandler,
  deleteGuildsGuildIdEmojisEmojiIdHandler,
  patchGuildsGuildIdEmojisEmojiIdHandler,
  putGuildsGuildIdIncidentActionsHandler,
  getGuildsGuildIdIntegrationsHandler,
  deleteGuildsGuildIdIntegrationsIntegrationIdHandler,
  getGuildsGuildIdInvitesHandler,
  getGuildsGuildIdMembersHandler,
  patchGuildsGuildIdMembersMeHandler,
  getGuildsGuildIdMembersSearchHandler,
  getGuildsGuildIdMembersUserIdHandler,
  putGuildsGuildIdMembersUserIdHandler,
  deleteGuildsGuildIdMembersUserIdHandler,
  patchGuildsGuildIdMembersUserIdHandler,
  putGuildsGuildIdMembersUserIdRolesRoleIdHandler,
  deleteGuildsGuildIdMembersUserIdRolesRoleIdHandler,
  getGuildsGuildIdMessagesSearchHandler,
  getGuildsGuildIdNewMemberWelcomeHandler,
  getGuildsGuildIdOnboardingHandler,
  putGuildsGuildIdOnboardingHandler,
  getGuildsGuildIdPermissionsMemberUserIdHandler,
  getGuildsGuildIdPermissionsRoleRoleIdHandler,
  getGuildsGuildIdPreviewHandler,
  getGuildsGuildIdPruneHandler,
  postGuildsGuildIdPruneHandler,
  getGuildsGuildIdRegionsHandler,
  getGuildsGuildIdRequestsHandler,
  patchGuildsGuildIdRequestsRequestIdHandler,
  getGuildsGuildIdRolesHandler,
  postGuildsGuildIdRolesHandler,
  patchGuildsGuildIdRolesHandler,
  getGuildsGuildIdRolesMemberCountsHandler,
  getGuildsGuildIdRolesRoleIdHandler,
  deleteGuildsGuildIdRolesRoleIdHandler,
  patchGuildsGuildIdRolesRoleIdHandler,
  getGuildsGuildIdScheduledEventsHandler,
  postGuildsGuildIdScheduledEventsHandler,
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdHandler,
  deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdHandler,
  patchGuildsGuildIdScheduledEventsGuildScheduledEventIdHandler,
  postGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsHandler,
  deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdHandler,
  patchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdHandler,
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersHandler,
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsHandler,
  getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersHandler,
  getGuildsGuildIdSoundboardSoundsHandler,
  postGuildsGuildIdSoundboardSoundsHandler,
  getGuildsGuildIdSoundboardSoundsSoundIdHandler,
  deleteGuildsGuildIdSoundboardSoundsSoundIdHandler,
  patchGuildsGuildIdSoundboardSoundsSoundIdHandler,
  getGuildsGuildIdStickersHandler,
  postGuildsGuildIdStickersHandler,
  getGuildsGuildIdStickersStickerIdHandler,
  deleteGuildsGuildIdStickersStickerIdHandler,
  patchGuildsGuildIdStickersStickerIdHandler,
  getGuildsGuildIdTemplatesHandler,
  postGuildsGuildIdTemplatesHandler,
  putGuildsGuildIdTemplatesCodeHandler,
  deleteGuildsGuildIdTemplatesCodeHandler,
  patchGuildsGuildIdTemplatesCodeHandler,
  getGuildsGuildIdThreadsActiveHandler,
  getGuildsGuildIdVanityUrlHandler,
  getGuildsGuildIdVoiceStatesMeHandler,
  patchGuildsGuildIdVoiceStatesMeHandler,
  getGuildsGuildIdVoiceStatesUserIdHandler,
  patchGuildsGuildIdVoiceStatesUserIdHandler,
  getGuildsGuildIdWebhooksHandler,
  getGuildsGuildIdWelcomeScreenHandler,
  patchGuildsGuildIdWelcomeScreenHandler,
  getGuildsGuildIdWidgetHandler,
  patchGuildsGuildIdWidgetHandler,
  getGuildsGuildIdWidgetJsonHandler,
  getGuildsGuildIdWidgetPngHandler,
} from '../routes'

export const guildsHandler = new Hono()
  .get(
    '/guilds/templates/:code',
    getGuildsTemplatesCodeHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id',
    getGuildsGuildIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id',
    patchGuildsGuildIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/audit-logs',
    getGuildsGuildIdAuditLogsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/auto-moderation/rules',
    getGuildsGuildIdAutoModerationRulesHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/guilds/:guild_id/auto-moderation/rules',
    postGuildsGuildIdAutoModerationRulesHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    getGuildsGuildIdAutoModerationRulesRuleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    deleteGuildsGuildIdAutoModerationRulesRuleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/auto-moderation/rules/:rule_id',
    patchGuildsGuildIdAutoModerationRulesRuleIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/bans',
    getGuildsGuildIdBansHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/bans/:user_id',
    getGuildsGuildIdBansUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/guilds/:guild_id/bans/:user_id',
    putGuildsGuildIdBansUserIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/guilds/:guild_id/bans/:user_id',
    deleteGuildsGuildIdBansUserIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/guilds/:guild_id/bulk-ban',
    postGuildsGuildIdBulkBanHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/channels',
    getGuildsGuildIdChannelsHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/guilds/:guild_id/channels',
    postGuildsGuildIdChannelsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/channels',
    patchGuildsGuildIdChannelsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/emojis',
    getGuildsGuildIdEmojisHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/guilds/:guild_id/emojis',
    postGuildsGuildIdEmojisHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/emojis/:emoji_id',
    getGuildsGuildIdEmojisEmojiIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/guilds/:guild_id/emojis/:emoji_id',
    deleteGuildsGuildIdEmojisEmojiIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/emojis/:emoji_id',
    patchGuildsGuildIdEmojisEmojiIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/guilds/:guild_id/incident-actions',
    putGuildsGuildIdIncidentActionsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/integrations',
    getGuildsGuildIdIntegrationsHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/guilds/:guild_id/integrations/:integration_id',
    deleteGuildsGuildIdIntegrationsIntegrationIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/invites',
    getGuildsGuildIdInvitesHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/members',
    getGuildsGuildIdMembersHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/members/@me',
    patchGuildsGuildIdMembersMeHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/members/search',
    getGuildsGuildIdMembersSearchHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/members/:user_id',
    getGuildsGuildIdMembersUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/guilds/:guild_id/members/:user_id',
    putGuildsGuildIdMembersUserIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/guilds/:guild_id/members/:user_id',
    deleteGuildsGuildIdMembersUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/members/:user_id',
    patchGuildsGuildIdMembersUserIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    putGuildsGuildIdMembersUserIdRolesRoleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/guilds/:guild_id/members/:user_id/roles/:role_id',
    deleteGuildsGuildIdMembersUserIdRolesRoleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/messages/search',
    getGuildsGuildIdMessagesSearchHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/new-member-welcome',
    getGuildsGuildIdNewMemberWelcomeHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/onboarding',
    getGuildsGuildIdOnboardingHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/guilds/:guild_id/onboarding',
    putGuildsGuildIdOnboardingHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/permissions/member/:user_id',
    getGuildsGuildIdPermissionsMemberUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/permissions/role/:role_id',
    getGuildsGuildIdPermissionsRoleRoleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/preview',
    getGuildsGuildIdPreviewHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/prune',
    getGuildsGuildIdPruneHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/guilds/:guild_id/prune',
    postGuildsGuildIdPruneHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/regions',
    getGuildsGuildIdRegionsHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/requests',
    getGuildsGuildIdRequestsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/requests/:request_id',
    patchGuildsGuildIdRequestsRequestIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/roles',
    getGuildsGuildIdRolesHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/guilds/:guild_id/roles',
    postGuildsGuildIdRolesHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/roles',
    patchGuildsGuildIdRolesHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/roles/member-counts',
    getGuildsGuildIdRolesMemberCountsHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/roles/:role_id',
    getGuildsGuildIdRolesRoleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/guilds/:guild_id/roles/:role_id',
    deleteGuildsGuildIdRolesRoleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/roles/:role_id',
    patchGuildsGuildIdRolesRoleIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/scheduled-events',
    getGuildsGuildIdScheduledEventsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/guilds/:guild_id/scheduled-events',
    postGuildsGuildIdScheduledEventsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    getGuildsGuildIdScheduledEventsGuildScheduledEventIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    patchGuildsGuildIdScheduledEventsGuildScheduledEventIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions',
    postGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsHandler(
      async (c, { param, json }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .patch(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/exceptions/:exception_id',
    patchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdHandler(
      async (c, { param, json }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users',
    getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users/counts',
    getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/:guild_scheduled_event_exception_id/users',
    getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds',
    getGuildsGuildIdSoundboardSoundsHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/guilds/:guild_id/soundboard-sounds',
    postGuildsGuildIdSoundboardSoundsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    getGuildsGuildIdSoundboardSoundsSoundIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    deleteGuildsGuildIdSoundboardSoundsSoundIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/soundboard-sounds/:sound_id',
    patchGuildsGuildIdSoundboardSoundsSoundIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/stickers',
    getGuildsGuildIdStickersHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/guilds/:guild_id/stickers',
    postGuildsGuildIdStickersHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/stickers/:sticker_id',
    getGuildsGuildIdStickersStickerIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/guilds/:guild_id/stickers/:sticker_id',
    deleteGuildsGuildIdStickersStickerIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/stickers/:sticker_id',
    patchGuildsGuildIdStickersStickerIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/templates',
    getGuildsGuildIdTemplatesHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/guilds/:guild_id/templates',
    postGuildsGuildIdTemplatesHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/guilds/:guild_id/templates/:code',
    putGuildsGuildIdTemplatesCodeHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/guilds/:guild_id/templates/:code',
    deleteGuildsGuildIdTemplatesCodeHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/templates/:code',
    patchGuildsGuildIdTemplatesCodeHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/threads/active',
    getGuildsGuildIdThreadsActiveHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/vanity-url',
    getGuildsGuildIdVanityUrlHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/voice-states/@me',
    getGuildsGuildIdVoiceStatesMeHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/voice-states/@me',
    patchGuildsGuildIdVoiceStatesMeHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/voice-states/:user_id',
    getGuildsGuildIdVoiceStatesUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/voice-states/:user_id',
    patchGuildsGuildIdVoiceStatesUserIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/webhooks',
    getGuildsGuildIdWebhooksHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/welcome-screen',
    getGuildsGuildIdWelcomeScreenHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/welcome-screen',
    patchGuildsGuildIdWelcomeScreenHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/widget',
    getGuildsGuildIdWidgetHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/guilds/:guild_id/widget',
    patchGuildsGuildIdWidgetHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/widget.json',
    getGuildsGuildIdWidgetJsonHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/guilds/:guild_id/widget.png',
    getGuildsGuildIdWidgetPngHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
