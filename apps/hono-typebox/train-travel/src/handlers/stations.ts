import { Hono } from 'hono'

export const stationsHandler = new Hono().get('/stations', (c) => {})
