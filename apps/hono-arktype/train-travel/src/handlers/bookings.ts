import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { BookingSchema, BookingPaymentSchema } from '../components'

export const bookingsHandler = new Hono()
  .get('/bookings', (c) => { throw new Error('Not implemented') })
  .post('/bookings', sValidator('json', BookingSchema), (c) => { throw new Error('Not implemented') })
  .get('/bookings/:bookingId', sValidator('param', type({ bookingId: 'string.uuid' })), (c) => { throw new Error('Not implemented') })
  .delete(
    '/bookings/:bookingId',
    sValidator('param', type({ bookingId: 'string.uuid' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/bookings/:bookingId/payment',
    sValidator('param', type({ bookingId: 'string.uuid' })),
    sValidator('json', BookingPaymentSchema),
    (c) => { throw new Error('Not implemented') },
  )
