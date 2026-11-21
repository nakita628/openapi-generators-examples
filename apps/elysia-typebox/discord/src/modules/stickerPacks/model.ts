import { t, type UnwrapSchema } from 'elysia'
import { SnowflakeTypeSchema } from '../../components/schemas'

export const StickerPacksModel = {
  get_sticker_packParams: t.Object({ pack_id: SnowflakeTypeSchema }),
} as const

export type StickerPacksModel = {
  [k in keyof typeof StickerPacksModel]: UnwrapSchema<(typeof StickerPacksModel)[k]>
}
