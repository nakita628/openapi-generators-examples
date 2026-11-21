import { t, type UnwrapSchema } from 'elysia'
import { SubscriptionResponseSchema } from '../../components/schemas'

export const SkusModel = {
  get_sku_subscriptionsParams: t.Object({ sku_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_sku_subscriptionsQuery: t.Object({
    before: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    after: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    user_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  get_sku_subscriptionsResponse200: t.Array(SubscriptionResponseSchema),
  get_sku_subscriptionParams: t.Object({
    sku_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    subscription_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_sku_subscriptionQuery: t.Object({
    user_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
} as const

export type SkusModel = { [k in keyof typeof SkusModel]: UnwrapSchema<(typeof SkusModel)[k]> }
