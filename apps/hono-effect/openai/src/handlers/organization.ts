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
          after: Schema.optionalKey(
            Schema.NullOr(Schema.String).annotate({
              description: 'Return keys with IDs that come after this ID in the pagination order.',
            }),
          ),
          order: Schema.Literals(['asc', 'desc'])
            .pipe(Schema.withDecodingDefaultType(Effect.succeed('asc')))
            .annotate({ description: 'Order results by creation time, ascending or descending.' }),
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({ description: 'Maximum number of keys to return.' }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/admin_api_keys',
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.String.annotate({ jsonSchemaExamples: ['New Admin Key'] }),
          expires_in_seconds: Schema.optionalKey(
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/audit_logs',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          effective_at: Schema.optionalKey(
            Schema.Struct({
              gt: Schema.optionalKey(
                Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                  .pipe(
                    Schema.decodeTo(
                      Schema.Finite,
                      SchemaTransformation.transform({
                        decode: (input) => Number(input),
                        encode: (output) => String(output),
                      }),
                    ),
                  )
                  .check(Schema.isInt())
                  .annotate({
                    description:
                      'Return only events whose `effective_at` (Unix seconds) is greater than this value.',
                  }),
              ),
              gte: Schema.optionalKey(
                Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                  .pipe(
                    Schema.decodeTo(
                      Schema.Finite,
                      SchemaTransformation.transform({
                        decode: (input) => Number(input),
                        encode: (output) => String(output),
                      }),
                    ),
                  )
                  .check(Schema.isInt())
                  .annotate({
                    description:
                      'Return only events whose `effective_at` (Unix seconds) is greater than or equal to this value.',
                  }),
              ),
              lt: Schema.optionalKey(
                Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                  .pipe(
                    Schema.decodeTo(
                      Schema.Finite,
                      SchemaTransformation.transform({
                        decode: (input) => Number(input),
                        encode: (output) => String(output),
                      }),
                    ),
                  )
                  .check(Schema.isInt())
                  .annotate({
                    description:
                      'Return only events whose `effective_at` (Unix seconds) is less than this value.',
                  }),
              ),
              lte: Schema.optionalKey(
                Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                  .pipe(
                    Schema.decodeTo(
                      Schema.Finite,
                      SchemaTransformation.transform({
                        decode: (input) => Number(input),
                        encode: (output) => String(output),
                      }),
                    ),
                  )
                  .check(Schema.isInt())
                  .annotate({
                    description:
                      'Return only events whose `effective_at` (Unix seconds) is less than or equal to this value.',
                  }),
              ),
            }),
          ),
          'project_ids[]': Schema.optionalKey(
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
          'event_types[]': Schema.optionalKey(
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
          'actor_ids[]': Schema.optionalKey(
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
          'actor_emails[]': Schema.optionalKey(
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
          'resource_ids[]': Schema.optionalKey(
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
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/certificates',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          after: Schema.optionalKey(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/certificates',
    sValidator('json', Schema.toStandardSchemaV1(UploadCertificateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/certificates/activate',
    sValidator('json', Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/certificates/deactivate',
    sValidator('json', Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema)),
    (c) => { throw new Error('Not implemented') },
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
          include: Schema.optionalKey(
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/certificates/:certificate_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ certificate_id: Schema.String })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(ModifyCertificateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/certificates/:certificate_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ certificate_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/costs',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
          end_time: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          bucket_width: Schema.Literal('1d').pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optionalKey(
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
          api_key_ids: Schema.optionalKey(
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
          line_items: Schema.optionalKey(
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
          group_by: Schema.optionalKey(
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
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(7))),
          page: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/organization/data_retention', (c) => { throw new Error('Not implemented') })
  .post(
    '/organization/data_retention',
    sValidator('json', Schema.toStandardSchemaV1(UpdateOrganizationDataRetentionBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1000),
            )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(100))),
          after: Schema.optionalKey(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups',
    sValidator('json', Schema.toStandardSchemaV1(CreateGroupBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups/:group_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(UpdateGroupBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/groups/:group_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/roles',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(1000),
              ),
          ),
          after: Schema.optionalKey(Schema.String),
          order: Schema.optionalKey(Schema.Literals(['asc', 'desc'])),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups/:group_id/roles',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(PublicAssignOrganizationGroupRoleBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, role_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/groups/:group_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, role_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/users',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1000),
            )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(100))),
          after: Schema.optionalKey(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/groups/:group_id/users',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(CreateGroupUserBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/groups/:group_id/users/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, user_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/groups/:group_id/users/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, user_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/invites',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          after: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/invites',
    sValidator('json', Schema.toStandardSchemaV1(InviteRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/invites/:invite_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ invite_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/invites/:invite_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ invite_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          after: Schema.optionalKey(Schema.String),
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects',
    sValidator('json', Schema.toStandardSchemaV1(ProjectCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ProjectUpdateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/api_keys',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          after: Schema.optionalKey(Schema.String),
          owner_project_access: Schema.optionalKey(Schema.Literals(['active', 'inactive', 'any'])),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, api_key_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, api_key_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/archive',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/certificates',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          after: Schema.optionalKey(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/certificates/activate',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/certificates/deactivate',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/data_retention',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/data_retention',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(UpdateProjectDataRetentionBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/groups',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          after: Schema.optionalKey(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/groups',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(InviteProjectGroupBodySchema)),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/groups/:group_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, group_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/hosted_tool_permissions',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/hosted_tool_permissions',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ProjectHostedToolPermissionsUpdateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ProjectModelPermissionsUpdateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/model_permissions',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/rate_limits',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(100))),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/service_accounts',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          after: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/service_accounts',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ProjectServiceAccountCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, service_account_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, service_account_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/spend_alerts',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/spend_alerts',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(CreateSpendAlertBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, alert_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, alert_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/users',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          after: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/projects/:project_id/users',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(ProjectUserCreateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/projects/:project_id/users/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, user_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/users/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, user_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/roles',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1000),
            )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(1000))),
          after: Schema.optionalKey(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/roles',
    sValidator('json', Schema.toStandardSchemaV1(PublicCreateOrganizationRoleBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/roles/:role_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ role_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/roles/:role_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ role_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(PublicUpdateOrganizationRoleBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/roles/:role_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ role_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/spend_alerts',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
          after: Schema.optionalKey(Schema.String),
          before: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/spend_alerts',
    sValidator('json', Schema.toStandardSchemaV1(CreateSpendAlertBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ alert_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ alert_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(CreateSpendAlertBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/spend_alerts/:alert_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ alert_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/audio_speeches',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
          end_time: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optionalKey(
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
          user_ids: Schema.optionalKey(
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
          api_key_ids: Schema.optionalKey(
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
          models: Schema.optionalKey(
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
          group_by: Schema.optionalKey(
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          page: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/audio_transcriptions',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
          end_time: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optionalKey(
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
          user_ids: Schema.optionalKey(
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
          api_key_ids: Schema.optionalKey(
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
          models: Schema.optionalKey(
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
          group_by: Schema.optionalKey(
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          page: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/code_interpreter_sessions',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
          end_time: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optionalKey(
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
          group_by: Schema.optionalKey(
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          page: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/completions',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
          end_time: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optionalKey(
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
          user_ids: Schema.optionalKey(
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
          api_key_ids: Schema.optionalKey(
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
          models: Schema.optionalKey(
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
          batch: Schema.optionalKey(
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
          group_by: Schema.optionalKey(
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          page: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/embeddings',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
          end_time: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optionalKey(
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
          user_ids: Schema.optionalKey(
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
          api_key_ids: Schema.optionalKey(
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
          models: Schema.optionalKey(
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
          group_by: Schema.optionalKey(
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          page: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/file_search_calls',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
          end_time: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optionalKey(
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
          user_ids: Schema.optionalKey(
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
          api_key_ids: Schema.optionalKey(
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
          vector_store_ids: Schema.optionalKey(
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
          group_by: Schema.optionalKey(
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          page: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/images',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
          end_time: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          sources: Schema.optionalKey(
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
          sizes: Schema.optionalKey(
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
          project_ids: Schema.optionalKey(
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
          user_ids: Schema.optionalKey(
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
          api_key_ids: Schema.optionalKey(
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
          models: Schema.optionalKey(
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
          group_by: Schema.optionalKey(
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          page: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/moderations',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
          end_time: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optionalKey(
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
          user_ids: Schema.optionalKey(
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
          api_key_ids: Schema.optionalKey(
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
          models: Schema.optionalKey(
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
          group_by: Schema.optionalKey(
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          page: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/vector_stores',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
          end_time: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optionalKey(
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
          group_by: Schema.optionalKey(
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          page: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/web_search_calls',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
          end_time: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          bucket_width: Schema.Literals(['1m', '1h', '1d']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('1d')),
          ),
          project_ids: Schema.optionalKey(
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
          user_ids: Schema.optionalKey(
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
          api_key_ids: Schema.optionalKey(
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
          models: Schema.optionalKey(
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
          context_levels: Schema.optionalKey(
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
          group_by: Schema.optionalKey(
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(Schema.isInt()),
          ),
          page: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          after: Schema.optionalKey(Schema.String),
          emails: Schema.optionalKey(
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users/:user_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/users/:user_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(UserRoleUpdateRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/users/:user_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users/:user_id/roles',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(1000),
              ),
          ),
          after: Schema.optionalKey(Schema.String),
          order: Schema.optionalKey(Schema.Literals(['asc', 'desc'])),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/users/:user_id/roles',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(PublicAssignOrganizationGroupRoleBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/users/:user_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String, role_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/users/:user_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String, role_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_keys',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          order: Schema.optionalKey(OrderEnumSchema),
          after: Schema.optionalKey(
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
                Schema.decodeTo(Schema.Null),
              ),
            ]),
          ),
          purpose: Schema.optionalKey(ExternalKeyPurposeSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_keys',
    sValidator('json', Schema.toStandardSchemaV1(V1OrganizationExternalKeysPostRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_keys/:external_key_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ external_key_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/external_keys/:external_key_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ external_key_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_keys/:external_key_id/validate',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ external_key_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/workload_identity_providers',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          order: Schema.Union([
            Schema.Literal('asc').pipe(Schema.withDecodingDefaultType(Effect.succeed('asc'))),
            Schema.Literal('desc').pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
          ]),
          after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/workload_identity_providers',
    sValidator('json', Schema.toStandardSchemaV1(CreatePlatformWorkloadIdentityProviderBodySchema)),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          order: Schema.Union([
            Schema.Literal('asc').pipe(Schema.withDecodingDefaultType(Effect.succeed('asc'))),
            Schema.Literal('desc').pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
          ]),
          after: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
          ),
          service_account_id: Schema.optionalKey(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/usage/decisions',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          start_time: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt()),
          end_time: Schema.optionalKey(
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
                    Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                      .pipe(
                        Schema.decodeTo(
                          Schema.Finite,
                          SchemaTransformation.transform({
                            decode: (input) => Number(input),
                            encode: (output) => String(output),
                          }),
                        ),
                      )
                      .check(Schema.isInt()),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.Null),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          bucket_width: Schema.optionalKey(
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
                      Schema.decodeTo(Schema.Null),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          limit: Schema.optionalKey(
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
                    Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
                      .pipe(
                        Schema.decodeTo(
                          Schema.Finite,
                          SchemaTransformation.transform({
                            decode: (input) => Number(input),
                            encode: (output) => String(output),
                          }),
                        ),
                      )
                      .check(Schema.isInt()),
                    Schema.Unknown.pipe(
                      Schema.decodeTo(
                        Schema.Unknown,
                        SchemaTransformation.transform<unknown, unknown>({
                          decode: (input) => (input === 'null' ? null : input),
                          encode: (output) => output,
                        }),
                      ),
                      Schema.decodeTo(Schema.Null),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          page: Schema.optionalKey(
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
                Schema.decodeTo(Schema.Null),
              ),
            ]),
          ),
          project_ids: Schema.optionalKey(
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
                      Schema.decodeTo(Schema.Null),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          group_by: Schema.optionalKey(
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
                      Schema.decodeTo(Schema.Null),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          user_ids: Schema.optionalKey(
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
                      Schema.decodeTo(Schema.Null),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          api_key_ids: Schema.optionalKey(
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
                      Schema.decodeTo(Schema.Null),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          models: Schema.optionalKey(
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
                      Schema.decodeTo(Schema.Null),
                    ),
                  ]),
                ),
              ),
            ),
          ),
          batch: Schema.optionalKey(
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
                      Schema.decodeTo(Schema.Null),
                    ),
                  ]),
                ),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/organization/external_storage',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.optionalKey(
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
                Schema.decodeTo(Schema.Null),
              ),
            ]),
          ),
          after: Schema.optionalKey(
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
                Schema.decodeTo(Schema.Null),
              ),
            ]),
          ),
          order: Schema.optionalKey(ExternalStorageOrderSchema),
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/organization/external_storage',
    sValidator('json', Schema.toStandardSchemaV1(CreateExternalStorageBodySchema)),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .get('/organization/spend_limit', (c) => { throw new Error('Not implemented') })
  .post(
    '/organization/spend_limit',
    sValidator('json', Schema.toStandardSchemaV1(UpdateOrganizationSpendLimitBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/organization/spend_limit', (c) => { throw new Error('Not implemented') })
  .get(
    '/organization/projects/:project_id/spend_limit',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/organization/projects/:project_id/spend_limit',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
