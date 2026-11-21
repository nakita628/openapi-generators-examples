import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type({
      conversation_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
      'include?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(IncludeEnumSchema).array(),
      ),
    }),
  )
  .output(ConversationItemListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postConversationsConversationIdItems = os
  .route({
    method: 'POST',
    path: '/conversations/{conversation_id}/items',
    tags: ['Conversations'],
    summary: 'Create items',
    description: 'Create items in a conversation with the given ID.',
  })
  .input(
    type({
      conversation_id: type('string'),
      'include?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(IncludeEnumSchema).array(),
      ),
      items: type(type(InputItemSchema).array())
        .and(type('unknown[] <= 20'))
        .describe('The items to add to the conversation. You may add up to 20 items at a time.\n'),
    }),
  )
  .output(ConversationItemListSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getConversationsConversationIdItemsItemId = os
  .route({
    method: 'GET',
    path: '/conversations/{conversation_id}/items/{item_id}',
    tags: ['Conversations'],
    summary: 'Retrieve an item',
    description: 'Get a single item from a conversation with the given IDs.',
  })
  .input(
    type({
      conversation_id: type('string'),
      item_id: type('string'),
      'include?': type('unknown').pipe(
        (data) => (data === undefined || Array.isArray(data) ? data : [data]),
        type(IncludeEnumSchema).array(),
      ),
    }),
  )
  .output(ConversationItemSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteConversationsConversationIdItemsItemId = os
  .route({
    method: 'DELETE',
    path: '/conversations/{conversation_id}/items/{item_id}',
    tags: ['Conversations'],
    summary: 'Delete an item',
    description: 'Delete an item from a conversation with the given IDs.',
  })
  .input(type({ conversation_id: type('string'), item_id: type('string') }))
  .output(ConversationResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getConversationsConversationId = os
  .route({
    method: 'GET',
    path: '/conversations/{conversation_id}',
    tags: ['Conversations'],
    summary: 'Retrieve a conversation',
    description: 'Get a conversation',
    successDescription: 'Success',
  })
  .input(type({ conversation_id: type('string') }))
  .output(ConversationResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postConversationsConversationId = os
  .route({
    method: 'POST',
    path: '/conversations/{conversation_id}',
    tags: ['Conversations'],
    summary: 'Update a conversation',
    description: 'Update a conversation',
    successDescription: 'Success',
  })
  .input(type({ conversation_id: type('string'), metadata: MetadataSchema }))
  .output(ConversationResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteConversationsConversationId = os
  .route({
    method: 'DELETE',
    path: '/conversations/{conversation_id}',
    tags: ['Conversations'],
    summary: 'Delete a conversation',
    description: 'Delete a conversation. Items in the conversation will not be deleted.',
    successDescription: 'Success',
  })
  .input(type({ conversation_id: type('string') }))
  .output(DeletedConversationResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
