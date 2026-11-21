import { os } from '@orpc/server'
import * as v from 'valibot'
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
  .input(v.object({ sticker_id: SnowflakeTypeSchema }))
  .output(v.union([GuildStickerResponseSchema, StandardStickerResponseSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
