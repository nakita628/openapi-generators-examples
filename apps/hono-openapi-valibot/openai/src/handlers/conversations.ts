import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
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
          content: { 'application/json': { schema: resolver(ConversationItemListSchema) } },
        },
        '400': {
          description: 'The stored encrypted item content could not be validated.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The conversation or the item specified by `after` was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }),
    ),
    validator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc'])),
        after: v.optional(v.string()),
        include: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(IncludeEnumSchema),
          ),
        ),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(ConversationItemListSchema) } },
        },
        '400': {
          description:
            'The items are invalid, are already in the conversation, or the conversation is locked.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The conversation was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The conversation update could not be finalized.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }),
    ),
    validator(
      'query',
      v.partial(
        v.object({
          include: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(IncludeEnumSchema),
          ),
        }),
      ),
    ),
    validator(
      'json',
      v.object({
        items: v.pipe(
          v.pipe(v.array(InputItemSchema), v.maxLength(20)),
          v.description(
            'The items to add to the conversation. You may add up to 20 items at a time.\n',
          ),
        ),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(ConversationItemSchema) } },
        },
        '404': {
          description: 'The conversation or the item in that conversation was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      v.object({
        conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
        item_id: v.pipe(v.string(), v.metadata({ examples: ['msg_abc'] })),
      }),
    ),
    validator(
      'query',
      v.partial(
        v.object({
          include: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(IncludeEnumSchema),
          ),
        }),
      ),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(ConversationResourceSchema) } },
        },
        '400': {
          description: 'The item cannot be removed while the conversation is locked.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The conversation or the item in that conversation was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The conversation update could not be finalized.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
        item_id: v.pipe(v.string(), v.metadata({ examples: ['msg_abc'] })),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(ConversationResourceSchema) } },
        },
        '400': {
          description: 'The conversation input is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The conversation update could not be finalized.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('json', CreateConversationBodySchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(ConversationResourceSchema) } },
        },
        '404': {
          description: 'The conversation was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(ConversationResourceSchema) } },
        },
        '400': {
          description: 'The conversation metadata is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The conversation was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The conversation update could not be finalized.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }),
    ),
    validator('json', UpdateConversationBodySchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(DeletedConversationResourceSchema) } },
        },
        '404': {
          description: 'The conversation was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }),
    ),
    (c) => {},
  )
