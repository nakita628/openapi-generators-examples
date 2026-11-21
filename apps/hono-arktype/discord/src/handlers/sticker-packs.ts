import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { SnowflakeTypeSchema } from '../components'

export const stickerPacksHandler = new Hono()
  .get('/sticker-packs', (c) => { throw new Error('Not implemented') })
  .get(
    '/sticker-packs/:pack_id',
    sValidator('param', type({ pack_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
