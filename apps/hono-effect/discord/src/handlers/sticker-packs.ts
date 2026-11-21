import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { SnowflakeTypeSchema } from '../components'

export const stickerPacksHandler = new Hono()
  .get('/sticker-packs', (c) => { throw new Error('Not implemented') })
  .get(
    '/sticker-packs/:pack_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ pack_id: SnowflakeTypeSchema }))),
    (c) => { throw new Error('Not implemented') },
  )
