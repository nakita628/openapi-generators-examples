import { Hono } from 'hono'
import { getVoiceRegionsHandler } from '../routes'

export const voiceHandler = new Hono().get(
  '/voice/regions',
  getVoiceRegionsHandler(async (c) => { throw new Error('Not implemented') }),
)
