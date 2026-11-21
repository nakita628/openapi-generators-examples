import { os } from '@orpc/server'
import { WebhookResponseIncompleteSchema } from '../components'

export const postResponseIncomplete = os
  .route({
    method: 'POST',
    path: '/response_incomplete',
    description: 'Sent when a background response is incomplete.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
  })
  .input(WebhookResponseIncompleteSchema)
  .handler(async ({ input }) => {})
