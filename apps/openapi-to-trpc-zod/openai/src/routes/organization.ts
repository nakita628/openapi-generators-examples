import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        after: z
          .string()
          .nullable()
          .meta({
            description: 'Return keys with IDs that come after this ID in the pagination order.',
          })
          .exactOptional(),
        order: z
          .enum(['asc', 'desc'])
          .default('asc')
          .meta({ description: 'Order results by creation time, ascending or descending.' })
          .exactOptional(),
        limit: z
          .int()
          .default(20)
          .meta({ description: 'Maximum number of keys to return.' })
          .exactOptional(),
      }),
    )
    .output(ApiKeyListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationAdminApiKeys: t.procedure
    .input(
      z.object({
        name: z.string().meta({ examples: ['New Admin Key'] }),
        expires_in_seconds: z
          .int()
          .min(1)
          .max(31536000)
          .meta({
            description:
              'The number of seconds until the API key expires. Omit this field for a key that does not expire.',
            examples: [2592000],
          })
          .exactOptional(),
      }),
    )
    .output(AdminApiKeyCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationAdminApiKeysKeyId: t.procedure
    .input(z.object({ key_id: z.string().meta({ description: 'The ID of the API key.' }) }))
    .output(AdminApiKeySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationAdminApiKeysKeyId: t.procedure
    .input(
      z.object({
        key_id: z.string().meta({ description: 'The ID of the API key to be deleted.' }),
      }),
    )
    .output(
      z.object({
        id: z.string().meta({ examples: ['key_abc'] }),
        object: z
          .literal('organization.admin_api_key.deleted')
          .meta({ examples: ['organization.admin_api_key.deleted'] }),
        deleted: z.boolean().meta({ examples: [true] }),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationAuditLogs: t.procedure
    .input(
      z.object({
        effective_at: z
          .object({
            gt: z
              .int()
              .meta({
                description:
                  'Return only events whose `effective_at` (Unix seconds) is greater than this value.',
              })
              .exactOptional(),
            gte: z
              .int()
              .meta({
                description:
                  'Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.',
              })
              .exactOptional(),
            lt: z
              .int()
              .meta({
                description:
                  'Return only events whose `effective_at` (Unix seconds) is less than this value.',
              })
              .exactOptional(),
            lte: z
              .int()
              .meta({
                description:
                  'Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.',
              })
              .exactOptional(),
          })
          .exactOptional(),
        'project_ids[]': z.array(z.string()).exactOptional(),
        'event_types[]': z.array(AuditLogEventTypeSchema).exactOptional(),
        'actor_ids[]': z.array(z.string()).exactOptional(),
        'actor_emails[]': z.array(z.string()).exactOptional(),
        'resource_ids[]': z.array(z.string()).exactOptional(),
        tenant_only: z.boolean().default(false).exactOptional(),
        limit: z.int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    )
    .output(ListAuditLogsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationCertificates: t.procedure
    .input(
      z.object({
        limit: z.int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
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
      z.object({
        certificate_id: z.string(),
        include: z.array(z.literal('content')).exactOptional(),
      }),
    )
    .output(CertificateSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationCertificatesCertificateId: t.procedure
    .input(
      z.object({
        certificate_id: z.string(),
        name: z
          .string()
          .meta({ description: 'The updated name for the certificate' })
          .exactOptional(),
      }),
    )
    .output(CertificateSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationCertificatesCertificateId: t.procedure
    .input(z.object({ certificate_id: z.string() }))
    .output(DeleteCertificateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationCosts: t.procedure
    .input(
      z.object({
        start_time: z.int(),
        end_time: z.int().exactOptional(),
        bucket_width: z.literal('1d').default('1d').exactOptional(),
        project_ids: z.array(z.string()).exactOptional(),
        api_key_ids: z.array(z.string()).exactOptional(),
        line_items: z.array(z.string()).exactOptional(),
        group_by: z
          .array(z.enum(['project_id', 'user_id', 'line_item', 'api_key_id', 'api_source']))
          .exactOptional(),
        limit: z.int().default(7).exactOptional(),
        page: z.string().exactOptional(),
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
      z.object({
        limit: z.int().min(0).max(1000).default(100).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
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
    .input(z.object({ group_id: z.string() }))
    .output(GroupResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroupsGroupId: t.procedure
    .input(
      z.object({
        group_id: z.string(),
        name: z.string().min(1).max(255).meta({ description: 'New display name for the group.' }),
      }),
    )
    .output(GroupResourceWithSuccessSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationGroupsGroupId: t.procedure
    .input(z.object({ group_id: z.string() }))
    .output(GroupDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdRoles: t.procedure
    .input(
      z.object({
        group_id: z.string(),
        limit: z.int().min(0).max(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
      }),
    )
    .output(RoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroupsGroupIdRoles: t.procedure
    .input(
      z.object({
        group_id: z.string(),
        role_id: z.string().meta({ description: 'Identifier of the role to assign.' }),
      }),
    )
    .output(GroupRoleAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdRolesRoleId: t.procedure
    .input(z.object({ group_id: z.string(), role_id: z.string() }))
    .output(AssignedRoleDetailsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationGroupsGroupIdRolesRoleId: t.procedure
    .input(z.object({ group_id: z.string(), role_id: z.string() }))
    .output(DeletedRoleAssignmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdUsers: t.procedure
    .input(
      z.object({
        group_id: z.string(),
        limit: z.int().min(0).max(1000).default(100).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      }),
    )
    .output(UserListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroupsGroupIdUsers: t.procedure
    .input(
      z.object({
        group_id: z.string(),
        user_id: z.string().meta({ description: 'Identifier of the user to add to the group.' }),
      }),
    )
    .output(GroupUserAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdUsersUserId: t.procedure
    .input(z.object({ group_id: z.string(), user_id: z.string() }))
    .output(GroupMemberUserSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationGroupsGroupIdUsersUserId: t.procedure
    .input(z.object({ group_id: z.string(), user_id: z.string() }))
    .output(GroupUserDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationInvites: t.procedure
    .input(
      z.object({ limit: z.int().default(20).exactOptional(), after: z.string().exactOptional() }),
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
    .input(z.object({ invite_id: z.string() }))
    .output(InviteSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationInvitesInviteId: t.procedure
    .input(z.object({ invite_id: z.string() }))
    .output(InviteDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjects: t.procedure
    .input(
      z.object({
        limit: z.int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        include_archived: z.boolean().default(false).exactOptional(),
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
    .input(z.object({ project_id: z.string() }))
    .output(ProjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectId: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        name: z
          .union([z.string(), z.null()])
          .meta({ description: 'The updated name of the project, this name appears in reports.' })
          .exactOptional(),
        external_key_id: z
          .union([z.string(), z.null()])
          .meta({ description: 'External key ID to associate with the project.' })
          .exactOptional(),
        geography: z
          .union([z.string(), z.null()])
          .meta({
            description:
              'Geography for the project.\nDeprecated: use `residency` when creating a project to configure data residency. This field is retained for backward compatibility.',
            deprecated: true,
          })
          .exactOptional(),
      }),
    )
    .output(ProjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdApiKeys: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        limit: z.int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        owner_project_access: z.enum(['active', 'inactive', 'any']).exactOptional(),
      }),
    )
    .output(ProjectApiKeyListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdApiKeysApiKeyId: t.procedure
    .input(z.object({ project_id: z.string(), api_key_id: z.string() }))
    .output(ProjectApiKeySchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdApiKeysApiKeyId: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        api_key_id: z.string(),
        expires_in_seconds: z
          .int()
          .min(1)
          .max(31536000)
          .meta({
            description:
              'Number of seconds from this request until the API key expires. Must comply with the organization and project expiry policies. Expired keys cannot be updated. Retrying resets the expiry relative to the new request. Omit to keep the current expiration.',
          })
          .exactOptional(),
        scopes: z
          .array(z.string())
          .meta({
            description:
              'Replace the API key scope restrictions. Omit to leave scopes unchanged. An empty array removes key restrictions (All permissions), subject to the owner\'s effective permissions. Use ["api.all.read"] for read-only access. Scopes do not change the owner\'s roles or grant administrative permissions.',
          })
          .exactOptional(),
      }),
    )
    .output(ProjectApiKeySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdApiKeysApiKeyId: t.procedure
    .input(z.object({ project_id: z.string(), api_key_id: z.string() }))
    .output(ProjectApiKeyDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdArchive: t.procedure
    .input(z.object({ project_id: z.string() }))
    .output(ProjectSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdCertificates: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        limit: z.int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      }),
    )
    .output(ListProjectCertificatesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdCertificatesActivate: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        certificate_ids: z
          .array(z.string().meta({ examples: ['cert_abc'] }))
          .min(1)
          .max(10),
      }),
    )
    .output(OrganizationProjectCertificateActivationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdCertificatesDeactivate: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        certificate_ids: z
          .array(z.string().meta({ examples: ['cert_abc'] }))
          .min(1)
          .max(10),
      }),
    )
    .output(OrganizationProjectCertificateDeactivationResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdDataRetention: t.procedure
    .input(z.object({ project_id: z.string() }))
    .output(ProjectDataRetentionSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdDataRetention: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        retention_type: z
          .enum([
            'organization_default',
            'none',
            'zero_data_retention',
            'modified_abuse_monitoring',
            'enhanced_zero_data_retention',
            'enhanced_modified_abuse_monitoring',
          ])
          .meta({ description: 'The desired project data retention type.' }),
      }),
    )
    .output(ProjectDataRetentionSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdGroups: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        limit: z.int().min(0).max(100).default(20).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    )
    .output(ProjectGroupListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdGroups: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        group_id: z
          .string()
          .meta({ description: 'Identifier of the group to add to the project.' }),
        role: z
          .string()
          .meta({ description: 'Identifier of the project role to grant to the group.' }),
      }),
    )
    .output(ProjectGroupSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdGroupsGroupId: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        group_id: z.string(),
        group_type: z.enum(['group', 'tenant_group']).default('group').exactOptional(),
      }),
    )
    .output(ProjectGroupSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdGroupsGroupId: t.procedure
    .input(z.object({ project_id: z.string(), group_id: z.string() }))
    .output(ProjectGroupDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdHostedToolPermissions: t.procedure
    .input(z.object({ project_id: z.string() }))
    .output(ProjectHostedToolPermissionsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdHostedToolPermissions: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        file_search: z
          .union([HostedToolPermissionUpdateSchema, z.null()])
          .meta({ description: 'The file search permission update.' })
          .exactOptional(),
        web_search: z
          .union([HostedToolPermissionUpdateSchema, z.null()])
          .meta({ description: 'The web search permission update.' })
          .exactOptional(),
        image_generation: z
          .union([HostedToolPermissionUpdateSchema, z.null()])
          .meta({ description: 'The image generation permission update.' })
          .exactOptional(),
        mcp: z
          .union([HostedToolPermissionUpdateSchema, z.null()])
          .meta({ description: 'The MCP permission update.' })
          .exactOptional(),
        code_interpreter: z
          .union([HostedToolPermissionUpdateSchema, z.null()])
          .meta({ description: 'The code interpreter permission update.' })
          .exactOptional(),
      }),
    )
    .output(ProjectHostedToolPermissionsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdModelPermissions: t.procedure
    .input(z.object({ project_id: z.string() }))
    .output(ProjectModelPermissionsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdModelPermissions: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        mode: z
          .enum(['allow_list', 'deny_list'])
          .meta({ description: 'The model permissions mode to apply.' }),
        model_ids: z
          .array(z.string())
          .meta({ description: 'The model IDs included in this permissions policy.' }),
      }),
    )
    .output(ProjectModelPermissionsSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdModelPermissions: t.procedure
    .input(z.object({ project_id: z.string() }))
    .output(ProjectModelPermissionsDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdRateLimits: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        limit: z.int().default(100).exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    )
    .output(ProjectRateLimitListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdRateLimitsRateLimitId: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        rate_limit_id: z.string(),
        max_requests_per_1_minute: z
          .int()
          .meta({ description: 'The maximum requests per minute.' })
          .exactOptional(),
        max_tokens_per_1_minute: z
          .int()
          .meta({ description: 'The maximum tokens per minute.' })
          .exactOptional(),
        max_images_per_1_minute: z
          .int()
          .meta({ description: 'The maximum images per minute. Only relevant for certain models.' })
          .exactOptional(),
        max_audio_megabytes_per_1_minute: z
          .int()
          .meta({
            description:
              'The maximum audio megabytes per minute. Only relevant for certain models.',
          })
          .exactOptional(),
        max_requests_per_1_day: z
          .int()
          .meta({ description: 'The maximum requests per day. Only relevant for certain models.' })
          .exactOptional(),
        batch_1_day_max_input_tokens: z
          .int()
          .meta({
            description:
              'The maximum batch input tokens per day. Only relevant for certain models.',
          })
          .exactOptional(),
      }),
    )
    .output(ProjectRateLimitSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdServiceAccounts: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        limit: z.int().default(20).exactOptional(),
        after: z.string().exactOptional(),
      }),
    )
    .output(ProjectServiceAccountListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceAccounts: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        name: z.string().meta({ description: 'The name of the service account being created.' }),
        create_service_account_only: z
          .union([
            z
              .boolean()
              .meta({
                description: 'Create the service account without default roles or an API key.',
              }),
            z.null(),
          ])
          .exactOptional(),
        expires_in_seconds: z
          .union([z.int().min(1).max(31536000), z.null()])
          .meta({
            description:
              'Number of seconds until the initial API key expires. If omitted or null, the key does not expire unless the effective organization or project policy requires an expiration. When a policy sets a maximum lifetime, this value must be provided and must not exceed that limit. A non-null value cannot be used when `create_service_account_only` is true.',
          })
          .exactOptional(),
      }),
    )
    .output(ProjectServiceAccountCreateResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdServiceAccountsServiceAccountId: t.procedure
    .input(z.object({ project_id: z.string(), service_account_id: z.string() }))
    .output(ProjectServiceAccountSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceAccountsServiceAccountId: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        service_account_id: z.string(),
        name: z.string().meta({ description: 'The updated service account name.' }).exactOptional(),
        role: z
          .enum(['member', 'owner'])
          .meta({ description: 'The updated service account role.' })
          .exactOptional(),
      }),
    )
    .output(ProjectServiceAccountSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdServiceAccountsServiceAccountId: t.procedure
    .input(z.object({ project_id: z.string(), service_account_id: z.string() }))
    .output(ProjectServiceAccountDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdSpendAlerts: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        limit: z.int().min(0).max(100).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    )
    .output(ProjectSpendAlertListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdSpendAlerts: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        threshold_amount: z
          .int()
          .min(0)
          .meta({ description: 'The alert threshold amount, in cents.' }),
        currency: z.literal('USD').meta({ description: 'The currency for the threshold amount.' }),
        interval: z
          .literal('month')
          .meta({ description: 'The time interval for evaluating spend against the threshold.' }),
        notification_channel: SpendAlertNotificationChannelSchema,
      }),
    )
    .output(ProjectSpendAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdSpendAlertsAlertId: t.procedure
    .input(z.object({ project_id: z.string(), alert_id: z.string() }))
    .output(ProjectSpendAlertSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdSpendAlertsAlertId: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        alert_id: z.string(),
        threshold_amount: z
          .int()
          .min(0)
          .meta({ description: 'The alert threshold amount, in cents.' }),
        currency: z.literal('USD').meta({ description: 'The currency for the threshold amount.' }),
        interval: z
          .literal('month')
          .meta({ description: 'The time interval for evaluating spend against the threshold.' }),
        notification_channel: SpendAlertNotificationChannelSchema,
      }),
    )
    .output(ProjectSpendAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdSpendAlertsAlertId: t.procedure
    .input(z.object({ project_id: z.string(), alert_id: z.string() }))
    .output(ProjectSpendAlertDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdUsers: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        limit: z.int().default(20).exactOptional(),
        after: z.string().exactOptional(),
      }),
    )
    .output(ProjectUserListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdUsers: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        user_id: z
          .union([z.string(), z.null()])
          .meta({ description: 'The ID of the user.' })
          .exactOptional(),
        email: z
          .union([z.string(), z.null()])
          .meta({ description: 'Email of the user to add.' })
          .exactOptional(),
        role: z.string().meta({ description: '`owner` or `member`' }),
      }),
    )
    .output(ProjectUserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdUsersUserId: t.procedure
    .input(z.object({ project_id: z.string(), user_id: z.string() }))
    .output(ProjectUserSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdUsersUserId: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        user_id: z.string(),
        role: z
          .union([z.string(), z.null()])
          .meta({ description: '`owner` or `member`' })
          .exactOptional(),
      }),
    )
    .output(ProjectUserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdUsersUserId: t.procedure
    .input(z.object({ project_id: z.string(), user_id: z.string() }))
    .output(ProjectUserDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationRoles: t.procedure
    .input(
      z.object({
        limit: z.int().min(0).max(1000).default(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
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
    .input(z.object({ role_id: z.string() }))
    .output(RoleSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationRolesRoleId: t.procedure
    .input(
      z.object({
        role_id: z.string(),
        permissions: z
          .union([z.array(z.string()), z.null()])
          .meta({ description: 'Updated set of permissions for the role.' })
          .exactOptional(),
        description: z
          .union([z.string(), z.null()])
          .meta({ description: 'New description for the role.' })
          .exactOptional(),
        role_name: z
          .union([z.string(), z.null()])
          .meta({ description: 'New name for the role.' })
          .exactOptional(),
      }),
    )
    .output(RoleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationRolesRoleId: t.procedure
    .input(z.object({ role_id: z.string() }))
    .output(RoleDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationSpendAlerts: t.procedure
    .input(
      z.object({
        limit: z.int().min(0).max(100).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
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
    .input(z.object({ alert_id: z.string() }))
    .output(OrganizationSpendAlertSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationSpendAlertsAlertId: t.procedure
    .input(
      z.object({
        alert_id: z.string(),
        threshold_amount: z
          .int()
          .min(0)
          .meta({ description: 'The alert threshold amount, in cents.' }),
        currency: z.literal('USD').meta({ description: 'The currency for the threshold amount.' }),
        interval: z
          .literal('month')
          .meta({ description: 'The time interval for evaluating spend against the threshold.' }),
        notification_channel: SpendAlertNotificationChannelSchema,
      }),
    )
    .output(OrganizationSpendAlertSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationSpendAlertsAlertId: t.procedure
    .input(z.object({ alert_id: z.string() }))
    .output(OrganizationSpendAlertDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageAudioSpeeches: t.procedure
    .input(
      z.object({
        start_time: z.int(),
        end_time: z.int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z.array(z.string()).exactOptional(),
        user_ids: z.array(z.string()).exactOptional(),
        api_key_ids: z.array(z.string()).exactOptional(),
        models: z.array(z.string()).exactOptional(),
        group_by: z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model'])).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageAudioTranscriptions: t.procedure
    .input(
      z.object({
        start_time: z.int(),
        end_time: z.int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z.array(z.string()).exactOptional(),
        user_ids: z.array(z.string()).exactOptional(),
        api_key_ids: z.array(z.string()).exactOptional(),
        models: z.array(z.string()).exactOptional(),
        group_by: z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model'])).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageCodeInterpreterSessions: t.procedure
    .input(
      z.object({
        start_time: z.int(),
        end_time: z.int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z.array(z.string()).exactOptional(),
        group_by: z.array(z.literal('project_id')).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageCompletions: t.procedure
    .input(
      z.object({
        start_time: z.int(),
        end_time: z.int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z.array(z.string()).exactOptional(),
        user_ids: z.array(z.string()).exactOptional(),
        api_key_ids: z.array(z.string()).exactOptional(),
        models: z.array(z.string()).exactOptional(),
        batch: z.boolean().exactOptional(),
        group_by: z
          .array(
            z.enum([
              'project_id',
              'user_id',
              'api_key_id',
              'model',
              'batch',
              'service_tier',
              'api_source',
            ]),
          )
          .exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageEmbeddings: t.procedure
    .input(
      z.object({
        start_time: z.int(),
        end_time: z.int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z.array(z.string()).exactOptional(),
        user_ids: z.array(z.string()).exactOptional(),
        api_key_ids: z.array(z.string()).exactOptional(),
        models: z.array(z.string()).exactOptional(),
        group_by: z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model'])).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageFileSearchCalls: t.procedure
    .input(
      z.object({
        start_time: z.int(),
        end_time: z.int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z.array(z.string()).exactOptional(),
        user_ids: z.array(z.string()).exactOptional(),
        api_key_ids: z.array(z.string()).exactOptional(),
        vector_store_ids: z.array(z.string()).exactOptional(),
        group_by: z
          .array(z.enum(['project_id', 'user_id', 'api_key_id', 'vector_store_id']))
          .exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageImages: t.procedure
    .input(
      z.object({
        start_time: z.int(),
        end_time: z.int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        sources: z
          .array(z.enum(['image.generation', 'image.edit', 'image.variation']))
          .exactOptional(),
        sizes: z
          .array(z.enum(['256x256', '512x512', '1024x1024', '1792x1792', '1024x1792']))
          .exactOptional(),
        project_ids: z.array(z.string()).exactOptional(),
        user_ids: z.array(z.string()).exactOptional(),
        api_key_ids: z.array(z.string()).exactOptional(),
        models: z.array(z.string()).exactOptional(),
        group_by: z
          .array(z.enum(['project_id', 'user_id', 'api_key_id', 'model', 'size', 'source']))
          .exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageModerations: t.procedure
    .input(
      z.object({
        start_time: z.int(),
        end_time: z.int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z.array(z.string()).exactOptional(),
        user_ids: z.array(z.string()).exactOptional(),
        api_key_ids: z.array(z.string()).exactOptional(),
        models: z.array(z.string()).exactOptional(),
        group_by: z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model'])).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageVectorStores: t.procedure
    .input(
      z.object({
        start_time: z.int(),
        end_time: z.int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z.array(z.string()).exactOptional(),
        group_by: z.array(z.literal('project_id')).exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageWebSearchCalls: t.procedure
    .input(
      z.object({
        start_time: z.int(),
        end_time: z.int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z.array(z.string()).exactOptional(),
        user_ids: z.array(z.string()).exactOptional(),
        api_key_ids: z.array(z.string()).exactOptional(),
        models: z.array(z.string()).exactOptional(),
        context_levels: z.array(z.enum(['low', 'medium', 'high'])).exactOptional(),
        group_by: z
          .array(
            z.enum(['project_id', 'user_id', 'api_key_id', 'model', 'context_level', 'api_source']),
          )
          .exactOptional(),
        limit: z.int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    )
    .output(UsageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsers: t.procedure
    .input(
      z.object({
        limit: z.int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        emails: z.array(z.string()).exactOptional(),
      }),
    )
    .output(UserListResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsersUserId: t.procedure
    .input(z.object({ user_id: z.string() }))
    .output(UserSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationUsersUserId: t.procedure
    .input(
      z.object({
        user_id: z.string(),
        role: z
          .union([z.string(), z.null()])
          .meta({ description: '`owner` or `reader`' })
          .exactOptional(),
        role_id: z
          .union([z.string(), z.null()])
          .meta({ description: 'Role ID to assign to the user.' })
          .exactOptional(),
        technical_level: z
          .union([z.string(), z.null()])
          .meta({ description: 'Technical level metadata.' })
          .exactOptional(),
        developer_persona: z
          .union([z.string(), z.null()])
          .meta({ description: 'Developer persona metadata.' })
          .exactOptional(),
      }),
    )
    .output(UserSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationUsersUserId: t.procedure
    .input(z.object({ user_id: z.string() }))
    .output(UserDeleteResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsersUserIdRoles: t.procedure
    .input(
      z.object({
        user_id: z.string(),
        limit: z.int().min(0).max(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
      }),
    )
    .output(RoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationUsersUserIdRoles: t.procedure
    .input(
      z.object({
        user_id: z.string(),
        role_id: z.string().meta({ description: 'Identifier of the role to assign.' }),
      }),
    )
    .output(UserRoleAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsersUserIdRolesRoleId: t.procedure
    .input(z.object({ user_id: z.string(), role_id: z.string() }))
    .output(AssignedRoleDetailsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationUsersUserIdRolesRoleId: t.procedure
    .input(z.object({ user_id: z.string(), role_id: z.string() }))
    .output(DeletedRoleAssignmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationExternalKeys: t.procedure
    .input(
      z.object({
        limit: z.int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z.union([z.string(), z.null()]).exactOptional(),
        purpose: ExternalKeyPurposeSchema.exactOptional(),
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
    .input(z.object({ external_key_id: z.string() }))
    .output(ExternalKeyResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationExternalKeysExternalKeyId: t.procedure
    .input(z.object({ external_key_id: z.string() }))
    .output(ExternalKeyResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationExternalKeysExternalKeyIdValidate: t.procedure
    .input(z.object({ external_key_id: z.string() }))
    .output(ValidateExternalKeyResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProviders: t.procedure
    .input(
      z.object({
        limit: z.int().min(1).max(100).exactOptional(),
        order: z
          .xor([z.literal('asc').default('asc'), z.literal('desc').default('desc')])
          .exactOptional(),
        after: z.string().min(1).exactOptional(),
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
    .input(z.object({ workload_identity_provider_id: z.string().min(1) }))
    .output(PlatformProviderSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: t.procedure
    .input(
      z.object({
        workload_identity_provider_id: z.string().min(1),
        name: z.string().min(1).exactOptional(),
        issuer: z.string().min(1).exactOptional(),
        audience: z.string().min(1).exactOptional(),
        verification: z
          .xor([DiscoveryVerificationParamSchema, UploadedJwksVerificationParamSchema])
          .exactOptional(),
        description: z.union([z.string(), z.null()]).exactOptional(),
        attribute_transformations: z.array(TransformationParamSchema).max(20).exactOptional(),
        enabled: z.boolean().exactOptional(),
      }),
    )
    .output(PlatformProviderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: t.procedure
    .input(z.object({ workload_identity_provider_id: z.string().min(1) }))
    .output(PlatformProviderDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules: t.procedure
    .input(
      z.object({
        workload_identity_provider_id: z.string().min(1),
        limit: z.int().min(1).max(100).exactOptional(),
        order: z
          .xor([z.literal('asc').default('asc'), z.literal('desc').default('desc')])
          .exactOptional(),
        after: z.string().min(1).exactOptional(),
        service_account_id: z.string().min(1).exactOptional(),
      }),
    )
    .output(PlatformFederationRuleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules: t.procedure
    .input(
      z.object({
        workload_identity_provider_id: z.string().min(1),
        project_id: z.string().min(1),
        service_account_id: z.string().min(1),
        name: z.string().exactOptional(),
        description: z.string().exactOptional(),
        attribute_matchers: z.record(
          z.string(),
          z.xor([z.string(), z.boolean(), z.union([z.int(), z.number()])]),
        ),
        permissions: z
          .xor([DefaultPermissionsParamSchema, RestrictedPermissionsParamSchema])
          .exactOptional(),
        enabled: z.boolean().exactOptional(),
      }),
    )
    .output(PlatformFederationRuleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    t.procedure
      .input(
        z.object({
          workload_identity_provider_id: z.string().min(1),
          workload_identity_federation_rule_id: z.string().min(1),
        }),
      )
      .output(PlatformFederationRuleSchema)
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    t.procedure
      .input(
        z.object({
          workload_identity_provider_id: z.string().min(1),
          workload_identity_federation_rule_id: z.string().min(1),
          name: z.union([z.string(), z.null()]).exactOptional(),
          description: z.union([z.string(), z.null()]).exactOptional(),
          attribute_matchers: z
            .record(z.string(), z.xor([z.string(), z.boolean(), z.union([z.int(), z.number()])]))
            .exactOptional(),
          permissions: z
            .xor([DefaultPermissionsParamSchema, RestrictedPermissionsParamSchema])
            .exactOptional(),
          enabled: z.boolean().exactOptional(),
        }),
      )
      .output(PlatformFederationRuleSchema)
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    t.procedure
      .input(
        z.object({
          workload_identity_provider_id: z.string().min(1),
          workload_identity_federation_rule_id: z.string().min(1),
        }),
      )
      .output(PlatformFederationRuleDeletedResourceSchema)
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  getOrganizationUsageDecisions: t.procedure
    .input(
      z.object({
        start_time: z.int(),
        end_time: z.union([z.int(), z.null()]).exactOptional(),
        bucket_width: z
          .union([
            z
              .xor([DecisionsUsageBucketWidthSchema])
              .meta({
                description:
                  'Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.',
              }),
            z.null(),
          ])
          .exactOptional(),
        limit: z.union([z.int(), z.null()]).exactOptional(),
        page: z
          .union([
            z
              .string()
              .meta({
                description:
                  'A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.',
              }),
            z.null(),
          ])
          .exactOptional(),
        project_ids: z
          .union([
            z
              .xor([z.array(z.string())])
              .meta({ description: 'Return only usage for these projects.' }),
            z.null(),
          ])
          .exactOptional(),
        group_by: z
          .union([
            z
              .xor([z.array(DecisionsUsageGroupBySchema)])
              .meta({
                description:
                  'Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier`, `api_source` or any combination of them. When grouped by `api_source`, results use `agents_api` for attributed Agents API activity and `unlabeled` for all other activity. Without source grouping, `api_source` is null.',
              }),
            z.null(),
          ])
          .exactOptional(),
        user_ids: z
          .union([
            z
              .xor([z.array(z.string())])
              .meta({ description: 'Return only usage for these users.' }),
            z.null(),
          ])
          .exactOptional(),
        api_key_ids: z
          .union([
            z
              .xor([z.array(z.string())])
              .meta({ description: 'Return only usage for these API keys.' }),
            z.null(),
          ])
          .exactOptional(),
        models: z
          .union([
            z
              .xor([z.array(z.string())])
              .meta({ description: 'Return only usage for these models.' }),
            z.null(),
          ])
          .exactOptional(),
        batch: z.union([z.boolean(), z.null()]).exactOptional(),
      }),
    )
    .output(PublicDecisionsUsageResponseResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationExternalStorage: t.procedure
    .input(
      z.object({
        project_id: z
          .union([z.string().meta({ examples: ['proj_123'] }), z.null()])
          .exactOptional(),
        after: z
          .union([
            z
              .string()
              .meta({ description: 'Return external storage configurations after this ID.' }),
            z.null(),
          ])
          .exactOptional(),
        order: ExternalStorageOrderSchema.exactOptional(),
        limit: z.int().min(1).max(100).exactOptional(),
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
    .input(z.object({ external_storage_id: z.string().meta({ examples: ['extstorage_123'] }) }))
    .output(ExternalStorageResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationExternalStorageExternalStorageId: t.procedure
    .input(z.object({ external_storage_id: z.string().meta({ examples: ['extstorage_123'] }) }))
    .output(ExternalStorageDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationExternalStorageExternalStorageIdValidate: t.procedure
    .input(z.object({ external_storage_id: z.string().meta({ examples: ['extstorage_123'] }) }))
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
    .input(z.object({ project_id: z.string().meta({ examples: ['proj_123'] }) }))
    .output(ProjectSpendLimitResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdSpendLimit: t.procedure
    .input(
      z.object({
        project_id: z.string().meta({ examples: ['proj_123'] }),
        threshold_amount: z
          .int()
          .min(1)
          .meta({ description: 'The hard spend limit amount, in cents.' }),
        currency: z
          .literal('USD')
          .meta({
            description:
              'The currency for the threshold amount. Currently, only `USD` is supported.',
          }),
        interval: z
          .literal('month')
          .meta({
            description:
              'The time interval for evaluating spend against the threshold. Currently, only `month` is supported.',
          }),
        notification_channel: z
          .union([
            SpendLimitEmailNotificationChannelParamsSchema.meta({
              description:
                'Configure email notifications when the spend limit is reached. Leave this out to keep the current settings, or send null to reset to owner-only notifications.',
            }),
            z.null(),
          ])
          .exactOptional(),
      }),
    )
    .output(ProjectSpendLimitResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdSpendLimit: t.procedure
    .input(z.object({ project_id: z.string().meta({ examples: ['proj_123'] }) }))
    .output(ProjectSpendLimitDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdServiceTierSettings: t.procedure
    .input(z.object({ project_id: z.string().meta({ description: 'The ID of the project' }) }))
    .output(ProjectServiceTierSettingsResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceTierSettings: t.procedure
    .input(
      z.object({
        project_id: z.string().meta({ description: 'The ID of the project' }),
        default: ProjectDefaultServiceTierSchema.meta({
          description: 'Default tier for requests that omit service_tier or use auto.',
        }).exactOptional(),
        enabled_tiers: z
          .xor([z.literal('all').default('all'), z.array(ProjectOptionalServiceTierSchema)])
          .meta({
            description:
              'Additional service tiers enabled for this project. "all" includes future tiers. An empty array allows only Standard. Organization policy and eligibility still apply.',
          })
          .exactOptional(),
      }),
    )
    .output(ProjectServiceTierSettingsResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeys: t.procedure
    .input(
      z.object({
        project_id: z.string().meta({ description: 'The ID of the project.' }),
        service_account_id: z.string().meta({ description: 'The ID of the service account.' }),
        name: z.string().meta({ description: 'API key name.' }).exactOptional(),
        scopes: z
          .array(z.string().meta({ description: 'API key scope.' }))
          .meta({ description: 'API key scopes.' })
          .exactOptional(),
        expires_in_seconds: z
          .union([
            z
              .int()
              .min(1)
              .max(31536000)
              .meta({ description: 'Number of seconds until the API key expires.' }),
            z.null(),
          ])
          .exactOptional(),
      }),
    )
    .output(ServiceAccountApiKeyBodySchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
