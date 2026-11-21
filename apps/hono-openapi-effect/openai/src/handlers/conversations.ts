import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Effect, Schema, SchemaTransformation } from 'effect'
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
              schema: resolver(Schema.toStandardSchemaV1(ConversationItemListSchema)),
            },
          },
        },
        '400': {
          description: 'The stored encrypted item content could not be validated.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The conversation or the item specified by `after` was not found.',
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
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
        }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.optional(Schema.Literals(['asc', 'desc'])),
          after: Schema.optional(Schema.String),
          include: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(IncludeEnumSchema)),
            ),
          ),
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
              schema: resolver(Schema.toStandardSchemaV1(ConversationItemListSchema)),
            },
          },
        },
        '400': {
          description:
            'The items are invalid, are already in the conversation, or the conversation is locked.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The conversation was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The conversation update could not be finalized.',
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
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
        }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          include: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(IncludeEnumSchema)),
            ),
          ),
        }),
      ),
    ),
    validator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          items: Schema.Array(InputItemSchema)
            .check(Schema.isMaxLength(20))
            .annotate({
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ConversationItemSchema)),
            },
          },
        },
        '404': {
          description: 'The conversation or the item in that conversation was not found.',
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
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
          item_id: Schema.String.annotate({ jsonSchemaExamples: ['msg_abc'] }),
        }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          include: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(IncludeEnumSchema)),
            ),
          ),
        }),
      ),
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
              schema: resolver(Schema.toStandardSchemaV1(ConversationResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The item cannot be removed while the conversation is locked.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The conversation or the item in that conversation was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The conversation update could not be finalized.',
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
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
          item_id: Schema.String.annotate({ jsonSchemaExamples: ['msg_abc'] }),
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
              schema: resolver(Schema.toStandardSchemaV1(ConversationResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The conversation input is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The conversation update could not be finalized.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateConversationBodySchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(ConversationResourceSchema)),
            },
          },
        },
        '404': {
          description: 'The conversation was not found.',
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
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
        }),
      ),
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
              schema: resolver(Schema.toStandardSchemaV1(ConversationResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The conversation metadata is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The conversation was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The conversation update could not be finalized.',
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
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
        }),
      ),
    ),
    validator('json', Schema.toStandardSchemaV1(UpdateConversationBodySchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(DeletedConversationResourceSchema)),
            },
          },
        },
        '404': {
          description: 'The conversation was not found.',
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
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
