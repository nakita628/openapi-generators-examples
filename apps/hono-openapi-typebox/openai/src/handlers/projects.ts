import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  AssignedRoleDetailsSchema,
  DeletedRoleAssignmentResourceSchema,
  ErrorResponseSchema,
  GroupRoleAssignmentSchema,
  PermissionErrorResponseSchema,
  PublicAssignOrganizationGroupRoleBodySchema,
  PublicCreateOrganizationRoleBodySchema,
  PublicRoleListResourceSchema,
  PublicUpdateOrganizationRoleBodySchema,
  RoleSchema,
  RoleDeletedResourceSchema,
  RoleListResourceSchema,
  UserRoleAssignmentSchema,
  TooManyRequestsResponse,
} from '../components'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

export const projectsHandler = new Hono()
  .get(
    '/projects/:project_id/groups/:group_id/roles',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List project group role assignments',
      description: 'Lists the project roles assigned to a group within a project.',
      operationId: 'list-project-group-role-assignments',
      tags: ['Project group role assignments'],
      responses: {
        '200': {
          description: 'Project group role assignments listed successfully.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(RoleListResourceSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ project_id: Type.String(), group_id: Type.String() })),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.Refine(
                    Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                    (value) => Number.isSafeInteger(Number(value)),
                    () => 'must be a safe integer',
                  ),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/groups/:group_id/roles',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Assign project role to group',
      description: 'Assigns a project role to a group within a project.',
      operationId: 'assign-project-group-role',
      tags: ['Project group role assignments'],
      responses: {
        '200': {
          description: 'Project role assigned to the group successfully.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(GroupRoleAssignmentSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ project_id: Type.String(), group_id: Type.String() })),
    ),
    validator('json', toStandardSchemaV1(PublicAssignOrganizationGroupRoleBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve project group role',
      description: 'Retrieves a project role assigned to a group.',
      operationId: 'retrieve-project-group-role',
      tags: ['Project group role assignments'],
      responses: {
        '200': {
          description: 'Project role retrieved for the group successfully.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(AssignedRoleDetailsSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ project_id: Type.String(), group_id: Type.String(), role_id: Type.String() }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Unassign project role from group',
      description: 'Unassigns a project role from a group within a project.',
      operationId: 'unassign-project-group-role',
      tags: ['Project group role assignments'],
      responses: {
        '200': {
          description: 'Project role unassigned from the group successfully.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedRoleAssignmentResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ project_id: Type.String(), group_id: Type.String(), role_id: Type.String() }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/roles',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List project roles',
      description: 'Lists the roles configured for a project.',
      operationId: 'list-project-roles',
      tags: ['Roles'],
      responses: {
        '200': {
          description: 'Project roles listed successfully.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PublicRoleListResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ project_id: Type.String() }))),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.Refine(
                    Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '1000' }),
                    (value) => Number.isSafeInteger(Number(value)),
                    () => 'must be a safe integer',
                  ),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/roles',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Create project role',
      description: 'Creates a custom role for a project.',
      operationId: 'create-project-role',
      tags: ['Roles'],
      responses: {
        '200': {
          description: 'Project role created successfully.',
          content: { 'application/json': { schema: resolver(toStandardSchemaV1(RoleSchema)) } },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ project_id: Type.String() }))),
    validator('json', toStandardSchemaV1(PublicCreateOrganizationRoleBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve project role',
      description: 'Retrieves a project role.',
      operationId: 'retrieve-project-role',
      tags: ['Roles'],
      responses: {
        '200': {
          description: 'Project role retrieved successfully.',
          content: { 'application/json': { schema: resolver(toStandardSchemaV1(RoleSchema)) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ project_id: Type.String(), role_id: Type.String() })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Update project role',
      description: 'Updates an existing project role.',
      operationId: 'update-project-role',
      tags: ['Roles'],
      responses: {
        '200': {
          description: 'Project role updated successfully.',
          content: { 'application/json': { schema: resolver(toStandardSchemaV1(RoleSchema)) } },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ project_id: Type.String(), role_id: Type.String() })),
    ),
    validator('json', toStandardSchemaV1(PublicUpdateOrganizationRoleBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Delete project role',
      description: 'Deletes a custom role from a project.',
      operationId: 'delete-project-role',
      tags: ['Roles'],
      responses: {
        '200': {
          description: 'Project role deleted successfully.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(RoleDeletedResourceSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ project_id: Type.String(), role_id: Type.String() })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/users/:user_id/roles',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'List project user role assignments',
      description: 'Lists the project roles assigned to a user within a project.',
      operationId: 'list-project-user-role-assignments',
      tags: ['Project user role assignments'],
      responses: {
        '200': {
          description: 'Project user role assignments listed successfully.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(RoleListResourceSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ project_id: Type.String(), user_id: Type.String() })),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.Refine(
                    Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                    (value) => Number.isSafeInteger(Number(value)),
                    () => 'must be a safe integer',
                  ),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/users/:user_id/roles',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Assign project role to user',
      description: 'Assigns a project role to a user within a project.',
      operationId: 'assign-project-user-role',
      tags: ['Project user role assignments'],
      responses: {
        '200': {
          description: 'Project role assigned to the user successfully.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(UserRoleAssignmentSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ project_id: Type.String(), user_id: Type.String() })),
    ),
    validator('json', toStandardSchemaV1(PublicAssignOrganizationGroupRoleBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Retrieve project user role',
      description: 'Retrieves a project role assigned to a user.',
      operationId: 'retrieve-project-user-role',
      tags: ['Project user role assignments'],
      responses: {
        '200': {
          description: 'Project role retrieved for the user successfully.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(AssignedRoleDetailsSchema)) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ project_id: Type.String(), user_id: Type.String(), role_id: Type.String() }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    describeRoute({
      security: [{ AdminApiKeyAuth: [] }],
      summary: 'Unassign project role from user',
      description: 'Unassigns a project role from a user within a project.',
      operationId: 'unassign-project-user-role',
      tags: ['Project user role assignments'],
      responses: {
        '200': {
          description: 'Project role unassigned from the user successfully.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedRoleAssignmentResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ project_id: Type.String(), user_id: Type.String(), role_id: Type.String() }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
