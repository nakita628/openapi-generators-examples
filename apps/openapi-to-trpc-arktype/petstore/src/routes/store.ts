import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { OrderSchema } from '../components'

const t = initTRPC.create()

export const storeRouter = t.router({
  getStoreInventory: t.procedure
    .output(type({ '[string]': 'number.integer >= -2147483648 & number.integer <= 2147483647' }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postStoreOrder: t.procedure
    .input(OrderSchema)
    .output(OrderSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getStoreOrderOrderId: t.procedure
    .input(
      type({
        orderId: type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    )
    .output(OrderSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteStoreOrderOrderId: t.procedure
    .input(
      type({
        orderId: type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
