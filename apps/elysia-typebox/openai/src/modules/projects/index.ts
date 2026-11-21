import { Elysia } from 'elysia'
import {
  AssignedRoleDetailsSchema,
  DeletedRoleAssignmentResourceSchema,
  ErrorSchema,
  ErrorResponseSchema,
  GroupSchema,
  GroupRoleAssignmentSchema,
  MisalignmentErrorDetailsResourceSchema,
  PermissionErrorResponseSchema,
  PublicAssignOrganizationGroupRoleBodySchema,
  PublicCreateOrganizationRoleBodySchema,
  PublicRoleListResourceSchema,
  PublicUpdateOrganizationRoleBodySchema,
  RoleSchema,
  RoleDeletedResourceSchema,
  RoleListResourceSchema,
  UserSchema,
  UserRoleAssignmentSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { ProjectsModel } from './model'

export const projects = new Elysia()
  .model({
    AssignedRoleDetails: AssignedRoleDetailsSchema,
    DeletedRoleAssignmentResource: DeletedRoleAssignmentResourceSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    Group: GroupSchema,
    GroupRoleAssignment: GroupRoleAssignmentSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    PermissionErrorResponse: PermissionErrorResponseSchema,
    PublicAssignOrganizationGroupRoleBody: PublicAssignOrganizationGroupRoleBodySchema,
    PublicCreateOrganizationRoleBody: PublicCreateOrganizationRoleBodySchema,
    PublicRoleListResource: PublicRoleListResourceSchema,
    PublicUpdateOrganizationRoleBody: PublicUpdateOrganizationRoleBodySchema,
    Role: RoleSchema,
    RoleDeletedResource: RoleDeletedResourceSchema,
    RoleListResource: RoleListResourceSchema,
    User: UserSchema,
    UserRoleAssignment: UserRoleAssignmentSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .get('/projects/:project_id/groups/:group_id/roles', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.listProjectGroupRoleAssignmentsParams,
    query: ProjectsModel.listProjectGroupRoleAssignmentsQuery,
    response: {
      200: 'RoleListResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Project group role assignments'],
      summary: 'List project group role assignments',
      description: 'Lists the project roles assigned to a group within a project.',
      operationId: 'list-project-group-role-assignments',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/projects/:project_id/groups/:group_id/roles', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.assignProjectGroupRoleParams,
    body: 'PublicAssignOrganizationGroupRoleBody',
    response: {
      200: 'GroupRoleAssignment',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Project group role assignments'],
      summary: 'Assign project role to group',
      description: 'Assigns a project role to a group within a project.',
      operationId: 'assign-project-group-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/projects/:project_id/groups/:group_id/roles/:role_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.retrieveProjectGroupRoleParams,
    response: {
      200: 'AssignedRoleDetails',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Project group role assignments'],
      summary: 'Retrieve project group role',
      description: 'Retrieves a project role assigned to a group.',
      operationId: 'retrieve-project-group-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/projects/:project_id/groups/:group_id/roles/:role_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.unassignProjectGroupRoleParams,
    response: {
      200: 'DeletedRoleAssignmentResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Project group role assignments'],
      summary: 'Unassign project role from group',
      description: 'Unassigns a project role from a group within a project.',
      operationId: 'unassign-project-group-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/projects/:project_id/roles', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.listProjectRolesParams,
    query: ProjectsModel.listProjectRolesQuery,
    response: {
      200: 'PublicRoleListResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Roles'],
      summary: 'List project roles',
      description: 'Lists the roles configured for a project.',
      operationId: 'list-project-roles',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/projects/:project_id/roles', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.createProjectRoleParams,
    body: 'PublicCreateOrganizationRoleBody',
    response: {
      200: 'Role',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Roles'],
      summary: 'Create project role',
      description: 'Creates a custom role for a project.',
      operationId: 'create-project-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/projects/:project_id/roles/:role_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.retrieveProjectRoleParams,
    response: {
      200: 'Role',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Roles'],
      summary: 'Retrieve project role',
      description: 'Retrieves a project role.',
      operationId: 'retrieve-project-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/projects/:project_id/roles/:role_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.updateProjectRoleParams,
    body: 'PublicUpdateOrganizationRoleBody',
    response: {
      200: 'Role',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Roles'],
      summary: 'Update project role',
      description: 'Updates an existing project role.',
      operationId: 'update-project-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/projects/:project_id/roles/:role_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.deleteProjectRoleParams,
    response: {
      200: 'RoleDeletedResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Roles'],
      summary: 'Delete project role',
      description: 'Deletes a custom role from a project.',
      operationId: 'delete-project-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/projects/:project_id/users/:user_id/roles', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.listProjectUserRoleAssignmentsParams,
    query: ProjectsModel.listProjectUserRoleAssignmentsQuery,
    response: {
      200: 'RoleListResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Project user role assignments'],
      summary: 'List project user role assignments',
      description: 'Lists the project roles assigned to a user within a project.',
      operationId: 'list-project-user-role-assignments',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .post('/projects/:project_id/users/:user_id/roles', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.assignProjectUserRoleParams,
    body: 'PublicAssignOrganizationGroupRoleBody',
    response: {
      200: 'UserRoleAssignment',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Project user role assignments'],
      summary: 'Assign project role to user',
      description: 'Assigns a project role to a user within a project.',
      operationId: 'assign-project-user-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .get('/projects/:project_id/users/:user_id/roles/:role_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.retrieveProjectUserRoleParams,
    response: {
      200: 'AssignedRoleDetails',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Project user role assignments'],
      summary: 'Retrieve project user role',
      description: 'Retrieves a project role assigned to a user.',
      operationId: 'retrieve-project-user-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
  .delete('/projects/:project_id/users/:user_id/roles/:role_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ProjectsModel.unassignProjectUserRoleParams,
    response: {
      200: 'DeletedRoleAssignmentResource',
      400: 'ErrorResponse',
      403: 'PermissionErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Project user role assignments'],
      summary: 'Unassign project role from user',
      description: 'Unassigns a project role from a user within a project.',
      operationId: 'unassign-project-user-role',
      security: [{ AdminApiKeyAuth: [] }],
    },
  })
