import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'

export const v2Handler = new Hono()
  .get('/v2/bot/insight/demographic', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/insight/message/delivery',
    sValidator(
      'query',
      v.object({ date: v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/followers',
    sValidator(
      'query',
      v.partial(v.object({ date: v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/message/event',
    sValidator('query', v.object({ requestId: v.pipe(v.string(), v.minCodePoints(1)) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/message/event/aggregation',
    sValidator(
      'query',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/richmenu/:richMenuId/summary',
    sValidator(
      'param',
      v.object({
        richMenuId: v.pipe(
          v.string(),
          v.metadata({ examples: ['richmenu-0123456789abcdef0123456789abcdef'] }),
        ),
      }),
    ),
    sValidator(
      'query',
      v.object({
        from: v.pipe(
          v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)),
          v.metadata({ examples: ['20260213'] }),
        ),
        to: v.pipe(
          v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)),
          v.metadata({ examples: ['20260215'] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/richmenu/:richMenuId/daily',
    sValidator(
      'param',
      v.object({
        richMenuId: v.pipe(
          v.string(),
          v.metadata({ examples: ['richmenu-0123456789abcdef0123456789abcdef'] }),
        ),
      }),
    ),
    sValidator(
      'query',
      v.object({
        from: v.pipe(
          v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)),
          v.metadata({ examples: ['20260213'] }),
        ),
        to: v.pipe(
          v.pipe(v.string(), v.regex(/^[0-9]{8}$/), v.codePoints(8)),
          v.metadata({ examples: ['20260215'] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
