import { os } from '@orpc/server'
import * as z from 'zod'
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
    z.object({
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(1).max(100),
        )
        .exactOptional(),
      after: z
        .union([
          z.string().meta({ examples: ['whe_123'] }),
          z.preprocess((val) => (val === 'null' ? null : val), z.null()),
        ])
        .exactOptional(),
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
  .input(z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }))
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
    z.object({
      webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }),
      name: z
        .string()
        .min(1)
        .max(256)
        .meta({ description: 'A new human-readable name for the webhook endpoint.' })
        .exactOptional(),
      url: z
        .string()
        .regex(/^https:\/\//)
        .max(2048)
        .meta({ description: 'A new HTTPS URL that receives webhook deliveries.' })
        .exactOptional(),
      event_types: z
        .array(ProjectEventTypeEnumSchema)
        .min(1)
        .meta({ description: 'The complete set of event types that should trigger deliveries.' })
        .exactOptional(),
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
  .input(z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }))
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
    z.object({
      webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }),
      keep_old_secret_active_for_24_hours: z
        .boolean()
        .meta({
          description:
            'Whether to keep the previous signing secret valid for 24 hours after rotation. Defaults to false, which invalidates the previous secret immediately.',
        })
        .exactOptional(),
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
    z.object({
      webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }),
      event_type: ProjectEventTypeEnumSchema,
    }),
  )
  .output(WebhookEndpointTestResultResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
