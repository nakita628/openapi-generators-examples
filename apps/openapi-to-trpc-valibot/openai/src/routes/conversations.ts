import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const conversationsRouter = t.router({
  getConversationsConversationIdItems: t.procedure
    .input(
      v.object({
        conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        order: v.optional(v.picklist(['asc', 'desc'])),
        after: v.optional(v.string()),
        include: v.optional(v.array(IncludeEnumSchema)),
      }),
    )
    .output(ConversationItemListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postConversationsConversationIdItems: t.procedure
    .input(
      v.object({
        conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
        include: v.optional(v.array(IncludeEnumSchema)),
        items: v.pipe(
          v.pipe(v.array(InputItemSchema), v.maxLength(20)),
          v.description(
            'The items to add to the conversation. You may add up to 20 items at a time.\n',
          ),
        ),
      }),
    )
    .output(ConversationItemListSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getConversationsConversationIdItemsItemId: t.procedure
    .input(
      v.object({
        conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
        item_id: v.pipe(v.string(), v.metadata({ examples: ['msg_abc'] })),
        include: v.optional(v.array(IncludeEnumSchema)),
      }),
    )
    .output(ConversationItemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteConversationsConversationIdItemsItemId: t.procedure
    .input(
      v.object({
        conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
        item_id: v.pipe(v.string(), v.metadata({ examples: ['msg_abc'] })),
      }),
    )
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
    .input(
      v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }),
    )
    .output(ConversationResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postConversationsConversationId: t.procedure
    .input(
      v.object({
        conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
        metadata: v.pipe(
          MetadataSchema,
          v.description(
            'Set of 16 key-value pairs that can be attached to an object. This can be         useful for storing additional information about the object in a structured         format, and querying for objects via API or the dashboard.\n        Keys are strings with a maximum length of 64 characters. Values are strings         with a maximum length of 512 characters.',
          ),
        ),
      }),
    )
    .output(ConversationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteConversationsConversationId: t.procedure
    .input(
      v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }),
    )
    .output(DeletedConversationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
