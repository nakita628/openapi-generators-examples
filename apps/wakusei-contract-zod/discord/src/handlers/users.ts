import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getUsersMe = os.getUsersMe.handler(async ({ input }) => { throw new Error('Not implemented') })
export const patchUsersMe = os.patchUsersMe.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getUsersMeApplicationsApplicationIdEntitlements =
  os.getUsersMeApplicationsApplicationIdEntitlements.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getUsersMeApplicationsApplicationIdRoleConnection =
  os.getUsersMeApplicationsApplicationIdRoleConnection.handler(async ({ input }) => { throw new Error('Not implemented') })
export const putUsersMeApplicationsApplicationIdRoleConnection =
  os.putUsersMeApplicationsApplicationIdRoleConnection.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteUsersMeApplicationsApplicationIdRoleConnection =
  os.deleteUsersMeApplicationsApplicationIdRoleConnection.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postUsersMeChannels = os.postUsersMeChannels.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getUsersMeConnections = os.getUsersMeConnections.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getUsersMeGuilds = os.getUsersMeGuilds.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteUsersMeGuildsGuildId = os.deleteUsersMeGuildsGuildId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getUsersMeGuildsGuildIdMember = os.getUsersMeGuildsGuildIdMember.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getUsersUserId = os.getUsersUserId.handler(async ({ input }) => { throw new Error('Not implemented') })
