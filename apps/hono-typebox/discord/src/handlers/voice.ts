import { Hono } from 'hono'

export const voiceHandler = new Hono().get('/voice/regions', (c) => {})
