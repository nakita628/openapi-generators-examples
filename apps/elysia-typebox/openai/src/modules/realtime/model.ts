import { t, type UnwrapSchema } from 'elysia'

export const RealtimeModel = {
  acceptRealtimeCallParams: t.Object({ call_id: t.String() }),
  hangupRealtimeCallParams: t.Object({ call_id: t.String() }),
  referRealtimeCallParams: t.Object({ call_id: t.String() }),
  rejectRealtimeCallParams: t.Object({ call_id: t.String() }),
} as const

export type RealtimeModel = {
  [k in keyof typeof RealtimeModel]: UnwrapSchema<(typeof RealtimeModel)[k]>
}
