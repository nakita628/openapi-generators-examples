import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { SoundboardSoundResponseSchema } from '../components'

const t = initTRPC.create()

export const soundboardDefaultSoundsRouter = t.router({
  getSoundboardDefaultSounds: t.procedure
    .output(v.array(SoundboardSoundResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
