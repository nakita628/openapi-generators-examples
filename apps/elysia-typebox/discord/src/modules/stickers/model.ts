import { t, type UnwrapSchema } from 'elysia'
import {
  GuildStickerResponseSchema,
  SnowflakeTypeSchema,
  StandardStickerResponseSchema,
} from '../../components/schemas'

export const StickersModel = {
  get_stickerParams: t.Object({ sticker_id: SnowflakeTypeSchema }),
  get_stickerResponse200: t.Union([GuildStickerResponseSchema, StandardStickerResponseSchema]),
} as const

export type StickersModel = {
  [k in keyof typeof StickersModel]: UnwrapSchema<(typeof StickersModel)[k]>
}
