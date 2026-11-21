import { Hono } from 'hono'
import { getTripsHandler } from '../routes'

export const tripsHandler = new Hono().get(
  '/trips',
  getTripsHandler(async (c, { query }) => {}),
)
