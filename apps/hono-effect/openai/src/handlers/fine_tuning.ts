import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  CreateFineTuningCheckpointPermissionRequestSchema,
  CreateFineTuningJobRequestSchema,
  RunGraderRequestSchema,
  ValidateGraderRequestSchema,
} from '../components'

export const fineTuningHandler = new Hono()
  .post(
    '/fine_tuning/alpha/graders/run',
    sValidator('json', Schema.toStandardSchemaV1(RunGraderRequestSchema)),
    (c) => {},
  )
  .post(
    '/fine_tuning/alpha/graders/validate',
    sValidator('json', Schema.toStandardSchemaV1(ValidateGraderRequestSchema)),
    (c) => {},
  )
  .get(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuned_model_checkpoint: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.optional(Schema.String),
          after: Schema.optional(Schema.String),
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(10)),
          ),
          order: Schema.Literals(['ascending', 'descending']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('descending')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuned_model_checkpoint: Schema.String.annotate({
            jsonSchemaExamples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'],
          }),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(CreateFineTuningCheckpointPermissionRequestSchema),
    ),
    (c) => {},
  )
  .delete(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions/:permission_id',
    sValidator(
      'param',
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
    ),
    (c) => {},
  )
  .get(
    '/fine_tuning/jobs',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optional(Schema.String),
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          metadata: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.NullOr(Schema.Record(Schema.String, Schema.String))),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/fine_tuning/jobs',
    sValidator('json', Schema.toStandardSchemaV1(CreateFineTuningJobRequestSchema)),
    (c) => {},
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuning_job_id: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/cancel',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuning_job_id: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/checkpoints',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuning_job_id: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optional(Schema.String),
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(10)),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/events',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuning_job_id: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optional(Schema.String),
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/pause',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuning_job_id: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/resume',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          fine_tuning_job_id: Schema.String.annotate({
            jsonSchemaExamples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'],
          }),
        }),
      ),
    ),
    (c) => {},
  )
