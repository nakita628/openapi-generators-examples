import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getProjectsProjectIdGroupsGroupIdRoles =
  os.getProjectsProjectIdGroupsGroupIdRoles.handler(async ({ input }) => {})
export const postProjectsProjectIdGroupsGroupIdRoles =
  os.postProjectsProjectIdGroupsGroupIdRoles.handler(async ({ input }) => {})
export const getProjectsProjectIdGroupsGroupIdRolesRoleId =
  os.getProjectsProjectIdGroupsGroupIdRolesRoleId.handler(async ({ input }) => {})
export const deleteProjectsProjectIdGroupsGroupIdRolesRoleId =
  os.deleteProjectsProjectIdGroupsGroupIdRolesRoleId.handler(async ({ input }) => {})
export const getProjectsProjectIdRoles = os.getProjectsProjectIdRoles.handler(
  async ({ input }) => {},
)
export const postProjectsProjectIdRoles = os.postProjectsProjectIdRoles.handler(
  async ({ input }) => {},
)
export const getProjectsProjectIdRolesRoleId = os.getProjectsProjectIdRolesRoleId.handler(
  async ({ input }) => {},
)
export const postProjectsProjectIdRolesRoleId = os.postProjectsProjectIdRolesRoleId.handler(
  async ({ input }) => {},
)
export const deleteProjectsProjectIdRolesRoleId = os.deleteProjectsProjectIdRolesRoleId.handler(
  async ({ input }) => {},
)
export const getProjectsProjectIdUsersUserIdRoles = os.getProjectsProjectIdUsersUserIdRoles.handler(
  async ({ input }) => {},
)
export const postProjectsProjectIdUsersUserIdRoles =
  os.postProjectsProjectIdUsersUserIdRoles.handler(async ({ input }) => {})
export const getProjectsProjectIdUsersUserIdRolesRoleId =
  os.getProjectsProjectIdUsersUserIdRolesRoleId.handler(async ({ input }) => {})
export const deleteProjectsProjectIdUsersUserIdRolesRoleId =
  os.deleteProjectsProjectIdUsersUserIdRolesRoleId.handler(async ({ input }) => {})
