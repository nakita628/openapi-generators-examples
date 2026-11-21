import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
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
          content: { 'application/json': { schema: resolver(RunGraderResponseSchema) } },
        },
        '400': {
          description: 'The grader definition or request is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('json', RunGraderRequestSchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(ValidateGraderResponseSchema) } },
        },
        '400': {
          description: 'The grader definition or request is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('json', ValidateGraderRequestSchema),
    (c) => {},
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
              schema: resolver(ListFineTuningCheckpointPermissionResponseSchema),
            },
          },
        },
        '400': {
          description: 'The query parameters are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        fine_tuned_model_checkpoint: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    validator(
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
    (c) => {},
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
              schema: resolver(ListFineTuningCheckpointPermissionResponseSchema),
            },
          },
        },
        '400': {
          description:
            'The request is invalid or checkpoint permissions cannot be changed for the requested projects or job state.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The checkpoint or its fine-tuning job was not found, or the checkpoint cannot be shared.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        fine_tuned_model_checkpoint: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'] }),
        ),
      }),
    ),
    validator('json', CreateFineTuningCheckpointPermissionRequestSchema),
    (c) => {},
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
              schema: resolver(DeleteFineTuningCheckpointPermissionResponseSchema),
            },
          },
        },
        '400': {
          description:
            'The checkpoint permission cannot be removed for the requested project or job state.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The checkpoint, permission, associated project, or fine-tuning job was not found, or the checkpoint cannot be shared.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
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
    (c) => {},
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
            'application/json': { schema: resolver(ListPaginatedFineTuningJobsResponseSchema) },
          },
        },
        '400': {
          description: 'The query parameters are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
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
    (c) => {},
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
          content: { 'application/json': { schema: resolver(FineTuningJobSchema) } },
        },
        '400': {
          description:
            'The request is invalid or the organization does not meet the requirements to create a fine-tuning job.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'A request or fine-tuning job limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('json', CreateFineTuningJobRequestSchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(FineTuningJobSchema) } },
        },
        '404': {
          description: 'The fine-tuning job was not found or is not accessible.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(FineTuningJobSchema) } },
        },
        '400': {
          description: 'The fine-tuning job cannot be cancelled in its current state.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The fine-tuning job was not found or is not accessible.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(ListFineTuningJobCheckpointsResponseSchema) },
          },
        },
        '400': {
          description: 'The query parameters are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The fine-tuning job was not found or is not accessible.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    validator(
      'query',
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '10',
        ),
      }),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(ListFineTuningJobEventsResponseSchema) },
          },
        },
        '400': {
          description: 'The query parameters are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The fine-tuning job was not found or is not accessible.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    validator(
      'query',
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(FineTuningJobSchema) } },
        },
        '400': {
          description:
            'The fine-tuning job cannot be paused in its current state or does not support pausing.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The fine-tuning job was not found or is not accessible, or this operation is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(FineTuningJobSchema) } },
        },
        '400': {
          description:
            'The fine-tuning job cannot be resumed in its current state or does not support resuming.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The fine-tuning job was not found or is not accessible, or this operation is unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'A request or fine-tuning job limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        fine_tuning_job_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
        ),
      }),
    ),
    (c) => {},
  )
