import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const v2Router = t.router({
  getV2BotInsightDemographic: t.procedure.output(GetFriendsDemographicsResponseSchema).query(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getV2BotInsightMessageDelivery: t.procedure
    .input(
      z.object({
        date: z
          .string()
          .regex(/^[0-9]{8}$/)
          .length(8),
      }),
    )
    .output(GetNumberOfMessageDeliveriesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightFollowers: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightMessageEvent: t.procedure
    .input(z.object({ requestId: z.string().min(1) }))
    .output(GetMessageEventResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightMessageEventAggregation: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightRichmenuRichMenuIdSummary: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightRichmenuRichMenuIdDaily: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
