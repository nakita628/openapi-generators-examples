import { Elysia } from 'elysia'
import {
  AgeTileSchema,
  AppTypeTileSchema,
  AreaTileSchema,
  ErrorDetailSchema,
  ErrorResponseSchema,
  GenderTileSchema,
  GetFriendsDemographicsResponseSchema,
  GetMessageEventResponseSchema,
  GetMessageEventResponseClickSchema,
  GetMessageEventResponseMessageSchema,
  GetMessageEventResponseOverviewSchema,
  GetNumberOfFollowersResponseSchema,
  GetNumberOfMessageDeliveriesResponseSchema,
  GetRichMenuInsightDailyResponseSchema,
  GetRichMenuInsightDailyResponseBoundsSchema,
  GetRichMenuInsightDailyResponseClickSchema,
  GetRichMenuInsightDailyResponseDailyMetricsSchema,
  GetRichMenuInsightDailyResponseImpressionSchema,
  GetRichMenuInsightSummaryResponseSchema,
  GetRichMenuInsightSummaryResponseBoundsSchema,
  GetRichMenuInsightSummaryResponseClickSchema,
  GetRichMenuInsightSummaryResponseImpressionSchema,
  GetRichMenuInsightSummaryResponseMetricsSchema,
  GetStatisticsPerUnitResponseSchema,
  GetStatisticsPerUnitResponseClickSchema,
  GetStatisticsPerUnitResponseMessageSchema,
  GetStatisticsPerUnitResponseOverviewSchema,
  SubscriptionPeriodTileSchema,
} from '../../components/schemas'
import { V2Model } from './model'

export const v2 = new Elysia()
  .model({
    AgeTile: AgeTileSchema,
    AppTypeTile: AppTypeTileSchema,
    AreaTile: AreaTileSchema,
    ErrorDetail: ErrorDetailSchema,
    ErrorResponse: ErrorResponseSchema,
    GenderTile: GenderTileSchema,
    GetFriendsDemographicsResponse: GetFriendsDemographicsResponseSchema,
    GetMessageEventResponse: GetMessageEventResponseSchema,
    GetMessageEventResponseClick: GetMessageEventResponseClickSchema,
    GetMessageEventResponseMessage: GetMessageEventResponseMessageSchema,
    GetMessageEventResponseOverview: GetMessageEventResponseOverviewSchema,
    GetNumberOfFollowersResponse: GetNumberOfFollowersResponseSchema,
    GetNumberOfMessageDeliveriesResponse: GetNumberOfMessageDeliveriesResponseSchema,
    GetRichMenuInsightDailyResponse: GetRichMenuInsightDailyResponseSchema,
    GetRichMenuInsightDailyResponseBounds: GetRichMenuInsightDailyResponseBoundsSchema,
    GetRichMenuInsightDailyResponseClick: GetRichMenuInsightDailyResponseClickSchema,
    GetRichMenuInsightDailyResponseDailyMetrics: GetRichMenuInsightDailyResponseDailyMetricsSchema,
    GetRichMenuInsightDailyResponseImpression: GetRichMenuInsightDailyResponseImpressionSchema,
    GetRichMenuInsightSummaryResponse: GetRichMenuInsightSummaryResponseSchema,
    GetRichMenuInsightSummaryResponseBounds: GetRichMenuInsightSummaryResponseBoundsSchema,
    GetRichMenuInsightSummaryResponseClick: GetRichMenuInsightSummaryResponseClickSchema,
    GetRichMenuInsightSummaryResponseImpression: GetRichMenuInsightSummaryResponseImpressionSchema,
    GetRichMenuInsightSummaryResponseMetrics: GetRichMenuInsightSummaryResponseMetricsSchema,
    GetStatisticsPerUnitResponse: GetStatisticsPerUnitResponseSchema,
    GetStatisticsPerUnitResponseClick: GetStatisticsPerUnitResponseClickSchema,
    GetStatisticsPerUnitResponseMessage: GetStatisticsPerUnitResponseMessageSchema,
    GetStatisticsPerUnitResponseOverview: GetStatisticsPerUnitResponseOverviewSchema,
    SubscriptionPeriodTile: SubscriptionPeriodTileSchema,
  })
  .get('/v2/bot/insight/demographic', () => { throw new Error('Not implemented') }, {
    response: { 200: 'GetFriendsDemographicsResponse' },
    detail: {
      tags: ['insight'],
      description:
        "Retrieves the demographic attributes for a LINE Official Account's\nfriends.You can only retrieve information about friends for LINE Official\nAccounts created by users in Japan (JP), Thailand (TH), Taiwan (TW) and Indonesia\n(ID).\n",
      operationId: 'getFriendsDemographics',
    },
  })
  .get('/v2/bot/insight/message/delivery', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getNumberOfMessageDeliveriesQuery,
    response: { 200: 'GetNumberOfMessageDeliveriesResponse' },
    detail: {
      tags: ['insight'],
      summary: 'Get number of message deliveries',
      description:
        'Returns the number of messages sent from LINE Official Account\non a specified day.\n',
      operationId: 'getNumberOfMessageDeliveries',
    },
  })
  .get('/v2/bot/insight/followers', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getNumberOfFollowersQuery,
    response: { 200: 'GetNumberOfFollowersResponse' },
    detail: {
      tags: ['insight'],
      summary: 'Get number of followers',
      description:
        'Returns the number of users who have added the LINE Official Account\non or before a specified date.\n',
      operationId: 'getNumberOfFollowers',
    },
  })
  .get('/v2/bot/insight/message/event', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getMessageEventQuery,
    response: { 200: 'GetMessageEventResponse' },
    detail: {
      tags: ['insight'],
      summary: 'Get user interaction statistics',
      description:
        'Returns statistics about how users interact with narrowcast messages\nor broadcast messages sent from your LINE Official Account.\n',
      operationId: 'getMessageEvent',
    },
  })
  .get('/v2/bot/insight/message/event/aggregation', ({ query }) => { throw new Error('Not implemented') }, {
    query: V2Model.getStatisticsPerUnitQuery,
    response: { 200: 'GetStatisticsPerUnitResponse' },
    detail: {
      tags: ['insight'],
      description:
        'You can check the per-unit statistics of how users interact with\npush messages and multicast messages sent from your LINE Official Account.\n',
      operationId: 'getStatisticsPerUnit',
    },
  })
  .get('/v2/bot/insight/richmenu/:richMenuId/summary', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: V2Model.getRichMenuInsightSummaryParams,
    query: V2Model.getRichMenuInsightSummaryQuery,
    response: {
      200: 'GetRichMenuInsightSummaryResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['insight'],
      summary: 'Get rich menu insight summary',
      description:
        'Gets a summary of rich menu statistics for the specified period, for a rich\nmenu created via the Messaging API. Returns the total impression count for\nthe whole rich menu and the click count for each tappable area, aggregated\nover the entire period as a single result.\nWhen the total number of unique clicks during the period is below the\nprivacy threshold, only `richMenuId` is returned and the other fields are\nomitted.\n',
      operationId: 'getRichMenuInsightSummary',
    },
  })
  .get('/v2/bot/insight/richmenu/:richMenuId/daily', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: V2Model.getRichMenuInsightDailyParams,
    query: V2Model.getRichMenuInsightDailyQuery,
    response: {
      200: 'GetRichMenuInsightDailyResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
    },
    detail: {
      tags: ['insight'],
      summary: 'Get rich menu insight daily',
      description:
        'Gets rich menu statistics broken down by day for the specified period, for a\nrich menu created via the Messaging API. Returns the daily impression count\nfor the whole rich menu and the daily click count for each tappable area.\nWhen the total number of unique clicks during the period is below the\nprivacy threshold, only `richMenuId` is returned and the other fields are\nomitted.\n',
      operationId: 'getRichMenuInsightDaily',
    },
  })
