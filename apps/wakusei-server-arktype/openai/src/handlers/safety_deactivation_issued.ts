import { os } from '@orpc/server'
import { WebhookSafetyDeactivationIssuedSchema } from '../components'

export const postSafetyDeactivationIssued = os
  .route({
    method: 'POST',
    path: '/safety_deactivation_issued',
    description:
      'Sent when a deactivation is issued for a safety identifier in your organization.\nRetrieve the case details with `GET /v1/safety/cases/{id}` using `data.id`.\n',
    successDescription:
      'Return any 2xx status code to acknowledge receipt. A 410 Gone response also stops retries; other non-2xx responses are retried.',
  })
  .input(WebhookSafetyDeactivationIssuedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
