import { os } from '@orpc/server'
import { WebhookEvalRunFailedSchema } from '../components'

export const postEvalRunFailed = os
  .route({
    method: 'POST',
    path: '/eval_run_failed',
    description: 'Sent when an eval run has failed.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
  })
  .input(WebhookEvalRunFailedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
