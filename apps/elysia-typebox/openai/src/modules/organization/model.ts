import { t, type UnwrapSchema } from 'elysia'
import {
  AuditLogEventTypeSchema,
  DecisionsUsageBucketWidthSchema,
  DecisionsUsageGroupBySchema,
  ExternalKeyPurposeSchema,
  ExternalStorageOrderSchema,
  OrderEnumSchema,
} from '../../components/schemas'

export const OrganizationModel = {
  adminApiKeysListQuery: t.Object({
    after: t.Optional(
      t.Union([
        t.String({
          description: 'Return keys with IDs that come after this ID in the pagination order.',
        }),
        t.Null(),
      ]),
    ),
    order: t.Optional(
      t.UnionEnum(['asc', 'desc'], {
        description: 'Order results by creation time, ascending or descending.',
        default: 'asc',
      }),
    ),
    limit: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        description: 'Maximum number of keys to return.',
        default: 20,
      }),
    ),
  }),
  adminApiKeysCreateBody: t.Object({
    name: t.String({ example: 'New Admin Key' }),
    expires_in_seconds: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 31536000,
        example: 2592000,
        description:
          'The number of seconds until the API key expires. Omit this field for a key that does not expire.',
      }),
    ),
  }),
  adminApiKeysGetParams: t.Object({ key_id: t.String({ description: 'The ID of the API key.' }) }),
  adminApiKeysDeleteParams: t.Object({
    key_id: t.String({ description: 'The ID of the API key to be deleted.' }),
  }),
  adminApiKeysDeleteResponse200: t.Object({
    id: t.String({ example: 'key_abc' }),
    object: t.Literal('organization.admin_api_key.deleted', {
      example: 'organization.admin_api_key.deleted',
    }),
    deleted: t.Boolean({ example: true }),
  }),
  listAuditLogsQuery: t.Object({
    effective_at: t.Optional(
      t.ObjectString({
        gt: t.Optional(
          t.Integer({
            maximum: 9007199254740991,
            description:
              'Return only events whose `effective_at` (Unix seconds) is greater than this value.',
          }),
        ),
        gte: t.Optional(
          t.Integer({
            maximum: 9007199254740991,
            description:
              'Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.',
          }),
        ),
        lt: t.Optional(
          t.Integer({
            maximum: 9007199254740991,
            description:
              'Return only events whose `effective_at` (Unix seconds) is less than this value.',
          }),
        ),
        lte: t.Optional(
          t.Integer({
            maximum: 9007199254740991,
            description:
              'Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.',
          }),
        ),
      }),
    ),
    'project_ids[]': t.Optional(t.Array(t.String())),
    'event_types[]': t.Optional(t.Array(AuditLogEventTypeSchema)),
    'actor_ids[]': t.Optional(t.Array(t.String())),
    'actor_emails[]': t.Optional(t.Array(t.String())),
    'resource_ids[]': t.Optional(t.Array(t.String())),
    tenant_only: t.Optional(t.Boolean({ default: false })),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    after: t.Optional(t.String()),
    before: t.Optional(t.String()),
  }),
  listOrganizationCertificatesQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    after: t.Optional(t.String()),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
  }),
  getCertificateParams: t.Object({ certificate_id: t.String() }),
  getCertificateQuery: t.Object({ include: t.Optional(t.Array(t.Literal('content'))) }),
  modifyCertificateParams: t.Object({ certificate_id: t.String() }),
  deleteCertificateParams: t.Object({ certificate_id: t.String() }),
  usageCostsQuery: t.Object({
    start_time: t.Integer({ maximum: 9007199254740991 }),
    end_time: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    bucket_width: t.Optional(t.Literal('1d', { default: '1d' })),
    project_ids: t.Optional(t.Array(t.String())),
    api_key_ids: t.Optional(t.Array(t.String())),
    line_items: t.Optional(t.Array(t.String())),
    group_by: t.Optional(
      t.Array(
        t.UnionEnum(['project_id', 'user_id', 'line_item', 'api_key_id', 'api_source'], {
          default: undefined,
        }),
      ),
    ),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 7 })),
    page: t.Optional(t.String()),
  }),
  listGroupsQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 1000, default: 100 })),
    after: t.Optional(t.String()),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'asc' })),
  }),
  retrieveGroupParams: t.Object({ group_id: t.String() }),
  updateGroupParams: t.Object({ group_id: t.String() }),
  deleteGroupParams: t.Object({ group_id: t.String() }),
  listGroupRoleAssignmentsParams: t.Object({ group_id: t.String() }),
  listGroupRoleAssignmentsQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 1000 })),
    after: t.Optional(t.String()),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: undefined })),
  }),
  assignGroupRoleParams: t.Object({ group_id: t.String() }),
  retrieveGroupRoleParams: t.Object({ group_id: t.String(), role_id: t.String() }),
  unassignGroupRoleParams: t.Object({ group_id: t.String(), role_id: t.String() }),
  listGroupUsersParams: t.Object({ group_id: t.String() }),
  listGroupUsersQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 1000, default: 100 })),
    after: t.Optional(t.String()),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
  }),
  addGroupUserParams: t.Object({ group_id: t.String() }),
  retrieveGroupUserParams: t.Object({ group_id: t.String(), user_id: t.String() }),
  removeGroupUserParams: t.Object({ group_id: t.String(), user_id: t.String() }),
  listInvitesQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    after: t.Optional(t.String()),
  }),
  retrieveInviteParams: t.Object({ invite_id: t.String() }),
  deleteInviteParams: t.Object({ invite_id: t.String() }),
  listProjectsQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    after: t.Optional(t.String()),
    include_archived: t.Optional(t.Boolean({ default: false })),
  }),
  retrieveProjectParams: t.Object({ project_id: t.String() }),
  modifyProjectParams: t.Object({ project_id: t.String() }),
  listProjectApiKeysParams: t.Object({ project_id: t.String() }),
  listProjectApiKeysQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    after: t.Optional(t.String()),
    owner_project_access: t.Optional(
      t.UnionEnum(['active', 'inactive', 'any'], { default: undefined }),
    ),
  }),
  retrieveProjectApiKeyParams: t.Object({ project_id: t.String(), api_key_id: t.String() }),
  updateProjectApiKeyParams: t.Object({ project_id: t.String(), api_key_id: t.String() }),
  deleteProjectApiKeyParams: t.Object({ project_id: t.String(), api_key_id: t.String() }),
  archiveProjectParams: t.Object({ project_id: t.String() }),
  listProjectCertificatesParams: t.Object({ project_id: t.String() }),
  listProjectCertificatesQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    after: t.Optional(t.String()),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
  }),
  activateProjectCertificatesParams: t.Object({ project_id: t.String() }),
  deactivateProjectCertificatesParams: t.Object({ project_id: t.String() }),
  retrieveProjectDataRetentionParams: t.Object({ project_id: t.String() }),
  updateProjectDataRetentionParams: t.Object({ project_id: t.String() }),
  listProjectGroupsParams: t.Object({ project_id: t.String() }),
  listProjectGroupsQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 100, default: 20 })),
    after: t.Optional(t.String()),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'asc' })),
  }),
  addProjectGroupParams: t.Object({ project_id: t.String() }),
  retrieveProjectGroupParams: t.Object({ project_id: t.String(), group_id: t.String() }),
  retrieveProjectGroupQuery: t.Object({
    group_type: t.Optional(t.UnionEnum(['group', 'tenant_group'], { default: 'group' })),
  }),
  removeProjectGroupParams: t.Object({ project_id: t.String(), group_id: t.String() }),
  retrieveProjectHostedToolPermissionsParams: t.Object({ project_id: t.String() }),
  updateProjectHostedToolPermissionsParams: t.Object({ project_id: t.String() }),
  retrieveProjectModelPermissionsParams: t.Object({ project_id: t.String() }),
  updateProjectModelPermissionsParams: t.Object({ project_id: t.String() }),
  deleteProjectModelPermissionsParams: t.Object({ project_id: t.String() }),
  listProjectRateLimitsParams: t.Object({ project_id: t.String() }),
  listProjectRateLimitsQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 100 })),
    after: t.Optional(t.String()),
    before: t.Optional(t.String()),
  }),
  updateProjectRateLimitsParams: t.Object({ project_id: t.String(), rate_limit_id: t.String() }),
  listProjectServiceAccountsParams: t.Object({ project_id: t.String() }),
  listProjectServiceAccountsQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    after: t.Optional(t.String()),
  }),
  createProjectServiceAccountParams: t.Object({ project_id: t.String() }),
  retrieveProjectServiceAccountParams: t.Object({
    project_id: t.String(),
    service_account_id: t.String(),
  }),
  updateProjectServiceAccountParams: t.Object({
    project_id: t.String(),
    service_account_id: t.String(),
  }),
  deleteProjectServiceAccountParams: t.Object({
    project_id: t.String(),
    service_account_id: t.String(),
  }),
  listProjectSpendAlertsParams: t.Object({ project_id: t.String() }),
  listProjectSpendAlertsQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 100 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'asc' })),
    after: t.Optional(t.String()),
    before: t.Optional(t.String()),
  }),
  createProjectSpendAlertParams: t.Object({ project_id: t.String() }),
  retrieveProjectSpendAlertParams: t.Object({ project_id: t.String(), alert_id: t.String() }),
  updateProjectSpendAlertParams: t.Object({ project_id: t.String(), alert_id: t.String() }),
  deleteProjectSpendAlertParams: t.Object({ project_id: t.String(), alert_id: t.String() }),
  listProjectUsersParams: t.Object({ project_id: t.String() }),
  listProjectUsersQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    after: t.Optional(t.String()),
  }),
  createProjectUserParams: t.Object({ project_id: t.String() }),
  retrieveProjectUserParams: t.Object({ project_id: t.String(), user_id: t.String() }),
  modifyProjectUserParams: t.Object({ project_id: t.String(), user_id: t.String() }),
  deleteProjectUserParams: t.Object({ project_id: t.String(), user_id: t.String() }),
  listRolesQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 1000, default: 1000 })),
    after: t.Optional(t.String()),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'asc' })),
  }),
  retrieveRoleParams: t.Object({ role_id: t.String() }),
  updateRoleParams: t.Object({ role_id: t.String() }),
  deleteRoleParams: t.Object({ role_id: t.String() }),
  listOrganizationSpendAlertsQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 100 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'asc' })),
    after: t.Optional(t.String()),
    before: t.Optional(t.String()),
  }),
  retrieveOrganizationSpendAlertParams: t.Object({ alert_id: t.String() }),
  updateOrganizationSpendAlertParams: t.Object({ alert_id: t.String() }),
  deleteOrganizationSpendAlertParams: t.Object({ alert_id: t.String() }),
  usageAudioSpeechesQuery: t.Object({
    start_time: t.Integer({ maximum: 9007199254740991 }),
    end_time: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    bucket_width: t.Optional(t.UnionEnum(['1m', '1h', '1d'], { default: '1d' })),
    project_ids: t.Optional(t.Array(t.String())),
    user_ids: t.Optional(t.Array(t.String())),
    api_key_ids: t.Optional(t.Array(t.String())),
    models: t.Optional(t.Array(t.String())),
    group_by: t.Optional(
      t.Array(
        t.UnionEnum(['project_id', 'user_id', 'api_key_id', 'model'], { default: undefined }),
      ),
    ),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    page: t.Optional(t.String()),
  }),
  usageAudioTranscriptionsQuery: t.Object({
    start_time: t.Integer({ maximum: 9007199254740991 }),
    end_time: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    bucket_width: t.Optional(t.UnionEnum(['1m', '1h', '1d'], { default: '1d' })),
    project_ids: t.Optional(t.Array(t.String())),
    user_ids: t.Optional(t.Array(t.String())),
    api_key_ids: t.Optional(t.Array(t.String())),
    models: t.Optional(t.Array(t.String())),
    group_by: t.Optional(
      t.Array(
        t.UnionEnum(['project_id', 'user_id', 'api_key_id', 'model'], { default: undefined }),
      ),
    ),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    page: t.Optional(t.String()),
  }),
  usageCodeInterpreterSessionsQuery: t.Object({
    start_time: t.Integer({ maximum: 9007199254740991 }),
    end_time: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    bucket_width: t.Optional(t.UnionEnum(['1m', '1h', '1d'], { default: '1d' })),
    project_ids: t.Optional(t.Array(t.String())),
    group_by: t.Optional(t.Array(t.Literal('project_id'))),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    page: t.Optional(t.String()),
  }),
  usageCompletionsQuery: t.Object({
    start_time: t.Integer({ maximum: 9007199254740991 }),
    end_time: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    bucket_width: t.Optional(t.UnionEnum(['1m', '1h', '1d'], { default: '1d' })),
    project_ids: t.Optional(t.Array(t.String())),
    user_ids: t.Optional(t.Array(t.String())),
    api_key_ids: t.Optional(t.Array(t.String())),
    models: t.Optional(t.Array(t.String())),
    batch: t.Optional(t.Boolean()),
    group_by: t.Optional(
      t.Array(
        t.UnionEnum(
          ['project_id', 'user_id', 'api_key_id', 'model', 'batch', 'service_tier', 'api_source'],
          { default: undefined },
        ),
      ),
    ),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    page: t.Optional(t.String()),
  }),
  usageEmbeddingsQuery: t.Object({
    start_time: t.Integer({ maximum: 9007199254740991 }),
    end_time: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    bucket_width: t.Optional(t.UnionEnum(['1m', '1h', '1d'], { default: '1d' })),
    project_ids: t.Optional(t.Array(t.String())),
    user_ids: t.Optional(t.Array(t.String())),
    api_key_ids: t.Optional(t.Array(t.String())),
    models: t.Optional(t.Array(t.String())),
    group_by: t.Optional(
      t.Array(
        t.UnionEnum(['project_id', 'user_id', 'api_key_id', 'model'], { default: undefined }),
      ),
    ),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    page: t.Optional(t.String()),
  }),
  usageFileSearchCallsQuery: t.Object({
    start_time: t.Integer({ maximum: 9007199254740991 }),
    end_time: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    bucket_width: t.Optional(t.UnionEnum(['1m', '1h', '1d'], { default: '1d' })),
    project_ids: t.Optional(t.Array(t.String())),
    user_ids: t.Optional(t.Array(t.String())),
    api_key_ids: t.Optional(t.Array(t.String())),
    vector_store_ids: t.Optional(t.Array(t.String())),
    group_by: t.Optional(
      t.Array(
        t.UnionEnum(['project_id', 'user_id', 'api_key_id', 'vector_store_id'], {
          default: undefined,
        }),
      ),
    ),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    page: t.Optional(t.String()),
  }),
  usageImagesQuery: t.Object({
    start_time: t.Integer({ maximum: 9007199254740991 }),
    end_time: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    bucket_width: t.Optional(t.UnionEnum(['1m', '1h', '1d'], { default: '1d' })),
    sources: t.Optional(
      t.Array(
        t.UnionEnum(['image.generation', 'image.edit', 'image.variation'], { default: undefined }),
      ),
    ),
    sizes: t.Optional(
      t.Array(
        t.UnionEnum(['256x256', '512x512', '1024x1024', '1792x1792', '1024x1792'], {
          default: undefined,
        }),
      ),
    ),
    project_ids: t.Optional(t.Array(t.String())),
    user_ids: t.Optional(t.Array(t.String())),
    api_key_ids: t.Optional(t.Array(t.String())),
    models: t.Optional(t.Array(t.String())),
    group_by: t.Optional(
      t.Array(
        t.UnionEnum(['project_id', 'user_id', 'api_key_id', 'model', 'size', 'source'], {
          default: undefined,
        }),
      ),
    ),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    page: t.Optional(t.String()),
  }),
  usageModerationsQuery: t.Object({
    start_time: t.Integer({ maximum: 9007199254740991 }),
    end_time: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    bucket_width: t.Optional(t.UnionEnum(['1m', '1h', '1d'], { default: '1d' })),
    project_ids: t.Optional(t.Array(t.String())),
    user_ids: t.Optional(t.Array(t.String())),
    api_key_ids: t.Optional(t.Array(t.String())),
    models: t.Optional(t.Array(t.String())),
    group_by: t.Optional(
      t.Array(
        t.UnionEnum(['project_id', 'user_id', 'api_key_id', 'model'], { default: undefined }),
      ),
    ),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    page: t.Optional(t.String()),
  }),
  usageVectorStoresQuery: t.Object({
    start_time: t.Integer({ maximum: 9007199254740991 }),
    end_time: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    bucket_width: t.Optional(t.UnionEnum(['1m', '1h', '1d'], { default: '1d' })),
    project_ids: t.Optional(t.Array(t.String())),
    group_by: t.Optional(t.Array(t.Literal('project_id'))),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    page: t.Optional(t.String()),
  }),
  usageWebSearchCallsQuery: t.Object({
    start_time: t.Integer({ maximum: 9007199254740991 }),
    end_time: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    bucket_width: t.Optional(t.UnionEnum(['1m', '1h', '1d'], { default: '1d' })),
    project_ids: t.Optional(t.Array(t.String())),
    user_ids: t.Optional(t.Array(t.String())),
    api_key_ids: t.Optional(t.Array(t.String())),
    models: t.Optional(t.Array(t.String())),
    context_levels: t.Optional(
      t.Array(t.UnionEnum(['low', 'medium', 'high'], { default: undefined })),
    ),
    group_by: t.Optional(
      t.Array(
        t.UnionEnum(
          ['project_id', 'user_id', 'api_key_id', 'model', 'context_level', 'api_source'],
          { default: undefined },
        ),
      ),
    ),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991 })),
    page: t.Optional(t.String()),
  }),
  listUsersQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    after: t.Optional(t.String()),
    emails: t.Optional(t.Array(t.String())),
  }),
  retrieveUserParams: t.Object({ user_id: t.String() }),
  modifyUserParams: t.Object({ user_id: t.String() }),
  deleteUserParams: t.Object({ user_id: t.String() }),
  listUserRoleAssignmentsParams: t.Object({ user_id: t.String() }),
  listUserRoleAssignmentsQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 1000 })),
    after: t.Optional(t.String()),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: undefined })),
  }),
  assignUserRoleParams: t.Object({ user_id: t.String() }),
  retrieveUserRoleParams: t.Object({ user_id: t.String(), role_id: t.String() }),
  unassignUserRoleParams: t.Object({ user_id: t.String(), role_id: t.String() }),
  ListtheexternalkeyconfigsregisteredontheuserSorganizationQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 100 })),
    order: t.Optional(OrderEnumSchema),
    after: t.Optional(t.Union([t.String(), t.Null()])),
    purpose: t.Optional(ExternalKeyPurposeSchema),
  }),
  RetrieveanexternalkeyregistrationParams: t.Object({ external_key_id: t.String() }),
  DeleteanexternalkeyconfigfortheuserSorganizationParams: t.Object({ external_key_id: t.String() }),
  ValidateanexternalkeyconfigfortheuserSorganizationParams: t.Object({
    external_key_id: t.String(),
  }),
  ListPlatformworkloadidentityprovidersQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    order: t.Optional(
      t.Union([t.Literal('asc', { default: 'asc' }), t.Literal('desc', { default: 'desc' })]),
    ),
    after: t.Optional(t.String({ minLength: 1 })),
  }),
  RetrievePlatformworkloadidentityproviderParams: t.Object({
    workload_identity_provider_id: t.String({ minLength: 1 }),
  }),
  UpdatePlatformworkloadidentityproviderParams: t.Object({
    workload_identity_provider_id: t.String({ minLength: 1 }),
  }),
  DeletePlatformworkloadidentityproviderParams: t.Object({
    workload_identity_provider_id: t.String({ minLength: 1 }),
  }),
  ListPlatformworkloadidentityfederationrulesParams: t.Object({
    workload_identity_provider_id: t.String({ minLength: 1 }),
  }),
  ListPlatformworkloadidentityfederationrulesQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    order: t.Optional(
      t.Union([t.Literal('asc', { default: 'asc' }), t.Literal('desc', { default: 'desc' })]),
    ),
    after: t.Optional(t.String({ minLength: 1 })),
    service_account_id: t.Optional(t.String({ minLength: 1 })),
  }),
  CreatePlatformworkloadidentityfederationruleParams: t.Object({
    workload_identity_provider_id: t.String({ minLength: 1 }),
  }),
  RetrievePlatformworkloadidentityfederationruleParams: t.Object({
    workload_identity_provider_id: t.String({ minLength: 1 }),
    workload_identity_federation_rule_id: t.String({ minLength: 1 }),
  }),
  UpdatePlatformworkloadidentityfederationruleParams: t.Object({
    workload_identity_provider_id: t.String({ minLength: 1 }),
    workload_identity_federation_rule_id: t.String({ minLength: 1 }),
  }),
  DeletePlatformworkloadidentityfederationruleParams: t.Object({
    workload_identity_provider_id: t.String({ minLength: 1 }),
    workload_identity_federation_rule_id: t.String({ minLength: 1 }),
  }),
  OrganizationDecisionsusageQuery: t.Object({
    start_time: t.Integer({ maximum: 9007199254740991 }),
    end_time: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
    bucket_width: t.Optional(t.Union([DecisionsUsageBucketWidthSchema, t.Null()])),
    limit: t.Optional(t.Union([t.Integer({ maximum: 9007199254740991 }), t.Null()])),
    page: t.Optional(
      t.Union([
        t.String({
          description:
            'A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.',
        }),
        t.Null(),
      ]),
    ),
    project_ids: t.Optional(t.Union([t.Array(t.String()), t.Null()])),
    group_by: t.Optional(t.Union([t.Array(DecisionsUsageGroupBySchema), t.Null()])),
    user_ids: t.Optional(t.Union([t.Array(t.String()), t.Null()])),
    api_key_ids: t.Optional(t.Union([t.Array(t.String()), t.Null()])),
    models: t.Optional(t.Union([t.Array(t.String()), t.Null()])),
    batch: t.Optional(t.Union([t.Boolean(), t.Null()])),
  }),
  ListexternalstorageconfigurationsQuery: t.Object({
    project_id: t.Optional(t.Union([t.String({ example: 'proj_123' }), t.Null()])),
    after: t.Optional(
      t.Union([
        t.String({ description: 'Return external storage configurations after this ID.' }),
        t.Null(),
      ]),
    ),
    order: t.Optional(ExternalStorageOrderSchema),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
  }),
  GetanexternalstorageconfigurationParams: t.Object({
    external_storage_id: t.String({ example: 'extstorage_123' }),
  }),
  DeleteanexternalstorageconfigurationParams: t.Object({
    external_storage_id: t.String({ example: 'extstorage_123' }),
  }),
  ValidateanexternalstorageconfigurationParams: t.Object({
    external_storage_id: t.String({ example: 'extstorage_123' }),
  }),
  GetprojectspendlimitParams: t.Object({ project_id: t.String({ example: 'proj_123' }) }),
  UpdateprojectspendlimitParams: t.Object({ project_id: t.String({ example: 'proj_123' }) }),
  DeleteprojectspendlimitParams: t.Object({ project_id: t.String({ example: 'proj_123' }) }),
  RetrieveprojectservicetiersettingsParams: t.Object({
    project_id: t.String({ description: 'The ID of the project' }),
  }),
  UpdateprojectservicetiersettingsParams: t.Object({
    project_id: t.String({ description: 'The ID of the project' }),
  }),
  CreateanAPIkeyforaserviceaccountParams: t.Object({
    project_id: t.String({ description: 'The ID of the project.' }),
    service_account_id: t.String({ description: 'The ID of the service account.' }),
  }),
} as const

export type OrganizationModel = {
  [k in keyof typeof OrganizationModel]: UnwrapSchema<(typeof OrganizationModel)[k]>
}
