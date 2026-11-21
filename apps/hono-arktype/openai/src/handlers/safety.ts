import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'

export const safetyHandler = new Hono()
  .get(
    '/safety/cases/:id',
    sValidator(
      'param',
      type({
        id: type('string')
          .narrow((data, ctx) => [...data].length <= 128 || ctx.mustBe('at most 128 characters'))
          .describe('Safety case ID'),
      }),
    ),
    (c) => {},
  )
  .get(
    '/safety/alerts/:id',
    sValidator(
      'param',
      type({
        id: type('string')
          .narrow((data, ctx) => [...data].length <= 38 || ctx.mustBe('at most 38 characters'))
          .describe('Project safety alert ID'),
      }),
    ),
    (c) => {},
  )
