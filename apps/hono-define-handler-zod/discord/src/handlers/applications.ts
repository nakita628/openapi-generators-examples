import { Hono } from 'hono'
import {
  getApplicationsMeHandler,
  patchApplicationsMeHandler,
  getApplicationsApplicationIdHandler,
  patchApplicationsApplicationIdHandler,
  getApplicationsApplicationIdActivityInstancesInstanceIdHandler,
  postApplicationsApplicationIdAttachmentHandler,
  getApplicationsApplicationIdCommandsHandler,
  putApplicationsApplicationIdCommandsHandler,
  postApplicationsApplicationIdCommandsHandler,
  getApplicationsApplicationIdCommandsCommandIdHandler,
  deleteApplicationsApplicationIdCommandsCommandIdHandler,
  patchApplicationsApplicationIdCommandsCommandIdHandler,
  getApplicationsApplicationIdEmojisHandler,
  postApplicationsApplicationIdEmojisHandler,
  getApplicationsApplicationIdEmojisEmojiIdHandler,
  deleteApplicationsApplicationIdEmojisEmojiIdHandler,
  patchApplicationsApplicationIdEmojisEmojiIdHandler,
  getApplicationsApplicationIdEntitlementsHandler,
  postApplicationsApplicationIdEntitlementsHandler,
  getApplicationsApplicationIdEntitlementsEntitlementIdHandler,
  deleteApplicationsApplicationIdEntitlementsEntitlementIdHandler,
  postApplicationsApplicationIdEntitlementsEntitlementIdConsumeHandler,
  getApplicationsApplicationIdGuildsGuildIdCommandsHandler,
  putApplicationsApplicationIdGuildsGuildIdCommandsHandler,
  postApplicationsApplicationIdGuildsGuildIdCommandsHandler,
  getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsHandler,
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdHandler,
  deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdHandler,
  patchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdHandler,
  getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsHandler,
  putApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsHandler,
  getApplicationsApplicationIdRoleConnectionsMetadataHandler,
  putApplicationsApplicationIdRoleConnectionsMetadataHandler,
} from '../routes'

export const applicationsHandler = new Hono()
  .get(
    '/applications/@me',
    getApplicationsMeHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/applications/@me',
    patchApplicationsMeHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/applications/:application_id',
    getApplicationsApplicationIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/applications/:application_id',
    patchApplicationsApplicationIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/applications/:application_id/activity-instances/:instance_id',
    getApplicationsApplicationIdActivityInstancesInstanceIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/applications/:application_id/attachment',
    postApplicationsApplicationIdAttachmentHandler(async (c, { param, form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/applications/:application_id/commands',
    getApplicationsApplicationIdCommandsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/applications/:application_id/commands',
    putApplicationsApplicationIdCommandsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/applications/:application_id/commands',
    postApplicationsApplicationIdCommandsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/applications/:application_id/commands/:command_id',
    getApplicationsApplicationIdCommandsCommandIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/applications/:application_id/commands/:command_id',
    deleteApplicationsApplicationIdCommandsCommandIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/applications/:application_id/commands/:command_id',
    patchApplicationsApplicationIdCommandsCommandIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/applications/:application_id/emojis',
    getApplicationsApplicationIdEmojisHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/applications/:application_id/emojis',
    postApplicationsApplicationIdEmojisHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/applications/:application_id/emojis/:emoji_id',
    getApplicationsApplicationIdEmojisEmojiIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/applications/:application_id/emojis/:emoji_id',
    deleteApplicationsApplicationIdEmojisEmojiIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .patch(
    '/applications/:application_id/emojis/:emoji_id',
    patchApplicationsApplicationIdEmojisEmojiIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/applications/:application_id/entitlements',
    getApplicationsApplicationIdEntitlementsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/applications/:application_id/entitlements',
    postApplicationsApplicationIdEntitlementsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/applications/:application_id/entitlements/:entitlement_id',
    getApplicationsApplicationIdEntitlementsEntitlementIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/applications/:application_id/entitlements/:entitlement_id',
    deleteApplicationsApplicationIdEntitlementsEntitlementIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/applications/:application_id/entitlements/:entitlement_id/consume',
    postApplicationsApplicationIdEntitlementsEntitlementIdConsumeHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands',
    getApplicationsApplicationIdGuildsGuildIdCommandsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/applications/:application_id/guilds/:guild_id/commands',
    putApplicationsApplicationIdGuildsGuildIdCommandsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/applications/:application_id/guilds/:guild_id/commands',
    postApplicationsApplicationIdGuildsGuildIdCommandsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/permissions',
    getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    deleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .patch(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    patchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdHandler(
      async (c, { param, json }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsHandler(
      async (c, { param }) => { throw new Error('Not implemented') },
    ),
  )
  .put(
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    putApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsHandler(
      async (c, { param, json }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/applications/:application_id/role-connections/metadata',
    getApplicationsApplicationIdRoleConnectionsMetadataHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/applications/:application_id/role-connections/metadata',
    putApplicationsApplicationIdRoleConnectionsMetadataHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
