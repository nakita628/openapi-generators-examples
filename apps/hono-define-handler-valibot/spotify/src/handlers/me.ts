import { Hono } from 'hono'
import {
  getMeAudiobooksHandler,
  putMeAudiobooksHandler,
  deleteMeAudiobooksHandler,
  getMeAudiobooksContainsHandler,
  getMeHandler,
  getMePlaylistsHandler,
  postMePlaylistsHandler,
  putMeLibraryHandler,
  deleteMeLibraryHandler,
  getMeLibraryContainsHandler,
  getMeAlbumsHandler,
  putMeAlbumsHandler,
  deleteMeAlbumsHandler,
  getMeAlbumsContainsHandler,
  getMeTracksHandler,
  putMeTracksHandler,
  deleteMeTracksHandler,
  getMeTracksContainsHandler,
  getMeEpisodesHandler,
  putMeEpisodesHandler,
  deleteMeEpisodesHandler,
  getMeEpisodesContainsHandler,
  getMeShowsHandler,
  putMeShowsHandler,
  deleteMeShowsHandler,
  getMeShowsContainsHandler,
  getMeFollowingHandler,
  putMeFollowingHandler,
  deleteMeFollowingHandler,
  getMeFollowingContainsHandler,
  getMePlayerHandler,
  putMePlayerHandler,
  getMePlayerDevicesHandler,
  getMePlayerCurrentlyPlayingHandler,
  putMePlayerPlayHandler,
  putMePlayerPauseHandler,
  postMePlayerNextHandler,
  postMePlayerPreviousHandler,
  putMePlayerSeekHandler,
  putMePlayerRepeatHandler,
  putMePlayerVolumeHandler,
  putMePlayerShuffleHandler,
  getMePlayerRecentlyPlayedHandler,
  getMePlayerQueueHandler,
  postMePlayerQueueHandler,
  getMeTopArtistsHandler,
  getMeTopTracksHandler,
} from '../routes'

export const meHandler = new Hono()
  .get(
    '/me/audiobooks',
    getMeAudiobooksHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/audiobooks',
    putMeAudiobooksHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/me/audiobooks',
    deleteMeAudiobooksHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/audiobooks/contains',
    getMeAudiobooksContainsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me',
    getMeHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/playlists',
    getMePlaylistsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/me/playlists',
    postMePlaylistsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/library',
    putMeLibraryHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/me/library',
    deleteMeLibraryHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/library/contains',
    getMeLibraryContainsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/albums',
    getMeAlbumsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/albums',
    putMeAlbumsHandler(async (c, { query, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/me/albums',
    deleteMeAlbumsHandler(async (c, { query, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/albums/contains',
    getMeAlbumsContainsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/tracks',
    getMeTracksHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/tracks',
    putMeTracksHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/me/tracks',
    deleteMeTracksHandler(async (c, { query, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/tracks/contains',
    getMeTracksContainsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/episodes',
    getMeEpisodesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/episodes',
    putMeEpisodesHandler(async (c, { query, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/me/episodes',
    deleteMeEpisodesHandler(async (c, { query, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/episodes/contains',
    getMeEpisodesContainsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/shows',
    getMeShowsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/shows',
    putMeShowsHandler(async (c, { query, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/me/shows',
    deleteMeShowsHandler(async (c, { query, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/shows/contains',
    getMeShowsContainsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/following',
    getMeFollowingHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/following',
    putMeFollowingHandler(async (c, { query, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/me/following',
    deleteMeFollowingHandler(async (c, { query, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/following/contains',
    getMeFollowingContainsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/player',
    getMePlayerHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/player',
    putMePlayerHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/player/devices',
    getMePlayerDevicesHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/player/currently-playing',
    getMePlayerCurrentlyPlayingHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/player/play',
    putMePlayerPlayHandler(async (c, { query, json }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/player/pause',
    putMePlayerPauseHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/me/player/next',
    postMePlayerNextHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/me/player/previous',
    postMePlayerPreviousHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/player/seek',
    putMePlayerSeekHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/player/repeat',
    putMePlayerRepeatHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/player/volume',
    putMePlayerVolumeHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/me/player/shuffle',
    putMePlayerShuffleHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/player/recently-played',
    getMePlayerRecentlyPlayedHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/player/queue',
    getMePlayerQueueHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .post(
    '/me/player/queue',
    postMePlayerQueueHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/top/artists',
    getMeTopArtistsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/me/top/tracks',
    getMeTopTracksHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
