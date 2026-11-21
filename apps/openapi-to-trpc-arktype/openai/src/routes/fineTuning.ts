import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        fine_tuned_model_checkpoint: 'string',
        'project_id?': 'string',
        'after?': 'string',
        'limit?': 'number.integer',
        'order?': "'ascending' | 'descending'",
      }),
    )
    .output(ListFineTuningCheckpointPermissionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningCheckpointsFineTunedModelCheckpointPermissions: t.procedure
    .input(
      type({
        fine_tuned_model_checkpoint: 'string',
        project_ids: type('string[]').describe('The project identifiers to grant access to.'),
      }),
    )
    .output(ListFineTuningCheckpointPermissionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionId: t.procedure
    .input(type({ fine_tuned_model_checkpoint: 'string', permission_id: 'string' }))
    .output(DeleteFineTuningCheckpointPermissionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobs: t.procedure
    .input(
      type({
        'after?': 'string',
        'limit?': 'number.integer',
        'metadata?': type(type({ '[string]': 'string' })).or('null'),
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
    .input(type({ fine_tuning_job_id: 'string' }))
    .output(FineTuningJobSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobsFineTuningJobIdCancel: t.procedure
    .input(type({ fine_tuning_job_id: 'string' }))
    .output(FineTuningJobSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobsFineTuningJobIdCheckpoints: t.procedure
    .input(type({ fine_tuning_job_id: 'string', 'after?': 'string', 'limit?': 'number.integer' }))
    .output(ListFineTuningJobCheckpointsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFineTuningJobsFineTuningJobIdEvents: t.procedure
    .input(type({ fine_tuning_job_id: 'string', 'after?': 'string', 'limit?': 'number.integer' }))
    .output(ListFineTuningJobEventsResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobsFineTuningJobIdPause: t.procedure
    .input(type({ fine_tuning_job_id: 'string' }))
    .output(FineTuningJobSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFineTuningJobsFineTuningJobIdResume: t.procedure
    .input(type({ fine_tuning_job_id: 'string' }))
    .output(FineTuningJobSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
