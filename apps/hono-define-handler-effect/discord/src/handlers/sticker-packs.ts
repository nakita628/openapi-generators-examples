import { Hono } from 'hono'
import { getStickerPacksHandler, getStickerPacksPackIdHandler } from '../routes'

export const stickerPacksHandler = new Hono()
  .get(
    '/sticker-packs',
    getStickerPacksHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/sticker-packs/:pack_id',
    getStickerPacksPackIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
