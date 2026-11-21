import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postChatkitSessionsSessionIdCancel = os.postChatkitSessionsSessionIdCancel.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postChatkitSessions = os.postChatkitSessions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getChatkitThreadsThreadIdItems = os.getChatkitThreadsThreadIdItems.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getChatkitThreadsThreadId = os.getChatkitThreadsThreadId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteChatkitThreadsThreadId = os.deleteChatkitThreadsThreadId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getChatkitThreads = os.getChatkitThreads.handler(async ({ input }) => { throw new Error('Not implemented') })
