import { t, type UnwrapSchema } from 'elysia'
import { IncludeEnumSchema, InputItemSchema } from '../../components/schemas'

export const ConversationsModel = {
  listConversationItemsParams: t.Object({ conversation_id: t.String({ example: 'conv_123' }) }),
  listConversationItemsQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: undefined })),
    after: t.Optional(t.String()),
    include: t.Optional(t.Array(IncludeEnumSchema)),
  }),
  createConversationItemsParams: t.Object({ conversation_id: t.String({ example: 'conv_123' }) }),
  createConversationItemsQuery: t.Object({ include: t.Optional(t.Array(IncludeEnumSchema)) }),
  createConversationItemsBody: t.Object({
    items: t.Array(InputItemSchema, {
      maxItems: 20,
      description: 'The items to add to the conversation. You may add up to 20 items at a time.\n',
    }),
  }),
  getConversationItemParams: t.Object({
    conversation_id: t.String({ example: 'conv_123' }),
    item_id: t.String({ example: 'msg_abc' }),
  }),
  getConversationItemQuery: t.Object({ include: t.Optional(t.Array(IncludeEnumSchema)) }),
  deleteConversationItemParams: t.Object({
    conversation_id: t.String({ example: 'conv_123' }),
    item_id: t.String({ example: 'msg_abc' }),
  }),
  getConversationParams: t.Object({ conversation_id: t.String({ example: 'conv_123' }) }),
  updateConversationParams: t.Object({ conversation_id: t.String({ example: 'conv_123' }) }),
  deleteConversationParams: t.Object({ conversation_id: t.String({ example: 'conv_123' }) }),
} as const

export type ConversationsModel = {
  [k in keyof typeof ConversationsModel]: UnwrapSchema<(typeof ConversationsModel)[k]>
}
