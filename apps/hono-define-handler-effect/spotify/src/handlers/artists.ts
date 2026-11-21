import { Hono } from 'hono'
import {
  getArtistsIdHandler,
  getArtistsHandler,
  getArtistsIdAlbumsHandler,
  getArtistsIdTopTracksHandler,
  getArtistsIdRelatedArtistsHandler,
} from '../routes'

export const artistsHandler = new Hono()
  .get(
    '/artists/:id',
    getArtistsIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/artists',
    getArtistsHandler(async (c, { query }) => {}),
  )
  .get(
    '/artists/:id/albums',
    getArtistsIdAlbumsHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/artists/:id/top-tracks',
    getArtistsIdTopTracksHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/artists/:id/related-artists',
    getArtistsIdRelatedArtistsHandler(async (c, { param }) => {}),
  )
