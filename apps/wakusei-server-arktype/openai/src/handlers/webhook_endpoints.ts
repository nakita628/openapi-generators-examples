import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type({
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 100'),
      'after?': type('unknown').pipe((data, ctx) => {
        for (const branch of [
          type('string'),
          type('unknown')
            .pipe((data) => (data === 'null' ? null : data))
            .to('null | null'),
        ]) {
          const out = branch(data)
          if (!(out instanceof type.errors)) return out
        }
        return ctx.error('one of the members')
      }),
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
  .input(type({ webhook_endpoint_id: type('string') }))
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
    type({
      webhook_endpoint_id: type('string'),
      'name?': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'))
        .describe('A new human-readable name for the webhook endpoint.'),
      'url?': type('string')
        .and(/^https:\/\//)
        .narrow((data, ctx) => [...data].length <= 2048 || ctx.mustBe('at most 2048 characters'))
        .describe('A new HTTPS URL that receives webhook deliveries.'),
      'event_types?': type(type(ProjectEventTypeEnumSchema).array())
        .and(type('unknown[] >= 1'))
        .describe('The complete set of event types that should trigger deliveries.'),
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
  .input(type({ webhook_endpoint_id: type('string') }))
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
    type({
      webhook_endpoint_id: type('string'),
      'keep_old_secret_active_for_24_hours?': type('boolean').describe(
        'Whether to keep the previous signing secret valid for 24 hours after rotation. Defaults to false, which invalidates the previous secret immediately.',
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
  .input(type({ webhook_endpoint_id: type('string'), event_type: ProjectEventTypeEnumSchema }))
  .output(WebhookEndpointTestResultResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
