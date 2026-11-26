import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { DetachModuleRequestSchema, AcquireChatControlRequestSchema } from '../components'

export const v2Handler = new Hono()
  .post('/v2/bot/channel/detach', sValidator('json', DetachModuleRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/chat/:chatId/control/acquire',
    sValidator('param', type({ chatId: 'string' })),
    sValidator('json', AcquireChatControlRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/:chatId/control/release',
    sValidator('param', type({ chatId: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/list',
    sValidator(
      'query',
      type({
        'start?': 'string',
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to(
            'number.integer >= -2147483648 & number.integer <= 2147483647 & number.integer <= 100',
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
