import { Hono } from 'hono'
import { getAudioFeaturesHandler, getAudioFeaturesIdHandler } from '../routes'

export const audioFeaturesHandler = new Hono()
  .get(
    '/audio-features',
    getAudioFeaturesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/audio-features/:id',
    getAudioFeaturesIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
