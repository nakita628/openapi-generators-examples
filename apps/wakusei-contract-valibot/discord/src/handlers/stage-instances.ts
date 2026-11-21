import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postStageInstances = os.postStageInstances.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getStageInstancesChannelId = os.getStageInstancesChannelId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteStageInstancesChannelId = os.deleteStageInstancesChannelId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const patchStageInstancesChannelId = os.patchStageInstancesChannelId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
