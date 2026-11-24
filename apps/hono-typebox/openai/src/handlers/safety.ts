import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'

export const safetyHandler = new Hono()
  .get(
    '/safety/cases/:id',
    tbValidator(
      'param',
      Type.Object({ id: Type.String({ maxLength: 128, description: 'Safety case ID' }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/safety/alerts/:id',
    tbValidator(
      'param',
      Type.Object({ id: Type.String({ maxLength: 38, description: 'Project safety alert ID' }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
