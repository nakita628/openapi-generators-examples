import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postLiveSessions = os.postLiveSessions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postLiveSessionsSessionIdAccept = os.postLiveSessionsSessionIdAccept.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postLiveSessionsSessionIdFork = os.postLiveSessionsSessionIdFork.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postLiveSessionsSessionIdHangup = os.postLiveSessionsSessionIdHangup.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postLiveSessionsSessionIdRefer = os.postLiveSessionsSessionIdRefer.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postLiveSessionsSessionIdReject = os.postLiveSessionsSessionIdReject.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getLiveSessionsSessionIdContent = os.getLiveSessionsSessionIdContent.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
