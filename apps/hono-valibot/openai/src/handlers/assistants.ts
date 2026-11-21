import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { CreateAssistantRequestSchema, ModifyAssistantRequestSchema } from '../components'

export const assistantsHandler = new Hono()
  .get(
    '/assistants',
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
  .post('/assistants', sValidator('json', CreateAssistantRequestSchema), (c) => {})
  .get(
    '/assistants/:assistant_id',
    sValidator('param', v.object({ assistant_id: v.string() })),
    (c) => {},
  )
  .post(
    '/assistants/:assistant_id',
    sValidator('param', v.object({ assistant_id: v.string() })),
    sValidator('json', ModifyAssistantRequestSchema),
    (c) => {},
  )
  .delete(
    '/assistants/:assistant_id',
    sValidator('param', v.object({ assistant_id: v.string() })),
    (c) => {},
  )
