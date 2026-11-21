import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postAgentSessionInProgress = os.postAgentSessionInProgress.handler(
  async ({ input }) => {},
)
