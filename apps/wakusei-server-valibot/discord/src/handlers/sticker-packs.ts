import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  SnowflakeTypeSchema,
  StickerPackCollectionResponseSchema,
  StickerPackResponseSchema,
} from '../components'

export const getStickerPacks = os
  .route({
    method: 'GET',
    path: '/sticker-packs',
    successDescription: '200 response for list_sticker_packs',
  })
  .output(StickerPackCollectionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getStickerPacksPackId = os
  .route({
    method: 'GET',
    path: '/sticker-packs/{pack_id}',
    successDescription: '200 response for get_sticker_pack',
  })
  .input(v.object({ pack_id: SnowflakeTypeSchema }))
  .output(StickerPackResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
