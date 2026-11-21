import { Hono } from 'hono'
import {
  putLobbiesHandler,
  postLobbiesHandler,
  getLobbiesLobbyIdHandler,
  deleteLobbiesLobbyIdHandler,
  patchLobbiesLobbyIdHandler,
  patchLobbiesLobbyIdChannelLinkingHandler,
  deleteLobbiesLobbyIdMembersMeHandler,
  postLobbiesLobbyIdMembersMeInvitesHandler,
  postLobbiesLobbyIdMembersBulkHandler,
  putLobbiesLobbyIdMembersUserIdHandler,
  deleteLobbiesLobbyIdMembersUserIdHandler,
  postLobbiesLobbyIdMembersUserIdInvitesHandler,
  getLobbiesLobbyIdMessagesHandler,
  postLobbiesLobbyIdMessagesHandler,
  putLobbiesLobbyIdMessagesMessageIdModerationMetadataHandler,
} from '../routes'

export const lobbiesHandler = new Hono()
  .put(
    '/lobbies',
    putLobbiesHandler(async (c, { json }) => {}),
  )
  .post(
    '/lobbies',
    postLobbiesHandler(async (c, { json }) => {}),
  )
  .get(
    '/lobbies/:lobby_id',
    getLobbiesLobbyIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/lobbies/:lobby_id',
    deleteLobbiesLobbyIdHandler(async (c, { param }) => {}),
  )
  .patch(
    '/lobbies/:lobby_id',
    patchLobbiesLobbyIdHandler(async (c, { param, json }) => {}),
  )
  .patch(
    '/lobbies/:lobby_id/channel-linking',
    patchLobbiesLobbyIdChannelLinkingHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/lobbies/:lobby_id/members/@me',
    deleteLobbiesLobbyIdMembersMeHandler(async (c, { param }) => {}),
  )
  .post(
    '/lobbies/:lobby_id/members/@me/invites',
    postLobbiesLobbyIdMembersMeInvitesHandler(async (c, { param }) => {}),
  )
  .post(
    '/lobbies/:lobby_id/members/bulk',
    postLobbiesLobbyIdMembersBulkHandler(async (c, { param, json }) => {}),
  )
  .put(
    '/lobbies/:lobby_id/members/:user_id',
    putLobbiesLobbyIdMembersUserIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/lobbies/:lobby_id/members/:user_id',
    deleteLobbiesLobbyIdMembersUserIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/lobbies/:lobby_id/members/:user_id/invites',
    postLobbiesLobbyIdMembersUserIdInvitesHandler(async (c, { param }) => {}),
  )
  .get(
    '/lobbies/:lobby_id/messages',
    getLobbiesLobbyIdMessagesHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/lobbies/:lobby_id/messages',
    postLobbiesLobbyIdMessagesHandler(async (c, { param, form, json }) => {}),
  )
  .put(
    '/lobbies/:lobby_id/messages/:message_id/moderation-metadata',
    putLobbiesLobbyIdMessagesMessageIdModerationMetadataHandler(
      async (c, { param, form, json }) => {},
    ),
  )
