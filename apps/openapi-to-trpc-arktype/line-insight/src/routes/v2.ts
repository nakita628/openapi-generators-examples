import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        date: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    )
    .output(GetNumberOfMessageDeliveriesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightFollowers: t.procedure
    .input(
      type({
        'date?': type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    )
    .output(GetNumberOfFollowersResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightMessageEvent: t.procedure
    .input(
      type({
        requestId: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    )
    .output(GetMessageEventResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightMessageEventAggregation: t.procedure
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
    .output(GetStatisticsPerUnitResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightRichmenuRichMenuIdSummary: t.procedure
    .input(
      type({
        richMenuId: 'string',
        from: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
        to: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    )
    .output(GetRichMenuInsightSummaryResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightRichmenuRichMenuIdDaily: t.procedure
    .input(
      type({
        richMenuId: 'string',
        from: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
        to: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    )
    .output(GetRichMenuInsightDailyResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
