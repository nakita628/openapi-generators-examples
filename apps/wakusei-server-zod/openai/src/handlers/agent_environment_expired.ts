import { os } from '@orpc/server'
import { WebhookAgentEnvironmentExpiredSchema } from '../components'

export const postAgentEnvironmentExpired = os
  .route({
    method: 'POST',
    path: '/agent_environment_expired',
    description:
      'Sent when an agent environment expires and can no longer resume from a snapshot.\n',
    successDescription:
      'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
  })
  .input(WebhookAgentEnvironmentExpiredSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
