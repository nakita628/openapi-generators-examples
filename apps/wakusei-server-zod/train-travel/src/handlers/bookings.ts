import { os } from '@orpc/server'
import * as z from 'zod'
import {
  BookingPaymentSchema,
  BookingSchema,
  LinksBookingSchema,
  LinksPaginationSchema,
  LinksSelfSchema,
  WrapperCollectionSchema,
} from '../components'

export const getBookings = os
  .route({
    method: 'GET',
    path: '/bookings',
    tags: ['Bookings'],
    summary: 'List existing bookings',
    description: 'Returns a list of all trips booking by the authenticated user.',
    successDescription: 'A list of bookings',
  })
  .output(
    z.intersection(
      z.intersection(
        WrapperCollectionSchema,
        z.object({ data: z.array(BookingSchema).exactOptional() }),
      ),
      z.object({ links: z.intersection(LinksSelfSchema, LinksPaginationSchema).exactOptional() }),
    ),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postBookings = os
  .route({
    method: 'POST',
    path: '/bookings',
    tags: ['Bookings'],
    summary: 'Create a booking',
    description:
      'A booking is a temporary hold on a trip. It is not confirmed until the payment is processed.',
    successStatus: 201,
    successDescription: 'Booking successful',
  })
  .input(BookingSchema)
  .output(z.intersection(BookingSchema, z.object({ links: LinksSelfSchema.exactOptional() })))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getBookingsBookingId = os
  .route({
    method: 'GET',
    path: '/bookings/{bookingId}',
    tags: ['Bookings'],
    summary: 'Get a booking',
    description: 'Returns the details of a specific booking.',
    successDescription: 'The booking details',
  })
  .input(z.object({ bookingId: z.uuid() }))
  .output(z.intersection(BookingSchema, z.object({ links: LinksSelfSchema.exactOptional() })))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteBookingsBookingId = os
  .route({
    method: 'DELETE',
    path: '/bookings/{bookingId}',
    tags: ['Bookings'],
    summary: 'Delete a booking',
    description: 'Deletes a booking, cancelling the hold on the trip.',
    successStatus: 204,
    successDescription: 'Booking deleted',
  })
  .input(z.object({ bookingId: z.uuid() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postBookingsBookingIdPayment = os
  .route({
    method: 'POST',
    path: '/bookings/{bookingId}/payment',
    tags: ['Payments'],
    summary: 'Pay for a Booking',
    description:
      'A payment is an attempt to pay for the booking, which will confirm the booking for the user and enable them to get their tickets.',
    successDescription: 'Payment successful',
  })
  .input(
    z.object({
      bookingId: z.uuid(),
      id: z
        .uuid()
        .meta({
          description:
            'Unique identifier for the payment. This will be a unique identifier for the payment, and is used to reference the payment in other objects.',
          readOnly: true,
        })
        .exactOptional(),
      amount: z
        .number()
        .gt(0)
        .meta({
          description:
            'Amount intended to be collected by this payment. A positive decimal figure describing the amount to be collected.',
          examples: [49.99],
        })
        .exactOptional(),
      currency: z
        .enum(['bam', 'bgn', 'chf', 'eur', 'gbp', 'nok', 'sek', 'try'])
        .meta({
          description:
            'Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.',
        })
        .exactOptional(),
      source: z
        .union([
          z
            .object({
              object: z.literal('card').exactOptional(),
              name: z
                .string()
                .meta({
                  description: "Cardholder's full name as it appears on the card.",
                  examples: ['Francis Bourgeois'],
                }),
              number: z
                .string()
                .meta({
                  description:
                    'The card number, as a string without any separators. On read all but the last four digits will be masked for security.',
                  examples: ['4242424242424242'],
                }),
              cvc: z
                .int()
                .meta({
                  description:
                    'Card security code, 3 or 4 digits usually found on the back of the card.',
                  examples: [123],
                  writeOnly: true,
                }),
              exp_month: z
                .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
                .transform((val) => BigInt(val))
                .pipe(z.int64())
                .meta({
                  description: "Two-digit number representing the card's expiration month.",
                  examples: [12],
                }),
              exp_year: z
                .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
                .transform((val) => BigInt(val))
                .pipe(z.int64())
                .meta({
                  description: "Four-digit number representing the card's expiration year.",
                  examples: [2025],
                }),
              address_line1: z.string().meta({ writeOnly: true }).exactOptional(),
              address_line2: z.string().meta({ writeOnly: true }).exactOptional(),
              address_city: z.string().exactOptional(),
              address_country: z.string(),
              address_post_code: z.string().exactOptional(),
            })
            .meta({ description: 'A card (debit or credit) to take payment from.' }),
          z
            .object({
              object: z.literal('bank_account').exactOptional(),
              name: z.string(),
              number: z
                .string()
                .meta({
                  description:
                    'The account number for the bank account, in string form. Must be a current account.',
                }),
              sort_code: z
                .string()
                .meta({
                  description:
                    'The sort code for the bank account, in string form. Must be a six-digit number.',
                })
                .exactOptional(),
              account_type: z
                .enum(['individual', 'company'])
                .meta({
                  description:
                    'The type of entity that holds the account. This can be either `individual` or `company`.',
                }),
              bank_name: z
                .string()
                .meta({
                  description: 'The name of the bank associated with the routing number.',
                  examples: ['Starling Bank'],
                }),
              country: z
                .string()
                .meta({ description: 'Two-letter country code (ISO 3166-1 alpha-2).' }),
            })
            .meta({
              description:
                'A bank account to take payment from. Must be able to make payments in the currency specified in the payment.',
            }),
        ])
        .meta({
          description:
            'The payment source to take the payment from. This can be a card or a bank account. Some of these properties will be hidden on read to protect PII leaking.',
        })
        .exactOptional(),
      status: z
        .enum(['pending', 'succeeded', 'failed'])
        .meta({
          description: 'The status of the payment, one of `pending`, `succeeded`, or `failed`.',
          readOnly: true,
        })
        .exactOptional(),
    }),
  )
  .output(
    z.intersection(BookingPaymentSchema, z.object({ links: LinksBookingSchema.exactOptional() })),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })
