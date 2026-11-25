import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { BetaCreateResponseSchema, BetaResponseSchema } from '../components'

const t = initTRPC.create()

export const responsesBetaTrueRouter = t.router({
  postResponsesBetaTrue: t.procedure
    .input(Schema.toStandardSchemaV1(BetaCreateResponseSchema))
    .output(Schema.toStandardSchemaV1(BetaResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
