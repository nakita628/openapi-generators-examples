import { os } from '@orpc/server'
import { WebhookSafetyOrgAlertCreatedSchema } from '../components'

export const postSafetyOrgAlertCreated = os
  .route({
    method: 'POST',
    path: '/safety_org_alert_created',
    description:
      "Sent when an approved safety alert is available for an enterprise workspace.\nRetrieve the alert from `https://api.chatgpt.com/v1/safety/alerts/{id}` with\nan administrator API key for the workspace's backing organization granted\n`chatgpt.enterprise.safety_alerts.read`.\n",
    successDescription:
      'Return any 2xx status code to acknowledge receipt. A 410 Gone response also stops retries; other non-2xx responses are retried.',
  })
  .input(WebhookSafetyOrgAlertCreatedSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
