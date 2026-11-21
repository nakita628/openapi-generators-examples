import { Hono } from 'hono'
import {
  getSkusSkuIdSubscriptionsHandler,
  getSkusSkuIdSubscriptionsSubscriptionIdHandler,
} from '../routes'

export const skusHandler = new Hono()
  .get(
    '/skus/:sku_id/subscriptions',
    getSkusSkuIdSubscriptionsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/skus/:sku_id/subscriptions/:subscription_id',
    getSkusSkuIdSubscriptionsSubscriptionIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
