import { Hono } from 'hono'
import {
  getOauth2MeHandler,
  getOauth2ApplicationsMeHandler,
  getOauth2KeysHandler,
  getOauth2UserinfoHandler,
} from '../routes'

export const oauth2Handler = new Hono()
  .get(
    '/oauth2/@me',
    getOauth2MeHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/oauth2/applications/@me',
    getOauth2ApplicationsMeHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/oauth2/keys',
    getOauth2KeysHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/oauth2/userinfo',
    getOauth2UserinfoHandler(async (c) => { throw new Error('Not implemented') }),
  )
