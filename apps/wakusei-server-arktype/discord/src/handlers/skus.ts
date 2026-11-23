import { os } from '@orpc/server'
import { type } from 'arktype'
import { SnowflakeTypeSchema, SubscriptionResponseSchema } from '../components'

export const getSkusSkuIdSubscriptions = os
  .route({
    method: 'GET',
    path: '/skus/{sku_id}/subscriptions',
    description: 'Returns all subscriptions containing the SKU, filtered by user.',
    successDescription: '200 response for get_sku_subscriptions',
  })
  .input(
    type({
      sku_id: SnowflakeTypeSchema,
      'before?': SnowflakeTypeSchema,
      'after?': SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
      'user_id?': SnowflakeTypeSchema,
    }),
  )
  .output(type(SubscriptionResponseSchema).array())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getSkusSkuIdSubscriptionsSubscriptionId = os
  .route({
    method: 'GET',
    path: '/skus/{sku_id}/subscriptions/{subscription_id}',
    description: 'Get a subscription by its ID.',
    successDescription: '200 response for get_sku_subscription',
  })
  .input(
    type({
      sku_id: SnowflakeTypeSchema,
      subscription_id: SnowflakeTypeSchema,
      'user_id?': SnowflakeTypeSchema,
    }),
  )
  .output(SubscriptionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
