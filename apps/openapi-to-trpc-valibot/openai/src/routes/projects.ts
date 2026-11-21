import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const projectsRouter = t.router({
  getProjectsProjectIdGroupsGroupIdRoles: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        group_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(1000))),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc'])),
      }),
    )
    .output(RoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdGroupsGroupIdRoles: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        group_id: v.string(),
        role_id: v.pipe(v.string(), v.description('Identifier of the role to assign.')),
      }),
    )
    .output(GroupRoleAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdGroupsGroupIdRolesRoleId: t.procedure
    .input(v.object({ project_id: v.string(), group_id: v.string(), role_id: v.string() }))
    .output(AssignedRoleDetailsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteProjectsProjectIdGroupsGroupIdRolesRoleId: t.procedure
    .input(v.object({ project_id: v.string(), group_id: v.string(), role_id: v.string() }))
    .output(DeletedRoleAssignmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdRoles: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(1000)), 1000),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    )
    .output(PublicRoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdRoles: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        role_name: v.pipe(v.string(), v.description('Unique name for the role.')),
        permissions: v.pipe(
          v.array(v.string()),
          v.description('Permissions to grant to the role.'),
        ),
        description: v.optional(
          v.pipe(
            v.union([v.string(), v.nullable(v.null())]),
            v.description('Optional description of the role.'),
          ),
        ),
      }),
    )
    .output(RoleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdRolesRoleId: t.procedure
    .input(v.object({ project_id: v.string(), role_id: v.string() }))
    .output(RoleSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdRolesRoleId: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        role_id: v.string(),
        permissions: v.optional(
          v.pipe(
            v.union([v.array(v.string()), v.nullable(v.null())]),
            v.description('Updated set of permissions for the role.'),
          ),
        ),
        description: v.optional(
          v.pipe(
            v.union([v.string(), v.nullable(v.null())]),
            v.description('New description for the role.'),
          ),
        ),
        role_name: v.optional(
          v.pipe(
            v.union([v.string(), v.nullable(v.null())]),
            v.description('New name for the role.'),
          ),
        ),
      }),
    )
    .output(RoleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteProjectsProjectIdRolesRoleId: t.procedure
    .input(v.object({ project_id: v.string(), role_id: v.string() }))
    .output(RoleDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdUsersUserIdRoles: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        user_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(1000))),
        after: v.optional(v.string()),
        order: v.optional(v.picklist(['asc', 'desc'])),
      }),
    )
    .output(RoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdUsersUserIdRoles: t.procedure
    .input(
      v.object({
        project_id: v.string(),
        user_id: v.string(),
        role_id: v.pipe(v.string(), v.description('Identifier of the role to assign.')),
      }),
    )
    .output(UserRoleAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdUsersUserIdRolesRoleId: t.procedure
    .input(v.object({ project_id: v.string(), user_id: v.string(), role_id: v.string() }))
    .output(AssignedRoleDetailsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteProjectsProjectIdUsersUserIdRolesRoleId: t.procedure
    .input(v.object({ project_id: v.string(), user_id: v.string(), role_id: v.string() }))
    .output(DeletedRoleAssignmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
