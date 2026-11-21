import { Hono } from 'hono'

export const gatewayHandler = new Hono().get('/gateway', (c) => {}).get('/gateway/bot', (c) => {})
