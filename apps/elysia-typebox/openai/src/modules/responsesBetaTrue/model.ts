import { t, type UnwrapSchema } from 'elysia'

export const ResponsesBetaTrueModel = {
  beta_createResponseHeaders: t.Object({
    'openai-beta': t.Optional(t.Array(t.Literal('responses_multi_agent=v1'))),
  }),
} as const

export type ResponsesBetaTrueModel = {
  [k in keyof typeof ResponsesBetaTrueModel]: UnwrapSchema<(typeof ResponsesBetaTrueModel)[k]>
}
