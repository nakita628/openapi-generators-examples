import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getRecommendations = os.getRecommendations.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getRecommendationsAvailableGenreSeeds =
  os.getRecommendationsAvailableGenreSeeds.handler(async ({ input }) => { throw new Error('Not implemented') })
