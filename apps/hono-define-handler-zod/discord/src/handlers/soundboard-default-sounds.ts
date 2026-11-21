import { Hono } from 'hono'
import { getSoundboardDefaultSoundsHandler } from '../routes'

export const soundboardDefaultSoundsHandler = new Hono().get(
  '/soundboard-default-sounds',
  getSoundboardDefaultSoundsHandler(async (c) => { throw new Error('Not implemented') }),
)
