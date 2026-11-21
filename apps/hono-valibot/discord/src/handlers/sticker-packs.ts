import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { SnowflakeTypeSchema } from '../components'

export const stickerPacksHandler = new Hono()
  .get('/sticker-packs', (c) => { throw new Error('Not implemented') })
  .get(
    '/sticker-packs/:pack_id',
    sValidator('param', v.object({ pack_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
