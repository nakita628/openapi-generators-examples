import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Schema } from 'effect'
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
    Schema.toStandardSchemaV1(
      BookingSchema.check(
        Schema.makeFilter((input) =>
          Schema.is(
            Schema.Struct({
              links: Schema.optional(
                LinksSelfSchema.check(
                  Schema.makeFilter((input) => Schema.is(LinksPaginationSchema)(input)),
                ),
              ),
            }),
          )(input),
        ),
      ),
    ),
  ),
  (c) => { throw new Error('Not implemented') },
)
