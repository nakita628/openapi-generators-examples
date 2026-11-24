import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'

export const v2Handler = new Hono()
  .get('/v2/bot/insight/demographic', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/insight/message/delivery',
    tbValidator(
      'query',
      Type.Object({ date: Type.String({ pattern: '^[0-9]{8}$', minLength: 8, maxLength: 8 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/followers',
    tbValidator(
      'query',
      Type.Object({
        date: Type.Optional(Type.String({ pattern: '^[0-9]{8}$', minLength: 8, maxLength: 8 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/message/event',
    tbValidator('query', Type.Object({ requestId: Type.String({ minLength: 1 }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/message/event/aggregation',
    tbValidator(
      'query',
      Type.Object({
        customAggregationUnit: Type.String({
          pattern: '^[a-zA-Z0-9_]{1,30}$',
          minLength: 1,
          maxLength: 30,
        }),
        from: Type.String({
          pattern: '^[0-9]{8}$',
          minLength: 8,
          maxLength: 8,
          examples: ['20210301'],
        }),
        to: Type.String({
          pattern: '^[0-9]{8}$',
          minLength: 8,
          maxLength: 8,
          examples: ['20210301'],
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/richmenu/:richMenuId/summary',
    tbValidator(
      'param',
      Type.Object({
        richMenuId: Type.String({ examples: ['richmenu-0123456789abcdef0123456789abcdef'] }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        from: Type.String({
          pattern: '^[0-9]{8}$',
          minLength: 8,
          maxLength: 8,
          examples: ['20260213'],
        }),
        to: Type.String({
          pattern: '^[0-9]{8}$',
          minLength: 8,
          maxLength: 8,
          examples: ['20260215'],
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/richmenu/:richMenuId/daily',
    tbValidator(
      'param',
      Type.Object({
        richMenuId: Type.String({ examples: ['richmenu-0123456789abcdef0123456789abcdef'] }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        from: Type.String({
          pattern: '^[0-9]{8}$',
          minLength: 8,
          maxLength: 8,
          examples: ['20260213'],
        }),
        to: Type.String({
          pattern: '^[0-9]{8}$',
          minLength: 8,
          maxLength: 8,
          examples: ['20260215'],
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
