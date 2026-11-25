import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { AddLiffAppRequestSchema, UpdateLiffAppRequestSchema } from '../components'

export const liffHandler = new Hono()
  .get('/liff/v1/apps', (c) => { throw new Error('Not implemented') })
  .post('/liff/v1/apps', sValidator('json', AddLiffAppRequestSchema), (c) => { throw new Error('Not implemented') })
  .put(
    '/liff/v1/apps/:liffId',
    sValidator('param', z.object({ liffId: z.string() })),
    sValidator('json', UpdateLiffAppRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/liff/v1/apps/:liffId', sValidator('param', z.object({ liffId: z.string() })), (c) => { throw new Error('Not implemented') })
