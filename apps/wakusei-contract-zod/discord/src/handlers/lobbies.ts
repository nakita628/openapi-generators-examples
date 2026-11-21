import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postLobbies = os.postLobbies.handler(async ({ input }) => {})
export const putLobbies = os.putLobbies.handler(async ({ input }) => {})
export const getLobbiesLobbyId = os.getLobbiesLobbyId.handler(async ({ input }) => {})
export const deleteLobbiesLobbyId = os.deleteLobbiesLobbyId.handler(async ({ input }) => {})
export const patchLobbiesLobbyId = os.patchLobbiesLobbyId.handler(async ({ input }) => {})
export const patchLobbiesLobbyIdChannelLinking = os.patchLobbiesLobbyIdChannelLinking.handler(
  async ({ input }) => {},
)
export const deleteLobbiesLobbyIdMembersMe = os.deleteLobbiesLobbyIdMembersMe.handler(
  async ({ input }) => {},
)
export const postLobbiesLobbyIdMembersMeInvites = os.postLobbiesLobbyIdMembersMeInvites.handler(
  async ({ input }) => {},
)
export const postLobbiesLobbyIdMembersBulk = os.postLobbiesLobbyIdMembersBulk.handler(
  async ({ input }) => {},
)
export const putLobbiesLobbyIdMembersUserId = os.putLobbiesLobbyIdMembersUserId.handler(
  async ({ input }) => {},
)
export const deleteLobbiesLobbyIdMembersUserId = os.deleteLobbiesLobbyIdMembersUserId.handler(
  async ({ input }) => {},
)
export const postLobbiesLobbyIdMembersUserIdInvites =
  os.postLobbiesLobbyIdMembersUserIdInvites.handler(async ({ input }) => {})
export const getLobbiesLobbyIdMessages = os.getLobbiesLobbyIdMessages.handler(
  async ({ input }) => {},
)
export const postLobbiesLobbyIdMessages = os.postLobbiesLobbyIdMessages.handler(
  async ({ input }) => {},
)
export const putLobbiesLobbyIdMessagesMessageIdModerationMetadata =
  os.putLobbiesLobbyIdMessagesMessageIdModerationMetadata.handler(async ({ input }) => {})
