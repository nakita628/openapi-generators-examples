import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'

export const modelsHandler = new Hono()
  .get('/models', (c) => {})
  .get(
    '/models/:model',
    sValidator(
      'param',
      v.object({ model: v.pipe(v.string(), v.metadata({ examples: ['gpt-6.2-astra'] })) }),
    ),
    (c) => {},
  )
  .delete(
    '/models/:model',
    sValidator(
      'param',
      v.object({
        model: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft:gpt-4.1-mini-2025-04-14:acemeco:suffix:abc123'] }),
        ),
      }),
    ),
    (c) => {},
  )
