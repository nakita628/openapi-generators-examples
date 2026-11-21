import { os } from '@orpc/server'
import * as v from 'valibot'
import { BookingSchema, LinksPaginationSchema, LinksSelfSchema } from '../components'

export const postNewBooking = os
  .route({
    method: 'POST',
    path: '/newBooking',
    tags: ['Bookings'],
    summary: 'New Booking',
    description:
      'Subscribe to new bookings being created, to update integrations for your users.  Related data is available via the links provided in the request.\n',
    successDescription: 'Return a 200 status to indicate that the data was received successfully.',
  })
  .input(
    v.intersect([
      BookingSchema,
      v.partial(v.object({ links: v.intersect([LinksSelfSchema, LinksPaginationSchema]) })),
    ]),
  )
  .handler(async ({ input }) => {})
