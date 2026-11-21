import { Hono } from 'hono'
import {
  getUsersMeHandler,
  patchUsersMeHandler,
  getUsersMeApplicationsApplicationIdEntitlementsHandler,
  getUsersMeApplicationsApplicationIdRoleConnectionHandler,
  putUsersMeApplicationsApplicationIdRoleConnectionHandler,
  deleteUsersMeApplicationsApplicationIdRoleConnectionHandler,
  postUsersMeChannelsHandler,
  getUsersMeConnectionsHandler,
  getUsersMeGuildsHandler,
  deleteUsersMeGuildsGuildIdHandler,
  getUsersMeGuildsGuildIdMemberHandler,
  getUsersUserIdHandler,
} from '../routes'

export const usersHandler = new Hono()
  .get(
    '/users/@me',
    getUsersMeHandler(async (c) => {}),
  )
  .patch(
    '/users/@me',
    patchUsersMeHandler(async (c, { json }) => {}),
  )
  .get(
    '/users/@me/applications/:application_id/entitlements',
    getUsersMeApplicationsApplicationIdEntitlementsHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/users/@me/applications/:application_id/role-connection',
    getUsersMeApplicationsApplicationIdRoleConnectionHandler(async (c, { param }) => {}),
  )
  .put(
    '/users/@me/applications/:application_id/role-connection',
    putUsersMeApplicationsApplicationIdRoleConnectionHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/users/@me/applications/:application_id/role-connection',
    deleteUsersMeApplicationsApplicationIdRoleConnectionHandler(async (c, { param }) => {}),
  )
  .post(
    '/users/@me/channels',
    postUsersMeChannelsHandler(async (c, { json }) => {}),
  )
  .get(
    '/users/@me/connections',
    getUsersMeConnectionsHandler(async (c) => {}),
  )
  .get(
    '/users/@me/guilds',
    getUsersMeGuildsHandler(async (c, { query }) => {}),
  )
  .delete(
    '/users/@me/guilds/:guild_id',
    deleteUsersMeGuildsGuildIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/users/@me/guilds/:guild_id/member',
    getUsersMeGuildsGuildIdMemberHandler(async (c, { param }) => {}),
  )
  .get(
    '/users/:user_id',
    getUsersUserIdHandler(async (c, { param }) => {}),
  )
