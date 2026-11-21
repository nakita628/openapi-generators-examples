import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { CreateAssistantRequestSchema, ModifyAssistantRequestSchema } from '../components'

export const assistantsHandler = new Hono()
  .get(
    '/assistants',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post('/assistants', sValidator('json', CreateAssistantRequestSchema), (c) => {})
  .get(
    '/assistants/:assistant_id',
    sValidator('param', z.object({ assistant_id: z.string() })),
    (c) => {},
  )
  .post(
    '/assistants/:assistant_id',
    sValidator('param', z.object({ assistant_id: z.string() })),
    sValidator('json', ModifyAssistantRequestSchema),
    (c) => {},
  )
  .delete(
    '/assistants/:assistant_id',
    sValidator('param', z.object({ assistant_id: z.string() })),
    (c) => {},
  )
