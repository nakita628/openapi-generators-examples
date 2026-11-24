import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { CreateAssistantRequestSchema, ModifyAssistantRequestSchema } from '../components'

export const assistantsHandler = new Hono()
  .get(
    '/assistants',
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/assistants', sValidator('json', CreateAssistantRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/assistants/:assistant_id',
    sValidator('param', type({ assistant_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/assistants/:assistant_id',
    sValidator('param', type({ assistant_id: 'string' })),
    sValidator('json', ModifyAssistantRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/assistants/:assistant_id',
    sValidator('param', type({ assistant_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
