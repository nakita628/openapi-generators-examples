import { os } from '@orpc/server'
import { WebhookAgentSessionActionRequiredSchema } from '../components'

export const postAgentSessionActionRequired = os
  .route({
    method: 'POST',
    path: '/agent_session_action_required',
    description:
      'Sent when an agent session requires an action. Retrieve the session for action details.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
  })
  .input(WebhookAgentSessionActionRequiredSchema)
  .handler(async ({ input }) => {})
