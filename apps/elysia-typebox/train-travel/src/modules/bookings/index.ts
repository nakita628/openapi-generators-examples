import { Elysia, t } from 'elysia'
import {
  BookingSchema,
  BookingPaymentSchema,
  LinksBookingSchema,
  LinksPaginationSchema,
  LinksSelfSchema,
  WrapperCollectionSchema,
} from '../../components/schemas'
import { BookingsModel } from './model'

export const bookings = new Elysia()
  .model({
    Booking: BookingSchema,
    BookingPayment: BookingPaymentSchema,
    LinksBooking: LinksBookingSchema,
    LinksPagination: LinksPaginationSchema,
    LinksSelf: LinksSelfSchema,
    WrapperCollection: WrapperCollectionSchema,
  })
  .get('/bookings', () => { throw new Error('Not implemented') }, {
    response: {
      200: BookingsModel.getBookingsResponse200,
      400: t.Void(),
      401: t.Void(),
      403: t.Void(),
      429: t.Void(),
      500: t.Void(),
    },
    detail: {
      tags: ['Bookings'],
      summary: 'List existing bookings',
      description: 'Returns a list of all trips booking by the authenticated user.',
      operationId: 'get-bookings',
    },
  })
  .post('/bookings', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'Booking',
    response: {
      201: BookingsModel.createBookingResponse201,
      400: t.Void(),
      401: t.Void(),
      404: t.Void(),
      409: t.Void(),
      429: t.Void(),
      500: t.Void(),
    },
    detail: {
      tags: ['Bookings'],
      summary: 'Create a booking',
      description:
        'A booking is a temporary hold on a trip. It is not confirmed until the payment is processed.',
      operationId: 'create-booking',
      security: [{ OAuth2: ['write'] }],
    },
  })
  .get('/bookings/:bookingId', ({ params }) => { throw new Error('Not implemented') }, {
    params: BookingsModel.getBookingParams,
    response: {
      200: BookingsModel.getBookingResponse200,
      400: t.Void(),
      401: t.Void(),
      403: t.Void(),
      404: t.Void(),
      429: t.Void(),
      500: t.Void(),
    },
    detail: {
      tags: ['Bookings'],
      summary: 'Get a booking',
      description: 'Returns the details of a specific booking.',
      operationId: 'get-booking',
    },
  })
  .delete('/bookings/:bookingId', ({ params }) => { throw new Error('Not implemented') }, {
    params: BookingsModel.deleteBookingParams,
    response: {
      204: t.Void(),
      400: t.Void(),
      401: t.Void(),
      403: t.Void(),
      404: t.Void(),
      429: t.Void(),
      500: t.Void(),
    },
    detail: {
      tags: ['Bookings'],
      summary: 'Delete a booking',
      description: 'Deletes a booking, cancelling the hold on the trip.',
      operationId: 'delete-booking',
      security: [{ OAuth2: ['write'] }],
    },
  })
  .post('/bookings/:bookingId/payment', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: BookingsModel.createBookingPaymentParams,
    body: 'BookingPayment',
    response: {
      200: BookingsModel.createBookingPaymentResponse200,
      400: t.Void(),
      401: t.Void(),
      403: t.Void(),
      429: t.Void(),
      500: t.Void(),
    },
    detail: {
      tags: ['Payments'],
      summary: 'Pay for a Booking',
      description:
        'A payment is an attempt to pay for the booking, which will confirm the booking for the user and enable them to get their tickets.',
      operationId: 'create-booking-payment',
    },
  })
