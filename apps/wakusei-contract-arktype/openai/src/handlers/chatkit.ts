import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postChatkitSessionsSessionIdCancel = os.postChatkitSessionsSessionIdCancel.handler(
  async ({ input }) => {},
)
export const postChatkitSessions = os.postChatkitSessions.handler(async ({ input }) => {})
export const getChatkitThreadsThreadIdItems = os.getChatkitThreadsThreadIdItems.handler(
  async ({ input }) => {},
)
export const getChatkitThreadsThreadId = os.getChatkitThreadsThreadId.handler(
  async ({ input }) => {},
)
export const deleteChatkitThreadsThreadId = os.deleteChatkitThreadsThreadId.handler(
  async ({ input }) => {},
)
export const getChatkitThreads = os.getChatkitThreads.handler(async ({ input }) => {})
