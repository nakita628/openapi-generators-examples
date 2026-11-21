import { os } from '@orpc/server'
import { WebhookRealtimeCallIncomingSchema } from '../components'

export const postRealtimeCallIncoming = os
  .route({
    method: 'POST',
    path: '/realtime_call_incoming',
    description: 'Sent when an incoming API SIP session is available for Realtime acceptance.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
  })
  .input(WebhookRealtimeCallIncomingSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
