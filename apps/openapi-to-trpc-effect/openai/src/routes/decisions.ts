import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { DecisionRequestSchema, DecisionResponseSchema } from '../components'

const t = initTRPC.create()

export const decisionsRouter = t.router({
  postDecisions: t.procedure
    .input(Schema.toStandardSchemaV1(DecisionRequestSchema))
    .output(Schema.toStandardSchemaV1(DecisionResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
