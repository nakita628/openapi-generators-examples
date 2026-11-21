import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import { SnowflakeTypeSchema, SubscriptionResponseSchema } from '../components'

const t = initTRPC.create()

export const skusRouter = t.router({
  getSkusSkuIdSubscriptions: t.procedure
    .input(
      z.object({
        sku_id: SnowflakeTypeSchema,
        before: SnowflakeTypeSchema.exactOptional(),
        after: SnowflakeTypeSchema.exactOptional(),
        limit: z.int().min(1).max(100).exactOptional(),
        user_id: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(z.array(SubscriptionResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkusSkuIdSubscriptionsSubscriptionId: t.procedure
    .input(
      z.object({
        sku_id: SnowflakeTypeSchema,
        subscription_id: SnowflakeTypeSchema,
        user_id: SnowflakeTypeSchema.exactOptional(),
      }),
    )
    .output(SubscriptionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
