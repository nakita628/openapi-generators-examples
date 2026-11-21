import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postBatchCancelled = os.postBatchCancelled.handler(async ({ input }) => {})
