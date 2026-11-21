import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getEvals = os.getEvals.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postEvals = os.postEvals.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getEvalsEvalId = os.getEvalsEvalId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postEvalsEvalId = os.postEvalsEvalId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteEvalsEvalId = os.deleteEvalsEvalId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getEvalsEvalIdRuns = os.getEvalsEvalIdRuns.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postEvalsEvalIdRuns = os.postEvalsEvalIdRuns.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getEvalsEvalIdRunsRunId = os.getEvalsEvalIdRunsRunId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteEvalsEvalIdRunsRunId = os.deleteEvalsEvalIdRunsRunId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postEvalsEvalIdRunsRunIdCancel = os.postEvalsEvalIdRunsRunIdCancel.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getEvalsEvalIdRunsRunIdOutputItems = os.getEvalsEvalIdRunsRunIdOutputItems.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getEvalsEvalIdRunsRunIdOutputItemsOutputItemId =
  os.getEvalsEvalIdRunsRunIdOutputItemsOutputItemId.handler(async ({ input }) => { throw new Error('Not implemented') })
