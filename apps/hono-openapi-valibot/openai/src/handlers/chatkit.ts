import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
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
              schema: resolver(ChatSessionResourceSchema),
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
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The session was not found or is not accessible.',
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
      v.object({ session_id: v.pipe(v.string(), v.metadata({ examples: ['cksess_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(ChatSessionResourceSchema) } },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description:
            'The requested workflow or workflow version was not found or is not accessible.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request rate limit has been exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('json', CreateChatSessionBodySchema),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(ThreadItemListResourceSchema) } },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The thread was not found or is not accessible.',
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
      v.object({ thread_id: v.pipe(v.string(), v.metadata({ examples: ['cthr_123'] })) }),
    ),
    validator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
          order: OrderEnumSchema,
          after: v.pipe(
            v.string(),
            v.description(
              'List items created after this thread item ID. Defaults to null for the first page.',
            ),
          ),
          before: v.pipe(
            v.string(),
            v.description(
              'List items created before this thread item ID. Defaults to null for the newest results.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(ThreadResourceSchema) } },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The thread was not found or is not accessible.',
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
      v.object({ thread_id: v.pipe(v.string(), v.metadata({ examples: ['cthr_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(DeletedThreadResourceSchema) } },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The thread was not found or is not accessible.',
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
      v.object({ thread_id: v.pipe(v.string(), v.metadata({ examples: ['cthr_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
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
          content: { 'application/json': { schema: resolver(ThreadListResourceSchema) } },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The thread specified by after was not found or is not accessible.',
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
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
          order: OrderEnumSchema,
          after: v.pipe(
            v.string(),
            v.description(
              'List items created after this thread item ID. Defaults to null for the first page.',
            ),
          ),
          before: v.pipe(
            v.string(),
            v.description(
              'List items created before this thread item ID. Defaults to null for the newest results.',
            ),
          ),
          user: v.pipe(
            v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(512)),
            v.description(
              'Filter threads that belong to this user identifier. Defaults to null to return all users.',
            ),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
