import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { OrderEnumSchema, CreateChatSessionBodySchema } from '../components'

export const chatkitHandler = new Hono()
  .post(
    '/chatkit/sessions/:session_id/cancel',
    sValidator(
      'param',
      v.object({ session_id: v.pipe(v.string(), v.metadata({ examples: ['cksess_123'] })) }),
    ),
    (c) => {},
  )
  .post('/chatkit/sessions', sValidator('json', CreateChatSessionBodySchema), (c) => {})
  .get(
    '/chatkit/threads/:thread_id/items',
    sValidator(
      'param',
      v.object({ thread_id: v.pipe(v.string(), v.metadata({ examples: ['cthr_123'] })) }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
          order: OrderEnumSchema,
          after: v.pipe(
            v.string(),
            v.description(
              'List items created after this thread item ID. Defaults to null for the first page.',
            ),
          ),
          before: v.pipe(
            v.string(),
            v.description(
              'List items created before this thread item ID. Defaults to null for the newest results.',
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/chatkit/threads/:thread_id',
    sValidator(
      'param',
      v.object({ thread_id: v.pipe(v.string(), v.metadata({ examples: ['cthr_123'] })) }),
    ),
    (c) => {},
  )
  .delete(
    '/chatkit/threads/:thread_id',
    sValidator(
      'param',
      v.object({ thread_id: v.pipe(v.string(), v.metadata({ examples: ['cthr_123'] })) }),
    ),
    (c) => {},
  )
  .get(
    '/chatkit/threads',
    sValidator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
          order: OrderEnumSchema,
          after: v.pipe(
            v.string(),
            v.description(
              'List items created after this thread item ID. Defaults to null for the first page.',
            ),
          ),
          before: v.pipe(
            v.string(),
            v.description(
              'List items created before this thread item ID. Defaults to null for the newest results.',
            ),
          ),
          user: v.pipe(
            v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(512)),
            v.description(
              'Filter threads that belong to this user identifier. Defaults to null to return all users.',
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
