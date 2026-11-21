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
    getVideosHandler(async (c, { query }) => {}),
  )
  .post(
    '/videos',
    postVideosHandler(async (c, { form, json }) => {}),
  )
  .post(
    '/videos/characters',
    postVideosCharactersHandler(async (c, { form }) => {}),
  )
  .get(
    '/videos/characters/:character_id',
    getVideosCharactersCharacterIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/videos/edits',
    postVideosEditsHandler(async (c, { form, json }) => {}),
  )
  .post(
    '/videos/extensions',
    postVideosExtensionsHandler(async (c, { form, json }) => {}),
  )
  .get(
    '/videos/:video_id',
    getVideosVideoIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/videos/:video_id',
    deleteVideosVideoIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/videos/:video_id/content',
    getVideosVideoIdContentHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/videos/:video_id/remix',
    postVideosVideoIdRemixHandler(async (c, { param, form, json }) => {}),
  )
