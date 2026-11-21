import { Elysia } from 'elysia'
import { stations } from './modules/stations'
import { trips } from './modules/trips'
import { bookings } from './modules/bookings'
import { webhooks } from './modules/webhooks'

export const app = new Elysia().use(stations).use(trips).use(bookings).use(webhooks)

if (import.meta.main) {
  app.listen(3000)
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
}
