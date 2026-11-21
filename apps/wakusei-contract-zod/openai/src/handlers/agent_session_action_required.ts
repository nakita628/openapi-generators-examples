import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postAgentSessionActionRequired = os.postAgentSessionActionRequired.handler(
  async ({ input }) => {},
)
