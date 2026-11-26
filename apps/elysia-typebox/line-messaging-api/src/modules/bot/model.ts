import { t, type UnwrapSchema } from 'elysia'

export const BotModel = {
  pushMessagesByPhoneHeaders: t.Object({
    'x-line-delivery-tag': t.Optional(t.String({ minLength: 16, maxLength: 100 })),
  }),
} as const

export type BotModel = { [k in keyof typeof BotModel]: UnwrapSchema<(typeof BotModel)[k]> }
