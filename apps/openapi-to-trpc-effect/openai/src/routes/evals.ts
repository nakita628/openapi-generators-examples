import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('asc')),
          ),
          order_by: Schema.Literals(['created_at', 'updated_at']).pipe(
            Schema.withDecodingDefault(Effect.succeed('created_at')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EvalListSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvals: t.procedure
    .input(Schema.toStandardSchemaV1(CreateEvalRequestSchema))
    .output(Schema.toStandardSchemaV1(EvalSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(EvalSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvalsEvalId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          eval_id: Schema.String,
          name: Schema.optionalKey(
            Schema.String.annotate({ description: 'Rename the evaluation.' }),
          ),
          metadata: Schema.optionalKey(MetadataSchema),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EvalSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteEvalsEvalId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          object: Schema.String.annotate({ jsonSchemaExamples: ['eval.deleted'] }),
          deleted: Schema.Boolean.annotate({ jsonSchemaExamples: [true] }),
          eval_id: Schema.String.annotate({ jsonSchemaExamples: ['eval_abc123'] }),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRuns: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          eval_id: Schema.String,
          after: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('asc')),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['queued', 'in_progress', 'completed', 'canceled', 'failed']),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EvalRunListSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvalsEvalIdRuns: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          eval_id: Schema.String,
          name: Schema.optionalKey(Schema.String.annotate({ description: 'The name of the run.' })),
          metadata: Schema.optionalKey(MetadataSchema),
          data_source: Schema.Union([
            CreateEvalJsonlRunDataSourceSchema,
            CreateEvalCompletionsRunDataSourceSchema,
            CreateEvalResponsesRunDataSourceSchema,
          ]).annotate({ description: "Details about the run's data source." }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EvalRunSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRunsRunId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(EvalRunSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteEvalsEvalIdRunsRunId: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          object: Schema.optionalKey(
            Schema.String.annotate({ jsonSchemaExamples: ['eval.run.deleted'] }),
          ),
          deleted: Schema.optionalKey(Schema.Boolean.annotate({ jsonSchemaExamples: [true] })),
          run_id: Schema.optionalKey(
            Schema.String.annotate({
              jsonSchemaExamples: ['evalrun_677469f564d48190807532a852da3afb'],
            }),
          ),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postEvalsEvalIdRunsRunIdCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    )
    .output(Schema.toStandardSchemaV1(EvalRunSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRunsRunIdOutputItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          eval_id: Schema.String,
          run_id: Schema.String,
          after: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          status: Schema.optionalKey(Schema.Literals(['fail', 'pass'])),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('asc')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EvalRunOutputItemListSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getEvalsEvalIdRunsRunIdOutputItemsOutputItemId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          eval_id: Schema.String,
          run_id: Schema.String,
          output_item_id: Schema.String,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EvalRunOutputItemSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
