import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getAudioFeatures = os.getAudioFeatures.handler(async ({ input }) => {})
export const getAudioFeaturesId = os.getAudioFeaturesId.handler(async ({ input }) => {})
