import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.optional(Schema.Literals(['asc', 'desc'])),
          after: Schema.optional(Schema.String),
          include: Schema.optional(Schema.Array(IncludeEnumSchema)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ConversationItemListSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postConversationsConversationIdItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
          include: Schema.optional(Schema.Array(IncludeEnumSchema)),
          items: Schema.Array(InputItemSchema)
            .check(Schema.isMaxLength(20))
            .annotate({
              description:
                'The items to add to the conversation. You may add up to 20 items at a time.\n',
            }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ConversationItemListSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getConversationsConversationIdItemsItemId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
          item_id: Schema.String.annotate({ jsonSchemaExamples: ['msg_abc'] }),
          include: Schema.optional(Schema.Array(IncludeEnumSchema)),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ConversationItemSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteConversationsConversationIdItemsItemId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
          item_id: Schema.String.annotate({ jsonSchemaExamples: ['msg_abc'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ConversationResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postConversations: t.procedure
    .input(Schema.toStandardSchemaV1(CreateConversationBodySchema))
    .output(Schema.toStandardSchemaV1(ConversationResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getConversationsConversationId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ConversationResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postConversationsConversationId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
          metadata: MetadataSchema.annotate({
            description:
              'Set of 16 key-value pairs that can be attached to an object. This can be         useful for storing additional information about the object in a structured         format, and querying for objects via API or the dashboard.\n        Keys are strings with a maximum length of 64 characters. Values are strings         with a maximum length of 512 characters.',
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ConversationResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteConversationsConversationId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          conversation_id: Schema.String.annotate({ jsonSchemaExamples: ['conv_123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedConversationResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
