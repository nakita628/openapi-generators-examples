import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { OrderEnumSchema, CreateChatSessionBodySchema } from '../components'

export const chatkitHandler = new Hono()
  .post(
    '/chatkit/sessions/:session_id/cancel',
    sValidator('param', type({ session_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/chatkit/sessions', sValidator('json', CreateChatSessionBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/chatkit/threads/:thread_id/items',
    sValidator('param', type({ thread_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100'),
        'order?': OrderEnumSchema,
        'after?': type('string').describe(
          'List items created after this thread item ID. Defaults to null for the first page.',
        ),
        'before?': type('string').describe(
          'List items created before this thread item ID. Defaults to null for the newest results.',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/chatkit/threads/:thread_id', sValidator('param', type({ thread_id: 'string' })), (c) => { throw new Error('Not implemented') })
  .delete(
    '/chatkit/threads/:thread_id',
    sValidator('param', type({ thread_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/chatkit/threads',
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100'),
        'order?': OrderEnumSchema,
        'after?': type('string').describe(
          'List items created after this thread item ID. Defaults to null for the first page.',
        ),
        'before?': type('string').describe(
          'List items created before this thread item ID. Defaults to null for the newest results.',
        ),
        'user?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters'))
          .describe(
            'Filter threads that belong to this user identifier. Defaults to null to return all users.',
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
