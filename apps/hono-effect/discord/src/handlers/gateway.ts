import { Hono } from 'hono'

export const gatewayHandler = new Hono().get('/gateway', (c) => { throw new Error('Not implemented') }).get('/gateway/bot', (c) => { throw new Error('Not implemented') })
