import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'

export const v2Handler = new Hono()
  .get('/v2/bot/insight/demographic', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/insight/message/delivery',
    sValidator(
      'query',
      type({
        date: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/followers',
    sValidator(
      'query',
      type({
        'date?': type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/message/event',
    sValidator(
      'query',
      type({
        requestId: type('string').narrow(
          (data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/message/event/aggregation',
    sValidator(
      'query',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/richmenu/:richMenuId/summary',
    sValidator('param', type({ richMenuId: 'string' })),
    sValidator(
      'query',
      type({
        from: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
        to: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/richmenu/:richMenuId/daily',
    sValidator('param', type({ richMenuId: 'string' })),
    sValidator(
      'query',
      type({
        from: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
        to: type('string')
          .and(/^[0-9]{8}$/)
          .narrow((data, ctx) => [...data].length === 8 || ctx.mustBe('exactly 8 characters')),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
