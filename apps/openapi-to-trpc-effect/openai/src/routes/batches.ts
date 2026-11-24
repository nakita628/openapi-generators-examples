import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
import { BatchSchema, CreateBatchRequestSchema, ListBatchesResponseSchema } from '../components'

const t = initTRPC.create()

export const batchesRouter = t.router({
  getBatches: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListBatchesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postBatches: t.procedure
    .input(Schema.toStandardSchemaV1(CreateBatchRequestSchema))
    .output(Schema.toStandardSchemaV1(BatchSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getBatchesBatchId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ batch_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(BatchSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postBatchesBatchIdCancel: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ batch_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(BatchSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
