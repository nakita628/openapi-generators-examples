import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  CreateFineTuningCheckpointPermissionRequestSchema,
  CreateFineTuningJobRequestSchema,
  DeleteFineTuningCheckpointPermissionResponseSchema,
  ErrorResponseSchema,
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

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

export const fineTuningHandler = new Hono()
  .post(
    '/fine_tuning/alpha/graders/run',
    describeRoute({
      operationId: 'runGrader',
      tags: ['Fine-tuning'],
      summary: 'Run grader',
      description: 'Run a grader.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(RunGraderResponseSchema)) },
          },
        },
        '400': {
          description: 'The grader definition or request is invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(RunGraderRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/alpha/graders/validate',
    describeRoute({
      operationId: 'validateGrader',
      tags: ['Fine-tuning'],
      summary: 'Validate grader',
      description: 'Validate a grader.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ValidateGraderResponseSchema)),
            },
          },
        },
        '400': {
          description: 'The grader definition or request is invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(ValidateGraderRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    describeRoute({
      operationId: 'listFineTuningCheckpointPermissions',
      tags: ['Fine-tuning'],
      summary: 'List checkpoint permissions',
      description:
        '**NOTE:** This endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).\n\nOrganization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(
                toStandardSchemaV1(ListFineTuningCheckpointPermissionResponseSchema),
              ),
            },
          },
        },
        '400': {
          description: 'The query parameters are invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          fine_tuned_model_checkpoint: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          project_id: Type.Optional(Type.String()),
          after: Type.Optional(Type.String()),
          limit: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '10' }))
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions',
    describeRoute({
      operationId: 'createFineTuningCheckpointPermission',
      tags: ['Fine-tuning'],
      summary: 'Create checkpoint permissions',
      description:
        '**NOTE:** Calling this endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).\n\nThis enables organization owners to share fine-tuned models with other projects in their organization.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(
                toStandardSchemaV1(ListFineTuningCheckpointPermissionResponseSchema),
              ),
            },
          },
        },
        '400': {
          description:
            'The request is invalid or checkpoint permissions cannot be changed for the requested projects or job state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The checkpoint or its fine-tuning job was not found, or the checkpoint cannot be shared.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          fine_tuned_model_checkpoint: Type.String({
            examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'],
          }),
        }),
      ),
    ),
    validator('json', toStandardSchemaV1(CreateFineTuningCheckpointPermissionRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/fine_tuning/checkpoints/:fine_tuned_model_checkpoint/permissions/:permission_id',
    describeRoute({
      operationId: 'deleteFineTuningCheckpointPermission',
      tags: ['Fine-tuning'],
      summary: 'Delete checkpoint permission',
      description:
        '**NOTE:** This endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).\n\nOrganization owners can use this endpoint to delete a permission for a fine-tuned model checkpoint.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(
                toStandardSchemaV1(DeleteFineTuningCheckpointPermissionResponseSchema),
              ),
            },
          },
        },
        '400': {
          description:
            'The checkpoint permission cannot be removed for the requested project or job state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The checkpoint, permission, associated project, or fine-tuning job was not found, or the checkpoint cannot be shared.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          fine_tuned_model_checkpoint: Type.String({
            examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'],
          }),
          permission_id: Type.String({ examples: ['cp_zc4Q7MP6XxulcVzj4MZdwsAB'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs',
    describeRoute({
      operationId: 'listPaginatedFineTuningJobs',
      tags: ['Fine-tuning'],
      summary: 'List fine-tuning jobs',
      description: "List your organization's fine-tuning jobs\n",
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ListPaginatedFineTuningJobsResponseSchema)),
            },
          },
        },
        '400': {
          description: 'The query parameters are invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          after: Type.Optional(Type.String()),
          limit: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          metadata: Type.Optional(
            Type.Union([Type.Record(Type.String(), Type.String()), Type.Null()]),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs',
    describeRoute({
      operationId: 'createFineTuningJob',
      tags: ['Fine-tuning'],
      summary: 'Create fine-tuning job',
      description:
        'Creates a fine-tuning job which begins the process of creating a new model from a given dataset.\n\nResponse includes details of the enqueued job including job status and the name of the fine-tuned models once complete.\n\n[Learn more about fine-tuning](https://developers.openai.com/api/docs/guides/model-optimization)\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(FineTuningJobSchema)) },
          },
        },
        '400': {
          description:
            'The request is invalid or the organization does not meet the requirements to create a fine-tuning job.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'A request or fine-tuning job limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(CreateFineTuningJobRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id',
    describeRoute({
      operationId: 'retrieveFineTuningJob',
      tags: ['Fine-tuning'],
      summary: 'Retrieve fine-tuning job',
      description:
        'Get info about a fine-tuning job.\n\n[Learn more about fine-tuning](https://developers.openai.com/api/docs/guides/model-optimization)\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(FineTuningJobSchema)) },
          },
        },
        '404': {
          description: 'The fine-tuning job was not found or is not accessible.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          fine_tuning_job_id: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/cancel',
    describeRoute({
      operationId: 'cancelFineTuningJob',
      tags: ['Fine-tuning'],
      summary: 'Cancel fine-tuning',
      description: 'Immediately cancel a fine-tune job.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(FineTuningJobSchema)) },
          },
        },
        '400': {
          description: 'The fine-tuning job cannot be cancelled in its current state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The fine-tuning job was not found or is not accessible.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          fine_tuning_job_id: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/checkpoints',
    describeRoute({
      operationId: 'listFineTuningJobCheckpoints',
      tags: ['Fine-tuning'],
      summary: 'List fine-tuning checkpoints',
      description: 'List checkpoints for a fine-tuning job.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ListFineTuningJobCheckpointsResponseSchema)),
            },
          },
        },
        '400': {
          description: 'The query parameters are invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The fine-tuning job was not found or is not accessible.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          fine_tuning_job_id: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          after: Type.Optional(Type.String()),
          limit: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '10' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/fine_tuning/jobs/:fine_tuning_job_id/events',
    describeRoute({
      operationId: 'listFineTuningEvents',
      tags: ['Fine-tuning'],
      summary: 'List fine-tuning events',
      description: 'Get status updates for a fine-tuning job.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ListFineTuningJobEventsResponseSchema)),
            },
          },
        },
        '400': {
          description: 'The query parameters are invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The fine-tuning job was not found or is not accessible.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          fine_tuning_job_id: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          after: Type.Optional(Type.String()),
          limit: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/pause',
    describeRoute({
      operationId: 'pauseFineTuningJob',
      tags: ['Fine-tuning'],
      summary: 'Pause fine-tuning',
      description: 'Pause a fine-tune job.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(FineTuningJobSchema)) },
          },
        },
        '400': {
          description:
            'The fine-tuning job cannot be paused in its current state or does not support pausing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The fine-tuning job was not found or is not accessible, or this operation is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          fine_tuning_job_id: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning/jobs/:fine_tuning_job_id/resume',
    describeRoute({
      operationId: 'resumeFineTuningJob',
      tags: ['Fine-tuning'],
      summary: 'Resume fine-tuning',
      description: 'Resume a fine-tune job.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(FineTuningJobSchema)) },
          },
        },
        '400': {
          description:
            'The fine-tuning job cannot be resumed in its current state or does not support resuming.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The fine-tuning job was not found or is not accessible, or this operation is unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'A request or fine-tuning job limit has been exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          fine_tuning_job_id: Type.String({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
