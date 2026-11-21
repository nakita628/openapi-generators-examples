import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { VoiceRegionResponseSchema } from '../components'

const t = initTRPC.create()

export const voiceRouter = t.router({
  getVoiceRegions: t.procedure.output(v.nullable(v.array(VoiceRegionResponseSchema))).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
