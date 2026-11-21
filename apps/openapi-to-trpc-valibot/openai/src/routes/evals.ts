import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
        order_by: v.optional(v.picklist(['created_at', 'updated_at']), 'created_at'),
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
    .input(v.object({ eval_id: v.string() }))
    .output(EvalSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvalsEvalId: t.procedure
    .input(
      v.object({
        eval_id: v.string(),
        name: v.optional(v.pipe(v.string(), v.description('Rename the evaluation.'))),
        metadata: v.optional(MetadataSchema),
      }),
    )
    .output(EvalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteEvalsEvalId: t.procedure
    .input(v.object({ eval_id: v.string() }))
    .output(
      v.object({
        object: v.pipe(v.string(), v.metadata({ examples: ['eval.deleted'] })),
        deleted: v.pipe(v.boolean(), v.metadata({ examples: [true] })),
        eval_id: v.pipe(v.string(), v.metadata({ examples: ['eval_abc123'] })),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRuns: t.procedure
    .input(
      v.object({
        eval_id: v.string(),
        after: v.optional(v.string()),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
        status: v.optional(
          v.picklist(['queued', 'in_progress', 'completed', 'canceled', 'failed']),
        ),
      }),
    )
    .output(EvalRunListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvalsEvalIdRuns: t.procedure
    .input(
      v.object({
        eval_id: v.string(),
        name: v.optional(v.pipe(v.string(), v.description('The name of the run.'))),
        metadata: v.optional(MetadataSchema),
        data_source: v.pipe(
          v.union([
            CreateEvalJsonlRunDataSourceSchema,
            CreateEvalCompletionsRunDataSourceSchema,
            CreateEvalResponsesRunDataSourceSchema,
          ]),
          v.description("Details about the run's data source."),
        ),
      }),
    )
    .output(EvalRunSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRunsRunId: t.procedure
    .input(v.object({ eval_id: v.string(), run_id: v.string() }))
    .output(EvalRunSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteEvalsEvalIdRunsRunId: t.procedure
    .input(v.object({ eval_id: v.string(), run_id: v.string() }))
    .output(
      v.partial(
        v.object({
          object: v.pipe(v.string(), v.metadata({ examples: ['eval.run.deleted'] })),
          deleted: v.pipe(v.boolean(), v.metadata({ examples: [true] })),
          run_id: v.pipe(
            v.string(),
            v.metadata({ examples: ['evalrun_677469f564d48190807532a852da3afb'] }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvalsEvalIdRunsRunIdCancel: t.procedure
    .input(v.object({ eval_id: v.string(), run_id: v.string() }))
    .output(EvalRunSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRunsRunIdOutputItems: t.procedure
    .input(
      v.object({
        eval_id: v.string(),
        run_id: v.string(),
        after: v.optional(v.string()),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        status: v.optional(v.picklist(['fail', 'pass'])),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    )
    .output(EvalRunOutputItemListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRunsRunIdOutputItemsOutputItemId: t.procedure
    .input(v.object({ eval_id: v.string(), run_id: v.string(), output_item_id: v.string() }))
    .output(EvalRunOutputItemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
