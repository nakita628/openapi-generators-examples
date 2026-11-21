import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import {
  InputItemSchema,
  IncludeEnumSchema,
  CreateConversationBodySchema,
  UpdateConversationBodySchema,
} from '../components'

export const conversationsHandler = new Hono()
  .get(
    '/conversations/:conversation_id/items',
    sValidator(
      'param',
      v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc'])),
        after: v.optional(v.string()),
        include: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(IncludeEnumSchema),
          ),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/conversations/:conversation_id/items',
    sValidator(
      'param',
      v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          include: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(IncludeEnumSchema),
          ),
        }),
      ),
    ),
    sValidator(
      'json',
      v.object({
        items: v.pipe(
          v.pipe(v.array(InputItemSchema), v.maxLength(20)),
          v.description(
            'The items to add to the conversation. You may add up to 20 items at a time.\n',
          ),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/conversations/:conversation_id/items/:item_id',
    sValidator(
      'param',
      v.object({
        conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
        item_id: v.pipe(v.string(), v.metadata({ examples: ['msg_abc'] })),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          include: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(IncludeEnumSchema),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/conversations/:conversation_id/items/:item_id',
    sValidator(
      'param',
      v.object({
        conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })),
        item_id: v.pipe(v.string(), v.metadata({ examples: ['msg_abc'] })),
      }),
    ),
    (c) => {},
  )
  .post('/conversations', sValidator('json', CreateConversationBodySchema), (c) => {})
  .get(
    '/conversations/:conversation_id',
    sValidator(
      'param',
      v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }),
    ),
    (c) => {},
  )
  .post(
    '/conversations/:conversation_id',
    sValidator(
      'param',
      v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }),
    ),
    sValidator('json', UpdateConversationBodySchema),
    (c) => {},
  )
  .delete(
    '/conversations/:conversation_id',
    sValidator(
      'param',
      v.object({ conversation_id: v.pipe(v.string(), v.metadata({ examples: ['conv_123'] })) }),
    ),
    (c) => {},
  )
