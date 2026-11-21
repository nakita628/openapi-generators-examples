import { Hono } from 'hono'
import { getEpisodesIdHandler, getEpisodesHandler } from '../routes'

export const episodesHandler = new Hono()
  .get(
    '/episodes/:id',
    getEpisodesIdHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/episodes',
    getEpisodesHandler(async (c, { query }) => {}),
  )
