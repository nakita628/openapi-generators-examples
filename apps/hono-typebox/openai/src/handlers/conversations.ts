import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import {
  InputItemSchema,
  IncludeEnumSchema,
  CreateConversationBodySchema,
  UpdateConversationBodySchema,
} from '../components'

export const conversationsHandler = new Hono()
  .get(
    '/conversations/:conversation_id/items',
    tbValidator('param', Type.Object({ conversation_id: Type.String({ examples: ['conv_123'] }) })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
        after: Type.Optional(Type.String()),
        include: Type.Optional(Type.Array(IncludeEnumSchema)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/conversations/:conversation_id/items',
    tbValidator('param', Type.Object({ conversation_id: Type.String({ examples: ['conv_123'] }) })),
    tbValidator('query', Type.Object({ include: Type.Optional(Type.Array(IncludeEnumSchema)) })),
    tbValidator(
      'json',
      Type.Object({
        items: Type.Array(InputItemSchema, {
          maxItems: 20,
          description:
            'The items to add to the conversation. You may add up to 20 items at a time.\n',
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/conversations/:conversation_id/items/:item_id',
    tbValidator(
      'param',
      Type.Object({
        conversation_id: Type.String({ examples: ['conv_123'] }),
        item_id: Type.String({ examples: ['msg_abc'] }),
      }),
    ),
    tbValidator('query', Type.Object({ include: Type.Optional(Type.Array(IncludeEnumSchema)) })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/conversations/:conversation_id/items/:item_id',
    tbValidator(
      'param',
      Type.Object({
        conversation_id: Type.String({ examples: ['conv_123'] }),
        item_id: Type.String({ examples: ['msg_abc'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/conversations', tbValidator('json', CreateConversationBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/conversations/:conversation_id',
    tbValidator('param', Type.Object({ conversation_id: Type.String({ examples: ['conv_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/conversations/:conversation_id',
    tbValidator('param', Type.Object({ conversation_id: Type.String({ examples: ['conv_123'] }) })),
    tbValidator('json', UpdateConversationBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/conversations/:conversation_id',
    tbValidator('param', Type.Object({ conversation_id: Type.String({ examples: ['conv_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
