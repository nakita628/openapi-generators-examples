import { oc } from '@orpc/contract'
import { type } from 'arktype'
import {
  GetFriendsDemographicsResponseSchema,
  GetMessageEventResponseSchema,
  GetNumberOfFollowersResponseSchema,
  GetNumberOfMessageDeliveriesResponseSchema,
  GetRichMenuInsightDailyResponseSchema,
  GetRichMenuInsightSummaryResponseSchema,
  GetStatisticsPerUnitResponseSchema,
} from './components'

export const contract = {
  getV2BotInsightDemographic: oc
    .route({
      method: 'GET',
      path: '/v2/bot/insight/demographic',
      tags: ['insight'],
      description:
        "Retrieves the demographic attributes for a LINE Official Account's\nfriends.You can only retrieve information about friends for LINE Official\nAccounts created by users in Japan (JP), Thailand (TH), Taiwan (TW) and Indonesia\n(ID).\n",
    })
    .output(GetFriendsDemographicsResponseSchema),
  getV2BotInsightMessageDelivery: oc
    .route({
      method: 'GET',
      path: '/v2/bot/insight/message/delivery',
      tags: ['insight'],
      summary: 'Get number of message deliveries',
      description:
        'Returns the number of messages sent from LINE Official Account\non a specified day.\n',
    })
    .input(
      type({
        date: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    )
    .output(GetNumberOfMessageDeliveriesResponseSchema),
  getV2BotInsightFollowers: oc
    .route({
      method: 'GET',
      path: '/v2/bot/insight/followers',
      tags: ['insight'],
      summary: 'Get number of followers',
      description:
        'Returns the number of users who have added the LINE Official Account\non or before a specified date.\n',
    })
    .input(
      type({
        'date?': type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    )
    .output(GetNumberOfFollowersResponseSchema),
  getV2BotInsightMessageEvent: oc
    .route({
      method: 'GET',
      path: '/v2/bot/insight/message/event',
      tags: ['insight'],
      summary: 'Get user interaction statistics',
      description:
        'Returns statistics about how users interact with narrowcast messages\nor broadcast messages sent from your LINE Official Account.\n',
    })
    .input(
      type({
        requestId: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    )
    .output(GetMessageEventResponseSchema),
  getV2BotInsightMessageEventAggregation: oc
    .route({
      method: 'GET',
      path: '/v2/bot/insight/message/event/aggregation',
      tags: ['insight'],
      description:
        'You can check the per-unit statistics of how users interact with\npush messages and multicast messages sent from your LINE Official Account.\n',
    })
    .input(
      type({
        customAggregationUnit: type('string')
          .and(/^[a-zA-Z0-9_]{1,30}$/)
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 30 || ctx.mustBe('at most 30 characters')),
        from: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
        to: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    )
    .output(GetStatisticsPerUnitResponseSchema),
  getV2BotInsightRichmenuRichMenuIdSummary: oc
    .route({
      method: 'GET',
      path: '/v2/bot/insight/richmenu/{richMenuId}/summary',
      tags: ['insight'],
      summary: 'Get rich menu insight summary',
      description:
        'Gets a summary of rich menu statistics for the specified period, for a rich\nmenu created via the Messaging API. Returns the total impression count for\nthe whole rich menu and the click count for each tappable area, aggregated\nover the entire period as a single result.\nWhen the total number of unique clicks during the period is below the\nprivacy threshold, only `richMenuId` is returned and the other fields are\nomitted.\n',
    })
    .input(
      type({
        richMenuId: type('string'),
        from: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
        to: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    )
    .output(GetRichMenuInsightSummaryResponseSchema),
  getV2BotInsightRichmenuRichMenuIdDaily: oc
    .route({
      method: 'GET',
      path: '/v2/bot/insight/richmenu/{richMenuId}/daily',
      tags: ['insight'],
      summary: 'Get rich menu insight daily',
      description:
        'Gets rich menu statistics broken down by day for the specified period, for a\nrich menu created via the Messaging API. Returns the daily impression count\nfor the whole rich menu and the daily click count for each tappable area.\nWhen the total number of unique clicks during the period is below the\nprivacy threshold, only `richMenuId` is returned and the other fields are\nomitted.\n',
    })
    .input(
      type({
        richMenuId: type('string'),
        from: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
        to: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    )
    .output(GetRichMenuInsightDailyResponseSchema),
}
