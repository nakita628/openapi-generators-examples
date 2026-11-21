import { Hono } from 'hono'
import { getStationsHandler } from '../routes'

export const stationsHandler = new Hono().get(
  '/stations',
  getStationsHandler(async (c) => {}),
)
