import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema, SchemaTransformation } from 'effect'
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(WebhookEndpointListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The pagination cursor does not identify a webhook endpoint in the authenticated project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(1),
                Schema.isLessThanOrEqualTo(100),
              ),
          ),
          after: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
              Schema.Unknown.pipe(
                Schema.decodeTo(
                  Schema.Unknown,
                  SchemaTransformation.transform<unknown, unknown>({
                    decode: (input) => (input === 'null' ? null : input),
                    encode: (output) => output,
                  }),
                ),
                Schema.decodeTo(Schema.Null),
              ),
            ]),
          ),
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
              schema: resolver(Schema.toStandardSchemaV1(WebhookEndpointWithSecretResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The webhook endpoint parameters are invalid or the endpoint cannot be created with the requested URL or event types.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(PublicCreateEndpointBodySchema)),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(WebhookEndpointBodySchema)),
            },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
        }),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(WebhookEndpointBodySchema)),
            },
          },
        },
        '400': {
          description:
            'The webhook endpoint parameters are invalid or the requested URL or event types are not permitted.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
        }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(PublicUpdateEndpointBodySchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(DeletedWebhookEndpointResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
        }),
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
              schema: resolver(Schema.toStandardSchemaV1(WebhookEndpointWithSecretResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
        }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(PublicRotateSecretBodySchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(WebhookEndpointTestResultResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The webhook endpoint was not found in the authenticated project.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '500': {
          description: 'The sample event could not be sent to the webhook endpoint.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          webhook_endpoint_id: Schema.String.annotate({ jsonSchemaExamples: ['whe_123'] }),
        }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(PublicTestEndpointBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
