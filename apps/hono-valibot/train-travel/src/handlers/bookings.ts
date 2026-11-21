import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { BookingSchema, BookingPaymentSchema } from '../components'

export const bookingsHandler = new Hono()
  .get('/bookings', (c) => { throw new Error('Not implemented') })
  .post('/bookings', sValidator('json', BookingSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/bookings/:bookingId',
    sValidator(
      'param',
      v.object({
        bookingId: v.pipe(
          v.string(),
          v.regex(
            /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/bookings/:bookingId',
    sValidator(
      'param',
      v.object({
        bookingId: v.pipe(
          v.string(),
          v.regex(
            /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/bookings/:bookingId/payment',
    sValidator(
      'param',
      v.object({
        bookingId: v.pipe(
          v.string(),
          v.regex(
            /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
          ),
        ),
      }),
    ),
    sValidator('json', BookingPaymentSchema),
    (c) => { throw new Error('Not implemented') },
  )
