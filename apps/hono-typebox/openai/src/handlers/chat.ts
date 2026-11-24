import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import { CreateChatCompletionRequestSchema, MetadataSchema } from '../components'

export const chatHandler = new Hono()
  .get(
    '/chat/completions',
    tbValidator(
      'query',
      Type.Object({
        model: Type.Optional(Type.String()),
        metadata: Type.Optional(MetadataSchema),
        after: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'asc' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/chat/completions', tbValidator('json', CreateChatCompletionRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/chat/completions/:completion_id',
    tbValidator('param', Type.Object({ completion_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/chat/completions/:completion_id',
    tbValidator('param', Type.Object({ completion_id: Type.String() })),
    tbValidator('json', Type.Object({ metadata: MetadataSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/chat/completions/:completion_id',
    tbValidator('param', Type.Object({ completion_id: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/chat/completions/:completion_id/messages',
    tbValidator('param', Type.Object({ completion_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        after: Type.Optional(Type.String()),
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(
          Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'asc' }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
