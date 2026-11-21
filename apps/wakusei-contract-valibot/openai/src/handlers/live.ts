import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postLiveSessions = os.postLiveSessions.handler(async ({ input }) => {})
export const postLiveSessionsSessionIdAccept = os.postLiveSessionsSessionIdAccept.handler(
  async ({ input }) => {},
)
export const postLiveSessionsSessionIdFork = os.postLiveSessionsSessionIdFork.handler(
  async ({ input }) => {},
)
export const postLiveSessionsSessionIdHangup = os.postLiveSessionsSessionIdHangup.handler(
  async ({ input }) => {},
)
export const postLiveSessionsSessionIdRefer = os.postLiveSessionsSessionIdRefer.handler(
  async ({ input }) => {},
)
export const postLiveSessionsSessionIdReject = os.postLiveSessionsSessionIdReject.handler(
  async ({ input }) => {},
)
export const getLiveSessionsSessionIdContent = os.getLiveSessionsSessionIdContent.handler(
  async ({ input }) => {},
)
