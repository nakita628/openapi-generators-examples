import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { SnowflakeTypeSchema } from '../components'

export const stickersHandler = new Hono().get(
  '/stickers/:sticker_id',
  sValidator(
    'param',
    Schema.toStandardSchemaV1(Schema.Struct({ sticker_id: SnowflakeTypeSchema })),
  ),
  (c) => { throw new Error('Not implemented') },
)
