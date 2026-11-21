import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'

export const safetyHandler = new Hono()
  .get(
    '/safety/cases/:id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 128, {
              expected: 'a string of at most 128 characters',
            }),
          ).annotate({ description: 'Safety case ID' }),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/safety/alerts/:id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 38, {
              expected: 'a string of at most 38 characters',
            }),
          ).annotate({ description: 'Project safety alert ID' }),
        }),
      ),
    ),
    (c) => {},
  )
