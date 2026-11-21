import { Hono } from 'hono'
import { getSearchHandler } from '../routes'

export const searchHandler = new Hono().get(
  '/search',
  getSearchHandler(async (c, { query }) => { throw new Error('Not implemented') }),
)
