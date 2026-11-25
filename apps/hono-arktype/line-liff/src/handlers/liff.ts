import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { AddLiffAppRequestSchema, UpdateLiffAppRequestSchema } from '../components'

export const liffHandler = new Hono()
  .get('/liff/v1/apps', (c) => { throw new Error('Not implemented') })
  .post('/liff/v1/apps', sValidator('json', AddLiffAppRequestSchema), (c) => { throw new Error('Not implemented') })
  .put(
    '/liff/v1/apps/:liffId',
    sValidator('param', type({ liffId: 'string' })),
    sValidator('json', UpdateLiffAppRequestSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/liff/v1/apps/:liffId', sValidator('param', type({ liffId: 'string' })), (c) => { throw new Error('Not implemented') })
