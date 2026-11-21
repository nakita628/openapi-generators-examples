import { os } from '@orpc/server'
import { WebhookAgentSessionCreatedSchema } from '../components'

export const postAgentSessionCreated = os
  .route({
    method: 'POST',
    path: '/agent_session_created',
    description: 'Sent when an agent session is created.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
  })
  .input(WebhookAgentSessionCreatedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
