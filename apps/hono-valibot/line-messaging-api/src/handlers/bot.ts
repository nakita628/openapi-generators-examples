import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { PnpMessagesRequestSchema } from '../components'

export const botHandler = new Hono().post(
  '/bot/pnp/push',
  sValidator(
    'header',
    v.partial(
      v.object({
        'x-line-delivery-tag': v.pipe(v.string(), v.minCodePoints(16), v.maxCodePoints(100)),
      }),
    ),
  ),
  sValidator('json', PnpMessagesRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
