import { initTRPC } from '@trpc/server'
import { stationsRouter } from './stations'
import { tripsRouter } from './trips'
import { bookingsRouter } from './bookings'

const t = initTRPC.create()

export const appRouter = t.router({
  stations: stationsRouter,
  trips: tripsRouter,
  bookings: bookingsRouter,
})
