import { Elysia } from 'elysia'
import {
  DeletedWebhookEndpointResourceSchema,
  ErrorSchema,
  ErrorResponseSchema,
  MisalignmentErrorDetailsResourceSchema,
  ProjectEventTypeEnumSchema,
  PublicCreateEndpointBodySchema,
  PublicRotateSecretBodySchema,
  PublicTestEndpointBodySchema,
  PublicUpdateEndpointBodySchema,
  WebhookEndpointBodySchema,
  WebhookEndpointListResourceSchema,
  WebhookEndpointTestResultResourceSchema,
  WebhookEndpointWithSecretResourceSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { WebhookEndpointsModel } from './model'

export const webhookEndpoints = new Elysia()
  .model({
    DeletedWebhookEndpointResource: DeletedWebhookEndpointResourceSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    ProjectEventTypeEnum: ProjectEventTypeEnumSchema,
    PublicCreateEndpointBody: PublicCreateEndpointBodySchema,
    PublicRotateSecretBody: PublicRotateSecretBodySchema,
    PublicTestEndpointBody: PublicTestEndpointBodySchema,
    PublicUpdateEndpointBody: PublicUpdateEndpointBodySchema,
    WebhookEndpointBody: WebhookEndpointBodySchema,
    WebhookEndpointListResource: WebhookEndpointListResourceSchema,
    WebhookEndpointTestResultResource: WebhookEndpointTestResultResourceSchema,
    WebhookEndpointWithSecretResource: WebhookEndpointWithSecretResourceSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .get('/webhook_endpoints', ({ query }) => { throw new Error('Not implemented') }, {
    query: WebhookEndpointsModel.ListWebhookEndpointsQuery,
    response: { 200: 'WebhookEndpointListResource', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'List Webhook Endpoints',
      description: 'Returns webhook endpoints for the authenticated project in newest-first order.',
      operationId: 'ListWebhookEndpoints',
    },
  })
  .post('/webhook_endpoints', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'PublicCreateEndpointBody',
    response: { 200: 'WebhookEndpointWithSecretResource', 400: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'Create Webhook Endpoint',
      description: 'Creates a webhook endpoint for the authenticated project.',
      operationId: 'CreateWebhookEndpoint',
    },
  })
  .get('/webhook_endpoints/:webhook_endpoint_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: WebhookEndpointsModel.RetrieveWebhookEndpointParams,
    response: { 200: 'WebhookEndpointBody', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'Retrieve Webhook Endpoint',
      description: 'Retrieves a webhook endpoint for the authenticated project.',
      operationId: 'RetrieveWebhookEndpoint',
    },
  })
  .post('/webhook_endpoints/:webhook_endpoint_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: WebhookEndpointsModel.UpdateWebhookEndpointParams,
    body: 'PublicUpdateEndpointBody',
    response: { 200: 'WebhookEndpointBody', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'Update Webhook Endpoint',
      description: 'Updates a webhook endpoint for the authenticated project.',
      operationId: 'UpdateWebhookEndpoint',
    },
  })
  .delete('/webhook_endpoints/:webhook_endpoint_id', ({ params }) => { throw new Error('Not implemented') }, {
    params: WebhookEndpointsModel.DeleteWebhookEndpointParams,
    response: { 200: 'DeletedWebhookEndpointResource', 400: 'ErrorResponse', 404: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'Delete Webhook Endpoint',
      description: 'Deletes a webhook endpoint for the authenticated project.',
      operationId: 'DeleteWebhookEndpoint',
    },
  })
  .post('/webhook_endpoints/:webhook_endpoint_id/rotate_secret', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: WebhookEndpointsModel.RotateWebhookEndpointSigningSecretParams,
    body: 'PublicRotateSecretBody',
    response: {
      200: 'WebhookEndpointWithSecretResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Rotate Webhook Endpoint Signing Secret',
      description:
        'Rotates the signing secret for a webhook endpoint in the authenticated project.',
      operationId: 'RotateWebhookEndpointSigningSecret',
    },
  })
  .post('/webhook_endpoints/:webhook_endpoint_id/test', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: WebhookEndpointsModel.TestWebhookEndpointParams,
    body: 'PublicTestEndpointBody',
    response: {
      200: 'WebhookEndpointTestResultResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Test Webhook Endpoint',
      description: 'Sends a sample event to a webhook endpoint for the authenticated project.',
      operationId: 'TestWebhookEndpoint',
    },
  })
