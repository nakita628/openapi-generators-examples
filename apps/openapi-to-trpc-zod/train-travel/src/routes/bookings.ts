import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.intersection(
        z.intersection(
          WrapperCollectionSchema,
          z.object({ data: z.array(BookingSchema).exactOptional() }),
        ),
        z.object({ links: z.intersection(LinksSelfSchema, LinksPaginationSchema).exactOptional() }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postBookings: t.procedure
    .input(BookingSchema)
    .output(z.intersection(BookingSchema, z.object({ links: LinksSelfSchema.exactOptional() })))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBookingsBookingId: t.procedure
    .input(z.object({ bookingId: z.uuid() }))
    .output(z.intersection(BookingSchema, z.object({ links: LinksSelfSchema.exactOptional() })))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteBookingsBookingId: t.procedure.input(z.object({ bookingId: z.uuid() })).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  postBookingsBookingIdPayment: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
