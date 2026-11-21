import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import { VoiceRegionResponseSchema } from '../components'

const t = initTRPC.create()

export const voiceRouter = t.router({
  getVoiceRegions: t.procedure.output(z.array(VoiceRegionResponseSchema).nullable()).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
})
