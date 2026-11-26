import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { PnpMessagesRequestSchema } from '../components'

export const botHandler = new Hono().post(
  '/bot/pnp/push',
  sValidator(
    'header',
    type({
      'x-line-delivery-tag?': type('string')
        .narrow((data, ctx) => [...data].length >= 16 || ctx.mustBe('at least 16 characters'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ),
  sValidator('json', PnpMessagesRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
