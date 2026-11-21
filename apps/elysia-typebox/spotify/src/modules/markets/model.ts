import { t, type UnwrapSchema } from 'elysia'
import { ErrorObjectSchema } from '../../components/schemas'

export const MarketsModel = {
  getAvailableMarketsResponse200: t.Object({
    markets: t.Optional(t.Array(t.String(), { example: ['CA', 'BR', 'IT'] })),
  }),
  getAvailableMarketsResponse401: t.Object({ error: ErrorObjectSchema }),
  getAvailableMarketsResponse403: t.Object({ error: ErrorObjectSchema }),
  getAvailableMarketsResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type MarketsModel = {
  [k in keyof typeof MarketsModel]: UnwrapSchema<(typeof MarketsModel)[k]>
}
