import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
    sValidator(
      'param',
      v.object({
        fine_tuned_model_checkpoint: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    sValidator(
      'query',
      v.object({
        project_id: v.optional(v.string()),
        after: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '10',
        ),
        order: v.optional(v.picklist(['ascending', 'descending']), 'descending'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    sValidator(
      'param',
      v.object({
        fine_tuned_model_checkpoint: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'] }),
        ),
      }),
    ),
    sValidator('json', CreateFineTuningCheckpointPermissionRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions/:permission_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs',
    sValidator(
      'query',
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        metadata: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === 'null' ? null : input)),
            v.nullable(v.record(v.string(), v.string())),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/fine_tuning/jobs', sValidator('json', CreateFineTuningJobRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id',
    sValidator(
      'param',
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/cancel',
    sValidator(
      'param',
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/checkpoints',
    sValidator(
      'param',
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    sValidator(
      'query',
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '10',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/events',
    sValidator(
      'param',
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    sValidator(
      'query',
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/pause',
    sValidator(
      'param',
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/resume',
    sValidator(
      'param',
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
