import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getVideos = os.getVideos.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postVideos = os.postVideos.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postVideosCharacters = os.postVideosCharacters.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getVideosCharactersCharacterId = os.getVideosCharactersCharacterId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postVideosEdits = os.postVideosEdits.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postVideosExtensions = os.postVideosExtensions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getVideosVideoId = os.getVideosVideoId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteVideosVideoId = os.deleteVideosVideoId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getVideosVideoIdContent = os.getVideosVideoIdContent.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postVideosVideoIdRemix = os.postVideosVideoIdRemix.handler(async ({ input }) => { throw new Error('Not implemented') })
