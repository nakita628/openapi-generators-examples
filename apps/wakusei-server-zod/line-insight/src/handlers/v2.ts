import { os } from '@orpc/server'
import * as z from 'zod'
import {
  GetFriendsDemographicsResponseSchema,
  GetMessageEventResponseSchema,
  GetNumberOfFollowersResponseSchema,
  GetNumberOfMessageDeliveriesResponseSchema,
  GetRichMenuInsightDailyResponseSchema,
  GetRichMenuInsightSummaryResponseSchema,
  GetStatisticsPerUnitResponseSchema,
} from '../components'

export const getV2BotInsightDemographic = os
  .route({
    method: 'GET',
    path: '/v2/bot/insight/demographic',
    tags: ['insight'],
    description:
      "Retrieves the demographic attributes for a LINE Official Account's\nfriends.You can only retrieve information about friends for LINE Official\nAccounts created by users in Japan (JP), Thailand (TH), Taiwan (TW) and Indonesia\n(ID).\n",
  })
  .output(GetFriendsDemographicsResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotInsightMessageDelivery = os
  .route({
    method: 'GET',
    path: '/v2/bot/insight/message/delivery',
    tags: ['insight'],
    summary: 'Get number of message deliveries',
    description:
      'Returns the number of messages sent from LINE Official Account\non a specified day.\n',
  })
  .input(
    z.object({
      date: z
        .string()
        .regex(/^[0-9]{8}$/)
        .length(8),
    }),
  )
  .output(GetNumberOfMessageDeliveriesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotInsightFollowers = os
  .route({
    method: 'GET',
    path: '/v2/bot/insight/followers',
    tags: ['insight'],
    summary: 'Get number of followers',
    description:
      'Returns the number of users who have added the LINE Official Account\non or before a specified date.\n',
  })
  .input(
    z.object({
      date: z
        .string()
        .regex(/^[0-9]{8}$/)
        .length(8)
        .exactOptional(),
    }),
  )
  .output(GetNumberOfFollowersResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotInsightMessageEvent = os
  .route({
    method: 'GET',
    path: '/v2/bot/insight/message/event',
    tags: ['insight'],
    summary: 'Get user interaction statistics',
    description:
      'Returns statistics about how users interact with narrowcast messages\nor broadcast messages sent from your LINE Official Account.\n',
  })
  .input(z.object({ requestId: z.string().min(1) }))
  .output(GetMessageEventResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotInsightMessageEventAggregation = os
  .route({
    method: 'GET',
    path: '/v2/bot/insight/message/event/aggregation',
    tags: ['insight'],
    description:
      'You can check the per-unit statistics of how users interact with\npush messages and multicast messages sent from your LINE Official Account.\n',
  })
  .input(
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
  )
  .output(GetStatisticsPerUnitResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotInsightRichmenuRichMenuIdSummary = os
  .route({
    method: 'GET',
    path: '/v2/bot/insight/richmenu/{richMenuId}/summary',
    tags: ['insight'],
    summary: 'Get rich menu insight summary',
    description:
      'Gets a summary of rich menu statistics for the specified period, for a rich\nmenu created via the Messaging API. Returns the total impression count for\nthe whole rich menu and the click count for each tappable area, aggregated\nover the entire period as a single result.\nWhen the total number of unique clicks during the period is below the\nprivacy threshold, only `richMenuId` is returned and the other fields are\nomitted.\n',
  })
  .input(
    z.object({
      richMenuId: z.string().meta({ examples: ['richmenu-0123456789abcdef0123456789abcdef'] }),
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
  )
  .output(GetRichMenuInsightSummaryResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getV2BotInsightRichmenuRichMenuIdDaily = os
  .route({
    method: 'GET',
    path: '/v2/bot/insight/richmenu/{richMenuId}/daily',
    tags: ['insight'],
    summary: 'Get rich menu insight daily',
    description:
      'Gets rich menu statistics broken down by day for the specified period, for a\nrich menu created via the Messaging API. Returns the daily impression count\nfor the whole rich menu and the daily click count for each tappable area.\nWhen the total number of unique clicks during the period is below the\nprivacy threshold, only `richMenuId` is returned and the other fields are\nomitted.\n',
  })
  .input(
    z.object({
      richMenuId: z.string().meta({ examples: ['richmenu-0123456789abcdef0123456789abcdef'] }),
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
  )
  .output(GetRichMenuInsightDailyResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
