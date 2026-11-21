import { Hono } from 'hono'
import {
  postFineTuningAlphaGradersRunHandler,
  postFineTuningAlphaGradersValidateHandler,
  getFineTuningCheckpointsFineTunedModelCheckpointPermissionsHandler,
  postFineTuningCheckpointsFineTunedModelCheckpointPermissionsHandler,
  deleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionIdHandler,
  getFineTuningJobsHandler,
  postFineTuningJobsHandler,
  getFineTuningJobsFineTuningJobIdHandler,
  postFineTuningJobsFineTuningJobIdCancelHandler,
  getFineTuningJobsFineTuningJobIdCheckpointsHandler,
  getFineTuningJobsFineTuningJobIdEventsHandler,
  postFineTuningJobsFineTuningJobIdPauseHandler,
  postFineTuningJobsFineTuningJobIdResumeHandler,
} from '../routes'

export const fineTuningHandler = new Hono()
  .post(
    '/fine_tuning/alpha/graders/run',
    postFineTuningAlphaGradersRunHandler(async (c, { json }) => {}),
  )
  .post(
    '/fine_tuning/alpha/graders/validate',
    postFineTuningAlphaGradersValidateHandler(async (c, { json }) => {}),
  )
  .get(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    getFineTuningCheckpointsFineTunedModelCheckpointPermissionsHandler(
      async (c, { param, query }) => {},
    ),
  )
  .post(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    postFineTuningCheckpointsFineTunedModelCheckpointPermissionsHandler(
      async (c, { param, json }) => {},
    ),
  )
  .delete(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions/:permission_id',
    deleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionIdHandler(
      async (c, { param }) => {},
    ),
  )
  .get(
    '/fine_tuning/jobs',
    getFineTuningJobsHandler(async (c, { query }) => {}),
  )
  .post(
    '/fine_tuning/jobs',
    postFineTuningJobsHandler(async (c, { json }) => {}),
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id',
    getFineTuningJobsFineTuningJobIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/cancel',
    postFineTuningJobsFineTuningJobIdCancelHandler(async (c, { param }) => {}),
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/checkpoints',
    getFineTuningJobsFineTuningJobIdCheckpointsHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/events',
    getFineTuningJobsFineTuningJobIdEventsHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/pause',
    postFineTuningJobsFineTuningJobIdPauseHandler(async (c, { param }) => {}),
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/resume',
    postFineTuningJobsFineTuningJobIdResumeHandler(async (c, { param }) => {}),
  )
