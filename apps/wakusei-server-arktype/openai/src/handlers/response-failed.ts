import { os } from '@orpc/server'
import { WebhookResponseFailedSchema } from '../components'

export const postResponseFailed = os
  .route({
    method: 'POST',
    path: '/response_failed',
    description: 'Sent when a background response has failed.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
  })
  .input(WebhookResponseFailedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
