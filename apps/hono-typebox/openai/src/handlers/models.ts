import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'

export const modelsHandler = new Hono()
  .get('/models', (c) => { throw new Error('Not implemented') })
  .get(
    '/models/:model',
    tbValidator('param', Type.Object({ model: Type.String({ examples: ['gpt-6.2-astra'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/models/:model',
    tbValidator(
      'param',
      Type.Object({
        model: Type.String({ examples: ['ft:gpt-4.1-mini-2025-04-14:acemeco:suffix:abc123'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
