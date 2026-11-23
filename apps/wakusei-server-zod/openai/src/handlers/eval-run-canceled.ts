import { os } from '@orpc/server'
import { WebhookEvalRunCanceledSchema } from '../components'

export const postEvalRunCanceled = os
  .route({
    method: 'POST',
    path: '/eval_run_canceled',
    description: 'Sent when an eval run has been canceled.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
  })
  .input(WebhookEvalRunCanceledSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
