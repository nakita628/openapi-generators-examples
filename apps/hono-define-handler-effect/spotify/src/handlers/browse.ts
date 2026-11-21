import { Hono } from 'hono'
import {
  getBrowseFeaturedPlaylistsHandler,
  getBrowseCategoriesHandler,
  getBrowseCategoriesCategoryIdHandler,
  getBrowseCategoriesCategoryIdPlaylistsHandler,
  getBrowseNewReleasesHandler,
} from '../routes'

export const browseHandler = new Hono()
  .get(
    '/browse/featured-playlists',
    getBrowseFeaturedPlaylistsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/browse/categories',
    getBrowseCategoriesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/browse/categories/:category_id',
    getBrowseCategoriesCategoryIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/browse/categories/:category_id/playlists',
    getBrowseCategoriesCategoryIdPlaylistsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/browse/new-releases',
    getBrowseNewReleasesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
