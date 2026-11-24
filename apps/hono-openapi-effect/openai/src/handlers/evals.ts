import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  CreateEvalRequestSchema,
  CreateEvalRunRequestSchema,
  ErrorResponseSchema,
  EvalSchema,
  EvalListSchema,
  EvalRunSchema,
  EvalRunListSchema,
  EvalRunOutputItemSchema,
  EvalRunOutputItemListSchema,
  MetadataSchema,
  TooManyRequestsResponse,
} from '../components'

export const evalsHandler = new Hono()
  .get(
    '/evals',
    describeRoute({
      operationId: 'listEvals',
      tags: ['Evals'],
      summary: 'List evals',
      description: 'List evaluations for a project.\n',
      responses: {
        '200': {
          description: 'A list of evals',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(EvalListSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optionalKey(Schema.String),
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
          order_by: Schema.Literals(['created_at', 'updated_at']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('created_at')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals',
    describeRoute({
      operationId: 'createEval',
      tags: ['Evals'],
      summary: 'Create eval',
      description:
        "Create the structure of an evaluation that can be used to test a model's performance.\nAn evaluation is a set of testing criteria and the config for a data source, which dictates the schema of the data used in the evaluation. After creating an evaluation, you can run it on different models and model parameters. We support several types of graders and datasources.\nFor more information, see the [Evals guide](https://developers.openai.com/api/docs/guides/evals).\n",
      responses: {
        '201': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(EvalSchema)) },
          },
        },
        '400': {
          description: 'The evaluation input or grader configuration is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateEvalRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id',
    describeRoute({
      operationId: 'getEval',
      tags: ['Evals'],
      summary: 'Get an eval',
      description: 'Get an evaluation by ID.\n',
      responses: {
        '200': {
          description: 'The evaluation',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(EvalSchema)) },
          },
        },
        '404': {
          description: 'The evaluation was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id',
    describeRoute({
      operationId: 'updateEval',
      tags: ['Evals'],
      summary: 'Update an eval',
      description: 'Update certain properties of an evaluation.\n',
      responses: {
        '200': {
          description: 'The updated evaluation',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(EvalSchema)) },
          },
        },
        '400': {
          description: 'The evaluation name or metadata is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The evaluation was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.optionalKey(
            Schema.String.annotate({ description: 'Rename the evaluation.' }),
          ),
          metadata: Schema.optionalKey(MetadataSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/evals/:eval_id',
    describeRoute({
      operationId: 'deleteEval',
      tags: ['Evals'],
      summary: 'Delete an eval',
      description: 'Delete an evaluation.\n',
      responses: {
        '200': {
          description: 'Successfully deleted the evaluation.',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(
                  Schema.Struct({
                    object: Schema.String.annotate({ jsonSchemaExamples: ['eval.deleted'] }),
                    deleted: Schema.Boolean.annotate({ jsonSchemaExamples: [true] }),
                    eval_id: Schema.String.annotate({ jsonSchemaExamples: ['eval_abc123'] }),
                  }),
                ),
              ),
            },
          },
        },
        '400': {
          description: 'The evaluation cannot be deleted while it has unfinished runs.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'Evaluation not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs',
    describeRoute({
      operationId: 'getEvalRuns',
      tags: ['Evals'],
      summary: 'Get eval runs',
      description: 'Get a list of runs for an evaluation.\n',
      responses: {
        '200': {
          description: 'A list of runs for the evaluation',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(EvalRunListSchema)) },
          },
        },
        '400': {
          description: 'The run list parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The evaluation or the run specified by `after` was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optionalKey(Schema.String),
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['queued', 'in_progress', 'completed', 'canceled', 'failed']),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id/runs',
    describeRoute({
      operationId: 'createEvalRun',
      tags: ['Evals'],
      summary: 'Create eval run',
      description:
        'Kicks off a new run for a given evaluation, specifying the data source, and what model configuration to use to test. The datasource will be validated against the schema specified in the config of the evaluation.\n',
      responses: {
        '201': {
          description: 'Successfully created a run for the evaluation',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(EvalRunSchema)) },
          },
        },
        '400': {
          description: 'Bad request (for example, missing eval object)',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The evaluation or a referenced resource was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The evaluation run could not be created.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(CreateEvalRunRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id',
    describeRoute({
      operationId: 'getEvalRun',
      tags: ['Evals'],
      summary: 'Get an eval run',
      description: 'Get an evaluation run by ID.\n',
      responses: {
        '200': {
          description: 'The evaluation run',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(EvalRunSchema)) },
          },
        },
        '400': {
          description: 'The evaluation run does not belong to the specified evaluation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The evaluation or evaluation run was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/evals/:eval_id/runs/:run_id',
    describeRoute({
      operationId: 'deleteEvalRun',
      tags: ['Evals'],
      summary: 'Delete eval run',
      description: 'Delete an eval run.\n',
      responses: {
        '200': {
          description: 'Successfully deleted the eval run',
          content: {
            'application/json': {
              schema: resolver(
                Schema.toStandardSchemaV1(
                  Schema.Struct({
                    object: Schema.optionalKey(
                      Schema.String.annotate({ jsonSchemaExamples: ['eval.run.deleted'] }),
                    ),
                    deleted: Schema.optionalKey(
                      Schema.Boolean.annotate({ jsonSchemaExamples: [true] }),
                    ),
                    run_id: Schema.optionalKey(
                      Schema.String.annotate({
                        jsonSchemaExamples: ['evalrun_677469f564d48190807532a852da3afb'],
                      }),
                    ),
                  }),
                ),
              ),
            },
          },
        },
        '400': {
          description: 'The evaluation run cannot be deleted until it is finished.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'Run not found',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/evals/:eval_id/runs/:run_id/cancel',
    describeRoute({
      operationId: 'cancelEvalRun',
      tags: ['Evals'],
      summary: 'Cancel eval run',
      description: 'Cancel an ongoing evaluation run.\n',
      responses: {
        '200': {
          description: 'The canceled eval run object',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(EvalRunSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items',
    describeRoute({
      operationId: 'getEvalRunOutputItems',
      tags: ['Evals'],
      summary: 'Get eval run output items',
      description: 'Get a list of output items for an evaluation run.\n',
      responses: {
        '200': {
          description: 'A list of output items for the evaluation run',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(EvalRunOutputItemListSchema)),
            },
          },
        },
        '400': {
          description: 'The output item list parameters are invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The evaluation or evaluation run was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ eval_id: Schema.String, run_id: Schema.String })),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          after: Schema.optionalKey(Schema.String),
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          status: Schema.optionalKey(Schema.Literals(['fail', 'pass'])),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/evals/:eval_id/runs/:run_id/output_items/:output_item_id',
    describeRoute({
      operationId: 'getEvalRunOutputItem',
      tags: ['Evals'],
      summary: 'Get an output item of an eval run',
      description: 'Get an evaluation run output item by ID.\n',
      responses: {
        '200': {
          description: 'The evaluation run output item',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(EvalRunOutputItemSchema)),
            },
          },
        },
        '400': {
          description:
            'The output item was not found, its identifier is invalid, or the run does not belong to the evaluation.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The evaluation or evaluation run was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          eval_id: Schema.String,
          run_id: Schema.String,
          output_item_id: Schema.String,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
