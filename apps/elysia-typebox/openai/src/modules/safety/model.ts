import { t, type UnwrapSchema } from 'elysia'

export const SafetyModel = {
  GetsafetycaseParams: t.Object({
    id: t.String({ maxLength: 128, description: 'Safety case ID' }),
  }),
  GetprojectsafetyalertParams: t.Object({
    id: t.String({ maxLength: 38, description: 'Project safety alert ID' }),
  }),
} as const

export type SafetyModel = { [k in keyof typeof SafetyModel]: UnwrapSchema<(typeof SafetyModel)[k]> }
