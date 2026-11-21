import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { SnowflakeTypeSchema } from '../components'

export const stickerPacksHandler = new Hono()
  .get('/sticker-packs', (c) => {})
  .get(
    '/sticker-packs/:pack_id',
    sValidator('param', z.object({ pack_id: SnowflakeTypeSchema })),
    (c) => {},
  )
