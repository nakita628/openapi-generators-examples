import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
    .input(v.object({ date: v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)) }))
    .output(GetNumberOfMessageDeliveriesResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightFollowers: t.procedure
    .input(
      v.partial(v.object({ date: v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)) })),
    )
    .output(GetNumberOfFollowersResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightMessageEvent: t.procedure
    .input(v.object({ requestId: v.pipe(v.string(), v.minCodePoints(1)) }))
    .output(GetMessageEventResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightMessageEventAggregation: t.procedure
    .input(
      v.object({
        customAggregationUnit: v.pipe(
          v.string(),
          v.regex(/^[a-zA-Z0-9_]{1,30}$/),
          v.minCodePoints(1),
          v.maxCodePoints(30),
        ),
        from: v.pipe(
          v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)),
          v.metadata({ examples: ['20210301'] }),
        ),
        to: v.pipe(
          v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)),
          v.metadata({ examples: ['20210301'] }),
        ),
      }),
    )
    .output(GetStatisticsPerUnitResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightRichmenuRichMenuIdSummary: t.procedure
    .input(
      v.object({
        richMenuId: v.pipe(
          v.string(),
          v.metadata({ examples: ['richmenu-0123456789abcdef0123456789abcdef'] }),
        ),
        from: v.pipe(
          v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)),
          v.metadata({ examples: ['20260213'] }),
        ),
        to: v.pipe(
          v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)),
          v.metadata({ examples: ['20260215'] }),
        ),
      }),
    )
    .output(GetRichMenuInsightSummaryResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightRichmenuRichMenuIdDaily: t.procedure
    .input(
      v.object({
        richMenuId: v.pipe(
          v.string(),
          v.metadata({ examples: ['richmenu-0123456789abcdef0123456789abcdef'] }),
        ),
        from: v.pipe(
          v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)),
          v.metadata({ examples: ['20260213'] }),
        ),
        to: v.pipe(
          v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)),
          v.metadata({ examples: ['20260215'] }),
        ),
      }),
    )
    .output(GetRichMenuInsightDailyResponseSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
