import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
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
    ),
    (c) => {},
  )
  .post(
    '/organization/admin_api_keys',
    sValidator(
      'json',
      type({
        name: 'string',
        'expires_in_seconds?': type('number.integer >= 1 & number.integer <= 31536000').describe(
          'The number of seconds until the API key expires. Omit this field for a key that does not expire.',
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/admin_api_keys/:key_id',
    sValidator('param', type({ key_id: type('string').describe('The ID of the API key.') })),
    (c) => {},
  )
  .delete(
    '/organization/admin_api_keys/:key_id',
    sValidator(
      'param',
      type({ key_id: type('string').describe('The ID of the API key to be deleted.') }),
    ),
    (c) => {},
  )
  .get(
    '/organization/audit_logs',
    sValidator(
      'query',
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
        'after?': 'string',
        'before?': 'string',
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/certificates',
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
  .post('/organization/certificates', sValidator('json', UploadCertificateRequestSchema), (c) => {})
  .post(
    '/organization/certificates/activate',
    sValidator('json', ToggleCertificatesRequestSchema),
    (c) => {},
  )
  .post(
    '/organization/certificates/deactivate',
    sValidator('json', ToggleCertificatesRequestSchema),
    (c) => {},
  )
  .get(
    '/organization/certificates/:certificate_id',
    sValidator('param', type({ certificate_id: 'string' })),
    sValidator(
      'query',
      type({
        'include?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'content'[]"),
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/certificates/:certificate_id',
    sValidator('param', type({ certificate_id: 'string' })),
    sValidator('json', ModifyCertificateRequestSchema),
    (c) => {},
  )
  .delete(
    '/organization/certificates/:certificate_id',
    sValidator('param', type({ certificate_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/costs',
    sValidator(
      'query',
      type({
        start_time: type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'end_time?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'bucket_width?': "'1d'",
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
        'page?': 'string',
      }),
    ),
    (c) => {},
  )
  .get('/organization/data_retention', (c) => {})
  .post(
    '/organization/data_retention',
    sValidator('json', UpdateOrganizationDataRetentionBodySchema),
    (c) => {},
  )
  .get(
    '/organization/groups',
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1000'),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
  .post('/organization/groups', sValidator('json', CreateGroupBodySchema), (c) => {})
  .get(
    '/organization/groups/:group_id',
    sValidator('param', type({ group_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/groups/:group_id',
    sValidator('param', type({ group_id: 'string' })),
    sValidator('json', UpdateGroupBodySchema),
    (c) => {},
  )
  .delete(
    '/organization/groups/:group_id',
    sValidator('param', type({ group_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id/roles',
    sValidator('param', type({ group_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1000'),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/groups/:group_id/roles',
    sValidator('param', type({ group_id: 'string' })),
    sValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id/roles/:role_id',
    sValidator('param', type({ group_id: 'string', role_id: 'string' })),
    (c) => {},
  )
  .delete(
    '/organization/groups/:group_id/roles/:role_id',
    sValidator('param', type({ group_id: 'string', role_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id/users',
    sValidator('param', type({ group_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1000'),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/groups/:group_id/users',
    sValidator('param', type({ group_id: 'string' })),
    sValidator('json', CreateGroupUserBodySchema),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id/users/:user_id',
    sValidator('param', type({ group_id: 'string', user_id: 'string' })),
    (c) => {},
  )
  .delete(
    '/organization/groups/:group_id/users/:user_id',
    sValidator('param', type({ group_id: 'string', user_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/invites',
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'after?': 'string',
      }),
    ),
    (c) => {},
  )
  .post('/organization/invites', sValidator('json', InviteRequestSchema), (c) => {})
  .get(
    '/organization/invites/:invite_id',
    sValidator('param', type({ invite_id: 'string' })),
    (c) => {},
  )
  .delete(
    '/organization/invites/:invite_id',
    sValidator('param', type({ invite_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/projects',
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'after?': 'string',
        'include_archived?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
          (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
      }),
    ),
    (c) => {},
  )
  .post('/organization/projects', sValidator('json', ProjectCreateRequestSchema), (c) => {})
  .get(
    '/organization/projects/:project_id',
    sValidator('param', type({ project_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id',
    sValidator('param', type({ project_id: 'string' })),
    sValidator('json', ProjectUpdateRequestSchema),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/api_keys',
    sValidator('param', type({ project_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'after?': 'string',
        'owner_project_access?': "'active' | 'inactive' | 'any'",
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator('param', type({ project_id: 'string', api_key_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator('param', type({ project_id: 'string', api_key_id: 'string' })),
    sValidator('json', UpdateProjectApiKeyBodySchema),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator('param', type({ project_id: 'string', api_key_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/archive',
    sValidator('param', type({ project_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/certificates',
    sValidator('param', type({ project_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/certificates/activate',
    sValidator('param', type({ project_id: 'string' })),
    sValidator('json', ToggleCertificatesRequestSchema),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/certificates/deactivate',
    sValidator('param', type({ project_id: 'string' })),
    sValidator('json', ToggleCertificatesRequestSchema),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/data_retention',
    sValidator('param', type({ project_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/data_retention',
    sValidator('param', type({ project_id: 'string' })),
    sValidator('json', UpdateProjectDataRetentionBodySchema),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/groups',
    sValidator('param', type({ project_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100'),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/groups',
    sValidator('param', type({ project_id: 'string' })),
    sValidator('json', InviteProjectGroupBodySchema),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/groups/:group_id',
    sValidator('param', type({ project_id: 'string', group_id: 'string' })),
    sValidator('query', type({ 'group_type?': "'group' | 'tenant_group'" })),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/groups/:group_id',
    sValidator('param', type({ project_id: 'string', group_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/hosted_tool_permissions',
    sValidator('param', type({ project_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/hosted_tool_permissions',
    sValidator('param', type({ project_id: 'string' })),
    sValidator('json', ProjectHostedToolPermissionsUpdateRequestSchema),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', type({ project_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', type({ project_id: 'string' })),
    sValidator('json', ProjectModelPermissionsUpdateRequestSchema),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', type({ project_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/rate_limits',
    sValidator('param', type({ project_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'after?': 'string',
        'before?': 'string',
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/rate_limits/:rate_limit_id',
    sValidator('param', type({ project_id: 'string', rate_limit_id: 'string' })),
    sValidator('json', ProjectRateLimitUpdateRequestSchema),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/service_accounts',
    sValidator('param', type({ project_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'after?': 'string',
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/service_accounts',
    sValidator('param', type({ project_id: 'string' })),
    sValidator('json', ProjectServiceAccountCreateRequestSchema),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator('param', type({ project_id: 'string', service_account_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator('param', type({ project_id: 'string', service_account_id: 'string' })),
    sValidator('json', UpdateProjectServiceAccountBodySchema),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator('param', type({ project_id: 'string', service_account_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/spend_alerts',
    sValidator('param', type({ project_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100'),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/spend_alerts',
    sValidator('param', type({ project_id: 'string' })),
    sValidator('json', CreateSpendAlertBodySchema),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator('param', type({ project_id: 'string', alert_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator('param', type({ project_id: 'string', alert_id: 'string' })),
    sValidator('json', CreateSpendAlertBodySchema),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator('param', type({ project_id: 'string', alert_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/users',
    sValidator('param', type({ project_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'after?': 'string',
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/users',
    sValidator('param', type({ project_id: 'string' })),
    sValidator('json', ProjectUserCreateRequestSchema),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/users/:user_id',
    sValidator('param', type({ project_id: 'string', user_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/users/:user_id',
    sValidator('param', type({ project_id: 'string', user_id: 'string' })),
    sValidator('json', ProjectUserUpdateRequestSchema),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/users/:user_id',
    sValidator('param', type({ project_id: 'string', user_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/roles',
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1000'),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/roles',
    sValidator('json', PublicCreateOrganizationRoleBodySchema),
    (c) => {},
  )
  .get('/organization/roles/:role_id', sValidator('param', type({ role_id: 'string' })), (c) => {})
  .post(
    '/organization/roles/:role_id',
    sValidator('param', type({ role_id: 'string' })),
    sValidator('json', PublicUpdateOrganizationRoleBodySchema),
    (c) => {},
  )
  .delete(
    '/organization/roles/:role_id',
    sValidator('param', type({ role_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/spend_alerts',
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100'),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
      }),
    ),
    (c) => {},
  )
  .post('/organization/spend_alerts', sValidator('json', CreateSpendAlertBodySchema), (c) => {})
  .get(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', type({ alert_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', type({ alert_id: 'string' })),
    sValidator('json', CreateSpendAlertBodySchema),
    (c) => {},
  )
  .delete(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', type({ alert_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/usage/audio_speeches',
    sValidator(
      'query',
      type({
        start_time: type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'end_time?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'bucket_width?': "'1m' | '1h' | '1d'",
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
        'page?': 'string',
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/audio_transcriptions',
    sValidator(
      'query',
      type({
        start_time: type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'end_time?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'bucket_width?': "'1m' | '1h' | '1d'",
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
        'page?': 'string',
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/code_interpreter_sessions',
    sValidator(
      'query',
      type({
        start_time: type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'end_time?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'bucket_width?': "'1m' | '1h' | '1d'",
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
        'page?': 'string',
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/completions',
    sValidator(
      'query',
      type({
        start_time: type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'end_time?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'bucket_width?': "'1m' | '1h' | '1d'",
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
        'page?': 'string',
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/embeddings',
    sValidator(
      'query',
      type({
        start_time: type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'end_time?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'bucket_width?': "'1m' | '1h' | '1d'",
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
        'page?': 'string',
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/file_search_calls',
    sValidator(
      'query',
      type({
        start_time: type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'end_time?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'bucket_width?': "'1m' | '1h' | '1d'",
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
        'page?': 'string',
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/images',
    sValidator(
      'query',
      type({
        start_time: type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'end_time?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'bucket_width?': "'1m' | '1h' | '1d'",
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
        'page?': 'string',
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/moderations',
    sValidator(
      'query',
      type({
        start_time: type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'end_time?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'bucket_width?': "'1m' | '1h' | '1d'",
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
        'page?': 'string',
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/vector_stores',
    sValidator(
      'query',
      type({
        start_time: type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'end_time?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'bucket_width?': "'1m' | '1h' | '1d'",
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
        'page?': 'string',
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/web_search_calls',
    sValidator(
      'query',
      type({
        start_time: type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'end_time?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'bucket_width?': "'1m' | '1h' | '1d'",
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
          .to(
            "'project_id' | 'user_id' | 'api_key_id' | 'model' | 'context_level' | 'api_source'[]",
          ),
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'page?': 'string',
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/users',
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'after?': 'string',
        'emails?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]'),
      }),
    ),
    (c) => {},
  )
  .get('/organization/users/:user_id', sValidator('param', type({ user_id: 'string' })), (c) => {})
  .post(
    '/organization/users/:user_id',
    sValidator('param', type({ user_id: 'string' })),
    sValidator('json', UserRoleUpdateRequestSchema),
    (c) => {},
  )
  .delete(
    '/organization/users/:user_id',
    sValidator('param', type({ user_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/users/:user_id/roles',
    sValidator('param', type({ user_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1000'),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/users/:user_id/roles',
    sValidator('param', type({ user_id: 'string' })),
    sValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => {},
  )
  .get(
    '/organization/users/:user_id/roles/:role_id',
    sValidator('param', type({ user_id: 'string', role_id: 'string' })),
    (c) => {},
  )
  .delete(
    '/organization/users/:user_id/roles/:role_id',
    sValidator('param', type({ user_id: 'string', role_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/external_keys',
    sValidator(
      'query',
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
    ),
    (c) => {},
  )
  .post(
    '/organization/external_keys',
    sValidator('json', V1OrganizationExternalKeysPostRequestSchema),
    (c) => {},
  )
  .get(
    '/organization/external_keys/:external_key_id',
    sValidator('param', type({ external_key_id: 'string' })),
    (c) => {},
  )
  .delete(
    '/organization/external_keys/:external_key_id',
    sValidator('param', type({ external_key_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/external_keys/:external_key_id/validate',
    sValidator('param', type({ external_key_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/workload_identity_providers',
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'order?': "'asc' | 'desc'",
        'after?': type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/workload_identity_providers',
    sValidator('json', CreatePlatformWorkloadIdentityProviderBodySchema),
    (c) => {},
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    sValidator(
      'param',
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    sValidator(
      'param',
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    ),
    sValidator('json', UpdatePlatformWorkloadIdentityProviderBodySchema),
    (c) => {},
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    sValidator(
      'param',
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    sValidator(
      'param',
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    ),
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'order?': "'asc' | 'desc'",
        'after?': type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        'service_account_id?': type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    sValidator(
      'param',
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    ),
    sValidator('json', CreatePlatformWorkloadIdentityFederationRuleBodySchema),
    (c) => {},
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    sValidator(
      'param',
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        workload_identity_federation_rule_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    sValidator(
      'param',
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        workload_identity_federation_rule_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    ),
    sValidator('json', UpdatePlatformWorkloadIdentityFederationRuleBodySchema),
    (c) => {},
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    sValidator(
      'param',
      type({
        workload_identity_provider_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
        workload_identity_federation_rule_id: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/decisions',
    sValidator(
      'query',
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
    ),
    (c) => {},
  )
  .get(
    '/organization/external_storage',
    sValidator(
      'query',
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
    ),
    (c) => {},
  )
  .post(
    '/organization/external_storage',
    sValidator('json', CreateExternalStorageBodySchema),
    (c) => {},
  )
  .get(
    '/organization/external_storage/:external_storage_id',
    sValidator('param', type({ external_storage_id: 'string' })),
    (c) => {},
  )
  .delete(
    '/organization/external_storage/:external_storage_id',
    sValidator('param', type({ external_storage_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/external_storage/:external_storage_id/validate',
    sValidator('param', type({ external_storage_id: 'string' })),
    (c) => {},
  )
  .get('/organization/spend_limit', (c) => {})
  .post(
    '/organization/spend_limit',
    sValidator('json', UpdateOrganizationSpendLimitBodySchema),
    (c) => {},
  )
  .delete('/organization/spend_limit', (c) => {})
  .get(
    '/organization/projects/:project_id/spend_limit',
    sValidator('param', type({ project_id: 'string' })),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/spend_limit',
    sValidator('param', type({ project_id: 'string' })),
    sValidator('json', UpdateProjectSpendLimitBodySchema),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/spend_limit',
    sValidator('param', type({ project_id: 'string' })),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/service_tier_settings',
    sValidator('param', type({ project_id: type('string').describe('The ID of the project') })),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/service_tier_settings',
    sValidator('param', type({ project_id: type('string').describe('The ID of the project') })),
    sValidator('json', UpdateProjectServiceTierSettingsBodySchema),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id/api_keys',
    sValidator(
      'param',
      type({
        project_id: type('string').describe('The ID of the project.'),
        service_account_id: type('string').describe('The ID of the service account.'),
      }),
    ),
    sValidator('json', CreateProjectServiceAccountApiKeyBodySchema),
    (c) => {},
  )
