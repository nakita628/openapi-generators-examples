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
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'before?': 'string',
      }),
    ),
    (c) => {},
  )
  .post('/assistants', sValidator('json', CreateAssistantRequestSchema), (c) => {})
  .get(
    '/assistants/:assistant_id',
    sValidator('param', type({ assistant_id: 'string' })),
    (c) => {},
  )
  .post(
    '/assistants/:assistant_id',
    sValidator('param', type({ assistant_id: 'string' })),
    sValidator('json', ModifyAssistantRequestSchema),
    (c) => {},
  )
  .delete(
    '/assistants/:assistant_id',
    sValidator('param', type({ assistant_id: 'string' })),
    (c) => {},
  )
