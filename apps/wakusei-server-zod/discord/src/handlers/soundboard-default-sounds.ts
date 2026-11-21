import { os } from '@orpc/server'
import * as z from 'zod'
import { SoundboardSoundResponseSchema } from '../components'

export const getSoundboardDefaultSounds = os
  .route({
    method: 'GET',
    path: '/soundboard-default-sounds',
    successDescription: '200 response for get_soundboard_default_sounds',
  })
  .output(z.array(SoundboardSoundResponseSchema))
  .handler(async ({ input }) => {})
