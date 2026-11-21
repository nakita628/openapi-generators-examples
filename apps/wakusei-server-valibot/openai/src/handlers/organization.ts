import { os } from '@orpc/server'
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

export const getOrganizationAdminApiKeys = os
  .route({
    method: 'GET',
    path: '/organization/admin_api_keys',
    summary: 'List all organization and project API keys.',
    description: 'List organization API keys',
    successDescription: 'A list of organization API keys.',
  })
  .input(
    v.object({
      after: v.optional(
        v.pipe(
          v.nullable(v.string()),
          v.description('Return keys with IDs that come after this ID in the pagination order.'),
        ),
      ),
      order: v.optional(
        v.pipe(
          v.optional(v.picklist(['asc', 'desc']), 'asc'),
          v.description('Order results by creation time, ascending or descending.'),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
          v.description('Maximum number of keys to return.'),
        ),
      ),
    }),
  )
  .output(ApiKeyListSchema)
  .handler(async ({ input }) => {})

export const postOrganizationAdminApiKeys = os
  .route({
    method: 'POST',
    path: '/organization/admin_api_keys',
    summary: 'Create admin API key',
    description: 'Create an organization admin API key',
    successDescription: 'The newly created admin API key.',
  })
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
  .handler(async ({ input }) => {})

export const getOrganizationAdminApiKeysKeyId = os
  .route({
    method: 'GET',
    path: '/organization/admin_api_keys/{key_id}',
    summary: 'Retrieve admin API key',
    description: 'Retrieve a single organization API key',
    successDescription: 'Details of the requested API key.',
  })
  .input(v.object({ key_id: v.pipe(v.string(), v.description('The ID of the API key.')) }))
  .output(AdminApiKeySchema)
  .handler(async ({ input }) => {})

export const deleteOrganizationAdminApiKeysKeyId = os
  .route({
    method: 'DELETE',
    path: '/organization/admin_api_keys/{key_id}',
    summary: 'Delete admin API key',
    description: 'Delete an organization admin API key',
    successDescription: 'Confirmation that the API key was deleted.',
  })
  .input(
    v.object({ key_id: v.pipe(v.string(), v.description('The ID of the API key to be deleted.')) }),
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
  .handler(async ({ input }) => {})

export const getOrganizationAuditLogs = os
  .route({
    method: 'GET',
    path: '/organization/audit_logs',
    tags: ['Audit Logs'],
    summary: 'List audit logs',
    description: 'List user actions and configuration changes within this organization.',
    successDescription: 'Audit logs listed successfully.',
  })
  .input(
    v.object({
      effective_at: v.optional(
        v.partial(
          v.object({
            gt: v.pipe(
              v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
              v.description(
                'Return only events whose `effective_at` (Unix seconds) is greater than this value.',
              ),
            ),
            gte: v.pipe(
              v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
              v.description(
                'Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.',
              ),
            ),
            lt: v.pipe(
              v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
              v.description(
                'Return only events whose `effective_at` (Unix seconds) is less than this value.',
              ),
            ),
            lte: v.pipe(
              v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
              v.description(
                'Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.',
              ),
            ),
          }),
        ),
      ),
      'project_ids[]': v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      'event_types[]': v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(AuditLogEventTypeSchema),
        ),
      ),
      'actor_ids[]': v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      'actor_emails[]': v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      'resource_ids[]': v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      tenant_only: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          'false',
        ),
      ),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      after: v.optional(v.string()),
      before: v.optional(v.string()),
    }),
  )
  .output(ListAuditLogsResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationCertificates = os
  .route({
    method: 'GET',
    path: '/organization/certificates',
    tags: ['Certificates'],
    summary: 'List organization certificates',
    description: 'List uploaded certificates for this organization.',
    successDescription: 'Certificates listed successfully.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      after: v.optional(v.string()),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'desc')),
    }),
  )
  .output(ListCertificatesResponseSchema)
  .handler(async ({ input }) => {})

export const postOrganizationCertificates = os
  .route({
    method: 'POST',
    path: '/organization/certificates',
    tags: ['Certificates'],
    summary: 'Upload certificate',
    description:
      'Upload a certificate to the organization. This does **not** automatically activate the certificate.\n\nOrganizations can upload up to 50 certificates.\n',
    successDescription: 'Certificate uploaded successfully.',
  })
  .input(UploadCertificateRequestSchema)
  .output(CertificateSchema)
  .handler(async ({ input }) => {})

export const postOrganizationCertificatesActivate = os
  .route({
    method: 'POST',
    path: '/organization/certificates/activate',
    tags: ['Certificates'],
    summary: 'Activate certificates for organization',
    description:
      'Activate certificates at the organization level.\n\nYou can atomically and idempotently activate up to 10 certificates at a time.\n',
    successDescription: 'Certificates activated successfully.',
  })
  .input(ToggleCertificatesRequestSchema)
  .output(OrganizationCertificateActivationResponseSchema)
  .handler(async ({ input }) => {})

export const postOrganizationCertificatesDeactivate = os
  .route({
    method: 'POST',
    path: '/organization/certificates/deactivate',
    tags: ['Certificates'],
    summary: 'Deactivate certificates for organization',
    description:
      'Deactivate certificates at the organization level.\n\nYou can atomically and idempotently deactivate up to 10 certificates at a time.\n',
    successDescription: 'Certificates deactivated successfully.',
  })
  .input(ToggleCertificatesRequestSchema)
  .output(OrganizationCertificateDeactivationResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationCertificatesCertificateId = os
  .route({
    method: 'GET',
    path: '/organization/certificates/{certificate_id}',
    tags: ['Certificates'],
    summary: 'Get certificate',
    description:
      'Get a certificate that has been uploaded to the organization.\n\nYou can get a certificate regardless of whether it is active or not.\n',
    successDescription: 'Certificate retrieved successfully.',
  })
  .input(
    v.object({
      certificate_id: v.string(),
      include: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.literal('content')),
        ),
      ),
    }),
  )
  .output(CertificateSchema)
  .handler(async ({ input }) => {})

export const postOrganizationCertificatesCertificateId = os
  .route({
    method: 'POST',
    path: '/organization/certificates/{certificate_id}',
    tags: ['Certificates'],
    summary: 'Modify certificate',
    description: 'Modify a certificate. Note that only the name can be modified.\n',
    successDescription: 'Certificate modified successfully.',
  })
  .input(
    v.object({
      certificate_id: v.string(),
      name: v.optional(v.pipe(v.string(), v.description('The updated name for the certificate'))),
    }),
  )
  .output(CertificateSchema)
  .handler(async ({ input }) => {})

export const deleteOrganizationCertificatesCertificateId = os
  .route({
    method: 'DELETE',
    path: '/organization/certificates/{certificate_id}',
    tags: ['Certificates'],
    summary: 'Delete certificate',
    description:
      'Delete a certificate from the organization.\n\nThe certificate must be inactive for the organization and all projects.\n',
    successDescription: 'Certificate deleted successfully.',
  })
  .input(v.object({ certificate_id: v.string() }))
  .output(DeleteCertificateResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationCosts = os
  .route({
    method: 'GET',
    path: '/organization/costs',
    tags: ['Usage'],
    summary: 'Costs',
    description: 'Get costs details for the organization.',
    successDescription: 'Costs data retrieved successfully.',
  })
  .input(
    v.object({
      start_time: v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      end_time: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      bucket_width: v.optional(v.optional(v.literal('1d'), '1d')),
      project_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      api_key_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      line_items: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      group_by: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.picklist(['project_id', 'user_id', 'line_item', 'api_key_id', 'api_source'])),
        ),
      ),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '7'),
      ),
      page: v.optional(v.string()),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationDataRetention = os
  .route({
    method: 'GET',
    path: '/organization/data_retention',
    tags: ['Data retention'],
    summary: 'Retrieve organization data retention',
    description: 'Retrieves organization data retention controls.',
    successDescription: 'Organization data retention controls retrieved successfully.',
  })
  .output(OrganizationDataRetentionSchema)
  .handler(async ({ input }) => {})

export const postOrganizationDataRetention = os
  .route({
    method: 'POST',
    path: '/organization/data_retention',
    tags: ['Data retention'],
    summary: 'Update organization data retention',
    description: 'Updates organization data retention controls.',
    successDescription: 'Organization data retention controls updated successfully.',
  })
  .input(UpdateOrganizationDataRetentionBodySchema)
  .output(OrganizationDataRetentionSchema)
  .handler(async ({ input }) => {})

export const getOrganizationGroups = os
  .route({
    method: 'GET',
    path: '/organization/groups',
    tags: ['Groups'],
    summary: 'List groups',
    description: 'Lists all groups in the organization.',
    successDescription: 'Groups listed successfully.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(1000),
          ),
          '100',
        ),
      ),
      after: v.optional(v.string()),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'asc')),
    }),
  )
  .output(GroupListResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationGroups = os
  .route({
    method: 'POST',
    path: '/organization/groups',
    tags: ['Groups'],
    summary: 'Create group',
    description: 'Creates a new group in the organization.',
    successDescription: 'Group created successfully.',
  })
  .input(CreateGroupBodySchema)
  .output(GroupResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationGroupsGroupId = os
  .route({
    method: 'GET',
    path: '/organization/groups/{group_id}',
    tags: ['Groups'],
    summary: 'Retrieve group',
    description: 'Retrieves a group.',
    successDescription: 'Group retrieved successfully.',
  })
  .input(v.object({ group_id: v.string() }))
  .output(GroupResponseSchema)
  .handler(async ({ input }) => {})

export const postOrganizationGroupsGroupId = os
  .route({
    method: 'POST',
    path: '/organization/groups/{group_id}',
    tags: ['Groups'],
    summary: 'Update group',
    description: "Updates a group's information.",
    successDescription: 'Group updated successfully.',
  })
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
  .handler(async ({ input }) => {})

export const deleteOrganizationGroupsGroupId = os
  .route({
    method: 'DELETE',
    path: '/organization/groups/{group_id}',
    tags: ['Groups'],
    summary: 'Delete group',
    description: 'Deletes a group from the organization.',
    successDescription: 'Group deleted successfully.',
  })
  .input(v.object({ group_id: v.string() }))
  .output(GroupDeletedResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationGroupsGroupIdRoles = os
  .route({
    method: 'GET',
    path: '/organization/groups/{group_id}/roles',
    tags: ['Group organization role assignments'],
    summary: 'List group organization role assignments',
    description: 'Lists the organization roles assigned to a group within the organization.',
    successDescription: 'Group organization role assignments listed successfully.',
  })
  .input(
    v.object({
      group_id: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(1000),
        ),
      ),
      after: v.optional(v.string()),
      order: v.optional(v.picklist(['asc', 'desc'])),
    }),
  )
  .output(RoleListResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationGroupsGroupIdRoles = os
  .route({
    method: 'POST',
    path: '/organization/groups/{group_id}/roles',
    tags: ['Group organization role assignments'],
    summary: 'Assign organization role to group',
    description: 'Assigns an organization role to a group within the organization.',
    successDescription: 'Organization role assigned to the group successfully.',
  })
  .input(
    v.object({
      group_id: v.string(),
      role_id: v.pipe(v.string(), v.description('Identifier of the role to assign.')),
    }),
  )
  .output(GroupRoleAssignmentSchema)
  .handler(async ({ input }) => {})

export const getOrganizationGroupsGroupIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/organization/groups/{group_id}/roles/{role_id}',
    tags: ['Group organization role assignments'],
    summary: 'Retrieve group organization role',
    description: 'Retrieves an organization role assigned to a group.',
    successDescription: 'Organization role retrieved for the group successfully.',
  })
  .input(v.object({ group_id: v.string(), role_id: v.string() }))
  .output(AssignedRoleDetailsSchema)
  .handler(async ({ input }) => {})

export const deleteOrganizationGroupsGroupIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/organization/groups/{group_id}/roles/{role_id}',
    tags: ['Group organization role assignments'],
    summary: 'Unassign organization role from group',
    description: 'Unassigns an organization role from a group within the organization.',
    successDescription: 'Organization role unassigned from the group successfully.',
  })
  .input(v.object({ group_id: v.string(), role_id: v.string() }))
  .output(DeletedRoleAssignmentResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationGroupsGroupIdUsers = os
  .route({
    method: 'GET',
    path: '/organization/groups/{group_id}/users',
    tags: ['Group users'],
    summary: 'List group users',
    description: 'Lists the users assigned to a group.',
    successDescription: 'Group users listed successfully.',
  })
  .input(
    v.object({
      group_id: v.string(),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(1000),
          ),
          '100',
        ),
      ),
      after: v.optional(v.string()),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'desc')),
    }),
  )
  .output(UserListResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationGroupsGroupIdUsers = os
  .route({
    method: 'POST',
    path: '/organization/groups/{group_id}/users',
    tags: ['Group users'],
    summary: 'Add group user',
    description: 'Adds a user to a group.',
    successDescription: 'User added to the group successfully.',
  })
  .input(
    v.object({
      group_id: v.string(),
      user_id: v.pipe(v.string(), v.description('Identifier of the user to add to the group.')),
    }),
  )
  .output(GroupUserAssignmentSchema)
  .handler(async ({ input }) => {})

export const getOrganizationGroupsGroupIdUsersUserId = os
  .route({
    method: 'GET',
    path: '/organization/groups/{group_id}/users/{user_id}',
    tags: ['Group users'],
    summary: 'Retrieve group user',
    description: 'Retrieves a user in a group.',
    successDescription: 'User retrieved from the group successfully.',
  })
  .input(v.object({ group_id: v.string(), user_id: v.string() }))
  .output(GroupMemberUserSchema)
  .handler(async ({ input }) => {})

export const deleteOrganizationGroupsGroupIdUsersUserId = os
  .route({
    method: 'DELETE',
    path: '/organization/groups/{group_id}/users/{user_id}',
    tags: ['Group users'],
    summary: 'Remove group user',
    description: 'Removes a user from a group.',
    successDescription: 'User removed from the group successfully.',
  })
  .input(v.object({ group_id: v.string(), user_id: v.string() }))
  .output(GroupUserDeletedResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationInvites = os
  .route({
    method: 'GET',
    path: '/organization/invites',
    tags: ['Invites'],
    summary: 'List invites',
    description: 'Returns a list of invites in the organization.',
    successDescription: 'Invites listed successfully.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      after: v.optional(v.string()),
    }),
  )
  .output(InviteListResponseSchema)
  .handler(async ({ input }) => {})

export const postOrganizationInvites = os
  .route({
    method: 'POST',
    path: '/organization/invites',
    tags: ['Invites'],
    summary: 'Create invite',
    description:
      'Create an invite for a user to the organization. The invite must be accepted by the user before they have access to the organization.',
    successDescription: 'User invited successfully.',
  })
  .input(InviteRequestSchema)
  .output(InviteSchema)
  .handler(async ({ input }) => {})

export const getOrganizationInvitesInviteId = os
  .route({
    method: 'GET',
    path: '/organization/invites/{invite_id}',
    tags: ['Invites'],
    summary: 'Retrieve invite',
    description: 'Retrieves an invite.',
    successDescription: 'Invite retrieved successfully.',
  })
  .input(v.object({ invite_id: v.string() }))
  .output(InviteSchema)
  .handler(async ({ input }) => {})

export const deleteOrganizationInvitesInviteId = os
  .route({
    method: 'DELETE',
    path: '/organization/invites/{invite_id}',
    tags: ['Invites'],
    summary: 'Delete invite',
    description: 'Delete an invite. If the invite has already been accepted, it cannot be deleted.',
    successDescription: 'Invite deleted successfully.',
  })
  .input(v.object({ invite_id: v.string() }))
  .output(InviteDeleteResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationProjects = os
  .route({
    method: 'GET',
    path: '/organization/projects',
    tags: ['Projects'],
    summary: 'List projects',
    description: 'Returns a list of projects.',
    successDescription: 'Projects listed successfully.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      after: v.optional(v.string()),
      include_archived: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          'false',
        ),
      ),
    }),
  )
  .output(ProjectListResponseSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjects = os
  .route({
    method: 'POST',
    path: '/organization/projects',
    tags: ['Projects'],
    summary: 'Create project',
    description:
      'Create a new project in the organization. Projects can be created and archived, but cannot be deleted.',
    successDescription: 'Project created successfully.',
  })
  .input(ProjectCreateRequestSchema)
  .output(ProjectSchema)
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectId = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}',
    tags: ['Projects'],
    summary: 'Retrieve project',
    description: 'Retrieves a project.',
    successDescription: 'Project retrieved successfully.',
  })
  .input(v.object({ project_id: v.string() }))
  .output(ProjectSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectId = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}',
    tags: ['Projects'],
    summary: 'Modify project',
    description: 'Modifies a project in the organization.',
    successDescription: 'Project updated successfully.',
  })
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
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdApiKeys = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/api_keys',
    tags: ['Projects'],
    summary: 'List project API keys',
    description: 'Returns a list of API keys in the project.',
    successDescription: 'Project API keys listed successfully.',
  })
  .input(
    v.object({
      project_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      after: v.optional(v.string()),
      owner_project_access: v.optional(v.picklist(['active', 'inactive', 'any'])),
    }),
  )
  .output(ProjectApiKeyListResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdApiKeysApiKeyId = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/api_keys/{api_key_id}',
    tags: ['Projects'],
    summary: 'Retrieve project API key',
    description: 'Retrieves an API key in the project.',
    successDescription: 'Project API key retrieved successfully.',
  })
  .input(v.object({ project_id: v.string(), api_key_id: v.string() }))
  .output(ProjectApiKeySchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdApiKeysApiKeyId = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/api_keys/{api_key_id}',
    tags: ['Projects'],
    summary: 'Update project API key',
    description:
      'Updates the scopes and/or expiration of an existing API key in the project, including a\nservice-account-owned key. Requires permission to write project API keys.\n\nProvide at least one of `scopes` or `expires_in_seconds`. Omitted fields stay\nunchanged; neither field accepts `null`. Both changes are saved together.\n\n`scopes` replaces the key\'s scope restrictions using the same scope identifiers\nas the dashboard. An empty array means All permissions, subject to the owner\'s\neffective access; it does not mean no access. Use `["api.all.read"]` for read-only\naccess or specific scopes such as `["api.files.read"]` for restricted access.\nThis does not change user or service-account roles or grant admin permissions.\nScope changes follow the same authentication-cache propagation as dashboard edits.\n\nProvide `expires_in_seconds` to set the expiration relative to this request.\nThe value must satisfy the organization\'s and project\'s expiry policies.\nExpired keys cannot be updated. Retrying resets the expiration relative to\nthe new request. The response contains only the redacted key, not its secret.\n',
    successDescription: 'Project API key updated successfully.',
  })
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
  .handler(async ({ input }) => {})

export const deleteOrganizationProjectsProjectIdApiKeysApiKeyId = os
  .route({
    method: 'DELETE',
    path: '/organization/projects/{project_id}/api_keys/{api_key_id}',
    tags: ['Projects'],
    summary: 'Delete project API key',
    description:
      'Deletes an API key from the project, including keys owned by service accounts.\n\nRequires permission to write project API keys. Deleting a service-account key\ndoes not delete the service account or its other keys.\n\nReturns confirmation of the key deletion.\n',
    successDescription: 'Project API key deleted successfully.',
  })
  .input(v.object({ project_id: v.string(), api_key_id: v.string() }))
  .output(ProjectApiKeyDeleteResponseSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdArchive = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/archive',
    tags: ['Projects'],
    summary: 'Archive project',
    description:
      'Archives a project in the organization. Archived projects cannot be used or updated.',
    successDescription: 'Project archived successfully.',
  })
  .input(v.object({ project_id: v.string() }))
  .output(ProjectSchema)
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdCertificates = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/certificates',
    tags: ['Certificates'],
    summary: 'List project certificates',
    description: 'List certificates for this project.',
    successDescription: 'Certificates listed successfully.',
  })
  .input(
    v.object({
      project_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      after: v.optional(v.string()),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'desc')),
    }),
  )
  .output(ListProjectCertificatesResponseSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdCertificatesActivate = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/certificates/activate',
    tags: ['Certificates'],
    summary: 'Activate certificates for project',
    description:
      'Activate certificates at the project level.\n\nYou can atomically and idempotently activate up to 10 certificates at a time.\n',
    successDescription: 'Certificates activated successfully.',
  })
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
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdCertificatesDeactivate = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/certificates/deactivate',
    tags: ['Certificates'],
    summary: 'Deactivate certificates for project',
    description:
      'Deactivate certificates at the project level. You can atomically and \nidempotently deactivate up to 10 certificates at a time.\n',
    successDescription: 'Certificates deactivated successfully.',
  })
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
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdDataRetention = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/data_retention',
    tags: ['Data retention'],
    summary: 'Retrieve project data retention',
    description: 'Retrieves project data retention controls.',
    successDescription: 'Project data retention controls retrieved successfully.',
  })
  .input(v.object({ project_id: v.string() }))
  .output(ProjectDataRetentionSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdDataRetention = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/data_retention',
    tags: ['Data retention'],
    summary: 'Update project data retention',
    description: 'Updates project data retention controls.',
    successDescription: 'Project data retention controls updated successfully.',
  })
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
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdGroups = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/groups',
    tags: ['Project groups'],
    summary: 'List project groups',
    description: 'Lists the groups that have access to a project.',
    successDescription: 'Project groups listed successfully.',
  })
  .input(
    v.object({
      project_id: v.string(),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
          '20',
        ),
      ),
      after: v.optional(v.string()),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'asc')),
    }),
  )
  .output(ProjectGroupListResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdGroups = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/groups',
    tags: ['Project groups'],
    summary: 'Add project group',
    description: 'Grants a group access to a project.',
    successDescription: 'Group granted access to the project successfully.',
  })
  .input(
    v.object({
      project_id: v.string(),
      group_id: v.pipe(v.string(), v.description('Identifier of the group to add to the project.')),
      role: v.pipe(
        v.string(),
        v.description('Identifier of the project role to grant to the group.'),
      ),
    }),
  )
  .output(ProjectGroupSchema)
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdGroupsGroupId = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/groups/{group_id}',
    tags: ['Project groups'],
    summary: 'Retrieve project group',
    description: "Retrieves a project's group.",
    successDescription: 'Project group retrieved successfully.',
  })
  .input(
    v.object({
      project_id: v.string(),
      group_id: v.string(),
      group_type: v.optional(v.optional(v.picklist(['group', 'tenant_group']), 'group')),
    }),
  )
  .output(ProjectGroupSchema)
  .handler(async ({ input }) => {})

export const deleteOrganizationProjectsProjectIdGroupsGroupId = os
  .route({
    method: 'DELETE',
    path: '/organization/projects/{project_id}/groups/{group_id}',
    tags: ['Project groups'],
    summary: 'Remove project group',
    description: "Revokes a group's access to a project.",
    successDescription: 'Group removed from the project successfully.',
  })
  .input(v.object({ project_id: v.string(), group_id: v.string() }))
  .output(ProjectGroupDeletedResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdHostedToolPermissions = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/hosted_tool_permissions',
    tags: ['Hosted tools'],
    summary: 'Retrieve project hosted tool permissions',
    description: 'Returns hosted tool permissions for a project.',
    successDescription: 'Project hosted tool permissions retrieved successfully.',
  })
  .input(v.object({ project_id: v.string() }))
  .output(ProjectHostedToolPermissionsSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdHostedToolPermissions = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/hosted_tool_permissions',
    tags: ['Hosted tools'],
    summary: 'Modify project hosted tool permissions',
    description: 'Updates hosted tool permissions for a project.',
    successDescription: 'Project hosted tool permissions updated successfully.',
  })
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
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdModelPermissions = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/model_permissions',
    tags: ['Projects'],
    summary: 'Retrieve project model permissions',
    description: 'Returns model permissions for a project.',
    successDescription: 'Project model permissions retrieved successfully.',
  })
  .input(v.object({ project_id: v.string() }))
  .output(ProjectModelPermissionsSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdModelPermissions = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/model_permissions',
    tags: ['Projects'],
    summary: 'Modify project model permissions',
    description: 'Updates model permissions for a project.',
    successDescription: 'Project model permissions updated successfully.',
  })
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
  .handler(async ({ input }) => {})

export const deleteOrganizationProjectsProjectIdModelPermissions = os
  .route({
    method: 'DELETE',
    path: '/organization/projects/{project_id}/model_permissions',
    tags: ['Projects'],
    summary: 'Delete project model permissions',
    description: 'Deletes model permissions for a project.',
    successDescription: 'Project model permissions deleted successfully.',
  })
  .input(v.object({ project_id: v.string() }))
  .output(ProjectModelPermissionsDeleteResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdRateLimits = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/rate_limits',
    tags: ['Projects'],
    summary: 'List project rate limits',
    description: 'Returns the rate limits per model for a project.',
    successDescription: 'Project rate limits listed successfully.',
  })
  .input(
    v.object({
      project_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '100'),
      ),
      after: v.optional(v.string()),
      before: v.optional(v.string()),
    }),
  )
  .output(ProjectRateLimitListResponseSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdRateLimitsRateLimitId = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/rate_limits/{rate_limit_id}',
    tags: ['Projects'],
    summary: 'Modify project rate limit',
    description: 'Updates a project rate limit.',
    successDescription: 'Project rate limit updated successfully.',
  })
  .input(
    v.object({
      project_id: v.string(),
      rate_limit_id: v.string(),
      max_requests_per_1_minute: v.optional(
        v.pipe(v.pipe(v.number(), v.integer()), v.description('The maximum requests per minute.')),
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
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdServiceAccounts = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/service_accounts',
    tags: ['Projects'],
    summary: 'List project service accounts',
    description: 'Returns a list of service accounts in the project.',
    successDescription: 'Project service accounts listed successfully.',
  })
  .input(
    v.object({
      project_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      after: v.optional(v.string()),
    }),
  )
  .output(ProjectServiceAccountListResponseSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdServiceAccounts = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/service_accounts',
    tags: ['Projects'],
    summary: 'Create project service account',
    description:
      'Creates a new service account in the project. By default, this also returns an unredacted API key for the service account.',
    successDescription: 'Project service account created successfully.',
  })
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
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdServiceAccountsServiceAccountId = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/service_accounts/{service_account_id}',
    tags: ['Projects'],
    summary: 'Retrieve project service account',
    description: 'Retrieves a service account in the project.',
    successDescription: 'Project service account retrieved successfully.',
  })
  .input(v.object({ project_id: v.string(), service_account_id: v.string() }))
  .output(ProjectServiceAccountSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdServiceAccountsServiceAccountId = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/service_accounts/{service_account_id}',
    tags: ['Projects'],
    summary: 'Update project service account',
    description: 'Updates a service account in the project.',
    successDescription: 'Project service account updated successfully.',
  })
  .input(
    v.object({
      project_id: v.string(),
      service_account_id: v.string(),
      name: v.optional(v.pipe(v.string(), v.description('The updated service account name.'))),
      role: v.optional(
        v.pipe(v.picklist(['member', 'owner']), v.description('The updated service account role.')),
      ),
    }),
  )
  .output(ProjectServiceAccountSchema)
  .handler(async ({ input }) => {})

export const deleteOrganizationProjectsProjectIdServiceAccountsServiceAccountId = os
  .route({
    method: 'DELETE',
    path: '/organization/projects/{project_id}/service_accounts/{service_account_id}',
    tags: ['Projects'],
    summary: 'Delete project service account',
    description:
      'Deletes a service account from the project.\n\nReturns confirmation of service account deletion, or an error if the project\nis archived (archived projects have no service accounts).\n',
    successDescription: 'Project service account deleted successfully.',
  })
  .input(v.object({ project_id: v.string(), service_account_id: v.string() }))
  .output(ProjectServiceAccountDeleteResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdSpendAlerts = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/spend_alerts',
    tags: ['Spend alerts'],
    summary: 'List project spend alerts',
    description: 'Lists project spend alerts.',
    successDescription: 'Project spend alerts listed successfully.',
  })
  .input(
    v.object({
      project_id: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(100),
        ),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'asc')),
      after: v.optional(v.string()),
      before: v.optional(v.string()),
    }),
  )
  .output(ProjectSpendAlertListResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdSpendAlerts = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/spend_alerts',
    tags: ['Spend alerts'],
    summary: 'Create project spend alert',
    description: 'Creates a project spend alert.',
    successDescription: 'Project spend alert created successfully.',
  })
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
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdSpendAlertsAlertId = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/spend_alerts/{alert_id}',
    tags: ['Spend alerts'],
    summary: 'Retrieve project spend alert',
    description: 'Retrieves a project spend alert.',
    successDescription: 'Project spend alert retrieved successfully.',
  })
  .input(v.object({ project_id: v.string(), alert_id: v.string() }))
  .output(ProjectSpendAlertSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdSpendAlertsAlertId = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/spend_alerts/{alert_id}',
    tags: ['Spend alerts'],
    summary: 'Update project spend alert',
    description: 'Updates a project spend alert.',
    successDescription: 'Project spend alert updated successfully.',
  })
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
  .handler(async ({ input }) => {})

export const deleteOrganizationProjectsProjectIdSpendAlertsAlertId = os
  .route({
    method: 'DELETE',
    path: '/organization/projects/{project_id}/spend_alerts/{alert_id}',
    tags: ['Spend alerts'],
    summary: 'Delete project spend alert',
    description: 'Deletes a project spend alert.',
    successDescription: 'Project spend alert deleted successfully.',
  })
  .input(v.object({ project_id: v.string(), alert_id: v.string() }))
  .output(ProjectSpendAlertDeletedResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdUsers = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/users',
    tags: ['Projects'],
    summary: 'List project users',
    description: 'Returns a list of users in the project.',
    successDescription: 'Project users listed successfully.',
  })
  .input(
    v.object({
      project_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      after: v.optional(v.string()),
    }),
  )
  .output(ProjectUserListResponseSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdUsers = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/users',
    tags: ['Projects'],
    summary: 'Create project user',
    description:
      'Adds a user to the project. Users must already be members of the organization to be added to a project.',
    successDescription: 'User added to project successfully.',
  })
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
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdUsersUserId = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/users/{user_id}',
    tags: ['Projects'],
    summary: 'Retrieve project user',
    description: 'Retrieves a user in the project.',
    successDescription: 'Project user retrieved successfully.',
  })
  .input(v.object({ project_id: v.string(), user_id: v.string() }))
  .output(ProjectUserSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdUsersUserId = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/users/{user_id}',
    tags: ['Projects'],
    summary: 'Modify project user',
    description: "Modifies a user's role in the project.",
    successDescription: "Project user's role updated successfully.",
  })
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
  .handler(async ({ input }) => {})

export const deleteOrganizationProjectsProjectIdUsersUserId = os
  .route({
    method: 'DELETE',
    path: '/organization/projects/{project_id}/users/{user_id}',
    tags: ['Projects'],
    summary: 'Delete project user',
    description:
      'Deletes a user from the project.\n\nReturns confirmation of project user deletion, or an error if the project is\narchived (archived projects have no users).\n',
    successDescription: 'Project user deleted successfully.',
  })
  .input(v.object({ project_id: v.string(), user_id: v.string() }))
  .output(ProjectUserDeleteResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationRoles = os
  .route({
    method: 'GET',
    path: '/organization/roles',
    tags: ['Roles'],
    summary: 'List organization roles',
    description: 'Lists the roles configured for the organization.',
    successDescription: 'Roles listed successfully.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(1000),
          ),
          '1000',
        ),
      ),
      after: v.optional(v.string()),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'asc')),
    }),
  )
  .output(PublicRoleListResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationRoles = os
  .route({
    method: 'POST',
    path: '/organization/roles',
    tags: ['Roles'],
    summary: 'Create organization role',
    description: 'Creates a custom role for the organization.',
    successDescription: 'Role created successfully.',
  })
  .input(PublicCreateOrganizationRoleBodySchema)
  .output(RoleSchema)
  .handler(async ({ input }) => {})

export const getOrganizationRolesRoleId = os
  .route({
    method: 'GET',
    path: '/organization/roles/{role_id}',
    tags: ['Roles'],
    summary: 'Retrieve organization role',
    description: 'Retrieves an organization role.',
    successDescription: 'Role retrieved successfully.',
  })
  .input(v.object({ role_id: v.string() }))
  .output(RoleSchema)
  .handler(async ({ input }) => {})

export const postOrganizationRolesRoleId = os
  .route({
    method: 'POST',
    path: '/organization/roles/{role_id}',
    tags: ['Roles'],
    summary: 'Update organization role',
    description: 'Updates an existing organization role.',
    successDescription: 'Role updated successfully.',
  })
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
  .handler(async ({ input }) => {})

export const deleteOrganizationRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/organization/roles/{role_id}',
    tags: ['Roles'],
    summary: 'Delete organization role',
    description: 'Deletes a custom role from the organization.',
    successDescription: 'Role deleted successfully.',
  })
  .input(v.object({ role_id: v.string() }))
  .output(RoleDeletedResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationSpendAlerts = os
  .route({
    method: 'GET',
    path: '/organization/spend_alerts',
    tags: ['Spend alerts'],
    summary: 'List organization spend alerts',
    description: 'Lists organization spend alerts.',
    successDescription: 'Organization spend alerts listed successfully.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(100),
        ),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'asc')),
      after: v.optional(v.string()),
      before: v.optional(v.string()),
    }),
  )
  .output(OrganizationSpendAlertListResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationSpendAlerts = os
  .route({
    method: 'POST',
    path: '/organization/spend_alerts',
    tags: ['Spend alerts'],
    summary: 'Create organization spend alert',
    description: 'Creates an organization spend alert.',
    successDescription: 'Organization spend alert created successfully.',
  })
  .input(CreateSpendAlertBodySchema)
  .output(OrganizationSpendAlertSchema)
  .handler(async ({ input }) => {})

export const getOrganizationSpendAlertsAlertId = os
  .route({
    method: 'GET',
    path: '/organization/spend_alerts/{alert_id}',
    tags: ['Spend alerts'],
    summary: 'Retrieve organization spend alert',
    description: 'Retrieves an organization spend alert.',
    successDescription: 'Organization spend alert retrieved successfully.',
  })
  .input(v.object({ alert_id: v.string() }))
  .output(OrganizationSpendAlertSchema)
  .handler(async ({ input }) => {})

export const postOrganizationSpendAlertsAlertId = os
  .route({
    method: 'POST',
    path: '/organization/spend_alerts/{alert_id}',
    tags: ['Spend alerts'],
    summary: 'Update organization spend alert',
    description: 'Updates an organization spend alert.',
    successDescription: 'Organization spend alert updated successfully.',
  })
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
  .handler(async ({ input }) => {})

export const deleteOrganizationSpendAlertsAlertId = os
  .route({
    method: 'DELETE',
    path: '/organization/spend_alerts/{alert_id}',
    tags: ['Spend alerts'],
    summary: 'Delete organization spend alert',
    description: 'Deletes an organization spend alert.',
    successDescription: 'Organization spend alert deleted successfully.',
  })
  .input(v.object({ alert_id: v.string() }))
  .output(OrganizationSpendAlertDeletedResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsageAudioSpeeches = os
  .route({
    method: 'GET',
    path: '/organization/usage/audio_speeches',
    tags: ['Usage'],
    summary: 'Audio speeches',
    description: 'Get audio speeches usage details for the organization.',
    successDescription: 'Usage data retrieved successfully.',
  })
  .input(
    v.object({
      start_time: v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      end_time: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      bucket_width: v.optional(v.optional(v.picklist(['1m', '1h', '1d']), '1d')),
      project_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      user_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      api_key_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      models: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      group_by: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.picklist(['project_id', 'user_id', 'api_key_id', 'model'])),
        ),
      ),
      limit: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      page: v.optional(v.string()),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsageAudioTranscriptions = os
  .route({
    method: 'GET',
    path: '/organization/usage/audio_transcriptions',
    tags: ['Usage'],
    summary: 'Audio transcriptions',
    description: 'Get audio transcriptions usage details for the organization.',
    successDescription: 'Usage data retrieved successfully.',
  })
  .input(
    v.object({
      start_time: v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      end_time: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      bucket_width: v.optional(v.optional(v.picklist(['1m', '1h', '1d']), '1d')),
      project_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      user_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      api_key_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      models: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      group_by: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.picklist(['project_id', 'user_id', 'api_key_id', 'model'])),
        ),
      ),
      limit: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      page: v.optional(v.string()),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsageCodeInterpreterSessions = os
  .route({
    method: 'GET',
    path: '/organization/usage/code_interpreter_sessions',
    tags: ['Usage'],
    summary: 'Code interpreter sessions',
    description: 'Get code interpreter sessions usage details for the organization.',
    successDescription: 'Usage data retrieved successfully.',
  })
  .input(
    v.object({
      start_time: v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      end_time: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      bucket_width: v.optional(v.optional(v.picklist(['1m', '1h', '1d']), '1d')),
      project_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      group_by: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.literal('project_id')),
        ),
      ),
      limit: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      page: v.optional(v.string()),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsageCompletions = os
  .route({
    method: 'GET',
    path: '/organization/usage/completions',
    tags: ['Usage'],
    summary: 'Completions',
    description: 'Get completions usage details for the organization.',
    successDescription: 'Usage data retrieved successfully.',
  })
  .input(
    v.object({
      start_time: v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      end_time: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      bucket_width: v.optional(v.optional(v.picklist(['1m', '1h', '1d']), '1d')),
      project_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      user_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      api_key_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      models: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      batch: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
      group_by: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
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
      ),
      limit: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      page: v.optional(v.string()),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsageEmbeddings = os
  .route({
    method: 'GET',
    path: '/organization/usage/embeddings',
    tags: ['Usage'],
    summary: 'Embeddings',
    description: 'Get embeddings usage details for the organization.',
    successDescription: 'Usage data retrieved successfully.',
  })
  .input(
    v.object({
      start_time: v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      end_time: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      bucket_width: v.optional(v.optional(v.picklist(['1m', '1h', '1d']), '1d')),
      project_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      user_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      api_key_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      models: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      group_by: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.picklist(['project_id', 'user_id', 'api_key_id', 'model'])),
        ),
      ),
      limit: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      page: v.optional(v.string()),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsageFileSearchCalls = os
  .route({
    method: 'GET',
    path: '/organization/usage/file_search_calls',
    tags: ['Usage'],
    summary: 'File search calls',
    description: 'Get file search calls usage details for the organization.',
    successDescription: 'Usage data retrieved successfully.',
  })
  .input(
    v.object({
      start_time: v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      end_time: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      bucket_width: v.optional(v.optional(v.picklist(['1m', '1h', '1d']), '1d')),
      project_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      user_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      api_key_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      vector_store_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      group_by: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.picklist(['project_id', 'user_id', 'api_key_id', 'vector_store_id'])),
        ),
      ),
      limit: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      page: v.optional(v.string()),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsageImages = os
  .route({
    method: 'GET',
    path: '/organization/usage/images',
    tags: ['Usage'],
    summary: 'Images',
    description: 'Get images usage details for the organization.',
    successDescription: 'Usage data retrieved successfully.',
  })
  .input(
    v.object({
      start_time: v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      end_time: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      bucket_width: v.optional(v.optional(v.picklist(['1m', '1h', '1d']), '1d')),
      sources: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.picklist(['image.generation', 'image.edit', 'image.variation'])),
        ),
      ),
      sizes: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.picklist(['256x256', '512x512', '1024x1024', '1792x1792', '1024x1792'])),
        ),
      ),
      project_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      user_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      api_key_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      models: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      group_by: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.picklist(['project_id', 'user_id', 'api_key_id', 'model', 'size', 'source'])),
        ),
      ),
      limit: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      page: v.optional(v.string()),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsageModerations = os
  .route({
    method: 'GET',
    path: '/organization/usage/moderations',
    tags: ['Usage'],
    summary: 'Moderations',
    description: 'Get moderations usage details for the organization.',
    successDescription: 'Usage data retrieved successfully.',
  })
  .input(
    v.object({
      start_time: v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      end_time: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      bucket_width: v.optional(v.optional(v.picklist(['1m', '1h', '1d']), '1d')),
      project_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      user_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      api_key_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      models: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      group_by: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.picklist(['project_id', 'user_id', 'api_key_id', 'model'])),
        ),
      ),
      limit: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      page: v.optional(v.string()),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsageVectorStores = os
  .route({
    method: 'GET',
    path: '/organization/usage/vector_stores',
    tags: ['Usage'],
    summary: 'Vector stores',
    description: 'Get vector stores usage details for the organization.',
    successDescription: 'Usage data retrieved successfully.',
  })
  .input(
    v.object({
      start_time: v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      end_time: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      bucket_width: v.optional(v.optional(v.picklist(['1m', '1h', '1d']), '1d')),
      project_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      group_by: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.literal('project_id')),
        ),
      ),
      limit: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      page: v.optional(v.string()),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsageWebSearchCalls = os
  .route({
    method: 'GET',
    path: '/organization/usage/web_search_calls',
    tags: ['Usage'],
    summary: 'Web search calls',
    description: 'Get web search calls usage details for the organization.',
    successDescription: 'Usage data retrieved successfully.',
  })
  .input(
    v.object({
      start_time: v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      end_time: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      bucket_width: v.optional(v.optional(v.picklist(['1m', '1h', '1d']), '1d')),
      project_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      user_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      api_key_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      models: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
      context_levels: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.picklist(['low', 'medium', 'high'])),
        ),
      ),
      group_by: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
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
      ),
      limit: v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger())),
      page: v.optional(v.string()),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsers = os
  .route({
    method: 'GET',
    path: '/organization/users',
    tags: ['Users'],
    summary: 'List users',
    description: 'Lists all of the users in the organization.',
    successDescription: 'Users listed successfully.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      after: v.optional(v.string()),
      emails: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      ),
    }),
  )
  .output(UserListResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsersUserId = os
  .route({
    method: 'GET',
    path: '/organization/users/{user_id}',
    tags: ['Users'],
    summary: 'Retrieve user',
    description: 'Retrieves a user by their identifier.',
    successDescription: 'User retrieved successfully.',
  })
  .input(v.object({ user_id: v.string() }))
  .output(UserSchema)
  .handler(async ({ input }) => {})

export const postOrganizationUsersUserId = os
  .route({
    method: 'POST',
    path: '/organization/users/{user_id}',
    tags: ['Users'],
    summary: 'Modify user',
    description: "Modifies a user's role in the organization.",
    successDescription: 'User role updated successfully.',
  })
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
  .handler(async ({ input }) => {})

export const deleteOrganizationUsersUserId = os
  .route({
    method: 'DELETE',
    path: '/organization/users/{user_id}',
    tags: ['Users'],
    summary: 'Delete user',
    description: 'Deletes a user from the organization.',
    successDescription: 'User deleted successfully.',
  })
  .input(v.object({ user_id: v.string() }))
  .output(UserDeleteResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsersUserIdRoles = os
  .route({
    method: 'GET',
    path: '/organization/users/{user_id}/roles',
    tags: ['User organization role assignments'],
    summary: 'List user organization role assignments',
    description: 'Lists the organization roles assigned to a user within the organization.',
    successDescription: 'User organization role assignments listed successfully.',
  })
  .input(
    v.object({
      user_id: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(1000),
        ),
      ),
      after: v.optional(v.string()),
      order: v.optional(v.picklist(['asc', 'desc'])),
    }),
  )
  .output(RoleListResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationUsersUserIdRoles = os
  .route({
    method: 'POST',
    path: '/organization/users/{user_id}/roles',
    tags: ['User organization role assignments'],
    summary: 'Assign organization role to user',
    description: 'Assigns an organization role to a user within the organization.',
    successDescription: 'Organization role assigned to the user successfully.',
  })
  .input(
    v.object({
      user_id: v.string(),
      role_id: v.pipe(v.string(), v.description('Identifier of the role to assign.')),
    }),
  )
  .output(UserRoleAssignmentSchema)
  .handler(async ({ input }) => {})

export const getOrganizationUsersUserIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/organization/users/{user_id}/roles/{role_id}',
    tags: ['User organization role assignments'],
    summary: 'Retrieve user organization role',
    description: 'Retrieves an organization role assigned to a user.',
    successDescription: 'Organization role retrieved for the user successfully.',
  })
  .input(v.object({ user_id: v.string(), role_id: v.string() }))
  .output(AssignedRoleDetailsSchema)
  .handler(async ({ input }) => {})

export const deleteOrganizationUsersUserIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/organization/users/{user_id}/roles/{role_id}',
    tags: ['User organization role assignments'],
    summary: 'Unassign organization role from user',
    description: 'Unassigns an organization role from a user within the organization.',
    successDescription: 'Organization role unassigned from the user successfully.',
  })
  .input(v.object({ user_id: v.string(), role_id: v.string() }))
  .output(DeletedRoleAssignmentResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationExternalKeys = os
  .route({
    method: 'GET',
    path: '/organization/external_keys',
    summary: "List the external key configs registered on the user's organization",
    description: "List the external key configs registered on the user's organization",
    successDescription: 'Success',
  })
  .input(
    v.object({
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(100),
        ),
      ),
      order: v.optional(OrderEnumSchema),
      after: v.optional(
        v.union([
          v.string(),
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === 'null' ? null : input)),
            v.nullable(v.null()),
          ),
        ]),
      ),
      purpose: v.optional(ExternalKeyPurposeSchema),
    }),
  )
  .output(ListExternalKeysResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationExternalKeys = os
  .route({
    method: 'POST',
    path: '/organization/external_keys',
    summary: 'Add an external key config for an organization',
    description: 'Add an external key config for an organization',
    successDescription: 'Success',
  })
  .input(V1OrganizationExternalKeysPostRequestSchema)
  .output(ExternalKeyResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationExternalKeysExternalKeyId = os
  .route({
    method: 'GET',
    path: '/organization/external_keys/{external_key_id}',
    summary: 'Retrieve an external key registration',
    description: "Retrieve a stored external key registration for the user's organization.",
    successDescription: 'Success',
  })
  .input(v.object({ external_key_id: v.string() }))
  .output(ExternalKeyResourceSchema)
  .handler(async ({ input }) => {})

export const deleteOrganizationExternalKeysExternalKeyId = os
  .route({
    method: 'DELETE',
    path: '/organization/external_keys/{external_key_id}',
    summary: "Delete an external key config for the user's organization",
    description: "Delete an external key config for the user's organization",
    successDescription: 'Success',
  })
  .input(v.object({ external_key_id: v.string() }))
  .output(ExternalKeyResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationExternalKeysExternalKeyIdValidate = os
  .route({
    method: 'POST',
    path: '/organization/external_keys/{external_key_id}/validate',
    summary: "Validate an external key config for the user's organization",
    description: "Validate an external key config for the user's organization",
    successDescription: 'Success',
  })
  .input(v.object({ external_key_id: v.string() }))
  .output(ValidateExternalKeyResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationWorkloadIdentityProviders = os
  .route({
    method: 'GET',
    path: '/organization/workload_identity_providers',
    summary: 'List Platform workload identity providers',
    description: "List OIDC providers in the authenticated Admin API key's organization.",
    successDescription: 'Success',
  })
  .input(
    v.object({
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
      order: v.optional(
        v.union([v.optional(v.literal('asc'), 'asc'), v.optional(v.literal('desc'), 'desc')]),
      ),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(1))),
    }),
  )
  .output(PlatformProviderListResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationWorkloadIdentityProviders = os
  .route({
    method: 'POST',
    path: '/organization/workload_identity_providers',
    summary: 'Create Platform workload identity provider',
    description: 'Register an OIDC provider for keyless project service-account authentication.',
    successDescription: 'Success',
  })
  .input(CreatePlatformWorkloadIdentityProviderBodySchema)
  .output(PlatformProviderSchema)
  .handler(async ({ input }) => {})

export const getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId = os
  .route({
    method: 'GET',
    path: '/organization/workload_identity_providers/{workload_identity_provider_id}',
    summary: 'Retrieve Platform workload identity provider',
    description: 'Retrieve an OIDC provider in the authenticated organization.',
    successDescription: 'Success',
  })
  .input(v.object({ workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)) }))
  .output(PlatformProviderSchema)
  .handler(async ({ input }) => {})

export const postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId = os
  .route({
    method: 'POST',
    path: '/organization/workload_identity_providers/{workload_identity_provider_id}',
    summary: 'Update Platform workload identity provider',
    description: 'Update supplied provider fields, preserving omitted fields.',
    successDescription: 'Success',
  })
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
  .handler(async ({ input }) => {})

export const deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId = os
  .route({
    method: 'DELETE',
    path: '/organization/workload_identity_providers/{workload_identity_provider_id}',
    summary: 'Delete Platform workload identity provider',
    description: 'Delete a provider after deleting all its federation rules.',
    successDescription: 'Success',
  })
  .input(v.object({ workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)) }))
  .output(PlatformProviderDeletedResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules = os
  .route({
    method: 'GET',
    path: '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules',
    summary: 'List Platform workload identity federation rules',
    description: "List the provider's federation rules to project service accounts.",
    successDescription: 'Success',
  })
  .input(
    v.object({
      workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
      order: v.optional(
        v.union([v.optional(v.literal('asc'), 'asc'), v.optional(v.literal('desc'), 'desc')]),
      ),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(1))),
      service_account_id: v.optional(v.pipe(v.string(), v.minCodePoints(1))),
    }),
  )
  .output(PlatformFederationRuleListResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules = os
  .route({
    method: 'POST',
    path: '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules',
    summary: 'Create Platform workload identity federation rule',
    description: 'Bind verified token attributes to an existing project service account.',
    successDescription: 'Success',
  })
  .input(
    v.object({
      workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
      project_id: v.pipe(v.string(), v.minCodePoints(1)),
      service_account_id: v.pipe(v.string(), v.minCodePoints(1)),
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      attribute_matchers: v.record(
        v.string(),
        v.union([v.string(), v.boolean(), v.union([v.pipe(v.number(), v.integer()), v.number()])]),
      ),
      permissions: v.optional(
        v.union([DefaultPermissionsParamSchema, RestrictedPermissionsParamSchema]),
      ),
      enabled: v.optional(v.boolean()),
    }),
  )
  .output(PlatformFederationRuleSchema)
  .handler(async ({ input }) => {})

export const getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId =
  os
    .route({
      method: 'GET',
      path: '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}',
      summary: 'Retrieve Platform workload identity federation rule',
      description:
        'Retrieve a federation rule owned by the authenticated organization and provider.',
      successDescription: 'Success',
    })
    .input(
      v.object({
        workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
        workload_identity_federation_rule_id: v.pipe(v.string(), v.minCodePoints(1)),
      }),
    )
    .output(PlatformFederationRuleSchema)
    .handler(async ({ input }) => {})

export const postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId =
  os
    .route({
      method: 'POST',
      path: '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}',
      summary: 'Update Platform workload identity federation rule',
      description: 'Update supplied matcher, permission, metadata, or enabled fields.',
      successDescription: 'Success',
    })
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
    .handler(async ({ input }) => {})

export const deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId =
  os
    .route({
      method: 'DELETE',
      path: '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}',
      summary: 'Delete Platform workload identity federation rule',
      description: 'Delete a federation rule to a project service account.',
      successDescription: 'Success',
    })
    .input(
      v.object({
        workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
        workload_identity_federation_rule_id: v.pipe(v.string(), v.minCodePoints(1)),
      }),
    )
    .output(PlatformFederationRuleDeletedResourceSchema)
    .handler(async ({ input }) => {})

export const getOrganizationUsageDecisions = os
  .route({
    method: 'GET',
    path: '/organization/usage/decisions',
    summary: 'Decisions',
    description: 'Get Decisions API usage details for the organization.',
    successDescription: 'Success',
  })
  .input(
    v.object({
      start_time: v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
      end_time: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === 'null' ? null : input)),
          v.nullable(
            v.union([
              v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(v.null()),
              ),
            ]),
          ),
        ),
      ),
      bucket_width: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === 'null' ? null : input)),
          v.nullable(
            v.union([
              v.pipe(
                v.union([DecisionsUsageBucketWidthSchema]),
                v.description(
                  'Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.',
                ),
              ),
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(v.null()),
              ),
            ]),
          ),
        ),
      ),
      limit: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === 'null' ? null : input)),
          v.nullable(
            v.union([
              v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(v.null()),
              ),
            ]),
          ),
        ),
      ),
      page: v.optional(
        v.union([
          v.pipe(
            v.string(),
            v.description(
              'A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.',
            ),
          ),
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === 'null' ? null : input)),
            v.nullable(v.null()),
          ),
        ]),
      ),
      project_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === 'null' ? null : input)),
          v.nullable(
            v.union([
              v.pipe(
                v.union([
                  v.pipe(
                    v.unknown(),
                    v.transform((input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    ),
                    v.array(v.string()),
                  ),
                ]),
                v.description('Return only usage for these projects.'),
              ),
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(v.null()),
              ),
            ]),
          ),
        ),
      ),
      group_by: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === 'null' ? null : input)),
          v.nullable(
            v.union([
              v.pipe(
                v.union([
                  v.pipe(
                    v.unknown(),
                    v.transform((input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    ),
                    v.array(DecisionsUsageGroupBySchema),
                  ),
                ]),
                v.description(
                  'Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier`, `api_source` or any combination of them. When grouped by `api_source`, results use `agents_api` for attributed Agents API activity and `unlabeled` for all other activity. Without source grouping, `api_source` is null.',
                ),
              ),
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(v.null()),
              ),
            ]),
          ),
        ),
      ),
      user_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === 'null' ? null : input)),
          v.nullable(
            v.union([
              v.pipe(
                v.union([
                  v.pipe(
                    v.unknown(),
                    v.transform((input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    ),
                    v.array(v.string()),
                  ),
                ]),
                v.description('Return only usage for these users.'),
              ),
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(v.null()),
              ),
            ]),
          ),
        ),
      ),
      api_key_ids: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === 'null' ? null : input)),
          v.nullable(
            v.union([
              v.pipe(
                v.union([
                  v.pipe(
                    v.unknown(),
                    v.transform((input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    ),
                    v.array(v.string()),
                  ),
                ]),
                v.description('Return only usage for these API keys.'),
              ),
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(v.null()),
              ),
            ]),
          ),
        ),
      ),
      models: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === 'null' ? null : input)),
          v.nullable(
            v.union([
              v.pipe(
                v.union([
                  v.pipe(
                    v.unknown(),
                    v.transform((input) =>
                      input === undefined || Array.isArray(input) ? input : [input],
                    ),
                    v.array(v.string()),
                  ),
                ]),
                v.description('Return only usage for these models.'),
              ),
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(v.null()),
              ),
            ]),
          ),
        ),
      ),
      batch: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === 'null' ? null : input)),
          v.nullable(
            v.union([
              v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(v.null()),
              ),
            ]),
          ),
        ),
      ),
    }),
  )
  .output(PublicDecisionsUsageResponseResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationExternalStorage = os
  .route({
    method: 'GET',
    path: '/organization/external_storage',
    summary: 'List external storage configurations',
    description: "List the organization's customer-managed external storage configurations.",
    successDescription: 'Success',
  })
  .input(
    v.object({
      project_id: v.optional(
        v.union([
          v.pipe(v.string(), v.metadata({ examples: ['proj_123'] })),
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === 'null' ? null : input)),
            v.nullable(v.null()),
          ),
        ]),
      ),
      after: v.optional(
        v.union([
          v.pipe(
            v.string(),
            v.description('Return external storage configurations after this ID.'),
          ),
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === 'null' ? null : input)),
            v.nullable(v.null()),
          ),
        ]),
      ),
      order: v.optional(ExternalStorageOrderSchema),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
    }),
  )
  .output(ExternalStorageListResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationExternalStorage = os
  .route({
    method: 'POST',
    path: '/organization/external_storage',
    summary: 'Create an external storage configuration',
    description: 'Register one customer-managed external storage configuration.',
    successDescription: 'Success',
  })
  .input(CreateExternalStorageBodySchema)
  .output(ExternalStorageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationExternalStorageExternalStorageId = os
  .route({
    method: 'GET',
    path: '/organization/external_storage/{external_storage_id}',
    summary: 'Get an external storage configuration',
    description: 'Get one customer-managed external storage configuration.',
    successDescription: 'Success',
  })
  .input(
    v.object({
      external_storage_id: v.pipe(v.string(), v.metadata({ examples: ['extstorage_123'] })),
    }),
  )
  .output(ExternalStorageResponseSchema)
  .handler(async ({ input }) => {})

export const deleteOrganizationExternalStorageExternalStorageId = os
  .route({
    method: 'DELETE',
    path: '/organization/external_storage/{external_storage_id}',
    summary: 'Delete an external storage configuration',
    description:
      "Disconnect a customer-managed external storage configuration. Removing the project's last configuration restores organization-default retention if customer-managed retention was active. Repeating a deletion also completes any interrupted retention update. Cloud storage is unchanged.",
    successDescription: 'Success',
  })
  .input(
    v.object({
      external_storage_id: v.pipe(v.string(), v.metadata({ examples: ['extstorage_123'] })),
    }),
  )
  .output(ExternalStorageDeletedResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationExternalStorageExternalStorageIdValidate = os
  .route({
    method: 'POST',
    path: '/organization/external_storage/{external_storage_id}/validate',
    summary: 'Validate an external storage configuration',
    description: 'Validate one customer-managed external storage configuration.',
    successDescription: 'Success',
  })
  .input(
    v.object({
      external_storage_id: v.pipe(v.string(), v.metadata({ examples: ['extstorage_123'] })),
    }),
  )
  .output(ExternalStorageResponseSchema)
  .handler(async ({ input }) => {})

export const getOrganizationSpendLimit = os
  .route({
    method: 'GET',
    path: '/organization/spend_limit',
    summary: 'Get organization spend limit',
    description: "Get the organization's hard spend limit.",
    successDescription: 'Hard spend limit retrieved successfully.',
  })
  .output(OrganizationSpendLimitResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationSpendLimit = os
  .route({
    method: 'POST',
    path: '/organization/spend_limit',
    summary: 'Update organization spend limit',
    description: "Create or replace the organization's hard spend limit.",
    successDescription: 'Hard spend limit created or replaced successfully.',
  })
  .input(UpdateOrganizationSpendLimitBodySchema)
  .output(OrganizationSpendLimitResourceSchema)
  .handler(async ({ input }) => {})

export const deleteOrganizationSpendLimit = os
  .route({
    method: 'DELETE',
    path: '/organization/spend_limit',
    summary: 'Delete organization spend limit',
    description: "Delete the organization's hard spend limit.",
    successDescription: 'Hard spend limit deleted successfully.',
  })
  .output(OrganizationSpendLimitDeletedResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdSpendLimit = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/spend_limit',
    summary: 'Get project spend limit',
    description: "Get a project's hard spend limit.",
    successDescription: 'Hard spend limit retrieved successfully.',
  })
  .input(v.object({ project_id: v.pipe(v.string(), v.metadata({ examples: ['proj_123'] })) }))
  .output(ProjectSpendLimitResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdSpendLimit = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/spend_limit',
    summary: 'Update project spend limit',
    description: "Create or replace a project's hard spend limit.",
    successDescription: 'Hard spend limit created or replaced successfully.',
  })
  .input(
    v.object({
      project_id: v.pipe(v.string(), v.metadata({ examples: ['proj_123'] })),
      threshold_amount: v.pipe(
        v.pipe(v.number(), v.integer(), v.minValue(1)),
        v.description('The hard spend limit amount, in cents.'),
      ),
      currency: v.pipe(
        v.literal('USD'),
        v.description('The currency for the threshold amount. Currently, only `USD` is supported.'),
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
  .handler(async ({ input }) => {})

export const deleteOrganizationProjectsProjectIdSpendLimit = os
  .route({
    method: 'DELETE',
    path: '/organization/projects/{project_id}/spend_limit',
    summary: 'Delete project spend limit',
    description: "Delete a project's hard spend limit.",
    successDescription: 'Hard spend limit deleted successfully.',
  })
  .input(v.object({ project_id: v.pipe(v.string(), v.metadata({ examples: ['proj_123'] })) }))
  .output(ProjectSpendLimitDeletedResourceSchema)
  .handler(async ({ input }) => {})

export const getOrganizationProjectsProjectIdServiceTierSettings = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/service_tier_settings',
    summary: 'Retrieve project service tier settings',
    description: 'Retrieve the configured default and enabled service tiers for a project.',
    successDescription: 'Success',
  })
  .input(v.object({ project_id: v.pipe(v.string(), v.description('The ID of the project')) }))
  .output(ProjectServiceTierSettingsResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdServiceTierSettings = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/service_tier_settings',
    summary: 'Update project service tier settings',
    description:
      'Update the default or enabled service tiers atomically. Supply at least one field. Omitted fields keep their current values.',
    successDescription: 'Success',
  })
  .input(
    v.object({
      project_id: v.pipe(v.string(), v.description('The ID of the project')),
      default: v.optional(ProjectDefaultServiceTierSchema),
      enabled_tiers: v.optional(
        v.pipe(
          v.union([v.optional(v.literal('all'), 'all'), v.array(ProjectOptionalServiceTierSchema)]),
          v.description(
            'Additional service tiers enabled for this project. "all" includes future tiers. An empty array allows only Standard. Organization policy and eligibility still apply.',
          ),
        ),
      ),
    }),
  )
  .output(ProjectServiceTierSettingsResourceSchema)
  .handler(async ({ input }) => {})

export const postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeys = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/service_accounts/{service_account_id}/api_keys',
    summary: 'Create an API key for a service account',
    description: 'Creates an API key for a service account in the project.',
    successDescription: 'Service account API key created successfully.',
  })
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
  .handler(async ({ input }) => {})
