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
    getWebhookEndpointsHandler(async (c, { query }) => {}),
  )
  .post(
    '/webhook_endpoints',
    postWebhookEndpointsHandler(async (c, { json }) => {}),
  )
  .get(
    '/webhook_endpoints/:webhook_endpoint_id',
    getWebhookEndpointsWebhookEndpointIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id',
    postWebhookEndpointsWebhookEndpointIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/webhook_endpoints/:webhook_endpoint_id',
    deleteWebhookEndpointsWebhookEndpointIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/rotate_secret',
    postWebhookEndpointsWebhookEndpointIdRotateSecretHandler(async (c, { param, json }) => {}),
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/test',
    postWebhookEndpointsWebhookEndpointIdTestHandler(async (c, { param, json }) => {}),
  )
