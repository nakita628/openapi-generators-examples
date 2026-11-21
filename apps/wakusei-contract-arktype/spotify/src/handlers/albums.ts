import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getAlbumsId = os.getAlbumsId.handler(async ({ input }) => {})
export const getAlbums = os.getAlbums.handler(async ({ input }) => {})
export const getAlbumsIdTracks = os.getAlbumsIdTracks.handler(async ({ input }) => {})
