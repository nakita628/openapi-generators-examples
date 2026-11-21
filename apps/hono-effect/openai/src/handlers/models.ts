import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'

export const modelsHandler = new Hono()
  .get('/models', (c) => {})
  .get(
    '/models/:model',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ model: Schema.String.annotate({ jsonSchemaExamples: ['gpt-6.2-astra'] }) }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/models/:model',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          model: Schema.String.annotate({
            jsonSchemaExamples: ['ft:gpt-4.1-mini-2025-04-14:acemeco:suffix:abc123'],
          }),
        }),
      ),
    ),
    (c) => {},
  )
