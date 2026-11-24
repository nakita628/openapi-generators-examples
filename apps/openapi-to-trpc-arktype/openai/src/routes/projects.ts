import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const projectsRouter = t.router({
  getProjectsProjectIdGroupsGroupIdRoles: t.procedure
    .input(
      type({
        project_id: 'string',
        group_id: 'string',
        'limit?': 'number.integer >= 0 & number.integer <= 1000',
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    )
    .output(RoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdGroupsGroupIdRoles: t.procedure
    .input(
      type({
        project_id: 'string',
        group_id: 'string',
        role_id: type('string').describe('Identifier of the role to assign.'),
      }),
    )
    .output(GroupRoleAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdGroupsGroupIdRolesRoleId: t.procedure
    .input(type({ project_id: 'string', group_id: 'string', role_id: 'string' }))
    .output(AssignedRoleDetailsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteProjectsProjectIdGroupsGroupIdRolesRoleId: t.procedure
    .input(type({ project_id: 'string', group_id: 'string', role_id: 'string' }))
    .output(DeletedRoleAssignmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdRoles: t.procedure
    .input(
      type({
        project_id: 'string',
        'limit?': 'number.integer >= 0 & number.integer <= 1000',
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    )
    .output(PublicRoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdRoles: t.procedure
    .input(
      type({
        project_id: 'string',
        role_name: type('string').describe('Unique name for the role.'),
        permissions: type('string[]').describe('Permissions to grant to the role.'),
        'description?': type('string | null').describe('Optional description of the role.'),
      }),
    )
    .output(RoleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdRolesRoleId: t.procedure
    .input(type({ project_id: 'string', role_id: 'string' }))
    .output(RoleSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdRolesRoleId: t.procedure
    .input(
      type({
        project_id: 'string',
        role_id: 'string',
        'permissions?': type('string[] | null').describe(
          'Updated set of permissions for the role.',
        ),
        'description?': type('string | null').describe('New description for the role.'),
        'role_name?': type('string | null').describe('New name for the role.'),
      }),
    )
    .output(RoleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteProjectsProjectIdRolesRoleId: t.procedure
    .input(type({ project_id: 'string', role_id: 'string' }))
    .output(RoleDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdUsersUserIdRoles: t.procedure
    .input(
      type({
        project_id: 'string',
        user_id: 'string',
        'limit?': 'number.integer >= 0 & number.integer <= 1000',
        'after?': 'string',
        'order?': "'asc' | 'desc'",
      }),
    )
    .output(RoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdUsersUserIdRoles: t.procedure
    .input(
      type({
        project_id: 'string',
        user_id: 'string',
        role_id: type('string').describe('Identifier of the role to assign.'),
      }),
    )
    .output(UserRoleAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdUsersUserIdRolesRoleId: t.procedure
    .input(type({ project_id: 'string', user_id: 'string', role_id: 'string' }))
    .output(AssignedRoleDetailsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteProjectsProjectIdUsersUserIdRolesRoleId: t.procedure
    .input(type({ project_id: 'string', user_id: 'string', role_id: 'string' }))
    .output(DeletedRoleAssignmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
