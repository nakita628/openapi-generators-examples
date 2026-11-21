import { Hono } from 'hono'
import { getMarketsHandler } from '../routes'

export const marketsHandler = new Hono().get(
  '/markets',
  getMarketsHandler(async (c) => {}),
)
