import { os } from '@orpc/server'
import { WebhookAgentSessionInProgressSchema } from '../components'

export const postAgentSessionInProgress = os
  .route({
    method: 'POST',
    path: '/agent_session_in_progress',
    description: 'Sent when an agent session enters the in-progress state.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
  })
  .input(WebhookAgentSessionInProgressSchema)
  .handler(async ({ input }) => {})
