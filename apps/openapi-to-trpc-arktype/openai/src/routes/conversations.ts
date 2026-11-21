import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const conversationsRouter = t.router({
  getConversationsConversationIdItems: t.procedure
    .input(
      type({
        conversation_id: 'string',
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'include?': type(IncludeEnumSchema).array(),
      }),
    )
    .output(ConversationItemListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postConversationsConversationIdItems: t.procedure
    .input(
      type({
        conversation_id: 'string',
        'include?': type(IncludeEnumSchema).array(),
        items: type(type(InputItemSchema).array())
          .and(type('unknown[] <= 20'))
          .describe(
            'The items to add to the conversation. You may add up to 20 items at a time.\n',
          ),
      }),
    )
    .output(ConversationItemListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getConversationsConversationIdItemsItemId: t.procedure
    .input(
      type({
        conversation_id: 'string',
        item_id: 'string',
        'include?': type(IncludeEnumSchema).array(),
      }),
    )
    .output(ConversationItemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteConversationsConversationIdItemsItemId: t.procedure
    .input(type({ conversation_id: 'string', item_id: 'string' }))
    .output(ConversationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postConversations: t.procedure
    .input(CreateConversationBodySchema)
    .output(ConversationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getConversationsConversationId: t.procedure
    .input(type({ conversation_id: 'string' }))
    .output(ConversationResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postConversationsConversationId: t.procedure
    .input(
      type({
        conversation_id: 'string',
        metadata: MetadataSchema.describe(
          'Set of 16 key-value pairs that can be attached to an object. This can be         useful for storing additional information about the object in a structured         format, and querying for objects via API or the dashboard.\n        Keys are strings with a maximum length of 64 characters. Values are strings         with a maximum length of 512 characters.',
        ),
      }),
    )
    .output(ConversationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteConversationsConversationId: t.procedure
    .input(type({ conversation_id: 'string' }))
    .output(DeletedConversationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
