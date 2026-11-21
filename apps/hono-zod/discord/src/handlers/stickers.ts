import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { SnowflakeTypeSchema } from '../components'

export const stickersHandler = new Hono().get(
  '/stickers/:sticker_id',
  sValidator('param', z.object({ sticker_id: SnowflakeTypeSchema })),
  (c) => {},
)
