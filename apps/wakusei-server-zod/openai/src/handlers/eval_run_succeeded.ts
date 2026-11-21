import { os } from '@orpc/server'
import { WebhookEvalRunSucceededSchema } from '../components'

export const postEvalRunSucceeded = os
  .route({
    method: 'POST',
    path: '/eval_run_succeeded',
    description: 'Sent when an eval run has succeeded.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
  })
  .input(WebhookEvalRunSucceededSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
