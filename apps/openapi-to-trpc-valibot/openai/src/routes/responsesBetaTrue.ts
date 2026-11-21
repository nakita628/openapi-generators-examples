import { initTRPC, TRPCError } from '@trpc/server'
import { BetaCreateResponseSchema, BetaResponseSchema } from '../components'

const t = initTRPC.create()

export const responsesBetaTrueRouter = t.router({
  postResponsesBetaTrue: t.procedure
    .input(BetaCreateResponseSchema)
    .output(BetaResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
