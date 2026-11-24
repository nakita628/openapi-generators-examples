import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
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
            'application/json': { schema: resolver(toStandardSchemaV1(ThreadObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', toStandardSchemaV1(CreateThreadRequestSchema)),
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
            'application/json': { schema: resolver(toStandardSchemaV1(RunObjectSchema)) },
            'text/event-stream': {
              schema: resolver(toStandardSchemaV1(AssistantStreamEventSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', toStandardSchemaV1(CreateThreadAndRunRequestSchema)),
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
            'application/json': { schema: resolver(toStandardSchemaV1(ThreadObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ thread_id: Type.String() }))),
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
            'application/json': { schema: resolver(toStandardSchemaV1(ThreadObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ thread_id: Type.String() }))),
    validator('json', toStandardSchemaV1(ModifyThreadRequestSchema)),
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
              schema: resolver(toStandardSchemaV1(DeleteThreadResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ thread_id: Type.String() }))),
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
              schema: resolver(toStandardSchemaV1(ListMessagesResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ thread_id: Type.String() }))),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(
            Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
          ),
          after: Type.Optional(Type.String()),
          before: Type.Optional(Type.String()),
          run_id: Type.Optional(Type.String()),
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
            'application/json': { schema: resolver(toStandardSchemaV1(MessageObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ thread_id: Type.String() }))),
    validator('json', toStandardSchemaV1(CreateMessageRequestSchema)),
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
            'application/json': { schema: resolver(toStandardSchemaV1(MessageObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ thread_id: Type.String(), message_id: Type.String() })),
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
            'application/json': { schema: resolver(toStandardSchemaV1(MessageObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ thread_id: Type.String(), message_id: Type.String() })),
    ),
    validator('json', toStandardSchemaV1(ModifyMessageRequestSchema)),
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
              schema: resolver(toStandardSchemaV1(DeleteMessageResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ thread_id: Type.String(), message_id: Type.String() })),
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
            'application/json': { schema: resolver(toStandardSchemaV1(ListRunsResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ thread_id: Type.String() }))),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(
            Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
          ),
          after: Type.Optional(Type.String()),
          before: Type.Optional(Type.String()),
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
            'application/json': { schema: resolver(toStandardSchemaV1(RunObjectSchema)) },
            'text/event-stream': {
              schema: resolver(toStandardSchemaV1(AssistantStreamEventSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ thread_id: Type.String() }))),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          'include[]': Type.Optional(
            Type.Array(Type.Literal('step_details.tool_calls[*].file_search.results[*].content')),
          ),
        }),
      ),
    ),
    validator('json', toStandardSchemaV1(CreateRunRequestSchema)),
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
            'application/json': { schema: resolver(toStandardSchemaV1(RunObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ thread_id: Type.String(), run_id: Type.String() })),
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
            'application/json': { schema: resolver(toStandardSchemaV1(RunObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ thread_id: Type.String(), run_id: Type.String() })),
    ),
    validator('json', toStandardSchemaV1(ModifyRunRequestSchema)),
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
            'application/json': { schema: resolver(toStandardSchemaV1(RunObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ thread_id: Type.String(), run_id: Type.String() })),
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
              schema: resolver(toStandardSchemaV1(ListRunStepsResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ thread_id: Type.String(), run_id: Type.String() })),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(
            Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
          ),
          after: Type.Optional(Type.String()),
          before: Type.Optional(Type.String()),
          'include[]': Type.Optional(
            Type.Array(Type.Literal('step_details.tool_calls[*].file_search.results[*].content')),
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
            'application/json': { schema: resolver(toStandardSchemaV1(RunStepObjectSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ thread_id: Type.String(), run_id: Type.String(), step_id: Type.String() }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          'include[]': Type.Optional(
            Type.Array(Type.Literal('step_details.tool_calls[*].file_search.results[*].content')),
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
            'application/json': { schema: resolver(toStandardSchemaV1(RunObjectSchema)) },
            'text/event-stream': {
              schema: resolver(toStandardSchemaV1(AssistantStreamEventSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ thread_id: Type.String(), run_id: Type.String() })),
    ),
    validator('json', toStandardSchemaV1(SubmitToolOutputsRunRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
