import { Hono } from 'hono'
import { getShowsIdHandler, getShowsHandler, getShowsIdEpisodesHandler } from '../routes'

export const showsHandler = new Hono()
  .get(
    '/shows/:id',
    getShowsIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/shows',
    getShowsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/shows/:id/episodes',
    getShowsIdEpisodesHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
