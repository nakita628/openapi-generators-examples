import { Hono } from 'hono'
import { getAlbumsIdHandler, getAlbumsHandler, getAlbumsIdTracksHandler } from '../routes'

export const albumsHandler = new Hono()
  .get(
    '/albums/:id',
    getAlbumsIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/albums',
    getAlbumsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/albums/:id/tracks',
    getAlbumsIdTracksHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
