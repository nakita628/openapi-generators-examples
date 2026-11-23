import { os } from '@orpc/server'
import * as v from 'valibot'
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
    v.object({
      after: v.optional(v.string()),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'asc')),
      order_by: v.optional(v.optional(v.picklist(['created_at', 'updated_at']), 'created_at')),
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
  .input(v.object({ eval_id: v.string() }))
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
    v.object({
      eval_id: v.string(),
      name: v.optional(v.pipe(v.string(), v.description('Rename the evaluation.'))),
      metadata: v.optional(MetadataSchema),
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
  .input(v.object({ eval_id: v.string() }))
  .output(
    v.object({
      object: v.pipe(v.string(), v.metadata({ examples: ['eval.deleted'] })),
      deleted: v.pipe(v.boolean(), v.metadata({ examples: [true] })),
      eval_id: v.pipe(v.string(), v.metadata({ examples: ['eval_abc123'] })),
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
    v.object({
      eval_id: v.string(),
      after: v.optional(v.string()),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'asc')),
      status: v.optional(v.picklist(['queued', 'in_progress', 'completed', 'canceled', 'failed'])),
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
    v.object({
      eval_id: v.string(),
      name: v.optional(v.pipe(v.string(), v.description('The name of the run.'))),
      metadata: v.optional(MetadataSchema),
      data_source: v.pipe(
        v.union([
          CreateEvalJsonlRunDataSourceSchema,
          CreateEvalCompletionsRunDataSourceSchema,
          CreateEvalResponsesRunDataSourceSchema,
        ]),
        v.description("Details about the run's data source."),
      ),
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
  .input(v.object({ eval_id: v.string(), run_id: v.string() }))
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
  .input(v.object({ eval_id: v.string(), run_id: v.string() }))
  .output(
    v.partial(
      v.object({
        object: v.pipe(v.string(), v.metadata({ examples: ['eval.run.deleted'] })),
        deleted: v.pipe(v.boolean(), v.metadata({ examples: [true] })),
        run_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['evalrun_677469f564d48190807532a852da3afb'] }),
        ),
      }),
    ),
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
  .input(v.object({ eval_id: v.string(), run_id: v.string() }))
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
    v.object({
      eval_id: v.string(),
      run_id: v.string(),
      after: v.optional(v.string()),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          '20',
        ),
      ),
      status: v.optional(v.picklist(['fail', 'pass'])),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'asc')),
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
  .input(v.object({ eval_id: v.string(), run_id: v.string(), output_item_id: v.string() }))
  .output(EvalRunOutputItemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
