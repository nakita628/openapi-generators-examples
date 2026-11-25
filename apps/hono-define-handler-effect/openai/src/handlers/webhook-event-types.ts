import { Hono } from 'hono'
import { getWebhookEventTypesHandler } from '../routes'

export const webhookEventTypesHandler = new Hono().get(
  '/webhook_event_types',
  getWebhookEventTypesHandler(async (c) => { throw new Error('Not implemented') }),
)
