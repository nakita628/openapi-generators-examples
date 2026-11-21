import { Hono } from 'hono'
import { getTracksIdHandler, getTracksHandler } from '../routes'

export const tracksHandler = new Hono()
  .get(
    '/tracks/:id',
    getTracksIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/tracks',
    getTracksHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
