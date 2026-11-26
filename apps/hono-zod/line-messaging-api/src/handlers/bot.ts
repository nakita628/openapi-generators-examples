import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { PnpMessagesRequestSchema } from '../components'

export const botHandler = new Hono().post(
  '/bot/pnp/push',
  sValidator(
    'header',
    z.object({ 'x-line-delivery-tag': z.string().min(16).max(100).exactOptional() }),
  ),
  sValidator('json', PnpMessagesRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
