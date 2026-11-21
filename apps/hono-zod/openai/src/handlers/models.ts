import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const modelsHandler = new Hono()
  .get('/models', (c) => {})
  .get(
    '/models/:model',
    sValidator('param', z.object({ model: z.string().meta({ examples: ['gpt-6.2-astra'] }) })),
    (c) => {},
  )
  .delete(
    '/models/:model',
    sValidator(
      'param',
      z.object({
        model: z.string().meta({ examples: ['ft:gpt-4.1-mini-2025-04-14:acemeco:suffix:abc123'] }),
      }),
    ),
    (c) => {},
  )
