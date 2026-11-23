import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getWebhookEndpoints = os.getWebhookEndpoints.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postWebhookEndpoints = os.postWebhookEndpoints.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getWebhookEndpointsWebhookEndpointId = os.getWebhookEndpointsWebhookEndpointId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postWebhookEndpointsWebhookEndpointId =
  os.postWebhookEndpointsWebhookEndpointId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteWebhookEndpointsWebhookEndpointId =
  os.deleteWebhookEndpointsWebhookEndpointId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postWebhookEndpointsWebhookEndpointIdRotateSecret =
  os.postWebhookEndpointsWebhookEndpointIdRotateSecret.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postWebhookEndpointsWebhookEndpointIdTest =
  os.postWebhookEndpointsWebhookEndpointIdTest.handler(async ({ input }) => { throw new Error('Not implemented') })
