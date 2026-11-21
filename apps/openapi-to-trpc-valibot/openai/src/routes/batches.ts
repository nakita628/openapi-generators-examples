import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { BatchSchema, CreateBatchRequestSchema, ListBatchesResponseSchema } from '../components'

const t = initTRPC.create()

export const batchesRouter = t.router({
  getBatches: t.procedure
    .input(
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
      }),
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
    .input(v.object({ batch_id: v.string() }))
    .output(BatchSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postBatchesBatchIdCancel: t.procedure
    .input(v.object({ batch_id: v.string() }))
    .output(BatchSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
