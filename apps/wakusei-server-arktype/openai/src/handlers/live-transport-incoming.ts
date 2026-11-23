import { os } from '@orpc/server'
import { WebhookLiveTransportIncomingSchema } from '../components'

export const postLiveTransportIncoming = os
  .route({
    method: 'POST',
    path: '/live_transport_incoming',
    description: 'Sent when an incoming API SIP session is available for Live acceptance.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
  })
  .input(WebhookLiveTransportIncomingSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
