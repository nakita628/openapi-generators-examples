import { os } from '@orpc/server'
import * as z from 'zod'
import { VoiceRegionResponseSchema } from '../components'

export const getVoiceRegions = os
  .route({
    method: 'GET',
    path: '/voice/regions',
    successDescription: '200 response for list_voice_regions',
  })
  .output(z.array(VoiceRegionResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })
