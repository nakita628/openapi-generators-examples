import { os } from '@orpc/server'
import * as z from 'zod'
import {
  GuildStickerResponseSchema,
  SnowflakeTypeSchema,
  StandardStickerResponseSchema,
} from '../components'

export const getStickersStickerId = os
  .route({
    method: 'GET',
    path: '/stickers/{sticker_id}',
    successDescription: '200 response for get_sticker',
  })
  .input(z.object({ sticker_id: SnowflakeTypeSchema }))
  .output(z.xor([GuildStickerResponseSchema, StandardStickerResponseSchema]))
  .handler(async ({ input }) => {})
