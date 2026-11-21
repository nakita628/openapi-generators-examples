import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { BatchSchema, CreateBatchRequestSchema, ListBatchesResponseSchema } from '../components'

const t = initTRPC.create()

export const batchesRouter = t.router({
  getBatches: t.procedure
    .input(type({ 'after?': 'string', 'limit?': 'number.integer' }))
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
    .input(type({ batch_id: 'string' }))
    .output(BatchSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postBatchesBatchIdCancel: t.procedure
    .input(type({ batch_id: 'string' }))
    .output(BatchSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
