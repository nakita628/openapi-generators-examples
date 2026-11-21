import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { CreateChatCompletionRequestSchema, MetadataSchema } from '../components'

export const chatHandler = new Hono()
  .get(
    '/chat/completions',
    sValidator(
      'query',
      v.object({
        model: v.optional(v.string()),
        metadata: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === 'null' ? null : input)),
            v.nullable(
              v.union([
                v.pipe(
                  v.record(v.string(), v.string()),
                  v.description(
                    'Set of 16 key-value pairs that can be attached to an object. This can be\nuseful for storing additional information about the object in a structured\nformat, and querying for objects via API or the dashboard.\n\nKeys are strings with a maximum length of 64 characters. Values are strings\nwith a maximum length of 512 characters.\n',
                  ),
                ),
                v.pipe(
                  v.unknown(),
                  v.transform((input) => (input === 'null' ? null : input)),
                  v.nullable(v.null()),
                ),
              ]),
            ),
          ),
        ),
        after: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    ),
    (c) => {},
  )
  .post('/chat/completions', sValidator('json', CreateChatCompletionRequestSchema), (c) => {})
  .get(
    '/chat/completions/:completion_id',
    sValidator('param', v.object({ completion_id: v.string() })),
    (c) => {},
  )
  .post(
    '/chat/completions/:completion_id',
    sValidator('param', v.object({ completion_id: v.string() })),
    sValidator('json', v.object({ metadata: MetadataSchema })),
    (c) => {},
  )
  .delete(
    '/chat/completions/:completion_id',
    sValidator('param', v.object({ completion_id: v.string() })),
    (c) => {},
  )
  .get(
    '/chat/completions/:completion_id/messages',
    sValidator('param', v.object({ completion_id: v.string() })),
    sValidator(
      'query',
      v.object({
        after: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'asc'),
      }),
    ),
    (c) => {},
  )
