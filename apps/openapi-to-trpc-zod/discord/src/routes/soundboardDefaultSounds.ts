import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import { SoundboardSoundResponseSchema } from '../components'

const t = initTRPC.create()

export const soundboardDefaultSoundsRouter = t.router({
  getSoundboardDefaultSounds: t.procedure
    .output(z.array(SoundboardSoundResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
