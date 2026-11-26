import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import {
  CreateFineTuningCheckpointPermissionRequestSchema,
  CreateFineTuningJobRequestSchema,
  RunGraderRequestSchema,
  ValidateGraderRequestSchema,
} from '../components'

export const fineTuningHandler = new Hono()
  .post('/fine_tuning/alpha/graders/run', tbValidator('json', RunGraderRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/fine_tuning/alpha/graders/validate',
    tbValidator('json', ValidateGraderRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    tbValidator(
      'param',
      Type.Object({
        fine_tuned_model_checkpoint: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        project_id: Type.Optional(Type.String()),
        after: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '10' }),
              (value) => Number.isSafeInteger(Number(value)),
              () => 'must be a safe integer',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('ascending'), Type.Literal('descending')], {
            default: 'descending',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    tbValidator(
      'param',
      Type.Object({
        fine_tuned_model_checkpoint: Type.String({
          examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'],
        }),
      }),
    ),
    tbValidator('json', CreateFineTuningCheckpointPermissionRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions/:permission_id',
    tbValidator(
      'param',
      Type.Object({
        fine_tuned_model_checkpoint: Type.String({
          examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'],
        }),
        permission_id: Type.String({ examples: ['cp_zc4Q7MP6XxulcVzj4MZdwsAB'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs',
    tbValidator(
      'query',
      Type.Object({
        after: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
              (value) => Number.isSafeInteger(Number(value)),
              () => 'must be a safe integer',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        metadata: Type.Optional(
          Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/fine_tuning/jobs', tbValidator('json', CreateFineTuningJobRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id',
    tbValidator(
      'param',
      Type.Object({
        fine_tuning_job_id: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/cancel',
    tbValidator(
      'param',
      Type.Object({
        fine_tuning_job_id: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/checkpoints',
    tbValidator(
      'param',
      Type.Object({
        fine_tuning_job_id: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        after: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '10' }),
              (value) => Number.isSafeInteger(Number(value)),
              () => 'must be a safe integer',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/events',
    tbValidator(
      'param',
      Type.Object({
        fine_tuning_job_id: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        after: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
              (value) => Number.isSafeInteger(Number(value)),
              () => 'must be a safe integer',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/pause',
    tbValidator(
      'param',
      Type.Object({
        fine_tuning_job_id: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/resume',
    tbValidator(
      'param',
      Type.Object({
        fine_tuning_job_id: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
