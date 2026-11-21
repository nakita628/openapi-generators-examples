import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getBrowseFeaturedPlaylists = os.getBrowseFeaturedPlaylists.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getBrowseCategories = os.getBrowseCategories.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getBrowseCategoriesCategoryId = os.getBrowseCategoriesCategoryId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getBrowseCategoriesCategoryIdPlaylists =
  os.getBrowseCategoriesCategoryIdPlaylists.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getBrowseNewReleases = os.getBrowseNewReleases.handler(async ({ input }) => { throw new Error('Not implemented') })
