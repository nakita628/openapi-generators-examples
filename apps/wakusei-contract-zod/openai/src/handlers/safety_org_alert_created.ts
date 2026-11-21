import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postSafetyOrgAlertCreated = os.postSafetyOrgAlertCreated.handler(
  async ({ input }) => {},
)
