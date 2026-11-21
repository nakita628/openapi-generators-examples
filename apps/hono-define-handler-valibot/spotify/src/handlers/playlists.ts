import { Hono } from 'hono'
import {
  getPlaylistsPlaylistIdHandler,
  putPlaylistsPlaylistIdHandler,
  getPlaylistsPlaylistIdTracksHandler,
  putPlaylistsPlaylistIdTracksHandler,
  postPlaylistsPlaylistIdTracksHandler,
  deletePlaylistsPlaylistIdTracksHandler,
  getPlaylistsPlaylistIdItemsHandler,
  putPlaylistsPlaylistIdItemsHandler,
  postPlaylistsPlaylistIdItemsHandler,
  deletePlaylistsPlaylistIdItemsHandler,
  putPlaylistsPlaylistIdFollowersHandler,
  deletePlaylistsPlaylistIdFollowersHandler,
  getPlaylistsPlaylistIdImagesHandler,
  putPlaylistsPlaylistIdImagesHandler,
  getPlaylistsPlaylistIdFollowersContainsHandler,
} from '../routes'

export const playlistsHandler = new Hono()
  .get(
    '/playlists/:playlist_id',
    getPlaylistsPlaylistIdHandler(async (c, { param, query }) => {}),
  )
  .put(
    '/playlists/:playlist_id',
    putPlaylistsPlaylistIdHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/playlists/:playlist_id/tracks',
    getPlaylistsPlaylistIdTracksHandler(async (c, { param, query }) => {}),
  )
  .put(
    '/playlists/:playlist_id/tracks',
    putPlaylistsPlaylistIdTracksHandler(async (c, { param, query, json }) => {}),
  )
  .post(
    '/playlists/:playlist_id/tracks',
    postPlaylistsPlaylistIdTracksHandler(async (c, { param, query, json }) => {}),
  )
  .delete(
    '/playlists/:playlist_id/tracks',
    deletePlaylistsPlaylistIdTracksHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/playlists/:playlist_id/items',
    getPlaylistsPlaylistIdItemsHandler(async (c, { param, query }) => {}),
  )
  .put(
    '/playlists/:playlist_id/items',
    putPlaylistsPlaylistIdItemsHandler(async (c, { param, query, json }) => {}),
  )
  .post(
    '/playlists/:playlist_id/items',
    postPlaylistsPlaylistIdItemsHandler(async (c, { param, query, json }) => {}),
  )
  .delete(
    '/playlists/:playlist_id/items',
    deletePlaylistsPlaylistIdItemsHandler(async (c, { param, json }) => {}),
  )
  .put(
    '/playlists/:playlist_id/followers',
    putPlaylistsPlaylistIdFollowersHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/playlists/:playlist_id/followers',
    deletePlaylistsPlaylistIdFollowersHandler(async (c, { param }) => {}),
  )
  .get(
    '/playlists/:playlist_id/images',
    getPlaylistsPlaylistIdImagesHandler(async (c, { param }) => {}),
  )
  .put(
    '/playlists/:playlist_id/images',
    putPlaylistsPlaylistIdImagesHandler(async (c, { param }) => {}),
  )
  .get(
    '/playlists/:playlist_id/followers/contains',
    getPlaylistsPlaylistIdFollowersContainsHandler(async (c, { param, query }) => {}),
  )
