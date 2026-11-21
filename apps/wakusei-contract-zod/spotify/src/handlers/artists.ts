import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getArtistsId = os.getArtistsId.handler(async ({ input }) => {})
export const getArtists = os.getArtists.handler(async ({ input }) => {})
export const getArtistsIdAlbums = os.getArtistsIdAlbums.handler(async ({ input }) => {})
export const getArtistsIdTopTracks = os.getArtistsIdTopTracks.handler(async ({ input }) => {})
export const getArtistsIdRelatedArtists = os.getArtistsIdRelatedArtists.handler(
  async ({ input }) => {},
)
