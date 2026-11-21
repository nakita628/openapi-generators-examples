import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postRealtimeCalls = os.postRealtimeCalls.handler(async ({ input }) => {})
export const postRealtimeCallsCallIdAccept = os.postRealtimeCallsCallIdAccept.handler(
  async ({ input }) => {},
)
export const postRealtimeCallsCallIdHangup = os.postRealtimeCallsCallIdHangup.handler(
  async ({ input }) => {},
)
export const postRealtimeCallsCallIdRefer = os.postRealtimeCallsCallIdRefer.handler(
  async ({ input }) => {},
)
export const postRealtimeCallsCallIdReject = os.postRealtimeCallsCallIdReject.handler(
  async ({ input }) => {},
)
export const postRealtimeClientSecrets = os.postRealtimeClientSecrets.handler(
  async ({ input }) => {},
)
export const postRealtimeSessions = os.postRealtimeSessions.handler(async ({ input }) => {})
export const postRealtimeTranscriptionSessions = os.postRealtimeTranscriptionSessions.handler(
  async ({ input }) => {},
)
export const postRealtimeTranslationsClientSecrets =
  os.postRealtimeTranslationsClientSecrets.handler(async ({ input }) => {})
