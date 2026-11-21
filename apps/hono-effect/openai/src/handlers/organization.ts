import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optional(
            Schema.NullOr(Schema.String).annotate({
              description: 'Return keys with IDs that come after this ID in the pagination order.',
            }),
          ),
          order: Schema.Literals(['asc', 'desc'])
            .pipe(Schema.withDecodingDefaultType(Effect.succeed('asc')))
            .annotate({ description: 'Order results by creation time, ascending or descending.' }),
          limit: Schema.FiniteFromString.check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({ description: 'Maximum number of keys to return.' }),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/admin_api_keys',
    sValidator(
      'json',
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
    ),
    (c) => {},
  )
  .get(
    '/organization/admin_api_keys/:key_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          key_id: Schema.String.annotate({ description: 'The ID of the API key.' }),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/organization/admin_api_keys/:key_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          key_id: Schema.String.annotate({ description: 'The ID of the API key to be deleted.' }),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/audit_logs',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          effective_at: Schema.optional(
            Schema.Struct({
              gt: Schema.optional(
                Schema.FiniteFromString.check(Schema.isInt()).annotate({
                  description:
                    'Return only events whose `effective_at` (Unix seconds) is greater than this value.',
                }),
              ),
              gte: Schema.optional(
                Schema.FiniteFromString.check(Schema.isInt()).annotate({
                  description:
                    'Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.',
                }),
              ),
              lt: Schema.optional(
                Schema.FiniteFromString.check(Schema.isInt()).annotate({
                  description:
                    'Return only events whose `effective_at` (Unix seconds) is less than this value.',
                }),
              ),
              lte: Schema.optional(
                Schema.FiniteFromString.check(Schema.isInt()).annotate({
                  description:
                    'Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.',
                }),
              ),
            }),
          ),
          'project_ids[]': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          'event_types[]': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(AuditLogEventTypeSchema)),
            ),
          ),
          'actor_ids[]': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          'actor_emails[]': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          'resource_ids[]': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          tenant_only: Schema.String.check(
            Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          )
            .pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(false))),
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/certificates',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/certificates',
    sValidator('json', Schema.toStandardSchemaV1(UploadCertificateRequestSchema)),
    (c) => {},
  )
  .post(
    '/organization/certificates/activate',
    sValidator('json', Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema)),
    (c) => {},
  )
  .post(
    '/organization/certificates/deactivate',
    sValidator('json', Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/certificates/:certificate_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ certificate_id: Schema.String })),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          include: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.Literal('content'))),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/certificates/:certificate_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ certificate_id: Schema.String })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ModifyCertificateRequestSchema)),
    (c) => {},
  )
  .delete(
    '/organization/certificates/:certificate_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ certificate_id: Schema.String })),
    ),
    (c) => {},
  )
  .get(
    '/organization/costs',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.FiniteFromString.check(Schema.isInt()),
          end_time: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          bucket_width: Schema.Literal('1d').pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          api_key_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          line_items: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          group_by: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Literals([
                    'project_id',
                    'user_id',
                    'line_item',
                    'api_key_id',
                    'api_source',
                  ]),
                ),
              ),
            ),
          ),
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(7)),
          ),
          page: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .get('/organization/data_retention', (c) => {})
  .post(
    '/organization/data_retention',
    sValidator('json', Schema.toStandardSchemaV1(UpdateOrganizationDataRetentionBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/groups',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
            Schema.isLessThanOrEqualTo(1000),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(100))),
          after: Schema.optional(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/groups',
    sValidator('json', Schema.toStandardSchemaV1(CreateGroupBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/groups/:group_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(UpdateGroupBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/groups/:group_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id/roles',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1000),
            ),
          ),
          after: Schema.optional(Schema.String),
          order: Schema.optional(Schema.Literals(['asc', 'desc'])),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/groups/:group_id/roles',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(PublicAssignOrganizationGroupRoleBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, role_id: Schema.String })),
    ),
    (c) => {},
  )
  .delete(
    '/organization/groups/:group_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, role_id: Schema.String })),
    ),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id/users',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
            Schema.isLessThanOrEqualTo(1000),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(100))),
          after: Schema.optional(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/groups/:group_id/users',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(CreateGroupUserBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id/users/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, user_id: Schema.String })),
    ),
    (c) => {},
  )
  .delete(
    '/organization/groups/:group_id/users/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, user_id: Schema.String })),
    ),
    (c) => {},
  )
  .get(
    '/organization/invites',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/invites',
    sValidator('json', Schema.toStandardSchemaV1(InviteRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/invites/:invite_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ invite_id: Schema.String }))),
    (c) => {},
  )
  .delete(
    '/organization/invites/:invite_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ invite_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/projects',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
          include_archived: Schema.String.check(
            Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          )
            .pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(false))),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects',
    sValidator('json', Schema.toStandardSchemaV1(ProjectCreateRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ProjectUpdateRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/api_keys',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
          owner_project_access: Schema.optional(Schema.Literals(['active', 'inactive', 'any'])),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, api_key_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, api_key_id: Schema.String }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateProjectApiKeyBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, api_key_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/archive',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/certificates',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/certificates/activate',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema)),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/certificates/deactivate',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/data_retention',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/data_retention',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(UpdateProjectDataRetentionBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/groups',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
            Schema.isLessThanOrEqualTo(100),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          after: Schema.optional(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/groups',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(InviteProjectGroupBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/groups/:group_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, group_id: Schema.String }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          group_type: Schema.Literals(['group', 'tenant_group']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('group')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/groups/:group_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, group_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/hosted_tool_permissions',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/hosted_tool_permissions',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ProjectHostedToolPermissionsUpdateRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ProjectModelPermissionsUpdateRequestSchema)),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/rate_limits',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(100)),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/rate_limits/:rate_limit_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, rate_limit_id: Schema.String }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ProjectRateLimitUpdateRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/service_accounts',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/service_accounts',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ProjectServiceAccountCreateRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, service_account_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, service_account_id: Schema.String }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateProjectServiceAccountBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, service_account_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/spend_alerts',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/spend_alerts',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(CreateSpendAlertBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, alert_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, alert_id: Schema.String }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateSpendAlertBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, alert_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/users',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/users',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ProjectUserCreateRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/users/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, user_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/users/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, user_id: Schema.String }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ProjectUserUpdateRequestSchema)),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/users/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, user_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/roles',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
            Schema.isLessThanOrEqualTo(1000),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(1000))),
          after: Schema.optional(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/roles',
    sValidator('json', Schema.toStandardSchemaV1(PublicCreateOrganizationRoleBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/roles/:role_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ role_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/roles/:role_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ role_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(PublicUpdateOrganizationRoleBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/roles/:role_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ role_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/spend_alerts',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/spend_alerts',
    sValidator('json', Schema.toStandardSchemaV1(CreateSpendAlertBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ alert_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ alert_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(CreateSpendAlertBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ alert_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/usage/audio_speeches',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.FiniteFromString.check(Schema.isInt()),
          end_time: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          user_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          api_key_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          models: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          group_by: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(Schema.Literals(['project_id', 'user_id', 'api_key_id', 'model'])),
              ),
            ),
          ),
          limit: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/audio_transcriptions',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.FiniteFromString.check(Schema.isInt()),
          end_time: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          user_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          api_key_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          models: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          group_by: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(Schema.Literals(['project_id', 'user_id', 'api_key_id', 'model'])),
              ),
            ),
          ),
          limit: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/code_interpreter_sessions',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.FiniteFromString.check(Schema.isInt()),
          end_time: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          group_by: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.Literal('project_id'))),
            ),
          ),
          limit: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/completions',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.FiniteFromString.check(Schema.isInt()),
          end_time: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          user_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          api_key_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          models: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          batch: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          group_by: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
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
            ),
          ),
          limit: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/embeddings',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.FiniteFromString.check(Schema.isInt()),
          end_time: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          user_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          api_key_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          models: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          group_by: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(Schema.Literals(['project_id', 'user_id', 'api_key_id', 'model'])),
              ),
            ),
          ),
          limit: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/file_search_calls',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.FiniteFromString.check(Schema.isInt()),
          end_time: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          user_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          api_key_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          vector_store_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          group_by: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Literals(['project_id', 'user_id', 'api_key_id', 'vector_store_id']),
                ),
              ),
            ),
          ),
          limit: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/images',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.FiniteFromString.check(Schema.isInt()),
          end_time: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          sources: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Literals(['image.generation', 'image.edit', 'image.variation']),
                ),
              ),
            ),
          ),
          sizes: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Literals(['256x256', '512x512', '1024x1024', '1792x1792', '1024x1792']),
                ),
              ),
            ),
          ),
          project_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          user_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          api_key_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          models: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          group_by: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Literals([
                    'project_id',
                    'user_id',
                    'api_key_id',
                    'model',
                    'size',
                    'source',
                  ]),
                ),
              ),
            ),
          ),
          limit: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/moderations',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.FiniteFromString.check(Schema.isInt()),
          end_time: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          user_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          api_key_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          models: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          group_by: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(Schema.Literals(['project_id', 'user_id', 'api_key_id', 'model'])),
              ),
            ),
          ),
          limit: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/vector_stores',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.FiniteFromString.check(Schema.isInt()),
          end_time: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          group_by: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.Literal('project_id'))),
            ),
          ),
          limit: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/web_search_calls',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.FiniteFromString.check(Schema.isInt()),
          end_time: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          user_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          api_key_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          models: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
          context_levels: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.Literals(['low', 'medium', 'high']))),
            ),
          ),
          group_by: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
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
            ),
          ),
          limit: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          page: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/users',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          after: Schema.optional(Schema.String),
          emails: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.String)),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/users/:user_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/users/:user_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(UserRoleUpdateRequestSchema)),
    (c) => {},
  )
  .delete(
    '/organization/users/:user_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/users/:user_id/roles',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1000),
            ),
          ),
          after: Schema.optional(Schema.String),
          order: Schema.optional(Schema.Literals(['asc', 'desc'])),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/users/:user_id/roles',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(PublicAssignOrganizationGroupRoleBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/users/:user_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String, role_id: Schema.String })),
    ),
    (c) => {},
  )
  .delete(
    '/organization/users/:user_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String, role_id: Schema.String })),
    ),
    (c) => {},
  )
  .get(
    '/organization/external_keys',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(
            Schema.Union([
              Schema.String,
              Schema.Unknown.pipe(
                Schema.decodeTo(
                  Schema.Unknown,
                  SchemaTransformation.transform<unknown, unknown>({
                    decode: (input) => (input === 'null' ? null : input),
                    encode: (output) => output,
                  }),
                ),
                Schema.decodeTo(Schema.NullOr(Schema.Null)),
              ),
            ]),
          ),
          purpose: Schema.optional(ExternalKeyPurposeSchema),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/external_keys',
    sValidator('json', Schema.toStandardSchemaV1(V1OrganizationExternalKeysPostRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/external_keys/:external_key_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ external_key_id: Schema.String })),
    ),
    (c) => {},
  )
  .delete(
    '/organization/external_keys/:external_key_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ external_key_id: Schema.String })),
    ),
    (c) => {},
  )
  .post(
    '/organization/external_keys/:external_key_id/validate',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ external_key_id: Schema.String })),
    ),
    (c) => {},
  )
  .get(
    '/organization/workload_identity_providers',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.Union([
            Schema.Literal('asc').pipe(Schema.withDecodingDefaultType(Effect.succeed('asc'))),
            Schema.Literal('desc').pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => {},
  )
  .post(
    '/organization/workload_identity_providers',
    sValidator('json', Schema.toStandardSchemaV1(CreatePlatformWorkloadIdentityProviderBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          workload_identity_provider_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          workload_identity_provider_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdatePlatformWorkloadIdentityProviderBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          workload_identity_provider_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          workload_identity_provider_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.Union([
            Schema.Literal('asc').pipe(Schema.withDecodingDefaultType(Effect.succeed('asc'))),
            Schema.Literal('desc').pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => {},
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          workload_identity_provider_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(CreatePlatformWorkloadIdentityFederationRuleBodySchema),
    ),
    (c) => {},
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    sValidator(
      'param',
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
    ),
    (c) => {},
  )
  .post(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    sValidator(
      'param',
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
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(UpdatePlatformWorkloadIdentityFederationRuleBodySchema),
    ),
    (c) => {},
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    sValidator(
      'param',
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
    ),
    (c) => {},
  )
  .get(
    '/organization/usage/decisions',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.FiniteFromString.check(Schema.isInt()),
          end_time: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.Union([
                    Schema.FiniteFromString.check(Schema.isInt()),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.NullOr(Schema.Null)),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          bucket_width: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.Union([
                    Schema.Union([DecisionsUsageBucketWidthSchema]).annotate({
                      description:
                        'Width of each time bucket in response. Currently `1m`, `1h` and `1d` are supported, default to `1d`.',
                    }),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.NullOr(Schema.Null)),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          limit: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.Union([
                    Schema.FiniteFromString.check(Schema.isInt()),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.NullOr(Schema.Null)),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          page: Schema.optional(
            Schema.Union([
              Schema.String.annotate({
                description:
                  'A cursor for use in pagination. Corresponding to the `next_page` field from the previous response.',
              }),
              Schema.Unknown.pipe(
                Schema.decodeTo(
                  Schema.Unknown,
                  SchemaTransformation.transform<unknown, unknown>({
                    decode: (input) => (input === 'null' ? null : input),
                    encode: (output) => output,
                  }),
                ),
                Schema.decodeTo(Schema.NullOr(Schema.Null)),
              ),
            ]),
          ),
          project_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.Union([
                    Schema.Union([
                      Schema.Unknown.pipe(
                        Schema.decodeTo(
                          Schema.Unknown,
                          SchemaTransformation.transform<unknown, unknown>({
                            decode: (input) =>
                              input === undefined || Array.isArray(input) ? input : [input],
                            encode: (output) => output,
                          }),
                        ),
                        Schema.decodeTo(Schema.Array(Schema.String)),
                      ),
                    ]).annotate({ description: 'Return only usage for these projects.' }),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.NullOr(Schema.Null)),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          group_by: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.Union([
                    Schema.Union([
                      Schema.Unknown.pipe(
                        Schema.decodeTo(
                          Schema.Unknown,
                          SchemaTransformation.transform<unknown, unknown>({
                            decode: (input) =>
                              input === undefined || Array.isArray(input) ? input : [input],
                            encode: (output) => output,
                          }),
                        ),
                        Schema.decodeTo(Schema.Array(DecisionsUsageGroupBySchema)),
                      ),
                    ]).annotate({
                      description:
                        'Group the usage data by the specified fields. Support fields include `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier`, `api_source` or any combination of them. When grouped by `api_source`, results use `agents_api` for attributed Agents API activity and `unlabeled` for all other activity. Without source grouping, `api_source` is null.',
                    }),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.NullOr(Schema.Null)),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          user_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.Union([
                    Schema.Union([
                      Schema.Unknown.pipe(
                        Schema.decodeTo(
                          Schema.Unknown,
                          SchemaTransformation.transform<unknown, unknown>({
                            decode: (input) =>
                              input === undefined || Array.isArray(input) ? input : [input],
                            encode: (output) => output,
                          }),
                        ),
                        Schema.decodeTo(Schema.Array(Schema.String)),
                      ),
                    ]).annotate({ description: 'Return only usage for these users.' }),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.NullOr(Schema.Null)),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          api_key_ids: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.Union([
                    Schema.Union([
                      Schema.Unknown.pipe(
                        Schema.decodeTo(
                          Schema.Unknown,
                          SchemaTransformation.transform<unknown, unknown>({
                            decode: (input) =>
                              input === undefined || Array.isArray(input) ? input : [input],
                            encode: (output) => output,
                          }),
                        ),
                        Schema.decodeTo(Schema.Array(Schema.String)),
                      ),
                    ]).annotate({ description: 'Return only usage for these API keys.' }),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.NullOr(Schema.Null)),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          models: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.Union([
                    Schema.Union([
                      Schema.Unknown.pipe(
                        Schema.decodeTo(
                          Schema.Unknown,
                          SchemaTransformation.transform<unknown, unknown>({
                            decode: (input) =>
                              input === undefined || Array.isArray(input) ? input : [input],
                            encode: (output) => output,
                          }),
                        ),
                        Schema.decodeTo(Schema.Array(Schema.String)),
                      ),
                    ]).annotate({ description: 'Return only usage for these models.' }),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.NullOr(Schema.Null)),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          batch: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                    ).pipe(
                      Schema.decodeTo(
                        Schema.Boolean,
                        SchemaTransformation.transform({
                          decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                          encode: (output) => (output ? 'true' : 'false'),
                        }),
                      ),
                    ),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.NullOr(Schema.Null)),
                    ),
                  ]),
                ),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/external_storage',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.optional(
            Schema.Union([
              Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }),
              Schema.Unknown.pipe(
                Schema.decodeTo(
                  Schema.Unknown,
                  SchemaTransformation.transform<unknown, unknown>({
                    decode: (input) => (input === 'null' ? null : input),
                    encode: (output) => output,
                  }),
                ),
                Schema.decodeTo(Schema.NullOr(Schema.Null)),
              ),
            ]),
          ),
          after: Schema.optional(
            Schema.Union([
              Schema.String.annotate({
                description: 'Return external storage configurations after this ID.',
              }),
              Schema.Unknown.pipe(
                Schema.decodeTo(
                  Schema.Unknown,
                  SchemaTransformation.transform<unknown, unknown>({
                    decode: (input) => (input === 'null' ? null : input),
                    encode: (output) => output,
                  }),
                ),
                Schema.decodeTo(Schema.NullOr(Schema.Null)),
              ),
            ]),
          ),
          order: Schema.optional(ExternalStorageOrderSchema),
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/external_storage',
    sValidator('json', Schema.toStandardSchemaV1(CreateExternalStorageBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/external_storage/:external_storage_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          external_storage_id: Schema.String.annotate({ jsonSchemaExamples: ['extstorage_123'] }),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/organization/external_storage/:external_storage_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          external_storage_id: Schema.String.annotate({ jsonSchemaExamples: ['extstorage_123'] }),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/external_storage/:external_storage_id/validate',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          external_storage_id: Schema.String.annotate({ jsonSchemaExamples: ['extstorage_123'] }),
        }),
      ),
    ),
    (c) => {},
  )
  .get('/organization/spend_limit', (c) => {})
  .post(
    '/organization/spend_limit',
    sValidator('json', Schema.toStandardSchemaV1(UpdateOrganizationSpendLimitBodySchema)),
    (c) => {},
  )
  .delete('/organization/spend_limit', (c) => {})
  .get(
    '/organization/projects/:project_id/spend_limit',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }) }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/spend_limit',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }) }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateProjectSpendLimitBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/spend_limit',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }) }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/service_tier_settings',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String.annotate({ description: 'The ID of the project' }),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/service_tier_settings',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String.annotate({ description: 'The ID of the project' }),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateProjectServiceTierSettingsBodySchema)),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id/api_keys',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String.annotate({ description: 'The ID of the project.' }),
          service_account_id: Schema.String.annotate({
            description: 'The ID of the service account.',
          }),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateProjectServiceAccountApiKeyBodySchema)),
    (c) => {},
  )
