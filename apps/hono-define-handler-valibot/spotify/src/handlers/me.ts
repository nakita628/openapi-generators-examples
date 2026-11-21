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
    getMeAudiobooksHandler(async (c, { query }) => {}),
  )
  .put(
    '/me/audiobooks',
    putMeAudiobooksHandler(async (c, { query }) => {}),
  )
  .delete(
    '/me/audiobooks',
    deleteMeAudiobooksHandler(async (c, { query }) => {}),
  )
  .get(
    '/me/audiobooks/contains',
    getMeAudiobooksContainsHandler(async (c, { query }) => {}),
  )
  .get(
    '/me',
    getMeHandler(async (c) => {}),
  )
  .get(
    '/me/playlists',
    getMePlaylistsHandler(async (c, { query }) => {}),
  )
  .post(
    '/me/playlists',
    postMePlaylistsHandler(async (c, { json }) => {}),
  )
  .put(
    '/me/library',
    putMeLibraryHandler(async (c, { query }) => {}),
  )
  .delete(
    '/me/library',
    deleteMeLibraryHandler(async (c, { query }) => {}),
  )
  .get(
    '/me/library/contains',
    getMeLibraryContainsHandler(async (c, { query }) => {}),
  )
  .get(
    '/me/albums',
    getMeAlbumsHandler(async (c, { query }) => {}),
  )
  .put(
    '/me/albums',
    putMeAlbumsHandler(async (c, { query, json }) => {}),
  )
  .delete(
    '/me/albums',
    deleteMeAlbumsHandler(async (c, { query, json }) => {}),
  )
  .get(
    '/me/albums/contains',
    getMeAlbumsContainsHandler(async (c, { query }) => {}),
  )
  .get(
    '/me/tracks',
    getMeTracksHandler(async (c, { query }) => {}),
  )
  .put(
    '/me/tracks',
    putMeTracksHandler(async (c, { json }) => {}),
  )
  .delete(
    '/me/tracks',
    deleteMeTracksHandler(async (c, { query, json }) => {}),
  )
  .get(
    '/me/tracks/contains',
    getMeTracksContainsHandler(async (c, { query }) => {}),
  )
  .get(
    '/me/episodes',
    getMeEpisodesHandler(async (c, { query }) => {}),
  )
  .put(
    '/me/episodes',
    putMeEpisodesHandler(async (c, { query, json }) => {}),
  )
  .delete(
    '/me/episodes',
    deleteMeEpisodesHandler(async (c, { query, json }) => {}),
  )
  .get(
    '/me/episodes/contains',
    getMeEpisodesContainsHandler(async (c, { query }) => {}),
  )
  .get(
    '/me/shows',
    getMeShowsHandler(async (c, { query }) => {}),
  )
  .put(
    '/me/shows',
    putMeShowsHandler(async (c, { query, json }) => {}),
  )
  .delete(
    '/me/shows',
    deleteMeShowsHandler(async (c, { query, json }) => {}),
  )
  .get(
    '/me/shows/contains',
    getMeShowsContainsHandler(async (c, { query }) => {}),
  )
  .get(
    '/me/following',
    getMeFollowingHandler(async (c, { query }) => {}),
  )
  .put(
    '/me/following',
    putMeFollowingHandler(async (c, { query, json }) => {}),
  )
  .delete(
    '/me/following',
    deleteMeFollowingHandler(async (c, { query, json }) => {}),
  )
  .get(
    '/me/following/contains',
    getMeFollowingContainsHandler(async (c, { query }) => {}),
  )
  .get(
    '/me/player',
    getMePlayerHandler(async (c, { query }) => {}),
  )
  .put(
    '/me/player',
    putMePlayerHandler(async (c, { json }) => {}),
  )
  .get(
    '/me/player/devices',
    getMePlayerDevicesHandler(async (c) => {}),
  )
  .get(
    '/me/player/currently-playing',
    getMePlayerCurrentlyPlayingHandler(async (c, { query }) => {}),
  )
  .put(
    '/me/player/play',
    putMePlayerPlayHandler(async (c, { query, json }) => {}),
  )
  .put(
    '/me/player/pause',
    putMePlayerPauseHandler(async (c, { query }) => {}),
  )
  .post(
    '/me/player/next',
    postMePlayerNextHandler(async (c, { query }) => {}),
  )
  .post(
    '/me/player/previous',
    postMePlayerPreviousHandler(async (c, { query }) => {}),
  )
  .put(
    '/me/player/seek',
    putMePlayerSeekHandler(async (c, { query }) => {}),
  )
  .put(
    '/me/player/repeat',
    putMePlayerRepeatHandler(async (c, { query }) => {}),
  )
  .put(
    '/me/player/volume',
    putMePlayerVolumeHandler(async (c, { query }) => {}),
  )
  .put(
    '/me/player/shuffle',
    putMePlayerShuffleHandler(async (c, { query }) => {}),
  )
  .get(
    '/me/player/recently-played',
    getMePlayerRecentlyPlayedHandler(async (c, { query }) => {}),
  )
  .get(
    '/me/player/queue',
    getMePlayerQueueHandler(async (c) => {}),
  )
  .post(
    '/me/player/queue',
    postMePlayerQueueHandler(async (c, { query }) => {}),
  )
  .get(
    '/me/top/artists',
    getMeTopArtistsHandler(async (c, { query }) => {}),
  )
  .get(
    '/me/top/tracks',
    getMeTopTracksHandler(async (c, { query }) => {}),
  )
