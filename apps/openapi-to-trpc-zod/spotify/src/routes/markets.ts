import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'

const t = initTRPC.create()

export const marketsRouter = t.router({
  getMarkets: t.procedure
    .output(
      z.object({
        markets: z
          .array(z.string())
          .meta({ examples: [['CA', 'BR', 'IT']] })
          .exactOptional(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
