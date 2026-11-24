import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  GetFriendsDemographicsResponseSchema,
  GetNumberOfMessageDeliveriesResponseSchema,
  GetNumberOfFollowersResponseSchema,
  GetMessageEventResponseSchema,
  GetStatisticsPerUnitResponseSchema,
  GetRichMenuInsightSummaryResponseSchema,
  GetRichMenuInsightDailyResponseSchema,
  ErrorResponseSchema,
} from '../components'

export const v2Handler = new Hono()
  .get(
    '/v2/bot/insight/demographic',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-demographic',
      },
      tags: ['insight'],
      operationId: 'getFriendsDemographics',
      description:
        "Retrieves the demographic attributes for a LINE Official Account's\nfriends.You can only retrieve information about friends for LINE Official\nAccounts created by users in Japan (JP), Thailand (TH), Taiwan (TW) and Indonesia\n(ID).\n",
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: resolver(GetFriendsDemographicsResponseSchema),
              example: {
                available: true,
                genders: [
                  { gender: 'unknown', percentage: 37.6 },
                  { gender: 'male', percentage: 31.8 },
                  { gender: 'female', percentage: 30.6 },
                ],
                ages: [
                  { age: 'unknown', percentage: 37.6 },
                  { age: 'from50', percentage: 17.3 },
                ],
                areas: [
                  { area: 'unknown', percentage: 42.9 },
                  { area: '徳島', percentage: 2.9 },
                ],
                appTypes: [
                  { appType: 'ios', percentage: 62.4 },
                  { appType: 'android', percentage: 27.7 },
                  { appType: 'others', percentage: 9.9 },
                ],
                subscriptionPeriods: [
                  { subscriptionPeriod: 'over365days', percentage: 96.4 },
                  { subscriptionPeriod: 'within365days', percentage: 1.9 },
                  { subscriptionPeriod: 'within180days', percentage: 1.2 },
                  { subscriptionPeriod: 'within90days', percentage: 0.5 },
                  { subscriptionPeriod: 'within30days', percentage: 0.1 },
                  { subscriptionPeriod: 'within7days', percentage: 0 },
                ],
              },
            },
          },
          description: 'OK',
        },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/message/delivery',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-delivery-messages',
      },
      tags: ['insight'],
      operationId: 'getNumberOfMessageDeliveries',
      description:
        'Returns the number of messages sent from LINE Official Account\non a specified day.\n',
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: resolver(GetNumberOfMessageDeliveriesResponseSchema),
              example: { status: 'ready', broadcast: 5385, targeting: 522 },
            },
          },
          description: 'OK',
        },
      },
      summary: 'Get number of message deliveries',
    }),
    validator(
      'query',
      z.object({
        date: z
          .string()
          .regex(/^[0-9]{8}$/)
          .length(8),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/followers',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-number-of-followers',
      },
      tags: ['insight'],
      summary: 'Get number of followers',
      description:
        'Returns the number of users who have added the LINE Official Account\non or before a specified date.\n',
      operationId: 'getNumberOfFollowers',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(GetNumberOfFollowersResponseSchema),
              example: { status: 'ready', followers: 7620, targetedReaches: 5848, blocks: 237 },
            },
          },
        },
      },
    }),
    validator(
      'query',
      z.object({
        date: z
          .string()
          .regex(/^[0-9]{8}$/)
          .length(8)
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/message/event',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-message-event',
      },
      tags: ['insight'],
      description:
        'Returns statistics about how users interact with narrowcast messages\nor broadcast messages sent from your LINE Official Account.\n',
      summary: 'Get user interaction statistics',
      operationId: 'getMessageEvent',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(GetMessageEventResponseSchema),
              example: {
                overview: {
                  requestId: 'f70dd685-499a-4231-a441-f24b8d4fba21',
                  timestamp: 1568214000,
                  delivered: 320,
                  uniqueImpression: 82,
                  uniqueClick: 51,
                  uniqueMediaPlayed: null,
                  uniqueMediaPlayed100Percent: null,
                },
                messages: [
                  {
                    seq: 1,
                    impression: 136,
                    mediaPlayed: null,
                    mediaPlayed25Percent: null,
                    mediaPlayed50Percent: null,
                    mediaPlayed75Percent: null,
                    mediaPlayed100Percent: null,
                    uniqueMediaPlayed: null,
                    uniqueMediaPlayed25Percent: null,
                    uniqueMediaPlayed50Percent: null,
                    uniqueMediaPlayed75Percent: null,
                    uniqueMediaPlayed100Percent: null,
                  },
                ],
                clicks: [
                  {
                    seq: 1,
                    url: 'https://line.me/',
                    click: 41,
                    uniqueClick: 30,
                    uniqueClickOfRequest: 30,
                  },
                  {
                    seq: 1,
                    url: 'https://www.linebiz.com/',
                    click: 59,
                    uniqueClick: 38,
                    uniqueClickOfRequest: 38,
                  },
                ],
              },
            },
          },
        },
      },
    }),
    validator('query', z.object({ requestId: z.string().min(1) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/message/event/aggregation',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-statistics-per-unit',
      },
      tags: ['insight'],
      description:
        'You can check the per-unit statistics of how users interact with\npush messages and multicast messages sent from your LINE Official Account.\n',
      operationId: 'getStatisticsPerUnit',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(GetStatisticsPerUnitResponseSchema),
              example: {
                overview: {
                  uniqueImpression: 40,
                  uniqueClick: 30,
                  uniqueMediaPlayed: 25,
                  uniqueMediaPlayed100Percent: null,
                },
                messages: [
                  {
                    seq: 1,
                    impression: 42,
                    mediaPlayed: 30,
                    mediaPlayed25Percent: null,
                    mediaPlayed50Percent: null,
                    mediaPlayed75Percent: null,
                    mediaPlayed100Percent: null,
                    uniqueMediaPlayed: 25,
                    uniqueMediaPlayed25Percent: null,
                    uniqueMediaPlayed50Percent: null,
                    uniqueMediaPlayed75Percent: null,
                    uniqueMediaPlayed100Percent: null,
                  },
                ],
                clicks: [
                  {
                    seq: 1,
                    url: 'https://developers.line.biz/',
                    click: 35,
                    uniqueClick: 25,
                    uniqueClickOfRequest: null,
                  },
                  {
                    seq: 1,
                    url: 'https://developers.line.biz/',
                    click: 29,
                    uniqueClick: null,
                    uniqueClickOfRequest: null,
                  },
                ],
              },
            },
          },
        },
      },
    }),
    validator(
      'query',
      z.object({
        customAggregationUnit: z
          .string()
          .regex(/^[a-zA-Z0-9_]{1,30}$/)
          .min(1)
          .max(30),
        from: z
          .string()
          .regex(/^[0-9]{8}$/)
          .length(8)
          .meta({ examples: ['20210301'] }),
        to: z
          .string()
          .regex(/^[0-9]{8}$/)
          .length(8)
          .meta({ examples: ['20210301'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/richmenu/:richMenuId/summary',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-insight-summary',
      },
      tags: ['insight'],
      operationId: 'getRichMenuInsightSummary',
      summary: 'Get rich menu insight summary',
      description:
        'Gets a summary of rich menu statistics for the specified period, for a rich\nmenu created via the Messaging API. Returns the total impression count for\nthe whole rich menu and the click count for each tappable area, aggregated\nover the entire period as a single result.\nWhen the total number of unique clicks during the period is below the\nprivacy threshold, only `richMenuId` is returned and the other fields are\nomitted.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(GetRichMenuInsightSummaryResponseSchema),
              examples: {
                default: {
                  summary: 'Statistics are available',
                  value: {
                    richMenuId: 'richmenu-0123456789abcdef0123456789abcdef',
                    metricsFrom: '20260213',
                    metricsTo: '20260215',
                    impression: { metrics: { count: 567, uniqueUsers: 300 } },
                    clicks: [
                      {
                        bounds: { x: 0, y: 0, width: 400, height: 250 },
                        metrics: { count: 123, uniqueUsers: 45 },
                      },
                      {
                        bounds: { x: 400, y: 0, width: 400, height: 250 },
                        metrics: { count: 45, uniqueUsers: 24 },
                      },
                    ],
                  },
                },
                belowThreshold: {
                  summary:
                    'Returned when the total number of unique clicks is below the privacy threshold',
                  value: { richMenuId: 'richmenu-0123456789abcdef0123456789abcdef' },
                },
              },
            },
          },
        },
        '400': {
          description:
            'Bad request. The `from` or `to` parameter is missing or invalid, or the aggregation period exceeds the allowed maximum.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'Not found. The specified rich menu does not exist.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      z.object({
        richMenuId: z.string().meta({ examples: ['richmenu-0123456789abcdef0123456789abcdef'] }),
      }),
    ),
    validator(
      'query',
      z.object({
        from: z
          .string()
          .regex(/^[0-9]{8}$/)
          .length(8)
          .meta({ examples: ['20260213'] }),
        to: z
          .string()
          .regex(/^[0-9]{8}$/)
          .length(8)
          .meta({ examples: ['20260215'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/richmenu/:richMenuId/daily',
    describeRoute({
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-insight-daily',
      },
      tags: ['insight'],
      operationId: 'getRichMenuInsightDaily',
      summary: 'Get rich menu insight daily',
      description:
        'Gets rich menu statistics broken down by day for the specified period, for a\nrich menu created via the Messaging API. Returns the daily impression count\nfor the whole rich menu and the daily click count for each tappable area.\nWhen the total number of unique clicks during the period is below the\nprivacy threshold, only `richMenuId` is returned and the other fields are\nomitted.\n',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(GetRichMenuInsightDailyResponseSchema),
              examples: {
                default: {
                  summary: 'Statistics are available',
                  value: {
                    richMenuId: 'richmenu-0123456789abcdef0123456789abcdef',
                    metricsFrom: '20260213',
                    metricsTo: '20260215',
                    impression: {
                      metrics: [
                        { date: '20260213', count: 300, uniqueUsers: 191 },
                        { date: '20260214', count: 267, uniqueUsers: 222 },
                      ],
                    },
                    clicks: [
                      {
                        bounds: { x: 0, y: 0, width: 400, height: 250 },
                        metrics: [
                          { date: '20260213', count: 45, uniqueUsers: 22 },
                          { date: '20260214', count: 78, uniqueUsers: 35 },
                        ],
                      },
                      {
                        bounds: { x: 400, y: 0, width: 400, height: 250 },
                        metrics: [
                          { date: '20260213', count: 22, uniqueUsers: 21 },
                          { date: '20260214', count: 23, uniqueUsers: 22 },
                        ],
                      },
                    ],
                  },
                },
                belowThreshold: {
                  summary:
                    'Returned when the total number of unique clicks is below the privacy threshold',
                  value: { richMenuId: 'richmenu-0123456789abcdef0123456789abcdef' },
                },
              },
            },
          },
        },
        '400': {
          description:
            'Bad request. The `from` or `to` parameter is missing or invalid, or the aggregation period exceeds the allowed maximum.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'Not found. The specified rich menu does not exist.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      z.object({
        richMenuId: z.string().meta({ examples: ['richmenu-0123456789abcdef0123456789abcdef'] }),
      }),
    ),
    validator(
      'query',
      z.object({
        from: z
          .string()
          .regex(/^[0-9]{8}$/)
          .length(8)
          .meta({ examples: ['20260213'] }),
        to: z
          .string()
          .regex(/^[0-9]{8}$/)
          .length(8)
          .meta({ examples: ['20260215'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
