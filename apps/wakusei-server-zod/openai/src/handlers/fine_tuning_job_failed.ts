import { os } from '@orpc/server'
import { WebhookFineTuningJobFailedSchema } from '../components'

export const postFineTuningJobFailed = os
  .route({
    method: 'POST',
    path: '/fine_tuning_job_failed',
    description: 'Sent when a fine-tuning job has failed.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
  })
  .input(WebhookFineTuningJobFailedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
