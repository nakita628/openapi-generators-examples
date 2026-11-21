import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getShowsId = os.getShowsId.handler(async ({ input }) => {})
export const getShows = os.getShows.handler(async ({ input }) => {})
export const getShowsIdEpisodes = os.getShowsIdEpisodes.handler(async ({ input }) => {})
