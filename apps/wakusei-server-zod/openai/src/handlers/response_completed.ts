import { os } from '@orpc/server'
import { WebhookResponseCompletedSchema } from '../components'

export const postResponseCompleted = os
  .route({
    method: 'POST',
    path: '/response_completed',
    description: 'Sent when a background response has completed successfully.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
  })
  .input(WebhookResponseCompletedSchema)
  .handler(async ({ input }) => {})
