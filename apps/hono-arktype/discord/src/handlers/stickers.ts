import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { SnowflakeTypeSchema } from '../components'

export const stickersHandler = new Hono().get(
  '/stickers/:sticker_id',
  sValidator('param', type({ sticker_id: SnowflakeTypeSchema })),
  (c) => { throw new Error('Not implemented') },
)
