import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getEpisodesId = os.getEpisodesId.handler(async ({ input }) => {})
export const getEpisodes = os.getEpisodes.handler(async ({ input }) => {})
