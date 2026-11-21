import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type(type(WrapperCollectionSchema).and(type({ 'data?': type(BookingSchema).array() }))).and(
      type({ 'links?': type(LinksSelfSchema).and(LinksPaginationSchema) }),
    ),
  )
  .handler(async ({ input }) => {})

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
  .output(type(BookingSchema).and(type({ 'links?': LinksSelfSchema })))
  .handler(async ({ input }) => {})

export const getBookingsBookingId = os
  .route({
    method: 'GET',
    path: '/bookings/{bookingId}',
    tags: ['Bookings'],
    summary: 'Get a booking',
    description: 'Returns the details of a specific booking.',
    successDescription: 'The booking details',
  })
  .input(type({ bookingId: type('string.uuid') }))
  .output(type(BookingSchema).and(type({ 'links?': LinksSelfSchema })))
  .handler(async ({ input }) => {})

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
  .input(type({ bookingId: type('string.uuid') }))
  .handler(async ({ input }) => {})

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
    type({
      bookingId: type('string.uuid'),
      'id?': type('string.uuid').describe(
        'Unique identifier for the payment. This will be a unique identifier for the payment, and is used to reference the payment in other objects.',
      ),
      'amount?': type('number > 0').describe(
        'Amount intended to be collected by this payment. A positive decimal figure describing the amount to be collected.',
      ),
      'currency?': type("'bam' | 'bgn' | 'chf' | 'eur' | 'gbp' | 'nok' | 'sek' | 'try'").describe(
        'Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.',
      ),
      'source?': type(
        type({
          'object?': "'card'",
          name: type('string').describe("Cardholder's full name as it appears on the card."),
          number: type('string').describe(
            'The card number, as a string without any separators. On read all but the last four digits will be masked for security.',
          ),
          cvc: type('number.integer').describe(
            'Card security code, 3 or 4 digits usually found on the back of the card.',
          ),
          exp_month: type('bigint | number.integer')
            .or(/^-?\d+$/)
            .pipe((data) => BigInt(data))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            )
            .describe("Two-digit number representing the card's expiration month."),
          exp_year: type('bigint | number.integer')
            .or(/^-?\d+$/)
            .pipe((data) => BigInt(data))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            )
            .describe("Four-digit number representing the card's expiration year."),
          'address_line1?': 'string',
          'address_line2?': 'string',
          'address_city?': 'string',
          address_country: 'string',
          'address_post_code?': 'string',
        }).describe('A card (debit or credit) to take payment from.'),
      )
        .or(
          type({
            'object?': "'bank_account'",
            name: 'string',
            number: type('string').describe(
              'The account number for the bank account, in string form. Must be a current account.',
            ),
            'sort_code?': type('string').describe(
              'The sort code for the bank account, in string form. Must be a six-digit number.',
            ),
            account_type: type("'individual' | 'company'").describe(
              'The type of entity that holds the account. This can be either `individual` or `company`.',
            ),
            bank_name: type('string').describe(
              'The name of the bank associated with the routing number.',
            ),
            country: type('string').describe('Two-letter country code (ISO 3166-1 alpha-2).'),
          }).describe(
            'A bank account to take payment from. Must be able to make payments in the currency specified in the payment.',
          ),
        )
        .describe(
          'The payment source to take the payment from. This can be a card or a bank account. Some of these properties will be hidden on read to protect PII leaking.',
        ),
      'status?': type("'pending' | 'succeeded' | 'failed'").describe(
        'The status of the payment, one of `pending`, `succeeded`, or `failed`.',
      ),
    }),
  )
  .output(type(BookingPaymentSchema).and(type({ 'links?': LinksBookingSchema })))
  .handler(async ({ input }) => {})
