import { Hono } from 'hono'
import {
  getOrganizationAdminApiKeysHandler,
  postOrganizationAdminApiKeysHandler,
  getOrganizationAdminApiKeysKeyIdHandler,
  deleteOrganizationAdminApiKeysKeyIdHandler,
  getOrganizationAuditLogsHandler,
  getOrganizationCertificatesHandler,
  postOrganizationCertificatesHandler,
  postOrganizationCertificatesActivateHandler,
  postOrganizationCertificatesDeactivateHandler,
  getOrganizationCertificatesCertificateIdHandler,
  postOrganizationCertificatesCertificateIdHandler,
  deleteOrganizationCertificatesCertificateIdHandler,
  getOrganizationCostsHandler,
  getOrganizationDataRetentionHandler,
  postOrganizationDataRetentionHandler,
  getOrganizationGroupsHandler,
  postOrganizationGroupsHandler,
  getOrganizationGroupsGroupIdHandler,
  postOrganizationGroupsGroupIdHandler,
  deleteOrganizationGroupsGroupIdHandler,
  getOrganizationGroupsGroupIdRolesHandler,
  postOrganizationGroupsGroupIdRolesHandler,
  getOrganizationGroupsGroupIdRolesRoleIdHandler,
  deleteOrganizationGroupsGroupIdRolesRoleIdHandler,
  getOrganizationGroupsGroupIdUsersHandler,
  postOrganizationGroupsGroupIdUsersHandler,
  getOrganizationGroupsGroupIdUsersUserIdHandler,
  deleteOrganizationGroupsGroupIdUsersUserIdHandler,
  getOrganizationInvitesHandler,
  postOrganizationInvitesHandler,
  getOrganizationInvitesInviteIdHandler,
  deleteOrganizationInvitesInviteIdHandler,
  getOrganizationProjectsHandler,
  postOrganizationProjectsHandler,
  getOrganizationProjectsProjectIdHandler,
  postOrganizationProjectsProjectIdHandler,
  getOrganizationProjectsProjectIdApiKeysHandler,
  getOrganizationProjectsProjectIdApiKeysApiKeyIdHandler,
  postOrganizationProjectsProjectIdApiKeysApiKeyIdHandler,
  deleteOrganizationProjectsProjectIdApiKeysApiKeyIdHandler,
  postOrganizationProjectsProjectIdArchiveHandler,
  getOrganizationProjectsProjectIdCertificatesHandler,
  postOrganizationProjectsProjectIdCertificatesActivateHandler,
  postOrganizationProjectsProjectIdCertificatesDeactivateHandler,
  getOrganizationProjectsProjectIdDataRetentionHandler,
  postOrganizationProjectsProjectIdDataRetentionHandler,
  getOrganizationProjectsProjectIdGroupsHandler,
  postOrganizationProjectsProjectIdGroupsHandler,
  getOrganizationProjectsProjectIdGroupsGroupIdHandler,
  deleteOrganizationProjectsProjectIdGroupsGroupIdHandler,
  getOrganizationProjectsProjectIdHostedToolPermissionsHandler,
  postOrganizationProjectsProjectIdHostedToolPermissionsHandler,
  getOrganizationProjectsProjectIdModelPermissionsHandler,
  postOrganizationProjectsProjectIdModelPermissionsHandler,
  deleteOrganizationProjectsProjectIdModelPermissionsHandler,
  getOrganizationProjectsProjectIdRateLimitsHandler,
  postOrganizationProjectsProjectIdRateLimitsRateLimitIdHandler,
  getOrganizationProjectsProjectIdServiceAccountsHandler,
  postOrganizationProjectsProjectIdServiceAccountsHandler,
  getOrganizationProjectsProjectIdServiceAccountsServiceAccountIdHandler,
  postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdHandler,
  deleteOrganizationProjectsProjectIdServiceAccountsServiceAccountIdHandler,
  getOrganizationProjectsProjectIdSpendAlertsHandler,
  postOrganizationProjectsProjectIdSpendAlertsHandler,
  getOrganizationProjectsProjectIdSpendAlertsAlertIdHandler,
  postOrganizationProjectsProjectIdSpendAlertsAlertIdHandler,
  deleteOrganizationProjectsProjectIdSpendAlertsAlertIdHandler,
  getOrganizationProjectsProjectIdUsersHandler,
  postOrganizationProjectsProjectIdUsersHandler,
  getOrganizationProjectsProjectIdUsersUserIdHandler,
  postOrganizationProjectsProjectIdUsersUserIdHandler,
  deleteOrganizationProjectsProjectIdUsersUserIdHandler,
  getOrganizationRolesHandler,
  postOrganizationRolesHandler,
  getOrganizationRolesRoleIdHandler,
  postOrganizationRolesRoleIdHandler,
  deleteOrganizationRolesRoleIdHandler,
  getOrganizationSpendAlertsHandler,
  postOrganizationSpendAlertsHandler,
  getOrganizationSpendAlertsAlertIdHandler,
  postOrganizationSpendAlertsAlertIdHandler,
  deleteOrganizationSpendAlertsAlertIdHandler,
  getOrganizationUsageAudioSpeechesHandler,
  getOrganizationUsageAudioTranscriptionsHandler,
  getOrganizationUsageCodeInterpreterSessionsHandler,
  getOrganizationUsageCompletionsHandler,
  getOrganizationUsageEmbeddingsHandler,
  getOrganizationUsageFileSearchCallsHandler,
  getOrganizationUsageImagesHandler,
  getOrganizationUsageModerationsHandler,
  getOrganizationUsageVectorStoresHandler,
  getOrganizationUsageWebSearchCallsHandler,
  getOrganizationUsersHandler,
  getOrganizationUsersUserIdHandler,
  postOrganizationUsersUserIdHandler,
  deleteOrganizationUsersUserIdHandler,
  getOrganizationUsersUserIdRolesHandler,
  postOrganizationUsersUserIdRolesHandler,
  getOrganizationUsersUserIdRolesRoleIdHandler,
  deleteOrganizationUsersUserIdRolesRoleIdHandler,
  getOrganizationExternalKeysHandler,
  postOrganizationExternalKeysHandler,
  getOrganizationExternalKeysExternalKeyIdHandler,
  deleteOrganizationExternalKeysExternalKeyIdHandler,
  postOrganizationExternalKeysExternalKeyIdValidateHandler,
  getOrganizationWorkloadIdentityProvidersHandler,
  postOrganizationWorkloadIdentityProvidersHandler,
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdHandler,
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdHandler,
  deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdHandler,
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesHandler,
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesHandler,
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdHandler,
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdHandler,
  deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdHandler,
  getOrganizationUsageDecisionsHandler,
  getOrganizationExternalStorageHandler,
  postOrganizationExternalStorageHandler,
  getOrganizationExternalStorageExternalStorageIdHandler,
  deleteOrganizationExternalStorageExternalStorageIdHandler,
  postOrganizationExternalStorageExternalStorageIdValidateHandler,
  getOrganizationSpendLimitHandler,
  postOrganizationSpendLimitHandler,
  deleteOrganizationSpendLimitHandler,
  getOrganizationProjectsProjectIdSpendLimitHandler,
  postOrganizationProjectsProjectIdSpendLimitHandler,
  deleteOrganizationProjectsProjectIdSpendLimitHandler,
  getOrganizationProjectsProjectIdServiceTierSettingsHandler,
  postOrganizationProjectsProjectIdServiceTierSettingsHandler,
  postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeysHandler,
} from '../routes'

export const organizationHandler = new Hono()
  .get(
    '/organization/admin_api_keys',
    getOrganizationAdminApiKeysHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/admin_api_keys',
    postOrganizationAdminApiKeysHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/admin_api_keys/:key_id',
    getOrganizationAdminApiKeysKeyIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/admin_api_keys/:key_id',
    deleteOrganizationAdminApiKeysKeyIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/audit_logs',
    getOrganizationAuditLogsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/certificates',
    getOrganizationCertificatesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/certificates',
    postOrganizationCertificatesHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/certificates/activate',
    postOrganizationCertificatesActivateHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/certificates/deactivate',
    postOrganizationCertificatesDeactivateHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/certificates/:certificate_id',
    getOrganizationCertificatesCertificateIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/certificates/:certificate_id',
    postOrganizationCertificatesCertificateIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/certificates/:certificate_id',
    deleteOrganizationCertificatesCertificateIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/costs',
    getOrganizationCostsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/data_retention',
    getOrganizationDataRetentionHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/data_retention',
    postOrganizationDataRetentionHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/groups',
    getOrganizationGroupsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/groups',
    postOrganizationGroupsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/groups/:group_id',
    getOrganizationGroupsGroupIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/groups/:group_id',
    postOrganizationGroupsGroupIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/groups/:group_id',
    deleteOrganizationGroupsGroupIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/groups/:group_id/roles',
    getOrganizationGroupsGroupIdRolesHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/groups/:group_id/roles',
    postOrganizationGroupsGroupIdRolesHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/groups/:group_id/roles/:role_id',
    getOrganizationGroupsGroupIdRolesRoleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/groups/:group_id/roles/:role_id',
    deleteOrganizationGroupsGroupIdRolesRoleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/groups/:group_id/users',
    getOrganizationGroupsGroupIdUsersHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/groups/:group_id/users',
    postOrganizationGroupsGroupIdUsersHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/groups/:group_id/users/:user_id',
    getOrganizationGroupsGroupIdUsersUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/groups/:group_id/users/:user_id',
    deleteOrganizationGroupsGroupIdUsersUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/invites',
    getOrganizationInvitesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/invites',
    postOrganizationInvitesHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/invites/:invite_id',
    getOrganizationInvitesInviteIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/invites/:invite_id',
    deleteOrganizationInvitesInviteIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects',
    getOrganizationProjectsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects',
    postOrganizationProjectsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id',
    getOrganizationProjectsProjectIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id',
    postOrganizationProjectsProjectIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/api_keys',
    getOrganizationProjectsProjectIdApiKeysHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    getOrganizationProjectsProjectIdApiKeysApiKeyIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    postOrganizationProjectsProjectIdApiKeysApiKeyIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    deleteOrganizationProjectsProjectIdApiKeysApiKeyIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/archive',
    postOrganizationProjectsProjectIdArchiveHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/certificates',
    getOrganizationProjectsProjectIdCertificatesHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/certificates/activate',
    postOrganizationProjectsProjectIdCertificatesActivateHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/certificates/deactivate',
    postOrganizationProjectsProjectIdCertificatesDeactivateHandler(
      async (c, { param, json }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/organization/projects/:project_id/data_retention',
    getOrganizationProjectsProjectIdDataRetentionHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/data_retention',
    postOrganizationProjectsProjectIdDataRetentionHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/groups',
    getOrganizationProjectsProjectIdGroupsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/groups',
    postOrganizationProjectsProjectIdGroupsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/groups/:group_id',
    getOrganizationProjectsProjectIdGroupsGroupIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/projects/:project_id/groups/:group_id',
    deleteOrganizationProjectsProjectIdGroupsGroupIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/hosted_tool_permissions',
    getOrganizationProjectsProjectIdHostedToolPermissionsHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/hosted_tool_permissions',
    postOrganizationProjectsProjectIdHostedToolPermissionsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/model_permissions',
    getOrganizationProjectsProjectIdModelPermissionsHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/model_permissions',
    postOrganizationProjectsProjectIdModelPermissionsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/projects/:project_id/model_permissions',
    deleteOrganizationProjectsProjectIdModelPermissionsHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/rate_limits',
    getOrganizationProjectsProjectIdRateLimitsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/rate_limits/:rate_limit_id',
    postOrganizationProjectsProjectIdRateLimitsRateLimitIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/service_accounts',
    getOrganizationProjectsProjectIdServiceAccountsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/service_accounts',
    postOrganizationProjectsProjectIdServiceAccountsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    getOrganizationProjectsProjectIdServiceAccountsServiceAccountIdHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdHandler(
      async (c, { param, json }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    deleteOrganizationProjectsProjectIdServiceAccountsServiceAccountIdHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/organization/projects/:project_id/spend_alerts',
    getOrganizationProjectsProjectIdSpendAlertsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/spend_alerts',
    postOrganizationProjectsProjectIdSpendAlertsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    getOrganizationProjectsProjectIdSpendAlertsAlertIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    postOrganizationProjectsProjectIdSpendAlertsAlertIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    deleteOrganizationProjectsProjectIdSpendAlertsAlertIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/users',
    getOrganizationProjectsProjectIdUsersHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/users',
    postOrganizationProjectsProjectIdUsersHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/users/:user_id',
    getOrganizationProjectsProjectIdUsersUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/users/:user_id',
    postOrganizationProjectsProjectIdUsersUserIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/projects/:project_id/users/:user_id',
    deleteOrganizationProjectsProjectIdUsersUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/roles',
    getOrganizationRolesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/roles',
    postOrganizationRolesHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/roles/:role_id',
    getOrganizationRolesRoleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/roles/:role_id',
    postOrganizationRolesRoleIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/roles/:role_id',
    deleteOrganizationRolesRoleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/spend_alerts',
    getOrganizationSpendAlertsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/spend_alerts',
    postOrganizationSpendAlertsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/spend_alerts/:alert_id',
    getOrganizationSpendAlertsAlertIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/spend_alerts/:alert_id',
    postOrganizationSpendAlertsAlertIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/spend_alerts/:alert_id',
    deleteOrganizationSpendAlertsAlertIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/usage/audio_speeches',
    getOrganizationUsageAudioSpeechesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/usage/audio_transcriptions',
    getOrganizationUsageAudioTranscriptionsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/usage/code_interpreter_sessions',
    getOrganizationUsageCodeInterpreterSessionsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/usage/completions',
    getOrganizationUsageCompletionsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/usage/embeddings',
    getOrganizationUsageEmbeddingsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/usage/file_search_calls',
    getOrganizationUsageFileSearchCallsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/usage/images',
    getOrganizationUsageImagesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/usage/moderations',
    getOrganizationUsageModerationsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/usage/vector_stores',
    getOrganizationUsageVectorStoresHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/usage/web_search_calls',
    getOrganizationUsageWebSearchCallsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/users',
    getOrganizationUsersHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/users/:user_id',
    getOrganizationUsersUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/users/:user_id',
    postOrganizationUsersUserIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/users/:user_id',
    deleteOrganizationUsersUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/users/:user_id/roles',
    getOrganizationUsersUserIdRolesHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/users/:user_id/roles',
    postOrganizationUsersUserIdRolesHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/users/:user_id/roles/:role_id',
    getOrganizationUsersUserIdRolesRoleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/users/:user_id/roles/:role_id',
    deleteOrganizationUsersUserIdRolesRoleIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/external_keys',
    getOrganizationExternalKeysHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/external_keys',
    postOrganizationExternalKeysHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/external_keys/:external_key_id',
    getOrganizationExternalKeysExternalKeyIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/external_keys/:external_key_id',
    deleteOrganizationExternalKeysExternalKeyIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/external_keys/:external_key_id/validate',
    postOrganizationExternalKeysExternalKeyIdValidateHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/workload_identity_providers',
    getOrganizationWorkloadIdentityProvidersHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/workload_identity_providers',
    postOrganizationWorkloadIdentityProvidersHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdHandler(
      async (c, { param, json }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesHandler(
      async (c, { param, json }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdHandler(
      async (c, { param, json }) => { throw new Error('Not implemented') },
    ),
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/organization/usage/decisions',
    getOrganizationUsageDecisionsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/external_storage',
    getOrganizationExternalStorageHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/external_storage',
    postOrganizationExternalStorageHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/external_storage/:external_storage_id',
    getOrganizationExternalStorageExternalStorageIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/external_storage/:external_storage_id',
    deleteOrganizationExternalStorageExternalStorageIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/external_storage/:external_storage_id/validate',
    postOrganizationExternalStorageExternalStorageIdValidateHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/spend_limit',
    getOrganizationSpendLimitHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/spend_limit',
    postOrganizationSpendLimitHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/spend_limit',
    deleteOrganizationSpendLimitHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/spend_limit',
    getOrganizationProjectsProjectIdSpendLimitHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/spend_limit',
    postOrganizationProjectsProjectIdSpendLimitHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/organization/projects/:project_id/spend_limit',
    deleteOrganizationProjectsProjectIdSpendLimitHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/organization/projects/:project_id/service_tier_settings',
    getOrganizationProjectsProjectIdServiceTierSettingsHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/service_tier_settings',
    postOrganizationProjectsProjectIdServiceTierSettingsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id/api_keys',
    postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeysHandler(
      async (c, { param, json }) => { throw new Error('Not implemented') },
    ),
  )
