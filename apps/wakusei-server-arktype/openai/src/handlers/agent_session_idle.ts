import { os } from '@orpc/server'
import { WebhookAgentSessionIdleSchema } from '../components'

export const postAgentSessionIdle = os
  .route({
    method: 'POST',
    path: '/agent_session_idle',
    description: 'Sent when an agent session becomes idle.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
  })
  .input(WebhookAgentSessionIdleSchema)
  .handler(async ({ input }) => {})
