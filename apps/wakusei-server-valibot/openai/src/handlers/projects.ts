import { os } from '@orpc/server'
import * as v from 'valibot'
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
    v.object({
      project_id: v.string(),
      group_id: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer', minimum: 0, maximum: 1000 }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(1000),
        ),
      ),
      after: v.optional(v.string()),
      order: v.optional(v.picklist(['asc', 'desc'])),
    }),
  )
  .output(RoleListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      project_id: v.string(),
      group_id: v.string(),
      role_id: v.pipe(v.string(), v.description('Identifier of the role to assign.')),
    }),
  )
  .output(GroupRoleAssignmentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getProjectsProjectIdGroupsGroupIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/projects/{project_id}/groups/{group_id}/roles/{role_id}',
    tags: ['Project group role assignments'],
    summary: 'Retrieve project group role',
    description: 'Retrieves a project role assigned to a group.',
    successDescription: 'Project role retrieved for the group successfully.',
  })
  .input(v.object({ project_id: v.string(), group_id: v.string(), role_id: v.string() }))
  .output(AssignedRoleDetailsSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteProjectsProjectIdGroupsGroupIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/projects/{project_id}/groups/{group_id}/roles/{role_id}',
    tags: ['Project group role assignments'],
    summary: 'Unassign project role from group',
    description: 'Unassigns a project role from a group within a project.',
    successDescription: 'Project role unassigned from the group successfully.',
  })
  .input(v.object({ project_id: v.string(), group_id: v.string(), role_id: v.string() }))
  .output(DeletedRoleAssignmentResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      project_id: v.string(),
      limit: v.optional(
        v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer', minimum: 0, maximum: 1000 }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
              v.minValue(0),
              v.maxValue(1000),
            ),
            '1000',
          ),
          v.metadata({ default: 1000 }),
        ),
      ),
      after: v.optional(v.string()),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'asc')),
    }),
  )
  .output(PublicRoleListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      project_id: v.string(),
      role_name: v.pipe(v.string(), v.description('Unique name for the role.')),
      permissions: v.pipe(v.array(v.string()), v.description('Permissions to grant to the role.')),
      description: v.optional(
        v.pipe(v.union([v.string(), v.null()]), v.description('Optional description of the role.')),
      ),
    }),
  )
  .output(RoleSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getProjectsProjectIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/projects/{project_id}/roles/{role_id}',
    tags: ['Roles'],
    summary: 'Retrieve project role',
    description: 'Retrieves a project role.',
    successDescription: 'Project role retrieved successfully.',
  })
  .input(v.object({ project_id: v.string(), role_id: v.string() }))
  .output(RoleSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      project_id: v.string(),
      role_id: v.string(),
      permissions: v.optional(
        v.pipe(
          v.union([v.array(v.string()), v.null()]),
          v.description('Updated set of permissions for the role.'),
        ),
      ),
      description: v.optional(
        v.pipe(v.union([v.string(), v.null()]), v.description('New description for the role.')),
      ),
      role_name: v.optional(
        v.pipe(v.union([v.string(), v.null()]), v.description('New name for the role.')),
      ),
    }),
  )
  .output(RoleSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteProjectsProjectIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/projects/{project_id}/roles/{role_id}',
    tags: ['Roles'],
    summary: 'Delete project role',
    description: 'Deletes a custom role from a project.',
    successDescription: 'Project role deleted successfully.',
  })
  .input(v.object({ project_id: v.string(), role_id: v.string() }))
  .output(RoleDeletedResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      project_id: v.string(),
      user_id: v.string(),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^-?(?:0|[1-9]\d*)$/),
          v.metadata({ type: 'integer', minimum: 0, maximum: 1000 }),
          v.transform((input) => Number(input)),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(1000),
        ),
      ),
      after: v.optional(v.string()),
      order: v.optional(v.picklist(['asc', 'desc'])),
    }),
  )
  .output(RoleListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      project_id: v.string(),
      user_id: v.string(),
      role_id: v.pipe(v.string(), v.description('Identifier of the role to assign.')),
    }),
  )
  .output(UserRoleAssignmentSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getProjectsProjectIdUsersUserIdRolesRoleId = os
  .route({
    method: 'GET',
    path: '/projects/{project_id}/users/{user_id}/roles/{role_id}',
    tags: ['Project user role assignments'],
    summary: 'Retrieve project user role',
    description: 'Retrieves a project role assigned to a user.',
    successDescription: 'Project role retrieved for the user successfully.',
  })
  .input(v.object({ project_id: v.string(), user_id: v.string(), role_id: v.string() }))
  .output(AssignedRoleDetailsSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteProjectsProjectIdUsersUserIdRolesRoleId = os
  .route({
    method: 'DELETE',
    path: '/projects/{project_id}/users/{user_id}/roles/{role_id}',
    tags: ['Project user role assignments'],
    summary: 'Unassign project role from user',
    description: 'Unassigns a project role from a user within a project.',
    successDescription: 'Project role unassigned from the user successfully.',
  })
  .input(v.object({ project_id: v.string(), user_id: v.string(), role_id: v.string() }))
  .output(DeletedRoleAssignmentResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
