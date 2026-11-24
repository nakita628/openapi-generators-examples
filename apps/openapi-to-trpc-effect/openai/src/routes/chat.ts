import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          model: Schema.optionalKey(Schema.String),
          metadata: Schema.optionalKey(MetadataSchema),
          after: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('asc')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ChatCompletionListSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChatCompletions: t.procedure
    .input(Schema.toStandardSchemaV1(CreateChatCompletionRequestSchema))
    .output(Schema.toStandardSchemaV1(CreateChatCompletionResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatCompletionsCompletionId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ completion_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(CreateChatCompletionResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postChatCompletionsCompletionId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ completion_id: Schema.String, metadata: MetadataSchema }),
      ),
    )
    .output(Schema.toStandardSchemaV1(CreateChatCompletionResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteChatCompletionsCompletionId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ completion_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ChatCompletionDeletedSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getChatCompletionsCompletionIdMessages: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          completion_id: Schema.String,
          after: Schema.optionalKey(Schema.String),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('asc')),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ChatCompletionMessageListSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
