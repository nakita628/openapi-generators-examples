import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
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
  .get('/threads/:thread_id', sValidator('param', z.object({ thread_id: z.string() })), (c) => { throw new Error('Not implemented') })
  .post(
    '/threads/:thread_id',
    sValidator('param', z.object({ thread_id: z.string() })),
    sValidator('json', ModifyThreadRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/threads/:thread_id',
    sValidator('param', z.object({ thread_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/messages',
    sValidator('param', z.object({ thread_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
        run_id: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/messages',
    sValidator('param', z.object({ thread_id: z.string() })),
    sValidator('json', CreateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/messages/:message_id',
    sValidator('param', z.object({ thread_id: z.string(), message_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/messages/:message_id',
    sValidator('param', z.object({ thread_id: z.string(), message_id: z.string() })),
    sValidator('json', ModifyMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/threads/:thread_id/messages/:message_id',
    sValidator('param', z.object({ thread_id: z.string(), message_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs',
    sValidator('param', z.object({ thread_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs',
    sValidator('param', z.object({ thread_id: z.string() })),
    sValidator(
      'query',
      z.object({
        'include[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('step_details.tool_calls[*].file_search.results[*].content')),
          )
          .exactOptional(),
      }),
    ),
    sValidator('json', CreateRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs/:run_id',
    sValidator('param', z.object({ thread_id: z.string(), run_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs/:run_id',
    sValidator('param', z.object({ thread_id: z.string(), run_id: z.string() })),
    sValidator('json', ModifyRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs/:run_id/cancel',
    sValidator('param', z.object({ thread_id: z.string(), run_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps',
    sValidator('param', z.object({ thread_id: z.string(), run_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
        'include[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('step_details.tool_calls[*].file_search.results[*].content')),
          )
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps/:step_id',
    sValidator(
      'param',
      z.object({ thread_id: z.string(), run_id: z.string(), step_id: z.string() }),
    ),
    sValidator(
      'query',
      z.object({
        'include[]': z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(z.literal('step_details.tool_calls[*].file_search.results[*].content')),
          )
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs/:run_id/submit_tool_outputs',
    sValidator('param', z.object({ thread_id: z.string(), run_id: z.string() })),
    sValidator('json', SubmitToolOutputsRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
