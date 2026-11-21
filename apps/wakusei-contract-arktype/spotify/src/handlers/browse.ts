import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getBrowseFeaturedPlaylists = os.getBrowseFeaturedPlaylists.handler(
  async ({ input }) => {},
)
export const getBrowseCategories = os.getBrowseCategories.handler(async ({ input }) => {})
export const getBrowseCategoriesCategoryId = os.getBrowseCategoriesCategoryId.handler(
  async ({ input }) => {},
)
export const getBrowseCategoriesCategoryIdPlaylists =
  os.getBrowseCategoriesCategoryIdPlaylists.handler(async ({ input }) => {})
export const getBrowseNewReleases = os.getBrowseNewReleases.handler(async ({ input }) => {})
