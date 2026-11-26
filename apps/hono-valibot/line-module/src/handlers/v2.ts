import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { DetachModuleRequestSchema, AcquireChatControlRequestSchema } from '../components'

export const v2Handler = new Hono()
  .post('/v2/bot/channel/detach', sValidator('json', DetachModuleRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/chat/:chatId/control/acquire',
    sValidator('param', v.object({ chatId: v.string() })),
    sValidator('json', AcquireChatControlRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/:chatId/control/release',
    sValidator('param', v.object({ chatId: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/list',
    sValidator(
      'query',
      v.object({
        start: v.optional(v.string()),
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer', minimum: -2147483648, maximum: 100 }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
              v.maxValue(100),
            ),
            '100',
          ),
          v.metadata({ default: 100 }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
