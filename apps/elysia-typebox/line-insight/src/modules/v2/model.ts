import { t, type UnwrapSchema } from 'elysia'

export const V2Model = {
  getNumberOfMessageDeliveriesQuery: t.Object({
    date: t.String({ pattern: '^[0-9]{8}$', minLength: 8, maxLength: 8 }),
  }),
  getNumberOfFollowersQuery: t.Object({
    date: t.Optional(t.String({ pattern: '^[0-9]{8}$', minLength: 8, maxLength: 8 })),
  }),
  getMessageEventQuery: t.Object({ requestId: t.String({ minLength: 1 }) }),
  getStatisticsPerUnitQuery: t.Object({
    customAggregationUnit: t.String({
      pattern: '^[a-zA-Z0-9_]{1,30}$',
      minLength: 1,
      maxLength: 30,
    }),
    from: t.String({ pattern: '^[0-9]{8}$', minLength: 8, maxLength: 8, example: '20210301' }),
    to: t.String({ pattern: '^[0-9]{8}$', minLength: 8, maxLength: 8, example: '20210301' }),
  }),
  getRichMenuInsightSummaryParams: t.Object({
    richMenuId: t.String({ example: 'richmenu-0123456789abcdef0123456789abcdef' }),
  }),
  getRichMenuInsightSummaryQuery: t.Object({
    from: t.String({ pattern: '^[0-9]{8}$', minLength: 8, maxLength: 8, example: '20260213' }),
    to: t.String({ pattern: '^[0-9]{8}$', minLength: 8, maxLength: 8, example: '20260215' }),
  }),
  getRichMenuInsightDailyParams: t.Object({
    richMenuId: t.String({ example: 'richmenu-0123456789abcdef0123456789abcdef' }),
  }),
  getRichMenuInsightDailyQuery: t.Object({
    from: t.String({ pattern: '^[0-9]{8}$', minLength: 8, maxLength: 8, example: '20260213' }),
    to: t.String({ pattern: '^[0-9]{8}$', minLength: 8, maxLength: 8, example: '20260215' }),
  }),
} as const

export type V2Model = { [k in keyof typeof V2Model]: UnwrapSchema<(typeof V2Model)[k]> }
