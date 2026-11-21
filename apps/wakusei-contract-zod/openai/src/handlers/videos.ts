import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getVideos = os.getVideos.handler(async ({ input }) => {})
export const postVideos = os.postVideos.handler(async ({ input }) => {})
export const postVideosCharacters = os.postVideosCharacters.handler(async ({ input }) => {})
export const getVideosCharactersCharacterId = os.getVideosCharactersCharacterId.handler(
  async ({ input }) => {},
)
export const postVideosEdits = os.postVideosEdits.handler(async ({ input }) => {})
export const postVideosExtensions = os.postVideosExtensions.handler(async ({ input }) => {})
export const getVideosVideoId = os.getVideosVideoId.handler(async ({ input }) => {})
export const deleteVideosVideoId = os.deleteVideosVideoId.handler(async ({ input }) => {})
export const getVideosVideoIdContent = os.getVideosVideoIdContent.handler(async ({ input }) => {})
export const postVideosVideoIdRemix = os.postVideosVideoIdRemix.handler(async ({ input }) => {})
