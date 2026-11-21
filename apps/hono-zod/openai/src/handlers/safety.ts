import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const safetyHandler = new Hono()
  .get(
    '/safety/cases/:id',
    sValidator(
      'param',
      z.object({ id: z.string().max(128).meta({ description: 'Safety case ID' }) }),
    ),
    (c) => {},
  )
  .get(
    '/safety/alerts/:id',
    sValidator(
      'param',
      z.object({ id: z.string().max(38).meta({ description: 'Project safety alert ID' }) }),
    ),
    (c) => {},
  )
