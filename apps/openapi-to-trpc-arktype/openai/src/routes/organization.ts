import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  AdminApiKeyCreateResponseSchema,
  AdminApiKeySchema,
  ApiKeyListSchema,
  AssignedRoleDetailsSchema,
  AuditLogEventTypeSchema,
  CertificateSchema,
  CreateExternalStorageBodySchema,
  CreateGroupBodySchema,
  CreatePlatformWorkloadIdentityProviderBodySchema,
  CreateSpendAlertBodySchema,
  DecisionsUsageBucketWidthSchema,
  DecisionsUsageGroupBySchema,
  DefaultPermissionsParamSchema,
  DeleteCertificateResponseSchema,
  DeletedRoleAssignmentResourceSchema,
  DiscoveryVerificationParamSchema,
  ExternalKeyPurposeSchema,
  ExternalKeyResourceSchema,
  ExternalStorageDeletedResourceSchema,
  ExternalStorageListResourceSchema,
  ExternalStorageOrderSchema,
  ExternalStorageResponseSchema,
  GroupDeletedResourceSchema,
  GroupListResourceSchema,
  GroupMemberUserSchema,
  GroupResourceWithSuccessSchema,
  GroupResponseSchema,
  GroupRoleAssignmentSchema,
  GroupUserAssignmentSchema,
  GroupUserDeletedResourceSchema,
  HostedToolPermissionUpdateSchema,
  InviteDeleteResponseSchema,
  InviteListResponseSchema,
  InviteRequestSchema,
  InviteSchema,
  ListAuditLogsResponseSchema,
  ListCertificatesResponseSchema,
  ListExternalKeysResourceSchema,
  ListProjectCertificatesResponseSchema,
  OrderEnumSchema,
  OrganizationCertificateActivationResponseSchema,
  OrganizationCertificateDeactivationResponseSchema,
  OrganizationDataRetentionSchema,
  OrganizationProjectCertificateActivationResponseSchema,
  OrganizationProjectCertificateDeactivationResponseSchema,
  OrganizationSpendAlertDeletedResourceSchema,
  OrganizationSpendAlertListResourceSchema,
  OrganizationSpendAlertSchema,
  OrganizationSpendLimitDeletedResourceSchema,
  OrganizationSpendLimitResourceSchema,
  PlatformFederationRuleDeletedResourceSchema,
  PlatformFederationRuleListResourceSchema,
  PlatformFederationRuleSchema,
  PlatformProviderDeletedResourceSchema,
  PlatformProviderListResourceSchema,
  PlatformProviderSchema,
  ProjectApiKeyDeleteResponseSchema,
  ProjectApiKeyListResponseSchema,
  ProjectApiKeySchema,
  ProjectCreateRequestSchema,
  ProjectDataRetentionSchema,
  ProjectDefaultServiceTierSchema,
  ProjectGroupDeletedResourceSchema,
  ProjectGroupListResourceSchema,
  ProjectGroupSchema,
  ProjectHostedToolPermissionsSchema,
  ProjectListResponseSchema,
  ProjectModelPermissionsDeleteResponseSchema,
  ProjectModelPermissionsSchema,
  ProjectOptionalServiceTierSchema,
  ProjectRateLimitListResponseSchema,
  ProjectRateLimitSchema,
  ProjectSchema,
  ProjectServiceAccountCreateResponseSchema,
  ProjectServiceAccountDeleteResponseSchema,
  ProjectServiceAccountListResponseSchema,
  ProjectServiceAccountSchema,
  ProjectServiceTierSettingsResourceSchema,
  ProjectSpendAlertDeletedResourceSchema,
  ProjectSpendAlertListResourceSchema,
  ProjectSpendAlertSchema,
  ProjectSpendLimitDeletedResourceSchema,
  ProjectSpendLimitResourceSchema,
  ProjectUserDeleteResponseSchema,
  ProjectUserListResponseSchema,
  ProjectUserSchema,
  PublicCreateOrganizationRoleBodySchema,
  PublicDecisionsUsageResponseResourceSchema,
  PublicRoleListResourceSchema,
  RestrictedPermissionsParamSchema,
  RoleDeletedResourceSchema,
  RoleListResourceSchema,
  RoleSchema,
  ServiceAccountApiKeyBodySchema,
  SpendAlertNotificationChannelSchema,
  SpendLimitEmailNotificationChannelParamsSchema,
  ToggleCertificatesRequestSchema,
  TransformationParamSchema,
  UpdateOrganizationDataRetentionBodySchema,
  UpdateOrganizationSpendLimitBodySchema,
  UploadCertificateRequestSchema,
  UploadedJwksVerificationParamSchema,
  UsageResponseSchema,
  UserDeleteResponseSchema,
  UserListResourceSchema,
  UserListResponseSchema,
  UserRoleAssignmentSchema,
  UserSchema,
  V1OrganizationExternalKeysPostRequestSchema,
  ValidateExternalKeyResourceSchema,
} from '../components'

const t = initTRPC.create()

export const organizationRouter = t.router({
  getOrganizationAdminApiKeys: t.procedure
    .input(
      type({
        'after?': type('string | null').describe(
          'Return keys with IDs that come after this ID in the pagination order.',
        ),
        'order?': type("'asc' | 'desc'").describe(
          'Order results by creation time, ascending or descending.',
        ),
        'limit?': type('number.integer').describe('Maximum number of keys to return.'),
      }),
    )
    .output(ApiKeyListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationAdminApiKeys: t.procedure
    .input(
      type({
        name: 'string',
        'expires_in_seconds?': type('number.integer >= 1 & number.integer <= 31536000').describe(
          'The number of seconds until the API key expires. Omit this field for a key that does not expire.',
        ),
      }),
    )
    .output(AdminApiKeyCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationAdminApiKeysKeyId: t.procedure
    .input(type({ key_id: type('string').describe('The ID of the API key.') }))
    .output(AdminApiKeySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationAdminApiKeysKeyId: t.procedure
    .input(type({ key_id: type('string').describe('The ID of the API key to be deleted.') }))
    .output(
      type({ id: 'string', object: "'organization.admin_api_key.deleted'", deleted: 'boolean' }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationAuditLogs: t.procedure
    .input(
      type({
        'effective_at?': type({
          'gt?': type('number.integer').describe(
            'Return only events whose `effective_at` (Unix seconds) is greater than this value.',
          ),
          'gte?': type('number.integer').describe(
            'Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.',
          ),
          'lt?': type('number.integer').describe(
            'Return only events whose `effective_at` (Unix seconds) is less than this value.',
          ),
          'lte?': type('number.integer').describe(
            'Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.',
          ),
        }),
        'project_ids[]?': 'string[]',
        'event_types[]?': type(AuditLogEventTypeSchema).array(),
        'actor_ids[]?': 'string[]',
        'actor_emails[]?': 'string[]',
        'resource_ids[]?': 'string[]',
        'tenant_only?': 'boolean',
        'limit?': 'number.integer',
        'after?': 'string',
        'before?': 'string',
      }),
    )
    .output(ListAuditLogsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationCertificates: t.procedure
    .input(type({ 'limit?': 'number.integer', 'after?': 'string', 'order?': "'asc' | 'desc'" }))
    .output(ListCertificatesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationCertificates: t.procedure
    .input(UploadCertificateRequestSchema)
    .output(CertificateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationCertificatesActivate: t.procedure
    .input(ToggleCertificatesRequestSchema)
    .output(OrganizationCertificateActivationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationCertificatesDeactivate: t.procedure
    .input(ToggleCertificatesRequestSchema)
    .output(OrganizationCertificateDeactivationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationCertificatesCertificateId: t.procedure
    .input(type({ certificate_id: 'string', 'include?': "'content'[]" }))
    .output(CertificateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationCertificatesCertificateId: t.procedure
    .input(
      type({
        certificate_id: 'string',
        'name?': type('string').describe('The updated name for the certificate'),
      }),
    )
    .output(CertificateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationCertificatesCertificateId: t.procedure
    .input(type({ certificate_id: 'string' }))
    .output(DeleteCertificateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationCosts: t.procedure
    .input(
      type({
        start_time: 'number.integer',
        'end_time?': 'number.integer',
        'bucket_width?': "'1d'",
        'project_ids?': 'string[]',
        'api_key_ids?': 'string[]',
        'line_items?': 'string[]',
        'group_by?': "'project_id' | 'user_id' | 'line_item' | 'api_key_id' | 'api_source'[]",
        'limit?': 'number.integer',
        'page?': 'string',
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationDataRetention: t.procedure.output(OrganizationDataRetentionSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postOrganizationDataRetention: t.procedure
    .input(UpdateOrganizationDataRetentionBodySchema)
    .output(OrganizationDataRetentionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroups: t.procedure
    .input(
      type({
        'limit?': 'number.integer >= 0 & number.integer <= 1000',
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    )
    .output(GroupListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroups: t.procedure
    .input(CreateGroupBodySchema)
    .output(GroupResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupId: t.procedure
    .input(type({ group_id: 'string' }))
    .output(GroupResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroupsGroupId: t.procedure
    .input(
      type({
        group_id: 'string',
        name: type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 255 || ctx.mustBe('at most 255 characters'))
          .describe('New display name for the group.'),
      }),
    )
    .output(GroupResourceWithSuccessSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationGroupsGroupId: t.procedure
    .input(type({ group_id: 'string' }))
    .output(GroupDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdRoles: t.procedure
    .input(
      type({
        group_id: 'string',
        'limit?': 'number.integer >= 0 & number.integer <= 1000',
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    )
    .output(RoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroupsGroupIdRoles: t.procedure
    .input(
      type({
        group_id: 'string',
        role_id: type('string').describe('Identifier of the role to assign.'),
      }),
    )
    .output(GroupRoleAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdRolesRoleId: t.procedure
    .input(type({ group_id: 'string', role_id: 'string' }))
    .output(AssignedRoleDetailsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationGroupsGroupIdRolesRoleId: t.procedure
    .input(type({ group_id: 'string', role_id: 'string' }))
    .output(DeletedRoleAssignmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdUsers: t.procedure
    .input(
      type({
        group_id: 'string',
        'limit?': 'number.integer >= 0 & number.integer <= 1000',
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    )
    .output(UserListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroupsGroupIdUsers: t.procedure
    .input(
      type({
        group_id: 'string',
        user_id: type('string').describe('Identifier of the user to add to the group.'),
      }),
    )
    .output(GroupUserAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdUsersUserId: t.procedure
    .input(type({ group_id: 'string', user_id: 'string' }))
    .output(GroupMemberUserSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationGroupsGroupIdUsersUserId: t.procedure
    .input(type({ group_id: 'string', user_id: 'string' }))
    .output(GroupUserDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationInvites: t.procedure
    .input(type({ 'limit?': 'number.integer', 'after?': 'string' }))
    .output(InviteListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationInvites: t.procedure
    .input(InviteRequestSchema)
    .output(InviteSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationInvitesInviteId: t.procedure
    .input(type({ invite_id: 'string' }))
    .output(InviteSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationInvitesInviteId: t.procedure
    .input(type({ invite_id: 'string' }))
    .output(InviteDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjects: t.procedure
    .input(type({ 'limit?': 'number.integer', 'after?': 'string', 'include_archived?': 'boolean' }))
    .output(ProjectListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjects: t.procedure
    .input(ProjectCreateRequestSchema)
    .output(ProjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectId: t.procedure
    .input(type({ project_id: 'string' }))
    .output(ProjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectId: t.procedure
    .input(
      type({
        project_id: 'string',
        'name?': type('string | null | null').describe(
          'The updated name of the project, this name appears in reports.',
        ),
        'external_key_id?': type('string | null | null').describe(
          'External key ID to associate with the project.',
        ),
        'geography?': type('string | null | null').describe(
          'Geography for the project.\nDeprecated: use `residency` when creating a project to configure data residency. This field is retained for backward compatibility.',
        ),
      }),
    )
    .output(ProjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdApiKeys: t.procedure
    .input(
      type({
        project_id: 'string',
        'limit?': 'number.integer',
        'after?': 'string',
        'owner_project_access?': "'active' | 'inactive' | 'any'",
      }),
    )
    .output(ProjectApiKeyListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdApiKeysApiKeyId: t.procedure
    .input(type({ project_id: 'string', api_key_id: 'string' }))
    .output(ProjectApiKeySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdApiKeysApiKeyId: t.procedure
    .input(
      type({
        project_id: 'string',
        api_key_id: 'string',
        'expires_in_seconds?': type('number.integer >= 1 & number.integer <= 31536000').describe(
          'Number of seconds from this request until the API key expires. Must comply with the organization and project expiry policies. Expired keys cannot be updated. Retrying resets the expiry relative to the new request. Omit to keep the current expiration.',
        ),
        'scopes?': type('string[]').describe(
          'Replace the API key scope restrictions. Omit to leave scopes unchanged. An empty array removes key restrictions (All permissions), subject to the owner\'s effective permissions. Use ["api.all.read"] for read-only access. Scopes do not change the owner\'s roles or grant administrative permissions.',
        ),
      }),
    )
    .output(ProjectApiKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdApiKeysApiKeyId: t.procedure
    .input(type({ project_id: 'string', api_key_id: 'string' }))
    .output(ProjectApiKeyDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdArchive: t.procedure
    .input(type({ project_id: 'string' }))
    .output(ProjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdCertificates: t.procedure
    .input(
      type({
        project_id: 'string',
        'limit?': 'number.integer',
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    )
    .output(ListProjectCertificatesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdCertificatesActivate: t.procedure
    .input(
      type({
        project_id: 'string',
        certificate_ids: type('string[]').and(type('1 <= unknown[] <= 10')),
      }),
    )
    .output(OrganizationProjectCertificateActivationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdCertificatesDeactivate: t.procedure
    .input(
      type({
        project_id: 'string',
        certificate_ids: type('string[]').and(type('1 <= unknown[] <= 10')),
      }),
    )
    .output(OrganizationProjectCertificateDeactivationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdDataRetention: t.procedure
    .input(type({ project_id: 'string' }))
    .output(ProjectDataRetentionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdDataRetention: t.procedure
    .input(
      type({
        project_id: 'string',
        retention_type: type(
          "'organization_default' | 'none' | 'zero_data_retention' | 'modified_abuse_monitoring' | 'enhanced_zero_data_retention' | 'enhanced_modified_abuse_monitoring'",
        ).describe('The desired project data retention type.'),
      }),
    )
    .output(ProjectDataRetentionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdGroups: t.procedure
    .input(
      type({
        project_id: 'string',
        'limit?': 'number.integer >= 0 & number.integer <= 100',
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    )
    .output(ProjectGroupListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdGroups: t.procedure
    .input(
      type({
        project_id: 'string',
        group_id: type('string').describe('Identifier of the group to add to the project.'),
        role: type('string').describe('Identifier of the project role to grant to the group.'),
      }),
    )
    .output(ProjectGroupSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdGroupsGroupId: t.procedure
    .input(
      type({ project_id: 'string', group_id: 'string', 'group_type?': "'group' | 'tenant_group'" }),
    )
    .output(ProjectGroupSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdGroupsGroupId: t.procedure
    .input(type({ project_id: 'string', group_id: 'string' }))
    .output(ProjectGroupDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdHostedToolPermissions: t.procedure
    .input(type({ project_id: 'string' }))
    .output(ProjectHostedToolPermissionsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdHostedToolPermissions: t.procedure
    .input(
      type({
        project_id: 'string',
        'file_search?': type(HostedToolPermissionUpdateSchema)
          .or('null | null')
          .describe('The file search permission update.'),
        'web_search?': type(HostedToolPermissionUpdateSchema)
          .or('null | null')
          .describe('The web search permission update.'),
        'image_generation?': type(HostedToolPermissionUpdateSchema)
          .or('null | null')
          .describe('The image generation permission update.'),
        'mcp?': type(HostedToolPermissionUpdateSchema)
          .or('null | null')
          .describe('The MCP permission update.'),
        'code_interpreter?': type(HostedToolPermissionUpdateSchema)
          .or('null | null')
          .describe('The code interpreter permission update.'),
      }),
    )
    .output(ProjectHostedToolPermissionsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdModelPermissions: t.procedure
    .input(type({ project_id: 'string' }))
    .output(ProjectModelPermissionsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdModelPermissions: t.procedure
    .input(
      type({
        project_id: 'string',
        mode: type("'allow_list' | 'deny_list'").describe('The model permissions mode to apply.'),
        model_ids: type('string[]').describe('The model IDs included in this permissions policy.'),
      }),
    )
    .output(ProjectModelPermissionsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdModelPermissions: t.procedure
    .input(type({ project_id: 'string' }))
    .output(ProjectModelPermissionsDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdRateLimits: t.procedure
    .input(
      type({
        project_id: 'string',
        'limit?': 'number.integer',
        'after?': 'string',
        'before?': 'string',
      }),
    )
    .output(ProjectRateLimitListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdRateLimitsRateLimitId: t.procedure
    .input(
      type({
        project_id: 'string',
        rate_limit_id: 'string',
        'max_requests_per_1_minute?': type('number.integer').describe(
          'The maximum requests per minute.',
        ),
        'max_tokens_per_1_minute?': type('number.integer').describe(
          'The maximum tokens per minute.',
        ),
        'max_images_per_1_minute?': type('number.integer').describe(
          'The maximum images per minute. Only relevant for certain models.',
        ),
        'max_audio_megabytes_per_1_minute?': type('number.integer').describe(
          'The maximum audio megabytes per minute. Only relevant for certain models.',
        ),
        'max_requests_per_1_day?': type('number.integer').describe(
          'The maximum requests per day. Only relevant for certain models.',
        ),
        'batch_1_day_max_input_tokens?': type('number.integer').describe(
          'The maximum batch input tokens per day. Only relevant for certain models.',
        ),
      }),
    )
    .output(ProjectRateLimitSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdServiceAccounts: t.procedure
    .input(type({ project_id: 'string', 'limit?': 'number.integer', 'after?': 'string' }))
    .output(ProjectServiceAccountListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceAccounts: t.procedure
    .input(
      type({
        project_id: 'string',
        name: type('string').describe('The name of the service account being created.'),
        'create_service_account_only?': type(
          type('boolean').describe(
            'Create the service account without default roles or an API key.',
          ),
        ).or('null | null'),
        'expires_in_seconds?': type(
          'number.integer >= 1 & number.integer <= 31536000 | null | null',
        ).describe(
          'Number of seconds until the initial API key expires. If omitted or null, the key does not expire unless the effective organization or project policy requires an expiration. When a policy sets a maximum lifetime, this value must be provided and must not exceed that limit. A non-null value cannot be used when `create_service_account_only` is true.',
        ),
      }),
    )
    .output(ProjectServiceAccountCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdServiceAccountsServiceAccountId: t.procedure
    .input(type({ project_id: 'string', service_account_id: 'string' }))
    .output(ProjectServiceAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceAccountsServiceAccountId: t.procedure
    .input(
      type({
        project_id: 'string',
        service_account_id: 'string',
        'name?': type('string').describe('The updated service account name.'),
        'role?': type("'member' | 'owner'").describe('The updated service account role.'),
      }),
    )
    .output(ProjectServiceAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdServiceAccountsServiceAccountId: t.procedure
    .input(type({ project_id: 'string', service_account_id: 'string' }))
    .output(ProjectServiceAccountDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdSpendAlerts: t.procedure
    .input(
      type({
        project_id: 'string',
        'limit?': 'number.integer >= 0 & number.integer <= 100',
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
      }),
    )
    .output(ProjectSpendAlertListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdSpendAlerts: t.procedure
    .input(
      type({
        project_id: 'string',
        threshold_amount: type('number.integer >= 0').describe(
          'The alert threshold amount, in cents.',
        ),
        currency: type("'USD'").describe('The currency for the threshold amount.'),
        interval: type("'month'").describe(
          'The time interval for evaluating spend against the threshold.',
        ),
        notification_channel: SpendAlertNotificationChannelSchema,
      }),
    )
    .output(ProjectSpendAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdSpendAlertsAlertId: t.procedure
    .input(type({ project_id: 'string', alert_id: 'string' }))
    .output(ProjectSpendAlertSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdSpendAlertsAlertId: t.procedure
    .input(
      type({
        project_id: 'string',
        alert_id: 'string',
        threshold_amount: type('number.integer >= 0').describe(
          'The alert threshold amount, in cents.',
        ),
        currency: type("'USD'").describe('The currency for the threshold amount.'),
        interval: type("'month'").describe(
          'The time interval for evaluating spend against the threshold.',
        ),
        notification_channel: SpendAlertNotificationChannelSchema,
      }),
    )
    .output(ProjectSpendAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdSpendAlertsAlertId: t.procedure
    .input(type({ project_id: 'string', alert_id: 'string' }))
    .output(ProjectSpendAlertDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdUsers: t.procedure
    .input(type({ project_id: 'string', 'limit?': 'number.integer', 'after?': 'string' }))
    .output(ProjectUserListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdUsers: t.procedure
    .input(
      type({
        project_id: 'string',
        'user_id?': type('string | null | null').describe('The ID of the user.'),
        'email?': type('string | null | null').describe('Email of the user to add.'),
        role: type('string').describe('`owner` or `member`'),
      }),
    )
    .output(ProjectUserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdUsersUserId: t.procedure
    .input(type({ project_id: 'string', user_id: 'string' }))
    .output(ProjectUserSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdUsersUserId: t.procedure
    .input(
      type({
        project_id: 'string',
        user_id: 'string',
        'role?': type('string | null | null').describe('`owner` or `member`'),
      }),
    )
    .output(ProjectUserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdUsersUserId: t.procedure
    .input(type({ project_id: 'string', user_id: 'string' }))
    .output(ProjectUserDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationRoles: t.procedure
    .input(
      type({
        'limit?': 'number.integer >= 0 & number.integer <= 1000',
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    )
    .output(PublicRoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationRoles: t.procedure
    .input(PublicCreateOrganizationRoleBodySchema)
    .output(RoleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationRolesRoleId: t.procedure
    .input(type({ role_id: 'string' }))
    .output(RoleSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationRolesRoleId: t.procedure
    .input(
      type({
        role_id: 'string',
        'permissions?': type('string[] | null | null').describe(
          'Updated set of permissions for the role.',
        ),
        'description?': type('string | null | null').describe('New description for the role.'),
        'role_name?': type('string | null | null').describe('New name for the role.'),
      }),
    )
    .output(RoleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationRolesRoleId: t.procedure
    .input(type({ role_id: 'string' }))
    .output(RoleDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationSpendAlerts: t.procedure
    .input(
      type({
        'limit?': 'number.integer >= 0 & number.integer <= 100',
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
      }),
    )
    .output(OrganizationSpendAlertListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationSpendAlerts: t.procedure
    .input(CreateSpendAlertBodySchema)
    .output(OrganizationSpendAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationSpendAlertsAlertId: t.procedure
    .input(type({ alert_id: 'string' }))
    .output(OrganizationSpendAlertSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationSpendAlertsAlertId: t.procedure
    .input(
      type({
        alert_id: 'string',
        threshold_amount: type('number.integer >= 0').describe(
          'The alert threshold amount, in cents.',
        ),
        currency: type("'USD'").describe('The currency for the threshold amount.'),
        interval: type("'month'").describe(
          'The time interval for evaluating spend against the threshold.',
        ),
        notification_channel: SpendAlertNotificationChannelSchema,
      }),
    )
    .output(OrganizationSpendAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationSpendAlertsAlertId: t.procedure
    .input(type({ alert_id: 'string' }))
    .output(OrganizationSpendAlertDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageAudioSpeeches: t.procedure
    .input(
      type({
        start_time: 'number.integer',
        'end_time?': 'number.integer',
        'bucket_width?': "'1m' | '1h' | '1d'",
        'project_ids?': 'string[]',
        'user_ids?': 'string[]',
        'api_key_ids?': 'string[]',
        'models?': 'string[]',
        'group_by?': "'project_id' | 'user_id' | 'api_key_id' | 'model'[]",
        'limit?': 'number.integer',
        'page?': 'string',
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageAudioTranscriptions: t.procedure
    .input(
      type({
        start_time: 'number.integer',
        'end_time?': 'number.integer',
        'bucket_width?': "'1m' | '1h' | '1d'",
        'project_ids?': 'string[]',
        'user_ids?': 'string[]',
        'api_key_ids?': 'string[]',
        'models?': 'string[]',
        'group_by?': "'project_id' | 'user_id' | 'api_key_id' | 'model'[]",
        'limit?': 'number.integer',
        'page?': 'string',
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageCodeInterpreterSessions: t.procedure
    .input(
      type({
        start_time: 'number.integer',
        'end_time?': 'number.integer',
        'bucket_width?': "'1m' | '1h' | '1d'",
        'project_ids?': 'string[]',
        'group_by?': "'project_id'[]",
        'limit?': 'number.integer',
        'page?': 'string',
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageCompletions: t.procedure
    .input(
      type({
        start_time: 'number.integer',
        'end_time?': 'number.integer',
        'bucket_width?': "'1m' | '1h' | '1d'",
        'project_ids?': 'string[]',
        'user_ids?': 'string[]',
        'api_key_ids?': 'string[]',
        'models?': 'string[]',
        'batch?': 'boolean',
        'group_by?':
          "'project_id' | 'user_id' | 'api_key_id' | 'model' | 'batch' | 'service_tier' | 'api_source'[]",
        'limit?': 'number.integer',
        'page?': 'string',
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageEmbeddings: t.procedure
    .input(
      type({
        start_time: 'number.integer',
        'end_time?': 'number.integer',
        'bucket_width?': "'1m' | '1h' | '1d'",
        'project_ids?': 'string[]',
        'user_ids?': 'string[]',
        'api_key_ids?': 'string[]',
        'models?': 'string[]',
        'group_by?': "'project_id' | 'user_id' | 'api_key_id' | 'model'[]",
        'limit?': 'number.integer',
        'page?': 'string',
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageFileSearchCalls: t.procedure
    .input(
      type({
        start_time: 'number.integer',
        'end_time?': 'number.integer',
        'bucket_width?': "'1m' | '1h' | '1d'",
        'project_ids?': 'string[]',
        'user_ids?': 'string[]',
        'api_key_ids?': 'string[]',
        'vector_store_ids?': 'string[]',
        'group_by?': "'project_id' | 'user_id' | 'api_key_id' | 'vector_store_id'[]",
        'limit?': 'number.integer',
        'page?': 'string',
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageImages: t.procedure
    .input(
      type({
        start_time: 'number.integer',
        'end_time?': 'number.integer',
        'bucket_width?': "'1m' | '1h' | '1d'",
        'sources?': "'image.generation' | 'image.edit' | 'image.variation'[]",
        'sizes?': "'256x256' | '512x512' | '1024x1024' | '1792x1792' | '1024x1792'[]",
        'project_ids?': 'string[]',
        'user_ids?': 'string[]',
        'api_key_ids?': 'string[]',
        'models?': 'string[]',
        'group_by?': "'project_id' | 'user_id' | 'api_key_id' | 'model' | 'size' | 'source'[]",
        'limit?': 'number.integer',
        'page?': 'string',
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageModerations: t.procedure
    .input(
      type({
        start_time: 'number.integer',
        'end_time?': 'number.integer',
        'bucket_width?': "'1m' | '1h' | '1d'",
        'project_ids?': 'string[]',
        'user_ids?': 'string[]',
        'api_key_ids?': 'string[]',
        'models?': 'string[]',
        'group_by?': "'project_id' | 'user_id' | 'api_key_id' | 'model'[]",
        'limit?': 'number.integer',
        'page?': 'string',
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageVectorStores: t.procedure
    .input(
      type({
        start_time: 'number.integer',
        'end_time?': 'number.integer',
        'bucket_width?': "'1m' | '1h' | '1d'",
        'project_ids?': 'string[]',
        'group_by?': "'project_id'[]",
        'limit?': 'number.integer',
        'page?': 'string',
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageWebSearchCalls: t.procedure
    .input(
      type({
        start_time: 'number.integer',
        'end_time?': 'number.integer',
        'bucket_width?': "'1m' | '1h' | '1d'",
        'project_ids?': 'string[]',
        'user_ids?': 'string[]',
        'api_key_ids?': 'string[]',
        'models?': 'string[]',
        'context_levels?': "'low' | 'medium' | 'high'[]",
        'group_by?':
          "'project_id' | 'user_id' | 'api_key_id' | 'model' | 'context_level' | 'api_source'[]",
        'limit?': 'number.integer',
        'page?': 'string',
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsers: t.procedure
    .input(type({ 'limit?': 'number.integer', 'after?': 'string', 'emails?': 'string[]' }))
    .output(UserListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsersUserId: t.procedure
    .input(type({ user_id: 'string' }))
    .output(UserSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationUsersUserId: t.procedure
    .input(
      type({
        user_id: 'string',
        'role?': type('string | null | null').describe('`owner` or `reader`'),
        'role_id?': type('string | null | null').describe('Role ID to assign to the user.'),
        'technical_level?': type('string | null | null').describe('Technical level metadata.'),
        'developer_persona?': type('string | null | null').describe('Developer persona metadata.'),
      }),
    )
    .output(UserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationUsersUserId: t.procedure
    .input(type({ user_id: 'string' }))
    .output(UserDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsersUserIdRoles: t.procedure
    .input(
      type({
        user_id: 'string',
        'limit?': 'number.integer >= 0 & number.integer <= 1000',
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    )
    .output(RoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationUsersUserIdRoles: t.procedure
    .input(
      type({
        user_id: 'string',
        role_id: type('string').describe('Identifier of the role to assign.'),
      }),
    )
    .output(UserRoleAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsersUserIdRolesRoleId: t.procedure
    .input(type({ user_id: 'string', role_id: 'string' }))
    .output(AssignedRoleDetailsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationUsersUserIdRolesRoleId: t.procedure
    .input(type({ user_id: 'string', role_id: 'string' }))
    .output(DeletedRoleAssignmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationExternalKeys: t.procedure
    .input(
      type({
        'limit?': 'number.integer >= 0 & number.integer <= 100',
        'order?': OrderEnumSchema,
        'after?': 'string | null | null',
        'purpose?': ExternalKeyPurposeSchema,
      }),
    )
    .output(ListExternalKeysResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationExternalKeys: t.procedure
    .input(V1OrganizationExternalKeysPostRequestSchema)
    .output(ExternalKeyResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationExternalKeysExternalKeyId: t.procedure
    .input(type({ external_key_id: 'string' }))
    .output(ExternalKeyResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationExternalKeysExternalKeyId: t.procedure
    .input(type({ external_key_id: 'string' }))
    .output(ExternalKeyResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationExternalKeysExternalKeyIdValidate: t.procedure
    .input(type({ external_key_id: 'string' }))
    .output(ValidateExternalKeyResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProviders: t.procedure
    .input(
      type({
        'limit?': 'number.integer >= 1 & number.integer <= 100',
        'order?': "'asc' | 'desc'",
        'after?': type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    )
    .output(PlatformProviderListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationWorkloadIdentityProviders: t.procedure
    .input(CreatePlatformWorkloadIdentityProviderBodySchema)
    .output(PlatformProviderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: t.procedure
    .input(
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    )
    .output(PlatformProviderSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: t.procedure
    .input(
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        'name?': type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        'issuer?': type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        'audience?': type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        'verification?': type(DiscoveryVerificationParamSchema).or(
          UploadedJwksVerificationParamSchema,
        ),
        'description?': 'string | null | null',
        'attribute_transformations?': type(type(TransformationParamSchema).array()).and(
          type('unknown[] <= 20'),
        ),
        'enabled?': 'boolean',
      }),
    )
    .output(PlatformProviderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: t.procedure
    .input(
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    )
    .output(PlatformProviderDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules: t.procedure
    .input(
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        'limit?': 'number.integer >= 1 & number.integer <= 100',
        'order?': "'asc' | 'desc'",
        'after?': type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        'service_account_id?': type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    )
    .output(PlatformFederationRuleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules: t.procedure
    .input(
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        project_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        service_account_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        'name?': 'string',
        'description?': 'string',
        attribute_matchers: type({ '[string]': 'string | boolean | number.integer | number' }),
        'permissions?': type(DefaultPermissionsParamSchema).or(RestrictedPermissionsParamSchema),
        'enabled?': 'boolean',
      }),
    )
    .output(PlatformFederationRuleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    t.procedure
      .input(
        type({
          workload_identity_provider_id: type('string').narrow(
            (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
          ),
          workload_identity_federation_rule_id: type('string').narrow(
            (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
          ),
        }),
      )
      .output(PlatformFederationRuleSchema)
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    t.procedure
      .input(
        type({
          workload_identity_provider_id: type('string').narrow(
            (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
          ),
          workload_identity_federation_rule_id: type('string').narrow(
            (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
          ),
          'name?': 'string | null | null',
          'description?': 'string | null | null',
          'attribute_matchers?': type({ '[string]': 'string | boolean | number.integer | number' }),
          'permissions?': type(DefaultPermissionsParamSchema).or(RestrictedPermissionsParamSchema),
          'enabled?': 'boolean',
        }),
      )
      .output(PlatformFederationRuleSchema)
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    t.procedure
      .input(
        type({
          workload_identity_provider_id: type('string').narrow(
            (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
          ),
          workload_identity_federation_rule_id: type('string').narrow(
            (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
          ),
        }),
      )
      .output(PlatformFederationRuleDeletedResourceSchema)
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  getOrganizationUsageDecisions: t.procedure
    .input(
      type({
        start_time: 'number.integer',
        'end_time?': 'number.integer | null | null',
        'bucket_width?': type(
          DecisionsUsageBucketWidthSchema.describe(
            'Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.',
          ),
        ).or('null | null'),
        'limit?': 'number.integer | null | null',
        'page?': type(
          type('string').describe(
            'A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.',
          ),
        ).or('null | null'),
        'project_ids?': type(type('string[]').describe('Return only usage for these projects.')).or(
          'null | null',
        ),
        'group_by?': type(
          type(DecisionsUsageGroupBySchema)
            .array()
            .describe(
              'Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier`, `api_source` or any combination of them. When grouped by `api_source`, results use `agents_api` for attributed Agents API activity and `unlabeled` for all other activity. Without source grouping, `api_source` is null.',
            ),
        ).or('null | null'),
        'user_ids?': type(type('string[]').describe('Return only usage for these users.')).or(
          'null | null',
        ),
        'api_key_ids?': type(type('string[]').describe('Return only usage for these API keys.')).or(
          'null | null',
        ),
        'models?': type(type('string[]').describe('Return only usage for these models.')).or(
          'null | null',
        ),
        'batch?': 'boolean | null | null',
      }),
    )
    .output(PublicDecisionsUsageResponseResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationExternalStorage: t.procedure
    .input(
      type({
        'project_id?': 'string | null | null',
        'after?': type(
          type('string').describe('Return external storage configurations after this ID.'),
        ).or('null | null'),
        'order?': ExternalStorageOrderSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 100',
      }),
    )
    .output(ExternalStorageListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationExternalStorage: t.procedure
    .input(CreateExternalStorageBodySchema)
    .output(ExternalStorageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationExternalStorageExternalStorageId: t.procedure
    .input(type({ external_storage_id: 'string' }))
    .output(ExternalStorageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationExternalStorageExternalStorageId: t.procedure
    .input(type({ external_storage_id: 'string' }))
    .output(ExternalStorageDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationExternalStorageExternalStorageIdValidate: t.procedure
    .input(type({ external_storage_id: 'string' }))
    .output(ExternalStorageResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationSpendLimit: t.procedure.output(OrganizationSpendLimitResourceSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postOrganizationSpendLimit: t.procedure
    .input(UpdateOrganizationSpendLimitBodySchema)
    .output(OrganizationSpendLimitResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationSpendLimit: t.procedure
    .output(OrganizationSpendLimitDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdSpendLimit: t.procedure
    .input(type({ project_id: 'string' }))
    .output(ProjectSpendLimitResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdSpendLimit: t.procedure
    .input(
      type({
        project_id: 'string',
        threshold_amount: type('number.integer >= 1').describe(
          'The hard spend limit amount, in cents.',
        ),
        currency: type("'USD'").describe(
          'The currency for the threshold amount. Currently, only `USD` is supported.',
        ),
        interval: type("'month'").describe(
          'The time interval for evaluating spend against the threshold. Currently, only `month` is supported.',
        ),
        'notification_channel?': type(
          SpendLimitEmailNotificationChannelParamsSchema.describe(
            'Configure email notifications when the spend limit is reached. Leave this out to keep the current settings, or send null to reset to owner-only notifications.',
          ),
        ).or('null | null'),
      }),
    )
    .output(ProjectSpendLimitResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdSpendLimit: t.procedure
    .input(type({ project_id: 'string' }))
    .output(ProjectSpendLimitDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdServiceTierSettings: t.procedure
    .input(type({ project_id: type('string').describe('The ID of the project') }))
    .output(ProjectServiceTierSettingsResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceTierSettings: t.procedure
    .input(
      type({
        project_id: type('string').describe('The ID of the project'),
        'default?': ProjectDefaultServiceTierSchema.describe(
          'Default tier for requests that omit service_tier or use auto.',
        ),
        'enabled_tiers?': type("'all'")
          .or(type(ProjectOptionalServiceTierSchema).array())
          .describe(
            'Additional service tiers enabled for this project. "all" includes future tiers. An empty array allows only Standard. Organization policy and eligibility still apply.',
          ),
      }),
    )
    .output(ProjectServiceTierSettingsResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeys: t.procedure
    .input(
      type({
        project_id: type('string').describe('The ID of the project.'),
        service_account_id: type('string').describe('The ID of the service account.'),
        'name?': type('string').describe('API key name.'),
        'scopes?': type(type('string').describe('API key scope.'))
          .array()
          .describe('API key scopes.'),
        'expires_in_seconds?': type(
          type('number.integer >= 1 & number.integer <= 31536000').describe(
            'Number of seconds until the API key expires.',
          ),
        ).or('null | null'),
      }),
    )
    .output(ServiceAccountApiKeyBodySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
