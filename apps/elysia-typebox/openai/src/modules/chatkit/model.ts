import { t, type UnwrapSchema } from 'elysia'

export const ChatkitModel = {
  CancelChatSessionMethodParams: t.Object({ session_id: t.String({ example: 'cksess_123' }) }),
  ListThreadItemsMethodParams: t.Object({ thread_id: t.String({ example: 'cthr_123' }) }),
  ListThreadItemsMethodQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 100 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: undefined })),
    after: t.Optional(
      t.String({
        description:
          'List items created after this thread item ID. Defaults to null for the first page.',
      }),
    ),
    before: t.Optional(
      t.String({
        description:
          'List items created before this thread item ID. Defaults to null for the newest results.',
      }),
    ),
  }),
  GetThreadMethodParams: t.Object({ thread_id: t.String({ example: 'cthr_123' }) }),
  DeleteThreadMethodParams: t.Object({ thread_id: t.String({ example: 'cthr_123' }) }),
  ListThreadsMethodQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 0, maximum: 100 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: undefined })),
    after: t.Optional(
      t.String({
        description:
          'List items created after this thread item ID. Defaults to null for the first page.',
      }),
    ),
    before: t.Optional(
      t.String({
        description:
          'List items created before this thread item ID. Defaults to null for the newest results.',
      }),
    ),
    user: t.Optional(
      t.String({
        minLength: 1,
        maxLength: 512,
        description:
          'Filter threads that belong to this user identifier. Defaults to null to return all users.',
      }),
    ),
  }),
} as const

export type ChatkitModel = {
  [k in keyof typeof ChatkitModel]: UnwrapSchema<(typeof ChatkitModel)[k]>
}
