import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        project_id: z.string(),
        group_id: z.string(),
        limit: z.int().min(0).max(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
      }),
    )
    .output(RoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdGroupsGroupIdRoles: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        group_id: z.string(),
        role_id: z.string().meta({ description: 'Identifier of the role to assign.' }),
      }),
    )
    .output(GroupRoleAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdGroupsGroupIdRolesRoleId: t.procedure
    .input(z.object({ project_id: z.string(), group_id: z.string(), role_id: z.string() }))
    .output(AssignedRoleDetailsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteProjectsProjectIdGroupsGroupIdRolesRoleId: t.procedure
    .input(z.object({ project_id: z.string(), group_id: z.string(), role_id: z.string() }))
    .output(DeletedRoleAssignmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdRoles: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        limit: z.int().min(0).max(1000).default(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    )
    .output(PublicRoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdRoles: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        role_name: z.string().meta({ description: 'Unique name for the role.' }),
        permissions: z.array(z.string()).meta({ description: 'Permissions to grant to the role.' }),
        description: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'Optional description of the role.' })
          .exactOptional(),
      }),
    )
    .output(RoleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdRolesRoleId: t.procedure
    .input(z.object({ project_id: z.string(), role_id: z.string() }))
    .output(RoleSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdRolesRoleId: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        role_id: z.string(),
        permissions: z
          .union([z.array(z.string()), z.null().nullable()])
          .meta({ description: 'Updated set of permissions for the role.' })
          .exactOptional(),
        description: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'New description for the role.' })
          .exactOptional(),
        role_name: z
          .union([z.string(), z.null().nullable()])
          .meta({ description: 'New name for the role.' })
          .exactOptional(),
      }),
    )
    .output(RoleSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteProjectsProjectIdRolesRoleId: t.procedure
    .input(z.object({ project_id: z.string(), role_id: z.string() }))
    .output(RoleDeletedResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdUsersUserIdRoles: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        user_id: z.string(),
        limit: z.int().min(0).max(1000).exactOptional(),
        after: z.string().exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
      }),
    )
    .output(RoleListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdUsersUserIdRoles: t.procedure
    .input(
      z.object({
        project_id: z.string(),
        user_id: z.string(),
        role_id: z.string().meta({ description: 'Identifier of the role to assign.' }),
      }),
    )
    .output(UserRoleAssignmentSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdUsersUserIdRolesRoleId: t.procedure
    .input(z.object({ project_id: z.string(), user_id: z.string(), role_id: z.string() }))
    .output(AssignedRoleDetailsSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteProjectsProjectIdUsersUserIdRolesRoleId: t.procedure
    .input(z.object({ project_id: z.string(), user_id: z.string(), role_id: z.string() }))
    .output(DeletedRoleAssignmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
