import { Elysia } from 'elysia'
import {
  ErrorSchema,
  ErrorResponseSchema,
  MisalignmentErrorDetailsResourceSchema,
  WebhookEventTypeListResourceSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { WebhookEventTypesModel } from './model'

export const webhookEventTypes = new Elysia()
  .model({
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    WebhookEventTypeListResource: WebhookEventTypeListResourceSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .get('/webhook_event_types', () => { throw new Error('Not implemented') }, {
    response: { 200: 'WebhookEventTypeListResource', 401: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'List Webhook Event Types',
      description: 'Returns webhook event types visible to the authenticated project.',
      operationId: 'ListWebhookEventTypes',
    },
  })
