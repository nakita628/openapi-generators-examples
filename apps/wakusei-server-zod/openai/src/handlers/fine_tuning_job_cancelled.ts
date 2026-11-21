import { os } from '@orpc/server'
import { WebhookFineTuningJobCancelledSchema } from '../components'

export const postFineTuningJobCancelled = os
  .route({
    method: 'POST',
    path: '/fine_tuning_job_cancelled',
    description: 'Sent when a fine-tuning job has been cancelled.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
  })
  .input(WebhookFineTuningJobCancelledSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
