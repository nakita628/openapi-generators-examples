import { Elysia, t } from 'elysia'
import { BookingSchema, LinksPaginationSchema, LinksSelfSchema } from '../../components/schemas'
import { WebhooksModel } from './model'

export const webhooks = new Elysia()
  .model({
    Booking: BookingSchema,
    LinksPagination: LinksPaginationSchema,
    LinksSelf: LinksSelfSchema,
  })
  .post('/webhooks/newBooking', ({ body }) => {}, {
    body: WebhooksModel.newBookingBody,
    response: { 200: t.Void() },
    detail: {
      tags: ['Bookings'],
      summary: 'New Booking',
      description:
        'Subscribe to new bookings being created, to update integrations for your users.  Related data is available via the links provided in the request.\n',
      operationId: 'new-booking',
    },
  })
