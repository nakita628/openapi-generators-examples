import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { SoundboardSoundResponseSchema } from '../components'

const t = initTRPC.create()

export const soundboardDefaultSoundsRouter = t.router({
  getSoundboardDefaultSounds: t.procedure
    .output(Schema.toStandardSchemaV1(Schema.Array(SoundboardSoundResponseSchema)))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
