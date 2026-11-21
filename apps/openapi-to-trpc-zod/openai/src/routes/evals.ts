import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import {
  CreateEvalCompletionsRunDataSourceSchema,
  CreateEvalJsonlRunDataSourceSchema,
  CreateEvalRequestSchema,
  CreateEvalResponsesRunDataSourceSchema,
  EvalListSchema,
  EvalRunListSchema,
  EvalRunOutputItemListSchema,
  EvalRunOutputItemSchema,
  EvalRunSchema,
  EvalSchema,
  MetadataSchema,
} from '../components'

const t = initTRPC.create()

export const evalsRouter = t.router({
  getEvals: t.procedure
    .input(
      z.object({
        after: z.string().exactOptional(),
        limit: z.int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        order_by: z.enum(['created_at', 'updated_at']).default('created_at').exactOptional(),
      }),
    )
    .output(EvalListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvals: t.procedure
    .input(CreateEvalRequestSchema)
    .output(EvalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalId: t.procedure
    .input(z.object({ eval_id: z.string() }))
    .output(EvalSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvalsEvalId: t.procedure
    .input(
      z.object({
        eval_id: z.string(),
        name: z.string().meta({ description: 'Rename the evaluation.' }).exactOptional(),
        metadata: MetadataSchema.exactOptional(),
      }),
    )
    .output(EvalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteEvalsEvalId: t.procedure
    .input(z.object({ eval_id: z.string() }))
    .output(
      z.object({
        object: z.string().meta({ examples: ['eval.deleted'] }),
        deleted: z.boolean().meta({ examples: [true] }),
        eval_id: z.string().meta({ examples: ['eval_abc123'] }),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRuns: t.procedure
    .input(
      z.object({
        eval_id: z.string(),
        after: z.string().exactOptional(),
        limit: z.int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
        status: z
          .enum(['queued', 'in_progress', 'completed', 'canceled', 'failed'])
          .exactOptional(),
      }),
    )
    .output(EvalRunListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvalsEvalIdRuns: t.procedure
    .input(
      z.object({
        eval_id: z.string(),
        name: z.string().meta({ description: 'The name of the run.' }).exactOptional(),
        metadata: MetadataSchema.exactOptional(),
        data_source: z
          .xor([
            CreateEvalJsonlRunDataSourceSchema,
            CreateEvalCompletionsRunDataSourceSchema,
            CreateEvalResponsesRunDataSourceSchema,
          ])
          .meta({ description: "Details about the run's data source." }),
      }),
    )
    .output(EvalRunSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRunsRunId: t.procedure
    .input(z.object({ eval_id: z.string(), run_id: z.string() }))
    .output(EvalRunSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteEvalsEvalIdRunsRunId: t.procedure
    .input(z.object({ eval_id: z.string(), run_id: z.string() }))
    .output(
      z.object({
        object: z
          .string()
          .meta({ examples: ['eval.run.deleted'] })
          .exactOptional(),
        deleted: z
          .boolean()
          .meta({ examples: [true] })
          .exactOptional(),
        run_id: z
          .string()
          .meta({ examples: ['evalrun_677469f564d48190807532a852da3afb'] })
          .exactOptional(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvalsEvalIdRunsRunIdCancel: t.procedure
    .input(z.object({ eval_id: z.string(), run_id: z.string() }))
    .output(EvalRunSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRunsRunIdOutputItems: t.procedure
    .input(
      z.object({
        eval_id: z.string(),
        run_id: z.string(),
        after: z.string().exactOptional(),
        limit: z.int().default(20).exactOptional(),
        status: z.enum(['fail', 'pass']).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    )
    .output(EvalRunOutputItemListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRunsRunIdOutputItemsOutputItemId: t.procedure
    .input(z.object({ eval_id: z.string(), run_id: z.string(), output_item_id: z.string() }))
    .output(EvalRunOutputItemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
