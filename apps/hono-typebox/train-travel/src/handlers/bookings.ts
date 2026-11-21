import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'
import { BookingSchema, BookingPaymentSchema } from '../components'

export const bookingsHandler = new Hono()
  .get('/bookings', (c) => { throw new Error('Not implemented') })
  .post('/bookings', tbValidator('json', BookingSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/bookings/:bookingId',
    tbValidator('param', Type.Object({ bookingId: Type.String({ format: 'uuid' }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/bookings/:bookingId',
    tbValidator('param', Type.Object({ bookingId: Type.String({ format: 'uuid' }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/bookings/:bookingId/payment',
    tbValidator('param', Type.Object({ bookingId: Type.String({ format: 'uuid' }) })),
    tbValidator('json', BookingPaymentSchema),
    (c) => { throw new Error('Not implemented') },
  )
