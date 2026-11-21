import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getTracksId = os.getTracksId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getTracks = os.getTracks.handler(async ({ input }) => { throw new Error('Not implemented') })
