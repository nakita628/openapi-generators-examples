import { t, type UnwrapSchema } from 'elysia'
import { VoiceRegionResponseSchema } from '../../components/schemas'

export const VoiceModel = {
  list_voice_regionsResponse200: t.Union([t.Array(VoiceRegionResponseSchema), t.Null()]),
} as const

export type VoiceModel = { [k in keyof typeof VoiceModel]: UnwrapSchema<(typeof VoiceModel)[k]> }
