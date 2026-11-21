import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postThreads = os.postThreads.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postThreadsRuns = os.postThreadsRuns.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getThreadsThreadId = os.getThreadsThreadId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postThreadsThreadId = os.postThreadsThreadId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteThreadsThreadId = os.deleteThreadsThreadId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getThreadsThreadIdMessages = os.getThreadsThreadIdMessages.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postThreadsThreadIdMessages = os.postThreadsThreadIdMessages.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getThreadsThreadIdMessagesMessageId = os.getThreadsThreadIdMessagesMessageId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postThreadsThreadIdMessagesMessageId = os.postThreadsThreadIdMessagesMessageId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteThreadsThreadIdMessagesMessageId =
  os.deleteThreadsThreadIdMessagesMessageId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getThreadsThreadIdRuns = os.getThreadsThreadIdRuns.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postThreadsThreadIdRuns = os.postThreadsThreadIdRuns.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getThreadsThreadIdRunsRunId = os.getThreadsThreadIdRunsRunId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postThreadsThreadIdRunsRunId = os.postThreadsThreadIdRunsRunId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postThreadsThreadIdRunsRunIdCancel = os.postThreadsThreadIdRunsRunIdCancel.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getThreadsThreadIdRunsRunIdSteps = os.getThreadsThreadIdRunsRunIdSteps.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getThreadsThreadIdRunsRunIdStepsStepId =
  os.getThreadsThreadIdRunsRunIdStepsStepId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postThreadsThreadIdRunsRunIdSubmitToolOutputs =
  os.postThreadsThreadIdRunsRunIdSubmitToolOutputs.handler(async ({ input }) => { throw new Error('Not implemented') })
