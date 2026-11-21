import { os } from '@orpc/server'
import { WebhookSafetyAlertCreatedSchema } from '../components'

export const postSafetyAlertCreated = os
  .route({
    method: 'POST',
    path: '/safety_alert_created',
    description:
      'Sent when an approved safety alert is available for an API project.\nRetrieve the alert with a project API key granted `api.safety.alerts.read`.\n',
    successDescription:
      'Return any 2xx status code to acknowledge receipt. A 410 Gone response also stops retries; other non-2xx responses are retried.',
  })
  .input(WebhookSafetyAlertCreatedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
