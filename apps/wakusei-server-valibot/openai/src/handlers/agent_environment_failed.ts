import { os } from '@orpc/server'
import { WebhookAgentEnvironmentFailedSchema } from '../components'

export const postAgentEnvironmentFailed = os
  .route({
    method: 'POST',
    path: '/agent_environment_failed',
    description:
      'Sent when setup fails for a prewarmed OpenAI-hosted environment before it is attached to a session.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
  })
  .input(WebhookAgentEnvironmentFailedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
