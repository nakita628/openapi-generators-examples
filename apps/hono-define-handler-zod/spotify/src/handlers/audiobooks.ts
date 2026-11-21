import { Hono } from 'hono'
import {
  getAudiobooksIdHandler,
  getAudiobooksHandler,
  getAudiobooksIdChaptersHandler,
} from '../routes'

export const audiobooksHandler = new Hono()
  .get(
    '/audiobooks/:id',
    getAudiobooksIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/audiobooks',
    getAudiobooksHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/audiobooks/:id/chapters',
    getAudiobooksIdChaptersHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
