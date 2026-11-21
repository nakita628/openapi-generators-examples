import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema } from 'effect'
import {
  ErrorResponseSchema,
  OrderEnumSchema,
  ChatSessionResourceSchema,
  CreateChatSessionBodySchema,
  ThreadItemListResourceSchema,
  ThreadResourceSchema,
  DeletedThreadResourceSchema,
  ThreadListResourceSchema,
} from '../components'

export const chatkitHandler = new Hono()
  .post(
    '/chatkit/sessions/:session_id/cancel',
    describeRoute({
      summary: 'Cancel a ChatKit session',
      description:
        'Cancel an active ChatKit session and return its most recent metadata.\n\nCancelling prevents new requests from using the issued client secret.',
      operationId: 'CancelChatSessionMethod',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ChatSessionResourceSchema)),
              examples: {
                Example: {
                  value: {
                    id: 'cksess_123',
                    object: 'chatkit.session',
                    client_secret: '',
                    expires_at: 1712349876,
                    workflow: {
                      id: 'workflow_alpha',
                      version: '2024-10-01',
                      state_variables: { message: 'hello' },
                      tracing: { enabled: true },
                    },
                    user: 'user_789',
                    rate_limits: { max_requests_per_1_minute: 60 },
                    max_requests_per_1_minute: 60,
                    status: 'cancelled',
                    chatkit_configuration: {
                      automatic_thread_titling: { enabled: true },
                      file_upload: { enabled: true, max_file_size: 16, max_files: 20 },
                      history: { enabled: true, recent_threads: 10 },
                    },
                  },
                },
              },
            },
          },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The session was not found or is not accessible.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.annotate({ jsonSchemaExamples: ['cksess_123'] }),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/chatkit/sessions',
    describeRoute({
      summary: 'Create a ChatKit session',
      description: 'Create a ChatKit session.',
      operationId: 'CreateChatSessionMethod',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ChatSessionResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The requested workflow or workflow version was not found or is not accessible.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateChatSessionBodySchema)),
    (c) => {},
  )
  .get(
    '/chatkit/threads/:thread_id/items',
    describeRoute({
      summary: 'List ChatKit thread items',
      description: 'List items that belong to a ChatKit thread.',
      operationId: 'ListThreadItemsMethod',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ThreadItemListResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The thread was not found or is not accessible.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String.annotate({ jsonSchemaExamples: ['cthr_123'] }) }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(
            Schema.String.annotate({
              description:
                'List items created after this thread item ID. Defaults to null for the first page.',
            }),
          ),
          before: Schema.optional(
            Schema.String.annotate({
              description:
                'List items created before this thread item ID. Defaults to null for the newest results.',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/chatkit/threads/:thread_id',
    describeRoute({
      summary: 'Retrieve a ChatKit thread',
      description: 'Retrieve a ChatKit thread by its identifier.',
      operationId: 'GetThreadMethod',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ThreadResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The thread was not found or is not accessible.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String.annotate({ jsonSchemaExamples: ['cthr_123'] }) }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/chatkit/threads/:thread_id',
    describeRoute({
      summary: 'Delete a ChatKit thread',
      description: 'Delete a ChatKit thread along with its items and stored attachments.',
      operationId: 'DeleteThreadMethod',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(DeletedThreadResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The thread was not found or is not accessible.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ thread_id: Schema.String.annotate({ jsonSchemaExamples: ['cthr_123'] }) }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/chatkit/threads',
    describeRoute({
      summary: 'List ChatKit threads',
      description: 'List ChatKit threads with optional pagination and user filters.',
      operationId: 'ListThreadsMethod',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ThreadListResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The thread specified by after was not found or is not accessible.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optional(OrderEnumSchema),
          after: Schema.optional(
            Schema.String.annotate({
              description:
                'List items created after this thread item ID. Defaults to null for the first page.',
            }),
          ),
          before: Schema.optional(
            Schema.String.annotate({
              description:
                'List items created before this thread item ID. Defaults to null for the newest results.',
            }),
          ),
          user: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 512, {
                expected: 'a string of at most 512 characters',
              }),
            ).annotate({
              description:
                'Filter threads that belong to this user identifier. Defaults to null to return all users.',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
  )
