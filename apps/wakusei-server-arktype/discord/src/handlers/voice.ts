import { os } from '@orpc/server'
import { type } from 'arktype'
import { VoiceRegionResponseSchema } from '../components'

export const getVoiceRegions = os
  .route({
    method: 'GET',
    path: '/voice/regions',
    successDescription: '200 response for list_voice_regions',
  })
  .output(type(type(VoiceRegionResponseSchema).array()).or('null'))
  .handler(async ({ input }) => {})
