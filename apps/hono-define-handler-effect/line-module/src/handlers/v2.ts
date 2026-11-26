import { Hono } from 'hono'
import {
  postV2BotChannelDetachHandler,
  postV2BotChatChatIdControlAcquireHandler,
  postV2BotChatChatIdControlReleaseHandler,
  getV2BotListHandler,
} from '../routes'

export const v2Handler = new Hono()
  .post(
    '/v2/bot/channel/detach',
    postV2BotChannelDetachHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/chat/:chatId/control/acquire',
    postV2BotChatChatIdControlAcquireHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/v2/bot/chat/:chatId/control/release',
    postV2BotChatChatIdControlReleaseHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/list',
    getV2BotListHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
