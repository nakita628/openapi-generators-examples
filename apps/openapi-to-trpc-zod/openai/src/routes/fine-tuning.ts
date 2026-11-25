import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        fine_tuned_model_checkpoint: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        project_id: z.string().exactOptional(),
        after: z.string().exactOptional(),
        limit: z.int().default(10).exactOptional(),
        order: z.enum(['ascending', 'descending']).default('descending').exactOptional(),
      }),
    )
    .output(ListFineTuningCheckpointPermissionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningCheckpointsFineTunedModelCheckpointPermissions: t.procedure
    .input(
      z.object({
        fine_tuned_model_checkpoint: z
          .string()
          .meta({ examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'] }),
        project_ids: z
          .array(z.string())
          .meta({ description: 'The project identifiers to grant access to.' }),
      }),
    )
    .output(ListFineTuningCheckpointPermissionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionId: t.procedure
    .input(
      z.object({
        fine_tuned_model_checkpoint: z
          .string()
          .meta({ examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'] }),
        permission_id: z.string().meta({ examples: ['cp_zc4Q7MP6XxulcVzj4MZdwsAB'] }),
      }),
    )
    .output(DeleteFineTuningCheckpointPermissionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobs: t.procedure
    .input(
      z.object({
        after: z.string().exactOptional(),
        limit: z.int().default(20).exactOptional(),
        metadata: z.record(z.string(), z.string()).nullable().exactOptional(),
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
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    )
    .output(FineTuningJobSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobsFineTuningJobIdCancel: t.procedure
    .input(
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    )
    .output(FineTuningJobSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobsFineTuningJobIdCheckpoints: t.procedure
    .input(
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        after: z.string().exactOptional(),
        limit: z.int().default(10).exactOptional(),
      }),
    )
    .output(ListFineTuningJobCheckpointsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobsFineTuningJobIdEvents: t.procedure
    .input(
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        after: z.string().exactOptional(),
        limit: z.int().default(20).exactOptional(),
      }),
    )
    .output(ListFineTuningJobEventsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobsFineTuningJobIdPause: t.procedure
    .input(
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    )
    .output(FineTuningJobSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobsFineTuningJobIdResume: t.procedure
    .input(
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    )
    .output(FineTuningJobSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
