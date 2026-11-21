import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.intersect([
        WrapperCollectionSchema,
        v.partial(v.object({ data: v.array(BookingSchema) })),
        v.partial(v.object({ links: v.intersect([LinksSelfSchema, LinksPaginationSchema]) })),
      ]),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postBookings: t.procedure
    .input(BookingSchema)
    .output(v.intersect([BookingSchema, v.partial(v.object({ links: LinksSelfSchema }))]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBookingsBookingId: t.procedure
    .input(
      v.object({
        bookingId: v.pipe(
          v.string(),
          v.regex(
            /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
          ),
        ),
      }),
    )
    .output(v.intersect([BookingSchema, v.partial(v.object({ links: LinksSelfSchema }))]))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteBookingsBookingId: t.procedure
    .input(
      v.object({
        bookingId: v.pipe(
          v.string(),
          v.regex(
            /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
          ),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postBookingsBookingIdPayment: t.procedure
    .input(
      v.object({
        bookingId: v.pipe(
          v.string(),
          v.regex(
            /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
          ),
        ),
        id: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(
                /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
              ),
            ),
            v.description(
              'Unique identifier for the payment. This will be a unique identifier for the payment, and is used to reference the payment in other objects.',
            ),
            v.metadata({ readOnly: true }),
          ),
        ),
        amount: v.optional(
          v.pipe(
            v.pipe(v.number(), v.gtValue(0)),
            v.description(
              'Amount intended to be collected by this payment. A positive decimal figure describing the amount to be collected.',
            ),
            v.metadata({ examples: [49.99] }),
          ),
        ),
        currency: v.optional(
          v.pipe(
            v.picklist(['bam', 'bgn', 'chf', 'eur', 'gbp', 'nok', 'sek', 'try']),
            v.description(
              'Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.',
            ),
          ),
        ),
        source: v.optional(
          v.pipe(
            v.union([
              v.pipe(
                v.object({
                  object: v.optional(v.literal('card')),
                  name: v.pipe(
                    v.string(),
                    v.description("Cardholder's full name as it appears on the card."),
                    v.metadata({ examples: ['Francis Bourgeois'] }),
                  ),
                  number: v.pipe(
                    v.string(),
                    v.description(
                      'The card number, as a string without any separators. On read all but the last four digits will be masked for security.',
                    ),
                    v.metadata({ examples: ['4242424242424242'] }),
                  ),
                  cvc: v.pipe(
                    v.pipe(v.number(), v.integer()),
                    v.description(
                      'Card security code, 3 or 4 digits usually found on the back of the card.',
                    ),
                    v.metadata({ examples: [123], writeOnly: true }),
                  ),
                  exp_month: v.pipe(
                    v.pipe(
                      v.union([
                        v.bigint(),
                        v.pipe(v.number(), v.integer()),
                        v.pipe(v.string(), v.regex(/^-?\d+$/)),
                      ]),
                      v.transform((input) => BigInt(input)),
                      v.minValue(-9223372036854775808n),
                      v.maxValue(9223372036854775807n),
                    ),
                    v.description("Two-digit number representing the card's expiration month."),
                    v.metadata({ examples: [12] }),
                  ),
                  exp_year: v.pipe(
                    v.pipe(
                      v.union([
                        v.bigint(),
                        v.pipe(v.number(), v.integer()),
                        v.pipe(v.string(), v.regex(/^-?\d+$/)),
                      ]),
                      v.transform((input) => BigInt(input)),
                      v.minValue(-9223372036854775808n),
                      v.maxValue(9223372036854775807n),
                    ),
                    v.description("Four-digit number representing the card's expiration year."),
                    v.metadata({ examples: [2025] }),
                  ),
                  address_line1: v.optional(v.pipe(v.string(), v.metadata({ writeOnly: true }))),
                  address_line2: v.optional(v.pipe(v.string(), v.metadata({ writeOnly: true }))),
                  address_city: v.optional(v.string()),
                  address_country: v.string(),
                  address_post_code: v.optional(v.string()),
                }),
                v.description('A card (debit or credit) to take payment from.'),
              ),
              v.pipe(
                v.object({
                  object: v.optional(v.literal('bank_account')),
                  name: v.string(),
                  number: v.pipe(
                    v.string(),
                    v.description(
                      'The account number for the bank account, in string form. Must be a current account.',
                    ),
                  ),
                  sort_code: v.optional(
                    v.pipe(
                      v.string(),
                      v.description(
                        'The sort code for the bank account, in string form. Must be a six-digit number.',
                      ),
                    ),
                  ),
                  account_type: v.pipe(
                    v.picklist(['individual', 'company']),
                    v.description(
                      'The type of entity that holds the account. This can be either `individual` or `company`.',
                    ),
                  ),
                  bank_name: v.pipe(
                    v.string(),
                    v.description('The name of the bank associated with the routing number.'),
                    v.metadata({ examples: ['Starling Bank'] }),
                  ),
                  country: v.pipe(
                    v.string(),
                    v.description('Two-letter country code (ISO 3166-1 alpha-2).'),
                  ),
                }),
                v.description(
                  'A bank account to take payment from. Must be able to make payments in the currency specified in the payment.',
                ),
              ),
            ]),
            v.description(
              'The payment source to take the payment from. This can be a card or a bank account. Some of these properties will be hidden on read to protect PII leaking.',
            ),
          ),
        ),
        status: v.optional(
          v.pipe(
            v.picklist(['pending', 'succeeded', 'failed']),
            v.description('The status of the payment, one of `pending`, `succeeded`, or `failed`.'),
            v.metadata({ readOnly: true }),
          ),
        ),
      }),
    )
    .output(v.intersect([BookingPaymentSchema, v.partial(v.object({ links: LinksBookingSchema }))]))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
