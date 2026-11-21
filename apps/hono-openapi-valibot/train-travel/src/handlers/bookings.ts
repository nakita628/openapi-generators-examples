import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
import {
  LinksSelfSchema,
  LinksPaginationSchema,
  BookingSchema,
  WrapperCollectionSchema,
  BookingPaymentSchema,
  LinksBookingSchema,
  BadRequestResponse,
  ConflictResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  TooManyRequestsResponse,
  UnauthorizedResponse,
} from '../components'

export const bookingsHandler = new Hono()
  .get(
    '/bookings',
    describeRoute({
      operationId: 'get-bookings',
      summary: 'List existing bookings',
      description: 'Returns a list of all trips booking by the authenticated user.',
      tags: ['Bookings'],
      responses: {
        '200': {
          description: 'A list of bookings',
          headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
          content: {
            'application/json': {
              schema: resolver(
                v.intersect([
                  WrapperCollectionSchema,
                  v.partial(v.object({ data: v.array(BookingSchema) })),
                  v.partial(
                    v.object({ links: v.intersect([LinksSelfSchema, LinksPaginationSchema]) }),
                  ),
                ]),
              ),
              example: {
                data: [
                  {
                    id: 'efdbb9d1-02c2-4bc3-afb7-6788d8782b1e',
                    trip_id: 'efdbb9d1-02c2-4bc3-afb7-6788d8782b1e',
                    passenger_name: 'John Doe',
                    has_bicycle: true,
                    has_dog: true,
                  },
                  {
                    id: 'b2e783e1-c824-4d63-b37a-d8d698862f1d',
                    trip_id: 'b2e783e1-c824-4d63-b37a-d8d698862f1d',
                    passenger_name: 'Jane Smith',
                    has_bicycle: false,
                    has_dog: false,
                  },
                ],
                links: {
                  self: 'https://api.example.com/bookings',
                  next: 'https://api.example.com/bookings?page=2',
                },
              },
            },
            'application/xml': {
              schema: resolver(
                v.intersect([
                  WrapperCollectionSchema,
                  v.partial(v.object({ data: v.array(BookingSchema) })),
                  v.partial(
                    v.object({ links: v.intersect([LinksSelfSchema, LinksPaginationSchema]) }),
                  ),
                ]),
              ),
            },
          },
        },
        '400': BadRequestResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
        '500': InternalServerErrorResponse,
      },
    }),
    (c) => {},
  )
  .post(
    '/bookings',
    describeRoute({
      operationId: 'create-booking',
      summary: 'Create a booking',
      description:
        'A booking is a temporary hold on a trip. It is not confirmed until the payment is processed.',
      tags: ['Bookings'],
      security: [{ OAuth2: ['write'] }],
      responses: {
        '201': {
          description: 'Booking successful',
          content: {
            'application/json': {
              schema: resolver(
                v.intersect([BookingSchema, v.partial(v.object({ links: LinksSelfSchema }))]),
              ),
              example: {
                id: 'efdbb9d1-02c2-4bc3-afb7-6788d8782b1e',
                trip_id: 'efdbb9d1-02c2-4bc3-afb7-6788d8782b1e',
                passenger_name: 'John Doe',
                has_bicycle: true,
                has_dog: true,
                links: {
                  self: 'https://api.example.com/bookings/efdbb9d1-02c2-4bc3-afb7-6788d8782b1e',
                },
              },
            },
            'application/xml': {
              schema: resolver(
                v.intersect([BookingSchema, v.partial(v.object({ links: LinksSelfSchema }))]),
              ),
            },
          },
        },
        '400': BadRequestResponse,
        '401': UnauthorizedResponse,
        '404': NotFoundResponse,
        '409': ConflictResponse,
        '429': TooManyRequestsResponse,
        '500': InternalServerErrorResponse,
      },
    }),
    validator('json', BookingSchema),
    (c) => {},
  )
  .get(
    '/bookings/:bookingId',
    describeRoute({
      summary: 'Get a booking',
      description: 'Returns the details of a specific booking.',
      operationId: 'get-booking',
      tags: ['Bookings'],
      responses: {
        '200': {
          description: 'The booking details',
          headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
          content: {
            'application/json': {
              schema: resolver(
                v.intersect([BookingSchema, v.partial(v.object({ links: LinksSelfSchema }))]),
              ),
              example: {
                id: 'efdbb9d1-02c2-4bc3-afb7-6788d8782b1e',
                trip_id: 'efdbb9d1-02c2-4bc3-afb7-6788d8782b1e',
                passenger_name: 'John Doe',
                has_bicycle: true,
                has_dog: true,
                links: {
                  self: 'https://api.example.com/bookings/1725ff48-ab45-4bb5-9d02-88745177dedb',
                },
              },
            },
            'application/xml': {
              schema: resolver(
                v.intersect([BookingSchema, v.partial(v.object({ links: LinksSelfSchema }))]),
              ),
            },
          },
        },
        '400': BadRequestResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '404': NotFoundResponse,
        '429': TooManyRequestsResponse,
        '500': InternalServerErrorResponse,
      },
    }),
    validator(
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
    (c) => {},
  )
  .delete(
    '/bookings/:bookingId',
    describeRoute({
      summary: 'Delete a booking',
      description: 'Deletes a booking, cancelling the hold on the trip.',
      operationId: 'delete-booking',
      security: [{ OAuth2: ['write'] }],
      tags: ['Bookings'],
      responses: {
        '204': { description: 'Booking deleted' },
        '400': BadRequestResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '404': NotFoundResponse,
        '429': TooManyRequestsResponse,
        '500': InternalServerErrorResponse,
      },
    }),
    validator(
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
    (c) => {},
  )
  .post(
    '/bookings/:bookingId/payment',
    describeRoute({
      summary: 'Pay for a Booking',
      description:
        'A payment is an attempt to pay for the booking, which will confirm the booking for the user and enable them to get their tickets.',
      operationId: 'create-booking-payment',
      tags: ['Payments'],
      responses: {
        '200': {
          description: 'Payment successful',
          headers: { RateLimit: { $ref: '#/components/headers/RateLimit' } },
          content: {
            'application/json': {
              schema: resolver(
                v.intersect([
                  BookingPaymentSchema,
                  v.partial(v.object({ links: LinksBookingSchema })),
                ]),
              ),
              examples: {
                Card: {
                  summary: 'Card Payment',
                  value: {
                    id: '2e3b4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a',
                    amount: 49.99,
                    currency: 'gbp',
                    source: {
                      object: 'card',
                      name: 'J. Doe',
                      number: '************4242',
                      cvc: 123,
                      exp_month: 12,
                      exp_year: 2025,
                      address_country: 'gb',
                      address_post_code: 'N12 9XX',
                    },
                    status: 'succeeded',
                    links: {
                      booking:
                        'https://api.example.com/bookings/1725ff48-ab45-4bb5-9d02-88745177dedb/payment',
                    },
                  },
                },
                Bank: {
                  summary: 'Bank Account Payment',
                  value: {
                    id: '2e3b4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a',
                    amount: 100.5,
                    currency: 'gbp',
                    source: {
                      object: 'bank_account',
                      name: 'J. Doe',
                      account_type: 'individual',
                      number: '*********2345',
                      sort_code: '000123',
                      bank_name: 'Starling Bank',
                      country: 'gb',
                    },
                    status: 'succeeded',
                    links: {
                      booking:
                        'https://api.example.com/bookings/1725ff48-ab45-4bb5-9d02-88745177dedb',
                    },
                  },
                },
              },
            },
          },
        },
        '400': BadRequestResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
        '500': InternalServerErrorResponse,
      },
    }),
    validator(
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
    validator('json', BookingPaymentSchema),
    (c) => {},
  )
