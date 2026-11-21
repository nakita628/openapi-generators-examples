import { t, type UnwrapSchema } from 'elysia'

export const AssistantsModel = {
  listAssistantsQuery: t.Object({
    limit: t.Optional(t.Integer({ maximum: 9007199254740991, default: 20 })),
    order: t.Optional(t.UnionEnum(['asc', 'desc'], { default: 'desc' })),
    after: t.Optional(t.String()),
    before: t.Optional(t.String()),
  }),
  getAssistantParams: t.Object({ assistant_id: t.String() }),
  modifyAssistantParams: t.Object({ assistant_id: t.String() }),
  deleteAssistantParams: t.Object({ assistant_id: t.String() }),
} as const

export type AssistantsModel = {
  [k in keyof typeof AssistantsModel]: UnwrapSchema<(typeof AssistantsModel)[k]>
}
