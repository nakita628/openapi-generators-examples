import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'
import { AddLiffAppRequestSchema, UpdateLiffAppRequestSchema } from '../components'

export const liffHandler = new Hono()
  .get('/liff/v1/apps', (c) => { throw new Error('Not implemented') })
  .post('/liff/v1/apps', tbValidator('json', AddLiffAppRequestSchema), (c) => { throw new Error('Not implemented') })
  .put(
    '/liff/v1/apps/:liffId',
    tbValidator('param', Type.Object({ liffId: Type.String() })),
    tbValidator('json', UpdateLiffAppRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/liff/v1/apps/:liffId',
    tbValidator('param', Type.Object({ liffId: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
