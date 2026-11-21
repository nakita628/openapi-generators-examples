import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postRealtimeCallIncoming = os.postRealtimeCallIncoming.handler(async ({ input }) => {})
