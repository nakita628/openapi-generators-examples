import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getPlaylistsPlaylistId = os.getPlaylistsPlaylistId.handler(async ({ input }) => {})
export const putPlaylistsPlaylistId = os.putPlaylistsPlaylistId.handler(async ({ input }) => {})
export const getPlaylistsPlaylistIdTracks = os.getPlaylistsPlaylistIdTracks.handler(
  async ({ input }) => {},
)
export const postPlaylistsPlaylistIdTracks = os.postPlaylistsPlaylistIdTracks.handler(
  async ({ input }) => {},
)
export const putPlaylistsPlaylistIdTracks = os.putPlaylistsPlaylistIdTracks.handler(
  async ({ input }) => {},
)
export const deletePlaylistsPlaylistIdTracks = os.deletePlaylistsPlaylistIdTracks.handler(
  async ({ input }) => {},
)
export const getPlaylistsPlaylistIdItems = os.getPlaylistsPlaylistIdItems.handler(
  async ({ input }) => {},
)
export const postPlaylistsPlaylistIdItems = os.postPlaylistsPlaylistIdItems.handler(
  async ({ input }) => {},
)
export const putPlaylistsPlaylistIdItems = os.putPlaylistsPlaylistIdItems.handler(
  async ({ input }) => {},
)
export const deletePlaylistsPlaylistIdItems = os.deletePlaylistsPlaylistIdItems.handler(
  async ({ input }) => {},
)
export const putPlaylistsPlaylistIdFollowers = os.putPlaylistsPlaylistIdFollowers.handler(
  async ({ input }) => {},
)
export const deletePlaylistsPlaylistIdFollowers = os.deletePlaylistsPlaylistIdFollowers.handler(
  async ({ input }) => {},
)
export const getPlaylistsPlaylistIdImages = os.getPlaylistsPlaylistIdImages.handler(
  async ({ input }) => {},
)
export const putPlaylistsPlaylistIdImages = os.putPlaylistsPlaylistIdImages.handler(
  async ({ input }) => {},
)
export const getPlaylistsPlaylistIdFollowersContains =
  os.getPlaylistsPlaylistIdFollowersContains.handler(async ({ input }) => {})
