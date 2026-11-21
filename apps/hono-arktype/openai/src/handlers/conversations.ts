import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  InputItemSchema,
  IncludeEnumSchema,
  CreateConversationBodySchema,
  UpdateConversationBodySchema,
} from '../components'

export const conversationsHandler = new Hono()
  .get(
    '/conversations/:conversation_id/items',
    sValidator('param', type({ conversation_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'include?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(IncludeEnumSchema).array(),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/conversations/:conversation_id/items',
    sValidator('param', type({ conversation_id: 'string' })),
    sValidator(
      'query',
      type({
        'include?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(IncludeEnumSchema).array(),
        ),
      }),
    ),
    sValidator(
      'json',
      type({
        items: type(type(InputItemSchema).array())
          .and(type('unknown[] <= 20'))
          .describe(
            'The items to add to the conversation. You may add up to 20 items at a time.\n',
          ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/conversations/:conversation_id/items/:item_id',
    sValidator('param', type({ conversation_id: 'string', item_id: 'string' })),
    sValidator(
      'query',
      type({
        'include?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(IncludeEnumSchema).array(),
        ),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/conversations/:conversation_id/items/:item_id',
    sValidator('param', type({ conversation_id: 'string', item_id: 'string' })),
    (c) => {},
  )
  .post('/conversations', sValidator('json', CreateConversationBodySchema), (c) => {})
  .get(
    '/conversations/:conversation_id',
    sValidator('param', type({ conversation_id: 'string' })),
    (c) => {},
  )
  .post(
    '/conversations/:conversation_id',
    sValidator('param', type({ conversation_id: 'string' })),
    sValidator('json', UpdateConversationBodySchema),
    (c) => {},
  )
  .delete(
    '/conversations/:conversation_id',
    sValidator('param', type({ conversation_id: 'string' })),
    (c) => {},
  )
