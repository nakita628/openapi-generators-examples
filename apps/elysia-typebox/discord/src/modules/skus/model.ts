import { t, type UnwrapSchema } from 'elysia'
import { SnowflakeTypeSchema, SubscriptionResponseSchema } from '../../components/schemas'

export const SkusModel = {
  get_sku_subscriptionsParams: t.Object({ sku_id: SnowflakeTypeSchema }),
  get_sku_subscriptionsQuery: t.Object({
    before: t.Optional(SnowflakeTypeSchema),
    after: t.Optional(SnowflakeTypeSchema),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    user_id: t.Optional(SnowflakeTypeSchema),
  }),
  get_sku_subscriptionsResponse200: t.Array(SubscriptionResponseSchema),
  get_sku_subscriptionParams: t.Object({
    sku_id: SnowflakeTypeSchema,
    subscription_id: SnowflakeTypeSchema,
  }),
  get_sku_subscriptionQuery: t.Object({ user_id: t.Optional(SnowflakeTypeSchema) }),
} as const

export type SkusModel = { [k in keyof typeof SkusModel]: UnwrapSchema<(typeof SkusModel)[k]> }
