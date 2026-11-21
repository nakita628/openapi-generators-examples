import { initTRPC, TRPCError } from '@trpc/server'
import { DecisionRequestSchema, DecisionResponseSchema } from '../components'

const t = initTRPC.create()

export const decisionsRouter = t.router({
  postDecisions: t.procedure
    .input(DecisionRequestSchema)
    .output(DecisionResponseSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
