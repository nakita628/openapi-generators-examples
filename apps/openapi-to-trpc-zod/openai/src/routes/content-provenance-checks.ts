import { initTRPC, TRPCError } from '@trpc/server'
import { ProvenanceResourceSchema } from '../components'

const t = initTRPC.create()

export const contentProvenanceChecksRouter = t.router({
  postContentProvenanceChecks: t.procedure.output(ProvenanceResourceSchema).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
