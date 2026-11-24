import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { SnowflakeTypeSchema, SubscriptionResponseSchema } from '../components'

const t = initTRPC.create()

export const skusRouter = t.router({
  getSkusSkuIdSubscriptions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          sku_id: SnowflakeTypeSchema,
          before: Schema.optionalKey(SnowflakeTypeSchema),
          after: Schema.optionalKey(SnowflakeTypeSchema),
          limit: Schema.optionalKey(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(1),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          user_id: Schema.optionalKey(SnowflakeTypeSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.Array(SubscriptionResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkusSkuIdSubscriptionsSubscriptionId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          sku_id: SnowflakeTypeSchema,
          subscription_id: SnowflakeTypeSchema,
          user_id: Schema.optionalKey(SnowflakeTypeSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubscriptionResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
