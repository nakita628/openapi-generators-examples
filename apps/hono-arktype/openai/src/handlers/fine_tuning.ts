import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  CreateFineTuningCheckpointPermissionRequestSchema,
  CreateFineTuningJobRequestSchema,
  RunGraderRequestSchema,
  ValidateGraderRequestSchema,
} from '../components'

export const fineTuningHandler = new Hono()
  .post('/fine_tuning/alpha/graders/run', sValidator('json', RunGraderRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/fine_tuning/alpha/graders/validate',
    sValidator('json', ValidateGraderRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    sValidator('param', type({ fine_tuned_model_checkpoint: 'string' })),
    sValidator(
      'query',
      type({
        'project_id?': 'string',
        'after?': 'string',
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'ascending' | 'descending'",
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    sValidator('param', type({ fine_tuned_model_checkpoint: 'string' })),
    sValidator('json', CreateFineTuningCheckpointPermissionRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions/:permission_id',
    sValidator('param', type({ fine_tuned_model_checkpoint: 'string', permission_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs',
    sValidator(
      'query',
      type({
        'after?': 'string',
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'metadata?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(type({ '[string]': 'string' })).or('null'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/fine_tuning/jobs', sValidator('json', CreateFineTuningJobRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id',
    sValidator('param', type({ fine_tuning_job_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/cancel',
    sValidator('param', type({ fine_tuning_job_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/checkpoints',
    sValidator('param', type({ fine_tuning_job_id: 'string' })),
    sValidator(
      'query',
      type({
        'after?': 'string',
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/events',
    sValidator('param', type({ fine_tuning_job_id: 'string' })),
    sValidator(
      'query',
      type({
        'after?': 'string',
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/pause',
    sValidator('param', type({ fine_tuning_job_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/resume',
    sValidator('param', type({ fine_tuning_job_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
