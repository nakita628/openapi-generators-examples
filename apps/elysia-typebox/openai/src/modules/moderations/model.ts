import { t, type UnwrapSchema } from 'elysia'
import {
  CreateCSAMModerationResponseSchema,
  CreateModerationResponseSchema,
} from '../../components/schemas'

export const ModerationsModel = {
  createModerationResponse200: t.Union([
    CreateModerationResponseSchema,
    CreateCSAMModerationResponseSchema,
  ]),
} as const

export type ModerationsModel = {
  [k in keyof typeof ModerationsModel]: UnwrapSchema<(typeof ModerationsModel)[k]>
}
