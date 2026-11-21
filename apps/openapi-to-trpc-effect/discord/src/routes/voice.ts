import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { VoiceRegionResponseSchema } from '../components'

const t = initTRPC.create()

export const voiceRouter = t.router({
  getVoiceRegions: t.procedure
    .output(Schema.toStandardSchemaV1(Schema.NullOr(Schema.Array(VoiceRegionResponseSchema))))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
