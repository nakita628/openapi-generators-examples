import { Hono } from 'hono'
import { getChaptersIdHandler, getChaptersHandler } from '../routes'

export const chaptersHandler = new Hono()
  .get(
    '/chapters/:id',
    getChaptersIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/chapters',
    getChaptersHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
