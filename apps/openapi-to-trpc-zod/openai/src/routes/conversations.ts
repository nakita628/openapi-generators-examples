import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const conversationsRouter = t.router({
  getConversationsConversationIdItems: t.procedure
    .input(
      z.object({
        conversation_id: z.string().meta({ examples: ['conv_123'] }),
        limit: z.int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
        after: z.string().exactOptional(),
        include: z.array(IncludeEnumSchema).exactOptional(),
      }),
    )
    .output(ConversationItemListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postConversationsConversationIdItems: t.procedure
    .input(
      z.object({
        conversation_id: z.string().meta({ examples: ['conv_123'] }),
        include: z.array(IncludeEnumSchema).exactOptional(),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getConversationsConversationIdItemsItemId: t.procedure
    .input(
      z.object({
        conversation_id: z.string().meta({ examples: ['conv_123'] }),
        item_id: z.string().meta({ examples: ['msg_abc'] }),
        include: z.array(IncludeEnumSchema).exactOptional(),
      }),
    )
    .output(ConversationItemSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteConversationsConversationIdItemsItemId: t.procedure
    .input(
      z.object({
        conversation_id: z.string().meta({ examples: ['conv_123'] }),
        item_id: z.string().meta({ examples: ['msg_abc'] }),
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
    .input(z.object({ conversation_id: z.string().meta({ examples: ['conv_123'] }) }))
    .output(ConversationResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postConversationsConversationId: t.procedure
    .input(
      z.object({
        conversation_id: z.string().meta({ examples: ['conv_123'] }),
        metadata: MetadataSchema.meta({
          description:
            'Set of 16 key-value pairs that can be attached to an object. This can be         useful for storing additional information about the object in a structured         format, and querying for objects via API or the dashboard.\n        Keys are strings with a maximum length of 64 characters. Values are strings         with a maximum length of 512 characters.',
        }),
      }),
    )
    .output(ConversationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteConversationsConversationId: t.procedure
    .input(z.object({ conversation_id: z.string().meta({ examples: ['conv_123'] }) }))
    .output(DeletedConversationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
