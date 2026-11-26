import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { DetachModuleRequestSchema, AcquireChatControlRequestSchema } from '../components'

export const v2Handler = new Hono()
  .post('/v2/bot/channel/detach', sValidator('json', DetachModuleRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/chat/:chatId/control/acquire',
    sValidator('param', z.object({ chatId: z.string() })),
    sValidator('json', AcquireChatControlRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/:chatId/control/release',
    sValidator('param', z.object({ chatId: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/list',
    sValidator(
      'query',
      z.object({
        start: z.string().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.int32().max(100),
          )
          .default(100)
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
