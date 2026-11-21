import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { SnowflakeTypeSchema, SubscriptionResponseSchema } from '../components'

const t = initTRPC.create()

export const skusRouter = t.router({
  getSkusSkuIdSubscriptions: t.procedure
    .input(
      type({
        sku_id: SnowflakeTypeSchema,
        'before?': SnowflakeTypeSchema,
        'after?': SnowflakeTypeSchema,
        'limit?': 'number.integer >= 1 & number.integer <= 100',
        'user_id?': SnowflakeTypeSchema,
      }),
    )
    .output(type(SubscriptionResponseSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkusSkuIdSubscriptionsSubscriptionId: t.procedure
    .input(
      type({
        sku_id: SnowflakeTypeSchema,
        subscription_id: SnowflakeTypeSchema,
        'user_id?': SnowflakeTypeSchema,
      }),
    )
    .output(SubscriptionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
