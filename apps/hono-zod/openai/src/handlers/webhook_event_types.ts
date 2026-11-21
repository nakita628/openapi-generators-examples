import { Hono } from 'hono'

export const webhookEventTypesHandler = new Hono().get('/webhook_event_types', (c) => {})
