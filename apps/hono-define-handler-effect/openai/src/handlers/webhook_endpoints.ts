import { Hono } from 'hono'
import {
  getWebhookEndpointsHandler,
  postWebhookEndpointsHandler,
  getWebhookEndpointsWebhookEndpointIdHandler,
  postWebhookEndpointsWebhookEndpointIdHandler,
  deleteWebhookEndpointsWebhookEndpointIdHandler,
  postWebhookEndpointsWebhookEndpointIdRotateSecretHandler,
  postWebhookEndpointsWebhookEndpointIdTestHandler,
} from '../routes'

export const webhookEndpointsHandler = new Hono()
  .get(
    '/webhook_endpoints',
    getWebhookEndpointsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/webhook_endpoints',
    postWebhookEndpointsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/webhook_endpoints/:webhook_endpoint_id',
    getWebhookEndpointsWebhookEndpointIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id',
    postWebhookEndpointsWebhookEndpointIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/webhook_endpoints/:webhook_endpoint_id',
    deleteWebhookEndpointsWebhookEndpointIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/rotate_secret',
    postWebhookEndpointsWebhookEndpointIdRotateSecretHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/test',
    postWebhookEndpointsWebhookEndpointIdTestHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
