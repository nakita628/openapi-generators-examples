import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import { DetachModuleRequestSchema, AcquireChatControlRequestSchema } from '../components'

export const v2Handler = new Hono()
  .post('/v2/bot/channel/detach', tbValidator('json', DetachModuleRequestSchema), (c) => { throw new Error('Not implemented') })
  .post(
    '/v2/bot/chat/:chatId/control/acquire',
    tbValidator('param', Type.Object({ chatId: Type.String() })),
    tbValidator('json', AcquireChatControlRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/v2/bot/chat/:chatId/control/release',
    tbValidator('param', Type.Object({ chatId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/v2/bot/list',
    tbValidator(
      'query',
      Type.Object({
        start: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '100' }),
                (value) => Number.isSafeInteger(Number(value)),
                () => 'must be a safe integer',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
