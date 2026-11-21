import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getOrganizationAdminApiKeys = os.getOrganizationAdminApiKeys.handler(
  async ({ input }) => {},
)
export const postOrganizationAdminApiKeys = os.postOrganizationAdminApiKeys.handler(
  async ({ input }) => {},
)
export const getOrganizationAdminApiKeysKeyId = os.getOrganizationAdminApiKeysKeyId.handler(
  async ({ input }) => {},
)
export const deleteOrganizationAdminApiKeysKeyId = os.deleteOrganizationAdminApiKeysKeyId.handler(
  async ({ input }) => {},
)
export const getOrganizationAuditLogs = os.getOrganizationAuditLogs.handler(async ({ input }) => {})
export const getOrganizationCertificates = os.getOrganizationCertificates.handler(
  async ({ input }) => {},
)
export const postOrganizationCertificates = os.postOrganizationCertificates.handler(
  async ({ input }) => {},
)
export const postOrganizationCertificatesActivate = os.postOrganizationCertificatesActivate.handler(
  async ({ input }) => {},
)
export const postOrganizationCertificatesDeactivate =
  os.postOrganizationCertificatesDeactivate.handler(async ({ input }) => {})
export const getOrganizationCertificatesCertificateId =
  os.getOrganizationCertificatesCertificateId.handler(async ({ input }) => {})
export const postOrganizationCertificatesCertificateId =
  os.postOrganizationCertificatesCertificateId.handler(async ({ input }) => {})
export const deleteOrganizationCertificatesCertificateId =
  os.deleteOrganizationCertificatesCertificateId.handler(async ({ input }) => {})
export const getOrganizationCosts = os.getOrganizationCosts.handler(async ({ input }) => {})
export const getOrganizationDataRetention = os.getOrganizationDataRetention.handler(
  async ({ input }) => {},
)
export const postOrganizationDataRetention = os.postOrganizationDataRetention.handler(
  async ({ input }) => {},
)
export const getOrganizationGroups = os.getOrganizationGroups.handler(async ({ input }) => {})
export const postOrganizationGroups = os.postOrganizationGroups.handler(async ({ input }) => {})
export const getOrganizationGroupsGroupId = os.getOrganizationGroupsGroupId.handler(
  async ({ input }) => {},
)
export const postOrganizationGroupsGroupId = os.postOrganizationGroupsGroupId.handler(
  async ({ input }) => {},
)
export const deleteOrganizationGroupsGroupId = os.deleteOrganizationGroupsGroupId.handler(
  async ({ input }) => {},
)
export const getOrganizationGroupsGroupIdRoles = os.getOrganizationGroupsGroupIdRoles.handler(
  async ({ input }) => {},
)
export const postOrganizationGroupsGroupIdRoles = os.postOrganizationGroupsGroupIdRoles.handler(
  async ({ input }) => {},
)
export const getOrganizationGroupsGroupIdRolesRoleId =
  os.getOrganizationGroupsGroupIdRolesRoleId.handler(async ({ input }) => {})
export const deleteOrganizationGroupsGroupIdRolesRoleId =
  os.deleteOrganizationGroupsGroupIdRolesRoleId.handler(async ({ input }) => {})
export const getOrganizationGroupsGroupIdUsers = os.getOrganizationGroupsGroupIdUsers.handler(
  async ({ input }) => {},
)
export const postOrganizationGroupsGroupIdUsers = os.postOrganizationGroupsGroupIdUsers.handler(
  async ({ input }) => {},
)
export const getOrganizationGroupsGroupIdUsersUserId =
  os.getOrganizationGroupsGroupIdUsersUserId.handler(async ({ input }) => {})
export const deleteOrganizationGroupsGroupIdUsersUserId =
  os.deleteOrganizationGroupsGroupIdUsersUserId.handler(async ({ input }) => {})
export const getOrganizationInvites = os.getOrganizationInvites.handler(async ({ input }) => {})
export const postOrganizationInvites = os.postOrganizationInvites.handler(async ({ input }) => {})
export const getOrganizationInvitesInviteId = os.getOrganizationInvitesInviteId.handler(
  async ({ input }) => {},
)
export const deleteOrganizationInvitesInviteId = os.deleteOrganizationInvitesInviteId.handler(
  async ({ input }) => {},
)
export const getOrganizationProjects = os.getOrganizationProjects.handler(async ({ input }) => {})
export const postOrganizationProjects = os.postOrganizationProjects.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectId = os.getOrganizationProjectsProjectId.handler(
  async ({ input }) => {},
)
export const postOrganizationProjectsProjectId = os.postOrganizationProjectsProjectId.handler(
  async ({ input }) => {},
)
export const getOrganizationProjectsProjectIdApiKeys =
  os.getOrganizationProjectsProjectIdApiKeys.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdApiKeysApiKeyId =
  os.getOrganizationProjectsProjectIdApiKeysApiKeyId.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdApiKeysApiKeyId =
  os.postOrganizationProjectsProjectIdApiKeysApiKeyId.handler(async ({ input }) => {})
export const deleteOrganizationProjectsProjectIdApiKeysApiKeyId =
  os.deleteOrganizationProjectsProjectIdApiKeysApiKeyId.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdArchive =
  os.postOrganizationProjectsProjectIdArchive.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdCertificates =
  os.getOrganizationProjectsProjectIdCertificates.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdCertificatesActivate =
  os.postOrganizationProjectsProjectIdCertificatesActivate.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdCertificatesDeactivate =
  os.postOrganizationProjectsProjectIdCertificatesDeactivate.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdDataRetention =
  os.getOrganizationProjectsProjectIdDataRetention.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdDataRetention =
  os.postOrganizationProjectsProjectIdDataRetention.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdGroups =
  os.getOrganizationProjectsProjectIdGroups.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdGroups =
  os.postOrganizationProjectsProjectIdGroups.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdGroupsGroupId =
  os.getOrganizationProjectsProjectIdGroupsGroupId.handler(async ({ input }) => {})
export const deleteOrganizationProjectsProjectIdGroupsGroupId =
  os.deleteOrganizationProjectsProjectIdGroupsGroupId.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdHostedToolPermissions =
  os.getOrganizationProjectsProjectIdHostedToolPermissions.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdHostedToolPermissions =
  os.postOrganizationProjectsProjectIdHostedToolPermissions.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdModelPermissions =
  os.getOrganizationProjectsProjectIdModelPermissions.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdModelPermissions =
  os.postOrganizationProjectsProjectIdModelPermissions.handler(async ({ input }) => {})
export const deleteOrganizationProjectsProjectIdModelPermissions =
  os.deleteOrganizationProjectsProjectIdModelPermissions.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdRateLimits =
  os.getOrganizationProjectsProjectIdRateLimits.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdRateLimitsRateLimitId =
  os.postOrganizationProjectsProjectIdRateLimitsRateLimitId.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdServiceAccounts =
  os.getOrganizationProjectsProjectIdServiceAccounts.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdServiceAccounts =
  os.postOrganizationProjectsProjectIdServiceAccounts.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdServiceAccountsServiceAccountId =
  os.getOrganizationProjectsProjectIdServiceAccountsServiceAccountId.handler(
    async ({ input }) => {},
  )
export const postOrganizationProjectsProjectIdServiceAccountsServiceAccountId =
  os.postOrganizationProjectsProjectIdServiceAccountsServiceAccountId.handler(
    async ({ input }) => {},
  )
export const deleteOrganizationProjectsProjectIdServiceAccountsServiceAccountId =
  os.deleteOrganizationProjectsProjectIdServiceAccountsServiceAccountId.handler(
    async ({ input }) => {},
  )
export const getOrganizationProjectsProjectIdSpendAlerts =
  os.getOrganizationProjectsProjectIdSpendAlerts.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdSpendAlerts =
  os.postOrganizationProjectsProjectIdSpendAlerts.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdSpendAlertsAlertId =
  os.getOrganizationProjectsProjectIdSpendAlertsAlertId.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdSpendAlertsAlertId =
  os.postOrganizationProjectsProjectIdSpendAlertsAlertId.handler(async ({ input }) => {})
export const deleteOrganizationProjectsProjectIdSpendAlertsAlertId =
  os.deleteOrganizationProjectsProjectIdSpendAlertsAlertId.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdUsers =
  os.getOrganizationProjectsProjectIdUsers.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdUsers =
  os.postOrganizationProjectsProjectIdUsers.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdUsersUserId =
  os.getOrganizationProjectsProjectIdUsersUserId.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdUsersUserId =
  os.postOrganizationProjectsProjectIdUsersUserId.handler(async ({ input }) => {})
export const deleteOrganizationProjectsProjectIdUsersUserId =
  os.deleteOrganizationProjectsProjectIdUsersUserId.handler(async ({ input }) => {})
export const getOrganizationRoles = os.getOrganizationRoles.handler(async ({ input }) => {})
export const postOrganizationRoles = os.postOrganizationRoles.handler(async ({ input }) => {})
export const getOrganizationRolesRoleId = os.getOrganizationRolesRoleId.handler(
  async ({ input }) => {},
)
export const postOrganizationRolesRoleId = os.postOrganizationRolesRoleId.handler(
  async ({ input }) => {},
)
export const deleteOrganizationRolesRoleId = os.deleteOrganizationRolesRoleId.handler(
  async ({ input }) => {},
)
export const getOrganizationSpendAlerts = os.getOrganizationSpendAlerts.handler(
  async ({ input }) => {},
)
export const postOrganizationSpendAlerts = os.postOrganizationSpendAlerts.handler(
  async ({ input }) => {},
)
export const getOrganizationSpendAlertsAlertId = os.getOrganizationSpendAlertsAlertId.handler(
  async ({ input }) => {},
)
export const postOrganizationSpendAlertsAlertId = os.postOrganizationSpendAlertsAlertId.handler(
  async ({ input }) => {},
)
export const deleteOrganizationSpendAlertsAlertId = os.deleteOrganizationSpendAlertsAlertId.handler(
  async ({ input }) => {},
)
export const getOrganizationUsageAudioSpeeches = os.getOrganizationUsageAudioSpeeches.handler(
  async ({ input }) => {},
)
export const getOrganizationUsageAudioTranscriptions =
  os.getOrganizationUsageAudioTranscriptions.handler(async ({ input }) => {})
export const getOrganizationUsageCodeInterpreterSessions =
  os.getOrganizationUsageCodeInterpreterSessions.handler(async ({ input }) => {})
export const getOrganizationUsageCompletions = os.getOrganizationUsageCompletions.handler(
  async ({ input }) => {},
)
export const getOrganizationUsageEmbeddings = os.getOrganizationUsageEmbeddings.handler(
  async ({ input }) => {},
)
export const getOrganizationUsageFileSearchCalls = os.getOrganizationUsageFileSearchCalls.handler(
  async ({ input }) => {},
)
export const getOrganizationUsageImages = os.getOrganizationUsageImages.handler(
  async ({ input }) => {},
)
export const getOrganizationUsageModerations = os.getOrganizationUsageModerations.handler(
  async ({ input }) => {},
)
export const getOrganizationUsageVectorStores = os.getOrganizationUsageVectorStores.handler(
  async ({ input }) => {},
)
export const getOrganizationUsageWebSearchCalls = os.getOrganizationUsageWebSearchCalls.handler(
  async ({ input }) => {},
)
export const getOrganizationUsers = os.getOrganizationUsers.handler(async ({ input }) => {})
export const getOrganizationUsersUserId = os.getOrganizationUsersUserId.handler(
  async ({ input }) => {},
)
export const postOrganizationUsersUserId = os.postOrganizationUsersUserId.handler(
  async ({ input }) => {},
)
export const deleteOrganizationUsersUserId = os.deleteOrganizationUsersUserId.handler(
  async ({ input }) => {},
)
export const getOrganizationUsersUserIdRoles = os.getOrganizationUsersUserIdRoles.handler(
  async ({ input }) => {},
)
export const postOrganizationUsersUserIdRoles = os.postOrganizationUsersUserIdRoles.handler(
  async ({ input }) => {},
)
export const getOrganizationUsersUserIdRolesRoleId =
  os.getOrganizationUsersUserIdRolesRoleId.handler(async ({ input }) => {})
export const deleteOrganizationUsersUserIdRolesRoleId =
  os.deleteOrganizationUsersUserIdRolesRoleId.handler(async ({ input }) => {})
export const getOrganizationExternalKeys = os.getOrganizationExternalKeys.handler(
  async ({ input }) => {},
)
export const postOrganizationExternalKeys = os.postOrganizationExternalKeys.handler(
  async ({ input }) => {},
)
export const getOrganizationExternalKeysExternalKeyId =
  os.getOrganizationExternalKeysExternalKeyId.handler(async ({ input }) => {})
export const deleteOrganizationExternalKeysExternalKeyId =
  os.deleteOrganizationExternalKeysExternalKeyId.handler(async ({ input }) => {})
export const postOrganizationExternalKeysExternalKeyIdValidate =
  os.postOrganizationExternalKeysExternalKeyIdValidate.handler(async ({ input }) => {})
export const getOrganizationWorkloadIdentityProviders =
  os.getOrganizationWorkloadIdentityProviders.handler(async ({ input }) => {})
export const postOrganizationWorkloadIdentityProviders =
  os.postOrganizationWorkloadIdentityProviders.handler(async ({ input }) => {})
export const getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId =
  os.getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId.handler(
    async ({ input }) => {},
  )
export const postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId =
  os.postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId.handler(
    async ({ input }) => {},
  )
export const deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId =
  os.deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId.handler(
    async ({ input }) => {},
  )
export const getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules =
  os.getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules.handler(
    async ({ input }) => {},
  )
export const postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules =
  os.postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules.handler(
    async ({ input }) => {},
  )
export const getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId =
  os.getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId.handler(
    async ({ input }) => {},
  )
export const postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId =
  os.postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId.handler(
    async ({ input }) => {},
  )
export const deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId =
  os.deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId.handler(
    async ({ input }) => {},
  )
export const getOrganizationUsageDecisions = os.getOrganizationUsageDecisions.handler(
  async ({ input }) => {},
)
export const getOrganizationExternalStorage = os.getOrganizationExternalStorage.handler(
  async ({ input }) => {},
)
export const postOrganizationExternalStorage = os.postOrganizationExternalStorage.handler(
  async ({ input }) => {},
)
export const getOrganizationExternalStorageExternalStorageId =
  os.getOrganizationExternalStorageExternalStorageId.handler(async ({ input }) => {})
export const deleteOrganizationExternalStorageExternalStorageId =
  os.deleteOrganizationExternalStorageExternalStorageId.handler(async ({ input }) => {})
export const postOrganizationExternalStorageExternalStorageIdValidate =
  os.postOrganizationExternalStorageExternalStorageIdValidate.handler(async ({ input }) => {})
export const getOrganizationSpendLimit = os.getOrganizationSpendLimit.handler(
  async ({ input }) => {},
)
export const postOrganizationSpendLimit = os.postOrganizationSpendLimit.handler(
  async ({ input }) => {},
)
export const deleteOrganizationSpendLimit = os.deleteOrganizationSpendLimit.handler(
  async ({ input }) => {},
)
export const getOrganizationProjectsProjectIdSpendLimit =
  os.getOrganizationProjectsProjectIdSpendLimit.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdSpendLimit =
  os.postOrganizationProjectsProjectIdSpendLimit.handler(async ({ input }) => {})
export const deleteOrganizationProjectsProjectIdSpendLimit =
  os.deleteOrganizationProjectsProjectIdSpendLimit.handler(async ({ input }) => {})
export const getOrganizationProjectsProjectIdServiceTierSettings =
  os.getOrganizationProjectsProjectIdServiceTierSettings.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdServiceTierSettings =
  os.postOrganizationProjectsProjectIdServiceTierSettings.handler(async ({ input }) => {})
export const postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeys =
  os.postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeys.handler(
    async ({ input }) => {},
  )
