import { os } from '@orpc/server'
import * as z from 'zod'
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
    z.intersection(
      BookingSchema,
      z.object({ links: z.intersection(LinksSelfSchema, LinksPaginationSchema).exactOptional() }),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })
