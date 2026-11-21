import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postThreads = os.postThreads.handler(async ({ input }) => {})
export const postThreadsRuns = os.postThreadsRuns.handler(async ({ input }) => {})
export const getThreadsThreadId = os.getThreadsThreadId.handler(async ({ input }) => {})
export const postThreadsThreadId = os.postThreadsThreadId.handler(async ({ input }) => {})
export const deleteThreadsThreadId = os.deleteThreadsThreadId.handler(async ({ input }) => {})
export const getThreadsThreadIdMessages = os.getThreadsThreadIdMessages.handler(
  async ({ input }) => {},
)
export const postThreadsThreadIdMessages = os.postThreadsThreadIdMessages.handler(
  async ({ input }) => {},
)
export const getThreadsThreadIdMessagesMessageId = os.getThreadsThreadIdMessagesMessageId.handler(
  async ({ input }) => {},
)
export const postThreadsThreadIdMessagesMessageId = os.postThreadsThreadIdMessagesMessageId.handler(
  async ({ input }) => {},
)
export const deleteThreadsThreadIdMessagesMessageId =
  os.deleteThreadsThreadIdMessagesMessageId.handler(async ({ input }) => {})
export const getThreadsThreadIdRuns = os.getThreadsThreadIdRuns.handler(async ({ input }) => {})
export const postThreadsThreadIdRuns = os.postThreadsThreadIdRuns.handler(async ({ input }) => {})
export const getThreadsThreadIdRunsRunId = os.getThreadsThreadIdRunsRunId.handler(
  async ({ input }) => {},
)
export const postThreadsThreadIdRunsRunId = os.postThreadsThreadIdRunsRunId.handler(
  async ({ input }) => {},
)
export const postThreadsThreadIdRunsRunIdCancel = os.postThreadsThreadIdRunsRunIdCancel.handler(
  async ({ input }) => {},
)
export const getThreadsThreadIdRunsRunIdSteps = os.getThreadsThreadIdRunsRunIdSteps.handler(
  async ({ input }) => {},
)
export const getThreadsThreadIdRunsRunIdStepsStepId =
  os.getThreadsThreadIdRunsRunIdStepsStepId.handler(async ({ input }) => {})
export const postThreadsThreadIdRunsRunIdSubmitToolOutputs =
  os.postThreadsThreadIdRunsRunIdSubmitToolOutputs.handler(async ({ input }) => {})
