import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  CreateMessageRequestSchema,
  CreateRunRequestSchema,
  CreateThreadAndRunRequestSchema,
  CreateThreadRequestSchema,
  ModifyMessageRequestSchema,
  ModifyRunRequestSchema,
  ModifyThreadRequestSchema,
  SubmitToolOutputsRunRequestSchema,
} from '../components'

export const threadsHandler = new Hono()
  .post('/threads', sValidator('json', CreateThreadRequestSchema), (c) => { throw new Error('Not implemented') })
  .post('/threads/runs', sValidator('json', CreateThreadAndRunRequestSchema), (c) => { throw new Error('Not implemented') })
  .get('/threads/:thread_id', sValidator('param', type({ thread_id: 'string' })), (c) => { throw new Error('Not implemented') })
  .post(
    '/threads/:thread_id',
    sValidator('param', type({ thread_id: 'string' })),
    sValidator('json', ModifyThreadRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/threads/:thread_id', sValidator('param', type({ thread_id: 'string' })), (c) => { throw new Error('Not implemented') })
  .get(
    '/threads/:thread_id/messages',
    sValidator('param', type({ thread_id: 'string' })),
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
        'run_id?': 'string',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/messages',
    sValidator('param', type({ thread_id: 'string' })),
    sValidator('json', CreateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/messages/:message_id',
    sValidator('param', type({ thread_id: 'string', message_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/messages/:message_id',
    sValidator('param', type({ thread_id: 'string', message_id: 'string' })),
    sValidator('json', ModifyMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/threads/:thread_id/messages/:message_id',
    sValidator('param', type({ thread_id: 'string', message_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs',
    sValidator('param', type({ thread_id: 'string' })),
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
  .post(
    '/threads/:thread_id/runs',
    sValidator('param', type({ thread_id: 'string' })),
    sValidator(
      'query',
      type({
        'include[]?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'step_details.tool_calls[*].file_search.results[*].content'[]"),
      }),
    ),
    sValidator('json', CreateRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs/:run_id',
    sValidator('param', type({ thread_id: 'string', run_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs/:run_id',
    sValidator('param', type({ thread_id: 'string', run_id: 'string' })),
    sValidator('json', ModifyRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs/:run_id/cancel',
    sValidator('param', type({ thread_id: 'string', run_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps',
    sValidator('param', type({ thread_id: 'string', run_id: 'string' })),
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
        'include[]?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'step_details.tool_calls[*].file_search.results[*].content'[]"),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps/:step_id',
    sValidator('param', type({ thread_id: 'string', run_id: 'string', step_id: 'string' })),
    sValidator(
      'query',
      type({
        'include[]?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'step_details.tool_calls[*].file_search.results[*].content'[]"),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs/:run_id/submit_tool_outputs',
    sValidator('param', type({ thread_id: 'string', run_id: 'string' })),
    sValidator('json', SubmitToolOutputsRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
