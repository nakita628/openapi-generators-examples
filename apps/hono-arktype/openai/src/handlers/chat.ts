import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { CreateChatCompletionRequestSchema, MetadataSchema } from '../components'

export const chatHandler = new Hono()
  .get(
    '/chat/completions',
    sValidator(
      'query',
      type({
        'model?': 'string',
        'metadata?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('unknown').pipe((data, ctx) => {
              for (const branch of [
                type({ '[string]': 'string' }).describe(
                  'Set of 16 key-value pairs that can be attached to an object. This can be\nuseful for storing additional information about the object in a structured\nformat, and querying for objects via API or the dashboard.\n\nKeys are strings with a maximum length of 64 characters. Values are strings\nwith a maximum length of 512 characters.\n',
                ),
                type('unknown')
                  .pipe((data) => (data === 'null' ? null : data))
                  .to('null | null'),
              ]) {
                const out = branch(data)
                if (!(out instanceof type.errors)) return out
              }
              return ctx.error('one of the members')
            }),
          ).or('null'),
        ),
        'after?': 'string',
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
  .post('/chat/completions', sValidator('json', CreateChatCompletionRequestSchema), (c) => {})
  .get(
    '/chat/completions/:completion_id',
    sValidator('param', type({ completion_id: 'string' })),
    (c) => {},
  )
  .post(
    '/chat/completions/:completion_id',
    sValidator('param', type({ completion_id: 'string' })),
    sValidator('json', type({ metadata: MetadataSchema })),
    (c) => {},
  )
  .delete(
    '/chat/completions/:completion_id',
    sValidator('param', type({ completion_id: 'string' })),
    (c) => {},
  )
  .get(
    '/chat/completions/:completion_id/messages',
    sValidator('param', type({ completion_id: 'string' })),
    sValidator(
      'query',
      type({
        'after?': 'string',
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
      }),
    ),
    (c) => {},
  )
