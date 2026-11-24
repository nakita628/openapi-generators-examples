import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
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
    tbValidator(
      'query',
      Type.Object({
        after: Type.Optional(
          Type.Union([
            Type.String({
              description: 'Return keys with IDs that come after this ID in the pagination order.',
            }),
            Type.Null(),
          ]),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], {
            description: 'Order results by creation time, ascending or descending.',
            default: 'asc',
          }),
        ),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/admin_api_keys',
    tbValidator(
      'json',
      Type.Object({
        name: Type.String({ examples: ['New Admin Key'] }),
        expires_in_seconds: Type.Optional(
          Type.Integer({
            minimum: 1,
            maximum: 31536000,
            description:
              'The number of seconds until the API key expires. Omit this field for a key that does not expire.',
            examples: [2592000],
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/admin_api_keys/:key_id',
    tbValidator(
      'param',
      Type.Object({ key_id: Type.String({ description: 'The ID of the API key.' }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/admin_api_keys/:key_id',
    tbValidator(
      'param',
      Type.Object({ key_id: Type.String({ description: 'The ID of the API key to be deleted.' }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/audit_logs',
    tbValidator(
      'query',
      Type.Object({
        effective_at: Type.Optional(
          Type.Object({
            gt: Type.Optional(
              Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
                .Decode((value) => Number(value))
                .Encode((value) => String(value)),
            ),
            gte: Type.Optional(
              Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
                .Decode((value) => Number(value))
                .Encode((value) => String(value)),
            ),
            lt: Type.Optional(
              Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
                .Decode((value) => Number(value))
                .Encode((value) => String(value)),
            ),
            lte: Type.Optional(
              Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
                .Decode((value) => Number(value))
                .Encode((value) => String(value)),
            ),
          }),
        ),
        'project_ids[]': Type.Optional(Type.Array(Type.String())),
        'event_types[]': Type.Optional(Type.Array(AuditLogEventTypeSchema)),
        'actor_ids[]': Type.Optional(Type.Array(Type.String())),
        'actor_emails[]': Type.Optional(Type.Array(Type.String())),
        'resource_ids[]': Type.Optional(Type.Array(Type.String())),
        tenant_only: Type.Optional(
          Codec(
            Type.String({
              pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
              default: 'false',
            }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        before: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/certificates',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/certificates',
    tbValidator('json', UploadCertificateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/certificates/activate',
    tbValidator('json', ToggleCertificatesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/certificates/deactivate',
    tbValidator('json', ToggleCertificatesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/certificates/:certificate_id',
    tbValidator('param', Type.Object({ certificate_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({ include: Type.Optional(Type.Array(Type.Literal('content'))) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/certificates/:certificate_id',
    tbValidator('param', Type.Object({ certificate_id: Type.String() })),
    tbValidator('json', ModifyCertificateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/certificates/:certificate_id',
    tbValidator('param', Type.Object({ certificate_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/costs',
    tbValidator(
      'query',
      Type.Object({
        start_time: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        end_time: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        bucket_width: Type.Optional(Type.Literal('1d', { default: '1d' })),
        project_ids: Type.Optional(Type.Array(Type.String())),
        api_key_ids: Type.Optional(Type.Array(Type.String())),
        line_items: Type.Optional(Type.Array(Type.String())),
        group_by: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal('project_id'),
              Type.Literal('user_id'),
              Type.Literal('line_item'),
              Type.Literal('api_key_id'),
              Type.Literal('api_source'),
            ]),
          ),
        ),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '7' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        page: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/organization/data_retention', (c) => { throw new Error('Not implemented') })
  .post(
    '/organization/data_retention',
    tbValidator('json', UpdateOrganizationDataRetentionBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '100' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'asc' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/groups', tbValidator('json', CreateGroupBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/groups/:group_id',
    tbValidator('param', Type.Object({ group_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups/:group_id',
    tbValidator('param', Type.Object({ group_id: Type.String() })),
    tbValidator('json', UpdateGroupBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/groups/:group_id',
    tbValidator('param', Type.Object({ group_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/roles',
    tbValidator('param', Type.Object({ group_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        order: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups/:group_id/roles',
    tbValidator('param', Type.Object({ group_id: Type.String() })),
    tbValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/roles/:role_id',
    tbValidator('param', Type.Object({ group_id: Type.String(), role_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/groups/:group_id/roles/:role_id',
    tbValidator('param', Type.Object({ group_id: Type.String(), role_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/users',
    tbValidator('param', Type.Object({ group_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '100' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups/:group_id/users',
    tbValidator('param', Type.Object({ group_id: Type.String() })),
    tbValidator('json', CreateGroupUserBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/users/:user_id',
    tbValidator('param', Type.Object({ group_id: Type.String(), user_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/groups/:group_id/users/:user_id',
    tbValidator('param', Type.Object({ group_id: Type.String(), user_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/invites',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/invites', tbValidator('json', InviteRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/invites/:invite_id',
    tbValidator('param', Type.Object({ invite_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/invites/:invite_id',
    tbValidator('param', Type.Object({ invite_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        include_archived: Type.Optional(
          Codec(
            Type.String({
              pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
              default: 'false',
            }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/projects', tbValidator('json', ProjectCreateRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/projects/:project_id',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator('json', ProjectUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/api_keys',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        owner_project_access: Type.Optional(
          Type.Union([Type.Literal('active'), Type.Literal('inactive'), Type.Literal('any')]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), api_key_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), api_key_id: Type.String() })),
    tbValidator('json', UpdateProjectApiKeyBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), api_key_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/archive',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/certificates',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/certificates/activate',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator('json', ToggleCertificatesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/certificates/deactivate',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator('json', ToggleCertificatesRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/data_retention',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/data_retention',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator('json', UpdateProjectDataRetentionBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/groups',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'asc' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/groups',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator('json', InviteProjectGroupBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/groups/:group_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), group_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        group_type: Type.Optional(
          Type.Union([Type.Literal('group'), Type.Literal('tenant_group')], { default: 'group' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/groups/:group_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), group_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/hosted_tool_permissions',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/hosted_tool_permissions',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator('json', ProjectHostedToolPermissionsUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/model_permissions',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/model_permissions',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator('json', ProjectModelPermissionsUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/model_permissions',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/rate_limits',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '100' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        before: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/rate_limits/:rate_limit_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), rate_limit_id: Type.String() })),
    tbValidator('json', ProjectRateLimitUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/service_accounts',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_accounts',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator('json', ProjectServiceAccountCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    tbValidator(
      'param',
      Type.Object({ project_id: Type.String(), service_account_id: Type.String() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    tbValidator(
      'param',
      Type.Object({ project_id: Type.String(), service_account_id: Type.String() }),
    ),
    tbValidator('json', UpdateProjectServiceAccountBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    tbValidator(
      'param',
      Type.Object({ project_id: Type.String(), service_account_id: Type.String() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/spend_alerts',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'asc' }),
        ),
        after: Type.Optional(Type.String()),
        before: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/spend_alerts',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator('json', CreateSpendAlertBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), alert_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), alert_id: Type.String() })),
    tbValidator('json', CreateSpendAlertBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), alert_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/users',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/users',
    tbValidator('param', Type.Object({ project_id: Type.String() })),
    tbValidator('json', ProjectUserCreateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/users/:user_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), user_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/users/:user_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), user_id: Type.String() })),
    tbValidator('json', ProjectUserUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/users/:user_id',
    tbValidator('param', Type.Object({ project_id: Type.String(), user_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/roles',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '1000' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'asc' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/roles',
    tbValidator('json', PublicCreateOrganizationRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/roles/:role_id',
    tbValidator('param', Type.Object({ role_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/roles/:role_id',
    tbValidator('param', Type.Object({ role_id: Type.String() })),
    tbValidator('json', PublicUpdateOrganizationRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/roles/:role_id',
    tbValidator('param', Type.Object({ role_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/spend_alerts',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'asc' }),
        ),
        after: Type.Optional(Type.String()),
        before: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/organization/spend_alerts', tbValidator('json', CreateSpendAlertBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/spend_alerts/:alert_id',
    tbValidator('param', Type.Object({ alert_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/spend_alerts/:alert_id',
    tbValidator('param', Type.Object({ alert_id: Type.String() })),
    tbValidator('json', CreateSpendAlertBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/spend_alerts/:alert_id',
    tbValidator('param', Type.Object({ alert_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/audio_speeches',
    tbValidator(
      'query',
      Type.Object({
        start_time: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        end_time: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        bucket_width: Type.Optional(
          Type.Union([Type.Literal('1m'), Type.Literal('1h'), Type.Literal('1d')], {
            default: '1d',
          }),
        ),
        project_ids: Type.Optional(Type.Array(Type.String())),
        user_ids: Type.Optional(Type.Array(Type.String())),
        api_key_ids: Type.Optional(Type.Array(Type.String())),
        models: Type.Optional(Type.Array(Type.String())),
        group_by: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal('project_id'),
              Type.Literal('user_id'),
              Type.Literal('api_key_id'),
              Type.Literal('model'),
            ]),
          ),
        ),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        page: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/audio_transcriptions',
    tbValidator(
      'query',
      Type.Object({
        start_time: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        end_time: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        bucket_width: Type.Optional(
          Type.Union([Type.Literal('1m'), Type.Literal('1h'), Type.Literal('1d')], {
            default: '1d',
          }),
        ),
        project_ids: Type.Optional(Type.Array(Type.String())),
        user_ids: Type.Optional(Type.Array(Type.String())),
        api_key_ids: Type.Optional(Type.Array(Type.String())),
        models: Type.Optional(Type.Array(Type.String())),
        group_by: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal('project_id'),
              Type.Literal('user_id'),
              Type.Literal('api_key_id'),
              Type.Literal('model'),
            ]),
          ),
        ),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        page: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/code_interpreter_sessions',
    tbValidator(
      'query',
      Type.Object({
        start_time: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        end_time: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        bucket_width: Type.Optional(
          Type.Union([Type.Literal('1m'), Type.Literal('1h'), Type.Literal('1d')], {
            default: '1d',
          }),
        ),
        project_ids: Type.Optional(Type.Array(Type.String())),
        group_by: Type.Optional(Type.Array(Type.Literal('project_id'))),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        page: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/completions',
    tbValidator(
      'query',
      Type.Object({
        start_time: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        end_time: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        bucket_width: Type.Optional(
          Type.Union([Type.Literal('1m'), Type.Literal('1h'), Type.Literal('1d')], {
            default: '1d',
          }),
        ),
        project_ids: Type.Optional(Type.Array(Type.String())),
        user_ids: Type.Optional(Type.Array(Type.String())),
        api_key_ids: Type.Optional(Type.Array(Type.String())),
        models: Type.Optional(Type.Array(Type.String())),
        batch: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        group_by: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal('project_id'),
              Type.Literal('user_id'),
              Type.Literal('api_key_id'),
              Type.Literal('model'),
              Type.Literal('batch'),
              Type.Literal('service_tier'),
              Type.Literal('api_source'),
            ]),
          ),
        ),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        page: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/embeddings',
    tbValidator(
      'query',
      Type.Object({
        start_time: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        end_time: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        bucket_width: Type.Optional(
          Type.Union([Type.Literal('1m'), Type.Literal('1h'), Type.Literal('1d')], {
            default: '1d',
          }),
        ),
        project_ids: Type.Optional(Type.Array(Type.String())),
        user_ids: Type.Optional(Type.Array(Type.String())),
        api_key_ids: Type.Optional(Type.Array(Type.String())),
        models: Type.Optional(Type.Array(Type.String())),
        group_by: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal('project_id'),
              Type.Literal('user_id'),
              Type.Literal('api_key_id'),
              Type.Literal('model'),
            ]),
          ),
        ),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        page: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/file_search_calls',
    tbValidator(
      'query',
      Type.Object({
        start_time: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        end_time: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        bucket_width: Type.Optional(
          Type.Union([Type.Literal('1m'), Type.Literal('1h'), Type.Literal('1d')], {
            default: '1d',
          }),
        ),
        project_ids: Type.Optional(Type.Array(Type.String())),
        user_ids: Type.Optional(Type.Array(Type.String())),
        api_key_ids: Type.Optional(Type.Array(Type.String())),
        vector_store_ids: Type.Optional(Type.Array(Type.String())),
        group_by: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal('project_id'),
              Type.Literal('user_id'),
              Type.Literal('api_key_id'),
              Type.Literal('vector_store_id'),
            ]),
          ),
        ),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        page: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/images',
    tbValidator(
      'query',
      Type.Object({
        start_time: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        end_time: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        bucket_width: Type.Optional(
          Type.Union([Type.Literal('1m'), Type.Literal('1h'), Type.Literal('1d')], {
            default: '1d',
          }),
        ),
        sources: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal('image.generation'),
              Type.Literal('image.edit'),
              Type.Literal('image.variation'),
            ]),
          ),
        ),
        sizes: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal('256x256'),
              Type.Literal('512x512'),
              Type.Literal('1024x1024'),
              Type.Literal('1792x1792'),
              Type.Literal('1024x1792'),
            ]),
          ),
        ),
        project_ids: Type.Optional(Type.Array(Type.String())),
        user_ids: Type.Optional(Type.Array(Type.String())),
        api_key_ids: Type.Optional(Type.Array(Type.String())),
        models: Type.Optional(Type.Array(Type.String())),
        group_by: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal('project_id'),
              Type.Literal('user_id'),
              Type.Literal('api_key_id'),
              Type.Literal('model'),
              Type.Literal('size'),
              Type.Literal('source'),
            ]),
          ),
        ),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        page: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/moderations',
    tbValidator(
      'query',
      Type.Object({
        start_time: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        end_time: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        bucket_width: Type.Optional(
          Type.Union([Type.Literal('1m'), Type.Literal('1h'), Type.Literal('1d')], {
            default: '1d',
          }),
        ),
        project_ids: Type.Optional(Type.Array(Type.String())),
        user_ids: Type.Optional(Type.Array(Type.String())),
        api_key_ids: Type.Optional(Type.Array(Type.String())),
        models: Type.Optional(Type.Array(Type.String())),
        group_by: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal('project_id'),
              Type.Literal('user_id'),
              Type.Literal('api_key_id'),
              Type.Literal('model'),
            ]),
          ),
        ),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        page: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/vector_stores',
    tbValidator(
      'query',
      Type.Object({
        start_time: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        end_time: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        bucket_width: Type.Optional(
          Type.Union([Type.Literal('1m'), Type.Literal('1h'), Type.Literal('1d')], {
            default: '1d',
          }),
        ),
        project_ids: Type.Optional(Type.Array(Type.String())),
        group_by: Type.Optional(Type.Array(Type.Literal('project_id'))),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        page: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/web_search_calls',
    tbValidator(
      'query',
      Type.Object({
        start_time: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        end_time: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        bucket_width: Type.Optional(
          Type.Union([Type.Literal('1m'), Type.Literal('1h'), Type.Literal('1d')], {
            default: '1d',
          }),
        ),
        project_ids: Type.Optional(Type.Array(Type.String())),
        user_ids: Type.Optional(Type.Array(Type.String())),
        api_key_ids: Type.Optional(Type.Array(Type.String())),
        models: Type.Optional(Type.Array(Type.String())),
        context_levels: Type.Optional(
          Type.Array(
            Type.Union([Type.Literal('low'), Type.Literal('medium'), Type.Literal('high')]),
          ),
        ),
        group_by: Type.Optional(
          Type.Array(
            Type.Union([
              Type.Literal('project_id'),
              Type.Literal('user_id'),
              Type.Literal('api_key_id'),
              Type.Literal('model'),
              Type.Literal('context_level'),
              Type.Literal('api_source'),
            ]),
          ),
        ),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        page: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        emails: Type.Optional(Type.Array(Type.String())),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users/:user_id',
    tbValidator('param', Type.Object({ user_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/users/:user_id',
    tbValidator('param', Type.Object({ user_id: Type.String() })),
    tbValidator('json', UserRoleUpdateRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/users/:user_id',
    tbValidator('param', Type.Object({ user_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users/:user_id/roles',
    tbValidator('param', Type.Object({ user_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 1000,
              () => 'must be <= 1000',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.String()),
        order: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/users/:user_id/roles',
    tbValidator('param', Type.Object({ user_id: Type.String() })),
    tbValidator('json', PublicAssignOrganizationGroupRoleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users/:user_id/roles/:role_id',
    tbValidator('param', Type.Object({ user_id: Type.String(), role_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/users/:user_id/roles/:role_id',
    tbValidator('param', Type.Object({ user_id: Type.String(), role_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_keys',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(OrderEnumSchema),
        after: Type.Optional(Type.Union([Type.String(), Type.Null()])),
        purpose: Type.Optional(ExternalKeyPurposeSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_keys',
    tbValidator('json', V1OrganizationExternalKeysPostRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_keys/:external_key_id',
    tbValidator('param', Type.Object({ external_key_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/external_keys/:external_key_id',
    tbValidator('param', Type.Object({ external_key_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_keys/:external_key_id/validate',
    tbValidator('param', Type.Object({ external_key_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/workload_identity_providers',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([
            Type.Optional(Type.Literal('asc', { default: 'asc' })),
            Type.Optional(Type.Literal('desc', { default: 'desc' })),
          ]),
        ),
        after: Type.Optional(Type.String({ minLength: 1 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/workload_identity_providers',
    tbValidator('json', CreatePlatformWorkloadIdentityProviderBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    tbValidator(
      'param',
      Type.Object({ workload_identity_provider_id: Type.String({ minLength: 1 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    tbValidator(
      'param',
      Type.Object({ workload_identity_provider_id: Type.String({ minLength: 1 }) }),
    ),
    tbValidator('json', UpdatePlatformWorkloadIdentityProviderBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    tbValidator(
      'param',
      Type.Object({ workload_identity_provider_id: Type.String({ minLength: 1 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    tbValidator(
      'param',
      Type.Object({ workload_identity_provider_id: Type.String({ minLength: 1 }) }),
    ),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([
            Type.Optional(Type.Literal('asc', { default: 'asc' })),
            Type.Optional(Type.Literal('desc', { default: 'desc' })),
          ]),
        ),
        after: Type.Optional(Type.String({ minLength: 1 })),
        service_account_id: Type.Optional(Type.String({ minLength: 1 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    tbValidator(
      'param',
      Type.Object({ workload_identity_provider_id: Type.String({ minLength: 1 }) }),
    ),
    tbValidator('json', CreatePlatformWorkloadIdentityFederationRuleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    tbValidator(
      'param',
      Type.Object({
        workload_identity_provider_id: Type.String({ minLength: 1 }),
        workload_identity_federation_rule_id: Type.String({ minLength: 1 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    tbValidator(
      'param',
      Type.Object({
        workload_identity_provider_id: Type.String({ minLength: 1 }),
        workload_identity_federation_rule_id: Type.String({ minLength: 1 }),
      }),
    ),
    tbValidator('json', UpdatePlatformWorkloadIdentityFederationRuleBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    tbValidator(
      'param',
      Type.Object({
        workload_identity_provider_id: Type.String({ minLength: 1 }),
        workload_identity_federation_rule_id: Type.String({ minLength: 1 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/decisions',
    tbValidator(
      'query',
      Type.Object({
        start_time: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
        end_time: Type.Optional(
          Type.Union([
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
            Type.Null(),
          ]),
        ),
        bucket_width: Type.Optional(
          Type.Union([
            Type.Union([DecisionsUsageBucketWidthSchema], {
              description:
                'Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.',
            }),
            Type.Null(),
          ]),
        ),
        limit: Type.Optional(
          Type.Union([
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
            Type.Null(),
          ]),
        ),
        page: Type.Optional(
          Type.Union([
            Type.String({
              description:
                'A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.',
            }),
            Type.Null(),
          ]),
        ),
        project_ids: Type.Optional(
          Type.Union([
            Type.Union([Type.Array(Type.String())], {
              description: 'Return only usage for these projects.',
            }),
            Type.Null(),
          ]),
        ),
        group_by: Type.Optional(
          Type.Union([
            Type.Union([Type.Array(DecisionsUsageGroupBySchema)], {
              description:
                'Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier`, `api_source` or any combination of them. When grouped by `api_source`, results use `agents_api` for attributed Agents API activity and `unlabeled` for all other activity. Without source grouping, `api_source` is null.',
            }),
            Type.Null(),
          ]),
        ),
        user_ids: Type.Optional(
          Type.Union([
            Type.Union([Type.Array(Type.String())], {
              description: 'Return only usage for these users.',
            }),
            Type.Null(),
          ]),
        ),
        api_key_ids: Type.Optional(
          Type.Union([
            Type.Union([Type.Array(Type.String())], {
              description: 'Return only usage for these API keys.',
            }),
            Type.Null(),
          ]),
        ),
        models: Type.Optional(
          Type.Union([
            Type.Union([Type.Array(Type.String())], {
              description: 'Return only usage for these models.',
            }),
            Type.Null(),
          ]),
        ),
        batch: Type.Optional(
          Type.Union([
            Codec(
              Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
            )
              .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
              .Encode((value) => (value ? 'true' : 'false')),
            Type.Null(),
          ]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_storage',
    tbValidator(
      'query',
      Type.Object({
        project_id: Type.Optional(
          Type.Union([Type.String({ examples: ['proj_123'] }), Type.Null()]),
        ),
        after: Type.Optional(
          Type.Union([
            Type.String({ description: 'Return external storage configurations after this ID.' }),
            Type.Null(),
          ]),
        ),
        order: Type.Optional(ExternalStorageOrderSchema),
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_storage',
    tbValidator('json', CreateExternalStorageBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_storage/:external_storage_id',
    tbValidator(
      'param',
      Type.Object({ external_storage_id: Type.String({ examples: ['extstorage_123'] }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/external_storage/:external_storage_id',
    tbValidator(
      'param',
      Type.Object({ external_storage_id: Type.String({ examples: ['extstorage_123'] }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_storage/:external_storage_id/validate',
    tbValidator(
      'param',
      Type.Object({ external_storage_id: Type.String({ examples: ['extstorage_123'] }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/organization/spend_limit', (c) => { throw new Error('Not implemented') })
  .post(
    '/organization/spend_limit',
    tbValidator('json', UpdateOrganizationSpendLimitBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/organization/spend_limit', (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/projects/:project_id/spend_limit',
    tbValidator('param', Type.Object({ project_id: Type.String({ examples: ['proj_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/spend_limit',
    tbValidator('param', Type.Object({ project_id: Type.String({ examples: ['proj_123'] }) })),
    tbValidator('json', UpdateProjectSpendLimitBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/spend_limit',
    tbValidator('param', Type.Object({ project_id: Type.String({ examples: ['proj_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/service_tier_settings',
    tbValidator(
      'param',
      Type.Object({ project_id: Type.String({ description: 'The ID of the project' }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_tier_settings',
    tbValidator(
      'param',
      Type.Object({ project_id: Type.String({ description: 'The ID of the project' }) }),
    ),
    tbValidator('json', UpdateProjectServiceTierSettingsBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id/api_keys',
    tbValidator(
      'param',
      Type.Object({
        project_id: Type.String({ description: 'The ID of the project.' }),
        service_account_id: Type.String({ description: 'The ID of the service account.' }),
      }),
    ),
    tbValidator('json', CreateProjectServiceAccountApiKeyBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
