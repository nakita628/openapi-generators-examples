import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { SnowflakeTypeSchema, SubscriptionResponseSchema } from '../components'

const t = initTRPC.create()

export const skusRouter = t.router({
  getSkusSkuIdSubscriptions: t.procedure
    .input(
      v.object({
        sku_id: SnowflakeTypeSchema,
        before: v.optional(SnowflakeTypeSchema),
        after: v.optional(SnowflakeTypeSchema),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100))),
        user_id: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(v.array(SubscriptionResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkusSkuIdSubscriptionsSubscriptionId: t.procedure
    .input(
      v.object({
        sku_id: SnowflakeTypeSchema,
        subscription_id: SnowflakeTypeSchema,
        user_id: v.optional(SnowflakeTypeSchema),
      }),
    )
    .output(SubscriptionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
