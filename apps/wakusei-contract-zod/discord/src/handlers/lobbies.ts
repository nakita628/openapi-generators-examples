import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postLobbies = os.postLobbies.handler(async ({ input }) => { throw new Error('Not implemented') })
export const putLobbies = os.putLobbies.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getLobbiesLobbyId = os.getLobbiesLobbyId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteLobbiesLobbyId = os.deleteLobbiesLobbyId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const patchLobbiesLobbyId = os.patchLobbiesLobbyId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const patchLobbiesLobbyIdChannelLinking = os.patchLobbiesLobbyIdChannelLinking.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteLobbiesLobbyIdMembersMe = os.deleteLobbiesLobbyIdMembersMe.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postLobbiesLobbyIdMembersMeInvites = os.postLobbiesLobbyIdMembersMeInvites.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postLobbiesLobbyIdMembersBulk = os.postLobbiesLobbyIdMembersBulk.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const putLobbiesLobbyIdMembersUserId = os.putLobbiesLobbyIdMembersUserId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteLobbiesLobbyIdMembersUserId = os.deleteLobbiesLobbyIdMembersUserId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postLobbiesLobbyIdMembersUserIdInvites =
  os.postLobbiesLobbyIdMembersUserIdInvites.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getLobbiesLobbyIdMessages = os.getLobbiesLobbyIdMessages.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postLobbiesLobbyIdMessages = os.postLobbiesLobbyIdMessages.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const putLobbiesLobbyIdMessagesMessageIdModerationMetadata =
  os.putLobbiesLobbyIdMessagesMessageIdModerationMetadata.handler(async ({ input }) => { throw new Error('Not implemented') })
