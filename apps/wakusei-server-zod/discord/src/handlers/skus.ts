import { os } from '@orpc/server'
import * as z from 'zod'
import { SnowflakeTypeSchema, SubscriptionResponseSchema } from '../components'

export const getSkusSkuIdSubscriptions = os
  .route({
    method: 'GET',
    path: '/skus/{sku_id}/subscriptions',
    description: 'Returns all subscriptions containing the SKU, filtered by user.',
    successDescription: '200 response for get_sku_subscriptions',
  })
  .input(
    z.object({
      sku_id: SnowflakeTypeSchema,
      before: SnowflakeTypeSchema.exactOptional(),
      after: SnowflakeTypeSchema.exactOptional(),
      limit: z.coerce.number().int().min(1).max(100).exactOptional(),
      user_id: SnowflakeTypeSchema.exactOptional(),
    }),
  )
  .output(z.array(SubscriptionResponseSchema))
  .handler(async ({ input }) => {})

export const getSkusSkuIdSubscriptionsSubscriptionId = os
  .route({
    method: 'GET',
    path: '/skus/{sku_id}/subscriptions/{subscription_id}',
    description: 'Get a subscription by its ID.',
    successDescription: '200 response for get_sku_subscription',
  })
  .input(
    z.object({
      sku_id: SnowflakeTypeSchema,
      subscription_id: SnowflakeTypeSchema,
      user_id: SnowflakeTypeSchema.exactOptional(),
    }),
  )
  .output(SubscriptionResponseSchema)
  .handler(async ({ input }) => {})
