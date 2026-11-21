import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        WrapperCollectionSchema.check(
          Schema.makeFilter((input) =>
            Schema.is(Schema.Struct({ data: Schema.optional(Schema.Array(BookingSchema)) }))(input),
          ),
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
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postBookings: t.procedure
    .input(Schema.toStandardSchemaV1(BookingSchema))
    .output(
      Schema.toStandardSchemaV1(
        BookingSchema.check(
          Schema.makeFilter((input) =>
            Schema.is(Schema.Struct({ links: Schema.optional(LinksSelfSchema) }))(input),
          ),
        ),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBookingsBookingId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ bookingId: Schema.String.check(Schema.isUUID()) })),
    )
    .output(
      Schema.toStandardSchemaV1(
        BookingSchema.check(
          Schema.makeFilter((input) =>
            Schema.is(Schema.Struct({ links: Schema.optional(LinksSelfSchema) }))(input),
          ),
        ),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteBookingsBookingId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ bookingId: Schema.String.check(Schema.isUUID()) })),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postBookingsBookingIdPayment: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          bookingId: Schema.String.check(Schema.isUUID()),
          id: Schema.optional(
            Schema.String.check(Schema.isUUID()).annotate({
              description:
                'Unique identifier for the payment. This will be a unique identifier for the payment, and is used to reference the payment in other objects.',
              readOnly: true,
            }),
          ),
          amount: Schema.optional(
            Schema.Number.check(Schema.isGreaterThan(0)).annotate({
              description:
                'Amount intended to be collected by this payment. A positive decimal figure describing the amount to be collected.',
              jsonSchemaExamples: [49.99],
            }),
          ),
          currency: Schema.optional(
            Schema.Literals(['bam', 'bgn', 'chf', 'eur', 'gbp', 'nok', 'sek', 'try']).annotate({
              description:
                'Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.',
            }),
          ),
          source: Schema.optional(
            Schema.Union([
              Schema.Struct({
                object: Schema.optional(Schema.Literal('card')),
                name: Schema.String.annotate({
                  description: "Cardholder's full name as it appears on the card.",
                  jsonSchemaExamples: ['Francis Bourgeois'],
                }),
                number: Schema.String.annotate({
                  description:
                    'The card number, as a string without any separators. On read all but the last four digits will be masked for security.',
                  jsonSchemaExamples: ['4242424242424242'],
                }),
                cvc: Schema.Number.check(Schema.isInt()).annotate({
                  description:
                    'Card security code, 3 or 4 digits usually found on the back of the card.',
                  jsonSchemaExamples: [123],
                  writeOnly: true,
                }),
                exp_month: Schema.Union([
                  Schema.BigInt,
                  Schema.Number.check(Schema.isInt()),
                  Schema.String.check(Schema.isPattern(/^-?\d+$/)),
                ])
                  .pipe(
                    Schema.decodeTo(
                      Schema.BigInt,
                      SchemaTransformation.transform({
                        decode: (input) => BigInt(input),
                        encode: (output) => output,
                      }),
                    ),
                  )
                  .check(
                    Schema.isBetweenBigInt({
                      minimum: -9223372036854775808n,
                      maximum: 9223372036854775807n,
                    }),
                  )
                  .annotate({
                    description: "Two-digit number representing the card's expiration month.",
                    jsonSchemaExamples: [12],
                  }),
                exp_year: Schema.Union([
                  Schema.BigInt,
                  Schema.Number.check(Schema.isInt()),
                  Schema.String.check(Schema.isPattern(/^-?\d+$/)),
                ])
                  .pipe(
                    Schema.decodeTo(
                      Schema.BigInt,
                      SchemaTransformation.transform({
                        decode: (input) => BigInt(input),
                        encode: (output) => output,
                      }),
                    ),
                  )
                  .check(
                    Schema.isBetweenBigInt({
                      minimum: -9223372036854775808n,
                      maximum: 9223372036854775807n,
                    }),
                  )
                  .annotate({
                    description: "Four-digit number representing the card's expiration year.",
                    jsonSchemaExamples: [2025],
                  }),
                address_line1: Schema.optional(Schema.String.annotate({ writeOnly: true })),
                address_line2: Schema.optional(Schema.String.annotate({ writeOnly: true })),
                address_city: Schema.optional(Schema.String),
                address_country: Schema.String,
                address_post_code: Schema.optional(Schema.String),
              }).annotate({ description: 'A card (debit or credit) to take payment from.' }),
              Schema.Struct({
                object: Schema.optional(Schema.Literal('bank_account')),
                name: Schema.String,
                number: Schema.String.annotate({
                  description:
                    'The account number for the bank account, in string form. Must be a current account.',
                }),
                sort_code: Schema.optional(
                  Schema.String.annotate({
                    description:
                      'The sort code for the bank account, in string form. Must be a six-digit number.',
                  }),
                ),
                account_type: Schema.Literals(['individual', 'company']).annotate({
                  description:
                    'The type of entity that holds the account. This can be either `individual` or `company`.',
                }),
                bank_name: Schema.String.annotate({
                  description: 'The name of the bank associated with the routing number.',
                  jsonSchemaExamples: ['Starling Bank'],
                }),
                country: Schema.String.annotate({
                  description: 'Two-letter country code (ISO 3166-1 alpha-2).',
                }),
              }).annotate({
                description:
                  'A bank account to take payment from. Must be able to make payments in the currency specified in the payment.',
              }),
            ]).annotate({
              description:
                'The payment source to take the payment from. This can be a card or a bank account. Some of these properties will be hidden on read to protect PII leaking.',
            }),
          ),
          status: Schema.optional(
            Schema.Literals(['pending', 'succeeded', 'failed']).annotate({
              description: 'The status of the payment, one of `pending`, `succeeded`, or `failed`.',
              readOnly: true,
            }),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        BookingPaymentSchema.check(
          Schema.makeFilter((input) =>
            Schema.is(Schema.Struct({ links: Schema.optional(LinksBookingSchema) }))(input),
          ),
        ),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
