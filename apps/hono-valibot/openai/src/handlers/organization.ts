import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import {
  AuditLogEventTypeSchema,
  CreateGroupBodySchema,
  CreateGroupUserBodySchema,
  CreateSpendAlertBodySchema,
  InviteProjectGroupBodySchema,
  InviteRequestSchema,
  ModifyCertificateRequestSchema,
  ProjectCreateRequestSchema,
  ProjectHostedToolPermissionsUpdateRequestSchema,
  ProjectModelPermissionsUpdateRequestSchema,
  ProjectRateLimitUpdateRequestSchema,
  ProjectServiceAccountCreateRequestSchema,
  ProjectUpdateRequestSchema,
  ProjectUserCreateRequestSchema,
  ProjectUserUpdateRequestSchema,
  PublicAssignOrganizationGroupRoleBodySchema,
  PublicCreateOrganizationRoleBodySchema,
  PublicUpdateOrganizationRoleBodySchema,
  ToggleCertificatesRequestSchema,
  UpdateGroupBodySchema,
  UpdateOrganizationDataRetentionBodySchema,
  UpdateProjectDataRetentionBodySchema,
  UpdateProjectServiceAccountBodySchema,
  UploadCertificateRequestSchema,
  UserRoleUpdateRequestSchema,
  UpdateProjectApiKeyBodySchema,
  OrderEnumSchema,
  ExternalKeyPurposeSchema,
  V1OrganizationExternalKeysPostRequestSchema,
  CreatePlatformWorkloadIdentityProviderBodySchema,
  UpdatePlatformWorkloadIdentityProviderBodySchema,
  CreatePlatformWorkloadIdentityFederationRuleBodySchema,
  UpdatePlatformWorkloadIdentityFederationRuleBodySchema,
  DecisionsUsageBucketWidthSchema,
  DecisionsUsageGroupBySchema,
  ExternalStorageOrderSchema,
  CreateExternalStorageBodySchema,
  UpdateOrganizationSpendLimitBodySchema,
  UpdateProjectSpendLimitBodySchema,
  UpdateProjectServiceTierSettingsBodySchema,
  CreateProjectServiceAccountApiKeyBodySchema,
} from '../components'

export const organizationHandler = new Hono()
  .get(
    '/organization/admin_api_keys',
    sValidator(
      'query',
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
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.description('Maximum number of keys to return.'),
          v.metadata({ default: 20 }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/admin_api_keys',
    sValidator(
      'json',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/admin_api_keys/:key_id',
    sValidator(
      'param',
      v.object({ key_id: v.pipe(v.string(), v.description('The ID of the API key.')) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/admin_api_keys/:key_id',
    sValidator(
      'param',
      v.object({
        key_id: v.pipe(v.string(), v.description('The ID of the API key to be deleted.')),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/audit_logs',
    sValidator(
      'query',
      v.object({
        effective_at: v.optional(
          v.partial(
            v.object({
              gt: v.pipe(
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.metadata({ type: 'integer' }),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
                v.description(
                  'Return only events whose `effective_at` (Unix seconds) is greater than this value.',
                ),
              ),
              gte: v.pipe(
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.metadata({ type: 'integer' }),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
                v.description(
                  'Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.',
                ),
              ),
              lt: v.pipe(
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.metadata({ type: 'integer' }),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
                v.description(
                  'Return only events whose `effective_at` (Unix seconds) is less than this value.',
                ),
              ),
              lte: v.pipe(
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.metadata({ type: 'integer' }),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
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
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          'false',
        ),
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/certificates',
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/certificates', sValidator('json', UploadCertificateRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/organization/certificates/activate',
    sValidator('json', ToggleCertificatesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/certificates/deactivate',
    sValidator('json', ToggleCertificatesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/certificates/:certificate_id',
    sValidator('param', v.object({ certificate_id: v.string() })),
    sValidator(
      'query',
      v.partial(
        v.object({
          include: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.literal('content')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/certificates/:certificate_id',
    sValidator('param', v.object({ certificate_id: v.string() })),
    sValidator('json', ModifyCertificateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/certificates/:certificate_id',
    sValidator('param', v.object({ certificate_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/costs',
    sValidator(
      'query',
      v.object({
        start_time: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        end_time: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        bucket_width: v.optional(v.literal('1d'), '1d'),
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
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '7',
          ),
          v.metadata({ default: 7 }),
        ),
        page: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/organization/data_retention', (c) => { throw new Error('Not implemented') })
  .post(
    '/organization/data_retention',
    sValidator('json', UpdateOrganizationDataRetentionBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups',
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer', minimum: 0, maximum: 1000 }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(1000),
            ),
            '100',
          ),
          v.metadata({ default: 100 }),
        ),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/groups', sValidator('json', CreateGroupBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/groups/:group_id',
    sValidator('param', v.object({ group_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups/:group_id',
    sValidator('param', v.object({ group_id: v.string() })),
    sValidator('json', UpdateGroupBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/groups/:group_id',
    sValidator('param', v.object({ group_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/roles',
    sValidator('param', v.object({ group_id: v.string() })),
    sValidator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer', minimum: 0, maximum: 1000 }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(1000),
          ),
          after: v.string(),
          order: v.picklist(['asc', 'desc']),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups/:group_id/roles',
    sValidator('param', v.object({ group_id: v.string() })),
    sValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/roles/:role_id',
    sValidator('param', v.object({ group_id: v.string(), role_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/groups/:group_id/roles/:role_id',
    sValidator('param', v.object({ group_id: v.string(), role_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/users',
    sValidator('param', v.object({ group_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer', minimum: 0, maximum: 1000 }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(1000),
            ),
            '100',
          ),
          v.metadata({ default: 100 }),
        ),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups/:group_id/users',
    sValidator('param', v.object({ group_id: v.string() })),
    sValidator('json', CreateGroupUserBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/users/:user_id',
    sValidator('param', v.object({ group_id: v.string(), user_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/groups/:group_id/users/:user_id',
    sValidator('param', v.object({ group_id: v.string(), user_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/invites',
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
        after: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/invites', sValidator('json', InviteRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/invites/:invite_id',
    sValidator('param', v.object({ invite_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/invites/:invite_id',
    sValidator('param', v.object({ invite_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects',
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
        after: v.optional(v.string()),
        include_archived: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          'false',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/projects', sValidator('json', ProjectCreateRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/projects/:project_id',
    sValidator('param', v.object({ project_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator('json', ProjectUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/api_keys',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
        after: v.optional(v.string()),
        owner_project_access: v.optional(v.picklist(['active', 'inactive', 'any'])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator('param', v.object({ project_id: v.string(), api_key_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator('param', v.object({ project_id: v.string(), api_key_id: v.string() })),
    sValidator('json', UpdateProjectApiKeyBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator('param', v.object({ project_id: v.string(), api_key_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/archive',
    sValidator('param', v.object({ project_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/certificates',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/certificates/activate',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator('json', ToggleCertificatesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/certificates/deactivate',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator('json', ToggleCertificatesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/data_retention',
    sValidator('param', v.object({ project_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/data_retention',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator('json', UpdateProjectDataRetentionBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/groups',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer', minimum: 0, maximum: 100 }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(100),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/groups',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator('json', InviteProjectGroupBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/groups/:group_id',
    sValidator('param', v.object({ project_id: v.string(), group_id: v.string() })),
    sValidator(
      'query',
      v.object({ group_type: v.optional(v.picklist(['group', 'tenant_group']), 'group') }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/groups/:group_id',
    sValidator('param', v.object({ project_id: v.string(), group_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/hosted_tool_permissions',
    sValidator('param', v.object({ project_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/hosted_tool_permissions',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator('json', ProjectHostedToolPermissionsUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', v.object({ project_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator('json', ProjectModelPermissionsUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', v.object({ project_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/rate_limits',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '100',
          ),
          v.metadata({ default: 100 }),
        ),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/rate_limits/:rate_limit_id',
    sValidator('param', v.object({ project_id: v.string(), rate_limit_id: v.string() })),
    sValidator('json', ProjectRateLimitUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/service_accounts',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
        after: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_accounts',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator('json', ProjectServiceAccountCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator('param', v.object({ project_id: v.string(), service_account_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator('param', v.object({ project_id: v.string(), service_account_id: v.string() })),
    sValidator('json', UpdateProjectServiceAccountBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator('param', v.object({ project_id: v.string(), service_account_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/spend_alerts',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer', minimum: 0, maximum: 100 }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/spend_alerts',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator('json', CreateSpendAlertBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator('param', v.object({ project_id: v.string(), alert_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator('param', v.object({ project_id: v.string(), alert_id: v.string() })),
    sValidator('json', CreateSpendAlertBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator('param', v.object({ project_id: v.string(), alert_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/users',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
        after: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/users',
    sValidator('param', v.object({ project_id: v.string() })),
    sValidator('json', ProjectUserCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/users/:user_id',
    sValidator('param', v.object({ project_id: v.string(), user_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/users/:user_id',
    sValidator('param', v.object({ project_id: v.string(), user_id: v.string() })),
    sValidator('json', ProjectUserUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/users/:user_id',
    sValidator('param', v.object({ project_id: v.string(), user_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/roles',
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer', minimum: 0, maximum: 1000 }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(1000),
            ),
            '1000',
          ),
          v.metadata({ default: 1000 }),
        ),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/roles',
    sValidator('json', PublicCreateOrganizationRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/roles/:role_id',
    sValidator('param', v.object({ role_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/roles/:role_id',
    sValidator('param', v.object({ role_id: v.string() })),
    sValidator('json', PublicUpdateOrganizationRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/roles/:role_id',
    sValidator('param', v.object({ role_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/spend_alerts',
    sValidator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer', minimum: 0, maximum: 100 }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/spend_alerts', sValidator('json', CreateSpendAlertBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', v.object({ alert_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', v.object({ alert_id: v.string() })),
    sValidator('json', CreateSpendAlertBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', v.object({ alert_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/audio_speeches',
    sValidator(
      'query',
      v.object({
        start_time: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        end_time: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
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
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        page: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/audio_transcriptions',
    sValidator(
      'query',
      v.object({
        start_time: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        end_time: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
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
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        page: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/code_interpreter_sessions',
    sValidator(
      'query',
      v.object({
        start_time: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        end_time: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
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
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        page: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/completions',
    sValidator(
      'query',
      v.object({
        start_time: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        end_time: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
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
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        page: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/embeddings',
    sValidator(
      'query',
      v.object({
        start_time: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        end_time: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
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
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        page: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/file_search_calls',
    sValidator(
      'query',
      v.object({
        start_time: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        end_time: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
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
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        page: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/images',
    sValidator(
      'query',
      v.object({
        start_time: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        end_time: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
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
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        page: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/moderations',
    sValidator(
      'query',
      v.object({
        start_time: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        end_time: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
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
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        page: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/vector_stores',
    sValidator(
      'query',
      v.object({
        start_time: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        end_time: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
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
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        page: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/web_search_calls',
    sValidator(
      'query',
      v.object({
        start_time: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        end_time: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        bucket_width: v.optional(v.picklist(['1m', '1h', '1d']), '1d'),
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
        limit: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
        ),
        page: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users',
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users/:user_id',
    sValidator('param', v.object({ user_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/users/:user_id',
    sValidator('param', v.object({ user_id: v.string() })),
    sValidator('json', UserRoleUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/users/:user_id',
    sValidator('param', v.object({ user_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users/:user_id/roles',
    sValidator('param', v.object({ user_id: v.string() })),
    sValidator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer', minimum: 0, maximum: 1000 }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(1000),
          ),
          after: v.string(),
          order: v.picklist(['asc', 'desc']),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/users/:user_id/roles',
    sValidator('param', v.object({ user_id: v.string() })),
    sValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users/:user_id/roles/:role_id',
    sValidator('param', v.object({ user_id: v.string(), role_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/users/:user_id/roles/:role_id',
    sValidator('param', v.object({ user_id: v.string(), role_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_keys',
    sValidator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer', minimum: 0, maximum: 100 }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
          order: OrderEnumSchema,
          after: v.union([
            v.string(),
            v.pipe(
              v.unknown(),
              v.transform((input) => (input === 'null' ? null : input)),
              v.null(),
            ),
          ]),
          purpose: ExternalKeyPurposeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_keys',
    sValidator('json', V1OrganizationExternalKeysPostRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_keys/:external_key_id',
    sValidator('param', v.object({ external_key_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/external_keys/:external_key_id',
    sValidator('param', v.object({ external_key_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_keys/:external_key_id/validate',
    sValidator('param', v.object({ external_key_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/workload_identity_providers',
    sValidator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer', minimum: 1, maximum: 100 }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
          order: v.union([
            v.optional(v.literal('asc'), 'asc'),
            v.optional(v.literal('desc'), 'desc'),
          ]),
          after: v.pipe(v.string(), v.minCodePoints(1)),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/workload_identity_providers',
    sValidator('json', CreatePlatformWorkloadIdentityProviderBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    sValidator(
      'param',
      v.object({ workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    sValidator(
      'param',
      v.object({ workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)) }),
    ),
    sValidator('json', UpdatePlatformWorkloadIdentityProviderBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    sValidator(
      'param',
      v.object({ workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    sValidator(
      'param',
      v.object({ workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)) }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer', minimum: 1, maximum: 100 }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
          order: v.union([
            v.optional(v.literal('asc'), 'asc'),
            v.optional(v.literal('desc'), 'desc'),
          ]),
          after: v.pipe(v.string(), v.minCodePoints(1)),
          service_account_id: v.pipe(v.string(), v.minCodePoints(1)),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    sValidator(
      'param',
      v.object({ workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)) }),
    ),
    sValidator('json', CreatePlatformWorkloadIdentityFederationRuleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    sValidator(
      'param',
      v.object({
        workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
        workload_identity_federation_rule_id: v.pipe(v.string(), v.minCodePoints(1)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    sValidator(
      'param',
      v.object({
        workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
        workload_identity_federation_rule_id: v.pipe(v.string(), v.minCodePoints(1)),
      }),
    ),
    sValidator('json', UpdatePlatformWorkloadIdentityFederationRuleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    sValidator(
      'param',
      v.object({
        workload_identity_provider_id: v.pipe(v.string(), v.minCodePoints(1)),
        workload_identity_federation_rule_id: v.pipe(v.string(), v.minCodePoints(1)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/decisions',
    sValidator(
      'query',
      v.object({
        start_time: v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer' }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
        ),
        end_time: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === 'null' ? null : input)),
            v.nullable(
              v.union([
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.metadata({ type: 'integer' }),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
                v.pipe(
                  v.unknown(),
                  v.transform((input) => (input === 'null' ? null : input)),
                  v.null(),
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
                  v.null(),
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
                v.pipe(
                  v.string(),
                  v.regex(/^-?(?:0|[1-9]\d*)$/),
                  v.metadata({ type: 'integer' }),
                  v.transform((input) => Number(input)),
                  v.number(),
                  v.safeInteger(),
                ),
                v.pipe(
                  v.unknown(),
                  v.transform((input) => (input === 'null' ? null : input)),
                  v.null(),
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
              v.null(),
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
                  v.null(),
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
                  v.null(),
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
                  v.null(),
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
                  v.null(),
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
                  v.null(),
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
                  v.null(),
                ),
              ]),
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_storage',
    sValidator(
      'query',
      v.partial(
        v.object({
          project_id: v.union([
            v.pipe(v.string(), v.metadata({ examples: ['proj_123'] })),
            v.pipe(
              v.unknown(),
              v.transform((input) => (input === 'null' ? null : input)),
              v.null(),
            ),
          ]),
          after: v.union([
            v.pipe(
              v.string(),
              v.description('Return external storage configurations after this ID.'),
            ),
            v.pipe(
              v.unknown(),
              v.transform((input) => (input === 'null' ? null : input)),
              v.null(),
            ),
          ]),
          order: ExternalStorageOrderSchema,
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer', minimum: 1, maximum: 100 }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_storage',
    sValidator('json', CreateExternalStorageBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_storage/:external_storage_id',
    sValidator(
      'param',
      v.object({
        external_storage_id: v.pipe(v.string(), v.metadata({ examples: ['extstorage_123'] })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/external_storage/:external_storage_id',
    sValidator(
      'param',
      v.object({
        external_storage_id: v.pipe(v.string(), v.metadata({ examples: ['extstorage_123'] })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_storage/:external_storage_id/validate',
    sValidator(
      'param',
      v.object({
        external_storage_id: v.pipe(v.string(), v.metadata({ examples: ['extstorage_123'] })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/organization/spend_limit', (c) => { throw new Error('Not implemented') })
  .post(
    '/organization/spend_limit',
    sValidator('json', UpdateOrganizationSpendLimitBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/organization/spend_limit', (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/projects/:project_id/spend_limit',
    sValidator(
      'param',
      v.object({ project_id: v.pipe(v.string(), v.metadata({ examples: ['proj_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/spend_limit',
    sValidator(
      'param',
      v.object({ project_id: v.pipe(v.string(), v.metadata({ examples: ['proj_123'] })) }),
    ),
    sValidator('json', UpdateProjectSpendLimitBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/spend_limit',
    sValidator(
      'param',
      v.object({ project_id: v.pipe(v.string(), v.metadata({ examples: ['proj_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/service_tier_settings',
    sValidator(
      'param',
      v.object({ project_id: v.pipe(v.string(), v.description('The ID of the project')) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_tier_settings',
    sValidator(
      'param',
      v.object({ project_id: v.pipe(v.string(), v.description('The ID of the project')) }),
    ),
    sValidator('json', UpdateProjectServiceTierSettingsBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id/api_keys',
    sValidator(
      'param',
      v.object({
        project_id: v.pipe(v.string(), v.description('The ID of the project.')),
        service_account_id: v.pipe(v.string(), v.description('The ID of the service account.')),
      }),
    ),
    sValidator('json', CreateProjectServiceAccountApiKeyBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
