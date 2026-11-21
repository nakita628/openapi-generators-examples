import { t, type UnwrapSchema } from 'elysia'

export const LiveModel = {
  acceptLiveSessionParams: t.Object({ session_id: t.String() }),
  forkLiveSessionParams: t.Object({ session_id: t.String() }),
  hangupLiveSessionParams: t.Object({ session_id: t.String() }),
  referLiveSessionParams: t.Object({ session_id: t.String() }),
  rejectLiveSessionParams: t.Object({ session_id: t.String() }),
  downloadLiveRecordingParams: t.Object({
    session_id: t.String({
      pattern: '^live_[A-Za-z0-9_-]{1,128}$',
      description:
        'The ID of the stored Live session to download. Use the session ID returned when the session started with storage enabled.',
    }),
  }),
} as const

export type LiveModel = { [k in keyof typeof LiveModel]: UnwrapSchema<(typeof LiveModel)[k]> }
