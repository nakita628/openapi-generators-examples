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
    getBookingsHandler(async (c) => {}),
  )
  .post(
    '/bookings',
    postBookingsHandler(async (c, { json }) => {}),
  )
  .get(
    '/bookings/:bookingId',
    getBookingsBookingIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/bookings/:bookingId',
    deleteBookingsBookingIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/bookings/:bookingId/payment',
    postBookingsBookingIdPaymentHandler(async (c, { param, json }) => {}),
  )
