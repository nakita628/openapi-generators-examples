import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postBatchFailed = os.postBatchFailed.handler(async ({ input }) => { throw new Error('Not implemented') })
