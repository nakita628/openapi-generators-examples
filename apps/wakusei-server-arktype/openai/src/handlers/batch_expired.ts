import { os } from '@orpc/server'
import { WebhookBatchExpiredSchema } from '../components'

export const postBatchExpired = os
  .route({
    method: 'POST',
    path: '/batch_expired',
    description: 'Sent when a batch has expired before completion.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
  })
  .input(WebhookBatchExpiredSchema)
  .handler(async ({ input }) => {})
