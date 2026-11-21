import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getWebhookEndpoints = os.getWebhookEndpoints.handler(async ({ input }) => {})
export const postWebhookEndpoints = os.postWebhookEndpoints.handler(async ({ input }) => {})
export const getWebhookEndpointsWebhookEndpointId = os.getWebhookEndpointsWebhookEndpointId.handler(
  async ({ input }) => {},
)
export const postWebhookEndpointsWebhookEndpointId =
  os.postWebhookEndpointsWebhookEndpointId.handler(async ({ input }) => {})
export const deleteWebhookEndpointsWebhookEndpointId =
  os.deleteWebhookEndpointsWebhookEndpointId.handler(async ({ input }) => {})
export const postWebhookEndpointsWebhookEndpointIdRotateSecret =
  os.postWebhookEndpointsWebhookEndpointIdRotateSecret.handler(async ({ input }) => {})
export const postWebhookEndpointsWebhookEndpointIdTest =
  os.postWebhookEndpointsWebhookEndpointIdTest.handler(async ({ input }) => {})
