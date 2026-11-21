import { os } from '@orpc/server'
import * as z from 'zod'
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
    z.object({
      conversation_id: z.string().meta({ examples: ['conv_123'] }),
      limit: z.coerce.number().int().default(20).exactOptional(),
      order: z.enum(['asc', 'desc']).exactOptional(),
      after: z.string().exactOptional(),
      include: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(IncludeEnumSchema),
        )
        .exactOptional(),
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
    z.object({
      conversation_id: z.string().meta({ examples: ['conv_123'] }),
      include: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(IncludeEnumSchema),
        )
        .exactOptional(),
      items: z
        .array(InputItemSchema)
        .max(20)
        .meta({
          description:
            'The items to add to the conversation. You may add up to 20 items at a time.\n',
        }),
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
    z.object({
      conversation_id: z.string().meta({ examples: ['conv_123'] }),
      item_id: z.string().meta({ examples: ['msg_abc'] }),
      include: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(IncludeEnumSchema),
        )
        .exactOptional(),
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
    z.object({
      conversation_id: z.string().meta({ examples: ['conv_123'] }),
      item_id: z.string().meta({ examples: ['msg_abc'] }),
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
  .input(z.object({ conversation_id: z.string().meta({ examples: ['conv_123'] }) }))
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
    z.object({
      conversation_id: z.string().meta({ examples: ['conv_123'] }),
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
  .input(z.object({ conversation_id: z.string().meta({ examples: ['conv_123'] }) }))
  .output(DeletedConversationResourceSchema)
  .handler(async ({ input }) => {})
