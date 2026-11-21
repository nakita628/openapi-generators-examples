import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import { OrderSchema } from '../components'

export const storeHandler = new Hono()
  .get('/store/inventory', (c) => { throw new Error('Not implemented') })
  .post(
    '/store/order',
    tbValidator('json', OrderSchema),
    tbValidator(
      'form',
      Type.Object({
        id: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        petId: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        quantity: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        shipDate: Type.Optional(Type.String({ format: 'date-time' })),
        status: Type.Optional(
          Type.Union(
            [Type.Literal('placed'), Type.Literal('approved'), Type.Literal('delivered')],
            { description: 'Order Status', examples: ['approved'] },
          ),
        ),
        complete: Type.Optional(
          Codec(Type.Union([Type.Literal('true'), Type.Literal('false')]))
            .Decode((value) => value === 'true')
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/store/order/:orderId',
    tbValidator(
      'param',
      Type.Object({
        orderId: Codec(Type.String())
          .Decode((value) => Number.parseInt(value, 10))
          .Encode((value) => String(value)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/store/order/:orderId',
    tbValidator(
      'param',
      Type.Object({
        orderId: Codec(Type.String())
          .Decode((value) => Number.parseInt(value, 10))
          .Encode((value) => String(value)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
