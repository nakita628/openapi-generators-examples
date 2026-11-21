import { os } from '@orpc/server'
import { WebhookAgentEnvironmentReadySchema } from '../components'

export const postAgentEnvironmentReady = os
  .route({
    method: 'POST',
    path: '/agent_environment_ready',
    description:
      'Sent when a prewarmed OpenAI-hosted environment finishes setup before being attached to a session.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
  })
  .input(WebhookAgentEnvironmentReadySchema)
  .handler(async ({ input }) => {})
