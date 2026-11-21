import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { VoiceRegionResponseSchema } from '../components'

const t = initTRPC.create()

export const voiceRouter = t.router({
  getVoiceRegions: t.procedure
    .output(type(type(VoiceRegionResponseSchema).array()).or('null'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
