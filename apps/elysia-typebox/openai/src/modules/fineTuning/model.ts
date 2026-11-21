import { t, type UnwrapSchema } from 'elysia'

export const FineTuningModel = {
  listFineTuningCheckpointPermissionsParams: t.Object({
    fine_tuned_model_checkpoint: t.String({ example: 'ft-AF1WoRqd3aJAHsqc9NY7iL8F' }),
  }),
  listFineTuningCheckpointPermissionsQuery: t.Object({
    project_id: t.Optional(t.String()),
    after: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 10 })),
    order: t.Optional(t.UnionEnum(['ascending', 'descending'], { default: 'descending' })),
  }),
  createFineTuningCheckpointPermissionParams: t.Object({
    fine_tuned_model_checkpoint: t.String({
      example: 'ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd',
    }),
  }),
  deleteFineTuningCheckpointPermissionParams: t.Object({
    fine_tuned_model_checkpoint: t.String({
      example: 'ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd',
    }),
    permission_id: t.String({ example: 'cp_zc4Q7MP6XxulcVzj4MZdwsAB' }),
  }),
  listPaginatedFineTuningJobsQuery: t.Object({
    after: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    metadata: t.Optional(t.Union([t.Record(t.String(), t.String()), t.Null()])),
  }),
  retrieveFineTuningJobParams: t.Object({
    fine_tuning_job_id: t.String({ example: 'ft-AF1WoRqd3aJAHsqc9NY7iL8F' }),
  }),
  cancelFineTuningJobParams: t.Object({
    fine_tuning_job_id: t.String({ example: 'ft-AF1WoRqd3aJAHsqc9NY7iL8F' }),
  }),
  listFineTuningJobCheckpointsParams: t.Object({
    fine_tuning_job_id: t.String({ example: 'ft-AF1WoRqd3aJAHsqc9NY7iL8F' }),
  }),
  listFineTuningJobCheckpointsQuery: t.Object({
    after: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 10 })),
  }),
  listFineTuningEventsParams: t.Object({
    fine_tuning_job_id: t.String({ example: 'ft-AF1WoRqd3aJAHsqc9NY7iL8F' }),
  }),
  listFineTuningEventsQuery: t.Object({
    after: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
  }),
  pauseFineTuningJobParams: t.Object({
    fine_tuning_job_id: t.String({ example: 'ft-AF1WoRqd3aJAHsqc9NY7iL8F' }),
  }),
  resumeFineTuningJobParams: t.Object({
    fine_tuning_job_id: t.String({ example: 'ft-AF1WoRqd3aJAHsqc9NY7iL8F' }),
  }),
} as const

export type FineTuningModel = {
  [k in keyof typeof FineTuningModel]: UnwrapSchema<(typeof FineTuningModel)[k]>
}
