import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'
import { SnowflakeTypeSchema } from '../components'

export const stickersHandler = new Hono().get(
  '/stickers/:sticker_id',
  tbValidator('param', Type.Object({ sticker_id: SnowflakeTypeSchema })),
  (c) => {},
)
