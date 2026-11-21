import { Hono } from 'hono'
import { getStickersStickerIdHandler } from '../routes'

export const stickersHandler = new Hono().get(
  '/stickers/:sticker_id',
  getStickersStickerIdHandler(async (c, { param }) => {}),
)
