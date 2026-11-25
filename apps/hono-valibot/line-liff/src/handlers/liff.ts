import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { AddLiffAppRequestSchema, UpdateLiffAppRequestSchema } from '../components'

export const liffHandler = new Hono()
  .get('/liff/v1/apps', (c) => { throw new Error('Not implemented') })
  .post('/liff/v1/apps', sValidator('json', AddLiffAppRequestSchema), (c) => { throw new Error('Not implemented') })
  .put(
    '/liff/v1/apps/:liffId',
    sValidator('param', v.object({ liffId: v.string() })),
    sValidator('json', UpdateLiffAppRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/liff/v1/apps/:liffId', sValidator('param', v.object({ liffId: v.string() })), (c) => { throw new Error('Not implemented') })
