import { os } from '@orpc/server'
import { WebhookSafetyWarningIssuedSchema } from '../components'

export const postSafetyWarningIssued = os
  .route({
    method: 'POST',
    path: '/safety_warning_issued',
    description:
      'Sent when a warning is issued for a safety identifier in your organization.\nRetrieve the case details with `GET /v1/safety/cases/{id}` using `data.id`.\n',
    successDescription:
      'Return any 2xx status code to acknowledge receipt. A 410 Gone response also stops retries; other non-2xx responses are retried.',
  })
  .input(WebhookSafetyWarningIssuedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
