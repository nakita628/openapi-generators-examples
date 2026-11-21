import { t, type UnwrapSchema } from 'elysia'
import { MetadataSchema } from '../../components/schemas'

export const ChatModel = {
  listChatCompletionsQuery: t.Object({
    model: t.Optional(t.String()),
    metadata: t.Optional(
      t.Union([
        t.Record(t.String(), t.String(), {
          description:
            'Set of 16 key-value pairs that can be attached to an object. This can be\nuseful for storing additional information about the object in a structured\nformat, and querying for objects via API or the dashboard.\n\nKeys are strings with a maximum length of 64 characters. Values are strings\nwith a maximum length of 512 characters.\n',
        }),
        t.Null(),
      ]),
    ),
    after: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'asc' })),
  }),
  getChatCompletionParams: t.Object({ completion_id: t.String() }),
  updateChatCompletionParams: t.Object({ completion_id: t.String() }),
  updateChatCompletionBody: t.Object({ metadata: MetadataSchema }),
  deleteChatCompletionParams: t.Object({ completion_id: t.String() }),
  getChatCompletionMessagesParams: t.Object({ completion_id: t.String() }),
  getChatCompletionMessagesQuery: t.Object({
    after: t.Optional(t.String()),
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'asc' })),
  }),
} as const

export type ChatModel = { [k in keyof typeof ChatModel]: UnwrapSchema<(typeof ChatModel)[k]> }
