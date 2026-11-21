import { os } from '@orpc/server'
import { WebhookBatchCancelledSchema } from '../components'

export const postBatchCancelled = os
  .route({
    method: 'POST',
    path: '/batch_cancelled',
    description: 'Sent when a batch has been cancelled.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
  })
  .input(WebhookBatchCancelledSchema)
  .handler(async ({ input }) => {})
