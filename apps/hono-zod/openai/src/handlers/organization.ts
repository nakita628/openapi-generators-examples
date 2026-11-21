import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
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
        limit: z.coerce
          .number()
          .int()
          .default(20)
          .meta({ description: 'Maximum number of keys to return.' })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/admin_api_keys',
    sValidator(
      'json',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/admin_api_keys/:key_id',
    sValidator(
      'param',
      z.object({ key_id: z.string().meta({ description: 'The ID of the API key.' }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/admin_api_keys/:key_id',
    sValidator(
      'param',
      z.object({
        key_id: z.string().meta({ description: 'The ID of the API key to be deleted.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/audit_logs',
    sValidator(
      'query',
      z.object({
        effective_at: z
          .object({
            gt: z.coerce
              .number()
              .int()
              .meta({
                description:
                  'Return only events whose `effective_at` (Unix seconds) is greater than this value.',
              })
              .exactOptional(),
            gte: z.coerce
              .number()
              .int()
              .meta({
                description:
                  'Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.',
              })
              .exactOptional(),
            lt: z.coerce
              .number()
              .int()
              .meta({
                description:
                  'Return only events whose `effective_at` (Unix seconds) is less than this value.',
              })
              .exactOptional(),
            lte: z.coerce
              .number()
              .int()
              .meta({
                description:
                  'Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.',
              })
              .exactOptional(),
          })
          .exactOptional(),
        'project_ids[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        'event_types[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(AuditLogEventTypeSchema),
          )
          .exactOptional(),
        'actor_ids[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        'actor_emails[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        'resource_ids[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        tenant_only: z.stringbool().default(false).exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/certificates',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
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
    sValidator('param', z.object({ certificate_id: z.string() })),
    sValidator(
      'query',
      z.object({
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('content')),
          )
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/certificates/:certificate_id',
    sValidator('param', z.object({ certificate_id: z.string() })),
    sValidator('json', ModifyCertificateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/certificates/:certificate_id',
    sValidator('param', z.object({ certificate_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/costs',
    sValidator(
      'query',
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.literal('1d').default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        line_items: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'line_item', 'api_key_id', 'api_source'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().default(7).exactOptional(),
        page: z.string().exactOptional(),
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
      z.object({
        limit: z.coerce.number().int().min(0).max(1000).default(100).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/groups', sValidator('json', CreateGroupBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/groups/:group_id',
    sValidator('param', z.object({ group_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups/:group_id',
    sValidator('param', z.object({ group_id: z.string() })),
    sValidator('json', UpdateGroupBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/groups/:group_id',
    sValidator('param', z.object({ group_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/roles',
    sValidator('param', z.object({ group_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(0).max(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups/:group_id/roles',
    sValidator('param', z.object({ group_id: z.string() })),
    sValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/roles/:role_id',
    sValidator('param', z.object({ group_id: z.string(), role_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/groups/:group_id/roles/:role_id',
    sValidator('param', z.object({ group_id: z.string(), role_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/users',
    sValidator('param', z.object({ group_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(0).max(1000).default(100).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups/:group_id/users',
    sValidator('param', z.object({ group_id: z.string() })),
    sValidator('json', CreateGroupUserBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/users/:user_id',
    sValidator('param', z.object({ group_id: z.string(), user_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/groups/:group_id/users/:user_id',
    sValidator('param', z.object({ group_id: z.string(), user_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/invites',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/invites', sValidator('json', InviteRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/invites/:invite_id',
    sValidator('param', z.object({ invite_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/invites/:invite_id',
    sValidator('param', z.object({ invite_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        include_archived: z.stringbool().default(false).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/projects', sValidator('json', ProjectCreateRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/projects/:project_id',
    sValidator('param', z.object({ project_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator('json', ProjectUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/api_keys',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        owner_project_access: z.enum(['active', 'inactive', 'any']).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator('param', z.object({ project_id: z.string(), api_key_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator('param', z.object({ project_id: z.string(), api_key_id: z.string() })),
    sValidator('json', UpdateProjectApiKeyBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator('param', z.object({ project_id: z.string(), api_key_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/archive',
    sValidator('param', z.object({ project_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/certificates',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/certificates/activate',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator('json', ToggleCertificatesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/certificates/deactivate',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator('json', ToggleCertificatesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/data_retention',
    sValidator('param', z.object({ project_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/data_retention',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator('json', UpdateProjectDataRetentionBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/groups',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(0).max(100).default(20).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/groups',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator('json', InviteProjectGroupBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/groups/:group_id',
    sValidator('param', z.object({ project_id: z.string(), group_id: z.string() })),
    sValidator(
      'query',
      z.object({ group_type: z.enum(['group', 'tenant_group']).default('group').exactOptional() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/groups/:group_id',
    sValidator('param', z.object({ project_id: z.string(), group_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/hosted_tool_permissions',
    sValidator('param', z.object({ project_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/hosted_tool_permissions',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator('json', ProjectHostedToolPermissionsUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', z.object({ project_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator('json', ProjectModelPermissionsUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', z.object({ project_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/rate_limits',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(100).exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/rate_limits/:rate_limit_id',
    sValidator('param', z.object({ project_id: z.string(), rate_limit_id: z.string() })),
    sValidator('json', ProjectRateLimitUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/service_accounts',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_accounts',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator('json', ProjectServiceAccountCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator('param', z.object({ project_id: z.string(), service_account_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator('param', z.object({ project_id: z.string(), service_account_id: z.string() })),
    sValidator('json', UpdateProjectServiceAccountBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator('param', z.object({ project_id: z.string(), service_account_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/spend_alerts',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(0).max(100).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/spend_alerts',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator('json', CreateSpendAlertBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator('param', z.object({ project_id: z.string(), alert_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator('param', z.object({ project_id: z.string(), alert_id: z.string() })),
    sValidator('json', CreateSpendAlertBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator('param', z.object({ project_id: z.string(), alert_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/users',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/users',
    sValidator('param', z.object({ project_id: z.string() })),
    sValidator('json', ProjectUserCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/users/:user_id',
    sValidator('param', z.object({ project_id: z.string(), user_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/users/:user_id',
    sValidator('param', z.object({ project_id: z.string(), user_id: z.string() })),
    sValidator('json', ProjectUserUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/users/:user_id',
    sValidator('param', z.object({ project_id: z.string(), user_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/roles',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(0).max(1000).default(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
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
    sValidator('param', z.object({ role_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/roles/:role_id',
    sValidator('param', z.object({ role_id: z.string() })),
    sValidator('json', PublicUpdateOrganizationRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/roles/:role_id',
    sValidator('param', z.object({ role_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/spend_alerts',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(0).max(100).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/spend_alerts', sValidator('json', CreateSpendAlertBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', z.object({ alert_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', z.object({ alert_id: z.string() })),
    sValidator('json', CreateSpendAlertBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', z.object({ alert_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/audio_speeches',
    sValidator(
      'query',
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/audio_transcriptions',
    sValidator(
      'query',
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/code_interpreter_sessions',
    sValidator(
      'query',
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('project_id')),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/completions',
    sValidator(
      'query',
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        batch: z.stringbool().exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(
              z.enum([
                'project_id',
                'user_id',
                'api_key_id',
                'model',
                'batch',
                'service_tier',
                'api_source',
              ]),
            ),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/embeddings',
    sValidator(
      'query',
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/file_search_calls',
    sValidator(
      'query',
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        vector_store_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'vector_store_id'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/images',
    sValidator(
      'query',
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        sources: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['image.generation', 'image.edit', 'image.variation'])),
          )
          .exactOptional(),
        sizes: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['256x256', '512x512', '1024x1024', '1792x1792', '1024x1792'])),
          )
          .exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model', 'size', 'source'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/moderations',
    sValidator(
      'query',
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['project_id', 'user_id', 'api_key_id', 'model'])),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/vector_stores',
    sValidator(
      'query',
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('project_id')),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/web_search_calls',
    sValidator(
      'query',
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z.coerce.number().int().exactOptional(),
        bucket_width: z.enum(['1m', '1h', '1d']).default('1d').exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
        context_levels: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.enum(['low', 'medium', 'high'])),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(
              z.enum([
                'project_id',
                'user_id',
                'api_key_id',
                'model',
                'context_level',
                'api_source',
              ]),
            ),
          )
          .exactOptional(),
        limit: z.coerce.number().int().exactOptional(),
        page: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        after: z.string().exactOptional(),
        emails: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.string()),
          )
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users/:user_id',
    sValidator('param', z.object({ user_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/users/:user_id',
    sValidator('param', z.object({ user_id: z.string() })),
    sValidator('json', UserRoleUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/users/:user_id',
    sValidator('param', z.object({ user_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users/:user_id/roles',
    sValidator('param', z.object({ user_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(0).max(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/users/:user_id/roles',
    sValidator('param', z.object({ user_id: z.string() })),
    sValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users/:user_id/roles/:role_id',
    sValidator('param', z.object({ user_id: z.string(), role_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/users/:user_id/roles/:role_id',
    sValidator('param', z.object({ user_id: z.string(), role_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_keys',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .union([
            z.string(),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
        purpose: ExternalKeyPurposeSchema.exactOptional(),
      }),
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
    sValidator('param', z.object({ external_key_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/external_keys/:external_key_id',
    sValidator('param', z.object({ external_key_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_keys/:external_key_id/validate',
    sValidator('param', z.object({ external_key_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/workload_identity_providers',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        order: z
          .union([z.literal('asc').default('asc'), z.literal('desc').default('desc')])
          .exactOptional(),
        after: z.string().min(1).exactOptional(),
      }),
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
    sValidator('param', z.object({ workload_identity_provider_id: z.string().min(1) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    sValidator('param', z.object({ workload_identity_provider_id: z.string().min(1) })),
    sValidator('json', UpdatePlatformWorkloadIdentityProviderBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    sValidator('param', z.object({ workload_identity_provider_id: z.string().min(1) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    sValidator('param', z.object({ workload_identity_provider_id: z.string().min(1) })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        order: z
          .union([z.literal('asc').default('asc'), z.literal('desc').default('desc')])
          .exactOptional(),
        after: z.string().min(1).exactOptional(),
        service_account_id: z.string().min(1).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    sValidator('param', z.object({ workload_identity_provider_id: z.string().min(1) })),
    sValidator('json', CreatePlatformWorkloadIdentityFederationRuleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    sValidator(
      'param',
      z.object({
        workload_identity_provider_id: z.string().min(1),
        workload_identity_federation_rule_id: z.string().min(1),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    sValidator(
      'param',
      z.object({
        workload_identity_provider_id: z.string().min(1),
        workload_identity_federation_rule_id: z.string().min(1),
      }),
    ),
    sValidator('json', UpdatePlatformWorkloadIdentityFederationRuleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    sValidator(
      'param',
      z.object({
        workload_identity_provider_id: z.string().min(1),
        workload_identity_federation_rule_id: z.string().min(1),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/decisions',
    sValidator(
      'query',
      z.object({
        start_time: z.coerce.number().int(),
        end_time: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.coerce.number().int(),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        bucket_width: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .union([DecisionsUsageBucketWidthSchema])
                  .meta({
                    description:
                      'Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.',
                  }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        limit: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.coerce.number().int(),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        page: z
          .union([
            z
              .string()
              .meta({
                description:
                  'A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.',
              }),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
        project_ids: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .union([
                    z.preprocess(
                      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                      z.array(z.string()),
                    ),
                  ])
                  .meta({ description: 'Return only usage for these projects.' }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        group_by: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .union([
                    z.preprocess(
                      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                      z.array(DecisionsUsageGroupBySchema),
                    ),
                  ])
                  .meta({
                    description:
                      'Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier`, `api_source` or any combination of them. When grouped by `api_source`, results use `agents_api` for attributed Agents API activity and `unlabeled` for all other activity. Without source grouping, `api_source` is null.',
                  }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        user_ids: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .union([
                    z.preprocess(
                      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                      z.array(z.string()),
                    ),
                  ])
                  .meta({ description: 'Return only usage for these users.' }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        api_key_ids: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .union([
                    z.preprocess(
                      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                      z.array(z.string()),
                    ),
                  ])
                  .meta({ description: 'Return only usage for these API keys.' }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        models: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .union([
                    z.preprocess(
                      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                      z.array(z.string()),
                    ),
                  ])
                  .meta({ description: 'Return only usage for these models.' }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
        batch: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z.stringbool(),
                z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
              ])
              .nullable(),
          )
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_storage',
    sValidator(
      'query',
      z.object({
        project_id: z
          .union([
            z.string().meta({ examples: ['proj_123'] }),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
        after: z
          .union([
            z
              .string()
              .meta({ description: 'Return external storage configurations after this ID.' }),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
        order: ExternalStorageOrderSchema.exactOptional(),
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
      }),
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
      z.object({ external_storage_id: z.string().meta({ examples: ['extstorage_123'] }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/external_storage/:external_storage_id',
    sValidator(
      'param',
      z.object({ external_storage_id: z.string().meta({ examples: ['extstorage_123'] }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_storage/:external_storage_id/validate',
    sValidator(
      'param',
      z.object({ external_storage_id: z.string().meta({ examples: ['extstorage_123'] }) }),
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
    sValidator('param', z.object({ project_id: z.string().meta({ examples: ['proj_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/spend_limit',
    sValidator('param', z.object({ project_id: z.string().meta({ examples: ['proj_123'] }) })),
    sValidator('json', UpdateProjectSpendLimitBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/spend_limit',
    sValidator('param', z.object({ project_id: z.string().meta({ examples: ['proj_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/service_tier_settings',
    sValidator(
      'param',
      z.object({ project_id: z.string().meta({ description: 'The ID of the project' }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_tier_settings',
    sValidator(
      'param',
      z.object({ project_id: z.string().meta({ description: 'The ID of the project' }) }),
    ),
    sValidator('json', UpdateProjectServiceTierSettingsBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id/api_keys',
    sValidator(
      'param',
      z.object({
        project_id: z.string().meta({ description: 'The ID of the project.' }),
        service_account_id: z.string().meta({ description: 'The ID of the service account.' }),
      }),
    ),
    sValidator('json', CreateProjectServiceAccountApiKeyBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
