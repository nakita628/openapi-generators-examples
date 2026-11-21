import { os } from '@orpc/server'
import { WebhookBatchFailedSchema } from '../components'

export const postBatchFailed = os
  .route({
    method: 'POST',
    path: '/batch_failed',
    description: 'Sent when a batch has failed.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
  })
  .input(WebhookBatchFailedSchema)
  .handler(async ({ input }) => {})
