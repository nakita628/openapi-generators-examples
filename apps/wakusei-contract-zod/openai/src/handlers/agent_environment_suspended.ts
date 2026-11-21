import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postAgentEnvironmentSuspended = os.postAgentEnvironmentSuspended.handler(
  async ({ input }) => {},
)
