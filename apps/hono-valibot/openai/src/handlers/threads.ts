import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
  .post('/threads', sValidator('json', CreateThreadRequestSchema), (c) => {})
  .post('/threads/runs', sValidator('json', CreateThreadAndRunRequestSchema), (c) => {})
  .get('/threads/:thread_id', sValidator('param', v.object({ thread_id: v.string() })), (c) => {})
  .post(
    '/threads/:thread_id',
    sValidator('param', v.object({ thread_id: v.string() })),
    sValidator('json', ModifyThreadRequestSchema),
    (c) => {},
  )
  .delete(
    '/threads/:thread_id',
    sValidator('param', v.object({ thread_id: v.string() })),
    (c) => {},
  )
  .get(
    '/threads/:thread_id/messages',
    sValidator('param', v.object({ thread_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
        run_id: v.optional(v.string()),
      }),
    ),
    (c) => {},
  )
  .post(
    '/threads/:thread_id/messages',
    sValidator('param', v.object({ thread_id: v.string() })),
    sValidator('json', CreateMessageRequestSchema),
    (c) => {},
  )
  .get(
    '/threads/:thread_id/messages/:message_id',
    sValidator('param', v.object({ thread_id: v.string(), message_id: v.string() })),
    (c) => {},
  )
  .post(
    '/threads/:thread_id/messages/:message_id',
    sValidator('param', v.object({ thread_id: v.string(), message_id: v.string() })),
    sValidator('json', ModifyMessageRequestSchema),
    (c) => {},
  )
  .delete(
    '/threads/:thread_id/messages/:message_id',
    sValidator('param', v.object({ thread_id: v.string(), message_id: v.string() })),
    (c) => {},
  )
  .get(
    '/threads/:thread_id/runs',
    sValidator('param', v.object({ thread_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
      }),
    ),
    (c) => {},
  )
  .post(
    '/threads/:thread_id/runs',
    sValidator('param', v.object({ thread_id: v.string() })),
    sValidator(
      'query',
      v.partial(
        v.object({
          'include[]': v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.literal('step_details.tool_calls[*].file_search.results[*].content')),
          ),
        }),
      ),
    ),
    sValidator('json', CreateRunRequestSchema),
    (c) => {},
  )
  .get(
    '/threads/:thread_id/runs/:run_id',
    sValidator('param', v.object({ thread_id: v.string(), run_id: v.string() })),
    (c) => {},
  )
  .post(
    '/threads/:thread_id/runs/:run_id',
    sValidator('param', v.object({ thread_id: v.string(), run_id: v.string() })),
    sValidator('json', ModifyRunRequestSchema),
    (c) => {},
  )
  .post(
    '/threads/:thread_id/runs/:run_id/cancel',
    sValidator('param', v.object({ thread_id: v.string(), run_id: v.string() })),
    (c) => {},
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps',
    sValidator('param', v.object({ thread_id: v.string(), run_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
        'include[]': v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.literal('step_details.tool_calls[*].file_search.results[*].content')),
          ),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps/:step_id',
    sValidator(
      'param',
      v.object({ thread_id: v.string(), run_id: v.string(), step_id: v.string() }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          'include[]': v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(v.literal('step_details.tool_calls[*].file_search.results[*].content')),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/threads/:thread_id/runs/:run_id/submit_tool_outputs',
    sValidator('param', v.object({ thread_id: v.string(), run_id: v.string() })),
    sValidator('json', SubmitToolOutputsRunRequestSchema),
    (c) => {},
  )
