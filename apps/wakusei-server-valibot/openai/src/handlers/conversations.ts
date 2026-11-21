import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  ConversationItemListSchema,
  ConversationItemSchema,
  ConversationResourceSchema,
  CreateConversationBodySchema,
  DeletedConversationResourceSchema,
  IncludeEnumSchema,
  InputItemSchema,
  MetadataSchema,
} from '../components'

export const getConversationsConversationIdItems = os
  .route({
    method: 'GET',
    path: '/conversations/{conversation_id}/items',
    tags: ['Conversations'],
    summary: 'List items',
    description: 'List all items for a conversation with the given ID.',
  })
  .input(
    v.object({
      conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
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
  )
  .output(ConversationItemListSchema)
  .handler(async ({ input }) => {})

export const postConversationsConversationIdItems = os
  .route({
    method: 'POST',
    path: '/conversations/{conversation_id}/items',
    tags: ['Conversations'],
    summary: 'Create items',
    description: 'Create items in a conversation with the given ID.',
  })
  .input(
    v.object({
      conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
      include: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(IncludeEnumSchema),
        ),
      ),
      items: v.pipe(
        v.pipe(v.array(InputItemSchema), v.maxLength(20)),
        v.description(
          'The items to add to the conversation. You may add up to 20 items at a time.\n',
        ),
      ),
    }),
  )
  .output(ConversationItemListSchema)
  .handler(async ({ input }) => {})

export const getConversationsConversationIdItemsItemId = os
  .route({
    method: 'GET',
    path: '/conversations/{conversation_id}/items/{item_id}',
    tags: ['Conversations'],
    summary: 'Retrieve an item',
    description: 'Get a single item from a conversation with the given IDs.',
  })
  .input(
    v.object({
      conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
      item_id: v.pipe(v.string(), v.metadata({ examples: ['msg_abc'] })),
      include: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(IncludeEnumSchema),
        ),
      ),
    }),
  )
  .output(ConversationItemSchema)
  .handler(async ({ input }) => {})

export const deleteConversationsConversationIdItemsItemId = os
  .route({
    method: 'DELETE',
    path: '/conversations/{conversation_id}/items/{item_id}',
    tags: ['Conversations'],
    summary: 'Delete an item',
    description: 'Delete an item from a conversation with the given IDs.',
  })
  .input(
    v.object({
      conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
      item_id: v.pipe(v.string(), v.metadata({ examples: ['msg_abc'] })),
    }),
  )
  .output(ConversationResourceSchema)
  .handler(async ({ input }) => {})

export const postConversations = os
  .route({
    method: 'POST',
    path: '/conversations',
    tags: ['Conversations'],
    summary: 'Create a conversation',
    description: 'Create a conversation.',
    successDescription: 'Success',
  })
  .input(CreateConversationBodySchema)
  .output(ConversationResourceSchema)
  .handler(async ({ input }) => {})

export const getConversationsConversationId = os
  .route({
    method: 'GET',
    path: '/conversations/{conversation_id}',
    tags: ['Conversations'],
    summary: 'Retrieve a conversation',
    description: 'Get a conversation',
    successDescription: 'Success',
  })
  .input(v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }))
  .output(ConversationResourceSchema)
  .handler(async ({ input }) => {})

export const postConversationsConversationId = os
  .route({
    method: 'POST',
    path: '/conversations/{conversation_id}',
    tags: ['Conversations'],
    summary: 'Update a conversation',
    description: 'Update a conversation',
    successDescription: 'Success',
  })
  .input(
    v.object({
      conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
      metadata: MetadataSchema,
    }),
  )
  .output(ConversationResourceSchema)
  .handler(async ({ input }) => {})

export const deleteConversationsConversationId = os
  .route({
    method: 'DELETE',
    path: '/conversations/{conversation_id}',
    tags: ['Conversations'],
    summary: 'Delete a conversation',
    description: 'Delete a conversation. Items in the conversation will not be deleted.',
    successDescription: 'Success',
  })
  .input(v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }))
  .output(DeletedConversationResourceSchema)
  .handler(async ({ input }) => {})
