import { os } from '@orpc/server'
import { WebhookFineTuningJobSucceededSchema } from '../components'

export const postFineTuningJobSucceeded = os
  .route({
    method: 'POST',
    path: '/fine_tuning_job_succeeded',
    description: 'Sent when a fine-tuning job has succeeded.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
  })
  .input(WebhookFineTuningJobSucceededSchema)
  .handler(async ({ input }) => {})
