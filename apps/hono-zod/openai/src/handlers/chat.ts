import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { CreateChatCompletionRequestSchema, MetadataSchema } from '../components'

export const chatHandler = new Hono()
  .get(
    '/chat/completions',
    sValidator(
      'query',
      z.object({
        model: z.string().exactOptional(),
        metadata: z
          .preprocess(
            (val) => (val === 'null' ? null : val),
            z
              .union([
                z
                  .record(z.string(), z.string())
                  .meta({
                    description:
                      'Set of 16 key-value pairs that can be attached to an object. This can be\nuseful for storing additional information about the object in a structured\nformat.\n\nKeys are strings with a maximum length of 64 characters. Values are strings\nwith a maximum length of 512 characters.\n',
                  }),
                z.preprocess((val) => (val === 'null' ? null : val), z.null()),
              ])
              .nullable(),
          )
          .exactOptional(),
        after: z.string().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(20)
          .exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/chat/completions', sValidator('json', CreateChatCompletionRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/chat/completions/:completion_id',
    sValidator('param', z.object({ completion_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/chat/completions/:completion_id',
    sValidator('param', z.object({ completion_id: z.string() })),
    sValidator('json', z.object({ metadata: MetadataSchema })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/chat/completions/:completion_id',
    sValidator('param', z.object({ completion_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/chat/completions/:completion_id/messages',
    sValidator('param', z.object({ completion_id: z.string() })),
    sValidator(
      'query',
      z.object({
        after: z.string().exactOptional(),
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(20)
          .exactOptional(),
        order: z.enum(['asc', 'desc']).default('asc').exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
