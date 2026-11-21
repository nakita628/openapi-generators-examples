import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { SnowflakeTypeSchema } from '../components'

export const stickersHandler = new Hono().get(
  '/stickers/:sticker_id',
  sValidator('param', v.object({ sticker_id: SnowflakeTypeSchema })),
  (c) => {},
)
