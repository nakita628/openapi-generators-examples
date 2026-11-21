import { Elysia } from 'elysia'
import {
  AdminApiKeySchema,
  AdminApiKeyCreateResponseSchema,
  ApiKeyListSchema,
  AssignedRoleDetailsSchema,
  AuditLogSchema,
  AuditLogActorSchema,
  AuditLogActorApiKeySchema,
  AuditLogActorServiceAccountSchema,
  AuditLogActorSessionSchema,
  AuditLogActorUserSchema,
  AuditLogEventTypeSchema,
  AwsExternalKeyParamsSchema,
  AwsExternalStorageProviderParamsSchema,
  AwsExternalStorageProviderResponseSchema,
  AzureExternalKeyParamsSchema,
  AzureExternalStorageProviderParamsSchema,
  AzureExternalStorageProviderResponseSchema,
  CertificateSchema,
  CostsResultSchema,
  CreateExternalStorageBodySchema,
  CreateGroupBodySchema,
  CreateGroupUserBodySchema,
  CreatePlatformWorkloadIdentityFederationRuleBodySchema,
  CreatePlatformWorkloadIdentityProviderBodySchema,
  CreateProjectServiceAccountApiKeyBodySchema,
  CreateSpendAlertBodySchema,
  DecisionsUsageApiSourceSchema,
  DecisionsUsageBucketSchema,
  DecisionsUsageErrorDetailsSchema,
  DecisionsUsageErrorResponseSchema,
  DecisionsUsagePermissionErrorResponseSchema,
  DecisionsUsageResultSchema,
  DefaultPermissionsSchema,
  DefaultPermissionsParamSchema,
  DeleteCertificateResponseSchema,
  DeletedRoleAssignmentResourceSchema,
  DiscoveryVerificationSchema,
  DiscoveryVerificationParamSchema,
  EmailNotificationChannelSchema,
  ErrorSchema,
  ErrorResponseSchema,
  ExternalKeyPurposeSchema,
  ExternalKeyResourceSchema,
  ExternalStorageDeletedResourceSchema,
  ExternalStorageListResourceSchema,
  ExternalStorageResponseSchema,
  ExternalStorageStatusSchema,
  GcpExternalKeyParamsSchema,
  GcpExternalStorageProviderParamsSchema,
  GcpExternalStorageProviderResponseSchema,
  GroupSchema,
  GroupDeletedResourceSchema,
  GroupListResourceSchema,
  GroupMemberUserSchema,
  GroupResourceWithSuccessSchema,
  GroupResponseSchema,
  GroupRoleAssignmentSchema,
  GroupUserSchema,
  GroupUserAssignmentSchema,
  GroupUserDeletedResourceSchema,
  HostedToolPermissionSchema,
  HostedToolPermissionUpdateSchema,
  InviteSchema,
  InviteDeleteResponseSchema,
  InviteListResponseSchema,
  InviteProjectGroupBodySchema,
  InviteRequestSchema,
  ListAuditLogsResponseSchema,
  ListCertificatesResponseSchema,
  ListExternalKeysResourceSchema,
  ListProjectCertificatesResponseSchema,
  MisalignmentErrorDetailsResourceSchema,
  ModifyCertificateRequestSchema,
  OciExternalKeyParamsSchema,
  OciExternalStorageProviderParamsSchema,
  OciExternalStorageProviderResponseSchema,
  OrganizationCertificateSchema,
  OrganizationCertificateActivationResponseSchema,
  OrganizationCertificateDeactivationResponseSchema,
  OrganizationDataRetentionSchema,
  OrganizationProjectCertificateSchema,
  OrganizationProjectCertificateActivationResponseSchema,
  OrganizationProjectCertificateDeactivationResponseSchema,
  OrganizationSpendAlertSchema,
  OrganizationSpendAlertDeletedResourceSchema,
  OrganizationSpendAlertListResourceSchema,
  OrganizationSpendLimitDeletedResourceSchema,
  OrganizationSpendLimitResourceSchema,
  PermissionErrorResponseSchema,
  PlatformFederationRuleSchema,
  PlatformFederationRuleDeletedResourceSchema,
  PlatformFederationRuleListResourceSchema,
  PlatformProviderSchema,
  PlatformProviderDeletedResourceSchema,
  PlatformProviderListResourceSchema,
  ProjectSchema,
  ProjectApiKeySchema,
  ProjectApiKeyDeleteResponseSchema,
  ProjectApiKeyListResponseSchema,
  ProjectApiKeyOwnerServiceAccountSchema,
  ProjectApiKeyOwnerUserSchema,
  ProjectCreateRequestSchema,
  ProjectDataRetentionSchema,
  ProjectDefaultServiceTierSchema,
  ProjectGroupSchema,
  ProjectGroupDeletedResourceSchema,
  ProjectGroupListResourceSchema,
  ProjectHostedToolPermissionsSchema,
  ProjectHostedToolPermissionsUpdateRequestSchema,
  ProjectListResponseSchema,
  ProjectModelPermissionsSchema,
  ProjectModelPermissionsDeleteResponseSchema,
  ProjectModelPermissionsUpdateRequestSchema,
  ProjectOptionalServiceTierSchema,
  ProjectRateLimitSchema,
  ProjectRateLimitListResponseSchema,
  ProjectRateLimitUpdateRequestSchema,
  ProjectServiceAccountSchema,
  ProjectServiceAccountApiKeySchema,
  ProjectServiceAccountCreateRequestSchema,
  ProjectServiceAccountCreateResponseSchema,
  ProjectServiceAccountDeleteResponseSchema,
  ProjectServiceAccountListResponseSchema,
  ProjectServiceTierSettingsResourceSchema,
  ProjectSpendAlertSchema,
  ProjectSpendAlertDeletedResourceSchema,
  ProjectSpendAlertListResourceSchema,
  ProjectSpendLimitDeletedResourceSchema,
  ProjectSpendLimitResourceSchema,
  ProjectUpdateRequestSchema,
  ProjectUserSchema,
  ProjectUserCreateRequestSchema,
  ProjectUserDeleteResponseSchema,
  ProjectUserListResponseSchema,
  ProjectUserUpdateRequestSchema,
  PublicAssignOrganizationGroupRoleBodySchema,
  PublicCreateOrganizationRoleBodySchema,
  PublicDecisionsUsageResponseResourceSchema,
  PublicProjectResidencySchema,
  PublicRoleListResourceSchema,
  PublicUpdateOrganizationRoleBodySchema,
  RestrictedPermissionsSchema,
  RestrictedPermissionsParamSchema,
  RoleSchema,
  RoleDeletedResourceSchema,
  RoleListResourceSchema,
  ServiceAccountApiKeyBodySchema,
  SpendAlertNotificationChannelSchema,
  SpendLimitCurrencySchema,
  SpendLimitEmailNotificationChannelParamsSchema,
  SpendLimitEnforcementSchema,
  SpendLimitEnforcementStatusSchema,
  SpendLimitIntervalSchema,
  ToggleCertificatesRequestSchema,
  TransformationSchema,
  TransformationParamSchema,
  UpdateGroupBodySchema,
  UpdateOrganizationDataRetentionBodySchema,
  UpdateOrganizationSpendLimitBodySchema,
  UpdatePlatformWorkloadIdentityFederationRuleBodySchema,
  UpdatePlatformWorkloadIdentityProviderBodySchema,
  UpdateProjectApiKeyBodySchema,
  UpdateProjectDataRetentionBodySchema,
  UpdateProjectServiceAccountBodySchema,
  UpdateProjectServiceTierSettingsBodySchema,
  UpdateProjectSpendLimitBodySchema,
  UploadCertificateRequestSchema,
  UploadedJwksVerificationSchema,
  UploadedJwksVerificationParamSchema,
  UsageAudioSpeechesResultSchema,
  UsageAudioTranscriptionsResultSchema,
  UsageCodeInterpreterSessionsResultSchema,
  UsageCompletionsResultSchema,
  UsageEmbeddingsResultSchema,
  UsageFileSearchCallsResultSchema,
  UsageImagesResultSchema,
  UsageModerationsResultSchema,
  UsageResponseSchema,
  UsageTimeBucketSchema,
  UsageVectorStoresResultSchema,
  UsageWebSearchCallsResultSchema,
  UserSchema,
  UserDeleteResponseSchema,
  UserListResourceSchema,
  UserListResponseSchema,
  UserRoleAssignmentSchema,
  UserRoleUpdateRequestSchema,
  V1OrganizationExternalKeysPostRequestSchema,
  ValidateExternalKeyResourceSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
  ProviderSchema,
} from '../../components/schemas'
import { OrganizationModel } from './model'

export const organization = new Elysia()
  .model({
    AdminApiKey: AdminApiKeySchema,
    AdminApiKeyCreateResponse: AdminApiKeyCreateResponseSchema,
    ApiKeyList: ApiKeyListSchema,
    AssignedRoleDetails: AssignedRoleDetailsSchema,
    AuditLog: AuditLogSchema,
    AuditLogActor: AuditLogActorSchema,
    AuditLogActorApiKey: AuditLogActorApiKeySchema,
    AuditLogActorServiceAccount: AuditLogActorServiceAccountSchema,
    AuditLogActorSession: AuditLogActorSessionSchema,
    AuditLogActorUser: AuditLogActorUserSchema,
    AuditLogEventType: AuditLogEventTypeSchema,
    AwsExternalKeyParams: AwsExternalKeyParamsSchema,
    AwsExternalStorageProviderParams: AwsExternalStorageProviderParamsSchema,
    AwsExternalStorageProviderResponse: AwsExternalStorageProviderResponseSchema,
    AzureExternalKeyParams: AzureExternalKeyParamsSchema,
    AzureExternalStorageProviderParams: AzureExternalStorageProviderParamsSchema,
    AzureExternalStorageProviderResponse: AzureExternalStorageProviderResponseSchema,
    Certificate: CertificateSchema,
    CostsResult: CostsResultSchema,
    CreateExternalStorageBody: CreateExternalStorageBodySchema,
    CreateGroupBody: CreateGroupBodySchema,
    CreateGroupUserBody: CreateGroupUserBodySchema,
    CreatePlatformWorkloadIdentityFederationRuleBody:
      CreatePlatformWorkloadIdentityFederationRuleBodySchema,
    CreatePlatformWorkloadIdentityProviderBody: CreatePlatformWorkloadIdentityProviderBodySchema,
    CreateProjectServiceAccountApiKeyBody: CreateProjectServiceAccountApiKeyBodySchema,
    CreateSpendAlertBody: CreateSpendAlertBodySchema,
    DecisionsUsageApiSource: DecisionsUsageApiSourceSchema,
    DecisionsUsageBucket: DecisionsUsageBucketSchema,
    DecisionsUsageErrorDetails: DecisionsUsageErrorDetailsSchema,
    DecisionsUsageErrorResponse: DecisionsUsageErrorResponseSchema,
    DecisionsUsagePermissionErrorResponse: DecisionsUsagePermissionErrorResponseSchema,
    DecisionsUsageResult: DecisionsUsageResultSchema,
    DefaultPermissions: DefaultPermissionsSchema,
    DefaultPermissionsParam: DefaultPermissionsParamSchema,
    DeleteCertificateResponse: DeleteCertificateResponseSchema,
    DeletedRoleAssignmentResource: DeletedRoleAssignmentResourceSchema,
    DiscoveryVerification: DiscoveryVerificationSchema,
    DiscoveryVerificationParam: DiscoveryVerificationParamSchema,
    EmailNotificationChannel: EmailNotificationChannelSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    ExternalKeyPurpose: ExternalKeyPurposeSchema,
    ExternalKeyResource: ExternalKeyResourceSchema,
    ExternalStorageDeletedResource: ExternalStorageDeletedResourceSchema,
    ExternalStorageListResource: ExternalStorageListResourceSchema,
    ExternalStorageResponse: ExternalStorageResponseSchema,
    ExternalStorageStatus: ExternalStorageStatusSchema,
    GcpExternalKeyParams: GcpExternalKeyParamsSchema,
    GcpExternalStorageProviderParams: GcpExternalStorageProviderParamsSchema,
    GcpExternalStorageProviderResponse: GcpExternalStorageProviderResponseSchema,
    Group: GroupSchema,
    GroupDeletedResource: GroupDeletedResourceSchema,
    GroupListResource: GroupListResourceSchema,
    GroupMemberUser: GroupMemberUserSchema,
    GroupResourceWithSuccess: GroupResourceWithSuccessSchema,
    GroupResponse: GroupResponseSchema,
    GroupRoleAssignment: GroupRoleAssignmentSchema,
    GroupUser: GroupUserSchema,
    GroupUserAssignment: GroupUserAssignmentSchema,
    GroupUserDeletedResource: GroupUserDeletedResourceSchema,
    HostedToolPermission: HostedToolPermissionSchema,
    HostedToolPermissionUpdate: HostedToolPermissionUpdateSchema,
    Invite: InviteSchema,
    InviteDeleteResponse: InviteDeleteResponseSchema,
    InviteListResponse: InviteListResponseSchema,
    InviteProjectGroupBody: InviteProjectGroupBodySchema,
    InviteRequest: InviteRequestSchema,
    ListAuditLogsResponse: ListAuditLogsResponseSchema,
    ListCertificatesResponse: ListCertificatesResponseSchema,
    ListExternalKeysResource: ListExternalKeysResourceSchema,
    ListProjectCertificatesResponse: ListProjectCertificatesResponseSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    ModifyCertificateRequest: ModifyCertificateRequestSchema,
    OciExternalKeyParams: OciExternalKeyParamsSchema,
    OciExternalStorageProviderParams: OciExternalStorageProviderParamsSchema,
    OciExternalStorageProviderResponse: OciExternalStorageProviderResponseSchema,
    OrganizationCertificate: OrganizationCertificateSchema,
    OrganizationCertificateActivationResponse: OrganizationCertificateActivationResponseSchema,
    OrganizationCertificateDeactivationResponse: OrganizationCertificateDeactivationResponseSchema,
    OrganizationDataRetention: OrganizationDataRetentionSchema,
    OrganizationProjectCertificate: OrganizationProjectCertificateSchema,
    OrganizationProjectCertificateActivationResponse:
      OrganizationProjectCertificateActivationResponseSchema,
    OrganizationProjectCertificateDeactivationResponse:
      OrganizationProjectCertificateDeactivationResponseSchema,
    OrganizationSpendAlert: OrganizationSpendAlertSchema,
    OrganizationSpendAlertDeletedResource: OrganizationSpendAlertDeletedResourceSchema,
    OrganizationSpendAlertListResource: OrganizationSpendAlertListResourceSchema,
    OrganizationSpendLimitDeletedResource: OrganizationSpendLimitDeletedResourceSchema,
    OrganizationSpendLimitResource: OrganizationSpendLimitResourceSchema,
    PermissionErrorResponse: PermissionErrorResponseSchema,
    PlatformFederationRule: PlatformFederationRuleSchema,
    PlatformFederationRuleDeletedResource: PlatformFederationRuleDeletedResourceSchema,
    PlatformFederationRuleListResource: PlatformFederationRuleListResourceSchema,
    PlatformProvider: PlatformProviderSchema,
    PlatformProviderDeletedResource: PlatformProviderDeletedResourceSchema,
    PlatformProviderListResource: PlatformProviderListResourceSchema,
    Project: ProjectSchema,
    ProjectApiKey: ProjectApiKeySchema,
    ProjectApiKeyDeleteResponse: ProjectApiKeyDeleteResponseSchema,
    ProjectApiKeyListResponse: ProjectApiKeyListResponseSchema,
    ProjectApiKeyOwnerServiceAccount: ProjectApiKeyOwnerServiceAccountSchema,
    ProjectApiKeyOwnerUser: ProjectApiKeyOwnerUserSchema,
    ProjectCreateRequest: ProjectCreateRequestSchema,
    ProjectDataRetention: ProjectDataRetentionSchema,
    ProjectDefaultServiceTier: ProjectDefaultServiceTierSchema,
    ProjectGroup: ProjectGroupSchema,
    ProjectGroupDeletedResource: ProjectGroupDeletedResourceSchema,
    ProjectGroupListResource: ProjectGroupListResourceSchema,
    ProjectHostedToolPermissions: ProjectHostedToolPermissionsSchema,
    ProjectHostedToolPermissionsUpdateRequest: ProjectHostedToolPermissionsUpdateRequestSchema,
    ProjectListResponse: ProjectListResponseSchema,
    ProjectModelPermissions: ProjectModelPermissionsSchema,
    ProjectModelPermissionsDeleteResponse: ProjectModelPermissionsDeleteResponseSchema,
    ProjectModelPermissionsUpdateRequest: ProjectModelPermissionsUpdateRequestSchema,
    ProjectOptionalServiceTier: ProjectOptionalServiceTierSchema,
    ProjectRateLimit: ProjectRateLimitSchema,
    ProjectRateLimitListResponse: ProjectRateLimitListResponseSchema,
    ProjectRateLimitUpdateRequest: ProjectRateLimitUpdateRequestSchema,
    ProjectServiceAccount: ProjectServiceAccountSchema,
    ProjectServiceAccountApiKey: ProjectServiceAccountApiKeySchema,
    ProjectServiceAccountCreateRequest: ProjectServiceAccountCreateRequestSchema,
    ProjectServiceAccountCreateResponse: ProjectServiceAccountCreateResponseSchema,
    ProjectServiceAccountDeleteResponse: ProjectServiceAccountDeleteResponseSchema,
    ProjectServiceAccountListResponse: ProjectServiceAccountListResponseSchema,
    ProjectServiceTierSettingsResource: ProjectServiceTierSettingsResourceSchema,
    ProjectSpendAlert: ProjectSpendAlertSchema,
    ProjectSpendAlertDeletedResource: ProjectSpendAlertDeletedResourceSchema,
    ProjectSpendAlertListResource: ProjectSpendAlertListResourceSchema,
    ProjectSpendLimitDeletedResource: ProjectSpendLimitDeletedResourceSchema,
    ProjectSpendLimitResource: ProjectSpendLimitResourceSchema,
    ProjectUpdateRequest: ProjectUpdateRequestSchema,
    ProjectUser: ProjectUserSchema,
    ProjectUserCreateRequest: ProjectUserCreateRequestSchema,
    ProjectUserDeleteResponse: ProjectUserDeleteResponseSchema,
    ProjectUserListResponse: ProjectUserListResponseSchema,
    ProjectUserUpdateRequest: ProjectUserUpdateRequestSchema,
    PublicAssignOrganizationGroupRoleBody: PublicAssignOrganizationGroupRoleBodySchema,
    PublicCreateOrganizationRoleBody: PublicCreateOrganizationRoleBodySchema,
    PublicDecisionsUsageResponseResource: PublicDecisionsUsageResponseResourceSchema,
    PublicProjectResidency: PublicProjectResidencySchema,
    PublicRoleListResource: PublicRoleListResourceSchema,
    PublicUpdateOrganizationRoleBody: PublicUpdateOrganizationRoleBodySchema,
    RestrictedPermissions: RestrictedPermissionsSchema,
    RestrictedPermissionsParam: RestrictedPermissionsParamSchema,
    Role: RoleSchema,
    RoleDeletedResource: RoleDeletedResourceSchema,
    RoleListResource: RoleListResourceSchema,
    ServiceAccountApiKeyBody: ServiceAccountApiKeyBodySchema,
    SpendAlertNotificationChannel: SpendAlertNotificationChannelSchema,
    SpendLimitCurrency: SpendLimitCurrencySchema,
    SpendLimitEmailNotificationChannelParams: SpendLimitEmailNotificationChannelParamsSchema,
    SpendLimitEnforcement: SpendLimitEnforcementSchema,
    SpendLimitEnforcementStatus: SpendLimitEnforcementStatusSchema,
    SpendLimitInterval: SpendLimitIntervalSchema,
    ToggleCertificatesRequest: ToggleCertificatesRequestSchema,
    Transformation: TransformationSchema,
    TransformationParam: TransformationParamSchema,
    UpdateGroupBody: UpdateGroupBodySchema,
    UpdateOrganizationDataRetentionBody: UpdateOrganizationDataRetentionBodySchema,
    UpdateOrganizationSpendLimitBody: UpdateOrganizationSpendLimitBodySchema,
    UpdatePlatformWorkloadIdentityFederationRuleBody:
      UpdatePlatformWorkloadIdentityFederationRuleBodySchema,
    UpdatePlatformWorkloadIdentityProviderBody: UpdatePlatformWorkloadIdentityProviderBodySchema,
    UpdateProjectApiKeyBody: UpdateProjectApiKeyBodySchema,
    UpdateProjectDataRetentionBody: UpdateProjectDataRetentionBodySchema,
    UpdateProjectServiceAccountBody: UpdateProjectServiceAccountBodySchema,
    UpdateProjectServiceTierSettingsBody: UpdateProjectServiceTierSettingsBodySchema,
    UpdateProjectSpendLimitBody: UpdateProjectSpendLimitBodySchema,
    UploadCertificateRequest: UploadCertificateRequestSchema,
    UploadedJwksVerification: UploadedJwksVerificationSchema,
    UploadedJwksVerificationParam: UploadedJwksVerificationParamSchema,
    UsageAudioSpeechesResult: UsageAudioSpeechesResultSchema,
    UsageAudioTranscriptionsResult: UsageAudioTranscriptionsResultSchema,
    UsageCodeInterpreterSessionsResult: UsageCodeInterpreterSessionsResultSchema,
    UsageCompletionsResult: UsageCompletionsResultSchema,
    UsageEmbeddingsResult: UsageEmbeddingsResultSchema,
    UsageFileSearchCallsResult: UsageFileSearchCallsResultSchema,
    UsageImagesResult: UsageImagesResultSchema,
    UsageModerationsResult: UsageModerationsResultSchema,
    UsageResponse: UsageResponseSchema,
    UsageTimeBucket: UsageTimeBucketSchema,
    UsageVectorStoresResult: UsageVectorStoresResultSchema,
    UsageWebSearchCallsResult: UsageWebSearchCallsResultSchema,
    User: UserSchema,
    UserDeleteResponse: UserDeleteResponseSchema,
    UserListResource: UserListResourceSchema,
    UserListResponse: UserListResponseSchema,
    UserRoleAssignment: UserRoleAssignmentSchema,
    UserRoleUpdateRequest: UserRoleUpdateRequestSchema,
    V1OrganizationExternalKeysPostRequest: V1OrganizationExternalKeysPostRequestSchema,
    ValidateExternalKeyResource: ValidateExternalKeyResourceSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
    Provider: ProviderSchema,
  })
  .get('/organization/admin_api_keys', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.adminApiKeysListQuery,
    response: { 200: 'ApiKeyList', 400: 'ErrorResponse', 403: 'PermissionErrorResponse' },
    detail: {
      tags: [],
      summary: 'List all organization and project API keys.',
      description: 'List organization API keys',
      operationId: 'admin-api-keys-list',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/admin_api_keys', ({ body }) => { throw new Error('Not implemented') }, {
    body: OrganizationModel.adminApiKeysCreateBody,
    response: {
      200: 'AdminApiKeyCreateResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Create admin API key',
      description: 'Create an organization admin API key',
      operationId: 'admin-api-keys-create',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/admin_api_keys/:key_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.adminApiKeysGetParams,
    response: { 200: 'AdminApiKey', 403: 'PermissionErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'Retrieve admin API key',
      description: 'Retrieve a single organization API key',
      operationId: 'admin-api-keys-get',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/admin_api_keys/:key_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.adminApiKeysDeleteParams,
    response: {
      200: OrganizationModel.adminApiKeysDeleteResponse200,
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Delete admin API key',
      description: 'Delete an organization admin API key',
      operationId: 'admin-api-keys-delete',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/audit_logs', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.listAuditLogsQuery,
    response: {
      200: 'ListAuditLogsResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Audit Logs'],
      summary: 'List audit logs',
      description: 'List user actions and configuration changes within this organization.',
      operationId: 'list-audit-logs',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/certificates', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.listOrganizationCertificatesQuery,
    response: {
      200: 'ListCertificatesResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Certificates'],
      summary: 'List organization certificates',
      description: 'List uploaded certificates for this organization.',
      operationId: 'listOrganizationCertificates',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/certificates', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'UploadCertificateRequest',
    response: {
      200: 'Certificate',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Certificates'],
      summary: 'Upload certificate',
      description:
        'Upload a certificate to the organization. This does **not** automatically activate the certificate.\n\nOrganizations can upload up to 50 certificates.\n',
      operationId: 'uploadCertificate',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/certificates/activate', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'ToggleCertificatesRequest',
    response: {
      200: 'OrganizationCertificateActivationResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Certificates'],
      summary: 'Activate certificates for organization',
      description:
        'Activate certificates at the organization level.\n\nYou can atomically and idempotently activate up to 10 certificates at a time.\n',
      operationId: 'activateOrganizationCertificates',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/certificates/deactivate', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'ToggleCertificatesRequest',
    response: {
      200: 'OrganizationCertificateDeactivationResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Certificates'],
      summary: 'Deactivate certificates for organization',
      description:
        'Deactivate certificates at the organization level.\n\nYou can atomically and idempotently deactivate up to 10 certificates at a time.\n',
      operationId: 'deactivateOrganizationCertificates',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/certificates/:certificate_id', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.getCertificateParams,
    query: OrganizationModel.getCertificateQuery,
    response: {
      200: 'Certificate',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Certificates'],
      summary: 'Get certificate',
      description:
        'Get a certificate that has been uploaded to the organization.\n\nYou can get a certificate regardless of whether it is active or not.\n',
      operationId: 'getCertificate',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/certificates/:certificate_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.modifyCertificateParams,
    body: 'ModifyCertificateRequest',
    response: {
      200: 'Certificate',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Certificates'],
      summary: 'Modify certificate',
      description: 'Modify a certificate. Note that only the name can be modified.\n',
      operationId: 'modifyCertificate',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/certificates/:certificate_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.deleteCertificateParams,
    response: {
      200: 'DeleteCertificateResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Certificates'],
      summary: 'Delete certificate',
      description:
        'Delete a certificate from the organization.\n\nThe certificate must be inactive for the organization and all projects.\n',
      operationId: 'deleteCertificate',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/costs', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.usageCostsQuery,
    response: {
      200: 'UsageResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Usage'],
      summary: 'Costs',
      description: 'Get costs details for the organization.',
      operationId: 'usage-costs',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/data_retention', () => { throw new Error('Not implemented') }, {
    response: {
      200: 'OrganizationDataRetention',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Data retention'],
      summary: 'Retrieve organization data retention',
      description: 'Retrieves organization data retention controls.',
      operationId: 'retrieve-organization-data-retention',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/data_retention', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'UpdateOrganizationDataRetentionBody',
    response: {
      200: 'OrganizationDataRetention',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Data retention'],
      summary: 'Update organization data retention',
      description: 'Updates organization data retention controls.',
      operationId: 'update-organization-data-retention',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/groups', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.listGroupsQuery,
    response: {
      200: 'GroupListResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Groups'],
      summary: 'List groups',
      description: 'Lists all groups in the organization.',
      operationId: 'list-groups',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/groups', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateGroupBody',
    response: {
      200: 'GroupResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      422: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Groups'],
      summary: 'Create group',
      description: 'Creates a new group in the organization.',
      operationId: 'create-group',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/groups/:group_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveGroupParams,
    response: {
      200: 'GroupResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Groups'],
      summary: 'Retrieve group',
      description: 'Retrieves a group.',
      operationId: 'retrieve-group',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/groups/:group_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.updateGroupParams,
    body: 'UpdateGroupBody',
    response: {
      200: 'GroupResourceWithSuccess',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Groups'],
      summary: 'Update group',
      description: "Updates a group's information.",
      operationId: 'update-group',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/groups/:group_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.deleteGroupParams,
    response: {
      200: 'GroupDeletedResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Groups'],
      summary: 'Delete group',
      description: 'Deletes a group from the organization.',
      operationId: 'delete-group',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/groups/:group_id/roles', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.listGroupRoleAssignmentsParams,
    query: OrganizationModel.listGroupRoleAssignmentsQuery,
    response: {
      200: 'RoleListResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Group organization role assignments'],
      summary: 'List group organization role assignments',
      description: 'Lists the organization roles assigned to a group within the organization.',
      operationId: 'list-group-role-assignments',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/groups/:group_id/roles', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.assignGroupRoleParams,
    body: 'PublicAssignOrganizationGroupRoleBody',
    response: {
      200: 'GroupRoleAssignment',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Group organization role assignments'],
      summary: 'Assign organization role to group',
      description: 'Assigns an organization role to a group within the organization.',
      operationId: 'assign-group-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/groups/:group_id/roles/:role_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveGroupRoleParams,
    response: {
      200: 'AssignedRoleDetails',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Group organization role assignments'],
      summary: 'Retrieve group organization role',
      description: 'Retrieves an organization role assigned to a group.',
      operationId: 'retrieve-group-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/groups/:group_id/roles/:role_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.unassignGroupRoleParams,
    response: {
      200: 'DeletedRoleAssignmentResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Group organization role assignments'],
      summary: 'Unassign organization role from group',
      description: 'Unassigns an organization role from a group within the organization.',
      operationId: 'unassign-group-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/groups/:group_id/users', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.listGroupUsersParams,
    query: OrganizationModel.listGroupUsersQuery,
    response: {
      200: 'UserListResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      502: 'ErrorResponse',
    },
    detail: {
      tags: ['Group users'],
      summary: 'List group users',
      description: 'Lists the users assigned to a group.',
      operationId: 'list-group-users',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/groups/:group_id/users', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.addGroupUserParams,
    body: 'CreateGroupUserBody',
    response: {
      200: 'GroupUserAssignment',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Group users'],
      summary: 'Add group user',
      description: 'Adds a user to a group.',
      operationId: 'add-group-user',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/groups/:group_id/users/:user_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveGroupUserParams,
    response: {
      200: 'GroupMemberUser',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Group users'],
      summary: 'Retrieve group user',
      description: 'Retrieves a user in a group.',
      operationId: 'retrieve-group-user',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/groups/:group_id/users/:user_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.removeGroupUserParams,
    response: {
      200: 'GroupUserDeletedResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Group users'],
      summary: 'Remove group user',
      description: 'Removes a user from a group.',
      operationId: 'remove-group-user',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/invites', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.listInvitesQuery,
    response: {
      200: 'InviteListResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Invites'],
      summary: 'List invites',
      description: 'Returns a list of invites in the organization.',
      operationId: 'list-invites',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/invites', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'InviteRequest',
    response: {
      200: 'Invite',
      201: 'Invite',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Invites'],
      summary: 'Create invite',
      description:
        'Create an invite for a user to the organization. The invite must be accepted by the user before they have access to the organization.',
      operationId: 'inviteUser',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/invites/:invite_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveInviteParams,
    response: {
      200: 'Invite',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Invites'],
      summary: 'Retrieve invite',
      description: 'Retrieves an invite.',
      operationId: 'retrieve-invite',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/invites/:invite_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.deleteInviteParams,
    response: {
      200: 'InviteDeleteResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Invites'],
      summary: 'Delete invite',
      description:
        'Delete an invite. If the invite has already been accepted, it cannot be deleted.',
      operationId: 'delete-invite',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.listProjectsQuery,
    response: {
      200: 'ProjectListResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'List projects',
      description: 'Returns a list of projects.',
      operationId: 'list-projects',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'ProjectCreateRequest',
    response: {
      200: 'Project',
      201: 'Project',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Create project',
      description:
        'Create a new project in the organization. Projects can be created and archived, but cannot be deleted.',
      operationId: 'create-project',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveProjectParams,
    response: {
      200: 'Project',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Retrieve project',
      description: 'Retrieves a project.',
      operationId: 'retrieve-project',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.modifyProjectParams,
    body: 'ProjectUpdateRequest',
    response: {
      200: 'Project',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Modify project',
      description: 'Modifies a project in the organization.',
      operationId: 'modify-project',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/api_keys', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.listProjectApiKeysParams,
    query: OrganizationModel.listProjectApiKeysQuery,
    response: {
      200: 'ProjectApiKeyListResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'List project API keys',
      description: 'Returns a list of API keys in the project.',
      operationId: 'list-project-api-keys',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/api_keys/:api_key_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveProjectApiKeyParams,
    response: {
      200: 'ProjectApiKey',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Retrieve project API key',
      description: 'Retrieves an API key in the project.',
      operationId: 'retrieve-project-api-key',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/api_keys/:api_key_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.updateProjectApiKeyParams,
    body: 'UpdateProjectApiKeyBody',
    response: {
      200: 'ProjectApiKey',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Update project API key',
      description:
        'Updates the scopes and/or expiration of an existing API key in the project, including a\nservice-account-owned key. Requires permission to write project API keys.\n\nProvide at least one of `scopes` or `expires_in_seconds`. Omitted fields stay\nunchanged; neither field accepts `null`. Both changes are saved together.\n\n`scopes` replaces the key\'s scope restrictions using the same scope identifiers\nas the dashboard. An empty array means All permissions, subject to the owner\'s\neffective access; it does not mean no access. Use `["api.all.read"]` for read-only\naccess or specific scopes such as `["api.files.read"]` for restricted access.\nThis does not change user or service-account roles or grant admin permissions.\nScope changes follow the same authentication-cache propagation as dashboard edits.\n\nProvide `expires_in_seconds` to set the expiration relative to this request.\nThe value must satisfy the organization\'s and project\'s expiry policies.\nExpired keys cannot be updated. Retrying resets the expiration relative to\nthe new request. The response contains only the redacted key, not its secret.\n',
      operationId: 'update-project-api-key',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/projects/:project_id/api_keys/:api_key_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.deleteProjectApiKeyParams,
    response: {
      200: 'ProjectApiKeyDeleteResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Delete project API key',
      description:
        'Deletes an API key from the project, including keys owned by service accounts.\n\nRequires permission to write project API keys. Deleting a service-account key\ndoes not delete the service account or its other keys.\n\nReturns confirmation of the key deletion.\n',
      operationId: 'delete-project-api-key',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/archive', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.archiveProjectParams,
    response: {
      200: 'Project',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Archive project',
      description:
        'Archives a project in the organization. Archived projects cannot be used or updated.',
      operationId: 'archive-project',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/certificates', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.listProjectCertificatesParams,
    query: OrganizationModel.listProjectCertificatesQuery,
    response: {
      200: 'ListProjectCertificatesResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Certificates'],
      summary: 'List project certificates',
      description: 'List certificates for this project.',
      operationId: 'listProjectCertificates',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/certificates/activate', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.activateProjectCertificatesParams,
    body: 'ToggleCertificatesRequest',
    response: {
      200: 'OrganizationProjectCertificateActivationResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Certificates'],
      summary: 'Activate certificates for project',
      description:
        'Activate certificates at the project level.\n\nYou can atomically and idempotently activate up to 10 certificates at a time.\n',
      operationId: 'activateProjectCertificates',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/certificates/deactivate', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.deactivateProjectCertificatesParams,
    body: 'ToggleCertificatesRequest',
    response: {
      200: 'OrganizationProjectCertificateDeactivationResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Certificates'],
      summary: 'Deactivate certificates for project',
      description:
        'Deactivate certificates at the project level. You can atomically and \nidempotently deactivate up to 10 certificates at a time.\n',
      operationId: 'deactivateProjectCertificates',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/data_retention', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveProjectDataRetentionParams,
    response: {
      200: 'ProjectDataRetention',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Data retention'],
      summary: 'Retrieve project data retention',
      description: 'Retrieves project data retention controls.',
      operationId: 'retrieve-project-data-retention',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/data_retention', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.updateProjectDataRetentionParams,
    body: 'UpdateProjectDataRetentionBody',
    response: {
      200: 'ProjectDataRetention',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Data retention'],
      summary: 'Update project data retention',
      description: 'Updates project data retention controls.',
      operationId: 'update-project-data-retention',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/groups', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.listProjectGroupsParams,
    query: OrganizationModel.listProjectGroupsQuery,
    response: {
      200: 'ProjectGroupListResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Project groups'],
      summary: 'List project groups',
      description: 'Lists the groups that have access to a project.',
      operationId: 'list-project-groups',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/groups', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.addProjectGroupParams,
    body: 'InviteProjectGroupBody',
    response: {
      200: 'ProjectGroup',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Project groups'],
      summary: 'Add project group',
      description: 'Grants a group access to a project.',
      operationId: 'add-project-group',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/groups/:group_id', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveProjectGroupParams,
    query: OrganizationModel.retrieveProjectGroupQuery,
    response: {
      200: 'ProjectGroup',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Project groups'],
      summary: 'Retrieve project group',
      description: "Retrieves a project's group.",
      operationId: 'retrieve-project-group',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/projects/:project_id/groups/:group_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.removeProjectGroupParams,
    response: {
      200: 'ProjectGroupDeletedResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Project groups'],
      summary: 'Remove project group',
      description: "Revokes a group's access to a project.",
      operationId: 'remove-project-group',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/hosted_tool_permissions', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveProjectHostedToolPermissionsParams,
    response: {
      200: 'ProjectHostedToolPermissions',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Hosted tools'],
      summary: 'Retrieve project hosted tool permissions',
      description: 'Returns hosted tool permissions for a project.',
      operationId: 'retrieve-project-hosted-tool-permissions',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/hosted_tool_permissions', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.updateProjectHostedToolPermissionsParams,
    body: 'ProjectHostedToolPermissionsUpdateRequest',
    response: {
      200: 'ProjectHostedToolPermissions',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Hosted tools'],
      summary: 'Modify project hosted tool permissions',
      description: 'Updates hosted tool permissions for a project.',
      operationId: 'update-project-hosted-tool-permissions',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/model_permissions', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveProjectModelPermissionsParams,
    response: {
      200: 'ProjectModelPermissions',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Retrieve project model permissions',
      description: 'Returns model permissions for a project.',
      operationId: 'retrieve-project-model-permissions',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/model_permissions', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.updateProjectModelPermissionsParams,
    body: 'ProjectModelPermissionsUpdateRequest',
    response: {
      200: 'ProjectModelPermissions',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Modify project model permissions',
      description: 'Updates model permissions for a project.',
      operationId: 'update-project-model-permissions',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/projects/:project_id/model_permissions', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.deleteProjectModelPermissionsParams,
    response: {
      200: 'ProjectModelPermissionsDeleteResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Delete project model permissions',
      description: 'Deletes model permissions for a project.',
      operationId: 'delete-project-model-permissions',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/rate_limits', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.listProjectRateLimitsParams,
    query: OrganizationModel.listProjectRateLimitsQuery,
    response: {
      200: 'ProjectRateLimitListResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'List project rate limits',
      description: 'Returns the rate limits per model for a project.',
      operationId: 'list-project-rate-limits',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/rate_limits/:rate_limit_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.updateProjectRateLimitsParams,
    body: 'ProjectRateLimitUpdateRequest',
    response: {
      200: 'ProjectRateLimit',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Modify project rate limit',
      description: 'Updates a project rate limit.',
      operationId: 'update-project-rate-limits',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/service_accounts', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.listProjectServiceAccountsParams,
    query: OrganizationModel.listProjectServiceAccountsQuery,
    response: {
      200: 'ProjectServiceAccountListResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'List project service accounts',
      description: 'Returns a list of service accounts in the project.',
      operationId: 'list-project-service-accounts',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/service_accounts', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.createProjectServiceAccountParams,
    body: 'ProjectServiceAccountCreateRequest',
    response: {
      200: 'ProjectServiceAccountCreateResponse',
      201: 'ProjectServiceAccountCreateResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Create project service account',
      description:
        'Creates a new service account in the project. By default, this also returns an unredacted API key for the service account.',
      operationId: 'create-project-service-account',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: OrganizationModel.retrieveProjectServiceAccountParams,
      response: {
        200: 'ProjectServiceAccount',
        400: 'ErrorResponse',
        403: 'PermissionErrorResponse',
        404: 'ErrorResponse',
        429: 'ErrorResponse',
      },
      detail: {
        tags: ['Projects'],
        summary: 'Retrieve project service account',
        description: 'Retrieves a service account in the project.',
        operationId: 'retrieve-project-service-account',
        security: [{ AdminApiKeyAuth: [] }],
      },
    },
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: OrganizationModel.updateProjectServiceAccountParams,
      body: 'UpdateProjectServiceAccountBody',
      response: {
        200: 'ProjectServiceAccount',
        400: 'ErrorResponse',
        403: 'PermissionErrorResponse',
        404: 'ErrorResponse',
        429: 'ErrorResponse',
      },
      detail: {
        tags: ['Projects'],
        summary: 'Update project service account',
        description: 'Updates a service account in the project.',
        operationId: 'update-project-service-account',
        security: [{ AdminApiKeyAuth: [] }],
      },
    },
  )
  .delete(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: OrganizationModel.deleteProjectServiceAccountParams,
      response: {
        200: 'ProjectServiceAccountDeleteResponse',
        400: 'ErrorResponse',
        403: 'PermissionErrorResponse',
        404: 'ErrorResponse',
        429: 'ErrorResponse',
      },
      detail: {
        tags: ['Projects'],
        summary: 'Delete project service account',
        description:
          'Deletes a service account from the project.\n\nReturns confirmation of service account deletion, or an error if the project\nis archived (archived projects have no service accounts).\n',
        operationId: 'delete-project-service-account',
        security: [{ AdminApiKeyAuth: [] }],
      },
    },
  )
  .get('/organization/projects/:project_id/spend_alerts', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.listProjectSpendAlertsParams,
    query: OrganizationModel.listProjectSpendAlertsQuery,
    response: {
      200: 'ProjectSpendAlertListResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Spend alerts'],
      summary: 'List project spend alerts',
      description: 'Lists project spend alerts.',
      operationId: 'list-project-spend-alerts',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/spend_alerts', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.createProjectSpendAlertParams,
    body: 'CreateSpendAlertBody',
    response: {
      200: 'ProjectSpendAlert',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Spend alerts'],
      summary: 'Create project spend alert',
      description: 'Creates a project spend alert.',
      operationId: 'create-project-spend-alert',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/spend_alerts/:alert_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveProjectSpendAlertParams,
    response: {
      200: 'ProjectSpendAlert',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Spend alerts'],
      summary: 'Retrieve project spend alert',
      description: 'Retrieves a project spend alert.',
      operationId: 'retrieve-project-spend-alert',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/spend_alerts/:alert_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.updateProjectSpendAlertParams,
    body: 'CreateSpendAlertBody',
    response: {
      200: 'ProjectSpendAlert',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Spend alerts'],
      summary: 'Update project spend alert',
      description: 'Updates a project spend alert.',
      operationId: 'update-project-spend-alert',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/projects/:project_id/spend_alerts/:alert_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.deleteProjectSpendAlertParams,
    response: {
      200: 'ProjectSpendAlertDeletedResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Spend alerts'],
      summary: 'Delete project spend alert',
      description: 'Deletes a project spend alert.',
      operationId: 'delete-project-spend-alert',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/users', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.listProjectUsersParams,
    query: OrganizationModel.listProjectUsersQuery,
    response: {
      200: 'ProjectUserListResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'List project users',
      description: 'Returns a list of users in the project.',
      operationId: 'list-project-users',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/users', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.createProjectUserParams,
    body: 'ProjectUserCreateRequest',
    response: {
      200: 'ProjectUser',
      201: 'ProjectUser',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      409: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Create project user',
      description:
        'Adds a user to the project. Users must already be members of the organization to be added to a project.',
      operationId: 'create-project-user',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/users/:user_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveProjectUserParams,
    response: {
      200: 'ProjectUser',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Retrieve project user',
      description: 'Retrieves a user in the project.',
      operationId: 'retrieve-project-user',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/users/:user_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.modifyProjectUserParams,
    body: 'ProjectUserUpdateRequest',
    response: {
      200: 'ProjectUser',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Modify project user',
      description: "Modifies a user's role in the project.",
      operationId: 'modify-project-user',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/projects/:project_id/users/:user_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.deleteProjectUserParams,
    response: {
      200: 'ProjectUserDeleteResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Projects'],
      summary: 'Delete project user',
      description:
        'Deletes a user from the project.\n\nReturns confirmation of project user deletion, or an error if the project is\narchived (archived projects have no users).\n',
      operationId: 'delete-project-user',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/roles', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.listRolesQuery,
    response: {
      200: 'PublicRoleListResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Roles'],
      summary: 'List organization roles',
      description: 'Lists the roles configured for the organization.',
      operationId: 'list-roles',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/roles', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'PublicCreateOrganizationRoleBody',
    response: {
      200: 'Role',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Roles'],
      summary: 'Create organization role',
      description: 'Creates a custom role for the organization.',
      operationId: 'create-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/roles/:role_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveRoleParams,
    response: {
      200: 'Role',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Roles'],
      summary: 'Retrieve organization role',
      description: 'Retrieves an organization role.',
      operationId: 'retrieve-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/roles/:role_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.updateRoleParams,
    body: 'PublicUpdateOrganizationRoleBody',
    response: {
      200: 'Role',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Roles'],
      summary: 'Update organization role',
      description: 'Updates an existing organization role.',
      operationId: 'update-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/roles/:role_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.deleteRoleParams,
    response: {
      200: 'RoleDeletedResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Roles'],
      summary: 'Delete organization role',
      description: 'Deletes a custom role from the organization.',
      operationId: 'delete-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/spend_alerts', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.listOrganizationSpendAlertsQuery,
    response: {
      200: 'OrganizationSpendAlertListResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Spend alerts'],
      summary: 'List organization spend alerts',
      description: 'Lists organization spend alerts.',
      operationId: 'list-organization-spend-alerts',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/spend_alerts', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateSpendAlertBody',
    response: {
      200: 'OrganizationSpendAlert',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
    },
    detail: {
      tags: ['Spend alerts'],
      summary: 'Create organization spend alert',
      description: 'Creates an organization spend alert.',
      operationId: 'create-organization-spend-alert',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/spend_alerts/:alert_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveOrganizationSpendAlertParams,
    response: {
      200: 'OrganizationSpendAlert',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Spend alerts'],
      summary: 'Retrieve organization spend alert',
      description: 'Retrieves an organization spend alert.',
      operationId: 'retrieve-organization-spend-alert',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/spend_alerts/:alert_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.updateOrganizationSpendAlertParams,
    body: 'CreateSpendAlertBody',
    response: {
      200: 'OrganizationSpendAlert',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Spend alerts'],
      summary: 'Update organization spend alert',
      description: 'Updates an organization spend alert.',
      operationId: 'update-organization-spend-alert',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/spend_alerts/:alert_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.deleteOrganizationSpendAlertParams,
    response: {
      200: 'OrganizationSpendAlertDeletedResource',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['Spend alerts'],
      summary: 'Delete organization spend alert',
      description: 'Deletes an organization spend alert.',
      operationId: 'delete-organization-spend-alert',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/usage/audio_speeches', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.usageAudioSpeechesQuery,
    response: {
      200: 'UsageResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Usage'],
      summary: 'Audio speeches',
      description: 'Get audio speeches usage details for the organization.',
      operationId: 'usage-audio-speeches',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/usage/audio_transcriptions', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.usageAudioTranscriptionsQuery,
    response: {
      200: 'UsageResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Usage'],
      summary: 'Audio transcriptions',
      description: 'Get audio transcriptions usage details for the organization.',
      operationId: 'usage-audio-transcriptions',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/usage/code_interpreter_sessions', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.usageCodeInterpreterSessionsQuery,
    response: {
      200: 'UsageResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Usage'],
      summary: 'Code interpreter sessions',
      description: 'Get code interpreter sessions usage details for the organization.',
      operationId: 'usage-code-interpreter-sessions',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/usage/completions', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.usageCompletionsQuery,
    response: {
      200: 'UsageResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Usage'],
      summary: 'Completions',
      description: 'Get completions usage details for the organization.',
      operationId: 'usage-completions',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/usage/embeddings', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.usageEmbeddingsQuery,
    response: {
      200: 'UsageResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Usage'],
      summary: 'Embeddings',
      description: 'Get embeddings usage details for the organization.',
      operationId: 'usage-embeddings',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/usage/file_search_calls', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.usageFileSearchCallsQuery,
    response: {
      200: 'UsageResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Usage'],
      summary: 'File search calls',
      description: 'Get file search calls usage details for the organization.',
      operationId: 'usage-file-search-calls',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/usage/images', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.usageImagesQuery,
    response: {
      200: 'UsageResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Usage'],
      summary: 'Images',
      description: 'Get images usage details for the organization.',
      operationId: 'usage-images',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/usage/moderations', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.usageModerationsQuery,
    response: {
      200: 'UsageResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Usage'],
      summary: 'Moderations',
      description: 'Get moderations usage details for the organization.',
      operationId: 'usage-moderations',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/usage/vector_stores', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.usageVectorStoresQuery,
    response: {
      200: 'UsageResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Usage'],
      summary: 'Vector stores',
      description: 'Get vector stores usage details for the organization.',
      operationId: 'usage-vector-stores',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/usage/web_search_calls', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.usageWebSearchCallsQuery,
    response: {
      200: 'UsageResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Usage'],
      summary: 'Web search calls',
      description: 'Get web search calls usage details for the organization.',
      operationId: 'usage-web-search-calls',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/users', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.listUsersQuery,
    response: {
      200: 'UserListResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Users'],
      summary: 'List users',
      description: 'Lists all of the users in the organization.',
      operationId: 'list-users',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/users/:user_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveUserParams,
    response: {
      200: 'User',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Users'],
      summary: 'Retrieve user',
      description: 'Retrieves a user by their identifier.',
      operationId: 'retrieve-user',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/users/:user_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.modifyUserParams,
    body: 'UserRoleUpdateRequest',
    response: {
      200: 'User',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Users'],
      summary: 'Modify user',
      description: "Modifies a user's role in the organization.",
      operationId: 'modify-user',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/users/:user_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.deleteUserParams,
    response: {
      200: 'UserDeleteResponse',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Users'],
      summary: 'Delete user',
      description: 'Deletes a user from the organization.',
      operationId: 'delete-user',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/users/:user_id/roles', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.listUserRoleAssignmentsParams,
    query: OrganizationModel.listUserRoleAssignmentsQuery,
    response: {
      200: 'RoleListResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['User organization role assignments'],
      summary: 'List user organization role assignments',
      description: 'Lists the organization roles assigned to a user within the organization.',
      operationId: 'list-user-role-assignments',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/users/:user_id/roles', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.assignUserRoleParams,
    body: 'PublicAssignOrganizationGroupRoleBody',
    response: {
      200: 'UserRoleAssignment',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['User organization role assignments'],
      summary: 'Assign organization role to user',
      description: 'Assigns an organization role to a user within the organization.',
      operationId: 'assign-user-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/users/:user_id/roles/:role_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.retrieveUserRoleParams,
    response: {
      200: 'AssignedRoleDetails',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['User organization role assignments'],
      summary: 'Retrieve user organization role',
      description: 'Retrieves an organization role assigned to a user.',
      operationId: 'retrieve-user-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/users/:user_id/roles/:role_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.unassignUserRoleParams,
    response: {
      200: 'DeletedRoleAssignmentResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['User organization role assignments'],
      summary: 'Unassign organization role from user',
      description: 'Unassigns an organization role from a user within the organization.',
      operationId: 'unassign-user-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/external_keys', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.ListtheexternalkeyconfigsregisteredontheuserSorganizationQuery,
    response: { 200: 'ListExternalKeysResource' },
    detail: {
      tags: [],
      summary: "List the external key configs registered on the user's organization",
      description: "List the external key configs registered on the user's organization",
      operationId: "Listtheexternalkeyconfigsregisteredontheuser'sorganization",
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/external_keys', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'V1OrganizationExternalKeysPostRequest',
    response: { 200: 'ExternalKeyResource' },
    detail: {
      tags: [],
      summary: 'Add an external key config for an organization',
      description: 'Add an external key config for an organization',
      operationId: 'Addanexternalkeyconfigforanorganization',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/external_keys/:external_key_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.RetrieveanexternalkeyregistrationParams,
    response: { 200: 'ExternalKeyResource' },
    detail: {
      tags: [],
      summary: 'Retrieve an external key registration',
      description: "Retrieve a stored external key registration for the user's organization.",
      operationId: 'Retrieveanexternalkeyregistration',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/external_keys/:external_key_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.DeleteanexternalkeyconfigfortheuserSorganizationParams,
    response: { 200: 'ExternalKeyResource' },
    detail: {
      tags: [],
      summary: "Delete an external key config for the user's organization",
      description: "Delete an external key config for the user's organization",
      operationId: "Deleteanexternalkeyconfigfortheuser'sorganization",
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/external_keys/:external_key_id/validate', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.ValidateanexternalkeyconfigfortheuserSorganizationParams,
    response: { 200: 'ValidateExternalKeyResource' },
    detail: {
      tags: [],
      summary: "Validate an external key config for the user's organization",
      description: "Validate an external key config for the user's organization",
      operationId: "Validateanexternalkeyconfigfortheuser'sorganization",
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/workload_identity_providers', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.ListPlatformworkloadidentityprovidersQuery,
    response: { 200: 'PlatformProviderListResource' },
    detail: {
      tags: [],
      summary: 'List Platform workload identity providers',
      description: "List OIDC providers in the authenticated Admin API key's organization.",
      operationId: 'ListPlatformworkloadidentityproviders',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/workload_identity_providers', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreatePlatformWorkloadIdentityProviderBody',
    response: { 200: 'PlatformProvider' },
    detail: {
      tags: [],
      summary: 'Create Platform workload identity provider',
      description: 'Register an OIDC provider for keyless project service-account authentication.',
      operationId: 'CreatePlatformworkloadidentityprovider',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: OrganizationModel.RetrievePlatformworkloadidentityproviderParams,
      response: { 200: 'PlatformProvider' },
      detail: {
        tags: [],
        summary: 'Retrieve Platform workload identity provider',
        description: 'Retrieve an OIDC provider in the authenticated organization.',
        operationId: 'RetrievePlatformworkloadidentityprovider',
        security: [{ AdminApiKeyAuth: [] }],
      },
    },
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: OrganizationModel.UpdatePlatformworkloadidentityproviderParams,
      body: 'UpdatePlatformWorkloadIdentityProviderBody',
      response: { 200: 'PlatformProvider' },
      detail: {
        tags: [],
        summary: 'Update Platform workload identity provider',
        description: 'Update supplied provider fields, preserving omitted fields.',
        operationId: 'UpdatePlatformworkloadidentityprovider',
        security: [{ AdminApiKeyAuth: [] }],
      },
    },
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: OrganizationModel.DeletePlatformworkloadidentityproviderParams,
      response: { 200: 'PlatformProviderDeletedResource' },
      detail: {
        tags: [],
        summary: 'Delete Platform workload identity provider',
        description: 'Delete a provider after deleting all its federation rules.',
        operationId: 'DeletePlatformworkloadidentityprovider',
        security: [{ AdminApiKeyAuth: [] }],
      },
    },
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    ({ params, query }) => { throw new Error('Not implemented') },
    {
      params: OrganizationModel.ListPlatformworkloadidentityfederationrulesParams,
      query: OrganizationModel.ListPlatformworkloadidentityfederationrulesQuery,
      response: { 200: 'PlatformFederationRuleListResource' },
      detail: {
        tags: [],
        summary: 'List Platform workload identity federation rules',
        description: "List the provider's federation rules to project service accounts.",
        operationId: 'ListPlatformworkloadidentityfederationrules',
        security: [{ AdminApiKeyAuth: [] }],
      },
    },
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: OrganizationModel.CreatePlatformworkloadidentityfederationruleParams,
      body: 'CreatePlatformWorkloadIdentityFederationRuleBody',
      response: { 200: 'PlatformFederationRule' },
      detail: {
        tags: [],
        summary: 'Create Platform workload identity federation rule',
        description: 'Bind verified token attributes to an existing project service account.',
        operationId: 'CreatePlatformworkloadidentityfederationrule',
        security: [{ AdminApiKeyAuth: [] }],
      },
    },
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: OrganizationModel.RetrievePlatformworkloadidentityfederationruleParams,
      response: { 200: 'PlatformFederationRule' },
      detail: {
        tags: [],
        summary: 'Retrieve Platform workload identity federation rule',
        description:
          'Retrieve a federation rule owned by the authenticated organization and provider.',
        operationId: 'RetrievePlatformworkloadidentityfederationrule',
        security: [{ AdminApiKeyAuth: [] }],
      },
    },
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: OrganizationModel.UpdatePlatformworkloadidentityfederationruleParams,
      body: 'UpdatePlatformWorkloadIdentityFederationRuleBody',
      response: { 200: 'PlatformFederationRule' },
      detail: {
        tags: [],
        summary: 'Update Platform workload identity federation rule',
        description: 'Update supplied matcher, permission, metadata, or enabled fields.',
        operationId: 'UpdatePlatformworkloadidentityfederationrule',
        security: [{ AdminApiKeyAuth: [] }],
      },
    },
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    ({ params }) => { throw new Error('Not implemented') },
    {
      params: OrganizationModel.DeletePlatformworkloadidentityfederationruleParams,
      response: { 200: 'PlatformFederationRuleDeletedResource' },
      detail: {
        tags: [],
        summary: 'Delete Platform workload identity federation rule',
        description: 'Delete a federation rule to a project service account.',
        operationId: 'DeletePlatformworkloadidentityfederationrule',
        security: [{ AdminApiKeyAuth: [] }],
      },
    },
  )
  .get('/organization/usage/decisions', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.OrganizationDecisionsusageQuery,
    response: {
      200: 'PublicDecisionsUsageResponseResource',
      400: 'DecisionsUsageErrorResponse',
      403: 'DecisionsUsagePermissionErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Decisions',
      description: 'Get Decisions API usage details for the organization.',
      operationId: 'OrganizationDecisionsusage',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/external_storage', ({ query }) => { throw new Error('Not implemented') }, {
    query: OrganizationModel.ListexternalstorageconfigurationsQuery,
    response: {
      200: 'ExternalStorageListResource',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'List external storage configurations',
      description: "List the organization's customer-managed external storage configurations.",
      operationId: 'Listexternalstorageconfigurations',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/external_storage', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'CreateExternalStorageBody',
    response: {
      200: 'ExternalStorageResponse',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      404: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Create an external storage configuration',
      description: 'Register one customer-managed external storage configuration.',
      operationId: 'Createanexternalstorageconfiguration',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/external_storage/:external_storage_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.GetanexternalstorageconfigurationParams,
    response: {
      200: 'ExternalStorageResponse',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Get an external storage configuration',
      description: 'Get one customer-managed external storage configuration.',
      operationId: 'Getanexternalstorageconfiguration',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/external_storage/:external_storage_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.DeleteanexternalstorageconfigurationParams,
    response: {
      200: 'ExternalStorageDeletedResource',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Delete an external storage configuration',
      description:
        "Disconnect a customer-managed external storage configuration. Removing the project's last configuration restores organization-default retention if customer-managed retention was active. Repeating a deletion also completes any interrupted retention update. Cloud storage is unchanged.",
      operationId: 'Deleteanexternalstorageconfiguration',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/external_storage/:external_storage_id/validate', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.ValidateanexternalstorageconfigurationParams,
    response: {
      200: 'ExternalStorageResponse',
      400: 'ErrorResponse',
      403: 'ErrorResponse',
      404: 'ErrorResponse',
      503: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Validate an external storage configuration',
      description: 'Validate one customer-managed external storage configuration.',
      operationId: 'Validateanexternalstorageconfiguration',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/spend_limit', () => { throw new Error('Not implemented') }, {
    response: {
      200: 'OrganizationSpendLimitResource',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Get organization spend limit',
      description: "Get the organization's hard spend limit.",
      operationId: 'Getorganizationspendlimit',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/spend_limit', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'UpdateOrganizationSpendLimitBody',
    response: {
      200: 'OrganizationSpendLimitResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Update organization spend limit',
      description: "Create or replace the organization's hard spend limit.",
      operationId: 'Updateorganizationspendlimit',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/spend_limit', () => { throw new Error('Not implemented') }, {
    response: {
      200: 'OrganizationSpendLimitDeletedResource',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Delete organization spend limit',
      description: "Delete the organization's hard spend limit.",
      operationId: 'Deleteorganizationspendlimit',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/spend_limit', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.GetprojectspendlimitParams,
    response: {
      200: 'ProjectSpendLimitResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Get project spend limit',
      description: "Get a project's hard spend limit.",
      operationId: 'Getprojectspendlimit',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/spend_limit', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.UpdateprojectspendlimitParams,
    body: 'UpdateProjectSpendLimitBody',
    response: {
      200: 'ProjectSpendLimitResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Update project spend limit',
      description: "Create or replace a project's hard spend limit.",
      operationId: 'Updateprojectspendlimit',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/organization/projects/:project_id/spend_limit', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.DeleteprojectspendlimitParams,
    response: {
      200: 'ProjectSpendLimitDeletedResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Delete project spend limit',
      description: "Delete a project's hard spend limit.",
      operationId: 'Deleteprojectspendlimit',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/organization/projects/:project_id/service_tier_settings', ({ params }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.RetrieveprojectservicetiersettingsParams,
    response: { 200: 'ProjectServiceTierSettingsResource' },
    detail: {
      tags: [],
      summary: 'Retrieve project service tier settings',
      description: 'Retrieve the configured default and enabled service tiers for a project.',
      operationId: 'Retrieveprojectservicetiersettings',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/organization/projects/:project_id/service_tier_settings', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: OrganizationModel.UpdateprojectservicetiersettingsParams,
    body: 'UpdateProjectServiceTierSettingsBody',
    response: { 200: 'ProjectServiceTierSettingsResource' },
    detail: {
      tags: [],
      summary: 'Update project service tier settings',
      description:
        'Update the default or enabled service tiers atomically. Supply at least one field. Omitted fields keep their current values.',
      operationId: 'Updateprojectservicetiersettings',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id/api_keys',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: OrganizationModel.CreateanAPIkeyforaserviceaccountParams,
      body: 'CreateProjectServiceAccountApiKeyBody',
      response: {
        200: 'ServiceAccountApiKeyBody',
        400: 'ErrorResponse',
        403: 'PermissionErrorResponse',
        404: 'ErrorResponse',
        429: 'ErrorResponse',
      },
      detail: {
        tags: [],
        summary: 'Create an API key for a service account',
        description: 'Creates an API key for a service account in the project.',
        operationId: 'CreateanAPIkeyforaserviceaccount',
        security: [{ AdminApiKeyAuth: [] }],
      },
    },
  )
