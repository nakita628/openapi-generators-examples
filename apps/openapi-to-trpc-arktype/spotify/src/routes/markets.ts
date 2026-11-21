import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'

const t = initTRPC.create()

export const marketsRouter = t.router({
  getMarkets: t.procedure.output(type({ 'markets?': 'string[]' })).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
