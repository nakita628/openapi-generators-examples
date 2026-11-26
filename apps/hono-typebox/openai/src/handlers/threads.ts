import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
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
  .post('/threads', tbValidator('json', CreateThreadRequestSchema), (c) => { throw new Error('Not implemented') })
  .post('/threads/runs', tbValidator('json', CreateThreadAndRunRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/threads/:thread_id',
    tbValidator('param', Type.Object({ thread_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id',
    tbValidator('param', Type.Object({ thread_id: Type.String() })),
    tbValidator('json', ModifyThreadRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/threads/:thread_id',
    tbValidator('param', Type.Object({ thread_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/messages',
    tbValidator('param', Type.Object({ thread_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
              (value) => Number.isSafeInteger(Number(value)),
              () => 'must be a safe integer',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
        ),
        after: Type.Optional(Type.String()),
        before: Type.Optional(Type.String()),
        run_id: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/messages',
    tbValidator('param', Type.Object({ thread_id: Type.String() })),
    tbValidator('json', CreateMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/messages/:message_id',
    tbValidator('param', Type.Object({ thread_id: Type.String(), message_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/messages/:message_id',
    tbValidator('param', Type.Object({ thread_id: Type.String(), message_id: Type.String() })),
    tbValidator('json', ModifyMessageRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/threads/:thread_id/messages/:message_id',
    tbValidator('param', Type.Object({ thread_id: Type.String(), message_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs',
    tbValidator('param', Type.Object({ thread_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
              (value) => Number.isSafeInteger(Number(value)),
              () => 'must be a safe integer',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
        ),
        after: Type.Optional(Type.String()),
        before: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs',
    tbValidator('param', Type.Object({ thread_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        'include[]': Type.Optional(
          Type.Array(Type.Literal('step_details.tool_calls[*].file_search.results[*].content')),
        ),
      }),
    ),
    tbValidator('json', CreateRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs/:run_id',
    tbValidator('param', Type.Object({ thread_id: Type.String(), run_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs/:run_id',
    tbValidator('param', Type.Object({ thread_id: Type.String(), run_id: Type.String() })),
    tbValidator('json', ModifyRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs/:run_id/cancel',
    tbValidator('param', Type.Object({ thread_id: Type.String(), run_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps',
    tbValidator('param', Type.Object({ thread_id: Type.String(), run_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
              (value) => Number.isSafeInteger(Number(value)),
              () => 'must be a safe integer',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
        ),
        after: Type.Optional(Type.String()),
        before: Type.Optional(Type.String()),
        'include[]': Type.Optional(
          Type.Array(Type.Literal('step_details.tool_calls[*].file_search.results[*].content')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/threads/:thread_id/runs/:run_id/steps/:step_id',
    tbValidator(
      'param',
      Type.Object({ thread_id: Type.String(), run_id: Type.String(), step_id: Type.String() }),
    ),
    tbValidator(
      'query',
      Type.Object({
        'include[]': Type.Optional(
          Type.Array(Type.Literal('step_details.tool_calls[*].file_search.results[*].content')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/threads/:thread_id/runs/:run_id/submit_tool_outputs',
    tbValidator('param', Type.Object({ thread_id: Type.String(), run_id: Type.String() })),
    tbValidator('json', SubmitToolOutputsRunRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
