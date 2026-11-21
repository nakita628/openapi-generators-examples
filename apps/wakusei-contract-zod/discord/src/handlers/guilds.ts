import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getGuildsTemplatesCode = os.getGuildsTemplatesCode.handler(async ({ input }) => {})
export const getGuildsGuildId = os.getGuildsGuildId.handler(async ({ input }) => {})
export const patchGuildsGuildId = os.patchGuildsGuildId.handler(async ({ input }) => {})
export const getGuildsGuildIdAuditLogs = os.getGuildsGuildIdAuditLogs.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdAutoModerationRules = os.getGuildsGuildIdAutoModerationRules.handler(
  async ({ input }) => {},
)
export const postGuildsGuildIdAutoModerationRules = os.postGuildsGuildIdAutoModerationRules.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdAutoModerationRulesRuleId =
  os.getGuildsGuildIdAutoModerationRulesRuleId.handler(async ({ input }) => {})
export const deleteGuildsGuildIdAutoModerationRulesRuleId =
  os.deleteGuildsGuildIdAutoModerationRulesRuleId.handler(async ({ input }) => {})
export const patchGuildsGuildIdAutoModerationRulesRuleId =
  os.patchGuildsGuildIdAutoModerationRulesRuleId.handler(async ({ input }) => {})
export const getGuildsGuildIdBans = os.getGuildsGuildIdBans.handler(async ({ input }) => {})
export const getGuildsGuildIdBansUserId = os.getGuildsGuildIdBansUserId.handler(
  async ({ input }) => {},
)
export const putGuildsGuildIdBansUserId = os.putGuildsGuildIdBansUserId.handler(
  async ({ input }) => {},
)
export const deleteGuildsGuildIdBansUserId = os.deleteGuildsGuildIdBansUserId.handler(
  async ({ input }) => {},
)
export const postGuildsGuildIdBulkBan = os.postGuildsGuildIdBulkBan.handler(async ({ input }) => {})
export const getGuildsGuildIdChannels = os.getGuildsGuildIdChannels.handler(async ({ input }) => {})
export const postGuildsGuildIdChannels = os.postGuildsGuildIdChannels.handler(
  async ({ input }) => {},
)
export const patchGuildsGuildIdChannels = os.patchGuildsGuildIdChannels.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdEmojis = os.getGuildsGuildIdEmojis.handler(async ({ input }) => {})
export const postGuildsGuildIdEmojis = os.postGuildsGuildIdEmojis.handler(async ({ input }) => {})
export const getGuildsGuildIdEmojisEmojiId = os.getGuildsGuildIdEmojisEmojiId.handler(
  async ({ input }) => {},
)
export const deleteGuildsGuildIdEmojisEmojiId = os.deleteGuildsGuildIdEmojisEmojiId.handler(
  async ({ input }) => {},
)
export const patchGuildsGuildIdEmojisEmojiId = os.patchGuildsGuildIdEmojisEmojiId.handler(
  async ({ input }) => {},
)
export const putGuildsGuildIdIncidentActions = os.putGuildsGuildIdIncidentActions.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdIntegrations = os.getGuildsGuildIdIntegrations.handler(
  async ({ input }) => {},
)
export const deleteGuildsGuildIdIntegrationsIntegrationId =
  os.deleteGuildsGuildIdIntegrationsIntegrationId.handler(async ({ input }) => {})
export const getGuildsGuildIdInvites = os.getGuildsGuildIdInvites.handler(async ({ input }) => {})
export const getGuildsGuildIdMembers = os.getGuildsGuildIdMembers.handler(async ({ input }) => {})
export const patchGuildsGuildIdMembersMe = os.patchGuildsGuildIdMembersMe.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdMembersSearch = os.getGuildsGuildIdMembersSearch.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdMembersUserId = os.getGuildsGuildIdMembersUserId.handler(
  async ({ input }) => {},
)
export const putGuildsGuildIdMembersUserId = os.putGuildsGuildIdMembersUserId.handler(
  async ({ input }) => {},
)
export const deleteGuildsGuildIdMembersUserId = os.deleteGuildsGuildIdMembersUserId.handler(
  async ({ input }) => {},
)
export const patchGuildsGuildIdMembersUserId = os.patchGuildsGuildIdMembersUserId.handler(
  async ({ input }) => {},
)
export const putGuildsGuildIdMembersUserIdRolesRoleId =
  os.putGuildsGuildIdMembersUserIdRolesRoleId.handler(async ({ input }) => {})
export const deleteGuildsGuildIdMembersUserIdRolesRoleId =
  os.deleteGuildsGuildIdMembersUserIdRolesRoleId.handler(async ({ input }) => {})
export const getGuildsGuildIdMessagesSearch = os.getGuildsGuildIdMessagesSearch.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdNewMemberWelcome = os.getGuildsGuildIdNewMemberWelcome.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdOnboarding = os.getGuildsGuildIdOnboarding.handler(
  async ({ input }) => {},
)
export const putGuildsGuildIdOnboarding = os.putGuildsGuildIdOnboarding.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdPermissionsMemberUserId =
  os.getGuildsGuildIdPermissionsMemberUserId.handler(async ({ input }) => {})
export const getGuildsGuildIdPermissionsRoleRoleId =
  os.getGuildsGuildIdPermissionsRoleRoleId.handler(async ({ input }) => {})
export const getGuildsGuildIdPreview = os.getGuildsGuildIdPreview.handler(async ({ input }) => {})
export const getGuildsGuildIdPrune = os.getGuildsGuildIdPrune.handler(async ({ input }) => {})
export const postGuildsGuildIdPrune = os.postGuildsGuildIdPrune.handler(async ({ input }) => {})
export const getGuildsGuildIdRegions = os.getGuildsGuildIdRegions.handler(async ({ input }) => {})
export const getGuildsGuildIdRequests = os.getGuildsGuildIdRequests.handler(async ({ input }) => {})
export const patchGuildsGuildIdRequestsRequestId = os.patchGuildsGuildIdRequestsRequestId.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdRoles = os.getGuildsGuildIdRoles.handler(async ({ input }) => {})
export const postGuildsGuildIdRoles = os.postGuildsGuildIdRoles.handler(async ({ input }) => {})
export const patchGuildsGuildIdRoles = os.patchGuildsGuildIdRoles.handler(async ({ input }) => {})
export const getGuildsGuildIdRolesMemberCounts = os.getGuildsGuildIdRolesMemberCounts.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdRolesRoleId = os.getGuildsGuildIdRolesRoleId.handler(
  async ({ input }) => {},
)
export const deleteGuildsGuildIdRolesRoleId = os.deleteGuildsGuildIdRolesRoleId.handler(
  async ({ input }) => {},
)
export const patchGuildsGuildIdRolesRoleId = os.patchGuildsGuildIdRolesRoleId.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdScheduledEvents = os.getGuildsGuildIdScheduledEvents.handler(
  async ({ input }) => {},
)
export const postGuildsGuildIdScheduledEvents = os.postGuildsGuildIdScheduledEvents.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdScheduledEventsGuildScheduledEventId =
  os.getGuildsGuildIdScheduledEventsGuildScheduledEventId.handler(async ({ input }) => {})
export const deleteGuildsGuildIdScheduledEventsGuildScheduledEventId =
  os.deleteGuildsGuildIdScheduledEventsGuildScheduledEventId.handler(async ({ input }) => {})
export const patchGuildsGuildIdScheduledEventsGuildScheduledEventId =
  os.patchGuildsGuildIdScheduledEventsGuildScheduledEventId.handler(async ({ input }) => {})
export const postGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptions =
  os.postGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptions.handler(
    async ({ input }) => {},
  )
export const deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId =
  os.deleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId.handler(
    async ({ input }) => {},
  )
export const patchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId =
  os.patchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId.handler(
    async ({ input }) => {},
  )
export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers =
  os.getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers.handler(async ({ input }) => {})
export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts =
  os.getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts.handler(
    async ({ input }) => {},
  )
export const getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsers =
  os.getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsers.handler(
    async ({ input }) => {},
  )
export const getGuildsGuildIdSoundboardSounds = os.getGuildsGuildIdSoundboardSounds.handler(
  async ({ input }) => {},
)
export const postGuildsGuildIdSoundboardSounds = os.postGuildsGuildIdSoundboardSounds.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdSoundboardSoundsSoundId =
  os.getGuildsGuildIdSoundboardSoundsSoundId.handler(async ({ input }) => {})
export const deleteGuildsGuildIdSoundboardSoundsSoundId =
  os.deleteGuildsGuildIdSoundboardSoundsSoundId.handler(async ({ input }) => {})
export const patchGuildsGuildIdSoundboardSoundsSoundId =
  os.patchGuildsGuildIdSoundboardSoundsSoundId.handler(async ({ input }) => {})
export const getGuildsGuildIdStickers = os.getGuildsGuildIdStickers.handler(async ({ input }) => {})
export const postGuildsGuildIdStickers = os.postGuildsGuildIdStickers.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdStickersStickerId = os.getGuildsGuildIdStickersStickerId.handler(
  async ({ input }) => {},
)
export const deleteGuildsGuildIdStickersStickerId = os.deleteGuildsGuildIdStickersStickerId.handler(
  async ({ input }) => {},
)
export const patchGuildsGuildIdStickersStickerId = os.patchGuildsGuildIdStickersStickerId.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdTemplates = os.getGuildsGuildIdTemplates.handler(
  async ({ input }) => {},
)
export const postGuildsGuildIdTemplates = os.postGuildsGuildIdTemplates.handler(
  async ({ input }) => {},
)
export const putGuildsGuildIdTemplatesCode = os.putGuildsGuildIdTemplatesCode.handler(
  async ({ input }) => {},
)
export const deleteGuildsGuildIdTemplatesCode = os.deleteGuildsGuildIdTemplatesCode.handler(
  async ({ input }) => {},
)
export const patchGuildsGuildIdTemplatesCode = os.patchGuildsGuildIdTemplatesCode.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdThreadsActive = os.getGuildsGuildIdThreadsActive.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdVanityUrl = os.getGuildsGuildIdVanityUrl.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdVoiceStatesMe = os.getGuildsGuildIdVoiceStatesMe.handler(
  async ({ input }) => {},
)
export const patchGuildsGuildIdVoiceStatesMe = os.patchGuildsGuildIdVoiceStatesMe.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdVoiceStatesUserId = os.getGuildsGuildIdVoiceStatesUserId.handler(
  async ({ input }) => {},
)
export const patchGuildsGuildIdVoiceStatesUserId = os.patchGuildsGuildIdVoiceStatesUserId.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdWebhooks = os.getGuildsGuildIdWebhooks.handler(async ({ input }) => {})
export const getGuildsGuildIdWelcomeScreen = os.getGuildsGuildIdWelcomeScreen.handler(
  async ({ input }) => {},
)
export const patchGuildsGuildIdWelcomeScreen = os.patchGuildsGuildIdWelcomeScreen.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdWidget = os.getGuildsGuildIdWidget.handler(async ({ input }) => {})
export const patchGuildsGuildIdWidget = os.patchGuildsGuildIdWidget.handler(async ({ input }) => {})
export const getGuildsGuildIdWidgetJson = os.getGuildsGuildIdWidgetJson.handler(
  async ({ input }) => {},
)
export const getGuildsGuildIdWidgetPng = os.getGuildsGuildIdWidgetPng.handler(
  async ({ input }) => {},
)
