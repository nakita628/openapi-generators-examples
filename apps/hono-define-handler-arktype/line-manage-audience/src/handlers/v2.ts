import { Hono } from 'hono'
import {
  putV2BotAudienceGroupUploadHandler,
  postV2BotAudienceGroupUploadHandler,
  putV2BotAudienceGroupUploadByFileHandler,
  postV2BotAudienceGroupUploadByFileHandler,
  postV2BotAudienceGroupClickHandler,
  postV2BotAudienceGroupImpHandler,
  putV2BotAudienceGroupAudienceGroupIdUpdateDescriptionHandler,
  getV2BotAudienceGroupAudienceGroupIdHandler,
  deleteV2BotAudienceGroupAudienceGroupIdHandler,
  getV2BotAudienceGroupListHandler,
  getV2BotAudienceGroupSharedAudienceGroupIdHandler,
  getV2BotAudienceGroupSharedListHandler,
} from '../routes'

export const v2Handler = new Hono()
  .put(
    '/v2/bot/audienceGroup/upload',
    putV2BotAudienceGroupUploadHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/audienceGroup/upload',
    postV2BotAudienceGroupUploadHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/v2/bot/audienceGroup/upload/byFile',
    putV2BotAudienceGroupUploadByFileHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/audienceGroup/upload/byFile',
    postV2BotAudienceGroupUploadByFileHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/audienceGroup/click',
    postV2BotAudienceGroupClickHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/audienceGroup/imp',
    postV2BotAudienceGroupImpHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/v2/bot/audienceGroup/:audienceGroupId/updateDescription',
    putV2BotAudienceGroupAudienceGroupIdUpdateDescriptionHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/audienceGroup/:audienceGroupId',
    getV2BotAudienceGroupAudienceGroupIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/v2/bot/audienceGroup/:audienceGroupId',
    deleteV2BotAudienceGroupAudienceGroupIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/audienceGroup/list',
    getV2BotAudienceGroupListHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/audienceGroup/shared/:audienceGroupId',
    getV2BotAudienceGroupSharedAudienceGroupIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/audienceGroup/shared/list',
    getV2BotAudienceGroupSharedListHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
