import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
import {
  CreateFineTuningJobRequestSchema,
  DeleteFineTuningCheckpointPermissionResponseSchema,
  FineTuningJobSchema,
  ListFineTuningCheckpointPermissionResponseSchema,
  ListFineTuningJobCheckpointsResponseSchema,
  ListFineTuningJobEventsResponseSchema,
  ListPaginatedFineTuningJobsResponseSchema,
  RunGraderRequestSchema,
  RunGraderResponseSchema,
  ValidateGraderRequestSchema,
  ValidateGraderResponseSchema,
} from '../components'

const t = initTRPC.create()

export const fineTuningRouter = t.router({
  postFineTuningAlphaGradersRun: t.procedure
    .input(Schema.toStandardSchemaV1(RunGraderRequestSchema))
    .output(Schema.toStandardSchemaV1(RunGraderResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningAlphaGradersValidate: t.procedure
    .input(Schema.toStandardSchemaV1(ValidateGraderRequestSchema))
    .output(Schema.toStandardSchemaV1(ValidateGraderResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningCheckpointsFineTunedModelCheckpointPermissions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuned_model_checkpoint: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
          project_id: Schema.optionalKey(Schema.String),
          after: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(10)),
          ),
          order: Schema.Literals(['ascending', 'descending']).pipe(
            Schema.withDecodingDefault(Effect.succeed('descending')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListFineTuningCheckpointPermissionResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningCheckpointsFineTunedModelCheckpointPermissions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuned_model_checkpoint: Schema.String.annotate({
            jsonSchemaExamples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'],
          }),
          project_ids: Schema.Array(Schema.String).annotate({
            description: 'The project identifiers to grant access to.',
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListFineTuningCheckpointPermissionResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuned_model_checkpoint: Schema.String.annotate({
            jsonSchemaExamples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'],
          }),
          permission_id: Schema.String.annotate({
            jsonSchemaExamples: ['cp_zc4Q7MP6XxulcVzj4MZdwsAB'],
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeleteFineTuningCheckpointPermissionResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobs: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          metadata: Schema.optionalKey(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListPaginatedFineTuningJobsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobs: t.procedure
    .input(Schema.toStandardSchemaV1(CreateFineTuningJobRequestSchema))
    .output(Schema.toStandardSchemaV1(FineTuningJobSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobsFineTuningJobId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuning_job_id: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FineTuningJobSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobsFineTuningJobIdCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuning_job_id: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FineTuningJobSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobsFineTuningJobIdCheckpoints: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuning_job_id: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
          after: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(10)),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListFineTuningJobCheckpointsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobsFineTuningJobIdEvents: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuning_job_id: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
          after: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListFineTuningJobEventsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobsFineTuningJobIdPause: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuning_job_id: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FineTuningJobSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobsFineTuningJobIdResume: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuning_job_id: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(FineTuningJobSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
