import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        'after?': 'string',
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
        'order_by?': "'created_at' | 'updated_at'",
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
    .input(type({ eval_id: 'string' }))
    .output(EvalSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvalsEvalId: t.procedure
    .input(
      type({
        eval_id: 'string',
        'name?': type('string').describe('Rename the evaluation.'),
        'metadata?': MetadataSchema,
      }),
    )
    .output(EvalSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteEvalsEvalId: t.procedure
    .input(type({ eval_id: 'string' }))
    .output(type({ object: 'string', deleted: 'boolean', eval_id: 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRuns: t.procedure
    .input(
      type({
        eval_id: 'string',
        'after?': 'string',
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
        'status?': "'queued' | 'in_progress' | 'completed' | 'canceled' | 'failed'",
      }),
    )
    .output(EvalRunListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvalsEvalIdRuns: t.procedure
    .input(
      type({
        eval_id: 'string',
        'name?': type('string').describe('The name of the run.'),
        'metadata?': MetadataSchema,
        data_source: type(
          type(CreateEvalJsonlRunDataSourceSchema).or(CreateEvalCompletionsRunDataSourceSchema),
        )
          .or(CreateEvalResponsesRunDataSourceSchema)
          .describe("Details about the run's data source."),
      }),
    )
    .output(EvalRunSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRunsRunId: t.procedure
    .input(type({ eval_id: 'string', run_id: 'string' }))
    .output(EvalRunSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteEvalsEvalIdRunsRunId: t.procedure
    .input(type({ eval_id: 'string', run_id: 'string' }))
    .output(type({ 'object?': 'string', 'deleted?': 'boolean', 'run_id?': 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvalsEvalIdRunsRunIdCancel: t.procedure
    .input(type({ eval_id: 'string', run_id: 'string' }))
    .output(EvalRunSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRunsRunIdOutputItems: t.procedure
    .input(
      type({
        eval_id: 'string',
        run_id: 'string',
        'after?': 'string',
        'limit?': 'number.integer',
        'status?': "'fail' | 'pass'",
        'order?': "'asc' | 'desc'",
      }),
    )
    .output(EvalRunOutputItemListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRunsRunIdOutputItemsOutputItemId: t.procedure
    .input(type({ eval_id: 'string', run_id: 'string', output_item_id: 'string' }))
    .output(EvalRunOutputItemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
