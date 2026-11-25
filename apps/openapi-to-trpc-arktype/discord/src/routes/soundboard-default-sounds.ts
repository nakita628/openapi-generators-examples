import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { SoundboardSoundResponseSchema } from '../components'

const t = initTRPC.create()

export const soundboardDefaultSoundsRouter = t.router({
  getSoundboardDefaultSounds: t.procedure
    .output(type(SoundboardSoundResponseSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
