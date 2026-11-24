import { Hono } from 'hono'
import {
  postOauth2V3TokenHandler,
  getOauth2V21TokensKidHandler,
  postOauth2V21TokenHandler,
  getOauth2V21VerifyHandler,
  postOauth2V21RevokeHandler,
} from '../routes'

export const oauth2Handler = new Hono()
  .post(
    '/oauth2/v3/token',
    postOauth2V3TokenHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/oauth2/v2.1/tokens/kid',
    getOauth2V21TokensKidHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/oauth2/v2.1/token',
    postOauth2V21TokenHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/oauth2/v2.1/verify',
    getOauth2V21VerifyHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/oauth2/v2.1/revoke',
    postOauth2V21RevokeHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
