import { t, type UnwrapSchema } from 'elysia'

export const StickerPacksModel = {
  get_sticker_packParams: t.Object({ pack_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
} as const

export type StickerPacksModel = {
  [k in keyof typeof StickerPacksModel]: UnwrapSchema<(typeof StickerPacksModel)[k]>
}
