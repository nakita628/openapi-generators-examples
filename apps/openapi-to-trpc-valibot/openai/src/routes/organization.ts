import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.object({
        after: v.optional(
          v.pipe(
            v.nullable(v.string()),
            v.description('Return keys with IDs that come after this ID in the pagination order.'),
          ),
        ),
        order: v.pipe(
          v.optional(v.picklist(['asc', 'desc']), 'asc'),
          v.description('Order results by creation time, ascending or descending.'),
        ),
        limit: v.pipe(
          v.optional(v.pipe(v.number(), v.integer()), 20),
          v.description('Maximum number of keys to return.'),
        ),
      }),
    )
    .output(ApiKeyListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationAdminApiKeys: t.procedure
    .input(
      v.object({
        name: v.pipe(v.string(), v.metadata({ examples: ['New Admin Key'] })),
        expires_in_seconds: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(31536000)),
            v.description(
              'The number of seconds until the API key expires. Omit this field for a key that does not expire.',
            ),
            v.metadata({ examples: [2592000] }),
          ),
        ),
      }),
    )
    .output(AdminApiKeyCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationAdminApiKeysKeyId: t.procedure
    .input(v.object({ key_id: v.pipe(v.string(), v.description('The ID of the API key.')) }))
    .output(AdminApiKeySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationAdminApiKeysKeyId: t.procedure
    .input(
      v.object({
        key_id: v.pipe(v.string(), v.description('The ID of the API key to be deleted.')),
      }),
    )
    .output(
      v.object({
        id: v.pipe(v.string(), v.metadata({ examples: ['key_abc'] })),
        object: v.pipe(
          v.literal('organization.admin_api_key.deleted'),
          v.metadata({ examples: ['organization.admin_api_key.deleted'] }),
        ),
        deleted: v.pipe(v.boolean(), v.metadata({ examples: [true] })),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationAuditLogs: t.procedure
    .input(
      v.object({
        effective_at: v.optional(
          v.partial(
            v.object({
              gt: v.pipe(
                v.pipe(v.number(), v.integer()),
                v.description(
                  'Return only events whose `effective_at` (Unix seconds) is greater than this value.',
                ),
              ),
              gte: v.pipe(
                v.pipe(v.number(), v.integer()),
                v.description(
                  'Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.',
                ),
              ),
              lt: v.pipe(
                v.pipe(v.number(), v.integer()),
                v.description(
                  'Return only events whose `effective_at` (Unix seconds) is less than this value.',
                ),
              ),
              lte: v.pipe(
                v.pipe(v.number(), v.integer()),
                v.description(
                  'Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.',
                ),
              ),
            }),
          ),
        ),
        'project_ids[]': v.optional(v.array(v.string())),
        'event_types[]': v.optional(v.array(AuditLogEventTypeSchema)),
        'actor_ids[]': v.optional(v.array(v.string())),
        'actor_emails[]': v.optional(v.array(v.string())),
        'resource_ids[]': v.optional(v.array(v.string())),
        tenant_only: v.optional(v.boolean(), false),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
      }),
    )
    .output(ListAuditLogsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationCertificates: t.procedure
    .input(
      v.object({
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
      }),
    )
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
    .input(
      v.object({ certificate_id: v.string(), include: v.optional(v.array(v.literal('content'))) }),
    )
    .output(CertificateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationCertificatesCertificateId: t.procedure
    .input(
      v.object({
        certificate_id: v.string(),
        name: v.optional(v.pipe(v.string(), v.description('The updated name for the certificate'))),
      }),
    )
    .output(CertificateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationCertificatesCertificateId: t.procedure
    .input(v.object({ certificate_id: v.string() }))
    .output(DeleteCertificateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationCosts: t.procedure
    .input(
      v.object({
        start_time: v.pipe(v.number(), v.integer()),
        end_time: v.optional(v.pipe(v.number(), v.integer())),
        bucket_width: v.optional(v.literal('1d'), '1d'),
        project_ids: v.optional(v.array(v.string())),
        api_key_ids: v.optional(v.array(v.string())),
        line_items: v.optional(v.array(v.string())),
        group_by: v.optional(
          v.array(v.picklist(['project_id', 'user_id', 'line_item', 'api_key_id', 'api_source'])),
        ),
        limit: v.optional(v.pipe(v.number(), v.integer()), 7),
        page: v.optional(v.string()),
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
      v.object({
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(1000)), 100),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
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
    .input(v.object({ group_id: v.string() }))
    .output(GroupResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroupsGroupId: t.procedure
    .input(
      v.object({
        group_id: v.string(),
        name: v.pipe(
          v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(255)),
          v.description('New display name for the group.'),
        ),
      }),
    )
    .output(GroupResourceWithSuccessSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationGroupsGroupId: t.procedure
    .input(v.object({ group_id: v.string() }))
    .output(GroupDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdRoles: t.procedure
    .input(
      v.object({
        group_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(1000))),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc'])),
      }),
    )
    .output(RoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroupsGroupIdRoles: t.procedure
    .input(
      v.object({
        group_id: v.string(),
        role_id: v.pipe(v.string(), v.description('Identifier of the role to assign.')),
      }),
    )
    .output(GroupRoleAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdRolesRoleId: t.procedure
    .input(v.object({ group_id: v.string(), role_id: v.string() }))
    .output(AssignedRoleDetailsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationGroupsGroupIdRolesRoleId: t.procedure
    .input(v.object({ group_id: v.string(), role_id: v.string() }))
    .output(DeletedRoleAssignmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdUsers: t.procedure
    .input(
      v.object({
        group_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(1000)), 100),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
      }),
    )
    .output(UserListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroupsGroupIdUsers: t.procedure
    .input(
      v.object({
        group_id: v.string(),
        user_id: v.pipe(v.string(), v.description('Identifier of the user to add to the group.')),
      }),
    )
    .output(GroupUserAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdUsersUserId: t.procedure
    .input(v.object({ group_id: v.string(), user_id: v.string() }))
    .output(GroupMemberUserSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationGroupsGroupIdUsersUserId: t.procedure
    .input(v.object({ group_id: v.string(), user_id: v.string() }))
    .output(GroupUserDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationInvites: t.procedure
    .input(
      v.object({
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        after: v.optional(v.string()),
      }),
    )
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
    .input(v.object({ invite_id: v.string() }))
    .output(InviteSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationInvitesInviteId: t.procedure
    .input(v.object({ invite_id: v.string() }))
    .output(InviteDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjects: t.procedure
    .input(
      v.object({
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        after: v.optional(v.string()),
        include_archived: v.optional(v.boolean(), false),
      }),
    )
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
    .input(v.object({ project_id: v.string() }))
    .output(ProjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectId: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        name: v.optional(
          v.pipe(
            v.union([v.string(), v.nullable(v.null())]),
            v.description('The updated name of the project, this name appears in reports.'),
          ),
        ),
        external_key_id: v.optional(
          v.pipe(
            v.union([v.string(), v.nullable(v.null())]),
            v.description('External key ID to associate with the project.'),
          ),
        ),
        geography: v.optional(
          v.pipe(
            v.union([v.string(), v.nullable(v.null())]),
            v.description(
              'Geography for the project.\nDeprecated: use `residency` when creating a project to configure data residency. This field is retained for backward compatibility.',
            ),
            v.metadata({ deprecated: true }),
          ),
        ),
      }),
    )
    .output(ProjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdApiKeys: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        after: v.optional(v.string()),
        owner_project_access: v.optional(v.picklist(['active', 'inactive', 'any'])),
      }),
    )
    .output(ProjectApiKeyListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdApiKeysApiKeyId: t.procedure
    .input(v.object({ project_id: v.string(), api_key_id: v.string() }))
    .output(ProjectApiKeySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdApiKeysApiKeyId: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        api_key_id: v.string(),
        expires_in_seconds: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(31536000)),
            v.description(
              'Number of seconds from this request until the API key expires. Must comply with the organization and project expiry policies. Expired keys cannot be updated. Retrying resets the expiry relative to the new request. Omit to keep the current expiration.',
            ),
          ),
        ),
        scopes: v.optional(
          v.pipe(
            v.array(v.string()),
            v.description(
              'Replace the API key scope restrictions. Omit to leave scopes unchanged. An empty array removes key restrictions (All permissions), subject to the owner\'s effective permissions. Use ["api.all.read"] for read-only access. Scopes do not change the owner\'s roles or grant administrative permissions.',
            ),
          ),
        ),
      }),
    )
    .output(ProjectApiKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdApiKeysApiKeyId: t.procedure
    .input(v.object({ project_id: v.string(), api_key_id: v.string() }))
    .output(ProjectApiKeyDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdArchive: t.procedure
    .input(v.object({ project_id: v.string() }))
    .output(ProjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdCertificates: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
      }),
    )
    .output(ListProjectCertificatesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdCertificatesActivate: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        certificate_ids: v.pipe(
          v.array(v.pipe(v.string(), v.metadata({ examples: ['cert_abc'] }))),
          v.minLength(1),
          v.maxLength(10),
        ),
      }),
    )
    .output(OrganizationProjectCertificateActivationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdCertificatesDeactivate: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        certificate_ids: v.pipe(
          v.array(v.pipe(v.string(), v.metadata({ examples: ['cert_abc'] }))),
          v.minLength(1),
          v.maxLength(10),
        ),
      }),
    )
    .output(OrganizationProjectCertificateDeactivationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdDataRetention: t.procedure
    .input(v.object({ project_id: v.string() }))
    .output(ProjectDataRetentionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdDataRetention: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        retention_type: v.pipe(
          v.picklist([
            'organization_default',
            'none',
            'zero_data_retention',
            'modified_abuse_monitoring',
            'enhanced_zero_data_retention',
            'enhanced_modified_abuse_monitoring',
          ]),
          v.description('The desired project data retention type.'),
        ),
      }),
    )
    .output(ProjectDataRetentionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdGroups: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100)), 20),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    )
    .output(ProjectGroupListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdGroups: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        group_id: v.pipe(
          v.string(),
          v.description('Identifier of the group to add to the project.'),
        ),
        role: v.pipe(
          v.string(),
          v.description('Identifier of the project role to grant to the group.'),
        ),
      }),
    )
    .output(ProjectGroupSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdGroupsGroupId: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        group_id: v.string(),
        group_type: v.optional(v.picklist(['group', 'tenant_group']), 'group'),
      }),
    )
    .output(ProjectGroupSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdGroupsGroupId: t.procedure
    .input(v.object({ project_id: v.string(), group_id: v.string() }))
    .output(ProjectGroupDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdHostedToolPermissions: t.procedure
    .input(v.object({ project_id: v.string() }))
    .output(ProjectHostedToolPermissionsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdHostedToolPermissions: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        file_search: v.optional(
          v.pipe(
            v.union([HostedToolPermissionUpdateSchema, v.nullable(v.null())]),
            v.description('The file search permission update.'),
          ),
        ),
        web_search: v.optional(
          v.pipe(
            v.union([HostedToolPermissionUpdateSchema, v.nullable(v.null())]),
            v.description('The web search permission update.'),
          ),
        ),
        image_generation: v.optional(
          v.pipe(
            v.union([HostedToolPermissionUpdateSchema, v.nullable(v.null())]),
            v.description('The image generation permission update.'),
          ),
        ),
        mcp: v.optional(
          v.pipe(
            v.union([HostedToolPermissionUpdateSchema, v.nullable(v.null())]),
            v.description('The MCP permission update.'),
          ),
        ),
        code_interpreter: v.optional(
          v.pipe(
            v.union([HostedToolPermissionUpdateSchema, v.nullable(v.null())]),
            v.description('The code interpreter permission update.'),
          ),
        ),
      }),
    )
    .output(ProjectHostedToolPermissionsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdModelPermissions: t.procedure
    .input(v.object({ project_id: v.string() }))
    .output(ProjectModelPermissionsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdModelPermissions: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        mode: v.pipe(
          v.picklist(['allow_list', 'deny_list']),
          v.description('The model permissions mode to apply.'),
        ),
        model_ids: v.pipe(
          v.array(v.string()),
          v.description('The model IDs included in this permissions policy.'),
        ),
      }),
    )
    .output(ProjectModelPermissionsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdModelPermissions: t.procedure
    .input(v.object({ project_id: v.string() }))
    .output(ProjectModelPermissionsDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdRateLimits: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer()), 100),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
      }),
    )
    .output(ProjectRateLimitListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdRateLimitsRateLimitId: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        rate_limit_id: v.string(),
        max_requests_per_1_minute: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description('The maximum requests per minute.'),
          ),
        ),
        max_tokens_per_1_minute: v.optional(
          v.pipe(v.pipe(v.number(), v.integer()), v.description('The maximum tokens per minute.')),
        ),
        max_images_per_1_minute: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description('The maximum images per minute. Only relevant for certain models.'),
          ),
        ),
        max_audio_megabytes_per_1_minute: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The maximum audio megabytes per minute. Only relevant for certain models.',
            ),
          ),
        ),
        max_requests_per_1_day: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description('The maximum requests per day. Only relevant for certain models.'),
          ),
        ),
        batch_1_day_max_input_tokens: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'The maximum batch input tokens per day. Only relevant for certain models.',
            ),
          ),
        ),
      }),
    )
    .output(ProjectRateLimitSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdServiceAccounts: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        after: v.optional(v.string()),
      }),
    )
    .output(ProjectServiceAccountListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceAccounts: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        name: v.pipe(v.string(), v.description('The name of the service account being created.')),
        create_service_account_only: v.optional(
          v.union([
            v.pipe(
              v.boolean(),
              v.description('Create the service account without default roles or an API key.'),
            ),
            v.nullable(v.null()),
          ]),
        ),
        expires_in_seconds: v.optional(
          v.pipe(
            v.union([
              v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(31536000)),
              v.nullable(v.null()),
            ]),
            v.description(
              'Number of seconds until the initial API key expires. If omitted or null, the key does not expire unless the effective organization or project policy requires an expiration. When a policy sets a maximum lifetime, this value must be provided and must not exceed that limit. A non-null value cannot be used when `create_service_account_only` is true.',
            ),
          ),
        ),
      }),
    )
    .output(ProjectServiceAccountCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdServiceAccountsServiceAccountId: t.procedure
    .input(v.object({ project_id: v.string(), service_account_id: v.string() }))
    .output(ProjectServiceAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceAccountsServiceAccountId: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        service_account_id: v.string(),
        name: v.optional(v.pipe(v.string(), v.description('The updated service account name.'))),
        role: v.optional(
          v.pipe(
            v.picklist(['member', 'owner']),
            v.description('The updated service account role.'),
          ),
        ),
      }),
    )
    .output(ProjectServiceAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdServiceAccountsServiceAccountId: t.procedure
    .input(v.object({ project_id: v.string(), service_account_id: v.string() }))
    .output(ProjectServiceAccountDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdSpendAlerts: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100))),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
      }),
    )
    .output(ProjectSpendAlertListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdSpendAlerts: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        threshold_amount: v.pipe(
          v.pipe(v.number(), v.integer(), v.minValue(0)),
          v.description('The alert threshold amount, in cents.'),
        ),
        currency: v.pipe(v.literal('USD'), v.description('The currency for the threshold amount.')),
        interval: v.pipe(
          v.literal('month'),
          v.description('The time interval for evaluating spend against the threshold.'),
        ),
        notification_channel: SpendAlertNotificationChannelSchema,
      }),
    )
    .output(ProjectSpendAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdSpendAlertsAlertId: t.procedure
    .input(v.object({ project_id: v.string(), alert_id: v.string() }))
    .output(ProjectSpendAlertSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdSpendAlertsAlertId: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        alert_id: v.string(),
        threshold_amount: v.pipe(
          v.pipe(v.number(), v.integer(), v.minValue(0)),
          v.description('The alert threshold amount, in cents.'),
        ),
        currency: v.pipe(v.literal('USD'), v.description('The currency for the threshold amount.')),
        interval: v.pipe(
          v.literal('month'),
          v.description('The time interval for evaluating spend against the threshold.'),
        ),
        notification_channel: SpendAlertNotificationChannelSchema,
      }),
    )
    .output(ProjectSpendAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdSpendAlertsAlertId: t.procedure
    .input(v.object({ project_id: v.string(), alert_id: v.string() }))
    .output(ProjectSpendAlertDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdUsers: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        after: v.optional(v.string()),
      }),
    )
    .output(ProjectUserListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdUsers: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        user_id: v.optional(
          v.pipe(v.union([v.string(), v.nullable(v.null())]), v.description('The ID of the user.')),
        ),
        email: v.optional(
          v.pipe(
            v.union([v.string(), v.nullable(v.null())]),
            v.description('Email of the user to add.'),
          ),
        ),
        role: v.pipe(v.string(), v.description('`owner` or `member`')),
      }),
    )
    .output(ProjectUserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdUsersUserId: t.procedure
    .input(v.object({ project_id: v.string(), user_id: v.string() }))
    .output(ProjectUserSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdUsersUserId: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        user_id: v.string(),
        role: v.optional(
          v.pipe(v.union([v.string(), v.nullable(v.null())]), v.description('`owner` or `member`')),
        ),
      }),
    )
    .output(ProjectUserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdUsersUserId: t.procedure
    .input(v.object({ project_id: v.string(), user_id: v.string() }))
    .output(ProjectUserDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationRoles: t.procedure
    .input(
      v.object({
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(1000)), 1000),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
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
    .input(v.object({ role_id: v.string() }))
    .output(RoleSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationRolesRoleId: t.procedure
    .input(
      v.object({
        role_id: v.string(),
        permissions: v.optional(
          v.pipe(
            v.union([v.array(v.string()), v.nullable(v.null())]),
            v.description('Updated set of permissions for the role.'),
          ),
        ),
        description: v.optional(
          v.pipe(
            v.union([v.string(), v.nullable(v.null())]),
            v.description('New description for the role.'),
          ),
        ),
        role_name: v.optional(
          v.pipe(
            v.union([v.string(), v.nullable(v.null())]),
            v.description('New name for the role.'),
          ),
        ),
      }),
    )
    .output(RoleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationRolesRoleId: t.procedure
    .input(v.object({ role_id: v.string() }))
    .output(RoleDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationSpendAlerts: t.procedure
    .input(
      v.object({
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100))),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
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
    .input(v.object({ alert_id: v.string() }))
    .output(OrganizationSpendAlertSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationSpendAlertsAlertId: t.procedure
    .input(
      v.object({
        alert_id: v.string(),
        threshold_amount: v.pipe(
          v.pipe(v.number(), v.integer(), v.minValue(0)),
          v.description('The alert threshold amount, in cents.'),
        ),
        currency: v.pipe(v.literal('USD'), v.description('The currency for the threshold amount.')),
        interval: v.pipe(
          v.literal('month'),
          v.description('The time interval for evaluating spend against the threshold.'),
        ),
        notification_channel: SpendAlertNotificationChannelSchema,
      }),
    )
    .output(OrganizationSpendAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationSpendAlertsAlertId: t.procedure
    .input(v.object({ alert_id: v.string() }))
    .output(OrganizationSpendAlertDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageAudioSpeeches: t.procedure
    .input(
      v.object({
        start_time: v.pipe(v.number(), v.integer()),
        end_time: v.optional(v.pipe(v.number(), v.integer())),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
        project_ids: v.optional(v.array(v.string())),
        user_ids: v.optional(v.array(v.string())),
        api_key_ids: v.optional(v.array(v.string())),
        models: v.optional(v.array(v.string())),
        group_by: v.optional(v.array(v.picklist(['project_id', 'user_id', 'api_key_id', 'model']))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        page: v.optional(v.string()),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageAudioTranscriptions: t.procedure
    .input(
      v.object({
        start_time: v.pipe(v.number(), v.integer()),
        end_time: v.optional(v.pipe(v.number(), v.integer())),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
        project_ids: v.optional(v.array(v.string())),
        user_ids: v.optional(v.array(v.string())),
        api_key_ids: v.optional(v.array(v.string())),
        models: v.optional(v.array(v.string())),
        group_by: v.optional(v.array(v.picklist(['project_id', 'user_id', 'api_key_id', 'model']))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        page: v.optional(v.string()),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageCodeInterpreterSessions: t.procedure
    .input(
      v.object({
        start_time: v.pipe(v.number(), v.integer()),
        end_time: v.optional(v.pipe(v.number(), v.integer())),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
        project_ids: v.optional(v.array(v.string())),
        group_by: v.optional(v.array(v.literal('project_id'))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        page: v.optional(v.string()),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageCompletions: t.procedure
    .input(
      v.object({
        start_time: v.pipe(v.number(), v.integer()),
        end_time: v.optional(v.pipe(v.number(), v.integer())),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
        project_ids: v.optional(v.array(v.string())),
        user_ids: v.optional(v.array(v.string())),
        api_key_ids: v.optional(v.array(v.string())),
        models: v.optional(v.array(v.string())),
        batch: v.optional(v.boolean()),
        group_by: v.optional(
          v.array(
            v.picklist([
              'project_id',
              'user_id',
              'api_key_id',
              'model',
              'batch',
              'service_tier',
              'api_source',
            ]),
          ),
        ),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        page: v.optional(v.string()),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageEmbeddings: t.procedure
    .input(
      v.object({
        start_time: v.pipe(v.number(), v.integer()),
        end_time: v.optional(v.pipe(v.number(), v.integer())),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
        project_ids: v.optional(v.array(v.string())),
        user_ids: v.optional(v.array(v.string())),
        api_key_ids: v.optional(v.array(v.string())),
        models: v.optional(v.array(v.string())),
        group_by: v.optional(v.array(v.picklist(['project_id', 'user_id', 'api_key_id', 'model']))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        page: v.optional(v.string()),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageFileSearchCalls: t.procedure
    .input(
      v.object({
        start_time: v.pipe(v.number(), v.integer()),
        end_time: v.optional(v.pipe(v.number(), v.integer())),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
        project_ids: v.optional(v.array(v.string())),
        user_ids: v.optional(v.array(v.string())),
        api_key_ids: v.optional(v.array(v.string())),
        vector_store_ids: v.optional(v.array(v.string())),
        group_by: v.optional(
          v.array(v.picklist(['project_id', 'user_id', 'api_key_id', 'vector_store_id'])),
        ),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        page: v.optional(v.string()),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageImages: t.procedure
    .input(
      v.object({
        start_time: v.pipe(v.number(), v.integer()),
        end_time: v.optional(v.pipe(v.number(), v.integer())),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
        sources: v.optional(
          v.array(v.picklist(['image.generation', 'image.edit', 'image.variation'])),
        ),
        sizes: v.optional(
          v.array(v.picklist(['256x256', '512x512', '1024x1024', '1792x1792', '1024x1792'])),
        ),
        project_ids: v.optional(v.array(v.string())),
        user_ids: v.optional(v.array(v.string())),
        api_key_ids: v.optional(v.array(v.string())),
        models: v.optional(v.array(v.string())),
        group_by: v.optional(
          v.array(v.picklist(['project_id', 'user_id', 'api_key_id', 'model', 'size', 'source'])),
        ),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        page: v.optional(v.string()),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageModerations: t.procedure
    .input(
      v.object({
        start_time: v.pipe(v.number(), v.integer()),
        end_time: v.optional(v.pipe(v.number(), v.integer())),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
        project_ids: v.optional(v.array(v.string())),
        user_ids: v.optional(v.array(v.string())),
        api_key_ids: v.optional(v.array(v.string())),
        models: v.optional(v.array(v.string())),
        group_by: v.optional(v.array(v.picklist(['project_id', 'user_id', 'api_key_id', 'model']))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        page: v.optional(v.string()),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageVectorStores: t.procedure
    .input(
      v.object({
        start_time: v.pipe(v.number(), v.integer()),
        end_time: v.optional(v.pipe(v.number(), v.integer())),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
        project_ids: v.optional(v.array(v.string())),
        group_by: v.optional(v.array(v.literal('project_id'))),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        page: v.optional(v.string()),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageWebSearchCalls: t.procedure
    .input(
      v.object({
        start_time: v.pipe(v.number(), v.integer()),
        end_time: v.optional(v.pipe(v.number(), v.integer())),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
        project_ids: v.optional(v.array(v.string())),
        user_ids: v.optional(v.array(v.string())),
        api_key_ids: v.optional(v.array(v.string())),
        models: v.optional(v.array(v.string())),
        context_levels: v.optional(v.array(v.picklist(['low', 'medium', 'high']))),
        group_by: v.optional(
          v.array(
            v.picklist([
              'project_id',
              'user_id',
              'api_key_id',
              'model',
              'context_level',
              'api_source',
            ]),
          ),
        ),
        limit: v.optional(v.pipe(v.number(), v.integer())),
        page: v.optional(v.string()),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsers: t.procedure
    .input(
      v.object({
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        after: v.optional(v.string()),
        emails: v.optional(v.array(v.string())),
      }),
    )
    .output(UserListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsersUserId: t.procedure
    .input(v.object({ user_id: v.string() }))
    .output(UserSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationUsersUserId: t.procedure
    .input(
      v.object({
        user_id: v.string(),
        role: v.optional(
          v.pipe(v.union([v.string(), v.nullable(v.null())]), v.description('`owner` or `reader`')),
        ),
        role_id: v.optional(
          v.pipe(
            v.union([v.string(), v.nullable(v.null())]),
            v.description('Role ID to assign to the user.'),
          ),
        ),
        technical_level: v.optional(
          v.pipe(
            v.union([v.string(), v.nullable(v.null())]),
            v.description('Technical level metadata.'),
          ),
        ),
        developer_persona: v.optional(
          v.pipe(
            v.union([v.string(), v.nullable(v.null())]),
            v.description('Developer persona metadata.'),
          ),
        ),
      }),
    )
    .output(UserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationUsersUserId: t.procedure
    .input(v.object({ user_id: v.string() }))
    .output(UserDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsersUserIdRoles: t.procedure
    .input(
      v.object({
        user_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(1000))),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc'])),
      }),
    )
    .output(RoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationUsersUserIdRoles: t.procedure
    .input(
      v.object({
        user_id: v.string(),
        role_id: v.pipe(v.string(), v.description('Identifier of the role to assign.')),
      }),
    )
    .output(UserRoleAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsersUserIdRolesRoleId: t.procedure
    .input(v.object({ user_id: v.string(), role_id: v.string() }))
    .output(AssignedRoleDetailsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationUsersUserIdRolesRoleId: t.procedure
    .input(v.object({ user_id: v.string(), role_id: v.string() }))
    .output(DeletedRoleAssignmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationExternalKeys: t.procedure
    .input(
      v.partial(
        v.object({
          limit: v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100)),
          order: OrderEnumSchema,
          after: v.union([v.string(), v.nullable(v.null())]),
          purpose: ExternalKeyPurposeSchema,
        }),
      ),
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
    .input(v.object({ external_key_id: v.string() }))
    .output(ExternalKeyResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationExternalKeysExternalKeyId: t.procedure
    .input(v.object({ external_key_id: v.string() }))
    .output(ExternalKeyResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationExternalKeysExternalKeyIdValidate: t.procedure
    .input(v.object({ external_key_id: v.string() }))
    .output(ValidateExternalKeyResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProviders: t.procedure
    .input(
      v.partial(
        v.object({
          limit: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100)),
          order: v.union([
            v.optional(v.literal('asc'), 'asc'),
            v.optional(v.literal('desc'), 'desc'),
          ]),
          after: v.pipe(v.string(), v.minCodePoints(1)),
        }),
      ),
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
    .input(v.object({ workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)) }))
    .output(PlatformProviderSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: t.procedure
    .input(
      v.object({
        workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
        name: v.optional(v.pipe(v.string(), v.minCodePoints(1))),
        issuer: v.optional(v.pipe(v.string(), v.minCodePoints(1))),
        audience: v.optional(v.pipe(v.string(), v.minCodePoints(1))),
        verification: v.optional(
          v.union([DiscoveryVerificationParamSchema, UploadedJwksVerificationParamSchema]),
        ),
        description: v.optional(v.union([v.string(), v.nullable(v.null())])),
        attribute_transformations: v.optional(
          v.pipe(v.array(TransformationParamSchema), v.maxLength(20)),
        ),
        enabled: v.optional(v.boolean()),
      }),
    )
    .output(PlatformProviderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: t.procedure
    .input(v.object({ workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)) }))
    .output(PlatformProviderDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules: t.procedure
    .input(
      v.object({
        workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100))),
        order: v.optional(
          v.union([v.optional(v.literal('asc'), 'asc'), v.optional(v.literal('desc'), 'desc')]),
        ),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(1))),
        service_account_id: v.optional(v.pipe(v.string(), v.minCodePoints(1))),
      }),
    )
    .output(PlatformFederationRuleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules: t.procedure
    .input(
      v.object({
        workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
        project_id: v.pipe(v.string(), v.minCodePoints(1)),
        service_account_id: v.pipe(v.string(), v.minCodePoints(1)),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        attribute_matchers: v.record(
          v.string(),
          v.union([
            v.string(),
            v.boolean(),
            v.union([v.pipe(v.number(), v.integer()), v.number()]),
          ]),
        ),
        permissions: v.optional(
          v.union([DefaultPermissionsParamSchema, RestrictedPermissionsParamSchema]),
        ),
        enabled: v.optional(v.boolean()),
      }),
    )
    .output(PlatformFederationRuleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    t.procedure
      .input(
        v.object({
          workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
          workload_identity_federation_rule_id: v.pipe(v.string(), v.minCodePoints(1)),
        }),
      )
      .output(PlatformFederationRuleSchema)
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    t.procedure
      .input(
        v.object({
          workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
          workload_identity_federation_rule_id: v.pipe(v.string(), v.minCodePoints(1)),
          name: v.optional(v.union([v.string(), v.nullable(v.null())])),
          description: v.optional(v.union([v.string(), v.nullable(v.null())])),
          attribute_matchers: v.optional(
            v.record(
              v.string(),
              v.union([
                v.string(),
                v.boolean(),
                v.union([v.pipe(v.number(), v.integer()), v.number()]),
              ]),
            ),
          ),
          permissions: v.optional(
            v.union([DefaultPermissionsParamSchema, RestrictedPermissionsParamSchema]),
          ),
          enabled: v.optional(v.boolean()),
        }),
      )
      .output(PlatformFederationRuleSchema)
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    t.procedure
      .input(
        v.object({
          workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
          workload_identity_federation_rule_id: v.pipe(v.string(), v.minCodePoints(1)),
        }),
      )
      .output(PlatformFederationRuleDeletedResourceSchema)
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  getOrganizationUsageDecisions: t.procedure
    .input(
      v.object({
        start_time: v.pipe(v.number(), v.integer()),
        end_time: v.optional(v.union([v.pipe(v.number(), v.integer()), v.nullable(v.null())])),
        bucket_width: v.optional(
          v.union([
            v.pipe(
              v.union([DecisionsUsageBucketWidthSchema]),
              v.description(
                'Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.',
              ),
            ),
            v.nullable(v.null()),
          ]),
        ),
        limit: v.optional(v.union([v.pipe(v.number(), v.integer()), v.nullable(v.null())])),
        page: v.optional(
          v.union([
            v.pipe(
              v.string(),
              v.description(
                'A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.',
              ),
            ),
            v.nullable(v.null()),
          ]),
        ),
        project_ids: v.optional(
          v.union([
            v.pipe(
              v.union([v.array(v.string())]),
              v.description('Return only usage for these projects.'),
            ),
            v.nullable(v.null()),
          ]),
        ),
        group_by: v.optional(
          v.union([
            v.pipe(
              v.union([v.array(DecisionsUsageGroupBySchema)]),
              v.description(
                'Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier`, `api_source` or any combination of them. When grouped by `api_source`, results use `agents_api` for attributed Agents API activity and `unlabeled` for all other activity. Without source grouping, `api_source` is null.',
              ),
            ),
            v.nullable(v.null()),
          ]),
        ),
        user_ids: v.optional(
          v.union([
            v.pipe(
              v.union([v.array(v.string())]),
              v.description('Return only usage for these users.'),
            ),
            v.nullable(v.null()),
          ]),
        ),
        api_key_ids: v.optional(
          v.union([
            v.pipe(
              v.union([v.array(v.string())]),
              v.description('Return only usage for these API keys.'),
            ),
            v.nullable(v.null()),
          ]),
        ),
        models: v.optional(
          v.union([
            v.pipe(
              v.union([v.array(v.string())]),
              v.description('Return only usage for these models.'),
            ),
            v.nullable(v.null()),
          ]),
        ),
        batch: v.optional(v.union([v.boolean(), v.nullable(v.null())])),
      }),
    )
    .output(PublicDecisionsUsageResponseResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationExternalStorage: t.procedure
    .input(
      v.partial(
        v.object({
          project_id: v.union([
            v.pipe(v.string(), v.metadata({ examples: ['proj_123'] })),
            v.nullable(v.null()),
          ]),
          after: v.union([
            v.pipe(
              v.string(),
              v.description('Return external storage configurations after this ID.'),
            ),
            v.nullable(v.null()),
          ]),
          order: ExternalStorageOrderSchema,
          limit: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100)),
        }),
      ),
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
    .input(
      v.object({
        external_storage_id: v.pipe(v.string(), v.metadata({ examples: ['extstorage_123'] })),
      }),
    )
    .output(ExternalStorageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationExternalStorageExternalStorageId: t.procedure
    .input(
      v.object({
        external_storage_id: v.pipe(v.string(), v.metadata({ examples: ['extstorage_123'] })),
      }),
    )
    .output(ExternalStorageDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationExternalStorageExternalStorageIdValidate: t.procedure
    .input(
      v.object({
        external_storage_id: v.pipe(v.string(), v.metadata({ examples: ['extstorage_123'] })),
      }),
    )
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
    .input(v.object({ project_id: v.pipe(v.string(), v.metadata({ examples: ['proj_123'] })) }))
    .output(ProjectSpendLimitResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdSpendLimit: t.procedure
    .input(
      v.object({
        project_id: v.pipe(v.string(), v.metadata({ examples: ['proj_123'] })),
        threshold_amount: v.pipe(
          v.pipe(v.number(), v.integer(), v.minValue(1)),
          v.description('The hard spend limit amount, in cents.'),
        ),
        currency: v.pipe(
          v.literal('USD'),
          v.description(
            'The currency for the threshold amount. Currently, only `USD` is supported.',
          ),
        ),
        interval: v.pipe(
          v.literal('month'),
          v.description(
            'The time interval for evaluating spend against the threshold. Currently, only `month` is supported.',
          ),
        ),
        notification_channel: v.optional(
          v.union([
            v.pipe(
              SpendLimitEmailNotificationChannelParamsSchema,
              v.description(
                'Configure email notifications when the spend limit is reached. Leave this out to keep the current settings, or send null to reset to owner-only notifications.',
              ),
            ),
            v.nullable(v.null()),
          ]),
        ),
      }),
    )
    .output(ProjectSpendLimitResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdSpendLimit: t.procedure
    .input(v.object({ project_id: v.pipe(v.string(), v.metadata({ examples: ['proj_123'] })) }))
    .output(ProjectSpendLimitDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdServiceTierSettings: t.procedure
    .input(v.object({ project_id: v.pipe(v.string(), v.description('The ID of the project')) }))
    .output(ProjectServiceTierSettingsResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceTierSettings: t.procedure
    .input(
      v.object({
        project_id: v.pipe(v.string(), v.description('The ID of the project')),
        default: v.optional(
          v.pipe(
            ProjectDefaultServiceTierSchema,
            v.description('Default tier for requests that omit service_tier or use auto.'),
          ),
        ),
        enabled_tiers: v.optional(
          v.pipe(
            v.union([
              v.optional(v.literal('all'), 'all'),
              v.array(ProjectOptionalServiceTierSchema),
            ]),
            v.description(
              'Additional service tiers enabled for this project. "all" includes future tiers. An empty array allows only Standard. Organization policy and eligibility still apply.',
            ),
          ),
        ),
      }),
    )
    .output(ProjectServiceTierSettingsResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeys: t.procedure
    .input(
      v.object({
        project_id: v.pipe(v.string(), v.description('The ID of the project.')),
        service_account_id: v.pipe(v.string(), v.description('The ID of the service account.')),
        name: v.optional(v.pipe(v.string(), v.description('API key name.'))),
        scopes: v.optional(
          v.pipe(
            v.array(v.pipe(v.string(), v.description('API key scope.'))),
            v.description('API key scopes.'),
          ),
        ),
        expires_in_seconds: v.optional(
          v.union([
            v.pipe(
              v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(31536000)),
              v.description('Number of seconds until the API key expires.'),
            ),
            v.nullable(v.null()),
          ]),
        ),
      }),
    )
    .output(ServiceAccountApiKeyBodySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
