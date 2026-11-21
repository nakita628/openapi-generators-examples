import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getAlbumsId = os.getAlbumsId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAlbums = os.getAlbums.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAlbumsIdTracks = os.getAlbumsIdTracks.handler(async ({ input }) => { throw new Error('Not implemented') })
