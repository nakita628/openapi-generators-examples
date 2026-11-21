import { Hono } from 'hono'
import { bookingsHandler, stationsHandler, tripsHandler } from './handlers'

const app = new Hono()

export const api = app
  .route('/', bookingsHandler)
  .route('/', stationsHandler)
  .route('/', tripsHandler)

export default app
