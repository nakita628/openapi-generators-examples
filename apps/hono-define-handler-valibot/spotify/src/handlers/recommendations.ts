import { Hono } from 'hono'
import { getRecommendationsHandler, getRecommendationsAvailableGenreSeedsHandler } from '../routes'

export const recommendationsHandler = new Hono()
  .get(
    '/recommendations',
    getRecommendationsHandler(async (c, { query }) => {}),
  )
  .get(
    '/recommendations/available-genre-seeds',
    getRecommendationsAvailableGenreSeedsHandler(async (c) => {}),
  )
