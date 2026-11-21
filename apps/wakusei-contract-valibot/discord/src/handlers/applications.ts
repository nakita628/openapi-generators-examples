import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getApplicationsMe = os.getApplicationsMe.handler(async ({ input }) => {})
export const patchApplicationsMe = os.patchApplicationsMe.handler(async ({ input }) => {})
export const getApplicationsApplicationId = os.getApplicationsApplicationId.handler(
  async ({ input }) => {},
)
export const patchApplicationsApplicationId = os.patchApplicationsApplicationId.handler(
  async ({ input }) => {},
)
export const getApplicationsApplicationIdActivityInstancesInstanceId =
  os.getApplicationsApplicationIdActivityInstancesInstanceId.handler(async ({ input }) => {})
export const postApplicationsApplicationIdAttachment =
  os.postApplicationsApplicationIdAttachment.handler(async ({ input }) => {})
export const getApplicationsApplicationIdCommands = os.getApplicationsApplicationIdCommands.handler(
  async ({ input }) => {},
)
export const postApplicationsApplicationIdCommands =
  os.postApplicationsApplicationIdCommands.handler(async ({ input }) => {})
export const putApplicationsApplicationIdCommands = os.putApplicationsApplicationIdCommands.handler(
  async ({ input }) => {},
)
export const getApplicationsApplicationIdCommandsCommandId =
  os.getApplicationsApplicationIdCommandsCommandId.handler(async ({ input }) => {})
export const deleteApplicationsApplicationIdCommandsCommandId =
  os.deleteApplicationsApplicationIdCommandsCommandId.handler(async ({ input }) => {})
export const patchApplicationsApplicationIdCommandsCommandId =
  os.patchApplicationsApplicationIdCommandsCommandId.handler(async ({ input }) => {})
export const getApplicationsApplicationIdEmojis = os.getApplicationsApplicationIdEmojis.handler(
  async ({ input }) => {},
)
export const postApplicationsApplicationIdEmojis = os.postApplicationsApplicationIdEmojis.handler(
  async ({ input }) => {},
)
export const getApplicationsApplicationIdEmojisEmojiId =
  os.getApplicationsApplicationIdEmojisEmojiId.handler(async ({ input }) => {})
export const deleteApplicationsApplicationIdEmojisEmojiId =
  os.deleteApplicationsApplicationIdEmojisEmojiId.handler(async ({ input }) => {})
export const patchApplicationsApplicationIdEmojisEmojiId =
  os.patchApplicationsApplicationIdEmojisEmojiId.handler(async ({ input }) => {})
export const getApplicationsApplicationIdEntitlements =
  os.getApplicationsApplicationIdEntitlements.handler(async ({ input }) => {})
export const postApplicationsApplicationIdEntitlements =
  os.postApplicationsApplicationIdEntitlements.handler(async ({ input }) => {})
export const getApplicationsApplicationIdEntitlementsEntitlementId =
  os.getApplicationsApplicationIdEntitlementsEntitlementId.handler(async ({ input }) => {})
export const deleteApplicationsApplicationIdEntitlementsEntitlementId =
  os.deleteApplicationsApplicationIdEntitlementsEntitlementId.handler(async ({ input }) => {})
export const postApplicationsApplicationIdEntitlementsEntitlementIdConsume =
  os.postApplicationsApplicationIdEntitlementsEntitlementIdConsume.handler(async ({ input }) => {})
export const getApplicationsApplicationIdGuildsGuildIdCommands =
  os.getApplicationsApplicationIdGuildsGuildIdCommands.handler(async ({ input }) => {})
export const postApplicationsApplicationIdGuildsGuildIdCommands =
  os.postApplicationsApplicationIdGuildsGuildIdCommands.handler(async ({ input }) => {})
export const putApplicationsApplicationIdGuildsGuildIdCommands =
  os.putApplicationsApplicationIdGuildsGuildIdCommands.handler(async ({ input }) => {})
export const getApplicationsApplicationIdGuildsGuildIdCommandsPermissions =
  os.getApplicationsApplicationIdGuildsGuildIdCommandsPermissions.handler(async ({ input }) => {})
export const getApplicationsApplicationIdGuildsGuildIdCommandsCommandId =
  os.getApplicationsApplicationIdGuildsGuildIdCommandsCommandId.handler(async ({ input }) => {})
export const deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId =
  os.deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId.handler(async ({ input }) => {})
export const patchApplicationsApplicationIdGuildsGuildIdCommandsCommandId =
  os.patchApplicationsApplicationIdGuildsGuildIdCommandsCommandId.handler(async ({ input }) => {})
export const getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions =
  os.getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions.handler(
    async ({ input }) => {},
  )
export const putApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions =
  os.putApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions.handler(
    async ({ input }) => {},
  )
export const getApplicationsApplicationIdRoleConnectionsMetadata =
  os.getApplicationsApplicationIdRoleConnectionsMetadata.handler(async ({ input }) => {})
export const putApplicationsApplicationIdRoleConnectionsMetadata =
  os.putApplicationsApplicationIdRoleConnectionsMetadata.handler(async ({ input }) => {})
