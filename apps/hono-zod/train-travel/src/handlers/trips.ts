import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

export const tripsHandler = new Hono().get(
  '/trips',
  sValidator(
    'query',
    z.object({
      origin: z.uuid(),
      destination: z.uuid(),
      date: z.iso.datetime({ offset: true }),
      bicycles: z.stringbool().default(false).exactOptional(),
      dogs: z.stringbool().default(false).exactOptional(),
    }),
  ),
  (c) => { throw new Error('Not implemented') },
)
