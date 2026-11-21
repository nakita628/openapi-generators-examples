import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  BookingPaymentSchema,
  BookingSchema,
  LinksBookingSchema,
  LinksPaginationSchema,
  LinksSelfSchema,
  WrapperCollectionSchema,
} from '../components'

const t = initTRPC.create()

export const bookingsRouter = t.router({
  getBookings: t.procedure
    .output(
      type(type(WrapperCollectionSchema).and(type({ 'data?': type(BookingSchema).array() }))).and(
        type({ 'links?': type(LinksSelfSchema).and(LinksPaginationSchema) }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postBookings: t.procedure
    .input(BookingSchema)
    .output(type(BookingSchema).and(type({ 'links?': LinksSelfSchema })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBookingsBookingId: t.procedure
    .input(type({ bookingId: 'string.uuid' }))
    .output(type(BookingSchema).and(type({ 'links?': LinksSelfSchema })))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteBookingsBookingId: t.procedure.input(type({ bookingId: 'string.uuid' })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postBookingsBookingIdPayment: t.procedure
    .input(
      type({
        bookingId: 'string.uuid',
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
