import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          group_id: Schema.String,
          limit: Schema.optionalKey(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1000),
            ),
          ),
          after: Schema.optionalKey(Schema.String),
          order: Schema.optionalKey(Schema.Literals(['asc', 'desc'])),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RoleListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdGroupsGroupIdRoles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          group_id: Schema.String,
          role_id: Schema.String.annotate({ description: 'Identifier of the role to assign.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GroupRoleAssignmentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdGroupsGroupIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          group_id: Schema.String,
          role_id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AssignedRoleDetailsSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteProjectsProjectIdGroupsGroupIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          group_id: Schema.String,
          role_id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedRoleAssignmentResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdRoles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          limit: Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
            Schema.isLessThanOrEqualTo(1000),
          ).pipe(Schema.withDecodingDefault(Effect.succeed(1000))),
          after: Schema.optionalKey(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('asc')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PublicRoleListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdRoles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          role_name: Schema.String.annotate({ description: 'Unique name for the role.' }),
          permissions: Schema.Array(Schema.String).annotate({
            description: 'Permissions to grant to the role.',
          }),
          description: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Null]).annotate({
              description: 'Optional description of the role.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RoleSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, role_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RoleSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          role_id: Schema.String,
          permissions: Schema.optionalKey(
            Schema.Union([Schema.Array(Schema.String), Schema.Null]).annotate({
              description: 'Updated set of permissions for the role.',
            }),
          ),
          description: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Null]).annotate({
              description: 'New description for the role.',
            }),
          ),
          role_name: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Null]).annotate({
              description: 'New name for the role.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RoleSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteProjectsProjectIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, role_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RoleDeletedResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdUsersUserIdRoles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          user_id: Schema.String,
          limit: Schema.optionalKey(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1000),
            ),
          ),
          after: Schema.optionalKey(Schema.String),
          order: Schema.optionalKey(Schema.Literals(['asc', 'desc'])),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(RoleListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postProjectsProjectIdUsersUserIdRoles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          user_id: Schema.String,
          role_id: Schema.String.annotate({ description: 'Identifier of the role to assign.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UserRoleAssignmentSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getProjectsProjectIdUsersUserIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          user_id: Schema.String,
          role_id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AssignedRoleDetailsSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteProjectsProjectIdUsersUserIdRolesRoleId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          user_id: Schema.String,
          role_id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedRoleAssignmentResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
