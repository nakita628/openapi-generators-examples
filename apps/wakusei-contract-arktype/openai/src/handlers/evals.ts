import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getEvals = os.getEvals.handler(async ({ input }) => {})
export const postEvals = os.postEvals.handler(async ({ input }) => {})
export const getEvalsEvalId = os.getEvalsEvalId.handler(async ({ input }) => {})
export const postEvalsEvalId = os.postEvalsEvalId.handler(async ({ input }) => {})
export const deleteEvalsEvalId = os.deleteEvalsEvalId.handler(async ({ input }) => {})
export const getEvalsEvalIdRuns = os.getEvalsEvalIdRuns.handler(async ({ input }) => {})
export const postEvalsEvalIdRuns = os.postEvalsEvalIdRuns.handler(async ({ input }) => {})
export const getEvalsEvalIdRunsRunId = os.getEvalsEvalIdRunsRunId.handler(async ({ input }) => {})
export const deleteEvalsEvalIdRunsRunId = os.deleteEvalsEvalIdRunsRunId.handler(
  async ({ input }) => {},
)
export const postEvalsEvalIdRunsRunIdCancel = os.postEvalsEvalIdRunsRunIdCancel.handler(
  async ({ input }) => {},
)
export const getEvalsEvalIdRunsRunIdOutputItems = os.getEvalsEvalIdRunsRunIdOutputItems.handler(
  async ({ input }) => {},
)
export const getEvalsEvalIdRunsRunIdOutputItemsOutputItemId =
  os.getEvalsEvalIdRunsRunIdOutputItemsOutputItemId.handler(async ({ input }) => {})
