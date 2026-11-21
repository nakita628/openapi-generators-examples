import { t, type UnwrapSchema } from 'elysia'

export const ModelsModel = {
  retrieveModelParams: t.Object({ model: t.String({ example: 'gpt-6.2-astra' }) }),
  deleteModelParams: t.Object({
    model: t.String({ example: 'ft:gpt-4.1-mini-2025-04-14:acemeco:suffix:abc123' }),
  }),
} as const

export type ModelsModel = { [k in keyof typeof ModelsModel]: UnwrapSchema<(typeof ModelsModel)[k]> }
