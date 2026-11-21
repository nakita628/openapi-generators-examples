import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postLiveCallIncoming = os.postLiveCallIncoming.handler(async ({ input }) => {})
