import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import {
  ChatCompletionDeletedSchema,
  ChatCompletionListSchema,
  ChatCompletionMessageListSchema,
  CreateChatCompletionRequestSchema,
  CreateChatCompletionResponseSchema,
  MetadataSchema,
} from '../components'

const t = initTRPC.create()

export const chatRouter = t.router({
  getChatCompletions: t.procedure
    .input(
      v.object({
        model: v.optional(v.string()),
        metadata: v.optional(MetadataSchema),
        after: v.optional(v.string()),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    )
    .output(ChatCompletionListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChatCompletions: t.procedure
    .input(CreateChatCompletionRequestSchema)
    .output(CreateChatCompletionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatCompletionsCompletionId: t.procedure
    .input(v.object({ completion_id: v.string() }))
    .output(CreateChatCompletionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChatCompletionsCompletionId: t.procedure
    .input(v.object({ completion_id: v.string(), metadata: MetadataSchema }))
    .output(CreateChatCompletionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChatCompletionsCompletionId: t.procedure
    .input(v.object({ completion_id: v.string() }))
    .output(ChatCompletionDeletedSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatCompletionsCompletionIdMessages: t.procedure
    .input(
      v.object({
        completion_id: v.string(),
        after: v.optional(v.string()),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    )
    .output(ChatCompletionMessageListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
