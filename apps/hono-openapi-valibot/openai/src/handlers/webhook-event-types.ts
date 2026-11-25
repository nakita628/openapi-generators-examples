import { Hono } from 'hono'
import { describeRoute, resolver } from 'hono-openapi'
import { ErrorResponseSchema, WebhookEventTypeListResourceSchema } from '../components'

export const webhookEventTypesHandler = new Hono().get(
  '/webhook_event_types',
  describeRoute({
    summary: 'List Webhook Event Types',
    description: 'Returns webhook event types visible to the authenticated project.',
    operationId: 'ListWebhookEventTypes',
    responses: {
      '200': {
        description: 'Success',
        content: { 'application/json': { schema: resolver(WebhookEventTypeListResourceSchema) } },
      },
      '401': {
        description: 'The request does not contain authentication credentials.',
        headers: {
          'WWW-Authenticate': {
            description: 'The bearer authentication challenge returned by the service.',
            schema: { type: 'string' },
            example: 'Bearer realm="OpenAI API"',
          },
        },
        content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
      },
    },
  }),
  (c) => { throw new Error('Not implemented') },
)
