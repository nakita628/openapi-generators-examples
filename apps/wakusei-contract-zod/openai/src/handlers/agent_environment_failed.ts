import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postAgentEnvironmentFailed = os.postAgentEnvironmentFailed.handler(
  async ({ input }) => {},
)
