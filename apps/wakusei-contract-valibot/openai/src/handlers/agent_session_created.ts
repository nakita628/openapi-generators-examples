import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postAgentSessionCreated = os.postAgentSessionCreated.handler(async ({ input }) => { throw new Error('Not implemented') })
