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
    getUsersMeHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/users/@me',
    patchUsersMeHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/users/@me/applications/:application_id/entitlements',
    getUsersMeApplicationsApplicationIdEntitlementsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/users/@me/applications/:application_id/role-connection',
    getUsersMeApplicationsApplicationIdRoleConnectionHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/users/@me/applications/:application_id/role-connection',
    putUsersMeApplicationsApplicationIdRoleConnectionHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/users/@me/applications/:application_id/role-connection',
    deleteUsersMeApplicationsApplicationIdRoleConnectionHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/users/@me/channels',
    postUsersMeChannelsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/users/@me/connections',
    getUsersMeConnectionsHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/users/@me/guilds',
    getUsersMeGuildsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/users/@me/guilds/:guild_id',
    deleteUsersMeGuildsGuildIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/users/@me/guilds/:guild_id/member',
    getUsersMeGuildsGuildIdMemberHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/users/:user_id',
    getUsersUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
