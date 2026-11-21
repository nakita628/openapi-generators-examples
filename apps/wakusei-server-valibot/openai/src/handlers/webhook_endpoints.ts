import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  DeletedWebhookEndpointResourceSchema,
  ProjectEventTypeEnumSchema,
  PublicCreateEndpointBodySchema,
  WebhookEndpointBodySchema,
  WebhookEndpointListResourceSchema,
  WebhookEndpointTestResultResourceSchema,
  WebhookEndpointWithSecretResourceSchema,
} from '../components'

export const getWebhookEndpoints = os
  .route({
    method: 'GET',
    path: '/webhook_endpoints',
    summary: 'List Webhook Endpoints',
    description: 'Returns webhook endpoints for the authenticated project in newest-first order.',
    successDescription: 'Success',
  })
  .input(
    v.object({
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(100),
        ),
      ),
      after: v.optional(
        v.union([
          v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })),
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === 'null' ? null : input)),
            v.nullable(v.null()),
          ),
        ]),
      ),
    }),
  )
  .output(WebhookEndpointListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postWebhookEndpoints = os
  .route({
    method: 'POST',
    path: '/webhook_endpoints',
    summary: 'Create Webhook Endpoint',
    description: 'Creates a webhook endpoint for the authenticated project.',
    successDescription: 'Success',
  })
  .input(PublicCreateEndpointBodySchema)
  .output(WebhookEndpointWithSecretResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getWebhookEndpointsWebhookEndpointId = os
  .route({
    method: 'GET',
    path: '/webhook_endpoints/{webhook_endpoint_id}',
    summary: 'Retrieve Webhook Endpoint',
    description: 'Retrieves a webhook endpoint for the authenticated project.',
    successDescription: 'Success',
  })
  .input(
    v.object({ webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })) }),
  )
  .output(WebhookEndpointBodySchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postWebhookEndpointsWebhookEndpointId = os
  .route({
    method: 'POST',
    path: '/webhook_endpoints/{webhook_endpoint_id}',
    summary: 'Update Webhook Endpoint',
    description: 'Updates a webhook endpoint for the authenticated project.',
    successDescription: 'Success',
  })
  .input(
    v.object({
      webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })),
      name: v.optional(
        v.pipe(
          v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(256)),
          v.description('A new human-readable name for the webhook endpoint.'),
        ),
      ),
      url: v.optional(
        v.pipe(
          v.pipe(v.string(), v.regex(/^https:\/\//), v.maxCodePoints(2048)),
          v.description('A new HTTPS URL that receives webhook deliveries.'),
        ),
      ),
      event_types: v.optional(
        v.pipe(
          v.pipe(v.array(ProjectEventTypeEnumSchema), v.minLength(1)),
          v.description('The complete set of event types that should trigger deliveries.'),
        ),
      ),
    }),
  )
  .output(WebhookEndpointBodySchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteWebhookEndpointsWebhookEndpointId = os
  .route({
    method: 'DELETE',
    path: '/webhook_endpoints/{webhook_endpoint_id}',
    summary: 'Delete Webhook Endpoint',
    description: 'Deletes a webhook endpoint for the authenticated project.',
    successDescription: 'Success',
  })
  .input(
    v.object({ webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })) }),
  )
  .output(DeletedWebhookEndpointResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postWebhookEndpointsWebhookEndpointIdRotateSecret = os
  .route({
    method: 'POST',
    path: '/webhook_endpoints/{webhook_endpoint_id}/rotate_secret',
    summary: 'Rotate Webhook Endpoint Signing Secret',
    description: 'Rotates the signing secret for a webhook endpoint in the authenticated project.',
    successDescription: 'Success',
  })
  .input(
    v.object({
      webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })),
      keep_old_secret_active_for_24_hours: v.optional(
        v.pipe(
          v.boolean(),
          v.description(
            'Whether to keep the previous signing secret valid for 24 hours after rotation. Defaults to false, which invalidates the previous secret immediately.',
          ),
        ),
      ),
    }),
  )
  .output(WebhookEndpointWithSecretResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postWebhookEndpointsWebhookEndpointIdTest = os
  .route({
    method: 'POST',
    path: '/webhook_endpoints/{webhook_endpoint_id}/test',
    summary: 'Test Webhook Endpoint',
    description: 'Sends a sample event to a webhook endpoint for the authenticated project.',
    successDescription: 'Success',
  })
  .input(
    v.object({
      webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })),
      event_type: ProjectEventTypeEnumSchema,
    }),
  )
  .output(WebhookEndpointTestResultResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
