import { initTRPC } from '@trpc/server'
import { albumsRouter } from './albums'
import { artistsRouter } from './artists'
import { showsRouter } from './shows'
import { episodesRouter } from './episodes'
import { audiobooksRouter } from './audiobooks'
import { meRouter } from './me'
import { chaptersRouter } from './chapters'
import { tracksRouter } from './tracks'
import { searchRouter } from './search'
import { playlistsRouter } from './playlists'
import { usersRouter } from './users'
import { browseRouter } from './browse'
import { audioFeaturesRouter } from './audioFeatures'
import { audioAnalysisRouter } from './audioAnalysis'
import { recommendationsRouter } from './recommendations'
import { marketsRouter } from './markets'

const t = initTRPC.create()

export const appRouter = t.router({
  albums: albumsRouter,
  artists: artistsRouter,
  shows: showsRouter,
  episodes: episodesRouter,
  audiobooks: audiobooksRouter,
  me: meRouter,
  chapters: chaptersRouter,
  tracks: tracksRouter,
  search: searchRouter,
  playlists: playlistsRouter,
  users: usersRouter,
  browse: browseRouter,
  audioFeatures: audioFeaturesRouter,
  audioAnalysis: audioAnalysisRouter,
  recommendations: recommendationsRouter,
  markets: marketsRouter,
})
