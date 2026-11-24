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
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        petId: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        quantity: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
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
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
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
        orderId: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
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
        orderId: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
          .Decode((value) => Number(value))
          .Encode((value) => String(value)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
