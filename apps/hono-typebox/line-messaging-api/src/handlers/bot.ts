import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'
import { PnpMessagesRequestSchema } from '../components'

export const botHandler = new Hono().post(
  '/bot/pnp/push',
  tbValidator(
    'header',
    Type.Object({
      'x-line-delivery-tag': Type.Optional(Type.String({ minLength: 16, maxLength: 100 })),
    }),
  ),
  tbValidator('json', PnpMessagesRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
