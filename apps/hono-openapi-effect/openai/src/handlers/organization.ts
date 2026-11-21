import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  AdminApiKeySchema,
  AdminApiKeyCreateResponseSchema,
  ApiKeyListSchema,
  AssignedRoleDetailsSchema,
  AuditLogEventTypeSchema,
  CertificateSchema,
  CreateGroupBodySchema,
  CreateGroupUserBodySchema,
  CreateSpendAlertBodySchema,
  DeleteCertificateResponseSchema,
  DeletedRoleAssignmentResourceSchema,
  ErrorResponseSchema,
  GroupDeletedResourceSchema,
  GroupListResourceSchema,
  GroupMemberUserSchema,
  GroupResourceWithSuccessSchema,
  GroupResponseSchema,
  GroupRoleAssignmentSchema,
  GroupUserAssignmentSchema,
  GroupUserDeletedResourceSchema,
  InviteSchema,
  InviteDeleteResponseSchema,
  InviteListResponseSchema,
  InviteProjectGroupBodySchema,
  InviteRequestSchema,
  ListAuditLogsResponseSchema,
  ListCertificatesResponseSchema,
  ListProjectCertificatesResponseSchema,
  ModifyCertificateRequestSchema,
  OrganizationCertificateActivationResponseSchema,
  OrganizationCertificateDeactivationResponseSchema,
  OrganizationDataRetentionSchema,
  OrganizationProjectCertificateActivationResponseSchema,
  OrganizationProjectCertificateDeactivationResponseSchema,
  OrganizationSpendAlertSchema,
  OrganizationSpendAlertDeletedResourceSchema,
  OrganizationSpendAlertListResourceSchema,
  PermissionErrorResponseSchema,
  ProjectSchema,
  ProjectApiKeySchema,
  ProjectApiKeyDeleteResponseSchema,
  ProjectApiKeyListResponseSchema,
  ProjectCreateRequestSchema,
  ProjectDataRetentionSchema,
  ProjectGroupSchema,
  ProjectGroupDeletedResourceSchema,
  ProjectGroupListResourceSchema,
  ProjectHostedToolPermissionsSchema,
  ProjectHostedToolPermissionsUpdateRequestSchema,
  ProjectListResponseSchema,
  ProjectModelPermissionsSchema,
  ProjectModelPermissionsDeleteResponseSchema,
  ProjectModelPermissionsUpdateRequestSchema,
  ProjectRateLimitSchema,
  ProjectRateLimitListResponseSchema,
  ProjectRateLimitUpdateRequestSchema,
  ProjectServiceAccountSchema,
  ProjectServiceAccountCreateRequestSchema,
  ProjectServiceAccountCreateResponseSchema,
  ProjectServiceAccountDeleteResponseSchema,
  ProjectServiceAccountListResponseSchema,
  ProjectSpendAlertSchema,
  ProjectSpendAlertDeletedResourceSchema,
  ProjectSpendAlertListResourceSchema,
  ProjectUpdateRequestSchema,
  ProjectUserSchema,
  ProjectUserCreateRequestSchema,
  ProjectUserDeleteResponseSchema,
  ProjectUserListResponseSchema,
  ProjectUserUpdateRequestSchema,
  PublicAssignOrganizationGroupRoleBodySchema,
  PublicCreateOrganizationRoleBodySchema,
  PublicRoleListResourceSchema,
  PublicUpdateOrganizationRoleBodySchema,
  RoleSchema,
  RoleDeletedResourceSchema,
  RoleListResourceSchema,
  ToggleCertificatesRequestSchema,
  UpdateGroupBodySchema,
  UpdateOrganizationDataRetentionBodySchema,
  UpdateProjectDataRetentionBodySchema,
  UpdateProjectServiceAccountBodySchema,
  UploadCertificateRequestSchema,
  UsageResponseSchema,
  UserSchema,
  UserDeleteResponseSchema,
  UserListResourceSchema,
  UserListResponseSchema,
  UserRoleAssignmentSchema,
  UserRoleUpdateRequestSchema,
  UpdateProjectApiKeyBodySchema,
  OrderEnumSchema,
  ExternalKeyPurposeSchema,
  ExternalKeyResourceSchema,
  ListExternalKeysResourceSchema,
  V1OrganizationExternalKeysPostRequestSchema,
  ValidateExternalKeyResourceSchema,
  PlatformProviderSchema,
  PlatformProviderListResourceSchema,
  CreatePlatformWorkloadIdentityProviderBodySchema,
  UpdatePlatformWorkloadIdentityProviderBodySchema,
  PlatformProviderDeletedResourceSchema,
  PlatformFederationRuleSchema,
  PlatformFederationRuleListResourceSchema,
  CreatePlatformWorkloadIdentityFederationRuleBodySchema,
  UpdatePlatformWorkloadIdentityFederationRuleBodySchema,
  PlatformFederationRuleDeletedResourceSchema,
  DecisionsUsageBucketWidthSchema,
  DecisionsUsageGroupBySchema,
  PublicDecisionsUsageResponseResourceSchema,
  DecisionsUsageErrorResponseSchema,
  DecisionsUsagePermissionErrorResponseSchema,
  ExternalStorageOrderSchema,
  ExternalStorageResponseSchema,
  ExternalStorageListResourceSchema,
  CreateExternalStorageBodySchema,
  ExternalStorageDeletedResourceSchema,
  OrganizationSpendLimitResourceSchema,
  UpdateOrganizationSpendLimitBodySchema,
  OrganizationSpendLimitDeletedResourceSchema,
  ProjectSpendLimitResourceSchema,
  UpdateProjectSpendLimitBodySchema,
  ProjectSpendLimitDeletedResourceSchema,
  ProjectServiceTierSettingsResourceSchema,
  UpdateProjectServiceTierSettingsBodySchema,
  CreateProjectServiceAccountApiKeyBodySchema,
  ServiceAccountApiKeyBodySchema,
  TooManyRequestsResponse,
} from '../components'

export const organizationHandler = new Hono()
  .get(
    '/organization/admin_api_keys',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List all organization and project API keys.',
      description: 'List organization API keys',
      operationId: 'admin-api-keys-list',
      responses: {
        '200': {
          description: 'A list of organization API keys.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ApiKeyListSchema)) },
          },
        },
        '400': {
          description: 'The API key listing parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Create admin API key',
      description: 'Create an organization admin API key',
      operationId: 'admin-api-keys-create',
      responses: {
        '200': {
          description: 'The newly created admin API key.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(AdminApiKeyCreateResponseSchema)),
            },
          },
        },
        '400': {
          description: 'The API key creation request is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The created API key could not be found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve admin API key',
      description: 'Retrieve a single organization API key',
      operationId: 'admin-api-keys-get',
      responses: {
        '200': {
          description: 'Details of the requested API key.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(AdminApiKeySchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The API key was not found or is not available to this organization.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete admin API key',
      description: 'Delete an organization admin API key',
      operationId: 'admin-api-keys-delete',
      responses: {
        '200': {
          description: 'Confirmation that the API key was deleted.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(
                  Schema.Struct({
                    id: Schema.String.annotate({ jsonSchemaExamples: ['key_abc'] }),
                    object: Schema.Literal('organization.admin_api_key.deleted').annotate({
                      jsonSchemaExamples: ['organization.admin_api_key.deleted'],
                    }),
                    deleted: Schema.Boolean.annotate({ jsonSchemaExamples: [true] }),
                  }),
                ),
              ),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The API key was not found or is not available to this organization.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List audit logs',
      description: 'List user actions and configuration changes within this organization.',
      operationId: 'list-audit-logs',
      tags: ['Audit Logs'],
      responses: {
        '200': {
          description: 'Audit logs listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ListAuditLogsResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'No audit log was found with the specified pagination cursor.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List organization certificates',
      description: 'List uploaded certificates for this organization.',
      operationId: 'listOrganizationCertificates',
      tags: ['Certificates'],
      responses: {
        '200': {
          description: 'Certificates listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ListCertificatesResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Upload certificate',
      description:
        'Upload a certificate to the organization. This does **not** automatically activate the certificate.\n\nOrganizations can upload up to 50 certificates.\n',
      operationId: 'uploadCertificate',
      tags: ['Certificates'],
      responses: {
        '200': {
          description: 'Certificate uploaded successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(CertificateSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', Schema.toStandardSchemaV1(UploadCertificateRequestSchema)),
    (c) => {},
  )
  .post(
    '/organization/certificates/activate',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Activate certificates for organization',
      description:
        'Activate certificates at the organization level.\n\nYou can atomically and idempotently activate up to 10 certificates at a time.\n',
      operationId: 'activateOrganizationCertificates',
      tags: ['Certificates'],
      responses: {
        '200': {
          description: 'Certificates activated successfully.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(OrganizationCertificateActivationResponseSchema),
              ),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A certificate was not found in this organization.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The certificate update could not be completed because of a server error.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema)),
    (c) => {},
  )
  .post(
    '/organization/certificates/deactivate',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Deactivate certificates for organization',
      description:
        'Deactivate certificates at the organization level.\n\nYou can atomically and idempotently deactivate up to 10 certificates at a time.\n',
      operationId: 'deactivateOrganizationCertificates',
      tags: ['Certificates'],
      responses: {
        '200': {
          description: 'Certificates deactivated successfully.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(OrganizationCertificateDeactivationResponseSchema),
              ),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A certificate was not found in this organization.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The certificate update could not be completed because of a server error.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/certificates/:certificate_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Get certificate',
      description:
        'Get a certificate that has been uploaded to the organization.\n\nYou can get a certificate regardless of whether it is active or not.\n',
      operationId: 'getCertificate',
      tags: ['Certificates'],
      responses: {
        '200': {
          description: 'Certificate retrieved successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(CertificateSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A certificate was not found in this organization.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ certificate_id: Schema.String }))),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Modify certificate',
      description: 'Modify a certificate. Note that only the name can be modified.\n',
      operationId: 'modifyCertificate',
      tags: ['Certificates'],
      responses: {
        '200': {
          description: 'Certificate modified successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(CertificateSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A certificate was not found in this organization.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The certificate update could not be completed because of a server error.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ certificate_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(ModifyCertificateRequestSchema)),
    (c) => {},
  )
  .delete(
    '/organization/certificates/:certificate_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete certificate',
      description:
        'Delete a certificate from the organization.\n\nThe certificate must be inactive for the organization and all projects.\n',
      operationId: 'deleteCertificate',
      tags: ['Certificates'],
      responses: {
        '200': {
          description: 'Certificate deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(DeleteCertificateResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A certificate was not found in this organization.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ certificate_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/costs',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Costs',
      description: 'Get costs details for the organization.',
      operationId: 'usage-costs',
      tags: ['Usage'],
      responses: {
        '200': {
          description: 'Costs data retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UsageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
  .get(
    '/organization/data_retention',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve organization data retention',
      description: 'Retrieves organization data retention controls.',
      operationId: 'retrieve-organization-data-retention',
      tags: ['Data retention'],
      responses: {
        '200': {
          description: 'Organization data retention controls retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(OrganizationDataRetentionSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The organization was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    (c) => {},
  )
  .post(
    '/organization/data_retention',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Update organization data retention',
      description: 'Updates organization data retention controls.',
      operationId: 'update-organization-data-retention',
      tags: ['Data retention'],
      responses: {
        '200': {
          description: 'Organization data retention controls updated successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(OrganizationDataRetentionSchema)),
            },
          },
        },
        '400': {
          description: 'The requested data retention setting or transition is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The organization was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(UpdateOrganizationDataRetentionBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/groups',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List groups',
      description: 'Lists all groups in the organization.',
      operationId: 'list-groups',
      tags: ['Groups'],
      responses: {
        '200': {
          description: 'Groups listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GroupListResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested group, user, or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Create group',
      description: 'Creates a new group in the organization.',
      operationId: 'create-group',
      tags: ['Groups'],
      responses: {
        '200': {
          description: 'Group created successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GroupResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested group, user, or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '422': {
          description: 'The organization has reached its maximum number of groups.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The group operation could not be completed because of a server error.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateGroupBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve group',
      description: 'Retrieves a group.',
      operationId: 'retrieve-group',
      tags: ['Groups'],
      responses: {
        '200': {
          description: 'Group retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GroupResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested group, user, or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The group operation could not be completed because of a server error.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/groups/:group_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Update group',
      description: "Updates a group's information.",
      operationId: 'update-group',
      tags: ['Groups'],
      responses: {
        '200': {
          description: 'Group updated successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GroupResourceWithSuccessSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested group, user, or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The group operation could not be completed because of a server error.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(UpdateGroupBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/groups/:group_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete group',
      description: 'Deletes a group from the organization.',
      operationId: 'delete-group',
      tags: ['Groups'],
      responses: {
        '200': {
          description: 'Group deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GroupDeletedResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The endpoint is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id/roles',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List group organization role assignments',
      description: 'Lists the organization roles assigned to a group within the organization.',
      operationId: 'list-group-role-assignments',
      tags: ['Group organization role assignments'],
      responses: {
        '200': {
          description: 'Group organization role assignments listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(RoleListResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Assign organization role to group',
      description: 'Assigns an organization role to a group within the organization.',
      operationId: 'assign-group-role',
      tags: ['Group organization role assignments'],
      responses: {
        '200': {
          description: 'Organization role assigned to the group successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GroupRoleAssignmentSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(PublicAssignOrganizationGroupRoleBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve group organization role',
      description: 'Retrieves an organization role assigned to a group.',
      operationId: 'retrieve-group-role',
      tags: ['Group organization role assignments'],
      responses: {
        '200': {
          description: 'Organization role retrieved for the group successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(AssignedRoleDetailsSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, role_id: Schema.String })),
    ),
    (c) => {},
  )
  .delete(
    '/organization/groups/:group_id/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Unassign organization role from group',
      description: 'Unassigns an organization role from a group within the organization.',
      operationId: 'unassign-group-role',
      tags: ['Group organization role assignments'],
      responses: {
        '200': {
          description: 'Organization role unassigned from the group successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(DeletedRoleAssignmentResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, role_id: Schema.String })),
    ),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id/users',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List group users',
      description: 'Lists the users assigned to a group.',
      operationId: 'list-group-users',
      tags: ['Group users'],
      responses: {
        '200': {
          description: 'Group users listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UserListResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested group, user, or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '502': {
          description: 'The upstream group service returned an invalid pagination cursor.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Add group user',
      description: 'Adds a user to a group.',
      operationId: 'add-group-user',
      tags: ['Group users'],
      responses: {
        '200': {
          description: 'User added to the group successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GroupUserAssignmentSchema)),
            },
          },
        },
        '400': {
          description: 'The request contains invalid parameters or an invalid body.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description:
            'The caller lacks the required permissions or is not using an admin API key.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The group or user was not found in the organization, or this endpoint is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '409': {
          description: 'The request conflicts with the current state of the group.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(CreateGroupUserBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/groups/:group_id/users/:user_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve group user',
      description: 'Retrieves a user in a group.',
      operationId: 'retrieve-group-user',
      tags: ['Group users'],
      responses: {
        '200': {
          description: 'User retrieved from the group successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GroupMemberUserSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested group, user, or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, user_id: Schema.String })),
    ),
    (c) => {},
  )
  .delete(
    '/organization/groups/:group_id/users/:user_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Remove group user',
      description: 'Removes a user from a group.',
      operationId: 'remove-group-user',
      tags: ['Group users'],
      responses: {
        '200': {
          description: 'User removed from the group successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(GroupUserDeletedResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request contains invalid parameters.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description:
            'The caller lacks the required permissions or is not using an admin API key.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The group or user was not found in the organization, or this endpoint is unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '409': {
          description: 'The request conflicts with the current state of the group.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ group_id: Schema.String, user_id: Schema.String })),
    ),
    (c) => {},
  )
  .get(
    '/organization/invites',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List invites',
      description: 'Returns a list of invites in the organization.',
      operationId: 'list-invites',
      tags: ['Invites'],
      responses: {
        '200': {
          description: 'Invites listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(InviteListResponseSchema)),
            },
          },
        },
        '400': {
          description: 'The invite listing parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The invite specified by the after cursor was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Create invite',
      description:
        'Create an invite for a user to the organization. The invite must be accepted by the user before they have access to the organization.',
      operationId: 'inviteUser',
      tags: ['Invites'],
      responses: {
        '200': {
          description: 'User invited successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(InviteSchema)) },
          },
        },
        '201': {
          description: 'User invited successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(InviteSchema)) },
          },
        },
        '400': {
          description:
            'The invite request is invalid or the user has already joined or been invited.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(InviteRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/invites/:invite_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve invite',
      description: 'Retrieves an invite.',
      operationId: 'retrieve-invite',
      tags: ['Invites'],
      responses: {
        '200': {
          description: 'Invite retrieved successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(InviteSchema)) },
          },
        },
        '400': {
          description: 'The invite request is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The invite was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '500': {
          description: 'The invite could not be retrieved because of a server error.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ invite_id: Schema.String }))),
    (c) => {},
  )
  .delete(
    '/organization/invites/:invite_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete invite',
      description:
        'Delete an invite. If the invite has already been accepted, it cannot be deleted.',
      operationId: 'delete-invite',
      tags: ['Invites'],
      responses: {
        '200': {
          description: 'Invite deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(InviteDeleteResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request is invalid or the invite cannot be deleted in its current state.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller is not permitted to delete the invite.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The invite was not found in the organization.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'The request rate limit was exceeded.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ invite_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/projects',
    describeRoute({
      summary: 'List projects',
      description: 'Returns a list of projects.',
      operationId: 'list-projects',
      security: [{ AdminApiKeyAuth: [] }],
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Projects listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectListResponseSchema)),
            },
          },
        },
        '400': {
          description: 'The project listing parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project specified by the after cursor was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
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
    describeRoute({
      summary: 'Create project',
      description:
        'Create a new project in the organization. Projects can be created and archived, but cannot be deleted.',
      operationId: 'create-project',
      security: [{ AdminApiKeyAuth: [] }],
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project created successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ProjectSchema)) },
          },
        },
        '201': {
          description: 'Project created successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ProjectSchema)) },
          },
        },
        '400': {
          description: 'The project creation request is invalid or contains incompatible settings.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(ProjectCreateRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id',
    describeRoute({
      summary: 'Retrieve project',
      description: 'Retrieves a project.',
      operationId: 'retrieve-project',
      security: [{ AdminApiKeyAuth: [] }],
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project retrieved successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ProjectSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id',
    describeRoute({
      summary: 'Modify project',
      description: 'Modifies a project in the organization.',
      operationId: 'modify-project',
      security: [{ AdminApiKeyAuth: [] }],
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project updated successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ProjectSchema)) },
          },
        },
        '400': {
          description: 'Error response when updating the default project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A requested project, user, service account, or API key was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(ProjectUpdateRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/api_keys',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List project API keys',
      description: 'Returns a list of API keys in the project.',
      operationId: 'list-project-api-keys',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project API keys listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectApiKeyListResponseSchema)),
            },
          },
        },
        '400': {
          description: 'The listing parameters are invalid or the project is archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve project API key',
      description: 'Retrieves an API key in the project.',
      operationId: 'retrieve-project-api-key',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project API key retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectApiKeySchema)),
            },
          },
        },
        '400': {
          description: 'The project is archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or API key was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, api_key_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Update project API key',
      description:
        'Updates the scopes and/or expiration of an existing API key in the project, including a\nservice-account-owned key. Requires permission to write project API keys.\n\nProvide at least one of `scopes` or `expires_in_seconds`. Omitted fields stay\nunchanged; neither field accepts `null`. Both changes are saved together.\n\n`scopes` replaces the key\'s scope restrictions using the same scope identifiers\nas the dashboard. An empty array means All permissions, subject to the owner\'s\neffective access; it does not mean no access. Use `["api.all.read"]` for read-only\naccess or specific scopes such as `["api.files.read"]` for restricted access.\nThis does not change user or service-account roles or grant admin permissions.\nScope changes follow the same authentication-cache propagation as dashboard edits.\n\nProvide `expires_in_seconds` to set the expiration relative to this request.\nThe value must satisfy the organization\'s and project\'s expiry policies.\nExpired keys cannot be updated. Retrying resets the expiration relative to\nthe new request. The response contains only the redacted key, not its secret.\n',
      operationId: 'update-project-api-key',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project API key updated successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectApiKeySchema)),
            },
          },
        },
        '400': {
          description:
            'The project is archived, the key is expired, or the requested scopes or expiration are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to update this API key.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or API key was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, api_key_id: Schema.String }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(UpdateProjectApiKeyBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/api_keys/:api_key_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete project API key',
      description:
        'Deletes an API key from the project, including keys owned by service accounts.\n\nRequires permission to write project API keys. Deleting a service-account key\ndoes not delete the service account or its other keys.\n\nReturns confirmation of the key deletion.\n',
      operationId: 'delete-project-api-key',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project API key deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectApiKeyDeleteResponseSchema)),
            },
          },
        },
        '400': {
          description: 'Error response for various conditions.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A requested project, user, service account, or API key was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, api_key_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/archive',
    describeRoute({
      summary: 'Archive project',
      description:
        'Archives a project in the organization. Archived projects cannot be used or updated.',
      operationId: 'archive-project',
      security: [{ AdminApiKeyAuth: [] }],
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project archived successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ProjectSchema)) },
          },
        },
        '400': {
          description:
            'The project is already archived or is the default project and cannot be archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/certificates',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List project certificates',
      description: 'List certificates for this project.',
      operationId: 'listProjectCertificates',
      tags: ['Certificates'],
      responses: {
        '200': {
          description: 'Certificates listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ListProjectCertificatesResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Activate certificates for project',
      description:
        'Activate certificates at the project level.\n\nYou can atomically and idempotently activate up to 10 certificates at a time.\n',
      operationId: 'activateProjectCertificates',
      tags: ['Certificates'],
      responses: {
        '200': {
          description: 'Certificates activated successfully.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(OrganizationProjectCertificateActivationResponseSchema),
              ),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A certificate was not found in this organization.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The certificate update could not be completed because of a server error.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema)),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/certificates/deactivate',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Deactivate certificates for project',
      description:
        'Deactivate certificates at the project level. You can atomically and \nidempotently deactivate up to 10 certificates at a time.\n',
      operationId: 'deactivateProjectCertificates',
      tags: ['Certificates'],
      responses: {
        '200': {
          description: 'Certificates deactivated successfully.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(OrganizationProjectCertificateDeactivationResponseSchema),
              ),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A certificate was not found in this organization.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The certificate update could not be completed because of a server error.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(ToggleCertificatesRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/data_retention',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve project data retention',
      description: 'Retrieves project data retention controls.',
      operationId: 'retrieve-project-data-retention',
      tags: ['Data retention'],
      responses: {
        '200': {
          description: 'Project data retention controls retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectDataRetentionSchema)),
            },
          },
        },
        '400': {
          description: 'The project ID is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The organization or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/data_retention',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Update project data retention',
      description: 'Updates project data retention controls.',
      operationId: 'update-project-data-retention',
      tags: ['Data retention'],
      responses: {
        '200': {
          description: 'Project data retention controls updated successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectDataRetentionSchema)),
            },
          },
        },
        '400': {
          description: 'The requested data retention setting or transition is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The organization or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(UpdateProjectDataRetentionBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/groups',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List project groups',
      description: 'Lists the groups that have access to a project.',
      operationId: 'list-project-groups',
      tags: ['Project groups'],
      responses: {
        '200': {
          description: 'Project groups listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectGroupListResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested group, user, or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Add project group',
      description: 'Grants a group access to a project.',
      operationId: 'add-project-group',
      tags: ['Project groups'],
      responses: {
        '200': {
          description: 'Group granted access to the project successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ProjectGroupSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested group, user, or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The group operation could not be completed because of a server error.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(InviteProjectGroupBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/groups/:group_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve project group',
      description: "Retrieves a project's group.",
      operationId: 'retrieve-project-group',
      tags: ['Project groups'],
      responses: {
        '200': {
          description: 'Project group retrieved successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ProjectGroupSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested group, user, or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, group_id: Schema.String }),
      ),
    ),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Remove project group',
      description: "Revokes a group's access to a project.",
      operationId: 'remove-project-group',
      tags: ['Project groups'],
      responses: {
        '200': {
          description: 'Group removed from the project successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectGroupDeletedResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested group, user, or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, group_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/hosted_tool_permissions',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve project hosted tool permissions',
      description: 'Returns hosted tool permissions for a project.',
      operationId: 'retrieve-project-hosted-tool-permissions',
      tags: ['Hosted tools'],
      responses: {
        '200': {
          description: 'Project hosted tool permissions retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectHostedToolPermissionsSchema)),
            },
          },
        },
        '400': {
          description: 'The project ID is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/hosted_tool_permissions',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Modify project hosted tool permissions',
      description: 'Updates hosted tool permissions for a project.',
      operationId: 'update-project-hosted-tool-permissions',
      tags: ['Hosted tools'],
      responses: {
        '200': {
          description: 'Project hosted tool permissions updated successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectHostedToolPermissionsSchema)),
            },
          },
        },
        '400': {
          description: 'The hosted tool permission request is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '409': {
          description: 'The requested project setting conflicts with the organization policy.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(ProjectHostedToolPermissionsUpdateRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/model_permissions',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve project model permissions',
      description: 'Returns model permissions for a project.',
      operationId: 'retrieve-project-model-permissions',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project model permissions retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectModelPermissionsSchema)),
            },
          },
        },
        '400': {
          description: 'The project is archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or model permission settings were not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/model_permissions',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Modify project model permissions',
      description: 'Updates model permissions for a project.',
      operationId: 'update-project-model-permissions',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project model permissions updated successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectModelPermissionsSchema)),
            },
          },
        },
        '400': {
          description: 'The model permission request is invalid or the project is archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(ProjectModelPermissionsUpdateRequestSchema)),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/model_permissions',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete project model permissions',
      description: 'Deletes model permissions for a project.',
      operationId: 'delete-project-model-permissions',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project model permissions deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(ProjectModelPermissionsDeleteResponseSchema),
              ),
            },
          },
        },
        '400': {
          description: 'The project is archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or model permission settings were not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/rate_limits',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List project rate limits',
      description: 'Returns the rate limits per model for a project.',
      operationId: 'list-project-rate-limits',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project rate limits listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectRateLimitListResponseSchema)),
            },
          },
        },
        '400': {
          description: 'The rate limit listing parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or pagination cursor was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
              example: {
                error: {
                  code: 'project_not_found',
                  message: 'The project proj_abc was not found',
                  type: 'invalid_request_error',
                  param: null,
                },
              },
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Modify project rate limit',
      description: 'Updates a project rate limit.',
      operationId: 'update-project-rate-limits',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project rate limit updated successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectRateLimitSchema)),
            },
          },
        },
        '400': {
          description: 'Error response for various conditions.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
              example: {
                error: {
                  code: 'project_not_found',
                  message: 'The project proj_abc was not found',
                  type: 'invalid_request_error',
                  param: null,
                },
              },
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, rate_limit_id: Schema.String }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(ProjectRateLimitUpdateRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/service_accounts',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List project service accounts',
      description: 'Returns a list of service accounts in the project.',
      operationId: 'list-project-service-accounts',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project service accounts listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectServiceAccountListResponseSchema)),
            },
          },
        },
        '400': {
          description: 'Error response when project is archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A requested project, user, service account, or API key was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Create project service account',
      description:
        'Creates a new service account in the project. By default, this also returns an unredacted API key for the service account.',
      operationId: 'create-project-service-account',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project service account created successfully.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(ProjectServiceAccountCreateResponseSchema),
              ),
            },
          },
        },
        '201': {
          description: 'Project service account created successfully.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(ProjectServiceAccountCreateResponseSchema),
              ),
            },
          },
        },
        '400': {
          description: 'Error response when project is archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A requested project, user, service account, or API key was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(ProjectServiceAccountCreateRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve project service account',
      description: 'Retrieves a service account in the project.',
      operationId: 'retrieve-project-service-account',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project service account retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectServiceAccountSchema)),
            },
          },
        },
        '400': {
          description: 'The project is archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or service account was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, service_account_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Update project service account',
      description: 'Updates a service account in the project.',
      operationId: 'update-project-service-account',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project service account updated successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectServiceAccountSchema)),
            },
          },
        },
        '400': {
          description: 'The service account update is invalid or the project is archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or service account was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, service_account_id: Schema.String }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(UpdateProjectServiceAccountBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/service_accounts/:service_account_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete project service account',
      description:
        'Deletes a service account from the project.\n\nReturns confirmation of service account deletion, or an error if the project\nis archived (archived projects have no service accounts).\n',
      operationId: 'delete-project-service-account',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project service account deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(ProjectServiceAccountDeleteResponseSchema),
              ),
            },
          },
        },
        '400': {
          description:
            'The request is invalid or the service account cannot be deleted in its current state.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller is not permitted to delete the service account.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or service account was not found in the organization.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'The request rate limit was exceeded.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, service_account_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/spend_alerts',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List project spend alerts',
      description: 'Lists project spend alerts.',
      operationId: 'list-project-spend-alerts',
      tags: ['Spend alerts'],
      responses: {
        '200': {
          description: 'Project spend alerts listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectSpendAlertListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The spend alert listing parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or spend alert pagination cursor was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Create project spend alert',
      description: 'Creates a project spend alert.',
      operationId: 'create-project-spend-alert',
      tags: ['Spend alerts'],
      responses: {
        '200': {
          description: 'Project spend alert created successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectSpendAlertSchema)),
            },
          },
        },
        '400': {
          description: 'The spend alert request is invalid or conflicts with the hard spend limit.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(CreateSpendAlertBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve project spend alert',
      description: 'Retrieves a project spend alert.',
      operationId: 'retrieve-project-spend-alert',
      tags: ['Spend alerts'],
      responses: {
        '200': {
          description: 'Project spend alert retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectSpendAlertSchema)),
            },
          },
        },
        '400': {
          description: 'The project ID is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or spend alert was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, alert_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Update project spend alert',
      description: 'Updates a project spend alert.',
      operationId: 'update-project-spend-alert',
      tags: ['Spend alerts'],
      responses: {
        '200': {
          description: 'Project spend alert updated successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectSpendAlertSchema)),
            },
          },
        },
        '400': {
          description: 'The spend alert update is invalid or conflicts with the hard spend limit.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or spend alert was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, alert_id: Schema.String }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(CreateSpendAlertBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/spend_alerts/:alert_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete project spend alert',
      description: 'Deletes a project spend alert.',
      operationId: 'delete-project-spend-alert',
      tags: ['Spend alerts'],
      responses: {
        '200': {
          description: 'Project spend alert deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectSpendAlertDeletedResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The project ID is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or spend alert was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, alert_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/users',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List project users',
      description: 'Returns a list of users in the project.',
      operationId: 'list-project-users',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project users listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectUserListResponseSchema)),
            },
          },
        },
        '400': {
          description: 'Error response when project is archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A requested project, user, service account, or API key was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Create project user',
      description:
        'Adds a user to the project. Users must already be members of the organization to be added to a project.',
      operationId: 'create-project-user',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'User added to project successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ProjectUserSchema)) },
          },
        },
        '201': {
          description: 'User added to project successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ProjectUserSchema)) },
          },
        },
        '400': {
          description:
            'The request is invalid or the user cannot be added to the project in its current state.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller lacks the required permissions.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or user was not found in the organization.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '409': {
          description: 'The request conflicts with the current state of the resource.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'The request exceeded the rate limit.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(ProjectUserCreateRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/users/:user_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve project user',
      description: 'Retrieves a user in the project.',
      operationId: 'retrieve-project-user',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project user retrieved successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ProjectUserSchema)) },
          },
        },
        '400': {
          description: 'The project is archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or user was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, user_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/users/:user_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Modify project user',
      description: "Modifies a user's role in the project.",
      operationId: 'modify-project-user',
      tags: ['Projects'],
      responses: {
        '200': {
          description: "Project user's role updated successfully.",
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ProjectUserSchema)) },
          },
        },
        '400': {
          description: 'Error response for various conditions.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A requested project, user, service account, or API key was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, user_id: Schema.String }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(ProjectUserUpdateRequestSchema)),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/users/:user_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete project user',
      description:
        'Deletes a user from the project.\n\nReturns confirmation of project user deletion, or an error if the project is\narchived (archived projects have no users).\n',
      operationId: 'delete-project-user',
      tags: ['Projects'],
      responses: {
        '200': {
          description: 'Project user deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectUserDeleteResponseSchema)),
            },
          },
        },
        '400': {
          description: 'Error response for various conditions.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'A requested project, user, service account, or API key was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, user_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/roles',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List organization roles',
      description: 'Lists the roles configured for the organization.',
      operationId: 'list-roles',
      tags: ['Roles'],
      responses: {
        '200': {
          description: 'Roles listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PublicRoleListResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Create organization role',
      description: 'Creates a custom role for the organization.',
      operationId: 'create-role',
      tags: ['Roles'],
      responses: {
        '200': {
          description: 'Role created successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(RoleSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', Schema.toStandardSchemaV1(PublicCreateOrganizationRoleBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve organization role',
      description: 'Retrieves an organization role.',
      operationId: 'retrieve-role',
      tags: ['Roles'],
      responses: {
        '200': {
          description: 'Role retrieved successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(RoleSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ role_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Update organization role',
      description: 'Updates an existing organization role.',
      operationId: 'update-role',
      tags: ['Roles'],
      responses: {
        '200': {
          description: 'Role updated successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(RoleSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ role_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(PublicUpdateOrganizationRoleBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete organization role',
      description: 'Deletes a custom role from the organization.',
      operationId: 'delete-role',
      tags: ['Roles'],
      responses: {
        '200': {
          description: 'Role deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(RoleDeletedResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ role_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/spend_alerts',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List organization spend alerts',
      description: 'Lists organization spend alerts.',
      operationId: 'list-organization-spend-alerts',
      tags: ['Spend alerts'],
      responses: {
        '200': {
          description: 'Organization spend alerts listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(OrganizationSpendAlertListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The spend alert listing parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The spend alert specified by the after cursor was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Create organization spend alert',
      description: 'Creates an organization spend alert.',
      operationId: 'create-organization-spend-alert',
      tags: ['Spend alerts'],
      responses: {
        '200': {
          description: 'Organization spend alert created successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(OrganizationSpendAlertSchema)),
            },
          },
        },
        '400': {
          description: 'The spend alert request is invalid or conflicts with the hard spend limit.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateSpendAlertBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/spend_alerts/:alert_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve organization spend alert',
      description: 'Retrieves an organization spend alert.',
      operationId: 'retrieve-organization-spend-alert',
      tags: ['Spend alerts'],
      responses: {
        '200': {
          description: 'Organization spend alert retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(OrganizationSpendAlertSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The spend alert was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ alert_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/spend_alerts/:alert_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Update organization spend alert',
      description: 'Updates an organization spend alert.',
      operationId: 'update-organization-spend-alert',
      tags: ['Spend alerts'],
      responses: {
        '200': {
          description: 'Organization spend alert updated successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(OrganizationSpendAlertSchema)),
            },
          },
        },
        '400': {
          description: 'The spend alert update is invalid or conflicts with the hard spend limit.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The spend alert was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ alert_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(CreateSpendAlertBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/spend_alerts/:alert_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete organization spend alert',
      description: 'Deletes an organization spend alert.',
      operationId: 'delete-organization-spend-alert',
      tags: ['Spend alerts'],
      responses: {
        '200': {
          description: 'Organization spend alert deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(OrganizationSpendAlertDeletedResourceSchema),
              ),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The spend alert was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ alert_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/usage/audio_speeches',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Audio speeches',
      description: 'Get audio speeches usage details for the organization.',
      operationId: 'usage-audio-speeches',
      tags: ['Usage'],
      responses: {
        '200': {
          description: 'Usage data retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UsageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Audio transcriptions',
      description: 'Get audio transcriptions usage details for the organization.',
      operationId: 'usage-audio-transcriptions',
      tags: ['Usage'],
      responses: {
        '200': {
          description: 'Usage data retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UsageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Code interpreter sessions',
      description: 'Get code interpreter sessions usage details for the organization.',
      operationId: 'usage-code-interpreter-sessions',
      tags: ['Usage'],
      responses: {
        '200': {
          description: 'Usage data retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UsageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Completions',
      description: 'Get completions usage details for the organization.',
      operationId: 'usage-completions',
      tags: ['Usage'],
      responses: {
        '200': {
          description: 'Usage data retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UsageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Embeddings',
      description: 'Get embeddings usage details for the organization.',
      operationId: 'usage-embeddings',
      tags: ['Usage'],
      responses: {
        '200': {
          description: 'Usage data retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UsageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'File search calls',
      description: 'Get file search calls usage details for the organization.',
      operationId: 'usage-file-search-calls',
      tags: ['Usage'],
      responses: {
        '200': {
          description: 'Usage data retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UsageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Images',
      description: 'Get images usage details for the organization.',
      operationId: 'usage-images',
      tags: ['Usage'],
      responses: {
        '200': {
          description: 'Usage data retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UsageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Moderations',
      description: 'Get moderations usage details for the organization.',
      operationId: 'usage-moderations',
      tags: ['Usage'],
      responses: {
        '200': {
          description: 'Usage data retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UsageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Vector stores',
      description: 'Get vector stores usage details for the organization.',
      operationId: 'usage-vector-stores',
      tags: ['Usage'],
      responses: {
        '200': {
          description: 'Usage data retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UsageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Web search calls',
      description: 'Get web search calls usage details for the organization.',
      operationId: 'usage-web-search-calls',
      tags: ['Usage'],
      responses: {
        '200': {
          description: 'Usage data retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UsageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List users',
      description: 'Lists all of the users in the organization.',
      operationId: 'list-users',
      tags: ['Users'],
      responses: {
        '200': {
          description: 'Users listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UserListResponseSchema)),
            },
          },
        },
        '400': {
          description: 'The user listing parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve user',
      description: 'Retrieves a user by their identifier.',
      operationId: 'retrieve-user',
      tags: ['Users'],
      responses: {
        '200': {
          description: 'User retrieved successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(UserSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The user was not found in this organization.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    (c) => {},
  )
  .post(
    '/organization/users/:user_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Modify user',
      description: "Modifies a user's role in the organization.",
      operationId: 'modify-user',
      tags: ['Users'],
      responses: {
        '200': {
          description: 'User role updated successfully.',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(UserSchema)) },
          },
        },
        '400': {
          description: 'The requested user role is invalid or the update is not permitted.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The user was not found in this organization.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(UserRoleUpdateRequestSchema)),
    (c) => {},
  )
  .delete(
    '/organization/users/:user_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete user',
      description: 'Deletes a user from the organization.',
      operationId: 'delete-user',
      tags: ['Users'],
      responses: {
        '200': {
          description: 'User deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UserDeleteResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The request is invalid or the user cannot be removed in their current state.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller is not permitted to delete the user.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The user was not found in the organization.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'The request rate limit was exceeded.\n',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    (c) => {},
  )
  .get(
    '/organization/users/:user_id/roles',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List user organization role assignments',
      description: 'Lists the organization roles assigned to a user within the organization.',
      operationId: 'list-user-role-assignments',
      tags: ['User organization role assignments'],
      responses: {
        '200': {
          description: 'User organization role assignments listed successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(RoleListResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    validator(
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
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Assign organization role to user',
      description: 'Assigns an organization role to a user within the organization.',
      operationId: 'assign-user-role',
      tags: ['User organization role assignments'],
      responses: {
        '200': {
          description: 'Organization role assigned to the user successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(UserRoleAssignmentSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(PublicAssignOrganizationGroupRoleBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/users/:user_id/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve user organization role',
      description: 'Retrieves an organization role assigned to a user.',
      operationId: 'retrieve-user-role',
      tags: ['User organization role assignments'],
      responses: {
        '200': {
          description: 'Organization role retrieved for the user successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(AssignedRoleDetailsSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String, role_id: Schema.String })),
    ),
    (c) => {},
  )
  .delete(
    '/organization/users/:user_id/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Unassign organization role from user',
      description: 'Unassigns an organization role from a user within the organization.',
      operationId: 'unassign-user-role',
      tags: ['User organization role assignments'],
      responses: {
        '200': {
          description: 'Organization role unassigned from the user successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(DeletedRoleAssignmentResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ user_id: Schema.String, role_id: Schema.String })),
    ),
    (c) => {},
  )
  .get(
    '/organization/external_keys',
    describeRoute({
      summary: "List the external key configs registered on the user's organization",
      description: "List the external key configs registered on the user's organization",
      operationId: "Listtheexternalkeyconfigsregisteredontheuser'sorganization",
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ListExternalKeysResourceSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    describeRoute({
      summary: 'Add an external key config for an organization',
      description: 'Add an external key config for an organization',
      operationId: 'Addanexternalkeyconfigforanorganization',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ExternalKeyResourceSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator('json', Schema.toStandardSchemaV1(V1OrganizationExternalKeysPostRequestSchema)),
    (c) => {},
  )
  .get(
    '/organization/external_keys/:external_key_id',
    describeRoute({
      summary: 'Retrieve an external key registration',
      description: "Retrieve a stored external key registration for the user's organization.",
      operationId: 'Retrieveanexternalkeyregistration',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ExternalKeyResourceSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ external_key_id: Schema.String })),
    ),
    (c) => {},
  )
  .delete(
    '/organization/external_keys/:external_key_id',
    describeRoute({
      summary: "Delete an external key config for the user's organization",
      description: "Delete an external key config for the user's organization",
      operationId: "Deleteanexternalkeyconfigfortheuser'sorganization",
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ExternalKeyResourceSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ external_key_id: Schema.String })),
    ),
    (c) => {},
  )
  .post(
    '/organization/external_keys/:external_key_id/validate',
    describeRoute({
      summary: "Validate an external key config for the user's organization",
      description: "Validate an external key config for the user's organization",
      operationId: "Validateanexternalkeyconfigfortheuser'sorganization",
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ValidateExternalKeyResourceSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ external_key_id: Schema.String })),
    ),
    (c) => {},
  )
  .get(
    '/organization/workload_identity_providers',
    describeRoute({
      summary: 'List Platform workload identity providers',
      description: "List OIDC providers in the authenticated Admin API key's organization.",
      operationId: 'ListPlatformworkloadidentityproviders',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PlatformProviderListResourceSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    describeRoute({
      summary: 'Create Platform workload identity provider',
      description: 'Register an OIDC provider for keyless project service-account authentication.',
      operationId: 'CreatePlatformworkloadidentityprovider',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PlatformProviderSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator('json', Schema.toStandardSchemaV1(CreatePlatformWorkloadIdentityProviderBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    describeRoute({
      summary: 'Retrieve Platform workload identity provider',
      description: 'Retrieve an OIDC provider in the authenticated organization.',
      operationId: 'RetrievePlatformworkloadidentityprovider',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PlatformProviderSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    describeRoute({
      summary: 'Update Platform workload identity provider',
      description: 'Update supplied provider fields, preserving omitted fields.',
      operationId: 'UpdatePlatformworkloadidentityprovider',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PlatformProviderSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    validator('json', Schema.toStandardSchemaV1(UpdatePlatformWorkloadIdentityProviderBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id',
    describeRoute({
      summary: 'Delete Platform workload identity provider',
      description: 'Delete a provider after deleting all its federation rules.',
      operationId: 'DeletePlatformworkloadidentityprovider',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PlatformProviderDeletedResourceSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    describeRoute({
      summary: 'List Platform workload identity federation rules',
      description: "List the provider's federation rules to project service accounts.",
      operationId: 'ListPlatformworkloadidentityfederationrules',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PlatformFederationRuleListResourceSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    validator(
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
    describeRoute({
      summary: 'Create Platform workload identity federation rule',
      description: 'Bind verified token attributes to an existing project service account.',
      operationId: 'CreatePlatformworkloadidentityfederationrule',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PlatformFederationRuleSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    validator(
      'json',
      Schema.toStandardSchemaV1(CreatePlatformWorkloadIdentityFederationRuleBodySchema),
    ),
    (c) => {},
  )
  .get(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    describeRoute({
      summary: 'Retrieve Platform workload identity federation rule',
      description:
        'Retrieve a federation rule owned by the authenticated organization and provider.',
      operationId: 'RetrievePlatformworkloadidentityfederationrule',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PlatformFederationRuleSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    describeRoute({
      summary: 'Update Platform workload identity federation rule',
      description: 'Update supplied matcher, permission, metadata, or enabled fields.',
      operationId: 'UpdatePlatformworkloadidentityfederationrule',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PlatformFederationRuleSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    validator(
      'json',
      Schema.toStandardSchemaV1(UpdatePlatformWorkloadIdentityFederationRuleBodySchema),
    ),
    (c) => {},
  )
  .delete(
    '/organization/workload_identity_providers/:workload_identity_provider_id/federation_rules/:workload_identity_federation_rule_id',
    describeRoute({
      summary: 'Delete Platform workload identity federation rule',
      description: 'Delete a federation rule to a project service account.',
      operationId: 'DeletePlatformworkloadidentityfederationrule',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(PlatformFederationRuleDeletedResourceSchema),
              ),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    describeRoute({
      summary: 'Decisions',
      description: 'Get Decisions API usage details for the organization.',
      operationId: 'OrganizationDecisionsusage',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(PublicDecisionsUsageResponseResourceSchema),
              ),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(DecisionsUsageErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(DecisionsUsagePermissionErrorResponseSchema),
              ),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    describeRoute({
      summary: 'List external storage configurations',
      description: "List the organization's customer-managed external storage configurations.",
      operationId: 'Listexternalstorageconfigurations',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ExternalStorageListResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The organization is not enabled for external storage or the listing parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The organization or project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    describeRoute({
      summary: 'Create an external storage configuration',
      description: 'Register one customer-managed external storage configuration.',
      operationId: 'Createanexternalstorageconfiguration',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ExternalStorageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The external storage request is invalid or the organization or project does not support it.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The organization, project, or external storage was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '503': {
          description: 'External storage registration is temporarily unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator('json', Schema.toStandardSchemaV1(CreateExternalStorageBodySchema)),
    (c) => {},
  )
  .get(
    '/organization/external_storage/:external_storage_id',
    describeRoute({
      summary: 'Get an external storage configuration',
      description: 'Get one customer-managed external storage configuration.',
      operationId: 'Getanexternalstorageconfiguration',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ExternalStorageResponseSchema)),
            },
          },
        },
        '400': {
          description: 'The organization is not enabled for external storage.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The organization or external storage was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    describeRoute({
      summary: 'Delete an external storage configuration',
      description:
        "Disconnect a customer-managed external storage configuration. Removing the project's last configuration restores organization-default retention if customer-managed retention was active. Repeating a deletion also completes any interrupted retention update. Cloud storage is unchanged.",
      operationId: 'Deleteanexternalstorageconfiguration',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ExternalStorageDeletedResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The organization is not enabled for external storage.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The organization or external storage was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    describeRoute({
      summary: 'Validate an external storage configuration',
      description: 'Validate one customer-managed external storage configuration.',
      operationId: 'Validateanexternalstorageconfiguration',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ExternalStorageResponseSchema)),
            },
          },
        },
        '400': {
          description:
            'The external storage configuration is invalid or the organization or project does not support it.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The organization, project, or external storage was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '503': {
          description: 'External storage validation is temporarily unavailable.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          external_storage_id: Schema.String.annotate({ jsonSchemaExamples: ['extstorage_123'] }),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/spend_limit',
    describeRoute({
      summary: 'Get organization spend limit',
      description: "Get the organization's hard spend limit.",
      operationId: 'Getorganizationspendlimit',
      responses: {
        '200': {
          description: 'Hard spend limit retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(OrganizationSpendLimitResourceSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The organization does not have a hard spend limit.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    (c) => {},
  )
  .post(
    '/organization/spend_limit',
    describeRoute({
      summary: 'Update organization spend limit',
      description: "Create or replace the organization's hard spend limit.",
      operationId: 'Updateorganizationspendlimit',
      responses: {
        '200': {
          description: 'Hard spend limit created or replaced successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(OrganizationSpendLimitResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The requested spend limit is invalid or cannot be applied.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator('json', Schema.toStandardSchemaV1(UpdateOrganizationSpendLimitBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/spend_limit',
    describeRoute({
      summary: 'Delete organization spend limit',
      description: "Delete the organization's hard spend limit.",
      operationId: 'Deleteorganizationspendlimit',
      responses: {
        '200': {
          description: 'Hard spend limit deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(OrganizationSpendLimitDeletedResourceSchema),
              ),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The organization does not have a hard spend limit.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/spend_limit',
    describeRoute({
      summary: 'Get project spend limit',
      description: "Get a project's hard spend limit.",
      operationId: 'Getprojectspendlimit',
      responses: {
        '200': {
          description: 'Hard spend limit retrieved successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectSpendLimitResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The project ID is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project was not found or does not have a hard spend limit.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }) }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/spend_limit',
    describeRoute({
      summary: 'Update project spend limit',
      description: "Create or replace a project's hard spend limit.",
      operationId: 'Updateprojectspendlimit',
      responses: {
        '200': {
          description: 'Hard spend limit created or replaced successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectSpendLimitResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The requested spend limit is invalid or cannot be applied.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }) }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(UpdateProjectSpendLimitBodySchema)),
    (c) => {},
  )
  .delete(
    '/organization/projects/:project_id/spend_limit',
    describeRoute({
      summary: 'Delete project spend limit',
      description: "Delete a project's hard spend limit.",
      operationId: 'Deleteprojectspendlimit',
      responses: {
        '200': {
          description: 'Hard spend limit deleted successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectSpendLimitDeletedResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The project ID is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project was not found or does not have a hard spend limit.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String.annotate({ jsonSchemaExamples: ['proj_123'] }) }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/organization/projects/:project_id/service_tier_settings',
    describeRoute({
      summary: 'Retrieve project service tier settings',
      description: 'Retrieve the configured default and enabled service tiers for a project.',
      operationId: 'Retrieveprojectservicetiersettings',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectServiceTierSettingsResourceSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    describeRoute({
      summary: 'Update project service tier settings',
      description:
        'Update the default or enabled service tiers atomically. Supply at least one field. Omitted fields keep their current values.',
      operationId: 'Updateprojectservicetiersettings',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ProjectServiceTierSettingsResourceSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String.annotate({ description: 'The ID of the project' }),
        }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(UpdateProjectServiceTierSettingsBodySchema)),
    (c) => {},
  )
  .post(
    '/organization/projects/:project_id/service_accounts/:service_account_id/api_keys',
    describeRoute({
      summary: 'Create an API key for a service account',
      description: 'Creates an API key for a service account in the project.',
      operationId: 'CreateanAPIkeyforaserviceaccount',
      responses: {
        '200': {
          description: 'Service account API key created successfully.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ServiceAccountApiKeyBodySchema)),
            },
          },
        },
        '400': {
          description: 'The API key request is invalid or the project is archived.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The project or service account was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'Too many management requests. Reduce the request rate and try again later.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
      security: [{ AdminApiKeyAuth: [] }],
    }),
    validator(
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
    validator('json', Schema.toStandardSchemaV1(CreateProjectServiceAccountApiKeyBodySchema)),
    (c) => {},
  )
