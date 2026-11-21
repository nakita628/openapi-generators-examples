import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getAudioFeatures = os.getAudioFeatures.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAudioFeaturesId = os.getAudioFeaturesId.handler(async ({ input }) => { throw new Error('Not implemented') })
