import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getArtistsId = os.getArtistsId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getArtists = os.getArtists.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getArtistsIdAlbums = os.getArtistsIdAlbums.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getArtistsIdTopTracks = os.getArtistsIdTopTracks.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getArtistsIdRelatedArtists = os.getArtistsIdRelatedArtists.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
