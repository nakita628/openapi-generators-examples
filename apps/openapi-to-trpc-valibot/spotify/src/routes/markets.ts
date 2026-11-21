import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'

const t = initTRPC.create()

export const marketsRouter = t.router({
  getMarkets: t.procedure
    .output(
      v.partial(
        v.object({
          markets: v.pipe(v.array(v.string()), v.metadata({ examples: [['CA', 'BR', 'IT']] })),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
