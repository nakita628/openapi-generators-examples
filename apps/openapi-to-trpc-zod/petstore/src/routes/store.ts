import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import { OrderSchema } from '../components'

const t = initTRPC.create()

export const storeRouter = t.router({
  getStoreInventory: t.procedure.output(z.record(z.string(), z.int32())).query(() => {
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
      z.object({
        orderId: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64()),
      }),
    )
    .output(OrderSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteStoreOrderOrderId: t.procedure
    .input(
      z.object({
        orderId: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64()),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
