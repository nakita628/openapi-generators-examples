import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
  InputItemSchema,
  IncludeEnumSchema,
  CreateConversationBodySchema,
  UpdateConversationBodySchema,
} from '../components'

export const conversationsHandler = new Hono()
  .get(
    '/conversations/:conversation_id/items',
    sValidator('param', z.object({ conversation_id: z.string().meta({ examples: ['conv_123'] }) })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
        after: z.string().exactOptional(),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(IncludeEnumSchema),
          )
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post(
    '/conversations/:conversation_id/items',
    sValidator('param', z.object({ conversation_id: z.string().meta({ examples: ['conv_123'] }) })),
    sValidator(
      'query',
      z.object({
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(IncludeEnumSchema),
          )
          .exactOptional(),
      }),
    ),
    sValidator(
      'json',
      z.object({
        items: z
          .array(InputItemSchema)
          .max(20)
          .meta({
            description:
              'The items to add to the conversation. You may add up to 20 items at a time.\n',
          }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/conversations/:conversation_id/items/:item_id',
    sValidator(
      'param',
      z.object({
        conversation_id: z.string().meta({ examples: ['conv_123'] }),
        item_id: z.string().meta({ examples: ['msg_abc'] }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(IncludeEnumSchema),
          )
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/conversations/:conversation_id/items/:item_id',
    sValidator(
      'param',
      z.object({
        conversation_id: z.string().meta({ examples: ['conv_123'] }),
        item_id: z.string().meta({ examples: ['msg_abc'] }),
      }),
    ),
    (c) => {},
  )
  .post('/conversations', sValidator('json', CreateConversationBodySchema), (c) => {})
  .get(
    '/conversations/:conversation_id',
    sValidator('param', z.object({ conversation_id: z.string().meta({ examples: ['conv_123'] }) })),
    (c) => {},
  )
  .post(
    '/conversations/:conversation_id',
    sValidator('param', z.object({ conversation_id: z.string().meta({ examples: ['conv_123'] }) })),
    sValidator('json', UpdateConversationBodySchema),
    (c) => {},
  )
  .delete(
    '/conversations/:conversation_id',
    sValidator('param', z.object({ conversation_id: z.string().meta({ examples: ['conv_123'] }) })),
    (c) => {},
  )
