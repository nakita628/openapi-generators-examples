import { os } from '@orpc/server'
import { WebhookAgentSessionFailedSchema } from '../components'

export const postAgentSessionFailed = os
  .route({
    method: 'POST',
    path: '/agent_session_failed',
    description: 'Sent when an agent session fails.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
  })
  .input(WebhookAgentSessionFailedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
