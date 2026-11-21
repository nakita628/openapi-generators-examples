import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
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
      z.object({
        fine_tuned_model_checkpoint: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        project_id: z.string().exactOptional(),
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(10).exactOptional(),
        order: z.enum(['ascending', 'descending']).default('descending').exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    sValidator(
      'param',
      z.object({
        fine_tuned_model_checkpoint: z
          .string()
          .meta({ examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'] }),
      }),
    ),
    sValidator('json', CreateFineTuningCheckpointPermissionRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions/:permission_id',
    sValidator(
      'param',
      z.object({
        fine_tuned_model_checkpoint: z
          .string()
          .meta({ examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'] }),
        permission_id: z.string().meta({ examples: ['cp_zc4Q7MP6XxulcVzj4MZdwsAB'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs',
    sValidator(
      'query',
      z.object({
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
        metadata: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z.record(z.string(), z.string()).nullable(),
          )
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/fine_tuning/jobs', sValidator('json', CreateFineTuningJobRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id',
    sValidator(
      'param',
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/cancel',
    sValidator(
      'param',
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/checkpoints',
    sValidator(
      'param',
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(10).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/events',
    sValidator(
      'param',
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/pause',
    sValidator(
      'param',
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/resume',
    sValidator(
      'param',
      z.object({
        fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
