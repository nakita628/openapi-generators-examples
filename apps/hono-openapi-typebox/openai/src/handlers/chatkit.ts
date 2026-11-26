import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
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
              schema: resolver(toStandardSchemaV1(ChatSessionResourceSchema)),
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
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The session was not found or is not accessible.',
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
      toStandardSchemaV1(Type.Object({ session_id: Type.String({ examples: ['cksess_123'] }) })),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ChatSessionResourceSchema)) },
          },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description:
            'The requested workflow or workflow version was not found or is not accessible.',
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
    validator('json', toStandardSchemaV1(CreateChatSessionBodySchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ThreadItemListResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The thread was not found or is not accessible.',
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
      toStandardSchemaV1(Type.Object({ thread_id: Type.String({ examples: ['cthr_123'] }) })),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.Refine(
                    Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                    (value) => Number.isSafeInteger(Number(value)),
                    () => 'must be a safe integer',
                  ),
                  (value) => Number(value) >= 0,
                  () => 'must be >= 0',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(OrderEnumSchema),
          after: Type.Optional(
            Type.String({
              description:
                'List items created after this thread item ID. Defaults to null for the first page.',
            }),
          ),
          before: Type.Optional(
            Type.String({
              description:
                'List items created before this thread item ID. Defaults to null for the newest results.',
            }),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ThreadResourceSchema)) },
          },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The thread was not found or is not accessible.',
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
      toStandardSchemaV1(Type.Object({ thread_id: Type.String({ examples: ['cthr_123'] }) })),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedThreadResourceSchema)),
            },
          },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The thread was not found or is not accessible.',
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
      toStandardSchemaV1(Type.Object({ thread_id: Type.String({ examples: ['cthr_123'] }) })),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ThreadListResourceSchema)) },
          },
        },
        '400': {
          description:
            'The request is invalid or the required ChatKit beta header is missing or invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The thread specified by after was not found or is not accessible.',
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
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.Refine(
                    Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                    (value) => Number.isSafeInteger(Number(value)),
                    () => 'must be a safe integer',
                  ),
                  (value) => Number(value) >= 0,
                  () => 'must be >= 0',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(OrderEnumSchema),
          after: Type.Optional(
            Type.String({
              description:
                'List items created after this thread item ID. Defaults to null for the first page.',
            }),
          ),
          before: Type.Optional(
            Type.String({
              description:
                'List items created before this thread item ID. Defaults to null for the newest results.',
            }),
          ),
          user: Type.Optional(
            Type.String({
              minLength: 1,
              maxLength: 512,
              description:
                'Filter threads that belong to this user identifier. Defaults to null to return all users.',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
