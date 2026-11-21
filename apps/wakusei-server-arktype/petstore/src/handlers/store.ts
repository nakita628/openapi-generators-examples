import { os } from '@orpc/server'
import { type } from 'arktype'
import { OrderSchema } from '../components'

export const getStoreInventory = os
  .route({
    method: 'GET',
    path: '/store/inventory',
    tags: ['store'],
    summary: 'Returns pet inventories by status.',
    description: 'Returns a map of status codes to quantities.',
    successDescription: 'successful operation',
  })
  .output(type({ '[string]': 'number.integer >= -2147483648 & number.integer <= 2147483647' }))
  .handler(async ({ input }) => {})

export const postStoreOrder = os
  .route({
    method: 'POST',
    path: '/store/order',
    tags: ['store'],
    summary: 'Place an order for a pet.',
    description: 'Place a new order in the store.',
    successDescription: 'successful operation',
  })
  .input(OrderSchema)
  .output(OrderSchema)
  .handler(async ({ input }) => {})

export const getStoreOrderOrderId = os
  .route({
    method: 'GET',
    path: '/store/order/{orderId}',
    tags: ['store'],
    summary: 'Find purchase order by ID.',
    description:
      'For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.',
    successDescription: 'successful operation',
  })
  .input(
    type({
      orderId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    }),
  )
  .output(OrderSchema)
  .handler(async ({ input }) => {})

export const deleteStoreOrderOrderId = os
  .route({
    method: 'DELETE',
    path: '/store/order/{orderId}',
    tags: ['store'],
    summary: 'Delete purchase order by identifier.',
    description:
      'For valid response try integer IDs with value < 1000. Anything above 1000 or non-integers will generate API errors.',
    successDescription: 'order deleted',
  })
  .input(
    type({
      orderId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    }),
  )
  .handler(async ({ input }) => {})
