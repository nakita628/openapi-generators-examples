import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const v2Handler = new Hono()
  .get('/v2/bot/insight/demographic', (c) => { throw new Error('Not implemented') })
  .get(
    '/v2/bot/insight/message/delivery',
    sValidator(
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
    sValidator(
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
    sValidator('query', z.object({ requestId: z.string().min(1) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/insight/message/event/aggregation',
    sValidator(
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
    sValidator(
      'param',
      z.object({
        richMenuId: z.string().meta({ examples: ['richmenu-0123456789abcdef0123456789abcdef'] }),
      }),
    ),
    sValidator(
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
    sValidator(
      'param',
      z.object({
        richMenuId: z.string().meta({ examples: ['richmenu-0123456789abcdef0123456789abcdef'] }),
      }),
    ),
    sValidator(
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
