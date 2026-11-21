import { os } from '@orpc/server'
import { WebhookBatchCompletedSchema } from '../components'

export const postBatchCompleted = os
  .route({
    method: 'POST',
    path: '/batch_completed',
    description: 'Sent when a batch has completed processing.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
  })
  .input(WebhookBatchCompletedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
