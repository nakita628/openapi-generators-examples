import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
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
          content: { 'application/json': { schema: resolver(RoleListResourceSchema) } },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string', group_id: 'string' })),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1000'),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
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
          content: { 'application/json': { schema: resolver(GroupRoleAssignmentSchema) } },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string', group_id: 'string' })),
    validator('json', PublicAssignOrganizationGroupRoleBodySchema),
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
          content: { 'application/json': { schema: resolver(AssignedRoleDetailsSchema) } },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string', group_id: 'string', role_id: 'string' })),
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
            'application/json': { schema: resolver(DeletedRoleAssignmentResourceSchema) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string', group_id: 'string', role_id: 'string' })),
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
          content: { 'application/json': { schema: resolver(PublicRoleListResourceSchema) } },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string' })),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1000'),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
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
          content: { 'application/json': { schema: resolver(RoleSchema) } },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string' })),
    validator('json', PublicCreateOrganizationRoleBodySchema),
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
          content: { 'application/json': { schema: resolver(RoleSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string', role_id: 'string' })),
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
          content: { 'application/json': { schema: resolver(RoleSchema) } },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string', role_id: 'string' })),
    validator('json', PublicUpdateOrganizationRoleBodySchema),
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
          content: { 'application/json': { schema: resolver(RoleDeletedResourceSchema) } },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string', role_id: 'string' })),
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
          content: { 'application/json': { schema: resolver(RoleListResourceSchema) } },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string', user_id: 'string' })),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1000'),
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
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
          content: { 'application/json': { schema: resolver(UserRoleAssignmentSchema) } },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string', user_id: 'string' })),
    validator('json', PublicAssignOrganizationGroupRoleBodySchema),
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
          content: { 'application/json': { schema: resolver(AssignedRoleDetailsSchema) } },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string', user_id: 'string', role_id: 'string' })),
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
            'application/json': { schema: resolver(DeletedRoleAssignmentResourceSchema) },
          },
        },
        '400': {
          description:
            'The request parameters are invalid or the requested operation cannot be performed.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '403': {
          description: 'The caller does not have permission to perform this operation.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The endpoint is unavailable or a requested resource was not found in this organization or project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ project_id: 'string', user_id: 'string', role_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
