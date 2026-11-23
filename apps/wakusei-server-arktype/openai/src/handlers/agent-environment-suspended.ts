import { os } from '@orpc/server'
import { WebhookAgentEnvironmentSuspendedSchema } from '../components'

export const postAgentEnvironmentSuspended = os
  .route({
    method: 'POST',
    path: '/agent_environment_suspended',
    description: 'Sent when an agent environment is suspended and can resume from a snapshot.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
  })
  .input(WebhookAgentEnvironmentSuspendedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
