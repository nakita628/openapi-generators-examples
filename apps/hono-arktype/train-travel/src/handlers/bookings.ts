import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { BookingSchema, BookingPaymentSchema } from '../components'

export const bookingsHandler = new Hono()
  .get('/bookings', (c) => {})
  .post('/bookings', sValidator('json', BookingSchema), (c) => {})
  .get('/bookings/:bookingId', sValidator('param', type({ bookingId: 'string.uuid' })), (c) => {})
  .delete(
    '/bookings/:bookingId',
    sValidator('param', type({ bookingId: 'string.uuid' })),
    (c) => {},
  )
  .post(
    '/bookings/:bookingId/payment',
    sValidator('param', type({ bookingId: 'string.uuid' })),
    sValidator('json', BookingPaymentSchema),
    (c) => {},
  )
