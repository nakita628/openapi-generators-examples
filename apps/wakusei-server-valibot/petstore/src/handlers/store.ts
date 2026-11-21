import { os } from '@orpc/server'
import * as v from 'valibot'
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
  .output(
    v.record(
      v.string(),
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      orderId: v.pipe(
        v.string(),
        v.regex(/^-?\d+$/),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  )
  .output(OrderSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      orderId: v.pipe(
        v.string(),
        v.regex(/^-?\d+$/),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })
