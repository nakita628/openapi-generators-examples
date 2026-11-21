import { os } from '@orpc/server'
import { type } from 'arktype'
import {
  AssignedRoleDetailsSchema,
  DeletedRoleAssignmentResourceSchema,
  GroupRoleAssignmentSchema,
  PublicRoleListResourceSchema,
  RoleDeletedResourceSchema,
  RoleListResourceSchema,
  RoleSchema,
  UserRoleAssignmentSchema,
} from '../components'

export const getProjectsProjectIdGroupsGroupIdRoles = os
  .route({
    method: 'GET',
    path: '/projects/{project_id}/groups/{group_id}/roles',
    tags: ['Project group role assignments'],
    summary: 'List project group role assignments',
    description: 'Lists the project roles assigned to a group within a project.',
    successDescription: 'Project group role assignments listed successfully.',
  })
  .input(
    type({
      project_id: type('string'),
      group_id: type('string'),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 1000'),
      'after?': type('string'),
      'order?': type("'asc' | 'desc'"),
    }),
  )
  .output(RoleListResourceSchema)
  .handler(async ({ input }) => {})

export const postProjectsProjectIdGroupsGroupIdRoles = os
  .route({
    method: 'POST',
    path: '/projects/{project_id}/groups/{group_id}/roles',
    tags: ['Project group role assignments'],
    summary: 'Assign project role to group',
    description: 'Assigns a project role to a group within a project.',
    successDescription: 'Project role assigned to the group successfully.',
  })
  .input(
    type({
      project_id: type('string'),
      group_id: type('string'),
      role_id: type('string').describe('Identifier of the role to assign.'),
    }),
  )
  .output(GroupRoleAssignmentSchema)
  .handler(async ({ input }) => {})

export const getProjectsProjectIdGroupsGroupIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/projects/{project_id}/groups/{group_id}/roles/{role_id}',
    tags: ['Project group role assignments'],
    summary: 'Retrieve project group role',
    description: 'Retrieves a project role assigned to a group.',
    successDescription: 'Project role retrieved for the group successfully.',
  })
  .input(type({ project_id: type('string'), group_id: type('string'), role_id: type('string') }))
  .output(AssignedRoleDetailsSchema)
  .handler(async ({ input }) => {})

export const deleteProjectsProjectIdGroupsGroupIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/projects/{project_id}/groups/{group_id}/roles/{role_id}',
    tags: ['Project group role assignments'],
    summary: 'Unassign project role from group',
    description: 'Unassigns a project role from a group within a project.',
    successDescription: 'Project role unassigned from the group successfully.',
  })
  .input(type({ project_id: type('string'), group_id: type('string'), role_id: type('string') }))
  .output(DeletedRoleAssignmentResourceSchema)
  .handler(async ({ input }) => {})

export const getProjectsProjectIdRoles = os
  .route({
    method: 'GET',
    path: '/projects/{project_id}/roles',
    tags: ['Roles'],
    summary: 'List project roles',
    description: 'Lists the roles configured for a project.',
    successDescription: 'Project roles listed successfully.',
  })
  .input(
    type({
      project_id: type('string'),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 1000'),
      'after?': type('string'),
      'order?': type("'asc' | 'desc'"),
    }),
  )
  .output(PublicRoleListResourceSchema)
  .handler(async ({ input }) => {})

export const postProjectsProjectIdRoles = os
  .route({
    method: 'POST',
    path: '/projects/{project_id}/roles',
    tags: ['Roles'],
    summary: 'Create project role',
    description: 'Creates a custom role for a project.',
    successDescription: 'Project role created successfully.',
  })
  .input(
    type({
      project_id: type('string'),
      role_name: type('string').describe('Unique name for the role.'),
      permissions: type('string[]').describe('Permissions to grant to the role.'),
      'description?': type('string | null | null').describe('Optional description of the role.'),
    }),
  )
  .output(RoleSchema)
  .handler(async ({ input }) => {})

export const getProjectsProjectIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/projects/{project_id}/roles/{role_id}',
    tags: ['Roles'],
    summary: 'Retrieve project role',
    description: 'Retrieves a project role.',
    successDescription: 'Project role retrieved successfully.',
  })
  .input(type({ project_id: type('string'), role_id: type('string') }))
  .output(RoleSchema)
  .handler(async ({ input }) => {})

export const postProjectsProjectIdRolesRoleId = os
  .route({
    method: 'POST',
    path: '/projects/{project_id}/roles/{role_id}',
    tags: ['Roles'],
    summary: 'Update project role',
    description: 'Updates an existing project role.',
    successDescription: 'Project role updated successfully.',
  })
  .input(
    type({
      project_id: type('string'),
      role_id: type('string'),
      'permissions?': type('string[] | null | null').describe(
        'Updated set of permissions for the role.',
      ),
      'description?': type('string | null | null').describe('New description for the role.'),
      'role_name?': type('string | null | null').describe('New name for the role.'),
    }),
  )
  .output(RoleSchema)
  .handler(async ({ input }) => {})

export const deleteProjectsProjectIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/projects/{project_id}/roles/{role_id}',
    tags: ['Roles'],
    summary: 'Delete project role',
    description: 'Deletes a custom role from a project.',
    successDescription: 'Project role deleted successfully.',
  })
  .input(type({ project_id: type('string'), role_id: type('string') }))
  .output(RoleDeletedResourceSchema)
  .handler(async ({ input }) => {})

export const getProjectsProjectIdUsersUserIdRoles = os
  .route({
    method: 'GET',
    path: '/projects/{project_id}/users/{user_id}/roles',
    tags: ['Project user role assignments'],
    summary: 'List project user role assignments',
    description: 'Lists the project roles assigned to a user within a project.',
    successDescription: 'Project user role assignments listed successfully.',
  })
  .input(
    type({
      project_id: type('string'),
      user_id: type('string'),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 1000'),
      'after?': type('string'),
      'order?': type("'asc' | 'desc'"),
    }),
  )
  .output(RoleListResourceSchema)
  .handler(async ({ input }) => {})

export const postProjectsProjectIdUsersUserIdRoles = os
  .route({
    method: 'POST',
    path: '/projects/{project_id}/users/{user_id}/roles',
    tags: ['Project user role assignments'],
    summary: 'Assign project role to user',
    description: 'Assigns a project role to a user within a project.',
    successDescription: 'Project role assigned to the user successfully.',
  })
  .input(
    type({
      project_id: type('string'),
      user_id: type('string'),
      role_id: type('string').describe('Identifier of the role to assign.'),
    }),
  )
  .output(UserRoleAssignmentSchema)
  .handler(async ({ input }) => {})

export const getProjectsProjectIdUsersUserIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/projects/{project_id}/users/{user_id}/roles/{role_id}',
    tags: ['Project user role assignments'],
    summary: 'Retrieve project user role',
    description: 'Retrieves a project role assigned to a user.',
    successDescription: 'Project role retrieved for the user successfully.',
  })
  .input(type({ project_id: type('string'), user_id: type('string'), role_id: type('string') }))
  .output(AssignedRoleDetailsSchema)
  .handler(async ({ input }) => {})

export const deleteProjectsProjectIdUsersUserIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/projects/{project_id}/users/{user_id}/roles/{role_id}',
    tags: ['Project user role assignments'],
    summary: 'Unassign project role from user',
    description: 'Unassigns a project role from a user within a project.',
    successDescription: 'Project role unassigned from the user successfully.',
  })
  .input(type({ project_id: type('string'), user_id: type('string'), role_id: type('string') }))
  .output(DeletedRoleAssignmentResourceSchema)
  .handler(async ({ input }) => {})
