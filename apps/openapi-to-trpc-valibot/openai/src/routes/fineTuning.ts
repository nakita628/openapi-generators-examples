import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
    .input(RunGraderRequestSchema)
    .output(RunGraderResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningAlphaGradersValidate: t.procedure
    .input(ValidateGraderRequestSchema)
    .output(ValidateGraderResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningCheckpointsFineTunedModelCheckpointPermissions: t.procedure
    .input(
      v.object({
        fine_tuned_model_checkpoint: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
        project_id: v.optional(v.string()),
        after: v.optional(v.string()),
        limit: v.optional(v.pipe(v.number(), v.integer()), 10),
        order: v.optional(v.picklist(['ascending', 'descending']), 'descending'),
      }),
    )
    .output(ListFineTuningCheckpointPermissionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningCheckpointsFineTunedModelCheckpointPermissions: t.procedure
    .input(
      v.object({
        fine_tuned_model_checkpoint: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'] }),
        ),
        project_ids: v.pipe(
          v.array(v.string()),
          v.description('The project identifiers to grant access to.'),
        ),
      }),
    )
    .output(ListFineTuningCheckpointPermissionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionId: t.procedure
    .input(
      v.object({
        fine_tuned_model_checkpoint: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'] }),
        ),
        permission_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['cp_zc4Q7MP6XxulcVzj4MZdwsAB'] }),
        ),
      }),
    )
    .output(DeleteFineTuningCheckpointPermissionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobs: t.procedure
    .input(
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        metadata: v.optional(v.nullable(v.record(v.string(), v.string()))),
      }),
    )
    .output(ListPaginatedFineTuningJobsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobs: t.procedure
    .input(CreateFineTuningJobRequestSchema)
    .output(FineTuningJobSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobsFineTuningJobId: t.procedure
    .input(
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    )
    .output(FineTuningJobSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobsFineTuningJobIdCancel: t.procedure
    .input(
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    )
    .output(FineTuningJobSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobsFineTuningJobIdCheckpoints: t.procedure
    .input(
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
        after: v.optional(v.string()),
        limit: v.optional(v.pipe(v.number(), v.integer()), 10),
      }),
    )
    .output(ListFineTuningJobCheckpointsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobsFineTuningJobIdEvents: t.procedure
    .input(
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
        after: v.optional(v.string()),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
      }),
    )
    .output(ListFineTuningJobEventsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobsFineTuningJobIdPause: t.procedure
    .input(
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    )
    .output(FineTuningJobSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobsFineTuningJobIdResume: t.procedure
    .input(
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    )
    .output(FineTuningJobSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
