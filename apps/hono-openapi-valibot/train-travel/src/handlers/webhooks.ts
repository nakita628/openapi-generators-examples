import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import * as v from 'valibot'
import { LinksSelfSchema, LinksPaginationSchema, BookingSchema } from '../components'

export const webhooksHandler = new Hono().post(
  '/newBooking',
  describeRoute({
    operationId: 'new-booking',
    summary: 'New Booking',
    description:
      'Subscribe to new bookings being created, to update integrations for your users.  Related data is available via the links provided in the request.\n',
    tags: ['Bookings'],
    responses: {
      '200': {
        description: 'Return a 200 status to indicate that the data was received successfully.',
        headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
      },
    },
  }),
  validator(
    'json',
    v.intersect([
      BookingSchema,
      v.partial(v.object({ links: v.intersect([LinksSelfSchema, LinksPaginationSchema]) })),
    ]),
  ),
  (c) => { throw new Error('Not implemented') },
)
