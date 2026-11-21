import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getUsersMe = os.getUsersMe.handler(async ({ input }) => {})
export const patchUsersMe = os.patchUsersMe.handler(async ({ input }) => {})
export const getUsersMeApplicationsApplicationIdEntitlements =
  os.getUsersMeApplicationsApplicationIdEntitlements.handler(async ({ input }) => {})
export const getUsersMeApplicationsApplicationIdRoleConnection =
  os.getUsersMeApplicationsApplicationIdRoleConnection.handler(async ({ input }) => {})
export const putUsersMeApplicationsApplicationIdRoleConnection =
  os.putUsersMeApplicationsApplicationIdRoleConnection.handler(async ({ input }) => {})
export const deleteUsersMeApplicationsApplicationIdRoleConnection =
  os.deleteUsersMeApplicationsApplicationIdRoleConnection.handler(async ({ input }) => {})
export const postUsersMeChannels = os.postUsersMeChannels.handler(async ({ input }) => {})
export const getUsersMeConnections = os.getUsersMeConnections.handler(async ({ input }) => {})
export const getUsersMeGuilds = os.getUsersMeGuilds.handler(async ({ input }) => {})
export const deleteUsersMeGuildsGuildId = os.deleteUsersMeGuildsGuildId.handler(
  async ({ input }) => {},
)
export const getUsersMeGuildsGuildIdMember = os.getUsersMeGuildsGuildIdMember.handler(
  async ({ input }) => {},
)
export const getUsersUserId = os.getUsersUserId.handler(async ({ input }) => {})
