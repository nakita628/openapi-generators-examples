import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  AssistantStreamEventSchema,
  CreateMessageRequestSchema,
  CreateRunRequestSchema,
  CreateThreadAndRunRequestSchema,
  CreateThreadRequestSchema,
  DeleteMessageResponseSchema,
  DeleteThreadResponseSchema,
  ListMessagesResponseSchema,
  ListRunStepsResponseSchema,
  ListRunsResponseSchema,
  MessageObjectSchema,
  ModifyMessageRequestSchema,
  ModifyRunRequestSchema,
  ModifyThreadRequestSchema,
  RunObjectSchema,
  RunStepObjectSchema,
  SubmitToolOutputsRunRequestSchema,
  ThreadObjectSchema,
  TooManyRequestsResponse,
} from '../components'

export const threadsHandler = new Hono()
  .post(
    '/threads',
    describeRoute({
      operationId: 'createThread',
      tags: ['Assistants'],
      summary: 'Create thread',
      description: 'Create a thread.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ThreadObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateThreadRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/runs',
    describeRoute({
      operationId: 'createThreadAndRun',
      tags: ['Assistants'],
      summary: 'Create thread and run',
      description: 'Create a thread and run it in one request.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(RunObjectSchema)) },
            'text/event-stream': {
              schema: resolver(Schema.toStandardSchemaV1(AssistantStreamEventSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateThreadAndRunRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id',
    describeRoute({
      operationId: 'getThread',
      tags: ['Assistants'],
      summary: 'Retrieve thread',
      description: 'Retrieves a thread.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ThreadObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id',
    describeRoute({
      operationId: 'modifyThread',
      tags: ['Assistants'],
      summary: 'Modify thread',
      description: 'Modifies a thread.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ThreadObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(ModifyThreadRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/threads/:thread_id',
    describeRoute({
      operationId: 'deleteThread',
      tags: ['Assistants'],
      summary: 'Delete thread',
      description: 'Delete a thread.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(DeleteThreadResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/messages',
    describeRoute({
      operationId: 'listMessages',
      tags: ['Assistants'],
      summary: 'List messages',
      description: 'Returns a list of messages for a given thread.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ListMessagesResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
          run_id: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/messages',
    describeRoute({
      operationId: 'createMessage',
      tags: ['Assistants'],
      summary: 'Create message',
      description: 'Create a message.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(MessageObjectSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(CreateMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/messages/:message_id',
    describeRoute({
      operationId: 'getMessage',
      tags: ['Assistants'],
      summary: 'Retrieve message',
      description: 'Retrieve a message.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(MessageObjectSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String, message_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/messages/:message_id',
    describeRoute({
      operationId: 'modifyMessage',
      tags: ['Assistants'],
      summary: 'Modify message',
      description: 'Modifies a message.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(MessageObjectSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String, message_id: Schema.String }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(ModifyMessageRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/threads/:thread_id/messages/:message_id',
    describeRoute({
      operationId: 'deleteMessage',
      tags: ['Assistants'],
      summary: 'Delete message',
      description: 'Deletes a message.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(DeleteMessageResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String, message_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs',
    describeRoute({
      operationId: 'listRuns',
      tags: ['Assistants'],
      summary: 'List runs',
      description: 'Returns a list of runs belonging to a thread.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ListRunsResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs',
    describeRoute({
      operationId: 'createRun',
      tags: ['Assistants'],
      summary: 'Create run',
      description: 'Create a run.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(RunObjectSchema)) },
            'text/event-stream': {
              schema: resolver(Schema.toStandardSchemaV1(AssistantStreamEventSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'include[]': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Literal('step_details.tool_calls[*].file_search.results[*].content'),
                ),
              ),
            ),
          ),
        }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(CreateRunRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs/:run_id',
    describeRoute({
      operationId: 'getRun',
      tags: ['Assistants'],
      summary: 'Retrieve run',
      description: 'Retrieves a run.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(RunObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs/:run_id',
    describeRoute({
      operationId: 'modifyRun',
      tags: ['Assistants'],
      summary: 'Modify run',
      description: 'Modifies a run.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(RunObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String, run_id: Schema.String })),
    ),
    validator('json', Schema.toStandardSchemaV1(ModifyRunRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs/:run_id/cancel',
    describeRoute({
      operationId: 'cancelRun',
      tags: ['Assistants'],
      summary: 'Cancel a run',
      description: 'Cancels a run that is `in_progress`.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(RunObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String, run_id: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps',
    describeRoute({
      operationId: 'listRunSteps',
      tags: ['Assistants'],
      summary: 'List run steps',
      description: 'Returns a list of run steps belonging to a run.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ListRunStepsResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String, run_id: Schema.String })),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
          'include[]': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Literal('step_details.tool_calls[*].file_search.results[*].content'),
                ),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps/:step_id',
    describeRoute({
      operationId: 'getRunStep',
      tags: ['Assistants'],
      summary: 'Retrieve run step',
      description: 'Retrieves a run step.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(RunStepObjectSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String, run_id: Schema.String, step_id: Schema.String }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'include[]': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Literal('step_details.tool_calls[*].file_search.results[*].content'),
                ),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs/:run_id/submit_tool_outputs',
    describeRoute({
      operationId: 'submitToolOuputsToRun',
      tags: ['Assistants'],
      summary: 'Submit tool outputs to run',
      description:
        'When a run has the `status: "requires_action"` and `required_action.type` is `submit_tool_outputs`, this endpoint can be used to submit the outputs from the tool calls once they\'re all completed. All outputs must be submitted in a single request.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(RunObjectSchema)) },
            'text/event-stream': {
              schema: resolver(Schema.toStandardSchemaV1(AssistantStreamEventSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(Schema.Struct({ thread_id: Schema.String, run_id: Schema.String })),
    ),
    validator('json', Schema.toStandardSchemaV1(SubmitToolOutputsRunRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
