import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        'model?': 'string',
        'metadata?': MetadataSchema,
        'after?': 'string',
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
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
    .input(type({ completion_id: 'string' }))
    .output(CreateChatCompletionResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChatCompletionsCompletionId: t.procedure
    .input(type({ completion_id: 'string', metadata: MetadataSchema }))
    .output(CreateChatCompletionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChatCompletionsCompletionId: t.procedure
    .input(type({ completion_id: 'string' }))
    .output(ChatCompletionDeletedSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatCompletionsCompletionIdMessages: t.procedure
    .input(
      type({
        completion_id: 'string',
        'after?': 'string',
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
      }),
    )
    .output(ChatCompletionMessageListSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
