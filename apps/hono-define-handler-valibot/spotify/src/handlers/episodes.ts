import { Hono } from 'hono'
import { getEpisodesIdHandler, getEpisodesHandler } from '../routes'

export const episodesHandler = new Hono()
  .get(
    '/episodes/:id',
    getEpisodesIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/episodes',
    getEpisodesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
