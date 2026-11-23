import { os } from '@orpc/server'
import { WebhookLiveCallIncomingSchema } from '../components'

export const postLiveCallIncoming = os
  .route({
    method: 'POST',
    path: '/live_call_incoming',
    description:
      'Deprecated: use `live.transport.incoming`. Retained only for existing subscriptions.\nSent when an incoming API SIP session is available for Live acceptance.\n',
    deprecated: true,
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
  })
  .input(WebhookLiveCallIncomingSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
