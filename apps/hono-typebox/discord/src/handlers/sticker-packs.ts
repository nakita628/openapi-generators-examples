import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'
import { SnowflakeTypeSchema } from '../components'

export const stickerPacksHandler = new Hono()
  .get('/sticker-packs', (c) => { throw new Error('Not implemented') })
  .get(
    '/sticker-packs/:pack_id',
    tbValidator('param', Type.Object({ pack_id: SnowflakeTypeSchema })),
    (c) => { throw new Error('Not implemented') },
  )
