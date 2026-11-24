import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
  getV2BotInsightDemographic: t.procedure
    .output(Schema.toStandardSchemaV1(GetFriendsDemographicsResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightMessageDelivery: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          date: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetNumberOfMessageDeliveriesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightFollowers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          date: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[0-9]{8}$/),
              Schema.makeFilter((input) => [...input].length === 8, {
                expected: 'a string of 8 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetNumberOfFollowersResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightMessageEvent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          requestId: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetMessageEventResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightMessageEventAggregation: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          customAggregationUnit: Schema.String.check(
            Schema.isPattern(/^[a-zA-Z0-9_]{1,30}$/),
            Schema.makeFilter((input) => [...input].length >= 1, {
              expected: 'a string of at least 1 character',
            }),
            Schema.makeFilter((input) => [...input].length <= 30, {
              expected: 'a string of at most 30 characters',
            }),
          ),
          from: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ).annotate({ jsonSchemaExamples: ['20210301'] }),
          to: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ).annotate({ jsonSchemaExamples: ['20210301'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetStatisticsPerUnitResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightRichmenuRichMenuIdSummary: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          richMenuId: Schema.String.annotate({
            jsonSchemaExamples: ['richmenu-0123456789abcdef0123456789abcdef'],
          }),
          from: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ).annotate({ jsonSchemaExamples: ['20260213'] }),
          to: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ).annotate({ jsonSchemaExamples: ['20260215'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetRichMenuInsightSummaryResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getV2BotInsightRichmenuRichMenuIdDaily: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          richMenuId: Schema.String.annotate({
            jsonSchemaExamples: ['richmenu-0123456789abcdef0123456789abcdef'],
          }),
          from: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ).annotate({ jsonSchemaExamples: ['20260213'] }),
          to: Schema.String.check(
            Schema.isPattern(/^[0-9]{8}$/),
            Schema.makeFilter((input) => [...input].length === 8, {
              expected: 'a string of 8 characters',
            }),
          ).annotate({ jsonSchemaExamples: ['20260215'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(GetRichMenuInsightDailyResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
