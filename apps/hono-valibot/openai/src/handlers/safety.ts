import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'

export const safetyHandler = new Hono()
  .get(
    '/safety/cases/:id',
    sValidator(
      'param',
      v.object({
        id: v.pipe(v.pipe(v.string(), v.maxCodePoints(128)), v.description('Safety case ID')),
      }),
    ),
    (c) => {},
  )
  .get(
    '/safety/alerts/:id',
    sValidator(
      'param',
      v.object({
        id: v.pipe(
          v.pipe(v.string(), v.maxCodePoints(38)),
          v.description('Project safety alert ID'),
        ),
      }),
    ),
    (c) => {},
  )
