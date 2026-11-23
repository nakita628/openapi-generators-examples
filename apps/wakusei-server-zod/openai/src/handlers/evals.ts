import { os } from '@orpc/server'
import * as z from 'zod'
import {
  CreateEvalCompletionsRunDataSourceSchema,
  CreateEvalJsonlRunDataSourceSchema,
  CreateEvalRequestSchema,
  CreateEvalResponsesRunDataSourceSchema,
  EvalListSchema,
  EvalRunListSchema,
  EvalRunOutputItemListSchema,
  EvalRunOutputItemSchema,
  EvalRunSchema,
  EvalSchema,
  MetadataSchema,
} from '../components'

export const getEvals = os
  .route({
    method: 'GET',
    path: '/evals',
    tags: ['Evals'],
    summary: 'List evals',
    description: 'List evaluations for a project.\n',
    successDescription: 'A list of evals',
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
      order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      order_by: z.enum(['created_at', 'updated_at']).default('created_at').exactOptional(),
    }),
  )
  .output(EvalListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postEvals = os
  .route({
    method: 'POST',
    path: '/evals',
    tags: ['Evals'],
    summary: 'Create eval',
    description:
      "Create the structure of an evaluation that can be used to test a model's performance.\nAn evaluation is a set of testing criteria and the config for a data source, which dictates the schema of the data used in the evaluation. After creating an evaluation, you can run it on different models and model parameters. We support several types of graders and datasources.\nFor more information, see the [Evals guide](https://developers.openai.com/api/docs/guides/evals).\n",
    successStatus: 201,
  })
  .input(CreateEvalRequestSchema)
  .output(EvalSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getEvalsEvalId = os
  .route({
    method: 'GET',
    path: '/evals/{eval_id}',
    tags: ['Evals'],
    summary: 'Get an eval',
    description: 'Get an evaluation by ID.\n',
    successDescription: 'The evaluation',
  })
  .input(z.object({ eval_id: z.string() }))
  .output(EvalSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postEvalsEvalId = os
  .route({
    method: 'POST',
    path: '/evals/{eval_id}',
    tags: ['Evals'],
    summary: 'Update an eval',
    description: 'Update certain properties of an evaluation.\n',
    successDescription: 'The updated evaluation',
  })
  .input(
    z.object({
      eval_id: z.string(),
      name: z.string().meta({ description: 'Rename the evaluation.' }).exactOptional(),
      metadata: MetadataSchema.exactOptional(),
    }),
  )
  .output(EvalSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteEvalsEvalId = os
  .route({
    method: 'DELETE',
    path: '/evals/{eval_id}',
    tags: ['Evals'],
    summary: 'Delete an eval',
    description: 'Delete an evaluation.\n',
    successDescription: 'Successfully deleted the evaluation.',
  })
  .input(z.object({ eval_id: z.string() }))
  .output(
    z.object({
      object: z.string().meta({ examples: ['eval.deleted'] }),
      deleted: z.boolean().meta({ examples: [true] }),
      eval_id: z.string().meta({ examples: ['eval_abc123'] }),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getEvalsEvalIdRuns = os
  .route({
    method: 'GET',
    path: '/evals/{eval_id}/runs',
    tags: ['Evals'],
    summary: 'Get eval runs',
    description: 'Get a list of runs for an evaluation.\n',
    successDescription: 'A list of runs for the evaluation',
  })
  .input(
    z.object({
      eval_id: z.string(),
      after: z.string().exactOptional(),
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .default(20)
        .exactOptional(),
      order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      status: z.enum(['queued', 'in_progress', 'completed', 'canceled', 'failed']).exactOptional(),
    }),
  )
  .output(EvalRunListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postEvalsEvalIdRuns = os
  .route({
    method: 'POST',
    path: '/evals/{eval_id}/runs',
    tags: ['Evals'],
    summary: 'Create eval run',
    description:
      'Kicks off a new run for a given evaluation, specifying the data source, and what model configuration to use to test. The datasource will be validated against the schema specified in the config of the evaluation.\n',
    successStatus: 201,
    successDescription: 'Successfully created a run for the evaluation',
  })
  .input(
    z.object({
      eval_id: z.string(),
      name: z.string().meta({ description: 'The name of the run.' }).exactOptional(),
      metadata: MetadataSchema.exactOptional(),
      data_source: z
        .xor([
          CreateEvalJsonlRunDataSourceSchema,
          CreateEvalCompletionsRunDataSourceSchema,
          CreateEvalResponsesRunDataSourceSchema,
        ])
        .meta({ description: "Details about the run's data source." }),
    }),
  )
  .output(EvalRunSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getEvalsEvalIdRunsRunId = os
  .route({
    method: 'GET',
    path: '/evals/{eval_id}/runs/{run_id}',
    tags: ['Evals'],
    summary: 'Get an eval run',
    description: 'Get an evaluation run by ID.\n',
    successDescription: 'The evaluation run',
  })
  .input(z.object({ eval_id: z.string(), run_id: z.string() }))
  .output(EvalRunSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteEvalsEvalIdRunsRunId = os
  .route({
    method: 'DELETE',
    path: '/evals/{eval_id}/runs/{run_id}',
    tags: ['Evals'],
    summary: 'Delete eval run',
    description: 'Delete an eval run.\n',
    successDescription: 'Successfully deleted the eval run',
  })
  .input(z.object({ eval_id: z.string(), run_id: z.string() }))
  .output(
    z.object({
      object: z
        .string()
        .meta({ examples: ['eval.run.deleted'] })
        .exactOptional(),
      deleted: z
        .boolean()
        .meta({ examples: [true] })
        .exactOptional(),
      run_id: z
        .string()
        .meta({ examples: ['evalrun_677469f564d48190807532a852da3afb'] })
        .exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postEvalsEvalIdRunsRunIdCancel = os
  .route({
    method: 'POST',
    path: '/evals/{eval_id}/runs/{run_id}/cancel',
    tags: ['Evals'],
    summary: 'Cancel eval run',
    description: 'Cancel an ongoing evaluation run.\n',
    successDescription: 'The canceled eval run object',
  })
  .input(z.object({ eval_id: z.string(), run_id: z.string() }))
  .output(EvalRunSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getEvalsEvalIdRunsRunIdOutputItems = os
  .route({
    method: 'GET',
    path: '/evals/{eval_id}/runs/{run_id}/output_items',
    tags: ['Evals'],
    summary: 'Get eval run output items',
    description: 'Get a list of output items for an evaluation run.\n',
    successDescription: 'A list of output items for the evaluation run',
  })
  .input(
    z.object({
      eval_id: z.string(),
      run_id: z.string(),
      after: z.string().exactOptional(),
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .default(20)
        .exactOptional(),
      status: z.enum(['fail', 'pass']).exactOptional(),
      order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
    }),
  )
  .output(EvalRunOutputItemListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getEvalsEvalIdRunsRunIdOutputItemsOutputItemId = os
  .route({
    method: 'GET',
    path: '/evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}',
    tags: ['Evals'],
    summary: 'Get an output item of an eval run',
    description: 'Get an evaluation run output item by ID.\n',
    successDescription: 'The evaluation run output item',
  })
  .input(z.object({ eval_id: z.string(), run_id: z.string(), output_item_id: z.string() }))
  .output(EvalRunOutputItemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
