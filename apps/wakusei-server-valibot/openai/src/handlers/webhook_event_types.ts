import { os } from '@orpc/server'
import { WebhookEventTypeListResourceSchema } from '../components'

export const getWebhookEventTypes = os
  .route({
    method: 'GET',
    path: '/webhook_event_types',
    summary: 'List Webhook Event Types',
    description: 'Returns webhook event types visible to the authenticated project.',
    successDescription: 'Success',
  })
  .output(WebhookEventTypeListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
