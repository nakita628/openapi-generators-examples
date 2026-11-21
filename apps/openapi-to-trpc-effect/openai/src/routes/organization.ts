import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optional(
            Schema.NullOr(Schema.String).annotate({
              description: 'Return keys with IDs that come after this ID in the pagination order.',
            }),
          ),
          order: Schema.Literals(['asc', 'desc'])
            .pipe(Schema.withDecodingDefault(Effect.succeed('asc')))
            .annotate({ description: 'Order results by creation time, ascending or descending.' }),
          limit: Schema.Number.check(Schema.isInt())
            .pipe(Schema.withDecodingDefault(Effect.succeed(20)))
            .annotate({ description: 'Maximum number of keys to return.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ApiKeyListSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationAdminApiKeys: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.String.annotate({ jsonSchemaExamples: ['New Admin Key'] }),
          expires_in_seconds: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(31536000),
            ).annotate({
              description:
                'The number of seconds until the API key expires. Omit this field for a key that does not expire.',
              jsonSchemaExamples: [2592000],
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AdminApiKeyCreateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationAdminApiKeysKeyId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          key_id: Schema.String.annotate({ description: 'The ID of the API key.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AdminApiKeySchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationAdminApiKeysKeyId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          key_id: Schema.String.annotate({ description: 'The ID of the API key to be deleted.' }),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.annotate({ jsonSchemaExamples: ['key_abc'] }),
          object: Schema.Literal('organization.admin_api_key.deleted').annotate({
            jsonSchemaExamples: ['organization.admin_api_key.deleted'],
          }),
          deleted: Schema.Boolean.annotate({ jsonSchemaExamples: [true] }),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationAuditLogs: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          effective_at: Schema.optional(
            Schema.Struct({
              gt: Schema.optional(
                Schema.Number.check(Schema.isInt()).annotate({
                  description:
                    'Return only events whose `effective_at` (Unix seconds) is greater than this value.',
                }),
              ),
              gte: Schema.optional(
                Schema.Number.check(Schema.isInt()).annotate({
                  description:
                    'Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.',
                }),
              ),
              lt: Schema.optional(
                Schema.Number.check(Schema.isInt()).annotate({
                  description:
                    'Return only events whose `effective_at` (Unix seconds) is less than this value.',
                }),
              ),
              lte: Schema.optional(
                Schema.Number.check(Schema.isInt()).annotate({
                  description:
                    'Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.',
                }),
              ),
            }),
          ),
          'project_ids[]': Schema.optional(Schema.Array(Schema.String)),
          'event_types[]': Schema.optional(Schema.Array(AuditLogEventTypeSchema)),
          'actor_ids[]': Schema.optional(Schema.Array(Schema.String)),
          'actor_emails[]': Schema.optional(Schema.Array(Schema.String)),
          'resource_ids[]': Schema.optional(Schema.Array(Schema.String)),
          tenant_only: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListAuditLogsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationCertificates: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListCertificatesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationCertificates: t.procedure
    .input(Schema.toStandardSchemaV1(UploadCertificateRequestSchema))
    .output(Schema.toStandardSchemaV1(CertificateSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationCertificatesActivate: t.procedure
    .input(Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema))
    .output(Schema.toStandardSchemaV1(OrganizationCertificateActivationResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationCertificatesDeactivate: t.procedure
    .input(Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema))
    .output(Schema.toStandardSchemaV1(OrganizationCertificateDeactivationResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationCertificatesCertificateId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          certificate_id: Schema.String,
          include: Schema.optional(Schema.Array(Schema.Literal('content'))),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CertificateSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationCertificatesCertificateId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          certificate_id: Schema.String,
          name: Schema.optional(
            Schema.String.annotate({ description: 'The updated name for the certificate' }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CertificateSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationCertificatesCertificateId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ certificate_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(DeleteCertificateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationCosts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.Number.check(Schema.isInt()),
          end_time: Schema.optional(Schema.Number.check(Schema.isInt())),
          bucket_width: Schema.Literal('1d').pipe(Schema.withDecodingDefault(Effect.succeed('1d'))),
          project_ids: Schema.optional(Schema.Array(Schema.String)),
          api_key_ids: Schema.optional(Schema.Array(Schema.String)),
          line_items: Schema.optional(Schema.Array(Schema.String)),
          group_by: Schema.optional(
            Schema.Array(
              Schema.Literals(['project_id', 'user_id', 'line_item', 'api_key_id', 'api_source']),
            ),
          ),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(7)),
          ),
          page: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UsageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationDataRetention: t.procedure
    .output(Schema.toStandardSchemaV1(OrganizationDataRetentionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationDataRetention: t.procedure
    .input(Schema.toStandardSchemaV1(UpdateOrganizationDataRetentionBodySchema))
    .output(Schema.toStandardSchemaV1(OrganizationDataRetentionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroups: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
            Schema.isLessThanOrEqualTo(1000),
          ).pipe(Schema.withDecodingDefault(Effect.succeed(100))),
          after: Schema.optional(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('asc')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GroupListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroups: t.procedure
    .input(Schema.toStandardSchemaV1(CreateGroupBodySchema))
    .output(Schema.toStandardSchemaV1(GroupResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(GroupResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroupsGroupId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          group_id: Schema.String,
          name: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 255, {
              expected: 'a string of at most 255 characters',
            }),
          ).annotate({ description: 'New display name for the group.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GroupResourceWithSuccessSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationGroupsGroupId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(GroupDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdRoles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          group_id: Schema.String,
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1000),
            ),
          ),
          after: Schema.optional(Schema.String),
          order: Schema.optional(Schema.Literals(['asc', 'desc'])),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RoleListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroupsGroupIdRoles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          group_id: Schema.String,
          role_id: Schema.String.annotate({ description: 'Identifier of the role to assign.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GroupRoleAssignmentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, role_id: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(AssignedRoleDetailsSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationGroupsGroupIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, role_id: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(DeletedRoleAssignmentResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdUsers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          group_id: Schema.String,
          limit: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
            Schema.isLessThanOrEqualTo(1000),
          ).pipe(Schema.withDecodingDefault(Effect.succeed(100))),
          after: Schema.optional(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UserListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationGroupsGroupIdUsers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          group_id: Schema.String,
          user_id: Schema.String.annotate({
            description: 'Identifier of the user to add to the group.',
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GroupUserAssignmentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationGroupsGroupIdUsersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, user_id: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(GroupMemberUserSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationGroupsGroupIdUsersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, user_id: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(GroupUserDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationInvites: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(InviteListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationInvites: t.procedure
    .input(Schema.toStandardSchemaV1(InviteRequestSchema))
    .output(Schema.toStandardSchemaV1(InviteSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationInvitesInviteId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ invite_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(InviteSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationInvitesInviteId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ invite_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(InviteDeleteResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjects: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
          include_archived: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjects: t.procedure
    .input(Schema.toStandardSchemaV1(ProjectCreateRequestSchema))
    .output(Schema.toStandardSchemaV1(ProjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ProjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          name: Schema.optional(
            Schema.Union([Schema.String, Schema.NullOr(Schema.Null)]).annotate({
              description: 'The updated name of the project, this name appears in reports.',
            }),
          ),
          external_key_id: Schema.optional(
            Schema.Union([Schema.String, Schema.NullOr(Schema.Null)]).annotate({
              description: 'External key ID to associate with the project.',
            }),
          ),
          geography: Schema.optional(
            Schema.Union([Schema.String, Schema.NullOr(Schema.Null)]).annotate({
              description:
                'Geography for the project.\nDeprecated: use `residency` when creating a project to configure data residency. This field is retained for backward compatibility.',
              jsonSchemaDeprecated: true,
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdApiKeys: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
          owner_project_access: Schema.optional(Schema.Literals(['active', 'inactive', 'any'])),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectApiKeyListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdApiKeysApiKeyId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, api_key_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectApiKeySchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdApiKeysApiKeyId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          api_key_id: Schema.String,
          expires_in_seconds: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(31536000),
            ).annotate({
              description:
                'Number of seconds from this request until the API key expires. Must comply with the organization and project expiry policies. Expired keys cannot be updated. Retrying resets the expiry relative to the new request. Omit to keep the current expiration.',
            }),
          ),
          scopes: Schema.optional(
            Schema.Array(Schema.String).annotate({
              description:
                'Replace the API key scope restrictions. Omit to leave scopes unchanged. An empty array removes key restrictions (All permissions), subject to the owner\'s effective permissions. Use ["api.all.read"] for read-only access. Scopes do not change the owner\'s roles or grant administrative permissions.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectApiKeySchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdApiKeysApiKeyId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, api_key_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectApiKeyDeleteResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdArchive: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ProjectSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdCertificates: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListProjectCertificatesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdCertificatesActivate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          certificate_ids: Schema.Array(
            Schema.String.annotate({ jsonSchemaExamples: ['cert_abc'] }),
          ).check(Schema.isMinLength(1), Schema.isMaxLength(10)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(OrganizationProjectCertificateActivationResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdCertificatesDeactivate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          certificate_ids: Schema.Array(
            Schema.String.annotate({ jsonSchemaExamples: ['cert_abc'] }),
          ).check(Schema.isMinLength(1), Schema.isMaxLength(10)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(OrganizationProjectCertificateDeactivationResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdDataRetention: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ProjectDataRetentionSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdDataRetention: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          retention_type: Schema.Literals([
            'organization_default',
            'none',
            'zero_data_retention',
            'modified_abuse_monitoring',
            'enhanced_zero_data_retention',
            'enhanced_modified_abuse_monitoring',
          ]).annotate({ description: 'The desired project data retention type.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectDataRetentionSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdGroups: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          limit: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
            Schema.isLessThanOrEqualTo(100),
          ).pipe(Schema.withDecodingDefault(Effect.succeed(20))),
          after: Schema.optional(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('asc')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectGroupListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdGroups: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          group_id: Schema.String.annotate({
            description: 'Identifier of the group to add to the project.',
          }),
          role: Schema.String.annotate({
            description: 'Identifier of the project role to grant to the group.',
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectGroupSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdGroupsGroupId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          group_id: Schema.String,
          group_type: Schema.Literals(['group', 'tenant_group']).pipe(
            Schema.withDecodingDefault(Effect.succeed('group')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectGroupSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdGroupsGroupId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, group_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectGroupDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdHostedToolPermissions: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ProjectHostedToolPermissionsSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdHostedToolPermissions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          file_search: Schema.optional(
            Schema.Union([HostedToolPermissionUpdateSchema, Schema.NullOr(Schema.Null)]).annotate({
              description: 'The file search permission update.',
            }),
          ),
          web_search: Schema.optional(
            Schema.Union([HostedToolPermissionUpdateSchema, Schema.NullOr(Schema.Null)]).annotate({
              description: 'The web search permission update.',
            }),
          ),
          image_generation: Schema.optional(
            Schema.Union([HostedToolPermissionUpdateSchema, Schema.NullOr(Schema.Null)]).annotate({
              description: 'The image generation permission update.',
            }),
          ),
          mcp: Schema.optional(
            Schema.Union([HostedToolPermissionUpdateSchema, Schema.NullOr(Schema.Null)]).annotate({
              description: 'The MCP permission update.',
            }),
          ),
          code_interpreter: Schema.optional(
            Schema.Union([HostedToolPermissionUpdateSchema, Schema.NullOr(Schema.Null)]).annotate({
              description: 'The code interpreter permission update.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectHostedToolPermissionsSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdModelPermissions: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ProjectModelPermissionsSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdModelPermissions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          mode: Schema.Literals(['allow_list', 'deny_list']).annotate({
            description: 'The model permissions mode to apply.',
          }),
          model_ids: Schema.Array(Schema.String).annotate({
            description: 'The model IDs included in this permissions policy.',
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectModelPermissionsSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdModelPermissions: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ProjectModelPermissionsDeleteResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdRateLimits: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(100)),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectRateLimitListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdRateLimitsRateLimitId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          rate_limit_id: Schema.String,
          max_requests_per_1_minute: Schema.optional(
            Schema.Number.check(Schema.isInt()).annotate({
              description: 'The maximum requests per minute.',
            }),
          ),
          max_tokens_per_1_minute: Schema.optional(
            Schema.Number.check(Schema.isInt()).annotate({
              description: 'The maximum tokens per minute.',
            }),
          ),
          max_images_per_1_minute: Schema.optional(
            Schema.Number.check(Schema.isInt()).annotate({
              description: 'The maximum images per minute. Only relevant for certain models.',
            }),
          ),
          max_audio_megabytes_per_1_minute: Schema.optional(
            Schema.Number.check(Schema.isInt()).annotate({
              description:
                'The maximum audio megabytes per minute. Only relevant for certain models.',
            }),
          ),
          max_requests_per_1_day: Schema.optional(
            Schema.Number.check(Schema.isInt()).annotate({
              description: 'The maximum requests per day. Only relevant for certain models.',
            }),
          ),
          batch_1_day_max_input_tokens: Schema.optional(
            Schema.Number.check(Schema.isInt()).annotate({
              description:
                'The maximum batch input tokens per day. Only relevant for certain models.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectRateLimitSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdServiceAccounts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectServiceAccountListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceAccounts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          name: Schema.String.annotate({
            description: 'The name of the service account being created.',
          }),
          create_service_account_only: Schema.optional(
            Schema.Union([
              Schema.Boolean.annotate({
                description: 'Create the service account without default roles or an API key.',
              }),
              Schema.NullOr(Schema.Null),
            ]),
          ),
          expires_in_seconds: Schema.optional(
            Schema.Union([
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(31536000),
              ),
              Schema.NullOr(Schema.Null),
            ]).annotate({
              description:
                'Number of seconds until the initial API key expires. If omitted or null, the key does not expire unless the effective organization or project policy requires an expiration. When a policy sets a maximum lifetime, this value must be provided and must not exceed that limit. A non-null value cannot be used when `create_service_account_only` is true.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectServiceAccountCreateResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdServiceAccountsServiceAccountId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, service_account_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectServiceAccountSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceAccountsServiceAccountId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          service_account_id: Schema.String,
          name: Schema.optional(
            Schema.String.annotate({ description: 'The updated service account name.' }),
          ),
          role: Schema.optional(
            Schema.Literals(['member', 'owner']).annotate({
              description: 'The updated service account role.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectServiceAccountSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdServiceAccountsServiceAccountId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, service_account_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectServiceAccountDeleteResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdSpendAlerts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('asc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectSpendAlertListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdSpendAlerts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          threshold_amount: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
          ).annotate({ description: 'The alert threshold amount, in cents.' }),
          currency: Schema.Literal('USD').annotate({
            description: 'The currency for the threshold amount.',
          }),
          interval: Schema.Literal('month').annotate({
            description: 'The time interval for evaluating spend against the threshold.',
          }),
          notification_channel: SpendAlertNotificationChannelSchema,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectSpendAlertSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdSpendAlertsAlertId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, alert_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectSpendAlertSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdSpendAlertsAlertId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          alert_id: Schema.String,
          threshold_amount: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
          ).annotate({ description: 'The alert threshold amount, in cents.' }),
          currency: Schema.Literal('USD').annotate({
            description: 'The currency for the threshold amount.',
          }),
          interval: Schema.Literal('month').annotate({
            description: 'The time interval for evaluating spend against the threshold.',
          }),
          notification_channel: SpendAlertNotificationChannelSchema,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectSpendAlertSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdSpendAlertsAlertId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, alert_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectSpendAlertDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdUsers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectUserListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdUsers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          user_id: Schema.optional(
            Schema.Union([Schema.String, Schema.NullOr(Schema.Null)]).annotate({
              description: 'The ID of the user.',
            }),
          ),
          email: Schema.optional(
            Schema.Union([Schema.String, Schema.NullOr(Schema.Null)]).annotate({
              description: 'Email of the user to add.',
            }),
          ),
          role: Schema.String.annotate({ description: '`owner` or `member`' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectUserSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdUsersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, user_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectUserSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdUsersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          user_id: Schema.String,
          role: Schema.optional(
            Schema.Union([Schema.String, Schema.NullOr(Schema.Null)]).annotate({
              description: '`owner` or `member`',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectUserSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdUsersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, user_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectUserDeleteResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationRoles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
            Schema.isLessThanOrEqualTo(1000),
          ).pipe(Schema.withDecodingDefault(Effect.succeed(1000))),
          after: Schema.optional(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('asc')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PublicRoleListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationRoles: t.procedure
    .input(Schema.toStandardSchemaV1(PublicCreateOrganizationRoleBodySchema))
    .output(Schema.toStandardSchemaV1(RoleSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationRolesRoleId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ role_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(RoleSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          role_id: Schema.String,
          permissions: Schema.optional(
            Schema.Union([Schema.Array(Schema.String), Schema.NullOr(Schema.Null)]).annotate({
              description: 'Updated set of permissions for the role.',
            }),
          ),
          description: Schema.optional(
            Schema.Union([Schema.String, Schema.NullOr(Schema.Null)]).annotate({
              description: 'New description for the role.',
            }),
          ),
          role_name: Schema.optional(
            Schema.Union([Schema.String, Schema.NullOr(Schema.Null)]).annotate({
              description: 'New name for the role.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RoleSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationRolesRoleId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ role_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(RoleDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationSpendAlerts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('asc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(OrganizationSpendAlertListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationSpendAlerts: t.procedure
    .input(Schema.toStandardSchemaV1(CreateSpendAlertBodySchema))
    .output(Schema.toStandardSchemaV1(OrganizationSpendAlertSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationSpendAlertsAlertId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ alert_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(OrganizationSpendAlertSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationSpendAlertsAlertId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          alert_id: Schema.String,
          threshold_amount: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
          ).annotate({ description: 'The alert threshold amount, in cents.' }),
          currency: Schema.Literal('USD').annotate({
            description: 'The currency for the threshold amount.',
          }),
          interval: Schema.Literal('month').annotate({
            description: 'The time interval for evaluating spend against the threshold.',
          }),
          notification_channel: SpendAlertNotificationChannelSchema,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(OrganizationSpendAlertSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationSpendAlertsAlertId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ alert_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(OrganizationSpendAlertDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageAudioSpeeches: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.Number.check(Schema.isInt()),
          end_time: Schema.optional(Schema.Number.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefault(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(Schema.Array(Schema.String)),
          user_ids: Schema.optional(Schema.Array(Schema.String)),
          api_key_ids: Schema.optional(Schema.Array(Schema.String)),
          models: Schema.optional(Schema.Array(Schema.String)),
          group_by: Schema.optional(
            Schema.Array(Schema.Literals(['project_id', 'user_id', 'api_key_id', 'model'])),
          ),
          limit: Schema.optional(Schema.Number.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UsageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageAudioTranscriptions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.Number.check(Schema.isInt()),
          end_time: Schema.optional(Schema.Number.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefault(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(Schema.Array(Schema.String)),
          user_ids: Schema.optional(Schema.Array(Schema.String)),
          api_key_ids: Schema.optional(Schema.Array(Schema.String)),
          models: Schema.optional(Schema.Array(Schema.String)),
          group_by: Schema.optional(
            Schema.Array(Schema.Literals(['project_id', 'user_id', 'api_key_id', 'model'])),
          ),
          limit: Schema.optional(Schema.Number.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UsageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageCodeInterpreterSessions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.Number.check(Schema.isInt()),
          end_time: Schema.optional(Schema.Number.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefault(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(Schema.Array(Schema.String)),
          group_by: Schema.optional(Schema.Array(Schema.Literal('project_id'))),
          limit: Schema.optional(Schema.Number.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UsageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageCompletions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.Number.check(Schema.isInt()),
          end_time: Schema.optional(Schema.Number.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefault(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(Schema.Array(Schema.String)),
          user_ids: Schema.optional(Schema.Array(Schema.String)),
          api_key_ids: Schema.optional(Schema.Array(Schema.String)),
          models: Schema.optional(Schema.Array(Schema.String)),
          batch: Schema.optional(Schema.Boolean),
          group_by: Schema.optional(
            Schema.Array(
              Schema.Literals([
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
          limit: Schema.optional(Schema.Number.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UsageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageEmbeddings: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.Number.check(Schema.isInt()),
          end_time: Schema.optional(Schema.Number.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefault(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(Schema.Array(Schema.String)),
          user_ids: Schema.optional(Schema.Array(Schema.String)),
          api_key_ids: Schema.optional(Schema.Array(Schema.String)),
          models: Schema.optional(Schema.Array(Schema.String)),
          group_by: Schema.optional(
            Schema.Array(Schema.Literals(['project_id', 'user_id', 'api_key_id', 'model'])),
          ),
          limit: Schema.optional(Schema.Number.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UsageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageFileSearchCalls: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.Number.check(Schema.isInt()),
          end_time: Schema.optional(Schema.Number.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefault(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(Schema.Array(Schema.String)),
          user_ids: Schema.optional(Schema.Array(Schema.String)),
          api_key_ids: Schema.optional(Schema.Array(Schema.String)),
          vector_store_ids: Schema.optional(Schema.Array(Schema.String)),
          group_by: Schema.optional(
            Schema.Array(
              Schema.Literals(['project_id', 'user_id', 'api_key_id', 'vector_store_id']),
            ),
          ),
          limit: Schema.optional(Schema.Number.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UsageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageImages: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.Number.check(Schema.isInt()),
          end_time: Schema.optional(Schema.Number.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefault(Effect.succeed('1d')),
          ),
          sources: Schema.optional(
            Schema.Array(Schema.Literals(['image.generation', 'image.edit', 'image.variation'])),
          ),
          sizes: Schema.optional(
            Schema.Array(
              Schema.Literals(['256x256', '512x512', '1024x1024', '1792x1792', '1024x1792']),
            ),
          ),
          project_ids: Schema.optional(Schema.Array(Schema.String)),
          user_ids: Schema.optional(Schema.Array(Schema.String)),
          api_key_ids: Schema.optional(Schema.Array(Schema.String)),
          models: Schema.optional(Schema.Array(Schema.String)),
          group_by: Schema.optional(
            Schema.Array(
              Schema.Literals(['project_id', 'user_id', 'api_key_id', 'model', 'size', 'source']),
            ),
          ),
          limit: Schema.optional(Schema.Number.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UsageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageModerations: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.Number.check(Schema.isInt()),
          end_time: Schema.optional(Schema.Number.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefault(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(Schema.Array(Schema.String)),
          user_ids: Schema.optional(Schema.Array(Schema.String)),
          api_key_ids: Schema.optional(Schema.Array(Schema.String)),
          models: Schema.optional(Schema.Array(Schema.String)),
          group_by: Schema.optional(
            Schema.Array(Schema.Literals(['project_id', 'user_id', 'api_key_id', 'model'])),
          ),
          limit: Schema.optional(Schema.Number.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UsageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageVectorStores: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.Number.check(Schema.isInt()),
          end_time: Schema.optional(Schema.Number.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefault(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(Schema.Array(Schema.String)),
          group_by: Schema.optional(Schema.Array(Schema.Literal('project_id'))),
          limit: Schema.optional(Schema.Number.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UsageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsageWebSearchCalls: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.Number.check(Schema.isInt()),
          end_time: Schema.optional(Schema.Number.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefault(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(Schema.Array(Schema.String)),
          user_ids: Schema.optional(Schema.Array(Schema.String)),
          api_key_ids: Schema.optional(Schema.Array(Schema.String)),
          models: Schema.optional(Schema.Array(Schema.String)),
          context_levels: Schema.optional(Schema.Array(Schema.Literals(['low', 'medium', 'high']))),
          group_by: Schema.optional(
            Schema.Array(
              Schema.Literals([
                'project_id',
                'user_id',
                'api_key_id',
                'model',
                'context_level',
                'api_source',
              ]),
            ),
          ),
          limit: Schema.optional(Schema.Number.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UsageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
          emails: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UserListResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsersUserId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(UserSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationUsersUserId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_id: Schema.String,
          role: Schema.optional(
            Schema.Union([Schema.String, Schema.NullOr(Schema.Null)]).annotate({
              description: '`owner` or `reader`',
            }),
          ),
          role_id: Schema.optional(
            Schema.Union([Schema.String, Schema.NullOr(Schema.Null)]).annotate({
              description: 'Role ID to assign to the user.',
            }),
          ),
          technical_level: Schema.optional(
            Schema.Union([Schema.String, Schema.NullOr(Schema.Null)]).annotate({
              description: 'Technical level metadata.',
            }),
          ),
          developer_persona: Schema.optional(
            Schema.Union([Schema.String, Schema.NullOr(Schema.Null)]).annotate({
              description: 'Developer persona metadata.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UserSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationUsersUserId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(UserDeleteResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsersUserIdRoles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_id: Schema.String,
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1000),
            ),
          ),
          after: Schema.optional(Schema.String),
          order: Schema.optional(Schema.Literals(['asc', 'desc'])),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RoleListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationUsersUserIdRoles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_id: Schema.String,
          role_id: Schema.String.annotate({ description: 'Identifier of the role to assign.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UserRoleAssignmentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationUsersUserIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String, role_id: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(AssignedRoleDetailsSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationUsersUserIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String, role_id: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(DeletedRoleAssignmentResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationExternalKeys: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(Schema.Union([Schema.String, Schema.NullOr(Schema.Null)])),
          purpose: Schema.optional(ExternalKeyPurposeSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListExternalKeysResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationExternalKeys: t.procedure
    .input(Schema.toStandardSchemaV1(V1OrganizationExternalKeysPostRequestSchema))
    .output(Schema.toStandardSchemaV1(ExternalKeyResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationExternalKeysExternalKeyId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ external_key_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ExternalKeyResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationExternalKeysExternalKeyId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ external_key_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ExternalKeyResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationExternalKeysExternalKeyIdValidate: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ external_key_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ValidateExternalKeyResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProviders: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.Union([
            Schema.Literal('asc').pipe(Schema.withDecodingDefault(Effect.succeed('asc'))),
            Schema.Literal('desc').pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          ]),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PlatformProviderListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationWorkloadIdentityProviders: t.procedure
    .input(Schema.toStandardSchemaV1(CreatePlatformWorkloadIdentityProviderBodySchema))
    .output(Schema.toStandardSchemaV1(PlatformProviderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          workload_identity_provider_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PlatformProviderSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          workload_identity_provider_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
          ),
          issuer: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
          ),
          audience: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
          ),
          verification: Schema.optional(
            Schema.Union([DiscoveryVerificationParamSchema, UploadedJwksVerificationParamSchema]),
          ),
          description: Schema.optional(Schema.Union([Schema.String, Schema.NullOr(Schema.Null)])),
          attribute_transformations: Schema.optional(
            Schema.Array(TransformationParamSchema).check(Schema.isMaxLength(20)),
          ),
          enabled: Schema.optional(Schema.Boolean),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PlatformProviderSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          workload_identity_provider_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PlatformProviderDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          workload_identity_provider_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.Union([
            Schema.Literal('asc').pipe(Schema.withDecodingDefault(Effect.succeed('asc'))),
            Schema.Literal('desc').pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          ]),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
          ),
          service_account_id: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PlatformFederationRuleListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          workload_identity_provider_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
          project_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
          service_account_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
          name: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          attribute_matchers: Schema.Record(
            Schema.String,
            Schema.Union([
              Schema.String,
              Schema.Boolean,
              Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Number]),
            ]),
          ),
          permissions: Schema.optional(
            Schema.Union([DefaultPermissionsParamSchema, RestrictedPermissionsParamSchema]),
          ),
          enabled: Schema.optional(Schema.Boolean),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PlatformFederationRuleSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    t.procedure
      .input(
        Schema.toStandardSchemaV1(
          Schema.Struct({
            workload_identity_provider_id: Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
            workload_identity_federation_rule_id: Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
          }),
        ),
      )
      .output(Schema.toStandardSchemaV1(PlatformFederationRuleSchema))
      .query(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    t.procedure
      .input(
        Schema.toStandardSchemaV1(
          Schema.Struct({
            workload_identity_provider_id: Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
            workload_identity_federation_rule_id: Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
            name: Schema.optional(Schema.Union([Schema.String, Schema.NullOr(Schema.Null)])),
            description: Schema.optional(Schema.Union([Schema.String, Schema.NullOr(Schema.Null)])),
            attribute_matchers: Schema.optional(
              Schema.Record(
                Schema.String,
                Schema.Union([
                  Schema.String,
                  Schema.Boolean,
                  Schema.Union([Schema.Number.check(Schema.isInt()), Schema.Number]),
                ]),
              ),
            ),
            permissions: Schema.optional(
              Schema.Union([DefaultPermissionsParamSchema, RestrictedPermissionsParamSchema]),
            ),
            enabled: Schema.optional(Schema.Boolean),
          }),
        ),
      )
      .output(Schema.toStandardSchemaV1(PlatformFederationRuleSchema))
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId:
    t.procedure
      .input(
        Schema.toStandardSchemaV1(
          Schema.Struct({
            workload_identity_provider_id: Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
            workload_identity_federation_rule_id: Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
          }),
        ),
      )
      .output(Schema.toStandardSchemaV1(PlatformFederationRuleDeletedResourceSchema))
      .mutation(() => {
        throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
      }),
  getOrganizationUsageDecisions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.Number.check(Schema.isInt()),
          end_time: Schema.optional(
            Schema.Union([Schema.Number.check(Schema.isInt()), Schema.NullOr(Schema.Null)]),
          ),
          bucket_width: Schema.optional(
            Schema.Union([
              Schema.Union([DecisionsUsageBucketWidthSchema]).annotate({
                description:
                  'Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.',
              }),
              Schema.NullOr(Schema.Null),
            ]),
          ),
          limit: Schema.optional(
            Schema.Union([Schema.Number.check(Schema.isInt()), Schema.NullOr(Schema.Null)]),
          ),
          page: Schema.optional(
            Schema.Union([
              Schema.String.annotate({
                description:
                  'A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.',
              }),
              Schema.NullOr(Schema.Null),
            ]),
          ),
          project_ids: Schema.optional(
            Schema.Union([
              Schema.Union([Schema.Array(Schema.String)]).annotate({
                description: 'Return only usage for these projects.',
              }),
              Schema.NullOr(Schema.Null),
            ]),
          ),
          group_by: Schema.optional(
            Schema.Union([
              Schema.Union([Schema.Array(DecisionsUsageGroupBySchema)]).annotate({
                description:
                  'Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier`, `api_source` or any combination of them. When grouped by `api_source`, results use `agents_api` for attributed Agents API activity and `unlabeled` for all other activity. Without source grouping, `api_source` is null.',
              }),
              Schema.NullOr(Schema.Null),
            ]),
          ),
          user_ids: Schema.optional(
            Schema.Union([
              Schema.Union([Schema.Array(Schema.String)]).annotate({
                description: 'Return only usage for these users.',
              }),
              Schema.NullOr(Schema.Null),
            ]),
          ),
          api_key_ids: Schema.optional(
            Schema.Union([
              Schema.Union([Schema.Array(Schema.String)]).annotate({
                description: 'Return only usage for these API keys.',
              }),
              Schema.NullOr(Schema.Null),
            ]),
          ),
          models: Schema.optional(
            Schema.Union([
              Schema.Union([Schema.Array(Schema.String)]).annotate({
                description: 'Return only usage for these models.',
              }),
              Schema.NullOr(Schema.Null),
            ]),
          ),
          batch: Schema.optional(Schema.Union([Schema.Boolean, Schema.NullOr(Schema.Null)])),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PublicDecisionsUsageResponseResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationExternalStorage: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.optional(
            Schema.Union([
              Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }),
              Schema.NullOr(Schema.Null),
            ]),
          ),
          after: Schema.optional(
            Schema.Union([
              Schema.String.annotate({
                description: 'Return external storage configurations after this ID.',
              }),
              Schema.NullOr(Schema.Null),
            ]),
          ),
          order: Schema.optional(ExternalStorageOrderSchema),
          limit: Schema.optional(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ExternalStorageListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationExternalStorage: t.procedure
    .input(Schema.toStandardSchemaV1(CreateExternalStorageBodySchema))
    .output(Schema.toStandardSchemaV1(ExternalStorageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationExternalStorageExternalStorageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          external_storage_id: Schema.String.annotate({ jsonSchemaExamples: ['extstorage_123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ExternalStorageResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationExternalStorageExternalStorageId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          external_storage_id: Schema.String.annotate({ jsonSchemaExamples: ['extstorage_123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ExternalStorageDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationExternalStorageExternalStorageIdValidate: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          external_storage_id: Schema.String.annotate({ jsonSchemaExamples: ['extstorage_123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ExternalStorageResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationSpendLimit: t.procedure
    .output(Schema.toStandardSchemaV1(OrganizationSpendLimitResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationSpendLimit: t.procedure
    .input(Schema.toStandardSchemaV1(UpdateOrganizationSpendLimitBodySchema))
    .output(Schema.toStandardSchemaV1(OrganizationSpendLimitResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationSpendLimit: t.procedure
    .output(Schema.toStandardSchemaV1(OrganizationSpendLimitDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdSpendLimit: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectSpendLimitResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdSpendLimit: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }),
          threshold_amount: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
          ).annotate({ description: 'The hard spend limit amount, in cents.' }),
          currency: Schema.Literal('USD').annotate({
            description:
              'The currency for the threshold amount. Currently, only `USD` is supported.',
          }),
          interval: Schema.Literal('month').annotate({
            description:
              'The time interval for evaluating spend against the threshold. Currently, only `month` is supported.',
          }),
          notification_channel: Schema.optional(
            Schema.Union([
              SpendLimitEmailNotificationChannelParamsSchema.annotate({
                description:
                  'Configure email notifications when the spend limit is reached. Leave this out to keep the current settings, or send null to reset to owner-only notifications.',
              }),
              Schema.NullOr(Schema.Null),
            ]),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectSpendLimitResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteOrganizationProjectsProjectIdSpendLimit: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectSpendLimitDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getOrganizationProjectsProjectIdServiceTierSettings: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String.annotate({ description: 'The ID of the project' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectServiceTierSettingsResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceTierSettings: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String.annotate({ description: 'The ID of the project' }),
          default: Schema.optional(
            ProjectDefaultServiceTierSchema.annotate({
              description: 'Default tier for requests that omit service_tier or use auto.',
            }),
          ),
          enabled_tiers: Schema.Union([
            Schema.Literal('all').pipe(Schema.withDecodingDefault(Effect.succeed('all'))),
            Schema.Array(ProjectOptionalServiceTierSchema),
          ]).annotate({
            description:
              'Additional service tiers enabled for this project. "all" includes future tiers. An empty array allows only Standard. Organization policy and eligibility still apply.',
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ProjectServiceTierSettingsResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeys: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String.annotate({ description: 'The ID of the project.' }),
          service_account_id: Schema.String.annotate({
            description: 'The ID of the service account.',
          }),
          name: Schema.optional(Schema.String.annotate({ description: 'API key name.' })),
          scopes: Schema.optional(
            Schema.Array(Schema.String.annotate({ description: 'API key scope.' })).annotate({
              description: 'API key scopes.',
            }),
          ),
          expires_in_seconds: Schema.optional(
            Schema.Union([
              Schema.Number.check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(31536000),
              ).annotate({ description: 'Number of seconds until the API key expires.' }),
              Schema.NullOr(Schema.Null),
            ]),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ServiceAccountApiKeyBodySchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
