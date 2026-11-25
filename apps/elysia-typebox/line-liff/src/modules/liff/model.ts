import { t, type UnwrapSchema } from 'elysia'

export const LiffModel = {
  updateLIFFAppParams: t.Object({ liffId: t.String() }),
  deleteLIFFAppParams: t.Object({ liffId: t.String() }),
} as const

export type LiffModel = { [k in keyof typeof LiffModel]: UnwrapSchema<(typeof LiffModel)[k]> }
