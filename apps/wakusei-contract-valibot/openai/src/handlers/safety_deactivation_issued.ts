import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postSafetyDeactivationIssued = os.postSafetyDeactivationIssued.handler(
  async ({ input }) => {},
)
