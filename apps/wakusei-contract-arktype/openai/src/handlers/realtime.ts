import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postRealtimeCalls = os.postRealtimeCalls.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postRealtimeCallsCallIdAccept = os.postRealtimeCallsCallIdAccept.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postRealtimeCallsCallIdHangup = os.postRealtimeCallsCallIdHangup.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postRealtimeCallsCallIdRefer = os.postRealtimeCallsCallIdRefer.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postRealtimeCallsCallIdReject = os.postRealtimeCallsCallIdReject.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postRealtimeClientSecrets = os.postRealtimeClientSecrets.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postRealtimeSessions = os.postRealtimeSessions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postRealtimeTranscriptionSessions = os.postRealtimeTranscriptionSessions.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postRealtimeTranslationsClientSecrets =
  os.postRealtimeTranslationsClientSecrets.handler(async ({ input }) => { throw new Error('Not implemented') })
