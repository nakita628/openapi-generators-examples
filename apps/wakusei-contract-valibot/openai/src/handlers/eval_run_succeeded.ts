import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postEvalRunSucceeded = os.postEvalRunSucceeded.handler(async ({ input }) => {})
