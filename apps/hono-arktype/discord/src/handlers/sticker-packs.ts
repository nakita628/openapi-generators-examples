import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { SnowflakeTypeSchema } from '../components'

export const stickerPacksHandler = new Hono()
  .get('/sticker-packs', (c) => {})
  .get(
    '/sticker-packs/:pack_id',
    sValidator('param', type({ pack_id: SnowflakeTypeSchema })),
    (c) => {},
  )
