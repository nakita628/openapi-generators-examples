import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        model: z.string().exactOptional(),
        metadata: MetadataSchema.exactOptional(),
        after: z.string().exactOptional(),
        limit: z.int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
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
    .input(z.object({ completion_id: z.string() }))
    .output(CreateChatCompletionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChatCompletionsCompletionId: t.procedure
    .input(z.object({ completion_id: z.string(), metadata: MetadataSchema }))
    .output(CreateChatCompletionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChatCompletionsCompletionId: t.procedure
    .input(z.object({ completion_id: z.string() }))
    .output(ChatCompletionDeletedSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatCompletionsCompletionIdMessages: t.procedure
    .input(
      z.object({
        completion_id: z.string(),
        after: z.string().exactOptional(),
        limit: z.int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    )
    .output(ChatCompletionMessageListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
