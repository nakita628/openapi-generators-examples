import { os } from '@orpc/server'
import * as z from 'zod'
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

export const postFineTuningAlphaGradersRun = os
  .route({
    method: 'POST',
    path: '/fine_tuning/alpha/graders/run',
    tags: ['Fine-tuning'],
    summary: 'Run grader',
    description: 'Run a grader.\n',
  })
  .input(RunGraderRequestSchema)
  .output(RunGraderResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postFineTuningAlphaGradersValidate = os
  .route({
    method: 'POST',
    path: '/fine_tuning/alpha/graders/validate',
    tags: ['Fine-tuning'],
    summary: 'Validate grader',
    description: 'Validate a grader.\n',
  })
  .input(ValidateGraderRequestSchema)
  .output(ValidateGraderResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getFineTuningCheckpointsFineTunedModelCheckpointPermissions = os
  .route({
    method: 'GET',
    path: '/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions',
    tags: ['Fine-tuning'],
    summary: 'List checkpoint permissions',
    description:
      '**NOTE:** This endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).\n\nOrganization owners can use this endpoint to view all permissions for a fine-tuned model checkpoint.\n',
  })
  .input(
    z.object({
      fine_tuned_model_checkpoint: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      project_id: z.string().exactOptional(),
      after: z.string().exactOptional(),
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .default(10)
        .exactOptional(),
      order: z.enum(['ascending', 'descending']).default('descending').exactOptional(),
    }),
  )
  .output(ListFineTuningCheckpointPermissionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postFineTuningCheckpointsFineTunedModelCheckpointPermissions = os
  .route({
    method: 'POST',
    path: '/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions',
    tags: ['Fine-tuning'],
    summary: 'Create checkpoint permissions',
    description:
      '**NOTE:** Calling this endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).\n\nThis enables organization owners to share fine-tuned models with other projects in their organization.\n',
  })
  .input(
    z.object({
      fine_tuned_model_checkpoint: z
        .string()
        .meta({ examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'] }),
      project_ids: z
        .array(z.string())
        .meta({ description: 'The project identifiers to grant access to.' }),
    }),
  )
  .output(ListFineTuningCheckpointPermissionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionId = os
  .route({
    method: 'DELETE',
    path: '/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}',
    tags: ['Fine-tuning'],
    summary: 'Delete checkpoint permission',
    description:
      '**NOTE:** This endpoint requires an [admin API key](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys).\n\nOrganization owners can use this endpoint to delete a permission for a fine-tuned model checkpoint.\n',
  })
  .input(
    z.object({
      fine_tuned_model_checkpoint: z
        .string()
        .meta({ examples: ['ft:gpt-4.1-mini-2025-04-14:org:weather:B7R9VjQd'] }),
      permission_id: z.string().meta({ examples: ['cp_zc4Q7MP6XxulcVzj4MZdwsAB'] }),
    }),
  )
  .output(DeleteFineTuningCheckpointPermissionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getFineTuningJobs = os
  .route({
    method: 'GET',
    path: '/fine_tuning/jobs',
    tags: ['Fine-tuning'],
    summary: 'List fine-tuning jobs',
    description: "List your organization's fine-tuning jobs\n",
  })
  .input(
    z.object({
      after: z.string().exactOptional(),
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .default(20)
        .exactOptional(),
      metadata: z
        .preprocess(
          (val) => {
            if (typeof val !== 'object' || val === null || Array.isArray(val)) return val
            const out = Object.entries(val).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : val
          },
          z.preprocess(
            (val) => (val === 'null' ? null : val),
            z.record(z.string(), z.string()).nullable(),
          ),
        )
        .exactOptional(),
    }),
  )
  .output(ListPaginatedFineTuningJobsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postFineTuningJobs = os
  .route({
    method: 'POST',
    path: '/fine_tuning/jobs',
    tags: ['Fine-tuning'],
    summary: 'Create fine-tuning job',
    description:
      'Creates a fine-tuning job which begins the process of creating a new model from a given dataset.\n\nResponse includes details of the enqueued job including job status and the name of the fine-tuned models once complete.\n\n[Learn more about fine-tuning](https://developers.openai.com/api/docs/guides/model-optimization)\n',
  })
  .input(CreateFineTuningJobRequestSchema)
  .output(FineTuningJobSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getFineTuningJobsFineTuningJobId = os
  .route({
    method: 'GET',
    path: '/fine_tuning/jobs/{fine_tuning_job_id}',
    tags: ['Fine-tuning'],
    summary: 'Retrieve fine-tuning job',
    description:
      'Get info about a fine-tuning job.\n\n[Learn more about fine-tuning](https://developers.openai.com/api/docs/guides/model-optimization)\n',
  })
  .input(
    z.object({
      fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
    }),
  )
  .output(FineTuningJobSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postFineTuningJobsFineTuningJobIdCancel = os
  .route({
    method: 'POST',
    path: '/fine_tuning/jobs/{fine_tuning_job_id}/cancel',
    tags: ['Fine-tuning'],
    summary: 'Cancel fine-tuning',
    description: 'Immediately cancel a fine-tune job.\n',
  })
  .input(
    z.object({
      fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
    }),
  )
  .output(FineTuningJobSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getFineTuningJobsFineTuningJobIdCheckpoints = os
  .route({
    method: 'GET',
    path: '/fine_tuning/jobs/{fine_tuning_job_id}/checkpoints',
    tags: ['Fine-tuning'],
    summary: 'List fine-tuning checkpoints',
    description: 'List checkpoints for a fine-tuning job.\n',
  })
  .input(
    z.object({
      fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      after: z.string().exactOptional(),
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .default(10)
        .exactOptional(),
    }),
  )
  .output(ListFineTuningJobCheckpointsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getFineTuningJobsFineTuningJobIdEvents = os
  .route({
    method: 'GET',
    path: '/fine_tuning/jobs/{fine_tuning_job_id}/events',
    tags: ['Fine-tuning'],
    summary: 'List fine-tuning events',
    description: 'Get status updates for a fine-tuning job.\n',
  })
  .input(
    z.object({
      fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
      after: z.string().exactOptional(),
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .default(20)
        .exactOptional(),
    }),
  )
  .output(ListFineTuningJobEventsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postFineTuningJobsFineTuningJobIdPause = os
  .route({
    method: 'POST',
    path: '/fine_tuning/jobs/{fine_tuning_job_id}/pause',
    tags: ['Fine-tuning'],
    summary: 'Pause fine-tuning',
    description: 'Pause a fine-tune job.\n',
  })
  .input(
    z.object({
      fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
    }),
  )
  .output(FineTuningJobSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postFineTuningJobsFineTuningJobIdResume = os
  .route({
    method: 'POST',
    path: '/fine_tuning/jobs/{fine_tuning_job_id}/resume',
    tags: ['Fine-tuning'],
    summary: 'Resume fine-tuning',
    description: 'Resume a fine-tune job.\n',
  })
  .input(
    z.object({
      fine_tuning_job_id: z.string().meta({ examples: ['ft-AF1WoRqd3aJAHsqc9NY7iL8F'] }),
    }),
  )
  .output(FineTuningJobSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
