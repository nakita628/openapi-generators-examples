import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
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

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(WebhookEndpointListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The pagination cursor does not identify a webhook endpoint in the authenticated project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          after: Type.Optional(Type.Union([Type.String({ examples: ['whe_123'] }), Type.Null()])),
        }),
      ),
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
            'application/json': {
              schema: resolver(toStandardSchemaV1(WebhookEndpointWithSecretResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The webhook endpoint parameters are invalid or the endpoint cannot be created with the requested URL or event types.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(PublicCreateEndpointBodySchema)),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(WebhookEndpointBodySchema)) },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ webhook_endpoint_id: Type.String({ examples: ['whe_123'] }) }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(WebhookEndpointBodySchema)) },
          },
        },
        '400': {
          description:
            'The webhook endpoint parameters are invalid or the requested URL or event types are not permitted.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ webhook_endpoint_id: Type.String({ examples: ['whe_123'] }) }),
      ),
    ),
    validator('json', toStandardSchemaV1(PublicUpdateEndpointBodySchema)),
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
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedWebhookEndpointResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ webhook_endpoint_id: Type.String({ examples: ['whe_123'] }) }),
      ),
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
            'application/json': {
              schema: resolver(toStandardSchemaV1(WebhookEndpointWithSecretResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ webhook_endpoint_id: Type.String({ examples: ['whe_123'] }) }),
      ),
    ),
    validator('json', toStandardSchemaV1(PublicRotateSecretBodySchema)),
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
            'application/json': {
              schema: resolver(toStandardSchemaV1(WebhookEndpointTestResultResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '500': {
          description: 'The sample event could not be sent to the webhook endpoint.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ webhook_endpoint_id: Type.String({ examples: ['whe_123'] }) }),
      ),
    ),
    validator('json', toStandardSchemaV1(PublicTestEndpointBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
