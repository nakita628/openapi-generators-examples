import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import { BatchSchema, CreateBatchRequestSchema, ListBatchesResponseSchema } from '../components'

const t = initTRPC.create()

export const batchesRouter = t.router({
  getBatches: t.procedure
    .input(
      z.object({ after: z.string().exactOptional(), limit: z.int().default(20).exactOptional() }),
    )
    .output(ListBatchesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postBatches: t.procedure
    .input(CreateBatchRequestSchema)
    .output(BatchSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBatchesBatchId: t.procedure
    .input(z.object({ batch_id: z.string() }))
    .output(BatchSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postBatchesBatchIdCancel: t.procedure
    .input(z.object({ batch_id: z.string() }))
    .output(BatchSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
