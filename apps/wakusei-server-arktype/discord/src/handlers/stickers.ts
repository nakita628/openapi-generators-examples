import { os } from '@orpc/server'
import { type } from 'arktype'
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
  .input(type({ sticker_id: SnowflakeTypeSchema }))
  .output(type(GuildStickerResponseSchema).or(StandardStickerResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
