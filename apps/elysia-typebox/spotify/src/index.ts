import { Elysia } from 'elysia'
import { albums } from './modules/albums'
import { artists } from './modules/artists'
import { shows } from './modules/shows'
import { episodes } from './modules/episodes'
import { audiobooks } from './modules/audiobooks'
import { me } from './modules/me'
import { chapters } from './modules/chapters'
import { tracks } from './modules/tracks'
import { search } from './modules/search'
import { playlists } from './modules/playlists'
import { users } from './modules/users'
import { browse } from './modules/browse'
import { audioFeatures } from './modules/audioFeatures'
import { audioAnalysis } from './modules/audioAnalysis'
import { recommendations } from './modules/recommendations'
import { markets } from './modules/markets'

export const app = new Elysia()
  .use(albums)
  .use(artists)
  .use(shows)
  .use(episodes)
  .use(audiobooks)
  .use(me)
  .use(chapters)
  .use(tracks)
  .use(search)
  .use(playlists)
  .use(users)
  .use(browse)
  .use(audioFeatures)
  .use(audioAnalysis)
  .use(recommendations)
  .use(markets)

if (import.meta.main) {
  app.listen(3000)
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
}
