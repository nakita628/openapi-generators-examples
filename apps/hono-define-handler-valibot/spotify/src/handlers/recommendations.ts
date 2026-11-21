import { Hono } from 'hono'
import { getRecommendationsHandler, getRecommendationsAvailableGenreSeedsHandler } from '../routes'

export const recommendationsHandler = new Hono()
  .get(
    '/recommendations',
    getRecommendationsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/recommendations/available-genre-seeds',
    getRecommendationsAvailableGenreSeedsHandler(async (c) => { throw new Error('Not implemented') }),
  )
