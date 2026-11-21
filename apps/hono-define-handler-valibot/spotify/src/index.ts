import { Hono } from 'hono'
import {
  albumsHandler,
  artistsHandler,
  audioAnalysisHandler,
  audioFeaturesHandler,
  audiobooksHandler,
  browseHandler,
  chaptersHandler,
  episodesHandler,
  marketsHandler,
  meHandler,
  playlistsHandler,
  recommendationsHandler,
  searchHandler,
  showsHandler,
  tracksHandler,
  usersHandler,
} from './handlers'

const app = new Hono()

export const api = app
  .route('/', albumsHandler)
  .route('/', artistsHandler)
  .route('/', audioAnalysisHandler)
  .route('/', audioFeaturesHandler)
  .route('/', audiobooksHandler)
  .route('/', browseHandler)
  .route('/', chaptersHandler)
  .route('/', episodesHandler)
  .route('/', marketsHandler)
  .route('/', meHandler)
  .route('/', playlistsHandler)
  .route('/', recommendationsHandler)
  .route('/', searchHandler)
  .route('/', showsHandler)
  .route('/', tracksHandler)
  .route('/', usersHandler)

export default app
