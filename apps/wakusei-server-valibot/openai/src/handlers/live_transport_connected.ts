import { os } from '@orpc/server'
import { WebhookLiveTransportConnectedSchema } from '../components'

export const postLiveTransportConnected = os
  .route({
    method: 'POST',
    path: '/live_transport_connected',
    description:
      'Sent when a direct Live WebRTC session is created or an Instant Connect session activates.',
    successDescription: 'Acknowledges delivery after the endpoint has recorded the work.',
  })
  .input(WebhookLiveTransportConnectedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
