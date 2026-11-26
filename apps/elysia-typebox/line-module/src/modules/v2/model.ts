import { t, type UnwrapSchema } from 'elysia'

export const V2Model = {
  acquireChatControlParams: t.Object({ chatId: t.String() }),
  releaseChatControlParams: t.Object({ chatId: t.String() }),
  getModulesQuery: t.Object({
    start: t.Optional(t.String()),
    limit: t.Optional(
      t.Integer({ format: 'int32', minimum: -2147483648, maximum: 100, default: 100 }),
    ),
  }),
} as const

export type V2Model = { [k in keyof typeof V2Model]: UnwrapSchema<(typeof V2Model)[k]> }
