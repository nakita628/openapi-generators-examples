import { Hono } from 'hono'

export const oauth2Handler = new Hono()
  .get('/oauth2/@me', (c) => { throw new Error('Not implemented') })
  .get('/oauth2/applications/@me', (c) => { throw new Error('Not implemented') })
  .get('/oauth2/keys', (c) => { throw new Error('Not implemented') })
  .get('/oauth2/userinfo', (c) => { throw new Error('Not implemented') })
