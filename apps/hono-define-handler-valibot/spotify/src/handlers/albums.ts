import { Hono } from 'hono'
import { getAlbumsIdHandler, getAlbumsHandler, getAlbumsIdTracksHandler } from '../routes'

export const albumsHandler = new Hono()
  .get(
    '/albums/:id',
    getAlbumsIdHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/albums',
    getAlbumsHandler(async (c, { query }) => {}),
  )
  .get(
    '/albums/:id/tracks',
    getAlbumsIdTracksHandler(async (c, { param, query }) => {}),
  )
