import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getRecommendations = os.getRecommendations.handler(async ({ input }) => {})
export const getRecommendationsAvailableGenreSeeds =
  os.getRecommendationsAvailableGenreSeeds.handler(async ({ input }) => {})
