import { Hono } from 'hono'

export const marketsHandler = new Hono().get('/markets', (c) => { throw new Error('Not implemented') })
