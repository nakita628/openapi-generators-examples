import { Hono } from 'hono'
import {
  getVideosHandler,
  postVideosHandler,
  postVideosCharactersHandler,
  getVideosCharactersCharacterIdHandler,
  postVideosEditsHandler,
  postVideosExtensionsHandler,
  getVideosVideoIdHandler,
  deleteVideosVideoIdHandler,
  getVideosVideoIdContentHandler,
  postVideosVideoIdRemixHandler,
} from '../routes'

export const videosHandler = new Hono()
  .get(
    '/videos',
    getVideosHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/videos',
    postVideosHandler(async (c, { form, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/videos/characters',
    postVideosCharactersHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/videos/characters/:character_id',
    getVideosCharactersCharacterIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/videos/edits',
    postVideosEditsHandler(async (c, { form, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/videos/extensions',
    postVideosExtensionsHandler(async (c, { form, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/videos/:video_id',
    getVideosVideoIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/videos/:video_id',
    deleteVideosVideoIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/videos/:video_id/content',
    getVideosVideoIdContentHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/videos/:video_id/remix',
    postVideosVideoIdRemixHandler(async (c, { param, form, json }) => { throw new Error('Not implemented') }),
  )
