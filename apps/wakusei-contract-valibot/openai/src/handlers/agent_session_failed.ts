import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postAgentSessionFailed = os.postAgentSessionFailed.handler(async ({ input }) => {})
