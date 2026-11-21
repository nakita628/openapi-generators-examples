import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  ErrorResponseSchema,
  WebhookEndpointBodySchema,
  WebhookEndpointListResourceSchema,
  PublicCreateEndpointBodySchema,
  WebhookEndpointWithSecretResourceSchema,
  PublicUpdateEndpointBodySchema,
  DeletedWebhookEndpointResourceSchema,
  PublicRotateSecretBodySchema,
  PublicTestEndpointBodySchema,
  WebhookEndpointTestResultResourceSchema,
} from '../components'

export const webhookEndpointsHandler = new Hono()
  .get(
    '/webhook_endpoints',
    describeRoute({
      summary: 'List Webhook Endpoints',
      description: 'Returns webhook endpoints for the authenticated project in newest-first order.',
      operationId: 'ListWebhookEndpoints',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(WebhookEndpointListResourceSchema) } },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The pagination cursor does not identify a webhook endpoint in the authenticated project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        after: z
          .union([
            z.string().meta({ examples: ['whe_123'] }),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints',
    describeRoute({
      summary: 'Create Webhook Endpoint',
      description: 'Creates a webhook endpoint for the authenticated project.',
      operationId: 'CreateWebhookEndpoint',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': { schema: resolver(WebhookEndpointWithSecretResourceSchema) },
          },
        },
        '400': {
          description:
            'The webhook endpoint parameters are invalid or the endpoint cannot be created with the requested URL or event types.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('json', PublicCreateEndpointBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/webhook_endpoints/:webhook_endpoint_id',
    describeRoute({
      summary: 'Retrieve Webhook Endpoint',
      description: 'Retrieves a webhook endpoint for the authenticated project.',
      operationId: 'RetrieveWebhookEndpoint',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(WebhookEndpointBodySchema) } },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id',
    describeRoute({
      summary: 'Update Webhook Endpoint',
      description: 'Updates a webhook endpoint for the authenticated project.',
      operationId: 'UpdateWebhookEndpoint',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(WebhookEndpointBodySchema) } },
        },
        '400': {
          description:
            'The webhook endpoint parameters are invalid or the requested URL or event types are not permitted.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }),
    ),
    validator('json', PublicUpdateEndpointBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/webhook_endpoints/:webhook_endpoint_id',
    describeRoute({
      summary: 'Delete Webhook Endpoint',
      description: 'Deletes a webhook endpoint for the authenticated project.',
      operationId: 'DeleteWebhookEndpoint',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': { schema: resolver(DeletedWebhookEndpointResourceSchema) },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/rotate_secret',
    describeRoute({
      summary: 'Rotate Webhook Endpoint Signing Secret',
      description:
        'Rotates the signing secret for a webhook endpoint in the authenticated project.',
      operationId: 'RotateWebhookEndpointSigningSecret',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': { schema: resolver(WebhookEndpointWithSecretResourceSchema) },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }),
    ),
    validator('json', PublicRotateSecretBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/test',
    describeRoute({
      summary: 'Test Webhook Endpoint',
      description: 'Sends a sample event to a webhook endpoint for the authenticated project.',
      operationId: 'TestWebhookEndpoint',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': { schema: resolver(WebhookEndpointTestResultResourceSchema) },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '500': {
          description: 'The sample event could not be sent to the webhook endpoint.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }),
    ),
    validator('json', PublicTestEndpointBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
