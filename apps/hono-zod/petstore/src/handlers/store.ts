import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { OrderSchema } from '../components'

export const storeHandler = new Hono()
  .get('/store/inventory', (c) => {})
  .post(
    '/store/order',
    sValidator('json', OrderSchema),
    sValidator(
      'form',
      z.object({
        id: z.coerce
          .bigint()
          .pipe(z.int64())
          .meta({ examples: [10] })
          .exactOptional(),
        petId: z.coerce
          .bigint()
          .pipe(z.int64())
          .meta({ examples: [198772] })
          .exactOptional(),
        quantity: z.coerce
          .number()
          .pipe(z.int32())
          .meta({ examples: [7] })
          .exactOptional(),
        shipDate: z.iso.datetime({ offset: true }).exactOptional(),
        status: z
          .enum(['placed', 'approved', 'delivered'])
          .meta({ description: 'Order Status', examples: ['approved'] })
          .exactOptional(),
        complete: z.stringbool().exactOptional(),
      }),
    ),
    (c) => {},
  )
  .get(
    '/store/order/:orderId',
    sValidator('param', z.object({ orderId: z.coerce.bigint().pipe(z.int64()) })),
    (c) => {},
  )
  .delete(
    '/store/order/:orderId',
    sValidator('param', z.object({ orderId: z.coerce.bigint().pipe(z.int64()) })),
    (c) => {},
  )
