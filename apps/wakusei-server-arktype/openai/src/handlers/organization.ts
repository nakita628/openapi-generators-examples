import { os } from '@orpc/server'
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

export const getOrganizationAdminApiKeys = os
  .route({
    method: 'GET',
    path: '/organization/admin_api_keys',
    summary: 'List all organization and project API keys.',
    description: 'List organization API keys',
    successDescription: 'A list of organization API keys.',
  })
  .input(
    type({
      'after?': type('string | null').describe(
        'Return keys with IDs that come after this ID in the pagination order.',
      ),
      'order?': type("'asc' | 'desc'").describe(
        'Order results by creation time, ascending or descending.',
      ),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .describe('Maximum number of keys to return.'),
    }),
  )
  .output(ApiKeyListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postOrganizationAdminApiKeys = os
  .route({
    method: 'POST',
    path: '/organization/admin_api_keys',
    summary: 'Create admin API key',
    description: 'Create an organization admin API key',
    successDescription: 'The newly created admin API key.',
  })
  .input(
    type({
      name: 'string',
      'expires_in_seconds?': type('number.integer >= 1 & number.integer <= 31536000').describe(
        'The number of seconds until the API key expires. Omit this field for a key that does not expire.',
      ),
    }),
  )
  .output(AdminApiKeyCreateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationAdminApiKeysKeyId = os
  .route({
    method: 'GET',
    path: '/organization/admin_api_keys/{key_id}',
    summary: 'Retrieve admin API key',
    description: 'Retrieve a single organization API key',
    successDescription: 'Details of the requested API key.',
  })
  .input(type({ key_id: type('string').describe('The ID of the API key.') }))
  .output(AdminApiKeySchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationAdminApiKeysKeyId = os
  .route({
    method: 'DELETE',
    path: '/organization/admin_api_keys/{key_id}',
    summary: 'Delete admin API key',
    description: 'Delete an organization admin API key',
    successDescription: 'Confirmation that the API key was deleted.',
  })
  .input(type({ key_id: type('string').describe('The ID of the API key to be deleted.') }))
  .output(
    type({ id: 'string', object: "'organization.admin_api_key.deleted'", deleted: 'boolean' }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      'effective_at?': type({
        'gt?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'Return only events whose `effective_at` (Unix seconds) is greater than this value.',
          ),
        'gte?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.',
          ),
        'lt?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'Return only events whose `effective_at` (Unix seconds) is less than this value.',
          ),
        'lte?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.',
          ),
      }),
      'project_ids[]?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'event_types[]?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(AuditLogEventTypeSchema).array(),
      ),
      'actor_ids[]?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'actor_emails[]?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'resource_ids[]?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'tenant_only?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'after?': type('string'),
      'before?': type('string'),
    }),
  )
  .output(ListAuditLogsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'after?': type('string'),
      'order?': type("'asc' | 'desc'"),
    }),
  )
  .output(ListCertificatesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      certificate_id: type('string'),
      'include?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'content'[]"),
    }),
  )
  .output(CertificateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      certificate_id: type('string'),
      'name?': type('string').describe('The updated name for the certificate'),
    }),
  )
  .output(CertificateSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(type({ certificate_id: type('string') }))
  .output(DeleteCertificateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      start_time: type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'end_time?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'bucket_width?': type("'1d'"),
      'project_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'api_key_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'line_items?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'group_by?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'project_id' | 'user_id' | 'line_item' | 'api_key_id' | 'api_source'[]"),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'page?': type('string'),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 1000'),
      'after?': type('string'),
      'order?': type("'asc' | 'desc'"),
    }),
  )
  .output(GroupListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationGroupsGroupId = os
  .route({
    method: 'GET',
    path: '/organization/groups/{group_id}',
    tags: ['Groups'],
    summary: 'Retrieve group',
    description: 'Retrieves a group.',
    successDescription: 'Group retrieved successfully.',
  })
  .input(type({ group_id: type('string') }))
  .output(GroupResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      group_id: type('string'),
      name: type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 255 || ctx.mustBe('at most 255 characters'))
        .describe('New display name for the group.'),
    }),
  )
  .output(GroupResourceWithSuccessSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationGroupsGroupId = os
  .route({
    method: 'DELETE',
    path: '/organization/groups/{group_id}',
    tags: ['Groups'],
    summary: 'Delete group',
    description: 'Deletes a group from the organization.',
    successDescription: 'Group deleted successfully.',
  })
  .input(type({ group_id: type('string') }))
  .output(GroupDeletedResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      group_id: type('string'),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 1000'),
      'after?': type('string'),
      'order?': type("'asc' | 'desc'"),
    }),
  )
  .output(RoleListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      group_id: type('string'),
      role_id: type('string').describe('Identifier of the role to assign.'),
    }),
  )
  .output(GroupRoleAssignmentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationGroupsGroupIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/organization/groups/{group_id}/roles/{role_id}',
    tags: ['Group organization role assignments'],
    summary: 'Retrieve group organization role',
    description: 'Retrieves an organization role assigned to a group.',
    successDescription: 'Organization role retrieved for the group successfully.',
  })
  .input(type({ group_id: type('string'), role_id: type('string') }))
  .output(AssignedRoleDetailsSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationGroupsGroupIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/organization/groups/{group_id}/roles/{role_id}',
    tags: ['Group organization role assignments'],
    summary: 'Unassign organization role from group',
    description: 'Unassigns an organization role from a group within the organization.',
    successDescription: 'Organization role unassigned from the group successfully.',
  })
  .input(type({ group_id: type('string'), role_id: type('string') }))
  .output(DeletedRoleAssignmentResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      group_id: type('string'),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 1000'),
      'after?': type('string'),
      'order?': type("'asc' | 'desc'"),
    }),
  )
  .output(UserListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      group_id: type('string'),
      user_id: type('string').describe('Identifier of the user to add to the group.'),
    }),
  )
  .output(GroupUserAssignmentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationGroupsGroupIdUsersUserId = os
  .route({
    method: 'GET',
    path: '/organization/groups/{group_id}/users/{user_id}',
    tags: ['Group users'],
    summary: 'Retrieve group user',
    description: 'Retrieves a user in a group.',
    successDescription: 'User retrieved from the group successfully.',
  })
  .input(type({ group_id: type('string'), user_id: type('string') }))
  .output(GroupMemberUserSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationGroupsGroupIdUsersUserId = os
  .route({
    method: 'DELETE',
    path: '/organization/groups/{group_id}/users/{user_id}',
    tags: ['Group users'],
    summary: 'Remove group user',
    description: 'Removes a user from a group.',
    successDescription: 'User removed from the group successfully.',
  })
  .input(type({ group_id: type('string'), user_id: type('string') }))
  .output(GroupUserDeletedResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'after?': type('string'),
    }),
  )
  .output(InviteListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationInvitesInviteId = os
  .route({
    method: 'GET',
    path: '/organization/invites/{invite_id}',
    tags: ['Invites'],
    summary: 'Retrieve invite',
    description: 'Retrieves an invite.',
    successDescription: 'Invite retrieved successfully.',
  })
  .input(type({ invite_id: type('string') }))
  .output(InviteSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationInvitesInviteId = os
  .route({
    method: 'DELETE',
    path: '/organization/invites/{invite_id}',
    tags: ['Invites'],
    summary: 'Delete invite',
    description: 'Delete an invite. If the invite has already been accepted, it cannot be deleted.',
    successDescription: 'Invite deleted successfully.',
  })
  .input(type({ invite_id: type('string') }))
  .output(InviteDeleteResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'after?': type('string'),
      'include_archived?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(ProjectListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationProjectsProjectId = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}',
    tags: ['Projects'],
    summary: 'Retrieve project',
    description: 'Retrieves a project.',
    successDescription: 'Project retrieved successfully.',
  })
  .input(type({ project_id: type('string') }))
  .output(ProjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'after?': type('string'),
      'owner_project_access?': type("'active' | 'inactive' | 'any'"),
    }),
  )
  .output(ProjectApiKeyListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationProjectsProjectIdApiKeysApiKeyId = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/api_keys/{api_key_id}',
    tags: ['Projects'],
    summary: 'Retrieve project API key',
    description: 'Retrieves an API key in the project.',
    successDescription: 'Project API key retrieved successfully.',
  })
  .input(type({ project_id: type('string'), api_key_id: type('string') }))
  .output(ProjectApiKeySchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      api_key_id: type('string'),
      'expires_in_seconds?': type('number.integer >= 1 & number.integer <= 31536000').describe(
        'Number of seconds from this request until the API key expires. Must comply with the organization and project expiry policies. Expired keys cannot be updated. Retrying resets the expiry relative to the new request. Omit to keep the current expiration.',
      ),
      'scopes?': type('string[]').describe(
        'Replace the API key scope restrictions. Omit to leave scopes unchanged. An empty array removes key restrictions (All permissions), subject to the owner\'s effective permissions. Use ["api.all.read"] for read-only access. Scopes do not change the owner\'s roles or grant administrative permissions.',
      ),
    }),
  )
  .output(ProjectApiKeySchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(type({ project_id: type('string'), api_key_id: type('string') }))
  .output(ProjectApiKeyDeleteResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(type({ project_id: type('string') }))
  .output(ProjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'after?': type('string'),
      'order?': type("'asc' | 'desc'"),
    }),
  )
  .output(ListProjectCertificatesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      certificate_ids: type('string[]').and(type('1 <= unknown[] <= 10')),
    }),
  )
  .output(OrganizationProjectCertificateActivationResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      certificate_ids: type('string[]').and(type('1 <= unknown[] <= 10')),
    }),
  )
  .output(OrganizationProjectCertificateDeactivationResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationProjectsProjectIdDataRetention = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/data_retention',
    tags: ['Data retention'],
    summary: 'Retrieve project data retention',
    description: 'Retrieves project data retention controls.',
    successDescription: 'Project data retention controls retrieved successfully.',
  })
  .input(type({ project_id: type('string') }))
  .output(ProjectDataRetentionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      retention_type: type(
        "'organization_default' | 'none' | 'zero_data_retention' | 'modified_abuse_monitoring' | 'enhanced_zero_data_retention' | 'enhanced_modified_abuse_monitoring'",
      ).describe('The desired project data retention type.'),
    }),
  )
  .output(ProjectDataRetentionSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 100'),
      'after?': type('string'),
      'order?': type("'asc' | 'desc'"),
    }),
  )
  .output(ProjectGroupListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      group_id: type('string').describe('Identifier of the group to add to the project.'),
      role: type('string').describe('Identifier of the project role to grant to the group.'),
    }),
  )
  .output(ProjectGroupSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      group_id: type('string'),
      'group_type?': type("'group' | 'tenant_group'"),
    }),
  )
  .output(ProjectGroupSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationProjectsProjectIdGroupsGroupId = os
  .route({
    method: 'DELETE',
    path: '/organization/projects/{project_id}/groups/{group_id}',
    tags: ['Project groups'],
    summary: 'Remove project group',
    description: "Revokes a group's access to a project.",
    successDescription: 'Group removed from the project successfully.',
  })
  .input(type({ project_id: type('string'), group_id: type('string') }))
  .output(ProjectGroupDeletedResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationProjectsProjectIdHostedToolPermissions = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/hosted_tool_permissions',
    tags: ['Hosted tools'],
    summary: 'Retrieve project hosted tool permissions',
    description: 'Returns hosted tool permissions for a project.',
    successDescription: 'Project hosted tool permissions retrieved successfully.',
  })
  .input(type({ project_id: type('string') }))
  .output(ProjectHostedToolPermissionsSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationProjectsProjectIdModelPermissions = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/model_permissions',
    tags: ['Projects'],
    summary: 'Retrieve project model permissions',
    description: 'Returns model permissions for a project.',
    successDescription: 'Project model permissions retrieved successfully.',
  })
  .input(type({ project_id: type('string') }))
  .output(ProjectModelPermissionsSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      mode: type("'allow_list' | 'deny_list'").describe('The model permissions mode to apply.'),
      model_ids: type('string[]').describe('The model IDs included in this permissions policy.'),
    }),
  )
  .output(ProjectModelPermissionsSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationProjectsProjectIdModelPermissions = os
  .route({
    method: 'DELETE',
    path: '/organization/projects/{project_id}/model_permissions',
    tags: ['Projects'],
    summary: 'Delete project model permissions',
    description: 'Deletes model permissions for a project.',
    successDescription: 'Project model permissions deleted successfully.',
  })
  .input(type({ project_id: type('string') }))
  .output(ProjectModelPermissionsDeleteResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'after?': type('string'),
      'before?': type('string'),
    }),
  )
  .output(ProjectRateLimitListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      rate_limit_id: type('string'),
      'max_requests_per_1_minute?': type('number.integer').describe(
        'The maximum requests per minute.',
      ),
      'max_tokens_per_1_minute?': type('number.integer').describe('The maximum tokens per minute.'),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'after?': type('string'),
    }),
  )
  .output(ProjectServiceAccountListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      name: type('string').describe('The name of the service account being created.'),
      'create_service_account_only?': type(
        type('boolean').describe('Create the service account without default roles or an API key.'),
      ).or('null | null'),
      'expires_in_seconds?': type(
        'number.integer >= 1 & number.integer <= 31536000 | null | null',
      ).describe(
        'Number of seconds until the initial API key expires. If omitted or null, the key does not expire unless the effective organization or project policy requires an expiration. When a policy sets a maximum lifetime, this value must be provided and must not exceed that limit. A non-null value cannot be used when `create_service_account_only` is true.',
      ),
    }),
  )
  .output(ProjectServiceAccountCreateResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationProjectsProjectIdServiceAccountsServiceAccountId = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/service_accounts/{service_account_id}',
    tags: ['Projects'],
    summary: 'Retrieve project service account',
    description: 'Retrieves a service account in the project.',
    successDescription: 'Project service account retrieved successfully.',
  })
  .input(type({ project_id: type('string'), service_account_id: type('string') }))
  .output(ProjectServiceAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      service_account_id: type('string'),
      'name?': type('string').describe('The updated service account name.'),
      'role?': type("'member' | 'owner'").describe('The updated service account role.'),
    }),
  )
  .output(ProjectServiceAccountSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(type({ project_id: type('string'), service_account_id: type('string') }))
  .output(ProjectServiceAccountDeleteResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 100'),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
      'before?': type('string'),
    }),
  )
  .output(ProjectSpendAlertListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationProjectsProjectIdSpendAlertsAlertId = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/spend_alerts/{alert_id}',
    tags: ['Spend alerts'],
    summary: 'Retrieve project spend alert',
    description: 'Retrieves a project spend alert.',
    successDescription: 'Project spend alert retrieved successfully.',
  })
  .input(type({ project_id: type('string'), alert_id: type('string') }))
  .output(ProjectSpendAlertSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      alert_id: type('string'),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationProjectsProjectIdSpendAlertsAlertId = os
  .route({
    method: 'DELETE',
    path: '/organization/projects/{project_id}/spend_alerts/{alert_id}',
    tags: ['Spend alerts'],
    summary: 'Delete project spend alert',
    description: 'Deletes a project spend alert.',
    successDescription: 'Project spend alert deleted successfully.',
  })
  .input(type({ project_id: type('string'), alert_id: type('string') }))
  .output(ProjectSpendAlertDeletedResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'after?': type('string'),
    }),
  )
  .output(ProjectUserListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      'user_id?': type('string | null | null').describe('The ID of the user.'),
      'email?': type('string | null | null').describe('Email of the user to add.'),
      role: type('string').describe('`owner` or `member`'),
    }),
  )
  .output(ProjectUserSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationProjectsProjectIdUsersUserId = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/users/{user_id}',
    tags: ['Projects'],
    summary: 'Retrieve project user',
    description: 'Retrieves a user in the project.',
    successDescription: 'Project user retrieved successfully.',
  })
  .input(type({ project_id: type('string'), user_id: type('string') }))
  .output(ProjectUserSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string'),
      user_id: type('string'),
      'role?': type('string | null | null').describe('`owner` or `member`'),
    }),
  )
  .output(ProjectUserSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(type({ project_id: type('string'), user_id: type('string') }))
  .output(ProjectUserDeleteResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 1000'),
      'after?': type('string'),
      'order?': type("'asc' | 'desc'"),
    }),
  )
  .output(PublicRoleListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationRolesRoleId = os
  .route({
    method: 'GET',
    path: '/organization/roles/{role_id}',
    tags: ['Roles'],
    summary: 'Retrieve organization role',
    description: 'Retrieves an organization role.',
    successDescription: 'Role retrieved successfully.',
  })
  .input(type({ role_id: type('string') }))
  .output(RoleSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      role_id: type('string'),
      'permissions?': type('string[] | null | null').describe(
        'Updated set of permissions for the role.',
      ),
      'description?': type('string | null | null').describe('New description for the role.'),
      'role_name?': type('string | null | null').describe('New name for the role.'),
    }),
  )
  .output(RoleSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/organization/roles/{role_id}',
    tags: ['Roles'],
    summary: 'Delete organization role',
    description: 'Deletes a custom role from the organization.',
    successDescription: 'Role deleted successfully.',
  })
  .input(type({ role_id: type('string') }))
  .output(RoleDeletedResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 100'),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
      'before?': type('string'),
    }),
  )
  .output(OrganizationSpendAlertListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationSpendAlertsAlertId = os
  .route({
    method: 'GET',
    path: '/organization/spend_alerts/{alert_id}',
    tags: ['Spend alerts'],
    summary: 'Retrieve organization spend alert',
    description: 'Retrieves an organization spend alert.',
    successDescription: 'Organization spend alert retrieved successfully.',
  })
  .input(type({ alert_id: type('string') }))
  .output(OrganizationSpendAlertSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      alert_id: type('string'),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationSpendAlertsAlertId = os
  .route({
    method: 'DELETE',
    path: '/organization/spend_alerts/{alert_id}',
    tags: ['Spend alerts'],
    summary: 'Delete organization spend alert',
    description: 'Deletes an organization spend alert.',
    successDescription: 'Organization spend alert deleted successfully.',
  })
  .input(type({ alert_id: type('string') }))
  .output(OrganizationSpendAlertDeletedResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      start_time: type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'end_time?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'bucket_width?': type("'1m' | '1h' | '1d'"),
      'project_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'user_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'api_key_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'models?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'group_by?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'project_id' | 'user_id' | 'api_key_id' | 'model'[]"),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'page?': type('string'),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      start_time: type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'end_time?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'bucket_width?': type("'1m' | '1h' | '1d'"),
      'project_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'user_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'api_key_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'models?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'group_by?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'project_id' | 'user_id' | 'api_key_id' | 'model'[]"),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'page?': type('string'),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      start_time: type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'end_time?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'bucket_width?': type("'1m' | '1h' | '1d'"),
      'project_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'group_by?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'project_id'[]"),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'page?': type('string'),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      start_time: type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'end_time?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'bucket_width?': type("'1m' | '1h' | '1d'"),
      'project_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'user_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'api_key_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'models?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'batch?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
      'group_by?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to(
          "'project_id' | 'user_id' | 'api_key_id' | 'model' | 'batch' | 'service_tier' | 'api_source'[]",
        ),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'page?': type('string'),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      start_time: type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'end_time?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'bucket_width?': type("'1m' | '1h' | '1d'"),
      'project_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'user_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'api_key_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'models?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'group_by?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'project_id' | 'user_id' | 'api_key_id' | 'model'[]"),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'page?': type('string'),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      start_time: type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'end_time?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'bucket_width?': type("'1m' | '1h' | '1d'"),
      'project_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'user_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'api_key_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'vector_store_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'group_by?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'project_id' | 'user_id' | 'api_key_id' | 'vector_store_id'[]"),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'page?': type('string'),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      start_time: type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'end_time?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'bucket_width?': type("'1m' | '1h' | '1d'"),
      'sources?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'image.generation' | 'image.edit' | 'image.variation'[]"),
      'sizes?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'256x256' | '512x512' | '1024x1024' | '1792x1792' | '1024x1792'[]"),
      'project_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'user_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'api_key_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'models?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'group_by?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'project_id' | 'user_id' | 'api_key_id' | 'model' | 'size' | 'source'[]"),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'page?': type('string'),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      start_time: type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'end_time?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'bucket_width?': type("'1m' | '1h' | '1d'"),
      'project_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'user_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'api_key_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'models?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'group_by?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'project_id' | 'user_id' | 'api_key_id' | 'model'[]"),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'page?': type('string'),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      start_time: type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'end_time?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'bucket_width?': type("'1m' | '1h' | '1d'"),
      'project_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'group_by?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'project_id'[]"),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'page?': type('string'),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      start_time: type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'end_time?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'bucket_width?': type("'1m' | '1h' | '1d'"),
      'project_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'user_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'api_key_ids?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'models?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
      'context_levels?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'low' | 'medium' | 'high'[]"),
      'group_by?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'project_id' | 'user_id' | 'api_key_id' | 'model' | 'context_level' | 'api_source'[]"),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'page?': type('string'),
    }),
  )
  .output(UsageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'after?': type('string'),
      'emails?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
    }),
  )
  .output(UserListResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationUsersUserId = os
  .route({
    method: 'GET',
    path: '/organization/users/{user_id}',
    tags: ['Users'],
    summary: 'Retrieve user',
    description: 'Retrieves a user by their identifier.',
    successDescription: 'User retrieved successfully.',
  })
  .input(type({ user_id: type('string') }))
  .output(UserSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      user_id: type('string'),
      'role?': type('string | null | null').describe('`owner` or `reader`'),
      'role_id?': type('string | null | null').describe('Role ID to assign to the user.'),
      'technical_level?': type('string | null | null').describe('Technical level metadata.'),
      'developer_persona?': type('string | null | null').describe('Developer persona metadata.'),
    }),
  )
  .output(UserSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationUsersUserId = os
  .route({
    method: 'DELETE',
    path: '/organization/users/{user_id}',
    tags: ['Users'],
    summary: 'Delete user',
    description: 'Deletes a user from the organization.',
    successDescription: 'User deleted successfully.',
  })
  .input(type({ user_id: type('string') }))
  .output(UserDeleteResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      user_id: type('string'),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 1000'),
      'after?': type('string'),
      'order?': type("'asc' | 'desc'"),
    }),
  )
  .output(RoleListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      user_id: type('string'),
      role_id: type('string').describe('Identifier of the role to assign.'),
    }),
  )
  .output(UserRoleAssignmentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationUsersUserIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/organization/users/{user_id}/roles/{role_id}',
    tags: ['User organization role assignments'],
    summary: 'Retrieve user organization role',
    description: 'Retrieves an organization role assigned to a user.',
    successDescription: 'Organization role retrieved for the user successfully.',
  })
  .input(type({ user_id: type('string'), role_id: type('string') }))
  .output(AssignedRoleDetailsSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationUsersUserIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/organization/users/{user_id}/roles/{role_id}',
    tags: ['User organization role assignments'],
    summary: 'Unassign organization role from user',
    description: 'Unassigns an organization role from a user within the organization.',
    successDescription: 'Organization role unassigned from the user successfully.',
  })
  .input(type({ user_id: type('string'), role_id: type('string') }))
  .output(DeletedRoleAssignmentResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationExternalKeys = os
  .route({
    method: 'GET',
    path: '/organization/external_keys',
    summary: "List the external key configs registered on the user's organization",
    description: "List the external key configs registered on the user's organization",
    successDescription: 'Success',
  })
  .input(
    type({
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 100'),
      'order?': OrderEnumSchema,
      'after?': type('unknown').pipe((data, ctx) => {
        for (const branch of [
          type('string'),
          type('unknown')
            .pipe((data) => (data === 'null' ? null : data))
            .to('null | null'),
        ]) {
          const out = branch(data)
          if (!(out instanceof type.errors)) return out
        }
        return ctx.error('one of the members')
      }),
      'purpose?': ExternalKeyPurposeSchema,
    }),
  )
  .output(ListExternalKeysResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationExternalKeysExternalKeyId = os
  .route({
    method: 'GET',
    path: '/organization/external_keys/{external_key_id}',
    summary: 'Retrieve an external key registration',
    description: "Retrieve a stored external key registration for the user's organization.",
    successDescription: 'Success',
  })
  .input(type({ external_key_id: type('string') }))
  .output(ExternalKeyResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationExternalKeysExternalKeyId = os
  .route({
    method: 'DELETE',
    path: '/organization/external_keys/{external_key_id}',
    summary: "Delete an external key config for the user's organization",
    description: "Delete an external key config for the user's organization",
    successDescription: 'Success',
  })
  .input(type({ external_key_id: type('string') }))
  .output(ExternalKeyResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postOrganizationExternalKeysExternalKeyIdValidate = os
  .route({
    method: 'POST',
    path: '/organization/external_keys/{external_key_id}/validate',
    summary: "Validate an external key config for the user's organization",
    description: "Validate an external key config for the user's organization",
    successDescription: 'Success',
  })
  .input(type({ external_key_id: type('string') }))
  .output(ValidateExternalKeyResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationWorkloadIdentityProviders = os
  .route({
    method: 'GET',
    path: '/organization/workload_identity_providers',
    summary: 'List Platform workload identity providers',
    description: "List OIDC providers in the authenticated Admin API key's organization.",
    successDescription: 'Success',
  })
  .input(
    type({
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string').narrow(
        (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
      ),
    }),
  )
  .output(PlatformProviderListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId = os
  .route({
    method: 'GET',
    path: '/organization/workload_identity_providers/{workload_identity_provider_id}',
    summary: 'Retrieve Platform workload identity provider',
    description: 'Retrieve an OIDC provider in the authenticated organization.',
    successDescription: 'Success',
  })
  .input(
    type({
      workload_identity_provider_id: type('string').narrow(
        (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
      ),
    }),
  )
  .output(PlatformProviderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId = os
  .route({
    method: 'POST',
    path: '/organization/workload_identity_providers/{workload_identity_provider_id}',
    summary: 'Update Platform workload identity provider',
    description: 'Update supplied provider fields, preserving omitted fields.',
    successDescription: 'Success',
  })
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
      'description?': type('string | null | null'),
      'attribute_transformations?': type(type(TransformationParamSchema).array()).and(
        type('unknown[] <= 20'),
      ),
      'enabled?': type('boolean'),
    }),
  )
  .output(PlatformProviderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId = os
  .route({
    method: 'DELETE',
    path: '/organization/workload_identity_providers/{workload_identity_provider_id}',
    summary: 'Delete Platform workload identity provider',
    description: 'Delete a provider after deleting all its federation rules.',
    successDescription: 'Success',
  })
  .input(
    type({
      workload_identity_provider_id: type('string').narrow(
        (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
      ),
    }),
  )
  .output(PlatformProviderDeletedResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules = os
  .route({
    method: 'GET',
    path: '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules',
    summary: 'List Platform workload identity federation rules',
    description: "List the provider's federation rules to project service accounts.",
    successDescription: 'Success',
  })
  .input(
    type({
      workload_identity_provider_id: type('string').narrow(
        (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
      ),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string').narrow(
        (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
      ),
      'service_account_id?': type('string').narrow(
        (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
      ),
    }),
  )
  .output(PlatformFederationRuleListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules = os
  .route({
    method: 'POST',
    path: '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules',
    summary: 'Create Platform workload identity federation rule',
    description: 'Bind verified token attributes to an existing project service account.',
    successDescription: 'Success',
  })
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
      'name?': type('string'),
      'description?': type('string'),
      attribute_matchers: type({ '[string]': 'string | boolean | number.integer | number' }),
      'permissions?': type(DefaultPermissionsParamSchema).or(RestrictedPermissionsParamSchema),
      'enabled?': type('boolean'),
    }),
  )
  .output(PlatformFederationRuleSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    .handler(async ({ input }) => { throw new Error('Not implemented') })

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
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        workload_identity_federation_rule_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        'name?': type('string | null | null'),
        'description?': type('string | null | null'),
        'attribute_matchers?': type({ '[string]': 'string | boolean | number.integer | number' }),
        'permissions?': type(DefaultPermissionsParamSchema).or(RestrictedPermissionsParamSchema),
        'enabled?': type('boolean'),
      }),
    )
    .output(PlatformFederationRuleSchema)
    .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationUsageDecisions = os
  .route({
    method: 'GET',
    path: '/organization/usage/decisions',
    summary: 'Decisions',
    description: 'Get Decisions API usage details for the organization.',
    successDescription: 'Success',
  })
  .input(
    type({
      start_time: type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'end_time?': type('unknown').pipe(
        (data) => (data === 'null' ? null : data),
        type(
          type('unknown').pipe((data, ctx) => {
            for (const branch of [
              type('string').pipe((data, ctx) => {
                const value = Number(data)
                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
              }),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          }),
        ).or('null'),
      ),
      'bucket_width?': type('unknown').pipe(
        (data) => (data === 'null' ? null : data),
        type(
          type('unknown').pipe((data, ctx) => {
            for (const branch of [
              DecisionsUsageBucketWidthSchema.describe(
                'Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.',
              ),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          }),
        ).or('null'),
      ),
      'limit?': type('unknown').pipe(
        (data) => (data === 'null' ? null : data),
        type(
          type('unknown').pipe((data, ctx) => {
            for (const branch of [
              type('string').pipe((data, ctx) => {
                const value = Number(data)
                return Number.isSafeInteger(value) ? value : ctx.error('an integer')
              }),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          }),
        ).or('null'),
      ),
      'page?': type('unknown').pipe((data, ctx) => {
        for (const branch of [
          type('string').describe(
            'A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.',
          ),
          type('unknown')
            .pipe((data) => (data === 'null' ? null : data))
            .to('null | null'),
        ]) {
          const out = branch(data)
          if (!(out instanceof type.errors)) return out
        }
        return ctx.error('one of the members')
      }),
      'project_ids?': type('unknown').pipe(
        (data) => (data === 'null' ? null : data),
        type(
          type('unknown').pipe((data, ctx) => {
            for (const branch of [
              type('unknown')
                .pipe((data, ctx) => {
                  for (const branch of [
                    type('unknown')
                      .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
                      .to('string[]'),
                  ]) {
                    const out = branch(data)
                    if (!(out instanceof type.errors)) return out
                  }
                  return ctx.error('one of the members')
                })
                .describe('Return only usage for these projects.'),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          }),
        ).or('null'),
      ),
      'group_by?': type('unknown').pipe(
        (data) => (data === 'null' ? null : data),
        type(
          type('unknown').pipe((data, ctx) => {
            for (const branch of [
              type('unknown')
                .pipe((data, ctx) => {
                  for (const branch of [
                    type('unknown').pipe(
                      (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                      type(DecisionsUsageGroupBySchema).array(),
                    ),
                  ]) {
                    const out = branch(data)
                    if (!(out instanceof type.errors)) return out
                  }
                  return ctx.error('one of the members')
                })
                .describe(
                  'Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier`, `api_source` or any combination of them. When grouped by `api_source`, results use `agents_api` for attributed Agents API activity and `unlabeled` for all other activity. Without source grouping, `api_source` is null.',
                ),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          }),
        ).or('null'),
      ),
      'user_ids?': type('unknown').pipe(
        (data) => (data === 'null' ? null : data),
        type(
          type('unknown').pipe((data, ctx) => {
            for (const branch of [
              type('unknown')
                .pipe((data, ctx) => {
                  for (const branch of [
                    type('unknown')
                      .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
                      .to('string[]'),
                  ]) {
                    const out = branch(data)
                    if (!(out instanceof type.errors)) return out
                  }
                  return ctx.error('one of the members')
                })
                .describe('Return only usage for these users.'),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          }),
        ).or('null'),
      ),
      'api_key_ids?': type('unknown').pipe(
        (data) => (data === 'null' ? null : data),
        type(
          type('unknown').pipe((data, ctx) => {
            for (const branch of [
              type('unknown')
                .pipe((data, ctx) => {
                  for (const branch of [
                    type('unknown')
                      .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
                      .to('string[]'),
                  ]) {
                    const out = branch(data)
                    if (!(out instanceof type.errors)) return out
                  }
                  return ctx.error('one of the members')
                })
                .describe('Return only usage for these API keys.'),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          }),
        ).or('null'),
      ),
      'models?': type('unknown').pipe(
        (data) => (data === 'null' ? null : data),
        type(
          type('unknown').pipe((data, ctx) => {
            for (const branch of [
              type('unknown')
                .pipe((data, ctx) => {
                  for (const branch of [
                    type('unknown')
                      .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
                      .to('string[]'),
                  ]) {
                    const out = branch(data)
                    if (!(out instanceof type.errors)) return out
                  }
                  return ctx.error('one of the members')
                })
                .describe('Return only usage for these models.'),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          }),
        ).or('null'),
      ),
      'batch?': type('unknown').pipe(
        (data) => (data === 'null' ? null : data),
        type(
          type('unknown').pipe((data, ctx) => {
            for (const branch of [
              type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
                /^(?:true|1|yes|on|y|enabled)$/i.test(data),
              ),
              type('unknown')
                .pipe((data) => (data === 'null' ? null : data))
                .to('null | null'),
            ]) {
              const out = branch(data)
              if (!(out instanceof type.errors)) return out
            }
            return ctx.error('one of the members')
          }),
        ).or('null'),
      ),
    }),
  )
  .output(PublicDecisionsUsageResponseResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationExternalStorage = os
  .route({
    method: 'GET',
    path: '/organization/external_storage',
    summary: 'List external storage configurations',
    description: "List the organization's customer-managed external storage configurations.",
    successDescription: 'Success',
  })
  .input(
    type({
      'project_id?': type('unknown').pipe((data, ctx) => {
        for (const branch of [
          type('string'),
          type('unknown')
            .pipe((data) => (data === 'null' ? null : data))
            .to('null | null'),
        ]) {
          const out = branch(data)
          if (!(out instanceof type.errors)) return out
        }
        return ctx.error('one of the members')
      }),
      'after?': type('unknown').pipe((data, ctx) => {
        for (const branch of [
          type('string').describe('Return external storage configurations after this ID.'),
          type('unknown')
            .pipe((data) => (data === 'null' ? null : data))
            .to('null | null'),
        ]) {
          const out = branch(data)
          if (!(out instanceof type.errors)) return out
        }
        return ctx.error('one of the members')
      }),
      'order?': ExternalStorageOrderSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
    }),
  )
  .output(ExternalStorageListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationExternalStorageExternalStorageId = os
  .route({
    method: 'GET',
    path: '/organization/external_storage/{external_storage_id}',
    summary: 'Get an external storage configuration',
    description: 'Get one customer-managed external storage configuration.',
    successDescription: 'Success',
  })
  .input(type({ external_storage_id: type('string') }))
  .output(ExternalStorageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationExternalStorageExternalStorageId = os
  .route({
    method: 'DELETE',
    path: '/organization/external_storage/{external_storage_id}',
    summary: 'Delete an external storage configuration',
    description:
      "Disconnect a customer-managed external storage configuration. Removing the project's last configuration restores organization-default retention if customer-managed retention was active. Repeating a deletion also completes any interrupted retention update. Cloud storage is unchanged.",
    successDescription: 'Success',
  })
  .input(type({ external_storage_id: type('string') }))
  .output(ExternalStorageDeletedResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postOrganizationExternalStorageExternalStorageIdValidate = os
  .route({
    method: 'POST',
    path: '/organization/external_storage/{external_storage_id}/validate',
    summary: 'Validate an external storage configuration',
    description: 'Validate one customer-managed external storage configuration.',
    successDescription: 'Success',
  })
  .input(type({ external_storage_id: type('string') }))
  .output(ExternalStorageResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationSpendLimit = os
  .route({
    method: 'GET',
    path: '/organization/spend_limit',
    summary: 'Get organization spend limit',
    description: "Get the organization's hard spend limit.",
    successDescription: 'Hard spend limit retrieved successfully.',
  })
  .output(OrganizationSpendLimitResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationSpendLimit = os
  .route({
    method: 'DELETE',
    path: '/organization/spend_limit',
    summary: 'Delete organization spend limit',
    description: "Delete the organization's hard spend limit.",
    successDescription: 'Hard spend limit deleted successfully.',
  })
  .output(OrganizationSpendLimitDeletedResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationProjectsProjectIdSpendLimit = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/spend_limit',
    summary: 'Get project spend limit',
    description: "Get a project's hard spend limit.",
    successDescription: 'Hard spend limit retrieved successfully.',
  })
  .input(type({ project_id: type('string') }))
  .output(ProjectSpendLimitResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postOrganizationProjectsProjectIdSpendLimit = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/spend_limit',
    summary: 'Update project spend limit',
    description: "Create or replace a project's hard spend limit.",
    successDescription: 'Hard spend limit created or replaced successfully.',
  })
  .input(
    type({
      project_id: type('string'),
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteOrganizationProjectsProjectIdSpendLimit = os
  .route({
    method: 'DELETE',
    path: '/organization/projects/{project_id}/spend_limit',
    summary: 'Delete project spend limit',
    description: "Delete a project's hard spend limit.",
    successDescription: 'Hard spend limit deleted successfully.',
  })
  .input(type({ project_id: type('string') }))
  .output(ProjectSpendLimitDeletedResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getOrganizationProjectsProjectIdServiceTierSettings = os
  .route({
    method: 'GET',
    path: '/organization/projects/{project_id}/service_tier_settings',
    summary: 'Retrieve project service tier settings',
    description: 'Retrieve the configured default and enabled service tiers for a project.',
    successDescription: 'Success',
  })
  .input(type({ project_id: type('string').describe('The ID of the project') }))
  .output(ProjectServiceTierSettingsResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    type({
      project_id: type('string').describe('The ID of the project'),
      'default?': ProjectDefaultServiceTierSchema,
      'enabled_tiers?': type("'all'")
        .or(type(ProjectOptionalServiceTierSchema).array())
        .describe(
          'Additional service tiers enabled for this project. "all" includes future tiers. An empty array allows only Standard. Organization policy and eligibility still apply.',
        ),
    }),
  )
  .output(ProjectServiceTierSettingsResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeys = os
  .route({
    method: 'POST',
    path: '/organization/projects/{project_id}/service_accounts/{service_account_id}/api_keys',
    summary: 'Create an API key for a service account',
    description: 'Creates an API key for a service account in the project.',
    successDescription: 'Service account API key created successfully.',
  })
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })
