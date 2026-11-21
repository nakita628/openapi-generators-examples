import { Hono } from 'hono'
import {
  getBookingsHandler,
  postBookingsHandler,
  getBookingsBookingIdHandler,
  deleteBookingsBookingIdHandler,
  postBookingsBookingIdPaymentHandler,
} from '../routes'

export const bookingsHandler = new Hono()
  .get(
    '/bookings',
    getBookingsHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .post(
    '/bookings',
    postBookingsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/bookings/:bookingId',
    getBookingsBookingIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/bookings/:bookingId',
    deleteBookingsBookingIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/bookings/:bookingId/payment',
    postBookingsBookingIdPaymentHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
