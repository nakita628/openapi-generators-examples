import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getWebhookEventTypes = os.getWebhookEventTypes.handler(async ({ input }) => {})
