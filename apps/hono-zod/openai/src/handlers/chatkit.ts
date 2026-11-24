import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { OrderEnumSchema, CreateChatSessionBodySchema } from '../components'

export const chatkitHandler = new Hono()
  .post(
    '/chatkit/sessions/:session_id/cancel',
    sValidator('param', z.object({ session_id: z.string().meta({ examples: ['cksess_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/chatkit/sessions', sValidator('json', CreateChatSessionBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/chatkit/threads/:thread_id/items',
    sValidator('param', z.object({ thread_id: z.string().meta({ examples: ['cthr_123'] }) })),
    sValidator(
      'query',
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0).max(100),
          )
          .exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description:
              'List items created after this thread item ID. Defaults to null for the first page.',
          })
          .exactOptional(),
        before: z
          .string()
          .meta({
            description:
              'List items created before this thread item ID. Defaults to null for the newest results.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/chatkit/threads/:thread_id',
    sValidator('param', z.object({ thread_id: z.string().meta({ examples: ['cthr_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/chatkit/threads/:thread_id',
    sValidator('param', z.object({ thread_id: z.string().meta({ examples: ['cthr_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/chatkit/threads',
    sValidator(
      'query',
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0).max(100),
          )
          .exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description:
              'List items created after this thread item ID. Defaults to null for the first page.',
          })
          .exactOptional(),
        before: z
          .string()
          .meta({
            description:
              'List items created before this thread item ID. Defaults to null for the newest results.',
          })
          .exactOptional(),
        user: z
          .string()
          .min(1)
          .max(512)
          .meta({
            description:
              'Filter threads that belong to this user identifier. Defaults to null to return all users.',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
