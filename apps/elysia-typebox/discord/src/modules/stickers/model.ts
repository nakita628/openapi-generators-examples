import { t, type UnwrapSchema } from 'elysia'
import { GuildStickerResponseSchema, StandardStickerResponseSchema } from '../../components/schemas'

export const StickersModel = {
  get_stickerParams: t.Object({ sticker_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_stickerResponse200: t.Union([GuildStickerResponseSchema, StandardStickerResponseSchema]),
} as const

export type StickersModel = {
  [k in keyof typeof StickersModel]: UnwrapSchema<(typeof StickersModel)[k]>
}
