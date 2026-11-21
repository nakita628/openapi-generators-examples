import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'
import { BookingSchema, BookingPaymentSchema } from '../components'

export const bookingsHandler = new Hono()
  .get('/bookings', (c) => {})
  .post('/bookings', tbValidator('json', BookingSchema), (c) => {})
  .get(
    '/bookings/:bookingId',
    tbValidator('param', Type.Object({ bookingId: Type.String({ format: 'uuid' }) })),
    (c) => {},
  )
  .delete(
    '/bookings/:bookingId',
    tbValidator('param', Type.Object({ bookingId: Type.String({ format: 'uuid' }) })),
    (c) => {},
  )
  .post(
    '/bookings/:bookingId/payment',
    tbValidator('param', Type.Object({ bookingId: Type.String({ format: 'uuid' }) })),
    tbValidator('json', BookingPaymentSchema),
    (c) => {},
  )
