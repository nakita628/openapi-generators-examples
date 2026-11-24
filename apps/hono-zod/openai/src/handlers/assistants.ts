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
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(20)
          .exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/assistants', sValidator('json', CreateAssistantRequestSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/assistants/:assistant_id',
    sValidator('param', z.object({ assistant_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/assistants/:assistant_id',
    sValidator('param', z.object({ assistant_id: z.string() })),
    sValidator('json', ModifyAssistantRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/assistants/:assistant_id',
    sValidator('param', z.object({ assistant_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
