import { Hono } from 'hono'
import {
  getProjectsProjectIdGroupsGroupIdRolesHandler,
  postProjectsProjectIdGroupsGroupIdRolesHandler,
  getProjectsProjectIdGroupsGroupIdRolesRoleIdHandler,
  deleteProjectsProjectIdGroupsGroupIdRolesRoleIdHandler,
  getProjectsProjectIdRolesHandler,
  postProjectsProjectIdRolesHandler,
  getProjectsProjectIdRolesRoleIdHandler,
  postProjectsProjectIdRolesRoleIdHandler,
  deleteProjectsProjectIdRolesRoleIdHandler,
  getProjectsProjectIdUsersUserIdRolesHandler,
  postProjectsProjectIdUsersUserIdRolesHandler,
  getProjectsProjectIdUsersUserIdRolesRoleIdHandler,
  deleteProjectsProjectIdUsersUserIdRolesRoleIdHandler,
} from '../routes'

export const projectsHandler = new Hono()
  .get(
    '/projects/:project_id/groups/:group_id/roles',
    getProjectsProjectIdGroupsGroupIdRolesHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/projects/:project_id/groups/:group_id/roles',
    postProjectsProjectIdGroupsGroupIdRolesHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    getProjectsProjectIdGroupsGroupIdRolesRoleIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    deleteProjectsProjectIdGroupsGroupIdRolesRoleIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/projects/:project_id/roles',
    getProjectsProjectIdRolesHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/projects/:project_id/roles',
    postProjectsProjectIdRolesHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/projects/:project_id/roles/:role_id',
    getProjectsProjectIdRolesRoleIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/projects/:project_id/roles/:role_id',
    postProjectsProjectIdRolesRoleIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/projects/:project_id/roles/:role_id',
    deleteProjectsProjectIdRolesRoleIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/projects/:project_id/users/:user_id/roles',
    getProjectsProjectIdUsersUserIdRolesHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/projects/:project_id/users/:user_id/roles',
    postProjectsProjectIdUsersUserIdRolesHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    getProjectsProjectIdUsersUserIdRolesRoleIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    deleteProjectsProjectIdUsersUserIdRolesRoleIdHandler(async (c, { param }) => {}),
  )
