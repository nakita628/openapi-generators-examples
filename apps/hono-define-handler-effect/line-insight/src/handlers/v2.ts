import { Hono } from 'hono'
import {
  getV2BotInsightDemographicHandler,
  getV2BotInsightMessageDeliveryHandler,
  getV2BotInsightFollowersHandler,
  getV2BotInsightMessageEventHandler,
  getV2BotInsightMessageEventAggregationHandler,
  getV2BotInsightRichmenuRichMenuIdSummaryHandler,
  getV2BotInsightRichmenuRichMenuIdDailyHandler,
} from '../routes'

export const v2Handler = new Hono()
  .get(
    '/v2/bot/insight/demographic',
    getV2BotInsightDemographicHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/insight/message/delivery',
    getV2BotInsightMessageDeliveryHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/insight/followers',
    getV2BotInsightFollowersHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/insight/message/event',
    getV2BotInsightMessageEventHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/insight/message/event/aggregation',
    getV2BotInsightMessageEventAggregationHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/insight/richmenu/:richMenuId/summary',
    getV2BotInsightRichmenuRichMenuIdSummaryHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/v2/bot/insight/richmenu/:richMenuId/daily',
    getV2BotInsightRichmenuRichMenuIdDailyHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
