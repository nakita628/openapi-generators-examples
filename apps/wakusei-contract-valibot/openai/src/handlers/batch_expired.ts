import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postBatchExpired = os.postBatchExpired.handler(async ({ input }) => {})
