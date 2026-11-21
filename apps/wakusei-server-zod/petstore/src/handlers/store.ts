import { os } from '@orpc/server'
import * as z from 'zod'
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
  .output(z.record(z.string(), z.int32()))
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
  .input(z.object({ orderId: z.coerce.bigint().pipe(z.int64()) }))
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
  .input(z.object({ orderId: z.coerce.bigint().pipe(z.int64()) }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
