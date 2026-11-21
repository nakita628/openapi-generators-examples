import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { BookingSchema, BookingPaymentSchema } from '../components'

export const bookingsHandler = new Hono()
  .get('/bookings', (c) => { throw new Error('Not implemented') })
  .post('/bookings', sValidator('json', Schema.toStandardSchemaV1(BookingSchema)), (c) => { throw new Error('Not implemented') })
  .get(
    '/bookings/:bookingId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ bookingId: Schema.String.check(Schema.isUUID()) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/bookings/:bookingId',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ bookingId: Schema.String.check(Schema.isUUID()) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/bookings/:bookingId/payment',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ bookingId: Schema.String.check(Schema.isUUID()) })),
    ),
    sValidator('json', Schema.toStandardSchemaV1(BookingPaymentSchema)),
    (c) => { throw new Error('Not implemented') },
  )
