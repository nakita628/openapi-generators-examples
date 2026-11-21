import { os } from '@orpc/server'
import * as v from 'valibot'
import { VoiceRegionResponseSchema } from '../components'

export const getVoiceRegions = os
  .route({
    method: 'GET',
    path: '/voice/regions',
    successDescription: '200 response for list_voice_regions',
  })
  .output(v.nullable(v.array(VoiceRegionResponseSchema)))
  .handler(async ({ input }) => {})
