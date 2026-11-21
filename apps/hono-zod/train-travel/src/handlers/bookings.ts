import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { BookingSchema, BookingPaymentSchema } from '../components'

export const bookingsHandler = new Hono()
  .get('/bookings', (c) => {})
  .post('/bookings', sValidator('json', BookingSchema), (c) => {})
  .get('/bookings/:bookingId', sValidator('param', z.object({ bookingId: z.uuid() })), (c) => {})
  .delete('/bookings/:bookingId', sValidator('param', z.object({ bookingId: z.uuid() })), (c) => {})
  .post(
    '/bookings/:bookingId/payment',
    sValidator('param', z.object({ bookingId: z.uuid() })),
    sValidator('json', BookingPaymentSchema),
    (c) => {},
  )
