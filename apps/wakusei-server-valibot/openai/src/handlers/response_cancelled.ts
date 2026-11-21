import { os } from '@orpc/server'
import { WebhookResponseCancelledSchema } from '../components'

export const postResponseCancelled = os
  .route({
    method: 'POST',
    path: '/response_cancelled',
    description: 'Sent when a background response has been cancelled.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
  })
  .input(WebhookResponseCancelledSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
