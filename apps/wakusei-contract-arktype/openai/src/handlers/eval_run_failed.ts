import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postEvalRunFailed = os.postEvalRunFailed.handler(async ({ input }) => {})
