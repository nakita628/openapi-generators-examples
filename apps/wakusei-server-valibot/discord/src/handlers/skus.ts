import { os } from '@orpc/server'
import * as v from 'valibot'
import { SnowflakeTypeSchema, SubscriptionResponseSchema } from '../components'

export const getSkusSkuIdSubscriptions = os
  .route({
    method: 'GET',
    path: '/skus/{sku_id}/subscriptions',
    description: 'Returns all subscriptions containing the SKU, filtered by user.',
    successDescription: '200 response for get_sku_subscriptions',
  })
  .input(
    v.object({
      sku_id: SnowflakeTypeSchema,
      before: v.optional(SnowflakeTypeSchema),
      after: v.optional(SnowflakeTypeSchema),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
      user_id: v.optional(SnowflakeTypeSchema),
    }),
  )
  .output(v.array(SubscriptionResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getSkusSkuIdSubscriptionsSubscriptionId = os
  .route({
    method: 'GET',
    path: '/skus/{sku_id}/subscriptions/{subscription_id}',
    description: 'Get a subscription by its ID.',
    successDescription: '200 response for get_sku_subscription',
  })
  .input(
    v.object({
      sku_id: SnowflakeTypeSchema,
      subscription_id: SnowflakeTypeSchema,
      user_id: v.optional(SnowflakeTypeSchema),
    }),
  )
  .output(SubscriptionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
