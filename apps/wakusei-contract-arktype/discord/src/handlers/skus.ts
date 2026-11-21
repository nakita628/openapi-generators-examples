import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getSkusSkuIdSubscriptions = os.getSkusSkuIdSubscriptions.handler(
  async ({ input }) => {},
)
export const getSkusSkuIdSubscriptionsSubscriptionId =
  os.getSkusSkuIdSubscriptionsSubscriptionId.handler(async ({ input }) => {})
