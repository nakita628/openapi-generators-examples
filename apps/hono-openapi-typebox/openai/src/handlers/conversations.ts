import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  ConversationItemSchema,
  ConversationItemListSchema,
  ErrorResponseSchema,
  InputItemSchema,
  IncludeEnumSchema,
  ConversationResourceSchema,
  CreateConversationBodySchema,
  UpdateConversationBodySchema,
  DeletedConversationResourceSchema,
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

export const conversationsHandler = new Hono()
  .get(
    '/conversations/:conversation_id/items',
    describeRoute({
      operationId: 'listConversationItems',
      tags: ['Conversations'],
      summary: 'List items',
      description: 'List all items for a conversation with the given ID.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ConversationItemListSchema)),
            },
          },
        },
        '400': {
          description: 'The stored encrypted item content could not be validated.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The conversation or the item specified by `after` was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ conversation_id: Type.String({ examples: ['conv_123'] }) })),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number.isSafeInteger(Number(value)),
                () => 'must be a safe integer',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
          after: Type.Optional(Type.String()),
          include: Type.Optional(Type.Array(IncludeEnumSchema)),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/conversations/:conversation_id/items',
    describeRoute({
      operationId: 'createConversationItems',
      tags: ['Conversations'],
      summary: 'Create items',
      description: 'Create items in a conversation with the given ID.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ConversationItemListSchema)),
            },
          },
        },
        '400': {
          description:
            'The items are invalid, are already in the conversation, or the conversation is locked.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The conversation was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The conversation update could not be finalized.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ conversation_id: Type.String({ examples: ['conv_123'] }) })),
    ),
    validator(
      'query',
      toStandardSchemaV1(Type.Object({ include: Type.Optional(Type.Array(IncludeEnumSchema)) })),
    ),
    validator(
      'json',
      toStandardSchemaV1(
        Type.Object({
          items: Type.Array(InputItemSchema, {
            maxItems: 20,
            description:
              'The items to add to the conversation. You may add up to 20 items at a time.\n',
          }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/conversations/:conversation_id/items/:item_id',
    describeRoute({
      operationId: 'getConversationItem',
      tags: ['Conversations'],
      summary: 'Retrieve an item',
      description: 'Get a single item from a conversation with the given IDs.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ConversationItemSchema)) },
          },
        },
        '404': {
          description: 'The conversation or the item in that conversation was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          conversation_id: Type.String({ examples: ['conv_123'] }),
          item_id: Type.String({ examples: ['msg_abc'] }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(Type.Object({ include: Type.Optional(Type.Array(IncludeEnumSchema)) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/conversations/:conversation_id/items/:item_id',
    describeRoute({
      operationId: 'deleteConversationItem',
      tags: ['Conversations'],
      summary: 'Delete an item',
      description: 'Delete an item from a conversation with the given IDs.',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ConversationResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The item cannot be removed while the conversation is locked.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The conversation or the item in that conversation was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The conversation update could not be finalized.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          conversation_id: Type.String({ examples: ['conv_123'] }),
          item_id: Type.String({ examples: ['msg_abc'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/conversations',
    describeRoute({
      tags: ['Conversations'],
      summary: 'Create a conversation',
      description: 'Create a conversation.',
      operationId: 'createConversation',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ConversationResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The conversation input is invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The conversation update could not be finalized.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(CreateConversationBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/conversations/:conversation_id',
    describeRoute({
      tags: ['Conversations'],
      summary: 'Retrieve a conversation',
      description: 'Get a conversation',
      operationId: 'getConversation',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ConversationResourceSchema)),
            },
          },
        },
        '404': {
          description: 'The conversation was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ conversation_id: Type.String({ examples: ['conv_123'] }) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/conversations/:conversation_id',
    describeRoute({
      tags: ['Conversations'],
      summary: 'Update a conversation',
      description: 'Update a conversation',
      operationId: 'updateConversation',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ConversationResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The conversation metadata is invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The conversation was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The conversation update could not be finalized.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ conversation_id: Type.String({ examples: ['conv_123'] }) })),
    ),
    validator('json', toStandardSchemaV1(UpdateConversationBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/conversations/:conversation_id',
    describeRoute({
      tags: ['Conversations'],
      summary: 'Delete a conversation',
      description: 'Delete a conversation. Items in the conversation will not be deleted.',
      operationId: 'deleteConversation',
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedConversationResourceSchema)),
            },
          },
        },
        '404': {
          description: 'The conversation was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ conversation_id: Type.String({ examples: ['conv_123'] }) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
