import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getOrganizationAdminApiKeys = os.getOrganizationAdminApiKeys.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationAdminApiKeys = os.postOrganizationAdminApiKeys.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationAdminApiKeysKeyId = os.getOrganizationAdminApiKeysKeyId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteOrganizationAdminApiKeysKeyId = os.deleteOrganizationAdminApiKeysKeyId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationAuditLogs = os.getOrganizationAuditLogs.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationCertificates = os.getOrganizationCertificates.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationCertificates = os.postOrganizationCertificates.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationCertificatesActivate = os.postOrganizationCertificatesActivate.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationCertificatesDeactivate =
  os.postOrganizationCertificatesDeactivate.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationCertificatesCertificateId =
  os.getOrganizationCertificatesCertificateId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationCertificatesCertificateId =
  os.postOrganizationCertificatesCertificateId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteOrganizationCertificatesCertificateId =
  os.deleteOrganizationCertificatesCertificateId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationCosts = os.getOrganizationCosts.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationDataRetention = os.getOrganizationDataRetention.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationDataRetention = os.postOrganizationDataRetention.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationGroups = os.getOrganizationGroups.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationGroups = os.postOrganizationGroups.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationGroupsGroupId = os.getOrganizationGroupsGroupId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationGroupsGroupId = os.postOrganizationGroupsGroupId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteOrganizationGroupsGroupId = os.deleteOrganizationGroupsGroupId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationGroupsGroupIdRoles = os.getOrganizationGroupsGroupIdRoles.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationGroupsGroupIdRoles = os.postOrganizationGroupsGroupIdRoles.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationGroupsGroupIdRolesRoleId =
  os.getOrganizationGroupsGroupIdRolesRoleId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteOrganizationGroupsGroupIdRolesRoleId =
  os.deleteOrganizationGroupsGroupIdRolesRoleId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationGroupsGroupIdUsers = os.getOrganizationGroupsGroupIdUsers.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationGroupsGroupIdUsers = os.postOrganizationGroupsGroupIdUsers.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationGroupsGroupIdUsersUserId =
  os.getOrganizationGroupsGroupIdUsersUserId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteOrganizationGroupsGroupIdUsersUserId =
  os.deleteOrganizationGroupsGroupIdUsersUserId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationInvites = os.getOrganizationInvites.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationInvites = os.postOrganizationInvites.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationInvitesInviteId = os.getOrganizationInvitesInviteId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteOrganizationInvitesInviteId = os.deleteOrganizationInvitesInviteId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationProjects = os.getOrganizationProjects.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjects = os.postOrganizationProjects.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectId = os.getOrganizationProjectsProjectId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationProjectsProjectId = os.postOrganizationProjectsProjectId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationProjectsProjectIdApiKeys =
  os.getOrganizationProjectsProjectIdApiKeys.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdApiKeysApiKeyId =
  os.getOrganizationProjectsProjectIdApiKeysApiKeyId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdApiKeysApiKeyId =
  os.postOrganizationProjectsProjectIdApiKeysApiKeyId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteOrganizationProjectsProjectIdApiKeysApiKeyId =
  os.deleteOrganizationProjectsProjectIdApiKeysApiKeyId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdArchive =
  os.postOrganizationProjectsProjectIdArchive.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdCertificates =
  os.getOrganizationProjectsProjectIdCertificates.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdCertificatesActivate =
  os.postOrganizationProjectsProjectIdCertificatesActivate.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdCertificatesDeactivate =
  os.postOrganizationProjectsProjectIdCertificatesDeactivate.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdDataRetention =
  os.getOrganizationProjectsProjectIdDataRetention.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdDataRetention =
  os.postOrganizationProjectsProjectIdDataRetention.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdGroups =
  os.getOrganizationProjectsProjectIdGroups.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdGroups =
  os.postOrganizationProjectsProjectIdGroups.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdGroupsGroupId =
  os.getOrganizationProjectsProjectIdGroupsGroupId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteOrganizationProjectsProjectIdGroupsGroupId =
  os.deleteOrganizationProjectsProjectIdGroupsGroupId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdHostedToolPermissions =
  os.getOrganizationProjectsProjectIdHostedToolPermissions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdHostedToolPermissions =
  os.postOrganizationProjectsProjectIdHostedToolPermissions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdModelPermissions =
  os.getOrganizationProjectsProjectIdModelPermissions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdModelPermissions =
  os.postOrganizationProjectsProjectIdModelPermissions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteOrganizationProjectsProjectIdModelPermissions =
  os.deleteOrganizationProjectsProjectIdModelPermissions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdRateLimits =
  os.getOrganizationProjectsProjectIdRateLimits.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdRateLimitsRateLimitId =
  os.postOrganizationProjectsProjectIdRateLimitsRateLimitId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdServiceAccounts =
  os.getOrganizationProjectsProjectIdServiceAccounts.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdServiceAccounts =
  os.postOrganizationProjectsProjectIdServiceAccounts.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdServiceAccountsServiceAccountId =
  os.getOrganizationProjectsProjectIdServiceAccountsServiceAccountId.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const postOrganizationProjectsProjectIdServiceAccountsServiceAccountId =
  os.postOrganizationProjectsProjectIdServiceAccountsServiceAccountId.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const deleteOrganizationProjectsProjectIdServiceAccountsServiceAccountId =
  os.deleteOrganizationProjectsProjectIdServiceAccountsServiceAccountId.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const getOrganizationProjectsProjectIdSpendAlerts =
  os.getOrganizationProjectsProjectIdSpendAlerts.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdSpendAlerts =
  os.postOrganizationProjectsProjectIdSpendAlerts.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdSpendAlertsAlertId =
  os.getOrganizationProjectsProjectIdSpendAlertsAlertId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdSpendAlertsAlertId =
  os.postOrganizationProjectsProjectIdSpendAlertsAlertId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteOrganizationProjectsProjectIdSpendAlertsAlertId =
  os.deleteOrganizationProjectsProjectIdSpendAlertsAlertId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdUsers =
  os.getOrganizationProjectsProjectIdUsers.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdUsers =
  os.postOrganizationProjectsProjectIdUsers.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdUsersUserId =
  os.getOrganizationProjectsProjectIdUsersUserId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdUsersUserId =
  os.postOrganizationProjectsProjectIdUsersUserId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteOrganizationProjectsProjectIdUsersUserId =
  os.deleteOrganizationProjectsProjectIdUsersUserId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationRoles = os.getOrganizationRoles.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationRoles = os.postOrganizationRoles.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationRolesRoleId = os.getOrganizationRolesRoleId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationRolesRoleId = os.postOrganizationRolesRoleId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteOrganizationRolesRoleId = os.deleteOrganizationRolesRoleId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationSpendAlerts = os.getOrganizationSpendAlerts.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationSpendAlerts = os.postOrganizationSpendAlerts.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationSpendAlertsAlertId = os.getOrganizationSpendAlertsAlertId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationSpendAlertsAlertId = os.postOrganizationSpendAlertsAlertId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteOrganizationSpendAlertsAlertId = os.deleteOrganizationSpendAlertsAlertId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationUsageAudioSpeeches = os.getOrganizationUsageAudioSpeeches.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationUsageAudioTranscriptions =
  os.getOrganizationUsageAudioTranscriptions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationUsageCodeInterpreterSessions =
  os.getOrganizationUsageCodeInterpreterSessions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationUsageCompletions = os.getOrganizationUsageCompletions.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationUsageEmbeddings = os.getOrganizationUsageEmbeddings.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationUsageFileSearchCalls = os.getOrganizationUsageFileSearchCalls.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationUsageImages = os.getOrganizationUsageImages.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationUsageModerations = os.getOrganizationUsageModerations.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationUsageVectorStores = os.getOrganizationUsageVectorStores.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationUsageWebSearchCalls = os.getOrganizationUsageWebSearchCalls.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationUsers = os.getOrganizationUsers.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationUsersUserId = os.getOrganizationUsersUserId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationUsersUserId = os.postOrganizationUsersUserId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteOrganizationUsersUserId = os.deleteOrganizationUsersUserId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationUsersUserIdRoles = os.getOrganizationUsersUserIdRoles.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationUsersUserIdRoles = os.postOrganizationUsersUserIdRoles.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationUsersUserIdRolesRoleId =
  os.getOrganizationUsersUserIdRolesRoleId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteOrganizationUsersUserIdRolesRoleId =
  os.deleteOrganizationUsersUserIdRolesRoleId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationExternalKeys = os.getOrganizationExternalKeys.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationExternalKeys = os.postOrganizationExternalKeys.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationExternalKeysExternalKeyId =
  os.getOrganizationExternalKeysExternalKeyId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteOrganizationExternalKeysExternalKeyId =
  os.deleteOrganizationExternalKeysExternalKeyId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationExternalKeysExternalKeyIdValidate =
  os.postOrganizationExternalKeysExternalKeyIdValidate.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationWorkloadIdentityProviders =
  os.getOrganizationWorkloadIdentityProviders.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationWorkloadIdentityProviders =
  os.postOrganizationWorkloadIdentityProviders.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId =
  os.getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId =
  os.postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId =
  os.deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules =
  os.getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules =
  os.postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId =
  os.getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId =
  os.postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId =
  os.deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
export const getOrganizationUsageDecisions = os.getOrganizationUsageDecisions.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationExternalStorage = os.getOrganizationExternalStorage.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationExternalStorage = os.postOrganizationExternalStorage.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationExternalStorageExternalStorageId =
  os.getOrganizationExternalStorageExternalStorageId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteOrganizationExternalStorageExternalStorageId =
  os.deleteOrganizationExternalStorageExternalStorageId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationExternalStorageExternalStorageIdValidate =
  os.postOrganizationExternalStorageExternalStorageIdValidate.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationSpendLimit = os.getOrganizationSpendLimit.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postOrganizationSpendLimit = os.postOrganizationSpendLimit.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteOrganizationSpendLimit = os.deleteOrganizationSpendLimit.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getOrganizationProjectsProjectIdSpendLimit =
  os.getOrganizationProjectsProjectIdSpendLimit.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdSpendLimit =
  os.postOrganizationProjectsProjectIdSpendLimit.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteOrganizationProjectsProjectIdSpendLimit =
  os.deleteOrganizationProjectsProjectIdSpendLimit.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOrganizationProjectsProjectIdServiceTierSettings =
  os.getOrganizationProjectsProjectIdServiceTierSettings.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdServiceTierSettings =
  os.postOrganizationProjectsProjectIdServiceTierSettings.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeys =
  os.postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeys.handler(
    async ({ input }) => { throw new Error('Not implemented') },
  )
