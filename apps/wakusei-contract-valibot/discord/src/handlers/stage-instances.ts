import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postStageInstances = os.postStageInstances.handler(async ({ input }) => {})
export const getStageInstancesChannelId = os.getStageInstancesChannelId.handler(
  async ({ input }) => {},
)
export const deleteStageInstancesChannelId = os.deleteStageInstancesChannelId.handler(
  async ({ input }) => {},
)
export const patchStageInstancesChannelId = os.patchStageInstancesChannelId.handler(
  async ({ input }) => {},
)
