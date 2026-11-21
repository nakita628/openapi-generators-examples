import { Hono } from 'hono'
import { getAudioAnalysisIdHandler } from '../routes'

export const audioAnalysisHandler = new Hono().get(
  '/audio-analysis/:id',
  getAudioAnalysisIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
)
