import { Hono } from 'hono'
import { getAudioFeaturesHandler, getAudioFeaturesIdHandler } from '../routes'

export const audioFeaturesHandler = new Hono()
  .get(
    '/audio-features',
    getAudioFeaturesHandler(async (c, { query }) => {}),
  )
  .get(
    '/audio-features/:id',
    getAudioFeaturesIdHandler(async (c, { param }) => {}),
  )
