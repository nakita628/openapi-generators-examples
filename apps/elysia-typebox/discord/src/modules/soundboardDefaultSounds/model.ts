import { t, type UnwrapSchema } from 'elysia'
import { SoundboardSoundResponseSchema } from '../../components/schemas'

export const SoundboardDefaultSoundsModel = {
  get_soundboard_default_soundsResponse200: t.Array(SoundboardSoundResponseSchema),
} as const

export type SoundboardDefaultSoundsModel = {
  [k in keyof typeof SoundboardDefaultSoundsModel]: UnwrapSchema<
    (typeof SoundboardDefaultSoundsModel)[k]
  >
}
