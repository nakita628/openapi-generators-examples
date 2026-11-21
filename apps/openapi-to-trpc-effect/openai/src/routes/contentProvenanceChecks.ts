import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { ProvenanceResourceSchema } from '../components'

const t = initTRPC.create()

export const contentProvenanceChecksRouter = t.router({
  postContentProvenanceChecks: t.procedure
    .output(Schema.toStandardSchemaV1(ProvenanceResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
