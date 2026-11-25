import { Hono } from 'hono'
import {
  getLiffV1AppsHandler,
  postLiffV1AppsHandler,
  putLiffV1AppsLiffIdHandler,
  deleteLiffV1AppsLiffIdHandler,
} from '../routes'

export const liffHandler = new Hono()
  .get(
    '/liff/v1/apps',
    getLiffV1AppsHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .post(
    '/liff/v1/apps',
    postLiffV1AppsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/liff/v1/apps/:liffId',
    putLiffV1AppsLiffIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/liff/v1/apps/:liffId',
    deleteLiffV1AppsLiffIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
