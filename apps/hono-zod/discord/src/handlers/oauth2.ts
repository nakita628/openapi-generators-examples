import { Hono } from 'hono'

export const oauth2Handler = new Hono()
  .get('/oauth2/@me', (c) => {})
  .get('/oauth2/applications/@me', (c) => {})
  .get('/oauth2/keys', (c) => {})
  .get('/oauth2/userinfo', (c) => {})
