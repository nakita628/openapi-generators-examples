import { t, type UnwrapSchema } from 'elysia'

export const ProjectsModel = {
  listProjectGroupRoleAssignmentsParams: t.Object({ project_id: t.String(), group_id: t.String() }),
  listProjectGroupRoleAssignmentsQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 1000 })),
    after: t.Optional(t.String()),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: undefined })),
  }),
  assignProjectGroupRoleParams: t.Object({ project_id: t.String(), group_id: t.String() }),
  retrieveProjectGroupRoleParams: t.Object({
    project_id: t.String(),
    group_id: t.String(),
    role_id: t.String(),
  }),
  unassignProjectGroupRoleParams: t.Object({
    project_id: t.String(),
    group_id: t.String(),
    role_id: t.String(),
  }),
  listProjectRolesParams: t.Object({ project_id: t.String() }),
  listProjectRolesQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 1000, default: 1000 })),
    after: t.Optional(t.String()),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'asc' })),
  }),
  createProjectRoleParams: t.Object({ project_id: t.String() }),
  retrieveProjectRoleParams: t.Object({ project_id: t.String(), role_id: t.String() }),
  updateProjectRoleParams: t.Object({ project_id: t.String(), role_id: t.String() }),
  deleteProjectRoleParams: t.Object({ project_id: t.String(), role_id: t.String() }),
  listProjectUserRoleAssignmentsParams: t.Object({ project_id: t.String(), user_id: t.String() }),
  listProjectUserRoleAssignmentsQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 1000 })),
    after: t.Optional(t.String()),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: undefined })),
  }),
  assignProjectUserRoleParams: t.Object({ project_id: t.String(), user_id: t.String() }),
  retrieveProjectUserRoleParams: t.Object({
    project_id: t.String(),
    user_id: t.String(),
    role_id: t.String(),
  }),
  unassignProjectUserRoleParams: t.Object({
    project_id: t.String(),
    user_id: t.String(),
    role_id: t.String(),
  }),
} as const

export type ProjectsModel = {
  [k in keyof typeof ProjectsModel]: UnwrapSchema<(typeof ProjectsModel)[k]>
}
